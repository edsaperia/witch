// The new opening's wake-up (Ed, 2026-10-20; previews/ed/opening-mock/ on claude/ed-shots, beats 3a–5a): the chart's dive lands
// in her bedroom (rules/opening.ts) with her in bed, her phone's alarm ringing in the dark. E snoozes it, five seconds a time,
// as often as she likes; moving (WASD, a rise) gets her up: she stretches, then stands beside the bed and walks (WASD, taught in
// a safe room). The first time she comes to the dressing table its mirror opens by itself (her skin, hair and earrings). Up, the
// wake-up's over (`open`; the oak, Ed 2026-10-24: no curtains, and nothing waits on the island's build, which carries on behind
// her): the bedroom's door opens as soon as she's dressed (last night's clothes in their pile by the bed, rules/clothesPile.ts),
// everything but her hat, bag and broom being in the bedroom (config/house/; Ed: "all of the customisation options (except for
// broom, hat, and bag) should be before the locked door"). Then down the trunk to her decks on the Terrace, where E starts the
// party (Ed, 2026-10-20: "The DJ intro replaces the party spell before the party has started"): she's seated behind them and the
// spell's cast there, its needle-drop routine (rules/djSet.ts) playing as it did after the bedroom's scroll. A shorter wake-up
// (`short`: later loads and after the bed, Ed's decisions 4 and 10) has any key or move get her straight up, and the mirror waits
// to be used. Rules only: the alarm's sound, the dark and the cards are the page's (render/wakeUp.ts), reading `g.wake`.
import type { Controls, Game } from "./game";
import { castPartySpell } from "./party";
import { deckOf } from "./treehouse";
import { HOUSE_ROOMS, keepInRoom, objectAt, objectWorld } from "./houseRooms";
import { bedside } from "./opening";
import { dressed, PILE_SLOTS, type PileSlot } from "./clothesPile";

export type WakeBeat = "alarm" | "snooze" | "stretch" | "up";
/** Something that happened this step, for the page (its sound and cards). */
export type WakeEvent = "snooze" | "ring" | "stretch" | "up" | "mirror" | "decks" | /** E at the pile: dressed */ "dressed" | /** at the door undressed */ "dressFirst";

export interface WakeState {
  beat: WakeBeat;
  /** When the beat began (her clock). */
  at: number;
  /** How many times she's snoozed. */
  snoozes: number;
  /** She's up: the wake-up's over (the door opens once she's dressed). */
  open: boolean;
  /** The dressing table's mirror opened by itself already (or, short, never by itself). */
  mirror: boolean;
  /** The shorter wake-up: any key or move gets her up at once (later loads, after the bed). */
  short?: boolean;
  /** This frame's happenings, for the page (cleared as each frame's steps begin: rules/game.ts stepGame). */
  events: WakeEvent[];
  /** Last night's clothes still in the pile by her bed (rules/clothesPile.ts; Ed, 2026-10-23): she's in her nightie till it's empty,
   *  and the door waits on it. Absent (an older wake-up): dressed. */
  pile?: PileSlot[];
  /** When she was last told to get dressed at the door (her clock), so it's said now and then, not every step. */
  nagAt?: number;
}

/** The wake-up's knobs (the tuning's opening.wake): a snooze's seconds (Ed: 5), the stretch's, and how long the alarm rings before E
 *  snoozes it (a press carried over from the dive doesn't). */
export interface WakeTuning { snooze: number; stretch: number; alarmMin: number }
export const WAKE_DEFAULT: WakeTuning = { snooze: 5, stretch: 3, alarmMin: 0.4 };

/** Her in bed: the bed's middle, a little toward its head (its far end, along the plan's x, against the back wall). */
function inBed(g: Game): { x: number; z: number } | null {
  const bed = HOUSE_ROOMS.objects.find(o => o.use.kind === "bed");
  return bed ? objectWorld(bed, g.map.treehouse, bed.w * 0.15, 0) : null;
}

/** Start the wake-up (the dive's landing, or a night after the bed; rules/opening.ts wakeInBedroom having put her in the bedroom):
 *  in bed, the alarm ringing; `short`, the shorter one. False without the house's bedroom. */
export function startWake(g: Game, ht: number, short = false): boolean {
  const at = inBed(g);
  if (!at || !HOUSE_ROOMS.rooms.some(q => q.id === "bedroom")) return false;
  const W = g.witches[0];
  W.body = { ...W.body, x: at.x, z: at.z, vx: 0, vz: 0, seated: false, perch: true, mode: "ground", lift: 0, facing: 1, away: false, heading: "side" };
  g.wake = { beat: "alarm", at: ht, snoozes: 0, open: false, mirror: short, events: [], pile: [...PILE_SLOTS], ...(short ? { short } : {}) };
  return true;
}

