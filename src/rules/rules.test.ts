import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { hash2 as labHash2, SPECIES_BY_ID } from "../../art/generator.js";
import { makePartition } from "./partition";
import { AREA_TYPES, generateMap, parseSeed } from "./map";
import { Forest, crownReach } from "./forest";
import { newWitch, stepWitch, witchHeight, NO_INTENT, canopyShown } from "./witch";
import { newCamera, stepCamera, cameraPose } from "./camera";
import { legendChance, population, spawnCreatures, stepCreature, stepCreaturesNear } from "./creatures";
import { newGame, stepGame } from "./game";
import { newParty, spreadWave, stepParty } from "./party";
import { stringsFor } from "./strings";
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

  it("thins trees smoothly toward each centre, not at a sharp edge", () => {
    const s = map.siteOf(4, 13), samples: number[] = [];
    for (let d = 0; d < map.areaSize * 0.5; d += 0.5) samples.push(map.treeWeight(s.x + d, s.z));
    const between = samples.filter(w => w > 0.05 && w < TUNING.treeDensity * 0.95).length;
    expect(between).toBeGreaterThan(samples.length * 0.3);
  });

  it("uses many area types", () => {
    const used = new Set<number>();
    for (let y = 0; y < 20; y++) for (let x = 0; x < 20; x++) used.add(map.typeOf(x, y));
    expect(used.size).toBeGreaterThanOrEqual(25);
  });

  it("puts the dancefloor in the clearing of the middle area, where the witch starts", () => {
    const d = map.dancefloor, a = map.areaAt(d.x, d.z);
    expect(a.cell).toEqual(map.centreCell);
    expect(Math.abs(map.centreCell[0] - 10) + Math.abs(map.centreCell[1] - 10)).toBeLessThanOrEqual(2);
    expect(a.openness).toBeLessThan(0.05);
    expect(map.treeWeight(d.x, d.z)).toBe(0);
    expect(Math.hypot(map.start.x - d.x, map.start.z - d.z)).toBeLessThan(d.radius);
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
    expect(per[0]).toBeLessThan(per[2] * 0.05);
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
    const sparse = new Forest(generateMap(123, withTuning({ treeDensity: 0.3 })));
    expect(sparse.treesNear(150, 150, 60).length).toBeLessThan(forest.treesNear(150, 150, 60).length * 0.75);
  });

  it("carry the type of the area they stand in", () => {
    for (const t of forest.treesNear(150, 150, 40)) expect(t.type).toBe(map.areaAt(t.x, t.z).type);
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
    expect(inCell(mx + 1, my).filter(c => c.level === 2).length).toBe(1);
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
      for (const c of spawnCreatures(m)) if (c.level === 2) count.set(c.cell.join(), (count.get(c.cell.join()) ?? 0) + 1);
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
    expect(off.some(c => c.level === 2 && c.cell[0] === hx + 1 && c.cell[1] === hy)).toBe(false);
  });

  it("rise with distance from home, as the tuning file says", () => {
    let last = -1;
    for (let r = 0; r <= 1.0001; r += 0.1) {
      const p = population(map, r);
      const total = p.babies + p.young + p.legends;
      expect(total).toBeGreaterThanOrEqual(last);
      last = total;
    }
    expect(population(map, 0)).toEqual({ babies: TUNING.creaturesNear, young: 0, legends: 0 });
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
  it("hang between pairs of the area's own trees round its clearing, 4 to 12 m apart, the same every time", () => {
    const forest = new Forest(map), cell: [number, number] = [map.centreCell[0] + 1, map.centreCell[1]];
    const lines = stringsFor(map, forest, cell);
    expect(lines.length).toBeGreaterThan(3);
    expect(lines.length).toBeLessThanOrEqual(TUNING.stringLights.perArea);
    const trees = new Set(forest.treesNear(lines[0].ax, lines[0].az, 400).map(t => `${t.x},${t.z}`));
    for (const l of lines) {
      const d = Math.hypot(l.ax - l.bx, l.az - l.bz);
      expect(d).toBeGreaterThanOrEqual(4); expect(d).toBeLessThanOrEqual(12);
      expect(trees.has(`${l.ax},${l.az}`) && trees.has(`${l.bx},${l.bz}`)).toBe(true);
      expect(map.areaAt(l.ax, l.az).cell).toEqual(cell);
    }
    expect(stringsFor(map, new Forest(map), cell)).toEqual(lines);
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
