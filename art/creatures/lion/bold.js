import { C, D, L, at, pair } from "../../sigils/strokes.js";
// bold (stacks, runes, pointers: art/sigils.js BOLD): the great mane in rays round a calm face
export const BOLD_LION = { strokes: [L(...Array.from({ length: 21 }, (_, i) => at(.5, .5, i % 2 ? .3 : .48, i * 18 - 90))), C(.5, .52, .14), ...pair(D(.42, .46))] };
