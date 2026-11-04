// When the party start may play again (rules/partyStart.ts; Ed, 2026-11-03: "press square at the decks after the party is started
// that replays the visual effects"): the use button (E; the pad's square) at her decks, the party on; never before it's started,
// away from the decks, knocked out, or with a menu holding the press; and the press itself re-casting nothing.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame as fullGame, stepGame, STEP, type Controls, type Game } from "./game";
import { smallWorld } from "../test/worlds";
import { deckOf } from "./treehouse";
import { atDecks } from "./wakeUp";
import { PARTY_START_DEFAULTS, REPLAY_GAP, canReplayPartyStart, partyStartLength, partyStartOf, replayReady, replayWanted } from "./partyStart";
import { bindings } from "../platform/bindings";

const newGame = smallWorld(fullGame, "The decks' replay reads her place and the party's start; one house, any small night.");
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
/** A night with her stood at her decks' seat, the party not started. */
function atTheDecks(): Game {
  const g = newGame(123, TUNING), d = deckOf(g.map, g.tuning)!;
  g.party.spellAt = null; g.clock.paused = false;
  g.witches[0].body = { ...g.witches[0].body, x: d.seat.x, z: d.seat.z, vx: 0, vz: 0, mode: "ground" };
  return g;
}

describe("the replay at the decks", () => {
  it("is the use action: E on the keyboard, the pad's square (its West face button)", () => {
    expect(bindings.keys("game.use")).toContain("KeyE");
    expect(bindings.pad("game.use")).toContain("square"); expect(bindings.padButtons("game.use")).toEqual([2]);
  });

  it("only once the party has started, at her decks, on foot and not knocked out", () => {
    const g = atTheDecks();
    expect(atDecks(g)).toBe(true);
    expect(canReplayPartyStart(g)).toBe(false); // (not started: E there opens her booth)
    g.party.spellAt = g.clock.time;
    expect(canReplayPartyStart(g)).toBe(true);
    const W = g.witches[0], body = W.body;
    W.body = { ...body, x: body.x + 12 }; expect(canReplayPartyStart(g)).toBe(false); // (away from her decks)
    W.body = { ...body, mode: "treetop" }; expect(canReplayPartyStart(g)).toBe(false); // (up in the air)
    W.body = body; W.ko = { at: g.clock.time } as unknown as typeof W.ko; expect(canReplayPartyStart(g)).toBe(false); // (knocked out)
    W.ko = null; g.party.spellAt = undefined; expect(canReplayPartyStart(g)).toBe(false); // (a night without the spell)
  });

  it("wanted on the use button's press (E's `place`, the pad's `sigil`), never with a menu or the pause holding it", () => {
    const g = atTheDecks(); g.party.spellAt = g.clock.time;
    expect(replayWanted(g, { place: true }, false)).toBe(true);
    expect(replayWanted(g, { sigil: true }, false)).toBe(true);
    expect(replayWanted(g, {}, false)).toBe(false);
    expect(replayWanted(g, { place: true, sigil: true }, true)).toBe(false);
    g.party.spellAt = null;
    expect(replayWanted(g, { place: true }, false)).toBe(false);
  });

  it("rate-limited: not while a show plays, never sooner than REPLAY_GAP", () => {
    const k = PARTY_START_DEFAULTS, L = partyStartLength(k);
    expect(L).toBeGreaterThan(REPLAY_GAP);
    expect(replayReady(k, null, 5)).toBe(true);
    expect(replayReady(k, 5, 5 + L - 0.05)).toBe(false);
    expect(replayReady(k, 5, 5 + L)).toBe(true);
    const off = structuredClone(k); for (const p of ["sparkles", "pillar", "dome", "light", "shake", "ground", "refraction"] as const) off[p].on = false;
    expect(partyStartLength(off)).toBe(0);
    expect(replayReady(off, 5, 5 + REPLAY_GAP / 2)).toBe(false);
    expect(replayReady(off, 5, 5 + REPLAY_GAP)).toBe(true);
    expect(replayReady(k, 50, 5)).toBe(true); // (a show from another night's clock never holds it)
  });

  it("the press at the decks after the start re-casts nothing and opens nothing", () => {
    const g = atTheDecks(); g.party.spellAt = g.clock.time - 30;
    const cast = g.party.spellAt;
    for (let i = 0; i < 3; i++) stepGame(g, { ...idle, place: true, sigil: true }, STEP);
    expect(g.party.spellAt).toBe(cast);
    expect(g.wake?.events ?? []).not.toContain("booth");
  });

  it("an old saved tuning without the knobs still has them (the defaults)", () => {
    const { partyStart: _, ...old } = TUNING;
    expect(partyStartOf(old as { partyStart?: undefined })).toEqual(PARTY_START_DEFAULTS);
  });
});
