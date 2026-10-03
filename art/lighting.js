// Witch lighting: the deferred pass that lights baked sprites at night.
// `tgt` holds an albedo and a normal canvas ({a, n} 2D contexts, w, h); `out` is the canvas
// the lit image is written to. Twilight, moonlight and point lights, in steps (light bands).
import { hsv2rgb } from "./generator.js";

export function shade(tgt, out, st, lights, rect, K = 2 / (st.pixel || 2)) { // K: world scale, 2 / pixel size
  const [rx, ry, rw, rh] = rect || [0, 0, tgt.w, tgt.h];
  const A = tgt.a.getImageData(rx, ry, rw, rh).data, Nn = tgt.n.getImageData(rx, ry, rw, rh).data;
  const oc = out.getContext("2d"), img = oc.createImageData(rw, rh), O = img.data;
  const amb = hsv2rgb(st.ambientHue, .55, 1).map(v => v / 255 * st.ambient), moon = hsv2rgb(st.moonHue, .35, 1).map(v => v / 255 * st.moon);
  const ml = [-.45, -.75, .5], mll = Math.hypot(...ml), bands = st.bands, dz = st.dither * .5;
  const step = (f, x, y) => { let q = f * bands; const fr = q - Math.floor(q); if (dz && Math.abs(fr - .5) < dz * .5) q += ((x + y) & 1) ? .5 : -.5; return Math.floor(q) / bands; };
  for (let y = 0; y < rh; y++) for (let x = 0; x < rw; x++) {
    const o = (y * rw + x) * 4;
    const nx = (Nn[o] - 128) / 127, ny = (Nn[o + 1] - 128) / 127, nz = Nn[o + 2] / 255;
    if (A[o + 3] === 254) { O[o] = A[o]; O[o + 1] = A[o + 1]; O[o + 2] = A[o + 2]; O[o + 3] = 255; continue; } // eye glints and flowers glow
    let lr = amb[0], lg = amb[1], lb = amb[2];
    const md = Math.max(0, (nx * ml[0] + ny * ml[1] + nz * ml[2]) / mll), ms = step(md, x, y);
    lr += moon[0] * ms; lg += moon[1] * ms; lb += moon[2] * ms;
    if (st.shafts > 0) { const sh = ((x + rx) + (y + ry) * .9) % (150 * K); if (sh < 34 * K && ((x + y) & 1 || sh > 4 * K && sh < 30 * K)) { const k = st.shafts * .5; lr += moon[0] / Math.max(.01, st.moon) * k * .5; lg += moon[1] / Math.max(.01, st.moon) * k * .5; lb += moon[2] / Math.max(.01, st.moon) * k * .5; } }
    const gx = x + rx, gy = y + ry;
    for (const L of lights) {
      const vx = L.x - gx, vy = L.y - gy, d = Math.hypot(vx, vy, L.z);
      if (d > L.R) continue;
      const ndl = Math.max(0, (nx * vx + ny * vy + nz * L.z) / d), fall = 1 - d / L.R, f = step(Math.min(1, ndl * fall * fall * L.power), gx, gy);
      lr += L.rgb[0] / 255 * f; lg += L.rgb[1] / 255 * f; lb += L.rgb[2] / 255 * f;
    }
    O[o] = Math.min(255, A[o] * lr * 1.25); O[o + 1] = Math.min(255, A[o + 1] * lg * 1.25); O[o + 2] = Math.min(255, A[o + 2] * lb * 1.25); O[o + 3] = 255;
  }
  oc.putImageData(img, 0, 0);
}

