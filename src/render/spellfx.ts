// The spell's and the dash's look (rules/spells.ts, rules/dash.ts): while the speed boost is on,
// or she dashes, a trail of glowing motes streams behind the witch. (Their recharge shows on the
// action bar: render/actionbar.ts.)
import * as THREE from "three";
import { spellActive } from "../rules/spells";
import { dashing } from "../rules/dash";
import type { Game } from "../rules/game";
import { groundPoints } from "./height";

const MAX = 240;

export class SpellFx {
  readonly trail: THREE.Points;
  private pos = new Float32Array(MAX * 3);
  private col = new Float32Array(MAX * 4);
  private pts: { x: number; y: number; z: number; at: number }[] = [];
  private lastDrop = 0;

  constructor() {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(this.col, 4));
    this.trail = new THREE.Points(geo, groundPoints(5)); // over the rolling ground, bent with the world
    this.trail.frustumCulled = false;
  }

  /** `y`: her height (metres) where the trail streams from. */
  update(g: Game, time: number, y: number): void {
    const s = g.spells, w = g.witch, dash = dashing(g.witches[0].dash, time), active = spellActive(s, time) || dash;
    // The trail: a mote dropped every 1/60 s while it's on, each fading over 0.6 s.
    if (active && time - this.lastDrop > 1 / 60) {
      this.lastDrop = time;
      for (let k = 0; k < (dash ? 6 : 3); k++) this.pts.push({ x: w.x + (Math.random() - 0.5) * 0.8, y: y + (Math.random() - 0.5) * 0.8, z: w.z + (Math.random() - 0.5) * 0.8, at: time });
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
  }
}
