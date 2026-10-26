// The game's sprites, drawn by the art module (art/generator.js) from the style: one atlas per
// area type (its trees, as top and bottom halves, and its bushes) and one per kind of creature.
// Sets are asked for as the witch nears them and drawn by a few Web Workers in the background;
// where workers or OffscreenCanvas are missing, they are drawn on the page, one per frame.
import * as Art from "../../art/generator.js";
import { atlasFromPixels, placeholderAtlas, type Atlas } from "./atlas";
import { witchSprites, type SoundsystemGenArt, type TreehouseArt, type WitchArt } from "./homeArt";
import { creatureFrame, walkGait, runJob, type ArtJob, type ArtResult, type BeachArt, type BeachEdgeArt, type LakeShoreArt, type DecorPiece, type PartyWitchArt, type PartyArt, type PathPieceArt, type RelicArt, type RelicLayouts, type SceneArt, type SpeakerArt, type TilePixels, type TypeLayout } from "./artBuild";
import type { Style } from "./style";
import { artCacheKey, cachePut, hashText, type CacheHint } from "./artCache";
import { rigGearKey, type RigGear, type RigMeta } from "./rig/rigBuild";
import { trunkCut } from "./trunkCut";

export interface TypeArt {
  atlas: Atlas; layout: TypeLayout;
  /** For each tree's bottom-half frame: where its trunk was cut from the crown, as a share of the
   *  frame's height from its top (the trunk fades out below it in ground mode, Ed v149). */
  cut: Map<number, number>;
}
export interface RelicSet { atlas: Atlas; byId: Record<string, RelicArt>; modern: RelicArt[]; layouts: RelicLayouts }
export interface DecorArt { atlas: Atlas; pieces: DecorPiece[]; families: Record<string, DecorPiece[]>; /** the island biome it was drawn in (none: temperate) */ biome?: string }
export interface CreatureArt { atlas: Atlas; frame: (level: number, frame: number, away?: boolean) => number; /** Its walk (art/creatures.js walkGait): frames in the cycle, and how far it moves between them (a share of its width). */ walk?: { frames: number; step: number }; /** A sleeping legend's ground line in each frame (rows from its top): drawn with that row on the ground. */ ground?: number[]; /** And how far its body's middle lies right of the frame's middle in each frame (pixels): drawn with its middle on its place. */ centre?: number[] }
/** A creature asleep's frame: its level's two breaths (render/artBuild.ts "nap"). */
export const napFrame = (level: number, f: number) => level * 2 + (f % 2);
/** A species' live-rig parts at one level (#79): its atlas page and what the rig needs. */
export interface RigArt { atlas: Atlas; meta: RigMeta; used: number }
/** How many rig pages (a species at a level each) are kept at once. */
const RIG_PAGES = 48;

type Reply = { job: ArtJob; result?: ArtResult; error?: string; ms?: number; cached?: boolean; /** Asked only if kept, and not kept. */ miss?: boolean };

/** The art workers, started ahead of the View (prewarmArtWorkers), for its AssetLibrary to take: they load their code (most of a
 *  second each, more in the cloud) while the page makes the night, not while the View's build waits for its first drawings. */
let prewarmed: Worker[] = [];
export function prewarmArtWorkers(): void {
  if (prewarmed.length || typeof Worker === "undefined" || typeof OffscreenCanvas === "undefined") return;
  const n = Math.max(1, Math.min(6, (navigator.hardwareConcurrency || 2) - 1));
  try { for (let i = 0; i < n; i++) prewarmed.push(new Worker(new URL("./artWorker.ts", import.meta.url), { type: "module" })); } catch { for (const w of prewarmed) w.terminate(); prewarmed = []; }
}

/** The sets drawn from one island (its map's trees under its seed, its treehouse, its soundsystems): let go when another island
 *  takes the page (reseat). The rest are by species or the page's own, right on any island. */
const ISLAND_KINDS = new Set<string>(["type", "treehouse", "soundsystem"]);
/** A job, or a waiting job's key ("kind:id..."), of the island's own. */
export const islandBound = (j: ArtJob | string): boolean => ISLAND_KINDS.has(typeof j === "string" ? j.slice(0, j.indexOf(":")) : j.kind);
/** A job as asked: the art's generation it was asked in (reseat). */
type Stamped = ArtJob & { gen?: number };

/** The treehouse's stand-in till its art arrives. */
const noTreehouse = () => ({ atlas: placeholderAtlas(8), base: { x: 0, y: 1 }, seat: { x: 0, y: 0 }, camera: { x: 0, y: 0 }, hasFore: false, lights: [], foreFrames: 0, foreBox: { x: 0, y: 0 }, candle0: 0, candleRed: 0, candleLevels: 0, candleFlicker: 1, candleRow: [] });

