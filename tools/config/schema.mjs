// The config schemas (housekeeping, issue #122): writes and checks config/schema/*.schema.json (the
// tuning file's, and the others' listed in src/rules/configSchemas.ts) and the knob reference
// config/KNOBS.md (src/rules/schema.ts and src/rules/knobDocs.ts do the work; the knobs' words are config/knobs/*.json).
//   node tools/config/schema.mjs --check     validate the config files against their schemas
//   node tools/config/schema.mjs --docs      rewrite config/KNOBS.md and the tuning schema's descriptions from config/knobs/*.json
//   node tools/config/schema.mjs --init      (re)infer every schema from its file as it stands, with TUNING_OVER and CONFIGS' records and choices
//   node tools/config/schema.mjs --add       add the knobs the file has and the schema lacks (inferred), drop the ones it no longer has, keep the rest
// After adding a knob to config/tuning.json: its entry in config/knobs/<section>.json, --add (or edit the schema), then --docs.
import { createServer } from "vite";
import { readFileSync, writeFileSync } from "node:fs";

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error", optimizeDeps: { noDiscovery: true, include: [] } });
const { validate, inferSchema } = await server.ssrLoadModule("/src/rules/schema.ts");
const { knobsReference, describeSchema } = await server.ssrLoadModule("/src/rules/knobDocs.ts");
const { TUNING_OVER } = await server.ssrLoadModule("/src/rules/tuningSchema.ts");
const { CONFIGS } = await server.ssrLoadModule("/src/rules/configSchemas.ts");
const { configData } = await server.ssrLoadModule("/src/rules/configData.ts"); // (combat, movement with their per-species entries from art/creatures/<id>/creature.js)
const FILE = "config/tuning.json", SCHEMA = "config/schema/tuning.schema.json", DOCS = "config/KNOBS.md";
const tuning = JSON.parse(readFileSync(FILE, "utf8"));
const write = (p, o) => writeFileSync(p, JSON.stringify(o, null, 2) + "\n");
const has = f => process.argv.includes(`--${f}`);

if (has("init")) {
  write(SCHEMA, inferSchema(tuning, TUNING_OVER));
  for (const c of CONFIGS) write(c.schema, inferSchema(configData(c.name, c.file), c.over, "", new Set(c.records)));
}
if (has("add")) {
  // New keys (inferred) join each schema; what's there, hand edits included, stays, for the keys the file still has.
  // (Knobs the file no longer has leave the schema.)
  const merge = (a, b) => { if (a?.properties && b?.properties) { const props = {}; for (const k of Object.keys(b.properties)) props[k] = a.properties[k] ? merge(a.properties[k], b.properties[k]) : b.properties[k]; a.properties = props; a.required = b.required; } return a; };
  write(SCHEMA, merge(JSON.parse(readFileSync(SCHEMA, "utf8")), inferSchema(tuning, TUNING_OVER)));
  for (const c of CONFIGS) write(c.schema, merge(JSON.parse(readFileSync(c.schema, "utf8")), inferSchema(configData(c.name, c.file), c.over, "", new Set(c.records))));
}
let schema = JSON.parse(readFileSync(SCHEMA, "utf8"));
if (has("docs")) {
  const index = JSON.parse(readFileSync("config/knobs/index.json", "utf8"));
  const sections = index.order.map(n => JSON.parse(readFileSync(`config/knobs/${n}.json`, "utf8")));
  schema = describeSchema(schema, sections);
  write(SCHEMA, schema);
  writeFileSync(DOCS, knobsReference(tuning, schema, index, sections));
}
if (has("check") || !process.argv.slice(2).length) {
  for (const [file, value, sch, name] of [[FILE, tuning, schema, "tuning"], ...CONFIGS.map(c => [c.file, configData(c.name, c.file), JSON.parse(readFileSync(c.schema, "utf8")), c.name])]) {
    const errs = validate(value, sch, name);
    console.log(errs.length ? errs.join("\n") : `${file}: valid`);
    if (errs.length) process.exitCode = 1;
  }
}
await server.close();
