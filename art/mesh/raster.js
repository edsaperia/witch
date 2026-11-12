// A mesh creature's shape (art/mesh/shape.js) drawn as pixel sprites at the game's view, in plain JavaScript so the art workers
// can do it (no WebGL there): its walk, a frame a step through the cycle, turned towards us and away (art/model3d.js's YAW and
// PITCH). Each frame is drawn `ss` times too big, a nearest-face buffer of flat triangles, and brought down a block an art pixel
// (a pixel is solid when `cover` of its block is), so thin legs don't flicker; all the frames' colours go to one small palette; a
// dark line goes round it and wherever a nearer part stands in front of a further one. What it hands the game: unlit colour (a
// glowing pixel's alpha 254, as a hand-drawn frame marks it: art/overrides/README.md) and the camera's normals, for the game's
// own light. The same picture as tools/creature-bake/ makes in a browser, which is what Ed approved the models by.
import { pose } from "./shape.js";

export const MESH_YAW = { towards: 0.6, away: -0.6 }, MESH_PITCH = 0.52; // (art/model3d.js's YAW and PITCH)

/** k colours for a set of [r, g, b] samples: k-means from an evenly spread start, the same every run. */
function palette(samples, k) {
  if (samples.length <= k) return samples.map(s => [...s]);
  const sorted = [...samples].sort((a, b) => (a[0] * 2 + a[1] * 4 + a[2]) - (b[0] * 2 + b[1] * 4 + b[2]));
  let cs = Array.from({ length: k }, (_, i) => [...sorted[Math.floor((i + 0.5) * sorted.length / k)]]);
  for (let pass = 0; pass < 12; pass++) {
    const sum = cs.map(() => [0, 0, 0, 0]);
    for (const s of samples) { let b = 0, bd = Infinity; for (let i = 0; i < k; i++) { const c = cs[i], d = (s[0] - c[0]) ** 2 + (s[1] - c[1]) ** 2 + (s[2] - c[2]) ** 2; if (d < bd) { bd = d; b = i; } } const t = sum[b]; t[0] += s[0]; t[1] += s[1]; t[2] += s[2]; t[3]++; }
    cs = cs.map((c, i) => (sum[i][3] ? [sum[i][0] / sum[i][3], sum[i][1] / sum[i][3], sum[i][2] / sum[i][3]] : c));
  }
  return cs;
}
/** A tuft's number from its place in the grid of them: the same wherever it's asked. */
const cell = (x, y, z) => { let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(z | 0, 2147483647); h = Math.imul(h ^ (h >>> 13), 1274126177); return (h ^ (h >>> 16)) >>> 0; };
const nearest = (cs, r, g, b) => { let best = 0, bd = Infinity; for (let i = 0; i < cs.length; i++) { const c = cs[i], d = (r - c[0]) ** 2 + (g - c[1]) ** 2 + (b - c[2]) ** 2; if (d < bd) { bd = d; best = i; } } return best; };

/** Draws `sh`. o: height (art pixels its first frame stands, turned towards us: its whole silhouette) or body (the same, of its
 *  body proper alone: no tail, ears, tufts or armour, as the game sizes its animals) or ppu (art pixels a metre, outright: an
 *  animal lying down drawn at the scale it walks at), texture (its coat's: { size (art pixels across a tuft), long (how many
 *  times longer along its body), tilt (how far a tuft tips the light, 0..1), tone (how much lighter or darker one is) }), frames (in its walk's
 *  cycle), colours (the palette's size), ss, cover. Returns { w, h, ppu (art pixels a metre), step (how far it walks between
 *  frames, a share of w), palette, towards, away }: each a list of frames { albedo, normal, flipped (the normals for drawing it
 *  mirrored), eyes (1 where a pixel is an eye, or undefined if none show), head ([x, y], where its head's joint is) }, every
 *  frame w by h, its feet's lowest pixel on the bottom row. */
