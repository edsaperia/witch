// The glossary's index (tools/docs/glossary.mjs): docs/notes/INDEX.md is as the notes make it, each entry named once across the
// notes, and every note in its list of notes with a summary (the list stood in CLAUDE.md until 2026-11-12).
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
// @ts-expect-error (a plain .mjs tool, no types)
import { entriesOf, indexText, INDEX, notes, summaryOf, titleOf } from "./glossary.mjs";

describe("the glossary's index", () => {
  it("reads a note's entries: the bold names opening its lines, each once, in order", () => {
    const text = "# Area\n\nIntro, **not this** one.\n\n**Lead**: a paragraph.\n- **First** (Ed): x\n  - **nested**: no\n- **Second**: y\n**First**: again\n";
    expect(titleOf(text)).toBe("Area");
    expect(titleOf(text.replace(/\n/g, "\r\n"))).toBe("Area");
    expect(entriesOf(text)).toEqual(["Lead", "First", "Second"]);
    expect(summaryOf("# Area\n\n<!-- summary: What it covers. -->\n\nText.")).toBe("What it covers.");
    expect(summaryOf(text)).toBe("");
  });

  it("is up to date with the notes (node tools/docs/glossary.mjs --write)", () => {
    expect(fs.readFileSync(INDEX, "utf8").replace(/\r\n/g, "\n")).toBe(indexText());
  });

  it("names each entry in one note only", () => {
    const seen = new Map<string, string>(), twice: string[] = [];
    for (const n of notes() as { file: string; entries: string[] }[]) for (const e of n.entries) {
      if (seen.has(e)) twice.push(`${e} (${seen.get(e)}, ${n.file})`);
      seen.set(e, n.file);
    }
    expect(twice).toEqual([]);
  });

  it("lists every note in INDEX.md's list of notes, each with its summary", () => {
    const index = fs.readFileSync(INDEX, "utf8").replace(/\r\n/g, "\n");
    const list = index.slice(index.indexOf("## The notes"), index.indexOf("## The glossary"));
    const missing = (notes() as { file: string; title: string; summary: string }[])
      .filter(n => !n.summary || !list.includes(`- [${n.title || n.file}](${n.file}): ${n.summary}\n`)).map(n => n.file);
    expect(missing).toEqual([]);
  });

  it("is what CLAUDE.md points to, not a list of its own", () => {
    const claude = fs.readFileSync(path.resolve(INDEX, "../../../CLAUDE.md"), "utf8");
    expect(claude).toContain("(docs/notes/INDEX.md)");
    expect(claude).not.toMatch(/^- \[`docs\/notes\/[^`]+\.md`\]/m);
  });
});
