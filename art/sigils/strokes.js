// The sigils' building blocks (from art/sigils.js, 2026-10-13: each creature's sigil lives in art/creatures/<id>/sigil.js and
// imports what it uses from here): a stroke is a polyline L, an arc A, a dot D; C a circle, E an ellipse; pair a stroke and its
// mirror; stave and FOOT the rune staves' parts; bow, wave, spiral, rays, at for the curves.
export const L = (...pts) => ({ l: pts }), A = (cx, cy, r, from, to) => ({ a: [cx, cy, r, from, to] }), D = (x, y) => ({ d: [x, y] });
export const stave = (top, bottom = .86) => L([.5, bottom], [.5, top]); // written upwards
export const FOOT = A(.5, .76, .13, 25, 155);                            // the crescent under every stave
export const mirror = s => s.l ? { l: s.l.map(([x, y]) => [1 - x, y]) } : s.a ? { a: [1 - s.a[0], s.a[1], s.a[2], 180 - s.a[3], 180 - s.a[4]] } : { d: [1 - s.d[0], s.d[1]] };
export const pair = (...ss) => ss.flatMap(s => [s, mirror(s)]); // a left stroke and its mirror
// an arc through two points, bulging by k (sagitta / chord; positive bulges to the left of p0 -> p1)
export function bow(p0, p1, k) {
  const dx = p1[0] - p0[0], dy = p1[1] - p0[1], c = Math.hypot(dx, dy), h = k * c, r = (c * c / 4 + h * h) / (2 * Math.abs(h));
  const mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2, nx = dy / c, ny = -dx / c, off = (r - Math.abs(h)) * Math.sign(h);
  const cx = mx - nx * off, cy = my - ny * off, a0 = Math.atan2(p0[1] - cy, p0[0] - cx) * 180 / Math.PI;
  let a1 = Math.atan2(p1[1] - cy, p1[0] - cx) * 180 / Math.PI;
  // go the short way round when the bulge is small, the long way when it is more than half a circle
  let sweep = a1 - a0; while (sweep > 180) sweep -= 360; while (sweep < -180) sweep += 360;
  return A(cx, cy, r, a0, a0 + sweep);
}
export const wave = (x0, y0, y1, amp, turns, n = 24) => L(...Array.from({ length: n + 1 }, (_, i) => [x0 + amp * Math.sin(i / n * turns * 2 * Math.PI), y0 + (y1 - y0) * i / n]));
export const spiral = (cx, cy, r0, r1, turns, start = 0, n = 40) => L(...Array.from({ length: n + 1 }, (_, i) => { const t = i / n, a = (start + t * turns * 360) * Math.PI / 180, r = r0 + (r1 - r0) * t; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }));
export const rays = (cx, cy, r0, r1, angles) => angles.map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return L([cx + r0 * c, cy + r0 * s], [cx + r1 * c, cy + r1 * s]); });
export const C = (cx, cy, r) => A(cx, cy, r, -90, 270); // a circle, drawn from the top
export const E = (cx, cy, rx, ry, a0 = -90, a1 = 270, n = 36) => L(...Array.from({ length: n + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; }));
export const at = (cx, cy, r, deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)];
