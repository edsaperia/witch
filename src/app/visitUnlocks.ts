import type { Game } from "../rules/game";
import { sharedNightProgress } from "../rules/sharedNightProgress";
import { FIND_KINDS } from "../rules/finds";
import { won } from "../rules/win";
import { keepFound, type FindsCtx } from "./finds";
import { nightOver } from "./chartSave";
import type { SaveSlots } from "./saveSlots";

/** Capture authoritative results before session teardown, never a host inventory or equipped loadout. */
export function visitUnlocks(game: Game, player: number) {
  const progress = structuredClone(sharedNightProgress(game, player));
  const settled = won(game) && !!game.win?.settled;
  const island = game.tuning.map?.island ?? "home", world = game.tuning.map?.world ?? 0;
  let applied = false;
  return {
    /** Only after the borrowed write lease is gone; existing keepers union with the visitor's own collection. */
    apply(slots: Pick<SaveSlots, "visiting">, own: FindsCtx): boolean {
      if (applied) return false;
      if (slots.visiting) throw new Error("Return to own saves before keeping shared unlocks.");
      if (settled) nightOver(island, { won: true, found: progress.islands }, undefined, world);
      for (const find of progress.finds) if (FIND_KINDS.some(kind => kind.id === find.kind && kind.items.includes(find.id))) keepFound(own, find.kind, find.id);
      applied = true; return true;
    },
  };
}
