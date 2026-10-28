// The legend circle's explainer (rules/legendCircle.ts; Ed, 2026-10-06): it shows on the ground inside a legend's clearing only,
// fading in as she walks in and out as she walks out, and its words follow the legend's state.
import { describe, expect, it } from "vitest";
import { newGame } from "./game";
import { TUNING } from "./tuning";
import { circleLines, circleShown, circleReach, legendCircleNear, sigilWords } from "./legendCircle";
import { legendCircleAt } from "./musicPlan";

describe("the legend circle's explainer", () => {
  const setup = () => { const g = newGame(123, TUNING), L = g.creatures.find(c => c.boss && !c.gone && c.legendState === "asleep")!; return { g, L }; };

  it("skips only legends too far for their circle: the same answers as searching every legend's clearing", () => {
    const { g } = setup(), R = g.tuning.music.circle.radius, ks = g.map.legendClearings;
    // the search before circleReach: every legend's nearest clearing, the point in it (or in R of the legend)
    const ring = (c: { x: number; z: number }) => { let k = null as (typeof ks)[number] | null, rd = Infinity; for (const q of ks) { const d = Math.hypot(q.legend.x - c.x, q.legend.z - c.z); if (d < rd) { rd = d; k = q; } } return k && rd <= k.r ? k : { x: c.x, z: c.z, r: R }; };
    const all = (at: { x: number; z: number }, calm = false) => { let best = null, bd = Infinity; for (const c of g.creatures) { if (!c.boss || c.gone || c.leashed || (calm && c.legendState !== "asleep" && c.legendState !== "restless")) continue; const k = ring(c), d = Math.hypot(at.x - k.x, at.z - k.z); if (d <= k.r && d < bd) { bd = d; best = c; } } return best; };
    expect(circleReach(ks, R)).toBeGreaterThan(R);
    let inside = 0;
    for (const L of g.creatures.filter(c => c.boss && !c.gone)) {
      L.x += 3; L.z -= 2; // (a woken legend wanders off its spot)
      if (L.id % 3 === 0) L.legendState = "angry";
      const k = ring(L);
      for (let i = 0; i < 24; i++) {
        const a = i * 2.4, at = { x: k.x + Math.cos(a) * k.r * (i / 20), z: k.z + Math.sin(a) * k.r * (i / 20), mode: "ground" };
        const want = all(at);
        if (want) inside++;
        expect(legendCircleNear(g, at)?.legend ?? null).toBe(want);
        expect(legendCircleAt(g, at)).toBe(all(at, true));
      }
    }
    expect(inside).toBeGreaterThan(100);
  });

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

  it("shows for a legend in any state, and says what its state means, in Ed's plain words (2026-10-19)", () => {
    const { g, L } = setup(), at = { x: L.x, z: L.z, mode: "ground" };
    const words = () => circleLines(L).map(l => l.text);
    const name = L.species === "beetle" ? "stag beetle" : L.species === "cat" ? "wildcat" : L.species;
    expect(words()).toEqual([`A sleeping legend: the ${name}.`, `Put down {sigil} ${sigilWords(L.quest!.species)}, any age, inside this circle.`, "It will wake, fight for you and show you its island.", "Leave none of its kind in its area and it grows restless."]);
    L.questOpen = false; // (the party's over: Ed, 2026-10-18, no quest taken)
    expect(words()).toEqual([`A sleeping legend: the ${name}.`, "The party's over: it sleeps on."]);
    expect(circleLines(L, "zoo").map(l => l.text)).toEqual([`A sleeping legend: the ${name}.`, "In the zoo it sleeps on, for you to see."]); // (the zoo's legends sleep for show: Ed, 2026-10-26)
    L.questOpen = true;
    L.legendState = "restless";
    expect(legendCircleNear(g, at)?.legend).toBe(L);
    expect(words()[0]).toBe(`A restless legend: the ${name}.`); expect(words()[1]).toContain("{sigil}"); expect(words().at(-1)).toBe("Bring one of its kind back to its area to calm it.");
    L.legendState = "angry";
    expect(legendCircleNear(g, at)?.legend).toBe(L);
    expect(words()).toEqual([`An angry legend: the ${name}!`, "Wear it down, or bring one of its kind back to its area, and it will settle."]);
    L.quest!.done = 10; L.legendState = "happy";
    expect(words()).toEqual([`Your ally: the ${name}.`, "It fights for you and guards its area.", "Its island is found: win the night to keep it."]);
    expect(circleLines(L).at(-1)!.done).toBe(true);
    for (const s of ["asleep", "restless", "angry", "happy"] as const) { L.legendState = s; for (const w of words()) { expect(w).not.toMatch(/kill|die|dead|elder|kin\b|slumber|boon|bring .* into/i); expect(w.length).toBeLessThan(90); } }
  });

  it("asks for its kind with no age and names no boon (Ed, 2026-10-18)", () => {
    const { L } = setup();
    L.quest!.done = undefined; L.legendState = "asleep";
    const line = circleLines(L).find(l => l.text.includes("{sigil}"))!.text;
    expect(line).toMatch(/any age/);
    expect(line).toMatch(/^Put down \{sigil\} an? [a-z ]+'s sigil, any age, inside this circle\.$/);
    expect(line).not.toMatch(/\b(baby|young|adult)\b/);
  });
});
