// How small the baked tree sets get with fewer colours and normals (Ed, 2026-11-07: "I suspect we can limit the colour palette a
// tiny bit and massively compress this?"): a measurement and a picture, nothing shipped. Reads a bake's folder (tools/prebake/
// bake.mjs: its report.json and files), takes a sample of tree sets across the biomes, and for each tries:
//   - the albedo: exact (its palette as baked, up to 256 colours) or merged to 128 or 64 colours (k-means over the palette, by use);
//   - the normals (RGB a direction; alpha the pixel wind's code, kept exact): exact, hemi-octahedral at 6 and 5 bits an axis (4096
//     and 1024 directions over the hemisphere the normals face), or a k-means palette of 256 or 64 directions;
// each stored a plane at a time and gzipped (as shipped) or brotli'd, and the index planes also PNG-filtered (PNG8-style). Then it
// lights a few trees as the game's sprite shader lights scenery (render/sprites.ts shade, render/lighting.ts nightLightShaded,
// glowPool), with the night's uniforms read from a running game (tools/prebake/lightUniforms.cjs), under moonlight alone and with her glow
// and a campfire beside, and counts the pixels that differ in the final colour from the exact set's, and by how much.
//
//   node tools/prebake/treeQuant.mjs <bake dir> <uniforms.json> <out dir> [sample=30]
//
// Writes <out>/table.md, <out>/results.json and <out>/trees.png (4 trees: exact, then each normal setting with the albedo exact,
// then the recommended one's difference x8, at game size, 3 screen pixels an art pixel; trees-4x.png a window of each crown at 4x that).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { gzipSync, gunzipSync, brotliCompressSync, deflateSync, constants } from "node:zlib";

const [dir, uniFile, out, sampleArg = "30"] = process.argv.slice(2);
if (!dir || !uniFile || !out) throw Error("Usage: node tools/prebake/treeQuant.mjs <bake dir> <uniforms.json> <out dir> [sample]");
mkdirSync(out, { recursive: true });
const U = JSON.parse(readFileSync(uniFile, "utf8"));
const report = JSON.parse(readFileSync(join(dir, "report.json"), "utf8"));

// ---- the baked file (render/artBaked.ts's format) ----
const VIEWS = { Uint8Array, Uint8ClampedArray, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, Float32Array, Float64Array };
function load(name) {
  const b = gunzipSync(readFileSync(join(dir, name + ".bin"))), n = b.readUInt32LE(5), head = JSON.parse(b.subarray(9, 9 + n).toString()), start = Math.ceil((9 + n) / 8) * 8;
  const walk = v => {
    if (v === null || typeof v !== "object") return v;
    if (Array.isArray(v)) return v.map(walk);
    if (v.$u === 1) return undefined;
    if (typeof v.$n === "string") return Number(v.$n);
    if (v.$t) {
      const C = VIEWS[v.$t], at = b.byteOffset + start + v.o; let a = new C(b.buffer.slice(at, at + v.n * C.BYTES_PER_ELEMENT));
      if (v.p === 4) { const q = a.length >> 2, o = new Uint8Array(a.length); for (let i = 0; i < q; i++) { o[i * 4] = a[i]; o[i * 4 + 1] = a[q + i]; o[i * 4 + 2] = a[2 * q + i]; o[i * 4 + 3] = a[3 * q + i]; } a = o; }
      return a;
    }
    const o = {}; for (const [k, x] of Object.entries(v)) o[k] = walk(x); return o;
  };
  return { r: walk(head), raw: b, headText: b.subarray(9, 9 + n) };
}