export function bakeMesh(sh, o = {}) {
  const { height = 137, frames = 8, ss = 4, colours = 12, cover = 0.4, texture = null } = o;
  const pos0 = Float32Array.from([...sh.lit.pos, ...sh.glow.pos]), col = Uint8Array.from([...sh.lit.col, ...sh.glow.col]), bone = Uint16Array.from([...sh.lit.bone, ...sh.glow.bone]), core = Uint8Array.from([...sh.lit.core, ...sh.glow.core]);
  const nv = bone.length, nt = nv / 3, lit = sh.lit.bone.length / 3, eye = Uint8Array.from([...sh.lit.tag, ...sh.glow.tag], t => (t === "eye" ? 1 : 0)), skin = Uint8Array.from([...sh.lit.skin, ...sh.glow.skin]), headBone = sh.bones.findIndex(b => b.name === "head");
  // every frame's corners, in the model's own space
  // (o.stand: one more frame after the walk's, standing still on all its feet: what the view shows when it stops)
  const world = Array.from({ length: frames + (o.stand ? 1 : 0) }, (_, i) => { const { R, T } = pose(sh, i < frames ? i / frames : null), out = new Float32Array(nv * 3);
    for (let v = 0; v < nv; v++) { const b = bone[v], a = sh.bones[b].at, x = pos0[v * 3] - a[0], y = pos0[v * 3 + 1] - a[1], z = pos0[v * 3 + 2] - a[2];
      out[v * 3] = R[b * 9] * x + R[b * 9 + 1] * y + R[b * 9 + 2] * z + T[b * 3]; out[v * 3 + 1] = R[b * 9 + 3] * x + R[b * 9 + 4] * y + R[b * 9 + 5] * z + T[b * 3 + 1]; out[v * 3 + 2] = R[b * 9 + 6] * x + R[b * 9 + 7] * y + R[b * 9 + 8] * z + T[b * 3 + 2]; }
    return { out, head: headBone < 0 ? null : [T[headBone * 3], T[headBone * 3 + 1], T[headBone * 3 + 2]] }; });
  // its box over the whole walk: one frame and one scale for every sprite, so nothing breathes or jumps
  const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
  for (const w of world) for (let i = 0; i < nv * 3; i++) { const v = w.out[i], j = i % 3; if (v < lo[j]) lo[j] = v; if (v > hi[j]) hi[j] = v; }
  const centre = lo.map((v, j) => (v + hi[j]) / 2), radius = Math.hypot(hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]) / 2, cp = Math.cos(MESH_PITCH), sp = Math.sin(MESH_PITCH);
  // (the camera's view of a point: right, up and towards us, from the box's middle; its head along +z is turned to +x, then by the heading)
  const turn = yaw => { const th = Math.PI / 2 - yaw, c = Math.cos(th), s = Math.sin(th); return (x, y, z) => { const dx = x - centre[0], dy = y - centre[1], dz = z - centre[2], rx = dx * c + dz * s, rz = -dx * s + dz * c; return [rx, dy * cp - rz * sp, dy * sp + rz * cp]; }; };
  // the scale: its first frame, towards us, stands `height` art pixels
  let top = -Infinity, bottom = Infinity, bodyTop = -Infinity, bodyBottom = Infinity; { const view = turn(MESH_YAW.towards), w = world[0].out; for (let v = 0; v < nv; v++) { const u = view(w[v * 3], w[v * 3 + 1], w[v * 3 + 2])[1]; if (u > top) top = u; if (u < bottom) bottom = u; if (core[v]) { if (u > bodyTop) bodyTop = u; if (u < bodyBottom) bodyBottom = u; } } }
  const ppu = o.ppu ?? (o.body ? o.body / (bodyTop - bodyBottom) : height / (top - bottom)), S = Math.ceil(radius * 2 * ppu) + 6, big = S * ss, k = ppu * ss, far = radius * 6 - 0.01;
  // (the part of that S by S picture the animal ever reaches, over the whole walk and both headings: only that much is drawn)
  let ux0 = S, ux1 = -1, uy0 = S, uy1 = -1;
  for (const facing of ["towards", "away"]) { const th = Math.PI / 2 - MESH_YAW[facing], c = Math.cos(th), sn = Math.sin(th);
    for (const { out: w } of world) for (let v = 0; v < nv; v++) { const dx = w[v * 3] - centre[0], dy = w[v * 3 + 1] - centre[1], dz = w[v * 3 + 2] - centre[2], rx = dx * c + dz * sn, rz = -dx * sn + dz * c, x = S / 2 + rx * ppu, y = S / 2 - (dy * cp - rz * sp) * ppu;
      if (x < ux0) ux0 = x; if (x > ux1) ux1 = x; if (y < uy0) uy0 = y; if (y > uy1) uy1 = y; } }
  // (a flyer, sh.hover: the ground under its middle is part of its picture, so the air it hangs in is kept below it)
  const groundY = sh.hover ? S / 2 + centre[1] * cp * ppu + Math.abs(Math.hypot(centre[0], centre[2]) * sp * ppu) : -1; if (sh.hover && groundY > uy1) uy1 = groundY;
  ux0 = Math.max(0, Math.floor(ux0) - 1); uy0 = Math.max(0, Math.floor(uy0) - 1); ux1 = Math.min(S - 1, Math.ceil(ux1) + 1); uy1 = Math.min(S - 1, Math.ceil(uy1) + 1);
  const W = ux1 - ux0 + 1, H = uy1 - uy0 + 1, bw = W * ss, bh = H * ss;
  const zb = new Float32Array(bw * bh), id = new Int32Array(bw * bh), cr = new Uint8Array(bw * bh), cg = new Uint8Array(bw * bh), cb = new Uint8Array(bw * bh), sx = new Float32Array(nv), sy = new Float32Array(nv), sz = new Float32Array(nv), tn = new Float32Array(nt * 3);

  const raw = [], samples = [];
  for (const facing of ["towards", "away"]) {
    const view = turn(MESH_YAW[facing]);
    for (let i = 0; i < world.length; i++) {
      const w = world[i].out; zb.fill(-Infinity); id.fill(-1);
      { const th = Math.PI / 2 - MESH_YAW[facing], c = Math.cos(th), sn = Math.sin(th); for (let v = 0; v < nv; v++) { const dx = w[v * 3] - centre[0], dy = w[v * 3 + 1] - centre[1], dz = w[v * 3 + 2] - centre[2], rx = dx * c + dz * sn, rz = -dx * sn + dz * c; sx[v] = big / 2 + rx * k - ux0 * ss; sy[v] = big / 2 - (dy * cp - rz * sp) * k - uy0 * ss; sz[v] = dy * sp + rz * cp; } }
      for (let t = 0; t < nt; t++) {
        const a = t * 3, b = a + 1, c = a + 2, x0 = sx[a], y0 = sy[a], x1 = sx[b], y1 = sy[b], x2 = sx[c], y2 = sy[c], area = (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0);
        // (its normal to the camera: right, up, towards us; a face seen from behind is turned to face us, as both its sides are drawn)
        const ux = (x1 - x0) / k, uy = -(y1 - y0) / k, uz = sz[b] - sz[a], vx = (x2 - x0) / k, vy = -(y2 - y0) / k, vz = sz[c] - sz[a]; let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx; const nl = (Math.hypot(nx, ny, nz) || 1) * (nz < 0 ? -1 : 1);
        tn[a] = nx / nl; tn[a + 1] = ny / nl; tn[a + 2] = nz / nl;
        if (Math.abs(area) < 1e-9) continue;
        const minX = Math.max(0, Math.floor(Math.min(x0, x1, x2))), maxX = Math.min(bw - 1, Math.ceil(Math.max(x0, x1, x2))), minY = Math.max(0, Math.floor(Math.min(y0, y1, y2))), maxY = Math.min(bh - 1, Math.ceil(Math.max(y0, y1, y2)));
        // (each corner's weight is a plane over the picture: stepped along a row, not worked out afresh a sample)
        const A0 = (y1 - y2) / area, B0 = (x2 - x1) / area, C0 = (x1 * y2 - x2 * y1) / area, A1 = (y2 - y0) / area, B1 = (x0 - x2) / area, C1 = (x2 * y0 - x0 * y2) / area, za = sz[a], zab = sz[b] - za, zac = sz[c] - za;
        const r0 = col[a * 3], g0 = col[a * 3 + 1], b0 = col[a * 3 + 2], flat = r0 === col[b * 3] && r0 === col[c * 3] && g0 === col[b * 3 + 1] && g0 === col[c * 3 + 1] && b0 === col[b * 3 + 2] && b0 === col[c * 3 + 2];
        for (let y = minY; y <= maxY; y++) {
          let w0 = A0 * (minX + 0.5) + B0 * (y + 0.5) + C0, w1 = A1 * (minX + 0.5) + B1 * (y + 0.5) + C1;
          for (let x = minX, j = y * bw + minX; x <= maxX; x++, j++, w0 += A0, w1 += A1) {
            const w2 = 1 - w0 - w1;
            if (w0 < 0 || w1 < 0 || w2 < 0) continue;
            const z = za + w1 * zab + w2 * zac;
            if (z <= zb[j]) continue;
            zb[j] = z; id[j] = t;
            if (flat) { cr[j] = r0; cg[j] = g0; cb[j] = b0; } else { cr[j] = w0 * r0 + w1 * col[b * 3] + w2 * col[c * 3] + 0.5; cg[j] = w0 * g0 + w1 * col[b * 3 + 1] + w2 * col[c * 3 + 1] + 0.5; cb[j] = w0 * b0 + w1 * col[b * 3 + 2] + w2 * col[c * 3 + 2] + 0.5; }
          }
        }
      }
      // brought down to art pixels: colour (the mean of the covered samples), normal, depth, solid or not, glowing or not
      const rgb = new Float32Array(W * H * 3), nrm = new Float32Array(W * H * 3), dep = new Float32Array(W * H), on = new Uint8Array(W * H), lamp = new Uint8Array(W * H), eyes = new Uint8Array(W * H), tone = texture ? new Float32Array(W * H) : null;
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        let n = 0, r = 0, g = 0, b = 0, nx = 0, ny = 0, nz = 0, d = 0, glows = 0, eyed = 0, at = -1;
        for (let v = 0; v < ss; v++) for (let u = 0; u < ss; u++) {
          const q = (y * ss + v) * bw + x * ss + u, t = id[q];
          if (t < 0) continue;
          n++; if (at < 0 || (v === ss >> 1 && u === ss >> 1)) at = q; if (t >= lit) glows++; if (eye[t]) eyed++; r += cr[q]; g += cg[q]; b += cb[q]; nx += tn[t * 3]; ny += tn[t * 3 + 1]; nz += tn[t * 3 + 2];
          d += 1 - ((1 - (radius * 3 - zb[q] - 0.01) / far) * 255 + 0.5 | 0) / 255; // (how far from the camera, 0 to 1 over its range, in the 256 steps the browser bake's depth picture has)
        }
        if (n < cover * ss * ss) continue;
        // its coat's texture (o.texture): the pixel's place on the animal as it stands at rest decides its tuft, so the pattern rides
        // the body through the walk; a tuft tips the light its own way and is a shade lighter or darker
        const j = y * W + x, face = id[at];
        if (texture && skin[face] && face < lit) { const a = face * 3, px = (at % bw) + 0.5, py = Math.floor(at / bw) + 0.5, x0 = sx[a], y0 = sy[a], x1 = sx[a + 1], y1 = sy[a + 1], x2 = sx[a + 2], y2 = sy[a + 2], area = (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0) || 1e-9;
          const w0 = ((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py)) / area, w1 = ((x2 - px) * (y0 - py) - (x0 - px) * (y2 - py)) / area, w2 = 1 - w0 - w1, cs = texture.size / ppu;
          const X = w0 * pos0[a * 3] + w1 * pos0[a * 3 + 3] + w2 * pos0[a * 3 + 6], Y = w0 * pos0[a * 3 + 1] + w1 * pos0[a * 3 + 4] + w2 * pos0[a * 3 + 7], Z = w0 * pos0[a * 3 + 2] + w1 * pos0[a * 3 + 5] + w2 * pos0[a * 3 + 8];
          const cx = Math.floor(X / cs), cy = Math.floor(Y / cs), cz = Math.floor(Z / (cs * texture.long) + (cell(cx, cy, 7) % 97) / 97), h = cell(cx, cy, cz);
          nx += ((h & 255) / 127.5 - 1) * texture.tilt * n; ny += (((h >> 8) & 255) / 127.5 - 1) * texture.tilt * 0.7 * n;
          const k = (h >> 16) & 255; tone[j] = k < 64 ? -texture.tone : k > 208 ? texture.tone * 0.7 : 0; }
        const l = Math.hypot(nx, ny, nz) || 1;
        on[j] = 1; lamp[j] = glows * 2 > n ? 1 : 0; eyes[j] = eyed * 2 > n ? 1 : 0; rgb[j * 3] = r / n; rgb[j * 3 + 1] = g / n; rgb[j * 3 + 2] = b / n; nrm[j * 3] = nx / l; nrm[j * 3 + 1] = ny / l; nrm[j * 3 + 2] = nz / l; dep[j] = d / n;
        if (lamp[j] || (x + ux0 + (y + uy0) * 7 + i * 3) % 5 === 0) samples.push([rgb[j * 3], rgb[j * 3 + 1], rgb[j * 3 + 2]]); // (every glowing pixel: small, and its colour must reach the palette)
      }
      const h = world[i].head && view(...world[i].head);
      raw.push({ facing, rgb, nrm, dep, on, lamp, eyes, tone, head: h ? [S / 2 + h[0] * ppu - ux0, S / 2 - h[1] * ppu - uy0] : null });
    }
  }

  // one palette for them all; one size for every frame, and each heading stood on its own ground: its walk's lowest foot on the
  // bottom row. (One crop for both headings left whichever stands higher in the picture hanging over empty rows, a fifth of its
  // height on some: Ed's playtest, 2026-11-12, "animals appear to float above the ground (I guess bottom point not set correctly)".)
  const pal = palette(samples, colours), lum = c => c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11, dark = pal.reduce((a, c) => (lum(c) < lum(a) ? c : a), pal[0]).map(v => v * 0.38);
  let x0 = W, x1 = -1; const tops = { towards: H, away: H }, feet = { towards: -1, away: -1 };
  for (const f of raw) for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (f.on[y * W + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < tops[f.facing]) tops[f.facing] = y; if (y > feet[f.facing]) feet[f.facing] = y; }
  if (sh.hover) for (const facing of ["towards", "away"]) feet[facing] = Math.max(feet[facing], Math.min(H - 1, Math.round(groundY - uy0)));
  const w = x1 - x0 + 1, h = Math.max(feet.towards - tops.towards, feet.away - tops.away) + 1, out = { towards: [], away: [] };
  for (const f of raw) {
    const albedo = new Uint8ClampedArray(w * h * 4), normal = new Uint8ClampedArray(w * h * 4), flipped = new Uint8ClampedArray(w * h * 4), eyes = new Uint8Array(w * h); let anyEye = false;
    const y0 = feet[f.facing] - h + 1; // (may be above the picture's top for the heading that stands shorter: nothing is there)
    const at = (x, y) => (x < 0 || y < 0 || x >= w || y >= h || y + y0 < 0 ? 0 : f.on[(y + y0) * W + x + x0]), nearer = (x, y, d) => at(x, y) && f.dep[(y + y0) * W + x + x0] < d - 0.02;
    for (let y = Math.max(0, -y0); y < h; y++) for (let x = 0; x < w; x++) {
      const j = (y + y0) * W + x + x0, q = (y * w + x) * 4;
      if (!f.on[j]) continue;
      const c = pal[nearest(pal, f.rgb[j * 3], f.rgb[j * 3 + 1], f.rgb[j * 3 + 2])], nx = f.nrm[j * 3], ny = f.nrm[j * 3 + 1], nz = f.nrm[j * 3 + 2];
      // a dark line round it and wherever a nearer part stands in front of it
      const edge = !at(x - 1, y) || !at(x + 1, y) || !at(x, y - 1) || !at(x, y + 1), d = f.dep[j], behind = !edge && (nearer(x + 1, y, d) || nearer(x - 1, y, d) || nearer(x, y + 1, d) || nearer(x, y - 1, d));
      const k = f.tone ? 1 + f.tone[j] : 1, s = f.lamp[j] ? c : edge ? dark : behind ? c.map(v => v * 0.5) : k === 1 ? c : c.map(v => v * k);
      albedo[q] = s[0]; albedo[q + 1] = s[1]; albedo[q + 2] = s[2]; albedo[q + 3] = f.lamp[j] ? 254 : 255;
      // (the game's normals: x right, y down, z towards us: art/core.js `bake`)
      normal[q] = nx * 127 + 128; normal[q + 1] = -ny * 127 + 128; normal[q + 2] = nz * 255; normal[q + 3] = 255;
      flipped[q] = -nx * 127 + 128; flipped[q + 1] = -ny * 127 + 128; flipped[q + 2] = nz * 255; flipped[q + 3] = 255;
      if (f.eyes[j]) { eyes[y * w + x] = 1; anyEye = true; }
    }
    out[f.facing].push({ albedo, normal, flipped, eyes: anyEye ? eyes : undefined, head: f.head ? [f.head[0] - x0, f.head[1] - y0] : undefined });
  }
  return { w, h, ppu, bodyHeight: (bodyTop - bodyBottom) * ppu, height: (top - bottom) * ppu, step: (stride(sh) / frames) * ppu / w, palette: pal.map(c => c.map(Math.round)), towards: out.towards, away: out.away };
}

