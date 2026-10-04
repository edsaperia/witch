// Drawing the sprite sets with art/generator.js and packing them into atlas pixels. No Three.js
// and no page needed, so it runs in a Web Worker (with OffscreenCanvas) as well as on the page.
import * as Art from "../../art/generator.js";
import { AREA_TYPES } from "../rules/map";
import { AREAS, areaAssets } from "../../art/areas.js";
import { rng } from "../rules/random";
import type { Style } from "./style";

type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;
export interface Baked { A: AnyCanvas; N: AnyCanvas; w: number; h: number; /** A wild creature's eye pixels (1), for eyeshine (Ed, v244). */ eyes?: Uint8Array }
/** Where a sprite sits in its atlas: u0, vTop, u1, vBottom, and its size in art pixels. */
/** pad: empty rows (nothing drawn) at the bottom of the sprite, so it can stand on its lowest
 *  drawn pixel rather than on its box. */
export interface Frame { uv: [number, number, number, number]; w: number; h: number; pad?: number }
export interface AtlasPixels { albedo: Uint8Array; normal: Uint8Array; width: number; height: number; frames: Frame[] }

export type MakeCanvas = (w: number, h: number) => AnyCanvas;

/** Where each of an area type's sprites sits in its atlas. A big object with a top half (a
 *  tree's crown) has `top`; one without (a mound, a boulder, a log) is drawn whole, always. */
export interface Piece {
  bot: number; top: number | null;
  /** The pixel (from the sprite's top left) where its middle on the ground lands, for the 3D set
   *  pieces drawn in perspective; without one the sprite stands on its bottom row. */
  origin?: { x: number; y: number };
}
export interface TypeLayout {
  big: Piece[];
  /** Each big object's share of the area's big objects (tree variants by height class). */
  bigWeight: number[];
  small: Piece[];
  walls: number[];
  set: Piece | null;
}

interface ArtDef { id: string; leaf: number; big: [string, Record<string, unknown>][]; small: [string, Record<string, unknown>][]; set?: [string, Record<string, unknown>] }
type TreeOpts = { type: string; minor?: boolean; dark?: boolean; gnarl?: number; bare?: boolean; trunks?: number; lean?: number; thick?: boolean; thin?: boolean; hollow?: boolean; webs?: boolean; scale?: number };

// One of an area's trees, drawn as art/areas.js draws its "tree" props, but keeping the crown
// line so it splits into a top half (shown from the treetops) and a bottom half (the trunk).
function areaTree(def: ArtDef, o: TreeOpts, st: Style, r: () => number, K: number) {
  const f = (Art.treeSpecies as (type: string) => { fn: unknown })(o.type).fn as (r: () => number, st: Style, s: number) => { sp: unknown; crownY: number }; // any species art/trees.js knows
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
  const assets = areaAssets(id, st, { K, makeCanvas: mk }) as { floor: { sp: Baked }; walls: { sp: Baked }[]; small: { sp: Baked }[]; big: { sp: Baked }[]; setPiece: { sp: Baked; origin?: { x: number; y: number } } | null };
  const sprites: Baked[] = [], add = (b: Baked) => sprites.push(b) - 1;
  const layout: TypeLayout = { big: [], bigWeight: [], small: [], walls: [], set: null };
  const bk = (sp: unknown, col: unknown) => Art.bake(sp, col, st, "none", mk) as Baked;
  // Anything drawn as a tree (big objects, small trees, a tree set piece) is split into crown and
  // trunk, so its crown hides in ground mode; everything else is drawn whole.
  const tree = (o: TreeOpts, k: number): Piece => {
    const { parts, colours } = areaTree(def, o, st, rng(seed * 13 + t * 101 + k * 7 + 1), K);
    return { bot: add(bk(parts.bot, colours)), top: add(bk(parts.top, colours)) };
  };
  // Trees: the area's own UK species (a main and a minor one) across four height classes, from
  // saplings to a rare giant over the canopy (art/areas.js areaTreeVariants), each with its share
  // of the area's trees. Anything else big (mounds, boulders, logs) is drawn whole, as before.
  // Each height class gets the area's own share of its trees (its layout's heightMix), split among
  // that class's variants; without one, the art's default weights.
  const variants = Art.areaTreeVariants(id, st, { K, makeCanvas: mk }) as { top: Baked; bot: Baked; weight: number; heightClass: "sapling" | "mature" | "tall" | "giant" }[];
  const mix = AREA_TYPES[t].layout.heightMix, perClass = (c: string) => variants.filter(v => v.heightClass === c).length || 1;
  for (const v of variants) { layout.big.push({ bot: add(v.bot), top: add(v.top) }); layout.bigWeight.push(mix ? mix[v.heightClass] / perClass(v.heightClass) : v.weight); }
  def.big.forEach(([kind], i) => {
    if (kind === "tree" && variants.length) return;
    layout.big.push({ bot: add(assets.big[i].sp), top: null });
    // Tall pieces in the open areas (snags, cairns, standing stones, pillars, spires: #33) stand
    // sparsely: their art's own sparse share as their weight among the area's big objects (about
    // a fifth of them all), the mounds, boulders and logs at 1.
    const sparse = (assets.big[i] as { sparse?: number }).sparse;
    layout.bigWeight.push(variants.length ? 0.1 : sparse ?? 1);
  });
  def.small.forEach(([kind, o], i) => layout.small.push(kind === "tree" ? tree(o as TreeOpts, 500 + i) : { bot: add(assets.small[i].sp), top: null }));
  for (const a of assets.walls) layout.walls.push(add(a.sp));
  if (assets.setPiece) layout.set = def.set?.[0] === "tree" ? tree(def.set[1] as TreeOpts, 900) : { bot: add(assets.setPiece.sp), top: null, origin: assets.setPiece.origin };
  return { sprites, layout, floor: assets.floor.sp };
}

