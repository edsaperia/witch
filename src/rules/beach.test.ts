// The beach (Ed, 2026-10-06: "Outside of the circular map, there is the sea. A beach surrounds the
// island ... If you try and fly past the beach, you land and stargaze ... Other witches can be found
// on the beach occasionally; if you land near them, you chat, hold hands, and hug ... most games
// won't ever go to the beach"): the sand clear of everything, her lying down, the beach witches, and
// none of it doing anything in an ordinary run.
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { Forest } from "./forest";
import { beachOf } from "./mapShape";
import { facing } from "../test/coast";
import { newWitch, stepWitch, NO_INTENT, type Intent, type WitchState } from "./witch";
import { newBeachWitches, stepBeachWitches, SEQUENCE } from "./beach";
import { TUNING, type Tuning } from "./tuning";

// Retain the full seeded coast: circumference sampling, separated beach spots and 400–1000 m inland probes are the subject.
const SEEDS = [1, 123, 4242];
const STEP = 1 / 60;

describe("the beach", () => {
  for (const seed of SEEDS) {
    it(`nothing grows, stands or runs on the sand or in the sea (seed ${seed})`, () => {
      const map = generateMap(seed, TUNING), b = beachOf(map.bounds, TUNING)!, forest = new Forest(map), L = b.land, sea = L.loops.findIndex(l => l.sea);
      const p = facing(L, 0), w = b.sandAt(p.x - p.nx, p.z - p.nz), mid = { x: p.x - p.nx * w / 2, z: p.z - p.nz * w / 2 }; // (an eastward stretch of coast, halfway across the sand there)
      expect(b.intoSand(mid.x, mid.z)).toBeGreaterThan(0); // the sand inside the edge, the sea beyond it
      expect(b.intoSea(mid.x, mid.z)).toBeLessThan(0);
      expect(b.intoSea(p.x + p.nx * (b.out + 1), p.z + p.nz * (b.out + 1))).toBeGreaterThan(0);
      expect(b.intoSand(map.dancefloor.x, map.dancefloor.z)).toBeLessThan(0);
      for (let k = 0; k < 64; k++) {
        const q = L.along(sea, (k / 64) * L.loops[sea].length), d = 1 + (k % 8) * 20, x = q.x - q.nx * d, z = q.z - q.nz * d;
        if (b.intoSand(x, z) <= 0) continue; // (past a narrow stretch's sand: the woods)
        expect(map.hardClear(x, z)).toBe(true);
        expect(map.treeWeight(x, z)).toBe(0);
        for (const t of forest.treesNear(x, z, 12)) expect(b.intoSand(t.x, t.z)).toBeLessThan(0);
        for (const t of forest.bushesNear(x, z, 12)) expect(b.intoSand(t.x, t.z)).toBeLessThan(0);
        for (const l of forest.lightsNear(x, z, 12)) expect(b.intoSand(l.x, l.z)).toBeLessThan(0); // (no pond, campfire or stone on it)
      }
      // every path, road, railway and stream stops short of the sand
      for (const l of map.paths.lines) for (const p of l.pts) expect(b.intoSand(p[0], p[1])).toBeLessThan(-l.half);
      for (const j of map.paths.junctions) expect(map.paths.lines[j.line].pts.some(p => p[0] === j.x && p[1] === j.z)).toBe(true);
    });
  }

  it("varies in width round the coast (Ed, 2026-10-06: \"more irregularly shaped\"): wide bays, narrows, rocky stretches", () => {
    for (const seed of SEEDS) {
      const b = beachOf(generateMap(seed, TUNING).bounds, TUNING)!, V = TUNING.beach!.vary!, L = b.land, sea = L.loops.findIndex(l => l.sea), len = L.loops[sea].length;
      const w = Array.from({ length: 512 }, (_, k) => b.sandAlong(sea, (k / 512) * len));
      expect(Math.max(...w)).toBeGreaterThan(b.width * 1.8);
      expect(Math.min(...w)).toBeLessThan(b.width * 0.3);
      expect(Math.min(...w)).toBeGreaterThanOrEqual(V.min);
      expect(w.some((_, k) => b.rockyAlong(sea, (k / 512) * len) > 0.5)).toBe(true);
      // The sand starts where its width says, along the coast (on its straight stretches: a bay's far side is nearer elsewhere).
      for (let k = 0; k < 64; k++) {
        const q = L.along(sea, (k / 64) * len), ww = b.sandAlong(sea, (k / 64) * len), straight = [5, ww * 0.5, ww, ww + 10].every(d => Math.abs(L.distAt(q.x - q.nx * d, q.z - q.nz * d) - d) < 1);
        if (!straight) continue;
        expect(b.intoSand(q.x - q.nx * (ww - 2.5), q.z - q.nz * (ww - 2.5))).toBeGreaterThan(0); // (within a few metres: eased between the land map's samples)
        expect(b.intoSand(q.x - q.nx * (ww + 2.5), q.z - q.nz * (ww + 2.5))).toBeLessThan(0);
      }
    }
    // How far in or out is a true distance anywhere, deep inland too (the waves' loudness, the hills' easing and the paths'
    // clipping read it as a distance): the land map's against the nearest point of its coast, measured outright.
    for (const seed of SEEDS) {
      const b = beachOf(generateMap(seed, TUNING).bounds, TUNING)!, L = b.land;
      for (let k = 0; k < 200; k++) {
        const x = L.box.minX + ((k * 0.618) % 1) * (L.box.maxX - L.box.minX), z = L.box.minZ + ((k * 0.381) % 1) * (L.box.maxZ - L.box.minZ), s = L.shore(x, z);
        expect(Math.abs(L.distAt(x, z)) - Math.abs(s.dist)).toBeLessThan(1.5);
        expect(b.intoSea(x, z)).toBeCloseTo(-L.distAt(x, z) - b.out, 6);
      }
    }
    // The same for the same seed; another seed, another shape.
    const one = beachOf(generateMap(1, TUNING).bounds, TUNING)!, again = beachOf(generateMap(1, TUNING).bounds, TUNING)!, other = beachOf(generateMap(123, TUNING).bounds, TUNING)!;
    expect([...one.sand]).toEqual([...again.sand]);
    expect([...one.sand]).not.toEqual([...other.sand]);
  });

  it("off, or on the square map, there's none", () => {
    expect(beachOf(generateMap(1, { ...TUNING, beach: { ...TUNING.beach!, on: false } }).bounds, { beach: { ...TUNING.beach!, on: false } })).toBeNull();
    expect(beachOf({ minX: 0, maxX: 10, minZ: 0, maxZ: 10 }, TUNING)).toBeNull();
  });
});

