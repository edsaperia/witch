import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { hash2 as labHash2, SPECIES_BY_ID } from "../../art/generator.js";
import { makePartition } from "./partition";
import { hash2 } from "./random";
import { AREA_TYPES, generateMap, parseSeed } from "./map";
import { Forest, crownReach, treeChance } from "./forest";
import { newWitch, stepWitch, witchHeight, NO_INTENT, canopyShown, facingAway } from "./witch";
import { newCamera, stepCamera, cameraPose } from "./camera";
import { legendChance, population, spawnCreatures, stepCreature, stepCreaturesNear } from "./creatures";
import { newGame, stepGame } from "./game";
import { newParty, spreadWave, stepParty } from "./party";
import { segmentsCross, stringsFor } from "./strings";
import { laserShow } from "./lasers";
import { borderOf } from "./borders";
import { newLeash, stepLeash, type LeashControls } from "./leash";
import { newClock, tick, MAX_STEP } from "./clock";
import { TUNING, withTuning } from "./tuning";

const map = generateMap(123, TUNING);

describe("fractal partition", () => {
  it("gives the same areas from the same seed", () => {
    const a = makePartition(77, 4), b = makePartition(77, 4);
    for (let i = 0; i < 400; i++) {
      const x = (i * 0.137) % 20, y = (i * 0.291) % 20;
      expect(a.partition(x, y)).toEqual(b.partition(x, y));
    }
    expect(a.site(3, 4)).toEqual(b.site(3, 4));
  });

  it("gives different areas from a different seed", () => {
    const a = makePartition(1, 4), b = makePartition(2, 4);
    let differ = 0;
    for (let i = 0; i < 200; i++) { const x = (i * 0.37) % 10, y = (i * 0.53) % 10; if (a.partition(x, y).join() !== b.partition(x, y).join()) differ++; }
    expect(differ).toBeGreaterThan(20);
  });

  it("keeps a point's area stable however often or in whatever order it is asked", () => {
    const p = makePartition(9, 4), pts = Array.from({ length: 300 }, (_, i) => [(i * 0.731) % 12, (i * 0.419) % 12]);
    const first = pts.map(([x, y]) => p.partition(x, y).join());
    const fresh = makePartition(9, 4), reversed = [...pts].reverse().map(([x, y]) => fresh.partition(x, y).join()).reverse();
    expect(reversed).toEqual(first);
    expect(pts.map(([x, y]) => p.partition(x, y).join())).toEqual(first);
  });

  it("puts most areas' own site inside them, and every site is fully open", () => {
    const p = makePartition(5, 4);
    let own = 0;
    for (let cx = 0; cx < 20; cx++) for (let cy = 0; cy < 20; cy++) {
      const [x, y] = p.site(cx, cy);
      if (p.partition(x, y).join() === [cx, cy].join()) { own++; expect(p.centreness(x, y, [cx, cy])).toBeCloseTo(0, 6); }
      expect(p.openness(x, y)).toBeCloseTo(0, 6);
    }
    expect(own).toBeGreaterThan(300);
  });

  it("with no layers is plain Voronoi: every point goes to its nearest site", () => {
    const p = makePartition(3, 0);
    for (let i = 0; i < 200; i++) {
      const x = 2 + (i * 0.377) % 6, y = 2 + (i * 0.613) % 6, [cx, cy] = p.partition(x, y), own = p.site(cx, cy);
      const d = Math.hypot(own[0] - x, own[1] - y);
      for (let dx = -2; dx <= 2; dx++) for (let dy = -2; dy <= 2; dy++) {
        const o = p.site(Math.floor(x) + dx, Math.floor(y) + dy);
        expect(Math.hypot(o[0] - x, o[1] - y)).toBeGreaterThanOrEqual(d - 1e-12);
      }
    }
  });

  it("matches the Witch Art Lab's makePartition point for point", () => {
    // The lab's own function, lifted out of its page and run beside the port.
    const page = readFileSync(new URL("../../tools/art-lab/witch-art-lab.html", import.meta.url), "utf8");
    const start = page.indexOf("function makePartition("), end = page.indexOf("\n}\n", start) + 2;
    const labMake = new Function("hash2", page.slice(start, end) + "\nreturn makePartition;")(labHash2);
    for (const [seed, depth] of [[3, 4], [123, 4], [8, 2], [99, 6]]) {
      const lab = labMake(seed, depth), port = makePartition(seed, depth);
      for (let i = 0; i < 500; i++) {
        const x = -2 + ((i * 0.6180339) % 24), y = -2 + ((i * 0.4142135) % 24), rc = port.partition(x, y);
        expect(rc).toEqual(lab.partition(x, y));
        expect(port.centreness(x, y, rc)).toBeCloseTo(lab.centreness(x, y, rc), 12);
      }
      expect(port.site(4, 5)).toEqual(lab.site(4, 5));
    }
  });
});