/** How far a creature goes in one cycle of its walk, metres: how fast a planted paw slides back under its body through its
 *  stance, kept up for the whole cycle, so the ground passes at that pace and its feet don't slide (a legless one's is its gait's
 *  own `stride`). The paw is the joint below the leg's last named bone (its ankle, on the ground), not that bone's own joint (its
 *  hock, half way up the leg, which moves half as far: the stride the first meshes walked by, 2026-11-12). */
export function stride(sh) {
  const leg = sh.gait?.legs?.[0]; if (!leg || sh.still) return sh.gait?.stride ?? 0.3;
  const last = sh.bones.findIndex(b => b.name === leg.bones[2]), paw = sh.bones.findIndex(b => b.parent === last), foot = paw < 0 ? last : paw, d = sh.gait.duty ?? 0.6, z = c => pose(sh, (((c - leg.phase) % 1) + 1) % 1).T[foot * 3 + 2];
  return Math.abs(z(0.2 * d) - z(0.8 * d)) / (0.6 * d);
}

/** How long its body is, metres: its body proper (no tail, ears or ornament), nose to rump, standing. A stride is judged by it. */
export function bodyLength(sh) {
  let lo = Infinity, hi = -Infinity;
  for (const part of [sh.lit, sh.glow]) for (let v = 0; v < part.core.length; v++) if (part.core[v]) { const z = part.pos[v * 3 + 2]; if (z < lo) lo = z; if (z > hi) hi = z; }
  return hi > lo ? hi - lo : 0;
}

