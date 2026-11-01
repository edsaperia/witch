import type { View } from "../view";
import { placed } from "../height";
import { FX_QUALITY } from "../fx/system";
import { comfort } from "../comfort";
import type { RefractionCast } from "../refraction";

const casts = new WeakMap<View, { world: object; cast: RefractionCast }>();

/** Narrow drawWitch hook at the existing party-cast event: use its actual rendered world pose, including house depth offsets. */
export function captureRefractionCast(v: View, at: number, x: number, feetY: number, z: number): void {
  casts.set(v, { world: v.game, cast: { at, x, y: feetY + 1.2, baseY: feetY, z } });
}

/** A separate drawing-only hook: no ForestLight/worker metadata or potion state is changed. */
export function updateRefraction(v: View, time: number): void {
  const refraction = v.post?.refraction;
  if (!refraction) return; // Headless island-reset views need not construct a WebGL Post.
  const g = v.game, source = casts.get(v);
  const cast = source?.world === g && source.cast.at === g.party.spellAt ? source.cast : null;
  refraction.update(g, time, v.post.refractionEnabled && FX_QUALITY.distortion && !comfort.reduceFlashing && !g.tuning.bare,
    v.worldFires, cast, v.camera, placed, g.witch);
}

/** No event or projected form may survive an island swap into its first warm-drawn frame. */
export function resetRefraction(v: View): void { casts.delete(v); v.post?.refraction?.reset(); }