// ---- sizes ----
const gz = b => gzipSync(b, { level: 9 }).length;
const br = b => brotliCompressSync(b, { params: { [constants.BROTLI_PARAM_QUALITY]: 11, [constants.BROTLI_PARAM_LGWIN]: 24, [constants.BROTLI_PARAM_SIZE_HINT]: b.length } }).length;
const cat = parts => Buffer.concat(parts.map(p => Buffer.from(p.buffer, p.byteOffset, p.byteLength)));
/** An index plane PNG-filtered row by row (each row's best of none, sub, up, paeth by the sum of its bytes), as PNG8 would. */
function pngFilter(plane, w, h) {
  const outB = new Uint8Array(h * (w + 1));
  for (let y = 0; y < h; y++) {
    const row = plane.subarray(y * w, y * w + w), up = y ? plane.subarray((y - 1) * w, y * w) : new Uint8Array(w);
    let best = null, bestSum = Infinity, bestT = 0;
    for (let t = 0; t < 5; t++) {
      if (t === 3) continue;
      const f = new Uint8Array(w);
      for (let x = 0; x < w; x++) {
        const a = x ? row[x - 1] : 0, b = up[x], c = x ? up[x - 1] : 0;
        const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c), pred = t === 0 ? 0 : t === 1 ? a : t === 2 ? b : (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
        f[x] = (row[x] - pred) & 255;
      }
      let s = 0; for (const v of f) s += v < 128 ? v : 256 - v;
      if (s < bestSum) { bestSum = s; best = f; bestT = t; }
    }
    outB[y * (w + 1)] = bestT; outB.set(best, y * (w + 1) + 1);
  }
  return outB;
}
const planar = (rgba, ch) => { const q = rgba.length >> 2, o = new Uint8Array(q * ch.length); ch.forEach((c, k) => { for (let i = 0; i < q; i++) o[k * q + i] = rgba[i * 4 + c]; }); return o; };

// ---- k-means over weighted points (distinct values, by their pixel count) ----
function kmeans(points, weights, dim, k, iters = 12) {
  const n = weights.length;
  if (n <= k) return { centres: points.slice(), assign: Int32Array.from({ length: n }, (_, i) => i) };
  // k-means++ from a deterministic start (the most used point), then the farthest by weighted distance in turn (deterministic)
  const C = new Float64Array(k * dim), d2 = new Float64Array(n).fill(Infinity);
  let first = 0; for (let i = 1; i < n; i++) if (weights[i] > weights[first]) first = i;
  for (let j = 0; j < dim; j++) C[j] = points[first * dim + j];
  for (let c = 1; c < k; c++) {
    let far = 0, farV = -1;
    for (let i = 0; i < n; i++) { let s = 0; for (let j = 0; j < dim; j++) { const d = points[i * dim + j] - C[(c - 1) * dim + j]; s += d * d; } if (s < d2[i]) d2[i] = s; const v = d2[i] * weights[i]; if (v > farV) { farV = v; far = i; } }
    for (let j = 0; j < dim; j++) C[c * dim + j] = points[far * dim + j];
  }
  const assign = new Int32Array(n);
  for (let it = 0; it < iters; it++) {
    for (let i = 0; i < n; i++) { let best = 0, bv = Infinity; for (let c = 0; c < k; c++) { let s = 0; for (let j = 0; j < dim; j++) { const d = points[i * dim + j] - C[c * dim + j]; s += d * d; } if (s < bv) { bv = s; best = c; } } assign[i] = best; }
    const sum = new Float64Array(k * dim), wsum = new Float64Array(k);
    for (let i = 0; i < n; i++) { const c = assign[i]; wsum[c] += weights[i]; for (let j = 0; j < dim; j++) sum[c * dim + j] += points[i * dim + j] * weights[i]; }
    for (let c = 0; c < k; c++) if (wsum[c] > 0) for (let j = 0; j < dim; j++) C[c * dim + j] = sum[c * dim + j] / wsum[c];
  }
  return { centres: C, assign };
}

// ---- normals: decode as the shader does; re-encode a unit direction as the bake's bytes ----
const dirOf = (R, G, B) => { const x = (R - 128) / 127, y = (G - 128) / 127, z = B / 255, l = Math.hypot(x, y, z) || 1; return [x / l, y / l, z / l]; };
const bytesOf = (x, y, z) => [Math.max(0, Math.min(255, Math.round(x * 127 + 128))), Math.max(0, Math.min(255, Math.round(y * 127 + 128))), Math.max(0, Math.min(255, Math.round(z * 255)))];
// hemi-octahedral (z >= 0): (x, y) / (|x| + |y| + z), turned 45 degrees to fill the square; `bits` an axis
function octEnc(x, y, z, bits) {
  const s = Math.abs(x) + Math.abs(y) + Math.max(0, z), px = x / s, py = y / s, u = px + py, v = px - py, m = (1 << bits) - 1;
  return [Math.round((u * 0.5 + 0.5) * m), Math.round((v * 0.5 + 0.5) * m)];
}
function octDec(iu, iv, bits) {
  const m = (1 << bits) - 1, u = (iu / m) * 2 - 1, v = (iv / m) * 2 - 1, px = (u + v) / 2, py = (u - v) / 2, z = 1 - Math.abs(px) - Math.abs(py), l = Math.hypot(px, py, z);
  return [px / l, py / l, z / l];
}

