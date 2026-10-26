// The new opening's wake-up (rules/wakeUp.ts; Ed, 2026-10-20): each beat's input (the alarm, E snoozing it five seconds a time as
// often as she likes, moving getting her up, the stretch, walking, the mirror the first time), and the bedroom's door: shut till
// she's up, and on nothing else (the oak, Ed 2026-10-24: no curtains, nothing waiting on the island's build; Ed 2026-10-25: not on
// her clothes either, "I should be able to leave regardless").
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { HOUSE_ROOMS, floorHats, fromObject, fromPlan, hatSlots, objectFront, toPlan } from "./houseRooms";
import { inRoom as inBlob } from "../../config/house/shape.js";
import { wakeInBedroom } from "./opening";
import { atDecks, bedRoom, doorShut, endDream, startWake, WAKE_DEFAULT, type WakeEvent } from "./wakeUp";
import { dressed, pileOut, PILE_SLOTS, wearFromStation, wearPiece, wornGenome } from "./clothesPile";
import { deckOf, onTerrace } from "./treehouse";
import { heldByRoutine } from "./djSet";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const K = WAKE_DEFAULT;
const obj = (id: string) => HOUSE_ROOMS.objects.find(o => o.id === id)!;

/** Woken by the dive: in bed in her bedroom, the alarm ringing, the night's spell not cast. */
/** (`later`: a later wake-up, the shorter one, with last night's clothes in their pile by her bed) */
function woken(ready = false, later = false): Game {
  const g = newGame(123, TUNING);
  g.party.spellAt = null; g.clock.paused = false; g.islandReady = ready;
  wakeInBedroom(g);
  startWake(g, g.herTime, later);
  return g;
}
const run = (g: Game, s: number, c: Partial<Controls> = {}) => { const seen: WakeEvent[] = []; for (let i = 0; i < Math.round(s / STEP); i++) { stepGame(g, { ...idle, ...c }, STEP); seen.push(...(g.wake?.events ?? [])); } return seen; };
const press = (g: Game) => run(g, STEP, { place: true, sigil: true });
const rel = (g: Game) => toPlan(g.map.treehouse, g.witch.x, g.witch.z); // (where she is on the house's plan)
const inRoom = (g: Game) => fromObject(obj("bed"), { x: 0, z: 0 }, rel(g).x, rel(g).z) < 3; // (in her bed or by it: Ed, 2026-10-26, it stands in the corridor up to the Turret)
/** Up and walking: snoozed out of bed by a step of WASD, the stretch over. */
function up(ready = false, later = false): Game { const g = woken(ready, later); run(g, 0.1, { moveX: 1 }); run(g, K.stretch + 0.1); return g; }
const standAt = (g: Game, id: string, by = 0.6) => { const p = objectFront(obj(id), g.map.treehouse, by); g.witches[0].body = { ...g.witches[0].body, x: p.x, z: p.z, vx: 0, vz: 0 }; };

describe("the alarm", () => {
  it("rings with her in bed, held there, the night not started", () => {
    const g = woken(), p = rel(g);
    run(g, 3);
    expect(g.wake!.beat).toBe("alarm");
    expect(rel(g)).toEqual(p);
    expect(g.party.spellAt).toBeNull();
  });

  it("E snoozes it, but not a press the moment it starts ringing", () => {
    const g = woken();
    press(g);
    expect(g.wake!.beat).toBe("alarm"); // (inside alarmMin: a press carried over from the dive)
    run(g, K.alarmMin);
    expect(press(g)).toContain("snooze");
    expect(g.wake).toMatchObject({ beat: "snooze", snoozes: 1 });
  });
});

describe("the snooze", () => {
  it("lasts five seconds, then the alarm rings again; as often as she likes", () => {
    const g = woken();
    for (let n = 1; n <= 4; n++) {
      run(g, K.alarmMin); press(g);
      expect(g.wake).toMatchObject({ beat: "snooze", snoozes: n });
      expect(run(g, K.snooze - 0.2)).not.toContain("ring");
      expect(run(g, 0.3)).toContain("ring");
      expect(g.wake!.beat).toBe("alarm");
    }
  });

  it("E while snoozing does nothing more", () => {
    const g = woken();
    run(g, K.alarmMin); press(g); run(g, 1); press(g);
    expect(g.wake).toMatchObject({ beat: "snooze", snoozes: 1 });
  });
});

