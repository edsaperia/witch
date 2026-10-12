// The archipelago (Ed, 2026-10-12, the journey's tessellation: "the rings can be very relaxed, a pleasing layout is much more
// important"; strong fit; then v3: "more open sea", "the phase rings should hardly show", a minimum gap between islands, and
// islands turned to fit): where every island lies on the sea chart, how far its own shape is turned, and the patch of sea-and-land
// each grows into, so neighbouring coasts fit each other across a strait and never come nearer than one. Pure: worked out once a
// world, from the kinds' table (rules/rosters.ts); the sea chart (app/chartLayout.ts) places the islands by it and the map
// (rules/map.ts) grows each island, turned, inside its patch.
//
// Layout: a packing of the islands' coasts as they'll grow. Each island's coast is foreseen from its own shape (its phase's lobes,
// arms and bays from its seed, rules/islandGrowth.ts reachOf), scaled to its areas, plus its buffer ring (COAST_PAD). Home in the
// middle; every island starts at its kind's bearing, as far out as its phase's share of the disc strayed by its seed (MINGLE: the
// phases mingle); then, round after round, any two foreseen coasts nearer than their gap (some straits wide, some close, by a
// slow noise over the disc: GAP) are pushed apart, every island is pulled a little back toward its bearing and its own distance,
// kept in from the rim, and now and then turned to the turn that fits its neighbours best: its arms into their bays (Ed: "like
// jigsaw pieces pulled apart"). Each island's patch is the sea nearer its foreseen coast than any other's (the midline of each
// strait); the map grows it inside, half a strait in from that line, so the real coasts keep a STRAIT apart even where an arm
// grows past its forecast.
//
// Units: the disc's radius is 1 (the chart's), CHART_METRES metres.
import { hash2, vnoise } from "./random";
import { lakePlan, reachOf, SHAPES } from "./islandGrowth";

/** One island's place: where its home's middle lies (disc units, x east, y south), its share of the disc, its patch (how far from
 *  that middle its sea reaches, m, by angle: PATCH_ANGLES of them, from east, turning as atan2(z, x) does), and how far its own
 *  shape is turned (radians, as atan2(z, x) turns). */
export interface Placed { id: string; phase: number; x: number; y: number; area: number; patch: Float32Array; turn: number }
export interface Archipelago { world: number; islands: Map<string, Placed>; /** the disc's radius (m) */ metres: number }

/** The disc's radius in metres (archipelago().metres): one true scale for every island and every world: the islands' bodies packed
 *  inside its last ARM_RING metres, their foreseen land FILL of that, and that ring left to the outer islands' arms out to sea (Ed,
 *  v3: "add back the arms towards the edges of the map, since there's nothing to fit with there"). */
export const CHART_METRES = 14000, ARM_RING = 1000;
/** The least sea between two islands' coasts (m): each grows no nearer than half of it to its patch's edge (rules/map.ts). */
export const STRAIT = 400;
/** How many angles a patch is given at. */
export const PATCH_ANGLES = 96;
/** An island's land by phase (km², as it grows free: tools/islands measurements), and home's at its full size (64 areas): the disc
 *  as big as they need over FILL (Ed, 2026-10-12: "you can make the sea larger so that they fit"; v3, "more open sea"). */
export const LAND_KM2 = [3.74, 1.23, 1.83, 2.45, 2.8, 4.24];
/** The share of the disc the islands' foreseen land (buffer rings and all) takes, for today's kinds: the rest open sea. */
export const FILL = 0.42;
/** The sea packed between two foreseen coasts, in straits: its least and most, by the sea's openness there (a slow seeded noise
 *  over the disc, OPEN_SCALE stretches across it: open water in some stretches, coasts fitted close in others). */
export const GAP: readonly [number, number] = [1.3, 3.2];
export const OPEN_SCALE = 2.2;
/** How far an island's real coast lies past its shape's reach scaled to its areas, by phase (m): its buffer ring and its areas' own
 *  ground (measured: the real coasts against the shapes, tools/islands). */
