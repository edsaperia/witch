// The treehouse's furniture (Ed, 2026-10-23: real art for the house's objects, art/furniture.js) in the built game (DIST, default
// dist/) at 1600×900: the bedroom from its middle (`bedroom.png`), zoomed out a step (`bedroom-whole.png`), by the bed (`bed.png`), by
// the wardrobe and dressing table (`dressing.png`), the bedroom's back corner zoomed in (`close.png`), and the crystal ball in the hub (`ball.png`). QUERY adds to the link (QUERY=furniture=0:
// the plain boxes, to compare). ONLY=bedroom,whole,bed,dressing,close,ball shoots only those. Fails on a page error.
//   npm run build && node tools/house/furniture-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/house-furniture", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const H = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config/house.json"), "utf8"));
const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null, want = k => !ONLY || ONLY.includes(k), QUERY = process.env.QUERY ? `&${process.env.QUERY}` : "";
// (the house's plan is turned about the hub: rules/houseRooms.ts fromPlan)
const A = ((H.turn || 0) * Math.PI) / 180, plan = (x, z) => [x * Math.cos(A) + z * Math.sin(A), -x * Math.sin(A) + z * Math.cos(A)];
const obj = id => H.objects.find(o => o.id === id);
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    page.on("console", m => { if (/furniture/i.test(m.text())) console.log("  page:", m.text()); });
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off${QUERY}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    const put = (x, z) => page.evaluate(([x, z]) => { const g = window.witch.game, Th = g.map.treehouse; g.witch = { ...g.witch, x: Th.x + x, z: Th.z + z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false }; }, [x, z]);
    const step = (o, n) => page.evaluate(([o, n]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60); }, [o, n]);
    const shot = async name => { await page.screenshot({ path: path.join(outDir, `${name}.png`), timeout: 300000 }); console.log("shot", name); };
    const b = H.rooms.find(r => r.id === "bedroom");
    if (want("bedroom")) { await put(...plan((b.x0 + b.x1) / 2 + 1, (b.z0 + b.z1) / 2 - 2)); await step({}, 70); await shot("bedroom"); }
    if (want("dressing")) { const w = obj("wardrobe"), d = obj("dressingTable"); await put(...plan((w.x + d.x) / 2, w.z + 3.2)); await step({}, 70); await shot("dressing"); }
    if (want("bed")) { const o = obj("bed"); await put(...plan(o.x - o.w / 2 - 2.2, o.z + 1.8)); await step({}, 70); await shot("bed"); }
    if (want("whole")) {
      await put(...plan((b.x0 + b.x1) / 2, (b.z0 + b.z1) / 2)); await step({}, 60);
      for (let i = 0; i < Number(process.env.WHOLE_STEPS || 2); i++) await step({ zoom: 1 }, 1), await step({}, 40);
      await step({}, 90); await shot("bedroom-whole");
      for (let i = 0; i < Number(process.env.WHOLE_STEPS || 2); i++) await step({ zoom: -1 }, 1), await step({}, 40);
    }
    if (want("close")) {
      // the bedroom's back corner, the camera zoomed in a step at a time (CLOSE_STEPS, default 2)
      const o = obj("bed"), d = obj("dressingTable"); await put(...plan((o.x + d.x) / 2, (o.z + d.z) / 2 + 3.5)); await step({}, 40);
      for (let i = 0; i < Number(process.env.CLOSE_STEPS || 2); i++) await step({ zoom: -1 }, 1), await step({}, 40);
      await step({}, 60); await shot("close");
      for (let i = 0; i < Number(process.env.CLOSE_STEPS || 2); i++) await step({ zoom: 1 }, 1), await step({}, 40);
    }
    if (want("ball")) { const o = obj("crystalBall"); await put(...plan(o.x + 1.6, o.z + 1.6)); await step({}, 70); await shot("ball"); }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
