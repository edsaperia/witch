// The treehouse's placeholder rooms (Ed, 2026-10-19; rules/houseRooms.ts, render/houseRooms.ts, config/house.json) in the built game
// (DIST, default dist/) at 1600×900: she's put in the house mid-night and stood in each room (shot `<room>.png`, in front of its
// object, on the house's turned plan), then walked along the corridor from the hub to the dressing room (`corridor-<n>.png`). Fails on a
// page error. ONLY=dressing,bedroom shoots only those rooms.
//   npm run build && node tools/house/rooms-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/treehouse-rooms", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const H = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config/house.json"), "utf8"));
const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;
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
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&hats=all`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    const stand = (x, z) => page.evaluate(([x, z]) => { const g = window.witch.game, T = g.map.treehouse; g.witch = { ...g.witch, x: T.x + x, z: T.z + z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false }; }, [x, z]);
    const step = (o, n) => page.evaluate(([o, n]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60); }, [o, n]);
    for (const r of H.rooms) {
      if (ONLY && !ONLY.includes(r.id)) continue;
      const o = H.objects.find(q => q.room === r.id && q.use.kind !== "hats") || null;
      // in front of its object, on the side facing the room's middle (rules/houseRooms.ts objectFront), a step or two back
      const cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2, dx = o ? cx - o.x : 0, dz = o ? cz - o.z : 0, side = Math.abs(dx) > Math.abs(dz);
      const px = o ? (side ? o.x + Math.sign(dx) * (o.w / 2 + 1.6) : o.x) : cx, pz = o ? (side ? o.z : o.z + Math.sign(dz || 1) * (o.d / 2 + 1.6)) : cz;
      await stand(...plan(px, pz));
      await step({}, 90); // (the camera follows her in)
      await page.screenshot({ path: path.join(outDir, `${r.id}.png`), timeout: 300000 });
      console.log("shot", r.id);
    }
    if (!ONLY || ONLY.includes("corridor")) {
      const c = H.corridors.find(q => q.id === "hub-dressing"), [ex, ez] = plan(1, 0);
      await stand(...plan(c.x0 + 0.8, (c.z0 + c.z1) / 2));
      await step({}, 60);
      for (let i = 0; i < 3; i++) { await step({ moveX: ex, moveZ: ez }, 40); await page.screenshot({ path: path.join(outDir, `corridor-${i + 1}.png`), timeout: 300000 }); }
      console.log("shot corridor");
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
