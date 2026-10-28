// The Settings page in the built game (ui/settingsMenu.ts): headless Chromium, the pause page opened, "Show settings page" clicked,
// then each tab shot, driven by the keyboard, the mouse and a stubbed pad (navigator.getGamepads, as tools/smoke/pause-on-top.cjs),
// checking each moves the focus and changes a setting, and that a changed setting is saved and back after a reload.
//   OUT=/tmp/settings node tools/settings/shots.cjs
const http = require("http"), fs = require("fs"), path = require("path");
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.resolve(__dirname, "../../dist")), OUT = process.env.OUT || "settings-shots";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".woff2": "font/woff2", ".wasm": "application/wasm" };
const serve = () => new Promise(r => { const s = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); }); s.listen(0, "127.0.0.1", () => r(s)); });
const fail = [];
const check = (ok, what) => { console.log(`${ok ? "ok  " : "FAIL"} ${what}`); if (!ok) fail.push(what); };
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = await serve(), browser = await pw.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  // a pad the page can read: buttons set from the test through window.__pad
  await ctx.addInitScript(() => {
    window.__pad = { buttons: Array.from({ length: 17 }, () => false), axes: [0, 0, 0, 0] };
    const pad = () => ({ id: "DualSense Wireless Controller (STANDARD GAMEPAD Vendor: 054c)", index: 0, connected: true, mapping: "standard", timestamp: performance.now(), axes: window.__pad.axes, buttons: window.__pad.buttons.map(p => ({ pressed: p, touched: p, value: p ? 1 : 0 })) });
    Object.defineProperty(navigator, "getGamepads", { configurable: true, writable: true, value: () => [pad()] });
  });
  const page = await ctx.newPage(), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  const port = server.address().port, url = `http://127.0.0.1:${port}/?seed=123&quick=1`;
  const open = async () => {
    await page.goto(url);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
    await page.keyboard.press("Enter"); await page.waitForTimeout(3000);
    await page.keyboard.press("Escape");
    await page.waitForSelector("#pause-sliders.open button", { timeout: 60000 });
    await page.waitForTimeout(1200); // (it slides in)
    await page.evaluate(() => [...document.querySelectorAll("#pause-sliders button")].find(b => /Show settings page/.test(b.textContent)).click());
    await page.waitForSelector("#settings-page.open", { timeout: 60000 });
    await page.waitForTimeout(500);
  };
  await open();
  const clickAt = async sel => { const b = await page.evaluate(sel => { const r = document.querySelector(sel).getBoundingClientRect(); return { x: r.left + Math.min(40, r.width / 2), y: r.top + r.height / 2 }; }, sel); await page.mouse.click(b.x, b.y); await page.waitForTimeout(200); };
  const focus = () => page.evaluate(() => document.querySelector("#settings-page .row.focus .lab")?.firstChild?.textContent?.trim());
  const tab = () => page.evaluate(() => document.querySelector("#settings-page .tabs button.on")?.textContent);
  const val = () => page.evaluate(() => document.querySelector("#settings-page .row.focus .val, #settings-page .row.focus .opts .on, #settings-page .row.focus .check + span")?.textContent);
  // keyboard: Sound tab first; down moves, right changes, E the next tab
  check((await tab()) === "Sound", "opens on Sound");
  await page.screenshot({ path: `${OUT}/1-sound-keyboard.png`, timeout: 180000 });
  await page.keyboard.press("ArrowDown"); check((await focus()) === "Music", "keyboard: ↓ moves to Music");
  const before = await val(); await page.keyboard.press("ArrowLeft"); const after = await val();
  check(before !== after, `keyboard: ← turns Music down (${before} → ${after})`);
  await page.keyboard.press("KeyE"); check((await tab()) === "Display", "keyboard: E steps to Display");
  await page.screenshot({ path: `${OUT}/2-display-keyboard.png`, timeout: 180000 });
  // mouse: click the Accessibility tab, then Reduce flashing
  await clickAt("#settings-page .tabs button[data-tab='3']"); check((await tab()) === "Accessibility", "mouse: a tab clicked");
  await clickAt("#settings-page .row[data-row='0']"); check((await val()) === "On", "mouse: Reduce flashing clicked on");
  await page.mouse.move(700, 400);
  await page.screenshot({ path: `${OUT}/3-accessibility-mouse.png`, timeout: 180000 });
  // pad: R1 to the next tab (wrapping to Controls), △ resets, ○ closes
  const press = async b => { await page.evaluate(b => { window.__pad.buttons[b] = true; }, b); await page.waitForTimeout(150); await page.evaluate(b => { window.__pad.buttons[b] = false; }, b); await page.waitForTimeout(150); };
  await press(5); check((await tab()) === "Controls", "pad: R1 steps to Controls (wrapping)");
  await page.screenshot({ path: `${OUT}/4-controls-pad.png`, timeout: 180000 });
  await press(4); check((await tab()) === "Accessibility", "pad: L1 steps back");
  await press(13); check((await focus()) === "Talk", "pad: d-pad ↓ moves to Talk");
  await press(0); check((await val()) === "Toggle", "pad: ✕ steps Talk to Toggle");
  await page.screenshot({ path: `${OUT}/5-accessibility-pad.png`, timeout: 180000 });
  await press(1); check(!(await page.evaluate(() => document.querySelector("#settings-page").classList.contains("open"))), "pad: ○ closes it");
  // saved: reload and look
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("witch.player") || "{}"));
  check(saved.reduceFlashing === true && saved.talk === "toggle" && saved.music < 0.5, `saved: ${JSON.stringify(saved)}`);
  await open();
  await clickAt("#settings-page .tabs button[data-tab='3']");
  check((await val()) === "On", "after a reload: Reduce flashing still on");
  // the Controls tab: Broom spell's first key set to E by keyboard (Use has it: Swap), Hat's empty pad slot to the PS button by pad
  await clickAt("#settings-page .tabs button[data-tab='0']"); check((await tab()) === "Controls", "controls: the tab clicked");
  await clickAt("#settings-page .row[data-row='0'] [data-opt='keys']");
  const slotText = (id, k) => page.evaluate(([id, k]) => document.querySelector(`#settings-page [data-id='${id}'] [data-slot='${k}']`)?.textContent, [id, k]);
  check((await slotText("game.rise", 0)) === "Space", "controls: Rise shows Space");
  await clickAt("#settings-page [data-id='game.boost'] [data-slot='0']");
  check((await slotText("game.boost", 0)) === "Press…", "controls: a slot clicked listens");
  await page.keyboard.press("KeyE");
  const clash = await page.evaluate(() => document.querySelector("#settings-page .clash")?.textContent || "");
  check(/E is already Use/.test(clash), `controls: E asks (${clash.replace(/\s+/g, " ").trim().slice(0, 60)})`);
  await page.mouse.move(700, 600);
  await page.screenshot({ path: `${OUT}/6-controls-clash.png`, timeout: 180000 });
  await page.keyboard.press("Enter");
  const kb = await page.evaluate(() => JSON.parse(localStorage.getItem("witch.bindings") || "{}"));
  check(kb["game.boost"]?.keys?.[0] === "KeyE" && kb["game.use"]?.keys?.[0] === "KeyR", `controls: Swap saved ${JSON.stringify(kb)}`);
  check((await slotText("game.use", 0)) === "R", "controls: Use now shows R");
  await clickAt("#settings-page .row[data-row='0'] [data-opt='pad']");
  await clickAt("#settings-page [data-id='game.hat'] [data-slot='1']");
  await page.waitForTimeout(400);
  await press(16);
  const pb = await page.evaluate(() => JSON.parse(localStorage.getItem("witch.bindings") || "{}"));
  check(JSON.stringify(pb["game.hat"]?.pad) === JSON.stringify(["triangle", "home"]), `controls: the pad's PS button on Hat ${JSON.stringify(pb["game.hat"])}`);
  await page.mouse.move(700, 600);
  await page.screenshot({ path: `${OUT}/7-controls-pad.png`, timeout: 180000 });
  await clickAt("#settings-page [data-act='resetAll']");
  check((await page.evaluate(() => localStorage.getItem("witch.bindings"))) === null, "controls: Reset tab puts every binding back");
  check(errors.length === 0, `no page errors ${errors.slice(0, 3).join(" | ")}`);
  await browser.close(); server.close();
  console.log(fail.length ? `${fail.length} FAILED` : "all passed");
  process.exit(fail.length ? 1 : 0);
})();