export class AssetLibrary {
  private types = new Map<number, TypeArt>();
  /** The night's own area-type sets (the night's seed), found kept (app/landingBake.ts drew them ahead), waiting to be swapped in
   *  unseen (swapTonight); and whether that moment has passed (then none is taken). */
  private tonightTypes = new Map<number, TypeArt>();
  private tonightShut = false;
  /** The seed the area types' trees are drawn under: the island's own (islandArtSeed, so a revisit finds them kept), or the
   *  night's (the default; the view sets it). */
  typeSeed: number;
  /** The island's biome (rules/lakeLooks.ts biomeKey: its forests' look over the area types' trees and props); none, temperate.
   *  The view sets it with typeSeed. */
  typeBiome: string | undefined;
  private creatures = new Map<string, CreatureArt>();
  private rigs = new Map<string, RigArt>();
  private partyWitches = new Map<string, PartyWitchArt & { atlas: Atlas }>();
  private soundsystemsGen = new Map<string, SoundsystemGenArt & { atlas: Atlas }>();
  private party: (PartyArt & { atlas: Atlas }) | undefined;
  private decor: DecorArt | undefined;
  /** The beach's edge of the woods (render/beach.ts): asked for only when she comes near the sand. */
  private beachEdge: (BeachEdgeArt & { atlas: Atlas }) | undefined;
  private lakeShore: (LakeShoreArt & { atlas: Atlas; biome?: string }) | undefined;
  private speakers: (SpeakerArt & { atlas: Atlas }) | undefined;
  private scenes: (SceneArt & { atlas: Atlas }) | undefined;
  private pieces: { atlas: Atlas; byId: Record<string, PathPieceArt> } | undefined;
  private relicSet: RelicSet | undefined;
  private beach: (BeachArt & { atlas: Atlas }) | undefined;
  private queue: ArtJob[] = [];
  private inFlight = new Set<string>();
  private workers: { w: Worker; busy: boolean; job?: ArtJob }[] = [];
  private useWorkers: boolean;
  /** Her frames (from her genome, drawn by an art worker: render/homeArt.ts; a stand-in until they arrive, and her old look's
   *  while the character creator's new one is drawn). */
  witch: Atlas = placeholderAtlas(256);
  /** Her genome (art/witchGenome.js; null: the classic witch). */
  witchGenome: unknown = null;
  /** Her last few looks' frames, by genome (her nightie and her clothes on the wake-up, rules/clothesPile.ts): a look she goes back
   *  to is put on at once, not after its redraw waits behind the art drawn ahead (minutes, on a slow machine). */
  private witchLooks = new Map<string, { atlas: Atlas; art: WitchArt }>();
  /** On foot (from frame 16): each pose's frames, towards and away. */
  readonly witchFoot: Record<string, { towards: number[]; away: number[]; fps: number }> = {};
  /** In the treetops: the fast and brake poses' frames, towards and away. */
  readonly witchFly: Record<string, { towards: number[]; away: number[]; fps: number }> = {};
  /** Her straight-up ("up": seen from behind) and straight-down ("down": coming at us) flight frames (#27): hover, lean, fast, brake. */
  readonly witchHeading = {} as Record<"up" | "down", { hover: number[]; lean: number; leanCycle: number[]; fast: number[]; brake: number[]; idle: number[]; walk: number[]; idleBroom: number[]; walkBroom: number[] }>;
  /** Her lean as a four-frame loop (#37), side-on: towards and away; the game plays it faster with her speed. */
  readonly witchLean = { towards: [] as number[], away: [] as number[] };
  /** Behind the decks (Art.djFrame picks one): her DJ frames, and each one's upper layer (what shows over the DJ table). */
  readonly witchDj = { full: [] as number[], upper: [] as number[] };
  /** Light-source props from the art module: campfire (frames 0-2), then magic stones (cyan, violet, green). */
  props: Atlas = placeholderAtlas(8);
  /** Soundsystems: variant x 3 + frame (the cones pumping), playing. */
  soundsystems: Atlas = placeholderAtlas(16);
  /** The witch's treehouse: its base (frame 0) and top (frame 1, the crown: treetop mode), and
   *  anchors in its sprite's pixels: the trunk's foot, her seat on the terrace, its lights. */
  treehouse: { atlas: Atlas; ent?: { deck: { x: number; y: number }; table: { x: number; y: number } }; /** The island's legend carrying the Ent (render/homeArt.ts). */ carrier?: TreehouseArt["carrier"]; base: { x: number; y: number }; seat: { x: number; y: number }; platter?: { x: number; y: number }; camera: { x: number; y: number }; hasFore: boolean; lights: { x: number; y: number; rgb: number[]; kind: string }[];
    /** The DJ table's frames (2 on: the platters turning, the LEDs chasing), cropped to the box whose top-left is foreBox in the base's pixels. */
    foreFrames: number; foreBox: { x: number; y: number };
    /** The knockdown candles (Art.candleSprite: white then red from candleRed on, level × flicker, from frame candle0) and their row along the desk's front (its ends, in the base's pixels). */
    candle0: number; candleRed: number; candleLevels: number; candleFlicker: number; candleRow: { x: number; y: number }[] } = noTreehouse();
  /** The start's own art (fast start (b)): which of it has arrived from the art workers. Play waits for it (prepare's whenIdle). */
  readonly home = { witch: false, props: false, soundsystems: false, treehouse: false };
  get homeReady(): boolean { const h = this.home; return h.witch && h.props && h.soundsystems && h.treehouse; }
  /** Resolves once the start's own art has arrived (her frames, the light props, the soundsystems, the treehouse). */
  homeArt(): Promise<void> {
    return new Promise(resolve => { const check = () => { if (this.homeReady) resolve(); else { this.work(50); setTimeout(check, 30); } }; check(); });
  }
  /** Style scale: the lab's K, 2 / pixel size. */
  readonly K: number;
  /** Bumped whenever a new set is ready, so the view knows to refresh its batches. */
  version = 0;
  /** How long each set took to draw (ms, in its worker or on the page), and when it arrived
   *  (ms since the page started), for the debug overlay and the smoke test's load report. */
  readonly timings: { set: string; ms: number; at: number; cached: boolean }[] = [];
  /** Sets drawn or loaded so far (with pending: the start screen's progress). */
  get done(): number { return this.timings.length; }
  private styleHash: string;
  /** Called with an area type's floor tile when its set is ready. */
  onFloor: (type: number, tile: TilePixels) => void = () => {};

  /** The share of a crown's pixels above its cut (tuning trunkFade.crownShare; the view sets it). */
  crownShare = 0.85;
  /** The areas' rune stones' bake scale (tuning runeMarkers.scale; the view sets it): the dancefloor ring's stones are baked at it. */
  stoneScale = 2.25;

  /** The night's seed (its own trees, tonight); a new night's by reseat. */
  seed: number;
  /** Which treehouse is drawn (the old one, "home", or the Ent holding the deck: "ent:<height>:<radius>..."). */
  private treehouseId: string;
  /** The island the sets are for, by number: bumped by reseat, so an island's set asked before lands to nothing (receive). */
  gen = 0;

