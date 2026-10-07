// Where a frame allocates (phase 2's GC audit, the view's side; tools/bench/alloc.mjs is the rules'): the built game
// (DIST, default dist/) at 1280x720, a seed brought to a late wave with the playtest key, the witch flying the treetops
// then the ground through the crowd, frame by frame at a fixed 1/60 s (window.witch.frame) while Chromium's sampling
// heap profiler records every allocation by function. Prints KB a frame and the top allocators (self) with their files.
//   npm run build && node tools/bench/viewalloc.cjs [seed] [wave] [frames]   (DIST=..., TOP=30, MODE=treetop|ground|fight,
//   Q="arena=wolf*6@1,boar*6@1" for more of the link's switches)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [seed = "123", wave = "20", frames = "120"] = process.argv.slice(2), TOP = +(process.env.TOP || 30), MODE = process.env.MODE || "treetop";
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".mp3": "audio/mpeg" };
(async () => {
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0${process.env.Q ? "&" + process.env.Q : ""}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 1, null, { timeout: 600000, polling: 500 });
    // To the late wave, rules only (no drawing), then let the art in.
    const at = await page.evaluate(([W, mode]) => {
      const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, g = window.witch.game;
      let guard = 0;
      while (g.party.wave < W && !g.partyOver && guard++ < W * 400) { window.witch.frame({ ...C, nextWave: true }, 1 / 60, false); for (let i = 0; i < 120; i++) window.witch.frame(C, 1 / 60, false); }
      if ((mode === "treetop") !== (g.witch.mode === "treetop")) window.witch.frame({ ...C, toggleMode: true }, 1 / 60, false);
      return { wave: g.party.wave, creatures: g.creatures.filter(c => !c.gone).length, mode: g.witch.mode };
    }, [+wave, MODE]);
    console.log("at", JSON.stringify(at));
    await page.waitForTimeout(20000);
    await page.evaluate(f => { window.FIRE = f; }, MODE === "fight"); // (fight: on the ground, walking slowly, 💌s held down and aimed round)
    for (let i = 0; i < 30; i++) await page.evaluate(i => window.witch.frame({ moveX: Math.cos(i / 40) * (window.FIRE ? 0.3 : 1), moveZ: Math.sin(i / 40) * (window.FIRE ? 0.3 : 1), toggleMode: false, zoom: 0, fire: !!window.FIRE, aimX: Math.cos(i / 9), aimZ: Math.sin(i / 9) }, 1 / 60, true), i); // (warm)
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("HeapProfiler.enable");
    await cdp.send("HeapProfiler.startSampling", { samplingInterval: 1024, includeObjectsCollectedByMajorGC: true, includeObjectsCollectedByMinorGC: true });
    const ms = [];
    for (let i = 0; i < +frames; i++) ms.push(await page.evaluate(i => { const r = window.witch.frame({ moveX: Math.cos(i / 40) * (window.FIRE ? 0.3 : 1), moveZ: Math.sin(i / 40) * (window.FIRE ? 0.3 : 1), toggleMode: false, zoom: 0, fire: !!window.FIRE, aimX: Math.cos(i / 9), aimZ: Math.sin(i / 9) }, 1 / 60, true); return r.step + r.render; }, i + 30));
    const { profile } = await cdp.send("HeapProfiler.stopSampling");
    const by = new Map(); let total = 0;
    const walk = n => { const f = n.callFrame, k = `${f.functionName || "(anon)"}  ${f.url.split("/").pop()}:${f.lineNumber + 1}`; by.set(k, (by.get(k) || 0) + n.selfSize); total += n.selfSize; (n.children || []).forEach(walk); };
    walk(profile.head);
    ms.sort((a, b) => a - b);
    console.log(`${frames} frames: ${(total / +frames / 1024).toFixed(1)} KB allocated a frame (sampled); frame work median ${ms[ms.length >> 1].toFixed(1)} ms (software GL)`);
    for (const [k, v] of [...by].sort((a, b) => b[1] - a[1]).slice(0, TOP)) console.log(`${(v / +frames / 1024).toFixed(2).padStart(8)}  ${(100 * v / total).toFixed(1).padStart(5)}%  ${k}`);
  } finally { await browser.close(); server.close(); }
})();
