// Centrepiece mocks (Ed, 2026-10-29): drawn in the page on the game's art-pixel grid over a captured frame. Exposes window.mock(spec).
const PX = 3;
const rainbow = h => { const f = n => { const q = (((n + h * 6) % 6) + 6) % 6; return 1 - Math.max(0, Math.min(1, Math.min(q, 4 - q))); }; return [f(5), f(3), f(1)]; };
const hash = (a, b = 0, c = 0) => { let h = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453; return h - Math.floor(h); };
const mix = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);
const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
const hueOf = c => { const [r, g, b] = c.map(v => v / 255), M = Math.max(r, g, b), m = Math.min(r, g, b), d = M - m; if (!d) return 0; let h = M === r ? ((g - b) / d) % 6 : M === g ? (b - r) / d + 2 : (r - g) / d + 4; return (h * 60 + 360) % 360; };

async function loadImage(src) { const im = new Image(); im.src = src; await im.decode(); return im; }

window.mock = async function (spec) {
  const bg = await loadImage(spec.bg), W = bg.width, H = bg.height, AW = Math.ceil(W / PX), AH = Math.ceil(H / PX), M = spec.meta;
  const out = document.createElement("canvas"); out.width = W; out.height = H;
  const o = out.getContext("2d"); o.imageSmoothingEnabled = false; o.drawImage(bg, 0, 0);
  const bgData = o.getImageData(0, 0, W, H).data;
  const art = new ImageData(AW, AH), zb = new Float32Array(AW * AH).fill(1e9), mask = new Uint8Array(AW * AH);
  const ax0 = M.at[0] / PX, ay0 = M.at[1] / PX;
  const P = (e, n, y) => [ax0 + (e * M.east[0] + n * M.north[0] + y * M.up[0]) / PX, ay0 + (e * M.east[1] + n * M.north[1] + y * M.up[1]) / PX];
  const tops = []; // (the piece's own colours, for the contrast)
  // plot: a surface point in metres (east, north, up) with its colour; nearer (less north, higher) wins
  const herX = Math.floor((M.at[0] + 7 * M.east[0]) / PX), herY = Math.floor((M.at[1] + 7 * M.east[1]) / PX);
  let surrounding = false;
  const plot = (e, n, y, c, opts = {}) => {
    const [x, yy] = P(e, n, y), ix = Math.floor(x), iy = Math.floor(yy);
    if (ix < 0 || iy < 0 || ix >= AW || iy >= AH) return;
    // (never over her: she stands 7 m east of the stone, about 2 m wide and 2.5 m tall on screen)
    if (y > 0.05 && Math.abs(ix - herX) <= 5 && iy >= herY - 15 && iy <= herY + 2) return;
    const i = iy * AW + ix, d = n - y * 0.8;
    if (surrounding && mask[i] === 4) return; // (the ring's dots stay on top of the surround, as the game's overlay)
    if (d >= zb[i]) return;
    zb[i] = d;
    const a = art.data;
    // (see-through ground: mixed with the frame's own floor under it, so its tufts show through)
    if (opts.alpha !== undefined) { const j = (Math.min(H - 1, iy * PX + 1) * W + Math.min(W - 1, ix * PX + 1)) * 4, k = opts.alpha; c = [c[0] * k + bgData[j] * (1 - k), c[1] * k + bgData[j + 1] * (1 - k), c[2] * k + bgData[j + 2] * (1 - k)]; }
    a[i * 4] = Math.max(0, Math.min(255, c[0])); a[i * 4 + 1] = Math.max(0, Math.min(255, c[1])); a[i * 4 + 2] = Math.max(0, Math.min(255, c[2])); a[i * 4 + 3] = 255;
    mask[i] = opts.water ? 2 : opts.ring ? 4 : 1;
    if (opts.top) tops.push(c);
  };
  // the floor's colour round it (between the piece and the ring), from the frame
  const floorCols = [];
  for (let k = 0; k < 400; k++) { const t = (k / 400) * Math.PI * 2, r = 3.6 + 0.6 * hash(k, 3); const [x, y] = P(Math.cos(t) * r, Math.sin(t) * r, 0); const ix = Math.round(x * PX), iy = Math.round(y * PX); if (ix >= 0 && iy >= 0 && ix < W && iy < H) { const j = (iy * W + ix) * 4; floorCols.push([bgData[j], bgData[j + 1], bgData[j + 2]]); } }
  const med = ch => { const v = floorCols.map(c => c[ch]).sort((a, b) => a - b); return v[Math.floor(v.length / 2)] ?? 0; };
  const floor = [med(0), med(1), med(2)];
  const L = [-0.55, 0.45, 0.7]; // (moonlight from up and to the west, a little from the north)
  const lit = (c, nrm, amb = 0.45) => { const k = amb + (1 - amb) * Math.max(0, nrm[0] * L[0] + nrm[1] * L[1] + nrm[2] * L[2]) / Math.hypot(...L); return c.map(v => v * k); };
  // (Ed, 2026-10-29: "big ancient things that feel large compared to the rest of the scenery": each piece drawn at K times its
  // model, about 11 m across; the ring and the surround go out with it)
  const K = spec.scale ?? 1.7, step = 0.035 / K, R = spec.r ?? 3.25;
  const glows = []; // [e, n, y, radius m, rgb, strength]
  // (its age: lichen and moss flecking whatever isn't water or glowing, a few per square metre)
  const aged = (e, n, y, c, o = {}) => { if (!o.water && y > 0.08 && hash(Math.round(e * 7), Math.round(n * 7), Math.round(y * 7)) > 0.93 && c[0] + c[1] + c[2] < 600) c = hash(Math.round(e * 3), Math.round(n * 3)) > 0.5 ? [120, 136, 96] : [70, 96, 52]; plot(e * K, n * K, y * K, c, o); };
  const ctx = { plot: aged, lit, mix, hash, R, step, glows, rainbow, floor };
  PIECES[spec.piece](ctx, spec);
  ctx.plot = plot; ctx.R = R * K; ctx.step = 0.035; // (the ring and the surround in true metres)
  // the analyser ring at its foot (the cast ring: 36 bars round the stone's foot, cell 0.55 m, radius 4.4 m, rainbow; idle heights)
  const ringPts = [];
  for (let i = 0; i < 36; i++) {
    // (mid-cast, as the game draws it: the share filled lit in the rainbow, the rest short and grey)
    const f = i / 36, a = Math.PI / 2 + f * Math.PI * 2, ux = Math.cos(a), uz = Math.sin(a) * 0.8, lv = 0.35 + 0.3 * Math.abs(Math.sin(i * 1.7) * 0.6 + Math.sin(i * 0.9 + 1) * 0.4), lit = f < 0.55;
    const h = lit ? 1 + Math.round(lv * 4) : 1 + Math.round(lv * 1.5), c = lit ? rainbow(f + 0.3) : [0.45, 0.45, 0.5];
    for (let j = 0; j < h; j++) { const r = 4.4 * K + j * 0.55 * 1.1; ringPts.push([ux * r, -(uz * r + 0.6), c, j === h - 1, lit]); }
  }
  // the ring's dots on the ground (flat, as the game's), behind the piece where it stands in front of them
  for (const [e, n, c, tip, on] of ringPts) { const k = on ? (tip ? 1 : 0.85) : 0.35, col = c.map((v, i) => floor[i] * (1 - k) + v * 255 * k); for (let a = -0.25; a <= 0.25; a += 0.06) for (let b = -0.25; b <= 0.25; b += 0.06) plot(e + a, n + b, 0, col, { ring: true }); }
  // its surround, so it sits in its ground rather than on it (the ring's dots are already down and keep their place)
  surrounding = true;
  if (SURROUNDS[spec.piece]) SURROUNDS[spec.piece](ctx, spec);
  // and wider, about five times its width (Ed, 2026-10-29): its ground in patches and its smaller kin, thinning out into the floor
  if (WIDE[spec.piece]) wide(ctx, WIDE[spec.piece]);
  surrounding = false;

  // the art laid down
  const ac = document.createElement("canvas"); ac.width = AW; ac.height = AH;
  const actx = ac.getContext("2d");
  actx.putImageData(art, 0, 0);
  // the sigil stack over it (Ed: 1.5 times, in the rank colours: friends above enemies)
  const stack = spec.stack, glyphs = [];
  let y = (spec.top ?? 1) * K + 4.0;
  for (const s of stack) { const size = 2.27 * s.size * 1.5; y += size / 2; glyphs.push({ ...s, y, size }); y += size / 2 + size * 0.15; }
  const drawGlyph = (g, cx, cy, side, alpha, flip) => {
    const N = Math.max(8, Math.round(side)), t = document.createElement("canvas"); t.width = N; t.height = N;
    const tc = t.getContext("2d");
    tc.fillStyle = "rgba(5,5,9,0.6)"; tc.beginPath(); tc.arc(N / 2, N / 2, N * 0.5, 0, Math.PI * 2); tc.fill();
    tc.strokeStyle = tc.fillStyle = `rgb(${g.rgb.join(",")})`; tc.lineWidth = Math.max(1.2, 0.07 * N * 1.15); tc.lineCap = "round"; tc.lineJoin = "round";
    const S = (p) => [p[0] * N * 0.8 + N * 0.1, (flip ? 1 - p[1] : p[1]) * N * 0.8 + N * 0.1];
    for (const st of SIGILS[g.sp] ?? []) {
      tc.beginPath();
      if (st.l) { st.l.forEach((p, i) => { const q = S(p); i ? tc.lineTo(q[0], q[1]) : tc.moveTo(q[0], q[1]); }); tc.stroke(); }
      else if (st.d) { const q = S(st.d); tc.arc(q[0], q[1], Math.max(1, 0.048 * N * 0.8 * 1.3), 0, Math.PI * 2); tc.fill(); }
      else if (st.a) { const [x, y, r, a0, a1] = st.a, q = S([x, y]); const s0 = (a0 * Math.PI) / 180, s1 = (a1 * Math.PI) / 180; if (flip) tc.arc(q[0], q[1], r * N * 0.8, -s1, -s0); else tc.arc(q[0], q[1], r * N * 0.8, s0, s1); tc.stroke(); }
    }
    // (to whole art pixels: no soft edges)
    const d = tc.getImageData(0, 0, N, N);
    for (let i = 0; i < d.data.length; i += 4) d.data[i + 3] = d.data[i + 3] > 110 ? Math.round(255 * alpha * (d.data[i] + d.data[i + 1] + d.data[i + 2] > 60 ? 1 : 0.6)) : 0;
    tc.putImageData(d, 0, 0);
    actx.drawImage(t, Math.round(cx - N / 2), Math.round(cy - N / 2));
  };
  // (the moon pool: the stack mirrored in its water, dimmed, rippled, only where there's water)
  if (spec.reflect) {
    const rc = document.createElement("canvas"); rc.width = AW; rc.height = AH; const keep = actx; const save = actx.getImageData(0, 0, AW, AH);
    actx.clearRect(0, 0, AW, AH);
    // (seen from above at the play camera's angle the mirror image runs down toward her, squeezed: the lowest few in the water)
    const b0 = glyphs[0].y - glyphs[0].size / 2;
    for (const g of glyphs) { const [x, yy] = P(0, -(g.y - b0) * 0.32 - 0.6, 0); drawGlyph(g, x, yy, (g.size * M.east[0]) / PX * 0.8, 0.6, true); }
    const refl = actx.getImageData(0, 0, AW, AH);
    actx.putImageData(save, 0, 0);
    const base = actx.getImageData(0, 0, AW, AH);
    for (let iy = 0; iy < AH; iy++) { const sh = Math.round(Math.sin(iy * 0.9) * 0.8); for (let ix = 0; ix < AW; ix++) { const i = iy * AW + ix, j = iy * AW + Math.min(AW - 1, Math.max(0, ix + sh)); if (mask[i] !== 2 || refl.data[j * 4 + 3] === 0) continue; const k = refl.data[j * 4 + 3] / 255 * 0.7; for (let c = 0; c < 3; c++) base.data[i * 4 + c] = base.data[i * 4 + c] * (1 - k) + refl.data[j * 4 + c] * k * 0.85; } }
    actx.putImageData(base, 0, 0);
  }
  for (const g of glyphs) { const [x, yy] = P(0, 0, g.y); drawGlyph(g, x, yy, (g.size * M.east[0]) / PX, 1, false); }
  // up to the screen, nearest: whole art pixels
  o.drawImage(ac, 0, 0, AW * PX, AH * PX);
  // its glow: natural light, soft (lighting may be smooth: Ed, round 14), additive
  o.globalCompositeOperation = "lighter";
  // (subtle, Ed 2026-10-29: no beacon pooling light over the clearing as the runestone's did; the glow is in the source's own
  // pixels, and round it only a small faint halo, half the size and under half the strength it was, catching the nearest ground)
  for (const [e0, n0, y0, r0, rgb, k0] of glows) { const e = e0 * K, n = n0 * K, yy = y0 * K, r = r0 * 0.55 * K, k = k0 * 0.42, [x, y] = P(e, n, yy), gr = o.createRadialGradient(x * PX, y * PX, 0, x * PX, y * PX, r * M.east[0]); gr.addColorStop(0, `rgba(${rgb.join(",")},${k})`); gr.addColorStop(1, `rgba(${rgb.join(",")},0)`); o.fillStyle = gr; o.fillRect(0, 0, W, H); }
  o.globalCompositeOperation = "source-over";
  // the contrast with the floor: the piece's top colours' median against the floor's
  const tm = ch => { const v = tops.map(c => c[ch]).sort((a, b) => a - b); return v[Math.floor(v.length / 2)] ?? 0; };
  const top = [tm(0), tm(1), tm(2)], l1 = lum(top), l2 = lum(floor), ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  let dh = Math.abs(hueOf(top) - hueOf(floor)); dh = Math.min(dh, 360 - dh);
  return { png: out.toDataURL("image/png"), at: M.at, top: glyphs.length ? P(0, 0, glyphs[glyphs.length - 1].y + glyphs[glyphs.length - 1].size / 2) : null, contrast: { piece: top.map(Math.round), floor: floor.map(Math.round), ratio: +ratio.toFixed(2), lighter: l1 > l2, hue: Math.round(dh) } };
};

