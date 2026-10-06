import { describe, expect, it } from "vitest";
import styleJson from "../../config/music-style.json";
import { newGame } from "./game";
import { TUNING } from "./tuning";
import { circleCue, legendCircleAt } from "./musicPlan";
import { mixAt, muffled } from "./music";
import { circleParts, notesAt, type BlockPlan, type MusicStyle } from "./musicScore";

const style = styleJson as unknown as MusicStyle;

describe("a sleeping legend's clearing in the music (Ed, 2026-10-06)", () => {
  const setup = () => {
    const g = newGame(123, TUNING), L = g.creatures.find(c => c.boss && !c.gone && c.legendState === "asleep")!;
    return { g, L };
  };

  it("is heard on the ground inside the circle only: not in the treetops, not outside, not by an angry legend", () => {
    const { g, L } = setup(), R = g.tuning.music.circle.radius;
    const at = (dx: number, mode: string) => ({ x: L.x + dx, z: L.z, mode });
    expect(legendCircleAt(g, at(R * 0.5, "ground"))).toBe(L);
    expect(circleCue(g, at(R * 0.5, "ground"))).toEqual({ species: L.species, level: g.tuning.music.circle.level });
    expect(legendCircleAt(g, at(R * 0.5, "treetop"))).toBeNull();
    expect(circleCue(g, at(R * 0.5, "treetop"))).toBeUndefined();
    expect(legendCircleAt(g, at(R * 1.5, "ground"))).toBeNull();
    L.legendState = "restless";
    expect(legendCircleAt(g, at(R * 0.5, "ground"))).toBe(L); // (restless still sleeps there)
    L.legendState = "angry";
    expect(legendCircleAt(g, at(R * 0.5, "ground"))).toBeNull();
  });

  it("uses the map's clearing where it has one (#235), its middle and radius rather than the legend's own", () => {
    const { g, L } = setup();
    const ring = { x: L.x, z: L.z + 12, r: 16, legend: { x: L.x, z: L.z } };
    (g.map as unknown as { legendClearings: typeof ring[] }).legendClearings = [ring];
    expect(legendCircleAt(g, { x: ring.x, z: ring.z + 15, mode: "ground" })).toBe(L); // (27 m from the legend, inside its ring)
    expect(legendCircleAt(g, { x: ring.x, z: ring.z + 17, mode: "ground" })).toBeNull();
  });

  it("muffles the music by how far in she is: unchanged outside, steeply low-passed and quieter fully in", () => {
    const M = TUNING.music, mix = mixAt(M, 1, 0, 10);
    expect(muffled(M, mix, 0)).toEqual(mix);
    const full = muffled(M, mix, 1), half = muffled(M, mix, 0.5);
    expect(full.cutoff).toBeCloseTo(M.circle.muffle, 3);
    expect(full.volume).toBeCloseTo(mix.volume * M.circle.quiet, 6);
    expect(half.cutoff).toBeLessThan(mix.cutoff);
    expect(half.cutoff).toBeGreaterThan(full.cutoff);
    expect(M.circle.muffle).toBeLessThan(500); // ("very muffled")
  });

  /** The layer's notes over a block of `bars` bars of wave 1's forest, as part:midi strings. */
  const layer = (species: string | null, bars = 8) => {
    const plan: BlockPlan = { section: "forest", start: 0, bars, wave: 1, arc: 1 }, out: string[] = [];
    for (let s = 0; s < bars * 16; s++) for (const e of notesAt(style, plan, null, s, { seed: 7, siege: 0, circle: species ? { species, level: 1 } : undefined })) if (e.layer === "circle") out.push(`${s}:${e.part}:${e.midi}`);
    return out;
  };

  it("plays a legend's own layer in the music's key over it, only while she's in a circle", () => {
    expect(layer(null)).toEqual([]);
    const elk = layer("elk");
    expect(elk.length).toBeGreaterThan(4);
    // in the key: every pitched note of the layer on the style's scale
    const a = style.arc[1], scale = style.scales[a.scale ?? style.scale].map(d => (d + style.root + (a.transpose ?? 0)) % 12);
    for (const n of elk) { const m = +n.split(":")[2]; if (!Number.isNaN(m)) expect(scale).toContain(((m % 12) + 12) % 12); }
    // the music under it unchanged
    const plan: BlockPlan = { section: "forest", start: 0, bars: 8, wave: 1, arc: 1 };
    const rest = (circle?: { species: string; level: number }) => Array.from({ length: 128 }, (_, s) => notesAt(style, plan, null, s, { seed: 7, siege: 0, circle }).filter(e => !e.layer).map(e => `${e.part}:${e.midi}`).join()).join("|");
    expect(rest({ species: "elk", level: 1 })).toBe(rest());
  });

  it("gives each species its own legend music: families their own instruments, kin their own melodies", () => {
    const partsOf = (sp: string) => circleParts(style, sp).map(([k]) => k).sort().join();
    expect(partsOf("elk")).not.toBe(partsOf("owl")); // big beast against bird
    expect(partsOf("wolf")).not.toBe(partsOf("beetle"));
    expect(partsOf("elk")).toBe(partsOf("bear")); // the same family's instruments...
    expect(layer("elk")).not.toEqual(layer("bear")); // ...but its own music
    const all = ["bat", "marten", "elk", "stoat", "owl", "snail", "wolf", "fox", "badger", "boar", "stag", "hare", "bear", "lynx", "otter", "beaver", "ram", "squirrel", "dormouse", "salamander", "toad", "raven", "mole", "hedgehog", "woodlouse", "snake", "moth", "glowworm", "spider", "beetle"];
    const tunes = new Set(all.map(sp => layer(sp).join()));
    expect(tunes.size).toBe(all.length);
  });
});
