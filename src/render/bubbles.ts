// Every bubble over a speaker, one code (Ed, 2026-10-05: "One speech-bubble style for every speaker"; 2026-10-12: the legends'
// dream bubbles "are dreams and not speech, but it's a similar thing and maybe they can share the same code", and the
// sleepers' when the party's over "might also need the same"). Two variants of one bubble, both on the game's pixel grid
// (GRID screen px a bubble pixel, times its speaker's size) and holding pixel emoji from the one pipeline here:
// - speech: index.html's .bubble, the outline-only pixel bubble with a stepped tail, its emoji an <img>, sized by who speaks
//   (the witch at 1, a creature by its level: tuning bubbles.levelScale, babies smallest, legends largest): the 💌 replies
//   (render/invites.ts), the party and beach witches' chat (render/partyWitches.ts) and the old talk (render/leash/bubbles.ts);
// - thought: a cloud with its puffs trailing down to the dreamer (render/thoughtCloud.ts its shape), its own ink and fill,
//   holding one symbol at a time: the legends' dreams and nightmares, the night won's islands, and the sleepers' 😴s.
import type { Tuning } from "../rules/tuning";
import { GRID, paintThought, type ThoughtShape } from "./thoughtCloud";

/** Snap a screen position (px) to a grid of `px`. */
export const snapTo = (v: number, px: number): number => Math.round(v / px) * px;

/** A bubble's size factor: the witch's (level undefined) 1, a creature's by its level. */
export function bubbleScale(t: Tuning, level?: number): number {
  if (level === undefined) return 1;
  const L = t.bubbles.levelScale ?? [1];
  return L[Math.max(0, Math.min(L.length - 1, level))];
}

/** A bubble's pixel on screen for a speaker (screen px): the grid times its size, whole (a legend's 5, the witch's 3). Speech
 *  and thought alike (Ed, 2026-10-12: "dream bubbles should also grow"). */
export const bubbleGrid = (t: Tuning, level?: number): number => Math.max(1, Math.round(GRID * bubbleScale(t, level)));

/** Size a .bubble element and its emoji image for a speaker: the outline (--px, the grid times its size) and the emoji's
 *  pixels scale together, so a legend's bubble is the same bubble, bigger. */
export function sizeBubble(el: HTMLElement, img: HTMLElement, t: Tuning, level?: number): void {
  const k = bubbleScale(t, level), px = t.pixelSize * t.bubbles.scale * k, n = t.bubbles.emojiPixels;
  el.style.setProperty("--px", `${bubbleGrid(t, level)}px`);
  img.style.width = img.style.height = `${Math.round(n * px)}px`;
}

// ---- pixel emoji: every bubble's emoji drawn n pixels across with hard edges (no half-see-through pixels) ----

const pixelCache = new Map<string, string>(), pixelData = new Map<string, ImageData | null>();
function emojiPixels(e: string, n: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = n;
  const x = c.getContext("2d", { willReadFrequently: true });
  let d: ImageData | null = null;
  if (x) {
    x.font = `${n - 1}px sans-serif`; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText(e, n / 2, n / 2 + 0.5);
    d = x.getImageData(0, 0, n, n);
    for (let i = 3; i < d.data.length; i += 4) d.data[i] = d.data[i] < 110 ? 0 : 255;
    x.putImageData(d, 0, 0);
  }
  pixelData.set(`${e}:${n}`, d);
  return c;
}
/** A pixel emoji as a data URL (cached). */
export function pixelEmoji(e: string, n: number): string {
  const key = `${e}:${n}`;
  let url = pixelCache.get(key);
  if (url) return url;
  url = emojiPixels(e, n).toDataURL();
  pixelCache.set(key, url);
  return url;
}
/** A pixel emoji's pixels (for drawing it turned: render/invites.ts pixelTurned). */
export function pixelEmojiData(e: string, n: number): ImageData | null {
  if (!pixelData.has(`${e}:${n}`)) emojiPixels(e, n);
  return pixelData.get(`${e}:${n}`) ?? null;
}
/** A pixel sprite of our own, drawn by `paint` on an n by n canvas and kept under `key` as the emoji are (alpha 0 or 255),
 *  so pixelEmoji, pixelEmojiData and the turned drawing (render/invites.ts pixelTurned) serve it like one: the crumpled
 *  letter. Painted once a key and size; returns the key. */
