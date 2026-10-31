import { afterEach, expect, it, vi } from "vitest";
import { newGame, newWitchPlayer, stepGame, type Controls, type Game } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { snapshotGame } from "../../rules/nightSnapshot";
import { attachGuest, detachGuest } from "./membership";
import { onlineSession, type SessionConnection, type SessionOptions } from "./session";

const cleanups: (() => void)[] = [];
afterEach(() => { for (const stop of cleanups.splice(0)) stop(); });
const input = (moveX = 0): Controls => ({ moveX, moveZ: 0, zoom: 0, toggleMode: false, autoTalk: false });
const turn = () => new Promise<void>(resolve => setTimeout(resolve, 0));
function fixture() {
  // Four areas supply the existing test-only bedroom geometry; distant area count does not affect session replication.
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const hostGame = newGame(123, tuning);
  let time = 1000;
  const hostMessages: Record<string, unknown>[] = [], guestMessages: Record<string, unknown>[] = [];
  const connection = (messages: Record<string, unknown>[]): SessionConnection => ({
    sendInput: payload => { messages.push({ type: "input", player: 1, payload }); return true; },
    sendState: payload => { messages.push({ type: "state", player: 0, payload }); return true; },
    sendReady: () => { messages.push({ type: "ready" }); return true; },
    sendProgress: sequence => { messages.push({ type: "progress", sequence }); return true; },
    sendActive: () => { messages.push({ type: "active" }); return true; },
  });
  const options = (): SessionOptions => ({ build: "test", hostGame: () => hostGame,
    attach: game => attachGuest(game, newWitchPlayer(1, 0, 0, tuning)), detach: vi.fn(detachGuest),
    prepareGuest: vi.fn(async () => {}), synchronized: vi.fn(), ended: vi.fn(), failed: vi.fn(), now: () => time,
  });
  const hostOptions = options(), guestOptions = options();
  hostOptions.advanceHost = vi.fn((g: Game, controls: readonly Controls[], dt: number) => stepGame(g, controls, dt));
  const host = onlineSession(hostOptions), guest = onlineSession(guestOptions), hostAbort = new AbortController(), guestAbort = new AbortController();
  cleanups.push(host.disconnect, guest.disconnect);
  const start = async () => {
    await host.connect("host", connection(hostMessages), hostAbort.signal);
    const joined = guest.connect("guest", connection(guestMessages), guestAbort.signal);
    host.message({ type: "guest-joined", player: 1 });
    const first = hostMessages.find(m => m.type === "state")!;
    guest.message(first); return { joined, first };
  };
  const sync = async () => {
    await turn(); expect(guestMessages.some(m => m.type === "ready")).toBe(true);
    host.message({ type: "guest-ready", player: 1 }); guest.message(hostMessages.at(-1)!);
  };
  return { host, guest, hostGame, hostOptions, guestOptions, hostMessages, guestMessages, hostAbort, guestAbort, start, sync, advanceTime: (ms: number) => { time += ms; } };
}
it("rebases after loading and advances the existing host only once through its recording callback", async () => {
  const f = fixture(), { joined } = await f.start();
  f.host.step(input(1), .05); expect(f.guest.ready).toBe(false);
  await f.sync(); await joined;
  expect(snapshotGame(f.guest.game!)).toEqual(snapshotGame(f.hostGame));
  const before = snapshotGame(f.hostGame);
  expect(f.guest.step(input(-1), .05)).toBe(true); expect(snapshotGame(f.guest.game!)).toEqual(before);
  f.host.message(f.guestMessages.at(-1)!);
  f.host.step(input(1), .05); f.guest.message(f.hostMessages.at(-1)!);
  expect(f.hostOptions.advanceHost).toHaveBeenCalledTimes(2);
  expect(snapshotGame(f.guest.game!)).toEqual(snapshotGame(f.hostGame));
  expect(f.guestOptions.synchronized).toHaveBeenCalledTimes(1);
});
it("does not accept an unassigned player's input and expires a guest's held controls", async () => {
  const f = fixture(), { joined } = await f.start(); await f.sync(); await joined;
  f.host.message({ type: "input", player: 0, payload: { sequence: 999, controls: input(-1) } });
  f.host.step(input(), .02);
  expect((f.hostMessages.at(-1)!.payload as { frame: { inputs: Controls[] } }).frame.inputs[1].moveX).toBe(0);
  f.guest.step(input(1), .02); f.host.message(f.guestMessages.at(-1)!); f.host.step(input(), .02);
  expect((f.hostMessages.at(-1)!.payload as { frame: { inputs: Controls[] } }).frame.inputs[1].moveX).toBe(1);
  f.advanceTime(251); f.host.step(input(), .02);
  expect((f.hostMessages.at(-1)!.payload as { frame: { inputs: Controls[] } }).frame.inputs[1].moveX).toBe(0);
});
it("cancels late guest preparation without sending ready or adopting a returned night", async () => {
  const f = fixture(); let finish!: () => void, signal!: AbortSignal;
  f.guestOptions.prepareGuest = async (_g, s) => { signal = s; await new Promise<void>(resolve => { finish = resolve; }); };
  const { joined } = await f.start(); const cancelled = expect(joined).rejects.toThrow("ended");
  await turn(); f.guestAbort.abort(); await cancelled; expect(signal.aborted).toBe(true);
  finish(); await turn();
  expect(f.guestMessages.some(m => m.type === "ready")).toBe(false);
  expect(f.guestOptions.synchronized).not.toHaveBeenCalled(); expect(f.guestOptions.failed).not.toHaveBeenCalled();
  expect(f.guestOptions.ended).toHaveBeenCalledTimes(1);
});
it("fails an out-of-order frame and detaches the host guest once on departure/night replacement", async () => {
  const f = fixture(), { joined } = await f.start(); await f.sync(); await joined;
  f.guest.message({ type: "state", player: 0, payload: { kind: "frame", frame: { tick: 99, dt: .02, inputs: [input(), input()] } } });
  expect(f.guestOptions.failed).toHaveBeenCalledTimes(1); expect(f.guest.role).toBeNull();
  f.host.message({ type: "guest-left", player: 1 }); f.host.nightChanged(); f.host.disconnect();
  expect(f.hostOptions.detach).toHaveBeenCalledTimes(1); expect(f.hostOptions.ended).toHaveBeenCalledTimes(1);
  expect(f.hostGame.witches).toHaveLength(1); expect(f.host.step(input(), .02)).toBe(false);
});
it("rejects an incompatible build before preparing a guest View or sending controls", async () => {
  const f = fixture(); f.guestOptions.build = "other";
  const { joined } = await f.start(); await expect(joined).rejects.toThrow("ended");
  expect(f.guestOptions.prepareGuest).not.toHaveBeenCalled(); expect(f.guestOptions.failed).toHaveBeenCalledTimes(1);
  expect(f.guestMessages).toHaveLength(0); expect(f.guest.role).toBeNull();
});
