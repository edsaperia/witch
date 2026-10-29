import { C, L, at } from "../../sigils/strokes.js";
// bold (stacks, runes, pointers: art/sigils.js BOLD): the fan of feathers round its head
export const BOLD_FEATHEREDSERPENT = { strokes: [L([.1, .98], [.36, .92], [.42, .76], [.3, .66], [.32, .56], [.46, .52]), C(.58, .4, .12), L(...Array.from({ length: 11 }, (_, i) => at(.58, .4, i % 2 ? .25 : .4, -200 + i * 22)))] };
