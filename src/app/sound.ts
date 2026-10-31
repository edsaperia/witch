// The game's sound on the page: the AudioContext (made at the first press: browsers keep sound off till then), the music,
// the sound effects and their cues, and the audio watchdog. One a page.
import { beatAt, timeAt } from "../rules/beat";
import { PARTY_CAST } from "../rules/party";
import { djIntroEnd } from "../rules/djSet";
import { Music } from "../platform/audio/music";
import { slowAmount, slowest } from "../render/slowtime";
import { Sfx } from "../platform/audio/sfx";
import { OVER_DEBUG, SfxCues } from "../platform/audio/sfxCues";
import { AudioWatchdog } from "../platform/audio/watchdog";
import { ShedValve } from "../platform/audio/shed";
import { bufferHint, learnBuffer, learntBuffer, nextBuffer } from "../platform/audio/buffer";
import { musicMix, partyOverEase } from "../rules/music";
import type { MusicCue } from "../rules/musicPlan";
import type { MusicStyle } from "../rules/musicScore";
import { nightStyle } from "../rules/musicSet";
import { voiceRecordings } from "../platform/audio/voiceSamples";
import type { Game } from "../rules/game";
import type { Tuning } from "../rules/tuning";
import type { PlaytestLog } from "../platform/playtestLog";
import type { MusicLab } from "./musicLab";
import { logCaughtError } from "../platform/caughtError";
import { PotionFilter } from '../platform/audio/potionFilter';

export class Sound {
  private potionFilter: PotionFilter | null = null;
  private potionOutput(): AudioNode {
    if (this.potionFilter?.context !== this.audio) this.potionFilter = new PotionFilter(this.audio!);
    return this.potionFilter.input;
  }
  audio: AudioContext | null = null;
  music: Music | null = null;
  sfx: Sfx | null = null;
  sfxCues: SfxCues | null = null;
  /** The ley line's drawn current link (the view's), for the pulse's fizz (SfxCues.leyLink). */
  leyLink: SfxCues["leyLink"] = null;
  /** The volume, 0 to 1 (fixed: the corner slider went, Ed 2026-10-10; the pause page's Music and Sound effects sliders since
   *  2026-10-14 set the tuning's music.volume and sfx.volume, read live in update, app/settings.ts remembering them). */
  level = 0.8;
  /** The effects' sfx.volume as last given to their kit (update: given again when the slider moves). */
  private sfxVol = -1;
  /** The music's last mix (by how near she is to a playing soundsystem): the playtest log reads it. */
  lastMix: ReturnType<typeof musicMix> | null = null;
  watchdog: AudioWatchdog | null = null;
  /** The safety valve (shed.ts): the sound shed a step at a time while the audio thread under-runs; `?audio=lite|full`. */
  readonly valve = new ShedValve(audioParam());

  constructor(private tuning: Tuning, private style: MusicStyle, private seed: number) {
  }

  /** A new night on the same page (docs/plans/sail-without-reload.md, A4 and B6; nothing calls it yet): its tuning, seed and
   *  style for everything made from here on (the watchdog's rebuilds too), the music's timeline anchored afresh at its game
   *  time 0, the effects re-pointed at its knobs and given fresh cues, and the safety valve's grace again. The same context. */
  setNight(tuning: Tuning, seed: number, style: MusicStyle = this.style): void {
    this.tuning = tuning; this.seed = seed; this.style = style;
    this.night = null; // (the night's set's style given to the engine on the next frame)
    const engine = this.music?.engine;
    if (engine) { engine.seed = seed; engine.newTimeline(); }
    if (this.sfx) {
      this.sfx.retune(tuning.sfx); this.sfxVol = -1;
      this.sfxCues?.dispose(); this.sfxCues = this.cues(this.sfx);
    }
    if (this.begun) this.valve.begin(performance.now() / 1000);
  }

  /** Sailing between islands in place (docs/plans/sail-without-reload.md B6; Ed's decision 3): 1 as she sails, the old night's
   *  music fading out (the tuning's sfx.sail.fade seconds) and the sea and the wind fading in (places.ts Sailing), the music's
   *  engine scheduling nothing while the next island is made (main.ts updates only this then: tickSail); 0 as the new night starts,
   *  the cue fading as its music comes in. No crossfade from the old night: setNight's fresh timeline starts the new one's. */
  sailing(level: number): void {
    const was = this.sail;
    this.sail = level;
    if (level > 0 && !(was > 0)) this.music?.fadeOut(this.tuning.sfx.sail?.fade ?? 1.5);
    this.tickSail();
  }
  /** The sail's cue as it is now: each frame while the island is made (the night's own update does it after). */
  tickSail(): void { this.sfx?.sailing(this.sail); }
  /** The sail's cue's level now (0 none). */
  sail = 0;

