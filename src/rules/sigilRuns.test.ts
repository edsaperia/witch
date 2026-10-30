// Runs of the sigil button (Ed, 2026-10-15: "Pick up and place in runs"; rules/leash.ts LeashState.run, leash.runs): the button
// held on since a press that picked a sigil up keeps picking up any she runs over; held since a press that put one down puts the
// next down in each empty hex she enters; a press that did nothing starts no run (holding E with nothing to do still puts her hat
// down). And the pad's hat button (triangle): her hat down at her feet, or a hat of hers near her picked up; its square held
// never drops the hat.
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { newGame, stepGame, type Game } from "./game";
import { hexCell, hexCentre } from "./leash";
import { wearing } from "./hat";
import { deckOf } from "./treehouse";
import { HOUSE_ROOMS, objectFront } from "./houseRooms";

const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const H = TUNING.leash.hex!;

function game(t: Tuning = TUNING): Game {
  const g = newGame(123, t);
  g.clock.paused = false;
  g.party.spellAt = undefined;
  const d = g.map.dancefloor;
  at(g, d.x + 60, d.z + 60);
  return g;
}
const at = (g: Game, x: number, z: number) => { g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0, perch: undefined }; };
/** Three wild creatures far away leashed to her stack (stand-ins for her party: the leash reads their ids). */
function stack(g: Game, n = 3): number[] {
  const ids = g.creatures.filter(c => !c.gone && !c.boss && !c.partyLegend && c.level < 3).slice(0, n).map(c => c.id);
  for (const id of ids) { const c = g.creatures[id]; c.leashed = true; c.state = "leashed"; c.x = g.witch.x + 200; c.z = g.witch.z + 200; }
  g.leash.stack = [...ids];
  return ids;
}
const step = (g: Game, c: Partial<Parameters<typeof stepGame>[1]> = {}) => stepGame(g, { ...C, ...c }, 1 / 60);
/** The middle of the hex cell `dq` cells east of hers. */
const cellEast = (g: Game, dq: number) => { const h = hexCell(g.witch.x, g.witch.z, H.size); return hexCentre(h.q + dq, h.r, H.size); };
const kinds = (g: Game) => g.leash.events.map(e => e.kind);

describe("placing in a run", () => {
  it("holding Use at every morning dressing station and the booth never drops her hat", () => {
    const g = game(), W = g.witches[0], deck = deckOf(g.map, g.tuning)!;
    const stations = ["dressingTable", "wardrobe", "shoeRack", "bags", "cloakPegs", "lathe"];
    const targets = stations.map(id => objectFront(HOUSE_ROOMS.objects.find(o => o.id === id)!, deck, .6));
    targets.push(deck.seat);
    for (const p of targets) {
      at(g, p.x, p.z); g.witch.perch = true;
      W.hat.hold = g.herTime - 10;
      step(g, { sigil: true, sigilHeld: true, hatHold: true });
      for (let i = 0; i < Math.ceil(TUNING.leash.hatHold! * 60) + 2; i++) step(g, { sigilHeld: true, hatHold: true });
      expect(W.hat.down).toBeNull();
      expect(W.hat.hold).toBeUndefined();
    }
  });

  it("a press puts one down; moving into each empty hex while holding puts down the next; letting go ends it", () => {
    const g = game(), ids = stack(g, 3);
    expect(TUNING.leash.runs).toBe(true);
    step(g, { place: true, sigilHeld: true });
    expect(g.leash.placed.map(p => p.id)).toEqual([ids[2]]);
    expect(g.leash.run?.kind).toBe("place");
    // Standing in the same cell: nothing more.
    for (let i = 0; i < 10; i++) step(g, { sigilHeld: true });
    expect(g.leash.placed).toHaveLength(1);
    // Into the next cell east, still holding: the next goes down in its middle.
    const c1 = cellEast(g, 1);
    at(g, c1.x, c1.z);
    step(g, { sigilHeld: true });
    expect(g.leash.placed).toHaveLength(2);
    expect(g.leash.placed[1].x).toBeCloseTo(c1.x); expect(g.leash.placed[1].z).toBeCloseTo(c1.z);
    expect(kinds(g)).toContain("placed");
    // Back over the first (taken): nothing picked up, nothing put down.
    at(g, g.leash.placed[0].x, g.leash.placed[0].z);
    step(g, { sigilHeld: true });
    expect(g.leash.placed).toHaveLength(2); expect(g.leash.stack).toEqual([ids[0]]);
    // Let go: the run's over, and a new cell takes nothing.
    step(g, {});
    expect(g.leash.run).toBeUndefined();
    const c2 = cellEast(g, 2);
    at(g, c2.x, c2.z);
    step(g, { sigilHeld: true });
    expect(g.leash.placed).toHaveLength(2);
  });

  it("the pad's one button (sigil) runs too", () => {
    const g = game(); stack(g, 3);
    step(g, { sigil: true, sigilHeld: true });
    const c1 = cellEast(g, 1); at(g, c1.x, c1.z); step(g, { sigilHeld: true });
    const c2 = cellEast(g, 1); at(g, c2.x, c2.z); step(g, { sigilHeld: true });
    expect(g.leash.placed).toHaveLength(3);
    expect(g.leash.stack).toHaveLength(0);
    // Nothing left: the run goes on harmlessly.
    const c3 = cellEast(g, 1); at(g, c3.x, c3.z); step(g, { sigilHeld: true });
    expect(g.leash.placed).toHaveLength(3);
  });
});

