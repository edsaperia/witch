// The settings this browser remembers (app/settings.ts): the volumes and the waves' speed taken again as the game loads,
// but never over a knob the link's own ?set= gives (a repro link).
import { afterEach, describe, expect, it } from "vitest";
import { applySavedSettings, carryKnobs, saveSetting } from "./settings";
import { DECISION_LIST, knobAt, setKnob } from "../ui/decisions";
import { TUNING } from "../rules/tuning";
import { slotStorage } from "./saveSlots";

const store = new Map<string, string>();
(globalThis as { localStorage?: unknown }).localStorage ??= { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, v), removeItem: (k: string) => void store.delete(k) };
afterEach(() => slotStorage.removeItem("witch.settings"));

describe("the remembered settings", () => {
  const wave = DECISION_LIST.find(d => d.id === "waveSpeed")!;
  it("keep the waves' speed (Ed, 2026-10-18), its built default 1 m/s forgotten", () => {
    expect(wave.persist).toBe(true); expect(wave.default).toBe(TUNING.leyLines.pulseSpeed); expect(TUNING.leyLines.pulseSpeed).toBe(1);
    saveSetting(wave, 2.5);
    const t = JSON.parse(JSON.stringify(TUNING)) as typeof TUNING;
    expect(applySavedSettings(t)).toContain("waveSpeed"); expect(t.leyLines.pulseSpeed).toBe(2.5);
    saveSetting(wave, 1);
    expect(slotStorage.getItem("witch.settings")).toBe("{}");
  });
  it("leave a knob the link sets alone", () => {
    saveSetting(wave, 3);
    const t = JSON.parse(JSON.stringify(TUNING)) as typeof TUNING;
    t.leyLines.pulseSpeed = 0.5;
    expect(applySavedSettings(t, undefined, new Set(["leyLines.pulseSpeed"]))).not.toContain("waveSpeed");
    expect(t.leyLines.pulseSpeed).toBe(0.5);
  });
});

describe("the sliders carried to the next night (Ed, 2026-10-19: all of them, the game's knobs too)", () => {
  const copy = () => JSON.parse(JSON.stringify(TUNING)) as typeof TUNING;
  it("every pause-page knob changed in one night is set in the next's, and nothing else", () => {
    const knobbed = DECISION_LIST.filter(d => d.apply.knob && typeof d.default === "number");
    expect(knobbed.length).toBeGreaterThan(2);
    const a = copy(), b = copy();
    const knobs = [...new Set(knobbed.map(d => d.apply.knob!))]; // (a knob may have two entries)
    for (const k of knobs) setKnob(a, k, (knobAt(a, k) as number) + 0.5);
    a.areaSize += 99; // (not a slider: stays the next night's own)
    expect(carryKnobs(a, b).length).toBe(knobs.length);
    for (const d of knobbed) expect(knobAt(b, d.apply.knob!)).toBe(knobAt(a, d.apply.knob!));
    expect(b.areaSize).toBe(TUNING.areaSize);
  });
  it("leaves a knob the next night's link sets", () => {
    const wave = DECISION_LIST.find(d => d.id === "waveSpeed")!, a = copy(), b = copy();
    a.leyLines.pulseSpeed = 4; b.leyLines.pulseSpeed = 0.5;
    expect(carryKnobs(a, b, DECISION_LIST, new Set([wave.apply.knob!]))).not.toContain("waveSpeed");
    expect(b.leyLines.pulseSpeed).toBe(0.5);
  });
});
