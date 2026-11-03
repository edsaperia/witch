// Paths, roads and railways (Ed, 2026-10-03): worn paths between areas' glades (since 2026-11-03 the
// network: every site joined to each touching area's, in straight runs with gentle bends, footpath
// below), now and then one out into the buffer and sometimes a dead end; a broad old road or two sweeps
// across the forest; and railway lines cross many areas in long, gentle curves, with a branch line,
// broken sections where the track is gone and trees grow between the sleepers. They carve tree-free
// corridors with bushes along their edges. Seeded, so they never change; no drawing here.
import { ashore, lakeKnobs, onLake, shoreDetours } from "./lakes";
import { clamp, hash2, rng, vnoise } from "./random";
import { AREA_TYPES, type ForestMap } from "./map";
import { floorClearing } from "./speakers";
import { beachOf } from "./mapShape";
import { zooPathLines } from "./zoo";

export type PathKind = "path" | "road" | "rail" | "stream";
export const PATH_KINDS: PathKind[] = ["path", "road", "rail", "stream"];

export interface PathLine {
  kind: PathKind;
  /** The centreline, sampled every few metres. */
  pts: [number, number][];
  /** Half the corridor's width (metres). */
  half: number;
  /** A path out to nothing in particular: it peters out at its far end. */
  deadEnd?: boolean;
  /** The area it starts in: a path keeps that area's kind (dirt, flagstones...) for its whole length (Ed, v160). */
  area?: { cell: [number, number]; type: number };
  /** The path network's (map's paths.network): the two areas' keys ("cx,cy") whose sites it joins. */
  link?: [string, string];
}

/** Where the network's paths end at an area (rules/map.ts): its stone, special site or dancefloor, and the radius of the clearing
 *  round it, where they stop. */
export interface SiteEnd { x: number; z: number; r: number }
/** The path network's sites (rules/map.ts): each area's end (null: an area with no site, the buffer's, a legend area, a lake), and
 *  the circles its paths keep out of between their ends (the dancefloor, the treehouse, every stone and special site). */
export interface SiteNet { ends(cx: number, cy: number): SiteEnd | null; keepOut: readonly { x: number; z: number; r: number }[] }

/** A 3D piece along the network (its id is the art's path piece): a bridge where a path crosses a
 *  stream, a railway landmark, a level crossing, stairs, a verge post... r: the clear radius kept
 *  round it (no trees or bushes). */
export interface PathPiece { id: string; x: number; z: number; r: number }

export interface PathHit { kind: PathKind; line: number; /** distance from the centreline */ d: number; /** index of the nearest segment */ seg: number }

/** A smooth curve through control points (centripetal Catmull-Rom), sampled every `step` metres. */
export function spline(ctrl: [number, number][], step: number): [number, number][] {
  const out: [number, number][] = [];
  const P = [ctrl[0], ...ctrl, ctrl[ctrl.length - 1]];
  for (let i = 1; i < P.length - 2; i++) {
    const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
    const len = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]), n = Math.max(1, Math.ceil(len / step));
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(ctrl[ctrl.length - 1]);
  return out;
}


/** How far past its half a network path keeps off a lake's bare shore (m): near enough to follow a shore round a lake between two
 *  sites, where the other lines stop 8 m short of it. */
const LINK_SHORE = 2;

export class PathNetwork {
  readonly lines: PathLine[] = [];
  readonly pieces: PathPiece[] = [];
  /** Where a branch line leaves a railway (the points): the spot, the main line's direction and
   *  the side the branch curves off to (+1 left of the direction of travel, -1 right). */
  readonly junctions: { x: number; z: number; dx: number; dz: number; side: number; line: number }[] = [];
  private pieceGrid = new Map<string, PathPiece[]>();
  private grid = new Map<string, [number, number][]>(); // cell -> [line, segment]
  private readonly cell = 24;
  /** The network's touching sites left unjoined ("a|b" keys): no way round a lake or the beach between them. */
  readonly unlinked: string[] = [];
  /** The network's touching sites whose clearings meet, so no path is needed between them ("a|b" keys). */
  readonly meet: string[] = [];

