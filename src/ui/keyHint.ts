// The walking keys in her room (Ed, 2026-10-06: "The bedroom can have a WASD (see image) to show you how to move"): four
// keycaps in the inverted T, drawn in the room's own art pixels on the floor in front of where she starts: a light face with
// its letter, a darker bottom edge for depth, an outline. The key held goes down a pixel and lights up pink. Once she's walked
// a few steps it fades away, coming back after a long while standing; used with the arrows, it shows arrows. Not on a touch
// screen (no keys to show). The same keycaps, one at a time, are the use prompt over what she can use in the treehouse (Ed, 2026-10-26:
// "We used to have little keys to show 'WASD', can we use these for E": `keycapCanvas`, render/houseRooms.ts).

import { bindings, type ActionId } from "../platform/bindings";

/** 3 × 5 glyphs (a few 4 or 5 wide): the letters, the digits, the arrows, Space; a pad's face buttons, its stick, and on touch a
 *  fingertip (the key itself is tapped). A pad's glyph (`pad:`, the bindings' names) is drawn on a round face button (Ed,
 *  2026-10-26: "square and X can appear on a circular button"); its others (L1, R2, a d-pad arrow) as two characters on one. */
const GLYPH: Record<string, string[]> = {
  A: ["010", "101", "111", "101", "101"], B: ["110", "101", "110", "101", "110"], C: ["011", "100", "100", "100", "011"], D: ["110", "101", "101", "101", "110"],
  E: ["111", "100", "110", "100", "111"], F: ["111", "100", "110", "100", "100"], G: ["011", "100", "101", "101", "011"], H: ["101", "101", "111", "101", "101"],
  I: ["111", "010", "010", "010", "111"], J: ["001", "001", "001", "101", "010"], K: ["101", "101", "110", "101", "101"], L: ["100", "100", "100", "100", "111"],
  M: ["10001", "11011", "10101", "10001", "10001"], N: ["1001", "1101", "1011", "1001", "1001"], O: ["010", "101", "101", "101", "010"], P: ["110", "101", "110", "100", "100"],
  Q: ["010", "101", "101", "110", "011"], R: ["110", "101", "110", "101", "101"], S: ["111", "100", "111", "001", "111"], T: ["111", "010", "010", "010", "010"],
  U: ["101", "101", "101", "101", "111"], V: ["101", "101", "101", "101", "010"], W: ["10001", "10001", "10101", "10101", "01010"], X: ["101", "101", "010", "101", "101"],
  Y: ["101", "101", "010", "010", "010"], Z: ["111", "001", "010", "100", "111"],
  0: ["111", "101", "101", "101", "111"], 1: ["010", "110", "010", "010", "111"], 2: ["110", "001", "010", "100", "111"], 3: ["110", "001", "010", "001", "110"],
  4: ["101", "101", "111", "001", "001"], 5: ["111", "100", "110", "001", "110"], 6: ["011", "100", "111", "101", "111"], 7: ["111", "001", "010", "010", "010"],
  8: ["111", "101", "111", "101", "111"], 9: ["111", "101", "111", "001", "110"],
  "↑": ["010", "111", "010", "010", "010"], "↓": ["010", "010", "010", "111", "010"], "←": ["00100", "01000", "11111", "01000", "00100"], "→": ["00100", "00010", "11111", "00010", "00100"],
  "␣": ["10001", "11111"], "?": ["111", "001", "010", "000", "010"],
  "pad:square": ["111", "101", "111"], "pad:cross": ["101", "010", "101"], "pad:circle": ["010", "101", "010"], "pad:triangle": ["010", "101", "111"],
  "pad:stick": ["010", "111", "010"], TAP: ["01110", "11111", "11111", "11111", "01110"],
};
/** A pad input's label where it has no glyph of its own (two characters on the round button). */
const PAD_LABEL: Record<string, string> = { share: "SH", options: "OP", home: "PS", up: "↑", down: "↓", left: "←", right: "→" };
/** A glyph's rows: its own, or a pad input's label, or up to two characters side by side. */
function rowsOf(glyph: string): string[] {
  const g = GLYPH[glyph]; if (g) return g;
  if (/^pad:(ls|rs)/.test(glyph)) return GLYPH["pad:stick"];
  const text = glyph.startsWith("pad:") ? PAD_LABEL[glyph.slice(4)] ?? glyph.slice(4) : glyph, cs = [...text].slice(0, 2).map(c => GLYPH[c] ?? GLYPH["?"]);
  if (cs.length < 2) return cs[0] ?? GLYPH["?"];
  const h = Math.max(cs[0].length, cs[1].length), pad = (r: string[], w: number) => Array.from({ length: h }, (_, j) => r[j] ?? "0".repeat(w));
  const a = pad(cs[0], cs[0][0].length), b = pad(cs[1], cs[1][0].length);
  return a.map((r, j) => `${r}0${b[j]}`);
}
const KEY = 9, FACE = 7, GAP = 1;
/** Seconds of walking before it fades, how long it takes, and how long standing still brings it back. */
const WALKED = 1.2, FADE = .6, IDLE_BACK = 45;
const KEYS: { at: [number, number]; wasd: string; arrow: string; g: [string, string] }[] = [
  { at: [1, 0], wasd: "KeyW", arrow: "ArrowUp", g: ["W", "↑"] },
  { at: [0, 1], wasd: "KeyA", arrow: "ArrowLeft", g: ["A", "←"] },
  { at: [1, 1], wasd: "KeyS", arrow: "ArrowDown", g: ["S", "↓"] },
  { at: [2, 1], wasd: "KeyD", arrow: "ArrowRight", g: ["D", "→"] },
];
const MOVES = ["game.moveUp", "game.moveLeft", "game.moveDown", "game.moveRight"] as const;
/** The walking keys as bound now (each its first two keys, WASD and the arrows by default). */
function walkKeys(): { at: [number, number]; wasd: string; arrow: string; g: [string, string] }[] {
  return KEYS.map((k, i) => { const ks = bindings.keys(MOVES[i]), a = ks[0] ?? k.wasd, b = ks[1] ?? a; return { at: k.at, wasd: a, arrow: b, g: [keyGlyph(a), keyGlyph(b)] }; });
}

