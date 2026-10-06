// The witch (Ed, DESIGN.md): a modern young-adult witch on a broomstick, with headphones,
// sneakers, jeans and a witch's hat as the one classic touch. Built in 3D like the creatures
// (model3d.js): turned towards or away from the viewer, seen from above, three frames of a
// gentle hover bob, and a lean-forward pose for fast flight.
// Outfits: she is made of named parts, each with its own material and colour slot, so an
// unlockable outfit is a palette (and, later, a part swap), not a redraw.
import { M, hsv2rgb, hash2, rng } from "./core.js";
import { Model, render, v3 } from "./model3d.js";
import { witchGenome, genomeLook } from "./witchGenome.js";

// Her parts and the material each is drawn in. The last few are a party outfit's: its pattern and trim (sequins, a mesh,
// a poncho's stripes), the flowers on a hat, a party cup, two glow-stick neons, sunglasses' lenses and frames.
export const WITCH_PARTS = { hair: M.HAIR, hat: M.HAT, headphones: M.PHONES, top: M.TOP, jacket: M.JACKET, jeans: M.JEANS, sneakers: M.SHOES, broom: M.BROOM, bristles: M.STRAW, skin: M.SKIN,
  pattern: M.HAT2, trim: M.HAT1, flower: M.FLOWER, flower2: M.POM, cup: M.ACCENT, glow: M.COLLAR, glow2: M.GLOW, shades: M.SHADES, frame: M.FRAME,
  cloak: M.CLOTH, scarf: M.BODY, satchel: M.WOOD, // the witch generator's: a cloak, a scarf, a satchel (art/witchGenome.js)
  familiar: M.BODY2, familiar2: M.BODY3, lantern: M.STONED, book: M.BARKD, bumbag: M.EAR, band: M.IRIS, vial: M.CRYSTAL,
  plume: M.WEB, gold: M.BARKL, backpack: M.LEAF }; // the creator's: a musketeer's plume, a crown's gold, a backpack // and its accessories: a familiar, a lantern, a spellbook, a bum bag, a festival wristband, a potion vial
// The default outfit: a hue, saturation and value per part. Style knobs override the hues.
export const DEFAULT_OUTFIT = {
  hair: [.01, .7, .85], hat: [.74, .45, .45], headphones: [.92, .55, .9], top: [.13, .15, .95], jacket: [.72, .45, .7],
  jeans: [.6, .5, .7], sneakers: [.0, .0, .95], broom: [.08, .55, .55], bristles: [.12, .55, .9], skin: [.07, .3, .94],
  pattern: [.13, .1, 1], trim: [.0, .6, .8], flower: [.95, .45, .98], flower2: [.15, .6, 1], cup: [.99, .75, .85], glow: [.88, .75, 1], glow2: [.33, .8, 1], shades: [.7, .4, .14], frame: [.13, .6, .9],
  cloak: [.74, .5, .4], scarf: [.98, .6, .85], satchel: [.07, .55, .5],
  familiar: [.7, .15, .16], familiar2: [.12, .5, .9], lantern: [.08, .3, .3], book: [.98, .55, .35], bumbag: [.5, .5, .55], band: [.95, .6, .9], vial: [.55, .15, .95],
  plume: [.05, .1, .97], gold: [.12, .75, .95], backpack: [.33, .55, .5],
};
// styleHues false: the outfit's own hues, whatever the style's (a party witch's colours are her own)
export function witchColours(st, outfit = DEFAULT_OUTFIT, { styleHues = true } = {}) {
  const o = { ...DEFAULT_OUTFIT, ...outfit }, hue = styleHues ? { hair: st.hairHue, jacket: st.cloakHue, hat: st.hatHue, top: st.topHue, jeans: st.jeansHue, sneakers: st.shoeHue, headphones: st.phonesHue } : {};
  const c = {}; for (const [part, mat] of Object.entries(WITCH_PARTS)) { const [h, s, v] = o[part]; c[mat] = hsv2rgb(hue[part] ?? h, s, v); }
  c[M.EYE] = [24, 18, 30]; c[M.GLINT] = [255, 255, 245]; c[M.NOSE] = [20, 16, 24]; c[M.MAGIC] = hsv2rgb(st.glowHue ?? .13, .5, 1); c[M.MAGIC2] = hsv2rgb(st.glowHue ?? .13, .15, 1);
  c[M.BELLY] = [245, 245, 240]; // sneaker soles, headphone band highlights
  return c;
}

// ---- looks: the shapes a party outfit can change (Ed: "a variety of party outfits"; the coordinator's list) ----
//   hat   classic (hers), crooked (tall, the tip flopping over), floppy (a wide drooping brim, a short crown), small (tilted
//         to one side), flowers (hers, crowned with flowers), bucket (a bucket hat with cat ears)
//   hair  long (hers), bob, buns, mohawk
//   top   jacket (hers: an open jacket over a top), sequins (a sequinned top), mesh (a mesh top), poncho (a striped festival poncho), cape
//   phones (her headphones), shades (sunglasses), glowsticks (glow-stick bracelets)
// Every hat keeps the glowing hatband, so every look is still a witch.
export const WITCH_LOOKS = { hat: ["classic", "crooked", "floppy", "small", "flowers", "bucket", "none", "top", "cowboy", "conical", "boppers", "party", "musketeer", "wizard", "beanie", "crown", "mushroom", "traffic"], hair: ["long", "bob", "buns", "mohawk"], top: ["jacket", "sequins", "mesh", "poncho", "cape"] };
export const DEFAULT_LOOK = { hat: "classic", hair: "long", top: "jacket", phones: true, shades: false, glowsticks: false,
  // the witch generator's axes (art/witchGenome.js), each as hers by default: the hat's crown height (times hers), brim (times
  // hers), lean (radians, + back) and band (its glowing band's height, times hers); the broom's kind (classic, fan, twig, round), handle length (times hers) and bend (+ up),
  // the bristles' length (times hers); a cloak (none, short, long, hooded); a scarf, a satchel, a pendant and earrings
  hatHeight: 1, hatBrim: 1, hatTilt: 0, hatBand: 1, broom: "classic", broomLength: 1, broomBend: 0, bristles: 1, cloak: "none", scarf: false, satchel: false, pendant: false, earrings: false,
  // its accessories (Ed: "both witchy and modern"): the cloak's length (times its kind's), patches on it; a familiar on her shoulder
  // (cat, crow, toad, bat, or none), a lantern at her hip, a potion vial and a spellbook at her belt; a bum bag, a festival
  // wristband, chunky trainers, round sunglasses (shades "round")
  cloakLength: 1, patches: false, familiar: "none", lantern: false, vial: false, book: false, bumbag: false, wristband: false, chunky: false,
  // the creator's (Ed, round 11): the scarf's length (times hers; 0 none, 3 trailing on the ground), the satchel's size, a backpack's size (0 none)
  scarfLength: 1, bagSize: 1, backpackSize: 0 };
