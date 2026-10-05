// The creature states' looks (Ed, issue #87): wild as it is; happy in party clothes but NO glowing
// collar; leashed in party clothes AND the glowing collar; enraged tinted red all over (looks.enragedTint) and red-eyed with angry brows over its
// head; dazed with stars spinning round its head; legends never in party clothes. Happy animals in an
// area with a soundsystem dance on the beat (the party bounce). The clothes are baked into the sprite
// (assets: partyArt with or without the collar); the brows and stars are marks drawn over today's
// sprites, so they work for every species now and the creature generator can adopt them later.
import * as THREE from "three";
import type { Game } from "../rules/game";
import type { Creature } from "../rules/creatures";
import { LEGEND } from "../rules/creatures";
import { cellKey } from "../rules/party";
import { placed } from "./height";
import type { Tuning } from "../rules/tuning";
import { bubbleScale } from "./bubbles";

export type Look = "wild" | "happy" | "leashed" | "enraged" | "legend";

/** The state machine's fields (issue #87), read if present; today's flags otherwise. */
type WithState = Creature & { state?: "wild" | "happy" | "leashed" | "enraged"; dazedUntil?: number };

export function isHappy(c: Creature): boolean {
  const s = (c as WithState).state;
  if (s) return s === "happy";
  return !c.leashed && (!!c.friendly || !!c.guard); // (today: a quest-done area's creatures)
}

export function lookOf(c: Creature): Look {
  if (c.boss || c.level === LEGEND) return c.leashed ? "leashed" : c.enraged ? "enraged" : "legend";
  const s = (c as WithState).state;
  if (s === "leashed" || c.leashed) return "leashed";
  if (s === "enraged" || c.enraged) return "enraged";
  return isHappy(c) ? "happy" : "wild";
}

/** Enraged creatures' red tint (Ed, 2026-10-05: "a red tint so that they're easy to tell apart"):
 *  one uniform shared by every enraged batch, set from tuning looks.enragedTint each frame (amount 0: off). */
export const ENRAGED_TINT = { value: new THREE.Vector4(1, 0.16, 0.16, 0) };
function setTint(t: Tuning): void {
  const T = t.looks?.enragedTint ?? { colour: "#ff2a2a", amount: 0.55 }, h = T.colour.replace("#", "");
  ENRAGED_TINT.value.set(parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255, T.amount);
}

export const isDazed = (c: Creature, time: number) => ((c as WithState).dazedUntil ?? -Infinity) > time;

/** Whether it dances on the beat: party animals, and happy ones in an area with a soundsystem. */
export function dances(g: Game, c: Creature): boolean {
  if (c.leashed) return true;
  return lookOf(c) === "happy" && g.party.areas.has(cellKey(c.cell)) && !g.combat.ruined.has(cellKey(c.cell)) && !c.fight;
}

/** A tiny pixel canvas as a texture. */
function pixels(w: number, h: number, draw: (x: CanvasRenderingContext2D) => void): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  draw(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.generateMipmaps = false;
  return t;
}

/** Angry brows: two thick dark strokes slanting down to the middle, rimmed in red so they read on dark fur. */
const BROWS = (): THREE.CanvasTexture => pixels(13, 6, x => {
  const rim = "#ff3b3b", ink = "#1a0508";
  const stroke = (pts: number[][], col: string) => { x.fillStyle = col; for (const [a, b] of pts) x.fillRect(a, b, 1, 1); };
  // left brow: high at the outside, low in the middle; right mirrored
  const left = [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [3, 2], [4, 2], [5, 2], [5, 3]], right = left.map(([a, b]) => [12 - a, b]);
  const grow = (pts: number[][]) => pts.flatMap(([a, b]) => [[a, b], [a, b + 1], [a - 1, b], [a + 1, b], [a, b + 2]]).filter(([a, b]) => a >= 0 && a < 13 && b >= 0 && b < 6);
  stroke(grow(left), rim); stroke(grow(right), rim);
  stroke(left.flatMap(([a, b]) => [[a, b], [a, b + 1]]), ink); stroke(right.flatMap(([a, b]) => [[a, b], [a, b + 1]]), ink);
});
/** A daze star: a little yellow four-point star with a white heart. */
const STAR = (): THREE.CanvasTexture => pixels(5, 5, x => {
  x.fillStyle = "#ffd84a"; x.fillRect(2, 0, 1, 5); x.fillRect(0, 2, 5, 1); x.fillRect(1, 1, 3, 3);
  x.fillStyle = "#ffffff"; x.fillRect(2, 2, 1, 1);
});

