// The samples' check (Ed, 2026-10-11: "a CI check that every sample has an approved licence"; in npm test,
// src/samples.test.ts): node tools/samples/check.mjs. Fails on a file under samples/ not in the manifest or an entry with no
// file, a licence not approved (CC0, public domain, or CC-BY with a credit line; never NC, never anything else), an entry
// with no source or author, the credits out of date, or the size budget passed (BUDGET in all, KIT_BUDGET for the first
// kit). Reads only what's committed: no network.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { creditsText } from "./credits.mjs";

/** Licences we may ship (SPDX ids). CC-BY needs a credit line, which the manifest always has. */
export const APPROVED = ["CC0-1.0", "PD", "CC-BY-3.0", "CC-BY-4.0"];
/** Bytes in all, and for the first kit (samples/vcsl). */
export const BUDGET = 3 * 1024 * 1024, KIT_BUDGET = 300 * 1024;
/** Audio files under samples/ (what must be in the manifest). */
const AUDIO = /\.(ogg|opus|mp3|wav|flac|m4a|aac|webm)$/i;

export function checkSamples(root) {
  const dir = join(root, "samples"), errs = [];
  if (!existsSync(dir)) return errs;
  const m = JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8")), listed = new Set(m.files.map(f => f.file));
  const walk = d => readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]);
  const audio = walk(dir).filter(p => AUDIO.test(p)).map(p => relative(dir, p).split("\\").join("/"));
  for (const a of audio) if (!listed.has(a)) errs.push(`samples/${a}: not in samples/manifest.json`);
  let total = 0, kit = 0;
  for (const f of m.files) {
    const p = join(dir, f.file);
    if (!existsSync(p)) { errs.push(`samples/${f.file}: in the manifest, but no file`); continue; }
    const size = statSync(p).size;
    total += size; if (f.file.startsWith("vcsl/")) kit += size;
    if (/(^|-)NC(-|$)/i.test(f.licence ?? "")) errs.push(`samples/${f.file}: a non-commercial licence (${f.licence})`);
    else if (!APPROVED.includes(f.licence)) errs.push(`samples/${f.file}: licence "${f.licence}" not approved (${APPROVED.join(", ")})`);
    if (!f.source || !f.author) errs.push(`samples/${f.file}: no source or author`);
    if (/^CC-BY/.test(f.licence ?? "") && !f.credit) errs.push(`samples/${f.file}: CC-BY with no credit line`);
  }
  if (total > BUDGET) errs.push(`samples: ${(total / 1024).toFixed(0)} KB, over the ${(BUDGET / 1024).toFixed(0)} KB budget`);
  if (kit > KIT_BUDGET) errs.push(`samples/vcsl: ${(kit / 1024).toFixed(0)} KB, over the first kit's ${(KIT_BUDGET / 1024).toFixed(0)} KB`);
  const credits = join(dir, "CREDITS.md");
  if (!existsSync(credits) || readFileSync(credits, "utf8") !== creditsText(m)) errs.push("samples/CREDITS.md: out of date (node tools/samples/credits.mjs)");
  return errs;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const errs = checkSamples(resolve(dirname(fileURLToPath(import.meta.url)), "../.."));
  for (const e of errs) console.log(`FAIL ${e}`);
  console.log(errs.length ? `${errs.length} problems` : "samples ok");
  process.exit(errs.length ? 1 : 0);
}
