// The ley line through the boot in the built game (Ed, 2026-10-29: "The leyline does not show as dots, just a faint rainbow glow,
// until the boot-up period is finished. The boot-up period leyline did not show as dots or spectrum as it went round the circle";
// render/leylines.ts dotLines, render/leash/rainbow.ts): on a seed, her on the dancefloor with the party spell cast, the boot wound
// to a moment part way round the home ring (the boot's pulse on the ring, the route branched off it), then to moments after the
// boot with the wave's spark so many metres along the first link. One still each.
//   npm run build && node tools/leylines/boot-shots.cjs [out dir]   (SEED=123, SIZE=1280x720, ZOOM=4, OFFSET="6,4" m east and south of the floor's middle where she stands, TREETOP=1 up in the treetops there (the world bent: the line toward the horizon), BOOT="25" s into the boot, AFTER="30,80" m along the first link after it)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const outDir = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/leylines"));
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "1280x720").split("x").map(Number), ZOOM = process.env.ZOOM || "4";
const BOOT = (process.env.BOOT || "25").split(",").map(Number), AFTER = (process.env.AFTER || "30,80").split(",").map(Number), OFFSET = (process.env.OFFSET || "6,4").split(",").map(Number), TREETOP = process.env.TREETOP === "1";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.on("pageerror", e => errors.push(e.message));
    const base = `http://127.0.0.1:${server.address().port}/?seed=${process.env.SEED || 123}&spell=auto&zoom=${ZOOM}`;
    // (the dancefloor's place read off a first load, then loaded there, so the shot loads the art round it)
    await page.goto(`${base}&shot=${encodeURIComponent("object:mapTable")}`);
    await page.waitForFunction(() => window.witch && window.witch.game, null, { timeout: 600000, polling: 500 });
    const scene = await page.evaluate(([o, up]) => { const d = window.witch.game.map.dancefloor; return `at:${(d.x + o[0]).toFixed(1)},${(d.z + o[1]).toFixed(1)}${up ? ",treetop" : ""}`; }, [OFFSET, TREETOP]);
    await page.goto(`${base}&shot=${encodeURIComponent(scene)}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.evaluate(() => { window.witch.manual = true; });
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000, polling: 200 }).catch(() => {}); }
    const said = await page.evaluate(s => window.witch.lastShot ?? window.witch.shot(s), scene);
    log("scene:", said.say);
    const step = n => page.evaluate(n => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, i === n - 1); }, n);
    for (let round = 0, calm = 0; calm < 2 && round < 40; round++) { await step(10); const p = await page.evaluate(() => window.witch.view.assets.pending); if (p === 0) calm++; else { calm = 0; await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 600000, polling: 500 }); } }
    // (and the line as dots, render/leylines.ts dotLines: how far it's drawn, where its spark is, how many of its dots are on that stretch)
    const state = () => page.evaluate(() => {
      const g = window.witch.game, p = g.party, lv = window.witch.view.leashView, ley = lv?.ley, d = g.map.dancefloor;
      const lines = ley ? ley.dotLines(2).map(L => { const n = Array.from(L.bars.links).filter(l => l >= L.from && l <= L.to && !(l >= L.hide[0] && l < L.hide[1])).length; return `line: strength ${L.strength.toFixed(2)} to ${L.to === Infinity ? "all" : L.to.toFixed(2)} (links as drawn, the ring's link first) spark ${L.spark === Infinity ? "none (all bars)" : L.spark.toFixed(2)} ring x${L.ringK.toFixed(2)} dots ${n}${L.hide[1] > 0 ? ` (hidden where the line lies over itself: ${L.hide[0].toFixed(2)}-${L.hide[1].toFixed(2)})` : ""}`; }).join("; ") : "no line";
      return `clock ${g.clock.time.toFixed(1)}${g.clock.paused ? " (paused)" : ""} spellAt ${p.spellAt}${p.paused ? " party paused" : ""} bootFrom ${p.bootFrom?.toFixed(1)} bootUntil ${p.bootUntil.toFixed(1)} pulse d ${p.pulse.d.toFixed(1)} v ${p.pulse.v} at ${p.pulse.at.toFixed(1)} rainbowQuads ${lv?.rainbowQuads}\n    ${lines}`;
    });
    log(await state());
    // The boot wound to `s` seconds in: the pulse `s` x boot.speed metres along its path (rules/bootRing.ts bootPulseAt).
    const wind = (s, after) => page.evaluate(([s, after]) => {
      const g = window.witch.game, p = g.party, B = p.bootUntil - p.bootFrom, t = g.clock.time;
      p.paused = false; // (the waves on, whatever the browser's Waves setting: the spark sets off as the boot ends)
      if (after === null) { p.bootFrom = t - s; p.bootUntil = p.bootFrom + B; p.pulse.at = p.bootUntil + (g.tuning.party.startDelay ?? 0); p.pulse.d = 0; }
      else { p.bootUntil = t - 1; p.bootFrom = p.bootUntil - B; p.pulse.at = t; p.pulse.d = after; p.pulse.v = g.tuning.leyLines.pulseSpeed; }
    }, [s, after]);
    const shoot = async name => { await step(30); log(name, await state()); const f = path.join(outDir, `${name}.png`); await page.screenshot({ path: f, timeout: 300000 }); log("saved", path.relative(process.cwd(), f)); };
    for (const s of BOOT) { await wind(s, null); await shoot(`boot-${s}s`); }
    for (const m of AFTER) { await wind(0, m); await shoot(`after-boot-${m}m`); }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e.message || e); process.exit(1); });
