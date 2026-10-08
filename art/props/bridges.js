// Bridges from genomes (the coordinator's overnight list for the prop generator, #119: "signposts, bridges"): the path network's
// crossings (art/paths.js footbridge, rope-bridge and root-bridge, where a path crosses a stream) as seeded variants, so the
// crossings along a stream differ instead of repeating one sprite. Built like the path pieces (model units, spanning along x, a
// stream's water under the middle), drawn in the path pieces' colours (pathColours), so a variant changes shape only. Under
// ?props=gen (style.propGen) the art build bakes BRIDGE_VARIANTS of each as "<id>~<k>", and the view picks one by the crossing's place.
//   footbridge:  planks over a low arch on two stringers, rails on both sides, one or none (rails, posts only, or X-braced),
//                a plank or two missing, moss on the old ones
//   rope-bridge: planks hung between two pairs of posts, sagging, handropes (one pair or two), a few planks gone
//   root-bridge: gnarled roots arching over the stream, twisted together, mossed, ferns at its ends, a crown at one end or both
// And the fingerposts where a footpath comes into an area's clearing (rules/paths.ts, under ?props=gen: paths.fingerposts):
//   fingerpost:  an old wooden post, 1 to 4 blank arms pointing different ways (pointed, swallowtailed or square-ended; no words),
//                a cap, a ball or a plain top, leaning a little, an arm sometimes snapped or hanging, moss up its foot, ivy now and then
import { M, rng, pickByWeight } from "../core.js";
import { v3 } from "../model3d.js";

export const BRIDGE_VARIANTS = 3;
export const BRIDGE_GENOMES = {
  footbridge: { span: [1, 1.45], width: [.38, .58], arch: [.04, .28], deck: [.24, .38], rails: [["both", 3], ["one", 2], ["none", 1]], railStyle: [["rail", 3], ["posts", 1], ["cross", 2]], missing: [0, 2], moss: [.05, .3] },
  "rope-bridge": { span: [1.35, 1.8], width: [.32, .48], sag: [.18, .4], post: [.9, 1.3], ropes: [["one", 2], ["two", 1]], missing: [0, 3], step: [.17, .23] },
  fingerpost: { height: [.85, 1.2], girth: [.035, .055], lean: [-.08, .08], arms: [1, 4], armLen: [.28, .42], arm: [["point", 3], ["swallow", 2], ["square", 1]], top: [["cap", 2], ["ball", 1], ["plain", 2]], broken: [0, 1], ivy: [0, 1], moss: [.1, .3] },
  "root-bridge": { span: [1.5, 2], width: [.28, .48], arch: [.32, .6], roots: [3, 6], twist: [.05, .2], moss: [.2, .55], crown: [["start", 2], ["both", 1], ["none", 1]], ferns: [2, 6] },
};
export function bridgeVariant(id, seed = 0) {
  const G = BRIDGE_GENOMES[id]; if (!G) throw new Error(`no bridge "${id}"`);
  const r = rng(((seed + 5) * 2654435761 + id.length * 61) >>> 0), v = { seed, r };
  for (const [k, g] of Object.entries(G)) { if (Array.isArray(g[0])) v[k] = pickByWeight(r, g); else { const x = g[0] + (g[1] - g[0]) * r(); v[k] = Number.isInteger(g[0]) && Number.isInteger(g[1]) ? Math.round(x) : x; } }
  return v;
}
const brCell = (p, k, s) => { const x = Math.sin(Math.floor(p[0] * k) * 127.1 + Math.floor(p[1] * k) * 311.7 + Math.floor(p[2] * k) * 74.7 + s * 19.3) * 43758.5453; return x - Math.floor(x); };
const brWater = (m, span) => m.ell([0, .01, 0], [span * .78, .015, .72], M.WATER, { group: 1 });
const brGone = (r, n, lo, hi) => new Set([...Array(n).keys()].map(() => lo + Math.floor(r() * (hi - lo))));