/** The bedroom's door shut: till she's dressed (the oak, 2026-10-24: nothing else; it waited on the curtains, and they on the build). */
export const doorShut = (g: { wake?: WakeState }): boolean => !!g.wake && !dressed(g.wake);
/** How often the door says to get dressed while she walks at it (s, her clock). */
const NAG_EVERY = 3;

/** A step of the wake-up, before her own (rules/game.ts): her controls as the beat lets them through. */
export function stepWake(g: Game, c: Controls, ht: number, K: WakeTuning): Controls {
  const w = g.wake;
  if (!w) return c;
  const moving = Math.hypot(c.moveX, c.moveZ) > 0.1 || !!c.toggleMode, press = !!(c.place || c.sigil);
  const used = { ...c, toggleMode: false, place: false, sigil: false, sigilHeld: false, castParty: false, spell: false }; // (a press that's the wake-up's, nothing else's)
  if (w.open) {
    // Up: E at last night's clothes puts on all that's still in the pile (rules/clothesPile.ts); the dressing table's mirror the
    // first time she's at it; then out to her decks
    const d = deckOf(g.map, g.tuning), W = g.witches[0], here = d ? objectAt(d, W.body.x, W.body.z) : null;
    if (press && !dressed(w) && here?.use.kind === "pile") { w.pile = []; w.events.push("dressed"); return used; }
    if (!w.mirror && here?.id === "dressingTable") { w.mirror = true; w.events.push("mirror"); }
    if (g.party.spellAt !== null) return c;
    if (here?.use.kind === "bed") return used; // (no sleeping the night away before it's begun)
    return toDecks(g, c, press);
  }
  const held: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: c.zoom };
  const to = (beat: WakeBeat, e: WakeEvent) => { w.beat = beat; w.at = ht; w.events.push(e); };
  const up = () => { const at = bedside(g); if (at) { const W = g.witches[0]; W.body = { ...W.body, x: at.x, z: at.z, vx: 0, vz: 0 }; } w.open = true; to("up", "up"); };
  // (shorter: any key or move, ringing or snoozing, and she's up)
  if (w.short && (w.beat === "alarm" || w.beat === "snooze") && (moving || press || c.spell || c.castParty) && ht - w.at >= K.alarmMin) { up(); return held; }
  if (w.beat === "alarm") {
    if (moving) to("stretch", "stretch");
    else if (press && ht - w.at >= K.alarmMin) { w.snoozes++; to("snooze", "snooze"); }
  } else if (w.beat === "snooze") {
    if (moving) to("stretch", "stretch");
    else if (ht - w.at >= K.snooze) to("alarm", "ring");
  } else if (w.beat === "stretch" && ht - w.at >= K.stretch) up();
  return held;
}

/** How near her seat behind the decks E starts the party (m). */
const DECKS_REACH = 1.6;
/** Standing at her decks (behind them, by her seat on the Terrace). */
export function atDecks(g: Game): boolean {
  const d = deckOf(g.map, g.tuning), b = g.witches[0].body;
  return !!d && b.mode === "ground" && Math.hypot(b.x - d.seat.x, b.z - d.seat.z) <= DECKS_REACH;
}
/** Up, the party not started: out to her decks, where E seats her and casts the spell (its routine the DJ intro); no other key
 *  casts it meanwhile. (Undressed she can't leave the bedroom: keepInBedroom.) */
function toDecks(g: Game, c: Controls, press: boolean): Controls {
  if (press && atDecks(g)) {
    const d = deckOf(g.map, g.tuning)!, W = g.witches[0];
    W.body = { ...W.body, x: d.seat.x, z: d.seat.z, vx: 0, vz: 0, seated: true, facing: 1, away: false, heading: "side" };
    castPartySpell(g.party, g.map, g.clock.time);
    g.wake!.events.push("decks");
    return { ...c, place: false, sigil: false, castParty: false, spell: false };
  }
  return { ...c, castParty: false, spell: false };
}

/** After her step: the bedroom's door shut till she's dressed (she's kept on its floor, its own blob: rules/houseRooms.ts
 *  keepInRoom); walking at it up but the pile still there, it says to get dressed first (now and then). */
export function keepInBedroom(g: Game): void {
  if (!doorShut(g)) return;
  const W = g.witches[0], b = W.body, k = keepInRoom(g.map.treehouse, "bedroom", b.x, b.z);
  if (!k || k.inside) return;
  W.body = { ...b, x: k.x, z: k.z };
  const w = g.wake!;
  if (w.open && !dressed(w) && !(g.herTime - (w.nagAt ?? -Infinity) < NAG_EVERY)) { w.nagAt = g.herTime; w.events.push("dressFirst"); }
}