/** The anger mark 💢, a pixel emoji (hard-edged). */
function angerMark(n: number): THREE.CanvasTexture {
  return pixels(n, n, x => {
    x.font = `${n - 1}px sans-serif`; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText("💢", n / 2, n / 2 + 0.5);
    const d = x.getImageData(0, 0, n, n);
    for (let i = 3; i < d.data.length; i += 4) d.data[i] = d.data[i] < 110 ? 0 : 255;
    x.putImageData(d, 0, 0);
  });
}

export class StateMarks {
  private brows: THREE.SpriteMaterial;
  private star: THREE.SpriteMaterial;
  private anger: THREE.SpriteMaterial;
  private pool: THREE.Sprite[] = [];
  private used = 0;
  private v = new THREE.Vector3();
  private group = new THREE.Group();

  constructor(scene: THREE.Scene, private mpp: number) {
    const mat = (map: THREE.Texture) => new THREE.SpriteMaterial({ map, transparent: true, depthTest: false, depthWrite: false });
    this.brows = mat(BROWS()); this.star = mat(STAR()); this.anger = mat(angerMark(11));
    this.group.renderOrder = 12;
    scene.add(this.group);
  }

  private put(m: THREE.SpriteMaterial, x: number, y: number, z: number, wpx: number, hpx: number): void {
    let s = this.pool[this.used];
    if (!s) { s = new THREE.Sprite(m); s.renderOrder = 12; this.pool.push(s); this.group.add(s); }
    this.used++;
    s.material = m; s.visible = true;
    s.position.copy(placed(this.v.set(x, y, z)));
    s.scale.set(wpx * this.mpp, hpx * this.mpp, 1);
  }

  /** Brows over the enraged, stars round the dazed: those within `R` metres of her. `tops`: each creature's drawn height. */
  update(g: Game, time: number, tops: Map<number, number>, R = 70): void {
    this.used = 0;
    setTint(g.tuning);
    const A = g.tuning.looks?.anger ?? { on: true, size: 1 };
    const w = g.witch, px = 2; // (each mark pixel two game pixels: readable at a glance)
    for (const c of g.creatures) {
      if (c.gone || Math.abs(c.x - w.x) > R || Math.abs(c.z - w.z) > R) continue;
      const top = tops.get(c.id);
      if (top === undefined) continue;
      if (lookOf(c) === "enraged" && !c.boss) {
        const bob = Math.abs(Math.sin(time * 6 + c.id)) * 0.08;
        this.put(this.brows, c.x, top + 0.35 + bob, c.z, 13 * px, 6 * px);
        // 💢 (Ed, 2026-10-05: "or a 💢"): beside its head on the side it faces, popping on a pulse, sized by level like its bubbles.
        if (A.on) {
          const pulse = (time * 1.6 + c.id * 0.31) % 1, pop = pulse < 0.15 ? 1 + 0.5 * (1 - pulse / 0.15) : 1, k = bubbleScale(g.tuning, c.level) * A.size * pop;
          this.put(this.anger, c.x + c.facing * (0.35 + top * 0.25), top + 0.1, c.z, 11 * px * k, 11 * px * k);
        }
      }
      if (isDazed(c, time)) {
        for (let i = 0; i < 3; i++) {
          const a = time * 5 + (i / 3) * Math.PI * 2, r = 0.45 + top * 0.12;
          this.put(this.star, c.x + Math.cos(a) * r, top + 0.25 + Math.sin(a) * 0.12, c.z + Math.sin(a) * r * 0.5, 5 * px, 5 * px);
        }
      }
    }
    for (let i = this.used; i < this.pool.length; i++) this.pool[i].visible = false;
  }
}
