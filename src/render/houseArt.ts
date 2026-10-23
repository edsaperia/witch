// The treehouse as the Ent's own (the v3 mock; Ed, 2026-10-23: "The layout doesn't have to be all right-angles; the corridors are
// tree branches, the rooms are probably round. Why don't you try making some art"): each room a round plank platform on the tree, a
// rail round it, its log rim showing below; each corridor a bark-covered branch, mossed, leaves at its sides, a rope rail along it.
// The floors are painted once into one pixel-art texture, an art pixel a texel (`paintFloor`), seen top-down on the house's plan;
// what stands up off them (the rims, the rails and posts, the lanterns) is quads, as the box rooms' walls (`standing`).
import type { HouseConfig, Rect } from "../rules/houseRooms";

type RGB = [number, number, number];
export interface FloorArt { canvas: HTMLCanvasElement; x0: number; z0: number; w: number; h: number }

const hex = (s: string): RGB => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)];
const BOARD = ["#5c3f27", "#553923", "#62452b", "#4f3520"].map(hex), SEAM = hex("#2b1b10"), RIM = ["#3a2616", "#43301c", "#2f1f12"].map(hex);
const BARK = ["#3f2c1d", "#4a3524", "#35251a", "#54402b"].map(hex), FURROW = hex("#24180f"), MOSS = ["#3e5a2d", "#4e6e36", "#5f8240"].map(hex);
const LEAF = ["#26402a", "#335533", "#43703d", "#5a8c48"].map(hex), RUG = ["#5b2a4a", "#6e3559", "#c99a4b"].map(hex), OUT = hex("#170f0a");

/** A small hash of integers to 0..1 (the art's own noise: seeded by place, the same every load). */
const hash = (a: number, b: number, c = 0) => { let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
/** Smooth value noise at (x, z) metres, `s` metres a cell. */
function noise(x: number, z: number, s: number, k = 0): number {
  const fx = x / s, fz = z / s, ix = Math.floor(fx), iz = Math.floor(fz), u = fx - ix, v = fz - iz, a = hash(ix, iz, k), b = hash(ix + 1, iz, k), c = hash(ix, iz + 1, k), d = hash(ix + 1, iz + 1, k);
  const su = u * u * (3 - 2 * u), sv = v * v * (3 - 2 * v);
  return a + (b - a) * su + (c - a) * sv + (a - b - c + d) * su * sv;
}

/** Along and across a branch at (x, z): how far along its line (m), how far off it (signed, m), or null off it. */
function onBranch(r: Rect, x: number, z: number): { s: number; t: number } | null {
  const pts = r.pts!, h = (r.w ?? 3) / 2;
  let best: { s: number; t: number; d: number } | null = null, run = 0;
  for (let i = 1; i < pts.length; i++) {
    const [ax, az] = pts[i - 1], [bx, bz] = pts[i], dx = bx - ax, dz = bz - az, L = Math.hypot(dx, dz), u = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / Math.max(1e-9, L * L)));
    const px = ax + dx * u, pz = az + dz * u, d = Math.hypot(x - px, z - pz), t = ((x - px) * -dz + (z - pz) * dx) / Math.max(1e-9, L);
    if (!best || d < best.d) best = { s: run + u * L, t, d };
    run += L;
  }
  return best && best.d <= h + 1.2 ? { s: best.s, t: best.t } : null;
}

