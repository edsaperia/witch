// Witch creature parts (#79, stage 4): a creature baked as pieces rather than whole frames, so a
// live rig (src/render/rig/) can put it together each frame from how it moves. Its torso, head and
// tail (four-legged) or head (serpent) are baked at five headings, the other three drawn mirrored;
// its legs and a serpent's body are chains of discs, baked once per radius, that the rig strings
// between its joints. Each piece keeps its pivot: the pixel where the joint it hangs from lands.
// Headings: 0 walking right, a quarter turn walking down the screen (towards us), minus a quarter up
// it (away); RIG_HEADINGS are the baked ones, and heading h > a quarter turn is the mirror of pi - h.
import { M, Sprite } from "../core.js";
import { Model, render, spotty, PITCH } from "../model3d.js";
import { withForm, withGear } from "../creatures3d.js";
import { EXPRESSIONS } from "./expressions.js";
import { SPECIES_BY_ID, buildCreature } from "../creatures.js";

export const RIG_HEADINGS = [-Math.PI / 2, -Math.PI / 4, 0, Math.PI / 4, Math.PI / 2];
export const RIG_TEMPLATES = { quadruped: "quad", serpent: "snake" }; // the templates the pilot rigs (and their builder)

// The heading (radians, any) as a baked heading's index and whether to mirror it.
export function rigDirection(h) {
  let a = Math.atan2(Math.sin(h), Math.cos(h)), flip = false; // -pi..pi
  if (Math.abs(a) > Math.PI / 2) { a = Math.sign(a) * Math.PI - a; flip = true; } // the left half: the right half mirrored
  const i = Math.round((a + Math.PI / 2) / (Math.PI / 4));
  return { i: Math.max(0, Math.min(4, i)), flip };
}
// Where a model-space point lands on the screen for a heading, in pixels at scale s (x right, y up).
export function rigProject(p, h, s) {
  const c = Math.cos(h), sn = Math.sin(h), wx = p[0] * c - p[2] * sn, wy = p[1], wz = p[0] * sn + p[2] * c;
  return [wx * s, (wy * Math.cos(PITCH) - wz * Math.sin(PITCH)) * s];
}

// The model the builder makes for a species at a level (not drawn), and the scale it would be drawn at.
// face: an expression (genome/expressions.js), put on its face at that scale.
function rigCapture(id, level, st, face = null) {
  const S = SPECIES_BY_ID[id]; let got = null;
  const form = (m, o) => { got = { m, height: o.height }; return new Sprite(1, 1); };
  form.motes = false;
  withGear(face ? { face, faceStyle: S.face } : null, () => withForm(form, () => buildCreature(S, level, 0, st, "towards")));
  const s = render(got.m, { height: got.height, measure: true }).s, f = got.m.atScale;
  if (f) { got.m.atScale = null; f(s); }
  return { m: got.m, s };
}
// Its head piece in each expression but neutral (the head piece itself): { angry, happy, dazed }.
function rigFaces(id, level, st, pivot, s) {
  const out = {};
  for (const face of EXPRESSIONS) if (face !== "neutral") out[face] = rigPiece(rigCapture(id, level, st, face).m, ["head"], pivot, s);
  return out;
}
// A model of only the primitives labelled with one of `labels`.
function rigPick(m, labels) {
  const out = new Model({ blend: m.blend });
  out.parts = m.parts.filter(q => labels.includes(q.part)); out.flats = m.flats.filter(f => labels.includes(f.part));
  return out;
}
// Cropped to what's drawn, its pivot moved with it: { sp, px, py } (py from the top).
function rigCropped(sp, px, py) {
  let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1;
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  if (x1 < 0) return null;
  x0--; y0--; x1++; y1++; // a pixel's margin all round, for the outline
  const W = x1 - x0 + 1, H = y1 - y0 + 1, c = new Sprite(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const X = x + x0, Y = y + y0; if (X < 0 || Y < 0 || X >= sp.w || Y >= sp.h) continue; const i = Y * sp.w + X, j = y * W + x; c.m[j] = sp.m[i]; c.g[j] = sp.g[i]; for (let k = 0; k < 3; k++) c.n[j * 3 + k] = sp.n[i * 3 + k]; }
  return { sp: c, px: +(px - x0).toFixed(2), py: +(py - y0).toFixed(2) };
}
// One labelled piece at each baked heading, pivoted on `pivot` (a model-space point).
function rigPiece(m, labels, pivot, s) {
  const sub = rigPick(m, labels);
  if (!sub.parts.length && !sub.flats.length) return null;
  return RIG_HEADINGS.map(h => { const r = render(sub, { scale: s, yaw: h }), [px, py] = r.project(pivot); return rigCropped(r.sp, px, py); });
}
// A disc: a ball of a material, r pixels across its radius, lit as a sphere (legs, a serpent's body).
function rigDisc(r, mat, s, paint) {
  const m = new Model(); m.ell([0, 0, 0], [r / s, r / s, r / s], mat, { paint });
  const res = render(m, { scale: s }), [px, py] = res.project([0, 0, 0]);
  return rigCropped(res.sp, px, py);
}