  /** `first`: one-off drawings asked ahead of everything else, the start's own art too (oneOff takes them: the island build's,
   *  render/view.ts View.create). */
  constructor(readonly style: Style, seed: number, pixelSize: number, witchGenome: unknown = null, treehouse = "home", first: ArtJob[] = []) {
    this.seed = seed;
    this.treehouseId = treehouse;
    this.K = 2 / pixelSize;
    this.typeSeed = seed;
    this.styleHash = hashText(JSON.stringify(style));
    // Where her poses' frames will be, at once (a dry run: nothing drawn), and the stand-ins above; the art itself from the
    // workers, ahead of everything else (fast start (b): drawn on the page here it was most of the time before anything showed).
    this.applyWitchTables(witchSprites(style, witchGenome, false, () => null as never, true).witch);
    this.witchGenome = witchGenome;
    this.useWorkers = typeof Worker !== "undefined" && typeof OffscreenCanvas !== "undefined";
    if (this.useWorkers) {
      // One worker per core but the page's own, up to six: the area types' trees are most of the work.
      const n = Math.max(1, Math.min(6, (navigator.hardwareConcurrency || 2) - 1));
      try {
        for (let i = 0; i < n; i++) {
          const w = prewarmed.shift() ?? new Worker(new URL("./artWorker.ts", import.meta.url), { type: "module" }); // (one started ahead, if it was: prewarmArtWorkers)
          const slot: { w: Worker; busy: boolean; job?: ArtJob } = { w, busy: false };
          w.onmessage = (e: MessageEvent<Reply>) => { slot.busy = false; slot.job = undefined; this.receive(e.data); this.dispatch(); };
          w.onerror = () => { // the worker itself failed (no module workers, say): draw on the page
            this.useWorkers = false;
            if (slot.job) this.queue.unshift(slot.job);
            slot.busy = false; slot.job = undefined;
          };
          this.workers.push(slot);
        }
      } catch { this.useWorkers = false; }
    }
    // (the island build's one-offs first (they hold the View's build), then the start's own, `home`: ahead of every other ask, urgent
    // or not, so her frames never wait behind the area types the first frame asks for; the first-load hunt, 2026-10-20: hers came
    // last, 30 s in on the cloud, and play waited for them)
    for (const job of first) this.early(job);
    this.ask({ kind: "treehouse", id: treehouse, style }, true, true); // (the old treehouse, or the Ent holding the deck: "ent:<height>:<radius>")
    this.ask(this.witchJob(witchGenome, false), true, true);
    this.ask({ kind: "soundsystems", id: "home", style }, true, true);
    this.ask({ kind: "props", id: "home", style }, true, true);
  }

