// Lakes (Ed, 2026-10-11, the journey's irregular islands and lakes: rules/lakes.ts): from phase 1, never home or its neighbours,
// the island still its size and joined, nothing placed for play on the water, she and the creatures stopped at the shore, her
// never landing on the water, routes round them, and their koi.
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { generateMap, type ForestMap } from "./map";
import { soundsystemFor } from "./party";
import { creaturesAshore, koiPonds, lakeDepth, lakeKnobs, roundLakes, stopAtShore } from "./lakes";
import { newGame } from "./game";
import { newWitch, stepWitch, NO_INTENT, type WitchState } from "./witch";
import { planRoute, stepTraveller } from "./travel";
import { lakePlan, placeLakes, SHAPES } from "./islandGrowth";

// Retain the 10–50-area phase matrix: inland lakes, connectivity, shoreline routes and chart loops depend on island extent.
const isle = (phase: number): Tuning => ({ ...TUNING, map: { ...TUNING.map!, islandAreas: phase ? 10 * phase : 10, island: "", phase } });
const maps = new Map<string, ForestMap>();
const mapOf = (phase: number, seed: number) => { const k = `${phase}:${seed}`; if (!maps.has(k)) maps.set(k, generateMap(seed, isle(phase))); return maps.get(k)!; };
/** A point on a lake's water, its deepest sample. */
/** Metres of a polyline over a lake's water (every 2 m along it). */
const wetMetres = (B: ForestMap["bounds"], pts: readonly { x: number; z: number }[]) => { let w = 0; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], d = Math.hypot(b.x - a.x, b.z - a.z), n = Math.max(1, Math.ceil(d / 2)); for (let k = 1; k <= n; k++) if (lakeDepth(B, a.x + ((b.x - a.x) * k) / n, a.z + ((b.z - a.z) * k) / n) > 0) w += d / n; } return w; };
const deepest = (m: ForestMap) => { const L = m.bounds.lakes!; let best = 0; for (let k = 0; k < L.dist.length; k++) if (L.dist[k] > L.dist[best]) best = k; return { x: L.x0 + (best % L.cols) * L.step, z: L.z0 + Math.floor(best / L.cols) * L.step, d: L.dist[best] }; };

