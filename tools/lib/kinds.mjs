// The kinds table (every kind of creature with its island's phase and bearing: src/rules/rosters.ts KINDS) assembled for the node
// tools the way src/rules/kinds.ts assembles it for the game: from every area folder's kind.json (art/areas/<id>/kind.json: its
// creature's line, `{ kind, slot, phase, bearing, dir, biome }`) and the placeholders' (config/kinds/<id>.json, kinds not designed
// yet), in slot order. A slot is a kind's place in the table (the rosters and the sea chart hash by it, so it never moves; a new
// kind takes a placeholder's slot and the placeholder's file goes). assembleKinds says what's wrong instead of throwing.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const json = p => JSON.parse(readFileSync(p, "utf8"));
/** Every kind line with the file it came from (and `area`, the folder's, for an area's). */
export function kindLines(root = ROOT) {
  const areas = join(root, "art/areas"), ph = join(root, "config/kinds"), out = [];
  if (existsSync(areas)) for (const d of readdirSync(areas, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort()) { const p = join(areas, d, "kind.json"); if (existsSync(p)) out.push({ file: `art/areas/${d}/kind.json`, area: d, ...json(p) }); }
  if (existsSync(ph)) for (const f of readdirSync(ph).filter(f => f.endsWith(".json")).sort()) out.push({ file: `config/kinds/${f}`, ...json(join(ph, f)) });
  return out;
}
/** The table by slot, and what's wrong with the lines (a slot missing, taken twice, a kind twice, a line without its kind or slot). */
export function assembleKinds(lines) {
  const problems = [], kinds = {}, sorted = [...lines].sort((a, b) => a.slot - b.slot);
  sorted.forEach((l, i) => {
    if (typeof l.kind !== "string" || !Number.isInteger(l.slot)) { problems.push(`${l.file}: needs "kind" and an integer "slot"`); return; }
    if (l.slot !== i) problems.push(`${l.file}: slot ${l.slot}, but ${i} comes next (slots run 0 to ${sorted.length - 1}, one kind each${i > 0 ? `; ${sorted[i - 1].file} has ${sorted[i - 1].slot}` : ""})`);
    if (kinds[l.kind]) problems.push(`${l.file}: ${l.kind} is already in the table`);
    const { kind, slot, file, area, ...info } = l; kinds[kind] = info;
  });
  return { kinds, problems };
}
/** The table as the game sees it (throws on a problem). */
export function kindsTable(root = ROOT) { const { kinds, problems } = assembleKinds(kindLines(root)); if (problems.length) throw new Error("kinds table: " + problems.join("; ")); return kinds; }
