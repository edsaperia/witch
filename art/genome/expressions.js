// Witch creature expressions (Ed, 2026-10-05: "the eyebrows should be with the creature generator"):
// a creature's face as part of its model, not marks drawn over it. Four expressions, every species
// at every level:
//   neutral: as it is (nothing added; the sprite is the plain one, pixel for pixel);
//   angry:   brows down to the middle over narrowed eyes (with the woken look's red eyes, enraged);
//   happy:   eyes closed up into smiling arcs, brows lifted;
//   dazed:   crossed-out or odd eyes, brows up in a worried tilt;
//   asleep:  eyes shut in heavy downturned lids, brows low and slack (a sleeping legend, on the rig).
// The shapes vary by family: each template has a face style (templates.js: brow, happy, dazed) a
// species' genome can override (its `face`). Everything is built from the anchors every builder
// records (the head and the eyes), so a new species gets its expressions for nothing.
import { M } from "../core.js";
import { v3 } from "../model3d.js";

export const EXPRESSIONS = ["neutral", "angry", "happy", "dazed", "asleep"];
// brow: a thick straight bar; a feather tuft, thin at the middle and flaring out; a wide arched
// ridge (a snake's or a beetle's brow scales). happy: smiling arcs ("arc") or squeezed shut ("squint").
// dazed: crossed out ("x") or one eye big and one small ("wobble").
export const FACE_KINDS = { brow: ["bar", "tuft", "ridge"], happy: ["arc", "squint"], dazed: ["x", "wobble"] };
export const FACE_DEFAULT = { brow: "bar", happy: "arc", dazed: "x" };

const faceEyeMats = new Set([M.EYE, M.IRIS, M.PUPIL, M.GLINT, M.MAGIC2]);
const faceUnit = v => { const l = Math.hypot(...v) || 1; return v.map(x => x / l); };

// Out of the head along dir until the point is no deeper than `keep` inside the model.
function faceSurface(m, p, dir, keep) {
  for (let i = 0; i < 80 && m.field(p) < -keep; i++) p = v3.add(p, v3.mul(dir, keep * .25 + .002));
  return p;
}

// Add an expression's face to a finished model (its anchors set), before it's drawn. style: the
// species' face style ({ brow, happy, dazed }). The strokes are sized in pixels as well as by the
// eyes (render calls back with its scale), so a beetle's face reads as well as an elk's.
export function faceUp(m, face, style = FACE_DEFAULT) {
  const A = m.anchors, head = A.head, eyes = A.eyes;
  if (!face || face === "neutral" || !head || !eyes || eyes.pts.length < 1) return;
  m.atScale = P => faceDraw(m, face, { ...FACE_DEFAULT, ...style }, 1 / P);
}

function faceDraw(m, face, st, u) { // u: one pixel, in model units
  const A = m.anchors, head = A.head, eyes = A.eyes, E = Math.max(eyes.size, u * 1.6); // the eye's radius, never under a pixel and a half
  const mid = eyes.pts.reduce((a, e) => v3.add(a, v3.mul(e, 1 / eyes.pts.length)), [0, 0, 0]);
  const fwd = faceUnit(v3.sub(mid, head.c)), up = faceUnit(v3.sub([0, 1, 0], v3.mul(fwd, v3.dot([0, 1, 0], fwd) * .6)));
  // the eyes' own parts: the ellipsoids sitting on each anchor
  const near = (q, e) => q.type === "ell" && faceEyeMats.has(q.mat) && Math.hypot(...v3.sub(q.c, e)) < Math.max(eyes.size * 1.6, u);
  const eyeMat = e => m.parts.find(q => near(q, e) && (q.mat === M.EYE || q.mat === M.MAGIC2))?.mat ?? M.EYE;
  const drop = e => { m.parts = m.parts.filter(q => !near(q, e)); };
  const o = { group: 63, extra: true, part: "head" }, line = Math.max(E * .3, u * .6); // a stroke: a pixel wide at least
  const across = e => eyes.pts.length > 1 ? faceUnit(v3.sub(e, mid)) : faceUnit(v3.cross(fwd, up)); // out to the side, away from the middle
  for (const e of eyes.pts) {
    const out = faceUnit(v3.sub(e, head.c)), a = across(e), mat = eyeMat(e);
    const at = (x, y, keep = line * .5) => faceSurface(m, v3.add(v3.add(e, v3.mul(a, x * E)), v3.mul(up, y * E)), out, keep);
    // ---- the eyes ----
    if (face === "angry") for (const q of m.parts) if (near(q, e)) q.r = [q.r[0], q.r[1] * .62, q.r[2]]; // narrowed
    if (face === "happy") {
      drop(e);
      if (st.happy === "squint") m.seg(at(-1, .25), at(1, -.25), line, line, mat, o); // squeezed shut
      else m.chain([[...at(-1.1, -.45), line], [...at(0, .45), line], [...at(1.1, -.45), line]], mat, o); // an upturned arc
    }
    if (face === "asleep") { drop(e); m.chain([[...at(-1.1, .1), line], [...at(0, -.35), line], [...at(1.1, .1), line]], mat, o); } // shut: a heavy lid, sagging
    if (face === "dazed") {
      if (st.dazed === "wobble") { const k = e === eyes.pts[0] ? 1.5 : .65; for (const q of m.parts) if (near(q, e)) q.r = q.r.map(v => v * k); }
      else { drop(e); m.seg(at(-.9, .9), at(.9, -.9), line, line, mat, o); m.seg(at(-.9, -.9), at(.9, .9), line, line, mat, o); } // crossed out
    }
    // ---- the brows: down to the middle when angry, up in the middle when dazed, lifted when happy ----
    // (sunk in to most of their thickness, so the far eye's brow never pokes out past the head's outline)
    const lift = st.brow === "ridge" ? .65 : 1; // (a ridge hugs the eye, as a snake's brow scales do)
    const [inY, outY] = (face === "angry" ? [.75, 1.85] : face === "dazed" ? [2, 1.2] : face === "asleep" ? [1.2, 1.05] : [1.75, 1.75]).map(y => y * lift);
    const w = st.brow === "ridge" ? 1.5 : 1.2, bm = M.BROW, b = Math.max(line, E * .36), bt = (x, y, r) => [...at(x, y, r * .75), r];
    if (st.brow === "ridge") m.chain([bt(-w, inY, b), bt(0, (inY + outY) / 2 + .2, b * 1.15), bt(w, outY, b)], bm, o);
    else if (st.brow === "tuft") m.chain([bt(-w * .8, inY, line), bt(w * 1.2, outY + .4, b * 1.4)], bm, o);
    else m.chain([bt(-w, inY, b), bt(w, outY, b)], bm, o);
  }
}

// What's wrong with a face style, if anything.
export function faceProblems(id, style) {
  const out = [];
  for (const [k, v] of Object.entries(style || {})) if (!FACE_KINDS[k]) out.push(`${id}: no face part ${k}`); else if (!FACE_KINDS[k].includes(v)) out.push(`${id}: face ${k} ${v} isn't one of ${FACE_KINDS[k].join(", ")}`);
  return out;
}
