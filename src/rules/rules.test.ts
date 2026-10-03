import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { hash2 as labHash2 } from "../../art/generator.js";
import { makePartition } from "./partition";
import { AREA_TYPES, generateMap, parseSeed } from "./map";
import { Forest, crownReach } from "./forest";
import { newWitch, stepWitch, witchHeight, NO_INTENT, canopyShown } from "./witch";
import { newCamera, stepCamera, cameraPose } from "./camera";
import { spawnCreatures, stepCreature, wanderRange } from "./creatures";
import { newGame, stepGame } from "./game";
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

  it("are denser away from each area's centre, leaving a clearing", () => {
    let inner = 0, outer = 0, innerArea = 0, outerArea = 0;
    for (let cy = 3; cy < 17; cy += 3) for (let cx = 3; cx < 17; cx += 3) {
      const s = map.siteOf(cx, cy);
      for (const t of forest.treesNear(s.x, s.z, map.areaSize)) {
        const a = map.areaAt(t.x, t.z);
        if (a.cell[0] !== cx || a.cell[1] !== cy) continue;
        if (a.openness < 0.4) inner++; else if (a.openness > 0.7) outer++;
      }
      for (let k = 0; k < 2000; k++) {
        const x = s.x + ((k % 45) / 45 - 0.5) * map.areaSize * 2, z = s.z + (Math.floor(k / 45) / 45 - 0.5) * map.areaSize * 2, a = map.areaAt(x, z);
        if (a.cell[0] !== cx || a.cell[1] !== cy) continue;
        if (a.openness < 0.4) innerArea++; else if (a.openness > 0.7) outerArea++;
      }
    }
    expect(inner / innerArea).toBeLessThan((outer / outerArea) * 0.2);
    expect(outer).toBeGreaterThan(100);
  });

  it("leave the dancefloor clear, crowns included", () => {
    const d = map.dancefloor;
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
    const sparse = new Forest(generateMap(123, withTuning({ treeDensity: 0.4 })));
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
    for (let i = 0; i < 10; i++) c = stepCamera(c, 1, { x: 0, y: 0, z: 0 }, 1 / 60, TUNING);
    for (let i = 0; i < 200; i++) c = stepCamera(c, 0, { x: 0, y: 0, z: 0 }, 1 / 60, TUNING);
    expect(c.zoomStep).toBe(TUNING.camera.zoomSteps - 1);
    expect(cameraPose(c, 0, TUNING).distance).toBeCloseTo(g.distanceOut, 1);
    expect(cameraPose(c, 0, TUNING).angle).toBeCloseTo(g.angleOut, 1);
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

  it("live in every clearing, of their area's kind", () => {
    const cells = new Set(all.map(c => c.cell.join()));
    expect(cells.size).toBeGreaterThan(350);
    for (const c of all.slice(0, 200)) {
      expect(c.species).toBe(AREA_TYPES[map.typeOf(c.cell[0], c.cell[1])].creature);
      expect(map.areaAt(c.homeX, c.homeZ).openness).toBeLessThan(0.05);
    }
  });

  it("are babies and young, with a few legends, one of them next door to the dancefloor", () => {
    const legends = all.filter(c => c.level === 2);
    expect(all.filter(c => c.level === 0).length).toBeGreaterThan(300);
    expect(all.filter(c => c.level === 1).length).toBeGreaterThan(150);
    expect(legends.length).toBeGreaterThanOrEqual(1);
    expect(legends.length).toBeLessThan(80);
    expect(legends.some(c => c.cell[0] === map.centreCell[0] + 1 && c.cell[1] === map.centreCell[1])).toBe(true);
  });

  it("wander, slowly, and never leave their clearing", () => {
    const c = all[5], start = [c.x, c.z];
    let moved = 0;
    for (let i = 0; i < 60 * 60; i++) {
      const px = c.x, pz = c.z;
      stepCreature(c, 1 / 60);
      moved += Math.hypot(c.x - px, c.z - pz);
      expect(Math.hypot(c.x - c.homeX, c.z - c.homeZ)).toBeLessThanOrEqual(wanderRange(map, c.level) + 1e-6);
      expect(Math.hypot(c.x - px, c.z - pz)).toBeLessThanOrEqual(c.speed / 60 + 1e-9);
    }
    expect(moved).toBeGreaterThan(1);
    expect([c.x, c.z]).not.toEqual(start);
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
