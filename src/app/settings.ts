import { slotStorage } from "./saveSlots";
// Settings remembered on this browser (Ed, 2026-10-14: the music and sound effects volumes, "to start with, being able to control
// music and sfx volume separately"): the pause page's entries flagged `persist` (config/decisions/*.json, the pinned Volume group)
// keep their last value in localStorage witch.settings and take it again as the game loads, their tuning knob set before the
// sound is built (main.ts), so a volume chosen once holds every night. The built default is kept as no entry at all.
import { DECISION_LIST, knobAt, setKnob, type Decision } from "../ui/decisions";

const KEY = "witch.settings";
export type Saved = Record<string, string | number | boolean>;

export function loadSettings(): Saved {
  try { const t = slotStorage.getItem(KEY); return t ? (JSON.parse(t) as Saved) : {}; } catch { return {}; }
}

/** A persisted entry's new value kept (its built default forgets it); any other entry is left alone. */
export function saveSetting(d: Decision, v: string | number | boolean): void {
  if (!d.persist) return;
  const s = loadSettings();
  if (v === d.default) delete s[d.id]; else s[d.id] = v;
  try { slotStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage blocked: this load only */ }
}

/** The saved values on to their knobs (as the game loads, before the game and the sound are made), but for the knobs in `skip`
 *  (the link's own ?set=); the ids applied. */
export function applySavedSettings(tuning: object, list: readonly Decision[] = DECISION_LIST, skip: ReadonlySet<string> = new Set()): string[] {
  const s = loadSettings(), applied: string[] = [];
  for (const d of list) {
    const v = s[d.id];
    if (!d.persist || !d.apply.knob || skip.has(d.apply.knob) || v === undefined || typeof v !== typeof d.default) continue;
    if (d.control.type === "slider" && typeof v === "number" && !(v >= d.control.min && v <= d.control.max)) continue;
    setKnob(tuning, d.apply.knob, v); applied.push(d.id);
  }
  return applied;
}

/** Every pause-page knob's value in one night's tuning on to the next's (Ed, 2026-10-19: all the sliders carry to the next island,
 *  the game's knobs too: docs/plans/sail-without-reload.md decision 5), on purpose, the next made from a whole copy of the file;
 *  but for the knobs in `skip` (the next night's link's own). The ids carried. */
export function carryKnobs(from: object, to: object, list: readonly Decision[] = DECISION_LIST, skip: ReadonlySet<string> = new Set()): string[] {
  const carried: string[] = [];
  for (const d of list) {
    const k = d.apply.knob;
    if (!k || skip.has(k)) continue;
    const v = knobAt(from, k);
    if (v === undefined || knobAt(to, k) === undefined || Object.is(v, knobAt(to, k))) continue;
    setKnob(to, k, v); carried.push(d.id);
  }
  return carried;
}
