// The party start's look (Ed, 2026-11-03: "Party start: agree. Isolate each of the effects so I can tweak. We could allow the player
// to press square at the decks after the party is started that replays the visual effects so it's easier for me to experiment (the
// dj says make some noise!!!)"). Its pieces' knobs (config/tuning.json partyStart, the pause page's "Party start" group) and when
// the replay may play; the drawing is render/partyStart.ts. Nothing here changes the game: the replay is the view's alone.
import raw from "../../config/tuning.json";
import type { Game, Witch } from "./game";
import { atDecks } from "./wakeUp";

/** The canonical defaults (config/tuning.json partyStart). */
export const PARTY_START_DEFAULTS = structuredClone(raw.partyStart);
export type PartyStartTuning = typeof PARTY_START_DEFAULTS;
/** The pieces, by name, each with its own `on`. */
export const PARTY_START_PIECES = ["sparkles", "pillar", "dome", "light", "shake", "ground", "refraction"] as const;
export type PartyStartPiece = typeof PARTY_START_PIECES[number];

/** What the DJ (she, at her decks) says as the replay plays (Ed's words, 2026-11-03). */
export const MAKE_SOME_NOISE = "make some noise!!!";

/** The knobs in use: the tuning's, else the defaults (an old saved tuning without them). */
export const partyStartOf = (t: { partyStart?: PartyStartTuning }): PartyStartTuning => t.partyStart ?? PARTY_START_DEFAULTS;

/** How long a show lasts (s): its longest piece that's on (the sparkles' last can start half a second in). */
export function partyStartLength(k: PartyStartTuning): number {
  return Math.max(0,
    k.sparkles.on ? k.sparkles.life + 0.5 : 0,
    k.pillar.on || k.ground.on ? k.pillar.duration : 0,
    k.dome.on ? k.dome.duration : 0,
    k.light.on ? k.light.duration : 0,
    k.shake.on ? k.shake.duration : 0);
}

/** The replay (the use button, the pad's square, at her decks): only once the party has started, she's at her decks and not
 *  knocked out. A pure read; the press does whatever it did before as well (at the decks, after the cast: nothing). */
export function canReplayPartyStart(g: Game, W: Witch = g.witches[0]): boolean {
  return typeof g.party.spellAt === "number" && !W.ko && atDecks(g, W);
}

/** The shortest gap between two shows at the decks (s): a held or mashed button never restarts one (with every piece off, too). */
export const REPLAY_GAP = 1;
/** Whether the decks' replay may play at `now` (her clock): none yet, or the last (from `lastAt`) over, and at least REPLAY_GAP
 *  seconds since it started. A show "from the future" (a clock gone back: another night) never holds it. */
export function replayReady(k: PartyStartTuning, lastAt: number | null, now: number): boolean {
  if (lastAt === null) return true;
  const since = now - lastAt;
  return since < 0 || since >= Math.max(REPLAY_GAP, partyStartLength(k));
}

/** Whether this frame's controls ask for the replay (main.ts): the use button pressed (E is `place`; the pad's square and a tap,
 *  `sigil`) where it may play (canReplayPartyStart), and nothing else holding the press (`busy`: a menu or panel open or just shut on
 *  it, the pause, a bot's game, a visit to another's night). */
export function replayWanted(g: Game, c: { place?: boolean; sigil?: boolean }, busy: boolean): boolean {
  return !busy && !!(c.place || c.sigil) && canReplayPartyStart(g);
}
