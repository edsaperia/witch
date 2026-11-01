import { expect, it } from "vitest";
import { newGame, newWitchPlayer, type Controls, type Game, type Witch } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { HOUSE_ROOMS, objectAt, objectFront } from "../../rules/houseRooms";
import { startWakeFor, wakeOf } from "../../rules/wakeUp";
import { stepSigilButton } from "../../rules/sigilButton";
import { shelvesAt } from "../../rules/wardrobe";
import { stationOf } from "../../rules/stations";
import { stationAuthority } from "./stationAuthority";
import { applyStationChoice, stationChoice } from "./stationChoice";
import { localView } from "./localView";
import { furnitureFor } from "../../rules/guestFurniture";
import { houseSteps } from "./houseSteps";
import { localHouseAction } from "../../app/houseActions";

const fresh = () => {
  // One authored house is sufficient; distant world size cannot affect furniture dispatch.
  const t = structuredClone(TUNING); t.map!.island = "home"; t.map!.islandAreas = 4;
  return newGame(123, t);
};
const object = (id: string) => HOUSE_ROOMS.objects.find(o => o.id === id)!;
const at = (g: Game, w: Witch, id: string) => {
  Object.assign(w.body, objectFront(object(id), g.map.treehouse, .1), { perch: true, mode: "ground", seated: false });
  expect(objectAt(g.map.treehouse, w.body.x, w.body.z)?.id).toBe(id);
};
const use = (g: Game, w: Witch, time: number, held = false) => {
  w.leash.events = [];
  stepSigilButton(g,
  { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, sigil: !held, sigilHeld: held } as Controls,
  w, g.tuning, time, .05, [], () => false, 0);
  g.leashEvents.push(...w.leash.events);
};
const authority = stationAuthority(() => ({ bags: new Set(), hats: new Set(), parts: new Set() }));

it("keeps home bed/wardrobe dispatch and leaves solo guest rooms unavailable", () => {
  const g = fresh(), host = g.witches[0], bed = object("bed");
  at(g, host, "wardrobe"); use(g, host, 0);
  expect(g.leashEvents.some(e => e.kind === "house" && e.obj === "wardrobe" && e.id === 0)).toBe(true);
  expect(stationOf(g, null)?.id).toBe("wardrobe");
  expect(authority(g, 0, { kind: "dress", station: "wardrobe" })).toBe(true);
  expect(object("wardrobe").use).toEqual({ kind: "creator", axes: ["top"], wear: [], parts: ["jacket", "top", "jeans"] });
  at(g, host, bed.id); use(g, host, 1, true); use(g, host, 1 + HOUSE_ROOMS.bed.hold + .01, true);
  expect(host.house?.slept).toBe(true);
  expect(g.leashEvents.filter(e => e.obj === "slept")).toHaveLength(1);
  for (const room of ["bedroom2", "bedroom3"]) {
    expect(HOUSE_ROOMS.rooms.find(r => r.id === room)?.locked).toBe(true);
    expect(furnitureFor(g, host, object(`${room}Wardrobe`))).toBe(false);
  }
});

it.each(["bedroom2", "bedroom3"] as const)("dispatches %s wardrobe through host-approved shelves and dresses only its assigned guest", room => {
  const g = fresh(), host = g.witches[0], guest = newWitchPlayer(1, 0, 0, g.tuning); g.witches.push(guest);
  expect(startWakeFor(g, 0, { yesterday: true }, guest, { player: 1, room })).toBe(true);
  const id = `${room}Wardrobe`; at(g, guest, id); use(g, guest, 1);
  expect(g.leashEvents.some(e => e.obj === id && e.id === 1)).toBe(true);
  expect(stationOf(localView(g, 1).game, null)?.id).toBe(id);
  expect(shelvesAt(id)).toEqual(shelvesAt("wardrobe"));
  const choice = stationChoice({ kind: "dress", station: id })!;
  expect(authority(g, 1, choice)).toBe(true); expect(authority(g, 0, choice)).toBe(false);
  const hostBefore = structuredClone(host);
  expect(wakeOf(g, guest)?.pile).toContain("top"); expect(applyStationChoice(g, 1, choice)).toBe(true);
  expect(wakeOf(g, guest)?.pile).not.toContain("top"); expect(host).toEqual(hostBefore);
  for (const other of ["wardrobe", `${room === "bedroom2" ? "bedroom3" : "bedroom2"}Wardrobe`]) {
    at(g, guest, other); g.leashEvents = []; use(g, guest, 2);
    expect(g.leashEvents.some(e => e.obj === other)).toBe(false);
    expect(stationOf(localView(g, 1).game, null)).toBeNull();
    expect(authority(g, 1, { kind: "dress", station: other })).toBe(false);
  }
});

it("requires each witch in her own bed before the shared night ends, emitting once", () => {
  const g = fresh(), host = g.witches[0], guest = newWitchPlayer(1, 0, 0, g.tuning); g.witches.push(guest);
  startWakeFor(g, 0, { yesterday: true }, guest, { player: 1, room: "bedroom2" });
  const bed = object("bed");
  at(g, guest, bed.id); use(g, guest, 1, true); use(g, guest, 20, true);
  expect(guest.house?.slept).not.toBe(true);
  at(g, guest, "bedroom3Bed"); use(g, guest, 21, true); use(g, guest, 40, true);
  expect(guest.house?.slept).not.toBe(true);
  at(g, host, bed.id); use(g, host, 41, true); use(g, host, 41 + HOUSE_ROOMS.bed.hold + .01, true);
  expect(host.house?.slept).toBe(true); expect(g.leashEvents.some(e => e.obj === "slept")).toBe(false);
  at(g, guest, "bedroom2Bed"); use(g, guest, 50, true); use(g, guest, 50 + HOUSE_ROOMS.bed.hold + .01, true);
  expect(guest.house?.slept).toBe(true); expect(g.leashEvents.filter(e => e.obj === "slept")).toHaveLength(1);
  // Both pages must receive the shared verdict, even when the guest finishes last.
  for (const player of [0, 1] as const) {
    const steps = houseSteps(); steps.capture(g, player, 1); steps.capture(g, player, 1);
    const verdicts = steps.take().leash.filter(e => e.obj === "slept" && localHouseAction(e, player));
    expect(verdicts).toHaveLength(1); expect(steps.take().leash).toHaveLength(0);
  }
  g.leashEvents = []; use(g, guest, 80, true); use(g, host, 80, true);
  expect(g.leashEvents.some(e => e.obj === "slept")).toBe(false);
});
