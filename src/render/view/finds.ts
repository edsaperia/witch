// Tonight's travel trunk (rules/finds.ts; Ed, 2026-10-21: an old trunk, half-sunk and mossy, its lid ajar with cloth showing),
// a wearable in it to find: drawn each frame from the scene atlas (art/country.js travel-trunk, render/artBuild.ts sceneSprites),
// standing where the rules put it, under the canopy. Once she's taken what was in it, it stands there empty.
import type { View } from "../view";
import { SpriteBatch, type SpriteInstance } from "../sprites";

/** How near (m) she is before the trunk's drawn at all. */
const TRUNK_SEEN = 120;

export function drawFinds(v: View): void {
  const T = v.game.trunk, batch = v.decorBatches.get("finds");
  if (!T) { batch?.set([]); return; }
  // Only near it (a find on foot, under the canopy): asked for, ahead of the night's other art, only once she's within
  // TRUNK_SEEN, so the art workers' queue is as it was everywhere else.
  const w = v.game.witch;
  if (Math.hypot(w.x - T.x, w.z - T.z) > TRUNK_SEEN) { batch?.set([]); return; }
  const sa = v.assets.sceneArt(true), a = sa?.pieces["travel-trunk"];
  if (!sa || !a) return;
  const frame = sa.atlas.frames[a.frame], m = a.ppm ? 1 / a.ppm : v.mpp, items: SpriteInstance[] = [{ x: T.x - (a.originX - frame.w / 2) * m, y: 0, z: T.z, frame, flip: false, scale: m / v.mpp }];
  v.batchFor(v.decorBatches, "finds", () => new SpriteBatch(sa.atlas, v.mpp, { solid: true }))?.set(items);
}