  /** `wetBefore`: the night's deal (rules/deal.ts) made the paths once for the world's own types and now makes them for the
   *  night's: the streams between wet areas then follow the night's types from a draw of their own, while the draws the world's
   *  streams took are taken again (and their lines dropped), so every other line comes out exactly as before. */
  /** `net`: the path network's sites (map's paths.network), once the stones are placed; without it, the paths between two sites
   *  wait for it (the map lays them first without, so its stones keep off the railway and the streams). */
  constructor(readonly map: ForestMap, wetBefore?: (cx: number, cy: number) => boolean, net?: SiteNet) {
    // Railways and roads run off the map's whole extent, so they leave it rather than stop at its edge.
    const t = map.tuning.paths, b = map.extent, r = rng(map.seed * 7 + 4242);
    // The zoo (rules/zoo.ts): a straight path along every border between its blocks, nothing else; laid out like the chart
    // (rules/zooMap.ts), none: its streets are the paths.
    if (map.zoo) { if (!map.zoo.layout) for (const pts of zooPathLines(map.zoo, map.areaSize)) this.lines.push({ kind: "path", pts, half: map.zoo.pathHalf }); }
    else {
      const W = b.maxX - b.minX, H = b.maxZ - b.minZ;
      const edgePoint = (side: number, u: number): [number, number] =>
        side === 0 ? [b.minX + u * W, b.minZ] : side === 1 ? [b.maxX, b.minZ + u * H] : side === 2 ? [b.minX + u * W, b.maxZ] : [b.minX, b.minZ + u * H];
      // A long line from one edge to another: control points every `spacing` metres, nudged
      // sideways by up to `wander`, so it bends in wide, gentle curves.
      const crossing = (from: [number, number], to: [number, number], spacing: number, wander: number): [number, number][] => {
        const dx = to[0] - from[0], dz = to[1] - from[1], len = Math.hypot(dx, dz), n = Math.max(2, Math.round(len / spacing));
        const ctrl: [number, number][] = [from];
        let off = 0;
        for (let i = 1; i < n; i++) {
          off = clamp(off + (r() - 0.5) * wander, -wander, wander);
          const k = i / n;
          ctrl.push([clamp(from[0] + dx * k - (dz / len) * off, b.minX, b.maxX), clamp(from[1] + dz * k + (dx / len) * off, b.minZ, b.maxZ)]);
        }
        ctrl.push(to);
        return spline(ctrl, 3);
      };
      // Railways: two to four lines, edge to edge, in wide curves; one with a branch line.
      const rails = t.rails[0] + Math.floor(r() * (t.rails[1] - t.rails[0] + 1));
      for (let i = 0; i < rails; i++) {
        const s = Math.floor(r() * 4), e = (s + 2 + (r() < 0.3 ? (r() < 0.5 ? 1 : -1) : 0) + 4) % 4;
        const pts = crossing(edgePoint(s, 0.15 + r() * 0.7), edgePoint(e, 0.15 + r() * 0.7), 320, 140);
        this.lines.push({ kind: "rail", pts, half: t.railHalf });
        if (i === 0 && pts.length > 20) {
          const k = Math.floor(pts.length * (0.3 + r() * 0.4)), at = pts[k], side = Math.floor(r() * 4);
          const branch = crossing(at, edgePoint(side, 0.2 + r() * 0.6), 300, 120);
          this.lines.push({ kind: "rail", pts: branch, half: t.railHalf });
          const nx = pts[k + 1][0] - at[0], nz = pts[k + 1][1] - at[1], n = Math.hypot(nx, nz) || 1;
          const b = branch[Math.min(branch.length - 1, 6)], cross = nx * (b[1] - at[1]) - nz * (b[0] - at[0]);
          this.junctions.push({ x: at[0], z: at[1], dx: nx / n, dz: nz / n, side: cross >= 0 ? 1 : -1, line: this.lines.length - 2 });
        }
      }
      // Old roads: fewer, broad, sweeping; they may cross a railway (a level crossing).
      const roads = t.roads[0] + Math.floor(r() * (t.roads[1] - t.roads[0] + 1));
      for (let i = 0; i < roads; i++) {
        const s = Math.floor(r() * 4), e = (s + 2) % 4;
        this.lines.push({ kind: "road", pts: crossing(edgePoint(s, 0.1 + r() * 0.8), edgePoint(e, 0.1 + r() * 0.8), 240, 110), half: t.roadHalf });
      }
      // Streams: one or two winding the length of the map, more wildly than the railways, and short
      // ones joining wet areas that touch (a stream, a bog, a wetland, a beaver pond).
      const streams = t.streams[0] + Math.floor(r() * (t.streams[1] - t.streams[0] + 1));
      for (let i = 0; i < streams; i++) {
        const s = Math.floor(r() * 4), e = (s + 2) % 4;
        this.lines.push({ kind: "stream", pts: crossing(edgePoint(s, 0.1 + r() * 0.8), edgePoint(e, 0.1 + r() * 0.8), 90, 70), half: t.streamHalf });
      }
      const wetNow = (cx: number, cy: number) => AREA_TYPES[map.typeOf(cx, cy)].wet; // (the area's flag: art/areas.js)
      const wetStreams = (wet: (cx: number, cy: number) => boolean, draw: () => number, keep: boolean) => {
        for (const [k, nbrs] of map.neighbours) {
          const [ax, ay] = k.split(",").map(Number);
          if (!wet(ax, ay)) continue;
          for (const nk of nbrs) {
            const [bx, by] = nk.split(",").map(Number);
            if (k > nk || !wet(bx, by)) continue;
            const [a, c] = this.trim(map.siteOf(ax, ay), map.siteOf(bx, by), this.clearOf(ax, ay), this.clearOf(bx, by));
            if (!a) continue;
            const pts = this.meander(a, c, draw);
            if (keep) this.lines.push({ kind: "stream", pts, half: t.streamHalf });
          }
        }
      };
      if (wetBefore) { wetStreams(wetBefore, r, false); wetStreams(wetNow, rng(map.seed * 7 + 4243), true); }
      else wetStreams(wetNow, r, true);
      // Paths: between neighbouring areas' sites (some pairs: linkChance, with the network on only those
      // out to an area with no site), straight runs with gentle bends (footpath); and a dead end or two
      // in some areas, out to nothing in particular (a ruin, later).
      // The network (Ed, 2026-11-03: "paths link each of these sites to the sites in adjacent areas"): every two touching areas
      // with a site (a stone, a special site or home's dancefloor) joined, from the edge of one's clearing to the other's, by a
      // draw of their own (so the lines above and the paths out to the buffer come out the same whether or not they're laid).
      const seen = new Set<string>(), network = !!t.network, sited = (cx: number, cy: number) => map.playable(cx, cy) || !!map.special?.(cx, cy), lr = rng(map.seed * 7 + 4245);
      for (const [k, nbrs] of map.neighbours) {
        const [ax, ay] = k.split(",").map(Number);
        for (const nk of nbrs) {
          const pair = k < nk ? `${k}|${nk}` : `${nk}|${k}`;
          if (seen.has(pair)) continue;
          seen.add(pair);
          const [bx, by] = nk.split(",").map(Number);
          if (network && sited(ax, ay) && sited(bx, by)) {
            const ea = net?.ends(ax, ay), eb = net?.ends(bx, by);
            if (!ea || !eb) continue;
            const pts = this.link(ea, eb, lr, net!.keepOut);
            if (pts === "meet") this.meet.push(pair);
            else if (pts) this.lines.push({ kind: "path", pts, half: t.pathHalf, link: k < nk ? [k, nk] : [nk, k] });
            else this.unlinked.push(pair);
            continue;
          }
          if (!map.playable(bx, by) && !map.inBuffer(bx, by)) continue; // (where she can fly)
          if (map.shape === "circle" && !map.playable(ax, ay) && !map.inBuffer(ax, ay)) continue;
          if (hash2(ax * 31 + bx, ay * 31 + by, map.seed + 811) > t.linkChance) continue;
          const [a, c] = this.trim(map.siteOf(ax, ay), map.siteOf(bx, by), this.clearOf(ax, ay), this.clearOf(bx, by));
          if (a) this.lines.push({ kind: "path", pts: footpath(a, c, r), half: t.pathHalf });
        }
        if (hash2(ax, ay, map.seed + 813) < t.deadEndChance) {
          const s = map.siteOf(ax, ay), a = r() * Math.PI * 2, d = 30 + r() * 40, k = this.clearOf(ax, ay);
          const from = { x: s.x + Math.cos(a) * k, z: s.z + Math.sin(a) * k };
          this.lines.push({ kind: "path", pts: footpath(from, { x: from.x + Math.cos(a) * d, z: from.z + Math.sin(a) * d }, r), half: t.pathHalf, deadEnd: true });
        }
      }
    }
    this.clipToBeach();
    this.lines.forEach((l, li) => {
      const a0 = map.areaAt(l.pts[0][0], l.pts[0][1]);
      l.area = { cell: [a0.cell[0], a0.cell[1]], type: a0.type };
      for (let i = 0; i < l.pts.length - 1; i++) {
        const [a, c] = [l.pts[i], l.pts[i + 1]], pad = l.half + 4;
        for (let gx = Math.floor((Math.min(a[0], c[0]) - pad) / this.cell); gx <= Math.floor((Math.max(a[0], c[0]) + pad) / this.cell); gx++)
          for (let gz = Math.floor((Math.min(a[1], c[1]) - pad) / this.cell); gz <= Math.floor((Math.max(a[1], c[1]) + pad) / this.cell); gz++) {
            const key = `${gx},${gz}`;
            let list = this.grid.get(key);
            if (!list) this.grid.set(key, (list = []));
            list.push([li, i]);
          }
      }
    });
  }

