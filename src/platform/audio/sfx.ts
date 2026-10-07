// The sound effects (2026-10-05): every one synthesised, like the music (no samples), each a few
// short-lived nodes; the lasting ones (a charge's rumble, home's meadow) built once and only turned
// up and down. Pitches keep to the music's key (the style's root, a minor pentatonic). Volumes and
// rates are the tuning's sfx (config/tuning.json); platform/audio/sfxCues.ts decides when.
// This is the one face the game sees; the sounds themselves are made in:
//  - sfxKit.ts: the output bus, the builders every sound is made of, the legends' big space;
//  - babble.ts: speech without words (the witch's 💌s and cries, the creatures' speech);
//  - whale.ts: the legends' whale song (moods, sleep and nightmares, a wind-up's swell);
//  - chimes.ts: the 💌 chime, tick, flourish and landing puff, the state turns, the stings (a
//    soundsystem lost, a relic found, the boot-up over), a stun's twinkle;
//  - ambience.ts: a knockback, a lob landing, a legend's charge and roar, dancers' shoes, home's
//    meadow (and its balloons and picnic);
//  - places.ts: a pond, a picnic in a partified area, the creator's room;
//  - power.ts: a runestone crackling into life as a speaker or soundsystem.
import { Charge, Meadow, impact, knock, roar, taps } from "./ambience";
import { Picnic, Pond, Room, Sea } from "./places";
import { Night, type NightKind } from "./night";
import { powerUp } from "./power";
import { Spell } from "./spell";
import { scratch } from "./deck";
import { Babble } from "./babble";
import * as chimes from "./chimes";
import { SfxKit, type SfxTuning } from "./sfxKit";
import type { CreatureVoice, Mood } from "./voices";
import { Whale } from "./whale";

export type { SfxTuning } from "./sfxKit";

export class Sfx {
  private k: SfxKit;
  private babble: Babble;
  private whales: Whale;
  private charging: Charge;
  private home: Meadow;
  private pondBed: Pond;
  private picnicBed: Picnic;
  private roomBed: Room;
  private spellFx: Spell;
  /** The sea on the beach: made the first time she comes near it (most runs never do). */
  private seaBed: Sea | null = null;

  constructor(ctx: AudioContext | OfflineAudioContext, volume: number, T: SfxTuning, root = 57, dest?: AudioNode) {
    this.k = new SfxKit(ctx, volume, T, root, dest);
    this.whales = new Whale(this.k);
    this.babble = new Babble(this.k, (mood, pan, near) => this.whales.whale(mood, pan, near));
    this.charging = new Charge(this.k);
    this.home = new Meadow(this.k);
    this.pondBed = new Pond(this.k);
    this.picnicBed = new Picnic(this.k);
    this.roomBed = new Room(this.k);
    this.spellFx = new Spell(this.k);
  }

  get volume(): number { return this.k.volume; }
  /** What reaches the speakers (the audio watchdog taps it). */
  get output(): AudioNode { return this.k.final; }
  /** Silenced for good and let go (the watchdog building afresh). */
  /** Build ahead what is slow to build the first time (the legends' long reverb: tens of milliseconds on the main thread, once
   *  mid-play when the first stone powered up; the audit's phase 2), so it's ready before play. */
  prewarm(): void { this.k.space(); }
  dispose(): void { try { this.k.final.disconnect(); } catch { /* gone */ } }
  setVolume(v: number): void { this.k.setVolume(v); }

  // ——— 💌 ———
  letter(pan = 0, near = 1): void { this.babble.letter(pan, near); }
  hit(pan = 0, near = 1, spent = false): void { chimes.hit(this.k, pan, near, spent); }
  fill(amount: number, pan = 0, near = 1): void { chimes.fill(this.k, amount, pan, near); }
  invited(level: number, pan = 0, near = 1): void { chimes.invited(this.k, level, pan, near); }
  /** A 💌 coming down on the ground, having met no one. */
  land(pan = 0, near = 1): void { chimes.land(this.k, pan, near); }
  reply(v: CreatureVoice, amount: number, pan = 0, near = 1): void { this.babble.reply(v, amount, pan, near); }

  // ——— creatures ———
  speak(v: CreatureVoice, mood: Mood, pan = 0, near = 1, prio = near): void { this.babble.speak(v, mood, pan, near, prio); }
  howl(v: CreatureVoice, pan = 0, near = 1): void { this.babble.howl(v, pan, near); }
  enraged(pan = 0, near = 1, many = 1): void { chimes.enraged(this.k, pan, near, many); }
  happy(pan = 0, near = 1): void { chimes.happy(this.k, pan, near); }