/** The normal plane under setting `mode`: its new RGBA bytes (alpha kept), and the streams it would ship as. */
function quantNormal(N, w, h, mode) {
  const q = N.length >> 2;
  if (mode === "exact") return { plane: N, streams: [planar(N, [0, 1, 2, 3])], index: null };
  const outN = new Uint8Array(N.length), alpha = planar(N, [3]);
  if (mode.startsWith("oct")) {
    const bits = Number(mode.slice(3)), U8 = new Uint8Array(q), V8 = new Uint8Array(q), cache = new Map();
    for (let i = 0; i < q; i++) {
      const o = i * 4; if (!(N[o] | N[o + 1] | N[o + 2] | N[o + 3])) continue;
      const key = (N[o] << 16) | (N[o + 1] << 8) | N[o + 2];
      let e = cache.get(key);
      if (!e) { const [x, y, z] = dirOf(N[o], N[o + 1], N[o + 2]), [iu, iv] = octEnc(x, y, z, bits), d = octDec(iu, iv, bits); e = [iu + 1, iv + 1, ...bytesOf(...d)]; cache.set(key, e); }
      U8[i] = e[0]; V8[i] = e[1]; outN[o] = e[2]; outN[o + 1] = e[3]; outN[o + 2] = e[4]; outN[o + 3] = N[o + 3];
    }
    return { plane: outN, streams: [U8, V8, alpha], index: [U8, V8] };
  }
  const k = Number(mode.slice(2)), count = new Map();
  for (let i = 0; i < q; i++) { const o = i * 4; if (!(N[o] | N[o + 1] | N[o + 2] | N[o + 3])) continue; const key = (N[o] << 16) | (N[o + 1] << 8) | N[o + 2]; count.set(key, (count.get(key) ?? 0) + 1); }
  const keys = [...count.keys()], pts = new Float64Array(keys.length * 3), wts = new Float64Array(keys.length);
  keys.forEach((key, i) => { const d = dirOf(key >> 16, (key >> 8) & 255, key & 255); pts.set(d, i * 3); wts[i] = count.get(key); });
  const { centres, assign } = kmeans(pts, wts, 3, k), pal = [];
  for (let c = 0; c < Math.min(k, keys.length); c++) { const x = centres[c * 3], y = centres[c * 3 + 1], z = centres[c * 3 + 2], l = Math.hypot(x, y, z) || 1; pal.push(bytesOf(x / l, y / l, z / l)); }
  const idxOf = new Map(keys.map((key, i) => [key, assign[i]])), I = new Uint8Array(q);
  for (let i = 0; i < q; i++) {
    const o = i * 4; if (!(N[o] | N[o + 1] | N[o + 2] | N[o + 3])) continue;
    const c = idxOf.get((N[o] << 16) | (N[o + 1] << 8) | N[o + 2]); I[i] = c + 1 > 255 ? 255 : c + 1; // (k 256: 0 the empty pixel, so 255 directions)
    const p = pal[Math.min(c, 254)]; outN[o] = p[0]; outN[o + 1] = p[1]; outN[o + 2] = p[2]; outN[o + 3] = N[o + 3];
  }
  return { plane: outN, streams: [I, Uint8Array.from(pal.flat()), alpha], index: [I] };
}

/** The albedo (indices and palette; or RGBA, pal null, a set with more than 256 colours) with its colours merged to `k` (alpha
 *  255 ones only: the codes, glows and eyes, kept apart). Comes back indexed. */
