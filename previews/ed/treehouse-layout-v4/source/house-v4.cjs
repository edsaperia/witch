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
  await shoot("1-plan.png", { x0: -50, x1: 42, z0: -77, z1: 57, scale: 2, grid: true, title: "Treehouse v4: the Ent as an old oak (mock, north up)" });
  await shoot("2-trunk-room.png", { x0: -8, x1: 20, z0: -34, z1: -12, scale: 5, labels: true, title: "A trunk room: the Parlour" });
  await shoot("3-branch-join.png", { x0: 12, x1: 40, z0: -38, z1: -16, scale: 5, labels: true, title: "Branch to room: Parlour to Bestiary" });
  await shoot("4-terrace.png", { x0: -14, x1: 16, z0: -14, z1: 14, scale: 5, labels: true, title: "The Terrace, redrawn to match" });
  console.log("walk, bed to take-off:", (await page.evaluate(() => window.mock.walk())).toFixed(0), "m");
  await browser.close();
})();
