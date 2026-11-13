// The pause page's Wild look group (Ed, 2026-11-12: "Can you make a new pause menu group that has each of these applied in the wild
// only so I can tweak them?"): the wild-only grade is none on party ground and home and eases to its strength in the wild, and the
// group's sliders drive the knobs it names, at the tuning's own values (so the look is unchanged till he moves them).
import { describe, expect, it } from "vitest";
import group from "../../config/decisions/1988-wild-look.json";
import { newGame as fullGame } from "../rules/game";
import { cellKey } from "../rules/party";
import { TUNING, type Mood } from "../rules/tuning";
import { knobAt } from "../ui/decisions";
import { smallWorld } from "../test/worlds";
import { AreaMoods, hsvInto, wildAt, wildGradeInto } from "./mood";

const newGame = smallWorld(fullGame, "The wild-only grade: home and one wild area.");
const vec4 = () => { const v = { x: 0, y: 0, z: 0, w: 0, set(x: number, y: number, z: number, w: number) { Object.assign(v, { x, y, z, w }); return v; } }; return v; };
const vec3 = () => { const v = { x: 0, y: 0, z: 0, set(x: number, y: number, z: number) { Object.assign(v, { x, y, z }); return v; } }; return v; };
const mood = (strength: number): Mood => ({ ...TUNING.light!.spooky, wildGrade: { ...TUNING.light!.spooky.wildGrade!, strength } } as Mood);

describe("the wild-only grade", () => {
  it("is off by default, so the look is unchanged", () => {
    expect(TUNING.light!.spooky.wildGrade?.strength).toBe(0);
    const out = vec4(); wildGradeInto(out, TUNING.light!.spooky as Mood, 1);
    expect([out.x, out.y, out.z]).toEqual([0, 0, 1]);
  });

  it("is none on party ground and home, and its strength in the wild", () => {
    const M = mood(0.8), out = vec4();
    wildGradeInto(out, M, 0); expect(out.x).toBe(0);
    wildGradeInto(out, M, 1); expect([out.x, out.y, out.z]).toEqual([0.8, M.wildGrade!.desat, M.wildGrade!.pivot]);
    wildGradeInto(out, null, 1); expect(out.x).toBe(0); // (the plain light: none)
  });

  it("eases in and out at the area moods' pace as she crosses", () => {
    const M = mood(0.8), A = new AreaMoods(M), out = vec4(), haze = vec3();
    const step = (wild: number, s: number) => { for (let t = 0; t < s; t += 0.1) A.update("", 0.1, haze, null, null, wild); wildGradeInto(out, M, A.wild); return out.x; };
    expect(step(0, 5)).toBe(0);
    const early = step(1, 0.3);
    expect(early).toBeGreaterThan(0); expect(early).toBeLessThan(0.1); // (no jump)
    expect(step(1, 20)).toBeCloseTo(0.8, 3);
    const back = step(0, 0.3);
    expect(back).toBeLessThan(0.8); expect(back).toBeGreaterThan(0.6);
    expect(step(0, 20)).toBeCloseTo(0, 3);
  });

  it("counts home and party ground as not wild, an area the party hasn't reached as wild", () => {
    const g = newGame(7, TUNING), d = g.map.dancefloor;
    expect(wildAt(g, d.x, d.z, "home")).toBe(false);
    expect(wildAt(g, d.x, d.z, "")).toBe(false); // (home's area is partified from the start)
    const home = cellKey(g.map.centreCell);
    let wild: { x: number; z: number } | null = null;
    for (let x = -400; x <= 400 && !wild; x += 8) for (let z = -400; z <= 400 && !wild; z += 8) {
      const a = g.map.areaAt(d.x + x, d.z + z); if (a && cellKey(a.cell) !== home && !g.party.areas.has(cellKey(a.cell)) && !g.map.legendAreas?.get(cellKey(a.cell))) wild = { x: d.x + x, z: d.z + z };
    }
    expect(wild).not.toBeNull();
    expect(wildAt(g, wild!.x, wild!.z, "")).toBe(true);
    g.party.areas.set(cellKey(g.map.areaAt(wild!.x, wild!.z).cell), { cell: g.map.areaAt(wild!.x, wild!.z).cell, wave: 1, at: 0, from: null, soundsystem: null });
    expect(wildAt(g, wild!.x, wild!.z, "")).toBe(false); // (partied: not wild)
  });
});

describe("the Wild look group", () => {
  const knobs = group.decisions.map(d => d.apply.knob);
  it("drives each of the wild's knobs, each at the tuning's value", () => {
    expect(knobs).toEqual(["combatLight.wildReach", "combatLight.wildGlow", "light.spooky.wildGlow.mix", "light.spooky.wildGlow.hue", "light.spooky.wildGlow.sat",
      "light.spooky.wildGrade.strength", "light.spooky.wildGrade.desat", "light.spooky.wildGrade.pivot", "light.spooky.wildGrade.hue", "light.spooky.wildGrade.sat"]);
    for (const d of group.decisions) {
      expect(d.group, d.id).toBe("Wild look");
      expect(knobAt(TUNING, d.apply.knob), d.id).toBe(d.default);
      expect(d.default, d.id).toBeGreaterThanOrEqual(d.control.min); expect(d.default, d.id).toBeLessThanOrEqual(d.control.max);
      expect(d.note, d.id).toMatch(/Live\./);
    }
  });
  it("keeps the wild glow's colour as built: hue, saturation and brightness that make rgb (80, 200, 205) exactly", () => {
    const W = TUNING.light!.spooky.wildGlow!, c = vec3(); hsvInto(c, W.hue, W.sat, W.value);
    expect([c.x, c.y, c.z].map(x => Math.round(x * 255))).toEqual([80, 200, 205]);
  });
});
