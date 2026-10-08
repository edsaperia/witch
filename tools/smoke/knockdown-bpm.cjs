// The party's tempo on screen (Ed, 2026-10-07: "the BPM goes up by 1 each time you die"; "The BPM is shown on the sparkler
// marker, and above the decks"). The built game (DIST, default dist/) at 1600×900: at her decks the display over them reads the
// tempo; knocked down twice it reads 2 more (once the rise has eased in) and the wave pointer's label says the same. Fails on a
// script error or a wrong reading. Writes <out dir>/bpm-decks.png and bpm-pointer.png.
//   npm run build && node tools/smoke/knockdown-bpm.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/knockdown-bpm", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], bad = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Shift"); // (past the start screen: any key)
    await page.evaluate(() => { const g = window.witch.game; g.clock.paused = false; g.party.spellAt = undefined; }); // (the game starts paused at her decks)
    await page.waitForFunction(() => window.witch.game.clock.time > 1 && document.querySelector(".deck-bpm .n")?.textContent, null, { timeout: 600000, polling: 500 });
    const read = sel => page.evaluate(s => document.querySelector(s)?.textContent ?? "", sel);
    const base = await page.evaluate(() => Math.round(window.witch.game.beat.segs.at(-1).bpmTo));
    if (!(await read(".deck-bpm .n")).startsWith(String(base))) bad.push(`decks read ${await read(".deck-bpm .n")}, not ${base}`);
    // knocked down twice
    for (let k = 0; k < 2; k++) {
      await page.evaluate(() => { const w = window.witch.game.witches[0]; w.ko = null; w.health.hp = 1; w.health.hurtAt = -1e9; window.witch.hit(); });
    }
    const bonus = await page.evaluate(() => window.witch.game.beat.bonus);
    if (bonus !== 2) bad.push(`bonus ${bonus} after two knockdowns`);
    const t0 = await page.evaluate(() => window.witch.game.clock.time);
    await page.waitForFunction(t => window.witch.game.clock.time > t + 6, t0, { timeout: 600000, polling: 300 });
    const deck = await read(".deck-bpm .n");
    if (deck !== String(base + 2)) bad.push(`decks read ${deck}, not ${base + 2}`);
    await page.screenshot({ path: path.join(outDir, "bpm-decks.png") });
    // off her decks, the boot over: the wave pointer, its label the tempo
    await page.evaluate(() => { const g = window.witch.game, t = g.clock.time; g.witches[0].ko = null; g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 }; g.party.spellAt = undefined; g.party.bootFrom = t - 100; g.party.bootUntil = t - 2; g.party.nextAt = t + 60; });
    const t1 = await page.evaluate(() => window.witch.game.clock.time);
    await page.waitForFunction(t => window.witch.game.clock.time > t + 2, t1, { timeout: 600000, polling: 300 });
    const labels = await page.evaluate(() => [...document.querySelectorAll("div")].map(d => d.textContent).filter(s => /^\d+ bpm$/.test(s ?? "")));
    if (!labels.includes(`${base + 2} bpm`)) bad.push(`no wave pointer label "${base + 2} bpm" (saw ${JSON.stringify(labels)})`);
    await page.screenshot({ path: path.join(outDir, "bpm-pointer.png") });
  } finally { await browser.close(); server.close(); }
  for (const e of errors) console.log("page error:", e);
  for (const b of bad) console.log("FAIL:", b);
  console.log(errors.length || bad.length ? "knockdown-bpm: FAILED" : "knockdown-bpm: ok");
  process.exit(errors.length || bad.length ? 1 : 0);
})();
