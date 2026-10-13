// The game's split registries besides the creatures' (tools/creatures.mjs): one small file each, assembled by the readers, so
// builders stop colliding on one shared file (Ed, 2026-10-13). Each domain has the same verbs:
//   node tools/data.mjs decisions list|check|adopt     the pause page's test sliders and the decisions panel (src/ui/decisions.ts):
//                                                      config/decisions/<pr>-<group>.json, one fragment a pull request's group,
//                                                      collected newest PR first; adopt moves entries pasted back into
//                                                      config/decisions.json's array (a merge) into their fragments
//   node tools/data.mjs adopt                           every domain's adopt, the creatures' too
//   node tools/data.mjs check                           every domain's check
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

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

const DOMAINS = { decisions };
if (domain === "adopt" || domain === "check") {
  execFileSync("node", ["tools/creatures.mjs", domain], { cwd: ROOT, stdio: "inherit" });
  let bad = [];
  for (const [name, run] of Object.entries(DOMAINS)) bad.push(...run(domain).map(p => `${name}: ${p}`));
  if (bad.length) { console.error(bad.join("\n")); process.exit(1); }
} else if (DOMAINS[domain]) {
  const bad = DOMAINS[domain](verb);
  if (bad.length) { console.error(bad.join("\n")); process.exit(1); }
} else { console.error("usage: node tools/data.mjs decisions list|check|adopt  ·  node tools/data.mjs adopt|check"); process.exit(2); }
