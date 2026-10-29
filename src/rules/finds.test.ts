// Things to wear found in the forest (rules/finds.ts; Ed, 2026-10-21): tonight's travel trunk, what's in it, taking it, and the
// crystal ball's way to it.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, type Controls, type Game } from "./game";
import { BAG_ITEMS, FINDABLE, FIND_KINDS, HAT_FINDS, fillTrunk, findPiece, goneAtWin, loanFind, nightFind, nightPick, spawnFind, spawnSpot, trunkAt, wayTo, TRUNK_CLEAR } from "./finds";
import { HAT_FLOOR, floorHats, hatsOnFloor } from "./houseRooms";
import { newSpells, ownsHat } from "./spells";
import { COUNTRY_BY_ID } from "../../art/country.js";
import { PART_IDS, fittedKey } from "./broomParts";
import { deckOf, onFloor } from "./treehouse";

const C: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
function game(seed = 123): Game {
  const g = newGame(seed, TUNING);
  g.clock.paused = false; g.party.paused = true; g.party.spellAt = undefined;
  return g;
}
/** Her on foot at (x, z), off her decks. */
const at = (g: Game, x: number, z: number) => { g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, perch: undefined, mode: "ground", lift: 0 }; };
const press = (g: Game) => { stepGame(g, { ...C, place: true }, 1 / 60); };

