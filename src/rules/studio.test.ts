// The treehouse Studio's instruments (rules/studio.ts, config/studio.json): the keys' notes and pads, the number row, the loop's
// patterns, every sound a real patch, and the instruments found by nearness (and not again after Esc till she's walked off).
import { describe, expect, it } from "vitest";
import styleJson from "../../config/music-style.json";
import { applyControl, controlFor, DRUM_KEYS, instrumentAt, leaveInstrument, loopHits, newStudio, NOTE_ROWS, noteFor, PAD_DRUMS, padPatch, scaleNote, soundsOf, STUDIO_CONFIG as S, type Pad } from "./studio";
import { HOUSE_ROOMS, fromObject } from "./houseRooms";

const patches = { ...(styleJson as { patches: Record<string, unknown> }).patches, ...S.patches };

describe("the Studio's keys", () => {
  it("plays three rows of the scale, the middle row from the root, every note in key", () => {
    expect(noteFor("KeyA")).toBe(S.root);
    expect(noteFor("KeyS")).toBe(S.root + 2);
    expect(noteFor("KeyZ")).toBe(S.root - 12);
    expect(noteFor("KeyQ")).toBe(S.root + 12);
    expect(noteFor("KeyA", true)).toBe(S.root + 12);
    expect(noteFor("KeyA", false, -1)).toBe(S.root - 12);
    expect(noteFor("Digit1")).toBeNull();
    const dorian = new Set([0, 2, 3, 5, 7, 9, 10]);
    for (const row of NOTE_ROWS) for (const c of row) expect(dorian.has((((noteFor(c)! - S.root) % 12) + 12) % 12)).toBe(true);
    expect(scaleNote(57, 7)).toBe(69);
    expect(scaleNote(57, -1)).toBe(55);
  });
  it("gives every drum key and gamepad pad a kit's real patch", () => {
    const pads = new Set<Pad>([...Object.values(DRUM_KEYS), ...Object.values(PAD_DRUMS)]);
    S.drums.kits.forEach((_, k) => { for (const p of pads) expect(patches[padPatch(p, k)], `${p} in kit ${k}`).toBeTruthy(); });
    expect(DRUM_KEYS.Space).toBe("kick");
    expect(DRUM_KEYS.KeyF).toBe("snare"); expect(DRUM_KEYS.KeyJ).toBe("snare"); // (mirrored for two hands)
  });
  it("has every sound a real patch", () => {
    for (const inst of ["drums", "synth", "mic"] as const) expect(soundsOf(inst).length).toBeGreaterThan(0);
    for (const s of [...soundsOf("synth"), ...soundsOf("mic")]) expect(patches[s.id], s.id).toBeTruthy();
  });
  it("runs the number row on the shared loop and her own sound", () => {
    const st = newStudio(3);
    st.players[1].at = "synth";
    applyControl(st, controlFor("Digit1")!); expect(st.loop.on).toBe(true);
    for (let i = 0; i < 40; i++) applyControl(st, controlFor("Digit3")!); expect(st.loop.bpm).toBe(S.loop.max);
    for (let i = 0; i < 40; i++) applyControl(st, controlFor("Digit2")!); expect(st.loop.bpm).toBe(S.loop.min);
    applyControl(st, controlFor("Digit4")!); expect(st.loop.style).toBe(S.loop.styles[1]);
    applyControl(st, controlFor("Digit6")!, 1); expect(st.players[1].sound.synth).toBe(1);
    expect(st.players[0].sound.synth).toBe(0); // (each player's own)
    applyControl(st, controlFor("Digit9")!, 1); expect(st.players[1].sound.synth).toBe(4);
    expect(controlFor("Digit0")).toBeNull();
  });
});

describe("the Studio's loop", () => {
  it("plays real patches in every style, a kick on the beat, never on the off-beat sixteenths", () => {
    for (const style of S.loop.styles) for (let s = 0; s < 64; s++) for (const h of loopHits(style, s)) {
      expect(patches[h.patch], `${style} ${h.patch}`).toBeTruthy();
      expect(h.steps).toBeGreaterThan(0);
      if (h.midi !== null) expect(Number.isFinite(h.midi)).toBe(true);
    }
    expect(loopHits("beat", 0).some(h => h.patch === "softKick")).toBe(true);
    expect(loopHits("beat", 1).some(h => h.patch === "softKick")).toBe(false);
    expect(loopHits("bass", 0).some(h => h.patch === "studioBass")).toBe(true);
    expect(loopHits("click", 4).length).toBe(1);
  });
});

describe("the Studio's instruments by nearness", () => {
  const at = { x: 0, z: 0 }, kit = HOUSE_ROOMS.objects.find(o => o.id === "drumKit")!, mic = HOUSE_ROOMS.objects.find(o => o.id === "microphone")!;
  it("stands the drum kit, the synth and the mic in the Studio; no record shelf (Ed, 2026-10-29: \"Remove record station, instead have dj booth\": her decks)", () => {
    for (const id of ["drumKit", "synthRack", "microphone"]) expect(HOUSE_ROOMS.objects.find(o => o.id === id)?.room).toBe("studio");
    expect(HOUSE_ROOMS.objects.find(o => o.id === "recordShelf")).toBeUndefined();
  });
  it("lights the instrument she walks up to, is at it only on E there, holds it a little past reach, and lets go on Esc (Ed's playtest, 2026-10-26)", () => {
    const front = { x: kit.x, z: kit.z + kit.d / 2 + 0.5 };
    expect(fromObject(kit, at, front.x, front.z)).toBeLessThan(HOUSE_ROOMS.reach);
    const by = instrumentAt(at, front.x, front.z, null);
    expect(by.near?.id).toBe("drumKit"); expect(by.object).toBeNull(); // (in range: lit, E over it, nothing open)
    expect(instrumentAt(at, front.x, front.z, null, "drumKit").object?.id).toBe("drumKit"); // (E there)
    expect(instrumentAt(at, front.x, front.z, null, "microphone").object).toBeNull(); // (E meant for another: not this)
    const edge = { x: kit.x, z: kit.z + kit.d / 2 + HOUSE_ROOMS.reach + 0.4 };
    expect(instrumentAt(at, edge.x, edge.z, null, "drumKit").object).toBeNull();
    expect(instrumentAt(at, edge.x, edge.z, "drumKit").object?.id).toBe("drumKit");
    // Esc: she's let go, and it stays shut by it till E
    const st = newStudio(); st.players[0].object = "drumKit"; st.players[0].at = "drums";
    leaveInstrument(st); expect(st.players[0].at).toBeNull(); expect(st.players[0].object).toBeNull();
    expect(instrumentAt(at, front.x, front.z, null).object).toBeNull();
    // (only the nearest lights: between the kit and the synth beside it, one)
    const synth = HOUSE_ROOMS.objects.find(o => o.id === "synthRack")!, between = { x: (kit.x + kit.w / 2 + synth.x - synth.w / 2) / 2, z: kit.z - kit.d / 2 + 0.3 };
    const lit = instrumentAt(at, between.x, between.z, null).near;
    if (lit) expect(fromObject(lit, at, between.x, between.z)).toBeLessThanOrEqual(Math.min(fromObject(kit, at, between.x, between.z), fromObject(synth, at, between.x, between.z)) + 1e-9);
    expect(instrumentAt(at, mic.x, mic.z + mic.d / 2 + 0.6, null).near?.id).toBe("microphone");
  });
});
