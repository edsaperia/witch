import type { Game } from "../rules/game";
/** Solo keeps its original recording callback. Online renderer focus belongs only to a presentation facade. */
export function introFocus(game: Game, canonical: Game, focus: Game["introFocus"], online: boolean, solo: (game: Game, focus: Game["introFocus"]) => void): void {
  if (!online) { solo(game, focus); return; }
  if (game !== canonical) game.introFocus = focus;
}
