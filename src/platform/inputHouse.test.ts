// Rising through the actual page controls. With a broom, pad/keys lift her from
// any room; without one, room rise stays blocked (the Terrace's existing rise
// exception remains). Ed,2026-11-01: open edges replace walls, so walking off
// independently starts flight or a fall/thud/return to the departure edge.
import { afterEach, describe, expect, it, vi } from "vitest";
import { Input } from "./input";
import { bindings } from "./bindings";
const RISE_KEY = bindings.keys("game.rise")[0], RISE_PAD = bindings.padButtons("game.rise")[0];
import { TUNING } from "../rules/tuning";
import { newGame as fullGame, stepGame, STEP, type Controls, type Game } from "../rules/game";
import { smallWorld } from "../test/worlds";
const newGame = smallWorld(fullGame, "House rise controls exercise local walls, rooms and kit state, independent of distant area count.");
import { deckOf, onTerrace, onFloor } from "../rules/treehouse";
import { HOUSE_ROOMS, fromPlan, objectFront, nearestRoomFloor } from "../rules/houseRooms";

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
/** Put her at (x, z) on the house's floor, then push `ux, uz` (stick or keys) and press rise before walking off: her
 *  mode after (`inRooms`: "terrace" if the push took her out along a branch onto the Terrace before the press). */
function pushAndRise(g: Game, x: number, z: number, ux: number, uz: number, how: "pad" | "keys", inRooms = true): string {
  const W = g.witches[0];
  W.body = { ...W.body, x, z, vx: 0, vz: 0, perch: true, mode: "ground", lift: 0, seated: false, falling: undefined, fallReturn: undefined };
  const k = fakeWindow(), input = new Input(k.w), pad = how === "pad" ? fakePad() : null;
  const keys: string[] = [];
  if (Math.abs(ux) > 0.3) keys.push(bindings.keys(ux > 0 ? "game.moveRight" : "game.moveLeft")[0]);
  if (Math.abs(uz) > 0.3) keys.push(bindings.keys(uz > 0 ? "game.moveDown" : "game.moveUp")[0]);
  if (pad) pad.stick(ux, uz); else for (const c of keys) k.down(c);
  // Ed's open edges no longer hold a three-second push against a wall. Test
  // the rise input while still on the floor, before walking off can take off.
  step(g, input, STEP);
  const d = deckOf(g.map, g.tuning)!;
  if (inRooms && onTerrace(d, W.body.x, W.body.z)) { if (pad) pad.stick(0, 0); else for (const c of keys) k.up(c); return "terrace"; } // (along a branch out onto the Terrace: rising's hers there)
  if (pad) pad.press(RISE_PAD, true); else k.down(RISE_KEY);
  step(g, input, STEP);
  if (pad) pad.press(RISE_PAD, false); else k.up(RISE_KEY);
  step(g, input, 0.4);
  if (!pad) for (const c of keys) k.up(c);
  return W.body.mode;
}