  /** Cut every line short of the beach (the circular map's, beachOf) and of the lakes: a line running on past the sand
   *  stops a little before it, in as many pieces as it crosses in and out (a junction kept on its piece). */
  private clipToBeach(): void {
    const B = beachOf(this.map.bounds, this.map.tuning), lakes = this.map.bounds.lakes ? this.map.bounds : null, shore = lakeKnobs(this.map.tuning).shore;
    if (!B && !lakes) return;
    const out: PathLine[] = [], remap = new Map<number, number[]>();
    let cut = false;
    this.lines.forEach((l, li) => {
      const keep = l.half + 8, lakeKeep = l.link ? l.half + LINK_SHORE : keep, ids: number[] = [];
      let run: [number, number][] = [];
      const flush = () => { if (run.length >= 2) { ids.push(out.length); out.push({ ...l, pts: run }); } run = []; };
      for (const p of l.pts) { if ((!B || B.intoSand(p[0], p[1]) <= -keep) && (!lakes || !onLake(lakes, p[0], p[1], lakeKeep + shore))) run.push(p); else { cut = true; flush(); } } // (and short of a lake's shore: rules/lakes.ts)
      flush();
      remap.set(li, ids);
    });
    if (!cut) return; // (nothing reached it)
    const js = this.junctions.splice(0);
    for (const j of js) {
      const ids = remap.get(j.line) ?? [];
      const at = ids.find(i => out[i].pts.some(p => p[0] === j.x && p[1] === j.z));
      if (at !== undefined) this.junctions.push({ ...j, line: at });
    }
    this.lines.splice(0, this.lines.length, ...out);
  }

