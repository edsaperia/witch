// The loading mist's front (Ed, 2026-10-24: "Mist sounds ideal, which rolls away when loading finishes"; "When an area loads, can
// you make the mist roll away progressively away from the treehouse instead of all at once"): no three.js here, so it's tested
// on its own (loadingFront.test.ts); render/loadingMist.ts draws it. Every area whose type's trees aren't drawn yet lies under the
// mist. When a type's art lands, the mist rolls back off that type's areas as a front moving out from the treehouse: a radius
// from the house growing over time, so the near edge of each area clears first and the nearer of a type's areas finish sooner. Its
// speed is the tuning's `speed`; what it hasn't reached `cap` seconds after it set off goes all the same (never the mist hanging on
// long after the trees are there). Since Ed, 2026-11-06 ("Make sure things load and render before the mist disappears, and mist
// should fade away smoothly over a few seconds not vanish"), it sets off only once its areas' trees, stumps, campfires and
// creatures are drawn (render/view/mistReady.ts areaReady), and where it passes the mist thins away over `fade` seconds (mistLeft).

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

/** A type's front now (m from the treehouse), `since` seconds after its mist began to go (undefined: not yet, so all of it under
 *  the mist): where the roll back from the treehouse has got to (mistLeft: the mist starts thinning there). It starts a soft edge
 *  short of the type's nearest ground and moves out at `speed`; by `cap` seconds it has reached everywhere it's going to (the far
 *  rim's mist starts thinning then, wherever the front is), and the last of it is gone `fade` seconds after (goneAt). For the
 *  tools and the log; the shader works mistLeft out a pixel at a time. */
export function frontAt(reach: TypeReach | undefined, since: number | undefined, T: Pick<LoadingMistTuning, "speed" | "cap" | "soft" | "fade">): number {
  if (since === undefined) return FRONT_FULL;
  if (!reach || since >= goneAt(reach, T)) return FRONT_CLEAR;
  return reach.near - 2 * T.soft + T.speed * Math.max(0, Math.min(since, T.cap));
}

/** Seconds after a type's mist began to go that the last of it is gone: once the front has reached its furthest ground (or `cap`
 *  seconds, sooner), that ground's own `fade`. */
export function goneAt(reach: TypeReach | undefined, T: Pick<LoadingMistTuning, "speed" | "cap" | "soft" | "fade">): number {
  if (!reach) return 0;
  return Math.min(Math.max(0, T.cap), Math.max(0, (reach.far - reach.near + 4 * T.soft) / Math.max(1e-3, T.speed))) + Math.max(0, T.fade);
}

/** How much of a type's mist is left (1 all of it, 0 none) `d` metres from the treehouse, `since` seconds after it began to go (Ed,
 *  2026-11-06: "mist should fade away smoothly over a few seconds not vanish"): it rolls back from the treehouse as before, the front
 *  reaching `d` (frontAt) when that spot starts to thin, and from then it thins away over `fade` seconds (the `loadingMist.fade`
 *  knob), never in one frame. The shader's own sum (render/loadingMist.ts), a pixel at a time, with noise on `d`. */
export function mistLeft(reach: TypeReach | undefined, since: number | undefined, d: number, T: Pick<LoadingMistTuning, "speed" | "cap" | "soft" | "fade">): number {
  if (since === undefined) return 1;
  if (!reach) return 0;
  const start = reach.near - 2 * T.soft, wait = Math.min(Math.max(0, T.cap), Math.max(0, (d - start) / Math.max(1e-3, T.speed)));
  return T.fade > 0 ? Math.min(1, Math.max(0, 1 - (since - wait) / T.fade)) : since >= wait ? 0 : 1;
}

/** Whether the front has passed all of a type (its mist gone for the night). */
export const cleared = (front: number): boolean => front >= FRONT_CLEAR;

/** The telescope's mist's edge (render/loadingMist.ts scope; Ed, 2026-11-12: what it shows that isn't built yet "covered in mist"):
 *  `at` metres round her a frame ago (NaN: the telescope just up), now `dt` seconds on with its scenery drawn out to `cover` metres.
 *  It rolls back out toward `cover` at the loading front's `speed` (as the loading mist rolls off the island: never gone in one
 *  frame), a frame counting at most a tenth of a second, and comes in at once to where the trees end (never a hole); never nearer
 *  than `from` metres (round the crow's nest, below its view). */
export function scopeEdge(at: number, cover: number, dt: number, speed: number, from = 30): number {
  const c = Math.max(from, cover);
  if (!Number.isFinite(at)) return from;
  if (at >= c) return c;
  return Math.min(c, Math.max(from, at) + Math.max(0, speed) * Math.min(0.1, Math.max(0, dt)));
}
