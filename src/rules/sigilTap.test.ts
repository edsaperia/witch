// One tap, one sigil (Ed, 2026-11-12: "It can be easy to put down or pick up more than one sigil when you tap the button, can we do
// something to make holds feel more deliberate?"). A tap of the sigil button lasts a few frames (about 0.1 s) with the button held,
// and a run (rules/leash.ts LeashState.run, Ed 2026-10-15: "Pick up and place in runs") used to start on the press itself: walking at
// her ground speed (about 19 m/s) she crossed into the next 6 m hex inside the tap and put a second sigil down there, and a tap that
// picked her sigil up took a happy creature's rune within leash.runeRadius on the very next frame. A run now starts only once the
// button has been held leash.runAfter seconds since the press; before that the press did its one thing and nothing more.
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { stepGame, type Game, type Controls } from "./game";
import { hexCell, hexCentre } from "./leash";
import { preppedGame } from "../test/preppedGame";

const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const H = TUNING.leash.hex!;
const STEP = 1 / 60;
/** A quick tap: the press and this many frames (at 60 a second) with the button down, about 0.13 s. */
const TAP = 8;

function game(t: Tuning = TUNING): Game {
  const g = preppedGame(123, t);
  g.clock.paused = false;
  g.party.spellAt = undefined;
  const d = g.map.dancefloor;
  at(g, d.x + 60, d.z + 60);
  return g;
}
const at = (g: Game, x: number, z: number) => { g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0, perch: undefined }; };
function stack(g: Game, n = 3): number[] {
  const ids = g.creatures.filter(c => !c.gone && !c.boss && !c.partyLegend && c.level < 3).slice(0, n).map(c => c.id);
  for (const id of ids) { const c = g.creatures[id]; c.leashed = true; c.state = "leashed"; c.x = g.witch.x + 200; c.z = g.witch.z + 200; }
  g.leash.stack = [...ids];
  return ids;
}
const step = (g: Game, c: Partial<Controls> = {}) => stepGame(g, { ...C, ...c }, STEP);
/** A tap of E (or the pad's square, or the touch button: all one press and a held flag), moving `moveX` the whole time; then let go. */
function tap(g: Game, moveX = 0, frames = TAP, button: "place" | "sigil" = "place") {
  const kinds: string[] = [];
  for (let i = 0; i < frames; i++) { step(g, { moveX, [button]: i === 0, sigilHeld: true, hatHold: button === "place" }); kinds.push(...g.leashEvents.map(e => e.kind)); }
  step(g, { moveX }); kinds.push(...g.leashEvents.map(e => e.kind));
  return kinds;
}
/** Her spot a little short of the edge into the hex east of hers, so walking east crosses it inside a tap. */
function nearEastEdge(g: Game) {
  const h = hexCell(g.witch.x, g.witch.z, H.size), c = hexCentre(h.q, h.r, H.size);
  at(g, c.x + H.size / 2 - 1.2, c.z);
}

describe("a tap does one thing", () => {
  for (const button of ["place", "sigil"] as const) it(`a tap (${button}) walking across a hex edge puts down exactly one sigil`, () => {
    const g = game(); stack(g, 3);
    // up to speed first, then the tap just short of the edge
    nearEastEdge(g);
    const x0 = g.witch.x;
    const kinds = tap(g, 1, TAP, button);
    expect(g.witch.x - x0).toBeGreaterThan(1.5); // (she did cross into the next cell during the tap)
    expect(kinds.filter(k => k === "placed")).toHaveLength(1);
    expect(g.leash.placed).toHaveLength(1);
    expect(g.leash.stack).toHaveLength(2);
  });

  it("a tap among loose sigils (scattered round a converted stone) picks up exactly one", () => {
    const g = game(); stack(g, 1);
    // Two loose friend sigils 2 m either side of her, both within leash.runeRadius (rules/stoneStacks.ts g.loose).
    const ks = g.creatures.filter(k => !k.boss && !k.partyLegend && k.level > 0 && k.level < 3 && !k.leashed && Math.hypot(k.x - g.witch.x, k.z - g.witch.z) > 200).slice(0, 2);
    ks.forEach((k, i) => { const x = g.witch.x + (i ? 2 : -2), z = g.witch.z; g.loose.push({ id: k.id, x, z, at: g.clock.time }); k.loose = true; k.atStone = undefined; });
    expect(TUNING.leash.runeRadius).toBeGreaterThan(2);
    const kinds = tap(g);
    expect(kinds.filter(k => k === "picked" || k === "invited")).toHaveLength(1);
    expect(g.loose).toHaveLength(1);
    expect(g.leash.stack).toHaveLength(2);
  });

  it("a tap on her placed sigil while walking over a cluster of them picks up exactly one", () => {
    const g = game(); stack(g, 3);
    // Three down in a row of cells east, by a deliberate run.
    const h = hexCell(g.witch.x, g.witch.z, H.size);
    for (let q = 0; q < 3; q++) { const c = hexCentre(h.q + q, h.r, H.size); at(g, c.x, c.z); tap(g); }
    expect(g.leash.placed).toHaveLength(3);
    // Back to the first, near its east edge, and a tap walking east.
    const c0 = hexCentre(h.q, h.r, H.size);
    at(g, c0.x + H.size / 2 - 1.2, c0.z);
    const kinds = tap(g, 1);
    expect(kinds.filter(k => k === "picked")).toHaveLength(1);
    expect(g.leash.placed).toHaveLength(2);
  });
});

describe("a deliberate hold starts a run", () => {
  it("held past leash.runAfter, a run goes on as before: one sigil in each empty hex she walks into", () => {
    const g = game(); stack(g, 3);
    nearEastEdge(g);
    const after = TUNING.leash.runAfter!;
    expect(after).toBeGreaterThan(TAP * STEP);
    for (let i = 0; i < Math.ceil(after / STEP) + 40; i++) step(g, { moveX: 1, place: i === 0, sigilHeld: true, hatHold: true });
    expect(g.leash.placed.length).toBeGreaterThanOrEqual(3);
  });

  it("before leash.runAfter nothing more happens; at it the run begins where she is", () => {
    const g = game(); stack(g, 3);
    const after = TUNING.leash.runAfter!, n = Math.ceil(after / STEP);
    step(g, { place: true, sigilHeld: true, hatHold: true });
    expect(g.leash.placed).toHaveLength(1);
    expect(g.leash.run?.kind).toBe("place");
    // into the next cell east while the hold charges: nothing yet
    const h = hexCell(g.witch.x, g.witch.z, H.size), e = hexCentre(h.q + 1, h.r, H.size);
    at(g, e.x, e.z);
    for (let i = 1; i < n - 1; i++) step(g, { sigilHeld: true, hatHold: true });
    expect(g.leash.placed).toHaveLength(1);
    for (let i = 0; i < 3; i++) step(g, { sigilHeld: true, hatHold: true });
    expect(g.leash.placed).toHaveLength(2);
    expect(g.leash.placed[1].x).toBeCloseTo(e.x);
  });

  it("leash.runAfter 0 is the old behaviour: the tap that crosses a hex edge puts down two", () => {
    const g = game({ ...TUNING, leash: { ...TUNING.leash, runAfter: 0 } }); stack(g, 3);
    nearEastEdge(g);
    const kinds = tap(g, 1);
    expect(kinds.filter(k => k === "placed")).toHaveLength(2);
  });
});
