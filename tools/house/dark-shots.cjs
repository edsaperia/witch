// The dark behind the treehouse's enclosed rooms (Ed, 2026-10-23; render/view.ts behindHouse, render/post.ts Post.behind), shot from
// the built game (DIST, default dist/) at 1600x900: she's stood in rooms (ROOMS, default bedroom,study,kitchen) and on the Terrace,
// each shot as the game draws it (`<room>.png`) and with the dark off (`<room>-off.png`, tuning treehouse.house.dark.on false), and
// each one's frames timed both ways (12 frames, the GPU finished each: timings.json); then the reveal as she steps from the kitchen's
// branch onto the Terrace (reveal-<ms>.png, every 0.1 s of her clock) and back (hide-<ms>.png).
//   npm run build && node tools/house/dark-shots.cjs <out dir> [seed]     (ROOMS=a,b or none, TIME=0 no timings, SETTLE=frames, REVEAL=0, SIZE=WxH)
// (the cloud's software renderer takes 1 to 8 s a frame here: a whole run is about an hour)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/dark", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg", ".webp": "image/webp" };
const H = require("../../config/house/load.mjs").loadHouse();
const ROOMS = (process.env.ROOMS ?? "bedroom,study,kitchen").split(",").filter(Boolean), TIME = process.env.TIME !== "0", SETTLE = Number(process.env.SETTLE || 60), REVEAL = process.env.REVEAL !== "0";
const A = ((H.turn || 0) * Math.PI) / 180, plan = (x, z) => [x * Math.cos(A) + z * Math.sin(A), -x * Math.sin(A) + z * Math.cos(A)];
const mid = id => { const r = H.rooms.find(q => q.id === id); return plan((r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2); };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); res.end(fs.readFileSync(f)); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], timings = {};
  try {
    const [W, H] = (process.env.SIZE || "1600x900").split("x").map(Number), page = await browser.newPage({ viewport: { width: W, height: H } }); // (SIZE=1900x1240: Ed's window)
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    const NONE = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const stand = (x, z) => page.evaluate(([x, z]) => { const g = window.witch.game, T = g.map.treehouse; Object.assign(g.witch, { x: T.x + x, z: T.z + z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false }); }, [x, z]);
    const step = n => page.evaluate(([n, NONE]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame(NONE, 1 / 60, true); }, [n, NONE]);
    const dark = on => page.evaluate(on => { window.witch.tuning.treehouse.house.dark.on = on; }, on);
    const time = () => page.evaluate(NONE => { const w = window.witch, gl = w.view.renderer.getContext(), t0 = performance.now(); for (let i = 0; i < 12; i++) { w.frame(NONE, 1 / 60, true); gl.finish(); } return (performance.now() - t0) / 12; }, NONE);
    const shot = name => page.screenshot({ path: path.join(outDir, name + ".png"), timeout: 300000 });
    for (const [id, [x, z]] of [...ROOMS.map(id => [id, mid(id)]), ["terrace", [0, 0]]]) {
      await stand(x, z); await dark(true); await step(SETTLE * 1.5);
      await shot(id); await dark(false); await step(SETTLE); await shot(`${id}-off`);
      if (!TIME) continue;
      // (timed after a warm-up, each way twice in turn: the first frames after a move run slow whatever's drawn)
      await time(); timings[id] = {};
      for (const on of [true, false, false, true]) { await dark(on); await step(SETTLE); const k = on ? "dark" : "off"; timings[id][k] = +(((timings[id][k] ?? 0) + (await time()) / 2)).toFixed(1); }
      console.log(id, JSON.stringify(timings[id]));
    }
    if (!REVEAL) return;
    // The reveal: from the kitchen's middle along its branch onto the Terrace's north edge, shot every 0.1 s; then back.
    await dark(true);
    const [kx, kz] = mid("kitchen"), edge = await page.evaluate(() => -window.witch.tuning.treehouse.house.hub + 1);
    await stand(kx, kz); await step(Math.max(SETTLE, 60)); // (wholly dark first: the fade is 0.6 s)
    await stand(0, edge);
    for (let i = 0; i <= 7; i++) { await shot(`reveal-${i * 100}`); await step(6); }
    await stand(kx, kz);
    for (let i = 0; i <= 7; i++) { await shot(`hide-${i * 100}`); await step(6); }
  } finally {
    fs.writeFileSync(path.join(outDir, "timings.json"), JSON.stringify(timings, null, 1));
    console.log(errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "no page errors");
    await browser.close(); server.close();
  }
})();
