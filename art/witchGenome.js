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
  accessories: { phones: true, shades: false, glowsticks: false, scarf: false, satchel: false, pendant: false, earrings: false,
    familiar: "none", lantern: false, vial: false, book: false, patches: false, bumbag: false, wristband: false, chunky: false },
  cloakLength: 1, scarfLength: 1, bagSize: 1, backpackSize: 0,
  palette: null, // null: hers (DEFAULT_OUTFIT, the style's hues on top)
};
// The axes and their limits, for the creator, the lab and the check (Ed, 2026-10-05: "the sliders in the character creation
// screen should go further"; "the option to have no hat, and some different hats"): wide, so the extremes are fun. The hats
// past the pointed ones (none first) are drawn by witch.js; a shape it doesn't know yet draws as hers.
export const WITCH_AXES = {
  hatShape: ["none", "classic", "crooked", "floppy", "small", "flowers", "top", "cowboy", "conical", "boppers", "party", "musketeer", "wizard", "beanie", "crown", "mushroom", "traffic"],
  hatHeight: [.3, 3], hatBrim: [.3, 2.6], hatTilt: [-.9, 1], hatBand: [0, 4],
  hair: ["long", "bob", "buns", "mohawk"], top: ["jacket", "sequins", "mesh", "poncho", "cape"], cloak: ["none", "short", "long", "hooded"],
  broom: ["classic", "fan", "twig", "round"], broomLength: [.4, 2.4], broomBend: [-1.2, 1.5], bristles: [.3, 3],
  scarfLength: [0, 3], bagSize: [.4, 2.6], backpackSize: [0, 2.5],
  cloakLength: [.6, 2.4], familiar: ["none", "cat", "crow", "toad", "bat"], // (Ed, on #98: "Longer cloaks."; the familiar, an accessory with a choice: accessories.familiar)
};
// The generator's own limits (narrower: a new witch is a witch, a pointed hat with its glowing band; as before round 2, so a seed draws as it did).
export const WITCH_RANDOM = {
  hatShape: ["classic", "crooked", "floppy", "small", "flowers"],
  hatHeight: [.75, 1.6], hatBrim: [.75, 1.45], hatTilt: [-.25, .35], broomLength: [.85, 1.3], broomBend: [-.3, .6], bristles: [.8, 1.4],
};
const SKINS = [[.07, .25, .96], [.07, .32, .9], [.07, .42, .78], [.06, .5, .62], [.05, .55, .47], [.05, .5, .34]];
const HAIRS = [[.07, .4, .14], [.07, .6, .33], [.04, .7, .5], [.11, .45, .88], [.02, .75, .7], [.6, .04, .86], [.85, .5, .8], [.5, .5, .7]]; // black, brown, auburn, blonde, red, silver, pink, teal