const shoeR = L => L.chunky ? [.095, .056, .056] : [.08, .04, .045]; // her sneakers, or chunky trainers
// The hat's shape from the look: a crown point p scaled from the brim by hatHeight and leaned back by hatTilt; a brim's radii by hatBrim.
const hatPt = (L, brim, p) => { const k = L.hatHeight ?? 1, a = L.hatTilt || 0; if (k === 1 && !a) return p; let d = v3.mul(v3.sub(p, brim), k); if (a) { const c = Math.cos(a), s = Math.sin(a); d = [d[0] * c - d[1] * s, d[0] * s + d[1] * c, d[2]]; } return v3.add(brim, d); };
const brimR = (L, r) => (L.hatBrim ?? 1) === 1 ? r : [r[0] * L.hatBrim, r[1], r[2] * L.hatBrim];
// The broom from the look: its handle from the binding a towards b (longer by broomLength, bowed up by broomBend), and its
// bristles centred at c along o.dir (classic as hers; fan: wide and flat; twig: a long thin bundle with stray twigs; round: a puff),
// longer by `bristles`, kept bound at the same point.
function broomHandle(m, L, a, b, r1 = .022, r2 = .018) {
  const k = L.broomLength ?? 1, bend = L.broomBend || 0;
  if (k === 1 && !bend) return m.seg(a, b, r1, r2, M.BROOM, { group: 2 });
  const e = v3.add(a, v3.mul(v3.sub(b, a), k)), mid = v3.add(v3.lerp(a, e, .55), [0, bend * .12, 0]);
  return m.chain([[...a, r1], [...mid, (r1 + r2) / 2], [...e, r2]], M.BROOM, { group: 2 });
}
function broomBristles(m, L, c, r, o) {
  const kind = L.broom || "classic", k = L.bristles ?? 1;
  if (kind === "classic" && k === 1) return m.ell(c, r, M.STRAW, o);
  const d = v3.norm(o.dir), R = kind === "fan" ? [r[0] * k, r[1] * 1.6, r[2] * .5] : kind === "twig" ? [r[0] * 1.4 * k, r[1] * .7, r[2] * .7] : kind === "round" ? [r[0] * .85 * k, r[1] * 1.35, r[2] * 1.35] : [r[0] * k, r[1], r[2]];
  const cc = v3.sub(c, v3.mul(d, R[0] - r[0])); // still bound where hers is
  m.ell(cc, R, M.STRAW, o);
  if (kind === "twig") for (let i = 0; i < 5; i++) { const s = (i / 4 - .5) * 2, from = v3.sub(cc, v3.mul(d, R[0] * .4)), to = v3.add(v3.sub(cc, v3.mul(d, R[0] * (1.15 + .1 * (i % 2)))), [0, s * R[1] * 1.1, (i % 3 - 1) * R[2] * .9]); m.seg(from, to, .012, .006, M.STRAW, { group: 3, paint: o.paint }); }
}
// The hat: its brim at `brim` (tipped along dir), its crown through mid to tip (as hers would be). Returns the tip (the hatTip anchor).
function drawHat(m, L, brim, dir, mid, tip) {
  const up = v3.norm(v3.sub(mid, brim)); // the crown's axis (it tips with her head)
  mid = hatPt(L, brim, mid); tip = hatPt(L, brim, tip);
  if (NEW_HATS[L.hat]) return NEW_HATS[L.hat](m, L, brim, dir, up);
  const bandK = (L.hatBand ?? 1) * Math.max(1, 1 + ((L.hatBrim ?? 1) - 1) * .8); // (a broad brim would hide a narrow band from above: the band deepens with it)
  const band = p => p[1] < brim[1] + (L.hat === "classic" ? .045 : .065) * bandK ? M.MAGIC : undefined, from = (p, k, d = [0, 0, 0]) => v3.add(v3.add(brim, v3.mul(v3.sub(p, brim), k)), d);
  if (L.hat === "bucket") { // a soft bucket hat with cat ears, a glowing band round it
    const c = v3.add(brim, [-.01, .05, 0]);
    m.ell(brim, [.15, .016, .145], M.HAT, { dir, group: 11 });
    m.ell(c, [.115, .07, .11], M.HAT, { group: 11, paint: p => p[1] < brim[1] + .07 && p[1] > brim[1] + .02 ? M.MAGIC : undefined });
    for (const s of [-1, 1]) m.seg(v3.add(c, [-.01, .04, s * .065]), v3.add(c, [-.02, .15, s * .085]), .04, .012, M.HAT, { group: 11 });
    return v3.add(c, [-.02, .16, 0]);
  }
  if (L.hat === "small") { // a little hat, tipped over to the near side
    const b = v3.add(brim, [.01, .015, .065]), t = v3.add(b, [-.07, .17, .07]);
    m.ell(b, [.1, .013, .095], M.HAT, { dir: [1, .25, .45], group: 11 });
    m.chain([[...v3.add(b, [0, .01, .005]), .055], [...v3.add(b, [-.03, .09, .035]), .032], [...t, .011]], M.HAT, { group: 11, paint: p => p[1] < b[1] + .055 ? M.MAGIC : undefined });
    return t;
  }
  if (L.hat === "floppy") { // a wide brim drooping all round, a short crown
    m.ell(brim, brimR(L, [.22, .016, .2]), M.HAT, { dir, group: 11 });
    const bk = L.hatBrim ?? 1; m.chain([...Array(13).keys()].map(k => { const a = k / 12 * Math.PI * 2; return [...v3.add(brim, [Math.cos(a) * .2 * bk, -.02 - .015 * Math.cos(a), Math.sin(a) * .185 * bk]), .024]; }), M.HAT, { group: 11 });
    const t = from(tip, .72, [-.02, -.01, 0]);
    m.chain([[...v3.add(brim, [0, .01, 0]), .095], [...from(mid, .8), .055], [...t, .015]], M.HAT, { group: 11, paint: band });
    return t;
  }
  if (L.hat === "crooked") { // tall and crooked: the crown kinked, its tip flopping over
    const k1 = from(mid, 1.3, [0, 0, .025]), k2 = from(tip, 1.45, [-.02, .03, .05]), t = v3.add(k2, [.1, -.06, .03]);
    m.ell(brim, brimR(L, [.16, .014, .15]), M.HAT, { dir, group: 11 });
    m.chain([[...v3.add(brim, [0, .01, 0]), .085], [...k1, .05], [...k2, .027], [...t, .012]], M.HAT, { group: 11, paint: band });
    return t;
  }
  m.ell(brim, brimR(L, [.16, .014, .15]), M.HAT, { dir, group: 11 }); // hers: a wide brim and a tall crown, its tip bent back
  m.chain([[...v3.add(brim, [0, .01, 0]), .085], [...mid, .045], [...tip, .012]], M.HAT, { group: 11, paint: band }); // a glowing hatband
  if (L.hat === "flowers") for (let k = 0; k < 7; k++) { const a = k / 7 * Math.PI * 2 + .3, bk = L.hatBrim ?? 1; m.ell(v3.add(brim, [Math.cos(a) * .135 * bk, .018, Math.sin(a) * .13 * bk]), [.032, .026, .032], k % 2 ? M.POM : M.FLOWER, { group: 11 }); }
  return tip;
}
// The creator's hats (Ed, round 11: "the option to have no hat, and some different hats; top hat, cowboy hat, chinese farmer hat,
// deely boppers, party hat, musketeer hat - be creative"): each from her brim along `up` (the crown's axis), its height by
// hatHeight and its brim by hatBrim; each but none keeps a glowing band or glowing bits, so she still reads at night. Each returns
// its tip (the hatTip anchor). Colours: hat (M.HAT), trim (HAT1), pattern (HAT2), flower2 (POM), plume (WEB), gold (BARKL).
const hatAt = (b, up, h, side = [0, 0, 0]) => v3.add(v3.add(b, v3.mul(up, h)), side);
const NEW_HATS = {
  none: (m, L, brim, dir, up) => hatAt(brim, up, .03), // her hair shows; the tip just above her head
  top(m, L, brim, dir, up) { // a top hat: a narrow brim, a tall straight crown, a glowing band
    const h = .22 * (L.hatHeight ?? 1), bk = L.hatBrim ?? 1;
    m.ell(brim, [.13 * bk, .013, .12 * bk], M.HAT, { dir, group: 11 });
    m.seg(hatAt(brim, up, .005), hatAt(brim, up, h), .078, .082, M.HAT, { group: 11, paint: p => v3.dot(v3.sub(p, brim), up) < .045 * (L.hatBand ?? 1) ? M.MAGIC : undefined });
    m.ell(hatAt(brim, up, h), [.082, .01, .082], M.HAT2, { dir: [1, 0, 0], up, group: 11 });
    return hatAt(brim, up, h + .01);
  },
  cowboy(m, L, brim, dir, up) { // a wide brim curling up at the sides, a dented crown, a glowing band
    const h = .13 * (L.hatHeight ?? 1), bk = L.hatBrim ?? 1;
    m.ell(brim, [.2 * bk, .014, .17 * bk], M.HAT, { dir, group: 11 });
    for (const s2 of [-1, 1]) m.ell(v3.add(brim, [0, .03, s2 * .16 * bk]), [.13 * bk, .012, .04], M.HAT, { dir: [1, 0, 0], up: [0, 1, -s2 * .9], group: 11 });
    m.ell(hatAt(brim, up, h * .55), [.095, h * .55, .085], M.HAT, { group: 11, paint: p => v3.dot(v3.sub(p, brim), up) < .03 * (L.hatBand ?? 1) ? M.MAGIC : Math.abs(p[2] - brim[2]) < .012 && v3.dot(v3.sub(p, brim), up) > h * .8 ? M.HAT2 : undefined });
    return hatAt(brim, up, h * 1.1);
  },
  conical(m, L, brim, dir, up) { // the wide straw cone, a glowing bead at its point
    const h = .12 * (L.hatHeight ?? 1), bk = L.hatBrim ?? 1;
    const rib = p => Math.floor((Math.atan2(p[2] - brim[2], p[0] - brim[0]) + 4) * 4) % 2 ? M.HAT2 : undefined; // woven ribs
    m.ell(hatAt(brim, up, h * .25), [.21 * bk, h * .3, .2 * bk], M.HAT, { dir: [1, 0, 0], up, group: 11, paint: rib }); // a wide, shallow cone: a flat disc
    m.seg(hatAt(brim, up, h * .3), hatAt(brim, up, h), .1 * Math.min(1.3, bk), .012, M.HAT, { group: 11, paint: rib }); // rising to its point
    const br = .016 * Math.sqrt(Math.max(1, L.hatHeight ?? 1, bk)); // (a bigger bead on a bigger hat, so it still shows)
    m.ell(hatAt(brim, up, h + .01), [br, br, br], M.MAGIC, { group: 11 });
    return hatAt(brim, up, h + .01 + br * .95);
  },
  boppers(m, L, brim, dir, up) { // deely boppers: a headband, two springs, two glowing balls
    const h = .17 * (L.hatHeight ?? 1);
    m.ell(hatAt(brim, up, .02), [.1, .018, .1], M.HAT, { dir: [1, 0, 0], up, group: 11 });
    let top = brim;
    for (const s2 of [-1, 1]) { const b = hatAt(brim, up, .04, [0, 0, s2 * .05]), t = hatAt(brim, up, h, [-.02, 0, s2 * .08]); m.chain([[...b, .009], [...v3.lerp(b, t, .5), .008], [...t, .008]], M.HAT, { group: 11 }); m.ell(t, [.032, .032, .032], M.COLLAR, { group: 11 }); top = t; }
    return v3.add(top, [0, .03, 0]);
  },
  party(m, L, brim, dir, up) { // a striped party cone with a pompom, a glowing band at its rim
    const h = .24 * (L.hatHeight ?? 1), bk = L.hatBrim ?? 1;
    m.seg(hatAt(brim, up, 0), hatAt(brim, up, h), .075 * Math.min(1.4, bk), .008, M.HAT, { group: 11, paint: p => { const t = v3.dot(v3.sub(p, brim), up); return t < .02 * (L.hatBand ?? 1) ? M.MAGIC : Math.floor(t * 30) % 2 ? M.HAT2 : undefined; } });
    m.ell(hatAt(brim, up, h + .015), [.03, .03, .03], M.POM, { group: 11 });
    return hatAt(brim, up, h + .045);
  },
  musketeer(m, L, brim, dir, up) { // a wide brim pinned up on one side, a round crown, a great curling plume
    const h = .11 * (L.hatHeight ?? 1), bk = L.hatBrim ?? 1;
    m.ell(brim, [.22 * bk, .014, .19 * bk], M.HAT, { dir: v3.add(dir, [0, .25, 0]), group: 11 });
    m.ell(hatAt(brim, up, h * .5), [.1, h * .55, .095], M.HAT, { group: 11, paint: p => v3.dot(v3.sub(p, brim), up) < .03 * (L.hatBand ?? 1) * Math.max(1, 1 + (bk - 1) * .8) ? M.MAGIC : undefined });
    const p0 = hatAt(brim, up, h * .7, [.03, 0, .06]), pts = [];
    for (let k = 0; k <= 6; k++) { const t = k / 6, a = .6 + t * 2.2; pts.push([...v3.add(p0, [-Math.sin(a) * .2 * t - .02, Math.cos(a) * -.12 * t + .13 * t, .05 * t]), .035 * (1 - t * .6)]); }
    m.chain(pts, M.WEB, { group: 11 });
    return v3.add(p0, [-.05, .16, 0]);
  },
  wizard(m, L, brim, dir, up) { // a tall starry cone, its tip drooping, a wide brim
    const h = .4 * (L.hatHeight ?? 1), bk = L.hatBrim ?? 1, a = hatAt(brim, up, h * .7), t = v3.add(hatAt(brim, up, h), [-.08, -.03, 0]);
    m.ell(brim, [.17 * bk, .013, .16 * bk], M.HAT, { dir, group: 11 });
    const star = p => hash2(Math.floor(p[0] * 40), Math.floor(p[1] * 40) + Math.floor(p[2] * 40) * 7, 31) < .1 ? M.MAGIC2 : v3.dot(v3.sub(p, brim), up) < .04 * (L.hatBand ?? 1) ? M.MAGIC : undefined;
    m.chain([[...hatAt(brim, up, .01), .085], [...a, .03], [...t, .01]], M.HAT, { group: 11, paint: star });
    return t;
  },
  beanie(m, L, brim, dir, up) { // a ribbed beanie hugging her head, a folded glowing cuff, a bobble
    const h = .07 * (L.hatHeight ?? 1);
    m.ell(hatAt(brim, up, h * .3), [.118, .075 + h * .4, .114], M.HAT, { group: 11, paint: p => { const t = v3.dot(v3.sub(p, brim), up); return t < .02 * (L.hatBand ?? 1) ? M.MAGIC : Math.floor((Math.atan2(p[2] - brim[2], p[0] - brim[0]) + 4) * 6) % 2 ? M.HAT1 : undefined; } });
    const b = hatAt(brim, up, .1 + h * .9); m.ell(b, [.04, .04, .04], M.POM, { group: 11 });
    return v3.add(b, [0, .035, 0]);
  },
  crown(m, L, brim, dir, up) { // a golden crown, its points tipped with glowing jewels
    const h = .07 * (L.hatHeight ?? 1), bk = Math.min(1.3, L.hatBrim ?? 1);
    m.seg(hatAt(brim, up, 0), hatAt(brim, up, h), .085 * bk, .09 * bk, M.BARKL, { group: 11, paint: p => Math.abs(v3.dot(v3.sub(p, brim), up) - h * .5) < .008 ? M.MAGIC : undefined });
    for (let k = 0; k < 5; k++) { const a2 = k / 5 * Math.PI * 2, o = [Math.cos(a2) * .085 * bk, 0, Math.sin(a2) * .085 * bk], b = hatAt(v3.add(brim, o), up, h), t = hatAt(v3.add(brim, o), up, h + .05); m.seg(b, t, .022, .006, M.BARKL, { group: 11 }); m.ell(t, [.012, .012, .012], M.MAGIC, { group: 11 }); }
    return hatAt(brim, up, h + .07);
  },
  mushroom(m, L, brim, dir, up) { // a spotted mushroom cap, its gills glowing underneath
    const h = .09 * (L.hatHeight ?? 1), bk = L.hatBrim ?? 1;
    m.ell(hatAt(brim, up, h * .45), [.19 * bk, h, .18 * bk], M.HAT, { group: 11, paint: p => v3.dot(v3.sub(p, brim), up) < h * .15 ? M.MAGIC : spotPaint(p) ? M.HAT2 : undefined });
    return hatAt(brim, up, h * 1.5);
  },
  traffic(m, L, brim, dir, up) { // a traffic cone, its stripes glowing like reflectors
    const h = .26 * (L.hatHeight ?? 1);
    m.ell(brim, [.12, .014, .12], M.HAT, { dir, group: 11 });
    m.seg(hatAt(brim, up, .01), hatAt(brim, up, h), .085, .015, M.HAT, { group: 11, paint: p => { const t = v3.dot(v3.sub(p, brim), up) / h; return (t > .35 && t < .48) || (t > .62 && t < .72) ? M.MAGIC2 : undefined; } });
    return hatAt(brim, up, h + .01);
  },
};
const spotPaint = p => hash2(Math.floor(p[0] * 22), Math.floor(p[2] * 22) + Math.floor(p[1] * 22) * 13, 17) < .12;
// Her hair: the long hair's tail through `tail` ([x, y, z, radius] points); the other styles round her head H.
function drawHair(m, L, H, tail) {
  if (L.hair === "bob") m.ell(v3.add(H, [-.035, -.03, 0]), [.115, .1, .128], M.HAIR, { group: 9 });
  else if (L.hair === "buns") for (const s of [-1, 1]) m.ell(v3.add(H, [-.1, .035, s * .065]), [.055, .055, .055], M.HAIR, { group: 9 });
  else if (L.hair === "mohawk") m.chain([[...v3.add(H, [.07, .1, 0]), .028], [...v3.add(H, [-.03, .16, 0]), .04], [...v3.add(H, [-.13, .11, 0]), .028]], M.HAIR, { group: 9 });
  else m.chain(tail, M.HAIR, { group: 9 });
}
// Her eyes (or sunglasses), looking up by `look`, her head tilted by `tilt`; `shut` (laughing, hugging): closed.
function drawEyes(m, L, H, look = 0, tilt = 0, shut = false) {
  if (L.earrings) for (const s of [-1, 1]) m.ell(v3.add(H, [-.005, -.075, s * .1]), [.016, .022, .016], M.FRAME, { group: 10 }); // the witch generator's earrings
  const R = [.11, .115, .1], at = d => Model.surface(H, R, v3.norm(d));
  if (L.shades) {
    const p = [-1, 1].map(s => at([.85, .08 + look, s * .42 + tilt * .1])), mid = v3.add(at([1, .08 + look, tilt * .1]), [.01, 0, 0]);
    for (const q of p) m.ell(v3.add(q, [.008, 0, 0]), L.shades === "round" ? [.026, .03, .03] : [.022, .024, .034], M.SHADES, { group: 8 });
    for (const q of p) m.seg(v3.add(q, [.008, 0, 0]), mid, .011, .011, M.FRAME, { group: 8 });
    return;
  }
  for (const s of [-1, 1]) m.ell(at([.85, .05 + look, s * .45 + tilt * .1]), shut ? [.016, .011, .02] : [.016, .026, .016], M.EYE, { group: 8 });
}
// A hand at `hand` in group g: "palm" (open, palm up), "down" (flat, palm to the ground), "wave" (fingers spread, up),
// "point" (a finger up), or a loose fist.
function drawHand(m, shape, hand, g) {
  if (shape === "palm") m.ell(hand, [.045, .02, .04], M.SKIN, { group: g });
  else if (shape === "down") m.ell(hand, [.045, .02, .04], M.SKIN, { dir: [1, .15, 0], group: g });
  else if (shape === "wave") { m.ell(hand, [.03, .045, .04], M.SKIN, { group: g }); for (const k of [-1, 0, 1]) m.seg(v3.add(hand, [0, .03, k * .02]), v3.add(hand, [k * .01, .065, k * .03]), .01, .008, M.SKIN, { group: g }); }
  else if (shape === "point") { m.ell(hand, [.035, .03, .035], M.SKIN, { group: g }); m.seg(v3.add(hand, [0, .02, 0]), v3.add(hand, [.01, .08, 0]), .012, .01, M.SKIN, { group: g }); }
  else m.ell(hand, [.035, .03, .035], M.SKIN, { group: g });
}
// Glow-stick bracelets on a forearm (elbow to hand): two on the near arm, one on the far.
function drawGlowsticks(m, L, elbow, hand, side, g) {
  if (L.wristband && side > 0) m.ell(v3.lerp(elbow, hand, .88), [.02, .046, .046], M.IRIS, { dir: v3.sub(hand, elbow), group: g }); // a festival wristband
  if (!L.glowsticks) return;
  const d = v3.sub(hand, elbow);
  for (const t of side > 0 ? [.62, .82] : [.78]) m.ell(v3.lerp(elbow, hand, t), [.026, .05, .05], t > .7 ? M.COLLAR : M.GLOW, { dir: d, group: g });
}
// The torso's paint: her open jacket over a top down its front (fwd: the way her chest faces), or a party top.
function torsoPaint(L, chest, fwd) {
  const front = p => v3.dot(v3.sub(p, chest), fwd);
  if (L.top === "sequins") return p => front(p) > .03 && Math.abs(p[2]) < .075 ? (hash2(Math.floor(p[0] * 15), Math.floor(p[1] * 15) + Math.floor(p[2] * 15) * 31, 5) < .4 ? M.HAT2 : M.TOP) : undefined;
  if (L.top === "mesh") return p => front(p) > .03 && Math.abs(p[2]) < .08 ? ((((p[0] + p[2]) * 9) % 1 + 1) % 1 < .4 || ((p[1] * 9) % 1 + 1) % 1 < .4 ? M.TOP : M.SKIN) : undefined;
  return p => front(p) > .045 && Math.abs(p[2]) < .05 ? M.TOP : undefined;
}
// A poncho over her shoulders (striped), or a cape: hanging down her back (standing) or streaming out behind (flying).
function drawWrap(m, L, chest, fwd, spine, flying) {
  if (L.top === "poncho") m.ell(v3.add(chest, v3.mul(spine, .06)), [.17, .11, .2], M.JACKET, { dir: fwd, up: spine, group: 13, paint: p => { const k = Math.floor((p[1] - chest[1]) * 16) & 3; return k === 0 ? M.HAT1 : k === 2 ? M.HAT2 : undefined; } });
  if (L.top === "cape") {
    if (flying) m.ell(v3.add(chest, [-.24, -.02, 0]), [.3, .035, .16], M.JACKET, { dir: [1, -.2, 0], up: [0, 1, 0], group: 12 });
    else m.ell(v3.add(chest, v3.add(v3.mul(fwd, -.11), v3.mul(spine, -.12))), [.3, .035, .16], M.JACKET, { dir: v3.add(spine, v3.mul(fwd, .12)), up: fwd, group: 12 });
  }
  drawExtras(m, L, chest, fwd, spine, flying);
}
// A cloak's half-width a distance down it (Ed, 2026-10-06: "Cloaks should be a little wider, and get wider as they get longer"):
// as at her shoulders at the top, flaring out down the train like a cape.
const cloakWidth = d => .165 + Math.min(.6, d * .3);
// A cloak past the old lengths (Ed, 2026-10-06: "allow a longer cloak"): a train of cloth from her shoulders, streaming out behind
// her in flight and rippling with the frame, or hanging down her back to the ground and lying along it behind her. Past the first
// stretch it's `extra`: her size and her lift off the ground don't count it.
function longCloak(m, L, sh, dir, back, len, flying, patch) {
  const f = L.frame ?? 0, n = Math.ceil(len / .09), step = len / n, pts = [sh];
  let p = sh;
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    if (flying) p = v3.add(p, v3.mul(v3.norm(v3.add(dir, [0, Math.sin(i * .7 - f * 1.6) * .35 * t - .08 * t, Math.sin(i * .45 - f * 1.1) * .12 * t])), step));
    else { const q = v3.add(p, v3.mul(dir, step)); p = q[1] > .03 ? q : [p[0] + back[0] * step, .03, p[2] + back[2] * step + Math.sin(i * .9) * .01]; } // down to the ground, then along it
    pts.push(p);
  }
  for (let i = 0; i < n; i++) {
    const a = pts[i], b = pts[i + 1], d = v3.norm(v3.sub(b, a)), t = (i + .5) / n, onGround = !flying && a[1] <= .031 && b[1] <= .031;
    m.ell(v3.lerp(a, b, .5), [step * .75, .028, cloakWidth((i + .5) * step)], M.CLOTH, { dir: d, up: flying || onGround ? [0, 1, 0] : back, group: 14, extra: i * step > .7, ...(patch ? { paint: patch } : {}) });
  }
  m.ell(pts[n], [.05, .025, cloakWidth(len) + .03], M.CLOTH, { dir: v3.norm(v3.sub(pts[n], pts[n - 1])), up: flying || pts[n][1] <= .031 ? [0, 1, 0] : back, group: 14, extra: true });
}
// The witch generator's extras: a cloak from her shoulders (short, long, or long with a hood), streaming out behind in flight or
// hanging down her back; a scarf round her neck, its end flying; a satchel on her near hip on a strap across her; a glowing pendant.
function drawExtras(m, L, chest, fwd, spine, flying) {
  const back = v3.mul(fwd, -1), side = [0, 0, 1], neck = v3.add(chest, v3.mul(spine, .14));
  if (L.cloak && L.cloak !== "none") {
    const len = (L.cloak === "short" ? .22 : .42) * (L.cloakLength || 1), sh = v3.add(chest, v3.add(v3.mul(spine, .1), v3.mul(back, .07)));
    const dir = flying ? v3.norm(v3.add(back, v3.mul(spine, -.15))) : v3.norm(v3.add(v3.mul(spine, -1), v3.mul(back, .18)));
    const mid = v3.add(sh, v3.mul(dir, len * .5)), end = v3.add(sh, v3.mul(dir, len));
    const patch = L.patches ? p => hash2(Math.floor(p[0] * 11), Math.floor(p[1] * 11) + Math.floor(p[2] * 11) * 17, 23) < .14 ? M.HAT2 : undefined : undefined; // patched: squares of another cloth
    if (len > .8) longCloak(m, L, sh, dir, back, len, flying, patch); // (Ed, 2026-10-06: "allow a longer cloak")
    else {
      m.ell(mid, [len * .55, .03, .165 + len * .18], M.CLOTH, { dir, up: flying ? [0, 1, 0] : back, group: 14, ...(patch ? { paint: patch } : {}) });
      m.ell(end, [.05, .025, .19 + len * .3], M.CLOTH, { dir, up: flying ? [0, 1, 0] : back, group: 14 });
    }
    if (L.cloak === "hooded") m.ell(v3.add(neck, v3.add(v3.mul(back, .09), v3.mul(spine, .03))), [.08, .06, .1], M.CLOTH, { dir: back, up: spine, group: 14 });
  }
  const sl = L.scarfLength ?? 1;
  if (L.scarf && sl > 0) {
    m.ell(neck, [.085, .035, .09], M.BODY, { dir: fwd, up: spine, group: 15 });
    const t0 = v3.add(neck, v3.mul(back, .06)), stripes = { group: 15, paint: p => ((Math.floor((p[0] + p[1]) * 30) % 2) + 2) % 2 ? M.HAT1 : undefined };
    if (sl === 1) { const t1 = v3.add(t0, flying ? [-.14, .02, .04] : v3.add(v3.mul(spine, -.12), v3.mul(back, .05))), t2 = v3.add(t1, flying ? [-.12, -.03, .03] : v3.mul(spine, -.1)); m.chain([[...t0, .03], [...t1, .025], [...t2, .02]], M.BODY, stripes); }
    else { // longer or shorter: its tail streams out behind (flying) or hangs down her back to the ground (standing), waving
      const n = Math.max(2, Math.round(2 + sl * 2)), seg = .13 * sl / (n - 1) * 1.6, pts = [[...t0, .03]]; let p = t0;
      const ph = sl > 3 ? (L.frame ?? 0) * 1.6 : 0; // (a very long one flutters with the frame)
      for (let i = 1; i < n; i++) { const w = Math.sin(i * 1.3 - ph) * .02 * (sl > 3 ? 1 + 1.5 * i / n : 1); p = v3.add(p, flying ? [-seg, -.012 + w, .02 + w * .5] : v3.add(v3.mul(spine, -seg), v3.mul(back, .02 + w))); if (!flying && p[1] < .02) p = [p[0] - seg * .8, .02, p[2]]; pts.push([...p, .03 - .01 * i / n]); }
      m.chain(pts, M.BODY, sl > 3 ? { ...stripes, extra: true } : stripes); // (past the old length, her size and lift don't count it)
    }
  }
  if (L.satchel) {
    const hip = v3.add(chest, v3.add(v3.mul(spine, -.17), v3.add(v3.mul(side, .12), v3.mul(back, .02))));
    const bs = L.bagSize ?? 1; m.ell(v3.add(hip, v3.mul(spine, -.03 * (bs - 1))), [.065 * bs, .058 * bs, .028 * Math.sqrt(bs)], M.WOOD, { dir: fwd, up: spine, group: 16 }); // (an ellipsoid: the posed flight turns only ellipsoids and limbs)
    m.chain([[...v3.add(chest, v3.add(v3.mul(spine, .12), v3.mul(side, -.08))), .012], [...v3.add(chest, v3.add(v3.mul(fwd, .1), [0, 0, .02])), .012], [...hip, .012]], M.WOOD, { group: 16 });
  }
  if (L.pendant) m.ell(v3.add(chest, v3.add(v3.mul(fwd, .105), v3.mul(spine, .05))), [.022, .028, .018], M.MAGIC, { group: 17 });
  if (L.backpackSize > 0) { // a backpack on her back, its top flap darker, glowing tags on its straps
    const k = L.backpackSize, c = v3.add(chest, v3.add(v3.mul(back, .1 + .03 * k), v3.mul(spine, -.04)));
    m.ell(c, [.09 * k, .11 * k, .085 * k], M.LEAF, { dir: spine, up: back, group: 23, paint: p => v3.dot(v3.sub(p, c), spine) > .06 * k ? M.HAT1 : undefined });
    for (const s2 of [-1, 1]) m.ell(v3.add(chest, v3.add(v3.mul(fwd, .09), [0, 0, s2 * .05])), [.012, .05, .012], M.LEAF, { dir: spine, up: fwd, group: 23 });
  }
  drawAccessories(m, L, chest, fwd, spine, flying);
}
// The witch generator's accessories (Ed: "both witchy and modern"), all ellipsoids and limbs so the posed flight turns them: a
// familiar sitting on her near shoulder, a lantern hanging at her far hip (lit), a potion vial (glowing) and a spellbook at her
// belt, a bum bag at her front.
function drawAccessories(m, L, chest, fwd, spine, flying) {
  const side = [0, 0, 1], back = v3.mul(fwd, -1), at = (u, f, s) => v3.add(chest, v3.add(v3.mul(spine, u), v3.add(v3.mul(fwd, f), v3.mul(side, s))));
  const waist = -.16;
  if (L.familiar && L.familiar !== "none") { // about a sixth of her height, so it reads at the ground zoom
    const k = 2.1, b = flying ? at(-.2, -.4, .07) : at(-.5, .1, .2), g = 18, o = (u, f, s2) => v3.add(b, v3.add(v3.mul(spine, u * k), v3.add(v3.mul(fwd, f * k), v3.mul(side, s2 * k)))), R = r => r.map(v => v * k);
    const eye = p => m.ell(p, R([.008, .01, .008]), M.MAGIC, { group: g, extra: true }); // its eyes glow a little
    if (L.familiar === "cat") {
      m.ell(o(.03, 0, 0), R([.04, .035, .035]), M.BODY2, { dir: fwd, up: spine, group: g });
      const h = o(.085, .02, 0); m.ell(h, R([.03, .028, .03]), M.BODY2, { group: g });
      for (const s2 of [-1, 1]) m.seg(o(.103, .02, s2 * .016), o(.133, .02, s2 * .02), .011 * k, .003 * k, M.BODY2, { group: g });
      for (const s2 of [-1, 1]) eye(o(.085, .046, s2 * .011));
      m.chain([[...o(0, -.03, 0), .011 * k], [...o(-.05, -.06, 0), .009 * k], [...o(-.1, -.05, 0), .008 * k]], M.BODY2, { group: g });
    } else if (L.familiar === "crow") {
      m.ell(o(.035, 0, 0), R([.045, .03, .028]), M.BODY2, { dir: v3.add(fwd, v3.mul(spine, .4)), up: spine, group: g });
      const h = o(.075, .03, 0); m.ell(h, R([.024, .022, .022]), M.BODY2, { group: g });
      m.seg(o(.075, .045, 0), o(.067, .085, 0), .009 * k, .002 * k, M.BODY3, { group: g });
      for (const s2 of [-1, 1]) eye(o(.08, .042, s2 * .014));
      m.seg(o(.01, -.03, 0), o(-.01, -.08, 0), .016 * k, .006 * k, M.BODY2, { group: g }); // its tail
    } else if (L.familiar === "toad") {
      m.ell(o(.025, 0, 0), R([.045, .028, .04]), M.BODY2, { dir: fwd, up: spine, group: g, paint: p => hash2(Math.floor(p[0] * 60), Math.floor(p[2] * 60), 4) < .2 ? M.BODY3 : undefined });
      for (const s2 of [-1, 1]) { const e = o(.05, .02, s2 * .02); m.ell(e, R([.012, .012, .012]), M.BODY2, { group: g }); eye(o(.056, .028, s2 * .02)); }
    } else if (L.familiar === "bat") {
      m.ell(o(.03, 0, 0), R([.022, .032, .022]), M.BODY2, { group: g });
      for (const s2 of [-1, 1]) m.ell(o(.04, 0, s2 * .045), R([.012, .03, .045]), M.BODY3, { dir: v3.add(side, v3.mul(spine, .5)), up: fwd, group: g });
      for (const s2 of [-1, 1]) { m.seg(o(.055, 0, s2 * .01), o(.085, 0, s2 * .015), .008 * k, .003 * k, M.BODY2, { group: g }); eye(o(.045, .02, s2 * .008)); }
    }
  }
  if (L.lantern) { // hung from her far hip on a short chain, lit
    const top = at(waist, -.02, -.13), c = v3.add(top, v3.mul(spine, -.07));
    m.seg(top, v3.add(c, v3.mul(spine, .03)), .006, .006, M.STONED, { group: 19 });
    m.ell(c, [.028, .036, .028], M.MAGIC, { group: 19, paint: p => Math.abs(p[1] - c[1]) > .028 ? M.STONED : undefined });
  }
  if (L.vial) { const c = at(waist - .02, .07, .1); m.ell(c, [.018, .03, .018], M.CRYSTAL, { group: 20, paint: p => p[1] < c[1] ? M.GLOW : undefined }); m.ell(v3.add(c, v3.mul(spine, .035)), [.009, .009, .009], M.WOOD, { group: 20 }); }
  if (L.book) { const c = at(waist, -.07, .1); m.ell(c, [.05, .062, .022], M.BARKD, { dir: fwd, up: spine, group: 21, paint: p => Math.abs(p[1] - c[1]) < .01 ? M.FRAME : undefined }); }
  if (L.bumbag) { const c = at(waist - .03, .1, .03); m.ell(c, [.035, .03, .065], M.EAR, { dir: fwd, up: spine, group: 22 }); m.chain([[...at(waist - .02, .07, -.08), .008], [...c, .008], [...at(waist - .02, .07, .1), .008]], M.EAR, { group: 22 }); }
}
// Every part (those `only` picks), flat and anchor of m turned by angle a about the vertical ("y") or the side-to-side ("z") axis through P.
function turnModel(m, axis, a, P, only = () => true) {
  const c = Math.cos(a), s = Math.sin(a);
  const R = axis === "y" ? q => [q[0] * c + q[2] * s, q[1], -q[0] * s + q[2] * c] : q => [q[0] * c - q[1] * s, q[0] * s + q[1] * c, q[2]];
  const Ri = axis === "y" ? q => [q[0] * c - q[2] * s, q[1], q[0] * s + q[2] * c] : q => [q[0] * c + q[1] * s, -q[0] * s + q[1] * c, q[2]];
  const pt = q => v3.add(P, R(v3.sub(q, P))), unpt = q => v3.add(P, Ri(v3.sub(q, P)));
  for (const q of m.parts) {
    if (!only(q)) continue;
    if (q.type === "cone") { q.a = pt(q.a); q.b = pt(q.b); } else { q.c = pt(q.c); q.axes = q.axes.map(R); }
    if (q.paint) { const f = q.paint; q.paint = (p, part) => f(unpt(p), part); } // markings stay where they were painted
  }
  for (const f of m.flats) { f.c = pt(f.c); f.u = R(f.u); f.v = R(f.v); }
  for (const k of Object.keys(m.anchors)) if (k !== "feet") m.anchors[k] = pt(m.anchors[k]);
}
// Lifted (or lowered) so its lowest part rests at height y.
function restOn(m, y) {
  const low = Math.min(...m.parts.filter(q => !q.extra).map(q => q.type === "cone" ? Math.min(q.a[1] - q.r1, q.b[1] - q.r2) : q.c[1] - Math.max(...(q.r || q.h)))), d = y - low;
  for (const q of m.parts) if (q.type === "cone") { q.a = v3.add(q.a, [0, d, 0]); q.b = v3.add(q.b, [0, d, 0]); } else q.c = v3.add(q.c, [0, d, 0]);
  for (const k of Object.keys(m.anchors)) if (k !== "feet") m.anchors[k] = v3.add(m.anchors[k], [0, d, 0]);
}

