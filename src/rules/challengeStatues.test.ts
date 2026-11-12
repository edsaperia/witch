// The challenge circle's statues (Ed, 2026-11-04: "taking on the challenge area is more intentional; the creatures around it only start
// to aggro you when you go into the challenge circle"; rules/challengeStatues.ts): stone at their posts till a witch sets foot on its
// floor, a wake-up of 4 bars from the next bar line, wild once awake, and stone again, whole, once every witch is off the floor.
import { describe, expect, it } from "vitest";
import { affectionOf, dormant, hitWitch, newWitchPlayer, stepGame, type Controls, type Game } from "./game";
import { TUNING, withTuning, type Tuning } from "./tuning";
import { cellKey } from "./party";
import { befriend, invitableNow, stateOf } from "./creatureStates";
import { challengeColumns, columnKinds, columnSpots, POST_REACH, statuePosts } from "./challenge";
import { challengeCircle } from "./challengeCircle";
import { onFloor, postsOf, wakeAggro, wakeK } from "./challengeStatues";
import { beatAt, timeAt } from "./beat";
import { areaCellAt } from "./map";
import { hunter } from "./hunt";
import { watcher } from "./wildWatch";
import { restoreGame, snapshotGame } from "./nightSnapshot";
import { preppedGame } from "../test/preppedGame";

const islandOf = (kind: string, t: Tuning = TUNING): Tuning => ({ ...t, map: { ...t.map!, island: kind, islandAreas: 10 } });
const still: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const STEP = 1 / 60;
const run = (g: Game, secs: number, c: Controls | Controls[] = still) => { for (let i = 0; i < Math.round(secs * 60); i++) stepGame(g, c, STEP); };
/** Steps till `f` holds (at most `secs`), returning the game time it first held at, else null. */
const runUntil = (g: Game, f: () => boolean, secs: number, c: Controls | Controls[] = still): number | null => {
  for (let i = 0; i < Math.round(secs * 60); i++) { stepGame(g, c, STEP); if (f()) return g.clock.time; }
  return null;
};
const BAR_BEATS = 4, BARS = TUNING.challenge!.statues!.bars;

/** A night under way (the party on, no waves), her high over home, hard to knock out; nothing but its pack near the circle. */
function game(kind = "fox", seed = 2, t: Tuning = TUNING): Game {
  const g = preppedGame(seed, islandOf(kind, t));
  g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
  g.witches[0].health.hp = 1e6;
  const ch = g.challenge;
  if (ch) for (const c of g.creatures) if (cellKey(c.cell) !== ch.key && Math.hypot(c.x - ch.x, c.z - ch.z) < 300) c.gone = true;
  g.byArea = null;
  run(g, 0.1);
  return g;
}
const pack = (g: Game) => g.challenge!.pack.map(id => g.creatures[id]);
/** Witch `i` put at (dx, dz) from the circle's middle: on foot, or up in the treetops. */
function put(g: Game, dx: number, dz: number, mode: "ground" | "treetop" = "ground", i = 0): void {
  const ch = g.challenge!, W = g.witches[i];
  W.body = { ...W.body, x: ch.x + dx, z: ch.z + dz, mode, lift: mode === "ground" ? 0 : 1, seated: false, perch: undefined, vx: 0, vz: 0 };
}
const phase = (g: Game) => g.challenge!.statues!.phase;

