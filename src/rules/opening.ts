// The new opening's wake-up spot (Ed, 2026-10-20; app/opening.ts, previews/ed/opening-mock/ on claude/ed-shots): the chart's
// dive ends in her bedroom in the treehouse (config/house/'s bedroom), so the night starts there, beside her bed, not
// behind the decks. Here: where that is, and her put there, with the camera settled indoors on her (rules/camera.ts camera.house)
// so the dive (app/arrive.ts) has its last shot. Pure: no clock, no page.
import type { Game } from "./game";
import { coastOf } from "./game";
import { stepCamera } from "./camera";
import { deckOf } from "./treehouse";
import { HOUSE_ROOMS, objectFront } from "./houseRooms";
import { witchHeight } from "./witch";

/** How far in front of the bed (its side towards its room's middle, where she'd stand to use it: rules/houseRooms.ts objectFront)
 *  she stands as she wakes (m). */
const BEDSIDE = 1.4;

/** Her spot as she wakes: in front of her bed (the house's "bed" object), in the world; null without the house's rooms. */
export function bedside(g: Pick<Game, "map" | "tuning">, H = HOUSE_ROOMS): { x: number; z: number } | null {
  const d = deckOf(g.map, g.tuning), bed = H.objects.find(o => o.use.kind === "bed");
  if (!d?.house?.rooms || !bed) return null;
  return objectFront(bed, g.map.treehouse, BEDSIDE, H);
}

/** She wakes in her bedroom: put beside her bed on the house's floor, standing (no longer seated at the decks), and the camera
 *  settled on her there as it would be after a while indoors. False (nothing changed) without the house's rooms. */
export function wakeInBedroom(g: Game): boolean {
  const at = bedside(g);
  if (!at) return false;
  const W = g.witches[0];
  W.body = { ...W.body, x: at.x, z: at.z, vx: 0, vz: 0, mode: "ground", lift: 0, boost: 0, seated: false, perch: true, facing: 1, away: false, heading: "side", lean: false };
  const w = W.body, target = { x: w.x, y: witchHeight(w, g.tuning), z: w.z };
  for (let i = 0; i < 600; i++) g.camera = stepCamera(g.camera, 0, target, { x: 0, z: 0 }, 0, 1 / 30, g.tuning, false, null, coastOf(g), null, true); // (twenty seconds' easing: settled)
  return true;
}
