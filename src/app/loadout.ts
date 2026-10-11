// Her hat and broom spells (Ed, 2026-10-11; rules/spells.ts): chosen in the creator's Hat and Broom boxes and kept on this
// browser (localStorage witch.loadout) for next time; ?hat= and ?broom= choose them for one load (tests, links). Unknown or not
// yet built spells are none. Storage blocked: this run only.
import { broomOf, hatOf, type BroomSpellId, type HatSpellId } from "../rules/spells";

export const LOADOUT_KEY = "witch.loadout";
export interface Loadout { hat: HatSpellId; broom: BroomSpellId }
type Store = Pick<Storage, "getItem" | "setItem">;
const storeOf = (s?: Store | null): Store | null => { try { return s ?? globalThis.localStorage ?? null; } catch { return null; } };

export function loadLoadout(storage?: Store | null): Loadout {
  try {
    const o = JSON.parse(storeOf(storage)?.getItem(LOADOUT_KEY) ?? "{}") as Partial<Record<keyof Loadout, string>>;
    return { hat: hatOf(o.hat), broom: broomOf(o.broom) };
  } catch { return { hat: "none", broom: "none" }; }
}

export function saveLoadout(l: Loadout, storage?: Store | null): void {
  try { storeOf(storage)?.setItem(LOADOUT_KEY, JSON.stringify(l)); } catch { /* storage blocked: this run only */ }
}

/** This load's loadout: ?hat= and ?broom= over the saved one. */
export function loadoutFrom(params: URLSearchParams, storage?: Store | null): Loadout {
  const saved = loadLoadout(storage), hat = params.get("hat"), broom = params.get("broom");
  return { hat: hat !== null ? hatOf(hat) : saved.hat, broom: broom !== null ? broomOf(broom) : saved.broom };
}
