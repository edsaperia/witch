// The art the start needs, drawn by the art workers (fast start (b), Ed 2026-10-07): our witch's frames, the light props, the
// soundsystems and the treehouse. They were drawn on the page while the view was being built, before anything showed (some
// 60% of that time); as jobs they're drawn off the page, alongside the forest, and kept in the browser's store like the
// rest. The same drawing as before, so the same pictures.
import * as Art from "../../art/generator.js";
import { groundOf, witchLookOf, type Baked, type FrameGround, type MakeCanvas } from "./artBuild";
import type { Style } from "./style";
import { HOUSE_CONFIG as HOUSE_PLAN } from "../rules/houseConfig";

type Poses = Record<string, { towards: number[]; away: number[]; fps: number }>;
/** Where her frames are in her atlas, pose by pose (render/assets.ts hands them to the view). */
export interface WitchArt {
  /** On foot: each pose's frames, towards and away. */
  foot: Poses;
  /** In the treetops: the fast and brake poses' frames, towards and away. */
  fly: Poses;
  /** Straight up the screen ("up": from behind) and straight down it ("down": coming at us): hover, lean, its cycle, fast, brake;
   *  and on foot, standing and walking (the treehouse's rooms). */
  heading: Record<"up" | "down", { hover: number[]; lean: number; leanCycle: number[]; fast: number[]; brake: number[]; /** on foot, no broom */ idle: number[]; walk: number[]; /** on foot carrying it (the Terrace) */ idleBroom: number[]; walkBroom: number[] }>;
  /** Her lean as a four-frame loop, side-on. */
  lean: { towards: number[]; away: number[] };
  /** Behind the decks: each DJ frame and its upper layer (what shows over the DJ table). */
  dj: { full: number[]; upper: number[] };
  /** Bare (her hat knocked off): the hat on the ground's frame (-1: she has none, or this isn't the bare set). */
  hat: number;
  /** Each frame's ground, in frame order. */
  grounds: (FrameGround | null)[];
}

/** Her frames from her genome (null: the classic witch): flight, on foot, headings. Bare (her hat knocked off: rules/hat.ts):
 *  the same frames, at the same places, with no hat; then the hat on the ground. Dry: nothing drawn, only where each pose's
 *  frames will be (the page's stand-in until the worker's frames arrive; the same order, so the same places). Quick: her preview
 *  (Ed's playtest of v4821, 2026-10-26: "When selecting clothes etc I don't see changes on the witch immediately when I select
 *  them"): one frame a facing (towards, away, up and down the screen: standing, as she stands at a station) drawn, and every pose's
 *  frames that frame, so a look shows on her in a tenth of the time; the whole set follows (render/assets.ts rebakeWitch). */
