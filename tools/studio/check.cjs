// The treehouse Studio's instruments in the built game (Ed, 2026-10-23; rules/studio.ts, app/studio.ts, ui/studioPanel.ts), in
// headless Chromium: she's stood in front of the drum kit, the modular synth and the microphone in turn. Each one must wait for E
// (Ed's playtest, 2026-10-26: nothing opens by nearness), then its menu must slide in and her keys must play it: the drum pads, the synth's held notes with the arrows' live controls and Space's latch, and the
// mic's notes with harmony. Each must be heard (the Studio's meter: not silent, nothing NaN). The loop must play on 1, and Esc
// must step her away without pausing and keep the instrument shut while she's still by it (till E). Fails on a page error. Also shoots each
// menu into <out dir>, and the mic with her stood aside (its spotlight, render/spotlight.ts).
//   npm run build && node tools/studio/check.cjs [out dir] [dist]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/studio", dist] = process.argv.slice(2);
const root = path.resolve(dist || process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const H = require("../../config/house/load.mjs").loadHouse();
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"] });
  const errors = [], fails = [];
  const ok = (cond, what) => { console.log(`${cond ? "ok  " : "FAIL"} ${what}`); if (!cond) fails.push(what); };
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=123&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    // in front of an object (on the side facing its room's middle), on the house's floor
    const stand = o => page.evaluate(o => {
      const r = { studio: [-13.79, -11.57] }[o.room] || [0, 0], dx = r[0] - o.x, dz = r[1] - o.z, side = Math.abs(dx) > Math.abs(dz);
      const x = side ? o.x + Math.sign(dx) * (o.w / 2 + 0.5) : o.x, z = side ? o.z : o.z + Math.sign(dz || 1) * (o.d / 2 + 0.5);
      const g = window.witch.game, T = g.map.treehouse; g.witch = { ...g.witch, x: T.x + x, z: T.z + z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false };
    }, o);
    // (stood by it: nothing yet; then E, pressed till the rules' step has seen her there)
    const use = async want => { await page.waitForTimeout(1500); ok(await page.evaluate(() => window.witch.studio.at === null), "stood by it, nothing opens till E"); for (let i = 0; i < 20 && !(await page.evaluate(w => window.witch.studio.at === w, want)); i++) { await page.keyboard.press("KeyE"); await page.waitForTimeout(1000); } };
    const atIs = (want, ms = 120000) => page.waitForFunction(w => window.witch.studio.at === w, want, { timeout: ms, polling: 200 }).then(() => true, () => false);
    const listen = ms => page.evaluate(ms => new Promise(res => {
      const a = window.witch.studio.meter; if (!a) return res({ rms: 0, bad: false });
      const buf = new Float32Array(a.fftSize); let peak = 0, bad = false; const t0 = performance.now();
      const id = setInterval(() => { a.getFloatTimeDomainData(buf); let s = 0; for (const x of buf) { if (!Number.isFinite(x)) bad = true; s += x * x; } peak = Math.max(peak, Math.sqrt(s / buf.length)); if (performance.now() - t0 > ms) { clearInterval(id); res({ rms: peak, bad }); } }, 15);
    }), ms);
    const heard = (r, what) => ok(!r.bad && r.rms > 0.003, `${what}: rms ${r.rms.toFixed(4)}${r.bad ? " (NaN)" : ""}`);
    const tap = async (keys, times = 3) => { for (let i = 0; i < times; i++) for (const k of keys) { await page.keyboard.down(k); await page.waitForTimeout(60); await page.keyboard.up(k); } };
    const obj = id => H.objects.find(o => o.id === id);

    // the drum kit
    await stand(obj("drumKit")); await use("drums");
    ok(await atIs("drums"), "E at the drum kit, she's at it");
    ok(await page.evaluate(() => document.getElementById("studio-panel")?.classList.contains("in")), "its menu slides in");
    const drums = listen(2500); await tap(["Space", "f", "j", "d", "ArrowUp"], 4); heard(await drums, "the drum pads");
    await page.screenshot({ path: path.join(outDir, "drum-kit.png") });
    // the loop, on and off (1)
    await page.keyboard.press("Digit1");
    ok(await page.evaluate(() => window.witch.studio.state.loop.on), "1 starts the loop");
    heard(await listen(2500), "the loop");
    await page.keyboard.press("Digit1");
    // Esc: she steps away, not paused, and it stays shut while she's still by it
    await page.keyboard.press("Escape");
    ok(await atIs(null, 20000), "Esc steps her away");
    await page.waitForTimeout(1500);
    const shut = await page.evaluate(() => { const s = window.witch.studio, P = s.state.players[0]; return { at: s.at, object: P.object, paused: window.witch.game.clock.paused, frozen: !!document.querySelector(".freeze-on, body.frozen") }; });
    ok(shut.at === null && !shut.paused, `it stays shut while she's still by it, and the game isn't paused (${JSON.stringify(shut)})`);

    // the modular synth: held notes, the arrows' live controls, Space's latch
    await stand(obj("synthRack")); await use("synth");
    ok(await atIs("synth"), "E at the modular synth, she's at it");
    const synth = listen(2500);
    await page.keyboard.down("a"); await page.keyboard.down("d"); await page.keyboard.down("ArrowUp"); await page.waitForTimeout(1200);
    await page.keyboard.up("ArrowUp"); await page.keyboard.down("ArrowRight"); await page.waitForTimeout(600); await page.keyboard.up("ArrowRight");
    heard(await synth, "held synth notes with the live controls");
    await page.keyboard.press("Space"); await page.keyboard.up("a"); await page.keyboard.up("d");
    heard(await listen(800), "Space's latch holds them");
    await page.screenshot({ path: path.join(outDir, "modular-synth.png") });
    await page.keyboard.press("Space"); await page.waitForTimeout(3000);
    const after = await listen(500); ok(after.rms < 0.01, `let go, they fall quiet: rms ${after.rms.toFixed(4)}`);
    await page.keyboard.press("Escape"); await atIs(null, 20000);

    // the microphone: her voice, with harmony
    await stand(obj("microphone")); await use("mic");
    ok(await atIs("mic"), "E at the microphone, she's at it");
    await page.waitForTimeout(1500); // (her recordings loading)
    const mic = listen(2500);
    await page.keyboard.down("a"); await page.waitForTimeout(900); await page.keyboard.up("a");
    await page.keyboard.down("Space"); await page.keyboard.down("g"); await page.waitForTimeout(900); await page.keyboard.up("g"); await page.keyboard.up("Space");
    heard(await mic, "her singing voice, and its harmony");
    // (the movement keys are notes: she stands still at it)
    const m0 = await page.evaluate(() => { const b = window.witch.game.witches[0].body; return [b.x, b.z]; });
    await page.keyboard.down("KeyD"); await page.waitForTimeout(600); await page.keyboard.up("KeyD");
    const m1 = await page.evaluate(() => { const b = window.witch.game.witches[0].body; return [b.x, b.z]; });
    ok(Math.hypot(m1[0] - m0[0], m1[1] - m0[1]) < 0.05 && await page.evaluate(() => window.witch.studio.at === "mic"), "the movement keys play it, she doesn't walk off");
    await page.keyboard.press("ArrowDown");
    ok(await page.evaluate(() => window.witch.studio.state.players[0].vowel === "ooh"), "the arrows choose the vowel");
    await page.screenshot({ path: path.join(outDir, "microphone.png") });
    // E leaves, as it closes everything (Ed, 2026-10-26: "instruments: leave with E")
    await page.keyboard.press("KeyE"); ok(await atIs(null, 20000), "E steps her away from the mic");
    await page.waitForTimeout(1500);
    ok(await page.evaluate(() => window.witch.studio.at === null), "and the E that left it doesn't open it again");
    // the mic and its spotlight (render/spotlight.ts) with her stood aside, for a before and after
    const m = obj("microphone"); await page.evaluate(m => { const g = window.witch.game, T = g.map.treehouse; g.witch = { ...g.witch, x: T.x + m.x + 2.5, z: T.z + m.z + 3.5, vx: 0, vz: 0 }; }, m);
    await page.waitForTimeout(4000);
    await page.screenshot({ path: path.join(outDir, "microphone-aside.png") });
  } finally { await browser.close(); server.close(); }
  for (const e of errors) console.log(`FAIL page: ${e}`);
  if (errors.length || fails.length) { console.log(`\n${errors.length + fails.length} failed`); process.exit(1); }
  console.log("\nthe Studio's instruments are fine");
})().catch(e => { console.error(e); process.exit(1); });
