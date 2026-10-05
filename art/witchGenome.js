// The witch generator (Ed, logged on #79: "different hat sizes, broom, cloak and accessories"): a witch as genome data, like the
// creatures and the plants. A genome names her hat (shape, crown height, brim, lean), hair, top, cloak, broom (kind, handle length
// and bend, bristles' length), accessories (headphones, sunglasses, glow sticks, a scarf, a satchel, a pendant, earrings) and her
// palette (a hue, saturation and value per part, the parts in WITCH_PARTS). genomeLook turns one into the look and outfit witch.js
// draws (her parts baked, her motion animated as ever, her colours a palette over the parts' materials). WITCH_GENOME is our witch,
// and draws exactly as she always has; witchGenome(seed) is a new one, every axis varied within limits that keep her a witch: a
// pointed hat with its glowing band, a broom, a face that reads, a palette that holds together (a dark hat so the band shines,
// the hat and cloak in neighbouring hues, the jacket against them).
import { rng } from "./core.js";
import { DEFAULT_OUTFIT, DEFAULT_LOOK } from "./witch.js";

// Ours: every axis as she is.
export const WITCH_GENOME = {
  hat: { shape: "classic", height: 1, brim: 1, tilt: 0, band: 1 },
  hair: "long", top: "jacket", cloak: "none",
  broom: { kind: "classic", length: 1, bend: 0, bristles: 1 },
  accessories: { phones: true, shades: false, glowsticks: false, scarf: false, satchel: false, pendant: false, earrings: false },
  palette: null, // null: hers (DEFAULT_OUTFIT, the style's hues on top)
};
// The axes and their limits, for the generator, the lab and the check.
export const WITCH_AXES = {
  hatShape: ["classic", "crooked", "floppy", "small", "flowers"], // pointed ones only (the bucket hat with cat ears is a party look, not a witch's)
  hatHeight: [.75, 1.6], hatBrim: [.75, 1.45], hatTilt: [-.25, .35], hatBand: [1, 2.4],
  hair: ["long", "bob", "buns", "mohawk"], top: ["jacket", "sequins", "mesh", "poncho", "cape"], cloak: ["none", "short", "long", "hooded"],
  broom: ["classic", "fan", "twig", "round"], broomLength: [.85, 1.3], broomBend: [-.3, .6], bristles: [.8, 1.4],
};
const SKINS = [[.07, .25, .96], [.07, .32, .9], [.07, .42, .78], [.06, .5, .62], [.05, .55, .47], [.05, .5, .34]];
const HAIRS = [[.07, .4, .14], [.07, .6, .33], [.04, .7, .5], [.11, .45, .88], [.02, .75, .7], [.6, .04, .86], [.85, .5, .8], [.5, .5, .7]]; // black, brown, auburn, blonde, red, silver, pink, teal

// (her hat's glowing band: hers is narrow; a generated witch's broader, so it shows whatever her hat)
// A new witch from a seed: every axis picked within its limits, her palette from one base hue.
export function witchGenome(seed = 0) {
  const r = rng((seed * 2246822519 + 31) >>> 0), uni = ([a, b]) => a + (b - a) * r(), pick = a => a[Math.floor(r() * a.length)], chance = p => r() < p;
  const h0 = r(), near = k => ((h0 + (r() - .5) * k) % 1 + 1) % 1, opp = ((h0 + .45 + r() * .1) % 1 + 1) % 1, cool = r() < .5;
  const palette = {
    hat: [near(.08), uni([.4, .7]), uni([.3, .55])],   // dark, so the glowing band reads
    jacket: [opp, uni([.5, .85]), uni([.65, .95])],         // against the hat
    cloak: [near(.12), uni([.45, .75]), uni([.35, .6])],  // the hat's family, a shade off
    top: [cool ? .55 : .12, uni([.05, .3]), uni([.85, 1])], jeans: [cool ? .62 : .08, uni([.2, .5]), uni([.3, .65])], sneakers: [r(), uni([0, .6]), uni([.7, 1])],
    headphones: [r(), uni([.4, .7]), uni([.75, 1])], scarf: [(near(.3) + .5) % 1, uni([.5, .8]), uni([.7, .95])], satchel: [uni([.04, .1]), uni([.4, .65]), uni([.35, .55])],
    hair: pick(HAIRS), skin: pick(SKINS), broom: [uni([.05, .1]), uni([.4, .65]), uni([.35, .6])], bristles: [uni([.1, .14]), uni([.4, .65]), uni([.75, .95])],
  };
  return {
    hat: { shape: pick(WITCH_AXES.hatShape), height: uni(WITCH_AXES.hatHeight), brim: uni(WITCH_AXES.hatBrim), tilt: uni(WITCH_AXES.hatTilt), band: uni([1.7, 2.4]) }, // a broad band, so it always shows
    hair: pick(WITCH_AXES.hair), top: pick(WITCH_AXES.top), cloak: pick(WITCH_AXES.cloak),
    broom: { kind: pick(WITCH_AXES.broom), length: uni(WITCH_AXES.broomLength), bend: uni(WITCH_AXES.broomBend), bristles: uni(WITCH_AXES.bristles) },
    accessories: { phones: chance(.55), shades: chance(.25), glowsticks: chance(.2), scarf: chance(.35), satchel: chance(.35), pendant: chance(.3), earrings: chance(.4) },
    palette,
  };
}
// The look and outfit witch.js draws a genome with.
export function genomeLook(g = WITCH_GENOME) {
  const look = { ...DEFAULT_LOOK, hat: g.hat.shape, hatHeight: g.hat.height, hatBrim: g.hat.brim, hatTilt: g.hat.tilt, hatBand: g.hat.band ?? 1, hair: g.hair, top: g.top, cloak: g.cloak,
    broom: g.broom.kind, broomLength: g.broom.length, broomBend: g.broom.bend, bristles: g.broom.bristles, ...g.accessories };
  return { look, outfit: g.palette ? { ...DEFAULT_OUTFIT, ...g.palette } : null };
}
// What is wrong with a genome, if anything: an unknown kind, or a number outside its limits (hers always passes).
export function witchGenomeProblems(g) {
  const out = [], A = WITCH_AXES, inR = (v, [a, b]) => v >= a - 1e-9 && v <= b + 1e-9;
  if (!A.hatShape.includes(g.hat.shape)) out.push("hat " + g.hat.shape);
  for (const [k, v, lim] of [["hatHeight", g.hat.height, A.hatHeight], ["hatBrim", g.hat.brim, A.hatBrim], ["hatTilt", g.hat.tilt, A.hatTilt], ["hatBand", g.hat.band ?? 1, A.hatBand], ["broomLength", g.broom.length, A.broomLength], ["broomBend", g.broom.bend, A.broomBend], ["bristles", g.broom.bristles, A.bristles]]) if (!inR(v, lim)) out.push(`${k} ${v}`);
  if (!A.hair.includes(g.hair)) out.push("hair " + g.hair); if (!A.top.includes(g.top)) out.push("top " + g.top); if (!A.cloak.includes(g.cloak)) out.push("cloak " + g.cloak); if (!A.broom.includes(g.broom.kind)) out.push("broom " + g.broom.kind);
  if (g.palette) for (const [k, c] of Object.entries(g.palette)) if (!(Array.isArray(c) && c.length === 3 && c.every(v => v >= 0 && v <= 1))) out.push("palette " + k);
  return out;
}
