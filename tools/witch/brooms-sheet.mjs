// Every broom kind on our witch (art/brooms.js; Ed, 2026-10-06): hovering towards and away, leaning along, at top speed, braking
// and standing, at the treetops' size (1×) and the ground's (2×), then close up, labelled; each in colours that suit it (the
// creator's Broom box's two pickers: body and trim).
//   node tools/witch/brooms-sheet.mjs <out.png> [kind,...]
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async only => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), base = G.genomeLook(G.WITCH_GENOME).look;
  const kinds = only ? only.split(",") : G.WITCH_AXES.broom;
  // body, trim (hue, saturation, value)
  const COL = { missile: [[.0, .05, .85], [.0, .75, .85]], jetbike: [[.55, .7, .7], [.13, .2, .95]], speeder: [[.08, .25, .75], [.6, .3, .45]], bicycle: [[.0, .75, .8], [.0, 0, .3]], drone: [[.6, .1, .55], [.55, .35, .9]], gyrocopter: [[.14, .75, .9], [.6, .15, .35]],
    canoe: [[.03, .7, .65], [.09, .5, .9]], ladder: [[.07, .5, .55], [.09, .4, .8]], hobbyhorse: [[.07, .5, .5], [.0, .0, .95]], pitchfork: [[.07, .5, .5], [.6, .08, .75]],
    mop: [[.6, .6, .7], [.12, .05, .95]], oar: [[.08, .45, .6], [.08, .5, .85]], handlebars: [[.08, .55, .55], [.0, .7, .7]], curl: [[.08, .55, .55], [.12, .55, .9]] };
  const items = kinds.map(kind => {
    const look = { ...base, broom: kind }, [broom, bristles] = COL[kind] ?? [G.DEFAULT_OUTFIT.broom, G.DEFAULT_OUTFIT.bristles];
    const col = G.witchColours(st, { ...G.DEFAULT_OUTFIT, broom, bristles });
    const sp = [{ look, frame: 0 }, { look, frame: 0, facing: "away" }, { look, pose: "lean", frame: 1 }, { look, pose: "fast", frame: 0 }, { look, pose: "brake", frame: 0 }, { look, pose: "stand", frame: 0 }].map(o => G.bake(G.witchSprite(st, o), col, st, st.cOutline));
    return { kind, sp, big: G.bake(G.witchSprite(st, { look, pose: "lean", frame: 0 }), col, st, st.cOutline) };
  });
  const per = 3, cellW = 620, cellH = 330, W = per * cellW, H = Math.ceil(items.length / per) * cellH;
  const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.fillStyle = "#24304a"; g.fillRect(0, 0, W, H); g.imageSmoothingEnabled = false;
  items.forEach((it, i) => {
    const x0 = (i % per) * cellW, y0 = Math.floor(i / per) * cellH; g.fillStyle = "#f4ecd8"; g.font = "18px monospace"; g.fillText(it.kind, x0 + 10, y0 + 22);
    let x = x0 + 10; for (const s of it.sp) { g.drawImage(s.A, x, y0 + 34, s.w, s.h); x += s.w + 6; } // the treetops' size
    x = x0 + 10; let hmax = 0; for (const s of it.sp.slice(0, 3)) { g.drawImage(s.A, x, y0 + 110, s.w * 2, s.h * 2); x += s.w * 2 + 6; hmax = Math.max(hmax, s.h * 2); } // the ground's
    const s = it.big; g.drawImage(s.A, x0 + cellW - s.w * 3.2 - 10, y0 + 40, s.w * 3.2, s.h * 3.2); // close up
  });
  return c.toDataURL();
}, process.argv[3] ?? null);
writeFileSync(process.argv[2], Buffer.from(url.split(",")[1], "base64")); await b.close();
