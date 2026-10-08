// Her poses (looping) and gestures (played once over the pose), as keyframes of the rig's parameters (rig.ts): at each key
// time (seconds) the parameters it names; numbers ease between keys, names switch at the key. A key carries the ones before it
// forward, so a key only names what changes. Hands come in and go out from below the frame (y 26), where her arms rest.
// `lostHat`: a gesture that knocks her hat off (true, from its end) or brings it back (false, from its start).

import type { Hand, Params } from "./rig";

export interface Key { t: number; p: Partial<Params> }
export interface Seq { dur: number; loop?: boolean; keys: Key[]; lostHat?: boolean; label?: string }

const hand = (x: number, y: number, shape: Hand["shape"] = "open", rot = 0, behind = false): Hand => ({ x, y, shape, rot, behind });
/** A hand resting below the frame on that side (where a gesture's hand comes from and goes back to). */
const down = (s: number, shape: Hand["shape"] = "open"): Hand => hand(s * 24, 28, shape);

export const POSES: Record<string, Seq> = {
  idle: { dur: 1, loop: true, label: "idle bob", keys: [{ t: 0, p: { bobAmp: 0.7, bobHz: 0.35 } }] },
  dj: {
    dur: 1, loop: true, label: "DJing", keys: [
      { t: 0, p: { phonesOn: 1, nodAmp: 1.6, nodHz: 2, handR: hand(15, -15, "open", -0.35), handL: hand(-11, 22, "open", 0.4) } },
      { t: 0.25, p: { handL: hand(-17, 21, "open", 0.2) } }, { t: 0.5, p: { handL: hand(-11, 22, "open", 0.4) } },
      { t: 0.75, p: { handL: hand(-16, 21, "open", 0.2) } }, { t: 1, p: { handL: hand(-11, 22, "open", 0.4) } },
    ],
  },
  dancing: {
    dur: 1, loop: true, keys: [
      { t: 0, p: { swayAmp: 2.5, swayHz: 1, bobAmp: 1.2, bobHz: 2, tilt: 0.1, handL: hand(-23, -24, "peace", -0.3), handR: down(1) } },
      { t: 0.5, p: { tilt: -0.1, handL: down(-1), handR: hand(23, -24, "open", 0.3) } }, { t: 1, p: { tilt: 0.1, handL: hand(-23, -24, "peace", -0.3), handR: down(1) } },
    ],
  },
  flyFast: {
    dur: 0.4, loop: true, label: "flying fast", keys: [
      { t: 0, p: { hairX: -1, robeBlow: -1, hatY: 1.5, hatRot: -0.12, hatX: 1, handL: hand(-6, -46, "open", 0.9), browAng: 0.3, eyeOpen: 0.8, lean: 0.05, dy: 0 } },
      { t: 0.2, p: { dy: 1 } }, { t: 0.4, p: { dy: 0 } },
    ],
  },
  rising: { dur: 0.8, loop: true, keys: [{ t: 0, p: { hairY: 1, robeBlow: 0.3, lookY: -0.8, dy: -1 } }, { t: 0.4, p: { dy: -2 } }, { t: 0.8, p: { dy: -1 } }] },
  falling: {
    dur: 0.6, loop: true, keys: [
      { t: 0, p: { hairY: -1, hatY: -3, eyeShape: "wide", mouth: "O", lookY: 0.6, handL: hand(-22, -30, "open", -0.4), handR: hand(22, -30, "open", 0.4) } },
      { t: 0.3, p: { hatY: -4.5, handL: hand(-23, -33, "open", -0.6), handR: hand(23, -33, "open", 0.6) } },
      { t: 0.6, p: { hatY: -3, handL: hand(-22, -30, "open", -0.4), handR: hand(22, -30, "open", 0.4) } },
    ],
  },
  knockedDown: {
    dur: 2, loop: true, label: "knocked down", keys: [
      { t: 0, p: { eyeShape: "dizzy", mouth: "wavy", tilt: 0.16, dy: 5, sweat: 1, messy: 1, hatOn: 0 } }, { t: 1, p: { tilt: 0.24 } }, { t: 2, p: { tilt: 0.16 } },
    ],
  },
  beach: {
    dur: 4, loop: true, label: "lying on the beach", keys: [
      { t: 0, p: { shades: 1, tilt: -0.12, lean: -0.04, dy: 2, mouth: "smirk", handL: hand(-11, -30, "fist", 0, true), handR: hand(11, -30, "fist", 0, true), bobAmp: 0.5, bobHz: 0.25 } },
    ],
  },
};

