import { describe, expect, it } from "vitest";
import { crownBulbs, makeCrown, notchDistance, notchWidth, sightClearance } from "./crown";
import { HOUSE_ROOMS, nearestIn } from "./houseRooms";
import { TUNING } from "./tuning";

const H = TUNING.treehouse.house!;
const input = (seed = 1) => ({ house: HOUSE_ROOMS, hub: H.hub, balcony: { x: 0, z: H.balcony.out, r: H.balcony.r }, floor: H.height, seed });

describe("the great oak's crown", () => {
  const c = makeCrown(input());

  it("is the same crown for the same house and seed, another for another seed", () => {
    expect(JSON.stringify(makeCrown(input()))).toBe(JSON.stringify(c));
    expect(JSON.stringify(makeCrown(input(2)).lobes)).not.toBe(JSON.stringify(c.lobes));
  });

  it("has 300 to 500 lobes, thick and thin", () => {
    expect(c.lobes.length).toBeGreaterThanOrEqual(300);
    expect(c.lobes.length).toBeLessThanOrEqual(500);
    expect(c.lobes.some(l => l.thin === 0)).toBe(true);
    expect(c.lobes.filter(l => l.thin > 0).length).toBeGreaterThan(c.lobes.length * 0.15);
  });

  it("stands over every room: each room's floor is inside the dome, under its leaves", () => {
    const { cx, cz, rx, rz } = c.dome;
    for (const r of HOUSE_ROOMS.rooms) {
      const x = (r.x0 + r.x1) / 2, z = (r.z0 + r.z1) / 2;
      expect(((x - cx) / rx) ** 2 + ((z - cz) / rz) ** 2, r.id).toBeLessThan(1);
      expect(c.lobes.some(l => Math.hypot(l.x - x, l.z - z) < l.r + (r.r ?? 6) + 6), r.id).toBe(true);
    }
  });

  it("leaves the Terrace and its notch out to the crown's edge open: no lobe or limb above the floor on any line of sight to them", () => {
    for (const l of c.lobes) expect(sightClearance(c, l.x, l.y, l.z)).toBeGreaterThan(l.r * 0.8);
    for (const limb of c.limbs) if (limb.kind !== "root" && limb.kind !== "trunk") for (const k of limb.knots) if (k[1] > -k[3]) expect(sightClearance(c, k[0], k[1], k[2])).toBeGreaterThan(k[3]);
    // the notch reaches the crown's edge: along the take-off way, past the dome's edge, it's still open
    const o = c.terrace[c.terrace.length - 1], far = Math.max(c.dome.rx, c.dome.rz) * 1.2;
    expect(notchDistance(c, o.x + c.takeoff[0] * far, o.z + c.takeoff[1] * far, notchWidth(c))).toBeLessThan(0);
  });

  it("takes off the way the balcony opens (south of the hub today)", () => {
    expect(c.takeoff[1]).toBeCloseTo(1);
  });

  it("carries each room's limb on past it, forking, with roots on the ground and top limbs over the topmost room", () => {
    expect(c.limbs.filter(l => l.kind === "branch").length).toBe(HOUSE_ROOMS.rooms.length);
    expect(c.limbs.filter(l => l.kind === "root").length).toBe(10);
    expect(c.limbs.filter(l => l.kind === "top").length).toBe(3);
    c.limbs.filter(l => l.kind === "branch").forEach((l, i) => {
      const [x, , z] = l.knots[l.knots.length - 1], room = HOUSE_ROOMS.rooms[i];
      expect(nearestIn(room, x, z).d, room.id).toBeGreaterThan(5); // (out past its room, not ending in it)
    });
    for (const l of c.limbs.filter(l => l.kind === "root")) for (const k of l.knots) expect(k[1]).toBeLessThan(-c.floor + 6);
  });

  it("strings its lights: every bulb on a string, in order along it, the Terrace ringed", () => {
    const b = crownBulbs(c, 0.8);
    expect(b.length).toBeGreaterThan(5000);
    expect(b.length).toBeLessThan(40000);
    for (let i = 1; i < b.length; i++) if (b[i].string === b[i - 1].string) expect(b[i].u).toBeGreaterThanOrEqual(b[i - 1].u);
    for (const q of b) { expect(q.u).toBeGreaterThanOrEqual(0); expect(q.u).toBeLessThanOrEqual(1); }
    expect(c.strings.filter(s => s.kind === "ring").length).toBe(1);
    for (const k of ["swag", "drape", "garland"] as const) expect(c.strings.some(s => s.kind === k), k).toBe(true);
  });
});

