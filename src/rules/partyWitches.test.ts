import { describe, expect, it } from "vitest";
import { newPartyWitches, pairOffset, stepPartyWitches, type PartyWitches, type PlayerView } from "./partyWitches";
import { TUNING } from "./tuning";

const t = TUNING, floor = { x: 100, z: 200, radius: 15 }, P = t.partyWitches;
const areas = (n: number) => Array.from({ length: n }, (_, i) => ({ key: `a${i}`, x: floor.x + Math.cos(i) * 150, z: floor.z + Math.sin(i) * 150 }));
const run = (s: PartyWitches, as: ReturnType<typeof areas>, secs: number, from = 0, players: PlayerView[] = [], each?: (time: number) => void) => {
  let time = from;
  for (let i = 0; i < secs * 20; i++) { time += 0.05; stepPartyWitches(s, as, floor, players, time, 0.05, t); each?.(time); }
  return time;
};

describe("party witches (Ed, 2026-10-04)", () => {
  it("one flies in for each playing soundsystem, at most max, and lands on the floor clear of the speakers", () => {
    const s = newPartyWitches(1);
    run(s, areas(5), 1);
    expect(s.list.length).toBe(5);
    expect(s.list.every(w => w.state === "arriving" && w.y > 0)).toBe(true);
    run(s, areas(5), P.arriveTime + 1, 1);
    expect(s.list.every(w => w.state === "floor")).toBe(true);
    const s2 = newPartyWitches(2);
    run(s2, areas(P.max + 10), 1);
    expect(s2.list.length).toBe(P.max);
  });

  it("stays on the floor through her activities, pairs are mutual, and flies off when her soundsystem stops", () => {
    const s = newPartyWitches(3), as = areas(8), seen = new Set<string>();
    run(s, as, 120, 0, [], () => {
      for (const w of s.list) {
        seen.add(w.activity);
        if (w.state !== "floor") continue;
        if (w.activity !== "fly") expect(Math.hypot(w.x - floor.x, w.z - floor.z)).toBeLessThanOrEqual(floor.radius * P.floorShare + 1e-6);
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
});
