// When the sound effects play (platform/sfx.ts): each frame, from what the rules did this frame
// (their events) and what changed since the last (a creature turning enraged or happy), heard from
// the first witch, fading to nothing `sfx.hear` metres off and panned by where it is on screen.
// The rules know nothing of it.
//  - 💌s (the invites, #89): its letters' events, read as they come (shot: her syllable; hit: the
//    chime, the creature's small reply, the affection meter's tick; happy: the flourish); the
//    talk's invites (with 💌s off) still flourish.
//  - States: a creature turning enraged (a growl and the nearest's angry speech; a crowd turning at
//    once, one heavier growl) or happy (a pop and its happy speech): its area's guards, a friendly
//    area's creatures, a legend at peace.
//  - Attacks are speech (Ed, 2026-10-05): an attacker's burst of babble in its own voice, by mood;
//    a legend's slow long-range attack (its own event when it lands) a deep, drawn-out spoken wind-up.
//  - Legends: the nearest sleeping one snores and dreams; restless (#87), a nightmare's unease
//    grows under it.
import type { Game } from "../rules/game";
import type { Creature } from "../rules/creatures";
import { restlessness } from "../rules/dream";
import { bossBreath } from "../render/leash";
import { strengthOf } from "../rules/combat";
import { hash2 } from "../rules/random";
import type { CombatEventKind } from "../rules/combat";
import type { Tuning } from "../rules/tuning";
import type { CallStyle, CreatureVoice, Mood, Sfx } from "./sfx";
import voices from "../../config/creature-voices.json";

const VOICES = voices as unknown as { families: Record<string, Partial<CallStyle>>; species: Record<string, Partial<CallStyle> & { family?: string }> };
/** A species' call: its family's style with its own tweaks over it (config/creature-voices.json). */
export function callOf(species: string): CallStyle {
  const sp = VOICES.species[species] ?? {}, fam = VOICES.families[sp.family ?? ""] ?? {};
  return { glide: 1, dur: 1, gap: 1, ...fam, ...sp, pitch: (fam.pitch ?? 1) * (sp.pitch ?? 1), formants: (fam.formants ?? 1) * (sp.formants ?? 1) } as CallStyle; // (pitch and formants multiply; the rest the species overrides)
}

/** The combat events that are a creature attacking (its id the attacker): each a burst of its speech. */
const ATTACKS = new Set<CombatEventKind | "legendWindup">(["windup", "shot", "beam", "pulse", "quake", "phase", "nova", "rush", "charged", "leapt", "slammed", "sprung", "flash", "legendWindup"]);

/** A creature's voice: higher the smaller and younger (its level, its strength class: a swarm's
 *  small, a loner's big), each species its own pitch, formants and source. */
export function voiceOf(c: Creature, t: Tuning): CreatureVoice {
  let h = 0;
  for (let i = 0; i < c.species.length; i++) h = (h * 31 + c.species.charCodeAt(i)) >>> 0;
  const a = hash2(h, 1, 851), b = hash2(h, 2, 853), k = strengthOf(c.species, c.level as 0 | 1 | 2 | 3), size = k < 1 ? 1.35 : k > 1 ? 0.78 : 1;
  const call = callOf(c.species);
  return {
    pitch: t.sfx.voice.animals.pitch * Math.pow(2, -0.65 * (c.level - 1)) * size * (0.92 + 0.16 * a) * call.pitch,
    formants: (1.3 - 0.13 * c.level) * (k < 1 ? 1.12 : k > 1 ? 0.9 : 1) * (0.95 + 0.1 * b) * call.formants,
    wave: call.wave ?? (a < 0.5 ? "sawtooth" : a < 0.8 ? "square" : "triangle"),
    legend: !!c.boss, call,
  };
}

/** How it speaks: happy (on her side, guarding, at peace), enraged, or a wild one's grumble. */
export const speechMood = (c: Creature): Mood => (c.leashed || c.guard || c.friendly || c.legendState === "happy" ? "happy" : c.enraged || c.siege ? "enraged" : "grumpy");

const happyNow = (c: Creature) => !c.leashed && !c.gone && (!!c.guard || !!c.friendly || (!!c.boss && c.legendState === "happy"));

export class SfxCues {
  private enraged = new Set<number>();
  private happy = new Set<number>();
  private primed = false;
  private flourished = new Map<number, number>();

  /** Her hits left last frame (a drop is a hit that landed), and whether she was down. */
  private hp = -1;
  private down = false;

  /** `duck`: dip the music (by, seconds) under her "ouch!". */
  constructor(private sfx: Sfx, private duck: (by: number, seconds: number) => void = () => {}) {}

