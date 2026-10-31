// The oak treehouse (Ed, 2026-10-24, the layout v4; config/house/) shot in the built game (DIST, default dist/) at 1600x900: at her decks
// on the Terrace (`terrace.png`) and off them (`terrace-up.png`), in each trunk room (`<id>.png`), in a branch room off each (`<id>.png`), by a locked door, and from
// the treetops over the Terrace (`outside.png`); LABELS=1 names the rooms on their floors; SHOTS=a,b takes only those. Fails on a page error.
//   node tools/house/oak-shots.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path");
const session = require("./shot-session.cjs");
const playwright = require("/opt/node22/lib/node_modules/playwright");
const [outDir = "previews/oak", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const H = require("../../config/house/load.mjs").loadHouse();
const mid = r => [(r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2];
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    await session.install(page);
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&opening=old&loadmist=0${process.env.LABELS ? "&rooms=labels" : ""}`);
    console.log("start", JSON.stringify(await session.start(page)));
    const stand = (x, z) => page.evaluate(([x, z]) => { const g = window.witch.game, T = g.map.treehouse; g.witch = { ...g.witch, x: T.x + x, z: T.z + z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false }; }, [x, z]);
    const step = async (o, n) => console.log("frames", JSON.stringify(await session.step(page, o, n)));
    const shot = async name => { const state = await session.prepareShot(page); fs.writeFileSync(path.join(outDir, `${name}.state.json`), JSON.stringify(state, null, 2)); console.log("capture", name, JSON.stringify(state)); await session.capture(page, { path: path.join(outDir, `${name}.png`), timeout: 300000 }); console.log("shot", name); };
    const at = id => { const r = H.rooms.find(q => q.id === id); return [r.x, r.z]; }, want = n => !process.env.SHOTS || process.env.SHOTS.split(",").includes(n);
    if (want("terrace")) { await step({}, 120); await shot("terrace"); }
    if (want("terrace-up")) { const T = H.terrace; await stand(T.seat.x - 2, T.seat.z - 2); await step({}, 120); await shot("terrace-up"); }
    for (const id of ["dining", "parlour", "boudoir", "bedroom", "turret", "workshop", "kitchen", "cloakroom", "studio", "solarium", "bestiary"]) if (want(id)) { await stand(...at(id)); await step({}, 120); await shot(id); }
    if (want("bedroom2-door")) { const d = H.objects.find(o => o.id === "bedroom2Door"), r = H.rooms.find(q => q.id === "bedroom2"), L = Math.hypot(d.x - r.x, d.z - r.z);
      await stand(d.x + ((d.x - r.x) / L) * 1.6, d.z + ((d.z - r.z) / L) * 1.6); await step({}, 120); await shot("bedroom2-door"); }
    if (want("outside")) { await page.evaluate(() => { const g = window.witch.game, T = g.map.treehouse; g.witch = { ...g.witch, x: T.x + 10, z: T.z + 40, vx: 0, vz: 0, mode: "treetop", lift: 1, perch: undefined, seated: false }; }); await step({}, 120); await shot("outside"); }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
