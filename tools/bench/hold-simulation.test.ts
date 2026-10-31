import { expect, it } from "vitest";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
const { holdSimulation, startingBoundary } = createRequire(import.meta.url)("./hold-simulation.cjs");
it("holds old paused and new direct-play loops synchronously before readiness, without blocking readiness or replacing the game", () => {
  for (const direct of [false, true]) {
    const window: Record<string, any> = {}, context = { window };
    runInNewContext(`(${holdSimulation.toString()})()`, context);
    let manual = false, ready = false;
    const game = { clock: { paused: true, time: 0 }, herTime: 0, acc: 0, alpha: 1, witch: { x: 3, z: 4, mode: "ground", seated: true }, party: { wave: 0 } };
    const hook = { get manual() { return manual; }, set manual(v: boolean) { manual = v; }, get ready() { return ready; }, game, view: { assets: { pending: 0 } } };
    window.witch = hook;
    expect(manual).toBe(true); expect(window.witch).toBe(hook);
    ready = true; if (direct) game.clock.paused = false;
    if (!direct) expect(runInNewContext(`(${startingBoundary.toString()})({ paused: true })`, context)).toMatchObject({ time: 0, paused: true });
    // A queued live frame between readiness and the test runner's next evaluation.
    if (!manual && !game.clock.paused) game.clock.time++;
    game.clock.paused = false; // old build's explicit Enter; idempotent on direct play.
    expect(runInNewContext(`(${startingBoundary.toString()})()`, context)).toMatchObject({ time: 0, herTime: 0, acc: 0, ready: true, manual: true });
    expect(game.clock.time).toBe(0);
    game.herTime = 1 / 60;
    expect(() => runInNewContext(`(${startingBoundary.toString()})()`, context)).toThrow(/zero-step boundary/);
    game.herTime = 0; hook.view.assets.pending = 1;
    expect(() => runInNewContext(`(${startingBoundary.toString()})()`, context)).toThrow(/zero-step boundary/);
  }
});
