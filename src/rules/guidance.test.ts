// Guidance pins (rules/guidance.ts; Ed's list, 2026-10-26): one at a time, in order: the bed after a lost night; her first night's
// dressing, station by station; the invitations desk and the lathe (her night's kit, rules/kit.ts); something new till
// she's been to it; the map table for an island found she hasn't seen; the decks. Each gone once it's done, hidden at its target.
import { newKit, takeBroom, takeInvites } from "./kit";
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { HOUSE_ROOMS, objectFront } from "./houseRooms";
import { wakeInBedroom } from "./opening";
import { startWake, WAKE_DEFAULT } from "./wakeUp";
import { wearFromStation } from "./clothesPile";
import { deckOf } from "./treehouse";
import { atGuide, emptyGuide, guidanceOf, seeGuide, GUIDANCE_HOOKS, type GuideSave } from "./guidance";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, s: number, c: Partial<Controls> = {}) => { for (let i = 0; i < Math.round(s / STEP); i++) stepGame(g, { ...idle, ...c }, STEP); };
/** Up in her bedroom: a game's first morning, or (`later`) after a night played (one wake-up for every morning: Ed, 2026-10-26). */
function up(later = false): Game {
  const g = newGame(123, TUNING);
  g.party.spellAt = null; g.clock.paused = false;
  wakeInBedroom(g);
  startWake(g, g.herTime, { yesterday: later }); // (later: after a night played, last night's clothes in their pile)
  run(g, 0.1, { moveX: 1 }); run(g, WAKE_DEFAULT.stretch + 0.1);
  return g;
}
const standAt = (g: Game, id: string) => { const o = HOUSE_ROOMS.objects.find(q => q.id === id)!, p = objectFront(o, g.map.treehouse, 0.6); g.witches[0].body = { ...g.witches[0].body, x: p.x, z: p.z, vx: 0, vz: 0 }; };
const of = (g: Game, s: GuideSave = emptyGuide(), unvisited: string[] = []) => guidanceOf(g, 0, s, unvisited);

