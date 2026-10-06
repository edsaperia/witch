// Guests at the party (rules/partyGuests.ts): a partified area's happy creatures gather at its party
// places, not only round its soundsystem; the same guest always goes to the same place, and every place
// is in the area, among its own decorations.
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { pointInArea } from "./creatures";
import { dressingOf } from "./partyDressing";
import { AT_SOUNDSYSTEM, guestSlot, guestSpot, partySpots } from "./partyGuests";
import { joinParty, newGame } from "./game";
import { rng } from "./random";
import { TUNING } from "./tuning";

const map = generateMap(123, TUNING), t = TUNING;
const cells: [number, number][] = [];
for (let y = 0; y < map.n; y++) for (let x = 0; x < map.n; x++) if (x !== map.centreCell[0] || y !== map.centreCell[1]) cells.push([x, y]);

describe("guests at the party", () => {
  it("finds each area's party places among its own decorations, inside the area", () => {
    for (const cell of cells.slice(0, 12)) {
      const spots = partySpots(map, cell, t), d = dressingOf(map, cell, t);
      expect(spots.length, `${cell}`).toBeGreaterThanOrEqual(Math.min(2, d.clusters.length));
      for (const s of spots) {
        const at = map.areaAt(s.x, s.z);
        expect(at.cell, `${cell}`).toEqual(cell);
        expect(s.r).toBeGreaterThan(1);
      }
      expect(partySpots(map, cell, t)).toBe(spots); // worked out once an area
    }
  });
  it("deals guests out over the soundsystem and the party places, the same each time", () => {
    const cell = cells[5], spots = partySpots(map, cell, t), ss = map.soundsystemSpot(cell[0], cell[1]);
    const where = Array.from({ length: 200 }, (_, id) => guestSpot({ id }, ss, spots));
    const atSound = where.filter(s => s.kind === "soundsystem").length / where.length;
    expect(atSound).toBeGreaterThan(AT_SOUNDSYSTEM - 0.12);
    expect(atSound).toBeLessThan(AT_SOUNDSYSTEM + 0.12);
    expect(new Set(where.filter(s => s.kind !== "soundsystem")).size).toBe(spots.length); // every place has guests
    expect(guestSpot({ id: 42 }, ss, spots)).toEqual(guestSpot({ id: 42 }, ss, spots));
  });
  it("keeps a dancing guest round its spot, inside its area", () => {
    const cell = cells[5], spots = partySpots(map, cell, t), s = spots[0], site = map.siteOf(cell[0], cell[1]);
    const c = { cell, homeX: site.x, homeZ: site.z, range: s.r, anchorX: s.x, anchorZ: s.z, dancing: true }, r = rng(7);
    for (let i = 0; i < 50; i++) {
      const [x, z] = pointInArea(map, c, r);
      expect(Math.hypot(x - s.x, z - s.z)).toBeLessThanOrEqual(s.r + 1e-6);
    }
  });
  it("stands guests round a party place apart, behind it, the big ones further back", () => {
    const s = { x: 0, z: 0, r: 2.6, kind: "cluster" as const };
    const at = Array.from({ length: 5 }, (_, i) => guestSlot(s, i, 2));
    for (const p of at) expect(p.z).toBeLessThan(0); // the far side: the camera's side open
    for (let i = 0; i < at.length; i++) for (let j = i + 1; j < at.length; j++) expect(Math.hypot(at[i].x - at[j].x, at[i].z - at[j].z)).toBeGreaterThan(1.2);
    expect(Math.hypot(guestSlot(s, 0, 0).z, guestSlot(s, 0, 0).x)).toBeLessThan(Math.hypot(guestSlot(s, 0, 3).z, guestSlot(s, 0, 3).x));
  });
  it("gives each guest joining a place its own slot", () => {
    const g = newGame(123, TUNING), cell = cells[5], ss = g.map.soundsystemSpot(cell[0], cell[1]), spots = partySpots(g.map, cell, g.tuning);
    const guests = g.creatures.filter(c => !c.boss).slice(0, 60).map(c => ({ ...c, cell }));
    let i = 0;
    for (const c of guests) { c.id = g.creatures.length + i++; g.creatures.push(c); joinParty(g, c, ss, cell); }
    const byPlace = guests.filter(c => c.range < 1);
    expect(byPlace.length).toBeGreaterThan(spots.length);
    for (let a = 0; a < byPlace.length; a++) for (let b = a + 1; b < byPlace.length; b++) expect(Math.hypot(byPlace[a].anchorX - byPlace[b].anchorX, byPlace[a].anchorZ - byPlace[b].anchorZ), `${a},${b}`).toBeGreaterThan(0.5);
  });
});
