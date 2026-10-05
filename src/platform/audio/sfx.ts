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
//  - ambience.ts: a knockback, a lob landing, a legend's charge, home's meadow (and its balloons and picnic).
import { Charge, Meadow, impact, knock } from "./ambience";
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

  constructor(ctx: AudioContext | OfflineAudioContext, volume: number, T: SfxTuning, root = 57, dest?: AudioNode) {
    this.k = new SfxKit(ctx, volume, T, root, dest);
    this.whales = new Whale(this.k);
    this.babble = new Babble(this.k, (mood, pan, near) => this.whales.whale(mood, pan, near));
    this.charging = new Charge(this.k);
    this.home = new Meadow(this.k);
  }

  get volume(): number { return this.k.volume; }
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
  bellow(pan = 0, near = 1): void { this.charging.bellow(pan, near); }
  hoof(pan = 0, near = 1, light = false): void { this.charging.hoof(pan, near, light); }
  charge(rumble: number, skid: number, pan = 0): void { this.charging.update(rumble, skid, pan); }
  /** A lobbed shot landing; `big`, a legend's. */
  impact(big: boolean, pan = 0, near = 1): void { impact(this.k, big, pan, near); }

  // ——— stings and places ———
  lost(urgent = false): void { chimes.lost(this.k, urgent); }
  relic(pan = 0): void { chimes.relic(this.k, pan); }
  /** The boot-up over: things stirring. */
  stir(): void { chimes.stir(this.k); }
  meadow(level: number): void { this.home.update(level); }
}
