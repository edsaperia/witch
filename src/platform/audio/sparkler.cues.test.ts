import { describe, expect, it } from "vitest";
import { newGame } from "../../rules/game";
import { leyPulse } from "../../rules/leypulse";
import { TUNING } from "../../rules/tuning";
import type { Sfx } from "./sfx";
import { SfxCues } from "./sfxCues";

/** A stand-in for the sound effects: every call does nothing, the sparkler's levels are kept. */
function fakeSfx() {
  const levels: number[] = [];
  const sfx = new Proxy({}, { get: (_, k) => k === "sparkler" ? (level: number) => levels.push(level) : () => {} }) as unknown as Sfx;
  return { sfx, levels };
}

describe("the ley pulse's sparkler fizz (#491)", () => {
  it("is heard by the pulse's tip, fading with distance, and not while home boots up", () => {
    const g = newGame(123, TUNING), w = g.witch, R = g.tuning.sfx.sparkler!.range;
    const { sfx, levels } = fakeSfx(), cues = new SfxCues(sfx);
    // booting: the pulse hasn't set off
    g.party.bootUntil = 100;
    const tip0 = leyPulse(g.party, g.map, 200)!;
    w.x = tip0.x; w.z = tip0.z;
    cues.update(g, 50);
    expect(levels.at(-1)).toBe(0);
    // the boot done, standing on the tip, then further off, then out of range
    const at = (d: number, time: number) => { const t = leyPulse(g.party, g.map, time)!; w.x = t.x + d; w.z = t.z; cues.update(g, time); return levels.at(-1)!; };
    const on = at(0, 200), near = at(R * 0.3, 200.1), far = at(R * 1.2, 200.2);
    expect(on).toBeGreaterThan(0.9);
    expect(near).toBeGreaterThan(0);
    expect(near).toBeLessThan(on);
    expect(far).toBe(0);
  });
});
