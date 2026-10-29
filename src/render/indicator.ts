// Edge indicators: when something that matters is off screen, a cue at the screen's edge in its
// direction, fading out as it comes into view. Drawn as pixel art (Ed, v149: "larger and
// pixellated"): plotted pixel by pixel on a small canvas, scaled up without smoothing.
//  - "Next stone" (Ed, v149; redrawn v183): the next waking area's rune (its creature's sigil) in
//    its neon, in a ring that fills clockwise from 12 o'clock as the countdown to the next wave
//    runs, flashing when the party spreads; an arrowhead toward the stone and its distance in
//    metres, on the far side of the ring from the arrow.
//  - The wave pointer (Ed, 2026-10-06: "The wave timing indicator should point towards the leyline pulse. It no longer
//    needs the symbol that indicates the upcoming rune; Instead it can have a 🎶 symbol. It keeps the wave countdown
//    circle"): the same ring and arrow, a 🎶 in the middle (NOTES), pointing at the ley line's pulse (rules/leypulse.ts).
//    The music-this-way cue toward the dancefloor is no longer shown (Ed: "You can remove the UI icon that points towards
//    the dancefloor").
//  - Her hat (Ed, 2026-10-06: "when you are killed, you drop your hat, and there's a direction marker for it, so you can
//    go back and find it"): the same ring, whole, a 🎩 in the middle (HAT), pointing at it while it lies on the ground
//    (rules/hat.ts), hovering over it once it's on screen.
//  - On screen, every one of them is a map pin over its subject (Ed, 2026-10-26): its arrow turned straight down at it, its
//    tip just over the subject's top, bobbing gently, kept on the screen, side by side with another over the same spot.
// Directions are in screen space, y down: an angle a points along (cos a, sin a) on the canvas.
import * as THREE from "three";
import { boldGlyph, sigilGlyph } from "../../art/generator.js";
import { groundHeight, HEIGHT_UNIFORMS, placed, seenOverBend } from "./height";
import { pixelEmojiData } from "./bubbles";

export const N = 40; // art pixels across
const SCALE = 4; // screen pixels per art pixel
const RING_R = 13; // the ring's radius (art pixels)
/** An emoji's size in the ring (art pixels across). */
export const EMOJI_PX = 17;

let RING: number[] | null = null;
/** The ring's pixels (x, y, turn: 0 at 12 o'clock, clockwise), in row order, worked out once (a hypot and an atan2 a pixel a frame
 *  before, and a colour list a pixel: the churn hunt, 2026-10-13). */
function ringPixels(): number[] {
  if (RING) return RING;
  const out: number[] = [];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const px = x + 0.5 - N / 2, py = y + 0.5 - N / 2, r = Math.hypot(px, py);
    if (Math.abs(r - RING_R) > 0.7) continue; // a thin stroke (calm by line, not by dimming)
    out.push(x, y, ((Math.atan2(px, -py) / (Math.PI * 2)) + 1) % 1); // 0 at 12 o'clock, clockwise
  }
  return (RING = out);
}

/** The arrowhead (arrowPixels' pixels, in the same order) drawn straight onto a cue, no list a frame. */
function drawArrow(c: PixelCue, a: number, n: number, from: number, tip: number, halfWidth: number, rgb: number[], alpha: number): void {
  const cc = n / 2, ux = Math.cos(a), uy = Math.sin(a), vx = -uy, vy = ux;
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const px = x + 0.5 - cc, py = y + 0.5 - cc, along = px * ux + py * uy, side = px * vx + py * vy;
    if (along < from || along > tip) continue;
    if (Math.abs(side) <= halfWidth * (tip - along) / (tip - from) + 0.25) c.dot(x, y, rgb, alpha);
  }
}

/** A cue for (x, z), seen from the witch at (wx, wz): where on the screen's edge it goes, pointing
 *  the way, and how much it shows there (0 when the target is on screen); and where the target's
 *  top (`top` metres up) is on screen (sx, sy: CSS pixels), for cues that sit over it when in view.
 *  The direction is the ground bearing from her to it in the camera's frame (north up the screen),
 *  not its projection, so the world's bend can't turn it round (Ed, v256: "sees things past the bend
 *  as south"); the projection, through the same lift and bend the shaders use, only decides whether
 *  it is on screen, and a target hidden past the bent horizon is not. */
