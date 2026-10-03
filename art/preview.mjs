// Renders preview sheets of the art, lit by the lab's lighting pass under even "studio"
// light, enlarged with crisp pixels, for review on the PR.
//   node art/preview.mjs animals wolf,boar,owl art/previews/animals.png [scale]
//   node art/preview.mjs trees all art/previews/trees.png [scale]
//   node art/preview.mjs areas all art/previews/areas.png [scale]
//   node art/preview.mjs decor ruins|rocks|freak|<ids> art/previews/ruins.png [scale]   (VARIANTS=1: ruins weathered and overgrown)
//   node art/preview.mjs lake 0 art/previews/lake.png [scale]   (a sample lake composed from the kit; NIGHT=1)
//   node art/preview.mjs witch all art/previews/witch-flight.png [scale]   ("fast" instead of all: hover, lean and the fast pose)
//   node art/preview.mjs treeheights fern-forest,garden art/previews/tree-heights.png [scale]
//   node art/preview.mjs lights all art/previews/light-sources.png [scale]
//   node art/preview.mjs party wolf,fox,owl art/previews/party.png [scale]
//   node art/preview.mjs sigils all art/previews/sigils.png [scale]
//   node art/preview.mjs soundsystems all art/previews/soundsystems.png [scale]
// Optional env LEVELS=1,0 draws only those levels; FACINGS=towards,away one row per view; TREES=wBroad,wFir only those kinds.
// Optional env SIGIL=stag adds soundsystems carved with that creature's sigil; for lights, a list of species carves stones with their sigils.
// Optional env SMALL=1 with sigils and a list draws each at the four levels at 30, 20, 14 and 10 px (plain and neon), as in the stack.
// Optional env DRAWON=1 with sigils and a list draws each one on the ground through its draw-on.
// Optional env STYLE='{"ambient": .1}' overrides style knobs.
// Optional env NIGHT=1 lights the sheet with the style's night (as in the game) instead of even studio light.
// Optional env GEN=<path from repo root> renders with another copy of the generator (for "before" images).
import { writeFileSync } from "node:fs";
import { openBrowser } from "./headless.mjs";

