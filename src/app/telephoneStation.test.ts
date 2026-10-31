import { expect, it, vi } from "vitest";
import { telephoneStation } from "./telephoneStation";
import { loadTelephoneIdentity } from "../platform/online/telephoneIdentity";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { HOUSE_ROOMS, objectWorld } from "../rules/houseRooms";
import { knockOut } from "../rules/knockout";
import type { TelephoneActions } from "../ui/telephone";

it("opens the real telephone use kind without contacting the old relay, and closes on departure/replacement", async () => {
  // Only the boudoir's use dispatch/position is needed, independent of distant island area count.
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning), phoneObject = HOUSE_ROOMS.objects.find(o => o.id === "telephone")!;
  expect(phoneObject.use.kind).toBe("telephone");
  const at = objectWorld(phoneObject, game.map.treehouse); Object.assign(game.witch, at, { perch: true });
  const data = new Map<string, string>(), socket = vi.fn(() => { throw new Error("No relay should be opened"); }), show = vi.fn(), pollPad = vi.fn();
  let actions!: TelephoneActions;
  const station = telephoneStation({ storage: { getItem: k => data.get(k) ?? null, setItem: (k, v) => { data.set(k, v); } }, socket,
    loadIdentity: () => loadTelephoneIdentity({ read: async () => null, write: async () => {} }),
    menu: a => { actions = a; return { show, render: vi.fn(), redial: vi.fn(), pollPad }; },
  });
  try {
    station.use(game, "not-a-phone"); expect(station.open).toBe(false);
    station.use(game, phoneObject.id); expect(station.open).toBe(true);
    await vi.waitFor(() => expect(station.state.status).toBe("preparing"));
    expect(station.state.own).toMatch(/^[1-9][0-9]{6}$/); actions.dial("1234567"); expect(socket).not.toHaveBeenCalled();
    const pad = { id: "test pad" } as Gamepad; let paused = false;
    vi.stubGlobal("navigator", { getGamepads: () => paused ? [] : [pad] });
    station.frame(game, 1); expect(station.open).toBe(true); expect(pollPad).toHaveBeenLastCalledWith(pad, 1);
    paused = true; station.frame(game, 1.5); expect(pollPad).toHaveBeenLastCalledWith(null, 1.5);
    game.witch.x += 100; station.frame(game, 2); expect(station.open).toBe(false);
    Object.assign(game.witch, at); station.use(game, phoneObject.id); await vi.waitFor(() => expect(station.state.status).toBe("preparing"));
    station.frame(null, 3); expect(station.open).toBe(false);
    station.use(game, phoneObject.id); station.frame({ ...game }, 4); expect(station.open).toBe(false);
    game.witches[0].ko = knockOut(game.leash, game.creatures, game.clock.time, tuning); station.use(game, phoneObject.id); expect(station.open).toBe(false);
    expect(socket).not.toHaveBeenCalled(); expect(data.has("witch.telephone.v1")).toBe(true);
  } finally { station.dispose(); vi.unstubAllGlobals(); }
});