// A familiar's colours (familiar, familiar2: its eyes' ring or beak): cats black, ginger or grey; crows blue-black; toads olive; bats brown.
const FAMILIAR_COLOURS = { cat: [[[.7, .15, .14], [.12, .5, .9]], [[.07, .65, .75], [.1, .3, .95]], [[.6, .06, .55], [.6, .1, .9]]], crow: [[[.68, .3, .14], [.1, .2, .25]]], toad: [[[.2, .45, .45], [.13, .6, .3]], [[.12, .45, .5], [.1, .5, .3]]], bat: [[[.06, .4, .25], [.05, .45, .15]]] };
// (her hat's glowing band: hers is narrow; a generated witch's broader, so it shows whatever her hat)
// A new witch from a seed: every axis picked within its limits, her palette from one base hue. party: a party witch's odds
// (more of the modern party things: glow sticks, sunglasses, wristbands).
export function witchGenome(seed = 0, { party = false } = {}) {
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
  // her hat: a witch's pointed hat two times in three, else one of the creator's (rarely none)
  const WITCHY = WITCH_RANDOM.hatShape, OTHER = WITCH_AXES.hatShape.filter(h => !WITCHY.includes(h) && h !== "none"), hs = r();
  const shape = hs < .66 ? pick(WITCHY) : hs < .97 ? pick(OTHER) : "none", hat = { shape, height: uni([.75, shape === "wizard" ? 1.2 : 1.6]), brim: uni([.85, shape === "floppy" ? 1.5 : 1.9]), tilt: uni(WITCH_RANDOM.hatTilt), band: uni([1.7, 2.4]) }; // a broad band, so it always shows; brims up to nearly twice hers (a floppy one's to 1.5, so its point still shows)
  const hair = pick(WITCH_AXES.hair), top = pick(WITCH_AXES.top), ck = r(), cloak = ck < .15 ? "none" : ck < .35 ? "short" : ck < .7 ? "long" : "hooded"; // cloaks mostly long
  const broom = { kind: pick(WITCH_AXES.broom), length: uni(WITCH_RANDOM.broomLength), bend: uni(WITCH_RANDOM.broomBend), bristles: uni(WITCH_RANDOM.bristles) };
  const k = party ? 1.6 : 1, fk = r(), familiar = fk < .5 ? "none" : WITCH_AXES.familiar[1 + Math.floor((fk - .5) / .5 * 4)];
  const accessories = { phones: chance(.55), shades: chance(.25 * k) ? (chance(.5) ? "round" : true) : false, glowsticks: chance(.2 * k), scarf: chance(.35), satchel: chance(.3), pendant: chance(.3), earrings: chance(.4),
    familiar, lantern: chance(.22), vial: chance(.3), book: chance(.2), patches: cloak !== "none" && chance(.35), bumbag: chance(.22 * k), wristband: chance(.3 * k), chunky: chance(.35) };
  const cloakLength = cloak === "none" ? 1 : cloak === "short" ? uni([1, 1.4]) : uni([1.2, 1.75]); // and long
  const scarfLength = accessories.scarf ? uni([.6, 2.2]) : 1, bagSize = uni([.8, 1.5]), backpackSize = chance(.18) ? uni([.75, 1.3]) : 0;
  if (familiar !== "none") { const [a, b] = pick(FAMILIAR_COLOURS[familiar]); palette.familiar = a; palette.familiar2 = b; }
  palette.backpack = [r(), uni([.35, .7]), uni([.4, .75])]; palette.plume = [r(), uni([0, .5]), uni([.85, 1])]; palette.gold = [uni([.1, .14]), uni([.6, .8]), uni([.85, 1])];
  return { hat, hair, top, cloak, cloakLength, scarfLength, bagSize, backpackSize, broom, accessories, palette };
}
// A genome saved before round 2 (or missing anything since): every field it lacks taken from hers, so old saves still load.
export function upgradeGenome(g) {
  const W = WITCH_GENOME, o = g && typeof g === "object" ? g : {};
  return { ...W, ...o, hat: { ...W.hat, ...o.hat }, broom: { ...W.broom, ...o.broom }, accessories: { ...W.accessories, ...o.accessories }, palette: o.palette ?? null };
}
// The look and outfit witch.js draws a genome with.
export function genomeLook(g = WITCH_GENOME) {
  const look = { ...DEFAULT_LOOK, hat: g.hat.shape, hatHeight: g.hat.height, hatBrim: g.hat.brim, hatTilt: g.hat.tilt, hatBand: g.hat.band ?? 1, hair: g.hair, top: g.top, cloak: g.cloak,
    broom: g.broom.kind, broomLength: g.broom.length, broomBend: g.broom.bend, bristles: g.broom.bristles, cloakLength: g.cloakLength ?? 1, scarfLength: g.scarfLength ?? 1, bagSize: g.bagSize ?? 1, backpackSize: g.backpackSize ?? 0, ...g.accessories };
  return { look, outfit: g.palette ? { ...DEFAULT_OUTFIT, ...g.palette } : null };
}
// What is wrong with a genome, if anything: an unknown kind, or a number outside its limits (hers always passes).
export function witchGenomeProblems(g) {
  const out = [], A = WITCH_AXES, inR = (v, [a, b]) => v >= a - 1e-9 && v <= b + 1e-9;
  if (!A.hatShape.includes(g.hat.shape)) out.push("hat " + g.hat.shape);
  for (const [k, v, lim] of [["hatHeight", g.hat.height, A.hatHeight], ["hatBrim", g.hat.brim, A.hatBrim], ["hatTilt", g.hat.tilt, A.hatTilt], ["hatBand", g.hat.band ?? 1, A.hatBand], ["broomLength", g.broom.length, A.broomLength], ["broomBend", g.broom.bend, A.broomBend], ["bristles", g.broom.bristles, A.bristles], ["cloakLength", g.cloakLength ?? 1, A.cloakLength], ["scarfLength", g.scarfLength ?? 1, A.scarfLength], ["bagSize", g.bagSize ?? 1, A.bagSize], ["backpackSize", g.backpackSize ?? 0, A.backpackSize]]) if (!inR(v, lim)) out.push(`${k} ${v}`);
  if (g.accessories && !A.familiar.includes(g.accessories.familiar ?? "none")) out.push("familiar " + g.accessories.familiar);
  if (g.accessories && ![false, true, "round"].includes(g.accessories.shades ?? false)) out.push("shades " + g.accessories.shades); // sunglasses: none, plain or round
  if (!A.hair.includes(g.hair)) out.push("hair " + g.hair); if (!A.top.includes(g.top)) out.push("top " + g.top); if (!A.cloak.includes(g.cloak)) out.push("cloak " + g.cloak); if (!A.broom.includes(g.broom.kind)) out.push("broom " + g.broom.kind);
  if (g.palette) for (const [k, c] of Object.entries(g.palette)) if (!(Array.isArray(c) && c.length === 3 && c.every(v => v >= 0 && v <= 1))) out.push("palette " + k);
  return out;
}