describe("the map", () => {
  it("is 20 x 20 areas with 30 area types", () => {
    expect(map.n).toBe(20);
    expect(AREA_TYPES.length).toBe(30);
    expect(map.bounds.maxX - map.bounds.minX).toBeCloseTo(19 * map.areaSize);
  });

  it("never gives two touching areas the same type", () => {
    let pairs = 0;
    const inMap = (x: number, y: number) => x >= -map.margin && y >= -map.margin && x < map.n + map.margin && y < map.n + map.margin;
    for (const [k, set] of map.neighbours) {
      const [ax, ay] = k.split(",").map(Number);
      if (!inMap(ax, ay)) continue;
      for (const o of set) {
        const [bx, by] = o.split(",").map(Number);
        if (!inMap(bx, by)) continue;
        expect(map.typeOf(ax, ay), `${k} and ${o}`).not.toBe(map.typeOf(bx, by));
        pairs++;
      }
    }
    expect(pairs).toBeGreaterThan(1000);
  });

  it("finds no touching same-type areas even when sampled more finely than it was built", () => {
    for (let j = 0; j < 400; j++) for (let i = 0; i < 400; i++) {
      const x = (i / 20) * map.areaSize, z = (j / 20) * map.areaSize;
      const a = map.areaAt(x, z), b = map.areaAt(x + map.areaSize / 20, z), c = map.areaAt(x, z + map.areaSize / 20);
      if (a.cell.join() !== b.cell.join()) expect(a.type).not.toBe(b.type);
      if (a.cell.join() !== c.cell.join()) expect(a.type).not.toBe(c.type);
    }
  });

  it("is the same map from the same seed, and another from another", () => {
    const again = generateMap(123, TUNING), other = generateMap(124, TUNING);
    const types = (m: typeof map) => Array.from({ length: 20 }, (_, i) => m.typeOf(i, 7)).join();
    expect(types(again)).toBe(types(map));
    expect(types(other)).not.toBe(types(map));
  });

  it("puts each area's centre where the partition does, through the size warp", () => {
    for (let y = 2; y < 18; y += 3) for (let x = 2; x < 18; x += 3) {
      const s = map.siteOf(x, y);
      expect(map.areaAt(s.x, s.z).openness).toBeLessThan(0.01);
    }
  });

  it("varies area sizes more with areaSizeVariance, keeping 20 x 20 areas", () => {
    const sizes = (variance: number) => {
      const m = generateMap(123, withTuning({ areaSizeVariance: variance })), count = new Map<string, number>();
      for (let j = 0; j < 200; j++) for (let i = 0; i < 200; i++) {
        const k = m.areaAt((i / 200) * 20 * m.areaSize, (j / 200) * 20 * m.areaSize).cell.join();
        count.set(k, (count.get(k) ?? 0) + 1);
      }
      const inner = [...count.entries()].filter(([k]) => { const [x, y] = k.split(",").map(Number); return x > 1 && y > 1 && x < 18 && y < 18; }).map(([, v]) => v);
      const mean = inner.reduce((a, b) => a + b, 0) / inner.length;
      return { spread: Math.sqrt(inner.reduce((a, b) => a + (b - mean) ** 2, 0) / inner.length) / mean, areas: count.size };
    };
    const flat = sizes(0), varied = sizes(1);
    expect(varied.spread).toBeGreaterThan(flat.spread * 1.4);
    expect(varied.areas).toBeGreaterThan(380);
    expect(varied.areas).toBeLessThan(470);
  });

  it("is a forest with clearings: mostly dense woods, open ground in distinct clearings with crisp-ish edges", () => {
    let dense = 0, open = 0, between = 0, n = 0;
    for (let i = 0; i < 4000; i++) {
      const x = map.bounds.minX + hash2(i, 1, 9) * (map.bounds.maxX - map.bounds.minX), z = map.bounds.minZ + hash2(i, 2, 9) * (map.bounds.maxZ - map.bounds.minZ);
      const w = map.treeWeight(x, z) / TUNING.treeDensity;
      n++;
      if (w > 0.95) dense++; else if (w < 0.05) open++; else between++;
    }
    expect(dense / n).toBeGreaterThan(0.6);
    expect(open / n).toBeGreaterThan(0.05);
    expect(between / n).toBeLessThan(0.2);
  });

  it("uses many area types", () => {
    const used = new Set<number>();
    for (let y = 0; y < 20; y++) for (let x = 0; x < 20; x++) used.add(map.typeOf(x, y));
    expect(used.size).toBeGreaterThanOrEqual(25);
  });

  it("puts the dancefloor in the clearing of the middle area, the treehouse by it, where the witch starts", () => {
    const d = map.dancefloor, a = map.areaAt(d.x, d.z);
    expect(a.cell).toEqual(map.centreCell);
    expect(Math.abs(map.centreCell[0] - 10) + Math.abs(map.centreCell[1] - 10)).toBeLessThanOrEqual(2);
    expect(a.openness).toBeLessThan(0.05);
    expect(map.treeWeight(d.x, d.z)).toBe(0);
    const th = map.treehouse, far = Math.hypot(th.x - d.x, th.z - d.z);
    expect(far).toBeGreaterThan(d.radius + TUNING.dancefloor.clearing);
    expect(far).toBeLessThan(d.radius + TUNING.dancefloor.clearing + 20);
    expect(map.hardClear(th.x, th.z)).toBe(true);
    expect(Math.hypot(map.start.x - th.x, map.start.z - th.z)).toBeLessThan(3);
  });
  it("starts the witch seated on the terrace; she stays put till the first move or rise", () => {
    const g = newGame(5, TUNING);
    expect(g.witch.seated).toBe(true);
    const still = stepWitch(g.witch, NO_INTENT, 1, TUNING, map.bounds);
    expect(still.seated).toBe(true);
    const off = stepWitch(g.witch, { ...NO_INTENT, moveX: 1 }, 0.1, TUNING, map.bounds);
    expect(off.seated).toBeFalsy();
    expect(off.x).toBeGreaterThan(g.witch.x);
  });

  it("reads seeds from the URL: numbers as they are, words hashed", () => {
    expect(parseSeed("123")).toBe(123);
    expect(parseSeed("owl")).toBe(parseSeed("owl"));
    expect(parseSeed("owl")).not.toBe(parseSeed("bat"));
    expect(parseSeed("")).toBeNull();
    expect(parseSeed(null)).toBeNull();
  });
});

describe("trees", () => {
  const forest = new Forest(map);

  it("are denser away from each area's centre, from an open clearing outward", () => {
    // Trees per square metre in bands of openness (0 at a centre, 1 midway between centres).
    const bands = [[0, TUNING.clearingSize], [0.25, 0.4], [0.7, 1.01]], trees = [0, 0, 0], ground = [0, 0, 0];
    const band = (o: number) => bands.findIndex(([lo, hi]) => o >= lo && o < hi);
    for (let cy = 3; cy < 17; cy += 3) for (let cx = 3; cx < 17; cx += 3) {
      const s = map.siteOf(cx, cy);
      for (const t of forest.treesNear(s.x, s.z, map.areaSize * 0.6)) { const b = band(map.areaAt(t.x, t.z).openness); if (b >= 0) trees[b]++; }
      for (let k = 0; k < 2025; k++) {
        const x = s.x + ((k % 45) / 45 - 0.5) * map.areaSize * 1.2, z = s.z + (Math.floor(k / 45) / 45 - 0.5) * map.areaSize * 1.2;
        const b = band(map.areaAt(x, z).openness); if (b >= 0) ground[b]++;
      }
    }
    const per = trees.map((n, i) => n / Math.max(1, ground[i]));
    expect(per[0]).toBeLessThan(per[2] * 0.3); // open, but for a few lone trees
    expect(per[0]).toBeGreaterThan(0);          // never empty
    expect(per[1]).toBeGreaterThan(per[0]);
    expect(per[1]).toBeLessThan(per[2]);
    expect(trees[2]).toBeGreaterThan(100);
  });

  it("leave the dancefloor clear, crowns and undergrowth included", () => {
    const d = map.dancefloor;
    for (const b of forest.bushesNear(d.x, d.z, 30)) expect(Math.hypot(b.x - d.x, b.z - d.z)).toBeGreaterThan(d.radius);
    for (const t of forest.treesNear(d.x, d.z, 30)) {
      expect(Math.hypot(t.x - d.x, t.z - d.z)).toBeGreaterThan(d.radius + 1);
      for (const dx of [-map.tuning.crownHalfWidth, 0, map.tuning.crownHalfWidth])
        expect(Math.hypot(t.x + dx - d.x, t.z - crownReach(map) - d.z)).toBeGreaterThan(d.radius);
    }
  });

  it("come out the same whichever patch is asked for first", () => {
    const a = new Forest(map), b = new Forest(map);
    b.treesNear(50, 50, 40);
    const key = (p: { x: number; z: number; variant: number }) => `${p.x.toFixed(3)},${p.z.toFixed(3)},${p.variant}`;
    expect(a.treesNear(200, 210, 30).map(key).sort()).toEqual(b.treesNear(200, 210, 30).map(key).sort());
  });

  it("follow the tree density setting", () => {
    const sparse = new Forest(generateMap(123, withTuning({ treeDensity: 0.3 }))), s = map.siteOf(9, 9);
    expect(sparse.treesNear(s.x, s.z, 120).length).toBeLessThan(forest.treesNear(s.x, s.z, 120).length * 0.8);
  });

  it("carry their area's type, with a ragged edge: strays only near a border", () => {
    const exact = new Forest(generateMap(123, withTuning({ areaEdgeBlend: { width: 0, scale: 24, stray: 0.5 } })));
    for (const t of exact.treesNear(1300, 1300, 120)) expect(t.type).toBe(map.areaAt(t.x, t.z).type);
    const W = TUNING.areaEdgeBlend.width, trees = forest.treesNear(1300, 1300, 160);
    let own = 0, strays = 0;
    for (const t of trees) {
      if (t.type === map.areaAt(t.x, t.z).type) { own++; continue; }
      strays++;
      // A stray's look comes from an area close by.
      let near = false;
      for (let a = 0; a < 32 && !near; a++) for (const r of [0.25, 0.5, 0.75, 1, 1.25, 1.5].map(k => k * W)) if (map.areaAt(t.x + Math.cos(a * 0.196) * r, t.z + Math.sin(a * 0.196) * r).type === t.type) near = true;
      expect(near).toBe(true);
    }
    expect(own / trees.length).toBeGreaterThan(0.6);
    expect(strays).toBeGreaterThan(0);
  });
});

