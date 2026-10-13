import { L, D, C } from "../../sigils/strokes.js";
// the griffin: an eagle's head side on, its hooked beak and feathered ear tuft, a wing raised behind it
export const SIGIL_GRIFFIN = { neon: "red", strokes: [C(.42, .42, .16), L([.56, .38], [.72, .44], [.66, .56], [.56, .5]), D(.46, .4), L([.34, .3], [.3, .16]), L([.3, .56], [.22, .9]), ...[0, 1, 2].map(i => L([.3 + i * .05, .62], [.62 + i * .08, .96 - i * .1]))] };
