// The colour grammar (Ed, 2026-11-03: "the forest is cold, the party is warm"; and on the warnings, "red telegraphs are right; red
// does mean warning"): what marks a creature as hers or the party's is warm (the tuning's leash.ranks.colours: a baby's pink, a
// youth's crimson, an adult's orange, a legend's gold), what marks it wild is cold (leash.ranks.enemy: a youth's purple, an adult's
// blue, a legend's turquoise); the berries a deep berry pink (berries.colour); the ley line ahead of its spark "a cold coloured
// rainbow, maybe just blue and purple and turquoise" (coldRainbow; render/leash/rainbow.ts, render/leylines.ts). The warnings keep
// their pure red (render/leash/attackLook.ts RED, render DANGER, config danger.warn #e62828): a youth's crimson sits apart from it,
// toward rose and darker. The elements' own colours (fire, frost...) are theirs, unchanged.
// colourGrammar (the pause page's "Colours", decisions fragment colour-grammar): "new" this, "old" the look before it exactly (OLD_*).
import type { Tuning } from "../rules/tuning";

/** Whether the old colours are back (colourGrammar "old"; anything else, the new grammar). */
export const oldColours = (t: Pick<Tuning, "colourGrammar">): boolean => t.colourGrammar === "old";

/** The rank colours before the grammar (0-255, baby to legend): a friend's purple then three blues, an enemy's purple then three
 *  reds (Ed, 2026-10-29: "more strictly do hostile reds vs friendly blues, no purples"). */
export const OLD_RANK_COLOURS = {
  colours: [[180, 100, 255], [125, 145, 195], [55, 115, 220], [0, 135, 255]],
  enemy: [[180, 100, 255], [190, 105, 100], [225, 45, 40], [255, 55, 15]],
};
/** The berries' colour before the grammar: a shiny dark cherry red. */
export const OLD_BERRY = "#9e1024";

/** The berries' colour (a hex string): the tuning's berry pink, or the old cherry red. */
export const berryColour = (t: Pick<Tuning, "colourGrammar" | "berries">): string => (oldColours(t) ? OLD_BERRY : t.berries.colour);

/** The ley line's cold palette ahead of its spark, its turn of the wheel through these in order (0-255): the wild ranks' blue,
 *  purple and turquoise (an adult's, a youth's, a legend's), the forest's own colours. */
export const COLD_LINE: readonly (readonly [number, number, number])[] = [[45, 110, 255], [150, 80, 255], [20, 230, 210]];

/** The cold rainbow, `h` turns round its wheel (0-1 rgb): blue to purple to turquoise and back to blue, eased between each, so it
 *  never leaves the cold side (as render/indicator.ts rainbow runs the whole wheel). */
export function coldRainbow(h: number): [number, number, number] {
  const n = COLD_LINE.length, f = ((((h % 1) + 1) % 1) * n), i = Math.floor(f) % n, k = f - Math.floor(f), s = k * k * (3 - 2 * k);
  const a = COLD_LINE[i], b = COLD_LINE[(i + 1) % n];
  return [(a[0] + (b[0] - a[0]) * s) / 255, (a[1] + (b[1] - a[1]) * s) / 255, (a[2] + (b[2] - a[2]) * s) / 255];
}

/** coldRainbow in GLSL (render/leylines.ts: the line's faint glow from the treetops ahead of the spark), the same three colours. */
export const COLD_GLSL = /* glsl */ `
vec3 coldRbow(float h) {
  const vec3 c0 = vec3(${COLD_LINE[0].map(v => (v / 255).toFixed(4)).join(", ")});
  const vec3 c1 = vec3(${COLD_LINE[1].map(v => (v / 255).toFixed(4)).join(", ")});
  const vec3 c2 = vec3(${COLD_LINE[2].map(v => (v / 255).toFixed(4)).join(", ")});
  float f = fract(h) * 3.0, k = fract(f), s = k * k * (3.0 - 2.0 * k);
  return f < 1.0 ? mix(c0, c1, s) : f < 2.0 ? mix(c1, c2, s) : mix(c2, c0, s);
}`;
