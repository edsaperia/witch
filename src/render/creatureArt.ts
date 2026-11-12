// Whole helpers moved from artBuild; drawing bodies are unchanged.
import * as Art from "./creatureArt.primitives";
import { hasMesh, meshGait, meshNap, meshSleep, meshWalk } from "../../art/mesh/index.js";
import type { Style } from "./style";
import { type RigGear } from "./rig/rigBuild";
import { overrideFor, poseName, type Override } from "./overrides";
import type { Baked, MakeCanvas } from "./artBuild";

/** A kind of creature at each level (baby, young, adult, legend), two walking frames each. */
export function creatureSprites(st: Style, species: string, mk: MakeCanvas, gear: unknown = null, onlyLevel?: number): Baked[] {
  if (hasMesh(species, st)) return meshSprites(species, mk, gear, onlyLevel); // (drawn as a mesh: art/mesh, ?meshCreatures=1)
  const out: Baked[] = [];
  const n = (Art.walkGait(species) as { frames: number }).frames; // (its walk's frames: 2, or its own cycle's)
  for (const facing of ["towards", "away"]) for (let level = onlyLevel ?? 0; level < (onlyLevel === undefined ? 4 : onlyLevel + 1); level++) for (let f = 0; f < n; f++) {
    const hand = overrideFor(species, poseName(level, f, facing === "away")); // (a hand-drawn frame: art/overrides, as it is)
    if (hand) { out.push(bakeOverride(hand, mk)); continue; }
    const sp = Art.critter(species, level, f, st, facing, gear as null) as { m: ArrayLike<number> };
    const b = Art.bake(sp, Art.speciesColours(species, st, gear as null, level), st, st.cOutline, mk) as Baked;
    if (!gear || Object.keys(gear).every(k => k === "face")) b.eyes = eyeMask(sp.m); // (an expression alone keeps the find-in-the-dark eyes)
    b.head = headPoint(sp.m, b.w, b.h);
    out.push(b);
  }
  return out;
}

interface MeshFrame { albedo: Uint8ClampedArray; normal: Uint8ClampedArray; flipped: Uint8ClampedArray; eyes?: Uint8Array; head?: [number, number] }
interface MeshWalk { w: number; h: number; towards: MeshFrame[]; away: MeshFrame[] }

/** One frame art/mesh/raster.js drew, as a baked sprite: its colours (a glowing pixel's alpha 254) and the camera's normals, so
 *  the game's own light falls on it. woken: an enraged creature's look, as the generated ones have it (art/creatures.js
 *  speciesColours): its coat darker and a little red, its eyes red and lit. */
function meshFrame(f: MeshFrame, w: number, h: number, mk: MakeCanvas, woken = false, eyes = false): Baked {
  const A = mk(w, h), N = mk(w, h), NF = mk(w, h), a = new Uint8ClampedArray(f.albedo);
  if (woken) for (let i = 0; i < w * h; i++) { const q = i * 4;
    if (f.eyes?.[i]) a.set(WOKEN_EYE, q); else if (a[q + 3] === 255) { a[q] = a[q] * 0.72 + 3; a[q + 1] = a[q + 1] * 0.72 + 0.8; a[q + 2] = a[q + 2] * 0.72 + 1.2; } }
  for (const [c, px] of [[A, a], [N, f.normal], [NF, f.flipped]] as const) { const g = c.getContext("2d") as CanvasRenderingContext2D, d = g.createImageData(w, h); d.data.set(px); g.putImageData(d, 0, 0); }
  return { A, N, NF, w, h, eyes: eyes ? f.eyes : undefined, head: f.head } as Baked;
}
const WOKEN_EYE = [255, 40, 36, 254]; // (a woken creature's eyes: red, and lit in the dark)
/** What of a creature's gear a mesh wears (art/mesh/gear.js): its party gear. Faces are not drawn (Ed, 2026-11-05: "Scrap animal
 *  expressions for now."). */
const worn = (gear: unknown): object | null => { const g = gear as { collar?: unknown; hat?: unknown; glasses?: unknown; shoes?: unknown } | null; return g && (g.collar || g.hat != null || g.glasses || g.shoes) ? g : null; };

/** A mesh creature's walk as baked sprites (art/mesh/index.js; Ed, 2026-11-12: "let's do the real build"), in creatureSprites'
 *  order: towards then away, each level, each frame of its cycle and then it standing still; in its party gear if it has any, enraged if gear.woken. */
function meshSprites(species: string, mk: MakeCanvas, gear: unknown, onlyLevel?: number): Baked[] {
  const levels = onlyLevel === undefined ? [0, 1, 2, 3] : [onlyLevel], walks = levels.map(l => meshWalk(species, l, worn(gear) as null) as MeshWalk), out: Baked[] = [];
  const woken = !!(gear as { woken?: boolean } | null)?.woken, plain = !gear || Object.keys(gear as object).every(k => k === "face");
  for (const facing of ["towards", "away"] as const) for (const walk of walks) for (const f of walk[facing]) out.push(meshFrame(f, walk.w, walk.h, mk, woken, plain));
  return out;
}

/** A mesh creature asleep, as the nap job wants it (render/artBuild.ts): each level's two breaths, towards, with each frame's
 *  ground line (its bottom row) and its middle (the sprite's own). gear: what it wears, kept on asleep. */
