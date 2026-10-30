import { describe, expect, it } from "vitest";
import { compileGraph, validateGraph } from "../art/body-graph/graph.js";
import { quadrupedFixture, socketFixture } from "../art/body-graph/fixtures.js";
import { Model, render } from "../art/model3d.js";
import { M } from "../art/core.js";
import { gaitPhase, solveLeg, sampleLeg, poseGraph } from "../art/body-graph/gait.js";

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

describe("experimental body graph gait", () => {
  const distance = (a: number[], b: number[]) => Math.hypot(...a.map((v, i) => v - b[i]));

  it("keeps both bone lengths for reachable, clamped and singular targets", () => {
    for (const target of [[.2, -.7, .1], [0, -10, 0], [0, 0, 0], [1, 0, 0]]) {
      for (const lengths of [[.4, .4], [.4, .2]]) {
        const pose = solveLeg([0, 0, 0], target, lengths[0], lengths[1]);
        expect(distance(pose.root, pose.knee)).toBeCloseTo(lengths[0], 7);
        expect(distance(pose.knee, pose.end)).toBeCloseTo(lengths[1], 7);
        expect([...pose.knee, ...pose.end].every(Number.isFinite)).toBe(true);
      }
    }
    expect(solveLeg([0, 0, 0], [0, -10, 0], .4, .4).reachable).toBe(false);
  });

  it("is periodic in signed travel and has stationary planted feet in world space", () => {
    const { legs } = compileGraph(quadrupedFixture());
    const stride = .16, duty = .65, cycleDistance = stride / duty;
    expect(gaitPhase(-cycleDistance)).toBeCloseTo(0, 10);
    for (const travel of [.01, .03, .05]) {
      const a = sampleLeg(legs[0], gaitPhase(travel), { stride, duty });
      const b = sampleLeg(legs[0], gaitPhase(travel + .005), { stride, duty });
      expect(a.planted && b.planted).toBe(true);
      expect(travel + a.end[0]).toBeCloseTo(travel + .005 + b.end[0], 9);
      expect(a.end[1]).toBeCloseTo(legs[0].end[1], 9);
      expect(gaitPhase(travel + cycleDistance)).toBeCloseTo(gaitPhase(travel), 9);
    }
  });

  it.each(["plantigrade", "digitigrade", "hoof"])("%s loops continuously and never claims unreachable contact", family => {
    const graph = quadrupedFixture(family), before = JSON.stringify(graph);
    const { legs } = compileGraph(graph);
    for (const leg of legs) {
      for (let k = 0; k <= 100; k++) {
        const p = sampleLeg(leg, k / 100);
        expect(p.reachable).toBe(true);
        expect(p.end[1]).toBeGreaterThanOrEqual(leg.end[1] - 1e-9);
      }
      for (const boundary of [0, .65, 1]) {
        const a = sampleLeg(leg, boundary - 1e-7), b = sampleLeg(leg, boundary + 1e-7);
        expect(distance(a.end, b.end)).toBeLessThan(1e-5);
      }
    }
    const start = poseGraph(graph, 0), end = poseGraph(graph, .16 / .65);
    expect(start.model.parts).toEqual(end.model.parts);
    expect(JSON.stringify(graph)).toBe(before);
  });

  it("rejects invalid clocks and solver inputs", () => {
    expect(() => gaitPhase(Infinity)).toThrow(/finite travel/);
    expect(() => gaitPhase(1, { duty: 1 })).toThrow(/invalid stride/);
    expect(() => solveLeg([0, 0, 0], [0, 1, 0], 0, 1)).toThrow(/positive bone/);
  });
});