describe("the witch", () => {
  const b = map.bounds;
  const fly = (w = newWitch(200, 200), steps = 120, intent = { moveX: 1, moveZ: 0, toggleMode: false }) => {
    for (let i = 0; i < steps; i++) w = stepWitch(w, intent, 1 / 60, TUNING, b);
    return w;
  };

  it("starts on the ground with the canopy hidden", () => {
    const w = newWitch(1, 2);
    expect(w.mode).toBe("ground");
    expect(canopyShown(w)).toBe(0);
    expect(witchHeight(w, TUNING)).toBe(TUNING.groundHeight);
  });

  it("flies at ground speed on the ground and treetop speed above", () => {
    const g = fly();
    expect(Math.hypot(g.vx, g.vz)).toBeCloseTo(TUNING.groundSpeed, 1);
    let t = stepWitch(newWitch(200, 200), { ...NO_INTENT, toggleMode: true }, 1 / 60, TUNING, b);
    t = fly(t, 120);
    expect(t.mode).toBe("treetop");
    expect(Math.hypot(t.vx, t.vz)).toBeCloseTo(TUNING.treetopSpeed, 1);
  });

  it("rises in riseTime and descends in descendTime: fast, but not instant", () => {
    let w = stepWitch(newWitch(200, 200), { ...NO_INTENT, toggleMode: true }, 1 / 60, TUNING, b);
    expect(w.mode).toBe("rising");
    let time = 1 / 60;
    while (w.mode === "rising") { w = stepWitch(w, NO_INTENT, 1 / 60, TUNING, b); time += 1 / 60; }
    expect(w.mode).toBe("treetop");
    expect(time).toBeCloseTo(TUNING.riseTime, 1);
    expect(witchHeight(w, TUNING)).toBe(TUNING.treetopHeight);
    expect(canopyShown(w)).toBe(1);
    w = stepWitch(w, { ...NO_INTENT, toggleMode: true }, 1 / 60, TUNING, b);
    time = 1 / 60;
    while (w.mode === "descending") { w = stepWitch(w, NO_INTENT, 1 / 60, TUNING, b); time += 1 / 60; }
    expect(w.mode).toBe("ground");
    expect(time).toBeCloseTo(TUNING.descendTime, 1);
  });

  it("turns back halfway when the button is pressed again", () => {
    let w = stepWitch(newWitch(200, 200), { ...NO_INTENT, toggleMode: true }, 0.2, TUNING, b);
    const mid = w.lift;
    w = stepWitch(w, { ...NO_INTENT, toggleMode: true }, 0.05, TUNING, b);
    expect(w.mode).toBe("descending");
    expect(w.lift).toBeLessThan(mid);
  });

  it("stays inside the map", () => {
    const w = fly(newWitch(b.maxX - 1, 200), 600);
    expect(w.x).toBe(b.maxX);
  });

  it("faces the way she flies", () => {
    expect(fly(newWitch(200, 200), 30, { moveX: -1, moveZ: 0, toggleMode: false }).facing).toBe(-1);
    expect(fly(newWitch(200, 200), 30, { moveX: 1, moveZ: 0, toggleMode: false }).facing).toBe(1);
  });

  it("is no faster diagonally", () => {
    const w = fly(newWitch(200, 200), 200, { moveX: 1, moveZ: 1, toggleMode: false });
    expect(Math.hypot(w.vx, w.vz)).toBeCloseTo(TUNING.groundSpeed, 1);
  });
});