  private key = (j: ArtJob) => j.kind + ":" + j.id + (j.kind === "type" && j.seed !== this.typeSeed ? `@${j.seed}` : ""); // (tonight's sets apart from the island's)
  /** Where a set is kept between visits (render/artCache.ts). */
  private cacheKey = (j: ArtJob) => artCacheKey(j, this.styleHash);
  /** Ask for a set: from the browser's store if it was drawn before, else drawn by a worker. An
   *  urgent ask (the view needs it now) goes ahead of the sets drawn ahead of need. */
  /** Waiting jobs already moved to the front of the queue by an urgent ask. */
  private promoted = new Set<string>();
  /** Urgent sets still to come (prepare waits for these, not the scenery and creatures asked ahead of need). */
  private urgentKeys = new Set<string>();
  /** Where an urgent job goes in the queue: after the start's own (`home`) still waiting, ahead of the rest. */
  private get front(): number { const i = this.queue.findIndex(q => !(q as ArtJob & { home?: boolean }).home); return i < 0 ? this.queue.length : i; }
  private ask(job: ArtJob, urgent = false, home = false): void {
    const k = this.key(job);
    if (this.inFlight.has(k)) {
      // (an urgent job asked for again while waiting is moved to the front once: asked for every creature every frame, searching
      // the queue each time cost creatures x queue while new art was baking)
      if (!urgent || this.promoted.has(k)) return;
      this.promoted.add(k); this.urgentKeys.add(k);
      if (job.kind === "type") { const L = this.typeLog.get(job.id as number); if (L && L.landed === undefined) L.urgent = true; } // (asked ahead, then wanted on screen)
      const i = this.queue.findIndex(q => this.key(q) === k);
      if (i >= 0) (this.queue[i] as ArtJob & { urgent?: boolean }).urgent = true; // (urgent now: while the night plays, past the art ahead's share of the workers only an urgent job goes, dispatch; the zoo's 64 area types, all asked ahead, waited behind one long job: none of its trees came)
      if (i > this.front) { const [q] = this.queue.splice(i, 1); this.queue.splice(this.front, 0, q); }
      this.dispatch();
      return;
    }
    this.inFlight.add(k);
    if (urgent) this.urgentKeys.add(k);
    if (job.kind === "type" && job.seed === this.typeSeed && !(job as ArtJob & CacheHint).cacheOnly && !this.typeLog.has(job.id as number)) this.typeLog.set(job.id as number, { asked: performance.now(), urgent });
    if (home) (job as ArtJob & { home?: boolean }).home = true;
    // The cache is the worker's (render/artWorker.ts: the job carries its key; a set drawn before comes back `cached`), so the
    // page never reads or writes a set's megabytes itself (the stall hunt, 2026-10-13); drawing on the page (no workers), it does.
    (job as ArtJob & CacheHint).cacheKey = this.cacheKey(job);
    (job as ArtJob & { urgent?: boolean }).urgent = urgent;
    (job as Stamped).gen = this.gen;
    if (home || urgent || this.promoted.has(k)) this.queue.splice(this.front, 0, job); else this.queue.push(job);
    this.dispatch();
  }
  /** The night is playing (the party spell cast): the art drawn ahead of need keeps to half the workers, so the audio thread
   *  and the GPU's keep a core among them (Ed's log, 2026-10-14: the device under-ran in bursts, seconds of the audio clock lost
   *  at a time, while the workers baked on every core but the page's). What the view needs now (an urgent ask) takes them all. */
  playing = false;
  /** Held (the sea chart open over the night, main.ts; the transition review, 2026-10-19): no new set handed to the workers,
   *  those already drawing finishing, so the cores go to the chart and to drawing the next island ahead (app/landingBake.ts). */
  private held = false;
  hold(on: boolean): void { this.held = on; if (!on) this.dispatch(); }
  private dispatch(): void {
    if (!this.useWorkers || this.held) return;
    const n = this.workers.length, ahead = this.playing ? Math.max(1, Math.floor(n / 2)) : n;
    for (const slot of this.workers) {
      if (slot.busy || !this.queue.length) continue;
      const busy = this.workers.filter(s => s.busy).length;
      const i = busy < ahead ? 0 : this.queue.findIndex(j => (j as ArtJob & { urgent?: boolean }).urgent); // (the pool's share for the art ahead full: an urgent job only)
      if (i < 0) break;
      slot.busy = true;
      slot.job = this.queue.splice(i, 1)[0];
      slot.w.postMessage(slot.job);
    }
  }
  /** One-off asks (oneOff), by their key: what each is waiting for. */
  private once = new Map<string, { res: (r: ArtResult) => void; rej: (e: Error) => void }>();
  /** One-offs asked ahead (early), by their key: kept for the oneOff that takes each. */
  private kept = new Map<string, Promise<ArtResult>>();
  /** Ask for a one-off now, ahead of what's queued, for a oneOff to take later. */
  early(job: ArtJob): void {
    const k = this.key(job);
    if (this.kept.has(k) || !this.useWorkers) return;
    const p = this.oneOff(job);
    p.catch(() => {}); // (a refusal is the taker's: it draws it on the page)
    this.kept.set(k, p);
  }
  /** A drawing the page wants once, from the art workers (or the browser's store, if drawn before): the island build's own (render/
   *  islandArt.ts: the dancefloor's looks, the runestones), asked ahead of everything else. No workers: refused (drawn on the page). */
  oneOff(job: ArtJob): Promise<ArtResult> {
    const k = this.key(job), kept = this.kept.get(k);
    if (kept) { this.kept.delete(k); return kept; }
    if (!this.useWorkers) return Promise.reject(new Error("no art workers"));
    return new Promise((res, rej) => {
      const was = this.once.get(k);
      this.once.set(k, { res: r => { was?.res(r); res(r); }, rej: e => { was?.rej(e); rej(e); } });
      this.ask(job, true, true); // (with the start's own: something on the page is waiting for it now)
    });
  }
  /** ?artdelay=<s> (a builder's, render/loadingMist.ts): each area type's trees for this island drawn ahead of need held back to
   *  land one every that many seconds, in the order they came, so the loading mist lasts long enough to watch (those the view wants
   *  now, which the start waits for, as they come). 0: all as they come. */
  typeDelay = 0;
  private typeNext = 0;
  private releasing = false;
  /** This island's area types' sets: when each was asked for and landed (performance.now, ms), urgently (the view wanted it on
   *  screen) or ahead, and from the art cache or drawn: the loading order's log (window.witch.typeLog, tools/mist/order.cjs). */
  readonly typeLog = new Map<number, { asked: number; urgent: boolean; landed?: number; cached?: boolean }>();
  private receive(r: Reply): void {
    if (this.typeDelay > 0 && r.job.kind === "type" && r.result && r.job.seed === this.typeSeed && !this.releasing && !this.urgentKeys.has(this.key(r.job))) {
      const now = performance.now(), at = Math.max(now, this.typeNext);
      this.typeNext = at + this.typeDelay * 1000;
      setTimeout(() => { this.releasing = true; try { this.receive(r); } finally { this.releasing = false; } }, at - now);
      return;
    }
    const once = this.once.get(this.key(r.job));
    if (once) { // (a one-off: its asker's, whichever island the page is on)
      this.once.delete(this.key(r.job)); this.inFlight.delete(this.key(r.job)); this.promoted.delete(this.key(r.job)); this.urgentKeys.delete(this.key(r.job));
      if (r.result) once.res(r.result); else once.rej(new Error(r.error ?? "not drawn"));
      return;
    }
    // (an island's set asked before the page took another (reseat): not this island's; its key may be asked again since, so it's left be)
    if (islandBound(r.job) && (r.job as Stamped).gen !== this.gen) return;
    if (r.miss) { this.inFlight.delete(this.key(r.job)); this.urgentKeys.delete(this.key(r.job)); return; } // (asked only if kept: not kept)
    if (!r.result) { // a worker could not draw it: draw it here instead
      console.warn("art worker failed, drawing on the page:", r.error);
      this.useWorkers = false;
      this.queue.unshift(r.job);
      return;
    }
    const atlas = atlasFromPixels(r.result.px);
    this.timings.push({ set: this.key(r.job), ms: r.ms ?? 0, at: performance.now(), cached: !!r.cached });
    if (r.job.kind === "witch") {
      // (her hat-off frames only for the look she has now: a job for a look she's since changed from, at a station where she's drawn
      // from them, would put the old look back on her, the new one never showing: Ed's playtest, 2026-10-23, "I can't select them")
      if (r.job.bare) { if (JSON.stringify(r.job.genome ?? null) === JSON.stringify(this.witchGenome ?? null)) { this.bare = { ...atlas, grounds: r.result.ours!.grounds }; this.witchHatFrame = r.result.ours!.hat; } }
      else {
        const look = { atlas: { ...atlas, grounds: r.result.ours!.grounds }, art: r.result.ours! }, k = JSON.stringify(r.job.genome ?? null);
        this.witchLooks.delete(k); this.witchLooks.set(k, look);
        if (this.witchLooks.size > 4) this.witchLooks.delete(this.witchLooks.keys().next().value!);
        if (k === JSON.stringify(this.witchGenome ?? null)) this.wearLook(look); // (a look since replaced by the creator's next: kept, not hers)
      }
    } else if (r.job.kind === "props") { this.props = atlas; this.home.props = true; }
    else if (r.job.kind === "soundsystems") { this.soundsystems = atlas; this.home.soundsystems = true; }
    else if (r.job.kind === "treehouse") { this.treehouse = { atlas, ...r.result.treehouse! }; this.home.treehouse = true; }
    else if (r.job.kind === "relics") {
      const list = r.result.relics!;
      this.relicSet = { atlas, byId: Object.fromEntries(list.map(p => [p.id, p])), modern: list.filter(p => p.family === "modern"), layouts: r.result.layouts! };
    } else if (r.job.kind === "beach") {
      this.beach = { atlas, ...r.result.beach! };
    } else if (r.job.kind === "scenes") {
      this.scenes = { atlas, ...r.result.scenes! };
    } else if (r.job.kind === "speakers") {
      this.speakers = { atlas, ...r.result.speakers! };
    } else if (r.job.kind === "pathPieces") {
      this.pieces = { atlas, byId: Object.fromEntries(r.result.pieces!.map(p => [p.id, p])) };
    } else if (r.job.kind === "partyObjects") {
      this.party = { atlas, ...r.result.party! };
    } else if (r.job.kind === "soundsystem") {
      this.soundsystemsGen.set(r.job.id, { atlas, ...r.result.ss! });
    } else if (r.job.kind === "find") {
      this.finds.set(r.job.id, { atlas, ...r.result.scenes! });
    } else if (r.job.kind === "hat") {
      this.hats.set(r.job.id, atlas);
    } else if (r.job.kind === "partyWitch") {
      this.partyWitches.set(r.job.id, { atlas, ...r.result.witch! });
    } else if (r.job.kind === "beachEdge") {
      this.beachEdge = { atlas, ...r.result.beachEdge! };
    } else if (r.job.kind === "lakeShore") {
      if (this.lakeShore) { this.lakeShore.atlas.albedo.dispose(); this.lakeShore.atlas.normal.dispose(); } // (another island's, landing late or let go)
      this.lakeShore = { atlas, ...r.result.lakeShore!, biome: (r.job as { biome?: string }).biome };
    } else if (r.job.kind === "decor") {
      const pieces = r.result.decor!, families: Record<string, DecorPiece[]> = {};
      for (const p of pieces) (families[p.family] ??= []).push(p);
      if (this.decor) { this.decor.atlas.albedo.dispose(); this.decor.atlas.normal.dispose(); } // (another island's, landing late or let go)
      this.decor = { atlas, pieces, families, biome: (r.job as { biome?: string }).biome };
    } else if (r.job.kind === "rig") {
      if (r.result.rig) this.rigs.set(r.job.id, { atlas, meta: r.result.rig, used: performance.now() }); else this.noRig.add(r.job.id);
      this.evictRigs();
    } else if (r.job.kind === "type") {
      // Each tree's cut: where its crown's bulk ends (both halves share the frame's box): the row
      // above which trunkFade.crownShare of its top half's pixels lie. Not its lowest drawn pixel:
      // the crowns' low boughs and skirts hang nearly to the ground, and a cut down there hid
      // nearly every trunk where the crowns are cut away (Ed, v271: "lots of crowns, zero stumps").
      const px = r.result.px, cut = new Map<number, number>(), share = this.crownShare;
      for (const p of r.result.layout!.big) {
        if (p.top === null) continue;
        const counts = (k: number) => { const f = px.frames[k], x0 = Math.round(f.uv[0] * px.width), y0 = Math.round(f.uv[1] * px.height), rows = new Array<number>(f.h).fill(0);
          for (let y = 0; y < f.h; y++) for (let x = 0; x < f.w; x++) if (px.albedo[((y0 + y) * px.width + x0 + x) * 4 + 3] > 0) rows[y]++;
          return rows; };
        const c = trunkCut(counts(p.top), counts(p.bot), share); // (never above the trunk's own top: trunkCut.ts)
        if (c !== undefined) cut.set(p.bot, c);
      }
      if (r.job.seed !== this.typeSeed) { if (!this.tonightShut) this.tonightTypes.set(r.job.id, { atlas, layout: r.result.layout!, cut }); } // (tonight's: swapped in unseen, swapTonight)
      else {
        this.types.set(r.job.id, { atlas, layout: r.result.layout!, cut }); if (r.result.floor) this.onFloor(r.job.id, r.result.floor);
        const log = this.typeLog.get(r.job.id as number); if (log) { log.landed = performance.now(); log.cached = !!r.cached; }
      }
    } else if (r.job.kind === "sleep") this.creatures.set(r.job.id, { atlas, frame: (_level, f) => f % 2, ground: r.result.ground, centre: r.result.centre });
    else if (r.job.kind === "nap") this.creatures.set(r.job.id, { atlas, frame: napFrame, ground: r.result.ground, centre: r.result.centre });
    else if (r.job.kind === "glide") this.creatures.set(r.job.id, { atlas, frame: napFrame });
    else { const G = walkGait("species" in r.job ? r.job.species : r.job.id); // (its walk's frames: a party look's, woken or a face's are its species')
      this.creatures.set(r.job.id, { atlas, frame: (l: number, f: number, away?: boolean) => creatureFrame(l, f, away, G.frames), walk: G }); }
    this.inFlight.delete(this.key(r.job)); this.promoted.delete(this.key(r.job)); this.urgentKeys.delete(this.key(r.job));
    this.version++;
  }

