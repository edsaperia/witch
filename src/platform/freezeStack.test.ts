import { afterEach, expect, it, vi } from "vitest";
import type { Game } from "../rules/game";

afterEach(() => { vi.unstubAllGlobals(); vi.resetModules(); });

async function page(game: Game) {
  const listeners: Record<string, { f: (e: KeyboardEvent) => void; capture: boolean }[]> = {};
  const addEventListener = (type: string, f: (e: KeyboardEvent) => void, options?: AddEventListenerOptions) => {
    (listeners[type] ??= []).push({ f, capture: !!options?.capture });
  };
  let buttons: number[] = [];
  const pad = () => ({ index: 0, connected: true, id: "fixture", mapping: "standard", axes: [0, 0, 0, 0], buttons: Array.from({ length: 17 }, (_, i) => ({ pressed: buttons.includes(i), value: buttons.includes(i) ? 1 : 0 })) }) as unknown as Gamepad;
  vi.stubGlobal("window", { addEventListener });
  vi.stubGlobal("navigator", { getGamepads: () => [pad()] });
  vi.stubGlobal("HTMLElement", class {});
  vi.stubGlobal("document", { hidden: false, querySelector: () => null, addEventListener() {}, createElement: () => ({ style: {}, addEventListener() {} }), head: { append() {} }, body: { append() {}, classList: { toggle() {} } } });
  const { Input } = await import("./input"), { Freeze } = await import("./freeze"), { inputStack } = await import("./inputStack");
  // The production construction order: game release listeners precede the freeze capture adapter.
  const input = new Input(window), freeze = new Freeze(game, 123, "test");
  freeze.onToggle = () => input.release();
  const key = (code: string, type = "keydown", repeat = false, target: object | null = null) => {
    let stopped = false;
    const e = { type, code, repeat, target, preventDefault: vi.fn(), stopImmediatePropagation() { stopped = true; } } as unknown as KeyboardEvent;
    const all = listeners[type] ?? [];
    for (const listener of [...all.filter(l => l.capture), ...all.filter(l => !l.capture)]) {
      if (stopped) break;
      listener.f(e);
    }
    return { stopped, event: e };
  };
  return { input, freeze, inputStack, key, buttons: (next: number[]) => { buttons = next; } };
}

it("pause owns keys and pads, and held keyboard input cannot leak across a frame-free pause/resume", async () => {
  const p = await page({ clock: { paused: false } } as Game);
  p.key("KeyW"); expect(p.input.read().moveZ).toBe(-1);
  p.key("Escape");
  expect(p.freeze.frozen).toBe(true); expect(p.inputStack.top?.id).toBe("pause");
  p.buttons([0, 1, 13]);
  expect(navigator.getGamepads()).toEqual([]);
  expect(p.freeze.pad()?.buttons[1].pressed).toBe(true);
  expect(p.key("KeyE").stopped).toBe(true);
  const typing = p.key("KeyA", "keydown", false, { tagName: "TEXTAREA", closest: () => null });
  expect(typing.stopped).toBe(true); expect(typing.event.preventDefault).toHaveBeenCalled(); // outside pause: native defaults are blocked too
  p.key("Escape", "keyup"); p.key("Escape");
  expect(p.freeze.frozen).toBe(false); expect(p.inputStack.owns(null)).toBe(true);
  expect(navigator.getGamepads()[0]?.buttons[1].pressed).toBe(false);
  expect(p.key("KeyW", "keydown", true).stopped).toBe(true);
  expect(p.input.read()).toMatchObject({ moveZ: 0, place: false, toggleMode: false });
  p.key("KeyW", "keyup"); p.key("KeyW");
  expect(p.input.read().moveZ).toBe(-1);
  p.buttons([]); navigator.getGamepads(); p.buttons([1]);
  expect(navigator.getGamepads()[0]?.buttons[1].pressed).toBe(true);
});

it("keeps Studio first-Esc, Settings Esc and Start's opening-held behavior", async () => {
  const p = await page({ clock: { paused: false } } as Game);
  p.freeze.started = () => false;
  expect(p.key("Escape").stopped).toBe(false); expect(p.freeze.frozen).toBe(false);
  p.key("Escape", "keyup"); p.freeze.started = () => true;
  p.buttons([9]); p.freeze.pollPad(); p.freeze.pollPad();
  expect(p.freeze.frozen).toBe(true);
  p.freeze.ownsEsc = () => false;
  const settings = { tagName: "BUTTON", closest: () => ({ id: "settings-page" }) };
  expect(p.key("Escape", "keydown", false, settings).stopped).toBe(false);
  expect(p.freeze.frozen).toBe(true);
  p.buttons([]); p.freeze.pollPad(); p.buttons([9]); p.freeze.pollPad();
  expect(p.freeze.frozen).toBe(false);
});

it("records and replays identical rules state across pause/resume with a held key and a single-step", async () => {
  const { newGame, STEP } = await import("../rules/game"), { TUNING } = await import("../rules/tuning");
  const { captureNight } = await import("../app/nightSave"), { restoreSettingsBase } = await import("../app/playerSettings");
  const { InputRecorder, replayRecording } = await import("./inputRecording"), { snapshotGame } = await import("../rules/nightSnapshot");
  const tuning = structuredClone(TUNING); tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning); game.clock.paused = false;
  restoreSettingsBase(game.tuning, { voices: {}, shake: 1, legendFlash: 1 });
  const p = await page(game);
  const recorder = new InputRecorder(game, "test", () => captureNight(game, { build: "test", params: "seed=123", look: null, loan: null, flags: { chartRecorded: false, overRecorded: false } }));
  p.freeze.mutate = (label, action) => recorder.mutate(label, action);
  p.freeze.advance = (_game, controls, dt) => recorder.step(controls, dt);
  p.key("KeyW"); recorder.step(p.input.read(), STEP * 0.6);
  p.key("Escape"); expect(game.clock.paused).toBe(true);
  p.freeze.step(1);
  p.key("Escape", "keyup"); p.key("Escape");
  expect(game.clock.paused).toBe(false);
  expect(p.input.read().moveZ).toBe(0);
  p.key("KeyW", "keydown", true);
  for (let i = 0; i < 3; i++) recorder.step(p.input.read(), STEP);
  const tape = recorder.export();
  expect(tape.events.filter(e => e.kind === "checkpoint").map(e => e.label)).toEqual(["pause page", "single step: resume", "single step: pause", "pause page"]);
  const replay = replayRecording(tape, "test");
  expect(snapshotGame(replay)).toEqual(snapshotGame(game));
  expect(replay.acc).toBe(game.acc); expect(replay.pending).toEqual(game.pending);
});
