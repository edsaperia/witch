// A frame strip of an island rising out of the sea as its land arrives on the chart (the map coastlines job, 2026-10-13; Ed:
// "have them appear to emerge from under the sea"): opens chart.html on a build (DIST, default dist/) in a fresh browser (nothing
// kept, so every island is made and comes in turn), waits for the first island after home to arrive, then shoots it every
// EVERY ms of its rise for SECONDS seconds (the chart's clock driven by hand), and lays the frames side by side (cropped round
// the island) into one PNG, plus a webp of it.
//   node tools/chart/emerge.cjs [out dir]   DIST=dist WORLD=0 SIZE=960x600 EVERY=120 SECONDS=1.2 CROP=260
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const env = (k, d) => (process.env[k] === undefined ? d : process.env[k]);
const root = path.resolve(__dirname, "../..", env("DIST", "dist")), out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/chart"));
const WORLD = env("WORLD", "0"), [W, H] = env("SIZE", "960x600").split("x").map(Number), EVERY = Number(env("EVERY", 120)), SECONDS = Number(env("SECONDS", 1.2)), CROP = Number(env("CROP", 260));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".woff2": "font/woff2", ".webp": "image/webp", ".ogg": "audio/ogg", ".wasm": "application/wasm" };
function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname.replace(/\/$/, "/index.html")));
    fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); res.end(data); });
  });
  return new Promise(ok => server.listen(0, "127.0.0.1", () => ok({ server, port: server.address().port })));
}
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const { server, port } = await serve();
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await page.goto(`http://127.0.0.1:${port}/chart.html?world=${WORLD}`);
  await page.waitForFunction(() => window.chart?.chart && window.chart.islands().length > 1, null, { timeout: 180000 });
  // The chart's clock driven by hand (a real-time strip can't be shot here: a frame, let alone a screenshot, takes longer than the
  // rise under the software renderer): held at its moment now, so an island's rise waits for the strip; the second island to
  // arrive is the one watched (home comes first), its moment of arrival noted as its land comes.
  await page.evaluate(() => { const v = window.chart.view, f = v.update.bind(v); window.__at = performance.now() / 1000; v.update = () => f(1 / 60, window.__at); });
  await page.evaluate(() => { const c = window.chart.chart, f = c.reshape.bind(c); window.__came = []; c.reshape = (id, o) => { f(id, o); window.__came.push({ id, rose: c.isles.get(id)?.rose }); }; });
  await page.waitForFunction(() => window.__came.length >= 2, null, { timeout: 600000 });
  const { id, rose } = await page.evaluate(() => window.__came[1]);
  console.log(`${id}'s island came at ${rose} s on the chart's clock`);
  if (!(rose >= 0)) { console.error("its rise wasn't found (rose undefined)"); process.exit(1); }
  // the camera brought over it and closer (a chart opened on home looks at home: the island may be off the screen's top)
  await page.evaluate(id => { const c = window.chart.chart, i = c.isles.get(id); c.focus.set(i.x, 0, i.z); c.aim.copy(c.focus); c.dist = c.distTo = c.distTo * 0.45; window.__at = window.__at; }, id);
  await wait(800);
  const frames = [];
  for (let at = 0; at <= SECONDS * 1000 + 1; at += EVERY) {
    await page.evaluate(({ rose, at }) => { window.__at = rose + at / 1000; }, { rose, at });
    await wait(at === 0 ? 600 : 250);
    const spot = await page.evaluate(id => window.chart.chart.screenOf(id), id);
    if (at === 0) console.log(`on screen at ${Math.round(spot.x)}, ${Math.round(spot.y)}`);
    frames.push({ at, png: await page.screenshot({ clip: { x: Math.max(0, Math.round(spot.x - CROP / 2)), y: Math.max(0, Math.round(spot.y - CROP / 2)), width: CROP, height: CROP } }) });
  }
  // the strip: the frames side by side, each labelled by its time
  const strip = await page.evaluate(async ({ shots, crop }) => {
    const c = document.createElement("canvas"); c.width = crop * shots.length; c.height = crop + 18; const x = c.getContext("2d");
    x.fillStyle = "#05060e"; x.fillRect(0, 0, c.width, c.height);
    for (let i = 0; i < shots.length; i++) { const im = new Image(); im.src = "data:image/png;base64," + shots[i].png; await im.decode(); x.drawImage(im, i * crop, 18); x.fillStyle = "#e8e2f4"; x.font = "12px monospace"; x.fillText(`${(shots[i].at / 1000).toFixed(2)} s`, i * crop + 6, 13); }
    return { png: c.toDataURL("image/png").split(",")[1], webp: c.toDataURL("image/webp", 0.8).split(",")[1] };
  }, { shots: frames.map(f => ({ at: f.at, png: f.png.toString("base64") })), crop: CROP });
  fs.writeFileSync(path.join(out, "emerge-strip.png"), Buffer.from(strip.png, "base64"));
  fs.writeFileSync(path.join(out, "emerge-strip.webp"), Buffer.from(strip.webp, "base64"));
  console.log(`${id}'s island rising: ${frames.length} frames over ${SECONDS} s -> ${path.join(out, "emerge-strip.png")} (and .webp, ${Math.round(Buffer.from(strip.webp, "base64").length / 1024)} KB)`);
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
