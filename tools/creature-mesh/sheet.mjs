// One picture of a batch of mesh creatures, to judge them by (docs/plans/creature-mesh-rollout.md, step 0; the how-to is in
// docs/notes/creatures.md, **Writing a mesh creature**). For each kind, a band:
//   - its four sizes, baby to legend, each beside today's drawing of it (the generated creature, meshes off) at the same scale,
//     standing on one ground line (Ed, 2026-11-12: "keep the sizes");
//   - its legend turned away, where its armour shows (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso
//     with a different colour and glowing runes");
//   - its adult and its legend asleep (Ed, 2026-11-12: "Most sleeping legends should curl up on their sides");
//   - its adult's walk, every frame of the cycle and then it standing still, on a ground line, with its gait and how long its
//     stride is (Ed's playtest, 2026-11-12: "they appear to vibrate along instead of walk"; "many small creatures bound rather
//     than trot").
// Pure Node: the game's own code draws everything (art/mesh/index.js, art/generator.js), no browser.
//   node tools/creature-mesh/sheet.mjs fox stoat hare            -> previews/creature-mesh/sheet-fox-stoat-hare.png
//   node tools/creature-mesh/sheet.mjs wolf lynx --out previews/creature-mesh/batch-a.png
//     --level adult|baby|young|legend  which level's walk is shown (adult)
//     --no-old                          leave out today's drawings (a kind with no generated creature)
// Then publish it with tools/shots/push.mjs, as ever. It also prints each kind's gait, stride and heights.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { encodePng } from "../shots/pixels.mjs";
import { MESH_HEIGHTS, MESH_CYCLE, MESH_STAND, meshFacts, meshNap, meshWalk } from "../../art/mesh/index.js";
import { critter, defaultStyle, speciesColours } from "../../art/generator.js";
import { drawnHeight } from "./sizes.mjs";

const here = path.dirname(fileURLToPath(import.meta.url)), root = path.resolve(here, "../..");
const args = process.argv.slice(2), flag = name => { const i = args.indexOf(name); if (i < 0) return undefined; const v = args[i + 1]; args.splice(i, 2); return v; };
const out0 = flag("--out"), levelName = flag("--level") ?? "adult", noOld = args.includes("--no-old"), kinds = args.filter(a => !a.startsWith("--"));
const LEVELS = ["baby", "young", "adult", "legend"], walkLevel = LEVELS.indexOf(levelName);
if (!kinds.length || walkLevel < 0) { console.error("usage: node tools/creature-mesh/sheet.mjs <kind>... [--out file.png] [--level adult] [--no-old]"); process.exit(2); }
for (const k of kinds) if (!MESH_HEIGHTS[k]) { console.error(`${k} has no mesh (art/mesh/species/${k}.js)`); process.exit(2); }

// --- a picture to draw on: RGBA, with sprites lit simply from their normals, lines and small letters
const BG = [34, 38, 48], GROUND = [92, 104, 86], INK = [226, 226, 214], DIM = [138, 146, 160];
class Sheet {
  constructor(w, h) { this.w = w; this.h = h; this.d = new Uint8ClampedArray(w * h * 4); for (let i = 0; i < w * h; i++) this.d.set([...BG, 255], i * 4); }
  dot(x, y, c) { if (x < 0 || y < 0 || x >= this.w || y >= this.h) return; this.d.set([...c, 255], ((y | 0) * this.w + (x | 0)) * 4); }
  line(x0, x1, y, c) { for (let x = x0; x < x1; x++) this.dot(x, y, c); }
  /** A mesh frame (art/mesh/raster.js: colour and the camera's normals), its bottom row on `ground`, lit from up and to the left. */
  frame(f, w, h, x, ground, k = 1) {
    for (let y = 0; y < h; y++) for (let u = 0; u < w; u++) { const q = (y * w + u) * 4, a = f.albedo[q + 3]; if (!a) continue;
      const nx = (f.normal[q] - 128) / 127, ny = (f.normal[q + 1] - 128) / 127, nz = f.normal[q + 2] / 255, lit = a === 254 ? 1 : 0.5 + 0.5 * Math.max(0, -nx * 0.35 - ny * 0.6 + nz * 0.72);
      for (let v = 0; v < k; v++) for (let t = 0; t < k; t++) this.dot(x + u * k + t, ground - (h - y) * k + v, [f.albedo[q] * lit, f.albedo[q + 1] * lit, f.albedo[q + 2] * lit]); }
  }
  /** A generated creature's sprite (materials a pixel) in its colours, its lowest pixel on `ground`. */
  sprite(sp, colours, x, ground) {
    let bottom = 0; for (let i = 0; i < sp.m.length; i++) if (sp.m[i]) bottom = Math.floor(i / sp.w);
    for (let y = 0; y <= bottom; y++) for (let u = 0; u < sp.w; u++) { const m = sp.m[y * sp.w + u]; if (m) this.dot(x + u, ground - (bottom - y) - 1, colours[m] ?? [255, 0, 255]); }
  }
  text(s, x, y, c = INK, k = 1) { let at = x; for (const ch of String(s).toUpperCase()) { const g = FONT[ch]; if (g) for (let r = 0; r < 5; r++) for (let q = 0; q < 3; q++) if (g[r] & (4 >> q)) for (let v = 0; v < k; v++) for (let t = 0; t < k; t++) this.dot(at + q * k + t, y + r * k + v, c); at += 4 * k; } return at; }
  png() { return encodePng({ width: this.w, height: this.h, data: Buffer.from(this.d.buffer) }); }
}
// (letters three by five, a row a number: bit 4 is the left column)
const FONT = Object.fromEntries(Object.entries({ A: "25755", B: "65656", C: "34443", D: "65556", E: "74647", F: "74644", G: "34553", H: "55755", I: "72227", J: "11152", K: "55655", L: "44447", M: "57555", N: "57755", O: "25552", P: "65644", Q: "25563", R: "65655", S: "34216", T: "72222", U: "55557", V: "55552", W: "55575", X: "55255", Y: "55222", Z: "71247",
  0: "75557", 1: "26227", 2: "71747", 3: "71717", 4: "55711", 5: "74717", 6: "74757", 7: "71111", 8: "75757", 9: "75717", ".": "00002", ",": "00024", ":": "02020", "-": "00700", "/": "11244", "(": "24442", ")": "21112", "%": "51245", "=": "07070", "+": "02720", "'": "22000" }).map(([ch, rows]) => [ch, [...rows].map(Number)]));

