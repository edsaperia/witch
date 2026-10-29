// The dressing stations by nearness (Ed, 2026-10-21; rules/stations.ts): walking up to one opens its panel, walking away closes it,
// one at a time, with a little slack at the edge; never off foot in the house.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { deckOf } from "./treehouse";
import { HOUSE_ROOMS, objectFrontAt } from "./houseRooms";
import { STATION_SLACK, broomWhere, stationAt, stationOf, tableOf } from "./stations";
import { cameraPose } from "./camera";
import { SHELVES } from "./wardrobe";

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
    expect(STATIONS.map(o => o.id)).toEqual(expect.arrayContaining(["wardrobe", "cloakPegs", "shoeRack", "bags", "lathe", "dressingTable"]));
    expect(STATIONS.map(o => o.id)).not.toContain("mirror"); // (the hat's colours and fit at the wardrobe, its mirror scenery: Ed, 2026-10-29)
    expect(STATIONS.map(o => o.id)).not.toContain("broomBay"); expect(STATIONS.map(o => o.id)).not.toContain("pegboard"); // (the broom one station, at the lathe: Ed, 2026-10-29)
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
    const a = before("dressingTable", 0.3), b = before("wardrobe", 0.3);
    const first = stationAt(at, a.x, a.z, null)?.id ?? null;
    expect(first).toBe("dressingTable");
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
    const p = objectFrontAt(obj("cloakPegs"), at, 0.4), g = inHouse(p.x, p.z);
    expect(stationOf(g, null)?.id).toBe("cloakPegs");
    g.witch = { ...g.witch, mode: "rising" };
    expect(stationOf(g, "cloakPegs")).toBeNull();
  });

  it("choosing there, with her whole framed (camera.station.whole), the rules leave the camera's distance and aim to the view (render/view/camera.ts) but ease in and out", () => {
    const p = objectFrontAt(obj("wardrobe"), at, 0.5), g = inHouse(p.x, p.z), S = g.tuning.camera.station!;
    expect(S.whole?.on).toBe(true);
    const pose = () => cameraPose(g.camera, g.witch.lift, g.tuning);
    for (let i = 0; i < 4 / STEP; i++) stepGame(g, idle, STEP);
    const before = pose();
    for (let i = 0; i < 3 * S.ease / STEP; i++) stepGame(g, { ...idle, framing: true }, STEP);
    expect(g.camera.station).toBeGreaterThan(0.95);
    expect(pose().distance).toBeCloseTo(before.distance, 3); expect(pose().aim ?? 0).toBe(0);
    for (let i = 0; i < 3 * S.ease / STEP; i++) stepGame(g, idle, STEP);
    expect(g.camera.station).toBeLessThan(0.01);
  });

  // (with the whole framing off: the old zoom on the part being chosen, kept behind its switch)
  const partsZoom = (g: Game) => { (g as { tuning: Game["tuning"] }).tuning = JSON.parse(JSON.stringify(g.tuning)); g.tuning.camera.station!.whole!.on = false; return g; };
  it("choosing there (whole framing off), the camera eases in on her and aside from the panel; walking off, back out", () => {
    const p = objectFrontAt(obj("wardrobe"), at, 0.5), g = partsZoom(inHouse(p.x, p.z)), S = g.tuning.camera.station!;
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

  it("choosing a row (whole framing off), the camera zooms on the part of her it's about (camera.station.parts): each part's own aim and distance", () => {
    const P = TUNING.camera.station!.parts!;
    const settle = (part: string) => {
      const p = objectFrontAt(obj("wardrobe"), at, 0.5), g = partsZoom(inHouse(p.x, p.z)), S = g.tuning.camera.station!;
      for (let i = 0; i < 4 * S.ease / STEP; i++) stepGame(g, { ...idle, framing: true, framePart: part }, STEP);
      return { pose: cameraPose(g.camera, g.witch.lift, g.tuning), cam: g.camera };
    };
    const parts = ["head", "hat", "top", "legs", "feet"] as const, at_ = Object.fromEntries(parts.map(p => [p, settle(p)]));
    for (const part of parts) {
      const s = at_[part];
      expect(s.cam.stationAim).toBeCloseTo(P[part].aim!, 2);
      expect(s.cam.stationDistance).toBeCloseTo(P[part].distance, 2);
      // (Ed's playtest, 2026-10-23: "it aims at her feet, and so when you're zoomed close her head is off screen": the aim was metres
      // below her feet; now it's a share of her height as drawn, up her, the view lifting it by how tall she's drawn)
      expect(s.pose.ty - s.cam.ty, part).toBeGreaterThanOrEqual(0);
      expect(s.pose.aim, part).toBeCloseTo(P[part].aim!, 2);
      expect(s.pose.aim!, part).toBeGreaterThan(0);
      expect(s.pose.aim!, part).toBeLessThanOrEqual(1);
    }
    // up her in order: her hat over her head over her top over her legs over her feet
    expect(at_.hat.pose.aim!).toBeGreaterThan(at_.head.pose.aim!);
    expect(at_.head.pose.aim!).toBeGreaterThan(at_.top.pose.aim!);
    expect(at_.top.pose.aim!).toBeGreaterThan(at_.legs.pose.aim!);
    expect(at_.legs.pose.aim!).toBeGreaterThan(at_.feet.pose.aim!);
    expect(at_.head.pose.distance).toBeLessThan(at_.feet.pose.distance);
    // the zoom and the station's never stack: zoomed all the way in first, the station frames her no closer than from the start's zoom
    const zoomedIn = (() => {
      const p = objectFrontAt(obj("wardrobe"), at, 0.5), g = partsZoom(inHouse(p.x, p.z)), S = g.tuning.camera.station!;
      for (let i = 0; i < 20; i++) stepGame(g, { ...idle, zoom: -1 }, STEP);
      for (let i = 0; i < 4 * S.ease / STEP + 600; i++) stepGame(g, { ...idle, framing: true, framePart: "head" }, STEP);
      return cameraPose(g.camera, g.witch.lift, g.tuning);
    })();
    expect(zoomedIn.distance).toBeGreaterThanOrEqual(at_.head.pose.distance * 0.98);
    // the pegboard's frame (board): aimed up over her to the wall behind, the board mid-screen (Alpha's shots, 2026-10-23)
    expect(P.board.look).toBeGreaterThan(0);
    expect(SHELVES.pegboard.frame).toBe("board");
  });

  it("never eases in away from the house, framing or not", () => {
    const g = newGame(123, TUNING);
    g.clock.paused = false;
    for (let i = 0; i < 2 / STEP; i++) stepGame(g, { ...idle, framing: true }, STEP);
    expect(g.camera.station ?? 0).toBe(0);
  });

  it("the map table comes to her by nearness as a table (Ed, 2026-10-23: its chart slides up from the bottom), never as a dressing station", () => {
    const p = before("mapTable", 0.5), g = inHouse(p.x, p.z);
    expect(tableOf(g, null)?.id).toBe("mapTable");
    expect(stationOf(g, null)?.id).not.toBe("mapTable");
    const q = before("mapTable", HOUSE_ROOMS.reach + STATION_SLACK + 0.5), far = inHouse(q.x, q.z);
    expect(tableOf(far, "mapTable")).toBeNull(); // (past the slack: it goes)
    const r = before("mapTable", HOUSE_ROOMS.reach + STATION_SLACK / 2), edge = inHouse(r.x, r.z);
    expect(tableOf(edge, "mapTable")?.id).toBe("mapTable"); // (within the slack, open: it stays)
    expect(tableOf(edge, null)).toBeNull(); // (but isn't opened from there)
  });
});

