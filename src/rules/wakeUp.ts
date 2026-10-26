// The new opening's wake-up (Ed, 2026-10-20; previews/ed/opening-mock/ on claude/ed-shots, beats 3a–5a): the chart's dive lands
// in her bedroom (rules/opening.ts) with her in bed, her phone's alarm ringing in the dark. E snoozes it, five seconds a time,
// as often as she likes; moving (WASD, a rise) gets her up: she stretches, then stands beside the bed and walks (WASD, taught in
// a safe room). The first time she comes to the dressing table it's marked ("mirror"; E there opens it, her skin, hair and earrings, as every station since Ed's playtest of 2026-10-26). Up, the
// wake-up's over (`open`; the oak, Ed 2026-10-24: no curtains, and nothing waits on the island's build, which carries on behind
// her): the bedroom's door opens as soon as she's up (Ed, 2026-10-25: "I should be able to leave regardless" of dressing; last
// night's clothes wait in their pile by the bed, rules/clothesPile.ts, for whenever she wants them), everything but her hat, bag and broom being in the bedroom (config/house/; Ed: "all of the customisation options (except for
// broom, hat, and bag) should be before the locked door"). Then down the trunk to her decks on the Terrace, where E starts the
// party (Ed, 2026-10-20: "The DJ intro replaces the party spell before the party has started"): she's seated behind them and the
// spell's cast there, its needle-drop routine (rules/djSet.ts) playing as it did after the bedroom's scroll. A shorter wake-up
// (`short`: later loads and after the bed, Ed's decisions 4 and 10) has a move or any key but E get her straight up (E snoozes it
// there too: Ed's playtest of v4821), and the mirror waits to be used. Rules only: the alarm's sound, the dark and the cards are the page's (render/wakeUp.ts), reading `g.wake`.
// A dream first (Ed, 2026-10-24, finds on loan: "when she's asleep ... we can communicate through her dreams"): after a night with a
// find on loan she dreams its verdict (render/dream.ts) while still asleep, beat "dream", nothing ringing; when the dream ends by
// itself (the page's endDream) or any key or move is pressed, her phone's alarm goes off and the wake-up goes on as ever.
import type { Controls, Game } from "./game";
import { castPartySpell } from "./party";
import { deckOf } from "./treehouse";
import { HOUSE_ROOMS, objectAt, objectWorld } from "./houseRooms";
import { bedside } from "./opening";
import { pileOut, PILE_SLOTS, type PileSlot } from "./clothesPile";

export type WakeBeat = /** asleep, dreaming (finds on loan) */ "dream" | "alarm" | "snooze" | "stretch" | "up";
/** Something that happened this step, for the page (its sound and cards). */
export type WakeEvent = "snooze" | "ring" | "stretch" | "up" | "mirror" | "decks" | /** E at the pile: dressed */ "dressed";

