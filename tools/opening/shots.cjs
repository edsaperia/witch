// The new opening in the built game (app/opening.ts; Ed, 2026-10-20, previews/ed/opening-mock/ on claude/ed-shots), a shot per beat
// into <out dir>: the first load on the sea chart (?opening=chart: only home unlocked on a first game, a fresh profile), its corner's
// What's new and Options, home chosen (Sail home: the boot's own night, app/opening.ts divesHome), the chart's
// dive on into the treehouse and her bedroom, where she wakes. Fails on a page error, the creator's bedroom shown, no sail, or her
// anywhere but her bedroom.
// Run `npm run build` first. Playwright from the machine's global install.
//   node tools/opening/shots.cjs [out dir] (default previews/opening/)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/opening"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], fail = m => { throw new Error(m); };
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    const shot = async name => { await page.screenshot({ path: path.join(out, name), timeout: 300000 }); log("shot", name); };
    await page.goto(`http://127.0.0.1:${server.address().port}/?opening=chart&quick=1&timing=1`);
    await page.waitForSelector("#chart-overlay .chart-view", { timeout: 600000 });
    log("the chart is up");
    if (await page.evaluate(() => window.__creator?.open)) fail("the bedroom opened on the opening's first load");
    await page.waitForFunction(() => performance.getEntriesByName("chart:island1").length > 0, null, { timeout: 900000, polling: 1000 }).catch(() => log("(no first island yet)"));
    await page.waitForTimeout(3000);
    await shot("01-chart.png");
    const corner = await page.$$eval("#chart-overlay .corner button", bs => bs.map(b => b.textContent));
    log("corner:", corner.join(" · "));
    for (const [label, name] of [["What's new", "02-whats-new.png"], ["Options", "03-options.png"]]) {
      await page.click(`#chart-overlay .corner button:has-text("${label}")`);
      await page.waitForSelector("#chart-overlay .corner-panel");
      await shot(name);
      await page.keyboard.press("Escape");
      if (await page.$("#chart-overlay .corner-panel")) fail(`Esc didn't close ${label}`);
    }
    if (!(await page.evaluate(() => !!document.querySelector("#start .ss-body")))) fail("What's new wasn't put back on the start card");
    const unlocked = await page.evaluate(() => window.chart.islands().filter(i => i.sail).map(i => i.id));
    log("sailable:", unlocked.join(", "));
    await page.click("#chart-overlay .home");
    log("sailing home");
    await page.waitForFunction(() => !document.getElementById("chart-overlay"), null, { timeout: 1200000, polling: 1000 });
    log("the chart flew in and closed");
    await page.waitForTimeout(1500);
    await shot("04-dive.png");
    // the dive on into her bedroom, unskipped: a shot every few seconds of the flight's own time, then landed
    let k = 0;
    while (await page.evaluate(() => document.body.classList.contains("arriving")) && k < 6) {
      await page.waitForTimeout(8000);
      if (await page.evaluate(() => performance.getEntriesByName("witch:landed").length > 0)) await shot(`05-dive-${++k}.png`);
    }
    await page.waitForFunction(() => !document.body.classList.contains("arriving"), null, { timeout: 1200000, polling: 1000 });
    await page.waitForTimeout(4000);
    const w = await page.evaluate(() => { const g = window.witch?.game; const b = g?.witch; return b ? { x: b.x - g.map.treehouse.x, z: b.z - g.map.treehouse.z, seated: !!b.seated, house: g.camera.house } : null; });
    log("she's at", JSON.stringify(w));
    if (!w || w.seated || w.z > -9) fail("she didn't wake in her bedroom");
    await shot("06-bedroom.png");
    const marks = await page.evaluate(() => performance.getEntriesByType("mark").filter(m => /^(opening|chart|game):/.test(m.name)).map(m => `${m.name} ${(m.startTime / 1000).toFixed(1)} s`));
    log("marks:\n  " + marks.join("\n  "));
    fs.writeFileSync(path.join(out, "opening.json"), JSON.stringify({ corner, unlocked, marks }, null, 1));
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  log("ok");
})().catch(e => { console.error(e); process.exit(1); });
