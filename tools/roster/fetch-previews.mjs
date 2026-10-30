// Read already-published review artifacts; does not generate or alter image content.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
const out = "previews/ed/roster/downloaded";
mkdirSync(out, { recursive: true });
const catalogue = process.argv.includes("--catalogue");
const files = catalogue ? Array.from({ length: 8 }, (_, i) => `baseline-${String(i + 1).padStart(2, "0")}.png`) : (process.argv.includes("--beetle") ? ["beetle"] : ["bear", "arcticfox", "snowleopard"]).flatMap(id => ["studio", "night"].map(light => `${id}-${light}-native.png`));
for (const file of files) {
  const path = catalogue ? "previews/ed/roster/catalogue/catalogue" : "previews/ed/roster/roster";
  const endpoint = `repos/edsaperia/witch/contents/${path}/${file}?ref=claude%2Fed-shots`;
  const data = JSON.parse(execFileSync("gh", ["api", endpoint], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 }));
  if (data.encoding !== "base64" || !data.content) throw Error(`No downloadable content: ${file}`);
  writeFileSync(`${out}/${file}`, Buffer.from(data.content, "base64"));
  console.log(`${file}: ${data.sha}`);
}
