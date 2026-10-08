import { describe, expect, it } from "vitest";
import { attackFeel, newFeel, ATTACK_FX_DEFAULT as T } from "./attackFeel";
import type { Creature } from "../rules/creatures";

const make = (o: Partial<Creature> = {}): Creature => ({ id: 1, species: "wolf", level: 2, x: 0, z: 0, ...o }) as Creature;

describe("attack feel", () => {
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
