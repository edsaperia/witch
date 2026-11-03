// The path network, the stones' spacing and the find's own area (Ed, 2026-11-03): "Path network - Each non-lake area has a stump
// site or a special site (find and challenge areas); paths link each of these sites to the sites in adjacent areas. Paths don't
// have trees on them."; "Min 40 m between stumps."; "We can also have finds be at the site of their own area rather than in a
// random place, and then the path network can lead you to them."
import { describe, expect, it } from "vitest";
import { generateMap, type ForestMap } from "./map";
import { Forest } from "./forest";
import { placeTrunk } from "./finds";
import { placeRelics } from "./legends";
import { routeOf } from "./party";
import { spawnCreatures } from "./creatures";
import { rosterOf } from "./rosters";
import { AREA_TYPES } from "./map";
import { footpath, FOOT_RADIUS } from "./paths";
import { rng } from "./random";
import { TUNING, type Tuning } from "./tuning";

const islandOf = (kind: string): Tuning => ({ ...TUNING, map: { ...TUNING.map!, island: kind, islandAreas: 10 } }); // (the game's islands)
const key = (c: readonly [number, number]) => `${c[0]},${c[1]}`;
const cellOf = (k: string): [number, number] => { const [x, y] = k.split(",").map(Number); return [x, y]; };
/** A line's tightest bend (m: the radius over any 10 m of it) and its share of straight 2 m steps. */
function bends(pts: readonly [number, number][]): { tightest: number; straight: number } {
  const head = (i: number) => Math.atan2(pts[i + 1][1] - pts[i][1], pts[i + 1][0] - pts[i][0]);
  const turn = (a: number, b: number) => { let d = b - a; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return Math.abs(d); };
  let tightest = Infinity, straight = 0;
  for (let i = 0; i + 2 < pts.length; i++) if (turn(head(i), head(i + 1)) < 0.004) straight++;
  for (let i = 0; i + 6 < pts.length; i++) {
    let L = 0;
    for (let k = i; k < i + 5; k++) L += Math.hypot(pts[k + 1][0] - pts[k][0], pts[k + 1][1] - pts[k][1]);
    const t = turn(head(i), head(i + 5));
    if (t > 1e-6) tightest = Math.min(tightest, L / t);
  }
  return { tightest, straight: straight / Math.max(1, pts.length - 2) };
}
const isHome = (m: ForestMap, c: readonly [number, number]) => c[0] === m.centreCell[0] && c[1] === m.centreCell[1];
const stonesOf = (m: ForestMap) => m.cells.filter(c => !isHome(m, c)).map(c => ({ cell: key(c), ...m.soundsystemSpot(c[0], c[1]) }));
/** Every area with a site: the stones' areas, home and the special sites' areas. */
const sitedOf = (m: ForestMap) => new Set([...m.cells.map(key), ...m.specialSites.map(s => key(s.cell))]);

// (the home island over many nights, a small and a large island with lakes)
const MAPS: [string, number][] = [...[1, 2, 3, 4, 5, 6, 7, 8].map((s): [string, number] => ["home", s]), ["fox", 1], ["tiger", 2], ["lion", 1], ["bear", 3]];
const made = new Map<string, ForestMap>();
const mapOf = (kind: string, seed: number) => { const k = `${kind} ${seed}`; let m = made.get(k); if (!m) made.set(k, (m = generateMap(seed, islandOf(kind)))); return m; };

