// Witch creatures: the bestiary (30 species, one per area type), their colours, and the
// call that draws one. Each is built in 3D (creatures3d.js, model3d.js) and seen in
// three-quarter view from above; it faces right and the game mirrors it.
import { M, hsv2rgb, rng } from "./core.js";
import { withGear, height3d, quad3d, owl3d, hedgehog3d, toad3d, raven3d, bat3d, mole3d, beetle3d, snail3d, woodlouse3d, snake3d, moth3d, glowworm3d, spider3d } from "./creatures3d.js";
// Every species is built in 3D (true three-quarter view, Ed 2026-10-03): four-legged ones by
// quad3d, the others by a builder per body plan.
const MODELLED = new Map(Object.entries({ owl: owl3d, hedgehog: hedgehog3d, toad: toad3d, raven: raven3d, bat: bat3d, mole: mole3d, beetle: beetle3d, snail: snail3d, woodlouse: woodlouse3d, snake: snake3d, moth: moth3d, glowworm: glowworm3d, spider: spider3d })); // body plan -> 3D builder; four-legged species all use quad3d

// ================= the bestiary: 20 forest animals =================
// plan: body plan. hue/sat/val: base colour. legend: what the legendary form grows.
// Species with `q` are drawn with the quadruped builder below; q holds its proportions
// in units of its height at the shoulder (see quad()). The rest of the old fields serve
// species still drawn the old way.
export const SPECIES = [
  { id: "wolf", name: "Wolf", plan: "quad", hue: .08, sat: .24, val: .56, legend: ["wings", "mane"],
    q: { len: .64, chest: .42, tuck: .6, neck: .32, neckAng: .7, neckW: .42, hr: .26, snout: .82, snoutD: .7, ear: "point", earS: .82, tail: "brush", paw: "paw", legW: 1.25, saddle: true, belly: true },
    tail: "up" },
  { id: "fox", name: "Fox", plan: "quad", q: { hgt: .8, len: .62, chest: .4, tuck: .5, neck: .3, neckAng: .7, neckW: .32, hr: .24, snout: 1.05, snoutD: .5, snoutTaper: .6, ear: "point", earS: 1.35, tail: "bushy", paw: "paw", legW: .9, belly: true, socks: .3 }, hue: .06, sat: .8, val: .9, belly: "white", legend: ["tails"] },
  { id: "badger", name: "Badger", plan: "quad", q: { hgt: .62, len: .78, chest: .2, tuck: .22, neck: .18, neckAng: .1, neckW: .5, hr: .26, snout: 1.0, snoutD: .55, snoutTaper: .55, ear: "round", earS: .7, tail: "stub", paw: "paw", legW: 1.35, legMat: M.BODY3, face: "badger", shaggy: true }, hue: .65, sat: .08, val: .45, legend: ["crystals"] },
  { id: "boar", name: "Boar", plan: "quad", hue: .07, sat: .62, val: .5, legend: ["tusksBig"],
    q: { len: .72, chest: .34, tuck: .42, neck: .2, neckAng: -.15, neckW: .55, hr: .27, snout: 1.25, snoutD: .62, snoutTaper: .55, ear: "small", earS: .8, tail: "thin", paw: "hoof", legW: 1.15, ridge: true, tusks: true, back: "hump", disc: true },
    ridge: true },
  { id: "stag", name: "Stag", plan: "quad", q: { hgt: 1.3, len: .6, chest: .6, tuck: .7, neck: .55, neckAng: .95, neckW: .32, hr: .2, snout: 1.15, snoutD: .6, snoutTaper: .65, ear: "point", earS: 1.1, tail: "deer", paw: "hoof", legW: .75, antlers: "branch", rump: true, spots: "young", belly: true }, hue: .08, sat: .5, val: .7, legend: ["antlersGlow"] },
  { id: "hare", name: "Hare", plan: "quad", q: { hgt: .72, len: .5, chest: .4, tuck: .45, neck: .2, neckAng: .9, neckW: .35, hr: .27, snout: .65, snoutD: .7, ear: "long", earS: 2.4, tail: "puff", paw: "paw", legW: .85, haunch: 1.35, hindFoot: 1.6, back: "arch", belly: true, whiskers: true }, hue: .08, sat: .4, val: .72, legend: ["jackalope"] },
  { id: "owl", name: "Owl", plan: "owl", hue: .08, sat: .5, val: .55, legend: ["eyesRing", "wings"] },
  { id: "bear", name: "Bear", plan: "quad", q: { hgt: 1.15, len: .72, chest: .38, tuck: .4, neck: .25, neckAng: .3, neckW: .55, hr: .28, snout: .7, snoutD: .62, snoutTaper: .7, ear: "round", earS: .8, tail: "stub", paw: "paw", legW: 1.55, back: "hump", muzzle: true, shaggy: true }, hue: .07, sat: .55, val: .42, legend: ["moss"] },
  { id: "hedgehog", name: "Hedgehog", plan: "hedgehog", hue: .08, sat: .4, val: .5, legend: ["crystals"] },
  { id: "squirrel", name: "Squirrel", plan: "quad", q: { hgt: .55, len: .45, chest: .35, tuck: .4, neck: .2, neckAng: .9, neckW: .35, hr: .3, snout: .55, snoutD: .65, ear: "tuft", earS: 1.1, tail: "squirrel", paw: "paw", legW: .8, haunch: 1.3, back: "arch", belly: true, whiskers: true }, hue: .03, sat: .75, val: .75, belly: "white", legend: ["starTail"] },
  { id: "toad", name: "Toad", plan: "toad", hue: .2, sat: .5, val: .55, legend: ["crown"] },
  { id: "otter", name: "Otter", plan: "quad", q: { hgt: .55, len: 1.0, chest: .25, tuck: .25, neck: .3, neckAng: .35, neckW: .5, hr: .27, snout: .6, snoutD: .7, ear: "round", earS: .5, tail: "otter", paw: "paw", legW: 1.1, muzzle: true, belly: true, whiskers: true }, hue: .07, sat: .55, val: .45, belly: "white", legend: ["ribbons"] },
  { id: "lynx", name: "Lynx", plan: "quad", q: { hgt: .9, len: .55, chest: .5, tuck: .55, neck: .25, neckAng: .8, neckW: .4, hr: .27, snout: .5, snoutD: .75, snoutTaper: .8, ear: "tuft", earS: 1.0, tail: "bob", paw: "paw", legW: 1.2, cheeks: true, spots: true, belly: true, whiskers: true }, hue: .09, sat: .45, val: .75, legend: ["mane"] },
  { id: "elk", name: "Elk", plan: "quad", q: { hgt: 1.4, len: .68, chest: .6, tuck: .66, neck: .45, neckAng: .75, neckW: .42, hr: .24, snout: 1.6, snoutD: .9, snoutTaper: .85, ear: "point", earS: .9, tail: "stub", paw: "hoof", legW: .9, back: "hump", antlers: "palm", shaggy: true }, hue: .07, sat: .55, val: .38, legend: ["antlersGlow", "moss"] },
  { id: "raven", name: "Raven", plan: "raven", hue: .68, sat: .35, val: .3, legend: ["wings", "eyesRing"] },
  { id: "bat", name: "Bat", plan: "bat", hue: .78, sat: .25, val: .45, legend: ["wingsBig"] },
  { id: "mole", name: "Mole", plan: "mole", hue: .7, sat: .15, val: .32, legend: ["crown"] },
  { id: "beaver", name: "Beaver", plan: "quad", q: { hgt: .6, len: .65, chest: .2, tuck: .22, neck: .2, neckAng: .4, neckW: .55, hr: .28, snout: .6, snoutD: .75, ear: "round", earS: .45, tail: "flat", paw: "paw", legW: 1.2, back: "arch", teeth: true, whiskers: true }, hue: .06, sat: .6, val: .45, legend: ["moss"] },
  { id: "stoat", name: "Stoat", plan: "quad", q: { hgt: .5, len: 1.0, chest: .3, tuck: .33, neck: .35, neckAng: .6, neckW: .32, hr: .25, snout: .6, snoutD: .6, ear: "round", earS: .6, tail: "stoat", paw: "paw", legW: .8, belly: true, back: "arch", whiskers: true }, hue: .1, sat: .25, val: .92, legend: ["ribbons", "mane"] },
  { id: "snail", name: "Snail", plan: "snail", hue: .08, sat: .45, val: .55, legend: ["glowShell"] },
  { id: "ram", name: "Ram", plan: "quad", q: { hgt: .95, len: .6, chest: .48, tuck: .52, neck: .22, neckAng: .45, neckW: .48, hr: .25, snout: .85, snoutD: .75, snoutTaper: .8, ear: "small", earS: .7, tail: "stub", paw: "hoof", legW: .9, wool: true, horns: "curl", face: "dark" }, hue: .1, sat: .12, val: .88, legend: ["hornsGlow"] },
  { id: "woodlouse", name: "Woodlouse", plan: "woodlouse", hue: .65, sat: .12, val: .45, legend: ["crystals"] },
  { id: "snake", name: "Snake", plan: "snake", hue: .25, sat: .45, val: .45, legend: ["wings"] },
  { id: "moth", name: "Moth", plan: "moth", hue: .1, sat: .3, val: .7, legend: ["wingsBig"] },
  { id: "marten", name: "Pine marten", plan: "quad", q: { hgt: .55, len: .78, chest: .35, tuck: .38, neck: .3, neckAng: .55, neckW: .35, hr: .25, snout: .65, snoutD: .6, ear: "round", earS: .9, tail: "bushy", paw: "paw", legW: .85, belly: true, back: "arch" }, hue: .07, sat: .6, val: .45, legend: ["mane"] },
  { id: "salamander", name: "Salamander", plan: "quad", q: { hgt: .42, len: .9, chest: .14, tuck: .14, neck: .12, neckAng: .05, neckW: .5, hr: .27, snout: .55, snoutD: .55, ear: "none", tail: "otter", paw: "paw", legW: 1.0, spots: true, spotMat: "belly" }, hue: .1, sat: .1, val: .22, belly: "yellow", legend: ["flames"] },
  { id: "glowworm", name: "Glow-worm", plan: "glowworm", hue: .12, sat: .4, val: .35, legend: ["lantern"] },
  { id: "spider", name: "Spider", plan: "spider", hue: .07, sat: .45, val: .4, legend: ["eyesRing"] },
  { id: "dormouse", name: "Dormouse", plan: "quad", q: { hgt: .38, len: .45, chest: .35, tuck: .38, neck: .15, neckAng: .6, neckW: .4, hr: .34, snout: .45, snoutD: .7, ear: "round", earS: .85, tail: "squirrel", paw: "paw", legW: .8, back: "arch", belly: true, whiskers: true, eyeK: 1.6 }, hue: .09, sat: .6, val: .75, belly: "white", legend: ["starTail"] },
  { id: "beetle", name: "Stag beetle", plan: "beetle", hue: .78, sat: .5, val: .35, legend: ["horn", "crystals"] },
];
export const SPECIES_BY_ID = Object.fromEntries(SPECIES.map(s => [s.id, s]));
export const FEATURE_NAMES = { wings: "spirit wings", mane: "a glowing mane", tails: "many tails", crystals: "crystals", tusksBig: "great tusks", antlersGlow: "glowing antlers", jackalope: "antlers", eyesRing: "a ring of eyes", moss: "a little forest on its back", starTail: "a starry tail", crown: "a crown", ribbons: "light ribbons", wingsBig: "huge glowing wings", horn: "a glowing horn", glowShell: "a glowing shell", hornsGlow: "glowing golden horns", flames: "a crest of flame", lantern: "a great lantern" };

