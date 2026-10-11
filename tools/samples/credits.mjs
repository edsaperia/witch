// The samples' credits, from samples/manifest.json (node tools/samples/credits.mjs; tools/samples/build.mjs runs it):
// samples/CREDITS.md, grouped by source, every file's credit line. CC0 asks for none, but we give them anyway; CC-BY needs them.
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** The credits' text for a manifest. */
export function creditsText(manifest) {
  const by = new Map();
  for (const f of manifest.files) { const k = `${f.author} (${f.licence})`; (by.get(k) ?? by.set(k, []).get(k)).push(f); }
  const lines = ["# Sample credits", "", "Written by tools/samples/credits.mjs from samples/manifest.json: never edit by hand.", ""];
  for (const [k, fs] of by) {
    lines.push(`## ${k}`, "");
    for (const f of fs) lines.push(`- \`${f.file}\`: ${f.what}. Source: ${f.source}`);
    lines.push("");
  }
  return lines.join("\n");
}

export function writeCredits(root) {
  const m = JSON.parse(readFileSync(join(root, "samples/manifest.json"), "utf8"));
  writeFileSync(join(root, "samples/CREDITS.md"), creditsText(m));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) writeCredits(resolve(dirname(fileURLToPath(import.meta.url)), "../.."));
