// Shared recorder: serves a built dist, loads the game headless with ?shot (quick art), steps frames by hand at 1/60 s and
// saves every other frame (30 fps, so the encoded clip is real time).
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg", ".mp3": "audio/mpeg", ".wav": "audio/wav" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

async function open({ dist, link, size = [1280, 720], launchArgs = [], init }) {
  const root = path.resolve(dist);
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", ...launchArgs] });
  const page = await browser.newPage({ viewport: { width: size[0], height: size[1] } });
  page.setDefaultTimeout(300000);
  const errors = [];
  page.on("pageerror", e => { errors.push(e.message); log("PAGE ERROR", e.message); });
  if (process.env.DEBUG) page.on("console", m => console.log("console:", m.text().slice(0, 300)));
  if (init) await page.addInitScript(init);
  log("loading", link);
  await page.goto(`http://127.0.0.1:${server.address().port}/${link}`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
  log("ready");
  const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
  const step = (o = {}, n = 1, draw = true) => page.evaluate(([o, n, draw, idle]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame({ ...idle, ...o }, 1 / 60, draw && i === n - 1); }, [o, n, draw, idle]);
  const artIn = async () => { // step a few frames, wait for the art they asked for, until a batch asks for nothing new
    for (let round = 0, calm = 0; calm < 2 && round < 40; round++) {
      await step({}, 10);
      const p = await page.evaluate(() => window.witch.view.assets.pending);
      if (p === 0) { calm++; continue; }
      calm = 0;
      await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 900000, polling: 500 });
      log(`art in (${p} sets)`);
    }
  };
  const waitArt = async () => { if (await page.evaluate(() => window.witch.view.assets.pending) > 0) await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 900000, polling: 200 }); };
  const close = async () => { await browser.close(); server.close(); };
  return { page, step, artIn, waitArt, close, errors, log };
}

/** A frame writer into dir: shoot() saves the page as the next numbered jpeg. */
function film(page, dir) {
  fs.mkdirSync(dir, { recursive: true });
  let n = 0;
  return { shoot: async () => { await page.screenshot({ path: path.join(dir, `f${String(n++).padStart(5, "0")}.jpg`), type: "jpeg", quality: 92 }); }, get n() { return n; } };
}
module.exports = { open, film, log };
