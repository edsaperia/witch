// The art bake's page (tools/prebake/bake.mjs opens it in headless Chromium, served by Vite with the game's own config): lists every
// set the art workers can be asked for that depends on nothing chosen in play, by asking the game's own AssetLibrary for each island
// of the first world (render/islandNeeds.ts askIslandArt, as View.prepare does) with its ask recorded instead of sent, then draws
// the sets in the game's own art workers (render/artWorker.ts, no cache key: drawn) and posts each result's bytes
// (render/artBaked.ts encodeResult) to the bake's server.
import { AssetLibrary } from "../../src/render/assets";
import { islandArtSeed } from "../../src/render/artCache";
import { bakedName, encodeResult } from "../../src/render/artBaked";
import type { ArtJob, ArtResult } from "../../src/render/artBuild";
import { askIslandArt } from "../../src/render/islandNeeds";
import { tuningFromLink } from "../../src/app/linkParams";
import { gameStyle, styleFromLink } from "../../src/app/viewParams";
import { AREA_KINDS, homeKinds, islandOf, playableIsland, REAL_KINDS } from "../../src/rules/rosters";
import { AREA_TYPES, HOME_LOOK } from "../../src/rules/map";
import { biomeKey } from "../../src/rules/lakeLooks";

/** One set to bake: its cache key, its file's name, the job, what it's for (`cat`), and the islands (of world 0) that ask for it on
 *  a first visit (`first`) or at all over a campaign (`islands`). */
export interface Entry { key: string; name: string; job: ArtJob; kind: string; cat: string; islands: string[]; first: string[] }

const CATS: Record<string, string> = { type: "trees", creature: "plain", woken: "woken", glide: "glide", sleep: "legend mounds", beachEdge: "coast", beach: "coast", lakeShore: "lakes", decor: "decor", pathPieces: "paths", relics: "props", scenes: "props", speakers: "props", partyObjects: "props", props: "props", soundsystems: "house", treehouse: "house" };
const catOf = (j: ArtJob): string => j.kind === "nap" ? ((j as { idle?: boolean }).idle ? "idle" : "nap") : j.kind === "rig" ? (j.level === 3 ? "legend rig" : "rig pages") : CATS[j.kind] ?? j.kind;

/** Kinds asked for that hang on what's chosen in play (her genome, a party animal's gear, a night's map): never baked. */
const RUNTIME = new Set(["witch", "hat", "partyWitch", "party", "face", "soundsystem", "stump", "stumps", "stones", "housePiece", "workshopPic", "find", "sea", "disco"]);

async function enumerate(): Promise<{ entries: Entry[]; skipped: Record<string, number>; style: string }> {
  const params = new URLSearchParams(), { tuning } = tuningFromLink(params), style = gameStyle(styleFromLink(params, tuning), tuning);
  const byKey = new Map<string, Entry>(), skipped: Record<string, number> = {};
  let island = "", first = false;
  const proto = AssetLibrary.prototype as unknown as { ask(job: ArtJob): void };
  const ask = proto.ask;
  proto.ask = function (this: { cacheKey(j: ArtJob): string | null }, job: ArtJob) {
    if (RUNTIME.has(job.kind)) { skipped[job.kind] = (skipped[job.kind] ?? 0) + 1; return; }
    const key = this.cacheKey(job);
    if (!key) { skipped[job.kind + " (no key)"] = (skipped[job.kind + " (no key)"] ?? 0) + 1; return; }
    let e = byKey.get(key);
    if (!e) byKey.set(key, e = { key, name: "", job, kind: job.kind, cat: catOf(job), islands: [], first: [] });
    if (island && !e.islands.includes(island)) e.islands.push(island);
    if (island && first && !e.first.includes(island)) e.first.push(island);
  };
  const W = (globalThis as { Worker?: unknown }).Worker;
  (globalThis as { Worker?: unknown }).Worker = undefined; // (no workers for the recording library: nothing drawn)
  let lib: AssetLibrary;
  try {
    lib = new AssetLibrary(style, 0, tuning.pixelSize, null, "home", []);
  } finally { (globalThis as { Worker?: unknown }).Worker = W; }
  lib.stoneScale = tuning.runeMarkers.scale; lib.crownShare = tuning.trunkFade.crownShare; lib.expressions = tuning.looks?.expressions === true;
  const typeOf = (k: string) => AREA_TYPES.findIndex(a => a.creature === k);
  const looks = { legendNap: !!tuning.wildLegends.seen?.nap, coast: true, beachDecor: !!tuning.beach?.decor?.on, lakes: true };
  const visit = (id: string, kinds: string[], legends: string[]) => {
    island = id;
    lib.typeSeed = islandArtSeed(0, id); lib.typeBiome = biomeKey(id, 0, tuning.biomeLooks);
    const types = [HOME_LOOK, ...kinds.map(typeOf).filter(t => t >= 0)];
    askIslandArt(lib, { types, kinds, legends }, looks);
    lib.decorArt(); lib.relicArt(); lib.sceneArt(); lib.speakerArt(); lib.pathPieceArt(); lib.partyObjectArt();
  };
  // A first visit: the island's roster (its area types' kinds, its challenge pack the same) and its legends (dealt from its roster,
  // never its own kind, though its legend rig page is asked for all the same); home: its ten starting kinds (five a night) and any as legends.
  first = true;
  const start = homeKinds().filter(k => AREA_KINDS.has(k));
  visit("home", start, start);
  for (const k of REAL_KINDS) {
    if (!playableIsland(k) || !AREA_KINDS.has(k)) continue;
    const isl = islandOf(k, 0);
    if (!isl) continue;
    const kinds = isl.roster.map(r => r.kind);
    visit(k, kinds, kinds); // (its own kind among them: a real first visit to fox asked for its level-3 rig page too)
  }
  // Later in a campaign: home with every island found (one area each kind), the start's own sets (the treehouse, props).
  first = false;
  const every = REAL_KINDS.filter(k => AREA_KINDS.has(k));
  visit("home", every, every);
  island = "";
  proto.ask = ask;
  const entries = [...byKey.values()];
  for (const e of entries) {
    e.name = await bakedName(e.key);
    if (!e.islands.length) { e.islands = ["*"]; e.first = ["*"]; } // (the start's own: every island's first visit)
  }
  return { entries, skipped, style: JSON.stringify(style) };
}