describe("tonight's travel trunk", () => {
  it("stands in a wild area's woods, never home's, off its clearings and clear of the relics", () => {
    for (const seed of [123, 7, 4242, 90210]) {
      const g = game(seed), T = g.trunk!;
      expect(T, `seed ${seed}`).toBeTruthy();
      const home = g.map.centreCell;
      expect(T.cell[0] === home[0] && T.cell[1] === home[1], `seed ${seed}`).toBe(false);
      expect(g.map.playable(T.cell[0], T.cell[1])).toBe(true);
      expect(g.map.hardClear(T.x, T.z)).toBe(false);
      for (const r of g.relics) expect(Math.hypot(r.x - T.x, r.z - T.z)).toBeGreaterThanOrEqual(TRUNK_CLEAR);
      expect(T.item).toBeNull(); // (the page fills it, from what she owns)
    }
  });

  it("is the night's: the same seed puts it in the same place, and nights differ", () => {
    const a = game(123).trunk!, b = game(123).trunk!;
    expect([a.x, a.z]).toEqual([b.x, b.z]);
    const spots = new Set([1, 2, 3, 4, 5, 6].map(s => { const t = game(s).trunk!; return `${t.x.toFixed(1)},${t.z.toFixed(1)}`; }));
    expect(spots.size).toBeGreaterThan(3);
  });

  it("holds what the night's one draw picks over everything she lacks, of every kind (Ed, 2026-10-23); nothing once she has it all", () => {
    expect(FINDABLE.length).toBeGreaterThan(5);
    for (const i of FINDABLE) { expect(i.start, i.id).toBeFalsy(); expect(i.set["broom.kind"], i.id).toBeUndefined(); } // (no broom shapes: brooms are parts)
    const wearables = new Set(FINDABLE.map(i => i.id)), parts = new Set(PART_IDS), hats = new Set(HAT_FINDS), bags = new Set(BAG_ITEMS);
    const of = { wearable: wearables, part: parts, hat: hats, bag: bags } as const;
    // the same night, the same find; nights differ, and over many both kinds come up
    const pick = nightPick(123, {})!;
    expect(nightPick(123, {})).toEqual(pick);
    const picks = Array.from({ length: 60 }, (_, s) => nightPick(s + 1, {})!);
    expect(new Set(picks.map(p => p.item)).size).toBeGreaterThan(10);
    expect(picks.some(p => p.kind === "wearable") && picks.some(p => p.kind === "part") && picks.some(p => p.kind === "hat")).toBe(true);
    for (const p of picks) expect(of[p.kind].has(p.item), p.item).toBe(true);
    // what she has is never drawn; a kind with nothing left never comes up
    expect(nightPick(123, { [pick.kind]: new Set([pick.item]) })).not.toEqual(pick);
    for (let s = 1; s <= 40; s++) { expect(nightPick(s, { part: parts, hat: hats, bag: bags })!.kind).toBe("wearable"); expect(nightPick(s, { wearable: wearables, hat: hats, bag: bags })!.kind).toBe("part"); }
    // everything found: nothing to find, and no trunk or wreck tonight
    expect(nightPick(5, of)).toBeNull();
    const g = game(); fillTrunk(g, of);
    expect(g.trunk).toBeNull();
    // one find a night: the draw fills the one spot placeTrunk chose, as a trunk or a wreck
    const h = game(); fillTrunk(h, {});
    expect([h.trunk!.kind, h.trunk!.item]).toEqual([nightPick(h.map.seed, {})!.kind, nightPick(h.map.seed, {})!.item]);
    expect(findPiece(h.trunk!)).toBe(FIND_KINDS.find(k => k.id === h.trunk!.kind)!.piece(h.trunk!.item!));
  });

  it("finds hats and bags each on its own (Ed, 2026-10-23): every spell hat but the plain one, and the found bags (the Satchel, Bumbag and Purse hers from the start: Ed, 2026-10-29), out of the trunk", () => {
    expect(HAT_FINDS).not.toContain("none");
    expect(HAT_FINDS.length).toBe(14);
    expect([...BAG_ITEMS].sort()).toEqual(["backpack", "briefcase", "clutch", "duffel", "tote"]);
    for (const b of BAG_ITEMS) expect(FINDABLE.some(i => i.id === b), b).toBe(false); // (no longer in the trunk)
    for (const k of FIND_KINDS) for (const id of k.items) { expect(COUNTRY_BY_ID[k.piece(id)], k.piece(id)).toBeDefined(); } // (every find drawn: art/country.js)
    const hat = FIND_KINDS.find(k => k.id === "hat")!, bag = FIND_KINDS.find(k => k.id === "bag")!;
    expect(hat.piece("sentry")).toBe("find-hat"); expect(bag.piece("backpack")).toBe("find-bag");
    // taken, the piece stands on without it
    const g = game(); g.trunk = { ...g.trunk!, kind: "hat", item: "sentry", found: false };
    expect(findPiece(g.trunk)).toBe("find-hat");
    g.trunk.found = true; expect(findPiece(g.trunk)).toBe("find-hat"); // (taken: the view draws nothing, render/view/finds.ts)
  });

  it("starts her with the plain hat only; a hat found is hers and lies on the hats' floor (Ed, 2026-10-23: the floor fills as she finds them)", () => {
    const own = newSpells({ ...TUNING, spells: { ...TUNING.spells, hats: "" } });
    expect(own.hats).toEqual([]);
    expect(ownsHat(own, "none")).toBe(true); expect(ownsHat(own, "sentry")).toBe(false);
    expect(newSpells({ ...TUNING, spells: { ...TUNING.spells, hats: "*" } }).hats).toBeUndefined(); // (every hat: tests and tools)
    expect(newSpells({ ...TUNING, spells: { ...TUNING.spells, hats: "helmet,nope" } }).hats).toEqual(["helmet"]);
    const g = game();
    const W = g.witches[0]; W.spells.hats = ["helmet"];
    expect(hatsOnFloor(W).filter(Boolean)).toEqual(["helmet"]); // (only hers: the rest of the slots empty)
    floorHats(W); // (laid out, as on her first visit)
    g.trunk = { ...g.trunk!, kind: "hat", item: "lullaby", found: false };
    at(g, g.trunk.x, g.trunk.z); g.party.spellAt = undefined;
    press(g);
    expect(g.trunk.found).toBe(true);
    expect(W.spells.hats).toContain("lullaby");
    expect(floorHats(W)[HAT_FLOOR.indexOf("lullaby")]).toBe("lullaby");
    expect(g.leashEvents.some(e => e.kind === "found" && e.obj === "lullaby" && e.find === "hat")).toBe(true);
  });

  it("opens with E on foot: what's in it is hers (a found event), once", () => {
    const g = game(); fillTrunk(g, {});
    const T = g.trunk!, item = T.item!;
    at(g, T.x + 5, T.z);
    expect(trunkAt(g.trunk, g.witch.x, g.witch.z)).toBeNull(); // (too far)
    at(g, T.x + 1, T.z);
    press(g);
    const found = g.leashEvents.filter(e => e.kind === "found");
    expect(found.map(e => e.obj)).toEqual([item]);
    expect(T.found).toBe(true);
    press(g);
    expect(g.leashEvents.some(e => e.kind === "found")).toBe(false);
  });

  it("can't be opened once the party's over", () => {
    const g = game(); fillTrunk(g, {});
    const T = g.trunk!;
    g.partyOver = { at: 0, ease: 1 } as Game["partyOver"];
    at(g, T.x, T.z);
    press(g);
    expect(g.leashEvents.some(e => e.kind === "found")).toBe(false);
    expect(T.found).toBe(false);
  });
});

