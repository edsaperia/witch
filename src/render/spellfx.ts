// The spell's, the blink's and the broom's look (rules/spells.ts, rules/dash.ts), in the night palette (the coordinator's
// brief: "the witch's own magic in the night palette"; the art director's colours, #188 and round 2):
//   - (the speed boost's trail of motes is gone: her flight trail, a ribbon of glow as long as she's fast, render/trail.ts, Ed
//     2026-10-06: "more like a fading-out glow, similar to the leylines");
//   - a blink (the dash) leaves her afterimage where she stood, a column of moonlit blue-violet motes her height, fading;
//     smears of them along the blink's line at her feet, body and hat; a loose ring falling in where she was; and a
//     burst flying out where she lands (the moonlight's colour: the rim on every character, #199);
//   - flying, a few small amber sparks drop from her broom's bristles, more the faster she goes.
// Every mote is in one fixed pool (typed arrays, a ring of MAX): nothing is made per frame. (Their recharge shows on the
// action bar: render/actionbar.ts.)
import * as THREE from "three";
import { spellActive } from "../rules/spells";
import type { Game } from "../rules/game";
import { groundPoints } from "./height";

const MAX = 384;
/** A mote's fields in the pool: where it starts (3), its drift in m/s (3), when it was made, how long it lasts, its
 *  strength, its colour (3). */
const F = 12;
/** The palette: the moonlight's blue-violet (the blink), the broom's amber. */
const AMBER = [0.91, 0.71, 0.42], ROSE = [0.85, 0.47, 0.62], MOON = [0.4, 0.4, 0.85]; // (deep: the motes bloom and overlap, and must never reach white)

export class SpellFx {
  readonly trail: THREE.Points;
  private pos = new Float32Array(MAX * 3);
  private col = new Float32Array(MAX * 4);
  private pool = new Float32Array(MAX * F);
  private next = 0;
  private lastSpark = 0;
  private lastBlink = -Infinity;

