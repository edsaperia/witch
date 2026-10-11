// Stargazing party witches (Ed, 2026-10-11, docs/backlog/creator-and-house.md): "when a soundsystem is destroyed its party witch doesn't
// leave; she leaves the dancefloor and lies down to stargaze ... around the party area outside the speaker ring, in pairs and
// threes where possible. At the end of the night everyone lies there looking up. She can interact with them like the beach
// witches."
import { describe, expect, it } from "vitest";
import { MEET_SEQUENCE, newPartyWitches, stepPartyWitches, type Night, type PartyWitches, type PlayerView } from "./partyWitches";
import { TUNING } from "./tuning";

const t = TUNING, floor = { x: 100, z: 200, radius: 13.5, ring: 28.5 }, P = t.partyWitches, G = P.gaze!;
const areas = (n: number) => Array.from({ length: n }, (_, i) => ({ key: `a${i}`, x: floor.x + Math.cos(i) * 150, z: floor.z + Math.sin(i) * 150 }));
const run = (s: PartyWitches, as: ReturnType<typeof areas>, secs: number, from = 0, night: Night = {}, players: PlayerView[] = []) => {
  let time = from;
  for (let i = 0; i < secs * 20; i++) { time += 0.05; stepPartyWitches(s, as, floor, players, time, 0.05, t, night); }
  return time;
};
const fromMiddle = (w: { x: number; z: number }) => Math.hypot(w.x - floor.x, w.z - floor.z);

describe("stargazing party witches (Ed, 2026-10-11)", () => {
  it("her soundsystem ruined, she stays and lies down to stargaze out past the speakers' ring; the others party on", () => {
    const s = newPartyWitches(5), as = areas(6);
    let time = run(s, as, 40);
    const gone = s.list[2].area, ruined = new Set([gone]), left = as.filter(a => a.key !== gone);
    time = run(s, left, 30, time, { ruined });
    const her = s.list.find(w => w.area === gone)!;
    expect(her.state).toBe("gazing");
    expect(her.pose).toBe("stargaze");
    expect(her.y).toBe(0);
    expect(fromMiddle(her)).toBeGreaterThan(floor.ring);
    expect(fromMiddle(her)).toBeLessThan(floor.ring + G.to + G.gap * 2);
    expect(s.list.filter(w => w.state === "gazing").length).toBe(1);
    // A soundsystem that just stops (not ruined) still sees its witch fly off.
    const off = left[0].key;
    run(s, left.filter(a => a.key !== off), 1, time, { ruined });
    expect(s.list.find(w => w.area === off)?.state).toBe("leaving");
  });

  it("they lie in pairs and threes, side by side, the newest bed filled before another is begun", () => {
    const s = newPartyWitches(9), as = areas(9);
    let time = run(s, as, 40);
    const ruined = new Set<string>();
    for (const a of as) { ruined.add(a.key); time = run(s, as.filter(q => !ruined.has(q.key)), 3, time, { ruined }); }
    time = run(s, [], 30, time, { ruined });
    expect(s.list.every(w => w.state === "gazing" && w.pose === "stargaze")).toBe(true);
    const beds = s.beds!;
    expect(beds.every(b => b.cap === 2 || b.cap === 3)).toBe(true);
    expect(beds.slice(0, -1).every(b => b.n === b.cap)).toBe(true); // (only the newest can be part-filled)
    expect(beds.reduce((n, b) => n + b.n, 0)).toBe(9);
    // Each bed's witches lie side by side, one behind another gap apart, the same way round.
    for (const b of beds) {
      const mine = s.list.filter(w => w.bed && Math.abs(w.bed.z - b.z) <= G.gap * 1.01 && Math.abs(w.bed.x - b.x) <= G.stagger * 1.01).sort((p, q) => p.z - q.z);
      expect(mine.length).toBe(b.n);
      expect(new Set(mine.map(w => w.facing)).size).toBe(1);
      for (let i = 1; i < mine.length; i++) expect(mine[i].z - mine[i - 1].z).toBeCloseTo(G.gap, 6);
    }
    // No two witches lie on top of each other: a bed's are a gap apart, other beds well clear.
    for (const a of s.list) for (const b of s.list) if (a !== b) expect(Math.abs(a.x - b.x) > G.length || Math.abs(a.z - b.z) >= G.gap * 0.99).toBe(true);
  });

  it("at the end of the night everyone lies looking up, and nobody more flies in", () => {
    const s = newPartyWitches(11), as = areas(5);
    let time = run(s, as, 40);
    time = run(s, as, 30, time, { over: true });
    expect(s.list.length).toBe(5);
    expect(s.list.every(w => w.state === "gazing" && w.pose === "stargaze" && fromMiddle(w) > floor.ring)).toBe(true);
    run(s, areas(7), 5, time, { over: true });
    expect(s.list.length).toBe(5);
  });

  it("out of sight they're simply lying in their places", () => {
    const s = newPartyWitches(13), as = areas(4);
    let time = run(s, as, 40);
    const far = [{ x: floor.x + 5000, z: floor.z, onFoot: true, moving: false }];
    time = run(s, as, 0.1, time, { over: true }, far);
    expect(s.list.every(w => w.state === "gazing" && w.pose === "stargaze" && w.bed && w.x === w.bed.x && w.z === w.bed.z)).toBe(true);
  });

  it("keeping still by one, she gets up and they take the beach's turns; moving off, she lies back down in her place", () => {
    const s = newPartyWitches(17), as = areas(3);
    let time = run(s, as, 40);
    time = run(s, as, 30, time, { over: true });
    const bed = { ...s.list[0].bed! };
    const me: PlayerView = { x: bed.x + 2, z: bed.z + 1, onFoot: true, moving: false };
    const seen: string[] = [];
    for (let i = 0; i < (P.idleAfter + G.turn * 4) * 20; i++) {
      time += 0.05; stepPartyWitches(s, as, floor, [me], time, 0.05, t, { over: true });
      const I = s.gaze?.[0];
      if (I?.pose && seen[seen.length - 1] !== I.pose) seen.push(I.pose);
    }
    expect(seen.slice(0, 4)).toEqual(MEET_SEQUENCE.map(q => q.pose));
    const mate = s.list.find(w => w.id === s.gaze![0].partner)!, home = { ...mate.bed! }; // (the nearest: maybe one of her bedmates)
    expect(mate.partner).toBe(-1);
    expect(mate.pose).toBe("stargaze");
    expect(Math.hypot(mate.x - me.x, mate.z - me.z)).toBeLessThan(2); // (lying beside her)
    expect(s.players[0]?.activity ?? null).toBeNull(); // (not idling into the party at the same time)
    // She moves off: the witch goes back and lies down again.
    run(s, as, 0.1, time, { over: true }, [{ ...me, moving: true }]);
    expect(s.gaze?.[0]?.activity).toBeNull();
    run(s, as, 10, time + 0.1, { over: true }, [{ ...me, x: me.x + 20, moving: true }]);
    expect(mate.partner).toBeNull();
    expect(mate.pose).toBe("stargaze");
    expect(Math.hypot(mate.x - home.x, mate.z - home.z)).toBeLessThan(1e-6);
  });
});