describe("the way to the trunk (never how far)", () => {
  it("names the compass point from the treehouse to the trunk, north up the screen", () => {
    expect(wayTo(0, 0, 0, -100).point).toBe("north");
    expect(wayTo(0, 0, 100, 0).point).toBe("east");
    expect(wayTo(0, 0, 0, 100).point).toBe("south");
    expect(wayTo(0, 0, -100, 0).point).toBe("west");
    expect(wayTo(0, 0, 70, -70).point).toBe("north-east");
    expect(wayTo(0, 0, -5, 5).point).toBe("south-west");
    expect(wayTo(0, 0, 100, 0).bearing).toBeCloseTo(Math.PI / 2);
  });
});

describe("tonight's wreck (the Workshop, Ed 2026-10-23: a broom part to find)", () => {
  /** A night whose find is a wreck holding `part`. */
  const wreck = (part: string, t = TUNING) => {
    const g = newGame(123, t);
    g.clock.paused = false; g.party.paused = true; g.party.spellAt = undefined;
    fillTrunk(g, {}); g.trunk!.kind = "part"; g.trunk!.item = part;
    return g;
  };
  it("E at it while the party's on: the part is hers at once (a found event of its kind), not fitted: it waits at the Workshop's bay", () => {
    const g = wreck("nozzles"), T = g.trunk!, W = g.witches[0];
    at(g, T.x + 1, T.z);
    press(g);
    const found = g.leashEvents.filter(e => e.kind === "found");
    expect(found.map(e => [e.obj, e.find])).toEqual([["nozzles", "part"]]);
    expect(T.found).toBe(true);
    expect(fittedKey(W.spells.parts)).toBe("-,-,-"); // (no more fitting on pickup: Ed wanted fitting at the bay)
  });
  it("a part found leaves her broom as it was: her fitted part stays, her set and spell too", () => {
    const g = wreck("nozzles", { ...TUNING, spells: { ...TUNING.spells, parts: "ladder" } }), T = g.trunk!, W = g.witches[0];
    at(g, T.x, T.z); press(g);
    expect(g.leashEvents.some(e => e.kind === "found" && e.obj === "nozzles")).toBe(true);
    expect(fittedKey(W.spells.parts)).toBe("-,ladder,-");
    expect(W.spells.broom).toBe("none"); // (the Pile driver waits till she fits the nozzles at the bay)
  });
  it("only while the party's on", () => {
    const g = wreck("canoe"), T = g.trunk!;
    g.partyOver = { at: 0, ease: 1 } as Game["partyOver"];
    at(g, T.x, T.z); press(g);
    expect(T.found).toBe(false);
    expect(g.leashEvents.some(e => e.kind === "found")).toBe(false);
  });
});

