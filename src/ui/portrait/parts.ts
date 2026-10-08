// The hand-placed parts by the creator's names (art direction round 1): a hat, a hair style or a top as a function of her look
// (and the rig's parameters, for hair blown or messy) giving its sprites placed in whole pixels. A name with no entry here is drawn
// by its shape (draw.ts) until it's hand-placed, or as the nearest drawn one (FALLBACK; DECISION FOR ED). Art builder 1's
// classic hat, long hair and jacket replace round 1's stand-ins (art/target.ts) by setting these entries.
//
//   hats and hair: in the head box's pixels (64 x 64, its top-left at rig.ts HEAD_BOX from the neck; the face's middle at 32, 32;
//   the hair's top at row 0, the chin at row 51, the neck below).
//   tops: in the body's pixels, the neck pivot at 0, 0 (the shoulders fill the canvas's width, 128 px; its bottom 34 px below).

import { ROBE_JACKET } from "./maps/body";
import { HAIR_MAPS } from "./maps/hairStyles";
import { POINTED_HATS } from "./maps/hatsPointed";
import { toSprite, type PixMap } from "./maps/pixmap";
import type { Look, Params } from "./rig";
import type { Placed } from "./sprite";

/** A map placed with its anchor at (x, y) (the hat-tip hand on the brim). */
export const atAnchor = (m: PixMap, x: number, y: number): Placed => ({ sprite: toSprite(m), x: x - m.anchor[0], y: y - m.anchor[1] });
/** The brim's centre in the head box (where HAT_ART places a hat's anchor). */
export const BRIM_AT = { x: 32, y: 1 } as const;

// Art builder 1's maps (maps/) on the frames below: a map's anchor is the brim's centre (the hat), the head's centre (the hair) or
// the neck pivot (the top), measured on round 1's target head; in the head box the brim's centre is at (32, 1) and the head's
// centre at (32, 31), and the jacket's pivot sits 3 px above the body's (its collar round the neck as drawn).
const place = (m: PixMap, ax: number, ay: number): Placed => ({ sprite: toSprite(m), x: ax - m.anchor[0], y: ay - m.anchor[1] });
/** Two maps as one (the second over the first), both on the same anchor. */
function over(a: PixMap, b: PixMap): PixMap {
  const x0 = Math.min(-a.anchor[0], -b.anchor[0]), y0 = Math.min(-a.anchor[1], -b.anchor[1]);
  const x1 = Math.max(a.rows[0].length - a.anchor[0], b.rows[0].length - b.anchor[0]), y1 = Math.max(a.rows.length - a.anchor[1], b.rows.length - b.anchor[1]);
  const g = Array.from({ length: y1 - y0 }, () => Array(x1 - x0).fill("."));
  for (const m of [a, b]) m.rows.forEach((r, y) => [...r].forEach((c, x) => { if (c !== ".") g[y - m.anchor[1] - y0][x - m.anchor[0] - x0] = c; }));
  return { anchor: [-x0, -y0], rows: g.map(r => r.join("")) };
}


export const HAT_ART: Record<string, (l: Look) => Placed> = Object.fromEntries(
  Object.entries(POINTED_HATS).map(([name, f]) => [name, (l: Look) => place(f(l), BRIM_AT.x, BRIM_AT.y)]),
);
export const HAIR_ART: Record<string, (l: Look, p: Params) => { back?: Placed; front?: Placed }> = Object.fromEntries(
  Object.entries(HAIR_MAPS).map(([name, h]) => [name, (_l: Look, p: Params) => p.hatOn > 0.5
    ? { back: place(h.back, 32, 31), front: place(over(h.front, h.hatShadow), 32, 31) }
    : { back: place(over(h.crown, h.back), 32, 31), front: place(h.front, 32, 31) }]),
);
export const TOP_ART: Record<string, (l: Look, p: Params) => Placed[]> = {
  jacket: () => [place(ROBE_JACKET, 0, -3)],
};

/** A part the creator offers but nobody has hand-placed yet: "shapes" draws its first-round shape (bigger), "nearest" the nearest
 *  hand-placed one in its colours (DECISION FOR ED; the art direction's round 1 asks which). */
export const FALLBACK: { mode: "shapes" | "nearest" } = { mode: "shapes" };
/** The nearest hand-placed hat or hair for one that isn't. */
export const NEAREST: Record<string, string> = { wizard: "classic" };