describe("stone at their posts (Ed, 2026-11-04: \"grey statues, all facing the centre of the circle\")", () => {
  it("stand column / adult / youth / centre on every column, each on its kind's column's radius, facing the middle (Ed, 2026-11-04, on #1827: \"youths should be closer to the middle of the circle than the elder\")", () => {
    const g = game(), ch = g.challenge!, kinds = columnKinds(g), cols = columnSpots(ch, kinds.length), S = TUNING.challenge!.statues!;
    expect(phase(g)).toBe("stone");
    kinds.forEach((kind, i) => {
      const col = cols[i], mine = pack(g).filter(c => c.species === kind), adult = mine.find(c => c.level === 2)!, youth = mine.find(c => c.level === 1)!;
      const from = (c: { x: number; z: number }) => Math.hypot(c.x - col.x, c.z - col.z), mid = (c: { x: number; z: number }) => Math.hypot(c.x - ch.x, c.z - ch.z);
      expect(from(adult), kind).toBeCloseTo(S.first, 6);
      expect(from(youth) - from(adult), kind).toBeCloseTo(S.gap, 6); // (Ed, 2026-11-04: "Further apart, same line")
      expect(mid(youth), kind).toBeLessThan(mid(adult)); // (the youth nearer the middle, north or south of it)
      expect(mid(adult)).toBeLessThan(ch.radius);
      for (const c of [adult, youth]) {
        // (on the column's radius: column, it and the middle in a line)
        const cross = (c.x - col.x) * (ch.z - col.z) - (c.z - col.z) * (ch.x - col.x);
        expect(Math.abs(cross) / ch.radius, kind).toBeLessThan(1e-6);
        expect(c.statue).toBe("stone");
        expect(c.facing, kind).toBe(ch.x >= c.x ? 1 : -1);
        expect(c.away, kind).toBe(ch.z < c.z - 1);
      }
    });
  }, 60000);

  it("stand nearer their column than the middle, the middle left open (Ed, 2026-11-04: \"they should be closer to their column than to the centre\")", () => {
    for (const [kind, seed, t] of [["fox", 2, TUNING], ["hare", 1, TUNING], ["fox", 2, withTuning({ challenge: { ...TUNING.challenge!, adults: 3, youths: 3, statues: { ...TUNING.challenge!.statues!, first: 12, gap: 9 } } })]] as const) {
      const g = game(kind, seed, t), ch = g.challenge!, kinds = columnKinds(g), cols = columnSpots(ch, kinds.length);
      kinds.forEach((k, i) => {
        for (const c of pack(g).filter(c => c.species === k)) {
          const toCol = Math.hypot(c.x - cols[i].x, c.z - cols[i].z), toMid = Math.hypot(c.x - ch.x, c.z - ch.z);
          expect(toCol, `${kind} ${k}`).toBeLessThan(toMid);
        }
      });
    }
  }, 120000);

  it("keep further kinds' posts further in (statuePosts: two adults and a youth a kind)", () => {
    const site = { x: 0, z: 0, radius: 30 }, posts = statuePosts(site, ["fox"], [{ id: 5, species: "fox", level: 1 }, { id: 2, species: "fox", level: 2 }, { id: 3, species: "fox", level: 2 }], { first: 3, gap: 4 });
    expect([posts.get(2), posts.get(3), posts.get(5)]).toEqual([{ x: 0, z: -27 }, { x: 0, z: -23 }, { x: 0, z: -19 }].map(p => ({ x: expect.closeTo(p.x, 9), z: expect.closeTo(p.z, 9) })));
  });

  it("spread well apart on the same line, the youth nearer the middle, both nearer their column than the middle, on every size of circle (Ed, 2026-11-04: \"Further apart, same line\"; on #1827, \"If this doesn't fit, make the circle bigger.\")", () => {
    const S = TUNING.challenge!.statues!, C = TUNING.challenge!;
    expect(S.gap).toBeGreaterThanOrEqual(18); // (3.5 before: the youth hidden behind its adult)
    expect(C.radius).toBeGreaterThan(36); // (36 before: grown so the two fit)
    expect(S.first + S.gap).toBeLessThanOrEqual(POST_REACH * C.radius); // (the circle fits them: the youth `gap` past its adult, not squeezed, on the smallest circle)
    for (const n of [3, 6, 10, 26, 64]) {
      const R = challengeCircle(n, TUNING).radius, site = { x: 100, z: -50, radius: R }, kinds = Array.from({ length: n }, (_, i) => `k${i}`);
      for (const per of [[2, 1], [1, 1], [3, 3]] as const) {
        const pk = kinds.flatMap((k, i) => [...Array(per[0]).fill(2), ...Array(per[1]).fill(1)].map((level, j) => ({ id: i * 10 + j, species: k, level })));
        const posts = statuePosts(site, kinds, pk, S), cols = columnSpots(site, n);
        kinds.forEach((k, i) => {
          const mine = pk.filter(c => c.species === k), from = (c: { id: number }) => { const p = posts.get(c.id)!; return Math.hypot(p.x - cols[i].x, p.z - cols[i].z); };
          for (const c of mine) {
            const p = posts.get(c.id)!, toCol = from(c), toMid = Math.hypot(p.x - site.x, p.z - site.z);
            expect(toCol, `${n} kinds, ${k}`).toBeLessThan(toMid); // (Ed: "closer to their column than to the centre")
            expect(toMid, `${n} kinds, ${k}`).toBeLessThan(R); // (on the floor: inside the circle, so inside its clearing and its area's claim)
            expect(Math.abs((p.x - cols[i].x) * (site.z - cols[i].z) - (p.z - cols[i].z) * (site.x - cols[i].x)) / R).toBeLessThan(1e-6); // (same line)
          }
          const adults = mine.filter(c => c.level === 2).map(from), youths = mine.filter(c => c.level === 1).map(from);
          expect(Math.min(...youths), `${n} kinds, ${k}`).toBeGreaterThan(Math.max(...adults)); // (every youth nearer the middle than every adult, on every column)
          const d = mine.map(from).sort((x, y) => x - y);
          for (let j = 1; j < d.length; j++) expect(d[j] - d[j - 1], `${n} kinds, ${k}`).toBeGreaterThan(per[0] + per[1] > 2 ? 2 : S.gap - 1e-6); // (two a kind: `gap` apart; more: squeezed evenly, never piled up)
        });
      }
    }
  });

  it("the youth lifted up the screen past its adult's head from the game's camera, even on the column due south (Ed, 2026-11-04: \"Further apart, same line\")", () => {
    // The game's camera looks north (rules/camera.ts: it stands south of her, +z), pitched down by the ground camera's angle (its
    // zoom's range, and the start's zoom). Each statue's sprite is a billboard standing up the screen from its foot: a box `w` wide
    // and `h` tall on screen, its foot lifted z sin(pitch) up the screen for every metre north. On the columns south of the middle
    // the youth, nearer the middle, stands north of its adult, behind it: only the spacing lifts it clear. The boxes: frames of the fox
    // island's statues as drawn (seed 2, measured in the built game, 2026-11-04): the tallest adult drawn (the hare: frames 15.4 and
    // 10.7 m tall), the next tallest (the badger: 10.6 and 7.7; the fox, 10.4 and 7.4), and the widest (the mole: 17 and 10.7 m wide).
    const HARE = { adult: { h: 15.4, hw: 5.7 }, youth: { h: 10.7, hw: 4.0 } }, REST = { badger: { adult: { h: 10.6, hw: 8.3 }, youth: { h: 7.7, hw: 5.2 } }, fox: { adult: { h: 10.4, hw: 7.3 }, youth: { h: 7.4, hw: 5.4 } }, mole: { adult: { h: 9.2, hw: 8.5 }, youth: { h: 6.4, hw: 5.3 } } };
    const CAM = TUNING.camera.ground, Z = TUNING.camera.startZoom / Math.max(1, TUNING.camera.zoomSteps - 1);
    const start = CAM.angleIn + (CAM.angleOut - CAM.angleIn) * Z, flattest = CAM.angleIn;
    /** How much of `back`'s box the box of `front` (nearer the camera) leaves clear, as a share. */
    const clearOf = (back: { x: number; z: number; h: number; hw: number }, front: { x: number; z: number; h: number; hw: number }, pitch: number): number => {
      const s = Math.sin((pitch * Math.PI) / 180), box = (b: typeof back) => ({ x0: b.x - b.hw, x1: b.x + b.hw, y0: -b.z * s, y1: -b.z * s + b.h });
      const B = box(back), F = box(front), ox = Math.max(0, Math.min(B.x1, F.x1) - Math.max(B.x0, F.x0)), oy = Math.max(0, Math.min(B.y1, F.y1) - Math.max(B.y0, F.y0));
      return 1 - (ox * oy) / ((B.x1 - B.x0) * (B.y1 - B.y0));
    };
    /** The least share of each youth (behind its adult) and adult (behind its youth) left clear, every column of a 10-kind circle. */
    const look = (S: { first: number; gap: number }, pairs: Record<string, typeof HARE>, pitch: number, radius = challengeCircle(10, TUNING).radius) => {
      const n = 10, site = { x: 0, z: 0, radius }, kinds = Array.from({ length: n }, (_, i) => `k${i}`);
      const posts = statuePosts(site, kinds, kinds.flatMap((k, i) => [{ id: 2 * i, species: k, level: 2 }, { id: 2 * i + 1, species: k, level: 1 }]), S);
      let youth = 1, adult = 1;
      for (const P of Object.values(pairs)) for (let i = 0; i < n; i++) {
        const a = { ...posts.get(2 * i)!, ...P.adult }, y = { ...posts.get(2 * i + 1)!, ...P.youth };
        if (a.z > y.z + 1e-9) youth = Math.min(youth, clearOf(y, a, pitch)); else adult = Math.min(adult, clearOf(a, y, pitch));
      }
      return { youth, adult };
    };
    const S = TUNING.challenge!.statues!;
    // (at the start camera and steeper, every youth whose adult is drawn up to about 10 m tall all but wholly clear of it, every column)
    for (const pitch of [start, CAM.angleOut]) expect(look(S, REST, pitch).youth, `${pitch} degrees`).toBeGreaterThan(0.9);
    // (the hare, the tallest adult drawn: half its youth showing at the start camera, a third at the flattest; as far as the circle
    // can grow for Ed's "make the circle bigger" and the smallest islands still hold it, home's still moving night to night: #1827)
    expect(look(S, { hare: HARE }, start).youth).toBeGreaterThan(0.5);
    expect(look(S, { hare: HARE }, flattest).youth).toBeGreaterThan(0.33);
    // (on the columns north of the middle the youth is in front, lower on the screen: its adult left mostly clear)
    for (const pitch of [flattest, start]) expect(look(S, { hare: HARE, ...REST }, pitch).adult).toBeGreaterThan(0.85);
    // And before (3.5 m apart on the 36 m circle): the youth due south hidden behind its adult.
    expect(look({ first: S.first, gap: 3.5 }, { hare: HARE, ...REST }, start, 36).youth).toBeLessThan(0.05);
  });

  it("are the same posts for the same pack whatever order it comes in, night to night (deterministic)", () => {
    const g1 = game(), g2 = game();
    const at = (g: Game) => pack(g).map(c => [c.id, c.x, c.z]);
    expect(at(g1)).toEqual(at(g2));
    const ch = g1.challenge!, kinds = columnKinds(g1), list = pack(g1).map(c => ({ id: c.id, species: c.species, level: c.level }));
    const a = statuePosts(ch, kinds, list, TUNING.challenge!.statues!), b = statuePosts(ch, kinds, [...list].reverse(), TUNING.challenge!.statues!);
    expect([...b.entries()].sort((p, q) => p[0] - q[0])).toEqual([...a.entries()].sort((p, q) => p[0] - q[0]));
    for (const c of pack(g1)) expect([c.x, c.z]).toEqual([a.get(c.id)!.x, a.get(c.id)!.z]);
  }, 60000);

  it("can't be invited or hit while stone: 💌s refused as an enraged one refuses them, out of every fight", () => {
    const g = game(), A = affectionOf(g);
    for (const c of pack(g)) {
      expect(invitableNow(c)).toBe(false);
      expect(A.invitable(c)).toBe(false);
      expect(A.blocksLetters(c)).toBe(true); // (the "blocked" event: the crumpled letter and sfx.refused)
      expect(dormant(g, c)).toBe(true); // (the combat world's asleep: not targeted, not hit)
      expect(hunter(c)).toBe(false); expect(watcher(c)).toBe(false);
    }
  }, 60000);

  it("stay stone with her walking about its area outside the circle, or flying over it", () => {
    const g = game(), ch = g.challenge!, before = pack(g).map(c => [c.x, c.z]);
    put(g, 0, -(ch.radius + 1.5)); // (on foot just past its edge)
    run(g, 3);
    expect(onFloor(ch, g.witches[0])).toBe(false);
    put(g, 0, 0, "treetop"); // (over its middle, in the treetops)
    run(g, 12);
    expect(phase(g)).toBe("stone");
    expect(g.wildEntry.has(ch.key)).toBe(false);
    expect(pack(g).every(c => c.statue === "stone" && c.hunting === undefined)).toBe(true);
    expect(pack(g).map(c => [c.x, c.z])).toEqual(before);
  }, 60000);
});

