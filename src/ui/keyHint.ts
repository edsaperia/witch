// The walking keys in her room (Ed, 2026-10-06: "The bedroom can have a WASD (see image) to show you how to move"): four
// keycaps in the inverted T, drawn in the room's own art pixels on the floor in front of where she starts: a light face with
// its letter, a darker bottom edge for depth, an outline. The key held goes down a pixel and lights up pink. Once she's walked
// a few steps it fades away, coming back after a long while standing; used with the arrows, it shows arrows. Not on a touch
// screen (no keys to show).

/** 3 × 5 glyphs: the letters and the arrows. */
const GLYPH: Record<string, string[]> = {
  W: ["10001", "10001", "10101", "10101", "01010"], A: ["010", "101", "111", "101", "101"], S: ["111", "100", "111", "001", "111"], D: ["110", "101", "101", "101", "110"],
  U: ["010", "111", "010", "010", "010"], N: ["010", "010", "010", "111", "010"],
  L: ["00100", "01000", "11111", "01000", "00100"], R: ["00100", "00010", "11111", "00010", "00100"],
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
    for (const k of KEYS) {
      const down = held.has(k.wasd) || held.has(k.arrow), kx = Math.round(x + k.at[0] * (KEY + GAP)), ky = Math.round(y + k.at[1] * (KEY + GAP)), d = down ? 1 : 0;
      const rect = (col: string, ox: number, oy: number, w: number, h: number) => { c.fillStyle = col; c.fillRect(kx + ox, ky + oy, w, h); };
      // outline (its corners cut), the bottom edge, the face
      rect("#1a1022", 1, d, KEY - 2, KEY - d); rect("#1a1022", 0, 1 + d, KEY, KEY - 2 - d);
      rect(down ? "#b4487e" : "#6d5f86", 1, 1 + d, KEY - 2, KEY - 2 - d);
      rect(down ? "#ffd2ec" : "#e9e2f4", 1, 1 + d, KEY - 2, FACE - 2 - d + 1);
      rect(down ? "#fff0f8" : "#fbf8ff", 1, 1 + d, KEY - 2, 1); // (its lit top)
      // the glyph
      const g = GLYPH[k.g[this.arrows ? 1 : 0]], gx = kx + Math.floor((KEY - g[0].length) / 2), gy = ky + 1 + d;
      c.fillStyle = down ? "#5a1236" : "#2a1d3a";
      g.forEach((row, j) => [...row].forEach((on, i) => { if (on === "1") c.fillRect(gx + i, gy + j, 1, 1); }));
    }
    c.restore();
  }
}
