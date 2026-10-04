// The spell's look (rules/spells.ts): while the speed boost is on, a trail of glowing motes
// streams behind the witch; in the corner, a small pixel ring shows the spell recharging (filling
// clockwise from 12 o'clock), bright and pulsing when it's ready.
import * as THREE from "three";
import { spellActive, spellCharge } from "../rules/spells";
import type { Game } from "../rules/game";

const N = 28, SCALE = 3, MAX = 240;

export class SpellFx {
  readonly trail: THREE.Points;
  private pos = new Float32Array(MAX * 3);
  private col = new Float32Array(MAX * 4);
  private pts: { x: number; y: number; z: number; at: number }[] = [];
  private canvas = document.createElement("canvas");
  private g: CanvasRenderingContext2D;
  private img: ImageData;
  private lastDrop = 0;

  constructor(parent: HTMLElement) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(this.col, 4));
    this.trail = new THREE.Points(geo, new THREE.PointsMaterial({ size: 5, sizeAttenuation: false, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.trail.frustumCulled = false;
    this.canvas.width = this.canvas.height = N;
    Object.assign(this.canvas.style, { position: "fixed", left: "14px", bottom: "44px", width: `${N * SCALE}px`, height: `${N * SCALE}px`, imageRendering: "pixelated", pointerEvents: "none", zIndex: "2" });
    parent.append(this.canvas);
    this.g = this.canvas.getContext("2d")!;
    this.img = this.g.createImageData(N, N);
  }

  /** `y`: her height (metres) where the trail streams from. */
  update(g: Game, time: number, y: number): void {
    const s = g.spells, w = g.witch, active = spellActive(s, time);
    // The trail: a mote dropped every 1/60 s while it's on, each fading over 0.6 s.
    if (active && time - this.lastDrop > 1 / 60) {
      this.lastDrop = time;
      for (let k = 0; k < 3; k++) this.pts.push({ x: w.x + (Math.random() - 0.5) * 0.8, y: y + (Math.random() - 0.5) * 0.8, z: w.z + (Math.random() - 0.5) * 0.8, at: time });
    }
    this.pts = this.pts.filter(p => time - p.at < 0.8).slice(-MAX);
    this.pts.forEach((p, i) => {
      const k = 1 - (time - p.at) / 0.8;
      this.pos.set([p.x, p.y, p.z], i * 3);
      this.col.set([0.55 + 0.45 * k, 0.9, 1, k], i * 4);
    });
    const geo = this.trail.geometry;
    geo.setDrawRange(0, this.pts.length);
    (geo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (geo.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
    // The HUD ring: dim where it's still recharging, bright where charged; a lightning bolt in the middle.
    const charge = spellCharge(s, time), ready = charge >= 1, pulse = ready ? 0.75 + 0.25 * Math.sin(time * 5) : 1;
    const d = this.img.data;
    d.fill(0);
    const dot = (x: number, y2: number, r: number, gg: number, b: number, a: number) => { const i = (y2 * N + x) * 4; d[i] = r; d[i + 1] = gg; d[i + 2] = b; d[i + 3] = a; };
    for (let y2 = 0; y2 < N; y2++) for (let x = 0; x < N; x++) {
      const px = x + 0.5 - N / 2, py = y2 + 0.5 - N / 2, r = Math.hypot(px, py);
      if (Math.abs(r - 11) > 1.05) continue;
      const turn = ((Math.atan2(px, -py) / (Math.PI * 2)) + 1) % 1;
      if (active) dot(x, y2, 255, 255, 255, 255);
      else if (turn <= charge) dot(x, y2, 120 * pulse, 230 * pulse, 255 * pulse, 255);
      else dot(x, y2, 40, 70, 90, 200);
    }
    const bolt = [[15, 6], [14, 7], [13, 8], [12, 9], [11, 10], [10, 11], [11, 12], [12, 12], [13, 12], [14, 12], [13, 13], [12, 14], [11, 15], [10, 16], [9, 17], [10, 17]];
    for (const [x, y2] of bolt) dot(x, y2 + 2, ready || active ? 255 : 120, ready || active ? 240 : 110, ready || active ? 120 : 80, 255);
    this.g.putImageData(this.img, 0, 0);
  }
}
