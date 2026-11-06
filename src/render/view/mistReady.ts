// When an area's loading mist may go (Ed, 2026-11-06: "Make sure things load and render before the mist disappears, and mist should
// fade away smoothly over a few seconds not vanish"): an area type's mist (render/loadingMist.ts) holds till everything in its areas
// that matters is loaded and drawn: its trees, its great stumps (or the rune stones), the campfires, and its creatures' plain look.
// "Drawn": its art in, and the batch that shows it put through to the GPU with its own program, linked (render/shaderDrawGate.ts:
// a stand-in's or a skipped draw doesn't count), on at least one frame: its trees' own batch, always (so a type none of whose trees
// the dive sees keeps its mist till they come into view); the stumps', the campfires' and the creatures' wherever any are in view. The sea's (and any ground
// not filled in yet: they read the same) holds till the ground is drawn with its own program (the coast's sand and waves, Ed:
// "Coast (waves, sand) is urgent because we cross it first") and the ground in view is filled.
// Each part's first time ready is logged (View.mistLog), with when the mist began to go, for the tools (tools/mist/dive-order.cjs).
import type * as THREE from "three";
import { AREA_TYPES } from "../../rules/map";
import type { StumpSpec } from "../artBuild";

/** A batch as the readiness reads it: how many it holds now, and its first mesh (its `userData.drawn` set by the draw gate). */
export interface Shown { count: number; meshes: readonly THREE.Object3D[] }
/** Drawn: put through with its own program on some frame (View's draw hook). */
export const drawn = (b: Shown | undefined | null): boolean => !!b && b.meshes[0]?.userData.drawn !== undefined;
/** Shown, or nothing of it to show now: what's held is drawn, or it holds none. */
export const shownIfAny = (b: Shown | undefined | null): boolean => !b || b.count === 0 || drawn(b);

/** What the readiness reads of the view (render/view.ts View: its batches, the art held, the scenery's last listing). */
export interface MistSource {
  assets: { hasType(t: number): boolean; hasCreature(sp: string): boolean; hasStump(spec: StumpSpec): boolean; version: number; home: { props: boolean } };
  typeBatches: ReadonlyMap<number, Shown>; creatureBatches: ReadonlyMap<string, Shown>;
  propBatch: Shown; markerBatch: Shown; stumpBatches: ReadonlyMap<string, Shown>;
  /** Each area type's great stumps (none with the rune stones). */
  stumpsOf(t: number): readonly StumpSpec[];
  stumps: boolean;
  /** The party's campfire art in (render/partyObjects.ts: the campfires are party objects, lit as the party reaches an area; none
   *  burn in the dormant forest the dive flies over, Ed 2026-10-04). */
  partyFires: boolean;
}

/** One area type's parts, ready or not. */
export interface AreaParts { trees: boolean; stumps: boolean; fires: boolean; creatures: boolean }

/** Area type `t`'s parts, each loaded and drawn (or none of it to draw). */
export function areaParts(v: MistSource, t: number): AreaParts {
  const A = v.assets;
  // Its trees: its art in and its own batch drawn, with trees in it, on some frame (its art on the GPU, its program linked). Till
  // some of its trees have been in view, its mist holds: an area type the dive never sees keeps its mist till she comes near it.
  const trees = A.hasType(t) && drawn(v.typeBatches.get(t));
  // Its stumps: every one of its areas' baked (asked ahead: render/islandNeeds.ts), and every stump on screen drawn; or the rune stones'.
  const stumps = v.stumps ? v.stumpsOf(t).every(s => A.hasStump(s)) && [...v.stumpBatches.values()].every(shownIfAny) : shownIfAny(v.markerBatch);
  // The campfires: the props' art (the start's own, first of all: the old fires and the magic stones), drawn where there are any in
  // view, and the party's campfire art, ready for when the party lights them (none burn in the dormant forest the dive flies over).
  const fires = A.home.props && v.partyFires && shownIfAny(v.propBatch);
  // Its creatures' plain look, drawn where there are any in view.
  const sp = AREA_TYPES[t]?.creature;
  const creatures = !sp || (A.hasCreature(sp) && shownIfAny(v.creatureBatches.get(sp)));
  return { trees, stumps, fires, creatures };
}

/** Area type `t`'s mist may go: all its parts ready. */
export const areaReady = (p: AreaParts): boolean => p.trees && p.stumps && p.fires && p.creatures;

/** The sea's (and the unfilled ground's) mist may go: the ground drawn with its own program (the coast's, with a coast), and none of
 *  the ground in view waiting to be filled. */
export const seaReady = (groundDrawn: boolean, pendingGround: number | undefined): boolean => groundDrawn && (pendingGround ?? 0) === 0;

/** The log's line for an area type (or the sea, -1): when each part was first ready, its mist began to go, and (wall clock, ms,
 *  performance.now). */
export interface MistLogEntry { trees?: number; stumps?: number; fires?: number; creatures?: number; ground?: number; ready?: number; fade?: number }

/** Note `p`'s parts first ready now in `log`'s line for `t`. */
export function noteParts(log: Map<number, MistLogEntry>, t: number, p: Partial<AreaParts> & { ground?: boolean }, now: number): MistLogEntry {
  let e = log.get(t);
  if (!e) log.set(t, (e = {}));
  for (const k of ["trees", "stumps", "fires", "creatures", "ground"] as const) if (p[k] && e[k] === undefined) e[k] = now;
  return e;
}
