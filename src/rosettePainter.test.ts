import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { regionMarking, wrappedRosette, rosetteCellVariation, rosetteDensityMultiplier } from "../art/body-graph/quadruped.js";
import { M } from "../art/core.js";

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
    expect(digest(painterBytes({ sizeVariation: 0, closedFraction: 0, filledFraction: 0, gapRange: [.4, .4] }))).toBe(digest(painterBytes()));
    expect(digest(painterBytes({ densityFalloff: { axis:"x",from:0,to:1,min:1 } }))).toBe(digest(painterBytes()));
  });
  it("fills a stable share of complete cells with solid ink rather than pale centres", () => {
    let filled=0;
    for(let i=-50;i<50;i++)for(let j=0;j<20;j++)filled+=Number(rosetteCellVariation({filledFraction:.3},i,j).filled);
    expect(filled/2000).toBeGreaterThan(.25);expect(filled/2000).toBeLessThan(.35);
    expect(rosetteCellVariation({filledFraction:0},0,0).filled).toBe(false);
    expect(rosetteCellVariation({filledFraction:1},0,0).filled).toBe(true);
    const solid=painterBytes({filledFraction:1}), normal=painterBytes();
    // Even entries are regional materials; odd entries are the legacy boolean.
    expect(solid.filter((v,i)=>i%2===0&&v===M.BODYL)).toHaveLength(0);
    expect(normal.filter((v,i)=>i%2===0&&v===M.BODYL).length).toBeGreaterThan(0);
    expect(solid.filter((v,i)=>i%2===0&&v===M.BODY3).length).toBeGreaterThan(normal.filter((v,i)=>i%2===0&&v===M.BODY3).length);
  });
  it("fades whole cells toward the belly and neck with clamped, composable ramps", () => {
    const neck={axis:"x",from:.2,to:1,min:.2}, belly={axis:"y",from:0,to:-1,min:0};
    expect(rosetteDensityMultiplier(neck,{x:0,y:0,z:0})).toBe(1);
    expect(rosetteDensityMultiplier(neck,{x:2,y:0,z:0})).toBeCloseTo(.2);
    expect(rosetteDensityMultiplier(neck,{x:.6,y:0,z:0})).toBeCloseTo(.6);
    expect(rosetteDensityMultiplier([neck,belly],{x:.6,y:-.5,z:0})).toBeCloseTo(.3);
    expect(rosetteDensityMultiplier(belly,{x:0,y:-1,z:0})).toBe(0);
    const faded=painterBytes({densityFalloff:[neck,belly]});
    expect(digest(faded)).toBe(digest(painterBytes({densityFalloff:[neck,belly]})));
    const ink=(v:Uint8Array)=>v.filter((x,i)=>i%2===0&&x!==255).length;
    expect(ink(faded)).toBeLessThan(ink(painterBytes()));
    expect(ink(painterBytes({densityFalloff:{axis:"y",from:-2,to:-1,min:0}}))).toBe(0);
    for(const field of [{axis:"w",from:0,to:1,min:0},{axis:"x",from:0,to:0,min:0},{axis:"y",from:0,to:1,min:-1}])expect(()=>rosetteDensityMultiplier(field,{x:0,y:0,z:0})).toThrow(/densityFalloff/);
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
    for (const options of [{ sizeVariation: -1 }, { sizeVariation: 1 }, { closedFraction: 2 }, { closedFraction: NaN }, {filledFraction:-1}, {filledFraction:1.1}, { gapRange: [.8, .1] }, { gapRange: [0, 4] }]) {
      expect(() => rosetteCellVariation(options, 1, 2)).toThrow(/Rosette/);
    }
  });
});
