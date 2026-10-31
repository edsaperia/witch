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

// Zoom keys (rise and descend are Space; E puts a sigil down, Q cycles; right click dashes).
const ZOOM_IN = "KeyZ", ZOOM_OUT = "KeyX";
const TRUNK_ROUND = 1.3; // across a trunk, its lit side over its shaded one (median): the bluebell glade's flat beeches measured 1.21, shaded ones 1.40

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Known failures (the coordinator, 2026-10-06: "make the list small and honest, so a red full smoke
// means something new"): checks that fail on claude/prototype itself for a reason we know and have an
// issue for. A known check that fails is reported apart ("known: N") and doesn't fail the run; one that
// passes says so, so it can come off the list. Every entry: the check's key, its issue, and why.
// (2026-10-14, India's full run on #928: speed-build and boost-p99 (#310), both vanish flights (#311) and trunks-round (#509)
// passed outright, so they came off; boost-worst and pops still fail here for their known reasons.)
const KNOWN = {
  "boost-worst": { issue: 310, why: "absolute CPU budget on the cloud's shared, slower CPU" },
  // (2026-10-27, Alpha's full run on v5076, Ed's call: not fixed now, the later clean-up and speed pass: at full boost, ~200 m/s, the
  // scenery rebuild takes 35-135 ms in single frames: done whole under 30 fps, and due again before its slices finish above it)
  "boost-p99": { issue: 1325, why: "the scenery rebuild at full boost: 35-135 ms frames, p99 59 ms (#1325)" },
  "speed-build": { issue: 1325, why: "the forest's building at full treetop speed: p99 19.7 ms over 122 frames (#1325)" },
  "pops": { issue: 311, why: "1-2 s software-rendered frames starve the scenery budget" },
  "vanish": { issue: 1090, why: "Ed's window sizes take tens of seconds a frame in the software renderer: they fly only on a real GPU (SMOKE_GPU=1)" },
};
// SMOKE_GPU=1: launch on the machine's own GPU, not SwiftShader (the vanish flights at Ed's sizes run only there, #1090).
const GPU = process.env.SMOKE_GPU === "1";

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({
    executablePath: fs.existsSync("/opt/pw-browsers/chromium") ? undefined : undefined,
    args: GPU ? ["--ignore-gpu-blocklist"] : ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const errors = [];
  const results = [];
  const known = [], fixed = [];
  const check = (ok, what, key) => {
    const k = key && KNOWN[key];
    if (k && !ok) { results.push(`KNOWN ${what} (#${k.issue}: ${k.why})`); known.push(`${what} (#${k.issue})`); return; }
    if (k && ok) fixed.push(`${key} (#${k.issue})`);
    results.push(`${ok ? "ok  " : "FAIL"} ${what}`); if (!ok) errors.push(what);
  };

  // The art waits (as the bench's, #1038): the page's loop stands still while the art is drawn, or on the cloud's 4 cores its
  // software-rendered frames take most of the CPU from the art workers (since #1024 the start's art took past the 40-minute
  // wait: India, 2026-10-23). A wait that also needs the forest built (built a few chunks a frame) runs the loop till it's in,
  // stands it still for the art, then lets a few frames through and looks again, till both hold together. It always leaves
  // the loop running, as the steps expect. `soft`: a wait that may time out (the old .catch(() => {})).
  async function settleArt(page, { forest = false, trees = false, ground = false, timeout = 900000, soft = false } = {}) {
    const until = Date.now() + timeout;
    const built = () => page.evaluate(([t, gr]) => { const s = window.witch.view.stats; return s.forestMissing === 0 && (!t || s.trees > 0) && (!gr || s.pendingGround === 0); }, [trees, ground]);
    try {
      for (;;) {
        if (forest) await page.waitForFunction(([t, gr]) => { const s = window.witch.view.stats; return s.forestMissing === 0 && (!t || s.trees > 0) && (!gr || s.pendingGround === 0); }, [trees, ground], { timeout: Math.max(1000, until - Date.now()), polling: 500 });
        await page.evaluate(() => { window.witch.manual = true; });
        await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: Math.max(1000, until - Date.now()), polling: 1000 });
        await page.evaluate(() => { window.witch.manual = false; });
        if (!forest) return;
        await sleep(1500); // (a few frames: what they ask for, if anything)
        if ((await page.evaluate(() => window.witch.view.assets.pending)) === 0 && (await built())) return;
        if (Date.now() > until) throw new Error("settleArt: timed out");
      }
    } catch (e) { await page.evaluate(() => { window.witch.manual = false; }).catch(() => {}); if (!soft) throw e; }
  }
  let shared = null;
  async function run(name, viewport, steps, query) {
    if (process.env.ONLY && !process.env.ONLY.split(",").includes(name)) return; // ONLY=party,cull runs just those
    const { hasTouch, dpr, ...size } = viewport;
    // Desktop runs share one browser profile, so the art drawn by the first is kept (IndexedDB)
    // for the rest, as a player's reload would; touch and high-DPI runs need their own.
    let page;
    if (!hasTouch && (dpr || 1) === 1) { shared ??= await browser.newContext({ viewport: size }); page = await shared.newPage(); await page.setViewportSize(size); }
    else page = await browser.newPage({ viewport: size, deviceScaleFactor: dpr || 1, hasTouch: !!hasTouch, isMobile: !!hasTouch });
    page.on("pageerror", e => errors.push(`${name}: page error: ${e.message}`));
    page.on("console", m => { if (m.type() === "error") errors.push(`${name}: console error: ${m.text()}`); });
    // Preserve each scenario's authored island/seed: pop, terrain, long-flight and species-specific checks depend on its geometry.
    await page.goto(`http://127.0.0.1:${port}/?creator=0&pixels=keep&${/(^|&)seed=/.test(query || "") ? (query || "").replace(/^&/, "") : `seed=${seed}${query || "&debug"}`}`); // (a run may ask for its own seed; pixels=keep: the floating checks read the atlases' pixels, which the game lets go once uploaded)
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000 });
    // All the art is drawn in the background after start; the software renderer here starves the
    // workers of CPU (minutes at big window sizes), so wait for it before flying, so the shots show the forest as players do.
    await settleArt(page, { timeout: 2400000 });
    await steps(page);
    await page.close();
  }
  const state = page => page.evaluate(() => { const g = window.witch.game; return { t: g.clock.time, x: g.witch.x, z: g.witch.z, mode: g.witch.mode, paused: g.clock.paused, area: window.witch.areaUnderWitch(), stats: window.witch.view.stats }; });
  // Rise from the ground: a press within riseCooldown seconds of her landing is dropped by the rules (#649, Ed, 2026-10-11:
  // "players rise to the treetops instead of dodging"; the plain broom halves it), so wait that out on her own clock first.
  // A press can also be dropped while she's staggered by a blow or knocked out, so press again until she leaves the ground,
  // and say what state she was in if she never does.
  // On the house she rises only from its Terrace, never in its rooms (#1075, Ed 2026-10-23): the zoom path can end with her flown
  // in over the Terrace (landing on it) and walked on into a room (on seed 123 the house stands in the Holly thicket, about 80 m
  // across; she then "wouldn't rise", the world at a tenth: 2026-10-25). So on the house she's put back by her decks on the
  // Terrace first, as a player would walk out to it.
  const rise = async page => {
    if (await page.evaluate(() => { const g = window.witch.game, W = g.witches[0], b = W.body, s = g.map.start; if (!b.perch || b.mode !== "ground" || b.seated || Math.hypot(b.x - s.x, b.z - s.z) < 1) return false; W.body = { ...b, x: s.x, z: s.z, vx: 0, vz: 0 }; return true; })) results.push("on the house: put back on its Terrace by her decks to rise");
    for (let i = 0; i < 6; i++) {
      await page.waitForFunction(() => {
        const g = window.witch.game, W = g.witches[0], t = g.tuning, cd = (t.riseCooldown ?? 0) * (W.spells?.broom === "none" ? t.spells?.plain?.riseCooldown ?? 1 : 1);
        return W.landedAt == null || g.herTime >= W.landedAt + cd + 0.05;
      }, null, { timeout: 240000, polling: 100 });
      await page.keyboard.press("Space");
      if (await page.waitForFunction(() => window.witch.game.witch.mode !== "ground", null, { timeout: 60000, polling: 100 }).then(() => true, () => false)) return;
    }
    const st = await page.evaluate(() => { const g = window.witch.game, W = g.witches[0]; return { mode: W.body.mode, seated: W.body.seated, perch: W.body.perch, x: W.body.x, z: W.body.z, ko: !!W.ko, knock: W.knock, cool: W.cool, stack: W.leash.stack.length, landedAt: W.landedAt, herTime: g.herTime, time: g.clock.time, timeScale: g.timeScale, paused: g.clock.paused, area: window.witch.areaUnderWitch() }; });
    throw new Error(`she wouldn't rise from the ground: ${JSON.stringify(st)}`);
  };
  // Hold a key for `secs` of her time (a slow headless renderer runs fewer, capped frames). Her own clock (g.herTime), not the
  // world's: she starts on the treehouse deck, where the world runs at a tenth (rules/treehouse.ts), and a second of the
  // world's there was minutes of software-rendered frames (the tilt shots timed out at 240 s).
  const hold = async (page, key, secs, timeout = 240000) => { // the software renderer here runs the treetops (sky, bend) at about a frame a second
    const from = await state(page), h0 = await page.evaluate(() => window.witch.game.herTime);
    await page.keyboard.down(key);
    await page.waitForFunction(t => window.witch.game.herTime >= t, h0 + secs, { timeout, polling: 50 });
    const to = await state(page);
    await page.keyboard.up(key);
    return [from, to];
  };
  // Off the house onto the forest floor (the oak, 2026-10-24: walking off her decks keeps her in the house, its limbs running on to
  // its rooms): up off the Terrace, south over the trees, and down.
  const offHouse = async (page, timeout = 240000) => {
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout });
    await hold(page, "ArrowDown", 1.5, timeout);
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "ground" && !window.witch.game.witch.perch, null, { timeout });
    await page.waitForFunction(() => !(window.witch.game.witches[0].cool?.left > 0.01), null, { timeout, polling: 100 }).catch(() => {}); // (the take-off's cooldown spent, as quick.cjs waits)
  };
  const shot = async (page, file) => { await sleep(400); await page.screenshot({ path: path.join(out, file), timeout: 300000 }); /* big windows: seconds a frame in the software renderer */ results.push(`shot previews/${file}`); };

  // Fly a fixed path through every zoom level in both modes; nothing of any kind may appear or
  // vanish in clear view on the way (trees, undergrowth, walls, set pieces, creatures, props).
  const flyPath = async page => {
    const steps = await page.evaluate(() => window.witch.game.tuning.camera.zoomSteps);
    const keys = ["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp"];
    for (const mode of ["treetop", "ground"]) {
      for (let i = 0; i < steps; i++) await page.keyboard.press(ZOOM_IN); // all the way in
      for (let z = 0; z < steps; z++) {
        await hold(page, keys[z % 4], 0.8);
        await page.keyboard.press(ZOOM_OUT); // a step out, while flying on
        await hold(page, keys[(z + 1) % 4], 0.6);
      }
      for (let i = 0; i < steps; i++) { await page.keyboard.press(ZOOM_IN); await hold(page, keys[i % 4], 0.3); }
      await page.keyboard.press("Space"); // change mode mid-path
      await hold(page, "ArrowUp", 1.2);
    }
  };

  await run("laptop", { width: 1280, height: 720 }, async page => {
    await shot(page, "00-start-screen.png");
    await page.keyboard.press("Enter");
    await sleep(300);
    let s = await state(page);
    check(!s.paused, "a key press starts the game");
    // (Not by batch count: 0.3 s in, seated at the treehouse zoomed in, it can be as few as 3 (6 area types' and 4 creatures' once she's out); the trees and draw calls are what matter.)
    check(s.stats.trees > 20 && s.stats.batches >= 1 && s.stats.drawCalls > 15, `trees drawn round the start (${s.stats.trees} trees, ${s.stats.batches} batches, ${s.stats.drawCalls} draw calls)`);
    await shot(page, "01-ground-dancefloor.png");
    // She starts at her decks on the treehouse deck, 22 m up, kept inside its rail (rules/treehouse.ts): up off it, out over the
    // forest and down, as the quick smoke does, before the ground flight is measured (held at the rail she made 3.2 m/s).
    if (await page.evaluate(() => !!window.witch.game.witch.perch)) {
      await rise(page);
      await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 240000, polling: 100 }).catch(() => {});
      check(await page.evaluate(() => window.witch.game.witch.mode === "treetop" && !window.witch.game.witch.perch), "space rises off the treehouse deck");
      await hold(page, "ArrowDown", 1.5); // (south, as the quick smoke: the oak's rooms spread west, north and east of the Terrace)
      await page.keyboard.press("Space");
      await page.waitForFunction(() => window.witch.game.witch.mode === "ground", null, { timeout: 240000, polling: 100 }).catch(() => {});
      check(await page.evaluate(() => window.witch.game.witch.mode === "ground" && !window.witch.game.witch.perch), "lands on the ground away from the deck");
    }
    // Speeds are measured in game time: a slow headless renderer runs fewer, capped frames.
    const tuning = await page.evaluate(() => window.witch.game.tuning);
    let s0;
    [s0, s] = await hold(page, "ArrowRight", 2);
    const groundSpeed = (s.x - s0.x) / (s.t - s0.t);
    check(groundSpeed > tuning.groundSpeed * 0.6 && groundSpeed <= tuning.groundSpeed * 1.01, `flies east on the ground (${groundSpeed.toFixed(1)} m/s)`);
    check(s.mode === "ground", "still in ground mode");
    await shot(page, "02-ground-flying.png");
    await rise(page); // (past the landing's riseCooldown: the 2 s flight is shorter than its 3 s)
    // The rise takes riseTime of game time: wait for it to finish, however slow the frames here.
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 400000, polling: 50 }).catch(() => {});
    s = await state(page);
    check(s.mode === "treetop", `space rises to treetop mode (${s.mode})`);
    await shot(page, "03-treetop.png");
    [s0, s] = await hold(page, "ArrowUp", 2);
    const topSpeed = (s0.z - s.z) / (s.t - s0.t);
    check(topSpeed > groundSpeed * 1.5 && topSpeed <= tuning.treetopSpeed * (tuning.treetop?.boost ?? 1) * 1.01, `flies north faster in treetop mode, at most its full boost (${topSpeed.toFixed(1)} m/s)`);
    await shot(page, "04-treetop-flying.png");
    // Fly a fixed path through every zoom level in both modes; nothing of any kind may appear or
    // vanish in clear view on the way (trees, undergrowth, walls, set pieces, creatures, props).
    await page.evaluate(() => { window.witch.view.pops = []; window.witch.view.trackPops = true; });
    await flyPath(page);
    const pops = await page.evaluate(() => window.witch.view.pops.slice(0, 12));
    const popCount = await page.evaluate(() => window.witch.view.pops.length);
    check(popCount === 0, `nothing pops in or out in clear view, flying through every zoom level in both modes (${popCount})${popCount ? ": " + pops.join("; ") : ""}`, "pops");
    await page.waitForFunction(() => !["rising", "descending"].includes(window.witch.game.witch.mode), null, { timeout: 240000 });
    if (await page.evaluate(() => window.witch.game.witch.mode) !== "treetop") { await rise(page); await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 240000 }); }
    await page.keyboard.press(ZOOM_OUT); await page.keyboard.press(ZOOM_OUT);
    await sleep(800);
    await shot(page, "05-treetop-zoomed-out.png");
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "ground", null, { timeout: 240000 }).catch(() => {});
    s = await state(page);
    check(s.mode === "ground", `space descends to ground mode (${s.mode})`);
    await shot(page, "06-ground-zoomed-out.png");
    await page.keyboard.press(ZOOM_IN); await page.keyboard.press(ZOOM_IN); await page.keyboard.press(ZOOM_IN);
    await sleep(800);
    await shot(page, "07-ground-zoomed-in.png");
    results.push(`area under the witch: ${s.area}`);
  });

  // The pop check again in a Heath (gorse: small bright details), where Ed saw bushes blink. On the moth's island: the home
  // island's roster is the ten home kinds, so no seed puts a heath on it (India's full run on #928, 2026-10-14), and the old
  // radius map (?island=off, 98 areas of every classic type) bakes so much art ahead that its assets never settle here within
  // the wait; the moth's (20 areas, 7 kinds since #1024's compass biomes, the heath plentiful) carries three heaths.
  await run("heath", { width: 1280, height: 720 }, async page => {
    await page.keyboard.press("Enter");
    await sleep(300);
    const heath = await page.evaluate(() => {
      const g = window.witch.game, m = g.map;
      for (const [x, y] of m.cells) {
        if (window.witch.areaTypeId(m.typeOf(x, y)) !== "heath") continue;
        const s = m.siteOf(x, y), px = s.x + 20, pz = s.z + 20;
        // (off her decks: a witch put somewhere else is off the deck, rules/treehouse.ts)
        g.witch = { ...g.witch, x: px, z: pz, vx: 0, vz: 0, seated: false }; g.camera = { ...g.camera, tx: px, tz: pz, intro: 0 };
        return `${x},${y}`;
      }
      return null;
    });
    check(!!heath, `the pop check also flies a Heath (${heath})`);
    if (!heath) return;
    // Wait for frames drawn at the new place (game time passing), not wall time: the first
    // rebuild there makes new forest, which a slow renderer can take over a second to finish,
    // and what it draws then must not count as popping in.
    const t0 = await page.evaluate(() => window.witch.game.clock.time);
    await page.waitForFunction(t => window.witch.game.clock.time - t >= 0.5, t0, { timeout: 120000, polling: 50 });
    await settleArt(page);
    await page.evaluate(() => { window.witch.view.pops = []; window.witch.view.trackPops = true; });
    await flyPath(page);
    await shot(page, "08-heath.png");
    const pops = await page.evaluate(() => window.witch.view.pops.slice(0, 12));
    const popCount = await page.evaluate(() => window.witch.view.pops.length);
    check(popCount === 0, `nothing pops in or out in clear view in the Heath, flying through every zoom level in both modes (${popCount})${popCount ? ": " + pops.join("; ") : ""}`, "pops");
  }, "&debug&island=moth");

  // Four areas: local touch movement/rise does not need distant scenery or area diversity.
  await run("phone", { width: 390, height: 844, hasTouch: true }, async page => {
    await page.touchscreen.tap(200, 400);
    await sleep(300);
    check(!(await state(page)).paused, "a tap starts the game");
    // (on the forest floor south of the dancefloor: from her decks the joystick would walk her out along the oak's limbs, where she can't rise)
    await page.evaluate(() => { const g = window.witch.game, d = g.map.dancefloor; g.witch = { ...g.witch, x: d.x, z: d.z + 45, vx: 0, vz: 0, mode: "ground", lift: 0, perch: undefined, seated: false }; });
    await sleep(1500);
    await shot(page, "10-phone-ground.png");
    // Drag the joystick up and to the right with touch pointer events, as a thumb would.
    const touch = (type, x, y) => page.evaluate(([type, x, y]) => {
      const el = document.getElementById("stick-zone");
      el.dispatchEvent(new PointerEvent(type, { pointerId: 7, pointerType: "touch", clientX: x, clientY: y, bubbles: true, cancelable: true, isPrimary: true }));
    }, [type, x, y]);
    const s0 = await state(page);
    await touch("pointerdown", 100, 650);
    await touch("pointermove", 150, 600);
    await page.waitForFunction(t => window.witch.game.clock.time - t >= 1.5, s0.t, { timeout: 400000, polling: 50 });
    const s1 = await state(page);
    await touch("pointerup", 150, 600);
    check(s1.x > s0.x + 2 && s1.z < s0.z - 2, `the touch joystick flies her north-east (${(s1.x - s0.x).toFixed(1)}, ${(s1.z - s0.z).toFixed(1)} m)`);
    await page.touchscreen.tap(345, 770); // the rise / descend button
    await page.waitForFunction(() => window.witch.game.witch.mode !== "ground" && window.witch.game.witch.mode === "treetop", null, { timeout: 400000, polling: 50 }).catch(() => {});
    check((await state(page)).mode === "treetop", "the round button rises to treetop mode");
    await shot(page, "11-phone-treetop.png");
  }, "&debug&island=4");

  // The tilt-shift both ways, and off, from the same spot, for Ed to compare; four areas suffice for this local view.
  for (const tilt of ["before", "after", "off"]) {
    await run(`tilt-${tilt}`, { width: 1280, height: 720 }, async page => {
      await page.keyboard.press("Enter");
      await hold(page, "ArrowUp", 1);
      await page.keyboard.press("Space");
      await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 240000 });
      await sleep(600);
      await shot(page, `2${["before", "after", "off"].indexOf(tilt)}-tilt-${tilt}.png`);
    }, `&island=4&tilt=${tilt}`);
  }

  // The dancefloor from the ground and from the treetops.
  await run("dancefloor", { width: 1280, height: 720 }, async page => {
    await page.keyboard.press("Enter");
    await sleep(1500);
    await shot(page, "40-dancefloor-ground.png");
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.lift > 0.3, null, { timeout: 240000, polling: 20 });
    await page.screenshot({ path: path.join(out, "42-rising.png"), timeout: 300000 }); // no settle: catch her mid-climb (and as long as shot() gives a frame: seconds a frame in the software renderer)
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 240000 });
    await sleep(1500);
    await shot(page, "41-dancefloor-treetop.png");
    // The wave numbers follow the bend (Ed, 2026-10-05: "the glowing numbers can be seen past the
    // bend"): over the treetops, none shows for a stone hidden behind the bent horizon.
    // (they're a design aid, off in the tuning since #188's round: on for this check, off again after)
    const t0 = await page.evaluate(() => { const g = window.witch.game; g.tuning.waveNumbers.on = true; return g.clock.time; });
    await page.waitForFunction(t => window.witch.game.clock.time - t >= 1.5, t0, { timeout: 240000, polling: 50 }); // (their fade settles)
    const nb = await page.evaluate(() => {
      const v = window.witch.view, list = v.waveNumbers.last;
      let hidden = 0, shownPast = 0;
      for (const n of list) { const k = v.overBulge(n.x, n.z, n.top ?? 0); if (k === 0) { hidden++; if ((n.show ?? 1) > 0.1) shownPast++; } }
      window.witch.game.tuning.waveNumbers.on = false;
      return { drawn: list.length, hidden, shownPast };
    });
    check(nb.shownPast === 0 && nb.drawn > 0, `over the treetops, no wave number shows for a stone past the bent horizon (${nb.drawn} drawn, ${nb.hidden} past the horizon, ${nb.shownPast} still showing)`);
    // Behind the home soundsystem (up the screen from it), on the ground: she must still read.
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "ground", null, { timeout: 240000 });
    await page.evaluate(() => { const g = window.witch.game, d = g.map.dancefloor, x = d.x + d.radius + 5, z = d.z + 3 - 2.5; g.witch = { ...g.witch, x, z, vx: 0, vz: 0 }; g.camera = { ...g.camera, tx: x, tz: z }; });
    await sleep(1500);
    await shot(page, "43-behind-soundsystem.png");
  }, "");

  // The ground effects (tree shadows, canopy shadow, mist) off and on, from the same spot, and a
  // short recording in motion with them on.
  for (const [name, q] of [["effects-off", "&shadows=off&canopy=off&mist=off"], ["effects-on", ""]]) {
    await run(name, { width: 1280, height: 720 }, async page => {
      await page.keyboard.press("Enter");
      await offHouse(page);
      await hold(page, "ArrowRight", 1.5);
      await sleep(300);
      await shot(page, `30-ground-${name}.png`);
      await page.keyboard.press("Space");
      await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 240000 });
      await sleep(600);
      await shot(page, `31-treetop-${name}.png`);
    }, `&island=4${q || "&debug"}`); // Local ground/canopy effects comparison; distant area diversity is covered separately.
  }
  // The party spreading: one area partifying (shots through its transition, from the treetops),
  // its string lights from the ground, then the party after four waves from high up.
  await run("party", { width: 1280, height: 720 }, async page => {
    await page.keyboard.press("Enter");
    await page.keyboard.press("KeyP"); // hold the timer: the waves come when asked
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 240000 });
    await page.keyboard.press("KeyN");
    await page.waitForFunction(() => window.witch.game.party.wave >= 1, null, { timeout: 240000 });
    const at = await page.evaluate(() => {
      const g = window.witch.game, list = [...g.party.areas.values()].filter(a => a.wave === 1);
      const a = list[0], s = a.soundsystem, f = g.map.siteOf(a.from[0], a.from[1]);
      // Stand between the border it came over and its soundsystem, so the front crosses the screen.
      const x = (s.x * 2 + f.x) / 3, z = (s.z * 2 + f.z) / 3;
      g.witch = { ...g.witch, x, z, vx: 0, vz: 0 };
      g.camera = { ...g.camera, tx: x, tz: z };
      return { t: a.at, n: list.length };
    });
    check(at.n > 0, `the first wave partifies home's neighbours (${at.n} areas)`);
    for (const [i, dt] of [0.3, 1.0, 1.7, 2.6, 4].entries()) {
      await page.waitForFunction(t => window.witch.game.clock.time >= t, at.t + dt, { timeout: 400000, polling: 50 });
      await shot(page, `5${i}-party-transition-${i}.png`);
    }
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "ground", null, { timeout: 240000 });
    await sleep(800);
    await shot(page, "55-string-lights-ground.png");
    await rise(page);
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 240000 });
    await sleep(800);
    await shot(page, "56-string-lights-treetop.png");
    for (let w = 2; w <= 4; w++) {
      await page.keyboard.press("KeyN");
      await page.waitForFunction(n => window.witch.game.party.wave >= n, w, { timeout: 240000 });
    }
    await page.evaluate(() => { const g = window.witch.game, d = g.map.dancefloor; g.witch = { ...g.witch, x: d.x, z: d.z }; g.camera = { ...g.camera, tx: d.x, tz: d.z }; });
    for (let i = 0; i < 4; i++) { await page.keyboard.press(ZOOM_OUT); await sleep(150); }
    const t4 = await page.evaluate(() => window.witch.game.clock.time);
    await page.waitForFunction(t => window.witch.game.clock.time >= t, t4 + 3, { timeout: 400000, polling: 50 });
    const n = await page.evaluate(() => window.witch.game.party.areas.size);
    check(n > 1, `after four waves ${n} areas are partified`);
    await shot(page, "57-party-four-waves.png");
  }, "&debug");

  // Nothing through the earth (Ed, v256: "due to the bend, I can see string lights through the
  // earth"): in treetop mode with the bend on and the party's lights out, every layer in the scene
  // stands on the rolling ground and bends with the world, and anything drawn without a depth test
  // (lights glimmering through the canopy) is dropped behind the bent horizon.
  await run("earth", { width: 960, height: 600 }, async page => {
    await page.keyboard.press("Enter");
    for (let i = 0; i < 2; i++) { await page.keyboard.press("KeyN"); await sleep(400); }
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 300000 });
    await sleep(1500);
    const r = await page.evaluate(() => {
      const v = window.witch.view, out = { n: 0, flat: [], through: [] };
      v.scene.traverseVisible(o => { // (what's drawn: a hidden group's meshes aren't, the house's furniture while she's out of it)
        const m = o.material;
        if (!m) return;
        for (const mat of Array.isArray(m) ? m : [m]) {
          if (mat === v.sky?.mesh.material || o.renderOrder >= 20) continue; // the sky; debug overlays
          const vs = mat.vertexShader || "";
          if (!vs) { out.flat.push(`${o.type} ${mat.type}`); continue; } // a built-in material: neither lifted nor bent
          out.n++;
          if (!/clipOf|bendW/.test(vs)) out.flat.push(`${o.type} ${mat.type} (not bent)`);
          if (mat.depthTest === false && !/overBend/.test(vs)) out.through.push(`${o.type} ${mat.type}`);
        }
      });
      return out;
    });
    check(r.n > 10 && r.flat.length === 0, `every layer stands on the rolling ground and bends with the world (${r.n} checked)${r.flat.length ? ": " + r.flat.slice(0, 6).join("; ") : ""}`);
    check(r.through.length === 0, `nothing drawn without a depth test shows through the bent earth${r.through.length ? ": " + r.through.join("; ") : ""}`);
  });

  // The ley lines (Ed, 2026-10-04; 2026-10-06: "I think the leylines should cover the entire set of waves the whole
  // time, but ideally it shouldn't cross itself"): through every area's runestone in wave order, home first, drawn on
  // the ground and over the treetops; a wave moves the last stone reached on along the same line. Only the next stone
  // has a HUD indicator ("not the next two"). Shots of both.
  await run("ley", { width: 960, height: 600 }, async page => {
    await page.keyboard.press("Enter");
    const drawn = () => page.evaluate(() => { const L = window.witch.view.ley, c = L.chain, k = L.current, at = i => c[i]?.cell.join(","); return { visible: L.meshes[0].visible, links: c.length - 1, areas: window.witch.game.map.cells.length, current: k, tris: (L.meshes[0].geometry.index?.count ?? 0) / 3, here: at(k), next: at(k + 1), after: at(k + 2), stones: c.map(s => s.cell.join(",")), cues: window.witch.view.nextStones.length, after2: "afterNextStones" in window.witch.view, waking: window.witch.game.party.next.length }; });
    await page.waitForFunction(() => window.witch.view.ley.chain.length > 1, null, { timeout: 300000, polling: 200 });
    const a = await drawn();
    check(a.visible && a.current === 0 && a.links === a.areas - 1 && a.tris > 20 * a.links, `the ley line is drawn from home through every area (${a.links} sections for ${a.areas} areas), the last reached at ${a.current} (${a.tris} triangles)`);
    check(a.cues <= Math.max(1, a.waking) && !a.after2, `only the next stone has a HUD indicator (${a.cues} for the ${a.waking} waking next${a.after2 ? "; an after-next one is still there" : ""})`);
    await page.evaluate(() => { const g = window.witch.game; g.witch = { ...g.witch, seated: false }; });
    await sleep(2500);
    await shot(page, "62-ley-ground.png");
    for (let i = 0; i < 2; i++) { await page.keyboard.press("KeyN"); await sleep(600); }
    await page.waitForFunction(k => { const L = window.witch.view.ley; return L.chain[L.current]?.cell.join(",") !== k; }, a.here, { timeout: 120000, polling: 200 }).catch(() => {});
    const b = await drawn();
    // Two waves wake a stone each: the same line, the last reached moved on along it.
    check(b.here !== a.here && b.current >= 1 && b.stones.join(";") === a.stones.join(";") && (b.here === a.next || b.here === a.after),
      `two waves on, the same line, moved on along it (${a.here} → ${a.next} → ${a.after}, now at ${b.here}, ${b.current} behind, ${b.links - b.current} ahead)`);
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 300000 });
    await page.keyboard.press(ZOOM_OUT); await page.keyboard.press(ZOOM_OUT);
    await sleep(3000);
    await shot(page, "63-ley-treetop.png");
  });

  // Trunks (Ed, v271: "We have really lost our treetrunks"): in the densest wooded spot of a
  // tangly forest and of old oaks, on the ground, trunks must be drawn (drawn flat magenta for a
  // frame to find them) over at least 2% of the screen, and a good share of them readable (not
  // black on black) in the lit frame.
  await run("trunks", { width: 960, height: 540 }, async page => {
    await page.keyboard.press("Enter");
    // The forest in first: with the art drawn before the start (run's wait), the island counts as ready while she's still in the
    // house, so the forest fades in behind it over treehouse.house.dark.reveal (20 s) of her clock (#1252, Ed 2026-10-26); moved
    // and measured straight away, with still frames, it was black (0% trunks: the full smoke, 2026-10-27).
    await page.waitForFunction(() => window.witch.game.islandReady && window.witch.view.post.behind >= 1, null, { timeout: 900000, polling: 500 });
    // She stands a minute in wild woods for these: kept from being knocked out (the bluebell glade's shots were the
    // knockout's black iris and her treehouse: 2026-10-07).
    await page.evaluate(() => { window.trunkKeepAlive = setInterval(() => { const g = window.witch.game, W = g.witches[0]; if (!W.ko) W.health.hp = g.tuning.witchHealth.hits; }, 100); });
    // (The bluebell glade's smooth pale beeches drew as flat grey slabs on brown stumps: Ed, 2026-10-04.)
    for (const id of ["tangly-forest", "old-oaks", "bluebell-glade"]) {
      const at = await page.evaluate(id => {
        const g = window.witch.game, m = g.map, B = m.bounds;
        let t = -1;
        for (let i = 0; i < 64 && t < 0; i++) { try { if (window.witch.areaTypeId(i) === id) t = i; } catch { break; } }
        let best = null, bn = -1;
        for (const [cx, cy] of m.cells) if (m.typeOf(cx, cy) === t) {
          const s = m.siteOf(cx, cy);
          for (let k = 0; k < 60; k++) {
            const a = k * 0.7, d = m.areaSize * (0.1 + (k % 6) * 0.07), x = s.x + Math.cos(a) * d, z = s.z + Math.sin(a) * d;
            if (x < B.minX + 30 || x > B.maxX - 30 || z < B.minZ + 30 || z > B.maxZ - 30 || (B.land && B.land.distAt(x, z) < 30)) continue;
            const q = m.areaAt(x, z);
            if (q.cell[0] !== cx || q.cell[1] !== cy || m.paths.at(x, z, 3)) continue;
            const n = g.forest.treesNear(x, z, 14).filter(p => Math.hypot(p.x - x, p.z - z) < 14).length;
            if (n > bn) { bn = n; best = [x, z]; }
          }
        }
        if (best) { g.witch = { ...g.witch, seated: false, x: best[0], z: best[1], vx: 0, vz: 0 }; g.camera = { ...g.camera, tx: best[0], tz: best[1], intro: 0 }; }
        return best;
      }, id);
      if (!at) { results.push(`skip trunks: no ${id} on this map`); continue; }
      // The start can still be settling her at the treehouse when the first move lands, and put her back (the tangly
      // forest's "trunks" were the home glade's, at the start, 0.1-0.6% of the screen: 2026-10-07): move her again
      // until she's there, and say so if she never is, rather than measuring the wrong place.
      let there = false;
      for (let k = 0; k < 3 && !there; k++) {
        await sleep(1500);
        there = await page.evaluate(([x, z]) => { const g = window.witch.game; if (Math.hypot(g.witch.x - x, g.witch.z - z) < 6) return true; g.witch = { ...g.witch, seated: false, x, z, vx: 0, vz: 0 }; g.camera = { ...g.camera, tx: x, tz: z, intro: 0 }; return false; }, at);
      }
      check(there, `the witch is moved to the ${id}'s densest wooded spot for the trunk shots`);
      if (!there) continue;
      // Measured only once her spot's forest and art are all in: the old oaks read 1.15-1.24x when other smoke runs shared the
      // cloud's CPU (Hotel, 2026-10-25), the soft wait having given up with the spot's forest half built (14 chunks missing, 6 art
      // jobs pending: their stand-ins drawn) and 1.21x measured on that; 1.34-1.36x every time it was all in, then and since.
      await settleArt(page, { forest: true, timeout: 2400000, soft: true });
      await sleep(1500);
      const ready = await page.evaluate(() => { const v = window.witch.view; return { pending: v.assets.pending, missing: v.stats.forestMissing }; });
      check(ready.pending === 0 && ready.missing === 0, `the ${id}'s spot is drawn whole before its trunks are measured (${ready.pending} art jobs pending, ${ready.missing} forest chunks missing)`);
      if (ready.pending || ready.missing) continue;
      // Both frames from one still moment (the loop stood still, each drawn with no time passing), so nothing moves, grows in or
      // is baked between the lit frame and its mask.
      const still = () => page.evaluate(() => { window.witch.manual = true; window.witch.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 0); });
      await still();
      const lit = await page.screenshot({ timeout: 300000 });
      // The mask frame drawn plain: the bloom, the tilt-shift's blur and the mist layer smeared the flat magenta over the
      // ground round the trunks (the old oaks' "trunks" were half the screen, their sides compared across the blur:
      // 2026-10-07), so they're off for that one frame.
      await page.evaluate(() => { const v = window.witch.view, P = v.post, T = P.tuning; v.trunkMaskSaved = { bloom: T.bloom.on, tilt: T.tiltShift.on, fx: P.fxScene }; T.bloom.on = false; T.tiltShift.on = false; P.fxScene = null; v.debugTrunks = true; });
      await still();
      const mask = await page.screenshot({ timeout: 300000 });
      await page.evaluate(() => { const v = window.witch.view, P = v.post, T = P.tuning, s = v.trunkMaskSaved; v.debugTrunks = false; T.bloom.on = s.bloom; T.tiltShift.on = s.tilt; P.fxScene = s.fx; window.witch.manual = false; });
      fs.writeFileSync(path.join(out, `trunks-${id}.png`), lit); fs.writeFileSync(path.join(out, `trunks-${id}-mask.png`), mask);
      const r = await page.evaluate(async ([a, m]) => {
        const load = src => new Promise(res => { const i = new Image(); i.onload = () => { const c = document.createElement("canvas"); c.width = i.width; c.height = i.height; const x = c.getContext("2d"); x.drawImage(i, 0, 0); res(x.getImageData(0, 0, i.width, i.height).data); }; i.src = "data:image/png;base64," + src; });
        const A = await load(a), M = await load(m);
        let n = 0, readable = 0;
        const W = Math.round(Math.sqrt((M.length / 4) * 16 / 9)), H = M.length / 4 / W, ratios = []; // (the leg's 960 x 540)
        for (let i = 0; i < M.length; i += 4) if (M[i] > 200 && M[i + 1] < 60 && M[i + 2] > 200) { n++; if (0.3 * A[i] + 0.55 * A[i + 1] + 0.15 * A[i + 2] > 25) readable++; }
        // Across each trunk: every run of trunk pixels 4+ wide, its left third's brightness against
        // its right third's; their median is near 1 for flat trunks (a lit one is round).
        const luma = j => 0.3 * A[j] + 0.55 * A[j + 1] + 0.15 * A[j + 2], isTrunk = j => M[j] > 200 && M[j + 1] < 60 && M[j + 2] > 200;
        for (let y = 0; y < H; y += 2) for (let x = 0, x0 = -1; x <= W; x++) {
          const on = x < W && isTrunk((y * W + x) * 4);
          if (on && x0 < 0) x0 = x;
          if (on || x0 < 0) continue;
          const w = x - x0, t = Math.floor(w / 3);
          if (w >= 4 && w <= 48) { // (a single trunk's width; a longer run is several trunks side by side, where the left and right thirds are different trunks' lit sides)
            let L = 0, R = 0;
            for (let k = 0; k < t; k++) { L += luma((y * W + x0 + k) * 4); R += luma((y * W + x - 1 - k) * 4); }
            L /= t; R /= t;
            if (Math.max(L, R) > 25) ratios.push(Math.max(L, R) / Math.max(1, Math.min(L, R)));
          }
          x0 = -1;
        }
        ratios.sort((p, q) => p - q);
        return { share: n / (M.length / 4), readable: n ? readable / n : 0, across: ratios.length ? ratios[Math.floor(ratios.length / 2)] : 0, runs: ratios.length };
      }, [lit.toString("base64"), mask.toString("base64")]);
      check(r.share > 0.005, `trunks are drawn on the ground in the ${id} (${(r.share * 100).toFixed(1)}% of the screen, over 0.5%)`); // ("we have really lost our treetrunks" read 0; with the mask drawn plain, the densest spots read 1-4% in the tangly forest, 15-50% in the others)
      check(r.readable > 0.15, `the ${id}'s trunks are readable, not black on black (${(r.readable * 100).toFixed(0)}% of their pixels)`);
      check(r.runs >= 20 && r.across > TRUNK_ROUND, `the ${id}'s trunks are shaded round, not flat slabs: one side over the other ${r.across.toFixed(2)}x (over ${TRUNK_ROUND}x, over ${r.runs} single trunks' rows)`, "trunks-round");
    }
    await page.evaluate(() => clearInterval(window.trunkKeepAlive));
  }, "&leg=trunks"); // (not "": that fell back to &debug, whose overlay and rulers lay over the shots and hid trunks from the mask)

  // Inviting and leashing: 💌s at a creature until it joins her (issue #87), gather a few more, fly with the
  // stack, put a sigil down and pick it up again.
  await run("leash", { width: 1900, height: 1240 }, async page => {
    await page.keyboard.press("Enter");
    const id = await page.evaluate(() => {
      const g = window.witch.game, w = g.witch;
      let best = null, bd = Infinity;
      // The nearest of the youngest (areas start with no babies now: a young one then).
      const lv = Math.min(...g.creatures.filter(c => !c.boss && c.level < 3).map(c => c.level));
      for (const c of g.creatures) { if (c.boss || c.level !== lv) continue; const d = Math.hypot(c.x - w.x, c.z - w.z); if (d < bd) { bd = d; best = c; } }
      // (every area has an adult now, onto her in seconds: send the others round it away, so she can invite it)
      for (const c of g.creatures) if (c !== best && !c.boss && Math.hypot(c.x - best.x, c.z - best.z) < 150) c.gone = true;
      g.byArea = null;
      // 5 m west of it, facing it (with no cursor, 1 throws the way she faces).
      g.witch = { ...w, x: best.x - 5, z: best.z, vx: 0, vz: 0, facing: 1, seated: false, mode: "ground", lift: 0 };
      g.camera = { ...g.camera, tx: best.x - 5, tz: best.z };
      Object.assign(best, { rest: 99, tx: best.x, tz: best.z });
      g.witches[0].health.hp = 1e6; // (a young one may swipe at her while she invites it)
      return best.id;
    });
    await sleep(800);
    await shot(page, "69-leash-cue.png");
    const t0 = await page.evaluate(() => window.witch.game.clock.time);
    // The 💌 (issue #87): hold 1 and her letters fly at it until its meter fills.
    await page.keyboard.down("Digit1");
    await page.waitForFunction(t => window.witch.game.clock.time >= t, t0 + 0.5, { timeout: 400000, polling: 50 });
    await shot(page, "70-leash-talk.png");
    // (#87: a full meter makes a wild one happy, and it would wander off to dance: it's held in front of her. Since 2026-10-06
    // its sigil lies as a rune at its feet, and E beside it leashes it.)
    await page.waitForFunction(i => { const g = window.witch.game, c = g.creatures[i]; g.witch = { ...g.witch, facing: 1 }; Object.assign(c, { x: g.witch.x + 5, z: g.witch.z, tx: g.witch.x + 5, tz: g.witch.z, anchorX: g.witch.x + 5, anchorZ: g.witch.z, dancing: false }); return c.state === "happy" || c.leashed; }, id, { timeout: 400000, polling: 100 });
    await page.keyboard.up("Digit1");
    await page.evaluate(i => { const g = window.witch.game, c = g.creatures[i]; Object.assign(c, { x: g.witch.x + 0.8, z: g.witch.z, tx: g.witch.x + 0.8, tz: g.witch.z, anchorX: g.witch.x + 0.8, anchorZ: g.witch.z }); }, id);
    await page.keyboard.press("KeyE");
    await page.waitForFunction(i => window.witch.game.creatures[i].leashed, id, { timeout: 240000, polling: 100 }).catch(() => {});
    check(await page.evaluate(i => window.witch.game.leash.stack.includes(i), id), "her 💌s at a creature fill its meter, and E on its rune invites it onto her sigil stack");
    // One press a frame: wait for each invite to land before the next (the headless renderer is slow).
    for (let i = 0; i < 3; i++) {
      const before = await page.evaluate(() => window.witch.game.leash.stack.length);
      await page.keyboard.press("KeyI");
      await page.waitForFunction(b => window.witch.game.leash.stack.length > b, before, { timeout: 30000 }).catch(() => {});
    }
    const n = await page.evaluate(() => window.witch.game.leash.stack.length);
    check(n >= 3, `the debug key invites more (${n} on the stack)`);
    await hold(page, "ArrowRight", 2, 400000); // big window, software renderer: seconds a frame
    await shot(page, "71-leash-stack-flying.png");
    const t1 = await page.evaluate(() => window.witch.game.clock.time);
    await page.waitForFunction(t => window.witch.game.clock.time >= t, t1 + 4, { timeout: 400000, polling: 100 });
    await page.keyboard.press("KeyE");
    await page.waitForFunction(() => window.witch.game.leash.placed.length === 1, null, { timeout: 30000 });
    await hold(page, "ArrowUp", 0.6, 400000);
    const t2 = await page.evaluate(() => window.witch.game.clock.time);
    await page.waitForFunction(t => window.witch.game.clock.time >= t, t2 + 2, { timeout: 300000, polling: 100 });
    await shot(page, "72-leash-placed.png");
    check(await page.evaluate(() => window.witch.game.leash.placed.length === 1 && window.witch.game.leash.stack.length >= 2), "the sigil button puts the bottom sigil down");
    const placedId = await page.evaluate(() => { const g = window.witch.game, p = g.leash.placed[0]; g.witch = { ...g.witch, x: p.x, z: p.z, vx: 0, vz: 0 }; return p.id; });
    await sleep(200);
    await page.keyboard.press("KeyE");
    await page.waitForFunction(() => window.witch.game.leash.placed.length === 0, null, { timeout: 30000 });
    // (Back on her stack: she may have talked another creature in by herself meanwhile, Ed v244, so not by the count.)
    check(await page.evaluate(id => window.witch.game.leash.stack.includes(id), placedId), "over a placed sigil, the button picks it up again");
  }, "");

  // ?debug=cull: anything that changed visibility this frame is tinted red. A strip of frames
  // flying and zooming through every step in both modes.
  await run("cull", { width: 640, height: 360 }, async page => {
    await page.keyboard.press("Enter");
    await offHouse(page); // (on the forest floor first: east of her decks the oak's limbs run on to the Studio, where she can't rise)
    let k = 0;
    for (const mode of ["ground", "treetop"]) {
      if (mode === "treetop") { await page.keyboard.press("Space"); await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 240000 }); }
      for (const z of [ZOOM_OUT, ZOOM_OUT, ZOOM_IN, ZOOM_IN, ZOOM_IN]) {
        await page.keyboard.press(z);
        await page.keyboard.down("ArrowRight");
        await sleep(250);
        await shot(page, `cull-${String(k++).padStart(2, "0")}.png`);
        await page.keyboard.up("ArrowRight");
      }
    }
  }, "&debug=cull");

  // No stutter flying into new forest: full treetop boost straight across fresh ground, timing the
  // forest's chunk building each frame (view.stats.forestMs: the rebuilds' share plus the
  // prefetch ahead of her), and the frames themselves.
  await run("speed", { width: 1280, height: 800 }, async page => {
    await page.keyboard.press("Enter");
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 300000 });
    await page.evaluate(() => {
      window.speedLog = { forest: [], frame: [], last: 0 };
      const tick = now => { const L = window.speedLog; if (L.stop) return; L.forest.push(window.witch.view.stats.forestMs); if (L.last) L.frame.push(now - L.last); L.last = now; requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    // South, away from the house: north from her decks she flies in over it and lands on it (rules/witch.ts flyOnto, 2026-10-14),
    // 59 m on, and held there the 12 s took past the 900 s wait in the slowed house (2026-10-27). South she covers 882 m of fresh
    // forest in the treetops (seeds 123 and 7).
    const [s0, s1] = await hold(page, "ArrowDown", 12, 900000);
    const r = await page.evaluate(() => { const L = window.speedLog; L.stop = true; const q = (a, k) => { const b = [...a].sort((x, y) => x - y); return b.length ? b[Math.min(b.length - 1, Math.floor(k * (b.length - 1)))] : 0; }; return { n: L.forest.length, worst: q(L.forest, 1), p99: q(L.forest, 0.99), median: q(L.forest, 0.5), frameMedian: q(L.frame, 0.5), frameWorst: q(L.frame, 1), missing: window.witch.view.stats.forestMissing }; });
    const dist = Math.hypot(s1.x - s0.x, s1.z - s0.z), speed = dist / (s1.t - s0.t);
    results.push(`info speed: ${dist.toFixed(0)} m of fresh forest at ${speed.toFixed(1)} m/s; forest building per frame: median ${r.median.toFixed(1)} ms, p99 ${r.p99.toFixed(1)} ms, worst ${r.worst.toFixed(1)} ms over ${r.n} frames; frames here (software renderer): median ${r.frameMedian.toFixed(0)} ms, worst ${r.frameWorst.toFixed(0)} ms`);
    check(dist > 150, `flying into new forest at full boost covers fresh ground (${dist.toFixed(0)} m)`);
    check(r.p99 <= 16, `flying into new forest at full boost, building it costs at most 16 ms in 99% of frames (p99 ${r.p99.toFixed(1)} ms, worst ${r.worst.toFixed(1)} ms)`, "speed-build");
  });

  // The hills at their default (Ed, v289): from the steepest spot near home (its shot, to catch
  // streaks or cliffs again), fly north, directly away from the camera, over it, stepped at a
  // fixed 1/60 s in ground mode and then the treetops: the slope limit keeps the ground under the
  // camera's sightline to her, so its lift (the safety net) stays small; and she rides the hills
  // smoothly, her height's up-and-down acceleration well under the bare ground's.
  for (const [slopeSeed, file] of [[seed, "60-steep-slope.png"], [165272, "61-steep-slope-165272.png"]]) await run("slope", { width: 960, height: 600 }, async page => {
    await page.keyboard.press("Enter");
    const at = await page.evaluate(() => {
      const W = window.witch, g = W.game, h = W.groundHeight, d = g.map.dancefloor;
      let best = null, bs = 0;
      for (let k = 0; k < 4000; k++) {
        // (well inside the hills' window round her, which fades to flat at its edges)
        const x = d.x + ((k * 37.7) % 560) - 280, z = d.z + ((k * 91.3) % 560) - 280;
        if (Math.hypot(x - d.x, z - d.z) < 120 || g.map.paths.at(x, z, 2)) continue;
        const s = Math.abs(h(x, z - 12) - h(x, z + 12)) / 24;
        if (s > bs) { bs = s; best = [x, z]; }
      }
      g.witch = { ...g.witch, x: best[0], z: best[1], vx: 0, vz: 0, seated: false }; g.camera = { ...g.camera, tx: best[0], tz: best[1], intro: 0 };
      // Her area friendly, as a legend's quest done makes it (rules/sigilButton.ts befriendArea): its wild watch would attack
      // her while the art bakes (minutes here), knock her out and send her back to her decks, and the ground flight would then
      // measure the deck's flat floor (India's run on #928: "0.0 vs 0.0" on the ground, the check failing on 0 < 0).
      const cell = g.map.areaAt(best[0], best[1]).cell;
      g.friendly.add(`${cell[0]},${cell[1]}`);
      for (const c of g.creatures) if (!c.gone && !c.leashed && !c.boss && !c.partyLegend && c.cell[0] === cell[0] && c.cell[1] === cell[1]) { c.friendly = true; c.enraged = false; c.fight = undefined; c.siege = undefined; }
      g.byArea = null;
      return { x: best[0], z: best[1], slope: bs };
    });
    await sleep(1500);
    await settleArt(page, { forest: true, soft: true });
    await sleep(1500);
    await shot(page, file);
    const still = await page.evaluate(() => { const g = window.witch.game, w = g.witch; return { x: w.x, z: w.z, perch: !!w.perch, seated: !!w.seated, kds: g.knockdowns?.length ?? 0 }; });
    check(!still.perch && !still.seated && Math.hypot(still.x - at.x, still.z - at.z) < 5, `seed ${slopeSeed}: she's still at the steep spot as the flight starts, not knocked back to her decks (${still.kds} knockdowns, ${Math.hypot(still.x - at.x, still.z - at.z).toFixed(0)} m off)`);
    const r = await page.evaluate(async () => {
      const w = window.witch, v = w.view, dt = 1 / 60, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }), yieldNow = () => new Promise(res => setTimeout(res, 0));
      w.manual = true;
      const fly = async (n, extra) => {
        const ride = [], ground = [];
        let lift = 0;
        for (let i = 0; i < n; i++) {
          w.frame(C({ moveZ: -1, ...extra }), dt, false);
          if (i >= 60) { ride.push(v.ride.h); ground.push(w.groundHeight(w.game.witch.x, w.game.witch.z)); lift = Math.max(lift, v.camLift); }
          if (i % 30 === 0) await yieldNow();
        }
        const acc = a => { let s = 0; for (let i = 1; i < a.length - 1; i++) s += ((a[i + 1] - 2 * a[i] + a[i - 1]) / (dt * dt)) ** 2; return Math.sqrt(s / Math.max(1, a.length - 2)); };
        return { lift, ride: acc(ride), ground: acc(ground) };
      };
      const ground = await fly(360, {});
      w.frame(C({ toggleMode: true }), dt, false);
      for (let i = 0; i < 240 && w.game.witch.mode !== "treetop"; i++) w.frame(C({}), dt, false);
      const treetop = await fly(360, { spell: true }); // (at full boost, the speed spell cast when ready)
      w.manual = false;
      return { ground, treetop };
    });
    results.push(`info slope (seed ${slopeSeed}): the steepest spot near home ${(at.slope * 100).toFixed(0)}% (${at.x.toFixed(0)}, ${at.z.toFixed(0)}); flying north from it, camera lift at most ${r.ground.lift.toFixed(1)} m on the ground and ${r.treetop.lift.toFixed(1)} m over the treetops; her height's rms acceleration ${r.ground.ride.toFixed(2)} against the ground's ${r.ground.ground.toFixed(2)} m/s² (ground), ${r.treetop.ride.toFixed(2)} against ${r.treetop.ground.toFixed(2)} (treetops)`);
    check(at.slope < Math.tan(30 * Math.PI / 180), `seed ${slopeSeed}: the steepest slope near home is under the camera's shallowest pitch (${(at.slope * 100).toFixed(0)}%, 30° is 58%)`);
    check(Math.max(r.ground.lift, r.treetop.lift) < 3, `seed ${slopeSeed}: flying directly away from the camera over the steepest hill, no rise hides her: the camera's safety-net lift stays under 3 m (${r.ground.lift.toFixed(1)} m, ${r.treetop.lift.toFixed(1)} m)`);
    const smooth = a => a.ride < a.ground * 0.8 || (a.ride < 0.1 && a.ground < 0.1); // (ground this flat has nothing to smooth)
    check(smooth(r.ground) && smooth(r.treetop), `seed ${slopeSeed}: she rides the hills smoothly: her height bobs less than the ground under her, or both under 0.1 (rms acceleration ${r.ground.ride.toFixed(2)} vs ${r.ground.ground.toFixed(2)}, ${r.treetop.ride.toFixed(2)} vs ${r.treetop.ground.toFixed(2)} m/s²)`);
  }, slopeSeed === seed ? "&debug" : `&seed=${slopeSeed}&debug`); // (Ed, v297: seed 165272 had cliffs and broken trees)

  // Boosting over the treetops (Ed, v256: "framerate drops a bit during boost mode in treetop
  // view"): the game is stepped frame by frame at a fixed 1/60 s (window.witch.frame), so the
  // flight covers what a 60 fps player's does however slow the software renderer is, and each
  // frame's own work (rules and view, not the software renderer's drawing) is timed: hovering,
  // then 10 s north at full boost with the speed spell cast whenever it's ready. The limits are
  // for a builder's cloud machine (v256 there: p99 35 ms, worst 49 ms; Ed's is several times faster).
  // A siege (Stage 4), headless and frame by frame: a wave wakes the next area (its creatures grown
  // to young, as the areas round home hold only babies), they march on its new soundsystem and bring
  // it down (its health cut short for the test); its party ends and they march on to the dancefloor's speakers;
  // when they fall too, the run is over and the end screen shows.
  await run("siege", { width: 1280, height: 800 }, async page => {
    await page.keyboard.press("Enter");
    const r = await page.evaluate(async () => {
      const w = window.witch, g = w.game, dt = 1 / 60, idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, yieldNow = () => new Promise(res => setTimeout(res, 0));
      const isHomeKey = k => k === "home" || k.startsWith("home:"); // (rules/speakers.ts isHomeKey: home's speakers are home:<i>)
      w.manual = true;
      g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
      g.party.paused = true; // (no wave but the one brought on below: with waves a minute apart, Ed 2026-10-08, the next one stood a soundsystem nearer than home mid-siege, and the besiegers rightly marched on to it)
      const next = g.party.next[0];
      g.creatures.filter(c => c.cell[0] === next[0] && c.cell[1] === next[1]).forEach(c => { c.level = 1; });
      w.frame({ ...idle, nextWave: true }, dt, false);
      const key = `${next[0]},${next[1]}`, sound = g.combat.sounds.get(key);
      if (!sound) return { error: "no siege began" };
      sound.hp = sound.max = 150;
      const besiegers = g.creatures.filter(c => c.siege === key);
      for (const c of besiegers) { c.x = sound.x + (c.rand() - 0.5) * 8; c.z = sound.z + 5 + c.rand() * 3; }
      let hit = false;
      for (let i = 0; i < 120 * 60 && sound.hp > 0; i++) { w.frame(idle, dt, false); hit ||= sound.hp < sound.max; if (i % 120 === 0) await yieldNow(); }
      const fell = sound.hp === 0, ended = !g.party.areas.has(key), marched = besiegers.filter(c => !c.gone && !c.boss).every(c => isHomeKey(c.siege ?? "")); // (the area's legend stays to guard its own area, by design; home is its ring of speakers since #543)
      for (const [k, h] of g.combat.sounds) if (isHomeKey(k)) h.hp = 0.001; // (every one of home's speakers nearly down)
      for (const c of besiegers) if (!c.gone) { c.x = g.map.dancefloor.x + 6; c.z = g.map.dancefloor.z + 6; }
      for (let i = 0; i < 60 * 60 && !g.partyOver; i++) { w.frame(idle, dt, false); if (i % 120 === 0) await yieldNow(); }
      // The afterparty (rules/partyOver.ts): 10 s on, nothing fights or besieges, and everyone's asleep or walking home to bed.
      for (let i = 0; i < 10 * 60 && g.partyOver; i++) { w.frame(idle, dt, false); if (i % 120 === 0) await yieldNow(); }
      const live = g.creatures.filter(c => !c.gone), fighting = live.filter(c => c.fight?.target || c.siege).length, awake = live.filter(c => !c.asleep && !c.bed).length;
      w.manual = false;
      return { besiegers: besiegers.length, hit, fell, ended, marched, over: !!g.partyOver, fighting, awake, asleep: live.filter(c => c.asleep).length };
    });
    if (r.error) { check(false, `a siege: ${r.error}`); return; }
    // (no card since Ed's 2026-10-26 "Remove the end cards": the guidance pin's 💤 leads her to bed, rules/guidance.ts)
    await page.waitForFunction(() => window.witch.guide.pin().key.startsWith("bed:"), null, { timeout: 120000 }).catch(() => {});
    const screen = await page.evaluate(() => window.witch.guide.pin().key.startsWith("bed:") && !document.getElementById("over"));
    await shot(page, "80-siege-over.png");
    check(r.besiegers > 0 && r.hit && r.fell && r.ended && r.marched, `a woken area's creatures besiege its soundsystem, bring it down, end its party and march on to the dancefloor (${JSON.stringify(r)})`);
    check(r.over && screen, `when home's speakers have fallen the party's over and the 💤 pin leads her to bed, no card (${r.over}, ${screen})`);
    check(r.fighting === 0 && r.awake === 0 && r.asleep > 0, `the afterparty: nothing fights, everyone's asleep or walking home to bed (${JSON.stringify({ fighting: r.fighting, awake: r.awake, asleep: r.asleep })})`);
  }, "&debug&island=4"); // First-area siege and its return to home need four areas, not the full island.

  await run("boost", { width: 1900, height: 1240 }, async page => {
    await page.keyboard.press("Enter");
    const r = await page.evaluate(async () => {
      const w = window.witch, dt = 1 / 60, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }), yieldNow = () => new Promise(res => setTimeout(res, 0));
      w.manual = true;
      w.frame(C({ moveZ: -1 }), dt, false);
      w.frame(C({ toggleMode: true }), dt, false);
      for (let i = 0; i < 240 && w.game.witch.mode !== "treetop"; i++) w.frame(C({}), dt, false);
      const cpu = f => f.step + f.render, hover = [], boost = [], x0 = w.game.witch.x, z0 = w.game.witch.z;
      for (let i = 0; i < 180; i++) { const f = w.frame(C({}), dt, false); if (i >= 60) hover.push(cpu(f)); if (i % 30 === 0) await yieldNow(); }
      // South, away from the house: flown in over it from outside she lands on it (rules/witch.ts flyOnto, 2026-10-14), and north
      // from her decks crosses it, so the boost was cut short at 131 m/s 0.45 s in and the rest measured in the slowed house
      // (2026-10-27). South of home is open forest: 926 m at up to 197 m/s, still in the treetops, on seeds 123, 7 and 2024.
      let top = 0, off = -1;
      for (let i = 0; i < 600; i++) { const f = w.frame(C({ moveZ: 1, spell: true }), dt, false); boost.push(cpu(f)); top = Math.max(top, Math.hypot(w.game.witch.vx, w.game.witch.vz)); if (off < 0 && w.game.witch.mode !== "treetop") off = i / 60; if (i % 30 === 0) await yieldNow(); }
      w.manual = false;
      const q = (a, k) => { const b = [...a].sort((x, y) => x - y); return b[Math.min(b.length - 1, Math.floor(k * (b.length - 1)))]; };
      return { hover: q(hover, 0.5), median: q(boost, 0.5), p99: q(boost, 0.99), worst: q(boost, 1), top, off, dist: Math.hypot(w.game.witch.x - x0, w.game.witch.z - z0) };
    });
    results.push(`info boost: ${r.dist.toFixed(0)} m south in 10 s at up to ${r.top.toFixed(0)} m/s; frame work hovering ${r.hover.toFixed(1)} ms (median), boosting median ${r.median.toFixed(1)} ms, p99 ${r.p99.toFixed(1)} ms, worst ${r.worst.toFixed(1)} ms`);
    // (full boost with the Speed broom's spell: treetopSpeed × boost × the spell's mult, 48 × 1.7 × 2.2 = 180 m/s as built; the plain broom,
    // the default since #695, tops out at 82, which is what this measured till the scene asked for ?broom=speed, 2026-10-14)
    const T = await page.evaluate(() => window.witch.game.tuning), full = T.treetopSpeed * (T.treetop?.boost ?? 1) * (T.spells?.speed?.mult ?? 1);
    check(r.off < 0, `boosting over the treetops, she stays in the treetops the whole 10 s (${r.off < 0 ? "she does" : `she left them ${r.off.toFixed(2)} s in`})`);
    check(r.top > Math.max(100, full * 0.9), `boosting over the treetops with the Speed broom goes over 100 m/s and near its full ${full.toFixed(0)} (${r.top.toFixed(0)} m/s)`);
    check(r.p99 <= 22, `boosting over the treetops, 99% of frames' own work is within 22 ms (p99 ${r.p99.toFixed(1)} ms)`, "boost-p99");
    check(r.worst <= 40, `boosting over the treetops, no frame's own work takes over 40 ms (worst ${r.worst.toFixed(1)} ms)`, "boost-worst");
  }, "&debug&parts=missile,fairing,nozzles");

  // Neutral pairs (Ed, 2026-10-14, after the circle bug: "neutral settings are no-ops"): two settings that must draw the same
  // picture, compared pixel for pixel by the pause page's Report (src/ui/visualReport.ts NEUTRAL_PAIRS): the see-through at full
  // opacity against none, the mist at strength 0 against none. The circle bug was the first differing in a disc round her. Where
  // it showed: an Old oaks wood, on the ground among tall trees in front of her. The spot is found by the rules each run, so it
  // can't go stale as the maps change (a fixed 2327,2569 went treeless with the islands, 2026-10-23): over the wild areas round
  // home, every 8 m, clear ground (no trunk within 2.5 m) with 4 or more trees just south of her (between her and the camera), in
  // the lightest wood round her (fewest trees within 40 m: the software renderer here drew 2 to 3 frames a second with under 120,
  // none in 30 s with 350, which timed the section out), ties to the most in front.
  await run("neutral", { width: 1000, height: 663 }, async page => {
    const spot = await page.evaluate(() => {
      const g = window.witch.game, m = g.map, c = m.dancefloor, home = m.areaAt(c.x, c.z).cell;
      let best = null;
      for (let dz = -700; dz <= 700; dz += 8) for (let dx = -700; dx <= 700; dx += 8) {
        const x = c.x + dx, z = c.z + dz, a = m.areaAt(x, z);
        if (!m.playable(a.cell[0], a.cell[1]) || (a.cell[0] === home[0] && a.cell[1] === home[1])) continue;
        const trees = g.forest.treesNear(x, z + 8, 9);
        if (trees.some(t => Math.hypot(t.x - x, t.z - z) < 2.5)) continue;
        const front = trees.filter(t => t.z > z + 2 && t.z < z + 14 && Math.abs(t.x - x) < 7).length;
        if (front < 4) continue;
        const wood = g.forest.treesNear(x, z, 40).length;
        if (!best || wood < best.wood || (wood === best.wood && front > best.front)) best = { x, z, front, wood };
      }
      return best;
    });
    if (!spot) throw new Error("neutral: no spot round home with trees in front of her");
    // (placed as tools/smoke's circle shots were: on the ground; a step north to settle the camera, then back on the spot)
    const place = () => page.evaluate(s => { const g = window.witch.game; g.witch = { ...g.witch, x: s.x, z: s.z, mode: "ground", lift: 0, seated: false, perch: false, vx: 0, vz: 0 }; g.introFocus = undefined; }, spot);
    await place();
    // (the art and the forest round the spot all in first: once the game runs the forest's count keeps moving)
    await settleArt(page, { forest: true, trees: true, timeout: 600000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 120000, polling: 250 }); // (started: she's drawn)
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 300000, polling: 250 });
    await place(); await page.keyboard.down("ArrowUp"); await sleep(300); await page.keyboard.up("ArrowUp"); await sleep(1000); await place();
    await page.waitForFunction(t => window.witch.game.clock.time > t, (await page.evaluate(() => window.witch.game.clock.time)) + 4, { timeout: 300000, polling: 250 }); // (settled: four seconds of play there)
    await sleep(10000);
    await page.keyboard.press("Escape"); await sleep(3000); // (paused, as the Report is: a running game's frames differ by themselves)
    const r = await page.evaluate(() => window.__neutralCheck());
    const at = await page.evaluate(() => { const g = window.witch.game; return `${g.witch.x | 0},${g.witch.z | 0} ${g.witch.mode}${g.witch.seated ? " seated" : ""}, zoom step ${g.camera.zoomStep}`; });
    await shot(page, "neutral.png");
    await page.keyboard.press("Escape");
    check(r.seeThroughInUse > 200, `the neutral pairs' spot has things in front of her for the see-through to fade (${r.seeThroughInUse} px it changes; her at ${at}, ${spot.front} trees in front, ${spot.wood} within 40 m)`);
    // (a pair may differ in faint specks up to half a percent of the frame, on top of what the paused frame changes by itself: the circle
    // bug differed in a disc of over a thousand pixels at the old reach; at its present reach (#911) a few dozen faint pixels in low bushes remain)
    const allow = r.still * 2 + Math.round(r.pixels * 0.005);
    for (const p of r.pairs) check(p.changed <= allow, `neutral pair draws the same: ${p.name} (${p.changed} px differ, max ${p.maxDiff}; allowed ${allow}; the paused frame alone changes ${r.still} px)`);
  }, "&seed=886806&mode=ground&spell=auto&wave=off");

  // Nothing floats (Ed, v108: rocks in the cave mouth hovered over their shadows): every placed
  // sprite's (trees, plants, walls, set pieces, decor, the treehouse) lowest drawn pixel, read from the atlas itself, sits on the ground. Close-up in a
  // cave mouth, in ground mode, zoomed in.
  await run("ground", { width: 1280, height: 800 }, async page => {
    await page.keyboard.press("Enter");
    const cave = await page.evaluate(() => {
      const g = window.witch.game, m = g.map, d = m.dancefloor;
      let best = null;
      for (const [x, y] of m.cells) {
        if (window.witch.areaTypeId(m.typeOf(x, y)) !== "jungle-cave") continue;
        const s = m.siteOf(x, y), k = Math.hypot(s.x - d.x, s.z - d.z);
        if (!best || k < best.k) best = { x, y, k, s };
      }
      if (!best) return null;
      // Into the woods a little way from its centre, where its plants grow.
      const px = best.s.x + 18, pz = best.s.z + 22;
      // Off the treehouse's seat (else the opening shot keeps the camera close in on her).
      g.witch = { ...g.witch, x: px, z: pz, vx: 0, vz: 0, seated: false }; g.camera = { ...g.camera, tx: px, tz: pz };
      // Its bats friendly (as the slope scene calms its area): the wild watch attacks her while the forest builds round her
      // here (a minute or two of real time is only seconds of game time), and knocked out she'd be back at her decks.
      g.friendly.add(`${best.x},${best.y}`);
      for (const c of g.creatures) if (!c.gone && !c.leashed && !c.boss && !c.partyLegend && c.cell[0] === best.x && c.cell[1] === best.y) { c.friendly = true; c.enraged = false; c.fight = undefined; c.siege = undefined; }
      g.byArea = null;
      document.getElementById("debug").classList.remove("on");
      return `${best.x},${best.y}`;
    });
    check(!!cave, `there is a cave mouth to look at (${cave})`);
    await page.keyboard.press(ZOOM_IN); await page.keyboard.press("KeyH");
    await sleep(2000);
    // The forest round her (built a few chunks a frame since the speed work) and its ground all in; then a while for the
    // art, not for all of it: the art baked ahead of need (the island's species, their looks and rigs) drains a job a
    // minute under the software renderer here, 10 to 20 minutes after a move to a new area, and what the checks below
    // read is the scenery placed, which the forest's count says is in (probed on the moth's island, 2026-10-15).
    await page.waitForFunction(() => window.witch.view.stats.forestMissing === 0 && window.witch.view.stats.trees > 0 && window.witch.view.stats.pendingGround === 0, null, { timeout: 900000, polling: 500 }); // (about 3 minutes here)
    await settleArt(page, { timeout: 300000, soft: true });
    await sleep(1500);
    await shot(page, "ground-cave-mouth.png");
    const r = await page.evaluate(() => {
      const v = window.witch.view, out = { n: 0, worst: 0, bad: [] };
      const rgba = (t, p, on) => { const d = t.image.data; if (!on || !d) return d; const P = p.image.data, o = new Uint8Array(d.length * 4); for (let i = 0; i < d.length; i++) { const k = d[i] * 4; o[i * 4] = P[k]; o[i * 4 + 1] = P[k + 1]; o[i * 4 + 2] = P[k + 2]; o[i * 4 + 3] = P[k + 3]; } return o; }; // (an indexed plane as RGBA: render/palette.ts)
      for (const [type, b] of [...v.typeBatches, ...[...v.decorBatches].filter(([k]) => k !== "decals" && k !== "sceneDecals"), ["treehouse", v.treehouseBatch]]) { // decals lie flat
        const img = b.atlas.albedo.image, W = img.width, H = img.height, D = rgba(b.atlas.albedo, b.atlas.albedoPal, b.atlas.indexed.x > 0.5);
        for (const it of b.items) {
          if (it.top || it.overlay) continue; // (crowns, and the treehouse's DJ table drawn over it, stand on their trunk)
          if (type === "treehouse" && it.scale !== undefined) continue; // (the Ent's halves, moved along the camera's rays to land on their own pixels: render/view/home.ts alongRay; their y isn't a ground height)
          const f = it.frame, x0 = Math.round(f.uv[0] * W), y0 = Math.round(f.uv[1] * H);
          let low = -1;
          for (let row = f.h - 1; row >= 0 && low < 0; row--) for (let x = 0; x < f.w; x++) if (D[((y0 + row) * W + x0 + x) * 4 + 3] >= 128) { low = row; break; }
          if (low < 0) continue;
          // The lowest drawn pixel's height: the base's, plus its height up the sprite.
          const m = b.metresPerPixel * (it.scale ?? 1), upY = window.witch.spriteUp().y;
          const lift = (it.y + upY * (f.h - 1 - low) * m) / m; // in art pixels
          out.n++;
          if (Math.abs(lift) > Math.abs(out.worst)) out.worst = lift;
          if (Math.abs(lift) > 2 && out.bad.length < 6) out.bad.push(`${typeof type === "number" ? window.witch.areaTypeId(type) : type} ${lift.toFixed(1)} px`);
        }
      }
      return out;
    });
    check(r.n > 50 && r.bad.length === 0, `nothing floats: every placed sprite's lowest drawn pixel is on the ground (${r.n} checked, worst ${r.worst.toFixed(1)} art px)${r.bad.length ? ": " + r.bad.join("; ") : ""}`);
    // The rolling ground: a sprite stands upright at the lowest ground under its foot (most of its width, up to 5 m either
    // side of its base, or as far as its drawn foot reaches: Frame.foot, a kapok's buttresses), so its uphill side is planted
    // in the slope; where the ground at an end of its drawn foot is lower than that, the end floats. None may float past 1 art px.
    const hr = await page.evaluate(() => {
      const v = window.witch.view, h = window.witch.groundHeight, R = window.witch.spriteRight(), out = { n: 0, worst: 0, bad: [], hilly: 0 };
      const rgba = (t, p, on) => { const d = t.image.data; if (!on || !d) return d; const P = p.image.data, o = new Uint8Array(d.length * 4); for (let i = 0; i < d.length; i++) { const k = d[i] * 4; o[i * 4] = P[k]; o[i * 4 + 1] = P[k + 1]; o[i * 4 + 2] = P[k + 2]; o[i * 4 + 3] = P[k + 3]; } return o; }; // (an indexed plane as RGBA: render/palette.ts)
      for (const [type, b] of [...v.typeBatches, ...v.creatureBatches, ...[...v.decorBatches].filter(([k]) => k !== "decals"), ["treehouse", v.treehouseBatch]]) { // (she hovers)
        const img = b.atlas.albedo.image, W = img.width, D = rgba(b.atlas.albedo, b.atlas.albedoPal, b.atlas.indexed.x > 0.5);
        for (const it of b.items) {
          if (it.top || it.overlay) continue; // (crowns, and the treehouse's DJ table drawn over it, stand on their trunk)
          if (type === "treehouse" && it.scale !== undefined) continue; // (the Ent's halves along the rays, as above)
          const f = it.frame, x0 = Math.round(f.uv[0] * W), y0 = Math.round(f.uv[1] * img.height);
          let low = -1, left = 0, right = 0;
          for (let row = f.h - 1; row >= 0 && low < 0; row--) for (let x = 0; x < f.w; x++) if (D[((y0 + row) * W + x0 + x) * 4 + 3] >= 128) { if (low < 0) { low = row; left = x; } right = x; }
          if (low < 0) continue;
          const m = b.metresPerPixel * (it.scale ?? 1), c = ((left + right) / 2 - f.w / 2) * m * (it.flip ? -1 : 1), half = ((right - left) / 2 + 0.5) * m;
          const cx = it.x + R.x * c, cz = it.z + R.z * c, fw = Math.max(Math.min(f.w * m * 0.45, 5), (f.foot ?? 0) * m); // (as render/sprites.ts stands it)
          const base = Math.min(...[-1, -0.5, 0, 0.5, 1].map(k => h(it.x + R.x * fw * k, it.z + R.z * fw * k)));
          const err = Math.max(0, ...[-half, half].map(s => base - h(cx + R.x * s, cz + R.z * s))) / b.metresPerPixel;
          out.n++; if (Math.abs(base) > 0.3) out.hilly++;
          if (err > out.worst) out.worst = err;
          // (feet snap to whole art pixels, so one exactly a pixel off reads a hair over 1 from the height's rounding: 0.05 px of slack)
          if (err > 1.05 && out.bad.length < 6) out.bad.push(`${typeof type === "number" ? window.witch.areaTypeId(type) : type} ${err.toFixed(2)} px`);
        }
      }
      return out;
    });
    check(hr.n > 50 && hr.bad.length === 0, `on the rolling ground nothing floats or sinks past 1 art px at its foot's ends (${hr.n} checked, ${hr.hilly} off the flat, worst ${hr.worst.toFixed(2)} px)${hr.bad.length ? ": " + hr.bad.join("; ") : ""}`);
  }, "&debug&island=bat"); // (the bat's island, its kind's cave mouths plentiful: the home island's roster is the ten home kinds, so no seed puts a cave mouth on
  // it, and the old radius map's art never settles here. It was the moth's until the kinds were sorted into Ed's compass biomes (#1024,
  // 2026-10-23): the moth's island is a heath-and-woods one now, no bat on its roster, and no island but the bat's own and those of
  // 30 areas or more carries a cave mouth)

  // Ed's windows (v53-v57: trees vanished flying the treetops): big, both pixel ratios, long
  // straight flights at full speed in both modes. Nothing set may go undrawn (view.stats.dropped:
  // a batch three.js capped), and nothing may appear or vanish anywhere on screen.
  // Only on a real GPU (#1090): on the software renderer a frame at these sizes takes tens of seconds, so they're reported known.
  const soft = (w, h) => check(false, `${w}x${h}: the vanish flights need a real GPU (SMOKE_GPU=1); not flown on the software renderer`, "vanish");
  for (const [w, h, dpr] of [[1900, 1240, 1], [2000, 1076, 2]]) {
    if (!GPU) { if (!process.env.ONLY || process.env.ONLY.split(",").includes(`vanish-${w}x${h}`)) soft(w, h); continue; }
    await run(`vanish-${w}x${h}`, { width: w, height: h, dpr }, async page => {
      const gl = await page.evaluate(() => { const c = document.createElement("canvas").getContext("webgl2"), e = c && c.getExtension("WEBGL_debug_renderer_info"); return c ? String(c.getParameter(e ? e.UNMASKED_RENDERER_WEBGL : c.RENDERER)) : ""; });
      if (/swiftshader|llvmpipe|software/i.test(gl)) { soft(w, h); return; }
      await page.keyboard.press("Enter");
      await page.evaluate(() => { const v = window.witch.view; v.pops = []; v.trackPops = true; window.maxDropped = 0; setInterval(() => { window.maxDropped = Math.max(window.maxDropped, v.stats.dropped); }, 50); });
      await offHouse(page, 600000);
      await hold(page, "ArrowRight", 4, 600000);
      await shot(page, `vanish-${w}x${h}-ground.png`);
      await page.keyboard.press("Space");
      await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 300000 });
      await hold(page, "ArrowRight", 5, 600000);
      await hold(page, "ArrowUp", 4, 600000);
      await shot(page, `vanish-${w}x${h}-treetop.png`);
      await page.keyboard.press(ZOOM_OUT); await page.keyboard.press(ZOOM_OUT);
      await hold(page, "ArrowLeft", 4, 600000);
      await shot(page, `vanish-${w}x${h}-treetop-out.png`);
      const r = await page.evaluate(() => ({ dropped: window.maxDropped, pops: window.witch.view.pops.slice(0, 12), n: window.witch.view.pops.length, trees: window.witch.view.stats.trees, radius: window.witch.view.stats.sceneryRadius, fps: window.witch.view.stats.fps }));
      check(r.dropped === 0, `${w}x${h} at DPR ${dpr}: every tree, bush and creature set is drawn (most dropped in a frame: ${r.dropped}; ${r.trees} trees now; scenery radius ${(r.radius ?? 0).toFixed(0)} m at ${(r.fps ?? 0).toFixed(1)} fps)`);
      check(r.n === 0, `${w}x${h} at DPR ${dpr}: nothing appears or vanishes on screen in full-speed flight (${r.n})${r.n ? ": " + r.pops.join("; ") : ""}`, `vanish-${w}x${h}`);
    }, "&debug=cull");
  }

  if (process.env.RECORD) {
    const ctx = await browser.newContext({ viewport: { width: 960, height: 540 }, recordVideo: { dir: out, size: { width: 960, height: 540 } } });
    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${port}/?creator=0&pixels=keep&seed=${seed}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 120000 });
    await page.keyboard.press("Enter");
    await page.keyboard.down("ArrowRight"); await sleep(2500); await page.keyboard.up("ArrowRight");
    await page.keyboard.press("Space"); await sleep(800);
    await page.keyboard.down("ArrowUp"); await sleep(3500); await page.keyboard.up("ArrowUp");
    const video = page.video();
    await ctx.close();
    if (video) { fs.renameSync(await video.path(), path.join(out, "flight.webm")); results.push("video previews/flight.webm"); }
  }

  await browser.close();
  server.close();
  console.log(results.join("\n"));
  if (known.length) console.log(`\nknown: ${known.length} (failing for a known reason, not counted: tools/smoke/smoke.cjs KNOWN)\n` + known.map(k => "- " + k).join("\n"));
  if (fixed.length) console.log(`\nknown checks now passing (take them off KNOWN if they keep passing): ${fixed.join(", ")}`);
  if (errors.length) { console.error("\nFAILED:\n" + errors.join("\n")); process.exit(1); }
  console.log("\nsmoke test passed");
}

main().catch(e => { console.error(e); process.exit(1); });
