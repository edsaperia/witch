// The game's sprites, drawn by the art module (art/generator.js) from the style: one atlas per
// area type (its trees, as top and bottom halves, and its bushes) and one per kind of creature.
// Sets are asked for as the witch nears them and drawn by a few Web Workers in the background;
// where workers or OffscreenCanvas are missing, they are drawn on the page, one per frame.
import * as Art from "../../art/generator.js";
import { atlasFromPixels, placeholderAtlas, type Atlas } from "./atlas";
import { witchSprites, type SoundsystemGenArt, type TreehouseArt, type WitchArt } from "./homeArt";
import { creatureFrame, walkGait, runJob, type ArtJob, type ArtResult, type BeachArt, type BeachEdgeArt, type DecorPiece, type PartyWitchArt, type PartyArt, type PathPieceArt, type RelicArt, type RelicLayouts, type SceneArt, type SpeakerArt, type TilePixels, type TypeLayout } from "./artBuild";
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
export interface DecorArt { atlas: Atlas; pieces: DecorPiece[]; families: Record<string, DecorPiece[]> }
export interface CreatureArt { atlas: Atlas; frame: (level: number, frame: number, away?: boolean) => number; /** Its walk (art/creatures.js walkGait): frames in the cycle, and how far it moves between them (a share of its width). */ walk?: { frames: number; step: number }; /** A sleeping legend's ground line in each frame (rows from its top): drawn with that row on the ground. */ ground?: number[]; /** And how far its body's middle lies right of the frame's middle in each frame (pixels): drawn with its middle on its place. */ centre?: number[] }
/** A creature asleep's frame: its level's two breaths (render/artBuild.ts "nap"). */
export const napFrame = (level: number, f: number) => level * 2 + (f % 2);
/** A species' live-rig parts at one level (#79): its atlas page and what the rig needs. */
export interface RigArt { atlas: Atlas; meta: RigMeta; used: number }
/** How many rig pages (a species at a level each) are kept at once. */
const RIG_PAGES = 48;

type Reply = { job: ArtJob; result?: ArtResult; error?: string; ms?: number; cached?: boolean };

