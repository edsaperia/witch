// The creature states' looks (Ed, issue #87): wild as it is; happy in party clothes but NO glowing
// collar; leashed in party clothes AND the glowing collar; enraged tinted red all over (looks.enragedTint) and red-eyed with an angry face (the generator's, art/genome/expressions.js) and a 💢 by its
// head; dazed with stars spinning round its head; legends never in party clothes. Happy animals in an
// area with a soundsystem dance on the beat (the party bounce). The clothes are baked into the sprite
// (assets: partyArt with or without the collar), and so are the faces (expression below); the 💢 and the daze
// stars are marks drawn over the sprite.
import * as THREE from "three";
import type { Game } from "../rules/game";
import type { Creature, CreatureState } from "../rules/creatures";
import { LEGEND } from "../rules/creatures";
import { cellKey } from "../rules/party";
import { placed, shownOverBend } from "./height";
import { stunned } from "../rules/knock";
import { witchHeight } from "../rules/witch";
import type { Tuning } from "../rules/tuning";
import { bubbleScale } from "./bubbles";

export type Look = CreatureState | "legend";

/** The state machine's fields (issue #87), read if present; today's flags otherwise. */
type WithState = Creature & { state?: CreatureState; dazedUntil?: number };

export function isHappy(c: Creature): boolean {
  const s = (c as WithState).state;
  if (s) return s === "happy";
  return !c.leashed && !!c.friendly; // (today: a quest-done area's creatures)
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
  const T = t.looks?.enragedTint ?? { colour: "#ff2a2a", amount: 0.38 }, h = T.colour.replace("#", "");
  ENRAGED_TINT.value.set(parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255, T.amount);
}

/** A creature's expression (Ed, 2026-10-05: "the eyebrows should be with the creature generator"):
 *  drawn by the creature generator as part of its face (art/genome/expressions.js; the view picks the
 *  bake, the live rig the head piece). Dazed while dazed or stunned; StateMarks adds the daze stars
 *  (the stun's are leash.ts's). */
export type Expression = "neutral" | "angry" | "happy" | "dazed";
export function expression(c: Creature, time: number): Expression {
  if (isDazed(c, time) || (c.stunUntil ?? -Infinity) > time) return "dazed";
  const l = lookOf(c);
  return l === "enraged" ? "angry" : l === "happy" || l === "leashed" ? "happy" : "neutral";
}

export const isDazed = (c: Creature, time: number) => ((c as WithState).dazedUntil ?? -Infinity) > time;

