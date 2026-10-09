// Blood trails (Ed, 2026-10-09: "hurt creatures leave a little trail of blood, the more hurt they are the more blood they leave?
// The blood vanishes over time" and "bloody footprints perhaps"): a hurt creature (its hp under its whole, wild or leashed,
// legends too) leaves small dark-red marks on the ground as it moves: footprints where its feet would land, alternating left
// and right at its stride (four-legged and squat walkers, a hind print behind each fore one so they read as pairs; insects a
// tiny track), and drops (flyers, birds and snakes drip instead; and, with the style "prints+drops", the badly hurt now and
// then). The more hurt, the more often and the redder: lightly, a faint print now and then; badly, every step and drips.
// Healed (a berry: rules/creatures.ts heal), it stops. Pixel art flat on the ground (docs/STYLE.md §1 rule 4): squares of
// whole art pixels on the world's pixel grid, 1 to 3 across, blended (never glowing) in a dark red on the night palette or,
// with colour "neon", a deep shade of the creature's own neon; each fading over blood.fade seconds. A fixed pool (blood.cap,
// the oldest giving way), made only for creatures within blood.range of her; drawing only, seeded (no Math.random).
import { GENOMES } from "../../../art/genome/species.js";
import { sigilColour } from "../../../art/generator.js";
import { creatureMaxHp } from "../../rules/combat";
import type { Creature } from "../../rules/creatures";
import { hash2 } from "../../rules/random";
import { metresPerArtPixel } from "../sprites";
import { SQ } from "./glyphs";
import type { LeashView } from "../leash";
import * as THREE from "three";

const AT = new THREE.Vector3();

export interface BloodKnobs { on: boolean; style: "prints" | "prints+drops" | "drops"; colour: "red" | "neon"; fade: number; rate: number; cap: number; range: number }
export const BLOOD_DEFAULT: BloodKnobs = { on: true, style: "prints+drops", colour: "red", fade: 8, rate: 3, cap: 600, range: 60 };
/** The dark red (linear, before the haze): deep enough to sit on the night ground, not black, not a bright red. */
export const BLOOD_RED = [0.5, 0.02, 0.06];

type Gait = "pairs" | "prints" | "track" | "drops";
const GAITS: Record<string, Gait> = { quadruped: "pairs", squat: "prints", insectoid: "track", avian: "drops", flyer: "drops", serpent: "drops" };
const GAIT = new Map<string, Gait>((GENOMES as { id: string; template: string }[]).map(g => [g.id, GAITS[g.template] ?? "prints"]));

