// The loading mist's front (Ed, 2026-10-24: "Mist sounds ideal, which rolls away when loading finishes"; "When an area loads, can
// you make the mist roll away progressively away from the treehouse instead of all at once"): no three.js here, so it's tested
// on its own (loadingFront.test.ts); render/loadingMist.ts draws it. Every area whose type's trees aren't drawn yet lies under the
// mist. When a type's art lands, the mist rolls back off that type's areas as a front moving out from the treehouse: a radius
// from the house growing over time, the mist kept only beyond it (with a soft, noisy edge in the shader), so the near edge of each
// area clears first and the nearer of a type's areas finish sooner. Its speed is the tuning's `speed`; what it hasn't reached `cap`
// seconds after the art landed fades out (never the mist hanging on long after the trees are there).

import type { Tuning } from "../rules/tuning";
export type LoadingMistTuning = NonNullable<Tuning["loadingMist"]>;

/** One area type's areas as the front sees them: the nearest and furthest of their ground from the treehouse (m). */
export interface TypeReach { near: number; far: number }

/** Each area type's reach from the treehouse: for every cell of the grid (not home's), its area's middle's distance less or plus
 *  most of an area's half-width (an area's ground runs about that far round its middle). */
export function typeReaches(cells: Iterable<{ type: number; x: number; z: number }>, house: { x: number; z: number }, areaSize: number): Map<number, TypeReach> {
  const out = new Map<number, TypeReach>(), half = areaSize * 0.75;
  for (const c of cells) {
    const d = Math.hypot(c.x - house.x, c.z - house.z), r = out.get(c.type);
    const near = Math.max(0, d - half), far = d + half;
    if (!r) out.set(c.type, { near, far }); else { r.near = Math.min(r.near, near); r.far = Math.max(r.far, far); }
  }
  return out;
}

/** Far enough that the mist is gone everywhere (a cleared type), or everywhere still (an undrawn one). */
export const FRONT_CLEAR = 1e5, FRONT_FULL = -1e5;

/** A type's front now (m from the treehouse, the mist kept beyond it), `since` seconds after its art landed (undefined: not yet,
 *  so all of it under the mist). The front starts a soft edge short of the type's nearest ground, so nothing of it clears before
 *  its art is in, and moves out at `speed` (a nearby area clear in a couple of seconds); whatever of the type's mist the front
 *  hasn't reached by `cap` seconds (its far areas, out in the island's rim) fades out over the next FADE seconds (fadeAt), so it
 *  never hangs on long after the trees are there. */
export function frontAt(reach: TypeReach | undefined, since: number | undefined, T: Pick<LoadingMistTuning, "speed" | "cap" | "soft">): number {
  if (since === undefined) return FRONT_FULL;
  if (!reach || since >= T.cap + FADE) return FRONT_CLEAR;
  const start = reach.near - 2 * T.soft, end = reach.far + 2 * T.soft, r = start + T.speed * Math.max(0, since);
  return r >= end ? FRONT_CLEAR : r;
}

/** Seconds the mist left at the cap takes to fade out. */
export const FADE = 1;

/** How much of a type's mist is left beyond its front (1 all, fading to 0 over FADE seconds after `cap`). */
export function fadeAt(since: number | undefined, T: Pick<LoadingMistTuning, "cap">): number {
  if (since === undefined) return 1;
  return Math.min(1, Math.max(0, 1 - (since - T.cap) / FADE));
}

/** Whether the front has passed all of a type (its mist gone for the night). */
export const cleared = (front: number): boolean => front >= FRONT_CLEAR;
