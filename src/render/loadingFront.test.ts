import { describe, expect, it } from "vitest";
import { cleared, fadeAt, FADE, frontAt, FRONT_CLEAR, FRONT_FULL, typeReaches } from "./loadingFront";
import tuning from "../../config/tuning.json";

const T = tuning.loadingMist; // (as built: the tuning's numbers)

describe("the loading mist's front (render/loadingFront.ts)", () => {
  const house = { x: 0, z: 0 };
  const reaches = typeReaches([{ type: 1, x: 200, z: 0 }, { type: 1, x: -900, z: 0 }, { type: 2, x: 0, z: 300 }], house, 160);
  it("reaches each type's nearest and furthest ground from the treehouse, over all its areas", () => {
    expect(reaches.get(1)).toEqual({ near: 80, far: 1020 });
    expect(reaches.get(2)).toEqual({ near: 180, far: 420 });
  });
  it("keeps all of a type under the mist until its art lands", () => {
    expect(frontAt(reaches.get(1), undefined, T)).toBe(FRONT_FULL);
  });
  it("starts short of the type's nearest ground, so nothing clears before the art is in", () => {
    expect(frontAt(reaches.get(1), 0, T)).toBeLessThan(80 - T.soft);
  });
  it("rolls outward from the house: the nearer of a type's areas clear sooner than the far one", () => {
    const at = (s: number) => frontAt(reaches.get(1), s, T);
    const clearsAt = (d: number) => { for (let s = 0; s < 20; s += 0.05) if (at(s) - T.soft > d) return s; return Infinity; };
    expect(clearsAt(200)).toBeLessThan(clearsAt(900));
    expect(at(1)).toBeGreaterThan(at(0.5));
  });
  it("clears a nearby area within a couple of seconds", () => {
    const near = typeReaches([{ type: 3, x: 150, z: 0 }], house, 168).get(3)!;
    let s = 0; while (!cleared(frontAt(near, s, T))) s += 0.05;
    expect(s).toBeLessThanOrEqual(3);
  });
  it("never hangs on past the cap: what the front hasn't reached fades out, however far the type reaches", () => {
    const far = typeReaches([{ type: 4, x: 50, z: 0 }, { type: 4, x: 4000, z: 0 }], house, 160).get(4)!;
    expect(cleared(frontAt(far, T.cap - 0.5, T))).toBe(false);
    expect(fadeAt(T.cap - 0.5, T)).toBe(1);
    expect(fadeAt(T.cap + FADE / 2, T)).toBeCloseTo(0.5, 6);
    expect(cleared(frontAt(far, T.cap + FADE, T))).toBe(true);
  });
  it("keeps its speed for a near area whatever else of its type lies far off", () => {
    const near = typeReaches([{ type: 5, x: 150, z: 0 }], house, 168).get(5)!, both = typeReaches([{ type: 5, x: 150, z: 0 }, { type: 5, x: 2000, z: 0 }], house, 168).get(5)!;
    expect(frontAt(both, 1, T) - frontAt(both, 0, T)).toBeCloseTo(frontAt(near, 1, T) - frontAt(near, 0, T), 6);
  });
  it("has none for a type with no areas on the map once it's in", () => {
    expect(frontAt(undefined, 0, T)).toBe(FRONT_CLEAR);
  });
});