/** One mark's pixels (art-pixel offsets on the world's grid): a drop, small, mid and big prints. */
const SHAPES: [number, number][][] = [[[0, 0]], [[0, 0], [1, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [1, 2]]];

/** Where each creature was last seen and how far it has gone since its last print (and which foot is next). */
interface Track { x: number; z: number; walked: number; step: number; drip: number }

export class BloodPool {
  private x: Float32Array; private z: Float32Array; private at: Float32Array; private a: Float32Array; private shape: Uint8Array;
  private r: Float32Array; private g: Float32Array; private b: Float32Array;
  private next = 0; private used = 0; private last = 0;
  private tracks = new Map<number, Track>();
  constructor(readonly cap: number) {
    this.x = new Float32Array(cap); this.z = new Float32Array(cap); this.at = new Float32Array(cap); this.a = new Float32Array(cap); this.shape = new Uint8Array(cap);
    this.r = new Float32Array(cap); this.g = new Float32Array(cap); this.b = new Float32Array(cap);
  }
  get count(): number { return this.used; }

  private add(x: number, z: number, at: number, a: number, shape: number, rgb: number[]): void {
    const i = this.next; this.next = (i + 1) % this.cap; this.used = Math.min(this.cap, this.used + 1); // (the oldest gives way)
    this.x[i] = x; this.z[i] = z; this.at[i] = at; this.a[i] = a; this.shape[i] = shape; this.r[i] = rgb[0]; this.g[i] = rgb[1]; this.b[i] = rgb[2];
  }

  /** Lay this frame's marks: every hurt creature within range that has moved. */
  spawn(creatures: readonly Creature[], wx: number, wz: number, time: number, K: BloodKnobs, top: (c: Creature) => number): void {
    const dt = Math.max(0, Math.min(0.1, time - this.last)); this.last = time;
    if (dt <= 0) return; // (paused, or the same frame again)
    for (const c of creatures) {
      if (c.gone || Math.abs(c.x - wx) > K.range || Math.abs(c.z - wz) > K.range) { this.tracks.delete(c.id); continue; }
      const tr = this.tracks.get(c.id);
      if (!tr) { this.tracks.set(c.id, { x: c.x, z: c.z, walked: 0, step: 0, drip: 0 }); continue; }
      const moved = Math.hypot(c.x - tr.x, c.z - tr.z), dx = c.x - tr.x, dz = c.z - tr.z;
      tr.x = c.x; tr.z = c.z;
      if (c.hp === undefined || c.asleep) { tr.walked = 0; tr.drip = 0; continue; } // (whole: none)
      const h = Math.max(0, Math.min(1, 1 - c.hp / creatureMaxHp(c))); // how hurt, 0 to 1
      if (h <= 0 || moved > 6) continue; // (a teleport or a respawn isn't a walk)
      const size = top(c), gait = GAIT.get(c.species) ?? "prints", rgb = K.colour === "neon" ? neonBlood(c.species) : BLOOD_RED;
      const stride = Math.max(0.45, size * 0.7), side = Math.max(0.12, size * 0.16), big = size >= 2.6 ? 3 : 2;
      const ux = moved > 1e-4 ? dx / moved : 0, uz = moved > 1e-4 ? dz / moved : 0;
      const prints = gait !== "drops" && K.style !== "drops", drops = gait === "drops" || K.style !== "prints";
      // prints: one a stride (half a stride for a track), seeded by its id and step; the more hurt, the likelier and redder
      if (prints && moved > 0) {
        tr.walked += moved;
        const every = gait === "track" ? stride * 0.5 : stride;
        while (tr.walked >= every) {
          tr.walked -= every; tr.step++;
          const p = Math.min(1, 0.1 + (h / 0.5) * 0.9);
          if (hash2(c.id, tr.step, 41) > p) continue;
          const lr = tr.step % 2 ? 1 : -1, a = 0.5 + 0.5 * Math.min(1, h / 0.7), px = c.x - uz * side * lr, pz = c.z + ux * side * lr;
          const shape = gait === "track" ? 1 : big;
          this.add(px, pz, time, a, shape, rgb);
          if (gait === "pairs") this.add(px - ux * stride * 0.35, pz - uz * stride * 0.35, time, a * 0.85, shape, rgb); // its hind foot behind
        }
      }
      // drops: a rate by how hurt (squared: none to speak of when lightly hurt), more while moving; seeded
      if (drops && (gait === "drops" || h > 0.5)) {
        tr.drip += K.rate * h * h * (moved > 0 ? 1 : 0.25) * dt;
        while (tr.drip >= 1) {
          tr.drip -= 1; tr.step++;
          const j = (hash2(c.id, tr.step, 43) - 0.5) * size * 0.5, k = (hash2(c.id, tr.step, 47) - 0.5) * size * 0.3;
          this.add(c.x + j, c.z + k, time, 0.5 + 0.5 * h, hash2(c.id, tr.step, 53) < 0.25 && big > 1 ? 1 : 0, rgb);
        }
      }
    }
  }

  /** Draw what's left of each, its pixels on the world's art-pixel grid, fading over its last half. */
  draw(lv: LeashView, time: number, K: BloodKnobs, camera: THREE.Camera, height: number): void {
    // one of its pixels: a game pixel on the ground where she is (pixelSize screen pixels there), in whole art pixels
    const art = metresPerArtPixel(lv.game.tuning), w = lv.game.witch, fov = ((camera as THREE.PerspectiveCamera).fov ?? 50) * Math.PI / 180;
    const d = camera.position.distanceTo(AT.set(w.x, 0, w.z)), game = (2 * d * Math.tan(fov / 2) * lv.game.tuning.pixelSize) / Math.max(1, height);
    const px = art * Math.max(1, Math.round(game / art)), cell = px / 0.75, sq = lv.uv(SQ); // (the square glyph fills 24 of its slot's 32 px)
    for (let i = 0; i < this.used; i++) {
      const age = time - this.at[i];
      if (age < 0 || age >= K.fade) continue;
      const f = age < K.fade * 0.5 ? 1 : 1 - (age - K.fade * 0.5) / (K.fade * 0.5), a = this.a[i] * f;
      const gx = Math.round(this.x[i] / px) * px, gz = Math.round(this.z[i] / px) * px;
      for (const [ox, oz] of SHAPES[this.shape[i]]) lv.blood.add(gx + ox * px, 0, gz + oz * px, cell, sq, this.r[i], this.g[i], this.b[i], a);
    }
  }
}

const NEON = new Map<string, number[]>();
/** The stylised variant: a deep shade of the creature's own neon. */
function neonBlood(species: string): number[] {
  let c = NEON.get(species);
  if (!c) { const s = sigilColour(species) as number[]; c = s.map(v => (v / 255) * 0.35); NEON.set(species, c); }
  return c;
}

export const bloodKnobs = (t: { blood?: Partial<BloodKnobs> }): BloodKnobs => ({ ...BLOOD_DEFAULT, ...(t.blood ?? {}) });
