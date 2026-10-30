import { describe, expect, it } from "vitest";
import { GENOME_BY_ID, speciesOf, genomeHash, selectedCreatureGenome, parseCreatureModels } from "../art/genome/index.js";
import { critter, speciesColours } from "../art/creatures.js";
import { defaultStyle } from "../art/generator.js";
import { rigParts } from "../art/genome/parts.js";
import { artCacheKey } from "./render/artCache";
import type { ArtJob } from "./render/artBuild";
import type { Style } from "./render/style";
import { GENOME_BEAR } from "../art/creatures/bear/genome.js";
import { variantColours } from "../art/genome/palette.js";
import { M } from "../art/core.js";

function fixture() {
  const base = GENOME_BEAR, variant = { ...structuredClone(base), levels: null };
  variant.body = { ...variant.body, len: 1.6, bw: .6 };
  variant.palette = { ...variant.palette, val: .85, hue: .3 };
  const style = { ...defaultStyle() } as Style;
  style.creatureModels = "bear:graph";
  style.creatureVariants = { bear: { graph: variant } };
  return { base, variant, style };
}

describe("one creature selection hook with the approved roster defaults", () => {
  it("selects individual species explicitly and ignores malformed tokens", () => {
    expect({ ...parseCreatureModels("bear:graph,wolf:roster,bad token,bear:current") }).toEqual({ bear: "current", wolf: "roster" });
    const { base, variant, style } = fixture();
    expect(selectedCreatureGenome(base, style)).toBe(variant);
    expect(selectedCreatureGenome(GENOME_BY_ID.wolf, style)).not.toBe(GENOME_BY_ID.wolf);
    expect(speciesOf(base, style)).toHaveProperty("q.len", 1.6);
  });
  it("keeps Current records and hash for explicit current and unavailable choices", () => {
    const { base, style } = fixture();
    for (const context of [{ ...style, creatureModels: "bear:current" }, { creatureModels: "bear:graph" }]) {
      expect(selectedCreatureGenome(base, context)).toBe(base);
      expect(genomeHash(base, context)).toBe(genomeHash(base,{creatureModels:"bear:current"}));
    }
  });
  it("hashes selected content and keeps base/other records immutable", () => {
    const { base, variant, style } = fixture(), before = JSON.stringify(base);
    expect(genomeHash(base, style)).toBe(genomeHash(variant));
    expect(genomeHash(base, style)).not.toBe(genomeHash(base));
    const old = genomeHash(base, style); variant.body.len += .1;
    expect(genomeHash(base, style)).not.toBe(old);
    expect(JSON.stringify(base)).toBe(before);
    expect(genomeHash(GENOME_BY_ID.wolf, style)).toBe(genomeHash(GENOME_BY_ID.wolf));
  });
  it("uses identical selection in serialized page/worker contexts", () => {
    const { base, style } = fixture(), copy = JSON.parse(JSON.stringify(style));
    expect(speciesOf(base, copy)).toEqual(speciesOf(base, style));
    expect(genomeHash(base, copy)).toBe(genomeHash(base, style));
    expect(speciesColours("bear", copy)).toEqual(speciesColours("bear", style));
    expect(variantColours("bear", copy, "frost")).toEqual(variantColours("bear", style, "frost"));
    expect(speciesColours("bear", copy)[M.BODY]).not.toEqual(speciesColours("bear", defaultStyle())[M.BODY]);
  });
  it("separates same-id sprite caches and restores the exact current sprite", () => {
    const { style } = fixture(), currentStyle = defaultStyle();
    const before = critter("bear", 1, 0, currentStyle), selected = critter("bear", 1, 0, style);
    expect(selected).not.toBe(before);
    expect(Array.from(selected.m)).not.toEqual(Array.from(before.m));
    expect(critter("bear", 1, 0, currentStyle)).toBe(before);
    expect(speciesColours("bear", style)).not.toEqual(speciesColours("bear", currentStyle));
  });
  it("separates persistent creature/face/rig cache entries by the selected genome", () => {
    const { style } = fixture();
    for (const job of [
      { kind: "creature", id: "bear" }, { kind: "face", id: "bear-angry", species: "bear", face: "angry" },
      { kind: "rig", id: "bear-rig", species: "bear", level: 1 }, { kind: "sleep", id: "bear-sleep", species: "bear" },
    ]) {
      const current = artCacheKey({ ...job, style: defaultStyle() } as ArtJob, "same-style-hash");
      const selected = artCacheKey({ ...job, style } as ArtJob, "same-style-hash");
      expect(selected).not.toBe(current);
      expect(selected).toContain(genomeHash(GENOME_BY_ID.bear, style, job.kind === "rig" ? job.level : null));
    }
    expect(artCacheKey({ kind: "creature", id: "wolf", style } as ArtJob, "same")).toBe(artCacheKey({ kind: "creature", id: "wolf", style: defaultStyle() } as ArtJob, "same"));
    expect(artCacheKey({ kind: "rig", id: "same-id", species: "bear", level: 0, style }, "same")).not.toBe(artCacheKey({ kind: "rig", id: "same-id", species: "bear", level: 1, style }, "same"));
  });
  it("uses the selected anatomy for rig pieces too", () => {
    const { style } = fixture();
    const old = rigParts("bear", 0, defaultStyle()), selected = rigParts("bear", 0, style);
    expect(selected?.joints.len).toBeGreaterThan(old?.joints.len ?? Infinity);
    expect(selected?.joints.bw).toBeGreaterThan(old?.joints.bw ?? Infinity);
  });
  it("rejects a selected record for another species", () => {
    const { base, style } = fixture();
    style.creatureVariants.bear.graph = GENOME_BY_ID.wolf;
    expect(() => selectedCreatureGenome(base, style)).toThrow(/Invalid selected creature/);
  });
  it("resolves selected per-level look and includes the level in its hash", () => {
    const { base, style } = fixture();
    style.creatureVariants.bear.graph = {
      ...style.creatureVariants.bear.graph,
      look: { embers: true, coat: "natural" },
      levels: [{ look: { embers: false } }, { look: { embers: false } }, { look: { embers: false } }, null],
    };
    for (const level of [0, 1, 2]) expect(selectedCreatureGenome(base, style, level).look).toEqual({ embers: false, coat: "natural" });
    expect(selectedCreatureGenome(base, style, 3).look.embers).toBe(true);
    expect(speciesOf(base, style, 0)).toHaveProperty("look.embers", false);
    expect(speciesOf(base, style, 3)).toHaveProperty("look.embers", true);
    expect(speciesOf(base, style, 0)).toHaveProperty("genomeKey", genomeHash(base, style, 0));
    expect(genomeHash(base, style, 0)).not.toBe(genomeHash(base, style, 1));
    expect(selectedCreatureGenome(base, { ...style, creatureModels: "" }, 0)).not.toBe(base);
    expect(() => selectedCreatureGenome(base, style, 4)).toThrow(/level/);
  });
});