export const COAST_PAD = [300, 305, 350, 400, 530, 640];
/** An area's width (m: the tuning's areaSize × areaScale), and home's areas at its full size. */
const AREA_METRES = 168, HOME_AREAS = 64;
/** How far each island's own distance strays from its phase's (a share of the gap between phase rings, either way), the pulls
 *  back toward its bearing and its distance (a share of the way, each round), the rounds (and the last ones with only the
 *  pushes), how often each is turned and among how many turns, how many angles its shape is kept at and how many points of its
 *  coast are probed. */
/** (and how much an outer island's turn favours its longest arm pointing out to sea, and an island's body: its reach no further
 *  than this many times its median) */
const ARM_OUT = 0.6, CORE = 1.15;
const MINGLE = 1.2, BEARING = 0.03, RADIAL = 0.03, ROUNDS = 200, SETTLE = 60, TURN_EVERY = 30, TURN_TRIES = 16, SHAPE_ANGLES = 72, PROBE = 28;

interface Site { id: string; phase: number; bearing: number; x: number; y: number; turn: number; /** its shape's reach by angle, unturned */ table: Float32Array; /** metres a unit of reach, and its coast past that */ k: number; pad: number; most: number; /** its body's furthest coast (m): its arms past it */ core: number; aim: number; mass: number }

/** Where an island's coast is foreseen, from its middle (m), at an angle. */
const coastAt = (s: Site, t: number) => s.k * patchAt(s.table, t - s.turn) + s.pad;

const made = new Map<string, Archipelago>();
/** The archipelago of a world: `kinds` every island's kind with its phase (its kind's + 1), table bearing (degrees from north,
 *  clockwise) and seed (its shape's), home besides. Made once a world. */
