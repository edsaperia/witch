// The places she stands in, kept clear (Ed, 2026-10-26: "When the witch stands in a legend circle, scenery in front of it should
// fade away"; and "we might want this for other important points of interest, such as runestone areas, finds, flasks"). A point of
// interest is a centre, a radius she stands within and what stands there to be seen (its height and width); while she's within one
// on the ground, it and its centre's things are boxed on screen, and the sprites nearer the camera than its centre whose
// rectangles cover that box fade out whole (render/sprites.ts vCircle): the grove's south trees and the rim's stones round a legend's
// circle (since #1154 ringed all the way round, so the camera, looking north, sees it through the ring's south side), the woods in
// front of a runestone, the trunk, a flask. Each kind on or off in the tuning's reveal (the pause page's toggles for the last three);
// eased in over reveal.seconds as she walks in and back out as she leaves, on the box she left.
import * as THREE from "three";
import type { View } from "../view";
import type { Game } from "../../rules/game";
import { legendCircleNear } from "../../rules/legendCircle";
import { LEGEND_SIZES } from "../../rules/legendFit";
import { SPRITE_UNIFORMS } from "../sprites";
import { groundHeight } from "../height";

/** A place kept clear: its centre and the radius she stands within (m), the ring on the ground boxed with it (m), and what stands
 *  at (tx, tz) to be seen whole: its width and height (m). */
export interface Interest { kind: string; x: number; z: number; r: number; ring: number; tx: number; tz: number; w: number; h: number; /** metres round (tx, tz) never faded: the thing itself */ keep: number }

/** The place being kept clear (the last she stood in, while it fades back) and how far it's faded in. */
export interface Reveal { k: number; at: number; poi: Interest | null }
export const newReveal = (): Reveal => ({ k: 0, at: NaN, poi: null });

type Kind = { on: boolean; radius?: number; ring?: number; height?: number; width?: number; keep?: number; pad?: number };

const STONES = new WeakMap<object, { x: number; z: number }[]>();
/** The runestones (each playable area's but home's, where its soundsystem comes), once a map. */
function stonesOf(g: Game): { x: number; z: number }[] {
  const m = g.map;
  let s = STONES.get(m);
  if (!s) { const [hx, hy] = m.centreCell; STONES.set(m, (s = m.cells.filter(([cx, cy]) => cx !== hx || cy !== hy).map(([cx, cy]) => m.soundsystemSpot(cx, cy)))); }
  return s;
}

/** The place of interest she stands in on the ground (null: none, or in the treetops): a legend's circle first, then the nearest
 *  runestone, tonight's find or a lying flask within its kind's radius, each kind only while it's on. */
export function interestAt(g: Game): Interest | null {
  const R = g.tuning.reveal, w = g.witch;
  if (!R || w.mode !== "ground") return null;
  const L = R.legend as Kind | undefined;
  if (L?.on) {
    const c = legendCircleNear(g, w);
    if (c) {
      // (the legend as drawn, the larger of asleep and awake, standing where it lies; the circle's ring, its rim stones just past it)
      const sz = LEGEND_SIZES[c.legend.species], k = g.tuning.wildLegends.scale ?? 1;
      return { kind: "legend", x: c.x, z: c.z, r: c.r, ring: c.r + (L.pad ?? 0), tx: c.legend.x, tz: c.legend.z, w: sz ? Math.max(sz.asleep[0], sz.awake[0]) * k : c.r, h: sz ? Math.max(sz.asleep[1], sz.awake[1]) * k : c.r * 0.5, keep: 0 }; // (a legend is a creature: never faded)
    }
  }
  let best: Interest | null = null, bd = Infinity;
  const near = (kind: string, K: Kind | undefined, x: number, z: number) => {
    if (!K?.on) return;
    const r = K.radius ?? 0, d = Math.hypot(w.x - x, w.z - z);
    if (d <= r && d < bd) { bd = d; best = { kind, x, z, r, ring: K.ring ?? r, tx: x, tz: z, w: K.width ?? 2, h: K.height ?? 2, keep: K.keep ?? 0 }; }
  };
  if ((R.runestone as Kind | undefined)?.on) for (const s of stonesOf(g)) near("runestone", R.runestone, s.x, s.z);
  if (g.trunk && !g.trunk.found) near("find", R.find, g.trunk.x, g.trunk.z);
  if ((R.flask as Kind | undefined)?.on) for (const f of g.relics) if (f.state === "lying") near("flask", R.flask, f.x, f.z);
  return best;
}

const P = new THREE.Vector3();

/** This frame's uCircleBox and uCircleFade (after the camera). */
export function setReveal(v: View, time: number): void {
  const g = v.game, R = g.tuning.reveal, s = v.reveal;
  const poi = interestAt(g);
  if (poi) s.poi = poi;
  const dt = Number.isNaN(s.at) ? 0 : Math.min(0.25, Math.max(0, time - s.at)); s.at = time;
  const want = poi ? 1 : 0, step = R && R.seconds > 0 ? dt / R.seconds : 1;
  s.k = want > s.k ? Math.min(want, s.k + step) : Math.max(want, s.k - step);
  const U = SPRITE_UNIFORMS.uCircleFade.value, p = s.poi;
  if (s.k <= 0 || !R || !p) { U.y = 0; return; }
  // Its box on screen (pixels, as the sprites' rectangles are measured): round its ring on the ground, and what stands at its
  // centre across its width at its foot and its top (placed as the sprites are: v.screenOf bends it too).
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const add = (x: number, y: number, z: number) => {
    const [sx, sy] = v.screenOf(x, y, z), px = (sx * 0.5 + 0.5) * v.width, py = (sy * 0.5 + 0.5) * v.height;
    x0 = Math.min(x0, px); x1 = Math.max(x1, px); y0 = Math.min(y0, py); y1 = Math.max(y1, py);
  };
  for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; add(p.x + Math.cos(a) * p.ring, 0, p.z + Math.sin(a) * p.ring); }
  const Rt = SPRITE_UNIFORMS.uRight.value, Up = SPRITE_UNIFORMS.uUp.value;
  for (const e of [-0.5, 0.5]) for (const up of [0, 1]) add(p.tx + Rt.x * p.w * e + Up.x * p.h * up, Up.y * p.h * up, p.tz + Rt.z * p.w * e + Up.z * p.h * up);
  SPRITE_UNIFORMS.uCircleBox.value.set(x0, y0, x1, y1);
  SPRITE_UNIFORMS.uCircleKeep.value.set(p.tx, p.tz, p.keep);
  // (its centre's depth: as the sprites' bases are measured, unbent, from the camera)
  P.set(p.x, groundHeight(p.x, p.z), p.z).applyMatrix4(v.camera.matrixWorldInverse);
  const e = s.k * s.k * (3 - 2 * s.k);
  U.set(-P.z, e, Math.max(1, R.edge * v.width), Math.max(0.1, R.depth));
}