// frame 0..2 bob; lean: the fast-flight pose; facing "towards" | "away".
// pose "fast": see fastModel. pose "brake" (Ed: slowing down sharply): the broom hauled about 25° nose-up
// in a skid, bristles swinging forward under her; she leans back hard on straight arms, feet thrust
// forward, one leg out; hair, hat and jacket swing forward past her, the hat tipped over her eyes; a
// puff kicked forward from the bristles; two frames of skid wobble. pose "rise" | "descend" (Ed: for flying up to the treetops and down to the ground): the broom
// tilts nose-up (about 40°) or nose-down (about 35°). Rising, she leans forward into the climb,
// her hat brim pushed back, hair and jacket trailing down, sparks falling from the bristles.
// Descending, she leans back to brake with one hand on her hat, hair and jacket flowing up and
// her legs reaching down to land. Two frames each (frame 0, 1) flutter the hair, jacket and sparks.
export const WITCH_POSES = { rise: .78, descend: -.66, brake: .44 }; // the broom's tilt, radians nose-up (45° up, 38° down; braking, a 25° skid)
// pose "fast" (Ed: treetop top speed, "barely hanging on"): the broom level and a little
// nose-down, shooting forward, bristles flared; she grips the front of the handle at arm's
// length with her body streaming out behind, nearly flat, one knee bent and one leg kicking;
// her hat blown up off her head on its chin strap, hair straight back, jacket tail whipping;
// eyes wide, teeth gritted; a few small speed streaks. Three frames flap her (frame 0..2).
function fastModel(frame, L = DEFAULT_LOOK) {
  const m = new Model({ blend: .03 }), f = frame % 3, y = .5, dip = .05; // the broom's height; it dips a little at the nose
  const j = [[0, .02, -.01], [.02, -.01, .02], [-.01, .015, .01]][f]; // the frame's jiggle
  const bx = x => y - dip * (x / .62); // the handle's height along it
  // the broom, shooting forward; bristles flared out behind
  broomHandle(m, L, [-.5, bx(-.5), 0], [.62, bx(.62), 0]);
  broomBristles(m, L, [-.64, bx(-.64) + .005, 0], [.2, .1, .11], { dir: [1, dip * 1.6, 0], group: 3, paint: p => p[0] < -.76 ? M.MAGIC2 : p[0] > -.5 ? M.BROOM : undefined });
  // her hands on the very front of the handle, arms straight back to her shoulders
  const hands = [-1, 1].map(side => [.5, bx(.5) + .03, side * .045]), sh = [-1, 1].map(side => [.2, y + .24 + j[1], side * .1]);
  for (const k of [0, 1]) { const side = k ? 1 : -1, g = side > 0 ? 7 : 5; m.seg(sh[k], hands[k], .04, .03, M.JACKET, { group: g }); m.ell(hands[k], [.035, .03, .035], M.SKIN, { group: g }); }
  // her body streams out behind, nearly flat: head at the front, then the chest, then the hips
  const H = [.3 + j[0], y + .27 + j[1], 0], chest = [.07, y + .28 + j[1] * .5, 0], hips = [-.15, y + .35 + j[2], 0]; // clear of the handle: only her hands touch it
  m.ell(chest, [.17, .1, .11], M.JACKET, { dir: [1, -.25, 0], group: 1, paint: p => p[1] < chest[1] - .04 && Math.abs(p[2]) < .055 ? M.TOP : undefined });
  m.ell(hips, [.11, .08, .1], M.JEANS, { dir: [1, -.3, 0], group: 1 });
  // the jacket's tail whipping back hard
  m.chain([[...v3.add(hips, [-.02, .06, 0]), .07], [...v3.add(hips, [-.18, .08 + j[0] * 2, 0]), .05], [...v3.add(hips, [-.34, .05 + j[1] * 3, .02]), .025]], M.JACKET, { group: 12 });
  // legs flapping out behind: one knee bent, one leg kicking
  const legs = [[[-.32, y + .5 + j[1] * 2, -.07], [-.46, y + .38 + j[0] * 2, -.08]], [[-.34, y + .33 + j[2] * 2, .08], [-.55, y + .44 - j[1] * 3, .1]]];
  legs.forEach(([knee, foot], k) => {
    const g = k ? 6 : 4, hip = v3.add(hips, [-.04, 0, k ? .06 : -.06]);
    m.seg(hip, knee, .055, .045, M.JEANS, { group: g }); m.seg(knee, foot, .045, .04, M.JEANS, { group: g });
    m.ell(v3.add(foot, [-.05, 0, 0]), shoeR(L), M.SHOES, { dir: [-1, .3, 0], group: g, paint: p => p[1] < foot[1] - .03 ? M.BELLY : undefined });
  });
  // her head: eyes wide, teeth gritted
  m.ell(H, [.11, .115, .1], M.SKIN, { group: 8, paint: p => (p[0] < H[0] - .01 || p[1] > H[1] + .075) ? M.HAIR : undefined });
  for (const side of [-1, 1]) { const e = Model.surface(H, [.11, .115, .1], v3.norm([.85, .1, side * .45])); m.ell(e, [.026, .036, .026], M.BELLY, { group: 8 }); m.ell(v3.add(e, [.012, 0, side * .004]), [.014, .018, .014], M.EYE, { group: 8 }); }
  m.ell(Model.surface(H, [.11, .115, .1], v3.norm([1, -.45, 0])), [.012, .016, .04], M.BELLY, { group: 8 }); // gritted teeth
  // hair streaming straight back over her
  m.chain([[...v3.add(H, [-.06, .03, 0]), .065], [...v3.add(H, [-.22, .05 + j[1] * 2, .01]), .05], [...v3.add(H, [-.4, .06 + j[2] * 3, .02]), .03], [...v3.add(H, [-.55, .07 + j[0] * 3, .02]), .012]], M.HAIR, { group: 9 });
  // headphones still on
  for (const side of [-1, 1]) m.ell(v3.add(H, [-.015, 0, side * .105]), [.05, .055, .03], M.PHONES, { group: 10 });
  m.chain([[...v3.add(H, [-.005, .03, -.095]), .015], [...v3.add(H, [-.02, .12, 0]), .015], [...v3.add(H, [-.005, .03, .095]), .015]], M.PHONES, { group: 10 });
  // the hat, nearly blown off: lifted up and tipped back, held by its chin strap
  const brim = v3.add(H, [-.1 + j[0], .2 + j[1] * 2, 0]);
  m.ell(brim, brimR(L, [.16, .014, .15]), M.HAT, { dir: [1, .9, 0], group: 11 });
  m.chain([[...v3.add(brim, [-.02, .02, 0]), .08], [...hatPt(L, brim, v3.add(brim, [-.14, .13, 0])), .04], [...hatPt(L, brim, v3.add(brim, [-.3, .14 + j[2] * 2, 0])), .012]], M.HAT, { group: 11, paint: p => Math.hypot(p[0] - brim[0], p[1] - brim[1]) < .06 * (L.hatBand ?? 1) ? M.MAGIC : undefined });
  m.seg(v3.add(brim, [.08, -.02, .08]), v3.add(H, [.04, -.09, .08]), .008, .008, M.HAT, { group: 11 }); // the chin strap, pulled taut
  m.anchors.hand = hands[1]; m.anchors.hatTip = v3.add(brim, [-.3, .14 + j[2] * 2, 0]);
  // speed: a few small streaks trailing from the bristles and from her
  for (const [x0, yy, z, len] of [[-.86, bx(-.8) + .05, .03, .22], [-.88, bx(-.8) - .04, -.04, .16], [-.7, y + .45, .05, .14], [-.2, y + .5, -.04, .12]]) {
    const o = (f * .05) % .1; m.seg([x0 - o, yy, z], [x0 - o - len, yy, z], .01, .004, M.MAGIC2, { group: 30, extra: true });
  }
  m.ell([.02, .005, 0], [.2, .005, .12], M.NOSE, { group: 0 }); // her shadow on the ground
  return m;
}

