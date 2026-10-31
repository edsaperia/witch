// Repro for the suspected pause bug (freeze.ts:89): does Enter/Space activate a focused native <button> under the pause?
// node previews/pause-native-1519/repro.cjs [dist] -> logs JSON per run, screenshots beside this script.
const http = require("http"), fs = require("fs"), path = require("path");
const playwright = require("playwright");
const root = path.resolve(process.argv[2] || "dist"), out = process.argv[3] ? path.resolve(process.argv[3]) : __dirname;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".ogg": "audio/ogg", ".wasm": "application/wasm", ".woff2": "font/woff2" };
(async () => {
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"] });
  const results = [];
  for (const run of [1, 2, 3]) { // run 3: Space alone (extra), Enter skipped
    const spaceOnly = run === 3;
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await ctx.newPage();
    // key log registered before the game's scripts (freeze.ts's window-capture listener stops immediate propagation, so a later one never runs)
    await page.addInitScript(() => { window.__keylog = []; for (const t of ["keydown", "keyup"]) window.addEventListener(t, e => setTimeout(() => window.__keylog.push({ type: t, key: e.key, defaultPrevented: e.defaultPrevented }), 0), { capture: true }); });
    const errors = []; page.on("pageerror", e => errors.push(e.message));
    const log = { run, steps: [] };
    const step = async (name, extra = {}) => {
      const s = await page.evaluate(() => {
        const btn = document.querySelector('#finds-dev button[data-act="close"]'), a = document.activeElement;
        const mid = document.elementFromPoint(innerWidth / 2, innerHeight / 2);
        return {
          activeIsClose: !!btn && a === btn, active: a ? `${a.tagName}${a.id ? "#" + a.id : ""}${a.dataset?.act ? "[data-act=" + a.dataset.act + "]" : ""}` : null,
          clicks: window.__clicks, findsOpen: !!document.querySelector("#finds-dev.on"),
          bodyPaused: document.body.classList.contains("paused"), slidersOpen: !!document.querySelector("#pause-sliders.open"),
          shieldShown: getComputedStyle(document.getElementById("pause-shield")).display !== "none", middleHit: mid ? (mid.id || mid.tagName) : null,
          clockPaused: window.witch?.game?.clock?.paused, keys: window.__keylog.splice(0),
        };
      });
      Object.assign(s, extra); log.steps.push({ step: name, ...s }); console.log(run, name, JSON.stringify(s));
    };
    await page.goto(`http://127.0.0.1:${server.address().port}/?dev=finds&creator=0&quick=1&seed=123&island=4&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 300000, polling: 500 });
    // Finds: opened by ?dev=finds at load; make sure it's on and drawn
    await page.evaluate(() => { if (!document.querySelector("#finds-dev.on")) document.getElementById("finds-dev-btn")?.click(); });
    await page.waitForSelector('#finds-dev.on button[data-act="close"]', { timeout: 60000 });
    await page.evaluate(() => {
      window.__clicks = 0; window.__keylog.length = 0;
      document.querySelector('#finds-dev button[data-act="close"]').addEventListener("click", () => { window.__clicks++; });
    });
    await page.evaluate(() => document.querySelector('#finds-dev button[data-act="close"]').focus());
    await step("4 focused");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(3000);
    await step("5 after Esc (pause)");
    await page.screenshot({ path: path.join(out, `run${run}-5-paused.png`) });
    if (!spaceOnly) { await page.keyboard.press("Enter");
    await page.waitForTimeout(2000);
    await step("6 after Enter (paused)"); } else log.steps.push({ step: "6 skipped (Space-only run)" });
    if (!spaceOnly) await page.screenshot({ path: path.join(out, `run${run}-6-enter.png`) });
    if (await page.evaluate(() => !!document.querySelector("#finds-dev.on"))) {
      // (refocus only if focus is still there; don't move it ourselves)
      await page.keyboard.press("Space");
      await page.waitForTimeout(2000);
      await step("7 after Space (paused)");
      await page.screenshot({ path: path.join(out, `run${run}-7-space.png`) });
    } else log.steps.push({ step: "7 skipped: Finds already closed" });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(3000);
    await step("8 after Esc (resume)");
    await page.screenshot({ path: path.join(out, `run${run}-8-resumed.png`) });
    // 1522 check: the pause page's own controls still work by keyboard. Re-pause, Tab into the pause page, Enter, then Space.
    const inPause = () => page.evaluate(() => { const a = document.activeElement; return !!a && !!a.closest("#settings-page,#potion-lab,#pause-sliders,#pause-btns,.corner-panel,#music-lab,#new-build"); });
    const panel = () => page.evaluate(() => { const c = document.querySelector(".corner-panel"); return c ? { shown: getComputedStyle(c).display !== "none", text: (c.textContent || "").slice(0, 40) } : null; });
    await page.keyboard.press("Escape"); await page.waitForTimeout(3000);
    await step("9 re-paused");
    const desc = () => page.evaluate(() => { const a = document.activeElement; return a ? a.tagName + (a.id ? "#" + a.id : "") + (a.textContent ? ":" + a.textContent.trim().slice(0, 14) : "") + (a.closest("#pause-btns") ? "@pause-btns" : a.closest("#pause-sliders") ? "@pause-sliders" : "") : null; });
    // v2: Tab three times, then Shift+Tab twice, recording focus and each key's defaultPrevented
    const tabs = [await desc()];
    for (let i = 0; i < 3; i++) { await page.keyboard.press("Tab"); await page.waitForTimeout(150); tabs.push(await desc()); }
    await step("10 Tab x3", { tabPath: tabs, inPause: await inPause() });
    const back = [await desc()];
    for (let i = 0; i < 2; i++) { await page.keyboard.press("Shift+Tab"); await page.waitForTimeout(150); back.push(await desc()); }
    await step("10a Shift+Tab x2", { shiftTabPath: back, inPause: await inPause() });
    // reach the Controls button by Tab alone (up to 40)
    let tabbed = false; const toCtl = [];
    for (let i = 0; i < 40; i++) { const d = await desc(); if (d && d.includes("Controls")) { tabbed = true; break; } await page.keyboard.press("Tab"); await page.waitForTimeout(120); toCtl.push(await desc()); }
    await step("10b Tab to Controls", { tabbed, tabPath: toCtl });
    if (!tabbed) { await page.evaluate(() => [...document.querySelectorAll("#pause-btns button")].find(b => b.textContent.includes("Controls"))?.focus()); await step("10c focused Controls by script (Tab didn't reach)"); }
    const target = await page.evaluate(() => { const a = document.activeElement; return a ? a.tagName + ":" + (a.textContent || a.type || "").trim().slice(0, 20) : null; });
    const before = { panel: await panel(), value: await page.evaluate(() => { const a = document.activeElement; return a && "value" in a ? a.value : null; }) };
    await page.keyboard.press("Enter"); await page.waitForTimeout(1500);
    const afterEnter = { panel: await panel(), value: await page.evaluate(() => { const a = document.activeElement; return a && "value" in a ? a.value : null; }) };
    await step("11 Enter on pause control", { target, before, afterEnter });
    await page.screenshot({ path: path.join(out, `run${run}-11-pause-control-enter.png`) });
    await page.keyboard.press("Space"); await page.waitForTimeout(1500);
    await step("12 Space on pause control", { target, afterSpace: { panel: await panel() } });
    await page.screenshot({ path: path.join(out, `run${run}-12-pause-control-space.png`) });
    await page.keyboard.press("Escape"); await page.waitForTimeout(3000);
    await step("13 Esc");
    if (await page.evaluate(() => document.body.classList.contains("paused"))) { await page.keyboard.press("Escape"); await page.waitForTimeout(3000); await step("14 Esc again"); }
    log.errors = errors; results.push(log);
    await ctx.close();
  }
  fs.writeFileSync(path.join(out, "results.json"), JSON.stringify(results, null, 1));
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