describe("lakes", () => {
  it("none on home's island (phase 0); from phase 1 some, more by phase", () => {
    expect(lakePlan(SHAPES[0], 1)).toEqual([]);
    for (const seed of [1, 2, 3]) expect(lakePlan(SHAPES[1], seed).length).toBeGreaterThan(0);
    const total = (p: number) => [1, 2, 3, 4, 5, 6].reduce((t, s) => t + lakePlan(SHAPES[p], s).reduce((a, b) => a + b, 0), 0);
    expect(total(5)).toBeGreaterThan(total(1));
    const home = mapOf(0, 1);
    expect(home.bounds.lakes).toBeUndefined();
  });

  it("never home or its neighbours, the rest of the island its size and joined", () => {
    // (a strip of areas: 0 home, 1 its neighbour, ... 9; lakes may take 2 to 8)
    const order = Array.from({ length: 10 }, (_, i) => `${i},0`), nb = new Map(order.map((k, i) => [k, new Set([i > 0 ? `${i - 1},0` : "", i < 9 ? `${i + 1},0` : ""].filter(Boolean))]));
    const { lakes, playable } = placeLakes(order, 7, [1], nb, 1);
    // a strip can't lose an area from its middle and stay joined: the lake is its far end
    expect([...lakes]).toEqual(["9,0"]);
    expect(playable.length).toBe(8);
    for (const phase of [2, 4]) for (const seed of [1, 2]) {
      const m = mapOf(phase, seed), home = m.centreCell.join(","), keys = new Set(m.cells.map(c => c.join(",")));
      expect(m.cells.length).toBe(10 * phase + 1);
      const lakes: string[] = [];
      for (const k of m.neighbours.keys()) { const [x, y] = k.split(",").map(Number); if (m.isLake(x, y)) lakes.push(k); }
      expect(lakes.length).toBeGreaterThan(0);
      for (const k of lakes) { expect(k).not.toBe(home); expect(m.neighbours.get(home)!.has(k)).toBe(false); expect(keys.has(k)).toBe(false); }
      const seen = new Set([home]), todo = [home];
      while (todo.length) for (const k of m.neighbours.get(todo.pop()!) ?? []) if (keys.has(k) && !seen.has(k)) { seen.add(k); todo.push(k); }
      expect(seen.size).toBe(keys.size);
    }
  }, 120000);

  it("lies inland: its water well clear of the sea, the island's land one piece round it", () => {
    for (const seed of [1, 2]) {
      const m = mapOf(4, seed), L = m.bounds.land!, W = m.bounds.lakes!;
      expect(L.loops.filter(l => l.sea).length).toBe(1);
      for (let k = 0; k < W.dist.length; k += 7) if (W.dist[k] > 0) expect(L.distAt(W.x0 + (k % W.cols) * W.step, W.z0 + Math.floor(k / W.cols) * W.step)).toBeGreaterThan(100);
    }
  }, 120000);

  it("nothing placed for play on the water or its shore", () => {
    for (const seed of [1, 2]) {
      const m = mapOf(4, seed), B = m.bounds, shore = TUNING.lakes?.shore ?? 4;
      for (const c of m.cells) { const s = soundsystemFor(m, c); expect(lakeDepth(B, s.x, s.z), `soundsystem ${c}`).toBeLessThan(-shore); }
      for (const lc of m.legendClearings) expect(lakeDepth(B, lc.x, lc.z) + lc.r).toBeLessThan(0);
      for (const c of m.cells) { const p = m.setPieceSpot(c[0], c[1]); if (p) expect(lakeDepth(B, p.x, p.z)).toBeLessThan(0); }
      expect(lakeDepth(B, m.dancefloor.x, m.dancefloor.z)).toBeLessThan(-100);
      for (const g of [...m.grounds, ...m.scenes]) expect(lakeDepth(B, g.x, g.z) + g.r).toBeLessThan(0);
      // and no tree or anything hard-cleared on it
      const p = deepest(m);
      expect(m.hardClear(p.x, p.z)).toBe(true);
      for (const l of m.paths.lines) for (const q of l.pts) expect(lakeDepth(B, q[0], q[1])).toBeLessThan(0);
    }
  }, 120000);

  it("stops her on foot at the shore, sliding along it; over the water she never lands", () => {
    const m = mapOf(4, 1), B = m.bounds, W = B.lakes!, p = deepest(m), pad = TUNING.lakes?.pad ?? 1.5;
    // walking straight in from 20 m ashore
    const n = W.inward(p.x, p.z), s = W.shore(p.x, p.z), start = { x: s.x + s.nx * 20, z: s.z + s.nz * 20 };
    let w = newWitch(start.x, start.z);
    const into = { x: s.x - start.x, z: s.z - start.z }, len = Math.hypot(into.x, into.z);
    for (let i = 0; i < 600; i++) w = stepWitch(w, { moveX: into.x / len, moveZ: into.z / len, toggleMode: false }, 1 / 60, TUNING, B);
    expect(lakeDepth(B, w.x, w.z)).toBeLessThanOrEqual(-pad + 0.05);
    expect(n).toBeTruthy();
    // up in the treetops she flies over it, and coming down over it she holds off the water
    let f: WitchState = { ...newWitch(p.x, p.z), lift: 1, mode: "treetop" };
    f = stepWitch(f, { ...NO_INTENT, toggleMode: true }, 1 / 60, TUNING, B);
    for (let i = 0; i < 600; i++) f = stepWitch(f, NO_INTENT, 1 / 60, TUNING, B);
    expect(f.mode).not.toBe("ground");
    expect(f.lift).toBeGreaterThan(0);
    // and lands once she's ashore
    const out = W.shore(f.x, f.z), dir = { x: out.x - f.x, z: out.z - f.z }, dl = Math.hypot(dir.x, dir.z);
    for (let i = 0; i < 1200 && f.mode !== "ground"; i++) f = stepWitch(f, { moveX: dir.x / dl, moveZ: dir.z / dl, toggleMode: false }, 1 / 60, TUNING, B);
    expect(f.mode).toBe("ground");
    expect(lakeDepth(B, f.x, f.z)).toBeLessThan(0);
  }, 120000);

  it("puts every creature on foot back on the shore, sliding toward where it's going; those in the air pass over", () => {
    const m = mapOf(4, 1), B = m.bounds, p = deepest(m), pad = 1.5, W = B.lakes!, s = W.shore(p.x, p.z);
    const far = { x: p.x - (s.x - p.x) * 3, z: p.z - (s.z - p.z) * 3 };
    const walker = { x: s.x - s.nx * 0.5, z: s.z - s.nz * 0.5, tx: far.x, tz: far.z }, flyer = { ...walker, leap: {} }, ashoreOne = { x: s.x + s.nx * 10, z: s.z + s.nz * 10, tx: 0, tz: 0 };
    creaturesAshore([walker, flyer, ashoreOne], B, pad);
    expect(lakeDepth(B, walker.x, walker.z)).toBeLessThanOrEqual(-pad + 0.05);
    expect(lakeDepth(B, flyer.x, flyer.z)).toBeGreaterThan(-pad);
    expect(ashoreOne.x).toBe(s.x + s.nx * 10);
    // walking at the water, it slides along the shore, never onto it
    const c = { x: s.x + s.nx * 2, z: s.z + s.nz * 2, tx: far.x, tz: far.z };
    for (let i = 0; i < 200; i++) { const dx = c.tx - c.x, dz = c.tz - c.z, d = Math.hypot(dx, dz); c.x += (dx / d) * 0.05; c.z += (dz / d) * 0.05; creaturesAshore([c], B, pad); }
    expect(lakeDepth(B, c.x, c.z)).toBeLessThanOrEqual(-pad + 0.05);
    // and one marching on something across the lake (roundLakes, as combat steers) goes round it and gets there
    const m2 = { x: s.x + s.nx * 30, z: s.z + s.nz * 30 }, goal = { x: p.x + (p.x - m2.x), z: p.z + (p.z - m2.z) }, to = W.shore(goal.x, goal.z), dest = lakeDepth(B, goal.x, goal.z) > 0 ? { x: to.x + to.nx * 20, z: to.z + to.nz * 20 } : goal;
    const mc = { x: m2.x, z: m2.z, tx: dest.x, tz: dest.z };
    let i = 0;
    for (; i < 20000 && Math.hypot(mc.x - dest.x, mc.z - dest.z) > 2; i++) { const q = roundLakes(B, mc.x, mc.z, dest.x, dest.z, 8) ?? dest, dx = q.x - mc.x, dz = q.z - mc.z, d = Math.hypot(dx, dz); if (d > 1e-6) { mc.x += (dx / d) * Math.min(d, 0.1); mc.z += (dz / d) * Math.min(d, 0.1); } creaturesAshore([mc], B, pad); expect(lakeDepth(B, mc.x, mc.z)).toBeLessThan(0); }
    expect(i).toBeLessThan(20000);
    expect(stopAtShore(B, 0, 0, ashoreOne.x, ashoreOne.z, pad)).toBeNull();
  }, 120000);

  it("routes a travelling animal round a lake", () => {
    const m = mapOf(4, 1), B = m.bounds, p = deepest(m), W = B.lakes!, s = W.shore(p.x, p.z);
    const a = { x: s.x + s.nx * 40, z: s.z + s.nz * 40 }, b = { x: p.x - (a.x - p.x), z: p.z - (a.z - p.z) };
    const route = planRoute(m, a.x, a.z, b.x, b.z);
    for (const q of route.slice(1, -1)) expect(lakeDepth(B, q.x, q.z)).toBeLessThan(0);
    // and every stretch between them (Ed, 2026-10-12: each point pushed ashore alone left one stretch across the water)
    expect(wetMetres(B, route)).toBe(0);
  }, 120000);

  it("a leashed animal travelling to her across a lake (Ed, 2026-10-12) walks round its shore, never on the water, and its drawn route is where it goes", () => {
    const g = newGame(1, isle(4)), m = g.map, B = m.bounds, p = deepest(m), W = B.lakes!, s = W.shore(p.x, p.z);
    const a = { x: s.x + s.nx * 40, z: s.z + s.nz * 40 }, her = { x: p.x - (a.x - p.x), z: p.z - (a.z - p.z) };
    expect(wetMetres(B, [a, her])).toBeGreaterThan(20); // (the lake lies between them)
    const c = g.creatures.find(k => !k.boss && !k.gone)!;
    Object.assign(c, { x: a.x, z: a.z, tx: a.x, tz: a.z, leashed: true, travelling: true, route: undefined, fight: undefined });
    const pad = lakeKnobs(g.tuning).pad, walked: { x: number; z: number }[] = [{ x: c.x, z: c.z }];
    let i = 0;
    for (; i < 60 * 600 && Math.hypot(c.x - her.x, c.z - her.z) > 30; i++) {
      stepTraveller(c, her.x, her.z, m, 1 / 60, g.tuning);
      creaturesAshore([c], B, pad); // (as the game does after every move)
      expect(lakeDepth(B, c.x, c.z)).toBeLessThan(0);
      if (i % 30 === 0) walked.push({ x: c.x, z: c.z });
    }
    expect(i).toBeLessThan(60 * 600); // (it got to her)
    expect(wetMetres(B, walked)).toBe(0);
    expect(wetMetres(B, c.route!.points)).toBe(0); // (the leash drawn along it: render/leash.ts)
    // her hovering over the lake in the treetops: the route ends on the shore nearest her, not out on the water
    const over = planRoute(m, a.x, a.z, p.x, p.z), end = over[over.length - 1];
    expect(lakeDepth(B, end.x, end.z)).toBeLessThan(0);
    expect(wetMetres(B, over)).toBe(0);
  }, 120000);

  it("has koi in some lakes: seeded, all or none at the share's ends", () => {
    const m = mapOf(5, 2), B = m.bounds, lakes = B.lakes!.loops.filter(l => l.sea).length;
    expect(koiPonds(B, 1, 1).length).toBe(lakes);
    expect(koiPonds(B, 1, 0)).toEqual([]);
    const k = koiPonds(B, 3, 0.5);
    expect(koiPonds(B, 3, 0.5)).toBe(k);
    for (const pond of koiPonds(B, 4, 1)) { expect(lakeDepth(B, pond.x, pond.z)).toBeGreaterThan(0); expect(pond.count).toBeGreaterThanOrEqual(2); expect(pond.count).toBeLessThanOrEqual(5); }
  }, 120000);
});

