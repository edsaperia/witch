import { afterEach, expect, it, vi } from "vitest";
import { newGame, newWitchPlayer, STEP, stepGame, type Controls, type Game } from "../../rules/game";
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
import { startWake, startWakeFor } from "../../rules/wakeUp";
import { deckOf } from "../../rules/treehouse";
import { RECORDS } from "../../rules/records";
import { stationAuthority } from "./stationAuthority";
import { bpmAt } from "../../rules/beat";
import { ITEMS } from "../../rules/wardrobe";
import { fillNightTrunk } from "../../app/nightFindBoundary";
import { bareBroom, PARTS } from "../../rules/broomParts";
import { HAT_SPELLS } from "../../rules/spells";
import { HOUSE_ROOMS, installEdLayout, objectFront, roomAt } from "../../rules/houseRooms";
import type { StationChoice } from "./stationChoice";
import { continueSharedNight } from "../../app/sharedNight";

const cleanups: (() => void)[] = [];
afterEach(() => { for (const stop of cleanups.splice(0)) stop(); });
const input = (moveX = 0): Controls => ({ moveX, moveZ: 0, zoom: 0, toggleMode: false, autoTalk: false });
const turn = () => new Promise<void>(resolve => setTimeout(resolve, 0));
it("resets a guest bed hold when E is released on a real guest quantum", async () => {
  const f=fixture(),{joined}=await f.start();await f.sync();await joined;
  const guest=f.hostGame.witches[1],bed=HOUSE_ROOMS.objects.find(o=>o.id==="bedroom2Bed")!;
  startWakeFor(f.hostGame,guest.time??f.hostGame.herTime,{yesterday:true},guest,{player:1,room:"bedroom2"});
  guest.wake!.open=true;guest.wake!.beat="up";
  Object.assign(guest.body,objectFront(bed,f.hostGame.map.treehouse,.1),{perch:true,mode:"ground",seated:false});
  for(let sequence=0;sequence<12;sequence++){
    f.advanceTime(16);f.host.message({type:"input",player:1,payload:{sequence,controls:{...input(),sigilHeld:true}}});f.host.step(input(),.1);
  }
  expect(guest.house?.bedFrom).toBeDefined();expect(guest.house?.slept).not.toBe(true);
  f.advanceTime(16);f.host.message({type:"input",player:1,payload:{sequence:12,controls:{...input(),sigilHeld:false}}});f.host.step(input(),.1);
  expect(guest.house?.bedFrom).toBeUndefined();expect(guest.house?.slept).not.toBe(true);
});
it.each([1/60,.1])("keeps an undressed guest bed hold with host frame duration %s", async dt => {
  const f=fixture(),{joined}=await f.start();await f.sync();await joined;
  const guest=f.hostGame.witches[1],bed=HOUSE_ROOMS.objects.find(o=>o.id==="bedroom2Bed")!;
  startWakeFor(f.hostGame,guest.time??f.hostGame.herTime,{yesterday:true},guest,{player:1,room:"bedroom2"});
  guest.wake!.open=true;guest.wake!.beat="up"; // The captured guest was awake and still had her clothes pile.
  Object.assign(guest.body,objectFront(bed,f.hostGame.map.treehouse,.1),{perch:true,mode:"ground",seated:false});
  for(let sequence=0;sequence<180&&!guest.house?.slept;sequence++){
    f.advanceTime(16);
    f.host.message({type:"input",player:1,payload:{sequence,controls:{...input(),sigilHeld:true}}});
    f.host.step(input(),dt); // The slower host frame adds catch-up quanta without a new guest input.
  }
  expect(guest.wake!.pile!.length).toBeGreaterThan(0);
  expect(guest.house?.slept).toBe(true);
  expect(f.hostGame.witches[0].house?.slept).not.toBe(true);
});
it.each(["host frames", "guest quanta"] as const)("keeps a guest walking indoors to bedroom2Wardrobe on the floor when the relay holds her %s past the prediction cap", async held => {
  // T5B run 4: three pending-cap snaps, then the guest flying at treetop speed far east of the treehouse.
  installEdLayout(true); cleanups.push(() => installEdLayout(false)); // The ordinary page's house: tuning noWalls makes every floor edge a take-off.
  const f = fixture(), { joined } = await f.start();
  const host = f.hostGame, guest = host.witches[1], at = host.map.treehouse;
  startWakeFor(host, guest.time ?? host.herTime, { yesterday: true }, guest, { player: 1, room: "bedroom2" });
  guest.wake!.open = true; guest.wake!.beat = "up"; Object.assign(guest.body, { perch: true, mode: "ground", seated: false, vx: 0, vz: 0 });
  await f.sync(); await joined;
  const target = objectFront(HOUSE_ROOMS.objects.find(o => o.id === "bedroom2Wardrobe")!, at, .6); // telephoneProof's front
  // The driver steers the guest's own predicted witch, which is what the guest page shows and reports.
  const drive = (): Controls => {
    const b = f.guest.predicted!.body, dx = target.x - b.x, dz = target.z - b.z;
    return Math.hypot(dx, dz) < .6 ? input() : { ...input(), moveX: Math.max(-1, Math.min(1, dx)), moveZ: Math.max(-1, Math.min(1, dz)) };
  };
  // One relay stall of 2.8 s in one direction while the walk is under way; nothing is lost, only delayed.
  const stall = { from: 30, to: 198 }, up: { at: number; message: Record<string, unknown> }[] = [], down: typeof up = [];
  const deliver = (frame: number) => frame >= stall.from && frame < stall.to ? stall.to : frame;
  let sent = f.guestMessages.length, received = f.hostMessages.length, left = 0;
  for (let frame = 0; frame < 360; frame++) {
    f.advanceTime(STEP * 1000);
    while (down[0] && down[0].at <= frame) f.guest.message(down.shift()!.message);
    f.guest.step(frame < 36 ? input() : drive(), STEP);
    for (const message of f.guestMessages.slice(sent)) up.push({ at: held === "guest quanta" ? deliver(frame) : frame, message });
    sent = f.guestMessages.length;
    while (up[0] && up[0].at <= frame) f.host.message(up.shift()!.message);
    f.host.step(input(), STEP);
    for (const message of f.hostMessages.slice(received)) down.push({ at: held === "host frames" ? deliver(frame) : frame, message });
    received = f.hostMessages.length;
    if (!guest.body.perch || guest.body.mode !== "ground") left++;
  }
  expect(f.hostOptions.failed).not.toHaveBeenCalled(); expect(f.guestOptions.failed).not.toHaveBeenCalled();
  const b = guest.body;
  expect({ framesOffTheFloor: left, perch: !!b.perch, mode: b.mode, room: roomAt(at, b.x, b.z)?.id ?? null }).toEqual({ framesOffTheFloor: 0, perch: true, mode: "ground", room: "bedroom2" });
  expect(Math.hypot(b.x - target.x, b.z - target.z)).toBeLessThan(1);
  expect(Math.hypot(f.guest.predicted!.body.x - b.x, f.guest.predicted!.body.z - b.z)).toBeLessThan(.05);
  expect(f.guest.predictionStats!.pendingCapSnaps).toBe(0); expect(f.host.inputStats!.discarded).toBe(0);
});
it("keeps the guest visit when a failed send synchronously reports transport-away", async () => {
  const f = fixture(); const { joined } = await f.start(); await f.sync(); await joined;
  const game = f.guest.game;
  f.guestConnection.sendInput = () => { f.guest.message({ type: "transport-away" }); return false; };
  f.guest.step(input(1), 1/60);
  expect(f.guestOptions.failed).not.toHaveBeenCalled();
  expect(f.guestOptions.ended).not.toHaveBeenCalled();
  expect(f.guest.game).toBe(game); expect(f.guest.ready).toBe(false);
});
it("recovers a station approval missed at disconnect only through the authenticated resume checkpoint",async()=>{
  const f=fixture(),seen=vi.fn(),resolved=vi.fn();
  f.hostOptions.appearance=f.guestOptions.appearance=()=>WITCH_GENOME;
  f.guestOptions.appearanceApplied=seen;f.guestOptions.stationResolved=resolved;f.hostOptions.authorizeStation=()=>true;
  const item=SHELVES.cloak.items.find(i=>i.set.cloak==="long")!;
  f.hostOptions.wardrobe=()=>new Set([item.id]);
  const {joined}=await f.start();await f.sync();await joined;seen.mockClear();
  const choice=stationLook("cloakPegs",wear(appearance(WITCH_GENOME)!,item))!;
  expect(f.guest.choose(choice)).toBe(true);f.host.message(f.guestMessages.at(-1)!);f.host.step(input(),.02);
  // The host accepted the request, but its station/frame messages never reached this guest.
  f.guest.message({type:"transport-away"});f.host.message({type:"peer-away"});
  expect(resolved).toHaveBeenLastCalledWith(1,choice,false);
  const at=f.hostMessages.length;f.guest.message({type:"transport-resumed"});f.host.message({type:"peer-resumed"});
  for(const m of f.hostMessages.slice(at))f.guest.message(m);
  expect(seen).toHaveBeenCalledWith(1,expect.objectContaining({cloak:"long"}));
  expect(f.guest.ready).toBe(true);expect(f.guestOptions.failed).not.toHaveBeenCalled();
  expect(snapshotGame(f.guest.game!)).toEqual(snapshotGame(f.hostGame));
});
it.each(["host", "guest"] as const)("resynchronizes the same room actors after %s transport replacement without another visit/save boundary", async lostRole => {
  const f=fixture(); f.hostOptions.attach=vi.fn(f.hostOptions.attach);
  const {joined}=await f.start();await f.sync();await joined;
  const guestGame=f.guest.game!, ids=f.hostGame.witches.map(w=>w.id), prepared=vi.mocked(f.guestOptions.prepareGuest).mock.calls.length;
  const attached=vi.mocked(f.hostOptions.attach).mock.calls.length;
  f.guest.step(input(1),1/60);
  f.host.message({type:lostRole==="host"?"transport-away":"peer-away"});
  f.guest.message({type:lostRole==="guest"?"transport-away":"peer-away"});
  expect(f.host.ready).toBe(false);expect(f.guest.ready).toBe(false);
  f.hostGame.clock.paused=false;
  f.host.step(input(),1/60);
  const start=f.hostMessages.length;
  f.host.message({type:lostRole==="host"?"transport-resumed":"peer-resumed"});
  f.guest.message({type:lostRole==="guest"?"transport-resumed":"peer-resumed"});
  for(const m of f.hostMessages.slice(start))f.guest.message(m);
  expect(f.guest.game).toBe(guestGame);expect(f.hostGame.witches.map(w=>w.id)).toEqual(ids);
  expect(snapshotGame(guestGame)).toEqual(snapshotGame(f.hostGame));
  expect(f.guest.ready).toBe(true);expect(f.guest.predictionStats!.pending).toBe(0);
  expect(vi.mocked(f.guestOptions.prepareGuest).mock.calls).toHaveLength(prepared);
  expect(vi.mocked(f.hostOptions.attach).mock.calls).toHaveLength(attached);
  expect(f.hostOptions.ended).not.toHaveBeenCalled();expect(f.guestOptions.ended).not.toHaveBeenCalled();
  expect(f.guestOptions.failed).not.toHaveBeenCalled();expect(f.hostOptions.failed).not.toHaveBeenCalled();
  const frameAt=f.hostMessages.length;f.guest.step(input(),1/60);f.host.message(f.guestMessages.at(-1)!);f.host.step(input(),1/60);
  for(const m of f.hostMessages.slice(frameAt))f.guest.message(m);
  expect(snapshotGame(guestGame)).toEqual(snapshotGame(f.hostGame));
});
it("latches session counters before teardown even if the private diagnostic sink throws", async () => {
  const f = fixture();
  f.hostOptions.lifecycleEvidence = () => { throw new Error("Broken private sink"); };
  const { joined } = await f.start(); await f.sync(); await joined;
  const before = structuredClone(f.host.inputStats);
  f.host.nightChanged();
  expect(f.host.role).toBeNull(); expect(f.host.inputStats).toBeNull();
  expect(f.host.sessionEnd).toMatchObject({ stage: "session-end", role: "host", reason: "night-changed", inputs: before });
  const end = f.host.sessionEnd;
  f.host.disconnect(); expect(f.host.sessionEnd).toEqual(end);
});
it("emits guest fixed quanta and acknowledges each consumed host step instead of the newest packet", async () => {
  const f = fixture(),timing=vi.fn();f.guestOptions.protocolEvidence=timing;
  const { joined } = await f.start();
  f.hostGame.clock.paused = false; Object.assign(f.hostGame.witches[1].body, { seated: false, perch: false });
  delete f.hostGame.witches[1].wake; delete f.hostGame.witches[1].kit;
  await f.sync(); await joined;
  const before = f.guestMessages.length;
  f.guest.step({ ...input(1), dash: true }, 3 / 60);
  const packets = f.guestMessages.slice(before);
  expect(packets.map(m => (m.payload as { sequence: number }).sequence)).toEqual([0, 1, 2]);
  expect(packets.map(m => (m.payload as { controls: Controls }).controls.dash)).toEqual([true, false, false]);
  packets.forEach(m => f.host.message(m));
  f.host.step(input(), 2 / 60);
  const frame = (f.hostMessages.at(-1)!.payload as { frame: import("./replay").ReplayFrame }).frame;
  expect(frame.guestSteps?.map(step => step.sequence)).toEqual([0, 1]); expect(frame.guestSequence).toBe(1);
  expect(f.hostOptions.advanceHost).toHaveBeenCalledTimes(1);
  f.guest.message(f.hostMessages.at(-1)!);
  expect(f.guestOptions.failed).not.toHaveBeenCalled();
  expect(snapshotGame(f.guest.game!)).toEqual(snapshotGame(f.hostGame));
  expect(timing.mock.calls.map(([proof])=>proof.stage)).toEqual(["guest-apply-start","guest-apply-end"]);
  expect(timing.mock.calls[0][0]).toMatchObject({frameTick:frame.tick,sampledAtMs:expect.any(Number),sampledWallTimeMs:expect.any(Number)});
  f.guestOptions.protocolEvidence=()=>{throw Error("Broken timing sink");};
  f.host.step(input(),1/60);f.guest.message(f.hostMessages.at(-1)!);
  expect(f.guestOptions.failed).not.toHaveBeenCalled();
});
it("shows guest movement and letter launch immediately while canonical simulation waits for host frames", async () => {
  const f = fixture(), { joined } = await f.start();
  f.hostGame.clock.paused = false;
  Object.assign(f.hostGame.witches[1].body, { seated: false, perch: false });
  delete f.hostGame.witches[1].wake; delete f.hostGame.witches[1].kit;
  await f.sync(); await joined;
  const canonical = snapshotGame(f.guest.game!), x = f.guest.game!.witches[1].body.x;
  const sentAt = f.guestMessages.length;
  f.guest.step({ ...input(1), fire: true, aimX: 1, aimZ: 0 }, 1 / 60);
  expect(f.guest.predicted!.body.x).toBeGreaterThan(x);
  expect(f.guest.predicted!.invites.events.some(e => e.kind === "shot")).toBe(true);
  expect(snapshotGame(f.guest.game!)).toEqual(canonical);
  const packets = f.guestMessages.slice(sentAt);
  expect(packets.some(m => (m.payload as { kind?: string }).kind === "pve-cast")).toBe(true);
  packets.forEach(m => f.host.message(m));
  const hostAt = f.hostMessages.length; f.host.step(input(), 1 / 60);
  const frames = f.hostMessages.slice(hostAt);
  frames.forEach(m => f.guest.message(m));
  expect(f.hostOptions.failed).not.toHaveBeenCalled(); expect(f.guestOptions.failed).not.toHaveBeenCalled();
  expect(snapshotGame(f.guest.game!)).toEqual(snapshotGame(f.hostGame));
});
it("keeps the same visit across the host's new world and rebases after guest preparation", async () => {
  const f = fixture(), { joined } = await f.start(); await f.sync(); await joined;
  f.guest.step(input(1), .05); expect(f.guest.predictionStats!.pending).toBeGreaterThan(0);
  f.hostGame.witches.forEach(w => { w.house = { slept: true, lastBed: "bed" }; });
  const next = newGame(456, structuredClone(f.hostGame.tuning));
  continueSharedNight(f.hostGame, next, { hats: new Set(), parts: new Set() });
  const before = f.hostMessages.length;
  expect(f.host.nextNight(next)).toBe(true); expect(f.host.role).toBe("host"); expect(f.host.ready).toBe(false);
  for (const message of f.hostMessages.slice(before)) f.guest.message(message);
  await vi.waitFor(() => expect(f.guestMessages.some(m => (m.payload as { kind?: string } | undefined)?.kind === "night-ready")).toBe(true));
  expect(f.guestOptions.prepareGuest).toHaveBeenLastCalledWith(expect.objectContaining({ seed: 456 }), expect.any(AbortSignal), expect.any(Function), true);
  const ready = f.guestMessages.find(m => (m.payload as { kind?: string } | undefined)?.kind === "night-ready")!;
  f.host.message(ready); f.guest.message(f.hostMessages.at(-1)!);
  expect(f.host.ready).toBe(true); expect(f.guest.ready).toBe(true); expect(f.guest.game!.seed).toBe(456);
  expect(f.guest.predictionStats!.pending).toBe(0);
  const index = f.hostMessages.length; f.host.step(input(), .02);
  for (const message of f.hostMessages.slice(index)) f.guest.message(message);
  expect(snapshotGame(f.guest.game!)).toEqual(snapshotGame(next));
  expect(f.hostOptions.ended).not.toHaveBeenCalled(); expect(f.guestOptions.ended).not.toHaveBeenCalled();
  expect(f.hostOptions.failed).not.toHaveBeenCalled(); expect(f.guestOptions.failed).not.toHaveBeenCalled();
  // Travel/replacement outside the shared rollover ends this predictor rather than carrying its old inputs.
  f.guest.step(input(1), .05); expect(f.guest.predictionStats!.pending).toBeGreaterThan(0);
  f.guest.nightChanged(); expect(f.guest.role).toBeNull(); expect(f.guest.predictionStats).toBeNull();
});
it.each(["hat", "broom"] as const)("orders competing %s claims in one host step and permits acquisition after release", async kind => {
  const f = fixture(), hat = HAT_SPELLS.find(h => h.built && h.id !== "none")!.id, part = PARTS[0];
  const choice: StationChoice = kind === "hat" ? { kind, id: hat } : { kind, fitted: { ...bareBroom(), [part.slot]: part.id } };
  const release: StationChoice = kind === "hat" ? { kind, id: "none" } : { kind, fitted: bareBroom() };
  const at = objectFront(HOUSE_ROOMS.objects.find(o => o.id === (kind === "hat" ? "hats" : "lathe"))!, f.hostGame.map.treehouse, .1);
  const place = (w: typeof f.hostGame.witches[number]) => {
    Object.assign(w.body, at, { mode: "ground", perch: true, seated: false }); w.spells.hat = "none"; w.spells.parts = bareBroom();
  };
  place(f.hostGame.witches[0]);
  f.hostOptions.attach = game => { const w = newWitchPlayer(1, 0, 0, game.tuning); attachGuest(game, w, () => true); place(w); };
  f.hostOptions.authorizeStation = stationAuthority(() => ({ bags: new Set(), hats: new Set([hat]), parts: new Set([part.id]) }));
  const { joined } = await f.start(); await f.sync(); await joined;
  const pump = () => { const before = f.hostMessages.length; f.host.step(input(), .02); const updates = f.hostMessages.slice(before); for (const m of updates) f.guest.message(m); return updates; };
  expect(f.host.choose(choice)).toBe(true); expect(f.guest.choose(choice)).toBe(true); f.host.message(f.guestMessages.at(-1)!);
  const updates = pump(), result = updates.find(m => (m.payload as { kind: string }).kind === "station")!.payload as { results: { accepted: boolean }[] };
  expect(result.results.map(r => r.accepted)).toEqual([false]);
  const owns = (player: number) => kind === "hat" ? f.hostGame.witches[player].spells.hat === hat : Object.values(f.hostGame.witches[player].spells.parts).includes(part.id);
  expect(owns(0)).toBe(true); expect(owns(1)).toBe(false);
  expect(snapshotGame(f.guest.game!)).toEqual(snapshotGame(f.hostGame));
  expect(f.host.choose(release)).toBe(true); expect(f.guest.choose(choice)).toBe(true); f.host.message(f.guestMessages.at(-1)!); pump();
  expect(owns(0)).toBe(false); expect(owns(1)).toBe(true);
  expect(snapshotGame(f.guest.game!)).toEqual(snapshotGame(f.hostGame));
});
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
  const guestConnection = connection(guestMessages);
  cleanups.push(host.disconnect, guest.disconnect);
  const start = async () => {
    await host.connect("host", connection(hostMessages), hostAbort.signal);
    const joined = guest.connect("guest", guestConnection, guestAbort.signal);
    host.message({ type: "guest-joined", player: 1 });
    for (const message of guestMessages) if ((message.payload as { kind?: string } | undefined)?.kind === "appearance") host.message(message);
    const first = hostMessages.find(m => m.type === "state")!;
    guest.message(first); return { joined, first };
  };
  const sync = async () => {
    await turn(); expect(guestMessages.some(m => m.type === "ready")).toBe(true);
    host.message({ type: "guest-ready", player: 1 }); guest.message(hostMessages.at(-1)!);
  };
  return { host, guest, guestConnection, hostGame, hostOptions, guestOptions, hostMessages, guestMessages, hostAbort, guestAbort, start, sync, advanceTime: (ms: number) => { time += ms; } };
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
it("attributes a preparation refusal before art instead of reporting a loading stall", async () => {
  const f = fixture(), trace = vi.fn(); f.guestOptions.trace = trace;
  f.guestOptions.prepareGuest = vi.fn(async () => { throw new Error("Save boundary unavailable"); });
  const { joined } = await f.start(); await expect(joined).rejects.toThrow("ended"); await turn();
  expect(trace.mock.calls.map(call => call[0])).toEqual(["replay-restore:start", "replay-restore:done", "prepare:invoke", "view-preparation:failed"]);
  expect(trace).toHaveBeenLastCalledWith("view-preparation:failed", expect.objectContaining({ message: "Save boundary unavailable" }));
  expect(f.guestMessages.some(m => m.type === "ready" || m.type === "active")).toBe(false);
  expect(f.guestOptions.synchronized).not.toHaveBeenCalled();
  expect(f.guestOptions.failed).toHaveBeenCalledWith(expect.objectContaining({ message: "Save boundary unavailable" }));
});
it("does not let a diagnostic sink interrupt a valid guest admission", async () => {
  const f = fixture(); f.guestOptions.trace = () => { throw new Error("Broken diagnostics"); };
  const { joined } = await f.start(); await f.sync(); await joined;
  expect(f.guest.ready).toBe(true); expect(f.guestOptions.failed).not.toHaveBeenCalled();
});
it("tells the host that a guest who leaves during preparation never started the visit", async () => {
  const f = fixture(), { joined } = await f.start(); void joined.catch(() => {});
  f.host.message({ type: "guest-left", player: 1 });
  expect(f.hostOptions.failed).toHaveBeenCalledWith(expect.objectContaining({ message: "Your friend's visit couldn't start. The call has ended." }));
  expect(f.host.role).toBeNull(); expect(f.hostGame.witches).toHaveLength(1);
  expect(f.hostOptions.detach).toHaveBeenCalledOnce(); expect(f.hostOptions.ended).toHaveBeenCalledOnce();
  f.host.message({ type: "guest-left", player: 1 }); expect(f.hostOptions.failed).toHaveBeenCalledOnce();
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
