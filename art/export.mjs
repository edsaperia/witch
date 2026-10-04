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
  // heading straight up the screen (away) and straight down it (towards): hover x3, lean, fast x3, brake x2, with her hand and hat-tip anchors
  for (const heading of ["away", "towards"]) {
    const one = (o, name) => { const sp = G.witchSprite(st, { heading, ...o }); push({ id: `witch-${heading === "away" ? "up" : "down"}-${name}`, kind: "witch", heading, pose: o.pose || (o.lean ? "lean" : "hover"), frame: o.frame || 0, anchors: sp.anchors }, sp, wc, st.cOutline); };
    for (const frame of [0, 1, 2]) one({ frame }, `hover${frame}`);
    one({ lean: true }, "lean");
    for (const frame of [0, 1, 2]) one({ pose: "fast", frame }, `fast${frame}`);
    for (const frame of [0, 1]) one({ pose: "brake", frame }, `brake${frame}`);
  }
  // her lean cycle (WITCH_FLIGHT_POSES.lean: 4 frames, looping; the game plays it faster with speed), side on and heading up and down the screen
  for (const facing of ["towards", "away"]) for (let frame = 0; frame < 4; frame++) { const sp = G.witchSprite(st, { pose: "lean", frame, facing }); push({ id: `witch-leancycle${frame}${facing === "away" ? "-away" : ""}`, kind: "witch", pose: "leanCycle", frame, frames: 4, fps: G.WITCH_FLIGHT_POSES.lean.fps, facing, anchors: sp.anchors }, sp, wc, st.cOutline); }
  for (const heading of ["away", "towards"]) for (let frame = 0; frame < 4; frame++) { const sp = G.witchSprite(st, { pose: "lean", frame, heading }); push({ id: `witch-${heading === "away" ? "up" : "down"}-leancycle${frame}`, kind: "witch", heading, pose: "leanCycle", frame, frames: 4, fps: G.WITCH_FLIGHT_POSES.lean.fps, anchors: sp.anchors }, sp, wc, st.cOutline); }
  // party witches: each outfit in its own colours (partyWitch(0) for it; the game can draw others with partyWitch(seed)), towards and away: hovering, the lean
  // cycle, rising and descending, landing and taking off, standing, talking, and every party pose, with their anchors (hand, hatTip; pair, back, cup)
  for (const P of G.PARTY_OUTFITS) {
    const pw = G.partyWitch(0, { outfit: P.id }), col = pw.colours(st), poses = [["hover", 3], ["lean", 4], ["rise", 2], ["descend", 2], ...Object.entries(G.WITCH_FOOT_POSES).filter(([k, v]) => v.party || ["land", "takeoff", "stand", "talk"].includes(k)).map(([k, v]) => [k, v.frames])];
    for (const facing of ["towards", "away"]) for (const [pose, n] of poses) for (let frame = 0; frame < n; frame++) {
      const sp = G.witchSprite(st, { ...(pose === "hover" ? {} : { pose }), frame, facing, look: pw.look }), F = G.WITCH_FOOT_POSES[pose] || G.WITCH_FLIGHT_POSES[pose];
      push({ id: `party-${P.id}-${pose}${frame}${facing === "away" ? "-away" : ""}`, kind: "party-witch", outfit: P.id, pose, frame, frames: n, fps: F.fps, facing, onFoot: !!G.WITCH_FOOT_POSES[pose], anchors: sp.anchors }, sp, col, st.cOutline);
    }
  }
  const witchParty = { footPoses: G.WITCH_FOOT_POSES, flightPoses: G.WITCH_FLIGHT_POSES, pairs: G.WITCH_PAIRS, limboBar: G.LIMBO_BAR, outfits: G.PARTY_OUTFITS.map(o => ({ id: o.id, name: o.name, look: { ...G.DEFAULT_LOOK, ...o.look } })) };
  // light sources: campfire frames, magic stones, and a pond with a mask of its water
  const L = G.lightProps(st);
  const addBaked = (meta, bk) => list.push({ ...meta, w: bk.w, h: bk.h, anchor: { x: bk.w / 2, y: bk.h }, albedo: png(bk.A), normal: png(bk.N), ...(bk.mask ? { mask: png(bk.mask) } : {}) });
  L.campfire.forEach((bk, frame) => addBaked({ id: `light-campfire-${frame}`, kind: "light", light: "campfire", frame }, bk));
  for (const [v, bk] of Object.entries(L.stones)) addBaked({ id: `light-magic-stone-${v}`, kind: "light", light: "magic-stone", variant: v, frame: 0 }, bk);
  addBaked({ id: "light-pond", kind: "light", light: "pond", frame: 0 }, L.pond);
  // the witch's treehouse: whole, top and bottom, and fore (the DJ table, drawn over her as she sits behind it; same size and origin as whole), towards and away, with its anchors (base, seat, door, camera, lights)
  for (const facing of ["towards", "away"]) {
    const T = G.treehouseSprite(st, { facing }), hc = G.treehouseColours(st), sfx = facing === "away" ? "-away" : "";
    for (const [part, sp] of [["whole", T.whole], ["top", T.top], ["bottom", T.bot], ["fore", T.fore]]) push({ id: `treehouse${part === "whole" ? "" : "-" + part}${sfx}`, kind: "treehouse", part, facing, frame: 0, crownY: T.crownY, metres: T.metres, anchors: T.anchors, anchorX: T.anchors.base.x }, sp, hc, "none");
  }
  // modern relics, the playground and the sports grounds; tall ones also split into top and bottom; decals lie flat on the ground
  const rcol = G.relicColours(st);
  for (const d of G.RELICS) {
    const R = G.relicSprite(d.id, st), name = `relic-${d.family}-${d.id}`, meta = { kind: "relic", family: d.family, relic: d.id, text: d.desc, glow: !!d.glow, decal: !!d.decal, metres: R.metres, origin: R.origin, crownY: d.split == null ? undefined : R.crownY, frame: 0 };
    push({ ...meta, id: name, part: "whole" }, R.whole, rcol, "none");
    if (d.split != null) { push({ ...meta, id: name + "-top", part: "top" }, R.top, rcol, "none"); push({ ...meta, id: name + "-bottom", part: "bottom" }, R.bot, rcol, "none"); }
  }
  // world decorations: ruins (two conditions each), rocks and freak trees; tall ones also split into top and bottom
  const dcol = G.decorColours(st);
  for (const d of G.DECOR) for (let variant = 0; variant < d.variants; variant++) {
    const D = G.decorSprite(d.id, st, { variant }), name = `decor-${d.family}-${d.id}${d.variants > 1 ? "-" + variant : ""}`, meta = { kind: "decor", family: d.family, decor: d.id, variant, condition: d.family === "ruins" ? ["weathered", "overgrown"][variant] : undefined, text: d.desc, glow: !!d.glow, metres: D.metres, crownY: d.split == null ? undefined : D.crownY, frame: 0 };
    push({ ...meta, id: name, part: "whole" }, D.whole, dcol, "none");
    if (d.split != null) { push({ ...meta, id: name + "-top", part: "top" }, D.top, dcol, "none"); push({ ...meta, id: name + "-bottom", part: "bottom" }, D.bot, dcol, "none"); }
  }
  // countryside and street pieces (farm, street, the scenes' pieces); tall ones also split into top and bottom
  const ccol = G.countryColours(st);
  for (const d of G.COUNTRY) {
    const R = G.countrySprite(d.id, st), name = `country-${d.family}-${d.id}`, meta = { kind: "country", family: d.family, piece: d.id, text: d.desc, glow: !!d.glow, metres: R.metres, origin: R.origin, crownY: d.split == null ? undefined : R.crownY, frame: 0 };
    push({ ...meta, id: name, part: "whole" }, R.whole, ccol, "none");
    if (d.split != null) { push({ ...meta, id: name + "-top", part: "top" }, R.top, ccol, "none"); push({ ...meta, id: name + "-bottom", part: "bottom" }, R.bot, ccol, "none"); }
  }
  // the large scenes' pieces (cemetery, car park, scrap yard, places of worship in far and near halves, castle, classical)
  const lcol = G.landmarkColours(st);
  for (const d of G.LANDMARKS) {
    const R = G.landmarkSprite(d.id, st), name = `landmark-${d.family}-${d.id}`, meta = { kind: "landmark", family: d.family, piece: d.id, building: d.building, half: d.half, text: d.desc, glow: !!d.glow, decal: !!d.decal, metres: R.metres, origin: R.origin, crownY: d.split == null ? undefined : R.crownY, frame: 0 };
    push({ ...meta, id: name, part: "whole" }, R.whole, lcol, "none");
    if (d.split != null) { push({ ...meta, id: name + "-top", part: "top" }, R.top, lcol, "none"); push({ ...meta, id: name + "-bottom", part: "bottom" }, R.bot, lcol, "none"); }
  }
  // scenes: each lists its pieces (by sprite name: a country piece's id, relic:<id> or decor:<id>[/<variant>]) in metres, as authored and mirrored
  const scenes = G.SCENES.map(S => ({ ...G.sceneLayout(S.id, st), mirrored: G.sceneLayout(S.id, st, { mirror: true }).pieces }));
  // lakes: the water tile, the shore band, reeds and lily pads for the edge
  { const L = G.lakeKit(st); push({ id: "lake-water", kind: "lake", part: "water", frame: 0, tile: true }, L.water, L.colours, "none"); push({ id: "lake-shore", kind: "lake", part: "shore", frame: 0, tile: true }, L.shore, L.colours, "none");
    L.reeds.forEach((sp, i) => push({ id: `lake-reeds-${i}`, kind: "lake", part: "reeds", variant: i, frame: 0 }, sp, L.colours, "none")); L.lilies.forEach((sp, i) => push({ id: `lake-lilies-${i}`, kind: "lake", part: "lilies", variant: i, frame: 0 }, sp, L.colours, "none")); }
  // paths: each kind's ground textures (strip, end, Y and T junctions; in ground space, 16 px per metre), the railway's points,
  // broken end and crossing, and the 3D pieces (edge props, stairs, bridges, railway landmarks) at the game's view
  const pcol = G.pathColours(st), paths = {};
  for (const id of G.PATH_IDS) {
    const K = G.PATH_KINDS[id], vars = K.variants || ["plain"]; paths[id] = { width: K.width, period: K.period, ppm: G.PATH_PPM, text: K.desc, moods: K.moods, glow: !!K.glow, variants: vars, textures: {}, props: G.PATH_PIECES.filter(d => d.path === id).map(d => `pathpiece-${d.id}`) };
    vars.forEach((vn, variant) => { const T = G.pathTextures(id, { variant }), sfx = vars.length > 1 ? `-${vn}` : ""; for (const part of ["strip", "end", "y", "t"]) { const name = `path-${id}${sfx}-${part}`; (paths[id].textures[vn] = paths[id].textures[vn] || {})[part] = name; push({ id: name, kind: "path", path: id, variant: vn, part, frame: 0, ground: true, anchorX: 0 }, T[part], pcol, "none"); } });
  }
  push({ id: "rail-points", kind: "path", path: "railway", part: "points", frame: 0, ground: true, anchorX: 0 }, G.railPoints({ variant: 1 }), pcol, "none");
  push({ id: "rail-broken-end", kind: "path", path: "railway", part: "broken-end", frame: 0, ground: true, anchorX: 0 }, G.railBrokenEnd(), pcol, "none");
  push({ id: "rail-crossing", kind: "path", path: "railway", part: "crossing", frame: 0, ground: true, anchorX: 0 }, G.railCrossing(), pcol, "none");
  for (const d of G.PATH_PIECES) { const P = G.pathPieceSprite(d.id, st); push({ id: `pathpiece-${d.id}`, kind: "pathpiece", family: d.family, path: d.path, text: d.desc, glow: !!d.glow, origin: P.origin, metres: P.metres, frame: 0, anchorX: P.origin.x }, P.sp, pcol, "none"); }
  // the dancefloor speakers: one column, drawn at 3 yaws, each playing (three frames), damaged (two) and destroyed; mirrored for the other side (see conventions)
  for (const angle of G.DANCEFLOOR_SPEAKER_ANGLES) for (const [state, n] of Object.entries(G.DANCEFLOOR_SPEAKER_STATES)) for (let frame = 0; frame < n; frame++) {
    const S = G.dancefloorSpeakerSprite(st, { angle, state, frame });
    push({ id: `dancefloor-speaker-${angle}-${state}${state === "destroyed" ? "" : "-" + frame}`, kind: "dancefloorSpeaker", angle, yaw: angle, flipYaw: -angle, state, frame, origin: S.origin, anchorX: S.origin.x }, S.sp, G.dancefloorSpeakerColours(), "none");
  }
  // soundsystems: three stacks, each playing (three frames), damaged (two flicker frames) and destroyed
  for (let v = 0; v < G.SOUNDSYSTEMS.length; v++) {
    const S = G.SOUNDSYSTEMS[v], col = G.soundsystemColours(v), one = (state, frame) => push({ id: `soundsystem-${S.id}-${state}${state === "destroyed" ? "" : "-" + frame}`, kind: "soundsystem", variant: S.id, crystal: S.crystal, state, frame, anchorX: undefined }, G.soundsystemSprite(st, { variant: v, state, frame }), col, "none");
    for (const f of [0, 1, 2]) one("playing", f);
    for (const f of [0, 1]) one("damaged", f);
    one("destroyed", 0);
  }
  // area types: a floor tile and each prop, already baked by areaAssets
  for (const A of G.AREAS) {
    const a = G.areaAssets(A.id, st), add = (x, role, i) => list.push({ id: `area-${A.id}-${role}${i === undefined ? "" : "-" + i}`, kind: role === "floor" ? "area-floor" : "area-prop", area: A.id, role, prop: x.kind, text: x.text || "", ...(x.metres ? { metres: x.metres } : {}), ...(x.origin ? { origin: x.origin } : {}), ...(x.sparse ? { tall: true, sparse: x.sparse } : {}), frame: 0, w: x.sp.w, h: x.sp.h, anchor: { x: x.sp.w / 2, y: x.sp.h }, albedo: png(x.sp.A), normal: png(x.sp.N), ...(x.sway ? { sway: png(x.sway) } : {}) });
    add(a.floor, "floor");
    a.walls.forEach((x, i) => add(x, "wall", i)); a.small.forEach((x, i) => add(x, "small", i)); a.big.forEach((x, i) => add(x, "big", i));
    if (a.setPiece) add(a.setPiece, "set", 0);
    // its trees across a range of heights: each whole, and split into the crown (top, cut out from the treetops) and the trunk (bottom)
    G.areaTreeVariants(A.id, st).forEach((v, i) => { for (const [part, b] of [["whole", v.whole], ["top", v.top], ["bottom", v.bot]]) list.push({ id: `area-${A.id}-tree-${i}${part === "whole" ? "" : "-" + part}`, kind: "area-tree", area: A.id, variant: i, part, species: v.species, heightClass: v.heightClass, weight: v.weight, scale: v.scale, metres: v.metres, crownY: v.crownY, frame: 0, w: b.w, h: b.h, anchor: { x: b.w / 2, y: b.h }, albedo: png(b.A), normal: png(b.N), sway: png(v.sway[part === "bottom" ? "bot" : part]) }); });
    // its ground-cover tufts, each with its share of the area's tufts and its sway mask
    G.bakeTufts(A.id, st).forEach((t, i) => list.push({ id: `area-${A.id}-tuft-${i}`, kind: "area-tuft", area: A.id, tuft: t.kind, weight: t.weight, frame: 0, w: t.w, h: t.h, anchor: { x: t.w / 2, y: t.h }, albedo: png(t.A), normal: png(t.N), sway: png(t.S) }));
  }
  // the hero dancefloor's looks: the unlit tile, the lit tile at three intensities (white, to tint), the grout, the rim strip and the whole unlit floor
  const dl = { kind: "dancefloor", ground: true, frame: 0 };
  push({ ...dl, id: "dancefloor-tile-unlit", part: "tile", lit: 0, anchorX: 0 }, G.discoTileSprite("unlit"), G.discoColours(), "none");
  for (const l of [1, 2, 3]) push({ ...dl, id: `dancefloor-tile-lit-${l}`, part: "tile", lit: l, tint: true, anchorX: 0 }, G.discoTileSprite("lit", { level: l }), G.discoColours(l), "none");
  push({ ...dl, id: "dancefloor-grout", part: "grout", anchorX: 0 }, G.discoGroutSprite(), G.discoColours(), "none");
  push({ ...dl, id: "dancefloor-rim", part: "rim", period: G.DISCO_RIM.period, anchorX: 0 }, G.discoRimStrip(G.DISCO_RIM.period), G.discoRimColours(), "none");
  const fb = G.discoFloorBase(); push({ ...dl, id: "dancefloor-base", part: "base", centre: fb.centre, gridOrigin: fb.gridOrigin, pitch: fb.pitch, rimInner: fb.rimInner, rimOuter: fb.rimOuter, anchorX: fb.centre }, fb.sp, { ...G.discoColours(), ...G.discoRimColours() }, "none");
  const dancefloor = { grid: G.DISCO_GRID, radius: G.DISCO_RADIUS, tileMetres: G.DISCO_TILE_METRES, ppm: G.DISCO_PPM, tilePx: G.DISCO_TILE_PX, pitchPx: G.DISCO_PITCH, rim: G.DISCO_RIM, neon: G.NEON, look: G.DISCO_LOOK,
    mask: Array.from(G.DISCO_MASK).join(""), transitions: G.DISCO_TRANSITIONS,
    patterns: G.discoPatterns().map(p => ({ id: p.id, name: p.name, kind: p.kind, level: p.level, beats: p.beats, fpb: p.fpb, palette: p.palette, key: p.key, ...(p.area ? { area: p.area, creature: p.creature } : {}), frames: p.frames.map(f => Array.from(f).join("")) })) };
  // sigils: an SVG and a 64 px PNG each, with their strokes (in writing order) for the manifest
  const sigils = G.SIGIL_IDS.map(id => {
    const c = document.createElement("canvas"); c.width = c.height = 64; G.drawSigil(c.getContext("2d"), id, { size: 64, glow: 4 });
    return { id: `sigil-${id}`, species: id, neon: G.SIGIL_NEON[id], colour: G.sigilColour(id), svg: G.sigilSVG(id, { size: 64 }), levels: [0, 1, 2, 3].map(level => G.sigilSVG(id, { size: 128, level })), levelPngs: [0, 1, 2, 3].map(level => { const k = document.createElement("canvas"); k.width = k.height = 64; G.drawSigil(k.getContext("2d"), id, { size: 64, level, glow: 4 }); return png(k); }), png: png(c), strokes: G.SIGILS[id] };
  });
  return { list, witchParty, scenes, sigils, dancefloor, sigilFormat: { box: "unit square, x right, y down", stroke: G.SIGIL_STROKE, dot: G.SIGIL_DOT, drawTime: G.SIGIL_DRAW_TIME, groundPitch: G.GROUND_PITCH, neon: G.NEON, levels: [0, 1, 2, 3].map(l => G.sigilFrame(l)), stack: G.STACK_TUNING, transitionTime: G.SIGIL_TRANSITION_TIME }, style: st, placement: { wallsBlock: G.WALLS_BLOCK, setPieceChance: G.SET_PIECE_CHANCE }, paths, areaPaths: G.areaPathKinds(), arrangements: G.relicLayouts(st), areas: G.AREAS.map(A => ({ id: A.id, name: A.name, creature: A.creature, by: A.by, text: A.text, layout: A.layout, rockTint: G.rockTint(A) })) };
}, { style, seed });
if (b.errors.length) console.error(b.errors.join("\n"));
await b.close();

