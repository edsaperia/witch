// The Workshop's pictures as pixels (render/workshopArt.ts): her broom resting on the bay or the lathe, and each part on the pegboard
// (found, in her broom's colours; missing, a dark outline; tonight's, an outline with a glowing rim), lit in the Workshop's light, on
// whatever canvas `mk` makes. No three.js and no page here, so the art workers draw them (render/artBuild.ts, the "workshopPic" job),
// not the page's thread: baked there as she came into the house, a frame each, they held it seconds under the cloud's software
// renderer, and the house's furniture tens to hundreds of milliseconds each on Ed's laptop (his playtest of v4515).
import { partSprite, restingBroomSprite } from "../../art/workshop.js";
import type { Fitted } from "../rules/broomParts";
import { litCanvas, type Drawn, type MakeCanvas, type PiecePixels } from "./housePieces";
import type { Style } from "./style";

type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;
const ctx2d = (c: AnyCanvas) => c.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;

/** What a Workshop picture is: her broom from its parts on its host (the lathe's bigger), or a part on the pegboard in its state. */
export type WorkshopPic =
  | { what: "broom"; fitted: Fitted; host: "broomBay" | "lathe"; ppm: number; pitch: number; yaw: number; colours: Record<string, number[]> }
  | { what: "part"; part: string; state: "found" | "missing" | "tonight"; fit: number; pitch: number; yaw: number; colours: Record<string, number[]> };

/** A part's picture, lit in the Workshop's light in her broom's colours (render/workshopArt.ts broomColours). */
export function partPicture(st: Style, colours: Record<string, number[]>, id: string, mk: MakeCanvas, o: { fit?: number; pitch?: number; yaw?: number; hung?: boolean } = {}): { c: AnyCanvas; ox: number; oy: number } {
  const d = partSprite(id, o) as Drawn;
  return { c: litCanvas(d, "workshop", st, mk, 1, "", colours), ox: d.origin.x, oy: d.origin.y };
}
/** A picture as a dark outline (a part not found yet: the pegboard's empty pegs), its edge `edge` and its inside a faint dark. */
export function outlinePicture(src: AnyCanvas, mk: MakeCanvas, edge: number[] = [150, 140, 170], inside: number[] = [16, 12, 24, 150]): AnyCanvas {
  const w = src.width, h = src.height, c = mk(w, h);
  const a = ctx2d(src).getImageData(0, 0, w, h).data, x = ctx2d(c), img = x.createImageData(w, h), o = img.data;
  const on = (i: number, j: number) => i >= 0 && j >= 0 && i < w && j < h && a[(j * w + i) * 4 + 3] > 0;
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    if (!on(i, j)) continue;
    const k = (j * w + i) * 4, rim = !on(i - 1, j) || !on(i + 1, j) || !on(i, j - 1) || !on(i, j + 1), q = rim ? [...edge, 255] : inside;
    o[k] = q[0]; o[k + 1] = q[1]; o[k + 2] = q[2]; o[k + 3] = q[3];
  }
  x.putImageData(img, 0, 0);
  return c;
}
/** A picture with a glowing rim round it, `pad` pixels out (tonight's part on the board): the canvas grows by pad each side. */
export function glowPicture(src: AnyCanvas, mk: MakeCanvas, pad = 3, rgb: number[] = [255, 214, 120]): AnyCanvas {
  const w = src.width + pad * 2, h = src.height + pad * 2, c = mk(w, h);
  const a = ctx2d(src).getImageData(0, 0, src.width, src.height).data, x = ctx2d(c), img = x.createImageData(w, h), o = img.data;
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    let d = pad + 1;
    for (let v = -pad; v <= pad && d > 1; v++) for (let u = -pad; u <= pad; u++) { const si = i - pad + u, sj = j - pad + v; if (si >= 0 && sj >= 0 && si < src.width && sj < src.height && a[(sj * src.width + si) * 4 + 3]) d = Math.min(d, Math.max(Math.abs(u), Math.abs(v))); }
    if (d > pad) continue;
    const k = (j * w + i) * 4, f = d <= 1 ? 1 : 1 - (d - 1) / pad; // (the rim bright, fading out; pixel steps, no blur)
    o[k] = rgb[0]; o[k + 1] = rgb[1]; o[k + 2] = rgb[2]; o[k + 3] = Math.round(255 * (f > .6 ? 1 : f > .3 ? .55 : .25));
  }
  x.putImageData(img, 0, 0);
  x.drawImage(src as CanvasImageSource, pad, pad);
  return c;
}

/** A Workshop picture, drawn: its pixels and its origin (where it sits on its host's mark). */
export function workshopPicture(p: WorkshopPic, st: Style, mk: MakeCanvas): PiecePixels {
  let pic: { c: AnyCanvas; ox: number; oy: number };
  if (p.what === "broom") {
    const d = restingBroomSprite(p.fitted, { ppm: p.ppm, pitch: p.pitch, yaw: p.yaw, scale: p.host === "lathe" ? 1.5 : 2 }) as Drawn;
    pic = { c: litCanvas(d, "workshop", st, mk, 1, "", p.colours), ox: d.origin.x, oy: d.origin.y };
  } else {
    const q = partPicture(st, p.colours, p.part, mk, { fit: p.fit, pitch: p.pitch, yaw: p.yaw, hung: true });
    pic = p.state === "found" ? q : p.state === "tonight" ? { c: glowPicture(outlinePicture(q.c, mk), mk), ox: q.ox + 3, oy: q.oy + 3 } : { ...q, c: outlinePicture(q.c, mk) };
  }
  return { px: ctx2d(pic.c).getImageData(0, 0, pic.c.width, pic.c.height).data, w: pic.c.width, h: pic.c.height, ox: pic.ox, oy: pic.oy, marks: {} };
}
