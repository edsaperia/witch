// The new opening in the built game (app/opening.ts; Ed, 2026-10-20, previews/ed/opening-mock/ on claude/ed-shots), a shot per beat
// into <out dir>: the first load on the sea chart (?opening=chart: only home unlocked on a first game, a fresh profile), its corner's
// What's new and Options, home chosen (Sail home: the boot's own night, app/opening.ts divesHome), the chart's
// dive on into the treehouse and her bedroom, where she wakes, and the wake-up's beats (the alarm, a snooze, the stretch, up, the
// mirror, the curtains). Fails on a page error, the creator's bedroom shown, no sail, her anywhere but her bedroom, or a beat that
// doesn't come. SKIP=1 skips the dive with a key. The snooze and the stretch are shortened (?set=: 2 s and 1 s of her clock), this
// machine's software-drawn frames making her seconds minutes.
// Run `npm run build` first. Playwright from the machine's global install.
//   node tools/opening/shots.cjs [out dir] (default previews/opening/)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/opening"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], fail = m => { throw new Error(m); };
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    const shot = async name => { await page.screenshot({ path: path.join(out, name), timeout: 300000 }); log("shot", name); };
    await page.goto(`http://127.0.0.1:${server.address().port}/?opening=chart&quick=1&timing=1&set=${encodeURIComponent("opening.wake.snooze=2;opening.wake.stretch=1")}`);
    await page.waitForSelector("#chart-overlay .chart-view", { timeout: 600000 });
    log("the chart is up");
    if (await page.evaluate(() => window.__creator?.open)) fail("the bedroom opened on the opening's first load");
    await page.waitForFunction(() => performance.getEntriesByName("chart:island1").length > 0, null, { timeout: 900000, polling: 1000 }).catch(() => log("(no first island yet)"));
    await page.waitForTimeout(3000);
    await shot("01-chart.png");
    const corner = await page.$$eval("#chart-overlay .corner button", bs => bs.map(b => b.textContent));
    log("corner:", corner.join(" · "));
    for (const [label, name] of [["What's new", "02-whats-new.png"], ["Options", "03-options.png"]]) {
      await page.click(`#chart-overlay .corner button:has-text("${label}")`);
      await page.waitForSelector("#chart-overlay .corner-panel");
      await shot(name);
      await page.keyboard.press("Escape");
      if (await page.$("#chart-overlay .corner-panel")) fail(`Esc didn't close ${label}`);
    }
    if (!(await page.evaluate(() => !!document.querySelector("#start .ss-body")))) fail("What's new wasn't put back on the start card");
    const unlocked = await page.evaluate(() => window.chart.islands().filter(i => i.sail).map(i => i.id));
    log("sailable:", unlocked.join(", "));
    await page.click("#chart-overlay .home");
    log("sailing home");
    await page.waitForFunction(() => !document.getElementById("chart-overlay"), null, { timeout: 1200000, polling: 1000 });
    log("the chart flew in and closed");
    await page.waitForTimeout(1500);
    await shot("04-dive.png");
    // the dive on into her bedroom: unskipped (a shot every few seconds of the flight's own time), or SKIP=1 a key skips it
    let k = 0;
    if (process.env.SKIP === "1") await page.keyboard.press("Space");
    while (await page.evaluate(() => document.body.classList.contains("arriving")) && k < 6) {
      await page.waitForTimeout(8000);
      if (await page.evaluate(() => performance.getEntriesByName("witch:landed").length > 0)) await shot(`05-dive-${++k}.png`);
    }
    await page.waitForFunction(() => !document.body.classList.contains("arriving"), null, { timeout: 1200000, polling: 1000 });
    await page.waitForTimeout(3000);
    const w = await page.evaluate(() => { const g = window.witch?.game; const b = g?.witch; return b ? { x: b.x - g.map.treehouse.x, z: b.z - g.map.treehouse.z, seated: !!b.seated, house: g.camera.house } : null; });
    log("she's at", JSON.stringify(w));
    if (!w || w.seated || w.z > -9) fail("she didn't wake in her bedroom");
    // the wake-up (rules/wakeUp.ts): each beat's shot, driven by its own input, waiting on her clock
    const wake = () => page.evaluate(() => { const W = window.witch.game.wake; return W ? { beat: W.beat, snoozes: W.snoozes, open: W.open, mirror: W.mirror, ready: !!window.witch.game.islandReady, pending: window.witch.view.assets.pending, drawn: window.witch.view.islandDrawn(), age: window.witch.game.herTime - W.at } : null; });
    const until = async (f, what) => { for (let i = 0; i < 1800; i++) { const s = await wake(); if (s && f(s)) return s; await page.waitForTimeout(500); } fail(`the wake-up never got to ${what}`); };
    if ((await wake())?.beat !== "alarm") fail("no alarm as she landed");
    await until(s => s.age > 1, "a second of ringing");
    await shot("06-alarm.png");
    await page.keyboard.press("KeyE");
    await until(s => s.beat === "snooze", "the snooze");
    await page.waitForTimeout(800);
    await shot("07-snooze.png");
    await until(s => s.beat === "alarm" && s.age > 1, "the alarm ringing again"); // (past alarmMin on her clock: a press as it starts ringing doesn't count)
    await page.keyboard.press("KeyE");
    await until(s => s.snoozes === 2, "a second snooze");
    await page.keyboard.down("KeyD"); await until(s => s.beat === "stretch", "the stretch"); await page.keyboard.up("KeyD"); // (held till a frame sees it: this machine's frames are slow)
    await page.waitForTimeout(600);
    await shot("08-stretch.png");
    await until(s => s.beat === "up", "her up");
    await page.waitForTimeout(1500);
    await shot("09-up.png");
    // to the dressing table (put by it: the walk itself is the rules' tests'): its mirror opens by itself
    const goTo = (id, dz) => page.evaluate(([id, dz]) => { const g = window.witch.game, th = g.map.treehouse, W = g.witches[0], o = { dressingTable: [13.3, -13.6, 1.4], curtains: [20.4, -17.3, 0.3] }[id]; W.body = { ...W.body, x: th.x + o[0] + 0.9, z: th.z + o[1] + o[2] / 2 + dz, vx: 0, vz: 0 }; }, [id, dz]);
    await goTo("dressingTable", -0.6);
    await page.keyboard.down("KeyA"); await until(s => s.mirror, "the mirror"); await page.keyboard.up("KeyA");
    await page.waitForTimeout(2500);
    await shot("10-mirror.png");
    if (!(await page.evaluate(() => window.__creator?.open))) fail("the mirror didn't open the creator");
    await page.evaluate(() => document.querySelector("[data-exit]").click()); await page.waitForTimeout(800); // (Back to the island, as a player leaves it. Esc would pause the game)
    if (await page.evaluate(() => window.__creator?.open || window.witch.game.clock.paused)) fail("Back to the island didn't take her back to play");
    await goTo("curtains", 0.5);
    await page.waitForTimeout(800);
    const before = await wake();
    await shot("11-curtains.png");
    log("at the curtains:", JSON.stringify(before));
    if (!before.ready) { await page.keyboard.press("KeyE"); await page.waitForTimeout(3000); await shot("11b-not-yet.png"); await until(s => s.ready, "the island ready"); }
    for (let i = 0; i < 60 && !(await wake()).open; i++) { if (i % 10 === 0) await page.keyboard.press("KeyE"); await page.waitForTimeout(1000); } // (pressed again now and then: a frame here is seconds)
    await until(s => s.open, "the curtains open");
    await page.waitForTimeout(2500);
    await shot("12-curtains-open.png");
    const marks = await page.evaluate(() => performance.getEntriesByType("mark").filter(m => /^(opening|chart|game):/.test(m.name)).map(m => `${m.name} ${(m.startTime / 1000).toFixed(1)} s`));
    log("marks:\n  " + marks.join("\n  "));
    fs.writeFileSync(path.join(out, "opening.json"), JSON.stringify({ corner, unlocked, marks }, null, 1));
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  log("ok");
})().catch(e => { console.error(e); process.exit(1); });