describe("getting up", () => {
  for (const from of ["alarm", "snooze"] as const) it(`moving gets her up from the ${from}: the stretch, held, then beside her bed`, () => {
    const g = woken();
    if (from === "snooze") { run(g, K.alarmMin); press(g); }
    const inBed = rel(g);
    expect(run(g, STEP, { moveZ: 1 })).toContain("stretch");
    run(g, K.stretch - 0.2, { moveX: 1 });
    expect(rel(g)).toEqual(inBed); // (stretching: no walking yet)
    expect(run(g, 0.3)).toContain("up");
    const f = objectFront(obj("bed"), { x: 0, z: 0 }, 1.4); // (in front of the bed: its side towards its room's middle, rules/opening.ts bedside)
    expect(Math.hypot(rel(g).x - f.x, rel(g).z - f.z)).toBeLessThan(0.1);
    const x = g.witch.x;
    run(g, 1, { moveX: -1 });
    expect(g.witch.x).toBeLessThan(x - 1); // (WASD walks her)
  });

  it("a rise does too, but she doesn't fly", () => {
    const g = woken();
    run(g, STEP, { toggleMode: true });
    expect(g.wake!.beat).toBe("stretch");
    run(g, K.stretch + 0.1); run(g, 1, { toggleMode: true });
    expect(g.witch.mode).toBe("ground");
  });
});

describe("the dressing table", () => {
  it("opens its mirror by itself the first time she comes to it, once", () => {
    const g = up();
    standAt(g, "dressingTable", 0.3);
    expect(run(g, STEP)).toContain("mirror");
    run(g, 0.5, { moveX: 1 });
    standAt(g, "dressingTable", 0.3);
    expect(run(g, 0.5)).not.toContain("mirror");
  });
});

describe("the door, and nothing waiting on the build (the oak, Ed 2026-10-24: \"No curtains, and no loading gate\")", () => {
  it("up, she walks out of the bedroom's door in her nightie, the island built or not (Ed, 2026-10-25: \"I should be able to leave regardless\")", () => {
    for (const ready of [false, true]) {
      const g = up(ready);
      expect(g.wake!.open).toBe(true);
      expect(dressed(g.wake)).toBe(false);
      expect(doorShut(g)).toBe(false);
      atDoor(g); run(g, 4, outward());
      expect(outOfBedroom(g)).toBe(true);
      expect(g.wake!.pile).toEqual([...PILE_SLOTS]); // (last night's clothes still by her bed, for whenever she wants them)
    }
  });

  it("the door's shut only till she's up: asleep, ringing, snoozing and stretching (held in bed then too)", () => {
    const g = woken();
    expect(doorShut(g)).toBe(true);
    run(g, K.alarmMin); press(g);
    expect(g.wake!.beat).toBe("snooze"); expect(doorShut(g)).toBe(true);
    run(g, STEP, { moveX: 1 });
    expect(g.wake!.beat).toBe("stretch"); expect(doorShut(g)).toBe(true);
    atDoor(g); run(g, STEP); // (put at the door mid-stretch: kept on the bedroom's floor)
    expect(outOfBedroom(g)).toBe(false);
    run(g, K.stretch + 0.1);
    expect(g.wake!.open).toBe(true); expect(doorShut(g)).toBe(false);
  });

  it("nor does the bed end the night meanwhile, nor any key cast the spell", () => {
    const g = up(false);
    standAt(g, "bed", 0.4);
    run(g, 3, { place: true, sigil: true, sigilHeld: true, castParty: true, spell: true });
    expect(g.leashEvents.some(e => e.kind === "house" && e.obj === "slept")).toBe(false);
    expect(g.party.spellAt).toBeNull();
  });

  it("dressed, the door opens with the island still being built; the spell waits for her decks", () => {
    const g = up(false, true);
    expect(g.islandReady).toBe(false);
    standAt(g, "clothesPile", 0.4); expect(press(g)).toContain("dressed");
    expect(doorShut(g)).toBe(false);
    atDoor(g); run(g, 4, outward());
    expect(outOfBedroom(g)).toBe(true);
    expect(g.party.spellAt).toBeNull();
  });

  it("has no curtains, and nothing says \"not yet\"", () => {
    expect(HOUSE_ROOMS.objects.some(o => o.id === "curtains")).toBe(false);
    const g = up(false), seen = run(g, 2, { place: true, sigil: true });
    expect(seen as string[]).not.toContain("notYet");
    expect(seen as string[]).not.toContain("curtains");
  });
});

