// Exports every asset for one style as PNGs any engine can load: an albedo image and a
// normal map per frame, plus art/out/manifest.json listing them. Runs the generator in
// headless Chromium (canvases), through Playwright.
//   node art/export.mjs [style.json] [out dir, default art/out]
// style.json is either a plain style ({ambient: …, pixel: 2, …}) or the Witch Art Lab's
// style file ({style: {…}, kinds: […], forestSeed: n}); knobs it leaves out take their
// defaults. With no file, the default style is exported.
//
// Albedo: RGBA; alpha 254 marks a pixel that glows (draw it unlit), 255 an ordinary one.
// Normal map: RGB = (x, y, z) mapped from [-1, 1] to [0, 255], x to the right, y down the
// image, z towards the viewer; flip x for a sprite drawn facing left. Everything faces right.
// Anchor: the point that stands on the ground, in pixels from the image's top-left.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { openBrowser, ROOT } from "./headless.mjs";

const [styleArg, outArg = "art/out"] = process.argv.slice(2);
const input = styleArg ? JSON.parse(readFileSync(styleArg, "utf8")) : {};
const style = input.style || input, seed = input.forestSeed || 3;
const out = resolve(outArg);
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html");
const assets = await b.page.evaluate(async ({ style, seed }) => {
  const G = await import("/art/generator.js");
  const st = { ...G.defaultStyle(), ...style }, K = 2 / (st.pixel || 2), list = [];
  const png = c => c.toDataURL("image/png").split(",")[1];
  // the feet: the middle of what touches the bottom row
  const feet = sp => { let x0 = sp.w, x1 = -1; for (let x = 0; x < sp.w; x++) if (sp.m[(sp.h - 1) * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); } return x1 < 0 ? sp.w / 2 : (x0 + x1 + 1) / 2; };
  const push = (meta, sp, colours, outline) => {
    const bk = G.bake(sp, colours, st, outline);
    list.push({ ...meta, w: bk.w, h: bk.h, anchor: { x: meta.anchorX ?? feet(sp), y: bk.h }, albedo: png(bk.A), normal: png(bk.N) });
  };
  for (const S of G.SPECIES) for (const level of [0, 1, 2, 3]) for (const frame of [0, 1]) for (const facing of ["towards", "away"])
    push({ id: `${S.id}-${G.LEVELS[level]}-walk${frame}${facing === "away" ? "-away" : ""}`, kind: "creature", species: S.id, level, frame, facing }, G.critter(S.id, level, frame, st, facing), G.speciesColours(S.id, st), st.cOutline);
  // trees: three of each kind, whole and split into the trunk below the crown and the rest
  for (const [key, f] of G.TREE_TYPES) for (let v = 0; v < 3; v++) {
    const r = G.rng(seed * 13 + v * 101 + key.length), t = G.finishTree(f(r, st, st.treeSize * K * G.uni(r, .9, 1.1)), st, r), col = G.treeColours(r, st, f), parts = G.splitTree(t);
    const name = key.slice(1).toLowerCase(), meta = { kind: "tree", type: name, variant: v, frame: 0, anchorX: t.sp.w / 2 };
    push({ ...meta, id: `tree-${name}-${v}`, part: "whole" }, t.sp, col);
    push({ ...meta, id: `tree-${name}-${v}-top`, part: "top" }, parts.top, col);
    push({ ...meta, id: `tree-${name}-${v}-bottom`, part: "bottom" }, parts.bot, col);
  }
  for (let v = 0; v < 8; v++) { const bu = G.bush(G.rng(seed * 7 + v * 3), { ...st, bushSize: st.bushSize * K }); push({ id: `bush-${v}`, kind: "bush", variant: v, frame: 0 }, bu.sp, bu.colours); }
  // the witch: three hover frames, a lean, rise and descend (two frames each), fast (three) and brake (two), each turned towards and away ("witch" alone is frame 0, towards)
  const wc = G.witchColours(st);
  push({ id: "witch", kind: "witch", frame: 0, facing: "towards" }, G.witchSprite(st), wc, st.cOutline);
  for (const facing of ["towards", "away"]) {
    for (const frame of [0, 1, 2]) push({ id: `witch-hover${frame}${facing === "away" ? "-away" : ""}`, kind: "witch", frame, facing }, G.witchSprite(st, { frame, facing }), wc, st.cOutline);
    push({ id: `witch-lean${facing === "away" ? "-away" : ""}`, kind: "witch", pose: "lean", frame: 0, facing }, G.witchSprite(st, { lean: true, facing }), wc, st.cOutline);
    // on foot: each frame with her free hand (where a held sigil goes) and her hat tip, in pixels from the top-left
    for (const [pose, { frames, fps }] of Object.entries(G.WITCH_FOOT_POSES)) for (let frame = 0; frame < frames; frame++) { const sp = G.witchSprite(st, { pose, frame, facing }); push({ id: `witch-${pose}${frame}${facing === "away" ? "-away" : ""}`, kind: "witch", pose, frame, frames, fps, facing, onFoot: true, anchors: sp.anchors }, sp, wc, st.cOutline); }
    for (const [pose, n] of [["rise", 2], ["descend", 2], ["fast", 3], ["brake", 2]]) for (let frame = 0; frame < n; frame++) push({ id: `witch-${pose}${frame}${facing === "away" ? "-away" : ""}`, kind: "witch", pose, frame, facing }, G.witchSprite(st, { pose, frame, facing }), wc, st.cOutline);
  }
  // light sources: campfire frames, magic stones, and a pond with a mask of its water
  const L = G.lightProps(st);
  const addBaked = (meta, bk) => list.push({ ...meta, w: bk.w, h: bk.h, anchor: { x: bk.w / 2, y: bk.h }, albedo: png(bk.A), normal: png(bk.N), ...(bk.mask ? { mask: png(bk.mask) } : {}) });
  L.campfire.forEach((bk, frame) => addBaked({ id: `light-campfire-${frame}`, kind: "light", light: "campfire", frame }, bk));
  for (const [v, bk] of Object.entries(L.stones)) addBaked({ id: `light-magic-stone-${v}`, kind: "light", light: "magic-stone", variant: v, frame: 0 }, bk);
  addBaked({ id: "light-pond", kind: "light", light: "pond", frame: 0 }, L.pond);
  // the witch's treehouse: whole, top and bottom, towards and away, with its anchors (base, seat, door, lights)
  for (const facing of ["towards", "away"]) {
    const T = G.treehouseSprite(st, { facing }), hc = G.treehouseColours(st), sfx = facing === "away" ? "-away" : "";
    for (const [part, sp] of [["whole", T.whole], ["top", T.top], ["bottom", T.bot]]) push({ id: `treehouse${part === "whole" ? "" : "-" + part}${sfx}`, kind: "treehouse", part, facing, frame: 0, crownY: T.crownY, metres: T.metres, anchors: T.anchors, anchorX: T.anchors.base.x }, sp, hc, "none");
  }
  // world decorations: ruins (two conditions each), rocks and freak trees; tall ones also split into top and bottom
  const dcol = G.decorColours(st);
  for (const d of G.DECOR) for (let variant = 0; variant < d.variants; variant++) {
    const D = G.decorSprite(d.id, st, { variant }), name = `decor-${d.family}-${d.id}${d.variants > 1 ? "-" + variant : ""}`, meta = { kind: "decor", family: d.family, decor: d.id, variant, condition: d.family === "ruins" ? ["weathered", "overgrown"][variant] : undefined, text: d.desc, glow: !!d.glow, metres: D.metres, crownY: d.split == null ? undefined : D.crownY, frame: 0 };
    push({ ...meta, id: name, part: "whole" }, D.whole, dcol, "none");
    if (d.split != null) { push({ ...meta, id: name + "-top", part: "top" }, D.top, dcol, "none"); push({ ...meta, id: name + "-bottom", part: "bottom" }, D.bot, dcol, "none"); }
  }
  // lakes: the water tile, the shore band, reeds and lily pads for the edge
  { const L = G.lakeKit(st); push({ id: "lake-water", kind: "lake", part: "water", frame: 0, tile: true }, L.water, L.colours, "none"); push({ id: "lake-shore", kind: "lake", part: "shore", frame: 0, tile: true }, L.shore, L.colours, "none");
    L.reeds.forEach((sp, i) => push({ id: `lake-reeds-${i}`, kind: "lake", part: "reeds", variant: i, frame: 0 }, sp, L.colours, "none")); L.lilies.forEach((sp, i) => push({ id: `lake-lilies-${i}`, kind: "lake", part: "lilies", variant: i, frame: 0 }, sp, L.colours, "none")); }
  // soundsystems: three stacks, each playing (three frames), damaged (two flicker frames) and destroyed
  for (let v = 0; v < G.SOUNDSYSTEMS.length; v++) {
    const S = G.SOUNDSYSTEMS[v], col = G.soundsystemColours(v), one = (state, frame) => push({ id: `soundsystem-${S.id}-${state}${state === "destroyed" ? "" : "-" + frame}`, kind: "soundsystem", variant: S.id, crystal: S.crystal, state, frame, anchorX: undefined }, G.soundsystemSprite(st, { variant: v, state, frame }), col, "none");
    for (const f of [0, 1, 2]) one("playing", f);
    for (const f of [0, 1]) one("damaged", f);
    one("destroyed", 0);
  }
  // area types: a floor tile and each prop, already baked by areaAssets
  for (const A of G.AREAS) {
    const a = G.areaAssets(A.id, st), add = (x, role, i) => list.push({ id: `area-${A.id}-${role}${i === undefined ? "" : "-" + i}`, kind: role === "floor" ? "area-floor" : "area-prop", area: A.id, role, prop: x.kind, text: x.text || "", ...(x.metres ? { metres: x.metres } : {}), frame: 0, w: x.sp.w, h: x.sp.h, anchor: { x: x.sp.w / 2, y: x.sp.h }, albedo: png(x.sp.A), normal: png(x.sp.N) });
    add(a.floor, "floor");
    a.walls.forEach((x, i) => add(x, "wall", i)); a.small.forEach((x, i) => add(x, "small", i)); a.big.forEach((x, i) => add(x, "big", i));
    if (a.setPiece) add(a.setPiece, "set", 0);
    // its trees across a range of heights: each whole, and split into the crown (top, cut out from the treetops) and the trunk (bottom)
    G.areaTreeVariants(A.id, st).forEach((v, i) => { for (const [part, b] of [["whole", v.whole], ["top", v.top], ["bottom", v.bot]]) list.push({ id: `area-${A.id}-tree-${i}${part === "whole" ? "" : "-" + part}`, kind: "area-tree", area: A.id, variant: i, part, heightClass: v.heightClass, weight: v.weight, scale: v.scale, metres: v.metres, crownY: v.crownY, frame: 0, w: b.w, h: b.h, anchor: { x: b.w / 2, y: b.h }, albedo: png(b.A), normal: png(b.N) }); });
  }
  // sigils: an SVG and a 64 px PNG each, with their strokes (in writing order) for the manifest
  const sigils = G.SIGIL_IDS.map(id => {
    const c = document.createElement("canvas"); c.width = c.height = 64; G.drawSigil(c.getContext("2d"), id, { size: 64, glow: 4 });
    return { id: `sigil-${id}`, species: id, neon: G.SIGIL_NEON[id], colour: G.sigilColour(id), svg: G.sigilSVG(id, { size: 64 }), levels: [0, 1, 2, 3].map(level => G.sigilSVG(id, { size: 128, level })), levelPngs: [0, 1, 2, 3].map(level => { const k = document.createElement("canvas"); k.width = k.height = 64; G.drawSigil(k.getContext("2d"), id, { size: 64, level, glow: 4 }); return png(k); }), png: png(c), strokes: G.SIGILS[id] };
  });
  return { list, sigils, sigilFormat: { box: "unit square, x right, y down", stroke: G.SIGIL_STROKE, dot: G.SIGIL_DOT, drawTime: G.SIGIL_DRAW_TIME, groundPitch: G.GROUND_PITCH, neon: G.NEON, levels: [0, 1, 2, 3].map(l => G.sigilFrame(l)), stack: G.STACK_TUNING, transitionTime: G.SIGIL_TRANSITION_TIME }, style: st, placement: { wallsBlock: G.WALLS_BLOCK, setPieceChance: G.SET_PIECE_CHANCE }, areas: G.AREAS.map(A => ({ id: A.id, name: A.name, creature: A.creature, by: A.by, text: A.text, layout: A.layout, rockTint: G.rockTint(A) })) };
}, { style, seed });
if (b.errors.length) console.error(b.errors.join("\n"));
await b.close();

