import { describe, expect, it } from "vitest";
import { AREA_TYPES, areaCellAt, generateMap, type ForestMap } from "./map";
import { routeOf } from "./party";
import { overflow } from "./legendFit";
import { TUNING, type Tuning } from "./tuning";
import { creatureInArea } from "./game";
import { spawnCreatures, type Creature } from "./creatures";
import { isInside } from "./mapShape";
import { Forest } from "./forest";
import { pastEdge } from "./combat/targeting";
import type { CombatWorld } from "./combat/data";
import { stepLegendStates } from "./legends";
import { cellKey, partifiedKey, partyZones, type PartyState } from "./party";
import { borderOf } from "./borders";

// The legend areas (Ed, 2026-10-26: "legends are spawned in additional areas that have legend circles where runestones usually are";
// "extra areas are added to each island, and the legend areas can be adjacent to the same type of area, so it effectively becomes
// an area twice the size"; "The route only cares about runestones"; "for legends getting enraged, and also for animals attacking
// and defending, the adjacent areas should count as one").
const islandOf = (kind: string): Tuning => ({ ...TUNING, map: { ...TUNING.map!, island: kind, islandAreas: 10 } }); // (the game's islands by roster: the tests' tuning is the radius map)
const MAPS: [string, number][] = [["home", 1], ["home", 2], ["tiger", 1], ["lion", 2], ["elephant", 1]];
const cellOf = (k: string): [number, number] => { const [x, y] = k.split(",").map(Number); return [x, y]; };
const kindAt = (map: ForestMap, k: string) => AREA_TYPES[map.typeOf(...cellOf(k))].creature;
const withLegend = (map: ForestMap) => [...map.legendAreas].find(([, p]) => map.hasLegend(...cellOf(p)))!; // (a legend area with tonight's legend)

