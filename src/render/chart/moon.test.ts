import { describe, expect, it } from "vitest";
import { edgeBand, moonAt, moonKnobs } from "./moon";
import { TUNING } from "../../rules/tuning";

describe("the moon over the sea chart (render/chart/moon.ts)", () => {
  const m = moonKnobs(TUNING as never);
  it("rises over the north-west edge as the chart opens, from under the horizon", () => {
    const a = moonAt(0, m);
    expect(a.bearing).toBe(m.from);
    expect(m.from).toBeLessThan(0); expect(m.from).toBeGreaterThan(-90); // (north-west)
    expect(a.height).toBeLessThan(0);
    expect(a.risen).toBe(0);
    const up = moonAt(m.rise, m);
    expect(up.bearing).toBe(m.from); // (it rises where it is, then sets off)
    expect(up.height).toBeCloseTo(m.height);
    expect(up.risen).toBe(1);
    for (let t = 0; t < m.rise; t += 0.5) expect(moonAt(t + 0.5, m).height).toBeGreaterThanOrEqual(moonAt(t, m).height);
  });
  it("then goes round once a turn, slowly (3 to 5 minutes)", () => {
    expect(m.turn).toBeGreaterThanOrEqual(180); expect(m.turn).toBeLessThanOrEqual(300);
    expect(moonAt(m.rise + m.turn, m).bearing - m.from).toBeCloseTo(360);
    expect(moonAt(m.rise + m.turn / 4, m).bearing - m.from).toBeCloseTo(90);
  });
  it("fills missing knobs from the defaults and keeps the empty band sane", () => {
    expect(moonKnobs({}).shadow).toBeCloseTo(0.6);
    expect(moonKnobs({ chart: { moon: { shadow: 0.3 } } })).toMatchObject({ shadow: 0.3, rise: 6 });
    expect(edgeBand(TUNING as never)).toBeGreaterThan(0);
    expect(edgeBand({ chart: { edgeBand: 5 } })).toBe(0.6);
    expect(edgeBand({ chart: { edgeBand: -1 } })).toBe(0);
  });
});