describe("where her broom is on foot in the house (Ed, 2026-10-23: \"only while she's at the bay. otherwise she holds it when she's on the terrace\")", () => {
  const where = (g: Game) => broomWhere(g, stationOf(g, null)?.id ?? null);
  it("on the lathe while she's at the lathe (the broom's one station since 2026-10-29); by the bay, not a station now, none", () => {
    const p = before("lathe", 0.5), g = inHouse(p.x, p.z); expect(stationOf(g, null)?.id).toBe("lathe"); expect(where(g)).toBe("lathe");
    const b = before("broomBay", 0.5); expect(stationOf(inHouse(b.x, b.z), null)).toBeNull(); expect(where(inHouse(b.x, b.z))).toBe("none");
  });
  it("in her hand on the Terrace (the hub's floor)", () => {
    const d = deck(newGame(123, TUNING)), g = inHouse(0, d.r * 0.3);
    expect(where(g)).toBe("held");
  });
  it("nowhere drawn elsewhere in the rooms: the Workshop away from the bay and the lathe, the pegboard, another room", () => {
    const ws = HOUSE_ROOMS.rooms.find(r => r.id === "workshop")!, mid = inHouse(ws.x - 3, ws.z); // (west of its middle: clear of the bay, the lathe and the pegboard)
    expect(where(mid)).toBe("none");
    const pb = before("pegboard", 0.5); expect(where(inHouse(pb.x, pb.z))).toBe("none");
    const at = HOUSE_ROOMS.rooms.find(r => r.id === "dining")!; expect(where(inHouse(at.x, at.z + 1))).toBe("none");
  });
  it("and off the house's floor (flying), none: she's on it", () => {
    const g = inHouse(0, 0); g.witches[0].body = { ...g.witches[0].body, mode: "treetop", perch: false };
    expect(where(g)).toBe("none");
  });
});
