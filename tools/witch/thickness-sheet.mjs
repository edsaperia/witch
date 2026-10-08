// The broom's thickness on every kind (Ed, 2026-10-06: "It would be nice if the broomstick had a 'thickness' slider as well as
// length"): each kind at the slider's thinnest, hers and its thickest (art/witchGenome.js WITCH_AXES.broomThickness), hovering,
// leaning along (her treetop flight) and standing, at the treetops' size, then leaning at the ground's (2×); and along the
// bottom, party witches (partyWitch, her generator) drawn thin and thick.
//   node tools/witch/thickness-sheet.mjs [out.png] [kind,...]
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
const out = process.argv[2] ?? "previews/creator-sliders/broom-thickness.png";
mkdirSync(path.dirname(out), { recursive: true });
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async only => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), base = G.genomeLook(G.WITCH_GENOME).look, [lo, hi] = G.WITCH_AXES.broomThickness;
  const kinds = only ? only.split(",") : G.WITCH_AXES.broom, col = G.witchColours(st, G.DEFAULT_OUTFIT), T = [lo, 1, hi];
  const per = 3, cellW = 640, cellH = 250, rows = Math.ceil(kinds.length / per), partyH = 200, W = per * cellW, H = rows * cellH + partyH;
  const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.fillStyle = "#24304a"; g.fillRect(0, 0, W, H); g.imageSmoothingEnabled = false;
  kinds.forEach((kind, i) => {
    const x0 = (i % per) * cellW, y0 = Math.floor(i / per) * cellH;
    g.fillStyle = "#f4ecd8"; g.font = "16px monospace"; g.fillText(`${kind}   thickness ×${lo} · ×1 · ×${hi}`, x0 + 10, y0 + 20);
    let x = x0 + 10;
    for (const t of T) {
      const look = { ...base, broom: kind, broomThickness: t };
      const sp = [{ look, frame: 0 }, { look, pose: "lean", frame: 1 }, { look, pose: "stand", frame: 0 }].map(o => G.bake(G.witchSprite(st, o), col, st, st.cOutline));
      let xx = x; for (const s of sp) { g.drawImage(s.A, xx, y0 + 30, s.w, s.h); xx += s.w + 2; }
      const big = sp[1]; g.drawImage(big.A, x, y0 + 110, big.w * 2, big.h * 2);
      x += Math.max(xx - x, big.w * 2) + 14;
    }
  });
  // party witches from her generator, each thinnest then thickest
  const y0 = rows * cellH; g.fillStyle = "#f4ecd8"; g.font = "16px monospace"; g.fillText(`party witches (partyWitch): ×${lo} | ×${hi}`, 10, y0 + 20);
  let x = 10;
  for (const seed of [3, 11, 17, 29, 42, 77]) {
    const P = G.partyWitch(seed), pc = P.colours(st);
    for (const t of [lo, hi]) { const s = G.bake(G.witchSprite(st, { look: { ...P.look, broomThickness: t }, pose: "lean", frame: 1 }), pc, st, st.cOutline); g.drawImage(s.A, x, y0 + 34, s.w * 2, s.h * 2); x += s.w * 2 + 4; }
    x += 16;
  }
  return c.toDataURL();
}, process.argv[3] ?? null);
await b.close();
writeFileSync(out, Buffer.from(url.split(",")[1], "base64"));
console.log(out);
