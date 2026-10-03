// The art's checks, run before every push (there is no CI yet):
//   node art/check.mjs
// 1. builds the lab (tools/art-lab/build.mjs);
// 2. opens the source lab page and the built one in headless Chromium: no script errors,
//    a bestiary card for every species, the scene drawn;
// 3. draws every creature at every level and frame, every tree kind and bush, and every area
//    type's assets, and checks each is non-empty, stands on its bottom row, and that legends
//    are the tallest.
import { execFileSync } from "node:child_process";
import { openBrowser, ROOT } from "./headless.mjs";

let failed = 0;
const ok = (cond, what) => { console.log(`${cond ? "ok  " : "FAIL"} ${what}`); if (!cond) failed++; };

execFileSync("node", ["tools/art-lab/build.mjs"], { cwd: ROOT, stdio: "inherit" });
const b = await openBrowser();
const ignore = e => /ERR_CERT_AUTHORITY_INVALID|fonts\.g/.test(e); // web fonts, blocked in some sandboxes
for (const page of ["/tools/art-lab/witch-art-lab.html", "/tools/art-lab/dist/witch-art-lab.html"]) {
  b.errors.length = 0;
  await b.page.goto(b.base + page, { waitUntil: "domcontentloaded", timeout: 90000 });
  // the bestiary draws a little after the page; wait for every card (or give up after 90 s)
  await b.page.waitForFunction(async () => { const n = document.querySelectorAll("#bestiary canvas").length; return n > 0 && n === (await import("/art/generator.js")).SPECIES.length; }, null, { timeout: 90000, polling: 500 }).catch(() => {});
  const cards = await b.page.evaluate(() => document.querySelectorAll("#bestiary canvas").length);
  const species = await b.page.evaluate(async () => (await import("/art/generator.js")).SPECIES.length);
  const lit = await b.page.evaluate(() => { const c = document.getElementById("scene"), d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] + d[i + 1] + d[i + 2] > 30) n++; return n / (d.length / 4); });
  const errs = b.errors.filter(e => !ignore(e));
  ok(!errs.length, `${page}: no script errors${errs.length ? " — " + errs.join("; ") : ""}`);
  ok(cards === species, `${page}: ${cards} of ${species} bestiary cards`);
  ok(lit > .5, `${page}: scene drawn (${Math.round(lit * 100)}% of pixels lit)`);
}
await b.page.goto(b.base + "/art/headless-blank.html");
const report = await b.page.evaluate(async () => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), res = [];
  const stats = sp => { let n = 0, bottom = 0; for (let i = 0; i < sp.m.length; i++) if (sp.m[i]) n++; for (let x = 0; x < sp.w; x++) if (sp.m[(sp.h - 1) * sp.w + x]) bottom++; return { n, bottom, w: sp.w, h: sp.h }; };
  for (const S of G.SPECIES) {
    const hs = [];
    for (const level of [0, 1, 2, 3]) for (const frame of [0, 1]) { const s = stats(G.critter(S.id, level, frame, st)); hs[level] = s.h; res.push({ what: `${S.id} level ${level} frame ${frame}`, good: s.n > 20 && s.bottom > 0, info: `${s.w}x${s.h}` }); }
    { const a = stats(G.critter(S.id, 2, 0, st, "away")); res.push({ what: `${S.id} adult turned away`, good: a.n > 20 && a.bottom > 0, info: `${a.w}x${a.h}` }); }
    res.push({ what: `${S.id}: baby < young < adult < legend`, good: hs[3] > hs[2] && hs[2] > hs[1] && hs[1] > hs[0], info: hs.join(" < ") });
    if (["wolf", "boar", "stag", "bear", "elk", "lynx"].includes(S.id)) { const w = G.witchSprite(st).bodyH, k = G.critter(S.id, 2, 0, st).bodyH / w; const hi = S.id === "elk" ? 1.6 : 1.45; res.push({ what: `${S.id}: an adult is a bit larger than the witch (1.15 to ${hi} times, body without antlers; the elk, a moose, is taller already as a young)`, good: k >= 1.15 && k <= hi, info: k.toFixed(2) }); }
  }
  for (const [key, f] of G.TREE_TYPES) for (let v = 0; v < 3; v++) { const r = G.rng(v + 1), t = f(r, st, st.treeSize * G.uni(r, .9, 1.1)), s = stats(t.sp); res.push({ what: `tree ${key} ${v}`, good: s.n > 200 && s.bottom > 0 && t.crownY > 0 && t.crownY < s.h, info: `${s.w}x${s.h}` }); }
  for (let v = 0; v < 8; v++) { const s = stats(G.bush(G.rng(v), st).sp); res.push({ what: `bush ${v}`, good: s.n > 20, info: `${s.w}x${s.h}` }); }
  for (const facing of ["towards", "away"]) for (const frame of [0, 1, 2]) { const s = stats(G.witchSprite(st, { frame, facing })); res.push({ what: `witch ${facing} frame ${frame}`, good: s.n > 200 && s.bottom > 0, info: `${s.w}x${s.h}` }); }
  { // the witch's rise and descend: two frames each, both facings; drawn at her ordinary scale (bounds within reason), standing on the bottom row, nothing NaN
    const base = stats(G.witchSprite(st)), bad = [];
    for (const [pose, n] of [["rise", 2], ["descend", 2], ["fast", 3], ["brake", 2]]) for (const facing of ["towards", "away"]) for (let frame = 0; frame < n; frame++) {
      const sp = G.witchSprite(st, { pose, frame, facing }), s2 = stats(sp), nan = [...sp.n].some(v => Number.isNaN(v));
      if (!(s2.n > 200 && s2.bottom > 0 && !nan && s2.h > base.h * .7 && s2.h < base.h * 1.6 && s2.w < base.w * (pose === "fast" ? 2.4 : 1.8))) bad.push(`${pose} ${facing} ${frame} ${s2.w}x${s2.h}${nan ? " NaN" : ""}`);
    }
    res.push({ what: "witch rise, descend and brake (two frames) and fast (three): towards and away, at her ordinary scale, standing, no NaN", good: !bad.length, info: bad.join(", ") || `hover ${base.w}x${base.h}` });
  }
  { // the witch on foot: every pose's frames, both facings, at her ordinary scale, standing, no NaN; a hand and a hat tip inside the sprite;
    // reaching up for the stack her hand is above her hat tip, crouched to the ground it is down by her feet
    const base = stats(G.witchSprite(st)), bad = [], P = G.WITCH_FOOT_POSES;
    for (const [pose, { frames, fps }] of Object.entries(P)) for (const facing of ["towards", "away"]) for (let frame = 0; frame < frames; frame++) {
      const sp = G.witchSprite(st, { pose, frame, facing }), s2 = stats(sp), nan = [...sp.n].some(v => Number.isNaN(v)), a = sp.anchors;
      const inside = a && [a.hand, a.hatTip].every(([x, y]) => x >= 0 && x <= sp.w && y >= 0 && y <= sp.h);
      const up = (pose === "placeSigil" && frame === 0) || (pose === "liftSigil" && frame === 2), down = (pose === "placeSigil" && frame === 2) || (pose === "liftSigil" && frame === 0);
      const reach = !inside || ((!up || a.hand[1] < a.hatTip[1]) && (!down || a.hand[1] > sp.h * .8));
      if (!(s2.n > 200 && s2.bottom > 0 && !nan && s2.h > base.h * .7 && s2.h < base.h * 1.6 && s2.w < base.w * 1.8 && inside && reach && fps > 0)) bad.push(`${pose} ${facing} ${frame} ${s2.w}x${s2.h}${nan ? " NaN" : ""}${inside ? "" : " anchors"}${reach ? "" : " reach"}`);
    }
    const counts = Object.fromEntries(Object.entries(P).map(([k, v]) => [k, v.frames])), want = { stand: 3, land: 3, takeoff: 3, talk: 4, placeSigil: 3, liftSigil: 3, sit: 2 };
    res.push({ what: "witch on foot: stand (3), land and takeoff (3 each), talk (4), placeSigil and liftSigil (3 each), towards and away, at her ordinary scale, standing, no NaN; hand and hat-tip anchors inside; reaching up above her hat, down to the ground", good: !bad.length && JSON.stringify(counts) === JSON.stringify(want), info: bad.join(", ") || Object.entries(counts).map(([k, n]) => k + " " + n).join(", ") });
  }
  for (const id of ["wolf", "owl", "snake"]) { const s = stats(G.critter(id, 1, 0, st, "away")); res.push({ what: `${id} turned away`, good: s.n > 50 && s.bottom > 0, info: `${s.w}x${s.h}` }); }
  { // the treehouse: towards and away, 12 to 18 m tall, standing; top and bottom split it with nothing lost; lit windows glow; anchors inside, the seat on the terrace's planks
    const bad = []; let info = "";
    for (const facing of ["towards", "away"]) {
      const T = G.treehouseSprite(st, { facing }), sp = T.whole, s2 = stats(sp), count = x => { let n = 0; for (let i = 0; i < x.m.length; i++) if (x.m[i]) n++; return n; };
      const glow = [...sp.m].filter(v => v === G.M.GLOW).length, A = T.anchors, inside = [A.base, A.seat, A.door, ...A.lights].every(({ x, y }) => x >= 0 && x <= sp.w && y >= 0 && y <= sp.h);
      let deck = false; for (let dy = -2; dy <= 3 && !deck; dy++) for (let dx = -3; dx <= 3; dx++) if ([G.M.WOOD, G.M.FRAME, G.M.CLOTH, G.M.BODY2, G.M.BARKD].includes(sp.get(Math.round(A.seat.x) + dx, Math.round(A.seat.y) + dy))) { deck = true; break; }
      const split = count(T.top) + count(T.bot) === count(sp) && count(T.top) > 500 && count(T.bot) > 500;
      if (!(s2.bottom > 0 && T.metres.height >= 12 && T.metres.height <= 18 && glow > 40 && inside && deck && split && A.lights.length >= 4)) bad.push(`${facing} ${T.metres.height} m, ${glow} glowing${inside ? "" : ", anchors outside"}${deck ? "" : ", seat off the deck"}${split ? "" : ", split"}`);
      info = `${sp.w}x${sp.h} (${T.metres.height} m), ${A.lights.length} lights`;
    }
    res.push({ what: "treehouse: towards and away, 12 to 18 m, standing; top + bottom = whole; windows glow; anchors inside; the seat on the terrace", good: !bad.length, info: bad.join("; ") || info });
  }
  { const H = G.soundsystemHeight(st), ws = G.witchSprite(st);
    for (let v = 0; v < G.SOUNDSYSTEMS.length; v++) {
      const play = [0, 1, 2].map(frame => stats(G.soundsystemSprite(st, { variant: v, frame }))), dmg = [0, 1].map(frame => stats(G.soundsystemSprite(st, { variant: v, frame, state: "damaged" }))), dead = stats(G.soundsystemSprite(st, { variant: v, state: "destroyed" }));
      res.push({ what: `soundsystem ${G.SOUNDSYSTEMS[v].id}: 3 playing, 2 damaged, destroyed; standing; about 3 times the witch; rubble lower than the stack`, good: [...play, ...dmg, dead].every(s => s.n > 200 && s.bottom > 0) && play[0].h > ws.h * 2.4 && dead.h < play[0].h * .7, info: `${play[0].w}x${play[0].h} rubble ${dead.w}x${dead.h} witch ${ws.h}` });
    } }
  // sigils: one per species; non-empty as vector (SVG, and drawn on a canvas) and as a 12 px pixel glyph; strokes inside the box;
  // on the ground at every level, the draw-on only adds ink, and each level's rune is bigger and has more rings than the one below
  const pixels = f => { let n = 0; for (let i = 0; i < f.atCore.length; i++) if (f.atCore[i] <= 1) n++; return n; };
  for (const S of G.SPECIES) {
    const id = S.id, strokes = G.sigilStrokes(id), half = G.SIGIL_STROKE / 2;
    const inside = strokes.length > 0 && strokes.every(k => k.pts.every(([x, y]) => { const m = k.dot ? G.SIGIL_DOT : half; return x >= m - 1e-9 && x <= 1 - m + 1e-9 && y >= m - 1e-9 && y <= 1 - m + 1e-9; }));
    const svg = G.sigilSVG(id), c = document.createElement("canvas"); c.width = c.height = 48; G.drawSigil(c.getContext("2d"), id, { size: 48, glow: false });
    let ink = 0; const px = c.getContext("2d").getImageData(0, 0, 48, 48).data; for (let i = 3; i < px.length; i += 4) if (px[i] > 128) ink++;
    const glyph = G.sigilGlyph(id, 12), gn = glyph.m.reduce((a, v) => a + (v ? 1 : 0), 0);
    const gr = [0, 1, 2, 3].map(level => G.groundSigil(id, { level })), early = [...gr[1].atCore].filter(a => a <= .3).length, done = pixels(gr[1]);
    const fr = [0, 1, 2, 3].map(l => G.sigilMark(id, l).frame), grows = gr.every((g, l) => l === 0 || (g.w > gr[l - 1].w && pixels(g) > pixels(gr[l - 1]))) && fr[0].rings === 0 && !fr[0].dots && fr[1].rings === 0 && fr[1].dots >= 12 && fr[2].rings === 1 && !fr[2].dots && fr[3].rings === 2 && fr[3].band && fr[3].rays > 0 && !fr[2].band;
    // small, as in the stack: the young's dotted circle has clearly less ink round its ring than the adult's full one
    const ringInk = level => { const z = 14, cv = document.createElement("canvas"); cv.width = cv.height = z; G.drawSigil(cv.getContext("2d"), id, { size: z, level, glow: false, colour: [255, 255, 255] }); const d = cv.getContext("2d").getImageData(0, 0, z, z).data; let n = 0; for (let y = 0; y < z; y++) for (let x = 0; x < z; x++) { const r = Math.hypot(x + .5 - z / 2, y + .5 - z / 2) / z; if (r > .39 && r < .5) n += d[(y * z + x) * 4 + 3] / 255; } return n; };
    const dotted = ringInk(1), full = ringInk(2), ringsRead = dotted > 1 && dotted < full * .75;
    const fl = G.floatSigil(id, { level: 3 });
    res.push({ what: `sigil ${id}: vector, 12 px glyph, inside the box, ground draw-on, four levels grow (no ring, a dotted ring, a full ring, then a banded double ring with rays; the dotted and full rings tell apart at 14 px), floating form`, good: inside && /<(polyline|circle)/.test(svg) && ink > 40 && gn > 8 && done > 60 && early < done && grows && ringsRead && pixels(fl) > 20, info: `${strokes.length} strokes, ${ink} px at 48, ${gn} px at 12, ground ${gr.map(g => g.w + "x" + g.h).join(" < ")}` });
  }
  { // the leash stack: still, it stands over her head, newest at the bottom; flying right, it trails left, higher sigils further; stopped, it settles back
    const s = new G.SigilStack(); ["wolf", "owl", "stag"].forEach(id => s.push(id, 1));
    for (let i = 0; i < 240; i++) s.update(1 / 60);
    const still = s.layout(), order = still.map(l => l.id).join(",");
    for (let i = 0; i < 120; i++) s.update(1 / 60, { velocity: [6, 0, 0] });
    const fly = s.layout();
    for (let i = 0; i < 300; i++) s.update(1 / 60, { velocity: [0, 0, 0] });
    const back = s.layout(), placed = s.place();
    const ok = order === "stag,owl,wolf" && still.every((l, i) => Math.abs(l.offset[0]) < .2 && (i === 0 || l.offset[1] - still[i - 1].offset[1] > (l.size + still[i - 1].size) / 2)) && fly[2].offset[0] < fly[1].offset[0] && fly[1].offset[0] < fly[0].offset[0] && fly[0].offset[0] < 0 && back.every(l => Math.abs(l.offset[0]) < .25) && placed?.id === "stag" && s.length === 2;
    res.push({ what: "leash stack: newest at the bottom, trails behind her flight, settles, places the bottom one", good: ok, info: `flying: ${fly.map(l => l.offset[0].toFixed(2)).join(" ")}` });
  }
  // party gear: on every species at baby, young and adult (towards and away), the glowing collar shows and nothing else breaks;
  // the feet that have shoes show them; woken eyes glow red; partyGear is seeded and varied
  { const count = (sp, mat) => { let n = 0; for (let i = 0; i < sp.m.length; i++) if (sp.m[i] === mat) n++; return n; }, bad = [];
    for (const S of G.SPECIES) for (const level of [0, 1, 2]) for (const facing of ["towards", "away"]) {
      const gear = { collar: G.sigilColour(S.id), hat: level % 3, glasses: G.GLASSES_STYLES[level], shoes: "sneakers" }, sp = G.critter(S.id, level, 0, st, facing, gear), plain = G.critter(S.id, level, 0, st, facing);
      const hat = sp2 => count(sp2, G.M.HAT1) + count(sp2, G.M.HAT2), hats = hat(sp) + (S.plan === "bat" || S.plan === "moth" ? hat(G.critter(S.id, level, 1, st, facing, gear)) : 0); // flyers' wings hide the hat on the upstroke
      const hidden = S.id === "spider" && facing === "away"; // turned away, its own abdomen hides its head
      if (!((hidden || (count(sp, G.M.COLLAR) > 0 && hats > 0)) && stats(sp).bottom > 0 && Math.abs(sp.bodyH - plain.bodyH) <= 1)) bad.push(`${S.id} ${level} ${facing}`);
      if (S.q && level > 0 && facing === "towards" && count(sp, G.M.SHOE) === 0) bad.push(`${S.id} ${level} shoes`);
    }
    const woke = G.SPECIES.filter(S => count(G.critter(S.id, 1, 0, st, "towards", { woken: true }), G.M.WOKEN) === 0).map(S => S.id);
    const mixes = Array.from({ length: 40 }, (_, i) => JSON.stringify(G.partyGear(i, [1, 2, 3]))), same = JSON.stringify(G.partyGear(5, [1, 2, 3])) === mixes[5];
    const varied = new Set(mixes).size > 10 && mixes.some(m => m.includes('"hat":null')) && mixes.some(m => !m.includes("null"));
    res.push({ what: "party gear on all 30 at three levels, both views (collar, hat; shoes on four-legged feet; same body size); woken eyes; partyGear seeded and varied", good: !bad.length && !woke.length && same && varied, info: [...bad, ...woke.map(w => w + " not woken")].slice(0, 60).join(", ") || "ok" });
  }
  { // only magical things glow (Ed's playtest: glowing gorse flowers floated over the night's dark bushes)
    const magic = new Set([G.M.GLINT, G.M.MAGIC, G.M.MAGIC2, G.M.RUNE, G.M.GLOW, G.M.COLLAR, G.M.WOKEN]), extra = [...G.EMISSIVE].filter(m => !magic.has(m));
    const lit = ["heath", "meadow", "berry-thicket", "garden"].map(id => { const a = G.areaAssets(id, st); let n = 0; for (const x of [a.floor, ...a.walls, ...a.small, ...a.big, ...(a.setPiece ? [a.setPiece] : [])]) { const d = x.sp.A.getContext("2d").getImageData(0, 0, x.sp.w, x.sp.h).data; for (let k = 3; k < d.length; k += 4) if (d[k] === 254) n++; } return [id, n]; });
    res.push({ what: "only magical materials glow; flowering areas (heath, meadow, berry thicket, garden) have no glowing pixels", good: !extra.length && lit.every(([, n]) => n === 0), info: lit.map(([id, n]) => id + " " + n).join(", ") + (extra.length ? "; extra glowing materials " + extra : "") });
  }
  { // tree variety: every area whose big objects are trees has at least 8 variants over at least 3 height classes, taller by class, sane sizes, a crown line inside each
    const bad = [], order = ["sapling", "mature", "tall", "giant"];
    for (const A of G.AREAS) {
      const vs = G.areaTreeVariants(A.id, st); if (!(A.big || []).some(([k]) => k === "tree")) { if (vs.length) bad.push(A.id + " has trees it should not"); continue; }
      const classes = new Set(vs.map(v => v.heightClass)), mean = c => { const h = vs.filter(v => v.heightClass === c).map(v => v.whole.h); return h.reduce((a, x) => a + x, 0) / Math.max(1, h.length); };
      const rising = order.filter(c => classes.has(c)).every((c, k, arr) => k === 0 || mean(c) > mean(arr[k - 1]) * (A.big.some(([, o]) => o.type === "willow") ? .98 : 1.05));
      const sane = vs.every(v => v.whole.h > 8 && v.whole.w > 4 && v.whole.h < 1200 && v.crownY > 0 && v.crownY < v.whole.h && v.top.h > 0 && v.bot.h > 0 && v.metres.height > 0);
      if (!(vs.length >= 8 && classes.size >= 3 && rising && sane)) bad.push(`${A.id}: ${vs.length} variants, ${classes.size} classes${rising ? "" : ", not rising"}${sane ? "" : ", bounds"}`);
    }
    res.push({ what: "tree variety: every wooded area has 8+ variants over 3+ height classes, taller by class (willows wider instead), sane bounds", good: !bad.length, info: bad.slice(0, 6).join("; ") || "ok" });
  }
  { // layouts: every area has a sound layout descriptor, and between them they use most of the patterns (no pattern for more than 8 areas)
    const bad = G.AREAS.map(A => [A.id, G.layoutProblems(A)]).filter(([, p]) => p.length).map(([id, p]) => id + ": " + p.join(", "));
    const uses = {}; for (const A of G.AREAS) if (A.layout) uses[A.layout.pattern] = (uses[A.layout.pattern] || 0) + 1;
    const varied = Object.keys(uses).length >= 6 && Math.max(...Object.values(uses)) <= 8;
    res.push({ what: "layouts: every area has a sound layout (pattern, density, glades, heightMix iff wooded, terrain, decor weights, feel), 6+ patterns in use, none in more than 8 areas", good: !bad.length && varied, info: bad.slice(0, 4).join("; ") || Object.entries(uses).map(([k, n]) => k + " " + n).join(", ") });
  }
  { // set pieces: every area has one; the new ones (built in 3D) stand on the ground and are landmark-sized, 6 to 12 m across or tall
    const bad = [], sizes = [];
    for (const A of G.AREAS) {
      const a = G.areaAssets(A.id, st), x = a.setPiece; if (!x) { bad.push(A.id + " has none"); continue; }
      if (!G.NEW_SET_PIECES[A.id]) continue;
      const big = Math.max(x.metres.width, x.metres.height); sizes.push(big);
      let bottom = 0; const d = x.sp.A.getContext("2d").getImageData(0, x.sp.h - 1, x.sp.w, 1).data; for (let k = 3; k < d.length; k += 4) if (d[k]) bottom++;
      if (!(big >= 6 && big <= 12 && bottom > 0)) bad.push(`${A.id} ${x.metres.width}x${x.metres.height} m${bottom ? "" : ", floating"}`);
    }
    res.push({ what: "set pieces: all 30 areas have one; the 20 new ones stand on the ground, 6 to 12 m across or tall", good: !bad.length && sizes.length === 20, info: bad.join(", ") || `${sizes.length} new, ${Math.min(...sizes)} to ${Math.max(...sizes)} m` });
  }
  { // modern relics, the playground, the sports grounds: each standing (decals flat), sized, tall ones split, only the flagged ones glow; arrangements name real pieces, at most one glowing piece each; sports grounds 15 to 30 m across
    const bad = [], fam = {}, EM = new Set([...G.EMISSIVE]);
    for (const d of G.RELICS) {
      const R = G.relicSprite(d.id, st), sp = R.whole, s2 = stats(sp), lit = [...sp.m].some(v => EM.has(v)); fam[d.family] = (fam[d.family] || 0) + 1;
      const split = d.split == null || (stats(R.top).n > 30 && stats(R.top).n + stats(R.bot).n === s2.n), flat = !d.decal || R.metres.height < R.metres.width * .7;
      const across = !d.decal || d.id === "tennis-court" || d.id === "baseball-diamond" || d.id === "football-pitch" ? !d.decal || (R.metres.width >= 15 && R.metres.width <= 30) : true;
      if (!(s2.n > 30 && s2.bottom > 0 && split && flat && across && lit === !!d.glow && R.origin.x >= 0 && R.origin.x <= sp.w)) bad.push(`${d.id} ${R.metres.width}x${R.metres.height} m${split ? "" : " split"}${flat ? "" : " not flat"}${across ? "" : " size"}${lit === !!d.glow ? "" : " glow"}`);
    }
    const L = G.relicLayouts(st), arr = Object.entries(L).filter(([, list]) => !list.every(p => G.RELIC_BY_ID[p.id]) || list.filter(p => G.RELIC_BY_ID[p.id].glow).length > 1).map(([n]) => n);
    res.push({ what: "modern relics (15+), the playground (6 pieces) and the sports grounds: standing, decals flat, tennis/baseball/football 15-30 m across, tall ones split, only the flagged ones glow; arrangements name real pieces, one glowing touch at most", good: !bad.length && !arr.length && fam.modern >= 15 && fam.playground === 6 && fam.sports >= 12, info: [...bad, ...arr.map(n => n + " arrangement")].join(", ") || Object.entries(fam).map(([k, n]) => k + " " + n).join(", ") });
  }
  { // world decorations: 12 ruins in two conditions, 8 rocks, 8 freak trees, each standing, sized for its family; tall ones split; only the flagged ones glow; the lake kit
    const bad = [], fam = { ruins: 0, rocks: 0, freak: 0 }, EM = new Set([...G.EMISSIVE]); let tallRuins = 0, glowing = 0;
    for (const d of G.DECOR) for (let variant = 0; variant < d.variants; variant++) {
      const D = G.decorSprite(d.id, st, { variant }), sp = D.whole, s2 = stats(sp), big = Math.max(D.metres.width, D.metres.height), lit = [...sp.m].some(v => EM.has(v));
      fam[d.family] += variant === 0 ? 1 : 0;
      const size = d.family === "ruins" ? big >= 4 && big <= 14 : d.family === "rocks" ? big >= .5 && big <= 7 : big >= 5 && big <= 14;
      const split = d.split == null || (stats(D.top).n > 50 && stats(D.bot).n > 50 && stats(D.top).n + stats(D.bot).n === s2.n);
      if (d.family === "ruins" && D.metres.height >= 7 && variant === 0) tallRuins++; if (lit && variant === 0) glowing++;
      if (!(s2.n > (d.family === "rocks" ? 30 : 100) && s2.bottom > 0 && size && split && lit === !!d.glow && D.metres.footprint > 0)) bad.push(`${d.id}/${variant} ${D.metres.width}x${D.metres.height} m${split ? "" : " split"}${lit === !!d.glow ? "" : " glow"}`);
    }
    const L = G.lakeKit(st), lake = L.water.w === 64 && L.water.h === 48 && L.shore.w === 64 && L.shore.h === 16 && [...L.reeds, ...L.lilies].every(x => stats(x).n > 20) && [...L.water.m].filter(v => v === G.M.WATER).length > 64 * 48 * .8;
    res.push({ what: "world decorations: 12 ruins (two conditions), 8 rocks, 8 freak trees; standing; ruins 4-14 m, a few tall enough for the treetops; tall ones split top and bottom; only the flagged ones glow (3+ ruins); the lake kit", good: !bad.length && fam.ruins === 12 && fam.rocks === 8 && fam.freak === 8 && tallRuins >= 2 && glowing >= 3 && lake, info: bad.join(", ") || `${tallRuins} tall ruins, ${glowing} glowing` });
  }
  { const L = G.lightProps(st), all = [...L.campfire, ...Object.values(L.stones), L.pond]; res.push({ what: "light sources: 3 campfire frames, 3 magic stones, a pond with a water mask", good: all.length === 7 && all.every(b => b.w > 4 && b.h > 4) && !!L.pond.mask, info: all.map(b => b.w + "x" + b.h).join(" ") }); }
  for (const A of G.AREAS) {
    const a = G.areaAssets(A.id, st), props = [...a.walls, ...a.small, ...a.big, ...(a.setPiece ? [a.setPiece] : [])];
    res.push({ what: `area ${A.id}: floor, ${props.length} props, creature ${A.creature} exists`, good: a.floor.sp.w > 0 && props.length > 0 && !!G.SPECIES_BY_ID[A.creature] && props.every(p => p.sp.w > 0 && p.sp.h > 0), info: "" });
  }
  return res;
});
for (const r of report) if (!r.good) ok(false, `${r.what} (${r.info})`);
ok(report.every(r => r.good), `${report.length} sprite checks`);
await b.close();
console.log(failed ? `${failed} check(s) failed` : "all checks passed");
process.exit(failed ? 1 : 0);
