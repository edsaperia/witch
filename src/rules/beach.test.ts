// The beach (Ed, 2026-10-06: "Outside of the circular map, there is the sea. A beach surrounds the
// island ... If you try and fly past the beach, you land and stargaze ... Other witches can be found
// on the beach occasionally; if you land near them, you chat, hold hands, and hug ... most games
// won't ever go to the beach"): the sand clear of everything, her lying down, the beach witches, and
// none of it doing anything in an ordinary run.
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { Forest } from "./forest";
import { beachOf, edgeRadius } from "./mapShape";
import { newWitch, stepWitch, NO_INTENT, type Intent, type WitchState } from "./witch";
import { newBeachWitches, stepBeachWitches, SEQUENCE } from "./beach";
import { TUNING, type Tuning } from "./tuning";

const SEEDS = [1, 123, 4242];
const STEP = 1 / 60;

describe("the beach", () => {
  for (const seed of SEEDS) {
    it(`nothing grows, stands or runs on the sand or in the sea (seed ${seed})`, () => {
      const map = generateMap(seed, TUNING), b = beachOf(map.bounds, TUNING)!, forest = new Forest(map);
      const c = map.bounds.circle!, e0 = edgeRadius(c, c.x + 1, c.z), mid = { x: c.x + e0 - b.sandAt(0) / 2, z: c.z }; // (due east, on the coast's own edge there, halfway across the sand there)
      expect(b.intoSand(mid.x, mid.z)).toBeGreaterThan(0); // the sand inside the edge, the sea beyond it
      expect(b.intoSea(mid.x, mid.z)).toBeLessThan(0);
      expect(b.intoSea(c.x + e0 + b.out + 1, c.z)).toBeGreaterThan(0);
      expect(b.intoSand(c.x, c.z)).toBeLessThan(0);
      for (let k = 0; k < 64; k++) {
        const a = (k / 64) * Math.PI * 2 - Math.PI, d = b.edge(a) - b.sandAt(a) + 1 + (k % 8) * 20, x = b.x + Math.cos(a) * d, z = b.z + Math.sin(a) * d;
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
      const b = beachOf(generateMap(seed, TUNING).bounds, TUNING)!, V = TUNING.beach!.vary!, w = [...b.sand];
      expect(Math.max(...w)).toBeGreaterThan(b.width * 1.8);
      expect(Math.min(...w)).toBeLessThan(b.width * 0.3);
      expect(Math.min(...w)).toBeGreaterThanOrEqual(V.min);
      expect(w.some((_, k) => b.rockyAt(-Math.PI + (k / w.length) * Math.PI * 2) > 0.5)).toBe(true);
      // The sand starts where its width says, round the coast.
      for (let k = 0; k < 16; k++) {
        const a = -Math.PI + (k / 16) * Math.PI * 2, d = b.edge(a) - b.sandAt(a);
        expect(b.intoSand(b.x + Math.cos(a) * (d + 0.5), b.z + Math.sin(a) * (d + 0.5))).toBeGreaterThan(0);
        expect(b.intoSand(b.x + Math.cos(a) * (d - 0.5), b.z + Math.sin(a) * (d - 0.5))).toBeLessThan(0);
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
  const map = generateMap(123, TUNING), c = map.bounds.circle!, out = { x: 0.6, z: 0.8 }, edge = edgeRadius(c, c.x + out.x, c.z + out.z); // (the coast's edge that way)
  const at = (d: number, mode: WitchState["mode"]): WitchState => ({ ...newWitch(c.x + out.x * d, c.z + out.z * d), mode, lift: mode === "treetop" ? 1 : 0 });
  const seaward: Intent = { moveX: out.x, moveZ: out.z, toggleMode: false }, inland: Intent = { moveX: -out.x, moveZ: -out.z, toggleMode: false };
  const run = (w: WitchState, i: Intent, secs: number) => { for (let k = 0; k < secs / STEP; k++) w = stepWitch(w, i, STEP, TUNING, map.bounds); return w; };

  it("on foot: pushing out against the edge she lies down, and stays down", () => {
    let w = run(at(edge - 60, "ground"), seaward, 12);
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
    let w = at(edge - 60, "treetop"), saw = false;
    for (let k = 0; k < 20 / STEP && !w.stargazing; k++) { w = stepWitch(w, seaward, STEP, TUNING, map.bounds); if (w.mode === "descending") saw = true; }
    expect(saw).toBe(true);
    expect(w.mode).toBe("ground");
    expect(w.stargazing).toBe(true);
    w = stepWitch(w, { ...NO_INTENT, toggleMode: true }, STEP, TUNING, map.bounds); // rising gets her up too
    expect(w.stargazing).toBeFalsy();
    expect(w.mode).toBe("rising");
  });

  it("never in the woods, nor flying along the beach", () => {
    expect(run(at(edge - 400, "ground"), seaward, 6).stargazing).toBeFalsy();
    const along: Intent = { moveX: -out.z, moveZ: out.x, toggleMode: false };
    expect(run(at(edge - 30, "ground"), along, 6).stargazing).toBeFalsy();
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
      const angles = spots.map(s => Math.atan2(s.z - b.z, s.x - b.x)).sort((p, q) => p - q), gap = (Math.PI * 2) / spots.length;
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
    for (const w of s.list) { expect(b.intoSand(w.x, w.z)).toBeGreaterThan(0); expect(Math.hypot(w.x - b.x, w.z - b.z)).toBeLessThan(edgeRadius(map.bounds.circle!, w.x, w.z)); }
    // far away: nothing moves, nothing is picked
    const before = JSON.stringify(s.list);
    let time = 0;
    for (let k = 0; k < 600; k++) stepBeachWitches(s, [{ x: map.dancefloor.x, z: map.dancefloor.z, onFoot: true, moving: false }], (time += STEP), STEP, t);
    expect(JSON.stringify(s.list)).toBe(before);
    expect(s.idle).toBe(true);
    // she lands a few metres off them and keeps still
    const me = { x: s.x - (s.x - b.x) * 0.004, z: s.z - (s.z - b.z) * 0.004, onFoot: true, moving: false };
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
