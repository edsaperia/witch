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

// Zoom keys (rise and descend are Space; E is the sigil button).
const ZOOM_IN = "KeyZ", ZOOM_OUT = "KeyX";

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
    if (process.env.ONLY && !process.env.ONLY.split(",").includes(name)) return; // ONLY=party,cull runs just those
    const { hasTouch, dpr, ...size } = viewport;
    const page = await browser.newPage({ viewport: size, deviceScaleFactor: dpr || 1, hasTouch: !!hasTouch, isMobile: !!hasTouch });
    page.on("pageerror", e => errors.push(`${name}: page error: ${e.message}`));
    page.on("console", m => { if (m.type() === "error") errors.push(`${name}: console error: ${m.text()}`); });
    await page.goto(`http://127.0.0.1:${port}/?seed=${seed}${query || "&debug"}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 120000 });
    // All the art is drawn in the background after start; the software renderer here starves the
    // workers of CPU (minutes at big window sizes), so wait for it before flying, so the shots show the forest as players do.
    await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 2400000, polling: 1000 });
    await steps(page);
    await page.close();
  }
  const state = page => page.evaluate(() => { const g = window.witch.game; return { t: g.clock.time, x: g.witch.x, z: g.witch.z, mode: g.witch.mode, paused: g.clock.paused, area: window.witch.areaUnderWitch(), stats: window.witch.view.stats }; });
  // Hold a key for `secs` of game time (a slow headless renderer runs fewer, capped frames).
  const hold = async (page, key, secs, timeout = 60000) => {
    const from = await state(page);
    await page.keyboard.down(key);
    await page.waitForFunction(t => window.witch.game.clock.time - t >= 0, from.t + secs, { timeout, polling: 50 });
    const to = await state(page);
    await page.keyboard.up(key);
    return [from, to];
  };
  const shot = async (page, file) => { await sleep(400); await page.screenshot({ path: path.join(out, file), timeout: 300000 }); /* big windows: seconds a frame in the software renderer */ results.push(`shot previews/${file}`); };

  await run("laptop", { width: 1280, height: 720 }, async page => {
    await shot(page, "00-start-screen.png");
    await page.keyboard.press("Enter");
    await sleep(300);
    let s = await state(page);
    check(!s.paused, "a key press starts the game");
    check(s.stats.trees > 20 && s.stats.batches > 3 && s.stats.drawCalls > 15, `trees drawn round the start (${s.stats.trees} trees, ${s.stats.batches} batches, ${s.stats.drawCalls} draw calls)`);
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
    // The rise takes riseTime of game time: wait for it to finish, however slow the frames here.
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 400000, polling: 50 }).catch(() => {});
    s = await state(page);
    check(s.mode === "treetop", `space rises to treetop mode (${s.mode})`);
    await shot(page, "03-treetop.png");
    [s0, s] = await hold(page, "KeyW", 2);
    const topSpeed = (s0.z - s.z) / (s.t - s0.t);
    check(topSpeed > groundSpeed * 1.5 && topSpeed <= tuning.treetopSpeed * 1.01, `flies north faster in treetop mode (${topSpeed.toFixed(1)} m/s)`);
    await shot(page, "04-treetop-flying.png");
    // Fly a fixed path through every zoom level in both modes; nothing of any kind may appear or
    // vanish in clear view on the way (trees, undergrowth, walls, set pieces, creatures, props).
    await page.evaluate(() => { window.witch.view.pops = []; });
    const steps = await page.evaluate(() => window.witch.game.tuning.camera.zoomSteps);
    const keys = ["KeyA", "KeyS", "KeyD", "KeyW"];
    const path = async () => {
      for (const mode of ["treetop", "ground"]) {
        for (let i = 0; i < steps; i++) await page.keyboard.press(ZOOM_IN); // all the way in
        for (let z = 0; z < steps; z++) {
          await hold(page, keys[z % 4], 0.8);
          await page.keyboard.press(ZOOM_OUT); // a step out, while flying on
          await hold(page, keys[(z + 1) % 4], 0.6);
        }
        for (let i = 0; i < steps; i++) { await page.keyboard.press(ZOOM_IN); await hold(page, keys[i % 4], 0.3); }
        await page.keyboard.press("Space"); // change mode mid-path
        await hold(page, "KeyW", 1.2);
      }
    };
    await path();
    // Again in a Heath (gorse: small bright details), where Ed saw bushes blink.
    const heath = await page.evaluate(() => {
      const g = window.witch.game, m = g.map;
      for (let y = 0; y < m.n; y++) for (let x = 0; x < m.n; x++) {
        if (window.witch.areaTypeId(m.typeOf(x, y)) !== "heath") continue;
        const s = m.siteOf(x, y), px = s.x + 20, pz = s.z + 20;
        g.witch = { ...g.witch, x: px, z: pz, vx: 0, vz: 0 }; g.camera = { ...g.camera, tx: px, tz: pz };
        return `${x},${y}`;
      }
      return null;
    });
    if (heath) {
      await sleep(1500);
      await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 900000, polling: 500 });
      await page.evaluate(() => { window.witch.view.pops = []; });
      await path();
      await shot(page, "08-heath.png");
    }
    check(!!heath, `the pop check also flies a Heath (${heath})`);
    const pops = await page.evaluate(() => window.witch.view.pops.slice(0, 12));
    const popCount = await page.evaluate(() => window.witch.view.pops.length);
    check(popCount === 0, `nothing pops in or out in clear view, flying through every zoom level in both modes (${popCount})${popCount ? ": " + pops.join("; ") : ""}`);
    await page.waitForFunction(() => !["rising", "descending"].includes(window.witch.game.witch.mode), null, { timeout: 60000 });
    if (await page.evaluate(() => window.witch.game.witch.mode) !== "treetop") { await page.keyboard.press("Space"); await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 60000 }); }
    await page.keyboard.press(ZOOM_OUT); await page.keyboard.press(ZOOM_OUT);
    await sleep(800);
    await shot(page, "05-treetop-zoomed-out.png");
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "ground", null, { timeout: 60000 }).catch(() => {});
    s = await state(page);
    check(s.mode === "ground", `space descends to ground mode (${s.mode})`);
    await shot(page, "06-ground-zoomed-out.png");
    await page.keyboard.press(ZOOM_IN); await page.keyboard.press(ZOOM_IN); await page.keyboard.press(ZOOM_IN);
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
    await page.waitForFunction(t => window.witch.game.clock.time - t >= 1.5, s0.t, { timeout: 400000, polling: 50 });
    const s1 = await state(page);
    await touch("pointerup", 150, 600);
    check(s1.x > s0.x + 2 && s1.z < s0.z - 2, `the touch joystick flies her north-east (${(s1.x - s0.x).toFixed(1)}, ${(s1.z - s0.z).toFixed(1)} m)`);
    await page.touchscreen.tap(345, 770); // the rise / descend button
    await page.waitForFunction(() => window.witch.game.witch.mode !== "ground" && window.witch.game.witch.mode === "treetop", null, { timeout: 400000, polling: 50 }).catch(() => {});
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

  // The dancefloor from the ground and from the treetops.
  await run("dancefloor", { width: 1280, height: 720 }, async page => {
    await page.keyboard.press("Enter");
    await sleep(1500);
    await shot(page, "40-dancefloor-ground.png");
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.lift > 0.3, null, { timeout: 60000, polling: 20 });
    await page.screenshot({ path: path.join(out, "42-rising.png") }); // no settle: catch her mid-climb
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 60000 });
    await sleep(1500);
    await shot(page, "41-dancefloor-treetop.png");
    // Behind the home soundsystem (up the screen from it), on the ground: she must still read.
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "ground", null, { timeout: 60000 });
    await page.evaluate(() => { const g = window.witch.game, d = g.map.dancefloor, x = d.x + d.radius + 5, z = d.z + 3 - 2.5; g.witch = { ...g.witch, x, z, vx: 0, vz: 0 }; g.camera = { ...g.camera, tx: x, tz: z }; });
    await sleep(1500);
    await shot(page, "43-behind-soundsystem.png");
  }, "&tilt=before");

  // The ground effects (tree shadows, canopy shadow, mist) off and on, from the same spot, and a
  // short recording in motion with them on.
  for (const [name, q] of [["effects-off", "&shadows=off&canopy=off&mist=off"], ["effects-on", ""], ["fx-pixel", "&fx=pixel"]]) {
    await run(name, { width: 1280, height: 720 }, async page => {
      await page.keyboard.press("Enter");
      await hold(page, "KeyD", 1.5);
      await sleep(300);
      await shot(page, `30-ground-${name}.png`);
      await page.keyboard.press("Space");
      await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 60000 });
      await sleep(600);
      await shot(page, `31-treetop-${name}.png`);
    }, q + "&tilt=before");
  }
  // The party spreading: one area partifying (shots through its transition, from the treetops),
  // its string lights from the ground, then the party after four waves from high up.
  await run("party", { width: 1280, height: 720 }, async page => {
    await page.keyboard.press("Enter");
    await page.keyboard.press("KeyP"); // hold the timer: the waves come when asked
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 60000 });
    await page.keyboard.press("KeyN");
    await page.waitForFunction(() => window.witch.game.party.wave >= 1, null, { timeout: 60000 });
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
    await page.waitForFunction(() => window.witch.game.witch.mode === "ground", null, { timeout: 60000 });
    await sleep(800);
    await shot(page, "55-string-lights-ground.png");
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 60000 });
    await sleep(800);
    await shot(page, "56-string-lights-treetop.png");
    for (let w = 2; w <= 4; w++) {
      await page.keyboard.press("KeyN");
      await page.waitForFunction(n => window.witch.game.party.wave >= n, w, { timeout: 60000 });
    }
    await page.evaluate(() => { const g = window.witch.game, d = g.map.dancefloor; g.witch = { ...g.witch, x: d.x, z: d.z }; g.camera = { ...g.camera, tx: d.x, tz: d.z }; });
    for (let i = 0; i < 4; i++) { await page.keyboard.press(ZOOM_OUT); await sleep(150); }
    const t4 = await page.evaluate(() => window.witch.game.clock.time);
    await page.waitForFunction(t => window.witch.game.clock.time >= t, t4 + 3, { timeout: 400000, polling: 50 });
    const n = await page.evaluate(() => window.witch.game.party.areas.size);
    check(n > 1, `after four waves ${n} areas are partified`);
    await shot(page, "57-party-four-waves.png");
  }, "&debug&tilt=before");

  // Inviting and leashing: talk to a creature until it joins her, gather a few more, fly with the
  // stack, put a sigil down and pick it up again.
  await run("leash", { width: 1900, height: 1240 }, async page => {
    await page.keyboard.press("Enter");
    const id = await page.evaluate(() => {
      const g = window.witch.game, w = g.witch;
      let best = null, bd = Infinity;
      for (const c of g.creatures) { if (c.level !== 0) continue; const d = Math.hypot(c.x - w.x, c.z - w.z); if (d < bd) { bd = d; best = c; } } // a baby
      g.witch = { ...w, x: best.x + 2, z: best.z + 1 };
      g.camera = { ...g.camera, tx: best.x + 2, tz: best.z + 1 };
      return best.id;
    });
    await sleep(800);
    await shot(page, "69-leash-cue.png");
    const t0 = await page.evaluate(() => window.witch.game.clock.time);
    await page.keyboard.down("KeyT");
    await page.waitForFunction(t => window.witch.game.clock.time >= t, t0 + 1.6, { timeout: 400000, polling: 50 });
    await shot(page, "70-leash-talk.png");
    await page.waitForFunction(i => window.witch.game.creatures[i].leashed, id, { timeout: 400000, polling: 100 });
    await page.keyboard.up("KeyT");
    check(await page.evaluate(i => window.witch.game.leash.stack.includes(i), id), "holding Talk by a creature invites it onto her sigil stack");
    // One press a frame: wait for each invite to land before the next (the headless renderer is slow).
    for (let i = 0; i < 3; i++) {
      const before = await page.evaluate(() => window.witch.game.leash.stack.length);
      await page.keyboard.press("KeyI");
      await page.waitForFunction(b => window.witch.game.leash.stack.length > b, before, { timeout: 30000 }).catch(() => {});
    }
    const n = await page.evaluate(() => window.witch.game.leash.stack.length);
    check(n >= 3, `the debug key invites more (${n} on the stack)`);
    await hold(page, "KeyD", 2, 400000); // big window, software renderer: seconds a frame
    await shot(page, "71-leash-stack-flying.png");
    const t1 = await page.evaluate(() => window.witch.game.clock.time);
    await page.waitForFunction(t => window.witch.game.clock.time >= t, t1 + 4, { timeout: 400000, polling: 100 });
    await page.keyboard.press("KeyE");
    await page.waitForFunction(() => window.witch.game.leash.placed.length === 1, null, { timeout: 30000 });
    await hold(page, "KeyW", 0.6, 400000);
    const t2 = await page.evaluate(() => window.witch.game.clock.time);
    await page.waitForFunction(t => window.witch.game.clock.time >= t, t2 + 2, { timeout: 300000, polling: 100 });
    await shot(page, "72-leash-placed.png");
    check(await page.evaluate(() => window.witch.game.leash.placed.length === 1 && window.witch.game.leash.stack.length >= 2), "the sigil button puts the bottom sigil down");
    await page.evaluate(() => { const g = window.witch.game, p = g.leash.placed[0]; g.witch = { ...g.witch, x: p.x, z: p.z, vx: 0, vz: 0 }; });
    await sleep(200);
    await page.keyboard.press("KeyE");
    await page.waitForFunction(() => window.witch.game.leash.placed.length === 0, null, { timeout: 30000 });
    check(await page.evaluate(n => window.witch.game.leash.stack.length === n, n), "over a placed sigil, the button picks it up again");
  }, "&tilt=before");

  // ?debug=cull: anything that changed visibility this frame is tinted red. A strip of frames
  // flying and zooming through every step in both modes.
  await run("cull", { width: 640, height: 360 }, async page => {
    await page.keyboard.press("Enter");
    let k = 0;
    for (const mode of ["ground", "treetop"]) {
      if (mode === "treetop") { await page.keyboard.press("Space"); await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 60000 }); }
      for (const z of [ZOOM_OUT, ZOOM_OUT, ZOOM_IN, ZOOM_IN, ZOOM_IN]) {
        await page.keyboard.press(z);
        await page.keyboard.down("KeyD");
        await sleep(250);
        await shot(page, `cull-${String(k++).padStart(2, "0")}.png`);
        await page.keyboard.up("KeyD");
      }
    }
  }, "&debug=cull&tilt=before");

  // Ed's windows (v53-v57: trees vanished flying the treetops): big, both pixel ratios, long
  // straight flights at full speed in both modes. Nothing set may go undrawn (view.stats.dropped:
  // a batch three.js capped), and nothing may appear or vanish anywhere on screen.
  for (const [w, h, dpr] of [[1900, 1240, 1], [2000, 1076, 2]]) {
    await run(`vanish-${w}x${h}`, { width: w, height: h, dpr }, async page => {
      await page.keyboard.press("Enter");
      await page.evaluate(() => { const v = window.witch.view; v.pops = []; window.maxDropped = 0; setInterval(() => { window.maxDropped = Math.max(window.maxDropped, v.stats.dropped); }, 50); });
      await hold(page, "KeyD", 4, 600000);
      await shot(page, `vanish-${w}x${h}-ground.png`);
      await page.keyboard.press("Space");
      await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 300000 });
      await hold(page, "KeyD", 5, 600000);
      await hold(page, "KeyW", 4, 600000);
      await shot(page, `vanish-${w}x${h}-treetop.png`);
      await page.keyboard.press(ZOOM_OUT); await page.keyboard.press(ZOOM_OUT);
      await hold(page, "KeyA", 4, 600000);
      await shot(page, `vanish-${w}x${h}-treetop-out.png`);
      const r = await page.evaluate(() => ({ dropped: window.maxDropped, pops: window.witch.view.pops.slice(0, 12), n: window.witch.view.pops.length, trees: window.witch.view.stats.trees, radius: window.witch.view.stats.sceneryRadius, fps: window.witch.view.stats.fps }));
      check(r.dropped === 0, `${w}x${h} at DPR ${dpr}: every tree, bush and creature set is drawn (most dropped in a frame: ${r.dropped}; ${r.trees} trees now; scenery radius ${(r.radius ?? 0).toFixed(0)} m at ${(r.fps ?? 0).toFixed(1)} fps)`);
      check(r.n === 0, `${w}x${h} at DPR ${dpr}: nothing appears or vanishes on screen in full-speed flight (${r.n})${r.n ? ": " + r.pops.join("; ") : ""}`);
    }, "&debug=cull");
  }

  if (process.env.RECORD) {
    const ctx = await browser.newContext({ viewport: { width: 960, height: 540 }, recordVideo: { dir: out, size: { width: 960, height: 540 } } });
    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${port}/?seed=${seed}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 120000 });
    await page.keyboard.press("Enter");
    await page.keyboard.down("KeyD"); await sleep(2500); await page.keyboard.up("KeyD");
    await page.keyboard.press("Space"); await sleep(800);
    await page.keyboard.down("KeyW"); await sleep(3500); await page.keyboard.up("KeyW");
    const video = page.video();
    await ctx.close();
    if (video) { fs.renameSync(await video.path(), path.join(out, "flight.webm")); results.push("video previews/flight.webm"); }
  }

  await browser.close();
  server.close();
  console.log(results.join("\n"));
  if (errors.length) { console.error("\nFAILED:\n" + errors.join("\n")); process.exit(1); }
  console.log("\nsmoke test passed");
}

main().catch(e => { console.error(e); process.exit(1); });
