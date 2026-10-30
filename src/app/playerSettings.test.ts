// The player's settings (app/playerSettings.ts): saved and loaded on this browser, today's volumes and screen shake carried over the
// first time, a bad or blocked storage harmless, and each one put on the tuning.
import { describe, expect, it } from "vitest";
import { DEFAULTS, KEY, applySettings, clean, currentSettings, devVolume, ladderChoice, loadSettings, padGlyphs, saveSettings, setCurrentSettings, settingsBase, restoreSettingsBase, type Store } from "./playerSettings";
import { TUNING } from "../rules/tuning";

const mem = (init: Record<string, string> = {}): Store & { data: Record<string, string> } => {
  const data = { ...init };
  return { data, getItem: k => data[k] ?? null, setItem: (k, v) => { data[k] = v; } };
};

describe("saving and loading", () => {
  it("defaults rumble on for older saves and remembers it off", () => {
    expect(loadSettings(mem({ [KEY]: JSON.stringify({ shake: true }) })).rumble).toBe(true);
    const st = mem(); saveSettings({ ...DEFAULTS, rumble: false }, st);
    expect(loadSettings(st).rumble).toBe(false);
    expect(clean({ rumble: "yes" }).rumble).toBe(true);
  });
  it("is the defaults on a new browser", () => expect(loadSettings(mem())).toEqual(DEFAULTS));
  it("comes back as saved", () => {
    const st = mem(), s = { ...DEFAULTS, master: 0.6, quality: "low" as const, reduceFlashing: true, talk: "toggle" as const, textSize: 1.25 as const, glyphs: "xbox" as const };
    expect(saveSettings(s, st)).toBe(true);
    expect(loadSettings(st)).toEqual(s);
  });
  it("carries over today's saved volumes and screen shake the first time, not after", () => {
    const st = mem({ "witch.settings": JSON.stringify({ musicVolume: 0.3, sfxVolume: 0.7 }), "witch.shake": "0" });
    const s = loadSettings(st);
    expect([s.music, s.effects, s.shake]).toEqual([0.3, 0.7, false]);
    saveSettings({ ...s, music: 0.9 }, st);
    expect(loadSettings(st).music).toBe(0.9);
  });
  it("keeps the start screen's shake in step (witch.shake)", () => {
    const st = mem(); saveSettings({ ...DEFAULTS, shake: false }, st); expect(st.data["witch.shake"]).toBe("0");
  });
  it("throws nothing away but what's wrong: bad values are their defaults", () => {
    expect(clean({ master: 2, music: -1, quality: "ultra", talk: "toggle", textSize: 3, screen: 5 })).toEqual({ ...DEFAULTS, talk: "toggle" });
    expect(loadSettings(mem({ [KEY]: "{not json" }))).toEqual(DEFAULTS);
  });
  it("works with no storage, or one that refuses", () => {
    expect(loadSettings(null)).toEqual(DEFAULTS);
    const refuse: Store = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
    expect(loadSettings(refuse)).toEqual(DEFAULTS);
    expect(saveSettings(DEFAULTS, refuse)).toBe(false);
  });
});

describe("applying", () => {
  const fresh = () => structuredClone(TUNING) as unknown as typeof TUNING;
  it("keeps original settings levels across a saved night, including disabled shake/flash and quieter voices", () => {
    const t = fresh(), original = { voice: t.sfx.voice.witch.volume, shake: t.combat.shake, flash: t.attackFx.legendFlash };
    const s = { ...DEFAULTS, voices: 0.5, shake: false, reduceFlashing: true };
    applySettings(s, t);
    const resumed = structuredClone(t);
    restoreSettingsBase(resumed, settingsBase(t)!);
    applySettings(s, resumed);
    expect(resumed.sfx.voice.witch.volume).toBeCloseTo(original.voice * 0.5);
    applySettings(DEFAULTS, resumed);
    expect([resumed.sfx.voice.witch.volume, resumed.combat.shake, resumed.attackFx.legendFlash]).toEqual([original.voice, original.shake, original.flash]);
  });
  it("sets the volumes, master times each", () => {
    const t = fresh();
    applySettings({ ...DEFAULTS, master: 0.5, music: 0.8, effects: 0.6 }, t);
    expect(t.music.volume).toBeCloseTo(0.4);
    expect(t.sfx.volume).toBeCloseTo(0.3);
  });
  it("scales every babbling voice from its built level, never compounding", () => {
    const t = fresh(), w0 = t.sfx.voice.witch.volume;
    applySettings({ ...DEFAULTS, voices: 0.5 }, t); applySettings({ ...DEFAULTS, voices: 0.5 }, t);
    expect(t.sfx.voice.witch.volume).toBeCloseTo(w0 * 0.5);
    applySettings(DEFAULTS, t);
    expect(t.sfx.voice.witch.volume).toBeCloseTo(w0);
  });
  it("turns the legends' quake shake off and back on, and a legend's flash off with reduce flashing", () => {
    const t = fresh(), shake = t.combat.shake, flash = t.attackFx.legendFlash;
    applySettings({ ...DEFAULTS, shake: false, reduceFlashing: true }, t);
    expect([t.combat.shake, t.attackFx.legendFlash]).toEqual([0, 0]);
    applySettings(DEFAULTS, t);
    expect([t.combat.shake, t.attackFx.legendFlash]).toEqual([shake, flash]);
  });
  it("maps quality onto the ladder: auto, full, the middle rung, the top", () => {
    expect([ladderChoice("auto", 9), ladderChoice("high", 9), ladderChoice("medium", 9), ladderChoice("low", 9)]).toEqual(["auto", "off", "5", "9"]);
  });
  it("names a pad's glyphs from its name unless forced", () => {
    expect(padGlyphs("auto", "Xbox Wireless Controller (STANDARD GAMEPAD Vendor: 045e)")).toBe("xbox");
    expect(padGlyphs("auto", "DualSense Wireless Controller (Vendor: 054c)")).toBe("ps");
    expect(padGlyphs("auto", undefined)).toBe("ps");
    expect(padGlyphs("xbox", "DualSense")).toBe("xbox");
  });
});

describe("the pause page's own Volume sliders", () => {
  it("move the settings with them (over master), so the next night keeps them", () => {
    setCurrentSettings({ ...DEFAULTS, master: 0.5 });
    devVolume("music.volume", 0.2); expect(currentSettings().music).toBeCloseTo(0.4);
    devVolume("sfx.volume", 0.8); expect(currentSettings().effects).toBe(1);
    devVolume("waves.length", 3); expect(currentSettings()).toMatchObject({ music: 0.4, effects: 1 });
    setCurrentSettings({ ...DEFAULTS });
  });
});
