// Each creature's character (overnight phase 3, config/character.json): its temperament posture and its idle quirk
// (a sniff, a stomp, a tail flick, a shake...), and a happy creature's bounce. Drawing only: worked out from the
// creature's id and the time, never stored in the rules, so it costs nothing to the sim and is the same every run.
import raw from "../../config/character.json";
import { hash2 } from "../rules/random";

export type Quirk = "sniff" | "perk" | "stomp" | "thump" | "scratch" | "shake" | "tailflick" | "tailslap" | "stretch" | "howl" | "rise";
export interface Character { posture: { head: [number, number]; body: number }; quirk: Quirk; every: [number, number]; for: number; /** the posture as the rig takes it (made once) */ rig: { hx: number; hy: number; by: number } }
interface Raw { default: Character; bounce: { height: number; every: [number, number]; for: number }; species: Record<string, Partial<Character>> }
const R = raw as unknown as Raw;
const cache = new Map<string, Character>();

/** A species' character: its own entry over the default. */
export function characterOf(species: string): Character {
  let c = cache.get(species);
  if (!c) { const s = R.species[species] ?? {}; const posture = { ...R.default.posture, ...s.posture }; cache.set(species, (c = { ...R.default, ...s, posture, rig: { hx: posture.head[0], hy: posture.head[1], by: posture.body } } as Character)); }
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