/** The floors painted: every room's round platform and every branch, an art pixel (`mpp` metres) a texel, top-down on the plan. */
export interface Terrace { r: number; bz: number; br: number }
export function paintFloor(H: HouseConfig, mpp: number, T?: Terrace): FloorArt {
  const all: Rect[] = [...H.rooms, ...H.corridors, ...(T ? [{ x0: -T.r, x1: T.r, z0: -T.r, z1: T.bz + T.br }] : [])], pad = 2;
  const x0 = Math.min(...all.map(r => r.x0)) - pad, x1 = Math.max(...all.map(r => r.x1)) + pad, z0 = Math.min(...all.map(r => r.z0)) - pad, z1 = Math.max(...all.map(r => r.z1)) + pad;
  const W = Math.ceil((x1 - x0) / mpp), Hh = Math.ceil((z1 - z0) / mpp), canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = Hh;
  const g = canvas.getContext("2d")!, img = g.createImageData(W, Hh), px = img.data;
  const pods = H.rooms.filter(r => r.r).map(r => ({ r, cx: (r.x0 + r.x1) / 2, cz: (r.z0 + r.z1) / 2, hub: ["atrium", "parlour", "boudoir"].includes((r as { id?: string }).id ?? "") }));
  const set = (i: number, c: RGB, k = 1) => { px[i] = Math.min(255, c[0] * k); px[i + 1] = Math.min(255, c[1] * k); px[i + 2] = Math.min(255, c[2] * k); px[i + 3] = 255; };
  for (let j = 0; j < Hh; j++) for (let i = 0; i < W; i++) {
    const x = x0 + (i + 0.5) * mpp, z = z0 + (j + 0.5) * mpp, o = (j * W + i) * 4;
    // the Terrace (Ed, 2026-10-23: "redraw the terrace at the same time"): the hub's round and the balcony's lobe as one platform,
    // wide boards across it, a carved ring in its middle, its log rim
    if (T) {
      const dh = Math.hypot(x, z), db = Math.hypot(x, z - T.bz), inside = dh <= T.r || db <= T.br;
      if (inside || dh <= T.r + 0.25 || db <= T.br + 0.25) {
        if (!inside) { set(o, OUT); continue; }
        const edge = Math.min(T.r - dh, T.br - db) < 0 ? Math.max(T.r - dh, T.br - db) : Math.max(T.r - dh, T.br - db);
        if (edge < 0.6) { set(o, RIM[Math.floor(hash(Math.floor(x * 4), Math.floor(z * 4), 7) * 3)], edge < 0.14 ? 0.75 : 1); continue; }
        const ring = Math.abs(dh - 2.4);
        if (ring < 0.16) { set(o, SEAM); continue; }
        if (ring < 0.32) { set(o, BOARD[2], 1.25); continue; }
        const b = Math.floor(z / 0.6), off = hash(b, 13) * 4, run = Math.floor((x + off) / 3.4);
        const seam = z / 0.6 - b < mpp / 0.6 * 1.1 || ((x + off) / 3.4) % 1 < mpp / 3.4 * 1.1;
        set(o, seam ? SEAM : BOARD[Math.floor(hash(b, run, 2) * 4)], (dh < 2.4 ? 1.12 : 1) * (0.95 + 0.1 * noise(x, z, 0.8)));
        continue;
      }
    }
    // a room's platform: boards (or, at a hub, rings of boards), its log rim, a rug in the bedroom
    const pod = pods.find(p => Math.hypot(x - p.cx, z - p.cz) <= p.r.r! + 0.25);
    if (pod) {
      const R = pod.r.r!, dx = x - pod.cx, dz = z - pod.cz, d = Math.hypot(dx, dz);
      if (d > R) { set(o, OUT); continue; }
      if (d > R - 0.55) { set(o, RIM[Math.floor(hash(Math.floor(Math.atan2(dz, dx) * R * 3), 7) * 3)], d > R - 0.12 ? 0.75 : 1); continue; }
      if (pod.hub) {
        const ring = Math.floor((R - 0.55 - d) / 0.5), a = Math.atan2(dz, dx), seg = Math.floor(((a + Math.PI) * (d + 0.1)) / 1.6 + hash(ring, 3) * 9);
        const seam = (R - 0.55 - d) % 0.5 < mpp * 1.1 || ((a + Math.PI) * (d + 0.1) / 1.6 + hash(ring, 3) * 9) % 1 < mpp * 1.1 / 1.6;
        set(o, seam ? SEAM : BOARD[Math.floor(hash(ring, seg) * 4)], 1 - 0.18 * (d / R) ** 2);
      } else {
        const b = Math.floor(z / 0.45), off = hash(b, 11) * 3, run = Math.floor((x + off) / 2.6);
        const seam = z / 0.45 - b < mpp / 0.45 * 1.1 || ((x + off) / 2.6) % 1 < mpp / 2.6 * 1.1;
        const knot = hash(Math.floor(x / mpp), Math.floor(z / mpp), 5) > 0.997;
        set(o, seam || knot ? SEAM : BOARD[Math.floor(hash(b, run) * 4)], (1 - 0.2 * (d / R) ** 3) * (0.96 + 0.08 * noise(x, z, 0.7)));
      }
      if ((pod.r as { id?: string }).id === "bedroom" && Math.hypot(dx + 1.5, dz - 1.5) < 3.2) { const q = Math.hypot(dx + 1.5, dz - 1.5); set(o, q > 2.9 ? RUG[2] : RUG[(Math.floor(q / 0.6) + (Math.floor((Math.atan2(dz - 1.5, dx + 1.5) + 4) * 4) % 2)) % 2]); }
      continue;
    }
    // a branch: bark in furrows along it, rounder (lighter) along its crown, mossed towards its sides, leaves past its edge
    let br: { s: number; t: number; r: Rect } | null = null;
    for (const r of H.corridors) { if (!r.pts || x < r.x0 - 1.5 || x > r.x1 + 1.5 || z < r.z0 - 1.5 || z > r.z1 + 1.5) continue; const b = onBranch(r, x, z); if (b && (!br || Math.abs(b.t) < Math.abs(br.t))) br = { ...b, r }; }
    if (br) {
      const h = (br.r.w ?? 3) / 2, at = Math.abs(br.t);
      if (at <= h) {
        const furrow = Math.abs(((br.t * 2.6 + noise(br.s, br.t, 1.3, 2) * 1.6) % 1 + 1) % 1 - 0.5) < 0.09 && hash(Math.floor(br.s / 0.6), Math.floor(br.t * 3)) > 0.25;
        const shade = 1.12 - 0.5 * (at / h) ** 2, moss = noise(br.s, br.t, 1.6, 4) + (at / h) * 0.35 > 0.88;
        set(o, furrow ? FURROW : moss ? MOSS[Math.floor(hash(i, j, 3) * 3)] : BARK[Math.floor(noise(br.s * 3, br.t * 2, 0.5, 1) * 4)], shade);
        continue;
      }
      if (at <= h + 0.12) { set(o, OUT); continue; }
      const leafy = noise(x, z, 0.9, 6) > 0.62 && at < h + 1.0 * noise(x, z, 2.2, 8) + 0.2;
      if (leafy) { set(o, LEAF[Math.floor(Math.min(3.99, noise(x, z, 0.35, 9) * 4))]); continue; }
    }
    px[o + 3] = 0;
  }
  g.putImageData(img, 0, 0);
  return { canvas, x0, z0, w: x1 - x0, h: z1 - z0 };
}

