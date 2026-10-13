// A creature's sigil on the ground by its size (Ed, 2026-10-13: "the top of the sigil's background should be just below the animal's
// feet", so the whole sigil shows): for every species at every level, the rune south of a happy one (and a placed sigil north of
// which a parked one rests) has its backing's top edge clear of the body by leash.runeGap, bigger animals' further off.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { MOVEMENT } from "./movement";
import { bodyRadius } from "./spacing";
import { RUNE_SCALE, runeOffset, sigilSize } from "./runeOffset";
import { runeNear } from "./creatureStates";
import type { Creature, Level } from "./creatures";

const SPECIES = Object.keys(MOVEMENT.bodies.radius);
const backed = (level: number, scale: number) => (sigilSize(level, scale) * Math.max(1, TUNING.leash.sigilBacking?.size ?? 1)) / 2;

describe("a creature's sigil on the ground, by its size", () => {
  it("for every species and level, its backing's top edge is clear of the body by runeGap, a happy rune's and a placed sigil's", () => {
    expect(SPECIES.length).toBeGreaterThan(40);
    const gap = TUNING.leash.runeGap ?? 0;
    expect(gap).toBeGreaterThan(0);
    for (const species of SPECIES) for (const level of [0, 1, 2, 3] as Level[]) for (const scale of [RUNE_SCALE, 1]) {
      const c = { species, level }, top = runeOffset(c, TUNING, scale) - backed(level, scale);
      expect(top - bodyRadius(c), `${species} L${level} x${scale}`).toBeCloseTo(gap, 9);
    }
  });

  it("is further off the bigger the animal: a dormouse's rune nearer than a bear's, a legend's furthest", () => {
    const at = (species: string, level: number) => runeOffset({ species, level: level as Level }, TUNING);
    expect(at("dormouse", 1)).toBeLessThan(at("fox", 1));
    expect(at("fox", 2)).toBeLessThan(at("bear", 2));
    expect(at("bear", 2)).toBeLessThan(at("elephant", 2));
    for (const s of ["dormouse", "fox", "bear", "elephant"]) for (const l of [1, 2, 3]) expect(at(s, l)).toBeGreaterThan(at(s, l - 1));
  });

  it("runeNear finds each happy creature's rune at its own offset south of it", () => {
    const mk = (id: number, species: string, level: number, x: number): Creature => ({ id, species, level, x, z: 0, state: "happy", happyAt: -99 } as unknown as Creature);
    const small = mk(1, "dormouse", 1, 0), big = mk(2, "elephant", 2, 40), f = (c: Creature) => runeOffset(c, TUNING);
    expect(runeNear([small, big], 0, f(small), 1, 0, undefined, f)?.id).toBe(1);
    expect(runeNear([small, big], 40, f(big), 1, 0, undefined, f)?.id).toBe(2);
    expect(runeNear([small, big], 40, f(small), 0.5, 0, undefined, f)).toBeNull(); // (a dormouse's distance isn't an elephant's)
  });
});
