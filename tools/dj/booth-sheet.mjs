// The DJ booth as the game layers it (Ed, 2026-10-06): the treehouse round its studio, her DJ frame stood with its ground
// anchor on the seat anchor, the DJ table's fore frame over her, then her frame's upper layer (art/witch.js aboveDecks) over
// that; one cell per gesture frame, at scale 4, the platters turning and the LEDs chasing with the cells. Also the gestures
// as a GIF's frames (frames written as PNGs to <out>-gif/, for ffmpeg).
//   node tools/dj/booth-sheet.mjs <out.png> [seed: a generated witch instead of ours] [--gif]
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
const args = process.argv.slice(2), gif = args.includes("--gif"), [out = "previews/dj/booth.png", seed] = args.filter(a => !a.startsWith("--"));
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const res = await b.page.evaluate(async ({ seed, gif }) => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), K = 4;
  const her = seed ? (() => { const pw = G.partyWitch(seed); return { look: pw.look, col: pw.colours(st) }; })() : { look: G.genomeLook(G.WITCH_GENOME).look, col: G.witchColours(st) };
  const T = G.treehouseSprite(st), tc = G.treehouseColours(st), seat = T.anchors.seat, house = G.bake(T.bot, tc, st, "none"), fores = T.foreFrames.map(f => G.bake(f, tc, st, "none"));
  const cropW = 120, cropH = 90, cx = Math.round(seat.x - cropW / 2), cy = Math.round(seat.y - cropH * .72);
  const P = G.WITCH_FOOT_POSES.dj, seq = gif ? [...Array(64).keys()].map(i => ({ f: G.djFrame(i / 4, { offset: Math.floor(i / 16) * 2 }), k: Math.floor(i / 2) % G.DJ_FRAMES })) : [...Array(P.frames).keys()].map(f => ({ f, k: f % G.DJ_FRAMES }));
  const cells = [], cache = new Map();
  const frameArt = f => { if (!cache.has(f)) { const sp = G.witchSprite(st, { look: her.look, pose: "dj", frame: f }), up = Object.assign(Object.create(Object.getPrototypeOf(sp)), sp, { m: sp.m.map((v, i) => sp.upper[i] ? v : 0) }); cache.set(f, { sp, full: G.bake(sp, her.col, st, st.cOutline), up: G.bake(up, her.col, st, st.cOutline), g: sp.anchors.ground }); } return cache.get(f); };
  for (const { f, k } of seq) {
    const c = document.createElement("canvas"); c.width = cropW * K; c.height = cropH * K; const g = c.getContext("2d"); g.imageSmoothingEnabled = false; g.fillStyle = "#14101c"; g.fillRect(0, 0, c.width, c.height);
    const A = frameArt(f), wx = Math.round(seat.x - A.g[0]), wy = Math.round(seat.y - A.g[1]);
    const draw = (img, x, y) => g.drawImage(img, (x - cx) * K, (y - cy) * K, img.width * K, img.height * K);
    if (!globalThis.NOHOUSE) draw(house.A, 0, 0); draw(A.full.A, wx, wy); draw(fores[k].A, T.foreBox.x, T.foreBox.y);
    // the upper layer: only its own pixels (its outline where it meets the cut left off: kept where the full frame has it)
    const u = document.createElement("canvas"); u.width = A.up.w; u.height = A.up.h; const ug = u.getContext("2d"); ug.drawImage(A.up.A, 0, 0);
    const d = ug.getImageData(0, 0, u.width, u.height), fd = A.full.A.getContext("2d").getImageData(0, 0, u.width, u.height);
    for (let i = 0; i < u.width * u.height; i++) if (!A.sp.upper[i] && !(A.sp.m[i] === 0 && [1, -1, u.width, -u.width].some(o => A.sp.upper[i + o]))) d.data[i * 4 + 3] = 0; else if (!A.sp.m[i]) d.data.set(fd.data.subarray(i * 4, i * 4 + 4), i * 4);
    ug.putImageData(d, 0, 0); draw(u, wx, wy);
    cells.push(c);
  }
  if (gif) return { frames: cells.map(c => c.toDataURL()) };
  const per = 7, W = per * cropW * K, H = Math.ceil(cells.length / per) * cropH * K, S = document.createElement("canvas"); S.width = W; S.height = H; const sg = S.getContext("2d");
  cells.forEach((c, i) => sg.drawImage(c, (i % per) * cropW * K, Math.floor(i / per) * cropH * K));
  return { sheet: S.toDataURL() };
}, { seed: seed ? +seed : 0, gif });
if (res.sheet) writeFileSync(out, Buffer.from(res.sheet.split(",")[1], "base64"));
else { const dir = out.replace(/\.\w+$/, "") + "-gif"; mkdirSync(dir, { recursive: true }); res.frames.forEach((u, i) => writeFileSync(`${dir}/f${String(i).padStart(3, "0")}.png`, Buffer.from(u.split(",")[1], "base64"))); console.log("frames in", dir); }
await b.close(); console.log("wrote", out);
