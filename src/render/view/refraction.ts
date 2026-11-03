import type { View } from "../view";
import { placed } from "../height";
import { FX_QUALITY } from "../fx/system";
import { comfort } from "../comfort";
import type { RefractionCast } from "../refraction";
import { partyStartOf } from "../../rules/partyStart";

const casts = new WeakMap<View, { world: object; cast: RefractionCast; replay: boolean }>();

/** Narrow drawWitch hook at the existing party-cast event: use its actual rendered world pose, including house depth offsets.
 *  `replay`: the party start played again at her decks (render/partyStart.ts; its own `at`, not the spell's). */
export function captureRefractionCast(v: View, at: number, x: number, feetY: number, z: number, replay = false): void {
  casts.set(v, { world: v.game, cast: { at, x, y: feetY + 1.2, baseY: feetY, z }, replay });
}

/** A separate drawing-only hook: no ForestLight/worker metadata or potion state is changed. */
export function updateRefraction(v: View, time: number): void {
  const refraction = v.post?.refraction;
  if (!refraction) return; // Headless island-reset views need not construct a WebGL Post.
  const g = v.game, source = casts.get(v);
  const cast = source?.world === g && (source.replay || source.cast.at === g.party.spellAt) ? source.cast : null;
  // (the party start's own ripple on its knob without ?refraction=1: its rings alone, no fire's)
  const all = v.post.refractionEnabled, party = v.post.refractionParty = !!partyStartOf(g.tuning).refraction.on;
  refraction.update(g, time, (all || party) && FX_QUALITY.distortion && !comfort.reduceFlashing && !g.tuning.bare,
    all ? v.worldFires : [], cast, v.camera, placed, g.witch);
}

/** No event or projected form may survive an island swap into its first warm-drawn frame. */
export function resetRefraction(v: View): void { casts.delete(v); v.post?.refraction?.reset(); }
