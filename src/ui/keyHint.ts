// The walking keys in her room (Ed, 2026-10-06: "The bedroom can have a WASD (see image) to show you how to move"): four
// keycaps in the inverted T, drawn in the room's own art pixels on the floor in front of where she starts: a light face with
// its letter, a darker bottom edge for depth, an outline. The key held goes down a pixel and lights up pink. Once she's walked
// a few steps it fades away, coming back after a long while standing; used with the arrows, it shows arrows. Not on a touch
// screen (no keys to show). The same keycaps, one at a time, are the use prompt over what she can use in the treehouse (Ed, 2026-10-26:
// "We used to have little keys to show 'WASD', can we use these for E": `keycapCanvas`, render/houseRooms.ts).

/** 3 × 5 glyphs: the letters and the arrows. */
const GLYPH: Record<string, string[]> = {
  W: ["10001", "10001", "10101", "10101", "01010"], A: ["010", "101", "111", "101", "101"], S: ["111", "100", "111", "001", "111"], D: ["110", "101", "101", "101", "110"],
  U: ["010", "111", "010", "010", "010"], N: ["010", "010", "010", "111", "010"],
  L: ["00100", "01000", "11111", "01000", "00100"], R: ["00100", "00010", "11111", "00010", "00100"],
  E: ["111", "100", "110", "100", "111"],
  /** The pad's square (its use button) and cross (choose), drawn on a round face button (`ROUND`), and on touch a fingertip: the
   *  key itself is tapped. */
  SQ: ["111", "101", "111"], X: ["101", "010", "101"], STICK: ["010", "111", "010"], TAP: ["01110", "11111", "11111", "11111", "01110"],
};
const KEY = 9, FACE = 7, GAP = 1;
/** Seconds of walking before it fades, how long it takes, and how long standing still brings it back. */
const WALKED = 1.2, FADE = .6, IDLE_BACK = 45;
const KEYS: { at: [number, number]; wasd: string; arrow: string; g: [string, string] }[] = [
  { at: [1, 0], wasd: "KeyW", arrow: "ArrowUp", g: ["W", "U"] },
  { at: [0, 1], wasd: "KeyA", arrow: "ArrowLeft", g: ["A", "L"] },
  { at: [1, 1], wasd: "KeyS", arrow: "ArrowDown", g: ["S", "N"] },
  { at: [2, 1], wasd: "KeyD", arrow: "ArrowRight", g: ["D", "R"] },
];

export class KeyHint {
  private walked = 0; private still = 0; private alpha = 1; private arrows = false;
  private touch = typeof matchMedia === "function" && matchMedia("(pointer: coarse)").matches && !matchMedia("(any-pointer: fine)").matches;

  /** Its size in art pixels. */
  static readonly W = KEY * 3 + GAP * 2;
  static readonly H = KEY * 2 + GAP;

  /** A walking key pressed: the arrows or WASD. */
  pressed(code: string): void { if (code.startsWith("Arrow")) this.arrows = true; else if (/^Key[WASD]$/.test(code)) this.arrows = false; }

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
    for (const k of KEYS) drawKey(c, Math.round(x + k.at[0] * (KEY + GAP)), Math.round(y + k.at[1] * (KEY + GAP)), k.g[this.arrows ? 1 : 0], held.has(k.wasd) || held.has(k.arrow));
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
  const g = GLYPH[glyph], gx = kx + Math.floor((KEY - g[0].length) / 2), gy = ky + 1 + d;
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
  const g = GLYPH[glyph], gx = kx + Math.floor((KEY - g[0].length) / 2), gy = ky + Math.floor((FACE + 1 - g.length) / 2);
  c.fillStyle = "#2a1d3a";
  g.forEach((row, j) => [...row].forEach((on, i) => { if (on === "1") c.fillRect(gx + i, gy + j, 1, 1); }));
}

/** The keycaps a prompt shows: E, a movement key's letter, the pad's square and cross (round), a tap. */
export type KeycapGlyph = "E" | "SQ" | "X" | "STICK" | "TAP" | "W" | "A" | "S" | "D" | "U" | "N" | "L" | "R";
const ROUND = new Set(["SQ", "X", "STICK"]);
/** The pad's button names (the Settings page's Pad buttons, app/playerSettings.ts padGlyphs): Xbox's letters on the round face buttons
 *  where PlayStation's shapes would be: its X where the square is, its A where the cross is. */
export const padGlyphStyle = { xbox: false };
const xboxed = (g: KeycapGlyph): KeycapGlyph => (!padGlyphStyle.xbox ? g : g === "SQ" ? "X" : g === "X" ? "A" : g);
/** A lone keycap (KEY art pixels square) as a canvas, `scale` page pixels an art pixel, drawn sharp: the use prompt's. */
export function keycapCanvas(glyph: KeycapGlyph, scale = 3, down = false): HTMLCanvasElement {
  const cv = document.createElement("canvas");
  cv.width = KEY; cv.height = KEY;
  cv.style.cssText = `width:${KEY * scale}px;height:${KEY * scale}px;image-rendering:pixelated;display:block`;
  const g = xboxed(glyph), round = ROUND.has(glyph);
  if (round) drawRound(cv.getContext("2d")!, 0, 0, g); else drawKey(cv.getContext("2d")!, 0, 0, g, down);
  return cv;
}
/** The walking keys, W A S D in their inverted T (KeyHint.W × KeyHint.H art pixels), as a canvas: the wake-up's "get up" beside
 *  the bed (render/houseRooms.ts; Ed, 2026-10-26: "This should just be WASD in keycaps to the left of the bed"). */
export function wasdCanvas(scale = 3): HTMLCanvasElement {
  const cv = document.createElement("canvas");
  cv.width = KeyHint.W; cv.height = KeyHint.H;
  cv.style.cssText = `width:${KeyHint.W * scale}px;height:${KeyHint.H * scale}px;image-rendering:pixelated;display:block`;
  const c = cv.getContext("2d")!;
  for (const k of KEYS) drawKey(c, k.at[0] * (KEY + GAP), k.at[1] * (KEY + GAP), k.g[0], false);
  return cv;
}
/** The same keycap as an inline image for a panel's hint line (its HTML), `scale` page pixels an art pixel. */
const capHtml = new Map<string, string>();
export function keycapHtml(glyph: KeycapGlyph, scale = 2): string {
  const k = `${glyph}|${scale}|${padGlyphStyle.xbox}`, had = capHtml.get(k);
  if (had) return had;
  const html = `<img class="kc" alt="${glyph}" src="${keycapCanvas(glyph, scale).toDataURL()}" style="width:${KEY * scale}px;height:${KEY * scale}px;image-rendering:pixelated;vertical-align:middle">`;
  capHtml.set(k, html);
  return html;
}
