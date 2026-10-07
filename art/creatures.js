// Witch creatures: the bestiary (30 species, one per area type), their colours, and the
// call that draws one. Each is built in 3D (creatures3d.js, model3d.js) and seen in
// three-quarter view from above; it faces right and the game mirrors it.
import { M, hsv2rgb, rng } from "./core.js";
import { GENOMES, speciesOf } from "./genome/index.js";
import { textureSprite } from "./genome/texture.js";
import { napForm } from "./naps.js";
export const textureSeed = id => [...id].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) | 0, 7) & 0xffff;
import { withForm, withGear, withTexture, height3d, quad3d, owl3d, hedgehog3d, toad3d, raven3d, heron3d, HERON_GAIT, bat3d, mole3d, beetle3d, snail3d, woodlouse3d, snake3d, moth3d, glowworm3d, spider3d } from "./creatures3d.js";
// Every species is built in 3D (true three-quarter view, Ed 2026-10-03): four-legged ones by
// quad3d, the others by a builder per body plan.
const MODELLED = new Map(Object.entries({ owl: owl3d, hedgehog: hedgehog3d, toad: toad3d, raven: raven3d, heron: heron3d, bat: bat3d, mole: mole3d, beetle: beetle3d, snail: snail3d, woodlouse: woodlouse3d, snake: snake3d, moth: moth3d, glowworm: glowworm3d, spider: spider3d })); // body plan -> 3D builder; four-legged species all use quad3d

// Builds one creature's sprite (uncached): its body plan's builder.
export const buildCreature = (S, level, frame, st, facing = "towards") => S.q ? quad3d(S, level, frame, st, facing) : MODELLED.get(S.plan)(S, level, frame, st, facing);

// ================= the bestiary: 30 species, each a genome record (art/genome/species.js) =================
// The records hold each species' template, palette, proportions and parts as data (#79 stage 1);
// speciesOf turns one into the object the builders draw from (plan, hue/sat/val, belly, legend,
// and for the four-legged q, their proportions, and sizes, their template's size curves).
export const SPECIES = GENOMES.map(speciesOf);
export const SPECIES_BY_ID = Object.fromEntries(SPECIES.map(s => [s.id, s]));
export const FEATURE_NAMES = { wings: "spirit wings", mane: "a glowing mane", tails: "many tails", crystals: "crystals", tusksBig: "great tusks", antlersGlow: "glowing antlers", jackalope: "antlers", eyesRing: "a ring of eyes", moss: "a little forest on its back", starTail: "a starry tail", crown: "a crown", ribbons: "light ribbons", wingsBig: "huge glowing wings", horn: "a glowing horn", glowShell: "a glowing shell", hornsGlow: "glowing golden horns", flames: "a crest of flame", lantern: "a great lantern" };

