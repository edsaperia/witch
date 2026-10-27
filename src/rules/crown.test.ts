import { describe, expect, it } from "vitest";
import { crownBulbs, GAP_MARGIN, garlandPoint, limbSamples, makeCrown, notchDistance, notchWidth, polySigned, sightClearance, SIGHT_PITCHES, type HouseOutline } from "./crown";
import { TUNING } from "./tuning";
import { HOUSE_ROOMS } from "./houseRooms";
import OUTLINE from "../../config/house/outline.json";

const H = TUNING.treehouse.house!, O = OUTLINE as unknown as HouseOutline;
const input = (seed = 1) => ({ outline: O, floor: H.height, seed });
const inPoly = (p: [number, number][], x: number, z: number) => { let c = false; for (let i = 0, j = p.length - 1; i < p.length; j = i++) if ((p[i][1] > z) !== (p[j][1] > z) && x < ((p[j][0] - p[i][0]) * (z - p[i][1])) / (p[j][1] - p[i][1]) + p[i][0]) c = !c; return c; };

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
    for (const r of O.rooms) {
      expect(((r.x - cx) / rx) ** 2 + ((r.z - cz) / rz) ** 2, r.id).toBeLessThan(1);
      if (r.id !== "terrace") expect(c.lobes.some(l => Math.hypot(l.x - r.x, l.z - r.z) < l.r + r.r + 6), r.id).toBe(true);
    }
  });

  it("leaves the Terrace and its notch out to the crown's edge open: no lobe, limb or string above the floor on any line of sight to them", () => {
    for (const l of c.lobes) expect(sightClearance(c, l.x, l.y, l.z)).toBeGreaterThan(l.r); // (its whole disc)
    // every limb's tube, all along it, not only its knots, over the floor or under it (the floors are drawn in a plane of their own, so
    // bark under the Terrace showed over it; Ed, 2026-10-26: "there are branches in front of the balcony")
    for (const limb of c.limbs) if (limb.kind !== "root" && limb.kind !== "trunk") for (const { p: [x, y, z, r] } of limbSamples(limb, 0.5))
      expect(Math.min(sightClearance(c, x, y + r, z), sightClearance(c, x, y - r, z)), `${limb.kind} at ${x.toFixed(1)}, ${y.toFixed(1)}, ${z.toFixed(1)}`).toBeGreaterThan(r);
    for (const s of c.strings) if (s.kind !== "garland") for (const p of s.spans) for (let i = 0; i <= 10; i++) { const u = i / 10, y = p.a[1] + (p.b[1] - p.a[1]) * u - p.sag * 4 * u * (1 - u);
      if (y > 0) expect(sightClearance(c, p.a[0] + (p.b[0] - p.a[0]) * u, y, p.a[2] + (p.b[2] - p.a[2]) * u)).toBeGreaterThan(0); }
    // the notch reaches the crown's edge: along the take-off way, past the dome's edge, it's still open
    const [ox, oz] = c.notchFrom, far = Math.max(c.dome.rx, c.dome.rz) * 2.2;
    expect(notchDistance(c, ox + c.takeoff[0] * far, oz + c.takeoff[1] * far, notchWidth(c))).toBeLessThan(0);
  });

  it("frames the whole Terrace: its floor's outline, and her DJ desk on its rim, inside the gap with a margin to spare", () => {
    const T = O.rooms.find(r => r.id === "terrace")!, w = notchWidth(c);
    for (const [x, z] of T.outline) expect(notchDistance(c, x, z, w), `${x}, ${z}`).toBeLessThanOrEqual(-GAP_MARGIN + 1e-6);
    const d = HOUSE_ROOMS.terrace.decks; // (the desk's four corners)
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) expect(notchDistance(c, d.x + sx * d.w / 2, d.z + sz * d.d / 2, w)).toBeLessThan(0);
    expect(polySigned(T.outline, T.x, T.z)).toBeLessThan(0);
    expect(SIGHT_PITCHES[0]).toBeLessThanOrEqual(TUNING.camera.ground.angleIn); // (down to the lowest the camera looks)
  });

  it("keeps open ground it's given (the dancefloor) open to the sky as the Terrace: no lobe over it or on a line of sight to it", () => {
    const open = [{ x: 40, z: 40, r: 28 }], d = makeCrown({ ...input(), open });
    expect(d.lobes.length).toBeGreaterThan(200);
    for (const l of d.lobes) { expect(Math.hypot(l.x - 40, l.z - 40)).toBeGreaterThan(28 + l.r * 0.8); expect(sightClearance(d, l.x, l.y, l.z)).toBeGreaterThan(l.r * 0.8); }
    expect(c.lobes.some(l => Math.hypot(l.x - 40, l.z - 40) < 28)).toBe(true); // (without it, the crown reaches over it)
  });

  it("opens its notch the way she takes off: the Terrace's open south-east rim, towards the dancefloor", () => {
    const a = ((O.takeoff.from + O.takeoff.to) / 2) * (Math.PI / 180);
    expect(c.takeoff[0]).toBeCloseTo(Math.cos(a)); expect(c.takeoff[1]).toBeCloseTo(Math.sin(a));
    expect(c.takeoff[0]).toBeGreaterThan(0); expect(c.takeoff[1]).toBeGreaterThan(0); // (east and south)
  });

  it("carries each room's limb on past it, forking, with roots on the ground and top limbs over the topmost room", () => {
    expect(c.limbs.filter(l => l.kind === "branch").length).toBe(O.stubs.length);
    expect(c.limbs.filter(l => l.kind === "root").length).toBe(10);
    expect(c.limbs.filter(l => l.kind === "top").length).toBe(3);
    c.limbs.filter(l => l.kind === "branch").forEach((l, i) => {
      const [x, , z] = l.knots[l.knots.length - 1], room = O.rooms.find(r => r.id === O.stubs[i].room)!;
      expect(inPoly(room.outline, x, z), room.id).toBe(false); // (out past its room, not ending in it)
      expect(Math.hypot(x - room.x, z - room.z), room.id).toBeGreaterThan(room.r);
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

  it("hangs each string its own way (Ed, 2026-10-27: \"String lights on the treehouse seem to all have the same shape\")", () => {
    for (const k of ["tail", "spiral"] as const) expect(c.strings.some(s => s.kind === k), k).toBe(true);
    const spread = (v: number[]) => Math.max(...v) - Math.min(...v);
    const spans = c.strings.flatMap(s => (s.kind === "swag" || s.kind === "drape" ? s.spans : []));
    expect(spread(spans.map(p => p.sag))).toBeGreaterThan(1.5); // (their sag)
    const g = c.strings.filter(s => s.kind === "garland");
    expect(g.some(s => (s.arc ?? 1) < 1) && g.some(s => (s.arc ?? 1) >= 1)).toBe(true); // (part way round and all the way)
    expect(spread(g.map(s => s.tilt ?? 0))).toBeGreaterThan(0.15);
    // and every bulb on a garland on its own curve: in order along it, the first at its start
    const b = crownBulbs(c, 0.8), first = c.strings.findIndex(s => s.kind === "garland"), on = b.filter(q => q.string === first);
    const p0 = garlandPoint(g[0], 0);
    expect(Math.hypot(on[0].x - p0[0], on[0].y - p0[1], on[0].z - p0[2])).toBeLessThan(1e-6);
  });
});


describe("the crown whole over the Terrace (Ed, 2026-10-26: \"I'd like to try the treehouse canopy not being cut-through\")", () => {
  const T = O.rooms.find(r => r.id === "terrace")!;
  const gapped = makeCrown(input()), whole = makeCrown({ ...input(), gap: false });
  /** The share of the Terrace's floor (a 1 m grid inside its outline) under some lobe's disc, on the plan. */
  const covered = (c: typeof whole) => { let n = 0, k = 0;
    for (let x = -20; x <= 20; x++) for (let z = -20; z <= 20; z++) if (polySigned(T.outline, x, z) < 0) { n++; if (c.lobes.some(l => Math.hypot(l.x - x, l.z - z) < l.r * 0.8)) k++; }
    return k / n; };
  /** Lobes along the notch's line out from the take-off rim. */
  const overNotch = (c: typeof whole) => c.lobes.filter(l => { const [ox, oz] = c.notchFrom, along = (l.x - ox) * c.takeoff[0] + (l.z - oz) * c.takeoff[1]; return along > 0 && Math.abs((l.x - ox) * c.takeoff[1] - (l.z - oz) * c.takeoff[0]) < 4; });

  it("has leaves over the Terrace and along its notch, where the gap had none", () => {
    expect(whole.gap).toBe(false); expect(gapped.gap).toBe(true);
    expect(covered(gapped)).toBe(0);
    expect(covered(whole)).toBeGreaterThan(0.6); // (78% at seed 1: the gaps between the clumps, as over every room)
    expect(overNotch(whole).length).toBeGreaterThan(overNotch(gapped).length);
    expect(whole.lobes.length).toBeGreaterThan(gapped.lobes.length);
  });

  it("has no ring of lights round a gap, its other strings as ever, its limbs all kept", () => {
    expect(whole.strings.filter(s => s.kind === "ring").length).toBe(0);
    for (const k of ["swag", "drape", "garland"] as const) expect(whole.strings.some(s => s.kind === k), k).toBe(true);
    expect(whole.limbs.filter(l => l.kind === "branch").length).toBe(O.stubs.length);
  });

  it("still keeps open ground it's given open to the sky (the dancefloor)", () => {
    const open = [{ x: 70, z: 70, r: 15 }], c = makeCrown({ ...input(), open, gap: false });
    for (const l of c.lobes) expect(sightClearance(c, l.x, l.y, l.z), `${l.x}, ${l.z}`).toBeGreaterThan(l.r);
  });

  it("is the same crown for the same house and seed, and the gap's crown is the one it always was", () => {
    expect(JSON.stringify(makeCrown({ ...input(), gap: false }))).toBe(JSON.stringify(whole));
    expect(JSON.stringify(makeCrown({ ...input(), gap: true }))).toBe(JSON.stringify(gapped));
  });
});
