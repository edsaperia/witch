// Cloud only: eight bounded baseline sheets for the complete visual audit.
// No invented art, no changes to models; uses the repository's standard preview.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { GENOMES } from "../../art/genome/index.js";
const out = process.argv[2] || "previews/ed/roster/catalogue";
mkdirSync(out, { recursive: true });
const sha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const sheets = [];
for (let i = 0; i < GENOMES.length; i += 8) {
  const ids = GENOMES.slice(i, i + 8).map(g => g.id), file = `${out}/baseline-${String(i / 8 + 1).padStart(2, "0")}.png`;
  const args = ["art/preview.mjs", "lineup", ids.join(","), file, "1"];
  execFileSync(process.execPath, args, { stdio: "inherit", env: { ...process.env, STYLE: JSON.stringify({ artStyle: "bold", pixel: 3 }), LEVELS: "0,1,2,3", FACINGS: "towards", PER: "1", NIGHT: "", TOP: "", GEN: "" } });
  sheets.push({ file, ids, arguments: args });
}
writeFileSync(`${out}/manifest.json`, JSON.stringify({ sha, purpose: "Current baseline only, native art pixels, studio, towards; not an in-game capture or full multi-heading acceptance", sheets }, null, 2) + "\n");
