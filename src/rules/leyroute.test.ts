// The ley line never crosses itself where it shows (Ed, 2026-10-06: "Is it possible for the
// leylines to never have to cross? even if it means the route they describe is much longer"):
// rules/leyroute.ts and the wave picker (rules/party.ts, party.uncrossed). node tools/balance/leycross.mjs
// measures it over hundreds of seeds.
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { TUNING, type Tuning } from "./tuning";
import { newParty, spreadWave, wavePlan, cellKey } from "./party";
import { leyChain } from "./leylines";
import { routeLinks, shownWith } from "./leyroute";
import { polylinesMeet, segmentsMeet, crossings } from "./crossing";

describe("lines meeting", () => {
  it("counts crossing, touching and doubling back, not two links joined at their stone", () => {
    expect(segmentsMeet([0, 0], [10, 10], [0, 10], [10, 0])).toBe(true); // crossing
    expect(segmentsMeet([0, 0], [10, 0], [5, 0], [5, 8])).toBe(true); // one end resting on the other
    expect(segmentsMeet([0, 0], [10, 0], [0, 1], [10, 1])).toBe(false); // side by side
    expect(segmentsMeet([0, 0], [10, 0], [10, 0], [20, 5], true)).toBe(false); // joined at their stone
    expect(segmentsMeet([0, 0], [10, 0], [10, 0], [4, 0], true)).toBe(true); // joined, but doubling back along it
    expect(segmentsMeet([0, 0], [10, 0], [10, 0], [20, 5])).toBe(true); // the same point, not joined: touching
    expect(polylinesMeet([[0, 0], [10, 0]], [[10, 0], [20, 5], [5, 0.0]])).toBe(true); // joined, then back onto it
    expect(polylinesMeet([[0, 0], [10, 0]], [[10, 0], [20, 5], [30, 0]])).toBe(false);
  });
});

/** A seed's whole run: the route's links through every area, in the order the waves wake them. */
const runOf = (seed: number, t: Tuning = TUNING) => {
  const map = generateMap(seed, t), p = newParty(map);
  return { map, p, links: routeLinks(map, [...p.areas.keys(), ...wavePlan(p, map).keys()]) };
};

describe("the ley line's route (Ed, 2026-10-06)", () => {
  const SEEDS = Array.from({ length: 30 }, (_, i) => i + 1);
  it("never meets itself where it shows: no two links ever shown together meet, through the first 150 waves of 30 seeds", () => {
    for (const seed of SEEDS) {
      const { map, links } = runOf(seed);
      expect(crossings(links.slice(0, 150), shownWith(map)), `seed ${seed}`).toBe(0);
    }
  }, 120_000);
  it("is the same for a seed every time", () => {
    const a = runOf(7), b = runOf(7);
    expect(b.links.map(l => l.map(q => q.join()).join(";"))).toEqual(a.links.map(l => l.map(q => q.join()).join(";")));
  });
  it("(the picker as before crossed itself where it showed, within the first 40 waves of most seeds)", () => {
    const t = structuredClone(TUNING) as Tuning;
    t.party.uncrossed = false;
    let crossed = 0;
    for (const seed of SEEDS.slice(0, 10)) { const { map, links } = runOf(seed, t); if (crossings(links.slice(0, 40), shownWith(map)) > 0) crossed++; }
    expect(crossed).toBeGreaterThan(5);
  }, 60_000);
  it("keeps the opening: the first waves wake areas bordering the party, as near home as before", () => {
    for (const seed of SEEDS.slice(0, 10)) {
      const map = generateMap(seed, TUNING), p = newParty(map);
      for (let w = 0; w < 8; w++) for (const a of spreadWave(p, map, (w + 1) * 300)) {
        const touches = [...(map.neighbours.get(cellKey(a.cell)) ?? [])].some(k => p.areas.get(k)?.wave !== undefined && p.areas.get(k)!.wave < a.wave);
        expect(touches, `seed ${seed} wave ${a.wave}`).toBe(true);
      }
    }
  }, 60_000);
  it("hands the drawing its bends: a link that can't run straight carries them in the chain", () => {
    for (const seed of SEEDS) {
      const { map, p, links } = runOf(seed), bent = links.findIndex((l, i) => i > 0 && l.length > 2);
      if (bent < 0 || bent > 60) continue;
      // Play the waves up to just before that link's stone, so it's in the line ahead.
      for (let w = 0; w < bent - 1; w++) spreadWave(p, map, (w + 1) * 300);
      const c = leyChain(p, map, 3, 3), into = c.stones.find(s => s.via?.length);
      expect(into, `seed ${seed}`).toBeDefined();
      expect(into!.via).toEqual(links[bent].slice(1, -1).map(q => [q[0], q[1]]));
      return;
    }
    throw new Error("no seed of 30 bent a link in its first 60 waves");
  }, 120_000);
});