export function witchSprites(style: Style, genome: unknown, bare: boolean, mk: MakeCanvas, dry = false, quick = false): { sprites: Baked[]; witch: WitchArt } {
  // The witch: hover frames 0-2 towards, 3-5 away, then leaning towards (6) and away (7); then
  // rising (8-9 towards, 10-11 away) and descending (12-13 towards, 14-15 away), two frames each.
  const mine = witchLookOf(style, genome), wc = mine.colours, look = bare ? { ...(mine.look ?? {}), hat: "none" } : mine.look;
  const W: WitchArt = { foot: {}, fly: {}, heading: {} as WitchArt["heading"], lean: { towards: [], away: [] }, dj: { full: [], upper: [] }, hat: -1, grounds: [] };
  const drawn = new Map<string, { b: Baked; ground: FrameGround | null }>();
  const wb = (o: object) => {
    if (dry) { W.grounds.push(null); return DRY; }
    if (quick) { // (the preview: her standing frame for this facing, drawn once)
      const q = o as { facing?: string; heading?: string }, k = q.heading ? `h${q.heading}` : q.facing ?? "towards";
      let d = drawn.get(k);
      if (!d) { const sp = (Art.witchSprite as (st: Style, o: object) => ReturnType<typeof Art.witchSprite>)(style, { pose: "idle", frame: 0, ...(q.heading ? { heading: q.heading } : { facing: k }), look }) as { anchors?: Record<string, number[]> }; drawn.set(k, (d = { b: Art.bake(sp as ReturnType<typeof Art.witchSprite>, wc, style, style.cOutline, mk) as Baked, ground: groundOf(sp.anchors) })); }
      W.grounds.push(d.ground); return d.b;
    }
    const sp = (Art.witchSprite as (st: Style, o: object) => ReturnType<typeof Art.witchSprite>)(style, { ...o, look }) as { anchors?: Record<string, number[]> };
    W.grounds.push(groundOf(sp.anchors));
    return Art.bake(sp as ReturnType<typeof Art.witchSprite>, wc, style, style.cOutline, mk) as Baked;
  };
  const sprites = [0, 1, 2].map(frame => wb({ frame })).concat([0, 1, 2].map(frame => wb({ frame, facing: "away" })), [wb({ lean: true }), wb({ lean: true, facing: "away" })],
    ...["rise", "descend"].flatMap(pose => ["towards", "away"].flatMap(facing => [0, 1].map(frame => wb({ pose, frame, facing })))));
  // On foot, from 16: standing, landing, taking off, talking, putting a sigil down, lifting one, sitting; standing and walking
  // with no broom (the treehouse's rooms: Ed, 2026-10-21), and carrying it (the Terrace: Ed, 2026-10-23).
  const FOOT = Art.WITCH_FOOT_POSES as Record<string, { frames: number; fps: number }>;
  for (const pose of ["stand", "land", "takeoff", "talk", "placeSigil", "liftSigil", "sit", "idle", "walk", "idleBroom", "walkBroom"]) {
    const n = FOOT[pose].frames, entry = { towards: [] as number[], away: [] as number[], fps: FOOT[pose].fps };
    for (const facing of ["towards", "away"] as const) for (let frame = 0; frame < n; frame++) { entry[facing].push(sprites.length); sprites.push(wb({ pose, frame, facing })); }
    W.foot[pose] = entry;
  }
  // Treetop flight: fast (at boost: three frames) and brake (a skid: two frames), towards and away.
  for (const [pose, n] of [["fast", 3], ["brake", 2]] as const) {
    const entry = { towards: [] as number[], away: [] as number[], fps: pose === "fast" ? 10 : 8 };
    for (const facing of ["towards", "away"] as const) for (let frame = 0; frame < n; frame++) { entry[facing].push(sprites.length); sprites.push(wb({ pose, frame, facing })); }
    W.fly[pose] = entry;
  }
  for (const facing of ["towards", "away"] as const) for (let frame = 0; frame < 4; frame++) { W.lean[facing].push(sprites.length); sprites.push(wb({ pose: "lean", frame, facing })); }
  // Behind the decks: each DJ frame, then its upper layer (the same sprite, only what's above the decks' top: art/witch.js aboveDecks).
  for (let frame = 0; frame < (FOOT.dj?.frames ?? 0); frame++) {
    if (quick) { W.dj.full.push(sprites.length); sprites.push(wb({ facing: "towards" })); W.dj.upper.push(sprites.length); sprites.push(wb({ facing: "towards" })); continue; }
    if (dry) { W.grounds.push(null, null); W.dj.full.push(sprites.length); sprites.push(DRY); W.dj.upper.push(sprites.length); sprites.push(DRY); continue; }
    const sp = (Art.witchSprite as (st: Style, o: object) => { anchors?: Record<string, number[]>; upper?: Uint8Array; m: Uint8Array; w: number; h: number })(style, { pose: "dj", frame, look });
    W.grounds.push(groundOf(sp.anchors), groundOf(sp.anchors));
    W.dj.full.push(sprites.length); sprites.push(Art.bake(sp as never, wc, style, style.cOutline, mk) as Baked);
    W.dj.upper.push(sprites.length); sprites.push(upperOnly(Art.bake(sp as never, wc, style, style.cOutline, mk) as Baked, sp));
  }
  for (const [h, heading] of [["up", "away"], ["down", "towards"]] as const) {
    const at = (o: object) => sprites.push(wb({ ...o, heading })) - 1;
    W.heading[h] = { hover: [0, 1, 2].map(frame => at({ frame })), lean: at({ lean: true }), leanCycle: [0, 1, 2, 3].map(frame => at({ pose: "lean", frame })), fast: [0, 1, 2].map(frame => at({ pose: "fast", frame })), brake: [0, 1].map(frame => at({ pose: "brake", frame })),
      idle: [...Array(FOOT.idle.frames).keys()].map(frame => at({ pose: "idle", frame })), walk: [...Array(FOOT.walk.frames).keys()].map(frame => at({ pose: "walk", frame })),
      idleBroom: [...Array(FOOT.idleBroom.frames).keys()].map(frame => at({ pose: "idleBroom", frame })), walkBroom: [...Array(FOOT.walkBroom.frames).keys()].map(frame => at({ pose: "walkBroom", frame })) };
  }
  if (bare && !dry && !quick) {
    const hat = (Art.witchHatSprite as (st: Style, o: object) => ReturnType<typeof Art.witchSprite> | null)(style, { look: mine.look });
    if (hat) { W.hat = sprites.push(Art.bake(hat, wc, style, style.cOutline, mk) as Baked) - 1; W.grounds.push(null); }
  }
  return { sprites, witch: W };
}

