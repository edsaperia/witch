import { describe, expect, it } from "vitest";
import { areaNeons, dressingOf, isLit, leftOut, partyDef, pieceId } from "./partyDressing";
import { PARTY_CLUSTERS, PARTY_OBJECTS } from "../../art/party.js";
import { generateMap } from "./map";
import { floorClearing } from "./speakers";
import { TUNING } from "./tuning";

const map = generateMap(123, TUNING), t = TUNING, P = t.partyObjects;
/** Cut from the game in Ed's scenery review (2026-10-19). */
const CUT = ["fairy-bush", "fairy-branch", "led-cube", "mirror-ball", "uv-rock", "uv-stump", "fairy-lights-hanging", "party-tent", "inflatable-ring", "speaker-stack"];

describe("party objects (Ed, 2026-10-04)", () => {
  it("home is strewn all over with party decorations instead of trees (Ed, 2026-10-05), none on the floor, its clearing, the paths, the treehouse or her seat", () => {
    const d = dressingOf(map, map.centreCell, t), D = map.dancefloor, H = P.home;
    expect(d.loose.length).toBeGreaterThanOrEqual(H.loose[0] * 0.8);
    expect(d.clusters.length).toBeGreaterThanOrEqual(H.clusters[0] - 1);
    expect(d.clusters.filter(c => c.id.startsWith("home-")).length).toBeGreaterThanOrEqual(2);
    expect(d.hanging).toEqual([]);
    expect(d.caught).toBeNull();
    // Every class, all over the area: in every quarter round the floor, near and far.
    const classes = new Set(d.loose.map(p => partyDef(p.ref)?.cls));
    for (const c of ["home", "small", "balloon", "litter", "furniture"]) expect(classes.has(c), c).toBe(true);
    const quarter = (p: { x: number; z: number }) => (Math.floor(((Math.atan2(p.z - D.z, p.x - D.x) + Math.PI) / (Math.PI / 2))) % 4);
    expect(new Set(d.loose.map(quarter)).size).toBe(4);
    const far = d.loose.filter(p => Math.hypot(p.x - D.x, p.z - D.z) > map.homeRadius).length;
    expect(far).toBeGreaterThan(5);
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

  it("each area gets 2-4 clusters, 20-40 loose pieces (a set piece at most), lights capped, nothing on paths or the dancefloor; the same each time", () => {
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
    expect(sample.clusters.length).toBeGreaterThanOrEqual(P.clusters[0] - 1);
    expect(sample.loose.length).toBeGreaterThanOrEqual(P.loose[0] * 0.75);
  });
  // Ed's scenery review (2026-10-19) cut ten pieces from the game: gone from the library and every cluster, never placed, and the
  // places they filled still filled by the rest (the loose pieces, the clusters' 3 to 8, the hanging ones from the trees).
  it("the ten cut pieces are gone (Ed, 2026-10-19), and what they filled is still filled by the rest", () => {
    for (const id of CUT) { expect(PARTY_OBJECTS.some(d => d.id === id), id).toBe(false); expect(partyDef(`party:${id}`), id).toBeFalsy(); }
    for (const c of PARTY_CLUSTERS) { expect(c.pieces.some(p => CUT.includes(pieceId(p[0] as string))), c.id).toBe(false); expect(c.pieces.length, c.id).toBeGreaterThanOrEqual(3); }
    let hanging = 0, smalls = 0, areas = 0;
    for (let cy = 0; cy < map.n; cy++) for (let cx = 0; cx < map.n; cx++) {
      if ((cx === map.centreCell[0] && cy === map.centreCell[1]) || !map.playable(cx, cy)) continue;
      const d = dressingOf(map, [cx, cy], t);
      areas++; hanging += d.hanging.length; smalls += d.loose.filter(p => partyDef(p.ref)?.cls === "small").length;
      for (const p of [...d.loose, ...d.hanging]) expect(partyDef(p.ref), p.ref).toBeTruthy(); // (every slot a real piece: no gap where a cut one was)
      for (const p of d.hanging) expect(partyDef(p.ref)?.hang, p.ref).toBe(true);
    }
    expect(areas).toBeGreaterThan(10);
    expect(hanging / areas).toBeGreaterThanOrEqual(P.hanging[0] * 0.5); // (the hanging pieces left still hang in the trees)
    expect(smalls / areas).toBeGreaterThan(2); // (the light sources left still fill the small class)
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
  it("an area's party neons are its own colour plus one accent (the art director, round 1), its balloons mostly by its lights", () => {
    let near = 0, balloons = 0;
    for (let cx = 0; cx < 12; cx++) for (let cy = 0; cy < 12; cy++) {
      const d = dressingOf(map, [cx, cy], t), neons = new Set(areaNeons(map, [cx, cy]));
      expect(neons.size).toBeLessThanOrEqual(2);
      for (const p of [...d.loose, ...d.hanging]) { const n = p.ref.split("@")[1]?.split("~")[0]; if (n) expect(neons.has(n), p.ref).toBe(true); }
      for (const p of d.loose) if (partyDef(p.ref)?.cls === "balloon" && d.lights.length) { balloons++; if (d.lights.some(L => Math.hypot(L.x - p.x, L.z - p.z) < 3.5)) near++; }
    }
    if (balloons) expect(near / balloons).toBeGreaterThan(0.4);
    expect(new Set(areaNeons(map, map.centreCell))).toEqual(new Set(["cyan"])); // home: its cyan alone (round 2)
  });
});
