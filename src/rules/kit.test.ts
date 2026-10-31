// Her night's kit (Ed, 2026-10-26; rules/kit.ts): her invitations from the Parlour's desk and a broom from the Workshop's lathe. Without
// invitations her 💌s don't fly; without a broom she falls off the Terrace (a thud, then back at the magic circle); E takes each.
import { describe, expect, it } from "vitest";
import { TUNING, withTuning } from "./tuning";
import { hitWitch, newGame as fullGame, stepGame, STEP, type Game } from "./game";
import { smallWorld } from "../test/worlds";
const newGame = smallWorld(fullGame, "Kit pickup and Terrace falls use one house and nearby open ground, independent of distant areas.");
import { deckOf } from "./treehouse";
import { HOUSE_ROOMS, objectFront } from "./houseRooms";
import { broomsLeft, hasBag, hasBroom, hasInvites, KIT_BROOMS, needsBag, newKit, takeBroom, takeInvites } from "./kit";

const run = (g: Game, secs: number, c: object = {}) => { for (let i = 0; i < Math.round(secs / STEP); i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...c } as Parameters<typeof stepGame>[1], STEP); };
const events = (g: Game, kind: string) => g.leashEvents.filter(e => e.kind === kind);
const DEG = Math.PI / 180;
// (on the Jet nozzles, as treehouse.test.ts: its walk off the rim is timed by them)
const JETS = withTuning({ spells: { ...TUNING.spells, parts: "nozzles" } });
/** A night waiting for her spell, so with a kit to take: she's at her decks, carrying a bag (or `bag` "": none). */
const night = (T = JETS, bag = "satchel") => { const g = newGame(123, T); g.clock.paused = false; for (const W of g.witches) { W.kit = newKit(true); W.spells.bag = bag || undefined; } return g; };
/** Puts her in front of a house object, on its floor. */
const at = (g: Game, id: string) => {
  const d = deckOf(g.map, g.tuning)!, o = HOUSE_ROOMS.objects.find(q => q.id === id)!, f = objectFront(o, d, 0.4), W = g.witches[0];
  W.body = { ...W.body, x: f.x, z: f.z, vx: 0, vz: 0, perch: true, mode: "ground", lift: 0, seated: false };
};

