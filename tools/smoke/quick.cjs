// The quick smoke test, run in CI on every push and pull request (a few minutes): serves the built
// game (dist/), loads it in headless Chromium at 960×540 (QUICK_SIZE=1280x720 for another) with ?quick=1 (only the art the
// start needs), starts, hops off the treehouse deck, flies about 2.5 s on the ground, rises, flies about 2.5 s in the treetops
// and descends: kept short, as the software renderer here takes 20 s or so a second of game time. Fails on any page or console error, a blank picture, or a witch that doesn't move,
// rise or descend, or a page's thread held over 15 s while it loads (QUICK_STALL_MS), or a frame's drawing in the treehouse over 150 ms
// as she walks its rooms (QUICK_HOUSE_MS). Saves one screenshot (QUICK_OUT, default previews/quick.png). The full smoke
// test (smoke.cjs) still covers pops, floating, big windows and the rest. Then it sails in place to another island (the tuning's
// sail.inPlace; window.witch.sail, as the map table's chart sails: docs/plans/sail-without-reload.md), skips the flight in and
// checks the night is the island's, its link pushed and play running; the chart over it, its own island chosen, closes back to
// the same night (no sail); Back opens the pause menu on the same night; and, the party over, the treehouse's bed (E held at it,
// where the afterparty's 💤 pin leads her: Ed, 2026-10-21) starts the next night in place (the same island, a new seed, a new game). QUICK_SAIL=0 skips those
// (a few minutes in the cloud). tools/sail/leak.cjs and swap.cjs (SAIL=1) test the sail fully.
// Run `npm run build` first, then `npm run smoke:quick`.
const http = require("http");
const fs = require("fs");
const path = require("path");
const { houseRoute, walkHouse } = require("../bench/house-route.cjs");
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
  // A heartbeat on the page's thread from its first script: the longest it went without one while the game loaded and started (the
  // boot freeze, 2026-10-25: the oak's floor painted on it held the page 50 to 75 s, "Page Unresponsive", and the run still passed).
  await page.addInitScript(() => { const w = window; w.__beat = { last: performance.now(), worst: 0, at: 0 }; const tick = () => { const n = performance.now(), b = w.__beat; if (n - b.last > b.worst) { b.worst = n - b.last; b.at = b.last; } b.last = n; setTimeout(tick, 50); }; setTimeout(tick, 50); });
  page.on("pageerror", e => errors.push(`page error: ${e.message}`));
  page.on("console", m => { if (m.type() === "error") errors.push(`console error: ${m.text()}`); });
  try {
    await page.goto(`http://127.0.0.1:${port}/?creator=0&seed=123&quick=1&debug${process.env.QUICK_QUERY ? "&" + process.env.QUICK_QUERY : ""}`); // (QUICK_QUERY=a=b&c=d: more of the link, e.g. set=combat.packs.on=false for pack combat off)
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 240000, polling: 500 });
    log("game ready");
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
    await page.waitForFunction(() => !window.witch.game.clock.paused && document.getElementById("start").style.display === "none", null, { timeout: 30000 });
    check(true, "starts directly without a start screen or key press");
    { // (15 s: the CI runners' software renderer links a big shader program in a second or two and a busy runner stretches that to
      // 4 s and more (4 s tripped other PRs, 2026-10-26); the freeze it's here for held the page 50 to 75 s)
      const beat = await page.evaluate(() => window.__beat), budget = Number(process.env.QUICK_STALL_MS || 15000);
      check(beat.worst < budget, `no long freeze while it loads (the page's thread's longest wait ${(beat.worst / 1000).toFixed(1)} s, at ${(beat.at / 1000).toFixed(0)} s; under ${budget / 1000} s)`);
    }
    // A walk through the house (Ed's playtest of v4515, "stuck_walking_down": each piece of furniture and each room's dressing baked on
    // the page's thread as she came near, 120 to 220 ms a frame on his laptop): from her decks down the Terrace to the Parlour, out to
    // the Bestiary and back, and across to the Studio, a fixed frame at a time with the picture's draw left out (the software
    // renderer's own time isn't the house's); the longest frame's drawing work in the house, the view's "witch" part (render/view.ts:
    // her, the rooms and the crown), under QUICK_HOUSE_MS: 150 ms by default, for the runners' slow software renderer (about three
    // times this cloud's), where an ordinary frame here is 3 to 45 ms; the page-thread bakes it's there to catch were 190 to 3700 ms here.
    {
      const route = houseRoute(require("../../config/house/load.mjs").loadHouse()), budget = Number(process.env.QUICK_HOUSE_MS || 150);
      const walk = await page.evaluate(walkHouse, { route });
      check(walk.got && walk.worst < budget, `walks the house (Terrace, Parlour, Bestiary, Studio: ${walk.got ? "all the way" : "stopped short"}, ${walk.frames} frames), no frame's drawing in it over ${budget} ms (the longest ${walk.worst.toFixed(1)} ms, at ${JSON.stringify(walk.at)} on the plan)`);
    }
    // She starts at her decks on the treehouse's Terrace, 22 m up (rules/treehouse.ts): up off it, out over the forest (south,
    // towards the camera: the oak's rooms spread west, north and east of the Terrace), down.
    if (await page.evaluate(() => !!window.witch.game.witch.perch)) {
      await page.keyboard.press("Space");
      await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 120000, polling: 100 }).catch(() => {});
      check(await page.evaluate(() => window.witch.game.witch.mode === "treetop" && !window.witch.game.witch.perch), "space rises off the treehouse deck");
      await hold("ArrowDown", 1.5);
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
    // (the bare broom's take-off needs the shared cooldown empty: no quick take-off since the Workshop's parts, Ed 2026-10-23)
    await page.waitForFunction(() => !(window.witch.game.witches[0].cool?.left > 0.01), null, { timeout: 60000, polling: 100 }).catch(() => {});
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 120000, polling: 100 }).catch(() => {});
    check((await state()).mode === "treetop", "space rises to the treetops");
    [a, b] = await hold("ArrowUp", FLY);
    check(a.z - b.z > 20, `flies in the treetops (${(a.z - b.z).toFixed(0)} m north in ${(b.t - a.t).toFixed(1)} s)`);
    check(b.trees > 20, `the forest is drawn (${b.trees} trees)`);
    // Not a blank picture: the canvas holds many distinct colours (in 6-bit steps: the night's darker since #1398, its unlit forest
    // in fewer of the old 5-bit steps, and a run in the treetops had come out at 40; a blank canvas is one or two either way).
    const colours = await page.evaluate(() => {
      const c = document.querySelector("canvas#game"), w = 64, h = 36, o = document.createElement("canvas");
      o.width = w; o.height = h; const x = o.getContext("2d"); x.drawImage(c, 0, 0, w, h);
      const d = x.getImageData(0, 0, w, h).data, seen = new Set();
      for (let i = 0; i < d.length; i += 4) seen.add((d[i] >> 2) * 4096 + (d[i + 1] >> 2) * 64 + (d[i + 2] >> 2));
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
    if (process.env.QUICK_SAIL !== "0") {
      const ts = Date.now(), inPlace = await page.evaluate(() => window.witch.sail("fox", 4242));
      await page.waitForFunction(() => window.witch.ready && window.witch.game.seed === 4242, null, { timeout: 600000, polling: 500 });
      await page.keyboard.press("Shift"); // (skips the flight in, as any key does)
      await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 120000, polling: 100 }).catch(() => {});
      const n = await page.evaluate(() => ({ island: window.witch.game.tuning.map?.island, url: location.search, t: window.witch.game.clock.time, paused: window.witch.game.clock.paused }));
      check(inPlace && n.island === "fox" && /^\?island=fox&seed=4242&/.test(n.url) && !n.paused, `sails in place to another island (${n.island}, ${n.url}, in ${((Date.now() - ts) / 1000).toFixed(0)} s)`);
      // (Ed, 2026-10-25, his 2a: a sail always ends with her asleep in bed: the flight in lands in her bedroom and the wake-up starts)
      const slept = await page.evaluate(() => { const g = window.witch.game, W = g.witches[0]; return { wake: g.wake?.beat ?? null, yesterday: !!g.wake?.yesterday, open: !!g.wake?.open, pile: g.wake?.pile?.length ?? 0, seated: W.body.seated }; });
      // (a step of WASD gets her up after the stretch, as every morning (Ed, 2026-10-26: one wake-up), as a player would: the bed below
      // wants her up and about; the stretch's 3 s of her clock are a minute or more of the runner's)
      await page.keyboard.down("KeyD");
      await page.waitForFunction(() => !!window.witch.game.wake?.open, null, { timeout: 240000, polling: 100 }).catch(() => {});
      await page.keyboard.up("KeyD");
      const woke = await page.evaluate(() => !!window.witch.game.wake?.open);
      check(!!slept.wake && slept.yesterday && !slept.open && slept.pile > 0 && !slept.seated && woke, `the sail lands her asleep in her bed, the wake-up on, and a move gets her up (${JSON.stringify(slept)}, up ${woke})`);
      // The chart over the night (the map table's), its own island chosen (Ed, 2026-10-21): back to the night as it was, no sail.
      const tc = Date.now();
      await page.evaluate(() => { window.__nightGame = window.witch.game; window.__nightT = window.witch.game.clock.time; window.witch.chart(); });
      await page.waitForFunction(() => !!window.chart && window.chart.islands().length > 0 && window.chart.chart.selected, null, { timeout: 180000, polling: 200 });
      const ch = await page.evaluate(() => {
        window.chart.choose("fox", true);
        const o = document.getElementById("chart-overlay"), btn = o.querySelector("a.btn.sail");
        const r = { label: btn.textContent, home: o.querySelector("a.btn.home").textContent, paused: window.witch.game.clock.paused };
        btn.click();
        return r;
      });
      await page.waitForFunction(() => !document.getElementById("chart-overlay") && window.witch.game.clock.time > window.__nightT, null, { timeout: 60000, polling: 200 }).catch(() => {});
      const c2 = await page.evaluate(() => ({ open: !!document.getElementById("chart-overlay"), same: window.witch.game === window.__nightGame, seed: window.witch.game.seed, url: location.search, t: window.witch.game.clock.time, t0: window.__nightT, paused: window.witch.game.clock.paused, arriving: document.body.classList.contains("arriving") }));
      check(ch.label === "Back to the party" && ch.home === "Sail home" && ch.paused && !c2.open && c2.same && c2.seed === 4242 && c2.url === n.url && !c2.paused && !c2.arriving && c2.t > c2.t0,
        `choosing her own island on the chart goes back to the night ("${ch.label}", home "${ch.home}"; paused under the chart ${ch.paused}, chart closed ${!c2.open}, the same night ${c2.same}, seed ${c2.seed}, ${c2.url}, game time ${c2.t0.toFixed(2)} → ${c2.t.toFixed(2)} s, running ${!c2.paused}, no flight ${!c2.arriving}, in ${((Date.now() - tc) / 1000).toFixed(0)} s)`);
      await page.goBack({ timeout: 5000 }).catch(() => {});
      await page.waitForFunction(() => document.getElementById("pause-sliders")?.classList.contains("open"), null, { timeout: 60000 }).catch(() => {});
      const b = await page.evaluate(() => ({ menu: !!document.getElementById("pause-sliders")?.classList.contains("open"), url: location.search, seed: window.witch.game.seed }));
      check(b.menu && b.url === n.url && b.seed === 4242, `Back opens the pause menu on the same night (${b.url})`);
      await page.keyboard.press("Escape");
      await page.waitForFunction(() => !document.getElementById("pause-sliders")?.classList.contains("open"), null, { timeout: 60000 }).catch(() => {});
      // The bed (main.ts useHouse "slept", newNight "bed"; the afterparty's 💤 pin leads her there: Ed, 2026-10-21): the party
      // over, she's put by the treehouse's bed and holds E; the next night on this island starts in place, a new seed, as a fresh load.
      const ta = Date.now();
      const over = await page.evaluate(() => { window.witch.lose("home"); return true; });
      await page.waitForFunction(() => !!window.witch.game.partyOver, null, { timeout: 120000, polling: 100 }).catch(() => {});
      const po = await page.evaluate(() => !!window.witch.game.partyOver);
      // (config/house/'s bed, 0.4 m off its near side, on the house's plan turned about the hub: rules/houseRooms.ts fromPlan)
      const H = require("../../config/house/load.mjs").loadHouse(), bed = H.objects.find(o => o.use.kind === "bed");
      const A = ((H.turn || 0) * Math.PI) / 180, u = bed.x, v = bed.z + bed.d / 2 + 0.4, by = [u * Math.cos(A) + v * Math.sin(A), -u * Math.sin(A) + v * Math.cos(A)];
      await page.evaluate(([bx, bz]) => {
        const g = window.witch.game, W = g.witches[0], t = g.map.treehouse;
        window.__lastGame = g;
        W.body = { ...W.body, x: t.x + bx, z: t.z + bz, vx: 0, vz: 0, perch: true, mode: "ground", lift: 0, seated: false };
      }, by);
      await page.keyboard.down("KeyE");
      await page.waitForFunction(() => window.witch.game !== window.__lastGame, null, { timeout: 600000, polling: 200 }).catch(() => {});
      await page.keyboard.up("KeyE");
      await page.waitForFunction(() => window.witch.game !== window.__lastGame && window.witch.ready, null, { timeout: 600000, polling: 500 });
      await page.keyboard.press("Enter"); // (?creator=0: the start card's any key, as a fresh page's)
      await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 120000, polling: 100 }).catch(() => {});
      const a2 = await page.evaluate(() => ({ island: window.witch.game.tuning.map?.island, seed: window.witch.game.seed, url: location.search, t: window.witch.game.clock.time, paused: window.witch.game.clock.paused, over: !!window.witch.game.partyOver }));
      check(over && po && a2.island === "fox" && a2.seed !== 4242 && new RegExp(`[?&]island=fox(&|$)`).test(a2.url) && new RegExp(`[?&]seed=${a2.seed}(&|$)`).test(a2.url) && !a2.paused && !a2.over && a2.t < 30,
        `the party over, the bed starts the next night in place (${a2.island}, seed ${a2.seed}, ${a2.url}, game time ${a2.t.toFixed(1)} s, the party on again ${!a2.over}, in ${((Date.now() - ta) / 1000).toFixed(0)} s)`);
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
