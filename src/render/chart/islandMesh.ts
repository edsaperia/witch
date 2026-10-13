// An island's meshes for the sea chart from its ground grid (app/chartOutlines.worker.ts IslandGround), as plain typed arrays
// with no three.js in them, so the worker that makes the ground makes these too, keeps them with it, and the page only wraps
// them (the map coastlines job, 2026-10-13; Ed: "we do want to ideally have the coastlines for when we go to the map screen,
// but they don't change throughout the entire campaign (apart from home island)": each island was 20 to 70 ms of meshes on the
// page's thread as it arrived, 64 of them). The arrays are exactly what render/chart/seaChart.ts built in place before, down to
// the vertex normals as three.js's computeVertexNormals makes them (the same sums in the same order, rounded to a float at the
// same steps: islandMesh.test.ts holds them to it), so the chart draws the same.

/** The land's heights (m) on the chart: exaggerated, so the hills read from high up. */
export const RELIEF = 5;
/** How deep (m) the shallows fade out to. */
export const SHALLOWS = 240;
/** How deep (m) a lake's shallows reach by its shore. */
export const LAKE_SHALLOWS = 6;
/** How far (m) in from a lake's shore its special look reaches its middle. */
export const LAKE_RIM = 40;

/** An island's ground as the worker samples it (app/chartOutlines.worker.ts IslandGround): what the meshes need of it. */
export interface GroundLike { x0: number; z0: number; step: number; cols: number; rows: number; h: ArrayLike<number>; /** 0 land, 1 sea, 2 lake */ water?: ArrayLike<number>; /** a lake's water level (m, as h) */ level?: ArrayLike<number>; /** each sample's lake look (LOOK_IDS) */ looks?: ArrayLike<number> }

/** An island's meshes: its ground (positions, three.js's normals, its triangles), its heights as a tile for its shadows, the
 *  shallows on the sea round it, and its lakes (null without any). */
export interface IslandMesh {
  pos: Float32Array; normal: Float32Array; idx: Uint16Array | Uint32Array;
  /** its highest drawn point (units) */ top: number;
  /** each sample's height over the water as a byte of the highest, and that highest */ tile: Uint8Array; tmax: number;
  /** the shallows: every sample flat on the sea, its depth (0 land or a lake, to 1 past the shallows), its triangles */ flat: Float32Array; depth: Float32Array; wi: Uint16Array | Uint32Array;
  /** the lakes: positions at their levels, depths (or how far in, for the special looks), looks, triangles */
  lakes: { lp: Float32Array; ld: Float32Array; lk: Float32Array; li: Uint16Array | Uint32Array } | null;
}

/** Triangle indices as three.js's setIndex would keep them: 16-bit unless any reaches 65535. */
function indices(list: number[]): Uint16Array | Uint32Array {
  for (let i = list.length - 1; i >= 0; i--) if (list[i] >= 65535) return new Uint32Array(list);
  return new Uint16Array(list);
}

/** three.js's computeVertexNormals for an indexed geometry, step for step: each triangle's (c - b) x (a - b) added to its three
 *  vertices' normals (each sum stored as a float between triangles, as the attribute holds it), then each normalised by 1 / its
 *  length (or left as 0, 0, 0). */
export function vertexNormals(pos: Float32Array, idx: ArrayLike<number>): Float32Array {
  const n = new Float32Array(pos.length);
  for (let i = 0; i < idx.length; i += 3) {
    const vA = idx[i], vB = idx[i + 1], vC = idx[i + 2], a3 = vA * 3, b3 = vB * 3, c3 = vC * 3;
    const pAx = pos[a3], pAy = pos[a3 + 1], pAz = pos[a3 + 2], pBx = pos[b3], pBy = pos[b3 + 1], pBz = pos[b3 + 2], pCx = pos[c3], pCy = pos[c3 + 1], pCz = pos[c3 + 2];
    const cbx = pCx - pBx, cby = pCy - pBy, cbz = pCz - pBz, abx = pAx - pBx, aby = pAy - pBy, abz = pAz - pBz;
    const x = cby * abz - cbz * aby, y = cbz * abx - cbx * abz, z = cbx * aby - cby * abx;
    n[a3] = n[a3] + x; n[a3 + 1] = n[a3 + 1] + y; n[a3 + 2] = n[a3 + 2] + z;
    n[b3] = n[b3] + x; n[b3 + 1] = n[b3 + 1] + y; n[b3 + 2] = n[b3 + 2] + z;
    n[c3] = n[c3] + x; n[c3 + 1] = n[c3 + 1] + y; n[c3 + 2] = n[c3 + 2] + z;
  }
  for (let i = 0; i < n.length; i += 3) {
    const x = n[i], y = n[i + 1], z = n[i + 2], s = 1 / (Math.sqrt(x * x + y * y + z * z) || 1);
    n[i] = x * s; n[i + 1] = y * s; n[i + 2] = z * s;
  }
  return n;
}

