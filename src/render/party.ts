// What the party looks like as it spreads: a soundsystem in each partified area, its cones
// pumping, with a coloured light; and the magical transition when an area partifies, a front of
// light sweeping across it from the border the party came over, the soundsystem rising out of
// the ground as the front reaches the clearing. The rules are in rules/party.ts.
import * as THREE from "three";
import type { Game } from "../rules/game";
import { hash2, smoothstep } from "../rules/random";
import type { Atlas } from "./atlas";
import type { SpriteInstance } from "./sprites";
import type { ForestLight } from "./view";
import { moodOf } from "./mood";

const CRYSTAL = [new THREE.Vector3(0.25, 0.85, 1), new THREE.Vector3(0.7, 0.4, 1), new THREE.Vector3(1, 0.65, 0.2)];

export interface Sweep { x: number; z: number; radius: number; strength: number }
/** A playing soundsystem, for its laser show: where its top is, its seed, when it finished rising. */
export interface Playing { x: number; y: number; z: number; seed: number; ready: number }

export class PartyView {
  constructor(private atlas: Atlas, private metresPerPixel: number) {}

  /** The mood's warm light colours as vectors, made once (not every frame). */
  private warm: { from: number[][]; rgb: THREE.Vector3[] } | null = null;
  private warmOf(from: number[][]): THREE.Vector3[] {
    if (this.warm?.from !== from) this.warm = { from, rgb: from.map(c => new THREE.Vector3(c[0], c[1], c[2])) };
    return this.warm.rgb;
  }

  /** This frame's soundsystem sprites, their lights, and the ground's sweeping fronts. */
  update(g: Game, time: number, visible: (x: number, z: number, w: number, h: number) => boolean, mark: (x: number, z: number, h: number) => boolean) {
    const t = g.tuning.party, items: SpriteInstance[] = [], lights: ForestLight[] = [], sweeps: Sweep[] = [], playing: Playing[] = [];
    const M = moodOf(g.tuning), warm = M?.partyWarm.length ? this.warmOf(M.partyWarm) : null;
    // Home has no soundsystem of its own: the dancefloor's ring of speakers carries its music (Ed,
    // v183), and each of them has a single laser (lasers.ts speakerLasers; none from the disco ball, Ed).
    const list: { x: number; z: number; variant: number; at: number; from: null | { x: number; z: number } }[] = [];
    for (const [, a] of g.party.areas) {
      if (!a.soundsystem) continue;
      const from = a.from ? g.map.siteOf(a.from[0], a.from[1]) : null;
      list.push({ ...a.soundsystem, at: a.at, from });
    }
    for (const s of list) {
      // 0 to 1 over the transition: the front crosses the area, the soundsystem rises at the end.
      const p = t.transition > 0 ? Math.min(1, (time - s.at) / t.transition) : 1;
      const frame = this.atlas.frames[s.variant * 3 + (Math.floor(time * 6) % 3)];
      const h = frame.h * this.metresPerPixel, rise = smoothstep((p - 0.55) / 0.45);
      if (p < 1 && s.from) {
        // The front starts at the border with the neighbour it came from and sweeps past the clearing.
        const ox = (s.from.x + s.x) / 2, oz = (s.from.z + s.z) / 2, reach = Math.hypot(s.x - ox, s.z - oz) * 1.6;
        sweeps.push({ x: ox, z: oz, radius: p * reach, strength: 1 - smoothstep((p - 0.8) / 0.2) });
      }
      if (rise > 0 && visible(s.x, s.z, frame.w * this.metresPerPixel, h)) {
        // Each faces left or right, seeded from where it stands (Ed, 2026-10-03); the shader mirrors
        // its normal map too, and its light and lasers rise from its centre either way.
        const flip = hash2(Math.round(s.x * 10), Math.round(s.z * 10), 911) < 0.5;
        items.push({ x: s.x, y: -(1 - rise) * h, z: s.z, frame, flip, fresh: mark(s.x, s.z, h) });
      }
      if (p >= 1) playing.push({ x: s.x, y: h * 0.85, z: s.z, seed: Math.floor(Math.abs(s.x * 7.3 + s.z * 13.1)) % 100000, ready: s.at + t.transition });
      const beat = 0.85 + 0.15 * Math.sin(time * 8);
      // Spooky (render/mood.ts): the party is the warm light in a cold wood, its pools wider and warmer.
      if (rise > 0) lights.push({ x: s.x, y: 3, z: s.z, reach: t.lightReach * (M?.partyReach ?? 1), rgb: (warm ?? CRYSTAL)[s.variant % 3], strength: t.lightStrength * (M?.partyStrength ?? 1) * beat * rise * (1 + (1 - p) * 2) });
    }
    return { items, lights, sweeps, playing };
  }
}
