import type { Game, Witch } from "../rules/game";
import { wakeOf } from "../rules/wakeUp";
import { wornGenome } from "../rules/clothesPile";
import { onTerrace, deckOf } from "../rules/treehouse";
import { onRoomFloor, roomAt } from "../rules/houseRooms";
import type { WitchArt } from "./homeArt";

export function remoteRoomPass(game: Game, W: Witch | undefined): boolean {
  const deck = deckOf(game.map, game.tuning), b = W?.body;
  // The public movement floor excludes a reserved bedroom; its assigned occupant is still drawn inside it.
  return !!(b?.perch && deck?.house?.rooms && !onTerrace(deck, b.x, b.z) && (roomAt(game.map.treehouse, b.x, b.z) || onRoomFloor(deck.house.rooms, b.x, b.z)));
}

/** Pure, assigned-actor drawing inputs. No View/camera/audio mutations and no reordered rules game. */
export function remoteWornLook(game: Game, W: Witch, approved: Record<string, unknown>): Record<string, unknown> {
  const look = wornGenome(approved, wakeOf(game, W)?.pile);
  if (W.hat && (!W.hat.has || W.hat.down)) return { ...look, hat: { ...(look.hat as object ?? {}), shape: "none" } };
  return look;
}

export function remoteWitchFrame(game: Game, W: Witch, art: WitchArt, phase: { time: number; walk: number; foot: boolean; transitionAt?: number; transition?: "land" | "takeoff" }) {
  const b = W.body, time = W.time ?? game.herTime, side = b.away ? "away" : "towards", deck = deckOf(game.map, game.tuning);
  const foot = !!b.perch && b.mode === "ground", dt = Math.max(0, Math.min(.1, time - phase.time)), speed = Math.hypot(b.vx, b.vz);
  phase.time = time;
  if (phase.foot !== foot) { phase.transitionAt = time; phase.transition = foot ? "land" : "takeoff"; }
  const frame = (pose: string, age = time, loop = true) => { const p = art.foot[pose] ?? art.foot.idle, frames = p?.[side] ?? [0]; const k = Math.floor(Math.max(0, age) * (p?.fps ?? 4)); return frames[loop ? k % frames.length : Math.min(frames.length - 1, k)]; };
  let index = (b.away ? 3 : 0) + Math.floor(time * 4) % 3, hidden = false;
  const wake = wakeOf(game, W), ko = W.ko;
  if (ko && time < ko.teleportAt) index = frame("sit");
  else if (ko && time < ko.inAt && !ko.moved) hidden = true;
  else if (wake && !wake.open) index = frame(wake.beat === "stretch" ? "liftSigil" : "sit", time - wake.at, wake.beat !== "stretch");
  else if (phase.transition && time - phase.transitionAt! < .35) index = frame(phase.transition, time - phase.transitionAt!, false);
  else if (foot) {
    phase.walk = speed < .6 ? 0 : phase.walk + dt * (art.foot.walk?.fps ?? 6) * speed / Math.max(.5, deck?.house?.stride ?? 5);
    const held = !!deck && onTerrace(deck, b.x, b.z), pose = speed < .6 ? held ? "idleBroom" : "idle" : held ? "walkBroom" : "walk";
    const heading = b.heading && b.heading !== "side" ? art.heading[b.heading] : null;
    const list = heading?.[pose as "idle" | "walk" | "idleBroom" | "walkBroom"];
    index = list?.length ? list[(speed < .6 ? Math.floor(time * (art.foot.idle?.fps ?? 4)) : Math.floor(phase.walk)) % list.length] : frame(pose, speed < .6 ? time : phase.walk / (art.foot[pose]?.fps ?? 6));
  } else if (phase.foot || b.mode === "rising" && b.perch) index = frame("takeoff", .2, false);
  else if (b.mode === "descending" && b.perch) index = frame("land", .2, false);
  else if (b.mode === "rising" && b.lift < .9) index = 8 + (b.away ? 2 : 0) + Math.floor(time * 7) % 2;
  else if (b.mode === "descending" && b.lift > .1) index = 12 + (b.away ? 2 : 0) + Math.floor(time * 7) % 2;
  else {
    const pose = b.braking ? "brake" : (b.boost ?? 0) > .7 ? "fast" : null;
    const heading = b.heading && b.heading !== "side" ? art.heading[b.heading] : null;
    const list = heading ? pose ? heading[pose] : b.lean ? heading.leanCycle : heading.hover : pose ? art.fly[pose]?.[side] : b.lean ? art.lean[side] : null;
    if (list?.length) index = list[Math.floor(time * (pose ? art.fly[pose]?.fps ?? 8 : 8)) % list.length];
  }
  if (b.falling !== undefined) { index = frame("sit"); hidden = !!deck?.house && b.falling > deck.house.fall.time * .7; }
  phase.foot = foot; return { index, hidden, foot, time };
}
