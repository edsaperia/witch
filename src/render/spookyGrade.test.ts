// The pause page's Spooky colour grade slider (Ed, 2026-10-21: "Please put spooky colour grade as a slider in the leaf jitter
// section"): light.spooky.grade, in the Leaf jitter group, drives the composite's uGrade.x live (render/mood.ts gradeInto, read every
// frame by render/post.ts), the area moods' easing leaves it be, and it carries to the next island like the other sliders.
import { describe, expect, it } from "vitest";
import { DECISION_LIST, groupOf, setKnob } from "../ui/decisions";
import { carryKnobs } from "../app/settings";
import { TUNING } from "../rules/tuning";
import { AreaMoods, gradeInto, moodOf } from "./mood";

const copy = () => JSON.parse(JSON.stringify(TUNING)) as typeof TUNING;
const vec = () => { const v = { x: NaN, y: NaN, z: NaN, w: NaN, set(x: number, y: number, z: number, w: number) { v.x = x; v.y = y; v.z = z; v.w = w; return v; } }; return v; };
const rgb = () => { const v = { x: 1, y: 1, z: 1, set(r: number, g: number, b: number) { v.x = r; v.y = g; v.z = b; return v; } }; return v; };

describe("the Spooky colour grade slider", () => {
  const d = DECISION_LIST.find(e => e.id === "spookyGrade")!;

  it("is a 0 to 1 slider on light.spooky.grade in the Leaf jitter group, beside autumn, hue and value, its default the built grade", () => {
    expect(d).toBeTruthy();
    expect(d.apply.knob).toBe("light.spooky.grade");
    expect(d.control).toMatchObject({ type: "slider", min: 0, max: 1 });
    expect(d.default).toBe(TUNING.light?.spooky?.grade);
    expect(d.default).toBe(0); // (Ed's tuned value, 2026-10-26: the grade off)
    const leaf = DECISION_LIST.filter(e => e.id.startsWith("leafJitter"));
    expect(leaf.length).toBe(3);
    for (const e of leaf) expect(groupOf(e)).toBe(groupOf(d));
  });

  it("drives uGrade.x live: the slider sets the knob in place and the next frame's grade reads it", () => {
    const t = copy(), M = moodOf(t)!, u = vec();
    setKnob(t, d.apply.knob!, 0.9);
    gradeInto(u, M);
    expect(u.x).toBe(0.9); expect(u.y).toBe(M.gradeDesat); expect(u.z).toBe(M.gradePivot);
    setKnob(t, d.apply.knob!, 0.35); // (as the pause page does: applyDecision)
    expect(moodOf(t)).toBe(M); // (the same mood object: no identity change to notice)
    gradeInto(u, moodOf(t));
    expect(u.x).toBe(0.35);
    setKnob(t, d.apply.knob!, 0);
    gradeInto(u, moodOf(t));
    expect([u.x, u.y, u.z]).toEqual([0, 0, 1]); // (off: the composite skips the grade)
    setKnob(t, d.apply.knob!, 1);
    gradeInto(u, moodOf(t));
    expect(u.x).toBe(1);
  });

  it("isn't overwritten by the area moods' easing (they ease only its tint)", () => {
    const t = copy(), M = moodOf(t)!, u = vec(), areas = new AreaMoods(M), area = Object.keys(M.areas ?? {})[0] ?? "";
    setKnob(t, d.apply.knob!, 0.2);
    gradeInto(u, moodOf(t));
    for (let i = 0; i < 30; i++) { areas.update(area, 0.1, rgb(), rgb(), null); gradeInto(u, moodOf(t)); }
    expect(u.x).toBe(0.2);
  });

  it("carries across a sail to the next night's tuning", () => {
    const from = copy(), to = copy();
    setKnob(from, d.apply.knob!, 0.4);
    expect(carryKnobs(from, to)).toContain("spookyGrade");
    const u = vec(); gradeInto(u, moodOf(to));
    expect(u.x).toBe(0.4);
  });
});