  /** Whether a species' plain art is in (nothing asked for): render/view/creatures.ts asks only for the ones that may be on screen. */
  hasCreature(species: string): boolean { return this.creatures.has(species); }
  /** An area type's art, or undefined (and asked for) if it is not drawn yet. */
  typeArt(t: number): TypeArt | undefined {
    const a = this.types.get(t);
    if (!a) this.ask({ kind: "type", id: t, style: this.style, seed: this.typeSeed, K: this.K, biome: this.typeBiome }, true);
    return a;
  }
  /** The beach's edge of the woods (palms, shrubs, grass clumps), or undefined (and asked for). */
  beachEdgeArt(): (BeachEdgeArt & { atlas: Atlas }) | undefined {
    if (!this.beachEdge) this.ask({ kind: "beachEdge", id: "all", style: this.style, K: this.K }, true);
    return this.beachEdge;
  }
  /** The biome lakes' shore dressing (render/lakeShore.ts), or undefined (and asked for). */
  lakeShoreArt(): (LakeShoreArt & { atlas: Atlas }) | undefined {
    // (in the island's biome look, art/flora/biomes.js: drawn again for an island in another; the view lets go of its batch on the
    // old one when this comes back undefined, render/lakeShore.ts, before it's freed as the new one lands)
    if (this.lakeShore && this.lakeShore.biome !== this.typeBiome) return this.ask({ kind: "lakeShore", id: this.typeBiome ?? "all", style: this.style, K: this.K, biome: this.typeBiome }, true), undefined;
    if (!this.lakeShore) this.ask({ kind: "lakeShore", id: this.typeBiome ?? "all", style: this.style, K: this.K, biome: this.typeBiome }, true);
    return this.lakeShore;
  }
  /** The decorations' art (ruins, rocks, freak trees), or undefined (and asked for). */
  /** Whether the decor's and the path pieces' sets are in (nothing asked for: render/view/scenery.ts asks once one may be on screen). */
  hasDecor(): boolean { return !!this.decor; }
  hasPathPieces(): boolean { return !!this.pieces; }
  decorArt(): DecorArt | undefined {
    // (in the island's biome look, art/flora/biomes.js: drawn again for an island in another; the scenery lets go of its batch on
    // the old one when this comes back undefined, render/view/scenery.ts, before it's freed as the new one lands)
    if (this.decor && this.decor.biome !== this.typeBiome) return this.ask({ kind: "decor", id: this.typeBiome ?? "all", style: this.style, biome: this.typeBiome }), undefined;
    if (!this.decor) this.ask({ kind: "decor", id: this.typeBiome ?? "all", style: this.style, biome: this.typeBiome });
    return this.decor;
  }
  /** Modern relics and the grounds' pieces, or undefined (and asked for). */
  relicArt(): RelicSet | undefined {
    if (!this.relicSet) this.ask({ kind: "relics", id: "all", style: this.style });
    return this.relicSet;
  }
  /** The beach's decorations (art/beach.js), or undefined (and asked for): only once she's near the beach (render/beach.ts). */
  beachArt(): (BeachArt & { atlas: Atlas }) | undefined {
    if (!this.beach) this.ask({ kind: "beach", id: "all", style: this.style }, true); // (small, and asked for only once she's at the beach: ahead of the scenery queued)
    return this.beach;
  }
  /** The scenes' pieces and layouts, or undefined (and asked for). */
  sceneArt(): (SceneArt & { atlas: Atlas }) | undefined {
    if (!this.scenes) this.ask({ kind: "scenes", id: "all", style: this.style });
    return this.scenes;
  }
  /** The dancefloor's speakers, or undefined (and asked for, ahead of the scenery: they're gameplay). */
  speakerArt(): (SpeakerArt & { atlas: Atlas }) | undefined {
    if (!this.speakers) this.ask({ kind: "speakers", id: `all@${this.stoneScale}`, style: this.style, stone: this.stoneScale }, true);
    return this.speakers;
  }
  /** The paths' 3D pieces, or undefined (and asked for). */
  pathPieceArt(): { atlas: Atlas; byId: Record<string, PathPieceArt> } | undefined {
    if (!this.pieces) this.ask({ kind: "pathPieces", id: "all", style: this.style });
    return this.pieces;
  }
  /** A species' live-rig parts at a level (#79 stage 4: one atlas page each, keyed by its genome's
   *  hash so a changed record bakes afresh), or undefined (and asked for). */
  /** Each species' genome hash (rigArt's page key), worked out once. */
  private genomeHashes = new Map<string, string>();
  rigArt(species: string, level: number, gear?: RigGear): RigArt | undefined { // gear: a party animal's, baked on (a page per species, level and gear)
    const g = (Art.GENOME_BY_ID as Record<string, unknown>)[species];
    if (!g) return undefined;
    let h = this.genomeHashes.get(species);
    if (h === undefined) this.genomeHashes.set(species, (h = Art.genomeHash(g) as string)); // (the genomes are fixed for the run: hashed once, not per creature per frame)
    const k = `rig-${species}-${level}-${h}${gear ? "-" + rigGearKey(gear) : ""}`, a = this.rigs.get(k);
    if (a) { a.used = performance.now(); return a; }
    // Only the four-legged and the snakes have rig parts (art/genome/parts.js); a page that came back without any (a squat
    // mole's, say) was asked for again every frame, a job at the head of the queue each round for the whole night (2026-10-14).
    const template = (g as { template?: string }).template;
    if ((template !== "quadruped" && template !== "serpent") || this.noRig.has(k)) return undefined;
    this.ask({ kind: "rig", id: k, species, level, style: this.style, ...(gear ? { gear } : {}) }, true); // gameplay: ahead of the scenery
    return undefined;
  }
  /** Rig pages asked for that came back empty (no rig parts for the species): never asked for again. */
  private noRig = new Set<string>();
  /** Least recently used rig pages are let go past RIG_PAGES, their textures freed. */
  private evictRigs(): void {
    while (this.rigs.size > RIG_PAGES) {
      let old: string | undefined, t = Infinity;
      for (const [k, v] of this.rigs) if (v.used < t) { t = v.used; old = k; }
      if (old === undefined) break;
      const v = this.rigs.get(old)!; v.atlas.albedo.dispose(); v.atlas.normal.dispose(); this.rigs.delete(old);
    }
  }
  /** The rig pages held and their size in bytes (albedo and normal), for the debug overlay. */
  rigStats(): { pages: number; bytes: number } {
    let bytes = 0;
    for (const v of this.rigs.values()) bytes += (v.atlas.albedo.image.width * v.atlas.albedo.image.height) * 8;
    return { pages: this.rigs.size, bytes };
  }
  creatureArt(species: string): CreatureArt | undefined {
    const a = this.creatures.get(species);
    if (!a) this.ask({ kind: "creature", id: species, style: this.style });
    return a;
  }
  /** The zoo (rules/zooMap.ts): a species near her asked for now, ahead of the whole zoo's art asked ahead (every island's trees,
   *  creatures and legends: hundreds of sets), its plain look and its sleeping form. */
  hurryCreature(species: string): void {
    if (!this.creatures.has(species)) this.ask({ kind: "creature", id: species, style: this.style }, true);
    const k = `nap-${species}`;
    if (!this.creatures.has(k)) this.ask({ kind: "nap", id: k, species, style: this.style }, true);
  }
  /** An area legend asleep (art/legends.js: sunk in its area's earth, mossed over, eyes shut; 2 breathing frames), or undefined (and asked for). */
  sleepArt(species: string): CreatureArt | undefined {
    const k = `sleep-${species}`, a = this.creatures.get(k);
    if (!a) this.ask({ kind: "sleep", id: k, species, style: this.style });
    return a;
  }
  /** A creature asleep (art/naps.js: lying down, eyes shut, curled, tucked, coiled or flat by species; each level in 2 breathing
   *  frames), or undefined (and asked for). */
  napArt(species: string, dressed?: { id: number; colour: number[] | null }): CreatureArt | undefined { // dressed: a party (or happy) animal's own gear, worn asleep
    const k = dressed ? `nap-${dressed.colour ? "party" : "happy"}-${species}-${dressed.id}` : `nap-${species}`, a = this.creatures.get(k); // (the species in the key: an id is a creature only within one map, and the art is kept on this browser)
    if (!a) this.ask({ kind: "nap", id: k, species, style: this.style, ...(dressed ? { dressed: { seed: dressed.id, colour: dressed.colour } } : {}) });
    return a;
  }
  /** A creature's idle pose (art/creatures.js IDLE_BUILDERS: the meerkat sat up as a sentinel; each level in 2 frames, a look round), or
   *  undefined (and asked for). Baked as a nap is (its ground line and middle). */
  /** A glider spread out in the air (Profile.glide: its legs out, its membrane taut; each level in 2 frames), or undefined (and asked for). */
  glideArt(species: string): CreatureArt | undefined {
    const k = `glide-${species}`, a = this.creatures.get(k);
    if (!a) this.ask({ kind: "glide", id: k, species, style: this.style });
    return a;
  }
  idleArt(species: string): CreatureArt | undefined {
    const k = `idle-${species}`, a = this.creatures.get(k);
    if (!a) this.ask({ kind: "nap", id: k, species, style: this.style, idle: true });
    return a;
  }
  /** A creature's enraged look (a wave woke its area: red eyes), or undefined (and asked for). */
  wokenArt(species: string): CreatureArt | undefined {
    const k = `woken-${species}`, a = this.creatures.get(k);
    if (!a) this.ask({ kind: "woken", id: k, species, style: this.style });
    return a;
  }
  /** A creature in an expression (art/genome/expressions.js: happy, dazed...), or undefined (and asked for). */
  faceArt(species: string, face: string): CreatureArt | undefined {
    const k = `face-${face}-${species}`, a = this.creatures.get(k);
    if (!a) this.ask({ kind: "face", id: k, species, face, style: this.style });
    return a;
  }
  /** An invited creature's party look (its gear seeded by its id), or undefined (and asked for). */
  partyArt(species: string, id: number, colour: number[]): CreatureArt | undefined {
    const k = `party-${species}-${id}`, a = this.creatures.get(k); // (the species in the key: an id is a creature only within one map)
    if (!a) this.ask({ kind: "party", id: k, species, seed: id, colour, style: this.style });
    return a;
  }
  /** A happy creature's look (issue #87): party clothes, no glowing collar; or undefined (and asked for). */
  happyArt(species: string, id: number): CreatureArt | undefined {
    const k = `happy-${species}-${id}`, a = this.creatures.get(k);
    if (!a) this.ask({ kind: "party", id: k, species, seed: id, colour: null, style: this.style });
    return a;
  }
  /** The party objects' art (#38), or undefined (and asked for). */
  partyObjectArt(): (PartyArt & { atlas: Atlas }) | undefined {
    if (!this.party) this.ask({ kind: "partyObjects", id: "party", style: this.style });
    return this.party;
  }
  /** Her frames' job: drawn by an art worker (render/homeArt.ts), kept in the browser's store by her genome. */
  private witchJob(genome: unknown, bare: boolean): ArtJob {
    return { kind: "witch", id: `${hashText(JSON.stringify(genome ?? null))}${bare ? "-bare" : ""}`, style: this.style, genome, bare };
  }
  /** Where each of her poses' frames are (kept objects: the view holds them). */
  private applyWitchTables(W: WitchArt): void {
    for (const k of Object.keys(this.witchFoot)) delete this.witchFoot[k];
    for (const k of Object.keys(this.witchFly)) delete this.witchFly[k];
    Object.assign(this.witchFoot, W.foot); Object.assign(this.witchFly, W.fly); Object.assign(this.witchHeading, W.heading);
    this.witchLean.towards = W.lean.towards; this.witchLean.away = W.lean.away;
    this.witchDj.full.length = 0; this.witchDj.upper.length = 0; this.witchDj.full.push(...W.dj.full); this.witchDj.upper.push(...W.dj.upper);
  }
  /** A gesture's frame (0 or 1 of its pair in Art.DJ_GESTURES: her set's routine, rules/djSet.ts) as its index in witchDj. */
  djGestureFrame(gesture: string, frame: number): number { return (Art.DJ_GESTURES as Record<string, number[]>)[gesture]?.[frame] ?? 0; }
  /** Her frame behind the decks at `beat` (rules/beat.ts beatAt): its index in witchDj (Art.djFrame: a gesture a bar, nodding on the beat;
   *  scratching, the wait after a knockout). */
  djFrame(beat: number, cast = false, scratch = false): number { return (Art.djFrame as (b: number, o: object) => number)(beat, { cast, scratch }); } // (scratch: her respawn wait after a knockout; art/witch.js's frames for it, else she DJs as ever)
  /** The character creator changed her look: her frames again, from an art worker (her old ones until they arrive; then onWitch). */
  rebakeWitch(genome: unknown): void {
    this.witchGenome = genome; this.bare = null; this.bareAsked = false;
    const had = this.witchLooks.get(JSON.stringify(genome ?? null));
    if (had) this.wearLook(had); else this.ask(this.witchJob(genome, false), true);
  }
  private wearLook(look: { atlas: Atlas; art: WitchArt }): void { this.witch = look.atlas; this.applyWitchTables(look.art); this.home.witch = true; }
  /** Her frames with her hat knocked off (rules/hat.ts), at the same places as `witch`'s, and her hat lying on the
   *  ground (`witchHatFrame`): asked for the first time they're wanted (the view asks once the game is up); a stand-in
   *  till they arrive (then onWitch). */
  witchBare(): Atlas {
    if (!this.bare && !this.bareAsked) { this.bareAsked = true; this.ask(this.witchJob(this.witchGenome, true), true); } // (urgent: her own frames, one job, needed at her first knockdown; behind the art drawn ahead they came minutes late on a slow machine, and she was drawn from the stand-in: invisible)
    return this.bare ?? this.bareStandIn;
  }
  private bare: Atlas | null = null;
  private bareAsked = false;
  /** Her frames without her hat are in (not the stand-in): always her look now (onResult drops one for a look she's left). */
  get bareReady(): boolean { return !!this.bare; }
  private bareStandIn = placeholderAtlas(256);
  /** The hat on the ground in witchBare()'s atlas (-1: she has none). */
  witchHatFrame = -1;
  /** Her hat alone in the look of `genome` (a hat she left lying: render/view/witch.ts), its frame 0; undefined (and asked for)
   *  till it's drawn. */
  hatArt(genome: unknown): Atlas | undefined {
    const id = `hat-${hashText(JSON.stringify(genome ?? null))}`, a = this.hats.get(id);
    if (!a) this.ask({ kind: "hat", id, style: this.style, genome }, true);
    return a;
  }
  private hats = new Map<string, Atlas>();
  /** A find's own art (render/view/finds.ts: tonight's travel trunk), its piece alone in an atlas of its own; undefined (and
   *  asked for: urgent when she's near enough to see it) till it's drawn. */
  findArt(id: string, urgent = false): (SceneArt & { atlas: Atlas }) | undefined {
    const a = this.finds.get(id);
    if (!a) this.ask({ kind: "find", id, style: this.style }, urgent);
    return a;
  }
  private finds = new Map<string, SceneArt & { atlas: Atlas }>();