function quantAlbedo(A, pal, k) {
  if (!k) return { A, pal };
  // (its values: a palette's entries in use, or an RGBA plane's distinct values, each with its count)
  const count = new Map(), valOf = pal ? i => i : null;
  const q = pal ? A.length : A.length >> 2, keyAt = pal ? i => A[i] : i => ((A[i * 4] << 24) | (A[i * 4 + 1] << 16) | (A[i * 4 + 2] << 8) | A[i * 4 + 3]) >>> 0;
  for (let i = 0; i < q; i++) { const key = keyAt(i); count.set(key, (count.get(key) ?? 0) + 1); }
  const rgba = key => (pal ? [...pal.subarray(key * 4, key * 4 + 4)] : [key >>> 24, (key >>> 16) & 255, (key >>> 8) & 255, key & 255]);
  const keys = [...count.keys()], opaque = keys.filter(key => rgba(key)[3] === 255), other = keys.filter(key => rgba(key)[3] !== 255);
  if (keys.length <= k && pal) return { A, pal };
  if (other.length >= k) return { A, pal }; // (not palettisable this way)
  const kk = Math.min(k - other.length, opaque.length), pts = new Float64Array(opaque.length * 3), wts = new Float64Array(opaque.length);
  opaque.forEach((key, n) => { const c = rgba(key); pts[n * 3] = c[0]; pts[n * 3 + 1] = c[1]; pts[n * 3 + 2] = c[2]; wts[n] = count.get(key); });
  const { centres, assign } = kmeans(pts, wts, 3, kk), newPal = new Uint8Array(1024), map = new Map();
  let next = 0;
  for (const key of other) { newPal.set(rgba(key), next * 4); map.set(key, next++); }
  const base = next;
  for (let c = 0; c < kk; c++) { newPal[(base + c) * 4] = Math.round(centres[c * 3]); newPal[(base + c) * 4 + 1] = Math.round(centres[c * 3 + 1]); newPal[(base + c) * 4 + 2] = Math.round(centres[c * 3 + 2]); newPal[(base + c) * 4 + 3] = 255; }
  opaque.forEach((key, n) => map.set(key, base + assign[n]));
  const out = new Uint8Array(q); for (let i = 0; i < q; i++) out[i] = map.get(keyAt(i));
  void valOf;
  return { A: out, pal: newPal };
}
const albedoStreams = a => (a.pal ? [a.A, a.pal] : [planar(a.A, [0, 1, 2, 3])]);
const albedoAt = (A, pal, i) => (pal ? pal.subarray(A[i] * 4, A[i] * 4 + 4) : A.subarray(i * 4, i * 4 + 4));

