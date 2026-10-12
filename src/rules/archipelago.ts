// The archipelago (Ed, 2026-10-12, the journey's tessellation: "the rings can be very relaxed, a pleasing layout is much more
// important"; strong fit, moderate straits): where every island lies on the sea chart, and the patch of sea-and-land each grows
// into, so neighbouring coasts fit each other across a strait. Pure: worked out once a world, from the kinds' table (rules/
// rosters.ts) and each island's land by phase; the sea chart (app/chartLayout.ts) places the islands by it and the map
// (rules/map.ts) grows each island inside its patch.
//
// Layout: home in the middle; every island starts at its kind's bearing, as far out as its phase's share of the disc; then a
// capacity-constrained relaxation (a power diagram of the disc, each island's cell grown or shrunk toward its share of the
// disc: its true land over a fill that varies island to island, so some have wide straits round them and some sit close)
// moves each to the middle of its cell, pulled a little back toward its bearing and its phase's distance. The disc used
// evenly: no empty sectors, no crowded rim. The cells' borders wiggle (each island's own seeded noise in its power distance),
// and both neighbours share a border, so one's bulge is the other's bay.
//
// Units: the disc's radius is 1 (the chart's), CHART_METRES metres.
import { hash2, vnoise } from "./random";

/** One island's place: where its home's middle lies (disc units, x east, y south), its share of the disc, and its patch: how far
 *  from that middle its cell reaches (m), by angle (PATCH_ANGLES of them, from east, turning as atan2(z, x) does). */
export interface Placed { id: string; phase: number; x: number; y: number; area: number; patch: Float32Array }
export interface Archipelago { world: number; islands: Map<string, Placed>; /** the disc's radius (m) */ metres: number }

/** The disc's radius in metres (archipelago().metres): one true scale for every island and every world, about as big as all the
 *  islands' shares at FILL (each world's own came to 11.9 to 12.6 km). */
export const CHART_METRES = 12100;
/** The strait between neighbouring islands' coasts (m): each keeps half of it in from its patch's edge (rules/map.ts). */
export const STRAIT = 260;
/** How many angles a patch is given at. */
export const PATCH_ANGLES = 96;
/** An island's land by phase (km², as it grows free: tools/islands measurements), and home's at its full size (64 areas); the sea
 *  round them as large as they need (Ed, 2026-10-12: "you can make the sea larger so that they fit"). */
export const LAND_KM2 = [3.6, 1.3, 2.03, 2.88, 3.72, 4.72];
/** The share of its cell an island's land fills, on average, and how far it varies island to island (wider straits round some). */
export const FILL = 0.5, FILL_VARY = 0.35, FULLEST = 0.75;
/** The sea's openness over the disc (a slow seeded noise: open water in some stretches, islands clustered in others), and its
 *  scale (stretches across the disc). */
export const OPEN = 0.9, OPEN_SCALE = 2.2;
/** The pulls back toward its phase's distance and its bearing (a share of the way, each round), the relaxation's rounds, and how
 *  far each round it moves toward its cell's middle. */
const RADIAL = 0.1, BEARING = 0.05, ROUNDS = 50, CENTRE = 0.35;
/** The borders' wiggle (a share of the cells' sizes) and its scale (wiggles across a cell). */
const WIGGLE = 1.5, WIGGLE_SCALE = 0.9;

interface Site { id: string; phase: number; bearing: number; x: number; y: number; w: number; target: number; seed: number; r: number }

const made = new Map<string, Archipelago>();
/** The archipelago of a world: `kinds` every island's kind with its phase (its kind's + 1) and table bearing (degrees from north,
 *  clockwise), home besides. Made once a world. */
