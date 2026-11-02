// Guidance pins (rules/guidance.ts; Ed's list, 2026-10-26): one at a time, in order: the bed after a lost night; her first night's
// morning in Ed's order (2026-10-29: the dressing table, wardrobe, shoes, bags, invitations, cloak, hat, broom); later mornings the invitations desk and the lathe (her night's kit, rules/kit.ts); something new till
// she's been to it; the map table for an island found she hasn't seen; the decks. Each gone once it's done, hidden at its target.
import { newKit, takeBroom, takeInvites } from "./kit";
import { afterEach, describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame as fullGame, stepGame, STEP, type Controls, type Game } from "./game";
import { smallWorld } from "../test/worlds";
import { HAT_FLOOR, HOUSE_ROOMS, addFloorHat, hatSlots, hatsOnFloor, installEdLayout, objectFront, useHats } from "./houseRooms";
import { usesEdLayout } from "../app/houseLayout";
import { wakeInBedroom } from "./opening";
import { startWake, WAKE_DEFAULT } from "./wakeUp";
import { wearFromStation } from "./clothesPile";
import { deckOf } from "./treehouse";
import { atGuide, emptyGuide, guidanceOf, seeGuide, GUIDANCE_HOOKS, type GuideSave } from "./guidance";

const newGame = smallWorld(fullGame, "Guidance pin ordering and home-station targets use supplied progress flags, not the surrounding world.");
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

  it("a game's first morning, in Ed's order (2026-10-29): the dressing table (skin, hair), wardrobe, shoes, bags, the invitations, the cloak, her hat, her broom; then the decks", () => {
    const g = up();
    expect(g.wake!.open).toBe(true);
    let inv = false, broom = false;
    const hooks = { invitationsReady: () => inv, broomTaken: () => broom }, at = () => { const G = guidanceOf(g, 0, emptyGuide(), [], hooks)!; return "object" in G.target ? G.target.object : G.kind; };
    expect(guidanceOf(g, 0, emptyGuide(), [], hooks)).toEqual({ kind: "dress", target: { object: "dressingTable" } });
    g.wake!.styled = true;
    expect(at()).toBe("wardrobe");
    wearFromStation(g.wake!, "wardrobe");
    expect(at()).toBe("shoeRack");
    wearFromStation(g.wake!, "shoeRack");
    expect(at()).toBe("bags");
    wearFromStation(g.wake!, "bags");
    expect(at()).toBe("invitations");
    inv = true;
    expect(at()).toBe("cloakPegs");
    wearFromStation(g.wake!, "cloakPegs");
    expect(at()).toBe("hats");
    g.wake!.pile = [];
    expect(at()).toBe("lathe");
    broom = true;
    expect(at()).toBe("decks");
  });

  it("the dressing table's step is done once she's used it: E there (its panel opened)", () => {
    const g = up();
    expect(of(g)?.target).toEqual({ object: "dressingTable" });
    standAt(g, "dressingTable");
    run(g, STEP, { place: true } as Partial<Controls>);
    expect(g.wake!.styled).toBe(true);
    expect(of(g)?.target).toEqual({ object: "wardrobe" });
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
    expect(of(g)).toEqual({ kind: "dress", target: { object: "dressingTable" } });
    g.wake!.styled = true;
    expect(of(g)).toEqual({ kind: "dress", target: { object: "wardrobe" } });
    for (const st of ["wardrobe", "shoeRack", "cloakPegs", "bags"]) wearFromStation(g.wake!, st);
    expect(of(g)).toEqual({ kind: "dress", target: { object: "hats" } });
  });

  describe("in Ed's arrangement (the default house: app/houseLayout.ts)", () => {
    afterEach(() => installEdLayout(false));
    // (Ed's playtest of v7061, a fresh game: the hat pin led to the old hats' area in the Cloakroom, and nothing was there to take;
    // the first morning's hat lies on hat spawn point 1, in the Parlour since his 2026-11-01 arrangement)
    it("the hat pin points at her hat where it lies, on the first hat spawn point, not at the old hats' area", () => {
      installEdLayout(usesEdLayout(new URLSearchParams()));
      const g = newGame(123, TUNING), W = g.witches[0], at = g.map.treehouse;
      W.spells.hats = []; // (a fresh game: no spell hats found yet, the floor empty)
      g.party.spellAt = null; g.clock.paused = false; wakeInBedroom(g); startWake(g, g.herTime);
      run(g, 0.1, { moveX: 1 }); run(g, WAKE_DEFAULT.stretch + 0.1);
      expect(HOUSE_ROOMS.layout?.hatPoints.length).toBeGreaterThan(0);
      const down = W.hat.down!, first = hatSlots(at)[0];
      expect(down).toMatchObject({ x: first.x, z: first.z });
      expect(HOUSE_ROOMS.objects.some(o => o.use.kind === "hats")).toBe(false); // (the old hats' area is gone: Ed, 2026-11-02)
      g.wake!.styled = true;
      for (const st of ["wardrobe", "shoeRack", "bags", "cloakPegs"]) wearFromStation(g.wake!, st);
      const G = of(g)!;
      expect(G).toEqual({ kind: "dress", target: { x: down.x, z: down.z } });
      expect(atGuide(g, 0, G)).toBe(false);
      W.body = { ...W.body, x: down.x + 0.5, z: down.z, vx: 0, vz: 0 };
      expect(atGuide(g, 0, G)).toBe(true);
      // (and where it points she can take it: on her head, the pin moves on)
      expect(useHats(W, at, W.body.x, W.body.z, g.herTime, g.tuning.leash.runeRadius)?.kind).toBe("hatPicked");
      expect(W.hat.down).toBeNull();
    });

    // (Ed, 2026-11-02: "If there's a hat step but no hat lying anywhere then go to the next step")
    it("a hat step with no hat lying anywhere: on to the next step, no pin at the old area", () => {
      installEdLayout(usesEdLayout(new URLSearchParams()));
      const g = newGame(123, TUNING), W = g.witches[0];
      W.spells.hats = [];
      g.party.spellAt = null; g.clock.paused = false; wakeInBedroom(g); startWake(g, g.herTime);
      run(g, 0.1, { moveX: 1 }); run(g, WAKE_DEFAULT.stretch + 0.1);
      g.wake!.styled = true;
      for (const st of ["wardrobe", "shoeRack", "bags", "cloakPegs"]) wearFromStation(g.wake!, st);
      W.hat.down = null; // (nowhere: the hat step has nothing to point at)
      const G = of(g);
      expect(G?.kind).not.toBe("dress");
      expect(G && "object" in G.target ? G.target.object : null).not.toBe("hats");
      // a found hat lying on no spawn point is passed over too, for the next new thing
      const s: GuideSave = { unseen: [{ kind: "part", id: "p", at: "lathe" }, { kind: "hat", id: "nowhere", at: "hats" }] };
      expect(guidanceOf(g, 0, s, [], { ...GUIDANCE_HOOKS, invitationsReady: () => true, broomTaken: () => true })).toEqual({ kind: "part", target: { object: "lathe" } });
    });

    it("a hat she's found: its pin points at the spawn point it lies on, and goes once she's near enough to take it", () => {
      installEdLayout(usesEdLayout(new URLSearchParams()));
      const g = up(true), W = g.witches[0], at = g.map.treehouse, id = HAT_FLOOR[0];
      W.spells.hats = [id]; addFloorHat(W, id); // (found: laid on the lowest free point, rules/finds.ts)
      const spot = hatSlots(at)[hatsOnFloor(W).indexOf(id)];
      const s: GuideSave = { unseen: [{ kind: "hat", id, at: "hats" }] };
      expect(of(g, s)).toEqual({ kind: "hat", target: { x: spot.x, z: spot.z } });
      expect(seeGuide(g, 0, s)).toBe(false); // (not near it yet)
      W.body = { ...W.body, x: spot.x + 0.5, z: spot.z, vx: 0, vz: 0 };
      expect(atGuide(g, 0, of(g, s)!)).toBe(true);
      expect(seeGuide(g, 0, s)).toBe(true);
      expect(s.unseen).toEqual([]);
    });
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
    // no bag yet (Ed, 2026-10-29: invitations need a bag): the pin leads to the bags first, then the desk
    expect(guidanceOf(g, 0, emptyGuide(), [])).toEqual({ kind: "dress", target: { object: "bags" } });
    g.witches[0].spells.bag = "satchel";
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
    standAt(g, "dressingTable"); // (her first morning's first pin: Ed, 2026-10-29)
    expect(atGuide(g, 0, G)).toBe(true);
    const d = deckOf(g.map, g.tuning)!, D = { kind: "decks" as const, target: { x: d.house!.desk.x, z: d.house!.desk.z } }; // (over the desk; at it, at her seat)
    expect(atGuide(g, 0, D)).toBe(false);
    g.witches[0].body = { ...g.witches[0].body, x: d.seat.x + 1, z: d.seat.z };
    expect(atGuide(g, 0, D)).toBe(true);
    g.witches[0].body = { ...g.witches[0].body, perch: null as never, x: g.witches[0].body.x + 40 };
    expect(of(g)).toEqual(G); // (off the treehouse, out in the world: the same pin, still to show; main.ts hides it only under the creator, the chart or a sail)
  });
});
