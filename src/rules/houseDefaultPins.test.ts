import { afterEach, expect, it } from "vitest";
import { usesEdLayout } from "../app/houseLayout";
import { HOUSE_ROOMS, installEdLayout, objectFront, objectWorld } from "./houseRooms";
import { houseArtLayout } from "./housePlacement";
import { bedFor, bedRoom, doorFor, startWake, startWakeFor, stepWake, WAKE_DEFAULT } from "./wakeUp";
import classicTurret from "../../config/house/rooms/turret.json";
import { newGame as fullGame } from "./game";
import { smallWorld } from "../test/worlds";
import { TUNING } from "./tuning";
import { artCacheKey } from "../render/artCache";
import type { ArtJob } from "../render/artBuild";
import proposal from "../../docs/evidence/treehouse-layout-ed-2026-10-31.v2-proposal.json";

afterEach(() => installEdLayout(false));
const newGame = smallWorld(fullGame, "Default-layout wake and art pins need only the current house.");
const pose = (id: string) => proposal.objects.find(o => o.id === id)!;

it("pins the default host/guest wake, bedside and doors to the authored layout", () => {
  installEdLayout(usesEdLayout(new URLSearchParams()));
  const g = newGame(123, TUNING, 2), host = g.witches[0], guest = g.witches[1];
  const bed = HOUSE_ROOMS.objects.find(o => o.id === "bed")!;
  expect(bed).toMatchObject({ x: pose("bed").x, z: pose("bed").z });
  expect(bedFor(bedRoom())?.id).toBe("bed");
  expect(startWake(g, 0, { yesterday: true })).toBe(true);
  expect(host.body).toMatchObject(objectWorld(bed, g.map.treehouse, bed.w * .15, 0));
  stepWake(g, { moveX: 1, moveZ: 0, toggleMode: false, zoom: 0 }, 1, WAKE_DEFAULT);
  stepWake(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 + WAKE_DEFAULT.stretch, WAKE_DEFAULT);
  expect(host.body).toMatchObject(objectFront(bed, g.map.treehouse, 1.4));
  for (const room of ["bedroom2", "bedroom3"]) {
    const bed = bedFor(room)!, door = doorFor(room)!;
    expect(bed).toMatchObject({ x: pose(bed.id).x, z: pose(bed.id).z });
    expect(door).toMatchObject({ x: pose(door.id).x, z: pose(door.id).z });
    expect(startWakeFor(g, 2, { yesterday: true }, guest, { player: 1, room })).toBe(true);
    expect(guest.body).toMatchObject(objectWorld(bed, g.map.treehouse, bed.w * .15, 0));
  }
});

it("uses the same selected house art identity for default and ed alias, and restores classic pins", () => {
  installEdLayout(usesEdLayout(new URLSearchParams()));
  const selected = houseArtLayout(HOUSE_ROOMS)!;
  expect(selected.config.layout?.id).toBe("ed");
  expect(selected.config.objects.find(o => o.id === "bed")).toMatchObject({ x: pose("bed").x, z: pose("bed").z });
  expect(selected.config.terrace.decks.rotation).toBe(45);
  const job = { kind: "housePiece", id: "bed|@6:0.4", style: {}, ppm: 6, pitch: .4, layout: selected } as ArtJob;
  const key = artCacheKey(job, "style", { housePiece: "unchanged-generator" });
  installEdLayout(usesEdLayout(new URLSearchParams("layout=ed")));
  expect(houseArtLayout(HOUSE_ROOMS)!.identity).toBe(selected.identity);
  expect(key).toContain(`layout:${selected.identity}`);
  installEdLayout(usesEdLayout(new URLSearchParams("layout=classic")));
  expect(HOUSE_ROOMS.layout).toBeUndefined(); expect(houseArtLayout(HOUSE_ROOMS)).toBeUndefined();
  const original = classicTurret.objects.find(o => o.id === "bed")!;
  expect(HOUSE_ROOMS.objects.find(o => o.id === "bed")).toMatchObject({ x: classicTurret.x + original.offset[0], z: classicTurret.z + original.offset[1] });
});
