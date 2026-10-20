// The new opening's wake-up (Ed, 2026-10-20; previews/ed/opening-mock/ on claude/ed-shots, beats 3a–5a): the chart's dive lands
// in her bedroom (rules/opening.ts) with her in bed, her phone's alarm ringing in the dark. E snoozes it, five seconds a time,
// as often as she likes; moving (WASD, a rise) gets her up: she stretches, then stands beside the bed and walks (WASD, taught in
// a safe room). The first time she comes to the dressing table its mirror opens by itself (her skin, hair and earrings). The
// curtains stay shut until the island's ready (the night's art drawn: main.ts says so through `ready`); E at them before then
// says "not yet", after opens them, and the party spell's cast. Until they're open she stays in the bedroom (its door kept
// shut), so nothing she does gets ahead of the build. Rules only: the alarm's sound, the dark and the cards are the page's
// (render/wakeUp.ts), reading `g.wake`.
import type { Controls, Game } from "./game";
import { castPartySpell } from "./party";
import { deckOf } from "./treehouse";
import { HOUSE_ROOMS, objectAt, type Rect } from "./houseRooms";
import { bedside } from "./opening";

export type WakeBeat = "alarm" | "snooze" | "stretch" | "up";
/** Something that happened this step, for the page (its sound and cards). */
export type WakeEvent = "snooze" | "ring" | "stretch" | "up" | "mirror" | "notYet" | "curtains";

export interface WakeState {
  beat: WakeBeat;
  /** When the beat began (her clock). */
  at: number;
  /** How many times she's snoozed. */
  snoozes: number;
  /** The curtains opened (the island's ready, and she's seen it): the wake-up's over, the door open. */
  open: boolean;
  /** The dressing table's mirror opened by itself already. */
  mirror: boolean;
  /** This frame's happenings, for the page (cleared as each frame's steps begin: rules/game.ts stepGame). */
  events: WakeEvent[];
}

/** The wake-up's knobs (the tuning's opening.wake): a snooze's seconds (Ed: 5), the stretch's, and how long the alarm rings before E
 *  snoozes it (a press carried over from the dive doesn't). */
export interface WakeTuning { snooze: number; stretch: number; alarmMin: number }
export const WAKE_DEFAULT: WakeTuning = { snooze: 5, stretch: 3, alarmMin: 0.4 };

/** The bedroom's floor (house.json's room), in the world. */
function bedroomRect(g: Game): Rect | null {
  const r = HOUSE_ROOMS.rooms.find(q => q.id === "bedroom"), th = g.map.treehouse;
  return r ? { x0: th.x + r.x0, x1: th.x + r.x1, z0: th.z + r.z0, z1: th.z + r.z1 } : null;
}

/** Her in bed: the bed's middle, a little toward its head. */
function inBed(g: Game): { x: number; z: number } | null {
  const bed = HOUSE_ROOMS.objects.find(o => o.use.kind === "bed"), th = g.map.treehouse;
  return bed ? { x: th.x + bed.x, z: th.z + bed.z - bed.d * 0.15 } : null;
}

/** Start the wake-up (the dive's landing, rules/opening.ts wakeInBedroom having put her in the bedroom): in bed, the alarm ringing.
 *  False without the house's bedroom. */
export function startWake(g: Game, ht: number): boolean {
  const at = inBed(g);
  if (!at || !bedroomRect(g)) return false;
  const W = g.witches[0];
  W.body = { ...W.body, x: at.x, z: at.z, vx: 0, vz: 0, seated: false, perch: true, mode: "ground", lift: 0, facing: 1, away: false, heading: "side" };
  g.wake = { beat: "alarm", at: ht, snoozes: 0, open: false, mirror: false, events: [] };
  return true;
}

/** Waking up and not yet free to walk: in bed (ringing, snoozing) or stretching. */
export const inBedNow = (w: WakeState | undefined): boolean => !!w && w.beat !== "up";
/** The wake-up under way: she's in it, the curtains not yet open. */
export const waking = (g: { wake?: WakeState }): boolean => !!g.wake && !g.wake.open;

/** A step of the wake-up, before her own (rules/game.ts): her controls as the beat lets them through. `ready`: the island's built
 *  (main.ts: the night's art drawn), the only thing the curtains wait on. */
export function stepWake(g: Game, c: Controls, ht: number, ready: boolean, K: WakeTuning): Controls {
  const w = g.wake;
  if (!w) return c;
  if (w.open) return c;
  const moving = Math.hypot(c.moveX, c.moveZ) > 0.1 || !!c.toggleMode, press = !!(c.place || c.sigil);
  const held: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: c.zoom };
  const to = (beat: WakeBeat, e: WakeEvent) => { w.beat = beat; w.at = ht; w.events.push(e); };
  if (w.beat === "alarm") {
    if (moving) to("stretch", "stretch");
    else if (press && ht - w.at >= K.alarmMin) { w.snoozes++; to("snooze", "snooze"); }
    return held;
  }
  if (w.beat === "snooze") {
    if (moving) to("stretch", "stretch");
    else if (ht - w.at >= K.snooze) to("alarm", "ring");
    return held;
  }
  if (w.beat === "stretch") {
    if (ht - w.at >= K.stretch) {
      const at = bedside(g);
      if (at) { const W = g.witches[0]; W.body = { ...W.body, x: at.x, z: at.z, vx: 0, vz: 0 }; }
      to("up", "up");
    }
    return held;
  }
  // Up: walking the bedroom. The dressing table's mirror the first time she's at it; E at the curtains.
  const d = deckOf(g.map, g.tuning), W = g.witches[0], here = d ? objectAt(d, W.body.x, W.body.z) : null;
  if (!w.mirror && here?.id === "dressingTable") { w.mirror = true; w.events.push("mirror"); }
  if (here?.use.kind === "bed") return { ...c, toggleMode: false, place: false, sigil: false, sigilHeld: false, castParty: false, spell: false }; // (no sleeping the night away before it's begun)
  if (press && here?.use.kind === "curtains") {
    if (ready) { w.open = true; w.events.push("curtains"); castPartySpell(g.party, g.map, g.clock.time); }
    else w.events.push("notYet");
    return { ...c, toggleMode: false, place: false, sigil: false, castParty: false, spell: false }; // (the press is the curtains', nothing else's)
  }
  return { ...c, toggleMode: false, castParty: false, spell: false }; // (no rising out of the bedroom; the spell's the curtains')
}

/** After her step: the bedroom's door shut till the curtains open (she's kept on its floor). */
export function keepInBedroom(g: Game): void {
  if (!waking(g)) return;
  const r = bedroomRect(g), W = g.witches[0], b = W.body;
  if (!r || (b.x >= r.x0 && b.x <= r.x1 && b.z >= r.z0 && b.z <= r.z1)) return;
  W.body = { ...b, x: Math.min(r.x1, Math.max(r.x0, b.x)), z: Math.min(r.z1, Math.max(r.z0, b.z)) };
}