describe("the wake-up (Ed: \"all the animals glow red, the sigils start glowing, and after 8 seconds, they all awaken and become wild animals\")", () => {
  it("starts on the next bar line as she sets foot on its floor (landing inside the same as walking in) and wakes them 4 bars on", () => {
    for (const how of ["walk", "land"] as const) {
      const g = game(), ch = g.challenge!;
      if (how === "walk") { put(g, 0, -(ch.radius + 1)); run(g, 0.3); put(g, 0, -(ch.radius - 1)); } else put(g, 0, 0, "ground");
      const steppedAt = beatAt(g.beat, g.clock.time);
      stepGame(g, still, STEP);
      expect(phase(g), how).toBe("waking");
      const wake = g.challenge!.statues!.wake!;
      expect(wake % BAR_BEATS, how).toBe(0); // (a bar line)
      expect(wake, how).toBeGreaterThanOrEqual(steppedAt - 1e-9);
      expect(wake - steppedAt, how).toBeLessThanOrEqual(BAR_BEATS + 1e-9); // (the next one)
      expect(pack(g).every(c => c.statue === "stone" && !invitableNow(c)), how).toBe(true); // (still stone while they wake)
      const due = timeAt(g.beat, wake + BAR_BEATS * BARS), woke = runUntil(g, () => phase(g) === "awake", 20);
      expect(woke, how).not.toBeNull();
      expect(Math.abs(woke! - due), how).toBeLessThanOrEqual(STEP + 1e-9); // (on that bar, to the step)
      expect(due - timeAt(g.beat, wake), how).toBeCloseTo(BARS * BAR_BEATS * 60 / TUNING.beat.bpm, 3); // (8 s at the steady 120 bpm)
    }
  }, 120000);

  it("glows red over its bars (wakeK from 0 at its bar line to 1), the warning's sound with it, then a wild pack that hunts her at once", () => {
    const g = game(), ch = g.challenge!;
    put(g, 0, 0);
    stepGame(g, still, STEP);
    const wake = g.challenge!.statues!.wake!;
    runUntil(g, () => beatAt(g.beat, g.clock.time) >= wake + BAR_BEATS * BARS / 2, 12);
    expect(wakeK(g)).toBeCloseTo(0.5, 1);
    expect(wakeAggro(g)?.k).toBeCloseTo(0.5, 1);
    expect(g.wildEntry.has(ch.key)).toBe(false); // (no wild watch: the wake-up is its warning)
    runUntil(g, () => phase(g) === "awake", 12);
    expect(wakeK(g)).toBeNull();
    const e = g.wildEntry.get(ch.key)!;
    expect(e.until).toBe(e.at); // (the watch over already)
    expect(pack(g).every(c => c.statue === undefined && invitableNow(c) && !dormant(g, c))).toBe(true);
    run(g, 0.2);
    expect(pack(g).some(c => c.hunting === 0)).toBe(true);
  }, 60000);

  it("stops if she leaves before they wake, stepping out or flying off: they stay stone", () => {
    for (const how of ["step", "fly"] as const) {
      const g = game(), ch = g.challenge!;
      put(g, 0, 0); stepGame(g, still, STEP);
      const wake = g.challenge!.statues!.wake!;
      runUntil(g, () => beatAt(g.beat, g.clock.time) >= wake + 4, 12);
      if (how === "step") put(g, 0, -(ch.radius + 2)); else put(g, 0, 0, "treetop");
      stepGame(g, still, STEP);
      expect(phase(g), how).toBe("stone");
      run(g, 10);
      expect(phase(g), how).toBe("stone");
      expect(pack(g).every(c => c.statue === "stone"), how).toBe(true);
      expect(g.wildEntry.has(ch.key), how).toBe(false);
    }
  }, 60000);
});