export function edgeSpot(v: THREE.Vector3, camera: THREE.Camera, width: number, height: number, x: number, z: number, wx: number, wz: number, top = 1) {
  const f = camera.getWorldDirection(v), fx = f.x, fz = f.z, fl = Math.hypot(fx, fz) || 1;
  const gx = x - wx, gz = z - wz, ahead = (gx * fx + gz * fz) / fl, right = (gx * -fz + gz * fx) / fl;
  const B = HEIGHT_UNIFORMS.uBend.value, past = -(z - B.z), gh = groundHeight(x, z);
  const p = placed(v.set(x, top, z)).project(camera);
  const seen = p.z < 1 && seenOverBend(past, gh + top, B.x, camera.position);
  const inside = Math.max(Math.abs(p.x), Math.abs(p.y));
  const show = seen ? Math.min(1, Math.max(0, (inside - 0.9) / 0.25)) : 1;
  // Clamped to a box inside the edge (screen pixels, y down), clear of the countdown bar on the right
  // and the panels top left.
  const dx = right, dy = -ahead, k = 1 / Math.max(Math.abs(dx) / (0.84 * width / 2), Math.abs(dy) / (0.76 * height / 2), 1e-9);
  return { show, ex: width / 2 + dx * k, ey: height / 2 + dy * k, angle: Math.atan2(dy, dx), sx: ((p.x + 1) / 2) * width, sy: ((1 - p.y) / 2) * height, seen };
}

/** A direction given in the view's own terms (x right, y up) as a screen angle (y down). */
export const screenAngle = (dx: number, dy: number) => Math.atan2(-dy, dx);

/** The arrowhead's pixels on an n x n cue, pointing along screen angle `a` (y down): a solid
 *  triangle from radius `from` out to its tip at radius `tip`. */
export function arrowPixels(a: number, n: number, from: number, tip: number, halfWidth: number): [number, number][] {
  const out: [number, number][] = [], c = n / 2, ux = Math.cos(a), uy = Math.sin(a), vx = -uy, vy = ux;
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const px = x + 0.5 - c, py = y + 0.5 - c, along = px * ux + py * uy, side = px * vx + py * vy;
    if (along < from || along > tip) continue;
    if (Math.abs(side) <= halfWidth * (tip - along) / (tip - from) + 0.25) out.push([x, y]);
  }
  return out;
}

/** The edge cues placed this frame (centres, CSS pixels), so no two sit on one another (Ed's v1628 screenshot: two cues
 *  pointing the same way, their distances drawn over each other, "2018m m"): the view resets it each frame, before its cues;
 *  each cue on the edge claims its spot, nudged along the edge (across its arrow) till it overlaps none placed before. */
export const edgeLayout = {
  spots: [] as { x: number; y: number; r: number }[],
  reset(): void { this.spots.length = 0; },
  claim(x: number, y: number, angle: number, r: number, nudge = true): { x: number; y: number } {
    const tx = -Math.sin(angle), ty = Math.cos(angle), clear = (px: number, py: number) => this.spots.every(p => Math.hypot(p.x - px, p.y - py) >= p.r + r);
    let ox = x, oy = y;
    for (let k = 0; nudge && k < 8 && !clear(ox, oy); k++) { const d = (k % 2 ? -1 : 1) * Math.ceil((k + 1) / 2) * r * 2; ox = x + tx * d; oy = y + ty * d; }
    this.spots.push({ x: ox, y: oy, r });
    return { x: ox, y: oy };
  },
};

