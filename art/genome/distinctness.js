// Ed, 2026-10-30: likeness comes first; look-alikes are only review warnings.
// Compare the rendered sprite, not invented traits or names. Thresholds below
// are diagnostic heuristics, never art acceptance criteria or failure gates.
import { M } from "../core.js";
import { silhouette, silhouetteDistance, silhouetteMirror } from "./silhouette.js";

export const DISTINCTNESS_LIMITS = { silhouette: .15, palette: .18, size: .15, pattern: .12 };
const COAT = new Set([M.BODY, M.BODYL, M.BODY2, M.BODY3, M.BELLY, M.ACCENT]);
const GRID = 8;

export function appearanceSignature(sp, colours) {
  let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1;
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) {
    x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
  }
  const width = Math.max(0, x1 - x0 + 1), height = Math.max(0, y1 - y0 + 1);
  const palette = Array(64).fill(0), mean = [0, 0, 0], cells = Array.from({ length: GRID * GRID }, () => ({ n: 0, rgb: [0, 0, 0] }));
  let n = 0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const m = sp.m[y * sp.w + x], rgb = colours[m];
    if (!COAT.has(m) || !rgb || rgb.length !== 3 || !rgb.every(Number.isFinite)) continue;
    const bins = rgb.map(v => Math.min(3, Math.max(0, Math.floor(v / 64))));
    palette[bins[0] * 16 + bins[1] * 4 + bins[2]]++;
    const cx = Math.min(GRID - 1, Math.floor((x - x0) / width * GRID)), cy = Math.min(GRID - 1, Math.floor((y - y0) / height * GRID)), cell = cells[cy * GRID + cx];
    cell.n++; n++;
    for (let c = 0; c < 3; c++) { cell.rgb[c] += rgb[c] / 255; mean[c] += rgb[c] / 255; }
  }
  if (n) for (let c = 0; c < 3; c++) mean[c] /= n;
  // Residual colour by cell separates markings from the overall coat colour.
  const pattern = cells.map(cell => cell.n ? cell.rgb.map((v, c) => v / cell.n - mean[c]) : null);
  return { shape: silhouette(sp), width, height, palette: palette.map(v => n ? v / n : 0), pattern, complete: n > 0 };
}

function patternDistance(a, b, mirror) {
  let sum = 0, n = 0;
  for (let y = 0; y < GRID; y++) for (let x = 0; x < GRID; x++) {
    const p = a[y * GRID + x], q = b[y * GRID + (mirror ? GRID - 1 - x : x)];
    if (!p || !q) continue;
    for (let c = 0; c < 3; c++) { sum += (p[c] - q[c]) ** 2; n++; }
  }
  return n ? Math.sqrt(sum / n) : Infinity;
}

export function combinedDistinctness(a, b) {
  const palette = a.palette.reduce((sum, v, i) => sum + Math.abs(v - b.palette[i]), 0) / 2;
  const size = Math.max(...["width", "height"].map(k => Math.abs(a[k] - b[k]) / Math.max(1, a[k], b[k])));
  // Shape and pattern must be close in the SAME orientation. A mirrored view
  // may explain the resemblance, but mismatched orientations cannot combine.
  const orientations = [false, true].map(mirror => ({
    silhouette: silhouetteDistance(a.shape, mirror ? silhouetteMirror(b.shape) : b.shape),
    pattern: patternDistance(a.pattern, b.pattern, mirror),
  }));
  const matches = o => o.silhouette < DISTINCTNESS_LIMITS.silhouette && o.pattern < DISTINCTNESS_LIMITS.pattern;
  const closest = orientations.find(matches) ?? orientations.sort((p, q) => p.silhouette - q.silhouette)[0];
  return { ...closest, palette, size, warn: !!(a.complete && b.complete && palette < DISTINCTNESS_LIMITS.palette && size < DISTINCTNESS_LIMITS.size && orientations.some(matches)) };
}
