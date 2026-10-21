// Tonight's travel trunk (rules/finds.ts; Ed, 2026-10-21: an old trunk, half-sunk and mossy, its lid ajar with cloth showing),
// a wearable in it to find: drawn each frame from the scene atlas (art/country.js travel-trunk, render/artBuild.ts sceneSprites),
// standing where the rules put it, under the canopy. Once she's taken what was in it, it stands there empty.
import type { View } from "../view";
import { SpriteBatch, type SpriteInstance } from "../sprites";

export function drawFinds(v: View): void {
  const T = v.game.trunk, batch = v.decorBatches.get("finds");
  if (!T) { batch?.set([]); return; }
  const w = v.game.witch, sa = v.assets.sceneArt(Math.hypot(w.x - T.x, w.z - T.z) < 120), a = sa?.pieces["travel-trunk"]; // (asked for ahead of the night's other art once she's near it)
  if (!sa || !a) return;
  const frame = sa.atlas.frames[a.frame], m = a.ppm ? 1 / a.ppm : v.mpp, items: SpriteInstance[] = [{ x: T.x - (a.originX - frame.w / 2) * m, y: 0, z: T.z, frame, flip: false, scale: m / v.mpp }];
  v.batchFor(v.decorBatches, "finds", () => new SpriteBatch(sa.atlas, v.mpp, { solid: true }))?.set(items);
}
