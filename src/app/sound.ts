// The game's sound on the page: the AudioContext (made at the first press: browsers keep sound off till then), the music,
// the sound effects and their cues, the volume slider in the corner, and the audio watchdog. One a page.
import { beatAt, timeAt } from "../rules/beat";
import { PARTY_CAST } from "../rules/party";
import { Music } from "../platform/audio/music";
import { Sfx } from "../platform/audio/sfx";
import { OVER_DEBUG, SfxCues } from "../platform/audio/sfxCues";
import { AudioWatchdog } from "../platform/audio/watchdog";
import { musicMix, partyOverEase } from "../rules/music";
import type { MusicCue } from "../rules/musicPlan";
import type { MusicStyle } from "../rules/musicScore";
import type { Game } from "../rules/game";
import type { Tuning } from "../rules/tuning";
import type { PlaytestLog } from "../platform/playtestLog";

export class Sound {
  audio: AudioContext | null = null;
  music: Music | null = null;
  sfx: Sfx | null = null;
  sfxCues: SfxCues | null = null;
  /** The volume, 0 to 1 (0 mutes); remembered on this browser. */
  level = 0.8;
  /** The music's last mix (by how near she is to a playing soundsystem): the playtest log reads it. */
  lastMix: ReturnType<typeof musicMix> | null = null;
  watchdog: AudioWatchdog | null = null;

  constructor(private readonly tuning: Tuning, private readonly style: MusicStyle, private readonly seed: number) {
    try { const v = localStorage.getItem("witch.volume"); if (v !== null && !isNaN(+v)) this.level = Math.min(1, Math.max(0, +v)); } catch { /* storage blocked */ }
  }

  /** The volume (Ed's playtest, 2026-10-04): a slider in the corner, 0 mutes; remembered on this browser. */
  volumeSlider(): void {
    const volumeEl = document.createElement("label");
    volumeEl.id = "volume";
    volumeEl.title = "volume (0 mutes)";
    Object.assign(volumeEl.style, { position: "fixed", right: "10px", bottom: "12px", zIndex: "3", display: "flex", alignItems: "center", gap: "4px", padding: "2px 6px", borderRadius: "6px", background: "rgba(14,11,28,.55)", color: "#e8e2f4", font: "12px ui-monospace, Menlo, Consolas, monospace", pointerEvents: "auto" });
    const volumeIcon = document.createElement("span"), volumeRange = document.createElement("input");
    volumeRange.type = "range"; volumeRange.min = "0"; volumeRange.max = "100"; volumeRange.value = String(Math.round(this.level * 100));
    volumeRange.style.width = "80px";
    const showVolume = () => { volumeIcon.textContent = this.level === 0 ? "🔇" : this.level < 0.4 ? "🔈" : "🔊"; };
    volumeRange.addEventListener("input", () => {
      this.level = +volumeRange.value / 100; showVolume();
      if (this.music) this.music.volume = this.tuning.music.volume * this.level;
      this.sfx?.setVolume(this.tuning.music.volume * this.level);
      try { localStorage.setItem("witch.volume", String(this.level)); } catch { /* fine */ }
    });
    for (const ev of ["pointerdown", "keydown"]) volumeRange.addEventListener(ev, e => e.stopPropagation()); // its own presses and arrow keys don't fly her
    volumeEl.append(volumeIcon, volumeRange); showVolume();
    document.body.append(volumeEl);
  }

  /** The sound effects, once there's an AudioContext (the creator's first click, or the start). */
  ensureSfx(): void {
    const { tuning } = this;
    if (this.audio && !this.sfx && tuning.sfx.on) { this.sfx = new Sfx(this.audio, tuning.music.volume * this.level, tuning.sfx, this.style.root + 24); this.sfxCues = new SfxCues(this.sfx, (by, sec) => this.music?.duck(by, sec)); const sfx = this.sfx; (window.requestIdleCallback ?? ((f: () => void) => setTimeout(f, 300)))(() => sfx.prewarm()); } // (its slow parts built while the start screen idles)
  }

  /** A first press (the creator's): the context, resumed, and the sound effects. */
  wake(): void { try { this.audio ??= new AudioContext(); void this.audio.resume(); this.ensureSfx(); } catch { /* no sound yet */ } }

