import { L, D, E, pair, bow } from "../../sigils/strokes.js";
// the elephant face on: a domed head between two great fan ears, its eyes, tusks curving down and out, its trunk hanging and curling
export const SIGIL_ELEPHANT = { neon: "magenta", strokes: [E(.5, .38, .15, .17), ...pair(E(.27, .42, .2, .26, 60, 300), D(.44, .38), bow([.43, .53], [.37, .66], .3)), L([.5, .55], [.5, .78], [.53, .88], [.6, .9], [.63, .85])] };
