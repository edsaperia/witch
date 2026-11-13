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
import { DECKS_FX, DECKS_RING, DECKS_RING_FADE, DECKS_RING_HOLD_BEATS, DECKS_RING_REPLAY_BEATS, byteDb, decksBar, decksIdle, decksMiddle, decksRingAt, decksRingPhase, drawDecksRing, noDeeper, reachOnFloor, replayRing, type DecksRing } from "./decksRing";
import { newStoneView } from "./stones";
import { TUNING } from "../../rules/tuning";
import { PARTY_CAST } from "../../rules/party";
import { djIntroEnd, djStrokeAgo } from "../../rules/djSet";
import { beatAt, timeAt } from "../../rules/beat";
import { deckOf } from "../../rules/treehouse";
import { floorDistance } from "../../rules/houseRooms";
import { newGame as fullGame, type Game } from "../../rules/game";
import { smallWorld } from "../../test/worlds";
import type { LeashView } from "../leash";

afterEach(() => { DECKS_FX.old = false; });
const newGame = smallWorld(fullGame, "The decks' ring reads the night's beat, its routine and its treehouse; any small night does.");
const night = (): Game => { const g = newGame(123, TUNING); g.party.spellAt = 5; return g; };

/** A layer that keeps what's added to it: each dot's place, size and alpha. */
const layer = () => { const dots: { x: number; y: number; z: number; size: number; a: number }[] = []; return { dots, add: (x: number, y: number, z: number, size: number, _uv: number[], _r: number, _g: number, _b: number, a: number) => { dots.push({ x, y, z, size, a }); } }; };
/** A stand-in leash view: the game, the stones' analyser and the decks' two layers. */
function leash(g: Game, ring: DecksRing | null, spectrum: Uint8Array | null = null, floorAt: LeashView["floorAt"] = null, decksOnFloor: LeashView["decksOnFloor"] = null) {
  const V = newStoneView(); V.spectrum = spectrum;
  const ink = layer(), glow = layer();
  const lv = { game: g, decksRing: ring ? { ...ring } : null, stoneView: V, frameDt: 1 / 60, decksInk: ink, decksGlow: glow, floorAt, decksOnFloor } as unknown as LeashView;
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
  it("its dots lie round the decks, from past the desk's ends out to about its width, louder music reaching farther", () => {
    const g = night(), R = decksRingAt(g, { x: 0, y: 22, z: 0 }, 5, false), W = R.width;
    g.clock.time = 8;
    const soft = leash(g, R, new Uint8Array(64).fill(40)), loud = leash(g, R, new Uint8Array(64).fill(255));
    drawDecksRing(soft.lv, 8, [0, 0, 1, 1]); drawDecksRing(loud.lv, 8, [0, 0, 1, 1]);
    expect(loud.V.wantsSpectrum).toBe(true);
    const radii = (d: { x: number; z: number }[]) => d.map(p => Math.hypot(p.x - R.x, p.z - R.z));
    for (const S of [soft, loud]) {
      expect(S.ink.dots.length).toBeGreaterThan(DECKS_RING.bars);
      for (const p of S.ink.dots) expect(p.y).toBeCloseTo(22.06, 6);
      const r = radii(S.ink.dots);
      expect(Math.min(...r)).toBeCloseTo(DECKS_RING.inner * W, 5);
      expect(Math.max(...r)).toBeLessThanOrEqual(DECKS_RING.edge * W * DECKS_RING.fill + 1e-6);
      expect(S.glow.dots.length).toBe(S.ink.dots.length); // (each glowing in its colour)
    }
    expect(Math.max(...radii(loud.ink.dots))).toBeGreaterThan(Math.max(...radii(soft.ink.dots)) + 2 * DECKS_RING.cell - 1e-6);
    expect(loud.ink.dots.length).toBeGreaterThan(soft.ink.dots.length);
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

describe("separate bars, the music's heights (Ed, 2026-11-13: \"fix the others\", the first a smooth even band)", () => {
  /** The dots of each bar: by its angle round the ring's middle. */
  const byBar = (dots: { x: number; z: number }[], R: DecksRing) => { const m = new Map<number, number>(); for (const p of dots) { const k = Math.round(((Math.atan2(p.z - R.z, p.x - R.x) - Math.PI / 2) / (Math.PI * 2)) * DECKS_RING.bars + DECKS_RING.bars) % DECKS_RING.bars; m.set(k, (m.get(k) ?? 0) + 1); } return m; };
  it("its bars stand apart: a gap most of a dot wide between two, even at the inner edge", () => {
    const g = night(), W = deckOf(g.map, g.tuning)!.house!.desk.w;
    expect((2 * Math.PI * DECKS_RING.inner * W) / DECKS_RING.bars).toBeGreaterThanOrEqual(1.7 * DECKS_RING.cell);
    expect(DECKS_RING.cell * 1.8 * DECKS_RING.glow).toBeLessThan(DECKS_RING.cell); // (and its halo's brightness under what would fill it)
    const R = decksRingAt(g, { x: 0, y: 22, z: 0 }, 5, false); g.clock.time = 8;
    const S = leash(g, R, new Uint8Array(64).fill(255)); drawDecksRing(S.lv, 8, [0, 0, 1, 1]);
    expect(byBar(S.ink.dots, R).size).toBe(DECKS_RING.bars);
    for (const p of S.ink.dots) expect(p.size).toBe(DECKS_RING.cell);
  });
  it("a bar's whole length is the music's: the bass bars, either side of her, to the edge on a kick, the rest fallen back to stubs", () => {
    const g = night(), R = decksRingAt(g, { x: 0, y: 22, z: 0 }, 5, false), n = DECKS_RING.bars; g.clock.time = 8;
    const spec = new Uint8Array(64).fill(255), S = leash(g, R, spec); drawDecksRing(S.lv, 8, [0, 0, 1, 1]); // (everything loud: each bin's own peak)
    spec.fill(200); spec[0] = spec[1] = 255; // (then a kick alone: the lowest bins up, the rest 15 dB under where they were)
    (S.lv as { frameDt: number }).frameDt = 0.1;
    for (let k = 0; k < 6; k++) { S.ink.dots.length = 0; drawDecksRing(S.lv, 8, [0, 0, 1, 1]); }
    const got = byBar(S.ink.dots, R), full = Math.floor((DECKS_RING.edge * R.width * DECKS_RING.fill - DECKS_RING.inner * R.width) / DECKS_RING.cell) + 1;
    expect(got.get(n / 4)).toBe(full); expect(got.get((3 * n) / 4)).toBe(full); // (due west and due east: the bass)
    expect(got.get(0)).toBeLessThanOrEqual(2); expect(got.get(n / 2)).toBeLessThanOrEqual(2); // (before and behind her: the treble, fallen)
    expect(full).toBeGreaterThanOrEqual(8); // (a kick's swing: seven dots and more)
    expect(decksBar(n / 4, n)).toBe(0); expect(decksBar((3 * n) / 4, n)).toBe(0); expect(decksBar(0, n)).toBe(n / 2);
    expect(byteDb(255)).toBe(-30); expect(byteDb(0)).toBe(-100);
  });
  it("the unclipped read is the one used when the page gives it: a bass over the 0-255 read's top still moves its bars", () => {
    const g = night(), R = decksRingAt(g, { x: 0, y: 22, z: 0 }, 5, false), n = DECKS_RING.bars; g.clock.time = 8;
    const S = leash(g, R, new Uint8Array(64).fill(255)), db = new Float32Array(64).fill(-60); db[0] = -15; S.V.spectrumDb = db;
    drawDecksRing(S.lv, 8, [0, 0, 1, 1]);
    expect(S.V.wantsDb).toBe(true);
    db[0] = -28; (S.lv as { frameDt: number }).frameDt = 0.1; // (13 dB down between kicks: 255 both times on the clipped read)
    for (let k = 0; k < 6; k++) { S.ink.dots.length = 0; drawDecksRing(S.lv, 8, [0, 0, 1, 1]); }
    expect(byBar(S.ink.dots, R).get(n / 4)).toBeLessThanOrEqual(2);
    db[0] = -15; S.ink.dots.length = 0; drawDecksRing(S.lv, 8, [0, 0, 1, 1]);
    expect(byBar(S.ink.dots, R).get(n / 4)).toBeGreaterThanOrEqual(8); // (and up at once on the next)
  });
});

describe("before the drop, the mix silent: the idle sweep on the beat", () => {
  it("two lobes of tall bars opposite each other, going round once a bar, every bar jumping on each stroke of her routine", () => {
    expect(decksIdle(0, 0.5)).toBeCloseTo(decksIdle(0.5, 0.5), 9); // (two lobes)
    expect(decksIdle(0.125, 0.5)).toBeGreaterThan(decksIdle(0.375, 0.5) + 0.4); // (their heads at beat 0.5: an eighth round)
    expect(decksIdle(0.3, 1.7)).toBeCloseTo(decksIdle(0.3 + 0.25, 2.7), 9); // (a beat on: a quarter round)
    expect(decksIdle(0.375, 0.5, 0)).toBeGreaterThan(decksIdle(0.375, 0.5) + 0.35); // (a stroke: up at once)
    expect(decksIdle(0.375, 0.5, 1)).toBeLessThan(decksIdle(0.375, 0.5) + 0.01); // (settled a beat on)
    for (let f = 0; f < 1; f += 0.05) for (let b = 0; b < 4; b += 0.13) for (const st of [null, 0, 0.3]) { const v = decksIdle(f, b, st); expect(v).toBeGreaterThan(0); expect(v).toBeLessThanOrEqual(1); }
  });
  it("her routine's strokes, on the beat's clock: how long ago the last was heard", () => {
    const g = night(); g.witch.seated = true;
    const start = timeAt(g.beat, Math.ceil(beatAt(g.beat, 5 + PARTY_CAST) - 1e-6)), at = (b: number) => timeAt(g.beat, beatAt(g.beat, start) + b);
    expect(djStrokeAgo(g, start - 0.01)).toBeNull(); // (the cast's burst: not yet)
    expect(djStrokeAgo(g, at(0.25))).toBeCloseTo(0.25, 6); // (the needle lifted on its first beat)
    expect(djStrokeAgo(g, at(1.1))).toBeCloseTo(0.1, 6); // (dropped on its second)
    expect(djStrokeAgo(g, at(5.3))).toBeCloseTo(0.05, 6); // (a scratch at 5.25)
    expect(djStrokeAgo(g, djIntroEnd(g)! + 0.01)).toBeNull(); // (over: the music's in)
  });
  it("drawn while the mix is silent, or no audio runs, moving with the beat; gone once the music's in", () => {
    const g = night(), R = decksRingAt(g, { x: 0, y: 22, z: 0 }, 5, false), bar = timeAt(g.beat, 4) - timeAt(g.beat, 0);
    const dots = (spec: Uint8Array | null, now: number) => { g.clock.time = now; const S = leash(g, R, spec); drawDecksRing(S.lv, now, [0, 0, 1, 1]); return S.ink.dots.map(p => [p.x, p.z]); };
    const silent = new Uint8Array(64), stubs = DECKS_RING.bars * 2;
    for (const spec of [silent, null]) {
      expect(dots(spec, 8).length).toBeGreaterThan(stubs + 20); // (lobes of tall bars, not a ring of stubs)
      expect(dots(spec, 8 + bar / 8)).not.toEqual(dots(spec, 8)); // (and it has moved round)
    }
    const music = new Uint8Array(64).fill(180);
    expect(dots(music, 8 + bar / 8)).toEqual(dots(music, 8)); // (the music in: its own levels, no sweep under them)
  });
});

describe("on the Terrace's floor as it's drawn (Ed, 2026-11-13: its front ran out over the drop)", () => {
  it("round her decks where the art draws them, every dot on the house's floor, placed where the art draws that spot", () => {
    const g = night(), D = deckOf(g.map, g.tuning)!, F = D.house!.rooms!, R = decksRingAt(g, { x: 0, y: 22, z: 0 }, 5, false);
    const at = { x: D.seat.x + 3, z: D.seat.z }; // (the art seats her east of the plan's seat: by the rim)
    g.clock.time = 8;
    const seen: { x: number; z: number }[] = [], floorAt = (x: number, z: number) => { seen.push({ x, z }); return { x: x + 100, y: 7, z: z * 0.5 }; };
    const S = leash(g, R, new Uint8Array(64).fill(255), floorAt, at); drawDecksRing(S.lv, 8, [0, 0, 1, 1]);
    expect(seen.length).toBeGreaterThan(DECKS_RING.bars * 4);
    for (const p of seen) { expect(floorDistance(F, p.x, p.z)).toBeLessThanOrEqual(0); expect(Math.hypot(p.x - at.x, p.z - at.z)).toBeGreaterThanOrEqual(DECKS_RING.inner * R.width - 1e-6); }
    const whole = leash(g, R, new Uint8Array(64).fill(255)); drawDecksRing(whole.lv, 8, [0, 0, 1, 1]);
    expect(S.ink.dots.length).toBeLessThan(whole.ink.dots.length); // (the bars toward the rim cut short)
    S.ink.dots.forEach((p, i) => { expect(p.x).toBeCloseTo(seen[2 * i].x + 100, 6); expect(p.y).toBeCloseTo(7.06, 6); expect(p.z).toBeCloseTo(seen[2 * i].z * 0.5, 6); });
  });
  it("a bar stops short of the floor's rim", () => {
    const g = night(), D = deckOf(g.map, g.tuning)!, F = D.house!.rooms!, desk = D.house!.desk;
    let rim = 0; while (floorDistance(F, desk.x, desk.z + rim) <= 0) rim += 0.01; // (due south of the desk)
    const far = reachOnFloor(g, desk.x, desk.z, Math.PI / 2, rim + 5, 0.3);
    expect(far).toBeLessThanOrEqual(rim - 0.3 + 1e-6); expect(far).toBeGreaterThan(rim - 0.3 - 0.21);
    expect(reachOnFloor(g, desk.x, desk.z, Math.PI / 2, 1, 0.3)).toBe(1); // (room to spare: its own edge)
  });
});

describe("drawn on the Terrace's floor, in front of the oak's near half (noDeeper)", () => {
  it("a dot deeper than the near half's depth moves along its own ray to it, on the same pixel, the same size on screen; a nearer one stays", () => {
    const cam = new THREE.PerspectiveCamera(30, 16 / 9, 1, 900);
    cam.position.set(0, 40, 40); cam.lookAt(0, 0, 0); cam.updateMatrixWorld(); cam.updateProjectionMatrix();
    const got: number[][] = [], into = { add: (x: number, y: number, z: number, size: number) => { got.push([x, y, z, size]); } };
    const depthOf = (x: number, y: number, z: number) => -new THREE.Vector3(x, y, z).applyMatrix4(cam.matrixWorldInverse).z;
    const D = depthOf(0, 0, 0), L = noDeeper(into, cam, D);
    L.add(0, 0, -6, 0.4, [0, 0, 1, 1], 1, 1, 1, 1); // (behind: moved)
    L.add(0, 0, 6, 0.4, [0, 0, 1, 1], 1, 1, 1, 1); // (in front: kept)
    const [x, y, z, size] = got[0];
    expect(depthOf(x, y, z)).toBeCloseTo(D, 6);
    const was = new THREE.Vector3(0, 0, -6).project(cam), now = new THREE.Vector3(x, y, z).project(cam);
    expect(now.x).toBeCloseTo(was.x, 6); expect(now.y).toBeCloseTo(was.y, 6);
    expect(size / 0.4).toBeCloseTo(Math.hypot(x - 0, y - 40, z - 40) / Math.hypot(0, 40, 46), 6);
    expect(got[1]).toEqual([0, 0, 6, 0.4]);
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
