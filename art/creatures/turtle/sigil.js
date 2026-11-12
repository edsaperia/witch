import { L, C, E, pair } from "../../sigils/strokes.js";
// the turtle from above: the oval of its shell with its plates' joins, its head out in front, four splayed feet and a short tail
export const SIGIL_TURTLE = { neon: "mint", strokes: [E(.5, .56, .26, .3), E(.5, .56, .13, .16), L([.5, .26], [.5, .4]), L([.5, .72], [.5, .86]), ...pair(L([.37, .5], [.25, .44]), L([.37, .62], [.25, .7])), C(.5, .16, .07),
  ...pair(L([.3, .34], [.14, .24], [.1, .32], [.26, .4]), L([.3, .8], [.16, .9], [.22, .96], [.34, .84])), L([.5, .86], [.5, .95])] };
