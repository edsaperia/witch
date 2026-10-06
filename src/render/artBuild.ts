// Drawing the sprite sets with art/generator.js and packing them into atlas pixels. No Three.js
// and no page needed, so it runs in a Web Worker (with OffscreenCanvas) as well as on the page.
import * as Art from "../../art/generator.js";
import { LOOKS } from "../rules/map";
import { AREA_BY_ID, areaAssets } from "../../art/areas.js";
import { rng } from "../rules/random";
import type { Style } from "./style";
import { rigSprites, type RigGear, type RigMeta } from "./rig/rigBuild";

type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;
export interface Baked { A: AnyCanvas; N: AnyCanvas; w: number; h: number; /** A wild creature's eye pixels (1), for eyeshine (Ed, v244). */ eyes?: Uint8Array; /** Its sway mask (#34: grey, 0 rigid to 255 the leafy tips), packed into the normal map's alpha. */ S?: AnyCanvas }
/** Where a sprite sits in its atlas: u0, vTop, u1, vBottom, and its size in art pixels. */
/** pad: empty rows (nothing drawn) at the bottom of the sprite, so it can stand on its lowest
 *  drawn pixel rather than on its box. */
export interface Frame { uv: [number, number, number, number]; w: number; h: number; pad?: number; /** Its sway mask is in its normal map's alpha (#34): it sways per pixel, leaves only. */ masked?: boolean }
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
  /** The big objects of its tallest tree kinds, by index (a legend's grove grows only these: rules/forest.ts legendGrove):
   *  giant, its biggest class (or its tallest if it has none), and tall, the next (or giant again). */
  grove: { giant: number[]; tall: number[] };
  small: Piece[];
  walls: number[];
  set: Piece | null;
  /** The rim kit round a sleeping legend's clearing (#235; art/areas.js areaAssets' rim): 6 small pieces (none over a metre),
   *  each its frame, its form (stone, cairn, boulder, toadstools, stump, post) and its height in metres. */
  rim: { frame: number; form: string; height: number }[];
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
  const id = LOOKS[t].id, def = (AREA_BY_ID as unknown as Record<string, ArtDef>)[id]; // (LOOKS: the area types and home's meadow)
  const assets = areaAssets(id, st, { K, makeCanvas: mk }) as { floor: { sp: Baked }; walls: { sp: Baked }[]; small: { sp: Baked }[]; big: { sp: Baked }[]; setPiece: { sp: Baked; origin?: { x: number; y: number } } | null; rim: { sp: Baked; kind: string; metres: { height: number } }[] };
  const sprites: Baked[] = [], add = (b: Baked) => sprites.push(b) - 1;
  const layout: TypeLayout = { big: [], bigWeight: [], grove: { giant: [], tall: [] }, small: [], walls: [], set: null, rim: [] };
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
  const variants = (Art.areaTreeVariants as (id: string, st: Style, o: object) => unknown)(id, st, { K, makeCanvas: mk, flora: (Art.floraPick as (q: unknown) => string[])(st.flora) }) as { top: Baked; bot: Baked; weight: number; heightClass: "sapling" | "mature" | "tall" | "giant"; sway?: { top: unknown; bot: unknown } }[]; // flora: ?flora= (main.ts), these species instead of the area's own
  const mix = LOOKS[t].layout.heightMix, perClass = (c: string) => variants.filter(v => v.heightClass === c).length || 1;
  // Each carries its sway mask (#34), so only its leaves move in the wind.
  const withSway = (b: Baked, S?: unknown) => (S ? { ...b, S: S as Baked["A"] } : b);
  for (const v of variants) { layout.big.push({ bot: add(withSway(v.bot, v.sway?.bot)), top: add(withSway(v.top, v.sway?.top)) }); layout.bigWeight.push(mix ? mix[v.heightClass] / perClass(v.heightClass) : v.weight); }
  // The grove's trees (a legend's ring of old giants, Ed 2026-10-06): the two tallest classes it has.
  const ranks = ["sapling", "mature", "tall", "giant"], have = ranks.filter(c => variants.some(v => v.heightClass === c)), of = (c?: string) => variants.flatMap((v, i) => (v.heightClass === c ? [i] : []));
  layout.grove.giant = of(have[have.length - 1]); layout.grove.tall = have.length > 1 ? of(have[have.length - 2]) : layout.grove.giant;
  def.big.forEach(([kind], i) => {
    if (kind === "tree" && variants.length) return;
    layout.big.push({ bot: add(withSway(assets.big[i].sp, (assets.big[i] as { sway?: unknown }).sway)), top: null });
    // Tall pieces in the open areas (snags, cairns, standing stones, pillars, spires: #33) stand
    // sparsely: their art's own sparse share as their weight among the area's big objects (about
    // a fifth of them all), the mounds, boulders and logs at 1.
    const sparse = (assets.big[i] as { sparse?: number }).sparse;
    layout.bigWeight.push(variants.length ? 0.1 : sparse ?? 1);
  });
  def.small.forEach(([kind, o], i) => layout.small.push(kind === "tree" ? tree(o as TreeOpts, 500 + i) : { bot: add(withSway(assets.small[i].sp, (assets.small[i] as { sway?: unknown }).sway)), top: null }));
  for (const a of assets.walls) layout.walls.push(add(a.sp));
  for (const a of assets.rim) layout.rim.push({ frame: add(a.sp), form: a.kind, height: a.metres.height });
  if (assets.setPiece) layout.set = def.set?.[0] === "tree" ? tree(def.set[1] as TreeOpts, 900) : { bot: add(assets.setPiece.sp), top: null, origin: assets.setPiece.origin };
  return { sprites, layout, floor: assets.floor.sp };
}

