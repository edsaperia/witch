// The zoo's little gold fences (rules/zooMap.ts zooFence; Ed, 2026-10-26: "Zoo areas, apart from home, should have a little gold
// fence around them, that stop creatures passing"; "the witch can fly over the fence, not walk"; "lakes get fences too"): on foot
// nothing crosses an island's outline, she slides along it; she rises and flies over; nothing holds her down inside one; a
// creature pushed out is put back in.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { insideIsland, reachAt, type ZooIsland } from "./zooMap";
import { knockOut } from "./knockout";
import { deckOf } from "./treehouse";
import { ZOO_CONFIG, zooExitSpot } from "./zoo";

// Keep the complete chart-shaped zoo: discovered/unfound fence geometry, shared plaza, knockout return and outer-waterfall exit are mode-specific integration coverage.
const C: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const run = (g: Game, s: number, c: Partial<Controls> = {}) => { for (let i = 0; i < Math.round(s / STEP); i++) stepGame(g, { ...C, ...c }, STEP); };
const zoo = (found: string[]) => { const g = newGame(7, { ...TUNING, map: { ...TUNING.map!, shape: "zoo", island: "", islandAreas: 0, found } }); g.clock.paused = false; return g; };
/** On foot at (x, z). */
const at = (g: Game, x: number, z: number) => { g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, perch: undefined, mode: "ground", lift: 0 }; };
const islands = (g: Game) => g.map.zoo!.layout!.islands;
/** A point `off` metres out from an island's coast (in, if negative), due east of its middle. */
const east = (I: ZooIsland, off: number) => ({ x: I.x + reachAt(I.reach, 0) + off, z: I.z });