// On foot (Ed: "the witch land and hold her broomstick with one hand and gesture with the other
// for talking", and "lift sigil" and "place sigil" gestures). She stands on the ground with her
// broom in her far hand, upright like a staff, bristles down; the near hand is free.
//   stand        three frames of idle: breathing, hair and jacket stirring
//   land         from hovering to standing: astride the dipped broom, feet down; a leg swung over; the broom swung upright
//   takeoff      back again: the broom swung down; a leg over; astride it, pushing off
//   talk         four gestures: an open palm, pointing up (an idea), a wave, a hand on her chest; her head tilts between them
//   placeSigil   reaching up to the stack over her head; drawing a sigil down; crouched, palm to the ground
//   liftSigil    crouched, palm to the ground; rising with it; tossing it up into the stack
// The party (Ed: "another witch flies in to the dancefloor. At random they will: dance on their own with a variety of simple
// moves, dance with other witches, fly around in circles, run about, talk to each other, drink, hug each other, hold hands, other
// party activities"; and our witch does the same when left to idle near the dancefloor). Dancing, her broom is put down (the game
// can lean one nearby); otherwise it stays in her far hand.
//   twoStep      dance: stepping out to one side and together, then the other; fists swinging
//   bounce       dance: arms up, bouncing
//   shuffle      dance: a heel-and-toe shuffle, hips swaying
//   spin         dance: a turn on her toes, arms out (four quarter turns)
//   headbang     dance: nodding hard, hair flung forward, a finger up
//   jump         dance: crouch, a jump with her hands in the air, land
//   dancePair    paired: dancing facing a partner, palms to palms
//   holdHands    paired: side by side, holding hands (drawn heading towards: facing us)
//   hug          paired: arms round a partner, eyes shut
//   highFive     paired: a wind-up and the slap
//   laugh        social: leaning back laughing, doubled over, a slap of the thigh
//   drink        social: a cup in her hand; a sip; chatting; raised in a toast (to clink a partner's)
//   run          running about on foot, her broom in her far hand
//   sitGround    resting: sitting on the ground, leaning back on her hands, her broom lying beside her
//   stargaze     resting: lying back, hands behind her head, knees up, a foot tapping
//   conga        paired: hands on the shoulders of the witch ahead, kicking out to the sides
//   twirl        paired: twirling a partner under her raised hand (the partner does twirled: spinning on her toes, her hand up in it)
//   limboHold    the broom limbo: holding the broom level, its handle's far end to a partner (who does limboHelp: holding it); a third
//                witch does limbo: knees bent, leaning far back, arms out, shuffling under the bar
// The sigil itself is not drawn; each frame records her free hand (where a held sigil goes) and
// her hat tip as anchors. frames and a suggested fps per pose; the party's poses loop, and say what they are
// (party: dance, pair, social, move or rest); WITCH_PAIRS says how two witches meet (or three: the broom limbo).
export const WITCH_FOOT_POSES = {
  stand: { frames: 3, fps: 3 }, land: { frames: 3, fps: 10 }, takeoff: { frames: 3, fps: 10 }, talk: { frames: 4, fps: 2.5 }, placeSigil: { frames: 3, fps: 6 }, liftSigil: { frames: 3, fps: 6 }, sit: { frames: 2, fps: 1.5 },
  twoStep: { frames: 4, fps: 4, party: "dance" }, bounce: { frames: 2, fps: 4, party: "dance" }, shuffle: { frames: 4, fps: 6, party: "dance" }, spin: { frames: 4, fps: 6, party: "dance" },
  headbang: { frames: 2, fps: 4, party: "dance" }, jump: { frames: 3, fps: 5, party: "dance" },
  dancePair: { frames: 4, fps: 4, party: "pair" }, holdHands: { frames: 2, fps: 2, party: "pair" }, hug: { frames: 2, fps: 1.5, party: "pair" }, highFive: { frames: 2, fps: 3, party: "pair" },
  laugh: { frames: 3, fps: 4, party: "social" }, drink: { frames: 4, fps: 1.5, party: "social" }, run: { frames: 4, fps: 10, party: "move" },
  sitGround: { frames: 2, fps: 1, party: "rest" }, stargaze: { frames: 2, fps: 1, party: "rest" }, conga: { frames: 4, fps: 4, party: "pair" },
  twirl: { frames: 4, fps: 4, party: "pair" }, twirled: { frames: 4, fps: 4, party: "pair" }, limboHold: { frames: 2, fps: 2, party: "pair" }, limboHelp: { frames: 2, fps: 2, party: "pair" }, limbo: { frames: 4, fps: 3, party: "dance" },
};
// Two witches together: each is her own sprite, and the game puts them so that her `meet` anchor and her partner's land on
// the same pixel. mirror: the partner's sprite is flipped left-right (anchors too: x becomes w - x), so the two face each
// other; heading: the heading to draw both in ("towards", facing us, for side by side). frame: only that frame meets (the
// toast); conga: the partner ahead's `back` anchor takes this witch's `pair` (her hands on its shoulders), same way round.
// partnerPose: the partner does this pose instead (twirl: twirled; limboHold: limboHelp). third: a third witch doing that pose
// passes under the arrangement: the broom limbo's dancer moves along with her `top` anchor just below the holder's `bar` anchor.
export const WITCH_PAIRS = {
  dancePair: { meet: "pair", mirror: true }, hug: { meet: "pair", mirror: true }, highFive: { meet: "pair", mirror: true },
  holdHands: { meet: "pair", mirror: true, heading: "towards" }, drink: { meet: "pair", mirror: true, frame: 3 },
  conga: { meet: "pair", partner: "back", mirror: false },
  twirl: { meet: "pair", mirror: true, partnerPose: "twirled" },
  limboHold: { meet: "pair", mirror: true, partnerPose: "limboHelp", third: { pose: "limbo", anchor: "top", under: "bar" } },
};
// sit (with the treehouse): on the terrace chair, her broom leaning beside her, swinging her legs and looking out.
// Her seat is WITCH_SEAT_HEIGHT model units above the ground she stands on (the chair's seat; the treehouse builds its chair to match).
export const WITCH_SEAT_HEIGHT = .34;
// Each frame: crouch (0 standing, 1 squatting), bend (the spine's forward lean, radians), roll (its lean to the near side),
// hop (feet off the ground), breathe, sway (hair and jacket), tilt (the head to one side), look (up), nod (the head down),
// the free hand and its shape (and elbow), the far hand (far, farHand, farElbow) when it lets go of the broom, the feet
// ([far, near], each [x, y, z] on the ground), the broom (held upright, astride, at an angle: its binding point and
// direction; held: through her far hand, that far from the binding; null: put down), a leg swung up, a talking or
// laughing mouth, shut eyes, a cup, a turn (spinning, about the vertical), lie (lying back), and the pair anchor.
const UPRIGHT = { binding: [-.02, .31, -.2], dir: [.02, 1, -.04] };
const Q = Math.PI / 2;
// the broom limbo's bar: how high the holders hold the broom (model units; her limbo's top passes just under it)
export const LIMBO_BAR = .82;
const FOOT_FRAMES = {
  stand: [0, 1, 2].map(f => ({ breathe: [0, .006, .012][f], sway: [0, .02, .035][f], free: [.04, .5 + [0, .006, .012][f], .18], hand: "rest", broom: UPRIGHT })),
  land: [
    { crouch: .2, hop: .01, broom: { astride: true }, sway: .05 },                                                 // astride the dipped broom, feet touching down
    { crouch: .1, bend: .1, broom: { binding: [-.28, .26, -.08], dir: [.6, .5, -.06] }, legUp: [.18, .24, .12], sway: .03, free: [.2, .58, .2], hand: "rest" }, // swinging a leg over
    { breathe: .004, broom: { binding: [.06, .31, -.2], dir: [.18, 1, -.03] }, sway: .015, free: [.06, .52, .19], hand: "rest" }, // the broom swung upright
  ],
  takeoff: [
    { crouch: .1, broom: { binding: [-.1, .3, -.17], dir: [.35, .7, -.04] }, free: [.16, .58, .2], hand: "rest", sway: .02 }, // the broom swung down
    { crouch: .15, bend: .1, broom: { binding: [-.3, .28, -.06], dir: [.7, .4, -.04] }, legUp: [.1, .26, .13], sway: .04, free: [.24, .55, .17], hand: "rest" }, // a leg over
    { hop: .1, broom: { astride: true }, toes: true, sway: .06 },                                                   // astride it, pushing off
  ],
  talk: [
    { free: [.47, .84, .13], hand: "palm", tilt: .35, mouth: true, sway: .01 },                     // an open palm
    { free: [.32, 1.18, .12], hand: "point", tilt: -.25, look: .12, sway: .02 },                    // pointing up: an idea
    { free: [.24, 1.16, .3], elbow: [.26, .88, .26], hand: "wave", tilt: .45, mouth: true, sway: .03 }, // a little wave
    { free: [.15, .76, .1], hand: "chest", tilt: -.35, breathe: .01, sway: .015 },                // a hand on her chest
  ],
  placeSigil: [
    { free: [.16, 1.62, .1], hand: "palm", look: .22, breathe: .01, sway: .02 },                 // reaching up to the stack
    { free: [.42, 1.0, .12], hand: "palm", look: .08, sway: .03 },                                 // drawing a sigil down
    { crouch: .7, bend: .55, free: [.38, .1, .13], hand: "down", look: -.08, sway: .04 },          // crouched, palm to the ground
  ],
  liftSigil: [
    { crouch: .7, bend: .55, free: [.36, .08, .13], hand: "down", look: -.08, sway: .02 },         // crouched, palm to the ground
    { crouch: .25, bend: .18, free: [.44, .82, .12], hand: "palm", look: .05, sway: .04 },         // rising with it
    { breathe: .012, free: [.2, 1.64, .1], hand: "palm", look: .25, sway: .05, toes: true },     // tossing it up into the stack
  ],
  sit: [0, 1].map(f => ({ sit: true, swing: [.06, -.06][f], bend: -.08, look: [.02, .1][f], tilt: [.15, -.2][f], sway: [.01, .03][f], breathe: [0, .008][f],
    broom: { binding: [-.24, .31, -.3], dir: [.32, 1, -.06] }, free: [.2, WITCH_SEAT_HEIGHT + .14, .15], far: [.18, WITCH_SEAT_HEIGHT + .14, -.13], hand: "rest" })), // leaning back, hands on her knees
  // ---- the party ----
  twoStep: [0, 1, 2, 3].map(f => { const s = [1, 0, -1, 0][f]; return { broom: null, crouch: [.12, 0, .12, 0][f], hop: [0, .02, 0, .02][f], roll: s * .08, tilt: s * .3, sway: [.02, .035, .02, .035][f], look: .05,
    feet: [[0, .07, -.1 - (s < 0 ? .12 : 0)], [.04, .07, .1 + (s > 0 ? .12 : 0)]], free: [.18, .64 + (s > 0 ? .08 : 0), .19], elbow: [-.02, .6, .24], far: [.16, .64 + (s < 0 ? .08 : 0), -.19], farElbow: [-.02, .6, -.24] }; }),
  bounce: [0, 1].map(f => ({ broom: null, crouch: [.16, 0][f], hop: [0, .05][f], look: .18, mouth: !!f, sway: [.01, .04][f], toes: !!f,
    free: [.08, 1.15 + f * .12, .22], hand: "wave", far: [.08, 1.15 + f * .12, -.22], farHand: "wave" })),
  shuffle: [0, 1, 2, 3].map(f => { const s = [1, 0, -1, 0][f]; return { broom: null, hop: [0, .025, 0, .025][f], roll: s * .06, hipX: s * .03, tilt: -s * .2, sway: .02 + Math.abs(s) * .02,
    feet: [[s < 0 ? .12 : s > 0 ? -.06 : .02, .07 + (s ? 0 : .03), -.1], [s > 0 ? .12 : s < 0 ? -.06 : .02, .07, .1]], free: [.14 - s * .08, .56, .19], far: [.14 + s * .08, .56, -.19] }; }),
  spin: [0, 1, 2, 3].map(f => ({ broom: null, turn: f * Q, toes: true, hop: .01, sway: .06, look: .1, mouth: f === 0,
    feet: [[.02, .07, -.06], [.02, .07, .06]], free: [.02, .8, .44], hand: "palm", far: [.02, .8, -.44], farHand: "palm" })),
  headbang: [0, 1].map(f => ({ broom: null, crouch: .1, bend: [.32, .02][f], nod: [1, -.3][f], look: [-.1, .15][f], sway: [-.06, .04][f], mouth: !f,
    free: [.25, [1.0, 1.14][f], .15], hand: "point", far: [.12, .6, -.18] })),
  jump: [
    { broom: null, crouch: .35, bend: .2, free: [-.12, .42, .18], far: [-.12, .42, -.18], look: .05, sway: .01 },                           // crouched to spring
    { broom: null, hop: .2, toes: true, free: [.1, 1.3, .26], hand: "wave", far: [.1, 1.3, -.26], farHand: "wave", look: .2, mouth: true, sway: .06 }, // up, hands in the air
    { broom: null, crouch: .2, free: [.2, .95, .26], hand: "wave", far: [.2, .95, -.26], farHand: "wave", look: .1, mouth: true, sway: .03 },          // landing
  ],
  dancePair: [0, 1, 2, 3].map(f => { const s = [1, 0, -1, 0][f], y = [.86, .92, .86, .8][f]; return { broom: null, crouch: [.1, 0, .1, .04][f], roll: s * .06, tilt: s * .25, sway: .03, look: .06, mouth: f === 1,
    feet: [[s < 0 ? .06 : 0, .07, -.1], [s > 0 ? .06 : 0, .07, .1]], free: [.3, y, .14], hand: "wave", far: [.3, y, -.14], farHand: "wave", pair: [.32, y, 0] }; }),
  holdHands: [0, 1].map(f => ({ crouch: [0, .05][f], roll: [.03, -.02][f], tilt: [.2, -.1][f], sway: [.02, .035][f], look: .04, mouth: !!f, free: [.02, .5, .34], elbow: [.0, .62, .25], hand: "rest", pair: [.02, .5, .36] })),
  hug: [0, 1].map(f => ({ broom: null, bend: .1, roll: [.03, -.03][f], tilt: [.3, .2][f], shut: true, sway: [.02, .03][f],
    free: [.3, .84, .16], elbow: [.14, .78, .25], far: [.3, .84, -.16], farElbow: [.14, .78, -.25], pairAt: "chest" })),
  highFive: [
    { free: [-.05, 1.08, .18], elbow: [-.06, .86, .22], hand: "wave", tilt: -.2, look: .15, sway: .02 },          // the wind-up
    { free: [.27, 1.12, .12], hand: "wave", tilt: .2, look: .12, mouth: true, sway: .04, pair: [.3, 1.14, .12] },  // the slap
  ].map(K => ({ ...K, pair: K.pair || K.free })),
  laugh: [
    { bend: -.12, look: .2, shut: true, mouth: "laugh", free: [.13, .62, .12], hand: "chest", tilt: .2, sway: .02 },              // leaning back
    { bend: .3, crouch: .1, look: -.05, shut: true, mouth: "laugh", free: [.2, .42, .14], tilt: -.1, sway: .04 },                // doubled over
    { bend: .05, look: .1, shut: true, mouth: "laugh", free: [.1, .44, .17], hand: "down", tilt: .4, sway: .03 },                // a slap of the thigh
  ],
  drink: [
    { cup: true, free: [.2, .68, .16], hand: "rest", sway: .01, tilt: .1 },                                                       // a cup in her hand
    { cup: true, cupTip: .9, free: [.15, .9, .07], hand: "rest", look: .18, sway: .02 },                                           // a sip
    { cup: true, free: [.22, .7, .17], hand: "rest", mouth: true, tilt: -.25, sway: .015 },                                      // chatting
    { cup: true, free: [.33, .96, .12], hand: "rest", look: .12, mouth: true, sway: .03, pairAt: "cup" },                          // raised in a toast
  ],
  run: [0, 1, 2, 3].map(f => ({ bend: .25, crouch: [.1, 0, .1, 0][f], hop: [0, .04, 0, .04][f], sway: [.05, .07, .05, .07][f], look: -.04, mouth: f === 1,
    feet: [[[-.2, .2, -.1], [.08, .28, -.1], [.22, .07, -.1], [.02, .07, -.1]][f], [[.22, .07, .1], [.02, .07, .1], [-.2, .2, .1], [.08, .28, .1]][f]],
    free: [[-.1, .6, .17], [.05, .62, .17], [.2, .7, .17], [.05, .62, .17]][f], far: [[.2, .66, -.17], [.06, .62, -.17], [-.08, .6, -.17], [.06, .62, -.17]][f], broom: { dir: [1, .3, 0], held: .55 } })),
  sitGround: [0, 1].map(f => ({ sit: true, seat: .02, bend: -.35, look: [.08, .16][f], tilt: [.1, -.15][f], sway: [.01, .025][f], breathe: [0, .008][f],
    feet: [[.34, .06, -.1], [.36 + f * .03, .06 + f * .02, .1]], free: [-.2, .06, .2], hand: "down", far: [-.2, .06, -.2], broom: { binding: [.72, .03, -.3], dir: [-1, 0, .02] } })), // (its bristles past her feet)
  stargaze: [0, 1].map(f => ({ broom: null, lie: Q, look: [.08, .02][f], tilt: [.15, -.1][f], sway: .01, breathe: [0, .008][f],
    feet: [[-.06, .2, -.1], [-.06 + f * .02, .2 + f * .05, .1]], free: [-.12, 1.0, .12], elbow: [.02, .98, .27], far: [-.12, 1.0, -.12], farElbow: [.02, .98, -.27] })),
  conga: [0, 1, 2, 3].map(f => { const s = [0, 1, 0, -1][f]; return { broom: null, hop: [.02, 0, .02, 0][f], roll: s * .07, tilt: s * .2, sway: .03, mouth: f === 0, look: .05,
    feet: [[0, .07 + (s < 0 ? .14 : 0), -.1 - (s < 0 ? .2 : 0)], [0, .07 + (s > 0 ? .14 : 0), .1 + (s > 0 ? .2 : 0)]], free: [.36, .82, .13], far: [.36, .82, -.13], pair: [.36, .82, 0], backAt: true }; }),
  twirl: [0, 1, 2, 3].map(f => { const a = f * Math.PI / 2, hand = [.32 + Math.cos(a) * .03, 1.12, .08 + Math.sin(a) * .03]; return { broom: null, roll: -.04, tilt: [.2, .1, -.1, .1][f], look: .15, sway: .02, mouth: f === 2,
    free: hand, hand: "grip", elbow: [.14, .98, .2], far: [.02, .6, -.2], farElbow: [-.08, .66, -.24], pair: hand }; }), // her hand circling a little over the partner's head
  twirled: [0, 1, 2, 3].map(f => ({ broom: null, turn: f * Q, toes: true, hop: .015, sway: .06, look: .12, mouth: f === 0, feet: [[.02, .07, -.05], [.02, .07, .05]],
    free: [0, 1.26, 0], elbow: [.0, 1.02, .14], hand: "grip", far: [.04, .76, -.4], farHand: "palm", pair: [0, 1.26, 0] })), // her hand straight up, over her middle, so it stays put as she turns
  limboHold: [0, 1].map(f => ({ broom: { binding: [.42, LIMBO_BAR, 0], dir: [1, 0, 0] }, roll: [.02, -.02][f], tilt: [.15, -.1][f], look: .02, sway: .02, mouth: !!f,
    free: [.45, LIMBO_BAR, .06], hand: "grip", far: [-.04, .52, -.17], pair: [1.45, LIMBO_BAR, 0], bar: [.97, LIMBO_BAR, 0] })), // her far hand on her hip
  limboHelp: [0, 1].map(f => ({ broom: null, roll: [-.02, .02][f], tilt: [-.1, .15][f], look: .02, sway: .02, mouth: !f,
    free: [.3, LIMBO_BAR, .06], hand: "grip", far: [-.04, .52, -.17], pair: [.3, LIMBO_BAR, .06] })),
  limbo: [0, 1, 2, 3].map(f => ({ broom: null, crouch: .62, limbo: 1.12 + [0, .05, 0, -.04][f], look: .3, sway: .02, mouth: f === 1,
    feet: [[.26 + [0, .05, .08, .03][f], .07, -.1], [.26 + [.08, .03, 0, .05][f], .07, .1]], free: [.0, .82 + [0, .03, 0, -.03][f], .44], hand: "palm", far: [.0, .82 - [0, .03, 0, -.03][f], -.44], farHand: "palm" })), // arms out for balance, shuffling forward
};
// the knee between a hip and a foot, bent forward
function kneeOf(hip, foot, l) {
  const d = Math.hypot(foot[0] - hip[0], foot[1] - hip[1]), mid = v3.lerp(hip, foot, .5);
  if (d >= 2 * l) return mid;
  const off = Math.sqrt(l * l - d * d / 4), vx = (foot[0] - hip[0]) / d, vy = (foot[1] - hip[1]) / d;
  return [mid[0] - vy * off, mid[1] + vx * off, mid[2]];
}
function footModel(pose, frame, L = DEFAULT_LOOK) {
  const fr = FOOT_FRAMES[pose], K = { crouch: 0, bend: 0, roll: 0, hop: 0, breathe: 0, sway: 0, tilt: 0, look: 0, nod: 0, broom: UPRIGHT, ...fr[frame % fr.length] };
  const m = new Model({ blend: .03 }), hop = K.hop, sway = K.sway;
  const hipY = K.sit ? (K.seat ?? WITCH_SEAT_HEIGHT) + .06 : .45 - K.crouch * .21 + hop, hipX = -K.crouch * .12 + (K.hipX || 0);
  // the broom: astride it (the handle level between her legs), a binding point and a direction, through her far hand, or put down
  const B = K.broom, astride = !!(B && B.astride), yb = hipY - .04;
  const bdir = !B || astride ? [1, 0, 0] : v3.norm(B.dir), bind = astride ? [-.36, yb, 0] : !B ? null : B.held !== undefined ? v3.sub(K.far, v3.mul(bdir, B.held)) : B.binding;
  const along = t => v3.add(bind, v3.mul(bdir, t));
  if (B) {
    broomHandle(m, L, along(0), along(astride ? .98 : 1.1));
    broomBristles(m, L, along(-.13), [.17, .07, .08], { dir: bdir, group: 3, paint: p => { const t = v3.dot(v3.sub(p, bind), bdir); return t < -.22 ? M.MAGIC2 : t > -.01 ? M.BROOM : undefined; } });
  }
  // legs: jeans to the knee, then down to sneakers; one swung up over the broom; on her toes pushing off; or each foot placed
  for (const side of [-1, 1]) {
    const g = side > 0 ? 6 : 4, hip = [hipX, hipY, side * .07], given = K.feet && K.feet[side > 0 ? 1 : 0];
    const swing = K.sit ? K.swing * side : 0; // sitting: her legs over the seat's edge, swinging one forward, one back
    const foot = given ? [given[0], given[1] + hop, given[2]] : K.sit ? [.24 + swing, .09 + Math.max(0, swing) * .6, side * .1] : side > 0 && K.legUp ? K.legUp : [(side > 0 ? .05 : -.01) + (K.toes ? -.03 : 0), .07 + (K.toes ? hop * .4 : hop), side * .1];
    const knee = K.sit && !given ? [.21, hipY + .01, side * .09] : kneeOf(hip, foot, .21);
    m.seg(hip, knee, .055, .045, M.JEANS, { group: g }); m.seg(knee, foot, .045, .04, M.JEANS, { group: g });
    const toe = K.toes ? [.03, -.045, 0] : [.05, -.03, 0];
    m.ell(v3.add(foot, toe), shoeR(L), M.SHOES, { dir: K.toes ? [1, -.6, 0] : [1, 0, 0], group: g, paint: p => p[1] < foot[1] + toe[1] - .015 ? M.BELLY : undefined });
  }
  // body: hips in jeans, a top under an open jacket (or a party top), leaning with the spine
  const spine = v3.norm([Math.sin(K.bend), Math.cos(K.bend), Math.sin(K.roll)]), fwd = [Math.cos(K.bend), -Math.sin(K.bend), 0];
  const hips = [hipX, hipY + .03, 0]; m.ell(hips, [.1, .08, .105], M.JEANS, { group: 1 });
  const chest = v3.add(hips, v3.add(v3.mul(spine, .19), [0, K.breathe, 0]));
  m.ell(chest, [.1, .15 + K.breathe * .5, .115], M.JACKET, { dir: fwd, group: 1, paint: torsoPaint(L, chest, fwd) });
  // the jacket's hem hanging behind, stirring (a poncho or a cape instead)
  if (L.top !== "poncho" && L.top !== "cape") m.chain([[...v3.add(chest, v3.add(v3.mul(fwd, -.07), v3.mul(spine, -.08))), .07], [...v3.add(chest, v3.add(v3.mul(fwd, -.11 - sway), v3.mul(spine, -.2))), .05], [...v3.add(chest, v3.add(v3.mul(fwd, -.13 - sway * 1.6), v3.mul(spine, -.29))), .025]], M.JACKET, { group: 12 });
  drawWrap(m, L, chest, fwd, spine, false);
  // head: tilted to one side, looking up or down, nodding
  const H = v3.add(chest, v3.add(v3.mul(spine, .27), [K.look * .03 + K.nod * .07, -K.nod * .05, K.tilt * .04]));
  // arms: the far hand grips the broom (or not); the near hand is free (or on the handle, astride)
  const shoulder = side => v3.add(chest, v3.add(v3.mul(spine, .1), [0, 0, side * .12]));
  const grip = astride ? [.28, yb + .03, -.05] : B ? along(Math.max(.12, (Math.min(.62, hipY + .2) - bind[1]) / Math.max(.3, bdir[1]))) : null;
  const free = astride ? [.28, yb + .03, .05] : K.free;
  for (const side of [-1, 1]) {
    const g = side > 0 ? 7 : 5, sh = shoulder(side), hand = side > 0 ? free : K.far || grip;
    const elbow = side > 0 && K.elbow ? K.elbow : side < 0 && K.farElbow ? K.farElbow : v3.add(v3.lerp(sh, hand, .5), [-.03, -.02, side * .05]);
    m.seg(sh, elbow, .04, .035, M.JACKET, { group: g }); m.seg(elbow, hand, .035, .03, M.JACKET, { group: g });
    drawHand(m, side > 0 ? (astride ? "grip" : K.hand) : K.farHand || "grip", hand, g);
    drawGlowsticks(m, L, elbow, hand, side, g);
  }
  // a party cup in her free hand (tipped to her lips when she sips)
  if (K.cup) {
    const up = v3.norm([-(K.cupTip || 0), 1, 0]), base = v3.add(free, v3.mul(up, -.03)), rim = v3.add(base, v3.mul(up, .12));
    m.seg(base, rim, .034, .046, M.ACCENT, { group: 14 }); m.ell(rim, [.046, .01, .046], M.BELLY, { dir: [up[1], -up[0], 0], up, group: 14 });
    m.anchors.cup = rim;
  }
  // face, hair, headphones and hat (as in flight, but the hair hangs down her back; flung forward when she nods)
  m.ell(H, [.11, .115, .1], M.SKIN, { group: 8, paint: p => (p[0] < H[0] - .01 || p[1] > H[1] + .075) ? M.HAIR : undefined });
  drawEyes(m, L, H, K.look, K.tilt, K.shut);
  if (K.mouth) m.ell(Model.surface(H, [.11, .115, .1], v3.norm([1, -.5 + K.look, K.tilt * .1])), K.mouth === "laugh" ? [.014, .026, .035] : [.012, .016, .025], M.NOSE, { group: 8 }); // talking; laughing
  const nod = Math.max(0, K.nod);
  drawHair(m, L, H, [[...v3.add(H, [-.06, .02, 0]), .06], [...v3.add(H, [-.12 - sway + nod * .2, -.12 + nod * .04, .02 + K.tilt * .03]), .05], [...v3.add(H, [-.13 - sway * 1.5 + nod * .38, -.25 + nod * .08, .03 + K.tilt * .04]), .03]]);
  if (L.phones) {
    for (const side of [-1, 1]) m.ell(v3.add(H, [-.015, 0, side * .105]), [.05, .055, .03], M.PHONES, { group: 10 });
    m.chain([[...v3.add(H, [-.005, .03, -.095]), .015], [...v3.add(H, [-.005, .11, -.05]), .015], [...v3.add(H, [-.005, .125, 0]), .015], [...v3.add(H, [-.005, .11, .05]), .015], [...v3.add(H, [-.005, .03, .095]), .015]], M.PHONES, { group: 10 });
  }
  const brim = v3.add(H, [-.03 + K.nod * .03, .1 - K.nod * .02, K.tilt * .02]), tz = K.tilt * .05;
  const tip = drawHat(m, L, brim, [1, .25 - K.look * .8 - K.nod * .7, K.tilt * .3], v3.add(brim, [-.05 + K.nod * .05, .17, tz]), v3.add(brim, [-.16 - sway * .5 + K.nod * .12, .27 - K.nod * .04, tz * 2]));
  m.anchors.hand = free; m.anchors.hatTip = tip;
  // where a partner meets her (WITCH_PAIRS): a given point, her chest's front (a hug), her cup (a toast); and, in the conga, her back (where the next witch's hands go)
  if (K.pair) m.anchors.pair = K.pair;
  if (K.pairAt === "chest") m.anchors.pair = v3.add(chest, v3.mul(fwd, .11));
  if (K.pairAt === "cup") m.anchors.pair = m.anchors.cup;
  if (K.backAt) m.anchors.back = [shoulder(1)[0], K.free[1], 0];
  // spinning, she turns about her middle; lying back, she tips over onto the ground
  if (K.bar) m.anchors.bar = K.bar;
  if (K.turn) turnModel(m, "y", K.turn, [hipX, 0, 0]);
  // the limbo: everything above her hips leans far back over her bent legs; her top is the highest point of her (what passes under the bar)
  if (K.limbo) {
    turnModel(m, "z", K.limbo, hips, q => q.group !== 4 && q.group !== 6);
    let top = null; for (const q of m.parts) { if (q.extra) continue; for (const [p, r] of q.type === "cone" ? [[q.a, q.r1], [q.b, q.r2]] : [[q.c, Math.max(...q.r)]]) if (!top || p[1] + r > top[1]) top = [p[0], p[1] + r, 0]; }
    m.anchors.top = top;
  }
  if (K.lie) { turnModel(m, "z", K.lie, hips); restOn(m, .015); }
  m.ell([.02, .005, 0], [.2, .005, .12], M.NOSE, { group: 0 }); // her shadow at her feet
  if (K.lie) Object.assign(m.parts[m.parts.length - 1], { c: [-.18, .005, 0], r: [.45, .005, .14] }); // (all of her, lying down)
  return m;
}

