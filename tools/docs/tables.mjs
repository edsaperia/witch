// The docs' tables made from the data (the coordinator's docs pass, Ed 2026-10-28: "Reformat prose into data where you can"; the
// data file wins): a table in a doc that only copies a data file is written between two marks, from that file, never by hand:
//   <!-- data: <name> (node tools/docs/tables.mjs --write; edit the data, not this) -->
//   ...
//   <!-- /data: <name> -->
// TABLES below says what each name is made from. tools/docs/tables.test.ts fails while one is out of date.
//   node tools/docs/tables.mjs           checks every doc's tables (exit 1 if one is out of date)
//   node tools/docs/tables.mjs --write   writes them
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const json = f => JSON.parse(fs.readFileSync(path.join(ROOT, f), "utf8"));
const table = (head, rows) => [`| ${head.join(" | ")} |`, `|${head.map(() => "---").join("|")}|`, ...rows.map(r => `| ${r.join(" | ")} |`)].join("\n");
const byName = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

/** Every kind (art/areas/<id>/kind.json): its species, phase and biome. */
function kinds() {
  const dir = path.join(ROOT, "art/areas");
  return fs.readdirSync(dir).filter(d => fs.existsSync(path.join(dir, d, "kind.json"))).map(d => ({ area: d, ...json(`art/areas/${d}/kind.json`) }))
    .sort((a, b) => a.phase - b.phase || byName(a.biome, b.biome) || byName(a.kind, b.kind));
}

/** Every species' creature record (art/creatures/<id>/creature.js). */
async function creatures() {
  const dir = path.join(ROOT, "art/creatures"), out = [];
  for (const d of fs.readdirSync(dir).sort()) {
    const f = path.join(dir, d, "creature.js");
    if (!fs.existsSync(f)) continue;
    const m = await import(pathToFileURL(f).href);
    out.push({ id: d, ...(m.default ?? Object.values(m)[0]) });
  }
  return out;
}

const PHASE = p => (p === 0 ? "home" : `phase ${p}`);

/** What each table is made from. */
export const TABLES = {
  /** Each species' own attack (config/species-attacks.json), by its kind's phase and biome. */
  "species-attacks": async () => {
    const A = json("config/species-attacks.json");
    return table(["Phase", "Biome", "Species", "Attack"], kinds().map(k => [k.phase, k.biome, k.kind, A[k.kind]?.note ?? "(none)"]));
  },
  /** How many kinds each phase brings, and from which biomes. */
  "kinds-by-phase": async () => {
    const K = kinds(), phases = [...new Set(K.map(k => k.phase))];
    return table(["Phase", "Kinds", "Biomes"], phases.map(p => { const ks = K.filter(k => k.phase === p); return [PHASE(p), ks.length, [...new Set(ks.map(k => k.biome))].join(", ")]; }));
  },
  /** The roster: each biome's kinds by the phase they come in. */
  roster: async () => {
    const K = kinds(), phases = [...new Set(K.map(k => k.phase))], biomes = [...new Set(K.map(k => k.biome))].sort((a, b) => (a === "temperate" ? -1 : b === "temperate" ? 1 : byName(a, b)));
    return table(["Biome", ...phases.map(PHASE)], biomes.map(b => [b, ...phases.map(p => K.filter(k => k.biome === b && k.phase === p).map(k => k.kind).join(", ") || "")]));
  },
  /** The broom sets (config/broom-parts.json `sets`): the parts that complete each and its spell. */
  "broom-sets": async () => {
    const B = json("config/broom-parts.json");
    return table(["Set", "Parts", "Spell"], Object.values(B.sets).map(s => [s.name, s.pieces.join(", "), s.spell]));
  },
};

/** The docs that may hold tables: every Markdown file but the archive's and the art reviews'. */
export function docs() {
  const out = ["DESIGN.md"], walk = d => { for (const e of fs.readdirSync(path.join(ROOT, d), { withFileTypes: true })) { const p = `${d}/${e.name}`; if (e.isDirectory()) { if (!["docs/archive", "docs/art-review"].includes(p)) walk(p); } else if (e.name.endsWith(".md")) out.push(p); } };
  walk("docs");
  return out;
}

const BLOCK = /(<!-- data: ([\w-]+) [^>]*-->)\n(?:([\s\S]*?)\n)?(<!-- \/data: \2 -->)/g;

/** A doc's text with its tables made afresh (an unknown name throws). */
export async function fill(text) {
  text = text.replace(/\r\n/g, "\n");
  const found = [...text.matchAll(BLOCK)];
  let out = text;
  for (const m of found) {
    const make = TABLES[m[2]];
    if (!make) throw new Error(`no table called ${m[2]} (tools/docs/tables.mjs TABLES)`);
    out = out.replace(m[0], `${m[1]}\n${await make()}\n${m[4]}`);
  }
  return out;
}

/** The docs whose tables aren't as the data makes them: [{ file, want }]. */
export async function stale() {
  const out = [];
  for (const f of docs()) {
      const have = fs.readFileSync(path.join(ROOT, f), "utf8").replace(/\r\n/g, "\n");
    if (!have.includes("<!-- data: ")) continue;
    const want = await fill(have);
    if (want !== have) out.push({ file: f, want });
  }
  return out;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const s = await stale();
  if (process.argv.includes("--write")) { for (const { file, want } of s) { fs.writeFileSync(path.join(ROOT, file), want); console.log(`wrote ${file}`); } if (!s.length) console.log("every table up to date"); }
  else if (s.length) { console.error(`out of date (node tools/docs/tables.mjs --write): ${s.map(x => x.file).join(", ")}`); process.exit(1); }
  else console.log("every table up to date");
}