  /** The 3D pieces: seeded, from the lines alone; placed once the map has put its gameplay spots
   *  (soundsystems, set pieces, grounds), which they keep clear of. */
  placePieces(): void {
    const m = this.map, s = m.seed, T = m.tuning.paths;
    if (T.pieces === false) return; // (Ed, 2026-10-11: none on the small islands)
    const add = (id: string, x: number, z: number, r: number) => {
      // Pieces keep apart (several crossings close together make one bridge, not a row of them).
      if (m.hardClear(x, z) || m.reserved(x, z, r) || this.pieces.some(q => Math.hypot(q.x - x, q.z - z) < Math.max(T.pieceGap, q.r + r))) return;
      const p = { id, x, z, r };
      this.pieces.push(p);
      const k = `${Math.floor(x / this.cell)},${Math.floor(z / this.cell)}`;
      let l = this.pieceGrid.get(k);
      if (!l) this.pieceGrid.set(k, (l = []));
      l.push(p);
    };
    const side = (l: PathLine, i: number, d: number): [number, number] => {
      const a = l.pts[i], b = l.pts[Math.min(l.pts.length - 1, i + 1)], dx = b[0] - a[0], dz = b[1] - a[1], n = Math.hypot(dx, dz) || 1;
      return [a[0] - (dz / n) * d, a[1] + (dx / n) * d];
    };
    this.lines.forEach((l, li) => {
      let run = 0, broken = false;
      for (let i = 1; i < l.pts.length; i++) {
        const [x, z] = l.pts[i], step = Math.hypot(x - l.pts[i - 1][0], z - l.pts[i - 1][1]);
        run += step;
        if (l.kind === "rail") {
          // Where the track breaks off, now and then a buffer stop.
          const b = this.railBroken(x, z);
          if (b && !broken && hash2(li, i, s + 841) < 0.5) add("buffer-stop", x, z, 4);
          broken = b;
          // Every landmarkSpacing metres or so, a chance of a landmark on or by the line; between
          // them, a signal post by the track now and then.
          if (run >= T.landmarkSpacing) {
            run = 0;
            const h = hash2(li, i, s + 843);
            if (h < T.landmarkChance) { const ids = ["goods-wagon", "carriage", "platform", "signal-gantry"]; add(ids[Math.floor(hash2(li, i, s + 845) * ids.length)], x, z, 7); }
            else if (h < T.landmarkChance + 0.3 && !b) add("signal-post", ...side(l, i, l.half - 0.6), 1.2);
          }
        } else if (l.kind === "road" && run >= T.vergeSpacing) {
          run = 0;
          add("verge-post", ...side(l, i, (hash2(li, i, s + 847) < 0.5 ? 1 : -1) * (l.half - 0.7)), 0.8);
        }
      }
    });
    // Stairs (Ed, v160): a find, not a path fitting: each flight at most once per map, standing on
    // its own at the edge of the clearing of a ravine, rocky slope, cave mouth or stone shrine
    // (seeded which), clear of the paths and everything placed for gameplay.
    const homes: [number, number, number][] = []; // the steep area types (art/areas.js flags)
    for (const [x, y] of m.cells) if (AREA_TYPES[m.typeOf(x, y)].steep) homes.push([x, y, hash2(x, y, s + 849)]);
    homes.sort((a, b) => a[2] - b[2]);
    let flight = 0;
    const flights = ["stairs", "stairs-turn"];
    for (const [cx, cy] of homes) {
      if (flight >= flights.length) break;
      const site = m.siteOf(cx, cy), a0 = hash2(cx, cy, s + 851) * Math.PI * 2, d = this.clearOf(cx, cy) + 4;
      for (let k = 0; k < 12; k++) {
        const a = a0 + (k / 12) * Math.PI * 2, x = site.x + Math.cos(a) * d, z = site.z + Math.sin(a) * d, c = m.areaAt(x, z).cell;
        if (c[0] !== cx || c[1] !== cy || this.at(x, z, 3)) continue;
        const before = this.pieces.length;
        add(flights[flight], x, z, 3);
        if (this.pieces.length > before) { flight++; break; }
      }
    }
    // Crossings: a bridge where a path or road crosses a stream; a level crossing where a road
    // crosses a railway. Found segment against segment, through the grid.
    const seen = new Set<string>();
    this.lines.forEach((l, li) => {
      if (l.kind !== "path" && l.kind !== "road") return;
      for (let i = 0; i < l.pts.length - 1; i++) {
        const a = l.pts[i], b = l.pts[i + 1], key = `${Math.floor(a[0] / this.cell)},${Math.floor(a[1] / this.cell)}`;
        for (const [lj, j] of this.grid.get(key) ?? []) {
          const o = this.lines[lj];
          if (o.kind !== "stream" && !(o.kind === "rail" && l.kind === "road")) continue;
          const c = o.pts[j], d = o.pts[j + 1], X = crossPoint(a, b, c, d);
          if (!X) continue;
          const tag = `${li}|${lj}|${Math.round(X[0] / 20)},${Math.round(X[1] / 20)}`;
          if (seen.has(tag)) continue;
          seen.add(tag);
          if (o.kind === "stream") add(l.kind === "road" ? "footbridge" : hash2(li, lj, s + 853) < 0.5 ? "footbridge" : "rope-bridge", X[0], X[1], 4);
          else add("level-crossing", ...side(l, i, l.half + 0.8), 2);
        }
      }
    });
    // Fingerposts (the prop generator's, paths.fingerposts: the game always has it on): where a footpath comes into an area's clearing, by its side (a dead
    // end's far end leads nowhere, so none there). Last, so they never take another piece's place.
    if (T.fingerposts) this.lines.forEach(l => {
      if (l.kind !== "path" || l.pts.length < 3) return;
      for (const [i, k] of l.deadEnd ? [[1, 1]] : [[1, 1], [l.pts.length - 2, -1]]) add("fingerpost", ...side(l, i, k * (l.half + 1)), 1);
    });
  }