/** A kind of creature at each level (baby, young, adult, legend), two walking frames each. */
export function creatureSprites(st: Style, species: string, mk: MakeCanvas, gear: unknown = null): Baked[] {
  const out: Baked[] = [];
  for (const facing of ["towards", "away"]) for (let level = 0; level < 4; level++) for (let f = 0; f < 2; f++) {
    const sp = Art.critter(species, level, f, st, facing, gear as null) as { m: ArrayLike<number> };
    const b = Art.bake(sp, Art.speciesColours(species, st, gear as null), st, st.cOutline, mk) as Baked;
    if (!gear) b.eyes = eyeMask(sp.m);
    out.push(b);
  }
  return out;
}

// Wild creatures' eyes (Ed, v244): packPixels gives their eye pixels alpha 253, so the sprite
// shader can make them catch the light (eyeshine) when finding is on; otherwise they're lit like the rest.
const EYES = new Set([Art.M.EYE, Art.M.IRIS, Art.M.PUPIL]);
function eyeMask(m: ArrayLike<number>): Uint8Array | undefined {
  const out = new Uint8Array(m.length);
  let any = false;
  for (let i = 0; i < m.length; i++) if (EYES.has(m[i])) { out[i] = 1; any = true; }
  return any ? out : undefined;
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
      if (s.eyes) for (let x = 0; x < s.w; x++) if (s.eyes[row * s.w + x] && albedo[dst + x * 4 + 3] === 255) albedo[dst + x * 4 + 3] = 253;
      normal.set(pn.subarray(src, src + s.w * 4), dst);
    }
    // Its lowest drawn row (the sprite shader drops alpha under a half).
    let pad = 0;
    bottom: for (let row = s.h - 1; row >= 0; row--, pad++) for (let x = 0; x < s.w; x++) if (pa[(row * s.w + x) * 4 + 3] >= 128) break bottom;
    return { uv: [p.x / W, p.y / H, (p.x + s.w) / W, (p.y + s.h) / H], w: s.w, h: s.h, pad: Math.min(pad, s.h) };
  });
  return { albedo, normal, width: W, height: H, frames };
}