// ---- the nine centrepieces: each drawn as surfaces in metres round the stone's spot (0, 0), up to R across ----
const PIECES = {
  // Temperate (old oaks): a great oak's stump, sawn flat long ago: pale rings, dark bark, buttress roots, moss on its north lip,
  // its heartwood faintly amber where the old sap still glows.
  stump({ plot, lit, mix, hash, R, step, glows }, spec) {
    const r = R * 0.72, h = 1.3;
    // roots (Ed: "the giant treestump has big deep roots"): eight great buttresses arching out of the trunk, thick and ridged, each
    // diving into the earth and breaking surface again further out, smaller, twice, before it's gone
    for (let k = 0; k < 8; k++) {
      const a0 = (k / 8) * Math.PI * 2 + 0.2 + (hash(k, 1) - 0.5) * 0.4, reach = R * (1.5 + 0.5 * hash(k, 2));
      for (let s = r * 0.7; s < reach; s += step) {
        const t = (s - r * 0.7) / (reach - r * 0.7), a = a0 + Math.sin(t * 5 + k) * 0.12 * t, half = 0.75 * (1 - t * 0.75);
        // (its arch: high at the trunk, under the ground between its humps)
        const arch = t < 0.35 ? 1.0 * (1 - t / 0.35) + 0.35 * Math.sin((t / 0.35) * Math.PI) : 0.32 * Math.sin(((t - 0.35) / 0.65) * Math.PI * 2.4) * (1 - t);
        if (arch <= 0.02) continue;
        for (let w = -half; w <= half; w += step) {
          const q = w / half, y = arch * Math.sqrt(Math.max(0, 1 - q * q)) * (t < 0.35 ? 1 : 0.9);
          const e = Math.cos(a) * s - Math.sin(a) * w, n = Math.sin(a) * s + Math.cos(a) * w;
          const ridge = Math.abs(Math.sin(s * 6 + q * 2)) < 0.15 ? 0.75 : 1;
          plot(e, n, y, lit([150 * ridge, 112 * ridge, 76 * ridge], [Math.cos(a) * 0.3 - Math.sin(a) * q * 0.8, Math.sin(a) * 0.3 + Math.cos(a) * q * 0.8, 0.9], 0.45));
        }
        // (the earth heaped and split where it dives and comes up)
        if (arch < 0.08 && t > 0.35) for (let w = -half * 1.4; w <= half * 1.4; w += step * 2) plot(Math.cos(a) * s - Math.sin(a) * w, Math.sin(a) * s + Math.cos(a) * w, 0.02, [48, 34, 22]);
      }
    }
    // bark sides
    for (let t = 0; t < Math.PI * 2; t += step / r) for (let y = 0; y <= h; y += step) { const furrow = hash(Math.floor(t * 18)) < 0.35 ? 0.7 : 1; plot(Math.cos(t) * r, Math.sin(t) * r, y, lit([82 * furrow, 58 * furrow, 40 * furrow], [Math.cos(t), Math.sin(t), 0], 0.35)); }
    // the sawn top: rings, cracks, heartwood
    for (let e = -r; e <= r; e += step) for (let n = -r; n <= r; n += step) { const p = Math.hypot(e, n); if (p > r) continue; const ring = Math.floor(p * 5.2 + Math.sin(Math.atan2(n, e) * 3) * 0.3) % 2, crack = Math.abs(Math.sin(Math.atan2(n, e) * 2.5 + 0.4)) < 0.03 && p > 0.4; let c = ring ? [196, 160, 112] : [172, 136, 92]; if (p > r - 0.18) c = [120, 88, 60]; if (crack) c = [70, 50, 34]; if (p < 0.55) c = mix(c, [235, 170, 80], 0.55); if (n > r * 0.55 && p > r - 0.5 && hash(Math.round(e * 9), Math.round(n * 9)) < 0.7) c = [70, 104, 50]; plot(e, n, h, c.map(v => v * 0.85), { top: true }); }
    glows.push([0, 0, h, 1.3, [255, 170, 70], 0.32]);
  },
  // Cold rainforest (moonpool glade): a moon pool: still dark water in a ring of mossed boulders, the moon and the sigils above it
  // mirrored in it, its edge lit cold silver.
  moonpool({ plot, lit, hash, R, step, glows }) {
    const r = R * 0.82;
    for (let e = -r; e <= r; e += step) for (let n = -r; n <= r; n += step) { const p = Math.hypot(e, n); if (p > r) continue; const k = p / r, moon = Math.hypot(e + 0.6, n - 0.9) < 0.42 ? 1 : 0; let c = [18 + 30 * k, 34 + 46 * k, 58 + 60 * k]; if (moon) c = [210, 225, 235]; if (Math.abs(Math.sin(p * 9)) < 0.05 && p > 0.6) c = c.map(v => v * 1.35); plot(e, n, 0.04, c, { water: true, top: true }); }
    // its rim: boulders, mossy on top
    for (let k = 0; k < 15; k++) { const a = (k / 15) * Math.PI * 2 + hash(k) * 0.2, rr = 0.42 + 0.18 * hash(k, 2), cx = Math.cos(a) * (r + 0.15), cn = Math.sin(a) * (r + 0.15); for (let e = -rr; e <= rr; e += step) for (let n = -rr; n <= rr; n += step) { const q = Math.hypot(e, n); if (q > rr) continue; const y = Math.sqrt(1 - (q / rr) ** 2) * rr * 0.75, nr = [e / rr, n / rr, y / rr]; plot(cx + e, cn + n, y, lit(y > rr * 0.45 ? [88, 120, 70] : [104, 104, 112], nr)); } }
    glows.push([0, 0, 0.1, 2.8, [150, 200, 255], 0.22]);
  },
  // Jungle (river jungle): a rafflesia, the world's biggest flower, five warty red petals round an open cup whose spiked heart glows.
  rafflesia({ plot, lit, mix, hash, R, step, glows }) {
    const r = R * 0.95;
    for (let e = -r; e <= r; e += step) for (let n = -r; n <= r; n += step) {
      const p = Math.hypot(e, n), a = Math.atan2(n, e), lobe = 0.72 + 0.28 * Math.cos(5 * (a - 0.3)); if (p > r * lobe) continue;
      const k = p / (r * lobe), cup = p < r * 0.38;
      let y = cup ? 0.55 : 0.55 * (1 - k) + 0.12, c = [178, 46, 40];
      const wart = hash(Math.round(e * 6.5), Math.round(n * 6.5)) > 0.78 && !cup && k < 0.92; if (wart) c = [232, 214, 196];
      if (Math.abs(Math.sin(5 * (a - 0.3) / 2)) < 0.04 && !cup) c = [110, 26, 24];
      if (cup) { const q = p / (r * 0.38); y = 0.55 - 0.25 * (1 - q); c = q > 0.82 ? [214, 196, 180] : q > 0.3 ? mix([120, 40, 40], [60, 18, 22], 1 - q) : [255, 150, 120]; if (q < 0.3 && hash(Math.round(e * 12), Math.round(n * 12)) > 0.55) c = [255, 210, 170]; }
      plot(e, n, y, lit(c, [e * 0.1, n * 0.1, 1], 0.6), { top: !cup });
    }
    glows.push([0, 0, 0.5, 1.1, [255, 120, 90], 0.4]);
  },
  // Volcanic (cinder slopes): basalt columns, a tight cluster of hexagonal pillars stepping up to the middle, magma glowing in the
  // joints between them.
  basalt({ plot, lit, hash, R, step, glows }) {
    const s = 0.95, cols = [];
    for (let q = -6; q <= 6; q++) for (let rr = -6; rr <= 6; rr++) { const e = s * 1.5 * q, n = s * Math.sqrt(3) * (rr + q / 2), d = Math.hypot(e, n); if (d > R * 0.92) continue; cols.push({ e, n, h: 0.3 + 1.6 * (1 - d / R) * (0.55 + 0.45 * hash(q, rr)) }); }
    const inHex = (x, y, r) => { x = Math.abs(x); y = Math.abs(y); return y <= r * 0.866 && x * 0.866 + y * 0.5 <= r * 0.866; };
    // magma in the joints: the floor under them
    for (let e = -R; e <= R; e += step) for (let n = -R; n <= R; n += step) if (Math.hypot(e, n) < R * 0.95) plot(e, n, 0.02, [255, 130 + 70 * hash(Math.round(e * 5), Math.round(n * 5)), 50], { top: false });
    for (const c of cols) {
      const r0 = s * 0.86;
      for (let x = -r0; x <= r0; x += step) for (let y = -r0; y <= r0; y += step) if (inHex(x, y, r0)) { const edge = !inHex(x, y, r0 - 0.1); plot(c.e + x, c.n + y, c.h, edge ? [120, 124, 136] : [74 + 10 * hash(c.e, c.n), 78, 92], { top: true }); }
      for (let k = 0; k < 6; k++) { const a0 = (k / 6) * Math.PI * 2, a1 = ((k + 1) / 6) * Math.PI * 2, nx = Math.cos((a0 + a1) / 2), nz = Math.sin((a0 + a1) / 2); for (let t = 0; t <= 1; t += 0.06) for (let y = 0; y <= c.h; y += step) { const x = r0 * (Math.cos(a0) + (Math.cos(a1) - Math.cos(a0)) * t), z = r0 * (Math.sin(a0) + (Math.sin(a1) - Math.sin(a0)) * t); plot(c.e + x, c.n + z, y, lit([62, 64, 76], [nx, nz, 0], 0.4)); } }
    }
    glows.push([0, 0, 0.2, 3.2, [255, 110, 40], 0.3]);
  },
  // Cold (snowy taiga): a frozen spring, a low dome of clear blue ice heaved up out of the snow, cracked, the moonlight caught inside it.
  icedome({ plot, lit, mix, hash, R, step, glows }) {
    const r = R * 0.85, h = 0.85;
    for (let e = -R; e <= R; e += step) for (let n = -R; n <= R; n += step) { const p = Math.hypot(e, n); if (p > r * 1.12 || p < r * 0.9) continue; plot(e, n, 0.18 * (1 - Math.abs(p - r) / (r * 0.12)), lit([210, 220, 232], [e, n, 1])); }
    for (let e = -r; e <= r; e += step) for (let n = -r; n <= r; n += step) { const p = Math.hypot(e, n); if (p > r) continue; const y = h * (1 - (p / r) ** 2), nr = [2 * h * e / (r * r), 2 * h * n / (r * r), 1]; let c = mix([40, 96, 150], [120, 190, 225], 1 - p / r); const crack = Math.abs(Math.sin(e * 3.1 + Math.sin(n * 2.3) * 1.5)) < 0.05 || Math.abs(Math.sin(n * 2.7 - e)) < 0.04; if (crack) c = [200, 240, 255]; if (hash(Math.round(e * 8), Math.round(n * 8)) > 0.93) c = [235, 250, 255]; plot(e, n, y, lit(c, nr, 0.65), { top: true }); }
    glows.push([0, 0, 0.6, 2.2, [120, 210, 255], 0.28]);
  },
  // Mountains and glaciers (crags): a moss campion cushion, the alpine plant that grows as one tight dome, here a giant, starred with
  // magenta flowers whose hearts glow faintly.
  cushion({ plot, lit, hash, R, step, glows }) {
    const r = R * 0.88, h = 1.15;
    for (let e = -r; e <= r; e += step) for (let n = -r; n <= r; n += step) { const p = Math.hypot(e, n); if (p > r) continue; const bump = 0.06 * Math.sin(e * 9) * Math.sin(n * 9), y = h * Math.pow(1 - (p / r) ** 2, 0.55) + bump, nr = [e / r, n / r, 1.2]; const fl = hash(Math.round(e * 7), Math.round(n * 7)) > 0.8; let c = fl ? [230, 70, 170] : hash(Math.round(e * 14), Math.round(n * 14)) > 0.5 ? [64, 120, 52] : [48, 96, 44]; if (fl && hash(Math.round(e * 7), Math.round(n * 7), 3) > 0.7) { c = [255, 200, 240]; } plot(e, n, y, lit(c, nr, 0.55), { top: !fl }); }
    for (let k = 0; k < 14; k++) { const a = hash(k, 5) * Math.PI * 2, p = Math.sqrt(hash(k, 6)) * r * 0.8; glows.push([Math.cos(a) * p, Math.sin(a) * p, h * 0.8, 0.35, [255, 120, 220], 0.35]); }
  },
  // Badlands (red canyon): a geode cracked open, a rough brown rind round a bowl of violet crystal points glowing from within.
  geode({ plot, lit, mix, hash, R, step, glows }) {
    const r = R * 0.86, rim = 0.75;
    for (let e = -r; e <= r; e += step) for (let n = -r; n <= r; n += step) {
      const p = Math.hypot(e, n), a = Math.atan2(n, e), wob = 1 + 0.06 * Math.sin(a * 7) + 0.04 * Math.sin(a * 13); if (p > r * wob) continue;
      const k = p / (r * wob);
      if (k > 0.78) { const y = rim * (1 - Math.abs(k - 0.9) / 0.12) * (0.85 + 0.15 * hash(Math.round(a * 20))), c = k > 0.86 ? [206, 190, 168] : [238, 228, 214]; plot(e, n, Math.max(0.05, y), lit(c, [Math.cos(a), Math.sin(a), 0.8]), { top: true }); continue; }
      const cell = Math.floor(e * 4) * 31 + Math.floor(n * 4), spike = hash(cell) * 0.35, y = 0.15 + (k * 0.5) + spike * (1 - k) * 0.6;
      let c = mix([200, 150, 255], [90, 40, 150], k); if (hash(cell, 2) > 0.85) c = [240, 220, 255]; plot(e, n, y, lit(c, [0.3 - e * 0.1, 0.2 - n * 0.1, 1], 0.7));
    }
    glows.push([0, 0, 0.3, 2.0, [190, 120, 255], 0.38]);
  },
  // Hot (savanna): a salt pan, a round crust of white salt cracked into polygons, its crystals glinting in the moonlight.
  saltpan({ plot, lit, hash, R, step, glows }) {
    const r = R * 0.98;
    // a little raised (the crust's lip) at its edge
    const sites = []; for (let k = 0; k < 26; k++) { const a = hash(k, 1) * Math.PI * 2, p = Math.sqrt(hash(k, 2)) * r; sites.push([Math.cos(a) * p, Math.sin(a) * p]); }
    for (let e = -r; e <= r; e += step) for (let n = -r; n <= r; n += step) {
      const p = Math.hypot(e, n), a = Math.atan2(n, e), wob = 1 + 0.07 * Math.sin(a * 5 + 1) + 0.04 * Math.sin(a * 11); if (p > r * wob) continue;
      let d1 = 1e9, d2 = 1e9; for (const s of sites) { const d = Math.hypot(e - s[0], n - s[1]); if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) d2 = d; }
      const seam = d2 - d1 < 0.07, lip = p > r * wob - 0.2;
      let c = seam ? [84, 76, 64] : [214, 212, 204]; if (lip) c = [190, 184, 172]; if (!seam && hash(Math.round(e * 10), Math.round(n * 10)) > 0.97) c = [255, 255, 250]; // (its glints: the only light it gives)
      plot(e, n, seam ? 0.03 : lip ? 0.16 : 0.1, c, { top: !seam });
    }
    for (let k = 0; k < 10; k++) { const a = hash(k, 8) * Math.PI * 2, p = Math.sqrt(hash(k, 9)) * r * 0.85; glows.push([Math.cos(a) * p, Math.sin(a) * p, 0.1, 0.25, [255, 255, 240], 0.45]); }
  },
  // Mangrove swamp (mangrove pools): a giant water-lily pad, its rim turned up, veined, floating on a ring of dark water, one
  // flower at its heart opening pale and glowing.
  lilypad({ plot, lit, mix, hash, R, step, glows }) {
    const r = R * 0.8;
    for (let e = -R; e <= R; e += step) for (let n = -R; n <= R; n += step) { const p = Math.hypot(e, n); if (p > R || p < r) continue; plot(e, n, 0.02, [20, 34, 34], { water: true }); }
    for (let e = -r; e <= r; e += step) for (let n = -r; n <= r; n += step) {
      const p = Math.hypot(e, n), a = Math.atan2(n, e); if (p > r) continue;
      const vein = Math.abs(Math.sin(a * 11)) < 0.06 && p > 0.6, rim = p > r - 0.28;
      let c = rim ? [120, 40, 60] : mix([70, 140, 60], [96, 168, 72], 1 - p / r); if (vein) c = [46, 100, 44];
      plot(e, n, rim ? 0.32 : 0.12, lit(c, rim ? [e, n, 0.4] : [0, 0, 1], 0.6), { top: !rim && !vein });
    }
    // the flower: pointed petals, white to pink, its heart gold
    for (let e = -0.8; e <= 0.8; e += step * 0.7) for (let n = -0.8; n <= 0.8; n += step * 0.7) { const p = Math.hypot(e, n), a = Math.atan2(n, e), petal = 0.55 + 0.25 * Math.abs(Math.cos(4 * a)); if (p > petal) continue; const c = p < 0.2 ? [255, 210, 90] : mix([255, 240, 245], [235, 120, 170], p / petal); plot(e, n, 0.25 + 0.35 * (1 - p / petal), c); }
    glows.push([0, 0, 0.5, 1.4, [255, 200, 220], 0.35]);
  },
};

