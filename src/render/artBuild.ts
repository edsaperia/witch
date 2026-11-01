export { packPixels, packSteps } from "./artPacking";
import { pixels, packPixels } from "./artPacking";
export { groundOf, witchLookOf } from "./artLook";
import { witchLookOf } from "./artLook";
export { creatureSprites, bakeOverride, headPoint, creatureFrame, walkGait, partyGearOf } from "./creatureArt";
import { creatureSprites, headPoint, partyGearOf } from "./creatureArt";
export { typeSprites } from "./areaArt";
import { typeSprites } from "./areaArt";
import { sceneSprites, speakerSprites, beachSprites, relicSprites, pathPieceSprites, beachEdgeSprites, lakeShoreSprites, decorSprites, partyObjectSprites, partyWitchSprites } from "./worldArt";
export { SPEAKER_STONE_WIDTH, RING_STONE_CARVING, RING_STONE_CARVINGS, ringStoneKey, stumpId, HARVEST_SPROUTS, CYCLONE_FRAMES, CYCLONE_TINT } from "./artMetadata";
// Drawing the sprite sets with art/generator.js and packing them into atlas pixels. No Three.js
// and no page needed, so it runs in a Web Worker (with OffscreenCanvas) as well as on the page.
import * as Art from "./artBuild.primitives";
import type { Style } from "./style";
import { rigSprites, type RigGear, type RigMeta } from "./rig/rigBuild";
import { entTreehouseSprites, propSprites, soundsystemGenSprites, soundsystemSprites, treehouseSprites, witchSprites, type SoundsystemGenArt, type TreehouseArt, type WitchArt } from "./homeArt";
import { canvasPixels, discoDrawn, seaSprites, stoneSprites, type CanvasPixels, type StoneSpec } from "./islandArt";
import { housePiece, type PiecePixels } from "./housePieces";
import { workshopPicture, type WorkshopPic } from "./workshopPieces";
import { clearMask } from "./crownMask";
import type { HouseArtLayout } from "../rules/housePlacement";

export type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;
export interface Baked { A: AnyCanvas; N: AnyCanvas; w: number; h: number; /** A wild creature's eye pixels (1), for eyeshine (Ed, v244). */ eyes?: Uint8Array; /** Its sway mask (#34: grey, 0 rigid to 255 the leafy tips), packed into the normal map's alpha. */ S?: AnyCanvas; /** A creature's head (art pixels from its top left): bubbles point their tails at it (headPoint). */ head?: [number, number] }
/** Where a sprite sits in its atlas: u0, vTop, u1, vBottom, and its size in art pixels. */
/** pad: empty rows (nothing drawn) at the bottom of the sprite, so it can stand on its lowest
 *  drawn pixel rather than on its box. */
export interface Frame { uv: [number, number, number, number]; w: number; h: number; pad?: number; /** How far its lowest drawn row reaches either side of its middle, in art pixels (the farther side): the sprite shader stands it on the lowest ground across that much (a kapok's buttresses, a strangler fig's roots). */ foot?: number; /** Its sway mask is in its normal map's alpha (#34): it sways per pixel, leaves only. */ masked?: boolean; /** A creature's head, art pixels from its top left (Baked.head). */ head?: [number, number] }
/** An atlas's pixels: its albedo and normal planes, each one byte a pixel (an index into its palette, render/palette.ts) where
 *  it has 256 values or fewer, else RGBA as drawn; `albedoPal`/`normalPal` the palettes (null: that plane is RGBA). */
export interface AtlasPixels { albedo: Uint8Array; normal: Uint8Array; albedoPal?: Uint8Array | null; normalPal?: Uint8Array | null; width: number; height: number; frames: Frame[] }

export type MakeCanvas = (w: number, h: number) => AnyCanvas;

/** Where a witch frame's ground is (the art's `ground` and `shadow` anchors, art/witch.js liftShadow): the point under her on the
 *  model's ground and her shadow's size there, in the sprite's pixels. */
