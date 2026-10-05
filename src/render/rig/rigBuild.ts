// The live rig's sprites (#79 stage 4): one species at one level baked as parts (art/genome/parts.js)
// and packed into an atlas page, with the joints the rig strings them on. Runs in an art worker
// like every other set (artBuild.ts runJob), so baking a legend's parts never stalls a frame.
import * as Art from "../../../art/generator.js";
import { rigParts } from "../../../art/genome/parts.js";
import { packPixels, type AtlasPixels, type Baked, type MakeCanvas } from "../artBuild";
import type { Style } from "../style";

/** A creature's expression (art/genome/expressions.js; the view's expression(c), render/looks.ts in #89). */
export type RigFace = "neutral" | "angry" | "happy" | "dazed";
/** A baked piece: its atlas frame and the pixel (from its top left) its joint lands on. */
export interface RigPiece { frame: number; px: number; py: number }
type V3 = [number, number, number];
export interface RigLeg { name: string; fore: boolean; side: number; hip: V3; knee: V3; foot: V3; r: [number, number, number]; fl: number; mat: number; hoof: boolean }
/** What the rig needs besides the atlas: its template, its scale (art pixels per model unit), the
 *  pieces at each of the five baked headings (null where it has none), the discs by material and
 *  radius in pixels, and its joints in model units. */
export interface RigMeta {
  template: "quadruped" | "serpent"; s: number;
  torso: (RigPiece | null)[]; head: (RigPiece | null)[]; tail: (RigPiece | null)[];
  /** The head piece in each expression but neutral (art/genome/expressions.js): angry, happy, dazed. */
  faces: Partial<Record<RigFace, (RigPiece | null)[]>>;
  discs: Record<number, Record<number, RigPiece>>;
  legs: RigLeg[]; neck: V3; headAt: V3; tailAt: V3; top: number; len: number;
  spine: [number, number, number, number][];
}

type Part = { sp: unknown; px: number; py: number } | null;
type Parts = { template: "quadruped" | "serpent"; s: number; pieces: Record<string, Part[] | null>; faces?: Record<string, Part[] | null>; discs: Record<number, Record<number, Part>>; joints: { legs?: RigLeg[]; head?: { nb: V3; H: V3 } | V3; tail?: V3; top?: number; len?: number; spine?: [number, number, number, number][] } };

export function rigSprites(st: Style, species: string, level: number, mk: MakeCanvas): { px: AtlasPixels; meta: RigMeta } | null {
  const P = rigParts(species, level, st) as Parts | null;
  if (!P) return null;
  const colours = Art.speciesColours(species, st), sprites: Baked[] = [];
  const add = (p: Part, outline = st.cOutline): RigPiece | null => p ? { frame: sprites.push(Art.bake(p.sp, colours, st, outline, mk) as Baked) - 1, px: p.px, py: p.py } : null;
  const all = (k: string) => (P.pieces[k] ?? [null, null, null, null, null]).map(p => add(p));
  const discs: RigMeta["discs"] = {};
  // discs unoutlined: strung along a bone they overlap into one limb, not a string of beads
  for (const [mat, byR] of Object.entries(P.discs)) { discs[+mat] = {}; for (const [r, p] of Object.entries(byR)) { const d = add(p, "none"); if (d) discs[+mat][+r] = d; } }
  const J = P.joints, head = J.head && !Array.isArray(J.head) ? J.head : null;
  const meta: RigMeta = {
    template: P.template, s: P.s, torso: all("torso"), head: all("head"), tail: all("tail"), discs,
    legs: J.legs ?? [], neck: head ? head.nb : (J.head as V3), headAt: head ? head.H : (J.head as V3), tailAt: J.tail ?? [0, 0, 0], top: J.top ?? 0, len: J.len ?? 0,
    spine: J.spine ?? [],
    faces: Object.fromEntries(Object.entries(P.faces ?? {}).map(([k, v]) => [k, (v ?? [null, null, null, null, null]).map(p => add(p))])),
  };
  return { px: packPixels(sprites, 2048), meta };
}
