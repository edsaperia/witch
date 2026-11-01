import { expect, it } from "vitest";
import { localHouseAction } from "./houseActions";
it("preserves solo dispatch and routes shared house actions only to the assigned player", () => {
  for (const id of [0, 1, 2]) expect(localHouseAction({ id }, null)).toBe(true);
  expect([0, 1, 2].filter(id => localHouseAction({ id }, 0))).toEqual([0]);
  expect([0, 1, 2].filter(id => localHouseAction({ id }, 1))).toEqual([1]);
});
