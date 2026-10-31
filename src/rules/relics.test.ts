// The legend relics' places (Ed, 2026-10-06: "each one should appear on the map once. One appears
// near an edge of the home area, the rest are scattered across the map, none can be within 150m of
// another"; Ed, 2026-10-11: one per ten areas, twelve kinds), over many seeds: the count, no kind twice, one just inside home's edge, every pair minGap
// apart, none in a cleared place, all in bounds; and the same map gives the same relics.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { generateMap } from "./map";
import { Forest } from "./forest";
import { LEGENDS, placeRelics, relicKinds } from "./legends";
import { PARTY_RELICS } from "../../art/partyRelics.js";
import { newGame as fullGame, stepGame } from "./game";
import { smallWorld } from "../test/worlds";

const newGame = smallWorld(fullGame, "Drinking a relic checks one local flask/sigil and four relocated followers, independent of world extent.");
// Keep placement's radius seed matrix and explicit 10–64-area islands: remoteness, minimum gaps and relic counts depend on those sizes.
const SEEDS = [1, 2, 3, 7, 42, 123, 999, 4242, 31337, 165272, 922199, 2026];

describe("legend relics on the map", () => {
  it("one of each kind, one just inside the home area's edge, the rest out in the map, every pair minGap apart", () => {
    const R = LEGENDS.relics;
    for (const seed of SEEDS) {
      const map = generateMap(seed, TUNING), relics = placeRelics(map, new Forest(map));
      // One per relics.perAreas areas the waves reach (Ed, 2026-10-11), each its own kind while the twelve last.
      const count = Math.max(1, Math.round((map.cells.length - 1) / R.perAreas!));
      expect(relics.length, `seed ${seed}`).toBe(count);
      const looks = new Map(relicKinds(R).map(k => [k.kind, k.look]));
      for (const r of relics) expect(looks.has(r.kind), r.kind).toBe(true);
      expect(new Set(relics.map(r => looks.get(r.kind))).size, `seed ${seed}: no bottle twice in a colour`).toBe(Math.min(count, new Set(looks.values()).size));
      const C = map.centreCell, home = map.siteOf(C[0], C[1]);
      const inHome = relics.filter(r => r.cell[0] === C[0] && r.cell[1] === C[1]);
      expect(inHome.length, `seed ${seed}: one in the home area`).toBe(1);
      // Near its edge: within homeInset (and a step) of leaving it, out past home's circle.
      const h = inHome[0], d = Math.hypot(h.x - home.x, h.z - home.z), dx = (h.x - home.x) / d, dz = (h.z - home.z) / d;
      const out = (k: number) => { const c = map.cellSafe(h.x + dx * k, h.z + dz * k).cell; return c[0] !== C[0] || c[1] !== C[1]; };
      expect(Array.from({ length: R.homeInset + 5 }, (_, k) => out(k + 1)).some(Boolean), `seed ${seed}: near home's edge`).toBe(true); // (leaving it somewhere along the way: a wiggly border may come back in)
      expect(d, `seed ${seed}: past home's circle`).toBeGreaterThan(map.homeRadius);
      expect(Math.hypot(h.x - map.treehouse.x, h.z - map.treehouse.z), `seed ${seed}: clear of the treehouse`).toBeGreaterThanOrEqual(R.clearOfTreehouse);
      for (const r of relics) {
        expect(map.hardClear(r.x, r.z), `seed ${seed}: ${r.kind} not in a cleared place`).toBe(false);
        expect(r.x > map.bounds.minX && r.x < map.bounds.maxX && r.z > map.bounds.minZ && r.z < map.bounds.maxZ).toBe(true);
        if (r !== h) expect(map.remoteness(r.cell[0], r.cell[1])).toBeGreaterThanOrEqual(R.minRemoteness);
      }
      // Every pair minGap apart, the relics and their sigils (south of them) alike.
      const spots = relics.flatMap(r => [{ r, x: r.x, z: r.z }, { r, x: r.sx, z: r.sz }]);
      for (const a of spots) for (const c of spots) if (a.r !== c.r) expect(Math.hypot(a.x - c.x, a.z - c.z), `seed ${seed}: ${a.r.kind}–${c.r.kind}`).toBeGreaterThanOrEqual(R.minGap);
      for (const r of relics) { expect(r.sx).toBe(r.x); expect(r.sz - r.z).toBeCloseTo(R.sigilOffset); }
    }
  }, 240000);

  it("are drunk by standing on their sigil and pressing the button (Ed, 2026-10-18): every animal following her an adult at once; not from beside the flask itself, and nothing with no one to grow", () => {
    const g = newGame(123, TUNING), r = g.relics[0], C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    g.clock.paused = false;
    const at = (x: number, z: number) => { g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0 }; };
    // Her followers: a baby and a young one following her, an adult following her, and a young one parked at a sigil.
    const free = g.creatures.filter(c => !c.boss && !c.gone).slice(-4), [baby, young, adult, parked] = free;
    for (const [c, level] of [[baby, 0], [young, 1], [adult, 2], [parked, 1]] as const) Object.assign(c, { level, leashed: true, x: r.sx + 2, z: r.sz + 2, tx: r.sx + 2, tz: r.sz + 2 });
    // Beside the flask (on it, and a step off), but not on its sigil: nothing.
    for (const [x, z] of [[r.x, r.z], [r.x + 1.5, r.z - 1]]) { at(x, z); stepGame(g, { ...C, place: true }, 1 / 60); stepGame(g, C, 1 / 60); }
    expect(r.state).toBe("lying");
    // On its sigil, nobody following: nothing, and it stays.
    at(r.sx, r.sz);
    stepGame(g, { ...C, place: true }, 1 / 60); stepGame(g, C, 1 / 60);
    expect(r.state).toBe("lying");
    expect(g.leash.relics).toEqual([]);
    // Now with three following her and one parked: drunk, the young ones adults at once (the next step), the parked one not.
    g.leash.stack.push(baby.id, young.id, adult.id);
    g.leash.placed.push({ id: parked.id, x: r.sx + 30, z: r.sz, at: g.clock.time });
    stepGame(g, { ...C, place: true }, 1 / 60); stepGame(g, C, 1 / 60);
    expect(r.state).toBe("used");
    expect(g.leash.relics).toEqual([]);
    expect([baby.level, young.level, adult.level, parked.level]).toEqual([2, 2, 2, 1]);
  }, 60000);

  it("one per relics.perAreas areas on the islands (Ed, 2026-10-11): 1 on 10, 2 on 20, 5 on 50, 6 on 64, no kind twice", () => {
    for (const [areas, want] of [[10, 1], [20, 2], [30, 3], [50, 5], [64, 6]]) for (const seed of [1, 123]) {
      const map = generateMap(seed, { ...TUNING, map: { ...TUNING.map!, islandAreas: areas } }), relics = placeRelics(map, new Forest(map));
      expect(relics.length, `${areas} areas, seed ${seed}`).toBe(want);
      const looks = new Map(relicKinds(LEGENDS.relics).map(k => [k.kind, k.look]));
      expect(new Set(relics.map(r => looks.get(r.kind))).size).toBe(want);
    }
  }, 120000);

  it("has twelve kinds: the six bottles and their mirror images (Ed, 2026-10-11)", () => {
    const K = LEGENDS.relics.kinds;
    expect(K.length).toBe(12); expect(new Set(K).size).toBe(12);
    for (const k of K.filter(k => k.endsWith("Flip"))) expect(K).toContain(k.replace(/Flip$/, ""));
  });

  it("come in every bottle, mirrored or not, in every colour (Ed, 2026-10-11): 72 kinds, 36 looks; a bottle in its own glass written bare", () => {
    const R = LEGENDS.relics, K = relicKinds(R);
    expect(R.colours!.length).toBe(6);
    expect(K.length).toBe(R.kinds.length * R.colours!.length);
    expect(new Set(K.map(k => k.kind)).size).toBe(K.length);
    expect(new Set(K.map(k => k.look)).size).toBe(36);
    for (const k of R.kinds) expect(K.map(x => x.kind)).toContain(k); // (each in its own glass: as before)
    // a look is a bottle and a colour: its plain and mirrored kinds share it
    expect(K.find(k => k.kind === "wine")!.look).toBe(K.find(k => k.kind === "wineFlip")!.look);
    expect(K.find(k => k.kind === "wine~ruby")!.look).toBe(K.find(k => k.kind === "wineFlip~ruby")!.look);
    expect(K.find(k => k.kind === "wine~ruby")!.look).not.toBe(K.find(k => k.kind === "wine")!.look);
  });

  it("lists the colours in the bottles' order, each its own bottle's glass (art/partyRelics.js)", () => {
    const plain = LEGENDS.relics.kinds.filter(k => !k.endsWith("Flip"));
    expect(plain.length).toBe(PARTY_RELICS.length);
    PARTY_RELICS.forEach((b: { glass: string }, i: number) => expect(LEGENDS.relics.colours![i], `${plain[i]}: ${b.glass}`).toBe(b.glass));
  });

  it("never lays a bottle and its mirror image in the same colour on one map (Ed, 2026-10-11), on 30 seeds of each size", () => {
    const looks = new Map(relicKinds(LEGENDS.relics).map(k => [k.kind, k.look]));
    for (const areas of [20, 50]) for (let seed = 1; seed <= 30; seed++) {
      const map = generateMap(seed, { ...TUNING, map: { ...TUNING.map!, islandAreas: areas } }), relics = placeRelics(map, new Forest(map));
      const seen = relics.map(r => looks.get(r.kind)!);
      expect(new Set(seen).size, `${areas} areas, seed ${seed}: ${relics.map(r => r.kind).join(", ")}`).toBe(seen.length);
    }
  }, 600000);

  it("are the same for the same seed", () => {
    const a = generateMap(123, TUNING), b = generateMap(123, TUNING);
    expect(placeRelics(a, new Forest(a))).toEqual(placeRelics(b, new Forest(b)));
  }, 60000);
});
