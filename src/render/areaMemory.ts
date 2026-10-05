// What a remembered area shows from the treetops (rules/memory.ts; Ed, 2026-10-05): faintly, as
// part of the forest rather than a marker: the sigils of the species she saw there drift slowly,
// small, upright and low, just over its canopy near its heart; bigger for more of them, with a few motes
// for a crowd; tinted by their mood when she was last there (their own colour while wild, rosy
// when happy, smouldering red when enraged). No numbers, no outlines. Areas she hasn't landed in
// show nothing: the forest stays dark.
import { hash2 } from "../rules/random";
import type { ForestMap } from "../rules/map";
import type { MemoryState } from "../rules/memory";

/** Adds a flat sprite (a sigil or a dot) at (x, y, z) of `size` metres, in a colour and opacity. */
export type AddSprite = (x: number, y: number, z: number, size: number, species: string | null, level: number, r: number, g: number, b: number, a: number) => void;

/** How far from her a remembered area shows (metres), and how high over the canopy (metres above the treetops). */
const RANGE = 520, LIFT = 1.2;

/** Draw every remembered area within RANGE of (wx, wz), faded in by `up` (0 on the ground to 1 in the treetops). */
export function drawAreaMemory(mem: MemoryState, map: ForestMap, wx: number, wz: number, canopy: number, up: number, time: number, colour: (species: string) => { r: number; g: number; b: number }, sigil: AddSprite, dot: AddSprite): void {
  if (up < 0.02) return;
  for (const a of mem.areas.values()) {
    const site = map.siteOf(a.cell[0], a.cell[1]);
    if (Math.abs(site.x - wx) > RANGE || Math.abs(site.z - wz) > RANGE) continue;
    const near = Math.hypot(site.x - wx, site.z - wz), fade = up * Math.min(1, (RANGE - near) / 120);
    a.seen.slice(0, 3).forEach((s, i) => {
      const n = s.wild + s.happy + s.enraged;
      if (!n) return;
      // Where it drifts: round the area's heart (clear of its wave number), each species its own slow circle.
      const ang = hash2(a.cell[0] * 31 + i, a.cell[1], 811) * Math.PI * 2 + time * 0.03 * (i % 2 ? 1 : -1), rad = 24 + i * 10;
      const x = site.x + Math.cos(ang) * rad, z = site.z + Math.sin(ang) * rad * 0.8, y = canopy + LIFT + Math.sin(time * 0.6 + i * 2.1 + a.cell[0]) * 0.4;
      // Their colour by mood: the species' own while wild, warmed to rose when happy, red when enraged.
      const c = colour(s.species), hk = s.happy / n, ek = s.enraged / n;
      const r = c.r * (1 - hk - ek) + 1 * hk + 1 * ek, g = c.g * (1 - hk - ek) + 0.6 * hk + 0.18 * ek, b = c.b * (1 - hk - ek) + 0.78 * hk + 0.12 * ek;
      const breathe = 0.85 + 0.15 * Math.sin(time * 0.9 + i + a.cell[1]);
      sigil(x, y, z, 8 + Math.min(5, Math.sqrt(n) * 1.6), s.species, 1, r, g, b, 0.6 * fade * breathe);
      // A crowd: a few motes round it, one for every couple of creatures (at most six).
      for (let k = 0; k < Math.min(6, Math.floor(n / 2)); k++) {
        const ph = (time * 0.12 + hash2(a.cell[0] * 7 + i, a.cell[1] * 13 + k, 823)) % 1, ma = hash2(k, a.cell[0] + i, 829) * Math.PI * 2;
        dot(x + Math.cos(ma) * 6, y - 2 + ph * 5, z + Math.sin(ma) * 4.5, 0.9, null, 0, r, g, b, 0.4 * fade * Math.sin(ph * Math.PI));
      }
    });
  }
}