/** Whether it dances on the beat: party animals, and happy ones in an area with a soundsystem. */
export function dances(g: Game, c: Creature): boolean {
  if (c.asleep) return false; // (asleep: the party's over, rules/partyOver.ts)
  if (c.leashed || c.partyLegend) return true; // (a party legend dances where it stands: the Easter egg)
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

/** A party sparkle: a tiny warm twinkle, two pixels across, in the lanterns' amber (the art director, #200: never a white
 *  cross, which is a hit's contact star). */
const SPARKLE = (): THREE.CanvasTexture => pixels(2, 2, x => {
  x.fillStyle = "#e8b46a"; x.fillRect(0, 0, 2, 2);
  x.fillStyle = "#f6d59a"; x.fillRect(0, 0, 1, 1);
});
const hash01 = (a: number, b: number) => { const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return s - Math.floor(s); };

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
  private star: THREE.SpriteMaterial;
  private anger: THREE.SpriteMaterial;
  private sparkle: THREE.SpriteMaterial;
  private pool: THREE.Sprite[] = [];
  private used = 0;
  private v = new THREE.Vector3();
  private group = new THREE.Group();

  constructor(scene: THREE.Scene, private mpp: number) {
    const mat = (map: THREE.Texture) => new THREE.SpriteMaterial({ map, transparent: true, depthTest: false, depthWrite: false });
    this.star = mat(STAR()); this.anger = mat(angerMark(11));
    this.sparkle = new THREE.SpriteMaterial({ map: SPARKLE(), transparent: true, depthTest: true, depthWrite: false, blending: THREE.AdditiveBlending });
    this.group.renderOrder = 12;
    scene.add(this.group);
  }

  /** The camera's position this frame: a mark past the bent horizon isn't drawn (they're drawn with no depth test). */
  private eye: { x: number; y: number; z: number } | null = null;

  private put(m: THREE.SpriteMaterial, x: number, y: number, z: number, wpx: number, hpx: number, opacity = 1): void {
    if (this.eye && !shownOverBend(x, y, z, this.eye)) return; // (nothing past the bend: Ed, 2026-10-06)
    let s = this.pool[this.used];
    if (!s) { s = new THREE.Sprite(m.clone()); s.renderOrder = 12; this.pool.push(s); this.group.add(s); }
    this.used++;
    // (each sprite its own material copy, so its opacity is its own)
    const own = s.material as THREE.SpriteMaterial;
    if (own.map !== m.map || own.blending !== m.blending || own.depthTest !== m.depthTest) { own.map = m.map; own.blending = m.blending; own.depthTest = m.depthTest; own.needsUpdate = true; }
    own.opacity = opacity; s.visible = true;
    s.position.copy(placed(this.v.set(x, y, z)));
    s.scale.set(wpx * this.mpp, hpx * this.mpp, 1);
  }

  /** The 💢 by the enraged, stars round the dazed, sparkles round party animals (their faces are the art's): those within `R` metres of her. `tops`: each creature's drawn height. */
  update(g: Game, time: number, tops: Map<number, number>, R = 70, eye?: { x: number; y: number; z: number }): void {
    this.used = 0; this.eye = eye ?? null;
    setTint(g.tuning);
    const A = g.tuning.looks?.anger ?? { on: true, size: 1 }, P = g.tuning.looks?.partyGlow ?? { on: true, sparkles: 4, rate: 0.9, size: 1.4, strength: 1 };
    const w = g.witch, px = 2; // (each mark pixel two game pixels: readable at a glance)
    for (const c of g.creatures) {
      if (c.gone || Math.abs(c.x - w.x) > R || Math.abs(c.z - w.z) > R) continue;
      const top = tops.get(c.id);
      if (top === undefined) continue;
      const ex = expression(c, time), look = lookOf(c);
      // Party animals (happy and leashed, Ed 2026-10-05: "could sparkle or glow a little"): a few
      // twinkling pixels round them, each lit for a moment in turn (looks.partyGlow).
      if (P.on && (look === "happy" || (look === "leashed" && !c.boss))) {
        for (let i = 0; i < P.sparkles; i++) {
          const ph = (time * P.rate + hash01(c.id, i)) % 1, lit = Math.sin(Math.min(1, ph / 0.5) * Math.PI);
          if (ph > 0.5) continue;
          const a = hash01(c.id, i + 7) * Math.PI * 2, r = 0.35 + top * 0.45, h = 0.15 + hash01(c.id, i + 13) * top;
          this.put(this.sparkle, c.x + Math.cos(a) * r, h, c.z + Math.sin(a) * r * 0.4, 2 * px * P.size * (0.6 + 0.4 * lit), 2 * px * P.size * (0.6 + 0.4 * lit), lit * P.strength);
        }
      }
      if (ex === "angry" && !c.boss) {
        // 💢 (Ed, 2026-10-05: "or a 💢"): beside its head on the side it faces, popping on a pulse, sized by level like its bubbles.
        if (A.on) {
          const pulse = (time * 1.6 + c.id * 0.31) % 1, pop = pulse < 0.15 ? 1 + 0.5 * (1 - pulse / 0.15) : 1, k = bubbleScale(g.tuning, c.level) * A.size * pop;
          this.put(this.anger, c.x + c.facing * (0.35 + top * 0.25), top + 0.1, c.z, 11 * px * k, 11 * px * k);
        }
      }
      if (isDazed(c, time)) { // (a stun's stars are leash.ts's)
        for (let i = 0; i < 3; i++) {
          const a = time * 5 + (i / 3) * Math.PI * 2, r = 0.45 + top * 0.12;
          this.put(this.star, c.x + Math.cos(a) * r, top + 0.25 + Math.sin(a) * 0.12, c.z + Math.sin(a) * r * 0.5, 5 * px, 5 * px);
        }
      }
    }
    // Her too, staggered by a blow (rules/knock.ts): the daze stars round her hat.
    if (stunned(g.witches[0].knock, g.herTime)) { // (her clock: rules/slowTime.ts)
      const top = witchHeight(w, g.tuning) + 2.1;
      for (let i = 0; i < 3; i++) { const a = g.herTime * 6 + (i / 3) * Math.PI * 2; this.put(this.star, w.x + Math.cos(a) * 0.6, top + Math.sin(a) * 0.12, w.z + Math.sin(a) * 0.3, 5 * px, 5 * px); }
    }
    for (let i = this.used; i < this.pool.length; i++) this.pool[i].visible = false;
  }
}
