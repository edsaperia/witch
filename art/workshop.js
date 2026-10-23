// The Workshop's broom parts drawn on their own (Ed, 2026-10-22/23; docs/backlog/workshop.md): each part its own piece (art/broomParts.js,
// the art pass: Ed's "mismatched salvage", lit only where a real light would be), for the bay's cards (ui/stationPanel.ts: side on, big
// and bold), hung on the pegboard's pegs (stubbier and tilted, so it reads at a cell's few pixels) and her broom assembled from its three
// parts, resting on the bay or the lathe (render/workshopArt.ts); in the house's pixel (art/furniture.js modelSprite).
import { Model } from "./model3d.js";
import { ctPlace } from "./country.js";
import { modelSprite, HANG, SIZE } from "./furniture.js";
import { PART_ART, drawPart, drawBroom, stubby } from "./broomParts.js";

/** How much stubbier each part hangs on the pegboard (1: as it is; the short, tall ones keep their shape). */
const HUNG_K = { horse: 1, curl: 1, missile: .7 };
/** A part's sprite (art/furniture.js modelSprite: { sp, origin, lights, marks }) by its id (config/broom-parts.json), `fit` art pixels
 *  long: on a card (pitch, yaw: a little turned, so a ladder's rungs and twin nozzles show) or `hung` on the pegboard (stubbier, tilted
 *  HANG in the board's plane, the board's yaw). Its origin is its middle (a card's picture is laid by its box, a cell's by its middle). */
export function partSprite(id, { fit = 58, pitch = .45, yaw = .35, hung = false } = {}) {
  const P = PART_ART[id], m = new Model({ blend: .02 }), k = hung ? HUNG_K[id] ?? .55 : 1;
  drawPart(m, id);
  // (about its middle: a tip's and an exhaust's socket is at one end)
  const mid = P.slot === "tip" ? P.len / 2 : P.slot === "exhaust" ? -P.len / 2 : 0;
  if (mid) ctPlace(m, 0, { at: [-mid, 0, 0] });
  if (k !== 1) stubby(m, 0, k);
  if (hung) { ctPlace(m, 0, { pitch: HANG }); m.lights = []; } // (hung, its own lights off: the board stays readable under the room's)
  return modelSprite(m, { ppm: fit / (P.len * k * SIZE), pitch, yaw });
}
/** Her broom's sprite, resting (render/workshopArt.ts): its fitted parts (ids or null) assembled (art/broomParts.js drawBroom), turned
 *  `turn` radians on the floor's plane from lying along the piece it rests on (yaw: that piece's), `scale` times a real broom (the
 *  house is drawn twice life size: art/furniture.js SIZE). */
export function restingBroomSprite(fitted, { ppm = 32 / 3, pitch = .6, yaw = 0, turn = 0, scale = 1 } = {}) {
  const m = new Model({ blend: .02 });
  drawBroom(m, fitted);
  if (turn) ctPlace(m, 0, { yaw: turn });
  return modelSprite(m, { ppm: ppm * scale, pitch, yaw });
}