  // ——— the witch ———
  ouch(strain = 0, pan = 0): void { this.babble.ouch(strain, pan); }
  knockdown(pan = 0): void { this.babble.knockdown(pan); }
  knock(metres: number, pan = 0): void { knock(this.k, metres, pan); }
  twinkle(i: number, pan = 0): void { chimes.twinkle(this.k, i, pan); }

  // ——— legends ———
  windup(pan = 0, near = 1): void { this.whales.windup(pan, near); }
  legends(sleep: number, breath: number, unease: number, pan = 0): void { this.whales.legends(sleep, breath, unease, pan); }
  /** A restless legend calling out sadly in its own voice (`urgency` its restlessness). */
  lament(v: CreatureVoice, urgency: number, pan = 0, near = 1): void { this.babble.lament(v, urgency, pan, near); }
  bellow(pan = 0, near = 1): void { this.charging.bellow(pan, near); }
  hoof(pan = 0, near = 1, light = false): void { this.charging.hoof(pan, near, light); }
  charge(rumble: number, skid: number, pan = 0): void { this.charging.update(rumble, skid, pan); }
  /** A lobbed shot landing; `big`, a legend's. */
  impact(big: boolean, pan = 0, near = 1): void { impact(this.k, big, pan, near); }

  // ——— stings and places ———
  lost(urgent = false): void { chimes.lost(this.k, urgent); }
  relic(pan = 0): void { chimes.relic(this.k, pan); }
  /** A runestone crackling into life as a speaker (the home ring's `step`, 0 to 11) or a wave's soundsystem; `full` the last of the ring. */
  power(step: number, pan = 0, near = 1, full = false): void { powerUp(this.k, step, pan, near, full); }
  /** The boot-up over: things stirring. */
  stir(): void { chimes.stir(this.k); }
  meadow(level: number): void { this.home.update(level); }
  /** A legend turning angry: its roar. */
  roar(pan = 0, near = 1): void { roar(this.k, pan, near); }
  /** Dancers' party shoes tapping on the beat. */
  taps(n: number, pan = 0, near = 1): void { taps(this.k, n, pan, near); }
  /** By a pond, a picnic in a partified area, in the creator's room: each frame, by how near (0-1). */
  pond(level: number, pan = 0): void { this.pondBed.update(level, pan); }
  picnic(level: number, pan = 0): void { this.picnicBed.update(level, pan); }
  room(level: number): void { this.roomBed.update(level); }
  /** Her decks (deck.ts): a stroke of the record under her hand; her hype. */
  scratch(forward: boolean, pan = 0, near = 1): void { scratch(this.k, forward, pan, near); }
  whoop(pan = 0, near = 1): void { this.babble.whoop(pan, near); }
  /** The party spell's scroll (ui/spellScroll.ts): "hum" its level every frame, "rustle" the ripple stirring, "crackle" the
   *  grow, "burst" the burst. */
  spell(cue: "hum" | "rustle" | "crackle" | "burst", v = 1): void {
    if (cue === "hum") this.spellFx.hum(v); else if (cue === "rustle") this.spellFx.rustle(v); else if (cue === "crackle") this.spellFx.crackle(); else this.spellFx.burst();
  }
  /** By the sea on the beach (0-1 by how near the water): nothing made until she first comes near. */
  sea(level: number, pan = 0): void { if (level > 0.001 || this.seaBed) (this.seaBed ??= new Sea(this.k)).update(level, pan); }
  /** Whether the sea's sounds are built (none in an ordinary run). */
  get seaBuilt(): boolean { return !!this.seaBed?.built; }
  /** The party's over: the area's night (`kind`, at `level` 0-1), made the first time it's heard (most runs, never). */
  night(kind: NightKind | null, level: number): void { if (level > 0.001 || this.nightBed) (this.nightBed ??= new Night(this.k)).update(kind, level); }
  /** A sleeping animal's snore (`size` 0 a baby to 1 a legend). */
  snore(size: number, pan = 0, near = 1): void { (this.nightBed ??= new Night(this.k)).snore(size, pan, near); }
  /** Whether the night's sounds are built. */
  get nightBuilt(): boolean { return !!this.nightBed?.built; }
  private nightBed: Night | null = null;
  /** Each area's ambience in play (night.ts layers without their bed): `kind` her area's, at `level` (0-1). Built when first heard. */
  ambience(kind: NightKind | null, level: number): void { if (level > 0.001 || this.ambienceBed) (this.ambienceBed ??= new Night(this.k, () => this.k.T.ambience)).update(kind, level); }
  private ambienceBed: Night | null = null;
}
