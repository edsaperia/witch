import { describe, expect, it } from "vitest";
import { GENOME_BEETLE } from "../art/creatures/beetle/genome.js";
import { selectedCreatureGenome, genomeHash } from "../art/genome/index.js";
import { speciesColours, critter } from "../art/creatures.js";
import { defaultStyle } from "../art/generator.js";
import { M, EMISSIVE } from "../art/core.js";
import { mandiblePart } from "../art/body-graph/mandibles.js";
import type { Style } from "./render/style";

function context() {
  const base = GENOME_BEETLE;
  const patch = {
    look: { embers: false, materials: { wingCases: "SHELL", thorax: "THORAX", head: "HEAD" }, mandibles: { length: .9, width: 1.4, curve: .65, teeth: 2 } },
    palette: { val: .65, over: { SHELL: [110, 70, 30], THORAX: [70, 40, 20], HEAD: [30, 20, 15] } },
  };
  const selected = { ...structuredClone(base), levels: [patch, patch, patch, null] };
  const style = { ...defaultStyle() } as Style;
  style.creatureModels = "beetle:roster"; style.creatureVariants = { beetle: { roster: selected } };
  return { base, selected, style };
}

describe("shared beetle controls and level palettes", () => {
  it("applies palette and look patches at young levels, retaining the original legend", () => {
    const { base, style } = context(), before = JSON.stringify(base);
    for (const level of [0, 1, 2]) {
      expect(selectedCreatureGenome(base, style, level).palette.val).toBe(.65);
      expect(selectedCreatureGenome(base, style, level).look.embers).toBe(false);
      const c = speciesColours("beetle", style, null, level);
      expect(c[M.SHELL]).toEqual([110, 70, 30]);
      expect(c[M.THORAX]).toEqual([70, 40, 20]);
      expect(c[M.HEAD]).toEqual([30, 20, 15]);
    }
    expect(selectedCreatureGenome(base, style, 3).palette).toEqual(base.palette);
    expect(selectedCreatureGenome(base, style, 3).look).toEqual(base.look);
    expect(speciesColours("beetle", style, null, 3)).toEqual(speciesColours("beetle", defaultStyle(), null, 3));
    expect(JSON.stringify(base)).toBe(before);
  });
  it("hashes a selected palette change and keeps the new slots non-emissive within the palette row", () => {
    const { base, selected, style } = context(), before = genomeHash(base, style, 0);
    selected.levels[0]!.palette.over.SHELL[0]++;
    expect(genomeHash(base, style, 0)).not.toBe(before);
    for (const mat of [M.SHELL, M.THORAX, M.HEAD]) { expect(mat).toBeLessThan(64); expect(EMISSIVE.has(mat)).toBe(false); }
  });
  it("keeps the legend's drawn pixels and normals identical with absent level-3 overrides", () => {
    const { style } = context(), original = critter("beetle", 3, 0, defaultStyle()), selected = critter("beetle", 3, 0, style);
    expect(selected.m).toEqual(original.m);
    expect(selected.n).toEqual(original.n);
  });
  it("builds symmetric inward-curving jaws with two teeth and raised away-view tips", () => {
    const opts = { length: 1, width: 1.5, curve: .7, teeth: 2 }, head = [.56, .3, 0];
    const a = mandiblePart(head, 1, .7, opts, "towards"), b = mandiblePart(head, -1, .7, opts, "towards");
    const away = mandiblePart(head, 1, .7, opts, "away");
    expect(a.teeth).toHaveLength(2);
    expect(a.tip[2]).toBeCloseTo(-b.tip[2], 10);
    expect(Math.abs(a.tip[2])).toBeLessThan(Math.abs(a.points[3][2]));
    expect(away.tip[1]).toBeGreaterThan(a.tip[1]);
    for (let i = 1; i < a.points.length; i++) {
      expect(Math.hypot(...a.points[i].slice(0, 3).map((v, k) => v - a.points[i - 1][k]))).toBeGreaterThan(Math.abs(a.points[i][3] - a.points[i - 1][3]));
    }
  });
  it("rejects invalid jaw dimensions and tooth counts", () => {
    expect(() => mandiblePart([0, 0, 0], 1, .7, { width: -1 }, "away")).toThrow(/dimensions/);
    expect(() => mandiblePart([0, 0, 0], 1, .7, { teeth: 3 }, "away")).toThrow(/teeth/);
  });
});