export class PixelCue {
  readonly canvas = document.createElement("canvas");
  readonly label = document.createElement("div");
  readonly g: CanvasRenderingContext2D;
  readonly img: ImageData;
  /** `scale`: screen pixels per art pixel; `opacity`: how strongly it shows (a dimmer cue for later). */
  constructor(parent: HTMLElement, readonly scale = SCALE, opacity = 1) {
    this.canvas.width = this.canvas.height = N;
    Object.assign(this.canvas.style, { position: "fixed", width: `${N * scale}px`, height: `${N * scale}px`, imageRendering: "pixelated", pointerEvents: "none", zIndex: "2", display: "none", opacity: `${opacity}` });
    this.label.style.opacity = `${opacity}`;
    // one crisp pixel label (the pixel font, ui/pixelUi.ts's Tiny5, on a small dark plate so it reads on any ground; never wrapped)
    Object.assign(this.label.style, { position: "fixed", pointerEvents: "none", zIndex: "2", display: "none", font: '16px "Tiny5", ui-monospace, monospace', lineHeight: "16px", whiteSpace: "nowrap", color: "#e8e2f4", background: "rgba(14, 9, 22, 0.72)", padding: "2px 4px 0", transform: "translate(-50%, -50%)", webkitFontSmoothing: "none" } as Partial<CSSStyleDeclaration>);
    parent.append(this.canvas, this.label);
    this.g = this.canvas.getContext("2d")!;
    this.img = this.g.createImageData(N, N);
  }
  hide(): void { this.canvas.style.display = "none"; this.label.style.display = "none"; }
  dispose(): void { this.canvas.remove(); this.label.remove(); }
  private text = ""; private textW = 0;
  /** Its label, `text` in `colour`, centred out from (cx, cy) along (ux, uy) (a unit vector), its near edge `clear` pixels
   *  out, so it never lies over the cue's own ring or arrow. */
  say(text: string, colour: string, cx: number, cy: number, ux: number, uy: number, clear: number): void {
    const L = this.label;
    L.style.display = "block";
    if (text !== this.text) { this.text = L.textContent = text; this.textW = L.offsetWidth || text.length * 9; }
    L.style.color = colour;
    const d = clear + Math.abs(ux) * this.textW / 2 + Math.abs(uy) * 9;
    L.style.left = `${cx + ux * d}px`;
    L.style.top = `${cy + uy * d}px`;
  }
  /** Centred on (sx, sy), `size` times its usual size. */
  place(sx: number, sy: number, size = 1): void {
    const s = N * this.scale * size;
    this.canvas.style.display = "block";
    this.canvas.style.width = this.canvas.style.height = `${s}px`;
    this.canvas.style.left = `${sx - s / 2}px`;
    this.canvas.style.top = `${sy - s / 2}px`;
  }
  clear(): void { this.img.data.fill(0); }
  dot(x: number, y: number, rgb: number[], a: number): void {
    x = Math.round(x); y = Math.round(y);
    if (x < 0 || y < 0 || x >= N || y >= N || a <= 0.02) return;
    const i = (y * N + x) * 4;
    if (this.img.data[i + 3] >= a * 255) return;
    const d = this.img.data; // (byte by byte: no array a dot)
    d[i] = rgb[0]; d[i + 1] = rgb[1]; d[i + 2] = rgb[2]; d[i + 3] = Math.round(Math.min(1, a) * 255);
  }
  flush(): void { this.g.putImageData(this.img, 0, 0); }
}

/** A still pin onto a cue (the sea chart's 🧭, render/chart/chartPin.ts): the ring, the emoji in its middle (its pixels in its own
 *  colours) and the arrowhead outside the ring pointing at `angle` (screen radians: π/2 straight down, as a map pin), in `rgb`. */
export function paintPin(c: PixelCue, rgb: number[], emoji: string, angle = Math.PI / 2, glyph?: readonly string[]): void {
  c.clear();
  const ring = ringPixels();
  for (let k = 0; k < ring.length; k += 3) c.dot(ring[k], ring[k + 1], rgb, 1);
  const E = pixelEmojiData(emoji, EMOJI_PX);
  if (E && E.data.some((v, i) => i % 4 === 3 && v > 0)) { const o = Math.floor((N - EMOJI_PX) / 2), d = E.data; for (let y = 0; y < EMOJI_PX; y++) for (let x = 0; x < EMOJI_PX; x++) { const i = (y * EMOJI_PX + x) * 4; if (d[i + 3]) c.dot(o + x, o + y, [d[i], d[i + 1], d[i + 2]], 1); } }
  else if (glyph) { const ox = Math.floor((N - glyph[0].length) / 2), oy = Math.floor((N - glyph.length) / 2); for (let y = 0; y < glyph.length; y++) for (let x = 0; x < glyph[y].length; x++) if (glyph[y][x] !== ".") c.dot(ox + x, oy + y, rgb, 1); } // (the browser has no such emoji: the guidance pins' own glyph)
  drawArrow(c, angle, N, RING_R + 2, RING_R + 7, 3.5, rgb, 1);
  c.flush();
}
/** The pin's ring radius and its arrow's tip, from its middle (art pixels): where its tip lands. */
export const PIN_TIP = RING_R + 7;

