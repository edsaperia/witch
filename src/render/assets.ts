// The game's sprites, drawn by the art module (art/generator.js) from the style: one atlas per
// area type (its trees, as top and bottom halves, and its bushes) and one per kind of creature.
// Sets are asked for as the witch nears them and drawn by a few Web Workers in the background;
// where workers or OffscreenCanvas are missing, they are drawn on the page, one per frame.
import * as Art from "../../art/generator.js";
import { rng } from "../rules/random";
import { atlasFromPixels, packAtlas, type Atlas, type Baked } from "./atlas";
import { creatureFrame, runJob, type ArtJob, type ArtResult, type TilePixels, type TypeLayout } from "./artBuild";
import type { Style } from "./style";

export interface TypeArt { atlas: Atlas; layout: TypeLayout }
export interface CreatureArt { atlas: Atlas; frame: (level: number, frame: number) => number }

type Reply = { job: ArtJob; result?: ArtResult; error?: string };

export class AssetLibrary {
  private types = new Map<number, TypeArt>();
  private creatures = new Map<string, CreatureArt>();
  private queue: ArtJob[] = [];
  private inFlight = new Set<string>();
  private workers: { w: Worker; busy: boolean; job?: ArtJob }[] = [];
  private useWorkers: boolean;
  readonly witch: Atlas;
  readonly stones: Atlas;
  /** Style scale: the lab's K, 2 / pixel size. */
  readonly K: number;
  /** Bumped whenever a new set is ready, so the view knows to refresh its batches. */
  version = 0;
  /** Called with an area type's floor tile when its set is ready. */
  onFloor: (type: number, tile: TilePixels) => void = () => {};

  constructor(readonly style: Style, readonly seed: number, pixelSize: number) {
    this.K = 2 / pixelSize;
    this.witch = packAtlas([Art.bake(Art.witchSprite(), Art.witchColours(style), style, "dark") as Baked]);
    this.stones = packAtlas([0, 1, 2, 3].map(i => this.stone(i)));
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
    if (r.job.kind === "type") {
      this.types.set(r.job.id, { atlas, layout: r.result.layout! });
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
  creatureArt(species: string): CreatureArt | undefined {
    const a = this.creatures.get(species);
    if (!a) this.ask({ kind: "creature", id: species, style: this.style });
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
