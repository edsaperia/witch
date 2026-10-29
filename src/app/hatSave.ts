// Her hats (Ed, 2026-10-23: only the plain hat is hers at first; every spell hat is found, one a night, rules/finds.ts), kept on
// this browser (localStorage witch.hats): the spell hats she has found. Everyone starts over with the plain hat (Ed: "everyone
// starts over"): the hats a browser had before (every one, free for testing) aren't carried. Storage blocked: this run only.
import { HAT_FINDS } from "../rules/finds";
import { newWitch } from "./defaultLook";

export const HATS_KEY = "witch.hats";
type Store = Pick<Storage, "getItem" | "setItem">;
const storeOf = (s?: Store | null): Store | null => { try { return s ?? globalThis.localStorage ?? null; } catch { return null; } };

/** The spell hats she has found (known ones only). */
export function loadHats(storage?: Store | null): string[] {
  if (newWitch()) return []; // (?newWitch=1: app/defaultLook.ts)
  try { const o = JSON.parse(storeOf(storage)?.getItem(HATS_KEY) ?? "[]"); return Array.isArray(o) ? HAT_FINDS.filter(id => o.includes(id)) : []; } catch { return []; }
}
/** A hat found (the "found" event of a hat): hers for good. */
export function hatFound(id: string, storage?: Store | null): string[] {
  const hats = loadHats(storage);
  if (HAT_FINDS.includes(id) && !hats.includes(id)) hats.push(id);
  if (!newWitch()) try { storeOf(storage)?.setItem(HATS_KEY, JSON.stringify([...hats].sort())); } catch { /* storage blocked: this run only */ }
  return loadHats(storage);
}
/** This load's hats: ?hats=all (every one) or ?hats=a,b for one load (tools, links), else her save; the hat she'd wear (?hat=)
 *  counts as hers. As the tuning's spells.hats: "*" every one, else a comma list. */
export function hatsFrom(params: URLSearchParams, wear: string, storage?: Store | null): string {
  const p = params.get("hats");
  if (p === "all" || p === "*") return "*";
  const own = p !== null ? HAT_FINDS.filter(id => p.split(",").includes(id)) : loadHats(storage);
  if (params.get("hat") !== null && HAT_FINDS.includes(wear) && !own.includes(wear)) own.push(wear); // (?hat=: worn, so hers, for one load)
  return own.join(",");
}