/** A walk's step without drawing it: how far it goes between frames as a share of its sprite's width (what bakeMesh's `step`
 *  comes to, within a pixel or two of width): its corners' reach across the picture over the whole walk, both headings. */
export function meshStep(sh, frames = 8) {
  const all = [...sh.lit.pos, ...sh.glow.pos], bone = [...sh.lit.bone, ...sh.glow.bone]; let lo = Infinity, hi = -Infinity;
  for (let i = 0; i <= frames; i++) { const { R, T } = pose(sh, i < frames ? i / frames : null); // (and standing still: the frame after its walk's)
    for (let v = 0; v < bone.length; v++) { const b = bone[v], a = sh.bones[b].at, x = all[v * 3] - a[0], y = all[v * 3 + 1] - a[1], z = all[v * 3 + 2] - a[2], wx = R[b * 9] * x + R[b * 9 + 1] * y + R[b * 9 + 2] * z + T[b * 3], wz = R[b * 9 + 6] * x + R[b * 9 + 7] * y + R[b * 9 + 8] * z + T[b * 3 + 2];
      for (const yaw of [MESH_YAW.towards, MESH_YAW.away]) { const th = Math.PI / 2 - yaw, rx = wx * Math.cos(th) + wz * Math.sin(th); if (rx < lo) lo = rx; if (rx > hi) hi = rx; } } }
  return stride(sh) / frames / (hi - lo);
}

