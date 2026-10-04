// The game's sprites, drawn by the art module (art/generator.js) from the style: one atlas per
// area type (its trees, as top and bottom halves, and its bushes) and one per kind of creature.
// Sets are asked for as the witch nears them and drawn by a few Web Workers in the background;
// where workers or OffscreenCanvas are missing, they are drawn on the page, one per frame.
import * as Art from "../../art/generator.js";
import { rng } from "../rules/random";
import { atlasFromPixels, packAtlas, type Atlas, type Baked } from "./atlas";
import { creatureFrame, runJob, type ArtJob, type ArtResult, type DecorPiece, type PathPieceArt, type RelicArt, type RelicLayouts, type TilePixels, type TypeLayout } from "./artBuild";
import type { Style } from "./style";

export interface TypeArt {
  atlas: Atlas; layout: TypeLayout;
  /** For each tree's bottom-half frame: where its trunk was cut from the crown, as a share of the
   *  frame's height from its top (the trunk fades out below it in ground mode, Ed v149). */
  cut: Map<number, number>;
}
export interface RelicSet { atlas: Atlas; byId: Record<string, RelicArt>; modern: RelicArt[]; layouts: RelicLayouts }
export interface DecorArt { atlas: Atlas; pieces: DecorPiece[]; families: Record<string, DecorPiece[]> }
export interface CreatureArt { atlas: Atlas; frame: (level: number, frame: number, away?: boolean) => number }

type Reply = { job: ArtJob; result?: ArtResult; error?: string };

export class AssetLibrary {
  private types = new Map<number, TypeArt>();
  private creatures = new Map<string, CreatureArt>();
  private decor: DecorArt | undefined;
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
  readonly stones: Atlas;
  /** Light-source props from the art module: campfire (frames 0-2), then magic stones (cyan, violet, green). */
  readonly props: Atlas;
  /** Soundsystems: variant x 3 + frame (the cones pumping), playing. */
  readonly soundsystems: Atlas;
  /** The witch's treehouse: its base (frame 0) and top (frame 1, the crown: treetop mode), and
   *  anchors in its sprite's pixels: the trunk's foot, her seat on the terrace, its lights. */
  readonly treehouse: { atlas: Atlas; base: { x: number; y: number }; seat: { x: number; y: number }; lights: { x: number; y: number; rgb: number[]; kind: string }[] };
  /** Style scale: the lab's K, 2 / pixel size. */
  readonly K: number;
  /** Bumped whenever a new set is ready, so the view knows to refresh its batches. */
  version = 0;
  /** Called with an area type's floor tile when its set is ready. */
  onFloor: (type: number, tile: TilePixels) => void = () => {};

