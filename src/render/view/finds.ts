// Tonight's travel trunk (rules/finds.ts; Ed, 2026-10-21: an old trunk, half-sunk and mossy, its lid ajar with cloth showing),
// a wearable in it to find: drawn each frame from its own small atlas (art/country.js travel-trunk, a "find" art job:
// render/artBuild.ts), standing where the rules put it, under the canopy. Once she's taken what was in it, it stands there empty.
import type { View } from "../view";
import { SpriteBatch, type SpriteInstance } from "../sprites";

/** How near (m) she is before the trunk's drawn at all (a find on foot, under the canopy). */
const TRUNK_SEEN = 120;
/** How near (m) before its art is asked for, ahead of need: one small job, in long before she could see it even at the
 *  treetops' speed; within TRUNK_SEEN it's urgent. Asked for no sooner, so the art workers' queue is as it was everywhere
 *  else on the island. */
const TRUNK_ASK = 400;

export function drawFinds(v: View): void {
  const T = v.game.trunk, batch = v.decorBatches.get("finds");
  if (!T) { batch?.set([]); return; }
  const w = v.game.witch, d = Math.hypot(w.x - T.x, w.z - T.z);
  if (d > TRUNK_ASK) { batch?.set([]); return; }
  const fa = v.assets.findArt("travel-trunk", d <= TRUNK_SEEN), a = fa?.pieces["travel-trunk"];
  if (d > TRUNK_SEEN || !fa || !a) { batch?.set([]); return; }
  const frame = fa.atlas.frames[a.frame], m = v.mpp, items: SpriteInstance[] = [{ x: T.x - (a.originX - frame.w / 2) * m, y: 0, z: T.z, frame, flip: false, scale: 1 }];
  v.batchFor(v.decorBatches, "finds", () => new SpriteBatch(fa.atlas, v.mpp, { solid: true }))?.set(items);
}