// Her flight poses and their frames, with a suggested fps: hover (the gentle bob), lean (Ed: her ordinary flying speed at
// ground level: a cycle of legs kicking, jacket tail and hair fluttering, the broom bobbing and its bristles flickering; it
// loops, so the game can play it faster with speed), rise, descend, fast and brake. (`lean: true` alone is the one lean frame.)
export const WITCH_FLIGHT_POSES = { hover: { frames: 3, fps: 3 }, lean: { frames: 4, fps: 8 }, rise: { frames: 2, fps: 6 }, descend: { frames: 2, fps: 6 }, fast: { frames: 3, fps: 12 }, brake: { frames: 2, fps: 8 } };
export function witchModel({ frame = 0, lean = false, pose, look = DEFAULT_LOOK } = {}) {
  const LK = { ...DEFAULT_LOOK, ...look, frame }; // (what flutters or turns does so with the frame: a long cloak and scarf, the broom's moving bits)
  if (pose === "fast") return fastModel(frame, LK);
  if (WITCH_FOOT_POSES[pose]) return footModel(pose, frame, LK);
  const cyc = pose === "lean" ? frame % 4 : -1; if (cyc >= 0) { lean = true; pose = undefined; } // the lean cycle
  const rise = pose === "rise", desc = pose === "descend", brake = pose === "brake", posed = rise || desc || brake;
  const m = new Model({ blend: .03 }), bob = posed ? 0 : cyc >= 0 ? [0, .012, .02, .01][cyc] : [0, .025, .045][frame % 3], tilt = posed ? 0 : cyc >= 0 ? .08 + [0, .012, .004, -.006][cyc] : [0, .015, -.01][frame % 3] + (lean ? .08 : 0);
  // the broom's height; how far she leans forward on it (back, braking). Posed, she leans well into it, so that
  // once the broom tilts she still sits near upright: leaning into the climb, or back against the drop
  const y = .42 + bob, L = rise ? .3 : desc ? -.27 : brake ? -.12 : lean ? .1 : 0; // braking, she leans back hard (the skid tips her back further)
  const Lh = Math.min(.1, Math.max(0, L)); // how far her hair and hat stream back with the lean (never more than the fast-flight lean)
  const sway = posed ? [.02, .06][frame % 2] : cyc >= 0 ? [.01, .04, .06, .03][cyc] : [0, .03, .05][frame % 3], flow = desc ? 1 : rise ? -.6 : 0; // hair and jacket: up when dropping, down when climbing (in the broom's frame)
  // the broom: a long handle, bristles bound at the back, glowing at their tips
  broomHandle(m, LK, [-.5, y - tilt * 2, 0], [.62, y + tilt * 3, 0]);
  if (brake) broomBristles(m, LK, [-.56, y - .08, 0], [.17, .07, .09], { dir: [.55, 1, 0], group: 3, paint: p => p[1] < y - .18 ? M.MAGIC2 : p[1] > y - .01 ? M.BROOM : undefined }); // skidding: the bristles swing forward and down under her, like reins hauled in
  else { const fl = cyc >= 0 ? [0, .035, -.015, .05][cyc] : 0; broomBristles(m, LK, [-.62, y - tilt * 2 - .01, 0], [.17, .07, .08], { dir: [1, tilt, 0], group: 3, paint: p => p[0] < -.72 + fl ? M.MAGIC2 : cyc >= 0 && p[0] < -.66 + fl ? M.MAGIC : p[0] > -.5 ? M.BROOM : undefined }); } // leaning along, the bristles' glow flickers
  // legs astride: jeans to the knee, then down to sneakers (reaching down and forward to land)
  for (const side of [-1, 1]) {
    const kick = cyc >= 0 ? [[0, 0], [.07, .04], [.01, .015], [-.06, -.015]][(cyc + (side > 0 ? 0 : 2)) % 4] : [0, 0]; // leaning along, her legs kick in turn
    const hip = [-.04, y + .06, side * .07], knee = brake ? [.18, y - .01, side * .14] : desc ? [.16, y - .05, side * .14] : rise ? [.06, y - .07, side * .14] : [.12 + L * .5, y - .02, side * .14], foot = brake ? (side > 0 ? [.44, y - .02 + sway, side * .13] : [.3, y - .16, side * .13]) : desc ? [.2, y - .26, side * .13] : rise ? [-.1, y - .23, side * .13] : [.08 + L + kick[0], y - .2 + kick[1], side * .13]; // climbing, her legs tuck back and dangle
    m.seg(hip, knee, .055, .045, M.JEANS, { group: side > 0 ? 6 : 4 });
    m.seg(knee, foot, .045, .04, M.JEANS, { group: side > 0 ? 6 : 4 });
    m.ell(v3.add(foot, [.05, -.02, 0]), shoeR(look), M.SHOES, { group: side > 0 ? 6 : 4, paint: p => p[1] < foot[1] - .04 ? M.BELLY : undefined });
  }
  // body: a top under an open jacket; hips in jeans
  m.ell([-.04, y + .08, 0], [.11, .07, .1], M.JEANS, { group: 1 });
  const chest = [.0 + L * .8, y + .26 - Math.abs(L) * .3, 0];
  const tp = LK.top === "jacket" || LK.top === "poncho" || LK.top === "cape" ? p => p[0] > chest[0] + .04 && Math.abs(p[2]) < .055 ? M.TOP : undefined : torsoPaint(LK, chest, [1, 0, 0]);
  m.ell(chest, [.1, .16, .11], M.JACKET, { dir: [L * 2.5, 1, 0], up: [-1, 0, 0], group: 1, paint: tp });
  drawWrap(m, LK, chest, [1, 0, 0], v3.norm([L, 1, 0]), true);
  // in flight the jacket's tail flaps out behind her
  const flap = cyc >= 0 ? [-.02, .05, .09, .03][cyc] : 0; // leaning along, the tail flutters up and down
  if (brake) m.chain([[...v3.add(chest, [-.08, -.06, 0]), .07], [...v3.add(chest, [-.02, .12 + sway, .02]), .05], [...v3.add(chest, [.14, .18 + sway, .03]), .025]], M.JACKET, { group: 12 }); // swinging forward past her with the sudden stop
  else if ((posed || cyc >= 0) && LK.top !== "cape") m.chain([[...v3.add(chest, [-.08, -.1, 0]), .07], [...v3.add(chest, [-.2, -.12 + (cyc >= 0 ? flap * .5 : flow * (.08 + sway)), 0]), .05], [...v3.add(chest, [-.3 - (cyc >= 0 ? .03 : 0), -.12 + (cyc >= 0 ? flap : flow * (.16 + sway * 1.5)), .02]), .025]], M.JACKET, { group: 12 });
  // head (needed for the hand on the hat)
  const H = v3.add(chest, [.03 + L * .5, .26, 0]), brim = v3.add(H, [brake ? .05 : desc ? -.01 : -.03, brake ? .06 : .1, 0]);
  // arms: shoulders to hands on the broom handle; descending, the near hand holds her hat on
  for (const side of [-1, 1]) {
    const sh = v3.add(chest, [.01, .11, side * .11]), hand = desc && side > 0 ? v3.add(brim, [.1, .01, .1]) : brake ? [.3, y + .03, side * .05] : [.26 + L, y + .03, side * .05]; // braking: arms straight, hauling on the handle
    const elbow = desc && side > 0 ? v3.add(sh, [.1, .02, .1]) : v3.lerp(sh, hand, .5);
    m.seg(sh, elbow, .04, .035, M.JACKET, { group: side > 0 ? 7 : 5 });
    m.seg(elbow, hand, .035, .03, M.JACKET, { group: side > 0 ? 7 : 5 });
    m.ell(hand, [.035, .03, .035], M.SKIN, { group: side > 0 ? 7 : 5 });
    drawGlowsticks(m, LK, elbow, hand, side, side > 0 ? 7 : 5);
    if (side > 0) m.anchors.hand = hand; // her near hand (in flight it holds the broom; a sigil can still hang from it)
  }
  // head, face and hair
  m.ell(H, [.11, .115, .1], M.SKIN, { group: 8, paint: p => (p[0] < H[0] - .01 || p[1] > H[1] + .075) ? M.HAIR : undefined });
  drawEyes(m, LK, H);
  // hair trailing out behind, swaying with the bob (streaming down while climbing, up while dropping)
  const tail = brake ? [[...v3.add(H, [-.06, .06, 0]), .06], [...v3.add(H, [.04, .13 + sway, .03]), .045], [...v3.add(H, [.2, .08 + sway, .04]), .02]] : [[...v3.add(H, [-.06, .02, 0]), .06], [...v3.add(H, [-.18 - Lh, -.05 + sway + flow * .1, .02]), .045], [...v3.add(H, [-.3 - Lh * 1.5, -.08 + sway * 1.6 + flow * .22, .03]), .02]]; // flung forward over her head
  drawHair(m, LK, H, tail);
  // headphones: cups over the ears and a band across the top of the head
  if (LK.phones) {
    for (const side of [-1, 1]) m.ell(v3.add(H, [-.015, 0, side * .105]), [.05, .055, .03], M.PHONES, { group: 10 });
    m.chain([[...v3.add(H, [-.005, .03, -.095]), .015], [...v3.add(H, [-.005, .11, -.05]), .015], [...v3.add(H, [-.005, .125, 0]), .015], [...v3.add(H, [-.005, .11, .05]), .015], [...v3.add(H, [-.005, .03, .095]), .015]], M.PHONES, { group: 10 });
  }
  // the hat: a wide brim and a tall crown, its tip bent back (pushed further back by the climb)
  const back = rise ? .1 : 0;
  // braking, it tips forward over her eyes; its tip is where the sigil stack hangs over her
  m.anchors.hatTip = drawHat(m, LK, brim, brake ? [1, -.55, 0] : [1, .25 + back * 3, 0], brake ? v3.add(brim, [.06, .16, 0]) : v3.add(brim, [-.05 - Lh - back * .5, .17 - back * .3, 0]), brake ? v3.add(brim, [.2, .22 + sway * .5, 0]) : v3.add(brim, [-.16 - Lh * 1.5 - back, .27 + sway * .5 - back * .5, 0]));
  if (posed) {
    // tilt the whole witch and broom about the broom's middle
    const a = WITCH_POSES[pose] + (brake ? [0, .06][frame % 2] : 0), c = Math.cos(a), sn = Math.sin(a), P = [0, y, 0];
    const rot = q => [P[0] + (q[0] - P[0]) * c - (q[1] - P[1]) * sn, P[1] + (q[0] - P[0]) * sn + (q[1] - P[1]) * c, q[2]];
    const unrot = q => [P[0] + (q[0] - P[0]) * c + (q[1] - P[1]) * sn, P[1] - (q[0] - P[0]) * sn + (q[1] - P[1]) * c, q[2]];
    const dir = q => [q[0] * c - q[1] * sn, q[0] * sn + q[1] * c, q[2]];
    for (const q of m.parts) {
      if (q.type === "ell") { q.c = rot(q.c); q.axes = q.axes.map(dir); } else { q.a = rot(q.a); q.b = rot(q.b); }
      if (q.paint) { const f = q.paint; q.paint = (p, part) => f(unrot(p), part); } // markings stay where they were painted
    }
    for (const f of m.flats) { f.c = rot(f.c); f.u = dir(f.u); f.v = dir(f.v); }
    m.anchors.hand = rot(m.anchors.hand); m.anchors.hatTip = rot(m.anchors.hatTip);
    // lifted so her feet clear the ground as she tilts
    const low = Math.min(...m.parts.filter(q => !q.extra).map(q => q.type === "ell" ? q.c[1] - Math.max(...q.r) : Math.min(q.a[1] - q.r1, q.b[1] - q.r2)));
    if (low < .08) { for (const q of m.parts) { const d = .08 - low; if (q.type === "ell") q.c = [q.c[0], q.c[1] + d, q.c[2]]; else { q.a = [q.a[0], q.a[1] + d, q.a[2]]; q.b = [q.b[0], q.b[1] + d, q.b[2]]; } } for (const k of ["hand", "hatTip"]) m.anchors[k] = v3.add(m.anchors[k], [0, .08 - low, 0]); }
    // rising: sparks and a puff falling from the bristles
    // braking: a puff of dust and sparks kicked forward from the bristles
    if (brake) { const tail = rot([-.45, y - .24, 0]); for (let i = 0; i < 5; i++) { const k = i + frame * .5, r = .055 - i * .008; m.ell([tail[0] + .1 + k * .08, Math.max(.04, tail[1] - .02 + Math.sin(k * 1.9) * .04), Math.cos(k * 1.3) * .06], [r, r * .8, r], i < 2 ? M.BELLY : i % 2 ? M.MAGIC : M.MAGIC2, { group: 25 + i, extra: true }); } }
    if (rise) { const tail = rot([-.8, y, 0]); for (let i = 0; i < 5; i++) { const k = i + frame * .5, r = .05 - i * .007; m.ell([tail[0] - .02 + Math.sin(k * 2.1) * .06, Math.max(.04, tail[1] - .08 - k * .09), Math.cos(k * 1.7) * .05], [r, r, r], i % 2 ? M.MAGIC : M.MAGIC2, { group: 20 + i, extra: true }); } }
  }
  // her shadow on the ground: she flies
  m.ell([.02, .005, 0], [.2, .005, .12], M.NOSE, { group: 0 });
  return m;
}

