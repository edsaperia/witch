// The soundsystem generator's sheet (art/soundsystemGen.js; Ed, 2026-10-08): N generated soundsystems side by side, a made-up
// map's worth (far from 0 by the dancefloor to 1 at the edge, round the compass, each turned as soundsystemYaw turns it and
// sized by soundsystemScale), dealt as one set (soundsystemSet: none alike), on a dark ground at scale K, each labelled with its
// profile, crystal, stone and projector; then three of them through every state: playing, damaged at stages 1 to 3, destroyed.
//   node tools/soundsystem/sheet.mjs <out.png> [seed] [n]
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const [out = "previews/soundsystems.png", seed = "1", n = "24"] = process.argv.slice(2);
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async ([seed, N]) => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), K = 2;
  const list = [...Array(N).keys()].map(i => { const far = i / (N - 1), a = i * 2.39996 + seed; return { seed: seed * 1000 + i * 7919, far, dx: Math.sin(a), dz: Math.cos(a) }; });
  const set = G.soundsystemSet(list), cells = [];
  set.forEach((g, i) => { const L = list[i], yaw = G.soundsystemYaw(L.dx, L.dz), size = G.soundsystemScale(L.far); const r = G.soundsystemGenSprite(st, g, { yaw, size }); cells.push({ b: G.bake(r.sp, G.soundsystemGenColours(g), st, st.cOutline), r, g, yaw, size }); });
  // three stacks through every state: playing, damaged at stages 1 to 3, destroyed
  const extra = [];
  for (const gi of [Math.floor(N * .2), Math.floor(N * .55), N - 1]) { const g0 = set[gi]; for (const [state, stage] of [["playing", 0], ["damaged", 1], ["damaged", 2], ["damaged", 3], ["destroyed", 0]]) extra.push({ g0, label: state === "damaged" ? "stage " + stage : state, r: G.soundsystemGenSprite(st, g0, { yaw: 20, size: 1.2, state, stage }) }); }
  extra.forEach(e => e.b = G.bake(e.r.sp, G.soundsystemGenColours(e.g0), st, st.cOutline));
  const cols = 6, cw = Math.max(...cells.map(c => c.b.w)) * K + 10, ch = Math.max(...cells.map(c => c.b.h)) * K + 34, rows = Math.ceil(N / cols);
  const ew = Math.max(...extra.map(e => e.b.w)) * K + 10, eh = Math.max(...extra.map(e => e.b.h)) * K + 30;
  const W = Math.max(cols * cw, 5 * ew) + 20, H = rows * ch + eh * 3 + 40;
  const c = document.createElement("canvas"); c.width = W; c.height = H; const x = c.getContext("2d"); x.imageSmoothingEnabled = false; x.fillStyle = "#12141c"; x.fillRect(0, 0, W, H);
  x.font = "11px monospace"; x.fillStyle = "#cfd6e4";
  cells.forEach((cc, i) => { const ox = 10 + (i % cols) * cw, oy = 10 + Math.floor(i / cols) * ch; x.drawImage(cc.b.A, ox + (cw - cc.b.w * K) / 2, oy + ch - 26 - cc.b.h * K, cc.b.w * K, cc.b.h * K);
    if (cc.r.projector) { x.fillStyle = "#ff3d7f"; x.fillRect(ox + (cw - cc.b.w * K) / 2 + cc.r.projector.x * K - 1, oy + ch - 26 - cc.b.h * K + cc.r.projector.y * K - 1, 3, 3); x.fillStyle = "#cfd6e4"; }
    x.fillText(`${cc.g.profile} ${cc.g.crystal} ${cc.g.stone}`, ox, oy + ch - 14); x.fillText(`${cc.g.projector} yaw ${Math.round(cc.yaw)} ×${cc.size.toFixed(2)}`, ox, oy + ch - 2); });
  extra.forEach((e, i) => { const ox = 10 + (i % 5) * ew, oy = rows * ch + 30 + Math.floor(i / 5) * eh; x.drawImage(e.b.A, ox, oy + eh - 20 - e.b.h * K, e.b.w * K, e.b.h * K); x.fillText(e.label, ox, oy + eh - 4); });
  return c.toDataURL();
}, [+seed, +n]);
writeFileSync(out, Buffer.from(url.split(",")[1], "base64")); await b.close(); console.log("wrote", out);