/** The scale a shape is drawn at to stand `height` art pixels (its whole silhouette, standing still, turned towards us), in art
 *  pixels a metre, for drawing the same animal in any pose at the same size (Ed, 2026-11-12: "keep the sizes"). */
export function meshPpu(sh, height) {
  const { R, T } = pose(sh, null), all = [...sh.lit.pos, ...sh.glow.pos], bone = [...sh.lit.bone, ...sh.glow.bone], th = Math.PI / 2 - MESH_YAW.towards, c = Math.cos(th), s = Math.sin(th), cp = Math.cos(MESH_PITCH), sp = Math.sin(MESH_PITCH); let lo = Infinity, hi = -Infinity;
  for (let v = 0; v < bone.length; v++) { const b = bone[v], a = sh.bones[b].at, x = all[v * 3] - a[0], y = all[v * 3 + 1] - a[1], z = all[v * 3 + 2] - a[2];
    const wx = R[b * 9] * x + R[b * 9 + 1] * y + R[b * 9 + 2] * z + T[b * 3], wy = R[b * 9 + 3] * x + R[b * 9 + 4] * y + R[b * 9 + 5] * z + T[b * 3 + 1], wz = R[b * 9 + 6] * x + R[b * 9 + 7] * y + R[b * 9 + 8] * z + T[b * 3 + 2], u = wy * cp - (-wx * s + wz * c) * sp;
    if (u < lo) lo = u; if (u > hi) hi = u; }
  return height / (hi - lo);
}