describe("the camera", () => {
  it("uses each mode's angle and distance, and zoom moves between in and out", () => {
    let c = newCamera(withTuning({ camera: { ...TUNING.camera, startZoom: 0 } }), 0, 0, 0);
    const g = TUNING.camera.ground, t = TUNING.camera.treetop;
    expect(cameraPose(c, 0, TUNING).angle).toBeCloseTo(g.angleIn);
    expect(cameraPose(c, 1, TUNING).angle).toBeCloseTo(t.angleIn);
    expect(cameraPose(c, 1, TUNING).distance).toBeCloseTo(t.distanceIn);
    const still = { x: 0, z: 0 };
    for (let i = 0; i < 10; i++) c = stepCamera(c, 1, { x: 0, y: 0, z: 0 }, still, 0, 1 / 60, TUNING);
    for (let i = 0; i < 300; i++) c = stepCamera(c, 0, { x: 0, y: 0, z: 0 }, still, 0, 1 / 60, TUNING);
    expect(c.zoomStep).toBe(TUNING.camera.zoomSteps - 1);
    expect(cameraPose(c, 0, TUNING).distance).toBeCloseTo(g.distanceOut, 1);
    expect(cameraPose(c, 0, TUNING).angle).toBeCloseTo(g.angleOut, 1);
  });

  it("follows smoothly: never overshoots, never jolts, and looks only a little ahead", () => {
    let c = newCamera(TUNING, 0, 0, 0), prevV = 0, maxJerk = 0;
    const speed = TUNING.treetopSpeed, dt = 1 / 60;
    for (let i = 0; i < 600; i++) {
      const x = i < 300 ? speed * i * dt : speed * 300 * dt; // fly east, then stop dead
      c = stepCamera(c, 0, { x, y: 0, z: 0 }, { x: i < 300 ? speed : 0, z: 0 }, 1, dt, TUNING);
      maxJerk = Math.max(maxJerk, Math.abs(c.vx - prevV) / dt);
      prevV = c.vx;
      expect(c.tx).toBeLessThanOrEqual(speed * 300 * dt + TUNING.camera.lookAheadMax + 1e-6);
    }
    expect(Math.abs(c.tx - speed * 300 * dt)).toBeLessThan(0.5);
    expect(maxJerk).toBeLessThan(speed * TUNING.camera.follow * 1.2);
    expect(Math.abs(c.ax)).toBeLessThanOrEqual(TUNING.camera.lookAheadMax);
  });

  it("sits south of and above what it looks at", () => {
    const p = cameraPose(newCamera(TUNING, 10, 1, 10), 0, TUNING);
    expect(p.z).toBeGreaterThan(10);
    expect(p.y).toBeGreaterThan(1);
    expect(p.x).toBe(10);
    expect(Math.atan2(p.y - 1, p.z - 10) * 180 / Math.PI).toBeCloseTo(p.angle, 6);
  });
});

describe("creatures", () => {
  const all = spawnCreatures(map);
  const inCell = (x: number, y: number) => all.filter(c => c.cell[0] === x && c.cell[1] === y);
  const [mx, my] = map.centreCell;

  it("are each area's own kind, all 30 drawn by the art module", () => {
    for (const c of all.slice(0, 300)) expect(c.species).toBe(AREA_TYPES[map.typeOf(c.cell[0], c.cell[1])].creature);
    for (const t of AREA_TYPES) expect(SPECIES_BY_ID[t.creature], t.creature).toBeDefined();
    expect(new Set(AREA_TYPES.map(t => t.creature)).size).toBe(30);
  });

  it("are none in the home area, a couple of babies round it, and one legend next door", () => {
    expect(inCell(mx, my)).toEqual([]);
    for (const [dx, dy] of [[-1, 0], [0, 1], [0, -1]]) {
      const here = inCell(mx + dx, my + dy);
      expect(here.length).toBeGreaterThanOrEqual(1);
      expect(here.length).toBeLessThanOrEqual(3);
      expect(here.every(c => c.level === 0)).toBe(true);
    }
    expect(inCell(mx + 1, my).filter(c => c.level === 3).length).toBe(1);
  });

  it("grow to about 20 towards the edge, with young ones among them", () => {
    const edge = [[0, 0], [19, 0], [0, 19], [19, 19], [0, 10], [19, 10], [10, 0], [10, 19]].map(([x, y]) => inCell(x, y));
    const mean = edge.reduce((a, l) => a + l.length, 0) / edge.length;
    expect(mean).toBeGreaterThan(15);
    expect(mean).toBeLessThan(23);
    for (const l of edge.slice(0, 4)) expect(l.filter(c => c.level === 1).length).toBeGreaterThan(3);
  });

  it("have at most one legend in any area, on many seeds, and legends are rare", () => {
    let areas = 0, withLegend = 0, inner = 0;
    for (let seed = 1; seed <= 12; seed++) {
      const m = generateMap(seed * 101, TUNING), count = new Map<string, number>();
      for (const c of spawnCreatures(m)) if (c.level === 3) count.set(c.cell.join(), (count.get(c.cell.join()) ?? 0) + 1);
      for (const [k, n] of count) {
        expect(n, `seed ${seed * 101} area ${k}`).toBe(1);
        const [x, y] = k.split(",").map(Number);
        const nextToHome = x === m.centreCell[0] + 1 && y === m.centreCell[1];
        if (!nextToHome && m.remoteness(x, y) < TUNING.legendsFrom) inner++;
      }
      areas += m.n * m.n; withLegend += count.size;
    }
    expect(inner).toBe(0);
    expect(withLegend / areas).toBeLessThan(TUNING.legendChanceFar * 0.7);
    expect(withLegend).toBeGreaterThan(12);
  }, 60000);

  it("keep the legend next to home only while legendNextToHome is on", () => {
    const off = spawnCreatures(generateMap(123, withTuning({ legendNextToHome: false })));
    const [hx, hy] = map.centreCell;
    expect(off.some(c => c.level === 3 && c.cell[0] === hx + 1 && c.cell[1] === hy)).toBe(false);
  });

  it("rise with distance from home, as the tuning file says", () => {
    let last = -1;
    for (let r = 0; r <= 1.0001; r += 0.1) {
      const p = population(map, r);
      const total = p.babies + p.young + p.adults + p.legends;
      expect(total).toBeGreaterThanOrEqual(last);
      last = total;
    }
    expect(population(map, 0)).toEqual({ babies: TUNING.creaturesNear, young: 0, adults: 0, legends: 0 });
    expect(population(map, 1).adults).toBeGreaterThan(0);
    expect(population(map, TUNING.adultsFrom).adults).toBe(0);
    expect(population(map, 1).legends).toBe(0);
    expect(population(map, 1, 0.5, 0).legends).toBe(1);
    expect(legendChance(map, TUNING.legendsFrom)).toBe(0);
    expect(legendChance(map, 1)).toBeCloseTo(TUNING.legendChanceFar);
  });

  it("roam their whole area, slowly, and never leave it", () => {
    const sample = all.filter((_, i) => i % 97 === 0).slice(0, 5);
    for (const c of sample) {
      const visited = new Set<string>(), start = [c.x, c.z];
      for (let i = 0; i < 10 * 60 * 40; i++) { // forty minutes, in tenths of a second
        const px = c.x, pz = c.z;
        stepCreature(c, 1 / 10, map);
        expect(Math.hypot(c.x - px, c.z - pz)).toBeLessThanOrEqual(c.speed / 10 + 1e-9);
        if (i % 5 === 0) {
          expect(map.areaAt(c.x, c.z).cell, `creature ${c.id}`).toEqual(c.cell);
          visited.add(`${Math.floor(c.x / 8)},${Math.floor(c.z / 8)}`);
        }
      }
      // How much of its area (in 8 m squares) it has been to.
      let squares = 0;
      for (let x = c.homeX - c.range; x < c.homeX + c.range; x += 8) for (let z = c.homeZ - c.range; z < c.homeZ + c.range; z += 8) {
        const a = map.areaAt(Math.floor(x / 8) * 8 + 4, Math.floor(z / 8) * 8 + 4).cell;
        if (a[0] === c.cell[0] && a[1] === c.cell[1]) squares++;
      }
      expect(visited.size / squares, `creature ${c.id}`).toBeGreaterThan(0.4);
      expect([c.x, c.z]).not.toEqual(start);
    }
  }, 60000);

  it("only move near the witch, and pick up plausibly when she comes back", () => {
    const g = newGame(123, TUNING);
    g.clock.paused = false;
    const far = g.creatures.filter(c => Math.abs(c.homeX - g.witch.x) > TUNING.creatureSimRadius + 10);
    const before = far.map(c => [c.x, c.z, c.rest]);
    for (let i = 0; i < 300; i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 30);
    expect(far.map(c => [c.x, c.z, c.rest])).toEqual(before);
    const near = g.creatures.filter(c => Math.hypot(c.homeX - g.witch.x, c.homeZ - g.witch.z) < 300);
    expect(near.some(c => c.moving || c.rest !== 0)).toBe(true);
    if (far.length) {
      const c = far[0];
      stepCreaturesNear([c], c.homeX, c.homeZ, 50, 1 / 30, 500, g.map);
      expect(g.map.areaAt(c.x, c.z).cell).toEqual(c.cell);
    }
  });
});

