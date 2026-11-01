// Half 1 of 2 of pack combat's lull check (src/test/packsLull.ts): split so the test shards run the halves side by side.
import { describe, expect, it } from "vitest";
import { lullFailures, lullKinds } from "../../test/packsLull";
import { PACKS } from "./packs";

describe("the lull is a retreat, not a halt (Ed's playtests, 2026-10-23: \"lulls between pack attacks seem to have the animals stand still instead of retreat\")", () => {
  it("every moving kind's members back off from her and keep moving through the lull (1 of 2)", () => {
    expect(lullFailures(lullKinds(0, 2))).toEqual([]);
  }, 300000);
  it("the two halves cover every kind once", () => {
    const both = [...lullKinds(0, 2), ...lullKinds(1, 2)];
    expect(both.sort()).toEqual(Object.keys(PACKS.kinds).sort());
  });
});
