// The telescope ready as she wakes (Ed, 2026-11-12, v7872: "Just after waking, I look through the telescope and I see missing trees
// - I think these should be loaded during the loading screen"; 2026-11-13: "fix the others"): the built game (DIST, default dist/)
// at 1280×800, a full load, the telescope opened wide the moment the night starts, at each of 8 bearings in turn (closed and the
// house's view settled between), stepped at a fixed 1/60 s (not drawn but for a saved shot, so the ms are the page's own work, not a software renderer's). For each: the tree chunks in its picture with no trees drawn on its
// first frame and that frame's ms (the game's own count, window.witch.telescope.missing: render/view/scenery.ts scopeMissing), the frames and the
// page's ms till none is, and till no listing is under way and its mist is off (the frames the mist was on counted). Then a turn of 90° at once with it open (N to E), the same. Also the
// load's own marks (witch:prep-*), for what the telescope's part of the loading screen costs. SHOTS=<dir> saves each bearing's
// first frame (and the first look's second). RES=0.25 draws the telescope's picture coarser (?telescopeRes=: quicker on a software renderer, the count the same). SLOW=<n> slows the page's thread n times (a slow machine: the mist's fallback), CHECK=1 fails if any bearing has a
// chunk missing on its first frame. Fails on a page error.
//   npm run build && node tools/telescope/ready.cjs [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [seed = "123"] = process.argv.slice(2), shots = process.env.SHOTS, slow = Number(process.env.SLOW || 0);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const BEARINGS = [["N", 0], ["NE", 45], ["E", 90], ["SE", 135], ["S", 180], ["SW", 225], ["W", 270], ["NW", 315]];
(async () => {
  if (shots) fs.mkdirSync(shots, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = { seed, slow, looks: [] };
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on("pageerror", e => errors.push(e.message));
    const t0 = Date.now();
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0${process.env.RES ? `&telescopeRes=${process.env.RES}` : ""}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 100 });
    out.loadMs = Date.now() - t0; console.error(`loaded in ${out.loadMs} ms`);
    out.marks = await page.evaluate(() => Object.fromEntries(performance.getEntriesByType("mark").filter(m => m.name.startsWith("witch:prep-")).map(m => [m.name.slice(11), Math.round(m.startTime)])));
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 0, null, { timeout: 900000, polling: "raf" });
    await page.evaluate(() => { window.witch.manual = true; });
    if (slow > 1) { const cdp = await page.context().newCDPSession(page); await cdp.send("Emulation.setCPUThrottlingRate", { rate: slow }); }
    const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const frame = (draw = false) => page.evaluate(([c, draw]) => { const t = performance.now(); window.witch.frame(c, 1 / 60, draw); const T = window.witch.telescope; return { ms: performance.now() - t, missing: T.missing, listing: T.listing, mist: T.mist }; }, [C, draw]);
    // One look: frames (and the page's ms in them) till no chunk is missing, and till no listing is under way and its mist is off (the frames the mist was on counted).
    const look = async (name, heading, shot) => {
      await page.evaluate(h => window.witch.telescope.look(h, 0), heading);
      const r = { name, heading, first: null, firstMs: null, frames: null, ms: null, settled: null, settledMs: null, mist: 0, mistOff: null };
      let ms = 0;
      for (let k = 1; k <= 900; k++) {
        const f = await frame(k <= 2 && !!shot && !!shots); ms += f.ms;
        if (k === 1) { r.first = f.missing; r.firstMs = Math.round(f.ms); if (shot && shots) await page.screenshot({ path: path.join(shots, `${name}.png`), timeout: 300000 }); }
        // (the night's very first frame is odd whatever is listed, its depth coming from the house's view: its second one too, for the sheet)
        if (k === 2 && shot && shots && name === "N") await page.screenshot({ path: path.join(shots, "N-2.png"), timeout: 300000 });
        if (f.mist) r.mist++; else if (r.mistOff === null) r.mistOff = k; // (frames its mist was on, and the first with it off)
        if (r.frames === null && f.missing === 0) { r.frames = k; r.ms = Math.round(ms); }
        if (r.frames !== null && !f.listing && !f.mist && !(shot && shots && name === "N" && k < 2)) { r.settled = k; r.settledMs = Math.round(ms); break; }
      }
      console.error(JSON.stringify(r));
      return r;
    };
    for (const [name, heading] of BEARINGS) {
      out.looks.push(await look(name, heading, true));
      await page.evaluate(() => window.witch.telescope.close());
      for (let k = 0; k < 150; k++) { const f = await frame(); if (k > 100 && !f.listing) break; } // (the crowns' reach eased back in, the house's own view listed)
    }
    await look("N", 0, false);
    out.turn = await look("N to E", 90, false); // (turned 90° at once with it open)
    await page.evaluate(() => window.witch.telescope.close());
  } finally { await browser.close(); server.close(); }
  console.log(JSON.stringify({ ...out, errors }, null, 1));
  if (errors.length || (process.env.CHECK && out.looks.some(l => l.first !== 0))) process.exit(1);
})();
