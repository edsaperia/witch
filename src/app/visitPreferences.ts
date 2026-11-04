import type { Game } from "../rules/game";
import type { Tuning } from "../rules/tuning";
import { applySavedSettings } from "./settings";
import { applySettings, currentSettings } from "./playerSettings";

/** Personal UI/audio settings only. Never hand this clone to simulation or persistence. */
export function visitPreferences(prepare: (tuning: Tuning) => void = tuning => {
  applySavedSettings(tuning); applySettings(currentSettings(), tuning);
}) {
  let source: Game | null = null, local: Tuning | null = null;
  return {
    tuning(game: Game): Tuning {
      if (source !== game) { source = game; local = structuredClone(game.tuning); prepare(local); }
      return local!;
    },
    clear(): void { source = local = null; },
  };
}
