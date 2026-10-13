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
//   node tools/data.mjs areas list|check|adopt         the areas (art/areas/<id>/): recipe.js (art/recipes.js's recipes), kind.json
//                                                      (the kinds table's line for its creature: config/kinds.json before; the
//                                                      placeholders' in config/kinds/), flora.js (an original area's trees from
//                                                      art/flora/areas.js); assembled by art/areas/index.js and src/rules/kinds.ts
//   node tools/data.mjs areas index                     writes art/areas/index.js from the folders
//   node tools/data.mjs adopt                           every domain's adopt, the creatures' too
//   node tools/data.mjs check                           every domain's check
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from "node:fs";
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

// ---- areas ----
// One folder an area, art/areas/<id>/: recipe.js (the area as a recipe: art/recipes.js says the fields; the 30 original areas
// are still art/areas.js's tables, so their folders hold no recipe), kind.json (its creature's line of the kinds table: kind,
// slot, phase, bearing, dir, biome; tools/lib/kinds.mjs), and flora.js (an original area's trees, `export const
// AREA_FLORA_<ID> = { species, palette }`; a recipe's trees are its own `flora`). The placeholders (kinds not designed yet,
// unknown-NN) are config/kinds/<id>.json. art/areas/index.js (written by index and adopt, sorted by id) gathers the recipes
// (AREA_FOLDER_RECIPES, for art/recipes.js), flora (AREA_FOLDER_FLORA, for art/flora/areas.js) and kind lines (AREA_FOLDER_KINDS,
// by slot, for src/rules/kinds.ts: the kinds table; tools/lib/kinds.mjs reads the files for the tools).
const AREAS_DIR = join(ROOT, "art/areas"), AREAS_INDEX = join(AREAS_DIR, "index.js"), RECIPES_FILE = join(ROOT, "art/recipes.js"), OLD_RECIPES_DIR = join(ROOT, "art/recipes");
const AREA_FLORA_FILE = join(ROOT, "art/flora/areas.js"), KINDS_FILE = join(ROOT, "config/kinds.json"), PLACEHOLDERS_DIR = join(ROOT, "config/kinds");
const areaIds = () => (existsSync(AREAS_DIR) ? readdirSync(AREAS_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort() : []);
const floraName = id => "AREA_FLORA_" + id.toUpperCase().replace(/[^A-Z0-9]/g, "_");
const exportNameOf = text => /^export const ([A-Za-z_$][\w$]*) = \{/m.exec(text)?.[1];
const keyText = id => (/^[A-Za-z_$][\w$]*$/.test(id) ? id : JSON.stringify(id));
const areaFile = (id, f) => join(AREAS_DIR, id, f);
const recipeSlot = text => { const m = /\bslot: *(\d+)/.exec(text); return m ? Number(m[1]) : null; };
/** The recipes' slots in order, and what's wrong with them (one missing, one taken twice: the map's area type ids are positional). */
function recipeSlots(ids) {
  const out = [], problems = [];
  for (const id of ids) if (existsSync(areaFile(id, "recipe.js"))) { const slot = recipeSlot(readFileSync(areaFile(id, "recipe.js"), "utf8")); if (slot === null) problems.push(`art/areas/${id}/recipe.js: no slot (its place among the recipes; the next free one is ${ids.length})`); else out.push({ id, slot }); }
  out.sort((a, b) => a.slot - b.slot);
  out.forEach((r, i) => { if (r.slot !== i) problems.push(`art/areas/${r.id}/recipe.js: slot ${r.slot}, but ${i} comes next (slots run 0 to ${out.length - 1}, one recipe each${i ? `; art/areas/${out[i - 1].id}/recipe.js has ${out[i - 1].slot}` : ""})`); });
  return { slots: out, problems };
}
async function areasIndexText(ids) {
  const { kindLines } = await import("./lib/kinds.mjs");
  const recipes = ids.filter(id => existsSync(areaFile(id, "recipe.js"))).map(id => { const t = readFileSync(areaFile(id, "recipe.js"), "utf8"); return { id, name: exportNameOf(t) ?? "MISSING", slot: recipeSlot(t) ?? 1e9 }; }).sort((a, b) => a.slot - b.slot || a.id.localeCompare(b.id));
  const flora = ids.filter(id => existsSync(areaFile(id, "flora.js")));
  const kinds = kindLines(ROOT).sort((a, b) => a.slot - b.slot || a.kind.localeCompare(b.kind)).map(({ file, area, ...l }) => l);
  return `// Every area folder's recipe, flora and kind line (art/areas/<id>/recipe.js, flora.js, kind.json) and the placeholders' lines
// (config/kinds/), gathered for art/recipes.js, art/flora/areas.js and src/rules/kinds.ts (the kinds table, by slot). Written by
// node tools/data.mjs areas index (and adopt), the recipes and flora sorted by id, the kinds by slot: don't edit it, run that.
${recipes.map(r => `import { ${r.name} } from "./${r.id}/recipe.js";`).join("\n")}
${flora.map(id => `import { ${floraName(id)} } from "./${id}/flora.js";`).join("\n")}
export const AREA_FOLDER_RECIPES = [${recipes.map(r => r.name).join(", ")}];
export const AREA_FOLDER_FLORA = { ${flora.map(id => `${keyText(id)}: ${floraName(id)}`).join(", ")} };
export const AREA_FOLDER_KINDS = [
${kinds.map(l => "  " + JSON.stringify(l) + ",").join("\n")}
];
`;
}
const placeFile = (out, body, what) => {
  if (!existsSync(out)) { writeFileSync(out, body); console.log(what); }
  else if (!sameText(readFileSync(out, "utf8"), body)) { writeFileSync(out, body); console.log(`${what} (replaced: the pasted one differed; check the diff)`); }
  else console.log(`${what} (same)`);
};
/** The game's areas by creature (art/areas.js, loaded once). */
let AREAS_MOD = null;
const gameAreas = async () => (AREAS_MOD ??= (await import(pathToFileURL(join(ROOT, "art/areas.js")).href)).AREAS);
async function areas(v) {
  const problems = [];
  const { kindLines, assembleKinds } = await import("./lib/kinds.mjs");
  if (v === "list") {
    const AREAS = await gameAreas(), lines = kindLines(ROOT), byKind = Object.fromEntries(lines.map(l => [l.kind, l]));
    for (const A of AREAS) { const k = byKind[A.creature]; console.log(`${A.id.padEnd(20)} ${A.creature.padEnd(16)} ${A.by === "recipe" ? "recipe" : "table "} ${existsSync(areaFile(A.id, "flora.js")) ? "flora.js" : "        "} ${k ? `slot ${String(k.slot).padStart(2)} phase ${k.phase} bearing ${String(k.bearing).padStart(3)} ${k.dir}` : "NO KIND LINE"}`); }
    for (const l of lines.filter(l => l.placeholder)) console.log(`${"(placeholder)".padEnd(20)} ${l.kind.padEnd(16)}                 slot ${String(l.slot).padStart(2)} phase ${l.phase} bearing ${String(l.bearing).padStart(3)} ${l.dir ?? ""}`);
    console.log(`${AREAS.length} areas, ${lines.length} kind lines`);
    return problems;
  }
  if (v === "index") { mkdirSync(AREAS_DIR, { recursive: true }); writeFileSync(AREAS_INDEX, await areasIndexText(areaIds())); console.log(`wrote art/areas/index.js (${areaIds().length} areas)`); return problems; }
  if (v === "adopt") {
    let moved = 0;
    // recipes an old-style merge brings back: art/recipes/<file>.js, imported by art/recipes.js (or just left in the folder)
    let text = readFileSync(RECIPES_FILE, "utf8");
    const imports = [...text.matchAll(/^import \{ *([A-Za-z_$][\w$]*) *\} from "\.\/recipes\/([^"]+)";\n/gm)];
    const files = new Set([...imports.map(m => m[2]), ...(existsSync(OLD_RECIPES_DIR) ? readdirSync(OLD_RECIPES_DIR).filter(f => f.endsWith(".js")) : [])]);
    for (const f of files) {
      const p = join(OLD_RECIPES_DIR, f); if (!existsSync(p)) { problems.push(`art/recipes.js imports ./recipes/${f}, which isn't there`); continue; }
      let body = readFileSync(p, "utf8"); const id = /\bid: *"([^"]+)"/.exec(body)?.[1], name = exportNameOf(body);
      if (!id || !name) { problems.push(`art/recipes/${f}: no export const NAME = { id: "..." } in it`); continue; }
      if (recipeSlot(body) === null) { const next = recipeSlots(areaIds()).slots.length; body = body.replace(/(\n\s*)id: *"/, `$1slot: ${next}, id: "`); console.log(`art/recipes/${f}: given slot ${next} (its place among the recipes)`); }
      mkdirSync(join(AREAS_DIR, id), { recursive: true }); placeFile(areaFile(id, "recipe.js"), body, `art/areas/${id}/recipe.js`); unlinkSync(p); moved++;
    }
    if (existsSync(OLD_RECIPES_DIR) && !readdirSync(OLD_RECIPES_DIR).length) rmdirSync(OLD_RECIPES_DIR);
    if (imports.length || !text.includes("...AREA_FOLDER_RECIPES")) {
      for (const m of imports) text = text.replace(m[0], "");
      text = text.replace(/^export const AREA_RECIPES = \[[\s\S]*?\];/m, "export const AREA_RECIPES = [...AREA_FOLDER_RECIPES];");
      text = withImport(text, ["AREA_FOLDER_RECIPES"], "./areas/index.js");
      writeFileSync(RECIPES_FILE, text);
    }
    // an original area's flora left in art/flora/areas.js
    let ftext = readFileSync(AREA_FLORA_FILE, "utf8");
    const { entries, start, end } = entriesOf(ftext, "AREA_FLORA");
    for (const e of entries) {
      mkdirSync(join(AREAS_DIR, e.key), { recursive: true });
      const body = [...e.before.map(l => l.replace(/^  /, "")), `export const ${floraName(e.key)} = ${e.text.split("\n").map((l, i) => (i ? l.replace(/^  /, "") : l)).join("\n")};${e.after ? " " + e.after : ""}`].join("\n") + "\n";
      placeFile(areaFile(e.key, "flora.js"), body, `art/areas/${e.key}/flora.js`); moved++;
    }
    if (entries.length) { ftext = ftext.slice(0, start) + "\n  ...AREA_FOLDER_FLORA,\n" + ftext.slice(end); ftext = withImport(ftext, ["AREA_FOLDER_FLORA"], "../areas/index.js"); writeFileSync(AREA_FLORA_FILE, ftext); }
    mkdirSync(AREAS_DIR, { recursive: true }); writeFileSync(AREAS_INDEX, await areasIndexText(areaIds())); // (art/areas.js loads below)
    // the kinds table as one file (a merge, or a kind added there): each line to its area's folder, placeholders to config/kinds/
    if (existsSync(KINDS_FILE)) {
      const AREAS = await gameAreas(), byCreature = Object.fromEntries(AREAS.map(A => [A.creature, A.id])), table = json(KINDS_FILE).kinds ?? {};
      const had = kindLines(ROOT), bySlot = Object.fromEntries(had.map(l => [l.slot, l]));
      let stuck = false;
      Object.entries(table).forEach(([kind, info], slot) => {
        const line = { kind, slot, ...info }, prev = bySlot[slot];
        if (prev && prev.kind !== kind) { if (prev.placeholder) { unlinkSync(join(ROOT, prev.file)); console.log(`${prev.file}: its slot ${slot} taken by ${kind} (deleted)`); } else { problems.push(`config/kinds.json: ${kind} at ${slot}, where ${prev.kind} is (${prev.file}); the table's order is hashed by the rosters and the chart, so a new kind takes a placeholder's slot`); stuck = true; return; } }
        if (info.placeholder) { mkdirSync(PLACEHOLDERS_DIR, { recursive: true }); placeFile(join(PLACEHOLDERS_DIR, `${kind}.json`), JSON.stringify(line, null, 2) + "\n", `config/kinds/${kind}.json`); }
        else if (!byCreature[kind]) { problems.push(`config/kinds.json: ${kind} is no area's creature (an area's kind line lives in its folder, art/areas/<id>/kind.json)`); stuck = true; }
        else { mkdirSync(join(AREAS_DIR, byCreature[kind]), { recursive: true }); placeFile(areaFile(byCreature[kind], "kind.json"), JSON.stringify(line, null, 2) + "\n", `art/areas/${byCreature[kind]}/kind.json`); }
        moved++;
      });
      if (!stuck) { unlinkSync(KINDS_FILE); console.log("config/kinds.json folded into the area folders and config/kinds/"); }
    }
    writeFileSync(AREAS_INDEX, await areasIndexText(areaIds()));
    console.log(`${moved} record(s) moved; index written (${areaIds().length} area folders)`);
    return problems;
  }
  // check
  if (existsSync(OLD_RECIPES_DIR)) problems.push("art/recipes/ is back (a merge): run node tools/data.mjs areas adopt to move its recipes into art/areas/<id>/recipe.js");
  const rtext = readFileSync(RECIPES_FILE, "utf8");
  if (/from "\.\/recipes\//.test(rtext) || !rtext.includes("export const AREA_RECIPES = [...AREA_FOLDER_RECIPES];")) problems.push("art/recipes.js still lists recipes of its own: run node tools/data.mjs areas adopt");
  try { const { entries } = entriesOf(readFileSync(AREA_FLORA_FILE, "utf8"), "AREA_FLORA"); for (const e of entries) problems.push(`art/flora/areas.js still holds AREA_FLORA.${e.key}: run node tools/data.mjs areas adopt`); } catch (err) { problems.push(err.message); }
  if (existsSync(KINDS_FILE)) problems.push("config/kinds.json is back (a merge): run node tools/data.mjs areas adopt to fold it into the area folders");
  if (!existsSync(AREAS_INDEX) || readFileSync(AREAS_INDEX, "utf8") !== await areasIndexText(areaIds())) problems.push("art/areas/index.js is stale: run node tools/data.mjs areas index");
  const lines = kindLines(ROOT), { problems: kp } = assembleKinds(lines); problems.push(...kp, ...recipeSlots(areaIds()).problems);
  for (const l of lines) { if (l.area && l.placeholder) problems.push(`${l.file}: a placeholder in an area's folder`); if (!l.area && !l.placeholder) problems.push(`${l.file}: not a placeholder; a kind's line lives in its area's folder`); for (const k of ["phase", "bearing"]) if (typeof l[k] !== "number") problems.push(`${l.file}: no ${k}`); }
  const AREAS = await gameAreas(), byKind = Object.fromEntries(lines.map(l => [l.kind, l]));
  for (const id of areaIds()) {
    const A = AREAS.find(a => a.id === id); if (!A) { problems.push(`art/areas/${id}/: no area has that id`); continue; }
    if (existsSync(areaFile(id, "recipe.js"))) { const t = readFileSync(areaFile(id, "recipe.js"), "utf8"); if (!exportNameOf(t)) problems.push(`art/areas/${id}/recipe.js: no export const NAME = {`); if (/\bid: *"([^"]+)"/.exec(t)?.[1] !== id) problems.push(`art/areas/${id}/recipe.js: its id isn't ${id}`); }
    else if (A.by === "recipe") problems.push(`art/areas/${id}/: no recipe.js, yet the area is a recipe`);
    if (existsSync(areaFile(id, "flora.js"))) { const m = await import(pathToFileURL(areaFile(id, "flora.js")).href); if (!m[floraName(id)]) problems.push(`art/areas/${id}/flora.js: no export named ${floraName(id)}`); }
    const k = existsSync(areaFile(id, "kind.json")) ? json(areaFile(id, "kind.json")) : null;
    if (!k) problems.push(`art/areas/${id}/: no kind.json (its creature ${A.creature}'s line of the kinds table)`);
    else if (k.kind !== A.creature) problems.push(`art/areas/${id}/kind.json: kind ${k.kind}, but the area's creature is ${A.creature}`);
  }
  for (const A of AREAS) if (!existsSync(join(AREAS_DIR, A.id))) problems.push(`${A.id}: no art/areas/${A.id}/ folder (its kind.json at least)`);
  if (!problems.length) console.log(`ok: areas in ${areaIds().length} folders (${AREAS.filter(A => A.by === "recipe").length} recipes), the index current, ${lines.length} kinds in the table (${lines.filter(l => l.placeholder).length} placeholders), ${lines.length ? Object.keys(byKind).length : 0} distinct`);
  return problems;
}

const DOMAINS = { decisions, flora, areas };
if (domain === "adopt" || domain === "check") {
  execFileSync("node", ["tools/creatures.mjs", domain], { cwd: ROOT, stdio: "inherit" });
  let bad = [];
  for (const [name, run] of Object.entries(DOMAINS)) bad.push(...(await run(domain)).map(p => `${name}: ${p}`));
  if (bad.length) { console.error(bad.join("\n")); process.exit(1); }
} else if (DOMAINS[domain]) {
  const bad = await DOMAINS[domain](verb);
  if (bad.length) { console.error(bad.join("\n")); process.exit(1); }
} else { console.error("usage: node tools/data.mjs decisions|flora|areas list|check|adopt (flora, areas: index too)  ·  node tools/data.mjs adopt|check"); process.exit(2); }