/** A kind of creature at each level (baby, young, adult, legend), two walking frames each. */
export function creatureSprites(st: Style, species: string, mk: MakeCanvas, gear: unknown = null): Baked[] {
  const out: Baked[] = [];
  for (const facing of ["towards", "away"]) for (let level = 0; level < 4; level++) for (let f = 0; f < 2; f++) {
    const sp = Art.critter(species, level, f, st, facing, gear as null) as { m: ArrayLike<number> };
    const b = Art.bake(sp, Art.speciesColours(species, st, gear as null), st, st.cOutline, mk) as Baked;
    if (!gear || Object.keys(gear).every(k => k === "face")) b.eyes = eyeMask(sp.m); // (an expression alone keeps the find-in-the-dark eyes)
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
    const sd = s.S ? pixels(s.S, s.w, s.h) : null, sway = sd ? Array.from({ length: s.h }, (_, row) => Array.from({ length: s.w }, (_, x) => sd[(row * s.w + x) * 4 + 1])) : null; // G: the pixel-wind code (art/sway.js swayCode)
    for (let row = 0; row < s.h; row++) {
      const src = row * s.w * 4, dst = ((p.y + row) * W + p.x) * 4;
      albedo.set(pa.subarray(src, src + s.w * 4), dst);
      if (s.eyes) for (let x = 0; x < s.w; x++) if (s.eyes[row * s.w + x] && albedo[dst + x * 4 + 3] === 255) albedo[dst + x * 4 + 3] = 253;
      normal.set(pn.subarray(src, src + s.w * 4), dst);
      if (s.S) { const ps = sway![row]; for (let x = 0; x < s.w; x++) if (normal[dst + x * 4 + 3]) normal[dst + x * 4 + 3] = ps[x]; } // after the normals: the mask in their alpha
    }
    // Its lowest drawn row (the sprite shader drops alpha under a half).
    let pad = 0;
    bottom: for (let row = s.h - 1; row >= 0; row--, pad++) for (let x = 0; x < s.w; x++) if (pa[(row * s.w + x) * 4 + 3] >= 128) break bottom;
    return { uv: [p.x / W, p.y / H, (p.x + s.w) / W, (p.y + s.h) / H], w: s.w, h: s.h, pad: Math.min(pad, s.h), ...(s.S ? { masked: true } : {}) };
  });
  return { albedo, normal, width: W, height: H, frames };
}

