// The treehouse v2 (Ed, 2026-10-21: "the treehouse is too small for the witch to move inside"; "she shouldn't use her broom until she
// steps off the balcony, and stop using it when she steps on"; "more of an isometric view") in the built game (DIST, default dist/) at
// 1600×900: walking in each room (`walk-<room>.png`: put by its object on the house's turned plan, a second's walk towards it),
// standing still in the bedroom (`stand-bedroom.png`), the whole bedroom from the game's camera zoomed out (`bedroom-whole.png`), stepping off the balcony's open rim onto her broom (`off-<n>.png`) and flying
// back onto it, landing and walking (`on-<n>.png`). Fails on a page error. ONLY=walk,whole,stand,off,on shoots only those.
//   npm run build && node tools/house/v2-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/ed/treehouse-v2", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const H = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config/house.json"), "utf8"));
const T = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config/tuning.json"), "utf8")).treehouse.house;
const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null, want = k => !ONLY || ONLY.includes(k);
// (the house's plan is turned about the hub: rules/houseRooms.ts fromPlan)
const A = ((H.turn || 0) * Math.PI) / 180, plan = (x, z) => [x * Math.cos(A) + z * Math.sin(A), -x * Math.sin(A) + z * Math.cos(A)];
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&hats=all`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    const put = (x, z, o = {}) => page.evaluate(([x, z, o]) => { const g = window.witch.game, Th = g.map.treehouse; g.witch = { ...g.witch, x: Th.x + x, z: Th.z + z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false, ...o }; }, [x, z, o]);
    const step = (o, n) => page.evaluate(([o, n]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60); }, [o, n]);
    const shot = async name => { await page.screenshot({ path: path.join(outDir, `${name}.png`), timeout: 300000 }); console.log("shot", name); };
    const her = () => page.evaluate(() => { const w = window.witch.game.witch; return `${w.mode} lift ${w.lift.toFixed(2)} perch ${!!w.perch}`; });
    if (want("walk")) for (const r of H.rooms) {
      // from a few metres out from its object, towards it (the side facing the room's middle: rules/houseRooms.ts objectFront)
      const o = H.objects.find(q => q.room === r.id && q.use.kind !== "hats"), cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
      const dx = cx - o.x, dz = cz - o.z, side = Math.abs(dx) > Math.abs(dz), sx = side ? Math.sign(dx) : 0, sz = side ? 0 : Math.sign(dz || 1);
      const far = 4.5, start = plan(o.x + sx * (o.w / 2 + far), o.z + sz * (o.d / 2 + far)), [mx, mz] = plan(-sx, -sz);
      await put(...start);
      await step({}, 60); // (the camera follows her in)
      await step({ moveX: mx, moveZ: mz }, 30);
      await shot(`walk-${r.id}`);
    }
    if (want("whole")) {
      // the whole bedroom from the game's camera (Ed, 2026-10-21: "bedrooms should be larger to fit everything"): her in its middle,
      // the camera zoomed out a step at a time (WHOLE_STEPS, default 3; the game's own zoom, X)
      const b = H.rooms.find(r => r.id === "bedroom");
      await put(...plan((b.x0 + b.x1) / 2, (b.z0 + b.z1) / 2));
      await step({}, 60);
      for (let i = 0; i < Number(process.env.WHOLE_STEPS || 3); i++) await step({ zoom: 1 }, 1), await step({}, 40);
      await step({}, 90);
      await shot("bedroom-whole");
    }
    if (want("stand")) {
      const bed = H.objects.find(q => q.id === "bed");
      await put(...plan(bed.x - bed.w / 2 - 2.2, bed.z + 1.5));
      await step({}, 120);
      await shot("stand-bedroom");
    }
    const bx = 0, bz = T.balcony.out, br = T.balcony.r;
    if (want("off")) {
      // on the balcony, walking west off its open rim (beside the decks' desk there's none): on foot, then the take-off, then flying
      await put(bx - br + 2.4, bz + 1.2);
      await step({}, 90);
      await shot("off-1"); console.log(" ", await her());
      await step({ moveX: -1 }, 22); await shot("off-2"); console.log(" ", await her());
      await step({ moveX: -1 }, 8); await shot("off-3"); console.log(" ", await her());
      await step({ moveX: -1 }, 10); await shot("off-4"); console.log(" ", await her());
      await step({ moveX: -1 }, 40); await shot("off-5"); console.log(" ", await her());
    }
    if (want("on")) {
      // in the treetops west of the balcony, flying east onto it: she lands on it (no button), steps off her broom and walks
      await put(bx - br - 7, bz + 1.2, { mode: "treetop", lift: 1, perch: false });
      await step({}, 60);
      await shot("on-1"); console.log(" ", await her());
      let n = 0;
      while (n < 240 && !(await page.evaluate(() => !!window.witch.game.witch.perch))) { await step({ moveX: 1 }, 2); n += 2; }
      await shot("on-2"); console.log(" ", await her());
      await step({}, 12); await shot("on-3"); console.log(" ", await her());
      await step({}, 30); await shot("on-4"); console.log(" ", await her());
      await step({ moveX: 1, moveZ: -0.4 }, 40); await shot("on-5"); console.log(" ", await her());
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
