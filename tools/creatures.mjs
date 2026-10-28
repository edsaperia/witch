// The creatures' data, one folder a species (art/creatures/<id>/), and the index that assembles them (Ed, 2026-10-13: every
// animal, legend batch and growth tweak edited art/genome/species.js, and merges mangled neighbouring records; the data
// stays in git, in small files).
//   node tools/creatures.mjs list            every species: id, name, template, builder, levels, its folder's files
//   node tools/creatures.mjs index           writes art/creatures/index.js (the species sorted by id) from the folders
//   node tools/creatures.mjs check           fails if the index is stale, a folder's record has another id, or a genome has problems
//   node tools/creatures.mjs adopt           moves any record still written in the old registries (art/genome/species.js's
//                                            GENOMES, art/sigils.js's SIGILS and SIGIL_NEON, art/legends.js's LEGEND_POSES,
//                                            art/naps.js's NAP_POSES, and the config files' per-species entries: movement.json's
//                                            profiles, legends.bySpecies and bodies.radius, combat.json's bySpecies, strength,
//                                            ranged, kite, temperament and traits, creature-voices.json's,
//                                            character.json's species, and packs.json's kinds: a merge bringing an old-style one back) into its
//                                            folder, and writes the index
//   node tools/creatures.mjs show <id>       everything the game knows about one species, section by section
// A new creature: make art/creatures/<id>/genome.js (`export const GENOME_<ID> = { id, name, template, builder, ... }`: the
// record as species.js documents it, its name the id in capitals), its sigil.js (`SIGIL_<ID> = { neon, strokes }`, the strokes
// from art/sigils/strokes.js's building blocks), legend.js (`LEGEND_<ID>`, the sleeping form as legends.js documents it) and,
// if it isn't the default lie, nap.js (`NAP_<ID>`), and creature.js (`CREATURE_<ID>`: its movement profile, body radius,
// legend moves, attacks, strength, traits, temperament, voice, character and pack, the config files' sections: the schema is
// config/schema/creature.schema.json), run `node tools/creatures.mjs index`, and commit the lot. Not here: its island in
// its area's art/areas/<id>/kind.json (its line of the kinds table: it takes a placeholder's slot, and that placeholder's
// config/kinds/<id>.json goes; tools/data.mjs areas) and the tuning file's heavy and swarm-class lists.
// CI runs `check` (src/creatures.test.ts). Named exports, not default ones: the Art Lab's build (tools/art-lab/build.mjs)
// inlines every module into one page and only knows `import { ... } from`.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { entriesOf, exportedText, sameText, withImport } from "./lib/entries.mjs";
import { ident, recordsIn } from "./lib/genomeRecords.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), ".."), DIR = join(ROOT, "art/creatures"), SPECIES = join(ROOT, "art/genome/species.js"), INDEX = join(DIR, "index.js");
const cmd = process.argv[2] ?? "list";

/** The folders' ids, sorted. */
const ids = () => (existsSync(DIR) ? readdirSync(DIR, { withFileTypes: true }).filter(d => d.isDirectory() && existsSync(join(DIR, d.name, "genome.js"))).map(d => d.name).sort() : []);
/** The record's export name: GENOME_<ID> ("red-panda" -> GENOME_RED_PANDA). */

/** The per-creature files besides the genome: [file, export prefix, the registry it came from and assembles into]. */
const PARTS = [
  { file: "sigil.js", prefix: "SIGIL_", registry: "art/sigils.js", object: "SIGILS", assembled: "CREATURE_SIGILS", helpers: "art/sigils/strokes.js" },
  { file: "legend.js", prefix: "LEGEND_", registry: "art/legends.js", object: "LEGEND_POSES", assembled: "CREATURE_LEGENDS" },
  { file: "nap.js", prefix: "NAP_", registry: "art/naps.js", object: "NAP_POSES", assembled: "CREATURE_NAPS" },
];
const partName = (part, id) => part.prefix + id.toUpperCase().replace(/[^A-Z0-9]/g, "_");
const has = (id, file) => existsSync(join(DIR, id, file));

