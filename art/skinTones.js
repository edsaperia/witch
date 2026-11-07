// The witches' skin tones (Ed, 2026-11-07: "skin tone range plus some fantasy tones"), one list for everything that picks a skin:
// the party witches (witch.js partyWitch), the witch generator (witchGenome.js), the creator's Randomise (src/ui/looks.ts) and
// the dressing table's skin grid (src/rules/wardrobe.ts skinSwatch).
//   HUMAN_SKINS: the Monk Skin Tone Scale's ten tones, palest (Monk 1) to deepest (Monk 10), exactly as published.
//     Monk, Ellis. "Monk Skin Tone Scale," 2019. https://skintone.google. Released by Google under the Creative Commons
//     Attribution 4.0 International licence (CC BY 4.0, https://creativecommons.org/licenses/by/4.0/): free to use, with credit.
//     (Hex values and licence as Google publishes them with the scale; this copy checked against Google's own
//     GoogleCloudPlatform/genmedia-creative-studio config/virtual_model_options.json, 2026-11-07.)
//   FANTASY_SKINS: a witch's own, palest to deepest, from the forest's cold side of the colour grammar (src/render/colourGrammar.ts:
//     its blues, purples and turquoise; the sleeping legend's pale lilac): frost blue, lilac, ash grey, moss green, night indigo.
//     Only the dressing table offers them: a random witch is always one of the ten human tones.
// Each a [hue, saturation, value] (0-1) as every palette is, rounded to 4 places (hsv2rgb gives the published hex back exactly).
export const MONK_HEX = ["#f6ede4", "#f3e7db", "#f7ead0", "#eadaba", "#d7bd96", "#a07e56", "#825c43", "#604134", "#3a312a", "#292420"];

/** A "#rrggbb" as [hue, saturation, value], each 0-1 to 4 places. */
export function hexToHsv(hex) {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255), mx = Math.max(r, g, b), d = mx - Math.min(r, g, b);
  let h = 0;
  if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [((h / 6) % 1 + 1) % 1, mx ? d / mx : 0, mx].map(x => +x.toFixed(4));
}

export const HUMAN_SKINS = MONK_HEX.map(hexToHsv);
export const FANTASY_SKINS = [
  [.58, .14, .95], // frost blue
  [.75, .22, .86], // lilac (the old grid's lavender column)
  [.62, .06, .72], // ash grey
  [.25, .38, .6],  // moss green
  [.69, .35, .42], // night indigo
];