const manifest = { generator: "art/generator.js", witch: assets.witchParty, style: assets.style, placement: assets.placement, paths: assets.paths, areaPaths: assets.areaPaths, arrangements: assets.arrangements, scenes: assets.scenes, areas: assets.areas, conventions: {
  albedo: "RGBA; alpha 254 = glowing pixel, draw unlit", normal: "RGB = xyz from [-1,1] to [0,255]; x right, y down, z to viewer; flip x when mirrored",
  facing: "right; creatures come turned towards the viewer (facing towards) and turned away (facing away, ids ending -away): moving down the screen use towards, moving up use away", anchor: "pixels from top-left; the point on the ground (feet, trunk base); flyers (bat, moth) stand on their shadow",
  partyWitch: "party-witch-<outfit>-<pose><frame>[-away]: a witch who flies in to the party, one outfit each (witch.outfits) in its own colours; the poses' frames and fps are in witch.footPoses and witch.flightPoses (party: dance, pair, social, move or rest; the party's poses loop). Our witch has the same party poses (witch-<pose><frame>). anchors (pixels from the top-left): hand, hatTip; pair (where a partner meets her), back (the conga), cup", witchPairs: "two witches together (witch.pairs): draw each her own sprite and place them so that her `meet` anchor and her partner's (its `partner` anchor if given, else `meet`) land on the same pixel; mirror: true flips the partner left-right (x becomes w - x, and the normals' x), so they face each other; heading: draw both heading so (holdHands: towards, facing the viewer, side by side); frame: only that frame meets (the drink's toast); the conga: the witch behind puts her pair anchor on the back anchor of the witch ahead, both the same way round; partnerPose: the partner does that pose (twirl: twirled, spinning under the raised hand; limboHold: limboHelp, holding the broom's other end); third: the broom limbo's dancer (limbo) moves along between the holders with her top anchor just below the holder's bar anchor (the broom held level at LIMBO_BAR)", leanCycle: "witch-leancycle<0-3>[-away] and witch-up-/witch-down-leancycle<0-3>: her ordinary flying speed at ground level as a 4-frame loop (legs kicking, jacket and hair fluttering, broom bobbing, bristles flickering); play it faster with speed",
  floor: "area-floor tiles repeat over the ground; their normals face up", sway: "sway (files.sway, a .sway.png beside the albedo, the same size): the wind mask for trees (whole, top and bottom), leafy props and tufts; R = G = B = how far the pixel sways, 0 for anything rigid (trunks, limbs, rock) up to 255 at the leafy tips (higher above the foot and nearer the silhouette sway more; thin twigs a little); alpha 255 where the sprite has a pixel", areaTuft: "area-tuft: tiny ground-cover tufts (8 to 13 px) to scatter thickly over the area's floor: tuft is the kind (grass, longgrass, fern, heather, rushes, moss, clover, needles, litter, pebbles, flowers, mushrooms); weight its share of the area's tufts (they add up to 1; flowers and mushrooms are rare in most); each has its sway mask", scene: "scenes[]: { id, size, pieces: [{ sprite, dx, dz, facing? }], mirrored, footprint }; one piece on the map, at most once per map. sprite: a country piece (country-<family>-<id>) or a landmark piece (landmark-<family>-<id>; buildings in -far and -near halves, decals drawn first), relic:<id> or decor:<id>[/<variant>]; dx, dz metres from its middle (x right, z towards the viewer, before the camera turn); put each sprite's origin there; facing left = mirrored; the game picks pieces or mirrored at random; footprint: radius in metres", dancefloorSpeaker: "dancefloor-speaker: one column of stone, drawn at yaw (angle) 15, 45 and 75 degrees from facing the viewer; mirrored (flip x, normals too) it is at flipYaw. Every speaker shows the camera its front: a speaker at ring angle a (degrees round the dancefloor from its side nearest the camera: position centre + R (sin a, cos a), x right, z towards the camera) in the far half (cos a < 0) faces the centre, yaw 180 - a; in the near half it faces away, yaw -a (wrapped to -180..180). Use the sprite of angle |yaw|, flipped if yaw < 0 (dancefloorSpeakerFacing in art/soundsystem.js). With a = 15 + 30 i, 12 speakers use each angle twice plain, twice flipped. origin: its middle on the ground; all angles and states share one scale", areaTree: "area-tree: each area's trees across a range of heights (heightClass sapling, mature, tall or giant; weight: the share of the area's trees to place of it); whole, top (the crown, cut out from the treetops) and bottom (the trunk below crownY); metres at 16 art px per metre: height, crownBase (above the ground), crownHeight, crownRadius", witchOnFoot: "witch on foot (onFoot: true): stand (idle loop), land and takeoff (played once, about 0.3 s, between hovering and stand), talk (four gestures, loop), placeSigil and liftSigil (played once); frames and fps per pose; anchors.hand is her free hand (attach a held sigil there), anchors.hatTip her hat's tip (the sigil stack hangs above it), both in pixels from the top-left; she stands at anchor like the creatures", treehouse: "the witch's home, near the dancefloor: whole, top (the crown and everything above the van's roof, from crownY up: treetop mode, cut out round the witch) and bottom (the trunk, van and terrace); anchors in pixels from the top-left: base (the trunk's foot; the sprite's anchor), seat (put the witch's sit pose's anchor here: she starts the game sitting on the terrace), door, lights (light sources, each with rgb and kind); built at the witch's scale", witchSit: "witch sit: two idle frames on the terrace chair (swinging her legs, looking out), at 1.5 fps; drawn over the treehouse at anchors.seat", relic: "modern relics (relic-<family>-<id>): family modern (cars, trolleys, cones, broken highway, odds and ends), playground (pieces of one overgrown playground) or sports (a tennis court, baseball diamond and football pitch, each a ground decal and pieces, and a basketball hoop); decal: lies flat on the ground, drawn under everything; origin: the pixel where its middle on the ground lands, to put at its spot in an arrangement; metres: width, height, footprint; tall ones also come as -top (from crownY up) and -bottom; glow: its one magical touch. No brands or text anywhere. The decor family name for layouts is modern (playground and sports are modern too)", arrangements: "suggested arrangements: { playground, tennis, baseball, football, basketball }: each a list of { id, x, z } in metres from the clearing's middle (x right, z towards the viewer), the decal first; mirror a whole arrangement for variety", decor: "world decorations (decor-<family>-<id>[-<variant>]): family ruins (variant 0 weathered, 1 overgrown), rocks (multiply their colours by the area's rockTint) or freak (freak trees); metres: width, height and footprint (the radius it takes on the ground); tall ones also come as -top (from crownY up: treetop mode, cut out round the witch) and -bottom; glow: it has a magical glowing touch", lake: "lakes: the prototype builds a lake as a signed-distance blob on the ground (overlapping circles, or noise on a radius); inside it repeats lake-water (64 x 48, WATER pixels take the moon's reflection like the ponds); across the edge it maps lake-shore (64 x 16: u along the edge, tiling; v from the water, top, to the land, bottom; 1 to 2 m wide); along the band it scatters lake-reeds on the land side, lake-lilies on the water side and rocks from decor-rocks half in the water", paths: "paths (the manifest's paths, per kind: width and period in metres, ppm, text, moods: the areas it suits, variants, textures, props): each kind's textures are in GROUND space (seen from straight above, 16 px per metre; lay them on the ground as the floor): strip (x across the path, y along it; tiles along y, so sweep it along any spline: u from the line across, v the distance along), end (where a path peters out: y = 0 the open end, the far edge joins a strip), y and t (junction patches: a square; each arm ends square at the patch's edge, a path's width wide, centred on that edge's middle; Y's arms point up and down-left and down-right, T's left, right and down). Where two strips meet at an angle, lay the patch over the join. Railway points, broken end and crossing are ground textures too. pathpiece-* are 3D at the game's view (edge props along the path's edges, stairs, bridges, railway landmarks), placed by their origin. areaPaths: the kinds each area suits, for its layout to pick; the magic trail is the one glowing kind: use it rarely, leading to a set piece", soundsystem: "the party's soundsystem: playing frames pump the cones (loop 0,1,2), damaged frames flicker (loop 0,1), destroyed is one frame; about three times the witch's height", mask: "light-pond has a mask: white where its pixels are water, for drawing the moon's glint and reflection" }, assets: [] };