  constructor(readonly style: Style, readonly seed: number, pixelSize: number) {
    this.K = 2 / pixelSize;
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
    this.witch = packAtlas(sprites, 2048);
    this.stones = packAtlas([0, 1, 2, 3].map(i => this.stone(i)));
    const lp = Art.lightProps(style) as { campfire: Baked[]; stones: Record<string, Baked> };
    this.props = packAtlas([...lp.campfire, lp.stones.cyan, lp.stones.violet, lp.stones.green], 1024);
    const ss: Baked[] = [];
    for (let v = 0; v < 3; v++) for (let f = 0; f < 3; f++) ss.push(Art.bake(Art.soundsystemSprite(style, { variant: v, frame: f, state: "playing" }), Art.soundsystemColours(v), style, style.cOutline) as Baked);
    this.soundsystems = packAtlas(ss, 2048);
    const th = Art.treehouseSprite(style) as { bot: unknown; top: unknown; anchors: { base: { x: number; y: number }; seat: { x: number; y: number }; lights: { x: number; y: number; rgb: number[]; kind: string }[] } };
    const thc = Art.treehouseColours(style);
    // Its model draws a hard dark shadow ellipse on the ground round the trunk's foot: drop it (a
    // soft contact shadow goes there instead), as Ed asked for set pieces.
    for (const sp of [th.bot, th.top] as { w: number; h: number; m: Uint8Array }[])
      for (let y = Math.max(0, Math.floor(th.anchors.base.y - 14)); y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x] === Art.M.NOSE) sp.m[y * sp.w + x] = 0;
    this.treehouse = { atlas: packAtlas([th.bot, th.top].map(sp => Art.bake(sp, thc, style, "none") as Baked), 2048), ...th.anchors };
    this.useWorkers = typeof Worker !== "undefined" && typeof OffscreenCanvas !== "undefined";
    if (this.useWorkers) {
      const n = Math.max(1, Math.min(3, (navigator.hardwareConcurrency || 2) - 1));
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

  private stone(i: number): Baked {
    const r = rng(this.seed * 3 + i), w = 5 + Math.floor(r() * 3), h = 7 + Math.floor(r() * 5), sp = new Art.Sprite(w + 2, h + 1);
    sp.ellipse((w + 2) / 2, h / 2 + 1, w / 2, h / 2 + 0.5, Art.M.BODY, { round: this.style.round });
    sp.ellipse((w + 2) / 2 - 1, h / 2, w / 3, h / 3, Art.M.BODY2, { round: this.style.round, onlyOn: new Set([Art.M.BODY]), density: 0.5, seed: i });
    return Art.bake(sp, { [Art.M.BODY]: [178, 174, 162], [Art.M.BODY2]: [140, 138, 130] }, this.style, "dark") as Baked;
  }

  private key = (j: ArtJob) => j.kind + ":" + j.id;
  private ask(job: ArtJob): void {
    const k = this.key(job);
    if (this.inFlight.has(k)) return;
    this.inFlight.add(k);
    this.queue.push(job);
    this.dispatch();
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
    const atlas = atlasFromPixels(r.result.px);
    if (r.job.kind === "relics") {
      const list = r.result.relics!;
      this.relicSet = { atlas, byId: Object.fromEntries(list.map(p => [p.id, p])), modern: list.filter(p => p.family === "modern"), layouts: r.result.layouts! };
    } else if (r.job.kind === "pathPieces") {
      this.pieces = { atlas, byId: Object.fromEntries(r.result.pieces!.map(p => [p.id, p])) };
    } else if (r.job.kind === "decor") {
      const pieces = r.result.decor!, families: Record<string, DecorPiece[]> = {};
      for (const p of pieces) (families[p.family] ??= []).push(p);
      this.decor = { atlas, pieces, families };
    } else if (r.job.kind === "type") {
      // Each tree's cut: the lowest drawn row of its top half (both halves share the frame's box).
      const px = r.result.px, cut = new Map<number, number>();
      for (const p of r.result.layout!.big) {
        if (p.top === null) continue;
        const f = px.frames[p.top], x0 = Math.round(f.uv[0] * px.width), y0 = Math.round(f.uv[1] * px.height);
        let row = -1;
        for (let y = f.h - 1; y >= 0 && row < 0; y--) for (let x = 0; x < f.w; x++) if (px.albedo[((y0 + y) * px.width + x0 + x) * 4 + 3] > 0) { row = y; break; }
        if (row >= 0) cut.set(p.bot, (row + 1) / f.h);
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
    if (!a) this.ask({ kind: "type", id: t, style: this.style, seed: this.seed, K: this.K });
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
  /** An invited creature's party look (its gear seeded by its id), or undefined (and asked for). */
  partyArt(species: string, id: number, colour: number[]): CreatureArt | undefined {
    const k = `party-${id}`, a = this.creatures.get(k);
    if (!a) this.ask({ kind: "party", id: k, species, seed: id, colour, style: this.style });
    return a;
  }
  /** Ask for a set ahead of need, without using it. */
  prefetchType(t: number): void { if (!this.types.has(t)) this.typeArt(t); }

  get pending(): number { return this.inFlight.size; }

  /** Without workers: draw waiting sets on the page until `budgetMs` has passed (at least one). */
  work(budgetMs: number): void {
    if (this.useWorkers) return;
    const t0 = performance.now();
    let made = 0;
    while (this.queue.length && (made === 0 || performance.now() - t0 < budgetMs)) {
      const job = this.queue.shift()!;
      this.receive({ job, result: runJob(job, (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; }) });
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
