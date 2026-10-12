// Lakes in play (Ed, 2026-10-11, the journey's lakes: rules/lakes.ts), shot from the built game:
//   node tools/lakes/shots.cjs [dist] [seed] [phase] [out dir]
// Loads it on that seed and phase (?phase=: its islands have lakes from 1), puts her on foot by a lake (one with koi if any),
// shoots the shore from the ground; walks her at the water (she must stop at its shore); rises, shoots it from the treetops over
// the water; asks her down over the water (she must not land) and flies her ashore (she must). Fails on a page error or any of
// those. Writes <out>/lake-ground.png, lake-shore.png (stopped at it), lake-treetops.png and lake-koi.png (held low over its middle).
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [dir = "dist", seed = "1", phase = "4", outDir = "previews/lakes"] = process.argv.slice(2), root = path.resolve(dir);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
server.listen(0, "127.0.0.1", async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } }), errors = [], fails = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&phase=${phase}&creator=0&spell=auto`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
  const step = (n, o = {}) => page.evaluate(([n, o]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60, i === n - 1); const b = w.game.witch; return { x: b.x, z: b.z, mode: b.mode, lift: b.lift }; }, [n, o]);
  // (a lake: one with koi if the view has any, its deepest water; her 14 m ashore of its nearest shore, south of it if she can)
  const at = await page.evaluate(() => {
    const g = window.witch.game, W = g.map.bounds.lakes;
    if (!W) return null;
    const koi = window.witch.view.ground.mesh.material.uniforms.uKoi.value.filter(v => v.z > 0);
    let p;
    if (koi.length) p = { x: koi[0].x, z: koi[0].y };
    else { let best = 0; for (let k = 0; k < W.dist.length; k++) if (W.dist[k] > W.dist[best]) best = k; p = { x: W.x0 + (best % W.cols) * W.step, z: W.z0 + Math.floor(best / W.cols) * W.step }; }
    const s = W.shore(p.x, p.z), x = s.x + s.nx * 14, z = s.z + s.nz * 14;
    g.witch = { ...g.witch, x, z, seated: false, vx: 0, vz: 0, mode: "ground", lift: 0 };
    return { x, z, lake: p, nx: -s.nx, nz: -s.nz, koi: koi.length };
  });
  if (!at) { console.log("no lakes on this island"); await browser.close(); server.close(); process.exit(1); }
  const depth = () => page.evaluate(() => { const g = window.witch.game, W = g.map.bounds.lakes; return W.distAt(g.witch.x, g.witch.z); });
  await step(120); await page.waitForTimeout(1500); await step(2);
  await page.screenshot({ path: path.join(outDir, "lake-ground.png") });
  // walking straight at the water: she stops at its shore
  await step(300, { moveX: at.nx, moveZ: at.nz });
  const d1 = await depth();
  if (d1 > -1) fails.push(`walked onto the water (${d1.toFixed(2)} m in)`);
  await step(2); await page.screenshot({ path: path.join(outDir, "lake-shore.png") });
  // up, out over the water, and asked down there: she holds off it
  await step(1, { toggleMode: true }); await step(120);
  // (to the lake's middle: its koi's, if it has them)
  for (let i = 0; i < 40; i++) { const b = await step(1); const dx = at.lake.x - b.x, dz = at.lake.z - b.z, d = Math.hypot(dx, dz); if (d < 6) break; await step(10, { moveX: dx / d, moveZ: dz / d }); }
  await step(90);
  await page.waitForTimeout(1500); await step(2);
  await page.screenshot({ path: path.join(outDir, "lake-treetops.png") });
  // (her asked down over the middle: she holds low over the water, the koi under her)
  const over = await depth();
  await step(1, { toggleMode: true }); const down = await step(240);
  if (over > 0 && down.mode === "ground") fails.push("landed on the water");
  await page.waitForTimeout(1000); await step(2);
  await page.screenshot({ path: path.join(outDir, "lake-koi.png") });
  // and flown back ashore, she lands
  let b = down;
  for (let i = 0; i < 40 && b.mode !== "ground"; i++) b = await step(15, { moveX: -at.nx, moveZ: -at.nz });
  if (b.mode !== "ground") fails.push("never landed ashore");
  console.log(`lake at ${Math.round(at.lake.x)}, ${Math.round(at.lake.z)} (${at.koi} with koi); stopped ${(-d1).toFixed(2)} m ashore; over the water ${over.toFixed(1)} m in, asked down: ${down.mode} at lift ${down.lift.toFixed(2)}; ashore: ${b.mode}; ${errors.length ? "errors: " + errors.slice(0, 2).join(" | ") : "no page errors"}${fails.length ? "\nFAIL: " + fails.join("; ") : ""}`);
  await browser.close(); server.close();
  process.exit(fails.length || errors.length ? 1 : 0);
});
