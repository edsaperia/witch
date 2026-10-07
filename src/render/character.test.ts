import { describe, expect, it } from "vitest";
import { characterOf, quirkAt, bounceAt } from "./character";
import raw from "../../config/character.json";

describe("creature character (config/character.json)", () => {
  it("every species named has a known quirk and sane numbers", () => {
    const known = ["sniff", "perk", "stomp", "thump", "scratch", "shake", "tailflick", "tailslap", "stretch", "howl", "rise"];
    for (const id of Object.keys(raw.species)) {
      const c = characterOf(id);
      expect(known).toContain(c.quirk);
      expect(c.every[0]).toBeGreaterThan(c.for);
      expect(c.every[1]).toBeGreaterThanOrEqual(c.every[0]);
      expect(Math.abs(c.rig.hx) + Math.abs(c.rig.hy) + Math.abs(c.rig.by)).toBeLessThan(0.2);
    }
  });
  it("a quirk plays now and then, for its own length, different creatures at different times", () => {
    const c = characterOf("wolf"), on = (id: number) => { let n = 0; for (let t = 0; t < 120; t += 0.05) if (quirkAt(id, c, t) >= 0) n++; return n * 0.05; };
    const a = on(1), b = on(2);
    expect(a).toBeGreaterThan(c.for * 120 / c.every[1] * 0.8); expect(a).toBeLessThan(c.for * 120 / c.every[0] * 1.2 + c.for);
    let differ = 0; for (let t = 0; t < 60; t += 0.1) if ((quirkAt(1, c, t) >= 0) !== (quirkAt(2, c, t) >= 0)) differ++;
    expect(differ).toBeGreaterThan(10); // (not in step)
    expect(b).toBeGreaterThan(0);
  });
  it("a happy bounce is a hop off the ground and back, never below it", () => {
    let hi = 0;
    for (let t = 0; t < 30; t += 0.01) { const h = bounceAt(7, t); expect(h).toBeGreaterThanOrEqual(0); hi = Math.max(hi, h); }
    expect(hi).toBeGreaterThan(0.2);
  });
  it("an unknown species takes the default", () => { expect(characterOf("nobody").quirk).toBe(raw.default.quirk); });
});