export class KeyHint {
  private walked = 0; private still = 0; private alpha = 1; private arrows = false;
  private touch = typeof matchMedia === "function" && matchMedia("(pointer: coarse)").matches && !matchMedia("(any-pointer: fine)").matches;

  /** Its size in art pixels. */
  static readonly W = KEY * 3 + GAP * 2;
  static readonly H = KEY * 2 + GAP;

  /** A walking key pressed: the arrows or WASD. */
  pressed(code: string): void { const w = walkKeys(); if (w.some(k => k.arrow === code)) this.arrows = true; else if (w.some(k => k.wasd === code)) this.arrows = false; }

  /** Advances it by dt (s): whether she's walking now. */
  step(dt: number, moving: boolean): void {
    if (moving) { this.walked += dt; this.still = 0; } else if ((this.still += dt) > IDLE_BACK) this.walked = 0;
    const want = this.walked < WALKED ? 1 : 0;
    this.alpha = want ? Math.min(1, this.alpha + dt / FADE) : Math.max(0, this.alpha - dt / FADE);
  }

  /** Draws it with its top left at (x, y) on the room's picture (art pixels), the held keys pressed. */
  draw(c: CanvasRenderingContext2D, x: number, y: number, held: Set<string>): void {
    if (this.touch || this.alpha <= 0) return;
    c.save(); c.globalCompositeOperation = "source-over"; c.globalAlpha = this.alpha;
    for (const k of walkKeys()) drawKey(c, Math.round(x + k.at[0] * (KEY + GAP)), Math.round(y + k.at[1] * (KEY + GAP)), k.g[this.arrows ? 1 : 0], held.has(k.wasd) || held.has(k.arrow));
    c.restore();
  }
}

/** One keycap, its top left at (kx, ky) in art pixels, with glyph `glyph` (GLYPH's), pressed or not. */
function drawKey(c: CanvasRenderingContext2D, kx: number, ky: number, glyph: string, down: boolean): void {
  const d = down ? 1 : 0, rect = (col: string, ox: number, oy: number, w: number, h: number) => { c.fillStyle = col; c.fillRect(kx + ox, ky + oy, w, h); };
  // outline (its corners cut), the bottom edge, the face
  rect("#1a1022", 1, d, KEY - 2, KEY - d); rect("#1a1022", 0, 1 + d, KEY, KEY - 2 - d);
  rect(down ? "#b4487e" : "#6d5f86", 1, 1 + d, KEY - 2, KEY - 2 - d);
  rect(down ? "#ffd2ec" : "#e9e2f4", 1, 1 + d, KEY - 2, FACE - 2 - d + 1);
  rect(down ? "#fff0f8" : "#fbf8ff", 1, 1 + d, KEY - 2, 1); // (its lit top)
  // the glyph
  const g = rowsOf(glyph), gx = kx + Math.floor((KEY - g[0].length) / 2), gy = ky + 1 + d + Math.floor((5 - g.length) / 2);
  c.fillStyle = down ? "#5a1236" : "#2a1d3a";
  g.forEach((row, j) => [...row].forEach((on, i) => { if (on === "1") c.fillRect(gx + i, gy + j, 1, 1); }));
}

