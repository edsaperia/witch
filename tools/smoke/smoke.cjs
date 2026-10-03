// Smoke test: serves the built game (dist/), loads it in headless Chromium, flies the witch in
// both modes, and saves screenshots to previews/. Fails on any page error or if the witch does
// not fly, rise and descend. Run `npm run build` first, then `npm run smoke`.
// Playwright comes from the machine's global install (never `playwright install`).
const http = require("http");
const fs = require("fs");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const root = path.resolve(__dirname, "../../dist");
const out = path.resolve(__dirname, "../../previews");
const seed = process.env.SEED || "123";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };

function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
    const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
    if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(r => server.listen(0, "127.0.0.1", () => r(server)));
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({
    executablePath: fs.existsSync("/opt/pw-browsers/chromium") ? undefined : undefined,
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const errors = [];
  const results = [];
  const check = (ok, what) => { results.push(`${ok ? "ok  " : "FAIL"} ${what}`); if (!ok) errors.push(what); };

  async function run(name, viewport, steps, query) {
    const { hasTouch, ...size } = viewport;
    const page = await browser.newPage({ viewport: size, deviceScaleFactor: 1, hasTouch: !!hasTouch, isMobile: !!hasTouch });
    page.on("pageerror", e => errors.push(`${name}: page error: ${e.message}`));
    page.on("console", m => { if (m.type() === "error") errors.push(`${name}: console error: ${m.text()}`); });
    await page.goto(`http://127.0.0.1:${port}/?seed=${seed}${query || "&debug"}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 120000 });
    await steps(page);
    await page.close();
  }
  const state = page => page.evaluate(() => { const g = window.witch.game; return { t: g.clock.time, x: g.witch.x, z: g.witch.z, mode: g.witch.mode, paused: g.clock.paused, area: window.witch.areaUnderWitch(), stats: window.witch.view.stats }; });
  // Hold a key for `secs` of game time (a slow headless renderer runs fewer, capped frames).
  const hold = async (page, key, secs) => {
    const from = await state(page);
    await page.keyboard.down(key);
    await page.waitForFunction(t => window.witch.game.clock.time - t >= 0, from.t + secs, { timeout: 60000, polling: 50 });
    const to = await state(page);
    await page.keyboard.up(key);
    return [from, to];
  };
  const shot = async (page, file) => { await sleep(400); await page.screenshot({ path: path.join(out, file) }); results.push(`shot previews/${file}`); };

  await run("laptop", { width: 1280, height: 720 }, async page => {
    await shot(page, "00-start-screen.png");
    await page.keyboard.press("Enter");
    await sleep(300);
    let s = await state(page);
    check(!s.paused, "a key press starts the game");
    check(s.stats.trees > 20, `trees drawn round the start (${s.stats.trees})`);
    check(s.stats.creatures > 0, `creatures in the start clearing (${s.stats.creatures})`);
    await shot(page, "01-ground-dancefloor.png");
    // Speeds are measured in game time: a slow headless renderer runs fewer, capped frames.
    const tuning = await page.evaluate(() => window.witch.game.tuning);
    let s0;
    [s0, s] = await hold(page, "KeyD", 2);
    const groundSpeed = (s.x - s0.x) / (s.t - s0.t);
    check(groundSpeed > tuning.groundSpeed * 0.6 && groundSpeed <= tuning.groundSpeed * 1.01, `flies east on the ground (${groundSpeed.toFixed(1)} m/s)`);
    check(s.mode === "ground", "still in ground mode");
    await shot(page, "02-ground-flying.png");
    await page.keyboard.press("Space");
    await sleep(1500);
    s = await state(page);
    check(s.mode === "treetop", `space rises to treetop mode (${s.mode})`);
    await shot(page, "03-treetop.png");
    [s0, s] = await hold(page, "KeyW", 2);
    const topSpeed = (s0.z - s.z) / (s.t - s0.t);
    check(topSpeed > groundSpeed * 1.5 && topSpeed <= tuning.treetopSpeed * 1.01, `flies north faster in treetop mode (${topSpeed.toFixed(1)} m/s)`);
    await shot(page, "04-treetop-flying.png");
    await page.keyboard.press("KeyQ"); await page.keyboard.press("KeyQ");
    await sleep(800);
    await shot(page, "05-treetop-zoomed-out.png");
    await page.keyboard.press("Space");
    await sleep(1200);
    s = await state(page);
    check(s.mode === "ground", `space descends to ground mode (${s.mode})`);
    await shot(page, "06-ground-zoomed-out.png");
    await page.keyboard.press("KeyE"); await page.keyboard.press("KeyE"); await page.keyboard.press("KeyE");
    await sleep(800);
    await shot(page, "07-ground-zoomed-in.png");
    results.push(`area under the witch: ${s.area}`);
  });

  await run("phone", { width: 390, height: 844, hasTouch: true }, async page => {
    await page.touchscreen.tap(200, 400);
    await sleep(300);
    check(!(await state(page)).paused, "a tap starts the game");
    await shot(page, "10-phone-ground.png");
    // Drag the joystick up and to the right with touch pointer events, as a thumb would.
    const touch = (type, x, y) => page.evaluate(([type, x, y]) => {
      const el = document.getElementById("stick-zone");
      el.dispatchEvent(new PointerEvent(type, { pointerId: 7, pointerType: "touch", clientX: x, clientY: y, bubbles: true, cancelable: true, isPrimary: true }));
    }, [type, x, y]);
    const s0 = await state(page);
    await touch("pointerdown", 100, 650);
    await touch("pointermove", 150, 600);
    await page.waitForFunction(t => window.witch.game.clock.time - t >= 1.5, s0.t, { timeout: 60000, polling: 50 });
    const s1 = await state(page);
    await touch("pointerup", 150, 600);
    check(s1.x > s0.x + 2 && s1.z < s0.z - 2, `the touch joystick flies her north-east (${(s1.x - s0.x).toFixed(1)}, ${(s1.z - s0.z).toFixed(1)} m)`);
    await page.touchscreen.tap(345, 770); // the rise / descend button
    await sleep(1500);
    check((await state(page)).mode === "treetop", "the round button rises to treetop mode");
    await shot(page, "11-phone-treetop.png");
  });

  // The tilt-shift both ways, and off, from the same spot, for Ed to compare.
  for (const tilt of ["before", "after", "off"]) {
    await run(`tilt-${tilt}`, { width: 1280, height: 720 }, async page => {
      await page.keyboard.press("Enter");
      await hold(page, "KeyW", 1);
      await page.keyboard.press("Space");
      await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 60000 });
      await sleep(600);
      await shot(page, `2${["before", "after", "off"].indexOf(tilt)}-tilt-${tilt}.png`);
    }, `&tilt=${tilt}`);
  }

  await browser.close();
  server.close();
  console.log(results.join("\n"));
  if (errors.length) { console.error("\nFAILED:\n" + errors.join("\n")); process.exit(1); }
  console.log("\nsmoke test passed");
}

main().catch(e => { console.error(e); process.exit(1); });