/** A rainbow hue, 0 to 1 round (0-1 rgb): the soundsystem spell's cycling colour (render/leash/stones.ts, the wave pointer). */
export const rainbow = (h: number): [number, number, number] => { const f = (n: number) => { const q = (((n + h * 6) % 6) + 6) % 6; return 1 - Math.max(0, Math.min(1, Math.min(q, 4 - q))); }; return [f(5), f(3), f(1)]; };

/** An area's neon calmed for the HUD: a little less saturated and bright, so it sits on the dark forest. */
/** How the edge pointers stand out (Ed's v5399 playtest, 2026-10-29: "it's easy to miss the pointers"; the tuning's pins, set each frame
 *  by render/view/hud.ts): `plate` a dark disc behind the ring and an outline round the arrow, its opacity (0 none, as before), so they
 *  read on any ground; `vivid` how much of the calming toward the night (calm) is taken back, 0 as calmed, 1 the neon itself. */
export const PIN_LOOK = { plate: 0, vivid: 0 };
const PLATE_RGB = [10, 8, 20];

export const calm = (c: number[]) => {
  // by saturation, not value (the art director, #188: "keep its value up … take the calm from lower saturation"): half way to
  // its grey, then lifted back so its lightest channel is near the neon's own
  const m = (c[0] + c[1] + c[2]) / 3, d = c.map(v => v * .55 + m * .45), k = Math.max(...c) * .95 / Math.max(1, ...d);
  return d.map(v => Math.min(255, v * k));
};

/** 🎶 in pixels: two eighth notes joined by their beams, 15 across (the wave pointer's middle). */
export const NOTES = [
  "....##########.",
  "....##########.",
  "....##......##.",
  "....##########.",
  "....##......##.",
  "....##......##.",
  "....##......##.",
  "....##......##.",
  "....##......##.",
  ".####....#####.",
  "#####...######.",
  "#####...######.",
  ".###.....####..",
];

/** 🎩 in pixels: her hat, a tall crown leaning back over a wide brim, its band (`+`) a lighter line (the dropped hat's pointer, rules/hat.ts). */
/** A folded map: the map table. */
export const MAP = [
  "...............",
  "####...####...#",
  "#..####...####.",
  "#.+..#..+.#..#.",
  "#.++.#.+++#..#.",
  "#..+.#..+.#.+#.",
  "#....#....#.++.",
  "#.+..#....#..#.",
  "#.++.#..+.#..#.",
  "####.####.####.",
  "....####...####",
  "...............",
];

export const HAT = [
  ".........###...",
  "........####...",
  ".......####....",
  "......#####....",
  "......#####....",
  ".....######....",
  ".....######....",
  "....#######....",
  "....+++++++....",
  "..###########..",
  "###############",
  ".#############.",
];

/** A flask in pixels (the Dowsing hat's pointer toward the nearest relic, rules/hatSpells.ts): the relic sigil's round-bellied
 *  potion flask, its cork (`+`) on a lipped neck, the glass's glint at its shoulder, and its liquid (`+`) a lighter fill with
 *  two bubbles rising in it. */
export const FLASK = [
  ".....+++++.....",
  ".....#####.....",
  "......#.#......",
  "......#.#......",
  ".....##.##.....",
  "...###...###...",
  "..#.........#..",
  ".#.+.........#.",
  ".#+++++++++++#.",
  "#++.++++++++++#",
  "#++++++++.++++#",
  "#+++++++++++++#",
  ".#+++++++++++#.",
  "..#+++++++++#..",
  "...#########...",
];

/** 🪩 in pixels: a mirror ball on its hanger, its facets a grid of lines (`#`) over lighter tiles (`+`) (the party pointer: Ed,
 *  2026-10-28, "🪩 not 🎉"). */