export const GESTURES: Record<string, Seq> = {
  hatTip: {
    dur: 1.4, label: "hat tip", keys: [
      { t: 0, p: { handR: down(1, "pinch") } }, { t: 0.35, p: { handR: hand(18, -28, "pinch", -0.4), hatRot: 0 } },
      { t: 0.6, p: { hatRot: 0.22, hatY: 1 } }, { t: 0.95, p: { hatRot: 0, hatY: 0, handR: hand(18, -28, "pinch", -0.4) } }, { t: 1.4, p: { handR: down(1, "pinch") } },
    ],
  },
  thumbsUp: { dur: 1.6, label: "thumbs up", keys: [{ t: 0, p: { handR: down(1, "thumb") } }, { t: 0.3, p: { handR: hand(15, 5, "thumb", -0.15) } }, { t: 1.2, p: { handR: hand(15, 5, "thumb", -0.15) } }, { t: 1.6, p: { handR: down(1, "thumb") } }] },
  fistPump: {
    dur: 1.8, label: "fist pump", keys: [
      { t: 0, p: { handR: down(1, "fist") } }, { t: 0.3, p: { handR: hand(21, -26, "fist") } }, { t: 0.5, p: { handR: hand(21, -32, "fist"), dy: -1 } },
      { t: 0.7, p: { handR: hand(21, -24, "fist"), dy: 0 } }, { t: 0.9, p: { handR: hand(21, -32, "fist"), dy: -1 } }, { t: 1.15, p: { handR: hand(21, -24, "fist"), dy: 0 } }, { t: 1.8, p: { handR: down(1, "fist") } },
    ],
  },
  cheeks: {
    dur: 1.8, label: "hands on cheeks", keys: [
      { t: 0, p: { handL: down(-1), handR: down(1) } }, { t: 0.3, p: { handL: hand(-13, -9, "open", 0.35), handR: hand(13, -9, "open", -0.35), blush: 1 } },
      { t: 1.4, p: { handL: hand(-13, -9, "open", 0.35), handR: hand(13, -9, "open", -0.35) } }, { t: 1.8, p: { handL: down(-1), handR: down(1) } },
    ],
  },
  wave: {
    dur: 2, keys: [
      { t: 0, p: { handR: down(1) } }, { t: 0.3, p: { handR: hand(22, -26, "open", -0.3) } }, { t: 0.55, p: { handR: hand(23, -26, "open", 0.35) } }, { t: 0.8, p: { handR: hand(22, -26, "open", -0.3) } },
      { t: 1.05, p: { handR: hand(23, -26, "open", 0.35) } }, { t: 1.3, p: { handR: hand(22, -26, "open", -0.3) } }, { t: 2, p: { handR: down(1) } },
    ],
  },
  headphones: {
    dur: 1.8, keys: [
      { t: 0, p: { handL: down(-1), handR: down(1) } }, { t: 0.3, p: { handL: hand(-15, -15, "open", 0.35), handR: hand(15, -15, "open", -0.35), phonesOn: 1, eyeShape: "closed", mouth: "smile" } },
      { t: 1.4, p: { handL: hand(-15, -15, "open", 0.35), handR: hand(15, -15, "open", -0.35) } }, { t: 1.8, p: { handL: down(-1), handR: down(1), phonesOn: 0 } },
    ],
  },
  hit: { dur: 0.6, label: "hit (jolt)", keys: [{ t: 0, p: { shake: 3, dy: 2, eyeShape: "wince", mouth: "A", sweat: 1, browAng: -0.4 } }, { t: 0.45, p: { shake: 0, dy: 0 } }, { t: 0.6, p: { shake: 0 } }] },
  hatLost: {
    dur: 1, label: "hat lost", lostHat: true, keys: [
      { t: 0, p: { hatX: 0, hatY: 0, hatRot: 0, eyeShape: "wide", mouth: "gasp", messy: 0 } }, { t: 0.15, p: { messy: 1 } },
      { t: 1, p: { hatX: -30, hatY: -45, hatRot: -2.6, messy: 1 } },
    ],
  },
  hatBack: {
    dur: 1.9, label: "hat back (brim tip)", lostHat: false, keys: [
      { t: 0, p: { hatY: -40, hatRot: 0.5, messy: 1, handR: down(1, "pinch") } }, { t: 0.45, p: { hatY: 0, hatRot: 0, messy: 0.2 } }, { t: 0.55, p: { hatY: 1.5 } },
      { t: 0.75, p: { hatY: 0, handR: hand(18, -28, "pinch", -0.4), messy: 0, mouth: "grin" } }, { t: 1.05, p: { hatRot: 0.22, hatY: 1 } },
      { t: 1.4, p: { hatRot: 0, hatY: 0, handR: hand(18, -28, "pinch", -0.4) } }, { t: 1.9, p: { handR: down(1, "pinch") } },
    ],
  },
  // (art builder 1's: pointing, the peace sign, a shrug, a facepalm, a think, and pointing the way for a hint)
  point: {
    dur: 1.6, label: "point", keys: [
      { t: 0, p: { handR: down(1, "point") } }, { t: 0.3, p: { handR: hand(24, -8, "point", 1.35), lookX: 0.7, browY: 0.6, mouth: "grin" } },
      { t: 0.45, p: { handR: hand(26, -8, "point", 1.4) } }, { t: 1.2, p: { handR: hand(25, -8, "point", 1.4) } }, { t: 1.6, p: { handR: down(1, "point"), lookX: 0, browY: 0, mouth: "smile" } },
    ],
  },
  pointWay: {
    dur: 2.2, label: "pointing the way (hint)", keys: [
      { t: 0, p: { handR: down(1, "point") } }, { t: 0.35, p: { handR: hand(23, -30, "point", 0.75), lookX: 0.9, lookY: -0.5, tilt: -0.06, browY: 1, mouth: "O" } },
      { t: 0.6, p: { handR: hand(25, -32, "point", 0.8) } }, { t: 0.85, p: { handR: hand(23, -30, "point", 0.75), mouth: "smile" } }, { t: 1.1, p: { handR: hand(25, -32, "point", 0.8) } },
      { t: 1.7, p: { handR: hand(24, -31, "point", 0.78) } }, { t: 2.2, p: { handR: down(1, "point"), lookX: 0, lookY: 0, tilt: 0, browY: 0 } },
    ],
  },
  peace: {
    dur: 1.8, label: "peace sign", keys: [
      { t: 0, p: { handR: down(1, "peace") } }, { t: 0.3, p: { handR: hand(15, -16, "peace", -0.2), tilt: 0.1, eyeShape: "happy", mouth: "grin", sparkle: 1 } },
      { t: 1.4, p: { handR: hand(15, -16, "peace", -0.2) } }, { t: 1.8, p: { handR: down(1, "peace"), tilt: 0, sparkle: 0, eyeShape: "normal", mouth: "smile" } },
    ],
  },
  shrug: {
    dur: 1.8, label: "shrug", keys: [
      { t: 0, p: { handL: down(-1), handR: down(1) } },
      { t: 0.35, p: { handL: hand(-24, 2, "open", -1.15), handR: hand(24, 2, "open", 1.15), dy: -1.5, tilt: 0.08, browY: 1.6, browAng: -0.25, mouth: "wavy", lookX: -0.5, eyeOpen: 0.75 } },
      { t: 1.3, p: { handL: hand(-24, 2, "open", -1.15), handR: hand(24, 2, "open", 1.15), dy: -1.5 } }, { t: 1.8, p: { handL: down(-1), handR: down(1), dy: 0, tilt: 0, browY: 0, browAng: 0, lookX: 0, eyeOpen: 1, mouth: "smile" } },
    ],
  },
  facepalm: {
    dur: 2.2, label: "facepalm", keys: [
      { t: 0, p: { handR: down(1) } }, { t: 0.3, p: { handR: hand(5, -19, "open", -0.25), dy: 1.5, tilt: 0.1, eyeShape: "closed", mouth: "frown", browAng: -0.3 } },
      { t: 0.45, p: { handR: hand(5, -20, "open", -0.25), dy: 2 } }, { t: 1.6, p: { handR: hand(5, -20, "open", -0.25), sweat: 1 } }, { t: 2.2, p: { handR: down(1), dy: 0, tilt: 0, sweat: 0, eyeShape: "normal", mouth: "smile", browAng: 0 } },
    ],
  },
  think: {
    dur: 2.4, label: "thinking", keys: [
      { t: 0, p: { handR: down(1, "fist") } }, { t: 0.35, p: { handR: hand(7, -5, "fist", -0.3), lookX: -0.6, lookY: -0.8, mouth: "cat", browAng: 0.15, tilt: -0.06 } },
      { t: 1.9, p: { handR: hand(7, -5, "fist", -0.3), lookX: -0.4 } }, { t: 2.4, p: { handR: down(1, "fist"), lookX: 0, lookY: 0, browAng: 0, tilt: 0, mouth: "smile" } },
    ],
  },
};

