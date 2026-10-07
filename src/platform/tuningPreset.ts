// ?tuning=pre-overnight (the overnight programme, 2026-10-07: "a flag to play the old numbers"): the balance as it stood
// before the night's changes (config/presets/pre-overnight.json: the tuning file's balance knobs, combat.json and
// states.json) written over the config files' numbers as they load. Imported first in main.ts, so every module reads
// the old numbers; only the numbers it holds change (anything newer keeps its own). The game only, never the rules' tests.
import tuning from "../../config/tuning.json";
import combat from "../../config/combat.json";
import states from "../../config/states.json";
import preOvernight from "../../config/presets/pre-overnight.json";

type Tree = Record<string, unknown>;
const isTree = (v: unknown): v is Tree => typeof v === "object" && v !== null && !Array.isArray(v);

/** Writes from's numbers over into's, in place, key by key (into's own objects kept, so anything holding one sees the change). */
function over(into: Tree, from: Tree): void {
  for (const [k, v] of Object.entries(from)) {
    if (isTree(v) && isTree(into[k])) over(into[k] as Tree, v);
    else into[k] = v;
  }
}

const PRESETS: Record<string, Partial<Record<"tuning" | "combat" | "states", Tree>>> = { "pre-overnight": preOvernight as Tree };

/** The preset the page asked for, if any (applied once, as this module loads). */
export const TUNING_PRESET = typeof location !== "undefined" ? new URLSearchParams(location.search).get("tuning") : null;
const p = TUNING_PRESET ? PRESETS[TUNING_PRESET] : undefined;
if (p) {
  if (p.tuning) over(tuning as Tree, p.tuning);
  if (p.combat) over(combat as Tree, p.combat);
  if (p.states) over(states as Tree, p.states);
}