let listed: Entry[] = [];
const newWorker = () => new Worker(new URL("../../src/render/artWorker.ts", import.meta.url), { type: "module" });
/** The art workers, kept from one batch to the next (each new one loads the drawing modules from Vite's server again). */
const pool: Worker[] = [];
/** Draw `which` (indices into the list) in `n` art workers, posting each to the bake's server; resolves with each one's time. A
 *  worker whose drawing modules failed to load (Vite's server, busy, now and then drops a load; the worker keeps the failed
 *  import: render/artWorker.ts `drawing`) is replaced and its job tried again, up to three times. */
async function bake(which: number[], n: number): Promise<{ i: number; ms: number; error?: string }[]> {
  const out: { i: number; ms: number; error?: string }[] = [], queue = [...which];
  const one = async (slot: number): Promise<void> => {
    for (let i = queue.shift(); i !== undefined; i = queue.shift()) {
      const e = listed[i];
      let r: { result?: ArtResult; error?: string; ms?: number } = {};
      for (let tries = 0; tries < 3; tries++) {
        const w = pool[slot];
        r = await new Promise(res => { w.onmessage = m => res(m.data); w.onerror = m => res({ error: String(m.message) }); w.postMessage(e.job); });
        if (r.result || !/import|fetch/i.test(r.error ?? "")) break;
        w.terminate(); pool[slot] = newWorker();
      }
      if (!r.result) { out.push({ i, ms: 0, error: r.error ?? "no result" }); continue; }
      const bytes = encodeResult(r.result);
      const ok = await fetch(`/__prebake/put?name=${e.name}&i=${i}&ms=${Math.round(r.ms ?? 0)}`, { method: "POST", body: bytes as BodyInit }).then(x => x.ok, () => false);
      out.push({ i, ms: r.ms ?? 0, ...(ok ? {} : { error: "not saved" }) });
    }
  };
  if (!pool.length) {
    await import("../../src/render/artBuild"); // (loaded once on the page first: Vite's server answers the workers' first loads from what it has transformed)
    for (let k = 0; k < Math.max(1, n); k++) pool.push(newWorker());
  }
  await Promise.all(pool.map((_, k) => one(k)));
  return out;
}

(window as unknown as { prebake: unknown }).prebake = {
  async enumerate() { const r = await enumerate(); listed = r.entries; return { entries: r.entries.map(({ job: _job, ...e }) => e), skipped: r.skipped, style: r.style }; },
  bake,
  /** Sets a real first visit asked for that the listing doesn't reach (tools/prebake/coverage.cjs EXTRA), for `island`. */
  async addExtra(list: { key: string; job: ArtJob }[], island: string) {
    const added: Omit<Entry, "job">[] = [];
    for (const { key, job } of list) {
      let e = listed.find(x => x.key === key);
      if (!e) { listed.push(e = { key, name: await bakedName(key), job, kind: job.kind, cat: "recorded " + job.kind, islands: [], first: [] }); }
      if (!e.islands.includes(island)) { e.islands.push(island); e.first.push(island); }
      const { job: _j, ...rest } = e; added.push(rest);
    }
    return listed.map(({ job: _job, ...e }) => e);
  },
  /** One entry's job (the pixel check redraws it). */
  job: (i: number) => listed[i].job,
};
(window as unknown as { prebakeReady: boolean }).prebakeReady = true;
