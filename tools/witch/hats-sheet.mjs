// Every hat on our witch: hovering (towards and away) and standing, at the game's size (scale 2) then close up (scale 5), labelled.
//   node tools/witch/hats-sheet.mjs <out.png>
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async () => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), base = G.genomeLook(G.WITCH_GENOME).look, hats = G.WITCH_AXES.hatShape;
  const hues = [.0, .08, .13, .3, .45, .55, .62, .72, .8, .9];
  const items = hats.map((hat, i) => { const look = { ...base, hat }, col = G.witchColours(st, { ...G.DEFAULT_OUTFIT, hat: [hues[i % hues.length], .7, .62], pattern: [.13, .1, 1], trim: [hues[(i + 4) % hues.length], .6, .85] }, { styleHues: false });
    return { hat, sp: [{ look, frame: 0 }, { look, frame: 0, facing: "away" }, { look, pose: "stand", frame: 0 }].map(o => G.bake(G.witchSprite(st, o), col, st, st.cOutline)) }; });
  const per = 6, cellW = 300, cellH = 330, W = per * cellW, H = Math.ceil(items.length / per) * cellH;
  const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.fillStyle = "#3d5a3a"; g.fillRect(0, 0, W, H); g.imageSmoothingEnabled = false;
  items.forEach((it, i) => { const x0 = (i % per) * cellW, y0 = Math.floor(i / per) * cellH; g.fillStyle = "#f4ecd8"; g.font = "16px monospace"; g.fillText(it.hat, x0 + 8, y0 + 18);
    let x = x0 + 8; for (const s of it.sp) { g.drawImage(s.A, x, y0 + 30, s.w * 2, s.h * 2); x += s.w * 2 + 4; }
    const s = it.sp[0]; g.drawImage(s.A, x0 + 8, y0 + 140, s.w * 3.6, s.h * 3.6); });
  return c.toDataURL();
});
writeFileSync(process.argv[2], Buffer.from(url.split(",")[1], "base64")); await b.close();
