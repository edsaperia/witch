// The forest fading in behind the treehouse once the island has loaded (Ed, 2026-10-26: "When the forest has loaded, fade it in
// gradually behind the whole treehouse"; render/view.ts behindHouse): from the built game (DIST, default dist/), she's stood in a
// room (ROOM, default parlour) with the island not yet counted ready (g.islandReady false, its art held undrawn: the dark behind the whole house), shot;
// then it's ready (main.ts latches it as ever) and the fade's shot at its middle and after its end (dark.reveal, read from the tuning); then the Terrace with the
// island not ready, as a night starts. Frames <out>/room-before.png, room-mid.png, room-after.png, terrace-start.png.
//   npm run build && node tools/house/forest-fade.cjs <out dir> [seed]     (ROOM=parlour, SIZE=1600x900, SETTLE=frames)
// (the cloud's software renderer takes seconds a frame here: a run is some minutes)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/forest-fade", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg", ".webp": "image/webp" };
const H = require("../../config/house/load.mjs").loadHouse();
const ROOM = process.env.ROOM || "parlour", SETTLE = Number(process.env.SETTLE || 60), [W, Ht] = (process.env.SIZE || "1600x900").split("x").map(Number);
const A = ((H.turn || 0) * Math.PI) / 180, plan = (x, z) => [x * Math.cos(A) + z * Math.sin(A), -x * Math.sin(A) + z * Math.cos(A)];
const mid = id => { const r = H.rooms.find(q => q.id === id); return plan(r.x ?? (r.x0 + r.x1) / 2, r.z ?? (r.z0 + r.z1) / 2); };

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], problems = [];
  try {
    const page = await browser.newPage({ viewport: { width: W, height: Ht } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&quick=1&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 1, null, { timeout: 600000, polling: 500 });
    const NONE = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const stand = ([x, z]) => page.evaluate(([x, z]) => { const g = window.witch.game, T = g.map.treehouse; Object.assign(g.witch, { x: T.x + x, z: T.z + z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false }); }, [x, z]);
    const step = n => page.evaluate(([n, NONE]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame(NONE, 1 / 60, i === n - 1); }, [n, NONE]); // (drawn only the last: the fade's 20 s are 1200 frames)
    // (not ready: the island's art held undrawn, so main.ts doesn't latch it again; ready: the real check back, and latched as main.ts
    // would: window.witch.frame steps the view, not main.ts's frame, where it latches)
    const ready = on => page.evaluate(on => { const w = window.witch; if (on) { delete w.view.islandDrawn; w.game.islandReady = true; } else { w.view.islandDrawn = () => false; w.game.islandReady = false; } }, on);
    const behind = () => page.evaluate(() => window.witch.view.post.behind);
    const shot = name => page.screenshot({ path: path.join(outDir, name + ".png"), timeout: 300000 });
    const reveal = await page.evaluate(() => window.witch.tuning.treehouse.house.dark.reveal ?? 4);
    // (her clock steps a 60th of a second a frame: the fade's middle and end in frames)
    await stand(mid(ROOM)); await ready(false); await step(SETTLE * 2);
    let b = await behind(); if (b > 0.01) problems.push(`room before: the forest not dark (behind ${b})`);
    await shot("room-before"); console.log("room-before", b);
    await ready(true); await step(Math.round(reveal * 30));
    b = await behind(); if (!(b > 0.2 && b < 0.8)) problems.push(`room mid-fade: behind ${b}`);
    await shot("room-mid"); console.log("room-mid", b);
    await step(Math.round(reveal * 30) + 30);
    b = await behind(); if (b < 0.999) problems.push(`room after: the forest not all back (behind ${b})`);
    await shot("room-after"); console.log("room-after", b);
    // the Terrace as a night starts: the island not ready, dark behind the whole house
    await stand([0, 0]); await ready(false); await step(SETTLE * 2);
    b = await behind(); if (b > 0.01) problems.push(`terrace before: the forest not dark (behind ${b})`);
    await shot("terrace-start"); console.log("terrace-start", b);
  } finally {
    for (const p of problems) console.log("FAIL", p);
    console.log(errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "no page errors");
    await browser.close(); server.close();
  }
  process.exit(problems.length || errors.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