  /** A party witch's art (#37: her look from partyWitch(seed), or seed null for our witch's own),
   *  or undefined (and asked for). Looks repeat after a few, so there are only so many to draw. */
  partyWitchArt(seed: number | null): (PartyWitchArt & { atlas: Atlas }) | undefined {
    // (hers keyed by her genome, so a new look is drawn afresh, never a cached old one)
    const id = seed === null ? `her-${hashText(JSON.stringify(this.witchGenome))}` : `pw-${seed}`, a = this.partyWitches.get(id);
    // (urgent: they dance at home, in view from the start, so not behind every area type's prefetch)
    if (!a) this.ask({ kind: "partyWitch", id, seed, style: this.style, genome: seed === null ? this.witchGenome : undefined }, true);
    return a;
  }
  /** An area's generated soundsystem (art/soundsystemGen.js), baked at its yaw and size, or undefined (and asked for; urgent when
   *  it's about to rise, else in the background, ahead of its wave). `id` names the genome, yaw and size together. */
  soundsystemGenArt(id: string, genome: unknown, yaw: number, size: number, urgent = true, part: "play" | "damage" = "play"): (SoundsystemGenArt & { atlas: Atlas }) | undefined {
    const k = part === "play" ? id : `${id}-dmg`, a = this.soundsystemsGen.get(k);
    if (!a) this.ask({ kind: "soundsystem", id: k, style: this.style, genome, yaw, size, part }, urgent);
    return a;
  }
  /** Ask for a set ahead of need, without using it. */
  prefetchType(t: number): void { if (!this.types.has(t)) this.ask({ kind: "type", id: t, style: this.style, seed: this.typeSeed, K: this.K, biome: this.typeBiome }); }
  /** Tonight's own trees (the night's seed), for the area types `types`, if they were drawn ahead and kept (app/landingBake.ts):
   *  asked for only if kept, so nothing is drawn now; those found wait for swapTonight. Nothing with the trees drawn under the
   *  night's seed already. */
  tonight(types: Iterable<number>): void {
    if (this.typeSeed === this.seed || this.tonightShut) return;
    for (const t of types) { const job = { kind: "type", id: t, style: this.style, seed: this.seed, K: this.K, biome: this.typeBiome } as ArtJob & CacheHint; job.cacheOnly = true; this.ask(job, true); }
  }
  /** The moment she can't see the trees change (main.ts revealArt): tonight's sets found by now take the place of the island's;
   *  the rest keep the island's for the whole night (nothing swapped later: no trees changing in play). The types swapped. */
  swapTonight(): number[] {
    this.tonightShut = true;
    const swapped = [...this.tonightTypes.keys()];
    for (const [t, a] of this.tonightTypes) this.types.set(t, a);
    this.tonightTypes.clear();
    if (swapped.length) this.version++;
    return swapped;
  }

