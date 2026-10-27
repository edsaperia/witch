// The attack look's cost (render/leash/attackLook.ts): the built game (dist/, or DIST) in headless Chromium on the cloud's software
// renderer, the witch in a quiet arena, FRAMES frames stepped one at a time (window.witch.frame) with and without the showcase
// (?lookdemo=elements: every element's bolt, hit, beam and quake at once, about a busy wave's worth), printing the leash view's
// draw time (the view's "leash" part: the fight's effects are drawn there) and the attack look's quads a frame.
//   FRAMES=120 node tools/attack-look/cost.cjs
const http = require("http"), fs = require("fs"), path = require("path");
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.resolve(__dirname, "../../dist")), FRAMES = +(process.env.FRAMES || 120);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const serve = () => new Promise(r => { const s = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); }); s.listen(0, "127.0.0.1", () => r(s)); });
(async () => {
  const server = await serve(), browser = await pw.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  for (const demo of ["", "elements", "telegraphs"]) {
    const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
    await page.goto(`http://127.0.0.1:${server.address().port}/?creator=0&seed=123&arena=moth*1@0${demo ? `&lookdemo=${demo}` : ""}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
    const r = await page.evaluate(n => {
      const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, leash = [], quads = [], v = window.witch.view;
      for (let i = 0; i < n; i++) { const f = window.witch.frame(C, 1 / 60, true); leash.push((f.ms && f.ms.leash) || 0); quads.push(v.leashView ? v.leashView.look.count : 0); }
      const s = a => [...a].sort((x, y) => x - y), med = a => s(a)[a.length >> 1], p95 = a => s(a)[Math.floor(a.length * 0.95)];
      return { leashMed: med(leash), leashP95: p95(leash), quadsMed: med(quads), quadsMax: Math.max(...quads) };
    }, FRAMES);
    console.log(demo || "none", JSON.stringify(r));
    await page.close();
  }
  await browser.close(); server.close();
})();