/** Where (dx, dz from the circle's middle) the challenge area ends, due south, and 15 m on: ground outside its area. */
function outside(g: Game): [number, number] {
  const ch = g.challenge!;
  for (let d = ch.radius; d < ch.radius + 600; d += 2) if (cellKey(areaCellAt(g.map, ch.x, ch.z + d)) !== ch.key) return [0, d + 15];
  throw new Error("no edge to the challenge area due south");
}
/** Awake, her on its floor. */
const awake = (g: Game) => { put(g, 0, 0); runUntil(g, () => phase(g) === "awake", 14); expect(phase(g)).toBe("awake"); run(g, 0.5); };
const hunting = (g: Game) => pack(g).filter(c => c.hunting !== undefined).length;

describe("the fight goes on (Ed, 2026-11-04, on #1804: \"only being in the outside of the area while at treetops should end the fight, otherwise they pursue you and don't reset\")", () => {
  it("stepping off the floor, walking its area outside the circle, or in the treetops over its area: they keep after her, no reset", () => {
    const g = game(), ch = g.challenge!;
    awake(g);
    for (const [dx, dz, mode] of [[0, -(ch.radius + 2), "ground"], [0, ch.radius + 1, "ground"], [0, 0, "treetop"]] as const) {
      put(g, dx, dz, mode); run(g, 1);
      expect(phase(g), `${dx},${dz} ${mode}`).toBe("awake");
      expect(pack(g).every(c => c.statue === undefined), `${dx},${dz} ${mode}`).toBe(true);
    }
  }, 60000);

  it("knocked out of the circle (thrown off its floor), they keep after her", () => {
    const g = game(), ch = g.challenge!;
    awake(g);
    put(g, 0, ch.radius + 4); // (where a blow threw her, past its edge, on her feet)
    run(g, 2);
    expect(phase(g)).toBe("awake");
    expect(hunting(g)).toBeGreaterThan(0);
  }, 60000);

  it("on the ground outside its area, they pursue her there and don't reset", () => {
    const g = game(), [dx, dz] = outside(g);
    awake(g);
    expect(hunting(g)).toBeGreaterThan(0);
    put(g, dx, dz); run(g, 3);
    expect(phase(g)).toBe("awake");
    expect(hunting(g)).toBeGreaterThan(0);
    expect(pack(g).every(c => c.statue === undefined)).toBe(true);
  }, 60000);
});

