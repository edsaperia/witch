// The moon over the sea chart (render/chart/seaChart.ts; Ed, 2026-10-12: "islands casting shadows from the moon orbiting the map
// screen"; #746: "have the moon rise over the North West edge of the map as you open the map screen", "add empty sea around the
// edge of the map"): its knobs (the tuning's chart) and its way, as plain numbers.
export interface MoonKnobs { rise: number; turn: number; height: number; from: number; shadow: number; disc: boolean }
export interface ChartKnobs { moon?: Partial<MoonKnobs>; edgeBand?: number }
const MOON_DEFAULT: MoonKnobs = { rise: 6, turn: 240, height: 22, from: -45, shadow: 0.6, disc: true };
/** The moon's knobs (tuning chart.moon), filled from the defaults. */
export const moonKnobs = (t: { chart?: ChartKnobs }): MoonKnobs => ({ ...MOON_DEFAULT, ...(t.chart?.moon ?? {}) });
/** The empty sea round the islands (tuning chart.edgeBand, #746): the disc's radius past the islands' own, as a share of it. */
export const edgeBand = (t: { chart?: ChartKnobs }): number => Math.max(0, Math.min(0.6, t.chart?.edgeBand ?? 0.18));
/** The moon's way at a moment `age` seconds after the chart opened: its bearing (degrees, 0 north, clockwise), its height
 *  (degrees, from just under the horizon while it rises) and how far risen (0 to 1, eased). */
export function moonAt(age: number, m: MoonKnobs): { bearing: number; height: number; risen: number } {
  const u = Math.min(1, Math.max(0, age / Math.max(0.01, m.rise))), risen = u * u * (3 - 2 * u);
  return { bearing: m.from + (Math.max(0, age - m.rise) * 360) / Math.max(1, m.turn), height: -4 + (m.height + 4) * risen, risen };
}