export function archipelago(world: number, kinds: readonly { id: string; phase: number; bearing: number; seed: number }[], homeSeed = 1): Archipelago {
  const key = `${world}|${kinds.length}`, had = made.get(key);
  if (had) return had;
  const TAU = Math.PI * 2;
  // The disc: as big as all the islands' land over FILL; each phase's distance the middle of its annulus by the phases' land.
  const landOf = (p: number) => LAND_KM2[Math.min(5, p)], allLand = landOf(0) + kinds.reduce((t, k) => t + landOf(k.phase), 0);
  const R = CHART_METRES - ARM_RING, OUT = CHART_METRES; // (the bodies' rim, and the arms')
  const byPhase = [landOf(0) / allLand, 0, 0, 0, 0, 0];
  for (const k of kinds) byPhase[Math.min(5, k.phase)] += landOf(k.phase) / allLand;
  const ring: number[] = [];
  let inside = 0;
  for (let p = 0; p < 6; p++) { ring.push(p ? Math.sqrt(inside + byPhase[p] / 2) : 0); inside += byPhase[p]; }
  const ringGap = (ring[5] - ring[1]) / 4;
  // Each island: its shape (as it grows), scaled so its playable areas fill it, its coast past that, and where it starts.
  const siteOf = (id: string, phase: number, bearing: number, seed: number): Site => {
    const K = SHAPES[Math.min(5, phase)], reach = reachOf(K, seed).reach, table = new Float32Array(SHAPE_ANGLES);
    let I = 0;
    for (let a = 0; a < SHAPE_ANGLES; a++) { table[a] = reach((a / SHAPE_ANGLES) * TAU); I += table[a] ** 2 * (TAU / SHAPE_ANGLES); }
    const areas = (phase ? 10 * phase : HOME_AREAS) + lakePlan(K, seed).reduce((t, n) => t + n, 0), k = AREA_METRES * Math.sqrt((2 * areas) / I), pad = COAST_PAD[Math.min(5, phase)];
    const h = Math.floor(seed * 7919) % 100003, aim = phase ? Math.max(ring[1] * 0.5, Math.min(0.95, ring[phase] + MINGLE * ringGap * (2 * hash2(h, 13, 9031 + world) - 1))) * R : 0;
    const b = (bearing * Math.PI) / 180, turn = phase ? hash2(h, 17, 9041 + world) * TAU : 0;
    return { id, phase, bearing, x: Math.sin(b) * aim, y: -Math.cos(b) * aim, turn, table, k, pad, most: k * Math.max(...table) + pad, core: k * [...table].sort((p, q) => p - q)[SHAPE_ANGLES >> 1] * CORE + pad, aim, mass: phase ? k * k : Infinity };
  };
  const sites: Site[] = [siteOf("home", 0, 0, homeSeed), ...kinds.map(k => siteOf(k.id, k.phase, k.bearing, k.seed))];
  // The sea wanted between two coasts (m): wider where the sea's open.
  const wantOf = (a: Site, b: Site) => STRAIT * (GAP[0] + (GAP[1] - GAP[0]) * vnoise(((a.x + b.x) / 2 / R) * OPEN_SCALE + 40, ((a.y + b.y) / 2 / R) * OPEN_SCALE + 40, 9021 + world));
  // How far a's coast comes inside b's coast and its wanted sea (m; under 0, that much more sea than wanted): a's coast probed.
  const into = (a: Site, b: Site, want: number) => {
    let v = -Infinity;
    for (let p = 0; p < PROBE; p++) {
      const t = (p / PROBE) * TAU, r = coastAt(a, t), dx = a.x + Math.cos(t) * r - b.x, dy = a.y + Math.sin(t) * r - b.y;
      v = Math.max(v, coastAt(b, Math.atan2(dy, dx)) + want - Math.hypot(dx, dy));
    }
    return v;
  };
  const overlap = (a: Site, b: Site, want = wantOf(a, b)) => Math.max(into(a, b, want), into(b, a, want));
  const nearPairs = () => {
    const out: [number, number, number][] = [];
    for (let i = 0; i < sites.length; i++) for (let j = i + 1; j < sites.length; j++) {
      const a = sites[i], b = sites[j], want = wantOf(a, b);
      if (Math.hypot(a.x - b.x, a.y - b.y) < a.most + b.most + want * 2) out.push([i, j, want]);
    }
    return out;
  };
  // Each island turned to fit its neighbours: the turn whose coast comes least inside theirs, then sits closest to them.
  const turnAll = () => {
    for (let i = 1; i < sites.length; i++) {
      const s = sites[i], near = sites.filter(q => q !== s && Math.hypot(q.x - s.x, q.y - s.y) < q.most + s.most + STRAIT * GAP[1]);
      // (an outer island: its longest arm out to sea, toward the rim, not past the arms' rim)
      const outer = Math.hypot(s.x, s.y) + s.core > R - STRAIT * GAP[1] * 2, out = Math.atan2(s.y, s.x);
      const seaward = () => {
        let reach = 0, over = 0;
        for (let p = -3; p <= 3; p++) reach = Math.max(reach, coastAt(s, out + (p / 3) * 0.5) - s.core);
        for (let p = 0; p < PROBE; p++) { const t = (p / PROBE) * TAU, r = coastAt(s, t); over = Math.max(over, Math.hypot(s.x + Math.cos(t) * r, s.y + Math.sin(t) * r) + STRAIT - OUT); }
        return -ARM_OUT * reach + 2 * over;
      };
      const score = () => { let t = outer ? seaward() : 0; for (const q of near) { const want = wantOf(s, q), v = overlap(s, q, want); t += v > 0 ? v + (v * v) / want : 0.15 * Math.min(-v, want * 2); } return t; };
      const was = s.turn;
      let best = was, bs = score() - 1e-6;
      for (let c = 0; c < TURN_TRIES; c++) { s.turn = was + ((c + 1) / (TURN_TRIES + 1)) * TAU; const sc = score(); if (sc < bs) { bs = sc; best = s.turn; } }
      s.turn = ((best % TAU) + TAU) % TAU;
    }
  };
  let pairs = nearPairs();
  for (let round = 0; round < ROUNDS + SETTLE; round++) {
    const settling = round >= ROUNDS;
    if (round % 10 === 0) pairs = nearPairs();
    if (!settling && round >= 20 && round % TURN_EVERY === 0) turnAll();
    // (back toward its bearing and its own distance, a little)
    if (!settling) for (const s of sites) {
      if (!s.phase) continue;
      const d = Math.hypot(s.x, s.y) || 1e-6, a = Math.atan2(s.x, -s.y), b = (s.bearing * Math.PI) / 180;
      const nd = d + (s.aim - d) * RADIAL, na = a + Math.atan2(Math.sin(b - a), Math.cos(b - a)) * BEARING;
      s.x = Math.sin(na) * nd; s.y = -Math.cos(na) * nd;
    }
    // (any two coasts nearer than their sea: apart along the line between them, the lighter the further)
    for (const [i, j, want] of pairs) {
      const a = sites[i], b = sites[j];
      if (Math.hypot(a.x - b.x, a.y - b.y) >= a.most + b.most + want) continue;
      const v = overlap(a, b, want);
      if (v <= 0) continue;
      const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1e-6, push = v * 0.6;
      const sa = a.mass === Infinity ? 0 : b.mass === Infinity ? 1 : b.mass / (a.mass + b.mass), sb = 1 - sa;
      a.x -= (dx / d) * push * sa; a.y -= (dy / d) * push * sa; b.x += (dx / d) * push * sb; b.y += (dy / d) * push * sb;
    }
    // (its body in from the bodies' rim by a strait, its arms from the arms' rim)
    for (const s of sites) {
      if (!s.phase) continue;
      let v = 0;
      for (let p = 0; p < PROBE; p++) {
        const t = (p / PROBE) * TAU, r = coastAt(s, t), d = (q: number) => Math.hypot(s.x + Math.cos(t) * q, s.y + Math.sin(t) * q) + STRAIT;
        v = Math.max(v, d(Math.min(r, s.core)) - R, d(r) - OUT);
      }
      if (v > 0) { const d = Math.hypot(s.x, s.y) || 1e-6, k = v * (settling ? 0.3 : 0.6); s.x -= (s.x / d) * k; s.y -= (s.y / d) * k; }
    }
  }
  // The patches: from each island's middle, out along each angle while the point is nearer its foreseen coast than any other's
  // (the strait's midline), or to the arms' rim.
  const islands = new Map<string, Placed>();
  sites.forEach(s => {
    const near = sites.filter(q => q !== s && Math.hypot(q.x - s.x, q.y - s.y) < q.most + s.most + STRAIT * GAP[1] * 2);
    const owns = (px: number, py: number) => {
      if (px * px + py * py > OUT * OUT) return false;
      const own = Math.hypot(px - s.x, py - s.y) - coastAt(s, Math.atan2(py - s.y, px - s.x));
      for (const q of near) if (Math.hypot(px - q.x, py - q.y) - coastAt(q, Math.atan2(py - q.y, px - q.x)) < own) return false;
      return true;
    };
    const patch = new Float32Array(PATCH_ANGLES), step = 40;
    for (let a = 0; a < PATCH_ANGLES; a++) {
      const t = (a / PATCH_ANGLES) * TAU, ux = Math.cos(t), uy = Math.sin(t), most = coastAt(s, t) + STRAIT * GAP[1] * 2;
      let r = step;
      while (r < most && owns(s.x + ux * r, s.y + uy * r)) r += step;
      let lo = r - step, hi = Math.min(r, most);
      if (r < most) for (let h = 0; h < 6; h++) { const m = (lo + hi) / 2; if (owns(s.x + ux * m, s.y + uy * m)) lo = m; else hi = m; }
      patch[a] = (lo + hi) / 2;
    }
    let area = 0;
    for (let a = 0; a < SHAPE_ANGLES; a++) area += 0.5 * coastAt(s, (a / SHAPE_ANGLES) * TAU) ** 2 * (TAU / SHAPE_ANGLES);
    islands.set(s.id, { id: s.id, phase: s.phase, x: s.x / OUT, y: s.y / OUT, area: area / (Math.PI * OUT * OUT), patch, turn: s.turn });
  });
  const out = { world, islands, metres: OUT };
  made.set(key, out);
  return out;
}

/** How far an island's patch reaches from its home's middle (m) at an angle (radians, atan2(z, x)), eased between its angles. */
export function patchAt(patch: Float32Array, angle: number): number {
  const n = patch.length, u = ((((angle / (Math.PI * 2)) % 1) + 1) % 1) * n, i = Math.floor(u) % n, f = u - Math.floor(u);
  return patch[i] + (patch[(i + 1) % n] - patch[i]) * f;
}