export const MIRRORBALL: readonly string[] = (() => {
  const rows: string[] = [];
  for (let y = 0; y < 15; y++) {
    let row = "";
    for (let x = 0; x < 15; x++) {
      const r = Math.hypot(x - 7, (y - 8.5) * 1.05);
      row += y < 2 ? (x === 7 ? "#" : ".") : r > 6.5 ? "." : r > 5.6 || x % 3 === 1 || y % 3 === 0 ? "#" : "+";
    }
    rows.push(row);
  }
  return rows;
})();

/** A pin's arrow tip over its subject's top (CSS pixels), and how far it bobs either way. */
const PIN_GAP = 20, PIN_BOB = 3;
/** Angle `a` turned toward `b` by share `k`, the short way round. */
const turnToward = (a: number, b: number, k: number) => a + Math.atan2(Math.sin(b - a), Math.cos(b - a)) * k;

/** Pixels a pin's tip keeps over a use prompt under it (StoneIndicator.update's `above`). */
const ABOVE_GAP = 6;

export class StoneIndicator {
  private cue: PixelCue;
  private v = new THREE.Vector3();
  private glyphs = new Map<string, { w: number; m: Uint8Array }>();
  private lastFill = 0;
  private flashAt = -Infinity;
  /** `scale`, `opacity`: its size and strength (only the next stone has one: Ed, 2026-10-05). */
  constructor(parent: HTMLElement, scale = SCALE, private opacity = 1) { this.cue = new PixelCue(parent, scale, opacity); }
  private shown = -1;
  /** Off the page for good (render/pins.ts Pin.dispose). */
  dispose(): void { this.cue.dispose(); }
  /** Its label pulses up (the wave pointer's tempo rising on a knockdown: index.html's bpm-up). */
  pop(): void { const L = this.cue.label; L.style.animation = "none"; void L.offsetWidth; L.style.animation = "bpm-up 1.4s ease-out"; }
  /** How much it shows, 0 to 1, times its own strength (the wave pointer fading in as the boot ends). */
  fade(a: number): void {
    if (Math.abs(a - this.shown) < 0.01) return;
    this.shown = a;
    const o = `${(a * this.opacity).toFixed(2)}`;
    this.cue.canvas.style.opacity = o; this.cue.label.style.opacity = o;
  }

