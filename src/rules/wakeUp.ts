// The new opening's wake-up (Ed, 2026-10-20; previews/ed/opening-mock/ on claude/ed-shots, beats 3a–5a): the chart's dive lands
// in her bedroom (rules/opening.ts) with her in bed, her phone's alarm ringing in the dark. E snoozes it, five seconds a time,
// as often as she likes; moving (WASD, a rise) gets her up: she stretches, then stands beside the bed and walks (WASD, taught in
// a safe room). One wake-up every morning (Ed, 2026-10-26, "yes, and keep 3 second stretch for both": the first load, later loads,
// after the bed and after a sail alike; it replaced his decisions 4 and 10, a shorter wake-up after the first, where any key or move
// got her straight up). The first time ever she comes to the dressing table it's marked ("mirror"; E there opens it, her skin, hair and earrings, as every station since Ed's playtest of 2026-10-26). Up, the
// wake-up's over (`open`; the oak, Ed 2026-10-24: no curtains, and nothing waits on the island's build, which carries on behind
// her): the bedroom's door opens as soon as she's up (Ed, 2026-10-25: "I should be able to leave regardless" of dressing; last
// night's clothes wait in their pile by the bed, rules/clothesPile.ts, for whenever she wants them), everything but her hat, bag and broom being in the bedroom (config/house/; Ed: "all of the customisation options (except for
// broom, hat, and bag) should be before the locked door"). Then down the trunk to her decks on the Terrace, where E starts the
// party (Ed, 2026-10-20: "The DJ intro replaces the party spell before the party has started"): she's seated behind them and the
// spell's cast there, its needle-drop routine (rules/djSet.ts) playing as it did after the bedroom's scroll. Rules only: the alarm's sound, the dark and the cards are the page's (render/wakeUp.ts), reading `g.wake`.
// A dream first (Ed, 2026-10-24, finds on loan: "when she's asleep ... we can communicate through her dreams"): after a night with a
// find on loan she dreams its verdict (render/dream.ts) while still asleep, beat "dream", nothing ringing; when the dream ends by
// itself (the page's endDream) or any key or move is pressed, her phone's alarm goes off and the wake-up goes on as ever.
import type { Controls, Game, Witch } from "./game";
import { castPartySpell } from "./party";
import { recordTempo } from "./beat";
import { deckOf } from "./treehouse";
import { HOUSE_ROOMS, objectAt, objectWorld } from "./houseRooms";
import { bedside } from "./opening";
import { pileOut, PILE_SLOTS, type PileSlot } from "./clothesPile";

export type WakeBeat = /** asleep, dreaming (finds on loan) */ "dream" | "alarm" | "snooze" | "stretch" | "up";
/** Something that happened this step, for the page (its sound and cards). */
export type WakeEvent = "snooze" | "ring" | "stretch" | "up" | "mirror" | "decks" | /** E at the pile: dressed */ "dressed" | /** E at her decks: her DJ booth's panel to open (the page's), the party started from it (startParty) */ "booth";

