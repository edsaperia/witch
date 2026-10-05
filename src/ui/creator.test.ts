// The character creator's controls come from the witch generator's axes (art/witchGenome.js): each
// must land on a field of her genome, so a new axis the art builders add works without code here.
import { describe, expect, it } from "vitest";
import * as Art from "../../art/generator.js";
import { migrateGenome, shadeToSV, slot, svToShade } from "./creator";

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
  it("loads an older save (round 11): missing fields are hers, numbers past the limits brought inside, junk refused", () => {
    const classic = Art.WITCH_GENOME as unknown as Record<string, Record<string, unknown>>;
    // A save from before round 11: no version, no sizes, a hat taller than today's limit, an unknown hair.
    const old = { hat: { shape: "crooked", height: 99, brim: 1.2, tilt: 0.1, band: 2 }, hair: "afro-from-the-future", top: "mesh", cloak: "long",
      broom: { kind: "fan", length: 1.1, bend: 0.2, bristles: 1 }, accessories: { phones: false, shades: true, glowsticks: false, scarf: true, satchel: false, pendant: false, earrings: true },
      palette: { hat: [0.8, 0.5, 0.4], hair: [0.1, 0.5, 2] } };
    const g = migrateGenome(old)!;
    expect(g).not.toBeNull();
    expect((Art.witchGenomeProblems as (g: unknown) => string[])(g)).toEqual([]);
    expect(g.hat.shape).toBe("crooked");
    expect(g.hat.height).toBe((Art.WITCH_AXES as unknown as Record<string, number[]>).hatHeight[1]);
    expect(g.hair).toBe(classic.hair as unknown);
    expect(g.top).toBe("mesh");
    expect(g.accessories.shades).toBe(true);
    for (const k of Object.keys(classic.accessories)) expect(g.accessories[k], k).not.toBeUndefined();
    expect(g.palette).toEqual({ hat: [0.8, 0.5, 0.4] }); // (hair's value was out of range: dropped)
    expect(migrateGenome(JSON.parse(JSON.stringify(g)))).toEqual(g); // today's saves load as they are
    for (const junk of [null, undefined, 3, "witch", []]) expect(migrateGenome(junk), String(junk)).toBeNull();
    expect(migrateGenome({})).toEqual({ ...JSON.parse(JSON.stringify(classic)), palette: null }); // (an empty one is the classic witch)
  });
  it("shades a colour from black through itself to white, and back", () => {
    expect(shadeToSV(0, 0.7)).toEqual([0.7, 0]);
    expect(shadeToSV(0.5, 0.7)).toEqual([0.7, 1]);
    expect(shadeToSV(1, 0.7)).toEqual([0, 1]);
    for (const k of [0, 0.2, 0.5, 0.7, 1]) { const [s, v] = shadeToSV(k, 0.6); expect(svToShade(s, v, 0.6)).toBeCloseTo(k); }
  });
});
