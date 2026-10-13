import { L, D, C, pair, rays } from "../../sigils/strokes.js";
// the lion: a great round mane of rays round a broad face, a wide nose and muzzle
export const SIGIL_LION = { neon: "lemon", strokes: [C(.5, .5, .36), ...rays(.5, .5, .36, .44, [-90, -60, -30, 0, 30, 60, 90, 120, 150, 180, 210, 240]), ...pair(D(.41, .45)), L([.44, .58], [.5, .63], [.56, .58]), L([.5, .63], [.5, .7])] };