const HELPER_NAMES = ["L", "A", "D", "C", "E", "at", "stave", "FOOT", "mirror", "pair", "bow", "wave", "spiral", "rays"];
const helpersUsed = text => { const t = text.replace(/\.\.\./g, " "); return HELPER_NAMES.filter(h => new RegExp(`(^|[^\\w$.])${h}(?=[^\\w$]|$)`).test(t)); }; // (a spread's dots are not a property access)

/** art/sigils.js without its own copies of the building blocks (art/sigils/strokes.js has them since 2026-10-13; a merge brings
 *  the old lines back, and the Art Lab's one-scope build then sees each twice): their top-level definitions out, the import in. */
function withoutHelpers(text) {
  if (!existsSync(join(ROOT, "art/sigils/strokes.js"))) return text;
  const lines = text.split("\n"), out = [];
  for (let i = 0; i < lines.length; i++) {
    const m = /^(?:const|function) ([A-Za-z_$][\w$]*)\b/.exec(lines[i]);
    if (m && HELPER_NAMES.includes(m[1]) && !lines[i].startsWith("export ")) {
      if (lines[i].startsWith("function ")) { while (i < lines.length && lines[i] !== "}") i++; } // (to its closing brace at the margin)
      continue;
    }
    out.push(lines[i]);
  }
  return withImport(out.join("\n"), HELPER_NAMES, "./sigils/strokes.js");
}
/** The helper names art/sigils.js still defines itself. */
const ownHelpers = text => [...text.matchAll(/^(?:const|function) ([A-Za-z_$][\w$]*)\b/gm)].map(m => m[1]).filter(n => HELPER_NAMES.includes(n));

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

/** The config files' per-species sections: where each lives (the file and the path of its name-keyed map or species list)
 *  and the key it takes in a creature.js. A `list` section is a species list; its key holds true (or, for `by`, the list's name). */
const CONFIG_SECTIONS = [
  { file: "config/movement.json", path: ["profiles"], key: "movement" },
  { file: "config/movement.json", path: ["legends", "bySpecies"], key: "legendMoves" },
  { file: "config/movement.json", path: ["bodies", "radius"], key: "radius" },
  { file: "config/combat.json", path: ["bySpecies"], key: "attacks" },
  { file: "config/combat.json", path: ["strength", "species"], key: "strength" },
  { file: "config/combat.json", path: ["ranged"], key: "ranged", list: true },
  { file: "config/combat.json", path: ["kite", "species"], key: "kite", list: true },
  { file: "config/combat.json", path: ["temperament"], key: "temperament", by: true },
  { file: "config/combat.json", path: ["traits"], key: "traits", by: true, many: true },
  { file: "config/creature-voices.json", path: ["species"], key: "voice" },
  { file: "config/character.json", path: ["species"], key: "character" },
  { file: "config/packs.json", path: ["kinds"], key: "pack" },
];
export const CREATURE_KEYS = [...new Set(CONFIG_SECTIONS.map(s => s.key))];

