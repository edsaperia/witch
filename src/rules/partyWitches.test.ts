import { describe, expect, it } from "vitest";
import { newPartyWitches, OFF_FLOOR, pairOffset, stepPartyWitches, type PartyWitches, type PlayerView } from "./partyWitches";
import { TUNING } from "./tuning";

const t = TUNING, floor = { x: 100, z: 200, radius: 15 }, P = t.partyWitches;
const areas = (n: number) => Array.from({ length: n }, (_, i) => ({ key: `a${i}`, x: floor.x + Math.cos(i) * 150, z: floor.z + Math.sin(i) * 150 }));
const run = (s: PartyWitches, as: ReturnType<typeof areas>, secs: number, from = 0, players: PlayerView[] = [], each?: (time: number) => void) => {
  let time = from;
  for (let i = 0; i < secs * 20; i++) { time += 0.05; stepPartyWitches(s, as, floor, players, time, 0.05, t); each?.(time); }
  return time;
};

describe("party witches (Ed, 2026-10-04)", () => {
  it("one flies in for each playing soundsystem, however many (Ed, 2026-10-06), and lands round the floor", () => {
    const s = newPartyWitches(1);
    run(s, areas(5), 1);
    expect(s.list.length).toBe(5);
    expect(s.list.every(w => w.state === "arriving" && w.y > 0)).toBe(true);
    run(s, areas(5), P.arriveTime + 1, 1);
    expect(s.list.every(w => w.state === "floor")).toBe(true);
    const s2 = newPartyWitches(2);
    run(s2, areas(130), 1);
    expect(s2.list.length).toBe(130); // no cap
  });

  it("stays within roam of the floor through her activities, pairs are mutual, and flies off when her soundsystem stops", () => {
    const s = newPartyWitches(3), as = areas(8), seen = new Set<string>();
    run(s, as, 120, 0, [], () => {
      for (const w of s.list) {
        seen.add(w.activity);
        if (w.state !== "floor") continue;
        if (w.activity !== "fly" && w.activity !== "swoop") expect(Math.hypot(w.x - floor.x, w.z - floor.z)).toBeLessThanOrEqual(P.roam + 1e-6);
        if (w.partner !== null && w.partner >= 0 && !w.third) { const o = s.list.find(p => p.id === w.partner)!; expect(o.partner).toBe(w.id); }
        if (w.third) { const o = s.list.find(p => p.id === w.partner)!; expect(o.pose).toBe("limboHold"); }
      }
    });
    for (const a of ["dance", "pair"]) expect(seen.has(a)).toBe(true);
    const gone = s.list[0].area;
    const time = run(s, as.filter(a => a.key !== gone), 1, 200);
    expect(s.list.find(w => w.area === gone)?.state).toBe("leaving");
    run(s, as.filter(a => a.key !== gone), P.arriveTime + 1, time);
    expect(s.list.some(w => w.area === gone)).toBe(false);
  });

  it("a partner stands beside the one who leads", () => {
    const s = newPartyWitches(5);
    let checked = 0;
    run(s, areas(10), 200, 0, [], () => {
      for (const w of s.list) {
        if (w.state !== "floor" || w.partner === null || w.partner < 0 || w.lead || w.activity !== "pair") continue;
        if (w.third) continue;
        const o = s.list.find(p => p.id === w.partner)!, off = pairOffset(o.pose, o.facing, t);
        if (o.pose !== "holdHands" && Math.hypot(w.x - (o.x + off.dx), w.z - (o.z + off.dz)) < 0.05) checked++;
      }
    });
    expect(checked).toBeGreaterThan(0);
  });

  it("the player idles into the party after idleAfter seconds still on foot by the floor, and any input stops it", () => {
    const s = newPartyWitches(7), p: PlayerView = { x: floor.x + 2, z: floor.z, onFoot: true, moving: false };
    let time = run(s, areas(3), P.idleAfter - 0.5, 0, [p]);
    expect(s.players[0].activity).toBeNull();
    time = run(s, areas(3), 1, time, [p]);
    expect(s.players[0].activity).not.toBeNull();
    run(s, areas(3), 0.05, time, [{ ...p, moving: true }]);
    expect(s.players[0].activity).toBeNull();
    expect(s.list.some(w => w.partner === -1)).toBe(false);
    // Far from the floor, or in the air: never.
    const s2 = newPartyWitches(8);
    run(s2, areas(3), P.idleAfter + 5, 0, [{ ...p, x: floor.x + 200 }]);
    expect(s2.players[0].activity).toBeNull();
    run(s2, areas(3), P.idleAfter + 5, 20, [{ ...p, onFoot: false }]);
    expect(s2.players[0].activity).toBeNull();
  });

  it("the twirl and the broom limbo: partners do the partner's pose, and a third shuffles under the bar", () => {
    const s = newPartyWitches(11), seen = new Set<string>();
    run(s, areas(14), 400, 0, [], () => { for (const w of s.list) if (w.state === "floor") seen.add(w.pose); });
    for (const p of ["twirl", "twirled", "limboHold", "limboHelp", "limbo"]) expect(seen.has(p)).toBe(true);
  });

  it("wanders within 40 m of the floor's middle, mildly preferring it (Ed, 2026-10-06)", () => {
    expect(P.roam).toBe(40);
    const s = newPartyWitches(21); let sum = 0, n = 0, far = 0, onIt = 0;
    run(s, areas(30), 300, 0, [], () => {
      for (const w of s.list) {
        if (w.state !== "floor" || w.y > 0.2) continue;
        const d = Math.hypot(w.x - floor.x, w.z - floor.z);
        expect(d).toBeLessThanOrEqual(40 + 1e-6);
        sum += d; n++; if (d > floor.radius * 1.5) far++; if (d < floor.radius) onIt++;
      }
    });
    expect(sum / n).toBeLessThan(20); // nearer the middle more often
    expect(far / n).toBeGreaterThan(0.15); // but the crowd spills out round it
    expect(onIt / n).toBeGreaterThan(0.2); // and the floor stays busy
  });
  it("keeps clear of what stands round the floor", () => {
    const s = newPartyWitches(23), blocked = (x: number, _z: number) => x > floor.x + 20; // (a stand of trees to the east)
    for (let i = 0; i < 4000; i++) { const time = i * 0.05; stepPartyWitches(s, areas(20), { ...floor, clear: (x, z) => !blocked(x, z) }, [], time, 0.05, t);
      for (const w of s.list) if (w.state === "floor" && w.activity !== "run" && w.y <= 0.2 && w.partner === null) expect(blocked(w.x, w.z) && Math.hypot(w.x - w.tx, w.z - w.tz) < 0.3).toBe(false); }
  });
  it("never drinks, rests, chats or holds hands on the dancefloor itself", () => {
    const s = newPartyWitches(25), seen = new Set<string>();
    run(s, areas(30), 400, 0, [], () => {
      for (const w of s.list) {
        if (w.state !== "floor") continue;
        if (OFF_FLOOR.has(w.activity) || w.pose === "holdHands") { seen.add(w.activity); expect(Math.hypot(w.x - floor.x, w.z - floor.z)).toBeGreaterThanOrEqual(floor.radius - 1e-6); }
      }
    });
    for (const a of ["drink", "rest", "chat"]) expect(seen.has(a)).toBe(true);
  });
  it("swoops up over the treetops and down again, much more often while a player's up there", () => {
    const count = (treetop: boolean) => {
      const s = newPartyWitches(27); let starts = 0, top = 0; const was = new Map<number, boolean>();
      run(s, areas(30), 300, 0, [{ x: floor.x, z: floor.z + 60, onFoot: false, moving: true, treetop }], () => {
        for (const w of s.list) { const sw = w.activity === "swoop"; if (sw && !was.get(w.id)) starts++; was.set(w.id, sw); top = Math.max(top, w.y); }
      });
      return { starts, top };
    };
    const ground = count(false), up = count(true);
    expect(up.starts).toBeGreaterThan(ground.starts * 2.5);
    expect(up.top).toBeGreaterThan(24); // over the 24 m treetops
  });
  it("swoops to random heights, lower hops and soaring well over the treetops", () => {
    const s = newPartyWitches(29), peaks: number[] = [];
    run(s, areas(30), 400, 0, [{ x: floor.x, z: floor.z + 60, onFoot: false, moving: true, treetop: true }], () => { for (const w of s.list) if (w.activity === "swoop" && w.peak !== undefined && !peaks.includes(w.peak)) peaks.push(w.peak); });
    expect(peaks.length).toBeGreaterThan(10);
    for (const p of peaks) { expect(p).toBeGreaterThanOrEqual(P.swoopHeight * P.swoopMin - 1e-9); expect(p).toBeLessThanOrEqual(P.swoopHeight * P.swoopMax + 1e-9); }
    expect(Math.min(...peaks)).toBeLessThan(P.swoopHeight * 0.85); expect(Math.max(...peaks)).toBeGreaterThan(P.swoopHeight * 1.4);
  });
  it("is left alone while no player is near enough to see it, and lively again at once when one comes back", () => {
    const s = newPartyWitches(31), far: PlayerView = { x: floor.x + P.simRange + 50, z: floor.z, onFoot: true, moving: true }, near = { ...far, x: floor.x + 20 };
    let time = run(s, areas(10), 20, 0, [near]);
    const before = s.list.map(w => [w.x, w.z, w.activity].join());
    time = run(s, areas(10), 20, time, [far]);
    expect(s.list.map(w => [w.x, w.z, w.activity].join())).toEqual(before); // nothing moved or changed
    expect(s.idle).toBe(true);
    // a new soundsystem's witch still arrives (who's here is kept)
    time = run(s, areas(11), 1, time, [far]);
    expect(s.list.length).toBe(11);
    // from the treetops further off it's still stepped (swoops are seen from afar)
    run(s, areas(11), 1, time, [{ ...far, treetop: true }]);
    expect(s.idle).toBe(false);
    // back in range: everyone picks something new straight away
    const s2 = newPartyWitches(33); let t2 = run(s2, areas(10), 20, 0, [near]); t2 = run(s2, areas(10), 5, t2, [far]);
    run(s2, areas(10), 0.05, t2, [near]);
    expect(s2.list.filter(w => w.state === "floor").every(w => w.until > t2)).toBe(true);
  });
});
