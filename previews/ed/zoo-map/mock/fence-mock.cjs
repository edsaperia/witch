// Mock (not for merging): a little gold fence (Ed, 2026-10-26: "Zoo areas, apart from home, should have a little gold fence around
// them, that stop creatures passing"), drawn in the bold pixel style (3 hue-shifted gold tones, a near-black outline, whole art
// pixels) along an island's edge over an in-game frame; and a close-up sheet of a section.
//   node tools/zoo/fence-mock.cjs <frame.png> <out.png> <sheet.png>
const fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [frame, out, sheet] = process.argv.slice(2);
(async () => {
  const b = await playwright.chromium.launch(), p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  const src = "data:image/png;base64," + fs.readFileSync(frame).toString("base64");
  const draw = async (w, h, bg, scene) => p.evaluate(async ([w, h, bg, scene]) => {
    const c = document.createElement("canvas"); c.width = w; c.height = h; const g = c.getContext("2d");
    if (bg) { const im = new Image(); im.src = bg; await im.decode(); g.drawImage(im, 0, 0); } else { g.fillStyle = "#2b3a2c"; g.fillRect(0, 0, w, h); }
    const P = scene.px; // screen px per art pixel
    const C = { o: "#24160a", d: "#8b5a16", m: "#d29b2c", l: "#ffd977", h: "#fff2b8" };
    const px = (x, y, col) => { g.fillStyle = col; g.fillRect(Math.round(x) * P, Math.round(y) * P, P, P); };
    // a section: posts every `gap` art px with ball finials, two rails between; lit from the upper left
    const post = (x, y, H) => {
      for (let j = -1; j <= H; j++) { px(x - 1, y - j, C.o); px(x + 2, y - j, C.o); }
      for (let j = 0; j < H; j++) { px(x, y - j, j > H - 3 ? C.l : C.m); px(x + 1, y - j, C.d); }
      // the ball finial
      const t = y - H - 1; for (const [dx, dy, k] of [[-1, 0, "o"], [2, 0, "o"], [0, 1, "o"], [1, 1, "o"], [-1, -1, "o"], [2, -1, "o"], [0, -2, "o"], [1, -2, "o"], [0, 0, "l"], [1, 0, "m"], [0, -1, "h"], [1, -1, "l"]]) px(x + dx, t + dy, C[k]);
      px(x, y + 1, C.o); px(x + 1, y + 1, C.o);
    };
    const rail = (x0, y0, x1, y1) => {
      const n = Math.max(1, Math.round(Math.abs(x1 - x0)));
      for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n, y = y0 + (y1 - y0) * i / n; px(x, y - 1, C.o); px(x, y, i % 5 === 0 ? C.l : C.m); px(x, y + 1, C.d); px(x, y + 2, C.o); }
    };
    const pts = scene.pts.map(([x, y]) => [x / P, y / P]), H = scene.H;
    for (let i = 0; i < pts.length - 1; i++) { const [a, bb] = [pts[i], pts[i + 1]]; rail(a[0] + 2, a[1] - H * .35, bb[0] - 1, bb[1] - H * .35); rail(a[0] + 2, a[1] - H * .75, bb[0] - 1, bb[1] - H * .75); }
    for (const [x, y] of pts) post(x, y, H);
    if (scene.label) { g.font = "16px monospace"; g.fillStyle = "#fff"; g.strokeStyle = "#000"; g.lineWidth = 3; g.strokeText(scene.label, 16, h - 16); g.fillText(scene.label, 16, h - 16); }
    return c.toDataURL("image/png");
  }, [w, h, bg, scene]);
  // over the frame: along the island's southern edge, an arc across the lower third, posts every 2 m (the witch is about 2 m: ~60 px)
  const pts = []; for (let x = 40; x <= 1250; x += 56) pts.push([x, 470 + 0.00012 * (x - 640) ** 2 - 40 * Math.sin(x / 300)]);
  const a = await draw(1280, 720, src, { px: 4, pts, H: 7, label: "mock: the gold fence along the island's edge (posts 2 m apart, 0.9 m tall); the witch steps over, creatures don't" });
  fs.writeFileSync(out, Buffer.from(a.split(",")[1], "base64"));
  // a close-up: one section at 4x
  const s = await draw(480, 200, null, { px: 8, pts: [[60, 150], [228, 150], [396, 150]], H: 7 });
  fs.writeFileSync(sheet, Buffer.from(s.split(",")[1], "base64"));
  await b.close(); console.log("wrote", out, sheet);
})().catch(e => { console.error(e); process.exit(1); });