describe("picking up in a run", () => {
  it("a press that picks up starts a run: every placed sigil she runs over comes up while she holds", () => {
    const g = game(), ids = stack(g, 3);
    // Three down in a row of cells.
    step(g, { place: true, sigilHeld: true });
    const c1 = cellEast(g, 1); at(g, c1.x, c1.z); step(g, { sigilHeld: true });
    const c2 = cellEast(g, 1); at(g, c2.x, c2.z); step(g, { sigilHeld: true });
    step(g, {});
    expect(g.leash.placed).toHaveLength(3);
    // Press on the last: picked up, a pick run starts; walking back over the others picks each up.
    step(g, { place: true, sigilHeld: true });
    expect(g.leash.placed).toHaveLength(2); expect(g.leash.run?.kind).toBe("pick");
    at(g, c1.x, c1.z); step(g, { sigilHeld: true });
    expect(g.leash.placed).toHaveLength(1);
    const c0 = cellEast(g, -1); at(g, c0.x, c0.z); step(g, { sigilHeld: true });
    expect(g.leash.placed).toHaveLength(0);
    expect(new Set(g.leash.stack)).toEqual(new Set(ids));
    // A pick run never puts down: an empty cell takes nothing.
    const c9 = cellEast(g, -2); at(g, c9.x, c9.z); step(g, { sigilHeld: true });
    expect(g.leash.placed).toHaveLength(0);
    step(g, {});
    expect(g.leash.run).toBeUndefined();
  });

  it("a press that did nothing starts no run, and holding E with nothing to do still puts her hat down", () => {
    const g = game(), W = g.witches[0];
    expect(wearing(W.hat)).toBe(true);
    step(g, { place: true, sigilHeld: true, hatHold: true });
    expect(g.leash.run).toBeUndefined();
    for (let i = 0; i < Math.round(TUNING.leash.hatHold! * 60) + 2; i++) step(g, { sigilHeld: true, hatHold: true });
    expect(W.hat.down).not.toBeNull();
  });

  it("with leash.runs off a press does one thing and holding does nothing more", () => {
    const g = game({ ...TUNING, leash: { ...TUNING.leash, runs: false } }); stack(g, 3);
    step(g, { place: true, sigilHeld: true });
    expect(g.leash.run).toBeUndefined();
    const c1 = cellEast(g, 1); at(g, c1.x, c1.z); step(g, { sigilHeld: true });
    expect(g.leash.placed).toHaveLength(1);
  });
});

describe("the pad's hat button (triangle)", () => {
  it("puts her hat down at her feet at once; pressed on it again, she picks it up", () => {
    const g = game(), W = g.witches[0];
    step(g, { hat: true });
    expect(W.hat.down).toMatchObject({ x: g.witch.x, z: g.witch.z });
    expect(kinds(g)).toContain("hatPut");
    step(g, {});
    step(g, { hat: true });
    expect(W.hat.down).toBeNull();
    expect(kinds(g)).toContain("hatPicked");
  });

  it("square held on (sigilHeld without hatHold) never drops the hat; E held (hatHold) does", () => {
    const g = game(), W = g.witches[0];
    for (let i = 0; i < Math.round(TUNING.leash.hatHold! * 60) + 2; i++) step(g, { sigil: i === 0, sigilHeld: true, hatHold: false });
    expect(W.hat.down).toBeNull();
    for (let i = 0; i < Math.round(TUNING.leash.hatHold! * 60) + 2; i++) step(g, { place: i === 0, sigilHeld: true, hatHold: true });
    expect(W.hat.down).not.toBeNull();
  });

  it("a hat press in the treetops does nothing", () => {
    const g = game(), W = g.witches[0];
    g.witch = { ...g.witch, mode: "treetop" };
    step(g, { hat: true });
    expect(W.hat.down).toBeNull();
  });
});
