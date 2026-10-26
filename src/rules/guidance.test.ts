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
import { atGuide, emptyGuide, guidanceOf, guideShows, seeGuide, GUIDANCE_HOOKS, type GuideSave } from "./guidance";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, s: number, c: Partial<Controls> = {}) => { for (let i = 0; i < Math.round(s / STEP); i++) stepGame(g, { ...idle, ...c }, STEP); };
/** Up in her bedroom: the first night's whole wake-up, or (`later`) the shorter one of the nights after. */
function up(later = false): Game {
  const g = newGame(123, TUNING);
  g.party.spellAt = null; g.clock.paused = false;
  wakeInBedroom(g);
  startWake(g, g.herTime, later, false, later); // (later: after a night played, last night's clothes in their pile)
  run(g, 0.1, { moveX: 1 }); run(g, WAKE_DEFAULT.stretch + 0.1);
  return g;
}
const standAt = (g: Game, id: string) => { const o = HOUSE_ROOMS.objects.find(q => q.id === id)!, p = objectFront(o, g.map.treehouse, 0.6); g.witches[0].body = { ...g.witches[0].body, x: p.x, z: p.z, vx: 0, vz: 0 }; };
const of = (g: Game, s: GuideSave = emptyGuide(), found: string[] = []) => guidanceOf(g, 0, s, found);

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

  it("a game's first morning on a later load (the shorter wake-up, no night played yet): no pile, so the dressing pins, her hat last on the hats' floor", () => {
    const g = newGame(123, TUNING);
    g.party.spellAt = null; g.clock.paused = false; wakeInBedroom(g); startWake(g, g.herTime, true);
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

  it("something new, newest first, till she's been to it; then the map table for an island she hasn't seen, till she has", () => {
    const g = up(true), s: GuideSave = { unseen: [{ kind: "part", id: "p", at: "broomBay" }, { kind: "hat", id: "h", at: "hats" }], chartSeen: ["tiger"] };
    expect(of(g, s, ["tiger", "lion"])).toEqual({ kind: "hat", target: { object: "hats" } });
    standAt(g, "lathe");
    expect(seeGuide(g, 0, s)).toBe(false);
    standAt(g, "hats");
    expect(seeGuide(g, 0, s)).toBe(true);
    expect(of(g, s, ["tiger", "lion"])).toEqual({ kind: "part", target: { object: "broomBay" } });
    standAt(g, "broomBay"); seeGuide(g, 0, s);
    expect(s.unseen).toEqual([]);
    expect(of(g, s, ["tiger", "lion"])).toEqual({ kind: "chart", target: { object: "mapTable" } });
    s.chartSeen = ["tiger", "lion"];
    expect(of(g, s, ["tiger", "lion"])?.kind).toBe("decks");
  });

  it("the decks' pin goes with the party spell cast", () => {
    const g = up(true);
    g.party.spellAt = 1;
    expect(of(g)).toBeNull();
  });

  it("after a lost night, the bed, wherever she is, over everything else", () => {
    const g = up();
    g.party.spellAt = 1;
    g.partyOver = { at: 100, ease: 1 } as Game["partyOver"];
    const G = of(g, { unseen: [{ kind: "hat", id: "h", at: "hats" }], chartSeen: [] }, ["lion"]);
    expect(G).toEqual({ kind: "bed", target: { object: "bed" } });
    g.witches[0].body = { ...g.witches[0].body, perch: null as never };
    expect(guideShows(g, 0, G!)).toBe(true);
  });

  it("after a won night, once its finale's over: the map table for an island found tonight not yet seen on the chart, then the bed; shown from anywhere, leading her home (Ed, 2026-10-26)", () => {
    const g = up(true), W = g.witches[0];
    g.party.spellAt = 1;
    const win = (found: string[], card: boolean) => { g.win = { phase: "won", card, found, lost: [] } as unknown as Game["win"]; };
    win(["lion"], false);
    expect(of(g)).toBeNull(); // (the finale still on: nothing yet)
    win(["lion"], true);
    const s: GuideSave = { unseen: [{ kind: "hat", id: "h", at: "hats" }], chartSeen: ["tiger"] };
    expect(of(g, s)).toEqual({ kind: "chart", target: { object: "mapTable" } }); // (over anything new in the house)
    s.chartSeen = ["tiger", "lion"];
    expect(of(g, s)).toEqual({ kind: "bed", target: { object: "bed" } });
    win([], true);
    expect(of(g)).toEqual({ kind: "bed", target: { object: "bed" } }); // (no island found tonight: to bed)
    // (out in the world, off the treehouse: still shown, pointing her home)
    W.body = { ...W.body, perch: null as never };
    win(["lion"], true);
    expect(guideShows(g, 0, of(g)!)).toBe(true);
    // (a new night: none of it)
    g.win = null;
    expect(of(g)).toBeNull();
  });

  it("shows only in the treehouse, and hides at its target", () => {
    const g = up();
    const G = of(g)!;
    expect(guideShows(g, 0, G)).toBe(true);
    expect(atGuide(g, 0, G)).toBe(false);
    standAt(g, "wardrobe");
    expect(atGuide(g, 0, G)).toBe(true);
    const d = deckOf(g.map, g.tuning)!, D = { kind: "decks" as const, target: { x: d.house!.desk.x, z: d.house!.desk.z } }; // (over the desk; at it, at her seat)
    expect(atGuide(g, 0, D)).toBe(false);
    g.witches[0].body = { ...g.witches[0].body, x: d.seat.x + 1, z: d.seat.z };
    expect(atGuide(g, 0, D)).toBe(true);
    g.witches[0].body = { ...g.witches[0].body, perch: null as never };
    expect(guideShows(g, 0, D)).toBe(false);
  });
});