describe("guidance pins", () => {
  it("none while she's still in bed", () => {
    const g = newGame(123, TUNING);
    g.party.spellAt = null; wakeInBedroom(g); startWake(g, g.herTime);
    expect(of(g)).toBeNull();
  });

  it("her first night: the dressing stations in turn, the wardrobe first, till she's dressed; then the decks", () => {
    const g = up();
    expect(g.wake!.open).toBe(true);
    expect(of(g)).toEqual({ kind: "dress", target: { object: "wardrobe" } });
    wearFromStation(g.wake!, "wardrobe");
    expect(of(g)?.target).toEqual({ object: "shoeRack" });
    wearFromStation(g.wake!, "shoeRack"); wearFromStation(g.wake!, "cloakPegs"); wearFromStation(g.wake!, "bags");
    expect(of(g)?.target).toEqual({ object: "hats" });
    g.wake!.pile = [];
    const d = deckOf(g.map, g.tuning)!;
    expect(of(g)).toEqual({ kind: "decks", target: { x: d.house!.desk.x, z: d.house!.desk.z } });
  });

  it("no dressing pin after a night played: last night's clothes are in their pile; straight to the decks", () => {
    const g = up(true);
    expect(g.wake!.pile!.length).toBeGreaterThan(0);
    expect(of(g)?.kind).toBe("decks");
  });

  it("a game's first morning on a later load (no night played yet): no pile, so the dressing pins, her hat last on the hats' floor", () => {
    const g = newGame(123, TUNING);
    g.party.spellAt = null; g.clock.paused = false; wakeInBedroom(g); startWake(g, g.herTime, { mirrored: true });
    run(g, 0.1, { moveX: 1 }); run(g, WAKE_DEFAULT.stretch + 0.1);
    expect(of(g)).toEqual({ kind: "dress", target: { object: "wardrobe" } });
    for (const st of ["wardrobe", "shoeRack", "cloakPegs", "bags"]) wearFromStation(g.wake!, st);
    expect(of(g)).toEqual({ kind: "dress", target: { object: "hats" } });
  });

  it("the invitations desk, then the lathe, each till it's done (Lima's pickups; skipped while they say done)", () => {
    const g = up(true);
    let inv = false, broom = false;
    const hooks = { invitationsReady: () => inv, broomTaken: () => broom };
    expect(guidanceOf(g, 0, emptyGuide(), [], hooks)).toEqual({ kind: "desk", target: { object: "invitations" } });
    inv = true;
    expect(guidanceOf(g, 0, emptyGuide(), [], hooks)).toEqual({ kind: "lathe", target: { object: "lathe" } });
    broom = true;
    expect(guidanceOf(g, 0, emptyGuide(), [], hooks)?.kind).toBe("decks");
    // (the hooks are her night's kit, rules/kit.ts: a night with none has both; one that waits for her spell, each till she takes it)
    expect(GUIDANCE_HOOKS.invitationsReady(g, 0) && GUIDANCE_HOOKS.broomTaken(g, 0)).toBe(true);
    g.witches[0].kit = newKit(true);
    expect(guidanceOf(g, 0, emptyGuide(), [])).toEqual({ kind: "desk", target: { object: "invitations" } });
    takeInvites(g.witches[0]);
    expect(guidanceOf(g, 0, emptyGuide(), [])).toEqual({ kind: "lathe", target: { object: "lathe" } });
    takeBroom(g, g.witches[0]);
    expect(guidanceOf(g, 0, emptyGuide(), [])?.kind).toBe("decks");
  });

  it("something new, newest first, till she's been to it; never the map table during the night, new islands or not (Ed, 2026-10-26: \"You don't see it all night\")", () => {
    const g = up(true), s: GuideSave = { unseen: [{ kind: "part", id: "p", at: "lathe" }, { kind: "hat", id: "h", at: "hats" }] };
    expect(of(g, s, ["tiger", "lion"])).toEqual({ kind: "hat", target: { object: "hats" } });
    standAt(g, "bags");
    expect(seeGuide(g, 0, s)).toBe(false);
    standAt(g, "hats");
    expect(seeGuide(g, 0, s)).toBe(true);
    expect(of(g, s, ["tiger", "lion"])).toEqual({ kind: "part", target: { object: "lathe" } });
    standAt(g, "lathe"); seeGuide(g, 0, s);
    expect(s.unseen).toEqual([]);
    expect(of(g, s, ["tiger", "lion"])?.kind).toBe("decks"); // (islands she hasn't been to: still the decks, not the map table)
  });

  it("the decks' pin goes with the party spell cast", () => {
    const g = up(true);
    g.party.spellAt = 1;
    expect(of(g)).toBeNull();
  });

  // (the islands found she can sail to and hasn't been to: app/chartSave.ts unvisited)
  const after = (g: Game, unvisited: string[], s: GuideSave = emptyGuide()) => guidanceOf(g, 0, s, unvisited);
  const MAP = { kind: "chart", target: { object: "mapTable" } }, BED = { kind: "bed", target: { object: "bed" } };

  it("after a lost night: the bed, wherever she is, over everything else, unless there's an island she hasn't been to (Ed, 2026-10-26)", () => {
    const g = up();
    g.party.spellAt = 1;
    g.partyOver = { at: 100, ease: 0 } as Game["partyOver"];
    // (from the moment it's over, no card since Ed's "Remove the end cards", 2026-10-26: the pin alone leads her home)
    expect(of(g)).toEqual(BED);
    g.partyOver = { at: 100, ease: 1 } as Game["partyOver"];
    const s: GuideSave = { unseen: [{ kind: "hat", id: "h", at: "hats" }] };
    expect(after(g, [], s)).toEqual(BED);
    // "No 💤 if there are new islands, just 🧭 towards islands the player can go to and hasn't visited yet"
    expect(after(g, ["lion"], s)).toEqual(MAP);
    g.witches[0].body = { ...g.witches[0].body, perch: null as never };
    expect(after(g, ["lion"], s)).toEqual(MAP); // (the 🧭 too, from anywhere: leading her home)
  });

  it("after a won night, once its finale's settled: the map table while there's an island she hasn't been to, even after the chart's opened; then the bed; shown from anywhere (Ed, 2026-10-26)", () => {
    const g = up(true), W = g.witches[0];
    g.party.spellAt = 1;
    const win = (found: string[], settled: boolean) => { g.win = { phase: "won", settled, found, lost: [] } as unknown as Game["win"]; };
    win(["lion"], false);
    expect(after(g, ["lion"])).toBeNull(); // (the finale still on: nothing yet)
    win(["lion"], true);
    const s: GuideSave = { unseen: [{ kind: "hat", id: "h", at: "hats" }] };
    expect(after(g, ["lion"], s)).toEqual(MAP); // (over anything new in the house; opening the chart doesn't send it away: only going there)
    expect(after(g, ["tiger"], s)).toEqual(MAP); // (an island found on an earlier night she still hasn't been to counts as much)
    expect(after(g, [], s)).toEqual(BED); // (nowhere new to sail: to bed)
    win([], true);
    expect(after(g, [])).toEqual(BED);
    // (out in the world, off the treehouse: still shown, pointing her home)
    W.body = { ...W.body, perch: null as never };
    win(["lion"], true);
    expect(after(g, ["lion"])).toEqual(MAP);
    // (a new night: none of it)
    g.win = null;
    expect(after(g, ["lion"])).toBeNull();
  });

  it("stays the same off the treehouse (Ed, 2026-10-28: \"Whatever pin you had before leaving the treehouse still shows\"), and knows when she's at its target (where the pin stays, over it)", () => {
    const g = up();
    const G = of(g)!;
    expect(atGuide(g, 0, G)).toBe(false);
    standAt(g, "wardrobe");
    expect(atGuide(g, 0, G)).toBe(true);
    const d = deckOf(g.map, g.tuning)!, D = { kind: "decks" as const, target: { x: d.house!.desk.x, z: d.house!.desk.z } }; // (over the desk; at it, at her seat)
    expect(atGuide(g, 0, D)).toBe(false);
    g.witches[0].body = { ...g.witches[0].body, x: d.seat.x + 1, z: d.seat.z };
    expect(atGuide(g, 0, D)).toBe(true);
    g.witches[0].body = { ...g.witches[0].body, perch: null as never, x: g.witches[0].body.x + 40 };
    expect(of(g)).toEqual(G); // (off the treehouse, out in the world: the same pin, still to show; main.ts hides it only under the creator, the chart or a sail)
  });
});
