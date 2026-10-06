// The map's point features keep apart (Ed, v1628: "Legend and runestone in the same place"): a runestone (where an area's
// soundsystem comes), a legend and its circle, the dancefloor and the relics. The cause was a ghost area: a cell the warped
// partition left no ground, still counted playable, whose runestone, legend and creatures all fell on one spot in a
// neighbour's ground. Now an area must own ground, and a legend's circle keeps clear of every runestone round it.
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { Forest } from "./forest";
import { spawnCreatures } from "./creatures";
import { LEGENDS, placeRelics } from "./legends";
import { TUNING } from "./tuning";

const SEEDS = Array.from({ length: 30 }, (_, i) => 1 + i * 7919);
const LC = TUNING.legendClearing;

describe("point features keep apart", () => {
  it(`over ${SEEDS.length} seeds: every area owns its runestone's ground; no legend near a runestone; circles clear of runestones, each other and relics`, () => {
    for (const seed of SEEDS) {
      const map = generateMap(seed, TUNING), creatures = spawnCreatures(map), relics = placeRelics(map, new Forest(map));
      const home = map.centreCell, stones = map.cells.filter(([x, y]) => !(x === home[0] && y === home[1])).map(([x, y]) => ({ cell: [x, y], ...map.soundsystemSpot(x, y) }));
      for (const s of stones) expect(map.areaAt(s.x, s.z).cell, `seed ${seed}: area ${s.cell}'s runestone stands on its own ground`).toEqual(s.cell);
      for (const L of creatures.filter(c => c.boss))
        for (const s of stones) expect(Math.hypot(L.x - s.x, L.z - s.z), `seed ${seed}: the ${L.species} legend of ${L.cell} and the runestone of ${s.cell}`).toBeGreaterThanOrEqual(15);
      const circles = map.legendClearings;
      for (const c of circles) {
        for (const s of stones) {
          const own = s.cell[0] === c.cell[0] && s.cell[1] === c.cell[1], edge = Math.hypot(c.x - s.x, c.z - s.z) - c.r;
          expect(edge, `seed ${seed}: circle ${c.cell}'s edge from the runestone of ${s.cell}`).toBeGreaterThanOrEqual(own ? TUNING.soundsystemFootprint : Math.min(LC.minFromOtherStones ?? 0, TUNING.soundsystemFootprint + TUNING.reserveMargin));
          if (!own && map.neighbours.get(c.cell.join(","))?.has(s.cell.join(","))) expect(edge).toBeGreaterThanOrEqual(LC.minFromOtherStones ?? 0);
        }
        for (const o of circles) if (o !== c) expect(Math.hypot(c.x - o.x, c.z - o.z), `seed ${seed}: circles ${c.cell} and ${o.cell}`).toBeGreaterThan(c.r + o.r);
        for (const r of relics) if (r.cell[0] === c.cell[0] && r.cell[1] === c.cell[1]) expect(Math.hypot(r.x - c.x, r.z - c.z), `seed ${seed}: relic ${r.kind} by circle ${c.cell}`).toBeGreaterThanOrEqual(c.r + (LEGENDS.relics.clearOfCircle ?? 0)); else expect(Math.hypot(r.x - c.x, r.z - c.z), `seed ${seed}: relic ${r.kind} in circle ${c.cell}`).toBeGreaterThan(c.r);
        const centre = map.siteOf(home[0], home[1]);
        expect(Math.hypot(c.x - centre.x, c.z - centre.z), `seed ${seed}: circle ${c.cell} and the dancefloor`).toBeGreaterThan(c.r + TUNING.dancefloor.radius);
      }
    }
  }, 600_000);
});
