import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { regionMarking, wrappedRosette, rosetteCellVariation } from "../art/body-graph/quadruped.js";

function painterBytes(extra = {}) {
  const values: number[] = [];
  for (const scale of [null, 12, 40, 90]) for (let x = -100; x <= 100; x++) for (let a = 0; a < 96; a++) {
    const angle = a / 96 * Math.PI * 2, p = [x / 70, .7 + Math.cos(angle) * .3, Math.sin(angle) * .25];
    const bounds = { centreY: .7, depth: .3, width: .25, bellyY: .45, len: 1, pixelsPerUnit: scale };
    values.push(regionMarking(p, { kind: "rosettes", outerPx: 7, gap: .4, density: .55, centreMat: "BODYL", ...extra }, bounds) ?? 255,
      Number(wrappedRosette(p, { k: 6, density: .75 }, bounds)));
  }
  return Uint8Array.from(values);
}
const digest = (bytes: Uint8Array) => createHash("sha256").update(bytes).digest("hex");

describe("seeded regional rosette variation", () => {
  it("retains the pre-change painter bytes when all new fields are absent", () => {
    // Recorded at 067d2a225 before the variation implementation: four scales,
    // both flanks/back/belly, old wrapped pattern and native regional rings.
    expect(digest(painterBytes())).toBe("e765eff27ef822a0f0a2deabb00692d626a9d32a48bb370cc4021eb691463e91");
    expect(digest(painterBytes({ sizeVariation: 0, closedFraction: 0, gapRange: [.4, .4] }))).toBe(digest(painterBytes()));
  });
  it("varies size and gap within bounds with a reproducible closed-ring share", () => {
    const options = { sizeVariation: .15, closedFraction: .25, gapRange: [0, .65] }, scales = new Set(), gaps = new Set();
    let closed = 0;
    for (let i = -50; i < 50; i++) for (let j = 0; j < 20; j++) {
      const v = rosetteCellVariation(options, i, j);
      expect(v).toEqual(rosetteCellVariation(options, i, j));
      expect(v.scale).toBeGreaterThanOrEqual(.85); expect(v.scale).toBeLessThanOrEqual(1.15);
      expect(v.gap).toBeGreaterThanOrEqual(0); expect(v.gap).toBeLessThanOrEqual(.65);
      scales.add(v.scale); gaps.add(v.gap); closed += Number(v.closed);
    }
    expect(scales.size).toBeGreaterThan(100); expect(gaps.size).toBeGreaterThan(100);
    expect(closed / 2000).toBeGreaterThan(.2); expect(closed / 2000).toBeLessThan(.3);
    expect(rosetteCellVariation({ closedFraction: 0 }, 0, 0).closed).toBe(false);
    expect(rosetteCellVariation({ closedFraction: 1 }, 0, 0).closed).toBe(true);
    const bytes = painterBytes(options);
    expect(digest(bytes)).toBe(digest(painterBytes(options)));
    expect(digest(bytes)).not.toBe(digest(painterBytes()));
    // Closed rings add rim pixels without relocating cells or pale centres.
    const open = painterBytes({ gapRange: [.65, .65] }), shut = painterBytes({ closedFraction: 1 });
    expect(shut.filter(v => v !== 255).length).toBeGreaterThan(open.filter(v => v !== 255).length);
  });
  it("rejects invalid bounds instead of emitting unstable patterns", () => {
    for (const options of [{ sizeVariation: -1 }, { sizeVariation: 1 }, { closedFraction: 2 }, { closedFraction: NaN }, { gapRange: [.8, .1] }, { gapRange: [0, 4] }]) {
      expect(() => rosetteCellVariation(options, 1, 2)).toThrow(/Rosette/);
    }
  });
});
