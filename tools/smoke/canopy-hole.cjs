// The canopy's hole round her in ground mode (render/sprites.ts; Ed, 2026-10-06: "circle"): the built game (DIST, default dist/)
// at Ed's window (1900×1240, or SIZE=WxH, DPR=n), on the ground in the thickest wood near home on a seed, standing still and then
// walking, each shot after the art has come in. Writes <out dir>/<name>.png.
//   npm run build && node tools/smoke/canopy-hole.cjs [out dir] [seed] [query]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/canopy-hole", seed = "123", query = ""] = process.argv.slice(2);
const [W, H] = (process.env.SIZE || "1900x1240").split("x").map(Number), DPR = +(process.env.DPR || 1);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: DPR });
    page.on("pageerror", e => errors.push(e.message));
    page.on("console", m => { if (m.type() === "error" && /shader|WebGLProgram|program/i.test(m.text())) errors.push(m.text().slice(0, 400)); }); // (a shader that fails to build draws nothing)
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off${query}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 600000, polling: 500 });
    // the wooded spots: where the forest stands thickest, a little way from home (rules' forest density by area)
    const spots = await page.evaluate(() => {
      const g = window.witch.game, D = g.map.dancefloor, out = [];
      for (let k = 0; k < 400 && out.length < 3; k++) {
        const a = k * 2.399, r = 140 + k * 3, x = D.x + Math.cos(a) * r, z = D.z + Math.sin(a) * r;
        const f = g.forest;
        const n = f.treesNear(x, z, 25).length;
        if (n >= 18) out.push({ x, z, n });
      }
      if (!out.length) out.push({ x: D.x + 220, z: D.z - 180, n: -1 });
      return out;
    });
    console.log("spots", JSON.stringify(spots.map(s => ({ x: Math.round(s.x), z: Math.round(s.z), n: s.n }))));
    let i = 0;
    for (const s of spots) {
      i++;
      await page.evaluate(s => { const g = window.witch.game; g.witch = { ...g.witch, x: s.x, z: s.z, seated: false, mode: "ground", lift: 0, vx: 0, vz: 0 }; g.clock.paused = false; }, s);
      await page.waitForTimeout(i === 1 ? 25000 : 8000);
      await page.screenshot({ path: path.join(outDir, `still${i}.png`) });
      if (process.env.ZOOMS && i === 2) for (const [k, key] of [["in1", "KeyZ"], ["in2", "KeyZ"], ["in3", "KeyZ"], ["out1", "KeyX"], ["out2", "KeyX"], ["out3", "KeyX"], ["out4", "KeyX"], ["out5", "KeyX"]]) {
        await page.keyboard.press(key); await page.waitForTimeout(3500); await page.screenshot({ path: path.join(outDir, `zoom-${k}.png`) });
        console.log("zoom", k, await page.evaluate(() => JSON.stringify({ zoom: window.witch.view.zoomStep ?? window.witch.game.camera?.zoom ?? null })));
      }
      // walking north a few seconds, then the shot as she goes
      await page.keyboard.down("KeyW"); await page.waitForTimeout(2500); await page.screenshot({ path: path.join(outDir, `walk${i}.png`) }); await page.keyboard.up("KeyW");
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