  /** The cues for a night's game (per-game state: creatures by id, game times, areas by cell). */
  private cues(sfx: Sfx): SfxCues { return new SfxCues(sfx, (by, sec) => this.music?.duck(by, sec)); }
  /** The night's style (rules/musicSet.ts: the style with the night's set as its arc), once a game's been seen. */
  private night: MusicStyle | null = null;
  /** The pause page's Music Lab (app/musicLab.ts; Ed, 2026-10-15), once opened: its settings over the night's style and cue,
   *  its levels on the engine's channels each frame, and its preview in the bedroom on a clock of its own. */
  lab: MusicLab | null = null;
  private get playing(): MusicStyle { return this.night ?? this.style; }


  /** The sound effects, once there's an AudioContext (the creator's first click, or the start). */
  ensureSfx(): void {
    const { tuning } = this;
    if (this.audio && !this.sfx && tuning.sfx.on) { this.sfx = new Sfx(this.audio, SFX_BASE * this.level, tuning.sfx, this.style.root + 24, this.potionOutput()); this.sfxVol = tuning.sfx.volume; this.sfxCues = this.cues(this.sfx); const sfx = this.sfx; (window.requestIdleCallback ?? ((f: () => void) => setTimeout(f, 300)))(() => sfx.prewarm()); } // (its slow parts built while the start screen idles)
  }

  /** The context, with the tuning's output buffer (music.buffer, seconds; else its latencyHint category, music.latency; ?latency= a
   *  category or seconds for one load; a browser that under-ran asks for more: platform/audio/buffer.ts): a bigger buffer gives the
   *  audio thread more room before it under-runs (heard as the sound cutting out), at the cost of later sound effects. */
  private context(): AudioContext {
    let q: string | null = null;
    try { q = new URLSearchParams(location.search).get("latency"); } catch { /* no page */ }
    return new AudioContext({ latencyHint: bufferHint(this.tuning.music.buffer, this.tuning.music.latency, q, learntBuffer()) });
  }

  /** A first press (the creator's): the context, resumed, the sound effects, and the music built (silent till play starts:
   *  Ed, 2026-10-14, its making off play's first frame, where his logs had it at a second). */
  wake(): void { try { this.build("wake"); } catch (e) { logCaughtError(e, "sound wake"); } }

  /** The context, the music and the sound effects, as far as they're wanted and not made yet; what each took goes in the
   *  playtest log when it's slow (`?audio` timing for Ed's laptop, 2026-10-14). */
  private build(why: string): void {
    const { tuning } = this, t0 = performance.now();
    const fresh = !this.audio;
    this.audio ??= this.context(); void this.audio.resume();
    const t1 = performance.now();
    if (!this.music && tuning.music.on) { this.music = new Music(this.audio, tuning.music.volume * this.level, this.playing, this.seed, tuning.music.src, musicAhead(), this.potionOutput()); this.voices(); }
    const t2 = performance.now();
    this.ensureSfx();
    const t3 = performance.now(), ms = (x: number) => Math.round(x);
    if (t3 - t0 > 50) this.note(`audio ${why} ${ms(t3 - t0)} ms: ${fresh ? `context ${ms(t1 - t0)}, ` : ""}music ${ms(t2 - t1)}, effects ${ms(t3 - t2)}`);
  }
  /** A line for the playtest log (once it's watching). */
  private note: (what: string) => void = () => {};

  /** The music's recorded voices (the singer's and the vocoder's), once loaded: given to each music made. */
  private voices(): void {
    const m = this.music, a = this.audio;
    if (!m?.engine || !a) return;
    void voiceRecordings(a).then(r => { m.engine?.setRecordings(r); if (r.whispers) m.engine?.setWhisper(r.whispers); });
  }

  /** Play starts: the context, the music and the sound effects. */
  start(): void {
    try { this.build("start"); } catch (e) { logCaughtError(e, "sound start"); }
    if (!this.begun) { this.begun = true; this.valve.begin(performance.now() / 1000); } // (the safety valve lets the start pass: shed.ts)
  }
  private begun = false;