/** A frame not drawn (a dry run's). */
const DRY = {} as Baked;

/** A DJ frame's upper layer: its baked pixels kept only where the sprite is above the decks (sp.upper), and its outline
 *  where it borders those; cleared elsewhere (so no outline runs along the cut at the table's top). */
function upperOnly(b: Baked, sp: { upper?: Uint8Array; m: Uint8Array; w: number; h: number }): Baked {
  const up = sp.upper, { w, h } = sp;
  if (!up) return b;
  const keep = (i: number) => up[i] === 1 || (!sp.m[i] && [i % w > 0 ? i - 1 : -1, i % w < w - 1 ? i + 1 : -1, i - w, i + w].some(j => j >= 0 && j < w * h && up[j] === 1));
  for (const c of [b.A, b.N, (b as { NF?: Baked["A"] }).NF]) {
    if (!c) continue;
    const g = c.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, d = g.getImageData(0, 0, w, h);
    for (let i = 0; i < w * h; i++) if (!keep(i)) d.data[i * 4 + 3] = 0;
    g.putImageData(d, 0, 0);
  }
  return b;
}

/** Light-source props: the campfire (frames 0-2), then magic stones (cyan, violet, green). */
export function propSprites(style: Style, mk: MakeCanvas): Baked[] {
  const lp = (Art.lightProps as (st: Style, o?: { makeCanvas?: MakeCanvas }) => { campfire: Baked[]; stones: Record<string, Baked> })(style, { makeCanvas: mk });
  return [...lp.campfire, lp.stones.cyan, lp.stones.violet, lp.stones.green];
}

/** The soundsystems: variant x 3 + frame (the cones pumping), playing. */
export function soundsystemSprites(style: Style, mk: MakeCanvas): Baked[] {
  const ss: Baked[] = [];
  for (let v = 0; v < 3; v++) for (let f = 0; f < 3; f++) ss.push(Art.bake(Art.soundsystemSprite(style, { variant: v, frame: f, state: "playing" }), Art.soundsystemColours(v), style, style.cOutline, mk) as Baked);
  return ss;
}

/** One generated soundsystem (art/soundsystemGen.js; Ed, 2026-10-08), its genome at its own yaw and size, in two parts baked
 *  apart (the damage only once it's hurt): "play", playing (frames 0-2); "damage", damaged at stages 1, 2 and 3 (0-1, 2-3, 4-5) and
 *  destroyed (6); each frame's origin (its middle on the ground) and projector top (the sky hologram's anchor; null
 *  when destroyed), in the sprite's pixels. */
export interface SoundsystemGenArt { origins: { x: number; y: number }[]; projectors: ({ x: number; y: number } | null)[]; rgb: number[] }
export function soundsystemGenSprites(style: Style, genome: unknown, yaw: number, size: number, mk: MakeCanvas, part: "play" | "damage" = "play"): { sprites: Baked[]; art: SoundsystemGenArt } {
  const make = Art.soundsystemGenSprite as unknown as (st: Style, g: unknown, o: object) => { sp: never; origin: { x: number; y: number }; projector: { x: number; y: number } | null };
  const col = (Art.soundsystemGenColours as unknown as (g: unknown) => Record<number, number[]>)(genome), sprites: Baked[] = [], art: SoundsystemGenArt = { origins: [], projectors: [], rgb: col[Art.M.GLOW] };
  const list = part === "play" ? [{ frame: 0 }, { frame: 1 }, { frame: 2 }] : [...[1, 2, 3].flatMap(stage => [0, 1].map(frame => ({ frame, state: "damaged", stage }))), { state: "destroyed" }];
  for (const o of list) {
    const r = make(style, genome, { yaw, size, ...o });
    sprites.push(Art.bake(r.sp, col, style, style.cOutline, mk) as Baked); art.origins.push(r.origin); art.projectors.push(r.projector);
  }
  return { sprites, art };
}

