// The legend circle's explainer (rules/legendCircle.ts; Ed, 2026-10-06): it shows on the ground inside a legend's clearing only,
// fading in as she walks in and out as she walks out, and its words follow the legend's state.
import { describe, expect, it } from "vitest";
import { newGame } from "./game";
import { TUNING } from "./tuning";
import { boonWords, circleLines, circleShown, legendCircleNear } from "./legendCircle";
import { LEGEND_BUFFS } from "./buffs";

describe("the legend circle's explainer", () => {
  const setup = () => { const g = newGame(123, TUNING), L = g.creatures.find(c => c.boss && !c.gone && c.legendState === "asleep")!; return { g, L }; };

  it("shows on the ground inside the clearing only, fading in on entering and out on leaving", () => {
    const { g, L } = setup(), first = legendCircleNear(g, { x: L.x, z: L.z, mode: "ground" })!;
    expect(first.legend).toBe(L);
    const R = first.r, at = (d: number, mode = "ground") => ({ x: first.x + d, z: first.z, mode });
    expect(legendCircleNear(g, at(R * 0.5))?.legend).toBe(L);
    expect(legendCircleNear(g, at(R * 0.5, "treetop"))).toBeNull();
    expect(legendCircleNear(g, at(R + 2))).toBeNull();
    // walking in from outside, a step a frame, then back out
    const dt = 1 / 60;
    let shown = 0, firstIn = -1, full = -1;
    for (let i = 0; i < 240; i++) {
      const d = R + 6 - i * 0.1, inside = !!legendCircleNear(g, at(d));
      shown = circleShown(shown, inside, dt);
      if (!inside) expect(shown).toBe(0);
      if (inside && firstIn < 0) firstIn = i;
      if (shown === 1 && full < 0) full = i;
    }
    expect(firstIn).toBeGreaterThan(0);
    expect(full - firstIn).toBeLessThanOrEqual(Math.ceil(0.4 / dt) + 1); // (fully in within the fade)
    for (let i = 0; i < 30; i++) shown = circleShown(shown, false, dt);
    expect(shown).toBe(0);
  });

  it("shows for a legend in any state, and says what its state means", () => {
    const { g, L } = setup(), at = { x: L.x, z: L.z, mode: "ground" };
    const words = () => circleLines(L).map(l => l.text).join(" ");
    expect(words()).toMatch(/^This is a slumbering elder\./);
    expect(words()).toContain("{sigil}"); expect(words()).toContain("{relic}"); expect(words()).toContain("none of its children are nearby");
    L.quest!.done = 10;
    expect(circleLines(L).find(l => l.done)?.text).toMatch(/^Its boon is yours/);
    L.legendState = "restless";
    expect(legendCircleNear(g, at)?.legend).toBe(L);
    expect(words()).toMatch(/^This elder is restless\./); expect(words()).toContain("Bring one of its children back");
    L.legendState = "angry";
    expect(legendCircleNear(g, at)?.legend).toBe(L);
    expect(words()).toMatch(/^This elder is angry/); expect(words()).not.toContain("{relic}");
    expect(words()).toContain("bring one of its children back"); // (it settles once one of its kind is back in its area, too: rules/legends.ts)
    L.legendState = "happy";
    expect(words()).toMatch(/^This elder is your ally now\./);
    for (const s of ["asleep", "restless", "angry", "happy"] as const) { L.legendState = s; expect(words()).not.toMatch(/kill|die|dead/i); }
  });

  it("names the legend's own boon, from the buff it gives (Ed, 2026-10-06)", () => {
    const { L } = setup(), def = LEGEND_BUFFS.species[L.species];
    L.quest!.done = undefined; L.legendState = "asleep";
    const line = circleLines(L).find(l => l.text.includes("{sigil}"))!.text;
    expect(line).toContain("{boon}");
    if (def) { expect(line).toContain(def.name); expect(line).toContain(boonWords(L.species)!); }
    for (const sp of Object.keys(LEGEND_BUFFS.species)) {
      const w = boonWords(sp)!;
      expect(w.length).toBeGreaterThan(5);
      expect(w).not.toMatch(/'s [A-Z].*:/); // (the label's "Species's Name:" gone)
    }
    expect(boonWords("no-such-creature")).toBeNull();
  });
});