describe("her night's kit", () => {
  it("is nothing taken on a night that waits for her spell, and both on one that doesn't (the tools, the bots)", () => {
    const g = night(), W = g.witches[0];
    expect([hasInvites(W), hasBroom(W), broomsLeft(g)]).toEqual([false, false, KIT_BROOMS]);
    const free = newGame(123, JETS).witches[0];
    expect([free.kit, hasInvites(free), hasBroom(free)]).toEqual([undefined, true, true]);
    expect(newKit(false)).toBeUndefined();
  });

  it("takes her invitations once, and a broom while one's left at the lathe, one a witch", () => {
    const g = night(), [W] = g.witches;
    expect(takeInvites(W)).toBe(true); expect(takeInvites(W)).toBe(false);
    expect(takeBroom(g, W)).toBe(true); expect(takeBroom(g, W)).toBe(false);
    expect(broomsLeft(g)).toBe(KIT_BROOMS - 1);
  });

  it("E at the invitations desk gives her tonight's invitations; E at the lathe, a broom", () => {
    const g = night();
    at(g, "invitations"); run(g, 0.2);
    run(g, STEP, { place: true, sigilHeld: true });
    expect(hasInvites(g.witches[0])).toBe(true);
    expect(events(g, "kit").map(e => e.obj)).toEqual(["invites"]);
    at(g, "lathe"); run(g, 0.2);
    run(g, STEP, { place: true, sigilHeld: true });
    expect(hasBroom(g.witches[0])).toBe(true);
    expect(events(g, "kit").map(e => e.obj)).toEqual(["broom"]);
    expect(broomsLeft(g)).toBe(KIT_BROOMS - 1);
  });

  it("won't give her invitations till she carries a bag (Ed, 2026-10-29: \"you can't pick up invitations until you're carrying a bag\"): the desk says why", () => {
    const g = night(JETS, ""), W = g.witches[0];
    expect([needsBag(W), hasBag(W)]).toEqual([true, false]);
    expect(takeInvites(W)).toBe(false);
    at(g, "invitations"); run(g, 0.2);
    run(g, STEP, { place: true, sigilHeld: true });
    expect(hasInvites(W)).toBe(false);
    expect(events(g, "needBag").map(e => e.obj)).toEqual(["invitations"]);
    expect(events(g, "kit")).toEqual([]);
    W.spells.bag = "bumbag"; // (a bag chosen at the bags station)
    run(g, 0.3);
    run(g, STEP, { place: true, sigilHeld: true });
    expect(hasInvites(W)).toBe(true);
    expect(needsBag(W)).toBe(false);
    // a night with no kit (the tools, the bots) has her invitations, bag or none
    expect(hasInvites(newGame(123, JETS).witches[0])).toBe(true);
  });

  it("without her invitations, her 💌 key throws nothing; with them, as ever (Ed: \"no ammo that runs out\")", () => {
    const g = newGame(123, JETS), W = g.witches[0];
    g.clock.paused = false; g.party.paused = true;
    run(g, 0.3, { moveZ: -1 }); // (off her seat)
    W.body = { ...W.body, x: g.map.dancefloor.x + 40, z: g.map.dancefloor.z + 40, perch: undefined, mode: "ground", lift: 0, seated: false, vx: 0, vz: 0 };
    W.kit = newKit(true); W.spells.bag = "satchel";
    run(g, 1, { fire: true, aimX: W.body.x + 10, aimZ: W.body.z });
    expect(W.invites.letters.length).toBe(0);
    takeInvites(W);
    run(g, 1, { fire: true, aimX: W.body.x + 10, aimZ: W.body.z });
    expect(W.invites.letters.length).toBeGreaterThan(0);
  });

  it("without a broom, off the Terrace's open rim she falls: a thud below, a beat, then back at the magic circle; with one, she flies", () => {
    const out = { moveX: Math.cos(40 * DEG), moveZ: Math.sin(40 * DEG) }; // (south-east, past the desk's east end: treehouse.test.ts)
    const HS = JETS.treehouse.house!, along = 0.7 * 5 / HS.walk;
    const g = night(), d = deckOf(g.map, g.tuning)!;
    run(g, 0.2, { moveZ: -1 }); run(g, along, { moveX: 1 });
    let falling = false;
    for (let i = 0; i < 600 && !falling; i++) { run(g, STEP, out); falling = g.witch.falling !== undefined; }
    expect(falling).toBe(true);
    let thud = 0, fell = 0, thudAt = -1, fellAt = -1;
    for (let i = 0; i < Math.round((HS.fall.time + (HS.fall.beat ?? 0) + 0.3) / STEP); i++) {
      run(g, STEP); if (events(g, "thud").length) { thud++; thudAt = i; } if (events(g, "fell").length) { fell++; fellAt = i; }
    }
    expect([thud, fell]).toEqual([1, 1]);
    expect((fellAt - thudAt) * STEP).toBeCloseTo(HS.fall.beat ?? 0, 1); // (the beat between the thud and her coming back)
    expect(g.witch.falling).toBeUndefined();
    expect(g.witch.x).toBeCloseTo(d.house!.circle.x, 6); expect(g.witch.z).toBeCloseTo(d.house!.circle.z, 6);
    // with a broom: the same walk takes her flying
    const g2 = night(); takeBroom(g2, g2.witches[0]);
    run(g2, 0.2, { moveZ: -1 }); run(g2, along, { moveX: 1 });
    let off = false;
    for (let i = 0; i < 600 && !off; i++) { run(g2, STEP, out); off = g2.witch.mode === "rising" || g2.witch.mode === "treetop"; expect(g2.witch.falling).toBeUndefined(); }
    expect(off).toBe(true);
  });

  it("keeps both through a knockout", () => {
    const g = night(), W = g.witches[0];
    takeInvites(W); takeBroom(g, W);
    W.body = { ...W.body, x: g.map.dancefloor.x + 40, z: g.map.dancefloor.z + 40, perch: undefined, mode: "ground", lift: 0, seated: false };
    W.health.hp = 1;
    hitWitch(g, 0, g.clock.time);
    run(g, 2);
    expect([hasInvites(W), hasBroom(W)]).toEqual([true, true]);
  });
});
