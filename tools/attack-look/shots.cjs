// The attack look in the game (art/attackLook.js, render/leash/attackLook.ts): the built game (dist/, or DIST) in headless
// Chromium, the witch put down on the ground in a quiet arena (a baby moth), the showcase round her (?lookdemo=telegraphs or
// elements: every telegraph kind looping from first warning to its hit, or every element's bolt, hit, beam and quake), and FRAMES
// frames every STEP seconds of game time from a loop's start, side by side into OUT (a png). ZOOM=n zooms in n steps (0, the play
// zoom); LIT=1 puts her by the dancefloor's lights (lit ground), else the dark grass below it; QUERY adds to the page's query.
//   DEMO=telegraphs FRAMES=6 STEP=0.5 OUT=/tmp/tel.png node tools/attack-look/shots.cjs
// DEMO=none: no showcase, the page as QUERY sets it (QUERY='fight=7&attack=<json>': the Fight Arena with an attack of the grammar's).
const http = require("http"), fs = require("fs"), path = require("path");
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.resolve(__dirname, "../../dist"));
const DEMO = process.env.DEMO || "telegraphs", FRAMES = +(process.env.FRAMES || 6), STEP = +(process.env.STEP || 0.5), OUT = process.env.OUT || `look-${DEMO}.png`, W = 1280, H = 720;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const serve = () => new Promise(r => { const s = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); }); s.listen(0, "127.0.0.1", () => r(s)); });
(async () => {
  const server = await serve(), browser = await pw.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: W, height: H } }), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/?creator=0&seed=123${DEMO === "none" ? "" : `&arena=moth*1@0&lookdemo=${DEMO}`}${process.env.QUERY ? `&${process.env.QUERY}` : ""}`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
  if (process.env.LIT) await page.evaluate(() => { const w = window.witch.game.witch; w.x = 0; w.z = 14; });
  for (let i = 0; i < +(process.env.ZOOM ?? 0); i++) await page.keyboard.press("KeyZ");
  await page.waitForTimeout(2500);
  await page.addStyleTag({ content: "body * { visibility: hidden !important } canvas { visibility: visible !important }" });
  const T = DEMO === "elements" ? 2.4 : 3, t0 = await page.evaluate(T => { const t = window.witch.game.clock.time; return (Math.floor(t / T) + 1) * T; }, T), shots = [];
  for (let k = 0; k < FRAMES; k++) {
    await page.waitForFunction(t => window.witch.game.clock.time >= t, t0 + k * STEP + 0.02, { timeout: 120000, polling: 16 });
    shots.push((await page.screenshot()).toString("base64"));
  }
  const sheet = await browser.newPage();
  const url = await sheet.evaluate(async ({ shots, W, H }) => {
    const load = s => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = "data:image/png;base64," + s; });
    const cols = Math.min(3, shots.length), rows = Math.ceil(shots.length / cols), c = document.createElement("canvas"); c.width = cols * W / 2; c.height = rows * H / 2;
    const g = c.getContext("2d"); g.imageSmoothingEnabled = false;
    const ims = await Promise.all(shots.map(load)); ims.forEach((im, i) => g.drawImage(im, W / 4, H / 4, W / 2, H / 2, (i % cols) * W / 2, Math.floor(i / cols) * H / 2, W / 2, H / 2));
    return c.toDataURL("image/png");
  }, { shots, W, H });
  fs.writeFileSync(OUT, Buffer.from(url.split(",")[1], "base64"));
  console.log("wrote", OUT, errors.length ? errors.slice(0, 5) : "no errors");
  await browser.close(); server.close();
})();
