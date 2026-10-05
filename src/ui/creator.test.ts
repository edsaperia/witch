// The character creator's controls come from the witch generator's axes (art/witchGenome.js): each
// must land on a field of her genome, so a new axis the art builders add works without code here.
import { describe, expect, it } from "vitest";
import * as Art from "../../art/generator.js";
import { slot } from "./creator";

describe("the character creator", () => {
  it("maps every axis of the witch generator onto her genome", () => {
    const g = Art.WITCH_GENOME as unknown as Record<string, unknown>;
    for (const axis of Object.keys(Art.WITCH_AXES)) {
      const [part, key] = slot(axis), v = part ? (g[part] as Record<string, unknown>)[key] : g[key];
      expect(v, axis).not.toBeUndefined();
    }
  });
  it("keeps every randomised witch a witch (a pointed hat with its band, a broom)", () => {
    for (let s = 1; s < 40; s++) expect((Art.witchGenomeProblems as (g: unknown) => string[])((Art.witchGenome as (s: number) => unknown)(s))).toEqual([]);
  });
});
