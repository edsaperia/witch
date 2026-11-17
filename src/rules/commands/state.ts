// A witch's command state (?commands=1; rules/commands/press.ts): kept on her leash (LeashState.cmd), game state like the rest of it,
// so a saved night, a replay and a guest's game agree. Made at her first command; plain data. Times are the world's clock.
/** One timed buff a command gave her (a Surge): its group, how many stacks, until when. */
export interface TimedBuff { group: string; stacks: number; until: number }
export interface CommandState {
  /** When each creature (by id) can act again. */
  ready: Record<number, number>;
  /** The creature her last letter landed on, and when (an attack command's second choice of target). */
  lastHit?: { id: number; at: number };
  /** A Guard's shield on her: blows it still stops, until when, and the creature that gave it. */
  shield?: { blows: number; until: number; by: number };
  /** Buffs her commands gave her, each for a while. */
  buffs?: TimedBuff[];
}
