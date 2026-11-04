// A walking route across the treehouse floor for tools/multiplayer/route.cjs: A* on a grid over the floor's own distance field
// (config/house/shape.js `field`, walk mode), using the shape the page itself reports (witch.telephoneProof().house), so the
// route stays where she can stand and away from the edges she would step off (tuning treehouse.house.look.noWalls).
//   const { planFloorPath } = require("./floorPath.cjs"); await planFloorPath({ shape, at, turn, rail }, from, to)
const path = require("node:path");
const { pathToFileURL } = require("node:url");

let shapeModule = null;
const loadShape = async () => (shapeModule ??= await import(pathToFileURL(path.resolve(__dirname, "../../config/house/shape.js")).href));

const toPlan = (at, turn, x, z) => { const a = turn * Math.PI / 180, c = Math.cos(a), s = Math.sin(a), dx = x - at.x, dz = z - at.z; return { x: dx * c - dz * s, z: dx * s + dz * c }; };
const fromPlan = (at, turn, x, z) => { const a = turn * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return { x: at.x + x * c + z * s, z: at.z - x * s + z * c }; };

/** The floor's distance (negative inside) at a world point, for a house as telephoneProof reports it. `open`: locked rooms to treat
 *  as open (a guest's own bedroom: rules/houseRooms.ts roomAccessFor). */
async function floorAt(house, x, z, open = []) {
  const { field } = await loadShape(), S = shapeFor(house, open), p = toPlan(house.at, house.turn ?? 0, x, z);
  return field(S, p.x, p.z, true);
}
function shapeFor(house, open) {
  const { m: _cache, ...plain } = house.shape; // (the page's cached frame holds the original locks)
  return { ...plain, branches: plain.branches.map(b => (open.includes(b.id) ? { ...b, locked: false } : b)) };
}

/** World points from `from` to `to` (both {x, z}) along the floor, about every half metre; throws when there is no route. */
async function planFloorPath(house, from, to, { open = [], res = 0.25, clear = 0.45, prefer = 1.6 } = {}) {
  const { field } = await loadShape(), S = shapeFor(house, open), turn = house.turn ?? 0, rail = house.rail ?? 0.6;
  const a = toPlan(house.at, turn, from.x, from.z), b = toPlan(house.at, turn, to.x, to.z);
  const pad = 30, x0 = Math.min(a.x, b.x) - pad, z0 = Math.min(a.z, b.z) - pad;
  const W = Math.ceil((Math.abs(a.x - b.x) + 2 * pad) / res), H = Math.ceil((Math.abs(a.z - b.z) + 2 * pad) / res);
  const cache = new Float64Array(W * H).fill(NaN);
  const clearance = i => { if (Number.isNaN(cache[i])) { const cx = x0 + (i % W) * res, cz = z0 + Math.floor(i / W) * res; cache[i] = -field(S, cx, cz, true) - rail; } return cache[i]; };
  const cell = p => Math.max(0, Math.min(H - 1, Math.round((p.z - z0) / res))) * W + Math.max(0, Math.min(W - 1, Math.round((p.x - x0) / res)));
  const ends = [cell(a), cell(b)];
  const near = (i, j) => Math.hypot((i % W) - (j % W), Math.floor(i / W) - Math.floor(j / W)) * res <= 1.25;
  // Ends may stand closer to an edge than the route keeps (a bedside, an object's front): within a metre of them, any floor will do.
  const walkable = i => { const c = clearance(i); return c >= clear || (c >= 0 && (near(i, ends[0]) || near(i, ends[1]))); };
  const goal = ends[1], gx = goal % W, gz = Math.floor(goal / W);
  const g = new Float64Array(W * H).fill(Infinity), came = new Int32Array(W * H).fill(-1), closed = new Uint8Array(W * H);
  const heap = []; // binary heap of [f, i]
  const push = (f, i) => { heap.push([f, i]); let k = heap.length - 1; while (k > 0) { const p = (k - 1) >> 1; if (heap[p][0] <= heap[k][0]) break; [heap[p], heap[k]] = [heap[k], heap[p]]; k = p; } };
  const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let k = 0; for (;;) { const l = 2 * k + 1, r = l + 1; let m = k; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (r < heap.length && heap[r][0] < heap[m][0]) m = r; if (m === k) break; [heap[m], heap[k]] = [heap[k], heap[m]]; k = m; } } return top; };
  const h = i => Math.hypot((i % W) - gx, Math.floor(i / W) - gz) * res;
  g[ends[0]] = 0; push(h(ends[0]), ends[0]);
  let found = false, expanded = 0;
  while (heap.length) {
    const [, i] = pop();
    if (closed[i]) continue; closed[i] = 1; expanded++;
    if (i === goal) { found = true; break; }
    if (expanded > 400000) break;
    const ix = i % W, iz = Math.floor(i / W);
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dz) continue;
      const nx = ix + dx, nz = iz + dz; if (nx < 0 || nz < 0 || nx >= W || nz >= H) continue;
      const j = nz * W + nx; if (closed[j] || !walkable(j)) continue;
      const step = Math.hypot(dx, dz) * res, c = clearance(j), cost = step * (1 + 3 * Math.max(0, prefer - c));
      if (g[i] + cost < g[j]) { g[j] = g[i] + cost; came[j] = i; push(g[j] + h(j), j); }
    }
  }
  if (!found) throw Error(`No floor route from (${from.x.toFixed(1)}, ${from.z.toFixed(1)}) to (${to.x.toFixed(1)}, ${to.z.toFixed(1)})`);
  const cells = []; for (let i = goal; i !== -1; i = came[i]) cells.push(i); cells.reverse();
  const pts = cells.map(i => fromPlan(house.at, turn, x0 + (i % W) * res, z0 + Math.floor(i / W) * res));
  const out = [from]; let length = 0, minClear = Infinity;
  for (let k = 1; k < pts.length; k++) { const p = pts[k], q = out[out.length - 1], d = Math.hypot(p.x - q.x, p.z - q.z); if (d >= 0.5 || k === pts.length - 1) { out.push(p); length += d; } }
  for (const i of cells) minClear = Math.min(minClear, clearance(i));
  out[out.length - 1] = { x: to.x, z: to.z };
  return { points: out, length, minClearance: minClear, startClearance: clearance(ends[0]), goalClearance: clearance(ends[1]) };
}

module.exports = { planFloorPath, floorAt, toPlan, fromPlan };