const [what = "animals", list = "wolf,boar,owl", out = "art/previews/preview.png", scale = "3"] = process.argv.slice(2);
const gen = process.env.GEN || "/art/generator.js", lighting = process.env.LIGHT || "/art/lighting.js";
const b = await openBrowser();
if (process.env.TREES) await b.page.addInitScript(l => { window.TREES = l; }, process.env.TREES.split(","));
if (process.env.FACINGS) await b.page.addInitScript(l => { window.FACINGS = l; }, process.env.FACINGS.split(","));
if (process.env.SIGIL) await b.page.addInitScript(l => { window.SIGIL = l; }, process.env.SIGIL);
if (process.env.SMALL) await b.page.addInitScript(() => { window.SMALL = true; });
if (process.env.DRAWON) await b.page.addInitScript(() => { window.DRAWON = true; });
if (process.env.STYLE) await b.page.addInitScript(o => { window.STYLE = o; }, JSON.parse(process.env.STYLE));
if (process.env.NIGHT) await b.page.addInitScript(() => { window.NIGHT = true; });
if (process.env.VARIANTS) await b.page.addInitScript(() => { window.VARIANTS = true; });
if (process.env.LEVELS) await b.page.addInitScript(l => { window.LEVELS = l; }, process.env.LEVELS.split(",").map(Number));
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async ({ gen, lighting, what, list, scale }) => {
  const G = await import(gen), { shade } = await import(lighting);
  const st = { ...G.defaultStyle(), ...(window.STYLE || {}) };
  const studio = { ...st, ambient: .55, ambientHue: .15, moon: .9, moonHue: .15, shafts: 0 };
  const rows = [];
  if (what === "sigils") { // every sigil, flat and on the ground (drawn), glowing on a dark ground, with its name
    const S = await import(gen.replace("generator.js", "sigils.js"));
    if (window.SMALL) { // small sizes, as in the stack: each sigil at baby, young, adult, legend, drawn at 30, 20, 14 and 10 px, plain (as the prototype's atlas) and neon
      const ids = list.split(","), sizes = [30, 20, 14, 10], cw = 34, W = 8 + ids.length * (4 * cw + 12), H = 8 + sizes.length * 2 * (cw + 2);
      const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.fillStyle = "#0e0c14"; g.fillRect(0, 0, W, H);
      ids.forEach((id, n) => sizes.forEach((sz, r) => [false, true].forEach((glow, k) => [0, 1, 2, 3].forEach(level => S.drawSigil(g, id, { x: 8 + n * (4 * cw + 12) + level * cw + (cw - sz) / 2, y: 8 + (r * 2 + k) * (cw + 2) + (cw - sz) / 2, size: sz, level, glow, colour: glow ? undefined : [255, 255, 255] })))));
      const big = document.createElement("canvas"); big.width = W * scale; big.height = H * scale; const bg = big.getContext("2d"); bg.imageSmoothingEnabled = false; bg.drawImage(c, 0, 0, W * scale, H * scale);
      return big.toDataURL("image/png");
    }
    if (window.DRAWON) { // the draw-on: each listed sigil on the ground at moments through its writing, then glowing
      const ids = list.split(","), ts = [.08, .16, .26, .36, .46, .6, 1.4], ppm = 22, D = S.sigilFrame(1).metres * ppm, gw = D + 6, gh = Math.ceil(D * Math.sin(S.GROUND_PITCH)) + 6, W = ts.length * (gw + 8) + 8, H = ids.length * (gh + 8) + 8;
      const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.fillStyle = "#14121c"; g.fillRect(0, 0, W, H);
      ids.forEach((id, r) => { const gs = S.groundSigil(id, { level: 1, pxPerMetre: ppm }); ts.forEach((t, k) => g.drawImage(S.paintSigilField(gs, t), 8 + k * (gw + 8), 8 + r * (gh + 8))); });
      const big = document.createElement("canvas"); big.width = W * scale; big.height = H * scale; const bg = big.getContext("2d"); bg.imageSmoothingEnabled = false; bg.drawImage(c, 0, 0, W * scale, H * scale);
      return big.toDataURL("image/png");
    }
    // each species: baby, young, adult, legend flat (the vector form), then on the ground (the pixel leashing rune, at its level's size)
    const ids = list === "all" ? S.SIGIL_IDS : list.split(","), cols = 2, ppm = 13, flat = 56, lh = Math.ceil(S.sigilFrame(3).metres * ppm * Math.sin(S.GROUND_PITCH)) + 6;
    const bw = 4 * (flat + 4) + [0, 1, 2, 3].reduce((a, l) => a + S.sigilFrame(l).metres * ppm + 10, 0) + 90, rh = Math.max(flat, lh) + 8, rowsN = Math.ceil(ids.length / cols);
    const W = cols * bw, H = rowsN * rh + 6, c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d"); g.fillStyle = "#0e0c14"; g.fillRect(0, 0, W, H); g.imageSmoothingEnabled = false;
    ids.forEach((id, n) => {
      let x = (n % cols) * bw + 6; const y = Math.floor(n / cols) * rh + 4;
      g.fillStyle = "#cfc6e0"; g.font = "12px sans-serif"; g.textAlign = "left"; g.fillText(G.SPECIES_BY_ID[id].name, x, y + rh / 2 + 4); x += 84;
      for (const level of [0, 1, 2, 3]) { S.drawSigil(g, id, { x, y: y + (rh - 8 - flat) / 2, size: flat, level }); x += flat + 4; }
      g.globalCompositeOperation = "lighter";
      for (const level of [0, 1, 2, 3]) { const f = S.groundSigil(id, { level, pxPerMetre: ppm }); g.drawImage(S.paintSigilField(f, S.SIGIL_DRAW_TIME + .8), Math.round(x), Math.round(y + (rh - 8 - f.h) / 2)); x += f.w + 6; }
      g.globalCompositeOperation = "source-over";
    });
    const big = document.createElement("canvas"); big.width = W * scale; big.height = H * scale;
    const bg = big.getContext("2d"); bg.imageSmoothingEnabled = false; bg.drawImage(c, 0, 0, W * scale, H * scale);
    return big.toDataURL("image/png");
  }
  if (what === "party") { // each listed species in party gear (a different mix per row, all items on the first) at baby, young and adult, towards then away; then woken
    const S = await import(gen.replace("generator.js", "sigils.js")), ids = list.split(",");
    ids.forEach((id, n) => {
      const gear = n === 0 ? { collar: S.sigilColour(id), hat: 0, glasses: "bar", shoes: "sneakers" } : { ...G.partyGear(n * 3 + 1, S.sigilColour(id)), ...(n % 3 === 1 ? { hat: n % 3, shoes: "platform" } : n % 3 === 2 ? { glasses: ["star", "heart"][n % 2], shoes: "glitter" } : { hat: 2, glasses: "bar" }) };
      const row = [];
      for (const facing of ["towards", "away"]) for (const l of [2, 1, 0]) row.push(G.bake(G.critter(id, l, 0, st, facing, gear), G.speciesColours(id, st, gear), st, st.cOutline));
      const woken = { woken: true }; row.push(G.bake(G.critter(id, 1, 0, st, "towards", woken), G.speciesColours(id, st, woken), st, st.cOutline));
      rows.push(row);
    });
  } else if (what === "animals") {
    const ids = list === "all" ? G.SPECIES.map(s => s.id) : list.split(",");
    for (const id of ids) for (const facing of window.FACINGS || ["towards"]) rows.push((window.LEVELS || [3, 2, 1, 0]).flatMap(l => [0, 1].map(f => G.bake(G.critter(id, l, f, st, facing), G.speciesColours(id, st), st, st.cOutline))));
  } else if (what === "witch") { // per facing: the ordinary hover frame, then rise (two frames) and descend (two frames)
    const wc = G.witchColours(st), b = o => G.bake(G.witchSprite(st, o), wc, st, st.cOutline);
    for (const facing of ["towards", "away"]) rows.push(list === "fast" ? [b({ facing }), b({ facing, lean: true }), ...[0, 1, 2].map(frame => b({ facing, pose: "fast", frame })), ...[0, 1].map(frame => b({ facing, pose: "brake", frame }))] // hover, lean, fast's three frames, brake's two
      : [b({ facing }), b({ facing, pose: "rise", frame: 0 }), b({ facing, pose: "rise", frame: 1 }), b({ facing, pose: "descend", frame: 0 }), b({ facing, pose: "descend", frame: 1 })]);
  } else if (what === "treeheights") { // per area: its tree variants, saplings to the giant, then the witch for scale
    const wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline);
    for (const id of list.split(",")) rows.push([...G.areaTreeVariants(id, st).map(v => v.whole), wit]);
  } else if (what === "lights") { // the campfire's frames, the magic stones, the pond
    const L = G.lightProps(st); rows.push([...L.campfire, ...Object.values(L.stones), L.pond]);
    if (list !== "all") rows.push(list.split(",").map((id, i) => G.runeStone(st, { glow: ["cyan", "violet", "green"][i % 3], sigil: id }))); // stones carved with these creatures' sigils
  } else if (what === "soundsystems") { // per variant: three playing frames, two damaged, destroyed, and the witch for scale
    for (let v = 0; v < G.SOUNDSYSTEMS.length; v++) { if (list !== "all" && !list.split(",").includes(String(v))) continue; const col = G.soundsystemColours(v), b = o => G.bake(G.soundsystemSprite(st, { variant: v, ...o }), col, st, "none"); rows.push([b({ frame: 0 }), b({ frame: 1 }), b({ frame: 2 }), b({ state: "damaged", frame: 0 }), b({ state: "damaged", frame: 1 }), b({ state: "destroyed" }), G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline)]); }
    if (window.SIGIL) rows.push(G.SOUNDSYSTEMS.map((S, v) => G.bake(G.soundsystemSprite(st, { variant: v, sigil: window.SIGIL }), G.soundsystemColours(v), st, "none"))); // carved with a creature's sigil
  } else if (what === "lake") { // a sample lake composed from the kit, as the prototype would: a blob of overlapping circles, water inside, the shore band across the edge, reeds and lilies along it, rocks half in
    const K = G.lakeKit(st), col = K.colours, bk = sp => G.bake(sp, col, st, "none"), W = 300, H = 170, cs = [[150, 85, 95], [95, 95, 55], [215, 75, 55], [170, 110, 60]];
    const sd = (x, y) => Math.min(...cs.map(([cx, cy, r]) => Math.hypot(x - cx, (y - cy) * 1.7) - r)); // ground seen at an angle: squashed in y
    const ground = new G.Sprite(W, H), band = 14;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const d = sd(x, y), c = cs.reduce((a, b) => Math.hypot(x - a[0], y - a[1]) < Math.hypot(x - b[0], y - b[1]) ? a : b), u = Math.floor((Math.atan2(y - c[1], x - c[0]) + Math.PI) * 40) & 63;
      if (d < -band / 2) { const i = (y % 48) * 64 + (x % 64); ground.px(x, y, K.water.m[i], K.water.n[i * 3], K.water.n[i * 3 + 1], K.water.n[i * 3 + 2]); }
      else if (d < band / 2) { const v = Math.min(15, Math.floor((d + band / 2) / band * 16)), i = v * 64 + u; ground.px(x, y, K.shore.m[i], 0, -.42, .9); }
      else ground.px(x, y, (x * 7 + y * 13) % 11 ? G.M.LEAF : G.M.LEAF2, 0, -.42, .9);
    }
    const tgt = document.createElement("canvas"); tgt.width = W; tgt.height = H; const base = bk(ground);
    const cA = base.A.getContext("2d"), cN = base.N.getContext("2d"), put = (s2, x, y) => { cA.drawImage(s2.A, Math.round(x - s2.w / 2), Math.round(y - s2.h)); cN.drawImage(s2.N, Math.round(x - s2.w / 2), Math.round(y - s2.h)); };
    const edge = []; for (let a = 0; a < 6.283; a += .09) for (let r = 0; r < 200; r += 1) { const x = 150 + Math.cos(a) * r, y = 85 + Math.sin(a) * r / 1.7; if (sd(x, y) > 0) { edge.push([x, y, a]); break; } }
    edge.forEach(([x, y], i) => { if (i % 5 === 0) put(bk(K.reeds[i % 3]), x + 6, y + 4); else if (i % 7 === 3) put(bk(K.lilies[i % 3]), x - (x - 150) * .12, y - (y - 85) * .2 + 3); else if (i % 11 === 5) put(G.bake(G.decorSprite("pair", st).whole, G.decorColours(st), st, "none"), x, y + 4); });
    const wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline); put(wit, 150, 80);
    rows.push([base]);
  } else if (what === "decor") { // a family's decorations (ruins, rocks, freak) or listed ids, six to a row, the witch closing each row; ruins in both conditions with VARIANTS=1
    const ids = ["ruins", "rocks", "freak"].includes(list) ? G.DECOR.filter(d => d.family === list).map(d => d.id) : list.split(","), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline), col = G.decorColours(st);
    const items = ids.flatMap(id => (window.VARIANTS ? [0, 1] : [0]).map(variant => G.bake(G.decorSprite(id, st, { variant }).whole, col, st, "none")));
    for (let i = 0; i < items.length; i += 6) rows.push([...items.slice(i, i + 6), wit]);
  } else if (what === "areas") { // per area type: floor tile, walls, small, big, set piece, its creature (young)
    const ids = list === "all" ? G.AREAS.map(a => a.id) : list.split(",");
    for (const id of ids) { const a = G.areaAssets(id, st); rows.push([a.floor, ...a.walls, ...a.small, ...a.big, ...(a.setPiece ? [a.setPiece] : [])].map(x => x.sp).concat([G.bake(G.critter(a.def.creature, 1, 0, st), G.speciesColours(a.def.creature, st), st, st.cOutline)])); }
  } else {
    const K = 2 / (st.pixel || 2), r = G.rng(7), types = G.TREE_TYPES;
    const n = list === "all" ? 2 : +list;
    for (let k = 0; k < n; k++) rows.push(types.filter(([key]) => !window.TREES || window.TREES.includes(key)).map(([key, f], i) => { const tr = G.rng(100 * k + i + 1), ast = { ...st }, t = G.finishTree(f(tr, ast, st.treeSize * K * G.uni(tr, .9, 1.1)), ast, tr); return G.bake(t.sp, G.treeColours(tr, ast, f), st); }));
  }
  const gap = 6, w = Math.max(...rows.map(r => r.reduce((a, s) => a + s.w + gap, gap))), rh = rows.map(r => Math.max(...r.map(s => s.h)) + gap), h = rh.reduce((a, v) => a + v, gap);
  const mk = () => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
  const A = mk(), N = mk(), a = A.getContext("2d"), n = N.getContext("2d");
  // at NIGHT the sprites go on a clear canvas, so glowing pixels keep their alpha 254 through the lighting, and the dark ground goes under afterwards
  if (!window.NIGHT) { a.fillStyle = `rgb(${G.hsv2rgb(st.groundHue, .4, st.groundVal)})`; a.fillRect(0, 0, w, h); } n.fillStyle = "rgb(128,75,240)"; n.fillRect(0, 0, w, h);
  let y = gap;
  rows.forEach((r, i) => { let x = gap; y += rh[i] - gap; for (const s of r) { a.drawImage(s.A, x, y - s.h); n.drawImage(s.N, x, y - s.h); x += s.w + gap; } y += gap; });
  let lit = mk(); shade({ a, n, w, h }, lit, window.NIGHT ? st : studio, [], [0, 0, w, h]); // NIGHT: the style's own night light, as in the game
  if (window.NIGHT) { const under = mk(), u = under.getContext("2d"); u.fillStyle = "#0c1014"; u.fillRect(0, 0, w, h); u.drawImage(lit, 0, 0); lit = under; }
  const big = document.createElement("canvas"); big.width = w * scale; big.height = h * scale;
  const g = big.getContext("2d"); g.imageSmoothingEnabled = false; g.drawImage(lit, 0, 0, w * scale, h * scale);
  return big.toDataURL("image/png");
}, { gen, lighting, what, list, scale: +scale });
writeFileSync(out, Buffer.from(url.split(",")[1], "base64"));
console.log("wrote", out, b.errors.length ? b.errors : "");
await b.close();