export type ArtJob = { kind: "type"; id: number; style: Style; seed: number; K: number } | { kind: "creature"; id: string; style: Style } | { kind: "rig"; id: string; species: string; level: number; style: Style; /** a party animal's gear, baked on */ gear?: RigGear }
  /** A creature enraged by a wave (Stage 4 playtest): angry glowing red eyes and a darker tint. */
  | { kind: "woken"; id: string; species: string; style: Style }
  /** An area legend asleep (art/legends.js legendForm): its two breathing frames, sunk and grown over. */
  | { kind: "sleep"; id: string; species: string; style: Style }
  | { kind: "nap"; id: string; species: string; style: Style; /** a party animal's (or a happy one's) own gear, by its seed and collar colour (null: none), worn asleep */ dressed?: { seed: number; colour: number[] | null } }
  | { kind: "face"; id: string; species: string; face: string; style: Style }
  /** A party animal: an invited creature in its party gear (seeded by its id: collar in its sigil colour, maybe a hat, sunglasses, shoes). */
  | { kind: "party"; id: string; species: string; seed: number; /** the collar's colour; null: no collar (happy, issue #87) */ colour: number[] | null; style: Style }
  /** Every decoration (ruins in both conditions, rocks, freak trees), split as trees are. */
  | { kind: "decor"; id: string; style: Style }
  /** The paths' 3D pieces: bridges, stairs, railway landmarks, signal and verge posts. */
  | { kind: "pathPieces"; id: string; style: Style }
  /** Modern relics, playground and sports pieces, with the art's arrangements. */
  | { kind: "relics"; id: string; style: Style }
  /** The dancefloor's speakers: every drawn angle, state and frame. */
  | { kind: "speakers"; id: string; style: Style }
  /** Every scene's pieces (each drawn once) and each scene's layout, as authored and mirrored. */
  | { kind: "scenes"; id: string; style: Style }
  /** A party witch (#37): her look from partyWitch(seed) (or, seed null, our witch's own), in every party pose. */
  | { kind: "partyWitch"; id: string; seed: number | null; style: Style; /** our witch's genome (art/witchGenome.js), for seed null; else the classic witch */ genome?: unknown }
  /** Every party object (#38) in each neon and balloon palette a placement can pick (campfires in their three frames), and the clusters' layouts. */
  | { kind: "partyObjects"; id: string; style: Style }
  /** The beach's decorations (art/beach.js): its finds, and each footprint at every heading. */
  | { kind: "beach"; id: string; style: Style };

/** The beach's pieces in their atlas, by id (a print by "<id>~<heading>"): frame and ground point. */
export interface BeachArt { pieces: Record<string, { frame: number; originX: number; originY: number }>; finds: string[]; prints: string[]; headings: number }

/** The party objects in their atlas, by ref ("party:<id>[@<neon>][~<palette>]"): frames (more than one: animated), ground point, decal; and each cluster's layout. */
export interface PartyArt { pieces: Record<string, { frames: number[]; originX: number; originY: number; decal: boolean; /** Where it hangs from (hanging pieces): pixels from its top-left. */ hang?: { x: number; y: number } }>; layouts: Record<string, { plain: ScenePlace[]; mirror: ScenePlace[] }> }

/** A party witch's frames: each foot pose's frames facing us (the view mirrors them), her hover
 *  frames for flying (towards and away), and each frame's anchors in its sprite's pixels (pair, back, cup, hand, hatTip). */
export interface PartyWitchArt { poses: Record<string, number[]>; fps: Record<string, number>; hover: { towards: number[]; away: number[] }; anchors: (Record<string, [number, number]> | null)[] }

/** A scene piece in its atlas (by its name in the scenes' table), with its ground point; and each
 *  scene's pieces in metres from its middle, as authored and mirrored. */
export interface SceneArt { pieces: Record<string, { frame: number; originX: number; originY: number; decal: boolean }>; layouts: Record<string, { plain: ScenePlace[]; mirror: ScenePlace[] }> }
export interface ScenePlace { ref: string; dx: number; dz: number; left: boolean }

