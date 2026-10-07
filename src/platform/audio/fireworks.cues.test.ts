import { describe, expect, it } from "vitest";
import { newGame } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import type { Sfx } from "./sfx";
import { SfxCues } from "./sfxCues";
import { fireworkShells } from "../../rules/fireworks";

/** A stand-in for the sound effects: every call does nothing, the fireworks' are logged with the game time. */
function fakeSfx(clock: { t: number }) {
  const log: { what: string; t: number; near: number }[] = [];
  const sfx = new Proxy({}, { get: (_, k) => typeof k === "string" && k.startsWith("firework") ? (...a: number[]) => log.push({ what: k, t: clock.t, near: a[a.length - 1] }) : () => {} }) as unknown as Sfx;
  return { sfx, log };
}

describe("fireworks over a cleared area's soundsystem (waveCelebrate)", () => {
  it("whooshes each shell of the drawn show up, bursts it once its sound has reached her, and cheers once at the finale", () => {
    const g = newGame(123, TUNING), w = g.witch, clock = { t: 0 }, F = g.tuning.sfx.fireworks!;
    const { sfx, log } = fakeSfx(clock), cues = new SfxCues(sfx);
    const e = { kind: "waveCelebrate" as const, key: "3,4", x: w.x + 100, z: w.z, at: 10, wave: 2 };
    const shells = fireworkShells(e.x, e.z, e.at, g.tuning);
    for (let t = 10; t < 18; t += 1 / 60) {
      clock.t = t;
      g.waveEvents = t === 10 ? [e] : [];
      cues.update(g, t);
    }
    const whooshes = log.filter(l => l.what === "fireworkWhoosh"), bursts = log.filter(l => l.what === "fireworkBurst"), cheers = log.filter(l => l.what === "fireworkCheer");
    expect(whooshes).toHaveLength(shells.length);
    expect(bursts).toHaveLength(shells.length);
    expect(cheers).toHaveLength(1);
    expect(cheers[0].t).toBeGreaterThanOrEqual(shells[shells.length - 1].burst + 0.3 - 1e-9);
    // each burst heard on the first frame its sound has reached her (the order they arrive in, not their launch order)
    const due = shells.map(s => s.burst + Math.hypot(s.x - w.x, s.height, s.z - w.z) / F.speed).sort((a, b) => a - b);
    bursts.forEach((b, i) => {
      expect(b.t).toBeGreaterThanOrEqual(due[i] - 1e-9);
      expect(b.t).toBeLessThan(due[i] + 0.02);
    });
    // out of earshot: nothing
    log.length = 0;
    const far = { ...e, at: 20, x: w.x + F.range + 100 };
    for (let t = 20; t < 28; t += 1 / 60) { clock.t = t; g.waveEvents = t === 20 ? [far] : []; cues.update(g, t); }
    expect(log).toHaveLength(0);
  });
});
