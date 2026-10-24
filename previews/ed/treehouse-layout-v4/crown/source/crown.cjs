// Renders the oak crown mock (house-v4.html + crown.js) to PNGs: node crown.cjs <out dir> [which...]
const fs = require("fs"), path = require("path");
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const out = process.argv[2], only = process.argv.slice(3); fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await pw.chromium.launch(), page = await browser.newPage();
  page.on("pageerror", e => console.error("page error:", e.message)); page.on("console", m => console.log("page:", m.text()));
  await page.goto("file://" + path.join(__dirname, "../../source/house-v4.html"));
  const save = async name => { const url = await page.evaluate(() => document.getElementById("c").toDataURL("image/png")); fs.writeFileSync(path.join(out, name), Buffer.from(url.split(",")[1], "base64")); console.log("wrote", name); };
  const want = n => !only.length || only.some(o => n.startsWith(o));
  const inside = async (name, crown, opts) => { if (!want(name)) return; await page.evaluate(([c, o]) => { window.crownSet(c); window.mock.render(o); }, [crown, opts]); await save(name); };
  const outside = async (name, opts) => { if (!want(name)) return; await page.evaluate(o => window.outside(o), opts); await save(name); };
  const A1 = { pitch: 35, cx: 0, cy: 30, cz: -40, s: 2.8, W: 900, H: 620, scale: 2 };
  await outside("a1-outside-lights-off.png", { ...A1, lights: 0, title: "The great oak from outside at night, the flying camera: before the party, its string lights off" });
  await outside("a1-outside-lights-switching-on.png", { ...A1, lights: .45, title: "The party starts at the decks: the string lights switching on, running along each string" });
  await outside("a1-outside-lights-on.png", { ...A1, lights: 1, title: "The party's on: the crown strewn with colourful string lights" });
  await outside("a1-outside-lights-on-near.png", { pitch: 40, cx: -30, cy: 34, cz: 10, s: 7, W: 800, H: 500, scale: 2, lights: 1, title: "Nearer, the lights on: swags under the limbs, strings draped from clump to clump" });
  await outside("a2-outside-landing.png", { pitch: 50, cx: 14, cy: 32, cz: 14, s: 8, W: 800, H: 560, scale: 2, her: [17, 38, 21], holeR: 13, lights: 1, title: "Coming in to land from the treetops: the hole round her, the Terrace's take-off open to the sky" });
  await inside("b1-inside-trunk-room.png", { her: [-4, -14], holeR: 8, lights: true }, { x0: -32, x1: 20, z0: -46, z1: 12, scale: 3, view: "game", furniture: false, labels: false, walls: true, title: "Inside (as the game sees it): the Parlour under the crown, the hole round her, the party's lights glowing in the crown" });
  await inside("b2-inside-branch.png", { her: [-24, -24], holeR: 7, lights: true }, { x0: -56, x1: 4, z0: -50, z1: 8, scale: 3, view: "game", furniture: false, labels: false, walls: true, title: "Inside: out on the branch from the Parlour to the Solarium" });
  await outside("c-closeup-patches.png", { patch: true, pitch: 50, cx: 0, cy: 3, cz: -3, s: 13, W: 640, H: 400, scale: 3, title: "Close-up: thick clumps, thin gappy sprays, the oak's furrowed limbs through the gaps" });
  await browser.close();
})();
