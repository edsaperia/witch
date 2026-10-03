// "Music this way" (Ed, 2026-10-03): when home's dancefloor is off screen, a few sound-wave arcs
// at the screen's edge in its direction, pulsing outward on the beat, in the party colours;
// bigger and brighter when it's near, smaller and fainter far off, fading out as it comes into
// view. A small canvas over the game, drawn smooth (it's a cue, not part of the world).
import * as THREE from "three";

const COLOURS = ["#ff6fcf", "#5fe8ff", "#ffe25c"];

export class MusicIndicator {
  private canvas = document.createElement("canvas");
  private g: CanvasRenderingContext2D;
  private v = new THREE.Vector3();

  constructor(parent: HTMLElement) {
    this.canvas.width = this.canvas.height = 96;
    Object.assign(this.canvas.style, { position: "fixed", width: "96px", height: "96px", pointerEvents: "none", zIndex: "2", display: "none" });
    parent.appendChild(this.canvas);
    this.g = this.canvas.getContext("2d")!;
  }

  /** Point at (x, z) on the ground; width and height: the canvas's size on screen (CSS pixels). */
  update(camera: THREE.Camera, width: number, height: number, x: number, z: number, wx: number, wz: number, time: number, bpm: number, debug: boolean): void {
    const p = this.v.set(x, 1, z).project(camera);
    // In view (with a margin): fade out as it comes on screen.
    const inside = Math.max(Math.abs(p.x), Math.abs(p.y));
    const show = p.z < 1 ? Math.min(1, Math.max(0, (inside - 0.9) / 0.25)) : 1;
    if (show <= 0.01) { this.canvas.style.display = "none"; return; }
    // Where on the edge: the direction from the screen's centre, clamped to a box inside the edge
    // (clear of the countdown bar on the right and the panels top left).
    let dx = p.x, dy = p.y;
    if (p.z >= 1) { dx = -dx; dy = -dy; } // behind the camera: flip
    const k = 1 / Math.max(Math.abs(dx) / 0.86, Math.abs(dy) / 0.8, 1e-6);
    const sx = ((dx * k + 1) / 2) * width, sy = ((1 - dy * k) / 2) * height;
    const dist = Math.hypot(x - wx, z - wz), near = Math.max(0.25, Math.min(1, 1 - dist / 900));
    this.canvas.style.display = "block";
    this.canvas.style.left = `${sx - 48}px`;
    this.canvas.style.top = `${sy - 48}px`;
    const g = this.g, a = Math.atan2(-dy, dx); // towards the music, on screen
    g.clearRect(0, 0, 96, 96);
    g.save();
    g.translate(48, 48);
    g.rotate(a);
    const beat = (time * bpm) / 60, ph = beat - Math.floor(beat);
    for (let i = 0; i < 3; i++) {
      // Arcs centred off toward the music, bulging back toward the middle of the screen.
      const r = (10 + i * 9 + ph * 9) * (0.7 + 0.3 * near), alpha = show * near * (1 - (i + ph) / 3.2);
      g.strokeStyle = COLOURS[i];
      g.globalAlpha = Math.max(0, alpha);
      g.lineWidth = 3;
      g.beginPath();
      g.arc(26, 0, r, Math.PI - 0.7, Math.PI + 0.7);
      g.stroke();
    }
    if (debug) { g.rotate(-a); g.globalAlpha = 0.8; g.fillStyle = "#fff"; g.font = "10px monospace"; g.textAlign = "center"; g.fillText(`${Math.round(dist)} m`, 0, 40); }
    g.restore();
  }
}
