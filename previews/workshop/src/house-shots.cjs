// MOCK ONLY: the Workshop's bay, lathe and pegboard panels (mock/panels.js) over the live game, the witch in the Workshop.
//   node house-shots.cjs <dist> <out dir> <thumbs dir>
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [root, outDir, thumbs] = process.argv.slice(2);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const H = JSON.parse(fs.readFileSync("/home/user/witch-ws/config/house.json", "utf8"));
const T = Object.fromEntries(fs.readdirSync(thumbs).map(f => [f.replace(".png", ""), "data:image/png;base64," + fs.readFileSync(path.join(thumbs, f)).toString("base64")]));
const panels = fs.readFileSync(path.join(__dirname, "panels.js"), "utf8");
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => console.log("pageerror", e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=123&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    await page.addScriptTag({ content: panels });
    const stand = (x, z) => page.evaluate(([x, z]) => { const g = window.witch.game, T = g.map.treehouse; g.witch = { ...g.witch, x: T.x + x, z: T.z + z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false }; }, [x, z]);
    for (const [shot, objId, kind] of [["bay-menu", "broomStand", "bay"], ["lathe-menu", "broomStand", "lathe"], ["pegboard", "pegboard", "pegboard"]]) {
      const o = H.objects.find(q => q.id === objId);
      await stand(o.x + (process.env.DX ? +process.env.DX : 0), o.z + o.d / 2 + 1.4);
      await page.waitForTimeout(12000); // (the real station panel slides in and the camera eases aside)
      await page.evaluate(([k, T]) => window.__mockPanel(k, T), [kind, T]);
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(outDir, `${shot}.png`) });
      console.log("shot", shot);
    }
  } finally { await browser.close(); server.close(); }
})().catch(e => { console.error(e); process.exit(1); });
