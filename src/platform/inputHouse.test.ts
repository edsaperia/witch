// Rising in the treehouse through the page's own controls (platform/input.ts): with no broom, no input lifts her off but on the
// Terrace (Ed, 2026-10-23: "She shouldn't be able to rise while in the treehouse, except on the terrace"): the gamepad's X (its
// rise, the bottom face button) with the stick held toward a station against the wall, as Ed's playtest on v4273 found it taking
// her off in the bedroom, and Space with the keys held the same way (pushed at a round room's wall she stands on its very edge,
// where a floor test reads her as just outside the room); with her broom, both take her up from any room (Ed, 2026-10-26: "maybe
// you can take off from anywhere on the treehouse").
import { afterEach, describe, expect, it, vi } from "vitest";
import { Input, KEYS, PAD } from "./input";
import { TUNING } from "../rules/tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "../rules/game";
import { deckOf, onTerrace } from "../rules/treehouse";
import { HOUSE_ROOMS, fromPlan, objectFront } from "../rules/houseRooms";

/** A window to listen on: the keys sent to it by hand. */
function fakeWindow() {
  const on: Record<string, ((e: unknown) => void)[]> = {};
  const w = { addEventListener: (t: string, f: (e: unknown) => void) => (on[t] ??= []).push(f) } as unknown as Window;
  const send = (t: string, code: string) => { for (const f of on[t] ?? []) f({ code, repeat: false, preventDefault() {}, stopPropagation() {} }); };
  return { w, down: (code: string) => send("keydown", code), up: (code: string) => send("keyup", code) };
}
/** A standard-mapping pad: its buttons and left stick, set by hand. */
function fakePad() {
  const pad = { id: "test", index: 0, connected: true, mapping: "standard", axes: [0, 0, 0, 0], buttons: Array.from({ length: 17 }, () => ({ pressed: false, touched: false, value: 0 })), timestamp: 0 };
  vi.stubGlobal("navigator", { getGamepads: () => [pad] });
  return { stick: (x: number, z: number) => { pad.axes[0] = x; pad.axes[1] = z; }, press: (i: number, on: boolean) => { pad.buttons[i] = { pressed: on, touched: on, value: on ? 1 : 0 }; } };
}
afterEach(() => vi.unstubAllGlobals());

/** In the house mid-night, landed, off her decks, with her broom or not (rules/kit.ts). */
function inHouse(broom = false): Game {
  const g = newGame(123, TUNING);
  g.witches[0].kit = { invites: true, broom };
  g.clock.paused = false; g.party.paused = true;
  for (let i = 0; i < 0.3 / STEP; i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP); // (the controls' first frame)
  return g;
}
const step = (g: Game, input: Input, s: number) => { for (let i = 0; i < Math.max(1, Math.round(s / STEP)); i++) stepGame(g, input.read() as Controls, STEP); };
/** Put her at (x, z) on the house's floor, then push `ux, uz` (the stick or the keys) a while, rise pressed once on the way: her
 *  mode after (`inRooms`: "terrace" if the push took her out along a branch onto the Terrace before the press). */
function pushAndRise(g: Game, x: number, z: number, ux: number, uz: number, how: "pad" | "keys", inRooms = true): string {
  const W = g.witches[0];
  W.body = { ...W.body, x, z, vx: 0, vz: 0, perch: true, mode: "ground", lift: 0, seated: false };
  const k = fakeWindow(), input = new Input(k.w), pad = how === "pad" ? fakePad() : null;
  const keys: string[] = [];
  if (Math.abs(ux) > 0.3) keys.push(ux > 0 ? KEYS.right[0] : KEYS.left[0]);
  if (Math.abs(uz) > 0.3) keys.push(uz > 0 ? KEYS.down[0] : KEYS.up[0]);
  if (pad) pad.stick(ux, uz); else for (const c of keys) k.down(c);
  step(g, input, 3); // (into the wall: held there)
  const d = deckOf(g.map, g.tuning)!;
  if (inRooms && onTerrace(d, W.body.x, W.body.z)) { if (pad) pad.stick(0, 0); else for (const c of keys) k.up(c); return "terrace"; } // (along a branch out onto the Terrace: rising's hers there)
  if (pad) pad.press(PAD.rise[0], true); else k.down(KEYS.rise[0]);
  step(g, input, STEP);
  if (pad) pad.press(PAD.rise[0], false); else k.up(KEYS.rise[0]);
  step(g, input, 0.4);
  if (!pad) for (const c of keys) k.up(c);
  return W.body.mode;
}

describe("rising in the treehouse, through the page's controls", () => {
  for (const how of ["pad", "keys"] as const) {
    it(`${how}: with no broom, pushed against every room's walls, she stays on the ground`, () => {
      const g = inHouse(), d = deckOf(g.map, g.tuning)!, rose: string[] = [];
      for (const r of HOUSE_ROOMS.rooms.filter(q => !q.locked && q.id !== "terrace")) { // (the Terrace: rising, and its open rim, are hers)
        const c = fromPlan(d, (r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2);
        for (let a = 0; a < 360; a += how === "pad" ? 15 : 45) {
          const u = { x: Math.cos((a * Math.PI) / 180), z: Math.sin((a * Math.PI) / 180) };
          const m = pushAndRise(g, c.x, c.z, u.x, u.z, how);
          if (m !== "ground" && m !== "terrace") rose.push(`${r.id} ${a}°: ${m}`);
        }
      }
      expect(rose).toEqual([]);
    });
  }

  it("pad: with no broom, at each bedroom station, the stick held toward it, X doesn't take her off", () => {
    const g = inHouse(), rose: string[] = [];
    for (const o of HOUSE_ROOMS.objects.filter(q => q.room === "bedroom")) {
      const at = objectFront(o, g.map.treehouse, 0.6), to = objectFront(o, g.map.treehouse, -0.5), l = Math.hypot(to.x - at.x, to.z - at.z) || 1;
      const m = pushAndRise(g, at.x, at.z, (to.x - at.x) / l, (to.z - at.z) / l, "pad");
      if (m !== "ground") rose.push(`${o.id}: ${m}`);
    }
    expect(rose).toEqual([]);
  });

  it("pad: on the Terrace X still takes her up", () => {
    const g = inHouse(), d = deckOf(g.map, g.tuning)!;
    expect(["rising", "treetop"]).toContain(pushAndRise(g, d.x, d.z, 0, 0, "pad", false));
  });

  for (const how of ["pad", "keys"] as const) {
    it(`${how}: with her broom, rise takes her up from every room, pushed against its wall or not`, () => {
      const stayed: string[] = [];
      for (const r of HOUSE_ROOMS.rooms.filter(q => !q.locked && q.id !== "terrace")) {
        for (const a of [null, 0, 180]) {
          const g = inHouse(true), d = deckOf(g.map, g.tuning)!, c = fromPlan(d, (r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2);
          for (let i = 0; i < 3 / STEP; i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP); // (the night's first dodge's worth of cooldown over)
          const m = a === null ? pushAndRise(g, c.x, c.z, 0, 0, how, false) : pushAndRise(g, c.x, c.z, Math.cos((a * Math.PI) / 180), Math.sin((a * Math.PI) / 180), how);
          if (m !== "rising" && m !== "treetop" && m !== "terrace") stayed.push(`${r.id} ${a ?? "still"}: ${m}`);
        }
      }
      expect(stayed).toEqual([]);
    });
  }
});
