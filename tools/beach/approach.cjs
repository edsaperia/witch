// The camera as she nears the sea (Ed, 2026-10-06: "The transition to a lower angle and higher bend should be gradual as you
// approach the beach, over 200m until you're at stargazing at the edge of the sea"):
//   node tools/beach/approach.cjs [dist dir] [out prefix]
// Loads the built game (seed 2), puts her on foot 260 m in from the north coast (the camera looks north, out to sea) and walks
// her north: screenshots at 200 m and 100 m from where she lies down at the water's edge, at it, and lying stargazing, into
// previews/beach-approach-<200|100|edge|lying>.png (or <out prefix>-...), printing how near the water she is and the
// camera's coast and gaze eases at each; failing on page errors or if she never lies down.
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.argv[2] || path.resolve(__dirname, "../../dist")), prefix = path.resolve(process.argv[3] || path.resolve(__dirname, "../../previews/beach-approach"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
server.listen(0, "127.0.0.1", async () => {
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } }), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/?seed=2&spell=auto`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
  await page.evaluate(() => { const g = window.witch.game, c = g.map.bounds.circle; g.witch = { ...g.witch, x: c.x + 3, z: c.z - c.r + 280, seated: false, vx: 0, vz: 0, mode: "ground", lift: 0 }; });
  await page.evaluate(() => window.witch.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, false)); // (the beach's view on, asking for her lying-down art)
  await page.waitForFunction(() => window.witch.view.assets.partyWitchArt(null), null, { timeout: 180000, polling: 250 });
  const step = (n, o = {}) => page.evaluate(([n, o]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60, i === n - 1); }, [n, o]);
  const info = () => page.evaluate(() => {
    const w = window.witch, g = w.game, b = w.view.beachView?.at?.beach, P = g.camera;
    const dx = g.witch.x - (b?.x ?? 0), dz = g.witch.z - (b?.z ?? 0);
    // (from where she lies down: where the edge's soft hold starts, rules/witch.ts)
    return { off: b ? b.edge(Math.atan2(dz, dx)) - (g.tuning.map?.push ?? 0) * 0.6 - Math.hypot(dx, dz) : Infinity, stargazing: !!g.witch.stargazing, coast: +(P.coast ?? 0).toFixed(2), gaze: +(P.gaze ?? 0).toFixed(2) };
  });
  const shoot = async name => { await step(90); await page.waitForTimeout(800); await step(2); const f = `${prefix}-${name}.png`; await page.screenshot({ path: f }); return f; };
  const report = async (name, f) => { const r = await info(); console.log(`${name.padEnd(6)} ${Number.isFinite(r.off) ? r.off.toFixed(0).padStart(4) + " m from the water" : ""}  coast ${r.coast}  gaze ${r.gaze}  → ${path.relative(process.cwd(), f)}`); };
  for (const [name, at] of [["200", 200], ["100", 100], ["edge", 2]]) {
    for (let i = 0; i < 200; i++) { const r = await info(); if (r.off <= at || r.stargazing) break; await step(4, { moveZ: -1 }); }
    await report(name, await shoot(name));
  }
  let lying = false;
  for (let i = 0; i < 60 && !lying; i++) { await step(10, { moveZ: -1 }); lying = (await info()).stargazing; }
  await step(60 * 3);
  await report("lying", await shoot("lying"));
  console.log(`${lying ? "ok  " : "FAIL"} she lay down to stargaze at the edge`);
  console.log(`${errors.length ? "FAIL" : "ok  "} no page errors${errors.length ? ": " + errors.slice(0, 3).join(" | ") : ""}`);
  await browser.close(); server.close();
  process.exit(lying && !errors.length ? 0 : 1);
});