export interface FrameGround { x: number; y: number; w: number; d: number }

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
  /** The big object of its tree with a face in its bark (Ed 2026-10-07), if it has one: on at most two trees an area. */
  face?: number;
  small: Piece[];
  walls: number[];
  set: Piece | null;
  /** The rim kit round a sleeping legend's clearing (#235; art/areas.js areaAssets' rim): 6 small pieces (none over a metre),
   *  each its frame, its form (stone, cairn, boulder, toadstools, stump, post) and its height in metres. */
  rim: { frame: number; form: string; height: number }[];
}

export interface ArtDef { id: string; leaf: number; big: [string, Record<string, unknown>][]; small: [string, Record<string, unknown>][]; set?: [string, Record<string, unknown>] }
export type TreeOpts = { type: string; minor?: boolean; dark?: boolean; gnarl?: number; bare?: boolean; trunks?: number; lean?: number; thick?: boolean; thin?: boolean; hollow?: boolean; webs?: boolean; scale?: number };

export type ArtJob = { kind: "type"; id: number; style: Style; seed: number; K: number; /** the island's biome blend's key (rules/lakeLooks.ts biomeKey), its look over the area's trees and props; none, temperate */ biome?: string } | { kind: "creature"; id: string; style: Style } | { kind: "rig"; id: string; species: string; level: number; style: Style; /** a party animal's gear, baked on */ gear?: RigGear }
  /** A creature enraged by a wave (Stage 4 playtest): angry glowing red eyes and a darker tint. */
  | { kind: "woken"; id: string; species: string; style: Style }
  /** An area legend asleep (art/legends.js legendForm): its two breathing frames, sunk and grown over. */
  | { kind: "sleep"; id: string; species: string; style: Style }
  | { kind: "glide"; id: string; species: string; style: Style }
  | { kind: "nap"; id: string; species: string; style: Style; /** its idle pose instead (art/creatures.js IDLE_BUILDERS: the meerkat sat up as a sentinel), each level in its 2 frames */ idle?: boolean; /** a party animal's (or a happy one's) own gear, by its seed and collar colour (null: none), worn asleep */ dressed?: { seed: number; colour: number[] | null } }
  | { kind: "face"; id: string; species: string; face: string; style: Style }
  /** One current age in an outfit selected by the creature's seed, shared by identical looks. */
  | { kind: "party"; id: string; species: string; level: number; gear: RigGear; style: Style }
  /** Every decoration (ruins in both conditions, rocks, freak trees), split as trees are. */
  | { kind: "decor"; id: string; style: Style; /** the island's biome key (its look over the rocks, ruins and freak trees); id is the same, or "all" */ biome?: string }
  /** The beach's edge of the woods (render/beach.ts): palms (split as trees are), beach shrubs and grass clumps, each with its sway mask. */
  | { kind: "beachEdge"; id: string; style: Style; K: number }
  /** The biome lakes' shore dressing (render/lakeShore.ts, art/lakeShore.js): each kind's pieces (rules/lakeShore.ts ShoreKind). */
  | { kind: "lakeShore"; id: string; style: Style; K: number; /** the island's biome key (its look over the leafy pieces); id is the same, or "all" */ biome?: string }
  /** The start's own art (render/homeArt.ts, fast start (b)): our witch's frames from her genome (id: its hash, and bare), the
   *  light props, the soundsystems and the treehouse. */
  | { kind: "witch"; id: string; style: Style; genome: unknown; bare: boolean; /** her preview: a frame a facing (render/homeArt.ts witchSprites) */ quick?: boolean }
  /** Her hat alone, as it lies on the ground, in the look of a genome (id: its hash): a hat she left lying keeps the look it had
   *  (render/view/witch.ts), whatever she's wearing since. */
  | { kind: "hat"; id: string; style: Style; genome: unknown }
  /** One find's own art alone (id: its art/country.js scene piece: tonight's travel trunk, rules/finds.ts), a small job of its
   *  own so it lands in a moment on any machine, never behind the whole scenes kit. */
  | { kind: "find"; id: string; style: Style }
  | { kind: "props"; id: string; style: Style }
  | { kind: "soundsystems"; id: string; style: Style }
  /** (id "home" the old treehouse; "ent:<deck height>:<radius>" the treehouse Ent holding the deck: rules/treehouse.ts;
   *  "house:<height>:<radius>" the oak house; none has a carrier (Ed, 2026-10-31). */
  | { kind: "treehouse"; id: string; style: Style; layout?: HouseArtLayout }
  /** The paths' 3D pieces: bridges, stairs, railway landmarks, signal and verge posts. */
  | { kind: "pathPieces"; id: string; style: Style }
  /** Modern relics, playground and sports pieces, with the art's arrangements. */
  | { kind: "relics"; id: string; style: Style }
  /** The dancefloor's speakers: every drawn angle, state and frame. */
  | { kind: "speakers"; id: string; style: Style; /** The areas' rune stones' bake scale (runeMarkers.scale), the ring's stones baked at it. */ stone: number }
  /** Every scene's pieces (each drawn once) and each scene's layout, as authored and mirrored. */
  | { kind: "scenes"; id: string; style: Style }
  /** A party witch (#37): her look from partyWitch(seed) (or, seed null, our witch's own), in every party pose. */
  | { kind: "partyWitch"; id: string; seed: number | null; style: Style; /** our witch's genome (art/witchGenome.js), for seed null; else the classic witch */ genome?: unknown }
  /** The dancefloor's looks (render/islandArt.ts discoDrawn), for the ground. */
  | { kind: "disco"; id: string; style: Style }
  /** The sea's creatures (render/islandArt.ts seaSprites): the kraken or the dolphins. */
  | { kind: "sea"; id: "kraken" | "dolphins"; style: Style }
  /** An island's runestones (render/islandArt.ts stoneSprites; id: their list's key), each at every glow level. */
  | { kind: "stones"; id: string; style: Style; stones: StoneSpec[]; levels: number[]; scale: number }
  /** The great stumps (art/props/stumps.js; Ed, 2026-10-29): in place of the runestones, each a species seen from its own angle. */
  | { kind: "stumps"; id: string; style: Style; stumps: StumpSpec[] }
  /** One area type's great stump, baked as it's wanted (render/view/home.ts, AssetLibrary.stumpArt). */
  | { kind: "stump"; id: string; style: Style; stump: StumpSpec }
  /** One area's generated soundsystem (art/soundsystemGen.js): its genome at its yaw (degrees) and size. */
  | { kind: "soundsystem"; id: string; style: Style; genome: unknown; yaw: number; size: number; /** "play" (its 3 playing frames) or "damage" (its damage stages and rubble) */ part: "play" | "damage" }
  /** Every party object (#38) in each neon and balloon palette a placement can pick (campfires in their three frames), and the clusters' layouts. */
  | { kind: "partyObjects"; id: string; style: Style }
  /** The beach's decorations (art/beach.js): its finds, and each footprint at every heading. */
  | { kind: "beach"; id: string; style: Style }
  /** A piece of the treehouse's furniture or a room's dressing (render/housePieces.ts), at the house's pixel and view: its id the
   *  piece's key, then "@" and the pixel and view it's drawn at (so the cache keeps each). */
  | { kind: "housePiece"; id: string; style: Style; ppm: number; pitch: number; layout?: HouseArtLayout }
  /** One of the Workshop's pictures (render/workshopPieces.ts): her resting broom or a part on the pegboard; its id all it's drawn from. */
  | { kind: "workshopPic"; id: string; style: Style; pic: WorkshopPic }
  /** The crown's clearing over one floor (render/crownMask.ts): its id the floor's key, then "@" and the dome's box it's drawn over. */
  | { kind: "crownMask"; id: string; style: Style; box: number[] };

