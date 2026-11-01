import { afterEach, expect, it, vi } from "vitest";
import { newGame, newWitchPlayer, stepGame, type Controls, type Game } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { snapshotGame } from "../../rules/nightSnapshot";
import { attachGuest, detachGuest } from "./membership";
import { onlineSession, type SessionConnection, type SessionOptions } from "./session";
import { BAGS } from "../../rules/bags";
import { beatAt, shiftBeat } from "../../rules/beat";
import { localView } from "./localView";
import { WITCH_GENOME } from "../../../art/witchGenome.js";
import { appearance } from "./appearance";
import { stationLook } from "./stationAppearance";
import { SHELVES, wear } from "../../rules/wardrobe";
import { startWake } from "../../rules/wakeUp";
import { deckOf } from "../../rules/treehouse";
import { RECORDS } from "../../rules/records";
import { stationAuthority } from "./stationAuthority";
import { bpmAt } from "../../rules/beat";
import { ITEMS } from "../../rules/wardrobe";
import { fillNightTrunk } from "../../app/nightFindBoundary";

const cleanups: (() => void)[] = [];
afterEach(() => { for (const stop of cleanups.splice(0)) stop(); });
const input = (moveX = 0): Controls => ({ moveX, moveZ: 0, zoom: 0, toggleMode: false, autoTalk: false });
const turn = () => new Promise<void>(resolve => setTimeout(resolve, 0));
it("resolves bounded guest choices by sequence, including rejection, and refuses stale results", async () => {
  const f = fixture(), resolved = vi.fn(); f.guestOptions.stationResolved = resolved;
  const { joined } = await f.start(); await f.sync(); await joined;
  const choice = { kind: "bag" as const, id: BAGS[0].id }, before = f.guestMessages.length;
  for (let i = 0; i < 8; i++) expect(f.guest.choose(choice)).toBe(true);
  expect(f.guest.choose(choice)).toBe(false);
  for (const message of f.guestMessages.slice(before)) f.host.message(message);
  let index = f.hostMessages.length; f.host.step(input(), .02);
  const rejected = f.hostMessages.slice(index);
  expect((rejected[0].payload as { results: unknown[] }).results).toEqual(Array.from({ length: 8 }, (_, sequence) => ({ sequence, accepted: false })));
  for (const message of rejected) f.guest.message(message);
  expect(resolved).toHaveBeenCalledTimes(8); expect(resolved).toHaveBeenLastCalledWith(1, choice, false);
  f.hostOptions.authorizeStation = () => true;
  expect(f.guest.choose(choice)).toBe(true); f.host.message(f.guestMessages.at(-1)!); index = f.hostMessages.length;
  f.host.step(input(), .02); const approved = f.hostMessages.slice(index);
  for (const message of approved) f.guest.message(message);
  expect(resolved).toHaveBeenLastCalledWith(1, choice, true); expect(f.guest.game!.witches[1].spells.bag).toBe(choice.id);
  expect(snapshotGame(f.guest.game!)).toEqual(snapshotGame(f.hostGame));
  f.guest.message({ type: "state", player: 0, payload: { kind: "station", tick: f.guest.tick, choices: [], results: [{ sequence: 0, accepted: false }] } });
  expect(f.guestOptions.failed).toHaveBeenCalledWith(expect.objectContaining({ message: "Invalid station results" })); expect(resolved).toHaveBeenCalledTimes(9);
});
it("uses only host catalogue metadata, publishes changes in order and keeps display IDs separate from authority", async () => {
  const f = fixture(), seen = vi.fn(), catalogue = { wardrobe: [ITEMS[0].id], parts: [], hats: [], records: [RECORDS[0].id] };
  f.hostOptions.catalogue = () => catalogue;
  f.guestOptions.catalogue = vi.fn(() => { throw new Error("Visitor inventory must not be read"); });
  f.guestOptions.catalogueApplied = seen;
  const { joined } = await f.start(); await f.sync(); await joined;
  expect(f.guestOptions.catalogue).not.toHaveBeenCalled(); expect(f.guest.catalogue).toEqual(catalogue);
  f.guest.catalogue!.wardrobe.length = 0; expect(f.guest.catalogue!.wardrobe).toEqual(catalogue.wardrobe);
  f.host.message({ type: "input", player: 1, payload: { kind: "catalogue", catalogue: { ...catalogue, records: [RECORDS[1].id] } } });
  catalogue.records = [RECORDS[1].id]; let index = f.hostMessages.length; f.host.step(input(), .02);
  const updates = f.hostMessages.slice(index);
  expect(updates.map(m => (m.payload as { kind: string }).kind)).toEqual(["catalogue", "frame"]);
  for (const message of updates) f.guest.message(message);
  expect(f.guest.catalogue).toEqual(catalogue); expect(seen).toHaveBeenLastCalledWith(catalogue);
  // Display metadata alone cannot authorize any station request.
  f.guest.choose({ kind: "bag", id: BAGS[0].id }); f.host.message(f.guestMessages.at(-1)!);
  index = f.hostMessages.length; f.host.step(input(), .02);
  expect(f.hostMessages.slice(index).filter(m => (m.payload as { kind: string }).kind === "station").map(m => (m.payload as { choices: unknown[] }).choices)).toEqual([[]]);
  for (const message of f.hostMessages.slice(index)) f.guest.message(message);
  f.guest.message({ type: "state", player: 0, payload: { kind: "catalogue", tick: f.guest.tick, catalogue: { ...catalogue, wardrobe: ["invented"] } } });
  expect(f.guestOptions.failed).toHaveBeenCalledWith(expect.objectContaining({ message: "Invalid shared station catalogue." }));
  expect(f.guest.catalogue).toBeNull();
});
it("starts a visitor's approved record on both peers before the next frame", async () => {
  const f = fixture(), attach = f.hostOptions.attach, records = new Set<string>(), record = RECORDS[0];
  f.hostOptions.attach = game => {
    attach(game); game.party.spellAt = null; const guest = game.witches[1];
    expect(startWake(game, 0, {}, guest)).toBe(true); guest.wake!.open = true;
    Object.assign(guest.body, deckOf(game.map, game.tuning)!.seat, { perch: true, mode: "ground", seated: false });
  };
  f.hostOptions.authorizeStation = stationAuthority(() => ({ bags: new Set(), hats: new Set(), parts: new Set(), records }));
  const { joined } = await f.start(); await f.sync(); await joined;
  const choice = { kind: "party" as const, id: record.id };
  f.guest.choose(choice); f.host.message(f.guestMessages.at(-1)!);
  let index = f.hostMessages.length; f.host.step(input(), .02);
  for (const message of f.hostMessages.slice(index)) f.guest.message(message);
  expect(f.hostGame.party.spellAt).toBeNull(); records.add(record.id);
  f.guest.choose(choice); f.host.message(f.guestMessages.at(-1)!); index = f.hostMessages.length;
  expect(f.guest.game!.party.spellAt).toBeNull(); f.host.step(input(), .02);
  const updates = f.hostMessages.slice(index);
  expect(updates.map(m => (m.payload as { kind: string }).kind)).toEqual(["station", "frame"]);
  for (const message of updates) f.guest.message(message);
  expect(bpmAt(f.guest.game!.beat, f.guest.game!.clock.time)).toBe(record.bpm);
  expect(snapshotGame(f.guest.game!)).toEqual(snapshotGame(f.hostGame));
  expect(f.hostOptions.failed).not.toHaveBeenCalled(); expect(f.guestOptions.failed).not.toHaveBeenCalled();
});
it("replicates only host-owned approved wardrobe changes before the next frame", async () => {
  const f = fixture(), hostSeen = vi.fn(), guestSeen = vi.fn();
  f.hostOptions.appearance = f.guestOptions.appearance = () => WITCH_GENOME;
  f.hostOptions.appearanceApplied = hostSeen; f.guestOptions.appearanceApplied = guestSeen;
  f.hostOptions.authorizeStation = () => true;
  const owned = new Set<string>(); f.hostOptions.wardrobe = () => owned;
  const { joined } = await f.start(); await f.sync(); await joined;
  hostSeen.mockClear(); guestSeen.mockClear();
  const item = SHELVES.cloak.items.find(i => i.set.cloak === "long")!;
  const choice = stationLook("cloakPegs", wear(appearance(WITCH_GENOME)!, item))!;
  const request = () => { expect(f.guest.choose(choice)).toBe(true); f.host.message(f.guestMessages.at(-1)!); };
  request(); let index = f.hostMessages.length; f.host.step(input(), .02);
  for (const message of f.hostMessages.slice(index)) f.guest.message(message);
  expect(hostSeen).not.toHaveBeenCalled(); expect(guestSeen).not.toHaveBeenCalled();
  owned.add(item.id); request(); index = f.hostMessages.length;
  expect(guestSeen).not.toHaveBeenCalled(); f.host.step(input(), .02);
  const updates = f.hostMessages.slice(index);
  expect(updates.map(m => (m.payload as { kind: string }).kind)).toEqual(["station", "frame"]);
  for (const message of updates) f.guest.message(message);
  expect(hostSeen).toHaveBeenCalledExactlyOnceWith(1, expect.objectContaining({ cloak: "long" }));
  expect(guestSeen).toHaveBeenCalledExactlyOnceWith(1, expect.objectContaining({ cloak: "long" }));
  expect(snapshotGame(f.guest.game!)).toEqual(snapshotGame(f.hostGame));
  expect(f.hostOptions.failed).not.toHaveBeenCalled(); expect(f.guestOptions.failed).not.toHaveBeenCalled();
  const bag = BAGS[0]; owned.add(bag.id);
  const bagChoice = stationLook("bags", wear(appearance(WITCH_GENOME)!, bag))!;
  expect(f.guest.choose(bagChoice)).toBe(true); f.host.message(f.guestMessages.at(-1)!);
  index = f.hostMessages.length; f.host.step(input(), .02);
  for (const message of f.hostMessages.slice(index)) f.guest.message(message);
  expect(f.hostGame.witches[1].spells.bag).toBe(bag.id); expect(f.guest.game!.witches[1].spells.bag).toBe(bag.id);
  expect(hostSeen).toHaveBeenLastCalledWith(1, wear({ ...appearance(WITCH_GENOME)!, cloak: "long" }, bag));
  expect(snapshotGame(f.guest.game!)).toEqual(snapshotGame(f.hostGame));
});
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
    for (const message of guestMessages) if ((message.payload as { kind?: string } | undefined)?.kind === "appearance") host.message(message);
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
it("pauses only with both pause pages open and resumes when either leaves", async () => {
  const f = fixture(), { joined } = await f.start(); await f.sync(); await joined;
  const frame = (hostPause: boolean | undefined, guestPause: boolean | undefined) => {
    f.guest.step({ ...input(), ...(guestPause === undefined ? {} : { pausePage: guestPause }) }, .05);
    f.host.message(f.guestMessages.at(-1)!);
    f.host.step({ ...input(), ...(hostPause === undefined ? {} : { pausePage: hostPause }) }, .05);
    f.guest.message(f.hostMessages.at(-1)!);
    expect(f.guest.game!.clock.paused).toBe(f.hostGame.clock.paused);
    expect(f.guest.game!.clock.time).toBe(f.hostGame.clock.time);
  };
  const before = f.hostGame.clock.time;
  f.hostGame.clock.paused = true; // A local menu must not become a shared pause vote.
  frame(undefined, undefined); expect(f.hostGame.clock.paused).toBe(false);
  frame(true, false); expect(f.hostGame.clock.paused).toBe(false); expect(f.hostGame.clock.time).toBeGreaterThan(before);
  const running = f.hostGame.clock.time;
  frame(true, true); expect(f.hostGame.clock.paused).toBe(true); expect(f.hostGame.clock.time).toBe(running);
  frame(true, false); expect(f.hostGame.clock.paused).toBe(false); expect(f.hostGame.clock.time).toBeGreaterThan(running);
  frame(true, true); const paused = f.hostGame.clock.time;
  frame(false, true); expect(f.hostGame.clock.paused).toBe(false); expect(f.hostGame.clock.time).toBeGreaterThan(paused);
  frame(true, true);
  frame(undefined, undefined); expect(f.hostGame.clock.paused).toBe(false);
  expect(f.hostGame.witches.every(w => !w.paused)).toBe(true);
  frame(true, true); const expiredAt = f.hostGame.clock.time;
  f.advanceTime(251); f.host.step({ ...input(), pausePage: true }, .05); f.guest.message(f.hostMessages.at(-1)!);
  expect(f.hostGame.clock.paused).toBe(false); expect(f.hostGame.clock.time).toBeGreaterThan(expiredAt);
  expect(f.guest.game!.clock.paused).toBe(false);
});
it("exchanges validated personal looks before guest preparation and forbids appearance replacement", async () => {
  const f = fixture(), seen: unknown[] = [];
  f.hostOptions.appearance = () => WITCH_GENOME;
  const own = structuredClone(WITCH_GENOME); own.hair = "bob";
  f.guestOptions.appearance = () => own;
  f.guestOptions.appearanceApplied = (player, look) => seen.push([player, look]);
  const { joined } = await f.start(); await f.sync(); await joined;
  expect(seen).toEqual([[0, WITCH_GENOME]]);
  const beforeSpells = structuredClone(f.hostGame.witches[0].spells);
  f.host.message({ type: "input", player: 1, payload: { kind: "appearance", genome: { ...own, hair: "long" } } });
  expect(f.hostOptions.failed).toHaveBeenCalledWith(expect.objectContaining({ message: "Guest appearance changed outside station approval." }));
  expect(f.hostGame.witches).toHaveLength(1); // Clean departure, no guest-supplied replacement game.
  expect(f.hostGame.witches[0].spells).toEqual(beforeSpells);
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

it("coalesces page mutations before the next frame and preserves the guest game identity", async () => {
  const f = fixture(), { joined } = await f.start(); await f.sync(); await joined;
  const guestGame = f.guest.game!, before = f.hostMessages.length;
  // A page-owned host find is copied at the same ordered checkpoint, not independently redrawn by the visitor.
  f.hostGame.trunk = { x: f.hostGame.map.treehouse.x, z: f.hostGame.map.treehouse.z, cell: [0, 0], kind: "wearable", item: null, found: false };
  fillNightTrunk(f.hostGame, "host", () => ({}), () => f.host.changed());
  f.hostGame.witches[1].body.x += 3; f.host.changed(); f.host.changed(); f.guest.changed();
  expect(f.hostMessages).toHaveLength(before);
  f.host.step(input(), .02);
  const updates = f.hostMessages.slice(before);
  expect(updates.map(m => (m.payload as { kind: string }).kind)).toEqual(["checkpoint", "frame"]);
  for (const message of updates) f.guest.message(message);
  expect(f.guest.game).toBe(guestGame); expect(snapshotGame(guestGame)).toEqual(snapshotGame(f.hostGame));
  expect(guestGame.trunk).toEqual(f.hostGame.trunk); expect(guestGame.trunk?.item).toBeTruthy();
  const next = f.hostMessages.length; f.host.step(input(), .02);
  expect(f.hostMessages.slice(next).map(m => (m.payload as { kind: string }).kind)).toEqual(["frame"]);
  f.guest.message(updates[0]); expect(f.guestOptions.failed).toHaveBeenCalledTimes(1); // stale checkpoint cannot roll back a tick
});

it("keeps a visitor's station request inert until host approval and applies it to player1 only", async () => {
  const f = fixture(), { joined } = await f.start(); await f.sync(); await joined;
  const choice = { kind: "bag" as const, id: BAGS[0].id }, before = snapshotGame(f.guest.game!), hostBag = f.hostGame.witches[0].spells.bag;
  expect(f.guest.choose(choice)).toBe(true); expect(snapshotGame(f.guest.game!)).toEqual(before);
  const unapproved = f.guestMessages.at(-1)!; f.host.message(unapproved);
  let index = f.hostMessages.length; f.host.step(input(), .02);
  expect(f.hostMessages.slice(index).filter(m => (m.payload as { kind: string }).kind === "station").map(m => (m.payload as { choices: unknown[] }).choices)).toEqual([[]]);
  for (const message of f.hostMessages.slice(index)) f.guest.message(message);
  f.hostOptions.authorizeStation = vi.fn((_game, player) => player === 1);
  f.hostOptions.stationApplied = vi.fn(); f.guestOptions.stationApplied = vi.fn();
  f.guest.choose(choice); const request = f.guestMessages.at(-1)!;
  f.host.message({ ...request, player: 0 }); // payload cannot pick a different player through the server-bound identity
  f.host.message(request); f.host.message(request); // duplicate request is not queued twice
  index = f.hostMessages.length; f.host.step(input(), .02);
  const updates = f.hostMessages.slice(index);
  expect(updates.map(m => (m.payload as { kind: string }).kind)).toEqual(["station", "frame"]);
  for (const message of updates) f.guest.message(message);
  expect(f.hostOptions.authorizeStation).toHaveBeenCalledTimes(1);
  expect(f.hostOptions.stationApplied).toHaveBeenCalledTimes(1); expect(f.guestOptions.stationApplied).toHaveBeenCalledTimes(1);
  expect(f.hostGame.witches[1].spells.bag).toBe(choice.id); expect(f.hostGame.witches[0].spells.bag).toBe(hostBag);
  expect(snapshotGame(f.guest.game!)).toEqual(snapshotGame(f.hostGame));
});

it("carries the host audio-stall beat anchor into the guest view before advancing the next frame", async () => {
  const f = fixture(), { joined } = await f.start(); await f.sync(); await joined;
  const view = localView(f.guest.game!, 1), before = f.hostMessages.length;
  shiftBeat(f.hostGame.beat, f.hostGame.clock.time, 1.5); f.host.step(input(), .02);
  const updates = f.hostMessages.slice(before);
  expect(updates.map(m => (m.payload as { kind: string }).kind)).toEqual(["beat", "frame"]);
  for (const message of updates) f.guest.message(message);
  expect(view.update(0).beat).toEqual(f.hostGame.beat);
  expect(beatAt(view.game.beat, f.hostGame.clock.time)).toBe(beatAt(f.hostGame.beat, f.hostGame.clock.time));
  expect(snapshotGame(f.guest.game!)).toEqual(snapshotGame(f.hostGame));
});