describe("back to stone (Ed, 2026-11-04: up in the treetops outside its area, or knocked down; the un-won to their posts as stone, reset to full)", () => {
  it("flying off outside its area mid-fight: the un-won walk back to their posts and turn to stone, whole; the invited stay won", () => {
    const g = game(), ch = g.challenge!, P = pack(g), won = P[0], hurt = P[1], loved = P[2], [dx, dz] = outside(g);
    awake(g);
    befriend(won, g.clock.time);
    hurt.hp = 1; hurt.hurtAt = g.clock.time; loved.affection = 0.6; loved.affectionAt = g.clock.time;
    P[3].dazed = true; P[3].dazedUntil = g.clock.time + 5; // (knocked down, waiting for her 💌)
    const left = challengeColumns(g).reduce((n, col) => n + col.sigils.length, 0);
    put(g, dx, dz, "treetop");
    stepGame(g, still, STEP);
    expect(phase(g)).toBe("stone");
    expect(g.wildEntry.has(ch.key)).toBe(false);
    expect(stateOf(won)).toBe("happy"); expect(won.statue).toBeUndefined();
    for (const c of P.slice(1)) {
      expect(c.statue === "back" || c.statue === "stone").toBe(true);
      expect([c.hp, c.affection, c.dazed, c.hunting, c.fight]).toEqual([undefined, undefined, undefined, undefined, undefined]);
      expect(invitableNow(c)).toBe(false);
    }
    expect(challengeColumns(g).reduce((n, col) => n + col.sigils.length, 0)).toBe(left); // (the won one's column as it was)
    run(g, 20);
    const posts = postsOf(g);
    for (const c of P.slice(1)) {
      expect(c.statue).toBe("stone");
      expect(Math.hypot(c.x - posts.get(c.id)!.x, c.z - posts.get(c.id)!.z)).toBeLessThan(1e-6);
    }
    // Stepping in again: a fresh wake-up.
    put(g, 0, 0); stepGame(g, still, STEP);
    expect(phase(g)).toBe("waking");
  }, 90000);

  it("knocked down in the circle does the same, her sigils falling as ever", () => {
    const g = game(), W = g.witches[0];
    awake(g);
    W.health.hp = 1; W.health.hurtAt = -Infinity;
    hitWitch(g, 0, g.clock.time); // (her last hit: knocked out where she stands)
    expect(W.ko).toBeTruthy();
    stepGame(g, still, STEP);
    expect(phase(g)).toBe("stone");
    expect(pack(g).filter(c => stateOf(c) !== "happy").every(c => c.statue !== undefined)).toBe(true);
  }, 90000);
});

