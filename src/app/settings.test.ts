// The settings this browser remembers (app/settings.ts): the volumes and the waves' speed taken again as the game loads,
// but never over a knob the link's own ?set= gives (a repro link).
import { afterEach, describe, expect, it } from "vitest";
import { applySavedSettings, saveSetting } from "./settings";
import { DECISION_LIST } from "../ui/decisions";
import { TUNING } from "../rules/tuning";

const store = new Map<string, string>();
(globalThis as { localStorage?: unknown }).localStorage ??= { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, v), removeItem: (k: string) => void store.delete(k) };
afterEach(() => localStorage.removeItem("witch.settings"));

describe("the remembered settings", () => {
  const wave = DECISION_LIST.find(d => d.id === "waveSpeed")!;
  it("keep the waves' speed (Ed, 2026-10-18), its built default 1 m/s forgotten", () => {
    expect(wave.persist).toBe(true); expect(wave.default).toBe(TUNING.leyLines.pulseSpeed); expect(TUNING.leyLines.pulseSpeed).toBe(1);
    saveSetting(wave, 2.5);
    const t = JSON.parse(JSON.stringify(TUNING)) as typeof TUNING;
    expect(applySavedSettings(t)).toContain("waveSpeed"); expect(t.leyLines.pulseSpeed).toBe(2.5);
    saveSetting(wave, 1);
    expect(localStorage.getItem("witch.settings")).toBe("{}");
  });
  it("leave a knob the link sets alone", () => {
    saveSetting(wave, 3);
    const t = JSON.parse(JSON.stringify(TUNING)) as typeof TUNING;
    t.leyLines.pulseSpeed = 0.5;
    expect(applySavedSettings(t, undefined, new Set(["leyLines.pulseSpeed"]))).not.toContain("waveSpeed");
    expect(t.leyLines.pulseSpeed).toBe(0.5);
  });
});