  /** Point at the next waking stone at (x, z), its area's creature `species` and neon (rgb 0-1);
   *  `fill`: how far the countdown to the next wave has run (0 just after one, 1 as it comes). null hides it. */
  update(camera: THREE.Camera, width: number, height: number, at: { x: number; z: number; colour: THREE.Vector3; species: string; notes?: boolean; glyph?: readonly string[]; /** an emoji in its middle, drawn in pixels in its own colours (render/bubbles.ts, as the thrown 💌; the guidance pins: render/view/guidance.ts), else the glyph */ emoji?: string; /** the glyph in its own colour (her hats' pointers), the ring in `colour` */ glyphColour?: THREE.Vector3; /** the ring and its glyph cycling through the rainbow, as the soundsystem spell's spot does (the wave pointer: Ed, 2026-10-28) */ rainbow?: boolean; /** the creature's sigil this many art pixels across (its rank's size: 17 an adult's) */ sigilSize?: number; /** its bold sigil where it has one (leash.ranks.bold: art/sigils.js BOLD) */ bold?: boolean; /** the sigil a legend's: its colour full, not calmed, and a glint sweeping across it (render/leash/ranks.ts legendShine) */ shine?: boolean; /** how tall the subject stands (m): the pin hovers over its top (a stone's 3.2 m by default) */ top?: number; /** screen pixels from the arrow's tip up to that top (tuning pins.gap) */ gap?: number; /** the page's y its tip stays above, in view (a use prompt under it: render/view/guidance.ts) */ above?: number; /** times its size (the morning's guidance pins breathing: render/view/guidance.ts) */ scale?: number } | null, wx: number, wz: number, time: number, bpm: number, fill: number, label?: string): void {
    const c = this.cue;
    // The party spread (the countdown went back to the start): a flash.
    if (fill < this.lastFill - 0.5) this.flashAt = time;
    this.lastFill = fill;
    if (!at) { c.hide(); return; }
    // Off screen: on the edge, pointing the way; on screen (Ed, v256: "runestone UI markers
    // shouldn't disappear"): gliding from the edge to hover over its subject as a map pin (Ed, 2026-10-26: "When you get close to
    // the subject of a pointer, instead of disappearing it should float above that thing and point downwards, like a map pin"):
    // its arrow turning from the way to straight down, its tip just over the subject's top (`top` metres up), bobbing gently,
    // kept on the screen (it slid off the top as a subject came in there), smaller when she's close so it doesn't cover her, the
    // distance gone within 20 m.
    const top = at.top ?? 3.2, e = edgeSpot(this.v, camera, width, height, at.x, at.z, wx, wz, top);
    const dist = Math.hypot(at.x - wx, at.z - wz), over = 1 - e.show, ease = over * over * (3 - 2 * over);
    const size = (1 - 0.3 * ease * (1 - Math.min(1, Math.max(0, (dist - 12) / 28)))) * (at.scale ?? 1);
    const px = c.scale * size, half = (N * px) / 2, bob = ease * PIN_BOB * Math.sin(time * Math.PI); // (a bob every two beats)
    const tip = Math.min(e.sy - (at.gap ?? PIN_GAP), (at.above ?? Infinity) - ABOVE_GAP); // (the arrow's tip the gap over its top; over a use prompt there, clear of it)
    const pinY = Math.max(half + 4, tip - (RING_R + 7) * px) + bob;
    let cx = e.ex + (e.sx - e.ex) * ease, cy = e.ey + (pinY - e.ey) * ease;
    // (pins side by side where they'd overlap, as the edge's cues are along the edge)
    const arrow = turnToward(e.angle, Math.PI / 2, ease);
    ({ x: cx, y: cy } = edgeLayout.claim(cx, cy, arrow, (N * c.scale * size) * 0.42));
    c.place(cx, cy, size);
    c.clear();
    const beat = (time * bpm) / 60, pulse = Math.pow(0.5 + 0.5 * Math.cos((beat % 1) * Math.PI * 2), 2);
    const flash = Math.max(0, 1 - (time - this.flashAt) / 0.5);
    // in the area's colour, calmed toward the night (art review round 1: the UI's yellow and magenta shouted over the art)
    // (rainbow: the spell spot's own cycling hue, render/leash/stones.ts; its ring a wheel of it, turning)
    // (less calmed by pins.vivid, so they stand out: Ed's v5399 playtest)
    const calmed = (c: number[]) => { const k = calm(c), v = PIN_LOOK.vivid; return v > 0 ? k.map((x, i) => Math.min(255, x + (c[i] - x) * v)) : k; };
    const hueAt = (h: number) => { const r = rainbow(h); return calmed([r[0] * 255, r[1] * 255, r[2] * 255]); };
    const neon = at.rainbow ? hueAt(time * 0.25) : calmed([at.colour.x * 255, at.colour.y * 255, at.colour.z * 255]), lift = (n: number[]) => n.map(v => Math.min(255, v * (0.9 + 0.15 * pulse) + 255 * flash * 0.4)), bright = lift(neon);
    // A dark plate behind the ring and round the arrow (pins.plate: Ed's v5399 playtest, "it's easy to miss the pointers"), first, so
    // the ring, the glyph and the arrow (drawn whole over it) read on any ground, the forest's dark or a lit floor.
    if (PIN_LOOK.plate > 0) {
      const pr = RING_R + 2.2;
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (Math.hypot(x + 0.5 - N / 2, y + 0.5 - N / 2) <= pr) c.dot(x, y, PLATE_RGB, PIN_LOOK.plate);
      drawArrow(c, arrow, N, RING_R + 1, RING_R + 8.5, 5, PLATE_RGB, PIN_LOOK.plate);
    }
    // The ring: dim all round, bright neon clockwise from 12 o'clock as far as the countdown has run.
    const R = RING_R, ring = ringPixels(), dim = neon.map(v => v * 0.55); // the rest of the ring: dimmer, but still there on dark grass
    for (let k = 0; k < ring.length; k += 3) {
      const own = at.rainbow ? hueAt(ring[k + 2] + time * 0.25) : null;
      if (ring[k + 2] <= fill || flash > 0) c.dot(ring[k], ring[k + 1], own ? lift(own) : bright, 1);
      else c.dot(ring[k], ring[k + 1], own ? own.map(v => v * 0.55) : dim, 0.9);
    }
    // In the middle: 🎶 (the wave pointer), or the rune: the area's creature's sigil, in its neon.
    const E = at.emoji ? pixelEmojiData(at.emoji, EMOJI_PX) : null;
    if (E && E.data.some((v, i) => i % 4 === 3 && v > 0)) {
      const o = Math.floor((N - EMOJI_PX) / 2), d = E.data;
      for (let y = 0; y < EMOJI_PX; y++) for (let x = 0; x < EMOJI_PX; x++) { const i = (y * EMOJI_PX + x) * 4; if (d[i + 3]) c.dot(o + x, o + y, [d[i], d[i + 1], d[i + 2]], 1); }
    } else if (at.notes || at.glyph) {
      const ink = at.glyphColour ? calm([at.glyphColour.x * 255, at.glyphColour.y * 255, at.glyphColour.z * 255]).map(v => Math.min(255, v * (0.9 + 0.15 * pulse) + 255 * flash * 0.4)) : bright;
      const G = at.glyph ?? NOTES, ox = Math.floor((N - G[0].length) / 2), oy = Math.floor((N - G.length) / 2), band = ink.map(v => Math.min(255, v * 0.6 + 255 * 0.4));
      for (let y = 0; y < G.length; y++) { const row = G[y]; for (let x = 0; x < row.length; x++) { const on = row[x]; if (on === "#") c.dot(ox + x, oy + y, ink, 1); else if (on === "+") c.dot(ox + x, oy + y, band, 1); } }
    } else if (at.species) {
      const gs = Math.max(8, Math.min(N - 6, Math.round(at.sigilSize ?? 17))), gk = `${at.species}:${gs}${at.bold ? ":bold" : ""}`;
      let g = this.glyphs.get(gk);
      if (!g) { g = ((at.bold && boldGlyph(at.species, gs)) || sigilGlyph(at.species, gs)) as { w: number; m: Uint8Array }; this.glyphs.set(gk, g); }
      const o = Math.floor((N - g.w) / 2), w = g.w, m = g.m;
      if (at.shine) {
        // (a legend's: its full colour, and every 2.6 s a glint corner to corner, as in the world)
        const full = lift([at.colour.x * 255, at.colour.y * 255, at.colour.z * 255]), white = (k: number) => full.map(v => v + (255 - v) * k);
        const ph = (time / 2.6) % 1, sweep = ph < 0.4 ? (ph / 0.4) * 1.6 - 0.3 : -9;
        for (let y = 0; y < w; y++) for (let x = 0; x < w; x++) {
          if (!m[y * w + x]) continue;
          const glint = Math.abs(((x + 0.5) / w + 1 - (y + 0.5) / w) / 2 - sweep) < 0.13;
          c.dot(o + x, o + y, glint ? white(0.85) : full, 1);
        }
      } else for (let y = 0; y < w; y++) for (let x = 0; x < w; x++) if (m[y * w + x]) c.dot(o + x, o + y, bright, 1);
    }
    // The arrowhead outside the ring: toward the subject at the edge, straight down at it as a pin.
    drawArrow(c, arrow, N, R + 2, R + 7, 3.5, bright, 1);
    c.flush();
    // The distance on the far side of the ring from the arrow (or beside it, as a pin).
    const showLabel = label !== "" && (!!label || dist > 20); // ("": no words at all, render/pins.ts)
    if (!showLabel) { c.label.style.display = "none"; return; }
    // (opposite the arrow on the edge; beside the ring as a pin, clear of its arrow below and the clock above at the screen's top)
    const ax = -Math.cos(arrow) * (1 - ease) + ease, ay = -Math.sin(arrow) * (1 - ease), al = Math.hypot(ax, ay) || 1;
    c.say(label ?? `${Math.round(dist)} m`, `rgb(${neon.map(Math.round).join(",")})`, cx, cy, ax / al, ay / al, (R + 1.5) * c.scale * size);
  }
}
