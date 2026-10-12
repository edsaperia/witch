// A frame strip of the island won early (Ed, 2026-10-12; rules/win.ts): the built game (DIST, default dist/) in headless
// Chromium at 1280×720 on a seed, a few waves brought on, the wave's pulse partway along its link, then every area still to
// come cleared at once (their wild young and adults gone, as if invited) and the stragglers gone: the victory lap sets off at
// once from the wave's pulse, one pulse home and one on to the route's end. She hovers in the treetops over where it set off;
// frames every `every` seconds from then, and one at the win. Writes <out>/win-NN.png and <out>/win-strip.png (montage).
// Fails on any page or console error, or a lap that doesn't set off at once with two pulses.
//   npm run build && node tools/qa/win-strip.cjs [out dir] [seed]   (default previews/win, 7)
const http = require("http"), fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/win", seed = "7"] = process.argv.slice(2);
const every = Number(process.env.EVERY || 0.2), FRAMES = Number(process.env.FRAMES || 8);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const ARGS = ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"];

function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
    if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
  });
  return new Promise(r => server.listen(0, "127.0.0.1", () => r(server)));
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ARGS });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(`pageerror: ${e.message}`));
    page.on("console", m => { if (m.type() === "error") errors.push(`console: ${m.text()}`); });
    await page.goto(`http://127.0.0.1:${port}/?seed=${seed}&creator=0`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 600000, polling: 500 });
    await page.waitForTimeout(4000);
    await page.evaluate(() => { window.witch.manual = true; });
    const run = (n, c, dt = 1 / 60, draw = true) => page.evaluate(async ({ n, c, dt, draw }) => {
      const w = window.witch;
      for (let i = 0; i < n; i++) { w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...c }, dt, draw); if (i % 30 === 29) await new Promise(r => setTimeout(r, 0)); }
    }, { n, c, dt, draw });
    // off the decks (the party spell, if it waits for one), then a few waves at once, the boot done
    await run(1, { castParty: true });
    for (let i = 0; i < 40 && (await page.evaluate(() => !!window.witch.game.witch.seated)); i++) await run(30, { moveX: 1, moveZ: 0.3 });
    for (let k = 0; k < 3; k++) await run(1, { nextWave: true });
    await page.evaluate(() => { const g = window.witch.game; g.party.bootUntil = g.clock.time; g.party.pulse.at = g.clock.time; g.party.paused = false; for (const [k, h] of g.combat.sounds) h.hp = h.max = 1e9; });
    await run(400, {}, 1 / 10, false); // (40 s: the wave's pulse partway along)
    // every area still to come cleared (its wild young and adults gone, as if all invited), the stragglers gone
    await page.evaluate(() => { const g = window.witch.game; for (const c of g.creatures) if (!c.boss && (!g.party.areas.has(`${c.cell[0]},${c.cell[1]}`) || c.enraged)) c.gone = true; });
    for (let i = 0; i < 20 && !(await page.evaluate(() => window.witch.game.win && window.witch.game.win.phase !== "stragglers")); i++) await run(6, {}, 1 / 60, false);
    const lap = await page.evaluate(() => { const g = window.witch.game, w = g.win; return w && { phase: w.phase, wave: g.party.wave, next: g.party.next.length, home: w.lap.map(s => s.key || "·"), out: (w.out || []).map(s => s.key || "·"), start: { x: w.lap[0].x, z: w.lap[0].z, links: w.lap[0].links }, end: w.lap[w.lap.length - 1].at - g.clock.time }; });
    console.log(JSON.stringify(lap));
    if (!lap || lap.phase !== "lap") errors.push(`the lap didn't set off: ${JSON.stringify(lap)}`);
    else if (lap.next === 0) errors.push("the route was done already: not the island cleared early");
    else if (lap.out.length < 2) errors.push("no outward pulse");
    // over where it set off, in the treetops
    const look = async () => page.evaluate(({ x, z }) => { const g = window.witch.game; g.witch = { ...g.witch, x, z: z + 40, vx: 0, vz: 0, mode: "treetop", lift: 1 }; g.camera.tx = x; g.camera.tz = z + 40; }, lap.start);
    await look();
    await page.evaluate(() => { window.witch.game.clock.paused = false; });
    const files = [];
    for (let i = 0; i < FRAMES; i++) {
      await look(); await run(Math.max(1, Math.round(every * 60)), {});
      const f = path.join(outDir, `win-${String(i).padStart(2, "0")}.png`); await page.screenshot({ path: f }); files.push(f);
      const s = await page.evaluate(() => { const v = window.witch.view.ley; return { t: +window.witch.game.clock.time.toFixed(2), phase: window.witch.game.win.phase, home: v.pulseTip && { x: +v.pulseTip.x.toFixed(1), z: +v.pulseTip.z.toFixed(1) } }; });
      console.log(JSON.stringify(s));
    }
    // on to the win: the dancefloor
    for (let i = 0; i < 200 && (await page.evaluate(() => window.witch.game.win.phase)) !== "won"; i++) await run(30, {}, 1 / 30, false);
    await page.evaluate(() => { const g = window.witch.game, d = g.map.dancefloor; g.witch = { ...g.witch, x: d.x, z: d.z + 40, vx: 0, vz: 0 }; g.camera.tx = d.x; g.camera.tz = d.z + 40; });
    await run(120, {});
    const f = path.join(outDir, `win-${String(FRAMES).padStart(2, "0")}.png`); await page.screenshot({ path: f }); files.push(f);
    try { execFileSync("montage", [...files, "-tile", "3x", "-geometry", "640x360+4+4", "-background", "#111", path.join(outDir, "win-strip.png")]); } catch (e) { console.log(`(no montage: ${e.message})`); }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log(`ok: ${outDir}`);
})();
