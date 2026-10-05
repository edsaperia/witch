// The config schemas (housekeeping, issue #122): writes and checks config/schema/*.schema.json and
// the knob reference config/KNOBS.md (src/rules/schema.ts does the work).
//   node tools/config/schema.mjs --check     validate the config files against their schemas
//   node tools/config/schema.mjs --docs      rewrite config/KNOBS.md from the schema and the notes
//   node tools/config/schema.mjs --init      (re)infer the tuning schema from the file as it stands, keeping OVER below
//   node tools/config/schema.mjs --add       add any knobs the file has and the schema lacks (inferred), keeping the rest
// After adding a knob to config/tuning.json: --add (or edit the schema), then --docs.
import { createServer } from "vite";
import { readFileSync, writeFileSync } from "node:fs";

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error", optimizeDeps: { noDiscovery: true, include: [] } });
const { validate, inferSchema, knobsMarkdown } = await server.ssrLoadModule("/src/rules/schema.ts");
const { TUNING_OVER } = await server.ssrLoadModule("/src/rules/tuningSchema.ts");
const FILE = "config/tuning.json", SCHEMA = "config/schema/tuning.schema.json", DOCS = "config/KNOBS.md";
const tuning = JSON.parse(readFileSync(FILE, "utf8"));
const write = (p, o) => writeFileSync(p, JSON.stringify(o, null, 2) + "\n");
const has = f => process.argv.includes(`--${f}`);

if (has("init")) write(SCHEMA, inferSchema(tuning, TUNING_OVER));
if (has("add")) {
  const now = JSON.parse(readFileSync(SCHEMA, "utf8")), fresh = inferSchema(tuning, TUNING_OVER);
  const merge = (a, b) => { if (a?.properties && b?.properties) { for (const k of Object.keys(b.properties)) a.properties[k] = a.properties[k] ? merge(a.properties[k], b.properties[k]) : b.properties[k]; a.required = b.required; } return a; };
  write(SCHEMA, merge(now, fresh));
}
const schema = JSON.parse(readFileSync(SCHEMA, "utf8"));
if (has("docs")) writeFileSync(DOCS, knobsMarkdown(tuning, schema, "Tuning knobs", FILE));
if (has("check") || !process.argv.slice(2).length) {
  const errs = validate(tuning, schema, "tuning");
  console.log(errs.length ? errs.join("\n") : `${FILE}: valid`);
  if (errs.length) process.exitCode = 1;
}
await server.close();
