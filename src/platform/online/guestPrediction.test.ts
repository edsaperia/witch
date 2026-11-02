import { expect, it } from "vitest";
import { newGame, newWitchPlayer, stepGame, STEP, type Controls } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { snapshotGame } from "../../rules/nightSnapshot";
import { guestPrediction, type PredictionEvidence } from "./guestPrediction";
import { localView } from "./localView";
import { roomAt } from "../../rules/houseRooms";
import { startWakeFor } from "../../rules/wakeUp";

const input = (moveX: number): Controls => ({ moveX, moveZ: 0, toggleMode: false, zoom: 0 });
function fixture() {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning); game.witches.push(newWitchPlayer(1, game.witch.x + 30, game.witch.z + 30, tuning));
  game.clock.paused = false; game.witches[1].body.seated = false; game.witches[1].body.perch = false;
  return game;
}
it("shows immediate guest input and braking through a private actor without advancing canonical shared state", () => {
  const game = fixture(), original = snapshotGame(game), p = guestPrediction(game, 1);
  const start = p.actor.body.x;
  for (let n = 0; n < 15; n++) p.input(n, input(1), 1 / 60);
  expect(p.actor.body.x).toBeGreaterThan(start);
  const moving = p.actor.body.vx;
  p.input(15, input(0), 1 / 60);
  expect(p.actor.body.vx).toBeLessThan(moving);
  expect(p.actor.body.vx).toBeGreaterThan(0); // Preserve natural braking, not a physical instant stop.
  const facade = localView(game, 1).update(0, 0, p.actor);
  expect(facade.witches.map(w => w.id)).toEqual([1, 0]);
  expect(facade.witch.x).toBe(p.actor.body.x);
  expect(snapshotGame(game)).toEqual(original);
});
it("snaps a host-forced relocation and clears pending locomotion on sleep", () => {
  const game = fixture(), corrections: unknown[] = [], p = guestPrediction(game, 1, c => corrections.push(c));
  p.input(0, input(1), 1 / 60);
  game.witches[1].body.x += 20;
  game.witches[1].house = { slept: true, lastBed: "bedroom2Bed" };
  p.reconcile(0);
  expect(p.pending).toBe(0); expect(p.actor.body.x).toBe(game.witches[1].body.x);
  expect(corrections).toContainEqual(expect.objectContaining({ snapped: true, reason: expect.stringContaining("authoritative-transition:") }));
  expect(p.stats.transitionSnaps).toBe(1); expect(p.stats.correctionSnaps).toBe(0);
  expect(p.stats.transitionReasons).toMatchObject({ held: 1, sleep: 1, bed: 1 });
});

it("counts large unexpected corrections separately from authoritative sleep/perch transitions", () => {
  const game = fixture(), p = guestPrediction(game, 1);
  game.witches[1].body.x += 20; p.reconcile(-1);
  expect(p.stats).toMatchObject({ snaps: 1, correctionSnaps: 1, transitionSnaps: 0, pendingCapSnaps: 0 });
});

it("captures exact actor and pending state around divergence only and isolates a failing evidence sink", () => {
  const game = fixture(), proofs: PredictionEvidence[] = [], p = guestPrediction(game, 1, undefined, proof => proofs.push(proof));
  p.input(0, input(1), 1 / 60); p.reconcile(-1);
  expect(proofs).toHaveLength(0);
  game.witches[1].body.x += 20; p.reconcile(-1);
  expect(proofs).toHaveLength(1);
  expect(proofs[0].before.pending.map(i=>i.sequence)).toEqual([0]);
  expect(proofs[0].after.pending.map(i=>i.sequence)).toEqual([0]);
  expect(proofs[0].after.canonical.body.x).toBe(game.witches[1].body.x);
  expect(proofs[0].correction.size).toBeGreaterThan(19);
  const captured = proofs[0].before.actor.body.x;
  p.input(1, input(1), 1 / 60); expect(proofs[0].before.actor.body.x).toBe(captured);
  const throwing = guestPrediction(game, 1, undefined, () => { throw Error("broken diagnostic"); });
  game.witches[1].body.x += 20; expect(()=>throwing.reconcile(-1)).not.toThrow();
});

it("replays sent but unacknowledged quanta when the authoritative wake releases its hold", () => {
  const game=fixture(),W=game.witches[1],events:{size:number}[]=[];
  startWakeFor(game,0,{yesterday:true},W,{player:1,room:"bedroom2"});
  W.wake!.beat="stretch";W.time=3;
  const p=guestPrediction(game,1,event=>events.push(event));
  for(let n=502;n<=512;n++)p.input(n,input(1),STEP);
  W.wake!.beat="up";W.wake!.open=true;W.body.x+=4;
  p.reconcile(506);
  expect(p.pending).toBe(6);expect(p.stats.transitionSnaps).toBe(1);
  p.input(513,input(1),STEP);
  stepGame(game,[input(0),input(1)],STEP);p.reconcile(507);
  expect(events.at(-1)!.size).toBeLessThan(.001);
});

it("emits a pending-cap proof without changing the existing120-input bound", () => {
  const game=fixture(),proofs:PredictionEvidence[]=[],p=guestPrediction(game,1,undefined,proof=>proofs.push(proof));
  for(let n=0;n<=120;n++)p.input(n,input(0),STEP);
  const cap=proofs.find(proof=>proof.phase==="pending-cap")!;
  expect(cap.correction).toMatchObject({sequence:120,reason:"pending-cap",snapped:true});
  expect(cap.before.pending).toHaveLength(120);expect(cap.after.pending).toHaveLength(0);
  expect(p.pending).toBe(1);expect(p.stats.pendingCapSnaps).toBe(1);
});
it("does not call ordinary forest movement below a house outline an authoritative room change", () => {
  const game = fixture(), W = game.witches[1], at = game.map.treehouse;
  const candidates: number[] = [];
  for (let n = -1200; n <= 1200; n++) {
    const x = at.x + n * .05;
    if ((roomAt(at, x, at.z)?.id ?? null) !== (roomAt(at, x + .125, at.z)?.id ?? null)) candidates.push(x);
  }
  expect(candidates.length).toBeGreaterThan(0);
  const x = candidates.sort((a, b) => Math.abs(a - at.x) - Math.abs(b - at.x))[0];
  Object.assign(W.body, { x, z: at.z, vx: 7.5, vz: 0, perch: false, seated: false });
  const before = roomAt(at, W.body.x, W.body.z)?.id ?? null;
  const p = guestPrediction(game, 1); p.input(0, input(1), 1 / 60);
  expect(roomAt(at, p.actor.body.x, p.actor.body.z)?.id ?? null).not.toBe(before);
  p.reconcile(-1);
  expect(p.stats.snaps).toBe(0); expect(p.pending).toBe(1);
});
it("treats absent and false perch flags as the same authoritative ground state", () => {
  const game = fixture(), p = guestPrediction(game, 1);
  delete game.witches[1].body.perch;
  p.reconcile(-1); expect(p.stats.snaps).toBe(0);
});