// Party gear's colourways (gear in critter).
export const HAT_COLOURWAYS = [[[255, 70, 170], [255, 245, 250], [255, 230, 70]], [[40, 220, 255], [255, 236, 60], [255, 80, 180]], [[150, 80, 255], [175, 255, 60], [255, 255, 255]]];
export const SHOE_STYLES = { sneakers: [[255, 70, 90], [250, 250, 245]], glitter: [[215, 215, 235], [190, 190, 210]], platform: [[160, 60, 230], [40, 30, 52]] };
export const GLASSES_STYLES = ["bar", "star", "heart"];
// A seeded mix of party gear for an invited creature (the prototype gives each its own seed):
// always the collar in its sigil colour; often a hat, sunglasses or shoes; sometimes all three.
export function partyGear(seed, collarColour = true) {
  const r = rng((seed | 0) * 7919 + 17), all = r() < .12;
  return {
    collar: collarColour,
    hat: all || r() < .45 ? Math.floor(r() * HAT_COLOURWAYS.length) : null,
    glasses: all || r() < .4 ? GLASSES_STYLES[r() < .6 ? 0 : r() < .5 ? 1 : 2] : null,
    shoes: all || r() < .4 ? Object.keys(SHOE_STYLES)[Math.floor(r() * 3)] : null,
  };
}
export function speciesColours(sp, st, gear = null) {
  const c = baseColours(sp, st);
  if (!gear) return c;
  if (gear.collar) c[M.COLLAR] = Array.isArray(gear.collar) ? gear.collar : c[M.MAGIC];
  if (gear.hat != null) { const [a, b, pom] = HAT_COLOURWAYS[gear.hat % HAT_COLOURWAYS.length]; c[M.HAT1] = a; c[M.HAT2] = b; c[M.POM] = pom; }
  if (gear.glasses) { c[M.SHADES] = [22, 18, 32]; c[M.FRAME] = gear.glasses === "heart" ? [255, 60, 110] : [255, 90, 210]; }
  if (gear.shoes) { const [shoe, sole] = SHOE_STYLES[gear.shoes] || SHOE_STYLES.sneakers; c[M.SHOE] = shoe; c[M.SOLE] = sole; }
  if (gear.woken) { c[M.WOKEN] = [255, 40, 36]; for (const k of [M.BODY, M.BODY2, M.BODY3, M.BELLY, M.ACCENT, M.EAR]) if (c[k]) c[k] = c[k].map((v, j) => Math.round(v * .72 + [30, 8, 12][j] * .1)); } // darker, a little redder
  return c;
}
function baseColours(sp, st) {
  const s = SPECIES_BY_ID[sp], v = st.cVal / .85, sat = st.cSat / .6;
  const body = hsv2rgb(s.hue, s.sat * sat * st.sat, s.val * v);
  const belly = s.belly === "yellow" ? [240, 196, 40] : s.belly === "white" || s.q?.face === "badger" ? [236, 232, 222] : hsv2rgb(s.hue + .03, s.sat * .5 * sat, Math.min(1, s.val * v * 1.3 + .08));
  const magic = hsv2rgb(st.magicHue + s.hue * .3, .6, 1), magic2 = hsv2rgb(st.magicHue + s.hue * .3, .18, 1);
  const pale = ["boar", "stag", "elk", "ram"].includes(s.id);
  return {
    [M.BODY]: body, [M.BODY2]: hsv2rgb(s.hue + .02, Math.min(1, s.sat * sat * 1.2 + .05), s.val * v * .66), [M.BODY3]: hsv2rgb(s.hue + .03, Math.min(1, s.sat * sat * 1.3 + .1), s.val * v * .4),
    [M.BELLY]: belly, [M.ACCENT]: pale ? [236, 226, 200] : hsv2rgb(s.hue + .05, s.sat * .6, Math.min(1, s.val * v * .5 + .25)),
    [M.MAGIC]: magic, [M.MAGIC2]: magic2, [M.LEAF]: hsv2rgb(.3, .55, .55), [M.LEAF2]: hsv2rgb(.25, .5, .75), [M.LEAF3]: hsv2rgb(.33, .6, .35), [M.TRUNK]: hsv2rgb(.07, .45, .32),
    [M.EYE]: [24, 18, 30], [M.PUPIL]: [70, 40, 90], [M.GLINT]: [255, 255, 245], [M.NOSE]: [38, 28, 36], [M.EAR]: hsv2rgb(s.hue + .97, Math.min(1, s.sat * .6 + .2), Math.min(1, s.val * v * .55 + .2)),
    [M.IRIS]: s.plan === "owl" ? [255, 176, 40] : hsv2rgb(.12, .7, .85), [M.SKIN]: [238, 158, 192],
  };
}