/** The dancefloor speakers in their atlas: the frame for "angle:state:frame", and each angle's ground point. */
export interface SpeakerArt { frames: Record<string, number>; origin: Record<number, { x: number; y: number }>; /** The small runestone each home speaker starts as (Ed, 2026-10-06), and its ground point. */ stone?: number; stoneOrigin?: { x: number; y: number } }

/** One relic in its atlas: family (modern, playground, sports), whether it's a flat ground decal, and its ground point. */
export interface RelicArt { id: string; family: string; decal: boolean; frame: number; originX: number; originY: number }
export type RelicLayouts = Record<string, { id: string; x: number; z: number }[]>;

/** One path piece in its atlas: its frame and where its middle on the ground lands (art pixels from the left). */
export interface PathPieceArt { id: string; frame: number; originX: number; /** Where its middle on the ground lands, from the top. */ originY: number }

/** One decoration in the decor atlas: its family, bottom (and top, if tall) frames, and the radius it covers on the ground (m). */
export interface DecorPiece { id: string; family: string; bot: number; top: number | null; footprint: number }

/** A floor tile's pixels: albedo and normal map, w x h. */
export interface TilePixels { albedo: Uint8Array; normal: Uint8Array; w: number; h: number }
export interface ArtResult { /** A sleeping legend's ground line in each frame: rows from its top (the art's origin). */ ground?: number[]; /** And how far its body's middle (the origin) lies right of the frame's middle, pixels. */ centre?: number[]; /** The live rig's parts (#79): their joints and pieces. */ rig?: RigMeta; px: AtlasPixels; layout?: TypeLayout; floor?: TilePixels; decor?: DecorPiece[]; pieces?: PathPieceArt[]; relics?: RelicArt[]; beach?: BeachArt; layouts?: RelicLayouts; speakers?: SpeakerArt; scenes?: SceneArt; witch?: PartyWitchArt; party?: PartyArt }

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
  // the runestone it starts as (the areas' rune stone, cyan, its home rune): drawn small by the view
  const stone = (Art.runeStone as unknown as (st: Style, o: { glow: string; makeCanvas: MakeCanvas }) => Baked)(st, { glow: "cyan", makeCanvas: mk });
  speakers.stone = sprites.push(stone) - 1; speakers.stoneOrigin = { x: stone.w / 2, y: stone.h };
  return { sprites, speakers };
}

function beachSprites(st: Style, mk: MakeCanvas): { sprites: Baked[]; beach: BeachArt } {
  const sprites: Baked[] = [], colours = Art.beachColours(st), H = Art.PRINT_HEADINGS as number;
  const beach: BeachArt = { pieces: {}, finds: [], prints: [], headings: H };
  const put = (key: string, id: string, heading = 0) => {
    const r = Art.beachSprite(id, st, { heading }) as { whole: unknown; origin: { x: number; y: number } };
    beach.pieces[key] = { frame: sprites.push(Art.bake(r.whole, colours, st, "none", mk) as Baked) - 1, originX: r.origin.x, originY: r.origin.y };
  };
  for (const d of Art.BEACH_FINDS as { id: string }[]) { put(d.id, d.id); beach.finds.push(d.id); }
  for (const d of Art.BEACH_PRINTS as { id: string }[]) { for (let h = 0; h < H; h++) put(`${d.id}~${h}`, d.id, h); beach.prints.push(d.id); }
  return { sprites, beach };
}