/** By the door of the room her bed's in (the Turret: Ed, 2026-10-26, "Move the bed to the turret"), just inside it: on the trunk's
 *  limb down to her Bedroom, a metre in from where it leaves the Turret's own floor (config/house/). */
const doorBranch = () => HOUSE_ROOMS.corridors.find(c => c.id === "bedroom-turret")!.pts!;
const atDoor = (g: Game) => {
  const p = doorBranch(), [x0, z0] = p[p.length - 1], [x1, z1] = p[0];
  let t = 0;
  while (t < 1 && inBlob(HOUSE_ROOMS.shape, bedRoom(), x0 + (x1 - x0) * t, z0 + (z1 - z0) * t) < -1) t += 0.005;
  const at = fromPlan(g.map.treehouse, x0 + (x1 - x0) * t, z0 + (z1 - z0) * t);
  g.witches[0].body = { ...g.witches[0].body, x: at.x, z: at.z, vx: 0, vz: 0 };
};
/** Walking out of the door, along its branch down to her Bedroom. */
const outward = (): Partial<Controls> => { const p = doorBranch(), [x0, z0] = p[p.length - 1], [x1, z1] = p[0], L = Math.hypot(x1 - x0, z1 - z0); return { moveX: (x1 - x0) / L, moveZ: (z1 - z0) / L }; };
/** A limb's middle line on the plan, from `a`'s end to `b`'s. */
const limb = (a: string, b: string): [number, number][] => {
  const c = HOUSE_ROOMS.corridors.find(q => q.id === `${a}-${b}`) ?? HOUSE_ROOMS.corridors.find(q => q.id === `${b}-${a}`)!;
  return c.id === `${a}-${b}` ? c.pts! : [...c.pts!].reverse();
};
/** Walks her through the plan's points in turn (steered at each); whether she got to the last within `limit` seconds. */
function follow(g: Game, pts: [number, number][], limit = 60): boolean {
  const W = g.witches[0];
  let t = 0, i = 0;
  while (i < pts.length && t < limit) {
    const p = fromPlan(g.map.treehouse, pts[i][0], pts[i][1]), dx = p.x - W.body.x, dz = p.z - W.body.z, L = Math.hypot(dx, dz);
    if (L < (i === pts.length - 1 ? 0.4 : 1.2)) { i++; continue; }
    stepGame(g, { ...idle, moveX: dx / L, moveZ: dz / L }, STEP); t += STEP;
  }
  return i === pts.length;
}
/** Out of her bed's room: past its own floor's edge (on the house's plan). */
const outOfBedroom = (g: Game) => { const p = rel(g); return inBlob(HOUSE_ROOMS.shape, bedRoom(), p.x, p.z) > 0.3; };

/** Up and dressed: free to walk the house, the party not started. */
function upAndDressed(): Game {
  const g = up();
  expect(g.wake!.open).toBe(true);
  for (const st of ["wardrobe", "shoeRack", "cloakPegs", "bags"]) wearFromStation(g.wake!, st); // (her first night: no pile, each piece at its station)
  wearPiece(g.wake!, "hat");
  expect(dressed(g.wake)).toBe(true);
  return g;
}

