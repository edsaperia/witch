// The creator's new sliders on our witch: scarf length (0 to 3), bag size, backpack size, cloak length and the hat's height and brim
// at the sliders' ends; flying and standing, at the game's size and close up.
//   node tools/witch/sliders-sheet.mjs <out.png>
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async () => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), base = G.genomeLook(G.WITCH_GENOME).look, A = G.WITCH_AXES;
  const cases = [["scarf 0.5", { scarf: true, scarfLength: .5 }], ["scarf 1.5", { scarf: true, scarfLength: 1.5 }], ["scarf 3", { scarf: true, scarfLength: 3 }], ["bag " + A.bagSize[0], { satchel: true, bagSize: A.bagSize[0] }], ["bag " + A.bagSize[1], { satchel: true, bagSize: A.bagSize[1] }],
    ["backpack 1", { backpackSize: 1 }], ["backpack " + A.backpackSize[1], { backpackSize: A.backpackSize[1] }], ["cloak " + A.cloakLength[0], { cloak: "long", cloakLength: A.cloakLength[0] }], ["cloak " + A.cloakLength[1], { cloak: "hooded", cloakLength: A.cloakLength[1] }],
    ["hat tall, wide", { hatHeight: A.hatHeight[1], hatBrim: A.hatBrim[1] }], ["hat short, narrow", { hatHeight: A.hatHeight[0], hatBrim: A.hatBrim[0] }], ["everything at the top", { hatHeight: A.hatHeight[1], hatBrim: A.hatBrim[1], scarf: true, scarfLength: 3, satchel: true, bagSize: A.bagSize[1], backpackSize: A.backpackSize[1], cloak: "hooded", cloakLength: A.cloakLength[1] }]];
  const col = G.witchColours(st, { ...G.DEFAULT_OUTFIT, scarf: [.0, .7, .9], backpack: [.55, .6, .6], satchel: [.08, .6, .55], cloak: [.75, .5, .45] }, { styleHues: false });
  const items = cases.map(([label, ex]) => ({ label, sp: [{ frame: 0 }, { pose: "stand", frame: 0 }, { frame: 0, facing: "away" }].map(o => G.bake(G.witchSprite(st, { ...o, look: { ...base, ...ex } }), col, st, st.cOutline)) }));
  const per = 4, cellW = 400, cellH = 420, W = per * cellW, H = Math.ceil(items.length / per) * cellH;
  const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.fillStyle = "#3d5a3a"; g.fillRect(0, 0, W, H); g.imageSmoothingEnabled = false;
  items.forEach((it, i) => { const x0 = (i % per) * cellW, y0 = Math.floor(i / per) * cellH; g.fillStyle = "#f4ecd8"; g.font = "16px monospace"; g.fillText(it.label, x0 + 8, y0 + 18);
    let x = x0 + 8; for (const s of it.sp) { g.drawImage(s.A, x, y0 + 30, s.w * 2, s.h * 2); x += s.w * 2 + 4; }
    x = x0 + 8; for (const s of it.sp.slice(0, 2)) { g.drawImage(s.A, x, y0 + 180, s.w * 3.4, s.h * 3.4); x += s.w * 3.4 + 6; } });
  return c.toDataURL();
});
writeFileSync(process.argv[2], Buffer.from(url.split(",")[1], "base64")); await b.close();