// The witch about as tall as a young creature, so she reads clearly over the ground.
export const witchHeight = (st = {}) => Math.round((st.size || 8) * Math.sqrt(st.growth || 20) * (2 / (st.pixel || 3)) * 1.9);
// The flight poses are drawn at the same pixel scale as her ordinary hover (not fitted to a height).
const scaleCache = new Map();
const ownScaleCache = new Map(), ownScale = (h, frame, lean, facing) => { const k = [h, frame, lean, facing].join(); if (!ownScaleCache.has(k)) ownScaleCache.set(k, render(witchModel({ frame, lean }), { height: h, facing, measure: true }).s); return ownScaleCache.get(k); };
const witchScale = h => { if (!scaleCache.has(h)) scaleCache.set(h, render(witchModel({ frame: 0 }), { height: h }).s); return scaleCache.get(h); };
// pixels per model unit at her ordinary scale, for things built to her size (the treehouse)
export const witchPixelsPerUnit = (st = {}) => witchScale(witchHeight(st));
// heading (Ed: "straight up" and "straight down" movement): "side" (the default, the broom across the screen, turned
// towards or away by facing), "away" (flying straight up the screen, into it: seen from behind, the broom foreshortened
// with its bristles towards us, her hair, jacket and hat tip streaming back at us) or "towards" (straight down the screen,
// at us: the handle's tip nearest, her face over it). Any frame, lean or flight pose (fast, brake) can be turned so, at her
// ordinary scale. Every flight frame carries anchors: her near hand and her hat tip (where the sigil stack hangs).
export const WITCH_HEADINGS = { away: -Math.PI / 2, towards: Math.PI / 2 };
// look: a party look (DEFAULT_LOOK's keys; partyWitch gives one). Anchors, in pixels from the top-left: hand and hatTip on
// every sprite; on foot also pair (where a partner meets her, WITCH_PAIRS), back (the conga) and cup (drinking).
export function witchSprite(st = {}, { frame = 0, lean = false, facing = "towards", pose, heading = "side", look } = {}) {
  const h = witchHeight(st), yaw = WITCH_HEADINGS[heading];
  const model = witchModel({ frame, lean, pose, look }), { sp, project, s } = yaw !== undefined ? render(model, { scale: witchScale(h), yaw }) : pose ? render(model, { scale: witchScale(h), facing }) : look && look !== DEFAULT_LOOK ? render(model, { scale: ownScale(h, frame, lean, facing), facing }) : render(model, { height: h, facing }); // (another look at the scale she has in that pose, so a tall hat doesn't shrink her)
  sp.scale = s; // pixels per model unit
  if (model.anchors.hand) sp.anchors = Object.fromEntries(Object.entries(model.anchors).filter(([k]) => k !== "feet").map(([k, p]) => [k, project(p)]));
  cleanFlecks(sp); // (Ed: "The witch has these little flecks … we should remove them")
  return sp;
}
// Her hat lying on the ground where she was knocked out (Ed, 2026-10-06: "when you are killed, you drop your hat"): her
// own hat (the look's shape, sizes and colours) alone, at her ordinary scale, sitting on its brim, knocked a little askew.
// Null for a look with no hat. Its brim's middle is the bottom of the sprite, where it lies.
export function witchHatSprite(st = {}, { look, facing = "towards" } = {}) {
  const L = { ...DEFAULT_LOOK, ...look };
  if (!L.hat || L.hat === "none") return null;
  const m = new Model({ blend: .03 }), brim = [0, .02, 0];
  drawHat(m, L, brim, [1, .12, .18], v3.add(brim, [.02, .17, .01]), v3.add(brim, [-.1, .28, .03]));
  const { sp, s } = render(m, { scale: witchScale(witchHeight(st)), facing });
  sp.scale = s;
  cleanFlecks(sp);
  return sp;
}
// The flecks: a pixel with none of its own material among its 8 neighbours (a stray interior-line dot, a lone speck of
// hatband or hair) takes its neighbours' commonest material; alone, it goes; so does an interior line one or two pixels
// long. Eyes (unless one pokes out past her face's edge), their glints and her mouth are kept.
const FLECK_KEEP = new Set([M.EYE, M.GLINT, M.NOSE]);
export function cleanFlecks(sp) {
  let n = 0;
  for (let pass = 0; pass < 3; pass++) { const k = lineDots(sp) + lonePixels(sp); n += k; if (!k) break; } // (a line dot that melts can leave a lone pixel)
  return n;
}
// The commonest material of the 8 pixels round (x, y) in m, leaving out `not`.
function commonest(m, w, h, x, y, not) {
  const count = new Map(); let best = 0, bn = 0;
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const X = x + dx, Y = y + dy; if ((!dx && !dy) || X < 0 || Y < 0 || X >= w || Y >= h) continue; const v = m[Y * w + X]; if (v && !not(v)) count.set(v, (count.get(v) || 0) + 1); }
  for (const [v, c] of count) if (c > bn) { best = v; bn = c; }
  return best;
}
function lineDots(sp) { // interior lines one or two pixels long
  const { w, h } = sp, m1 = sp.m.slice(), seen = new Uint8Array(w * h); let n = 0;
  for (let i = 0; i < w * h; i++) {
    if (m1[i] !== M.LINE || seen[i]) continue;
    const run = [i], todo = [i]; seen[i] = 1;
    while (todo.length) { const j = todo.pop(), x = j % w, y = (j / w) | 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const X = x + dx, Y = y + dy, k = Y * w + X; if (X >= 0 && Y >= 0 && X < w && Y < h && !seen[k] && m1[k] === M.LINE) { seen[k] = 1; run.push(k); todo.push(k); } } }
    if (run.length > 2) continue;
    for (const j of run) { const best = commonest(m1, w, h, j % w, (j / w) | 0, v => v === M.LINE || FLECK_KEEP.has(v)); if (best) { sp.m[j] = best; n++; } }
  }
  return n;
}
function lonePixels(sp) { // none of its own material round it (or an eye poking out past her face's edge)
  const { w, h } = sp, m0 = sp.m.slice(); let n = 0;
  const empties = (x, y) => [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => { const X = x + dx, Y = y + dy; return X < 0 || Y < 0 || X >= w || Y >= h || !m0[Y * w + X]; }).length;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x, m = m0[i]; if (!m) continue;
    const eyeOut = m === M.EYE && empties(x, y) >= 2;
    if (FLECK_KEEP.has(m) && !eyeOut) continue;
    let same = false; for (let dy = -1; dy <= 1 && !same; dy++) for (let dx = -1; dx <= 1; dx++) { const X = x + dx, Y = y + dy; if ((dx || dy) && X >= 0 && Y >= 0 && X < w && Y < h && m0[Y * w + X] === m) { same = true; break; } }
    if (same && !eyeOut) continue;
    if (empties(x, y) === 4) { sp.m[i] = 0; sp.g[i] = 0; sp.n.fill(0, i * 3, i * 3 + 3); n++; continue; }
    const best = commonest(m0, w, h, x, y, v => FLECK_KEEP.has(v) || v === m);
    if (best) { sp.m[i] = best; n++; }
  }
  return n;
}

