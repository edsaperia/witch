import { atlasFromPixels, type Atlas } from "./atlas";
import { hashText } from "./artCache";
import type { ArtResult } from "./artBuild";
import type { WitchArt } from "./homeArt";

export interface WitchLookLease {
  atlas: Atlas;
  idle: WitchArt["foot"];
  flight: WitchArt["fly"];
  hats: { frame: number };
  art: WitchArt;
  release(): void;
}
interface Look { atlas: Atlas; art: WitchArt }
interface Entry { json: string; refs: number; promise: Promise<Look>; look?: Look }
/** Private, bounded remote cache. No shared local-witch atlas or pose tables enter this pool. */
export function witchLookLeases(draw: (genome: unknown, hash: string) => Promise<ArtResult>, limit = 4, makeAtlas: (pixels: ArtResult["px"]) => Atlas = pixels => atlasFromPixels(pixels, "witch")) {
  const entries = new Map<string, Entry>();
  const discard = (key: string, entry: Entry) => {
    if (entry.refs || !entry.look) return;
    entry.look.atlas.albedo.dispose(); entry.look.atlas.normal.dispose(); entry.look = undefined;
    if (entries.get(key) === entry) entries.delete(key);
  };
  return {
    get size() { return entries.size; },
    lease(genome: unknown, signal?: AbortSignal): Promise<WitchLookLease> {
      if (signal?.aborted) return Promise.reject(new Error("Remote witch look cancelled."));
      let json: string;
      try { json = JSON.stringify(genome ?? null); if (json.length > 65536) throw new Error("Remote witch look is too large."); }
      catch (error) { return Promise.reject(error); }
      const key = hashText(json); let entry = entries.get(key);
      if (entry && entry.json !== json) return Promise.reject(new Error("Remote witch look hash collision."));
      if (!entry) {
        if (entries.size >= limit) return Promise.reject(new Error("Too many remote witch looks are in use."));
        const snapshot = JSON.parse(json);
        entry = { json, refs: 0, promise: Promise.resolve(null as never) }; entries.set(key, entry);
        const created = entry;
        created.promise = Promise.resolve().then(() => draw(snapshot, key)).then(result => {
          if (!result.ours) throw new Error("Remote witch drawing has no pose tables.");
          const art = structuredClone(result.ours), atlas = { ...makeAtlas(result.px), grounds: art.grounds };
          const look = { atlas, art }; created.look = look; discard(key, created); return look;
        }, error => { if (entries.get(key) === created) entries.delete(key); throw error; });
        void created.promise.catch(() => { if (entries.get(key) === created) entries.delete(key); });
      }
      const held = entry; held.refs++; let released = false;
      const release = () => { if (released) return; released = true; signal?.removeEventListener("abort", abort); held.refs--; discard(key, held); };
      let rejectAbort: (error: Error) => void = () => {};
      const abort = () => { release(); rejectAbort(new Error("Remote witch look cancelled.")); };
      const cancelled = new Promise<never>((_resolve, reject) => { rejectAbort = reject; signal?.addEventListener("abort", abort, { once: true }); });
      const lease = held.promise.then(look => {
        if (released) throw new Error("Remote witch look cancelled.");
        return { atlas: look.atlas, idle: look.art.foot, flight: look.art.fly, hats: { frame: look.art.hat }, art: look.art, release };
      }, error => { release(); throw error; });
      return Promise.race([lease, cancelled]);
    },
  };
}