describe("the zoo's gold fences (Ed, 2026-10-26)", () => {
  const g0 = zoo(["*"]);

  it("on foot she can't walk out of an island, nor into one from the street: she stops at the fence", () => {
    const g = g0, I = islands(g).find(J => J.found)!;
    const a = east(I, -6); at(g, a.x, a.z);
    run(g, 4, { moveX: 1 });
    expect(insideIsland(I, g.witch.x, g.witch.z)).toBe(true);
    expect(g.witch.mode).toBe("ground");
    const b = east(I, 8); at(g, b.x, b.z);
    run(g, 4, { moveX: -1 });
    expect(insideIsland(I, g.witch.x, g.witch.z)).toBe(false);
  });

  it("and not round an undiscovered island's lake either (lakes get fences too)", () => {
    const g = zoo([]), L = islands(g).find(J => !J.found)!;
    const b = east(L, 8); at(g, b.x, b.z);
    run(g, 4, { moveX: -1 });
    expect(insideIsland(L, g.witch.x, g.witch.z)).toBe(false);
  });

  it("she rises inside an island and flies over its fence, followers or not, and comes down outside", () => {
    const g = g0, I = islands(g).find(J => J.found)!;
    const a = east(I, -10); at(g, a.x, a.z);
    // (a heavy following that grounds her in play: in the zoo it doesn't hold her down)
    const adults = g.creatures.filter(c => c.cell[0] === I.cell[0] && c.cell[1] === I.cell[1] && c.level === 2 && !c.boss);
    for (const c of adults.slice(0, 2)) { c.leashed = true; g.leash.stack.push(c.id); }
    stepGame(g, { ...C, toggleMode: true }, STEP);
    run(g, 2);
    expect(g.witch.mode === "treetop" || g.witch.mode === "rising").toBe(true);
    run(g, 4, { moveX: 1 });
    expect(insideIsland(I, g.witch.x, g.witch.z)).toBe(false); // (over the fence in the air)
    stepGame(g, { ...C, toggleMode: true }, STEP);
    run(g, 3);
    expect(g.witch.mode).toBe("ground");
  });

  it("a dodge on foot never jumps a fence", () => {
    const g = zoo(["*"]), I = islands(g).find(J => J.found)!;
    const a = east(I, -2); at(g, a.x, a.z);
    for (let i = 0; i < 6; i++) { stepGame(g, { ...C, moveX: 1, dash: true } as Controls, STEP); run(g, 0.6, { moveX: 1 }); }
    expect(insideIsland(I, g.witch.x, g.witch.z)).toBe(true);
  });

  it("keeps every creature not hers inside its island's fence, whatever pushed it out", () => {
    const g = zoo(["*"]), I = islands(g).find(J => J.found)!;
    const c = g.creatures.find(k => k.cell[0] === I.cell[0] && k.cell[1] === I.cell[1] && !k.boss)!;
    const o = east(I, 12); c.x = o.x; c.z = o.z; c.tx = o.x; c.tz = o.z;
    run(g, STEP);
    expect(insideIsland(I, c.x, c.z)).toBe(true);
  });
  it("knocked out on an island, she comes back on the Ent's plaza (home), never inside a fence (Ed, 2026-10-26)", () => {
    const g = zoo(["*"]), I = islands(g).find(J => J.found)!, W = g.witches[0];
    const a = east(I, -12); at(g, a.x, a.z);
    W.health.hp = 0; W.ko = knockOut(W.leash, g.creatures, g.clock.time, g.tuning);
    for (let i = 0; i < 90 / STEP && W.ko; i++) stepGame(g, C, STEP);
    expect(W.ko).toBeNull();
    expect(g.map.areaAt(g.witch.x, g.witch.z).cell).toEqual(g.map.centreCell); // (home's ground: the plaza)
    expect(islands(g).some(J => insideIsland(J, g.witch.x, g.witch.z))).toBe(false);
    const H = g.map.zoo!.layout!.home;
    expect(Math.hypot(g.witch.x - H.x, g.witch.z - H.z)).toBeLessThan(ZOO_CONFIG.plaza ?? 60); // (in the Ent's circle)
    expect(g.witch.seated).toBeFalsy(); // (no decks to sit behind)
  });
  it("has no treehouse: she starts standing in the Ent's circle at the middle, no deck (Ed, 2026-10-26)", () => {
    const g = zoo(["*"]), H = g.map.zoo!.layout!.home;
    expect(deckOf(g.map, g.tuning)).toBeNull();
    expect(g.witch.seated).toBeFalsy();
    expect(Math.hypot(g.witch.x - H.x, g.witch.z - H.z)).toBeLessThan(ZOO_CONFIG.plaza ?? 60);
  });
  it("E at the little treehouse north of the Ent's circle takes her out of the zoo; E anywhere else doesn't (Ed, 2026-10-26)", () => {
    const g = zoo(["*"]), s = zooExitSpot(g.map)!, H = g.map.zoo!.layout!.home;
    expect(s.z).toBeLessThan(H.z - (ZOO_CONFIG.plaza ?? 60)); // (north of the circle: its far side from the camera)
    at(g, H.x + 20, H.z + 10); run(g, 0.1, { place: true }); run(g, 0.1);
    expect(g.zooExit).toBeUndefined();
    at(g, s.x + 1, s.z + 1); run(g, 0.1, { place: true });
    expect(g.zooExit).toBeDefined();
  });
  it("walking or flying on out against the zoo's edge, over the waterfall, takes her out of it too (Ed, 2026-10-26)", () => {
    // (with the page's zoo beach, two metres of sand and no stargazing: app/linkParams.ts)
    const B = TUNING.beach!, T = { ...TUNING, beach: { ...B, width: 2, vary: B.vary && { ...B.vary, amp: 0, min: 2 } }, map: { ...TUNING.map!, shape: "zoo" as const, island: "", islandAreas: 0, found: ["*"] } };
    for (const fly of [false, true]) {
      const g = newGame(7, T), L = g.map.zoo!.layout!; g.clock.paused = false;
      at(g, L.home.x, L.home.z - (L.reach + 20));
      if (fly) g.witch = { ...g.witch, mode: "treetop", lift: 1 };
      run(g, 1, { moveZ: -1 });
      expect(g.zooExit).toBeUndefined(); // (not yet: still on her way)
      run(g, 40, { moveZ: -1 });
      expect(g.zooExit).toBeDefined();
    }
  });
});
