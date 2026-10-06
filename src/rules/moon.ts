// The moon (Ed, 2026-10-06: "The moon should slowly change: occasionally becoming red, and blue, and
// yellow, and going through phases, and moving across the sky"). One moon for the whole game: the sky
// draws it (render/sky.ts), the moonlight takes a little of its colour (render/view.ts), and before the
// first wave the dancefloor shows its phase (rules/dancefloor.ts). A pure function of game time and the
// seed, so every part of the game sees the same moon and a run's moon is the same every time.
import { hash2 } from "./random";
import type { Tuning } from "./tuning";

export type MoonKind = "plain" | "red" | "blue" | "gold";

export interface MoonState {
  /** Its phase, 0 new, 0.25 first quarter, 0.5 full, 0.75 last quarter, back to 1 (new). */
  phase: number;
  /** How much of its face is lit, 0 to 1. */
  lit: number;
  /** Where it is on its way across the sky, 0 (rising, left) to 1 (setting, right); and where that puts it
   *  on the screen's sky band (fractions of the screen, x from the left, y from the bottom). */
  arc: number; x: number; y: number;
  /** A coloured moon: which, and how far in (0 plain to 1 fully coloured, easing in and out). */
  kind: MoonKind; colour: number;
  /** Its colour now (0-1 rgb): the plain moon's, eased towards the coloured one's. */
  rgb: [number, number, number];
}

const PLAIN: [number, number, number] = [0.92, 0.94, 0.86];
const KINDS: Exclude<MoonKind, "plain">[] = ["red", "blue", "gold"];
const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

/** The moon at game time `time` in the run of `seed`. */
export function moonState(time: number, seed: number, t: Tuning): MoonState {
  const M = t.moon, frac = (v: number) => v - Math.floor(v);
  const phase = frac(M.phaseStart + time / Math.max(1, M.phasePeriod));
  const arc = frac(M.arcStart + time / Math.max(1, M.orbit));
  // Across the sky band: up quickly from behind the far forest at the left, high for most of its way, down at the right.
  const x = M.left + (M.right - M.left) * arc, y = M.low + (M.high - M.low) * Math.sqrt(Math.sin(Math.PI * arc));
  // Coloured moons: the run cut into windows of colourEvery seconds; in each (never the first) a seeded
  // chance of a red, blue or gold moon for colourTime seconds somewhere in it, easing in and out over colourFade.
  const w = Math.floor(time / M.colourEvery), into = time - w * M.colourEvery;
  let kind: MoonKind = "plain", colour = 0;
  if (w > 0 && hash2(w, seed, 4111) < M.colourChance) {
    const start = hash2(w, seed, 4113) * Math.max(0, M.colourEvery - M.colourTime), fade = Math.min(M.colourFade, M.colourTime / 2);
    colour = Math.min(smooth(start, start + fade, into), 1 - smooth(start + M.colourTime - fade, start + M.colourTime, into));
    if (colour > 0) kind = KINDS[Math.floor(hash2(w, seed, 4117) * KINDS.length) % KINDS.length];
  }
  const c = kind === "plain" ? PLAIN : (M.colours[kind] as [number, number, number]);
  const rgb = PLAIN.map((p, i) => p + (c[i] - p) * colour) as [number, number, number];
  return { phase, lit: 0.5 - 0.5 * Math.cos(phase * Math.PI * 2), arc, x, y, kind, colour, rgb };
}
