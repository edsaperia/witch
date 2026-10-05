// Witch stylised rendering (Ed, 2026-10-05: "everything should look a bit more pixel-art stylised"; the
// art director's ladder, #121, and docs/ART-GUIDE.md section 0): a baked sprite's light baked into its
// colours as a few flat tones, so the game shows pixel-art shading rather than a lit 3D surface. Two
// renderings, picked by the style's `render` (?style=bold|ref; "plain" leaves the bake as it is):
//   bold (rungs 3 and 4): 3 hue-shifted tones per material (shadows cooler and more saturated, lights
//     warmer), tones in clusters (a 3 x 3 majority) and no lone pixels, no dither, and a selective
//     outline in each part's own dark colour, broken on the lit side;
//   ref (rung 6, Ed's boar reference): one tone family a material, a pale cream light falling as a big
//     shape over the top and a deep red-brown (blue-violet for cool colours) shadow, clusters, a strong
//     near-black outline and interior lines where one part sits in front of another.
// The light is the bake's one direction (upper left, a little in front). The normals come out flat, so
// the game's lights add their colour over the tones without banding them again. Glowing pixels stay as
// they are. In place: the sprite keeps its size, so its frames, anchors and pivots stay where they were.
import { hsv2rgb } from "./core.js";

export const RENDERINGS = ["bold", "ref", "plain"];
const SY_LIGHT = (() => { const l = [-.45, -.75, .5], n = Math.hypot(...l); return l.map(v => v / n); })();
const syHsv = ([r, g, b]) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0; if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return [(h / 6 + 1) % 1, mx ? d / mx : 0, mx]; };
const syToward = (h, target, k) => { let d = target - h; if (d > .5) d -= 1; if (d < -.5) d += 1; return (h + d * k + 1) % 1; };
// a material colour's tone t (0 shadow, .5 base, 1 light)
function syTone(rgb, t, ref) {
  let [h, s, v] = syHsv(rgb);
  if (ref) {
    const warm = h < .2 || h > .85, v0 = v;
    if (t < .34) { h = syToward(h, warm ? .99 : .7, .35); s = Math.min(1, s * 1.35 + .12); v = v0 * .58; }
    else if (t > .66) { h = syToward(h, .12, .25); s *= .55; v = Math.min(1, v0 * 1.22 + .08); }
    return hsv2rgb(h, s, v);
  }
  v = Math.min(1, v * (.52 + .62 * t));
  const k = Math.abs(t - .5) * 2;
  h = t < .5 ? syToward(h, .72, .16 * k) : syToward(h, .13, .12 * k);
  s = Math.min(1, s * (t < .5 ? 1 + .45 * k : 1 - .25 * k) + (t < .5 ? .08 * k : 0));
  return hsv2rgb(h, s, v);
}