export type ArtJob = { kind: "type"; id: number; style: Style; seed: number; K: number } | { kind: "creature"; id: string; style: Style }
  /** A party animal: an invited creature in its party gear (seeded by its id: collar in its sigil colour, maybe a hat, sunglasses, shoes). */
  | { kind: "party"; id: string; species: string; seed: number; colour: number[]; style: Style }
  /** Every decoration (ruins in both conditions, rocks, freak trees), split as trees are. */
  | { kind: "decor"; id: string; style: Style }
  /** The paths' 3D pieces: bridges, stairs, railway landmarks, signal and verge posts. */
  | { kind: "pathPieces"; id: string; style: Style }
  /** Modern relics, playground and sports pieces, with the art's arrangements. */
  | { kind: "relics"; id: string; style: Style }
  /** The dancefloor's speakers: every drawn angle, state and frame. */
  | { kind: "speakers"; id: string; style: Style }
  /** Every scene's pieces (each drawn once) and each scene's layout, as authored and mirrored. */
  | { kind: "scenes"; id: string; style: Style };

/** A scene piece in its atlas (by its name in the scenes' table), with its ground point; and each
 *  scene's pieces in metres from its middle, as authored and mirrored. */
export interface SceneArt { pieces: Record<string, { frame: number; originX: number; originY: number; decal: boolean }>; layouts: Record<string, { plain: ScenePlace[]; mirror: ScenePlace[] }> }
export interface ScenePlace { ref: string; dx: number; dz: number; left: boolean }

/** The dancefloor speakers in their atlas: the frame for "angle:state:frame", and each angle's ground point. */
export interface SpeakerArt { frames: Record<string, number>; origin: Record<number, { x: number; y: number }> }

/** One relic in its atlas: family (modern, playground, sports), whether it's a flat ground decal, and its ground point. */
export interface RelicArt { id: string; family: string; decal: boolean; frame: number; originX: number; originY: number }
export type RelicLayouts = Record<string, { id: string; x: number; z: number }[]>;

/** One path piece in its atlas: its frame and where its middle on the ground lands (art pixels from the left). */
export interface PathPieceArt { id: string; frame: number; originX: number; /** Where its middle on the ground lands, from the top. */ originY: number }

/** One decoration in the decor atlas: its family, bottom (and top, if tall) frames, and the radius it covers on the ground (m). */
export interface DecorPiece { id: string; family: string; bot: number; top: number | null; footprint: number }

/** A floor tile's pixels: albedo and normal map, w x h. */
export interface TilePixels { albedo: Uint8Array; normal: Uint8Array; w: number; h: number }
export interface ArtResult { px: AtlasPixels; layout?: TypeLayout; floor?: TilePixels; decor?: DecorPiece[]; pieces?: PathPieceArt[]; relics?: RelicArt[]; layouts?: RelicLayouts; speakers?: SpeakerArt; scenes?: SceneArt }

function sceneSprites(st: Style, mk: MakeCanvas): { sprites: Baked[]; scenes: SceneArt } {
  const sprites: Baked[] = [], scenes: SceneArt = { pieces: {}, layouts: {} };
  type Layout = { pieces: { sprite: string; dx: number; dz: number; facing?: string }[] };
  for (const sc of Art.SCENES as { id: string }[]) {
    const lay = (mirror: boolean) => (Art.sceneLayout(sc.id, st, { mirror }) as Layout).pieces.map(p => ({ ref: p.sprite, dx: p.dx, dz: p.dz, left: p.facing === "left" }));
    scenes.layouts[sc.id] = { plain: lay(false), mirror: lay(true) };
    for (const p of scenes.layouts[sc.id].plain) {
      if (scenes.pieces[p.ref]) continue;
      const piece = Art.scenePiece(p.ref, st) as { sprite: { whole: unknown; origin: { x: number; y: number } }; colours: unknown; decal: boolean };
      scenes.pieces[p.ref] = { frame: sprites.push(Art.bake(piece.sprite.whole, piece.colours, st, "none", mk) as Baked) - 1, originX: piece.sprite.origin.x, originY: piece.sprite.origin.y, decal: piece.decal };
    }
  }
  return { sprites, scenes };
}