// ---- the surrounds: the ground round each piece, blending it into its floor ----
// scatter: points on a jittered grid in the ring from a to b metres out, more of them nearer (dithered: whole pixels, no fades);
// apron: the ground just round its foot, its floor darkened and tinted toward the piece (a contact shadow, damp, worn)
function scatter(ctx, a, b, cell, dens, fn) {
  const { hash } = ctx;
  for (let e = -b; e <= b; e += cell) for (let n = -b; n <= b; n += cell) {
    const je = e + (hash(Math.round(e * 31), Math.round(n * 31), 7) - 0.5) * cell, jn = n + (hash(Math.round(e * 31), Math.round(n * 31), 8) - 0.5) * cell;
    const p = Math.hypot(je, jn); if (p < a || p > b) continue;
    const t = (p - a) / (b - a);
    if (hash(Math.round(je * 53), Math.round(jn * 53), 9) < dens * Math.pow(1 - t, 1.6)) fn(je, jn, t, hash(Math.round(je * 17), Math.round(jn * 17), 4));
  }
}
function apron(ctx, a, b, tint, k = 0.45) {
  const { plot, mix, hash, floor } = ctx, c = mix(floor, tint, 0.5).map(v => v * 0.7);
  for (let e = -b; e <= b; e += 0.06) for (let n = -b; n <= b; n += 0.06) { const p = Math.hypot(e, n); if (p < a || p > b) continue; const t = (p - a) / (b - a); if (hash(Math.round(e * 20), Math.round(n * 20), 11) < k * (1 - t)) plot(e, n, 0.003, c); }
}
const blob = (ctx, e0, n0, r, y, col) => { const { plot } = ctx; for (let e = -r; e <= r; e += 0.05) for (let n = -r; n <= r; n += 0.05) if (Math.hypot(e, n) <= r) plot(e0 + e, n0 + n, y * (1 - (Math.hypot(e, n) / r) ** 2), col); };
const SURROUNDS = {
  stump(ctx) {
    const { plot, mix, floor, R } = ctx;
    apron(ctx, R * 0.75, R * 1.35, [60, 40, 26]);
    // sawdust and chips, pale, thinning out; moss and dead leaves further
    scatter(ctx, R * 0.8, R + 1.6, 0.22, 0.75, (e, n, t, h) => blob(ctx, e, n, 0.08 + 0.06 * h, 0.03, h > 0.5 ? [176, 140, 94] : [140, 108, 70]));
    scatter(ctx, R * 0.9, R + 3.0, 0.35, 0.5, (e, n, t, h) => blob(ctx, e, n, 0.16 + 0.12 * h, 0.04, h > 0.6 ? [62, 92, 46] : mix(floor, [92, 60, 36], 0.6)));
  },
  moonpool(ctx) {
    const { mix, floor, R } = ctx;
    apron(ctx, R * 0.9, R * 1.5, [30, 46, 40], 0.7);
    scatter(ctx, R * 1.0, R + 2.4, 0.3, 0.6, (e, n, t, h) => blob(ctx, e, n, 0.15 + 0.15 * h, h > 0.55 ? 0.25 : 0.06, h > 0.55 ? [96, 100, 108] : [64, 104, 58]));
    scatter(ctx, R * 1.0, R + 1.5, 0.5, 0.45, (e, n, t, h) => { for (let k = 0; k < 4; k++) blob(ctx, e + (k - 1.5) * 0.08, n, 0.04, 0.6 + 0.3 * h, [70, 112, 66]); }); // reeds
  },
  icedome(ctx) {
    const { mix, floor, R } = ctx;
    // drifts of snow fading into the ground, ice shards
    scatter(ctx, R * 0.9, R + 2.8, 0.18, 0.95, (e, n, t, h) => blob(ctx, e, n, 0.12 + 0.12 * h, 0.05, mix([226, 232, 240], floor, t * 0.6)));
    scatter(ctx, R * 0.95, R + 1.8, 0.45, 0.4, (e, n, t, h) => blob(ctx, e, n, 0.1 + 0.08 * h, 0.25, [130, 200, 235]));
  },
  cushion(ctx) {
    const { R } = ctx;
    apron(ctx, R * 0.85, R * 1.25, [40, 70, 40]);
    // young cushions round it, and scree
    scatter(ctx, R * 0.95, R + 2.6, 0.7, 0.55, (e, n, t, h) => blob(ctx, e, n, 0.25 + 0.3 * h * (1 - t), 0.3 * (1 - t), h > 0.8 ? [210, 80, 170] : [60, 108, 50]));
    scatter(ctx, R * 0.9, R + 3.0, 0.3, 0.5, (e, n, t, h) => blob(ctx, e, n, 0.1 + 0.1 * h, 0.08, h > 0.5 ? [138, 136, 132] : [104, 100, 98]));
  },
  rafflesia(ctx) {
    const { plot, mix, floor, R, hash } = ctx;
    apron(ctx, R * 0.85, R * 1.3, [50, 30, 20]);
    // its host vine running off under the litter, fallen petal bits, dark leaf litter
    for (let k = 0; k < 3; k++) { let a = k * 2.1 + 0.4, e = Math.cos(a) * R * 0.8, n = Math.sin(a) * R * 0.8; for (let s = 0; s < 70; s++) { a += (hash(k, s) - 0.5) * 0.25; e += Math.cos(a) * 0.06; n += Math.sin(a) * 0.06; blob(ctx, e, n, 0.09, 0.08, [70, 52, 34]); } }
    scatter(ctx, R * 0.9, R + 2.0, 0.4, 0.45, (e, n, t, h) => blob(ctx, e, n, 0.1 + 0.08 * h, 0.03, h > 0.6 ? [150, 40, 36] : mix(floor, [40, 58, 30], 0.7)));
  },
  basalt(ctx) {
    const { mix, floor, R, glows } = ctx;
    apron(ctx, R * 0.85, R * 1.4, [30, 28, 34], 0.7);
    // broken stubs and cinders, ash, a few glowing cracks in the ground
    scatter(ctx, R * 0.95, R + 2.2, 0.75, 0.5, (e, n, t, h) => blob(ctx, e, n, 0.3 + 0.2 * h, 0.35 * (1 - t), [70, 72, 84]));
    scatter(ctx, R * 0.9, R + 3.0, 0.2, 0.7, (e, n, t, h) => blob(ctx, e, n, 0.06 + 0.05 * h, 0.03, h > 0.93 ? [255, 120, 40] : h > 0.5 ? [44, 42, 48] : mix(floor, [110, 106, 104], 0.5)));
  },
  lilypad(ctx) {
    const { R } = ctx;
    // the water spreading into mud, small pads on it
    apron(ctx, R * 0.98, R * 1.4, [24, 34, 30], 0.8);
    scatter(ctx, R * 0.98, R + 2.0, 0.7, 0.5, (e, n, t, h) => blob(ctx, e, n, 0.25 + 0.25 * h * (1 - t), 0.05, h > 0.85 ? [220, 120, 160] : [70, 130, 58]));
  },
  saltpan(ctx) {
    const { mix, floor, R } = ctx;
    // the crust breaking up into plates and flecks, the mud between darker
    apron(ctx, R * 0.95, R * 1.3, [110, 96, 80], 0.6);
    scatter(ctx, R * 0.95, R + 2.8, 0.32, 0.9, (e, n, t, h) => blob(ctx, e, n, 0.12 + 0.2 * h * (1 - t), 0.04, mix([238, 236, 228], floor, t * 0.5)));
  },
  geode(ctx) {
    const { R } = ctx;
    apron(ctx, R * 0.85, R * 1.3, [104, 58, 44]);
    // pale rind rubble and fallen crystal points
    scatter(ctx, R * 0.9, R + 2.4, 0.4, 0.6, (e, n, t, h) => blob(ctx, e, n, 0.14 + 0.16 * h, 0.12, [168, 150, 138]));
    scatter(ctx, R * 0.9, R + 1.6, 0.5, 0.45, (e, n, t, h) => blob(ctx, e, n, 0.08 + 0.06 * h, 0.2, h > 0.5 ? [200, 150, 255] : [150, 100, 220]));
  },
};

