// The samples' licences, files and size budget (tools/samples/check.mjs; Ed, 2026-10-11: "a CI check that every sample has
// an approved licence"): every audio file under samples/ in its manifest with an approved licence, the credits up to date.
import { describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { checkSamples, APPROVED, OWN_WORK } from "../tools/samples/check.mjs";
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

  it("takes our own renders (Chimera, Ed 2026-11-08) only with the render, the pinned tool and its credit recorded", () => {
    const root = mkdtempSync(join(tmpdir(), "samples-")), dir = join(root, "samples");
    mkdirSync(join(dir, "x"), { recursive: true });
    const commit = "09fb7769ec13d3a5ff19345c145b4af23d762b82", source = `${OWN_WORK.url}/tree/${commit}`;
    const generated = { tool: "Chimera", toolAuthor: "jamesondh", toolLicence: "MIT", url: OWN_WORK.url, commit };
    const credit = "a note: our own render with Chimera by jamesondh (MIT)";
    const files = [
      { file: "x/ok.ogg", what: "ok", source, author: "Witch", licence: OWN_WORK.licence, credit, generated },
      { file: "x/bare.ogg", what: "no render recorded", source, author: "Witch", licence: OWN_WORK.licence, credit },
      { file: "x/unpinned.ogg", what: "no commit", source: OWN_WORK.url, author: "Witch", licence: OWN_WORK.licence, credit, generated: { ...generated, commit: "main" } },
      { file: "x/uncredited.ogg", what: "no credit", source, author: "Witch", licence: OWN_WORK.licence, credit: "ours", generated },
      { file: "x/other.ogg", what: "another tool", source, author: "Witch", licence: OWN_WORK.licence, credit, generated: { ...generated, tool: "Other" } },
      { file: "x/mislabelled.ogg", what: "generated, CC0", source, author: "Witch", licence: "CC0-1.0", credit, generated },
      { file: "x/own.ogg", what: "own work, another wording", source, author: "Witch", licence: "own work", credit },
    ];
    for (const f of files) writeFileSync(join(dir, f.file), "a");
    const m = { files };
    writeFileSync(join(dir, "manifest.json"), JSON.stringify(m)); writeFileSync(join(dir, "CREDITS.md"), creditsText(m));
    const errs = checkSamples(root);
    expect(errs.filter(e => e.includes("x/ok.ogg"))).toEqual([]);
    for (const f of ["bare", "unpinned", "uncredited", "other", "mislabelled", "own"]) expect(errs.some(e => e.startsWith(`samples/x/${f}.ogg:`)), f).toBe(true);
  });
});