export function meshNapSprites(species: string, mk: MakeCanvas, gear: unknown): { sprites: Baked[]; ground: number[]; centre: number[] } {
  const sprites: Baked[] = [], ground: number[] = [], centre: number[] = [];
  for (let level = 0; level < 4; level++) { const nap = meshNap(species, level, worn(gear) as null) as unknown as MeshWalk; for (const f of nap.towards) { sprites.push(meshFrame(f, nap.w, nap.h, mk)); ground.push(nap.h); centre.push(0); } }
  return { sprites, ground, centre };
}

/** A mesh species' sleeping legend, as the sleep job wants it: its two slow breaths, gone to stone and moss and part sunk. */
export function meshSleepSprites(species: string, mk: MakeCanvas): { sprites: Baked[]; ground: number[]; centre: number[] } {
  const s = meshSleep(species) as unknown as MeshWalk;
  return { sprites: s.towards.map(f => meshFrame(f, s.w, s.h, mk)), ground: s.towards.map(() => s.h), centre: s.towards.map(() => 0) };
}
/** Whether this species is drawn as a mesh under this style (art/mesh/index.js). */
export const meshSpecies = (species: string, st: Style): boolean => hasMesh(species, st);

/** A hand-drawn frame (art/overrides/README.md) as a baked sprite: its pixels as drawn (alpha 254 glows, under 128 is empty,
 *  the rest solid) and a flat normal facing us, so the light falls on it evenly. */
export function bakeOverride(o: Override, mk: MakeCanvas): Baked {
  const A = mk(o.w, o.h), N = mk(o.w, o.h);
  const ca = A.getContext("2d") as CanvasRenderingContext2D, cn = N.getContext("2d") as CanvasRenderingContext2D;
  const a = ca.createImageData(o.w, o.h), n = cn.createImageData(o.w, o.h);
  for (let i = 0; i < o.w * o.h; i++) {
    const al = o.rgba[i * 4 + 3];
    if (al < 128) continue;
    a.data.set([o.rgba[i * 4], o.rgba[i * 4 + 1], o.rgba[i * 4 + 2], al === 254 ? 254 : 255], i * 4);
    n.data.set([128, 128, 255, 255], i * 4);
  }
  ca.putImageData(a, 0, 0); cn.putImageData(n, 0, 0);
  return { A, N, w: o.w, h: o.h };
}

// Wild creatures' eyes (Ed, v244): packPixels gives their eye pixels alpha 253, so the sprite
// shader can make them catch the light (eyeshine) when finding is on; otherwise they're lit like the rest.
export const EYES = new Set([Art.M.EYE, Art.M.IRIS, Art.M.PUPIL]);

export function eyeMask(m: ArrayLike<number>): Uint8Array | undefined {
  const out = new Uint8Array(m.length);
  let any = false;
  for (let i = 0; i < m.length; i++) if (EYES.has(m[i])) { out[i] = 1; any = true; }
  return any ? out : undefined;
}

/** Where a creature's head is in its sprite (Ed, 2026-10-12: "can we have the tail of bubbles point at creatures' heads?"): the
 *  middle of its eyes where they show, else the middle of its topmost few rows (turned away, its head's back and ears; asleep,
 *  the top of the curl), in art pixels from its top left. */
export function headPoint(m: ArrayLike<number>, w: number, h: number): [number, number] | undefined {
  let n = 0, sx = 0, sy = 0, top = -1;
  for (let i = 0; i < w * h; i++) { if (EYES.has(m[i])) { n++; sx += i % w; sy += Math.floor(i / w); } if (top < 0 && m[i]) top = Math.floor(i / w); }
  if (n) return [sx / n + 0.5, sy / n + 0.5];
  if (top < 0) return undefined;
  let bottom = h - 1;
  while (bottom > top && ![...Array(w).keys()].some(x => m[bottom * w + x])) bottom--;
  const rows = Math.max(2, Math.round((bottom - top + 1) * 0.18));
  for (let y = top; y < Math.min(h, top + rows); y++) for (let x = 0; x < w; x++) if (m[y * w + x]) { n++; sx += x; }
  return [sx / n + 0.5, top + rows / 2];
}

/** Towards: frames 0 to 4n - 1 (level x n + walk frame, n its walk's frames: 2 unless it has its own cycle); away: the
 *  same, from 4n. */
export const creatureFrame = (level: number, f: number, away = false, n = 2) => (away ? 4 * n : 0) + level * n + (((f % n) + n) % n);

/** A species' walk: its frames, and how far it moves between them (a share of its sprite's width); a mesh creature's says more
 *  (art/mesh/index.js meshGait: its cycle, its standing frame, each level's step, how it goes). */
export interface WalkGait { frames: number; step: number; steps?: number[]; cycle?: number; stand?: number; rate?: number; type?: string }
export const walkGait = (species: string, st?: Style): WalkGait => (st && hasMesh(species, st) ? meshGait(species) : Art.walkGait(species)) as WalkGait;

/** A party animal's gear (seeded by its id). Leashed: its seeded gear and the glowing collar in
 *  `colour`. Happy (colour null): the gear without the collar, always at least a hat so it reads as
 *  dressed up. The party bake and the live rig's party pages both wear it. */
export function partyGearOf(seed: number, colour: number[] | null): RigGear {
  const g = Art.partyGear(seed) as { hat: number | null; glasses: string | null; shoes: string | null };
  return { collar: colour ?? null, hat: !colour && g.hat === null ? seed % 3 : g.hat, glasses: g.glasses, shoes: g.shoes };
}