/** A pad's face button (Ed, 2026-10-26: "square and X can appear on a circular button"): the keycap's colours and size, round. */
function drawRound(c: CanvasRenderingContext2D, kx: number, ky: number, glyph: string): void {
  const r = KEY / 2, inside = (x: number, y: number) => x >= 0 && y >= 0 && x < KEY && y < KEY && (x + 0.5 - r) ** 2 + (y + 0.5 - r) ** 2 <= r * r;
  for (let y = 0; y < KEY; y++) for (let x = 0; x < KEY; x++) {
    if (!inside(x, y)) continue;
    const edge = !inside(x - 1, y) || !inside(x + 1, y) || !inside(x, y - 1) || !inside(x, y + 1);
    c.fillStyle = edge ? "#1a1022" : y >= FACE ? "#6d5f86" : y === 1 ? "#fbf8ff" : "#e9e2f4"; // (outline, its lower rim, its lit top, the face)
    c.fillRect(kx + x, ky + y, 1, 1);
  }
  const g = rowsOf(glyph), gx = kx + Math.floor((KEY - g[0].length) / 2), gy = ky + Math.floor((FACE + 1 - g.length) / 2);
  c.fillStyle = "#2a1d3a";
  g.forEach((row, j) => [...row].forEach((on, i) => { if (on === "1") c.fillRect(gx + i, gy + j, 1, 1); }));
}

/** The keycaps a prompt shows: a key's letter, digit or arrow, Space, a pad's input (`pad:<name>`, round), a tap (TAP). */
export type KeycapGlyph = string;
/** A key's glyph (KeyboardEvent.code): its letter, digit or arrow, Space; else "?". */
export function keyGlyph(code: string): string {
  const m = /^(?:Key([A-Z])|Digit(\d)|Numpad(\d))$/.exec(code);
  if (m) return m[1] ?? m[2] ?? m[3];
  return ({ ArrowUp: "↑", ArrowDown: "↓", ArrowLeft: "←", ArrowRight: "→", Space: "␣" } as Record<string, string>)[code] ?? "?";
}
/** The glyph a prompt shows for `id` on `device` (Ed, 2026-10-28: remapped, it shows everywhere): its first key with a glyph (else
 *  its first), its first pad input, or on touch a tap. */
export function glyphOf(id: ActionId, device: "keys" | "pad" | "touch"): KeycapGlyph {
  if (device === "touch") return "TAP";
  if (device === "pad") { const p = bindings.pad(id)[0]; return p ? `pad:${p}` : "?"; }
  const ks = bindings.keys(id), k = ks.find(c => keyGlyph(c) !== "?") ?? ks[0];
  return k ? keyGlyph(k) : "?";
}
/** A lone keycap (KEY art pixels square) as a canvas, `scale` page pixels an art pixel, drawn sharp: the use prompt's. */
export function keycapCanvas(glyph: KeycapGlyph, scale = 3, down = false): HTMLCanvasElement {
  const cv = document.createElement("canvas");
  cv.width = KEY; cv.height = KEY;
  cv.style.cssText = `width:${KEY * scale}px;height:${KEY * scale}px;image-rendering:pixelated;display:block`;
  if (glyph.startsWith("pad:")) drawRound(cv.getContext("2d")!, 0, 0, glyph); else drawKey(cv.getContext("2d")!, 0, 0, glyph, down);
  return cv;
}
/** The walking keys, W A S D in their inverted T (KeyHint.W × KeyHint.H art pixels), as a canvas: the wake-up's "get up" beside
 *  the bed (render/houseRooms.ts; Ed, 2026-10-26: "This should just be WASD in keycaps to the left of the bed"). */
export function wasdCanvas(scale = 3): HTMLCanvasElement {
  const cv = document.createElement("canvas");
  cv.width = KeyHint.W; cv.height = KeyHint.H;
  cv.style.cssText = `width:${KeyHint.W * scale}px;height:${KeyHint.H * scale}px;image-rendering:pixelated;display:block`;
  const c = cv.getContext("2d")!;
  for (const k of walkKeys()) drawKey(c, k.at[0] * (KEY + GAP), k.at[1] * (KEY + GAP), k.g[0], false);
  return cv;
}
/** The same keycap as an inline image for a panel's hint line (its HTML), `scale` page pixels an art pixel. */
const capHtml = new Map<string, string>();
export function keycapHtml(glyph: KeycapGlyph, scale = 2): string {
  const k = `${glyph}|${scale}`, had = capHtml.get(k);
  if (had) return had;
  const html = `<img class="kc" alt="${glyph.replace(/^pad:/, "").replace(/"/g, "")}" src="${keycapCanvas(glyph, scale).toDataURL()}" style="width:${KEY * scale}px;height:${KEY * scale}px;image-rendering:pixelated;vertical-align:middle">`;
  capHtml.set(k, html);
  return html;
}