  /** The clear radius of any piece covering (x, z). */
  pieceAt(x: number, z: number): PathPiece | null {
    for (const p of this.pieceGrid.get(`${Math.floor(x / this.cell)},${Math.floor(z / this.cell)}`) ?? []) if (Math.hypot(p.x - x, p.z - z) < p.r) return p;
    // A piece near a cell's edge can reach into the next cell.
    for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) {
      if (!dx && !dz) continue;
      for (const p of this.pieceGrid.get(`${Math.floor(x / this.cell) + dx},${Math.floor(z / this.cell) + dz}`) ?? []) if (Math.hypot(p.x - x, p.z - z) < p.r) return p;
    }
    return null;
  }

  /** How far short of an area's centre its paths stop: at the edge of its clearing, so they lead
   *  into it but never run under its soundsystem, set piece or the dancefloor. */
  private clearOf(cx: number, cy: number): number {
    const m = this.map, home = cx === m.centreCell[0] && cy === m.centreCell[1];
    return home ? floorClearing(m.tuning) + 2 : m.tuning.setPieceClear * m.tuning.setPieceScale + 2;
  }
  private trim(a: { x: number; z: number }, b: { x: number; z: number }, ka: number, kb: number): [{ x: number; z: number } | null, { x: number; z: number }] {
    const dx = b.x - a.x, dz = b.z - a.z, len = Math.hypot(dx, dz);
    if (len < ka + kb + 10) return [null, b];
    return [{ x: a.x + (dx / len) * ka, z: a.z + (dz / len) * ka }, { x: b.x - (dx / len) * kb, z: b.z - (dz / len) * kb }];
  }

  /** A path of the network from one site's clearing to the other's (null: no way round the lakes or the beach between them; "meet":
   *  the two clearings all but touch, no path needed): a wandering path between the clearings' edges, its points pushed out of
   *  every circle in keepOut on the way (smoothed after), then round the lakes along their shores, as the followers go
   *  (rules/travel.ts). */
  private link(a: SiteEnd, b: SiteEnd, r: () => number, keepOut: readonly { x: number; z: number; r: number }[]): [number, number][] | null | "meet" {
    const dx = b.x - a.x, dz = b.z - a.z, len = Math.hypot(dx, dz);
    if (len - a.r - b.r < 4) return "meet";
    const ux = dx / len, uz = dz / len, half = this.map.tuning.paths.pathHalf;
    // (its ends at the clearings' edges, toward each other; one by a lake brought ashore first, so the way can bend round it)
    const B = this.map.bounds, keep = half + LINK_SHORE, shore = lakeKnobs(this.map.tuning).shore, pad = keep + shore + 1.5;
    const from = ashore(B, a.x + ux * a.r, a.z + uz * a.r, pad), to = ashore(B, b.x - ux * b.r, b.z - uz * b.r, pad);
    const x0 = Math.min(a.x, b.x) - 40, x1 = Math.max(a.x, b.x) + 40, z0 = Math.min(a.z, b.z) - 40, z1 = Math.max(a.z, b.z) + 40;
    const near = keepOut.filter(o => o.x + o.r > x0 && o.x - o.r < x1 && o.z + o.r > z0 && o.z - o.r < z1);
    // Round what it must keep out of (the dancefloor, the treehouse, the stones and special sites on the way): a corner put out past
    // the deepest one it runs into, beside it on the side the path passed, and the corners rounded again; a few times over.
    const P = footCorners(from, to, r);
    let pts = rounded(P);
    for (let k = 0; k < 8; k++) {
      let worst: { o: (typeof near)[number]; p: [number, number]; d: number } | null = null;
      for (let i = 1; i < pts.length - 1; i++) for (const o of near) {
        const p = pts[i], d = Math.hypot(p[0] - o.x, p[1] - o.z) - (o.r + half + 1);
        if (d < 0 && (!worst || d < worst.d)) worst = { o, p, d };
      }
      if (!worst) break;
      const { o, p } = worst, ex = p[0] - o.x, ez = p[1] - o.z, e = Math.hypot(ex, ez), nx = e > 1e-6 ? ex / e : -uz, nz = e > 1e-6 ? ez / e : ux, R = o.r + half + 6;
      const v: [number, number] = [o.x + nx * R, o.z + nz * R], at = (q: readonly [number, number]) => (q[0] - from.x) * ux + (q[1] - from.z) * uz;
      // (in order along the way; a corner already within FOOT_GAP / 2 of it gives way to it, so no two crowd into a kink)
      let i = 1;
      while (i < P.length - 1 && at(P[i]) < at(v)) i++;
      if (i < P.length - 1 && Math.hypot(P[i][0] - v[0], P[i][1] - v[1]) < FOOT_GAP / 2) P.splice(i, 1, v);
      else if (i > 1 && Math.hypot(P[i - 1][0] - v[0], P[i - 1][1] - v[1]) < FOOT_GAP / 2) P.splice(i - 1, 1, v);
      else P.splice(i, 0, v);
      pts = rounded(P);
    }
    // Round the lakes: kept LINK_SHORE metres more than its half off the bare shore (clipToBeach cuts it there), along the shore where it crosses.
    const wet = (q: [number, number][]) => q.some(p => onLake(B, p[0], p[1], keep + shore));
    if (B.lakes && wet(pts)) {
      // (first, one wide bend round it: a corner out to either side of the way's middle, nearer first, clear of the keep-outs too)
      const mx = (from.x + to.x) / 2, mz = (from.z + to.z) / 2, clear = (q: [number, number][]) => q.every((p, i) => i === 0 || i === q.length - 1 || near.every(o => Math.hypot(p[0] - o.x, p[1] - o.z) >= o.r + half + 1));
      bend: for (const off of [25, 40, 60, 85, 115, 150]) for (const side of [1, -1]) {
        const q = rounded([[from.x, from.z], [mx - uz * off * side, mz + ux * off * side], [to.x, to.z]]);
        if (!wet(q) && clear(q)) { pts = q; break bend; }
      }
    }
    if (B.lakes && wet(pts)) {
      for (let k = 0; k < 4 && pts.some(p => onLake(B, p[0], p[1], keep + shore)); k++) pts = shoreDetours(B, pts.map(p => ashore(B, p[0], p[1], pad + k)), pad + k, 2).map(p => [p.x, p.z]);
      if (pts.some(p => onLake(B, p[0], p[1], keep + shore))) return null;
      // (the way round eased, its kinks where it meets the shore smoothed while it keeps off the water)
      for (let k = 0; k < 6; k++) {
        const eased = pts.map((p, i): [number, number] => (i === 0 || i === pts.length - 1 ? p : [p[0] * 0.5 + (pts[i - 1][0] + pts[i + 1][0]) * 0.25, p[1] * 0.5 + (pts[i - 1][1] + pts[i + 1][1]) * 0.25]));
        if (eased.some(p => onLake(B, p[0], p[1], keep + shore))) break;
        pts = eased;
      }
    }
    const sand = beachOf(B, this.map.tuning);
    if (sand && pts.some(p => sand.intoSand(p[0], p[1]) > -(half + 8))) return null;
    return pts;
  }

  /** A wandering line from a to b (the streams'): a curve through a few points nudged sideways by noise, bending to alternate sides. */
  private meander(a: { x: number; z: number }, b: { x: number; z: number }, r: () => number): [number, number][] {
    const dx = b.x - a.x, dz = b.z - a.z, len = Math.max(1, Math.hypot(dx, dz)), n = Math.max(2, Math.round(len / 25));
    const ctrl: [number, number][] = [[a.x, a.z]];
    // Bends to alternate sides (an S, never a straight line), each a random share of the swing.
    const swing = Math.min(18, len * 0.15), side = r() < 0.5 ? 1 : -1;
    for (let i = 1; i < n; i++) {
      const k = i / n, off = swing * (0.4 + 0.6 * r()) * (i % 2 ? side : -side);
      ctrl.push([a.x + dx * k - (dz / len) * off, a.z + dz * k + (dx / len) * off]);
    }
    ctrl.push([b.x, b.z]);
    return spline(ctrl, 2);
  }

  /** The nearest path, road or railway corridor at (x, z), if within `extra` metres of its edge. */
  at(x: number, z: number, extra = 0): PathHit | null {
    const list = this.grid.get(`${Math.floor(x / this.cell)},${Math.floor(z / this.cell)}`);
    if (!list) return null;
    let best: PathHit | null = null;
    for (const [li, si] of list) {
      const l = this.lines[li], [a, c] = [l.pts[si], l.pts[si + 1]];
      const ex = c[0] - a[0], ez = c[1] - a[1], L2 = ex * ex + ez * ez || 1;
      const u = clamp(((x - a[0]) * ex + (z - a[1]) * ez) / L2, 0, 1), d = Math.hypot(x - a[0] - ex * u, z - a[1] - ez * u);
      if (d > l.half + extra) continue;
      if (!best || d - l.half < best.d - this.lines[best.line].half) best = { kind: l.kind, line: li, d, seg: si };
    }
    return best;
  }

  /** How a point's trees and bushes are changed by the corridors: trees (0 on a corridor; a few on a
   *  broken railway, between the sleepers), bushes (0 on it, bushBoost along its edges). */
  clearance(x: number, z: number): { trees: number; bushes: number } {
    if (this.pieces.length && this.pieceAt(x, z)) return { trees: 0, bushes: 0 };
    const T = this.map.tuning.paths, h = this.at(x, z, T.edgeBushes);
    if (!h) return { trees: 1, bushes: 1 };
    const half = this.lines[h.line].half;
    if (h.d > half) return { trees: 1, bushes: T.bushBoost };
    if (h.kind === "rail" && this.railBroken(x, z)) return { trees: T.treesOnBroken, bushes: 1 };
    return { trees: 0, bushes: 0 };
  }

  /** Whether a railway is broken here (no track: trees may grow), by a noise along the line. */
  railBroken(x: number, z: number): boolean {
    return vnoise(x / 60, z / 60, this.map.seed + 817) < this.map.tuning.paths.railBroken;
  }
}

