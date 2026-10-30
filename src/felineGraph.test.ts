import { describe, expect, it } from "vitest";
import { quadrupedEarSocket, wrappedRosette, regionMarking, rosetteSizing } from "../art/body-graph/quadruped.js";
import { felineGraphGenome } from "../art/body-graph/families.js";
import { GENOME_BY_ID, speciesOf } from "../art/genome/index.js";
import { validateGraph } from "../art/body-graph/graph.js";
import { quad3d, withForm } from "../art/creatures3d.js";
import { defaultStyle } from "../art/generator.js";
import { Model } from "../art/model3d.js";
import { Sprite, M } from "../art/core.js";
import { catCaptureGenome, CAT_CAPTURE_IDS } from "../tools/body-graph/cat-fixtures.js";
import { critter } from "../art/creatures.js";
import type { Style } from "./render/style";

function capture(record: unknown, level: number, frame: number) {
  const models: Model[] = [];
  const form = Object.assign((m: Model) => { models.push(m); return new Sprite(1, 1); }, { motes: false });
  withForm(form, () => quad3d(speciesOf(record), level, frame, defaultStyle()));
  return models[0];
}

describe("first shared feline graph iteration", () => {
  it("gives both sand-cat ears short broad geometry at every growth level", () => {
    for (const level of [0, 1, 2, 3]) {
      const model = capture(catCaptureGenome(GENOME_BY_ID.cat), level, 0), rig = Reflect.get(model, "rig");
      expect(rig.ears).toHaveLength(2);
      for (const ear of rig.ears) {
        expect(ear.h / (2 * ear.w)).toBeCloseTo(.95 / 1.15, 10);
        expect(ear.base[1]).toBeCloseTo(rig.head.H[1] + rig.head.hr * .45, 10);
        expect(Math.abs(ear.dir[2] / ear.dir[1])).toBeGreaterThan(.9);
      }
      expect(rig.ears[0].dir[2]).toBeCloseTo(-rig.ears[1].dir[2], 10);
      expect(rig.ears[0].base[2]).toBeCloseTo(-rig.ears[1].base[2], 10);
    }
  });
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
  it("keeps pale ring centres, ring ink and solid regional spots separate", () => {
    const colours = new Set(), bounds = { centreY: .7, depth: .3, width: .25, bellyY: .5 };
    for (let i = 0; i < 100; i++) for (let j = 0; j < 40; j++) {
      const angle = (j / 40 - .5) * Math.PI;
      colours.add(regionMarking([i / 100, .7 + Math.cos(angle) * .3, Math.sin(angle) * .25], { kind: "rosettes", density: 1, centreMat: "BODYL" }, bounds));
    }
    expect(colours.has(M.BODYL)).toBe(true); expect(colours.has(M.BODY3)).toBe(true);
    expect(regionMarking([.05, .05, .05], { kind: "spots", k: 10, density: 1 })).toBe(M.BODY3);
    expect(regionMarking([.05, .05, .05], { kind: "none" })).toBe(null);
    const fixture = catCaptureGenome(GENOME_BY_ID.snowleopard);
    expect(fixture.coat.regions.torso.kind).toBe("rosettes");
    expect(fixture.coat.regions.head.kind).toBe("spots");
    expect(fixture.coat.regions.legs.kind).toBe("spots");
    expect(fixture.levels[3].coat.regions).toBe(null);
    expect(CAT_CAPTURE_IDS).toHaveLength(7);
  });
  it("uses actual bake scale for native ring size and excludes spine/rump outside the region", () => {
    const definition = { kind: "rosettes", outerPx: 7, density: 1, outer: .4, xRange: [-.6, .8], flankMin: .25 };
    for (const pixelsPerUnit of [10, 20, 50, 150]) {
      const sizing = rosetteSizing(definition, { depth: .3, width: .25, pixelsPerUnit });
      expect(sizing.nominalOuterPx).toBeCloseTo(7, 10);
      expect(sizing.k).toBeGreaterThan(0);
    }
    const bounds = { centreY: .7, depth: .3, width: .25, bellyY: .5, len: 1, pixelsPerUnit: 30 };
    for (let x = -.5; x <= .8; x += .01) expect(regionMarking([x, 1, 0], definition, bounds)).toBe(null);
    for (let z = -.25; z <= .25; z += .01) expect(regionMarking([-1, .7, z], definition, bounds)).toBe(null);
    expect(() => rosetteSizing({ outerPx: -1 }, bounds)).toThrow(/outerPx/);
  });
  it("sets native marking scale through the real renderer callback", () => {
    const style = { ...defaultStyle(), pixel: 3 } as Style;
    style.creatureModels = "snowleopard:graph";
    style.creatureVariants = { snowleopard: { graph: catCaptureGenome(GENOME_BY_ID.snowleopard) } };
    const sp = critter("snowleopard", 1, 0, style);
    expect(sp).toHaveProperty("markingMetrics");
    expect(Reflect.get(sp, "markingMetrics").nominalOuterPx).toBeCloseTo(7, 10);
    expect(sp).toHaveProperty("markingMetrics.pixelsPerUnit");
  });
  it("keeps an opt-in baby's belly below its back even with inverted legacy ratios", () => {
    const model = capture(catCaptureGenome(GENOME_BY_ID.snowleopard), 0, 0), rig = Reflect.get(model, "rig");
    expect(rig.chest).toBeLessThan(rig.top);
    expect(rig.tuck).toBeLessThan(rig.top);
    const current = Reflect.get(capture(GENOME_BY_ID.snowleopard, 0, 0), "rig");
    expect(current.chest).toBeGreaterThanOrEqual(current.top); // legacy path deliberately retained
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
