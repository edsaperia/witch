// The QA journey (the overnight programme's QA builder): the built game (DIST, default dist/) in headless Chromium at
// 1280×720 on a seed, through a whole run's moments, a screenshot each: the bedroom (the character creator), at the
// decks, the step-off, the first speaker, the boot, the first countdown, wave one, the treetops, a legend circle, the
// beach and the party's over. Fails on any page error, console error, blank picture or a step that doesn't happen;
// prints each moment's state and its drawn frames' times (ms: p50, p95, worst) and writes <out>/journey.json.
// The loop stands still and frames are stepped by hand (window.witch.frame); long stretches of game time are stepped
// undrawn at 1/10 s, the drawn ones at 1/60 s.
//   npm run build && node tools/qa/journey.cjs [out dir] [seed]   (default previews/journey, 123)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/journey", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const ARGS = ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"];

function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
    if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
  });
  return new Promise(r => server.listen(0, "127.0.0.1", () => r(server)));
}
const pct = (a, p) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(p * s.length))]; };

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ARGS });
  const errors = [], report = { seed, moments: [] };
  const watch = (page, tag) => {
    page.on("pageerror", e => errors.push(`${tag} pageerror: ${e.message}`));
    page.on("console", m => { if (m.type() === "error") errors.push(`${tag} console: ${m.text()}`); });
    page.on("requestfailed", r => errors.push(`${tag} request failed: ${r.url()}`));
  };
  const blank = async page => page.evaluate(() => { // (a blank picture: the canvas nearly one colour)
    const c = document.querySelector("canvas"); if (!c) return true;
    const t = document.createElement("canvas"); t.width = 64; t.height = 36; const x = t.getContext("2d"); x.drawImage(c, 0, 0, 64, 36);
    const d = x.getImageData(0, 0, 64, 36).data; let m = 0, v = 0, n = d.length / 4;
    for (let i = 0; i < d.length; i += 4) m += d[i] + d[i + 1] + d[i + 2]; m /= n;
    for (let i = 0; i < d.length; i += 4) v += (d[i] + d[i + 1] + d[i + 2] - m) ** 2; return Math.sqrt(v / n) < 4;
  });
  try {
    // 1. the bedroom: the character creator as it opens
    {
      const page = await browser.newPage({ viewport: { width: 1280, height: 720 } }); watch(page, "bedroom");
      await page.goto(`http://127.0.0.1:${port}/?seed=${seed}`);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
      await page.waitForTimeout(6000);
      await page.screenshot({ path: path.join(outDir, "01-bedroom.png") });
      report.moments.push({ name: "bedroom", blank: await blank(page) });
      await page.close();
    }
    // 2 onwards: one run, the creator skipped, waiting for the spell
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } }); watch(page, "run");
    await page.goto(`http://127.0.0.1:${port}/?seed=${seed}&creator=0&spell=wait`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.party.spellAt === null && !window.witch.game.clock.paused, null, { timeout: 600000, polling: 500 });
    await page.waitForTimeout(6000);
    await page.evaluate(() => { window.witch.manual = true; });
    const state = () => page.evaluate(() => {
      const g = window.witch.game, w = g.witch;
      return { t: +g.clock.time.toFixed(2), x: +w.x.toFixed(1), z: +w.z.toFixed(1), mode: w.mode, seated: !!w.seated, spellAt: g.party.spellAt,
        speakersOn: g.speakerBoot.filter(s => s != null).length, bootLeft: g.party.bootUntil != null ? +(g.party.bootUntil - g.clock.time).toFixed(1) : null,
        wave: g.party.wave, partified: g.party.areas.size, creatures: g.creatures.length, over: !!g.partyOver, ko: !!g.witches[0].ko, stargazing: !!w.stargazing,
        drawCalls: window.witch.view.stats.drawCalls, dropped: window.witch.view.stats.dropped, area: window.witch.areaUnderWitch() };
    });
    // n frames at dt, drawn or not, controls c (an object or a function of the frame), times of the drawn ones
    const run = (n, c, dt = 1 / 60, draw = true) => page.evaluate(async ({ n, c, dt, draw, fn }) => {
      const w = window.witch, f = fn ? new Function("i", `return (${c})(i)`) : () => c, ms = [];
      for (let i = 0; i < n; i++) {
        const r = w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...f(i) }, dt, draw);
        if (draw) ms.push(r.step + r.render);
        if (i % 30 === 29) await new Promise(r => setTimeout(r, 0));
      }
      return ms;
    }, { n, c: typeof c === "function" ? c.toString() : c, dt, draw, fn: typeof c === "function" });
    const teleport = (x, z) => page.evaluate(({ x, z }) => { const g = window.witch.game; g.witch = { ...g.witch, x, z, vx: 0, vz: 0 }; g.camera.tx = x; g.camera.tz = z; }, { x, z });
    const settle = async () => { await run(5, {}, 1 / 60, true); await page.waitForTimeout(1500); await run(60, {}, 1 / 60, true); };
    const moment = async (name, file, ms, check) => {
      const s = await state(), b = await blank(page);
      await page.screenshot({ path: path.join(outDir, file) });
      const m = { name, ...s, blank: b, frames: ms.length, p50: +pct(ms, 0.5).toFixed(1), p95: +pct(ms, 0.95).toFixed(1), worst: +Math.max(0, ...ms).toFixed(1) };
      report.moments.push(m); console.log(JSON.stringify(m));
      if (b) errors.push(`${name}: blank picture`);
      if (check && !check(s)) errors.push(`${name}: didn't happen ${JSON.stringify(s)}`);
    };
    await moment("at the decks", "02-decks.png", await run(30, { moveX: 1 }), s => s.seated && s.spellAt === null);
    let ms = await run(1, { castParty: true });
    ms = ms.concat(await run(150, { moveX: 1, moveZ: 0.3 }));
    await moment("step-off", "03-step-off.png", ms, s => !s.seated && s.spellAt != null);
    ms = [];
    for (let i = 0; i < 40 && !(await state()).speakersOn; i++) ms = ms.concat(await run(30, i % 2 ? { moveX: -0.2 } : { moveX: 0.2 }));
    await moment("first speaker", "04-first-speaker.png", ms, s => s.speakersOn >= 1);
    await run(1200, {}, 1 / 10, false); // two minutes on
    await settle();
    ms = await run(120, i => ({ moveX: Math.cos(i / 30), moveZ: Math.sin(i / 30) }));
    await moment("the boot", "05-boot.png", ms, s => s.speakersOn > 1);
    for (let i = 0; i < 60 && ((await state()).bootLeft ?? 0) > 0; i++) await run(100, {}, 1 / 10, false);
    await run(200, {}, 1 / 10, false);
    await settle();
    await moment("first countdown", "06-countdown.png", await run(120, {}), s => s.wave === 0 && (s.bootLeft ?? 0) <= 0);
    await run(1, { nextWave: true });
    await run(300, {}, 1 / 10, false);
    await settle();
    await moment("wave one", "07-wave-one.png", await run(180, i => ({ moveX: Math.cos(i / 40) * 0.6, moveZ: Math.sin(i / 40) * 0.6 })), s => s.wave >= 1);
    await run(1, { toggleMode: true });
    ms = await run(300, { moveZ: -1 });
    await moment("treetops", "08-treetops.png", ms, s => s.mode !== "ground");
    await run(1, { toggleMode: true }); await run(180, {});
    // a legend circle: the nearest asleep one's clearing
    const lc = await page.evaluate(() => { const g = window.witch.game, w = g.witch; return [...g.map.legendClearings].sort((a, b) => Math.hypot(a.x - w.x, a.z - w.z) - Math.hypot(b.x - w.x, b.z - w.z))[0]; });
    await teleport(lc.x, lc.z + lc.r * 0.4);
    await run(60, {}, 1 / 10, false); await settle();
    await moment("legend circle", "09-legend-circle.png", await run(120, {}), s => s.mode === "ground");
    // the beach: in from the flight edge east of the middle, then flying on out
    const edge = await page.evaluate(() => { const c = window.witch.game.map.bounds.circle; if (!c) return null; const r = c.coast ? c.r * c.coast(0) : c.r; return { x: c.x + r - 25, z: c.z }; });
    if (edge) {
      await teleport(edge.x, edge.z);
      await run(60, {}, 1 / 10, false); await settle();
      ms = await run(240, { moveX: 1 });
      await run(120, {});
      await moment("beach", "10-beach.png", ms, s => s.stargazing || s.x > edge.x);
    } else errors.push("beach: no circular map");
    // the party's over: every soundsystem lost
    await page.evaluate(() => { const w = window.witch; for (const k of [...w.game.combat.sounds.keys()]) w.lose(k); });
    await run(300, {}, 1 / 10, false); await settle();
    await moment("party's over", "11-party-over.png", await run(120, {}), s => s.over);
    await page.close();
  } finally { await browser.close(); server.close(); }
  report.errors = errors;
  fs.writeFileSync(path.join(outDir, "journey.json"), JSON.stringify(report, null, 1));
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("journey ok");
})().catch(e => { console.error(e); process.exit(1); });
