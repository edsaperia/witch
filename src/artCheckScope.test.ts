// What the art check runs for a change in CI (tools/art-check/scope.mjs, .github/workflows/art-check.yml): a builder's own
// creature and area folders get their own checks, anything shared the full run, nothing of the art nothing.
import { describe, expect, it } from "vitest";
import { scope } from "../tools/art-check/scope.mjs";

describe("the art check's scope for a change", () => {
  it("runs only the touched creatures' and areas' checks, without the lab pages", () => {
    expect(scope(["art/creatures/fox/genome.js", "art/creatures/fox/sigil.js", "art/areas/fen/recipe.js", "art/areas/index.js", "src/rules/map.ts", "docs/x.md"]))
      .toEqual({ mode: "only", only: ["fen", "fox"], flags: "--only fen,fox --no-lab" });
  });
  it("runs the full check when shared art code, the lab, the style or the check itself changed", () => {
    for (const p of ["art/creatures3d.js", "art/flora/species/oak.js", "art/flora/baseline/oak.json", "art/check.mjs", "tools/art-lab/build.mjs", "config/style.json", ".github/workflows/art-check.yml", "tools/art-check/scope.mjs"])
      expect(scope(["art/creatures/fox/genome.js", p]).mode, p).toBe("full");
    expect(scope(["art/genome/species.js"]).flags).toBe("");
  });
  it("skips when nothing of the art changed", () => {
    expect(scope(["src/rules/map.ts", "config/tuning.json", "README.md"])).toEqual({ mode: "skip", only: [], flags: "skip" });
    expect(scope([]).mode).toBe("skip");
  });
});
