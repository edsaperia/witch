// The picture's contrast: what nothing lights against what's lit (Ed's v5399 playtest, 2026-10-29: "Contrast on the visuals seems
// low; the important parts of the scene don't stand out very well. The unlit forest needs to be darker"). From the built game, a few
// views, each shot at the mood's unlit (light.spooky.unlit) set to each of UNLIT, and the drawn picture's luminance measured off its
// own pixels (the drawing buffer, read as it's drawn):
//   dark  the 10th and 25th percentiles (the unlit forest floor and crowns)
//   mid   the median
//   lit   the 90th and 99th percentiles (the fires, the party's lights, her pool, runestones, sigils)
//   her   the mean over a box round the screen's middle (she's drawn there)
//   key   lit p99 over dark p25: how far what's lit stands out
// Frames <out>/<view>-<unlit>.png, numbers <out>/contrast.json.
//   npm run build && node tools/shot/contrast.cjs [out dir]   (SEED=542195, LINK= more of the link, UNLIT=1,0.75,0.6,0.5,
//   VIEWS=playtest,party,treetop, SIZE=1106x743 (Ed's window), PX= pixel size, DIST=dist, PINS=1 the pointers before and after)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/shot/contrast"));
const SEED = process.env.SEED || "542195", [W, H] = (process.env.SIZE || "1106x743").split("x").map(Number);
// (the playtest's own island and world: previews/ed/playtests/witch-playtest-542195-2026-10-29-00-18.json, its debug link)
const LINK = process.env.LINK ?? "world=1268398697&island=ibex&found=squirrel,hedgehog&hat=none&creator=0";
const UNLIT = (process.env.UNLIT || "1,0.75,0.6,0.5").split(",").map(Number);
const VIEWS = (process.env.VIEWS || "playtest,party,treetop").split(",");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], result = {};
  try {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.on("pageerror", e => errors.push(e.message));
    // (the playtest's spot: the debug link's at=4060,4621, on foot)
    await page.goto(`http://127.0.0.1:${server.address().port}/?shot=at:4060,4621&seed=${SEED}&${LINK}${process.env.PX ? `&px=${process.env.PX}` : ""}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.evaluate(() => { window.witch.manual = true; });
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 }).catch(() => {}); }
    const said = await page.evaluate(() => window.witch.lastShot ?? window.witch.shot("at:4060,4621"));
    if (!said.ok) throw new Error(said.say);
    const step = n => page.evaluate(n => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, i === n - 1 || i % 6 === 5); }, n);
    const settle = async () => { for (let round = 0, calm = 0; calm < 2 && round < 60; round++) { await step(10); if ((await page.evaluate(() => window.witch.view.assets.pending)) === 0) calm++; else { calm = 0; await page.waitForTimeout(1500); } } await step(30); };
    const put = (x, z, mode) => page.evaluate(([x, z, mode]) => { const g = window.witch.game, b = g.witches[0].body; g.witches[0].body = { ...b, x, z, vx: 0, vz: 0, mode, lift: mode === "treetop" ? 1 : 0, perch: false, seated: false }; }, [x, z, mode]);
    const df = await page.evaluate(() => { const d = window.witch.game.map.dancefloor; return { x: d.x, z: d.z, r: d.radius }; });
    const SPOTS = { playtest: [4060, 4621, "ground"], party: [df.x, df.z + df.r + 14, "ground"], treetop: [4060, 4621, "treetop"] };
    // the drawn picture's luminance, read off the drawing buffer as it's drawn (one frame, drawn in this same task)
    const measure = () => page.evaluate(() => {
      const w = window.witch, gl = w.view.renderer.getContext(), cw = gl.drawingBufferWidth, ch = gl.drawingBufferHeight, px = new Uint8Array(cw * ch * 4);
      w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, true);
      gl.readPixels(0, 0, cw, ch, gl.RGBA, gl.UNSIGNED_BYTE, px);
      const lum = new Float32Array(cw * ch); let her = 0, hn = 0;
      for (let i = 0, y = 0; y < ch; y++) for (let x = 0; x < cw; x++, i++) {
        const l = (0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2]) / 255; lum[i] = l;
        if (Math.abs(x - cw / 2) < cw * 0.03 && Math.abs(y - ch / 2) < ch * 0.06) { her += l; hn++; }
      }
      const s = Float32Array.from(lum).sort(), q = p => s[Math.min(s.length - 1, Math.floor(p * s.length))];
      return { p10: q(0.1), p25: q(0.25), p50: q(0.5), p90: q(0.9), p99: q(0.99), her: her / Math.max(1, hn) };
    });
    for (const v of VIEWS) {
      const [x, z, mode] = SPOTS[v]; await put(x, z, mode); await settle();
      result[v] = {};
      for (const u of UNLIT) {
        await page.evaluate(u => { window.witch.tuning.light.spooky.unlit = u; }, u);
        await step(12);
        const m = await measure(), r = n => +n.toFixed(4);
        result[v][u] = { p10: r(m.p10), p25: r(m.p25), p50: r(m.p50), p90: r(m.p90), p99: r(m.p99), her: r(m.her), key: +(m.p99 / Math.max(1e-3, m.p25)).toFixed(2) };
        await page.screenshot({ path: path.join(out, `${v}-${u}.png`), timeout: 300000 });
        log(v, u, JSON.stringify(result[v][u]));
      }
      // (PINS=1: the edge pointers as before, no plate and fully calmed, and as tuned, at the last unlit: pins-<view>-<before|after>.png)
      if (process.env.PINS) for (const [n, k] of [["before", { plate: 0, vivid: 0 }], ["after", null]]) {
        await page.evaluate(k => { const p = window.witch.tuning.pins, s = window.__pins ??= { plate: p.plate, vivid: p.vivid }; Object.assign(p, k ?? s); }, k);
        await step(12); await page.screenshot({ path: path.join(out, `pins-${v}-${n}.png`), timeout: 300000 }); log("pins", v, n);
      }
    }
    fs.writeFileSync(path.join(out, "contrast.json"), JSON.stringify({ seed: SEED, link: LINK, size: `${W}x${H}`, views: SPOTS, result }, null, 2));
  } finally { await browser.close(); server.close(); }
  console.log(errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "no page errors");
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
