// Tall pieces for the open areas (Ed: "each area should have at least some kind of taller thing ... cairns, natural rock
// structures, pillars, stalagmites, termite mounds, standing stones ... They can be much less dense, but at the moment they
// just read as flat and empty"). Built in 3D (model3d.js) at the witch's scale (about 1.9 m a unit), as tall as small to
// middling trees, and cropped to what is drawn. An area's `big` list names them with `sparse` (the share of its big
// objects they should be: they stand far apart), and each kind draws differently from each random stream, so listing a
// kind twice gives two variants. The game turns them at random.
//   snag:          a tall dead trunk, broken off, rotting, hung with bracket fungi (o.hollow: a dark hollow; o.lean)
//   cairn:         a tapering stack of stones, a standing stone on top (o.tall: taller)
//   standingstone: a lone standing stone, lichen and moss on it (o.lean)
//   pillar:        a carved stone pillar on a plinth, fluted, lichen-covered (o.broken: snapped off, a drum fallen beside it; o.lean)
//   spire:         a natural rock pillar, a sea-stack in the woods: banded rock, mossy ledges, ferns on top (o.twin: two)
//   stalagmite:    a great dripping stalagmite with smaller ones round its foot
import { M, Sprite, hsv2rgb, hash2, cropKeepBottom } from "./core.js";
import { Model, render } from "./model3d.js";
import { witchPixelsPerUnit } from "./witch.js";

export const TALL_KINDS = ["snag", "cairn", "standingstone", "pillar", "spire", "stalagmite"];
const tlHash = (a, b = 0, c = 0) => hash2(Math.floor(a * 1000), Math.floor(b * 1000), 4401 + c);
// lean a point about the foot (radians, towards +x)
const tlLean = (a) => p => [p[0] * Math.cos(a) + p[1] * Math.sin(a), -p[0] * Math.sin(a) + p[1] * Math.cos(a), p[2]];

