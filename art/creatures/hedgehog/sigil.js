import { L, D, at, pair } from "../../sigils/strokes.js";
// a hood of spines round a small face, a pointed snout
export const SIGIL_HEDGEHOG = { neon: "red", strokes: [L(...Array.from({ length: 15 }, (_, i) => at(.5, .55, i % 2 ? .3 : .42, 180 + i * 180 / 14))), ...pair(L([.2, .55], [.5, .88]), D(.4, .62)), D(.5, .88)] };
