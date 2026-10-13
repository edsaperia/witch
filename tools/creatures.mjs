// The creatures' data, one folder a species (art/creatures/<id>/), and the index that assembles them (Ed, 2026-10-13: every
// animal, legend batch and growth tweak edited art/genome/species.js, and merges mangled neighbouring records; the data
// stays in git, in small files).
//   node tools/creatures.mjs list            every species: id, name, template, builder, levels, its folder's files
//   node tools/creatures.mjs index           writes art/creatures/index.js (the species sorted by id) from the folders
//   node tools/creatures.mjs check           fails if the index is stale, a folder's record has another id, or a genome has problems
//   node tools/creatures.mjs adopt           moves any record still written in the old registries (art/genome/species.js's
//                                            GENOMES, art/sigils.js's SIGILS and SIGIL_NEON, art/legends.js's LEGEND_POSES,
//                                            art/naps.js's NAP_POSES: a merge bringing an old-style one back) into its folder,
//                                            and writes the index
// A new creature: make art/creatures/<id>/genome.js (`export const GENOME_<ID> = { id, name, template, builder, ... }`: the
// record as species.js documents it, its name the id in capitals), its sigil.js (`SIGIL_<ID> = { neon, strokes }`, the strokes
// from art/sigils/strokes.js's building blocks), legend.js (`LEGEND_<ID>`, the sleeping form as legends.js documents it) and,
// if it isn't the default lie, nap.js (`NAP_<ID>`), run `node tools/creatures.mjs index`, and commit the lot.
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

/** The per-creature files besides the genome: [file, export prefix, the registry it came from and assembles into]. */
const PARTS = [
  { file: "sigil.js", prefix: "SIGIL_", registry: "art/sigils.js", object: "SIGILS", assembled: "CREATURE_SIGILS", helpers: "art/sigils/strokes.js" },
  { file: "legend.js", prefix: "LEGEND_", registry: "art/legends.js", object: "LEGEND_POSES", assembled: "CREATURE_LEGENDS" },
  { file: "nap.js", prefix: "NAP_", registry: "art/naps.js", object: "NAP_POSES", assembled: "CREATURE_NAPS" },
];
const partName = (part, id) => part.prefix + id.toUpperCase().replace(/[^A-Z0-9]/g, "_");
const has = (id, file) => existsSync(join(DIR, id, file));

/** The top-level entries of the object literal `export const <name> = {` in a module's text: [{ key, text (the value's source),
 *  before (comment lines of its own above it), after (a comment on its line after it) }], and the text's start and end
 *  (the braces' insides). A small scanner: strings, comments and nesting respected. */