// ---- lighting, as render/sprites.ts shade lights scenery, and render/lighting.ts nightLightShaded ----
const v3 = (a, b, s = 1) => [a[0] + b[0] * s, a[1] + b[1] * s, a[2] + b[2] * s], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], nrm = a => { const l = Math.hypot(...a) || 1; return a.map(x => x / l); };
const POOL_WARMTH = 0.95, POOL_CAP = 0.55, POOL_LIFT = 0.16, Y = [0.3, 0.55, 0.15];
const right = U.uRight, up = U.uUp, facing = U.uFacing, moonDir = U.uMoonDir;
/** A scene: where the tree stands and what lights it. `glow` her pool (her light centred there), `lights` campfires. */
function lit(albedo, n, P, scene) {
  const [nx, ny, nz] = [(n[0] - 128) / 127, (n[1] - 128) / 127, n[2] / 255], N = nrm(v3(v3(right.map(x => x * nx), up, -ny), facing, nz));
  let l = v3(U.uAmb, U.uMoon, Math.max(0, dot(N, moonDir)));
  l = v3(l, U.uMoonUp, (1 - U.uMoonUp[3]) * Math.max(0, N[1]) + U.uMoonUp[3]);
  l = l.map(x => x * U.uUnlitDim);
  let pool = 0;
  if (scene.glow) {
    const v = [scene.glow[0] - P[0], scene.glow[1] - P[1], scene.glow[2] - P[2]], dg = Math.hypot(v[0], v[2]), gr = U.uGlowR * U.uGlowNear;
    if (dg < gr) { const ndl = Math.max(0, dot(N, nrm([v[0], v[1] + 1e-4, v[2]]))) * 0.35 + 0.65, fall = Math.pow(1 - dg / gr, U.uGlowFalloff); l = v3(l, U.uGlowRgb, Math.min(1, ndl * fall * U.uGlowPower) * U.uGlowDim); pool = Math.pow(1 - dg / gr, U.uGlowFalloff) * Math.min(1, U.uGlowPower) * U.uGlowDim; }
  }
  for (const L of scene.lights ?? []) {
    const lv = [L.pos[0] - P[0], L.pos[1] - P[1], L.pos[2] - P[2]], ld = Math.hypot(...lv);
    if (ld >= L.reach) continue;
    const ndl = Math.max(0, dot(N, lv.map(x => x / ld))) * 0.7 + 0.3, fall = 1 - ld / L.reach;
    l = v3(l, L.col, Math.min(1, ndl * fall * fall * L.w));
  }
  l = l.map(x => x * U.uDim);
  let col = [0, 1, 2].map(c => Math.min(1, (albedo[c] / 255) * l[c] * 1.25));
  if (pool > 0) { // glowPool: her pool in her light's own colour
    const gY = dot(U.uGlowRgb, Y), warm = U.uGlowRgb.map(g => (Math.max(Math.min(dot(col, Y), POOL_CAP), POOL_LIFT * pool) * g) / Math.max(1e-3, gY));
    col = col.map((c, i) => c + (Math.min(1, warm[i]) - c) * POOL_WARMTH * pool);
  }
  return col.map(c => Math.round(Math.min(1, c) * 255));
}
const SCENES = {
  moon: { glow: null, lights: [] },
  // her pool 4 m in front, a campfire 3 m to the left and 5 m in front (the game's campfire light: colour, reach, strength)
  fire: { glow: [0, 1.5, 4], lights: [{ pos: [-3, 1.2, 5], reach: 40, col: [1, 0.5, 0.16], w: 1.9 }] },
};
/** A tree (a big piece's bottom then top frame, sharing its box) lit: its RGBA pixels, w x h. */
function renderTree(px, A, pal, N, piece, scene) {
  const fr = [px.frames[piece.bot], piece.top !== null ? px.frames[piece.top] : null].filter(Boolean), w = fr[0].w, h = fr[0].h, img = new Uint8Array(w * h * 4);
  for (const f of fr) {
    const x0 = Math.round(f.uv[0] * px.width), y0 = Math.round(f.uv[1] * px.height);
    for (let y = 0; y < f.h; y++) for (let x = 0; x < f.w; x++) {
      const i = (y0 + y) * px.width + x0 + x, a = albedoAt(A, pal, i);
      if (a[3] < 128) continue;
      const P = [(x - f.w / 2) * U.mpp, (f.h - y) * U.mpp, 0], c = lit(a, N.subarray(i * 4, i * 4 + 3), P, scene), o = (y * w + x) * 4;
      img[o] = c[0]; img[o + 1] = c[1]; img[o + 2] = c[2]; img[o + 3] = 255;
    }
  }
  return { img, w, h };
}

// ---- the sample: round the biomes, each biome's sets at evenly spread sizes ----
const trees = report.sets.filter(s => s.cat === "trees"), biomeOf = s => (s.key.split("|").slice(6).join("|") || "temperate").split("|")[0];
const byBiome = new Map(); for (const s of trees) { const b = biomeOf(s); if (!byBiome.has(b)) byBiome.set(b, []); byBiome.get(b).push(s); }
for (const v of byBiome.values()) v.sort((a, b) => a.shipped - b.shipped);
const want = Number(sampleArg), lists = [...byBiome.values()], per = Math.ceil(want / lists.length), sample = [];
for (const v of lists) for (let j = 0; j < per; j++) sample.push(v[Math.floor(((j + 0.5) / per) * v.length)]);
sample.splice(want);