describe("the stones' spacing (stoneMinGap)", () => {
  it("keeps every two stones, and every stone and special site, at least stoneMinGap (40 m) apart", () => {
    const short: string[] = [];
    for (const [kind, seed] of MAPS) {
      const m = mapOf(kind, seed), gap = m.tuning.stoneMinGap!, pts = [...stonesOf(m), ...m.specialSites.map(s => ({ cell: key(s.cell), x: s.x, z: s.z }))];
      expect(gap).toBe(40);
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].z - pts[j].z);
        if (d < gap) short.push(`${kind} ${seed}: ${pts[i].cell} and ${pts[j].cell} ${d.toFixed(1)} m`);
      }
    }
    expect(short).toEqual([]);
  }, 300000);

  it("holds with the sites anywhere in their cells (siteMargin 0), stones moved apart where they'd stand near", () => {
    const short: string[] = [];
    let moved = 0;
    for (const seed of [1, 2, 3, 4, 5, 6]) {
      const t = { ...islandOf("home"), siteMargin: 0 }, m = generateMap(seed, t), stones = stonesOf(m);
      for (let i = 0; i < stones.length; i++) for (let j = i + 1; j < stones.length; j++) {
        const d = Math.hypot(stones[i].x - stones[j].x, stones[i].z - stones[j].z);
        if (d < 40) short.push(`${seed}: ${stones[i].cell} and ${stones[j].cell} ${d.toFixed(1)} m`);
      }
      const loose = generateMap(seed, { ...t, stoneMinGap: 0 });
      moved += stonesOf(loose).filter((s, i) => Math.hypot(s.x - stones[i].x, s.z - stones[i].z) > 0.01).length;
      for (const s of stones) expect(key(m.areaAt(s.x, s.z).cell), s.cell).toBe(s.cell);
    }
    expect(short).toEqual([]);
    expect(moved).toBeGreaterThan(0); // (some were near: the gap moved them)
  }, 300000);

  it("keeps a stone in its own area, and the same whichever area is asked for first", () => {
    const m = mapOf("home", 3), again = generateMap(3, islandOf("home"));
    for (const s of stonesOf(m)) expect(key(m.areaAt(s.x, s.z).cell), s.cell).toBe(s.cell);
    // (the other map asked last area first: placed all at once, in a fixed order)
    const back = [...again.cells].reverse().filter(c => !isHome(again, c)).map(c => ({ cell: key(c), ...again.soundsystemSpot(c[0], c[1]) }));
    expect(back.reverse()).toEqual(stonesOf(m));
  });

  it("spreads the areas' sites with siteMargin on (0 by default: it reshapes every island)", () => {
    // (a check of the partition's margin: the stones' guarantee is stoneMinGap's, above)
    for (const seed of [1, 2, 3]) {
      const m = generateMap(seed, { ...islandOf("home"), siteMargin: 0.15 }), sites = [...m.cells, ...m.specialSites.map(s => s.cell)].map(c => m.siteOf(c[0], c[1]));
      let least = Infinity;
      for (let i = 0; i < sites.length; i++) for (let j = i + 1; j < sites.length; j++) least = Math.min(least, Math.hypot(sites[i].x - sites[j].x, sites[i].z - sites[j].z));
      expect(least, `seed ${seed}`).toBeGreaterThan(40);
    }
  });
});