/** The beach's pieces in their atlas, by id (a print by "<id>~<heading>"): frame and ground point. */
export interface BeachArt { pieces: Record<string, { frame: number; originX: number; originY: number }>; finds: string[]; prints: string[]; headings: number }

/** The party objects in their atlas, by ref ("party:<id>[@<neon>][~<palette>]"): frames (more than one: animated), ground point, decal; and each cluster's layout. */
export interface PartyArt { pieces: Record<string, { frames: number[]; originX: number; originY: number; decal: boolean; /** Where it hangs from (hanging pieces): pixels from its top-left. */ hang?: { x: number; y: number } }>; layouts: Record<string, { plain: ScenePlace[]; mirror: ScenePlace[] }> }

/** A party witch's frames: each foot pose's frames facing us (the view mirrors them), her hover
 *  frames for flying (towards and away), and each frame's anchors in its sprite's pixels (pair, back, cup, hand, hatTip). */
export interface PartyWitchArt { poses: Record<string, number[]>; fps: Record<string, number>; hover: { towards: number[]; away: number[] }; anchors: (Record<string, [number, number]> | null)[] }

/** A scene piece in its atlas (by its name in the scenes' table), with its ground point; and each
 *  scene's pieces in metres from its middle, as authored and mirrored. */
export interface SceneArt { pieces: Record<string, { frame: number; originX: number; originY: number; decal: boolean; /** drawn at this many art pixels a metre, not the game's own (the effects': art/effects.js EFFECT_PPM) */ ppm?: number }>; layouts: Record<string, { plain: ScenePlace[]; mirror: ScenePlace[] }> }
export interface ScenePlace { ref: string; dx: number; dz: number; left: boolean }
/** What a ring stone is carved with, by its place in the ring (0 at the top, clockwise): a rune glyph or a creature's sigil. One
 *  not listed carves RING_STONE_CARVING, Ed's pick (2026-10-08): "three glowing dots in a vertical stack, hinting at the speaker
 *  that will replace it" (its bass, mid and tweeter). */