  /** Play starts: the context, the music and the sound effects. */
  start(): void {
    const { tuning } = this;
    try { this.audio ??= new AudioContext(); void this.audio.resume(); if (!this.music && tuning.music.on) this.music = new Music(this.audio, tuning.music.volume * this.level, this.style, this.seed, tuning.music.src); this.ensureSfx(); } catch { /* no sound yet anyway */ }
  }

  /** The audio watchdog (Ed, round 13: "the music stops after about two minutes"): once a second, a context suspended is
   *  resumed, and music gone silent (or anything non-finite in the music or the sound effects) is rebuilt afresh; each
   *  mend goes in the playtest log (L). (Before the first home speaker boots, the music is silent on purpose: not
   *  expected.) `live`: whether the game is being played now (not paused, frozen or hidden); `booted`: a home speaker up. */
  watch(live: () => boolean, booted: () => boolean, playtest: PlaytestLog): void {
    const { tuning } = this;
    this.live = live; this.booted = booted;
    const watchdog = this.watchdog = new AudioWatchdog(
      () => ({ ctx: this.audio, music: this.music, sfx: this.sfx, wanted: !!this.audio && live(), musicExpected: this.musicExpected() }),
      what => {
        playtest.audio(what);
        console.warn(`audio watchdog: ${what}`);
        if (!this.audio) return;
        if ((what === "music-silent" || what === "music-nonfinite") && this.music) { this.music.dispose(); this.music = new Music(this.audio, tuning.music.volume * this.level, this.style, this.seed, tuning.music.src); }
        if (what === "sfx-nonfinite" && this.sfx) { this.sfx.dispose(); this.sfx = null; this.sfxCues = null; this.ensureSfx(); }
      },
    );
    setInterval(() => { try { watchdog.check(); } catch { /* never let the watchdog itself stop anything */ } }, 1000);
    const r2 = (x: number) => Math.round(x * 100) / 100;
    playtest.audioState = () => ({ state: this.audio?.state ?? "none", volume: this.music ? r2((this.music.output as GainNode).gain.value) : 0, distort: r2(this.lastMix?.distort ?? 0), distance: Math.round(Math.min(9999, this.lastMix?.distance ?? 9999)), mends: watchdog.mends.length, ...(this.music ? { gap: r2(this.music.stats.gap), resyncs: this.music.stats.resyncs, late: this.music.stats.late, ahead: r2(this.music.stats.ahead ?? 0) } : {}) });
  }

  private live: () => boolean = () => false;
  private booted: () => boolean = () => false;
  /** Whether the music should be heard now: playing, its volume up, the game running and shown, the home speakers booting
   *  (the watchdog's and the output meter's test). */
  musicExpected(): boolean { return !!this.music && this.level > 0 && this.music.audible && this.live() && this.booted(); }

  /** Frozen (platform/freeze.ts): the context suspended, and resumed after. */
  freeze(on: boolean): void { try { void (on ? this.audio?.suspend() : this.audio?.resume()); } catch { /* no sound */ } }

  /** A frame: the music, one track mixed by how near the witch is to a playing soundsystem; the cues; the bedroom's room. */
  update(game: Game, cue: MusicCue, roomOpen: boolean): void {
    this.lastMix = musicMix(game, game.witch);
    this.music?.update(this.lastMix, cue, game.clock.time, game.beat, !game.clock.paused, this.tuning.music, game.timeScale ?? 1, partyOverEase(game, OVER_DEBUG)); // (the world slowed in a legend's circle: the music with it)
    if (!game.clock.paused) this.sfxCues?.update(game, game.clock.time);
    // the creator's room in the treehouse; and after the spell, at her decks with the home speakers not yet up, its record
    // crackling under her hands (quieter: room.decks) once her routine has dropped the needle (rules/djSet.ts; the room quieter
    // still before), till the boot's first speaker brings the music in
    const atDecks = game.witch.seated && typeof game.party.spellAt === "number" && !game.speakerBoot.some(t => t !== null);
    const sp = game.party.spellAt, dropped = atDecks && typeof sp === "number" && game.clock.time >= timeAt(game.beat, Math.ceil(beatAt(game.beat, sp + PARTY_CAST) - 1e-6) + 1); // (her routine's needle down: rules/djSet.ts, its beat 1)
    this.sfx?.room(roomOpen ? 1 : atDecks ? this.tuning.sfx.room.decks * (dropped ? 1 : 0.3) : 0);
  }
}
