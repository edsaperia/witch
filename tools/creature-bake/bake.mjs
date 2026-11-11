// Bakes a rigged, animated glTF model (.glb) into pixel sprites at the game's view: the trial pipeline for creatures made as real
// meshes with real skeletons rather than by the generator (Ed, 2026-11-11: "Okay, how do we set this pipeline up? I think we
// should try it on all the home island creatures"). Nothing in the game reads its output yet.
//   node tools/creature-bake/bake.mjs <model.glb> <out dir> [clip] [height px] [frames]
// Writes, for each heading (towards, away: art/model3d.js YAW) and frame: <clip>-<heading>-<n>.png (lit in three bands with its
// outline, as a hand-drawn frame is: art/overrides/README.md), -albedo.png (its flat colours) and -normal.png (the camera's
// normals: x right, y up, z to us); sheet-<clip>.png, every frame three times its size; and bake.json (size, ground point,
// palette, the model's clips). Leave the clip out to list the model's clips and bake its first.
// HEADINGS=0.6,-0.6 (radians), SS=4 (samples an art pixel, each way), COLOURS=10, FORWARD=z|x (which way the model's head points),
// ZOOM=3 (the sheet's). Needs Playwright's Chromium, as the art tools do.
import { build } from "esbuild";
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const [glb, outDir, clip, height = "137", frames = "8"] = process.argv.slice(2);
if (!glb || !outDir) { console.error("usage: node tools/creature-bake/bake.mjs <model.glb> <out dir> [clip] [height px] [frames]"); process.exit(2); }
const require = createRequire(import.meta.url);
const playwright = (() => { try { return require("playwright"); } catch { return require("/opt/node22/lib/node_modules/playwright"); } })();

const bundle = await build({ entryPoints: [path.join(here, "page.js")], bundle: true, format: "iife", write: false, logLevel: "error" });
const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
try {
  const page = await browser.newPage(), errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  await page.setContent("<!doctype html><title>creature bake</title>");
  await page.addScriptTag({ content: bundle.outputFiles[0].text });
  const headings = (process.env.HEADINGS ?? "0.6,-0.6").split(",").map(Number), names = headings.map(h => (h === 0.6 ? "towards" : h === -0.6 ? "away" : `yaw${h}`));
  const got = await page.evaluate(o => window.creatureBake(o), { glb: readFileSync(glb).toString("base64"), clip, height: +height, frames: +frames, headings,
    ss: +(process.env.SS ?? 4), colours: +(process.env.COLOURS ?? 10), forward: process.env.FORWARD ?? "z", zoom: +(process.env.ZOOM ?? 3) });
  if (errors.length) throw Error(errors.join("\n"));
  mkdirSync(outDir, { recursive: true });
  const save = (name, url) => writeFileSync(path.join(outDir, name), Buffer.from(url.split(",")[1], "base64"));
  for (const f of got.frames) { const stem = `${got.clip ?? "still"}-${names[headings.indexOf(f.yaw)]}-${f.i}`; save(`${stem}.png`, f.lit); save(`${stem}-albedo.png`, f.albedo); save(`${stem}-normal.png`, f.normal); }
  save(`sheet-${got.clip ?? "still"}.png`, got.sheet);
  writeFileSync(path.join(outDir, "bake.json"), JSON.stringify({ model: path.basename(glb), clip: got.clip, clips: got.clips, w: got.w, h: got.h, origin: got.origin, pixelsPerUnit: got.ppu, frames: +frames, headings: names, palette: got.palette }, null, 2) + "\n");
  console.log(`${path.basename(glb)}: ${got.clips.map(c => `${c.name} ${c.seconds.toFixed(2)} s`).join(", ") || "no clips"}`);
  console.log(`baked ${got.clip ?? "still"}: ${got.frames.length} frames of ${got.w}x${got.h} into ${outDir}`);
} finally { await browser.close(); }