  get pending(): number { return this.inFlight.size; }
  /** Other work the view waits for as for art (render/houseFloor.ts, the house's floor painted off the page's thread): pending, as a
   *  set being drawn is, until it's done, so the shots and the bench step past it only once it's in. */
  track(key: string, p: Promise<unknown>): void { this.inFlight.add(key); p.then(() => this.inFlight.delete(key), () => this.inFlight.delete(key)); }
  /** Area type `t`'s art held (drawn, or kept and read back). */
  hasType(t: number): boolean { return this.types.has(t); }

  /** Another island takes the page (View.setGame; docs/plans/sail-without-reload.md B 3-5, decision 6: only this island's art in
   *  memory): a new generation, so the last island's sets waiting are dropped and those being drawn land to nothing; its sets let
   *  go (its trees, tonight's, its soundsystems; its treehouse if this one's is another), each atlas freed here, once (the view
   *  lets go of its batches on them first, never their atlases); and the new island's seeds and treehouse. Its sets are asked for
   *  afresh as they're wanted (from the browser's store, if drawn before). */
  reseat(o: { seed: number; typeSeed: number; typeBiome?: string; treehouse: string }): void {
    this.gen++;
    this.queue = this.queue.filter(j => !islandBound(j));
    for (const k of [...this.inFlight]) if (islandBound(k)) { this.inFlight.delete(k); this.promoted.delete(k); this.urgentKeys.delete(k); }
    const free = (a: Atlas) => { a.albedo.dispose(); a.normal.dispose(); };
    for (const a of this.types.values()) free(a.atlas);
    for (const a of this.tonightTypes.values()) free(a.atlas);
    for (const a of this.soundsystemsGen.values()) free(a.atlas);
    this.types.clear(); this.tonightTypes.clear(); this.soundsystemsGen.clear(); this.typeLog.clear(); this.typeNext = 0;
    this.tonightShut = false;
    this.seed = o.seed; this.typeSeed = o.typeSeed; this.typeBiome = o.typeBiome;
    if (o.treehouse !== this.treehouseId || !this.home.treehouse) { // (another, or this one still being drawn: asked again, the last ask dropped)
      this.treehouseId = o.treehouse;
      if (this.home.treehouse) free(this.treehouse.atlas);
      this.treehouse = noTreehouse();
      this.home.treehouse = false;
      this.ask({ kind: "treehouse", id: o.treehouse, style: this.style }, true, true);
    }
    this.version++;
  }
  /** The sets held now, by kind (for the checks: tools/sail/swap.cjs, the tests). */
  sets(): Record<string, number> {
    return { types: this.types.size, tonight: this.tonightTypes.size, soundsystems: this.soundsystemsGen.size, creatures: this.creatures.size, rigs: this.rigs.size, queued: this.queue.length, pending: this.inFlight.size };
  }

  /** Without workers: draw waiting sets on the page until `budgetMs` has passed (at least one). */
  work(budgetMs: number): void {
    if (this.useWorkers || this.held) return;
    const t0 = performance.now();
    let made = 0;
    while (this.queue.length && (made === 0 || performance.now() - t0 < budgetMs)) {
      const job = this.queue.shift()!;
      if ((job as ArtJob & CacheHint).cacheOnly) { this.receive({ job, miss: true }); continue; } // (asked only if kept: the page keeps nothing of its own to read)
      const t1 = performance.now(), result = runJob(job, (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; });
      { const ck = this.cacheKey(job); if (ck) void cachePut(ck, result); } // (drawn on the page: kept from here)
      this.receive({ job, result, ms: performance.now() - t1 });
      made++;
    }
  }

  /** Resolves once nothing is waiting to be drawn (`urgentOnly`: nothing the view asked for as needed now; the scenery kits and
   *  creatures asked ahead of need draw on, and fade in as they come: prepare). */
  whenIdle(urgentOnly = false): Promise<void> {
    return new Promise(resolve => {
      const check = () => { this.work(50); if (!(urgentOnly ? this.urgentKeys.size : this.pending)) resolve(); else setTimeout(check, 30); };
      check();
    });
  }
}