// --- what to draw
const st = { ...defaultStyle(), meshCreatures: 0 }, GAP = 14, PAD = 12, LABEL = 2;
const bands = [];
for (const kind of kinds) {
  const t0 = Date.now(), walks = [0, 1, 2, 3].map(l => meshWalk(kind, l)), naps = [2, 3].map(l => meshNap(kind, l)), facts = [0, 1, 2, 3].map(l => meshFacts(kind, l));
  const old = noOld ? null : [0, 1, 2, 3].map(l => { try { return critter(kind, l, 0, st, "towards"); } catch { return null; } }), cols = noOld ? null : [0, 1, 2, 3].map(l => speciesColours(kind, st, null, l));
  const tall = Math.max(...walks.map(w => w.h), ...naps.map(n => n.h), ...(old ?? []).map(o => o?.h ?? 0)), W = walks[walkLevel], F = facts[walkLevel];
  const cycle = Math.round(F.step * W.w * MESH_CYCLE);
  bands.push({ kind, walks, naps, old, cols, tall, W, F, cycle });
  const drawn = old ? old.map(o => (o ? drawnHeight(o) : "-")) : [];
  console.log(`${kind}: ${F.type}; ${levelName} stride ${F.stride.toFixed(2)} m = ${(F.stride / F.body).toFixed(2)} of its body, ${cycle} art px a cycle of ${MESH_CYCLE} frames; mesh heights ${MESH_HEIGHTS[kind].join(", ")}${old ? `; today's drawn heights ${drawn.join(", ")}` : ""} (${((Date.now() - t0) / 1000).toFixed(1)} s)`);
}
const rowW = b => PAD + b.walks.reduce((s, w, l) => s + w.w + GAP + (b.old?.[l] ? b.old[l].w + GAP : 0), 0) + b.walks[3].w + GAP * 2 + b.naps.reduce((s, n) => s + n.w + GAP, 0);
const stripW = b => PAD + (MESH_CYCLE + 1) * (b.W.w + 6);
const width = Math.max(640, ...bands.map(b => Math.max(rowW(b), stripW(b)) + PAD)), height = bands.reduce((s, b) => s + 16 + b.tall + 2 + 16 + b.W.h + 2 + 22, PAD);
const sheet = new Sheet(width, height);
let y = PAD;
for (const b of bands) {
  sheet.text(`${b.kind}   ${b.F.type}   stride ${(b.F.stride / b.F.body).toFixed(2)} of its body, ${b.cycle} px a cycle   heights ${MESH_HEIGHTS[b.kind].join(" ")}`, PAD, y, INK, LABEL); y += 16;
  const ground = y + b.tall + 2; let x = PAD;
  sheet.line(PAD / 2, width - PAD / 2, ground, GROUND);
  for (let l = 0; l < 4; l++) {
    if (b.old?.[l]) { sheet.sprite(b.old[l], b.cols[l], x, ground); sheet.text("today", x, ground + 4, DIM); x += b.old[l].w + GAP; }
    const w = b.walks[l]; sheet.frame(w.towards[MESH_STAND], w.w, w.h, x, ground); sheet.text(LEVELS[l], x, ground + 4, INK); x += w.w + GAP;
  }
  x += GAP; { const w = b.walks[3]; sheet.frame(w.away[MESH_STAND], w.w, w.h, x, ground); sheet.text("legend, away: its armour", x, ground + 4, INK); x += w.w + GAP; }
  b.naps.forEach((n, i) => { sheet.frame(n.towards[0], n.w, n.h, x, ground); sheet.text(`${LEVELS[i + 2]} asleep`, x, ground + 4, INK); x += n.w + GAP; });
  y = ground + 16;
  // its walk: each frame of the cycle, then standing
  const W = b.W, g2 = y + W.h + 2; sheet.line(PAD / 2, width - PAD / 2, g2, GROUND); x = PAD;
  for (let i = 0; i <= MESH_CYCLE; i++) { sheet.frame(W.towards[i], W.w, W.h, x, g2); sheet.text(i < MESH_CYCLE ? String(i) : "still", x, g2 + 4, i < MESH_CYCLE ? INK : DIM); x += W.w + 6; }
  y = g2 + 22;
}
const out = path.resolve(root, out0 ?? `previews/creature-mesh/sheet-${kinds.join("-")}.png`);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, sheet.png());
console.log(`${path.relative(root, out)}: ${width} x ${height}`);
