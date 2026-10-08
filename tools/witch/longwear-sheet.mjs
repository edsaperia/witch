// The longest cloak and scarf (Ed, 2026-10-06: "allow a longer cloak and a longer scarf"): our witch in a long cloak and a scarf at
// the old ends of their sliders (cloak ×2.4, scarf ×3) and the new (cloak ×6, scarf ×7), hovering, leaning along (its frames: the
// flutter), rising, descending, braking, standing, sitting at the decks, dancing and sitting on the ground, at the treetops' size
// (1×) and the ground's (2×). Writes <out.png>.
//   node tools/witch/longwear-sheet.mjs <out.png>
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async () => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), base = G.genomeLook(G.WITCH_GENOME).look, A = G.WITCH_AXES;
  const col = G.witchColours(st, { ...G.DEFAULT_OUTFIT, cloak: [.78, .55, .45], scarf: [.98, .6, .9] });
  const rows = [["as a generated witch's (cloak ×1.4, scarf ×1.5)", { cloakLength: 1.4, scarfLength: 1.5 }], ["old ends (cloak ×2.4, scarf ×3)", { cloakLength: 2.4, scarfLength: 3 }], [`new ends (cloak ×${A.cloakLength[1]}, scarf ×${A.scarfLength[1]})`, { cloakLength: A.cloakLength[1], scarfLength: A.scarfLength[1] }]];
  const poses = [[{ frame: 0 }, "hover"], [{ frame: 0, facing: "away" }, "away"], [{ pose: "lean", frame: 0 }, "lean 0"], [{ pose: "lean", frame: 1 }, "lean 1"], [{ pose: "lean", frame: 2 }, "lean 2"], [{ pose: "rise", frame: 0 }, "rise"], [{ pose: "descend", frame: 0 }, "descend"], [{ pose: "brake", frame: 0 }, "brake"],
    [{ pose: "stand", frame: 0 }, "stand"], [{ pose: "sit", frame: 0 }, "sit"], [{ pose: "twoStep", frame: 1 }, "dance"], [{ pose: "spin", frame: 1 }, "spin"], [{ pose: "sitGround", frame: 0 }, "on the ground"]];
  const sheets = rows.map(([name, ex]) => ({ name, sp: poses.map(([o, label]) => ({ label, s: G.bake(G.witchSprite(st, { ...o, look: { ...base, cloak: "long", scarf: true, ...ex } }), col, st, st.cOutline) })) }));
  const cellW = 200, W = poses.length * cellW + 20, rowH = 360, H = rows.length * rowH;
  const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.imageSmoothingEnabled = false; g.fillStyle = "#24304a"; g.fillRect(0, 0, W, H);
  sheets.forEach((r, i) => {
    const y0 = i * rowH; g.fillStyle = "#f4ecd8"; g.font = "18px monospace"; g.fillText(r.name, 10, y0 + 22);
    r.sp.forEach(({ label, s }, j) => {
      const x0 = 10 + j * cellW; g.font = "12px monospace"; g.fillStyle = "#c9c0dd"; g.fillText(label, x0, y0 + 42);
      g.fillStyle = "#2f5038"; g.fillRect(x0, y0 + 50 + 90 - 4, cellW - 10, 4); g.drawImage(s.A, x0, y0 + 50 + 90 - s.h, s.w, s.h); // the treetops' size, on a ground line
      g.fillRect(x0, y0 + 340, cellW - 10, 4); g.drawImage(s.A, x0, y0 + 340 - s.h * 2, s.w * 2, s.h * 2); // the ground's
    });
  });
  return c.toDataURL();
});
writeFileSync(process.argv[2], Buffer.from(url.split(",")[1], "base64")); await b.close();
