// Tonight's travel trunk (rules/finds.ts; Ed, 2026-10-21: an old trunk, half-sunk and mossy, its lid ajar with cloth showing),
// a wearable in it to find: drawn each frame from its own small atlas (art/country.js travel-trunk, a "find" art job:
// render/artBuild.ts), standing where the rules put it, under the canopy. Once she's taken what was in it, it stands there empty.
// Or tonight's wreck (the Workshop, Ed 2026-10-23: rules/finds.ts FIND_KINDS), a broom part's own crashed broom (art/country.js
// wreck-<part>), drawn the same way. Not taken by the time the party's lost, it's gone from the map (Ed, 2026-10-18: "All
// permanent unlock items disappear from the map after a party is lost").
import type { View } from "../view";
import { findPiece } from "../../rules/finds";
import { SpriteBatch, type SpriteInstance } from "../sprites";

/** How near (m) she is before the trunk's drawn at all (a find on foot, under the canopy). */
const TRUNK_SEEN = 120;
/** How near (m) before its art is asked for, ahead of need: one small job, in long before she could see it even at the
 *  treetops' speed; within TRUNK_SEEN it's urgent. Asked for no sooner, so the art workers' queue is as it was everywhere
 *  else on the island. */
const TRUNK_ASK = 400;

export function drawFinds(v: View): void {
  // (a batch a piece, each with its own atlas: tonight's find can change mid-night, the dev spawn's: rules/finds.ts spawnFind)
  const T = v.game.trunk, id = T?.item ? findPiece(T) : "", key = `finds:${id}`;
  for (const [k, b] of v.decorBatches) if (k.startsWith("finds:") && k !== key) b.set([]);
  const batch = v.decorBatches.get(key);
  if (!T || !T.item || (v.game.partyOver && !T.found)) { batch?.set([]); return; }
  const w = v.game.witch, d = Math.hypot(w.x - T.x, w.z - T.z);
  if (d > TRUNK_ASK) { batch?.set([]); return; }
  const fa = v.assets.findArt(id, d <= TRUNK_SEEN), a = fa?.pieces[id];
  if (d > TRUNK_SEEN || !fa || !a) { batch?.set([]); return; }
  const frame = fa.atlas.frames[a.frame], m = v.mpp, items: SpriteInstance[] = [{ x: T.x - (a.originX - frame.w / 2) * m, y: 0, z: T.z, frame, flip: false, scale: 1 }];
  v.batchFor(v.decorBatches, key, () => new SpriteBatch(fa.atlas, v.mpp, { solid: true }))?.set(items);
}