function tlSnag(m, r, o) {
  const L = tlLean(o.lean || 0), h = 3.3 + r() * .6, bark = p => { const a = Math.atan2(p[2], p[0]), k = Math.sin(a * 11 + p[1] * 1.3); return k > .55 ? M.BARKD : k < -.75 ? M.BARKL : undefined; };
  const pts = [[0, 0, 0, .34], [.05, h * .45, .02, .27], [-.03, h * .85, 0, .21], [.02, h, 0, .19]];
  m.chain(pts.map(([x, y, z, w]) => [...L([x, y, z]), w]), M.TRUNK, { group: 1, rough: .03, paint: p => o.hollow && p[2] > .1 && Math.abs(p[0] - L([0, 1.1, 0])[0]) < .14 && Math.abs(p[1] - 1.1) < .32 ? M.NOSE : bark(p) });
  for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2 + r(); m.seg(L([Math.cos(a) * .12, h + .05, Math.sin(a) * .12]), L([Math.cos(a) * .16, h + .2 + r() * .35, Math.sin(a) * .16]), .07, .015, M.BELLY, { group: 2 }); } // the splintered top
  for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2 + .4; m.chain([[Math.cos(a) * .28, .3, Math.sin(a) * .28, .14], [Math.cos(a) * .7, .03, Math.sin(a) * .7, .05]], M.TRUNK, { group: 1, rough: .02, paint: bark }); } // roots
  m.seg(L([.15, h * .62, .05]), L([.75, h * .78, .15]), .09, .05, M.TRUNK, { group: 3, paint: bark }); // a broken branch stub
  for (let k = 0; k < 7; k++) { const y = .5 + r() * (h - .9), a = (k % 2 ? 1.2 : 2.4) + r() * .8 - .4, c = L([Math.cos(a) * .27, y, Math.sin(a) * .27]); m.ell(c, [.16, .035, .12], M.FLOWER, { dir: [Math.cos(a), 0, Math.sin(a)], group: 10 + k, paint: p => p[1] > c[1] + .02 ? M.BELLY : undefined }); } // bracket fungi
  for (let k = 0; k < 4; k++) m.ell([Math.cos(k * 1.7) * .35, .06, Math.sin(k * 1.7) * .35], [.2, .07, .16], M.MOSS, { group: 4 }); // moss at its foot
}
function tlCairn(m, r, o) {
  const n = o.tall ? 10 : 8; let y = 0;
  for (let k = 0; k < n; k++) { const t = k / (n - 1), rr = .55 - .38 * t, hh = .16 + r() * .06, c = [(r() - .5) * .06, y + hh, (r() - .5) * .06]; m.ell(c, [rr * (1 + r() * .15), hh, rr * (.9 + r() * .2)], M.STONE, { group: 1 + (k % 3), rough: .03, dir: [1, (r() - .5) * .3, (r() - .5) * .3], paint: p => tlHash(p[0] * 3, p[1] * 5, k) < (t < .4 ? .3 : .1) ? M.MOSS : tlHash(p[0] * 7, p[2] * 7, k) < .12 ? M.BELLY : undefined }); y += hh * 1.75; }
  m.box([0, y + .32, 0], [.09, .36, .06], M.STONE, { round: .03, rough: .015, group: 5, dir: [.2, 1, 0], up: [0, 0, 1] }); // a standing stone on top
  for (let k = 0; k < 5; k++) { const a = k * 1.3; m.ell([Math.cos(a) * .7, .07, Math.sin(a) * .65], [.13, .09, .11], M.STONE, { group: 6, rough: .02 }); } // stones round its foot
}
function tlStanding(m, r, o) {
  const a = o.lean || 0, h = 1.55 + r() * .25, up = [Math.sin(a), Math.cos(a), 0];
  const w = .4 + r() * .1, paint = p => p[1] > Math.cos(a) * h * 1.8 ? M.MOSS : tlHash(Math.floor(p[0] * 4), Math.floor(p[1] * 3), 1) < .12 ? M.BELLY : p[1] < .5 && tlHash(Math.floor(p[0] * 5), Math.floor(p[2] * 5), 2) < .35 ? M.MOSS : undefined;
  m.ell([Math.sin(a) * h * .9, Math.cos(a) * h * .9, 0], [w, h * .98, .22], M.STONE, { rough: .015, group: 1, dir: [Math.cos(a), -Math.sin(a), 0], up, paint }); // a tapering slab, wider than deep (smooth faces: no speckle)
  m.ell([Math.sin(a) * .5 - w * .4, .55, .02], [w * .75, .6, .2], M.STONE, { rough: .015, group: 1, paint }); // its broad foot
  m.ell([Math.sin(a) * h * 1.6 + .08, Math.cos(a) * h * 1.65, 0], [w * .6, .32, .18], M.STONE, { rough: .015, group: 1, dir: [1, .4, 0], paint }); // a crooked top
  m.ell([.5, .1, .25], [.22, .12, .18], M.STONE, { group: 2, rough: .02 });
  for (let k = 0; k < 6; k++) m.seg([Math.cos(k) * .45, 0, Math.sin(k) * .3 + .1], [Math.cos(k) * .5, .18 + r() * .12, Math.sin(k) * .3 + .1], .03, .005, M.LEAF, { group: 3 }); // grass round its foot
}
function tlPillar(m, r, o) {
  const L = tlLean(o.lean || 0), top = o.broken ? 2.2 : 3.2;
  m.box([0, .14, 0], [.48, .14, .48], M.STONE, { round: .03, rough: .01, group: 1, paint: p => tlHash(p[0] * 9, p[2] * 9, 3) < .2 ? M.MOSS : undefined }); // the plinth
  m.seg(L([0, .28, 0]), L([0, top, 0]), .32, .28, M.STONE, { group: 2, rough: .012, paint: p => { const a = Math.atan2(p[2], p[0]); if (Math.sin(a * 10) > .7) return M.STONED; return tlHash(Math.floor(a * 4), Math.floor(p[1] * 3), 4) < .18 ? M.BELLY : p[1] < .9 && tlHash(Math.floor(a * 6), Math.floor(p[1] * 6), 5) < .3 ? M.MOSS : undefined; } }); // the fluted shaft, lichen, moss low down
  if (o.broken) { for (let k = 0; k < 4; k++) { const a = k * 1.6 + .3; m.seg(L([Math.cos(a) * .15, top, Math.sin(a) * .15]), L([Math.cos(a) * .2, top + .2 + r() * .2, Math.sin(a) * .2]), .12, .03, M.STONE, { group: 3 }); } m.seg([1.0, .26, .3], [1.05, .26, -.35], .27, .27, M.STONE, { group: 4, rough: .015 }); } // snapped off, a drum fallen beside it
  else { m.box(L([0, top + .08, 0]), [.4, .08, .4], M.STONE, { round: .02, group: 3, dir: [Math.cos(o.lean || 0), -Math.sin(o.lean || 0), 0] }); m.box(L([0, top + .22, 0]), [.46, .06, .46], M.STONE, { round: .02, group: 3, dir: [Math.cos(o.lean || 0), -Math.sin(o.lean || 0), 0], paint: () => M.MOSS }); } // its capital, moss on top
}
function tlSpire(m, r, o) {
  // a weathered rock spire (Ed, 2026-10-06: the ravine's column read as camouflage noise; 2026-10-07: the stack of square slabs
  // after it read as "a strange tall column", stacked dark blocks): one rough, tapering column of rock, bending a little as it
  // rises, its strata as bands across it (a dark seam, a paler band, moss on the ledges) rather than separate slabs, with a few
  // broken ledges jutting out at odd heights and angles to break its outline
  const one = (x, z, h, w, g) => {
    const n = 5, pts = [], band = .42 + r() * .12, tilt = (r() - .5) * .5;
    let ox = x, oz = z;
    for (let k = 0; k <= n; k++) { const t = k / n; pts.push([ox, t * h, oz, w * (.82 - .52 * t) * (.9 + r() * .2)]); ox += (r() - .5) * w * .22; oz += (r() - .5) * w * .18; }
    const strata = p => { const s = (p[1] + Math.sin(Math.atan2(p[2] - z, p[0] - x) * 3 + p[1] * tilt) * .07) / band, f = s - Math.floor(s), i = Math.floor(s);
      return f < .12 ? M.STONED : f > .9 && tlHash(i, g, 6) < .55 ? M.MOSS : tlHash(i, g, 7) < .3 && f > .35 && f < .65 ? M.BELLY : undefined; };
    m.chain(pts, M.STONE, { group: g, rough: .025, paint: strata });
    for (let k = 0; k < 3; k++) { const [px, py, pz, pr] = pts[1 + k], b = r() * Math.PI * 2; m.ell([px + Math.cos(b) * pr * .55, py * (.8 + r() * .3), pz + Math.sin(b) * pr * .5], [pr * (.7 + r() * .3), h * (.12 + r() * .08), pr * (.6 + r() * .25)], M.STONE, { group: g, rough: .03, dir: [Math.cos(b), 0, Math.sin(b)], paint: strata }); } // its bulk: lumps of rock merged into the lower half
    for (let k = 0; k < 4; k++) { const t = .15 + k * .2 + r() * .08, [px, py, pz, pr] = pts[Math.min(n, Math.round(t * n))], b = r() * Math.PI * 2, s = pr * (.45 + r() * .3);
      m.box([px + Math.cos(b) * pr * .75, py + (r() - .5) * .3, pz + Math.sin(b) * pr * .7], [s, s * (.35 + r() * .25), s * .8], M.STONE, { round: .03, rough: .03, group: g, dir: [Math.cos(b + r()), (r() - .5) * .3, Math.sin(b + r())], paint: p => p[1] > py + s * .2 ? M.MOSS : undefined }); } // broken ledges
    const [tx, ty, tz] = pts[n];
    for (let k = 0; k < 3; k++) { const a = k * 2.1 + r(), c = [tx + Math.cos(a) * w * .15, ty - .1, tz + Math.sin(a) * w * .12]; m.seg(c, [c[0] + Math.cos(a) * .3, c[1] + .22, c[2] + Math.sin(a) * .3], .05, .01, k % 2 ? M.LEAF2 : M.LEAF, { group: g + 10 }); } // a few ferns low on its top (not a crown of fronds: it read as a palm)
    m.ell([tx, ty - .12, tz], [w * .34, .14, w * .3], M.MOSS, { group: g + 10, rough: .02 }); };
  one(0, 0, 4.4 + r() * .8, .8, 1);
  if (o.twin) one(1.25, -.45, 2.8 + r() * .5, .58, 2);
  for (let k = 0; k < 5; k++) { const a = k * 1.25, s = .2 + r() * .12; m.box([Math.cos(a) * 1.15, s * .6, Math.sin(a) * .95], [s, s * .6, s * .8], M.STONE, { round: .02, group: 5, dir: [Math.cos(a * 3), 0, Math.sin(a * 3)], paint: p => p[1] > s * 1.05 ? M.MOSS : undefined }); } // fallen blocks round its foot
}
function tlStalagmite(m, r, o) {
  const drip = p => { const a = Math.atan2(p[2], p[0]); return Math.sin(a * 9 + p[1] * .8) > .65 ? M.STONED : undefined; };
  m.chain([[0, 0, 0, .62], [.03, 1.1, 0, .42], [-.02, 2.2, .02, .22], [0, 3.0 + r() * .5, 0, .04]], M.STONE, { group: 1, rough: .01, paint: drip });
  for (const [x, z, h] of [[.75, .3, 1.1], [-.7, .2, .8], [.4, -.6, .6], [-.3, .65, .45]]) m.chain([[x, 0, z, .22], [x, h * .6, z, .12], [x, h, z, .02]], M.STONE, { group: 2, rough: .01, paint: drip });
  m.ell([0, .03, 0], [.95, .04, .8], M.BODY2, { group: 3 }); // a wet pool round its foot
}
const TL_DRAW = { snag: tlSnag, cairn: tlCairn, standingstone: tlStanding, pillar: tlPillar, spire: tlSpire, stalagmite: tlStalagmite };

