// The tools' inventory (overnight programme, 2026-10-07: "a tools/ inventory; delete stale scripts and add a README per tool
// directory"): writes tools/README.md (every directory, a line each) and a README.md in each tools/ directory that has none
// of its own (bench/ keeps its hand-written one), from each script's own header comment: its first sentence, and its usage
// line (a comment line starting `node `, `npm ` or `DIST=`). Run it again after adding or changing a tool; --check exits 1
// if any README it writes is out of date (or a script has no header comment).
//   node tools/inventory.mjs [--check]
import fs from "node:fs";
import path from "node:path";

const ROOT = "tools", check = process.argv.includes("--check"), MARK = "<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->";
const SCRIPT = /\.(mjs|cjs|js|ts)$/;
let stale = 0;
const header = file => {
  const lines = fs.readFileSync(file, "utf8").split("\n"), out = [];
  for (const l of lines) { if (/^#!/.test(l) || /^\s*$/.test(l) && !out.length) continue; const m = l.match(/^\s*(?:\/\/|\*|\/\*\*?)\s?(.*)$/); if (!m) break; if (m[1].trim() !== "*/") out.push(m[1]); }
  const text = out.filter(l => !/^\s*(node|npm|DIST=|[A-Z_]+=)/.test(l.trim())).join(" ").replace(/\s+/g, " ").trim();
  const usage = out.map(l => l.trim()).filter(l => /^(node|npm|DIST=|[A-Z_]+=\S* (node|npm))/.test(l));
  // (the first sentence, its asides in brackets left out; at most about 260 characters)
  let flat = "", depth = 0;
  for (const ch of text) { if (ch === "(") depth++; else if (ch === ")") { depth = Math.max(0, depth - 1); continue; } if (!depth) flat += ch; }
  flat = flat.replace(/\s+([,.;:])/g, "$1").replace(/\s+/g, " ").trim();
  const sentence = flat.match(/^(.{20,}?[.!?])(\s|$)/)?.[1] ?? flat;
  const first = sentence.length > 260 ? sentence.slice(0, 257).replace(/\s\S*$/, "") + "…" : sentence;
  return { first: first.trim(), usage };
};
const dirs = fs.readdirSync(ROOT, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name).sort(), index = [];
for (const d of dirs) {
  const dir = path.join(ROOT, d), files = fs.readdirSync(dir).filter(f => SCRIPT.test(f) && fs.statSync(path.join(dir, f)).isFile()).sort();
  const others = fs.readdirSync(dir).filter(f => !SCRIPT.test(f) && f !== "README.md");
  if (!files.length && !others.length) continue; // (an emptied directory: nothing to list)
  const own = fs.existsSync(path.join(dir, "README.md")) && !fs.readFileSync(path.join(dir, "README.md"), "utf8").includes(MARK);
  const rows = files.map(f => { const h = header(path.join(dir, f)); if (!h.first) { console.error(`no header comment: ${dir}/${f}`); stale++; } return { f, ...h }; });
  index.push(`- [\`${d}/\`](${d}/README.md): ${rows.length} script${rows.length === 1 ? "" : "s"}${rows[0] ? ` — ${rows.map(r => r.f).join(", ")}` : ""}`);
  if (own) continue;
  const md = [`# tools/${d}`, "", MARK, "", ...rows.flatMap(r => [`## \`${r.f}\``, "", r.first || "(no header comment)", "", ...(r.usage.length ? ["```", ...r.usage, "```", ""] : [])]), ...(others.length ? ["## Also here", "", ...others.map(o => `- \`${o}\``), ""] : [])].join("\n");
  write(path.join(dir, "README.md"), md);
}
write(path.join(ROOT, "README.md"), ["# tools", "", MARK, "", "Scripts for building, checking and measuring the game, run from the repository root. Each directory has a README listing its scripts (from their own header comments, with how to run them).", "", ...index, ""].join("\n"));
function write(f, s) { const was = fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null; if (was === s) return; if (check) { console.error(`out of date: ${f}`); stale++; return; } fs.writeFileSync(f, s); console.log(`wrote ${f}`); }
if (check && stale) process.exit(1);