describe("flying on past the beach, she lands and stargazes", () => {
  const map = generateMap(123, TUNING), p = facing(map.bounds.land!, Math.atan2(0.8, 0.6)), out = { x: p.nx, z: p.nz }; // (a straight stretch of coast facing out that way)
  const at = (d: number, mode: WitchState["mode"]): WitchState => ({ ...newWitch(p.x - out.x * d, p.z - out.z * d), mode, lift: mode === "treetop" ? 1 : 0 });
  const edge = 0, c = { x: p.x - out.x * 1000, z: p.z - out.z * 1000 }; // (distances in from the coast; a point well inland, for "back inland")
  const seaward: Intent = { moveX: out.x, moveZ: out.z, toggleMode: false }, inland: Intent = { moveX: -out.x, moveZ: -out.z, toggleMode: false };
  const run = (w: WitchState, i: Intent, secs: number) => { for (let k = 0; k < secs / STEP; k++) w = stepWitch(w, i, STEP, TUNING, map.bounds); return w; };

  it("on foot: pushing out against the edge she lies down, and stays down", () => {
    let w = run(at(edge + 60, "ground"), seaward, 12);
    expect(w.stargazing).toBe(true);
    expect(beachOf(map.bounds, TUNING)!.intoSand(w.x, w.z)).toBeGreaterThan(0);
    const lay = { x: w.x, z: w.z };
    w = run(w, seaward, 3); // still pushing: still lying there
    w = run(w, NO_INTENT, 3); // let go: still lying there
    expect(w.stargazing).toBe(true);
    expect(w.x).toBe(lay.x); expect(w.z).toBe(lay.z);
    w = run(w, inland, 0.5); // any other way: up and off
    expect(w.stargazing).toBeFalsy();
    expect(Math.hypot(w.x - c.x, w.z - c.z)).toBeLessThan(Math.hypot(lay.x - c.x, lay.z - c.z));
  });

  it("from the treetops: she comes down first", () => {
    let w = at(edge + 60, "treetop"), saw = false;
    for (let k = 0; k < 20 / STEP && !w.stargazing; k++) { w = stepWitch(w, seaward, STEP, TUNING, map.bounds); if (w.mode === "descending") saw = true; }
    expect(saw).toBe(true);
    expect(w.mode).toBe("ground");
    expect(w.stargazing).toBe(true);
    w = stepWitch(w, { ...NO_INTENT, toggleMode: true }, STEP, TUNING, map.bounds); // rising gets her up too
    expect(w.stargazing).toBeFalsy();
    expect(w.mode).toBe("rising");
  });

  it("never in the woods, nor flying along the beach", () => {
    expect(run(at(edge + 400, "ground"), seaward, 6).stargazing).toBeFalsy();
    const along: Intent = { moveX: -out.z, moveZ: out.x, toggleMode: false };
    expect(run(at(edge + 30, "ground"), along, 3).stargazing).toBeFalsy(); // (a few seconds along a straight stretch)
  });
});