/** The treehouse's anchors in its sprite's pixels: the trunk's foot, her seat on the terrace, the opening shot's camera, its lights;
 *  and the DJ table's frames (cropped to the box whose top-left is foreBox in the base's pixels). */
export interface TreehouseArt { base: { x: number; y: number }; seat: { x: number; y: number }; platter?: { x: number; y: number }; camera: { x: number; y: number }; hasFore: boolean; lights: { x: number; y: number; rgb: number[]; kind: string }[]; foreFrames: number; foreBox: { x: number; y: number };
  /** The knockdown candles: their first frame (white, then red from candleRed on; level × flicker), levels, flickers, and their row along the desk's front (its ends, base pixels). */
  candle0: number; candleRed: number; candleLevels: number; candleFlicker: number; candleRow: { x: number; y: number }[];
  /** The treehouse Ent (art/ent.js, with the deck: rules/treehouse.ts): frames 0 its far half (the Ent, the floor, the rail's far
   *  half, the map table) and 1 its near half (the rail's near half and the decks' desk), the same size; its deck's middle on its
   *  floor and the map table's top, pixels. */
  ent?: { deck: { x: number; y: number }; table: { x: number; y: number }; /** the house (art/ent.js HOUSE): the magic circle's middle and the balcony's, on the floor */ circle?: { x: number; y: number }; balcony?: { x: number; y: number } };
  /** The island's legend carrying the Ent (art/carrier.js): its frame, its back's top in its own pixels (where the Ent's roots'
   *  foot stands, sink pixels down into it). */
  carrier?: { frame: number; back: { x: number; y: number }; sink: number } }

/** The treehouse Ent (Bravo's, art/ent.js) at the deck's height and radius: frames 0 its far half, 1 its near half (she stands
 *  between them), 2 on the DJ table alone, turning (drawn over her), then the knockdown candles, as the old treehouse's; and last,
 *  given a kind, the island's legend carrying it (art/carrier.js), the Ent's trunk that much shorter. */