/** A footpath's line from a to b (Ed, 2026-11-03: "Now that we will need a lot more footpaths ... They should also have straight
 *  sections, and gentle curves."): straight runs joined by wide bends, never a zig-zag (footCorners, then rounded). Seeded by `r`. */
export function footpath(a: { x: number; z: number }, b: { x: number; z: number }, r: () => number, step = 2): [number, number][] {
  return rounded(footCorners(a, b, r), step);
}

/** A footpath's corners (its straight runs' ends), a to b: none on a way under 40 m; else one to three, about one a FOOT_RUN metres
 *  and (but for a short way's one) never nearer than FOOT_GAP to each other or the ends, each a little to one side of the straight
 *  line (at most FOOT_SWAY metres, and a fifth of the run before it), so no turn is sharp and no path ruler-straight. */
export const FOOT_RUN = 80, FOOT_GAP = 45, FOOT_SWAY = 14, FOOT_RADIUS = 45;
export function footCorners(a: { x: number; z: number }, b: { x: number; z: number }, r: () => number): [number, number][] {
  const dx = b.x - a.x, dz = b.z - a.z, len = Math.max(1e-6, Math.hypot(dx, dz)), ux = dx / len, uz = dz / len;
  const most = Math.max(1, Math.min(3, Math.floor(len / FOOT_GAP) - 1)), want = Math.round((len / FOOT_RUN) * (0.6 + 0.8 * r()));
  const n = len < 40 ? 0 : Math.max(1, Math.min(most, want)), run = len / (n + 1), sway = Math.min(FOOT_SWAY, run / 5), P: [number, number][] = [[a.x, a.z]];
  for (let i = 1; i <= n; i++) {
    const along = (i + (r() - 0.5) * 0.3) * run, off = (r() < 0.5 ? -1 : 1) * (0.4 + 0.6 * r()) * sway;
    P.push([a.x + ux * along - uz * off, a.z + uz * along + ux * off]);
  }
  P.push([b.x, b.z]);
  return P;
}

