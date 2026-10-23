import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { ART_EXTRA, artHash, filesUnder } from "../tools/artHash";

// The art's hash (tools/artHash.ts, vite.config.ts's __ART_HASH__): it read art/'s top level only, so an edit under
// art/genome, art/flora, art/props or art/recipes kept the old hash and players their stale drawn art (2026-10-23).
describe("the art's hash (tools/artHash.ts)", () => {
  const root = mkdtempSync(join(tmpdir(), "art-hash-"));
  const put = (f: string, s: string) => { mkdirSync(dirname(join(root, f)), { recursive: true }); writeFileSync(join(root, f), s); };
  for (const f of ART_EXTRA) put(f, "extra");
  put("art/areas.js", "top");
  put("art/genome/species.js", "deep");
  put("art/recipes/fen/kind.json", "{}");
  put("art/out/manifest.json", "{}");
  put("art/check.mjs", "a tool");
  afterAll(() => rmSync(root, { recursive: true, force: true }));

  it("changes with an edit to a nested art file, all the way down", () => {
    const before = artHash(root);
    expect(artHash(root)).toBe(before);
    put("art/genome/species.js", "deeper");
    const deep = artHash(root);
    expect(deep).not.toBe(before);
    put("art/recipes/fen/kind.json", '{ "x": 1 }');
    expect(artHash(root)).not.toBe(deep);
  });
  it("changes with the top level's and the extras' edits, not with art/out's exports or the tools", () => {
    let h = artHash(root);
    put("art/areas.js", "top 2"); expect(artHash(root)).not.toBe(h); h = artHash(root);
    put(ART_EXTRA[0], "extra 2"); expect(artHash(root)).not.toBe(h); h = artHash(root);
    put("art/out/manifest.json", '{ "y": 2 }'); put("art/check.mjs", "another tool");
    expect(artHash(root)).toBe(h);
  });
  it("reads the real art/'s subfolders", () => {
    const files = filesUnder(".", "art");
    for (const d of ["art/genome/", "art/flora/", "art/props/", "art/areas/", "art/creatures/", "art/sigils/"]) expect(files.some(f => f.startsWith(d)), d).toBe(true);
    expect(files.some(f => f.startsWith("art/out/") || f.startsWith("art/overrides/"))).toBe(false);
    expect([...files].sort()).toEqual(files);
  });
});