/** A quad of what stands up off the floors: corners in metres on the plan (h up off the floor), its colour (0..1). */
export interface Upright { p: [number, number, number][]; rgb: RGB; layer: number }
const c01 = (s: string): RGB => hex(s).map(v => v / 255) as RGB;
const WALL_A = c01("#4b3321"), WALL_B = c01("#432d1c"), WINDOW = c01("#e8b45a");
const RIM_SIDE = c01("#2c1d11"), RIM_DARK = c01("#20150c"), POST = c01("#4a3220"), RAIL = c01("#5e4128"), ROPE = c01("#8a7552"), LAMP = c01("#ffc864");

/** The uprights: each platform's log rim below its edge (the side towards the camera), its rail and posts all round but where a
 *  branch comes in, each branch's bark side below it and a rope rail along both edges on posts, a lantern here and there. Layer 1
 *  behind the floor's middle (drawn before her), 3 in front of it. */
export function standing(H: HouseConfig, open: (x: number, z: number) => boolean, T?: Terrace): Upright[] {
  const q: Upright[] = [];
  if (T) {
    // the Terrace's rim below its front, its rail round its back half (the front open air: she steps off it there), and the decks'
    // desk along the balcony's front edge, lit
    const n = 64;
    for (const [cx, cz, R, back] of [[0, 0, T.r, true], [0, T.bz, T.br, false]] as [number, number, number, boolean][]) for (let k = 0; k < n; k++) {
      const a0 = (k / n) * Math.PI * 2, a1 = ((k + 1) / n) * Math.PI * 2, am = (a0 + a1) / 2, nz = Math.sin(am), mx = cx + Math.cos(am) * R, mz = cz + Math.sin(am) * R;
      const p0: [number, number] = [cx + Math.cos(a0) * R, cz + Math.sin(a0) * R], p1: [number, number] = [cx + Math.cos(a1) * R, cz + Math.sin(a1) * R];
      const under = back ? Math.hypot(mx, mz - T.bz) < T.br : Math.hypot(mx, mz) < T.r;
      if (under) continue;
      if (nz > 0) q.push({ p: [[p0[0], p0[1], 0], [p1[0], p1[1], 0], [p1[0], p1[1], -1.1], [p0[0], p0[1], -1.1]], rgb: k % 3 ? RIM_SIDE : RIM_DARK, layer: 3 });
      if (!back || nz > -0.15 || open(cx + Math.cos(am) * (R + 0.6), cz + Math.sin(am) * (R + 0.6))) continue;
      const rr = R - 0.18, r0: [number, number] = [cx + Math.cos(a0) * rr, cz + Math.sin(a0) * rr], r1: [number, number] = [cx + Math.cos(a1) * rr, cz + Math.sin(a1) * rr];
      q.push({ p: [[r0[0], r0[1], 0.95], [r1[0], r1[1], 0.95], [r1[0], r1[1], 1.05], [r0[0], r0[1], 1.05]], rgb: RAIL, layer: 1 });
      if (k % 2 === 0) q.push({ p: [[r0[0] - 0.07, r0[1], 0], [r0[0] + 0.07, r0[1], 0], [r0[0] + 0.07, r0[1], 1.05], [r0[0] - 0.07, r0[1], 1.05]], rgb: POST, layer: 1 });
      if (k % 8 === 4) q.push({ p: [[r0[0] - 0.13, r0[1], 1.1], [r0[0] + 0.13, r0[1], 1.1], [r0[0] + 0.13, r0[1], 1.38], [r0[0] - 0.13, r0[1], 1.38]], rgb: LAMP, layer: 1 });
    }
    const dz = T.bz + T.br - 1.1, DESK = c01("#2a1c2e"), TOP = c01("#3d2b45"), LIT = [c01("#58f0c8"), c01("#ff5fb4"), c01("#ffd060")];
    q.push({ p: [[-2.3, dz + 0.45, 0], [2.3, dz + 0.45, 0], [2.3, dz + 0.45, 1.0], [-2.3, dz + 0.45, 1.0]], rgb: DESK, layer: 3 });
    q.push({ p: [[-2.3, dz - 0.45, 1.0], [2.3, dz - 0.45, 1.0], [2.3, dz + 0.45, 1.0], [-2.3, dz + 0.45, 1.0]], rgb: TOP, layer: 3 });
    for (let i = 0; i < 9; i++) { const x = -2 + i * 0.5; q.push({ p: [[x, dz + 0.46, 0.55], [x + 0.22, dz + 0.46, 0.55], [x + 0.22, dz + 0.46, 0.7], [x, dz + 0.46, 0.7]], rgb: LIT[i % 3], layer: 3 }); }
    for (const x of [-1.2, 1.2]) q.push({ p: [[x - 0.45, dz - 0.3, 1.01], [x + 0.45, dz - 0.3, 1.01], [x + 0.45, dz + 0.3, 1.01], [x - 0.45, dz + 0.3, 1.01]], rgb: c01("#151018"), layer: 3 });
  }
  for (const r of H.rooms) {
    if (!r.r) continue;
    const cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2, R = r.r, n = Math.max(24, Math.round(R * 7));
    for (let k = 0; k < n; k++) {
      const a0 = (k / n) * Math.PI * 2, a1 = ((k + 1) / n) * Math.PI * 2, am = (a0 + a1) / 2, nz = Math.sin(am);
      const p0: [number, number] = [cx + Math.cos(a0) * R, cz + Math.sin(a0) * R], p1: [number, number] = [cx + Math.cos(a1) * R, cz + Math.sin(a1) * R];
      const gap = open(cx + Math.cos(am) * (R + 0.6), cz + Math.sin(am) * (R + 0.6));
      if (nz > 0) q.push({ p: [[p0[0], p0[1], 0], [p1[0], p1[1], 0], [p1[0], p1[1], -0.85], [p0[0], p0[1], -0.85]], rgb: k % 3 ? RIM_SIDE : RIM_DARK, layer: 3 });
      if (gap) continue;
      const rr = R - 0.18, r0: [number, number] = [cx + Math.cos(a0) * rr, cz + Math.sin(a0) * rr], r1: [number, number] = [cx + Math.cos(a1) * rr, cz + Math.sin(a1) * rr], L = nz > 0 ? 3 : 1;
      const top = nz > 0 ? 0.55 : 1.05; // (the near rail kept low, so the room's floor shows over it)
      if (nz <= 0.12) {
        // the far half walled (Ed, 2026-10-23: "Can the rooms have walls and roofs"): upright boards, a lit window now and then
        const WH = 2.7, win = k % 7 === 3;
        q.push({ p: [[r0[0], r0[1], 0], [r1[0], r1[1], 0], [r1[0], r1[1], WH], [r0[0], r0[1], WH]], rgb: k % 2 ? WALL_A : WALL_B, layer: 1 });
        if (win) q.push({ p: [[r0[0], r0[1], 1.1], [r1[0], r1[1], 1.1], [r1[0], r1[1], 2.0], [r0[0], r0[1], 2.0]], rgb: WINDOW, layer: 1 });
        q.push({ p: [[r0[0], r0[1], WH - 0.15], [r1[0], r1[1], WH - 0.15], [r1[0], r1[1], WH], [r0[0], r0[1], WH]], rgb: RAIL, layer: 1 });
        continue;
      }
      q.push({ p: [[r0[0], r0[1], top - 0.1], [r1[0], r1[1], top - 0.1], [r1[0], r1[1], top], [r0[0], r0[1], top]], rgb: RAIL, layer: L });
      if (k % 2 === 0) { q.push({ p: [[r0[0] - 0.07, r0[1], 0], [r0[0] + 0.07, r0[1], 0], [r0[0] + 0.07, r0[1], top], [r0[0] - 0.07, r0[1], top]], rgb: POST, layer: L }); }
      if (k % 9 === 4 && nz <= 0) q.push({ p: [[r0[0] - 0.13, r0[1], top + 0.05], [r0[0] + 0.13, r0[1], top + 0.05], [r0[0] + 0.13, r0[1], top + 0.33], [r0[0] - 0.13, r0[1], top + 0.33]], rgb: LAMP, layer: L });
    }
  }
  for (const r of H.corridors) {
    if (!r.pts) continue;
    const h = (r.w ?? 3) / 2, pts = r.pts;
    for (let i = 1; i < pts.length; i++) {
      const [ax, az] = pts[i - 1], [bx, bz] = pts[i], dx = bx - ax, dz = bz - az, L = Math.hypot(dx, dz) || 1, nx = -dz / L, nzz = dx / L;
      for (const side of [1, -1]) {
        const ox = nx * h * side, oz = nzz * h * side, faceCam = oz > 0.05;
        const s0: [number, number] = [ax + ox, az + oz], s1: [number, number] = [bx + ox, bz + oz];
        const inRoom = (x: number, z: number) => H.rooms.some(q2 => q2.r && Math.hypot(x - (q2.x0 + q2.x1) / 2, z - (q2.z0 + q2.z1) / 2) < q2.r - 0.1) || open(x, z) && Math.hypot(x, z) < 8;
        if (inRoom(s0[0], s0[1]) || inRoom(s1[0], s1[1])) continue;
        if (faceCam) q.push({ p: [[s0[0], s0[1], 0], [s1[0], s1[1], 0], [s1[0], s1[1], -0.75], [s0[0], s0[1], -0.75]], rgb: i % 2 ? RIM_SIDE : RIM_DARK, layer: 3 });
        const lay = faceCam ? 3 : 1;
        q.push({ p: [[s0[0], s0[1], 0.78], [s1[0], s1[1], 0.78], [s1[0], s1[1], 0.85], [s0[0], s0[1], 0.85]], rgb: ROPE, layer: lay });
        q.push({ p: [[s0[0] - 0.06, s0[1], 0], [s0[0] + 0.06, s0[1], 0], [s0[0] + 0.06, s0[1], 0.9], [s0[0] - 0.06, s0[1], 0.9]], rgb: POST, layer: lay });
      }
    }
  }
  return q;
}

