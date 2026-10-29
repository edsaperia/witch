// The wild stumps' wisps (Ed, 2026-10-29: "pre-soundsystem stump area lighting should change to be more like eerie moonlight ... a mix
// of blue/green/white wisps ... that move around the stump area"; render/stumpWisps.ts): from a built game, her a little south of the
// nearest wild stump, on foot and from the treetops, a few moments apart as the wisps drift; and the light they add, read off the
// drawn picture (the drawing buffer) with the wisps on and off at the same moment: energy (summed luminance), px (pixels lifted over
// 0.02) and the mean colour of what they add (cool: blue and green over red). Frames <out>/<name>-<view>-<n>.png, numbers
// <out>/wisps-<name>.json.
//   npm run build && node tools/shot/wisps.cjs [out dir]   (NAME=after, DIST=dist (a build of the base for NAME=before), SEED=542195,
//   LINK= more of the link, SIZE=1106x743, MOMENTS=3, VIEWS=ground,treetop)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/shot/wisps"));
const NAME = process.env.NAME || "after", SEED = process.env.SEED || "542195", [W, H] = (process.env.SIZE || "1106x743").split("x").map(Number), MOMENTS = Number(process.env.MOMENTS ?? 3);
const LINK = process.env.LINK ?? "world=1268398697&island=ibex&found=squirrel,hedgehog&hat=none&creator=0";
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
    await page.goto(`http://127.0.0.1:${server.address().port}/?shot=at:4060,4621&seed=${SEED}&${LINK}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.evaluate(() => { window.witch.manual = true; });
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 }).catch(() => {}); }
    const said = await page.evaluate(() => window.witch.lastShot ?? window.witch.shot("at:4060,4621"));
    if (!said.ok) throw new Error(said.say);
    const step = (n, dt = 1 / 60) => page.evaluate(([n, dt]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, dt, i === n - 1 || i % 6 === 5); }, [n, dt]);
    const settle = async () => { for (let round = 0, calm = 0; calm < 2 && round < 60; round++) { await step(10); if ((await page.evaluate(() => window.witch.view.assets.pending)) === 0) calm++; else { calm = 0; await page.waitForTimeout(1500); } } await step(30); };
    // the nearest wild stump (the markers' list: areas before their soundsystems)
    const st = await page.evaluate(() => { const g = window.witch.game, b = g.witches[0].body, L = window.witch.view.markerCache.list; const m = [...L].sort((p, q) => Math.hypot(p.x - b.x, p.z - b.z) - Math.hypot(q.x - b.x, q.z - b.z))[0]; return m ? { x: m.x, z: m.z, key: m.key } : null; });
    if (!st) throw new Error("no wild stump");
    log("stump", JSON.stringify(st));
    const put = mode => page.evaluate(([x, z, mode]) => { const g = window.witch.game, b = g.witches[0].body; g.witches[0].body = { ...b, x, z, vx: 0, vz: 0, mode, lift: mode === "treetop" ? 1 : 0, perch: false, seated: false }; }, [st.x, st.z + (mode === "treetop" ? 14 : 11), mode]);
    const lum = () => page.evaluate(() => { const w = window.witch, gl = w.view.renderer.getContext(), cw = gl.drawingBufferWidth, ch = gl.drawingBufferHeight, px = new Uint8Array(cw * ch * 4); w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 0, true); gl.readPixels(0, 0, cw, ch, gl.RGBA, gl.UNSIGNED_BYTE, px); return Array.from(px); });
    for (const view of (process.env.VIEWS || "ground,treetop").split(",")) {
      await put(view); await settle();
      const sum = { energy: 0, px: 0, r: 0, g: 0, b: 0 };
      for (let n = 0; n < MOMENTS; n++) {
        await step(60 * 2); // (two seconds on: the wisps drift)
        await page.screenshot({ path: path.join(out, `${NAME}-${view}-${n}.png`), timeout: 300000 });
        // the wisps on and off at this moment (a build without them: its stump light on and off instead, runeMarkers.stump.light)
        const on = await lum();
        const had = await page.evaluate(() => { const S = window.witch.tuning.runeMarkers.stump, k = { w: S.wisps?.on, s: S.light.strength }; if (S.wisps) S.wisps.on = false; S.light.strength = 0; return k; });
        const off = await lum();
        await page.evaluate(k => { const S = window.witch.tuning.runeMarkers.stump; if (S.wisps) S.wisps.on = k.w; S.light.strength = k.s; }, had);
        for (let i = 0; i < on.length; i += 4) { const dr = on[i] - off[i], dg = on[i + 1] - off[i + 1], db = on[i + 2] - off[i + 2], d = (0.2126 * dr + 0.7152 * dg + 0.0722 * db) / 255; if (d > 0) sum.energy += d / MOMENTS; if (d > 0.02) { sum.px += 1 / MOMENTS; sum.r += dr; sum.g += dg; sum.b += db; } }
      }
      const n = Math.max(1, sum.r + sum.g + sum.b);
      result[view] = { energy: +sum.energy.toFixed(1), px: Math.round(sum.px), mix: { r: +(sum.r / n).toFixed(2), g: +(sum.g / n).toFixed(2), b: +(sum.b / n).toFixed(2) } };
      log(view, JSON.stringify(result[view]));
    }
    fs.writeFileSync(path.join(out, `wisps-${NAME}.json`), JSON.stringify({ name: NAME, seed: SEED, stump: st, result }, null, 2));
  } finally { await browser.close(); server.close(); }
  console.log(errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "no page errors");
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