export function archipelago(world: number, kinds: readonly { id: string; phase: number; bearing: number }[]): Archipelago {
  const key = `${world}|${kinds.length}`, had = made.get(key);
  if (had) return had;
  const sites: Site[] = [{ id: "home", phase: 0, bearing: 0, x: 0, y: 0, w: 0, target: 0, seed: hash2(0, 1, 9001 + world), r: 0 }];
  for (const k of kinds) sites.push({ id: k.id, phase: k.phase, bearing: k.bearing, x: 0, y: 0, w: 0, target: 0, seed: hash2(k.id.length * 131 + k.id.charCodeAt(0), k.phase, 9001 + world), r: 0 });
  // (each one's share of the disc: its land over its fill, all summing to the disc)
  const fills = sites.map(s => FILL * (1 + FILL_VARY * (2 * hash2(Math.floor(s.seed * 1e6), 7, 9011 + world) - 1)));
  // (where the sea's open, an island's share is the larger: its fill the less)
  const openAt = (x: number, y: number) => 1 + OPEN * (2 * vnoise(x * OPEN_SCALE + 40, y * OPEN_SCALE + 40, 9021 + world) - 1);
  const share = () => {
    let total = 0;
    const open = sites.map(s => openAt(s.x, s.y)), mean = open.reduce((t, o) => t + o, 0) / open.length; // (its mean 1: the open water moves round, the sea's total stays)
    sites.forEach((s, k) => { const land = LAND_KM2[Math.min(5, s.phase)]; s.target = Math.max(land / FULLEST, (land / fills[k]) * (open[k] / mean)); total += s.target; });
    for (const s of sites) { s.target /= total; s.r = Math.sqrt(s.target); } // (as a share of the disc's area: π r² over π)
  };
  share();
  // (each phase's distance: the middle of its annulus, by the shares of the phases inside it)
  const byPhase = [0, 0, 0, 0, 0, 0]; // (by their land: where they sit doesn't move the rings)
  const land = (s: Site) => LAND_KM2[Math.min(5, s.phase)], allLand = sites.reduce((t, s) => t + land(s), 0);
  for (const s of sites) byPhase[Math.min(5, s.phase)] += land(s) / allLand;
  const ring: number[] = [];
  let inside = 0;
  for (let p = 0; p < 6; p++) { ring.push(p ? Math.sqrt(inside + byPhase[p] / 2) : 0); inside += byPhase[p]; }
  for (const s of sites) if (s.phase) { const a = (s.bearing * Math.PI) / 180; s.x = Math.sin(a) * ring[s.phase]; s.y = -Math.cos(a) * ring[s.phase]; }
  // The relaxation, on a grid over the disc.
  const G = 96, cell = 2 / G, cellArea = (cell * cell) / Math.PI; // (a sample's share of the disc)
  const label = new Int16Array(G * G);
  const power = (s: Site, px: number, py: number) => (px - s.x) ** 2 + (py - s.y) ** 2 - s.w;
  for (let round = 0; round < ROUNDS; round++) {
    if (round % 5 === 0) share(); // (its share by where it's got to)
    const area = new Float64Array(sites.length), mx = new Float64Array(sites.length), my = new Float64Array(sites.length);
    for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
      const px = -1 + (i + 0.5) * cell, py = -1 + (j + 0.5) * cell;
      if (px * px + py * py > 1) { label[j * G + i] = -1; continue; }
      let best = 0, bd = Infinity;
      for (let k = 0; k < sites.length; k++) { const d = power(sites[k], px, py); if (d < bd) { bd = d; best = k; } }
      label[j * G + i] = best; area[best] += cellArea; mx[best] += px * cellArea; my[best] += py * cellArea;
    }
    for (let k = 0; k < sites.length; k++) {
      const s = sites[k];
      // (its weight toward its share: grown where it has too little room, shrunk where too much)
      s.w += (s.target - area[k]) * 0.8;
      if (k === 0) continue; // (home stays in the middle)
      if (area[k] > 0) { s.x += (mx[k] / area[k] - s.x) * CENTRE; s.y += (my[k] / area[k] - s.y) * CENTRE; }
      // (back toward its phase's distance and its bearing, a little)
      const d = Math.hypot(s.x, s.y) || 1e-6, want = ring[s.phase], a = Math.atan2(s.x, -s.y), b = (s.bearing * Math.PI) / 180;
      const nd = d + (want - d) * RADIAL, da = Math.atan2(Math.sin(b - a), Math.cos(b - a)), na = a + da * BEARING;
      s.x = Math.sin(na) * nd; s.y = -Math.cos(na) * nd;
      const out = Math.hypot(s.x, s.y), lim = 1 - s.r * 0.6;
      if (out > lim) { s.x *= lim / out; s.y *= lim / out; }
    }
  }
  // The patches: from each island's middle, out along each angle till another's (wiggled) power distance is the less, or the rim.
  const wig = (s: Site, px: number, py: number) => WIGGLE * s.r * s.r * (vnoise((px / s.r) * WIGGLE_SCALE + 50, (py / s.r) * WIGGLE_SCALE, Math.floor(s.seed * 1e6)) - 0.5) * 2;
  // (only the islands near enough to share a border are asked: a patch reaches no further than MOST of its island's size)
  const MOST = 3;
  const owns = (k: number, near: readonly number[], px: number, py: number) => {
    if (px * px + py * py > 1) return false;
    if (Math.hypot(px - sites[k].x, py - sites[k].y) < sites[k].r * 0.4) return true; // (its own middle always its own, wiggles or no)
    const own = power(sites[k], px, py) + wig(sites[k], px, py);
    for (const q of near) if (power(sites[q], px, py) + wig(sites[q], px, py) < own || Math.hypot(px - sites[q].x, py - sites[q].y) < sites[q].r * 0.4) return false; // (another's middle is always its own)
    return true;
  };
  const islands = new Map<string, Placed>(), metres = CHART_METRES;
  sites.forEach((s, k) => {
    const patch = new Float32Array(PATCH_ANGLES), most = s.r * MOST, step = s.r / 16;
    const near = sites.map((_, q) => q).filter(q => q !== k && Math.hypot(sites[q].x - s.x, sites[q].y - s.y) < most + sites[q].r * MOST);
    for (let a = 0; a < PATCH_ANGLES; a++) {
      const t = (a / PATCH_ANGLES) * Math.PI * 2, ux = Math.cos(t), uy = Math.sin(t); // (x east, y south: the map's x and z)
      // (out in steps till it's another's, then its edge found by halving)
      let r = step;
      while (r < most && owns(k, near, s.x + ux * r, s.y + uy * r)) r += step;
      let lo = r - step, hi = Math.min(r, most);
      if (r < most) for (let h = 0; h < 6; h++) { const m = (lo + hi) / 2; if (owns(k, near, s.x + ux * m, s.y + uy * m)) lo = m; else hi = m; }
      patch[a] = ((lo + hi) / 2) * metres;
    }
    islands.set(s.id, { id: s.id, phase: s.phase, x: s.x, y: s.y, area: s.target, patch });
  });
  const out = { world, islands, metres };
  made.set(key, out);
  return out;
}

/** How far an island's patch reaches from its home's middle (m) at an angle (radians, atan2(z, x)), eased between its angles. */
export function patchAt(patch: Float32Array, angle: number): number {
  const n = patch.length, u = ((((angle / (Math.PI * 2)) % 1) + 1) % 1) * n, i = Math.floor(u) % n, f = u - Math.floor(u);
  return patch[i] + (patch[(i + 1) % n] - patch[i]) * f;
}