describe("legend areas", () => {
  for (const [kind, seed] of MAPS) {
    it(`each of the night's legends lies in an area of its own beside one of its kind, off the route (${kind} island, seed ${seed})`, () => {
      const map = generateMap(seed, islandOf(kind)), route = new Set(routeOf(map).order), home = map.centreCell.join(","), forest = new Forest(map);
      expect(map.legendAreas.size).toBeGreaterThan(0);
      for (const [la, pair] of map.legendAreas) {
        const [lx, ly] = cellOf(la), [px, py] = cellOf(pair);
        // grown out of the island: no runestone, soundsystem or route stop of its own; its pair a playable area of the same kind beside it
        expect(map.playable(lx, ly)).toBe(false);
        expect(map.isLegendArea(lx, ly)).toBe(true);
        expect(route.has(la)).toBe(false);
        expect(map.cells.some(([x, y]) => x === lx && y === ly)).toBe(false);
        expect(map.playable(px, py)).toBe(true);
        expect(map.neighbours.get(la)?.has(pair)).toBe(true);
        expect(map.typeOf(lx, ly)).toBe(map.typeOf(px, py));
        // never beside home, nor another legend area
        expect(map.neighbours.get(la)?.has(home)).toBe(false);
        for (const o of map.legendAreas.keys()) if (o !== la) expect(map.neighbours.get(la)?.has(o)).toBe(false);
        // tonight's legend of its kind: its circle inside it, the legend's own area its pair; one of a kind not dealt tonight stands
        // empty (one for every kind a night could deal, so the island's shape is the same every night)
        if (!map.hasLegend(px, py)) { expect(map.legendClearing(px, py)).toBeNull(); continue; }
        const c = map.legendClearing(px, py)!;
        expect(c).not.toBeNull();
        expect(c.cell).toEqual([lx, ly]);
        for (let k = 0; k < 16; k++) { const b = (k / 16) * Math.PI * 2; expect(map.areaAt(c.x + Math.cos(b) * c.r, c.z + Math.sin(b) * c.r).cell).toEqual([lx, ly]); }
        // (cleared of trees, its edge ragged by up to a metre and a half)
        for (const t of forest.treesNear(c.x, c.z, c.r + 2)) expect(Math.hypot(t.x - c.x, t.z - c.z)).toBeGreaterThanOrEqual(c.r - 1.6);
        // her flight reaches it: its middle on the island's land, clear of its coast
        expect(isInside(map.bounds, c.x, c.z, 15)).toBe(true);
      }
      // every legend dealt has one, but a kind with no room beside any of its areas (it keeps one in its own area, as before)
      expect(map.legendAreas.size).toBeGreaterThanOrEqual(map.legendKinds.length - 2);
      for (const k of map.legendKinds) expect([...map.legendCells].some(c => kindAt(map, c) === k)).toBe(true);
    });
  }

  it("holds even the biggest legends asleep: every legend in a legend area fits its circle with its margin, or has the most its area held", () => {
    const over: string[] = [];
    for (const [kind, seed] of MAPS) {
      const map = generateMap(seed, islandOf(kind)), LC = map.tuning.legendClearing;
      for (const c of map.legendClearings) {
        if (!map.isLegendArea(c.cell[0], c.cell[1])) continue;
        const sp = kindAt(map, c.cell.join(",")), o = overflow(sp, c.r, LC);
        if (o > -(LC.fit?.margin ?? 0) + 1e-6) over.push(`${sp} ${o.toFixed(1)} m (r ${c.r.toFixed(0)})`);
      }
    }
    // (the elephant, 83 m asleep, needs 50: in the smaller legend areas it gets what fits, a few metres short)
    expect(over.every(s => s.startsWith("elephant"))).toBe(true);
  });

  it("shows no border inside a pair: the legend area wears its pair's look everywhere, so the area blend has nothing to blend there", () => {
    const map = generateMap(2, islandOf("tiger"));
    for (const [la, pair] of map.legendAreas) {
      const [lx, ly] = cellOf(la), want = map.typeOf(...cellOf(pair)), s = map.siteOf(lx, ly); // (an area's look is its type, but home's)
      let n = 0;
      for (let i = -20; i <= 20; i++) for (let j = -20; j <= 20; j++) {
        const x = s.x + i * 6, z = s.z + j * 6, a = map.areaAt(x, z);
        if (a.cell[0] !== lx || a.cell[1] !== ly) continue;
        expect(a.look).toBe(want);
        n++;
      }
      expect(n).toBeGreaterThan(50);
    }
  });

  it("counts a legend area and its pair as one area: a point in either is in the pair's area, and the legend's cell is its pair's", () => {
    const map = generateMap(1, islandOf("tiger")), creatures = spawnCreatures(map);
    for (const [la, pair] of map.legendAreas) {
      expect(map.sameArea(cellOf(la), cellOf(pair))).toBe(true);
      const c = map.legendClearing(...cellOf(pair));
      if (!c) continue; // (no legend of its kind tonight)
      expect(areaCellAt(map, c.x, c.z)).toEqual(cellOf(pair));
      expect(map.sameArea(cellOf(la), cellOf(pair))).toBe(true);
      expect(map.areaOf(cellOf(la))).toEqual(cellOf(pair));
      const L = creatures.find(q => q.boss && q.cell.join(",") === pair);
      expect(L, `the legend of ${pair}`).toBeDefined();
      expect(Math.hypot(L!.x - c.legend.x, L!.z - c.legend.z)).toBeLessThan(c.r); // (lying in its circle, in the legend area)
    }
    // (an area and a neighbour that isn't its legend area stay two)
    const [la, pair] = withLegend(map), other = [...map.neighbours.get(pair)!].find(k => k !== la && map.playable(...cellOf(k)))!;
    expect(map.sameArea(cellOf(pair), cellOf(other))).toBe(false);
  });

  it("wild creatures defend the pair as one: one of the pair's chases her on into its legend area, and gives up only past its far edge", () => {
    const map = generateMap(1, islandOf("tiger")), [la, pair] = withLegend(map), c = map.legendClearing(...cellOf(pair))!;
    const w = { inArea: creatureInArea(map), t: map.tuning } as unknown as CombatWorld, site = map.siteOf(...cellOf(pair));
    const foe = { cell: cellOf(pair), anchorX: site.x, anchorZ: site.z } as unknown as Creature;
    // (her in the legend area, at its circle: in the pair's area, not past its edge)
    expect(map.areaAt(c.x, c.z).cell).toEqual(cellOf(la));
    expect(w.inArea(foe, c.x, c.z)).toBe(true);
    expect(pastEdge(w, foe, c.x, c.z)).toBe(false);
    // (a creature of a neighbour that isn't the pair: the legend area is past its edge as before)
    const other = [...map.neighbours.get(la)!].find(k => k !== pair && map.playable(...cellOf(k)));
    if (other) { const s2 = map.siteOf(...cellOf(other)); expect(creatureInArea(map)({ cell: cellOf(other) }, c.x, c.z)).toBe(false); expect(Math.hypot(s2.x - c.x, s2.z - c.z)).toBeGreaterThan(0); }
  });

  it("a legend's rage counts the pair as one: its kin parked by sigil in its legend area keep it calm", () => {
    const map = generateMap(1, islandOf("tiger")), creatures = spawnCreatures(map), [la, pair] = withLegend(map), c = map.legendClearing(...cellOf(pair))!;
    const L = creatures.find(q => q.boss && q.cell.join(",") === pair)!;
    // (every creature of its kind gone, but one, leashed and parked at a sigil in the legend area)
    const kin = creatures.filter(q => q !== L && q.species === L.species && !q.boss);
    for (const q of kin) q.gone = true;
    const parked = kin[0];
    expect(parked).toBeDefined();
    Object.assign(parked, { gone: false, leashed: true, x: c.x + c.r * 0.5, z: c.z });
    expect(map.areaAt(parked.x, parked.z).cell).toEqual(cellOf(la));
    const areaOf = (q: Creature) => (q.leashed ? cellKey(areaCellAt(map, q.x, q.z)) : cellKey(q.cell)); // (as the game's: game.ts stepLegends)
    const step = (n: number) => { for (let i = 0; i < n; i++) stepLegendStates({ creatures, map, time: i * 0.5, dt: 0.5, partified: () => false, areaOf }, [L.id]); };
    step(40);
    expect(L.legendState).toBe("asleep");
    parked.gone = true;
    step(40);
    expect(L.legendState).not.toBe("asleep");
  });
  it("partifies a pair together: its legend area is partified with it, drawn as a zone of its own, and the party border runs round the outside of the pair", () => {
    const map = generateMap(1, islandOf("tiger")), [la, pair] = withLegend(map);
    const p = { areas: new Map([[pair, { cell: cellOf(pair), wave: 3, at: 10, from: null, soundsystem: null }]]) } as unknown as PartyState;
    expect(partifiedKey(p, map, pair)).toBe(true);
    expect(partifiedKey(p, map, la)).toBe(true);
    const other = [...map.legendAreas.keys()].find(k => k !== la)!;
    expect(partifiedKey(p, map, other)).toBe(false);
    const zones = partyZones(p, map), mine = zones.find(([k]) => k === la);
    expect(mine?.[1].cell).toEqual(cellOf(la));
    expect(mine?.[1].soundsystem).toBeNull();
    expect(partyZones(p, map)).toBe(zones); // (the same list while the party's areas don't change)
    // (the pair's border with its legend area is inside the zone: no line there; its border with the rest stays)
    const edge = borderOf(map, cellOf(pair), 8), inner = edge.filter(q => q.other === la), outer = edge.filter(q => q.other !== la && !partifiedKey(p, map, q.other));
    expect(inner.length).toBeGreaterThan(0);
    expect(inner.every(q => partifiedKey(p, map, q.other))).toBe(true);
    expect(outer.length).toBeGreaterThan(0);
  });
});
