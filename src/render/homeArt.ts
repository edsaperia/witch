// The art the start needs, drawn by the art workers (fast start (b), Ed 2026-10-07): our witch's frames, the light props, the
// soundsystems and the treehouse. They were drawn on the page while the view was being built, before anything showed (some
// 60% of that time); as jobs they're drawn off the page, alongside the forest, and kept in the browser's store like the
// rest. The same drawing as before, so the same pictures.
import * as Art from "../../art/generator.js";
import { groundOf, witchLookOf, type Baked, type FrameGround, type MakeCanvas } from "./artBuild";
import type { Style } from "./style";

type Poses = Record<string, { towards: number[]; away: number[]; fps: number }>;
/** Where her frames are in her atlas, pose by pose (render/assets.ts hands them to the view). */
export interface WitchArt {
  /** On foot: each pose's frames, towards and away. */
  foot: Poses;
  /** In the treetops: the fast and brake poses' frames, towards and away. */
  fly: Poses;
  /** Straight up the screen ("up": from behind) and straight down it ("down": coming at us): hover, lean, its cycle, fast, brake. */
  heading: Record<"up" | "down", { hover: number[]; lean: number; leanCycle: number[]; fast: number[]; brake: number[] }>;
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
 *  frames will be (the page's stand-in until the worker's frames arrive; the same order, so the same places). */
export function witchSprites(style: Style, genome: unknown, bare: boolean, mk: MakeCanvas, dry = false): { sprites: Baked[]; witch: WitchArt } {
  // The witch: hover frames 0-2 towards, 3-5 away, then leaning towards (6) and away (7); then
  // rising (8-9 towards, 10-11 away) and descending (12-13 towards, 14-15 away), two frames each.
  const mine = witchLookOf(style, genome), wc = mine.colours, look = bare ? { ...(mine.look ?? {}), hat: "none" } : mine.look;
  const W: WitchArt = { foot: {}, fly: {}, heading: {} as WitchArt["heading"], lean: { towards: [], away: [] }, dj: { full: [], upper: [] }, hat: -1, grounds: [] };
  const wb = (o: object) => {
    if (dry) { W.grounds.push(null); return DRY; }
    const sp = (Art.witchSprite as (st: Style, o: object) => ReturnType<typeof Art.witchSprite>)(style, { ...o, look }) as { anchors?: Record<string, number[]> };
    W.grounds.push(groundOf(sp.anchors));
    return Art.bake(sp as ReturnType<typeof Art.witchSprite>, wc, style, style.cOutline, mk) as Baked;
  };
  const sprites = [0, 1, 2].map(frame => wb({ frame })).concat([0, 1, 2].map(frame => wb({ frame, facing: "away" })), [wb({ lean: true }), wb({ lean: true, facing: "away" })],
    ...["rise", "descend"].flatMap(pose => ["towards", "away"].flatMap(facing => [0, 1].map(frame => wb({ pose, frame, facing })))));
  // On foot, from 16: standing, landing, taking off, talking, putting a sigil down, lifting one.
  const FOOT = Art.WITCH_FOOT_POSES as Record<string, { frames: number; fps: number }>;
  for (const pose of ["stand", "land", "takeoff", "talk", "placeSigil", "liftSigil", "sit"]) {
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
    if (dry) { W.grounds.push(null, null); W.dj.full.push(sprites.length); sprites.push(DRY); W.dj.upper.push(sprites.length); sprites.push(DRY); continue; }
    const sp = (Art.witchSprite as (st: Style, o: object) => { anchors?: Record<string, number[]>; upper?: Uint8Array; m: Uint8Array; w: number; h: number })(style, { pose: "dj", frame, look });
    W.grounds.push(groundOf(sp.anchors), groundOf(sp.anchors));
    W.dj.full.push(sprites.length); sprites.push(Art.bake(sp as never, wc, style, style.cOutline, mk) as Baked);
    W.dj.upper.push(sprites.length); sprites.push(upperOnly(Art.bake(sp as never, wc, style, style.cOutline, mk) as Baked, sp));
  }
  for (const [h, heading] of [["up", "away"], ["down", "towards"]] as const) {
    const at = (o: object) => sprites.push(wb({ ...o, heading })) - 1;
    W.heading[h] = { hover: [0, 1, 2].map(frame => at({ frame })), lean: at({ lean: true }), leanCycle: [0, 1, 2, 3].map(frame => at({ pose: "lean", frame })), fast: [0, 1, 2].map(frame => at({ pose: "fast", frame })), brake: [0, 1].map(frame => at({ pose: "brake", frame })) };
  }
  if (bare && !dry) {
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

/** The treehouse's anchors in its sprite's pixels: the trunk's foot, her seat on the terrace, the opening shot's camera, its lights;
 *  and the DJ table's frames (cropped to the box whose top-left is foreBox in the base's pixels). */
export interface TreehouseArt { base: { x: number; y: number }; seat: { x: number; y: number }; camera: { x: number; y: number }; hasFore: boolean; lights: { x: number; y: number; rgb: number[]; kind: string }[]; foreFrames: number; foreBox: { x: number; y: number };
  /** The knockdown candles: their first frame (level × flicker), levels, flickers, and their row along the desk's front (its ends, base pixels). */
  candle0: number; candleLevels: number; candleFlicker: number; candleRow: { x: number; y: number }[] }

/** The witch's treehouse: frames 0 its base, 1 its top (treetop mode), 2 on the studio's DJ table alone, turning (drawn over her). */
export function treehouseSprites(style: Style, mk: MakeCanvas): { sprites: Baked[]; treehouse: TreehouseArt } {
  const th = Art.treehouseSprite(style) as { bot: unknown; top: unknown; foreFrames?: unknown[]; foreBox?: { x: number; y: number }; candles?: { x: number; y: number }[]; anchors: { base: { x: number; y: number }; seat: { x: number; y: number }; camera?: { x: number; y: number }; lights: { x: number; y: number; rgb: number[]; kind: string }[] } };
  const thc = Art.treehouseColours(style);
  // Its model draws a hard dark shadow ellipse on the ground round the trunk's foot: drop it (a
  // soft contact shadow goes there instead), as Ed asked for set pieces.
  for (const sp of [th.bot, th.top] as { w: number; h: number; m: Uint8Array }[])
    for (let y = Math.max(0, Math.floor(th.anchors.base.y - 14)); y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x] === Art.M.NOSE) sp.m[y * sp.w + x] = 0;
  const fores = th.foreFrames ?? [];
  // then the knockdown candles, each melt level in each flicker, outlined like her (they stand in front of everything there)
  const CN = Art.CANDLE as { levels: number; frames: number }, candles: Baked[] = [];
  for (let level = 0; level < CN.levels; level++) for (let frame = 0; frame < CN.frames; frame++) candles.push(Art.bake((Art.candleSprite as (st: Style, o: object) => never)(style, { level, frame }), thc, style, style.cOutline, mk) as Baked);
  return {
    sprites: [...[th.bot, th.top, ...fores].map(sp => Art.bake(sp, thc, style, "none", mk) as Baked), ...candles],
    treehouse: { ...th.anchors, camera: th.anchors.camera ?? th.anchors.seat, hasFore: fores.length > 0, foreFrames: fores.length, foreBox: th.foreBox ?? { x: 0, y: 0 },
      candle0: 2 + fores.length, candleLevels: CN.levels, candleFlicker: CN.frames, candleRow: th.candles ?? [] },
  };
}
