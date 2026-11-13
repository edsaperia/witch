// Her broom's parts (the Workshop, Ed 2026-10-23; rules/broomParts.ts), kept on this browser (localStorage witch.broom): the parts
// she has found (each from a wreck, rules/finds.ts) and which is fitted in each slot. A first game's broom is bare and she owns no
// part. Storage blocked: this run only. And her trail's colours (Ed, 2026-11-03: "set the colour set of your trail in the broom
// station"; render/trailColours.ts): the preset she chose at the Broom station's Trail row, absent till she chooses (the default's).
//
// The migration from the brooms before parts: a browser with no witch.broom yet had a broom shape in her look (witch.genome's
// broom.kind) and maybe a broom spell (witch.loadout's broom). Shapes are parts' looks now, and spells come from sets, so the
// shape goes back to the Classic look (its colours and fit kept) and the spell is dropped (every spell was free for testing:
// nothing of it is owned). Once, then witch.broom says it's done.
import { PART_IDS, SLOTS, bareBroom, partById, type Fitted } from "../rules/broomParts";
import { LOADOUT_KEY } from "./loadout";
import { unlockAll } from "./debugUnlock";
import { defaultBroom, newWitch } from "./defaultLook";
import { fallbackStorage } from "./storageFallback";
import { TRAIL_PRESETS } from "../render/trailColours";

export const BROOM_KEY = "witch.broom";
const GENOME_KEY = "witch.genome";
export interface BroomSave { v: 1; found: string[]; fitted: Fitted; /** her trail's colour preset's id (render/trailColours.ts), absent: the default */ trail?: string }
type Store = Pick<Storage, "getItem" | "setItem">;
const storeOf = fallbackStorage;

/** Her broom as saved: the parts found (known ones only) and those fitted (a found part, in its own slot). */
export function loadBroom(storage?: Store | null): BroomSave {
  const out: BroomSave = { v: 1, found: [], fitted: bareBroom() };
  if (newWitch()) return firstBroom(); // (?newWitch=1: app/defaultLook.ts)
  try {
    const o = JSON.parse(storeOf(storage)?.getItem(BROOM_KEY) ?? "null") as Partial<BroomSave> | null;
    if (!o) return firstBroom();
    out.found = PART_IDS.filter(id => Array.isArray(o.found) && o.found.includes(id));
    if (typeof o.trail === "string" && TRAIL_PRESETS.some(p => p.id === o.trail)) out.trail = o.trail;
    for (const s of SLOTS) { const id = o.fitted?.[s]; if (id && (out.found.includes(id) || unlockAll()) && partById(id)?.slot === s) out.fitted[s] = id; } // (one she hasn't found, fitted under the pause page's Unlock everything, stays while it's on: app/debugUnlock.ts)
  } catch { /* spoilt: a bare broom */ }
  return out;
}

/** A first game's broom: the game's default parts (config/default-look.json; a bare broom by default), fitted and found. */
export function firstBroom(): BroomSave {
  const fitted = defaultBroom();
  return { v: 1, found: SLOTS.map(s => fitted[s]).filter((id): id is string => !!id), fitted };
}

export function saveBroom(b: BroomSave, storage?: Store | null): void {
  if (newWitch()) return;
  try { storeOf(storage)?.setItem(BROOM_KEY, JSON.stringify({ v: 1, found: [...new Set(b.found)].sort(), fitted: b.fitted, ...(b.trail ? { trail: b.trail } : {}) })); } catch { /* storage blocked: this run only */ }
}

/** A part found (the "found" event of a wreck): hers for good, not fitted (it waits at its slot's modding station, the
 *  workbench, the lathe or the lift, which fits it: Ed, 2026-11-07; rules/kit.ts SLOT_STATION). */
export function partFound(id: string, storage?: Store | null): BroomSave {
  const b = loadBroom(storage);
  if (!b.found.includes(id)) b.found.push(id);
  saveBroom(b, storage);
  return loadBroom(storage);
}

/** Her broom fitted at the Workshop's modding stations (ui/stationPanel.ts; one bay till Ed, 2026-11-07): kept, each slot only with a part she's found (one she hasn't, as
 *  ?parts= can fit for a load, isn't kept). */
export function fitBroom(fitted: Fitted, storage?: Store | null): BroomSave {
  const b = loadBroom(storage);
  for (const s of SLOTS) { const id = fitted[s]; b.fitted[s] = id && (b.found.includes(id) || unlockAll()) && partById(id)?.slot === s ? id : null; }
  saveBroom(b, storage);
  return loadBroom(storage);
}

/** The once-only migration (above): returns whether it changed anything. */
export function migrateBroom(storage?: Store | null): boolean {
  const st = storeOf(storage);
  if (!st) return false;
  try {
    if (st.getItem(BROOM_KEY) !== null) return false;
    let changed = false;
    const g = JSON.parse(st.getItem(GENOME_KEY) ?? "null") as { broom?: { kind?: string } } | null;
    if (g?.broom && g.broom.kind && g.broom.kind !== "classic") { g.broom.kind = "classic"; st.setItem(GENOME_KEY, JSON.stringify(g)); changed = true; }
    const l = JSON.parse(st.getItem(LOADOUT_KEY) ?? "null") as { hat?: string; broom?: string } | null;
    if (l && "broom" in l) { const { broom, ...rest } = l; st.setItem(LOADOUT_KEY, JSON.stringify(rest)); changed ||= !!broom && broom !== "none"; }
    saveBroom(firstBroom(), st);
    return changed;
  } catch { return false; }
}

/** Her trail's colours chosen at the Broom station (ui/stationPanel.ts Trail row): kept with her broom (an unknown preset isn't). */
export function chooseTrail(id: string, storage?: Store | null): BroomSave {
  const b = loadBroom(storage);
  if (TRAIL_PRESETS.some(p => p.id === id)) b.trail = id;
  saveBroom(b, storage);
  return loadBroom(storage);
}
