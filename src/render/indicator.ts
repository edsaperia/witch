// Edge indicators: when something that matters is off screen, a cue at the screen's edge in its
// direction, fading out as it comes into view. Drawn as pixel art (Ed, v149: "larger and
// pixellated"): plotted pixel by pixel on a small canvas, scaled up without smoothing.
//  - "Music this way" (Ed, 2026-10-03): sound-wave arcs pulsing outward on the beat, in the party
//    colours, toward home's dancefloor; bigger and brighter when near.
//  - "Next stone" (Ed, v149; redrawn v183): the next waking area's rune (its creature's sigil) in
//    its neon, in a ring that fills clockwise from 12 o'clock as the countdown to the next wave
//    runs, flashing when the party spreads; an arrowhead toward the stone and its distance in
//    metres, on the far side of the ring from the arrow.
// Directions are in screen space, y down: an angle a points along (cos a, sin a) on the canvas.
import * as THREE from "three";
import { sigilGlyph } from "../../art/generator.js";
import { placed } from "./height";

const N = 40; // art pixels across
const SCALE = 4; // screen pixels per art pixel

/** Where on the screen's edge to put a cue for (x, z), and how much it shows (0 when on screen). */
function edgeSpot(v: THREE.Vector3, camera: THREE.Camera, width: number, height: number, x: number, z: number) {
  const p = placed(v.set(x, 1, z)).project(camera); // on the rolling ground, bent as drawn
  const inside = Math.max(Math.abs(p.x), Math.abs(p.y));
  const show = p.z < 1 ? Math.min(1, Math.max(0, (inside - 0.9) / 0.25)) : 1;
  let dx = p.x, dy = p.y;
  if (p.z >= 1) { dx = -dx; dy = -dy; } // behind the camera: flip
  // Clamped to a box inside the edge, clear of the countdown bar on the right and the panels top left.
  const k = 1 / Math.max(Math.abs(dx) / 0.84, Math.abs(dy) / 0.76, 1e-6);
  return { show, sx: ((dx * k + 1) / 2) * width, sy: ((1 - dy * k) / 2) * height, angle: screenAngle(dx, dy) };
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

class PixelCue {
  readonly canvas = document.createElement("canvas");
  readonly label = document.createElement("div");
  readonly g: CanvasRenderingContext2D;
  readonly img: ImageData;
  constructor(parent: HTMLElement) {
    this.canvas.width = this.canvas.height = N;
    Object.assign(this.canvas.style, { position: "fixed", width: `${N * SCALE}px`, height: `${N * SCALE}px`, imageRendering: "pixelated", pointerEvents: "none", zIndex: "2", display: "none" });
    Object.assign(this.label.style, { position: "fixed", pointerEvents: "none", zIndex: "2", display: "none", font: "bold 12px monospace", color: "#fff", textShadow: "0 1px 0 #000, 1px 0 0 #000", transform: "translate(-50%, 0)" });
    parent.append(this.canvas, this.label);
    this.g = this.canvas.getContext("2d")!;
    this.img = this.g.createImageData(N, N);
  }
  hide(): void { this.canvas.style.display = "none"; this.label.style.display = "none"; }
  place(sx: number, sy: number): void {
    this.canvas.style.display = "block";
    this.canvas.style.left = `${sx - (N * SCALE) / 2}px`;
    this.canvas.style.top = `${sy - (N * SCALE) / 2}px`;
  }
  clear(): void { this.img.data.fill(0); }
  dot(x: number, y: number, rgb: number[], a: number): void {
    x = Math.round(x); y = Math.round(y);
    if (x < 0 || y < 0 || x >= N || y >= N || a <= 0.02) return;
    const i = (y * N + x) * 4;
    if (this.img.data[i + 3] >= a * 255) return;
    this.img.data.set([rgb[0], rgb[1], rgb[2], Math.round(Math.min(1, a) * 255)], i);
  }
  flush(): void { this.g.putImageData(this.img, 0, 0); }
}

const PARTY: number[][] = [[255, 111, 207], [95, 232, 255], [255, 226, 92]];

export class MusicIndicator {
  private cue: PixelCue;
  private v = new THREE.Vector3();
  constructor(parent: HTMLElement) { this.cue = new PixelCue(parent); }

  /** Point at (x, z) on the ground; width and height: the screen's size (CSS pixels). */
  update(camera: THREE.Camera, width: number, height: number, x: number, z: number, wx: number, wz: number, time: number, bpm: number, debug: boolean): void {
    const e = edgeSpot(this.v, camera, width, height, x, z), c = this.cue;
    if (e.show <= 0.01) { c.hide(); return; }
    const dist = Math.hypot(x - wx, z - wz), near = Math.max(0.35, Math.min(1, 1 - dist / 900));
    c.place(e.sx, e.sy);
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
    if (debug) { c.label.textContent = `${Math.round(dist)} m`; c.label.style.left = `${e.sx}px`; c.label.style.top = `${e.sy + (N * SCALE) / 2 - 18}px`; }
  }
}

export class StoneIndicator {
  private cue: PixelCue;
  private v = new THREE.Vector3();
  private glyphs = new Map<string, { w: number; m: Uint8Array }>();
  private lastFill = 0;
  private flashAt = -Infinity;
  constructor(parent: HTMLElement) { this.cue = new PixelCue(parent); }

  /** Point at the next waking stone at (x, z), its area's creature `species` and neon (rgb 0-1);
   *  `fill`: how far the countdown to the next wave has run (0 just after one, 1 as it comes). null hides it. */
  update(camera: THREE.Camera, width: number, height: number, at: { x: number; z: number; colour: THREE.Vector3; species: string } | null, wx: number, wz: number, time: number, bpm: number, fill: number): void {
    const c = this.cue;
    // The party spread (the countdown went back to the start): a flash.
    if (fill < this.lastFill - 0.5) this.flashAt = time;
    this.lastFill = fill;
    if (!at) { c.hide(); return; }
    const e = edgeSpot(this.v, camera, width, height, at.x, at.z);
    if (e.show <= 0.01) { c.hide(); return; }
    c.place(e.sx, e.sy);
    c.clear();
    const beat = (time * bpm) / 60, pulse = Math.pow(0.5 + 0.5 * Math.cos((beat % 1) * Math.PI * 2), 2);
    const flash = Math.max(0, 1 - (time - this.flashAt) / 0.5);
    const neon = [at.colour.x * 255, at.colour.y * 255, at.colour.z * 255], bright = neon.map(v => Math.min(255, v * (0.8 + 0.4 * pulse) + 255 * flash * 0.6));
    // The ring: dim all round, bright neon clockwise from 12 o'clock as far as the countdown has run.
    const R = 13;
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const px = x + 0.5 - N / 2, py = y + 0.5 - N / 2, r = Math.hypot(px, py);
      if (Math.abs(r - R) > 1.05) continue;
      const turn = ((Math.atan2(px, -py) / (Math.PI * 2)) + 1) % 1; // 0 at 12 o'clock, clockwise
      if (turn <= fill || flash > 0) c.dot(x, y, bright, e.show);
      else c.dot(x, y, neon.map(v => v * 0.35), e.show * 0.8);
    }
    // The rune in the middle: the area's creature's sigil, in its neon.
    let g = this.glyphs.get(at.species);
    if (!g) { g = sigilGlyph(at.species, 17) as { w: number; m: Uint8Array }; this.glyphs.set(at.species, g); }
    const o = Math.floor((N - g.w) / 2);
    for (let y = 0; y < g.w; y++) for (let x = 0; x < g.w; x++) if (g.m[y * g.w + x]) c.dot(o + x, o + y, bright, e.show);
    // The arrowhead outside the ring, toward the stone.
    for (const [x, y] of arrowPixels(e.angle, N, R + 2, R + 7, 3.5)) c.dot(x, y, bright, e.show);
    c.flush();
    // The distance on the far side of the ring from the arrow.
    c.label.style.display = "block";
    c.label.textContent = `${Math.round(Math.hypot(at.x - wx, at.z - wz))} m`;
    c.label.style.color = `rgb(${neon.map(Math.round).join(",")})`;
    const lx = e.sx - Math.cos(e.angle) * (R + 6) * SCALE, ly = e.sy - Math.sin(e.angle) * (R + 6) * SCALE;
    c.label.style.left = `${lx}px`;
    c.label.style.top = `${ly - 7}px`;
  }
}
