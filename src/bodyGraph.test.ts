import { describe, expect, it } from "vitest";
import { compileGraph, validateGraph } from "../art/body-graph/graph.js";
import { quadrupedFixture, socketFixture } from "../art/body-graph/fixtures.js";
import { Model, render } from "../art/model3d.js";
import { M } from "../art/core.js";

describe("experimental creature body graph", () => {
  it.each(["plantigrade", "digitigrade", "hoof"])("%s has continuous skin, tapered limbs and grounded feet", family => {
    const graph = quadrupedFixture(family), { model, legs } = compileGraph(graph);
    expect(legs).toHaveLength(4);
    for (const l of legs) {
      expect(l.radii[0]).toBeGreaterThan(l.radii[1]);
      expect(l.radii[1]).toBeGreaterThan(l.radii[2]);
      const points = [l.root, l.knee, l.end];
      for (let i = 1; i < points.length; i++) for (let k = 0; k <= 20; k++) {
        const p = points[i - 1].map((v: number, j: number) => v + (points[i][j] - v) * k / 20);
        expect(model.groupField(1, p)).toBeLessThan(0);
      }
    }
    expect(model.anchors.feet).toHaveLength(4);
    for (const l of legs) {
      const foot = model.parts.find(p => p.type === "ell" && p.part === l.id);
      expect(foot).toBeDefined();
      if (foot?.type === "ell") expect(foot.c[1] - foot.r[1]).toBeCloseTo(0, 10);
    }
    for (let i = 1; i < graph.spine.length; i++) for (let k = 0; k <= 20; k++) {
      const a = graph.spine[i - 1].at, b = graph.spine[i].at;
      expect(model.groupField(1, a.map((v, j) => v + (b[j] - v) * k / 20))).toBeLessThan(0);
    }
  });

  it("matches the existing skin primitives exactly for a torso-only graph", () => {
    const graph = quadrupedFixture();
    graph.sockets = [];
    const actual = compileGraph(graph).model, expected = new Model({ blend: graph.blend });
    for (const s of graph.spine) expected.ell(s.at, s.r, M.BODY, { part: "body" });
    expect(actual.parts).toEqual(expected.parts);
    for (const facing of ["towards", "away"]) {
      const options = { height: 45, facing };
      expect(render(actual, options).sp).toEqual(render(expected, options).sp);
    }
  });

  it("supports extra heads, shells and wings without mutating the input", () => {
    const graph = socketFixture(), before = JSON.stringify(graph);
    const a = compileGraph(graph), b = compileGraph(graph);
    expect(Object.keys(a.sockets)).toHaveLength(graph.sockets.length);
    expect(a.model.parts).toEqual(b.model.parts);
    expect(JSON.stringify(graph)).toBe(before);
    const head = a.model.parts.find(p => p.part === "second-head");
    const shell = a.model.parts.find(p => p.part === "shell");
    expect(head?.group).toBe(1);
    expect(shell?.group).not.toBe(1);
  });

  it("actually blends skin rather than merely overlapping hard shapes", () => {
    const { model } = compileGraph(quadrupedFixture());
    const p = [0, .82, 0];
    expect(model.groupField(1, p)).toBeLessThan(model.field(p));
  });

  it("rejects disconnected spine stations and invalid sockets before drawing", () => {
    const gap = quadrupedFixture(); gap.spine[1].at = [10, 0, 0];
    expect(() => validateGraph(gap)).toThrow(/disconnected spine/);
    const unknown = quadrupedFixture(); unknown.sockets[0].station = "missing";
    expect(() => validateGraph(unknown)).toThrow(/known station/);
    const bad = quadrupedFixture(); bad.spine[0].r[0] = NaN;
    expect(() => validateGraph(bad)).toThrow(/positive radii/);
    const duplicate = quadrupedFixture(); duplicate.sockets.push(duplicate.sockets[0]);
    expect(() => validateGraph(duplicate)).toThrow(/unique socket/);
  });
});
