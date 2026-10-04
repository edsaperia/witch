// Renders preview sheets of the art, lit by the lab's lighting pass under even "studio"
// light, enlarged with crisp pixels, for review on the PR.
//   node art/preview.mjs animals wolf,boar,owl art/previews/animals.png [scale]
//   node art/preview.mjs trees all art/previews/trees.png [scale]
//   node art/preview.mjs areas all art/previews/areas.png [scale]
//   node art/preview.mjs sets all art/previews/set-pieces.png [scale]   (every area's set piece, five to a row, the witch for scale)
//   node art/preview.mjs home 0 art/previews/treehouse.png [scale]   (the treehouse with the witch sitting on its terrace, sit frame 0 or 1; NIGHT=1 lit by its own lights)
//   node art/preview.mjs relics modern|playground|sports|<ids> art/previews/relics-modern.png [scale]   (PER=n to a row)
//   node art/preview.mjs grounds playground,tennis,baseball,football,basketball|all art/previews/grounds.png [scale]   (each arrangement composed; NIGHT=1)
//   node art/preview.mjs decor ruins|rocks|freak|<ids> art/previews/ruins.png [scale]   (VARIANTS=1: ruins weathered and overgrown)
//   node art/preview.mjs lake 0 art/previews/lake.png [scale]   (a sample lake composed from the kit; NIGHT=1)
//   node art/preview.mjs paths all|<kinds> art/previews/paths.png [scale]   (each kind swept along a curve with a branch, then its strip, end, Y, T; VARIANT=n for the railway's)
//   node art/preview.mjs pathpieces all|<ids> art/previews/path-pieces.png [scale]   (the 3D pieces; with all, the railway's points, broken end and crossing)
//   node art/preview.mjs species all|<ids> art/previews/tree-species.png [scale]   (each species at mature height from the side, then its crown as treetop mode shows it, then its trunk alone as ground mode shows it; PER=n species to a row)
//   node art/preview.mjs canopy <areas> art/previews/canopy-patches.png [scale]   (a 3 x 3 patch of each area's crowns from the treetops)
//   node art/preview.mjs witch all art/previews/witch-flight.png [scale]   ("fast" instead of all: hover, lean and the fast pose; "foot": hover and every on-foot pose, POSES=stand,talk,... to pick, ANCHORS=1 to mark her hand and hat tip)
//   node art/preview.mjs treeheights fern-forest,garden art/previews/tree-heights.png [scale]
//   node art/preview.mjs lights all art/previews/light-sources.png [scale]
//   node art/preview.mjs party wolf,fox,owl art/previews/party.png [scale]
//   node art/preview.mjs sigils all art/previews/sigils.png [scale]
//   node art/preview.mjs soundsystems all art/previews/soundsystems.png [scale]
//   node art/preview.mjs speakers all art/previews/dancefloor-speakers.png [scale]   (the dancefloor speaker at each of its 6 angles: 3 playing, 2 damaged, destroyed; the witch for scale)
//   node art/preview.mjs ring 9 art/previews/dancefloor-ring.png [scale]   (12 speakers round the dancefloor, the list the ring's radius in metres: all playing, then a mix of states; mirrored by the facing rule)
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
if (process.env.VARIANT) await b.page.addInitScript(n => { window.VARIANT = n; }, +process.env.VARIANT);
if (process.env.LEVELS) await b.page.addInitScript(l => { window.LEVELS = l; }, process.env.LEVELS.split(",").map(Number));
if (process.env.POSES) await b.page.addInitScript(l => { window.POSES = l; }, process.env.POSES.split(","));
if (process.env.ANCHORS) await b.page.addInitScript(() => { window.ANCHORS = true; });
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
  if (what === "home") { // the treehouse at night, the witch sitting on its terrace: towards (whole, as from the treetops), its base only (as from the ground), away
    const wc = G.witchColours(st), hc = G.treehouseColours(st), panels = [];
    for (const [facing, part] of [["towards", "whole"], ["towards", "bot"], ["away", "whole"]].filter(([f]) => !window.FACINGS || window.FACINGS.includes(f))) {
      const T = G.treehouseSprite(st, { facing }), house = G.bake(T[part], hc, st, "none"), wsp = G.witchSprite(st, { pose: "sit", frame: +list || 0, facing }), wit = G.bake(wsp, wc, st, st.cOutline);
      let x0 = wsp.w, x1 = -1; for (let x = 0; x < wsp.w; x++) if (wsp.m[(wsp.h - 1) * wsp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); }
      panels.push({ T, house, wit, wx: Math.round(T.anchors.seat.x - (x0 + x1 + 1) / 2), wy: Math.round(T.anchors.seat.y - wsp.h) + 1 });
    }
    const gap = 10, w = panels.reduce((a, p) => a + p.house.w + gap, gap), h = Math.max(...panels.map(p => p.house.h)) + gap * 2;
    const mk = () => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
    const A = mk(), N = mk(), a = A.getContext("2d"), n = N.getContext("2d"), lights = [];
    if (!window.NIGHT) { a.fillStyle = `rgb(${G.hsv2rgb(st.groundHue, .4, st.groundVal)})`; a.fillRect(0, 0, w, h); } n.fillStyle = "rgb(128,75,240)"; n.fillRect(0, 0, w, h);
    let x = gap;
    for (const P of panels) { const y = h - gap - P.house.h; a.drawImage(P.house.A, x, y); n.drawImage(P.house.N, x, y); a.drawImage(P.wit.A, x + P.wx, y + P.wy); n.drawImage(P.wit.N, x + P.wx, y + P.wy); for (const L of P.T.anchors.lights) lights.push({ x: x + L.x, y: y + L.y, z: 10, R: 48, power: 1.1, rgb: L.rgb }); x += P.house.w + gap; }
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
  } else if (what === "animals") {
    const ids = list === "all" ? G.SPECIES.map(s => s.id) : list.split(",");
    for (const id of ids) for (const facing of window.FACINGS || ["towards"]) rows.push((window.LEVELS || [3, 2, 1, 0]).flatMap(l => [0, 1].map(f => G.bake(G.critter(id, l, f, st, facing), G.speciesColours(id, st), st, st.cOutline))));
  } else if (what === "witch") { // per facing: the ordinary hover frame, then rise (two frames) and descend (two frames)
    const wc = G.witchColours(st), b = o => G.bake(G.witchSprite(st, o), wc, st, st.cOutline);
    // "foot": hover, then every on-foot pose's frames (stand, land, takeoff, talk, placeSigil, liftSigil); with ANCHORS=1 her hand and hat tip marked
    const mark = (sp, bk) => { if (window.ANCHORS && sp.anchors) { const g = bk.A.getContext("2d"); for (const [[x, y], c] of [[sp.anchors.hand, "#0ff"], [sp.anchors.hatTip, "#f0f"]]) { g.fillStyle = c; g.fillRect(Math.round(x) - 1, Math.round(y) - 1, 3, 3); } } return bk; };
    const fb = o => { const sp = G.witchSprite(st, o); return mark(sp, G.bake(sp, wc, st, st.cOutline)); };
    if (list === "foot") for (const facing of window.FACINGS || ["towards", "away"]) rows.push([b({ facing }), ...Object.entries(G.WITCH_FOOT_POSES).filter(([pose]) => !window.POSES || window.POSES.includes(pose)).flatMap(([pose, { frames }]) => [...Array(frames).keys()].map(frame => fb({ facing, pose, frame })))]);
    else for (const facing of ["towards", "away"]) rows.push(list === "fast" ? [b({ facing }), b({ facing, lean: true }), ...[0, 1, 2].map(frame => b({ facing, pose: "fast", frame })), ...[0, 1].map(frame => b({ facing, pose: "brake", frame }))] // hover, lean, fast's three frames, brake's two
      : [b({ facing }), b({ facing, pose: "rise", frame: 0 }), b({ facing, pose: "rise", frame: 1 }), b({ facing, pose: "descend", frame: 0 }), b({ facing, pose: "descend", frame: 1 })]);
  } else if (what === "treeheights") { // per area: its tree variants, saplings to the giant, then the witch for scale
    const wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline);
    for (const id of list.split(",")) rows.push([...G.areaTreeVariants(id, st).map(v => v.whole), wit]);
  } else if (what === "lights") { // the campfire's frames, the magic stones, the pond
    const L = G.lightProps(st); rows.push([...L.campfire, ...Object.values(L.stones), L.pond]);
    if (list !== "all") rows.push(list.split(",").map((id, i) => G.runeStone(st, { glow: ["cyan", "violet", "green"][i % 3], sigil: id }))); // stones carved with these creatures' sigils
  } else if (what === "speakers") { // per angle (yaw from facing us): playing x3, damaged x2, destroyed; the witch for scale
    const col = G.dancefloorSpeakerColours(), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline);
    for (const angle of G.DANCEFLOOR_SPEAKER_ANGLES) rows.push([...[0, 1, 2].map(frame => ({ state: "playing", frame })), ...[0, 1].map(frame => ({ state: "damaged", frame })), { state: "destroyed" }].map(o => G.bake(G.dancefloorSpeakerSprite(st, { angle, ...o }).sp, col, st, "none")).concat([wit]));
  } else if (what === "ring") { // 12 speakers round the dancefloor (radius 4.5 m), at the given ring radius, each facing the centre: the sprite and flip from dancefloorSpeakerFacing
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
  } else if (what === "relics") { // a family's relics (modern, playground, sports) or listed ids, PER to a row (default 6), the witch closing each row
    const ids = ["modern", "playground", "sports"].includes(list) ? G.RELICS.filter(d => d.family === list).map(d => d.id) : list.split(","), wit = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline), col = G.relicColours(st), per = window.PER || 6;
    const items = ids.map(id => G.bake(G.relicSprite(id, st).whole, col, st, "none"));
    for (let i = 0; i < items.length; i += per) rows.push([...items.slice(i, i + per), wit]);
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
