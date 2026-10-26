// The new opening in the built game (app/opening.ts; Ed, 2026-10-20, previews/ed/opening-mock/ on claude/ed-shots), a shot per beat
// into <out dir>: a fresh profile's first load (?opening=bedroom; Ed, 2026-10-23: no chart first), asleep in the dark while home's
// night is made, then waking in her bedroom in the treehouse, the pause page's What's new and Options, and the wake-up's beats (the alarm, a snooze, the stretch, up, the
// mirror, the wardrobe and shoe rack in the bedroom, dressed at last night's clothes, out of its door: the oak's, no curtains, Ed 2026-10-24). Fails on a page error, the creator's bedroom or the sea chart shown, her anywhere but her bedroom, or a beat
// that doesn't come. LATER=1 plays a later load (the shorter wake-up) and stops once she's up; BED=1 goes on to the bed and the next night's wake-up. The snooze and the stretch are shortened (?set=: 2 s and 1 s of her clock), this
// machine's software-drawn frames making her seconds minutes.
// Run `npm run build` first. Playwright from the machine's global install.
//   node tools/opening/shots.cjs [out dir] (default previews/opening/)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/opening"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
// The house's objects, on its plan turned about the hub (config/house/; rules/houseRooms.ts fromPlan, objectFront): where she
// stands `by` metres in front of one, on the side facing its room's middle, in metres from the hub's centre in the world.
const HOUSE = require("../../config/house/load.mjs").loadHouse(), TURN = ((HOUSE.turn || 0) * Math.PI) / 180;
const plan = (x, z) => [x * Math.cos(TURN) + z * Math.sin(TURN), -x * Math.sin(TURN) + z * Math.cos(TURN)];
function front(id, by) {
  const o = HOUSE.objects.find(q => q.id === id), r = HOUSE.rooms.find(q => q.id === o.room), dx = (r.x0 + r.x1) / 2 - o.x, dz = (r.z0 + r.z1) / 2 - o.z;
  return Math.abs(dx) > Math.abs(dz) ? plan(o.x + Math.sign(dx) * (o.w / 2 + by), o.z) : plan(o.x, o.z + Math.sign(dz || 1) * (o.d / 2 + by));
}
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], fail = m => { throw new Error(m); };
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    if (process.env.LATER === "1") await page.addInitScript(() => localStorage.setItem("witch.woken", "1")); // (a later load: the shorter wake-up)
    page.on("pageerror", e => errors.push(e.message));
    const shot = async name => { await page.screenshot({ path: path.join(out, name), timeout: 300000 }); log("shot", name); };
    await page.goto(`http://127.0.0.1:${server.address().port}/?opening=bedroom&quick=1&timing=1&set=${encodeURIComponent("opening.wake.snooze=2;opening.wake.stretch=1")}`);
    await page.waitForFunction(() => !!window.witch?.view, null, { timeout: 600000, polling: 1000 });
    await page.waitForTimeout(1500);
    await shot("01-asleep.png"); // (the first screen: asleep in the dark while home's night is made)
    if (await page.evaluate(() => !!document.getElementById("chart-overlay"))) fail("the sea chart opened on the first load");
    if (await page.evaluate(() => window.__creator?.open)) fail("the creator's bedroom opened on the opening's first load");
    await page.waitForFunction(() => !!window.witch?.game?.wake, null, { timeout: 1200000, polling: 1000 });
    log("she's waking");
    await page.waitForTimeout(3000);
    await shot("02-wake.png");
    // the pause page's What's new and Options (the chart's corner, before: Ed, 2026-10-23)
    for (const [label, name] of [["What's new", "03-whats-new.png"], ["Options", "04-options.png"]]) {
      await page.keyboard.press("Escape"); // (paused; the Esc below closes the panel and resumes, as Controls')
      await page.click(`button:has-text("${label}")`, { timeout: 60000 });
      await page.waitForSelector(".corner-panel");
      await shot(name);
      await page.keyboard.press("Escape");
      if (await page.$(".corner-panel")) fail(`Esc didn't close ${label}`);
    }
    if (!(await page.evaluate(() => !!document.querySelector("#start .ss-body")))) fail("What's new wasn't put back on the start card");
    await page.waitForTimeout(1500);
    const w = await page.evaluate(() => { const g = window.witch?.game; const b = g?.witch; return b ? { x: b.x - g.map.treehouse.x, z: b.z - g.map.treehouse.z, seated: !!b.seated, house: g.camera.house } : null; });
    log("she's at", JSON.stringify(w));
    if (!w || w.seated || w.z > -9) fail("she didn't wake in her bedroom");
    // the wake-up (rules/wakeUp.ts): each beat's shot, driven by its own input, waiting on her clock
    const wake = () => page.evaluate(() => { const W = window.witch.game.wake; return W ? { beat: W.beat, snoozes: W.snoozes, open: W.open, pile: W.pile?.length ?? 0, mirror: W.mirror, ready: !!window.witch.game.islandReady, pending: window.witch.view.assets.pending, drawn: window.witch.view.islandDrawn(), age: window.witch.game.herTime - W.at } : null; });
    const until = async (f, what) => { for (let i = 0; i < 1800; i++) { const s = await wake(); if (s && f(s)) return s; await page.waitForTimeout(500); } fail(`the wake-up never got to ${what}`); };
    if ((await wake())?.beat !== "alarm") fail("no alarm as she landed");
    await until(s => s.age > 1, "a second of ringing");
    await shot("06-alarm.png");
    if (process.env.LATER === "1") { // the shorter wake-up: any key and she's up, no stretch (Ed's decision 4)
      if (!(await page.evaluate(() => window.witch.game.wake.short))) fail("a later load's wake-up wasn't the shorter one");
      await page.keyboard.down("KeyD"); await until(s => s.beat === "up", "her up"); await page.keyboard.up("KeyD");
      await page.waitForTimeout(1500);
      await shot("later-up.png");
      log("later load: up at once, no stretch");
      fs.writeFileSync(path.join(out, "opening.json"), JSON.stringify({ later: true }, null, 1));
      return;
    }
    await page.keyboard.press("KeyE");
    await until(s => s.beat === "snooze", "the snooze");
    await page.waitForTimeout(800);
    await shot("07-snooze.png");
    await until(s => s.beat === "alarm" && s.age > 1, "the alarm ringing again"); // (past alarmMin on her clock: a press as it starts ringing doesn't count)
    await page.keyboard.press("KeyE");
    await until(s => s.snoozes === 2, "a second snooze");
    await page.keyboard.down("KeyD"); await until(s => s.beat === "stretch", "the stretch"); await page.keyboard.up("KeyD"); // (held till a frame sees it: this machine's frames are slow)
    await page.waitForTimeout(600);
    await shot("08-stretch.png");
    await until(s => s.beat === "up", "her up");
    await page.waitForTimeout(1500);
    await shot("09-up.png");
    // to the dressing table (put by it: the walk itself is the rules' tests'): lit, E over it, and E opens its mirror (Ed's playtest,
    // 2026-10-26: nothing opens by nearness)
    const goTo = (id, by) => page.evaluate(([x, z]) => { const g = window.witch.game, th = g.map.treehouse, W = g.witches[0]; W.body = { ...W.body, x: th.x + x, z: th.z + z, vx: 0, vz: 0 }; }, front(id, by));
    const panelIn = () => page.evaluate(() => !!document.querySelector("#station-panel.in"));
    const useIt = async () => { await page.waitForTimeout(1500); if (await panelIn()) fail("a station's panel opened by her being near it, before E"); for (let i = 0; i < 5 && !(await panelIn()); i++) { await page.keyboard.press("KeyE"); for (let j = 0; j < 40 && !(await panelIn()); j++) await page.waitForTimeout(500); } /* (one E, then up to 20 s for a slow frame to see it: E closes it too) */ };
    await goTo("dressingTable", 0.5);
    await shot("09b-mirror-lit.png"); // (lit, its prompt over it)
    await useIt();
    await page.waitForTimeout(2500);
    await shot("10-mirror.png");
    // (its panel docked over the running game since the station panels, #996: ui/creator.ts docked; the full-screen room is `open`)
    if (!(await page.evaluate(() => !!document.querySelector("#station-panel.in")))) fail("the mirror didn't dock the creator's panel");
    if (await page.evaluate(() => window.__creator?.open || window.witch.game.clock.paused)) fail("the mirror's panel stopped play (it should dock over the running game)");
    // the whole bedroom from the game's camera: her in its middle, the camera a zoom step out
    { const b = HOUSE.rooms.find(r => r.id === "bedroom"), mid = plan((b.x0 + b.x1) / 2, (b.z0 + b.z1) / 2);
      await page.evaluate(([x, z]) => { const g = window.witch.game, th = g.map.treehouse, W = g.witches[0]; W.body = { ...W.body, x: th.x + x, z: th.z + z, vx: 0, vz: 0 }; }, mid);
      await page.keyboard.press("KeyX"); await page.waitForTimeout(4000);
      await shot("10a-bedroom-whole.png");
      await page.keyboard.press("KeyZ"); await page.waitForTimeout(1500); }
    // the rest of her dressing, in the bedroom before its door (Ed, 2026-10-21: "all of the customisation options (except for broom,
    // hat, and bag) should be before the locked door"): each station's panel docks as she stands at it and presses E
    for (const [id, name] of [["wardrobe", "10b-wardrobe.png"], ["shoeRack", "10d-shoe-rack.png"]]) { // (the cloak pegs: in the Cloakroom since the oak)
      await goTo(id, 0.5);
      await useIt();
      await page.waitForTimeout(1500);
      if (!(await page.evaluate(() => !!document.querySelector("#station-panel.in")))) fail(`the ${id}'s panel didn't dock`);
      await shot(name);
    }
    // up, the wake-up's over (the oak, Ed 2026-10-24: no curtains, nothing waiting on the island's build): only her dressing keeps the door
    // (she stands still at it, the movement keys its buttons: E again slides it out; Ed, 2026-10-26)
    const at0 = await page.evaluate(() => { const b = window.witch.game.witches[0].body; return [b.x, b.z]; });
    await page.keyboard.down("KeyD"); await page.waitForTimeout(800); await page.keyboard.up("KeyD");
    const at1 = await page.evaluate(() => { const b = window.witch.game.witches[0].body; return [b.x, b.z]; });
    if (Math.hypot(at1[0] - at0[0], at1[1] - at0[1]) > 0.05) fail(`she walked while the shoe rack's panel was open (${at0} to ${at1})`);
    if (!(await page.evaluate(() => !!document.querySelector("#station-panel.in")))) fail("a movement key closed the shoe rack's panel");
    await page.keyboard.press("KeyE");
    for (let i = 0; i < 40 && (await page.evaluate(() => !!document.querySelector("#station-panel.in"))); i++) await page.waitForTimeout(250);
    if (await page.evaluate(() => !!document.querySelector("#station-panel.in"))) fail("E didn't slide the shoe rack's panel out");
    await goTo("clothesPile", 1.5);
    const before = await wake();
    log("up:", JSON.stringify(before));
    if (!before.open) fail("up, but the wake-up isn't over");
    // still in her nightie (Ed, 2026-10-23: rules/clothesPile.ts): the door waits; E at last night's clothes by the bed puts them on
    if (!(await wake()).pile) fail("no clothes in the pile by her bed: she should wake in her nightie");
    await goTo("clothesPile", 0.5); await page.waitForTimeout(1500);
    await shot("12a-the-pile.png");
    await page.keyboard.press("KeyE");
    await until(s => !s.pile, "dressed at the pile");
    await page.waitForTimeout(2500);
    await shot("12b-dressed.png");
    // and the door lets her out: from just inside it, out along the branch to the Boudoir (the Ent's own house: tools/house/organic.mjs)
    const bed = HOUSE.rooms.find(r => r.id === "bedroom"), bc = [(bed.x0 + bed.x1) / 2, (bed.z0 + bed.z1) / 2], br = HOUSE.corridors.find(c => c.id === "boudoir-bedroom").pts;
    const [ix, iz] = br[br.length - 1], [jx, jz] = br[0], L = Math.hypot(jx - ix, jz - iz), door = plan(ix, iz), [ox, oz] = plan((jx - ix) / L, (jz - iz) / L);
    const keys = [...(Math.abs(ox) > 0.38 ? [ox < 0 ? "KeyA" : "KeyD"] : []), ...(Math.abs(oz) > 0.38 ? [oz > 0 ? "KeyS" : "KeyW"] : [])];
    await page.evaluate(([x, z]) => { const g = window.witch.game, th = g.map.treehouse, W = g.witches[0]; W.body = { ...W.body, x: th.x + x, z: th.z + z, vx: 0, vz: 0 }; }, door);
    for (const k of keys) await page.keyboard.down(k);
    const left = () => page.evaluate(([cx, cz, r, A]) => { const g = window.witch.game, th = g.map.treehouse, dx = g.witch.x - th.x, dz = g.witch.z - th.z, px = dx * Math.cos(A) - dz * Math.sin(A), pz = dx * Math.sin(A) + dz * Math.cos(A); return Math.hypot(px - cx, pz - cz) > r + 0.5; }, [bc[0], bc[1], bed.r, TURN]); // (past the bedroom's rim, on the branch)
    for (let i = 0; i < 120 && !(await left()); i++) await page.waitForTimeout(500);
    for (const k of keys) await page.keyboard.up(k);
    if (!(await left())) fail("the door didn't let her out of the bedroom once she was dressed");
    await shot("12c-out-of-the-door.png");
    // out to her decks: E there seats her and casts the party spell, its needle-drop routine the DJ intro (Ed's decision 2)
    const spell = () => page.evaluate(() => window.witch.game.party.spellAt);
    if ((await spell()) !== null) fail("the party started before her decks");
    await page.evaluate(([sx, sz]) => { const g = window.witch.game, d = g.map.treehouse, W = g.witches[0]; W.body = { ...W.body, x: d.x + sx, z: d.z + sz - 0.6, vx: 0, vz: 0 }; }, [HOUSE.terrace.seat.x, HOUSE.terrace.seat.z]); // (the Terrace's seat, config/house/base.json)
    await page.waitForTimeout(1500);
    await shot("13-to-decks.png");
    for (let i = 0; i < 60 && (await spell()) === null; i++) { if (i % 10 === 0) await page.keyboard.press("KeyE"); await page.waitForTimeout(1000); }
    if ((await spell()) === null) fail("E at her decks didn't start the party");
    await page.waitForTimeout(4000);
    await shot("14-dj-intro.png");
    // Controls on the pause page (Ed's decision 3)
    await page.keyboard.press("Escape"); await page.waitForTimeout(2500);
    await page.evaluate(() => [...document.querySelectorAll("button")].find(b => b.textContent === "❔ Controls")?.click());
    await page.waitForTimeout(1500);
    if (!(await page.$(".corner-panel"))) fail("no Controls on the pause page");
    await shot("15-pause-controls.png");
    await page.keyboard.press("Escape"); await page.waitForTimeout(1500); // (closes the panel and resumes: one Esc)
    if (await page.evaluate(() => window.witch.game.clock.paused)) fail("Esc didn't resume from the pause page");
    if (process.env.BED === "1") { // after the bed (Ed's decision 10): asleep while the next island's made, then the shorter wake-up
      const seed0 = await page.evaluate(() => window.witch.game.seed);
      await page.evaluate(by => { const g = window.witch.game, th = g.map.treehouse, W = g.witches[0]; W.body = { ...W.body, x: th.x + by[0], z: th.z + by[1], vx: 0, vz: 0, seated: false, perch: true, mode: "ground", lift: 0 }; }, (() => { const o = HOUSE.objects.find(q => q.id === "bed"); return plan(o.x, o.z + o.d / 2 + 0.4); })());
      await page.waitForTimeout(2000);
      await page.keyboard.down("KeyE");
      for (let i = 0; i < 900 && (await page.evaluate(() => window.witch.game.seed)) === seed0; i++) await page.waitForTimeout(1000); // (E held 1.5 s of her clock: minutes of this machine's)
      await page.keyboard.up("KeyE");
      if ((await page.evaluate(() => window.witch.game.seed)) === seed0) fail("the bed didn't end the night");
      await page.waitForTimeout(1500);
      await shot("17-asleep.png");
      for (let i = 0; i < 900 && !(await page.evaluate(() => !!window.witch.game.wake)); i++) await page.waitForTimeout(1000);
      const w2 = await page.evaluate(() => ({ short: window.witch.game.wake?.short, beat: window.witch.game.wake?.beat }));
      log("after the bed:", JSON.stringify(w2));
      if (!w2.short || w2.beat !== "alarm") fail("after the bed she didn't wake in her bedroom, the shorter wake-up");
      await page.waitForTimeout(3000);
      await shot("18-after-bed-alarm.png");
    }
    const marks = await page.evaluate(() => performance.getEntriesByType("mark").filter(m => /^(opening|chart|game):/.test(m.name)).map(m => `${m.name} ${(m.startTime / 1000).toFixed(1)} s`));
    log("marks:\n  " + marks.join("\n  "));
    fs.writeFileSync(path.join(out, "opening.json"), JSON.stringify({ marks }, null, 1));
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  log("ok");
})().catch(e => { console.error(e); process.exit(1); });
