// Her DJ routine behind the decks (Ed, 2026-10-07: "before the first music starts, the dj witch can drop the needle and do a
// little scratching performance"; and while she waits to come back after a knockout): the routine itself is the art's table
// (art/witch.js DJ_ROUTINE: the picture's frames and the sound's strokes read it alike), this only says when it began.
// `g.djFrom` is the game time it was set going: the party spell's burst over (rules/game.ts), back behind her decks after
// a knockout; a respawn wait sets it the same way. It plays from the first whole beat after, while she stays seated.
import type { Game } from "./game";
import { beatAt } from "./beat";

/** The beat (rules/beat.ts beatAt) her routine starts on, or null: none set going, or she has left her decks. */
export function djRoutineFrom(g: Game): number | null {
  if (!g.witch.seated || g.djFrom == null) return null;
  return Math.ceil(beatAt(g.beat, g.djFrom) - 1e-6);
}