  constructor() {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(this.col, 4));
    this.trail = new THREE.Points(geo, groundPoints(5)); // over the rolling ground, bent with the world
    this.trail.frustumCulled = false;
    for (let i = 0; i < MAX; i++) this.pool[i * F + 7] = 0; // (all spent: a life of 0)
  }

  /** A mote into the pool's next slot (the oldest goes). */
  private mote(x: number, y: number, z: number, vx: number, vy: number, vz: number, at: number, life: number, a: number, c: number[]): void {
    const o = this.next * F, p = this.pool;
    p[o] = x; p[o + 1] = y; p[o + 2] = z; p[o + 3] = vx; p[o + 4] = vy; p[o + 5] = vz;
    p[o + 6] = at; p[o + 7] = life; p[o + 8] = a; p[o + 9] = c[0]; p[o + 10] = c[1]; p[o + 11] = c[2];
    this.next = (this.next + 1) % MAX;
  }

  /** The party spell (Ed, 2026-10-06): a burst of amber and rose sparkles round her as she casts it at the decks, rising
   *  and spreading out over the cast. x, y, z: her feet (y over the ground); at: the cast's time. */
  partyBurst(x: number, y: number, z: number, at: number): void {
    const r = Math.random;
    for (let k = 0; k < 64; k++) {
      const a = r() * Math.PI * 2, s = 1.5 + r() * 3.5, h = 1.4 + r() * 1.4, c = k % 3 ? AMBER : ROSE;
      this.mote(x + Math.cos(a) * 0.3, y + h, z + Math.sin(a) * 0.3, Math.cos(a) * s, 1.2 + r() * 2.4, Math.sin(a) * s, at + r() * 0.5, 0.8 + r() * 0.7, 0.55, c);
    }
  }

  /** `y`: her height (metres) where the trail streams from. */
  update(g: Game, time: number, y: number): void {
    const w = g.witch, r = Math.random;
    // The broom: flying, a small amber spark from its bristles (behind her) now and then (trail.sparks): sparse, her magic beside
    // the trail's colour of where she is; more only in the speed boost, and a few as she blinks (the art director, #237).
    const speed = Math.hypot(w.vx, w.vz), D = g.witches[0].dash, boost = spellActive(g.spells, time), dashing = time >= D.at - 1 / 60 && time < D.at + 0.25;
    if (g.tuning.trail?.sparks !== false && speed > 2 && time - this.lastSpark > 1 / (boost || dashing ? Math.min(12, speed) : 2.5)) {
      this.lastSpark = time;
      const ux = w.vx / speed, uz = w.vz / speed;
      this.mote(w.x - ux * 0.9 + (r() - 0.5) * 0.2, y - 0.35 + (r() - 0.5) * 0.2, w.z - uz * 0.9, -ux * 0.4, -0.5 - r() * 0.4, -uz * 0.4, time, 0.4 + r() * 0.3, 0.5, AMBER);
    }
    // A blink: her afterimage where she was, smears along the way, in on where she was, out where she lands.
    if (D.at !== this.lastBlink && time >= D.at - 1 / 60) {
      this.lastBlink = D.at;
      // The afterimage: a column of motes her height, standing a moment and fading.
      for (let k = 0; k < 14; k++) { const h = -0.6 + (k / 13) * 1.9, sx = (r() - 0.5) * 0.6 * (1 - Math.abs(h - 0.3) / 1.6); this.mote(D.fromX + sx, y + h, D.fromZ, D.dx * 0.6, 0.15, D.dz * 0.6, D.at, 0.3, 0.32, MOON); }
      // The smears: three lines along the blink (feet, body, hat), thinning toward where she lands.
      const len = Math.hypot(D.toX - D.fromX, D.toZ - D.fromZ), m = Math.max(3, Math.round(len * 1.2));
      for (const h of [-0.5, 0.3, 1.1]) for (let k = 1; k < m; k++) { const f = k / m; this.mote(D.fromX + (D.toX - D.fromX) * f, y + h + (r() - 0.5) * 0.15, D.fromZ + (D.toZ - D.fromZ) * f, 0, 0, 0, D.at, 0.12 + 0.1 * (1 - f), 0.3 * (1 - f * 0.6), MOON); }
      // Kept faint (they bloom): each puff a loose ring that never gathers to one bright point.
      const n = 14;
      for (let k = 0; k < n; k++) {
        const a = (k / n) * Math.PI * 2 + r() * 0.4, R = 1.4 + r() * 0.5, h = (r() - 0.3) * 1.6, inT = 0.25, ox = Math.cos(a), oz = Math.sin(a) * 0.6;
        this.mote(D.fromX + ox * R, y + h, D.fromZ + oz * R, -ox * R * 0.75 / inT, -h * 0.5 / inT, -oz * R * 0.75 / inT, D.at, inT, 0.3, MOON); // falling in, to a quarter of the way out
        this.mote(D.toX + ox * 0.5, y + h * 0.3, D.toZ + oz * 0.5, ox * 4, h + 0.6, oz * 4, D.at, 0.35, 0.3, MOON); // flying out
      }
    }
    // The live ones, packed to the front of the buffers.
    const p = this.pool, pos = this.pos, col = this.col;
    let n = 0;
    for (let i = 0; i < MAX; i++) {
      const o = i * F, at = p[o + 6], life = p[o + 7], age = time - at;
      if (!(life > 0) || age >= life || age < -1 / 60) continue;
      const t = Math.max(0, age), k = 1 - t / life;
      pos[n * 3] = p[o] + p[o + 3] * t; pos[n * 3 + 1] = p[o + 1] + p[o + 4] * t; pos[n * 3 + 2] = p[o + 2] + p[o + 5] * t;
      col[n * 4] = p[o + 9]; col[n * 4 + 1] = p[o + 10]; col[n * 4 + 2] = p[o + 11]; col[n * 4 + 3] = k * p[o + 8];
      n++;
    }
    const geo = this.trail.geometry;
    geo.setDrawRange(0, n);
    (geo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (geo.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
  }
}