/** A line through corners P, every corner rounded off by a circular arc of FOOT_RADIUS metres (smaller only where its runs are too
 *  short to hold it: its tangent points no more than 45 % along either run), sampled every `step` metres; its ends P's. */
export function rounded(P: readonly [number, number][], step = 2): [number, number][] {
  const out: [number, number][] = [];
  const line = (p: [number, number], q: [number, number]) => {
    const L = Math.hypot(q[0] - p[0], q[1] - p[1]), m = Math.max(1, Math.ceil(L / step));
    for (let k = out.length ? 1 : 0; k <= m; k++) out.push([p[0] + ((q[0] - p[0]) * k) / m, p[1] + ((q[1] - p[1]) * k) / m]);
  };
  let from = P[0];
  for (let i = 1; i < P.length - 1; i++) {
    const p = P[i], ax = p[0] - P[i - 1][0], az = p[1] - P[i - 1][1], bx = P[i + 1][0] - p[0], bz = P[i + 1][1] - p[1];
    const la = Math.hypot(ax, az), lb = Math.hypot(bx, bz), turn = Math.acos(Math.max(-1, Math.min(1, (ax * bx + az * bz) / (la * lb || 1))));
    if (turn < 1e-3 || la < 1e-6 || lb < 1e-6) continue;
    const t = Math.min(FOOT_RADIUS * Math.tan(turn / 2), 0.45 * la, 0.45 * lb), R = t / Math.tan(turn / 2);
    const t0: [number, number] = [p[0] - (ax / la) * t, p[1] - (az / la) * t], t1: [number, number] = [p[0] + (bx / lb) * t, p[1] + (bz / lb) * t];
    line(from, t0);
    // (the arc: its centre R off the first run toward the turn's inside, swept through the turn)
    const side = Math.sign(ax * bz - az * bx) || 1, cx = t0[0] - (az / la) * R * side, cz = t0[1] + (ax / la) * R * side;
    const a0 = Math.atan2(t0[1] - cz, t0[0] - cx), steps = Math.max(1, Math.ceil((R * turn) / step));
    for (let k = 1; k <= steps; k++) { const ang = a0 + side * turn * (k / steps); out.push([cx + Math.cos(ang) * R, cz + Math.sin(ang) * R]); }
    out[out.length - 1] = t1;
    from = t1;
  }
  line(from, P[P.length - 1] as [number, number]);
  return out;
}

/** Where segments ab and cd cross, if they do. */
function crossPoint(a: [number, number], b: [number, number], c: [number, number], d: [number, number]): [number, number] | null {
  const r = [b[0] - a[0], b[1] - a[1]], q = [d[0] - c[0], d[1] - c[1]], den = r[0] * q[1] - r[1] * q[0];
  if (Math.abs(den) < 1e-9) return null;
  const t = ((c[0] - a[0]) * q[1] - (c[1] - a[1]) * q[0]) / den, u = ((c[0] - a[0]) * r[1] - (c[1] - a[1]) * r[0]) / den;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? [a[0] + r[0] * t, a[1] + r[1] * t] : null;
}