function relicSprites(st: Style, mk: MakeCanvas): { sprites: Baked[]; relics: RelicArt[]; layouts: RelicLayouts } {
  const sprites: Baked[] = [], relics: RelicArt[] = [], colours = Art.relicColours(st);
  for (const d of Art.RELICS as { id: string; family: string; decal?: boolean; scatter?: boolean }[]) {
    const r = Art.relicSprite(d.id, st) as { whole: unknown; origin: { x: number; y: number } };
    relics.push({ id: d.id, family: d.family === "modern" && d.scatter === false ? "unscattered" : d.family, decal: !!d.decal, frame: sprites.push(Art.bake(r.whole, colours, st, "none", mk) as Baked) - 1, originX: r.origin.x, originY: r.origin.y }); // the bits of highway kept out of the modern finds the rules scatter (Ed, round 13)
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
  // Under ?props=gen, each bridge's and the fingerpost's generated variants too ("footbridge~0"...), which the view picks among by place.
  if ((st as { propGen?: number }).propGen) for (const id of Art.PATH_GEN_IDS as string[]) for (let k = 0; k < (Art.BRIDGE_VARIANTS as number); k++) {
    const r = Art.pathPieceSprite(`${id}~${k}`, st) as { sp: unknown; origin: { x: number; y: number } };
    pieces.push({ id: `${id}~${k}`, frame: sprites.push(Art.bake(r.sp, colours, st, "none", mk) as Baked) - 1, originX: r.origin.x, originY: r.origin.y });
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

function partyObjectSprites(st: Style, mk: MakeCanvas): { sprites: Baked[]; party: PartyArt } {
  const sprites: Baked[] = [], party: PartyArt = { pieces: {}, layouts: {} };
  type Def = { id: string; cls: string; light: string | null; frames: number; hang?: boolean };
  const refs = new Set<string>(), palettes = ["neon", "pastel", "metallic", "mixed"];
  for (const d of Art.PARTY_OBJECTS as Def[]) {
    if (d.id.startsWith("gen-") && !st.propGen) continue; // the prop generator's party pieces only under ?props=gen
    const neons = d.light === "neon" ? (Art.PARTY_LIGHT_NEONS as string[]).map(n => "@" + n) : [""];
    for (const n of neons) for (const p of d.cls === "balloon" ? palettes.map(q => "~" + q) : [""]) refs.add(`party:${d.id}${n}${p}`);
  }
  type Layout = { pieces: { sprite: string; dx: number; dz: number; facing?: string }[] };
  for (const c of Art.PARTY_CLUSTERS as { id: string }[]) {
    const lay = (mirror: boolean) => (Art.sceneLayout(c.id, st, { mirror }) as Layout).pieces.map(p => ({ ref: p.sprite, dx: p.dx, dz: p.dz, left: p.facing === "left" }));
    party.layouts[c.id] = { plain: lay(false), mirror: lay(true) };
    for (const p of party.layouts[c.id].plain) refs.add(p.ref);
  }
  for (const ref of refs) {
    const piece = Art.scenePiece(ref, st) as { sprite: { whole: unknown; origin: { x: number; y: number }; anchors?: Record<string, { x: number; y: number }> }; colours: unknown; decal: boolean; def?: { frames?: number } };
    const hang = piece.sprite.anchors?.hang ?? piece.sprite.anchors?.tie;
    const id = ref.replace(/^party:/, "").split("~")[0].split("@")[0], n = (Art.PARTY_BY_ID as Record<string, { frames: number }>)[id]?.frames ?? 1;
    if (n <= 1) {
      party.pieces[ref] = { frames: [sprites.push(Art.bake(piece.sprite.whole, piece.colours, st, "none", mk) as Baked) - 1], originX: piece.sprite.origin.x, originY: piece.sprite.origin.y, decal: piece.decal, ...(hang ? { hang } : {}) };
      continue;
    }
    // Animated (the fires): each frame is its own size with its own origin, so they're laid into one
    // shared box with their origins on the same pixel; only the flames move (Ed: "fires of all kinds
    // seem to jitter during their animations").
    const raw = Array.from({ length: n }, (_, f) => Art.partySprite(id, st, { frame: f }) as { whole: unknown; origin: { x: number; y: number } });
    const baked = raw.map(r => Art.bake(r.whole, piece.colours, st, "none", mk) as Baked);
    const left = Math.max(...raw.map(r => r.origin.x)), up = Math.max(...raw.map(r => r.origin.y));
    const W = Math.ceil(left + Math.max(...raw.map((r, f) => baked[f].w - r.origin.x))), H = Math.ceil(up + Math.max(...raw.map((r, f) => baked[f].h - r.origin.y)));
    const frames = baked.map((b, f) => {
      const dx = Math.round(left - raw[f].origin.x), dy = Math.round(up - raw[f].origin.y), A = mk(W, H), N = mk(W, H);
      (A.getContext("2d") as CanvasRenderingContext2D).drawImage(b.A as CanvasImageSource, dx, dy);
      (N.getContext("2d") as CanvasRenderingContext2D).drawImage(b.N as CanvasImageSource, dx, dy);
      return sprites.push({ A, N, w: W, h: H }) - 1;
    });
    party.pieces[ref] = { frames, originX: left, originY: up, decal: piece.decal };
  }
  return { sprites, party };
}

/** Our witch's look and colours from her genome (art/witchGenome.js; null: the classic witch, the style's hues on top). */
export function witchLookOf(st: Style, genome: unknown): { look: object | undefined; colours: object } {
  if (!genome) return { look: undefined, colours: Art.witchColours(st) };
  const { look, outfit } = (Art.genomeLook as (g: unknown) => { look: object; outfit: object | null })(genome);
  const colours = Art.witchColours as (st: Style, outfit?: object, o?: { styleHues?: boolean }) => object;
  return { look, colours: outfit ? colours(st, outfit, { styleHues: false }) : colours(st) };
}

function partyWitchSprites(st: Style, seed: number | null, mk: MakeCanvas, genome: unknown = null): { sprites: Baked[]; witch: PartyWitchArt } {
  const pw = seed === null ? null : (Art.partyWitch as (s: number) => { look: object; colours: (st: Style) => object })(seed);
  const mine = seed === null ? witchLookOf(st, genome) : null;
  const colours = pw ? pw.colours(st) : mine!.colours, look = pw ? pw.look : mine!.look;
  const sprites: Baked[] = [], witch: PartyWitchArt = { poses: {}, fps: {}, hover: { towards: [], away: [] }, anchors: [] };
  const draw = (o: object) => {
    const sp = (Art.witchSprite as (st: Style, o: object) => unknown)(st, { ...o, look }) as { anchors?: Record<string, [number, number]> };
    witch.anchors.push(sp.anchors ? Object.fromEntries(Object.entries(sp.anchors).map(([k, p]) => [k, [p[0], p[1]] as [number, number]])) : null);
    return sprites.push(Art.bake(sp, colours, st, st.cOutline, mk) as Baked) - 1;
  };
  const FOOT = Art.WITCH_FOOT_POSES as Record<string, { frames: number; fps: number; party?: string }>;
  for (const [pose, P] of Object.entries(FOOT)) {
    if (!P.party && pose !== "stand" && pose !== "land" && pose !== "takeoff") continue;
    witch.poses[pose] = Array.from({ length: P.frames }, (_, frame) => draw({ pose, frame }));
    witch.fps[pose] = P.fps;
  }
  for (const facing of ["towards", "away"] as const) witch.hover[facing] = [0, 1, 2].map(frame => draw({ frame, facing }));
  return { sprites, witch };
}

/** A party animal's gear (seeded by its id). Leashed: its seeded gear and the glowing collar in
 *  `colour`. Happy (colour null): the gear without the collar, always at least a hat so it reads as
 *  dressed up. The party bake and the live rig's party pages both wear it. */
export function partyGearOf(seed: number, colour: number[] | null): RigGear {
  const g = Art.partyGear(seed) as { hat: number | null; glasses: string | null; shoes: string | null };
  return { collar: colour ?? null, hat: !colour && g.hat === null ? seed % 3 : g.hat, glasses: g.glasses, shoes: g.shoes };
}

export function runJob(job: ArtJob, mk: MakeCanvas): ArtResult {
  if (job.kind === "partyObjects") { const { sprites, party } = partyObjectSprites(job.style, mk); return { px: packPixels(sprites, 2048), party }; }
  if (job.kind === "partyWitch") { const { sprites, witch } = partyWitchSprites(job.style, job.seed, mk, job.genome ?? null); return { px: packPixels(sprites, 2048), witch }; }
  if (job.kind === "creature") return { px: packPixels(creatureSprites(job.style, job.id, mk), 2048) };
  if (job.kind === "rig") { const r = rigSprites(job.style, job.species, job.level, mk, job.gear ?? null); return r ? { px: r.px, rig: r.meta } : { px: packPixels([], 16) }; }
  if (job.kind === "beach") { const { sprites, beach } = beachSprites(job.style, mk); return { px: packPixels(sprites, 1024), beach }; }
  if (job.kind === "relics") { const { sprites, relics, layouts } = relicSprites(job.style, mk); return { px: packPixels(sprites, 2048), relics, layouts }; }
  if (job.kind === "pathPieces") { const { sprites, pieces } = pathPieceSprites(job.style, mk); return { px: packPixels(sprites, 2048), pieces }; }
  if (job.kind === "scenes") { const { sprites, scenes } = sceneSprites(job.style, mk); return { px: packPixels(sprites, 2048), scenes }; }
  if (job.kind === "speakers") { const { sprites, speakers } = speakerSprites(job.style, mk); return { px: packPixels(sprites, 2048), speakers }; }
  if (job.kind === "decor") { const { sprites, decor } = decorSprites(job.style, mk); return { px: packPixels(sprites, 2048), decor }; }
  // (enraged: red eyes and the angry face; dressed up: the happy face; art/genome/expressions.js)
  if (job.kind === "sleep") {
    const sprites: Baked[] = [], ground: number[] = [], centre: number[] = [];
    for (let f = 0; f < 2; f++) {
      const { sp, colours } = Art.legendForm(job.species, job.style, { frame: f }) as { sp: { origin?: number[]; h: number; w: number }; colours: unknown };
      sprites.push(Art.bake(sp, colours, job.style, "none", mk) as Baked);
      ground.push(sp.origin ? sp.origin[1] : sp.h); centre.push(sp.origin ? sp.origin[0] - sp.w / 2 : 0);
    }
    return { px: packPixels(sprites, 2048), ground, centre };
  }
  // a creature asleep (art/naps.js): each level (baby to legend) in its 2 breathing frames, towards (mirrored for the other way), with its ground line
  if (job.kind === "nap") {
    const sprites: Baked[] = [], ground: number[] = [], centre: number[] = [];
    // (dressed: in its party gear, Ed 2026-10-06: sleepers keep their party gear on)
    const gear = { ...(job.dressed ? partyGearOf(job.dressed.seed, job.dressed.colour) : {}), nap: true } as unknown as null;
    for (let level = 0; level < 4; level++) for (let f = 0; f < 2; f++) {
      const sp = Art.critter(job.species, level, f, job.style, "towards", gear) as { origin?: number[]; h: number; w: number; m: ArrayLike<number> };
      sprites.push(Art.bake(sp, Art.speciesColours(job.species, job.style, gear), job.style, job.style.cOutline, mk) as Baked);
      ground.push(sp.origin ? sp.origin[1] : sp.h); centre.push(sp.origin ? sp.origin[0] - sp.w / 2 : 0);
    }
    return { px: packPixels(sprites, 2048), ground, centre };
  }
  if (job.kind === "woken") return { px: packPixels(creatureSprites(job.style, job.species, mk, { woken: true, face: "angry" }), 2048) };
  if (job.kind === "face") return { px: packPixels(creatureSprites(job.style, job.species, mk, { face: job.face }), 2048) };
  if (job.kind === "party") {
    const gear = { ...partyGearOf(job.seed, job.colour), face: "happy" }; // (both smiling)
    return { px: packPixels(creatureSprites(job.style, job.species, mk, gear), 2048) };
  }
  const { sprites, layout, floor } = typeSprites(job.style, job.seed, job.id, job.K, mk);
  return { px: packPixels(sprites), layout, floor: { albedo: new Uint8Array(pixels(floor.A, floor.w, floor.h)), normal: new Uint8Array(pixels(floor.N, floor.w, floor.h)), w: floor.w, h: floor.h } };
}

/** The buffers a result can hand over to the page without copying. */
export const transferables = (r: ArtResult): ArrayBuffer[] =>
  [r.px.albedo.buffer, r.px.normal.buffer, ...(r.floor ? [r.floor.albedo.buffer, r.floor.normal.buffer] : [])] as ArrayBuffer[];