/** A room's roof: a dome of leaves over it (Ed, 2026-10-23: "these are like tree canopies that get hidden when you're near"),
 *  painted top-down, `R` metres across its middle, an art pixel a texel: clumps of leaves in four greens, lit from above, darker
 *  to their edges, a ragged rim. */
export function paintRoof(R: number, mpp: number, seed: number): HTMLCanvasElement {
  const n = Math.ceil((2 * R) / mpp), c = document.createElement("canvas"); c.width = c.height = n;
  const g = c.getContext("2d")!, img = g.createImageData(n, n), px = img.data;
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const x = (i + 0.5) * mpp - R, z = (j + 0.5) * mpp - R, d = Math.hypot(x, z) / R, o = (j * n + i) * 4;
    const rag = 0.86 + 0.14 * noise(x + seed * 7, z, 0.9, seed);
    if (d > rag) { px[o + 3] = 0; continue; }
    const clump = noise(x + seed, z, 1.1, seed + 3), fine = noise(x, z + seed, 0.3, seed + 5), lit = 0.5 + 0.5 * (-(x + z) / (R * 1.4)) + (clump - 0.5) * 0.6;
    const k = Math.max(0, Math.min(3, Math.floor((lit * 0.7 + fine * 0.5 - d * 0.35) * 4)));
    const gap = fine < 0.12 && clump < 0.4;
    const col = gap ? LEAF[0] : LEAF[k], sh = 0.75 + 0.35 * (1 - d * d);
    px[o] = col[0] * sh; px[o + 1] = col[1] * sh; px[o + 2] = col[2] * sh; px[o + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  return c;
}