// bk: a bake with no outline ({ A, N, NF, w, h } canvases: bake(sp, colours, st, "none")); this draws its own. render: "bold" or "ref". outline: false to draw none (a rig's
// discs, strung into a limb). Returns a new bake.
/** @param {any} bk @param {string} render @param {{ outline?: boolean, makeCanvas?: (w: number, h: number) => any }} [opts] */
export function stylise(bk, render, { outline = true, makeCanvas = undefined } = {}) {
  if (!render || render === "plain") return bk;
  const ref = render === "ref", tones = 3, { w, h } = bk, n = w * h;
  const A = bk.A.getContext("2d").getImageData(0, 0, w, h).data, N = bk.N.getContext("2d").getImageData(0, 0, w, h).data;
  const fill = new Uint8Array(n), glow = new Uint8Array(n), band = new Int8Array(n).fill(-1), alb = new Array(n), key = new Array(n), col = new Array(n), nrm = new Array(n);
  for (let i = 0; i < n; i++) {
    const o = i * 4; if (!A[o + 3]) continue;
    fill[i] = 1; alb[i] = [A[o], A[o + 1], A[o + 2]]; key[i] = alb[i].join();
    const nx = (N[o] - 128) / 127, ny = (N[o + 1] - 128) / 127, nz = N[o + 2] / 255; nrm[i] = [nx, ny, nz];
    if (A[o + 3] === 254) { glow[i] = 1; col[i] = alb[i]; band[i] = tones - 1; continue; }
    const d = Math.max(0, nx * SY_LIGHT[0] + ny * SY_LIGHT[1] + nz * SY_LIGHT[2]), v = ref ? Math.min(1, .22 + .95 * d) : .3 + .7 * d;
    band[i] = Math.max(0, Math.min(tones - 1, Math.floor(v * tones)));
  }
  // clusters: each pixel takes the band most of its 3 x 3 neighbourhood of the same colour has
  const nb2 = Int8Array.from(band);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x; if (!fill[i] || glow[i]) continue;
    const cnt = [0, 0, 0];
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= w || Y >= h) continue; const j = Y * w + X; if (fill[j] && !glow[j] && key[j] === key[i]) cnt[band[j]] += dx || dy ? 1 : 1.5; }
    nb2[i] = cnt.indexOf(Math.max(...cnt));
  }
  for (let i = 0; i < n; i++) if (fill[i] && !glow[i]) { band[i] = nb2[i]; col[i] = syTone(alb[i], band[i] / (tones - 1), ref); }
  // lone pixels: one unlike all four neighbours, two or more of which agree, takes their colour
  const ck = i => col[i] && col[i].join();
  for (let pass = 0; pass < 2; pass++) for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
    const i = y * w + x; if (!fill[i]) continue;
    const nb = [i - 1, i + 1, i - w, i + w].filter(j => fill[j]); if (nb.some(j => ck(j) === ck(i))) continue;
    const count = {}; for (const j of nb) count[ck(j)] = (count[ck(j)] || 0) + 1;
    const best = Object.entries(count).sort((p, q) => q[1] - p[1])[0]; if (!best || best[1] < 2) continue;
    const j = nb.find(m => ck(m) === best[0]); col[i] = col[j]; band[i] = band[j];
  }
  // write: the tones, flat normals; then the outline in the empty pixels round the shape
  const mk = makeCanvas || ((W, H) => { const c = document.createElement("canvas"); c.width = W; c.height = H; return c; });
  const oA = mk(w, h), oN = mk(w, h), oNF = mk(w, h), a = oA.getContext("2d").createImageData(w, h), nn = oN.getContext("2d").createImageData(w, h), nf = oNF.getContext("2d").createImageData(w, h);
  const flat = (i, n2 = [0, 0, 1]) => { nn.data.set([n2[0] * 127 + 128, n2[1] * 127 + 128, n2[2] * 255, 255], i * 4); nf.data.set([-n2[0] * 127 + 128, n2[1] * 127 + 128, n2[2] * 255, 255], i * 4); };
  for (let i = 0; i < n; i++) if (fill[i]) { a.data.set([...col[i], glow[i] ? 254 : 255], i * 4); flat(i, glow[i] ? nrm[i] : undefined); }
  if (outline) for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x; if (fill[i]) continue;
    const nb = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => [dx, dy, (y + dy) * w + x + dx]).filter(([dx, dy, j]) => x + dx >= 0 && x + dx < w && y + dy >= 0 && y + dy < h && fill[j]);
    if (!nb.length) continue;
    if (ref) { a.data.set([20, 12, 14, 255], i * 4); flat(i); continue; }
    if (nb.every(([dx, dy, j]) => (dx > 0 || dy > 0) && band[j] === tones - 1)) continue; // the lit side: broken
    const [hh, ss, vv] = syHsv(col[nb[0][2]]);
    a.data.set([...hsv2rgb(syToward(hh, .72, .15), Math.min(1, ss * 1.2 + .15), Math.max(.06, vv * .35)), 255], i * 4); flat(i);
  }
  // interior lines (ref): where the surface turns sharply (one part in front of another), on its darker side
  if (ref && outline) for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x; if (!fill[i] || glow[i]) continue;
    for (const j of [x + 1 < w ? i + 1 : -1, y + 1 < h ? i + w : -1]) { if (j < 0 || !fill[j] || glow[j]) continue; const p = nrm[i], q = nrm[j]; if (p[0] * q[0] + p[1] * q[1] + p[2] * q[2] > .55) continue; const k = band[i] <= band[j] ? i : j; a.data.set([20, 12, 14, 255], k * 4); }
  }
  oA.getContext("2d").putImageData(a, 0, 0); oN.getContext("2d").putImageData(nn, 0, 0); oNF.getContext("2d").putImageData(nf, 0, 0);
  return { ...bk, A: oA, N: oN, NF: oNF };
}
