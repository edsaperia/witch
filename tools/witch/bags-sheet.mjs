// Her bags on her (Ed, 2026-10-29: the Bumbag, the purse and the Far bag, config/wardrobe.json's bag shelf): each standing and
// hovering, towards and away, at the game's size (scale 2), then standing close up (scale 5), labelled.
//   node tools/witch/bags-sheet.mjs <out.png>
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async () => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), base = G.genomeLook(G.WITCH_GENOME).look;
  const bags = [["Satchel", { satchel: true }], ["Bumbag", { bumbag: true }], ["Purse", { purse: true }], ["Tote", { tote: true }], ["Duffel", { duffel: true }], ["Briefcase", { briefcase: true }], ["Clutch", { clutch: true }], ["Messenger", { messenger: true }], ["Backpack", { backpackSize: 1 }]];
  const col = G.witchColours(st, G.DEFAULT_OUTFIT);
  const items = bags.map(([name, on]) => { const look = { ...base, satchel: false, bumbag: false, purse: false, tote: false, duffel: false, briefcase: false, clutch: false, messenger: false, backpackSize: 0, ...on };
    return { name, sp: [{ look, pose: "stand", frame: 0 }, { look, frame: 0 }, { look, frame: 0, facing: "away" }].map(o => G.bake(G.witchSprite(st, o), col, st, st.cOutline)) }; });
  const per = 4, cellW = 560, cellH = 460, W = per * cellW, H = Math.ceil(items.length / per) * cellH;
  const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.fillStyle = "#3d5a3a"; g.fillRect(0, 0, W, H); g.imageSmoothingEnabled = false;
  items.forEach((it, i) => { const x0 = (i % per) * cellW, y0 = Math.floor(i / per) * cellH; g.fillStyle = "#f4ecd8"; g.font = "18px monospace"; g.fillText(it.name, x0 + 8, y0 + 22);
    let x = x0 + 8; for (const s of it.sp) { g.drawImage(s.A, x, y0 + 34, s.w * 2, s.h * 2); x += s.w * 2 + 6; }
    const s = it.sp[0], h = it.sp[1]; g.drawImage(s.A, x0 + 8, y0 + 150, s.w * 5, s.h * 5); g.drawImage(h.A, x0 + 20 + s.w * 5, y0 + 150, h.w * 4, h.h * 4); });
  return c.toDataURL();
});
writeFileSync(process.argv[2], Buffer.from(url.split(",")[1], "base64")); await b.close();
