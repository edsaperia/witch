// MOCK ONLY: the mock wrecks (scratchpad wreckwt's art/country.js wreck-*) drawn where tonight's trunk stands, at ground zoom.
//   node wreck-shots.cjs <dist> <out dir> <seed> <wreck,...>
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [root, outDir, seed = "123", list = "wreck-jet"] = process.argv.slice(2);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  try {
    for (const w of list.split(",")) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
      page.on("pageerror", e => console.log("pageerror", e.message)); page.on("console", m => { if (/error|fail|find/i.test(m.text())) console.log("console", m.text().slice(0, 300)); });
      await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off${w === "trunk" ? "" : `&wreck=${w}`}`);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
      await page.keyboard.press("Enter");
      await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 600000, polling: 500 });
      const T = await page.evaluate(() => window.witch.game.trunk);
      console.log(w, "trunk", JSON.stringify(T));
      const ox = +(process.env.OX || -2.5), oz = +(process.env.OZ || 3.5);
      await page.evaluate(([x, z]) => { const g = window.witch.game; g.witch = { ...g.witch, x, z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: false, seated: false, facing: -1 }; }, [T.x + ox, T.z + oz]);
      const step = (o, n) => page.evaluate(([o, n]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60); }, [o, n]);
      await page.waitForTimeout(5000);
      console.log(await page.evaluate(() => { const a = window.witch.view.assets, i = a.queue.findIndex(j => j.kind === "find"); if (i < 0) return "no find job queued"; const [j] = a.queue.splice(i, 1); a.queue.unshift(j); a.useWorkers = false; a.work(0); a.useWorkers = true; return "drawn " + j.id; }));
      await page.evaluate(([x, z]) => { const g = window.witch.game; g.witch = { ...g.witch, x, z, vx: 0, vz: 0, mode: "ground", lift: 0 }; }, [T.x + ox, T.z + oz]);
      await page.waitForTimeout(6000);
      console.log(await page.evaluate(() => { const v = window.witch.view, g = window.witch.game, T = g.trunk, fa = v.assets.findArt(new URLSearchParams(location.search).get("wreck") ?? "travel-trunk", true); return JSON.stringify({ w: [g.witch.x, g.witch.z, g.witch.mode], T: [T.x, T.z], fa: !!fa, pieces: fa && Object.keys(fa.pieces), batch: !!v.decorBatches.get("finds") }); }));
      if (process.env.ZOOM) { for (let i = 0; i < Math.abs(+process.env.ZOOM); i++) { await step({ zoom: Math.sign(+process.env.ZOOM) }, 1); await step({}, 20); } await step({}, 90); }
      await page.screenshot({ path: path.join(outDir, `${w}.png`), timeout: 300000 });
      console.log("shot", w);
      await page.close();
    }
  } finally { await browser.close(); server.close(); }
})().catch(e => { console.error(e); process.exit(1); });
