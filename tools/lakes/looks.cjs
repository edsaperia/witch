// Biome lakes in play, MOCK (render/lakeLooks.ts, ?lakelook=), shot from the built game:
//   node tools/lakes/looks.cjs [dist] [seed] [phase] [out dir] [looks,comma,separated]
// Each entry is a look (every lake on the seed's island drawn in it, ?lakelook=) or kind:look@x,z (that kind's island, ?island=,
// at its lake nearest x, z: tools/lakes/looks-map.mjs lists them). For each: loads the game, puts her on foot 14 m from a lake's shore and shoots it from the ground,
// rises and shoots it from the treetops over its edge, zooms out and shoots it from there; and times 60 frames held at each
// (the GPU's work, roughly: under SwiftShader a frame's time follows its pixels' shading) against plain water's.
// Writes <out>/<look>-ground.png, <look>-treetops.png, <look>-far.png and <out>/timings.json.
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [dir = "dist", seed = "1", phase = "4", outDir = "previews/lakelooks", list = "water,glacier,lava,oasis,sinkhole,tarn,tar,rust,lily"] = process.argv.slice(2), root = path.resolve(dir);
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
  const tfile = path.join(outDir, "timings.json"), timings = fs.existsSync(tfile) ? JSON.parse(fs.readFileSync(tfile, "utf8")) : {}, errors = [];
  for (const entry of list.split(";").flatMap(e => (e.includes(":") ? [e] : e.split(",")))) {
    const m = entry.match(/^(\w+):(\w+)@(-?[\d.]+),(-?[\d.]+)$/), look = m ? m[2] : entry, near = m ? [Number(m[3]), Number(m[4])] : process.env.AT ? process.env.AT.split(",").map(Number) : null;
    const query = m ? `island=${m[1]}` : `phase=${phase}&lakelook=${look}`;
    // (a browser a look: SwiftShader's memory isn't all given back by a closed page)
    const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(`${look}: ${e.message}`));
    page.on("console", m => { if (m.type() === "error") errors.push(`${look}: ${m.text().slice(0, 300)}`); });
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&${query}&creator=0&spell=auto`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
    const step = (n, o = {}) => page.evaluate(([n, o]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60, i === n - 1); const b = w.game.witch; return { x: b.x, z: b.z, mode: b.mode }; }, [n, o]);
    const time = () => page.evaluate(() => { const w = window.witch, t0 = performance.now(); for (let i = 0; i < 60; i++) { w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, true); w.view.renderer.getContext().finish(); } return (performance.now() - t0) / 60; });
    // (the lake: the biggest's deepest water; her 14 m ashore of its nearest shore)
    const at = await page.evaluate(near => {
      const g = window.witch.game, W = g.map.bounds.lakes;
      if (!W) return null;
      let best = 0; for (let k = 0; k < W.dist.length; k++) if (W.dist[k] > W.dist[best]) best = k;
      const p = near ? (() => { let b = -1, bd = Infinity; for (let k = 0; k < W.dist.length; k++) if (W.dist[k] > 6) { const x = W.x0 + (k % W.cols) * W.step, z = W.z0 + Math.floor(k / W.cols) * W.step, d = Math.hypot(x - near[0], z - near[1]) - W.dist[k] * 0.5; if (d < bd) { bd = d; b = k; } } return { x: W.x0 + (b % W.cols) * W.step, z: W.z0 + Math.floor(b / W.cols) * W.step }; })() : { x: W.x0 + (best % W.cols) * W.step, z: W.z0 + Math.floor(best / W.cols) * W.step };
      const s = W.shore(p.x, p.z), x = s.x + s.nx * 14, z = s.z + s.nz * 14;
      g.witch = { ...g.witch, x, z, seated: false, vx: 0, vz: 0, mode: "ground", lift: 0 };
      return { x, z, lake: p, nx: -s.nx, nz: -s.nz };
    }, near);
    const tris = await page.evaluate(() => { let n = 0; window.witch.view.scene.traverse(o => { if (o.name === "glacier") n += o.geometry.attributes.position.count / 3; }); return n; });
    if (tris) console.log(`${look}: the glacier's mesh ${tris} triangles`);
    if (!at) { console.log("no lakes on this island"); process.exit(1); }
    // (on foot, south of the water if she can be: turned so the lake is up the screen)
    await step(120);
    // (a dressed lake's shore pieces: their art, drawn by a worker, waited for)
    await page.waitForFunction(() => { const S = window.witch.view.lakeShore; return !S?.night?.pieces.length || !!window.witch.view.assets.lakeShore; }, null, { timeout: 120000, polling: 1000 }).catch(() => console.log(`${look}: shore art never came`));
    await step(30); await page.waitForTimeout(1500); await step(2);
    await page.screenshot({ path: path.join(outDir, `${look}-ground.png`) });
    console.log(`${look}: shore pieces drawn`, await page.evaluate(() => { let n = 0; window.witch.view.scene.traverse(o => { if (/lakeShore/.test(o.name || "") && o.count != null) n += o.count; }); const S = window.witch.view.lakeShore; return { n, pieces: S?.night?.pieces.length, atlas: !!S?.atlas, art: !!window.witch.view.assets.lakeShore, items: S?.items.length }; }));
    const tg = await time();
    await step(1, { toggleMode: true }); await step(150);
    for (let i = 0; i < 6; i++) await step(10, { moveX: at.nx, moveZ: at.nz });
    await step(60); await page.waitForTimeout(1500); await step(2);
    await page.screenshot({ path: path.join(outDir, `${look}-treetops.png`) });
    const tt = await time();
    await step(90, { zoom: 1 }); await step(60); await page.waitForTimeout(1500); await step(2);
    await page.screenshot({ path: path.join(outDir, `${look}-far.png`) });
    const tf = await time();
    timings[look] = { ground: +tg.toFixed(1), treetops: +tt.toFixed(1), far: +tf.toFixed(1) };
    console.log(look, JSON.stringify(timings[look]), `lake at ${Math.round(at.lake.x)}, ${Math.round(at.lake.z)}`);
    await browser.close();
    fs.writeFileSync(tfile, JSON.stringify(timings, null, 1));
  }
  console.log(errors.length ? "errors:\n" + errors.slice(0, 6).join("\n") : "no page errors");
  server.close();
  process.exit(errors.length ? 1 : 0);
});
