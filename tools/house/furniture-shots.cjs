// The treehouse's furniture (Ed, 2026-10-23: real art for the house's objects, art/furniture.js) in the built game (DIST, default
// dist/) at 1600×900: she's put in each room of the house (config/house.json) a little south of its middle and the camera zoomed
// out ZOOM steps (default 1), a shot each (`<room>.png`), then by the bedroom's curtains while they're shut (`curtains-shut.png`).
// QUERY adds to the link (QUERY=furniture=0: the plain boxes, to compare). ONLY=bedroom,boudoir shoots only those. Fails on a page
// error.
//   npm run build && node tools/house/furniture-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/house-furniture", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const H = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config/house.json"), "utf8"));
const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null, want = k => !ONLY || ONLY.includes(k), QUERY = process.env.QUERY ? `&${process.env.QUERY}` : "", ZOOM = Number(process.env.ZOOM ?? 1);
// (the house's plan is turned about the hub: rules/houseRooms.ts fromPlan)
const A = ((H.turn || 0) * Math.PI) / 180, plan = (x, z) => [x * Math.cos(A) + z * Math.sin(A), -x * Math.sin(A) + z * Math.cos(A)];
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&opening=old${QUERY}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    const put = (x, z) => page.evaluate(([x, z]) => { const g = window.witch.game, Th = g.map.treehouse; g.witch = { ...g.witch, x: Th.x + x, z: Th.z + z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false }; }, [x, z]);
    const step = (o, n) => page.evaluate(([o, n]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60); }, [o, n]);
    const shot = async name => { await page.screenshot({ path: path.join(outDir, `${name}.png`), timeout: 300000 }); console.log("shot", name); };
    await step({}, 10);
    for (let i = 0; i < ZOOM; i++) await step({ zoom: 1 }, 1), await step({}, 20);
    for (const r of H.rooms) {
      if (!want(r.id) || r.locked) continue;
      const cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
      await put(...plan(cx, cz + (r.r ?? 4) * 0.35));
      await step({}, 50);
      await shot(r.id);
    }
    if (want("curtains")) {
      const o = H.objects.find(q => q.id === "curtains");
      await page.evaluate(() => { const g = window.witch.game; g.wake = { beat: "up", at: 0, snoozes: 0, open: false, mirror: true, events: [] }; });
      await put(...plan(o.x, o.z + 3)); await step({}, 50); await shot("curtains-shut");
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
