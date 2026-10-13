import { L, A, D, C, at } from "../../sigils/strokes.js";
// a long slender body curled round in a ring, its dark tail tip (a dot) by its nose
export const SIGIL_STOAT = { neon: "pink", strokes: [A(.5, .54, .33, -40, 250), C(.68, .26, .1), ...[[.62, .18], [.72, .16]].map(([x, y]) => L([x, y + .02], [x - .02, y - .07], [x + .03, y - .01])), D(.71, .27), D(...at(.5, .54, .33, 250))] };
