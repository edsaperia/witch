// The new opening's wake-up (rules/wakeUp.ts; Ed, 2026-10-20): each beat's input (the alarm, E snoozing it five seconds a time as
// often as she likes, moving getting her up, the stretch, walking, the mirror the first time, the curtains), and the rule that
// nothing gets her past the build: till the island's ready the curtains stay shut and the bedroom's door with them.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { HOUSE_ROOMS, fromPlan, objectFront, toPlan } from "./houseRooms";
import { wakeInBedroom } from "./opening";
import { atDecks, doorShut, endDream, startWake, WAKE_DEFAULT, type WakeEvent } from "./wakeUp";
import { dressed, PILE_SLOTS, wearFromStation, wornGenome } from "./clothesPile";
import { deckOf } from "./treehouse";
import { heldByRoutine } from "./djSet";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const K = WAKE_DEFAULT;
const room = HOUSE_ROOMS.rooms.find(r => r.id === "bedroom")!, obj = (id: string) => HOUSE_ROOMS.objects.find(o => o.id === id)!;

/** Woken by the dive: in bed in her bedroom, the alarm ringing, the night's spell not cast. */
function woken(ready = false): Game {
  const g = newGame(123, TUNING);
  g.party.spellAt = null; g.clock.paused = false; g.islandReady = ready;
  wakeInBedroom(g);
  startWake(g, g.herTime);
  return g;
}
const run = (g: Game, s: number, c: Partial<Controls> = {}) => { const seen: WakeEvent[] = []; for (let i = 0; i < Math.round(s / STEP); i++) { stepGame(g, { ...idle, ...c }, STEP); seen.push(...(g.wake?.events ?? [])); } return seen; };
const press = (g: Game) => run(g, STEP, { place: true, sigil: true });
const rel = (g: Game) => toPlan(g.map.treehouse, g.witch.x, g.witch.z); // (where she is on the house's plan)
const inRoom = (g: Game) => { const p = rel(g); return p.x >= room.x0 - 1e-6 && p.x <= room.x1 + 1e-6 && p.z >= room.z0 - 1e-6 && p.z <= room.z1 + 1e-6; };
/** Up and walking: snoozed out of bed by a step of WASD, the stretch over. */
function up(ready = false): Game { const g = woken(ready); run(g, 0.1, { moveX: 1 }); run(g, K.stretch + 0.1); return g; }
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
    expect(rel(g).z).toBeGreaterThan(obj("bed").z + obj("bed").d / 2); // (in front of the bed)
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

describe("never past the build", () => {
  it("the curtains stay shut till the island's ready: E there says not yet", () => {
    const g = up(false);
    standAt(g, "curtains", 0.5);
    expect(press(g)).toContain("notYet");
    expect(g.wake!.open).toBe(false);
    expect(g.party.spellAt).toBeNull();
  });

  it("and the bedroom's door with them, however long she walks at it", () => {
    const g = up(false);
    run(g, 20, { moveX: -1, moveZ: 1 }); // (at the door to the dressing room, on the plan's x0 wall)
    expect(inRoom(g)).toBe(true);
    run(g, 10, { moveX: -1 }); run(g, 10, { moveZ: -1 }); run(g, 10, { moveX: 1 });
    expect(inRoom(g)).toBe(true);
  });

  it("nor does the bed end the night meanwhile, nor any key cast the spell", () => {
    const g = up(false);
    standAt(g, "bed", 0.4);
    const seen = run(g, 3, { place: true, sigil: true, sigilHeld: true, castParty: true, spell: true });
    expect(g.leashEvents.some(e => e.kind === "house" && e.obj === "slept")).toBe(false);
    expect(seen).not.toContain("curtains");
    expect(g.party.spellAt).toBeNull();
  });

  it("once it's ready, the curtains open by themselves (Ed, 2026-10-21: \"as soon as they've loaded\"), and the door with them; the spell waits for her decks", () => {
    const g = up(false);
    standAt(g, "curtains", 0.5);
    press(g);
    expect(g.wake!.open).toBe(false);
    g.islandReady = true;
    expect(run(g, STEP)).toContain("curtains"); // (no press)
    expect(g.wake!.open).toBe(true);
    expect(g.party.spellAt).toBeNull();
    standAt(g, "clothesPile", 0.4); expect(press(g)).toContain("dressed"); // (and dressed: the door waits on both, Ed 2026-10-23)
    atDoor(g); run(g, 4, outward());
    expect(outOfBedroom(g)).toBe(true);
  });
});

