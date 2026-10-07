// Edge indicators: when something that matters is off screen, a cue at the screen's edge in its
// direction, fading out as it comes into view. Drawn as pixel art (Ed, v149: "larger and
// pixellated"): plotted pixel by pixel on a small canvas, scaled up without smoothing.
//  - "Music this way" (Ed, 2026-10-03): sound-wave arcs pulsing outward on the beat, in the party
//    colours, toward home's dancefloor; bigger and brighter when near.
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
// Directions are in screen space, y down: an angle a points along (cos a, sin a) on the canvas.
import * as THREE from "three";
import { sigilGlyph } from "../../art/generator.js";
import { groundHeight, HEIGHT_UNIFORMS, placed, seenOverBend } from "./height";

export const N = 40; // art pixels across
const SCALE = 4; // screen pixels per art pixel

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

/** An area's neon calmed for the HUD: a little less saturated and bright, so it sits on the dark forest. */
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

const PARTY: number[][] = [[232, 180, 106], [232, 180, 106], [232, 180, 106]]; // the HUD's one accent (art review round 1: the UI in the art's palette)

/** 🎩 in pixels: her hat, a tall crown leaning back over a wide brim, its band (`+`) a lighter line (the dropped hat's pointer, rules/hat.ts). */
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

export class MusicIndicator {
  private cue: PixelCue;
  private v = new THREE.Vector3();
  constructor(parent: HTMLElement) { this.cue = new PixelCue(parent); }

  /** Point at (x, z) on the ground; width and height: the screen's size (CSS pixels). */
  update(camera: THREE.Camera, width: number, height: number, x: number, z: number, wx: number, wz: number, time: number, bpm: number, debug: boolean): void {
    const e = edgeSpot(this.v, camera, width, height, x, z, wx, wz), c = this.cue;
    if (e.show <= 0.01) { c.hide(); return; }
    const dist = Math.hypot(x - wx, z - wz), near = Math.max(0.35, Math.min(1, 1 - dist / 900));
    c.place(e.ex, e.ey);
    c.clear();
    const beat = (time * bpm) / 60, ph = beat - Math.floor(beat), ca = Math.cos(-e.angle), sa = Math.sin(-e.angle);
    // Three arcs centred off toward the music, bulging back toward the middle of the screen,
    // plotted one art pixel thick.
    for (let y = 0; y < N; y++) for (let x2 = 0; x2 < N; x2++) {
      const lx = (x2 - N / 2 + 0.5) * ca - (y - N / 2 + 0.5) * sa, ly = (x2 - N / 2 + 0.5) * sa + (y - N / 2 + 0.5) * ca;
      const qx = lx - 11, r = Math.hypot(qx, ly), ang = Math.abs(Math.atan2(ly, -qx));
      if (ang > 0.75) continue;
      for (let i = 0; i < 3; i++) {
        const R = (4 + i * 4 + ph * 4) * (0.75 + 0.25 * near);
        if (Math.abs(r - R) < 0.62) c.dot(x2, y, PARTY[i], e.show * near * (1 - (i + ph) / 3.2));
      }
    }
    c.flush();
    c.label.style.display = debug ? "block" : "none";
    if (debug) { c.label.textContent = `${Math.round(dist)} m`; c.label.style.left = `${e.ex}px`; c.label.style.top = `${e.ey + (N * SCALE) / 2 - 18}px`; }
  }
}

export class StoneIndicator {
  private cue: PixelCue;
  private v = new THREE.Vector3();
  private glyphs = new Map<string, { w: number; m: Uint8Array }>();
  private lastFill = 0;
  private flashAt = -Infinity;
  /** `scale`, `opacity`: its size and strength (only the next stone has one: Ed, 2026-10-05). */
  constructor(parent: HTMLElement, scale = SCALE, private opacity = 1) { this.cue = new PixelCue(parent, scale, opacity); }
  private shown = -1;
  /** How much it shows, 0 to 1, times its own strength (the wave pointer fading in as the boot ends). */
  fade(a: number): void {
    if (Math.abs(a - this.shown) < 0.01) return;
    this.shown = a;
    const o = `${(a * this.opacity).toFixed(2)}`;
    this.cue.canvas.style.opacity = o; this.cue.label.style.opacity = o;
  }

