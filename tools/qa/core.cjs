// The QA check of Ed's core design (2026-10-07: #487 clear-to-transform, #483 later quests), in the built game (DIST,
// default dist/) in headless Chromium at 1280×720 on a seed, frames stepped by hand (window.witch.frame), long stretches
// undrawn. It checks:
//   - nothing clears by itself: no area is cleared, and none transforms, before she has invited anyone;
//   - the boot: from the first speaker turning to the boot's end is boot.time (30 s), within a second;
//   - a cleared area transforms: every creature holding the next wave's area turned happy (as if invited), it's
//     partified within a second, its soundsystem stands and an `areaCleared` event fires for it;
//   - a wave arriving at that already-transformed stone fires its `waveCelebrate` event and nothing else: no new
//     soundsystem, no creature newly enraged, no `areaCleared` again;
//   - the wave after (at a stone not cleared) still wakes it as before;
//   - no creature spawns mid-run: no creature id above the start's highest, at any check;
//   - no page or console error, no blank picture.
// Screenshots: <out>/core-*.png; the result in <out>/core.json.
//   npm run build && node tools/qa/core.cjs [out dir] [seed]   (default previews/core, 123)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/core", seed = "123"] = process.argv.slice(2);
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

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ARGS });
  const errors = [], checks = [], report = { seed, checks };
  const check = (name, ok, detail) => { checks.push({ name, ok: !!ok, detail }); console.log(`${ok ? "ok  " : "FAIL"} ${name}  ${JSON.stringify(detail)}`); if (!ok) errors.push(`${name}: ${JSON.stringify(detail)}`); };
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(`pageerror: ${e.message}`));
    page.on("console", m => { if (m.type() === "error") errors.push(`console: ${m.text()}`); });
    await page.goto(`http://127.0.0.1:${port}/?seed=${seed}&creator=0&spell=wait`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.party.spellAt === null && !window.witch.game.clock.paused, null, { timeout: 600000, polling: 500 });
    await page.waitForTimeout(4000);
    // the page's own helpers: frames stepped by hand, gathering the wave events, the creatures' highest id and state counts
    await page.evaluate(() => {
      const w = window.witch, g = w.game; w.manual = true;
      const Q = window.__qa = { events: [], maxId: Math.max(...g.creatures.map(c => c.id)), startCount: g.creatures.length, newIds: [], firstSpeakerAt: null };
      Q.run = (n, c = {}, dt = 1 / 60, draw = false) => {
        for (let i = 0; i < n; i++) {
          w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...(typeof c === "function" ? c(i) : c) }, dt, draw);
          for (const e of g.waveEvents) Q.events.push({ kind: e.kind, key: e.key, at: +(e.at ?? g.clock.time).toFixed(2), wave: e.wave });
          if (Q.firstSpeakerAt === null && g.speakerBoot.some(s => s != null)) Q.firstSpeakerAt = g.clock.time;
          for (const k of g.creatures) if (k.id > Q.maxId && !Q.newIds.includes(k.id)) Q.newIds.push(k.id);
        }
      };
      Q.state = () => ({ t: +g.clock.time.toFixed(2), wave: g.party.wave, partified: g.party.areas.size, sounds: g.combat.sounds.size, ahead: [...(g.party.ahead ?? [])],
        next: (g.party.next ?? []).map(c => (Array.isArray(c) ? c.join(",") : String(c))), creatures: g.creatures.length,
        enraged: g.creatures.filter(c => c.enraged).length, bootUntil: g.party.bootUntil, over: !!g.partyOver });
    });
    const run = (n, c = {}, dt = 1 / 60, draw = false) => page.evaluate(({ n, c, dt, draw }) => window.__qa.run(n, c ? JSON.parse(c) : {}, dt, draw), { n, c: JSON.stringify(c), dt, draw });
    const state = () => page.evaluate(() => window.__qa.state());
    const events = kind => page.evaluate(k => window.__qa.events.filter(e => !k || e.kind === k), kind);
    const shot = async (name, x, z) => {
      if (x !== undefined) await page.evaluate(({ x, z }) => { const g = window.witch.game; g.witch = { ...g.witch, x, z: z + 14, vx: 0, vz: 0 }; g.camera.tx = x; g.camera.tz = z + 14; }, { x, z });
      await run(30, {}, 1 / 10, false); await run(5, {}, 1 / 60, true); await page.waitForTimeout(1500); await run(40, {}, 1 / 60, true);
      await page.screenshot({ path: path.join(outDir, `core-${name}.png`) });
    };

    // the cast and the step-off, then a few seconds standing: nothing should clear by itself
    await run(1, { castParty: true });
    // off the decks: moving until she's left them (the cast holds her a while), as the boot waits for that
    let off = null;
    for (let i = 0; i < 40 && !off; i++) { await run(30, { moveX: 1, moveZ: 0.3 }); off = await page.evaluate(() => (window.witch.game.witch.seated || window.witch.game.party.bootFrom === undefined ? null : { t: +window.witch.game.clock.time.toFixed(2), bootFrom: +window.witch.game.party.bootFrom.toFixed(2) })); }
    check("she steps off her decks", !!off, off ?? (await state()));
    await run(300, {});
    const early = await events("areaCleared");
    check("nothing clears by itself", early.length === 0, { cleared: early.map(e => e.key), state: await state() });

    // the boot: from the first speaker to its end
    for (let i = 0; i < 120 && (await page.evaluate(() => window.witch.game.clock.time < window.witch.game.party.bootUntil)); i++) await run(60, {});
    const boot = await page.evaluate(() => ({ first: window.__qa.firstSpeakerAt, until: window.witch.game.party.bootUntil, time: window.witch.game.tuning.boot.time }));
    const bootLen = boot.until - boot.first;
    check("boot is boot.time (30 s)", boot.first !== null && Math.abs(bootLen - 30) <= 1 && boot.time === 30, { bootLen: +bootLen.toFixed(2), ...boot });
    await shot("after-boot");

    // clear the next wave's area: every creature holding it turned happy, as if invited
    const s0 = await state();
    const target = s0.next[0];
    const turned = await page.evaluate(key => {
      const g = window.witch.game; let n = 0;
      for (const c of g.creatures) {
        if (`${c.cell[0]},${c.cell[1]}` !== key || c.gone || c.leashed || c.boss || c.circle) continue;
        if (c.state !== "happy") { c.state = "happy"; c.enraged = false; c.siege = undefined; n++; }
      }
      return n;
    }, target);
    await run(90, {});
    const s1 = await state(), cleared = (await events("areaCleared")).filter(e => e.key === target);
    const transformed = await page.evaluate(key => { const g = window.witch.game, a = g.party.areas.get(key), s = g.combat.sounds.get(key); return { partified: !!a, soundsystem: !!a?.soundsystem, sound: !!s, at: a?.soundsystem ? [a.soundsystem.x, a.soundsystem.z] : null }; }, target);
    check("a cleared area transforms", turned > 0 && transformed.partified && transformed.soundsystem && cleared.length === 1 && s1.ahead.includes(target), { target, turned, transformed, cleared, ahead: s1.ahead });
    if (transformed.at) await shot("transformed", transformed.at[0], transformed.at[1]);

    // the wave arriving at that stone: its celebration and nothing else
    const before = await state(), evBefore = (await events()).length;
    await run(1, { nextWave: true });
    await run(120, {});
    const after = await state(), evs = (await events()).slice(evBefore);
    const celebrate = evs.filter(e => e.kind === "waveCelebrate"), other = evs.filter(e => e.kind !== "waveCelebrate");
    check("a wave at a transformed stone only celebrates", after.wave === before.wave + 1 && celebrate.length === 1 && celebrate[0].key === target && after.sounds === before.sounds && after.enraged === before.enraged && other.length === 0,
      { before: { wave: before.wave, sounds: before.sounds, enraged: before.enraged }, after: { wave: after.wave, sounds: after.sounds, enraged: after.enraged }, celebrate, other });
    if (transformed.at) await shot("celebrate", transformed.at[0], transformed.at[1]);

    // the wave after, at a stone not cleared: it wakes it as before
    const b2 = await state();
    await run(1, { nextWave: true });
    await run(120, {});
    const a2 = await state(), evs2 = (await events()).slice((await events()).length - 50);
    check("the next wave wakes an uncleared stone", a2.wave === b2.wave + 1 && a2.sounds === b2.sounds + 1 && a2.enraged > b2.enraged, { before: { wave: b2.wave, sounds: b2.sounds, enraged: b2.enraged }, after: { wave: a2.wave, sounds: a2.sounds, enraged: a2.enraged }, celebrate: evs2.filter(e => e.kind === "waveCelebrate").length });

    // two more minutes of play, then: nothing spawned mid-run
    await run(1200, {}, 1 / 10);
    const spawn = await page.evaluate(() => ({ maxIdAtStart: window.__qa.maxId, newIds: window.__qa.newIds.length, startCount: window.__qa.startCount, now: window.witch.game.creatures.length }));
    check("no creature spawns mid-run", spawn.newIds === 0 && spawn.now <= spawn.startCount, spawn);
    await shot("late");
    report.final = await state();
  } finally { await browser.close(); server.close(); }
  report.errors = errors;
  fs.writeFileSync(path.join(outDir, "core.json"), JSON.stringify(report, null, 1));
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("core ok");
})().catch(e => { console.error(e); process.exit(1); });