export type Carving = { rune?: number; sigil?: string; dots?: boolean };
export interface SpeakerArt { frames: Record<string, number>; origin: Record<number, { x: number; y: number }>; /** The runestone each home speaker starts as (Ed, 2026-10-06), turned like the speakers (Ed, 2026-10-08: "face inwards, like the ring speakers do"): by ringStoneKey, its frame and its ground point. */ stones?: Record<string, number>; stoneOrigin?: Record<string, { x: number; y: number }>; /** And where its glowing dots' middles are in its frame (art pixels), by the same key: the game's glow round them (Ed, 2026-10-09). */ stoneDots?: Record<string, { x: number; y: number }[]> }

/** The beach's edge of the woods in its atlas (render/beach.ts): palms as crown and trunk frames, shrubs and grass clumps whole. */
export interface BeachEdgeArt { palms: { top: number; bot: number }[]; shrubs: number[]; grass: number[] }
/** The biome lakes' shore dressing in its atlas: each kind's variants, a trunk (bot) frame and, tall ones, a crown (top). */
export interface LakeShoreArt { kinds: Record<string, { bot: number; top: number | null }[]> }

/** One relic in its atlas: family (modern, playground, sports), whether it's a flat ground decal, and its ground point. */
export interface RelicArt { id: string; family: string; decal: boolean; frame: number; originX: number; originY: number }
export type RelicLayouts = Record<string, { id: string; x: number; z: number }[]>;

/** One path piece in its atlas: its frame and where its middle on the ground lands (art pixels from the left). */
export interface PathPieceArt { id: string; frame: number; originX: number; /** Where its middle on the ground lands, from the top. */ originY: number }

/** One decoration in the decor atlas: its family, bottom (and top, if tall) frames, and the radius it covers on the ground (m). */
export interface DecorPiece { id: string; family: string; bot: number; top: number | null; footprint: number }

