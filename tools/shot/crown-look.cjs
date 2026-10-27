// The great oak's crown's look, a mock for Ed (the coordinator, 2026-10-27, from Ed's feedback: "the string lights are too dense on
// the treehouse", "the whole crown is mud ... doesn't feel integrated with the house interior"): from the built game, the same views
// with the crown's knobs set live (the tuning's treehouse.house.crown lights and warm; stringLights.more for the party areas).
//   lights-<1|0.5|0.25>-<view>.png   the crown's strings of lights at today's density, half and a quarter (the Terrace, on approach)
//   look-<before|after>-<view>.png   the house's warm light up into the crown, off and on (a room, the Terrace, on approach in flight)
//   wrap-<0|1|2>-<view>.png          the crown's lights as they are and wound round it in one or two strands (Ed's spiral; from above,
//                                    on approach, the Terrace: ONLY=wrap)
//   AS=<name>: <name>-<view>.png     the three views as the build's own tuning has them (ONLY=as; a build of the base branch and one
//                                    of a change, for before and after frames: DIST=)
//   party-<1|2>-dancefloor.png       the party areas' runs of lights as tuned and twice as many (on foot under the home area's first run)
// then times drawn frames before and after the look at each view (cost.json: relative only, the cloud's software renderer).
//   npm run build && node tools/shot/crown-look.cjs [out dir]   (SEED=160271, SIZE=1900x1240, ROOM=parlour, WARM=1, AS=,
//   FRAMES=4 timed a variant, ROUNDS=3 of each (the median), ONLY=lights,look,party,cost, DIST=dist)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const SEED = process.env.SEED || "160271", [W, H] = (process.env.SIZE || "1900x1240").split("x").map(Number), ROOM = process.env.ROOM || "parlour";
const WARM = Number(process.env.WARM ?? 1), AS = process.env.AS || "", FRAMES = Number(process.env.FRAMES ?? 4), ROUNDS = Number(process.env.ROUNDS ?? 3);
const ONLY = new Set((process.env.ONLY || (process.env.AS ? "as" : "lights,look,party,cost")).split(","));
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/shot/crown-look"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?shot=room:terrace&seed=${SEED}&tilt=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.evaluate(() => { window.witch.manual = true; });
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 }).catch(() => {}); }
    const said = await page.evaluate(() => window.witch.lastShot ?? window.witch.shot("room:terrace"));
    if (!said.ok) throw new Error(said.say);
    // (the island counted ready, so the forest stands behind the house: window.witch.frame doesn't run main.ts's latch)
    await page.evaluate(() => { window.witch.game.islandReady = true; const d = window.witch.tuning.treehouse.house.dark; if (d) d.reveal = 0.5; });
    const step = (n, c = {}) => page.evaluate(([n, c]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...c }, 1 / 60, i === n - 1 || i % 6 === 5); }, [n, c]);
    const settle = async () => { for (let round = 0, calm = 0; calm < 2 && round < 60; round++) { await step(10); if ((await page.evaluate(() => window.witch.view.assets.pending)) === 0) calm++; else { calm = 0; await page.waitForTimeout(1500); } } await step(30); };
    const knobs = k => page.evaluate(k => { const t = window.witch.tuning, C = t.treehouse.house.crown; for (const n of ["lights", "warm", "wrap"]) if (k[n] !== undefined) C[n] = k[n]; if (k.more !== undefined && t.stringLights.more !== k.more) { t.stringLights.more = k.more; window.witch.view.strings.clear(); } }, k);
    const map = await page.evaluate(() => { const m = window.witch.game.map; return { th: m.treehouse, df: m.dancefloor }; });
    // the views: a room (the shot's own placing), the Terrace, on approach in flight (south of the oak in the treetops, coming in)
    const VIEWS = {
      room: () => page.evaluate(id => window.witch.shot(`room:${id}`), ROOM),
      terrace: () => page.evaluate(() => window.witch.shot("room:terrace")),
      // (from above: in the treetops over the oak's middle, looking down on its crown)
      above: () => page.evaluate(() => { const g = window.witch.game, T = g.map.treehouse, b = g.witches[0].body; g.witches[0].body = { ...b, x: T.x - 10, z: T.z - 5, vx: 0, vz: 0, mode: "treetop", lift: 1, perch: false, seated: false }; }),
      approach: () => page.evaluate(() => { const g = window.witch.game, T = g.map.treehouse, b = g.witches[0].body; g.witches[0].body = { ...b, x: T.x + 6, z: T.z + 46, vx: 0, vz: 0, mode: "treetop", lift: 1, perch: false, seated: false }; }),
      // (the party area's runs of lights hang under its trees' crowns, only specks from the treetops: on foot a little south of the
      // middle of its first run's lines, as the game hung them)
      dancefloor: () => page.evaluate(({ df }) => { const g = window.witch.game, b = g.witches[0].body, S = window.witch.view.strings;
        const lines = [...(S.built?.values() ?? [])].flatMap(v => v.lines ?? []), mid = lines.length ? lines.slice(0, 6).reduce((m, l, _, A) => ({ x: m.x + (l.ax + l.bx) / (2 * A.length), z: m.z + (l.az + l.bz) / (2 * A.length) }), { x: 0, z: 0 }) : { x: df.x, z: df.z };
        g.witches[0].body = { ...b, x: mid.x, z: mid.z + 6, vx: 0, vz: 0, mode: "ground", lift: 0, perch: false, seated: false }; return lines.length; }, map),
    };
    const shot = async name => { await settle(); await page.screenshot({ path: path.join(out, name + ".png"), timeout: 300000 }); log(name); };
    log("map", JSON.stringify(map), ROOM);
    if (AS) for (const v of ["room", "terrace", "approach"]) { await VIEWS[v](); await shot(`${AS}-${v}`); }
    // (the lights wound round the crown in strands, Ed's spiral, against its strings as they are: wrap 0, 1 and 2)
    // (WRAP_VIEWS=above,approach,terrace and WRAP_N=0,1,2 by default: a run's own share, as the cloud's renderer allows)
    if (ONLY.has("wrap")) for (const v of (process.env.WRAP_VIEWS || "above,approach,terrace").split(",")) { await VIEWS[v](); for (const n of (process.env.WRAP_N || "0,1,2").split(",").map(Number)) { await knobs({ wrap: n }); await shot(`wrap-${n}-${v}`); } }
    if (ONLY.has("lights")) for (const v of ["terrace", "approach"]) { await VIEWS[v](); for (const d of [1, 0.5, 0.25]) { await knobs({ lights: d, warm: 0 }); await shot(`lights-${d}-${v}`); } }
    if (ONLY.has("look")) for (const v of ["room", "terrace", "approach"]) { await VIEWS[v](); for (const [n, k] of [["before", { lights: 1, warm: 0 }], ["after", { lights: 1, warm: WARM }]]) { await knobs(k); await shot(`look-${n}-${v}`); } }
    if (ONLY.has("party")) log("party areas", JSON.stringify(await page.evaluate(() => { const g = window.witch.game, S = window.witch.view.strings; return { areas: [...g.party.areas.keys()], built: [...(S.built?.entries() ?? [])].map(([k, v]) => [k, v.lines?.length]) }; })));
    if (ONLY.has("party")) { await VIEWS.dancefloor(); for (const m of [1, 2]) { await knobs({ lights: 1, warm: 0, more: m }); await shot(`party-${m}-dancefloor`); } await knobs({ more: 1 }); }
    if (ONLY.has("cost")) {
      // drawn frames, the look off and on in turn at each view (ABAB, so a drift over the run falls on both)
      const cost = {};
      // (each frame timed on its own: now and then one comes back in a few milliseconds, not really drawn, and is left out)
      const timed = () => page.evaluate(n => { const w = window.witch, t = []; for (let i = 0; i < n; i++) { const a = performance.now(); w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, true); t.push(performance.now() - a); } return t; }, FRAMES);
      for (const v of ["room", "terrace", "approach"]) {
        await VIEWS[v](); await knobs({ lights: 1, warm: 0 }); await settle();
        const r = { before: [], after: [] };
        for (let i = 0; i < ROUNDS; i++) for (const [n, k] of [["before", { warm: 0 }], ["after", { warm: WARM }]]) { await knobs(k); await timed(); r[n].push(...(await timed()).filter(ms => ms > 100)); }
        // (the median of the rounds: now and then a round's frames come back far quicker than any other, a frame not really drawn)
        const mid = a => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)];
        cost[v] = { before: +mid(r.before).toFixed(1), after: +mid(r.after).toFixed(1), change: +((mid(r.after) / mid(r.before) - 1) * 100).toFixed(1), rounds: r };
        log("cost", v, JSON.stringify(cost[v]));
      }
      fs.writeFileSync(path.join(out, "cost.json"), JSON.stringify({ size: `${W}x${H}`, frames: FRAMES, warm: WARM, ms: cost }, null, 2));
    }
  } finally { await browser.close(); server.close(); }
  console.log(errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "no page errors");
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