export class AssetLibrary {
  private types = new Map<number, TypeArt>();
  private creatures = new Map<string, CreatureArt>();
  private rigs = new Map<string, RigArt>();
  private partyWitches = new Map<string, PartyWitchArt & { atlas: Atlas }>();
  private soundsystemsGen = new Map<string, SoundsystemGenArt & { atlas: Atlas }>();
  private party: (PartyArt & { atlas: Atlas }) | undefined;
  private decor: DecorArt | undefined;
  /** The beach's edge of the woods (render/beach.ts): asked for only when she comes near the sand. */
  private beachEdge: (BeachEdgeArt & { atlas: Atlas }) | undefined;
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
  /** On foot (from frame 16): each pose's frames, towards and away. */
  readonly witchFoot: Record<string, { towards: number[]; away: number[]; fps: number }> = {};
  /** In the treetops: the fast and brake poses' frames, towards and away. */
  readonly witchFly: Record<string, { towards: number[]; away: number[]; fps: number }> = {};
  /** Her straight-up ("up": seen from behind) and straight-down ("down": coming at us) flight frames (#27): hover, lean, fast, brake. */
  readonly witchHeading = {} as Record<"up" | "down", { hover: number[]; lean: number; leanCycle: number[]; fast: number[]; brake: number[] }>;
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
    candle0: number; candleRed: number; candleLevels: number; candleFlicker: number; candleRow: { x: number; y: number }[] } = { atlas: placeholderAtlas(8), base: { x: 0, y: 1 }, seat: { x: 0, y: 0 }, camera: { x: 0, y: 0 }, hasFore: false, lights: [], foreFrames: 0, foreBox: { x: 0, y: 0 }, candle0: 0, candleRed: 0, candleLevels: 0, candleFlicker: 1, candleRow: [] };
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

  constructor(readonly style: Style, readonly seed: number, pixelSize: number, witchGenome: unknown = null, treehouse = "home") {
    this.K = 2 / pixelSize;
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
          const w = new Worker(new URL("./artWorker.ts", import.meta.url), { type: "module" });
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
    this.ask({ kind: "treehouse", id: treehouse, style }, true); // (the old treehouse, or the Ent holding the deck: "ent:<height>:<radius>")
    this.ask({ kind: "soundsystems", id: "home", style }, true);
    this.ask({ kind: "props", id: "home", style }, true);
    this.ask(this.witchJob(witchGenome, false), true);
  }

  private key = (j: ArtJob) => j.kind + ":" + j.id;
  /** Where a set is kept between visits (render/artCache.ts). */
  private cacheKey = (j: ArtJob) => artCacheKey(j, this.styleHash);
  /** Ask for a set: from the browser's store if it was drawn before, else drawn by a worker. An
   *  urgent ask (the view needs it now) goes ahead of the sets drawn ahead of need. */
  /** Waiting jobs already moved to the front of the queue by an urgent ask. */
  private promoted = new Set<string>();
  private ask(job: ArtJob, urgent = false): void {
    const k = this.key(job);
    if (this.inFlight.has(k)) {
      // (an urgent job asked for again while waiting is moved to the front once: asked for every creature every frame, searching
      // the queue each time cost creatures x queue while new art was baking)
      if (!urgent || this.promoted.has(k)) return;
      this.promoted.add(k);
      const i = this.queue.findIndex(q => this.key(q) === k);
      if (i > 0) this.queue.unshift(...this.queue.splice(i, 1));
      return;
    }
    this.inFlight.add(k);
    // The cache is the worker's (render/artWorker.ts: the job carries its key; a set drawn before comes back `cached`), so the
    // page never reads or writes a set's megabytes itself (the stall hunt, 2026-10-13); drawing on the page (no workers), it does.
    (job as ArtJob & CacheHint).cacheKey = this.cacheKey(job);
    (job as ArtJob & { urgent?: boolean }).urgent = urgent;
    if (urgent || this.promoted.has(k)) this.queue.unshift(job); else this.queue.push(job);
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
  private receive(r: Reply): void {
    if (!r.result) { // a worker could not draw it: draw it here instead
      console.warn("art worker failed, drawing on the page:", r.error);
      this.useWorkers = false;
      this.queue.unshift(r.job);
      return;
    }
    const atlas = atlasFromPixels(r.result.px);
    this.timings.push({ set: this.key(r.job), ms: r.ms ?? 0, at: performance.now(), cached: !!r.cached });
    if (r.job.kind === "witch") {
      if (r.job.bare) { this.bare = { ...atlas, grounds: r.result.ours!.grounds }; this.witchHatFrame = r.result.ours!.hat; }
      else if (JSON.stringify(r.job.genome ?? null) === JSON.stringify(this.witchGenome ?? null)) { // (a look since replaced by the creator's next: not hers)
        this.witch = { ...atlas, grounds: r.result.ours!.grounds }; this.applyWitchTables(r.result.ours!); this.home.witch = true;
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
    } else if (r.job.kind === "hat") {
      this.hats.set(r.job.id, atlas);
    } else if (r.job.kind === "partyWitch") {
      this.partyWitches.set(r.job.id, { atlas, ...r.result.witch! });
    } else if (r.job.kind === "beachEdge") {
      this.beachEdge = { atlas, ...r.result.beachEdge! };
    } else if (r.job.kind === "decor") {
      const pieces = r.result.decor!, families: Record<string, DecorPiece[]> = {};
      for (const p of pieces) (families[p.family] ??= []).push(p);
      this.decor = { atlas, pieces, families };
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
      this.types.set(r.job.id, { atlas, layout: r.result.layout!, cut });
      if (r.result.floor) this.onFloor(r.job.id, r.result.floor);
    } else if (r.job.kind === "sleep") this.creatures.set(r.job.id, { atlas, frame: (_level, f) => f % 2, ground: r.result.ground, centre: r.result.centre });
    else if (r.job.kind === "nap") this.creatures.set(r.job.id, { atlas, frame: napFrame, ground: r.result.ground, centre: r.result.centre });
    else if (r.job.kind === "glide") this.creatures.set(r.job.id, { atlas, frame: napFrame });
    else { const G = walkGait("species" in r.job ? r.job.species : r.job.id); // (its walk's frames: a party look's, woken or a face's are its species')
      this.creatures.set(r.job.id, { atlas, frame: (l: number, f: number, away?: boolean) => creatureFrame(l, f, away, G.frames), walk: G }); }
    this.inFlight.delete(this.key(r.job)); this.promoted.delete(this.key(r.job));
    this.version++;
  }

  /** An area type's art, or undefined (and asked for) if it is not drawn yet. */
  typeArt(t: number): TypeArt | undefined {
    const a = this.types.get(t);
    if (!a) this.ask({ kind: "type", id: t, style: this.style, seed: this.seed, K: this.K }, true);
    return a;
  }
  /** The beach's edge of the woods (palms, shrubs, grass clumps), or undefined (and asked for). */
  beachEdgeArt(): (BeachEdgeArt & { atlas: Atlas }) | undefined {
    if (!this.beachEdge) this.ask({ kind: "beachEdge", id: "all", style: this.style, K: this.K }, true);
    return this.beachEdge;
  }
  /** The decorations' art (ruins, rocks, freak trees), or undefined (and asked for). */
  decorArt(): DecorArt | undefined {
    if (!this.decor) this.ask({ kind: "decor", id: "all", style: this.style });
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
  /** An area legend asleep (art/legends.js: sunk in its area's earth, mossed over, eyes shut; 2 breathing frames), or undefined (and asked for). */
  sleepArt(species: string): CreatureArt | undefined {
    const k = `sleep-${species}`, a = this.creatures.get(k);
    if (!a) this.ask({ kind: "sleep", id: k, species, style: this.style });
    return a;
  }
  /** A creature asleep (art/naps.js: lying down, eyes shut, curled, tucked, coiled or flat by species; each level in 2 breathing
   *  frames), or undefined (and asked for). */
  napArt(species: string, dressed?: { id: number; colour: number[] | null }): CreatureArt | undefined { // dressed: a party (or happy) animal's own gear, worn asleep
    const k = dressed ? `nap-${dressed.colour ? "party" : "happy"}-${dressed.id}` : `nap-${species}`, a = this.creatures.get(k);
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
    const k = `party-${id}`, a = this.creatures.get(k);
    if (!a) this.ask({ kind: "party", id: k, species, seed: id, colour, style: this.style });
    return a;
  }
  /** A happy creature's look (issue #87): party clothes, no glowing collar; or undefined (and asked for). */
  happyArt(species: string, id: number): CreatureArt | undefined {
    const k = `happy-${id}`, a = this.creatures.get(k);
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
  rebakeWitch(genome: unknown): void { this.witchGenome = genome; this.bare = null; this.bareAsked = false; this.ask(this.witchJob(genome, false), true); }
  /** Her frames with her hat knocked off (rules/hat.ts), at the same places as `witch`'s, and her hat lying on the
   *  ground (`witchHatFrame`): asked for the first time they're wanted (the view asks once the game is up); a stand-in
   *  till they arrive (then onWitch). */
  witchBare(): Atlas {
    if (!this.bare && !this.bareAsked) { this.bareAsked = true; this.ask(this.witchJob(this.witchGenome, true), true); } // (urgent: her own frames, one job, needed at her first knockdown; behind the art drawn ahead they came minutes late on a slow machine, and she was drawn from the stand-in: invisible)
    return this.bare ?? this.bareStandIn;
  }
  private bare: Atlas | null = null;
  private bareAsked = false;
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
  prefetchType(t: number): void { if (!this.types.has(t)) this.ask({ kind: "type", id: t, style: this.style, seed: this.seed, K: this.K }); }

  get pending(): number { return this.inFlight.size; }

  /** Without workers: draw waiting sets on the page until `budgetMs` has passed (at least one). */
  work(budgetMs: number): void {
    if (this.useWorkers || this.held) return;
    const t0 = performance.now();
    let made = 0;
    while (this.queue.length && (made === 0 || performance.now() - t0 < budgetMs)) {
      const job = this.queue.shift()!;
      const t1 = performance.now(), result = runJob(job, (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; });
      { const ck = this.cacheKey(job); if (ck) void cachePut(ck, result); } // (drawn on the page: kept from here)
      this.receive({ job, result, ms: performance.now() - t1 });
      made++;
    }
  }

  /** Resolves once nothing is waiting to be drawn. */
  whenIdle(): Promise<void> {
    return new Promise(resolve => {
      const check = () => { this.work(50); if (!this.pending) resolve(); else setTimeout(check, 30); };
      check();
    });
  }
}
