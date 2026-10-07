// The game's sprites, drawn by the art module (art/generator.js) from the style: one atlas per
// area type (its trees, as top and bottom halves, and its bushes) and one per kind of creature.
// Sets are asked for as the witch nears them and drawn by a few Web Workers in the background;
// where workers or OffscreenCanvas are missing, they are drawn on the page, one per frame.
import * as Art from "../../art/generator.js";
import { atlasFromPixels, packAtlas, type Atlas, type Baked, type FrameGround, groundOf } from "./atlas";
import { creatureFrame, walkGait, runJob, witchLookOf, type ArtJob, type ArtResult, type BeachArt, type BeachEdgeArt, type DecorPiece, type PartyWitchArt, type PartyArt, type PathPieceArt, type RelicArt, type RelicLayouts, type SceneArt, type SpeakerArt, type TilePixels, type TypeLayout } from "./artBuild";
import type { Style } from "./style";
import { ART_HASH, cacheGet, cachePut, hashText } from "./artCache";
import { rigGearKey, type RigGear, type RigMeta } from "./rig/rigBuild";

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
  /** Her frames (bakeWitch: from her genome, re-baked when the character creator changes her). */
  witch!: Atlas;
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
  /** Light-source props from the art module: campfire (frames 0-2), then magic stones (cyan, violet, green). */
  readonly props: Atlas;
  /** Soundsystems: variant x 3 + frame (the cones pumping), playing. */
  readonly soundsystems: Atlas;
  /** The witch's treehouse: its base (frame 0) and top (frame 1, the crown: treetop mode), and
   *  anchors in its sprite's pixels: the trunk's foot, her seat on the terrace, its lights. */
  readonly treehouse: { atlas: Atlas; base: { x: number; y: number }; seat: { x: number; y: number }; camera: { x: number; y: number }; hasFore: boolean; lights: { x: number; y: number; rgb: number[]; kind: string }[] };
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

  constructor(readonly style: Style, readonly seed: number, pixelSize: number, witchGenome: unknown = null) {
    this.K = 2 / pixelSize;
    this.styleHash = hashText(JSON.stringify(style));
    this.witch = this.bakeWitch(witchGenome);
    const lp = Art.lightProps(style) as { campfire: Baked[]; stones: Record<string, Baked> };
    this.props = packAtlas([...lp.campfire, lp.stones.cyan, lp.stones.violet, lp.stones.green], 1024);
    const ss: Baked[] = [];
    for (let v = 0; v < 3; v++) for (let f = 0; f < 3; f++) ss.push(Art.bake(Art.soundsystemSprite(style, { variant: v, frame: f, state: "playing" }), Art.soundsystemColours(v), style, style.cOutline) as Baked);
    this.soundsystems = packAtlas(ss, 2048);
    const th = Art.treehouseSprite(style) as { bot: unknown; top: unknown; fore?: unknown; anchors: { base: { x: number; y: number }; seat: { x: number; y: number }; camera?: { x: number; y: number }; lights: { x: number; y: number; rgb: number[]; kind: string }[] } };
    const thc = Art.treehouseColours(style);
    // Its model draws a hard dark shadow ellipse on the ground round the trunk's foot: drop it (a
    // soft contact shadow goes there instead), as Ed asked for set pieces.
    for (const sp of [th.bot, th.top] as { w: number; h: number; m: Uint8Array }[])
      for (let y = Math.max(0, Math.floor(th.anchors.base.y - 14)); y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x] === Art.M.NOSE) sp.m[y * sp.w + x] = 0;
    // Frames: 0 its base, 1 its top (treetop mode), 2 the studio's DJ table alone (v2), drawn over her.
    this.treehouse = { atlas: packAtlas([th.bot, th.top, ...(th.fore ? [th.fore] : [])].map(sp => Art.bake(sp, thc, style, "none") as Baked), 2048), ...th.anchors, camera: th.anchors.camera ?? th.anchors.seat, hasFore: !!th.fore };
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
  }

  private key = (j: ArtJob) => j.kind + ":" + j.id;
  /** Where a set is kept between visits: the art's code, the style, the set, and for an area type
   *  its seed and scale. Party looks are per creature, so they aren't kept. */
  private cacheKey = (j: ArtJob) => j.kind === "party" ? null : [ART_HASH, this.styleHash, this.key(j), j.kind === "type" ? `${j.seed}|${j.K}` : j.kind === "beachEdge" ? `${j.K}` : ""].join("|");
  /** Ask for a set: from the browser's store if it was drawn before, else drawn by a worker. An
   *  urgent ask (the view needs it now) goes ahead of the sets drawn ahead of need. */
  private ask(job: ArtJob, urgent = false): void {
    const k = this.key(job);
    if (this.inFlight.has(k)) {
      const i = urgent ? this.queue.findIndex(q => this.key(q) === k) : -1;
      if (i > 0) this.queue.unshift(...this.queue.splice(i, 1));
      return;
    }
    this.inFlight.add(k);
    const ck = this.cacheKey(job), draw = () => { if (urgent) this.queue.unshift(job); else this.queue.push(job); this.dispatch(); };
    if (!ck) { draw(); return; }
    cacheGet(ck).then(hit => {
      if (hit && hit.px) this.receive({ job, result: hit, ms: 0, cached: true });
      else draw();
    }, draw);
  }
  private dispatch(): void {
    if (!this.useWorkers) return;
    for (const slot of this.workers) {
      if (slot.busy || !this.queue.length) continue;
      slot.busy = true;
      slot.job = this.queue.shift();
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
    if (!r.cached) { const ck = this.cacheKey(r.job); if (ck) cachePut(ck, r.result); }
    const atlas = atlasFromPixels(r.result.px);
    this.timings.push({ set: this.key(r.job), ms: r.ms ?? 0, at: performance.now(), cached: !!r.cached });
    if (r.job.kind === "relics") {
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
    } else if (r.job.kind === "partyWitch") {
      this.partyWitches.set(r.job.id, { atlas, ...r.result.witch! });
    } else if (r.job.kind === "beachEdge") {
      this.beachEdge = { atlas, ...r.result.beachEdge! };
    } else if (r.job.kind === "decor") {
      const pieces = r.result.decor!, families: Record<string, DecorPiece[]> = {};
      for (const p of pieces) (families[p.family] ??= []).push(p);
      this.decor = { atlas, pieces, families };
    } else if (r.job.kind === "rig") {
      if (r.result.rig) this.rigs.set(r.job.id, { atlas, meta: r.result.rig, used: performance.now() });
      this.evictRigs();
    } else if (r.job.kind === "type") {
      // Each tree's cut: where its crown's bulk ends (both halves share the frame's box): the row
      // above which trunkFade.crownShare of its top half's pixels lie. Not its lowest drawn pixel:
      // the crowns' low boughs and skirts hang nearly to the ground, and a cut down there hid
      // nearly every trunk where the crowns are cut away (Ed, v271: "lots of crowns, zero stumps").
      const px = r.result.px, cut = new Map<number, number>(), share = this.crownShare;
      for (const p of r.result.layout!.big) {
        if (p.top === null) continue;
        const f = px.frames[p.top], x0 = Math.round(f.uv[0] * px.width), y0 = Math.round(f.uv[1] * px.height), rows = new Array<number>(f.h).fill(0);
        let total = 0;
        for (let y = 0; y < f.h; y++) for (let x = 0; x < f.w; x++) if (px.albedo[((y0 + y) * px.width + x0 + x) * 4 + 3] > 0) { rows[y]++; total++; }
        if (!total) continue;
        let row = 0, seen = 0;
        for (let y = 0; y < f.h; y++) { seen += rows[y]; if (seen >= total * share) { row = y; break; } }
        cut.set(p.bot, (row + 1) / f.h);
      }
      this.types.set(r.job.id, { atlas, layout: r.result.layout!, cut });
      if (r.result.floor) this.onFloor(r.job.id, r.result.floor);
    } else if (r.job.kind === "sleep") this.creatures.set(r.job.id, { atlas, frame: (_level, f) => f % 2, ground: r.result.ground, centre: r.result.centre });
    else if (r.job.kind === "nap") this.creatures.set(r.job.id, { atlas, frame: napFrame, ground: r.result.ground, centre: r.result.centre });
    else { const G = walkGait("species" in r.job ? r.job.species : r.job.id); // (its walk's frames: a party look's, woken or a face's are its species')
       this.creatures.set(r.job.id, { atlas, frame: (l: number, f: number, away?: boolean) => creatureFrame(l, f, away, G.frames), walk: G }); }
    this.inFlight.delete(this.key(r.job));
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
    if (!this.speakers) this.ask({ kind: "speakers", id: "all", style: this.style }, true);
    return this.speakers;
  }
  /** The paths' 3D pieces, or undefined (and asked for). */
  pathPieceArt(): { atlas: Atlas; byId: Record<string, PathPieceArt> } | undefined {
    if (!this.pieces) this.ask({ kind: "pathPieces", id: "all", style: this.style });
    return this.pieces;
  }
  /** A species' live-rig parts at a level (#79 stage 4: one atlas page each, keyed by its genome's
   *  hash so a changed record bakes afresh), or undefined (and asked for). */
  rigArt(species: string, level: number, gear?: RigGear): RigArt | undefined { // gear: a party animal's, baked on (a page per species, level and gear)
    const g = (Art.GENOME_BY_ID as Record<string, unknown>)[species];
    if (!g) return undefined;
    const k = `rig-${species}-${level}-${Art.genomeHash(g)}${gear ? "-" + rigGearKey(gear) : ""}`, a = this.rigs.get(k);
    if (a) { a.used = performance.now(); return a; }
    this.ask({ kind: "rig", id: k, species, level, style: this.style, ...(gear ? { gear } : {}) }, true); // gameplay: ahead of the scenery
    return undefined;
  }
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
  /** Her frames from her genome (null: the classic witch): flight, on foot, headings. Called again by
   *  rebakeWitch when the character creator changes her look. */
  private bakeWitch(genome: unknown, bare = false): Atlas {
    // The witch: hover frames 0-2 towards, 3-5 away, then leaning towards (6) and away (7); then
    // rising (8-9 towards, 10-11 away) and descending (12-13 towards, 14-15 away), two frames each.
    // Bare (her hat knocked off: rules/hat.ts): the same frames, at the same places, with no hat; then the hat on the ground.
    const style = this.style, mine = witchLookOf(style, genome), wc = mine.colours, look = bare ? { ...(mine.look ?? {}), hat: "none" } : mine.look;
    const grounds: (FrameGround | null)[] = []; // (each frame's ground, in the order they're made: every one is kept, in order)
    const wb = (o: object) => {
      const sp = (Art.witchSprite as (st: Style, o: object) => ReturnType<typeof Art.witchSprite>)(style, { ...o, look }) as { anchors?: Record<string, number[]> };
      grounds.push(groundOf(sp.anchors));
      return Art.bake(sp as ReturnType<typeof Art.witchSprite>, wc, style, style.cOutline) as Baked;
    };
    const witchFoot = bare ? {} as typeof this.witchFoot : this.witchFoot, witchFly = bare ? {} as typeof this.witchFly : this.witchFly;
    const witchLean = bare ? { towards: [] as number[], away: [] as number[] } : this.witchLean, witchHeading = bare ? {} as typeof this.witchHeading : this.witchHeading;
    for (const k of Object.keys(witchFoot)) delete witchFoot[k];
    for (const k of Object.keys(witchFly)) delete witchFly[k];
    witchLean.towards.length = 0; witchLean.away.length = 0;
    const sprites = [0, 1, 2].map(frame => wb({ frame })).concat([0, 1, 2].map(frame => wb({ frame, facing: "away" })), [wb({ lean: true }), wb({ lean: true, facing: "away" })],
      ...["rise", "descend"].flatMap(pose => ["towards", "away"].flatMap(facing => [0, 1].map(frame => wb({ pose, frame, facing })))));
    // On foot, from 16: standing, landing, taking off, talking, putting a sigil down, lifting one.
    const FOOT = Art.WITCH_FOOT_POSES as Record<string, { frames: number; fps: number }>;
    for (const pose of ["stand", "land", "takeoff", "talk", "placeSigil", "liftSigil", "sit"]) {
      const n = FOOT[pose].frames, entry = { towards: [] as number[], away: [] as number[], fps: FOOT[pose].fps };
      for (const facing of ["towards", "away"] as const) for (let frame = 0; frame < n; frame++) { entry[facing].push(sprites.length); sprites.push(wb({ pose, frame, facing })); }
      witchFoot[pose] = entry;
    }
    // Treetop flight: fast (at boost: three frames) and brake (a skid: two frames), towards and away.
    for (const [pose, n] of [["fast", 3], ["brake", 2]] as const) {
      const entry = { towards: [] as number[], away: [] as number[], fps: pose === "fast" ? 10 : 8 };
      for (const facing of ["towards", "away"] as const) for (let frame = 0; frame < n; frame++) { entry[facing].push(sprites.length); sprites.push(wb({ pose, frame, facing })); }
      witchFly[pose] = entry;
    }
    for (const facing of ["towards", "away"] as const) for (let frame = 0; frame < 4; frame++) { witchLean[facing].push(sprites.length); sprites.push(wb({ pose: "lean", frame, facing })); }
    for (const [h, heading] of [["up", "away"], ["down", "towards"]] as const) {
      const at = (o: object) => sprites.push(wb({ ...o, heading })) - 1;
      witchHeading[h] = { hover: [0, 1, 2].map(frame => at({ frame })), lean: at({ lean: true }), leanCycle: [0, 1, 2, 3].map(frame => at({ pose: "lean", frame })), fast: [0, 1, 2].map(frame => at({ pose: "fast", frame })), brake: [0, 1].map(frame => at({ pose: "brake", frame })) };
    }
    if (bare) {
      const hat = (Art.witchHatSprite as (st: Style, o: object) => ReturnType<typeof Art.witchSprite> | null)(style, { look: mine.look });
      this.witchHatFrame = hat ? sprites.push(Art.bake(hat, wc, style, style.cOutline) as Baked) - 1 : -1;
      if (hat) grounds.push(null);
    } else this.witchGenome = genome;
    return { ...packAtlas(sprites, 2048), grounds };
  }
  /** The character creator changed her look: her frames again (the view swaps its batch). */
  rebakeWitch(genome: unknown): void { this.witch = this.bakeWitch(genome); this.bare = null; this.version++; }
  /** Her frames with her hat knocked off (rules/hat.ts), at the same places as `witch`'s, and her hat lying on the
   *  ground (`witchHatFrame`): baked the first time they're asked for (the view asks once the game is up). */
  witchBare(): Atlas { return (this.bare ??= this.bakeWitch(this.witchGenome, true)); }
  private bare: Atlas | null = null;
  /** The hat on the ground in witchBare()'s atlas (-1: she has none). */
  witchHatFrame = -1;

  /** A party witch's art (#37: her look from partyWitch(seed), or seed null for our witch's own),
   *  or undefined (and asked for). Looks repeat after a few, so there are only so many to draw. */
  partyWitchArt(seed: number | null): (PartyWitchArt & { atlas: Atlas }) | undefined {
    // (hers keyed by her genome, so a new look is drawn afresh, never a cached old one)
    const id = seed === null ? `her-${hashText(JSON.stringify(this.witchGenome))}` : `pw-${seed}`, a = this.partyWitches.get(id);
    // (urgent: they dance at home, in view from the start, so not behind every area type's prefetch)
    if (!a) this.ask({ kind: "partyWitch", id, seed, style: this.style, genome: seed === null ? this.witchGenome : undefined }, true);
    return a;
  }
  /** Ask for a set ahead of need, without using it. */
  prefetchType(t: number): void { if (!this.types.has(t)) this.ask({ kind: "type", id: t, style: this.style, seed: this.seed, K: this.K }); }

  get pending(): number { return this.inFlight.size; }

  /** Without workers: draw waiting sets on the page until `budgetMs` has passed (at least one). */
  work(budgetMs: number): void {
    if (this.useWorkers) return;
    const t0 = performance.now();
    let made = 0;
    while (this.queue.length && (made === 0 || performance.now() - t0 < budgetMs)) {
      const job = this.queue.shift()!;
      const t1 = performance.now(), result = runJob(job, (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; });
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
