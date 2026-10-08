// Each creature's character (overnight phase 3, config/character.json): its temperament posture and its idle quirk
// (a sniff, a stomp, a tail flick, a shake...), and a happy creature's bounce. Drawing only: worked out from the
// creature's id and the time, never stored in the rules, so it costs nothing to the sim and is the same every run.
import raw from "../../config/character.json";
import { hash2 } from "../rules/random";

export type Quirk = "sniff" | "perk" | "stomp" | "thump" | "scratch" | "shake" | "tailflick" | "tailslap" | "stretch" | "howl" | "rise";
/** A quirk a baked frame can show (it can't move a part, only the whole sprite): a hop, a puff (swelling as it breathes in),
 *  a look (turning to glance behind) or a shiver. */
export type SpriteQuirk = "hop" | "puff" | "look" | "shiver";
export interface Character { posture: { head: [number, number]; body: number }; quirk: Quirk; every: [number, number]; for: number; /** its quirk on a baked frame (the species' own, or its rig quirk's nearest) */ sprite: SpriteQuirk; /** the posture as the rig takes it (made once) */ rig: { hx: number; hy: number; by: number } }
interface Raw { default: Character; bounce: { height: number; every: [number, number]; for: number }; species: Record<string, Partial<Character>> }
const R = raw as unknown as Raw;
// a rig quirk's nearest on a baked frame (a species without a rig sets its own `sprite`)
const SPRITE_OF: Record<Quirk, SpriteQuirk> = { sniff: "puff", perk: "puff", howl: "puff", rise: "puff", stretch: "puff", stomp: "hop", thump: "hop", scratch: "shiver", shake: "shiver", tailflick: "look", tailslap: "hop" };
const cache = new Map<string, Character>();

/** A species' character: its own entry over the default. */
export function characterOf(species: string): Character {
  let c = cache.get(species);
  if (!c) { const s = R.species[species] ?? {}; const posture = { ...R.default.posture, ...s.posture }; cache.set(species, (c = { ...R.default, ...s, posture, sprite: s.sprite ?? SPRITE_OF[s.quirk ?? R.default.quirk], rig: { hx: posture.head[0], hy: posture.head[1], by: posture.body } } as Character)); }
  return c;
}

/** One creature's own beat: a period between `every` [min, max] (seeded by its id) and an offset into it. */
function beatOf(id: number, every: [number, number], salt: number): { period: number; offset: number } {
  const period = every[0] + (every[1] - every[0]) * hash2(id, salt, 71);
  return { period, offset: period * hash2(id, salt, 72) };
}

/** Its idle quirk now: 0..1 through it, or -1 between quirks. (The view shows it only while the creature stands idle.) */
export function quirkAt(id: number, ch: Character, time: number): number {
  const { period, offset } = beatOf(id, ch.every, 1), k = ((time + offset) % period) / Math.max(0.1, ch.for);
  return k >= 0 && k < 1 ? k : -1;
}

/** A happy creature's bounce now: its height in metres (0 between bounces): a quick hop and a smaller one after it. */
export function bounceAt(id: number, time: number): number {
  const B = R.bounce, { period, offset } = beatOf(id, B.every, 2), k = ((time + offset) % period) / B.for;
  if (k < 0 || k >= 1) return 0;
  return k < 0.6 ? Math.sin((k / 0.6) * Math.PI) * B.height : Math.sin(((k - 0.6) / 0.4) * Math.PI) * B.height * 0.4;
}

/** A baked frame's idle quirk at k (0..1 through it, quirkAt), into out: hop (metres, as a share of its height), x (a shiver's
 *  offset, likewise), sx/sy (a puff) and turned (a look back). Nothing between quirks. */
export function spriteQuirk(q: SpriteQuirk, k: number, time: number, out: { hop: number; x: number; sx: number; sy: number; turned: boolean }): void {
  out.hop = 0; out.x = 0; out.sx = 1; out.sy = 1; out.turned = false;
  if (k < 0) return;
  const e = Math.sin(k * Math.PI);
  if (q === "hop") out.hop = (k < 0.5 ? Math.sin(k * 2 * Math.PI) : Math.sin((k - 0.5) * 2 * Math.PI) * 0.5) * 0.14; // two hops, the second smaller
  else if (q === "puff") { out.sx = 1 - 0.05 * e; out.sy = 1 + 0.11 * e; }
  else if (q === "look") out.turned = k > 0.2 && k < 0.8;
  else out.x = Math.sin(time * 47) * 0.035 * e;
}
