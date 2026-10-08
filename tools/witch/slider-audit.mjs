// The character creator's sliders, option by option (Ed, 2026-10-06: "do a pass of the character creation panel to make sure
// that all the sliders do something for all of the options"): every slider (art/witchGenome.js WITCH_AXES, numbers) drawn at
// its min and its max on our witch with each option it applies to (every hat with the hat's sliders, every broom with the
// broom's, every cloak with its length; the scarf, satchel and backpack with theirs), in four poses (hovering towards and
// away, leaning, standing); a pair whose every pose draws the same is dead. The pairs art/witchGenome.js WITCH_INERT names (no
// hat's height, a canoe's bend...) the creator greys out: those are to draw the same, and a live one that does is the table gone
// stale. (The scarf's and the satchel's sliders put them on, so they're drawn on.) Prints the table and writes a contact sheet
// of min against max for each, the dead ones ringed red, the greyed-out ones dimmed, and a JSON of the results.
//   node tools/witch/slider-audit.mjs [out dir] [--only hatHeight,...]
// Exits 1 if any slider the creator offers is dead, or any it greys out isn't.
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
const args = process.argv.slice(2), oi = args.indexOf("--only"), only = oi >= 0 ? (args[oi + 1] ?? "").split(",").filter(Boolean) : [];
const out = args.find((a, i) => !a.startsWith("--") && i !== oi + 1) ?? "previews/creator-sliders";
mkdirSync(out, { recursive: true });
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const res = await b.page.evaluate(async only => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), A = G.WITCH_AXES, base = G.genomeLook(G.WITCH_GENOME).look, col = G.witchColours(st, G.DEFAULT_OUTFIT);
  // Each slider, the look field it sets, and the options it's to work for (with the look those need).
  const cases = [];
  const add = (slider, field, option, look) => { if (!only.length || only.includes(slider)) cases.push({ slider, field, option, look }); };
  for (const hat of A.hatShape) for (const [s, f] of [["hatHeight", "hatHeight"], ["hatBrim", "hatBrim"], ["hatTilt", "hatTilt"], ["hatBand", "hatBand"]]) add(s, f, `hat ${hat}`, { hat });
  for (const kind of A.broom) for (const [s, f] of [["broomLength", "broomLength"], ["broomBend", "broomBend"], ["bristles", "bristles"], ...(A.broomThickness ? [["broomThickness", "broomThickness"]] : [])]) add(s, f, `broom ${kind}`, { broom: kind });
  for (const cloak of A.cloak) add("cloakLength", "cloakLength", `cloak ${cloak}`, { cloak });
  add("scarfLength", "scarfLength", "scarf", { scarf: true }); add("bagSize", "bagSize", "satchel", { satchel: true });
  add("backpackSize", "backpackSize", "backpack", {});
  const POSES = [{ frame: 0 }, { frame: 0, facing: "away" }, { pose: "lean", frame: 1 }, { pose: "stand", frame: 0 }];
  const draw = look => POSES.map(o => G.bake(G.witchSprite(st, { ...o, look }), col, st, st.cOutline));
  const pix = sp => { const c = sp.A, g = c.getContext("2d"); return { w: c.width, h: c.height, d: g.getImageData(0, 0, c.width, c.height).data }; };
  const same = (p, q) => { if (p.w !== q.w || p.h !== q.h) return false; for (let i = 0; i < p.d.length; i++) if (p.d[i] !== q.d[i]) return false; return true; };
  const rows = [], thumbs = [];
  for (const c of cases) {
    const [lo, hi] = A[c.slider], a = draw({ ...base, ...c.look, [c.field]: lo }), z = draw({ ...base, ...c.look, [c.field]: hi });
    const diff = a.map((s, i) => !same(pix(s), pix(z[i])));
    const greyed = !G.sliderApplies(c.slider, { ...base, ...c.look }), alike = !diff.some(Boolean);
    rows.push({ slider: c.slider, option: c.option, min: lo, max: hi, poses: diff.map(Boolean), greyed, dead: !greyed && alike, stale: greyed && !alike });
    thumbs.push({ a: a[0], z: z[0], a2: a[3], z2: z[3] });
  }
  // The contact sheet: each case, min | max (hovering), min | max (standing), labelled.
  const per = 6, cellW = 330, cellH = 190, W = per * cellW, H = Math.ceil(rows.length / per) * cellH;
  const cv = document.createElement("canvas"); cv.width = W; cv.height = H; const g = cv.getContext("2d"); g.imageSmoothingEnabled = false; g.fillStyle = "#24304a"; g.fillRect(0, 0, W, H);
  rows.forEach((r, i) => {
    const x0 = (i % per) * cellW, y0 = Math.floor(i / per) * cellH, t = thumbs[i];
    if (r.dead || r.stale) { g.strokeStyle = "#ff3040"; g.lineWidth = 3; g.strokeRect(x0 + 2, y0 + 2, cellW - 4, cellH - 4); }
    g.globalAlpha = r.greyed && !r.stale ? .4 : 1;
    g.fillStyle = r.dead || r.stale ? "#ff8090" : "#f4ecd8"; g.font = "13px monospace"; g.fillText(`${r.slider} · ${r.option}${r.dead ? " · DEAD" : r.stale ? " · GREYED BUT LIVE" : r.greyed ? " · greyed out" : ""}`, x0 + 8, y0 + 16);
    let x = x0 + 8; for (const s of [t.a, t.z, t.a2, t.z2]) { const k = Math.min(1.5, 75 / s.w, 150 / s.h); g.drawImage(s.A, x, y0 + 26, s.w * k, s.h * k); x += 80; }
    g.fillStyle = "#9aa"; g.font = "11px monospace"; g.fillText("min   max   min   max (standing)", x0 + 8, y0 + cellH - 8); g.globalAlpha = 1;
  });
  return { rows, png: cv.toDataURL() };
}, only.join(","));
await b.close();
writeFileSync(path.join(out, "sliders.json"), JSON.stringify(res.rows, null, 1));
writeFileSync(path.join(out, "sliders.png"), Buffer.from(res.png.split(",")[1], "base64"));
const dead = res.rows.filter(r => r.dead), stale = res.rows.filter(r => r.stale), greyed = res.rows.filter(r => r.greyed && !r.stale);
const list = (rows, head) => { const by = {}; for (const r of rows) (by[r.slider] ??= []).push(r.option); console.log(head); for (const [s, o] of Object.entries(by)) console.log(`  ${s}: ${o.join(", ")}`); };
console.log(`${res.rows.length} slider × option pairs: ${res.rows.length - dead.length - stale.length - greyed.length} live, ${greyed.length} greyed out, ${dead.length} dead, ${stale.length} greyed out but live`);
if (greyed.length) list(greyed, "greyed out (WITCH_INERT), drawing nothing as they should:");
if (dead.length) list(dead, "DEAD (offered, but min and max draw the same):");
if (stale.length) list(stale, "GREYED OUT BUT LIVE (take them out of WITCH_INERT):");
console.log(path.join(out, "sliders.png"));
process.exit(dead.length || stale.length ? 1 : 0);
