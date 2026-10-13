// The game's split registries besides the creatures' (tools/creatures.mjs): one small file each, assembled by the readers, so
// builders stop colliding on one shared file (Ed, 2026-10-13). Each domain has the same verbs:
//   node tools/data.mjs decisions list|check|adopt     the pause page's test sliders and the decisions panel (src/ui/decisions.ts):
//                                                      config/decisions/<pr>-<group>.json, one fragment a pull request's group,
//                                                      collected newest PR first; adopt moves entries pasted back into
//                                                      config/decisions.json's array (a merge) into their fragments
//   node tools/data.mjs flora list|check|adopt         the tree species' genomes (art/flora/genomes.js PLANT_GENOMES): one file a
//                                                      species, art/flora/species/<id>.js (`export const PLANT_<ID> = { ... }`),
//                                                      assembled by art/flora/species/index.js (written by adopt and index, sorted
//                                                      by id); and the flora baseline (art/flora/baseline/<id>.json, one a species,
//                                                      bush.json the bushes': node art/flora/fingerprint.mjs writes them)
//   node tools/data.mjs flora index                     writes art/flora/species/index.js from the folder
//   node tools/data.mjs adopt                           every domain's adopt, the creatures' too
//   node tools/data.mjs check                           every domain's check
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { entriesOf, exportedText, sameText, withImport } from "./lib/entries.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [domain, verb = "list"] = process.argv.slice(2);
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const json = p => JSON.parse(readFileSync(p, "utf8"));
const write = (p, o) => writeFileSync(p, JSON.stringify(o, null, 2) + "\n");

// ---- decisions ----
const DEC_FILE = join(ROOT, "config/decisions.json"), DEC_DIR = join(ROOT, "config/decisions");
const fragmentName = (pr, group) => `${pr ?? 0}-${slug(group ?? "other")}.json`;
const fragments = () => (existsSync(DEC_DIR) ? readdirSync(DEC_DIR).filter(f => f.endsWith(".json")).sort((a, b) => Number(b.split("-")[0]) - Number(a.split("-")[0]) || a.localeCompare(b)) : []);
function decisions(v) {
  const problems = [];
  if (v === "list") { for (const f of fragments()) { const o = json(join(DEC_DIR, f)); console.log(`${f.padEnd(40)} #${o.pr} ${o.group}: ${o.decisions.map(d => d.id).join(", ")}`); } return problems; }
  if (v === "adopt") {
    const file = json(DEC_FILE), left = file.decisions ?? [];
    mkdirSync(DEC_DIR, { recursive: true });
    let moved = 0;
    for (const d of left) {
      const name = fragmentName(d.pr, d.group), p = join(DEC_DIR, name), o = existsSync(p) ? json(p) : { pr: d.pr ?? 0, group: d.group ?? "other", decisions: [] };
      const at = o.decisions.findIndex(x => x.id === d.id);
      if (at >= 0) { if (JSON.stringify(o.decisions[at]) !== JSON.stringify(d)) { o.decisions[at] = d; console.log(`  (${d.id} in ${name} differed from the pasted one: the pasted one written over it; check the diff)`); } }
      else o.decisions.push(d);
      write(p, o); moved++; console.log(`config/decisions/${name}: ${d.id}`);
    }
    if (left.length) write(DEC_FILE, { ...file, decisions: [] });
    console.log(`${moved} entr${moved === 1 ? "y" : "ies"} moved; ${fragments().length} fragments`);
    return problems;
  }
  // check
  const file = json(DEC_FILE);
  for (const d of file.decisions ?? []) problems.push(`config/decisions.json still holds ${d.id}: run node tools/data.mjs decisions adopt`);
  const ids = new Map();
  for (const f of fragments()) {
    const o = json(join(DEC_DIR, f));
    if (fragmentName(o.pr, o.group) !== f) problems.push(`config/decisions/${f}: its pr ${o.pr} and group "${o.group}" would name it ${fragmentName(o.pr, o.group)}`);
    for (const d of o.decisions ?? []) {
      if (d.pr !== undefined && d.pr !== o.pr) problems.push(`config/decisions/${f}: ${d.id} says pr ${d.pr}`);
      if (d.group !== undefined && d.group !== o.group) problems.push(`config/decisions/${f}: ${d.id} says group "${d.group}"`);
      if (ids.has(d.id)) problems.push(`${d.id} is in both ${ids.get(d.id)} and ${f}`); ids.set(d.id, f);
    }
  }
  if (!problems.length) console.log(`ok: decisions in ${fragments().length} fragments, ${ids.size} entries, none left in config/decisions.json`);
  return problems;
}