// ---- party witches (Ed: "They look similar to our character but with a variety of party outfits and different colours") ----
// Each outfit: a look (its shapes) and a palette (hue, saturation, value per part, as DEFAULT_OUTFIT); her skin, and her hair
// unless the outfit dyes it, are picked by partyWitch.
const PARTY_NEONS = [[.88, .75, 1], [.33, .8, 1], [.52, .75, 1], [.13, .8, 1], [.78, .7, 1], [.02, .75, 1]]; // party neons: pink, green, cyan, yellow, violet, red
export const PARTY_OUTFITS = [
  { id: "raver", name: "Raver", look: { hat: "crooked", hair: "long", top: "mesh", shades: true, glowsticks: true },
    outfit: { hat: [.86, .7, .55], top: [.0, .0, .12], jacket: [.86, .6, .7], jeans: [.62, .3, .25], sneakers: [.52, .5, .95], headphones: [.33, .7, .9], shades: [.0, .0, .1], frame: [.86, .7, 1] } },
  { id: "flowerChild", name: "Flower child", look: { hat: "flowers", hair: "long", top: "poncho", phones: false },
    outfit: { hat: [.08, .45, .5], jacket: [.07, .5, .75], trim: [.95, .55, .85], pattern: [.15, .55, .95], jeans: [.58, .35, .75], sneakers: [.08, .35, .6], flower: [.95, .45, .98], flower2: [.15, .6, 1] } },
  { id: "disco", name: "Disco", look: { hat: "classic", hair: "bob", top: "sequins", shades: true },
    outfit: { hat: [.75, .5, .35], top: [.12, .55, .8], pattern: [.13, .2, 1], jacket: [.12, .45, .65], jeans: [.75, .4, .5], sneakers: [.13, .6, .9], frame: [.13, .6, .95] } },
  { id: "punk", name: "Punk", look: { hat: "small", hair: "mohawk", top: "jacket", glowsticks: true },
    outfit: { hat: [.0, .0, .15], top: [.0, .0, .9], jacket: [.0, .05, .18], jeans: [.0, .7, .55], sneakers: [.0, .0, .12], headphones: [.0, .75, .85] }, hair: [.88, .7, .95] },
  { id: "festival", name: "Festival", look: { hat: "floppy", hair: "buns", top: "cape" },
    outfit: { hat: [.1, .35, .6], top: [.5, .35, .9], jacket: [.55, .55, .55], jeans: [.62, .25, .8], sneakers: [.1, .3, .45] } },
  { id: "catHat", name: "Cat hat", look: { hat: "bucket", hair: "bob", top: "jacket", glowsticks: true },
    outfit: { hat: [.82, .35, .75], top: [.0, .0, .95], jacket: [.52, .4, .75], jeans: [.62, .45, .35], sneakers: [.82, .4, .95], headphones: [.13, .7, 1] } },
  { id: "glam", name: "Glam", look: { hat: "crooked", hair: "buns", top: "sequins", phones: false },
    outfit: { hat: [.62, .1, .85], top: [.6, .08, .78], pattern: [.6, .02, 1], jacket: [.62, .12, .6], jeans: [.62, .1, .35], sneakers: [.62, .05, .95] }, hair: [.6, .05, .92] },
  { id: "goth", name: "Goth", look: { hat: "classic", hair: "long", top: "cape", shades: true },
    outfit: { hat: [.78, .4, .2], top: [.95, .65, .45], jacket: [.8, .55, .25], jeans: [.78, .3, .15], sneakers: [.0, .0, .12], headphones: [.95, .6, .7], shades: [.95, .5, .15], frame: [.0, .0, .7] }, hair: [.75, .3, .12] },
  { id: "candy", name: "Candy", look: { hat: "small", hair: "buns", top: "mesh", glowsticks: true },
    outfit: { hat: [.92, .45, .95], top: [.5, .45, .95], jacket: [.92, .35, .95], jeans: [.5, .3, .9], sneakers: [.15, .5, 1] }, hair: [.92, .35, 1] },
  { id: "boho", name: "Boho", look: { hat: "floppy", hair: "long", top: "poncho", shades: true },
    outfit: { hat: [.06, .55, .4], jacket: [.03, .55, .6], trim: [.12, .6, .9], pattern: [.45, .4, .7], jeans: [.6, .45, .55], sneakers: [.07, .45, .5], frame: [.07, .5, .5] } },
];
export const PARTY_OUTFIT_BY_ID = Object.fromEntries(PARTY_OUTFITS.map(o => [o.id, o]));
const WITCH_SKINS = [[.07, .25, .96], [.07, .32, .9], [.07, .42, .78], [.06, .5, .62], [.05, .55, .47], [.05, .5, .34]];
const WITCH_HAIRS = [[.07, .4, .14], [.07, .6, .33], [.04, .7, .5], [.11, .45, .88], [.02, .75, .7], [.6, .04, .86]]; // black, brown, auburn, blonde, red, silver
// A party witch: seed picks her outfit (or o.outfit, an id), jitters its colours, and picks her skin, her hair (unless the
// outfit dyes it) and her glow sticks' neons. { id, seed, name, look, outfit, colours(st) }: draw her with
// witchSprite(st, { look, pose, frame, ... }) and bake with colours(st).
const GENOME_PARTS = new Set(["cloak", "scarf", "satchel"]); // the generator's parts: a party witch keeps their defaults (so her draws stay as they were)
// Without an outfit, a party witch is a generated witch (Ed, 138: "the generated witches replace the party witches' outfits"):
// witchGenome(seed) with a party witch's odds, her glow sticks in two party neons.
export function partyWitch(seed = 0, o = {}) {
  if (!o.outfit) {
    const g = witchGenome(seed, { party: true }), { look, outfit } = genomeLook(g), r = rng((seed * 2654435761 + 97) >>> 0);
    const g1 = Math.floor(r() * PARTY_NEONS.length), out = { ...outfit, glow: PARTY_NEONS[g1], glow2: PARTY_NEONS[(g1 + 1 + Math.floor(r() * (PARTY_NEONS.length - 1))) % PARTY_NEONS.length] };
    const name = [{ classic: "Pointed-hat", crooked: "Crooked-hat", floppy: "Floppy-hat", small: "Little-hat", flowers: "Flower-hat" }[look.hat] || "Witch", look.familiar !== "none" ? `with a ${look.familiar}` : look.cloak !== "none" ? `in a ${look.cloak} cloak` : `in ${{ jacket: "a jacket", sequins: "sequins", mesh: "mesh", poncho: "a poncho", cape: "a cape" }[look.top] || look.top}`].join(" ");
    return { id: `gen${seed}`, seed, name, look, outfit: out, genome: g, colours: (st = {}) => witchColours(st, out, { styleHues: false }) };
  }
  const r = rng((seed * 2654435761 + 97) >>> 0), P = PARTY_OUTFIT_BY_ID[o.outfit];
  const pick = a => a[Math.floor(r() * a.length)], j = ([h, s, v], k = .035) => [((h + (r() - .5) * 2 * k) % 1 + 1) % 1, Math.min(1, Math.max(0, s + (r() - .5) * .1)), Math.min(1, Math.max(0, v + (r() - .5) * .08))];
  const outfit = { ...Object.fromEntries(Object.entries({ ...DEFAULT_OUTFIT, ...P.outfit }).map(([k, c]) => [k, k === "skin" || k === "broom" || k === "bristles" || GENOME_PARTS.has(k) ? c : j(c)])) };
  outfit.skin = pick(WITCH_SKINS); outfit.hair = P.hair ? j(P.hair, .02) : pick(WITCH_HAIRS);
  const g1 = Math.floor(r() * PARTY_NEONS.length); outfit.glow = PARTY_NEONS[g1]; outfit.glow2 = PARTY_NEONS[(g1 + 1 + Math.floor(r() * (PARTY_NEONS.length - 1))) % PARTY_NEONS.length];
  outfit.broom = j(DEFAULT_OUTFIT.broom, .02);
  const look = { ...DEFAULT_LOOK, ...P.look };
  return { id: P.id, seed, name: P.name, look, outfit, colours: (st = {}) => witchColours(st, outfit, { styleHues: false }) };
}