const manifest = { generator: "art/generator.js", style: assets.style, placement: assets.placement, areas: assets.areas, conventions: {
  albedo: "RGBA; alpha 254 = glowing pixel, draw unlit", normal: "RGB = xyz from [-1,1] to [0,255]; x right, y down, z to viewer; flip x when mirrored",
  facing: "right; creatures come turned towards the viewer (facing towards) and turned away (facing away, ids ending -away): moving down the screen use towards, moving up use away", anchor: "pixels from top-left; the point on the ground (feet, trunk base); flyers (bat, moth) stand on their shadow",
  floor: "area-floor tiles repeat over the ground; their normals face up", areaTree: "area-tree: each area's trees across a range of heights (heightClass sapling, mature, tall or giant; weight: the share of the area's trees to place of it); whole, top (the crown, cut out from the treetops) and bottom (the trunk below crownY); metres at 16 art px per metre: height, crownBase (above the ground), crownHeight, crownRadius", witchOnFoot: "witch on foot (onFoot: true): stand (idle loop), land and takeoff (played once, about 0.3 s, between hovering and stand), talk (four gestures, loop), placeSigil and liftSigil (played once); frames and fps per pose; anchors.hand is her free hand (attach a held sigil there), anchors.hatTip her hat's tip (the sigil stack hangs above it), both in pixels from the top-left; she stands at anchor like the creatures", treehouse: "the witch's home, near the dancefloor: whole, top (the crown and everything above the van's roof, from crownY up: treetop mode, cut out round the witch) and bottom (the trunk, van and terrace); anchors in pixels from the top-left: base (the trunk's foot; the sprite's anchor), seat (put the witch's sit pose's anchor here: she starts the game sitting on the terrace), door, lights (light sources, each with rgb and kind); built at the witch's scale", witchSit: "witch sit: two idle frames on the terrace chair (swinging her legs, looking out), at 1.5 fps; drawn over the treehouse at anchors.seat", decor: "world decorations (decor-<family>-<id>[-<variant>]): family ruins (variant 0 weathered, 1 overgrown), rocks (multiply their colours by the area's rockTint) or freak (freak trees); metres: width, height and footprint (the radius it takes on the ground); tall ones also come as -top (from crownY up: treetop mode, cut out round the witch) and -bottom; glow: it has a magical glowing touch", lake: "lakes: the prototype builds a lake as a signed-distance blob on the ground (overlapping circles, or noise on a radius); inside it repeats lake-water (64 x 48, WATER pixels take the moon's reflection like the ponds); across the edge it maps lake-shore (64 x 16: u along the edge, tiling; v from the water, top, to the land, bottom; 1 to 2 m wide); along the band it scatters lake-reeds on the land side, lake-lilies on the water side and rocks from decor-rocks half in the water", soundsystem: "the party's soundsystem: playing frames pump the cones (loop 0,1,2), damaged frames flicker (loop 0,1), destroyed is one frame; about three times the witch's height", mask: "light-pond has a mask: white where its pixels are water, for drawing the moon's glint and reflection" }, assets: [] };
