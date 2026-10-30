import { slotStorage } from "./saveSlots";
// Her hat's spell (Ed, 2026-10-11; rules/spells.ts): chosen in the creator's Hat box and kept on this browser (localStorage
// witch.loadout) for next time; ?hat= chooses it for one load (tests, links). Unknown or not yet built spells are none. Storage
// blocked: this run only. Her broom's spell isn't chosen or kept here (the Workshop, Ed 2026-10-23): it's the set her broom's parts
// complete, fitted at the bay and kept with them in app/broomSave.ts; ?parts= fits any parts for one load (?broom= is gone).
import { hatOf, type HatSpellId } from "../rules/spells";
import { newWitch } from "./defaultLook";

export const LOADOUT_KEY = "witch.loadout";
export interface Loadout { hat: HatSpellId }
type Store = Pick<Storage, "getItem" | "setItem">;
const storeOf = (s?: Store | null): Store | null => { try { return s ?? slotStorage ?? null; } catch { return null; } };

export function loadLoadout(storage?: Store | null): Loadout {
  if (newWitch()) return { hat: "none" }; // (?newWitch=1: app/defaultLook.ts)
  try {
    const o = JSON.parse(storeOf(storage)?.getItem(LOADOUT_KEY) ?? "{}") as Partial<Record<keyof Loadout, string>>;
    return { hat: hatOf(o.hat) }; // (a saved broom spell dropped: app/broomSave.ts migrateBroom)
  } catch { return { hat: "none" }; }
}

export function saveLoadout(l: Loadout, storage?: Store | null): void {
  if (newWitch()) return;
  try { storeOf(storage)?.setItem(LOADOUT_KEY, JSON.stringify({ hat: l.hat })); } catch { /* storage blocked: this run only */ }
}

/** This load's loadout: ?hat= over the saved one. */
export function loadoutFrom(params: URLSearchParams, storage?: Store | null): Loadout {
  const saved = loadLoadout(storage), hat = params.get("hat");
  return { hat: hat !== null ? hatOf(hat) : saved.hat };
}
