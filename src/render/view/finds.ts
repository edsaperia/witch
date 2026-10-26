// Tonight's find (rules/finds.ts FIND_KINDS), as the finds style guide has it (Ed, 2026-10-23; docs/art-guide/FINDS.md): one
// flask-sized object (art/country.js's find pieces: clothes a folded bundle, bags a little bag, a broom part the part), drawn each
// frame from its own small atlas (a "find" art job: render/artBuild.ts) where the rules put it, under the canopy, on a patch of
// clear ground (findClear: no tufts on it, view.ts) in its own pale gold-white light (findLight, render/view/lights.ts), the
// brightest and whitest thing there. Hidden from the treetops: the light lights only the ground under the crowns. Once she's taken
// it, it's gone, and its patch and light with it. Not taken by the time the party's lost, it's gone from the map too (Ed,
// 2026-10-18: "All permanent unlock items disappear from the map after a party is lost").
import * as THREE from "three";
import type { View } from "../view";
import { findPiece } from "../../rules/finds";
import { worldAsleep } from "../../rules/partyOver";
import { SpriteBatch, type SpriteInstance } from "../sprites";

/** How near (m) she is before the trunk's drawn at all (a find on foot, under the canopy). */
const TRUNK_SEEN = 120;
/** How near (m) before its art is asked for, ahead of need: one small job, in long before she could see it even at the
 *  treetops' speed; within TRUNK_SEEN it's urgent. Asked for no sooner, so the art workers' queue is as it was everywhere
 *  else on the island. */
const TRUNK_ASK = 400;

/** The find's patch: no tufts within about 1.3 m of it, trodden short a little past (grass.ts's uClear clears from 0.6 of this). */
const FIND_PATCH = 2.2;
/** Its light's colour: pale gold-white, the finds' own (no other light uses it). */
const FIND_GOLD = new THREE.Vector3(1, 0.96, 0.84);

/** Tonight's find while it's there to take: on the map, not yet taken, the party not lost. */
const findThere = (v: View) => { const T = v.game.trunk; return T && T.item && !T.found && !worldAsleep(v.game) ? T : null; }; // (not there in the world asleep: the afterparty, or before the party, Ed 2026-10-26)

/** Where the cover is cleared for tonight's find (view.ts, with the placed sigils'), or null. */
export function findClear(v: View): { x: number; z: number; r: number } | null {
  const T = findThere(v);
  return T ? { x: T.x, z: T.z, r: FIND_PATCH } : null;
}

/** Tonight's find's own light, low over its patch, breathing slightly (never a flicker), or null once it's taken. */
export function findLight(v: View, time: number): { x: number; y: number; z: number; reach: number; rgb: THREE.Vector3; strength: number } | null {
  const T = findThere(v), L = v.game.tuning.lights.find;
  return T ? { x: T.x, y: 0.6, z: T.z, reach: L.reach, rgb: FIND_GOLD, strength: L.strength * (0.9 + 0.1 * Math.sin((time * Math.PI * 2) / 2.4)) } : null;
}

export function drawFinds(v: View): void {
  // (a batch a piece, each with its own atlas: tonight's find can change mid-night, the dev spawn's: rules/finds.ts spawnFind)
  const T = v.game.trunk, id = T?.item ? findPiece(T) : "", key = `finds:${id}`;
  for (const [k, b] of v.decorBatches) if (k.startsWith("finds:") && k !== key) b.set([]);
  const batch = v.decorBatches.get(key);
  if (!T || !T.item || T.found || worldAsleep(v.game)) { batch?.set([]); return; }
  const w = v.game.witch, d = Math.hypot(w.x - T.x, w.z - T.z);
  if (d > TRUNK_ASK) { batch?.set([]); return; }
  const fa = v.assets.findArt(id, d <= TRUNK_SEEN), a = fa?.pieces[id];
  if (d > TRUNK_SEEN || !fa || !a) { batch?.set([]); return; }
  const frame = fa.atlas.frames[a.frame], m = v.mpp, items: SpriteInstance[] = [{ x: T.x - (a.originX - frame.w / 2) * m, y: 0, z: T.z, frame, flip: false, scale: 1 }];
  v.batchFor(v.decorBatches, key, () => new SpriteBatch(fa.atlas, v.mpp, { solid: true }))?.set(items);
}
