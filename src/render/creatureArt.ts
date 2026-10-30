// Whole helpers moved from artBuild; drawing bodies are unchanged.
import * as Art from "./creatureArt.primitives";
import type { Style } from "./style";
import { type RigGear } from "./rig/rigBuild";
import { overrideFor, poseName, type Override } from "./overrides";
import type { Baked, MakeCanvas } from "./artBuild";

/** A kind of creature at each level (baby, young, adult, legend), two walking frames each. */
export function creatureSprites(st: Style, species: string, mk: MakeCanvas, gear: unknown = null, onlyLevel?: number): Baked[] {
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

/** A species' walk: its frames, and how far it moves between them (a share of its sprite's width). */
export const walkGait = (species: string): { frames: number; step: number } => Art.walkGait(species) as { frames: number; step: number };

/** A party animal's gear (seeded by its id). Leashed: its seeded gear and the glowing collar in
 *  `colour`. Happy (colour null): the gear without the collar, always at least a hat so it reads as
 *  dressed up. The party bake and the live rig's party pages both wear it. */
export function partyGearOf(seed: number, colour: number[] | null): RigGear {
  const g = Art.partyGear(seed) as { hat: number | null; glasses: string | null; shoes: string | null };
  return { collar: colour ?? null, hat: !colour && g.hat === null ? seed % 3 : g.hat, glasses: g.glasses, shoes: g.shoes };
}
