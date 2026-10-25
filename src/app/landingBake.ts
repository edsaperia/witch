// The landing's art drawn ahead (Ed, 2026-10-12, on sailing to an island: "This part of the transition is long"): most of the
// wait behind the chart's last frame was the island's area types' trees, drawn fresh on every landing because each night has a
// new seed (rules/rosters.ts: what's inside an island changes each night). So the chart chooses the night's seed as soon as an
// island is chosen, and while she looks at it and flies in, art workers draw that island's area types with it and keep them in
// the art cache (render/artCache.ts), under the keys the game's own art asks for (render/assets.ts); the game, loaded with that
// seed (&seed=), finds them kept. What isn't done by the time she lands the game draws as before.
import type { ArtJob, ArtResult } from "../render/artBuild";
import { artCacheKey, hashText, islandArtSeed } from "../render/artCache";
import { biomeKey, type BiomeLooks } from "../rules/lakeLooks";
import { AREA_TYPES, HOME_LOOK } from "../rules/map";
import { homeIsland, islandOf, knownKinds } from "../rules/rosters";
import { loadSave } from "./chartSave";
import { tuningFromLink } from "./linkParams";
import { gameStyle, styleFromLink } from "./viewParams";

/** A night's seed, as the game picks one when its link has none (main.ts). */
export const nightSeed = (): number => Math.floor(Math.random() * 1000000);

/** The area types an island's night will ask for, the most needed first: home's meadow (where she lands), then the island's
 *  own kind, then the rest of its roster by how many areas each has. */
export function landingTypes(island: string, world: number): number[] {
  const isl = island === "home" ? homeIsland(world, knownKinds(loadSave().found)) : islandOf(island, world);
  const typeOf = (k: string) => AREA_TYPES.findIndex(a => a.creature === k);
  const roster = [...(isl?.roster ?? [])].sort((a, b) => +(b.kind === island) - +(a.kind === island) || b.areas - a.areas);
  return [...new Set([HOME_LOOK, ...roster.map(r => typeOf(r.kind)).filter(t => t >= 0)])];
}

/** The game's link for that night, as the chart sails to it (the art's style and scale come from it as the game's do). */
const linkFor = (island: string, world: number | undefined, seed: number) => new URLSearchParams({ island, seed: String(seed), ...(world != null ? { world: String(world) } : {}) });

export interface LandingBake {
  /** The night's seed the art is drawn with: sail with it (&seed=). */
  readonly seed: number;
  /** Sets drawn and kept so far, and those already kept before. */
  readonly made: number; readonly kept: number;
  /** Stop drawing (another island chosen, or the chart closed). */
  stop(): void;
  /** Wait for what's been drawn to be written to the cache (at most `ms`), before the page goes. */
  settle(ms?: number): Promise<void>;
}

/** The sets drawn ahead for a landing on `island` for night `seed`: its area types (landingTypes) under the island's own seed first
 *  (kept for every night: what the game draws at once, render/artCache.ts islandArtSeed), then under the night's (swapped in
 *  unseen as she lands, main.ts revealArt). */
export function landingJobs(island: string, world: number, seed: number, style: ArtJob["style"], K: number, looks?: BiomeLooks): ArtJob[] {
  const types = landingTypes(island, world), own = islandArtSeed(world, island), biome = biomeKey(island, world, looks); // (biome: its forests' look, as the view asks: render/view.ts)
  return [...types.map(t => ({ kind: "type", id: t, style, seed: own, K, biome }) as ArtJob), ...types.map(t => ({ kind: "type", id: t, style, seed, K, biome }) as ArtJob)];
}

/** Draw island `island`'s area types for night `seed` (world `world`, or the save's) ahead, in workers, into the art cache. */
export function bakeLanding(island: string, world: number | undefined, seed = nightSeed()): LandingBake {
  const params = linkFor(island, world, seed), tuning = tuningFromLink(params).tuning, w = world ?? loadSave().world;
  const style = gameStyle(styleFromLink(params, tuning), tuning), styleHash = hashText(JSON.stringify(style)), K = 2 / tuning.pixelSize;
  const jobs = landingJobs(island, w, seed, style, K, tuning.biomeLooks); // (a set kept before comes back at once)
  let stopped = false;
  const workers: Worker[] = [];
  const state = {
    seed, made: 0, kept: 0,
    stop() { stopped = true; for (const wk of workers) wk.terminate(); workers.length = 0; },
    async settle() { /* (each set is written by its worker before it's reported made: nothing to wait for) */ },
  };
  if (typeof Worker === "undefined" || typeof OffscreenCanvas === "undefined") return state;
  // (as many workers as the game's art: one per core but the page's own, up to six)
  const n = Math.max(1, Math.min(6, (navigator.hardwareConcurrency || 2) - 1, jobs.length));
  const next = async (wk: Worker): Promise<void> => {
    while (!stopped) {
      const job = jobs.shift();
      if (!job) { wk.terminate(); return; }
      const key = artCacheKey(job, styleHash)!;
      // (the worker keeps the cache: a set kept before comes back `cached` at once, a new one is written before it's sent)
      const r = await new Promise<{ result?: ArtResult; cached?: boolean } | null>(res => { wk.onmessage = e => res(e.data); wk.onerror = () => res(null); wk.postMessage({ ...job, cacheKey: key }); });
      if (!r?.result) { wk.terminate(); return; } // (no worker drawing here: the game draws it)
      if (r.cached) state.kept++; else state.made++;
    }
  };
  try {
    for (let i = 0; i < n; i++) { const wk = new Worker(new URL("../render/artWorker.ts", import.meta.url), { type: "module" }); workers.push(wk); void next(wk); }
  } catch { /* no module workers: the game draws them */ }
  return state;
}
