import { newWitchPlayer, type Game } from "../rules/game";
import { HOUSE_ROOMS } from "../rules/houseRooms";
import { setLoadout, setParts } from "../rules/spells";
import { startWakeFor, wakeOf } from "../rules/wakeUp";

/** Carry only identities/equipment/bed targets into fresh rules, never old creatures, health or spell timers. */
export function continueSharedNight(previous: Game, next: Game, owned: { hats: ReadonlySet<string>; parts: ReadonlySet<string> }): void {
  if (previous.witches.length !== 2 || !previous.witches.every(w => w.house?.slept) || next.witches.length !== 1) throw new Error("Both witches must be asleep before a shared new night.");
  const beds = previous.witches.map(w => HOUSE_ROOMS.objects.find(o => o.id === w.house?.lastBed && o.use.kind === "bed"));
  if (beds.some(b => !b)) throw new Error("A shared sleeper has no bed target.");
  next.witches.push(newWitchPlayer(1, 0, 0, next.tuning));
  next.witches.forEach((witch, i) => {
    const before = previous.witches[i], wake = wakeOf(previous, before), bed = beds[i]!;
    witch.time = 0; witch.paused = false; witch.pending = {};
    setLoadout(witch.spells, before.spells.hat === "none" || owned.hats.has(before.spells.hat) ? before.spells.hat : "none");
    setParts(witch.spells, Object.fromEntries(Object.entries(before.spells.parts).map(([slot, id]) => [slot, id !== null && owned.parts.has(id) ? id : null])) as typeof witch.spells.parts);
    witch.spells.hats = [...owned.hats]; witch.spells.bag = before.spells.bag;
    witch.house = { lastBed: bed.id };
    if (!startWakeFor(next, 0, { yesterday: true, mirrored: wake?.mirror }, witch, { player: i, room: wake?.room ?? bed.room, bed: bed.id })) throw new Error("A shared witch couldn't wake in her bed.");
  });
}