// One tall piece: { sp, colours, metres: { height, width } }. r: the area's random stream (variants); def: the area (its leaf hue).
export function tallPiece(kind, o, def, st, r, ppm = 16) {
  const m = new Model({ blend: .05 }); TL_DRAW[kind](m, r, o);
  const sp = cropKeepBottom(render(m, { scale: witchPixelsPerUnit(st) }).sp).sp, leaf = def.leaf ?? .28;
  const colours = { [M.STONE]: hsv2rgb(.09, .07, .58), [M.STONED]: hsv2rgb(.62, .1, .34), [M.BELLY]: hsv2rgb(.14, .15, .78), [M.MOSS]: hsv2rgb(leaf, .5, .4), [M.LEAF]: hsv2rgb(leaf, .55, .45), [M.LEAF2]: hsv2rgb(leaf - .03, .5, .6),
    [M.TRUNK]: hsv2rgb(.07, .2, .36), [M.BARKD]: hsv2rgb(.06, .25, .18), [M.BARKL]: hsv2rgb(.08, .15, .52), [M.FLOWER]: [196, 150, 96], [M.BODY2]: [52, 70, 86], [M.NOSE]: [20, 16, 24], [M.LINE]: [24, 22, 30] };
  if (kind === "snag") colours[M.BELLY] = [214, 196, 160]; // its pale splintered wood and the fungi's rims
  return { sp, colours, metres: { height: +(sp.h / ppm).toFixed(1), width: +(sp.w / ppm).toFixed(1) } };
}
