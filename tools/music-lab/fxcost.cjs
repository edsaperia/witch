// The voice effects' own cost, offline (tools/music-lab/fxcost.ts): node tools/music-lab/fxcost.cjs
// Prints each variant's load (render time over audio time: 0.10 is a tenth of the audio thread), the best of three.
const path = require("path"), fs = require("fs"), os = require("os");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const ROOT = path.resolve(__dirname, "../..");
(async () => {
  const { build } = await import(path.join(ROOT, "node_modules/esbuild/lib/main.js"));
  const r = await build({ entryPoints: [path.join(__dirname, "fxcost.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", absWorkingDir: ROOT });
  const file = path.join(os.tmpdir(), `witch-fxcost-${process.pid}.html`);
  fs.writeFileSync(file, `<!doctype html><meta charset="utf-8"><body><script>${r.outputFiles[0].text.replace(/<\/script/gi, "<\\/script")}</script>`);
  const browser = await playwright.chromium.launch(), page = await browser.newPage(), errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  await page.goto("file://" + file);
  const res = await page.evaluate(() => window.fxCost());
  for (const [k, v] of Object.entries(res)) console.log(`  ${k.padEnd(44)} ${v.toFixed(3)}`);
  if (errors.length) console.log("errors:", errors.join(" | "));
  await browser.close(); fs.unlinkSync(file);
})().catch(e => { console.error(e); process.exit(1); });