function speakerSprites(st: Style, mk: MakeCanvas): { sprites: Baked[]; speakers: SpeakerArt } {
  const sprites: Baked[] = [], speakers: SpeakerArt = { frames: {}, origin: {} }, colours = Art.dancefloorSpeakerColours();
  for (const angle of Art.DANCEFLOOR_SPEAKER_ANGLES as number[])
    for (const [state, n] of Object.entries(Art.DANCEFLOOR_SPEAKER_STATES as Record<string, number>))
      for (let frame = 0; frame < n; frame++) {
        const r = Art.dancefloorSpeakerSprite(st, { angle, state, frame }) as { sp: unknown; origin: { x: number; y: number } };
        speakers.frames[`${angle}:${state}:${frame}`] = sprites.push(Art.bake(r.sp, colours, st, st.cOutline, mk) as Baked) - 1;
        if (!speakers.origin[angle]) speakers.origin[angle] = r.origin;
      }
  return { sprites, speakers };
}

function relicSprites(st: Style, mk: MakeCanvas): { sprites: Baked[]; relics: RelicArt[]; layouts: RelicLayouts } {
  const sprites: Baked[] = [], relics: RelicArt[] = [], colours = Art.relicColours(st);
  for (const d of Art.RELICS as { id: string; family: string; decal?: boolean }[]) {
    const r = Art.relicSprite(d.id, st) as { whole: unknown; origin: { x: number; y: number } };
    relics.push({ id: d.id, family: d.family, decal: !!d.decal, frame: sprites.push(Art.bake(r.whole, colours, st, "none", mk) as Baked) - 1, originX: r.origin.x, originY: r.origin.y });
  }
  // The countryside and street pieces that stand alone (Ed, 2026-10-04) join the modern finds, after the relics' own (the rules count them in this order).
  const cc = Art.countryColours(st);
  for (const d of Art.COUNTRY as { id: string; family: string }[]) {
    if (d.family !== "farm" && d.family !== "street") continue;
    const r = Art.countrySprite(d.id, st) as { whole: unknown; origin: { x: number; y: number } };
    relics.push({ id: d.id, family: "modern", decal: false, frame: sprites.push(Art.bake(r.whole, cc, st, "none", mk) as Baked) - 1, originX: r.origin.x, originY: r.origin.y });
  }
  return { sprites, relics, layouts: Art.relicLayouts(st) as RelicLayouts };
}

function pathPieceSprites(st: Style, mk: MakeCanvas): { sprites: Baked[]; pieces: PathPieceArt[] } {
  const sprites: Baked[] = [], pieces: PathPieceArt[] = [], colours = Art.pathColours(st);
  for (const d of Art.PATH_PIECES as { id: string }[]) {
    const r = Art.pathPieceSprite(d.id, st) as { sp: unknown; origin: { x: number; y: number } };
    pieces.push({ id: d.id, frame: sprites.push(Art.bake(r.sp, colours, st, "none", mk) as Baked) - 1, originX: r.origin.x, originY: r.origin.y });
  }
  return { sprites, pieces };
}

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
  if (job.kind === "relics") { const { sprites, relics, layouts } = relicSprites(job.style, mk); return { px: packPixels(sprites, 2048), relics, layouts }; }
  if (job.kind === "pathPieces") { const { sprites, pieces } = pathPieceSprites(job.style, mk); return { px: packPixels(sprites, 2048), pieces }; }
  if (job.kind === "scenes") { const { sprites, scenes } = sceneSprites(job.style, mk); return { px: packPixels(sprites, 2048), scenes }; }
  if (job.kind === "speakers") { const { sprites, speakers } = speakerSprites(job.style, mk); return { px: packPixels(sprites, 2048), speakers }; }
  if (job.kind === "decor") { const { sprites, decor } = decorSprites(job.style, mk); return { px: packPixels(sprites, 2048), decor }; }
  if (job.kind === "party") return { px: packPixels(creatureSprites(job.style, job.species, mk, { ...Art.partyGear(job.seed), collar: job.colour }), 2048) };
  const { sprites, layout, floor } = typeSprites(job.style, job.seed, job.id, job.K, mk);
  return { px: packPixels(sprites), layout, floor: { albedo: new Uint8Array(pixels(floor.A, floor.w, floor.h)), normal: new Uint8Array(pixels(floor.N, floor.w, floor.h)), w: floor.w, h: floor.h } };
}

/** The buffers a result can hand over to the page without copying. */
export const transferables = (r: ArtResult): ArrayBuffer[] =>
  [r.px.albedo.buffer, r.px.normal.buffer, ...(r.floor ? [r.floor.albedo.buffer, r.floor.normal.buffer] : [])] as ArrayBuffer[];