/** By the bedroom's door, just inside it (the branch to the Boudoir's end in the bedroom: config/house/). */
const doorBranch = () => HOUSE_ROOMS.corridors.find(c => c.id === "boudoir-bedroom")!.pts!;
const atDoor = (g: Game) => { const p = doorBranch(), [x, z] = p[p.length - 1], at = fromPlan(g.map.treehouse, x, z); g.witches[0].body = { ...g.witches[0].body, x: at.x, z: at.z, vx: 0, vz: 0 }; };
/** Walking out of the door, along its branch to the Boudoir. */
const outward = (): Partial<Controls> => { const p = doorBranch(), [x0, z0] = p[p.length - 1], [x1, z1] = p[0], L = Math.hypot(x1 - x0, z1 - z0); return { moveX: (x1 - x0) / L, moveZ: (z1 - z0) / L }; };
/** Out of the bedroom: past its round wall (on the house's plan). */
const outOfBedroom = (g: Game) => { const p = rel(g); return Math.hypot(p.x - (room.x0 + room.x1) / 2, p.z - (room.z0 + room.z1) / 2) > room.r! + 0.3; };

/** Up, the curtains open and dressed: free to walk the house, the party not started. */
function curtainsOpen(): Game {
  const g = up(true);
  expect(g.wake!.open).toBe(true); // (the island ready, they opened by themselves as she got up)
  standAt(g, "clothesPile", 0.4); press(g);
  expect(dressed(g.wake)).toBe(true);
  return g;
}

