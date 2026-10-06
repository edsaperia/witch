// The beach (Ed, 2026-10-06: "Try and do this in a way that doesn't cost performance - most games
// won't ever go to the beach"): its cost in an ordinary run, and a look at it.
//   node tools/beach/check.cjs [dist dir] [--shots]
// 1. An ordinary run (seed 123, no beach witches): 10 s at full treetop boost north from home and
//    10 s on foot, stepped at a fixed 1/60 s (window.witch.frame), timing each frame's own work
//    (rules and view, undrawn) and counting the draw calls (a frame drawn each second); and checking nothing of the beach is made (the
//    ground's beach uniform off, no sea sound). Run it on an old build's dist too to compare.
// 2. With --shots (a build with the beach): seed 2 (witches on its beach), flown out to the edge
//    over the treetops (a screenshot), on until she lands and lies down (another), then walked over
//    to the beach witches (a third), into previews/beach-*.png; failing on page errors, if she
//    doesn't lie down, or the beach witches never meet her.
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const args = process.argv.slice(2), shots = args.includes("--shots"), root = path.resolve(args.find(a => !a.startsWith("--")) || path.resolve(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
    const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
    if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(r => server.listen(0, "127.0.0.1", () => r(server)));
}
const pct = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(s.length * p))]; };
let failed = false;
const check = (ok, what) => { console.log(`${ok ? "ok  " : "FAIL"} ${what}`); if (!ok) failed = true; };

async function open(browser, port, seed) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } }), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto(`http://127.0.0.1:${port}/?seed=${seed}&spell=auto`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
  return { page, errors };
}

(async () => {
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  if (!args.includes("--no-perf")) {
    const { page, errors } = await open(browser, port, 123);
    const r = await page.evaluate(async () => {
      const w = window.witch, v = w.view, dt = 1 / 60, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }), out = { treetop: [], ground: [], calls: [] };
      // (each frame's own work: rules and view, as the smoke test's boost check, not the software renderer's drawing; drawn every 60th, for its draw calls)
      const fly = async (n, list, extra) => { for (let i = 0; i < n; i++) { const draw = i % 60 === 59, r = w.frame(C(extra), dt, draw); if (draw) out.calls.push(v.renderer.info.render.calls); else list.push(r.step + r.render); if (i % 30 === 0) await new Promise(r => setTimeout(r, 0)); } };
      w.frame(C({ toggleMode: true }), dt, false);
      for (let i = 0; i < 90; i++) w.frame(C({ moveZ: -0.01 }), dt, false); // (up)
      await fly(600, out.treetop, { moveZ: -1 });
      w.frame(C({ toggleMode: true }), dt, false);
      for (let i = 0; i < 90; i++) w.frame(C(), dt, false); // (down)
      await fly(600, out.ground, { moveX: 1 });
      const u = v.ground?.mesh?.material?.uniforms?.uBeach?.value;
      return { ...out, beachOn: u ? u.z > 0 : null, beach: !!w.game.beach };
    });
    const row = (k, a) => console.log(`${k.padEnd(8)} frame work median ${pct(a, 0.5).toFixed(2)} ms  p99 ${pct(a, 0.99).toFixed(2)} ms  worst ${Math.max(...a).toFixed(2)} ms`);
    console.log(`\n${root}: an ordinary run (seed 123)`);
    row("treetop", r.treetop); row("ground", r.ground);
    console.log(`draw calls a frame: median ${pct(r.calls, 0.5)}  max ${Math.max(...r.calls)}`);
    if (r.beachOn !== null) check(!r.beachOn && !r.beach, "nothing of the beach made in an ordinary run (its ground uniform off, no beach witches)");
    check(!errors.length, `no page errors${errors.length ? ": " + errors.slice(0, 3).join(" | ") : ""}`);
    await page.close();
  }
  if (shots) {
    const { page, errors } = await open(browser, port, 2);
    const out = path.resolve(__dirname, "../../previews");
    fs.mkdirSync(out, { recursive: true });
    // Out to the edge toward the beach witches, over the treetops.
    const aim = await page.evaluate(() => {
      const g = window.witch.game, c = g.map.bounds.circle, b = g.beach;
      const a = Math.atan2(b.z - c.z, b.x - c.x) + 0.2, r = c.r - 200; // (along the coast from them: she lies down alone first)
      g.witch = { ...g.witch, x: c.x + Math.cos(a) * r, z: c.z + Math.sin(a) * r, seated: false, vx: 0, vz: 0 };
      return { nx: Math.cos(a), nz: Math.sin(a), witches: b.list.length };
    });
    check(aim.witches > 0, `seed 2 has beach witches (${aim.witches})`);
    const step = (n, o) => page.evaluate(([n, o]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60, i === n - 1); const s = w.game.witch; return { mode: s.mode, stargazing: !!s.stargazing, x: s.x, z: s.z }; }, [n, o]);
    await step(1, { toggleMode: true });
    await step(90, {});
    let s = await step(150, { moveX: aim.nx * 0.5, moveZ: aim.nz * 0.5 });
    await page.waitForTimeout(1500); await step(2, {});
    await page.screenshot({ path: path.join(out, "beach-treetop.png") });
    for (let i = 0; i < 40 && !s.stargazing; i++) s = await step(30, { moveX: aim.nx, moveZ: aim.nz });
    check(s.stargazing && s.mode === "ground", "flying on past the beach she lands and lies down to stargaze");
    const art = (ids) => page.waitForFunction(ids => ids.every(i => window.witch.view.assets.partyWitchArt(i)), ids, { timeout: 120000, polling: 250 }); // (their looks drawn)
    await art([null]); s = await step(30, {});
    await page.screenshot({ path: path.join(out, "beach-stargaze.png") });
    // Over to the witches: walk to them, then keep still.
    await page.evaluate(() => { const g = window.witch.game, b = g.beach, c = g.map.bounds.circle, k = 4 / Math.hypot(b.x - c.x, b.z - c.z); g.witch = { ...g.witch, stargazing: false, x: b.x - (b.x - c.x) * k, z: b.z - (b.z - c.z) * k, vx: 0, vz: 0 }; });
    const met = [];
    for (let i = 0; i < 40; i++) { await step(30, {}); const p = await page.evaluate(() => window.witch.game.beach.players[0]?.pose); if (p && met[met.length - 1] !== p) met.push(p); if (met.length === 2) { await art(await page.evaluate(() => window.witch.game.beach.list.map(w => w.seed % 12))); await step(2, {}); await page.screenshot({ path: path.join(out, "beach-witches.png") }); } }
    check(met.length >= 3, `landed by them, a beach witch comes over: ${met.join(", ")}`);
    await page.evaluate(() => { const g = window.witch.game, c = g.map.bounds.circle; g.witch = { ...g.witch, x: c.x, z: c.z + 30 }; });
    await step(60, {});
    const gone = await page.evaluate(() => window.witch.game.beach.idle);
    check(gone, "back home, the beach witches are left alone");
    check(!errors.length, `no page errors${errors.length ? ": " + errors.slice(0, 3).join(" | ") : ""}`);
    console.log(`screenshots in ${out}/beach-*.png`);
  }
  await browser.close(); server.close();
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