// ---- the wide surround: out to five times its radius ----
function wide(ctx, W) {
  const { mix, floor, R, hash } = ctx, out = R * 5;
  // its ground, in soft patches (dithered), the tint fading with distance
  scatter(ctx, R * 1.05, R * 3, 0.55, 0.35, (e, n, t, h) => { for (let q = 0; q < 3; q++) { const r = 0.14 + 0.24 * hash(h * 9, q), oe = (hash(h * 7, q, 1) - 0.5) * 0.6, on = (hash(h * 5, q, 2) - 0.5) * 0.4; for (let a = -r; a <= r; a += 0.05) for (let b = -r; b <= r; b += 0.05) { const d = Math.hypot(a, b) / r; if (d <= 1 && hash(Math.round((e + oe + a) * 20), Math.round((n + on + b) * 20), 7) > 0.35 + 0.5 * d) ctx.plot(e + oe + a, n + on + b, 0, W.tint, { alpha: 0.32 * (1 - t) }); } } });
  // its kin: smaller relatives, fewer further out
  scatter(ctx, R * 1.4, out * 0.9, 3.2, 0.5, (e, n, t, h) => W.kin(ctx, e, n, 0.5 + 0.5 * (1 - t), h));
}
const disc = (ctx, e0, n0, r, y, top, side) => { const { plot } = ctx; for (let a = 0; a < Math.PI * 2; a += 0.05 / r) for (let yy = 0; yy <= y; yy += 0.04) plot(e0 + Math.cos(a) * r, n0 + Math.sin(a) * r, yy, side); for (let e = -r; e <= r; e += 0.04) for (let n = -r; n <= r; n += 0.04) if (Math.hypot(e, n) <= r) plot(e0 + e, n0 + n, y, top); };
const WIDE = {
  // (a great tree's leavings: fallen boughs and logs, mossed, lying every way)
  stump: { tint: [60, 84, 42], kin: (c, e, n, k, h) => { const a = h * Math.PI * 2, L = 1.2 + 2.2 * k * c.hash(h * 13, 3), rr = 0.12 + 0.18 * k; for (let s = -L / 2; s <= L / 2; s += 0.05) { const x = e + Math.cos(a) * s, z = n + Math.sin(a) * s; for (let w = -rr; w <= rr; w += 0.05) { const y = Math.sqrt(Math.max(0, rr * rr - w * w)); c.plot(x - Math.sin(a) * w, z + Math.cos(a) * w, y, c.hash(Math.round(s * 4), Math.round(w * 9)) > 0.75 ? [70, 100, 50] : [120, 88, 60]); } } } },
  moonpool: { tint: [34, 52, 46], kin: (c, e, n, k, h) => { blob(c, e, n, 0.55 * k + 0.2, 0.012, [28, 46, 70]); blob(c, e - 0.15, n + 0.1, 0.12, 0.014, [170, 190, 210]); } },
  icedome: { tint: [176, 186, 200], kin: (c, e, n, k, h) => blob(c, e, n, 0.4 * k + 0.15, 0.3 * k, h > 0.5 ? [110, 180, 220] : [200, 225, 240]) },
  cushion: { tint: [116, 114, 110], kin: (c, e, n, k, h) => { blob(c, e, n, 0.5 * k + 0.15, 0.35 * k, [58, 104, 48]); if (h > 0.4) blob(c, e + 0.1, n - 0.05, 0.07, 0.36 * k, [220, 80, 170]); } },
  rafflesia: { tint: [62, 46, 28], kin: (c, e, n, k, h) => { blob(c, e, n, 0.35 * k + 0.1, 0.25 * k, [120, 34, 30]); blob(c, e, n, 0.1, 0.27 * k, [200, 170, 150]); } },
  basalt: { tint: [66, 64, 70], kin: (c, e, n, k, h) => { disc(c, e, n, 0.35 * k + 0.15, 0.5 * k, [84, 86, 98], [56, 58, 68]); if (h > 0.6) blob(c, e + 0.3, n, 0.06, 0.02, [255, 120, 40]); } },
  lilypad: { tint: [30, 40, 34], kin: (c, e, n, k, h) => { blob(c, e, n, 0.6 * k + 0.2, 0.01, [22, 34, 32]); blob(c, e, n, 0.35 * k + 0.1, 0.04, h > 0.85 ? [220, 120, 160] : [74, 136, 60]); } },
  saltpan: { tint: [168, 150, 120], kin: (c, e, n, k, h) => blob(c, e, n, 0.5 * k + 0.2, 0.05, [210, 208, 200]) },
  geode: { tint: [150, 82, 56], kin: (c, e, n, k, h) => { blob(c, e, n, 0.3 * k + 0.1, 0.15, [176, 104, 72]); for (let j = 0; j < 3; j++) blob(c, e + (j - 1) * 0.1, n, 0.05, 0.3 * k + 0.1 * j, [190, 140, 250]); } },
};
