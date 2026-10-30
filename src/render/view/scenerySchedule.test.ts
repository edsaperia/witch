import { describe, expect, it } from "vitest";
import { advanceScenery, type SceneryJob } from "./scenerySchedule";

describe("scenery scheduling", () => {
  it("never drains an unfinished ordinary-play rebuild, however many frames it needs", () => {
    let steps = 0, made = 0;
    function* rebuild(): SceneryJob { for (let i = 0; i < 150; i++) { steps++; yield; } }
    const make = () => { made++; return rebuild(); };
    let job: SceneryJob | null = null;
    for (let frame = 0; frame < 150; frame++) {
      const before = steps;
      job = advanceScenery(job ?? undefined, make);
      expect(steps - before).toBe(1);
      expect(made).toBe(1); // A moved camera/new art must not replace or synchronously finish it.
    }
    expect(advanceScenery(job!, make)).toBeNull();
    expect(steps).toBe(150);
    expect(made).toBe(1);
    expect(advanceScenery(undefined, make)).not.toBeNull();
    expect(made).toBe(2); // A fresh due check on the following frame catches up.
  });

  it("finishes both the old and freshly requested lists for explicit preparation", () => {
    const order: string[] = [];
    function* rebuild(label: string): SceneryJob { for (let i = 0; i < 6; i++) { order.push(label); yield; } }
    const job = advanceScenery(undefined, () => rebuild("old"));
    expect(advanceScenery(job!, () => { expect(order).toHaveLength(6); return rebuild("new"); }, true)).toBeNull();
    expect(order).toEqual([...Array(6).fill("old"), ...Array(6).fill("new")]);
  });

  it("does no work when nothing is due", () => {
    expect(advanceScenery(undefined, () => null)).toBeNull();
  });
});
