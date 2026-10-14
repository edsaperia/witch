// The treehouse's house, step 1 (Ed, 2026-10-14, docs/backlog/treehouse.md; rules/treehouse.ts): a shot sheet of the built game
// (DIST, default dist/) at 1600×900 for Ed. She's flown straight onto the balcony from the south at treetop height (no button),
// walks into the hub and up to the map, opens the chart with E, walks back out and off the balcony's open rim into the air; and,
// knocked out on the ground, comes back at the magic circle, rises out of its floor and walks to her decks. Shots: approach,
// landed, hub, map, chart, off, circle, rising, decks. Fails on a page error, a landing that doesn't happen, a chart that doesn't
// open, or a respawn that doesn't reach the circle and then the decks.
//   npm run build && node tools/treehouse/shots.cjs <out dir> [seed]      (STEPS=respawn: only the knockout's shots)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/treehouse", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg", ".webp": "image/webp" };
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = {}, t0 = Date.now(), log = (m) => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)} s] ${m}`);
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 4, null, { timeout: 600000, polling: 500 });
    log("ready");
    const KEYS = { W: "KeyW", S: "KeyS", A: "KeyA", D: "KeyD" }, held = new Set();
    const hold = async (want) => { for (const k of Object.keys(KEYS)) { if (want.has(k) && !held.has(k)) { await page.keyboard.down(KEYS[k]); held.add(k); } if (!want.has(k) && held.has(k)) { await page.keyboard.up(KEYS[k]); held.delete(k); } } };
    const release = () => hold(new Set());
    const unpause = async () => { if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Escape"); await wait(400); } };
    /** Walks her toward a target (an expression of the game, giving { x, z }) by the game's own keys until `done` (an expression) holds, or `ms` pass. */
    const walkTo = async (targetJs, doneJs, ms = 240000) => {
      const t1 = Date.now();
      while (Date.now() - t1 < ms) {
        const r = await page.evaluate(([tj, dj]) => { const g = window.witch.game, w = g.witch, T = new Function("g", "w", `return (${tj});`)(g, w), done = new Function("g", "w", `return (${dj});`)(g, w); return { dx: T.x - w.x, dz: T.z - w.z, done }; }, [targetJs, doneJs]);
        if (r.done) break;
        const want = new Set(); if (r.dz < -0.3) want.add("W"); else if (r.dz > 0.3) want.add("S"); if (r.dx > 0.3) want.add("D"); else if (r.dx < -0.3) want.add("A");
        await hold(want); await wait(150);
      }
      await release();
    };
    const state = () => page.evaluate(() => { const w = window.witch.game.witch; return { mode: w.mode, perch: !!w.perch, seated: !!w.seated, x: +w.x.toFixed(1), z: +w.z.toFixed(1), lift: +w.lift.toFixed(2), house: window.witch.game.camera.house }; });
    const shot = async (name) => { await page.screenshot({ path: path.join(outDir, `${name}.png`) }); log(`${name}: ${JSON.stringify(await state())}`); };
    const STEPS = process.env.STEPS || "all";
    if (STEPS !== "respawn") {
    // 1. The approach: at treetop height 70 m south of the balcony, flying north at it (the game's own keys), until she lands.
    await page.evaluate(() => { const g = window.witch.game, T = g.map.treehouse, H = g.tuning.treehouse.house; g.witch = { ...g.witch, x: T.x + 1.5, z: T.z + H.balcony.out + 70, vx: 0, vz: -10, mode: "treetop", lift: 1, perch: undefined, seated: false }; g.camera.intro = 0; });
    await hold(new Set(["W"]));
    await page.waitForFunction(() => { const w = window.witch.game.witch, T = window.witch.game.map.treehouse; return w.z < T.z + 40; }, null, { timeout: 240000, polling: 100 });
    await shot("approach");
    await page.waitForFunction(() => { const w = window.witch.game.witch; return w.mode === "ground" && !!w.perch; }, null, { timeout: 240000, polling: 100 }).catch(() => {});
    await release();
    out.landed = await state();
    await wait(1200);
    await shot("landed");
    // 2. Into the hub, up to the map (walking toward it, whichever way she slid on landing), then E: the chart opens over the game.
    await walkTo("({ x: g.map.treehouse.x, z: g.map.treehouse.z })", "Math.hypot(w.x - g.map.treehouse.x, w.z - g.map.treehouse.z) <= g.tuning.treehouse.house.table + g.tuning.treehouse.house.tableUse - 0.2");
    await wait(1500);
    await shot("hub");
    out.hub = await state();
    await page.keyboard.press("KeyE");
    await page.waitForFunction(() => !!document.querySelector("#chart-overlay"), null, { timeout: 60000, polling: 200 }).catch(() => {});
    await wait(2500);
    await shot("chart");
    out.chart = await page.evaluate(() => !!document.querySelector("#chart-overlay"));
    if (out.chart) { await page.keyboard.press("Escape"); await wait(800); }
    await unpause();
    // 3. Back out and off the open rim (east of the decks' end): she flies again.
    await walkTo("(() => { const T = g.map.treehouse, H = g.tuning.treehouse.house; return { x: T.x + H.balcony.r + 3, z: T.z + H.balcony.out + 2 }; })()", "w.mode === 'rising' || w.mode === 'treetop'", 120000);
    out.off = await state();
    await wait(600);
    await shot("off");
    }
    // 4. A knockout on the ground (the debug arena isn't needed: her hits taken directly), then back at the circle, rising, and the walk to her decks.
    // (her frames without her hat are baked on their own, a moment after the game is up: waited for here, so she shows at the circle)
    await unpause();
    await page.evaluate(() => { window.witch.view.assets.witchBare(); });
    await page.waitForFunction(() => window.witch.view.assets.witchBare().frames.length > 8, null, { timeout: 400000, polling: 500 }).catch(() => {});
    out.bareReady = await page.evaluate(() => window.witch.view.assets.witchBare().frames.length > 8);
    await page.evaluate(() => { const g = window.witch.game, T = g.map.treehouse; g.witch = { ...g.witch, x: T.x + 30, z: T.z + 60, vx: 0, vz: 0, mode: "ground", lift: 0, perch: undefined, seated: false }; });
    await wait(300);
    out.hit = await page.evaluate(() => { const W = window.witch.game.witches[0]; W.health.hp = 1; W.health.hurtAt = -Infinity; return window.witch.hit(); }); // (her last hit: app/hooks.ts)
    const ko = await page.evaluate(() => { const k = window.witch.game.witches[0].ko; return k ? { inAt: k.inAt, riseUntil: k.riseUntil, seatAt: k.seatAt, backAt: k.backAt } : null; });
    out.ko = ko;
    if (ko) {
      await page.waitForFunction(() => { const g = window.witch.game, k = g.witches[0].ko; return !k || g.herTime >= (k.teleportAt + k.inAt) / 2 + 0.15; }, null, { timeout: 400000, polling: 50 });
      await shot("circle");
      await page.waitForFunction(() => { const g = window.witch.game, k = g.witches[0].ko; return !k || g.herTime >= k.riseUntil - 0.25; }, null, { timeout: 400000, polling: 50 });
      await shot("rising");
      await page.waitForFunction(() => { const g = window.witch.game, k = g.witches[0].ko; return !k || g.herTime >= k.seatAt + 0.4; }, null, { timeout: 400000, polling: 50 });
      await shot("decks");
      out.decks = await state();
    }
  } finally { await browser.close(); server.close(); }
  console.log(JSON.stringify({ ...out, errors }));
  const flown = process.env.STEPS === "respawn" || (out.landed && out.landed.mode === "ground" && out.landed.perch && out.off && (out.off.mode === "rising" || out.off.mode === "treetop"));
  const bad = errors.length || !flown || (out.ko && (!out.decks || !out.decks.seated));
  if (bad) process.exit(1);
})();
