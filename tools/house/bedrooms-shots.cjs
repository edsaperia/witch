// The other two bedrooms (Ed, 2026-10-23: one per witch, "fill the other two with placeholders for now; the key thing is to reserve
// the space in the floorplan"), shot in the built game (DIST, default dist/) at 1600×900: the house's plan from above with its rooms'
// names (`plan.png`, `?rooms=labels`), the Boudoir with both locked doors and their roofs on (`boudoir.png`), and at each locked door
// peeking in, its roof lifted over its placeholders under dust sheets (`<room>-door.png`).
//   node tools/house/bedrooms-shots.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path");
const playwright = require("/opt/node22/lib/node_modules/playwright");
const [outDir = "previews/bedrooms", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const H = require("../../config/house/load.mjs").loadHouse();
const mid = r => [(r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2];
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&rooms=labels`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    const stand = (x, z) => page.evaluate(([x, z]) => { const g = window.witch.game, T = g.map.treehouse; g.witch = { ...g.witch, x: T.x + x, z: T.z + z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false }; }, [x, z]);
    const step = (o, n) => page.evaluate(([o, n]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60); }, [o, n]);
    const shot = async name => { await page.screenshot({ path: path.join(outDir, `${name}.png`), timeout: 300000 }); console.log("shot", name); };
    const B = H.rooms.find(r => r.id === "boudoir");
    await stand(...mid(B)); await step({}, 90); await shot("boudoir");
    for (const r of H.rooms.filter(q => q.locked)) {
      // just outside its door, on the branch, a step back from it
      const d = H.objects.find(o => o.id === `${r.id}Door`), [cx, cz] = mid(r), L = Math.hypot(d.x - cx, d.z - cz), ux = (d.x - cx) / L, uz = (d.z - cz) / L;
      await stand(d.x + ux * 1.6, d.z + uz * 1.6); await step({}, 120); await shot(`${r.id}-door`);
    }
    await stand(...mid(B)); await step({}, 30);
    for (let i = 0; i < 4; i++) await step({ zoom: -1 }, 2), await step({}, 30); // (zoomed out over the house)
    await step({}, 90); await shot("plan");
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