const NMODES = ["exact", "oct6", "oct5", "km256", "km64"], AMODES = [0, 128, 64];
const rows = [], diffs = {};
const t0 = performance.now();
const picks = [];
const PICTURE = process.env.PICTURE === "1"; // (the picture alone: only the four sets it shows, no sizes or counts)
for (const [si, s] of sample.entries()) {
  if (PICTURE && si % Math.ceil(sample.length / 4)) { rows.push(null); continue; }
  const { r, headText } = load(s.name), px = r.px, W = px.width, H = px.height;
  const rest = [headText, ...(r.floor ? [planar(r.floor.albedo, [0, 1, 2, 3]), planar(r.floor.normal, [0, 1, 2, 3])] : [])];
  const row = { name: s.name, biome: biomeOf(s), shipped: s.shipped, w: W, h: H, normalValues: new Set(new Uint32Array(px.normal.buffer)).size, albedoColours: px.albedoPal ? new Set(px.albedo).size : new Set(new Uint32Array(px.albedo.buffer)).size, albedoIndexed: !!px.albedoPal, sizes: {} };
  const qn = Object.fromEntries(NMODES.map(m => [m, quantNormal(px.normal, W, H, m)]));
  const qa = Object.fromEntries(AMODES.map(k => [k, quantAlbedo(px.albedo, px.albedoPal, k)]));
  if (!PICTURE) for (const k of AMODES) for (const m of NMODES) {
    const a = qa[k], n = qn[m], buf = cat([...albedoStreams(a), ...n.streams, ...rest]);
    const png = cat([...(a.pal ? [pngFilter(a.A, W, H), a.pal] : albedoStreams(a)), ...(n.index ? [...n.index.map(p => pngFilter(p, W, H)), ...n.streams.slice(n.index.length)] : n.streams), ...rest]);
    row.sizes[`a${k || "x"}|${m}`] = { gz: gz(buf), br: br(buf), png: deflateSync(png, { level: 9 }).length };
  }
  // pixel differences of the set's largest lit trees (both scenes), each setting against exact
  const biggest = [...r.layout.big].sort((a, b) => px.frames[b.bot].w * px.frames[b.bot].h - px.frames[a.bot].w * px.frames[a.bot].h).slice(0, 3); // (its three largest trees)
  if (!PICTURE) for (const piece of biggest) for (const [sn, sc] of Object.entries(SCENES)) {
    const ref = renderTree(px, px.albedo, px.albedoPal, px.normal, piece, sc);
    for (const k of AMODES) for (const m of NMODES) {
      if (!k && m === "exact") continue;
      const got = renderTree(px, qa[k].A, qa[k].pal, qn[m].plane, piece, sc), d = diffs[`a${k || "x"}|${m}|${sn}`] ??= { px: 0, differ: 0, max: 0, over2: 0, over8: 0, sum: 0 };
      for (let i = 0; i < ref.img.length; i += 4) {
        if (!ref.img[i + 3]) continue;
        d.px++;
        const e = Math.max(Math.abs(ref.img[i] - got.img[i]), Math.abs(ref.img[i + 1] - got.img[i + 1]), Math.abs(ref.img[i + 2] - got.img[i + 2]));
        if (e) d.differ++; if (e > 2) d.over2++; if (e > 8) d.over8++; d.max = Math.max(d.max, e); d.sum += e;
      }
    }
  }
  if (picks.length < 4 && rows.length % Math.ceil(sample.length / 4) === 0) { const piece = [...r.layout.big].filter(p => p.top !== null).sort((a, b) => px.frames[b.bot].w * px.frames[b.bot].h - px.frames[a.bot].w * px.frames[a.bot].h)[0]; if (piece) picks.push({ s, r, qa, qn, piece }); }
  rows.push(row);
  process.stdout.write(`${rows.length}/${sample.length} ${((performance.now() - t0) / 1000).toFixed(0)} s\r`);
}
console.log();