describe("its won ones out of the fight's way (Ed, 2026-11-04, on #1804: \"they should roam the whole area, and avoid creatures that are fighting\")", () => {
  it("while it's on, walk off the circle and roam its area clear of the circle and of the fighters; stone again, they're left be", () => {
    const g = game(), ch = g.challenge!, S = TUNING.challenge!.statues!, A = TUNING.invites.wonAway!.radius, P = pack(g);
    awake(g);
    const won = P.slice(0, 3);
    for (const c of won) befriend(c, g.clock.time);
    const spots: string[] = [];
    let samples = 0, close = 0;
    const out = runUntil(g, () => won.every(c => Math.hypot(c.x - ch.x, c.z - ch.z) >= ch.radius + S.keepOut - 0.1), 90); // (walking out at its pace: a snail's slow; 30 s before the circle grew to 50 m, Ed on #1827; 60 s before the bee took the marten's place on home, 2026-11-12: bees range about a fight as the moth does, and the toad, keeping clear of them, is 65 s getting out where it was 40)
    expect(out).not.toBeNull();
    for (let i = 0; i < 12 * 60; i++) {
      stepGame(g, still, STEP);
      for (const c of won) {
        expect(Math.hypot(c.x - ch.x, c.z - ch.z), `${c.id}`).toBeGreaterThanOrEqual(ch.radius + S.keepOut - 0.2); // (0.1 before areas grew to 196 m, 2026-11-04: one came 10.3 cm in for a step on this map, walking out at its pace)
        let m = Infinity;
        for (const f of P) if (f.hunting !== undefined || f.fight?.target) m = Math.min(m, Math.hypot(f.x - c.x, f.z - c.z));
        samples++; if (m < A) close++;
        if (i % 60 === 0) spots.push(`${Math.round(c.x)},${Math.round(c.z)}`);
      }
    }
    expect(phase(g)).toBe("awake");
    expect(close / samples).toBeLessThan(0.1); // (kept from the fighters: one passing close, it backs off at its pace)
    expect(new Set(spots).size).toBeGreaterThan(3); // (roaming, not waiting in one place)
  }, 90000);
});

