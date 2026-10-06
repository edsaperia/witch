// The pixel-art styles (docs/ART-GUIDE.md section 0), applied to a sprite as it is baked: "bold" (3 hue-shifted tones per
// material, cool saturated shadows and warm lights, clusters rather than noise, a selective outline in each part's own dark
// colour, broken on the lit upper left) and "ref" (Ed's boar reference: one tone family per material, cream light as a big
// shape over the top, a deeper red-brown or blue-violet shadow, a strong near-black outline with interior lines where parts
// overlap). The light is baked into the albedo from the sprite's own normals (one light, from the upper left and in front),
// and the normals come out flat, so the game's lighting tints the sprite without banding it again. The sprite keeps its
// size: the outline goes only where there is room. "now" (or nothing) leaves the bake as it was.
// The game's ?style=now|bold|ref (and ?px=3|4|5 for the art pixel) choose one per load; the stylisation ladder
// (tools/art-iterations/ladder.mjs) shows the same treatments side by side.
import { hsv2rgb } from "./core.js";

export const ART_STYLES = ["now", "bold", "ref"];
const STYLE_LIGHT = (() => { const l = [-.45, -.75, .5], n = Math.hypot(...l); return l.map(v => v / n); })();
const styleHsv = (r, g, b) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0; if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return [(h / 6 + 1) % 1, mx ? d / mx : 0, mx]; };
const styleToward = (h, target, k) => { let d = target - h; if (d > .5) d -= 1; if (d < -.5) d += 1; return (h + d * k + 1) % 1; };

// A material's tone t (0 shadow, .5 base, 1 light) in a style.
function styleTone(r, g, b, t, mode) {
  let [h, s, v] = styleHsv(r, g, b);
  if (mode === "ref") {
    const warm = h < .2 || h > .85;
    if (t < .34) { h = styleToward(h, warm ? .99 : .7, .35); s = Math.min(1, s * 1.35 + .12); v *= .58; }
    else if (t > .66) { h = styleToward(h, .12, .25); s *= .55; v = Math.min(1, v * 1.22 + .08); }
    return hsv2rgb(h, s, v);
  }
  const k = Math.abs(t - .5) * 2;
  v = Math.min(1, v * (.52 + .62 * t));
  h = t < .5 ? styleToward(h, .72, .16 * k) : styleToward(h, .13, .12 * k);
  s = Math.min(1, s * (t < .5 ? 1 + .45 * k : 1 - .25 * k) + (t < .5 ? .08 * k : 0));
  return hsv2rgb(h, s, v);
}