// Everything the rig needs for one species at one level: { template, s (pixels per model unit),
// pieces: { torso, head, tail: [per heading] }, faces: { angry, happy, dazed: its head piece in each }, discs: { material: [by radius in pixels] }, joints }.
// joints are in model units: legs [{ name, fore, side, hip, knee, foot, r: [hip, knee, foot] }],
// head { nb, H }, tail (its base) for the four-legged; spine [[x, y, z, r]...] and head for a serpent.
export function rigParts(id, level, st) {
  const S = SPECIES_BY_ID[id], tpl = S.q ? "quadruped" : S.plan === "snake" ? "serpent" : null;
  if (!tpl) return null;
  const { m, s } = rigCapture(id, level, st), R = m.rig, discs = {};
  const radii = list => [...new Set(list.map(r => Math.max(1, Math.round(r * s))))].sort((a, b) => a - b);
  const discSet = (mat, rs, paint) => { discs[mat] = discs[mat] || {}; for (const r of rs) if (!discs[mat][r]) discs[mat][r] = rigDisc(r, mat, s, paint); };
  if (tpl === "quadruped") {
    const legR = radii(R.legs.flatMap(l => [l.r[0] * .8, l.r[1], l.r[2], (l.r[0] + l.r[1]) / 2, (l.r[1] + l.r[2]) / 2]));
    for (const l of R.legs) discSet(l.mat, legR);
    const hoof = R.legs.find(l => l.hoof); if (hoof) discSet(M.NOSE, radii(R.legs.map(l => l.fl * .9)));
    else discSet(R.legs[0].mat, radii(R.legs.map(l => l.fl * .9)));
    return { id, level, template: tpl, s, joints: { legs: R.legs, head: R.head, tail: R.tail, top: R.top, len: R.len, bw: R.bw }, discs, pieces: { torso: rigPiece(m, ["body"], [0, 0, 0], s), head: rigPiece(m, ["head"], R.head.nb, s), tail: rigPiece(m, ["tail"], R.tail, s) }, faces: rigFaces(id, level, st, R.head.nb, s) };
  }
  // a serpent: its head baked, its body discs (speckled like its coat) by the spine's radii
  discSet(M.BODY, radii(R.spine.map(p => p[3])), p => spotty([p[0] * 1.5, p[1], p[2]], 14, .3) ? M.BODY3 : undefined);
  return { id, level, template: tpl, s, joints: { spine: R.spine, head: R.head, hr: R.hr }, discs, pieces: { head: rigPiece(m, ["head"], R.head, s), wings: rigPiece(m, ["body"].filter(() => m.parts.some(q => q.part === "body" && q.extra)), [0, .2, 0], s) }, faces: rigFaces(id, level, st, R.head, s) };
}