describe("two witches (either starts it; stone again only once both are out of the fight)", () => {
  it("starts for either, and holds till both are knocked down or up in the treetops outside its area", () => {
    const g = game(), ch = g.challenge!, [dx, dz] = outside(g);
    const W = newWitchPlayer(1, ch.x + ch.radius + 30, ch.z, TUNING, false);
    W.body.perch = undefined; W.health.hp = 1e6; g.witches.push(W);
    const two = (): Controls[] => [still, still];
    put(g, 0, 0, "treetop", 0); put(g, 1, 0, "ground", 1); // (the second witch steps in)
    stepGame(g, two(), STEP);
    expect(phase(g)).toBe("waking");
    runUntil(g, () => phase(g) === "awake", 14, two());
    expect(phase(g)).toBe("awake");
    put(g, dx, dz, "treetop", 0); stepGame(g, two(), STEP); // (the first flies off outside its area: the second's still in it)
    expect(phase(g)).toBe("awake");
    put(g, dx + 3, dz, "treetop", 1); stepGame(g, two(), STEP); // (and the second: both out)
    expect(phase(g)).toBe("stone");
  }, 90000);
});

describe("lockstep", () => {
  it("comes out the same from the same night and the same moves", () => {
    const play = () => {
      const g = game();
      const ch = g.challenge!;
      put(g, 0, 0); runUntil(g, () => phase(g) === "awake", 14); run(g, 2);
      befriend(pack(g)[0], g.clock.time); run(g, 2); const [dx, dz] = outside(g);
      put(g, dx, dz, "treetop"); run(g, 3); put(g, 2, 2); run(g, 1);
      return JSON.stringify({ st: ch.statues, pack: pack(g).map(c => [c.id, c.statue, +c.x.toFixed(6), +c.z.toFixed(6), c.hp, c.hunting]) , t: g.clock.time });
    };
    expect(play()).toBe(play());
  }, 120000);

  it("saves and restores its phase and its statues", () => {
    const g = game();
    put(g, 0, 0); stepGame(g, still, STEP);
    const back = restoreGame(JSON.parse(JSON.stringify(snapshotGame(g))));
    expect(back.challenge!.statues).toEqual(g.challenge!.statues);
    expect(back.challenge!.statues!.phase).toBe("waking");
    expect(pack(back).map(c => c.statue)).toEqual(pack(g).map(c => c.statue));
  }, 60000);
});

describe("off", () => {
  it("leaves the pack wild from the start, watching her come down anywhere in its area as before", () => {
    const t = withTuning({ challenge: { ...TUNING.challenge!, statues: { ...TUNING.challenge!.statues!, on: false } } });
    const g = game("fox", 2, t), ch = g.challenge!;
    expect(ch.statues).toBeUndefined();
    expect(pack(g).every(c => c.statue === undefined)).toBe(true);
    put(g, 0, 0); run(g, 0.2);
    expect(g.wildEntry.get(ch.key)!.until - g.wildEntry.get(ch.key)!.at).toBeCloseTo(TUNING.wildWatch!.time, 6);
  }, 60000);
});