// Stylise a baked sprite's pixels in place: a (RGBA albedo, alpha 254 = glowing), n and nf (RGBA normal maps, as bake writes
// them), w x h. The sprite must have been baked without an outline (this draws its own).
// opts.interior: false leaves out ref's interior lines (a busy scene, such as the creator's bedroom, keeps just its outline).
export function stylisePixels(a, n, nf, w, h, mode, { interior = true } = {}) {
  if (mode !== "bold" && mode !== "ref") return;
  const T = 3, N = w * h, band = new Int8Array(N).fill(-1), key = new Int32Array(N).fill(-1), glow = new Uint8Array(N), nrm = new Float32Array(N * 3);
  const keyOf = o => (a[o] << 16) | (a[o + 1] << 8) | a[o + 2];
  for (let i = 0; i < N; i++) {
    const o = i * 4; if (!a[o + 3]) continue;
    key[i] = keyOf(o);
    if (a[o + 3] === 254) { glow[i] = 1; band[i] = T - 1; continue; }
    const nx = (n[o] - 128) / 127, ny = (n[o + 1] - 128) / 127, nz = n[o + 2] / 255;
    nrm[i * 3] = nx; nrm[i * 3 + 1] = ny; nrm[i * 3 + 2] = nz;
    const d = Math.max(0, nx * STYLE_LIGHT[0] + ny * STYLE_LIGHT[1] + nz * STYLE_LIGHT[2]), v = mode === "ref" ? Math.min(1, .22 + .95 * d) : .3 + .7 * d;
    band[i] = Math.min(T - 1, Math.floor(v * T));
  }
  // clusters: each lit pixel takes the band most of its 3 x 3 neighbourhood of the same material has
  const nb2 = Int8Array.from(band);
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
    const i = y * w + x; if (key[i] < 0 || glow[i]) continue;
    const cnt = [0, 0, 0];
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const j = i + dy * w + dx; if (key[j] === key[i] && !glow[j]) cnt[band[j]] += dx || dy ? 1 : 1.5; }
    nb2[i] = cnt[0] >= cnt[1] && cnt[0] >= cnt[2] ? 0 : cnt[1] >= cnt[2] ? 1 : 2;
  }
  // the tones, from each pixel's own albedo; remember each pixel's colour for the lone-pixel and outline passes
  const out = new Uint8ClampedArray(a.length);
  for (let i = 0; i < N; i++) {
    const o = i * 4; if (key[i] < 0) continue;
    if (glow[i]) { out[o] = a[o]; out[o + 1] = a[o + 1]; out[o + 2] = a[o + 2]; out[o + 3] = 254; continue; }
    band[i] = nb2[i];
    const c = styleTone(a[o], a[o + 1], a[o + 2], band[i] / (T - 1), mode);
    out[o] = c[0]; out[o + 1] = c[1]; out[o + 2] = c[2]; out[o + 3] = 255;
  }
  // lone pixels: a pixel unlike all four neighbours, two or more of which agree, takes their colour
  const ck = i => (out[i * 4] << 16) | (out[i * 4 + 1] << 8) | out[i * 4 + 2];
  for (let pass = 0; pass < 2; pass++) for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
    const i = y * w + x; if (key[i] < 0 || glow[i]) continue;
    const me = ck(i), nb = [i - 1, i + 1, i - w, i + w].filter(j => key[j] >= 0);
    if (nb.some(j => ck(j) === me)) continue;
    let best = -1, bc = 1; for (const j of nb) { const kj = ck(j), c = nb.filter(q => ck(q) === kj).length; if (c > bc) { bc = c; best = j; } }
    if (best < 0) continue;
    out.set(out.subarray(best * 4, best * 4 + 4), i * 4); band[i] = band[best];
  }
  // the outline, in the empty pixels round the shape
  const strong = mode === "ref";
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x; if (key[i] >= 0) continue;
    const nb = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => x + dx >= 0 && x + dx < w && y + dy >= 0 && y + dy < h && key[i + dy * w + dx] >= 0).map(([dx, dy]) => [dx, dy, i + dy * w + dx]);
    if (!nb.length) continue;
    const o = i * 4;
    if (strong) { out[o] = 20; out[o + 1] = 12; out[o + 2] = 14; out[o + 3] = 255; continue; }
    if (nb.every(([dx, dy, j]) => (dx > 0 || dy > 0) && band[j] === T - 1)) continue; // broken on the lit upper left
    const j = nb[0][2], [hh, ss, vv] = styleHsv(out[j * 4], out[j * 4 + 1], out[j * 4 + 2]), c = hsv2rgb(styleToward(hh, .72, .15), Math.min(1, ss * 1.2 + .15), Math.max(.06, vv * .35));
    out[o] = c[0]; out[o + 1] = c[1]; out[o + 2] = c[2]; out[o + 3] = 255;
  }
  // interior lines (ref): where the surface turns sharply, the darker side gets a line
  if (strong && interior) for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x; if (key[i] < 0 || glow[i]) continue;
    for (const j of [x + 1 < w ? i + 1 : -1, y + 1 < h ? i + w : -1]) {
      if (j < 0 || key[j] < 0 || glow[j]) continue;
      if (nrm[i * 3] * nrm[j * 3] + nrm[i * 3 + 1] * nrm[j * 3 + 1] + nrm[i * 3 + 2] * nrm[j * 3 + 2] > .55) continue;
      const k = band[i] <= band[j] ? i : j; out[k * 4] = 20; out[k * 4 + 1] = 12; out[k * 4 + 2] = 14;
    }
  }
  a.set(out);
  // flat normals: the light is in the albedo now; the game's light tints without banding again
  for (let i = 0; i < N; i++) { const o = i * 4; if (!a[o + 3]) continue; n[o] = 128; n[o + 1] = 128; n[o + 2] = 255; n[o + 3] = 255; nf[o] = 128; nf[o + 1] = 128; nf[o + 2] = 255; nf[o + 3] = 255; }
}
