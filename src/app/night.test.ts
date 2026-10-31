import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { endNight, startNight, type Page } from "./night";
import { stepGame } from "../rules/game";
import { restoreGame, snapshotGame } from "../rules/nightSnapshot";
import { DECISION_LIST, knobAt, setKnob } from "../ui/decisions";
import { installHooks, type HookDeps } from "./hooks";
import type { Hud } from "./hud";

/** A stand-in element: any property a function that hands back another, classList and style taking anything. */
function fakeEl(): unknown {
  const o: Record<string | symbol, unknown> = { classList: { add() {}, remove() {}, toggle() {} }, style: {}, textContent: "", remove() {} };
  return new Proxy(o, { get: (t, k) => (k in t ? t[k] : k === "then" ? undefined : () => fakeEl()) });
}

const G = globalThis as unknown as Record<string, unknown>;
const had = { document: "document" in G, window: "window" in G };
beforeAll(() => {
  if (!had.document) G.document = { getElementById: () => fakeEl(), body: fakeEl(), querySelectorAll: () => [] };
  if (!had.window) G.window = {};
});
afterAll(() => {
  if (!had.document) delete G.document;
  if (!had.window) delete G.window;
});

// Four areas suffice for lifecycle, cleanup and hook retargeting; explicit home/link contracts keep their authored island.
const spec = (seed: number, island = "4") => ({ how: "boot" as const, island, seed, params: new URLSearchParams({ island, seed: String(seed), creator: "0" }) });

