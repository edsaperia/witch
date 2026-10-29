// The wild stumps' wisps (Ed, 2026-10-29: "pre-soundsystem stump area lighting should change to be more like eerie moonlight; maybe it
// can be lit by a mix of blue/green/white wisps or something like that, that move around the stump area? Remove the current
// lighting"; "the overall lighting palette should be an eerie blue/green; this is to contrast with the bright and warm post-soundsystem
// lighting"): every great stump not yet won (render/view/home.ts drawMarkers' list: before its soundsystem) has a few will-o'-the-wisps
// drifting round its clearing, blue, green and teal under a dim teal moonlight over the stump, cold against the party's warm lights and the sigils' red and blue. Each
// wanders the clearing slowly at its own radius and height, breathing slowly brighter and dimmer (still, with reduce flashing); the
// nearest few are real lights that light the ground and the stump (within the markers' light budget), and every one is drawn as a
// bright mote with a short fading tail. Where they are is worked out from the time and the stump's cell, never stored.
import * as THREE from "three";
import { hash2 } from "../rules/random";
import type { StumpWispTuning } from "../rules/tuning";
import { comfort } from "./comfort";

/** As built (runeMarkers.stump.wisps): three a stump, blue, green and white, wandering 3 to 8 m out at about 1.6 m up. */
export const STUMP_WISPS: StumpWispTuning = {
  on: true, count: 3, colours: [[60, 130, 255], [50, 230, 140], [60, 205, 215]], radius: 8, inner: 0.35, height: 1.6, bob: 0.5,
  speed: 0.5, reach: 10, strength: 1.2, lights: 6, lightRange: 70, breathe: 0.3, bright: 0.8, trail: 4, size: 0.3, fade: [40, 90],
  fill: { colour: [70, 190, 200], reach: 18, strength: 0.7, height: 5 },
};

export interface WispLight { d: number; x: number; y: number; z: number; reach: number; rgb: THREE.Vector3; strength: number }

const RGB: THREE.Vector3[] = [];
/** A wisp's colour (0 to 1) from the knob's 0-255 list, cached a colour. */
function colourOf(T: StumpWispTuning, i: number): THREE.Vector3 {
  const c = T.colours[i % T.colours.length] ?? [220, 235, 255];
  const v = (RGB[i] ??= new THREE.Vector3());
  return v.set(c[0] / 255, c[1] / 255, c[2] / 255);
}

/** Where wisp `i` of the stump with `seed` is at `t` (s), round its middle (cx, cz): x, height over the ground, z. */
export function wispAt(T: StumpWispTuning, seed: number, i: number, cx: number, cz: number, t: number, out = { x: 0, y: 0, z: 0 }): { x: number; y: number; z: number } {
  const a0 = hash2(seed, i, 11), a1 = hash2(seed, i, 13), a2 = hash2(seed, i, 17), dir = hash2(seed, i, 19) < 0.5 ? -1 : 1;
  const R = Math.max(1, T.radius), r = R * (T.inner + (1 - T.inner) * (0.5 + 0.5 * Math.sin(t * 0.13 + a1 * 6.28)));
  // (its angle round the stump: on at its speed along the circle, with a slow wander back and forth so it never just orbits)
  const ang = a0 * 6.28 + dir * (t * T.speed) / R + 0.9 * Math.sin(t * 0.21 + a2 * 6.28);
  out.x = cx + Math.cos(ang) * r;
  out.z = cz + Math.sin(ang) * r * 0.9;
  out.y = T.height + T.bob * Math.sin(t * 0.7 + a1 * 6.28) + 0.25 * T.bob * Math.sin(t * 1.9 + a2 * 6.28);
  return out;
}

const P = { x: 0, y: 0, z: 0 }, Q = { x: 0, y: 0, z: 0 }, FILL = new THREE.Vector3();

/** How much of a stump's wisps show `d` m from her (Ed, 2026-10-29: "I can see the trunk area wisps from far away and they look like
 *  big squares"): all within fade[0], none past fade[1]. */
export function wispFade(T: StumpWispTuning, d: number): number {
  const f = T.fade;
  if (!f || f.length < 2) return 1;
  const u = Math.max(0, Math.min(1, (d - f[0]) / Math.max(0.1, f[1] - f[0])));
  return 1 - u * u * (3 - 2 * u);
}

/** One wild stump's wisps at `time`: their motes into `mote` (a core and a tail each, `size` m across: soft points shrinking with
 *  the world, render/markers.ts Mote) and, within lightRange of her (`d` m off), their lights into `lights` (the caller keeps the
 *  nearest `T.lights`); all fading out with distance (wispFade), the lights by the edge of their range too, so none pops. */
export function stumpWisps(T: StumpWispTuning, cell: readonly [number, number], cx: number, cz: number, d: number, time: number,
  mote: (x: number, y: number, z: number, c: THREE.Vector3, a: number, size?: number) => void, lights: WispLight[]): void {
  const fade = wispFade(T, d);
  if (!T.on || T.count <= 0 || fade <= 0) return;
  const seed = cell[0] * 7919 + cell[1] * 104729, F = T.fill, size = T.size ?? 0;
  const lit = fade * Math.min(1, Math.max(0, (T.lightRange - d) / Math.max(1, T.lightRange * 0.25))); // (the lights out by lightRange)
  // (the clearing's own cold moonlight, first so the nearest stump's always has it)
  if (F && F.strength > 0 && d < T.lightRange) lights.push({ d: d - 0.5, x: cx, y: F.height, z: cz, reach: F.reach, rgb: FILL.set(F.colour[0] / 255, F.colour[1] / 255, F.colour[2] / 255), strength: F.strength * lit });
  for (let i = 0; i < T.count; i++) {
    const c = colourOf(T, i), ph = hash2(seed, i, 23) * 6.28;
    // (breathing: a slow swell, five seconds or so a breath; held steady with reduce flashing)
    const b = comfort.reduceFlashing ? 1 : 1 - T.breathe * (0.5 + 0.5 * Math.sin(time * 1.2 + ph));
    const p = wispAt(T, seed, i, cx, cz, time, P);
    mote(p.x, p.y, p.z, c, Math.min(1, b * T.bright) * fade, size);
    for (let k = 1; k <= T.trail; k++) { // (its tail: where it was a moment ago, fading and narrowing)
      const q = wispAt(T, seed, i, cx, cz, time - k * 0.14, Q);
      mote(q.x, q.y, q.z, c, b * T.bright * 0.55 * Math.pow(0.6, k) * fade, size * Math.pow(0.85, k));
    }
    if (d < T.lightRange) lights.push({ d: d + i * 0.01, x: p.x, y: p.y, z: p.z, reach: T.reach, rgb: c, strength: T.strength * b * lit });
  }
}
