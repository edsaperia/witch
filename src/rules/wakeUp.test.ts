// The new opening's wake-up (rules/wakeUp.ts; Ed, 2026-10-20): each beat's input (the alarm, E snoozing it five seconds a time as
// often as she likes, moving getting her up, the stretch, walking, the mirror the first time, the curtains), and the rule that
// nothing gets her past the build: till the island's ready the curtains stay shut and the bedroom's door with them.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { HOUSE_ROOMS } from "./houseRooms";
import { wakeInBedroom } from "./opening";
import { startWake, WAKE_DEFAULT, type WakeEvent } from "./wakeUp";

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
const rel = (g: Game) => ({ x: g.witch.x - g.map.treehouse.x, z: g.witch.z - g.map.treehouse.z });
const inRoom = (g: Game) => { const p = rel(g); return p.x >= room.x0 - 1e-6 && p.x <= room.x1 + 1e-6 && p.z >= room.z0 - 1e-6 && p.z <= room.z1 + 1e-6; };
/** Up and walking: snoozed out of bed by a step of WASD, the stretch over. */
function up(ready = false): Game { const g = woken(ready); run(g, 0.1, { moveX: 1 }); run(g, K.stretch + 0.1); return g; }
const standAt = (g: Game, id: string, dz = 0.6) => { const o = obj(id), th = g.map.treehouse; g.witches[0].body = { ...g.witches[0].body, x: th.x + o.x, z: th.z + o.z + o.d / 2 + dz, vx: 0, vz: 0 }; };

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
    const p = rel(g);
    run(g, 1, { moveX: -1 });
    expect(rel(g).x).toBeLessThan(p.x - 1); // (WASD walks her)
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
    run(g, 20, { moveZ: 1 }); // (south, out of the door to the dressing room)
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

  it("once it's ready, E opens the curtains: the spell cast, the door open", () => {
    const g = up(false);
    standAt(g, "curtains", 0.5);
    press(g);
    g.islandReady = true;
    run(g, K.alarmMin);
    expect(press(g)).toContain("curtains");
    expect(g.wake!.open).toBe(true);
    expect(g.party.spellAt).not.toBeNull();
    const th = g.map.treehouse; g.witches[0].body = { ...g.witches[0].body, x: th.x + 17, z: th.z + room.z1 - 1 }; // (by the door)
    run(g, 6, { moveZ: 1 });
    expect(inRoom(g)).toBe(false);
  });
});
