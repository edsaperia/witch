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
  { // the witch heading straight up the screen (away, seen from behind) and straight down it (towards, at us): hover x3, lean, fast x3 and brake x2 each,
    // at her ordinary scale (the same pixels per unit as her side view), standing on the bottom row, nothing NaN, her hand and hat tip anchors inside the sprite;
    // heading towards shows her face (eyes), heading away doesn't
    const bad = [], side = G.witchSprite(st, { pose: "fast" }).scale, eyes = {};
    for (const heading of ["away", "towards"]) for (const o of [{ frame: 0 }, { frame: 1 }, { frame: 2 }, { lean: true }, { pose: "fast", frame: 0 }, { pose: "fast", frame: 1 }, { pose: "fast", frame: 2 }, { pose: "brake", frame: 0 }, { pose: "brake", frame: 1 }]) {
      const sp = G.witchSprite(st, { heading, ...o }), s2 = stats(sp), name = `${heading} ${o.pose || (o.lean ? "lean" : "hover")}${o.frame ?? ""}`, A = sp.anchors;
      const inside = q => q && q.every(Number.isFinite) && q[0] >= 0 && q[0] < sp.w && q[1] >= 0 && q[1] < sp.h;
      if (!(s2.n > 100 && s2.bottom > 0 && Math.abs(sp.scale - side) < 1e-6 && A && inside(A.hand) && inside(A.hatTip))) bad.push(name);
      if (!o.pose && !o.lean && o.frame === 0) { let e = 0; for (const m of sp.m) if (m === G.M.EYE) e++; eyes[heading] = e; }
    }
    if (!(eyes.towards > 0 && eyes.away === 0)) bad.push(`eyes towards ${eyes.towards}, away ${eyes.away}`);
    res.push({ what: "witch heading away and towards (straight up and down the screen): hover x3, lean, fast x3, brake x2 each, at her ordinary scale, standing, hand and hat-tip anchors inside; her face only heading towards", good: !bad.length, info: bad.join(", ") || `eyes towards ${eyes.towards}` });
  }
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
  { // the treehouse (Ed's second go: mostly wood, modern touches, its top standing above the treeline, her seat in a cutaway studio): towards and away,
    // 28 to 40 m tall, standing; its top storey's floor above the 24 m treetops and its roof tip well over them; top and bottom split it with nothing
    // lost, the tower in the top half and the studio in the bottom; lit windows glow; anchors inside, the seat on the studio's floor (planks or rug)
    // and the camera anchor just above it
    const bad = []; let info = "";
    for (const facing of ["towards", "away"]) {
      const T = G.treehouseSprite(st, { facing }), sp = T.whole, s2 = stats(sp), count = x => { let n = 0; for (let i = 0; i < x.m.length; i++) if (x.m[i]) n++; return n; }, Mx = T.metres;
      const glow = [...sp.m].filter(v => v === G.M.GLOW).length, A = T.anchors, inside = [A.base, A.seat, A.door, A.camera, ...A.lights].every(({ x, y }) => x >= 0 && x <= sp.w && y >= 0 && y <= sp.h);
      let deck = false; for (let dy = -2; dy <= 3 && !deck; dy++) for (let dx = -3; dx <= 3; dx++) if ([G.M.WOOD, G.M.CLOTH, G.M.BODY2, G.M.ACCENT, G.M.BARKD].includes(sp.get(Math.round(A.seat.x) + dx, Math.round(A.seat.y) + dy))) { deck = true; break; }
      const split = count(T.top) + count(T.bot) === count(sp) && count(T.top) > 500 && count(T.bot) > 500 && A.seat.y > T.crownY;
      let foreOk = T.fore.w === sp.w && T.fore.h === sp.h && count(T.fore) > 200; for (let i = 0; i < sp.m.length && foreOk; i++) if (T.fore.m[i] && T.fore.m[i] !== sp.m[i]) foreOk = false; // the DJ table: a part of the whole, at its size
      const giant = Mx.trunk >= 5 && Mx.crown >= 11; // far bigger than any forest tree (their trunks under 4 m across, crowns under 8.5 m)
      const tall = Mx.height >= 28 && Mx.height <= 40 && Mx.towerFloor >= 24.5 && Mx.roofTip >= 30 && giant && foreOk, cam = Math.hypot(A.camera.x - A.seat.x, A.camera.y - A.seat.y) < 60 && A.camera.y < A.seat.y;
      if (!(s2.bottom > 0 && tall && glow > 40 && inside && deck && split && cam && A.lights.length >= 8 && A.lights.some(L => L.kind === "decks"))) bad.push(`${facing} ${Mx.height} m (floor ${Mx.towerFloor}, tip ${Mx.roofTip}), ${glow} glowing${inside ? "" : ", anchors outside"}${deck ? "" : ", seat off the floor"}${split ? "" : ", split"}${cam ? "" : ", camera"}`);
      info = `${sp.w}x${sp.h} (${Mx.height} m; top storey at ${Mx.towerFloor} m, roof tip ${Mx.roofTip} m; trunk ${Mx.trunk} m across, crown ${Mx.crown} m; footprint ${Mx.footprint} m, decks to ${Mx.overhang} m), ${A.lights.length} lights (${A.lights.filter(L => L.kind === "decks").length} on the decks)`;
    }
    res.push({ what: "treehouse: towards and away, 28 to 40 m, its top storey above the 24 m treetops; its giant tree's trunk 5 m+ across and crown 11 m+; fore (the DJ table) part of the whole; top + bottom = whole, the studio below the split; windows glow; anchors inside; the seat on the studio floor, the camera over it", good: !bad.length, info: bad.join("; ") || info });
  }
  { const H = G.soundsystemHeight(st), ws = G.witchSprite(st);
    for (let v = 0; v < G.SOUNDSYSTEMS.length; v++) {
      const play = [0, 1, 2].map(frame => stats(G.soundsystemSprite(st, { variant: v, frame }))), dmg = [0, 1].map(frame => stats(G.soundsystemSprite(st, { variant: v, frame, state: "damaged" }))), dead = stats(G.soundsystemSprite(st, { variant: v, state: "destroyed" }));
      res.push({ what: `soundsystem ${G.SOUNDSYSTEMS[v].id}: 3 playing, 2 damaged, destroyed; standing; about 3 times the witch; rubble lower than the stack`, good: [...play, ...dmg, dead].every(s => s.n > 200 && s.bottom > 0) && play[0].h > ws.h * 2.4 && dead.h < play[0].h * .7, info: `${play[0].w}x${play[0].h} rubble ${dead.w}x${dead.h} witch ${ws.h}` });
    } }
  { // the hero dancefloor (Ed: a magic disco floor whose squares draw magical shapes to the music; a system to light squares): every pattern fits the circle,
    // uses only its palette (2 to 4 of the party's neon), runs a whole number of beats (frames = beats x frames a beat) and lights something; levels 1 to 4 all in use;
    // 20+ general patterns, the switch-on sequence, and one shape for each of the 30 areas from its creature's sigil in its neon; the transitions run from all old to all new;
    // the looks: the unlit tile, the lit tile brighter at each intensity, grout, the rim strip repeating exactly every period, the whole floor
    const L = G.discoPatterns(), bad = [], kinds = {}, levels = new Set();
    for (const p of L) {
      kinds[p.kind] = (kinds[p.kind] || 0) + 1; levels.add(p.level);
      if (!(Number.isInteger(p.beats) && p.beats >= 1 && [1, 2, 4].includes(p.fpb) && p.frames.length === p.beats * p.fpb)) bad.push(p.id + " beats");
      if (!(p.palette.length >= 2 && p.palette.length <= 4 && p.palette.every(c => G.NEON[c]))) bad.push(p.id + " palette");
      if (!(p.level >= 1 && p.level <= 4)) bad.push(p.id + " level");
      let lit = 0; for (const f of p.frames) for (let i = 0; i < f.length; i++) { if (f[i] && !G.DISCO_MASK[i]) { bad.push(p.id + " outside the circle"); break; } if (f[i] > p.palette.length) { bad.push(p.id + " off its palette"); break; } if (f[i]) lit++; }
      if (lit / p.frames.length < 8) bad.push(p.id + " too dark");
    }
    for (const A of G.AREAS) { const p = L.find(q => q.kind === "area" && q.area === A.id); if (!p) bad.push(A.id + " has no floor shape"); else if (p.palette[0] !== G.SIGIL_NEON[A.creature]) bad.push(A.id + " not in its neon"); }
    if (!kinds.boot) bad.push("no switch-on sequence"); if ((kinds.shape || 0) + (kinds.loop || 0) + (kinds.fill || 0) < 20) bad.push("fewer than 20 general patterns"); if (levels.size < 4) bad.push("levels " + [...levels]);
    for (const T of G.DISCO_TRANSITIONS) { const a = G.discoTransition(T.id, 0), z = G.discoTransition(T.id, 1), mid = G.discoTransition(T.id, .5); if (a.some(v => v) || z.some((v, i) => G.DISCO_MASK[i] && v !== 1) || !mid.some(v => v) || !(Number.isInteger(T.beats))) bad.push("transition " + T.id); }
    const un = stats(G.discoTileSprite("unlit")), bright = [1, 2, 3].map(l => { const sp = G.discoTileSprite("lit", { level: l }), c = G.discoColours(l); let v = 0; for (const m of sp.m) v += (c[m] || [0, 0, 0])[1]; return v; });
    if (!(un.n === G.DISCO_TILE_PX ** 2 && bright[0] < bright[1] && bright[1] < bright[2])) bad.push("tile looks");
    const rim = G.discoRimStrip(G.DISCO_RIM.period * 2), P2 = G.DISCO_RIM.period; for (let y = 0; y < rim.h; y++) for (let x = 0; x < P2; x++) if (rim.get(x, y) !== rim.get(x + P2, y)) { bad.push("the rim doesn't repeat"); y = rim.h; break; }
    const fb = G.discoFloorBase(); if (!(stats(fb.sp).n > fb.size * fb.size * .7)) bad.push("floor base");
    res.push({ what: "dancefloor: every pattern fits the circle, keeps to its 2-4 neon palette, runs whole beats and lights up; levels 1-4; 20+ general patterns, the switch-on, one shape per area in its neon; transitions old to new; tiles, grout, rim (repeating), floor", good: !bad.length, info: bad.slice(0, 6).join("; ") || `${L.length} patterns (${Object.entries(kinds).map(([k, n]) => k + " " + n).join(", ")}); ${G.DISCO_TRANSITIONS.length} transitions; floor ${fb.size} px` });
  }
  { // the dancefloor speakers (Ed: one column, 12 round the floor, the far half facing in and the near half out, so 3 angles drawn and mirrored; destroyable): every angle draws in every state, standing;
    // all share one scale (every intact one as tall at every angle, about the soundsystem's height or a little less; rubble low); the front (cones) and the back (plain stone) differ;
    // the facing rule maps the 12 ring places onto the 3 angles, each twice plain and twice mirrored, every one showing us its front (|yaw| 75 or less)
    const bad = [], ws = G.witchSprite(st), hs = [], glow = {}, GL = new Set([G.M.GLOW, G.M.MAGIC2]);
    for (const angle of G.DANCEFLOOR_SPEAKER_ANGLES) for (const [state, n] of Object.entries(G.DANCEFLOOR_SPEAKER_STATES)) for (let frame = 0; frame < n; frame++) {
      const S = G.dancefloorSpeakerSprite(st, { angle, state, frame }), s2 = stats(S.sp);
      if (!(s2.n > 150 && s2.bottom > 0 && S.origin.x > 0 && S.origin.x < s2.w && S.origin.y > 0 && S.origin.y <= s2.h)) bad.push(`${angle} ${state} ${frame}`);
      if (state === "playing") { hs.push(s2.h); if (frame === 0) { let g2 = 0; for (const m of S.sp.m) if (GL.has(m)) g2++; glow[angle] = g2; } }
      if (state === "destroyed" && s2.h > ws.h * 1.6) bad.push(`${angle} rubble too tall`);
    }
    if (Math.max(...hs) - Math.min(...hs) > 3) bad.push("heights differ by angle " + Math.min(...hs) + "-" + Math.max(...hs));
    if (!(hs[0] > ws.h * 2.2 && hs[0] < ws.h * 3.1)) bad.push(`${hs[0]} px against the witch's ${ws.h}`);
    const backGlow = a => { let g2 = 0; for (const m of G.dancefloorSpeakerSprite(st, { angle: a }).sp.m) if (GL.has(m)) g2++; return g2; }; glow[165] = backGlow(165); glow[135] = backGlow(135); // the back, modelled though unused
    if (!(glow[15] > glow[165] * 3 && glow[45] > glow[135] * 2)) bad.push(`front and back look alike (glow ${glow[15]} vs ${glow[165]})`);
    const uses = {}; for (let i = 0; i < 12; i++) { const f = G.dancefloorSpeakerFacing(15 + 30 * i); uses[f.angle + (f.flip ? "f" : "")] = (uses[f.angle + (f.flip ? "f" : "")] || 0) + 1; }
    if (Object.keys(uses).length !== 6 || Object.values(uses).some(n => n !== 2)) bad.push("the ring doesn't use each angle twice plain and twice mirrored");
    for (let i = 0; i < 12; i++) { const a = 15 + 30 * i, f = G.dancefloorSpeakerFacing(a); if (Math.abs(f.yaw) > 75 || f.outward !== Math.cos(a * Math.PI / 180) > 0) bad.push(`ring place ${a} shows its back`); }
    res.push({ what: "dancefloor speakers: 3 angles x (3 playing, 2 damaged, destroyed) stand at one scale, about 2.6 times the witch, rubble low; front and back differ; 12 ring places (far half facing in, near half out) all show fronts, each angle twice plain, twice mirrored", good: !bad.length, info: bad.join("; ") || `${hs[0]} px tall (witch ${ws.h}); glow front ${glow[15]} vs back ${glow[165]}` });
  }
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
  { // tree species (Ed: the forest should vary from area to area, mostly UK kinds): every species draws, standing, its crown line inside;
    // seen from the treetops each species' crown differs measurably from every other's (fill, shade shares, leaf grain, outline, colour);
    // no two areas with the same layout pattern share a main species, no species is the main kind of more than two areas, and the old broadleaf only of dead woods
    const ids = Object.keys(G.TREE_SPECIES), bad = [], stats2 = {};
    for (const id of ids) { const t = G.TREE_SPECIES[id].fn(G.rng(5), { ...st }, st.treeSize), s2 = stats(t.sp); if (!(s2.n > 200 && s2.bottom > 0 && t.crownY > 0 && t.crownY < s2.h)) bad.push(id + " draws"); stats2[id] = G.crownStats(id, st); }
    const vec = x => [x.fill / .1, x.dark / .1, x.light / .1, x.grain, Math.log(x.shape) / .25, x.hue / .03, x.value / .06]; // in steps one can just tell apart
    let closest = [9, "", ""]; for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) { const d = Math.hypot(...vec(stats2[ids[i]]).map((v, k) => v - vec(stats2[ids[j]])[k])); if (d < closest[0]) closest = [d, ids[i], ids[j]]; }
    if (closest[0] < 1.5) bad.push(`${closest[1]} and ${closest[2]} look alike from above (${closest[0].toFixed(2)})`);
    const main = A => (A.big || []).find(([k, o]) => k === "tree" && !o.minor)?.[1], byPattern = {}, uses = {};
    for (const A of G.AREAS) { const o = main(A); if (!o) continue; const key = A.layout.pattern + ":" + o.type; if (byPattern[key]) bad.push(`${A.id} and ${byPattern[key]} (both ${A.layout.pattern}) share ${o.type}`); byPattern[key] = A.id; uses[o.type] = (uses[o.type] || 0) + 1; if (o.type === "broad" && !o.bare) bad.push(A.id + " still plain broadleaf"); if (!G.TREE_SPECIES[o.type]) bad.push(A.id + " names no species"); }
    for (const [k, n] of Object.entries(uses)) if (n > 2) bad.push(`${k} is the main kind of ${n} areas`);
    res.push({ what: "tree species: 20 kinds draw; each crown differs from every other's from above (1.5+ apart); neighbours by layout pattern never share a main species, none is the main kind of 3+ areas, plain broadleaf only for dead woods", good: !bad.length && ids.length >= 16, info: bad.join("; ") || `${Object.keys(uses).length} main kinds over the wooded areas; closest pair ${closest[1]}/${closest[2]} at ${closest[0].toFixed(2)}` });
  }
  { // life below the crown (Ed: "the trunks don't have to be totally devoid of foliage"): every species' bottom half carries some leaves (ivy, moss, sprigs, low boughs,
    // a skirt), more on saplings than on mature trees; the top half is exactly what the tree draws without them (the canopy and its cut-out unchanged);
    // and no wall of leaves at the witch's eye height: there, no row of the bottom half's leaves spans more than 0.6 of the crown's width (or half the witch's height, for a narrow tree)
    const L = new Set([G.M.LEAF, G.M.LEAF2, G.M.LEAF3]), wh = G.witchSprite(st).h, bad = [], K = 2 / (st.pixel || 2); let young = 0, old = 0, worst = 0;
    for (const [id, S] of Object.entries(G.TREE_SPECIES)) {
      let leaves = 0;
      for (const sc of [.5, 1]) for (let k = 0; k < 3; k++) {
        const t = S.fn(G.rng(31 + k), { ...st }, st.treeSize * K * sc), b = S.bare(G.rng(31 + k), { ...st }, st.treeSize * K * sc), { top, bot } = G.splitTree(t), top0 = G.splitTree(b).top;
        if (top.w !== top0.w || top.h !== top0.h || top.m.some((m, i) => m !== top0.m[i])) { bad.push(id + " canopy changed"); break; }
        let n = 0, all = 0, cx0 = 1e9, cx1 = -1;
        for (let i = 0; i < top.m.length; i++) if (top.m[i]) { const x = i % top.w; cx0 = Math.min(cx0, x); cx1 = Math.max(cx1, x); }
        for (let y = 0; y < bot.h; y++) { let x0 = 1e9, x1 = -1; for (let x = 0; x < bot.w; x++) { const m = bot.m[y * bot.w + x]; if (!m) continue; all++; if (L.has(m)) { n++; x0 = Math.min(x0, x); x1 = x; } }
          const up = bot.h - 1 - y; if (x1 >= 0 && up >= wh * .5 && up <= wh) worst = Math.max(worst, (x1 - x0 + 1) / Math.max(1, cx1 - cx0 + 1, wh * .5 / .6)); } // a narrow tree's sprigs may span half the witch's height
        if (sc === 1) leaves += n; else young += n / Math.max(1, all); if (sc === 1) old += n / Math.max(1, all);
      }
      if (leaves < 15) bad.push(id + " bare below the crown");
    }
    if (worst > .6) bad.push(`a ${worst.toFixed(2)}-wide wall of leaves at eye height`);
    if (young <= old) bad.push("saplings no leafier below than mature trees");
    res.push({ what: "life below the crown: every species' bottom half carries leaves, saplings more; the canopy unchanged; no wall of leaves at eye height", good: !bad.length, info: bad.join("; ") || `widest eye-height leaves ${worst.toFixed(2)} of the crown; leaf share below, saplings ${(young / 60).toFixed(2)} vs mature ${(old / 60).toFixed(2)}` });
  }
  { // ground cover and wind (for the prototype's rendering): every area has 3+ kinds of tuft, 8 to 13 px, each drawn, their weights adding up to 1;
    // sway masks: on every species' trees the trunk's foot is still (0) and the leaves sway (their top more than their low leaves), rocks never sway,
    // and the leafy props carry a mask the size of their albedo
    const bad = [], L = new Set([G.M.LEAF, G.M.LEAF2, G.M.LEAF3]);
    for (const A of G.AREAS) { const ts = G.tuftSprites(A.id, st), sum = ts.reduce((a, t) => a + t.weight, 0); if (ts.length < 3 || Math.abs(sum - 1) > .001) bad.push(`${A.id} tufts ${ts.length}, weights ${sum.toFixed(3)}`); for (const t of ts) { const n = t.sp.m.filter(v => v).length; if (!(n >= 6 && t.sp.w >= 8 && t.sp.w <= 13 && t.sp.h >= 3 && t.sp.h <= 13)) bad.push(`${A.id} ${t.kind} ${t.sp.w}x${t.sp.h} (${n} px)`); } }
    for (const id of Object.keys(G.TREE_SPECIES)) {
      const t = G.TREE_SPECIES[id].fn(G.rng(9), { ...st }, st.treeSize), sp = t.sp, sw = G.swayMask(sp); let footMax = 0, leafHi = 0, leafLo = 255, leaves = 0;
      for (let y = sp.h - 3; y < sp.h; y++) for (let x = 0; x < sp.w; x++) { const i = y * sp.w + x; if ([G.M.TRUNK, G.M.BARK2, G.M.BARKD, G.M.BARKL, G.M.BELLY].includes(sp.m[i])) footMax = Math.max(footMax, sw[i]); }
      for (let i = 0; i < sp.m.length; i++) if (L.has(sp.m[i])) { leaves++; const y = (i / sp.w) | 0; if (y < sp.h * .4) leafHi = Math.max(leafHi, sw[i]); else leafLo = Math.min(leafLo, sw[i]); }
      if (!(footMax === 0 && leaves && leafHi > 150 && (leafLo === 255 || leafLo < leafHi))) bad.push(`${id} sway foot ${footMax}, leaves ${leafLo}-${leafHi}`);
    }
    { const rock = G.areaAssets("ravine", st).big[0]; if (rock.sway) bad.push("a boulder sways"); }
    for (const id of ["meadow", "moor", "heath"]) for (const b of [...G.areaAssets(id, st).small, ...G.areaAssets(id, st).big]) if (G.SWAYING_PROPS.has(b.kind) && !(b.sway && b.sway.width === b.sp.w && b.sway.height === b.sp.h)) bad.push(`${id} ${b.kind} has no sway mask`);
    res.push({ what: "ground cover and wind: every area has 3+ tufts (8 to 13 px), weights adding to 1; trees' feet still and leaves swaying (tops most), rocks still, leafy props masked", good: !bad.length, info: bad.slice(0, 6).join("; ") || `${G.AREAS.reduce((a, A) => a + G.tuftSprites(A.id, st).length, 0)} tufts over ${G.AREAS.length} areas` });
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
      const o = x.origin, inside = o && o.x >= 0 && o.x <= x.sp.w && o.y >= 0 && o.y <= x.sp.h, tight = x.metres.height * 16 === x.sp.h || Math.abs(x.metres.height * 16 - x.sp.h) < 1; // its origin on the sprite; metres match the cropped sprite
      if (!(big >= 6 && big <= 12 && bottom > 0 && inside && tight)) bad.push(`${A.id} ${x.metres.width}x${x.metres.height} m${bottom ? "" : ", floating"}${inside ? "" : ", origin"}${tight ? "" : ", metres"}`);
    }
    res.push({ what: "set pieces: all 30 areas have one; the 20 new ones stand on the ground, 6 to 12 m across or tall, cropped (metres match the sprite), their origin on it", good: !bad.length && sizes.length === 20, info: bad.join(", ") || `${sizes.length} new, ${Math.min(...sizes)} to ${Math.max(...sizes)} m` });
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
  { // paths: every kind's strip tiles along its length, its end, Y and T are drawn, only the magic trail glows; the railway's three variants, points, broken end and crossing; the 3D pieces stand, only flagged ones glow; every area has a path kind
    const bad = [], EM = new Set([...G.EMISSIVE]), lit = sp => [...sp.m].some(v => EM.has(v)), n = sp => { let k = 0; for (const v of sp.m) if (v) k++; return k; };
    for (const id of G.PATH_IDS) {
      const K = G.PATH_KINDS[id];
      for (let variant = 0; variant < (K.variants || [0]).length; variant++) {
        const T = G.pathTextures(id, { variant }), S = T.strip; let seam = 0; for (let i = 0; i < 200; i++) { const u = (i % 20) / 10 - .95, v = Math.floor(i / 20) * K.period / 10 + .013, a2 = K.surface(u, v, false, variant), b2 = K.surface(u, v + K.period, false, variant); if (JSON.stringify(a2) !== JSON.stringify(b2)) seam++; } // the surface repeats every period, so the strip tiles
        const ok = S.w === Math.round(K.width * 16) && seam === 0 && [T.strip, T.end, T.y, T.t].every(sp => n(sp) > 20) && lit(T.strip) === !!K.glow;
        if (!ok) bad.push(`${id}/${variant}${seam ? " seam " + seam : ""}`);
      }
    }
    for (const sp of [G.railPoints({ variant: 1 }), G.railBrokenEnd(), G.railCrossing()]) if (n(sp) < 200) bad.push("railway piece");
    for (const d of G.PATH_PIECES) { const P = G.pathPieceSprite(d.id, st); if (!(stats(P.sp).bottom > 0 && n(P.sp) > 8 && lit(P.sp) === !!d.glow)) bad.push(d.id); }
    const ap = G.areaPathKinds(), none = G.AREAS.filter(A => !(ap[A.id] || []).length).map(A => A.id);
    res.push({ what: "paths: 10 kinds, each strip tiling with its end, Y and T; only the magic trail glows; railway variants, points, broken end, crossing; the 3D pieces stand, only flagged ones glow; every area suits a path kind", good: !bad.length && !none.length && G.PATH_IDS.length >= 10, info: [...bad, ...none.map(a => a + " has no path kind")].join(", ") || `${G.PATH_IDS.length} kinds, ${G.PATH_PIECES.length} pieces` });
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