// Party gear's colourways (gear in critter).
export const HAT_COLOURWAYS = [[[255, 70, 170], [255, 245, 250], [255, 230, 70]], [[40, 220, 255], [255, 236, 60], [255, 80, 180]], [[150, 80, 255], [175, 255, 60], [255, 255, 255]]];
// shoe, sole: trainers, glitter, platforms, heels, go-go boots and light-up trainers (their soles glow in the animal's neon)
export const SHOE_STYLES = { sneakers: [[255, 70, 90], [250, 250, 245]], glitter: [[215, 215, 235], [190, 190, 210]], platform: [[160, 60, 230], [40, 30, 52]], heels: [[255, 40, 150], [34, 22, 44]], boots: [[70, 210, 255], [250, 250, 245]], lightup: [[245, 245, 250], [250, 250, 245]] };
export const GLASSES_STYLES = ["bar", "star", "heart"];
// A seeded mix of party gear for an invited creature (the prototype gives each its own seed):
// always the collar in its sigil colour; often a hat, sunglasses or shoes; sometimes all three.
export function partyGear(seed, collarColour = true) {
  const r = rng((seed | 0) * 7919 + 17), all = r() < .12;
  return {
    collar: collarColour,
    hat: all || r() < .45 ? Math.floor(r() * HAT_COLOURWAYS.length) : null,
    glasses: all || r() < .4 ? GLASSES_STYLES[r() < .6 ? 0 : r() < .5 ? 1 : 2] : null,
    shoes: all || r() < .4 ? Object.keys(SHOE_STYLES)[Math.floor(r() * 6)] : null,
  };
}
// sp: a species id, or a species object (a palette variant's: art/genome/palette.js).
export function speciesColours(sp, st, gear = null) {
  const c = baseColours(typeof sp === "string" ? SPECIES_BY_ID[sp] : sp, st);
  if (!gear) return c;
  if (gear.collar) c[M.COLLAR] = Array.isArray(gear.collar) ? gear.collar : c[M.MAGIC];
  if (gear.hat != null) { const [a, b, pom] = HAT_COLOURWAYS[gear.hat % HAT_COLOURWAYS.length]; c[M.HAT1] = a; c[M.HAT2] = b; c[M.POM] = pom; }
  if (gear.glasses) { c[M.SHADES] = [22, 18, 32]; c[M.FRAME] = gear.glasses === "heart" ? [255, 60, 110] : [255, 90, 210]; }
  if (gear.shoes) { const [shoe, sole] = SHOE_STYLES[gear.shoes] || SHOE_STYLES.sneakers; c[M.SHOE] = shoe; c[M.SOLE] = sole; if (gear.shoes === "lightup" && !gear.collar) c[M.COLLAR] = c[M.MAGIC]; } // (light-up soles glow in its neon, its collar's or its magic's)
  if (gear.woken) { c[M.WOKEN] = [255, 40, 36]; for (const k of [M.BODY, M.BODYL, M.BODY2, M.BODY3, M.BELLY, M.ACCENT, M.EAR]) if (c[k]) c[k] = c[k].map((v, j) => Math.round(v * .72 + [30, 8, 12][j] * .1)); } // darker, a little redder
  return c;
}
function baseColours(s, st) {
  const v = st.cVal / .85, sat = st.cSat / .6;
  const body = hsv2rgb(s.hue, s.sat * sat * st.sat, s.val * v), hs = st.hueShift || 0; // hs: hue-shifted ramps (lights warmer, shadows redder; the stylisation ladder)
  const belly = s.belly === "yellow" ? [240, 196, 40] : s.belly === "white" || s.q?.face === "badger" ? [236, 232, 222] : hsv2rgb(s.hue + .03, s.sat * .5 * sat, Math.min(1, s.val * v * 1.3 + .08));
  const magic = hsv2rgb(st.magicHue + s.hue * .3, .6, 1), magic2 = hsv2rgb(st.magicHue + s.hue * .3, .18, 1);
  const pale = ["boar", "stag", "elk", "ram"].includes(s.id);
  return {
    [M.BODY]: body, [M.BODY2]: hsv2rgb(s.hue + .02 - hs * .04, Math.min(1, s.sat * sat * 1.2 + .05 + hs * .1), s.val * v * .66), [M.BODY3]: hsv2rgb(s.hue + .03 - hs * .07, Math.min(1, s.sat * sat * 1.3 + .1 + hs * .15), s.val * v * .4),
    [M.BODYL]: hsv2rgb(s.hue - .01 + hs * .04, s.sat * sat * st.sat * (.85 - hs * .25), Math.min(1, s.val * v * 1.22 + .05 + hs * .08)), // the coat's lifted top tone (genome/texture.js)
    [M.BELLY]: belly, [M.ACCENT]: pale ? [236, 226, 200] : hsv2rgb(s.hue + .05, s.sat * .6, Math.min(1, s.val * v * .5 + .25)),
    [M.MAGIC]: magic, [M.MAGIC2]: magic2, [M.LEAF]: hsv2rgb(.3, .55, .55), [M.LEAF2]: hsv2rgb(.25, .5, .75), [M.LEAF3]: hsv2rgb(.33, .6, .35), [M.TRUNK]: hsv2rgb(.07, .45, .32),
    [M.BROW]: body[0] * .3 + body[1] * .55 + body[2] * .15 < 95 ? [226, 218, 204] : [30, 20, 28], // its brows: ink on a light coat, pale on a dark one
    [M.EYE]: [24, 18, 30], [M.PUPIL]: [70, 40, 90], [M.GLINT]: [255, 255, 245], [M.NOSE]: [38, 28, 36], [M.EAR]: hsv2rgb(s.hue + .97, Math.min(1, s.sat * .6 + .2), Math.min(1, s.val * v * .55 + .2)),
    [M.IRIS]: s.plan === "owl" ? [255, 176, 40] : hsv2rgb(.12, .7, .85), [M.SKIN]: [238, 158, 192],
    // the evolution kit's area flourishes (creatures3d.js evolve3d): standing stones, their moonlit runes, moss and heather
    [M.GLOW]: [255, 178, 70], [M.WEB]: [236, 234, 226], [M.STONE]: [150, 148, 142], [M.STONED]: [84, 82, 84], [M.RUNE]: [170, 212, 255], [M.MOSS]: [98, 130, 60], [M.FLOWER]: s.flower || [176, 92, 168], [M.WOOD]: [178, 122, 58], // (WOOD: bronze, a ram legend's horns)
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
const SHAPE_KNOBS = ["size", "growth", "pixel", "head", "eye", "legs", "long", "fur", "texture"], cache = new Map();
// gear (optional): party gear, the woken look and the expression, { collar, hat, glasses, shoes, woken, face }:
//   collar: a colour [r, g, b] (the creature's sigil neon) or true; hat: a colourway 0..2;
//   glasses: "bar" | "star" | "heart"; shoes: "sneakers" | "glitter" | "platform"; woken: true;
//   face: "neutral" | "angry" | "happy" | "dazed" (genome/expressions.js, drawn as part of the face).
// Give the same gear to speciesColours for its colours. Shapes are cached per gear combination.
/** A species' walk as baked (render/artBuild.ts, render/view/creatures.ts): frames in its cycle (2 unless it has its own), and
 *  step, how far (a share of its sprite's width) it moves between frames so a planted foot stays put on the ground. */
const GAITS = { heron: { frames: HERON_GAIT.frames, step: 0.08 } }; // (the heron's planted foot slides about 8% of its width a frame)
export function walkGait(id) { return GAITS[id] ?? { frames: 2, step: 0.3 }; }

export function critter(spId, level, frame, st, facing = "towards", gear = null) {
  if (facing === "away" && gear?.face) gear = { ...gear, face: null }; // (its face can't be seen from behind)
  const S = (typeof spId === "object" ? spId : SPECIES_BY_ID[spId]) || SPECIES[0], /* (a species object: one not in the bestiary yet, art/preview.mjs genome) */ g = gear && (gear.collar || gear.hat != null || gear.glasses || gear.shoes || gear.woken || gear.nap || (gear.face && gear.face !== "neutral")) ? { ...gear, faceStyle: S.face } : null;
  const key = [S.id, level, frame, facing, ...SHAPE_KNOBS.map(k => st[k]), g ? [!!g.collar, g.hat ?? "", g.glasses || "", g.shoes || "", !!g.woken, g.face && g.face !== "neutral" ? g.face : "", g.nap ? "nap" : ""].join(",") : ""].join("|");
  let sp = cache.get(key);
  if (!sp) {
    // asleep (gear.nap: art/naps.js): lying down, eyes shut, frame its breath; its walk's first frame laid down
    const build = () => g?.nap ? withForm(napForm(S, { frame }), () => buildCreature(S, level, 0, st, facing)) : buildCreature(S, level, frame, st, facing);
    sp = withTexture({ S, level, st }, () => withGear(g?.nap ? { ...g, face: "asleep" } : g, build));
    textureSprite(sp, S, level, st, textureSeed(S.id)); // its fur, feathers or scales (genome/texture.js)
    if (g?.woken) for (let i = 0; i < sp.m.length; i++) if (sp.m[i] === M.EYE || sp.m[i] === M.IRIS || sp.m[i] === M.PUPIL) sp.m[i] = M.WOKEN; // angry glowing eyes
    if (cache.size > 600) cache.delete(cache.keys().next().value);
    cache.set(key, sp);
  }
  return sp;
}
