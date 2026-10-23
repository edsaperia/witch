// The dressing stations by nearness (Ed, 2026-10-21; rules/stations.ts): walking up to one opens its panel, walking away closes it,
// one at a time, with a little slack at the edge; never off foot in the house.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { deckOf } from "./treehouse";
import { HOUSE_ROOMS, objectFrontAt } from "./houseRooms";
import { STATION_SLACK, stationAt, stationOf } from "./stations";
import { cameraPose } from "./camera";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const deck = (g: Game) => deckOf(g.map, g.tuning)!;
const obj = (id: string) => HOUSE_ROOMS.objects.find(o => o.id === id)!;
const STATIONS = HOUSE_ROOMS.objects.filter(o => o.use.kind === "creator");
const at = { x: 0, z: 0 };
/** A point `gap` metres off the near side of object `id`, the hub's centre at the origin (houseRooms.ts objectFrontAt). */
const before = (id: string, gap: number) => objectFrontAt(obj(id), at, gap);

/** In the house mid-night, off her decks, at (dx, dz) metres from the hub's centre. */
function inHouse(dx: number, dz: number): Game {
  const g = newGame(123, TUNING), W = g.witches[0], d = deck(g);
  g.clock.paused = false; g.party.paused = true;
  for (let i = 0; i < 0.3 / STEP; i++) stepGame(g, { ...idle, moveZ: -1 }, STEP);
  W.body = { ...W.body, x: d.x + dx, z: d.z + dz, vx: 0, vz: 0, perch: true, mode: "ground", lift: 0 };
  for (let i = 0; i < 0.5 / STEP; i++) stepGame(g, idle, STEP);
  return g;
}