if (PICTURE) rows.length = 0;
// ---- projection: the sample's ratio to what ships now, by bytes, applied to every tree set and the first visits' shares ----
const base = rows.reduce((n, r) => n + r.shipped, 0), MB = x => (x / 1048576).toFixed(1);
const sum = (key, f) => rows.reduce((n, r) => n + r.sizes[key][f], 0);
const ALL_TREES = trees.reduce((n, s) => n + s.shipped, 0), share = isl => trees.filter(s => s.first.includes(isl)).reduce((n, s) => n + s.shipped, 0);
const homeAll = trees.filter(s => s.islands.includes("home")).reduce((n, s) => n + s.shipped, 0);
const P1 = report.sets.filter(s => s.cat === "plain" && s.first.includes("home")).map(s => s.key.match(/creature:([^|]+)/)[1]), phase1 = trees.filter(s => s.first.some(i => P1.includes(i))).reduce((n, s) => n + s.shipped, 0);
const notTrees = report.sets.filter(s => s.cat !== "trees").reduce((n, s) => n + s.shipped, 0);
const others = isl => report.sets.filter(s => s.cat !== "trees" && (s.first.includes("*") || s.first.includes(isl) || /^recorded (disco|stumps|treehouse|witch|housePiece|workshopPic|partyWitch)$/.test(s.cat))).reduce((n, s) => n + s.shipped, 0);
const lines = [`Sample: ${rows.length} tree sets across ${byBiome.size} biomes, ${MB(base)} MB as shipped now (gzip); all ${trees.length} tree sets ${MB(ALL_TREES)} MB.`, "",
  "| albedo | normals | gzip / set (KB) | brotli / set (KB) | PNG-filtered deflate / set (KB) | gzip ratio | all 1300 trees MB (gzip) | brotli MB | home 1st | fox 1st | bear 1st | moon: px differing | max diff | fire: px differing | max diff |",
  "|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|"];
const results = { sample: rows, diffs, settings: {} };
for (const k of AMODES) for (const m of NMODES) {
  const key = `a${k || "x"}|${m}`, g = sum(key, "gz"), b = sum(key, "br"), p = sum(key, "png"), ratio = g / base, bratio = b / base;
  const dm = diffs[`${key}|moon`], df = diffs[`${key}|fire`], pct = d => (d ? `${((100 * d.differ) / d.px).toFixed(1)}% (>2: ${((100 * d.over2) / d.px).toFixed(2)}%)` : "0"), mx = d => (d ? d.max : 0);
  const firstMB = isl => MB(share(isl) * ratio + others(isl));
  results.settings[key] = { gzPerSet: g / rows.length, brPerSet: b / rows.length, pngPerSet: p / rows.length, ratio, bratio, allTrees: ALL_TREES * ratio, allTreesBr: ALL_TREES * bratio, home: share("home") * ratio + others("home"), fox: share("fox") * ratio + others("fox"), bear: share("bear") * ratio + others("bear"),
    options: { "1": notTrees, "2": notTrees + share("home") * ratio, "3": notTrees + homeAll * ratio, "4": notTrees + (share("home") + phase1) * ratio, everything: notTrees + ALL_TREES * ratio } };
  lines.push(`| ${k || "exact"} | ${m} | ${(g / rows.length / 1024).toFixed(0)} | ${(b / rows.length / 1024).toFixed(0)} | ${(p / rows.length / 1024).toFixed(0)} | ${ratio.toFixed(2)} | ${MB(ALL_TREES * ratio)} | ${MB(ALL_TREES * bratio)} | ${firstMB("home")} | ${firstMB("fox")} | ${firstMB("bear")} | ${pct(dm)} | ${mx(dm)} | ${pct(df)} | ${mx(df)} |`);
}
if (!PICTURE) {
  writeFileSync(join(out, "table.md"), lines.join("\n") + "\n");
  writeFileSync(join(out, "results.json"), JSON.stringify(results, (k, v) => (v instanceof Set ? v.size : v), 1));
  console.log(lines.join("\n"));
}