describe("witches on the beach", () => {
  const chanced = (on: boolean): Tuning => ({ ...TUNING, beach: { ...TUNING.beach!, witchChance: on ? 1 : 0 } });

  it("in every run, a handful of spots spread round the whole coast, never bunched (Ed, 2026-10-06: \"always ... only a handful spread around it\")", () => {
    const [lo, hi] = TUNING.beach!.spots!;
    for (const seed of [1, 123, 4242, 90210, 925469]) {
      const map = generateMap(seed, TUNING), b = beachOf(map.bounds, TUNING)!, spots = newBeachWitches(seed, map.bounds, TUNING)!;
      expect(spots, `seed ${seed}`).not.toBeNull();
      expect(spots.length).toBeGreaterThanOrEqual(lo);
      expect(spots.length).toBeLessThanOrEqual(hi);
      // (by their places along the coast: each a share of its length round)
      const len = b.land.loops[b.land.shore(spots[0].x, spots[0].z).loop].length;
      const angles = spots.map(s => b.land.shore(s.x, s.z).s / len * Math.PI * 2).sort((p, q) => p - q), gap = (Math.PI * 2) / spots.length;
      for (let i = 0; i < angles.length; i++) {
        const next = i + 1 < angles.length ? angles[i + 1] : angles[0] + Math.PI * 2;
        expect(next - angles[i], `seed ${seed}: spots ${i} and ${i + 1}`).toBeGreaterThan(gap * 0.3); // (a third of the gap's nudge either way at most)
      }
      for (const s of spots) {
        expect(s.list.length).toBeGreaterThanOrEqual(TUNING.beach!.witches[0]);
        expect(s.list.length).toBeLessThanOrEqual(TUNING.beach!.witches[1]);
        for (const w of s.list) expect(b.intoSand(w.x, w.z)).toBeGreaterThan(0);
      }
    }
    const map = generateMap(123, TUNING);
    expect(newBeachWitches(123, map.bounds, chanced(false))).toBeNull(); // (witchChance 0: none)
  });

  it("each spot left alone unless she's near it", () => {
    const map = generateMap(123, TUNING), spots = newBeachWitches(123, map.bounds, TUNING)!, s0 = spots[0];
    const before = JSON.stringify(spots.map(s => s.list));
    let time = 0;
    const me = { x: s0.x, z: s0.z, onFoot: true, moving: false };
    for (let k = 0; k < 300; k++) for (const s of spots) stepBeachWitches(s, [me], (time += STEP), STEP, TUNING);
    expect(spots[0].idle).toBe(false);
    for (const s of spots.slice(1)) expect(s.idle).toBe(true);
    expect(JSON.stringify(spots.slice(1).map(s => s.list))).toBe(JSON.stringify(JSON.parse(before).slice(1)));
  });

  it("lie on the sand, left alone while she's away, and chat, hold hands, hug and stargaze with her when she lands by them", () => {
    const t = chanced(true), map = generateMap(123, t), b = beachOf(map.bounds, t)!, s = newBeachWitches(123, map.bounds, t)![0];
    expect(s.list.length).toBeGreaterThanOrEqual(t.beach!.witches[0]);
    expect(s.list.length).toBeLessThanOrEqual(t.beach!.witches[1]);
    for (const w of s.list) { expect(b.intoSand(w.x, w.z)).toBeGreaterThan(0); expect(b.land.distAt(w.x, w.z)).toBeGreaterThan(0); }
    // far away: nothing moves, nothing is picked
    const before = JSON.stringify(s.list);
    let time = 0;
    for (let k = 0; k < 600; k++) stepBeachWitches(s, [{ x: map.dancefloor.x, z: map.dancefloor.z, onFoot: true, moving: false }], (time += STEP), STEP, t);
    expect(JSON.stringify(s.list)).toBe(before);
    expect(s.idle).toBe(true);
    // she lands a few metres off them and keeps still
    const sh = b.land.shore(s.x, s.z), me = { x: s.x - sh.nx * 2.5, z: s.z - sh.nz * 2.5, onFoot: true, moving: false }; // (a few metres inland of them)
    const seen: string[] = [];
    for (let k = 0; k < (t.beach!.idleAfter + t.beach!.turn * 4 + 1) / STEP; k++) {
      stepBeachWitches(s, [me], (time += STEP), STEP, t);
      const I = s.players[0];
      if (I.pose && seen[seen.length - 1] !== I.pose) seen.push(I.pose);
    }
    expect(seen.slice(0, 4)).toEqual(SEQUENCE.map(q => q.pose));
    // lying together to stargaze, they stay so while she keeps still (the hearts' time: render/beach.ts)
    for (let k = 0; k < (t.beach!.turn * 3) / STEP; k++) stepBeachWitches(s, [me], (time += STEP), STEP, t);
    expect(s.players[0].pose).toBe("stargaze");
    expect(s.list.find(w => w.id === s.players[0].partner)!.pose).toBe("stargaze");
    const I = s.players[0], mate = s.list.find(w => w.id === I.partner)!;
    expect(mate.partner).toBe(-1);
    expect(Math.hypot(mate.x - me.x, mate.z - me.z)).toBeLessThan(3); // she came over
    // moving off lets her go
    stepBeachWitches(s, [{ ...me, moving: true }], (time += STEP), STEP, t);
    expect(s.players[0].activity).toBeNull();
    expect(mate.partner).toBeNull();
  });
});
