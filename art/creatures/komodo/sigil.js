import { L, D, E, pair } from "../../sigils/strokes.js";
// the heron side on: the dagger bill, a plume behind its head, an S-neck, long legs
// the dragon scrub's Komodo dragon: a big lizard from above, its forked tongue out, a blunt wedge of a head, four splayed legs,
// a long heavy tail sweeping off to one side, a row of dots down its back
export const SIGIL_KOMODO = { neon: "orange", strokes: [L([.46, .1], [.5, .15], [.54, .1]), L([.5, .15], [.5, .18]), L([.42, .33], [.44, .21], [.5, .18], [.56, .21], [.58, .33]), E(.5, .47, .12, .155), ...pair(L([.4, .39], [.25, .34], [.21, .26]), L([.4, .56], [.25, .61], [.2, .69])), L([.5, .62], [.52, .75], [.61, .84], [.77, .85]), D(.5, .4), D(.5, .47), D(.5, .54)] };