  /** The audio watchdog (Ed, round 13: "the music stops after about two minutes"): once a second, a context suspended is
   *  resumed, and music gone silent (or anything non-finite in the music or the sound effects) is rebuilt afresh; each
   *  mend goes in the playtest log (the pause page's Download log). (Before the first home speaker boots, the music is silent on purpose: not
   *  expected.) `live`: whether the game is being played now (not paused, frozen or hidden); `booted`: a home speaker up; `log`:
   *  the night's playtest log (or a way to it, read each time: a new night's own run). */
  watch(live: () => boolean, booted: () => boolean, log: PlaytestLog | (() => PlaytestLog)): void {
    const playtest = typeof log === "function" ? log : () => log;
    this.live = live; this.booted = booted;
    this.note = what => playtest().audio(what);
    const watchdog = this.watchdog = new AudioWatchdog(
      () => ({ ctx: this.audio, music: this.music, sfx: this.sfx, wanted: !!this.audio && live(), musicExpected: this.musicExpected() }),
      what => {
        playtest().audio(what);
        console.warn(`audio watchdog: ${what}`);
        if (!this.audio) return;
        if ((what === "music-silent" || what === "music-nonfinite") && this.music) { this.music.dispose(); this.music = new Music(this.audio, this.tuning.music.volume * this.level, this.playing, this.seed, this.tuning.music.src, musicAhead(), this.potionOutput()); this.voices(); }
        if (what === "sfx-nonfinite" && this.sfx) { this.sfx.dispose(); this.sfx = null; this.sfxCues = null; this.ensureSfx(); }
      },
    );
    setInterval(() => { try { watchdog.check(); } catch (e) { logCaughtError(e, "audio watchdog"); } }, 1000);
    const r2 = (x: number) => Math.round(x * 100) / 100;
    playtest().audioState = () => ({ state: this.audio?.state ?? "none", volume: this.music ? r2((this.music.output as GainNode).gain.value) : 0, distort: r2(this.lastMix?.distort ?? 0), distance: Math.round(Math.min(9999, this.lastMix?.distance ?? 9999)), mends: watchdog.mends.length, shed: this.valve.level, ...(this.music ? { gap: r2(this.music.stats.gap), resyncs: this.music.stats.resyncs, late: this.music.stats.late, ahead: r2(this.music.stats.ahead ?? 0) } : {}), ...(this.music?.ahead ? { drawn: this.music.ahead.drawing, bars: this.music.ahead.stats.rendered, barsLate: this.music.ahead.stats.late, barsDropped: this.music.ahead.stats.dropped, beatShifts: this.beatShifts, beatShifted: r2(this.beatShifted) } : {}) }); // (drawn ahead: the bars, docs/notes/music.md "Music ahead")
  }

  private live: () => boolean = () => false;
  private booted: () => boolean = () => false;
  /** Whether the music should be heard now: playing, its volume up, the game running and shown, the home speakers booting
   *  (the watchdog's and the output meter's test). */
  musicExpected(): boolean { return !!this.music && this.level > 0 && this.tuning.music.volume > 0 && this.music.audible && this.live() && this.booted(); }

  /** Frozen (platform/freeze.ts): the context suspended, and resumed after. */
  freeze(on: boolean): void { try { void (on ? this.audio?.suspend() : this.audio?.resume()); } catch { /* no sound */ } }

  /** Once a second, from the output meter's ClockWatch: sheds a step if the audio thread is falling behind (the reason, if
   *  it did, for the playtest log). */
  shedCheck(t: number, underruns: number | null, drift: number): string | null {
    if (t < this.valve.graceUntil) { this.startRuns = underruns ?? 0; return this.valve.feed(t, underruns, drift); } // (the start's own under-runs not counted)
    const runs = underruns === null ? null : underruns - this.startRuns;
    // under-running anyway: next load asks for a bigger buffer (platform/audio/buffer.ts), once a load
    if (!this.bumped && this.audio) { const next = nextBuffer(runs, this.audio.baseLatency ?? 0, learntBuffer()); if (next !== null) { learnBuffer(next); this.bumped = true; return `${runs} under-runs: next load asks for a ${Math.round(next * 1000)} ms buffer`; } }
    return this.valve.feed(t, underruns, drift, this.music?.stats.resyncs ?? 0);
  }
  private bumped = false;
  private startRuns = 0;
  /** Times the game's beat was moved on to the music's, and by how many seconds in all (the playtest log's). */
  private beatShifts = 0;
  private beatShifted = 0;
  /** This frame's audio work by part (ms), for the stall log's slow audio frames (main.ts). */
  parts: Record<string, number> = {};