/** The span [start, end) of the value at `path` in a JSON text (so the rest of the file keeps its formatting). */
function jsonSpan(text, path) {
  let i = 0;
  const ws = () => { while (i < text.length && /\s/.test(text[i])) i++; };
  const str = () => { const s = i; i++; while (text[i] !== '"') { if (text[i] === "\\") i++; i++; } i++; return JSON.parse(text.slice(s, i)); };
  const skip = () => { // past one value
    ws(); const c = text[i];
    if (c === '"') { str(); return; }
    if (c === "{" || c === "[") { let d = 0; do { const ch = text[i]; if (ch === '"') { str(); continue; } if (ch === "{" || ch === "[") d++; else if (ch === "}" || ch === "]") d--; i++; } while (d > 0); return; }
    while (i < text.length && !/[,}\]\s]/.test(text[i])) i++;
  };
  const into = depth => { // inside an object: find path[depth]
    ws(); if (text[i] !== "{") throw new Error(`no object at ${path.slice(0, depth).join(".")}`); i++;
    for (;;) {
      ws(); if (text[i] === "}") throw new Error(`no "${path[depth]}" in ${path.slice(0, depth).join(".") || "the file"}`);
      const k = str(); ws(); i++; ws(); // past the colon
      if (k === path[depth]) { if (depth === path.length - 1) { const start = i; skip(); return [start, i]; } return into(depth + 1); }
      skip(); ws(); if (text[i] === ",") i++;
    }
  };
  return into(0);
}
/** A JSON value's text re-indented under a key at `indent` spaces. */
const jsonAt = (v, indent) => JSON.stringify(v, null, 2).split("\n").map((l, j) => (j ? " ".repeat(indent) + l : l)).join("\n");
/** A value as a JS object literal (keys unquoted where they can be), for a creature.js. */
function js(v, indent = 0) {
  const pad = " ".repeat(indent + 2);
  if (Array.isArray(v)) { const inner = v.map(x => js(x, indent)); const one = `[${inner.join(", ")}]`; return one.length < 110 && !one.includes("\n") ? one : `[\n${inner.map(x => pad + x).join(",\n")}\n${" ".repeat(indent)}]`; }
  if (v && typeof v === "object") { const inner = Object.entries(v).map(([k, x]) => `${/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}: ${js(x, indent + 2)}`); const one = `{ ${inner.join(", ")} }`; return one.length < 110 && !one.includes("\n") ? one : `{\n${inner.map(x => pad + x).join(",\n")}\n${" ".repeat(indent)}}`; }
  return JSON.stringify(v);
}
const configName = id => "CREATURE_" + id.toUpperCase().replace(/[^A-Z0-9]/g, "_");
/** The config files' entries for the species in `known`: { id: { key: value } }, and each file's text with those entries out. */
function configEntries(known) {
  const byFile = new Map(), out = {};
  for (const sec of CONFIG_SECTIONS) {
    if (!byFile.has(sec.file)) byFile.set(sec.file, readFileSync(join(ROOT, sec.file), "utf8"));
    let text = byFile.get(sec.file);
    const [start, end] = jsonSpan(text, sec.path), value = JSON.parse(text.slice(start, end)), lineStart = text.lastIndexOf("\n", start) + 1, indent = text.slice(lineStart, start).search(/\S/);
    let rest;
    if (sec.list) { rest = value.filter(id => !known.has(id)); for (const id of value) if (known.has(id)) (out[id] ??= {})[sec.key] = true; }
    else if (sec.by) { rest = {}; for (const [name, list] of Object.entries(value)) { rest[name] = list.filter(id => !known.has(id)); for (const id of list) if (known.has(id)) { const o = (out[id] ??= {}); if (sec.many) (o[sec.key] ??= []).push(name); else o[sec.key] = name; } } }
    else { rest = {}; for (const [id, v] of Object.entries(value)) { if (known.has(id)) (out[id] ??= {})[sec.key] = v; else rest[id] = v; } }
    if (JSON.stringify(rest) !== JSON.stringify(value)) byFile.set(sec.file, text.slice(0, start) + jsonAt(rest, Math.max(0, indent)) + text.slice(end));
  }
  return { entries: out, files: byFile };
}
/** A creature.js's text. */
const configText = (id, entry) => `// ${id}: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const ${configName(id)} = ${js(Object.fromEntries(CREATURE_KEYS.filter(k => k in entry).map(k => [k, entry[k]])))};
`;

/** A pasted record against the folder's: "same" (dropped), "replaced" (the pasted one, newer, written over it) or "new". */
function placeRecord(out, name, text, id, file) {
  if (!existsSync(out)) { writeFileSync(out, text); return "new"; }
  const had = exportedText(readFileSync(out, "utf8"), name), got = exportedText(text, name);
  if (sameText(had, got)) return "same";
  writeFileSync(out, text); console.log(`  (${id}'s ${file} differed from the pasted one: the pasted one written over it; check the diff)`); return "replaced";
}