  update(g: Game, time: number): void {
    const t = g.tuning.sfx, w = g.witch, hear = Math.max(1, t.hear);
    const near = (x: number, z: number) => Math.max(0, 1 - Math.hypot(x - w.x, z - w.z) / hear);
    const pan = (x: number) => (x - w.x) / 30;
    const S = this.sfx;

    // 💌 (#89): its own events
    const inv = g.witches[0]?.invites;
    for (const e of inv?.events ?? []) {
      const k = near(e.x, e.z);
      if (k <= 0) continue;
      if (e.kind === "shot") S.letter(pan(e.x), Math.max(0.6, k));
      else if (e.kind === "hit") {
        S.hit(pan(e.x), k, !!e.spent);
        const m = e.id !== undefined ? inv?.meter?.get(e.id) : undefined;
        if (!e.spent && m !== undefined) S.fill(m, pan(e.x), k);
        const c = e.id !== undefined ? g.creatures[e.id] : undefined;
        if (c && !e.spent && this.ready(c.id, time, 0.3)) S.reply(voiceOf(c, g.tuning), m ?? 0, pan(e.x), k);
      } else if (e.kind === "happy" && e.id !== undefined) this.flourish(g, e.id, time, k, pan(e.x));
    }
    // invited by talking (and whatever else the leash reports)
    for (const e of g.leash.events) if (e.kind === "invited") this.flourish(g, e.id, time, Math.max(0.6, near(e.x, e.z)), pan(e.x));

    // states: who turned enraged or happy since the last frame (the first frame only takes note)
    let angry = 0, ak = 0, mad: Creature | null = null;
    let glad: Creature | null = null, gk = 0;
    const nowEnraged = new Set<number>(), nowHappy = new Set<number>();
    for (const c of g.creatures) {
      if (c.enraged && !c.gone && !c.leashed) {
        nowEnraged.add(c.id);
        if (this.primed && !this.enraged.has(c.id)) { const k = near(c.x, c.z); if (k > 0) { angry++; if (k > ak) { ak = k; mad = c; } } }
      }
      if (happyNow(c)) {
        nowHappy.add(c.id);
        if (this.primed && !this.happy.has(c.id)) { const k = near(c.x, c.z); if (k > gk) { gk = k; glad = c; } }
      }
    }
    this.enraged = nowEnraged; this.happy = nowHappy;
    // turning, they say so (Ed: "angry speech from enraged animals", happy from happy): the nearest
    // one's voice over the growl or the pop
    if (mad) {
      S.enraged(pan(mad.x), ak, angry);
      if (this.ready(mad.id, time, t.voice.animals.gap)) { const v = voiceOf(mad, g.tuning); if (v.call?.turn === "howl" && !v.legend) S.howl(v, pan(mad.x), ak); else S.speak(v, "enraged", pan(mad.x), ak, ak + 0.3); }
    }
    if (glad) { S.happy(pan(glad.x), gk); if (this.ready(glad.id, time, t.voice.animals.gap)) S.speak(voiceOf(glad, g.tuning), "happy", pan(glad.x), gk, gk + 0.3); }

    // legends: the nearest sleeping one's snore and dream, and a nightmare's unease
    let best: Creature | null = null, bd = Infinity;
    for (const c of g.creatures) if (c.boss && !c.leashed && c.legendState === "asleep") { const d = Math.hypot(c.x - w.x, c.z - w.z); if (d < bd) { bd = d; best = c; } }
    const sleep = best ? Math.max(0, 1 - bd / Math.max(1, t.snore.range)) : 0;
    const W = g.tuning.wildLegends;
    S.legends(sleep, best ? bossBreath(time, best.id, W.breathEvery * 1.5) : 0, best ? restlessness(best) * Math.min(1, sleep * 1.5) : 0, best ? pan(best.x) : 0);
    // attacks are speech (Ed, 2026-10-05): each attacker a burst of babble in its own voice, by its
    // mood; a legend winding up (its slow long-range lob or beam: #99's windup from a legend) one long
    // building swell of its whale song,
    // heard twice as far: a warning
    for (const e of g.combat.events) {
      const c = e.id !== undefined ? g.creatures[e.id] : undefined;
      if (!c || !ATTACKS.has(e.kind)) continue;
      if ((e.kind as string) === "legendWindup" || (e.kind === "windup" && c.boss)) { const k = Math.max(0, 1 - Math.hypot(e.x - w.x, e.z - w.z) / (2 * hear)); if (k > 0) S.windup(pan(e.x), Math.max(0.5, k), voiceOf(c, g.tuning)); continue; }
      const k = near(e.x, e.z);
      if (k <= 0 || !this.ready(c.id, time, t.voice.animals.gap)) continue;
      S.speak(voiceOf(c, g.tuning), speechMood(c), pan(e.x), k, k + (c.boss ? 0.5 : 0));
    }
    // a soundsystem lost (Ed, 2026-10-05: the next wave comes sooner): the party grinding to a halt,
    // then the clock jumping on; heard anywhere (rules/game.ts's soundsystemLost; home's aside:
    // that's the run over), more urgent when the wave comes at once (left 0)
    for (const e of g.waveEvents) if (e.kind === "soundsystemLost" && e.key !== "home" && this.lost !== e.at) { this.lost = e.at; S.lost(e.left <= 0); }
    // hurt (Ed, 2026-10-05: "ouch!"): combat's witchHit, as it lands (a hit on her mid-blink costs
    // nothing, so it's her hits dropping that says so); knocked down (knockout's "down"): "whoa-oh"
    const me = g.witches[0], O = t.ouch;
    if (me) {
      const hp = me.health.hp, down = !!me.ko;
      if (down && !this.down && this.primed) { S.knockdown(); this.duck(O.duck, O.duckTime * 2); }
      else if (this.primed && hp < this.hp && !down) { S.ouch(1 - Math.max(0, hp - 1) / Math.max(1, g.tuning.witchHealth.hits - 1)); this.duck(O.duck, O.duckTime); }
      this.hp = hp; this.down = down;
    }
    this.primed = true;
  }

  private spoke = new Map<number, number>();
  private lost = -1;
  /** Whether creature `id` may speak again (at most once every `gap` seconds). */
  private ready(id: number, time: number, gap: number): boolean {
    if ((this.spoke.get(id) ?? -Infinity) > time - gap) return false;
    this.spoke.set(id, time);
    return true;
  }

  /** The invite flourish, once per creature however it's reported. */
  private flourish(g: Game, id: number, time: number, k: number, pan: number): void {
    if ((this.flourished.get(id) ?? -Infinity) > time - 2) return;
    this.flourished.set(id, time);
    this.sfx.invited(g.creatures[id]?.level ?? 0, pan, k);
  }
}
