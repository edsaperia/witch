// The decks' analyser ring at the party start (render/leash/decksRing.ts; Ed, 2026-11-12: "At the decks, when the party starts, there
// is a visual effect - I want to remove this ... Instead I want something like the soundsystem spell (audio analyser ring)"): the
// party start's pieces no longer drawn (still under ?decksfx=old: render/partyStart.test.ts), the soundsystem spell's flat analyser
// round the decks instead, on the party start's beats, the music's spectrum driving it; the decks' replay plays it again. Headless:
// the dots drawn read back from stand-in layers.
import { afterEach, describe, expect, it } from "vitest";
import * as THREE from "three";
import { MagicFx } from "../fx/system";
import { PartyStartFx } from "../partyStart";
import { View } from "../view";
import { DECKS_FX, DECKS_RING, DECKS_RING_FADE, DECKS_RING_HOLD_BEATS, DECKS_RING_REPLAY_BEATS, decksMiddle, decksRingAt, decksRingPhase, drawDecksRing, replayRing, type DecksRing } from "./decksRing";
import { newStoneView } from "./stones";
import { TUNING } from "../../rules/tuning";
import { PARTY_CAST } from "../../rules/party";
import { djIntroEnd } from "../../rules/djSet";
import { beatAt, timeAt } from "../../rules/beat";
import { deckOf } from "../../rules/treehouse";
import { newGame as fullGame, type Game } from "../../rules/game";
import { smallWorld } from "../../test/worlds";
import type { LeashView } from "../leash";

afterEach(() => { DECKS_FX.old = false; });
const newGame = smallWorld(fullGame, "The decks' ring reads the night's beat, its routine and its treehouse; any small night does.");
const night = (): Game => { const g = newGame(123, TUNING); g.party.spellAt = 5; return g; };

/** A layer that keeps what's added to it: each dot's place, size and alpha. */
const layer = () => { const dots: { x: number; y: number; z: number; size: number; a: number }[] = []; return { dots, add: (x: number, y: number, z: number, size: number, _uv: number[], _r: number, _g: number, _b: number, a: number) => { dots.push({ x, y, z, size, a }); } }; };
/** A stand-in leash view: the game, the stones' analyser and the decks' two layers. */
function leash(g: Game, ring: DecksRing | null, spectrum: Uint8Array | null = null) {
  const V = newStoneView(); V.spectrum = spectrum;
  const ink = layer(), glow = layer();
  const lv = { game: g, decksRing: ring, stoneView: V, frameDt: 1 / 60, decksInk: ink, decksGlow: glow } as unknown as LeashView;
  return { lv, ink, glow, V };
}

describe("the party start's pieces gone (Ed: \"I want to remove this\")", () => {
  it("a show at the decks draws none of them (no sparkles, pillar, dome, light, shake or floor glow), its timing kept", () => {
    const scene = new THREE.Scene(), magic = new MagicFx(scene), P = new PartyStartFx(scene);
    P.start(TUNING, 0, 0, 0, 10);
    for (const ht of [10, 10.3, 10.8, 11.5]) { magic.begin(ht, 0, 0, {}); P.update(TUNING, magic, ht, ht); expect(P.drawn).toEqual({ sparkles: 0, pillar: 0, dome: 0, light: 0, ground: 0, over: true }); }
    expect(magic.screenKick).toBe(0);
    expect(P.showAt).toBe(10); // (the replay's rate limit as before: rules/partyStart.ts replayReady)
    DECKS_FX.old = true; // (?decksfx=old: as they were)
    const Q = new PartyStartFx(scene); Q.start(TUNING, 0, 0, 0, 10); magic.begin(10.5, 0, 0, {}); Q.update(TUNING, magic, 10.5, 10.5);
    expect(Q.drawn.pillar).toBeGreaterThan(0); expect(Q.drawn.sparkles).toBeGreaterThan(0);
  });
});

