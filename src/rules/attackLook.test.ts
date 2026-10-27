import { describe, expect, it } from "vitest";
import { attackOf } from "./combat";
import { ELEMENTS, ATTACK_LOOK, elementOf, spellPower, spellsProblems } from "./attackLook";
import { KINDS_TABLE } from "./kinds";
import { SPECIES } from "../../art/creatures.js";

const IDS = (SPECIES as { id: string }[]).map(s => s.id);
const biomes = [...new Set(Object.values(KINDS_TABLE).map(k => k.biome).filter((b): b is string => !!b))];

describe("the attack look's data (config/attack-look.json)", () => {
  it("is whole: every element's parts known, every name pointing at something that exists", () => {
    expect(spellsProblems(ATTACK_LOOK, IDS, biomes)).toEqual([]);
  });
  it("has eight elements", () => expect(ELEMENTS).toHaveLength(8));
  it("dresses every biome", () => { for (const b of biomes) expect(ATTACK_LOOK.byBiome[b], b).toBeDefined(); });
  it("gives each species its own element first, then its biome's", () => {
    expect(elementOf("salamander")).toBe("fire");
    expect(elementOf("bat")).toBe("shadow");
    const temperate = Object.keys(KINDS_TABLE).find(k => KINDS_TABLE[k].biome === "temperate" && !ATTACK_LOOK.bySpecies[k])!;
    expect(elementOf(temperate)).toBe(ATTACK_LOOK.byBiome.temperate);
    expect(elementOf("no-such-species")).toBe(ATTACK_LOOK.default);
  });
  it("draws a legend's spells bigger than an adult's, an adult's than a young's", () => {
    expect(spellPower(3)).toBeGreaterThan(spellPower(2));
    expect(spellPower(2)).toBeGreaterThan(spellPower(1));
  });
  it("names an element for every species that shoots", () => {
    for (const sp of IDS) for (const lv of [1, 2, 3] as const) {
      const a = attackOf(sp, lv)?.attack;
      if (a && a.delivery !== "melee") expect(ATTACK_LOOK.elements[elementOf(sp)], `${sp} ${lv}`).toBeDefined();
    }
  });
  it("catches a broken config", () => {
    const broken = structuredClone(ATTACK_LOOK);
    broken.elements.fire.core = "teapot" as never; broken.bySpecies.nobody = "fire"; broken.byBiome.temperate = "plasma";
    expect(spellsProblems(broken, IDS, biomes)).toEqual(expect.arrayContaining([
      "fire: no core called teapot", "bySpecies: no species called nobody", "byBiome temperate: no element plasma"]));
  });
});

describe("the attack look's atlas (art/attackLook.js)", async () => {
  const { attackLookAtlas, PARTS } = await import("../../art/attackLook.js");
  const A = attackLookAtlas(ATTACK_LOOK);
  const lit = (name: string) => { const [x, y, w, h] = A.cells[name]; let n = 0; for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (A.rgba[((y + j) * A.size + x + i) * 4 + 3] > 0) n++; return n; };
  it("fits, with the soft dot alone in its corner", () => {
    expect(A.cells.dot).toEqual([0, 0, 32, 32]);
    for (const [n, [x, y]] of Object.entries(A.cells)) if (n !== "dot") expect(x >= 36 || y >= 34, n).toBe(true);
  });
  it("draws every element's every part, in colour and in grey, none empty", () => {
    for (const e of ELEMENTS) for (const v of ["c", "g"]) {
      const names = [...Array.from({ length: PARTS.cores }, (_, f) => [`core.a.${f}`, `core.l.${f}`]).flat(), "mark",
        ...Array.from({ length: PARTS.bits * PARTS.bitFrames }, (_, k) => `bit.${Math.floor(k / PARTS.bitFrames)}.${k % PARTS.bitFrames}`),
        ...Array.from({ length: PARTS.beams * PARTS.beamFrames }, (_, k) => `beam.${Math.floor(k / PARTS.beamFrames)}.${k % PARTS.beamFrames}`),
        ...Array.from({ length: PARTS.areas }, (_, k) => `area.${k}`)];
      for (const n of names) expect(lit(`${e}.${v}.${n}`), `${e}.${v}.${n}`).toBeGreaterThan(2);
      expect(lit(`${e}.${v}.core.l.0`), `${e}: a legend's core bigger`).toBeGreaterThan(lit(`${e}.${v}.core.a.0`));
    }
  });
  it("draws the danger frame's pieces and the four motifs", () => {
    for (const n of ["warn", "pip", "pipOff", "tick", "chev", "hatch", "bracket0", "bracket3", "flash0", "flash2", "chain0", "star0", "shock0", "spiral0", "px"]) expect(lit(n), n).toBeGreaterThan(2);
  });
});
