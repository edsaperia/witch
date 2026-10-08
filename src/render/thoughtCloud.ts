// A sleeping legend's dream as a pixel thought bubble (Ed, 2026-10-08, relayed by the coordinator: "they should be drawn in the
// same way as the speech bubbles ... thought bubbles - small clouds going up to a large cloud ... just one [symbol] at a time,
// alternating between emoji and the quest sigil, and occasionally the flask sigil"): the cloud's shape as a grid of cloud
// pixels (each GRID screen px, the game's grid), its outline one pixel thick like the speech bubbles', a flat fill, and the
// trail of puffs rising to it, smallest at the sleeper; and which symbol shows when. No DOM here: render/leash/bubbles.ts draws it.
import { hash2 } from "../rules/random";

/** The game's pixel grid on screen: the bubbles' outline and every size and place in them are whole multiples of it. */
export const GRID = 3;
/** Snap a screen position (px) to the grid. */
export const snap = (v: number): number => Math.round(v / GRID) * GRID;

/** A thought bubble's pixels: 0 outside, 1 its outline, 2 its fill; `w` by `h` cloud pixels. `box` is the symbol's square in
 *  the big cloud (its top-left and side, cloud pixels); `foot` the smallest puff's middle, which sits over the sleeper. */
export interface ThoughtShape { w: number; h: number; px: Uint8Array; box: { x: number; y: number; n: number }; foot: { x: number; y: number }; puffs: { x: number; y: number; r: number }[] }

const CACHE = new Map<string, ThoughtShape>();

/** The bubble round a symbol `inner` cloud pixels across, with `puffs` small clouds (2 or 3) trailing down and left from it,
 *  growing toward the big one. A lumpy cloud: an oval body with bumps round its top and sides, all whole pixels. */
export function thoughtShape(inner: number, puffs = 3): ThoughtShape {
  const key = `${inner}:${puffs}`, hit = CACHE.get(key);
  if (hit) return hit;
  const cw = Math.round(inner * 1.7) + 4, ch = Math.round(inner * 1.5) + 4;
  // the puffs: radii growing a pixel at a time up the trail (3, 4, 5 round a legend's symbol)
  const base = Math.max(2, Math.round(inner / 10)), rs = Array.from({ length: Math.max(1, puffs) }, (_, i) => base + i);
  // the cloud, its top-left at (1 + room for the trail, 0): a flat-bottomed body under big round bumps (the tallest in the
  // middle), so its outline scallops
  let spread = 0;
  for (let i = 1; i < rs.length; i++) spread += Math.round((rs[i] + rs[i - 1]) * 0.55);
  const X0 = Math.max(1, rs[0] + 2 + spread - Math.round(cw * 0.28)), Y0 = 0, cx = X0 + cw / 2, w = Math.ceil(X0 + cw + 1);
  const rx = cw * 0.4, ry = ch * 0.3, by = Y0 + ch * 0.6;
  const lumps: [number, number, number][] = ([
    [0.5, 0.35, 0.33], [0.25, 0.47, 0.25], [0.75, 0.45, 0.27], [0.1, 0.66, 0.17], [0.9, 0.64, 0.18], [0.34, 0.76, 0.22], [0.66, 0.77, 0.21],
  ] as const).map(([u, v, r]) => [X0 + u * cw, Y0 + v * ch, r * ch]);
  const cloud = (x: number, y: number): boolean => {
    const X = x + 0.5, Y = y + 0.5;
    if (((X - cx) / rx) ** 2 + ((Y - by) / ry) ** 2 <= 1) return true;
    for (const [lx, ly, lr] of lumps) if ((X - lx) ** 2 + (Y - ly) ** 2 <= lr * lr) return true;
    return false;
  };
  // the trail: the biggest puff a pixel clear under the cloud's lower left, each smaller one a pixel clear of the last, down and left
  const trail: { x: number; y: number; r: number }[] = [];
  let tx = Math.round(X0 + cw * 0.28), low = 0;
  for (let dx = -rs[rs.length - 1]; dx <= rs[rs.length - 1]; dx++) for (let y = 0; y < ch + 4; y++) if (cloud(tx + dx, y)) low = Math.max(low, y);
  let ty = low + 2 + rs[rs.length - 1];
  for (let i = rs.length - 1; i >= 0; i--) {
    trail.unshift({ x: tx, y: ty, r: rs[i] });
    if (i) { ty += rs[i] + rs[i - 1] + 1; tx -= Math.round((rs[i] + rs[i - 1]) * 0.55); }
  }
  const h = trail[0].y + rs[0] + 1;
  const inside = (x: number, y: number): boolean => {
    if (cloud(x, y)) return true;
    const X = x + 0.5, Y = y + 0.5;
    for (const p of trail) if ((X - p.x) ** 2 + (Y - p.y) ** 2 <= p.r * p.r + 0.6) return true;
    return false;
  };
  const px = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (inside(x, y)) px[y * w + x] = 2;
  // no spurs: a pixel holding on by one side or none goes (the circles' tips, a fleck in pixel art)
  for (let pass = 0; pass < 2; pass++) for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x;
    if (px[i] && (+(x > 0 && !!px[i - 1]) + +(x < w - 1 && !!px[i + 1]) + +(y > 0 && !!px[i - w]) + +(y < h - 1 && !!px[i + w])) < 2) px[i] = 0;
  }
  // the outline: a filled pixel with a side open (outside or off the edge), as the speech bubbles' one-pixel border
  const filled = (x: number, y: number) => x >= 0 && y >= 0 && x < w && y < h && px[y * w + x] !== 0;
  const edge: number[] = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (px[y * w + x] && (!filled(x - 1, y) || !filled(x + 1, y) || !filled(x, y - 1) || !filled(x, y + 1))) edge.push(y * w + x);
  for (const i of edge) px[i] = 1;
  const shape: ThoughtShape = { w, h, px, box: { x: Math.round(cx - inner / 2), y: Math.round(Y0 + ch * 0.55 - inner / 2), n: inner }, foot: { x: trail[0].x, y: trail[0].y }, puffs: trail };
  CACHE.set(key, shape);
  return shape;
}

