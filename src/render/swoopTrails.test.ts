// The party witches' swoop trails (render/swoopTrails.ts, Ed 2026-10-06): only while they swoop, rising out of the canopy and
// trailing out as they land, each witch her own colours, faded in as she lifts off, the pool never overrun.
import { describe, expect, it } from "vitest";
import { newPartyWitches, stepPartyWitches, type PartyWitch } from "../rules/partyWitches";
import { TUNING } from "../rules/tuning";
import { SWOOP_TRAIL_DEFAULT, SwoopTrails } from "./swoopTrails";

const floor = { x: 0, z: 0, radius: 15 };
const areas = (n: number) => Array.from({ length: n }, (_, i) => ({ key: `a${i}`, x: Math.cos(i) * 150, z: Math.sin(i) * 150 }));
const up = [{ x: 0, z: 60, onFoot: false, moving: true, treetop: true }];

function run(tr: SwoopTrails, n: number, secs: number, each: (time: number, list: readonly PartyWitch[]) => void) {
  const s = newPartyWitches(41), as = areas(n);
  for (let i = 0, time = 0; i < secs * 20; i++) { time += 0.05; stepPartyWitches(s, as, floor, up, time, 0.05, TUNING); tr.update(s.list, time); each(time, s.list); }
}
const verts = (tr: SwoopTrails) => {
  const g = tr.mesh.geometry, idx = g.getIndex()!.array as Uint16Array, pos = g.getAttribute("position").array as Float32Array;
  const a = g.getAttribute("aA").array as Float32Array, hue = g.getAttribute("aHue").array as Float32Array, used = new Set<number>();
  for (let i = 0; i < g.drawRange.count; i++) used.add(idx[i]);
  return [...used].map(v => ({ x: pos[v * 3], y: pos[v * 3 + 1], z: pos[v * 3 + 2], a: a[v], hue: hue[v] }));
};

describe("party witches' swoop trails", () => {
  it("are drawn only for witches swooping (or just landed), rise over the treetops, and have no NaN", () => {
    const tr = new SwoopTrails();
    let top = 0, most = 0, frames = 0;
    run(tr, 40, 120, (time, list) => {
      const swooping = list.filter(w => w.activity === "swoop" && w.y > 0.05).length;
      if (!swooping) return;
      frames++;
      expect(tr.drawn).toBeLessThanOrEqual(swooping + 12); // the swoopers, and a few trailing out
      for (const v of verts(tr)) { expect(Number.isFinite(v.x + v.y + v.z + v.a)).toBe(true); top = Math.max(top, v.y); }
      most = Math.max(most, tr.drawn);
      void time;
    });
    expect(frames).toBeGreaterThan(100);
    expect(top).toBeGreaterThan(TUNING.partyWitches.swoopHeight);
    expect(most).toBeGreaterThan(2);
  });
  it("gives each witch her own colours, running along her trail", () => {
    const tr = new SwoopTrails(), hues = new Set<number>();
    run(tr, 40, 60, () => { for (const v of verts(tr)) hues.add(Math.round(v.hue * 20)); });
    expect(hues.size).toBeGreaterThan(10);
  });
  it("fades in as she lifts off, and trails out to nothing once she's down", () => {
    const tr = new SwoopTrails(), w: PartyWitch = { id: 3, x: 0, z: 0, y: 0, activity: "swoop", state: "floor" } as PartyWitch;
    let time = 0;
    tr.update([w], time);
    w.y = 0.6; time += 0.05; tr.update([w], time);
    for (; w.y < 30; w.y += 1.5) { time += 0.05; tr.update([w], time); }
    const low = verts(tr).filter(v => v.y < 1.5), high = verts(tr).filter(v => v.y > 10);
    expect(Math.max(...low.map(v => v.a))).toBeLessThan(Math.min(...high.map(v => v.a)));
    expect(tr.drawn).toBe(1);
    w.activity = "dance"; w.y = 0;
    for (let i = 0; i < (SWOOP_TRAIL_DEFAULT.life + 0.2) * 20; i++) { time += 0.05; tr.update([w], time); }
    expect(tr.mesh.geometry.drawRange.count).toBe(0);
  });
  it("never draws more trails than its pool, and frees them for the next swoopers", () => {
    const tr = new SwoopTrails({ ...SWOOP_TRAIL_DEFAULT, slots: 3 }), list: PartyWitch[] = [];
    for (let i = 0; i < 8; i++) list.push({ id: i, x: i * 5, z: 0, y: 0.5, activity: "swoop", state: "floor" } as PartyWitch);
    for (let t = 0; t < 20; t++) { for (const w of list) w.y += 1; tr.update(list, t * 0.05); }
    expect(tr.drawn).toBe(3);
    for (const w of list.slice(0, 3)) { w.activity = "dance"; w.y = 0; }
    for (let t = 20; t < 80; t++) { for (const w of list.slice(3)) w.y += 0.5; tr.update(list, t * 0.05); }
    expect(tr.drawn).toBe(3); // the next three now
  });
});
