// The oak's crown whole over the Terrace, or with its gap (Ed, 2026-10-26: "I'd like to try the treehouse canopy not being cut-through
// while she's in treehouse mode"; "I also want to try not having the terrace drawn separately"; the pause page's Oak crown switches):
// the same frames with the switches on and off, for the report. From outside: flying over the house in the treetops, and from the
// dancefloor on the ground looking north; then landing on the house (Space over the Terrace, frames as she comes down) and indoors on
// the Terrace. Each frame named <scene>-<on|off>.png.
//   npm run build && node tools/shot/crown-whole.cjs [out dir]   (SEED=160271, SIZE=1280x720, DIST=dist, LINK= more of the link)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const SEED = process.env.SEED || "160271", [W, H] = (process.env.SIZE || "1280x720").split("x").map(Number), LINK = process.env.LINK ?? "";
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/shot/crown-whole"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
const ALL = { on: "", off: "d_crownWhole=0&d_terraceRoom=0" }, SWITCHES = process.env.ONLY ? { [process.env.ONLY]: ALL[process.env.ONLY] } : ALL; // (ONLY=on|off: one half)

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  let failed = false;
  try {
    for (const [name, sw] of Object.entries(SWITCHES)) {
      const page = await browser.newPage({ viewport: { width: W, height: H } }), errors = [];
      page.on("pageerror", e => errors.push(e.message));
      // (first to the house in the treetops, so its art's asked for; the scenes after move her)
      await page.goto(`http://127.0.0.1:${server.address().port}/?shot=room:terrace&seed=${SEED}&tilt=off&${sw}&${LINK}`);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
      await page.evaluate(() => { window.witch.manual = true; });
      if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 }).catch(() => {}); }
      const said = await page.evaluate(() => window.witch.lastShot ?? window.witch.shot("room:terrace"));
      if (!said.ok) throw new Error(said.say);
      const step = (n, c = {}) => page.evaluate(([n, c]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...c }, 1 / 60, i === n - 1); }, [n, c]);
      const settle = async () => { for (let round = 0, calm = 0; calm < 2 && round < 60; round++) { await step(10); if ((await page.evaluate(() => window.witch.view.assets.pending)) === 0) calm++; else { calm = 0; await page.waitForTimeout(1500); } } await step(30); };
      const put = (dx, dz, mode) => page.evaluate(([dx, dz, mode]) => { const g = window.witch.game, T = g.map.treehouse, b = g.witches[0].body; g.witches[0].body = { ...b, x: T.x + dx, z: T.z + dz, vx: 0, vz: 0, mode, lift: mode === "treetop" ? 1 : 0, perch: false, seated: false }; }, [dx, dz, mode]);
      const shot = async scene => { await settle(); await page.screenshot({ path: path.join(out, `${scene}-${name}.png`), timeout: 300000 }); log(`${scene}-${name}`); };
      const map = await page.evaluate(() => { const m = window.witch.game.map; return { th: m.treehouse, df: m.dancefloor }; });
      log(name, JSON.stringify(map));
      // indoors on the Terrace (the shot's own place)
      await shot("terrace");
      // flying over the house in the treetops, south of it, then over it
      await put(0, 40, "treetop"); await shot("over-south");
      await put(0, 0, "treetop"); await shot("over");
      // from the dancefloor's side, on the ground, looking north at the oak (two thirds of the way from the oak to the dancefloor)
      await page.evaluate(({ df, th }) => { const g = window.witch.game, b = g.witches[0].body; g.witches[0].body = { ...b, x: th.x + (df.x - th.x) * 0.66, z: th.z + (df.z - th.z) * 0.66, vx: 0, vz: 0, mode: "ground", lift: 0, perch: false, seated: false }; }, map);
      await shot("dancefloor");
      // landing: over the Terrace in the treetops, Space, frames as she comes down
      await put(0, 4, "treetop"); await settle();
      await step(1, { toggleMode: true });
      for (const k of [6, 12, 24]) { await step(k === 6 ? 6 : 6); await page.screenshot({ path: path.join(out, `landing-${k}-${name}.png`), timeout: 300000 }); }
      await shot("landed");
      if (errors.length) { failed = true; log(`page errors: ${errors.join(" | ")}`); }
      await page.close();
    }
  } finally { await browser.close(); server.close(); }
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
