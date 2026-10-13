import { L, E, pair } from "../../sigils/strokes.js";
// a segmented oval shell seen from above, its feelers and little legs
export const SIGIL_WOODLOUSE = { neon: "lemon", strokes: [E(.5, .55, .24, .36), ...[.36, .48, .6, .72].map(y => L([.5 - Math.sqrt(1 - ((y - .55) / .36) ** 2) * .24, y], [.5 + Math.sqrt(1 - ((y - .55) / .36) ** 2) * .24, y])), ...pair(L([.43, .2], [.24, .06]), L([.27, .44], [.14, .42]), L([.26, .58], [.12, .6]), L([.29, .72], [.16, .78]))] };