/** A floor tile's pixels: albedo and normal map, w x h. */
export interface TilePixels { albedo: Uint8Array; normal: Uint8Array; w: number; h: number }
/** A stump to bake: its species (art/props/stumps.js STUMP_GENOMES), seed and the angle it's seen from (radians). */
export type { StumpSpec } from "../rules/stumps";
import type { StumpSpec } from "../rules/stumps";
export interface StumpArt { origin: { x: number; y: number }; top: { x: number; y: number }; height: number; radius: number; /** The root area's outline: its radius (art pixels) at even angles round the rings' middle, from east towards the camera (art/props/stumps.js ROOT_ANGLES). */ roots: number[]; /** Metres over the ground a metre of the sprite's height reaches, as the art's camera saw it: it lies on the ground by this. */ depth: number }
export interface ArtResult { /** The dancefloor's looks (kind disco). */ disco?: { base: CanvasPixels; lit: CanvasPixels; pitch: number; size: number; gridOrigin: number; rimOuter: number; radius: number }; /** The runestones' heights, in order (kind stones). */ stones?: number[]; /** The stumps' ground points and cuts (kind stumps), in order. */ stumps?: StumpArt[]; /** The sea creatures' frames' origins (kind sea). */ sea?: { x: number; y: number }[]; /** The beach's edge of the woods: its palms' frames (crown, trunk) and its shrubs' and grass clumps'. */ beachEdge?: BeachEdgeArt; /** The biome lakes' shore dressing. */ lakeShore?: LakeShoreArt; /** A sleeping legend's ground line in each frame: rows from its top (the art's origin). */ ground?: number[]; /** And how far its body's middle (the origin) lies right of the frame's middle, pixels. */ centre?: number[]; /** The live rig's parts (#79): their joints and pieces. */ rig?: RigMeta; px: AtlasPixels; layout?: TypeLayout; floor?: TilePixels; decor?: DecorPiece[]; pieces?: PathPieceArt[]; relics?: RelicArt[]; beach?: BeachArt; layouts?: RelicLayouts; speakers?: SpeakerArt; scenes?: SceneArt; witch?: PartyWitchArt; party?: PartyArt; /** Our witch's poses (render/homeArt.ts). */ ours?: WitchArt; /** The treehouse's anchors. */ treehouse?: TreehouseArt; /** A generated soundsystem's origins and projector tops. */ ss?: SoundsystemGenArt; /** A treehouse piece's picture (kinds housePiece and workshopPic; null: nothing to draw). */ housePiece?: PiecePixels | null; /** The crown's clearing over a floor (kind crownMask). */ mask?: Uint8Array }