// ---- flora ----
const GENOMES_FILE = join(ROOT, "art/flora/genomes.js"), SPECIES_DIR = join(ROOT, "art/flora/species"), SPECIES_INDEX = join(SPECIES_DIR, "index.js");
const BASELINE_FILE = join(ROOT, "art/flora/baseline.json");
const plantName = id => "PLANT_" + id.toUpperCase().replace(/[^A-Z0-9]/g, "_");
const plantIds = () => (existsSync(SPECIES_DIR) ? readdirSync(SPECIES_DIR).filter(f => f.endsWith(".js") && f !== "index.js").map(f => f.slice(0, -3)).sort() : []);
const plantIndexText = ids => `// The tree species' genomes, assembled from art/flora/species/<id>.js, sorted by id. Written by \`node tools/data.mjs flora index\`:
// never edit by hand (add a file and run the tool; CI's src/creatures.test.ts fails if this is stale).
${ids.map(id => `import { ${plantName(id)} } from "./${id}.js";`).join("\n")}
export const FLORA_GENOMES = { ${ids.map(id => `${id}: ${plantName(id)}`).join(", ")} };
`;
/** The baseline's fingerprints, one file a species (and bush.json), as one map. */
import { readBaseline as baselineAll, writeBaseline } from "../art/flora/baseline.mjs";
async function flora(v) {
  const problems = [];
  if (v === "list") { for (const id of plantIds()) { const g = (await import(pathToFileURL(join(SPECIES_DIR, `${id}.js`)).href))[plantName(id)]; console.log(`${id.padEnd(14)} ${String(g?.name).padEnd(24)} ${g?.form} ${g?.generator}${g?.fantasy ? " fantasy" : ""}`); } console.log(`${plantIds().length} species`); return problems; }
  if (v === "index") { mkdirSync(SPECIES_DIR, { recursive: true }); writeFileSync(SPECIES_INDEX, plantIndexText(plantIds())); console.log(`wrote art/flora/species/index.js (${plantIds().length} species)`); return problems; }
  if (v === "adopt") {
    let text = readFileSync(GENOMES_FILE, "utf8"), moved = 0;
    const { entries, start, end } = entriesOf(text, "PLANT_GENOMES");
    mkdirSync(SPECIES_DIR, { recursive: true });
    for (const e of entries) {
      const out = join(SPECIES_DIR, `${e.key}.js`), lines = [...e.before.map(l => l.replace(/^  /, "")), `export const ${plantName(e.key)} = ${e.text.split("\n").map((l, i) => (i ? l.replace(/^  /, "") : l)).join("\n")};${e.after ? " " + e.after : ""}`], body = lines.join("\n") + "\n";
      if (!existsSync(out)) { writeFileSync(out, body); console.log(`art/flora/species/${e.key}.js`); }
      else if (!sameText(exportedText(readFileSync(out, "utf8"), plantName(e.key)), exportedText(body, plantName(e.key)))) { writeFileSync(out, body); console.log(`art/flora/species/${e.key}.js (replaced: the pasted one differed; check the diff)`); }
      else console.log(`art/flora/species/${e.key}.js (same)`);
      moved++;
    }
    if (entries.length) {
      text = text.slice(0, start) + "\n  ...FLORA_GENOMES,\n" + text.slice(end);
      text = withImport(text, ["FLORA_GENOMES"], "./species/index.js");
      writeFileSync(GENOMES_FILE, text);
    }
    writeFileSync(SPECIES_INDEX, plantIndexText(plantIds()));
    if (existsSync(BASELINE_FILE)) { const n = writeBaseline(baselineAll()); const { unlinkSync } = await import("node:fs"); unlinkSync(BASELINE_FILE); console.log(`art/flora/baseline.json split into ${n} files under art/flora/baseline/`); }
    console.log(`${moved} record(s) moved; index written (${plantIds().length} species)`);
    return problems;
  }
  // check
  try { const { entries } = entriesOf(readFileSync(GENOMES_FILE, "utf8"), "PLANT_GENOMES"); for (const e of entries) problems.push(`art/flora/genomes.js still holds PLANT_GENOMES.${e.key}: run node tools/data.mjs flora adopt`); } catch (err) { problems.push(err.message); }
  if (!existsSync(SPECIES_INDEX) || readFileSync(SPECIES_INDEX, "utf8") !== plantIndexText(plantIds())) problems.push("art/flora/species/index.js is stale: run node tools/data.mjs flora index");
  for (const id of plantIds()) { const m = await import(pathToFileURL(join(SPECIES_DIR, `${id}.js`)).href); if (!m[plantName(id)]) problems.push(`art/flora/species/${id}.js: no export named ${plantName(id)}`); }
  if (existsSync(BASELINE_FILE)) problems.push("art/flora/baseline.json is back (a merge): run node tools/data.mjs flora adopt to fold it into art/flora/baseline/");
  const base = baselineAll(), known = new Set([...plantIds(), "bush"]);
  for (const k of Object.keys(base)) if (!known.has(k.split("/")[0])) problems.push(`art/flora/baseline/: ${k} is no species' (delete its file)`);
  if (!problems.length) console.log(`ok: flora in ${plantIds().length} species files, the index current, ${Object.keys(base).length} fingerprints in art/flora/baseline/`);
  return problems;
}

const DOMAINS = { decisions, flora };
if (domain === "adopt" || domain === "check") {
  execFileSync("node", ["tools/creatures.mjs", domain], { cwd: ROOT, stdio: "inherit" });
  let bad = [];
  for (const [name, run] of Object.entries(DOMAINS)) bad.push(...(await run(domain)).map(p => `${name}: ${p}`));
  if (bad.length) { console.error(bad.join("\n")); process.exit(1); }
} else if (DOMAINS[domain]) {
  const bad = await DOMAINS[domain](verb);
  if (bad.length) { console.error(bad.join("\n")); process.exit(1); }
} else { console.error("usage: node tools/data.mjs decisions|flora list|check|adopt (flora: index too)  ·  node tools/data.mjs adopt|check"); process.exit(2); }
