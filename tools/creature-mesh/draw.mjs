// A picture to draw mesh creatures on, for the tools here that show them (sheet.mjs, clip.mjs): RGBA, with sprites lit simply from
// their normals, lines and small letters. Pure Node.
import { encodePng } from "../shots/pixels.mjs";

export const BG = [34, 38, 48];
export const GROUND = [92, 104, 86];
export const INK = [226, 226, 214];
export const DIM = [138, 146, 160];
export class Sheet {
  constructor(w, h) { this.w = w; this.h = h; this.d = new Uint8ClampedArray(w * h * 4); for (let i = 0; i < w * h; i++) this.d.set([...BG, 255], i * 4); }
  dot(x, y, c) { if (x < 0 || y < 0 || x >= this.w || y >= this.h) return; this.d.set([...c, 255], ((y | 0) * this.w + (x | 0)) * 4); }
  line(x0, x1, y, c) { for (let x = x0; x < x1; x++) this.dot(x, y, c); }
  /** A mesh frame (art/mesh/raster.js: colour and the camera's normals), its bottom row on `ground`, lit from up and to the left. */
  frame(f, w, h, x, ground, k = 1) {
    for (let y = 0; y < h; y++) for (let u = 0; u < w; u++) { const q = (y * w + u) * 4, a = f.albedo[q + 3]; if (!a) continue;
      const nx = (f.normal[q] - 128) / 127, ny = (f.normal[q + 1] - 128) / 127, nz = f.normal[q + 2] / 255, lit = a === 254 ? 1 : 0.5 + 0.5 * Math.max(0, -nx * 0.35 - ny * 0.6 + nz * 0.72);
      for (let v = 0; v < k; v++) for (let t = 0; t < k; t++) this.dot(x + u * k + t, ground - (h - y) * k + v, [f.albedo[q] * lit, f.albedo[q + 1] * lit, f.albedo[q + 2] * lit]); }
  }
  /** A generated creature's sprite (materials a pixel) in its colours, its lowest pixel on `ground`. */
  sprite(sp, colours, x, ground) {
    let bottom = 0; for (let i = 0; i < sp.m.length; i++) if (sp.m[i]) bottom = Math.floor(i / sp.w);
    for (let y = 0; y <= bottom; y++) for (let u = 0; u < sp.w; u++) { const m = sp.m[y * sp.w + u]; if (m) this.dot(x + u, ground - (bottom - y) - 1, colours[m] ?? [255, 0, 255]); }
  }
  text(s, x, y, c = INK, k = 1) { let at = x; for (const ch of String(s).toUpperCase()) { const g = FONT[ch]; if (g) for (let r = 0; r < 5; r++) for (let q = 0; q < 3; q++) if (g[r] & (4 >> q)) for (let v = 0; v < k; v++) for (let t = 0; t < k; t++) this.dot(at + q * k + t, y + r * k + v, c); at += 4 * k; } return at; }
  /** Every pixel one colour again. */
  clear(c = BG) { for (let i = 0; i < this.w * this.h; i++) { this.d[i * 4] = c[0]; this.d[i * 4 + 1] = c[1]; this.d[i * 4 + 2] = c[2]; this.d[i * 4 + 3] = 255; } }
  png() { return encodePng({ width: this.w, height: this.h, data: Buffer.from(this.d.buffer) }); }
}
// (letters three by five, a row a number: bit 4 is the left column)
const FONT = Object.fromEntries(Object.entries({ A: "25755", B: "65656", C: "34443", D: "65556", E: "74647", F: "74644", G: "34553", H: "55755", I: "72227", J: "11152", K: "55655", L: "44447", M: "57555", N: "57755", O: "25552", P: "65644", Q: "25563", R: "65655", S: "34216", T: "72222", U: "55557", V: "55552", W: "55575", X: "55255", Y: "55222", Z: "71247",
  0: "75557", 1: "26227", 2: "71747", 3: "71717", 4: "55711", 5: "74717", 6: "74757", 7: "71111", 8: "75757", 9: "75717", ".": "00002", ",": "00024", ":": "02020", "-": "00700", "/": "11244", "(": "24442", ")": "21112", "%": "51245", "=": "07070", "+": "02720", "'": "22000" }).map(([ch, rows]) => [ch, [...rows].map(Number)]));

