// The witch (Ed, DESIGN.md): a modern young-adult witch on a broomstick, with headphones,
// sneakers, jeans and a witch's hat as the one classic touch. Built in 3D like the creatures
// (model3d.js): turned towards or away from the viewer, seen from above, three frames of a
// gentle hover bob, and a lean-forward pose for fast flight.
// Outfits: she is made of named parts, each with its own material and colour slot, so an
// unlockable outfit is a palette (and, later, a part swap), not a redraw.
import { M, hsv2rgb } from "./core.js";
import { Model, render, v3 } from "./model3d.js";

// Her parts and the material each is drawn in.
export const WITCH_PARTS = { hair: M.HAIR, hat: M.HAT, headphones: M.PHONES, top: M.TOP, jacket: M.JACKET, jeans: M.JEANS, sneakers: M.SHOES, broom: M.BROOM, bristles: M.STRAW, skin: M.SKIN };
// The default outfit: a hue, saturation and value per part. Style knobs override the hues.
export const DEFAULT_OUTFIT = {
  hair: [.01, .7, .85], hat: [.74, .45, .45], headphones: [.92, .55, .9], top: [.13, .15, .95], jacket: [.72, .45, .7],
  jeans: [.6, .5, .7], sneakers: [.0, .0, .95], broom: [.08, .55, .55], bristles: [.12, .55, .9], skin: [.07, .3, .94],
};
export function witchColours(st, outfit = DEFAULT_OUTFIT) {
  const o = { ...DEFAULT_OUTFIT, ...outfit }, hue = { hair: st.hairHue, jacket: st.cloakHue, hat: st.hatHue, top: st.topHue, jeans: st.jeansHue, sneakers: st.shoeHue, headphones: st.phonesHue };
  const c = {}; for (const [part, mat] of Object.entries(WITCH_PARTS)) { const [h, s, v] = o[part]; c[mat] = hsv2rgb(hue[part] ?? h, s, v); }
  c[M.EYE] = [24, 18, 30]; c[M.GLINT] = [255, 255, 245]; c[M.NOSE] = [20, 16, 24]; c[M.MAGIC] = hsv2rgb(st.glowHue ?? .13, .5, 1); c[M.MAGIC2] = hsv2rgb(st.glowHue ?? .13, .15, 1);
  c[M.BELLY] = [245, 245, 240]; // sneaker soles, headphone band highlights
  return c;
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
function fastModel(frame) {
  const m = new Model({ blend: .03 }), f = frame % 3, y = .5, dip = .05; // the broom's height; it dips a little at the nose
  const j = [[0, .02, -.01], [.02, -.01, .02], [-.01, .015, .01]][f]; // the frame's jiggle
  const bx = x => y - dip * (x / .62); // the handle's height along it
  // the broom, shooting forward; bristles flared out behind
  m.seg([-.5, bx(-.5), 0], [.62, bx(.62), 0], .022, .018, M.BROOM, { group: 2 });
  m.ell([-.64, bx(-.64) + .005, 0], [.2, .1, .11], M.STRAW, { dir: [1, dip * 1.6, 0], group: 3, paint: p => p[0] < -.76 ? M.MAGIC2 : p[0] > -.5 ? M.BROOM : undefined });
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
    m.ell(v3.add(foot, [-.05, 0, 0]), [.08, .04, .045], M.SHOES, { dir: [-1, .3, 0], group: g, paint: p => p[1] < foot[1] - .03 ? M.BELLY : undefined });
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
  m.ell(brim, [.16, .014, .15], M.HAT, { dir: [1, .9, 0], group: 11 });
  m.chain([[...v3.add(brim, [-.02, .02, 0]), .08], [...v3.add(brim, [-.14, .13, 0]), .04], [...v3.add(brim, [-.3, .14 + j[2] * 2, 0]), .012]], M.HAT, { group: 11, paint: p => Math.hypot(p[0] - brim[0], p[1] - brim[1]) < .06 ? M.MAGIC : undefined });
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
// The sigil itself is not drawn; each frame records her free hand (where a held sigil goes) and
// her hat tip as anchors. frames and a suggested fps per pose:
export const WITCH_FOOT_POSES = { stand: { frames: 3, fps: 3 }, land: { frames: 3, fps: 10 }, takeoff: { frames: 3, fps: 10 }, talk: { frames: 4, fps: 2.5 }, placeSigil: { frames: 3, fps: 6 }, liftSigil: { frames: 3, fps: 6 }, sit: { frames: 2, fps: 1.5 } };
// sit (with the treehouse): on the terrace chair, her broom leaning beside her, swinging her legs and looking out.
// Her seat is WITCH_SEAT_HEIGHT model units above the ground she stands on (the chair's seat; the treehouse builds its chair to match).
export const WITCH_SEAT_HEIGHT = .34;
// Each frame: crouch (0 standing, 1 squatting), bend (the spine's forward lean, radians), hop (feet off the ground),
// breathe, sway (hair and jacket), tilt (the head to one side), look (up), the free hand and its shape, the broom
// (held upright, astride, or at an angle: its binding point and direction), a leg swung up, a talking mouth.
const UPRIGHT = { binding: [-.02, .31, -.2], dir: [.02, 1, -.04] };
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
};
// the knee between a hip and a foot, bent forward
function kneeOf(hip, foot, l) {
  const d = Math.hypot(foot[0] - hip[0], foot[1] - hip[1]), mid = v3.lerp(hip, foot, .5);
  if (d >= 2 * l) return mid;
  const off = Math.sqrt(l * l - d * d / 4), vx = (foot[0] - hip[0]) / d, vy = (foot[1] - hip[1]) / d;
  return [mid[0] - vy * off, mid[1] + vx * off, mid[2]];
}
function footModel(pose, frame) {
  const fr = FOOT_FRAMES[pose], K = { crouch: 0, bend: 0, hop: 0, breathe: 0, sway: 0, tilt: 0, look: 0, broom: UPRIGHT, ...fr[frame % fr.length] };
  const m = new Model({ blend: .03 }), hop = K.hop, sway = K.sway;
  const hipY = K.sit ? WITCH_SEAT_HEIGHT + .06 : .45 - K.crouch * .21 + hop, hipX = -K.crouch * .12;
  // the broom: astride it (the handle level between her legs) or a binding point and a direction
  const astride = !!K.broom.astride, yb = hipY - .04;
  const bdir = astride ? [1, 0, 0] : v3.norm(K.broom.dir), bind = astride ? [-.36, yb, 0] : K.broom.binding;
  const along = t => v3.add(bind, v3.mul(bdir, t));
  m.seg(along(0), along(astride ? .98 : 1.1), .022, .018, M.BROOM, { group: 2 });
  m.ell(along(-.13), [.17, .07, .08], M.STRAW, { dir: bdir, group: 3, paint: p => { const t = v3.dot(v3.sub(p, bind), bdir); return t < -.22 ? M.MAGIC2 : t > -.01 ? M.BROOM : undefined; } });
  // legs: jeans to the knee, then down to sneakers; one swung up over the broom; on her toes pushing off
  for (const side of [-1, 1]) {
    const g = side > 0 ? 6 : 4, hip = [hipX, hipY, side * .07];
    const swing = K.sit ? K.swing * side : 0; // sitting: her legs over the seat's edge, swinging one forward, one back
    const foot = K.sit ? [.24 + swing, .09 + Math.max(0, swing) * .6, side * .1] : side > 0 && K.legUp ? K.legUp : [(side > 0 ? .05 : -.01) + (K.toes ? -.03 : 0), .07 + (K.toes ? hop * .4 : hop), side * .1];
    const knee = K.sit ? [.21, hipY + .01, side * .09] : kneeOf(hip, foot, .21);
    m.seg(hip, knee, .055, .045, M.JEANS, { group: g }); m.seg(knee, foot, .045, .04, M.JEANS, { group: g });
    const toe = K.toes ? [.03, -.045, 0] : [.05, -.03, 0];
    m.ell(v3.add(foot, toe), [.08, .04, .045], M.SHOES, { dir: K.toes ? [1, -.6, 0] : [1, 0, 0], group: g, paint: p => p[1] < foot[1] + toe[1] - .015 ? M.BELLY : undefined });
  }
  // body: hips in jeans, a top under an open jacket, leaning with the spine
  const spine = [Math.sin(K.bend), Math.cos(K.bend), 0], fwd = [Math.cos(K.bend), -Math.sin(K.bend), 0];
  const hips = [hipX, hipY + .03, 0]; m.ell(hips, [.1, .08, .105], M.JEANS, { group: 1 });
  const chest = v3.add(hips, v3.add(v3.mul(spine, .19), [0, K.breathe, 0]));
  m.ell(chest, [.1, .15 + K.breathe * .5, .115], M.JACKET, { dir: fwd, group: 1, paint: p => v3.dot(v3.sub(p, chest), fwd) > .045 && Math.abs(p[2]) < .05 ? M.TOP : undefined });
  // the jacket's hem hanging behind, stirring
  m.chain([[...v3.add(chest, v3.add(v3.mul(fwd, -.07), v3.mul(spine, -.08))), .07], [...v3.add(chest, v3.add(v3.mul(fwd, -.11 - sway), v3.mul(spine, -.2))), .05], [...v3.add(chest, v3.add(v3.mul(fwd, -.13 - sway * 1.6), v3.mul(spine, -.29))), .025]], M.JACKET, { group: 12 });
  // head: tilted to one side, looking up or down
  const H = v3.add(chest, v3.add(v3.mul(spine, .27), [K.look * .03, 0, K.tilt * .04]));
  // arms: the far hand grips the broom; the near hand is free (or on the handle, astride)
  const shoulder = side => v3.add(chest, v3.add(v3.mul(spine, .1), [0, 0, side * .12]));
  const grip = astride ? [.28, yb + .03, -.05] : along(Math.max(.12, (Math.min(.62, hipY + .2) - bind[1]) / Math.max(.3, bdir[1])));
  const free = astride ? [.28, yb + .03, .05] : K.free;
  for (const side of [-1, 1]) {
    const g = side > 0 ? 7 : 5, sh = shoulder(side), hand = side > 0 ? free : K.far || grip;
    const elbow = side > 0 && K.elbow ? K.elbow : v3.add(v3.lerp(sh, hand, .5), [-.03, -.02, side * .05]);
    m.seg(sh, elbow, .04, .035, M.JACKET, { group: g }); m.seg(elbow, hand, .035, .03, M.JACKET, { group: g });
    const shape = side > 0 && !astride ? K.hand : "grip";
    if (shape === "palm") m.ell(hand, [.045, .02, .04], M.SKIN, { group: g });                                   // open, palm up
    else if (shape === "down") m.ell(hand, [.045, .02, .04], M.SKIN, { dir: [1, .15, 0], group: g });             // flat, palm to the ground
    else if (shape === "wave") { m.ell(hand, [.03, .045, .04], M.SKIN, { group: g }); for (const k of [-1, 0, 1]) m.seg(v3.add(hand, [0, .03, k * .02]), v3.add(hand, [k * .01, .065, k * .03]), .01, .008, M.SKIN, { group: g }); } // fingers spread
    else if (shape === "point") { m.ell(hand, [.035, .03, .035], M.SKIN, { group: g }); m.seg(v3.add(hand, [0, .02, 0]), v3.add(hand, [.01, .08, 0]), .012, .01, M.SKIN, { group: g }); } // a finger up
    else m.ell(hand, [.035, .03, .035], M.SKIN, { group: g });
  }
  // face, hair, headphones and hat (as in flight, but the hair hangs down her back)
  m.ell(H, [.11, .115, .1], M.SKIN, { group: 8, paint: p => (p[0] < H[0] - .01 || p[1] > H[1] + .075) ? M.HAIR : undefined });
  for (const side of [-1, 1]) m.ell(Model.surface(H, [.11, .115, .1], v3.norm([.85, .05 + K.look, side * .45 + K.tilt * .1])), [.016, .026, .016], M.EYE, { group: 8 });
  if (K.mouth) m.ell(Model.surface(H, [.11, .115, .1], v3.norm([1, -.5 + K.look, K.tilt * .1])), [.012, .016, .025], M.NOSE, { group: 8 }); // talking
  m.chain([[...v3.add(H, [-.06, .02, 0]), .06], [...v3.add(H, [-.12 - sway, -.12, .02 + K.tilt * .03]), .05], [...v3.add(H, [-.13 - sway * 1.5, -.25, .03 + K.tilt * .04]), .03]], M.HAIR, { group: 9 });
  for (const side of [-1, 1]) m.ell(v3.add(H, [-.015, 0, side * .105]), [.05, .055, .03], M.PHONES, { group: 10 });
  m.chain([[...v3.add(H, [-.005, .03, -.095]), .015], [...v3.add(H, [-.005, .11, -.05]), .015], [...v3.add(H, [-.005, .125, 0]), .015], [...v3.add(H, [-.005, .11, .05]), .015], [...v3.add(H, [-.005, .03, .095]), .015]], M.PHONES, { group: 10 });
  const brim = v3.add(H, [-.03, .1, K.tilt * .02]), tz = K.tilt * .05, tip = v3.add(brim, [-.16 - sway * .5, .27, tz * 2]);
  m.ell(brim, [.16, .014, .15], M.HAT, { dir: [1, .25 - K.look * .8, K.tilt * .3], group: 11 });
  m.chain([[...v3.add(brim, [0, .01, 0]), .085], [...v3.add(brim, [-.05, .17, tz]), .045], [...tip, .012]], M.HAT, { group: 11, paint: p => p[1] < brim[1] + .045 ? M.MAGIC : undefined });
  m.ell([.02, .005, 0], [.2, .005, .12], M.NOSE, { group: 0 }); // her shadow at her feet
  m.anchors.hand = free; m.anchors.hatTip = tip;
  return m;
}

export function witchModel({ frame = 0, lean = false, pose } = {}) {
  if (pose === "fast") return fastModel(frame);
  if (WITCH_FOOT_POSES[pose]) return footModel(pose, frame);
  const rise = pose === "rise", desc = pose === "descend", brake = pose === "brake", posed = rise || desc || brake;
  const m = new Model({ blend: .03 }), bob = posed ? 0 : [0, .025, .045][frame % 3], tilt = posed ? 0 : [0, .015, -.01][frame % 3] + (lean ? .08 : 0);
  // the broom's height; how far she leans forward on it (back, braking). Posed, she leans well into it, so that
  // once the broom tilts she still sits near upright: leaning into the climb, or back against the drop
  const y = .42 + bob, L = rise ? .3 : desc ? -.27 : brake ? -.12 : lean ? .1 : 0; // braking, she leans back hard (the skid tips her back further)
  const Lh = Math.min(.1, Math.max(0, L)); // how far her hair and hat stream back with the lean (never more than the fast-flight lean)
  const sway = posed ? [.02, .06][frame % 2] : [0, .03, .05][frame % 3], flow = desc ? 1 : rise ? -.6 : 0; // hair and jacket: up when dropping, down when climbing (in the broom's frame)
  // the broom: a long handle, bristles bound at the back, glowing at their tips
  m.seg([-.5, y - tilt * 2, 0], [.62, y + tilt * 3, 0], .022, .018, M.BROOM, { group: 2 });
  if (brake) m.ell([-.56, y - .08, 0], [.17, .07, .09], M.STRAW, { dir: [.55, 1, 0], group: 3, paint: p => p[1] < y - .18 ? M.MAGIC2 : p[1] > y - .01 ? M.BROOM : undefined }); // skidding: the bristles swing forward and down under her, like reins hauled in
  else m.ell([-.62, y - tilt * 2 - .01, 0], [.17, .07, .08], M.STRAW, { dir: [1, tilt, 0], group: 3, paint: p => p[0] < -.72 ? M.MAGIC2 : p[0] > -.5 ? M.BROOM : undefined });
  // legs astride: jeans to the knee, then down to sneakers (reaching down and forward to land)
  for (const side of [-1, 1]) {
    const hip = [-.04, y + .06, side * .07], knee = brake ? [.18, y - .01, side * .14] : desc ? [.16, y - .05, side * .14] : rise ? [.06, y - .07, side * .14] : [.12 + L * .5, y - .02, side * .14], foot = brake ? (side > 0 ? [.44, y - .02 + sway, side * .13] : [.3, y - .16, side * .13]) : desc ? [.2, y - .26, side * .13] : rise ? [-.1, y - .23, side * .13] : [.08 + L, y - .2, side * .13]; // climbing, her legs tuck back and dangle
    m.seg(hip, knee, .055, .045, M.JEANS, { group: side > 0 ? 6 : 4 });
    m.seg(knee, foot, .045, .04, M.JEANS, { group: side > 0 ? 6 : 4 });
    m.ell(v3.add(foot, [.05, -.02, 0]), [.08, .04, .045], M.SHOES, { group: side > 0 ? 6 : 4, paint: p => p[1] < foot[1] - .04 ? M.BELLY : undefined });
  }
  // body: a top under an open jacket; hips in jeans
  m.ell([-.04, y + .08, 0], [.11, .07, .1], M.JEANS, { group: 1 });
  const chest = [.0 + L * .8, y + .26 - Math.abs(L) * .3, 0];
  m.ell(chest, [.1, .16, .11], M.JACKET, { dir: [L * 2.5, 1, 0], up: [-1, 0, 0], group: 1, paint: p => p[0] > chest[0] + .04 && Math.abs(p[2]) < .055 ? M.TOP : undefined });
  // in flight the jacket's tail flaps out behind her
  if (brake) m.chain([[...v3.add(chest, [-.08, -.06, 0]), .07], [...v3.add(chest, [-.02, .12 + sway, .02]), .05], [...v3.add(chest, [.14, .18 + sway, .03]), .025]], M.JACKET, { group: 12 }); // swinging forward past her with the sudden stop
  else if (posed) m.chain([[...v3.add(chest, [-.08, -.1, 0]), .07], [...v3.add(chest, [-.2, -.12 + flow * (.08 + sway), 0]), .05], [...v3.add(chest, [-.3, -.12 + flow * (.16 + sway * 1.5), .02]), .025]], M.JACKET, { group: 12 });
  // head (needed for the hand on the hat)
  const H = v3.add(chest, [.03 + L * .5, .26, 0]), brim = v3.add(H, [brake ? .05 : desc ? -.01 : -.03, brake ? .06 : .1, 0]);
  // arms: shoulders to hands on the broom handle; descending, the near hand holds her hat on
  for (const side of [-1, 1]) {
    const sh = v3.add(chest, [.01, .11, side * .11]), hand = desc && side > 0 ? v3.add(brim, [.1, .01, .1]) : brake ? [.3, y + .03, side * .05] : [.26 + L, y + .03, side * .05]; // braking: arms straight, hauling on the handle
    const elbow = desc && side > 0 ? v3.add(sh, [.1, .02, .1]) : v3.lerp(sh, hand, .5);
    m.seg(sh, elbow, .04, .035, M.JACKET, { group: side > 0 ? 7 : 5 });
    m.seg(elbow, hand, .035, .03, M.JACKET, { group: side > 0 ? 7 : 5 });
    m.ell(hand, [.035, .03, .035], M.SKIN, { group: side > 0 ? 7 : 5 });
    if (side > 0) m.anchors.hand = hand; // her near hand (in flight it holds the broom; a sigil can still hang from it)
  }
  // head, face and hair
  m.ell(H, [.11, .115, .1], M.SKIN, { group: 8, paint: p => (p[0] < H[0] - .01 || p[1] > H[1] + .075) ? M.HAIR : undefined });
  for (const side of [-1, 1]) m.ell(Model.surface(H, [.11, .115, .1], v3.norm([.85, .05, side * .45])), [.016, .026, .016], M.EYE, { group: 8 });
  // hair trailing out behind, swaying with the bob (streaming down while climbing, up while dropping)
  if (brake) m.chain([[...v3.add(H, [-.06, .06, 0]), .06], [...v3.add(H, [.04, .13 + sway, .03]), .045], [...v3.add(H, [.2, .08 + sway, .04]), .02]], M.HAIR, { group: 9 }); // flung forward over her head
  else m.chain([[...v3.add(H, [-.06, .02, 0]), .06], [...v3.add(H, [-.18 - Lh, -.05 + sway + flow * .1, .02]), .045], [...v3.add(H, [-.3 - Lh * 1.5, -.08 + sway * 1.6 + flow * .22, .03]), .02]], M.HAIR, { group: 9 });
  // headphones: cups over the ears and a band across the top of the head
  for (const side of [-1, 1]) m.ell(v3.add(H, [-.015, 0, side * .105]), [.05, .055, .03], M.PHONES, { group: 10 });
  m.chain([[...v3.add(H, [-.005, .03, -.095]), .015], [...v3.add(H, [-.005, .11, -.05]), .015], [...v3.add(H, [-.005, .125, 0]), .015], [...v3.add(H, [-.005, .11, .05]), .015], [...v3.add(H, [-.005, .03, .095]), .015]], M.PHONES, { group: 10 });
  // the hat: a wide brim and a tall crown, its tip bent back (pushed further back by the climb)
  const back = rise ? .1 : 0;
  m.ell(brim, [.16, .014, .15], M.HAT, { dir: brake ? [1, -.55, 0] : [1, .25 + back * 3, 0], group: 11 }); // braking, it tips forward over her eyes
  m.anchors.hatTip = brake ? v3.add(brim, [.2, .22 + sway * .5, 0]) : v3.add(brim, [-.16 - Lh * 1.5 - back, .27 + sway * .5 - back * .5, 0]); // where the sigil stack hangs over her
  m.chain(brake ? [[...v3.add(brim, [0, .01, 0]), .085], [...v3.add(brim, [.06, .16, 0]), .045], [...v3.add(brim, [.2, .22 + sway * .5, 0]), .012]] : [[...v3.add(brim, [0, .01, 0]), .085], [...v3.add(brim, [-.05 - Lh - back * .5, .17 - back * .3, 0]), .045], [...v3.add(brim, [-.16 - Lh * 1.5 - back, .27 + sway * .5 - back * .5, 0]), .012]], M.HAT, { group: 11, paint: p => p[1] < brim[1] + .045 ? M.MAGIC : undefined }); // a glowing hatband
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
    const low = Math.min(...m.parts.map(q => q.type === "ell" ? q.c[1] - Math.max(...q.r) : Math.min(q.a[1] - q.r1, q.b[1] - q.r2)));
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
const witchScale = h => { if (!scaleCache.has(h)) scaleCache.set(h, render(witchModel({ frame: 0 }), { height: h }).s); return scaleCache.get(h); };
// pixels per model unit at her ordinary scale, for things built to her size (the treehouse)
export const witchPixelsPerUnit = (st = {}) => witchScale(witchHeight(st));
// heading (Ed: "straight up" and "straight down" movement): "side" (the default, the broom across the screen, turned
// towards or away by facing), "away" (flying straight up the screen, into it: seen from behind, the broom foreshortened
// with its bristles towards us, her hair, jacket and hat tip streaming back at us) or "towards" (straight down the screen,
// at us: the handle's tip nearest, her face over it). Any frame, lean or flight pose (fast, brake) can be turned so, at her
// ordinary scale. Every flight frame carries anchors: her near hand and her hat tip (where the sigil stack hangs).
export const WITCH_HEADINGS = { away: -Math.PI / 2, towards: Math.PI / 2 };
export function witchSprite(st = {}, { frame = 0, lean = false, facing = "towards", pose, heading = "side" } = {}) {
  const h = witchHeight(st), yaw = WITCH_HEADINGS[heading];
  const model = witchModel({ frame, lean, pose }), { sp, project, s } = yaw !== undefined ? render(model, { scale: witchScale(h), yaw }) : pose ? render(model, { scale: witchScale(h), facing }) : render(model, { height: h, facing });
  sp.scale = s; // pixels per model unit
  // on foot: where her free hand (a held sigil) and her hat tip are, in pixels from the top-left
  if (model.anchors.hand) sp.anchors = { hand: project(model.anchors.hand), hatTip: project(model.anchors.hatTip) };
  // she glows: a few motes of light round her
  let n = 0;
  for (let i = 0; i < 400 && n < 6; i++) {
    const x = (i * 37) % sp.w, y = (i * 53) % Math.floor(sp.h * .8);
    if (sp.get(x, y) || sp.get(x + 1, y) || sp.get(x - 1, y) || sp.get(x, y + 1) || sp.get(x, y - 1)) continue;
    if ((x * 7 + y * 13 + frame * 5) % 11) continue;
    sp.px(x, y, M.MAGIC2); n++;
  }
  return sp;
}
