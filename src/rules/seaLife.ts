// The sea's life off the beach at night (Ed, 2026-10-07): dolphins leaping off the east coast and, rarely, a kraken rising off
// the west. Nothing in the game touches them: this is only their timetable, worked out from the world's clock and her place
// (no state), so the picture (render/dolphins.ts, render/kraken.ts) and the sound (the music builder's splashes and groan)
// read the same leaps and risings. Framed for the stargazing camera (the music builder's #468, beach.camera.bearings: the
// camera looks north, standing out over the water, so the east coast's sea is the picture's right-hand quarter, the west's its
// left, and bent so hard that only about 20 m ahead of her stays on screen): a dolphin leaps, and the kraken rises, `out` metres
// past the water's edge from her and `ahead` metres north of that (away from the camera, inside that). Knobs: the tuning's beach.dolphins and beach.kraken (defaults below).
import type { Game } from "./game";
import type { Beach } from "./mapShape";

export interface DolphinKnobs { on: boolean; arc: number; every: [number, number]; pair: number; ahead: [number, number]; out: [number, number]; length: number; height: number; time: number }
export const DOLPHINS_DEFAULT: DolphinKnobs = { on: true, arc: 0.7, every: [5, 12], pair: 0.4, ahead: [0, 15], out: [8, 25], length: 6, height: 2.2, time: 1.4 };
export interface KrakenKnobs { on: boolean; arc: number; every: number; chance: number; tentacles: [number, number]; ahead: [number, number]; out: [number, number]; time: number; head: number }
export const KRAKEN_DEFAULT: KrakenKnobs = { on: true, arc: 0.7, every: 75, chance: 0.6, tentacles: [2, 4], ahead: [5, 18], out: [6, 20], time: 14, head: 0.5 };

/** One dolphin's leap: it leaves the water at `start` (world time) at (x, z) - (tx, tz) × length / 2, travelling (tx, tz), and goes
 *  back in `dur` seconds later `length` metres on; (x, z) the middle, where it's highest. */
export interface Leap { start: number; dur: number; x: number; z: number; tx: number; tz: number; length: number; height: number }
/** A rising: its tentacles (each up from `start` for `dur` seconds, rising, curling over, sinking, at (x, z), curling away from
 *  the middle: `side` -1 or 1 along the coast) and, in some, its head (up at `start`, its eye open in the middle of `dur`). */
export interface Rising { tentacles: { start: number; dur: number; x: number; z: number; side: number }[]; head: { start: number; dur: number; x: number; z: number } | null }

const hash = (n: number, k = 0) => { const x = Math.sin(n * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const knobs = <T>(g: Game, key: string, d: T): T => ({ ...d, ...((g.tuning.beach as Record<string, unknown> | undefined)?.[key] as Partial<T> ?? {}) });
/** Her bearing round the island (radians, atan2 of z and x from its middle: 0 due east, ±π due west). */
const bearing = (g: Game, b: Beach) => Math.atan2(g.witch.z - b.z, g.witch.x - b.x);

/** The dolphins' leaps going on at `time` (and just about to, or just landed: within their splashes), none away from the east coast. */
export function dolphinLeaps(g: Game, b: Beach, time: number): Leap[] {
  const K = knobs(g, "dolphins", DOLPHINS_DEFAULT), her = bearing(g, b), out: Leap[] = [];
  if (!K.on || Math.abs(her) > K.arc) return out;
  const shore = (g.tuning.beach as { shore?: number } | undefined)?.shore ?? 0, slotLen = Math.max((K.every[0] + K.every[1]) / 2, K.time + 0.5), now = Math.floor(time / slotLen);
  for (let slot = now - 1; slot <= now; slot++) { // each slot holds at most one leap (or a pair), at a seeded moment in it
    if (hash(slot, 1) < 0.15) continue; // (now and then a slot empty: the gaps vary)
    const t0 = slot * slotLen + hash(slot, 2) * (slotLen - K.time), a = her, nx = Math.cos(a), nz = Math.sin(a);
    const off = K.out[0] + hash(slot, 4) * (K.out[1] - K.out[0]), north = K.ahead[0] + hash(slot, 3) * (K.ahead[1] - K.ahead[0]), r = b.edge(a) + shore + off;
    const x = b.x + nx * r, z = b.z + nz * r - north, dir = hash(slot, 5) < 0.5 ? 1 : -1, tx = -nz * dir, tz = nx * dir;
    const n = hash(slot, 6) < K.pair ? 2 : 1;
    for (let k = 0; k < n; k++) { // (the second a beat behind, a little further out)
      const L: Leap = { start: t0 + k * 0.25, dur: K.time, x: x + k * 1.6 * nx, z: z + k * 1.6 * nz, tx, tz, length: K.length, height: K.height };
      const s = (time - L.start) / L.dur; if (s >= -0.1 && s <= 1.35) out.push(L);
    }
  }
  return out;
}

/** The kraken's rising going on at `time`, or null (most of the time, and anywhere but the west coast). */
export function krakenRising(g: Game, b: Beach, time: number): Rising | null {
  const K = knobs(g, "kraken", KRAKEN_DEFAULT), her = bearing(g, b);
  if (!K.on || Math.PI - Math.abs(her) > K.arc) return null;
  const slot = Math.floor(time / K.every), t0 = slot * K.every;
  if (hash(slot, 11) >= K.chance) return null;
  // `out` metres past the water's edge from her and `ahead` metres north of that (as the dolphins: inside the stargazing bend's horizon)
  const shore = (g.tuning.beach as { shore?: number } | undefined)?.shore ?? 0, nx = Math.cos(her), nz = Math.sin(her);
  const r = b.edge(her) + shore + K.out[0] + hash(slot, 12) * (K.out[1] - K.out[0]), north = K.ahead[0] + hash(slot, 13) * (K.ahead[1] - K.ahead[0]);
  const x = b.x + nx * r, z = b.z + nz * r - north;
  const n = K.tentacles[0] + Math.floor(hash(slot, 14) * (K.tentacles[1] - K.tentacles[0] + 1)), gap = K.time * 0.3, a = Math.atan2(z - b.z, x - b.x), tx = -Math.sin(a), tz = Math.cos(a);
  if (time > t0 + (n - 1) * gap + K.time + 1) return null;
  const tentacles = [...Array(n).keys()].map(k => { const along = (k - (n - 1) / 2) * 5 + (hash(slot, 20 + k) - 0.5) * 2; return { start: t0 + k * gap, dur: K.time, x: x + tx * along, z: z + tz * along, side: along < 0 ? -1 : 1 }; });
  const head = hash(slot, 15) < K.head ? { start: t0 + gap, dur: K.time, x: x + Math.cos(a) * 8, z: z + Math.sin(a) * 8 } : null;
  return { tentacles, head };
}
