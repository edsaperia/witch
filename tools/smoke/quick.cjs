// The quick smoke test, run in CI on every push and pull request (a few minutes): serves the built
// game (dist/), loads it in headless Chromium at 960×540 (QUICK_SIZE=1280x720 for another) with ?quick=1 (only the art the
// start needs), starts, hops off the treehouse deck, flies about 2.5 s on the ground, rises, flies about 2.5 s in the treetops
// and descends: kept short, as the software renderer here takes 20 s or so a second of game time. Fails on any page or console error, a blank picture, or a witch that doesn't move,
// rise or descend. Saves one screenshot (QUICK_OUT, default previews/quick.png). The full smoke
// test (smoke.cjs) still covers pops, floating, big windows and the rest. QUICK_SAIL=1 (not in CI: a couple of minutes more) also
// sails in place to another island (?sail=inplace; window.witch.sail, as the map table's chart sails: docs/plans/sail-without-
// reload.md), skips the flight in and checks the night is the island's, its link pushed and play running; then Back opens the
// pause menu on the same night. tools/sail/leak.cjs and swap.cjs (SAIL=1) test it fully.
// Run `npm run build` first, then `npm run smoke:quick`.
const http = require("http");
const fs = require("fs");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const root = path.resolve(__dirname, "../../dist");
const shotPath = path.resolve(process.env.QUICK_OUT || path.join(__dirname, "../../previews/quick.png"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };
const [W, H] = (process.env.QUICK_SIZE || "960x540").split("x").map(Number), FLY = 2.5; // (the viewport; the seconds of game time each flight)
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

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

async function main() {
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], results = [];
  const check = (ok, what) => { results.push(`${ok ? "ok  " : "FAIL"} ${what}`); log(ok ? "ok  " : "FAIL", what); if (!ok) errors.push(what); };
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  page.on("pageerror", e => errors.push(`page error: ${e.message}`));
  page.on("console", m => { if (m.type() === "error") errors.push(`console error: ${m.text()}`); });
  try {
    await page.goto(`http://127.0.0.1:${port}/?creator=0&seed=123&quick=1&debug${process.env.QUICK_SAIL ? "&sail=inplace" : ""}${process.env.QUICK_QUERY ? "&" + process.env.QUICK_QUERY : ""}`); // (QUICK_QUERY=a=b&c=d: more of the link, e.g. set=combat.packs.on=true)
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 240000, polling: 500 });
    log("start screen ready");
    const state = () => page.evaluate(() => { const g = window.witch.game; return { t: g.clock.time, x: g.witch.x, z: g.witch.z, mode: g.witch.mode, paused: g.clock.paused, trees: window.witch.view.stats.trees }; });
    // Hold a key for `secs` of game time (the software renderer here runs slow, capped frames).
    const hold = async (key, secs) => {
      const from = await state();
      await page.keyboard.down(key);
      await page.waitForFunction(t => window.witch.game.clock.time >= t, from.t + secs, { timeout: 300000, polling: 100 });
      await page.keyboard.up(key);
      return [from, await state()];
    };
    const canvas = await page.$("canvas#game");
    check(!!canvas, "the game's canvas is there");
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
    check(true, "a key press starts the game");
    // She starts at her decks on the treehouse deck, 22 m up (rules/treehouse.ts): up off it, out over the forest, down.
    if (await page.evaluate(() => !!window.witch.game.witch.perch)) {
      await page.keyboard.press("Space");
      await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 120000, polling: 100 }).catch(() => {});
      check(await page.evaluate(() => window.witch.game.witch.mode === "treetop" && !window.witch.game.witch.perch), "space rises off the treehouse deck");
      await hold("ArrowLeft", 1.5);
      await page.keyboard.press("Space");
      await page.waitForFunction(() => window.witch.game.witch.mode === "ground", null, { timeout: 120000, polling: 100 }).catch(() => {});
      check(await page.evaluate(() => window.witch.game.witch.mode === "ground" && !window.witch.game.witch.perch), "lands on the ground away from the deck");
    }
    let [a, b] = await hold("ArrowRight", FLY);
    check(b.mode === "ground" && b.x - a.x > 10, `flies on the ground (${(b.x - a.x).toFixed(0)} m east in ${(b.t - a.t).toFixed(1)} s)`);
    // Right click dodges: a blink on the ground.
    await page.mouse.click(W / 2, H * 0.42, { button: "right" });
    await page.waitForFunction(() => Number.isFinite(window.witch.game.witches[0].dash.at), null, { timeout: 60000, polling: 100 }).catch(() => {});
    check(await page.evaluate(() => Number.isFinite(window.witch.game.witches[0].dash.at)), "right click dodges (a blink on the ground)");
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 120000, polling: 100 }).catch(() => {});
    check((await state()).mode === "treetop", "space rises to the treetops");
    [a, b] = await hold("ArrowUp", FLY);
    check(a.z - b.z > 20, `flies in the treetops (${(a.z - b.z).toFixed(0)} m north in ${(b.t - a.t).toFixed(1)} s)`);
    check(b.trees > 20, `the forest is drawn (${b.trees} trees)`);
    // Not a blank picture: the canvas holds many distinct colours.
    const colours = await page.evaluate(() => {
      const c = document.querySelector("canvas#game"), w = 64, h = 36, o = document.createElement("canvas");
      o.width = w; o.height = h; const x = o.getContext("2d"); x.drawImage(c, 0, 0, w, h);
      const d = x.getImageData(0, 0, w, h).data, seen = new Set();
      for (let i = 0; i < d.length; i += 4) seen.add((d[i] >> 3) * 1024 + (d[i + 1] >> 3) * 32 + (d[i + 2] >> 3));
      return seen.size;
    });
    check(colours > 40, `the picture isn't blank (${colours} colours)`);
    fs.mkdirSync(path.dirname(shotPath), { recursive: true });
    await page.screenshot({ path: shotPath });
    log(`screenshot ${shotPath}`);
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "ground", null, { timeout: 120000, polling: 100 }).catch(() => {});
    check((await state()).mode === "ground", "space descends to the ground");
    // The mouse wheel zooms (Ed, 2026-10-06), and the page doesn't scroll.
    const z0 = await page.evaluate(() => window.witch.game.camera.zoom);
    await page.mouse.move(W / 2, H * 0.42);
    for (let i = 0; i < 3; i++) { await page.mouse.wheel(0, 120); await page.waitForTimeout(300); }
    await page.waitForFunction(z => Math.abs(window.witch.game.camera.zoom - z) > 0.01, z0, { timeout: 60000, polling: 100 }).catch(() => {});
    const z1 = await page.evaluate(() => window.witch.game.camera.zoom), scrolled = await page.evaluate(() => window.scrollY);
    check(Math.abs(z1 - z0) > 0.01 && scrolled === 0, `the mouse wheel zooms (${z0.toFixed(2)} → ${z1.toFixed(2)}), the page unscrolled`);
    if (process.env.QUICK_SAIL) {
      const ts = Date.now(), inPlace = await page.evaluate(() => window.witch.sail("fox", 4242));
      await page.waitForFunction(() => window.witch.ready && window.witch.game.seed === 4242, null, { timeout: 600000, polling: 500 });
      await page.keyboard.press("Shift"); // (skips the flight in, as any key does)
      await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 120000, polling: 100 }).catch(() => {});
      const n = await page.evaluate(() => ({ island: window.witch.game.tuning.map?.island, url: location.search, t: window.witch.game.clock.time, paused: window.witch.game.clock.paused }));
      check(inPlace && n.island === "fox" && /^\?island=fox&seed=4242&/.test(n.url) && !n.paused, `sails in place to another island (${n.island}, ${n.url}, in ${((Date.now() - ts) / 1000).toFixed(0)} s)`);
      await page.goBack({ timeout: 5000 }).catch(() => {});
      await page.waitForFunction(() => document.getElementById("pause-sliders")?.classList.contains("open"), null, { timeout: 60000 }).catch(() => {});
      const b = await page.evaluate(() => ({ menu: !!document.getElementById("pause-sliders")?.classList.contains("open"), url: location.search, seed: window.witch.game.seed }));
      check(b.menu && b.url === n.url && b.seed === 4242, `Back opens the pause menu on the same night (${b.url})`);
      await page.keyboard.press("Escape");
    }
  } catch (e) {
    errors.push(`stopped: ${e.message}`);
    try { fs.mkdirSync(path.dirname(shotPath), { recursive: true }); await page.screenshot({ path: shotPath }); } catch { /* none */ }
  }
  await browser.close();
  server.close();
  console.log(results.join("\n"));
  if (errors.length) { console.error("\nFAILED:\n" + errors.join("\n")); process.exit(1); }
  console.log(`\nquick smoke test passed in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
}

main().catch(e => { console.error(e); process.exit(1); });
