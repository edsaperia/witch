import { afterEach, describe, expect, it, vi } from "vitest";
import { Bindings, PAD_BUTTONS, bindings, type ActionId } from "./bindings";
import { Input, padControls } from "./input";
import { panelPad } from "../ui/stationLines";

const axes = [0, 0, 0, 0], idle = Array(17).fill(false);
const on = (button: string) => { const b = [...idle]; b[PAD_BUTTONS[button]] = true; return b; };
const edges = {
  "game.rise": "toggleMode", "game.use": "sigil", "game.dodge": "dash", "game.hat": "hat", "game.boost": "spell",
  "game.cycleNext": "cycle", "game.cyclePrev": "cycleBack", "game.autoTalk": "toggleAutoTalk", "game.talk": "talkPressed",
  "game.debug": "debug", "game.nextWave": "nextWave", "game.pauseWaves": "pauseWaves", "game.cycleSpeakers": "cycleSpeakers",
  "game.inviteNearest": "inviteNearest", "game.feedNearest": "feedNearest", "game.happyNearest": "happyNearest",
} as const;

afterEach(() => { bindings.resetAll(); vi.unstubAllGlobals(); });

describe("every game action can be remapped to every pad button", () => {
  for (const [action, output] of Object.entries(edges)) it(action, () => {
    const B = new Bindings();
    for (const button of Object.keys(PAD_BUTTONS)) {
      B.set(action as ActionId, { pad: [button] }); const buttons = on(button);
      expect(padControls(buttons, axes, idle, false, false, [], B)[output as keyof ReturnType<typeof padControls>], button).toBe(true);
      expect(padControls(buttons, axes, buttons, false, false, axes, B)[output as keyof ReturnType<typeof padControls>], `${button} held`).toBe(false);
    }
  });
  it("movement, aim, invitation holds and menu navigation read the remapped button", () => {
    const B = new Bindings();
    for (const button of Object.keys(PAD_BUTTONS)) {
      const buttons = on(button);
      for (const [action, field, expected] of [["game.moveRight", "moveX", 1], ["game.moveUp", "moveZ", -1], ["game.invite", "fire", true], ["game.use", "sigilHeld", true], ["game.talk", "talkHeld", true], ["game.zoomIn", "zoom", -1], ["game.zoomOut", "zoom", 1]] as const) {
        B.resetAll(); for (const a of B.list()) B.set(a.id, { pad: [] }); B.set(action, { pad: [button] });
        expect(padControls(buttons, axes, idle, false, false, [], B)[field], `${action}:${button}`).toBe(expected);
      }
      B.resetAll(); B.set("game.aimRight", { pad: [button] }); expect(padControls(buttons, axes, idle, false, false, [], B).aim, button).toEqual({ x: 20, z: 0 });
      B.resetAll(); B.set("menu.back", { pad: [button] }); expect(padControls(buttons, axes, idle, false, true, [], B).sigil, button).toBe(true);
      B.resetAll(); B.set("menu.choose", { pad: [button] }); expect(panelPad(buttons, axes, B).choose, button).toBe(true);
      B.resetAll(); B.set("global.pause", { pad: [button] }); expect(B.padPressed("global.pause", buttons, axes, idle), button).toBe(true);
    }
  });
});

it("Input.read dispatches a remapped pad Talk in held/toggle mode and Auto-talk once per edge", () => {
  let buttons = idle;
  vi.stubGlobal("navigator", { getGamepads: () => [{ buttons: buttons.map(pressed => ({ pressed })), axes }] });
  const input = new Input({ addEventListener() {} } as unknown as Window);
  bindings.set("game.autoTalk", { pad: ["R3"] }); bindings.set("game.talk", { pad: ["L1"] });
  buttons = on("R3"); expect(input.read().toggleAutoTalk).toBe(true); expect(input.read().toggleAutoTalk).toBe(false);
  buttons = on("L1"); expect(input.read().talkHeld).toBe(true); expect(input.read().talkHeld).toBe(true);
  buttons = idle; expect(input.read().talkHeld).toBe(false);
  input.talkMode = "toggle"; buttons = on("L1"); expect(input.read().talkHeld).toBe(true);
  buttons = idle; expect(input.read().talkHeld).toBe(true);
  buttons = on("L1"); expect(input.read().talkHeld).toBe(false);
});
