// The pause page's debug switch, "Unlock everything" (Ed, 2026-10-29: "I need a debug toggle to allow me to select anything (outfits,
// bags, brooms, islands) on the pause menu"): while it's on, every wardrobe item and bag (the shelves' own lists, config/wardrobe.json,
// so a new bag shows with no change here), every broom part, every spell hat and every island on the sea chart can be chosen, whatever
// she's found. It only widens what the pickers offer: her found sets (witch.owned, witch.broom's found, witch.hats, witch.chart's found)
// are never written from it, and the night's finds are drawn as ever. Kept on this browser (localStorage witch.debug.unlockAll, its own
// key, apart from every save) so it holds across the reload a sail makes; off by default. While it's on, a broom part or hat she hasn't
// found stays on her across loads; turned off, what she's wearing stays for the session, and from the next load the normal rules apply.
import { ITEMS } from "../rules/wardrobe";
import { PART_IDS } from "../rules/broomParts";

export const UNLOCK_KEY = "witch.debug.unlockAll";
type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">;
const storeOf = (s?: Store | null): Store | null => { try { return s ?? globalThis.localStorage ?? null; } catch { return null; } };

/** Whether the switch is on (off when storage is blocked or spoilt). */
export function unlockAll(storage?: Store | null): boolean {
  try { return storeOf(storage)?.getItem(UNLOCK_KEY) === "1"; } catch { return false; }
}
export function setUnlockAll(on: boolean, storage?: Store | null): void {
  try { const s = storeOf(storage); if (on) s?.setItem(UNLOCK_KEY, "1"); else s?.removeItem(UNLOCK_KEY); } catch { /* storage blocked */ }
}

/** The wardrobe items a station offers: hers, or with the switch on every item on every shelf (a new set: hers is never changed). */
export const ownedToChoose = (owned: ReadonlySet<string>, on = unlockAll()): Set<string> => on ? new Set([...owned, ...ITEMS.map(i => i.id)]) : new Set(owned);
/** The broom parts the Workshop offers: hers tonight, or with the switch on every part. */
export const partsToChoose = (found: ReadonlySet<string>, on = unlockAll()): Set<string> => on ? new Set([...found, ...PART_IDS]) : new Set(found);
