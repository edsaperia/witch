import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { loadHouse } from "../../config/house/load.mjs";
import { standing, type Upright } from "./houseArt";
import { packStanding, standingModule } from "../../tools/houseStanding";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { deckOf } from "../rules/treehouse";
import { fromPlan, HOUSE_ROOMS } from "../rules/houseRooms";
import shipped from "virtual:house-standing";

const generated = (q: Upright[]): Upright[] => new Function(standingModule(q).replace("export default", "return"))();
const hash = (q: Upright[]) => createHash("sha256").update(JSON.stringify(q)).digest("hex");

describe("build-time house uprights", () => {
  it("preserves every original corner, colour, layer and order without rounding", () => {
    const original = standing(HOUSE_ROOMS);
    expect(original).toHaveLength(3283);
    expect(generated(original)).toEqual(original);
    expect(shipped).toEqual(original);
    expect(hash(generated(original))).toBe(hash(original));
  });

  it("regenerates exact geometry when shipped wall height changes", () => {
    const house = loadHouse(), before = standing(house);
    house.wall += 0.375;
    const after = standing(house);
    expect(hash(after)).not.toBe(hash(before));
    expect(generated(after)).toEqual(after);
  });

  it("refuses to silently flatten a future nonvertical upright", () => {
    expect(() => packStanding([{ p: [[0, 0, 0], [1, 0, 0], [2, 0, 1], [0, 0, 1]], rgb: [1, 0, 0], layer: 1 }])).toThrow("not a vertical quad");
  });

  it.each([123, 165272])("preserves placed upright quads on island seed %s", seed => {
    const game = newGame(seed, TUNING), deck = deckOf(game.map, game.tuning)!;
    const original = standing(HOUSE_ROOMS), decoded = shipped;
    const place = (quads: Upright[]) => quads.map(q => ({ ...q, p: q.p.map(([x, z, h]) => {
      const at = fromPlan(deck, x, z);
      return [at.x, at.z, h] as [number, number, number];
    }) }));
    expect(place(decoded)).toEqual(place(original));
    expect(hash(place(decoded))).toBe(hash(place(original)));
    console.info(JSON.stringify({ seed, oldQuadHash: hash(place(original)), newQuadHash: hash(place(decoded)), quads: original.length }));
  });
});
