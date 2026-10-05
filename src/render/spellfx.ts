// The spell's and the blink's look (rules/spells.ts, rules/dash.ts): while the speed boost is on, a
// trail of glowing motes streams behind the witch; a blink (the dash) leaves a puff of motes falling
// in on where she was, a burst flying out where she lands, and for a moment a faint streak of motes
// between the two so the eye follows her. (Their recharge shows on the action bar: render/actionbar.ts.)
import * as THREE from "three";
import { spellActive } from "../rules/spells";
import type { Game } from "../rules/game";
import { groundPoints } from "./height";

const MAX = 320;

export class SpellFx {
  readonly trail: THREE.Points;
  private pos = new Float32Array(MAX * 3);
  private col = new Float32Array(MAX * 4);
  /** Each mote: where it starts, its drift (m/s), when it was made and how long it lasts. */
  private pts: { x: number; y: number; z: number; vx: number; vy: number; vz: number; at: number; life: number; a: number }[] = [];
  private lastDrop = 0;
  private lastBlink = -Infinity;

  constructor() {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(this.col, 4));
    this.trail = new THREE.Points(geo, groundPoints(5)); // over the rolling ground, bent with the world
    this.trail.frustumCulled = false;
  }

  /** `y`: her height (metres) where the trail streams from. */
  update(g: Game, time: number, y: number): void {
    const s = g.spells, w = g.witch, active = spellActive(s, time), mote = (x: number, y: number, z: number, vx = 0, vy = 0, vz = 0, life = 0.8, at = time, a = 1) => this.pts.push({ x, y, z, vx, vy, vz, at, life, a });
    // The trail: a mote dropped every 1/60 s while it's on, each fading over 0.8 s.
    if (active && time - this.lastDrop > 1 / 60) {
      this.lastDrop = time;
      for (let k = 0; k < 3; k++) mote(w.x + (Math.random() - 0.5) * 0.8, y + (Math.random() - 0.5) * 0.8, w.z + (Math.random() - 0.5) * 0.8);
    }
    // A blink: in on where she was, out where she lands, a streak between.
    const D = g.witches[0].dash;
    if (D.at !== this.lastBlink && time >= D.at - 1 / 60) {
      this.lastBlink = D.at;
      // Kept faint (they bloom): each puff a loose ring that never gathers to one bright point.
      const n = 16;
      for (let k = 0; k < n; k++) {
        const a = (k / n) * Math.PI * 2 + Math.random() * 0.4, r = 1.4 + Math.random() * 0.5, h = (Math.random() - 0.3) * 1.6, inT = 0.25;
        const ox = Math.cos(a), oz = Math.sin(a) * 0.6;
        mote(D.fromX + ox * r, y + h, D.fromZ + oz * r, -ox * r * 0.75 / inT, -h * 0.5 / inT, -oz * r * 0.75 / inT, inT, D.at, 0.55); // falling in, to a quarter of the way out
        mote(D.toX + ox * 0.5, y + h * 0.3, D.toZ + oz * 0.5, ox * 4, h + 0.6, oz * 4, 0.35, D.at, 0.55); // flying out
      }
      // The streak: a sparse, faint dotted line, gone in a few frames.
      const len = Math.hypot(D.toX - D.fromX, D.toZ - D.fromZ), m = Math.max(2, Math.round(len * 0.7));
      for (let k = 1; k < m; k++) { const f = k / m; mote(D.fromX + (D.toX - D.fromX) * f, y + (Math.random() - 0.5) * 0.3, D.fromZ + (D.toZ - D.fromZ) * f, 0, 0, 0, 0.05 + 0.04 * f, D.at, 0.3); }
    }
    this.pts = this.pts.filter(p => time - p.at < p.life && time >= p.at - 1 / 60).slice(-MAX);
    this.pts.forEach((p, i) => {
      const age = Math.max(0, time - p.at), k = 1 - age / p.life;
      this.pos.set([p.x + p.vx * age, p.y + p.vy * age, p.z + p.vz * age], i * 3);
      this.col.set([0.55 + 0.45 * k, 0.9, 1, k * p.a], i * 4);
    });
    const geo = this.trail.geometry;
    geo.setDrawRange(0, this.pts.length);
    (geo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (geo.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
  }
}
