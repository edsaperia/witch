// The hand-placed parts by the creator's names (art direction round 1): a hat, a hair style or a top as a function of her look
// (and the rig's parameters, for hair blown or messy) giving its sprites placed in whole pixels. A name with no entry here is drawn
// by its shape (draw.ts) until it's hand-placed, or as the nearest drawn one (FALLBACK; DECISION FOR ED). Art builder 1's
// classic hat, long hair and jacket replace round 1's stand-ins (art/target.ts) by setting these entries.
//
//   hats and hair: in the head box's pixels (64 x 64, its top-left at rig.ts HEAD_BOX from the neck; the face's middle at 32, 32;
//   the hair's top at row 0, the chin at row 51, the neck below).
//   tops: in the body's pixels, the neck pivot at 0, 0 (the shoulders fill the canvas's width, 128 px; its bottom 34 px below).

import { HAT_CLASSIC, HAIR_LONG } from "./art/target";
import type { Look, Params } from "./rig";
import { resizeCols, resizeRows, shear, type Placed } from "./sprite";

export const HAT_ART: Record<string, (l: Look) => Placed> = {
  /** The classic hat (round 1's target): its height adds or drops the cone's middle rows, its brim width the brim's side columns,
   *  its tilt shears the cone by whole pixels. */
  classic: l => {
    const rows = Math.round(30 * Math.min(1.9, Math.max(0.35, l.hatHeight))), side = Math.round(17 * Math.min(1.7, Math.max(0.3, l.hatBrim)));
    let s = resizeRows(HAT_CLASSIC, 9, 38, rows);
    s = resizeCols(resizeCols(s, 63, 80, side + 1), 3, 20, side + 1);
    const band = 40 + rows - 30, per = Math.sign(l.hatTilt), every = l.hatTilt ? Math.max(2, Math.round(7 / Math.abs(l.hatTilt))) : 0;
    const sh = shear(s, band, every, per), grow = (sh.w - s.w) / 2;
    return { sprite: sh, x: -10 - (side - 17) - grow, y: -43 - (rows - 30) };
  },
};
export const HAIR_ART: Record<string, (l: Look, p: Params) => { back?: Placed; front?: Placed }> = {
  long: () => ({ back: { sprite: HAIR_LONG, x: 0, y: 0 } }),
};
export const TOP_ART: Record<string, (l: Look, p: Params) => Placed[]> = {};

/** A part the creator offers but nobody has hand-placed yet: "shapes" draws its first-round shape (bigger), "nearest" the nearest
 *  hand-placed one in its colours (DECISION FOR ED; the art direction's round 1 asks which). */
export const FALLBACK: { mode: "shapes" | "nearest" } = { mode: "shapes" };
/** The nearest hand-placed hat or hair for one that isn't. */
export const NEAREST: Record<string, string> = { crooked: "classic", floppy: "classic", small: "classic", flowers: "classic", wizard: "classic", bob: "long", buns: "long", mohawk: "long" };
