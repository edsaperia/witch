// The lighting's mood (Ed, 2026-10-06: "make it a spooky dark forest with a party in it"): the night
// grade every material shares, as numbers in the tuning file (light.spooky), laid over the Art Lab's
// light (the style) and the tuning's own. Spooky: deep blue-green shadows, a colder moon that rims
// what it lights, a violet fog that comes in close and swallows the far trees, thicker mist, and a
// warmer glow round the witch, so the party is the warm light in the dark wood. light.mood "plain"
// (or ?light=plain) is the light as it was. Drawing only: the rules never see it.
import type { Mood, Tuning } from "../rules/tuning";
import type { Game } from "../rules/game";
import { cellKey, partifiedKey } from "../rules/party";
export type { Mood };


/** The mood in force, or null for the plain light. */
export function moodOf(t: Pick<Tuning, "light">): Mood | null {
  const L = t.light;
  return L && L.mood === "spooky" ? L.spooky : null;
}

/** The mood's grade into the composite's uGrade (render/post.ts COMPOSITE): its strength, how far it drains colour, the luma
 *  it fades out at; none (0, 0, 1) for the plain light or a grade of 0. Read every frame, as the pause page's Spooky grade slider
 *  sets light.spooky.grade in place (Ed, 2026-10-21). The area moods ease only its tint (AreaMoods), never this. */
export function gradeInto(out: { set(x: number, y: number, z: number, w: number): unknown }, M: Mood | null): void {
  if (M?.grade) out.set(M.grade, M.gradeDesat, M.gradePivot, 0); else out.set(0, 0, 1, 0);
}

/** The wild-only grade (light.spooky.wildGrade; Ed, 2026-11-12: "Can you make a new pause menu group that has each of these applied in
 *  the wild only so I can tweak them?") into the composite's uWildGrade: its strength times `wild` (how wild it is where she is, 0 on
 *  party ground and home, 1 in the wild, eased: AreaMoods.wild) shaped smooth, how far it drains colour, the luma it fades out at;
 *  none (0, 0, 1) for the plain light, a strength of 0 or party ground. Read every frame, so its sliders are live. It's laid after the
 *  global grade (light.spooky.grade, everywhere), on what that left: in the wild both apply, one then the other. */
export function wildGradeInto(out: { set(x: number, y: number, z: number, w: number): unknown }, M: Mood | null, wild: number): void {
  const W = M?.wildGrade, k = Math.max(0, Math.min(1, wild)), s = W ? W.strength * k * k * (3 - 2 * k) : 0;
  if (W && s > 0) out.set(s, W.desat, W.pivot, 0); else out.set(0, 0, 1, 0);
}

/** Whether (x, z) is the wild for the wild-only grade: as her light reckons it (render/combatLight.ts), an area the party hasn't
 *  reached; never home (`area` "home", the moods' own name for within the home radius) or party ground. */
export function wildAt(g: Pick<Game, "party" | "map">, x: number, z: number, area: string): boolean {
  return area !== "home" && !partifiedKey(g.party, g.map, cellKey(g.map.areaAt(x, z).cell));
}

/** A grade's tint from its hue and saturation, at the brightness it leaves: a colour of luma 1, so it shifts hue, not level. */
export function tintInto(out: { set(r: number, g: number, b: number): unknown; x: number; y: number; z: number }, hue: number, sat: number): void {
  hsvInto(out, hue, sat, 1);
  const l = 0.3 * out.x + 0.55 * out.y + 0.15 * out.z;
  if (l > 0) out.set(out.x / l, out.y / l, out.z / l);
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
  /** How wild it is where she is (0 party ground and home, 1 the wild), eased at the same pace as the rest (areaEase): the wild-only grade's share. */
  wild = 0;
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
  update(area: string, dt: number, haze: { set(r: number, g: number, b: number): unknown }, tint: { set(r: number, g: number, b: number): unknown; x: number; y: number; z: number } | null, mist: { setStrength(s: number): void } | null, wild = 0): void {
    const T = this.target(area), k = 1 - Math.exp(-Math.max(0, dt) * (this.M.areaEase ?? 0.5)), C = this.cur;
    this.wild += ((wild ? 1 : 0) - this.wild) * k;
    for (const key of AREA_KEYS) {
      if (key === "hazeHue" || key === "gradeHue") { const d = ((T[key] - C[key] + 1.5) % 1) - 0.5; C[key] = (C[key] + d * k + 1) % 1; } // round the hue circle the short way
      else C[key] += (T[key] - C[key]) * k;
    }
    hsvInto(haze, C.hazeHue, C.hazeSat, 1, C.haze);
    if (tint) tintInto(tint, C.gradeHue, C.gradeSat);
    mist?.setStrength(C.mist);
  }
}