describe("light sources", () => {
  const forest = new Forest(map), all = forest.lightsNear(280, 280, 280);
  it("come in all three kinds, the same from the same seed, and keep off the dancefloor", () => {
    const kinds = new Set(all.map(l => l.kind));
    expect([...kinds].sort()).toEqual(["campfire", "pond", "stone"]);
    expect(new Forest(map).lightsNear(280, 280, 280).map(l => l.x.toFixed(2)).join()).toBe(all.map(l => l.x.toFixed(2)).join());
    const d = map.dancefloor;
    for (const l of all) expect(Math.hypot(l.x - d.x, l.z - d.z)).toBeGreaterThan(d.radius + TUNING.dancefloor.clearing);
  });
  it("put more ponds in the wet areas", () => {
    const wet = new Set(["wetland", "stream", "bog", "beaver-pond", "moor"]);
    const ponds = all.filter(l => l.kind === "pond"), inWet = ponds.filter(l => wet.has(AREA_TYPES[map.areaAt(l.x, l.z).type].id)).length;
    expect(inWet / ponds.length).toBeGreaterThan(0.4);
  });
});

describe("the party", () => {
  const key = (c: readonly number[]) => c.join();
  it("starts with only home partified", () => {
    const p = newParty(map);
    expect([...p.areas.keys()]).toEqual([key(map.centreCell)]);
    expect(p.areas.get(key(map.centreCell))!.soundsystem).toBeNull();
  });
  it("spreads exactly to home's neighbours on the first wave, then ring by ring, never further", () => {
    const p = newParty(map);
    spreadWave(p, map, 30);
    const first = [...p.areas.keys()].filter(k => k !== key(map.centreCell)).sort();
    expect(first).toEqual([...map.neighbours.get(key(map.centreCell))!].sort());
    for (let w = 2; w <= 5; w++) {
      const before = new Set(p.areas.keys());
      for (const a of spreadWave(p, map, w * 30)) {
        expect([...map.neighbours.get(key(a.cell))!].some(n => before.has(n))).toBe(true);
        expect(a.wave).toBe(w);
      }
    }
  });
  it("comes in waves every interval seconds, and pauses", () => {
    const p = newParty(map), I = TUNING.party.interval, start = TUNING.party.startDelay;
    expect(stepParty(p, map, start + I - 0.1, 0.1)).toEqual([]);
    expect(stepParty(p, map, start + I, 0.1).length).toBeGreaterThan(0);
    p.paused = true;
    expect(stepParty(p, map, start + 3 * I, 0.1)).toEqual([]);
    expect(p.wave).toBe(1);
  });
  it("is the same from the same seed, and gives each new area one soundsystem in its own ground", () => {
    const a = newParty(map), b = newParty(map);
    for (let w = 1; w <= 3; w++) { spreadWave(a, map, w); spreadWave(b, map, w); }
    expect([...a.areas.keys()]).toEqual([...b.areas.keys()]);
    for (const [, area] of a.areas) {
      if (area.wave === 0) continue;
      const s = area.soundsystem!;
      expect(map.areaAt(s.x, s.z).cell).toEqual(area.cell);
      expect(s).toEqual(b.areas.get(key(area.cell))!.soundsystem);
    }
  });
});

describe("string lights", () => {
  it("hang as long runs between the area's own trees: no crossings, at most 3 ends per tree, the same every time", () => {
    const forest = new Forest(map), L = TUNING.stringLights;
    let total = 0, junctions = 0;
    for (const cell of [[map.centreCell[0] + 1, map.centreCell[1]], [map.centreCell[0], map.centreCell[1] + 1], [3, 4]] as [number, number][]) {
      const lines = stringsFor(map, forest, cell), ends = new Map<string, number>();
      total += lines.length;
      for (const l of lines) {
        const d = Math.hypot(l.ax - l.bx, l.az - l.bz);
        expect(d).toBeGreaterThanOrEqual(L.spanMin); expect(d).toBeLessThanOrEqual(L.spanMax);
        expect(map.areaAt(l.ax, l.az).cell).toEqual(cell);
        for (const k of [`${l.ax},${l.az}`, `${l.bx},${l.bz}`]) ends.set(k, (ends.get(k) ?? 0) + 1);
      }
      for (const n of ends.values()) { expect(n).toBeLessThanOrEqual(3); if (n === 3) junctions++; }
      for (let i = 0; i < lines.length; i++) for (let j = i + 1; j < lines.length; j++) {
        const a = lines[i], b = lines[j];
        expect(segmentsCross([a.ax, a.az], [a.bx, a.bz], [b.ax, b.az], [b.bx, b.bz])).toBe(false);
      }
      expect(stringsFor(map, new Forest(map), cell)).toEqual(lines);
    }
    expect(total).toBeGreaterThan(20); // long runs, not a handful of spans
    expect(junctions).toBeLessThan(total / 4);
  });
});

describe("set pieces", () => {
  it("show in a few of the areas whose type has one, never in the others", () => {
    let shown = 0, could = 0;
    for (let y = 0; y < 20; y++) for (let x = 0; x < 20; x++) {
      const t = AREA_TYPES[map.typeOf(x, y)], piece = map.setPieceOf(x, y);
      if (!t.setPiece) { expect(piece).toBeNull(); continue; }
      could++;
      if (piece) { shown++; expect(piece).toBe(t.setPiece); }
    }
    expect(shown).toBeGreaterThan(0);
    expect(shown / could).toBeLessThan(TUNING.setPieceChance * 2.5);
  });
});

