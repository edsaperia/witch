// Her 💌s' accuracy (Ed, 2026-10-29: "For things with rapid rate of fire or shot-gun like clusters, we can also have accuracy/spread"):
// invites.inaccuracy and the bloom (bloomPer, bloomDecay, bloomMax), rules/invites.ts aimOff; the bags that carry them (config/wardrobe.json invitesAdd).
import { describe, expect, it } from "vitest";
import { aimOff, newInvites, stepInvites, type Affection } from "./invites";
import { TUNING, withTuning, type Tuning } from "./tuning";
import { bagTuning } from "./bags";
import { STEP } from "./game";

const none: Affection = { invitable: () => false, blocksLetters: () => false, hit: () => {}, affection: () => null };
/** Every letter's way (degrees off her aim, +x) over `seconds` of holding fire. */
function angles(t: Tuning, seconds = 4): number[] {
  const s = newInvites(), out: number[] = [];
  for (let i = 0, time = 0; i < seconds / STEP; i++, time += STEP) {
    const before = s.next;
    stepInvites(s, { fire: true, aimX: 1, aimZ: 0 }, { x: 0, z: 0, facing: 1 }, true, [], none, time, STEP, t);
    for (const L of s.letters) if (L.n >= before) out.push((Math.atan2(L.vz, L.vx) * 180) / Math.PI);
    s.letters = [];
  }
  return out;
}
const aim = (more: Partial<Tuning["invites"]>) => withTuning({ invites: { ...TUNING.invites, ...more } });

describe("her 💌s' accuracy", () => {
  it("at 0 (the tuning's own), every letter flies dead on her aim", () => {
    const a = angles(TUNING);
    expect(a.length).toBeGreaterThan(4);
    for (const x of a) expect(Math.abs(x)).toBeLessThan(1e-9);
  });

  it("strays each letter within inaccuracy degrees, both ways, and the same every time", () => {
    const t = aim({ inaccuracy: 6 }), a = angles(t);
    for (const x of a) expect(Math.abs(x)).toBeLessThanOrEqual(6 + 1e-9);
    expect(Math.min(...a)).toBeLessThan(-1); expect(Math.max(...a)).toBeGreaterThan(1);
    expect(angles(t)).toEqual(a);
  });

  it("blooms while she keeps firing, up to bloomMax, and settles once she stops", () => {
    const I = { ...TUNING.invites, inaccuracy: 1, bloomPer: 2, bloomDecay: 4, bloomMax: 7 }, s = newInvites();
    const offs = Array.from({ length: 8 }, (_, i) => aimOff(s, i * 0.2, I));
    expect(offs[0]).toBe(1); // (the first volley as true as the bag's own)
    for (let i = 1; i < offs.length; i++) expect(offs[i]).toBeGreaterThanOrEqual(offs[i - 1] - 1e-9);
    expect(Math.max(...offs)).toBeLessThanOrEqual(1 + 7 + 1e-9);
    expect(offs[7]).toBeGreaterThan(4);
    expect(aimOff(s, 1.4 + 3, I)).toBe(1); // (3 s off the trigger: the bloom gone)
  });

  it("the spray, burst and stream bags carry it; the satchel, purse and briefcase fly true", () => {
    for (const b of ["satchel", "purse", "briefcase", "clutch"]) { const I = bagTuning(TUNING, b).invites; expect((I.inaccuracy ?? 0) + (I.bloomMax ?? 0)).toBe(0); }
    for (const b of ["bumbag", "tote", "duffel", "backpack"]) { const I = bagTuning(TUNING, b).invites; expect((I.inaccuracy ?? 0) + (I.bloomMax ?? 0)).toBeGreaterThan(0); }
    const pack = angles(bagTuning(TUNING, "backpack"), 3), I = bagTuning(TUNING, "backpack").invites;
    for (const x of pack) expect(Math.abs(x)).toBeLessThanOrEqual(I.inaccuracy! + I.bloomMax! + 1e-9);
  });
});
