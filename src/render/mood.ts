// The lighting's mood (Ed, 2026-10-06: "make it a spooky dark forest with a party in it"): the night
// grade every material shares, as numbers in the tuning file (light.spooky), laid over the Art Lab's
// light (the style) and the tuning's own. Spooky: deep blue-green shadows, a colder moon that rims
// what it lights, a violet fog that comes in close and swallows the far trees, thicker mist, and a
// warmer glow round the witch, so the party is the warm light in the dark wood. light.mood "plain"
// (or ?light=plain) is the light as it was. Drawing only: the rules never see it.
import type { Mood, Tuning } from "../rules/tuning";
export type { Mood };


/** The mood in force, or null for the plain light. */
export function moodOf(t: Pick<Tuning, "light">): Mood | null {
  const L = t.light;
  return L && L.mood === "spooky" ? L.spooky : null;
}

/** h, s, v (0 to 1) into rgb 0 to 1, as art/core.js hsv2rgb (its rounding to whole 255ths), times k, with no allocation. */
export function hsvInto(out: { set(r: number, g: number, b: number): unknown }, h: number, s: number, v: number, k = 1): void {
  h = ((h % 1) + 1) % 1; s = Math.max(0, Math.min(1, s)); v = Math.max(0, Math.min(1, v));
  const i = Math.floor(h * 6), f = h * 6 - i, p = q255(v * (1 - s), k), q = q255(v * (1 - f * s), k), t = q255(v * (1 - (1 - f) * s), k), w = q255(v, k);
  switch (i % 6) {
    case 0: out.set(w, t, p); break;
    case 1: out.set(q, w, p); break;
    case 2: out.set(p, w, t); break;
    case 3: out.set(p, q, w); break;
    case 4: out.set(t, p, w); break;
    default: out.set(w, p, q);
  }
}
const q255 = (x: number, k: number) => (Math.round(x * 255) / 255) * k;

/** What an area may change of the mood (light.spooky.areas): its fog's colour and brightness, the grade's tint, the mist. */
export interface AreaMood { hazeHue: number; hazeSat: number; haze: number; gradeHue: number; gradeSat: number; mist: number }
const AREA_KEYS = ["hazeHue", "hazeSat", "haze", "gradeHue", "gradeSat", "mist"] as const;

/** The mood where she is: each area type its own fog, tint and mist (light.spooky.areas, by area id;
 *  "home" for home), eased as she crosses from one to the next (light.spooky.areaEase a second), so
 *  the bog is misty and teal and the dead wood violet, and nothing jumps. */
export class AreaMoods {
  private cur: AreaMood;
  private targets = new Map<string, AreaMood>();
  constructor(private M: Mood) { this.cur = this.target(""); }

  /** The mood an area aims for: the spooky grade's, with the area's own over it (worked out once an area). */
  target(area: string): AreaMood {
    let T = this.targets.get(area);
    if (!T) {
      const own = this.M.areas?.[area] ?? {};
      T = { hazeHue: this.M.hazeHue, hazeSat: this.M.hazeSat, haze: this.M.haze, gradeHue: this.M.gradeHue, gradeSat: this.M.gradeSat, mist: this.M.mist, ...own };
      this.targets.set(area, T);
    }
    return T;
  }

  /** Ease toward `area`'s mood over dt seconds and write it into the fog colour, the grade's tint (a
   *  colour of luma 1) and the mist's strength. */
  update(area: string, dt: number, haze: { set(r: number, g: number, b: number): unknown }, tint: { set(r: number, g: number, b: number): unknown; x: number; y: number; z: number } | null, mist: { setStrength(s: number): void } | null): void {
    const T = this.target(area), k = 1 - Math.exp(-Math.max(0, dt) * (this.M.areaEase ?? 0.5)), C = this.cur;
    for (const key of AREA_KEYS) {
      if (key === "hazeHue" || key === "gradeHue") { const d = ((T[key] - C[key] + 1.5) % 1) - 0.5; C[key] = (C[key] + d * k + 1) % 1; } // round the hue circle the short way
      else C[key] += (T[key] - C[key]) * k;
    }
    hsvInto(haze, C.hazeHue, C.hazeSat, 1, C.haze);
    if (tint) {
      hsvInto(tint, C.gradeHue, C.gradeSat, 1);
      const l = 0.3 * tint.x + 0.55 * tint.y + 0.15 * tint.z;
      if (l > 0) tint.set(tint.x / l, tint.y / l, tint.z / l);
    }
    mist?.setStrength(C.mist);
  }
}
