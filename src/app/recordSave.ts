// Her records (rules/records.ts; Ed, 2026-10-29: "each record ... is an item which the player will unlock. Start with 100 and
// 120."), kept on this browser (localStorage witch.records): the records she has found, and the one she last chose at her DJ
// booth (chosen there again when it opens). The starting records are always hers; with Unlock everything on (app/debugUnlock.ts)
// every one is offered, nothing written. Storage blocked: this run only.
import { RECORDS, RECORD_FINDS, START_RECORDS, recordById } from "../rules/records";
import { unlockAll } from "./debugUnlock";

export const RECORDS_KEY = "witch.records";
type Store = Pick<Storage, "getItem" | "setItem">;
const storeOf = (s?: Store | null): Store | null => { try { return s ?? globalThis.localStorage ?? null; } catch { return null; } };
interface Saved { found: string[]; last?: string }

function load(storage?: Store | null): Saved {
  try {
    const o = JSON.parse(storeOf(storage)?.getItem(RECORDS_KEY) ?? "{}") as Partial<Saved>;
    return { found: Array.isArray(o.found) ? RECORD_FINDS.filter(id => o.found!.includes(id)) : [], last: recordById(o.last)?.id };
  } catch { return { found: [] }; }
}
function save(s: Saved, storage?: Store | null): void { try { storeOf(storage)?.setItem(RECORDS_KEY, JSON.stringify({ found: [...s.found].sort(), last: s.last })); } catch { /* storage blocked: this run only */ } }

/** The records she has found (finds only, not the starting ones). */
export const foundRecords = (storage?: Store | null): string[] => load(storage).found;
/** The records she can play: the starting ones and those found (every one with Unlock everything on), slowest first. */
export function ownedRecords(storage?: Store | null): string[] {
  const own = new Set([...START_RECORDS, ...load(storage).found]);
  return RECORDS.filter(r => own.has(r.id) || unlockAll(storage as never)).map(r => r.id);
}
/** A record found (the "found" event): hers for good. */
export function recordFound(id: string, storage?: Store | null): void {
  const s = load(storage);
  if (RECORD_FINDS.includes(id) && !s.found.includes(id)) s.found.push(id);
  save(s, storage);
}
/** A record let go (the finds dev control). */
export function recordDropped(id: string, storage?: Store | null): void { const s = load(storage); s.found = s.found.filter(r => r !== id); if (s.last === id) s.last = undefined; save(s, storage); }
/** The record she last chose (if she still has it), else none. */
export function lastRecord(storage?: Store | null): string | null { const l = load(storage).last; return l && ownedRecords(storage).includes(l) ? l : null; }
/** The record she chose at the booth, remembered. */
export function chooseRecord(id: string, storage?: Store | null): void { if (!recordById(id)) return; const s = load(storage); s.last = id; save(s, storage); }
