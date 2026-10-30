import { describe, expect, it } from "vitest";
import { quadrupedEarSocket, wrappedRosette } from "../art/body-graph/quadruped.js";
import { felineGraphGenome } from "../art/body-graph/families.js";
import { GENOME_BY_ID, speciesOf } from "../art/genome/index.js";
import { validateGraph } from "../art/body-graph/graph.js";
import { quad3d, withForm } from "../art/creatures3d.js";
import { defaultStyle } from "../art/generator.js";
import { Model } from "../art/model3d.js";
import { Sprite } from "../art/core.js";

function capture(record: unknown, level: number, frame: number) {
  const models: Model[] = [];
  const form = Object.assign((m: Model) => { models.push(m); return new Sprite(1, 1); }, { motes: false });
  withForm(form, () => quad3d(speciesOf(record), level, frame, defaultStyle()));
  return models[0];
}

describe("first shared feline graph iteration", () => {
  it("positions low, splayed ears symmetrically without moving the head", () => {
    const head = [1, 2, 0], before = head.slice();
    const a = quadrupedEarSocket(head, .3, 1, [0, 1, .2], [0, -.2, .12], [0, .24]);
    const b = quadrupedEarSocket(head, .3, -1, [0, 1, -.2], [0, -.2, .12], [0, .24]);
    expect(a.base[1]).toBeLessThan(head[1] + .3 * .7);
    expect(a.base[2]).toBeCloseTo(-b.base[2], 10);
    expect(a.direction[2]).toBeCloseTo(-b.direction[2], 10);
    expect(Math.hypot(...a.direction)).toBeCloseTo(1, 10);
    expect(head).toEqual(before);
  });
  it("wraps rosettes onto the back and both flanks and leaves the belly clear", () => {
    const bounds = { centreY: .7, depth: .3, width: .25, bellyY: .5 }, options = { k: 6, density: 1 };
    for (const angle of [0, Math.PI / 2, -Math.PI / 2]) {
      let ink = 0;
      for (let i = 0; i < 100; i++) for (let j = 0; j < 20; j++) {
        const a = angle + (j / 19 - .5) * .6;
        if (wrappedRosette([i / 100, .7 + Math.cos(a) * .3, Math.sin(a) * .25], options, bounds)) ink++;
      }
      expect(ink).toBeGreaterThan(10);
    }
    expect(wrappedRosette([0, .4, 0], options, bounds)).toBe(false);
  });
  it.each(["cat", "lynx", "lion", "tiger", "cheetah", "jaguar", "snowleopard"])("%s uses a connected graph at every level without mutating current art", id => {
    const base = GENOME_BY_ID[id], before = JSON.stringify(base), selected = felineGraphGenome(base);
    for (const level of [0, 1, 2, 3]) for (const frame of [0, 1]) {
      const model = capture(selected, level, frame);
      const graph = (model as Model & { bodyGraph: Parameters<typeof validateGraph>[0] }).bodyGraph;
      expect(graph.spine.length).toBeGreaterThan(2);
      expect(() => validateGraph(graph)).not.toThrow();
      expect(model.parts.every(p => p.type !== "ell" || [...p.c, ...p.r].every(Number.isFinite))).toBe(true);
      expect(model.anchors.feet).toHaveLength(4);
    }
    expect(JSON.stringify(base)).toBe(before);
    expect(capture(base, 1, 0)).not.toHaveProperty("bodyGraph");
  });
});