describe("the path network (paths.network)", () => {
  it("joins every site to every touching area's site, or (round a lake, where no way round) keeps every site reachable", () => {
    const missing: string[] = [], cut: string[] = [];
    for (const [kind, seed] of MAPS) {
      const m = mapOf(kind, seed), sited = sitedOf(m), joined = new Set<string>(), adj = new Map<string, string[]>();
      const add = (a: string, b: string) => { joined.add(a < b ? `${a}|${b}` : `${b}|${a}`); for (const [p, q] of [[a, b], [b, a]]) (adj.get(p) ?? adj.set(p, []).get(p)!).push(q); };
      for (const l of m.paths.lines) if (l.link) add(l.link[0], l.link[1]);
      for (const p of m.paths.meet) { const [a, b] = p.split("|"); add(a, b); }
      for (const a of sited) for (const b of m.neighbours.get(a) ?? []) {
        if (!sited.has(b) || a > b) continue;
        if (!joined.has(`${a}|${b}`) && !m.paths.unlinked.includes(`${a}|${b}`)) missing.push(`${kind} ${seed}: ${a}|${b}`);
      }
      // (a lake can leave a pair unjoined: then every site still reached from home's)
      const home = key(m.centreCell), seen = new Set([home]), todo = [home];
      while (todo.length) for (const q of adj.get(todo.pop()!) ?? []) if (!seen.has(q)) { seen.add(q); todo.push(q); }
      for (const s of sited) if (!seen.has(s)) cut.push(`${kind} ${seed}: ${s} (unlinked ${m.paths.unlinked.join(", ")})`);
    }
    expect(missing).toEqual([]);
    expect(cut).toEqual([]);
  });

  it("joins only touching sites, and only sites: no network path to the buffer's areas, the lakes or the legend areas", () => {
    for (const [kind, seed] of [["tiger", 2], ["home", 1]] as const) {
      const m = mapOf(kind, seed), sited = sitedOf(m);
      for (const l of m.paths.lines) if (l.link) {
        expect(sited.has(l.link[0]) && sited.has(l.link[1]), l.link.join("|")).toBe(true);
        expect(m.neighbours.get(l.link[0])?.has(l.link[1]), l.link.join("|")).toBe(true);
      }
    }
  });

  it("ends every path at the edge of its sites' clearings, never under a stone, the find or the dancefloor", () => {
    const bad: string[] = [];
    for (const [kind, seed] of MAPS.slice(0, 3).concat([["tiger", 2], ["bear", 3]])) {
      const m = mapOf(kind, seed), t = m.tuning, stumpClear = t.runeMarkers.stump!.clear, stones = stonesOf(m);
      const endOf = (k: string) => { const c = cellOf(k), sp = m.special(c[0], c[1]); if (isHome(m, c)) return { x: m.dancefloor.x, z: m.dancefloor.z, r: 0 }; if (sp) return { x: sp.x, z: sp.z, r: sp.r + 1 }; const q = m.soundsystemSpot(c[0], c[1]); return { x: q.x, z: q.z, r: stumpClear }; };
      for (const l of m.paths.lines) {
        if (!l.link) continue;
        // (each end at its own site's clearing's edge, or within it where the way round a lake brought it in; home's out past the
        // dancefloor's)
        const a = endOf(l.link[0]), b = endOf(l.link[1]), [p0, p1] = [l.pts[0], l.pts[l.pts.length - 1]];
        const fit = (p: [number, number], e: { x: number; z: number; r: number }) => { const d = Math.hypot(p[0] - e.x, p[1] - e.z); return e.r === 0 ? d > m.dancefloor.radius : d < e.r + 2 && d > t.soundsystemFootprint; };
        if (!((fit(p0, a) && fit(p1, b)) || (fit(p0, b) && fit(p1, a)))) bad.push(`${kind} ${seed} ${l.link.join("|")}: ends off its clearings`);
        // (nowhere along it over a stone, the find or the dancefloor)
        for (const p of l.pts) {
          for (const s of stones) if (Math.hypot(p[0] - s.x, p[1] - s.z) < t.soundsystemFootprint + l.half) bad.push(`${kind} ${seed} ${l.link.join("|")}: over the stone of ${s.cell}`);
          for (const s of m.specialSites) if (Math.hypot(p[0] - s.x, p[1] - s.z) < s.r) bad.push(`${kind} ${seed} ${l.link.join("|")}: over the find`);
          if (Math.hypot(p[0] - m.dancefloor.x, p[1] - m.dancefloor.z) < m.dancefloor.radius + l.half) bad.push(`${kind} ${seed} ${l.link.join("|")}: over the dancefloor`);
        }
      }
    }
    expect([...new Set(bad)]).toEqual([]);
  });

  it("keeps its paths off the lakes", () => {
    const m = mapOf("tiger", 2), b = m.bounds;
    expect(b.lakes).toBeTruthy();
    for (const l of m.paths.lines) if (l.link) for (const p of l.pts) expect(b.lakes!.distAt(p[0], p[1]), l.link.join("|")).toBeLessThan(0);
  });

  it("grows no tree or bush on a path, and no decoration within its half-width", () => {
    for (const [kind, seed] of [["home", 1], ["tiger", 2]] as const) {
      const m = mapOf(kind, seed), f = new Forest(m), links = m.paths.lines.filter(l => l.link);
      expect(links.length).toBeGreaterThan(10);
      const on: string[] = [];
      for (const l of links) for (let i = 0; i < l.pts.length; i += 6) {
        const [x, z] = l.pts[i];
        for (const t of f.treesNear(x, z, 8)) { const h = m.paths.at(t.x, t.z); if (h && h.kind === "path") on.push(`tree at ${t.x.toFixed(0)}, ${t.z.toFixed(0)}`); }
        for (const t of f.bushesNear(x, z, 8)) { const h = m.paths.at(t.x, t.z); if (h && h.kind === "path") on.push(`bush at ${t.x.toFixed(0)}, ${t.z.toFixed(0)}`); }
        for (const d of f.decorNear(x, z, 10)) { const h = m.paths.at(d.x, d.z); if (h && h.kind === "path") on.push(`decor at ${d.x.toFixed(0)}, ${d.z.toFixed(0)}`); }
      }
      expect([...new Set(on)], `${kind} ${seed}`).toEqual([]);
    }
  });

  it("runs straight with gentle curves (Ed, 2026-11-03: \"They should also have straight sections, and gentle curves\"), no zig-zag", () => {
    // (a footpath alone: its bends never tighter than FOOT_RADIUS, most of it straight)
    const r = rng(17);
    for (let i = 0; i < 200; i++) {
      const b = bends(footpath({ x: 0, z: 0 }, { x: 40 + 160 * r(), z: (r() - 0.5) * 120 }, r));
      expect(b.tightest).toBeGreaterThan(FOOT_RADIUS - 1);
      expect(b.straight).toBeGreaterThan(0.4);
    }
    // (the network's, round the stones and the lakes too: nearly all as gentle, and mostly straight)
    for (const [kind, seed] of [["home", 1], ["home", 4], ["tiger", 2], ["bear", 3]] as const) {
      const all = mapOf(kind, seed).paths.lines.filter(l => l.link).map(l => bends(l.pts));
      expect(all.filter(b => b.tightest >= 15).length / all.length, `${kind} ${seed}`).toBeGreaterThan(0.95);
      expect(all.reduce((t, b) => t + b.straight, 0) / all.length, `${kind} ${seed}`).toBeGreaterThan(0.7);
    }
  });

  it("is the same every time from the same seed", () => {
    const a = mapOf("home", 2), b = generateMap(2, islandOf("home"));
    expect(b.paths.lines.map(l => [l.kind, l.link, l.pts.length, l.pts[0], l.pts[l.pts.length - 1]])).toEqual(a.paths.lines.map(l => [l.kind, l.link, l.pts.length, l.pts[0], l.pts[l.pts.length - 1]]));
  });
});