describe("rising in the treehouse, through the page's controls", () => {
  // A room a test (all of them in one was 264 pushes on the pad, 36 s alone and past its 60 s cap under a full run's load), one
  // night shared by a kind's rooms as the one test shared it.
  for (const how of ["pad", "keys"] as const) {
    let night: Game | null = null;
    for (const r of HOUSE_ROOMS.rooms.filter(q => !q.locked && q.id !== "terrace")) { // (the Terrace: rising, and its open rim, are hers)
      it(`${how}: with no broom, moving in ${r.id}, rise cannot start flight`, () => {
        const g = (night ??= inHouse()), d = deckOf(g.map, g.tuning)!, rose: string[] = [];
        const c = fromPlan(d, (r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2);
        for (let a = 0; a < 360; a += how === "pad" ? 15 : 45) {
          const u = { x: Math.cos((a * Math.PI) / 180), z: Math.sin((a * Math.PI) / 180) };
          const m = pushAndRise(g, c.x, c.z, u.x, u.z, how);
          if (m !== "ground" && m !== "terrace") rose.push(`${r.id} ${a}°: ${m}`);
        }
        expect(rose).toEqual([]);
      });
    }
  }

  it("pad: with no broom, at each bedroom station, the stick held toward it, rise doesn't take her off", () => {
    const g = inHouse(), rose: string[] = [];
    for (const o of HOUSE_ROOMS.objects.filter(q => q.room === "bedroom")) {
      const at = objectFront(o, g.map.treehouse, 0.6), to = objectFront(o, g.map.treehouse, -0.5), l = Math.hypot(to.x - at.x, to.z - at.z) || 1;
      const m = pushAndRise(g, at.x, at.z, (to.x - at.x) / l, (to.z - at.z) / l, "pad");
      if (m !== "ground") rose.push(`${o.id}: ${m}`);
    }
    expect(rose).toEqual([]);
  });

  it("pad: on the Terrace rise still takes her up after the landing cooldown", () => {
    const g = inHouse(), d = deckOf(g.map, g.tuning)!;
    const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    for (let i = 0; i < 3 / STEP; i++) stepGame(g, idle, STEP);
    expect(["rising", "treetop"]).toContain(pushAndRise(g, d.x, d.z, 0, 0, "pad", false));
  });

  for (const how of ["pad", "keys"] as const) {
    it(`${how}: with her broom, rise takes her up from every room before she walks off`, () => {
      const stayed: string[] = [];
      // One night for every case (a new one each was 33 maps, 50 s of the test's 60 s cap), its first dodge's worth of cooldown
      // over once; each case starts from her as she was then (her cooldowns and landing put back), so none follows from the last.
      const g = inHouse(true), d = deckOf(g.map, g.tuning)!;
      for (let i = 0; i < 3 / STEP; i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP);
      const fresh = structuredClone(g.witches[0]);
      for (const r of HOUSE_ROOMS.rooms.filter(q => !q.locked && q.id !== "terrace")) {
        for (const a of [null, 0, 180]) {
          Object.assign(g.witches[0], structuredClone(fresh));
          const c = fromPlan(d, (r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2);
          const m = a === null ? pushAndRise(g, c.x, c.z, 0, 0, how, false) : pushAndRise(g, c.x, c.z, Math.cos((a * Math.PI) / 180), Math.sin((a * Math.PI) / 180), how);
          if (m !== "rising" && m !== "treetop" && m !== "terrace") stayed.push(`${r.id} ${a ?? "still"}: ${m}`);
        }
      }
      expect(stayed).toEqual([]);
    });

    it(`${how}: walking off an open edge without a broom thuds and returns to that edge`, () => {
      const g = inHouse(false), W = g.witches[0], d = deckOf(g.map, g.tuning)!;
      const edge = nearestRoomFloor(d.house!.rooms!, d.x + 1000, d.z)!;
      W.body = { ...W.body, x: edge.x, z: edge.z, vx: 0, vz: 0, lift: 0, mode: 'ground', perch: true, seated: false };
      const k = fakeWindow(), input = new Input(k.w), pad = how === 'pad' ? fakePad() : null;
      const key = bindings.keys('game.moveRight')[0];
      if (pad) pad.stick(1, 0); else k.down(key);
      let returnAt: { x: number; z: number } | undefined, thuds = 0, returned = 0;
      for (let i = 0; i < 3 / STEP && !returned; i++) {
        stepGame(g, input.read() as Controls, STEP);
        if (W.body.falling !== undefined && !returnAt) {
          returnAt = W.body.fallReturn;
          if (pad) pad.stick(0, 0); else k.up(key);
        }
        thuds += W.leash.events.filter(e => e.kind === 'thud').length;
        returned += W.leash.events.filter(e => e.kind === 'fell').length;
      }
      expect(returnAt).toBeDefined(); expect(thuds).toBe(1); expect(returned).toBe(1);
      expect(W.body.mode).toBe('ground'); expect(W.body.perch).toBe(true);
      expect(onFloor(d, W.body.x, W.body.z)).toBe(true);
      expect(Math.hypot(W.body.x - returnAt!.x, W.body.z - returnAt!.z)).toBeLessThan(0.01);
    });

    it(`${how}: walking off the same edge with a broom reaches treetop without a fall`, () => {
      const g = inHouse(true), W = g.witches[0], d = deckOf(g.map, g.tuning)!;
      const edge = nearestRoomFloor(d.house!.rooms!, d.x + 1000, d.z)!;
      W.body = { ...W.body, x: edge.x, z: edge.z, vx: 0, vz: 0, lift: 0, mode: 'ground', perch: true, seated: false };
      const k = fakeWindow(), input = new Input(k.w), pad = how === 'pad' ? fakePad() : null;
      if (pad) pad.stick(1, 0); else k.down(bindings.keys('game.moveRight')[0]);
      for (let i = 0; i < 3 / STEP && W.body.mode !== 'treetop'; i++) stepGame(g, input.read() as Controls, STEP);
      expect(W.body.mode).toBe('treetop'); expect(W.body.perch).toBeFalsy();
      expect(W.body.falling).toBeUndefined();
    });
  }
});
