// What the music plays where (Ed, round 16: "Music is still starting and stopping unexpectedly. I heard it on the beach. I hear
// it stop on the dancefloor"): the mix the game asks of the music at known spots, the home ring booted and a wave partified.
import { describe, expect, it } from "vitest";
import { newGame } from "./game";
import { musicCue } from "./musicPlan";
import { musicMix } from "./music";
import { spreadWave } from "./party";
import { beachOf } from "./mapShape";
import { TUNING } from "./tuning";

// Keep the radius coastline: assertions need >200 m inland quiet and a continuous 400 m beach-to-forest fade.
describe("the music, place by place", () => {
  const g = newGame(123, TUNING), M = TUNING.music, d = g.map.dancefloor;
  g.clock.paused = false; g.party.spellAt = 0; g.party.bootFrom = 0;
  const risen = spreadWave(g.party, g.map, 1);
  g.clock.time = 2000; // (the ring booted long since, the wave's soundsystems risen)
  const at = (x: number, z: number) => musicMix(g, { x, z });
  const b = beachOf(g.map.bounds, TUNING)!, L = b.land, sea = L.loops.findIndex(l => l.sea), coast = (share: number) => L.along(sea, L.loops[sea].length * share);
  const sources = [{ x: d.x, z: d.z }, ...[...g.party.areas.values()].flatMap(a => (a.soundsystem ? [a.soundsystem] : []))];
  const far = (x: number, z: number) => Math.min(...sources.map(s => Math.hypot(s.x - x, s.z - z)));

  it("loudest and clear on the dancefloor and round its ring", () => {
    for (const [dx, dz] of [[0, 0], [12, 0], [0, -18]]) {
      const m = at(d.x + dx, d.z + dz);
      expect(m.volume, `${dx},${dz} from its middle`).toBeGreaterThan(0.95);
      expect(m.cutoff).toBeGreaterThan(10000);
      expect(m.distort).toBe(0);
    }
    const cue = musicCue(g); // (nothing there to muffle or stop it)
    expect(cue.circle).toBeUndefined();
    expect(cue.knockedOut).toBe(false);
  });

  it("loud at a partified area's soundsystem", () => {
    const s = [...g.party.areas.values()].find(a => a.wave > 0 && a.soundsystem)!.soundsystem!;
    expect(risen.length).toBeGreaterThan(0);
    expect(at(s.x, s.z).volume).toBeGreaterThan(0.95);
  });

  it("faint and muffled deep in the wild, far from every soundsystem and from the sea", () => {
    let spot: { x: number; z: number } | null = null;
    for (let k = 0; k < 400 && !spot; k++) {
      const a = k * 2.399, r = L.distAt(d.x, d.z) * 0.9 * Math.sqrt((k + 1) / 400), x = d.x + Math.cos(a) * r, z = d.z + Math.sin(a) * r;
      if (far(x, z) > M.farDist + 20 && b.intoSand(x, z) < -200) spot = { x, z };
    }
    expect(spot).not.toBeNull();
    const m = at(spot!.x, spot!.z);
    expect(m.volume).toBeCloseTo(M.floor, 2);
    expect(m.cutoff).toBeCloseTo(M.muffle, 0);
  });

  it("all but gone on the beach, and at the sea's edge only the waves", () => {
    for (const a of [0.05, 0.3, 0.6, 0.85]) {
      const p = coast(a), sand = { x: p.x - p.nx * 25, z: p.z - p.nz * 25 }, edge = { x: p.x + p.nx * (b.out + 1), z: p.z + p.nz * (b.out + 1) };
      expect(at(sand.x, sand.z).volume, `on the sand, ${a} round`).toBeLessThan(M.floor * 0.3);
      expect(at(edge.x, edge.z).volume, `at the water, ${a} round`).toBeLessThanOrEqual(M.floor * M.beach!.quiet + 1e-6);
    }
  });

  it("the forest just inland of the beach fades smoothly, never jumping", () => {
    const p = coast(0.4), n = L.inward(p.x - p.nx * 100, p.z - p.nz * 100); // (straight in from the coast)
    let prev = at(p.x + n.x * 400, p.z + n.z * 400).volume;
    for (let m = 399; m >= 0; m--) {
      const v = at(p.x + n.x * m, p.z + n.z * m).volume;
      expect(Math.abs(v - prev)).toBeLessThan(0.01);
      prev = v;
    }
  });
});
