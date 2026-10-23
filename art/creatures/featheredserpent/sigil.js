import { L, D } from "../../sigils/strokes.js";
// the feathered serpent: its body rising in an S to a head in profile, a fan of feathers round its neck
export const SIGIL_FEATHEREDSERPENT = { neon: "acid", strokes: [L([.22, .82], [.5, .8], [.6, .7], [.46, .6], [.44, .5], [.56, .4]), L([.56, .4], [.7, .36], [.78, .42], [.64, .47], [.56, .45]), D(.65, .4), ...[0, 1, 2, 3, 4].map(i => L([.48, .47], [.48 - .18 * Math.cos(.5 + i * .55), .47 - .2 * Math.sin(.5 + i * .55)])), L([.22, .82], [.16, .74]), L([.22, .82], [.14, .84])] };
