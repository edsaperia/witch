import { D, L, at } from "../../sigils/strokes.js";
// bold (stacks, runes, pointers: art/sigils.js BOLD): side on: the dome of spines, its pointed snout
export const BOLD_HEDGEHOG = { strokes: [L(...Array.from({ length: 15 }, (_, i) => at(.5, .78, i % 2 ? .3 : .46, 180 + i * 180 / 14))), L([.04, .78], [.96, .78]), L([.04, .78], [.06, .88], [.2, .92]), D(.16, .7)] };
