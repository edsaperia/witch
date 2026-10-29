// The things she owns to wear (rules/wardrobe.ts), kept on this browser (localStorage witch.owned): a first game's starting set,
// and whatever she has found since. Only items: every colour is hers from the start.
import { ownedOf } from "../rules/wardrobe";
import { newWitch } from "./defaultLook";

const KEY = "witch.owned";

/** What she owns, with anything she's wearing in `g` counted as hers. */
export function loadOwned(g: Record<string, unknown> | null): Set<string> {
  let saved: string[] | null = null;
  if (!newWitch()) try { const raw = localStorage.getItem(KEY); if (raw) { const v = JSON.parse(raw); if (Array.isArray(v)) saved = v.filter(x => typeof x === "string"); } } catch { /* storage blocked or spoilt: the starting set */ }
  return ownedOf(saved, g);
}
export function saveOwned(own: Set<string>): void { if (newWitch()) return; try { localStorage.setItem(KEY, JSON.stringify([...own].sort())); } catch { /* storage blocked: this run only */ } }
