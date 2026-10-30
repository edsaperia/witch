// Cloud diagnostic snapshot, never a branch merge or a copied engine implementation.
// git fetch origin codex/creature-graph first; pass the exact coordinator-approved SHA.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const sha = process.argv[2];
if (!/^[0-9a-f]{40}$/.test(sha || "")) throw Error("Supply one exact 40-character model commit");
const verified = execFileSync("git", ["rev-parse", `${sha}^{commit}`], { encoding: "utf8" }).trim();
if (verified !== sha) throw Error("Model commit did not resolve exactly");
const root = resolve("previews", `roster-model-${sha}`);
mkdirSync(root, { recursive: true });
const archive = execFileSync("git", ["archive", "--format=tar", sha, "art"], { maxBuffer: 64 * 1024 * 1024 });
execFileSync("tar", ["-xf", "-", "-C", root], { input: archive, windowsHide: true });
writeFileSync(resolve(root, "model-source.json"), JSON.stringify({ sha, purpose: "Read-only source snapshot for roster cloud comparisons; no branch merge" }, null, 2) + "\n");
console.log(`Prepared /previews/roster-model-${sha}/art from exact ${sha}`);