for (const a of assets.list) {
  const { albedo, normal, mask, sway, anchorX, ...meta } = a;
  writeFileSync(join(out, `${a.id}.png`), Buffer.from(albedo, "base64"));
  writeFileSync(join(out, `${a.id}.normal.png`), Buffer.from(normal, "base64"));
  if (mask) writeFileSync(join(out, `${a.id}.mask.png`), Buffer.from(mask, "base64"));
  if (sway) writeFileSync(join(out, `${a.id}.sway.png`), Buffer.from(sway, "base64"));
  manifest.assets.push({ ...meta, size: { w: a.w, h: a.h }, files: { albedo: `${a.id}.png`, normal: `${a.id}.normal.png`, ...(mask ? { mask: `${a.id}.mask.png` } : {}), ...(sway ? { sway: `${a.id}.sway.png` } : {}) } });
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
writeFileSync(join(out, "dancefloor.json"), JSON.stringify(assets.dancefloor));
manifest.dancefloor = { file: "dancefloor.json", format: "the hero dancefloor's data for the tile-lighting engine: grid (32) x grid tiles, row by row; mask: 1 inside the circle; patterns: { id, name, kind (shape, loop, fill, area, boot), level (1 calm to 4 full rave), beats, fpb (frames per beat), palette (2 to 4 neon names; neon has their colours), key (the fullest frame), area and creature for an area's own shape, frames: one string of grid x grid digits each, 0 off, k = palette[k - 1] }; transitions: { id, beats, onBar, desc } (art/dancefloor.js discoTransition gives their masks); looks: the dancefloor-* sprites (tile unlit, tile lit 1 to 3 in white to tint with the cell's neon, grout, the rim strip repeating every rim.period px, and the whole unlit floor, base, with its centre, gridOrigin, pitch and rim radii in px) at ppm px per metre, ground space seen from above", patterns: assets.dancefloor.patterns.length };
writeFileSync(join(out, "manifest.json"), JSON.stringify(manifest, null, 1));
console.log(`exported ${assets.list.length} assets (${assets.list.length * 2} PNGs) and ${assets.sigils.length} sigils (SVG and PNG) to ${out.startsWith(ROOT + "/") ? out.slice(ROOT.length + 1) : out}`);
