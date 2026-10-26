// Taking off from anywhere on the treehouse and landing on its trunk (Ed, 2026-10-26: "maybe you can take off from anywhere on the
// treehouse and land anywhere in the trunk section from the dining room up to the boudoir"; rules/treehouse.ts), in the built game
// (DIST, default dist/): the rise's frames from each of ROOMS (on foot there, her broom in hand, the house alone drawn till she lifts
// off: render/view.ts behindHouse) a fixed 1/60 s at a time with the picture's draw left out (the cloud's software renderer's own
// time isn't the game's), each frame's own work (rules and view, by part), its median, p95 and worst, against the same rise off
// the Terrace; then frames of a take-off from the Parlour and of a landing flown onto it from the west, to <out>/takeoff-*.png and
// <out>/land-*.png. Fails on a page error, a rise that doesn't leave, or a landing that doesn't land on the Parlour's floor.
//   npm run build && node tools/house/takeoff.cjs [out dir] [seed]   ROOMS=parlour,bestiary,dining SHOTS=0 (timing only)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/takeoff", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const ROOMS = (process.env.ROOMS || "parlour,bestiary,dining,turret").split(","), SHOTS = process.env.SHOTS !== "0";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const H = require("../../config/house/load.mjs").loadHouse();
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], fails = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    await page.evaluate(() => { const W = window.witch.game.witches[0]; W.kit = { invites: true, broom: true }; }); // (her broom taken: rules/kit.ts)
    const room = id => H.rooms.find(q => q.id === id);
    // (on foot at a room's middle, perched, its rise cooldown long over; a few frames there so the house alone is drawn)
    const stand = (x, z, frames = 90) => page.evaluate(([x, z, frames]) => {
      const w = window.witch, g = w.game, T = g.map.treehouse, W = g.witches[0];
      W.body = { ...W.body, x: T.x + x, z: T.z + z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false };
      W.landedAt = -1e9; w.manual = true;
      for (let i = 0; i < frames; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, false);
    }, [x, z, frames]);
    // (the rise: the press, then `n` frames; each frame's own work, by part)
    const rise = n => page.evaluate(n => {
      const w = window.witch, g = w.game, idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, ms = [], parts = {};
      let left = -1;
      for (let i = 0; i < n; i++) {
        const a = performance.now(), r = w.frame({ ...idle, toggleMode: i === 0 }, 1 / 60, false); ms.push(performance.now() - a);
        for (const k in r.ms) parts[k] = Math.max(parts[k] || 0, r.ms[k]);
        if (left < 0 && g.witch.mode !== "ground") left = i;
      }
      const s = [...ms].sort((u, v) => u - v), q = p => +s[Math.min(s.length - 1, Math.floor(p * s.length))].toFixed(1);
      return { left, mode: g.witch.mode, median: q(0.5), p95: q(0.95), worst: q(1), worstAt: ms.indexOf(Math.max(...ms)), parts: Object.fromEntries(Object.entries(parts).map(([k, v]) => [k, +v.toFixed(1)]).sort((u, v) => v[1] - u[1]).slice(0, 5)) };
    }, n);
    const T = H.terrace;
    for (const id of ["terrace", ...ROOMS]) {
      const at = id === "terrace" ? [T.circle.x, T.circle.z] : [room(id).x, room(id).z];
      await stand(at[0], at[1]);
      const r = await rise(150);
      log(`rise from ${id}:`, JSON.stringify(r));
      if (r.left !== 0 || r.mode !== "treetop") fails.push(`${id}: the rise didn't leave (${r.left}, ${r.mode})`);
    }
    if (SHOTS) {
      const draw = (n, o = {}) => page.evaluate(([n, o]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60, i === n - 1); }, [n, o]);
      const shot = async name => { await page.screenshot({ path: path.join(outDir, `${name}.png`), timeout: 300000 }); log("shot", name); };
      // a take-off from the Parlour: standing, the press, lifting, the forest back, up in the treetops
      const P = room("parlour");
      await stand(P.x, P.z, 120); await draw(1); await shot("takeoff-0-standing");
      await draw(1, { toggleMode: true }); await draw(11); await shot("takeoff-1-lifting");
      await draw(18); await shot("takeoff-2-forest-back");
      await draw(60); await shot("takeoff-3-treetops");
      // a landing on the Parlour, flown onto from the west at treetop height
      await page.evaluate(([x, z]) => { const g = window.witch.game, T = g.map.treehouse, W = g.witches[0]; W.body = { ...W.body, x: T.x + x, z: T.z + z, vx: 0, vz: 0, mode: "treetop", lift: 1, perch: undefined, seated: false }; }, [P.x - P.r - 25, P.z]);
      await draw(30, { moveX: 1 }); await shot("land-0-approach");
      const onto = await page.evaluate(() => { const w = window.witch, g = w.game; for (let i = 0; i < 600; i++) { w.frame({ moveX: 1, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, false); if (g.witch.perch) return i; } return -1; });
      await draw(1, { moveX: 1 }); await shot("land-1-onto");
      await draw(10); await shot("land-2-touchdown");
      await draw(60); await shot("land-3-landed");
      const end = await page.evaluate(() => { const g = window.witch.game, T = g.map.treehouse; return { mode: g.witch.mode, perch: !!g.witch.perch, x: +(g.witch.x - T.x).toFixed(1), z: +(g.witch.z - T.z).toFixed(1) }; });
      const inParlour = Math.hypot(end.x - P.x, end.z - P.z) < P.r + 2;
      log("landing:", JSON.stringify({ onto, ...end, inParlour }));
      if (onto < 0 || !end.perch || end.mode !== "ground" || !inParlour) fails.push(`the landing: ${JSON.stringify(end)}`);
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length || fails.length) { console.error([...errors, ...fails].join("\n")); process.exit(1); }
  log("ok");
})().catch(e => { console.error(e); process.exit(1); });
