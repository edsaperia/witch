// The start screen (Ed's sketch, 2026-10-06): the built game (DIST, default dist/) at a laptop's and Ed's window sizes, the
// creator open: the tapestry with its tabs on the left, her room in the middle, "Coven Rush" top right, the party spell's scroll
// bottom right; then the next tab (E), the controls (?) and the options tab. Nothing comes before her room (Ed, 2026-10-06:
// "can we skip it and go straight to the bedroom?"): fails if the old start card shows at first paint, or on a page error.
// Writes start-, tab-, controls- and options-<w>x<h>.png.
//   npm run build && node tools/smoke/start-screen.cjs [out dir]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/start-screen"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    for (const [w, h, dpr] of [[1280, 720, 1], [1900, 1240, 1]]) {
      const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
      page.on("pageerror", e => errors.push(e.message));
      await page.goto(`http://127.0.0.1:${server.address().port}/?seed=123`, { waitUntil: "domcontentloaded" });
      const card = await page.evaluate(() => getComputedStyle(document.getElementById("start")).display);
      if (card !== "none") throw new Error(`the old start card shows first (${card})`);
      await page.waitForSelector("#creator-start", { timeout: 120000 });
      await page.waitForTimeout(6000);
      await page.screenshot({ path: path.join(outDir, `start-${w}x${h}.png`) });
      // the scroll sleeps, rolled shut, until the forest's grown (Enter casts nothing yet), then unrolls
      const early = await page.evaluate(() => ({ ready: window.__creator.progress().ready, awake: document.getElementById("creator-start").hasAttribute("data-awake") }));
      if (!early.ready && early.awake) throw new Error("the scroll is awake before the forest is ready");
      if (!early.ready) { await page.keyboard.press("Enter"); await page.waitForTimeout(200); if (await page.evaluate(() => window.__creator.scroll.casting)) throw new Error("the scroll cast before the forest was ready"); }
      await page.waitForSelector("#creator-start[data-awake]", { timeout: 900000 });
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(outDir, `ready-${w}x${h}.png`) });
      await page.keyboard.press("KeyE"); await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(outDir, `tab-${w}x${h}.png`) });
      await page.keyboard.press("Shift+Slash"); await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(outDir, `controls-${w}x${h}.png`) });
      await page.click('[data-tab="options"]'); await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(outDir, `options-${w}x${h}.png`) });
      await page.close();
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
