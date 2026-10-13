import { L, D, E, bow } from "../../sigils/strokes.js";
// a front-on face with tufted ears and round cheeks, its great bushy tail curling up behind
export const SIGIL_SQUIRREL = { neon: "mint", strokes: [E(.4, .6, .2, .22), ...[[.27, .43], [.53, .43]].map(([x, y]) => L([x - .04, y + .02], [x, y - .16], [x + .05, y + .01])), D(.33, .58), D(.47, .58), D(.4, .7), bow([.58, .76], [.78, .1], -.38), bow([.78, .1], [.6, .3], -.7)] };
