// A builder's quick proof shot (the coordinator's ask, 2026-10-23): one picture of a room, an area, a creature or a find in the
// built game, in a minute or two on the cloud's software renderer. The page is loaded with ?shot=<scene> (app/shot.ts: only the
// art the view needs, no start card or bedroom, the waves held, her put at the scene), stepped a frame at a time at a fixed 1/60 s
// while the art it asks for is drawn (window.witch.manual, the view's assets.pending), then the frame is saved.
//   npm run build && node tools/shot/shot.cjs <scene> [out.png] [more of the link]
// Scenes (app/shot.ts): object:<id> (station:<id>), room:<id>, area:<type>, creature:<species>[@level], find:<kind>:<item>,
// find:tonight, at:<x>,<z>[,treetop]. The link's other switches still apply: e.g. "own=none&hat=sentry", "island=fox", "zoom=2".
// SEED (123), SIZE (1280x720), FRAMES (frames stepped once the art is in, 30), DIST (dist/), TIMEOUT (seconds, 600).
// Examples:
//   node tools/shot/shot.cjs object:dressingTable previews/shot/dressing.png
//   node tools/shot/shot.cjs find:hat:sentry previews/shot/sentry.png own=none
//   node tools/shot/shot.cjs creature:fox@1 previews/shot/fox.png zoom=0
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const [scene, outArg, extra = ""] = process.argv.slice(2);
if (!scene) { console.error("usage: node tools/shot/shot.cjs <scene> [out.png] [more of the link]"); process.exit(2); }
const out = path.resolve(outArg || path.join(__dirname, "../../previews/shot", `${scene.replace(/[^a-z0-9@_-]+/gi, "-")}.png`));
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "1280x720").split("x").map(Number), FRAMES = Number(process.env.FRAMES || 30), LIMIT = Number(process.env.TIMEOUT || 600) * 1000;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

(async () => {
  if (!fs.existsSync(path.join(root, "index.html"))) throw new Error(`no build in ${root}: npm run build first`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.on("pageerror", e => errors.push(e.message));
    const link = `http://127.0.0.1:${server.address().port}/?shot=${encodeURIComponent(scene)}&seed=${process.env.SEED || 123}${extra ? "&" + extra.replace(/^[?&]/, "") : ""}`;
    log("loading", link.replace(/^http:\/\/[^/]+/, ""));
    await page.goto(link);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: LIMIT, polling: 500 });
    log("ready");
    // (the loop stands still from here: the frames are stepped, so the picture doesn't race the art)
    await page.evaluate(() => { window.witch.manual = true; });
    if (await page.evaluate(() => window.witch.game.clock.paused)) {
      await page.keyboard.press("Enter");
      await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000, polling: 200 }).catch(() => {});
    }
    const said = await page.evaluate(s => window.witch.lastShot ?? window.witch.shot(s), scene);
    log(said.ok ? "scene:" : "SCENE FAILED:", said.say);
    if (!said.ok) throw new Error(said.say);
    // Step a few frames, then wait for the art they asked for; again until a batch of frames asks for nothing new.
    const step = n => page.evaluate(n => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, i === n - 1); }, n);
    const pending = () => page.evaluate(() => window.witch.view.assets.pending);
    for (let round = 0, calm = 0; calm < 2 && round < 40; round++) {
      await step(10);
      const p = await pending();
      if (p === 0) { calm++; continue; }
      calm = 0;
      await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: LIMIT, polling: 500 });
      log(`art in (${p} sets)`);
    }
    await step(FRAMES);
    await page.screenshot({ path: out, timeout: 300000 });
    const at = await page.evaluate(() => { const g = window.witch.game, w = g.witch; return `${w.x.toFixed(1)}, ${w.z.toFixed(1)} ${w.mode}${w.perch ? " (house)" : ""}`; });
    log(`saved ${path.relative(process.cwd(), out)} (her at ${at})`);
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e.message || e); process.exit(1); });
