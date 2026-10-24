// The great oak as a landmark (mock, Ed 2026-10-24: "ideally we can see the massive tree over the horizon when you're flying around the
// map"): what the flying camera sees from the treetops, the oak due north of her (the camera always looks north). A perspective camera
// as the game's treetop one (fov 20, pitched 32, 190 m behind her), the world bent away (camera.curve.treetop: dropped 0.0015 d^2 ahead
// of her) and hazed (haze near 150, far 360 m, from her). today: the oak drawn as everything else (bent, hazed out past 360 m); landmark:
// the proposal, its drop capped as if it stood no further than 180 m and its haze capped at 0.6, so it rises over the horizon,
// smaller with distance, a silhouette in the far haze; its string lights twinkling when the party's on.
(function () {
const K = .0015, NEAR = 150, FAR = 360, HAZE = [26, 34, 58];
const LEAF = [[12, 22, 20], [20, 36, 28], [30, 52, 36], [48, 76, 48], [84, 112, 72]];
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
window.horizon = function ({ dist, W = 480, H = 270, scale = 4, lights = 1, landmark = true, title = "", pitch = 32, back = 190, fov = 20 }) {
  const D = window.crownData(), her = [0, 25, dist]; // (the oak's own coordinates: its house round the origin; she's dist south of it)
  const a = pitch * Math.PI / 180, cam = [her[0], her[1] + Math.sin(a) * back, her[2] + Math.cos(a) * back], F = [0, -Math.sin(a), -Math.cos(a)], U = [0, Math.cos(a), -Math.sin(a)];
  const fl = (H / 2) / Math.tan(fov * Math.PI / 360); // (the focal length in pixels)
  const drop = (z, cap) => { const d = Math.max(0, her[2] - z); return K * Math.min(d, cap) ** 2; };
  const canopy = (x, z) => { if (Math.hypot(x, (z + 4) / .96) < 96) return -1e9; return 13 + 6 * noise(x * .03 + 50, z * .03) + 3 * noise(x * .13, z * .13); };
  const zb = new Float32Array(W * H).fill(1e9), col = new Uint8ClampedArray(W * H * 4), hRow = new Int32Array(W).fill(H);
  // the woods (ray-marched over the bent canopy) and the sky over them
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    const sx = (i + .5 - W / 2) / fl, sy = -(j + .5 - H / 2) / fl, dir = [sx, F[1] + sy * U[1], F[2] + sy * U[2]], m = Math.hypot(...dir); dir[0] /= m; dir[1] /= m; dir[2] /= m;
    let t = 60, hit = false, p;
    while (t < 2400) { p = [cam[0] + dir[0] * t, cam[1] + dir[1] * t, cam[2] + dir[2] * t]; if (p[1] < canopy(p[0], p[2]) - drop(p[2], 1e9)) { hit = true; break; } t += Math.max(1, t * .012); }
    let c, k = j * W + i;
    if (hit) { const lump = noise(p[0] * .25, p[2] * .25) * .6 + noise(p[0] * .6 + 3, p[2] * .6) * .4, tone = LEAF[lump < .35 ? 0 : lump < .55 ? 1 : 2].map(v => v * .8);
      const hd = Math.hypot(p[0] - her[0], p[2] - her[2]); c = mix(tone, HAZE, Math.min(1, Math.max(0, (hd - NEAR) / (FAR - NEAR)))); zb[k] = t; if (hRow[i] === H) hRow[i] = j; }
    else { const el = dir[1] + .3; c = mix([30, 40, 70], [8, 12, 30], Math.min(1, Math.max(0, el * 3))); if (hash(i, j) > .996) c = [190, 200, 225]; }
    col[k * 4] = c[0]; col[k * 4 + 1] = c[1]; col[k * 4 + 2] = c[2]; col[k * 4 + 3] = 255;
  }
  // the oak: its crown's lobes and limbs splatted through the depth buffer, bent and hazed as asked
  const L = [-.45, .8, .25];
  const projAt = (q, bend) => { const y = q[1] - (bend ? drop(q[2], 1e9) : 0), d = [q[0] - cam[0], y - cam[1], q[2] - cam[2]], t = d[0] * F[0] + d[1] * F[1] + d[2] * F[2];
    return [W / 2 + d[0] / t * fl, H / 2 - (d[1] * U[1] + d[2] * U[2]) / t * fl, t]; };
  // where its foot would be: as the world draws it (bent), and stood on the horizon (the woods' top edge at its bearing), its lower crown sunk behind the woods
  const footBent = projAt([0, 22, -4], true), footFlat = projAt([0, 22, -4], false), col0 = Math.max(0, Math.min(W - 1, footFlat[0] | 0));
  const onHorizon = hRow[col0] + 26 * fl / footFlat[2], lift = landmark && footBent[1] > onHorizon ? onHorizon - footFlat[1] : null; // (null: drawn as the world draws it)
  const hazeMax = lift !== null ? .6 : 1;
  const proj = q => { if (lift === null) return projAt(q, true); const r = projAt(q, false); r[1] += lift; return r; };
  const hzOf = q => Math.min(hazeMax, lift !== null ? .35 + Math.min(.25, dist / 4000) : Math.max(0, (Math.hypot(q[0] - her[0], q[2] - her[2]) - NEAR) / (FAR - NEAR)));
  for (const q of D.PRIMS) { if (q.kind === "wood") continue; const hz = hzOf(q.c); if (hz >= .999) continue;
    const [sx, sy, t] = proj(q.c); if (t < 1) continue; const R = q.r * fl / t; if (R < .35) continue;
    for (let j = Math.max(0, Math.floor(sy - R)); j < Math.min(H, Math.ceil(sy + R)); j++) for (let i = Math.max(0, Math.floor(sx - R)); i < Math.min(W, Math.ceil(sx + R)); i++) {
      const u = (i + .5 - sx) / R, v = -(j + .5 - sy) / R, rr = u * u + v * v; if (rr >= 1) continue; const h = Math.sqrt(1 - rr), tt = t - h * q.r, k = j * W + i; if (tt >= zb[k]) continue;
      const n = [u, v * U[1] - h * F[1], v * U[2] - h * F[2]], lam = n[0] * L[0] + n[1] * L[1] + n[2] * L[2];
      let c;
      if (q.kind === "bark") c = lam > .4 ? [58, 48, 42] : [40, 33, 30];
      else { const P = [q.c[0] + n[0] * q.r, q.c[1] + n[1] * q.r, q.c[2] + n[2] * q.r], nn = noise(P[0] * .3 + P[1] * .2, P[2] * .3 - P[1] * .1);
        if (rr > .5 + (nn - .3) * 1.2 && R > 2) continue; if (q.thin && noise(P[0] * .9 + 9, P[2] * .9 + P[1] * .5) < q.thin * .9 && R > 3) continue;
        const sh = lam * .85 + (nn - .5) * 1.1 + (n[1] < -.25 ? -.5 : 0); c = LEAF[sh < -.05 ? 0 : sh < .3 ? 1 : sh < .62 ? 2 : sh < .9 ? 3 : 4];
        const g = D.glowAt(...P); if (g > 0) c = mix(c, [150, 120, 50], g * .45 * Math.max(.2, -n[1] + .5)); }
      c = mix(c, HAZE, hz); zb[k] = tt; col[k * 4] = c[0]; col[k * 4 + 1] = c[1]; col[k * 4 + 2] = c[2];
    } }
  // its string lights: a pixel each, a little glow; through the haze, twinkles
  if (lights > 0) { const gl = new Float32Array(W * H * 3), vis = [];
    for (const B of D.BULBS) { if (B.u > lights) continue; const hz = hzOf(B.p); if (hz >= .999) continue; const [x, y, t] = proj(B.p), i = x | 0, j = y | 0;
      if (t < 1 || i < 0 || j < 0 || i >= W || j >= H || t > zb[j * W + i] + 1.5) continue; const tw = .5 * (1 + Math.sin(B.ph * 40)), f = (1 - hz * .6) * (.6 + .4 * tw); vis.push([i, j, B.c, f]);
      for (let jj = Math.max(0, j - 2); jj <= Math.min(H - 1, j + 2); jj++) for (let ii = Math.max(0, i - 2); ii <= Math.min(W - 1, i + 2); ii++) { const q = Math.hypot(ii - i, jj - j) / 2.5; if (q >= 1) continue; const k = (jj * W + ii) * 3, w = (1 - q) ** 2 * .12 * f; gl[k] += B.c[0] * w; gl[k + 1] += B.c[1] * w; gl[k + 2] += B.c[2] * w; } }
    for (let k = 0; k < W * H; k++) for (let c = 0; c < 3; c++) col[k * 4 + c] += gl[k * 3 + c];
    for (const [i, j, c, f] of vis) { if (f < .55 && hash(i, j) < .5) continue; const k = (j * W + i) * 4; for (let q = 0; q < 3; q++) col[k + q] = Math.max(col[k + q], c[q] * Math.min(1, f + .25)); } }
  // her, at the camera's focus
  { const [x, y] = proj([her[0], her[1], her[2]]); for (let j = -2; j <= 1; j++) for (let i = -1; i <= 0; i++) { const k = ((y + j | 0) * W + (x + i | 0)) * 4; col[k] = 255; col[k + 1] = 122; col[k + 2] = 200; } }
  const im = new ImageData(col, W, H), tmp = document.createElement("canvas"); tmp.width = W; tmp.height = H; tmp.getContext("2d").putImageData(im, 0, 0);
  cv.width = W * scale; cv.height = H * scale; ctx.imageSmoothingEnabled = false; ctx.drawImage(tmp, 0, 0, W * scale, H * scale);
  if (title) { ctx.font = `bold ${Math.round(5 * scale)}px sans-serif`; ctx.textAlign = "left"; ctx.lineWidth = 4; ctx.strokeStyle = "#000"; ctx.fillStyle = "#fff"; ctx.strokeText(title, 4 * scale, 8 * scale); ctx.fillText(title, 4 * scale, 8 * scale); }
};
})();
