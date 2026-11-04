// The house made under the loading screen (Ed, 2026-11-04: "why don't we do this during the loading screen"; render/houseRooms.ts
// preload, View.prepare): its floor, every piece of furniture in every state (the guests' bedrooms' sheeted and open both), each room's
// dressing and the Workshop's pegboard, asked of the art workers and made into their meshes before preload resolves; a visit's start
// asks for nothing and makes nothing more; and the game is only read. (Headless: the page's elements and the art workers stand-ins.)
import { afterEach, describe, expect, it, vi } from "vitest";
import { newGame as fullGame, type Game } from "../rules/game";
import { smallWorld } from "../test/worlds";
import { TUNING } from "../rules/tuning";
import { deckOf } from "../rules/treehouse";
import { HOUSE_ROOMS } from "../rules/houseRooms";
import { guestRoomsOpen } from "../rules/guestFurniture";
import { snapshotGame } from "../rules/nightSnapshot";
import { GUEST_FURNITURE } from "../../art/furniture.js";
import { FURNITURE, furnitureStates } from "./houseFurniture";
import { placedDecorRooms } from "./houseDecor";
import { HouseRoomsView } from "./houseRooms";
import type { View } from "./view";

const newGame = smallWorld(fullGame, "The house's rooms are the same on any island; only its treehouse's deck is read.");

afterEach(() => { vi.unstubAllGlobals(); });

/** A stand-in element: any property a function that hands back another, style taking anything. */
function fakeEl(): unknown {
  const o: Record<string | symbol, unknown> = { style: {}, remove() {}, append() {}, addEventListener() {} };
  return new Proxy(o, { get: (t, k) => (k in t ? t[k] : k === "then" ? undefined : () => fakeEl()) });
}

/** A view round `game` whose art workers draw every piece as a pixel (a room's dressing too), a frame later; their asks counted. */
function standIn(game: Game) {
  vi.stubGlobal("document", { createElement: () => fakeEl(), body: { append() {} } });
  const asked: string[] = [];
  const piece = { px: new Uint8ClampedArray([255, 255, 255, 255]), w: 1, h: 1, ox: 0, oy: 1, marks: {} };
  const v = {
    game, mpp: 0.5, shaderLandingLimited: false, landingPresentationMs: 0, partsFound: new Set<string>(),
    assets: {
      style: {}, witchGenome: null,
      treehouse: { ent: { deck: { x: 100, y: 200 }, table: { x: 0, y: 0 } }, seat: { x: 100, y: 230 } },
      oneOff: (job: { kind: string; id: string }) => { asked.push(`${job.kind}:${job.id}`); return new Promise(res => setTimeout(() => res({ housePiece: piece }), 0)); },
      track: () => {},
    },
  } as unknown as View;
  return { v, asked };
}

/** The pieces the house can draw: each object drawn as art in every state it has (its plain one when it has none), each room's dressing. */
function everyPiece(): string[] {
  const keys = HOUSE_ROOMS.objects.filter(o => FURNITURE.has(o.id)).flatMap(o => { const s = furnitureStates(o.id); return s.length ? s.map(st => `${o.id}|${st}`) : [`${o.id}|`]; });
  return [...keys, ...placedDecorRooms().map(r => `decor:${r.id}`)];
}

describe("the house made under the loading screen", () => {
  it("has a treehouse with rooms to make (the default night's)", () => {
    const g = newGame(123, TUNING);
    expect(deckOf(g.map, g.tuning)?.house?.rooms).toBeTruthy();
    expect([...GUEST_FURNITURE].some(id => FURNITURE.has(id as string))).toBe(true);
  });

  it("resolves only once its floor and every piece in every state are made into their meshes, the guests' sheeted and open both", async () => {
    const g = newGame(123, TUNING), { v, asked } = standIn(g), H = new HouseRoomsView();
    await H.preload(v);
    const s = H as unknown as { pieces: Map<string, unknown>; floorArt: unknown; came: unknown[]; furniture: { children: unknown[] } };
    expect(s.floorArt).toBeTruthy();
    const keys = everyPiece();
    expect([...s.pieces.keys()].sort()).toEqual([...keys].sort());
    for (const id of GUEST_FURNITURE as Set<string>) if (FURNITURE.has(id)) for (const st of ["sheeted", "open"]) expect(s.pieces.has(`${id}|${st}`), `${id} ${st}`).toBe(true);
    expect(s.came).toHaveLength(0);
    expect(asked.filter(a => a.startsWith("housePiece:"))).toHaveLength(keys.length); // (each once)
    expect(asked.some(a => a.startsWith("workshopPic:"))).toBe(true); // (the pegboard's pictures)
  });

  it("asks for nothing and makes nothing more when a visit starts (or for the bed's next night)", async () => {
    const g = newGame(123, TUNING), { v, asked } = standIn(g), H = new HouseRoomsView();
    await H.preload(v);
    const s = H as unknown as { pieces: Map<string, unknown> }, n = asked.length, meshes = s.pieces.size;
    // (a visit: a second witch woken in a guest's bedroom, as the shared night has it: rules/guestFurniture.ts)
    const visit = newGame(123, TUNING, 2);
    visit.witches[1].wake = { ...(visit.wake ?? {}), player: visit.witches[1].id, room: "bedroom2" } as never;
    expect(guestRoomsOpen(visit)).toBe(true);
    (v as unknown as { game: Game }).game = visit;
    await H.preload(v);
    H.reset(); // (the bed's next night: View.setGame)
    await H.preload(v);
    expect(asked.length).toBe(n);
    expect(s.pieces.size).toBe(meshes);
  });

  it("only reads the game: the night after preload is the night before it", async () => {
    const g = newGame(123, TUNING), { v } = standIn(g), before = snapshotGame(g);
    await new HouseRoomsView().preload(v);
    expect(snapshotGame(g)).toEqual(before);
  });

  it("makes nothing before the Ent's art is in (its anchors set the pictures' pitch)", async () => {
    const g = newGame(123, TUNING), { v, asked } = standIn(g);
    (v.assets as unknown as { treehouse: { ent?: unknown } }).treehouse.ent = undefined;
    await new HouseRoomsView().preload(v);
    expect(asked).toHaveLength(0);
  });
});
