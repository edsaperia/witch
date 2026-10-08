// The other pointed witch's hats (art builder 1, round 2), made from the classic map so they share its drawing and its
// sliders: the crooked hat's cone kinks over at a fold, the floppy one's tip flops right over and its brim droops at the ends,
// the small one is the classic hat short and narrow, and the flowers one has blossoms round its band.

import { BASE, MAT, SHADE } from "../palette";
import type { Look } from "../rig";
import { CLASSIC_SLIDERS, HAT_CLASSIC, HAT_LEGEND, classicHat } from "./hatClassic";
import type { PixMap } from "./pixmap";

type Sliders = Pick<Look, "hatHeight" | "hatBrim" | "hatTilt">;
const grid = (m: PixMap) => m.rows.map(r => [...r]);
const done = (m: PixMap, g: string[][], legend = m.legend): PixMap => ({ ...m, legend, rows: g.map(r => r.join("")) });
/** The band's top row in a slid map (as far above its anchor, the brim's centre, as in the drawn classic). */
const bandTop = (m: PixMap) => m.anchor[1] - (HAT_CLASSIC.anchor[1] - CLASSIC_SLIDERS.bandTop);

/** The cone above `kink` (rows from the band) shifted sideways by `amount` px at the tip, growing as the square, with the fold's
 *  shade along the kink. */
function bend(m: PixMap, kinkUp: number, amount: number, fold: boolean): PixMap {
  const g = grid(m), top = bandTop(m), kink = top - kinkUp, pad = Math.abs(amount) + 2;
  const out = g.map(r => [...".".repeat(pad), ...r, ...".".repeat(pad)]);
  for (let y = 0; y < kink; y++) {
    const s = Math.round(amount * ((kink - y) / kink) ** 2), row = g[y];
    out[y] = [...".".repeat(pad + s), ...row, ...".".repeat(pad - s)];
  }
  if (fold) { // (the fold's crease: the cone's fill across the kink row a tone darker)
    const row = out[kink - 1];
    for (let x = 0; x < row.length; x++) if (row[x] === "l" || row[x] === "p") row[x] = "q";
  }
  return { anchor: [m.anchor[0] + pad, m.anchor[1]], legend: m.legend, rows: out.map(r => r.join("")) };
}

/** The brim's ends drooping (the floppy hat): columns beyond 60% of the brim's half-width pushed down, by the square, up to `drop`. */
function droop(m: PixMap, drop: number): PixMap {
  const g = grid(m), [ax] = m.anchor, top = bandTop(m), W = g[0].length, H = g.length;
  let half = 0; for (let x = 0; x < W; x++) if (g[H - 3][x] !== ".") half = Math.max(half, Math.abs(x - ax));
  const out = [...g.map(r => [...r]), ...Array.from({ length: drop }, () => Array(W).fill("."))];
  for (let x = 0; x < W; x++) {
    const k = (Math.abs(x - ax) - half * 0.6) / (half * 0.4); if (k <= 0) continue;
    const s = Math.round(drop * Math.min(1, k) ** 2); if (!s) continue;
    for (let y = H - 1; y >= top + 2; y--) { out[y + s][x] = g[y][x]; out[y][x] = y - s >= top + 2 ? g[y - s][x] : "."; }
  }
  return { ...m, rows: out.map(r => r.join("")) };
}

/** Blossoms round the band: five-petalled, in the two flower colours, gold at their hearts. */
const BLOSSOM = [".W.W.", "WWwWW", ".wYw.", "WWwWW", ".W.W."];
const FLOWER_LEGEND = { ...HAT_LEGEND, W: [MAT.FLOWER, BASE], w: [MAT.FLOWER, SHADE], V: [MAT.FLOWER2, BASE], v: [MAT.FLOWER2, SHADE] } as const;
function flowers(m: PixMap): PixMap {
  const g = grid(m), top = bandTop(m), [ax] = m.anchor;
  [-15, -8, 8, 15].forEach((dx, i) => BLOSSOM.forEach((r, y) => [...r].forEach((c, x) => {
    if (c === ".") return; const X = ax + dx + x - 2, Y = top + y; if (!g[Y]?.[X] || g[Y][X] === ".") return;
    g[Y][X] = i % 2 ? (c === "W" ? "V" : c === "w" ? "v" : c) : c;
  })));
  return done(m, g, FLOWER_LEGEND);
}

/** The pointed hats by the creator's names, each from the creator's sliders. */
export const POINTED_HATS: Record<string, (l: Sliders) => PixMap> = {
  classic: l => classicHat(l),
  crooked: l => bend(classicHat(l), 14, 9, true),
  floppy: l => droop(bend(classicHat({ ...l, hatHeight: l.hatHeight * 0.85, hatBrim: l.hatBrim * 1.12 }), 16, -18, true), 4),
  small: l => classicHat({ ...l, hatHeight: l.hatHeight * 0.62, hatBrim: l.hatBrim * 0.72 }),
  flowers: l => flowers(classicHat(l)),
};
