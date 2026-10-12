// The samples' licences, files and size budget (tools/samples/check.mjs; Ed, 2026-10-11: "a CI check that every sample has
// an approved licence"): every audio file under samples/ in its manifest with an approved licence, the credits up to date.
import { describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { checkSamples, APPROVED } from "../tools/samples/check.mjs";
import { creditsText } from "../tools/samples/credits.mjs";

describe("samples", () => {
  it("are all listed, under approved licences (never NC), credited and within the size budget", () => {
    expect(checkSamples(resolve(__dirname, ".."))).toEqual([]);
    expect(APPROVED.some((l: string) => /NC/.test(l))).toBe(false);
  });

  it("catches a non-commercial licence, an unlisted file and a missing one", () => {
    const root = mkdtempSync(join(tmpdir(), "samples-")), dir = join(root, "samples");
    mkdirSync(join(dir, "x"), { recursive: true });
    writeFileSync(join(dir, "x/a.ogg"), "a"); writeFileSync(join(dir, "x/stray.ogg"), "b");
    const m = { files: [
      { file: "x/a.ogg", what: "a", source: "s", author: "someone", licence: "CC-BY-NC-4.0", credit: "c" },
      { file: "x/gone.ogg", what: "g", source: "s", author: "someone", licence: "CC0-1.0", credit: "c" },
    ] };
    writeFileSync(join(dir, "manifest.json"), JSON.stringify(m)); writeFileSync(join(dir, "CREDITS.md"), creditsText(m));
    const errs = checkSamples(root).join("\n");
    expect(errs).toMatch(/x\/a\.ogg: a non-commercial licence/);
    expect(errs).toMatch(/x\/stray\.ogg: not in samples\/manifest\.json/);
    expect(errs).toMatch(/x\/gone\.ogg: in the manifest, but no file/);
  });
});