for (const a of assets.list) {
  const { albedo, normal, mask, anchorX, ...meta } = a;
  writeFileSync(join(out, `${a.id}.png`), Buffer.from(albedo, "base64"));
  writeFileSync(join(out, `${a.id}.normal.png`), Buffer.from(normal, "base64"));
  if (mask) writeFileSync(join(out, `${a.id}.mask.png`), Buffer.from(mask, "base64"));
  manifest.assets.push({ ...meta, size: { w: a.w, h: a.h }, files: { albedo: `${a.id}.png`, normal: `${a.id}.normal.png`, ...(mask ? { mask: `${a.id}.mask.png` } : {}) } });
  delete manifest.assets.at(-1).w; delete manifest.assets.at(-1).h;
}
manifest.sigils = { format: { ...assets.sigilFormat, levels: "each level's frame (metres across on the ground, core thickness, halo, rings, dots, band, rays, shimmer); levels 0 baby (bare), 1 young (a dotted circle), 2 adult (a full circle), 3 legend (a banded double ring with rays); the -baby, -young, -adult and -legend SVGs and 64 px PNGs carry it", neon: "the palette; each sigil names its slot (neon), so the game can recolour it", strokes: "in writing order, each drawn from its first point: { l: [[x, y], ...] } a polyline, { a: [cx, cy, r, from, to] } an arc (degrees, 0 right, 90 down), { d: [x, y] } an end dot" }, list: [] };
for (const sg of assets.sigils) {
  writeFileSync(join(out, `${sg.id}.svg`), sg.svg);
  writeFileSync(join(out, `${sg.id}.png`), Buffer.from(sg.png, "base64"));
  const names = ["baby", "young", "adult", "legend"], lv = {};
  names.forEach((n, l) => { writeFileSync(join(out, `${sg.id}-${n}.svg`), sg.levels[l]); writeFileSync(join(out, `${sg.id}-${n}.png`), Buffer.from(sg.levelPngs[l], "base64")); lv[n] = { svg: `${sg.id}-${n}.svg`, png: `${sg.id}-${n}.png` }; });
  manifest.sigils.list.push({ id: sg.id, species: sg.species, neon: sg.neon, colour: sg.colour, files: { svg: `${sg.id}.svg`, png: `${sg.id}.png`, ...lv }, strokes: sg.strokes });
}
writeFileSync(join(out, "manifest.json"), JSON.stringify(manifest, null, 1));
console.log(`exported ${assets.list.length} assets (${assets.list.length * 2} PNGs) and ${assets.sigils.length} sigils (SVG and PNG) to ${out.startsWith(ROOT + "/") ? out.slice(ROOT.length + 1) : out}`);
