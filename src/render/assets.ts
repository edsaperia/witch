// The game's sprites, drawn by the art module (art/generator.js) from the style: one atlas per
// area type (its trees, as top and bottom halves, and its bushes) and one per kind of creature.
// Sets are asked for as the witch nears them and drawn by a few Web Workers in the background;
// where workers or OffscreenCanvas are missing, they are drawn on the page, one per frame.
import * as Art from "../../art/generator.js";
import { atlasFromPixels, packAtlas, type Atlas, type Baked } from "./atlas";
import { creatureFrame, runJob, type ArtJob, type ArtResult, type DecorPiece, type PartyWitchArt, type PartyArt, type PathPieceArt, type RelicArt, type RelicLayouts, type SceneArt, type SpeakerArt, type TilePixels, type TypeLayout } from "./artBuild";
import type { Style } from "./style";
import { ART_HASH, cacheGet, cachePut, hashText } from "./artCache";

export interface TypeArt {
  atlas: Atlas; layout: TypeLayout;
  /** For each tree's bottom-half frame: where its trunk was cut from the crown, as a share of the
   *  frame's height from its top (the trunk fades out below it in ground mode, Ed v149). */
  cut: Map<number, number>;
}
export interface RelicSet { atlas: Atlas; byId: Record<string, RelicArt>; modern: RelicArt[]; layouts: RelicLayouts }
export interface DecorArt { atlas: Atlas; pieces: DecorPiece[]; families: Record<string, DecorPiece[]> }
export interface CreatureArt { atlas: Atlas; frame: (level: number, frame: number, away?: boolean) => number }

type Reply = { job: ArtJob; result?: ArtResult; error?: string; ms?: number; cached?: boolean };

export class AssetLibrary {
  private types = new Map<number, TypeArt>();
  private creatures = new Map<string, CreatureArt>();
  private partyWitches = new Map<string, PartyWitchArt & { atlas: Atlas }>();
  private party: (PartyArt & { atlas: Atlas }) | undefined;
  private decor: DecorArt | undefined;
  private speakers: (SpeakerArt & { atlas: Atlas }) | undefined;
  private scenes: (SceneArt & { atlas: Atlas }) | undefined;
  private pieces: { atlas: Atlas; byId: Record<string, PathPieceArt> } | undefined;
  private relicSet: RelicSet | undefined;
  private queue: ArtJob[] = [];
  private inFlight = new Set<string>();
  private workers: { w: Worker; busy: boolean; job?: ArtJob }[] = [];
  private useWorkers: boolean;
  readonly witch: Atlas;
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

  constructor(readonly style: Style, readonly seed: number, pixelSize: number) {
    this.K = 2 / pixelSize;
    this.styleHash = hashText(JSON.stringify(style));
    // The witch: hover frames 0-2 towards, 3-5 away, then leaning towards (6) and away (7); then
    // rising (8-9 towards, 10-11 away) and descending (12-13 towards, 14-15 away), two frames each.
    const wc = Art.witchColours(style), wb = (o: object) => Art.bake(Art.witchSprite(style, o), wc, style, style.cOutline) as Baked;
    const sprites = [0, 1, 2].map(frame => wb({ frame })).concat([0, 1, 2].map(frame => wb({ frame, facing: "away" })), [wb({ lean: true }), wb({ lean: true, facing: "away" })],
      ...["rise", "descend"].flatMap(pose => ["towards", "away"].flatMap(facing => [0, 1].map(frame => wb({ pose, frame, facing })))));
    // On foot, from 16: standing, landing, taking off, talking, putting a sigil down, lifting one.
    const FOOT = Art.WITCH_FOOT_POSES as Record<string, { frames: number; fps: number }>;
    for (const pose of ["stand", "land", "takeoff", "talk", "placeSigil", "liftSigil", "sit"]) {
      const n = FOOT[pose].frames, entry = { towards: [] as number[], away: [] as number[], fps: FOOT[pose].fps };
      for (const facing of ["towards", "away"] as const) for (let frame = 0; frame < n; frame++) { entry[facing].push(sprites.length); sprites.push(wb({ pose, frame, facing })); }
      this.witchFoot[pose] = entry;
    }
    // Treetop flight: fast (at boost: three frames) and brake (a skid: two frames), towards and away.
    for (const [pose, n] of [["fast", 3], ["brake", 2]] as const) {
      const entry = { towards: [] as number[], away: [] as number[], fps: pose === "fast" ? 10 : 8 };
      for (const facing of ["towards", "away"] as const) for (let frame = 0; frame < n; frame++) { entry[facing].push(sprites.length); sprites.push(wb({ pose, frame, facing })); }
      this.witchFly[pose] = entry;
    }
    for (const facing of ["towards", "away"] as const) for (let frame = 0; frame < 4; frame++) { this.witchLean[facing].push(sprites.length); sprites.push(wb({ pose: "lean", frame, facing })); }
    for (const [h, heading] of [["up", "away"], ["down", "towards"]] as const) {
      const at = (o: object) => sprites.push(wb({ ...o, heading })) - 1;
      this.witchHeading[h] = { hover: [0, 1, 2].map(frame => at({ frame })), lean: at({ lean: true }), leanCycle: [0, 1, 2, 3].map(frame => at({ pose: "lean", frame })), fast: [0, 1, 2].map(frame => at({ pose: "fast", frame })), brake: [0, 1].map(frame => at({ pose: "brake", frame })) };
    }
    this.witch = packAtlas(sprites, 2048);
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
  private cacheKey = (j: ArtJob) => j.kind === "party" ? null : [ART_HASH, this.styleHash, this.key(j), j.kind === "type" ? `${j.seed}|${j.K}` : ""].join("|");
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
    } else if (r.job.kind === "decor") {
      const pieces = r.result.decor!, families: Record<string, DecorPiece[]> = {};
      for (const p of pieces) (families[p.family] ??= []).push(p);
      this.decor = { atlas, pieces, families };
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
    } else this.creatures.set(r.job.id, { atlas, frame: creatureFrame });
    this.inFlight.delete(this.key(r.job));
    this.version++;
  }

  /** An area type's art, or undefined (and asked for) if it is not drawn yet. */
  typeArt(t: number): TypeArt | undefined {
    const a = this.types.get(t);
    if (!a) this.ask({ kind: "type", id: t, style: this.style, seed: this.seed, K: this.K }, true);
    return a;
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
  creatureArt(species: string): CreatureArt | undefined {
    const a = this.creatures.get(species);
    if (!a) this.ask({ kind: "creature", id: species, style: this.style });
    return a;
  }
  /** A creature's enraged look (a wave woke its area: red eyes), or undefined (and asked for). */
  wokenArt(species: string): CreatureArt | undefined {
    const k = `woken-${species}`, a = this.creatures.get(k);
    if (!a) this.ask({ kind: "woken", id: k, species, style: this.style });
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
  /** A party witch's art (#37: her look from partyWitch(seed), or seed null for our witch's own),
   *  or undefined (and asked for). Looks repeat after a few, so there are only so many to draw. */
  partyWitchArt(seed: number | null): (PartyWitchArt & { atlas: Atlas }) | undefined {
    const id = seed === null ? "her" : `pw-${seed}`, a = this.partyWitches.get(id);
    if (!a) this.ask({ kind: "partyWitch", id, seed, style: this.style });
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