// ---- the picture: 4 trees, lit by her pool and the campfire; columns exact, oct6, oct5, km256, km64 (albedo exact), then the
// recommended setting's difference x8; at game size (3 screen pixels an art pixel), and a window of each crown at 4x that ----
const REC = process.env.REC ?? "x|oct6";
function png(w, h, rgba) {
  const crcT = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = b => { let c = 0xffffffff; for (const x of b) c = crcT[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]), c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
  const raw = Buffer.alloc(h * (w * 4 + 1)); for (let y = 0; y < h; y++) { raw[y * (w * 4 + 1)] = 0; Buffer.from(rgba.buffer, rgba.byteOffset + y * w * 4, w * 4).copy(raw, y * (w * 4 + 1) + 1); }
  const ih = Buffer.alloc(13); ih.writeUInt32BE(w, 0); ih.writeUInt32BE(h, 4); ih[8] = 8; ih[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ih), chunk("IDAT", deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
}
const [recA, recN] = REC.split("|"), recK = recA === "x" ? 0 : Number(recA);
const cols = [["exact", 0, "exact"], ...NMODES.slice(1).map(m => [m, 0, m]), ...(recK ? [[`a${recK} ${recN}`, recK, recN]] : [])];
const cells = picks.map(({ r, qa, qn, piece }) => {
  const px = r.px, ref = renderTree(px, px.albedo, px.albedoPal, px.normal, piece, SCENES.fire);
  const imgs = cols.map(([, k, m]) => renderTree(px, qa[k].A, qa[k].pal, qn[m].plane, piece, SCENES.fire));
  const rec = renderTree(px, qa[recK].A, qa[recK].pal, qn[recN].plane, piece, SCENES.fire), diff = new Uint8Array(ref.img.length);
  for (let i = 0; i < diff.length; i += 4) { if (!ref.img[i + 3]) continue; const e = Math.max(...[0, 1, 2].map(c => Math.abs(ref.img[i + c] - rec.img[i + c]))); diff[i] = diff[i + 1] = diff[i + 2] = Math.min(255, e * 8); diff[i + 3] = 255; }
  return [...imgs, { img: diff, w: ref.w, h: ref.h }];
});
/** A cell cut to a window (`size` art pixels square) round `at`, for the close-up. */
const crop = (c, size, at) => { const x0 = Math.max(0, Math.min(c.w - size, Math.round(at.x - size / 2))), y0 = Math.max(0, Math.min(c.h - size, Math.round(at.y - size / 2))), w = Math.min(size, c.w - x0), h = Math.min(size, c.h - y0), img = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) img.set(c.img.subarray(((y0 + y) * c.w + x0) * 4, ((y0 + y) * c.w + x0 + w) * 4), y * w * 4); return { img, w, h }; };
function sheet(scale, cells) {
  const gap = 4 * scale, cw = Math.max(...cells.flat().map(c => c.w)) * scale, ch = Math.max(...cells.flat().map(c => c.h)) * scale, nc = cells[0].length;
  const W = nc * (cw + gap) + gap, H = cells.length * (ch + gap) + gap, img = new Uint8Array(W * H * 4);
  for (let i = 0; i < img.length; i += 4) { img[i] = 11; img[i + 1] = 10; img[i + 2] = 22; img[i + 3] = 255; } // (the scene's background, 0x0b0a16)
  cells.forEach((row, ry) => row.forEach((c, cx) => {
    const ox = gap + cx * (cw + gap) + Math.floor((cw - c.w * scale) / 2), oy = gap + ry * (ch + gap) + (ch - c.h * scale);
    for (let y = 0; y < c.h * scale; y++) for (let x = 0; x < c.w * scale; x++) { const s = (Math.floor(y / scale) * c.w + Math.floor(x / scale)) * 4; if (!c.img[s + 3]) continue; const d = ((oy + y) * W + ox + x) * 4; img[d] = c.img[s]; img[d + 1] = c.img[s + 1]; img[d + 2] = c.img[s + 2]; }
  }));
  return png(W, H, img);
}
writeFileSync(join(out, "trees.png"), sheet(3, cells));
// (4x game size: a 56-pixel window of each tree, round the middle of its drawn pixels' upper half: its crown)
const centre = c => { let sx = 0, sy = 0, n = 0; for (let y = 0; y < c.h; y++) for (let x = 0; x < c.w; x++) if (c.img[(y * c.w + x) * 4 + 3]) { sx += x; sy += y; n++; } const cy = n ? sy / n : c.h / 2; let tx = 0, ty = 0, m = 0; for (let y = 0; y < Math.min(c.h, cy); y++) for (let x = 0; x < c.w; x++) if (c.img[(y * c.w + x) * 4 + 3]) { tx += x; ty += y; m++; } return m ? { x: tx / m, y: ty / m } : { x: c.w / 2, y: c.h / 3 }; };
writeFileSync(join(out, "trees-4x.png"), sheet(12, cells.map(row => { const at = centre(row[0]); return row.map(c => crop(c, 56, at)); })));
console.log(`columns: ${cols.map(c => c[0]).join(", ")}, ${REC} difference x8; rows: ${picks.map(p => biomeOf(p.s)).join(", ")}`);
