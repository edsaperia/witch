// The hand-placed parts by the creator's names (art direction round 1): a hat, a hair style or a top as a function of her look
// (and the rig's parameters: her hat off shows the hair's crown) giving its sprites placed in whole pixels. A name with no entry
// here is drawn by its shape (draw.ts) until it's hand-placed, or as the nearest drawn one (FALLBACK; DECISION FOR ED). Art
// builder 1's maps (maps/: the pointed hats, the long hair, the jacket) fill these, each placed by its anchor.
//
//   hats and hair: in the head box's pixels (64 x 64, its top-left at rig.ts HEAD_BOX from the neck; the head's centre at 32, 32,
//   the brim's centre at BRIM from it; the hair's top at row 0, the chin at row 51, the neck below).
//   tops: in the body's pixels, the neck pivot at 0, 0 (the canvas 128 px wide).

import { col, type Mat } from "./palette";
import { ROBE_JACKET } from "./maps/body";
import { HAIR_LONG_BACK, HAIR_LONG_CROWN, HAIR_LONG_FRONT, HAIR_LONG_HAT_SHADOW } from "./maps/hairLong";
import { POINTED_HATS } from "./maps/hatsPointed";
import type { PixMap } from "./maps/pixmap";
import { BRIM, type Look, type Params } from "./rig";
import type { Placed, Sprite } from "./sprite";

/** A map as a sprite (its legend's materials and tones as palette indices), cached by map. */
const cache = new WeakMap<PixMap, Sprite>();
export function fromMap(m: PixMap): Sprite {
  let s = cache.get(m);
  if (!s) {
    const h = m.rows.length, w = m.rows[0]?.length ?? 0, px = new Uint8Array(w * h);
    m.rows.forEach((r, y) => { for (let x = 0; x < r.length; x++) { const c = r[x]; if (c === ".") continue; const t = m.legend[c]; if (t) px[y * w + x] = col(t[0] as Mat, t[1]); } });
    cache.set(m, (s = { w, h, px }));
  }
  return s;
}
/** A map placed with its anchor at (x, y). */
export const atAnchor = (m: PixMap, x: number, y: number): Placed => ({ sprite: fromMap(m), x: x - m.anchor[0], y: y - m.anchor[1] });
/** The head's centre and the brim's centre, in the head box. */
const HC = { x: 32, y: 32 }, BC = { x: HC.x + BRIM.x, y: HC.y + BRIM.y };

export const HAT_ART: Record<string, (l: Look) => Placed> = Object.fromEntries(Object.entries(POINTED_HATS).map(([k, f]) => [k, (l: Look) => atAnchor(f(l), BC.x, BC.y)]));
/** A hair style's parts: drawn behind her head (back), and over her face (front). */
export const HAIR_ART: Record<string, (l: Look, p: Params, hatOn: boolean) => { back: Placed[]; front: Placed[] }> = {
  long: (_l, _p, hatOn) => ({
    back: [...(hatOn ? [] : [atAnchor(HAIR_LONG_CROWN, HC.x, HC.y)]), atAnchor(HAIR_LONG_BACK, HC.x, HC.y)],
    front: [atAnchor(HAIR_LONG_FRONT, HC.x, HC.y), ...(hatOn ? [atAnchor(HAIR_LONG_HAT_SHADOW, HC.x, HC.y)] : [])],
  }),
};
export const TOP_ART: Record<string, (l: Look, p: Params) => Placed[]> = {
  jacket: () => [atAnchor(ROBE_JACKET, 0, 0)],
};

/** A part the creator offers but nobody has hand-placed yet: "shapes" draws its first-round shape (bigger), "nearest" the nearest
 *  hand-placed one in its colours (DECISION FOR ED; the art direction's round 1 asks which). */
export const FALLBACK: { mode: "shapes" | "nearest" } = { mode: "shapes" };
/** The nearest hand-placed hat or hair for one that isn't. */
export const NEAREST: Record<string, string> = { wizard: "classic", bob: "long", buns: "long", mohawk: "long" };