describe("last night's clothes (Ed, 2026-10-23: \"When waking up she wears only a nightie; last night's clothes are in a pile on the floor (pick all up with x/e)\")", () => {
  it("she wakes in her nightie, every piece of her outfit in the pile by her bed", () => {
    const g = woken();
    expect(g.wake!.pile).toEqual([...PILE_SLOTS]);
    const pile = HOUSE_ROOMS.objects.find(o => o.use.kind === "pile")!, bed = obj("bed");
    expect(pile.room).toBe("bedroom");
    expect(Math.hypot(pile.x - bed.x, pile.z - bed.z)).toBeLessThan(8); // (by her bed)
    const on = wornGenome(null, g.wake!.pile) as unknown as { hat: { shape: string }; cloak: string; accessories: Record<string, unknown> };
    expect(on.accessories.nightie).toBe(true); expect(on.accessories.barefoot).toBe(true); expect(on.accessories.phones).toBe(false);
    expect(on.hat.shape).toBe("none"); expect(on.cloak).toBe("none");
  });

  it("the shorter wake-up too (every wake-up: later loads, after the bed)", () => {
    const g = newGame(123, TUNING);
    g.party.spellAt = null; wakeInBedroom(g); startWake(g, g.herTime, true);
    expect(g.wake!.pile).toEqual([...PILE_SLOTS]);
  });

  it("E at the pile puts on all of it at once: dressed", () => {
    const g = up(false);
    standAt(g, "clothesPile", 0.4);
    expect(press(g)).toContain("dressed");
    expect(g.wake!.pile).toEqual([]);
    expect(dressed(g.wake)).toBe(true);
    expect(press(g)).not.toContain("dressed"); // (nothing left to put on)
  });

  it("a station's choice puts its piece on her, and the pile keeps the rest (Ed: \"if she puts on a top via the menu, the pile then puts on everything else except yesterday's top\")", () => {
    const g = up(false), w = g.wake!;
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

  it("the door waits till she's dressed (Ed: \"get dressed first\"), the curtains open or not; dressed by the stations alone counts", () => {
    const g = up(true);
    expect(g.wake!.open).toBe(true);
    expect(doorShut(g)).toBe(true);
    atDoor(g);
    const seen = run(g, 6, outward());
    expect(outOfBedroom(g)).toBe(false);
    expect(seen).toContain("dressFirst");
    expect(seen.filter(e => e === "dressFirst").length).toBeLessThanOrEqual(2); // (now and then, not every step)
    for (const st of ["wardrobe", "shoeRack", "cloakPegs"]) wearFromStation(g.wake!, st);
    expect(doorShut(g)).toBe(true); // (her hat and bits still in the pile)
    g.wake!.pile = []; // (all on by the stations: the bags' a station too, past the door, so here as if picked up)
    expect(doorShut(g)).toBe(false);
    atDoor(g); run(g, 4, outward());
    expect(outOfBedroom(g)).toBe(true);
  });

  it("dressed before the curtains open, the door still waits for them", () => {
    const g = up(false);
    standAt(g, "clothesPile", 0.4); press(g);
    expect(dressed(g.wake)).toBe(true);
    atDoor(g); run(g, 4, outward());
    expect(outOfBedroom(g)).toBe(false);
  });
});

describe("dressing before the door (Ed, 2026-10-21: \"all of the customisation options (except for broom, hat, and bag) should be before the locked door\")", () => {
  it("every dressing station but the hat's mirror, the bags and the Workshop's is in the bedroom", () => {
    const st = HOUSE_ROOMS.objects.filter(o => o.use.kind === "creator");
    expect(st.filter(o => o.room === "bedroom").map(o => o.id).sort()).toEqual(["cloakPegs", "dressingTable", "shoeRack", "wardrobe"]);
    expect(st.filter(o => o.room !== "bedroom").map(o => o.id).sort()).toEqual(["bags", "broomBay", "lathe", "mirror", "pegboard"]);
  });

  it("the island ready before she's up, the curtains open as she gets up, not while she's in bed", () => {
    const g = woken(true);
    run(g, 1);
    expect(g.wake!.open).toBe(false); // (still ringing)
    run(g, 0.1, { moveX: 1 }); run(g, K.stretch - 0.2);
    expect(g.wake!.open).toBe(false); // (stretching)
    expect(run(g, 0.4)).toContain("curtains");
  });
});
const toSeat = (g: Game, dz = 0.6) => { const d = deckOf(g.map, g.tuning)!; g.witches[0].body = { ...g.witches[0].body, x: d.seat.x, z: d.seat.z - dz, vx: 0, vz: 0 }; };

describe("the DJ intro at her decks (in place of the party spell)", () => {
  it("no key casts the spell on her way out, nor E anywhere but her decks", () => {
    const g = curtainsOpen();
    run(g, 0.5, { castParty: true, spell: true });
    standAt(g, "bed", 0.4); press(g);
    expect(g.party.spellAt).toBeNull();
  });

  it("E at her decks seats her behind them and casts it: its routine holds her there, then the party's on", () => {
    const g = curtainsOpen();
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
  for (const [what, c] of [["E", { place: true, sigil: true }], ["a move", { moveX: 1 }], ["R", { spell: true }]] as const) it(`any key (${what}) gets her straight up, no stretch`, () => {
    const g = short();
    run(g, K.alarmMin);
    expect(run(g, STEP, c)).toContain("up");
    expect(g.wake!.beat).toBe("up");
    expect(g.party.spellAt).toBeNull();
  });

  it("the mirror waits to be used", () => {
    const g = short();
    run(g, K.alarmMin); press(g);
    standAt(g, "dressingTable", 0.3);
    expect(run(g, 0.5)).not.toContain("mirror");
  });

  it("and never past the build: the curtains and the door wait all the same", () => {
    const g = short(false);
    run(g, K.alarmMin); press(g);
    standAt(g, "curtains", 0.5);
    expect(press(g)).toContain("notYet");
    run(g, 20, { moveX: -1, moveZ: 1 });
    expect(inRoom(g)).toBe(true);
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
