import { describe, expect, it } from "vitest";
import { winStar } from "./fireworks";

describe("the win's finale fireworks palette (Ed, 2026-10-11)", () => {
  it("a peony is a rainbow round its burst; a ring gold outside and silver in; a willow gold glitter; a crackle silver strobes", () => {
    const c = [0, 0, 0], hues = new Set<string>();
    for (let i = 1; i < 40; i++) { expect(winStar("peony", i * 5 + 1, (i / 40) * Math.PI * 2, false, c)).toBe(1); hues.add(c.map(v => v.toFixed(2)).join()); }
    expect(hues.size).toBeGreaterThanOrEqual(6); // (round the rainbow: the party's seven neons)
    winStar("ring", 0, 0, false, c); const gold = [...c];
    winStar("ring", 1, 0, true, c); const silver = [...c];
    expect(gold[0]).toBeGreaterThan(gold[2] + 0.4); // gold: red-yellow over blue
    expect(silver[2]).toBeGreaterThanOrEqual(silver[0]); // silver: cool
    expect(winStar("willow", 1, 0, false, c)).toBe(5); // drooping and glittering
    expect(winStar("crackle", 1, 0, false, c)).toBe(3);
    for (const v of c) expect(v).toBeGreaterThan(0.85); // white-silver
  });
});
