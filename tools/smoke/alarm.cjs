// The soundsystem alarm (Ed, 2026-10-06: "an indicator for when a soundsystem or speaker is being attacked offscreen ...
// like the 🎶 indicator, but with 🔇"): the built game (DIST, default dist/) at 1600×900 with ?debug=attack (blows on the
// two soundsystems farthest from her, a few seconds in every ten), the witch flown away from home: one alarm (home's
// speakers), then two (home and a second soundsystem), on the ground and from the treetops. Fails if a script error shows,
// if the alarms aren't drawn while their soundsystems are hit off screen, or if two edge cues' distance labels overlap. Writes <out dir>/alarm-one.png, alarm-two.png,
// alarm-treetops.png.
//   npm run build && node tools/smoke/alarm.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/alarm", seed = "123"] = process.argv.slice(2);
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
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&debug=attack`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    if (process.env.LOG) console.log("ready");
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 600000, polling: 500 });
    if (process.env.LOG) console.log("started");
    await page.keyboard.press("Backquote"); // (?debug opens the debug overlay: closed for the pictures)
    const now = () => page.evaluate(() => window.witch.game.clock.time);
    const wait = async s => page.waitForFunction(t => window.witch.game.clock.time > t, (await now()) + s, { timeout: 600000, polling: 200 });
    // into the blows' window: a second or two into the next ten
    const intoBlows = async () => { const t = await now(), next = Math.ceil(t / 10) * 10 + 1.6; await page.waitForFunction(t2 => window.witch.game.clock.time > t2, next, { timeout: 600000, polling: 100 }); };
    // her in another area's clearing 150-260 m from home (on the ground, or over it in the treetops), the rulers off
    const away = mode => { const g = window.witch.game, D = g.map.dancefloor; window.witch.view.rulers.on = false; g.witches[0].health.hp = 1e6; // (no knockout: she'd wake at home) g.party.bootUntil = Math.min(g.party.bootUntil, g.clock.time);
      const s = g.map.cells.map(c => g.map.siteOf(c[0], c[1])).filter(p => { const d = Math.hypot(p.x - D.x, p.z - D.z); return d > 150 && d < 260; }).sort((p, q) => (p.x - q.x) || (p.z - q.z))[0];
      g.witch = { ...g.witch, x: s.x + 6, z: s.z + 6, seated: false, mode, lift: mode === "treetop" ? 1 : 0, vx: 0, vz: 0 }; return [Math.round(s.x - D.x), Math.round(s.z - D.z)]; };
    const shot = async (name, mode, want) => {
      const at = await page.evaluate(away, mode);
      if (process.env.LOG) console.log("placed", name, at, await now(), await page.evaluate(() => window.witch.game.clock.paused));
      await wait(1);
      await intoBlows();
      const keys = await page.evaluate(() => [...window.witch.view["alarms"].byKey.keys()]);
      await page.screenshot({ path: path.join(outDir, name) });
      console.log(name, JSON.stringify({ time: Math.round(await now()), alarms: keys }));
      if (keys.length < want) bad.push(`${name}: ${keys.length} alarms, wanted ${want}`);
      // the edge cues' distances: each one label, none over another (Ed, v1628: "2018m m")
      const labels = await page.evaluate(() => [...document.querySelectorAll("body > div")].filter(d => d.style.position === "fixed" && d.style.display === "block" && / m$/.test(d.textContent ?? "")).map(d => { const r = d.getBoundingClientRect(); return { t: d.textContent, x: r.x, y: r.y, w: r.width, h: r.height }; }));
      for (let i = 0; i < labels.length; i++) for (let j = i + 1; j < labels.length; j++) { const p = labels[i], q = labels[j]; if (p.x < q.x + q.w && q.x < p.x + p.w && p.y < q.y + q.h && q.y < p.y + p.h) bad.push(`${name}: labels "${p.t}" and "${q.t}" overlap`); }
      console.log("  labels", JSON.stringify(labels.map(l => l.t)));
    };
    await shot("alarm-one.png", "ground", 1);
    // a second soundsystem, in another area, on the far side of home
    await page.evaluate(() => { const g = window.witch.game, D = g.map.dancefloor; const w = g.witch, dx = w.x - D.x, dz = w.z - D.z, k = 180 / Math.hypot(dx, dz); g.combat.sounds.set("debug", { hp: 60, max: 60, x: D.x - dz * k * 0.6 - dx * k * 0.8, z: D.z + dx * k * 0.6 - dz * k * 0.8, radius: 3 }); });
    await shot("alarm-two.png", "ground", 2);
    await shot("alarm-treetops.png", "treetop", 2);
  } finally { await browser.close(); server.close(); }
  if (errors.length || bad.length) { console.error([...errors, ...bad].join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
