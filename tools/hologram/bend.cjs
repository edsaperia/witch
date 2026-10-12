// The soundsystems' sky sigils and the bend (render/hologram.ts; Ed, 2026-10-12: "Soundsystem holograms can be seen through
// the bend"): the built game (DIST, default dist/) at 1280×720 on the old radius map (?island=off, far soundsystems), WAVES
// waves brought on at once, then her up in the treetops due south of a soundsystem at each distance in DISTS metres (the
// world bends away to the north), zoomed ZOOM steps (negative: in, a lower camera; default -2), settled and shot: <out>/bend-<d>m.png. Past the
// bent horizon its hologram should be hidden with its soundsystem; nearer, it shows over the trees.
//   npm run build && node tools/hologram/bend.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/hologram", seed = "123"] = process.argv.slice(2), WAVES = +(process.env.WAVES || 8), ZOOM = +(process.env.ZOOM || -2);
const DISTS = (process.env.DISTS || "180,300,420").split(",").map(Number);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&island=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 600000, polling: 500 });
    const step = (o, n = 1) => page.evaluate(([o, n]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 30); }, [o, n]);
    await step({ moveX: 0.3 }, 10); // (off her decks)
    for (let k = 0; k < WAVES; k++) { await step({ nextWave: true }); await step({}, 30); }
    for (let i = 0; i < 20; i++) { await step({}, 15); await page.waitForTimeout(300); }
    // the soundsystem farthest north of home (so the ground south of it is on the map), and up into the treetops
    const a = await page.evaluate(() => [...window.witch.game.party.areas].filter(([k, a]) => a.soundsystem && k !== "home").map(([, a]) => a).map(a => ({ x: a.soundsystem.x, z: a.soundsystem.z })).sort((p, q) => p.z - q.z)[0]);
    if (!a) throw new Error("no soundsystem");
    console.log("soundsystem at", a.x.toFixed(0), a.z.toFixed(0));
    await step({ toggleMode: true }); await step({}, 90);
    for (let k = 0; k < Math.abs(ZOOM); k++) { await step({ zoom: Math.sign(ZOOM) }); await step({}, 10); }
    for (const d of DISTS) {
      await page.evaluate(([a, d]) => { const g = window.witch.game; g.witch = { ...g.witch, x: a.x, z: a.z + d, vx: 0, vz: 0 }; }, [a, d]);
      for (let k = 0; k < 6; k++) { await step({}, 20); await page.waitForTimeout(700); }
      await page.screenshot({ path: path.join(outDir, `bend-${d}m.png`) });
      console.log("shot", d, "m");
    }
  } finally { await browser.close(); server.close(); }
  console.log(errors.length ? `errors: ${errors.join(" | ")}` : "no page errors");
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
