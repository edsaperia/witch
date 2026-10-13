// The flora's baseline fingerprints (art/flora/fingerprint.mjs), one file a species under art/flora/baseline/ (bush.json the bushes'),
// so builders adding species don't collide in one file: readBaseline() merges them (and an old one-file baseline.json a merge brings
// back, over the folder's), writeBaseline(fp) splits a set into them (a species nothing draws now has its file emptied, to delete).
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const DIR = fileURLToPath(new URL("./baseline/", import.meta.url)), OLD = fileURLToPath(new URL("./baseline.json", import.meta.url));
export const BASELINE_DIR = DIR, OLD_BASELINE = OLD;
export function readBaseline() {
  const out = {};
  if (existsSync(DIR)) for (const f of readdirSync(DIR).filter(f => f.endsWith(".json")).sort()) Object.assign(out, JSON.parse(readFileSync(join(DIR, f), "utf8")));
  if (existsSync(OLD)) Object.assign(out, JSON.parse(readFileSync(OLD, "utf8")));
  return out;
}
export function writeBaseline(fp) {
  mkdirSync(DIR, { recursive: true });
  const by = new Map();
  for (const [k, v] of Object.entries(fp)) { const id = k.split("/")[0]; if (!by.has(id)) by.set(id, {}); by.get(id)[k] = v; }
  for (const f of readdirSync(DIR)) if (f.endsWith(".json") && !by.has(f.slice(0, -5))) writeFileSync(join(DIR, f), "{}\n"), console.log(`art/flora/baseline/${f}: nothing draws it now (emptied; delete it)`);
  for (const [id, o] of by) writeFileSync(join(DIR, `${id}.json`), JSON.stringify(o, null, 0).replace(/,"/g, ',\n"') + "\n");
  return by.size;
}