export interface WakeState {
  beat: WakeBeat;
  /** When the beat began (her clock). */
  at: number;
  /** How many times she's snoozed. */
  snoozes: number;
  /** She's up: the wake-up's over (the door's open). */
  open: boolean;
  /** She's come to the dressing table already (or, short, never marked). */
  mirror: boolean;
  /** The shorter wake-up: a move or any key but E gets her up at once, no stretch (later loads, after the bed); E snoozes. */
  short?: boolean;
  /** This frame's happenings, for the page (cleared as each frame's steps begin: rules/game.ts stepGame). */
  events: WakeEvent[];
  /** Last night's clothes still in the pile by her bed (rules/clothesPile.ts; Ed, 2026-10-23): she's in her nightie till it's empty,
   *  dressed or not, she can leave (Ed, 2026-10-25). Absent (an older wake-up): dressed. */
  pile?: PileSlot[];
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
 *  in bed, in her nightie, last night's clothes all in the pile, the alarm ringing; `short`, the shorter one; `dreaming`, still
 *  asleep in her dream first (beat "dream": the alarm when it ends). False without the house's bedroom. */
export function startWake(g: Game, ht: number, short = false, dreaming = false): boolean {
  const at = inBed(g);
  if (!at || !HOUSE_ROOMS.rooms.some(q => q.id === bedRoom())) return false;
  const W = g.witches[0];
  W.body = { ...W.body, x: at.x, z: at.z, vx: 0, vz: 0, seated: false, perch: true, mode: "ground", lift: 0, facing: 1, away: false, heading: "side" };
  g.wake = { beat: dreaming ? "dream" : "alarm", at: ht, snoozes: 0, open: false, mirror: short, events: [], pile: [...PILE_SLOTS], ...(short ? { short } : {}) };
  return true;
}

/** The dream's over (the page's: it played to its end, or a key was pressed while the next island was still being made): her
 *  phone's alarm goes off, the wake-up's own first beat. Nothing if she isn't dreaming. */
export function endDream(g: Game, ht: number): void {
  const w = g.wake;
  if (w?.beat !== "dream") return;
  w.beat = "alarm"; w.at = ht; w.events.push("ring");
}

/** The bedroom's door shut: till she's up (asleep, dreaming, snoozing, stretching). Not on her clothes (Ed, 2026-10-25, his playtest
 *  of v4497: "I should be able to leave regardless"; it waited on her being dressed, and before the oak on the curtains). */
export const doorShut = (g: { wake?: WakeState }): boolean => !!g.wake && !g.wake.open;

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
    if (press && pileOut(w) && here?.use.kind === "pile") { w.pile = []; w.events.push("dressed"); return used; }
    if (!w.mirror && here?.id === "dressingTable") { w.mirror = true; w.events.push("mirror"); }
    if (g.party.spellAt !== null) return c;
    // (her bed before the party: held, she sleeps and the night counts as lost, as the bed after a loss does; main.ts "slept": Ed,
    // 2026-10-26, Q-e. Sleeping again and again till tonight's find in the sky is one she wants is fine: Ed)
    return toDecks(g, c, press);
  }
  const held: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: c.zoom };
  const to = (beat: WakeBeat, e: WakeEvent) => { w.beat = beat; w.at = ht; w.events.push(e); };
  const up = () => { const at = bedside(g); if (at) { const W = g.witches[0]; W.body = { ...W.body, x: at.x, z: at.z, vx: 0, vz: 0 }; } w.open = true; to("up", "up"); };
  // (shorter: a move or any other key, ringing or snoozing, and she's up; E, as ever, snoozes it: Ed's playtest of v4821, 2026-10-26,
  // "I couldn't snooze; pressing E when the alarm was playing woke me up", the keys beside the bed saying "E snooooze")
  // (dreaming: any key or move ends the dream, and the alarm rings; the press is the dream's, nothing else's)
  if (w.beat === "dream") { if (moving || press || c.spell || c.castParty) endDream(g, ht); return held; }
  if (w.short && (w.beat === "alarm" || w.beat === "snooze") && (moving || c.spell || c.castParty) && ht - w.at >= K.alarmMin) { up(); return held; }
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
 *  casts it meanwhile, dressed or in her nightie. */
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

/** The room her bed stands in (Ed, 2026-10-26: "Move the bed to the turret"; it was her Bedroom): where she wakes. */
export const bedRoom = (): string => HOUSE_ROOMS.objects.find(o => o.use.kind === "bed")?.room ?? "bedroom";

/** How far from her spot by the bed (m) she may be while she's still in bed: the hold, past which she's put back by it. */
const BED_HOLD = 6;
/** After her step: held by her bed till she's up (asleep, ringing, snoozing, stretching: `doorShut`), wherever it stands (her Bedroom
 *  once, the Turret, the corridor up to it since Ed, 2026-10-26: "bring the bed closer to the bedroom (it can go in the corridor)"):
 *  past BED_HOLD from beside it, she's put back there. */
export function keepInBedroom(g: Game): void {
  if (!doorShut(g)) return;
  const at = bedside(g), W = g.witches[0], b = W.body;
  if (!at || Math.hypot(b.x - at.x, b.z - at.z) <= BED_HOLD) return;
  W.body = { ...b, x: at.x, z: at.z, vx: 0, vz: 0 };
}
