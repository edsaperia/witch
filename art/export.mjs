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
  for (const S of G.SPECIES) for (const level of [0, 1, 2]) for (const frame of [0, 1]) for (const facing of ["towards", "away"])
    push({ id: `${S.id}-${["baby", "young", "legend"][level]}-walk${frame}${facing === "away" ? "-away" : ""}`, kind: "creature", species: S.id, level, frame, facing }, G.critter(S.id, level, frame, st, facing), G.speciesColours(S.id, st), st.cOutline);
  // trees: three of each kind, whole and split into the trunk below the crown and the rest
  for (const [key, f] of G.TREE_TYPES) for (let v = 0; v < 3; v++) {
    const r = G.rng(seed * 13 + v * 101 + key.length), t = G.finishTree(f(r, st, st.treeSize * K * G.uni(r, .9, 1.1)), st, r), col = G.treeColours(r, st, f), parts = G.splitTree(t);
    const name = key.slice(1).toLowerCase(), meta = { kind: "tree", type: name, variant: v, frame: 0, anchorX: t.sp.w / 2 };
    push({ ...meta, id: `tree-${name}-${v}`, part: "whole" }, t.sp, col);
    push({ ...meta, id: `tree-${name}-${v}-top`, part: "top" }, parts.top, col);
    push({ ...meta, id: `tree-${name}-${v}-bottom`, part: "bottom" }, parts.bot, col);
  }
  for (let v = 0; v < 8; v++) { const bu = G.bush(G.rng(seed * 7 + v * 3), { ...st, bushSize: st.bushSize * K }); push({ id: `bush-${v}`, kind: "bush", variant: v, frame: 0 }, bu.sp, bu.colours); }
  push({ id: "witch", kind: "witch", frame: 0 }, G.witchSprite(), G.witchColours(st));
  // area types: a floor tile and each prop, already baked by areaAssets
  for (const A of G.AREAS) {
    const a = G.areaAssets(A.id, st), add = (x, role, i) => list.push({ id: `area-${A.id}-${role}${i === undefined ? "" : "-" + i}`, kind: role === "floor" ? "area-floor" : "area-prop", area: A.id, role, prop: x.kind, text: x.text || "", frame: 0, w: x.sp.w, h: x.sp.h, anchor: { x: x.sp.w / 2, y: x.sp.h }, albedo: png(x.sp.A), normal: png(x.sp.N) });
    add(a.floor, "floor");
    a.walls.forEach((x, i) => add(x, "wall", i)); a.small.forEach((x, i) => add(x, "small", i)); a.big.forEach((x, i) => add(x, "big", i));
    if (a.setPiece) add(a.setPiece, "set", 0);
  }
  return { list, style: st, placement: { wallsBlock: G.WALLS_BLOCK, setPieceChance: G.SET_PIECE_CHANCE }, areas: G.AREAS.map(({ id, name, creature, by, text }) => ({ id, name, creature, by, text })) };
}, { style, seed });
if (b.errors.length) console.error(b.errors.join("\n"));
await b.close();

const manifest = { generator: "art/generator.js", style: assets.style, placement: assets.placement, areas: assets.areas, conventions: {
  albedo: "RGBA; alpha 254 = glowing pixel, draw unlit", normal: "RGB = xyz from [-1,1] to [0,255]; x right, y down, z to viewer; flip x when mirrored",
  facing: "right; creatures come turned towards the viewer (facing towards) and turned away (facing away, ids ending -away): moving down the screen use towards, moving up use away", anchor: "pixels from top-left; the point on the ground (feet, trunk base); flyers (bat, moth) stand on their shadow",
  floor: "area-floor tiles repeat over the ground; their normals face up" }, assets: [] };
for (const a of assets.list) {
  const { albedo, normal, anchorX, ...meta } = a;
  writeFileSync(join(out, `${a.id}.png`), Buffer.from(albedo, "base64"));
  writeFileSync(join(out, `${a.id}.normal.png`), Buffer.from(normal, "base64"));
  manifest.assets.push({ ...meta, size: { w: a.w, h: a.h }, files: { albedo: `${a.id}.png`, normal: `${a.id}.normal.png` } });
  delete manifest.assets.at(-1).w; delete manifest.assets.at(-1).h;
}
writeFileSync(join(out, "manifest.json"), JSON.stringify(manifest, null, 1));
console.log(`exported ${assets.list.length} assets (${assets.list.length * 2} PNGs) to ${out.startsWith(ROOT + "/") ? out.slice(ROOT.length + 1) : out}`);
