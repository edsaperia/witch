// Her cooldown trail's colours (Ed, 2026-11-03: "Perhaps you can set the colour set of your trail in the broom station and there are a
// few presets; so e.g. the choices might be '🟥🟧🟨⬜' or '🟪🟦🟩🟨'"): the presets (config/trail-colours.json), each an ordered list of
// colours for the cooldown sections behind the buffer, front to back. More sections than colours (Ed: "If you have more sections than
// colours, they spread out the gradient"): the colours are a gradient's stops, section i of N taking it at i / (N - 1), interpolated
// in OKLab so the steps look even, each snapped to a crisp pixel colour (whole 0-255 channels, one flat colour a section: a coarser
// grid, #rgb's, made neighbouring sections the same gold with a dozen of them). As many sections as colours or fewer: the first N colours (the preset's own named colours, the front section
// always its first; a lone section the first). Pure: no three.js, so the station's tiles and the tests use it too.
import RAW from "../../config/trail-colours.json";

export interface TrailPreset { id: string; name: string; emoji: string; colours: string[] }
export const TRAIL_PRESETS: readonly TrailPreset[] = (RAW as { presets: TrailPreset[] }).presets;
export const TRAIL_PRESET_DEFAULT: string = (RAW as { default: string }).default;
/** A preset by id (an unknown one: the default). */
export const trailPreset = (id: string | null | undefined): TrailPreset => TRAIL_PRESETS.find(p => p.id === id) ?? TRAIL_PRESETS.find(p => p.id === TRAIL_PRESET_DEFAULT) ?? TRAIL_PRESETS[0];

/** "#rrggbb" as 0-255 channels. */
export const hexRgb = (h: string): [number, number, number] => { const n = parseInt(h.replace("#", ""), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };

const lin = (c: number) => { const v = c / 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
const gam = (v: number) => 255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(Math.max(0, v), 1 / 2.4) - 0.055);
/** sRGB (0-255) to OKLab. */
export function oklab([r8, g8, b8]: readonly number[]): [number, number, number] {
  const r = lin(r8), g = lin(g8), b = lin(b8);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
/** OKLab to sRGB (0-255, unclamped). */
export function fromOklab([L, A, B]: readonly number[]): [number, number, number] {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3, m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3, s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [gam(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s), gam(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s), gam(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)];
}
/** A channel snapped to a crisp pixel colour's: whole, 0 to 255. */
export const snapChannel = (v: number): number => Math.max(0, Math.min(255, Math.round(v)));

/** The gradient through `colours` (0-255 each) at t (0 the first, 1 the last), in OKLab, snapped (a stop itself exactly). */
export function gradientAt(colours: readonly (readonly number[])[], t: number): [number, number, number] {
  const k = colours.length;
  if (k === 1) return [colours[0][0], colours[0][1], colours[0][2]];
  const f = Math.max(0, Math.min(1, t)) * (k - 1), i = Math.min(k - 2, Math.floor(f)), u = f - i;
  if (u < 1e-9) return [colours[i][0], colours[i][1], colours[i][2]];
  if (u > 1 - 1e-9) return [colours[i + 1][0], colours[i + 1][1], colours[i + 1][2]];
  const a = oklab(colours[i]), b = oklab(colours[i + 1]);
  const c = fromOklab([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u]);
  return [snapChannel(c[0]), snapChannel(c[1]), snapChannel(c[2])];
}

/** The N sections' colours (0-255), front to back: the first N colours when the preset has enough, else spread over its gradient. */
export function sectionColours(colours: readonly string[], n: number): [number, number, number][] {
  const stops = colours.map(hexRgb), N = Math.max(0, Math.floor(n));
  if (!stops.length) return Array.from({ length: N }, () => [255, 255, 255]);
  if (N <= stops.length) return stops.slice(0, N);
  return Array.from({ length: N }, (_, i) => gradientAt(stops, i / (N - 1)));
}
