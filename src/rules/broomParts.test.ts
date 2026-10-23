// The Workshop's broom parts (Ed, 2026-10-22/23; rules/broomParts.ts, config/broom-parts.json): nine parts in three slots, their
// numbers on the tuning, the sets and their spells, and the bare broom without the plain broom's quick take-off.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { PARTS, SETS, SLOTS, bareBroom, broomTuning, completeSet, fitPart, fittedKey, fittedOf, partsPull, setProgress, spellOfParts, statKnown, type Fitted } from "./broomParts";
import { BROOM_SPELLS, castable, newSpells } from "./spells";

const on = (ids: string) => broomTuning(TUNING, fittedOf(ids));

describe("the parts (config/broom-parts.json)", () => {
  it("are nine, three to a slot, each changing numbers the tuning has, at least one up and one down", () => {
    expect(PARTS.length).toBe(9);
    for (const s of SLOTS) expect(PARTS.filter(p => p.slot === s).length, s).toBe(3);
    for (const p of PARTS) {
      expect(Object.keys(p.stats).length, p.id).toBeGreaterThanOrEqual(2);
      for (const k of Object.keys(p.stats)) expect(statKnown(TUNING, k), `${p.id} ${k}`).toBe(true);
      expect(p.up && p.down && p.name, p.id).toBeTruthy();
    }
  });

  it("the bare broom is the tuning itself: no quick take-off (Ed, 2026-10-23), nothing changed", () => {
    expect(broomTuning(TUNING, bareBroom())).toBe(TUNING);
    expect(partsPull(bareBroom())).toBe(1);
  });

  it("each part's numbers land on the tuning as the doc has them", () => {
    const T = TUNING, D = T.dash, TT = T.treetop;
    expect(on("missile").treetopSpeed).toBeCloseTo(T.treetopSpeed * 1.1); expect(on("missile").treetop.turnRate).toBeCloseTo(TT.turnRate * 0.8);
    expect(on("curl").dash.distance).toBeCloseTo(D.distance * 1.5); expect(on("curl").dash.cooldown).toBeCloseTo(D.cooldown * 1.3);
    expect(on("horse").treetop.turnRate).toBeCloseTo(TT.turnRate * 1.4); expect(on("horse").treetop.sharpTurnBleed).toBeCloseTo(TT.sharpTurnBleed * 0.5); expect(on("horse").treetop.boost).toBeCloseTo(TT.boost - 0.2);
    expect(on("fairing").groundSpeed).toBeCloseTo(T.groundSpeed * 1.15); expect(on("fairing").groundAcceleration).toBeCloseTo(T.groundAcceleration - 8);
    expect(on("ladder").riseTime).toBeCloseTo(T.riseTime * 0.65); expect(on("ladder").descendTime).toBeCloseTo(T.descendTime * 0.65); expect(on("ladder").groundSpeed).toBeCloseTo(T.groundSpeed * 0.9);
    expect(partsPull(fittedOf("canoe"))).toBeCloseTo(0.65); expect(on("canoe").acceleration).toBeCloseTo(T.acceleration * 0.75);
    expect(on("nozzles").cooldown!.rise).toBeCloseTo(T.cooldown!.rise * 0.5); expect(on("nozzles").riseCooldown).toBeCloseTo(T.riseCooldown! * 0.5); expect(on("nozzles").treetop.glideTime).toBeCloseTo(TT.glideTime * 1.8);
    expect(on("twigs").dash.charges).toBe(D.charges! + 1); expect(on("twigs").treetop.boostTime).toBeCloseTo(TT.boostTime * 1.5);
    expect(on("oar").groundAcceleration).toBeCloseTo(T.groundAcceleration + 12); expect(on("oar").dash.distance).toBeCloseTo(D.distance * 0.8);
    // (the base tuning untouched, and the same broom made once)
    expect(TUNING.treetopSpeed).toBe(T.treetopSpeed);
    expect(on("missile")).toBe(on("missile"));
  });

  it("parts fitted together add up (Ed's doc: 'Stats from different parts add up')", () => {
    expect(on("curl,oar").dash.distance).toBeCloseTo(TUNING.dash.distance * (1 + 0.5 - 0.2));
    expect(on("horse,canoe").treetop.turnRate).toBeCloseTo(TUNING.treetop.turnRate * 1.4);
    expect(on("fairing,oar").groundAcceleration).toBeCloseTo(TUNING.groundAcceleration + 4);
  });

  it("one a slot: fitting a part takes out what was in its slot; unknown ids change nothing", () => {
    let f: Fitted = fittedOf("missile,ladder,nozzles");
    expect(fittedKey(f)).toBe("missile,ladder,nozzles");
    f = fitPart(f, "curl");
    expect(fittedKey(f)).toBe("curl,ladder,nozzles");
    expect(fittedKey(fitPart(f, "no-such-part"))).toBe("curl,ladder,nozzles");
    expect(fittedKey(fittedOf("nozzles,twigs"))).toBe("-,-,twigs");
  });
});

describe("the sets (Ed, 2026-10-23: 'Sets as proposed')", () => {
  it("give today's spells: Rocket Speed, Hedge Stealth, Ferry Ley jump, Joust Battering, Pile driver Ground pound", () => {
    expect(spellOfParts(fittedOf("missile,fairing,nozzles"))).toBe("speed");
    expect(spellOfParts(fittedOf("curl,ladder,twigs"))).toBe("stealth");
    expect(spellOfParts(fittedOf("horse,canoe,oar"))).toBe("leyjump");
    expect(spellOfParts(fittedOf("horse,fairing"))).toBe("battering");
    expect(spellOfParts(fittedOf("ladder,nozzles"))).toBe("pound");
    // every spell a broom used to have, placed once; their pieces real, one a slot
    expect(new Set(SETS.map(s => s.spell))).toEqual(new Set(BROOM_SPELLS.filter(s => s.id !== "none").map(s => s.id)));
    for (const s of SETS) { const f = fittedOf(s.pieces); expect(s.pieces.every(p => Object.values(f).includes(p)), s.id).toBe(true); expect(completeSet(f)?.id).toBe(s.id); }
  });

  it("no broom completes two at once (every one of the 64)", () => {
    const choices = (s: string) => [null, ...PARTS.filter(p => p.slot === s).map(p => p.id)];
    let n = 0;
    for (const tip of choices("tip")) for (const chassis of choices("chassis")) for (const exhaust of choices("exhaust")) {
      const on = new Set([tip, chassis, exhaust]), complete = SETS.filter(s => s.pieces.every(p => on.has(p)));
      expect(complete.length, `${tip},${chassis},${exhaust}`).toBeLessThanOrEqual(1);
      n++;
    }
    expect(n).toBe(64);
  });

  it("R casts only with a set complete: the bare broom and a half-made one have no spell", () => {
    const spells = (parts: string) => newSpells({ ...TUNING, spells: { ...TUNING.spells, parts } });
    expect(castable(spells(""))).toBe(false);
    expect(castable(spells("missile,fairing"))).toBe(false);
    expect(castable(spells("missile,fairing,nozzles"))).toBe(true);
    expect(spells("horse,fairing").broom).toBe("battering"); // (a passive one: nothing to cast, on all the same)
    expect(castable(spells("horse,fairing"))).toBe(false);
    expect(setProgress(fittedOf("missile,fairing")).find(p => p.set.id === "rocket")!.fitted).toBe(2);
  });
});
