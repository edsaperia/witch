// Renders preview sheets of the art, lit by the lab's lighting pass under even "studio"
// light, enlarged with crisp pixels, for review on the PR.
//   node art/preview.mjs animals wolf,boar,owl art/previews/animals.png [scale]
//   node art/preview.mjs trees all art/previews/trees.png [scale]
//   node art/preview.mjs areas all art/previews/areas.png [scale]
//   node art/preview.mjs sets all art/previews/set-pieces.png [scale]   (every area's set piece, five to a row, the witch for scale)
//   node art/preview.mjs home 0 art/previews/treehouse.png [scale]   (the treehouse with the witch sitting in its studio, sit frame 0 or 1; NIGHT=1 lit by its own lights; STUDIO=1 adds the studio up close, framed on its camera anchor)
//   node art/preview.mjs relics modern|playground|sports|<ids> art/previews/relics-modern.png [scale]   (PER=n to a row)
//   node art/preview.mjs country farm|street|scene|<ids> art/previews/country-farm.png [scale]   (countryside and street pieces; PER=n to a row)
//   node art/preview.mjs scenes small|large|all|<ids> art/previews/scenes-small.png [scale]   (each scene composed from its pieces, the witch at its middle; MIRROR=1 the other way; PER=n to a row)
//   node art/preview.mjs landmarks cemetery|carpark|scrap|worship|castle|classical|<ids> art/previews/landmarks-worship.png [scale]   (the large scenes' pieces; buildings' two halves composed, HALVES=1 apart; PER=n to a row)
//   node art/preview.mjs partyobjects litter|small|furniture|set|all|<ids> art/previews/party-objects.png [scale]   (the party objects, neon ones cycling the neons; NIGHT=1 to see them glow)
//   node art/preview.mjs partypatch 1 art/previews/party-patch.png [scale]   (a sample patch of party ground: clusters and loose objects, seeded; NIGHT=1)
//   node art/preview.mjs lineup all|<species> art/previews/lineup.png [scale]   (each species' baby, young, adult and legend side by side, the witch for scale; PER=n species to a row)
//   node art/preview.mjs legends all|<species> art/previews/legends.png [scale]   (each sleeping legend asleep, its 2 breathing frames, then the legend awake as it is, then the witch for scale; FACINGS=away for the other view)
//   node art/preview.mjs genome wolf,fox,...|all art/previews/genome-palettes.png [scale]   (each species' sprite baked once as a material mask, then painted with its own palette and every curated variant: no rebake)
//   node art/preview.mjs silhouettes young|adult art/previews/silhouettes.png [scale]   (every species' shape at game size, 24 px, as the silhouette check sees it, then its sprite; the closest pairs listed in the log)
//   node art/preview.mjs grounds playground,tennis,baseball,football,basketball|all art/previews/grounds.png [scale]   (each arrangement composed; NIGHT=1)
//   node art/preview.mjs decor ruins|rocks|freak|<ids> art/previews/ruins.png [scale]   (VARIANTS=1: ruins weathered and overgrown)
//   node art/preview.mjs lake 0 art/previews/lake.png [scale]   (a sample lake composed from the kit; NIGHT=1)
//   node art/preview.mjs paths all|<kinds> art/previews/paths.png [scale]   (each kind swept along a curve with a branch, then its strip, end, Y, T; VARIANT=n for the railway's)
//   node art/preview.mjs pathpieces all|<ids> art/previews/path-pieces.png [scale]   (the 3D pieces; with all, the railway's points, broken end and crossing)
//   node art/preview.mjs species all|<ids> art/previews/tree-species.png [scale]   (each species at mature height from the side, then its crown as treetop mode shows it, then its trunk alone as ground mode shows it; PER=n species to a row)
//   node art/preview.mjs canopy <areas> art/previews/canopy-patches.png [scale]   (a 3 x 3 patch of each area's crowns from the treetops)
//   node art/preview.mjs witch all art/previews/witch-flight.png [scale]   ("fast" instead of all: hover, lean and the fast pose; "foot": hover and every on-foot pose, POSES=stand,talk,... to pick, ANCHORS=1 to mark her hand and hat tip)
//   node art/preview.mjs effects all|<ids> art/previews/attack-effects.png [scale]   (the attack effects: light on night ground in red, dark on bright ground in neon, then as the treetop camera sees them, ground and treetop drawings; ground decals laid flat)
//   node art/preview.mjs partywitches poses|outfits|pairs|lean art/previews/party-witches.png [scale]   (her party poses, a row per facing; the party outfits; pairs put together at their anchors; her lean cycle. ANCHORS=1, POSES=...)
//   node art/preview.mjs treeheights fern-forest,garden art/previews/tree-heights.png [scale]
//   node art/preview.mjs lights all art/previews/light-sources.png [scale]
//   node art/preview.mjs party wolf,fox,owl art/previews/party.png [scale]
//   node art/preview.mjs sigils all art/previews/sigils.png [scale]
//   node art/preview.mjs witch headings art/previews/witch-headings.png [scale]   (her side view, then heading straight up the screen (away) and straight down it (towards): hover x3, lean, fast x3, brake x2; ANCHORS=1 marks her hand and hat tip)
//   node art/preview.mjs soundsystems all art/previews/soundsystems.png [scale]
//   node art/preview.mjs tufts all|<areas> art/previews/tufts.png [scale]   (each area's ground-cover tufts on its floor, then their sway masks in grey; weights under them)
//   node art/preview.mjs partyrelics all|<ids> art/previews/party-relics.png [scale]   (the party relics, half-buried, with the witch; their glint's frames, ground then treetop; their one sigil, bare and in each level's frame)
//   node art/preview.mjs wind <species> art/previews/wind.png [scale]   (each species' mature tree in the pixel wind: 6 moments of a strong gust, each region (a blob) moving whole, by whole pixels; then the same with the smooth sway; CHANGES=1 colours each pixel by how far it moved)
//   node art/preview.mjs witchgen 15|<seeds> art/previews/witches.png [scale]   (ours, then generated witches from their genomes: each hovering, leaning and standing; PER to a row)
//   node art/preview.mjs sway <areas> art/previews/sway.png [scale]   (each area's trees and leafy props beside their sway masks: black is rigid, white sways most)
//   node art/preview.mjs disco all|<ids> art/previews/dancefloor-patterns.png [scale]   (every dancefloor pattern's key frame from above, named, grouped by kind; PER=n to a row)
//   node art/preview.mjs discolooks all art/previews/dancefloor-looks.png [scale]   (the floor's looks: the unlit tile, the lit tile at intensities 1 to 3 tinted in four neons, the grout, the rim strip, and the whole unlit floor)
//   node art/preview.mjs discostrip all art/previews/dancefloor-strip.png [scale]   (the floor at the game's camera angle, at night, through the switch-on and four patterns with their transitions; the speaker ring when the generator has it; the witch)
//   node art/preview.mjs speakers all art/previews/dancefloor-speakers.png [scale]   (the dancefloor speaker at each of its 3 angles: 3 playing, 2 damaged, destroyed; the witch for scale)
//   node art/preview.mjs ring 9 art/previews/dancefloor-ring.png [scale]   (12 speakers round the dancefloor, the far half facing in and the near half out, the list the ring's radius in metres: all playing, then a mix of states; picked and mirrored by the facing rule)
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
if (process.env.PER) await b.page.addInitScript(n => { window.PER = n; }, +process.env.PER);
if (process.env.VARIANTS) await b.page.addInitScript(() => { window.VARIANTS = true; });
if (process.env.HALVES) await b.page.addInitScript(() => { window.HALVES = true; });
if (process.env.MIRROR) await b.page.addInitScript(() => { window.MIRROR = true; });
if (process.env.VARIANT) await b.page.addInitScript(n => { window.VARIANT = n; }, +process.env.VARIANT);
if (process.env.LEVELS) await b.page.addInitScript(l => { window.LEVELS = l; }, process.env.LEVELS.split(",").map(Number));
if (process.env.POSES) await b.page.addInitScript(l => { window.POSES = l; }, process.env.POSES.split(","));
if (process.env.STUDIO) await b.page.addInitScript(() => { window.STUDIO = true; });
if (process.env.ANCHORS) await b.page.addInitScript(() => { window.ANCHORS = true; });
if (process.env.SEEDS) await b.page.addInitScript(l => { window.SEEDS = l; }, process.env.SEEDS.split(",").map(Number));
if (process.env.CHANGES) await b.page.addInitScript(() => { window.CHANGES = true; });
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async ({ gen, lighting, what, list, scale }) => {
  const G = await import(gen), { shade } = await import(lighting);
  const st = { ...G.defaultStyle(), ...(window.STYLE || {}) };
  const studio = { ...st, ambient: .55, ambientHue: .15, moon: .9, moonHue: .15, shafts: 0 };
  const rows = [];
  if (what === "tufts" || what === "sway") { // raw canvases (not lit): the sprites as baked, then their sway masks in grey
    const ids = list === "all" ? G.AREAS.map(a => a.id) : list.split(","), K = what === "tufts" ? 4 : 1, rowsC = [];
    for (const id of ids) {
      const items = what === "tufts" ? G.bakeTufts(id, st).map(t => ({ A: t.A, S: t.S, w: t.w, h: t.h, label: t.kind + " " + Math.round(t.weight * 100) + "%" }))
        : [...G.areaTreeVariants(id, st).filter((v, i) => i % 3 === 0).map(v => ({ A: v.whole.A, S: v.sway.whole, w: v.whole.w, h: v.whole.h })), ...G.areaAssets(id, st).small.concat(G.areaAssets(id, st).big).filter(b => b.sway).map(b => ({ A: b.sp.A, S: b.sway, w: b.sp.w, h: b.sp.h }))];
      rowsC.push({ id, items, h: Math.max(...items.map(t => t.h), 1) * K });
    }
    const gap = 8, lab = what === "tufts" ? 14 : 4, W = Math.max(...rowsC.map(r => r.items.reduce((a, t) => a + t.w * K * 2 + gap * 2, 150))), H = rowsC.reduce((a, r) => a + r.h + gap + lab, gap);
    const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.imageSmoothingEnabled = false; g.fillStyle = "#1c1c22"; g.fillRect(0, 0, W, H); g.font = "11px monospace"; g.textBaseline = "top";
    let y = gap;
    for (const R of rowsC) {
      const A = G.AREA_BY_ID[R.id], fl = G.hsv2rgb(A.floor[1], A.floor[2] * .9, A.floor[3]); g.fillStyle = "#c8c0e0"; g.fillText(R.id, 6, y + R.h / 2 - 6);
      let x = 150;
      for (const t of R.items) { g.fillStyle = `rgb(${fl})`; g.fillRect(x - 2, y - 2, t.w * K + 4, R.h + 4); g.drawImage(t.A, x, y + R.h - t.h * K, t.w * K, t.h * K); g.fillStyle = "#000"; g.fillRect(x + t.w * K + gap - 2, y - 2, t.w * K + 4, R.h + 4); g.drawImage(t.S, x + t.w * K + gap, y + R.h - t.h * K, t.w * K, t.h * K); if (t.label) { g.fillStyle = "#9a92b4"; g.fillText(t.label, x, y + R.h + 3); } x += t.w * K * 2 + gap * 2; }
      y += R.h + gap + lab;
    }
    const big = document.createElement("canvas"); big.width = W * scale; big.height = H * scale; const bg = big.getContext("2d"); bg.imageSmoothingEnabled = false; bg.drawImage(c, 0, 0, W * scale, H * scale);
    return big.toDataURL("image/png");
  }
  if (what === "wind") { // the pixel wind on each species' mature tree: 6 moments of a gust (whole regions, whole pixels), then the smooth sway's
    const ids = list === "all" ? Object.keys(G.TREE_SPECIES) : list.split(","), K = 2 / (st.pixel || 2), gap = 6, rowsW = [];
    for (const id of ids) {
      const S = G.TREE_SPECIES[id], t = S.fn(G.rng(17), { ...st, leafHue: .27 }, st.treeSize * K), col = G.treeColours(G.rng(3), { ...st, leafHue: .27 }, S.fn), b = G.bake(t.sp, col, st, "none");
      const rgba = b.A.getContext("2d").getImageData(0, 0, b.w, b.h).data, code = G.swayCode(t.sp), frames = [];
      for (const smooth of [false, true]) for (let i = 0; i < 6; i++) { const o = document.createElement("canvas"); o.width = b.w; o.height = b.h; const px = G.windShift(rgba, code, b.w, b.h, 2.4, i * .45, { smooth }), d = new ImageData(px, b.w, b.h); o.getContext("2d").putImageData(d, 0, 0); frames.push({ c: o, sep: smooth && i === 0, px }); }
      if (window.CHANGES) frames.forEach((f, k) => { const mv = new Int8Array(b.w * b.h); G.windShift(rgba, code, b.w, b.h, 2.4, (k % 6) * .45, { smooth: k >= 6, moved: mv }); const px = new Uint8ClampedArray(b.w * b.h * 4), pal = { "-2": [40, 90, 255], "-1": [80, 200, 255], 0: [70, 70, 78], 1: [255, 170, 60], 2: [255, 50, 60] }; for (let p = 0; p < mv.length; p++) if (mv[p] !== -128) px.set([...(pal[mv[p]] || [255, 255, 255]), 255], p * 4); const o = document.createElement("canvas"); o.width = b.w; o.height = b.h; o.getContext("2d").putImageData(new ImageData(px, b.w, b.h), 0, 0); f.c = o; }); // CHANGES=1: each pixel by how far it moved: 2 left blue, 1 left cyan, still grey, 1 right orange, 2 right red
      rowsW.push({ id, frames, h: b.h });
    }
    const W = Math.max(...rowsW.map(r => r.frames.reduce((a, f) => a + f.c.width + gap + (f.sep ? 24 : 0), 110))), H = rowsW.reduce((a, r) => a + r.h + gap, gap);
    const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.fillStyle = "#2a3a22"; g.fillRect(0, 0, W, H); g.font = "11px monospace"; g.fillStyle = "#e8e0c8";
    let y = gap; for (const r of rowsW) { g.fillText(r.id, 6, y + r.h / 2); let x = 110; for (const f of r.frames) { if (f.sep) x += 24; g.drawImage(f.c, x, y + r.h - f.c.height); x += f.c.width + gap; } y += r.h + gap; }
    const big = document.createElement("canvas"); big.width = W * scale; big.height = H * scale; const bg = big.getContext("2d"); bg.imageSmoothingEnabled = false; bg.drawImage(c, 0, 0, W * scale, H * scale);
    return big.toDataURL("image/png");
  }
  if (what === "effects") { // the attack effects (list: all or ids): a row each, its frames light on the night ground tinted red (the wild), dark on bright
    // ground in a neon (the party), then as the treetop camera sees them (shrunk 2.6 times): the ground drawing, then the treetop one; ground decals also laid flat
    const ids = list === "all" ? G.EFFECTS.map(e => e.id) : list.split(","), red = [255, 70, 90], neon = [70, 240, 255], gap = 6, rows2 = [];
    const night = "#16201a", bright = "#d9cfae", K = G.EFFECT_TREETOP_SHRINK;
    const bk = (r, tint) => G.bake(r.sp, G.effectColours(tint), st, "none");
    const shrink = (c, k) => { const o = document.createElement("canvas"); o.width = Math.max(1, Math.round(c.width / k)); o.height = Math.max(1, Math.round(c.height / k)); const g = o.getContext("2d"); g.imageSmoothingEnabled = false; g.drawImage(c, 0, 0, o.width, o.height); return o; };
    const flat = c => { const o = document.createElement("canvas"); o.width = c.width; o.height = Math.max(1, Math.round(c.height * Math.sin(.52))); const g = o.getContext("2d"); g.imageSmoothingEnabled = false; g.drawImage(c, 0, 0, o.width, o.height); return o; };
    for (const id of ids) {
      const E = G.EFFECT_BY_ID[id], fr = [...Array(E.frames).keys()], cells = [];
      for (const f of fr) cells.push({ c: bk(G.effectSprite(id, { frame: f }), red).A, bg: night });
      for (const f of fr) cells.push({ c: bk(G.effectSprite(id, { frame: f, variant: "dark" }), neon).A, bg: bright });
      cells.push({ c: shrink(bk(G.effectSprite(id, {}), red).A, K), bg: night, sep: true }, { c: shrink(bk(G.effectSprite(id, { zoom: "treetop" }), red).A, K), bg: night });
      if (E.plane === "ground") cells.push({ c: flat(bk(G.effectSprite(id, {}), red).A), bg: night, sep: true });
      rows2.push({ id, cells });
    }
    const lab = 92, W = Math.max(...rows2.map(r => r.cells.reduce((a, x) => a + x.c.width + gap + (x.sep ? 8 : 0), lab))) + gap, H = rows2.reduce((a, r) => a + Math.max(...r.cells.map(x => x.c.height)) + gap * 2, gap);
    const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.fillStyle = "#0e0c14"; g.fillRect(0, 0, W, H); g.font = "9px monospace"; g.textBaseline = "top";
    let y = gap;
    for (const r of rows2) { const rh = Math.max(...r.cells.map(x => x.c.height)) + gap; g.fillStyle = "#c8c0e0"; g.fillText(r.id, 4, y + 2); let x = lab; for (const cell of r.cells) { if (cell.sep) x += 8; g.fillStyle = cell.bg; g.fillRect(x - 2, y - 2, cell.c.width + 4, rh); g.drawImage(cell.c, x, y + (rh - gap - cell.c.height)); x += cell.c.width + gap; } y += rh + gap; }
    const big = document.createElement("canvas"); big.width = W * scale; big.height = H * scale; const bg = big.getContext("2d"); bg.imageSmoothingEnabled = false; bg.drawImage(c, 0, 0, W * scale, H * scale);
    return big.toDataURL("image/png");
  }
  if (what === "disco") { // every pattern's key frame from above, painted as the floor shows it, with its name, kind, level and beats
    const L = G.discoPatterns().filter(p => list === "all" || list.split(",").includes(p.id)), per = window.PER || 8, cell = 6, F = G.DISCO_GRID * cell, cw = F + 16, ch = F + 34;
    const W = per * cw + 16, H = Math.ceil(L.length / per) * ch + 16, c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d");
    g.fillStyle = "#0e0c14"; g.fillRect(0, 0, W, H); g.font = "11px monospace"; g.textBaseline = "top";
    L.forEach((p, k) => { const x = 8 + (k % per) * cw + 8, y = 8 + Math.floor(k / per) * ch; G.discoPaint(g, G.discoCells(p, p.key, 3), { x, y, cell }); g.fillStyle = "#c8c0e0"; g.fillText(`${p.name.slice(0, 22)}`, x, y + F + 3); g.fillStyle = "#7d7596"; g.fillText(`${p.kind} L${p.level} ${p.beats}b ${p.palette.join("/")}`.slice(0, 30), x, y + F + 16); });
    const big = document.createElement("canvas"); big.width = W * scale; big.height = H * scale; const bg = big.getContext("2d"); bg.imageSmoothingEnabled = false; bg.drawImage(c, 0, 0, W * scale, H * scale);
    return big.toDataURL("image/png");
  }
  if (what === "discolooks") { // the tile looks (studio-lit; lit tiles tinted as the engine would), the grout, the rim strip, then the whole unlit floor
    const tint = (l, neon) => { const c = G.discoColours(l), o = { ...c }; for (const m of [G.M.GLINT, G.M.MAGIC2, G.M.GLOW, G.M.MAGIC]) o[m] = c[m].map((v, q) => Math.round(v * G.NEON[neon][q] / 255)); return o; };
    rows.push([G.bake(G.discoTileSprite("unlit"), G.discoColours(), st, "none"), ...["pink", "cyan", "lemon", "acid"].flatMap(nm => [1, 2, 3].map(l => G.bake(G.discoTileSprite("lit", { level: l }), tint(l, nm), st, "none"))), G.bake(G.discoGroutSprite(), G.discoColours(), st, "none")]);
    rows.push([G.bake(G.discoRimStrip(G.DISCO_RIM.period * 3), G.discoRimColours(), st, "none")]);
    rows.push([G.bake(G.discoFloorBase().sp, { ...G.discoColours(), ...G.discoRimColours() }, st, "none"), G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline)]);
  }
  if (what === "discostrip") { // moments through a set: switch-on, then moon, spiral, an area's shape and the kaleidoscope, each in through a transition; at the camera's angle, at night
    const P = id => G.discoPatternById(id), base = G.discoFloorBase(), bb = G.bake(base.sp, { ...G.discoColours(), ...G.discoRimColours() }, st, "none"), lits = [1, 2, 3].map(l => G.bake(G.discoTileSprite("lit", { level: l }), G.discoColours(l), st, "none"));
    const litPx = lits.map(t => ({ a: t.A.getContext("2d").getImageData(0, 0, t.w, t.h).data, n: t.N.getContext("2d").getImageData(0, 0, t.w, t.h).data }));
    const moments = [
      ["switch-on", { pattern: P("switch-on"), frame: 5, level: 1 }], ["switch-on", { pattern: P("switch-on"), frame: 12, level: 2 }], ["switch-on", { pattern: P("switch-on"), frame: 25, level: 3 }],
      ["iris to moon", { pattern: P("switch-on"), frame: 30, next: P("moon"), nextFrame: 3, transition: { id: "iris" }, t: .55, level: 1 }], ["moon", { pattern: P("moon"), frame: 7, level: 1 }],
      ["wipe to spiral", { pattern: P("moon"), frame: 7, next: P("spiral"), nextFrame: 2, transition: { id: "wipe", angle: .4 }, t: .5, level: 3 }], ["spiral", { pattern: P("spiral"), frame: 9, level: 3, witch: { x: 12, y: 18 } }],
      ["burst to the moor's badger", { pattern: P("spiral"), frame: 12, next: P("area-moor"), nextFrame: 3, transition: { id: "burst" }, t: .45, level: 2 }], ["the moor's badger, drawn", { pattern: P("area-moor"), frame: 13, level: 2, witch: { x: 12, y: 18 } }],
      ["dissolve to kaleidoscope", { pattern: P("area-moor"), frame: 12, next: P("kaleidoscope"), nextFrame: 1, transition: { id: "dissolve" }, t: .5, level: 4 }], ["kaleidoscope, full rave", { pattern: P("kaleidoscope"), frame: 2, level: 4, beat: 3, witch: { x: 12, y: 18 } }],
    ];
    const ppmGame = 16 * 2 / (st.pixel || 3), k = ppmGame / 16, sq = Math.sin(.52), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline);
    const floorM = base.rimOuter / 16, ringR = (floorM + 2.5) * ppmGame, spk = !!G.dancefloorSpeakerSprite;
    const S = spk ? Object.fromEntries(G.DANCEFLOOR_SPEAKER_ANGLES.map(a => [a, (() => { const s2 = G.dancefloorSpeakerSprite(st, { angle: a }); return { ...G.bake(s2.sp, G.dancefloorSpeakerColours(), st, "none"), o: s2.origin }; })()])) : null;
    const flipC = (c, normal) => { const o = document.createElement("canvas"); o.width = c.width; o.height = c.height; const g = o.getContext("2d"); g.translate(c.width, 0); g.scale(-1, 1); g.drawImage(c, 0, 0); if (normal) { const d = g.getImageData(0, 0, o.width, o.height); for (let i = 0; i < d.data.length; i += 4) if (d.data[i + 3]) d.data[i] = 255 - d.data[i]; g.putImageData(d, 0, 0); } return o; };
    for (const [label, opts] of moments) {
      const cells = G.discoCompose(opts), fa = document.createElement("canvas"), fn = document.createElement("canvas"); fa.width = fn.width = bb.w; fa.height = fn.height = bb.h;
      const ga = fa.getContext("2d"), gn = fn.getContext("2d"); ga.drawImage(bb.A, 0, 0); gn.drawImage(bb.N, 0, 0);
      const da = ga.getImageData(0, 0, bb.w, bb.h), dn = gn.getImageData(0, 0, bb.w, bb.h), T = G.DISCO_TILE_PX;
      cells.forEach((c2, n2) => { if (!c2) return; const i = n2 % G.DISCO_GRID, j = (n2 / G.DISCO_GRID) | 0, x0 = Math.round(base.gridOrigin + i * base.pitch + 1), y0 = Math.round(base.gridOrigin + j * base.pitch + 1), L2 = litPx[c2.level - 1];
        for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) { const s2 = (y * T + x) * 4, d = ((y0 + y) * bb.w + x0 + x) * 4; for (let q = 0; q < 3; q++) { da.data[d + q] = Math.round(L2.a[s2 + q] * c2.rgb[q] / 255); dn.data[d + q] = L2.n[s2 + q]; } da.data[d + 3] = 254; } });
      ga.putImageData(da, 0, 0); gn.putImageData(dn, 0, 0);
      const fw = Math.round(bb.w * k), fh = Math.round(bb.h * k * sq), top = spk ? 130 : wit.h + 10, W = Math.max(fw, Math.ceil(ringR * 2 + 90)) + 20, H = top + fh + (spk ? 40 : 20), cx = W / 2, cy = top + fh / 2;
      const A = document.createElement("canvas"), N = document.createElement("canvas"); A.width = N.width = W; A.height = N.height = H; const a = A.getContext("2d"), n = N.getContext("2d"); a.imageSmoothingEnabled = n.imageSmoothingEnabled = false;
      n.fillStyle = "rgb(128,75,240)"; n.fillRect(0, 0, W, H);
      a.drawImage(fa, Math.round(cx - fw / 2), Math.round(cy - fh / 2), fw, fh); n.drawImage(fn, Math.round(cx - fw / 2), Math.round(cy - fh / 2), fw, fh);
      const wc = opts.witch || { x: 12, y: 18 }, wx = cx - fw / 2 + (base.gridOrigin + (wc.x + .5) * base.pitch) * k, wy = cy - fh / 2 + (base.gridOrigin + (wc.y + .5) * base.pitch) * k * sq; // she stands on her cell
      const items = [{ A: wit.A, N: wit.N, x: wx - wit.w / 2, y: wy - wit.h + 3, z: wy }];
      if (spk) for (let i = 0; i < 12; i++) { const ra = 15 + 30 * i, f = G.dancefloorSpeakerFacing(ra), s2 = S[f.angle], r = ra * Math.PI / 180, px = cx + Math.sin(r) * ringR, py = cy + Math.cos(r) * ringR * sq;
        items.push({ A: f.flip ? flipC(s2.A) : s2.A, N: f.flip ? flipC(s2.N, true) : s2.N, x: px - (f.flip ? s2.w - s2.o.x : s2.o.x), y: py - s2.o.y, z: py }); }
      for (const it of items.sort((p, q) => p.z - q.z)) { a.drawImage(it.A, Math.round(it.x), Math.round(it.y)); n.drawImage(it.N, Math.round(it.x), Math.round(it.y)); }
      a.font = "12px monospace"; a.textBaseline = "top"; a.fillStyle = "rgba(230,224,255,0.996)"; a.fillText(label, 8, 6); // alpha 254: drawn unlit
      rows.push([{ A, N, w: W, h: H }]);
    }
    const per = window.PER || 3, flat = rows.splice(0); for (let i = 0; i < flat.length; i += per) rows.push(flat.slice(i, i + per).map(r => r[0]));
  }
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
  if (what === "home") { // the treehouse at night, the witch sitting in its studio: towards (whole, as from the treetops), its base only (as from the ground), away
    const wc = G.witchColours(st), hc = G.treehouseColours(st), panels = [];
    for (const [facing, part] of [["towards", "whole"], ["towards", "bot"], ["away", "whole"]].filter(([f]) => !window.FACINGS || window.FACINGS.includes(f))) {
      const T = G.treehouseSprite(st, { facing }), house = G.bake(T[part], hc, st, "none"), fore = T.fore ? G.bake(T.fore, hc, st, "none") : null, wsp = G.witchSprite(st, { pose: "sit", frame: +list || 0, facing }), wit = G.bake(wsp, wc, st, st.cOutline);
      let x0 = wsp.w, x1 = -1; for (let x = 0; x < wsp.w; x++) if (wsp.m[(wsp.h - 1) * wsp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); }
      panels.push({ T, house, fore, wit, wx: Math.round(T.anchors.seat.x - (x0 + x1 + 1) / 2), wy: Math.round(T.anchors.seat.y - wsp.h) + 1 });
    }
    if (window.STUDIO) { // the studio up close, as the opening camera frames it: the first panel cropped round its camera anchor, twice the size (its lights moved with it)
      const P = panels[0], cw = 150, ch = 104, cx = Math.round(P.T.anchors.camera.x - cw / 2), cy = Math.round(P.T.anchors.camera.y - ch / 2), K = 2;
      const crop = (src, wit, fore) => { const c2 = document.createElement("canvas"); c2.width = cw * K; c2.height = ch * K; const g2 = c2.getContext("2d"); g2.imageSmoothingEnabled = false; g2.drawImage(src, cx, cy, cw, ch, 0, 0, cw * K, ch * K); g2.drawImage(wit, (P.wx - cx) * K, (P.wy - cy) * K, wit.width * K, wit.height * K); if (fore) g2.drawImage(fore, cx, cy, cw, ch, 0, 0, cw * K, ch * K); return c2; };
      panels.push({ T: { anchors: { lights: P.T.anchors.lights.map(L => ({ ...L, x: (L.x - cx) * K, y: (L.y - cy) * K })).filter(L => L.x >= 0 && L.y >= 0 && L.x <= cw * K && L.y <= ch * K) } }, house: { A: crop(P.house.A, P.wit.A, P.fore && P.fore.A), N: crop(P.house.N, P.wit.N, P.fore && P.fore.N), w: cw * K, h: ch * K }, wit: null, wx: 0, wy: 0 });
    }
    const gap = 10, w = panels.reduce((a, p) => a + p.house.w + gap, gap), h = Math.max(...panels.map(p => p.house.h)) + gap * 2;
    const mk = () => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
    const A = mk(), N = mk(), a = A.getContext("2d"), n = N.getContext("2d"), lights = [];
    if (!window.NIGHT) { a.fillStyle = `rgb(${G.hsv2rgb(st.groundHue, .4, st.groundVal)})`; a.fillRect(0, 0, w, h); } n.fillStyle = "rgb(128,75,240)"; n.fillRect(0, 0, w, h);
    let x = gap;
    for (const P of panels) { const y = h - gap - P.house.h; a.drawImage(P.house.A, x, y); n.drawImage(P.house.N, x, y); if (P.wit) { a.drawImage(P.wit.A, x + P.wx, y + P.wy); n.drawImage(P.wit.N, x + P.wx, y + P.wy); if (P.fore) { a.drawImage(P.fore.A, x, y); n.drawImage(P.fore.N, x, y); } } /* the DJ table over her */ for (const L of P.T.anchors.lights) lights.push({ x: x + L.x, y: y + L.y, z: 10, R: 48, power: 1.1, rgb: L.rgb }); x += P.house.w + gap; }
    let lit = mk(); shade({ a, n, w, h }, lit, window.NIGHT ? st : studio, window.NIGHT ? lights : [], [0, 0, w, h]);
    if (window.NIGHT) { const under = mk(), u = under.getContext("2d"); u.fillStyle = "#0c1014"; u.fillRect(0, 0, w, h); u.drawImage(lit, 0, 0); lit = under; }
    const big = document.createElement("canvas"); big.width = w * scale; big.height = h * scale; const g = big.getContext("2d"); g.imageSmoothingEnabled = false; g.drawImage(lit, 0, 0, w * scale, h * scale);
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
  } else if (what === "lineup") { // per species (or all): baby, young, adult and legend standing side by side, then the witch for scale; PER=n species to a row
    const ids = list === "all" ? G.SPECIES.map(s => s.id) : list.split(","), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline), per = window.PER || 1, items = [];
    for (const id of ids) items.push(...[0, 1, 2, 3].map(l => G.bake(G.critter(id, l, 0, st), G.speciesColours(id, st), st, st.cOutline)));
    for (let i = 0; i < ids.length; i += per) rows.push([...items.slice(i * 4, (i + per) * 4), wit]);
  } else if (what === "legends") { // per species: its sleeping legend asleep (2 breathing frames), the legend awake as it is, then the witch for scale
    const ids = list === "all" ? G.LEGEND_IDS : list.split(","), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline);
    for (const id of ids) for (const facing of window.FACINGS || ["towards"]) rows.push([...G.LEGEND_STATES.flatMap(state => [...Array(G.LEGEND_FRAMES[state]).keys()].map(frame => { const { sp, colours } = G.legendForm(id, st, { state, frame, facing }); return G.bake(sp, colours, st, st.cOutline); })), G.bake(G.critter(id, 3, 0, st, facing), G.speciesColours(id, st), st, st.cOutline), wit]);
  } else if (what === "silhouettes") { // every species' shape shrunk to 24 px (white on black, as the silhouette check compares them), beside its sprite, six to a row
    const level = list === "adult" ? 2 : 1, n = G.SILHOUETTE_SIZE, K = 3, items = [];
    for (const S of G.SPECIES) {
      const sp = G.critter(S.id, level, 0, st), sh = G.silhouette(sp), A = document.createElement("canvas"), N = document.createElement("canvas"); A.width = N.width = n * K; A.height = N.height = n * K;
      const a = A.getContext("2d"), b = N.getContext("2d"); b.fillStyle = "rgb(128,128,255)"; b.fillRect(0, 0, n * K, n * K);
      for (let i = 0; i < n * n; i++) { const v = Math.round(sh[i] * 255); a.fillStyle = `rgb(${v},${v},${v})`; a.fillRect((i % n) * K, Math.floor(i / n) * K, K, K); }
      items.push({ A, N, w: n * K, h: n * K }, G.bake(sp, G.speciesColours(S.id, st), st, st.cOutline));
    }
    for (let i = 0; i < items.length; i += 12) rows.push(items.slice(i, i + 12));
  } else if (what === "faces") { // per species: its four expressions (neutral, angry, happy, dazed) at adult, young and baby, then angry with the woken look's red eyes (enraged)
    const ids = list === "all" ? G.SPECIES.map(s => s.id) : list.split(",");
    for (const id of ids) for (const facing of window.FACINGS || ["towards"]) rows.push([...(window.LEVELS || [2, 1, 0]).flatMap(l => G.EXPRESSIONS.map(face => G.bake(G.critter(id, l, 0, st, facing, { face }), G.speciesColours(id, st), st, st.cOutline))), G.bake(G.critter(id, 1, 0, st, facing, { face: "angry", woken: true }), G.speciesColours(id, st, { woken: true }), st, st.cOutline)]);
  } else if (what === "genome") { // per species: its adult baked once, then its material mask painted with each curated palette variant (#79 stage 2)
    const ids = list === "all" ? G.SPECIES.map(s => s.id) : list.split(","), mk = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
    for (const id of ids) for (const facing of window.FACINGS || ["towards"]) {
      const sp = G.critter(id, 2, 0, st, facing), base = G.bake(sp, G.speciesColours(id, st), st, st.cOutline), mask = G.bakeMask(sp, st.cOutline);
      rows.push([base, ...Object.keys(G.PALETTE_VARIANTS).map(v => ({ A: G.paintMask(mask, G.paletteRow(G.variantColours(id, st, v), st.cOutline), mk), N: base.N, w: sp.w, h: sp.h }))]);
    }
  } else if (what === "animals") {
    const ids = list === "all" ? G.SPECIES.map(s => s.id) : list.split(",");
    for (const id of ids) for (const facing of window.FACINGS || ["towards"]) rows.push((window.LEVELS || [3, 2, 1, 0]).flatMap(l => [0, 1].map(f => G.bake(G.critter(id, l, f, st, facing), G.speciesColours(id, st), st, st.cOutline))));
  } else if (what === "witch") { // per facing: the ordinary hover frame, then rise (two frames) and descend (two frames)
    const wc = G.witchColours(st), b = o => G.bake(G.witchSprite(st, o), wc, st, st.cOutline);
    // "foot": hover, then every on-foot pose's frames (stand, land, takeoff, talk, placeSigil, liftSigil); with ANCHORS=1 her hand and hat tip marked
    const mark = (sp, bk) => { if (window.ANCHORS && sp.anchors) { const g = bk.A.getContext("2d"); for (const [k, c] of [["hand", "#0ff"], ["hatTip", "#f0f"], ["pair", "#ff0"], ["back", "#fff"], ["cup", "#f80"]]) { if (!sp.anchors[k]) continue; const [x, y] = sp.anchors[k]; g.fillStyle = c; g.fillRect(Math.round(x) - 1, Math.round(y) - 1, 3, 3); } } return bk; };
    const fb = o => { const sp = G.witchSprite(st, o); return mark(sp, G.bake(sp, wc, st, st.cOutline)); };
    if (list === "headings") for (const heading of ["away", "towards"]) rows.push([b({}), ...[0, 1, 2].map(frame => fb({ heading, frame })), fb({ heading, lean: true }), ...[0, 1, 2].map(frame => fb({ heading, pose: "fast", frame })), ...[0, 1].map(frame => fb({ heading, pose: "brake", frame }))]); // the side view for comparison, then heading straight up (away) and down (towards) the screen: hover x3, lean, fast x3, brake x2
    else if (list === "foot") for (const facing of window.FACINGS || ["towards", "away"]) rows.push([b({ facing }), ...Object.entries(G.WITCH_FOOT_POSES).filter(([pose, P]) => window.POSES ? window.POSES.includes(pose) : !P.party).flatMap(([pose, { frames }]) => [...Array(frames).keys()].map(frame => fb({ facing, pose, frame })))]);
    else for (const facing of ["towards", "away"]) rows.push(list === "fast" ? [b({ facing }), b({ facing, lean: true }), ...[0, 1, 2].map(frame => b({ facing, pose: "fast", frame })), ...[0, 1].map(frame => b({ facing, pose: "brake", frame }))] // hover, lean, fast's three frames, brake's two
      : [b({ facing }), b({ facing, pose: "rise", frame: 0 }), b({ facing, pose: "rise", frame: 1 }), b({ facing, pose: "descend", frame: 0 }), b({ facing, pose: "descend", frame: 1 })]);
  } else if (what === "partywitches") { // the party (list): "poses" her in every party pose, a row per facing (ANCHORS=1 marks hand, hat tip, pair, back, cup);
    // "outfits" each party outfit (a row each: hover, the lean cycle, then party poses); "pairs" two witches put together at their WITCH_PAIRS anchors; "lean" her lean cycle, both facings and both headings
    const mark = (sp, bk) => { if (window.ANCHORS && sp.anchors) { const g = bk.A.getContext("2d"); for (const [k, c] of [["hand", "#0ff"], ["hatTip", "#f0f"], ["pair", "#ff0"], ["back", "#fff"], ["cup", "#f80"]]) { if (!sp.anchors[k]) continue; const [x, y] = sp.anchors[k]; g.fillStyle = c; g.fillRect(Math.round(x) - 1, Math.round(y) - 1, 3, 3); } } return bk; };
    const one = (o, col = G.witchColours(st)) => { const sp = G.witchSprite(st, o); return mark(sp, G.bake(sp, col, st, st.cOutline)); };
    const party = Object.entries(G.WITCH_FOOT_POSES).filter(([pose, P]) => P.party && (!window.POSES || window.POSES.includes(pose)));
    if (list === "poses") for (const facing of window.FACINGS || ["towards", "away"]) rows.push(party.flatMap(([pose, { frames }]) => [...Array(frames).keys()].map(frame => one({ facing, pose, frame }))));
    else if (list === "lean") { for (const facing of ["towards", "away"]) rows.push([one({ facing, lean: true }), ...[0, 1, 2, 3].map(frame => one({ facing, pose: "lean", frame }))]); for (const heading of ["away", "towards"]) rows.push([one({ heading, lean: true }), ...[0, 1, 2, 3].map(frame => one({ heading, pose: "lean", frame }))]); }
    else if (list === "generated") { // the generated party witches (partyWitch(seed)), four to a row: each hovering, standing and dancing (two-step, spin); SEEDS=3,7,... picks them
      const seeds = window.SEEDS || [...Array(16).keys()];
      for (let row = 0; row < Math.ceil(seeds.length / 4); row++) rows.push(seeds.slice(row * 4, row * 4 + 4).flatMap(seed => { const w = G.partyWitch(seed), col = w.colours(st); return [one({ look: w.look, frame: 0 }, col), one({ look: w.look, pose: "stand", frame: 0 }, col), one({ look: w.look, pose: "twoStep", frame: 1 }, col), one({ look: w.look, pose: "spin", frame: 2 }, col)]; }));
    }
    else if (list === "pairs") { // A, and her partner (mirrored, or the conga's witch ahead) placed so their anchors meet
      const mk = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
      for (const [pose, Pr] of Object.entries(G.WITCH_PAIRS)) {
        const frames = Pr.frame !== undefined ? [Pr.frame] : [...Array(G.WITCH_FOOT_POSES[pose].frames).keys()], row = [];
        for (const frame of frames) {
          const w1 = G.partyWitch(3 + frame), w2 = G.partyWitch(11 + frame), o = { pose, frame, ...(Pr.heading ? { heading: Pr.heading } : {}) };
          // her partner (in Pr.partnerPose, if given) and, for the broom limbo, a third witch passing under the bar
          const sa = G.witchSprite(st, { ...o, look: w1.look }), sb = G.witchSprite(st, { ...o, pose: Pr.partnerPose || pose, look: w2.look }), ba = G.bake(sa, w1.colours(st), st, st.cOutline), bb = G.bake(sb, w2.colours(st), st, st.cOutline);
          const [ax, ay] = sa.anchors[Pr.meet], [bx0, by] = sb.anchors[Pr.partner || Pr.meet], bx = Pr.mirror ? sb.w - bx0 : bx0, ox = Math.round(ax - bx), oy = Math.round(ay - by);
          const layers = [{ bk: bb, sp: sb, x: ox, y: oy, mirror: Pr.mirror }];
          if (Pr.third) { const w3 = G.partyWitch(19 + frame), T = G.WITCH_FOOT_POSES[Pr.third.pose], sc = G.witchSprite(st, { pose: Pr.third.pose, frame: frame % T.frames, look: w3.look }), [ux, uy] = sa.anchors[Pr.third.under], [tx, ty] = sc.anchors[Pr.third.anchor]; layers.push({ bk: G.bake(sc, w3.colours(st), st, st.cOutline), sp: sc, x: Math.round(ux - tx), y: Math.round(uy + 2 - ty) }); }
          layers.push({ bk: ba, sp: sa, x: 0, y: 0 });
          const x0 = Math.min(...layers.map(l => l.x)), y0 = Math.min(...layers.map(l => l.y)), W = Math.max(...layers.map(l => l.x + l.sp.w)) - x0, H = Math.max(...layers.map(l => l.y + l.sp.h)) - y0, A = mk(W, H), N = mk(W, H);
          for (const l of layers) for (const [cv, src] of [[A, l.bk.A], [N, l.mirror ? l.bk.NF : l.bk.N]]) { const g = cv.getContext("2d"); if (l.mirror) { g.save(); g.translate(l.x - x0 + l.sp.w, l.y - y0); g.scale(-1, 1); g.drawImage(src, 0, 0); g.restore(); } else g.drawImage(src, l.x - x0, l.y - y0); }
          row.push({ A, N, w: W, h: H });
        }
        rows.push(row);
      }
    } else for (const P of G.PARTY_OUTFITS) { // outfits
      const pw = G.partyWitch(P.id.length * 7, { outfit: P.id }), col = pw.colours(st), lk = pw.look;
      rows.push([one({ look: lk }, col), ...[0, 1, 2, 3].map(frame => one({ look: lk, pose: "lean", frame }, col)), one({ look: lk, pose: "stand" }, col), ...(window.POSES || ["twoStep", "bounce", "spin", "headbang", "drink", "run", "hug", "sitGround", "stargaze"]).map((pose, k) => one({ look: lk, pose, frame: k % G.WITCH_FOOT_POSES[pose].frames, facing: k % 3 === 2 ? "away" : "towards" }, col))]);
    }
  } else if (what === "treeheights") { // per area: its tree variants, saplings to the giant, then the witch for scale
    const wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline);
    for (const id of list.split(",")) rows.push([...G.areaTreeVariants(id, st).map(v => v.whole), wit]);
  } else if (what === "lights") { // the campfire's frames, the magic stones, the pond
    const L = G.lightProps(st); rows.push([...L.campfire, ...Object.values(L.stones), L.pond]);
    if (list !== "all") rows.push(list.split(",").map((id, i) => G.runeStone(st, { glow: ["cyan", "violet", "green"][i % 3], sigil: id }))); // stones carved with these creatures' sigils
  } else if (what === "speakers") { // per angle (yaw from facing us): playing x3, damaged x2, destroyed; the witch for scale
    const col = G.dancefloorSpeakerColours(), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline);
    for (const angle of G.DANCEFLOOR_SPEAKER_ANGLES) rows.push([...[0, 1, 2].map(frame => ({ state: "playing", frame })), ...[0, 1].map(frame => ({ state: "damaged", frame })), { state: "destroyed" }].map(o => G.bake(G.dancefloorSpeakerSprite(st, { angle, ...o }).sp, col, st, "none")).concat([wit]));
  } else if (what === "ring") { // 12 speakers round the dancefloor (radius 4.5 m), at the given ring radius, the far half facing the centre, the near half away: the sprite and flip from dancefloorSpeakerFacing
    const col = G.dancefloorSpeakerColours(), ppm = 16 * 2 / (st.pixel || 3), R = (+list || 9) * ppm, fr = 4.5 * ppm, k = Math.sin(.52), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline);
    const flipC = (c, normal) => { const o = document.createElement("canvas"); o.width = c.width; o.height = c.height; const g = o.getContext("2d"); g.translate(c.width, 0); g.scale(-1, 1); g.drawImage(c, 0, 0); if (normal) { const d = g.getImageData(0, 0, o.width, o.height); for (let i = 0; i < d.data.length; i += 4) if (d.data[i + 3]) d.data[i] = 255 - d.data[i]; g.putImageData(d, 0, 0); } return o; }; // a mirrored sprite's normals point the other way
    for (const mix of [false, true]) {
      const items = [];
      for (let i = 0; i < 12; i++) {
        const a = 15 + 30 * i, f = G.dancefloorSpeakerFacing(a), o = mix ? [{ state: "playing", frame: i % 3 }, { state: "damaged", frame: i % 2 }, { state: "destroyed" }][i % 4 === 1 ? 1 : i % 4 === 3 ? 2 : 0] : { state: "playing", frame: i % 3 };
        const S = G.dancefloorSpeakerSprite(st, { angle: f.angle, ...o }), b = G.bake(S.sp, col, st, "none"), r = a * Math.PI / 180;
        items.push({ A: f.flip ? flipC(b.A) : b.A, N: f.flip ? flipC(b.N, true) : b.N, ox: f.flip ? S.sp.w - S.origin.x : S.origin.x, oy: S.origin.y, x: Math.sin(r) * R, y: Math.cos(r) * R * k });
      }
      const top = Math.max(...items.map(t => t.oy)) + 8, W = Math.ceil(R * 2 + 140), H = Math.ceil(R * k * 2 + top + 40), cx = W / 2, cy = top + R * k;
      const A = document.createElement("canvas"), N = document.createElement("canvas"); A.width = N.width = W; A.height = N.height = H; const a = A.getContext("2d"), n = N.getContext("2d");
      n.fillStyle = "rgb(128,75,240)"; n.fillRect(0, 0, W, H); // ground normals face up
      a.fillStyle = "rgb(150,140,120)"; a.beginPath(); a.ellipse(cx, cy, fr, fr * k, 0, 0, Math.PI * 2); a.fill(); // the dancefloor
      a.strokeStyle = "rgba(255,255,255,.25)"; a.setLineDash([3, 4]); a.beginPath(); a.ellipse(cx, cy, R, R * k, 0, 0, Math.PI * 2); a.stroke(); a.setLineDash([]);
      a.drawImage(wit.A, Math.round(cx - wit.w / 2), Math.round(cy - wit.h + 4)); n.drawImage(wit.N, Math.round(cx - wit.w / 2), Math.round(cy - wit.h + 4));
      for (const t of items.sort((p, q) => p.y - q.y)) { const x = Math.round(cx + t.x - t.ox), y = Math.round(cy + t.y - t.oy); a.drawImage(t.A, x, y); n.drawImage(t.N, x, y); }
      rows.push([{ A, N, w: W, h: H }]);
    }
  } else if (what === "soundsystems") { // per variant: three playing frames, two damaged, destroyed, and the witch for scale
    for (let v = 0; v < G.SOUNDSYSTEMS.length; v++) { if (list !== "all" && !list.split(",").includes(String(v))) continue; const col = G.soundsystemColours(v), b = o => G.bake(G.soundsystemSprite(st, { variant: v, ...o }), col, st, "none"); rows.push([b({ frame: 0 }), b({ frame: 1 }), b({ frame: 2 }), b({ state: "damaged", frame: 0 }), b({ state: "damaged", frame: 1 }), b({ state: "destroyed" }), G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline)]); }
    if (window.SIGIL) rows.push(G.SOUNDSYSTEMS.map((S, v) => G.bake(G.soundsystemSprite(st, { variant: v, sigil: window.SIGIL }), G.soundsystemColours(v), st, "none"))); // carved with a creature's sigil
  } else if (what === "sets") { // every area's set piece (or the listed areas'), five to a row, each row ending with the witch for scale
    const ids = list === "all" ? G.AREAS.filter(a => a.set).map(a => a.id) : list.split(","), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline);
    for (let i = 0; i < ids.length; i += 5) rows.push([...ids.slice(i, i + 5).map(id => G.areaAssets(id, st).setPiece.sp), wit]);
  } else if (what === "grounds") { // the arrangements (playground, tennis, baseball, football, basketball, or listed), each composed from its pieces as the prototype would, the witch at the middle
    const L = G.relicLayouts(st), col = G.relicColours(st), names = list === "all" ? Object.keys(L) : list.split(","), wsp = G.witchSprite(st), wit = G.bake(wsp, G.witchColours(st), st, st.cOutline);
    for (const name of names) {
      const parts = L[name].map(({ id, x, z }) => { const R = G.relicSprite(id, st), [dx, dy] = G.groundOffset(x, z); return { b: G.bake(R.whole, col, st, "none"), x: dx - R.origin.x, y: dy - R.origin.y, decal: !!G.RELIC_BY_ID[id].decal, depth: dy }; });
      parts.push({ b: wit, x: -wit.w / 2, y: -wit.h, depth: 0 });
      const x0 = Math.min(...parts.map(p => p.x)) - 4, y0 = Math.min(...parts.map(p => p.y)) - 4, x1 = Math.max(...parts.map(p => p.x + p.b.w)) + 4, y1 = Math.max(...parts.map(p => p.y + p.b.h)) + 4;
      const mk = () => { const c = document.createElement("canvas"); c.width = x1 - x0; c.height = y1 - y0; return c; }, A = mk(), N = mk(), a = A.getContext("2d"), n = N.getContext("2d");
      parts.sort((p, q) => (q.decal ? 1 : 0) - (p.decal ? 1 : 0) || p.depth - q.depth).forEach(p => { a.drawImage(p.b.A, Math.round(p.x - x0), Math.round(p.y - y0)); n.drawImage(p.b.N, Math.round(p.x - x0), Math.round(p.y - y0)); });
      rows.push([{ A, N, w: A.width, h: A.height }]);
    }
  } else if (what === "witchgen") { // the witch generator: ours (her genome), then generated witches (list: a count, or seeds), PER to a row (default 5): each hovering, leaning and standing
    const seeds = /^\d+$/.test(list) ? [...Array(+list).keys()] : list.split(",").map(Number), per = window.PER || 5;
    const one = g => { const { look, outfit } = G.genomeLook(g), col = outfit ? G.witchColours(st, outfit, { styleHues: false }) : G.witchColours(st), b = o => G.bake(G.witchSprite(st, { ...o, look }), col, st, st.cOutline); return [b({ frame: 0 }), b({ pose: "lean", frame: 1 }), b({ pose: "stand", frame: 0 })]; };
    const items = [one(G.WITCH_GENOME), ...seeds.map(s => one(G.witchGenome(s)))];
    for (let i = 0; i < items.length; i += per) rows.push(items.slice(i, i + per).flat());
  } else if (what === "partyrelics") { // the party relics (all or listed ids), the witch closing the row; then their glint's frames at the ground and treetop zooms; then their sigils (bare, then as a legend's)
    const ids = list === "all" ? G.PARTY_RELIC_IDS : list.split(","), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline);
    rows.push([...ids.map(id => G.bake(G.partyRelicSprite(id, st).sp, G.partyRelicColours(id, st), st, "none")), wit]);
    const gc = G.partyRelicColours("wine", st), flat = (w, h, f) => { const A = document.createElement("canvas"), N = document.createElement("canvas"); A.width = N.width = w; A.height = N.height = h; f(A.getContext("2d")); const n = N.getContext("2d"); n.fillStyle = "rgb(128,128,255)"; n.fillRect(0, 0, w, h); return { A, N, w, h }; };
    rows.push([...[0, 1, 2, 3].map(f => G.bake(G.partyRelicGlint(f).sp, gc, st, "none")), ...[0, 1, 2, 3].map(f => G.bake(G.partyRelicGlint(f, { zoom: "treetop" }).sp, gc, st, "none"))]);
    rows.push([null, 0, 1, 2, 3].map(level => flat(64, 64, g => G.drawSigil(g, G.PARTY_RELIC_SIGIL, { size: 64, level })))); // their one sigil, bare and in each level's frame
  } else if (what === "relics") { // a family's relics (modern, playground, sports) or listed ids, PER to a row (default 6), the witch closing each row
    const ids = ["modern", "playground", "sports"].includes(list) ? G.RELICS.filter(d => d.family === list).map(d => d.id) : list.split(","), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline), col = G.relicColours(st), per = window.PER || 6;
    const items = ids.map(id => G.bake(G.relicSprite(id, st).whole, col, st, "none"));
    for (let i = 0; i < items.length; i += per) rows.push([...items.slice(i, i + per), wit]);
  } else if (what === "country") { // a family's countryside and street pieces (farm, street, scene) or listed ids, PER to a row (default 6), the witch closing each row
    const ids = ["farm", "street", "scene"].includes(list) ? G.COUNTRY.filter(d => d.family === list).map(d => d.id) : list.split(","), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline), col = G.countryColours(st), per = window.PER || 6;
    const items = ids.map(id => G.bake(G.countrySprite(id, st).whole, col, st, "none"));
    for (let i = 0; i < items.length; i += per) rows.push([...items.slice(i, i + per), wit]);
  } else if (what === "landmarks") { // the large scenes' pieces: a family (cemetery, carpark, scrap, worship, castle, classical) or listed ids, PER to a row (default 6), the witch closing each row; buildings in halves are drawn whole (far then near) unless HALVES=1
    const fams = ["cemetery", "carpark", "scrap", "worship", "castle", "classical"], wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline), col = G.landmarkColours(st), per = window.PER || 6;
    const defs = fams.includes(list) ? G.LANDMARKS.filter(d => d.family === list) : list.split(",").flatMap(id => G.LANDMARK_BY_ID[id] ? [G.LANDMARK_BY_ID[id]] : G.LANDMARKS.filter(d => d.building === id));
    const items = [], seen = new Set();
    for (const d of defs) {
      if (!d.building || window.HALVES) { items.push(G.bake(G.landmarkSprite(d.id, st).whole, col, st, "none")); continue; }
      if (seen.has(d.building)) continue; seen.add(d.building); // the two halves composed at their offsets, as a scene would place them
      const hs = ["far", "near"].map(h => { const L = G.landmarkSprite(`${d.building}-${h}`, st), [dx, dy] = G.groundOffset(0, G.LANDMARK_BY_ID[`${d.building}-${h}`].offset * G.witchPixelsPerUnit(st) / 16); return { b: G.bake(L.whole, col, st, "none"), x: dx - L.origin.x, y: dy - L.origin.y }; });
      const x0 = Math.min(...hs.map(h => h.x)), y0 = Math.min(...hs.map(h => h.y)), W = Math.ceil(Math.max(...hs.map(h => h.x + h.b.w)) - x0), H = Math.ceil(Math.max(...hs.map(h => h.y + h.b.h)) - y0);
      const A = document.createElement("canvas"), N = document.createElement("canvas"); A.width = N.width = W; A.height = N.height = H;
      for (const h of hs) { A.getContext("2d").drawImage(h.b.A, Math.round(h.x - x0), Math.round(h.y - y0)); N.getContext("2d").drawImage(h.b.N, Math.round(h.x - x0), Math.round(h.y - y0)); }
      items.push({ A, N, w: W, h: H });
    }
    for (let i = 0; i < items.length; i += per) rows.push([...items.slice(i, i + per), wit]);
  } else if (what === "partyobjects") { // the party objects: a class (litter, small, furniture, set), all, or listed ids, PER to a row (default 8), the witch closing each row; neon pieces cycle through the neons
    const ids = G.PARTY_CLASSES.includes(list) ? G.PARTY_OBJECTS.filter(d => d.cls === list).map(d => d.id) : list === "all" ? G.PARTY_OBJECTS.map(d => d.id) : list.split(","), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline), per = window.PER || 8;
    const items = ids.map((id, i) => G.bake(G.partySprite(id, st).whole, G.partyColours(st, G.PARTY_LIGHT_NEONS[i % G.PARTY_LIGHT_NEONS.length]), st, "none"));
    for (let i = 0; i < items.length; i += per) rows.push([...items.slice(i, i + per), wit]);
  } else if (what === "partypatch") { // a sample patch of party ground (partyPatch): clusters and loose objects over grass, seeded by the list (a number); the witch in the middle
    const W = 420, H = 250, baked = new Map(), bk = p => { if (!baked.has(p.ref)) baked.set(p.ref, G.bake(p.sprite.whole, p.colours, st, "none")); return baked.get(p.ref); };
    const parts = G.partyPatch(+list || 1, (id, o) => G.scenePlacements(id, st, o), { w: W, h: H }).map(q => { const p = G.scenePiece(q.ref, st), b = bk(p); return { b, flip: q.flip, decal: p.decal, depth: q.depth, x: q.x - (q.flip ? b.w - p.sprite.origin.x : p.sprite.origin.x), y: q.y - p.sprite.origin.y }; });
    const A = document.createElement("canvas"), N = document.createElement("canvas"); A.width = N.width = W; A.height = N.height = H; const a = A.getContext("2d"), n = N.getContext("2d");
    n.fillStyle = "rgb(128,75,240)"; n.fillRect(0, 0, W, H); // (the albedo stays transparent: the sheet lays the ground, and glowing pixels keep their alpha 254)
    const draw = (ctx, img, p) => { const x = Math.round(p.x), y = Math.round(p.y); if (!p.flip) return ctx.drawImage(img, x, y); ctx.save(); ctx.translate(x + p.b.w, y); ctx.scale(-1, 1); ctx.drawImage(img, 0, 0); ctx.restore(); };
    const wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline); parts.push({ b: wit, x: W / 2 - wit.w / 2, y: H / 2 - wit.h + 20, depth: H / 2 + 20 });
    parts.sort((p, q) => (q.decal ? 1 : 0) - (p.decal ? 1 : 0) || p.depth - q.depth).forEach(p => { draw(a, p.b.A, p); draw(n, p.flip ? p.b.NF : p.b.N, p); });
    rows.push([{ A, N, w: W, h: H }]);
  } else if (what === "scenes") { // each scene (small, large, all, or listed ids) composed from its pieces as the prototype would, the witch at its middle; MIRROR=1 turns them the other way
    const names = ["small", "large", "all"].includes(list) ? G.SCENES.filter(S => list === "all" || S.size === list).map(S => S.id) : list.split(","), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline), baked = new Map();
    const bk = piece => { if (!baked.has(piece.ref)) baked.set(piece.ref, G.bake(piece.sprite.whole, piece.colours, st, "none")); return baked.get(piece.ref); };
    for (const name of names) {
      const parts = G.scenePlacements(name, st, { mirror: !!window.MIRROR }).map(p => ({ ...p, b: bk(p.piece), decal: p.piece.decal }));
      parts.push({ b: wit, x: -wit.w / 2, y: -wit.h, depth: 0 });
      const x0 = Math.min(...parts.map(p => p.x)) - 4, y0 = Math.min(...parts.map(p => p.y)) - 4, x1 = Math.max(...parts.map(p => p.x + p.b.w)) + 4, y1 = Math.max(...parts.map(p => p.y + p.b.h)) + 4;
      const mk = () => { const c = document.createElement("canvas"); c.width = Math.ceil(x1 - x0); c.height = Math.ceil(y1 - y0); return c; }, A = mk(), N = mk(), a = A.getContext("2d"), n = N.getContext("2d");
      const draw = (ctx, img, p) => { const x = Math.round(p.x - x0), y = Math.round(p.y - y0); if (!p.flip) return ctx.drawImage(img, x, y); ctx.save(); ctx.translate(x + p.b.w, y); ctx.scale(-1, 1); ctx.drawImage(img, 0, 0); ctx.restore(); };
      parts.sort((p, q) => (q.decal ? 1 : 0) - (p.decal ? 1 : 0) || p.depth - q.depth).forEach(p => { draw(a, p.b.A, p); draw(n, p.flip ? p.b.NF : p.b.N, p); });
      rows.push([{ A, N, w: A.width, h: A.height }]);
    }
    if (window.PER) { const flat = rows.splice(0).map(r => r[0]); for (let i = 0; i < flat.length; i += window.PER) rows.push(flat.slice(i, i + window.PER)); }
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
  } else if (what === "paths") { // per kind (or listed): a path swept along an S-curve with a branch meeting it, laid on the ground at the game's view; then its strip, end, Y and T textures flat; the witch for scale
    const ids = list === "all" ? G.PATH_IDS : list.split(","), col = G.pathColours(st), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline), squash = Math.sin(.52);
    const view = sp => { const h = Math.ceil(sp.h * squash), o = new G.Sprite(sp.w, h); for (let y = 0; y < h; y++) for (let x = 0; x < sp.w; x++) { const i = Math.floor(y / squash) * sp.w + x; if (sp.m[i]) o.px(x, y, sp.m[i], sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]); } return o; }; // ground space to the game's view
    for (const id of ids) {
      const K = G.PATH_KINDS[id], w = K.width, R = Math.max(6, w * 2.2), S = []; for (let i = 0; i <= 24; i++) { const t = i / 24; S.push([t * R * 3, Math.sin(t * Math.PI * 2) * R * .5]); }
      const branch = [[R * 1.5, Math.sin(Math.PI) * R * .5], [R * 1.5 + R * .6, R * 1.1], [R * 1.5 + R * .5, R * 1.9]];
      const swept = G.sweepPath(id, [S, branch], { variant: window.VARIANT || 0 }), T = G.pathTextures(id, { variant: window.VARIANT || 0 }), b = sp => G.bake(sp, col, st, "none");
      rows.push([b(view(swept.sp)), b(view(T.strip)), b(view(T.end)), b(view(T.y)), b(view(T.t)), wit]);
    }
  } else if (what === "pathpieces") { // the 3D pieces (props, stairs, bridges, railway landmarks) or listed, PER to a row, the witch closing each row; then the railway's points, broken end and crossing
    const ids = list === "all" ? G.PATH_PIECES.map(d => d.id) : list.split(","), col = G.pathColours(st), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline), per = window.PER || 7, squash = Math.sin(.52);
    const view = sp => { const h = Math.ceil(sp.h * squash), o = new G.Sprite(sp.w, h); for (let y = 0; y < h; y++) for (let x = 0; x < sp.w; x++) { const i = Math.floor(y / squash) * sp.w + x; if (sp.m[i]) o.px(x, y, sp.m[i], sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]); } return o; };
    const items = ids.map(id => G.bake(G.pathPieceSprite(id, st).sp, col, st, "none"));
    for (let i = 0; i < items.length; i += per) rows.push([...items.slice(i, i + per), wit]);
    if (list === "all") rows.push([G.bake(view(G.railPoints({ variant: 1 })), col, st, "none"), G.bake(view(G.railBrokenEnd()), col, st, "none"), G.bake(view(G.railCrossing()), col, st, "none"), wit]);
  } else if (what === "canopy") { // per area (listed): a 3 x 3 patch of its trees' crowns as treetop mode shows them (top halves, close-packed, back to front), side by side
    const ids = list.split(","), panels = [];
    for (const id of ids) {
      const vs = G.areaTreeVariants(id, st).filter(v => v.heightClass !== "sapling"), r = G.rng(id.length * 31 + 7), items = [];
      const ws = vs.map(v => v.top.w).sort((p, q) => p - q), cw = ws[ws.length >> 1] * .7, ch = cw * .55; // spaced by the middling crown
      for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) { const v = vs[Math.floor(r() * vs.length)]; items.push({ v, x: i * cw + (j % 2) * cw * .5 + (r() - .5) * cw * .2, y: j * ch + (r() - .5) * ch * .2 }); }
      const W = Math.ceil(cw * 3.6 + Math.max(...vs.map(v => v.top.w))), H = Math.ceil(ch * 3 + Math.max(...vs.map(v => v.top.h)));
      const A = document.createElement("canvas"), N = document.createElement("canvas"); A.width = N.width = W; A.height = N.height = H; const a = A.getContext("2d"), n = N.getContext("2d");
      for (const it of items.sort((p, q) => p.y - q.y)) { const t = it.v.top, x = Math.round(it.x + 4), y = Math.round(it.y + H - ch * 3 - t.h + ch); a.drawImage(t.A, x, y - Math.round(it.v.crownY * .3)); n.drawImage(t.N, x, y - Math.round(it.v.crownY * .3)); }
      panels.push({ A, N, w: W, h: H });
    }
    for (let i = 0; i < panels.length; i += 4) rows.push(panels.slice(i, i + 4));
  } else if (what === "species") { // every tree species (or listed) at mature height: from the side (whole), then its crown alone as treetop mode shows it, then its bottom half alone as ground mode shows it; the witch for scale
    const ids = list === "all" ? Object.keys(G.TREE_SPECIES) : list.split(","), K = 2 / (st.pixel || 2), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline), per = window.PER || 5, items = [];
    for (const id of ids) { const S = G.TREE_SPECIES[id], r = G.rng(7 + id.length * 13), ts = { ...st }, t = S.fn(r, ts, st.treeSize * K), c = G.treeColours(G.rng(3), ts, S.fn), p = G.splitTree(t); items.push(G.bake(t.sp, c, st, "none"), G.bake(p.top, c, st, "none"), G.bake(p.bot, c, st, "none")); }
    for (let i = 0; i < items.length; i += per * 3) rows.push([...items.slice(i, i + per * 3), wit]);
  } else if (what === "areas") { // per area type: floor tile, walls, small, big, set piece, its creature (young)
    const ids = list === "all" ? G.AREAS.map(a => a.id) : list.split(",");
    for (const id of ids) { const a = G.areaAssets(id, st); rows.push([a.floor, ...a.walls, ...a.small, ...a.big, ...(a.setPiece ? [a.setPiece] : [])].map(x => x.sp).concat([G.bake(G.critter(a.def.creature, 1, 0, st), G.speciesColours(a.def.creature, st), st, st.cOutline)])); }
  } else if (what !== "discostrip" && what !== "discolooks") {
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
