// The portrait's rig (Ed, 2026-10-08): her bust as layers on anchor points, every one moved by a number or picked by a name, so
// an expression is a named set of these (expressions.ts) and a pose or gesture a few keyframes of them (poses.ts), never new art.
//
//   layers, back to front: hands behind her head, cloak and hood, back hair, robe (jacket, top, collar, scarf, pendant), neck,
//   head (ears, earrings), face (eyes, brows, nose, mouth, blush), fringe and side locks, headphones, sweat, hat, hands.
//   anchors (art pixels, the bust's own: x right, y down): the neck pivot at NECK, which the head tilts about; the head's centre
//   HEAD above it; the eyes, brows and mouth on the head; the hat's brim; the shoulders, where the arms start.

/** The canvas, in art pixels. */
export const W = 72, H = 88;
/** The neck pivot on the canvas (the head turns about it; the body bobs with it). */
export const NECK = { x: 36, y: 62 } as const;
/** The head's centre and radii, from the neck pivot. */
export const HEAD = { x: 0, y: -18, rx: 15, ry: 15.5 } as const;
/** The shoulders (where the arms start), from the neck pivot. */
export const SHOULDER = { x: 19, y: 9 } as const;

/** A hand: where (from the neck pivot, art pixels), its shape, its turn (radians), and whether it's behind her head. */
export interface Hand { x: number; y: number; shape: HandShape; rot: number; behind?: boolean }
export type HandShape = "open" | "fist" | "thumb" | "pinch" | "point" | "peace";
export type EyeShape = "normal" | "happy" | "closed" | "wide" | "wince" | "dizzy" | "sleepy";
export type MouthShape = "rest" | "smile" | "grin" | "laugh" | "O" | "A" | "E" | "U" | "M" | "F" | "frown" | "eww" | "wavy" | "smirk" | "cat" | "gasp";

/** Everything the rig draws from. Numbers interpolate between keyframes; names switch. */
export interface Params {
  /** the head's tilt (radians, + leaning to her left: our right) and the body's lean */
  tilt: number; lean: number;
  /** the whole bust moved (art pixels) */
  dx: number; dy: number;
  /** rhythmic motion: a bob (up and down), a nod (the head), a sway (side to side), each its amplitude (px or radians) and its rate (Hz) */
  bobAmp: number; bobHz: number; nodAmp: number; nodHz: number; swayAmp: number; swayHz: number;
  /** a jolt's shake (px), decaying */
  shake: number;
  /** the eyes: open (0 shut to 1, above 1 wide), shape, where they look (-1..1 each way), extra sparkles */
  eyeOpen: number; eyeShape: EyeShape; lookX: number; lookY: number; sparkle: number;
  /** the brows: angle (radians, + the inner ends down: cross; - up: worried) and height (px, + up) */
  browAng: number; browY: number;
  /** the mouth */
  mouth: MouthShape;
  /** overlays, 0..1 */
  blush: number; sweat: number; tears: number;
  /** the hat: on (1) or gone (0), moved (px) and turned (radians) from its place, and clamped down (pressed, px) */
  hatOn: number; hatX: number; hatY: number; hatRot: number;
  /** the hair: blown (x, y: -1..1, which way it streams) and messy (0..1); the robe blown */
  hairX: number; hairY: number; messy: number; robeBlow: number;
  /** wearing: headphones on her ears (0 round her neck, if she has them), sunglasses */
  phonesOn: number; shades: number;
  /** the hands (null: down, out of the frame) */
  handL: Hand | null; handR: Hand | null;
}

export const NEUTRAL: Params = {
  tilt: 0, lean: 0, dx: 0, dy: 0, bobAmp: 0, bobHz: 0, nodAmp: 0, nodHz: 0, swayAmp: 0, swayHz: 0, shake: 0,
  eyeOpen: 1, eyeShape: "normal", lookX: 0, lookY: 0, sparkle: 0, browAng: 0, browY: 0, mouth: "smile",
  blush: 0, sweat: 0, tears: 0, hatOn: 1, hatX: 0, hatY: 0, hatRot: 0, hairX: 0, hairY: 0, messy: 0, robeBlow: 0,
  phonesOn: 0, shades: 0, handL: null, handR: null,
};

/** Her look for the portrait, from the creator's genome (art/witchGenome.js): what she wears and how it's shaped. */
export interface Look {
  hat: string; hatHeight: number; hatBrim: number; hatTilt: number; hatBand: number;
  hair: string; top: string; cloak: string;
  phones: boolean; shades: boolean; earrings: boolean; scarf: boolean; pendant: boolean; glowsticks: boolean; familiar: string;
}
type GenomeLike = { hat?: Record<string, unknown>; hair?: unknown; top?: unknown; cloak?: unknown; accessories?: Record<string, unknown>; scarfLength?: number };
/** The portrait's look from a genome (missing fields as hers). */
export function lookOf(g: GenomeLike | null | undefined): Look {
  const h = g?.hat ?? {}, a = g?.accessories ?? {}, n = (v: unknown, d: number) => (typeof v === "number" && Number.isFinite(v) ? v : d);
  return {
    hat: typeof h.shape === "string" ? h.shape : "classic", hatHeight: n(h.height, 1), hatBrim: n(h.brim, 1), hatTilt: n(h.tilt, 0), hatBand: n(h.band, 1),
    hair: typeof g?.hair === "string" ? g.hair : "long", top: typeof g?.top === "string" ? g.top : "jacket", cloak: typeof g?.cloak === "string" ? g.cloak : "none",
    phones: a.phones === undefined ? true : !!a.phones, shades: !!a.shades, earrings: !!a.earrings, scarf: !!a.scarf && (g?.scarfLength ?? 1) > 0, pendant: !!a.pendant,
    glowsticks: !!a.glowsticks, familiar: typeof a.familiar === "string" ? a.familiar : "none",
  };
}