describe("last night's clothes (Ed, 2026-10-23: \"When waking up she wears only a nightie; last night's clothes are in a pile on the floor (pick all up with x/e)\")", () => {
  it("she wakes in her nightie, every piece of her outfit in the pile in her Bedroom, by the wardrobe (her bed up in the Turret: Ed, 2026-10-26)", () => {
    const g = woken(false, true);
    expect(pileOut(g.wake)).toBe(true);
    expect(g.wake!.pile).toEqual([...PILE_SLOTS]);
    const pile = HOUSE_ROOMS.objects.find(o => o.use.kind === "pile")!, by = obj("wardrobe");
    expect(pile.room).toBe("bedroom");
    expect(Math.hypot(pile.x - by.x, pile.z - by.z)).toBeLessThan(5); // (by the wardrobe)
    const on = wornGenome(null, g.wake!.pile) as unknown as { hat: { shape: string }; cloak: string; accessories: Record<string, unknown> };
    expect(on.accessories.nightie).toBe(true); expect(on.accessories.barefoot).toBe(true); expect(on.accessories.phones).toBe(false);
    expect(on.hat.shape).toBe("none"); expect(on.cloak).toBe("none");
  });

  it("the shorter wake-up too (every wake-up: later loads, after the bed)", () => {
    const g = newGame(123, TUNING);
    g.party.spellAt = null; wakeInBedroom(g); startWake(g, g.herTime, true);
    expect(g.wake!.pile).toEqual([...PILE_SLOTS]);
  });

  it("her first wake-up has no pile (Ed, 2026-10-26: \"if it's the first night, there won't be any last night's clothes\"): in her nightie all the same, dressing at the stations; E where it would lie does nothing", () => {
    const g = up();
    expect(g.wake!.pile).toEqual([...PILE_SLOTS]); // (the pieces still to put on)
    expect(pileOut(g.wake)).toBe(false);
    standAt(g, "clothesPile", 0.4);
    expect(press(g)).not.toContain("dressed");
    expect(g.wake!.pile).toEqual([...PILE_SLOTS]);
    wearFromStation(g.wake!, "wardrobe");
    expect(g.wake!.pile).toEqual(PILE_SLOTS.filter(s => s !== "top"));
  });

  it("E at the pile puts on all of it at once: dressed", () => {
    const g = up(false, true);
    standAt(g, "clothesPile", 0.4);
    expect(press(g)).toContain("dressed");
    expect(g.wake!.pile).toEqual([]);
    expect(dressed(g.wake)).toBe(true);
    expect(press(g)).not.toContain("dressed"); // (nothing left to put on)
  });

  it("a station's choice puts its piece on her, and the pile keeps the rest (Ed: \"if she puts on a top via the menu, the pile then puts on everything else except yesterday's top\")", () => {
    const g = up(false, true), w = g.wake!;
    expect(wearFromStation(w, "wardrobe")).toBe(true);
    expect(w.pile).toEqual(PILE_SLOTS.filter(s => s !== "top"));
    expect(wearFromStation(w, "wardrobe")).toBe(false); // (on already)
    expect(wearFromStation(w, "dressingTable")).toBe(false); // (her hair and face: hers in the nightie too)
    const on = wornGenome(null, w.pile) as unknown as { accessories: Record<string, unknown> };
    expect(on.accessories.nightie).toBeUndefined(); expect(on.accessories.barefoot).toBe(true); // (her top on, her feet still bare)
    wearFromStation(w, "shoeRack"); wearFromStation(w, "cloakPegs");
    expect(w.pile).toEqual(["hat", "bits"]);
    standAt(g, "clothesPile", 0.4); press(g);
    expect(w.pile).toEqual([]);
    expect(wornGenome(null, w.pile)).toBeNull(); // (dressed: her own look, as it is)
  });

  it("in her nightie, a hat taken off the Cloakroom's hats' floor is on her head, out of the pile (so she's drawn in it)", () => {
    const g = up(), W = g.witches[0], hats = floorHats(W), slots = hatSlots(g.map.treehouse), i = hats.findIndex(h => h !== "");
    const took = hats[i];
    W.body = { ...W.body, x: slots[i].x, z: slots[i].z, vx: 0, vz: 0 };
    run(g, STEP, { place: true, sigilHeld: true });
    expect(W.spells.hat).toBe(took);
    expect(g.wake!.pile).toEqual(PILE_SLOTS.filter(p => p !== "hat"));
  });

  it("half dressed by the stations, she walks out as she is, the rest left in the pile", () => {
    const g = up();
    for (const st of ["wardrobe", "shoeRack"]) wearFromStation(g.wake!, st);
    expect(doorShut(g)).toBe(false);
    atDoor(g); run(g, 4, outward());
    expect(outOfBedroom(g)).toBe(true);
    expect(g.wake!.pile).toEqual(["cloak", "hat", "bits"]);
  });
});