export interface WakeState {
  beat: WakeBeat;
  /** When the beat began (her clock). */
  at: number;
  /** How many times she's snoozed. */
  snoozes: number;
  /** She's up: the wake-up's over (the door's open). */
  open: boolean;
  /** She's come to the dressing table already, ever (the page's save: main.ts), so it isn't marked again. */
  mirror: boolean;
  /** A night played before this wake-up, in this game (after the bed, or a sail): last night's clothes lie in their pile by her
   *  bed. Without one, the first morning of a game, there's no yesterday (Ed, 2026-10-26: "the hat she wore yesterday should be in
   *  the clothes pile - but on the first, there was no yesterday"): no pile, and her hat lies on the hats' floor (startWake). */
  yesterday?: boolean;
  /** This frame's happenings, for the page (cleared as each frame's steps begin: rules/game.ts stepGame). */
  events: WakeEvent[];
  /** Last night's clothes still in the pile by her bed (rules/clothesPile.ts; Ed, 2026-10-23): she's in her nightie till it's empty,
   *  dressed or not, she can leave (Ed, 2026-10-25). Absent (an older wake-up): dressed. */
  pile?: PileSlot[];
  /** She's used the dressing table this morning (E there, its panel opened: rules/sigilButton.ts): her first morning's first guidance
   *  step, skin and hair (Ed, 2026-10-29; rules/guidance.ts FIRST_MORNING). */
  styled?: boolean;
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
 *  in bed, in her nightie, the alarm ringing; `dreaming`, still asleep in her dream first (beat "dream": the alarm when it ends);
 *  `mirrored`, she's been to the dressing table before, ever (its first visit not marked again); `yesterday`, a night played before
 *  it in this game: last night's clothes all in the pile by her bed.
 *  Without one (the game's first morning) there's no pile: every piece of her outfit is still to put on, each at its station, and
 *  her hat lies on the hats' floor, hers to pick up there (rules/hat.ts: down). False without the house's bedroom. */
export const wakeOf = (g: Game, W: Witch = g.witches[0]): WakeState | undefined => W === g.witches[0] ? g.wake : W.wake;

export interface WakeStart { dreaming?: boolean; mirrored?: boolean; yesterday?: boolean }
export function startWake(g: Game, ht: number, { dreaming = false, mirrored = false, yesterday = false }: WakeStart = {}, W: Witch = g.witches[0]): boolean {
  const at = inBed(g);
  if (!at || !HOUSE_ROOMS.rooms.some(q => q.id === bedRoom())) return false;
  W.body = { ...W.body, x: at.x, z: at.z, vx: 0, vz: 0, seated: false, perch: true, mode: "ground", lift: 0, facing: 1, away: false, heading: "side" };
  const wake: WakeState = { beat: dreaming ? "dream" : "alarm", at: ht, snoozes: 0, open: false, mirror: mirrored, events: [], pile: [...PILE_SLOTS], ...(yesterday ? { yesterday } : {}) };
  if (W === g.witches[0]) g.wake = wake; else W.wake = wake;
  if (!yesterday) hatOnFloor(g, ht, W);
  return true;
}

/** The first morning's hat (startWake): hers, lying in the middle of the hats' floor (between its two rows of found hats), off her
 *  head; picked up there, it's on (rules/houseRooms.ts useHats; rules/game.ts takes it out of what she has still to put on). No
 *  hat at all (the creator's "none": rules/hat.ts has), or no hats' floor, nothing. */
function hatOnFloor(g: Game, ht: number, W: Witch): void {
  const o = HOUSE_ROOMS.objects.find(q => q.use.kind === "hats");
  if (!o || !W.hat.has) return;
  const p = objectWorld(o, g.map.treehouse);
  W.hat.down = { x: p.x, z: p.z, at: ht }; delete W.hat.hold;
}

/** The dream's over (the page's: it played to its end, or a key was pressed while the next island was still being made): her
 *  phone's alarm goes off, the wake-up's own first beat. Nothing if she isn't dreaming. */
export function endDream(g: Game, ht: number, W: Witch = g.witches[0]): void {
  const w = wakeOf(g, W);
  if (w?.beat !== "dream") return;
  w.beat = "alarm"; w.at = ht; w.events.push("ring");
}

/** The bedroom's door shut: till she's up (asleep, dreaming, snoozing, stretching). Not on her clothes (Ed, 2026-10-25, his playtest
 *  of v4497: "I should be able to leave regardless"; it waited on her being dressed, and before the oak on the curtains). */
export const doorShut = (g: { wake?: WakeState }): boolean => !!g.wake && !g.wake.open;

/** A step of the wake-up, before her own (rules/game.ts): her controls as the beat lets them through. */
export function stepWake(g: Game, c: Controls, ht: number, K: WakeTuning, W: Witch = g.witches[0]): Controls {
  const w = wakeOf(g, W);
  if (!w) return c;
  const moving = Math.hypot(c.moveX, c.moveZ) > 0.1 || !!c.toggleMode, press = !!(c.place || c.sigil);
  const used = { ...c, toggleMode: false, place: false, sigil: false, sigilHeld: false, castParty: false, spell: false }; // (a press that's the wake-up's, nothing else's)
  if (w.open) {
    // Up: E at last night's clothes puts on all that's still in the pile (rules/clothesPile.ts); the dressing table's mirror the
    // first time she's at it; then out to her decks
    const d = deckOf(g.map, g.tuning), here = d ? objectAt(d, W.body.x, W.body.z) : null;
    if (press && pileOut(w) && here?.use.kind === "pile") { w.pile = []; w.events.push("dressed"); return used; }
    if (!w.mirror && here?.id === "dressingTable") { w.mirror = true; w.events.push("mirror"); }
    if (g.party.spellAt !== null) return c;
    // (her bed before the party: held, she sleeps and the night counts as lost, as the bed after a loss does; main.ts "slept": Ed,
    // 2026-10-26, Q-e. Sleeping again and again till tonight's find in the sky is one she wants is fine: Ed)
    return toDecks(g, c, press, W);
  }
  const held: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: c.zoom };
  const to = (beat: WakeBeat, e: WakeEvent) => { w.beat = beat; w.at = ht; w.events.push(e); };
  const up = () => { const at = bedside(g); if (at) { W.body = { ...W.body, x: at.x, z: at.z, vx: 0, vz: 0 }; } w.open = true; to("up", "up"); };
  // (dreaming: any key or move ends the dream, and the alarm rings; the press is the dream's, nothing else's)
  // (ringing or snoozing, E snoozes and a move starts the stretch, every morning; no other key does anything: Ed's playtest of v4821,
  // 2026-10-26, "I couldn't snooze; pressing E when the alarm was playing woke me up", in the shorter wake-up that's gone)
  if (w.beat === "dream") { if (moving || press || c.spell || c.castParty) endDream(g, ht, W); return held; }
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
export function atDecks(g: Game, W: Witch = g.witches[0]): boolean {
  const d = deckOf(g.map, g.tuning), b = W.body;
  return !!d && b.mode === "ground" && Math.hypot(b.x - d.seat.x, b.z - d.seat.z) <= DECKS_REACH;
}
/** Up, the party not started: out to her decks, her DJ booth (Ed, 2026-10-29: "you open it as a station, select a record ...
 *  Underneath there's a button that says 'Get this party started'"): E there opens its panel (the "booth" event: the page's,
 *  ui/stationPanel.ts), which starts the party (startParty); no other key casts it meanwhile, dressed or in her nightie. */
function toDecks(g: Game, c: Controls, press: boolean, W: Witch): Controls {
  if (press && atDecks(g, W)) {
    wakeOf(g, W)!.events.push("booth");
    return { ...c, place: false, sigil: false, castParty: false, spell: false };
  }
  return { ...c, castParty: false, spell: false };
}

/** "Get this party started" at her DJ booth, with the record at `bpm` on (rules/records.ts; Ed, 2026-10-29): she's seated behind
 *  the decks, the night's tempo set to the record's (rules/beat.ts recordTempo) and the spell cast, its routine (rules/djSet.ts,
 *  the DJ intro) at that bpm. Only up, at her decks, the party not started; true if it started. */
export function startParty(g: Game, bpm: number, W: Witch = g.witches[0]): boolean {
  const wake = wakeOf(g, W);
  if (!wake?.open || g.party.spellAt !== null || !atDecks(g, W)) return false;
  const d = deckOf(g.map, g.tuning)!;
  W.body = { ...W.body, x: d.seat.x, z: d.seat.z, vx: 0, vz: 0, seated: true, facing: 1, away: false, heading: "side" };
  recordTempo(g.beat, g.tuning, bpm, g.clock.time);
  castPartySpell(g.party, g.map, g.clock.time);
  wake.events.push("decks");
  return true;
}

/** The room her bed stands in (Ed, 2026-10-26: "Move the bed to the turret"; it was her Bedroom): where she wakes. */
export const bedRoom = (): string => HOUSE_ROOMS.objects.find(o => o.use.kind === "bed")?.room ?? "bedroom";

/** How far from her spot by the bed (m) she may be while she's still in bed: the hold, past which she's put back by it. */
const BED_HOLD = 6;
/** After her step: held by her bed till she's up (asleep, ringing, snoozing, stretching: `doorShut`), wherever it stands (her Bedroom
 *  once, the Turret, the corridor up to it since Ed, 2026-10-26: "bring the bed closer to the bedroom (it can go in the corridor)"):
 *  past BED_HOLD from beside it, she's put back there. */
export function keepInBedroom(g: Game, W: Witch = g.witches[0]): void {
  if (!doorShut({ wake: wakeOf(g, W) })) return;
  const at = bedside(g), b = W.body;
  if (!at || Math.hypot(b.x - at.x, b.z - at.z) <= BED_HOLD) return;
  W.body = { ...b, x: at.x, z: at.z, vx: 0, vz: 0 };
}