describe("the find's own area (findArea)", () => {
  it("puts tonight's find at its own area's site, an area with no stone, wave, ley-line stop or creatures", () => {
    for (const [kind, seed] of MAPS.slice(0, 4).concat([["tiger", 2]])) {
      const m = mapOf(kind, seed), f = new Forest(m), trunk = placeTrunk(m, f, placeRelics(m, f))!;
      const finds = m.specialSites.filter(s => s.kind === "find");
      expect(finds.length, `${kind} ${seed}`).toBe(1);
      const sp = finds[0], c = sp.cell, k = key(c), site = m.siteOf(c[0], c[1]);
      // at its site (or, where its site lies in a neighbour's ground, the nearest of its own), in its own area
      expect([trunk.x, trunk.z, key(trunk.cell)]).toEqual([sp.x, sp.z, k]);
      expect(key(m.areaAt(sp.x, sp.z).cell)).toBe(k);
      if (key(m.areaAt(site.x, site.z).cell) === k && !m.paths.at(site.x, site.z, sp.r + 1)) expect(Math.hypot(sp.x - site.x, sp.z - site.z)).toBeLessThan(0.01);
      // not home, not playable: no stone, no stop on the route, no creatures of its own
      expect(isHome(m, c)).toBe(false);
      expect(m.playable(c[0], c[1])).toBe(false);
      expect(m.cells.map(key)).not.toContain(k);
      expect(routeOf(m).order).not.toContain(k);
      expect(spawnCreatures(m).filter(cr => key(cr.cell) === k)).toEqual([]);
      // its patch clear of trees
      expect(m.hardClear(sp.x, sp.z)).toBe(true);
      expect(f.treesNear(sp.x, sp.z, sp.r).filter(t => Math.hypot(t.x - sp.x, t.z - sp.z) < sp.r)).toEqual([]);
    }
  });

  it("never puts it at home or in an area touching home's (Ed, 2026-11-03: \"The challenge area shouldn't be adjacent to the home area\")", () => {
    const near: string[] = [];
    const maps: [string, number][] = [...Array.from({ length: 16 }, (_, i): [string, number] => ["home", i + 1]), ["fox", 2], ["tiger", 1], ["lion", 3], ["bear", 1]];
    for (const [kind, seed] of maps) {
      const m = mapOf(kind, seed), home = key(m.centreCell), sp = m.specialSites[0];
      expect(sp, `${kind} ${seed}`).toBeTruthy();
      if (key(sp.cell) === home || m.neighbours.get(home)?.has(key(sp.cell))) near.push(`${kind} ${seed}: ${key(sp.cell)}`);
    }
    expect(near).toEqual([]);
  }, 300000);

  it("on an island too small to keep it off home's neighbours, takes the area farthest from home", () => {
    const m = generateMap(3, { ...TUNING, map: { ...TUNING.map!, island: "", islandAreas: 3, found: [] } }), home = m.dancefloor, sp = m.specialSites[0];
    expect(sp).toBeTruthy();
    const d = (c: readonly [number, number]) => { const s = m.siteOf(c[0], c[1]); return Math.hypot(s.x - home.x, s.z - home.z); };
    for (const c of m.cells) expect(d(c), key(c)).toBeLessThanOrEqual(d(sp.cell) + 1e-6);
  });

  it("keeps the island's playable areas and its roster's kinds whichever area holds the find", () => {
    for (const seed of [1, 2, 3, 4]) {
      const m = mapOf("home", seed);
      expect(m.cells.length).toBe(11); // (home and its 10)
    }
    for (const [kind, seed] of [["tiger", 2], ["fox", 1]] as const) {
      const m = mapOf(kind, seed), kinds = new Set(m.cells.filter(c => !isHome(m, c)).map(c => AREA_TYPES[m.typeOf(c[0], c[1])].creature));
      const roster = rosterOf(m.island!.kind, m.island!.phase, m.island!.bearing, m.island!.size, m.island!.seed);
      expect(m.cells.length - 1, kind).toBe(m.island!.size);
      for (const r of roster) expect(kinds.has(r.kind), `${kind} ${seed}: ${r.kind}`).toBe(true);
    }
  });

  it("moves to another area on another night, the island's shape the same", () => {
    const at = new Set<string>(), coast = new Set<string>();
    // (on the 10-area home few areas are clear of home's neighbours: two or three)
    for (let seed = 1; seed <= 16; seed++) { const m = mapOf("home", seed); at.add(key(m.specialSites[0].cell)); coast.add(JSON.stringify(m.bounds.land!.box)); }
    console.info(`the find's areas on home over 16 nights: ${[...at].join(" ")}`);
    expect(at.size).toBeGreaterThan(1);
    expect(coast.size).toBe(1);
  }, 300000);

  it("is off with findArea off: every area its stone, the find in a wild area's woods as before", () => {
    const m = generateMap(1, { ...islandOf("home"), findArea: { on: false, clear: 6 } }), f = new Forest(m), trunk = placeTrunk(m, f, placeRelics(m, f))!;
    expect(m.specialSites).toEqual([]);
    expect(m.playable(trunk.cell[0], trunk.cell[1])).toBe(true);
  });
});
