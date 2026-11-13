// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them.
import { pace } from "./gaits.js";
import { marked } from "./markings.js";
import { plan } from "./plan.js";
import { quad } from "./quad.js";
import { tail } from "./tail.js";

// The cats (batch B of docs/plans/creature-mesh-rollout.md: cat, lynx, cheetah, lion, tiger, jaguar, snowleopard), as kit/weasel.js
// is the weasels': a short blunt muzzle on a broad round skull, round ears set wide, a level back, a long slender tail carried low
// with its end turned up.

/** A cat's build: kit/quad.js with a cat's head, legs and back to start from; o.body, o.hind, o.fore, o.head and o.ear change
 *  them. Returns quad's { body, skull, legs, root, R, P } and earTip(s): where that side's ear ends (a lynx's tuft stands on it). */
export function feline({ C, body = {}, hind = {}, fore, head = {}, ear = {} }) {
  const H = { size: 1.05, muzzle: 0.5, muzzleWide: 1.4, muzzleDeep: 1.25, wide: 1.1, dome: 1.02, cheek: 0, eye: 1.25, nose: 0.9, ...head }, E = { shape: "round", tall: 0.8, wide: 0.95, at: [0.014, -0.008, -0.012], back: C.ear ?? C.coat, inner: C.inner ?? "#d9b7a3", ...ear };
  const q = quad({ C, hind: { len: 0.95, thick: 1.2, ...hind }, fore: { len: 0.95, thick: 1.25, ...(fore ?? hind) }, body: { len: 1, girth: 1, deep: 1, tuck: 0.85, neck: [0.12, 0.13], neckThick: 1.15, white: 0.35, ...body }, head: { ...H, ear: E } });
  const [ex = 0, ey = 0, ez = 0] = E.at, t = E.tall;
  return { ...q, earTip: s => q.P((0.048 * H.wide + ex + (0.026 + (E.splay ?? 0) * 0.1) * t) * s, 0.07 * H.dome + ey + 0.16 * t, 0.025 + ez - 0.015) };
}

/** A cat's tail from quad's `root`: long and slender, carried low, its end turned up. */
export const catTail = (root, C, o = {}) => tail("tail", "pelvis", root, { len: 0.62, r: 0.04, pitch: -0.85, curl: 1.5, blunt: 0.45, tip: 0.14, bones: 5, sides: 6, colours: { coat: C.coat, under: C.belly, tip: C.tip ?? C.coat }, ...o });

/** A cat's plan from feline's build `q`, its other parts and its gait; `pattern` its coat's markings (kit/markings.js), on
 *  `n` times the skin's rings. */
export const cat = (name, q, parts, gait, extra = {}, pattern = null, n = 3) => { const p = plan(name, q.body, q.skull, [...q.legs, ...parts], gait, extra); return pattern ? marked(p, pattern, n) : p; };

// How cats go (kit/gaits.js has the paces; o as its gaits take: { tails, lively, walk, run, body }). Asleep, a cat of any age curls
// up on its side, nose to tail (`sleep`: art/mesh/gear.js `napping`).
const gait = (slow, fast, own = {}) => (o = {}) => { const { walk: w = {}, run: r = {}, ...rest } = o, run = pace(fast, { ...own.run, ...r, body: { ...own.run?.body, ...r.body } }); return { type: run.type, seconds: run.seconds, legs: run.legs, sleep: "curl", ...rest, paces: { walk: pace(slow, { ...own.walk, ...w, body: { ...own.walk?.body, ...w.body } }), run } }; };
const PROWL = { body: { bob: 0.025, roll: 0.05, sway: 0.04, head: 0.9, wag: 0.06 } };
/** The heavy cats (lion, tiger, jaguar): a prowling walk, the shoulders rolling and the head held still, and a trot at speed. */
export const stalks = gait("amble", "trot", { walk: PROWL, run: { body: { bob: 0.05, head: 0.9 } } });
/** The light cats (cat, lynx, snowleopard): the same walk, and a bounding run, lower and longer than a stoat's. */
export const springs = gait("amble", "bound", { walk: PROWL, run: { leap: 0.3, body: { pitch: 0.11, flex: 0.2, head: 0.9 } } });
/** The cheetah: its run a gallop, the longest stride of any, its back folding and opening. */
export const sprints = gait("amble", "bound", { walk: PROWL, run: { seconds: 0.42, reach: 1.25, leap: 0.3, body: { pitch: 0.09, flex: 0.32, head: 0.95 } } });
