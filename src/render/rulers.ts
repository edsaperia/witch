// Metre rulers (Ed, 2026-10-03, a debug aid): along the bottom edge, ground distances across the
// screen (0 at the witch, a major tick every 10 m, minor every 2 m); down the left edge, ground
// distances up and down the screen (0 at the witch, positive up the screen), whose ticks close
// up toward the top as the camera foreshortens the ground; a faint 10 m grid on the ground with
// a stronger line every 50 m; and a readout of the camera's height and the ground width across
// the screen. Redrawn every frame, so it's right at every zoom and in both modes. G toggles it.
import * as THREE from "three";
import { placed } from "./height";

export class Rulers {
  private canvas = document.createElement("canvas");
  private g: CanvasRenderingContext2D;
  private v = new THREE.Vector3();
  private d = new THREE.Vector3();
  on = false;

  constructor(parent: HTMLElement) {
    Object.assign(this.canvas.style, { position: "fixed", left: "0", top: "0", pointerEvents: "none", zIndex: "3", display: "none" });
    parent.appendChild(this.canvas);
    this.g = this.canvas.getContext("2d")!;
  }

  /** The ground point (y = 0) under screen point (nx, ny) in normalised device coordinates. */
  private ground(camera: THREE.Camera, nx: number, ny: number): THREE.Vector3 | null {
    const o = (camera as THREE.PerspectiveCamera).position;
    this.d.set(nx, ny, 0.5).unproject(camera).sub(o);
    if (this.d.y >= -1e-6) return null;
    return o.clone().addScaledVector(this.d, -o.y / this.d.y);
  }

  update(camera: THREE.Camera, width: number, height: number, wx: number, wz: number): void {
    this.canvas.style.display = this.on ? "block" : "none";
    if (!this.on) return;
    if (this.canvas.width !== width || this.canvas.height !== height) { this.canvas.width = width; this.canvas.height = height; }
    const g = this.g, scr = (x: number, z: number) => { const p = placed(this.v.set(x, 0, z)).project(camera); return [((p.x + 1) / 2) * width, ((1 - p.y) / 2) * height, p.z] as const; };
    g.clearRect(0, 0, width, height);
    const line = (x0: number, y0: number, x1: number, y1: number, a: number) => {
      g.strokeStyle = "rgba(0,0,0,0.6)"; g.lineWidth = 3; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
      g.strokeStyle = `rgba(255,255,255,${a})`; g.lineWidth = 1; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
    };
    const label = (s: string, x: number, y: number, align: CanvasTextAlign) => {
      g.font = "10px ui-monospace, monospace"; g.textAlign = align; g.textBaseline = "middle";
      g.fillStyle = "rgba(0,0,0,0.8)"; g.fillText(s, x + 1, y + 1); g.fillStyle = "rgba(255,255,255,0.85)"; g.fillText(s, x, y);
    };
    const bottom = this.ground(camera, 0, -0.98), top = this.ground(camera, 0, 0.98) ?? this.ground(camera, 0, 0.3);
    if (!bottom || !top) return;
    // The ground grid: 10 m lines, stronger every 50 m, over what's on screen.
    const left = this.ground(camera, -1, -1)!, right = this.ground(camera, 1, -1)!, tl = this.ground(camera, -1, 0.98) ?? left, tr = this.ground(camera, 1, 0.98) ?? right;
    const minX = Math.min(left.x, tl.x), maxX = Math.max(right.x, tr.x), minZ = Math.min(top.z, tl.z), maxZ = bottom.z;
    for (let x = Math.ceil(minX / 10) * 10; x <= maxX; x += 10) { const a = scr(x, minZ), b = scr(x, maxZ); line(a[0], a[1], b[0], b[1], x % 50 === 0 ? 0.28 : 0.1); }
    for (let z = Math.ceil(minZ / 10) * 10; z <= maxZ; z += 10) { const a = scr(minX, z), b = scr(maxX, z); line(a[0], a[1], b[0], b[1], z % 50 === 0 ? 0.28 : 0.1); }
    // Bottom ruler: across the screen at the bottom edge's depth, 0 at the witch.
    const by = height - 6;
    line(0, by, width, by, 0.6);
    for (let k = Math.ceil((left.x - wx) / 2) * 2; wx + k <= right.x; k += 2) {
      const sx = scr(wx + k, bottom.z)[0], major = k % 10 === 0;
      line(sx, by, sx, by - (major ? 10 : 5), 0.6);
      if (major) label(`${k}`, sx, by - 18, "center");
    }
    // Left ruler: up and down the screen through the witch, 0 at her, positive up the screen.
    const lx = 6;
    line(lx, 0, lx, height, 0.6);
    for (let k = Math.ceil((wz - bottom.z) / 2) * 2; wz - k >= top.z - 1e-6 && k < 400; k += 2) {
      const sy = scr(wx, wz - k)[1], major = k % 10 === 0;
      if (sy < 0 || sy > height) continue;
      line(lx, sy, lx + (major ? 10 : 5), sy, 0.6);
      if (major) label(`${k}`, lx + 14, sy, "left");
    }
    // Readout: camera height, ground width across the screen at the witch's depth.
    const mid = scr(wx, wz), ml = this.ground(camera, -1, 1 - (mid[1] / height) * 2), mr = this.ground(camera, 1, 1 - (mid[1] / height) * 2);
    const across = ml && mr ? Math.round(mr.x - ml.x) : 0, camY = Math.round((camera as THREE.PerspectiveCamera).position.y);
    label(`camera ${camY} m up · ${across} m across at the witch`, width - 12, height - 24, "right");
  }
}
