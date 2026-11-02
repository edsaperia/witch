import { describe, expect, it } from "vitest";
import { areaNeons, dressingOf, isLit, leftOut, partyDef, pieceId } from "./partyDressing";
import { PARTY_CLUSTERS, PARTY_OBJECTS } from "../../art/party.js";
import { generateMap } from "./map";
import { floorClearing } from "./speakers";
import { TUNING } from "./tuning";

// Keep the radius placement fixture: whole-map density/diversity and the fixed 12×12 generated-prop/neon probes cover its seeded spatial distribution.
const map = generateMap(123, TUNING), t = TUNING, P = t.partyObjects;
/** Cut from the game in Ed's scenery review (2026-10-19). */
const CUT = ["fairy-bush", "fairy-branch", "led-cube", "mirror-ball", "uv-rock", "uv-stump", "fairy-lights-hanging", "party-tent", "inflatable-ring", "speaker-stack"];

describe("party objects (Ed, 2026-10-04)", () => {
  it("keeps home dressing out of protected geometry, spaced, capped and repeatable", () => {
    const d = dressingOf(map, map.centreCell, t), D = map.dancefloor, H = P.home;
    expect(d.loose.length).toBeGreaterThan(0); expect(d.clusters.length).toBeGreaterThan(0);
    expect(d.hanging).toEqual([]);
    expect(d.caught).toBeNull();
    // IP2 reports population/class/quarter/far-placement coverage, preserving these same samples.
    const arches = d.loose.filter(p => p.ref.includes(P.arch));
    for (const a of arches) expect(map.paths.at(a.x, a.z, 1)).toBeTruthy();
    for (const p of [...d.loose.filter(p => !p.ref.includes(P.arch)), ...d.clusters]) {
      expect(Math.hypot(p.x - D.x, p.z - D.z)).toBeGreaterThan(floorClearing(t));
      expect(Math.hypot(p.x - map.treehouse.x, p.z - map.treehouse.z)).toBeGreaterThan(t.treehouse.clear);
      expect(Math.hypot(p.x - map.start.x, p.z - map.start.z)).toBeGreaterThan(3);
      expect(map.paths.at(p.x, p.z, 1)).toBeNull();
      expect(map.areaAt(p.x, p.z).cell).toEqual(map.centreCell);
    }
    // Scattered, not a carpet: kept apart.
    for (let i = 0; i < d.loose.length; i++) for (let j = i + 1; j < d.loose.length; j++) expect(Math.hypot(d.loose[i].x - d.loose[j].x, d.loose[i].z - d.loose[j].z)).toBeGreaterThan(1.5);
    expect(d.lights.length).toBeLessThanOrEqual(H.lights);
    expect(dressingOf(map, map.centreCell, t)).toEqual(d);
  });

  it("caps and validates area dressing, preserves exclusions and exact replay", () => {
    let areas = 0;
    for (let cy = 0; cy < map.n; cy += 2) for (let cx = 0; cx < map.n; cx += 2) {
      if ((cx === map.centreCell[0] && cy === map.centreCell[1]) || !map.playable(cx, cy)) continue; // (only playable areas are ever partified)
      const d = dressingOf(map, [cx, cy], t);
      areas++;
      expect(d.clusters.length).toBeLessThanOrEqual(P.clusters[1]);
      expect(d.loose.length).toBeLessThanOrEqual(P.loose[1] + 1);
      expect(d.lights.length).toBeLessThanOrEqual(P.lightsPerArea);
      expect(d.lights.every(p => isLit(p.ref))).toBe(true);
      expect([...d.loose, ...d.hanging, ...(d.caught ? [d.caught] : [])].some(p => CUT.includes(pieceId(p.ref)))).toBe(false); // (Ed's cuts, 2026-10-19: below)
      expect(d.clusters.some(c => c.id.startsWith("home-"))).toBe(false); // home's own
      for (const p of [...d.loose, ...d.clusters]) {
        expect(map.paths.at(p.x, p.z, 1)).toBeFalsy();
        expect(Math.hypot(p.x - map.dancefloor.x, p.z - map.dancefloor.z)).toBeGreaterThan(floorClearing(t));
        const at = map.areaAt(p.x, p.z).cell;
        expect([at[0], at[1]]).toEqual([cx, cy]);
      }
      expect(dressingOf(map, [cx, cy], t)).toEqual(d);
    }
    expect(areas).toBeGreaterThan(5);
    // Most areas get the full numbers.
    const sample = dressingOf(map, [map.centreCell[0] + 1, map.centreCell[1] + 1], t); // (a playable area: the grid's corner is the sea)
    expect(sample.clusters.length).toBeGreaterThan(0); expect(sample.loose.length).toBeGreaterThan(0); // exercised placement, not minimum fill
  });
  // Ed's scenery review (2026-10-19) cut ten pieces from the game: gone from the library and every cluster, never placed, and the
  // places they filled still filled by the rest (the loose pieces, the clusters' 3 to 8, the hanging ones from the trees).
  it("keeps the ten removed pieces absent and every remaining reference valid (Ed, 2026-10-19)", () => {
    for (const id of CUT) { expect(PARTY_OBJECTS.some(d => d.id === id), id).toBe(false); expect(partyDef(`party:${id}`), id).toBeFalsy(); }
    for (const c of PARTY_CLUSTERS) { expect(c.pieces.some(p => CUT.includes(pieceId(p[0] as string))), c.id).toBe(false); expect(c.pieces.length, c.id).toBeGreaterThanOrEqual(3); }
    let hanging = 0, areas = 0;
    for (let cy = 0; cy < map.n; cy++) for (let cx = 0; cx < map.n; cx++) {
      if ((cx === map.centreCell[0] && cy === map.centreCell[1]) || !map.playable(cx, cy)) continue;
      const d = dressingOf(map, [cx, cy], t);
      areas++; hanging += d.hanging.length;
      for (const p of [...d.loose, ...d.hanging]) expect(partyDef(p.ref), p.ref).toBeTruthy(); // (every slot a real piece: no gap where a cut one was)
      for (const p of d.hanging) expect(partyDef(p.ref)?.hang, p.ref).toBe(true);
    }
    expect(areas).toBeGreaterThan(10);
    expect(hanging).toBeGreaterThan(0); // exercise valid hanging references; IP2 reports per-area fill averages
  });
  it("partyObjects.exclude still leaves a piece out (Ed, v271: the LED cube's, empty since the cube was cut)", () => {
    const placed = (tt: typeof t) => { const all: string[] = []; for (let cy = 0; cy < map.n; cy++) for (let cx = 0; cx < map.n; cx++) { if (!map.playable(cx, cy)) continue; all.push(...dressingOf(map, [cx, cy], tt).loose.map(p => pieceId(p.ref))); } return all; };
    expect(P.exclude).toEqual([]);
    const id = "neon-star", without = { ...t, partyObjects: { ...P, exclude: [id] } }; // (any piece the map places: the deck chair was, before the oak moved the treehouse)
    expect(placed(t)).toContain(id);
    expect(placed(without)).not.toContain(id);
    expect(leftOut(id, without)).toBe(true);
  });
  it("the prop generator's party pieces (gen-*) only under partyObjects.generated, in place of the ones they replace", () => {
    const refs = (tt: typeof t) => { const all: string[] = []; for (let cx = 0; cx < 12; cx++) for (let cy = 0; cy < 12; cy++) { const d = dressingOf(map, [cx, cy], tt); all.push(...d.loose.map(p => p.ref), ...d.hanging.map(p => p.ref)); } return all; };
    expect(refs(t).some(r => r.includes(":gen-"))).toBe(false);
    const on = { ...t, partyObjects: { ...P, generated: true } }, gen = refs(on);
    expect(gen.some(r => r.includes(":gen-"))).toBe(true);
    for (const id of ["bunting-run", "balloons-stake", "lantern-string", "lanterns-hanging"]) { expect(leftOut(id, on), id).toBe(true); expect(leftOut(id, t), id).toBe(false); }
    expect(gen.some(r => /:(bunting-run|balloons-stake|lantern-string|lanterns-hanging)[@~]?/.test(r))).toBe(false);
  });
  it("limits each area's neons to its owned colour and accent palette", () => {
    for (let cx = 0; cx < 12; cx++) for (let cy = 0; cy < 12; cy++) {
      const d = dressingOf(map, [cx, cy], t), neons = new Set(areaNeons(map, [cx, cy]));
      expect(neons.size).toBeLessThanOrEqual(2);
      for (const p of [...d.loose, ...d.hanging]) { const n = p.ref.split("@")[1]?.split("~")[0]; if (n) expect(neons.has(n), p.ref).toBe(true); }
    }
    // IP2 reports the balloon-near-light share over this original12x12 grid.
    expect(new Set(areaNeons(map, map.centreCell))).toEqual(new Set(["cyan"])); // home: its cyan alone (round 2)
  });
});
