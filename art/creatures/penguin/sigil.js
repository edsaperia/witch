import { L, D, C, E, pair } from "../../sigils/strokes.js";
// the meerkat sat up as a sentinel, front-on: a small round head, dark rings round its eyes, a tall body, forepaws tucked to
// its chest, its tail curling out at its foot
// the penguin front-on: a round head, its beak pointing down, a tall body round a white shirt-front, flippers held out,
// its two flat feet
export const SIGIL_PENGUIN = { neon: "blue", strokes: [C(.5, .17, .1), ...pair(D(.46, .15)), L([.47, .21], [.5, .28], [.53, .21]), E(.5, .56, .17, .27), E(.5, .62, .09, .18), ...pair(L([.34, .42], [.22, .64])), ...pair(L([.45, .84], [.38, .92]))] };