const sprites = new Set<string>();
export function pixelSprite(key: string, n: number, paint: (x: CanvasRenderingContext2D, n: number) => void): string {
  const k = `${key}:${n}`;
  if (!sprites.has(k)) {
    const c = document.createElement("canvas");
    c.width = c.height = n;
    const x = c.getContext("2d", { willReadFrequently: true });
    let d: ImageData | null = null;
    if (x) { paint(x, n); d = x.getImageData(0, 0, n, n); for (let i = 3; i < d.data.length; i += 4) d.data[i] = d.data[i] < 110 ? 0 : 255; x.putImageData(d, 0, 0); }
    pixelData.set(k, d); pixelCache.set(k, c.toDataURL()); sprites.add(k);
  }
  return key;
}
/** A pixel emoji as an image, `n` pixels across. */
export function emojiImage(e: string, n: number): HTMLImageElement {
  const img = document.createElement("img");
  img.src = pixelEmoji(e, n); img.width = img.height = n;
  img.style.imageRendering = "pixelated"; img.style.display = "block";
  return img;
}

// ---- speech ----

/** A speech bubble (index.html's .bubble) holding a pixel emoji image, in `parent`; shown by adding "on". */
export function speechBubble(parent: HTMLElement): { el: HTMLDivElement; img: HTMLImageElement } {
  const el = document.createElement("div"), img = document.createElement("img");
  el.className = "bubble";
  img.style.imageRendering = "pixelated"; img.style.display = "block";
  el.append(img);
  parent.append(el);
  return { el, img };
}

/** Show emoji `e` in a speech bubble, sized for its speaker (once a change). */
export function speechEmoji(el: HTMLElement, img: HTMLImageElement, e: string, t: Tuning, level?: number): void {
  if (el.dataset.e === e && el.dataset.l === `${level}`) return;
  el.dataset.e = e; el.dataset.l = `${level}`;
  img.src = pixelEmoji(e, t.bubbles.emojiPixels);
  sizeBubble(el, img, t, level);
}

// ---- thought ----

export type Rgba = [number, number, number, number];

/** A thought bubble (classes `cls`, "thought" first) in `parent`: its cloud on one canvas, its symbols over the big cloud. */
export function thoughtBubble(parent: HTMLElement, cls: string): HTMLElement {
  const el = document.createElement("div"), cv = document.createElement("canvas");
  el.className = `thought ${cls}`; cv.className = "cloud"; el.append(cv);
  parent.append(el);
  return el;
}

/** Paint its cloud in shape S, once for each shape, colour and size: a cloud pixel `px` screen px (bubbleGrid: its speaker's). */
export function thoughtCloud(el: HTMLElement, S: ThoughtShape, ink: Rgba, fill: Rgba, px = GRID): void {
  const key = `${S.w}x${S.h}:${ink}:${fill}:${px}`;
  if (el.dataset.c === key) return;
  el.dataset.c = key;
  const cv = el.firstChild as HTMLCanvasElement, x = cv.getContext("2d");
  cv.width = S.w; cv.height = S.h;
  cv.style.width = `${S.w * px}px`; cv.style.height = `${S.h * px}px`;
  el.style.width = cv.style.width; el.style.height = cv.style.height;
  if (!x) return;
  const d = x.createImageData(S.w, S.h);
  paintThought(S, ink, fill, d.data);
  x.putImageData(d, 0, 0);
}

/** Show one symbol in a thought bubble's big cloud (`kind` its slot, `n` pixels across, made by `make` when `key` changes),
 *  centred on the grid, `alpha` faded; the others hidden. */
export function thoughtSymbol(el: HTMLElement, S: ThoughtShape, kind: string, key: string, n: number, make: () => HTMLElement, alpha: number, px = GRID): void {
  key = `${key}@${px}`;
  let sym = el.querySelector(`.${kind}`) as HTMLElement | null;
  if (!sym || sym.dataset.k !== key) {
    const made = make();
    made.classList.add(kind); made.dataset.k = key;
    const at = Math.floor((S.box.n - n) / 2);
    Object.assign(made.style, { position: "absolute", width: `${n * px}px`, height: `${n * px}px`, left: `${(S.box.x + at) * px}px`, top: `${(S.box.y + at) * px}px` });
    if (sym) sym.replaceWith(made); else el.append(made);
    sym = made;
  }
  for (const o of el.querySelectorAll(":scope > :not(.cloud)") as NodeListOf<HTMLElement>) o.style.display = o === sym ? "" : "none";
  sym.style.opacity = alpha.toFixed(2);
}

/** Show an emoji as a thought bubble's symbol, from the speech bubbles' pixel emoji. */
export function thoughtEmoji(el: HTMLElement, S: ThoughtShape, e: string, n: number, alpha: number, px = GRID): void {
  thoughtSymbol(el, S, "emoji", `${e}:${n}`, n, () => emojiImage(e, n), alpha, px);
}

/** Where a thought bubble goes for a dreamer at screen point (x, y): its smallest puff over it, on its own grid (`px`). */
export function thoughtAt(S: ThoughtShape, x: number, y: number, px = GRID): { left: number; top: number } {
  return { left: snapTo(x - (S.foot.x + 0.5) * px, px), top: snapTo(y - (S.foot.y + 0.5) * px, px) };
}