/** The index's text for these ids. */
const indexText = list => `// The species, assembled from art/creatures/<id>/genome.js, sorted by id. Written by \`node tools/creatures.mjs index\`:
// never edit by hand (add a folder and run the tool; CI's src/creatures.test.ts fails if this is stale).
${list.map(id => `import { ${ident(id)} } from "./${id}/genome.js";`).join("\n")}
${PARTS.flatMap(part => list.filter(id => has(id, part.file)).map(id => `import { ${partName(part, id)} } from "./${id}/${part.file}";`)).join("\n")}
export const CREATURE_GENOMES = [${list.map(ident).join(", ")}];
${PARTS.map(part => `export const ${part.assembled} = { ${list.filter(id => has(id, part.file)).map(id => `${id}: ${partName(part, id)}${part.object === "SIGILS" ? ".strokes" : ""}`).join(", ")} };`).join("\n")}
export const CREATURE_NEONS = { ${list.filter(id => has(id, "sigil.js")).map(id => `${id}: ${partName(PARTS[0], id)}.neon`).join(", ")} };
${list.filter(id => has(id, "creature.js")).map(id => `import { ${configName(id)} } from "./${id}/creature.js";`).join("\n")}
export const CREATURE_CONFIGS = { ${list.filter(id => has(id, "creature.js")).map(id => `${id}: ${configName(id)}`).join(", ")} };
`;

