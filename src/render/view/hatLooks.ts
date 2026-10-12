// Her hats lying in the world each keep the look they had when they went down (Ed, 2026-10-12: a hat left lying when she takes
// a new one in her room stays as it was designed, and its pointer's 🎩 is "in the hat colour chosen in the character creator").
// The rules know only where each lies (rules/hat.ts hatMarkers); the view notes her look (her genome) the first frame it sees
// each one, which is before any new look from her room takes (main.ts applies it on the way out), and lets it go once it's gone.
import * as THREE from "three";
import { DEFAULT_OUTFIT, genomeLook } from "../../../art/generator.js";
import { hatMarkers } from "../../rules/hat";
import type { View } from "../view";

/** A lying hat's name while it lies (where and when it went down: kept as it moves from her own to the left ones). */
export const hatKey = (q: { x: number; z: number; at: number }): string => `${q.x},${q.z},${q.at}`;

/** Notes her look for each hat of hers lying that has none yet, and forgets the ones no longer lying. */
export function noteHatLooks(v: View): void {
  const keys = new Set(hatMarkers(v.game.witches[0].hat).map(hatKey));
  for (const k of [...v.hatLooks.keys()]) if (!keys.has(k)) v.hatLooks.delete(k);
  for (const k of keys) if (!v.hatLooks.has(k)) v.hatLooks.set(k, v.assets.witchGenome);
}

/** The hat's colour from the character creator (its genome's palette, or hers by default), lifted to read on a pointer. */
export function hatInk(genome: unknown): THREE.Vector3 {
  const outfit = genome ? (genomeLook as (g: unknown) => { outfit: Record<string, number[]> | null })(genome).outfit : null;
  const [h, s, l] = (outfit ?? (DEFAULT_OUTFIT as Record<string, number[]>)).hat;
  const c = new THREE.Color().setHSL(h, Math.max(0.45, s), Math.max(0.62, l));
  return new THREE.Vector3(c.r, c.g, c.b);
}
