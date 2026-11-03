// The berry (rules/berries.ts): a small shiny berry, drawn here in a few pixels (Ed, 2026-10-04): a deep
// body in berries.colour, a darker shadow side and a crisp near-white highlight upper left; a deep berry pink since
// Ed's colour grammar (2026-11-03: berries "deep berry pink, instead of red", red being the warnings'; a dark cherry
// red before, colourGrammar "old": render/colourGrammar.ts berryColour). Its soft halo and the glints seen from the treetops (through gaps in the crowns
// only) are drawn with the sigils' glow sprites (leash.ts). A placeholder until the art builder draws one.
import type { Baked } from "./atlas";

const ROWS = [
  "..ss..",
  ".rwrr.",
  "rrrrrd",
  "rrrrdd",
  ".rrdd.",
  "..dd..",
];

export function berrySprite(colour: string): Baked {
  const w = ROWS[0].length, h = ROWS.length;
  const hex = colour.replace("#", ""), base = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16));
  const tone = (k: number) => base.map(v => Math.max(0, Math.min(255, Math.round(v * k))));
  const pal: Record<string, number[]> = { r: base, d: tone(0.55), w: [255, 236, 236], s: [70, 52, 30] }; // s: its stalk
  const mk = () => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
  const A = mk(), N = mk(), a = A.getContext("2d")!, n = N.getContext("2d")!;
  const ai = a.createImageData(w, h), ni = n.createImageData(w, h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const ch = ROWS[y][x], o = (y * w + x) * 4;
    if (ch === ".") continue;
    const c = pal[ch];
    ai.data.set([c[0], c[1], c[2], 255], o);
    ni.data.set([128, 128, 255, 255], o);
  }
  a.putImageData(ai, 0, 0); n.putImageData(ni, 0, 0);
  return { A, N, w, h };
}