/** An island's meshes from its ground, `k` units a metre (about its own middle). */
export function buildIslandMesh(G: GroundLike, k: number): IslandMesh {
  const { cols, rows, step } = G, N = cols * rows, pos = new Float32Array(N * 3), idx: number[] = [];
  let hi = 0;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const i = r * cols + c, hm = G.h[i], y = hm > 0 ? 0.04 + hm * k * RELIEF : -0.12; // (the shore shelving gently into the water)
    pos[i * 3] = (G.x0 + c * step) * k; pos[i * 3 + 1] = y; pos[i * 3 + 2] = (G.z0 + r * step) * k;
    hi = Math.max(hi, y);
  }
  for (let r = 0; r < rows - 1; r++) for (let c = 0; c < cols - 1; c++) {
    const a = r * cols + c, b = a + 1, e = a + cols, f = e + 1;
    if (G.h[a] <= 0 && G.h[b] <= 0 && G.h[e] <= 0 && G.h[f] <= 0) continue; // (open water: nothing to draw)
    idx.push(a, e, b, b, e, f);
  }
  const index = indices(idx), normal = vertexNormals(pos, index);
  // its own heights as a tile, for its shadows close in: each sample's height over the water, a byte of its highest
  let tmax = 0.1; for (let i = 0; i < N; i++) tmax = Math.max(tmax, pos[i * 3 + 1]);
  const tile = new Uint8Array(N); for (let i = 0; i < N; i++) tile[i] = Math.round(Math.max(0, Math.min(1, pos[i * 3 + 1] / tmax)) * 255);
  // the shallows: the water over every sample within reach of the shore, flat on the sea, by its depth
  const flat = new Float32Array(N * 3), depth = new Float32Array(N), wi: number[] = [];
  for (let i = 0; i < N; i++) { flat[i * 3] = pos[i * 3]; flat[i * 3 + 1] = 0.03; flat[i * 3 + 2] = pos[i * 3 + 2]; depth[i] = G.h[i] > 0 || G.water?.[i] === 2 ? 0 : Math.min(1, -G.h[i] / SHALLOWS); }
  for (let r = 0; r < rows - 1; r++) for (let c = 0; c < cols - 1; c++) {
    const a = r * cols + c, b = a + 1, e = a + cols, f = e + 1;
    if (depth[a] >= 1 && depth[b] >= 1 && depth[e] >= 1 && depth[f] >= 1) continue;
    if (G.h[a] > 0 && G.h[b] > 0 && G.h[e] > 0 && G.h[f] > 0) continue; // (under the land: nothing to show)
    wi.push(a, e, b, b, e, f);
  }
  let lakes: IslandMesh["lakes"] = null;
  // the lakes: still water at each one's level, in its hollow, pale where it's shallow by its shore
  if (G.water && G.level) {
    const W = G.water, LV = G.level, lp = new Float32Array(N * 3), ld = new Float32Array(N), li: number[] = [];
    for (let i = 0; i < N; i++) {
      const lv = W[i] === 2 ? LV[i] : 0;
      lp[i * 3] = pos[i * 3]; lp[i * 3 + 1] = 0.06 + lv * k * RELIEF; lp[i * 3 + 2] = pos[i * 3 + 2];
      ld[i] = W[i] === 2 ? Math.min(1, (LV[i] - G.h[i]) / LAKE_SHALLOWS) : 0;
    }
    // (a lake's edge samples take the level of the lake next to them, so its water meets its shore)
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const i = r * cols + c; if (W[i] === 2) continue;
      for (const j of [i - 1, i + 1, i - cols, i + cols]) if (j >= 0 && j < N && W[j] === 2) { lp[i * 3 + 1] = 0.06 + LV[j] * k * RELIEF; break; }
    }
    const lk = new Float32Array(N);
    if (G.looks) for (let i = 0; i < N; i++) lk[i] = G.looks[i];
    { // (the special lakes: by how far in from its shore, not how deep, so a shallow one still has a middle; a rust pool's
      // rings by how far in it is of the furthest in its pool reaches, so every pool runs rim to throat)
      const far = new Float32Array(N), D = 1.4142;
      for (let i = 0; i < N; i++) far[i] = W[i] === 2 ? 1e9 : 0;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { // (a chamfer distance, in samples, to the nearest shore)
        const i = r * cols + c; if (!far[i]) continue; let v = far[i];
        if (c > 0) v = Math.min(v, far[i - 1] + 1); if (r > 0) { v = Math.min(v, far[i - cols] + 1); if (c > 0) v = Math.min(v, far[i - cols - 1] + D); if (c < cols - 1) v = Math.min(v, far[i - cols + 1] + D); }
        far[i] = v;
      }
      for (let r = rows - 1; r >= 0; r--) for (let c = cols - 1; c >= 0; c--) {
        const i = r * cols + c; if (!far[i]) continue; let v = far[i];
        if (c < cols - 1) v = Math.min(v, far[i + 1] + 1); if (r < rows - 1) { v = Math.min(v, far[i + cols] + 1); if (c < cols - 1) v = Math.min(v, far[i + cols + 1] + D); if (c > 0) v = Math.min(v, far[i + cols - 1] + D); }
        far[i] = v;
      }
      const part = new Int32Array(N).fill(-1), most: number[] = [], stack: number[] = [];
      for (let i0 = 0; i0 < N; i0++) {
        if (lk[i0] !== 7 || W[i0] !== 2 || part[i0] >= 0) continue;
        const id = most.length; let m = 0; most.push(0); stack.push(i0); part[i0] = id;
        while (stack.length) {
          const i = stack.pop()!, c = i % cols; m = Math.max(m, far[i]);
          for (const j of [c > 0 ? i - 1 : -1, c < cols - 1 ? i + 1 : -1, i - cols, i + cols]) if (j >= 0 && j < N && W[j] === 2 && part[j] < 0) { part[j] = id; stack.push(j); }
        }
        most[id] = m;
      }
      for (let i = 0; i < N; i++) {
        if (W[i] !== 2 || !lk[i]) continue;
        ld[i] = part[i] >= 0 ? Math.min(1, (far[i] - 0.5) / Math.max(1, most[part[i]] - 0.5)) : Math.min(1, ((far[i] - 0.5) * step) / LAKE_RIM);
      }
    }
    for (let r = 0; r < rows - 1; r++) for (let c = 0; c < cols - 1; c++) {
      const a = r * cols + c, b = a + 1, e = a + cols, f = e + 1;
      if (lk[a] === 4 || lk[b] === 4 || lk[e] === 4 || lk[f] === 4) continue; // (a sinkhole's a dry pit: the ground draws it)
      if (W[a] === 2 || W[b] === 2 || W[e] === 2 || W[f] === 2) li.push(a, e, b, b, e, f);
    }
    if (li.length) lakes = { lp, ld, lk, li: indices(li) };
  }
  return { pos, normal, idx: index, top: hi, tile, tmax, flat, depth, wi: indices(wi), lakes };
}

/** The mesh's buffers, to hand on from a worker without a copy. */
export function meshBuffers(m: IslandMesh): ArrayBuffer[] {
  const out = [m.pos.buffer, m.normal.buffer, m.idx.buffer, m.tile.buffer, m.flat.buffer, m.depth.buffer, m.wi.buffer];
  if (m.lakes) out.push(m.lakes.lp.buffer, m.lakes.ld.buffer, m.lakes.lk.buffer, m.lakes.li.buffer);
  return out as ArrayBuffer[];
}