describe("dressing before the door (Ed, 2026-10-21: \"all of the customisation options (except for broom, hat, and bag) should be before the locked door\")", () => {
  it("every dressing station but the Cloakroom's (the hat's mirror, the cloak pegs), the bags and the Workshop's is in the bedroom", () => {
    const st = HOUSE_ROOMS.objects.filter(o => o.use.kind === "creator");
    expect(st.filter(o => o.room === "bedroom").map(o => o.id).sort()).toEqual(["dressingTable", "shoeRack", "wardrobe"]);
    expect(st.filter(o => o.room !== "bedroom").map(o => o.id).sort()).toEqual(["bags", "broomBay", "cloakPegs", "lathe", "mirror", "pegboard"]);
    expect(obj("cloakPegs").room).toBe("cloakroom");
  });

  it("the wake-up's over as she gets up, not while she's in bed or stretching, the island built or not", () => {
    const g = woken(false);
    run(g, 1);
    expect(g.wake!.open).toBe(false); // (still ringing)
    run(g, 0.1, { moveX: 1 }); run(g, K.stretch - 0.2);
    expect(g.wake!.open).toBe(false); // (stretching)
    expect(run(g, 0.4)).toContain("up");
    expect(g.wake!.open).toBe(true);
  });
});
const toSeat = (g: Game, dz = 0.6) => { const d = deckOf(g.map, g.tuning)!; g.witches[0].body = { ...g.witches[0].body, x: d.seat.x, z: d.seat.z - dz, vx: 0, vz: 0 }; };

describe("the DJ intro at her decks (in place of the party spell)", () => {
  it("no key casts the spell on her way out, nor E anywhere but her decks", () => {
    const g = upAndDressed();
    run(g, 0.5, { castParty: true, spell: true });
    standAt(g, "bed", 0.4); press(g);
    expect(g.party.spellAt).toBeNull();
  });

  it("E at her decks seats her behind them and casts it: its routine holds her there, then the party's on", () => {
    const g = upAndDressed();
    toSeat(g);
    expect(atDecks(g)).toBe(true);
    expect(press(g)).toContain("decks");
    expect(g.witch.seated).toBe(true);
    expect(g.party.spellAt).not.toBeNull();
    const d = deckOf(g.map, g.tuning)!;
    run(g, 1, { moveZ: -1 });
    expect(Math.hypot(g.witch.x - d.seat.x, g.witch.z - d.seat.z)).toBeLessThan(0.05); // (held: the cast, then the needle-drop routine)
    expect(heldByRoutine(g, g.clock.time) || g.clock.time < g.party.spellAt! + 2).toBe(true);
    run(g, 10); // (the routine over)
    expect(heldByRoutine(g, g.clock.time)).toBe(false);
    run(g, 1, { moveZ: -1 });
    expect(g.witch.seated).toBeFalsy(); // (off her decks: the party's on, its boot set off as she leaves them)
    run(g, 0.5);
    expect(g.party.bootFrom).toBeDefined();
  });
});

describe("the shorter wake-up (later loads, after the bed)", () => {
  function short(ready = false): Game {
    const g = newGame(123, TUNING);
    g.party.spellAt = null; g.clock.paused = false; g.islandReady = ready;
    wakeInBedroom(g); startWake(g, g.herTime, true);
    return g;
  }
  for (const [what, c] of [["a move", { moveX: 1 }], ["R", { spell: true }], ["Enter", { castParty: true }]] as const) it(`a move or any key but E (${what}) gets her straight up, no stretch`, () => {
    const g = short();
    run(g, K.alarmMin);
    expect(run(g, STEP, c)).toContain("up");
    expect(g.wake!.beat).toBe("up");
    expect(g.party.spellAt).toBeNull();
  });

  // (Ed's playtest of v4821, 2026-10-26: "I couldn't snooze; pressing E when the alarm was playing woke me up": every later load's
  // wake-up is this one, and E got her up; the keys beside the bed say "E snooooze")
  for (const [what, c] of [["E", { place: true }], ["the pad's square", { sigil: true }]] as const) it(`${what} snoozes it, as on the first load, and never gets her up`, () => {
    const g = short();
    run(g, K.alarmMin);
    const seen = run(g, STEP, c);
    expect(seen).toContain("snooze"); expect(seen).not.toContain("up");
    expect(g.wake).toMatchObject({ beat: "snooze", snoozes: 1, open: false });
    run(g, K.snooze + 0.1);
    expect(g.wake!.beat).toBe("alarm"); // (it rings again)
    run(g, K.alarmMin); run(g, STEP, c);
    expect(g.wake).toMatchObject({ beat: "snooze", snoozes: 2, open: false });
    run(g, K.alarmMin); expect(run(g, STEP, { moveX: 1 })).toContain("up"); // (a move from the snooze: straight up)
  });

  it("the mirror waits to be used", () => {
    const g = short();
    run(g, K.alarmMin); run(g, STEP, { moveX: 1 });
    standAt(g, "dressingTable", 0.3);
    expect(run(g, 0.5)).not.toContain("mirror");
  });

  it("and the door's open as soon as she's up, dressed or not; the party waits for her decks all the same", () => {
    const g = short(false);
    run(g, K.alarmMin); run(g, STEP, { moveX: 1 });
    expect(g.wake!.open).toBe(true);
    atDoor(g); run(g, 4, outward());
    expect(outOfBedroom(g)).toBe(true);
    expect(g.party.spellAt).toBeNull();
  });
});

