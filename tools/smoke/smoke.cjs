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
    await page.goto(`http://127.0.0.1:${port}/?${/(^|&)seed=/.test(query || "") ? (query || "").replace(/^&/, "") : `seed=${seed}${query || "&debug"}`}`); // (a run may ask for its own seed)
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 120000 });
    // All the art is drawn in the background after start; the software renderer here starves the
    // workers of CPU (minutes at big window sizes), so wait for it before flying, so the shots show the forest as players do.
    await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 2400000, polling: 1000 });
    await steps(page);
    await page.close();
  }
  const state = page => page.evaluate(() => { const g = window.witch.game; return { t: g.clock.time, x: g.witch.x, z: g.witch.z, mode: g.witch.mode, paused: g.clock.paused, area: window.witch.areaUnderWitch(), stats: window.witch.view.stats }; });
  // Hold a key for `secs` of game time (a slow headless renderer runs fewer, capped frames).
  const hold = async (page, key, secs, timeout = 240000) => { // the software renderer here runs the treetops (sky, bend) at about a frame a second
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
    [s0, s] = await hold(page, "ArrowRight", 2);
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
    [s0, s] = await hold(page, "ArrowUp", 2);
    const topSpeed = (s0.z - s.z) / (s.t - s0.t);
    check(topSpeed > groundSpeed * 1.5 && topSpeed <= tuning.treetopSpeed * (tuning.treetop?.boost ?? 1) * 1.01, `flies north faster in treetop mode, at most its full boost (${topSpeed.toFixed(1)} m/s)`);
    await shot(page, "04-treetop-flying.png");
    // Fly a fixed path through every zoom level in both modes; nothing of any kind may appear or
    // vanish in clear view on the way (trees, undergrowth, walls, set pieces, creatures, props).
    await page.evaluate(() => { window.witch.view.pops = []; window.witch.view.trackPops = true; });
    const steps = await page.evaluate(() => window.witch.game.tuning.camera.zoomSteps);
    const keys = ["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp"];
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
        await hold(page, "ArrowUp", 1.2);
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
      // Wait for frames drawn at the new place (game time passing), not wall time: the first
      // rebuild there makes new forest, which a slow renderer can take over a second to finish,
      // and what it draws then must not count as popping in.
      const t0 = await page.evaluate(() => window.witch.game.clock.time);
      await page.waitForFunction(t => window.witch.game.clock.time - t >= 0.5, t0, { timeout: 120000, polling: 50 });
      await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 900000, polling: 500 });
      await page.evaluate(() => { window.witch.view.pops = []; window.witch.view.trackPops = true; });
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
      await hold(page, "ArrowUp", 1);
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
      await hold(page, "ArrowRight", 1.5);
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
      v.scene.traverse(o => {
        const m = o.material;
        if (!m || !o.visible) return;
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

  // Trunks (Ed, v271: "We have really lost our treetrunks"): in the densest wooded spot of a
  // tangly forest and of old oaks, on the ground, trunks must be drawn (drawn flat magenta for a
  // frame to find them) over at least 2% of the screen, and a good share of them readable (not
  // black on black) in the lit frame.
  await run("trunks", { width: 960, height: 540 }, async page => {
    await page.keyboard.press("Enter");
    for (const id of ["tangly-forest", "old-oaks"]) {
      const at = await page.evaluate(id => {
        const g = window.witch.game, m = g.map, B = m.bounds;
        let t = -1;
        for (let i = 0; i < 64 && t < 0; i++) { try { if (window.witch.areaTypeId(i) === id) t = i; } catch { break; } }
        let best = null, bn = -1;
        for (let cy = 0; cy < m.n; cy++) for (let cx = 0; cx < m.n; cx++) if (m.typeOf(cx, cy) === t) {
          const s = m.siteOf(cx, cy);
          for (let k = 0; k < 60; k++) {
            const a = k * 0.7, d = m.areaSize * (0.1 + (k % 6) * 0.07), x = s.x + Math.cos(a) * d, z = s.z + Math.sin(a) * d;
            if (x < B.minX + 30 || x > B.maxX - 30 || z < B.minZ + 30 || z > B.maxZ - 30) continue;
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
      await sleep(1500);
      await page.waitForFunction(() => window.witch.view.assets.pending === 0 && window.witch.view.stats.forestMissing === 0, null, { timeout: 900000, polling: 1000 }).catch(() => {});
      await sleep(1500);
      const lit = await page.screenshot({ timeout: 300000 });
      await page.evaluate(() => { window.witch.view.debugTrunks = true; });
      await sleep(1000);
      const mask = await page.screenshot({ timeout: 300000 });
      await page.evaluate(() => { window.witch.view.debugTrunks = false; });
      fs.writeFileSync(path.join(out, `trunks-${id}.png`), lit);
      const r = await page.evaluate(async ([a, m]) => {
        const load = src => new Promise(res => { const i = new Image(); i.onload = () => { const c = document.createElement("canvas"); c.width = i.width; c.height = i.height; const x = c.getContext("2d"); x.drawImage(i, 0, 0); res(x.getImageData(0, 0, i.width, i.height).data); }; i.src = "data:image/png;base64," + src; });
        const A = await load(a), M = await load(m);
        let n = 0, readable = 0;
        for (let i = 0; i < M.length; i += 4) if (M[i] > 200 && M[i + 1] < 60 && M[i + 2] > 200) { n++; if (0.3 * A[i] + 0.55 * A[i + 1] + 0.15 * A[i + 2] > 25) readable++; }
        return { share: n / (M.length / 4), readable: n ? readable / n : 0 };
      }, [lit.toString("base64"), mask.toString("base64")]);
      check(r.share > 0.02, `trunks are drawn on the ground in the ${id} (${(r.share * 100).toFixed(1)}% of the screen)`);
      check(r.readable > 0.15, `the ${id}'s trunks are readable, not black on black (${(r.readable * 100).toFixed(0)}% of their pixels)`);
    }
  }, "&tilt=before");

  // Inviting and leashing: stand by a creature while she talks it into joining her, gather a few more, fly with the
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
    // No Talk button (Ed, v244): standing by it, she talks to it by herself.
    await page.waitForFunction(t => window.witch.game.clock.time >= t, t0 + 1.6, { timeout: 400000, polling: 50 });
    await shot(page, "70-leash-talk.png");
    await page.waitForFunction(i => window.witch.game.creatures[i].leashed, id, { timeout: 400000, polling: 100 });
    check(await page.evaluate(i => window.witch.game.leash.stack.includes(i), id), "standing by a creature, she talks to it by herself and invites it onto her sigil stack");
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
        await page.keyboard.down("ArrowRight");
        await sleep(250);
        await shot(page, `cull-${String(k++).padStart(2, "0")}.png`);
        await page.keyboard.up("ArrowRight");
      }
    }
  }, "&debug=cull&tilt=before");

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
    const [s0, s1] = await hold(page, "ArrowUp", 12, 900000);
    const r = await page.evaluate(() => { const L = window.speedLog; L.stop = true; const q = (a, k) => { const b = [...a].sort((x, y) => x - y); return b.length ? b[Math.min(b.length - 1, Math.floor(k * (b.length - 1)))] : 0; }; return { n: L.forest.length, worst: q(L.forest, 1), p99: q(L.forest, 0.99), median: q(L.forest, 0.5), frameMedian: q(L.frame, 0.5), frameWorst: q(L.frame, 1), missing: window.witch.view.stats.forestMissing }; });
    const dist = Math.hypot(s1.x - s0.x, s1.z - s0.z), speed = dist / (s1.t - s0.t);
    results.push(`info speed: ${dist.toFixed(0)} m of fresh forest at ${speed.toFixed(1)} m/s; forest building per frame: median ${r.median.toFixed(1)} ms, p99 ${r.p99.toFixed(1)} ms, worst ${r.worst.toFixed(1)} ms over ${r.n} frames; frames here (software renderer): median ${r.frameMedian.toFixed(0)} ms, worst ${r.frameWorst.toFixed(0)} ms`);
    check(dist > 150 && r.p99 <= 16, `flying into new forest at full boost, building it costs at most 16 ms in 99% of frames (p99 ${r.p99.toFixed(1)} ms, worst ${r.worst.toFixed(1)} ms)`);
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
      return { x: best[0], z: best[1], slope: bs };
    });
    await sleep(1500);
    await page.waitForFunction(() => window.witch.view.assets.pending === 0 && window.witch.view.stats.forestMissing === 0, null, { timeout: 900000, polling: 1000 }).catch(() => {});
    await sleep(1500);
    await shot(page, file);
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
    results.push(`info slope (seed ${slopeSeed}): the steepest spot near home ${(at.slope * 100).toFixed(0)}% (${at.x.toFixed(0)}, ${at.z.toFixed(0)}); flying north from it, camera lift at most ${r.ground.lift.toFixed(1)} m on the ground and ${r.treetop.lift.toFixed(1)} m over the treetops; her height's rms acceleration ${r.ground.ride.toFixed(1)} against the ground's ${r.ground.ground.toFixed(1)} m/s² (ground), ${r.treetop.ride.toFixed(1)} against ${r.treetop.ground.toFixed(1)} (treetops)`);
    check(at.slope < Math.tan(30 * Math.PI / 180), `seed ${slopeSeed}: the steepest slope near home is under the camera's shallowest pitch (${(at.slope * 100).toFixed(0)}%, 30° is 58%)`);
    check(Math.max(r.ground.lift, r.treetop.lift) < 3, `seed ${slopeSeed}: flying directly away from the camera over the steepest hill, no rise hides her: the camera's safety-net lift stays under 3 m (${r.ground.lift.toFixed(1)} m, ${r.treetop.lift.toFixed(1)} m)`);
    check(r.ground.ride < r.ground.ground * 0.8 && r.treetop.ride < r.treetop.ground * 0.8, `seed ${slopeSeed}: she rides the hills smoothly: her height bobs less than the ground under her (rms acceleration ${r.ground.ride.toFixed(1)} vs ${r.ground.ground.toFixed(1)}, ${r.treetop.ride.toFixed(1)} vs ${r.treetop.ground.toFixed(1)} m/s²)`);
  }, slopeSeed === seed ? "&debug" : `&seed=${slopeSeed}&debug`); // (Ed, v297: seed 165272 had cliffs and broken trees)

  // Boosting over the treetops (Ed, v256: "framerate drops a bit during boost mode in treetop
  // view"): the game is stepped frame by frame at a fixed 1/60 s (window.witch.frame), so the
  // flight covers what a 60 fps player's does however slow the software renderer is, and each
  // frame's own work (rules and view, not the software renderer's drawing) is timed: hovering,
  // then 10 s north at full boost with the speed spell cast whenever it's ready. The limits are
  // for a builder's cloud machine (v256 there: p99 35 ms, worst 49 ms; Ed's is several times faster).
  // A siege (Stage 4), headless and frame by frame: a wave wakes the next area (its creatures grown
  // to young, as the areas round home hold only babies), they march on its new soundsystem and bring
  // it down (its health cut short for the test); its party ends and they march on to the dancefloor;
  // when that falls too, the run is over and the end screen shows.
  await run("siege", { width: 1280, height: 800 }, async page => {
    await page.keyboard.press("Enter");
    const r = await page.evaluate(async () => {
      const w = window.witch, g = w.game, dt = 1 / 60, idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, yieldNow = () => new Promise(res => setTimeout(res, 0));
      w.manual = true;
      g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
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
      const fell = sound.hp === 0, ended = !g.party.areas.has(key), marched = besiegers.filter(c => !c.gone).every(c => c.siege === "home");
      const home = g.combat.sounds.get("home"); home.hp = 0.001;
      for (const c of besiegers) if (!c.gone) { c.x = g.map.dancefloor.x + 6; c.z = g.map.dancefloor.z + 6; }
      for (let i = 0; i < 60 * 60 && !g.over; i++) { w.frame(idle, dt, false); if (i % 120 === 0) await yieldNow(); }
      w.manual = false;
      return { besiegers: besiegers.length, hit, fell, ended, marched, over: !!g.over };
    });
    if (r.error) { check(false, `a siege: ${r.error}`); return; }
    await page.waitForFunction(() => document.getElementById("over").classList.contains("on"), null, { timeout: 120000 }).catch(() => {});
    const screen = await page.evaluate(() => document.getElementById("over").classList.contains("on"));
    await shot(page, "80-siege-over.png");
    check(r.besiegers > 0 && r.hit && r.fell && r.ended && r.marched, `a woken area's creatures besiege its soundsystem, bring it down, end its party and march on to the dancefloor (${JSON.stringify(r)})`);
    check(r.over && screen, `when every soundsystem has fallen the run is over and the end screen shows (${r.over}, ${screen})`);
  });

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
      let top = 0;
      for (let i = 0; i < 600; i++) { const f = w.frame(C({ moveZ: -1, spell: true }), dt, false); boost.push(cpu(f)); top = Math.max(top, Math.hypot(w.game.witch.vx, w.game.witch.vz)); if (i % 30 === 0) await yieldNow(); }
      w.manual = false;
      const q = (a, k) => { const b = [...a].sort((x, y) => x - y); return b[Math.min(b.length - 1, Math.floor(k * (b.length - 1)))]; };
      return { hover: q(hover, 0.5), median: q(boost, 0.5), p99: q(boost, 0.99), worst: q(boost, 1), top, dist: Math.hypot(w.game.witch.x - x0, w.game.witch.z - z0) };
    });
    results.push(`info boost: ${r.dist.toFixed(0)} m north in 10 s at up to ${r.top.toFixed(0)} m/s; frame work hovering ${r.hover.toFixed(1)} ms (median), boosting median ${r.median.toFixed(1)} ms, p99 ${r.p99.toFixed(1)} ms, worst ${r.worst.toFixed(1)} ms`);
    check(r.top > 100 && r.p99 <= 22, `boosting over the treetops at over 100 m/s, 99% of frames' own work is within 22 ms (p99 ${r.p99.toFixed(1)} ms)`);
    check(r.worst <= 40, `boosting over the treetops, no frame's own work takes over 40 ms (worst ${r.worst.toFixed(1)} ms)`);
  });

  // Nothing floats (Ed, v108: rocks in the cave mouth hovered over their shadows): every placed
  // sprite's (trees, plants, walls, set pieces, decor, the treehouse) lowest drawn pixel, read from the atlas itself, sits on the ground. Close-up in a
  // cave mouth, in ground mode, zoomed in.
  await run("ground", { width: 1280, height: 800 }, async page => {
    await page.keyboard.press("Enter");
    const cave = await page.evaluate(() => {
      const g = window.witch.game, m = g.map, d = m.dancefloor;
      let best = null;
      for (let y = 0; y < m.n; y++) for (let x = 0; x < m.n; x++) {
        if (window.witch.areaTypeId(m.typeOf(x, y)) !== "cave-mouth") continue;
        const s = m.siteOf(x, y), k = Math.hypot(s.x - d.x, s.z - d.z);
        if (!best || k < best.k) best = { x, y, k, s };
      }
      if (!best) return null;
      // Into the woods a little way from its centre, where its plants grow.
      const px = best.s.x + 18, pz = best.s.z + 22;
      // Off the treehouse's seat (else the opening shot keeps the camera close in on her).
      g.witch = { ...g.witch, x: px, z: pz, vx: 0, vz: 0, seated: false }; g.camera = { ...g.camera, tx: px, tz: pz };
      document.getElementById("debug").classList.remove("on");
      return `${best.x},${best.y}`;
    });
    check(!!cave, `there is a cave mouth to look at (${cave})`);
    await page.keyboard.press(ZOOM_IN); await page.keyboard.press("KeyH");
    await sleep(2000);
    // The art, and the forest round her (built a few chunks a frame since the speed work), all in.
    await page.waitForFunction(() => window.witch.view.assets.pending === 0 && window.witch.view.stats.forestMissing === 0 && window.witch.view.stats.trees > 0, null, { timeout: 300000, polling: 500 });
    await sleep(1500);
    await shot(page, "ground-cave-mouth.png");
    const r = await page.evaluate(() => {
      const v = window.witch.view, out = { n: 0, worst: 0, bad: [] };
      for (const [type, b] of [...v.typeBatches, ...[...v.decorBatches].filter(([k]) => k !== "decals" && k !== "sceneDecals"), ["treehouse", v.treehouseBatch]]) { // decals lie flat
        const img = b.atlas.albedo.image, W = img.width, H = img.height, D = img.data;
        for (const it of b.items) {
          if (it.top || it.overlay) continue; // (crowns, and the treehouse's DJ table drawn over it, stand on their trunk)
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
    // The rolling ground: a sprite stands upright at the lowest ground under its foot (most of its width, up to 4 m either
    // side of its base), so its uphill side is planted in the slope; where the ground at an end of
    // its drawn foot is lower than that, the end floats. None may float past 1 art px.
    const hr = await page.evaluate(() => {
      const v = window.witch.view, h = window.witch.groundHeight, R = window.witch.spriteRight(), out = { n: 0, worst: 0, bad: [], hilly: 0 };
      for (const [type, b] of [...v.typeBatches, ...v.creatureBatches, ...[...v.decorBatches].filter(([k]) => k !== "decals"), ["treehouse", v.treehouseBatch]]) { // (she hovers)
        const img = b.atlas.albedo.image, W = img.width, D = img.data;
        for (const it of b.items) {
          if (it.top || it.overlay) continue; // (crowns, and the treehouse's DJ table drawn over it, stand on their trunk)
          const f = it.frame, x0 = Math.round(f.uv[0] * W), y0 = Math.round(f.uv[1] * img.height);
          let low = -1, left = 0, right = 0;
          for (let row = f.h - 1; row >= 0 && low < 0; row--) for (let x = 0; x < f.w; x++) if (D[((y0 + row) * W + x0 + x) * 4 + 3] >= 128) { if (low < 0) { low = row; left = x; } right = x; }
          if (low < 0) continue;
          const m = b.metresPerPixel * (it.scale ?? 1), c = ((left + right) / 2 - f.w / 2) * m * (it.flip ? -1 : 1), half = ((right - left) / 2 + 0.5) * m;
          const cx = it.x + R.x * c, cz = it.z + R.z * c, fw = Math.min(f.w * m * 0.45, 4);
          const base = Math.min(h(it.x, it.z), h(it.x - R.x * fw, it.z - R.z * fw), h(it.x + R.x * fw, it.z + R.z * fw));
          const err = Math.max(0, ...[-half, half].map(s => base - h(cx + R.x * s, cz + R.z * s))) / b.metresPerPixel;
          out.n++; if (Math.abs(base) > 0.3) out.hilly++;
          if (err > out.worst) out.worst = err;
          if (err > 1 && out.bad.length < 6) out.bad.push(`${typeof type === "number" ? window.witch.areaTypeId(type) : type} ${err.toFixed(1)} px`);
        }
      }
      return out;
    });
    check(hr.n > 50 && hr.bad.length === 0, `on the rolling ground nothing floats or sinks past 1 art px at its foot's ends (${hr.n} checked, ${hr.hilly} off the flat, worst ${hr.worst.toFixed(2)} px)${hr.bad.length ? ": " + hr.bad.join("; ") : ""}`);
  });

  // Ed's windows (v53-v57: trees vanished flying the treetops): big, both pixel ratios, long
  // straight flights at full speed in both modes. Nothing set may go undrawn (view.stats.dropped:
  // a batch three.js capped), and nothing may appear or vanish anywhere on screen.
  for (const [w, h, dpr] of [[1900, 1240, 1], [2000, 1076, 2]]) {
    await run(`vanish-${w}x${h}`, { width: w, height: h, dpr }, async page => {
      await page.keyboard.press("Enter");
      await page.evaluate(() => { const v = window.witch.view; v.pops = []; v.trackPops = true; window.maxDropped = 0; setInterval(() => { window.maxDropped = Math.max(window.maxDropped, v.stats.dropped); }, 50); });
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
      check(r.n === 0, `${w}x${h} at DPR ${dpr}: nothing appears or vanishes on screen in full-speed flight (${r.n})${r.n ? ": " + r.pops.join("; ") : ""}`);
    }, "&debug=cull");
  }

  if (process.env.RECORD) {
    const ctx = await browser.newContext({ viewport: { width: 960, height: 540 }, recordVideo: { dir: out, size: { width: 960, height: 540 } } });
    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${port}/?seed=${seed}`);
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
  if (errors.length) { console.error("\nFAILED:\n" + errors.join("\n")); process.exit(1); }
  console.log("\nsmoke test passed");
}

main().catch(e => { console.error(e); process.exit(1); });