describe("startNight (docs/plans/sail-without-reload.md B)", () => {
  it("resumes the saved rules and tuning without replaying the link's fresh-night switches", async () => {
    const original = await startNight({ night: null, build: "test", look: () => null }, spec(123, "home"));
    original.game.clock.time = original.game.herTime = 37;
    original.game.party.wave = 3;
    original.game.witch.x += 12;
    original.game.witches[0].health.hp = 1;
    original.game.witches[0].hat.has = false;
    original.tuning.fight.scale = 1.77;
    original.tuning.treetopSpeed = 42;
    original.tuning.music.volume = 0.123;
    const resumed = restoreGame(JSON.parse(JSON.stringify(snapshotGame(original.game)))), before = snapshotGame(resumed);
    const page: Page = { night: null, build: "test", look: () => ({ hat: { shape: "conical" } }) };
    const params = new URLSearchParams({ island: "home", seed: "123", creator: "0", wave: "9", hat: "harvest", fightScale: "0.5", treetopSpeed: "12", arrive: "1", spell: "wait" });
    const n = await startNight(page, { ...spec(123), params, resume: resumed });
    expect(n.game).toBe(resumed);
    expect(n.tuning).toBe(resumed.tuning);
    expect(n.arrival).toBeNull();
    expect(snapshotGame(n.game)).toEqual(before);
    expect(n.game.party.wave).toBe(3);
    expect(n.game.witches[0].hat.has).toBe(false);
    expect(n.tuning.fight.scale).toBe(1.77);
    expect(n.tuning.music.volume).toBe(0.123);
    // Live controls must still change the exact object read by the restored rules and map.
    n.tuning.treetopSpeed = 51;
    expect(n.game.tuning.treetopSpeed).toBe(51);
    expect(n.game.map.tuning).toBe(n.tuning);
  });

  it("makes a night from its spec: its seed, island and tuning, fresh flags, held in page.night", async () => {
    const page: Page = { night: null, build: "test", look: () => null };
    const n = await startNight(page, spec(4321, "home"));
    expect(page.night).toBe(n);
    expect(n.seed).toBe(4321);
    expect(n.game.seed).toBe(4321);
    expect(n.game.tuning).toBe(n.tuning);
    expect(n.tuning.map?.island).toBe("home");
    expect(n.flags).toEqual({ ready: false, landed: false, inBed: false, overRecorded: false, chartRecorded: false, castWanted: false, artRevealed: false, frame1: false, last: 0, attackTick: -1 });
    expect(n.arrival).toBeNull();
  });

  it("a second night gets fresh flags, its own game, tuning and playtest run, the log's hooks and the overlay carried", async () => {
    const page: Page = { night: null, build: "test", look: () => null };
    const a = await startNight(page, spec(11));
    a.flags.ready = a.flags.chartRecorded = a.flags.overRecorded = true;
    a.hud.debugOn = true;
    const hook = () => [];
    a.playtest.stalls = hook;
    const b = await startNight(page, { ...spec(22), how: "sail" });
    expect(page.night).toBe(b);
    expect(b.flags.ready || b.flags.chartRecorded || b.flags.overRecorded).toBe(false);
    expect(b.game).not.toBe(a.game);
    expect(b.tuning).not.toBe(a.tuning);
    expect(b.playtest).not.toBe(a.playtest);
    expect(b.game.seed).toBe(22);
    expect(b.playtest.stalls).toBe(hook);
    expect(b.hud.debugOn).toBe(true);
  });

  it("re-points the page's pieces at the new night, and never a second boot's night (the later ways come in place)", async () => {
    const told: unknown[] = [];
    const page: Page = { night: null, build: "test", look: () => null, freeze: { retarget: (_g: unknown, s: number) => told.push(["freeze", s]) } as never, shake: { retarget: () => told.push("shake") } as never };
    const a = await startNight(page, spec(5));
    expect(told).toEqual([["freeze", 5], "shake"]);
    const given: unknown[] = [];
    page.view = { setGameSliced: async (g: unknown) => { given.push(g); } } as never; // (startNight builds the new island a frame's budget at a time: View.setGameSliced)
    await expect(startNight(page, spec(6))).rejects.toThrow(/first only/);
    expect(page.night).toBe(a);
    let undone = 0;
    a.cleanups.push(() => undone++);
    a.tuning.partyObjects.generated = true; // (as the boot's styleFromLink sets it, main.ts)
    const b = await startNight(page, { ...spec(6), how: "debug" });
    expect(given).toEqual([b.game]); // (the view takes the new night's game)
    expect(b.tuning.partyObjects.generated).toBe(true); // (the page's switch, carried)
    expect(undone).toBe(1); // (the last night's listeners undone)
    expect(page.night).toBe(b);
    // (and every other way to a new night in place, the plan's PR 6: each its own game on the view)
    for (const [i, how] of (["bed", "bot", "sail"] as const).entries()) {
      endNight(page);
      const n = await startNight(page, { ...spec(60 + i), how });
      expect(page.night).toBe(n);
      expect(n.spec.how).toBe(how);
      expect(given.at(-1)).toBe(n.game);
    }
  });

  it("a sail after endNight: the ended night kept as page.last meanwhile, then carried on from (its sliders but its link's own), and let go", async () => {
    const page: Page = { night: null, build: "test", look: () => null };
    const a = await startNight(page, spec(41, "home"));
    const flash = DECISION_LIST.find(d => d.id === "legendFlash")!, grace = DECISION_LIST.find(d => d.id === "grace")!;
    setKnob(a.tuning, flash.apply.knob!, 0.123); setKnob(a.tuning, grace.apply.knob!, 0.9); // (two sliders moved on the pause page)
    endNight(page, true);
    expect(page.night).toBeNull();
    expect(page.last).toBe(a);
    expect(a.game.disposed).toBe(true);
    expect(() => stepGame(a.game, {} as never, 1 / 60)).toThrow(/ended/); // (?debug=sail: a reader left on the old night is caught)
    const b = await startNight(page, { ...spec(42), how: "sail", params: new URLSearchParams({ island: "home", seed: "42", creator: "0", d_grace: "0.3" }) });
    expect(page.night).toBe(b);
    expect(page.last).toBeUndefined();
    expect(knobAt(b.tuning, flash.apply.knob!)).toBe(0.123);
    expect(knobAt(b.tuning, grace.apply.knob!)).toBe(0.3);
    expect(b.game.disposed).toBeUndefined();
  });

  it("endNight undoes the night's listeners and lets it go", async () => {
    const page: Page = { night: null, build: "test", look: () => null };
    const n = await startNight(page, spec(7));
    let undone = 0;
    n.cleanups.push(() => undone++);
    endNight(page);
    expect(undone).toBe(1);
    expect(page.night).toBeNull();
  });
});

describe("window.witch (app/hooks.ts)", () => {
  it("reads the night on now: its game and tuning, and drives that one", async () => {
    const page: Page = { night: null, build: "test", look: () => null };
    const a = await startNight(page, spec(31));
    const night = () => ({ game: page.night!.game, tuning: page.night!.tuning, hud: page.night!.hud as Hud });
    installHooks({ night, view: {} as never, sound: {} as never, meter: {} as never, shake: {} as never, frameStats: {} as never, loadTimes: {}, loop: { manual: false, bot: null, botTag: null, ready: true } } as HookDeps);
    const W = (G.window as { witch: { game: unknown; tuning: unknown; hit: () => boolean } }).witch;
    expect(W.game).toBe(a.game);
    const b = await startNight(page, { ...spec(32), how: "bed" });
    expect(W.game).toBe(b.game);
    expect(W.tuning).toBe(b.tuning);
    const hp = b.game.witches[0].health.hp, hpA = a.game.witches[0].health.hp;
    W.hit();
    expect(b.game.witches[0].health.hp).toBeLessThan(hp);
    expect(a.game.witches[0].health.hp).toBe(hpA);
  });
});
