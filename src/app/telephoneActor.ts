import type { Game } from "../rules/game";
/** The canonical assigned actor, never a reordered facade or another player's knockout/position. */
export function telephoneActor(game: Game | null, visiting: boolean) {
  const id = visiting ? 1 : 0, actor = game?.witches[id];
  return actor?.id === id ? actor : null;
}
