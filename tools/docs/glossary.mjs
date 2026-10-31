// The glossary's index (the coordinator's docs pass, Ed 2026-10-28: "Reformat prose into data where you can"): each note under
// docs/notes/ holds its area's entries as bold names opening a line (`**Name**` or `- **Name**`), and docs/notes/INDEX.md lists them,
// made from the notes, never by hand. One entry a line, so two pull requests adding entries to different notes don't touch the
// same lines (the index stood in CLAUDE.md until 2026-10-28 and fell 46 entries behind the notes).
//   node tools/docs/glossary.mjs           checks docs/notes/INDEX.md is as the notes make it (exit 1 if not)
//   node tools/docs/glossary.mjs --write   writes it
// tools/docs/glossary.test.ts runs the check with the tests, and that every note is in CLAUDE.md's list of notes.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const NOTES = path.join(ROOT, "docs/notes"), INDEX = path.join(NOTES, "INDEX.md");

/** A note's entries: the bold names that open its lines, in order, each once. */
export function entriesOf(text) {
  const out = [];
  for (const m of text.matchAll(/^(?:- )?\*\*(.+?)\*\*/gm)) if (!out.includes(m[1])) out.push(m[1]);
  return out;
}

/** A note's title: its first `# ` heading. */
export const titleOf = text => /^# (.+)$/m.exec(text.replace(/\r\n/g, "\n"))?.[1].trim() ?? "";

/** The notes (docs/notes/*.md but the index), by file name. */
export function notes(dir = NOTES) {
  return fs.readdirSync(dir).filter(f => f.endsWith(".md") && f !== "INDEX.md").sort()
    .map(f => { const text = fs.readFileSync(path.join(dir, f), "utf8"); return { file: f, title: titleOf(text), entries: entriesOf(text) }; });
}

/** INDEX.md as the notes make it. */
export function indexText(list = notes()) {
  const lines = ["# The glossary's index", "",
    "Made from the notes by `node tools/docs/glossary.mjs --write` (never edit it by hand): each note's entries, the bold names that",
    "open its lines. Add an entry to its note, then run that; `tools/docs/glossary.test.ts` fails while this is out of date. CLAUDE.md",
    "says what each note covers.", ""];
  for (const n of list) {
    lines.push(`## [${n.title || n.file}](${n.file})`, "");
    if (n.entries.length) for (const e of n.entries) lines.push(`- ${e}`);
    else lines.push("(no entries: its tools and checks only)");
    lines.push("");
  }
  return lines.join("\n");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const want = indexText(), have = fs.existsSync(INDEX) ? fs.readFileSync(INDEX, "utf8").replace(/\r\n/g, "\n") : "";
  if (process.argv.includes("--write")) { if (want !== have) fs.writeFileSync(INDEX, want); console.log(`${path.relative(ROOT, INDEX)}: ${want === have ? "already up to date" : "written"}`); }
  else if (want !== have) { console.error(`${path.relative(ROOT, INDEX)} is out of date with the notes: node tools/docs/glossary.mjs --write`); process.exit(1); }
  else console.log(`${path.relative(ROOT, INDEX)}: up to date`);
}
