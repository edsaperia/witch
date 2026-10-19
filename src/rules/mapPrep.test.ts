// A map made from its prep (rules/map.ts MapPrep: its heavy parts, made in a worker while the chart flies and carried to the
// game's page through IndexedDB, app/mapPrep.ts; Ed, 2026-10-19, the sailing's option 4) is the map made directly: its data the
// same, its closures answering the same, and a game on it playing the same, for several seeds and islands, home's among them.
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { generateMap, prepOf, type ForestMap, type MapPrep } from "./map";
import { routeOf } from "./party";
import { KIND_NAMES, KINDS, playableIsland } from "./rosters";
import { newGame, stepGame, STEP, type Controls } from "./game";

/** JSON of a value with Maps, Sets and typed arrays spelled out and functions left out (as the bench's, tools/bench/fingerprint.ts). */
const plain = (v: unknown): string => JSON.stringify(v, (_k, x) => (x instanceof Map ? { map: [...x.entries()] } : x instanceof Set ? { set: [...x] } : ArrayBuffer.isView(x) ? { typed: Array.from(x as unknown as ArrayLike<number>) } : typeof x === "function" ? undefined : x));

const islandTuning = (island: string, world: number): Tuning => ({ ...TUNING, map: { ...TUNING.map!, island, world, islandAreas: island === "home" ? 10 : TUNING.map!.islandAreas } });
/** The prep as the worker sends it: made after the map (its route worked out), then through a structured clone (postMessage, IndexedDB). */
const prepFor = (seed: number, t: Tuning): MapPrep => { const m = generateMap(seed, t); routeOf(m); return structuredClone(prepOf(m)); };

/** The map's data (functions left out; the paths without their map, the partition's caches aside) and what its closures say at
 *  points over it: the areas, the land and lakes, the clearings, the sites and spots. */
function snapshot(m: ForestMap): string {
  const { paths, partition, bounds, ...rest } = m as ForestMap & { partition: unknown };
  const { land, lakes, ...box } = bounds;
  const pathData = Object.fromEntries(Object.entries(paths as unknown as Record<string, unknown>).filter(([k]) => k !== "map"));
  const probes: unknown[] = [];
  const e = m.extent, P = 23;
  for (let i = 0; i <= P; i++) for (let j = 0; j <= P; j++) {
    const x = e.minX + ((e.maxX - e.minX) * i) / P, z = e.minZ + ((e.maxZ - e.minZ) * j) / P, a = m.areaAt(x, z);
    probes.push([a, m.isLake(a.cell[0], a.cell[1]), m.playable(a.cell[0], a.cell[1]), m.inBuffer(a.cell[0], a.cell[1]), m.treeWeight(x, z), m.hardClear(x, z), m.cellSafe(x, z), m.reserved(x, z, 4), m.arenaOpen(x, z),
      land?.distAt(x, z), land?.inward(x, z), land?.shore(x, z), lakes?.distAt(x, z), lakes?.shore(x, z)]);
  }
  for (const [cx, cy] of m.cells) probes.push([m.siteOf(cx, cy), m.soundsystemSpot(cx, cy), m.setPieceSpot(cx, cy), m.setPieceOf(cx, cy), m.typeOf(cx, cy), m.remoteness(cx, cy), m.hasLegend(cx, cy), m.legendClearing(cx, cy)]);
  if (land) for (let l = 0; l < land.loops.length; l++) for (let s = 0; s < land.loops[l].length; s += 97) probes.push(land.along(l, s));
  return plain({ rest, box, land, lakes, pathData, probes, route: routeOf(m) });
}

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
/** A few seconds' play off her decks: her flight east, the creatures about, the party's clock running. */
function play(seed: number, t: Tuning, prep?: MapPrep) {
  const g = newGame(seed, t, 1, prep);
  g.clock.paused = false;
  for (let i = 0; i < 300; i++) stepGame(g, { ...idle, moveX: 1 }, STEP);
  // (the state that moves, as the bench's fingerprint has it)
  return plain({ clock: g.clock, witches: g.witches, creatures: g.creatures, party: g.party, combat: g.combat, growth: g.growth, berries: g.berries, beat: g.beat, camera: g.camera, speakers: g.speakers, floor: g.floor, partyWitches: g.partyWitches, friendly: g.friendly, tally: g.tally });
}

describe("a map made from its prep (rules/map.ts MapPrep; app/mapPrep.ts)", () => {
  // home, and islands of each phase the chart sails to (a playable kind of each)
  const kinds = ["home", ...[1, 2, 3].map(ph => KIND_NAMES.find(k => KINDS[k].phase + 1 === ph && playableIsland(k))!).filter(Boolean)];
  it("is the map made directly: its data and its closures' answers, for several seeds, worlds and islands", () => {
    expect(kinds.length).toBeGreaterThanOrEqual(3);
    for (const island of kinds) for (const [seed, world] of [[123, 0], [7, 7], [904211, 31]]) {
      const t = islandTuning(island, world), prep = prepFor(seed, t);
      expect(prep.land, `${island} has land`).not.toBeNull();
      expect(prep.route, `${island}'s route`).not.toBeNull();
      expect(snapshot(generateMap(seed, t, undefined, prep)), `${island}, seed ${seed}, world ${world}`).toBe(snapshot(generateMap(seed, t)));
    }
  }, 600000);
  it("plays the same game: its moving state after a few seconds' play", () => {
    for (const island of kinds.slice(0, 2)) {
      const t = islandTuning(island, 7);
      expect(play(55, t, prepFor(55, t)), island).toBe(play(55, t));
    }
  }, 600000);
});