describe("the dream before the alarm (Ed, 2026-10-24: finds on loan)", () => {
  /** Asleep after a night with a find on loan: dreaming, in bed. */
  function dreaming(): Game {
    const g = newGame(123, TUNING);
    g.party.spellAt = null; g.clock.paused = false;
    wakeInBedroom(g);
    startWake(g, g.herTime, true, true);
    return g;
  }
  it("she sleeps through it in bed, held, nothing ringing", () => {
    const g = dreaming(), p = rel(g), seen = run(g, 4);
    expect(g.wake!.beat).toBe("dream");
    expect(seen).not.toContain("ring");
    expect(rel(g)).toEqual(p);
  });
  it("its end rings the alarm (the page's: it played to its end), and the wake-up goes on as ever", () => {
    const g = dreaming();
    run(g, 1);
    endDream(g, g.herTime);
    expect(g.wake!.beat).toBe("alarm");
    expect(g.wake!.events).toContain("ring");
    run(g, K.alarmMin + 0.1); run(g, 0.1, { moveX: 1 }); // (the shorter wake-up after the bed: once it's rung a moment, any key or move, and she's up)
    expect(g.wake!.beat).toBe("up");
  });
  it("any key or move ends it: the alarm rings, and that press doesn't also get her up", () => {
    for (const c of [{ place: true, sigil: true }, { moveX: 1 }, { toggleMode: true }] as Partial<Controls>[]) {
      const g = dreaming();
      run(g, 0.5);
      const seen = run(g, STEP, c);
      expect(seen).toContain("ring");
      expect(g.wake!.beat).toBe("alarm");
    }
  });
  it("after a sail's flight in (Ed, 2026-10-24: one dream, always in bed): landed in her bedroom asleep, the same dream, the alarm when it ends", () => {
    const g = newGame(123, TUNING);
    g.party.spellAt = null; g.clock.paused = false;
    expect(wakeInBedroom(g)).toBe(true); // (before the flight: its last shot is her bedroom's)
    expect(startWake(g, g.herTime, true, true)).toBe(true); // (as it lands: main.ts arrived)
    expect(g.wake!.beat).toBe("dream");
    expect(g.wake!.pile).toEqual([...PILE_SLOTS]);
    const seen = run(g, 2);
    expect(seen).not.toContain("ring");
    endDream(g, g.herTime);
    expect(g.wake!.beat).toBe("alarm");
    expect(g.party.spellAt).toBeNull(); // (the party not started: out to her decks after, as ever)
  });
  it("no dream with nothing on loan: the alarm at once, as before", () => {
    const g = newGame(123, TUNING);
    wakeInBedroom(g);
    startWake(g, g.herTime, true);
    expect(g.wake!.beat).toBe("alarm");
  });
});