export function runJob(job: ArtJob, mk: MakeCanvas): ArtResult {
  if (job.kind === "disco") { const d = discoDrawn(job.style, mk); return { px: packPixels([], 16), disco: { ...d, base: canvasPixels(d.base), lit: canvasPixels(d.lit) } }; }
  if (job.kind === "sea") { const { sprites, origins } = seaSprites(job.id, job.style, mk); return { px: packPixels(sprites, job.id === "kraken" ? 1024 : 512), sea: origins }; }
  if (job.kind === "stumps" || job.kind === "stump") {
    const sprites: Baked[] = [], stumps: StumpArt[] = [];
    for (const s of job.kind === "stump" ? [job.stump] : job.stumps) {
      const def = s.area ? (Art.AREA_BY_ID as Record<string, unknown>)[s.area] ?? null : null, st = s.biome ? ({ ...job.style, biome: s.biome } as unknown as Style) : job.style;
      const p = (Art.stumpPiece as unknown as (sp: string, o: object, def: unknown, st: Style) => { sp: unknown; colours: unknown; origin: { x: number; y: number }; top: { x: number; y: number }; roots: number[]; depth: number; variant: { height: number }; metres: { radius: number } })(s.species, { seed: s.seed, yaw: s.yaw, irregular: s.irregular ?? 0 }, def, st);
      sprites.push(Art.bake(p.sp, p.colours, st, "none", mk) as Baked); stumps.push({ origin: p.origin, top: p.top, height: p.variant.height, radius: p.metres.radius, roots: p.roots, depth: p.depth });
    }
    return { px: packPixels(sprites, job.kind === "stump" ? 512 : 2048), stumps };
  }
  if (job.kind === "stones") { const { sprites, heights } = stoneSprites(job.style, job.stones, job.levels, job.scale, mk); return { px: packPixels(sprites, 2048), stones: heights }; }
  if (job.kind === "witch") { const { sprites, witch } = witchSprites(job.style, job.genome, job.bare, mk, false, !!job.quick); return { px: packPixels(sprites, 2048), ours: witch }; }
  if (job.kind === "hat") {
    const mine = witchLookOf(job.style, job.genome), hat = (Art.witchHatSprite as (st: Style, o: object) => unknown)(job.style, { look: mine.look });
    return { px: packPixels(hat ? [Art.bake(hat, mine.colours, job.style, job.style.cOutline, mk) as Baked] : [], 256) };
  }
  if (job.kind === "crownMask") return { px: packPixels([], 16), mask: clearMask(job.id.slice(0, job.id.lastIndexOf("@")), job.box) ?? undefined };
  if (job.kind === "workshopPic") return { px: packPixels([], 16), housePiece: workshopPicture(job.pic, job.style, mk) };
  if (job.kind === "housePiece") return { px: packPixels([], 16), housePiece: housePiece(job.id.slice(0, job.id.lastIndexOf("@")), job.style, job.ppm, job.pitch, mk, job.layout?.config) };
  if (job.kind === "find") {
    const piece = Art.scenePiece(job.id, job.style) as { sprite: { whole: unknown; origin: { x: number; y: number } }; colours: unknown };
    return { px: packPixels([Art.bake(piece.sprite.whole, piece.colours, job.style, "none", mk) as Baked], 512), scenes: { pieces: { [job.id]: { frame: 0, originX: piece.sprite.origin.x, originY: piece.sprite.origin.y, decal: false } }, layouts: {} } };
  }
  if (job.kind === "props") return { px: packPixels(propSprites(job.style, mk), 1024) };
  if (job.kind === "soundsystems") return { px: packPixels(soundsystemSprites(job.style, mk), 2048) };
  if (job.kind === "soundsystem") { const { sprites, art } = soundsystemGenSprites(job.style, job.genome, job.yaw, job.size, mk, job.part); return { px: packPixels(sprites, 1024), ss: art }; }
  if (job.kind === "treehouse") { const [ent, y, r] = job.id.split(":"), { sprites, treehouse } = ent === "ent" || ent === "house" ? entTreehouseSprites(job.style, mk, +y, +r, ent === "house", job.layout?.config) : treehouseSprites(job.style, mk); return { px: packPixels(sprites, 2048), treehouse }; }
  if (job.kind === "partyObjects") { const { sprites, party } = partyObjectSprites(job.style, mk); return { px: packPixels(sprites, 2048), party }; }
  if (job.kind === "partyWitch") { const { sprites, witch } = partyWitchSprites(job.style, job.seed, mk, job.genome ?? null); return { px: packPixels(sprites, 2048), witch }; }
  if (job.kind === "creature") return { px: packPixels(creatureSprites(job.style, job.id, mk), 2048) };
  if (job.kind === "rig") { const r = rigSprites(job.style, job.species, job.level, mk, job.gear ?? null); return r ? { px: r.px, rig: r.meta } : { px: packPixels([], 16) }; }
  if (job.kind === "beach") { const { sprites, beach } = beachSprites(job.style, mk); return { px: packPixels(sprites, 1024), beach }; }
  if (job.kind === "relics") { const { sprites, relics, layouts } = relicSprites(job.style, mk); return { px: packPixels(sprites, 2048), relics, layouts }; }
  if (job.kind === "pathPieces") { const { sprites, pieces } = pathPieceSprites(job.style, mk); return { px: packPixels(sprites, 2048), pieces }; }
  if (job.kind === "scenes") { const { sprites, scenes } = sceneSprites(job.style, mk); return { px: packPixels(sprites, 2048), scenes }; }
  if (job.kind === "speakers") { const { sprites, speakers } = speakerSprites(job.style, mk, job.stone); return { px: packPixels(sprites, 2048), speakers }; }
  if (job.kind === "decor") { const { sprites, decor } = decorSprites(job.style, mk, job.style.biome ?? job.biome); return { px: packPixels(sprites, 2048), decor }; }
  if (job.kind === "beachEdge") { const { sprites, beach } = beachEdgeSprites(job.style, job.K, mk); return { px: packPixels(sprites, 2048), beachEdge: beach }; }
  if (job.kind === "lakeShore") { const { sprites, shore } = lakeShoreSprites(job.style, job.K, mk, job.style.biome ?? job.biome); return { px: packPixels(sprites, 2048), lakeShore: shore }; }
  // (enraged: red eyes and the angry face; dressed up: the happy face; art/genome/expressions.js)
  if (job.kind === "sleep") {
    const sprites: Baked[] = [], ground: number[] = [], centre: number[] = [];
    for (let f = 0; f < 2; f++) {
      const { sp, colours } = Art.legendForm(job.species, job.style, { frame: f }) as { sp: { origin?: number[]; h: number; w: number }; colours: unknown };
      const b = Art.bake(sp, colours, job.style, "none", mk) as Baked; b.head = headPoint((sp as unknown as { m: ArrayLike<number> }).m, b.w, b.h); sprites.push(b);
      ground.push(sp.origin ? sp.origin[1] : sp.h); centre.push(sp.origin ? sp.origin[0] - sp.w / 2 : 0);
    }
    return { px: packPixels(sprites, 2048), ground, centre };
  }
  // a creature asleep (art/naps.js): each level (baby to legend) in its 2 breathing frames, towards (mirrored for the other way), with its ground line
  if (job.kind === "nap") {
    const sprites: Baked[] = [], ground: number[] = [], centre: number[] = [];
    // (dressed: in its party gear, Ed 2026-10-06: sleepers keep their party gear on)
    const gear = (job.idle ? { idle: true } : { ...(job.dressed ? partyGearOf(job.dressed.seed, job.dressed.colour) : {}), nap: true }) as unknown as null;
    for (let level = 0; level < 4; level++) for (let f = 0; f < 2; f++) {
      const sp = Art.critter(job.species, level, f, job.style, "towards", gear) as { origin?: number[]; h: number; w: number; m: ArrayLike<number> };
      const b = Art.bake(sp, Art.speciesColours(job.species, job.style, gear), job.style, job.style.cOutline, mk) as Baked; b.head = headPoint(sp.m, b.w, b.h); sprites.push(b);
      ground.push(sp.origin ? sp.origin[1] : sp.h); centre.push(sp.origin ? sp.origin[0] - sp.w / 2 : 0);
    }
    return { px: packPixels(sprites, 2048), ground, centre };
  }
  // a glider in the air (Profile.glide, the flying squirrel): each level's 2 frames spread out, its membrane taut (art/creatures.js gear.glide)
  if (job.kind === "glide") {
    const sprites: Baked[] = [], gear = { glide: true } as unknown as null;
    for (let level = 0; level < 4; level++) for (let f = 0; f < 2; f++) {
      const sp = Art.critter(job.species, level, f, job.style, "towards", gear) as { origin?: number[]; h: number; w: number; m: ArrayLike<number> };
      const b = Art.bake(sp, Art.speciesColours(job.species, job.style, gear), job.style, job.style.cOutline, mk) as Baked; b.head = headPoint(sp.m, b.w, b.h); sprites.push(b);
    }
    return { px: packPixels(sprites, 2048) };
  }
  if (job.kind === "woken") return { px: packPixels(creatureSprites(job.style, job.species, mk, { woken: true, face: "angry" }), 2048) };
  if (job.kind === "face") return { px: packPixels(creatureSprites(job.style, job.species, mk, { face: job.face }), 2048) };
  if (job.kind === "party") {
    if (!Number.isInteger(job.level) || job.level < 0 || job.level > 3) throw new Error("Invalid party sheet age");
    const gear = { ...job.gear, face: "happy" }; // (both smiling)
    return { px: packPixels(creatureSprites(job.style, job.species, mk, gear, job.level), 2048) };
  }
  const { sprites, layout, floor } = typeSprites(job.biome && !job.style.biome ? ({ ...job.style, biome: job.biome } as unknown as Style) : job.style, job.seed, job.id, job.K, mk); // (the island's biome over its areas' trees and props; ?biome= over it)
  return { px: packPixels(sprites), layout, floor: { albedo: new Uint8Array(pixels(floor.A, floor.w, floor.h)), normal: new Uint8Array(pixels(floor.N, floor.w, floor.h)), w: floor.w, h: floor.h } };
}

export { transferables } from "./artTransfer";
