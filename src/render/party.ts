// What the party looks like as it spreads: a soundsystem in each partified area, its cones
// pumping, with a coloured light; and the magical transition when an area partifies, a front of
// light sweeping across it from the border the party came over, the soundsystem rising out of
// the ground as the front reaches the clearing. The rules are in rules/party.ts.
import * as THREE from "three";
import type { Game } from "../rules/game";
import { smoothstep } from "../rules/random";
import type { Atlas } from "./atlas";
import type { SpriteInstance } from "./sprites";
import type { ForestLight } from "./view";

const CRYSTAL = [new THREE.Vector3(0.25, 0.85, 1), new THREE.Vector3(0.7, 0.4, 1), new THREE.Vector3(1, 0.65, 0.2)];

export interface Sweep { x: number; z: number; radius: number; strength: number }
/** A playing soundsystem, for its laser show: where its top is, its seed, when it finished rising. */
export interface Playing { x: number; y: number; z: number; seed: number; ready: number }

export class PartyView {
  constructor(private atlas: Atlas, private metresPerPixel: number) {}

  /** The soundsystem standing at the edge of the dancefloor's clearing. */
  private homeSoundsystem(g: Game) {
    const d = g.map.dancefloor;
    return { x: d.x + d.radius + 5, z: d.z + 3, variant: 0, at: -Infinity, from: null as null | { x: number; z: number } };
  }

  /** This frame's soundsystem sprites, their lights, and the ground's sweeping fronts. */
  update(g: Game, time: number, visible: (x: number, z: number, w: number, h: number) => boolean, mark: (x: number, z: number, h: number) => boolean) {
    const t = g.tuning.party, items: SpriteInstance[] = [], lights: ForestLight[] = [], sweeps: Sweep[] = [], playing: Playing[] = [];
    const list = [this.homeSoundsystem(g)];
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
        items.push({ x: s.x, y: -(1 - rise) * h, z: s.z, frame, flip: false, fresh: mark(s.x, s.z, h) });
      }
      if (p >= 1) playing.push({ x: s.x, y: h * 0.85, z: s.z, seed: Math.floor(Math.abs(s.x * 7.3 + s.z * 13.1)) % 100000, ready: s.at + t.transition });
      const beat = 0.85 + 0.15 * Math.sin(time * 8);
      if (rise > 0) lights.push({ x: s.x, y: 3, z: s.z, reach: t.lightReach, rgb: CRYSTAL[s.variant % 3], strength: t.lightStrength * beat * rise * (1 + (1 - p) * 2) });
    }
    return { items, lights, sweeps, playing };
  }
}