/** Paint a shape into RGBA (one pixel a cloud pixel): its outline in `ink`, its fill flat in `fill` (no gradient, no shadow). */
export function paintThought(s: ThoughtShape, ink: [number, number, number, number], fill: [number, number, number, number], out: Uint8ClampedArray): void {
  for (let i = 0; i < s.px.length; i++) {
    const c = s.px[i] === 1 ? ink : s.px[i] === 2 ? fill : null, o = i * 4;
    if (!c) { out[o + 3] = 0; continue; }
    out[o] = c[0]; out[o + 1] = c[1]; out[o + 2] = c[2]; out[o + 3] = Math.round(c[3] * 255);
  }
}

export type DreamSymbol = "emoji" | "sigil" | "flask";
export interface DreamCycle { hold: number; fade: number; flask: number }

/** Which symbol a dream shows at `time` (seconds, the screen's own clock), and how far it's faded in (0-1): turns of `hold`
 *  seconds, the emoji, then the quest sigil, then the emoji again, each odd turn now and then (`flask`, seeded by the legend
 *  and the turn) the flask's relic sigil instead; each turn fading in and out over `fade` seconds at its ends. Offset by the
 *  legend's id so neighbours don't swap together. Without a quest to show (`quest` false), the emoji alone, steady. */
export function dreamSymbol(time: number, id: number, C: DreamCycle, quest = true): { kind: DreamSymbol; alpha: number } {
  if (!quest) return { kind: "emoji", alpha: 1 };
  const hold = Math.max(0.2, C.hold), t = time + (id % 11) * hold * 0.29, k = Math.floor(t / hold), u = t - k * hold;
  const kind: DreamSymbol = k % 2 === 0 ? "emoji" : hash2(id, k, 9127) < C.flask ? "flask" : "sigil";
  const f = Math.max(0.001, Math.min(C.fade, hold / 2)), a = Math.max(0, Math.min(1, u / f, (hold - u) / f));
  return { kind, alpha: a * a * (3 - 2 * a) };
}
