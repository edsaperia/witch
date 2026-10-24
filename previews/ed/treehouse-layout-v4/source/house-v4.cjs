// Renders the treehouse v4 mock (house-v4.html) to PNGs: node house-v4.cjs <out dir>
const fs = require("fs"), path = require("path");
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await pw.chromium.launch(), page = await browser.newPage();
  page.on("pageerror", e => console.error("page error:", e.message));
  await page.goto("file://" + path.join(__dirname, "house-v4.html"));
  const shoot = async (name, opts) => {
    const url = await page.evaluate(o => { window.mock.render(o); return document.getElementById("c").toDataURL("image/png"); }, opts);
    fs.writeFileSync(path.join(out, name), Buffer.from(url.split(",")[1], "base64")); console.log("wrote", name);
  };
  await shoot("1-plan.png", { x0: -80, x1: 74, z0: -110, z1: 52, scale: 2, grid: true, title: "Treehouse v4: the Ent as an old oak (mock, north up; the floor's grain foreshortened 0.41)" });
  await shoot("5-as-the-game-sees-it.png", { x0: -80, x1: 74, z0: -110, z1: 52, scale: 2, labels: true, view: "game", title: "As the game's camera sees it indoors (pitched 24 degrees: depth x 0.41)" });
  await shoot("2-trunk-room.png", { x0: -36, x1: 2, z0: -40, z1: -6, scale: 4, view: "game", title: "A trunk room: the Parlour (as the game sees it)" });
  await shoot("3-branch-join.png", { x0: -72, x1: -26, z0: -36, z1: -6, scale: 4, view: "game", title: "Branch to room: Parlour to Bestiary (as the game sees it)" });
  await shoot("4-terrace.png", { x0: -2, x1: 34, z0: -14, z1: 22, scale: 4, view: "game", title: "The Terrace, redrawn to match: take-off on its open south-east rim" });
  console.log("walk, bed to take-off:", (await page.evaluate(() => window.mock.walk())).toFixed(0), "m");
  await browser.close();
})();
