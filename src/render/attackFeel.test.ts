import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { attackFeel, newFeel, ATTACK_FX_DEFAULT as T } from "./attackFeel";
import type { Creature } from "../rules/creatures";

const make = (o: Partial<Creature> = {}): Creature => ({ id: 1, species: "wolf", level: 2, x: 0, z: 0, ...o }) as Creature;

describe("attack feel", () => {
  it.each(["rhino", "unicorn"])("%s long-charge windup crouches, run/brake stretch, and home releases the pose", species => {
    const run: NonNullable<Creature["run"]> = { phase: "windup", at: 10, angle: 0, speed: 0, turn: 1, target: null, tx: 10, tz: 0, ran: 0, hit: [], fromX: 0, fromZ: 0 };
    const c = make({ species, level: 3, run });
    expect(attackFeel(c, 10, T, newFeel()).crouch).toBe(0);
    const winding = attackFeel(c, 12.4, T, newFeel());
    expect(winding.crouch).toBeGreaterThan(0.9); expect(winding.sy).toBeLessThan(1); expect(winding.sx).toBeGreaterThan(1);
    for (const phase of ["run", "brake"] as const) {
      run.phase = phase; const f = attackFeel(c, 13, T, newFeel());
      expect(f.lunging).toBe(true); expect(f.sx).toBe(1 + T.lungeStretch); expect(f.sy).toBe(1 - T.lungeStretch * 0.5);
    }
    run.phase = "home"; expect(attackFeel(c, 14, T, newFeel())).toEqual(newFeel());
  });
  it("pins no-run output bytes across idle, windup, lunge, hit and tumble", () => {
    const fight = { target: null, readyAt: 0, windupUntil: 2.5, aimX: 0, aimZ: 0 };
    const cases = [make(), make({ fight }), make({ fight: { ...fight, windupUntil: 0, lunge: { dx: 1, dz: 0, left: 5 } } }), make({ hurtAt: 1 }), make({ hurtAt: 1, kx: 72, kz: 0 }), make({ charge: { dx: 1, dz: 0, speed: 10, from: 1, until: 3 } })];
    const bytes = JSON.stringify(cases.map(c => [0, 0.5, 1, 1.1, 1.25, 1.5, 2, 2.4, 2.6, 3].map(t => ({ ...attackFeel(c, t, T, newFeel()) }))));
    expect(createHash("sha256").update(bytes).digest("hex")).toBe("3d0690a11e64fcb6dfb91f03c3812a3def511ff050f0033168c73441e5e18324");
  });
  it("is plain when nothing's happening, and fills the Feel it's given", () => {
    const out = newFeel(), f = attackFeel(make(), 5, T, out);
    expect(f).toBe(out);
    expect([f.sx, f.sy, f.hop, f.flip, f.crouch, f.lunging]).toEqual([1, 1, 0, false, 0, false]);
  });
  it("crouches deeper as the wind-up nears its blow", () => {
    const fight = { target: null, readyAt: 0, windupUntil: 10.5, aimX: 0, aimZ: 0 }, c = make({ fight });
    const a = attackFeel(c, 10, T, newFeel()).crouch, b = attackFeel(c, 10.4, T, newFeel());
    expect(a).toBe(0);
    expect(b.crouch).toBeGreaterThan(0.7);
    expect(b.sy).toBeLessThan(1);
  });
  it("stretches out in a lunge", () => {
    const f = attackFeel(make({ fight: { target: null, readyAt: 0, windupUntil: 0, aimX: 0, aimZ: 0, lunge: { dx: 1, dz: 0, left: 5 } } }), 3, T, newFeel());
    expect(f.lunging).toBe(true);
    expect(f.sx).toBeGreaterThan(1);
  });
  it("squashes on a hit, springs back past its shape, then settles", () => {
    const c = make({ hurtAt: 2 }), at = (t: number) => attackFeel(c, 2 + t, T, newFeel()).sy;
    expect(at(0)).toBeLessThan(0.9);
    expect(Math.max(...[0.1, 0.15, 0.2, 0.25].map(at))).toBeGreaterThan(1);
    expect(at(T.squashSecs + 0.01)).toBe(1);
  });
  it("tumbles up and over when knocked back hard, and not when barely nudged", () => {
    const thrown = make({ hurtAt: 1, kx: 72 * Math.exp(-10 * 0.25), kz: 0 }), f = attackFeel(thrown, 1.25, T, newFeel());
    expect(f.hop).toBeGreaterThan(0.5);
    // over once mid-air, not a strobe: on its back for one stretch, upright before and after
    const flips = Array.from({ length: 50 }, (_, i) => attackFeel(make({ hurtAt: 1, kx: 72 * Math.exp(-10 * i * 0.01), kz: 0 }), 1 + i * 0.01, T, newFeel()).flip);
    expect(flips.filter((f, i) => i > 0 && f !== flips[i - 1]).length).toBe(2);
    const nudged = make({ hurtAt: 1, kx: 5 * Math.exp(-10 * 0.25), kz: 0 });
    expect(attackFeel(nudged, 1.25, T, newFeel()).hop).toBe(0);
  });
});
