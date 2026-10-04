// Edge indicators: when something that matters is off screen, a cue at the screen's edge in its
// direction, fading out as it comes into view. Drawn as pixel art (Ed, v149: "larger and
// pixellated"): plotted pixel by pixel on a small canvas, scaled up without smoothing.
//  - "Music this way" (Ed, 2026-10-03): sound-wave arcs pulsing outward on the beat, in the party
//    colours, toward home's dancefloor; bigger and brighter when near.
//  - "Next stone" (Ed, v149): a standing-stone icon in the next waking area's neon, pulsing on the
//    beat, with its distance in metres, toward the stone the next wave will wake.
import * as THREE from "three";

const N = 40; // art pixels across
const SCALE = 4; // screen pixels per art pixel

/** Where on the screen's edge to put a cue for (x, z), and how much it shows (0 when on screen). */
function edgeSpot(v: THREE.Vector3, camera: THREE.Camera, width: number, height: number, x: number, z: number) {
  const p = v.set(x, 1, z).project(camera);
  const inside = Math.max(Math.abs(p.x), Math.abs(p.y));
  const show = p.z < 1 ? Math.min(1, Math.max(0, (inside - 0.9) / 0.25)) : 1;
  let dx = p.x, dy = p.y;
  if (p.z >= 1) { dx = -dx; dy = -dy; } // behind the camera: flip
  // Clamped to a box inside the edge, clear of the countdown bar on the right and the panels top left.
  const k = 1 / Math.max(Math.abs(dx) / 0.84, Math.abs(dy) / 0.76, 1e-6);
  return { show, sx: ((dx * k + 1) / 2) * width, sy: ((1 - dy * k) / 2) * height, angle: Math.atan2(-dy, dx) };
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

// A small standing stone, 9 wide and 14 tall, with a rune slot; "#" stone, "r" rune.
const STONE = [
  "  ####   ",
  " ######  ",
  " ####### ",
  "#########",
  "####r####",
  "###rrr###",
  "####r####",
  "###r#r###",
  "#########",
  "#########",
  "#########",
  " ####### ",
  "#########",
  "#########",
];

export class StoneIndicator {
  private cue: PixelCue;
  private v = new THREE.Vector3();
  constructor(parent: HTMLElement) { this.cue = new PixelCue(parent); }

  /** Point at the next waking stone at (x, z), in its area's neon (rgb 0-1); null hides it. */
  update(camera: THREE.Camera, width: number, height: number, at: { x: number; z: number; colour: THREE.Vector3 } | null, wx: number, wz: number, time: number, bpm: number, build: number): void {
    const c = this.cue;
    if (!at) { c.hide(); return; }
    const e = edgeSpot(this.v, camera, width, height, at.x, at.z);
    if (e.show <= 0.01) { c.hide(); return; }
    c.place(e.sx, e.sy);
    c.clear();
    const beat = (time * bpm) / 60, pulse = Math.pow(0.5 + 0.5 * Math.cos((beat % 1) * Math.PI * 2), 2) * (0.5 + 0.5 * build);
    const neon = [at.colour.x * 255, at.colour.y * 255, at.colour.z * 255], stone = [150, 150, 165];
    // The stone in the middle, its rune glowing; a pointer pixel trail toward the stone's direction.
    const ox = N / 2 - 4, oy = N / 2 - 8;
    STONE.forEach((row, y) => [...row].forEach((ch, x) => {
      if (ch === "#") c.dot(ox + x, oy + y, stone, e.show * 0.95);
      else if (ch === "r") c.dot(ox + x, oy + y, neon.map(v => Math.min(255, v * (0.7 + 0.6 * pulse))), e.show);
    }));
    // A glow ring round it, pulsing on the beat.
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const r = Math.hypot(x - N / 2 + 0.5, y - N / 2 + 0.5), R = 11 + pulse * 3;
      if (Math.abs(r - R) < 0.6) c.dot(x, y, neon, e.show * (0.45 + 0.55 * pulse));
    }
    // An arrowhead on the ring, toward the stone.
    for (let i = 0; i < 4; i++) for (let j = -i; j <= i; j++) {
      const d = 17 - i, px = N / 2 + Math.cos(e.angle) * d - Math.sin(e.angle) * j, py = N / 2 - Math.sin(e.angle) * d - Math.cos(e.angle) * j;
      c.dot(px, py, neon, e.show);
    }
    c.flush();
    c.label.style.display = "block";
    c.label.textContent = `${Math.round(Math.hypot(at.x - wx, at.z - wz))} m`;
    c.label.style.color = `rgb(${neon.map(Math.round).join(",")})`;
    c.label.style.left = `${e.sx}px`;
    c.label.style.top = `${e.sy + (N * SCALE) / 2 - 22}px`;
  }
}
