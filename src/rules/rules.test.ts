import { stateOf } from "./creatureStates";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { hash2 as labHash2, SPECIES_BY_ID } from "../../art/generator.js";
import { makePartition } from "./partition";
import { hash2 } from "./random";
import { AREA_TYPES, HOME_LOOK, LOOKS, generateMap, parseSeed, sceneFootprint } from "./map";
import { Forest, crownReach, treeChance } from "./forest";
import { newWitch, stepWitch, witchHeight, NO_INTENT, canopyShown, facingAway, headingOf } from "./witch";
import { newCamera, stepCamera, cameraPose } from "./camera";
import { population, spawnCreatures, stepCreature, stepCreaturesNear, speedFactor } from "./creatures";
import { hitWitch, newGame, simRadius, STEP, stepGame } from "./game";
import { dashing, newDash, startDash } from "./dash";
import { newParty, spreadWave, stepParty, spawnMarkers, nextWave, pickNext, pickSet, planAhead, speakersOn, waveCountdown, symbolCount, wavePlan } from "./party";
import { segmentsCross, stringsFor } from "./strings";
import { wallFeatures } from "./walls";
import { laserShow } from "./lasers";
import { borderOf } from "./borders";
import { newLeash, stepLeash, type LeashControls } from "./leash";
import { newClock, tick, MAX_STEP } from "./clock";
import { TUNING, withTuning } from "./tuning";
import { floorClearing, speakerRadius, nextSpeakerState } from "./speakers";
import { composeFloor, floorLevel, floorPatterns, newFloor, pickPattern, stepFloor, switchOn, floorEvent, GRID, type FloorInputs } from "./dancefloor";
import { floorInputs } from "./game";
import { castSpell, newSpells, spellCharge, speedMultiplier } from "./spells";
import { musicMix } from "./music";
import { tuftsInCell, TUFT_KINDS } from "./groundcover";
import { DECOR } from "../../art/decor.js";
import { RELICS } from "../../art/relics.js";
import { SCENES, sceneLayout } from "../../art/scenes.js";
import { COUNTRY } from "../../art/country.js";
const MODERN_POOL = [...RELICS.filter(r => r.family === "modern" && (r as { scatter?: boolean }).scatter !== false), ...(COUNTRY as { id: string; family: string }[]).filter(d => d.family === "farm" || d.family === "street")].map(d => d.id); // the scattered modern finds, in the view's order (the bits of highway left out: Ed, round 13)
const MODERN = MODERN_POOL.length;

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
  it("says how far a point can move and surely stay in its area (cellSafe), and is right about it", () => {
    let checked = 0, safeSum = 0;
    for (let i = 0; i < 400; i++) {
      const x = map.extent.minX + hash2(i, 1, 5) * (map.extent.maxX - map.extent.minX), z = map.extent.minZ + hash2(i, 2, 5) * (map.extent.maxZ - map.extent.minZ);
      const r = map.cellSafe(x, z);
      expect(r.cell).toEqual(map.areaAt(x, z).cell);
      expect(r.safe).toBeGreaterThanOrEqual(0);
      safeSum += r.safe;
      for (let k = 0; k < 24; k++) { // points out to the edge of the disc
        const a = (k / 24) * Math.PI * 2, d = r.safe * (k % 3 === 0 ? 0.999 : hash2(i, k, 9));
        expect(map.areaAt(x + Math.cos(a) * d, z + Math.sin(a) * d).cell).toEqual(r.cell);
        checked++;
      }
    }
    expect(checked).toBe(400 * 24);
    expect(safeSum / 400).toBeGreaterThan(0.3); // worth having: a creature asks about every so many metres
  });
  it("is mapAreas x mapAreas areas with every area type (Ed's 30 and any recipes)", () => {
    expect(map.n).toBe(TUNING.mapAreas);
    expect(AREA_TYPES.length).toBeGreaterThanOrEqual(30);
    expect(map.bounds.maxX - map.bounds.minX).toBeCloseTo((map.n - 1) * map.areaSize);
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
    for (let j = 0; j < map.n * 20; j++) for (let i = 0; i < map.n * 20; i++) { // (over the map: 20 samples an area)
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

  it("is a forest with clearings: mostly dense woods, open ground in distinct clearings (their edges softened round each area's arena: Ed, 2026-10-05)", () => {
    let dense = 0, open = 0, between = 0, n = 0;
    for (let i = 0; i < 4000; i++) {
      const x = map.bounds.minX + hash2(i, 1, 9) * (map.bounds.maxX - map.bounds.minX), z = map.bounds.minZ + hash2(i, 2, 9) * (map.bounds.maxZ - map.bounds.minZ);
      const w = map.treeWeight(x, z) / TUNING.treeDensity;
      n++;
      if (w > 0.95) dense++; else if (w < 0.05) open++; else between++;
    }
    // (Ed, 2026-10-05, at v473: the woods thin gradually across most of an area towards its runestone,
    // so as much lies on that gradient as in full woods; and there's real open ground.)
    expect(dense / n).toBeGreaterThan(0.35);
    expect(between / n).toBeGreaterThan(0.25); // a long, soft gradient, not a step
    expect(open / n).toBeGreaterThan(0.03);
  });

  it("uses many area types", () => {
    const used = new Set<number>();
    for (let y = 0; y < 20; y++) for (let x = 0; x < 20; x++) used.add(map.typeOf(x, y));
    expect(used.size).toBeGreaterThanOrEqual(25);
  });

  it("puts the dancefloor in the clearing of the middle area, the treehouse by it, where the witch starts", () => {
    const d = map.dancefloor, a = map.areaAt(d.x, d.z);
    expect(a.cell).toEqual(map.centreCell);
    expect(Math.abs(map.centreCell[0] - map.n / 2) + Math.abs(map.centreCell[1] - map.n / 2)).toBeLessThanOrEqual(2);
    expect(a.openness).toBeLessThan(0.05);
    expect(map.treeWeight(d.x, d.z)).toBe(0);
    const th = map.treehouse, far = Math.hypot(th.x - d.x, th.z - d.z);
    expect(far).toBeGreaterThan(floorClearing(TUNING)); // outside the speakers and the clearing
    expect(far).toBeLessThan(floorClearing(TUNING) + 20);
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
    t = fly(t, 60 * (TUNING.treetop.boostTime + 1));
    expect(Math.hypot(t.vx, t.vz)).toBeCloseTo(TUNING.treetopSpeed * TUNING.treetop.boost, 0); // held straight: full boost
  });

  it("flies in her up and down heading sprites only near straight up or down the screen, with hysteresis", () => {
    const F = TUNING.facing, at = (deg: number, up: boolean) => { const a = (deg * Math.PI) / 180; return [Math.sin(a) * 10, (up ? -1 : 1) * Math.cos(a) * 10] as const; };
    expect(headingOf(...at(5, true), "side", 1, TUNING)).toBe("up");
    expect(headingOf(...at(5, false), "side", 1, TUNING)).toBe("down");
    expect(headingOf(...at(45, true), "side", 1, TUNING)).toBe("side");
    const mid = (F.headingEnter + F.headingLeave) / 2;
    expect(headingOf(...at(mid, true), "side", 1, TUNING)).toBe("side"); // not yet in
    expect(headingOf(...at(mid, true), "up", 1, TUNING)).toBe("up"); // not yet out
    expect(headingOf(0, -0.5, "up", 1, TUNING)).toBe("side"); // too slow
    let w: ReturnType<typeof newWitch> = { ...newWitch(200, 200), lift: 1, mode: "treetop" };
    for (let i = 0; i < 60; i++) w = stepWitch(w, { moveX: 0, moveZ: -1, toggleMode: false }, 1 / 60, TUNING, b);
    expect(w.heading).toBe("up");
  });
  describe("treetop momentum", () => {
    const T = TUNING.treetop, up = (): ReturnType<typeof newWitch> => ({ ...newWitch(200, 200), lift: 1, mode: "treetop" });
    const speed = (w: { vx: number; vz: number }) => Math.hypot(w.vx, w.vz);
    it("reaches cruise in well under half a second, then builds to boost over boostTime holding straight", () => {
      expect(speed(fly(up(), 24))).toBeGreaterThan(TUNING.treetopSpeed * 0.9);
      const half = fly(up(), 60 * T.boostTime * 0.5), full = fly(up(), 60 * (T.boostTime + 0.5));
      expect(half.boost!).toBeGreaterThan(0.4); expect(half.boost!).toBeLessThan(0.7);
      expect(full.boost).toBe(1);
      expect(speed(full)).toBeGreaterThan(TUNING.treetopSpeed * T.boost * 0.95);
    });
    it("turns gradually, in an arc, and a reversal bleeds the boost and brakes", () => {
      const fast = fly(up(), 60 * (T.boostTime + 0.5));
      const one = stepWitch(fast, { moveX: 0, moveZ: 1, toggleMode: false }, 1 / 60, TUNING, b);
      const turned = (Math.atan2(one.vz, one.vx) * 180) / Math.PI;
      expect(turned).toBeGreaterThan(0); expect(turned).toBeLessThan(T.turnRate / 60 + 0.5); // no snapping round
      let back = fast;
      for (let i = 0; i < 30; i++) back = stepWitch(back, { moveX: -1, moveZ: 0, toggleMode: false }, 1 / 60, TUNING, b);
      expect(back.boost!).toBeLessThan(0.3);
      expect(stepWitch(fast, { moveX: -1, moveZ: 0, toggleMode: false }, 1 / 60, TUNING, b).braking).toBe(true);
    });
    it("turns tight when slow and swoops wide only at speed (Ed: the skid scales with speed)", () => {
      const sweep = (v: number) => {
        let w: ReturnType<typeof newWitch> = { ...up(), vx: v, vz: 0, boost: v > TUNING.treetopSpeed ? 1 : 0 }, maxZ = 0;
        for (let i = 0; i < 600 && w.vx >= 0; i++) { w = stepWitch(w, { moveX: -1, moveZ: 0, toggleMode: false }, 1 / 60, TUNING, b); maxZ = Math.max(maxZ, Math.abs(w.z - 200)); }
        return maxZ;
      };
      const slow = sweep(5), cruise = sweep(TUNING.treetopSpeed), fast = sweep(TUNING.treetopSpeed * T.boost);
      expect(slow).toBeLessThan(1);
      expect(slow).toBeLessThan(fast / 4);
      expect(slow).toBeLessThan(cruise);
      expect(cruise).toBeLessThan(fast);
      const slowTurn = stepWitch({ ...up(), vx: 8, vz: 0 }, { moveX: -1, moveZ: 0, toggleMode: false }, 1 / 60, TUNING, b);
      expect(slowTurn.braking).toBe(false); // no skid pose for a slow about-face
    });
    it("glides when let go, rather than stopping dead", () => {
      const fast = fly(up(), 60);
      const glide = fly(fast, 15, NO_INTENT), stopped = fly(fast, 60 * T.glideTime * 1.5, NO_INTENT);
      expect(speed(glide)).toBeGreaterThan(speed(fast) * 0.3);
      expect(speed(stopped)).toBeLessThan(speed(fast) * 0.05);
    });
    it("leaves the ground snappy: full ground speed in a tenth of a second or so, and a quick stop", () => {
      expect(speed(fly(newWitch(200, 200), 8))).toBeGreaterThan(TUNING.groundSpeed * 0.9);
      expect(speed(fly(fly(), 8, NO_INTENT))).toBeLessThan(TUNING.groundSpeed * 0.1);
      expect(fly().boost ?? 0).toBe(0);
    });
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
  it("opens close in on her seat, and eases out to the starting zoom once she leaves it (Ed, v171)", () => {
    const I = TUNING.camera.intro, seat = { x: 10, y: 6, z: 20 };
    let c = newCamera(TUNING, 0, 0, 0);
    for (let i = 0; i < 120; i++) c = stepCamera(c, 0, { x: 0, y: 0, z: 0 }, { x: 0, z: 0 }, 0, 1 / 60, TUNING, true, seat);
    const p0 = cameraPose(c, 0, TUNING);
    expect(p0.distance).toBeCloseTo(I.distance, 1);
    expect(p0.distance).toBeLessThan(TUNING.camera.ground.distanceIn); // closer than zoom step 0
    expect(Math.hypot(p0.tx - seat.x, p0.ty - seat.y, p0.tz - seat.z)).toBeLessThan(0.5); // framed on the seat
    const half = Math.round((I.ease / 2) * 60);
    for (let i = 0; i < half; i++) c = stepCamera(c, 0, { x: 0, y: 0, z: 0 }, { x: 0, z: 0 }, 0, 1 / 60, TUNING);
    const mid = cameraPose(c, 0, TUNING).distance;
    expect(mid).toBeGreaterThan(I.distance + 5);
    for (let i = 0; i < 60 * I.ease; i++) c = stepCamera(c, 0, { x: 0, y: 0, z: 0 }, { x: 0, z: 0 }, 0, 1 / 60, TUNING);
    expect(c.intro).toBe(0);
    expect(cameraPose(c, 0, TUNING).distance).toBeGreaterThan(mid);
  });
  it("uses each mode's angle and distance, and zoom moves between in and out", () => {
    let c: ReturnType<typeof newCamera> = { ...newCamera(withTuning({ camera: { ...TUNING.camera, startZoom: 0 } }), 0, 0, 0), intro: 0 }; // past the opening shot
    const g = TUNING.camera.ground, t = TUNING.camera.treetop;
    expect(cameraPose(c, 0, TUNING).angle).toBeCloseTo(g.angleIn);
    expect(cameraPose(c, 1, TUNING).angle).toBeCloseTo(t.angleIn);
    // Over the treetops it sits out by (treetopSpeed / speedZoom.base)^power (Ed, 2026-10-05: faster flight, more ground on screen).
    const SZ = TUNING.camera.speedZoom!, fast = Math.pow(TUNING.treetopSpeed / SZ.base, SZ.power);
    expect(cameraPose(c, 1, TUNING).distance).toBeCloseTo(t.distanceIn * fast);
    expect(cameraPose(c, 1, { ...TUNING, treetopSpeed: SZ.base * 2 }).distance).toBeCloseTo(t.distanceIn * Math.pow(2, SZ.power));
    expect(cameraPose(c, 0, { ...TUNING, treetopSpeed: SZ.base * 2 }).distance).toBeCloseTo(g.distanceIn); // (the ground camera is left alone)
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
    const own = AREA_TYPES.filter(t => !t.sharesCreature); // a creature of its own for every area (but a recipe's that says it shares)
    expect(new Set(own.map(t => t.creature)).size).toBe(own.length);
  });

  it("start the same in every area (Ed, 2026-10-04): none at home but its legend, one young and one adult elsewhere (Ed, 2026-10-05), and one legend in each", () => {
    expect(inCell(mx, my).filter(c => !c.boss)).toEqual([]);
    const S = TUNING.population.start;
    for (let cy = 0; cy < map.n; cy += 3) for (let cx = 0; cx < map.n; cx += 3) {
      if (cx === mx && cy === my) continue;
      const here = inCell(cx, cy);
      expect(here.filter(c => c.level === 0).length).toBe(S.babies);
      expect(here.filter(c => c.level === 1).length).toBe(S.young);
      expect(here.filter(c => c.level === 2).length).toBe(S.adults);
      expect(here.filter(c => c.level === 3 && c.boss).length).toBe(1);
    }
    expect(population(map)).toEqual(S);
  });

  it("have one legend an area but home (Ed, 2026-10-05), each a boss, asleep, out of their clearings (Ed, 2026-10-04)", () => {
    for (let seed = 1; seed <= 4; seed++) {
      const m = generateMap(seed * 101, TUNING), legends = spawnCreatures(m).filter(c => c.level === 3), [hx, hy] = m.centreCell;
      expect(legends.length, `seed ${seed * 101}`).toBe(m.n * m.n - 1);
      expect(legends.some(c => c.cell[0] === hx && c.cell[1] === hy)).toBe(false);
      expect(new Set(legends.map(c => c.cell.join())).size).toBe(legends.length);
      for (const c of legends) {
        expect(c.boss).toBe(true);
        expect(c.legendState).toBe("asleep");
        expect(c.speed).toBeLessThanOrEqual(TUNING.legendSpeed * 1.3 + 1e-9);
      }
    }
  }, 60000);

  it("roam their whole area, slowly, and never leave it", () => {
    const sample = all.filter((_, i) => i % 97 === 0).slice(0, 5);
    for (const c of sample) {
      const visited = new Set<string>(), start = [c.x, c.z];
      const k = map.areaSize / 112, minutes = 40 * k * k, sq = 8 * k; // forty minutes in an area 112 m across, longer in bigger ones by its area (they walk no faster)
      for (let i = 0; i < 10 * 60 * minutes; i++) { // in tenths of a second
        const px = c.x, pz = c.z;
        stepCreature(c, 1 / 10, map);
        expect(Math.hypot(c.x - px, c.z - pz)).toBeLessThanOrEqual(c.speed / 10 + 1e-9);
        if (i % 5 === 0) {
          expect(map.areaAt(c.x, c.z).cell, `creature ${c.id}`).toEqual(c.cell);
          visited.add(`${Math.floor(c.x / sq)},${Math.floor(c.z / sq)}`);
        }
      }
      // How much of its area (in squares 8 m across in an area 112 m across, bigger in bigger ones) it has been to.
      let squares = 0;
      for (let x = c.homeX - c.range; x < c.homeX + c.range; x += sq) for (let z = c.homeZ - c.range; z < c.homeZ + c.range; z += sq) {
        const a = map.areaAt(Math.floor(x / sq) * sq + sq / 2, Math.floor(z / sq) * sq + sq / 2).cell;
        if (a[0] === c.cell[0] && a[1] === c.cell[1]) squares++;
      }
      expect(visited.size / squares, `creature ${c.id}`).toBeGreaterThan(0.4);
      expect([c.x, c.z]).not.toEqual(start);
    }
  }, 180000);

  it("only move near the witch, and pick up plausibly when she comes back", () => {
    const g = newGame(123, TUNING);
    g.clock.paused = false;
    const far = g.creatures.filter(c => Math.abs(c.homeX - g.witch.x) > simRadius(g) + 10); // (the radius grows with the areas)
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
  const forest = new Forest(map), all = forest.lightsNear((map.bounds.minX + map.bounds.maxX) / 2, (map.bounds.minZ + map.bounds.maxZ) / 2, (map.bounds.maxX - map.bounds.minX) / 2); // (most of the map: the areas are big)
  it("come as campfires and ponds (rune stones now only mark soundsystem spots), the same from the same seed, and keep off the dancefloor", () => {
    const kinds = new Set(all.map(l => l.kind));
    expect([...kinds].sort()).toEqual(["campfire", "pond"]);
    expect(new Forest(map).lightsNear((map.bounds.minX + map.bounds.maxX) / 2, (map.bounds.minZ + map.bounds.maxZ) / 2, (map.bounds.maxX - map.bounds.minX) / 2).map(l => l.x.toFixed(2)).join()).toBe(all.map(l => l.x.toFixed(2)).join());
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
  it("wakes exactly one area a wave, the one chosen in advance, always bordering the party (no islands), spreading away from the last", () => {
    const p = newParty(map);
    let besideLast = 0, couldAvoid = 0;
    for (let w = 1; w <= 25; w++) {
      expect(p.next.length).toBe(1);
      const next = p.next[0], before = new Set(p.areas.keys());
      expect(before.has(key(next))).toBe(false);
      const touchesParty = [...map.neighbours.get(key(next))!].some(n => before.has(n));
      expect(touchesParty).toBe(true); // noisy: no islands
      const fresh = spreadWave(p, map, w * 30);
      expect(fresh.length).toBe(1);
      expect(fresh[0].cell).toEqual(next);
      expect(fresh[0].wave).toBe(w);
      if (p.last && p.next.length && w > 1) {
        // when another candidate exists, the pick isn't beside the last one
        const beside = map.neighbours.get(key(p.last))!;
        if (beside.has(key(p.next[0]))) besideLast++;
        couldAvoid++;
      }
    }
    expect(besideLast).toBeLessThan(couldAvoid * 0.5);
  });
  it("offers the other pickers: near3 picks one of the 3 dormant areas nearest the dancefloor", () => {
    const p = newParty(map), d = map.dancefloor;
    const dist = (c: [number, number]) => { const s = map.soundsystemSpot(c[0], c[1]); return Math.hypot(s.x - d.x, s.z - d.z); };
    const all: [number, number][] = [];
    for (let y = 0; y < map.n; y++) for (let x = 0; x < map.n; x++) if (!p.areas.has(`${x},${y}`)) all.push([x, y]);
    const three = all.sort((a, b) => dist(a) - dist(b)).slice(0, 3).map(c => key(c));
    expect(three).toContain(key(pickNext(p, map, "near3")!));
    const n = pickNext(p, map, "nearest")!;
    expect([...map.neighbours.get(key(n))!].some(k => p.areas.has(k))).toBe(true);
  });
  it("boots the home speakers up first, one by one, then counts down to the first wave (Ed, 2026-10-04)", () => {
    const p = newParty(map), B = TUNING.boot.time, n = map.dancefloor.speakers.length;
    expect(p.bootUntil).toBe(B);
    expect(speakersOn(p, map, 0, n)).toBe(0);
    const counts = Array.from({ length: 61 }, (_, i) => speakersOn(p, map, (i / 60) * B, n));
    for (let i = 1; i < counts.length; i++) expect(counts[i]).toBeGreaterThanOrEqual(counts[i - 1]); // one by one, never off again
    expect(counts[30]).toBeGreaterThan(2); expect(counts[30]).toBeLessThan(n);
    expect(speakersOn(p, map, B, n)).toBe(n);
    const cd = waveCountdown(p, map, B / 2);
    expect(cd.booting).toBe(true); expect(cd.boot).toBeCloseTo(0.5); expect(cd.gone).toBe(0);
    expect(waveCountdown(p, map, B + 1).booting).toBe(false);
    expect(p.nextAt).toBe(B + TUNING.party.startDelay + TUNING.party.interval);
    // Pausing during the boot holds it too.
    p.paused = true; stepParty(p, map, B / 2, 5); expect(p.bootUntil).toBe(B + 5);
  });
  it("waits for her to get up from the decks: five minutes from her first step (Ed, 2026-10-05)", () => {
    expect(TUNING.boot.time).toBe(300);
    const p = newParty(map), B = TUNING.boot.time, due = p.nextAt;
    for (let s = 0; s < 40; s++) stepParty(p, map, s, 1, true); // (40 s sitting behind the decks)
    expect(p.bootUntil).toBe(B + 40); expect(p.nextAt).toBe(due + 40);
    stepParty(p, map, 40, 1, false); // (up: the boot runs from here)
    expect(p.bootUntil).toBe(B + 40);
    stepParty(p, map, B + 41, 1, true); // (sitting again once it's done holds nothing)
    expect(p.nextAt).toBe(due + 40);
  });
  it("forecasts two waves ahead, confirmed, and a probable set that holds the wave after (Ed, 2026-10-04)", () => {
    const p = newParty(map);
    expect(p.next.length).toBe(1); expect(p.afterNext.length).toBe(1);
    expect(p.probable.length).toBeGreaterThan(0); expect(p.probable.length).toBeLessThanOrEqual(TUNING.forecast.probable);
    for (let w = 0; w < 6; w++) {
      const after = p.afterNext, probable = p.probable.map(key);
      spreadWave(p, map, w + 1);
      expect(p.next).toEqual(after); // the confirmed after-next is next now
      expect(probable).toContain(key(p.afterNext[0])); // and the new after-next was among the probable
    }
    const m = spawnMarkers(p, map), stage = (c: readonly [number, number]) => m.find(x => x.key === key(c as [number, number]))!.stage;
    expect(stage(p.next[0])).toBe("next"); expect(stage(p.afterNext[0])).toBe("afterNext");
    for (const c of p.probable) expect(stage(c)).toBe("probable");
  });
  it("numbers every dormant area by the wave that will wake it, as the waves then do (Ed, 2026-10-04: numbers over the stones)", () => {
    for (const per of [1, 2]) {
      const p = newParty(map);
      if (per > 1) { p.areasPerWave = per; p.next = pickSet(p, map, per); planAhead(p, map); }
      const plan = wavePlan(p, map);
      expect(plan.size).toBe(map.n * map.n - 1); // all but home
      for (let w = 1; w <= 12; w++) {
        for (const c of p.next) expect(plan.get(key(c))).toBe(w);
        spreadWave(p, map, w);
      }
    }
  });
  it("sees a wave further with a forecast buff (the owl's): the third wave's one area, confirmed", () => {
    const p = newParty(map);
    p.seeAhead = 1; planAhead(p, map);
    for (let w = 0; w < 6; w++) {
      expect(p.probable.length).toBe(1);
      const third = p.probable;
      spreadWave(p, map, w + 1);
      expect(p.afterNext).toEqual(third);
    }
  });

  it("wakes one area per witch each wave (Ed, 2026-10-04): areasPerWave, all different, forecast as sets, and it can change between waves", () => {
    const p = newParty(map);
    p.areasPerWave = 3; p.next = pickSet(p, map, 3); planAhead(p, map);
    expect(new Set(p.next.map(key)).size).toBe(3);
    expect(p.afterNext.length).toBe(3);
    for (const c of p.afterNext) expect(p.next.map(key)).not.toContain(key(c));
    for (let w = 1; w <= 4; w++) {
      const after = p.afterNext.map(key), before = p.areas.size;
      const fresh = spreadWave(p, map, w);
      expect(fresh.length).toBe(3);
      expect(p.areas.size).toBe(before + 3);
      expect(p.next.map(key)).toEqual(after);
    }
    // A witch leaves: the next wave wakes as many as are left, picked afresh.
    p.areasPerWave = 2;
    expect(spreadWave(p, map, 9).length).toBe(3); // this wave was already set for three
    expect(p.next.length).toBe(2);
    expect(spreadWave(p, map, 10).length).toBe(2);
    expect(spawnMarkers(p, map).filter(m => m.stage === "next").length).toBe(2);
  });
  it("rings the stones with symbols: 12 on the next, the after-next filling through the middle, probable ones a few", () => {
    const F = TUNING.forecast;
    expect(symbolCount("next", 0, 0, TUNING)).toBe(F.symbols);
    expect(symbolCount("afterNext", 0, 0, TUNING)).toBe(F.afterNext[0]);
    expect(symbolCount("afterNext", 1, 0, TUNING)).toBe(F.afterNext[1]);
    expect(symbolCount("afterNext", 1, 0, TUNING)).toBeLessThan(F.symbols); // only the next has all 12
    for (const f of [0, 0.5, 0.99]) { const n = symbolCount("probable", 0, f, TUNING); expect(n).toBeGreaterThanOrEqual(1); expect(n).toBeLessThanOrEqual(F.probableMax); }
    expect(symbolCount("dormant", 1, 1, TUNING)).toBe(0);
  });
  it("comes in waves every interval seconds, and pauses", () => {
    const p = newParty(map), I = TUNING.party.interval, start = TUNING.party.startDelay + TUNING.boot.time;
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
  // (Every level to talk to: a baby, a young and an adult in each area.)
  const creatures = spawnCreatures(generateMap(123, withTuning({ population: { ...TUNING.population, start: { babies: 1, young: 1, adults: 1 } } })));
  const fresh = () => creatures.map(c => ({ ...c, rand: (() => { let k = c.id * 7 + 1; return () => (k = (k * 16807) % 2147483647) / 2147483647; })() }));
  const none: LeashControls = { sigil: false };
  // Stand the witch next to a creature of the given level and talk until it is invited.
  const inviteOne = (all: ReturnType<typeof fresh>, s: ReturnType<typeof newLeash>, level: 0 | 1 | 2, time = 0) => {
    const c = all.find(k => k.level === level && !k.leashed)!;
    const w = { x: c.x + 1, z: c.z };
    let t = time;
    for (let i = 0; i < 20 * 10 && !c.leashed; i++, t += 0.1) stepLeash(s, all, none, w, true, t, 0.1, TUNING);
    return { c, w, t };
  };

  it("invites after talking for the creature's talk time (babies 3 s, young 6 s, adults 12 s), not before: happy first, then (asked again) leashed (#87)", () => {
    for (const level of [0, 1, 2] as const) {
      const all = fresh(), s = newLeash(), c = all.find(k => k.level === level)!, w = { x: c.x + 1, z: c.z };
      const need = TUNING.invite.talkTime[level];
      let t = 0;
      for (; t < need - 0.25; t += 0.1) stepLeash(s, all, none, w, true, t, 0.1, TUNING);
      expect(stateOf(c)).toBe("wild");
      for (let i = 0; i < 6; i++, t += 0.1) stepLeash(s, all, none, w, true, t, 0.1, TUNING);
      expect(stateOf(c)).toBe("happy"); // happy, in its own area, not on her stack
      expect(s.stack).toEqual([]);
      for (let i = 0; i < Math.round(need / 0.1) + 6; i++, t += 0.1) stepLeash(s, all, none, w, true, t, 0.1, TUNING);
      expect(c.leashed).toBe(true);
      expect(s.stack).toEqual([c.id]);
    }
  });

  it("talks by herself, no button (Ed, v244); rising cancels it, and she never invites from the treetops", () => {
    const all = fresh(), s = newLeash(), c = all.find(k => k.level === 0)!, w = { x: c.x + 1, z: c.z };
    stepLeash(s, all, none, w, true, 0, 0.1, TUNING);
    expect(s.talk?.id).toBe(c.id); // started on its own
    for (let t = 0.1; t < 2; t += 0.1) stepLeash(s, all, none, w, true, t, 0.1, TUNING);
    stepLeash(s, all, none, w, false, 2, 0.1, TUNING); // she rises
    expect(s.talk).toBeNull();
    expect(s.events.map(e => e.kind)).toContain("cancelled");
    for (let t = 2; t < 2.5; t += 0.1) stepLeash(s, all, none, w, true, t, 0.1, TUNING);
    expect(c.leashed).toBe(false); // picked up where it left off, not finished yet
    const s2 = newLeash(), c2 = all.find(k => k.level === 0 && k !== c)!, w2 = { x: c2.x + 1, z: c2.z };
    for (let t = 0; t < 20; t += 0.1) stepLeash(s2, all, none, w2, false, t, 0.1, TUNING);
    expect(c2.leashed).toBe(false); // never from the treetops
    const far = { x: c.x + TUNING.invite.cancelDistance + 30, z: c.z };
    for (let t = 0; t < 20; t += 0.1) stepLeash(s, all, none, far, true, t, 0.1, TUNING);
    expect(c.leashed).toBe(false);
  });

  it("lets a chat drain at half the fill rate when she stops, and picks up from what's left", () => {
    const all = fresh(), s = newLeash(), babies = all.filter(k => k.level === 1).slice(0, 2), c = babies[0], other = babies[1];
    const near = { x: c.x + 1, z: c.z }, total = TUNING.invite.talkTime[1];
    let t = 0;
    for (; t < 2.05; t += 0.1) stepLeash(s, all, none, near, true, t, 0.1, TUNING);
    const talked = s.progress.get(c.id)!;
    expect(talked).toBeCloseTo(2, 0);
    for (let i = 0; i < 20; i++, t += 0.1) stepLeash(s, all, none, near, false, t, 0.1, TUNING); // up in the treetops for 2 s
    const left = s.progress.get(c.id)!;
    expect(left).toBeCloseTo(talked - 2 * TUNING.invite.decayRate, 5); // 2 s off drains 1 s
    // Resume: done after total - 1 s more.
    let n = 0;
    while (stateOf(c) === "wild" && n < 400) { stepLeash(s, all, none, near, true, t, 0.1, TUNING); t += 0.1; n++; }
    expect(Math.abs(n * 0.1 - (total - left))).toBeLessThanOrEqual(0.25);
    // Switching creatures: the first keeps draining while the second fills.
    const s2 = newLeash(), d = all.filter(k => k.level === 1 && stateOf(k) === "wild")[1], e = other;
    for (let i = 0; i < 20; i++) stepLeash(s2, all, none, { x: d.x + 1, z: d.z }, true, i * 0.1, 0.1, TUNING);
    const before = s2.progress.get(d.id)!;
    for (let i = 0; i < 10; i++) stepLeash(s2, all, none, { x: e.x + 1, z: e.z }, true, 2 + i * 0.1, 0.1, TUNING);
    expect(s2.progress.get(d.id)!).toBeLessThan(before);
    expect(s2.progress.get(e.id)!).toBeGreaterThan(0);
  });

  it("can't invite legends", () => {
    const all = fresh(), s = newLeash(), legend = all.find(k => k.level === 3 && k.legendState === "asleep")!;
    legend.legendState = undefined; legend.boss = false; // (an arena's wild legend: an area's is never chatted to)
    for (const c of all) if (c !== legend) c.leashed = true; // only the legend is left near
    const w = { x: legend.x + 1, z: legend.z };
    stepLeash(s, all, none, w, true, 0, 0.1, TUNING);
    expect(s.talk?.refused).toBe(true); // one unimpressed look...
    let looks = 1, was = true;
    for (let t = 0.1; t < 30; t += 0.1) { stepLeash(s, all, none, w, true, t, 0.1, TUNING); const now = !!s.talk?.refused; if (now && !was) looks++; was = now; }
    expect(legend.leashed).toBe(false);
    expect(looks).toBe(1); // ...and nothing more while she stays near
    expect(s.talk).toBeNull();
    // Away beyond cancelDistance and back: a new approach, a new look.
    stepLeash(s, all, none, { x: legend.x + TUNING.invite.cancelDistance + 5, z: legend.z }, true, 30, 0.1, TUNING);
    stepLeash(s, all, none, w, true, 30.1, 0.1, TUNING);
    expect(s.talk?.refused).toBe(true);
    stepLeash(s, all, { sigil: false, inviteNearest: true }, w, true, 30.2, 0.1, TUNING);
    expect(legend.leashed).toBe(false);
  });

  it("with auto-talk off she talks only while Talk is held (Ed's playtest, 2026-10-04)", () => {
    const all = fresh(), s = newLeash(), c = all.find(k => k.level === 0)!, w = { x: c.x + 1, z: c.z };
    for (let t = 0; t < 2; t += 0.1) stepLeash(s, all, { sigil: false, talk: false }, w, true, t, 0.1, TUNING);
    expect(s.talk).toBeNull();
    expect(s.progress.size).toBe(0);
    stepLeash(s, all, { sigil: false, talk: true }, w, true, 2, 0.1, TUNING); // held
    expect(s.talk?.id).toBe(c.id);
    stepLeash(s, all, { sigil: false, talk: false }, w, true, 2.1, 0.1, TUNING); // let go
    expect(s.talk).toBeNull();
  });

  it("sticks with the creature she's talking to while it stays within cancelDistance, and drops it beyond", () => {
    const all = fresh(), s = newLeash(), [a, b] = all.filter(k => k.level === 2).slice(0, 2);
    for (const c of all) if (c !== a && c !== b) c.leashed = true; // just these two about
    Object.assign(a, { x: 0, z: 0 }); Object.assign(b, { x: 10, z: 0 });
    stepLeash(s, all, none, { x: 2, z: 0 }, true, 0, 0.1, TUNING);
    expect(s.talk?.id).toBe(a.id);
    // Now b is nearer, but a is still within cancelDistance: she keeps talking to a.
    for (let t = 0.1; t < 2; t += 0.1) stepLeash(s, all, none, { x: 9, z: 0 }, true, t, 0.1, TUNING);
    expect(s.talk?.id).toBe(a.id);
    // Beyond cancelDistance of a: that chat is cancelled, and she turns to b.
    stepLeash(s, all, none, { x: TUNING.invite.cancelDistance + 1, z: 0 }, true, 2, 0.1, TUNING);
    expect(s.events.some(e => e.kind === "cancelled" && e.id === a.id)).toBe(true);
    expect(s.talk?.id).toBe(b.id);
    expect(s.progress.get(a.id)).toBeGreaterThan(0); // draining, so coming back resumes
  });

  it("stacks last in, first out: places the newest, picks up back onto the bottom", () => {
    const all = fresh(), s = newLeash();
    const a = inviteOne(all, s, 0), b = inviteOne(all, s, 0, a.t), c = inviteOne(all, s, 1, b.t);
    expect(s.stack).toEqual([a.c.id, b.c.id, c.c.id]);
    const here = { x: 500, z: 500 };
    stepLeash(s, all, { sigil: true }, here, true, 100, 0.1, TUNING);
    expect(s.placed.map(p => p.id)).toEqual([c.c.id]);
    expect(s.stack).toEqual([a.c.id, b.c.id]);
    stepLeash(s, all, { sigil: true }, { x: 520, z: 500 }, true, 101, 0.1, TUNING);
    expect(s.placed.map(p => p.id)).toEqual([c.c.id, b.c.id]);
    // Picking up: over a placed sigil, the button puts it back on the bottom of the stack.
    stepLeash(s, all, { sigil: true }, { x: 500.5, z: 500 }, true, 102, 0.1, TUNING);
    expect(s.stack).toEqual([a.c.id, c.c.id]);
    expect(s.placed.map(p => p.id)).toEqual([b.c.id]);
    // Not on top of another sigil (too near to put down, too far to pick up): it fizzles.
    const gap = (TUNING.leash.pickRadius + TUNING.leash.spacing) / 2;
    expect(TUNING.leash.spacing).toBeGreaterThan(TUNING.leash.pickRadius);
    stepLeash(s, all, { sigil: true }, { x: 520 + gap, z: 500 }, true, 103, 0.1, TUNING);
    expect(s.events.map(e => e.kind)).toEqual(["fizzled"]);
    expect(s.stack).toEqual([a.c.id, c.c.id]);
    // No placing from the treetops, and no picking up (Ed, 2026-10-05: "You have to land to place sigils"): there the button cycles the stack instead.
    stepLeash(s, all, { sigil: true }, { x: 700, z: 700 }, false, 104, 0.1, TUNING);
    expect(s.stack).toEqual([c.c.id, a.c.id]);
    expect(s.events.map(e => e.kind)).toEqual(["cycled"]);
    stepLeash(s, all, { sigil: true }, { x: 520, z: 500 }, false, 105, 0.1, TUNING); // over b's placed sigil, in the air
    expect(s.placed.map(p => p.id)).toEqual([b.c.id]);
    expect(s.stack).toEqual([a.c.id, c.c.id]);
    expect(s.events.map(e => e.kind)).toEqual(["cycled"]);
  });

  it("is elastic: a creature walks to its new leash point, never jumps, then stays within the leash", () => {
    const all = fresh(), s = newLeash(), { c, w } = inviteOne(all, s, 0);
    const to = { x: w.x + 60, z: w.z + 20 };
    stepLeash(s, all, { sigil: true }, to, true, 50, 0.1, TUNING);
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

  it("goes through the game: the debug invite and the sigil button in its controls", () => {
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
  }, 60000); // (144 000 shows compared: near the default 5 s on a busy CI runner)
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
      if (map.hardClear(x, z) || map.paths.at(x, z) || map.paths.pieceAt(x, z) || map.arenaOpen(x, z) < 1) continue; // corridors, path pieces and arenas are kept clear (tested with them)
      if (map.areaAt(x, z).look === HOME_LOOK) continue; // (home's a meadow, no trees: homeArea.test.ts)
      chances.push(treeChance(map, x, z, map.areaAt(x, z).type));
    }
    const share = (lo: number, hi: number) => chances.filter(c => c >= lo && c < hi).length / chances.length;
    expect(Math.min(...chances)).toBeGreaterThanOrEqual(TUNING.density.lone); // lone trees anywhere open
    expect(share(0.6, 9)).toBeGreaterThan(0.08);   // dense woods
    expect(share(0, 0.15)).toBeGreaterThan(0.15);  // open and sparse ground
    expect(share(0.15, 0.6)).toBeGreaterThan(0.2); // and plenty in between
  });
  it("keeps every area's fighting arena open, its edge soft (Ed, 2026-10-05): no tree in its middle, the woods thickening gradually through its band, and back beyond it", () => {
    const R = TUNING.arena!, k = TUNING.fight.scale, open = (R.radius - R.noise * R.band) * k, full = (R.radius + R.band * (1 + R.noise)) * k + 4;
    let inside = 0;
    const rings = [0, 0, 0], ringN = [0, 0, 0], lone = [0, 0, 0];
    let beyond = 0, outsideTrees = 0;
    for (let cy = 1; cy < map.n - 1; cy++) for (let cx = 1; cx < map.n - 1; cx++) {
      if (cx === map.centreCell[0] && cy === map.centreCell[1]) continue;
      const s = map.siteOf(cx, cy), mine = (x: number, z: number) => map.areaAt(x, z).cell.join() === `${cx},${cy}`;
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2, d = open * hash2(cx * 31 + i, cy, 7), x = s.x + Math.cos(a) * d, z = s.z + Math.sin(a) * d;
        if (!mine(x, z)) continue;
        inside++;
        expect(treeChance(map, x, z, map.areaAt(x, z).type), `${cx},${cy} at ${d.toFixed(0)} m`).toBe(0);
      }
      // Through the band, in thirds: the odds of a tree rise gradually (no wall at a radius).
      for (let i = 0; i < 48; i++) {
        const third = i % 3, a = (i / 48) * Math.PI * 2, d = (R.radius + R.band * (third + 0.5) / 3) * k, x = s.x + Math.cos(a) * d, z = s.z + Math.sin(a) * d;
        if (!mine(x, z) || map.hardClear(x, z) || map.paths.at(x, z)) continue;
        const c = treeChance(map, x, z, map.areaAt(x, z).type);
        rings[third] += c; ringN[third]++; if (c > 0 && c <= TUNING.density.lone) lone[third]++;
      }
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2, x = s.x + Math.cos(a) * full, z = s.z + Math.sin(a) * full;
        if (!mine(x, z) || map.hardClear(x, z) || map.paths.at(x, z)) continue;
        beyond++;
        if (treeChance(map, x, z, map.areaAt(x, z).type) >= TUNING.density.lone) outsideTrees++;
      }
    }
    expect(inside).toBeGreaterThan(500);
    const mean = rings.map((r, i) => r / ringN[i]);
    expect(mean[0]).toBeGreaterThan(0); // trees start within the band's first third...
    expect(mean[1]).toBeGreaterThan(mean[0] * 1.5); // ...and thicken through it
    expect(mean[2]).toBeGreaterThan(mean[1] * 1.2);
    expect(mean[0]).toBeLessThan(mean[2] * 0.5); // gradually: no jump at its inner edge
    expect(lone[0]).toBeGreaterThan(0); // scattered lone trees out in the clearing
    expect(outsideTrees / beyond).toBeGreaterThan(0.9); // the woods are back past its band
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
  it("keep one kind for their whole length: each line carries the area it starts in (Ed, v160)", () => {
    for (const l of P.lines) {
      const a = map.areaAt(l.pts[0][0], l.pts[0][1]);
      expect(l.area).toEqual({ cell: [a.cell[0], a.cell[1]], type: a.type });
    }
    // Crossing areas doesn't change it: many paths leave their start area, but carry one area each.
    const crossers = P.lines.filter(l => l.kind === "path" && new Set(l.pts.map(p => map.areaAt(p[0], p[1]).cell.join(","))).size > 1);
    expect(crossers.length).toBeGreaterThan(5);
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
  }, 60000); // (it builds the forest for 600 m round home)
  it("carry 3D pieces: railway landmarks and signals, bridges over streams, verge posts; trees keep clear of them", () => {
    const ids = new Set(P.pieces.map(p => p.id));
    for (const id of ["signal-post", "verge-post"]) expect(ids.has(id)).toBe(true);
    expect(P.pieces.some(p => ["goods-wagon", "carriage", "platform", "signal-gantry"].includes(p.id))).toBe(true);
    let bridges = 0;
    for (let seed = 1; seed <= 6; seed++) bridges += generateMap(seed, TUNING).paths.pieces.filter(p => p.id.includes("bridge")).length;
    expect(bridges).toBeGreaterThan(0);
    expect(P.pieces.some(p => p.id === "fingerpost")).toBe(false); // fingerposts only with paths.fingerposts (?props=gen)
    const withPosts = generateMap(123, { ...TUNING, paths: { ...TUNING.paths, fingerposts: true } }).paths.pieces;
    expect(withPosts.filter(p => p.id === "fingerpost").length).toBeGreaterThan(3);
    expect(withPosts.filter(p => p.id !== "fingerpost")).toEqual(P.pieces); // placed last: every other piece where it was
    for (const b of P.pieces.filter(p => p.id.includes("bridge"))) expect(P.at(b.x, b.z)?.kind).toBeDefined();
    for (const a of P.pieces) for (const b of P.pieces) if (a !== b) expect(Math.hypot(a.x - b.x, a.z - b.z)).toBeGreaterThanOrEqual(TUNING.paths.pieceGap); // never a row of them
    for (const p of P.pieces) expect(map.reserved(p.x, p.z, p.r)).toBe(false); // clear of soundsystems, set pieces, grounds
    const forest = new Forest(map);
    for (const p of P.pieces.slice(0, 60)) for (const t of forest.treesNear(p.x, p.z, p.r + 1)) expect(Math.hypot(t.x - p.x, t.z - p.z)).toBeGreaterThanOrEqual(p.r - 1e-6);
  }, 20000); // six maps
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
    expect(list.length).toBeGreaterThan(5);
    expect(list.length).toBeLessThan((1400 / D.spacing) ** 2 * 0.03); // sparse: discoveries, not clutter
    for (const d of list) {
      expect(map.paths.at(d.x, d.z)).toBeNull();
      expect(map.areaAt(d.x, d.z).openness).toBeGreaterThanOrEqual(D.clearing);
      expect(Math.hypot(d.x - map.dancefloor.x, d.z - map.dancefloor.z)).toBeGreaterThan(map.dancefloor.radius + TUNING.dancefloor.clearing);
    }
    expect(new Forest(map).decorNear(s.x, s.z, 700)).toEqual(list);
    for (const a of list) for (const b of list) if (a !== b) expect(Math.hypot(a.x - b.x, a.z - b.z)).toBeGreaterThanOrEqual(D.minGap); // never a cluster (Ed, v147)
    // The same from another chunk's point of view: spacing doesn't depend on who asks.
    const other = new Forest(map).decorNear(s.x + 300, s.z, 700).filter(d => Math.abs(d.x - s.x) <= 700 && Math.abs(d.z - s.z) <= 700);
    expect(other.length).toBeGreaterThan(0);
    for (const d of other) expect(list.some(e => e.x === d.x && e.z === d.z)).toBe(true);
  });
});

describe("relics and grounds", () => {
  it("lay out a handful of playgrounds and sports grounds per map, each in a clearing of its own", () => {
    expect(map.grounds.length).toBeGreaterThanOrEqual(2); expect(map.grounds.length).toBeLessThanOrEqual(30);
    expect(generateMap(123, TUNING).grounds).toEqual(map.grounds);
    const forest = new Forest(map);
    for (const g of map.grounds) {
      expect(map.hardClear(g.x, g.z)).toBe(true);
      for (const p of [...forest.treesNear(g.x, g.z, g.r), ...forest.bushesNear(g.x, g.z, g.r), ...forest.wallsNear(g.x, g.z, g.r)]) expect(Math.hypot(p.x - g.x, p.z - g.z)).toBeGreaterThanOrEqual(g.r - 1e-6);
      expect(Math.hypot(g.x - map.dancefloor.x, g.z - map.dancefloor.z)).toBeGreaterThan(map.dancefloor.radius + g.r);
    }
  });
  it("scatter modern relics rarely, more of them by the roads and railways, never on a path", () => {
    const forest = new Forest(map), b = map.extent, list = forest.relicsNear((b.minX + b.maxX) / 2, (b.minZ + b.maxZ) / 2, b.maxX - b.minX);
    expect(list.length).toBeGreaterThan(3);
    expect(list.length).toBeLessThanOrEqual(MODERN); // each at most once (relics and the standalone country pieces)
    for (const r of list) { expect(map.paths.at(r.x, r.z)).toBeNull(); expect(map.hardClear(r.x, r.z)).toBe(false); }
    for (const r of list) expect(MODERN_POOL[r.variant % MODERN]).not.toMatch(/highway|tarmac/); // no bits of road as clutter (a fallen road sign is a sign, not a road) (Ed, round 13)
    expect(MODERN_POOL.some(id => /highway/.test(id))).toBe(false);
    for (const a of list) for (const b of list) if (a !== b) expect(Math.hypot(a.x - b.x, a.z - b.z)).toBeGreaterThanOrEqual(TUNING.relics.minGap);
    const byRoad = list.filter(r => { const h = map.paths.at(r.x, r.z, 20); return h && (h.kind === "road" || h.kind === "rail"); }).length;
    expect(byRoad).toBeGreaterThan(0);
  });
});

describe("set pieces, again", () => {
  it("stand at most one per area", () => {
    const f = new Forest(map), s = map.start, seen = new Set<string>();
    for (const p of f.setPiecesNear(s.x, s.z, 900)) { const k = map.areaAt(p.x, p.z + 4).cell.join(","); expect(seen.has(k)).toBe(false); seen.add(k); }
  });
});

describe("finds, each at most once per map (Ed, v160)", () => {
  const maps = [11, 22, 33, 44, 55].map(seed => generateMap(seed, TUNING));
  const whole = (m: ReturnType<typeof generateMap>) => { const b = m.extent; return [(b.minX + b.maxX) / 2, (b.minZ + b.maxZ) / 2, b.maxX - b.minX] as const; };
  // The view's lists: each family's pieces in the art's table order, a ruin's conditions in a row.
  const ruinOf: number[] = [];
  DECOR.filter(d => d.family === "ruins").forEach((d, k) => { for (let v = 0; v < d.variants; v++) ruinOf.push(k); });
  it("no ruin, freak tree, relic, set piece or grounds arrangement appears twice, over 5 seeds", () => {
    for (const m of maps) {
      const f = new Forest(m), [x, z, r] = whole(m), decor = f.decorNear(x, z, r);
      const ruins = decor.filter(d => d.family === "ruins").map(d => ruinOf[d.variant % ruinOf.length]);
      const freaks = decor.filter(d => d.family === "freak").map(d => d.variant % DECOR.filter(q => q.family === "freak").length);
      const relics = f.relicsNear(x, z, r).map(q => q.variant % MODERN);
      const pieces = f.setPiecesNear(x, z, r).map(p => AREA_TYPES[p.type].setPiece);
      const grounds = m.grounds.map(g => g.kind), stairs = m.paths.pieces.filter(p => p.id.startsWith("stairs")).map(p => p.id);
      for (const list of [ruins, freaks, relics, pieces, grounds, stairs] as unknown[][]) expect(new Set(list).size).toBe(list.length);
      expect(ruins.length + freaks.length).toBeGreaterThan(5);
      expect(decor.filter(d => d.family === "rocks").length).toBeGreaterThan(50); // rocks are generic scatter
    }
  }, 30000); // five whole maps
  it("places scenes, each at most once, in areas they suit, off the paths and clear of the gameplay (Ed, 2026-10-04)", () => {
    let total = 0;
    for (const m of maps) {
      const ids = m.scenes.map(c => c.id);
      expect(new Set(ids).size).toBe(ids.length);
      total += ids.length;
      for (const c of m.scenes) {
        const sc = (SCENES as unknown as { id: string; suits: string[] }[]).find(x => x.id === c.id)!;
        expect(sc.suits).toContain(AREA_TYPES[m.areaAt(c.x, c.z).type].id);
        expect(m.paths.at(c.x, c.z, c.r * 0.6)).toBeNull();
        expect(m.hardClear(c.x, c.z)).toBe(true); // its ground is kept clear of trees
        for (const q of m.dancefloor.speakers) expect(Math.hypot(q.x - c.x, q.z - c.z)).toBeGreaterThan(c.r);
      }
    }
    expect(total / maps.length).toBeGreaterThan(4);
  });
  it("gives each scene a footprint at least the art's own", () => {
    const style = JSON.parse(readFileSync(new URL("../../config/style.json", import.meta.url), "utf8"));
    for (const sc of SCENES as unknown as { id: string }[]) expect(sceneFootprint(sc.id, TUNING)).toBeGreaterThanOrEqual((sceneLayout as unknown as (id: string, st: unknown) => { footprint: number })(sc.id, style).footprint);
  }, 60000);
  it("stairs stand only by ravines, rocky slopes, cave mouths and stone shrines", () => {
    for (const m of maps) for (const p of m.paths.pieces.filter(p => p.id.startsWith("stairs")))
      expect(["ravine", "rocky-slope", "cave-mouth", "stone-shrine"]).toContain(AREA_TYPES[m.areaAt(p.x, p.z).type].id);
  });
  it("give each set piece to one area only, which has room for it", () => {
    for (const m of maps) {
      const seen = new Set<string>();
      for (let y = 0; y < m.n; y++) for (let x = 0; x < m.n; x++) {
        const sp = m.setPieceOf(x, y);
        if (!sp) continue;
        expect(seen.has(sp)).toBe(false); seen.add(sp);
        expect(m.setPieceSpot(x, y)).not.toBeNull();
      }
      expect(seen.size).toBeGreaterThan(5);
    }
  });
  it("keep soundsystems and set pieces off the paths, so paths run on unbroken", () => {
    for (const m of maps) for (let y = 0; y < m.n; y++) for (let x = 0; x < m.n; x++) {
      if (x === m.centreCell[0] && y === m.centreCell[1]) continue;
      const q = m.soundsystemSpot(x, y);
      expect(m.paths.at(q.x, q.z, TUNING.soundsystemFootprint)).toBeNull();
      const p = m.setPieceSpot(x, y);
      if (p) expect(m.paths.at(p.x, p.z)).toBeNull();
    }
  });
});

describe("the dancefloor's speakers (Ed, v160)", () => {
  const D = TUNING.dancefloor, S = D.speakers;
  it("stand count of them evenly round the floor at radiusFactor times its radius, from start degrees", () => {
    const sp = map.dancefloor.speakers;
    expect(sp.length).toBe(S.count);
    expect(speakerRadius(TUNING)).toBeCloseTo(D.radius * S.radiusFactor);
    sp.forEach((p, i) => {
      expect(Math.hypot(p.x - map.dancefloor.x, p.z - map.dancefloor.z)).toBeCloseTo(speakerRadius(TUNING), 5);
      expect(p.ring).toBeCloseTo(S.start + (360 / S.count) * i);
    });
  });
  it("are gameplay: reserved, with no trees, bushes or scenery on their feet", () => {
    const f = new Forest(map);
    for (const p of map.dancefloor.speakers) {
      expect(map.reserved(p.x, p.z, 1)).toBe(true);
      expect(map.hardClear(p.x, p.z)).toBe(true);
      for (const t of f.treesNear(p.x, p.z, S.footprint + 2)) expect(Math.hypot(t.x - p.x, t.z - p.z)).toBeGreaterThan(S.footprint + 2);
      for (const b of f.bushesNear(p.x, p.z, S.footprint + 1)) expect(Math.hypot(b.x - p.x, b.z - p.z)).toBeGreaterThan(S.footprint + 1);
    }
  });
  it("keep the treehouse outside their ring and the floor's clearing, over seeds", () => {
    for (const seed of [1, 2, 3, 4, 5, 6, 7, 8]) {
      const m = generateMap(seed, TUNING), d = Math.hypot(m.treehouse.x - m.dancefloor.x, m.treehouse.z - m.dancefloor.z);
      expect(d - TUNING.treehouse.clear).toBeGreaterThan(speakerRadius(TUNING) + S.footprint); // its footprint clear of the ring
      expect(d).toBeGreaterThan(floorClearing(TUNING));
      for (const p of m.dancefloor.speakers) expect(Math.hypot(m.treehouse.x - p.x, m.treehouse.z - p.z)).toBeGreaterThan(TUNING.treehouse.clear + S.footprint);
    }
    // More of them, further out: still outside.
    const T2 = withTuning({ dancefloor: { ...D, speakers: { ...S, count: 20, radiusFactor: 3 } } }), m = generateMap(1, T2);
    expect(Math.hypot(m.treehouse.x - m.dancefloor.x, m.treehouse.z - m.dancefloor.z) - T2.treehouse.clear).toBeGreaterThan(speakerRadius(T2) + S.footprint);
  }, 30000); // (nine maps)
  it("are the dancefloor's only sound: no soundsystem stands in their ring or the floor's clearing, over seeds (Ed, v183)", () => {
    for (const seed of [1, 2, 3, 123]) {
      const m = generateMap(seed, TUNING), d = m.dancefloor;
      for (let y = 0; y < m.n; y++) for (let x = 0; x < m.n; x++) {
        if (x === m.centreCell[0] && y === m.centreCell[1]) continue;
        const q = m.soundsystemSpot(x, y);
        expect(Math.hypot(q.x - d.x, q.z - d.z)).toBeGreaterThan(speakerRadius(TUNING) + S.footprint + TUNING.soundsystemFootprint);
      }
      expect(newParty(m).areas.get(m.centreCell.join(","))?.soundsystem ?? null).toBeNull(); // home has none
    }
  });
  it("give the treehouse a clearing at least as wide as the art's footprint (v2: a tall tower in a giant tree)", async () => {
    const Art = await import("../../art/generator.js"), style = JSON.parse(readFileSync(new URL("../../config/style.json", import.meta.url), "utf8"));
    const th = (Art as unknown as { treehouseSprite: (st: unknown) => { metres: { footprint: number } } }).treehouseSprite(style);
    expect(TUNING.treehouse.clear).toBeGreaterThanOrEqual(th.metres.footprint);
  }, 60000);
  it("cycle playing, damaged, destroyed on the debug key", () => {
    expect(nextSpeakerState("playing")).toBe("damaged");
    expect(nextSpeakerState("damaged")).toBe("destroyed");
    expect(nextSpeakerState("destroyed")).toBe("playing");
    const g = newGame(5, TUNING);
    expect(g.speakers.every(s => s === "playing")).toBe(true); // (works with the clock paused too)
    stepGame(g, { ...NO_INTENT, zoom: 0, cycleSpeakers: true }, 1 / 60);
    expect(g.speakers.every(s => s === "damaged")).toBe(true);
  });
});

describe("the dancefloor's tile lights (Ed, v160)", () => {
  const beat = 60 / TUNING.beat.bpm, boot = 8 * beat; // the switch-on sequence is 8 beats
  const inputs = (time: number, o: Partial<FloorInputs> = {}): FloorInputs => ({ time, seed: 7, level: 2, partifiedAreas: new Set(), witch: { x: -50, y: -50, lift: 1, rgb: [255, 238, 70] }, dancers: [], ...o });
  const run = (f: ReturnType<typeof newFloor>, from: number, to: number, o: Partial<FloorInputs> = {}) => { for (let t = from; t <= to; t += 1 / 30) stepFloor(f, inputs(t, o), TUNING); };
  const litCount = (rgbi: Uint8Array) => { let n = 0; for (let i = 3; i < rgbi.length; i += 4) if (rgbi[i]) n++; return n; };
  it("is dark until it switches on, once, when the witch first leaves the terrace", () => {
    const g = newGame(3, TUNING);
    g.clock.paused = false;
    expect(litCount(composeFloor(g.floor, floorInputs(g), TUNING).rgbi)).toBe(0);
    for (let i = 0; i < 30; i++) stepGame(g, { ...NO_INTENT, zoom: 0 }, 1 / 60);
    expect(g.floor.on).toBeNull(); // still seated
    stepGame(g, { ...NO_INTENT, moveX: 1, zoom: 0 }, 1 / 60);
    const on = g.floor.on;
    expect(on).not.toBeNull();
    for (let i = 0; i < 60; i++) stepGame(g, { ...NO_INTENT, moveX: 1, toggleMode: i === 5, zoom: 0 }, 1 / 60);
    expect(g.floor.on).toBe(on); // only once
    expect(litCount(composeFloor(g.floor, floorInputs(g), TUNING).rgbi)).toBeGreaterThan(0); // booting
  });
  it("plays patterns on the beat, changing on bar lines, never the same one twice running", () => {
    const f = newFloor(); switchOn(f, 0);
    const seen: number[] = [];
    for (let t = 0; t < boot + 400 * beat; t += 1 / 30) { stepFloor(f, inputs(t, { level: 4 }), TUNING); if (seen[seen.length - 1] !== f.pattern) seen.push(f.pattern); }
    expect(seen.length).toBeGreaterThan(8);
    for (let i = 1; i < seen.length; i++) expect(seen[i]).not.toBe(seen[i - 1]);
    for (let i = 0; i < 50; i++) expect(pickPattern(5, i, 4, new Set(), 3)).not.toBe(5);
    // Low levels keep to simple patterns; an area's shape only once its area has the party.
    for (let i = 0; i < 50; i++) { const p = floorPatterns()[pickPattern(-1, i, 1, new Set(), 3)]; expect(p.level).toBe(1); expect(p.kind).not.toBe("area"); }
    const area = floorPatterns().find(p => p.kind === "area")!, picks = Array.from({ length: 400 }, (_, i) => floorPatterns()[pickPattern(-1, i, 4, new Set([area.area!]), 3)]);
    expect(picks.some(p => p.id === area.id)).toBe(true);
  });
  it("rises in level with the party, and a higher level lights more of the floor", () => {
    expect(floorLevel(1, TUNING)).toBe(1);
    expect(floorLevel(TUNING.dancefloor.levels[0], TUNING)).toBe(2);
    expect(floorLevel(999, TUNING)).toBe(4);
    const lit = (level: number) => { const f = newFloor(); switchOn(f, 0); let sum = 0; for (let t = boot + 1; t < boot + 120; t += 0.5) { stepFloor(f, inputs(t, { level }), TUNING); sum += composeFloor(f, inputs(t, { level }), TUNING).lit; } return sum; };
    expect(lit(4)).toBeGreaterThan(lit(1) * 1.5);
  });
  it("lights the witch's tile where she stands, and ripples out from her", () => {
    const f = newFloor(); switchOn(f, 0);
    const me = { x: 10.5, y: 20.5, lift: 0, rgb: [1, 2, 3] as [number, number, number] };
    run(f, 0, boot + 2, { witch: me });
    const t = boot + 2, out = composeFloor(f, inputs(t, { witch: me }), TUNING).rgbi, n = 20 * GRID + 10;
    expect([...out.slice(n * 4, n * 4 + 4)]).toEqual([1, 2, 3, 3]);
    expect(f.ripples.length).toBeGreaterThan(0);
    // Flying high over it: no light under her.
    const high = composeFloor(f, inputs(t, { witch: { ...me, lift: 1 } }), TUNING).rgbi;
    expect(high[n * 4 + 3] === 0 || high[n * 4] !== 1).toBe(true);
  });
  it("composes the layers: an event's pulse shows over the pattern, towards its area", () => {
    const f = newFloor(); switchOn(f, 0); run(f, 0, boot + 1);
    const t = boot + 1, before = composeFloor(f, inputs(t), TUNING).rgbi.slice();
    floorEvent(f, { kind: "wave", at: t - 0.5, dir: 0, rgb: [9, 9, 9] });
    const after = composeFloor(f, inputs(t), TUNING).rgbi;
    let right = 0, left = 0;
    for (let n = 0; n < GRID * GRID; n++) if (after[n * 4] === 9 && before[n * 4] !== 9) { if (n % GRID > GRID / 2) right++; else left++; }
    expect(right).toBeGreaterThan(3);
    expect(left).toBe(0);
  });
});

describe("ground cover (Ed, v171)", () => {
  const G = TUNING.groundCover, d = map.dancefloor;
  const around = (x: number, z: number, r: number) => { const out = []; for (let cj = Math.floor((z - r) / G.cell); cj <= Math.floor((z + r) / G.cell); cj++) for (let ci = Math.floor((x - r) / G.cell); ci <= Math.floor((x + r) / G.cell); ci++) out.push(...tuftsInCell(map, ci, cj, G.cell, G.spacing, G.density)); return out; };
  it("is seeded per cell: the same patch every time", () => {
    expect(tuftsInCell(map, 140, 150, G.cell, G.spacing, 1)).toEqual(tuftsInCell(map, 140, 150, G.cell, G.spacing, 1));
  });
  it("keeps off paths, the dancefloor's clearing and cleared ground, in each area's own kinds", () => {
    const list = around(d.x + 60, d.z + 40, 70);
    expect(list.length).toBeGreaterThan(500);
    for (const f of list) {
      expect(map.paths.at(f.x, f.z)).toBeNull();
      expect(map.hardClear(f.x, f.z)).toBe(false);
      expect(Math.hypot(f.x - d.x, f.z - d.z)).toBeGreaterThan(floorClearing(TUNING));
      expect(LOOKS[f.type].groundCover.kinds).toContain(TUFT_KINDS[f.kind]); // (its look: home's meadow has its own)
    }
  });
  it("is thick where the area says (grassland) and thin where it doesn't (cave mouth), and none at density 0", () => {
    const per = (id: string) => { let n = 0, area = 0; for (let y = 0; y < map.n; y++) for (let x = 0; x < map.n; x++) { if (AREA_TYPES[map.typeOf(x, y)].id !== id) continue; const s = map.siteOf(x, y); const l = around(s.x + 30, s.z + 30, 8).filter(f => map.areaAt(f.x, f.z).type === map.typeOf(x, y)); n += l.length; area++; if (area >= 3) break; } return n / Math.max(1, area); };
    expect(per("grassland")).toBeGreaterThan(per("cave-mouth") * 2);
    expect(tuftsInCell(map, 140, 150, G.cell, G.spacing, 0)).toEqual([]);
  });
});

describe("music by proximity (Ed, 2026-10-04)", () => {
  const M = TUNING.music;
  const g0 = newGame(6, TUNING), map = g0.map; // the game's own map
  const atW = (x: number, z: number, time: number) => { const g = at(x, z, time); return [g, g.witch] as const; };
  const at = (x: number, z: number, time: number) => { const g = { ...g0, speakers: [...g0.speakers], clock: { ...g0.clock, time } }; g.witch = { ...g.witch, x, z, seated: false }; return g; };
  it("is full and clear by the playing dancefloor, quiet and muffled in the deep forest", () => {
    const d = map.dancefloor, after = TUNING.boot.time + 1;
    const g = at(d.x, d.z, after), near = musicMix(g, g.witch);
    expect(near.volume).toBeCloseTo(1); expect(near.cutoff).toBeCloseTo(M.clear);
    const far = musicMix(...atW(d.x + M.farDist + 50, d.z, after));
    expect(far.volume).toBeCloseTo(M.floor); expect(far.cutoff).toBeCloseTo(M.muffle);
    const mid = musicMix(...atW(d.x + (M.nearDist + M.farDist) / 2, d.z, after));
    expect(mid.volume).toBeGreaterThan(far.volume); expect(mid.volume).toBeLessThan(near.volume);
    expect(mid.cutoff).toBeGreaterThan(far.cutoff); expect(mid.cutoff).toBeLessThan(near.cutoff);
  });
  it("grows as the home speakers boot up, and is distorted by damage close by", () => {
    const d = map.dancefloor;
    expect(musicMix(...atW(d.x, d.z, 0)).volume).toBeCloseTo(M.floor); // none on yet
    expect(musicMix(...atW(d.x, d.z, TUNING.boot.time / 2)).volume).toBeLessThan(musicMix(...atW(d.x, d.z, TUNING.boot.time + 1)).volume);
    const g = at(d.x, d.z, TUNING.boot.time + 1);
    expect(musicMix(g, g.witch).distort).toBe(0);
    g.speakers = g.speakers.map(() => "damaged");
    expect(musicMix(g, g.witch).distort).toBeGreaterThan(0.3);
    g.witch = { ...g.witch, x: d.x + M.farDist * 2 };
    expect(musicMix(g, g.witch).distort).toBe(0); // far away, nothing heard of it
  });
});

describe("the spell (Ed, 2026-10-04)", () => {
  const S = TUNING.spells.speed;
  it("casts the equipped speed boost: much faster for its duration, then recharges over its cooldown", () => {
    const s = newSpells(TUNING);
    expect(s.equipped).toBe("speed");
    expect(spellCharge(s, 0)).toBe(1);
    expect(castSpell(s, 10, TUNING)).toBe(true);
    expect(speedMultiplier(s, 10.1, TUNING)).toBeCloseTo(S.mult);
    expect(speedMultiplier(s, 10 + S.duration + 0.01, TUNING)).toBe(1);
    expect(castSpell(s, 11, TUNING)).toBe(false); // still recharging
    expect(spellCharge(s, 10 + (S.duration + S.cooldown) / 2)).toBeCloseTo(0.5);
    expect(castSpell(s, 10 + S.duration + S.cooldown, TUNING)).toBe(true);
  });
  it("makes her fly faster in the game", () => {
    const run = (spell: boolean) => { const g = newGame(4, TUNING); g.clock.paused = false; g.witch = { ...g.witch, seated: false }; stepGame(g, { ...NO_INTENT, zoom: 0, spell }, 1 / 60); for (let i = 0; i < 60; i++) stepGame(g, { ...NO_INTENT, moveX: 1, zoom: 0 }, 1 / 60); return Math.hypot(g.witch.vx, g.witch.vz); };
    expect(run(true)).toBeGreaterThan(run(false) * (S.mult - 0.3));
  });
});

describe("creature speeds (Ed, 2026-10-04: she is much faster than almost all of them)", () => {
  it("leaves the witch several times faster than any creature, the fast few rare, legends slowest", () => {
    const cs = spawnCreatures(map), L = TUNING.leash, run = (c: (typeof cs)[number]) => Math.max(c.speed, L.runSpeed * speedFactor(c.species, c.level, TUNING));
    const fastest = Math.max(...cs.map(run));
    expect(TUNING.groundSpeed).toBeGreaterThan(fastest * 2.5);
    const fast = cs.filter(c => TUNING.creatureSpeeds.fast.includes(c.species));
    expect(fast.length / cs.length).toBeLessThan(0.15); // rare
    const legends = cs.filter(c => c.level === 3), others = cs.filter(c => c.level !== 3);
    if (legends.length) expect(Math.max(...legends.map(run))).toBeLessThan(Math.min(...others.map(run)));
  });
});

describe("E cycles the sigils in the treetops (Ed, 2026-10-05)", () => {
  it("in the air sends the bottom sigil of the stack to the top, and never places or lifts", () => {
    const s = newLeash(), none: LeashControls = { sigil: false }, cs = spawnCreatures(map);
    s.stack.push(1, 2, 3); // 3 is the bottom (next down)
    for (const id of s.stack) cs[id].leashed = true;
    stepLeash(s, cs, { sigil: true }, { x: 0, z: 0 }, false, 1, 1 / 60, TUNING);
    expect(s.stack).toEqual([3, 1, 2]);
    expect(s.placed).toEqual([]);
    expect(s.events.map(e => e.kind)).toEqual(["cycled"]);
    expect(s.events[0].id).toBe(3);
    stepLeash(s, cs, none, { x: 0, z: 0 }, false, 1, 1 / 60, TUNING);
    expect(s.stack).toEqual([3, 1, 2]);
  });
  it("on the ground never cycles: it puts the bottom sigil down", () => {
    const s = newLeash(), cs = spawnCreatures(map);
    s.stack.push(1, 2, 3);
    for (const id of s.stack) cs[id].leashed = true;
    stepLeash(s, cs, { sigil: true }, { x: 0, z: 0 }, true, 1, 1 / 60, TUNING);
    expect(s.events.some(e => e.kind === "cycled")).toBe(false);
    expect(s.placed.map(p => p.id)).toEqual([3]);
    expect(s.stack).toEqual([1, 2]);
  });
});

describe("wall objects as features", () => {
  const W = TUNING.walls;
  // Areas of a type that own ground (a cell whose site lies in another area has none).
  const cellsOf = (id: string) => { const out: [number, number][] = []; for (let y = 0; y < map.n; y++) for (let x = 0; x < map.n; x++) { if (AREA_TYPES[map.typeOf(x, y)].id !== id) continue; const s = map.siteOf(x, y), c = map.areaAt(s.x, s.z).cell; if (c[0] === x && c[1] === y) out.push([x, y]); } return out; };
  it("lay garden walls as joined runs (no isolated stubs), with flower beds along them, a few runs per garden", () => {
    const cells = cellsOf("garden");
    expect(cells.length).toBeGreaterThan(0);
    let pieces = 0, joined = 0, beds = 0;
    for (const [cx, cy] of cells) {
      const f = wallFeatures(map, cx, cy);
      expect(f.walls.length).toBeLessThanOrEqual(W.runs[1] * W.runLength[1]);
      for (const p of f.walls) { pieces++; if (f.walls.some(q => q !== p && Math.hypot(q.x - p.x, q.z - p.z) < 3.2)) joined++; }
      beds += f.beds.length;
    }
    expect(joined / pieces).toBeGreaterThan(0.85);
    expect(beds).toBeGreaterThan(0);
  });
  it("set the shrine's henge stones in circles, not an even field", () => {
    let stones = 0, inRing = 0;
    for (const [cx, cy] of cellsOf("stone-shrine")) {
      const f = wallFeatures(map, cx, cy);
      expect(f.walls.length).toBeLessThanOrEqual(W.rings[1] * (W.ringStones[1] + 8) + 1);
      expect(f.walls.length).toBeGreaterThanOrEqual(Math.ceil(W.ringStones[0] / 2)); // every shrine has its circle
      for (const p of f.walls) { stones++; if (f.walls.filter(q => q !== p && Math.hypot(q.x - p.x, q.z - p.z) < 14).length >= 2) inRing++; }
    }
    expect(stones).toBeGreaterThan(5);
    expect(inRing / stones).toBeGreaterThan(0.8);
  });
  it("are the same every time and keep off paths and the reserved spots", () => {
    for (const [cx, cy] of [...cellsOf("garden"), ...cellsOf("stone-shrine"), ...cellsOf("wetland")].slice(0, 8)) {
      const f = wallFeatures(map, cx, cy);
      expect(wallFeatures(map, cx, cy)).toEqual(f);
      for (const p of f.walls) { expect(map.paths.at(p.x, p.z)).toBeNull(); expect(map.reserved(p.x, p.z, 1.5)).toBe(false); }
    }
  });
});

describe("spawn markers", () => {
  it("stand on every area the party hasn't reached, at its soundsystem's spot; awake exactly where the next wave will spread", () => {
    const p = newParty(map);
    for (let w = 0; w < 3; w++) {
      const marks = spawnMarkers(p, map), awake = marks.filter(m => m.awake).map(m => m.key).sort();
      for (const m of marks) { expect(p.areas.has(m.key)).toBe(false); const s = map.soundsystemSpot(m.cell[0], m.cell[1]); expect([m.x, m.z]).toEqual([s.x, s.z]); }
      expect(awake.length).toBeGreaterThan(0);
      expect(awake).toEqual(nextWave(p, map).map(c => c.key).sort());
      const taken = spreadWave(p, map, w * 10).map(a => `${a.cell[0]},${a.cell[1]}`).sort();
      expect(taken).toEqual(awake);
    }
  });
  it("replace the random rune stones (campfires stay)", () => {
    const f = new Forest(map), s = map.start, l = f.lightsNear(s.x, s.z, 900);
    expect(l.some(x => x.kind === "stone")).toBe(false);
    expect(l.some(x => x.kind === "campfire")).toBe(true);
  });
});

describe("the simulation (Stage 4)", () => {
  // A digest of the game's state: every witch, creature, the party and the clock.
  const digest = (g: ReturnType<typeof newGame>) => {
    const parts: number[] = [g.clock.time, g.party.wave, g.party.areas.size];
    for (const w of g.witches) parts.push(w.body.x, w.body.z, w.body.lift, w.leash.stack.length);
    for (const c of g.creatures) parts.push(c.x, c.z, c.level, c.leashed ? 1 : 0);
    let h = 2166136261;
    for (const v of parts) { const s = v.toFixed(9); for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); }
    return (h >>> 0).toString(16);
  };
  const play = (frames: number[]) => {
    const g = newGame(321, TUNING);
    g.clock.paused = false;
    frames.forEach((dt, i) => stepGame(g, { moveX: Math.sin(i / 40), moveZ: Math.cos(i / 55), toggleMode: i === 200, zoom: 0, spell: i === 90 }, dt));
    return g;
  };

  it("is deterministic: the same seed and inputs give the same state", () => {
    const frames = Array.from({ length: 600 }, (_, i) => (i % 7 === 0 ? 1 / 30 : 1 / 60));
    expect(digest(play(frames))).toBe(digest(play(frames)));
  }, 60000);

  it("steps in fixed steps: a frame's length only decides how many", () => {
    const g = newGame(321, TUNING);
    g.clock.paused = false;
    stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 120);
    expect(g.clock.time).toBe(0); // half a step: nothing yet, eased between
    expect(g.alpha).toBeCloseTo(0.5);
    stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 120);
    expect(g.clock.time).toBeCloseTo(STEP);
    stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 3 * STEP);
    expect(g.clock.time).toBeCloseTo(4 * STEP);
  });

  it("keeps a press made in a frame too short for a step for the next step", () => {
    const g = newGame(321, TUNING);
    g.clock.paused = false;
    g.witch = { ...g.witch, seated: false };
    stepGame(g, { moveX: 0, moveZ: 0, toggleMode: true, zoom: 0 }, STEP / 4);
    expect(g.witch.mode).toBe("ground");
    stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP);
    expect(g.witch.mode).toBe("rising");
  });

  it("applies a press once, however many steps a slow frame runs", () => {
    const g = newGame(321, TUNING);
    g.clock.paused = false;
    g.witch = { ...g.witch, seated: false };
    stepGame(g, { moveX: 0, moveZ: 0, toggleMode: true, zoom: 0 }, 0.1); // six steps
    expect(g.witch.mode).toBe("rising");
  });

  it("has a witch per player, the first the camera's", () => {
    const g = newGame(321, TUNING, 3);
    expect(g.witches.length).toBe(3);
    expect(g.witch).toBe(g.witches[0].body);
    expect(g.leash).toBe(g.witches[0].leash);
  });
});

describe("the dash (Ed, 2026-10-04)", () => {
  const ready = () => { const g = newGame(321, TUNING); g.clock.paused = false; g.witch = { ...g.witch, seated: false }; return g; };
  const run = (g: ReturnType<typeof newGame>, n: number, c: Partial<Parameters<typeof stepGame>[1]> = {}) => { for (let i = 0; i < n; i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...c }, STEP); };

  it("blinks dash.distance metres the way she steers in one step, gone for a moment, then waits out its cooldown", () => {
    const g = ready(), x0 = g.witch.x, z0 = g.witch.z;
    run(g, 1, { dash: true, moveX: 0, moveZ: -1 });
    // One step: there already, no travel between.
    expect(z0 - g.witch.z).toBeGreaterThan(TUNING.dash.distance * 0.8);
    expect(Math.abs(g.witch.x - x0)).toBeLessThan(0.5);
    expect(dashing(g.witches[0].dash, g.clock.time)).toBe(true); // gone: not drawn, not hit
    run(g, Math.ceil(g.buffs.tuning.dash.gone / STEP) + 1); // (the home legend's buff may be Curl)
    expect(dashing(g.witches[0].dash, g.clock.time)).toBe(false);
    const z1 = g.witch.z;
    run(g, 1, { dash: true, moveX: 0, moveZ: -1 }); // still cooling down: no blink
    run(g, 10);
    expect(z1 - g.witch.z).toBeLessThan(TUNING.dash.distance * 0.5);
  });

  it("holds a press made just before it's ready (dash.buffer), and lets go of one made too early", () => {
    const g = ready(), D = g.witches[0].dash;
    run(g, 1, { dash: true, moveX: 0, moveZ: -1 });
    const first = D.at;
    // Too early: pressed well over dash.buffer before it's ready, it's forgotten.
    while (g.clock.time < D.readyAt - g.buffs.tuning.dash.buffer - 0.2) run(g, 1);
    run(g, 1, { dash: true, moveX: 0, moveZ: -1 });
    while (g.clock.time < D.readyAt + 0.1) run(g, 1);
    expect(D.at).toBe(first);
    // Just early: pressed inside dash.buffer, it blinks the moment it's ready.
    run(g, 1, { dash: true, moveX: 0, moveZ: -1 }); // (ready now: this one goes at once)
    const second = D.at;
    expect(second).toBeGreaterThan(first);
    while (g.clock.time < D.readyAt - g.buffs.tuning.dash.buffer / 2) run(g, 1);
    run(g, 1, { dash: true, moveX: 0, moveZ: -1 });
    while (g.clock.time < D.readyAt + 2 * STEP) run(g, 1);
    expect(D.at).toBeGreaterThan(second);
  });

  it("goes toward the cursor (Ed, 2026-10-06), the way she faces with the cursor on her, and the way she steers with none", () => {
    const B = { minX: -100, maxX: 100, minZ: -100, maxZ: 100 }, w = { ...newWitch(0, 0), facing: -1 as const };
    const d = newDash();
    startDash(d, w, 1, 0, 1, TUNING, B, undefined, 1, 0, 0, 30); // steering east, the cursor 30 m south
    expect(d.toX).toBeCloseTo(0); expect(d.toZ).toBeCloseTo(TUNING.dash.distance);
    const d2 = newDash();
    startDash(d2, w, 1, 0, 1, TUNING, B, undefined, 1, 0, 0.3, 0.2); // the cursor on her: the way she faces
    expect(d2.toX).toBeCloseTo(-TUNING.dash.distance); expect(d2.toZ).toBeCloseTo(0);
    const d3 = newDash();
    startDash(d3, w, 0, 1, 1, TUNING, B); // no cursor (touch): the way she steers
    expect(d3.toZ).toBeCloseTo(TUNING.dash.distance);
    const d4 = newDash();
    startDash(d4, w, 1, 0, 1, { ...TUNING, dash: { ...TUNING.dash, toCursor: false } }, B, undefined, 1, 0, 0, 30); // off: the way she steers
    expect(d4.toX).toBeCloseTo(TUNING.dash.distance);
  });

  it("goes the way she faces when she's still, and stops short of anything in the way", () => {
    const w = { ...newWitch(0, 0), facing: -1 as const }, d = newDash(), B = { minX: -100, maxX: 100, minZ: -100, maxZ: 100 };
    expect(startDash(d, w, 0, 0, 1, TUNING, B)).toBe(true);
    expect(d.toX).toBeCloseTo(-TUNING.dash.distance); expect(d.toZ).toBeCloseTo(0);
    const d2 = newDash();
    startDash(d2, w, 1, 0, 1, TUNING, B, x => x < 6); // blocked from 6 m on
    expect(d2.toX).toBeLessThan(6); expect(d2.toX).toBeGreaterThan(5);
  });

  it("never lands in a tree trunk", () => {
    const g = ready();
    const out = g.map.homeRadius + 60, trees = g.forest.treesNear(g.witch.x + out, g.witch.z + out, 40); // (beyond home's meadow, where trees grow)
    expect(trees.length).toBeGreaterThan(0);
    let tried = 0;
    for (const tr of trees.slice(0, 12)) {
      const W = g.witches[0];
      W.dash = newDash();
      g.witch = { ...g.witch, x: tr.x - TUNING.dash.distance, z: tr.z, vx: 0, vz: 0, mode: "ground", lift: 0, seated: false };
      run(g, 1, { dash: true, moveX: 1, moveZ: 0 });
      for (const p of g.forest.treesNear(g.witch.x, g.witch.z, 3)) expect(Math.hypot(p.x - g.witch.x, p.z - g.witch.z)).toBeGreaterThanOrEqual(TUNING.dash.clear.tree - 1e-6);
      tried++;
    }
    expect(tried).toBeGreaterThan(0);
  });

  it("can't be hit while she's gone", () => {
    const g = ready(), W = g.witches[0], hp = () => JSON.stringify(W.health);
    run(g, 1, { dash: true, moveX: 1, moveZ: 0 });
    const before = hp();
    hitWitch(g, 0, g.clock.time);
    expect(hp()).toBe(before);
    run(g, Math.ceil(g.buffs.tuning.dash.gone / STEP) + 1); // (the home legend's buff may be Curl)
    hitWitch(g, 0, g.clock.time + 0.01); // back: hittable as ever
    expect(hp()).not.toBe(before);
  });

  it("does nothing over the treetops or while she sits", () => {
    const g = newGame(321, TUNING); g.clock.paused = false;
    const x0 = g.witch.x;
    run(g, 1, { dash: true });
    expect(g.witches[0].dash.until).toBe(-Infinity);
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    run(g, 1, { dash: true });
    expect(g.witches[0].dash.until).toBe(-Infinity);
    expect(Math.abs(g.witch.x - x0)).toBeLessThan(1);
  });
});