/** Records still written in species.js's GENOMES array: [{ id, text }] with the text as a module would export it, and the
 *  file's text with the array emptied. */

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
    mkdirSync(dir, { recursive: true });
    const how = placeRecord(join(dir, "genome.js"), ident(r.id), r.text, r.id, "genome.js");
    console.log(`art/creatures/${r.id}/genome.js${how === "new" ? "" : ` (${how})`}`);
  }
  if (records.length) {
    // (the array keeps only the index's spread: a merge that brought the old array back loses it)
    let text = withImport(rest, ["CREATURE_GENOMES"], "../creatures/index.js");
    const open = text.indexOf("export const GENOMES = ["), close = text.indexOf("\n];", open);
    if (open >= 0 && close >= 0 && !text.slice(open, close).includes("...CREATURE_GENOMES")) text = text.slice(0, text.indexOf("\n", open) + 1) + "  ...CREATURE_GENOMES,\n" + text.slice(close + 1);
    writeFileSync(SPECIES, text);
  }
  let moved = records.length;
  const known = new Set(ids());
  for (const part of PARTS) {
    const file = join(ROOT, part.registry); let text = readFileSync(file, "utf8");
    let { entries, start, end } = entriesOf(text, part.object);
    let neons = null;
    if (part.object === "SIGILS") { const n = entriesOf(text, "SIGIL_NEON"); neons = n; for (const e of entries) { const ne = n.entries.find(x => x.key === e.key); if (ne) e.neon = JSON.parse(ne.text.replace(/'/g, '"')); } }
    const mine = entries.filter(e => known.has(e.key));
    if (part.object === "SIGILS" && ownHelpers(text).length) { text = withoutHelpers(text); writeFileSync(file, text); console.log(`${part.registry}: its own building blocks out (art/sigils/strokes.js has them)`); if (!mine.length) continue; ({ entries, start, end } = entriesOf(text, part.object)); neons = entriesOf(text, "SIGIL_NEON"); for (const e of entries) { const ne = neons.entries.find(x => x.key === e.key); if (ne) e.neon = JSON.parse(ne.text.replace(/'/g, '"')); } mine.length = 0; mine.push(...entries.filter(e => known.has(e.key))); } // (the helpers' removal moved every offset: scan again)
    for (const e of mine) {
      const out = join(DIR, e.key, part.file);
      mkdirSync(join(DIR, e.key), { recursive: true });
      const how = placeRecord(out, partName(part, e.key), partText(part, e.key, e), e.key, part.file);
      console.log(`art/creatures/${e.key}/${part.file}${how === "new" ? "" : ` (${how})`}`); moved++;
    }
    if (mine.length) {
      // the registry keeps what isn't a creature's, spread after the assembled entries
      const keep = entries.filter(e => !known.has(e.key)), spreadName = part.assembled;
      const body = [`\n  ...${spreadName},`, ...keep.map(e => `\n${e.before.map(c => "  " + c + "\n").join("")}  ${e.key}: ${e.text},${e.after ? " " + e.after : ""}`)].join("") + "\n";
      text = text.slice(0, start) + body + text.slice(end);
      if (neons) { const n = entriesOf(text, "SIGIL_NEON"), keepN = n.entries.filter(e => !known.has(e.key)); text = text.slice(0, n.start) + ` ...CREATURE_NEONS${keepN.map(e => `, ${e.key}: ${e.text}`).join("")} ` + text.slice(n.end); }
      text = withImport(text, part.object === "SIGILS" ? ["CREATURE_SIGILS", "CREATURE_NEONS"] : [part.assembled], "./creatures/index.js"); // (last: it moves what's after it)
      writeFileSync(file, text);
    }
  }
  {
    const { entries, files } = configEntries(known);
    for (const [id, entry] of Object.entries(entries)) {
      const out = join(DIR, id, "creature.js");
      if (existsSync(out)) { // (an entry pasted back into a config file: merged over the creature's own, which keeps the rest)
        const mod = await import(pathToFileURL(out).href + `?t=${Date.now()}`), had = mod[configName(id)] ?? {};
        writeFileSync(out, configText(id, { ...had, ...entry }));
      } else writeFileSync(out, configText(id, entry));
      console.log(`art/creatures/${id}/creature.js`); moved++;
    }
    for (const [file, text] of files) if (text !== readFileSync(join(ROOT, file), "utf8")) writeFileSync(join(ROOT, file), text);
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
  { const own = ownHelpers(readFileSync(join(ROOT, "art/sigils.js"), "utf8")); if (own.length) problems.push(`art/sigils.js defines ${own.join(", ")} itself (art/sigils/strokes.js has them: run node tools/creatures.mjs adopt)`); }
  for (const part of PARTS) { try { const { entries } = entriesOf(readFileSync(join(ROOT, part.registry), "utf8"), part.object); for (const e of entries) if (known.has(e.key)) problems.push(`${part.registry} still holds ${part.object}.${e.key}: run node tools/creatures.mjs adopt`); } catch (err) { problems.push(`${part.registry}: ${err.message}`); } }
  for (const id of list) for (const part of PARTS) if (has(id, part.file)) {
    const m = await import(pathToFileURL(join(DIR, id, part.file)).href), v = m[partName(part, id)];
    if (!v) problems.push(`art/creatures/${id}/${part.file}: no export named ${partName(part, id)}`);
    else if (part.object === "SIGILS" && (!Array.isArray(v.strokes) || typeof v.neon !== "string")) problems.push(`art/creatures/${id}/sigil.js: ${partName(part, id)} needs { neon, strokes }`);
  }
  try { const { entries } = configEntries(known); for (const [id, e] of Object.entries(entries)) problems.push(`the config files still hold ${id}'s ${Object.keys(e).join(", ")}: run node tools/creatures.mjs adopt`); } catch (err) { problems.push(`the config files: ${err.message}`); }
  for (const id of list) if (has(id, "creature.js")) {
    const c = (await import(pathToFileURL(join(DIR, id, "creature.js")).href))[configName(id)];
    if (!c) problems.push(`art/creatures/${id}/creature.js: no export named ${configName(id)}`);
    else for (const k of Object.keys(c)) if (!CREATURE_KEYS.includes(k)) problems.push(`art/creatures/${id}/creature.js: no section called ${k} (${CREATURE_KEYS.join(", ")})`);
  }
  for (const id of list) {
    const g = (await import(pathToFileURL(join(DIR, id, "genome.js")).href))[ident(id)];
    if (!g) problems.push(`art/creatures/${id}/genome.js: no export named ${ident(id)}`);
    else if (g.id !== id) problems.push(`art/creatures/${id}/genome.js: its record's id is ${JSON.stringify(g.id)}, its folder ${id}`);
    else for (const p of genomeProblems(g)) problems.push(`${id}: ${p}`);
  }
  if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
  console.log(`ok: ${list.length} species, the index current, no genome problems, ${PARTS.map(p => `${list.filter(id => has(id, p.file)).length} ${p.file.replace(".js", "s")}`).join(", ")}, ${list.filter(id => has(id, "creature.js")).length} creature.js`);
} else if (cmd === "show") {
  const id = process.argv[3]; if (!id || !ids().includes(id)) { console.error(`which species? one of: ${ids().join(", ")}`); process.exit(2); }
  for (const f of ["genome.js", "creature.js", "sigil.js", "legend.js", "nap.js"]) if (has(id, f)) { const m = await import(pathToFileURL(join(DIR, id, f)).href); for (const [k, v] of Object.entries(m)) console.log(`== ${f} ${k} ==\n${js(v)}`); }
} else { console.error("usage: node tools/creatures.mjs list | index | check | adopt | show <id>"); process.exit(2); }
