// Writes a creature drawn in code (tools/creature-mesh/quadruped.js and its species' plan) as a rigged, animated .glb, for
// tools/creature-bake/bake.mjs or any 3D tool: the trial of low-poly creatures on real skeletons (docs/plans/creature-meshes.md).
//   node tools/creature-mesh/make.mjs fox-adult out/fox-adult.glb
// A plan is <species>-<baby|young|adult|legend>, for home's ten: fox, badger, snail, hedgehog, hare, squirrel, marten, stoat, mole,
// dormouse (page.js lists them).
// Needs Playwright's Chromium, as the art tools do (three.js's exporter runs in a page).
import { build } from "esbuild";
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url)), [name, out] = process.argv.slice(2);
if (!name || !out) { console.error("usage: node tools/creature-mesh/make.mjs <plan> <out.glb>"); process.exit(2); }
const require = createRequire(import.meta.url);
const playwright = (() => { try { return require("playwright"); } catch { return require("/opt/node22/lib/node_modules/playwright"); } })();
const bundle = await build({ entryPoints: [path.join(here, "page.js")], bundle: true, format: "iife", write: false, logLevel: "error" });
const browser = await playwright.chromium.launch();
try {
  const page = await browser.newPage(), errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  await page.setContent("<!doctype html><title>creature mesh</title>");
  await page.addScriptTag({ content: bundle.outputFiles[0].text });
  const got = await page.evaluate(n => window.creatureMesh(n), name);
  if (errors.length) throw Error(errors.join("\n"));
  mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  writeFileSync(out, Buffer.from(got.glb, "base64"));
  console.log(`${name}: ${got.triangles} triangles, ${got.bones} bones, clips ${got.clips.join(", ") || "none"} -> ${out}`);
} finally { await browser.close(); }