  /** Point at the next waking stone at (x, z), its area's creature `species` and neon (rgb 0-1);
   *  `fill`: how far the countdown to the next wave has run (0 just after one, 1 as it comes). null hides it. */
  update(camera: THREE.Camera, width: number, height: number, at: { x: number; z: number; colour: THREE.Vector3; species: string; notes?: boolean; glyph?: readonly string[] } | null, wx: number, wz: number, time: number, bpm: number, fill: number, label?: string): void {
    const c = this.cue;
    // The party spread (the countdown went back to the start): a flash.
    if (fill < this.lastFill - 0.5) this.flashAt = time;
    this.lastFill = fill;
    if (!at) { c.hide(); return; }
    // Off screen: on the edge, pointing the way; on screen (Ed, v256: "runestone UI markers
    // shouldn't disappear"): gliding from the edge to hover over the stone, without the arrow,
    // smaller when she's close so it doesn't cover her, the distance gone within 20 m.
    const e = edgeSpot(this.v, camera, width, height, at.x, at.z, wx, wz, 3.2);
    const dist = Math.hypot(at.x - wx, at.z - wz), over = 1 - e.show, ease = over * over * (3 - 2 * over);
    const size = 1 - 0.3 * ease * (1 - Math.min(1, Math.max(0, (dist - 12) / 28)));
    const lift = (N * c.scale * size) / 2 + 6; // above the stone's top, clear of it
    let cx = e.ex + (e.sx - e.ex) * ease, cy = e.ey + (e.sy - lift - e.ey) * ease;
    ({ x: cx, y: cy } = edgeLayout.claim(cx, cy, e.angle, (N * c.scale * size) * 0.42, e.show > 0.5));
    c.place(cx, cy, size);
    c.clear();
    const beat = (time * bpm) / 60, pulse = Math.pow(0.5 + 0.5 * Math.cos((beat % 1) * Math.PI * 2), 2);
    const flash = Math.max(0, 1 - (time - this.flashAt) / 0.5);
    // in the area's colour, calmed toward the night (art review round 1: the UI's yellow and magenta shouted over the art)
    const neon = calm([at.colour.x * 255, at.colour.y * 255, at.colour.z * 255]), bright = neon.map(v => Math.min(255, v * (0.9 + 0.15 * pulse) + 255 * flash * 0.4));
    // The ring: dim all round, bright neon clockwise from 12 o'clock as far as the countdown has run.
    const R = 13;
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const px = x + 0.5 - N / 2, py = y + 0.5 - N / 2, r = Math.hypot(px, py);
      if (Math.abs(r - R) > 0.7) continue; // a thin stroke (calm by line, not by dimming)
      const turn = ((Math.atan2(px, -py) / (Math.PI * 2)) + 1) % 1; // 0 at 12 o'clock, clockwise
      if (turn <= fill || flash > 0) c.dot(x, y, bright, 1);
      else c.dot(x, y, neon.map(v => v * 0.55), 0.9); // the rest of the ring: dimmer, but still there on dark grass
    }
    // In the middle: 🎶 (the wave pointer), or the rune: the area's creature's sigil, in its neon.
    if (at.notes || at.glyph) {
      const G = at.glyph ?? NOTES, ox = Math.floor((N - G[0].length) / 2), oy = Math.floor((N - G.length) / 2), band = bright.map(v => Math.min(255, v * 0.6 + 255 * 0.4));
      G.forEach((row, y) => [...row].forEach((on, x) => { if (on === "#") c.dot(ox + x, oy + y, bright, 1); else if (on === "+") c.dot(ox + x, oy + y, band, 1); }));
    } else {
      let g = this.glyphs.get(at.species);
      if (!g) { g = sigilGlyph(at.species, 17) as { w: number; m: Uint8Array }; this.glyphs.set(at.species, g); }
      const o = Math.floor((N - g.w) / 2);
      for (let y = 0; y < g.w; y++) for (let x = 0; x < g.w; x++) if (g.m[y * g.w + x]) c.dot(o + x, o + y, bright, 1);
    }
    // The arrowhead outside the ring, toward the stone (fading as it comes over the stone).
    for (const [x, y] of arrowPixels(e.angle, N, R + 2, R + 7, 3.5)) c.dot(x, y, bright, e.show);
    c.flush();
    // The distance on the far side of the ring from the arrow (or under the ring, over the stone).
    const showLabel = !!label || dist > 20;
    if (!showLabel) { c.label.style.display = "none"; return; }
    const ax = -Math.cos(e.angle) * e.show, ay = -Math.sin(e.angle) * e.show + (1 - e.show), al = Math.hypot(ax, ay) || 1;
    c.say(label ?? `${Math.round(dist)} m`, `rgb(${neon.map(Math.round).join(",")})`, cx, cy, ax / al, ay / al, (R + 1.5) * c.scale * size);
  }
}
