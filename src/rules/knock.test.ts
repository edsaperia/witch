// The witch knocked back and staggered (Ed, 2026-10-05): straight away from the blow, small for a
// bite, big for a charge, never through a blink, never a stun-lock, stopping at trunks.
import { describe, expect, it } from "vitest";
import { knockOf, knockWitch, newKnock, stepWitchKnock, stunned } from "./knock";
import { newWitch } from "./witch";
import { TUNING } from "./tuning";
import { STEP, hitWitch, newGame, stepGame } from "./game";

const B = { minX: -1e4, maxX: 1e4, minZ: -1e4, maxZ: 1e4 };
/** Throw her from (0, 0) by a blow from (fx, fz), and let it play out. */
function thrown(fx: number, fz: number, knockback = 0, rams = false, clear = (_x: number, _z: number) => true) {
  const k = newKnock();
  let body = newWitch(0, 0);
  knockWitch(k, body, { x: fx, z: fz, knockback, rams }, 0, TUNING);
  for (let i = 0; i < 3 / STEP; i++) body = stepWitchKnock(k, body, STEP, TUNING, B, clear);
  return { k, body };
}

describe("the witch knocked back and staggered (Ed, 2026-10-05)", () => {
  it("throws her straight away from the blow, about base metres for a plain bite", () => {
    const { body } = thrown(-1, -1);
    const d = Math.hypot(body.x, body.z), K = TUNING.witch.knock;
    expect(d).toBeGreaterThan(K.base * 0.9); expect(d).toBeLessThan(K.base * 1.05);
    expect(body.x).toBeCloseTo(body.z, 3); // along the line from the blow, away from it
    expect(body.x).toBeGreaterThan(0);
  });

  it("throws her far and staggers her long for a charge, little for a bite, in between by knockback", () => {
    const bite = knockOf({ x: 0, z: 0, knockback: 0, rams: false }, TUNING), charge = knockOf({ x: 0, z: 0, knockback: 0, rams: true }, TUNING), maul = knockOf({ x: 0, z: 0, knockback: 12, rams: false }, TUNING);
    expect(bite.metres).toBeGreaterThanOrEqual(2); expect(bite.metres).toBeLessThanOrEqual(3);
    expect(bite.stun).toBeCloseTo(0.25, 2);
    expect(charge.metres).toBeGreaterThanOrEqual(10); expect(charge.metres).toBeLessThanOrEqual(14);
    expect(charge.stun).toBeGreaterThanOrEqual(0.8); expect(charge.stun).toBeLessThanOrEqual(1);
    expect(maul.metres).toBeGreaterThan(bite.metres); expect(maul.metres).toBeLessThan(charge.metres + 2);
    const far = thrown(-1, 0, 0, true).body.x;
    expect(far).toBeGreaterThan(9.5); // and the throw really covers it
  });

  it("can't stun-lock her: no new stagger for `immune` seconds after one, though the blow still throws her", () => {
    const k = newKnock(), body = newWitch(0, 0), K = TUNING.witch.knock;
    knockWitch(k, body, { x: -1, z: 0, knockback: 0, rams: true }, 0, TUNING);
    const first = k.stunUntil;
    expect(stunned(k, 0.1)).toBe(true);
    knockWitch(k, body, { x: 1, z: 0, knockback: 0, rams: true }, first + 0.2, TUNING);
    expect(k.stunUntil).toBe(first); // no second stagger
    expect(k.kx).toBeLessThan(0); // but thrown the other way
    const later = first + K.immune + 0.01;
    knockWitch(k, body, { x: -1, z: 0, knockback: 0, rams: false }, later, TUNING);
    expect(k.stunUntil).toBeGreaterThan(later);
  });

  it("stops her at a trunk", () => {
    const g = newGame(77, TUNING), d = g.map.dancefloor, tree = g.forest.treesNear(d.x + 120, d.z + 120, 60)[0];
    expect(tree).toBeDefined();
    g.clock.paused = false;
    const W = g.witches[0];
    g.witch = { ...g.witch, seated: false, mode: "ground", lift: 0, x: tree.x - 4, z: tree.z, vx: 0, vz: 0 };
    W.health.hp = 1e6;
    hitWitch(g, 0, g.clock.time, TUNING, { x: tree.x - 6, z: tree.z, knockback: 0, rams: true }); // thrown east, at the tree
    for (let i = 0; i < 2 / STEP; i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP);
    const gap = Math.hypot(g.witch.x - tree.x, g.witch.z - tree.z);
    expect(g.witch.x).toBeLessThan(tree.x); // never through it
    expect(gap).toBeGreaterThanOrEqual(TUNING.dash.clear.tree - 1e-6);
    expect(g.witch.x).toBeGreaterThan(tree.x - 4 + 0.5); // (but it did throw her)
  });

  it("does nothing to her mid-blink, and nothing on the blow that knocks her out", () => {
    const g = newGame(77, TUNING), W = g.witches[0];
    g.clock.paused = false;
    g.witch = { ...g.witch, seated: false, mode: "ground", lift: 0 };
    const t0 = g.clock.time, hp = W.health.hp;
    W.dash.at = t0; W.dash.until = t0 + 1;
    hitWitch(g, 0, t0 + 0.1, TUNING, { x: g.witch.x - 1, z: g.witch.z, knockback: 18, rams: true });
    expect(W.knock?.kx ?? 0).toBe(0);
    expect(W.health.hp).toBe(hp);
    W.dash.until = t0; W.health.hp = 1;
    hitWitch(g, 0, t0 + 2, TUNING, { x: g.witch.x - 1, z: g.witch.z, knockback: 18, rams: true });
    expect(W.ko).not.toBeNull();
    expect(W.knock?.kx ?? 0).toBe(0);
  });

  it("staggers her: no moving while it lasts", () => {
    const g = newGame(77, TUNING), W = g.witches[0];
    g.clock.paused = false;
    g.witch = { ...g.witch, seated: false, mode: "ground", lift: 0, vx: 0, vz: 0 };
    W.health.hp = 1e6;
    hitWitch(g, 0, g.clock.time, TUNING, { x: g.witch.x, z: g.witch.z - 1, knockback: 0, rams: true }); // thrown south
    const x0 = g.witch.x;
    for (let i = 0; i < 0.5 / STEP; i++) stepGame(g, { moveX: 1, moveZ: 0, toggleMode: false, zoom: 0, dash: true }, STEP);
    expect(Math.abs(g.witch.x - x0)).toBeLessThan(0.3); // east held, but staggered: she didn't go
    expect(W.dash.until).toBe(-Infinity); // and no blink
  });
});