describe("the game clock and a whole step", () => {
  it("does not run while paused, and cuts long frames short", () => {
    const c = newClock();
    expect(tick(c, 0.016)).toBe(0);
    c.paused = false;
    expect(tick(c, 5)).toBe(MAX_STEP);
    expect(c.time).toBe(MAX_STEP);
  });

  it("flies the witch and the camera follows", () => {
    const g = newGame(5, TUNING);
    g.clock.paused = false;
    const x0 = g.witch.x;
    for (let i = 0; i < 120; i++) stepGame(g, { moveX: 1, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60);
    expect(g.witch.x).toBeGreaterThan(x0 + 5);
    expect(g.camera.tx).toBeGreaterThan(x0 + 3);
  });
});

describe("inviting and leashing", () => {
  const creatures = spawnCreatures(map);
  const fresh = () => creatures.map(c => ({ ...c, rand: (() => { let k = c.id * 7 + 1; return () => (k = (k * 16807) % 2147483647) / 2147483647; })() }));
  const none: LeashControls = { talk: false, sigil: false };
  // Stand the witch next to a creature of the given level and talk until it is invited.
  const inviteOne = (all: ReturnType<typeof fresh>, s: ReturnType<typeof newLeash>, level: 0 | 1 | 2, time = 0) => {
    const c = all.find(k => k.level === level && !k.leashed)!;
    const w = { x: c.x + 1, z: c.z };
    let t = time;
    for (let i = 0; i < 20 * 10 && !c.leashed; i++, t += 0.1) stepLeash(s, all, { talk: true, sigil: false }, w, true, t, 0.1, TUNING);
    return { c, w, t };
  };

  it("invites after talking for the creature's talk time (babies 3 s, young 6 s, adults 12 s), not before", () => {
    for (const level of [0, 1, 2] as const) {
      const all = fresh(), s = newLeash(), c = all.find(k => k.level === level)!, w = { x: c.x + 1, z: c.z };
      const need = TUNING.invite.talkTime[level];
      let t = 0;
      for (; t < need - 0.25; t += 0.1) stepLeash(s, all, { talk: true, sigil: false }, w, true, t, 0.1, TUNING);
      expect(c.leashed).toBe(false);
      for (let i = 0; i < 6; i++, t += 0.1) stepLeash(s, all, { talk: true, sigil: false }, w, true, t, 0.1, TUNING);
      expect(c.leashed).toBe(true);
      expect(s.stack).toEqual([c.id]);
    }
  });

  it("cancels the talk when Talk is let go or she moves away, and never invites from the treetops", () => {
    const all = fresh(), s = newLeash(), c = all.find(k => k.level === 0)!, w = { x: c.x + 1, z: c.z };
    for (let t = 0; t < 2; t += 0.1) stepLeash(s, all, { talk: true, sigil: false }, w, true, t, 0.1, TUNING);
    stepLeash(s, all, none, w, true, 2, 0.1, TUNING);
    expect(s.talk).toBeNull();
    expect(s.events.map(e => e.kind)).toContain("cancelled");
    for (let t = 2; t < 2.5; t += 0.1) stepLeash(s, all, { talk: true, sigil: false }, w, true, t, 0.1, TUNING);
    expect(c.leashed).toBe(false); // picked up where it left off, not finished yet
    const s2 = newLeash(), c2 = all.find(k => k.level === 0 && k !== c)!, w2 = { x: c2.x + 1, z: c2.z };
    for (let t = 0; t < 20; t += 0.1) stepLeash(s2, all, { talk: true, sigil: false }, w2, false, t, 0.1, TUNING);
    expect(c2.leashed).toBe(false); // never from the treetops
    const far = { x: c.x + TUNING.invite.cancelDistance + 30, z: c.z };
    for (let t = 0; t < 20; t += 0.1) stepLeash(s, all, { talk: true, sigil: false }, far, true, t, 0.1, TUNING);
    expect(c.leashed).toBe(false);
  });

  it("lets a chat drain at half the fill rate when she stops, and picks up from what's left", () => {
    const all = fresh(), s = newLeash(), babies = all.filter(k => k.level === 1).slice(0, 2), c = babies[0], other = babies[1];
    const near = { x: c.x + 1, z: c.z }, total = TUNING.invite.talkTime[1];
    let t = 0;
    for (; t < 2.05; t += 0.1) stepLeash(s, all, { talk: true, sigil: false }, near, true, t, 0.1, TUNING);
    const talked = s.progress.get(c.id)!;
    expect(talked).toBeCloseTo(2, 0);
    for (let i = 0; i < 20; i++, t += 0.1) stepLeash(s, all, { talk: false, sigil: false }, near, true, t, 0.1, TUNING);
    const left = s.progress.get(c.id)!;
    expect(left).toBeCloseTo(talked - 2 * TUNING.invite.decayRate, 5); // 2 s off drains 1 s
    // Resume: done after total - 1 s more.
    let n = 0;
    while (!c.leashed && n < 400) { stepLeash(s, all, { talk: true, sigil: false }, near, true, t, 0.1, TUNING); t += 0.1; n++; }
    expect(Math.abs(n * 0.1 - (total - left))).toBeLessThanOrEqual(0.25);
    // Switching creatures: the first keeps draining while the second fills.
    const s2 = newLeash(), d = all.filter(k => k.level === 1 && !k.leashed)[1], e = other;
    for (let i = 0; i < 20; i++) stepLeash(s2, all, { talk: true, sigil: false }, { x: d.x + 1, z: d.z }, true, i * 0.1, 0.1, TUNING);
    const before = s2.progress.get(d.id)!;
    for (let i = 0; i < 10; i++) stepLeash(s2, all, { talk: true, sigil: false }, { x: e.x + 1, z: e.z }, true, 2 + i * 0.1, 0.1, TUNING);
    expect(s2.progress.get(d.id)!).toBeLessThan(before);
    expect(s2.progress.get(e.id)!).toBeGreaterThan(0);
  });

  it("can't invite legends", () => {
    const all = fresh(), s = newLeash(), legend = all.find(k => k.level === 3)!;
    for (const c of all) if (c !== legend) c.leashed = true; // only the legend is left near
    const w = { x: legend.x + 1, z: legend.z };
    for (let t = 0; t < 30; t += 0.1) stepLeash(s, all, { talk: true, sigil: false }, w, true, t, 0.1, TUNING);
    expect(legend.leashed).toBe(false);
    expect(s.talk?.refused).toBe(true); // one unimpressed look, and nothing more
    stepLeash(s, all, { talk: false, sigil: false, inviteNearest: true }, w, true, 30, 0.1, TUNING);
    expect(legend.leashed).toBe(false);
  });

  it("stacks last in, first out: places the newest, picks up back onto the bottom", () => {
    const all = fresh(), s = newLeash();
    const a = inviteOne(all, s, 0), b = inviteOne(all, s, 0, a.t), c = inviteOne(all, s, 1, b.t);
    expect(s.stack).toEqual([a.c.id, b.c.id, c.c.id]);
    const here = { x: 500, z: 500 };
    stepLeash(s, all, { talk: false, sigil: true }, here, true, 100, 0.1, TUNING);
    expect(s.placed.map(p => p.id)).toEqual([c.c.id]);
    expect(s.stack).toEqual([a.c.id, b.c.id]);
    stepLeash(s, all, { talk: false, sigil: true }, { x: 520, z: 500 }, true, 101, 0.1, TUNING);
    expect(s.placed.map(p => p.id)).toEqual([c.c.id, b.c.id]);
    // Picking up: over a placed sigil, the button puts it back on the bottom of the stack.
    stepLeash(s, all, { talk: false, sigil: true }, { x: 500.5, z: 500 }, true, 102, 0.1, TUNING);
    expect(s.stack).toEqual([a.c.id, c.c.id]);
    expect(s.placed.map(p => p.id)).toEqual([b.c.id]);
    // Not on top of another sigil (too near to put down, too far to pick up): it fizzles.
    const gap = (TUNING.leash.pickRadius + TUNING.leash.spacing) / 2;
    expect(TUNING.leash.spacing).toBeGreaterThan(TUNING.leash.pickRadius);
    stepLeash(s, all, { talk: false, sigil: true }, { x: 520 + gap, z: 500 }, true, 103, 0.1, TUNING);
    expect(s.events.map(e => e.kind)).toEqual(["fizzled"]);
    expect(s.stack).toEqual([a.c.id, c.c.id]);
    // No placing from the treetops.
    stepLeash(s, all, { talk: false, sigil: true }, { x: 700, z: 700 }, false, 104, 0.1, TUNING);
    expect(s.stack).toEqual([a.c.id, c.c.id]);
  });

  it("is elastic: a creature walks to its new leash point, never jumps, then stays within the leash", () => {
    const all = fresh(), s = newLeash(), { c, w } = inviteOne(all, s, 0);
    const to = { x: w.x + 60, z: w.z + 20 };
    stepLeash(s, all, { talk: false, sigil: true }, to, true, 50, 0.1, TUNING);
    const L = TUNING.leash.length;
    let arrived = -1, px = c.x, pz = c.z, outside = 0;
    for (let i = 0; i < 1200; i++) {
      stepLeash(s, all, none, { x: 0, z: 0 }, true, 50 + i * 0.1, 0.1, TUNING);
      expect(Math.hypot(c.x - px, c.z - pz)).toBeLessThanOrEqual(TUNING.leash.runSpeed * 0.1 + 1e-6);
      px = c.x; pz = c.z;
      const d = Math.hypot(c.x - to.x, c.z - to.z);
      if (arrived < 0 && d <= L) arrived = i;
      if (arrived >= 0 && d > L + 0.01) outside++;
    }
    expect(arrived).toBeGreaterThan(0);
    expect(outside).toBe(0);
  });

  it("goes through the game: Talk and the sigil button in its controls", () => {
    const g = newGame(123, TUNING);
    g.clock.paused = false;
    stepGame(g, { ...NO_INTENT, zoom: 0, inviteNearest: true }, 1 / 60);
    expect(g.leash.stack.length).toBe(1);
    stepGame(g, { ...NO_INTENT, zoom: 0, sigil: true }, 1 / 60);
    expect(g.leash.placed.length).toBe(1);
  });
});

describe("laser shows", () => {
  it("are seeded, on about duty of the time, at most maxCount beams, and fade rather than pop", () => {
    const L = TUNING.lasers;
    let on = 0, n = 0, maxJump = 0;
    for (const seed of [3, 17, 99, 1234]) {
      let last = laserShow(0, seed, 1, TUNING).on;
      for (let t = 0; t < 600; t += 1 / 60) {
        const s = laserShow(t, seed, 1, TUNING);
        expect(s.count).toBeGreaterThanOrEqual(1); expect(s.count).toBeLessThanOrEqual(L.maxCount);
        expect(laserShow(t, seed, 1, TUNING)).toEqual(s);
        maxJump = Math.max(maxJump, Math.abs(s.on - last)); last = s.on;
        if (s.on > 0.5) on++;
        n++;
      }
    }
    expect(on / n).toBeGreaterThan(L.duty * 0.5); expect(on / n).toBeLessThan(L.duty * 1.6);
    expect(maxJump).toBeLessThan(0.35);
    // Neighbours aren't in lockstep.
    let same = 0;
    for (let t = 0; t < 300; t += 0.5) if ((laserShow(t, 3, 1, TUNING).on > 0.5) === (laserShow(t, 4, 1, TUNING).on > 0.5)) same++;
    expect(same / 600).toBeLessThan(0.9);
  });
});

describe("area borders", () => {
  it("run along the edge of an area's own ground, each point knowing the area across, cheaply", () => {
    const cell: [number, number] = [map.centreCell[0] + 1, map.centreCell[1]];
    const t0 = performance.now(), pts = borderOf(map, cell, 2);
    const ms = performance.now() - t0;
    expect(pts.length).toBeGreaterThan(100);
    let ok = 0;
    for (const p of pts) {
      // Within a couple of metres there is our ground and the other area's.
      let mine = false, theirs = false;
      for (let a = 0; a < 8; a++) {
        const c = map.areaAt(p.x + Math.cos(a) * 2, p.z + Math.sin(a) * 2).cell, k = `${c[0]},${c[1]}`;
        if (k === cell.join()) mine = true; if (k === p.other) theirs = true;
      }
      if (mine && (theirs || p.other === "edge")) ok++;
    }
    expect(ok / pts.length).toBeGreaterThan(0.95);
    expect(new Set(pts.map(p => p.other)).size).toBeGreaterThanOrEqual(3);
    console.log(`border: ${pts.length} points in ${ms.toFixed(0)} ms`);
  });
});

describe("facing", () => {
  it("faces the viewer unless clearly heading up the screen, with a little hysteresis on the cone", () => {
    const deg = (a: number) => [Math.sin((a * Math.PI) / 180) * 10, -Math.cos((a * Math.PI) / 180) * 10] as const;
    expect(facingAway(...deg(0), false, 1, TUNING)).toBe(true);    // straight up
    expect(facingAway(...deg(90), true, 1, TUNING)).toBe(false);   // purely sideways: towards, even if it was away
    expect(facingAway(...deg(180), true, 1, TUNING)).toBe(false);  // down
    expect(facingAway(0, 0, true, 1, TUNING)).toBe(false);          // stopped
    const between = (TUNING.facing.awayEnter + TUNING.facing.awayLeave) / 2;
    expect(facingAway(...deg(between), false, 1, TUNING)).toBe(false); // not yet in
    expect(facingAway(...deg(between), true, 1, TUNING)).toBe(true);   // not yet out
  });
});

describe("the density field", () => {
  it("varies: dense patches, sparse patches and lone trees, never just two states", () => {
    const chances: number[] = [];
    for (let i = 0; i < 3000; i++) {
      const x = map.bounds.minX + hash2(i, 5, 9) * (map.bounds.maxX - map.bounds.minX), z = map.bounds.minZ + hash2(i, 6, 9) * (map.bounds.maxZ - map.bounds.minZ);
      if (map.hardClear(x, z) || map.paths.at(x, z)) continue; // corridors are kept clear (tested with the paths)
      chances.push(treeChance(map, x, z, map.areaAt(x, z).type));
    }
    const share = (lo: number, hi: number) => chances.filter(c => c >= lo && c < hi).length / chances.length;
    expect(Math.min(...chances)).toBeGreaterThanOrEqual(TUNING.density.lone); // lone trees anywhere open
    expect(share(0.6, 9)).toBeGreaterThan(0.08);   // dense woods
    expect(share(0, 0.15)).toBeGreaterThan(0.15);  // open and sparse ground
    expect(share(0.15, 0.6)).toBeGreaterThan(0.2); // and plenty in between
  });
  it("keeps the dancefloor clear of every tree", () => {
    const d = map.dancefloor;
    expect(treeChance(map, d.x + 3, d.z - 2, map.areaAt(d.x, d.z).type)).toBe(0);
  });
});

describe("paths, roads and railways", () => {
  const P = map.paths, T = TUNING.paths;
  it("are seeded: the same map makes the same network", () => {
    expect(generateMap(123, TUNING).paths.lines).toEqual(P.lines);
    expect(generateMap(124, TUNING).paths.lines).not.toEqual(P.lines);
  });
  it("have two to four railway lines crossing many areas, a road or two, and paths between areas", () => {
    const of = (k: string) => P.lines.filter(l => l.kind === k);
    const trunk = of("rail").filter(l => l.pts.length > 100);
    expect(trunk.length).toBeGreaterThanOrEqual(T.rails[0]);
    expect(of("rail").length).toBeLessThanOrEqual(T.rails[1] + 1); // plus a branch line
    for (const l of trunk) expect(new Set(l.pts.map(p => map.areaAt(p[0], p[1]).cell.join(","))).size).toBeGreaterThan(5);
    expect(of("road").length).toBeGreaterThanOrEqual(T.roads[0]);
    expect(of("path").length).toBeGreaterThan(20);
    expect(of("stream").filter(l => l.pts.length > 100).length).toBeGreaterThanOrEqual(T.streams[0]);
  });
  it("meander: no path is a ruler-straight line", () => {
    for (const l of P.lines.filter(l => l.kind === "path")) {
      const a = l.pts[0], b = l.pts[l.pts.length - 1], len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (len < 40) continue;
      const off = Math.max(...l.pts.map(p => Math.abs(((p[0] - a[0]) * (b[1] - a[1]) - (p[1] - a[1]) * (b[0] - a[0])) / len)));
      expect(off).toBeGreaterThan(0.5);
    }
  });
  it("keep their corridors clear of trees (but for a few on broken railway) and bushes, with bushes thick along the edges", () => {
    const forest = new Forest(map), s = map.start;
    let inside = 0, broken = 0;
    for (const t of forest.treesNear(s.x, s.z, 600)) {
      const h = P.at(t.x, t.z);
      if (!h) continue;
      if (h.kind === "rail" && P.railBroken(t.x, t.z)) broken++; else inside++;
    }
    expect(inside).toBe(0);
    expect(broken).toBeGreaterThan(0);
    let edge = 0, open = 0, edgeN = 0, openN = 0;
    for (const b of forest.bushesNear(s.x, s.z, 600)) {
      const h = P.at(b.x, b.z, T.edgeBushes);
      if (h && h.d <= P.lines[h.line].half) expect(h.kind === "rail" && P.railBroken(b.x, b.z)).toBe(true);
      else if (h) edge++; else open++;
    }
    // Bushes per square metre along the edges against elsewhere, from a grid of samples.
    for (let i = 0; i < 40000; i++) {
      const x = s.x - 600 + hash2(i, 1, 3) * 1200, z = s.z - 600 + hash2(i, 2, 3) * 1200, h = P.at(x, z, T.edgeBushes);
      if (h && h.d > P.lines[h.line].half) edgeN++; else if (!h) openN++;
    }
    expect(edge / edgeN).toBeGreaterThan((open / openN) * 1.5);
    for (const w of forest.wallsNear(s.x, s.z, 600)) { const h = P.at(w.x, w.z); if (h) expect(h.kind === "rail" && P.railBroken(w.x, w.z)).toBe(true); }
  });
  it("stop at the edge of clearings, so they never run under the dancefloor or a set piece", () => {
    const d = map.dancefloor, clear = d.radius + TUNING.dancefloor.clearing;
    for (const l of P.lines) for (const p of l.pts) {
      if (l.kind !== "path") continue;
      expect(Math.hypot(p[0] - d.x, p[1] - d.z)).toBeGreaterThan(clear - l.half);
    }
  });
});

describe("decorations", () => {
  it("are scattered sparsely, all three families, never on a path, in a central clearing or by the dancefloor", () => {
    const forest = new Forest(map), s = map.start, list = forest.decorNear(s.x, s.z, 700), D = TUNING.decor;
    const fam = new Set(list.map(d => d.family));
    expect(fam.has("ruins") && fam.has("rocks")).toBe(true);
    expect(list.length).toBeGreaterThan(20);
    expect(list.length).toBeLessThan((1400 / D.spacing) ** 2 * 0.15);
    for (const d of list) {
      expect(map.paths.at(d.x, d.z)).toBeNull();
      expect(map.areaAt(d.x, d.z).openness).toBeGreaterThanOrEqual(D.clearing);
      expect(Math.hypot(d.x - map.dancefloor.x, d.z - map.dancefloor.z)).toBeGreaterThan(map.dancefloor.radius + TUNING.dancefloor.clearing);
    }
    expect(new Forest(map).decorNear(s.x, s.z, 700)).toEqual(list);
  });
});
