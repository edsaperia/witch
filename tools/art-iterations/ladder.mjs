// The stylisation ladder (docs/ART-GUIDE.md, "Pixel-art style"): the same small set drawn at the current look and at
// steps of increasing pixel-art stylisation, side by side, each at the game's own screen scale (art pixel x pixel size).
//   0 Now        as the game draws them: the light in the style's 3 value bands with its checker dither at the band edges, the dark outline
//   1 Clean      the same 3 value bands, no dither, lone pixels merged into their neighbours, the dark outline
//   2 Stylised   3 hue-shifted tones per material (cool, saturated shadows; warm highlights), a selective outline (each
//                colour's own darkest tone, broken on the lit upper-left), lone pixels merged
//   3 Bold       rung 2 with clusters: each pixel takes the light band most of its 3 x 3 neighbourhood has, so tones form bold
//                clusters (leaves, fur) rather than noise
//   4 Chunky     rung 3 drawn at a bigger art pixel (pixel size 4 instead of 3): fewer, bigger pixels, simpler shapes
//   5 Chunkier   rung 3 at pixel size 5
//   6 Reference  the look of Ed's reference (a handheld-monster-game sprite, described in docs/ART-GUIDE.md section 0): 3 tones
//                per material from one family, shadows a deeper, redder (or for cool colours bluer) tone, the light a pale cream,
//                the light falling as a big shape over the top, a strong near-black outline all round, interior lines where parts
//                overlap (a sharp turn in the surface), clean clusters, at pixel size 4
// The legend, far bigger than the rest, has its own row at the bottom (rungs 0, 4 and 6).
// Each rung is also shown at night (the game's dark ground and cool moonlight, roughly), as a small patch of the area.
//   node tools/art-iterations/ladder.mjs <area> <out dir> [artSet]
import { writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { openBrowser } from "../../art/headless.mjs";

const [area = "ancient", outDir = "docs/art-guide/ladder", artSet = ""] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const pngs = await b.page.evaluate(async ({ area, artSet }) => {
  const G = await import("/art/generator.js"), { shade } = await import("/art/lighting.js");
  const base = { ...G.defaultStyle(), ...(artSet ? { artSet } : {}) };
  const mk = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
  const studio = st => ({ ...st, ambient: .55, ambientHue: .15, moon: .9, moonHue: .15, shafts: 0 });
  const LIGHT = (() => { const l = [-.45, -.75, .5], n = Math.hypot(...l); return l.map(v => v / n); })();
  // ---- colour helpers ----
  const rgb2hsv = ([r, g, b2]) => { r /= 255; g /= 255; b2 /= 255; const mx = Math.max(r, g, b2), mn = Math.min(r, g, b2), d = mx - mn; let h = 0; if (d) h = mx === r ? ((g - b2) / d) % 6 : mx === g ? (b2 - r) / d + 2 : (r - g) / d + 4; h = (h / 6 + 1) % 1; return [h, mx ? d / mx : 0, mx]; };
  const toward = (h, target, k) => { let d = target - h; if (d > .5) d -= 1; if (d < -.5) d += 1; return (h + d * k + 1) % 1; };
  // a material's tone t (0 shadow .. 1 light): flat value steps, or a hue-shifted ramp (shadows cooler and more saturated, lights warmer)
  const tone = (rgb, t, shift) => {
    let [h, s, v] = rgb2hsv(rgb);
    v = Math.min(1, v * (.52 + .62 * t));
    if (shift === "ref") { // the reference: shadow a deeper, more saturated tone leaning red (warm) or blue (cool); light a pale cream
      const warm = h < .2 || h > .85;
      if (t < .34) { h = toward(h, warm ? .99 : .7, .35); s = Math.min(1, s * 1.35 + .12); v = Math.min(1, rgb2hsv(rgb)[2] * .58); }
      else if (t > .66) { h = toward(h, .12, .25); s = s * .55; v = Math.min(1, rgb2hsv(rgb)[2] * 1.22 + .08); }
      else v = rgb2hsv(rgb)[2];
      return G.hsv2rgb(h, s, v);
    }
    if (shift) { const k = Math.abs(t - .5) * 2; h = t < .5 ? toward(h, .72, .16 * k) : toward(h, .13, .12 * k); s = Math.min(1, s * (t < .5 ? 1 + .45 * k : 1 - .25 * k) + (t < .5 ? .08 * k : 0)); }
    return G.hsv2rgb(h, s, v);
  };
  // ---- the stylised renderer: from a baked sprite's albedo and normals ----
  function stylise(bk, opts) {
    const { tones, shift, selective } = opts;
    const { w, h } = bk, W = w + 2, H = h + 2, A = bk.A.getContext("2d").getImageData(0, 0, w, h).data, N = bk.N.getContext("2d").getImageData(0, 0, w, h).data;
    const col = new Array(W * H).fill(null), band = new Int8Array(W * H).fill(-1), key = new Array(W * H).fill(null), alb = new Array(W * H).fill(null), glow = new Uint8Array(W * H);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const o = (y * w + x) * 4; if (!A[o + 3]) continue;
      const i = (y + 1) * W + x + 1, rgb = [A[o], A[o + 1], A[o + 2]]; alb[i] = rgb;
      if (A[o + 3] === 254) { glow[i] = 1; col[i] = rgb; band[i] = tones - 1; key[i] = rgb.join(); continue; } // glowing: as it is
      const nx = (N[o] - 128) / 127, ny = (N[o + 1] - 128) / 127, nz = N[o + 2] / 255, d = Math.max(0, nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2]);
      const v = opts.shift === "ref" ? Math.min(1, .22 + .95 * d) : .3 + .7 * d;
      if (!tones) { band[i] = 0; col[i] = tone(rgb, v, false); key[i] = col[i].join(); continue; } // smooth: the light unquantised
      let q = v * tones; if (opts.dither) { const fr = q - Math.floor(q); if (Math.abs(fr - .5) < opts.dither * .25) q += ((x + y) & 1) ? .5 : -.5; } // the game's checker at the band edges
      const bi = Math.max(0, Math.min(tones - 1, Math.floor(q)));
      band[i] = bi; col[i] = tone(rgb, tones > 1 ? bi / (tones - 1) : .5, shift); key[i] = col[i].join();
    }
    // clusters: each lit pixel takes the light band most of its 3 x 3 neighbourhood (of the same colour family) has
    if (opts.clusters) {
      const nb2 = Int8Array.from(band);
      for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
        const i = y * W + x; if (!col[i] || glow[i]) continue;
        const cnt = new Array(tones).fill(0), ak = alb[i].join();
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const j = i + dy * W + dx; if (col[j] && !glow[j] && alb[j].join() === ak) cnt[band[j]] += dx || dy ? 1 : 1.5; }
        nb2[i] = cnt.indexOf(Math.max(...cnt));
      }
      for (let i = 0; i < W * H; i++) if (col[i] && !glow[i] && nb2[i] !== band[i]) { band[i] = nb2[i]; col[i] = tone(alb[i], band[i] / (tones - 1), shift); key[i] = col[i].join(); }
    }
    // lone pixels: a pixel unlike all four neighbours, two or more of which agree, takes their colour
    for (let pass = 0; pass < (opts.merge === false ? 0 : 2); pass++) for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
      const i = y * W + x; if (!col[i]) continue;
      const nb = [i - 1, i + 1, i - W, i + W].filter(j => col[j]); if (nb.some(j => key[j] === key[i])) continue;
      const count = {}; for (const j of nb) count[key[j]] = (count[key[j]] || 0) + 1;
      const best = Object.entries(count).sort((p, q) => q[1] - p[1])[0]; if (!best || best[1] < 2) continue;
      const j = nb.find(n => key[n] === best[0]); col[i] = col[j]; key[i] = key[j]; band[i] = band[j];
    }
    // the outline round the shape
    const out = mk(W, H), g = out.getContext("2d"), img = g.createImageData(W, H), D = img.data;
    for (let i = 0; i < W * H; i++) if (col[i]) D.set([...col[i], 255], i * 4);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x; if (col[i]) continue;
      const nb = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => [dx, dy, (y + dy) * W + x + dx]).filter(([dx, dy, j]) => x + dx >= 0 && x + dx < W && y + dy >= 0 && y + dy < H && col[j]);
      if (!nb.length) continue;
      if (!selective) { D.set(opts.strong ? [20, 12, 14, 255] : [22, 18, 30, 255], i * 4); continue; }
      // selective: the outline is its neighbour's own colour, dark and saturated; on the lit side (the shape below or right of
      // this pixel, its lit tone) it breaks and is left out
      const lit = nb.every(([dx, dy, j]) => (dx > 0 || dy > 0) && band[j] === tones - 1);
      if (lit) continue;
      const [, , j] = nb[0], [hh, ss, vv] = rgb2hsv(col[j]);
      D.set([...G.hsv2rgb(toward(hh, .72, .15), Math.min(1, ss * 1.2 + .15), Math.max(.06, vv * .35)), 255], i * 4);
    }
    // interior lines (the reference): where the surface turns sharply (one part in front of another), the darker side gets a line
    if (opts.interior) {
      const nrm = new Array(W * H).fill(null);
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const o = (y * w + x) * 4; if (A[o + 3]) nrm[(y + 1) * W + x + 1] = [(N[o] - 128) / 127, (N[o + 1] - 128) / 127, N[o + 2] / 255]; }
      for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
        const i = y * W + x; if (!col[i] || glow[i]) continue;
        for (const j of [i + 1, i + W]) { if (!col[j] || glow[j]) continue; const a = nrm[i], c = nrm[j]; if (a[0] * c[0] + a[1] * c[1] + a[2] * c[2] > .55) continue; const k = band[i] <= band[j] ? i : j; D.set([20, 12, 14, 255], k * 4); }
      }
    }
    g.putImageData(img, 0, 0);
    return { c: out, w: W, h: H };
  }
  // ---- the set: the area's creature at every level, a few of its trees, its props, the witch ----
  function items(st) {
    const A = G.areaAssets(area, st), id = A.def.creature, col = G.speciesColours(id, st), vs = G.areaTreeVariants(area, st);
    const pick = ["sapling", "mature", "tall"].map(c => vs.find(v => v.heightClass === c)).filter(Boolean);
    const props = [...A.small.slice(0, 1), ...A.big.filter(p => p.kind !== "tree").slice(0, 1), ...(A.setPiece ? [A.setPiece] : [])].map(p => p.sp);
    return {
      creatures: [0, 1, 2, 3].map(l => ({ sp: G.critter(id, l, 0, st), col })),
      witch: { sp: G.witchSprite(st), col: G.witchColours(st) },
      trees: pick.map(v => v.whole), props, floor: A.floor.sp,
    };
  }
  // the three ways of baking a sprite into a canvas for a rung
  const rung = (r, st) => {
    const it = items(st), outline = "none"; // every rung draws its own outline
    const sprite = ({ sp, col }) => G.bake(sp, col, st, outline);
    const finish = bk => stylise(bk, r === 0 ? { tones: st.bands || 3, dither: st.dither, merge: false } : r === 1 ? { tones: st.bands || 3 } : r === 6 ? { tones: 3, shift: "ref", strong: true, interior: true, clusters: true } : { tones: 3, shift: true, selective: true, clusters: r >= 3 });
    // trees and props come baked already (their own outline mode); the stylised rungs re-light them from their normals
    return {
      creatures: it.creatures.map(c => finish(sprite(c))), witch: finish(sprite(it.witch)),
      trees: it.trees.map(finish), props: it.props.map(finish), floor: it.floor, pixel: st.pixel,
    };
  }
  const RUNGS = [["0  Now: 3 value bands, checker dither", 0, base], ["1  Clean: 3 flat value bands, no dither, no lone pixels", 1, base], ["2  Stylised: 3 hue-shifted tones, selective outline", 2, base], ["3  Bold: rung 2 with clusters (3 x 3 majority of light bands)", 3, base], ["4  Chunky: rung 3 at art pixel 4 (now 3)", 3, { ...base, pixel: 4 }], ["5  Chunkier: rung 3 at art pixel 5", 3, { ...base, pixel: 5 }], ["6  Reference: one tone family, cream light, red-brown shadow, strong outline and inner lines, pixel 4", 6, { ...base, pixel: 4 }]];
  const drawn = RUNGS.map(([label, r, st]) => ({ label, ...rung(r, st) }));
  // ---- the ladder sheet: one band per rung, at the game's screen scale (art px x pixel), on the area's floor in studio light ----
  const S = 3, gap = 10, lab = 22; // each rung draws at its own pixel size: screen px per art px, as in the game
  const legendRow = { d: { label: "The legend at rungs 0, 4 and 6" }, k: 1, row: [0, 4, 6].map(i => ({ ...drawn[i].creatures[3], scale: drawn[i].pixel })) };
  const bands = drawn.map(d => { const k = d.pixel, row = [...d.creatures.slice(0, 3), d.witch, null, ...d.trees, null, ...d.props]; const w = row.reduce((a, s) => a + (s ? s.w * k : 30) + gap, gap); const h = Math.max(...row.filter(Boolean).map(s => s.h * k)) + lab + gap * 2; return { d, k, row, w, h }; });
  { const row = legendRow.row; legendRow.w = row.reduce((a, s) => a + s.w * s.scale + gap, gap); legendRow.h = Math.max(...row.map(s => s.h * s.scale)) + lab + gap * 2; bands.push(legendRow); }
  const W = Math.max(...bands.map(x => x.w)), H = bands.reduce((a, x) => a + x.h, 0), sheet = mk(W, H), g = sheet.getContext("2d");
  g.imageSmoothingEnabled = false;
  let y = 0;
  for (const B of bands) {
    g.fillStyle = "#3b3a2c"; g.fillRect(0, y, W, B.h);
    g.fillStyle = "#000a"; g.fillRect(0, y, W, lab); g.fillStyle = "#f4ecd8"; g.font = "15px monospace"; g.textBaseline = "top"; g.fillText(B.d.label, 8, y + 4);
    let x = gap; const bottom = y + B.h - gap;
    for (const s of B.row) { if (!s) { x += 30; continue; } const k = s.scale || B.k; g.drawImage(s.c, x, bottom - s.h * k, s.w * k, s.h * k); x += s.w * k + gap; }
    y += B.h;
  }
  // ---- at night: each rung as a small patch of the area under the game's dark, cool light (an approximation of its shader) ----
  const nightTint = (c) => { const o = mk(c.width, c.height), x = o.getContext("2d"); x.drawImage(c, 0, 0); const d = x.getImageData(0, 0, c.width, c.height); for (let i = 0; i < d.data.length; i += 4) { if (!d.data[i + 3]) continue; d.data[i] = d.data[i] * .42; d.data[i + 1] = d.data[i + 1] * .5; d.data[i + 2] = Math.min(255, d.data[i + 2] * .62 + 8); } x.putImageData(d, 0, 0); return o; };
  const PW = 330, PH = 190, night = mk(PW * 3 * S + gap * 4, (PH * S + lab) * 3 + gap * 4), n = night.getContext("2d");
  n.imageSmoothingEnabled = false; n.fillStyle = "#0b0d10"; n.fillRect(0, 0, night.width, night.height);
  drawn.forEach((d, k) => {
    const ox = gap + (k % 3) * (PW * S + gap), oy = gap + Math.floor(k / 3) * (PH * S + lab + gap), patch = mk(PW, PH), p = patch.getContext("2d"), pk = d.pixel / 3;
    p.imageSmoothingEnabled = false; p.fillStyle = "#2c2b1f"; p.fillRect(0, 0, PW, PH);
    const put = (s, cx, by) => p.drawImage(s.c, Math.round(cx - s.w * pk / 2), Math.round(by - s.h * pk), s.w * pk, s.h * pk);
    put(d.trees[2] || d.trees[0], 60, 120); put(d.trees[1] || d.trees[0], 270, 105); if (d.props[0]) put(d.props[0], 190, 140);
    put(d.creatures[2], 120, 170); put(d.creatures[1], 200, 178); put(d.creatures[0], 240, 172); put(d.witch, 285, 182);
    n.drawImage(nightTint(patch), ox, oy + lab, PW * S, PH * S);
    n.fillStyle = "#c8c0e0"; n.font = "15px monospace"; n.textBaseline = "top"; n.fillText(d.label + " (night)", ox, oy + 2);
  });
  return { ladder: sheet.toDataURL("image/png"), night: night.toDataURL("image/png") };
}, { area, artSet });
for (const [k, url] of Object.entries(pngs)) {
  const f = `${outDir}/${area}-${k}.png`;
  writeFileSync(f, Buffer.from(url.split(",")[1], "base64"));
  try { execFileSync("convert", [f, "+dither", "-colors", "256", "-define", "png:compression-level=9", f]); } catch { /* kept as drawn */ }
  console.log("wrote", f);
}
if (b.errors.length) console.error(b.errors);
await b.close();
