// Bounded canonical cloud diagnostic; temporarily changes only a disposable checkout,
// runs one existing species file without changing assertions, then restores every byte.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
if (process.platform === "win32" || !(process.env.GITHUB_ACTIONS === "true" || process.env.WITCH_CLOUD_CPU === "1")) throw Error("Canonical cloud CPU only");
const layer = process.argv[2] ?? "off";
if (!["off", "no-waiting", "no-teams", "no-withdrawal", "no-legend"].includes(layer)) throw Error("Unknown diagnostic layer");
const files = ["config/packs.json", "src/rules/combat.ts", "src/rules/combat/packs.ts"];
const originals = new Map(files.map(file => [file, fs.readFileSync(file)]));
const replace = (file, from, to) => {
  const source = fs.readFileSync(file, "utf8");
  if (!source.includes(from)) throw Error(`Diagnostic anchor missing: ${file}`);
  fs.writeFileSync(file, source.replace(from, to));
};
const dir = path.resolve("previews/combat-spacing/diagnose");
fs.mkdirSync(dir, { recursive: true });
const sha = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" });
if (sha.status !== 0) throw Error("Cannot identify diagnostic source");
try {
  if (layer === "off" || layer === "no-withdrawal") {
    const data = JSON.parse(originals.get(files[0]).toString("utf8"));
    if (layer === "off") data.spacing.on = false;
    else for (const profile of [data.spacing.preferences.default, ...Object.values(data.spacing.preferences.species)]) { profile.withdraw = 2; profile.rejoin = 2; }
    fs.writeFileSync(files[0], JSON.stringify(data));
  }
  if (layer === "no-waiting") replace(files[1], "const spacing = spacingOn(t);", "const spacing = false;");
  if (layer === "no-teams") {
    replace(files[2], "const coordinated = spacingOn(w.t);", "const coordinated = false;");
    replace(files[2], "if (spacingOn(w.t) && (!team", "if (false && (!team");
  }
  if (layer === "no-legend") replace(files[1], "if (spacing) for (const other of w.active)", "if (false) for (const other of w.active)");
  const result = spawnSync("npx", ["vitest", "run", "src/rules/species.test.ts", "--maxWorkers=1", "--reporter=json", `--outputFile=${path.join(dir, `${layer}.json`)}`], { stdio: "inherit", timeout: 10 * 60 * 1000 });
  fs.writeFileSync(path.join(dir, `${layer}-source.json`), JSON.stringify({ source: sha.stdout.trim(), layer, status: result.status, error: result.error?.message, scope: "species.test.ts only; temporary layer isolation, not a release configuration or difficulty comparison" }, null, 2));
  process.exitCode = result.status ?? 1;
} finally {
  for (const [file, bytes] of originals) fs.writeFileSync(file, bytes);
}
