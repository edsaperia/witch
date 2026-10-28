// The glossary's index (tools/docs/glossary.mjs): docs/notes/INDEX.md is as the notes make it, each entry named once across the
// notes, and every note listed in CLAUDE.md's notes.
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
// @ts-expect-error (a plain .mjs tool, no types)
import { entriesOf, indexText, INDEX, notes, titleOf } from "./glossary.mjs";

describe("the glossary's index", () => {
  it("reads a note's entries: the bold names opening its lines, each once, in order", () => {
    const text = "# Area\n\nIntro, **not this** one.\n\n**Lead**: a paragraph.\n- **First** (Ed): x\n  - **nested**: no\n- **Second**: y\n**First**: again\n";
    expect(titleOf(text)).toBe("Area");
    expect(entriesOf(text)).toEqual(["Lead", "First", "Second"]);
  });

  it("is up to date with the notes (node tools/docs/glossary.mjs --write)", () => {
    expect(fs.readFileSync(INDEX, "utf8")).toBe(indexText());
  });

  it("names each entry in one note only", () => {
    const seen = new Map<string, string>(), twice: string[] = [];
    for (const n of notes() as { file: string; entries: string[] }[]) for (const e of n.entries) {
      if (seen.has(e)) twice.push(`${e} (${seen.get(e)}, ${n.file})`);
      seen.set(e, n.file);
    }
    expect(twice).toEqual([]);
  });

  it("has every note in CLAUDE.md's list of notes", () => {
    const claude = fs.readFileSync(path.resolve(INDEX, "../../../CLAUDE.md"), "utf8");
    const missing = (notes() as { file: string }[]).map(n => `docs/notes/${n.file}`).filter(f => !claude.includes(`[\`${f}\`](${f})`));
    expect(missing).toEqual([]);
  });
});
