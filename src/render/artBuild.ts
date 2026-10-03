// Drawing the sprite sets with art/generator.js and packing them into atlas pixels. No Three.js
// and no page needed, so it runs in a Web Worker (with OffscreenCanvas) as well as on the page.
import * as Art from "../../art/generator.js";
import { AREA_TYPES } from "../rules/map";
import { TREE_VARIANTS } from "../rules/forest";
import { AREAS, areaAssets } from "../../art/areas.js";
import { rng } from "../rules/random";
import type { Style } from "./style";

type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;
export interface Baked { A: AnyCanvas; N: AnyCanvas; w: number; h: number }
/** Where a sprite sits in its atlas: u0, vTop, u1, vBottom, and its size in art pixels. */
export interface Frame { uv: [number, number, number, number]; w: number; h: number }
export interface AtlasPixels { albedo: Uint8Array; normal: Uint8Array; width: number; height: number; frames: Frame[] }

export type MakeCanvas = (w: number, h: number) => AnyCanvas;

/** Where each of an area type's sprites sits in its atlas. A big object with a top half (a
 *  tree's crown) has `top`; one without (a mound, a boulder, a log) is drawn whole, always. */
export interface Piece { bot: number; top: number | null }
export interface TypeLayout {
  big: Piece[];
  small: Piece[];
  walls: number[];
  set: Piece | null;
}

interface ArtDef { id: string; leaf: number; big: [string, Record<string, unknown>][]; small: [string, Record<string, unknown>][]; set?: [string, Record<string, unknown>] }
type TreeOpts = { type: string; dark?: boolean; gnarl?: number; bare?: boolean; trunks?: number; lean?: number; thick?: boolean; thin?: boolean; hollow?: boolean; webs?: boolean; scale?: number };
const TREE_FN: Record<string, unknown> = { broad: Art.broadTree, fir: Art.firTree, willow: Art.willowTree, birch: Art.birchTree, flat: Art.flatTree };

// One of an area's trees, drawn as art/areas.js draws its "tree" props, but keeping the crown
// line so it splits into a top half (shown from the treetops) and a bottom half (the trunk).
function areaTree(def: ArtDef, o: TreeOpts, st: Style, r: () => number, K: number) {
  const f = TREE_FN[o.type] as (r: () => number, st: Style, s: number) => { sp: unknown; crownY: number };
  const ts = { ...st, leafHue: def.leaf + (o.dark ? 0.05 : 0), gnarl: o.gnarl ?? st.gnarl, treeBare: o.bare, treeTrunks: o.trunks, treeLean: o.lean, treeThick: o.thick, treeThin: o.thin, treeHollow: o.hollow, treeWebs: o.webs } as unknown as Style;
  const t = f(r, ts, st.treeSize * K * (o.scale || 1) * Art.uni(r, 0.9, 1.1));
  const c = Art.treeColours(r, ts, f) as Record<number, number[]>;
  if (o.dark) { c[Art.M.LEAF] = c[Art.M.LEAF3]; c[Art.M.LEAF3] = Art.hsv2rgb(def.leaf + 0.05, 0.7, 0.22); }
  c[Art.M.NOSE] = [20, 16, 24]; c[Art.M.GLINT] = [235, 235, 240];
  return { parts: Art.splitTree(t), colours: c };
}

/** Everything an area type needs, from art/areas.js: its big objects (trees in several
 *  variants, split into halves), small objects, wall objects, set piece, and floor tile. */
export function typeSprites(st: Style, seed: number, t: number, K: number, mk: MakeCanvas): { sprites: Baked[]; layout: TypeLayout; floor: Baked } {
  const id = AREA_TYPES[t].id, def = (AREAS as unknown as ArtDef[]).find(a => a.id === id)!;
  const assets = areaAssets(id, st, { K, makeCanvas: mk }) as { floor: { sp: Baked }; walls: { sp: Baked }[]; small: { sp: Baked }[]; big: { sp: Baked }[]; setPiece: { sp: Baked } | null };
  const sprites: Baked[] = [], add = (b: Baked) => sprites.push(b) - 1;
  const layout: TypeLayout = { big: [], small: [], walls: [], set: null };
  const bk = (sp: unknown, col: unknown) => Art.bake(sp, col, st, "none", mk) as Baked;
  // Anything drawn as a tree (big objects, small trees, a tree set piece) is split into crown and
  // trunk, so its crown hides in ground mode; everything else is drawn whole.
  const tree = (o: TreeOpts, k: number): Piece => {
    const { parts, colours } = areaTree(def, o, st, rng(seed * 13 + t * 101 + k * 7 + 1), K);
    return { bot: add(bk(parts.bot, colours)), top: add(bk(parts.top, colours)) };
  };
  def.big.forEach(([kind, o], i) => {
    if (kind !== "tree") { layout.big.push({ bot: add(assets.big[i].sp), top: null }); return; }
    const n = Math.max(1, Math.round(TREE_VARIANTS / def.big.length));
    for (let v = 0; v < n; v++) layout.big.push(tree(o as TreeOpts, i * 17 + v));
  });
  def.small.forEach(([kind, o], i) => layout.small.push(kind === "tree" ? tree(o as TreeOpts, 500 + i) : { bot: add(assets.small[i].sp), top: null }));
  for (const a of assets.walls) layout.walls.push(add(a.sp));
  if (assets.setPiece) layout.set = def.set?.[0] === "tree" ? tree(def.set[1] as TreeOpts, 900) : { bot: add(assets.setPiece.sp), top: null };
  return { sprites, layout, floor: assets.floor.sp };
}