describe("the dressing stations by nearness", () => {
  it("are the creator's stations, and there are some", () => {
    expect(STATIONS.map(o => o.id)).toEqual(expect.arrayContaining(["mirror", "wardrobe", "cloakPegs", "shoeRack", "bags", "broomStand", "dressingTable"]));
  });

  it("in the game, each bedroom station (dressed before the door: Ed, 2026-10-21) opens with her standing at it", () => {
    for (const o of STATIONS.filter(q => q.room === "bedroom")) {
      const p = before(o.id, 0.5), g = inHouse(p.x, p.z);
      expect(stationOf(g, null)?.id, o.id).toBe(o.id);
    }
  });

  it("open near: within reach of a station's edge, that station", () => {
    for (const o of STATIONS) { const p = before(o.id, HOUSE_ROOMS.reach * 0.6); expect(stationAt(at, p.x, p.z, null)?.id, o.id).toBe(o.id); }
  });

  it("close away: past reach with none open, nothing; and an open one goes once she's past its slack", () => {
    for (const o of STATIONS) {
      const far = before(o.id, HOUSE_ROOMS.reach + STATION_SLACK + 0.3);
      expect(stationAt(at, far.x, far.z, o.id)?.id ?? null, o.id).not.toBe(o.id);
      const out = before(o.id, HOUSE_ROOMS.reach + 0.3);
      expect(stationAt(at, out.x, out.z, null)?.id ?? null, o.id).not.toBe(o.id);
    }
  });

  it("an open one stays open in its slack, so it doesn't flicker at the edge", () => {
    const p = before("wardrobe", HOUSE_ROOMS.reach + STATION_SLACK * 0.5);
    expect(stationAt(at, p.x, p.z, null)).toBeNull();
    expect(stationAt(at, p.x, p.z, "wardrobe")?.id).toBe("wardrobe");
  });

  it("isn't the bed, the hats' floor, the book or a placeholder", () => {
    for (const o of HOUSE_ROOMS.objects.filter(q => q.use.kind !== "creator")) { const p = before(o.id, 0.2), s = stationAt(at, p.x, p.z, null); expect(s === null || s.use.kind === "creator", o.id).toBe(true); expect(s?.id, o.id).not.toBe(o.id); }
  });

  it("one at a time: walking from one station to the next swaps them", () => {
    const a = before("mirror", 0.3), b = before("wardrobe", 0.3);
    const first = stationAt(at, a.x, a.z, null)?.id ?? null;
    expect(first).toBe("mirror");
    expect(stationAt(at, b.x, b.z, first)?.id).toBe("wardrobe");
  });

  it("in the game: walking up to the wardrobe opens it, walking away closes it", () => {
    const p = objectFrontAt(obj("wardrobe"), at, 0.5), g = inHouse(p.x, p.z), W = g.witches[0];
    let open = stationOf(g, null)?.id ?? null;
    expect(open).toBe("wardrobe");
    for (let i = 0; i < 3 / STEP && open; i++) { stepGame(g, { ...idle, moveZ: 1 }, STEP); open = stationOf(g, open)?.id ?? null; }
    expect(open).toBeNull();
    expect(W.body.perch).toBe(true); // (still in the house: it closed by walking away, not by leaving)
  });

  it("in the game: none once she is off her feet (rising)", () => {
    const p = objectFrontAt(obj("mirror"), at, 0.4), g = inHouse(p.x, p.z);
    expect(stationOf(g, null)?.id).toBe("mirror");
    g.witch = { ...g.witch, mode: "rising" };
    expect(stationOf(g, "mirror")).toBeNull();
  });

  it("choosing there, the camera eases in on her and aside from the panel; walking off, back out", () => {
    const p = objectFrontAt(obj("wardrobe"), at, 0.5), g = inHouse(p.x, p.z), S = g.tuning.camera.station!;
    const pose = () => cameraPose(g.camera, g.witch.lift, g.tuning);
    for (let i = 0; i < 4 / STEP; i++) stepGame(g, idle, STEP); // (the house's own view settled)
    const before = pose();
    for (let i = 0; i < 3 * S.ease / STEP; i++) stepGame(g, { ...idle, framing: true }, STEP);
    const choosing = pose();
    expect(choosing.distance).toBeLessThan(before.distance * (S.distance + 0.05));
    expect(choosing.tx - g.camera.tx).toBeCloseTo(S.side * choosing.distance, 1); // (west of her: she stands right of the panel)
    for (let i = 0; i < 3 * S.ease / STEP; i++) stepGame(g, idle, STEP);
    expect(pose().distance).toBeCloseTo(before.distance, 0);
    expect(g.camera.station).toBeLessThan(0.01);
  });

  it("choosing a row, the camera zooms on the part of her it's about (camera.station.parts): each part's own look and distance", () => {
    const P = TUNING.camera.station!.parts!;
    const settle = (part: string) => {
      const p = objectFrontAt(obj("wardrobe"), at, 0.5), g = inHouse(p.x, p.z), S = g.tuning.camera.station!;
      for (let i = 0; i < 4 * S.ease / STEP; i++) stepGame(g, { ...idle, framing: true, framePart: part }, STEP);
      return { pose: cameraPose(g.camera, g.witch.lift, g.tuning), cam: g.camera };
    };
    const head = settle("head"), feet = settle("feet");
    for (const [part, s] of [["head", head], ["feet", feet]] as const) {
      expect(s.cam.stationLook).toBeCloseTo(P[part].look, 2);
      expect(s.cam.stationDistance).toBeCloseTo(P[part].distance, 2);
    }
    // (the looks are calibrated against her drawn sprite, which the house draws onto its floor's pixels, so only the
    // difference is checked: the aim moves by the looks' difference)
    expect((head.pose.ty - head.cam.ty) - (feet.pose.ty - feet.cam.ty)).toBeCloseTo(P.head.look - P.feet.look, 1);
    expect(head.pose.distance).toBeLessThan(feet.pose.distance);
  });

  it("never eases in away from the house, framing or not", () => {
    const g = newGame(123, TUNING);
    g.clock.paused = false;
    for (let i = 0; i < 2 / STEP; i++) stepGame(g, { ...idle, framing: true }, STEP);
    expect(g.camera.station ?? 0).toBe(0);
  });
});

