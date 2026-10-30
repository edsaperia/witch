// Real-rules reports and restartable matched experiments. No rule/tuning changes.
// node tools/balance/report.mjs runs --seeds 200 --bots sloppy,crude,skilled --islands home --bpms 100,120,160,200 --bags satchel --time 4200 --out balance.jsonl --build v5655
// node tools/balance/report.mjs stuns --species all --levels 1,2 --bags all --bpms 100,120,160,200 --seeds 2 --time 60 --out stuns.jsonl --build v5655
// node tools/balance/report.mjs report --out balance.jsonl
// Repeating an identical experiment resumes it; incompatible source/options are refused. One CPU worker, no browser.
import { appendFileSync, existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { arg, list } from "./lib.mjs";
import { SCHEMA, seedAt, caseKey, markdown } from "./report-core.mjs";
import { runtime } from "./report-runtime.mjs";

const mode = process.argv[2], file = arg("out", "balance.jsonl");
if (!["runs", "stuns", "report"].includes(mode)) throw Error("Use runs, stuns or report; see this file's header for commands.");
const records = existsSync(file) ? readFileSync(file, "utf8").trim().split("\n").filter(Boolean).map(JSON.parse) : [];
if (mode === "report") {
  if (!records[0]?.manifest) throw Error("No experiment manifest");
  console.log(markdown(records.slice(1), records[0].manifest));
} else {
  const R = await runtime();
  try {
    const positive = (name, fallback, integer = false) => {
      const n = Number(arg(name, fallback)); if (!(n > 0) || !Number.isFinite(n) || (integer && !Number.isInteger(n))) throw Error(`Invalid --${name}`); return n;
    };
    const select = (name, fallback, allowed) => {
      const s = arg(name, fallback), xs = s === "all" ? allowed : list(s);
      if (new Set(xs).size !== xs.length || xs.some(x => !allowed.includes(x))) throw Error(`Invalid --${name}; allowed: ${allowed.join(",")}`);
      return xs;
    };
    const skip = Number(arg("skip", 0)); if (!Number.isInteger(skip) || skip < 0) throw Error("Invalid --skip");
    const count = positive("seeds", 2, true), limit = positive("time", mode === "runs" ? 4200 : 60), distance = positive("distance", 10);
    const seeds = Array.from({ length: count }, (_, i) => seedAt(i + skip));
    const bags = select("bags", mode === "runs" ? "satchel" : "all", R.bags);
    const bpms = select("bpms", "100,120,160,200", ["100", "120", "160", "200"]).map(Number);
    const bots = select("bots", "sloppy,crude,skilled", R.bots);
    const islands = select("islands", "home", R.islands);
    const species = select("species", "all", R.species), levels = select("levels", "1,2", ["0", "1", "2", "3"]).map(Number);
    // Hash every rule/config/art source and the tool itself: resumed work must not silently mix builds or local edits.
    const root = fileURLToPath(new URL("../..", import.meta.url));
    const hash = createHash("sha256");
    function addTree(dir) {
      for (const e of readdirSync(resolve(root, dir), { withFileTypes: true }).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)) {
        const path = resolve(root, dir, e.name);
        if (e.isDirectory()) addTree(relative(root, path));
        else if (/\.(ts|mjs|js|json)$/.test(e.name)) { hash.update(relative(root, path).replaceAll("\\", "/")); hash.update(readFileSync(path, "utf8").replace(/\r\n/g, "\n")); }
      }
    }
    for (const dir of ["src/rules", "src/bots", "config", "art", "tools/balance"]) addTree(dir);
    const commit = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
    const manifest = { schema: SCHEMA, mode, commit, build: arg("build", "local source (no published version asserted)"), fingerprint: hash.digest("hex"), fingerprintFormat: "lf-ordinal-v1", step: R.STEP, limit, distance, seeds, bags, bpms, ...(mode === "runs" ? { bots, islands } : { species, levels }), loadout: { hat: "none", broomParts: [], ownedFinds: {} } };
    if (records.length && JSON.stringify(records[0].manifest) !== JSON.stringify(manifest)) throw Error("Experiment manifest differs; choose a new --out file. Existing results preserved.");
    if (!records.length) appendFileSync(file, JSON.stringify({ manifest }) + "\n");
    const rows = records.slice(1), done = new Set(rows.map(caseKey));
    if (done.size !== rows.length) throw Error("Duplicate case in existing results");
    const cases = [];
    for (const seed of seeds) for (const bpm of bpms) for (const bag of bags) {
      if (mode === "runs") for (const island of islands) for (const bot of bots) cases.push({ seed, bpm, bag, island, bot });
      else for (const sp of species) for (const level of levels) cases.push({ seed, bpm, bag, species: sp, level });
    }
    const start = performance.now(); let completed = 0;
    for (const c of cases) {
      if (done.has(caseKey(c))) continue;
      const at = performance.now(), row = mode === "runs" ? R.run(c, limit) : R.stun(c, limit, distance);
      appendFileSync(file, JSON.stringify(row) + "\n"); rows.push(row); completed++;
      const elapsed = (performance.now() - start) / 1000;
      process.stderr.write(`${rows.length}/${cases.length} ${caseKey(c)}: ${row.outcome ?? (row.stunned ? "stunned" : "timeout")} at ${row.end.toFixed(1)}s; wall ${((performance.now() - at) / 1000).toFixed(1)}s; remaining estimate ${((cases.length - rows.length) * elapsed / completed / 3600).toFixed(2)}h\n`);
    }
    const md = markdown(rows, manifest); writeFileSync(file + ".md", md); console.log(md);
  } finally { await R.close(); }
}
