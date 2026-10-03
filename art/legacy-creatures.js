// The first lab's creature drawing (stacked ellipses), kept for the species the art
// pass has not redrawn yet. Each species leaves this file as it gets its new drawing.
import { M, Sprite, rng, uni, hash2 } from "./core.js";

export function legacyCritter(S, level, frame, st) {
  const spId = S.id, r = rng(spId.length * 977 + level * 31 + spId.charCodeAt(0));
  const size = Math.round(st.size * Math.pow(Math.sqrt(st.growth), level));
  const W = Math.round(size * 1.9 + 14), H = Math.round(size * 1.7 + 12), sp = new Sprite(W, H);
  const rd = st.round, young = [1, .55, .25][level], legend = level === 2, has = f => legend && S.legend.includes(f);
  const cx = W / 2 - size * .1;
  let head = null; // {x, y, r}
  const lw = v => Math.max(1, v);

  if (S.plan === "quad") {
    const bw = size * S.bw * st.long * (1 - young * .12), bh = size * S.bh * (1 + young * .3), legLen = size * S.leg * st.legs * (1 - young * .35);
    const cy = H - legLen - bh * .65 - 1, legW = lw(size * S.legW);
    if (has("wings")) { for (let i = 0; i < 4; i++) sp.ellipse(cx - bw * (.1 + i * .25), cy - bh * (1.5 + i * .25) , bw * (.8 - i * .1), bh * (.7 - i * .08), M.MAGIC, { round: rd }); }
    if (has("tails")) for (let i = 0; i < 5; i++) { const a = Math.PI * (1.05 + i * .13); sp.line(cx - bw * .9, cy - bh * .1, cx - bw * .9 + Math.cos(a) * bw * 1.2, cy - bh * .1 + Math.sin(a) * bw * 1.1, size * .1, size * .05, i % 2 ? M.MAGIC : M.BODY, rd); sp.ellipse(cx - bw * .9 + Math.cos(a) * bw * 1.2, cy - bh * .1 + Math.sin(a) * bw * 1.1, size * .06, size * .06, M.BELLY, { round: rd }); }
    // tail
    const tx = cx - bw * .95, ty = cy - bh * .1;
    if (S.tail === "up") sp.line(tx, ty, tx - bw * .45, ty - bh * (1.1 + frame * .1), lw(size * .08), lw(size * .03), M.BODY, rd);
    else if (S.tail === "bushy" && !has("tails")) { sp.line(tx, ty, tx - bw * .7, ty + bh * .4, lw(size * .12), lw(size * .09), M.BODY, rd); sp.ellipse(tx - bw * .75, ty + bh * .45, size * .06 + 1, size * .05 + 1, M.BELLY, { round: rd }); }
    else if (S.tail === "squirrel") { for (let i = 0; i < 7; i++) { const f = i / 6; sp.ellipse(tx - bw * (.3 + Math.sin(f * 2.6) * .5), ty - bh * (f * 2.4), size * (.09 + .04 * Math.sin(f * 3)) + 1, size * .08 + 1, has("starTail") && i % 2 ? M.MAGIC : M.BODY, { round: rd }); } }
    else if (S.tail === "thin") sp.line(tx, ty - bh * .2, tx - bw * .25, ty + bh * .5, 1, 1, M.BODY, rd);
    else if (S.tail === "long") sp.line(tx, ty, tx - bw * .9, ty + bh * .6, lw(size * .06), 1, M.BODY, rd);
    else if (S.tail === "flat") sp.ellipse(tx - bw * .35, ty + bh * .55, bw * .4, bh * .2, M.BODY2, { round: rd });
    else if (S.tail === "puff") sp.ellipse(tx, ty - bh * .2, size * .06 + 1, size * .06 + 1, M.BELLY, { round: rd });
    else sp.ellipse(tx, ty - bh * .1, size * .04 + 1, size * .035 + 1, M.BODY, { round: rd });
    // legs, two frames of walk
    [cx - bw * .65, cx - bw * .4, cx + bw * .45, cx + bw * .7].forEach((lx, i) => {
      const ph = (i + frame) % 2, swing = (ph ? 1 : -1) * size * .05, lift = ph ? lw(size * .025) : 0;
      sp.line(lx, cy + bh * .2, lx + swing * .5, cy + bh * .2 + legLen * .55, legW * 1.3, legW, M.BODY, rd);
      sp.line(lx + swing * .5, cy + bh * .2 + legLen * .55, lx + swing, H - 1 - lift, legW, legW * .85, i < 2 ? M.BODY : M.BODY, rd);
    });
    sp.ellipse(cx, cy, bw, bh, M.BODY, { round: rd });
    sp.ellipse(cx + bw * .45, cy - bh * .08, bw * .55, bh * 1.05, M.BODY, { round: rd });
    sp.ellipse(cx + bw * .1, cy + bh * .5, bw * .7, bh * .38, M.BELLY, { onlyOn: new Set([M.BODY]), round: rd });
    if (S.ridge && level >= 1) for (let i = 0; i < 5 + level * 3; i++) { const f = i / (4 + level * 3); sp.tri([[cx - bw * .7 + f * bw * 1.4, cy - bh * .85], [cx - bw * .62 + f * bw * 1.4, cy - bh * (1.25 + .15 * level)], [cx - bw * .5 + f * bw * 1.4, cy - bh * .85]], M.BODY2); }
    if (has("moss")) { for (let i = 0; i < 9; i++) sp.ellipse(cx - bw * .7 + i * bw * .18, cy - bh * (.95 + (i % 3) * .12), bw * .14, bh * .22, i % 3 ? M.LEAF : M.LEAF2, { round: rd, density: .9 }); for (let i = 0; i < 3; i++) { const x = cx - bw * .4 + i * bw * .4; sp.line(x, cy - bh, x, cy - bh * 2.1, 2, 1, M.BODY2, rd); sp.ellipse(x, cy - bh * 2.2, bw * .14, bh * .35, M.LEAF, { round: rd, density: .85 }); } }
    if (has("crystals")) for (let i = 0; i < 6; i++) { const x = cx - bw * .6 + i * bw * .25; sp.tri([[x - size * .03, cy - bh * .8], [x, cy - bh * (1.4 + (i % 2) * .4)], [x + size * .03, cy - bh * .8]], M.MAGIC); }
    if (has("ribbons")) for (let i = 0; i < 3; i++) for (let j = 0; j < 30; j++) { const f = j / 29; sp.put(cx - bw + f * bw * 2, cy - bh * (1.3 + i * .35) + Math.sin(f * 7 + i + frame) * bh * .25, M.MAGIC); }
    // neck and head
    const hr = size * S.head * (1 + young * .65) * (st.head / .44), hx = cx + bw * 1.05, hy = cy - bh * S.headUp;
    if (has("mane")) for (let i = 0; i < 7; i++) sp.ellipse(hx - hr * (.9 + i * .35), hy + hr * (.1 + i * .25), hr * .6, hr * .45, M.MAGIC, { round: rd });
    sp.line(cx + bw * .6, cy - bh * .2, hx, hy, hr * 1.3, hr * 1.1, M.BODY, rd);
    sp.ellipse(hx, hy, hr, hr * .9, M.BODY, { round: rd });
    const sl = hr * S.snout * (1 - young * .45);
    sp.ellipse(hx + hr * .7 + sl * .4, hy + hr * .25, sl * .9 + 1, hr * .48, S.face === "badger" ? M.BELLY : M.BODY, { round: rd });
    sp.put(hx + hr * .7 + sl * 1.25, hy + hr * .12, M.EYE);
    if (S.face === "badger") sp.line(hx - hr * .7, hy - hr * .75, hx + hr * .9, hy, lw(hr * .35), lw(hr * .2), M.BELLY, rd);
    if (S.teeth) sp.line(hx + hr * .7 + sl * 1.05, hy + hr * .55, hx + hr * .7 + sl * 1.05, hy + hr * .55 + lw(size * .04), lw(size * .025), lw(size * .025), M.BELLY, rd);
    if (S.tusks && level >= 1) { const t = lw(size * .025 * (level + .5)), up = has("tusksBig") ? 1.6 : .5; sp.line(hx + hr * .9, hy + hr * .5, hx + hr * (1.1 + up * .4), hy - hr * (.1 + up * .6), t, t * .6, M.ACCENT, rd); sp.line(hx + hr * (1.1 + up * .4), hy - hr * (.1 + up * .6), hx + hr * (.7 + up * .3), hy - hr * (.4 + up), t * .6, 1, M.ACCENT, rd); }
    // ears
    const E = S.ears;
    if (E === "point" || E === "big" || E === "tuft") { const k = E === "big" ? 1.4 : 1; sp.tri([[hx - hr * .65, hy - hr * .3], [hx - hr * .55, hy - hr * (1.45 + young * .3) * k], [hx - hr * .05, hy - hr * .7]], M.BODY); sp.tri([[hx - hr * .2, hy - hr * .5], [hx + hr * .05, hy - hr * (1.55 + young * .3) * k], [hx + hr * .45, hy - hr * .6]], M.BODY); if (E === "tuft") sp.line(hx + hr * .05, hy - hr * 1.55, hx + hr * .1, hy - hr * 2, 1, 1, M.BODY2, rd); }
    else if (E === "long") { sp.line(hx - hr * .3, hy - hr * .6, hx - hr * .8, hy - hr * 2.6, lw(hr * .45), lw(hr * .3), M.BODY, rd); sp.line(hx, hy - hr * .6, hx - hr * .2, hy - hr * 2.7, lw(hr * .45), lw(hr * .3), M.BODY, rd); }
    else if (E === "round") sp.ellipse(hx - hr * .45, hy - hr * .72, hr * .3, hr * .3, M.BODY, { round: rd });
    else sp.tri([[hx - hr * .5, hy - hr * .5], [hx - hr * .7, hy - hr * 1.15], [hx - hr * .1, hy - hr * .7]], M.BODY);
    // antlers
    const ant = S.antlers || (has("jackalope") ? "branch" : null);
    if (ant && (level >= 1 || has("jackalope"))) {
      const t = lw(size * .02), top = hy - hr * (1.6 + level * 1.1), mat = has("antlersGlow") ? M.MAGIC : M.ACCENT;
      if (ant === "palm") { sp.line(hx - hr * .2, hy - hr * .7, hx - hr * .6, top + hr * .6, t, t, mat, rd); sp.ellipse(hx - hr * 1.1, top + hr * .4, hr * (.8 + level * .4), hr * (.35 + level * .1), mat, { round: rd }); for (let k = 0; k < 4 + level * 2; k++) sp.line(hx - hr * (.4 + k * .35), top + hr * .2, hx - hr * (.5 + k * .38), top - hr * .25, 1, 1, mat, rd); }
      else { sp.line(hx - hr * .2, hy - hr * .7, hx - hr * .5, top, t, t * .7, mat, rd); for (let k = 1; k <= level + 1; k++) { const y = hy - hr * .7 + (top - hy + hr * .7) * k / (level + 1.5); sp.line(hx - hr * .35, y, hx - hr * (1 + k * .25), y - hr * .45, t * .8, t * .5, mat, rd); sp.line(hx - hr * .35, y, hx + hr * .3, y - hr * .55, t * .8, t * .5, mat, rd); } }
    }
    head = { x: hx, y: hy, r: hr };
    // markings
    if (size > 16 && (S.stripes || S.spots)) for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (sp.get(x, y) !== M.BODY) continue;
      const mark = S.stripes ? Math.sin((x + y * .45) / (size * .045)) > .85 - st.fur * .5 && y < cy + bh * .3 : hash2(Math.floor(x / Math.max(2, size * .05)), Math.floor(y / Math.max(2, size * .05)), 9) < st.fur * .25 && y < cy + bh * .2;
      if (mark) { const i = (y * W + x) * 3; sp.put(x, y, M.BODY2, sp.n[i], sp.n[i + 1], sp.n[i + 2]); }
    }
  } else if (S.plan === "owl" || S.plan === "raven") {
    const owl = S.plan === "owl", bw = size * (owl ? .3 : .26), bh = size * (owl ? .42 : .3), cy = H - bh - size * .12 - 1;
    if (has("wings")) for (const side of [-1, 1]) for (let i = 0; i < 4; i++) sp.ellipse(cx + side * bw * (1.1 + i * .3), cy - bh * (.3 + i * .15), bw * .5, bh * (.7 - i * .1), M.MAGIC, { round: rd });
    for (const side of [-1, 1]) sp.line(cx + side * bw * .25, cy + bh * .8, cx + side * bw * .3 + frame * side, H - 1, lw(size * .04), lw(size * .03), M.ACCENT, rd);
    if (!owl) sp.tri([[cx - bw * .6, cy + bh * .2], [cx - bw * 1.8, cy + bh * .7], [cx - bw * .4, cy + bh * .7]], M.BODY);
    sp.ellipse(cx, cy, bw, bh, M.BODY, { round: rd });
    sp.ellipse(cx + (owl ? 0 : bw * .2), cy + bh * .25, bw * .65, bh * .55, owl ? M.BELLY : M.BODY2, { onlyOn: new Set([M.BODY]), round: rd });
    sp.ellipse(cx - bw * .5, cy, bw * .5, bh * .7, M.BODY2, { onlyOn: new Set([M.BODY]), round: rd }); // folded wing
    const hr = size * (owl ? .24 : .17) * (1 + young * .5), hx = cx + (owl ? 0 : bw * .6), hy = cy - bh * .85;
    sp.ellipse(hx, hy, hr, hr * .9, M.BODY, { round: rd });
    if (owl) { sp.tri([[hx - hr * .9, hy - hr * .4], [hx - hr * 1.1, hy - hr * 1.4], [hx - hr * .4, hy - hr * .8]], M.BODY); sp.tri([[hx + hr * .9, hy - hr * .4], [hx + hr * 1.1, hy - hr * 1.4], [hx + hr * .4, hy - hr * .8]], M.BODY); sp.ellipse(hx, hy + hr * .1, hr * .75, hr * .6, M.BELLY, { round: rd, onlyOn: new Set([M.BODY]) }); }
    sp.tri([[hx + hr * (owl ? -.1 : .7), hy], [hx + hr * (owl ? .1 : 1.7), hy + hr * (owl ? .5 : .2)], [hx + hr * (owl ? .1 : .7), hy + hr * .4]], M.ACCENT);
    if (has("eyesRing")) for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; sp.put(cx + Math.cos(a) * bw * .5, cy + Math.sin(a) * bh * .4, M.MAGIC); sp.put(cx + Math.cos(a) * bw * .5 + 1, cy + Math.sin(a) * bh * .4, M.MAGIC); }
    head = { x: owl ? hx - hr * .1 : hx, y: hy, r: hr, two: owl };
  } else if (S.plan === "bat") {
    const bw = size * .16, bh = size * .2, cy = H * .45 + (frame ? -size * .05 : size * .05), span = has("wingsBig") ? 1.6 : 1;
    for (const side of [-1, 1]) for (let k = 0; k < 3; k++) { const ex = cx + side * size * (.25 + k * .17) * span, ey = cy - bh * (frame ? 1.2 : .2) + k * bh * .3; sp.tri([[cx + side * bw * .5, cy - bh * .3], [ex, ey], [cx + side * bw * .4 + side * k * size * .1 * span, cy + bh * .7]], has("wingsBig") && k === 1 ? M.MAGIC : M.BODY2); }
    sp.ellipse(cx, cy, bw, bh, M.BODY, { round: rd });
    const hr = size * .13 * (1 + young * .5), hx = cx, hy = cy - bh * .9;
    sp.ellipse(hx, hy, hr, hr, M.BODY, { round: rd });
    sp.tri([[hx - hr * .8, hy - hr * .3], [hx - hr * .9, hy - hr * 1.6], [hx - hr * .2, hy - hr * .8]], M.BODY); sp.tri([[hx + hr * .8, hy - hr * .3], [hx + hr * .9, hy - hr * 1.6], [hx + hr * .2, hy - hr * .8]], M.BODY);
    head = { x: hx, y: hy, r: hr, two: true };
  } else if (S.plan === "toad") {
    const bw = size * .4, bh = size * .27, cy = H - bh - 1 - (frame ? size * .05 : 0);
    for (const side of [-1, 1]) sp.ellipse(cx + side * bw * .7, H - size * .08, bw * .35, size * .08, M.BODY2, { round: rd });
    sp.ellipse(cx, cy, bw, bh, M.BODY, { round: rd }); sp.ellipse(cx + bw * .2, cy + bh * .45, bw * .7, bh * .4, M.BELLY, { round: rd, onlyOn: new Set([M.BODY]) });
    for (let i = 0; i < 12; i++) sp.ellipse(cx + uni(r, -bw * .7, bw * .5), cy - bh * uni(r, .1, .7), size * .025 + .6, size * .025 + .6, M.BODY2, { round: rd, onlyOn: new Set([M.BODY]) });
    const hr = size * .17 * (1 + young * .3), hx = cx + bw * .55, hy = cy - bh * .55;
    sp.ellipse(hx, hy, hr * 1.2, hr * .8, M.BODY, { round: rd });
    sp.line(hx, hy + hr * .35, hx + hr * 1.1, hy + hr * .25, 1, 1, M.BODY2, rd);
    if (has("crown")) for (let i = 0; i < 5; i++) sp.tri([[hx - hr * .9 + i * hr * .4, hy - hr * .6], [hx - hr * .7 + i * hr * .4, hy - hr * 1.6], [hx - hr * .5 + i * hr * .4, hy - hr * .6]], M.MAGIC);
    head = { x: hx + hr * .2, y: hy - hr * .3, r: hr };
  } else if (S.plan === "hedgehog") {
    const bw = size * .36, bh = size * .24, cy = H - bh - size * .06 - 1;
    for (let i = 0; i < 4; i++) sp.line(cx - bw * .5 + i * bw * .33, cy + bh * .5, cx - bw * .5 + i * bw * .33 + ((i + frame) % 2 ? 1 : -1), H - 1, lw(size * .04), lw(size * .03), M.BELLY, rd);
    for (let i = 0; i < 26 + level * 20; i++) { const a = Math.PI * (1.02 + r() * .96), d = uni(r, .7, 1.25); const x0 = cx + Math.cos(a) * bw * .6, y0 = cy + Math.sin(a) * bh * .6; sp.line(x0, y0, cx + Math.cos(a) * bw * d * 1.25, cy + Math.sin(a) * bh * d * 1.4, lw(size * .04), 1, has("crystals") && i % 4 === 0 ? M.MAGIC : M.BODY2, rd); }
    sp.ellipse(cx, cy, bw, bh, M.BODY, { round: rd, onlyOn: new Set([0, M.BELLY]) });
    const hr = size * .14 * (1 + young * .4), hx = cx + bw * .85, hy = cy + bh * .15;
    sp.ellipse(hx, hy, hr, hr * .8, M.BELLY, { round: rd }); sp.ellipse(hx + hr * .9, hy + hr * .2, hr * .45, hr * .3, M.BELLY, { round: rd }); sp.put(hx + hr * 1.35, hy + hr * .1, M.EYE);
    head = { x: hx, y: hy, r: hr };
  } else if (S.plan === "mole") {
    const bw = size * .36, bh = size * .24, cy = H - bh - 1;
    sp.ellipse(cx, cy, bw, bh, M.BODY, { round: rd });
    const hx = cx + bw * .85, hy = cy + bh * .1, hr = size * .12;
    sp.ellipse(hx, hy, hr * 1.1, hr * .7, M.BODY, { round: rd }); sp.ellipse(hx + hr * 1.1, hy + hr * .1, hr * .4, hr * .3, M.ACCENT, { round: rd });
    for (let k = 0; k < 4; k++) sp.line(hx - hr * .2 + k * 1.2, cy + bh * .6, hx + hr * .2 + k * 1.5, H - 1 - (frame && k % 2 ? 1 : 0), 1, 1, M.ACCENT, rd); // digging claws
    if (has("crown")) for (let i = 0; i < 5; i++) sp.line(cx - bw * .6 + i * bw * .3, cy - bh * .8, cx - bw * .7 + i * bw * .33, cy - bh * (1.6 + (i % 2) * .5), lw(size * .03), 1, M.MAGIC, rd);
    head = { x: hx, y: hy - hr * .2, r: hr * .6, tiny: true };
  } else if (S.plan === "beetle") {
    const bw = size * .38, bh = size * .22, cy = H - bh - size * .1 - 1;
    for (let i = 0; i < 3; i++) for (const side of [0, 1]) { const lx = cx - bw * .5 + i * bw * .5, ph = (i + side + frame) % 2; sp.line(lx, cy + bh * .4, lx + (side ? 1 : -1) * size * .07 + (ph ? 1 : 0), H - 1, lw(size * .025), 1, M.BODY2, rd); }
    sp.ellipse(cx, cy, bw, bh, M.BODY, { round: rd }); sp.line(cx - bw, cy - bh * .1, cx + bw * .6, cy - bh * .1, 1, 1, M.BODY2, rd);
    const hx = cx + bw * .95, hy = cy + bh * .05, hr = size * .1;
    sp.ellipse(hx, hy, hr, hr * .8, M.BODY2, { round: rd });
    const mlen = size * (.15 + level * .12) * (has("horn") ? 1.5 : 1);
    for (const s2 of [-1, 1]) sp.line(hx + hr * .6, hy + s2 * hr * .2, hx + hr * .6 + mlen, hy - mlen * .5 + s2 * hr * .3, lw(size * .035), 1, has("horn") ? M.MAGIC : M.ACCENT, rd);
    if (has("crystals")) for (let i = 0; i < 5; i++) sp.ellipse(cx - bw * .6 + i * bw * .3, cy - bh * .4, size * .03 + 1, size * .03 + 1, M.MAGIC, { round: rd });
    head = { x: hx, y: hy - hr * .3, r: hr * .7, tiny: true };
  }
  // eyes: big and glinting on babies
  if (head) {
    const e = head.tiny ? 1 : level === 0 ? Math.max(1, Math.round(2 * st.eye)) : Math.max(1, Math.round(size * .045 * st.eye));
    const spots = head.two ? [[head.x - head.r * .4, head.y - head.r * .1], [head.x + head.r * .4, head.y - head.r * .1]] : [[head.x + head.r * .3, head.y - head.r * .25]];
    for (const [x0, y0] of spots) {
      const ex = Math.round(x0), ey = Math.round(y0);
      for (let dx = 0; dx < e; dx++) for (let dy = 0; dy < e; dy++) sp.put(ex - dx, ey + dy, M.EYE);
      if (e >= 3) for (let dx = 0; dx < Math.ceil(e / 2); dx++) for (let dy = 0; dy < Math.ceil(e / 2); dy++) sp.put(ex - e + 1 + dx, ey + e - 1 - dy, M.PUPIL);
      if (e >= 2) sp.put(ex, ey, M.GLINT);
    }
  }
  return sp;
}
