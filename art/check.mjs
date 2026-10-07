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
  // (standing: something on its bottom row; or, a witch's sprite with her shadow lifted out of it (art/witch.js liftShadow: the box kept,
  // the game stands her by her `ground` anchor and lays her shadow there), that anchor in the sprite's lower part, its bottom row her ground's)
  const stats = sp => { let n = 0, bottom = 0; for (let i = 0; i < sp.m.length; i++) if (sp.m[i]) n++; for (let x = 0; x < sp.w; x++) if (sp.m[(sp.h - 1) * sp.w + x]) bottom++; const g = sp.anchors?.ground; if (!bottom && g && g[1] >= sp.h * 0.5 && g[1] <= sp.h + 1 && g[0] >= 0 && g[0] <= sp.w) bottom = 1; return { n, bottom, w: sp.w, h: sp.h }; };
  for (const S of G.SPECIES) {
    const hs = [];
    for (const level of [0, 1, 2, 3]) for (const frame of [0, 1]) { const s = stats(G.critter(S.id, level, frame, st)); hs[level] = s.h; res.push({ what: `${S.id} level ${level} frame ${frame}`, good: s.n > 20 && s.bottom > 0, info: `${s.w}x${s.h}` }); }
    { const a = stats(G.critter(S.id, 2, 0, st, "away")); res.push({ what: `${S.id} adult turned away`, good: a.n > 20 && a.bottom > 0, info: `${a.w}x${a.h}` }); }
    // clear steps (Ed, 2026-10-04: "the size difference should be obvious"), by body height (no antlers or wings): young at least 1.3 times the baby,
    // the adult at least 1.55 times the young, the legend at least 2.1 times the adult, so they can't drift back together
    { const bh = [0, 1, 2, 3].map(l => G.critter(S.id, l, 0, st).bodyH), r = [bh[1] / bh[0], bh[2] / bh[1], bh[3] / bh[2]];
      res.push({ what: `${S.id}: baby < young < adult < legend, in clear steps (young 1.3+ times the baby, adult 1.55+ times the young, legend 2.1+ times the adult)`, good: hs[3] > hs[2] && hs[2] > hs[1] && hs[1] > hs[0] && r[0] >= 1.3 && r[1] >= 1.55 && r[2] >= 2.1, info: bh.join(" < ") + " (" + r.map(x => x.toFixed(2)).join(", ") + ")" }); }
    if (["wolf", "boar", "stag", "bear", "elk", "lynx"].includes(S.id)) { const w = G.witchSprite(st).bodyH, k = G.critter(S.id, 2, 0, st).bodyH / w, hi = ["elk", "stag"].includes(S.id) ? 2.5 : 2.1; res.push({ what: `${S.id}: an adult clearly bigger than the witch (1.45 to ${hi} times, body without antlers; the elk and stag stand taller)`, good: k >= 1.45 && k <= hi, info: k.toFixed(2) }); }
  }
  { // creature genomes (#79 stage 1): every species a record on a known template, its parts allowed by its sockets, none clashing,
    // its hash its own; the builders' species are the records' (speciesOf)
    const probs = G.GENOMES.flatMap(g => G.genomeProblems(g)), hashes = new Set(G.GENOMES.map(g => G.genomeHash(g)));
    res.push({ what: `genomes: every one of the ${G.SPECIES.length} species a record on one of the ${G.TEMPLATE_IDS.length} templates, its parts in its sockets, no clashes, every hash different`, good: G.GENOMES.length === G.SPECIES.length && G.SPECIES.every(s => G.GENOME_BY_ID[s.id]) && !probs.length && hashes.size === G.GENOMES.length, info: probs.join("; ") || `${G.GENOMES.length} records` });
    // masks and palettes (stage 2): a sprite's material mask painted with its palette row is its bake, pixel for pixel, in every outline mode
    const bad = [];
    for (const S of G.SPECIES) for (const level of [0, 1, 2, 3]) for (const facing of ["towards", "away"]) for (const gear of [null, { woken: true }, { woken: true, face: "angry" }, { face: "happy" }, { face: "dazed" }]) {
      const sp = G.critter(S.id, level, 0, st, facing, gear), col = G.speciesColours(S.id, st, gear);
      for (const mode of level === 1 && !gear && facing === "towards" ? [st.cOutline, "none", "dark", "tint"] : [st.cOutline]) {
        const want = G.bake(sp, col, st, mode).A.getContext("2d").getImageData(0, 0, sp.w, sp.h).data, got = G.paintPixels(G.bakeMask(sp, mode), G.paletteRow(col, mode));
        let d = 0; for (let i = 0; i < want.length; i++) if (want[i] !== got[i]) d++;
        if (d) bad.push(`${S.id} ${level} ${facing}${gear?.woken ? " woken" : ""}${gear?.face ? " " + gear.face : ""} ${mode}: ${d}`);
      }
    }
    res.push({ what: "palettes: every creature's material mask painted with its palette row is its bake exactly (all levels, both facings, woken, every expression, every outline mode)", good: !bad.length, info: bad.slice(0, 5).join(", ") || "identical" });
    // variants: every curated variant colours every species (no magenta, no missing material), each different from its own
    const vb = [];
    for (const S of G.SPECIES) { const own = JSON.stringify(G.speciesColours(S.id, st)); for (const v of Object.keys(G.PALETTE_VARIANTS)) { const c = G.variantColours(S.id, st, v), row = G.paletteRow(c), m = G.bakeMask(G.critter(S.id, 1, 0, st), st.cOutline); if (JSON.stringify(c) === own) vb.push(`${S.id} ${v} same`); for (let i = 0; i < m.mat.length; i++) if (m.kind[i] === 1 && row[m.mat[i] * 4] === 255 && row[m.mat[i] * 4 + 1] === 0 && row[m.mat[i] * 4 + 2] === 255) { vb.push(`${S.id} ${v} magenta`); break; } } }
    res.push({ what: `palette variants: all ${Object.keys(G.PALETTE_VARIANTS).length} curated coats colour every species, no material uncoloured, each its own`, good: !vb.length, info: vb.slice(0, 5).join(", ") || "ok" });
  }
  { // expressions (Ed, 2026-10-05: "the eyebrows should be with the creature generator"): every species at every level, angry, happy, dazed and asleep
    // drawn as part of its face: each different from its neutral face, its brows showing (and standing out from its coat), no bigger than
    // neutral by more than 2 px, nothing NaN; and the away view drawn
    const bad = [], lum = c => c[0] * .3 + c[1] * .55 + c[2] * .15;
    for (const S of G.SPECIES) for (const level of [0, 1, 2, 3]) {
      const plain = G.critter(S.id, level, 0, st), col = G.speciesColours(S.id, st);
      if (Math.abs(lum(col[G.M.BROW]) - lum(col[G.M.BODY])) < 60) bad.push(`${S.id} brows don't stand out`);
      for (const face of G.EXPRESSIONS.filter(f => f !== "neutral")) for (const facing of ["towards", "away"]) {
        const sp = G.critter(S.id, level, 0, st, facing, { face }), base = facing === "towards" ? plain : G.critter(S.id, level, 0, st, facing), id = `${S.id} ${level} ${face} ${facing}`;
        const tol = Math.max(3, Math.max(base.w, base.h) * .01); if (sp.w > base.w + tol || sp.h > base.h + tol) bad.push(`${id} grew ${sp.w - base.w}x${sp.h - base.h}`); // (within 2 px, or 1% of a legend)
        if (![...sp.n].every(Number.isFinite)) bad.push(`${id} NaN`);
        if (![...sp.m].some(v => v)) bad.push(`${id} empty`);
        if (facing !== "towards") continue;
        let d = sp.w === base.w && sp.h === base.h ? 0 : 99, brow = 0;
        if (d === 0) for (let i = 0; i < sp.m.length; i++) if (sp.m[i] !== base.m[i]) d++;
        for (let i = 0; i < sp.m.length; i++) if (sp.m[i] === G.M.BROW) brow++;
        if (d < 2) bad.push(`${id} same as neutral`);
        if (!brow) bad.push(`${id} no brows`);
      }
    }
    res.push({ what: `expressions: every species at every level angry, happy, dazed and asleep as part of its face (different from neutral, its brows showing and standing out from its coat, no bigger than 3 px or 1%, nothing NaN; from behind, its plain face)`, good: !bad.length, info: bad.slice(0, 8).join(", ") || "ok" });
  }
  { // surface texture (Ed, 2026-10-05, #119): every species at every level in its fur, feathers, scales, plates, shell or bristles: textured
    // (its coat broken into tones along its stamps), its detail (tone edges a coat pixel) growing with age (a baby's softest), the same size
    // as untextured within 1% (2 px), every material coloured, nothing NaN; with texture 0, as before (tools/genome/compare.mjs TEXTURE=0)
    const bad = [], off = { ...st, texture: 0 }, coat = new Set([G.M.BODYL, G.M.BODY, G.M.BODY2, G.M.BODY3, G.M.BELLY, G.M.ACCENT]);
    const detail = sp => { let e = 0, n = 0; for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) { const v = sp.m[y * sp.w + x]; if (!coat.has(v)) continue; n++; const r = sp.get(x + 1, y), b = sp.get(x, y + 1); if (coat.has(r) && r !== v) e++; if (coat.has(b) && b !== v) e++; } return n ? e / n : 0; };
    for (const S of G.SPECIES) {
      const col = G.speciesColours(S.id, st), dv = [0, 1, 2, 3].map(level => {
        const a = G.critter(S.id, level, 0, st), b = G.critter(S.id, level, 0, off), id = `${S.id} ${level}`, tol = Math.max(2, Math.ceil(b.h * .01));
        if (Math.abs(a.w - b.w) > tol || Math.abs(a.h - b.h) > tol) bad.push(`${id} ${a.w}x${a.h} vs ${b.w}x${b.h}`);
        if (![...a.n].every(Number.isFinite)) bad.push(`${id} NaN`);
        for (const v of new Set(a.m)) if (v && v !== G.M.LINE && !col[v]) bad.push(`${id} material ${v} uncoloured`);
        return [detail(a), detail(b)];
      });
      if (dv[2][0] < dv[2][1] * .9) bad.push(`${S.id} adult poorer textured (${dv[2][0].toFixed(2)} vs ${dv[2][1].toFixed(2)})`);
      if (dv[0][0] - dv[0][1] > (dv[2][0] - dv[2][1]) * 1.15) bad.push(`${S.id} baby's texture busier than its adult's (+${(dv[0][0] - dv[0][1]).toFixed(2)} vs +${(dv[2][0] - dv[2][1]).toFixed(2)})`);
    }
    res.push({ what: "surface texture: every species at every level in its own surface (fur, feathers, scales, plates, shell, bristles), no poorer than untextured, a baby's softest, the same size within 1%, every material coloured", good: !bad.length, info: [...new Set(bad)].slice(0, 8).join(", ") || "ok" });
  }
  { // silhouettes (#79 stage 3): at game size (each young and adult shrunk to 24 px), no two species' shapes alike: they differ by 0.15 or more
    // (1 - their overlap over their union, whichever way each faces)
    for (const level of [1, 2]) {
      const sh = Object.fromEntries(G.SPECIES.map(S => [S.id, G.silhouette(G.critter(S.id, level, 0, st))])), pairs = G.silhouettePairs(sh), close = pairs.filter(p => p.d < .15);
      res.push({ what: `silhouettes: no two species alike at ${G.SILHOUETTE_SIZE} px (${["", "young", "adult"][level]}s, every pair 0.15 apart or more)`, good: !close.length, info: (close.length ? close : pairs.slice(0, 3)).map(p => `${p.a}/${p.b} ${p.d.toFixed(2)}`).join(", ") });
    }
  }
  { // the live rig's parts (#79 stage 4): every four-legged species and the snake, at each level, baked as pieces at the five headings (torso, head:
    // the four-legged, and their tails where they have one; the serpent's head), each with its pivot near it, four legs with two bones each, discs to string them
    const bad = [];
    for (const S of G.SPECIES.filter(S => S.q || S.plan === "snake")) for (const level of [0, 1, 2, 3]) {
      const P = G.rigParts(S.id, level, st), need = P.template === "quadruped" ? ["torso", "head"] : ["head"];
      for (const k of need) (P.pieces[k] || []).forEach((p, i) => { if (!p) bad.push(`${S.id} ${level} ${k} ${i} missing`); else if (p.px < -p.sp.w || p.py < -p.sp.h || p.px > 2 * p.sp.w || p.py > 4 * p.sp.h + 8) bad.push(`${S.id} ${level} ${k} ${i} pivot off`); }); // near it: the torso's is the ground under it, below its leg-less sprite
      if (need.some(k => (P.pieces[k] || []).length !== 5)) bad.push(`${S.id} ${level} not five headings`);
      if (P.template === "quadruped" && (P.joints.legs.length !== 4 || P.joints.legs.some(l => !l.hip || !l.knee || !l.foot))) bad.push(`${S.id} ${level} legs`);
      if (!Object.values(P.discs).some(d => Object.keys(d).length)) bad.push(`${S.id} ${level} no discs`);
      if (level === 1) for (const [name, gear] of [["party", { collar: [255, 60, 200], hat: 0, glasses: "bar" }], ["woken", { woken: true }]]) { const G2 = G.rigParts(S.id, level, st, gear), h = G2?.pieces.head?.[2], h0 = P.pieces.head[2]; if (!h || (h0 && h.sp.m.join() === h0.sp.m.join())) bad.push(`${S.id} ${level} ${name} head as plain`); } // party gear and the woken eyes baked on its head
      for (const face of ["angry", "happy", "dazed", ...(level === 3 ? ["asleep"] : [])]) { const f = P.faces?.[face]; if (!f || f.length !== 5 || f.some(p => !p)) bad.push(`${S.id} ${level} no ${face} head`); else if (P.pieces.head[2] && f[2].sp.m.join() === P.pieces.head[2].sp.m.join()) bad.push(`${S.id} ${level} ${face} head as neutral`); } // its head in each expression
    }
    res.push({ what: "rig parts: every four-legged species and the snake, at every level, baked as torso and head pieces (the snake its head) at the five headings with their pivots near them, four two-bone legs, discs to string bones and bodies, and the head in every expression, in party gear and woken", good: !bad.length, info: bad.slice(0, 6).join(", ") || "ok" });
  }
  { // sleeping legends (Ed, 2026-10-04: just the sleeping form for now): asleep in 2 breathing frames, both facings, each drawn, standing on its bottom
    // row, its origin on the sprite and every material coloured; sunk (its ground line above its feet), no taller than the legend awake, nothing glowing,
    // eyes shut, its two breaths different
    const glows = sp => { let n = 0; for (const m of sp.m) if (G.EMISSIVE.has(m)) n++; return n; };
    for (const id of G.LEGEND_IDS) for (const facing of ["towards", "away"]) {
      const fs = [0, 1].map(frame => G.legendForm(id, st, { frame, facing })), bad = [], aw = G.critter(id, 3, 0, st, facing);
      fs.forEach(({ sp, colours }, i) => { const s = stats(sp), o = sp.origin, nan = sp.n.some(Number.isNaN), miss = [...new Set(sp.m)].filter(m => m && m !== G.M.LINE && !colours[m]);
        if (!(s.n > 200 && s.bottom > 0 && o && o[0] >= 0 && o[0] <= sp.w && o[1] >= 0 && o[1] <= sp.h + 1 && !nan && !miss.length)) bad.push(`asleep${i} ${s.w}x${s.h}${nan ? " NaN" : ""}${miss.length ? " uncoloured " + miss : ""}${o ? "" : " no origin"}`);
        if (!(sp.groundLine > 0)) bad.push(`asleep${i} not sunk`); if (sp.h > aw.h) bad.push(`asleep${i} ${sp.h} taller than awake ${aw.h}`); if (glows(sp)) bad.push(`asleep${i} glows`);
        if (sp.m.some(m => m === G.M.EYE || m === G.M.IRIS || m === G.M.WOKEN)) bad.push(`asleep${i} eyes open`); });
      if (fs[0].sp.m.length === fs[1].sp.m.length && fs[0].sp.m.every((m, i) => m === fs[1].sp.m[i])) bad.push("no breath");
      res.push({ what: `sleeping legend ${id} ${facing}: asleep x2 (sunk, no taller than awake, no glow, eyes shut, breathing; drawn, standing, origin on the sprite, coloured)`, good: !bad.length, info: bad.join(", ") || `asleep ${fs[0].sp.w}x${fs[0].sp.h}, awake ${aw.w}x${aw.h}` });
    }
  }
  { // every creature asleep (art/naps.js; Ed, 2026-10-06: "we will need sleeping artwork for all the creatures"): every species at every level in 2
    // breathing frames, each drawn and standing on its bottom row, its ground origin on the sprite, no taller than it stands awake, no pupils
    // (eyes shut), every material coloured, its two breaths different
    for (const S of G.SPECIES) {
      const bad = [];
      for (let level = 0; level < 4; level++) {
        const aw = G.critter(S.id, level, 0, st), fs = [0, 1].map(f => G.critter(S.id, level, f, st, "towards", { nap: true })), colours = G.speciesColours(S.id, st);
        fs.forEach((sp, i) => { const s = stats(sp), o = sp.origin, miss = [...new Set(sp.m)].filter(m => m && m !== G.M.LINE && !colours[m]);
          if (!(s.n > 20 && s.bottom > 0 && o && o[0] >= 0 && o[0] <= sp.w && o[1] >= sp.h * .5 && o[1] <= sp.h + 2 && !sp.n.some(Number.isNaN) && !miss.length)) bad.push(`L${level} f${i} ${s.w}x${s.h}${o ? " origin " + o : " no origin"}${miss.length ? " uncoloured " + miss : ""}`);
          if (sp.h > aw.h) bad.push(`L${level} f${i} ${sp.h} taller than awake ${aw.h}`);
          if (sp.m.some(m => m === G.M.PUPIL || m === G.M.IRIS)) bad.push(`L${level} f${i} eyes open`); });
        if (fs[0].m.length === fs[1].m.length && fs[0].m.every((m, i) => m === fs[1].m[i])) bad.push(`L${level} no breath`);
      }
      res.push({ what: `${S.id} asleep (${G.napPose(S.id).kind}): baby to legend x2 breaths (drawn, standing, origin on the sprite, no taller than awake, eyes shut, coloured)`, good: !bad.length, info: bad.slice(0, 4).join(", ") || "ok" });
    }
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
    // reaching up for the stack her hand is above her hat tip, crouched to the ground it is down by her feet; the party's poses too
    // (lying back she is low and long); a pair pose's meeting anchors inside every frame (the conga's back too)
    const base = stats(G.witchSprite(st)), bad = [], P = G.WITCH_FOOT_POSES, PR = G.WITCH_PAIRS;
    for (const [pose, { frames, fps, party }] of Object.entries(P)) for (const facing of ["towards", "away"]) for (let frame = 0; frame < frames; frame++) {
      const sp = G.witchSprite(st, { pose, frame, facing }), s2 = stats(sp), nan = [...sp.n].some(v => Number.isNaN(v)), a = sp.anchors;
      const pin = q => q && q.every(Number.isFinite) && q[0] >= 0 && q[0] <= sp.w && q[1] >= 0 && q[1] <= sp.h;
      const pr = PR[pose], meets = !pr || ((pr.frame === undefined || pr.frame === frame) ? pin(a.pair) && (!pr.partner || pin(a[pr.partner])) : true);
      const inside = a && pin(a.hand) && pin(a.hatTip) && meets;
      const up = (pose === "placeSigil" && frame === 0) || (pose === "liftSigil" && frame === 2), down = (pose === "placeSigil" && frame === 2) || (pose === "liftSigil" && frame === 0);
      const reach = !inside || ((!up || a.hand[1] < a.hatTip[1]) && (!down || a.hand[1] > sp.h * .8));
      const lying = pose === "stargaze" || pose === "limbo", hk = lying ? [.5, 1] : [.7, 1.6], wk = lying ? 2.2 : 1.8;
      if (!(s2.n > 200 && s2.bottom > 0 && !nan && s2.h > base.h * hk[0] && s2.h < base.h * hk[1] && s2.w < base.w * wk && inside && reach && fps > 0 && (!party || ["dance", "pair", "social", "move", "rest"].includes(party)))) bad.push(`${pose} ${facing} ${frame} ${s2.w}x${s2.h}${nan ? " NaN" : ""}${inside ? "" : " anchors"}${reach ? "" : " reach"}`);
    }
    for (const [pose, pr] of Object.entries(PR)) if (!P[pose] || !(pr.meet === "pair") || (pr.partnerPose && !P[pr.partnerPose]) || (pr.third && !P[pr.third.pose])) bad.push(`pair ${pose}`);
    { // the twirl's partner and the limbo's: their meeting anchors inside; the limbo dancer's top under the holder's bar (model heights), the bar held level
      const hold = G.witchSprite(st, { pose: "limboHold" }), help = G.witchSprite(st, { pose: "limboHelp" }), tw = G.witchSprite(st, { pose: "twirled", frame: 1 });
      if (!(hold.anchors.bar && help.anchors.pair && tw.anchors.pair)) bad.push("twirl/limbo anchors");
      for (let f = 0; f < P.limbo.frames; f++) { const top = G.witchModel({ pose: "limbo", frame: f }).anchors.top; if (!(top && top[1] < G.LIMBO_BAR - .02)) bad.push(`limbo ${f} top ${top && top[1].toFixed(2)} not under the bar ${G.LIMBO_BAR}`); }
    }
    const counts = Object.fromEntries(Object.entries(P).map(([k, v]) => [k, v.frames])), want = { stand: 3, land: 3, takeoff: 3, talk: 4, placeSigil: 3, liftSigil: 3, sit: 2,
      twoStep: 4, bounce: 2, shuffle: 4, spin: 4, headbang: 2, jump: 3, dancePair: 4, holdHands: 2, hug: 2, highFive: 2, laugh: 3, drink: 4, run: 4, sitGround: 2, stargaze: 2, conga: 4, twirl: 4, twirled: 4, limboHold: 2, limboHelp: 2, limbo: 4, dj: 14 };
    res.push({ what: "witch on foot: stand (3), land and takeoff (3 each), talk (4), placeSigil and liftSigil (3 each), sit (2), and the party's 21 (7 dances with the limbo, dance with a partner, hold hands, hug, high-five, laugh, drink, run, sit on the ground, stargaze, conga, twirl and twirled, the broom limbo's two holders), towards and away, at her ordinary scale, standing, no NaN; hand and hat-tip anchors inside, and the pairs' meeting anchors, the limbo dancer under the bar; reaching up above her hat, down to the ground", good: !bad.length && JSON.stringify(counts) === JSON.stringify(want), info: bad.join(", ") || Object.entries(counts).map(([k, n]) => k + " " + n).join(", ") });
  }
  { // her lean cycle (WITCH_FLIGHT_POSES.lean): 4 frames, both facings and both headings, at her ordinary scale, standing, hand and hat-tip anchors inside; the frames differ (it moves)
    const bad = [], scale = G.witchSprite(st, { pose: "fast" }).scale, F = G.WITCH_FLIGHT_POSES;
    for (const o of [{ facing: "towards" }, { facing: "away" }, { heading: "away" }, { heading: "towards" }]) {
      const sps = [0, 1, 2, 3].map(frame => G.witchSprite(st, { ...o, pose: "lean", frame }));
      for (const [k, sp] of sps.entries()) { const s2 = stats(sp), A = sp.anchors, pin = q => q && q[0] >= 0 && q[0] <= sp.w && q[1] >= 0 && q[1] <= sp.h; if (!(s2.n > 100 && s2.bottom > 0 && Math.abs(sp.scale - scale) < 1e-6 && A && pin(A.hand) && pin(A.hatTip) && ![...sp.n].some(Number.isNaN))) bad.push(`${o.facing || o.heading} ${k}`); }
      const sig = sps.map(sp => sp.w + "x" + sp.h + ":" + [...sp.m].join("")); if (new Set(sig).size < 4) bad.push(`${o.facing || o.heading}: frames repeat`);
    }
    if (!(F.lean && F.lean.frames === 4 && F.lean.fps > 0 && F.hover.frames === 3 && F.fast.frames === 3 && F.brake.frames === 2)) bad.push("WITCH_FLIGHT_POSES");
    res.push({ what: "witch lean cycle: 4 frames, towards and away and heading up and down the screen, at her ordinary scale, standing, hand and hat-tip anchors inside, every frame different", good: !bad.length, info: bad.join(", ") || `lean ${F.lean.frames} frames at ${F.lean.fps} fps` });
  }
  { // party witches: 8 to 12 outfits, each a different look from WITCH_LOOKS, every one drawn in her flight frames and every pose on foot at her
    // ordinary scale, standing, a hat in every pose and its glowing hatband showing hovering and standing (still a witch); partyWitch is seeded (same seed, same witch) and varied (outfits, skins, glow sticks)
    const bad = [], O = G.PARTY_OUTFITS, Lk = G.WITCH_LOOKS, scale = G.witchSprite(st, { pose: "stand" }).scale, looks = new Set();
    if (!(O.length >= 8 && O.length <= 12) || new Set(O.map(o => o.id)).size !== O.length) bad.push(`${O.length} outfits`);
    for (const o of O) {
      const L = { ...G.DEFAULT_LOOK, ...o.look }; looks.add(JSON.stringify(L));
      if (!Lk.hat.includes(L.hat) || !Lk.hair.includes(L.hair) || !Lk.top.includes(L.top)) bad.push(`${o.id} look`);
      const pw = G.partyWitch(1, { outfit: o.id }), col = pw.colours(st);
      for (const opts of [{ frame: 0 }, { pose: "lean", frame: 1 }, { pose: "rise", frame: 0 }, { pose: "stand", frame: 0 }, ...Object.entries(G.WITCH_FOOT_POSES).map(([pose, { frames }]) => ({ pose, frame: frames - 1 }))]) {
        const sp = G.witchSprite(st, { ...opts, look: pw.look }), s2 = stats(sp), band = [...sp.m].filter(m => m === G.M.MAGIC).length + (opts.pose === undefined || (opts.pose === "stand" && opts.frame === 0) ? 0 : 1), hat = [...sp.m].some(m => m === G.M.HAT), magenta = [...sp.m].some(m => m && !col[m] && m !== G.M.LINE);
        if (!(s2.n > 150 && s2.bottom > 0 && (opts.pose === "rise" || !opts.pose || Math.abs(sp.scale - scale) < 1e-6) && band > 0 && hat && !magenta && ![...sp.n].some(Number.isNaN))) bad.push(`${o.id} ${opts.pose || "hover"}${magenta ? " (a part without a colour)" : ""}${band ? "" : " (no hatband)"}${hat ? "" : " (no hat)"}`);
      }
    }
    if (looks.size !== O.length) bad.push("two outfits share a look");
    const a = G.partyWitch(7), b = G.partyWitch(7), seen = new Set(), skins = new Set(), glows = new Set();
    for (let k = 0; k < 40; k++) { const w = G.partyWitch(k); seen.add(w.id); skins.add(w.outfit.skin.join()); glows.add(w.outfit.glow.join()); }
    if (JSON.stringify([a.id, a.outfit, a.look]) !== JSON.stringify([b.id, b.outfit, b.look])) bad.push("partyWitch not seeded");
    if (seen.size < Math.min(8, O.length) || skins.size < 4 || glows.size < 4) bad.push(`partyWitch varied: ${seen.size} outfits, ${skins.size} skins, ${glows.size} neons over 40 seeds`);
    res.push({ what: "party witches: 8 to 12 outfits, each its own look (hat, hair, top, shades, glow sticks, headphones), drawn in flight and every pose on foot at her scale, a witch's hat on, its band glowing; partyWitch seeded and varied", good: !bad.length, info: bad.slice(0, 8).join(", ") || `${O.length} outfits; 40 seeds: ${seen.size} outfits, ${skins.size} skins, ${glows.size} glow-stick neons` });
  }
  { // no flecks on the witch (Ed: "these little flecks"): in every sprite of hers (flight, headings, the lean cycle, on foot) and of every party outfit, no pixel
    // whose colour differs strongly from all 4 neighbours (or that stands alone) without one of its own colour round it, no interior-line dot one or two pixels long,
    // and no eye poking out past her face's edge; her eyes' glints and her mouth are meant
    const KEEP = new Set([G.M.EYE, G.M.GLINT, G.M.NOSE]), diff = (a, b) => Math.max(...[0, 1, 2].map(k => Math.abs(a[k] - b[k])));
    const flecks = (sp, col) => {
      const c = m => m === G.M.LINE ? [0, 0, 0] : col[m] || [255, 0, 255], out = [];
      for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) {
        const m = sp.m[y * sp.w + x]; if (!m) continue;
        const n4 = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => sp.get(x + dx, y + dy));
        if (m === G.M.EYE) { if (n4.filter(v => !v).length >= 2) out.push(`eye at ${x},${y}`); continue; }
        if (KEEP.has(m)) continue;
        const own = [[1, 1], [-1, 1], [1, -1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => sp.get(x + dx, y + dy) === m);
        if (!own && n4.every(v => !v || diff(c(v), c(m)) > 48)) out.push(`${x},${y}`);
      }
      const seen = new Uint8Array(sp.m.length); // interior-line runs of 1 or 2 pixels
      for (let i = 0; i < sp.m.length; i++) { if (sp.m[i] !== G.M.LINE || seen[i]) continue; let n = 0; const todo = [i]; seen[i] = 1; while (todo.length) { const j = todo.pop(); n++; const x = j % sp.w, y = (j / sp.w) | 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const X = x + dx, Y = y + dy, k = Y * sp.w + X; if (X >= 0 && Y >= 0 && X < sp.w && Y < sp.h && !seen[k] && sp.m[k] === G.M.LINE) { seen[k] = 1; todo.push(k); } } } if (n <= 2) out.push(`line dot at ${i % sp.w},${(i / sp.w) | 0}`); }
      return out;
    };
    const bad = [], wc = G.witchColours(st); let n = 0;
    const her = [];
    for (const facing of ["towards", "away"]) { for (const frame of [0, 1, 2]) her.push({ facing, frame }); her.push({ facing, lean: true }); for (const [pose, { frames }] of Object.entries(G.WITCH_FLIGHT_POSES)) if (pose !== "hover") for (let frame = 0; frame < frames; frame++) her.push({ facing, pose, frame }); for (const [pose, { frames }] of Object.entries(G.WITCH_FOOT_POSES)) for (let frame = 0; frame < frames; frame++) her.push({ facing, pose, frame }); }
    for (const heading of ["away", "towards"]) for (const o of [{ frame: 0 }, { frame: 1 }, { frame: 2 }, { lean: true }, ...[0, 1, 2, 3].map(frame => ({ pose: "lean", frame })), ...[0, 1, 2].map(frame => ({ pose: "fast", frame })), { pose: "brake", frame: 0 }, { pose: "brake", frame: 1 }]) her.push({ heading, ...o });
    for (const o of her) { const f = flecks(G.witchSprite(st, o), wc); n++; if (f.length) bad.push(`her ${o.heading || o.facing} ${o.pose || (o.lean ? "lean" : "hover")}${o.frame ?? ""}: ${f.slice(0, 3).join(" ")}`); }
    for (const P of G.PARTY_OUTFITS) { const pw = G.partyWitch(2, { outfit: P.id }), col = pw.colours(st);
      for (const o of [{ frame: 0 }, { frame: 1 }, ...[0, 1, 2, 3].map(frame => ({ pose: "lean", frame })), { pose: "rise", frame: 0 }, { pose: "descend", frame: 0 }, ...Object.entries(G.WITCH_FOOT_POSES).flatMap(([pose, { frames }]) => [...Array(frames).keys()].map(frame => ({ pose, frame })))]) { const f = flecks(G.witchSprite(st, { ...o, look: pw.look }), col); n++; if (f.length) bad.push(`${P.id} ${o.pose || "hover"}${o.frame ?? ""}: ${f.slice(0, 3).join(" ")}`); } }
    res.push({ what: "witch flecks: no stray single pixels (a colour unlike all 4 neighbours, none of its own round it), no one- or two-pixel interior-line dots, no eye past her face's edge, on all her sprites and every party outfit's", good: !bad.length, info: bad.slice(0, 6).join("; ") || `${n} sprites clean` });
  }
  { // attack effects (Stage 5): projectiles (spit, barb, two lobs and their shadow, a feather, a mote), short and long beams (start, a loop that
    // repeats exactly, end), pulses (the quake's ring, a spore cloud and stain), telegraphs (a target circle, a line that repeats exactly with its
    // start and arrowhead, a wind-up flash, the quake's reach), hit sparks, and slow and knockback marks: every frame, light and dark, ground and
    // treetop, drawn, anchors inside, frames differing, the light ones haloed and the dark ones rimmed, only glowing pixels tinted, the treetop
    // drawing as big from the treetops as the ground one from the ground (or more); every attack in config/combat.json has its effects
    const bad = [], E = G.EFFECTS, glowing = new Set([G.M.MAGIC2, G.M.MAGIC, G.M.GLOW, G.M.COLLAR]), need = ["spit", "barb", "lobSeed", "lobStone", "lobShadow", "feather", "mote", "beamShortStart", "beamShortLoop", "beamShortEnd", "beamLongStart", "beamLongLoop", "beamLongEnd", "quakeRing", "sporeCloud", "targetCircle", "line", "lineStart", "lineEnd", "windupFlash", "quakeReach", "hitSpark", "hitSparkBig", "slowRing", "slowMark", "knockback", "dust", "screechRing", "upheavalRing", "slamRing", "webGlob", "webSplat", "moleMound", "chargeDust", "stunStars", "hitStrong", "hitResisted", "traitFlier", "traitArmoured", "traitSwarm", "traitHeavy", "traitNimble", "traitBurrower"];
    for (const id of need) if (!G.EFFECT_BY_ID[id]) bad.push(`no ${id}`);
    let n = 0;
    for (const e of E) for (const zoom of ["ground", "treetop"]) for (const variant of ["light", "dark"]) {
      const sigs = new Set();
      for (let f = 0; f < e.frames; f++) {
        const r = G.effectSprite(e.id, { frame: f, variant, zoom }), sp = r.sp, name = `${e.id} ${zoom} ${variant} ${f}`; n++;
        let px = 0, lit = 0, halo = 0, rim = 0, tintBad = 0;
        for (let i = 0; i < sp.m.length; i++) { const m = sp.m[i]; if (!m) continue; px++; if (glowing.has(m)) lit++; if (m === G.M.COLLAR) halo++; if (m === G.M.LINE) rim++; if (sp.tint[i] && !glowing.has(m) && m !== G.M.LINE) tintBad++; }
        const inside = Object.values(r.anchors).every(([x, y]) => x >= 0 && x <= sp.w && y >= 0 && y <= sp.h), physical = ["lobShadow", "dust", "chargeDust", "moleMound"].includes(e.id);
        if (!px || !inside || tintBad || (!physical && !lit) || (variant === "dark" ? !rim : (!physical && !halo))) bad.push(`${name}: ${px} px, ${lit} glowing, halo ${halo}, rim ${rim}${inside ? "" : ", anchors outside"}${tintBad ? ", tints a solid pixel" : ""}`);
        if (r.period) { let rep = sp.w % r.period === 0 && sp.w >= r.period; for (let y = 0; y < sp.h && rep; y++) for (let x = 0; x + r.period < sp.w; x++) if (sp.m[y * sp.w + x] !== sp.m[y * sp.w + x + r.period]) { rep = false; break; } if (!rep) bad.push(`${name}: doesn't repeat every ${r.period} px`); }
        sigs.add([...sp.m].join(""));
      }
      if (e.frames > 1 && sigs.size < e.frames) bad.push(`${e.id} ${zoom} ${variant}: frames repeat`);
    }
    // (over every frame; ringed decals are sized to the attack's radius in the game: from the treetops their strokes must be at least 1.5 times the pixels, the stain as many)
    for (const e of E) { const count = z => [...Array(e.frames).keys()].reduce((s, frame) => s + [...G.effectSprite(e.id, { zoom: z, frame }).sp.m].filter(Boolean).length, 0), g0 = count("ground"), t0 = count("treetop") / (e.radius ? (e.id === "sporeStain" ? 1 : 1.5) : G.EFFECT_TREETOP_SHRINK ** 2); if (t0 < g0 * (e.radius ? 1 : .6)) bad.push(`${e.id}: from the treetops ${t0.toFixed(0)} px against ${g0} on the ground`); }
    const combat = await (await fetch("/config/combat.json")).json(), A = G.ATTACK_EFFECTS;
    for (const atk of Object.keys(combat.attacks)) { const fx = A[atk]; if (!fx) { bad.push(`attack ${atk} has no effects`); continue; } for (const v of Object.values(fx).flat()) if (!G.EFFECT_BY_ID[v]) bad.push(`attack ${atk}: no effect ${v}`); }
    for (const [atk, fx] of Object.entries(A)) for (const v of Object.values(fx).flat()) if (!G.EFFECT_BY_ID[v].attacks.includes(atk)) bad.push(`${v} doesn't list ${atk}`);
    for (const v of Object.values(G.STATE_EFFECTS).flatMap(x => typeof x === "string" ? [x] : Object.values(x))) if (!G.EFFECT_BY_ID[v]) bad.push(`state effect ${v} missing`);
    res.push({ what: "attack effects: projectiles, short and long beams (start, a repeating loop, end), quake ring and spore cloud, telegraphs (target circle, a repeating line with its ends, wind-up flash, quake reach), hit sparks, slow and knockback marks, Stage 5's pulse rings, web, mole mound, charge dust, stun stars, strong and resisted hits, six trait marks; every frame light and dark, ground and treetop, drawn, anchors inside, frames differing, halos and rims, only glowing pixels tinted, as big from the treetops; every attack in config/combat.json has its effects", good: !bad.length, info: bad.slice(0, 6).join("; ") || `${E.length} effects, ${n} sprites; ${Object.keys(combat.attacks).length} attacks covered` });
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
  { // the DJ booth (Ed, 2026-10-06: "The witch should have a 'DJing' animation for when she's standing behind the decks"): the DJ
    // table's fore frames (DJ_FRAMES of them, one size, each different: the platters turning, the LEDs chasing; the first is the
    // whole's own table); her DJ frames, facing us, every gesture's frames different, each with an upper layer (what's over the
    // decks: her head and arms, none of her legs); stood with her ground anchor on the seat, every hand meant for the decks lands
    // on the decks' pixels (not the desk's front or the room behind); djFrame plays every gesture over the set, two frames a beat
    const bad = [], T = G.treehouseSprite(st), FF = T.foreFrames, key = sp => Array.from(sp.m).join(), seat = T.anchors.seat;
    if (FF.length !== G.DJ_FRAMES || new Set(FF.map(f => f.w + "x" + f.h)).size !== 1 || new Set(FF.map(key)).size !== FF.length) bad.push("fore frames");
    { const f0 = FF[0]; for (let y = 0; y < f0.h; y++) for (let x = 0; x < f0.w; x++) { const v = f0.m[y * f0.w + x]; if (v && T.fore.m[(y + T.foreBox.y) * T.fore.w + x + T.foreBox.x] !== v) { bad.push("fore frame 0 not the table"); y = f0.h; break; } } }
    const DECK = new Set([G.M.SHADES, G.M.BODY3, G.M.COLLAR, G.M.RUNE, G.M.BELLY, G.M.FRAME, G.M.WOKEN]), onDeck = (x, y) => { const f0 = FF[0]; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const X = Math.round(x) - T.foreBox.x + dx, Y = Math.round(y) - T.foreBox.y + dy; if (X >= 0 && Y >= 0 && X < f0.w && Y < f0.h && DECK.has(f0.m[Y * f0.w + X])) return true; } return false; };
    const P = G.WITCH_FOOT_POSES.dj, frames = [], deckHands = [0, 1, 4, 5, 6, 7, 8, 9];
    for (let f = 0; f < P.frames; f++) {
      const sp = G.witchSprite(st, { pose: "dj", frame: f }), up = sp.upper, n = sp.m.filter(Boolean).length, nu = up ? up.reduce((a, v) => a + v, 0) : 0; frames.push(key(sp));
      let lowUp = 0; if (up) for (let i = 0; i < up.length; i++) if (up[i]) lowUp = Math.max(lowUp, Math.floor(i / sp.w));
      if (!up || nu < n * .3 || nu > n * .9 || lowUp > sp.anchors.ground[1] - 8) bad.push(`dj ${f}: upper ${nu} of ${n}, lowest row ${lowUp}`);
      if (deckHands.includes(f)) { const hx = seat.x - sp.anchors.ground[0] + sp.anchors.hand[0], hy = seat.y - sp.anchors.ground[1] + sp.anchors.hand[1]; if (!onDeck(hx, hy)) bad.push(`dj ${f}: hand off the decks (${hx.toFixed(1)}, ${hy.toFixed(1)})`); }
    }
    for (const fr of Object.values(G.DJ_GESTURES)) if (frames[fr[0]] === frames[fr[1]]) bad.push(`dj ${fr}: frames alike`);
    const played = new Set(); for (let b = 0; b < 48 * 4; b += .25) played.add(G.djFrame(b)); for (const [gname, fr] of Object.entries(G.DJ_GESTURES)) if (gname !== "cast" && !fr.every(f => played.has(f))) bad.push(`djFrame never plays ${gname}`);
    if (!G.DJ_GESTURES.cast.includes(G.djFrame(3.2, { cast: true }))) bad.push("djFrame cast");
    res.push({ what: "DJ booth: the table's fore frames turn (one size, each different, the first the whole's table); her DJ frames facing us, every gesture's frames different, each with an upper layer (head and arms, no legs); her deck hands on the decks' pixels; djFrame plays every gesture", good: !bad.length, info: bad.join("; ") || `${FF.length} fore frames ${FF[0].w}x${FF[0].h}, ${P.frames} DJ frames` });
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
  // legendary sigils (Ed, 2026-10-06: "huge, twice as wide and more detailed than the normal ones", then his reference, a magic
  // circle with the animal in the centre): every species' has detail of its own (inside its unit box); its circle's lines all in
  // the unit square, with three medallions, runes when full and none when small, its runes seeded (no two species' alike); its
  // SVG, glyph, ground rune and floating form LEGEND_SCALE times a normal's or a legend's across and inkier; its carving mask
  // whole, its outer ring touching the edge; the stack carries one
  { const bad = [], runeKeys = new Set();
    for (const S of G.SPECIES) {
      const id = S.id, det = G.LEGEND_DETAIL[id] || [];
      if (!det.length) bad.push(`${id}: no detail`);
      if (det.some(k => (k.l || (k.d ? [k.d] : [])).some(([x, y]) => x < 0 || y < 0 || x > 1 || y > 1))) bad.push(`${id}: detail outside its box`);
      const full = G.legendSigilStrokes(id, { tier: 2 }), small = G.legendSigilStrokes(id, { tier: 0 });
      if (!full.every(k => k.pts.every(([x, y]) => x >= 0 && x <= 1 && y >= 0 && y <= 1))) bad.push(`${id}: outside its square`);
      const runes = full.filter(k => k.kind === "rune").length;
      if (runes < 60 || small.some(k => k.kind === "rune") || !small.some(k => k.kind === "animal") || small.length >= full.length) bad.push(`${id}: tiers (${runes} runes)`);
      runeKeys.add(full.filter(k => k.kind === "rune").slice(0, 12).map(k => k.pts.map(p => p.map(v => v.toFixed(3)).join(",")).join(";")).join("|"));
      if (!/width="128" height="128"/.test(G.sigilSVG(id, { size: 64, legendary: true }))) bad.push(`${id}: SVG not ×${G.LEGEND_SCALE}`);
      const g = G.sigilGlyph(id, 32, { legendary: true }), animal = g.m.reduce((a, v, i) => a + (v && !g.frame[i] ? 1 : 0), 0), rim = g.frame.reduce((a, v) => a + v, 0);
      if (g.w !== 64 || g.h !== 64 || animal < 30 || rim < 150) bad.push(`${id}: glyph ${g.w}x${g.h} ${animal}/${rim}`);
      const r = G.groundSigil(id, { legendary: true }), r3 = G.groundSigil(id, { level: 3 }), f = G.floatSigil(id, { legendary: true }), f3 = G.floatSigil(id, { level: 3 });
      if (r.w < r3.w * 1.8 || pixels(r) <= pixels(r3)) bad.push(`${id}: ground rune ${r.w}x${r.h} vs ${r3.w}x${r3.h}`);
      if (f.w < f3.w * 1.7 || pixels(f) <= pixels(f3)) bad.push(`${id}: floating ${f.w}x${f.h}`);
      const m = G.legendSigilMask(id, 128), edge = [64 * 128 + 1, 64 * 128 + 126, 128 + 64, 126 * 128 + 64].map(i => Math.max(m[i], m[i - 1], m[i + 1])), lit = m.reduce((a, v) => a + (v > .5 ? 1 : 0), 0);
      if (edge.some(v => v < .3) || lit < 1200 || m.some(v => !(v >= 0 && v <= 1))) bad.push(`${id}: mask (edge ${edge.map(v => v.toFixed(1))}, ${lit} px)`);
    }
    if (runeKeys.size < G.SPECIES.length) bad.push(`runes alike: ${runeKeys.size} of ${G.SPECIES.length}`);
    const st = new G.SigilStack(), it = st.push("wolf", 3, null, { legendary: true }); st.update(0, { head: [0, 0, 0] }); const lay = st.layout()[0];
    if (!(lay.legendary && Math.abs(lay.width - lay.size) < 1e-9 && Math.abs(it.size - G.LEGEND_SCALE * G.floatSize(3)) < 1e-9)) bad.push("the stack's legendary sigil not twice a legend's");
    res.push({ what: "legendary sigils: every species' magic circle with its own detail and runes, inside its square, full when big and simple when small, its SVG, glyph, ground rune and floating form twice a legend's and inkier, its carving mask whole; the stack carries one", good: !bad.length, info: bad.slice(0, 6).join(", ") || `${G.SPECIES.length} species` });
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
    // every party shoe style on each fitting (a hoof, a paw, a claw) shows, the body no bigger; on the rig, a shoe piece at every heading
    for (const [id, fit] of [["boar", "hoof"], ["fox", "paw"], ["owl", "claw"]]) for (const shoes of Object.keys(G.SHOE_STYLES)) {
      const gear = { collar: G.sigilColour(id), shoes }, sp = G.critter(id, 2, 0, st, "towards", gear), plain = G.critter(id, 2, 0, st, "towards");
      if (count(sp, G.M.SHOE) === 0 || (shoes === "lightup" && count(sp, G.M.COLLAR) <= count(G.critter(id, 2, 0, st, "towards", { collar: gear.collar }), G.M.COLLAR)) || Math.abs(sp.bodyH - plain.bodyH) > 1) bad.push(`${id} ${shoes} (${fit})`);
      if (fit !== "claw") { const R = G.rigParts(id, 2, st, gear); if (!R?.pieces.shoe || R.pieces.shoe.some(p => !p)) bad.push(`${id} ${shoes} rig shoe`); }
    }
    if (G.rigParts("fox", 2, st, { collar: [1, 2, 3] })?.pieces.shoe) bad.push("fox barefoot rig has a shoe");
    const woke = G.SPECIES.filter(S => count(G.critter(S.id, 1, 0, st, "towards", { woken: true }), G.M.WOKEN) === 0).map(S => S.id);
    const mixes = Array.from({ length: 40 }, (_, i) => JSON.stringify(G.partyGear(i, [1, 2, 3]))), same = JSON.stringify(G.partyGear(5, [1, 2, 3])) === mixes[5];
    const varied = new Set(mixes).size > 10 && mixes.some(m => m.includes('"hat":null')) && mixes.some(m => !m.includes("null"));
    res.push({ what: "party gear on all 30 at three levels, both views (collar, hat; shoes on four-legged feet; same body size); every party shoe style on a hoof, a paw and a claw, and on the rig; woken eyes; partyGear seeded and varied", good: !bad.length && !woke.length && same && varied, info: [...bad, ...woke.map(w => w + " not woken")].slice(0, 60).join(", ") || "ok" });
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
  { // the prop generator (art/props/, #119): every kind's 12 seeded variants draw, stand on their bottom row, nothing NaN, no two alike;
    // standing stones grey slabs 3 to 6 m tall (squat and broken ones from 1.4 m), plain (lichen and moss under a third of them) and wider than deep in the picture;
    // cairns low (under 2.2 m) and wider than tall; pools wider than tall, mostly water, 1.5 to 5 m across (at the tall pieces' 16 px a metre); a broken trunk's wood all
    // one piece (its branch joined to it, never a stick laid beside it); and under ?props=gen the moor and the muddy forest get
    // 3 shapes of each stood-in prop
    const bad = [], wood = new Set([G.M.TRUNK, G.M.BARKD, G.M.BARKL, G.M.BELLY]);
    for (const kind of G.PROP_KINDS) {
      const seen = new Set();
      for (let seed = 0; seed < 12; seed++) {
        const p = G.propPiece(kind, { seed }, G.AREA_BY_ID.moor, st), sp = p.sp, n = sp.m.filter(Boolean).length, key = sp.w + "x" + sp.h + ":" + Array.from(sp.m).join("");
        if (n < 60 || !Array.from(sp.n).every(Number.isFinite)) { bad.push(`${kind} ${seed}: ${n} px`); continue; }
        let bottom = 0; for (let x = 0; x < sp.w; x++) if (sp.m[(sp.h - 1) * sp.w + x]) bottom++; if (!bottom) bad.push(`${kind} ${seed} floats`);
        if (seen.has(key)) bad.push(`${kind} ${seed} repeats another`); seen.add(key);
        const share = mats => sp.m.filter(m => mats.includes(m)).length / n, { height, width } = p.metres;
        if (kind === "standingStone") { const [r, g, b] = p.colours[G.M.STONE], mx = Math.max(r, g, b), sat = mx ? (mx - Math.min(r, g, b)) / mx : 0; if (sat > .22 || height < (p.variant.shape === "squat" || p.variant.top === "broken" ? 1.4 : 3) || height > 6 || share([G.M.BELLY, G.M.MOSS]) > .33) bad.push(`stone ${seed}: sat ${sat.toFixed(2)}, ${height} m, marks ${share([G.M.BELLY, G.M.MOSS]).toFixed(2)}`); }
        if (kind === "cairn" && (height > 2.2 || width < height)) bad.push(`cairn ${seed}: ${width} x ${height} m`);
        if (kind === "pool" && (width < 1.5 || width > 5 || sp.h >= sp.w || share([G.M.WATER, G.M.BODY2, G.M.GLINT, G.M.ACCENT, G.M.WEB]) < .5)) bad.push(`pool ${seed}: ${width} x ${height} m, water ${share([G.M.WATER, G.M.BODY2, G.M.GLINT, G.M.ACCENT, G.M.WEB]).toFixed(2)}`); // (its glints, the sky's reflection and the moonlit rim are water too)
        if (kind === "brokenTrunk" || kind === "fallenLog") { // the wood's pieces, by 4-neighbour flood fill (splinters and fungi on it touch it)
          const lab = new Int32Array(sp.m.length).fill(-1); let parts = 0, big = 0;
          for (let i = 0; i < sp.m.length; i++) { if (lab[i] >= 0 || !wood.has(sp.m[i])) continue; let size = 0; const q = [i]; lab[i] = parts; while (q.length) { const j = q.pop(); size++; const x = j % sp.w, y = (j / sp.w) | 0; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const xx = x + dx, yy = y + dy, k = yy * sp.w + xx; if (xx >= 0 && yy >= 0 && xx < sp.w && yy < sp.h && lab[k] < 0 && (wood.has(sp.m[k]) || sp.m[k] === G.M.MOSS || sp.m[k] === G.M.FLOWER)) { lab[k] = parts; q.push(k); } } } parts++; if (size > 12) big++; }
          if (big !== 1) bad.push(`broken trunk ${seed} (${p.variant.branch}): its wood in ${big} pieces`);
        }
      }
    }
    const gst = { ...st, propGen: 1 }, moor = G.areaAssets("moor", gst), muddy = G.areaAssets("muddy-forest", gst), sizes = l => new Set(l.map(a => a.sp.w + "x" + a.sp.h)).size;
    if (moor.walls.length < 3 || sizes(moor.walls) < 3) bad.push(`moor pools ${moor.walls.length}, ${sizes(moor.walls)} shapes`);
    if (sizes(moor.big.filter(a => a.kind === "standingstone")) < 3 || sizes(moor.big.filter(a => a.kind === "cairn")) < 3) bad.push("moor stones and cairns not 3 shapes each");
    if (sizes(muddy.small.filter(a => a.kind === "stump")) < 3) bad.push("muddy forest's broken trunks not 3 shapes");
    if (Math.max(...moor.big.map(a => a.metres?.height || 0)) < 4) bad.push("the moor has nothing 4 m tall under ?props=gen");
    if (Math.abs(moor.big.filter(a => a.kind === "standingstone").reduce((t, a) => t + (a.sparse || 0), 0) - .12) > 1e-6) bad.push("the standing stones' sparse share changed");
    res.push({ what: "prop generator: standing stones, cairns, pools and broken trunks, 12 variants each, standing, none alike; stones grey, plain slabs; cairns low; pools mostly water; each broken trunk and fallen log one piece; logs, mushroom rings and stone circles too; ?props=gen gives the moor and the muddy forest 3 shapes of each", good: !bad.length, info: bad.slice(0, 6).join("; ") });
  }
  { // the legend clearings' rim kit (#235; art/props/generator.js rimPiece, areaAssets' rim): every area has RIM_PIECES pieces, each drawn, standing
    // on its bottom row, nothing NaN, none over a metre, none glowing, at least 3 shapes of them; open and stony areas mostly stones, cairns and
    // boulders, wooded ones mostly toadstools, stumps and posts
    const bad = [], EM = new Set([...G.EMISSIVE]), stony = new Set(["stone", "cairn", "boulder"]);
    for (const def of G.AREAS) {
      const a = G.areaAssets(def.id, st), rim = a.rim || [];
      if (rim.length !== G.RIM_PIECES) { bad.push(`${def.id}: ${rim.length} rim pieces`); continue; }
      for (const [k, b] of rim.entries()) {
        const p = G.rimPiece({ k, seed: G.rimSeed(def, k) }, def, st), sp = p.sp, n = sp.m.filter(Boolean).length;
        let bottom = 0; for (let x = 0; x < sp.w; x++) if (sp.m[(sp.h - 1) * sp.w + x]) bottom++;
        if (n < 25 || !bottom || !Array.from(sp.n).every(Number.isFinite) || b.metres.height > 1 || Array.from(sp.m).some(m => EM.has(m)) || b.kind !== p.form) bad.push(`${def.id} rim ${k} (${p.form}): ${n} px, ${b.metres.height} m${bottom ? "" : ", floats"}`);
      }
      if (new Set(rim.map(b => b.sp.w + "x" + b.sp.h)).size < 3) bad.push(`${def.id}: rim pieces under 3 shapes`);
    }
    for (const [id, want] of [["moor", true], ["ravine", true], ["rocky-slope", true], ["fern-forest", false], ["hazel-forest", false], ["bluebell-glade", false]]) {
      const forms = [...Array(G.RIM_PIECES).keys()].map(k => G.rimForm(G.AREA_BY_ID[id], k)), share = forms.filter(f => stony.has(f)).length / forms.length;
      if (want ? share < .5 : share > .5) bad.push(`${id}'s rim ${forms.join(",")}`);
    }
    res.push({ what: "legend clearings' rim kit: every area 6 small pieces (stones, cairns, boulders, toadstools, stumps, posts), each drawn and standing, under a metre, unlit, 3+ shapes; stony areas mostly stone, wooded ones mostly wood and toadstools", good: !bad.length, info: bad.slice(0, 6).join("; ") });
  }
  { // generated bridges (art/props/bridges.js, under ?props=gen): each bridge's variants draw and stand, none alike, nothing NaN,
    // the hand-made piece's size within a third either way (so a crossing's corridor still fits), nothing glowing
    const bad = [], EM = new Set([...G.EMISSIVE]);
    for (const id of G.BRIDGE_IDS) {
      const base = G.pathPieceSprite(id, st), seen = new Set();
      for (let k = 0; k < 8; k++) {
        const p = G.pathPieceSprite(`${id}~${k}`, st), sp = p.sp, key = sp.w + "x" + sp.h + ":" + Array.from(sp.m).join("");
        if (!Array.from(sp.n).every(Number.isFinite) || sp.m.filter(Boolean).length < 200) { bad.push(`${id}~${k} empty or NaN`); continue; }
        let bottom = 0; for (let x = 0; x < sp.w; x++) if (sp.m[(sp.h - 1) * sp.w + x]) bottom++; if (!bottom) bad.push(`${id}~${k} floats`);
        if (seen.has(key)) bad.push(`${id}~${k} repeats another`); seen.add(key);
        if (sp.w < base.sp.w * .67 || sp.w > base.sp.w * 1.33) bad.push(`${id}~${k} ${sp.w} px wide, the piece ${base.sp.w}`);
        if (Array.from(sp.m).some(m => EM.has(m))) bad.push(`${id}~${k} glows`);
      }
    }
    const posts = new Set(); // the fingerposts (only generated): standing, none alike, 1.4 to 3 m tall, unlit
    for (let k = 0; k < 8; k++) {
      const p = G.pathPieceSprite(`fingerpost~${k}`, st), sp = p.sp, key = sp.w + "x" + sp.h + ":" + Array.from(sp.m).join("");
      let bottom = 0; for (let x = 0; x < sp.w; x++) if (sp.m[(sp.h - 1) * sp.w + x]) bottom++;
      if (!bottom || !Array.from(sp.n).every(Number.isFinite) || posts.has(key) || p.metres.height < 1.4 || p.metres.height > 3 || Array.from(sp.m).some(m => EM.has(m))) bad.push(`fingerpost~${k}: ${p.metres.height} m${bottom ? "" : ", floats"}${posts.has(key) ? ", repeats" : ""}`);
      posts.add(key);
    }
    res.push({ what: "generated bridges: footbridges, rope bridges and root bridges, 8 variants each, standing, none alike, within a third of the hand-made piece's size, unlit; fingerposts 8 variants, standing, none alike, 1.4 to 3 m, unlit", good: !bad.length, info: bad.slice(0, 6).join("; ") });
  }
  { // the set-piece generator (art/props/sets.js): every kind's 12 seeded variants draw, stand on their bottom row, nothing NaN, none alike, landmark-sized
    // (6 to 12 m across or tall) with their origin on the sprite, one warm glowing touch at most (a lantern, embers), a punt's and a jetty's pool mostly water;
    // and an area naming one as its set piece gets it built (setPiece3d)
    const bad = [], EM = new Set([...G.EMISSIVE]), water = [G.M.WATER, G.M.BODY2, G.M.ACCENT, G.M.WEB, G.M.GLINT];
    for (const kind of G.SET_PROP_KINDS) {
      const seen = new Set();
      for (let seed = 0; seed < 12; seed++) {
        const p = G.genSetPiece(kind, { seed }, G.AREA_BY_ID["muddy-forest"], st), sp = p.sp, n = sp.m.filter(Boolean).length, key = sp.w + "x" + sp.h + ":" + Array.from(sp.m).join("");
        if (n < 400 || !Array.from(sp.n).every(Number.isFinite)) { bad.push(`${kind} ${seed}: ${n} px`); continue; }
        let bottom = 0; for (let x = 0; x < sp.w; x++) if (sp.m[(sp.h - 1) * sp.w + x]) bottom++; if (!bottom) bad.push(`${kind} ${seed} floats`);
        if (seen.has(key)) bad.push(`${kind} ${seed} repeats another`); seen.add(key);
        const big = Math.max(p.metres.width, p.metres.height), o = p.origin; if (big < 6 || big > 12) bad.push(`${kind} ${seed}: ${p.metres.width} x ${p.metres.height} m`);
        if (!(o.x >= 0 && o.x <= sp.w && o.y >= 0 && o.y <= sp.h)) bad.push(`${kind} ${seed}: origin off it`);
        const lit = new Set(Array.from(sp.m).filter(m => EM.has(m) && m !== G.M.GLINT)); if (lit.size > 1 || [...lit].some(m => m !== G.M.GLOW)) bad.push(`${kind} ${seed} glows in ${[...lit].join(",")}`);
        if ((kind === "punt" || kind === "jetty") && sp.m.filter(m => water.includes(m)).length / n < .3) bad.push(`${kind} ${seed}: little water`);
      }
    }
    const fake = { ...G.AREA_BY_ID["muddy-forest"], id: "test-area" }, a = G.setPiece3d("jetty", fake, st), b = G.setPiece3d("jetty", { ...fake, id: "another-area" }, st);
    if (!a.sp || !a.origin || a.sp.w * a.sp.h === b.sp.w * b.sp.h && a.sp.w === b.sp.w) bad.push("setPiece3d: a generated kind isn't built, or two areas get the same one");
    res.push({ what: "set-piece generator: punts, jetties, rings and heaps, 12 variants each, standing, none alike, 6 to 12 m, origin on it, one warm glow at most, punts and jetties in their pools; an area naming one gets its own", good: !bad.length, info: bad.slice(0, 6).join("; ") });
  }
  { // something tall in every area (Ed: "each area should have at least some kind of taller thing"): each area's big pieces include one at least 4 m tall
    // (its trees across their heights, or for the open areas the tall pieces); the tall pieces (snag, cairn, standing stone, pillar, spire, stalagmite)
    // stand on the ground, 4.5 to 12 m tall, and are flagged sparse (a small share of the area's big objects), or big where they stand in for
    // the area's trees (the stone shrine's great standing stones: Ed, 2026-10-06)
    const bad = [], tallest = {};
    for (const A of G.AREAS) {
      const a = G.areaAssets(A.id, st), hs = [...a.big.filter(b => A.big[b.from][0] !== "tree").map(b => b.sp.h / 16), ...G.areaTreeVariants(A.id, st).map(v => v.metres.height)]; tallest[A.id] = Math.max(0, ...hs); // trees: their variants, sapling to giant
      if (!(tallest[A.id] >= 4)) bad.push(`${A.id} ${tallest[A.id].toFixed(1)} m`);
      a.big.forEach(b => { const [kind, o] = A.big[b.from]; if (!G.TALL_KINDS.includes(kind)) return; let bottom = 0; const d = b.sp.A.getContext("2d").getImageData(0, b.sp.h - 1, b.sp.w, 1).data; for (let k = 3; k < d.length; k += 4) if (d[k]) bottom++;
        if (!(bottom > 0 && b.metres && b.metres.height >= 4.5 && b.metres.height <= 12 && (o.sparse > 0 && o.sparse <= .3 || o.big))) bad.push(`${A.id} ${kind} ${b.metres?.height} m${bottom ? "" : ", floating"}`); });
    }
    const open = ["moor", "stone-shrine", "log-pile", "ravine"].map(id => `${id} ${tallest[id].toFixed(1)} m`).join(", ");
    res.push({ what: "something tall in every area: a big piece 4 m+ in each; the open areas' tall pieces stand, 4.5 to 12 m, sparse", good: !bad.length, info: bad.join("; ") || `the open areas' tallest: ${open}` });
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
    res.push({ what: "set pieces: every area has one; the new ones (20 or more) stand on the ground, 6 to 12 m across or tall, cropped (metres match the sprite), their origin on it", good: !bad.length && sizes.length >= 20, info: bad.join(", ") || `${sizes.length} new, ${Math.min(...sizes)} to ${Math.max(...sizes)} m` });
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
  { // world decorations: 12 ruins in two conditions, 8 rocks, 13 freak trees, each standing, sized for its family; tall ones split; only the flagged ones glow; the lake kit
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
    res.push({ what: "world decorations: 12 ruins (two conditions), 8 rocks, 13 freak trees; standing; ruins 4-14 m, a few tall enough for the treetops; tall ones split top and bottom; only the flagged ones glow (3+ ruins); the lake kit", good: !bad.length && fam.ruins === 12 && fam.rocks === 8 && fam.freak === 13 && tallRuins >= 2 && glowing >= 3 && lake, info: bad.join(", ") || `${tallRuins} tall ruins, ${glowing} glowing` });
  }
  { // countryside and street pieces: each standing on its bottom row, its origin on it, a sane size and footprint, tall ones split, only the flagged ones glow
    const bad = [], fam = {}, EM = new Set([...G.EMISSIVE]);
    for (const d of G.COUNTRY) {
      const R = G.countrySprite(d.id, st), sp = R.whole, s2 = stats(sp), lit = [...sp.m].some(v => EM.has(v)), big = Math.max(R.metres.width, R.metres.height); fam[d.family] = (fam[d.family] || 0) + 1;
      const split = d.split == null || (stats(R.top).n > 20 && stats(R.top).n + stats(R.bot).n === s2.n), nan = [...sp.n].some(v => !Number.isFinite(v));
      if (!(s2.n > 30 && s2.bottom > 0 && !nan && split && lit === !!d.glow && big >= .5 && big <= 9 && R.metres.footprint > 0 && R.metres.footprint <= 6 && R.origin.x >= 0 && R.origin.x <= sp.w && R.origin.y >= 0 && R.origin.y <= sp.h + 1)) bad.push(`${d.id} ${R.metres.width}x${R.metres.height} m, footprint ${R.metres.footprint}${split ? "" : " split"}${lit === !!d.glow ? "" : " glow"}`);
    }
    res.push({ what: "farm and street pieces: farm 15+, street 10+; standing, origin on the sprite, 0.5 to 9 m, footprint up to 6 m, tall ones split, only the flagged ones glow", good: !bad.length && fam.farm >= 15 && fam.street >= 10, info: bad.join(", ") || Object.entries(fam).map(([k, n]) => k + " " + n).join(", ") });
  }
  { // the large scenes' pieces: each standing, origin on the sprite, 0.3 to 16 m, tall ones split, decals flat, only the flagged ones glow; buildings in two halves
    const bad = [], fam = {}, EM = new Set([...G.EMISSIVE]);
    for (const d of G.LANDMARKS) {
      const R = G.landmarkSprite(d.id, st), sp = R.whole, s2 = stats(sp), lit = [...sp.m].some(v => EM.has(v)), big = Math.max(R.metres.width, R.metres.height); fam[d.family] = (fam[d.family] || 0) + (d.half === "near" ? 0 : 1);
      const split = d.split == null || ((stats(R.top).n > 20 || d.half === "near") && stats(R.top).n + stats(R.bot).n === s2.n), flat = !d.decal || R.metres.height < R.metres.width * .7, nan = [...sp.n].some(v => !Number.isFinite(v));
      if (!(s2.n > 30 && s2.bottom > 0 && !nan && split && flat && lit === !!d.glow && big >= .3 && big <= 26 && R.metres.footprint > 0 && R.origin.x >= 0 && R.origin.x <= sp.w)) bad.push(`${d.id} ${R.metres.width}x${R.metres.height} m${split ? "" : " split"}${flat ? "" : " not flat"}${lit === !!d.glow ? "" : " glow"}`);
    }
    const halves = Object.keys(G.LANDMARK_BUILDINGS).filter(b => G.LANDMARK_BY_ID[b + "-far"] && G.LANDMARK_BY_ID[b + "-near"]).length;
    res.push({ what: "large scenes' pieces: cemetery, car park, scrap yard, 7 places of worship, castle, classical; standing, sized, tall ones split, decals flat, only the flagged ones glow; walk-in buildings in far and near halves", good: !bad.length && fam.worship === 7 && fam.cemetery >= 8 && fam.castle >= 5 && fam.classical >= 6 && halves >= 5, info: bad.join(", ") || Object.entries(fam).map(([k, n]) => k + " " + n).join(", ") + `, ${halves} in halves` });
  }
  { // party objects: each standing, nothing NaN, small in pixel area for its class (litter, small, furniture, set: they're reused many times), decals flat;
    // only the flagged ones glow, each glowing one says its light (neon: its glow in the MAGIC materials, so it recolours by neon; warm: candle gold);
    // every light source glows, half of everything or more glows; a neon piece baked in two neons glows in two colours; clusters of 3 to 8 real objects, 1 to 6 m, mirroring true
    const bad = [], EM = new Set([...G.EMISSIVE]), area = { litter: 1200, balloon: 4000, small: 4000, furniture: 7000, set: 7000, home: 7000, picnic: 7000 }; let glowing = 0;
    for (const d of G.PARTY_OBJECTS) {
      const R = G.partySprite(d.id, st), sp = R.whole, s2 = stats(sp), mats = new Set(sp.m), lit = [...mats].some(v => EM.has(v)), nan = [...sp.n].some(v => !Number.isFinite(v)); if (lit) glowing++;
      const light = !d.glow ? d.light == null : d.light === "neon" ? mats.has(G.M.MAGIC) || mats.has(G.M.MAGIC2) : d.light === "warm" ? [G.M.GLOW, G.M.RUNE, G.M.WOKEN, G.M.COLLAR].some(v => mats.has(v)) : false; // warm: candle gold or fire
      const flat = !d.decal || R.metres.height < R.metres.width * .7, small = sp.w * sp.h <= area[d.cls];
      if (!(s2.n > 8 && s2.bottom > 0 && !nan && lit === !!d.glow && light && flat && small && (d.cls !== "small" || d.glow || d.cold))) bad.push(`${d.id} ${sp.w}x${sp.h}px${lit === !!d.glow ? "" : " glow"}${light ? "" : " light"}${flat ? "" : " not flat"}${small ? "" : " too big"}`);
    }
    { const sp = G.partySprite("glowsticks-stuck", st).whole, col = n => { const c = G.partyColours(st, n); return c[G.M.MAGIC].join(); }; if (col("pink") === col("cyan") || !sp.m.includes(G.M.MAGIC)) bad.push("neon recolour"); }
    for (const C of G.PARTY_CLUSTERS) {
      const L = G.sceneLayout(C.id, st), M2 = G.sceneLayout(C.id, st, { mirror: true }), real = C.pieces.every(p => G.sceneRefExists(p[0]));
      const mirrored = L.pieces.every((p, i) => Math.abs(Math.hypot(p.dx, p.dz) - Math.hypot(M2.pieces[i].dx, M2.pieces[i].dz)) < .02);
      if (!(real && L.pieces.length >= 3 && L.pieces.length <= 8 && L.footprint >= 1 && L.footprint <= 6 && mirrored)) bad.push(`cluster ${C.id}: ${L.pieces.length} pieces, ${L.footprint} m`);
    }
    const n = G.PARTY_OBJECTS.length, cls = G.PARTY_CLASSES.map(c => G.PARTY_OBJECTS.filter(d => d.cls === c).length);
    { // balloons: never glowing, shiny (a highlight pixel), in every colour slot across a bunch, a bob hint, a tie anchor inside the sprite for the tied ones
      const B = G.PARTY_OBJECTS.filter(d => d.cls === "balloon"), slots = new Set();
      for (const d of B) { const R = G.partySprite(d.id, st), sp = R.whole, mats = new Set(sp.m); for (const v of mats) slots.add(v);
        const tie = R.anchors?.tie, inside = !tie || (tie.x >= 0 && tie.x <= sp.w && tie.y >= 0 && tie.y <= sp.h);
        if (d.glow || [...mats].some(v => EM.has(v)) || (!d.id.includes("deflated") && !mats.has(G.M.WEB)) || (d.bob && !(d.bob.amplitude > 0 && d.bob.period > 0)) || !inside) bad.push(`balloon ${d.id}`); }
      if (B.length < 10 || B.filter(d => d.bob).length < 8 || ![G.M.SKIN, G.M.HAIR, G.M.IRIS, G.M.JACKET, G.M.JEANS, G.M.SHOES, G.M.PHONES].every(v => slots.has(v))) bad.push("balloons: too few, without bob, or colour slots unused");
      const a = G.partyColours(st, "pink", "neon"), b = G.partyColours(st, "pink", "metallic"); if (a[G.M.SKIN].join() === b[G.M.SKIN].join()) bad.push("balloon palettes");
    }
    { // Ed's rulings: hanging pieces hang from a `hang` anchor inside the sprite (the top attach point) and swing (bob); lanterns, fairy lights and the
      // mirror ball swing; point lights only on campfires and lanterns
      for (const d of G.PARTY_OBJECTS) {
        const R = G.partySprite(d.id, st), sp = R.whole, h = R.anchors?.hang, lantern = /lantern|jar/.test(d.id), fire = /campfire|bonfire/.test(d.id) && !d.cold;
        if (d.hang && !(h && h.x >= 0 && h.x <= sp.w && h.y >= 0 && h.y <= sp.h * .25 && d.bob)) bad.push(`${d.id} hang`);
        if (/lantern-pole|lantern-string|hanging|fairy|mirror-ball/.test(d.id) && !d.bob) bad.push(`${d.id} bob`);
        if (!!d.pointLight !== (lantern || fire)) bad.push(`${d.id} pointLight`);
      }
      if (G.PARTY_OBJECTS.filter(d => d.hang).length < 5) bad.push("too few hanging pieces");
    }
    { // campfires: the lit ones animate (3 frames, each different), warm, with a point light; the cold ones don't glow
      const F = G.PARTY_OBJECTS.filter(d => /fire|ashes/.test(d.id) && d.id !== "fire-pit-lit");
      for (const d of F) { if (d.glow) { const fr = [0, 1, 2].map(f => G.partySprite(d.id, st, { frame: f }).whole), sig = fr.map(sp => sp.m.join("")); if (!(d.frames === 3 && d.light === "warm" && d.pointLight?.radius > 0 && new Set(sig).size === 3)) bad.push(`campfire ${d.id}`); } else if ([...G.partySprite(d.id, st).whole.m].some(v => EM.has(v))) bad.push(`cold ${d.id}`); }
      if (F.filter(d => d.glow).length < 4 || F.filter(d => !d.glow).length < 1) bad.push("campfires: too few sizes or no cold one");
    }
    res.push({ what: "party objects: 40+ over the classes (litter, balloon, small, furniture, set, home, picnic); balloons shiny not glowing, every colour slot, bob hints, tie anchors; campfires in 4+ sizes animated in 3 frames with point lights, a cold one; hanging pieces with a hang anchor at the top, lanterns and lights swinging, point lights only on campfires and lanterns; standing, small in pixel area for their class, decals flat; only the flagged ones glow, with their light (neon recolourable, or warm); every light source glows, half or more of the rest (balloons aside) glow; 6+ clusters of 3 to 8, 1 to 6 m", good: !bad.length && n >= 40 && cls.every(k => k >= 6) && glowing * 2 >= n - cls[1] && G.PARTY_CLUSTERS.length >= 6, info: bad.join(", ") || `${n} objects (${cls.join("/")}), ${glowing} glowing, ${G.PARTY_CLUSTERS.length} clusters` });
  }
  { // scenes: every piece names a real sprite; 3+ pieces; at most one glowing kind; footprints sane (small 3 to 12 m) and holding every piece; mirroring keeps every distance and the footprint
    const bad = [], sizes = [];
    for (const S of G.SCENES) {
      const refs = S.pieces.map(p => p[0]), missing = refs.filter(r => !G.sceneRefExists(r));
      if (missing.length) { bad.push(`${S.id}: no ${missing.join(", ")}`); continue; }
      const L = G.sceneLayout(S.id, st), M2 = G.sceneLayout(S.id, st, { mirror: true }), glowKinds = new Set(refs.filter(r => G.scenePiece(r, st).glow)).size;
      const [lo, hi] = S.size === "large" ? [8, 40] : [3, 12], inside = L.pieces.every(p => Math.hypot(p.dx, p.dz) < L.footprint);
      const mirrored = M2.footprint === L.footprint && L.pieces.every((p, i) => Math.abs(Math.hypot(p.dx, p.dz) - Math.hypot(M2.pieces[i].dx, M2.pieces[i].dz)) < .02 && (p.facing === "left") !== (M2.pieces[i].facing === "left"));
      sizes.push(L.footprint);
      if (!(L.pieces.length >= 3 && glowKinds <= 1 && L.footprint >= lo && L.footprint <= hi && inside && mirrored)) bad.push(`${S.id}: ${L.pieces.length} pieces, ${glowKinds} glowing, footprint ${L.footprint} m${inside ? "" : ", a piece outside"}${mirrored ? "" : ", mirror"}`);
    }
    const small = G.SCENES.filter(S => S.size === "small").length, large = G.SCENES.filter(S => S.size === "large").length;
    res.push({ what: "scenes: 10+ small, 12 large; every piece real, 3+ each, one glowing kind at most, footprints sane and holding their pieces, mirroring keeps distances; hay bales and fences as scenes", good: !bad.length && small >= 10 && large >= 12 && !!G.SCENE_BY_ID["hay-bales"] && !!G.SCENE_BY_ID["fence-line"], info: bad.join(", ") || `${small} small, ${large} large, footprints ${Math.min(...sizes)} to ${Math.max(...sizes)} m` });
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
  { // every generator draws (phase 1: the ones no other check reached): every beach find and print (prints at every heading), the bedroom,
    // every broom kind under the witch, her hat alone both ways, every species' rune stone, a party patch, every legend's sprites; each
    // non-empty, nothing NaN in its normals, every material it uses coloured, its origin (where it has one) on the sprite
    const bad = [], seen = { beach: 0, brooms: 0, stones: 0, legends: 0 };
    const nan = sp => { for (let i = 0; i < sp.n.length; i++) if (Number.isNaN(sp.n[i])) return true; return false; };
    const look = (what, sp, col, origin) => {
      const s = stats(sp); if (!(s.n > 0)) { bad.push(`${what} empty`); return; }
      if (nan(sp)) bad.push(`${what} NaN normals`);
      if (col) for (const v of new Set(sp.m)) if (v && v !== G.M.LINE && !col[v]) { bad.push(`${what} material ${v} uncoloured`); break; }
      if (origin && !(origin.x >= 0 && origin.x <= sp.w && origin.y >= 0 && origin.y <= sp.h + 1)) bad.push(`${what} origin off the sprite`);
    };
    const bc = G.beachColours(st);
    for (const d of [...G.BEACH_FINDS, ...G.BEACH_PRINTS]) for (let h = 0; h < (d.kind === "print" ? G.PRINT_HEADINGS : 1); h++) { const b = G.beachSprite(d.id, st, { heading: h }); look(`beach ${d.id}${h ? " heading " + h : ""}`, b.whole, bc, b.origin); seen.beach++; }
    { const sp = G.bedroomSprite(st); look("bedroom", sp, G.bedroomColours(st)); if (!sp.anchors?.decks || !sp.anchors?.screen) bad.push("bedroom anchors"); }
    const wc = G.witchColours(st);
    for (const broom of G.WITCH_AXES.broom) { look(`broom ${broom}`, G.witchSprite(st, { look: { ...G.DEFAULT_LOOK, broom } }), wc); seen.brooms++; }
    for (const facing of ["towards", "away"]) look(`witch hat ${facing}`, G.witchHatSprite(st, { facing }), wc);
    for (const id of Object.keys(G.SIGIL_NEON)) { const b = G.runeStone(st, { sigil: id }); if (!(b.w > 4 && b.h > 4)) bad.push(`rune stone ${id}`); seen.stones++; }
    { const p = G.partyPatch(1, (id, o) => G.scenePlacements(id, st, o)); if (!(p.length > 10) || p.some(q => !q.ref || Number.isNaN(q.x) || Number.isNaN(q.y))) bad.push(`party patch: ${p.length} pieces`); else { const missing = p.filter(q => !G.sceneRefExists(q.ref)); if (missing.length) bad.push(`party patch: ${missing[0].ref} is no piece`); } }
    for (const id of G.LEGEND_IDS) { const L = G.legendSprites(id, st); if (!L || !Object.keys(L).length) bad.push(`legend sprites ${id}`); seen.legends++; }
    res.push({ what: "every generator draws: the beach's finds and prints (every heading), the bedroom, every broom, the witch's hat both ways, every species' rune stone, a party patch, every legend's sprites; none empty, nothing NaN, every material coloured", good: !bad.length && seen.beach > 0 && seen.brooms >= 18, info: bad.slice(0, 6).join("; ") || `${seen.beach} beach pieces, ${seen.brooms} brooms, ${seen.stones} rune stones, ${seen.legends} legends` });
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
// party relics (art/partyRelics.js, #87): 6+ giant bottles, each half-buried and legend-sized (7 to 16 m across and 6 to 17 m tall),
// sitting in its mound (the bottom row earth); its liquid glows (200+ px of MAGIC; nothing glows but the liquid, its surface and the
// motes); the glass is see-through (a rim in its colour and a half-clear dither of empty glass); it carries a light; its 3 frames
// differ (the motes rise); its origin and glint inside the sprite, the glint on the glass; the glint's 4 frames differ, only GLINT,
// the treetop ones bigger; their one sigil is in the sigil system, its strokes in the box, drawn as SVG, its id clashing with no creature's
{
  const P = await import("./partyRelics.js"), S = await import("./sigils.js"), { defaultStyle } = await import("./generator.js"), { M, EMISSIVE } = await import("./core.js");
  const st = defaultStyle(), bad = [], EARTH = new Set([M.TRUNK, M.BARKD, M.STONE, M.MOSS, M.LEAF, M.LEAF2, M.LEAF3]), GLOWS = new Set([M.MAGIC, M.MAGIC2, M.GLOW]);
  if (P.PARTY_RELIC_IDS.length < 6) bad.push(`${P.PARTY_RELIC_IDS.length} relics`);
  for (const id of P.PARTY_RELIC_IDS) {
    const R = P.partyRelicSprite(id, st), { w, h, m } = R.sp, { width, height } = R.metres, count = k => m.filter(v => v === k).length;
    if (!(width >= 7 && width <= 16 && height >= 6 && height <= 17)) bad.push(`${id} ${width} x ${height} m`);
    let earth = 0, bottom = 0; for (let x = 0; x < w; x++) { const v = m[(h - 1) * w + x]; if (v) { bottom++; if (EARTH.has(v)) earth++; } } if (!bottom || earth < bottom * .8) bad.push(`${id} not sitting in its mound`);
    const glowing = new Set(); for (const v of m) if (EMISSIVE.has(v)) glowing.add(v); if (count(M.MAGIC) < 200 || [...glowing].some(v => !GLOWS.has(v))) bad.push(`${id} glows ${[...glowing]} (${count(M.MAGIC)} liquid)`);
    let holes = 0; for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) if (!m[y * w + x] && m[y * w + x - 1] === M.HAT2 && m[y * w + x + 1] === M.HAT2) holes++;
    if (count(M.HAT1) < 50 || holes < 50) bad.push(`${id} glass not see-through (rim ${count(M.HAT1)}, clear ${holes})`);
    if (!(R.light?.radius > 0 && R.light.rgb?.length === 3)) bad.push(`${id} gives no light`);
    if (new Set([0, 1, 2].map(f => P.partyRelicSprite(id, st, { frame: f }).sp.m.join(""))).size < 3) bad.push(`${id} frames repeat`);
    const inside = p => p.x >= 0 && p.y >= 0 && p.x < w && p.y < h; if (!inside(R.origin) || !inside(R.glint)) bad.push(`${id} origin or glint outside`); else if (![M.CRYSTAL, M.HAT1].includes(m[Math.round(R.glint.y) * w + Math.round(R.glint.x)])) bad.push(`${id} glint not on the glass`);
    if (P.partyRelicSigilId(id) !== P.PARTY_RELIC_SIGIL) bad.push(`${id} has its own sigil`);
  }
  { const sid = P.PARTY_RELIC_SIGIL, strokes = S.sigilStrokes(sid); if (!strokes.length || strokes.some(t => t.pts.some(([x, y]) => x < 0 || y < 0 || x > 1 || y > 1)) || !S.sigilSVG(sid).includes("<polyline")) bad.push("the relic sigil"); if (S.SIGIL_IDS.includes(sid)) bad.push(`${sid} clashes with a creature's sigil`); }
  const frames = [0, 1, 2, 3].map(f => P.partyRelicGlint(f)), tops = [0, 1, 2, 3].map(f => P.partyRelicGlint(f, { zoom: "treetop" })), key = g => g.sp.w + ":" + g.sp.m.join("");
  if (new Set(frames.map(key)).size < 4) bad.push("glint frames repeat");
  for (const g of [...frames, ...tops]) if (g.sp.m.some(v => v && v !== M.GLINT)) bad.push("glint not all GLINT");
  if (tops.some((g, i) => g.sp.m.filter(Boolean).length <= frames[i].sp.m.filter(Boolean).length)) bad.push("treetop glint not bigger");
  ok(!bad.length, `party relics: ${P.PARTY_RELIC_IDS.length} giant bottles, half-buried, legend-sized, see-through glass, glowing liquid that lights the ground, motes rising over 3 frames, a glint on each (bigger from the treetops), one sigil for all${bad.length ? " — " + bad.slice(0, 6).join("; ") : ""}`);
}
// the trees and bushes grown from their genomes (art/flora/genomes.js) draw exactly as before: every species over seeds, sizes and
// area options, and the bushes, against art/flora/baseline.json (when a change to them is meant, rewrite it: node art/flora/fingerprint.mjs)
{
  const { fingerprints } = await import("./flora/fingerprint.mjs"), { readFileSync } = await import("node:fs");
  const base = JSON.parse(readFileSync(new URL("./flora/baseline.json", import.meta.url))), now = fingerprints();
  const keys = Object.keys(base), diff = keys.filter(k => base[k] !== now[k]), extra = Object.keys(now).filter(k => !(k in base));
  ok(!diff.length && !extra.length, `flora genomes: ${keys.length - diff.length} of ${keys.length} trees and bushes as the baseline${diff.length ? " — differ: " + diff.slice(0, 8).join(", ") : ""}${extra.length ? " — not in it: " + extra.slice(0, 8).join(", ") : ""}`);
}
// pixel wind (art/sway.js): every species' sway code keeps the trunk's foot still; the genome generator's trees sway by their
// blobs (3+ regions, 3+ phases among them); with no wind a tree draws exactly as baked; in a strong gust every region moves whole,
// by whole pixels (at most 2), and keeps most of itself in view
{
  const T = await import("./trees.js"), W = await import("./sway.js"), { defaultStyle } = await import("./generator.js"), { rng, M } = await import("./core.js");
  const st = defaultStyle(), bad = [], WOODS = new Set([M.TRUNK, M.BARK2, M.BARKD, M.BARKL, M.BELLY]);
  for (const [id, S] of Object.entries(T.TREE_SPECIES)) {
    const t = S.fn(rng(9), { ...st }, st.treeSize), sp = t.sp, code = W.swayCode(sp), reg = W.swayRegions(sp), { w, h } = sp;
    for (let y = h - 3; y < h; y++) for (let x = 0; x < w; x++) if (WOODS.has(sp.m[y * w + x]) && code[y * w + x]) { bad.push(id + " foot sways"); y = h; break; }
    if (sp.blob) { const ph = new Map(); for (let i = 0; i < code.length; i++) if (code[i] && sp.blob[i] && sp.blob[i] < 100) ph.set(sp.blob[i], code[i] >> 5); if (ph.size < 3 || new Set(ph.values()).size < 3) bad.push(`${id} ${ph.size} blob regions, ${new Set(ph.values()).size} phases`); }
    const rgba = new Uint8ClampedArray(w * h * 4); for (let i = 0; i < w * h; i++) if (sp.m[i]) rgba.set([reg[i] & 255, reg[i] >> 8, sp.m[i], 255], i * 4);
    const still = W.windShift(rgba, code, w, h, 0, 0); if (still.some((v, i) => v !== rgba[i])) bad.push(id + " moves with no wind");
    const drawn = sp.m.filter(Boolean).length;
    for (const tt of [0, .7, 1.4, 2.1]) { // the whole tree keeps 90%+ of its pixels; no region of 40+ px is overdrawn by its neighbours past 70%
      const out = W.windShift(rgba, code, w, h, 2.4, tt), seen = new Map(), all = new Map(); let n0 = 0;
      for (let i = 0; i < w * h; i++) { if (code[i]) all.set(reg[i], (all.get(reg[i]) || 0) + 1); if (out[i * 4 + 3]) { n0++; const r2 = out[i * 4] | (out[i * 4 + 1] << 8); seen.set(r2, (seen.get(r2) || 0) + 1); } }
      if (n0 < drawn * .9) { bad.push(`${id} keeps ${(n0 / drawn).toFixed(2)} of its pixels at t ${tt}`); break; }
      const lost = [...all].find(([r2, k]) => k >= 40 && (seen.get(r2) || 0) < k * .3); if (lost) { bad.push(`${id} region ${lost[0]} hidden at t ${tt}`); break; }
    }
  }
  ok(!bad.length, `pixel wind: ${Object.keys(T.TREE_SPECIES).length} species' trees sway by whole regions and whole pixels (at most 2), feet still, blobs out of step, still in calm air, whole in a gust${bad.length ? " — " + bad.slice(0, 6).join("; ") : ""}`);
}
// the witch generator (art/witchGenome.js): her own genome draws her exactly (flight, lean, rise, fast, standing, both facings,
// each heading); 20 generated witches pass their limits, draw in every flight pose and some on foot with their hand and hat-tip
// anchors inside, their hatband glowing, 0.8 to 1.7 times her height hovering, and no two alike
{
  const W = await import("./witch.js"), Gn = await import("./witchGenome.js"), { defaultStyle } = await import("./generator.js"), { M } = await import("./core.js");
  const st = defaultStyle(), bad = [], key = sp => sp.w + "x" + sp.h + ":" + Array.from(sp.m).join("") + ":" + JSON.stringify(sp.anchors || {});
  const ours = Gn.genomeLook(Gn.WITCH_GENOME);
  if (ours.outfit || Gn.witchGenomeProblems(Gn.WITCH_GENOME).length) bad.push("her genome");
  for (const o of [{ frame: 0 }, { frame: 2, facing: "away" }, { pose: "lean", frame: 1 }, { pose: "rise", frame: 0 }, { pose: "fast", frame: 1 }, { pose: "brake", frame: 0, heading: "towards" }, { pose: "stand", frame: 0 }, { pose: "talk", frame: 2, facing: "away" }])
    if (key(W.witchSprite(st, o)) !== key(W.witchSprite(st, { ...o, look: ours.look }))) bad.push("her genome draws " + JSON.stringify(o) + " differently");
  const herH = W.witchSprite(st).h, seen = new Set();
  for (let seed = 0; seed < 20; seed++) {
    const g = Gn.witchGenome(seed), pr = Gn.witchGenomeProblems(g), { look } = Gn.genomeLook(g); if (pr.length) bad.push(`seed ${seed}: ${pr.join(", ")}`);
    for (const o of [{ frame: 0 }, { pose: "lean", frame: 2 }, { pose: "rise", frame: 0 }, { pose: "descend", frame: 1 }, { pose: "brake", frame: 0 }, { pose: "fast", frame: 0 }, { pose: "stand", frame: 1 }, { pose: "takeoff", frame: 0 }, { pose: "twoStep", frame: 2 }]) {
      const sp = W.witchSprite(st, { ...o, look }), n = sp.m.filter(Boolean).length, a = sp.anchors || {}, inside = p => p && p[0] >= 0 && p[1] >= 0 && p[0] < sp.w && p[1] < sp.h;
      if (n < 200 || !inside(a.hand) || !inside(a.hatTip)) bad.push(`seed ${seed} ${o.pose || "hover"}: ${n} px, anchors ${JSON.stringify(a)}`);
      if (!o.pose) { if (g.hat.shape !== "none" && !sp.m.some(v => v === M.MAGIC || v === M.MAGIC2 || v === M.COLLAR)) bad.push(`seed ${seed}: no glowing hatband`); if (sp.h < herH * .7 || sp.h > herH * 1.7) bad.push(`seed ${seed}: ${sp.h} px tall (hers ${herH})`); const k = key(sp); if (seen.has(k)) bad.push(`seed ${seed} looks like another`); seen.add(k); }
    }
  }
  ok(!bad.length, `witch generator: her genome draws her exactly; 20 generated witches within limits, drawn in flight and on foot, anchors inside, hatband glowing, 0.7 to 1.7 times her height (no hat to a wizard's), none alike${bad.length ? " — " + bad.slice(0, 6).join("; ") : ""}`);
  // Ed (138-140): bigger brims, longer cloaks, accessories witchy and modern, and the party witches generated
  const acc = {}, fam = new Set(); let bigBrim = 0, longCloak = 0;
  for (let seed = 0; seed < 60; seed++) { const g = Gn.witchGenome(seed); if (g.hat.brim > 1.5) bigBrim++; if (g.cloakLength > 1.4) longCloak++; for (const [k, v] of Object.entries(g.accessories)) if (v && v !== "none") acc[k] = (acc[k] || 0) + 1; fam.add(g.accessories.familiar); }
  const want = ["familiar", "lantern", "vial", "book", "patches", "bumbag", "wristband", "chunky", "shades", "glowsticks", "phones"], missing = want.filter(k => !acc[k]), famMissing = Gn.WITCH_AXES.familiar.filter(f => !fam.has(f));
  const pbad = [];
  for (let seed = 0; seed < 12; seed++) {
    const pw = W.partyWitch(seed); if (!pw.genome || Gn.witchGenomeProblems(pw.genome).length) pbad.push(`party witch ${seed} not a generated witch`);
    for (const [pose, P] of Object.entries(W.WITCH_FOOT_POSES)) { if (!P.party) continue; for (let frame = 0; frame < P.frames; frame++) { const sp = W.witchSprite(st, { look: pw.look, pose, frame }), a = sp.anchors || {}, inside = q => q && q[0] >= 0 && q[1] >= 0 && q[0] < sp.w && q[1] < sp.h; if (sp.m.filter(Boolean).length < 150 || !inside(a.hand)) pbad.push(`party witch ${seed} ${pose} ${frame}`); } }
  }
  // Ed (round 11): every hat draws on her, flying and on foot, at the slider ends too, with its tip inside the sprite and (but none) something glowing
  for (const hat of Gn.WITCH_AXES.hatShape) for (const ex of [{}, { hatHeight: Gn.WITCH_AXES.hatHeight[1], hatBrim: Gn.WITCH_AXES.hatBrim[1] }, { hatHeight: Gn.WITCH_AXES.hatHeight[0], hatBrim: Gn.WITCH_AXES.hatBrim[0] }]) for (const o of [{ frame: 0 }, { pose: "stand", frame: 0 }, { pose: "lean", frame: 1 }]) {
    const look = { ...Gn.genomeLook(Gn.WITCH_GENOME).look, hat, ...ex, scarf: true, scarfLength: 3, bagSize: Gn.WITCH_AXES.bagSize[1], satchel: true, backpackSize: Gn.WITCH_AXES.backpackSize[1], cloak: "long", cloakLength: Gn.WITCH_AXES.cloakLength[1] };
    const sp = W.witchSprite(st, { ...o, look }), a = sp.anchors || {}, inside = q => q && q[0] >= 0 && q[1] >= 0 && q[0] < sp.w && q[1] < sp.h;
    if (sp.m.filter(Boolean).length < 200 || !inside(a.hatTip) || (hat !== "none" && !sp.m.some(v => v === M.MAGIC || v === M.MAGIC2 || v === M.COLLAR))) pbad.push(`hat ${hat} ${JSON.stringify(ex)} ${o.pose || "hover"}`);
  }
  ok(!missing.length && !famMissing.length && bigBrim >= 12 && longCloak >= 12 && !pbad.length, `witch variety (Ed): over 60 generated witches every accessory shows (${want.join(", ")}) and every familiar (${Gn.WITCH_AXES.familiar.slice(1).join(", ")}); ${bigBrim} brims over 1.5 times hers, ${longCloak} cloaks over 1.4 times; 12 party witches are generated witches, drawn in every party pose with their hand inside; every hat (${Gn.WITCH_AXES.hatShape.length}) draws flying and on foot at the sliders' ends, its tip inside, glowing but none, with the longest scarf, cloak, biggest bag and backpack${missing.length || famMissing.length || pbad.length ? " — " + [...missing.map(k => "no " + k), ...famMissing.map(k => "no " + k), ...pbad.slice(0, 4)].join("; ") : ""}`);
  // Ed (2026-10-06): every broom kind (art/brooms.js) draws in every flight pose and frame, both facings, and on foot (standing, landing,
  // taking off), nothing NaN, her hand and hat tip inside; only her own colours (every material one witchColours paints), something
  // of the broom's own (its body or trim) showing; about her size: hovering 0.85 to 1.6 times as tall as on hers and no more than
  // 2.4 times as wide
  const col = W.witchColours(st), hers = W.witchSprite(st, { frame: 0 }), bbad = [];
  for (const kind of Gn.WITCH_AXES.broom) {
    const look = { ...Gn.genomeLook(Gn.WITCH_GENOME).look, broom: kind }, sprites = [];
    for (const facing of ["towards", "away"]) {
      for (const [pose, P] of Object.entries(W.WITCH_FLIGHT_POSES)) for (let frame = 0; frame < P.frames; frame++) sprites.push([`${pose} ${frame} ${facing}`, W.witchSprite(st, { look, pose: pose === "hover" ? undefined : pose, frame, facing })]);
      for (const pose of ["stand", "land", "takeoff"]) sprites.push([`${pose} ${facing}`, W.witchSprite(st, { look, pose, frame: 1, facing })]);
    }
    for (const [what, sp] of sprites) {
      const a = sp.anchors || {}, inside = q => q && q.every(Number.isFinite) && q[0] >= 0 && q[1] >= 0 && q[0] < sp.w && q[1] < sp.h, mats = new Set(sp.m.filter(Boolean));
      const stray = [...mats].filter(v => v !== M.LINE && !col[v]);
      if (mats.size < 4 || sp.m.filter(Boolean).length < 200 || !inside(a.hand) || !inside(a.hatTip) || stray.length || !(mats.has(M.BROOM) || mats.has(M.STRAW))) bbad.push(`${kind} ${what}${stray.length ? " (material " + stray.join(",") + ")" : ""}`);
    }
    const hov = sprites[0][1], kh = hov.h / hers.h, kw = hov.w / hers.w;
    if (kh < .85 || kh > 1.6 || kw > 2.4) bbad.push(`${kind} ${kh.toFixed(2)}× as tall, ${kw.toFixed(2)}× as wide as hers`);
  }
  ok(!bbad.length, `broom kinds (Ed, 2026-10-06): every one of the ${Gn.WITCH_AXES.broom.length} (${Gn.WITCH_AXES.broom.join(", ")}) draws in every flight pose and frame, both facings, and on foot, her hand and hat tip inside, only her colours, its body or trim showing, about her size${bbad.length ? " — " + bbad.slice(0, 6).join("; ") : ""}`);
}
// area flora (art/flora/areas.js): every wooded area lists 3 to 6 real species, shares adding to 1, its main kind first (as its big
// names it), a palette within reason (sat and val 0.6 to 1.3); the open areas list none; fantasy species are never an area's main kind
{
  const { AREAS } = await import("./areas.js"), { AREA_FLORA, floraSlots } = await import("./flora/areas.js"), { TREE_SPECIES } = await import("./trees.js"), { PLANT_GENOMES } = await import("./flora/genomes.js"), bad = [];
  let wooded = 0;
  for (const A of AREAS) {
    const trees = (A.big || []).filter(([k]) => k === "tree"), F = AREA_FLORA[A.id];
    if (!trees.length) { if (F) bad.push(A.id + " is open but lists flora"); continue; }
    wooded++;
    if (!F) { bad.push(A.id + " lists no flora"); continue; }
    const sp = F.species, sum = sp.reduce((a, [, w]) => a + w, 0), main = trees.find(([, o]) => !o.minor)?.[1].type;
    if (sp.length < 3 || sp.length > 6 || Math.abs(sum - 1) > 1e-6) bad.push(`${A.id} ${sp.length} species, shares ${sum}`);
    if (sp[0][0] !== main) bad.push(`${A.id} main ${sp[0][0]}, its big names ${main}`);
    for (const [id] of sp) if (!TREE_SPECIES[id]) bad.push(`${A.id} names no species ${id}`);
    if (PLANT_GENOMES[sp[0][0]]?.fantasy) bad.push(`${A.id} has a fantasy main kind`);
    const p = F.palette || {}; if (!(p.sat >= .6 && p.sat <= 1.3 && p.val >= .6 && p.val <= 1.3)) bad.push(`${A.id} palette ${JSON.stringify(p)}`);
    const slots = floraSlots(A.id, 10); for (const [id] of sp) if (!slots.some(o => o.type === id)) bad.push(`${A.id} deals no ${id}`);
  }
  ok(!bad.length, `area flora: ${wooded} wooded areas each grow 3 to 6 species in their own palette, main kind first, fantasy only as a minority${bad.length ? " — " + bad.slice(0, 6).join("; ") : ""}`);
}
// The art lint (overnight phase 3), on the sprites as the game bakes them (style.json, the bold style): no anti-aliased pixels
// (alpha only 0, 254 for what glows, or 255); on the pixel grid (whole-pixel sizes and anchors); within its palette (at most
// LINT_TONES colours a material: the bold style's three tones, its outline and a glint, so a gradient or a stray colour
// fails); and a silhouette contact sheet (art/out/silhouettes.png, every species' adult squared to its box), warning of
// look-alikes: overlap at least LINT_LOOKALIKE and about the same proportions.
{
  const LINT_TONES = 5, LINT_LOOKALIKE = .8, SIL = 24;
  await b.page.goto(b.base + "/art/headless-blank.html");
  const r = await b.page.evaluate(async ({ LINT_TONES, SIL }) => {
    const G = await import("/art/generator.js"), { AREAS } = await import("/art/areas.js"), style = await (await fetch("/config/style.json")).json();
    const st = { ...G.defaultStyle(), ...style, artStyle: "bold" }, aa = [], grid = [], pal = [];
    let n = 0;
    const lint = (what, A, w, h, sp) => {
      n++;
      if (![w, h].every(Number.isInteger)) grid.push(`${what} ${w}x${h}`);
      for (const [k, v] of Object.entries(sp?.anchors ?? {})) if (Array.isArray(v) && v.some(x => typeof x === "number" && !Number.isInteger(x))) grid.push(`${what} anchor ${k}`);
      const d = A.getContext("2d").getImageData(0, 0, w, h).data, cols = new Set();
      let odd = 0;
      for (let k = 0; k < d.length; k += 4) { const a = d[k + 3]; if (a && a !== 254 && a !== 255) odd++; if (a) cols.add((d[k] << 16) | (d[k + 1] << 8) | d[k + 2]); }
      if (odd) aa.push(`${what} ${odd} px`);
      if (sp?.m) { const mats = new Set(); for (const m of sp.m) if (m) mats.add(m); if (cols.size > LINT_TONES * mats.size + 2) pal.push(`${what} ${cols.size} colours, ${mats.size} materials`); }
    };
    for (const S of G.SPECIES) for (const level of [0, 1, 2, 3]) for (const [frame, away] of [[0, false], [1, false], [0, true]]) {
      const sp = G.critter(S.id, level, frame, st, away ? "away" : undefined), bk = G.bake(sp, G.speciesColours(S.id, st), st);
      lint(`${S.id} level ${level} frame ${frame}${away ? " away" : ""}`, bk.A, bk.w, bk.h, sp);
    }
    for (const A of AREAS) { const a = G.areaAssets(A.id, st); for (const x of [a.floor, ...a.walls, ...a.small, ...a.big, ...(a.setPiece ? [a.setPiece] : [])]) if (x?.sp?.A) lint(`${A.id} asset`, x.sp.A, x.sp.w, x.sp.h, x.sp); }
    // The silhouettes: each species' adult, its drawn box squared to SIL × SIL.
    const sil = G.SPECIES.map(S => {
      const sp = G.critter(S.id, 2, 0, st);
      let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1;
      for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
      const bw = x1 - x0 + 1, bh = y1 - y0 + 1, m = new Uint8Array(SIL * SIL);
      for (let j = 0; j < SIL; j++) for (let i = 0; i < SIL; i++) m[j * SIL + i] = sp.m[(y0 + Math.floor((j + .5) * bh / SIL)) * sp.w + x0 + Math.floor((i + .5) * bw / SIL)] ? 1 : 0;
      return { id: S.id, m: Array.from(m), aspect: bw / bh };
    });
    return { n, aa, grid, pal, sil };
  }, { LINT_TONES, SIL });
  ok(!r.aa.length, `art lint, anti-aliasing: ${r.n} baked sprites (every species at every level, both frames and turned away; every area type's assets) have no half-transparent pixels${r.aa.length ? " — " + r.aa.slice(0, 6).join("; ") : ""}`);
  ok(!r.grid.length, `art lint, the pixel grid: every sprite's size and anchors are whole pixels${r.grid.length ? " — " + r.grid.slice(0, 6).join("; ") : ""}`);
  ok(!r.pal.length, `art lint, palette: no sprite has more than ${LINT_TONES} colours a material (+2)${r.pal.length ? " — " + r.pal.slice(0, 6).join("; ") : ""}`);
  const alike = [];
  for (let a = 0; a < r.sil.length; a++) for (let c = a + 1; c < r.sil.length; c++) {
    const A = r.sil[a], B = r.sil[c]; let i = 0, u = 0;
    for (let k = 0; k < A.m.length; k++) { i += A.m[k] & B.m[k]; u += A.m[k] | B.m[k]; }
    if (i / u >= LINT_LOOKALIKE && Math.min(A.aspect, B.aspect) / Math.max(A.aspect, B.aspect) >= .85) alike.push(`${A.id} ~ ${B.id} (${(i / u).toFixed(2)})`);
  }
  // The contact sheet, the look-alikes framed in red.
  const { mkdirSync, writeFileSync } = await import("node:fs"), cols = 8, cell = SIL * 3 + 8, sheet = await b.page.evaluate(({ sil, alike, cols, cell, SIL }) => {
    const rows = Math.ceil(sil.length / cols), c = document.createElement("canvas"); c.width = cols * cell; c.height = rows * (cell + 10);
    const g = c.getContext("2d"), flagged = new Set(alike.flatMap(s => s.split(" (")[0].split(" ~ ")));
    g.fillStyle = "#1b1726"; g.fillRect(0, 0, c.width, c.height); g.font = "9px monospace";
    sil.forEach((s, k) => {
      const ox = (k % cols) * cell + 4, oy = Math.floor(k / cols) * (cell + 10) + 4;
      g.fillStyle = "#e8e0ff"; for (let j = 0; j < SIL; j++) for (let i = 0; i < SIL; i++) if (s.m[j * SIL + i]) g.fillRect(ox + i * 3, oy + j * 3, 3, 3);
      if (flagged.has(s.id)) { g.strokeStyle = "#ff4040"; g.strokeRect(ox - 2, oy - 2, SIL * 3 + 4, SIL * 3 + 4); }
      g.fillStyle = "#a89cc0"; g.fillText(s.id, ox, oy + SIL * 3 + 10);
    });
    return c.toDataURL("image/png").split(",")[1];
  }, { sil: r.sil, alike, cols, cell, SIL });
  mkdirSync(new URL("./out/", import.meta.url), { recursive: true });
  writeFileSync(new URL("./out/silhouettes.png", import.meta.url), Buffer.from(sheet, "base64"));
  console.log(`${alike.length ? "WARN" : "ok  "} art lint, silhouettes: ${r.sil.length} adults on art/out/silhouettes.png${alike.length ? "; look alike: " + alike.join(", ") : ", none alike"}`);
}
await b.close();
console.log(failed ? `${failed} check(s) failed` : "all checks passed");
process.exit(failed ? 1 : 0);