  /** A frame: the music, one track mixed by how near the witch is to a playing soundsystem; the cues; the bedroom's room. */
  update(game: Game, cue: MusicCue, roomOpen: boolean): void {
    this.potionFilter?.update(game);
    const t0 = performance.now();
    this.lastMix = musicMix(game, game.witch);
    // The volumes (Ed, 2026-10-14: the pause page's Music and Sound effects sliders; app/settings.ts remembers them): the tuning's
    // music.volume and sfx.volume read live, the music's on its own bus, the effects' on their kit (SFX_BASE holds today's loudness
    // at the built values, so the two move apart).
    const mv = this.tuning.music.volume * this.level;
    if (this.music && this.music.volume !== mv) this.music.volume = mv;
    if (this.sfx && this.sfxVol !== this.tuning.sfx.volume) { this.sfxVol = this.tuning.sfx.volume; this.sfx.setVolume(SFX_BASE * this.level); }
    // the night's set (Ed, 2026-10-11): the music plays its arc, from the next block; the Music Lab's settings over it (the same
    // object while nothing changes there)
    const night0 = nightStyle(this.style, game.musicSet), night = this.lab ? this.lab.styled(night0, game.musicSet) : night0;
    if (night !== this.night) { this.night = night; this.music?.engine?.setStyle(night); }
    if (this.music) { this.music.shed = this.valve.level; this.music.aheadAllowed = !this.lab; } // (the watchdog's rebuilt music too; the lab's levels are the live engine's)
    if (this.music?.engine && this.audio) this.music.engine.lead = (this.audio.baseLatency ?? 0) + ((this.audio as AudioContext & { outputLatency?: number }).outputLatency ?? 0); // (the notes sent early by the context's latency: heard on the beat shown)
    if (this.sfx) this.sfx.shed = this.valve.level;
    const t1 = performance.now();
    // (the Music Lab's jump on the cue; its bedroom preview on its own clock, the mix whole, with no night playing)
    const labCue = this.lab ? this.lab.cued(cue) : cue, pv = this.lab?.previewTime(performance.now() / 1000) ?? null;
    const mix = pv ? { ...this.lastMix, volume: 1, cutoff: 16000, distort: 0 } : this.lastMix;
    // (the audio clock the master: a stall's lost time moves the game's beat on to the music's, docs/notes/music.md "Music ahead")
    const lost = !pv && !game.clock.paused ? this.music?.keepBeat(game.clock.time, game.beat) ?? 0 : 0;
    if (lost) { this.beatShifts++; this.beatShifted += lost; }
    this.music?.update(mix, labCue, pv ? pv.time : game.clock.time, pv ? pv.clock : game.beat, pv ? true : !game.clock.paused, this.tuning.music, pv ? 1 : game.timeScale ?? 1, pv ? 0 : partyOverEase(game, OVER_DEBUG), pv || !game.witch.perch ? 0 : slowAmount(game.timeScale ?? 1, slowest(this.tuning))); // (the world slowed in a legend's circle or the treehouse: the music with it, and muffled there)
    if (this.lab && this.music?.engine && this.audio) this.lab.frame(this.music.engine, this.audio);
    const t2 = performance.now();
    if (this.sfxCues) this.sfxCues.leyLink = this.leyLink;
    if (!game.clock.paused) this.sfxCues?.update(game, game.clock.time);
    if (this.sail > 0 || this.sfx?.sailingBuilt) this.tickSail();
    const t3 = performance.now();
    // the creator's room in the treehouse; and after the spell, at her decks with the home speakers not yet up, its record
    // crackling under her hands (quieter: room.decks) once her routine has dropped the needle (rules/djSet.ts; the room quieter
    // still before), till the boot's first speaker brings the music in
    const end = djIntroEnd(game), atDecks = game.witch.seated && typeof game.party.spellAt === "number" && !game.speakerBoot.some(t => t !== null) && (end === null || game.clock.time < end); // (her routine done, the record becomes the music: rules/musicPlan.ts dropBar)
    const sp = game.party.spellAt, dropped = atDecks && typeof sp === "number" && game.clock.time >= timeAt(game.beat, Math.ceil(beatAt(game.beat, sp + PARTY_CAST) - 1e-6) + 1); // (her routine's needle down: rules/djSet.ts, its beat 1)
    this.sfx?.room(roomOpen ? 1 : atDecks ? this.tuning.sfx.room.decks * (dropped ? 1 : 0.3) : 0);
    this.parts = { mix: t1 - t0, music: t2 - t1, cues: t3 - t2, room: performance.now() - t3 };
  }
}

/** What the effects' kit is given before its own sfx.volume: the music's built volume (0.5), as the kit was built with before
 *  the sliders (sfxKit.ts setVolume: this times the tuning's sfx.volume on its bus). */
const SFX_BASE = 0.5;

/** The music drawn ahead (platform/audio/musicAhead.ts; Ed, 2026-10-27: the default, `?music=live` the old way). */
function musicAhead(): boolean { try { return new URLSearchParams(location.search).get("music") !== "live"; } catch { return true; } }

/** `?audio=lite|full` for one load (shed.ts). */
function audioParam(): string | null { try { return new URLSearchParams(location.search).get("audio"); } catch { return null; } }
