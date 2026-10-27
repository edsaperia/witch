// The composable attacks (src/rules/attacks/, docs/plans/attack-grammar.md) into what the game reads today: each attack in
// config/attacks.json that the old runtime can run, compiled to its flat record (rules/attacks/legacy.ts compileLegacy) and written
// into config/combat.json's `attacks` block in place (the rest of that file untouched); and the grammar's schema written to
// config/schema/attacks.schema.json for the docs. Run after editing config/attacks.json; src/rules/attacks/attacks.test.ts fails
// until it's been run.
//   node tools/attacks/compile.mjs           (--check: say what would change and exit 1, writing nothing)
//   node tools/attacks/compile.mjs --from-legacy   (once: write config/attacks.json from combat.json's records, variants on a base)
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { openRules } from "../balance/lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const COMBAT = path.join(root, "config/combat.json"), ATTACKS = path.join(root, "config/attacks.json"), SCHEMA = path.join(root, "config/schema/attacks.schema.json");
const check = process.argv.includes("--check");

/** combat.json's text with its `attacks` block replaced by `attacks` (as the file writes it: one space a level). */
export function withAttacks(text, attacks) {
  const at = text.indexOf('\n "attacks": {');
  if (at < 0) throw new Error("combat.json: no top-level attacks block");
  let i = text.indexOf("{", at), depth = 0, inStr = false;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (inStr) { if (ch === "\\") i++; else if (ch === '"') inStr = false; continue; }
    if (ch === '"') inStr = true; else if (ch === "{") depth++; else if (ch === "}" && --depth === 0) break;
  }
  const block = JSON.stringify(attacks, null, 1).split("\n").map((l, k) => (k ? " " + l : l)).join("\n");
  return text.slice(0, text.indexOf("{", at)) + block + text.slice(i + 1);
}

const rules = await openRules();
try {
  const A = await rules.load("/src/rules/attacks/index.ts");
  if (process.argv.includes("--from-legacy")) {
    // (each old record in the grammar; a long or big variant written as its plain one's base and what differs)
    const old = JSON.parse(fs.readFileSync(COMBAT, "utf8")).attacks, out = { _: "The attacks, in the composable grammar (docs/plans/attack-grammar.md; src/rules/attacks/). Run node tools/attacks/compile.mjs after editing: it writes the ones today's runtime runs into config/combat.json's attacks." };
    const diff = (a, b) => { const d = {}; for (const k of Object.keys(b)) { const x = a?.[k], y = b[k]; if (y && typeof y === "object" && !Array.isArray(y) && x && typeof x === "object") { const s = diff(x, y); if (Object.keys(s).length) d[k] = s; } else if (JSON.stringify(x) !== JSON.stringify(y)) d[k] = y; } return d; };
    for (const [name, rec] of Object.entries(old)) {
      const spec = A.fromLegacy(rec), plain = name.replace(/^(long|big|wide)/, "");
      if (plain !== name && old[plain]) {
        const under = A.fromLegacy(old[plain]), over = { base: plain, ...diff(under, spec) };
        if (JSON.stringify(A.compileLegacy(A.withBase(over, out))) === JSON.stringify(A.compileLegacy(spec))) { out[name] = over; continue; }
      }
      out[name] = spec;
    }
    fs.writeFileSync(ATTACKS, JSON.stringify(out, null, 1) + "\n");
    console.log(`wrote ${Object.keys(out).length - 1} attacks to config/attacks.json`);
  }
  const lib = A.ATTACK_LIB, compiled = {};
  for (const [name, spec] of Object.entries(lib)) { const c = A.compileLegacy(A.withBase(spec, lib)); if (c) compiled[name] = c; }
  const text = fs.readFileSync(COMBAT, "utf8"), next = withAttacks(text, compiled), schema = JSON.stringify(A.ATTACK_FILE_SCHEMA, null, 2) + "\n";
  const stale = [text !== next && "config/combat.json", (!fs.existsSync(SCHEMA) || fs.readFileSync(SCHEMA, "utf8") !== schema) && "config/schema/attacks.schema.json"].filter(Boolean);
  if (check) { if (stale.length) { console.error(`out of date: ${stale.join(", ")} (node tools/attacks/compile.mjs)`); process.exitCode = 1; } else console.log("up to date"); }
  else { fs.writeFileSync(COMBAT, next); fs.writeFileSync(SCHEMA, schema); console.log(`${Object.keys(compiled).length} attacks compiled into config/combat.json${stale.length ? "" : " (unchanged)"}; the schema written`); }
} finally { await rules.close(); }
