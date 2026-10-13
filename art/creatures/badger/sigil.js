import { A, D, E, pair, bow } from "../../sigils/strokes.js";
// the striped face: a round head, two stripes running from the snout over the eyes, little round ears
export const SIGIL_BADGER = { neon: "pink", strokes: [E(.5, .54, .34, .38), ...pair(bow([.45, .88], [.38, .17], .1), A(.2, .26, .07, 110, 330)), ...pair(D(.32, .52)), D(.5, .82)] };