describe("a find spawned near her (the dev spawn; Ed, 2026-10-23: \"a way to spawn the collectible near the player\")", () => {
  /** E at tonight's find: what the rules say and do. */
  const claim = (g: Game) => { const T = g.trunk!; at(g, T.x + 0.5, T.z); press(g); return { events: g.leashEvents.filter(e => e.kind === "found").map(e => [e.obj, e.find]), found: T.found, parts: g.witches[0].spells.parts, broom: g.witches[0].spells.broom }; };
  for (const [kind, item] of [["wearable", FINDABLE[0].id], ["part", "nozzles"]] as const) it(`is claimed exactly as a placed one (${kind} ${item})`, () => {
    const placed = game(); fillTrunk(placed, {}); placed.trunk!.kind = kind; placed.trunk!.item = item;
    const spawned = game(), W = spawned.witches[0].body;
    at(spawned, W.x + 200, W.z + 150); // (out on the island)
    const spot = spawnSpot(spawned)!;
    expect(spot).not.toBeNull();
    expect(spawnFind(spawned, kind, item, spot)).toBe(spawned.trunk);
    expect(claim(spawned)).toEqual(claim(placed));
  });
  it("stands a few metres from her on clear ground: no tree, rock or ruin on it, not on a lake or the treehouse", () => {
    const g = game(), W = g.witches[0].body;
    let n = 0;
    for (const [dx, dz] of [[200, 150], [-260, 90], [120, -300], [-80, -220], [300, 260]]) {
      at(g, W.x + dx, W.z + dz);
      const p = spawnSpot(g);
      if (!p) continue;
      n++;
      const d = Math.hypot(p.x - g.witch.x, p.z - g.witch.z);
      expect(d).toBeGreaterThanOrEqual(4); expect(d).toBeLessThanOrEqual(12.01);
      expect(g.forest.treesNear(p.x, p.z, 3).some(t => Math.hypot(t.x - p.x, t.z - p.z) < 2.5)).toBe(false);
      const c = g.map.cellSafe(p.x, p.z).cell;
      expect(g.map.isLake(c[0], c[1])).toBe(false);
    }
    expect(n).toBeGreaterThanOrEqual(4);
    // from her decks: never on the treehouse's floor (the ground beyond it, if any)
    const h = game(), d = deckOf(h.map, h.tuning), q = spawnSpot(h);
    if (d && q) expect(onFloor(d, q.x, q.z, 3)).toBe(false);
  });
  it("is tonight's find: the constellation's way points at it, and an unknown item spawns nothing", () => {
    const g = game(), W = g.witches[0].body;
    at(g, W.x - 240, W.z + 60);
    const p = spawnSpot(g)!;
    spawnFind(g, "part", "ladder", p);
    const nf = nightFind(g, g.map.treehouse.x, g.map.treehouse.z)!;
    expect(nf).toMatchObject({ kind: "part", item: "ladder" });
    expect(nf.bearing).toBeCloseTo((wayTo(g.map.treehouse.x, g.map.treehouse.z, p.x, p.z).bearing * 180) / Math.PI);
    expect(spawnFind(g, "part", "no-such-part", p)).toBeNull();
    expect(g.trunk!.item).toBe("ladder");
  });
});

describe("on loan till she sleeps (Ed, 2026-10-24)", () => {
  it("taken, its constellation's find is the loan's (lit), not tonight's to find; before, none on loan", () => {
    const g = game();
    fillTrunk(g, {});
    const T = g.trunk!, th = g.map.treehouse;
    expect(loanFind(g, th.x, th.z)).toBeNull();
    expect(nightFind(g, th.x, th.z)?.item).toBe(T.item);
    at(g, T.x, T.z); press(g);
    expect(T.found).toBe(true);
    expect(nightFind(g, th.x, th.z)).toBeNull();
    const L = loanFind(g, th.x, th.z)!;
    expect(L.item).toBe(T.item);
    expect(L.bearing).toBeCloseTo(nightFind({ trunk: { ...T, found: false } }, th.x, th.z)!.bearing, 6);
  });
  it("the night won: one not yet taken is gone; one on loan stays (its constellation lit till she sleeps)", () => {
    const a = game(); fillTrunk(a, {}); goneAtWin(a);
    expect(a.trunk).toBeNull();
    const b = game(); fillTrunk(b, {}); at(b, b.trunk!.x, b.trunk!.z); press(b); goneAtWin(b);
    expect(b.trunk?.found).toBe(true);
    expect(loanFind(b, 0, 0)).not.toBeNull();
  });
});
