import { L, D, E, pair, bow } from "../../sigils/strokes.js";
// seen from above: a round head, a plump body, four legs with splayed toes and a tail curling round
export const SIGIL_SALAMANDER = { neon: "red", strokes: [E(.5, .14, .1, .08), E(.5, .42, .1, .2), bow([.5, .62], [.76, .9], .4), ...pair(L([.42, .32], [.24, .26], [.18, .18]), L([.24, .26], [.14, .3]), L([.42, .52], [.24, .6], [.2, .7]), L([.24, .6], [.13, .6]), D(.46, .12))] };