describe("its timing: on the party start's beats", () => {
  it("grows over the cast's burst, holds through her routine to a bar past the drop, then fades", () => {
    const g = night(), R = decksRingAt(g, { x: 0, y: 22, z: 0 }, 5, false), drop = djIntroEnd(g)!;
    expect(drop).toBeGreaterThan(5 + PARTY_CAST);
    expect(R.at).toBe(5); expect(R.grown).toBe(5 + PARTY_CAST);
    expect(R.until).toBeCloseTo(timeAt(g.beat, beatAt(g.beat, drop) + DECKS_RING_HOLD_BEATS), 9);
    expect(decksRingPhase(R, 4.99)).toBeNull();
    expect(decksRingPhase(R, 5 + PARTY_CAST / 2)!.fill).toBeCloseTo(0.5, 5);
    expect(decksRingPhase(R, 5 + PARTY_CAST)).toEqual({ fill: 1, alpha: 1 });
    expect(decksRingPhase(R, drop)).toEqual({ fill: 1, alpha: 1 }); // (the music drops with it up)
    const fading = decksRingPhase(R, R.until + DECKS_RING_FADE / 2)!;
    expect(fading.alpha).toBeCloseTo(0.5, 5);
    expect(decksRingPhase(R, R.until + DECKS_RING_FADE)).toBeNull();
  });
  it("a replay's: the same growth, four bars held; a replay while it's up keeps it up rather than growing again", () => {
    const g = night(), R = decksRingAt(g, { x: 0, y: 0, z: 0 }, 60, true);
    expect(R.until).toBeCloseTo(timeAt(g.beat, beatAt(g.beat, 60 + PARTY_CAST) + DECKS_RING_REPLAY_BEATS), 9);
    const again = replayRing(R, decksRingAt(g, { x: 0, y: 0, z: 0 }, 63, true), 63);
    expect(again.at).toBe(60); expect(again.until).toBeGreaterThan(R.until);
    expect(replayRing(R, decksRingAt(g, { x: 0, y: 0, z: 0 }, R.until + 1, true), R.until + 1).at).toBe(R.until + 1); // (fading: a new one)
  });
});

describe("its place and size: the decks", () => {
  it("centred on the decks' desk, from her feet behind it, sized by its width", () => {
    const g = night(), D = deckOf(g.map, g.tuning)!, desk = D.house!.desk, feet = { x: 10, y: 22, z: 20 };
    const M = decksMiddle(g, feet);
    expect(M).toEqual({ x: 10 + desk.x - D.seat.x, y: 22, z: 20 + desk.z - D.seat.z, width: desk.w });
    expect(M.z).toBeGreaterThan(feet.z); // (in front of her, toward the camera)
  });
  it("its dots lie on the floor round the decks, from past the desk's ends out to its width, louder music reaching farther", () => {
    const g = night(), R = decksRingAt(g, { x: 0, y: 22, z: 0 }, 5, false), W = R.width;
    g.clock.time = 8;
    const quiet = leash(g, R, new Uint8Array(64)), loud = leash(g, R, new Uint8Array(64).fill(255));
    drawDecksRing(quiet.lv, 8, [0, 0, 1, 1]); drawDecksRing(loud.lv, 8, [0, 0, 1, 1]);
    expect(loud.V.wantsSpectrum).toBe(true);
    const radii = (d: { x: number; z: number }[]) => d.map(p => Math.hypot(p.x - R.x, p.z - R.z));
    for (const S of [quiet, loud]) {
      expect(S.ink.dots.length).toBeGreaterThan(DECKS_RING.bars);
      for (const p of S.ink.dots) expect(p.y).toBeCloseTo(22.06, 6);
      const r = radii(S.ink.dots);
      expect(Math.min(...r)).toBeCloseTo(DECKS_RING.inner * W, 5);
      expect(Math.max(...r)).toBeLessThanOrEqual(DECKS_RING.edge * W * DECKS_RING.fill + 1e-6);
      expect(S.glow.dots.length).toBe(S.ink.dots.length); // (each glowing in its colour)
    }
    expect(Math.max(...radii(loud.ink.dots))).toBeGreaterThan(Math.max(...radii(quiet.ink.dots)) + 1);
    expect(loud.ink.dots.length).toBeGreaterThan(quiet.ink.dots.length);
  });
  it("nothing before the cast, after its fade, without a ring, or with ?decksfx=old", () => {
    const g = night(), R = decksRingAt(g, { x: 0, y: 0, z: 0 }, 5, false);
    for (const [ring, now] of [[R, 4], [R, R.until + DECKS_RING_FADE + 0.1], [null, 8]] as const) {
      g.clock.time = now; const S = leash(g, ring); drawDecksRing(S.lv, now, [0, 0, 1, 1]);
      expect(S.ink.dots).toHaveLength(0); expect(S.V.wantsSpectrum).toBe(false);
    }
    DECKS_FX.old = true; g.clock.time = 8;
    const S = leash(g, R); drawDecksRing(S.lv, 8, [0, 0, 1, 1]); expect(S.ink.dots).toHaveLength(0);
  });
});

describe("the decks' replay (\"make some noise!!!\")", () => {
  it("plays the ring again at the decks, touching nothing of the game's", () => {
    const g = night(), scene = new THREE.Scene(), P = new PartyStartFx(scene), L = { decksRing: null as DecksRing | null };
    const v = { partyStart: P, game: g, leashView: L, houseRooms: { sayAtDecks: () => {} } } as unknown as View;
    P.anchor = { x: 3, y: 22, z: 4 }; g.clock.time = 40; P.now = 40; P.worldNow = 40;
    const spell = g.party.spellAt;
    expect(View.prototype.replayPartyStart.call(v)).toBe(true);
    expect(L.decksRing).not.toBeNull();
    expect(L.decksRing!.at).toBe(40);
    expect(decksRingPhase(L.decksRing!, 41)!.alpha).toBe(1);
    expect(g.party.spellAt).toBe(spell);
  });
});
