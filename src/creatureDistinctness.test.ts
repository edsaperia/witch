import { describe, expect, it } from "vitest";
import { Sprite, M } from "../art/core.js";
import { appearanceSignature, combinedDistinctness } from "../art/genome/distinctness.js";
import { readFileSync } from "node:fs";

const coat = { [M.BODY]: [160, 100, 60], [M.BODY3]: [30, 20, 15] };
function signature(size = 24, colours = coat, pattern = "plain") {
  const sp = new Sprite(size, size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const dark = pattern === "horizontal" ? y < size / 2 : pattern === "vertical" ? x < size / 2 : false;
    sp.px(x, y, dark ? M.BODY3 : M.BODY);
  }
  return appearanceSignature(sp, colours);
}

describe("combined creature distinctness warnings", () => {
  it("warns on matching shape, palette, size and pattern", () => {
    expect(combinedDistinctness(signature(), signature()).warn).toBe(true);
  });
  it("allows the same silhouette when coat colour differs", () => {
    const white = { ...coat, [M.BODY]: [235, 235, 230] };
    const d = combinedDistinctness(signature(), signature(24, white));
    expect(d.silhouette).toBe(0);
    expect(d.warn).toBe(false);
  });
  it("allows the same silhouette at different actual sizes", () => {
    const d = combinedDistinctness(signature(), signature(48));
    expect(d.silhouette).toBe(0);
    expect(d.warn).toBe(false);
  });
  it("allows different markings with the same palette and size", () => {
    const d = combinedDistinctness(signature(24, coat, "horizontal"), signature(24, coat, "vertical"));
    expect(d.palette).toBe(0);
    expect(d.size).toBe(0);
    expect(d.silhouette).toBe(0);
    expect(d.warn).toBe(false);
  });
  it("allows different shapes even when all the other measures are close", () => {
    const a = signature(), b = signature();
    b.shape.fill(0);
    expect(combinedDistinctness(a, b).warn).toBe(false);
  });
  it("does not produce a look-alike warning from missing palette data", () => {
    expect(combinedDistinctness(signature(24, {}), signature(24, {})).warn).toBe(false);
  });
  it("makes the art-check look-alike result warning-only and keeps growth separate", () => {
    const source = readFileSync("art/check.mjs", "utf8");
    const task = source.slice(source.indexOf('task("silhouettes"'), source.indexOf('task("growth"'));
    expect(task).toContain("combinedDistinctness");
    expect(task).toContain("good: true, warn:");
    expect(task).not.toContain("good: !close.length");
    expect(source).toContain("combinedDistinctness(A.appearance, B.appearance)");
    expect(source).not.toContain("LINT_LOOKALIKE");
    expect(source).toContain("const LEVEL_STEP = .2");
  });
});
