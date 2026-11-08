// The samples' check (Ed, 2026-10-11: "a CI check that every sample has an approved licence"; in npm test,
// src/samples.test.ts): node tools/samples/check.mjs. Fails on a file under samples/ not in the manifest or an entry with no
// file, a licence not approved (CC0, public domain, or CC-BY with a credit line; never NC, never anything else), an entry
// with no source or author, the credits out of date, or the size budget passed (BUDGET in all, KIT_BUDGET for the first
// kit). Our own generated audio (OWN_WORK: the singer's notes rendered with Chimera, Ed 2026-11-08) is accepted under its own
// licence only when its entry says it was generated, by that tool, at a pinned commit, with the tool's credit. Reads only
// what's committed: no network.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { creditsText } from "./credits.mjs";

/** Licences we may ship (SPDX ids). CC-BY needs a credit line, which the manifest always has. */
export const APPROVED = ["CC0-1.0", "PD", "CC-BY-3.0", "CC-BY-4.0"];
/** Our own audio, rendered by us with a tool (not downloaded; Ed, 2026-11-08: the singer's notes by Chimera): the one licence it
 *  ships under, and what its manifest entry must show (tools/samples/build.mjs, a `generated` source): the tool, its MIT licence,
 *  its repository at a pinned commit (the source), and a credit line naming the tool and its author. Nothing else is accepted. */
export const OWN_WORK = { licence: "own work, rendered with Chimera (MIT)", tool: "Chimera", toolAuthor: "jamesondh", toolLicence: "MIT", url: "https://github.com/jamesondh/chimera-vocal-synth" };
/** Why an own-work entry isn't accepted (null if it is). */
export function ownWorkProblem(f) {
  const g = f.generated, O = OWN_WORK;
  if (!g || g.tool !== O.tool || g.toolAuthor !== O.toolAuthor || g.toolLicence !== O.toolLicence || g.url !== O.url) return `own-work licence without a ${O.tool} (${O.toolLicence}) render recorded in its entry`;
  if (!/^[0-9a-f]{7,40}$/.test(g.commit ?? "") || f.source !== `${O.url}/tree/${g.commit}`) return `own-work licence without ${O.tool}'s repository at a pinned commit as its source`;
  if (!f.credit?.includes(O.tool) || !f.credit.includes(O.toolAuthor) || !f.credit.includes(O.toolLicence)) return `own-work licence with no credit line for ${O.tool} by ${O.toolAuthor} (${O.toolLicence})`;
  return null;
}
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
    else if (f.licence === OWN_WORK.licence) { const why = ownWorkProblem(f); if (why) errs.push(`samples/${f.file}: ${why}`); }
    else if (!APPROVED.includes(f.licence)) errs.push(`samples/${f.file}: licence "${f.licence}" not approved (${APPROVED.join(", ")}, or ${OWN_WORK.licence} for our own renders)`);
    if (f.generated && f.licence !== OWN_WORK.licence) errs.push(`samples/${f.file}: generated, but licensed "${f.licence}" (our own renders are "${OWN_WORK.licence}")`);
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