function entriesOf(text, name) {
  const open = text.indexOf(`export const ${name} = {`);
  if (open < 0) throw new Error(`no "export const ${name} = {"`);
  let i = text.indexOf("{", open) + 1, depth = 1, start = i;
  const entries = [];
  let pendingComments = [], key = null, valueStart = 0;
  const skipString = q => { i++; while (i < text.length && text[i] !== q) { if (text[i] === "\\") i++; i++; } i++; };
  while (i < text.length && depth > 0) {
    const ch = text[i], two = text.slice(i, i + 2);
    if (ch === '"' || ch === "'" || ch === "`") { skipString(ch); continue; }
    if (two === "//") { const end = text.indexOf("\n", i), line = text.slice(i, end < 0 ? text.length : end); if (depth === 1 && key === null) { const lineStart = text.lastIndexOf("\n", i) + 1; if (!text.slice(lineStart, i).trim()) pendingComments.push(line); else if (entries.length) entries[entries.length - 1].after = line; } else if (depth === 1 && key !== null) { /* inside a value's line: kept in the value text */ } i = end < 0 ? text.length : end; continue; }
    if (two === "/*") { i = text.indexOf("*/", i) + 2; continue; }
    if (ch === "{" || ch === "[" || ch === "(") depth++;
    else if (ch === "}" || ch === "]" || ch === ")") { depth--; if (depth === 0) break; }
    else if (depth === 1 && key === null && /[A-Za-z_$"']/.test(ch)) {
      const m = /^("[^"]+"|'[^']+'|[A-Za-z_$][\w$]*)\s*:/.exec(text.slice(i));
      if (m) { key = m[1].replace(/^["']|["']$/g, ""); i += m[0].length; while (text[i] === " ") i++; valueStart = i; continue; }
    } else if (depth === 1 && key !== null && ch === ",") {
      entries.push({ key, text: text.slice(valueStart, i).trim(), before: pendingComments, after: "" }); pendingComments = []; key = null;
    }
    i++;
  }
  if (key !== null) { entries.push({ key, text: text.slice(valueStart, i).trim(), before: pendingComments, after: "" }); pendingComments = []; }
  return { entries, start, end: i, trailing: pendingComments };
}
const HELPER_NAMES = ["L", "A", "D", "C", "E", "at", "stave", "FOOT", "mirror", "pair", "bow", "wave", "spiral", "rays"];
const helpersUsed = text => { const t = text.replace(/\.\.\./g, " "); return HELPER_NAMES.filter(h => new RegExp(`(^|[^\\w$.])${h}(?=[^\\w$]|$)`).test(t)); }; // (a spread's dots are not a property access)

/** A per-creature part file's text. */
function partText(part, id, e) {
  const name = partName(part, id), lines = [];
  if (part.helpers) { const used = helpersUsed(e.text); if (used.length) lines.push(`import { ${used.join(", ")} } from "../../sigils/strokes.js";`); }
  if (/(^|[^\w$.])M\./.test(e.text)) lines.push(`import { M } from "../../core.js";`); // (a material, art/core.js: a legend's lid, a nap's...)
  lines.push(...e.before);
  const value = part.object === "SIGILS" ? `{ neon: ${JSON.stringify(e.neon ?? "cyan")}, strokes: ${e.text} }` : e.text;
  lines.push(`export const ${name} = ${value};${e.after ? " " + e.after : ""}`);
  return lines.join("\n") + "\n";
}

/** The index's text for these ids. */
const indexText = list => `// The species, assembled from art/creatures/<id>/genome.js, sorted by id. Written by \`node tools/creatures.mjs index\`:
// never edit by hand (add a folder and run the tool; CI's src/creatures.test.ts fails if this is stale).
${list.map(id => `import { ${ident(id)} } from "./${id}/genome.js";`).join("\n")}
${PARTS.flatMap(part => list.filter(id => has(id, part.file)).map(id => `import { ${partName(part, id)} } from "./${id}/${part.file}";`)).join("\n")}
export const CREATURE_GENOMES = [${list.map(ident).join(", ")}];
${PARTS.map(part => `export const ${part.assembled} = { ${list.filter(id => has(id, part.file)).map(id => `${id}: ${partName(part, id)}${part.object === "SIGILS" ? ".strokes" : ""}`).join(", ")} };`).join("\n")}
export const CREATURE_NEONS = { ${list.filter(id => has(id, "sigil.js")).map(id => `${id}: ${partName(PARTS[0], id)}.neon`).join(", ")} };
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
  let moved = records.length;
  const known = new Set(ids());
  for (const part of PARTS) {
    const file = join(ROOT, part.registry); let text = readFileSync(file, "utf8");
    const { entries, start, end } = entriesOf(text, part.object);
    let neons = null;
    if (part.object === "SIGILS") { const n = entriesOf(text, "SIGIL_NEON"); neons = n; for (const e of entries) { const ne = n.entries.find(x => x.key === e.key); if (ne) e.neon = JSON.parse(ne.text.replace(/'/g, '"')); } }
    const mine = entries.filter(e => known.has(e.key));
    for (const e of mine) {
      const out = join(DIR, e.key, part.file);
      if (existsSync(out)) throw new Error(`${e.key}: art/creatures/${e.key}/${part.file} exists already and ${part.registry} still has its entry: merge them by hand`);
      writeFileSync(out, partText(part, e.key, e)); console.log(`art/creatures/${e.key}/${part.file}`); moved++;
    }
    if (mine.length) {
      // the registry keeps what isn't a creature's, spread after the assembled entries
      const keep = entries.filter(e => !known.has(e.key)), spreadName = part.assembled;
      const body = [`\n  ...${spreadName},`, ...keep.map(e => `\n${e.before.map(c => "  " + c + "\n").join("")}  ${e.key}: ${e.text},${e.after ? " " + e.after : ""}`)].join("") + "\n";
      text = text.slice(0, start) + body + text.slice(end);
      if (neons) { const n = entriesOf(text, "SIGIL_NEON"), keepN = n.entries.filter(e => !known.has(e.key)); text = text.slice(0, n.start) + ` ...CREATURE_NEONS${keepN.map(e => `, ${e.key}: ${e.text}`).join("")} ` + text.slice(n.end); }
      writeFileSync(file, text);
    }
  }
  writeFileSync(INDEX, indexText(ids()));
  console.log(`${moved} record(s) moved; index written (${ids().length} species)`);
} else if (cmd === "check") {
  const problems = [];
  const text = readFileSync(SPECIES, "utf8"), { records } = recordsIn(text);
  for (const r of records) problems.push(`art/genome/species.js still holds a record for ${r.id}: run node tools/creatures.mjs adopt`);
  const list = ids();
  if (!existsSync(INDEX) || readFileSync(INDEX, "utf8") !== indexText(list)) problems.push("art/creatures/index.js is stale: run node tools/creatures.mjs index");
  const { genomeProblems } = await import(pathToFileURL(join(ROOT, "art/genome/index.js")).href);
  const known = new Set(list);
  for (const part of PARTS) { try { const { entries } = entriesOf(readFileSync(join(ROOT, part.registry), "utf8"), part.object); for (const e of entries) if (known.has(e.key)) problems.push(`${part.registry} still holds ${part.object}.${e.key}: run node tools/creatures.mjs adopt`); } catch (err) { problems.push(`${part.registry}: ${err.message}`); } }
  for (const id of list) for (const part of PARTS) if (has(id, part.file)) {
    const m = await import(pathToFileURL(join(DIR, id, part.file)).href), v = m[partName(part, id)];
    if (!v) problems.push(`art/creatures/${id}/${part.file}: no export named ${partName(part, id)}`);
    else if (part.object === "SIGILS" && (!Array.isArray(v.strokes) || typeof v.neon !== "string")) problems.push(`art/creatures/${id}/sigil.js: ${partName(part, id)} needs { neon, strokes }`);
  }
  for (const id of list) {
    const g = (await import(pathToFileURL(join(DIR, id, "genome.js")).href))[ident(id)];
    if (!g) problems.push(`art/creatures/${id}/genome.js: no export named ${ident(id)}`);
    else if (g.id !== id) problems.push(`art/creatures/${id}/genome.js: its record's id is ${JSON.stringify(g.id)}, its folder ${id}`);
    else for (const p of genomeProblems(g)) problems.push(`${id}: ${p}`);
  }
  if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
  console.log(`ok: ${list.length} species, the index current, no genome problems, ${PARTS.map(p => `${list.filter(id => has(id, p.file)).length} ${p.file.replace(".js", "s")}`).join(", ")}`);
} else { console.error("usage: node tools/creatures.mjs list | index | check | adopt"); process.exit(2); }