const isHand = (v: unknown): v is Hand => !!v && typeof v === "object";
const ease = (k: number) => k * k * (3 - 2 * k);
/** The keys, each with everything named by those before it. */
const filled = new WeakMap<Seq, Key[]>();
function keysOf(s: Seq): Key[] {
  let f = filled.get(s);
  if (!f) { let acc: Partial<Params> = {}; f = s.keys.map(k => ({ t: k.t, p: (acc = { ...acc, ...k.p }) })); filled.set(s, f); }
  return f;
}
/** A sequence's parameters at time t (seconds since it started; a loop wraps, a one-shot holds its last key). */
export function sample(s: Seq, t: number): Partial<Params> {
  const keys = keysOf(s);
  if (s.loop && s.dur > 0) t = ((t % s.dur) + s.dur) % s.dur;
  if (t <= keys[0].t) return { ...keys[0].p };
  const j = keys.findIndex(k => k.t > t);
  if (j < 0) return { ...keys[keys.length - 1].p };
  const a = keys[j - 1], b = keys[j], k = ease((t - a.t) / Math.max(1e-6, b.t - a.t)), out: Record<string, unknown> = { ...a.p };
  for (const [name, bv] of Object.entries(b.p)) {
    const av = (a.p as Record<string, unknown>)[name];
    if (typeof av === "number" && typeof bv === "number") out[name] = av + (bv - av) * k;
    else if (isHand(av) && isHand(bv)) out[name] = { x: av.x + (bv.x - av.x) * k, y: av.y + (bv.y - av.y) * k, rot: av.rot + (bv.rot - av.rot) * k, shape: k < 0.5 ? av.shape : bv.shape, behind: bv.behind };
    else if (av === undefined) out[name] = bv;
  }
  return out as Partial<Params>;
}