/** A kind of creature at each level (baby, young, adult, legend), two walking frames each. */
export function creatureSprites(st: Style, species: string, mk: MakeCanvas, gear: unknown = null): Baked[] {
  const out: Baked[] = [];
  for (const facing of ["towards", "away"]) for (let level = 0; level < 4; level++) for (let f = 0; f < 2; f++)
    out.push(Art.bake(Art.critter(species, level, f, st, facing, gear as null), Art.speciesColours(species, st, gear as null), st, st.cOutline, mk) as Baked);
  return out;
}
/** Towards: frames 0-7 (level x 2 + walk frame); away: the same, from 8. */
export const creatureFrame = (level: number, f: number, away = false) => (away ? 8 : 0) + level * 2 + f;

function pixels(c: AnyCanvas, w: number, h: number): Uint8ClampedArray {
  const ctx = c.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  return ctx.getImageData(0, 0, w, h).data;
}

/** Shelf-pack the sprites; row 0 is the top of the image. */
export function packPixels(sprites: Baked[], width = 2048): AtlasPixels {
  const pad = 1, place: { x: number; y: number }[] = [];
  let x = 0, y = 0, rowH = 0, W = 1;
  for (const s of sprites) {
    if (x + s.w + pad > width) { x = 0; y += rowH + pad; rowH = 0; }
    place.push({ x, y });
    x += s.w + pad; rowH = Math.max(rowH, s.h); W = Math.max(W, x);
  }
  const H = Math.max(1, y + rowH);
  const albedo = new Uint8Array(W * H * 4), normal = new Uint8Array(W * H * 4);
  const frames: Frame[] = sprites.map((s, i) => {
    const p = place[i], pa = pixels(s.A, s.w, s.h), pn = pixels(s.N, s.w, s.h);
    for (let row = 0; row < s.h; row++) {
      const src = row * s.w * 4, dst = ((p.y + row) * W + p.x) * 4;
      albedo.set(pa.subarray(src, src + s.w * 4), dst);
      normal.set(pn.subarray(src, src + s.w * 4), dst);
    }
    return { uv: [p.x / W, p.y / H, (p.x + s.w) / W, (p.y + s.h) / H], w: s.w, h: s.h };
  });
  return { albedo, normal, width: W, height: H, frames };
}

export type ArtJob = { kind: "type"; id: number; style: Style; seed: number; K: number } | { kind: "creature"; id: string; style: Style }
  /** A party animal: an invited creature in its party gear (seeded by its id: collar in its sigil colour, maybe a hat, sunglasses, shoes). */
  | { kind: "party"; id: string; species: string; seed: number; colour: number[]; style: Style }
  /** Every decoration (ruins in both conditions, rocks, freak trees), split as trees are. */
  | { kind: "decor"; id: string; style: Style };

/** One decoration in the decor atlas: its family, bottom (and top, if tall) frames, and the radius it covers on the ground (m). */
export interface DecorPiece { id: string; family: string; bot: number; top: number | null; footprint: number }

/** A floor tile's pixels: albedo and normal map, w x h. */
export interface TilePixels { albedo: Uint8Array; normal: Uint8Array; w: number; h: number }
export interface ArtResult { px: AtlasPixels; layout?: TypeLayout; floor?: TilePixels; decor?: DecorPiece[] }

function decorSprites(st: Style, mk: MakeCanvas): { sprites: Baked[]; decor: DecorPiece[] } {
  const sprites: Baked[] = [], decor: DecorPiece[] = [], colours = Art.decorColours(st);
  const empty = (sp: { m: ArrayLike<number> }) => { for (let i = 0; i < sp.m.length; i++) if (sp.m[i]) return false; return true; };
  for (const d of Art.DECOR as { id: string; family: string; variants: number }[])
    for (let v = 0; v < d.variants; v++) {
      const r = Art.decorSprite(d.id, st, { variant: v }) as { top: { m: ArrayLike<number> }; bot: unknown; whole: unknown; crownY: number; metres: { footprint: number } };
      const tall = r.crownY > 0 && !empty(r.top);
      const bot = sprites.push(Art.bake(tall ? r.bot : r.whole, colours, st, "none", mk) as Baked) - 1;
      const top = tall ? sprites.push(Art.bake(r.top, colours, st, "none", mk) as Baked) - 1 : null;
      decor.push({ id: d.id, family: d.family, bot, top, footprint: r.metres.footprint });
    }
  return { sprites, decor };
}

export function runJob(job: ArtJob, mk: MakeCanvas): ArtResult {
  if (job.kind === "creature") return { px: packPixels(creatureSprites(job.style, job.id, mk), 2048) };
  if (job.kind === "decor") { const { sprites, decor } = decorSprites(job.style, mk); return { px: packPixels(sprites, 2048), decor }; }
  if (job.kind === "party") return { px: packPixels(creatureSprites(job.style, job.species, mk, { ...Art.partyGear(job.seed), collar: job.colour }), 2048) };
  const { sprites, layout, floor } = typeSprites(job.style, job.seed, job.id, job.K, mk);
  return { px: packPixels(sprites), layout, floor: { albedo: new Uint8Array(pixels(floor.A, floor.w, floor.h)), normal: new Uint8Array(pixels(floor.N, floor.w, floor.h)), w: floor.w, h: floor.h } };
}

/** The buffers a result can hand over to the page without copying. */
export const transferables = (r: ArtResult): ArrayBuffer[] =>
  [r.px.albedo.buffer, r.px.normal.buffer, ...(r.floor ? [r.floor.albedo.buffer, r.floor.normal.buffer] : [])] as ArrayBuffer[];