describe("a sail always ends with her asleep in bed (Ed, 2026-10-25, his 2a)", () => {
  /** A sail's night as main.ts lands it: put in bed before the dive (bedFirst), then as it lands the shorter wake-up (arrived). */
  function sailed(onLoan: boolean): Game {
    const g = newGame(4242, TUNING);
    g.party.spellAt = null; g.clock.paused = false;
    expect(g.witch.seated).toBe(true); // (a night starts her at her decks: the sail moves her)
    expect(wakeInBedroom(g)).toBe(true);
    expect(startWake(g, g.herTime, true, onLoan)).toBe(true);
    return g;
  }
  it("with nothing on loan: in her bed in her bedroom, not at her decks, asleep with the alarm ringing, in her nightie", () => {
    const g = sailed(false);
    expect(inRoom(g)).toBe(true);
    expect(atDecks(g)).toBe(false);
    expect(g.witch.seated).toBe(false);
    expect(g.wake!.beat).toBe("alarm");
    expect(g.wake!.short).toBe(true); // (the shorter wake-up, as after the bed: she's played tonight already)
    expect(g.wake!.pile).toEqual([...PILE_SLOTS]);
    const p = rel(g);
    run(g, 1);
    expect(rel(g)).toEqual(p); // (held in bed while it rings)
  });
  it("then the wake-up as every morning: up at a move, the door open at once, dressing at the pile if she likes", () => {
    const g = sailed(false);
    run(g, K.alarmMin + 0.05);
    const seen = run(g, 0.1, { moveX: 1 });
    expect(seen).toContain("up");
    expect(g.wake!.open).toBe(true);
    expect(doorShut(g)).toBe(false); // (undressed: the door's open all the same)
    standAt(g, "clothesPile");
    press(g);
    expect(dressed(g.wake)).toBe(true);
    expect(g.party.spellAt).toBeNull(); // (the party waits for her decks, as after the bed)
  });
  it("undressed, she walks from her bed down the trunk to the Terrace and starts the party at her decks in her nightie (Ed, 2026-10-25, his playtest of a sail)", () => {
    const g = sailed(false);
    run(g, K.alarmMin + 0.05); run(g, 0.1, { moveX: 1 });
    expect(g.wake!.open).toBe(true);
    const R = HOUSE_ROOMS.rooms.find(q => q.id === "turret")!, T = HOUSE_ROOMS.rooms.find(q => q.id === "terrace")!;
    const down: [number, number][] = [[R.x, R.z], ...limb("turret", "bedroom"), ...limb("bedroom", "boudoir"), ...limb("boudoir", "parlour"), ...limb("parlour", "terrace"), [T.x, T.z]];
    expect(follow(g, down)).toBe(true);
    const d = deckOf(g.map, g.tuning)!;
    expect(onTerrace(d, g.witch.x, g.witch.z)).toBe(true);
    expect(g.wake!.pile).toEqual([...PILE_SLOTS]); // (never dressed)
    const seat = d.seat, W = g.witches[0];
    for (let i = 0; i < 10 / STEP && !atDecks(g); i++) { const dx = seat.x - W.body.x, dz = seat.z - W.body.z, L = Math.hypot(dx, dz) || 1; stepGame(g, { ...idle, moveX: dx / L, moveZ: dz / L }, STEP); }
    expect(atDecks(g)).toBe(true);
    expect(press(g)).toContain("decks");
    expect(g.party.spellAt).not.toBeNull();
  });
  it("with a find on loan: the same bed, dreaming first, the alarm as the dream ends", () => {
    const g = sailed(true);
    expect(inRoom(g)).toBe(true);
    expect(g.wake!.beat).toBe("dream");
    endDream(g, g.herTime);
    expect(g.wake!.beat).toBe("alarm");
  });
});

describe("she always wakes in her nightie, last night's clothes in the pile (Ed, 2026-10-24)", () => {
  it("on every way in: the first load's whole wake-up, the shorter one after the bed or a sail, and after a dream", () => {
    for (const [short, dreams] of [[false, false], [true, false], [true, true]]) {
      const g = newGame(123, TUNING);
      wakeInBedroom(g);
      expect(startWake(g, g.herTime, short, dreams)).toBe(true);
      expect(g.wake!.pile).toEqual([...PILE_SLOTS]);
      expect(dressed(g.wake)).toBe(false);
      expect(wornGenome({ top: "jacket", accessories: {} }, g.wake!.pile).accessories).toMatchObject({ nightie: true });
    }
  });
});

describe("her bed before the party (Ed, 2026-10-26, Q-e: it counts as a lost night)", () => {
  it("up, E held at her bed sleeps, the party never cast: main.ts's \"slept\" (the night lost, the next on a new seed)", () => {
    const g = up();
    standAt(g, "bed");
    let slept = 0;
    run(g, STEP, { place: true, sigil: true, sigilHeld: true });
    for (let i = 0; i < (HOUSE_ROOMS.bed.hold * 1.3) / STEP; i++) { stepGame(g, { ...idle, sigilHeld: true }, STEP); slept += g.leashEvents.filter(e => e.kind === "house" && e.obj === "slept").length; }
    expect(slept).toBe(1);
    expect(g.party.spellAt).toBeNull(); // (never cast, nor won: nothing of the party's ran)
    expect(g.win).toBeNull();
  });
});
