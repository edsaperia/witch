// The live Music Lab's settings (tools/music-lab/live/settings.ts): what Ed copies is only what he changed, and pasting it
// back gives the same settings.
import { describe, expect, it } from "vitest";
import { defaultState, heard, parseSettings, settingsJson, type Defaults } from "../tools/music-lab/live/settings";

const D: Defaults = { bpm: 120, mode: "dorian", parts: ["kick", "bass", "lead"], victory: { transpose: 2, layers: { choir: 0.6, clap: 1 } } };
const SECTIONS = ["drop", "build", "victory"];

describe("music lab settings", () => {
  it("copies nothing but its label when nothing changed", () => {
    expect(JSON.parse(settingsJson(defaultState(D), D))).toEqual({ lab: "witch-music-lab/1" });
  });

  it("copies only what changed, and pastes back the same", () => {
    const s = defaultState(D);
    s.wave = 5; s.section = "victory"; s.seed = 42; s.bpm = 126; s.mode = "phrygian"; s.witchHouse = true;
    s.layers.drone = 0.8; s.layers.frames = 1.2; s.voice = "pinkTrombone"; s.parts.kick = 0.5; s.mute = ["lead"]; s.solo = ["frames", "kick"];
    s.victory.transpose = 4; s.victory.layers.choir = 1; s.night = { waves: 30, island: "fox" };
    const text = settingsJson(s, D), back = parseSettings(text, D, SECTIONS);
    expect(back.ignored).toEqual([]);
    expect(back.state).toEqual(s);
    const j = JSON.parse(text);
    expect(j.parts).toEqual({ kick: 0.5 });
    expect(j.layers).toEqual({ drone: 0.8, frames: 1.2 });
    expect(j.victory).toEqual({ transpose: 4, layers: { choir: 1 } });
    expect(text.split("\n").length).toBeLessThan(20); // (short enough to paste in a message)
  });

  it("ignores what it doesn't know and keeps numbers in range", () => {
    const { state, ignored } = parseSettings('```json\n{ "bpm": 999, "parts": { "kick": 7, "nope": 1 }, "mode": "lydian", "extra": 1, "passage": { "section": "nowhere" } }\n```', D, SECTIONS);
    expect(state.bpm).toBe(200);
    expect(state.parts.kick).toBe(2);
    expect(state.parts).not.toHaveProperty("nope");
    expect(state.mode).toBe("dorian");
    expect(state.section).toBe("");
    expect(ignored).toEqual(["mode", "extra"]);
    expect(() => parseSettings("not json", D, SECTIONS)).toThrow();
  });

  it("mutes and solos", () => {
    const s = defaultState(D);
    expect(heard(s, "kick", 1)).toBe(1);
    s.mute = ["kick"]; expect(heard(s, "kick", 1)).toBe(0);
    s.mute = []; s.solo = ["bass"];
    expect(heard(s, "kick", 1)).toBe(0);
    expect(heard(s, "bass", 0.7)).toBe(0.7);
  });
});
