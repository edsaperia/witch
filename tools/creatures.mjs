// The creatures' data, one folder a species (art/creatures/<id>/), and the index that assembles them (Ed, 2026-10-13: every
// animal, legend batch and growth tweak edited art/genome/species.js, and merges mangled neighbouring records; the data
// stays in git, in small files).
//   node tools/creatures.mjs list            every species: id, name, template, builder, levels, its folder's files
//   node tools/creatures.mjs index           writes art/creatures/index.js (the species sorted by id) from the folders
//   node tools/creatures.mjs check           fails if the index is stale, a folder's record has another id, or a genome has problems
//   node tools/creatures.mjs adopt           moves any record still written in art/genome/species.js's GENOMES array (a merge
//                                            bringing an old-style one back) into its folder, and writes the index
// A new creature: make art/creatures/<id>/genome.js (`export const GENOME_<ID> = { id, name, template, builder, ... }`: the
// record as species.js documents it, its name the id in capitals), run `node tools/creatures.mjs index`, and commit both.
// CI runs `check` (src/creatures.test.ts). Named exports, not default ones: the Art Lab's build (tools/art-lab/build.mjs)
// inlines every module into one page and only knows `import { ... } from`.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), ".."), DIR = join(ROOT, "art/creatures"), SPECIES = join(ROOT, "art/genome/species.js"), INDEX = join(DIR, "index.js");
const cmd = process.argv[2] ?? "list";

/** The folders' ids, sorted. */
const ids = () => (existsSync(DIR) ? readdirSync(DIR, { withFileTypes: true }).filter(d => d.isDirectory() && existsSync(join(DIR, d.name, "genome.js"))).map(d => d.name).sort() : []);
/** The record's export name: GENOME_<ID> ("red-panda" -> GENOME_RED_PANDA). */
const ident = id => "GENOME_" + id.toUpperCase().replace(/[^A-Z0-9]/g, "_");

/** The index's text for these ids. */
const indexText = list => `// The species, assembled from art/creatures/<id>/genome.js, sorted by id. Written by \`node tools/creatures.mjs index\`:
// never edit by hand (add a folder and run the tool; CI's src/creatures.test.ts fails if this is stale).
${list.map(id => `import { ${ident(id)} } from "./${id}/genome.js";`).join("\n")}
export const CREATURE_GENOMES = [${list.map(ident).join(", ")}];
`;

/** Records still written in species.js's GENOMES array: [{ id, text }] with the text as a module would export it, and the
 *  file's text with the array emptied. */
function recordsIn(text) {
  const open = text.indexOf("export const GENOMES = ["), close = text.indexOf("\n];", open);
  if (open < 0 || close < 0) return { records: [], rest: text };
  const body = text.slice(text.indexOf("\n", open) + 1, close + 1), lines = body.split("\n"), records = [];
  let cur = null, pending = [];
  const flush = () => { if (cur) { records.push(cur); cur = null; } };
  for (const line of lines) {
    if (/^  \{ id: "/.test(line)) { flush(); cur = { lines: [...pending, line] }; pending = []; }
    else if (/^  \/\//.test(line) && !cur?.open) { pending.push(line); } // (a comment at the record's own indent before the next record)
    else if (cur) cur.lines.push(line);
    else pending.push(line);
    if (cur) { const depth = cur.lines.filter(l => !/^\s*\/\//.test(l)).join("\n"); const opens = (depth.match(/[{[]/g) || []).length, closes = (depth.match(/[}\]]/g) || []).length; cur.open = opens > closes; if (!cur.open) { flush(); } }
  }
  flush();
  for (const r of records) {
    while (r.lines.length && !r.lines[r.lines.length - 1].trim()) r.lines.pop();
    const id = /^  \{ id: "([^"]+)"/.exec(r.lines.find(l => /^  \{ id: "/.test(l)))[1];
    const out = r.lines.map(l => l.replace(/^  /, "")); // (the record's own indent off: it stands at the module's top level)
    const last = out.length - 1, m = /^(.*?)(\s*\/\/.*)?$/.exec(out[last]); // (the record's trailing comma off, before any comment after it)
    out[last] = m[1].replace(/,\s*$/, "") + ";" + (m[2] ?? "");
    const at = out.findIndex(l => /^\{ id: "/.test(l)); out[at] = `export const ${ident(id)} = ` + out[at];
    r.id = id; r.text = out.join("\n") + "\n";
  }
  const rest = text.slice(0, text.indexOf("\n", open) + 1) + text.slice(close + 1);
  return { records, rest };
}

if (cmd === "list") {
  const all = await Promise.all(ids().map(async id => ({ id, g: (await import(pathToFileURL(join(DIR, id, "genome.js")).href))[ident(id)], files: readdirSync(join(DIR, id)).join(" ") })));
  for (const { id, g, files } of all) console.log(`${id.padEnd(12)} ${String(g.name).padEnd(16)} ${String(g.template).padEnd(10)} ${String(g.builder).padEnd(12)} levels ${g.levels ? g.levels.filter(Boolean).length : 0}  ${files}`);
  console.log(`${all.length} species`);
} else if (cmd === "index") {
  writeFileSync(INDEX, indexText(ids()));
  console.log(`wrote ${INDEX.slice(ROOT.length + 1)} (${ids().length} species)`);
} else if (cmd === "adopt") {
  const text = readFileSync(SPECIES, "utf8"), { records, rest } = recordsIn(text);
  for (const r of records) {
    const dir = join(DIR, r.id);
    if (existsSync(join(dir, "genome.js"))) throw new Error(`${r.id}: art/creatures/${r.id}/genome.js exists already and species.js still has a record: merge them by hand`);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "genome.js"), r.text);
    console.log(`art/creatures/${r.id}/genome.js`);
  }
  if (records.length) writeFileSync(SPECIES, rest);
  writeFileSync(INDEX, indexText(ids()));
  console.log(`${records.length} record(s) moved; index written (${ids().length} species)`);
} else if (cmd === "check") {
  const problems = [];
  const text = readFileSync(SPECIES, "utf8"), { records } = recordsIn(text);
  for (const r of records) problems.push(`art/genome/species.js still holds a record for ${r.id}: run node tools/creatures.mjs adopt`);
  const list = ids();
  if (!existsSync(INDEX) || readFileSync(INDEX, "utf8") !== indexText(list)) problems.push("art/creatures/index.js is stale: run node tools/creatures.mjs index");
  const { genomeProblems } = await import(pathToFileURL(join(ROOT, "art/genome/index.js")).href);
  for (const id of list) {
    const g = (await import(pathToFileURL(join(DIR, id, "genome.js")).href))[ident(id)];
    if (!g) problems.push(`art/creatures/${id}/genome.js: no export named ${ident(id)}`);
    else if (g.id !== id) problems.push(`art/creatures/${id}/genome.js: its record's id is ${JSON.stringify(g.id)}, its folder ${id}`);
    else for (const p of genomeProblems(g)) problems.push(`${id}: ${p}`);
  }
  if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
  console.log(`ok: ${list.length} species, the index current, no genome problems`);
} else { console.error("usage: node tools/creatures.mjs list | index | check | adopt"); process.exit(2); }
