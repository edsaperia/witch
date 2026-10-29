// The stones' keep-clear zones (Ed, 2026-10-29: "No special areas should appear so close to stump/runestone areas; no special
// scenery, no finds or flasks, no legend circles"; and the party relics, walls and ruins, ponds, picnics and campfires, and the
// grounds): over a few seeds' maps, nothing on his list has any of its footprint within stoneKeepClear metres of an area's stone.
import { describe, expect, it, vi } from "vitest";
import { generateMap, type ForestMap } from "./map";
import { Forest } from "./forest";
import { placeRelics, LEGENDS } from "./legends";
import { placeTrunk, TRUNK_REACH } from "./finds";
import { dressingOf, partyDef } from "./partyDressing";
import { TUNING, type Tuning } from "./tuning";

const islandOf = (kind: string): Tuning => ({ ...TUNING, map: { ...TUNING.map!, island: kind, islandAreas: 10 } }); // (the game's islands)
// (the radius map with set pieces, every ground and every decor family on, as placement.test.ts checks them)
const everything: Tuning = { ...TUNING, setPieceChance: 0.25, grounds: { ...TUNING.grounds, chance: 0.3, kinds: ["playground", "tennis", "baseball", "football", "basketball"] }, decor: { ...TUNING.decor, mix: { ruins: 1, rocks: 1, freak: 1 } } };
const MAPS: [string, Tuning, number][] = [["home island", islandOf("home"), 1], ["home island", islandOf("home"), 2], ["tiger island", islandOf("tiger"), 1], ["lion island", islandOf("lion"), 2], ["radius map", everything, 123], ["radius map", everything, 4242]];

/** Every footprint on the list that reaches into a stone's keep-clear zone, as "what at x, z: m off". */
function intruders(map: ForestMap): string[] {
  const t = map.tuning, K = t.stoneKeepClear ?? 40, F = t.decor.footprint, forest = new Forest(map), out: string[] = [];
  const home = map.centreCell, stones = map.cells.filter(([x, y]) => map.playable(x, y) && !(x === home[0] && y === home[1])).map(([x, y]) => map.soundsystemSpot(x, y));
  const check = (what: string, x: number, z: number, r: number) => {
    const d = Math.min(...stones.map(s => Math.hypot(x - s.x, z - s.z)));
    if (d < K + r) out.push(`${what} at ${x.toFixed(0)}, ${z.toFixed(0)}: ${d.toFixed(1)} m from a stone (r ${r})`);
  };
  const e = map.extent, cx = (e.minX + e.maxX) / 2, cz = (e.minZ + e.maxZ) / 2, half = Math.max(e.maxX - e.minX, e.maxZ - e.minZ) / 2 + map.areaSize;
  for (const s of map.scenes) check(`scene ${s.id}`, s.x, s.z, s.r);
  for (const g of map.grounds) check(`ground ${g.kind}`, g.x, g.z, g.r);
  for (const c of map.legendClearings) check("legend clearing", c.x, c.z, c.r);
  for (const p of forest.setPiecesNear(cx, cz, half)) check("set piece", p.x, p.z, t.setPieceFootprint * t.setPieceScale);
  for (const p of forest.decorNear(cx, cz, half)) if (p.family !== "rocks") check(`decor ${p.family}`, p.x, p.z, F);
  for (const p of forest.relicsNear(cx, cz, half)) check("modern relic", p.x, p.z, F);
  for (const p of forest.lightsNear(cx, cz, half)) check(p.kind, p.x, p.z, F);
  for (const p of forest.wallsNear(cx, cz, half)) check("wall", p.x, p.z, 1.5);
  const relics = placeRelics(map, forest);
  for (const r of relics) check(`flask ${r.kind}`, r.x, r.z, 4 + LEGENDS.relics.sigilOffset);
  const trunk = placeTrunk(map, forest, relics);
  if (trunk) check("the night's find", trunk.x, trunk.z, TRUNK_REACH);
  for (const [x, y] of map.cells) {
    if (!map.playable(x, y) || (x === home[0] && y === home[1])) continue;
    const d = dressingOf(map, [x, y], t);
    for (const c of d.clusters) check(`party cluster ${c.id}`, c.x, c.z, 4);
    for (const p of d.loose) { const def = partyDef(p.ref); if (def && (def.cls === "set" || def.cls === "picnic" || def.id.includes("campfire"))) check(`party ${def.id}`, p.x, p.z, def.cls === "set" ? 3 : 0.6); }
  }
  return out;
}

describe("the stones' keep-clear zones", () => {
  for (const [name, t, seed] of MAPS) {
    it(`nothing on Ed's list lies in a stone's keep-clear zone (${name}, seed ${seed})`, () => {
      // (a legend's clearing with no room out of the zone goes at the farthest spot it fits, and the map logs it: only those may)
      const info = vi.spyOn(console, "info").mockImplementation(() => {}), map = generateMap(seed, t);
      const logged = info.mock.calls.map(c => String(c[0])).filter(l => l.startsWith("legend clearings:")).length;
      info.mockRestore();
      const left = intruders(map), legends = left.filter(l => l.startsWith("legend clearing"));
      expect(left.filter(l => !l.startsWith("legend clearing"))).toEqual([]);
      expect(legends.length <= logged, legends.join("; ")).toBe(true);
      if (name.endsWith("island")) expect(legends).toEqual([]); // (the game's islands: every legend's clearing out of the zones)
    }, 120000);
  }
  it("the zone follows its knob", () => {
    const map = generateMap(1, { ...islandOf("home"), stoneKeepClear: 60 });
    expect(intruders(map)).toEqual([]);
  }, 120000);
});
