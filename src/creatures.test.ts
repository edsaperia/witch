import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

// The creatures' data (art/creatures/<id>/genome.js, assembled by art/creatures/index.js; tools/creatures.mjs): the index
// current, no record left in art/genome/species.js's array (an old-style merge), every folder's record its own id, and no
// genome problems (art/genome/index.js genomeProblems).
describe("the creatures' folders (art/creatures/)", () => {
  it("assemble cleanly: the index current, every record in its folder, no genome problems", () => {
    const out = execFileSync("node", ["tools/creatures.mjs", "check"], { encoding: "utf8" });
    expect(out).toMatch(/^ok: \d+ species/);
  });
});
