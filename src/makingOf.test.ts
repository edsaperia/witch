import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

// The Making Of site (making-of/, built by tools/making-of/build.mjs into dist/making-of/): its builders' notes well formed,
// every picture and link there, every picture listed with a caption, and no model's name anywhere in it.
describe("the Making Of site", () => {
  it("builds and passes its own checks", () => {
    const out = execFileSync("node", ["tools/making-of/build.mjs", "--check"], { encoding: "utf8" });
    expect(out).toMatch(/checked/);
  });
});
