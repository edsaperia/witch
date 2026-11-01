import { type Game, type Witch } from "../../rules/game";
import { startWake, startWakeInLastBed } from "../../rules/wakeUp";
import { letGoHappy } from "../../rules/knockout";
import { addFloorHat, roomAt } from "../../rules/houseRooms";
import { bedRoom } from "../../rules/wakeUp";

/** Caller supplies equipment; this seam does not clone the host's equipped possessions. */
export function attachGuest(game: Game, guest: Witch, wake: (game: Game, guest: Witch) => boolean = (g, W) => startWake(g, g.herTime, { yesterday: true }, W)): void {
  if (game.witches.length !== 1 || guest.id !== 1 || guest === game.witches[0]) throw new Error("Two-player room already occupied or invalid guest");
  const host = game.witches[0];
  const previous = { time: host.time, paused: host.paused, pending: host.pending }, paused = game.clock.paused;
  host.time = game.herTime; host.paused = game.clock.paused; host.pending = game.pending;
  guest.time = game.herTime; guest.paused = false; guest.pending = {};
  game.witches.push(guest);
  // The separate prototype keeps its original default. Ordinary play must inject the approved guest-room wake.
  try {
    if (!wake(game, guest)) throw new Error("This island has no guest wake geometry");
  } catch (error) {
    game.witches.pop(); game.clock.paused = paused;
    for (const key of ["time", "paused", "pending"] as const) {
      if (previous[key] === undefined) delete host[key];
      else Object.assign(host, { [key]: previous[key] });
    }
    throw error;
  }
  game.clock.paused = false;
  game.prev.witches = game.witches.map(w => ({ x: w.body.x, z: w.body.z, lift: w.body.lift }));
}

/** Restore one-witch ownership after a dropped line; existing placed sigils stay in the world. */
export function detachGuest(game: Game, guestRoom: string = bedRoom()): void {
  if (game.witches.length !== 2) return;
  const [host, guest] = game.witches;
  for (const id of [...guest.leash.stack]) {
    const c = game.creatures[id]; if (!c) continue;
    letGoHappy(c, guest.leash, game.map, game.clock.time, key => game.party.areas.has(key));
    if (!game.loose.some(p => p.id === id)) game.loose.push({ id, x: c.x, z: c.z, at: game.clock.time });
    c.loose = true;
  }
  host.leash.placed.push(...guest.leash.placed);
  for (const id of guest.leash.relics) {
    const relic = game.relics[id];
    if (relic) { relic.sx = guest.body.x; relic.sz = guest.body.z; relic.state = "dropped"; }
  }
  if (guest.leash.tether) {
    const id = guest.leash.tether.id;
    game.loose.push({ id, x: guest.body.x, z: guest.body.z, at: game.clock.time, legend: true });
    game.creatures[id].loose = true;
  }
  host.hat.left.push(...guest.hat.left);
  if (guest.hat.has) {
    const at = guest.hat.down ?? { x: guest.body.x, z: guest.body.z, at: game.herTime };
    if (game.map.bounds.lakes?.inside(at.x, at.z) || roomAt(game.map.treehouse, at.x, at.z)?.id === guestRoom) addFloorHat(host, guest.spells.hat);
    else host.hat.left.push({ ...at, spell: guest.spells.hat });
  }
  game.witches.pop();
  if (host.house?.slept) {
    // A shared sleeper returns to the ordinary alarm/get-up, not an un-clearable solo sleep latch.
    host.house.slept = false; delete host.house.bedFrom;
    const options = { yesterday: true, mirrored: game.wake?.mirror };
    if (!startWakeInLastBed(game, host.time ?? game.herTime, options, host)) startWake(game, host.time ?? game.herTime, options, host);
  }
  game.pending = host.pending ?? {}; game.clock.paused = !!host.paused;
  delete host.pending; delete host.time; delete host.paused;
  game.prev.witches = [{ x: host.body.x, z: host.body.z, lift: host.body.lift }];
}