function brFoot(m, v) {
  const r = v.r, S = v.span, W = v.width, y = x => v.deck + v.arch * (1 - (x / S) ** 2); // its deck's height along it
  brWater(m, S);
  const n = Math.round(S * 2 / .2), gone = brGone(r, v.missing, 2, n - 2);
  for (let k = 0; k <= n; k++) { if (gone.has(k)) continue; const x = -S + k * (2 * S / n), j = (r() - .5) * .04; m.box([x, y(x), j], [.085, .028, W + (r() - .5) * .05], M.WOOD, { round: .01, group: 2 + (k & 1), paint: p => brCell(p, 9, k) < v.moss ? M.MOSS : undefined }); }
  for (const z of [-W * .7, W * .7]) { const pts = []; for (let k = 0; k <= 6; k++) { const x = -S + k * S / 3; pts.push([x, y(x) - .045, z, .03]); } m.chain(pts, M.BARKD, { group: 4 }); } // the stringers
  const sides = v.rails === "both" ? [-1, 1] : v.rails === "one" ? [r() < .5 ? -1 : 1] : [];
  for (const s of sides) {
    const z = s * W * .95, xs = [-S * .95, -S * .32, S * .32, S * .95], h = .48;
    for (const x of xs) m.seg([x, y(x) - .02, z], [x, y(x) + h, z], .026, .024, M.WOOD, { group: 5 });
    if (v.railStyle !== "posts") m.chain(xs.map(x => [x, y(x) + h, z, .02]), M.WOOD, { group: 5 });
    if (v.railStyle === "cross") for (let i = 0; i + 1 < xs.length; i++) { const a = xs[i], b = xs[i + 1]; m.seg([a, y(a) + .02, z], [b, y(b) + h - .03, z], .012, .012, M.WOOD, { group: 6 }); m.seg([a, y(a) + h - .03, z], [b, y(b) + .02, z], .012, .012, M.WOOD, { group: 6 }); }
  }
  for (const x of [-S * 1.02, S * 1.02]) for (const z of [-W * .7, W * .7]) m.seg([x, 0, z], [x, y(x), z], .04, .04, M.TRUNK, { group: 7 }); // its feet on the banks
}
function brRope(m, v) {
  const r = v.r, S = v.span, W = v.width, low = .55, y = x => low - (1 - (x / S) ** 2) * v.sag * .9 + .08;
  brWater(m, S);
  for (const x of [-S, S]) for (const z of [-W - .05, W + .05]) m.seg([x, 0, z], [x, v.post, z], .05, .045, M.WOOD, { group: 2, paint: p => p[1] < .12 ? M.MOSS : undefined });
  const n = Math.round(S * 2 / v.step), gone = brGone(r, v.missing, 2, n - 2);
  for (let k = 0; k <= n; k++) { if (gone.has(k)) continue; const x = -S + k * (2 * S / n), tw = (r() - .5) * .3; m.box([x, y(x), 0], [.07, .018, W * (.85 + r() * .15)], M.WOOD, { round: .01, group: 3 + (k & 1), dir: [1, 0, tw * .2] }); }
  const top = x => v.post - .05 - (1 - (x / S) ** 2) * v.sag * .8, lines = [top, x => y(x) + .03, ...(v.ropes === "two" ? [x => (top(x) + y(x)) / 2 + .04] : [])]; // handropes, foot ropes, and a middle pair
  for (const z of [-W - .05, W + .05]) for (const f of lines) m.chain([...Array(9).keys()].map(k => { const x = -S + k * S / 4; return [x, f(x), z, .014]; }), M.STRAW, { group: 5 });
  for (let k = 1; k < 8; k += 2) for (const z of [-W - .05, W + .05]) { const x = -S + k * S / 4; m.seg([x, y(x), z], [x, top(x), z], .008, .008, M.STRAW, { group: 6 }); } // the hangers
}
function brRoot(m, v) {
  const r = v.r, S = v.span, W = v.width;
  brWater(m, S * .85);
  for (let i = 0; i < v.roots; i++) {
    const z0 = (i / Math.max(1, v.roots - 1) - .5) * W * 2, ph = r() * 6.28, pts = [];
    for (let k = 0; k <= 6; k++) { const t = k / 6, x = -S + t * 2 * S, z = z0 * (1 - .4 * Math.sin(t * Math.PI)) + Math.sin(t * 9 + ph) * v.twist * .5, yy = Math.sin(t * Math.PI) * v.arch + .02, rad = .1 + .06 * Math.abs(t - .5) * 2 - i * .006; pts.push([x, yy, z, Math.max(.05, rad)]); }
    m.chain(pts, M.TRUNK, { group: 2 + (i % 3), rough: .015, paint: p => brCell(p, 12, i) < .12 ? M.BARKD : p[1] > v.arch * .75 && brCell(p, 5, i) < v.moss ? M.MOSS : undefined });
  }
  const crowns = v.crown === "both" ? [-1, 1] : v.crown === "start" ? [r() < .5 ? -1 : 1] : [];
  for (const s of crowns) { const c = [s * (S + .05), .25 + r() * .1, -.35], R = [.3 + r() * .12, .2 + r() * .08, .25]; m.ell(c, R, M.LEAF, { group: 8 + s, rough: .04, paint: p => { const n = brCell(p, 10, 3); return p[1] < c[1] - .05 || n < .2 ? M.LEAF3 : n > .8 ? M.LEAF2 : undefined; } }); }
  for (let i = 0; i < v.ferns; i++) { const s = i % 2 ? 1 : -1, b = [s * (S - .1 + r() * .25), 0, (r() - .5) * W * 2.4]; for (let k = 0; k < 4; k++) { const a = k / 4 * 6.28 + r(); m.chain([[...b, .02], [...v3.add(b, [Math.cos(a) * .12, .14, Math.sin(a) * .1]), .015], [...v3.add(b, [Math.cos(a) * .24, .08, Math.sin(a) * .2]), .006]], k % 2 ? M.LEAF : M.LEAF2, { group: 12 + i }); } }
}
function brPost(m, v) {
  const r = v.r, H = v.height, up = v3.norm([Math.sin(v.lean), 1, Math.sin(v.lean * .6)]), at = h => v3.mul(up, h);
  m.seg([0, -.02, 0], at(H), v.girth, v.girth * .85, M.WOOD, { group: 1, paint: p => p[1] < H * v.moss ? M.MOSS : brCell(p, 18, 3) < .12 ? M.BARKD : undefined });
  if (v.top === "cap") m.box(at(H + .015), [v.girth * 1.6, .015, v.girth * 1.6], M.BARKD, { group: 2, round: .006 });
  if (v.top === "ball") m.ell(at(H + v.girth), [v.girth * 1.1, v.girth * 1.1, v.girth * 1.1], M.WOOD, { group: 2 });
  const a0 = r() * 6.28, snap = v.broken > .6 ? Math.floor(r() * v.arms) : -1;
  for (let i = 0; i < v.arms; i++) {
    const a = (i % 2 ? Math.PI : 0) + (a0 > 3.14 ? Math.PI : 0) + (r() - .5) * 1.1, d = [Math.cos(a), 0, Math.sin(a) * .8], y = H * (.86 - i * .1), L = v.armLen * (.8 + r() * .3), hang = i === snap;
    const dir = hang ? v3.norm([d[0] * .3, -1, d[2] * .3]) : v3.norm(d), base = v3.add(at(y), v3.mul(dir, v.girth)), c = v3.add(base, v3.mul(dir, L / 2)), lenK = hang ? .7 : 1;
    m.box(c, [L / 2 * lenK, .05, .012], M.WOOD, { dir, up: hang ? [d[0], 0, d[2]] : [0, 1, 0], round: .004, group: 3 + i, paint: p => { const t = v3.dot(v3.sub(p, base), dir); return Math.abs(t - L * .45) < .01 ? M.BARKD : undefined; } }); // a blank board, a groove where words were
    const tip = v3.add(base, v3.mul(dir, L * lenK));
    if (v.arm === "point") m.box(tip, [.035, .035, .012], M.WOOD, { dir: v3.norm(v3.add(dir, hang ? [0, 0, 0] : [0, 1, 0])), up: [0, 1, 0], round: .003, group: 3 + i });
    if (v.arm === "swallow") for (const k of [-1, 1]) m.seg(v3.sub(tip, v3.mul(dir, .01)), v3.add(tip, v3.add(v3.mul(dir, .04), [0, k * .035, 0])), .014, .006, M.WOOD, { group: 3 + i });
  }
  if (v.ivy > .55) m.chain([[v.girth, .02, v.girth * .4, .014], [v.girth * .8, H * .3, v.girth * .7, .013], [-v.girth * .5, H * .55, v.girth * .9, .01], [-v.girth, H * .7, v.girth * .2, .006]], M.LEAF, { group: 9, paint: p => brCell(p, 30, 5) < .4 ? M.LEAF2 : undefined });
  for (let i = 0; i < 4; i++) { const a = r() * 6.28; m.seg([Math.cos(a) * .06, 0, Math.sin(a) * .05], [Math.cos(a) * .09, .07 + r() * .06, Math.sin(a) * .07], .012, .004, i % 2 ? M.LEAF : M.LEAF2, { group: 10 }); } // grass at its foot
}
const BR_BUILD = { footbridge: brFoot, "rope-bridge": brRope, "root-bridge": brRoot, fingerpost: brPost };
export const BRIDGE_IDS = ["footbridge", "rope-bridge", "root-bridge"];
export const PATH_GEN_IDS = Object.keys(BR_BUILD); // every path piece the generator draws variants of (the bridges, the fingerpost)
// Fill a model with one bridge's variant (seed), as art/paths.js's pieces build theirs.
export function buildBridge(m, id, seed) { const v = bridgeVariant(id, seed); BR_BUILD[id](m, v); return v; }