// A creature's height in art pixels at each level: 0 baby (about 30), 1 young (about 45 at the
// default style, what was the adult model), 2 adult (1.65 times young, a heavier build), 3 legend
// (about 4.5 times young, at least 2.2 times its adult). They keep their size on screen as pixels grow.
export const LEVELS = ["baby", "young", "adult", "legend"];
export const levelHeight = (level, st) => height3d(level, st);

// facing: "towards" (head turned to the viewer) or "away" (we see the rump and back of the head).
// Shapes don't depend on colours, so a creature is drawn once per shape-changing knob setting
// (a lab session changes lighting and colour knobs far more often than these).
const SHAPE_KNOBS = ["size", "growth", "pixel", "head", "eye", "legs", "long", "fur"], cache = new Map();
// gear (optional): party gear and the woken look, { collar, hat, glasses, shoes, woken }:
//   collar: a colour [r, g, b] (the creature's sigil neon) or true; hat: a colourway 0..2;
//   glasses: "bar" | "star" | "heart"; shoes: "sneakers" | "glitter" | "platform"; woken: true.
// Give the same gear to speciesColours for its colours. Shapes are cached per gear combination.
export function critter(spId, level, frame, st, facing = "towards", gear = null) {
  const S = SPECIES_BY_ID[spId] || SPECIES[0], g = gear && (gear.collar || gear.hat != null || gear.glasses || gear.shoes || gear.woken) ? gear : null;
  const key = [S.id, level, frame, facing, ...SHAPE_KNOBS.map(k => st[k]), g ? [!!g.collar, g.hat ?? "", g.glasses || "", g.shoes || "", !!g.woken].join(",") : ""].join("|");
  let sp = cache.get(key);
  if (!sp) {
    sp = withGear(g, () => S.q ? quad3d(S, level, frame, st, facing) : MODELLED.get(S.plan)(S, level, frame, st, facing));
    if (g?.woken) for (let i = 0; i < sp.m.length; i++) if (sp.m[i] === M.EYE || sp.m[i] === M.IRIS || sp.m[i] === M.PUPIL) sp.m[i] = M.WOKEN; // angry glowing eyes
    if (cache.size > 600) cache.delete(cache.keys().next().value);
    cache.set(key, sp);
  }
  return sp;
}