export function entTreehouseSprites(style: Style, mk: MakeCanvas, deckY: number, deckR: number, carrierKind: string | null = null, house = false): { sprites: Baked[]; treehouse: TreehouseArt } {
  type EntArt = { far: unknown; near: unknown; foreFrames: unknown[]; foreBox: { x: number; y: number }; candles: { x: number; y: number }[];
    anchors: { base: { x: number; y: number }; deck: { x: number; y: number }; table: { x: number; y: number }; circle?: { x: number; y: number }; balcony?: { x: number; y: number }; seat: { x: number; y: number }; platter?: { x: number; y: number }; camera: { x: number; y: number }; lights: { x: number; y: number; rgb: number[]; kind: string }[] } };
  // (the oak, config/house/ organic: the Terrace one of its trunk's rooms, its decks on the open rim; Ed, 2026-10-24)
  const look = house && (HOUSE_PLAN as { organic?: boolean }).organic ? { organic: true, terrace: { ...(HOUSE_PLAN as unknown as { terrace: object }).terrace, r: 10 } } : house; // (the oak: its Terrace's layout the game's, config/house/base.json)
  const ent = (y: number) => Art.entSprite(style, { facing: "towards", deckY: y, deckR, house: look }) as EntArt, trunk = (a: EntArt) => a.anchors.base.y - a.anchors.deck.y;
  let e = ent(deckY);
  // The island's legend carrying it (art/carrier.js; Ed, 2026-10-10): grown at the Ent's own pixels a metre (its trunk's pixels
  // over the deck's height: its roots' foot stands on the ground), and the Ent grown that much shorter, its roots standing
  // CARRIER.sink down into the carrier's back, so the deck stays where the rules have it (the deck's anchor: render/view/home.ts).
  let carrier: { sprite: { w: number; h: number }; back: { x: number; y: number } } | null = null, sinkPx = 0;
  if (carrierKind) {
    const full = trunk(e), ppm = full / deckY, C = Art.CARRIER as { sink: number };
    carrier = (Art.carrierSprite as (st: Style, id: string, o: object) => typeof carrier)(style, carrierKind, { ppm });
    if (carrier) {
      sinkPx = C.sink * ppm;
      const want = full - (carrier.sprite.h - carrier.back.y) + sinkPx; // (the trunk's pixels from the carrier's back up to the deck)
      let y = Math.max(2, want / ppm); e = ent(y);
      if (Math.abs(trunk(e) - want) > 1.5) { y *= want / trunk(e); e = ent(y); } // (once more: the trunk isn't quite in proportion)
    }
  }
  const ec = Art.entColours(style), fores = e.foreFrames;
  const CN = Art.CANDLE as { levels: number; frames: number }, candles: Baked[] = [];
  for (const white of [true, false]) for (let level = 0; level < CN.levels; level++) for (let frame = 0; frame < CN.frames; frame++) candles.push(Art.bake((Art.candleSprite as (st: Style, o: object) => never)(style, { level, frame, white }), ec, style, "none", mk) as Baked);
  const { deck, table, circle, balcony, ...anchors } = e.anchors;
  const sprites = [...[e.far, e.near, ...fores].map(sp => Art.bake(sp, ec, style, "none", mk) as Baked), ...candles];
  if (carrier) sprites.push(Art.bake(carrier.sprite, Art.speciesColours(carrierKind!, style), style, style.cOutline, mk) as Baked);
  return {
    sprites,
    treehouse: { ...anchors, hasFore: fores.length > 0, foreFrames: fores.length, foreBox: e.foreBox,
      candle0: 2 + fores.length, candleRed: CN.levels * CN.frames, candleLevels: CN.levels, candleFlicker: CN.frames, candleRow: e.candles, ent: { deck, table, ...(circle && balcony ? { circle, balcony } : {}) },
      ...(carrier ? { carrier: { frame: sprites.length - 1, back: carrier.back, sink: sinkPx } } : {}) },
  };
}

/** The witch's treehouse: frames 0 its base, 1 its top (treetop mode), 2 on the studio's DJ table alone, turning (drawn over her). */
export function treehouseSprites(style: Style, mk: MakeCanvas): { sprites: Baked[]; treehouse: TreehouseArt } {
  const th = Art.treehouseSprite(style) as { bot: unknown; top: unknown; foreFrames?: unknown[]; foreBox?: { x: number; y: number }; candles?: { x: number; y: number }[]; anchors: { base: { x: number; y: number }; seat: { x: number; y: number }; platter?: { x: number; y: number }; camera?: { x: number; y: number }; lights: { x: number; y: number; rgb: number[]; kind: string }[] } };
  const thc = Art.treehouseColours(style);
  // Its model draws a hard dark shadow ellipse on the ground round the trunk's foot: drop it (a
  // soft contact shadow goes there instead), as Ed asked for set pieces.
  for (const sp of [th.bot, th.top] as { w: number; h: number; m: Uint8Array }[])
    for (let y = Math.max(0, Math.floor(th.anchors.base.y - 14)); y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x] === Art.M.NOSE) sp.m[y * sp.w + x] = 0;
  const fores = th.foreFrames ?? [];
  // then the knockdown candles, white then red, each melt level in each flicker, unoutlined (slim enough that an outline would swamp them)
  const CN = Art.CANDLE as { levels: number; frames: number }, candles: Baked[] = [];
  for (const white of [true, false]) for (let level = 0; level < CN.levels; level++) for (let frame = 0; frame < CN.frames; frame++) candles.push(Art.bake((Art.candleSprite as (st: Style, o: object) => never)(style, { level, frame, white }), thc, style, "none", mk) as Baked);
  return {
    sprites: [...[th.bot, th.top, ...fores].map(sp => Art.bake(sp, thc, style, "none", mk) as Baked), ...candles],
    treehouse: { ...th.anchors, camera: th.anchors.camera ?? th.anchors.seat, hasFore: fores.length > 0, foreFrames: fores.length, foreBox: th.foreBox ?? { x: 0, y: 0 },
      candle0: 2 + fores.length, candleRed: CN.levels * CN.frames, candleLevels: CN.levels, candleFlicker: CN.frames, candleRow: th.candles ?? [] },
  };
}
