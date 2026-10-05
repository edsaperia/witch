// Witch silhouette check (#79, stage 3): can you tell the species apart by shape alone, at the size
// they're seen? Each sprite's shape (what's drawn, outline and all) is shrunk to fit a small square
// (SILHOUETTE_SIZE px, standing on its bottom row, centred), and two shapes differ by how little
// they overlap (1 - intersection over union). Species too alike are flagged; so is a species whose
// own forms (frames, facings) drift too far from each other.

export const SILHOUETTE_SIZE = 24;

// A sprite's silhouette: a size x size grid of coverage (0 to 1), the sprite fitted inside keeping
// its proportions, its feet on the bottom row, centred across.
export function silhouette(sp, size = SILHOUETTE_SIZE) {
  let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1;
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  const out = new Float32Array(size * size);
  if (x1 < 0) return out;
  const w = x1 - x0 + 1, h = y1 - y0 + 1, k = size / Math.max(w, h), ox = (size - w * k) / 2, oy = size - h * k;
  // area sampling: each source pixel adds its share to the cells it covers
  const cnt = new Float32Array(size * size);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const cx = Math.min(size - 1, Math.floor(ox + (x - x0 + .5) * k)), cy = Math.min(size - 1, Math.floor(oy + (y - y0 + .5) * k));
    cnt[cy * size + cx]++; if (sp.m[y * sp.w + x]) out[cy * size + cx]++;
  }
  for (let i = 0; i < out.length; i++) out[i] = cnt[i] ? out[i] / cnt[i] : 0;
  return out;
}

// How different two silhouettes are: 0 the same shape, 1 not overlapping at all (1 - soft IoU).
export function silhouetteDistance(a, b) {
  let inter = 0, union = 0;
  for (let i = 0; i < a.length; i++) { inter += Math.min(a[i], b[i]); union += Math.max(a[i], b[i]); }
  return union ? 1 - inter / union : 0;
}

// The same, mirrored left to right (a creature seen walking the other way).
export function silhouetteMirror(a, size = SILHOUETTE_SIZE) { const out = new Float32Array(a.length); for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) out[y * size + x] = a[y * size + size - 1 - x]; return out; }
// The distance between two forms whichever way each faces.
export const silhouetteDistanceEitherWay = (a, b) => Math.min(silhouetteDistance(a, b), silhouetteDistance(a, silhouetteMirror(b)));

// Every pair of species by distance, closest first: [{ a, b, d }].
export function silhouettePairs(shapes) {
  const ids = Object.keys(shapes), out = [];
  for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) out.push({ a: ids[i], b: ids[j], d: silhouetteDistanceEitherWay(shapes[ids[i]], shapes[ids[j]]) });
  return out.sort((p, q) => p.d - q.d);
}
