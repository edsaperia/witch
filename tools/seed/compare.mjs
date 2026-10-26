// Same seed, same island in Node and in the browser (rules/seedDigest.ts; Ed, 2026-10-26): the digest's source bundled as it is
// (Vite, library mode), run in Node through Vite's SSR (the tests' way) and in headless Chromium (and Firefox, where Playwright here
// has it), every stage's hash compared; the first stage that differs is the first divergence, and the engines' own Math on fixed
// inputs is compared beside them. Exits 1 on any difference.
//   node tools/seed/compare.mjs [--firefox]
import { build } from "vite";
import { createRequire } from "node:module";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import http from "node:http";
import { openRules } from "../balance/lib.mjs";

const require = createRequire(import.meta.url);
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../.."), out = mkdtempSync(path.join(tmpdir(), "seed-"));
// (the digest alone, one file: not the game's config, whose pages would come with it)
await build({ root, logLevel: "error", configFile: false, define: { __BUILD__: JSON.stringify("seed") }, build: { outDir: out, emptyOutDir: true, lib: { entry: path.join(root, "src/rules/seedDigest.ts"), formats: ["es"], fileName: () => "seed.js" }, rollupOptions: { output: { inlineDynamicImports: true } }, minify: false } });

const R = await openRules();
const node = await R.load("/src/rules/seedDigest.ts").then(m => ({ islands: m.digestIslands(), stages: m.seedDigest(), math: m.mathDigest(), engine: `node ${process.version}` }));
await R.close();

const js = readFileSync(path.join(out, "seed.js"), "utf8");
const server = http.createServer((req, res) => { if (req.url === "/seed.js") { res.writeHead(200, { "Content-Type": "text/javascript" }); res.end(js); } else { res.writeHead(200, { "Content-Type": "text/html" }); res.end("<!doctype html><title>seed</title>"); } });
await new Promise(r => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}/`;
const engines = [["chromium", playwright.chromium]];
if (process.argv.includes("--firefox")) engines.push(["firefox", playwright.firefox]);
let bad = 0;
const show = (name, a, b) => {
  for (const part of ["stages", "math"]) {
    const keys = Object.keys(a[part]), diff = keys.filter(k => a[part][k] !== b[part]?.[k]);
    console.log(`${name} ${part}: ${diff.length ? `DIFFER at ${diff.join(", ")} (first: ${diff[0]})` : `all ${keys.length} match`}`);
    if (part === "stages" && diff.length) bad++;
  }
};
console.log(`node: ${node.engine}; islands ${JSON.stringify(node.islands)}`);
for (const [name, type] of engines) {
  let b;
  try { b = await type.launch(); } catch (e) { console.log(`${name}: can't launch here (${String(e.message).split("\n")[0]})`); continue; }
  const p = await b.newPage();
  await p.goto(url);
  const got = await p.evaluate(async () => { const m = await import("/seed.js"); return { islands: m.digestIslands(), stages: m.seedDigest(), math: m.mathDigest(), engine: navigator.userAgent }; });
  await b.close();
  console.log(`${name}: ${got.engine}`);
  if (JSON.stringify(got.islands) !== JSON.stringify(node.islands)) { console.log(`${name}: picked other islands ${JSON.stringify(got.islands)}`); bad++; }
  show(name, node, got);
}
server.close();
if (bad) { console.error("same seed, different island: see above"); process.exit(1); }
console.log("same seed, same island: every stage matches");
