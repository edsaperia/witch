// Ed's decisions panel (src/ui/decide.ts): the built game (DIST, default dist/) at 1280×720 with ?decide; saves the panel open,
// with a slider and a choice changed (the changed mark), and checks Confirm opens a GitHub new-issue link labelled decision and
// copy writes the same line. Fails on a page error.  npm run build && node tools/smoke/decide.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/decide", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, permissions: ["clipboard-read", "clipboard-write"] });
    const page = await ctx.newPage();
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&decide`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    await page.screenshot({ path: path.join(outDir, "panel.png") });
    // a slider and a live switch changed
    await page.evaluate(() => { const r = document.querySelector('#decide .d[data-id="growth"] input'); r.value = "0.75"; r.dispatchEvent(new Event("input", { bubbles: true })); });
    await page.click('#decide .d[data-id="glide"] .opt[data-v="camera"]');
    const got = await page.evaluate(() => ({ perWave: window.witch.game.tuning.population.growth.perWave, url: location.search }));
    console.log("after change:", JSON.stringify(got));
    if (got.perWave !== 0.75 || !/d_growth=0.75/.test(got.url) || !/glide=camera/.test(got.url)) throw new Error("a change didn't apply");
    await page.screenshot({ path: path.join(outDir, "changed.png") });
    // Confirm: a new tab on GitHub's new-issue page, labelled decision
    // (window.open recorded rather than followed: a headless run may not reach GitHub)
    await page.evaluate(() => { window.__opened = []; window.open = (u) => { window.__opened.push(String(u)); return null; }; });
    await page.click('#decide .d[data-id="growth"] .confirm');
    const url = (await page.evaluate(() => window.__opened[0])) || "";
    console.log("confirm opens:", decodeURIComponent(url).slice(0, 160), "…");
    if (!url.startsWith("https://github.com/edsaperia/witch/issues/new?labels=decision&title=Decision")) throw new Error("Confirm didn't open the issue link");
    await page.click('#decide .d[data-id="growth"] .copy');
    await page.waitForTimeout(300);
    console.log("copy:", (await page.evaluate(() => navigator.clipboard.readText().catch(() => "(no clipboard)"))).slice(0, 120));
    await page.screenshot({ path: path.join(outDir, "confirmed.png"), clip: { x: 980, y: 50, width: 300, height: 640 } });
    await page.keyboard.press("F2");
    await page.screenshot({ path: path.join(outDir, "closed.png") });
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})();