describe("lakes on the sea chart", () => {
  it("islandOutline gives a lake's shore as a loop of its own (not the sea's), inside the coast", async () => {
    const { islandOutline } = await import("./islandShape");
    const out = islandOutline({ kind: "test", phase: 4, bearing: 0, size: 40, seed: 1, roster: [] }, isle(4), 16);
    const lakes = out.loops.filter(l => !l.sea), sea = out.loops.filter(l => l.sea);
    expect(sea.length).toBe(1);
    expect(lakes.length).toBeGreaterThan(0);
    // (land on the left: a lake's loop runs clockwise round its water, its signed area the other way from the coast's)
    const area = (pts: Float32Array) => { let a = 0; for (let i = 0; i < pts.length; i += 2) { const j = (i + 2) % pts.length; a += pts[i] * pts[j + 1] - pts[j] * pts[i + 1]; } return a / 2; };
    for (const l of lakes) expect(Math.sign(area(l.pts))).toBe(-Math.sign(area(sea[0].pts)));
  }, 120000);
});

describe("lakes among the hills", () => {
  it("lie level in a hollow: one flat water, the ground easing down to it round the shore and never under it", async () => {
    const { terrainAt, drawnHills, lakeLevel, hillsAt, layoutBias, LAKE_EASE } = await import("./terrain");
    for (const seed of [1, 2]) {
      const m = mapOf(4, seed), B = m.bounds, W = B.lakes!, H = drawnHills(m.tuning);
      expect(H.on).toBe(true);
      for (const l of W.loops) {
        if (!l.sea) continue;
        const p0 = W.along(W.loops.indexOf(l), 0), level = lakeLevel(m, p0.x - p0.nx * 3, p0.z - p0.nz * 3, H)!;
        for (let s = 0; s < l.length; s += 15) {
          const p = W.along(W.loops.indexOf(l), s);
          // on the water: the level itself
          if (lakeDepth(B, p.x - p.nx * 4, p.z - p.nz * 4) > 0) expect(terrainAt(m, p.x - p.nx * 4, p.z - p.nz * 4, H)).toBeCloseTo(level, 5);
          // round the shore: at or above it, and never steeper than the hills may be (the camera sees over it)
          // (the bowl no steeper than LAKE_SLOPE of the hills' limit, or than the hills themselves there)
          const raw = (q: number) => hillsAt(p.x + p.nx * q, p.z + p.nz * q, m.seed + 6113, H) + H.amplitude * layoutBias(m, p.x + p.nx * q, p.z + p.nz * q);
          let was = terrainAt(m, p.x, p.z, H);
          for (let o = 2; o <= 80; o += 2) {
            const h = terrainAt(m, p.x + p.nx * o, p.z + p.nz * o, H);
            if (o < LAKE_EASE) expect(h).toBeGreaterThanOrEqual(level - 1e-6);
            expect((h - was) / 2, `slope at ${o} m (seed ${seed})`).toBeLessThan(Math.max(H.maxSlope!, Math.abs(raw(o) - raw(o - 2)) / 2) + 0.02); // (the bowl rises at LAKE_SLOPE of the limit; where two bowls or the hills meet, never past the limit)
            was = h;
          }
        }
      }
    }
  }, 120000);
});
