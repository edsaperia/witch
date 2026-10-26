// Inviting and leashing (Ed, 2026-10-03; DESIGN.md, "The leash"). On the ground, the witch talks
// to the nearest invitable creature within invite.talkRange by herself, no button (Ed, v244),
// sticking with it while it stays within invite.cancelDistance: they chat in emoji for a while
// (longer for older creatures), moving or still, then it is invited, and so leashed to her: its sigil joins the bottom of the stack above her head. The
// sigil button puts the bottom sigil down on the ground (a leash point: the creature roams within
// leash.length of it), or picks up a placed sigil she is over, back onto the bottom of the stack.
// Sigils can't be put down on top of one another. Leashes are elastic: creatures walk or run to
// their leash point at their own pace and never teleport. Legends can't be invited (for now).
// No drawing here.
import { attackerNear, BABIES_DEFAULT, babiesOf, isBaby, scatterSpot, stepBaby, trailPoint, updateTrail } from "./babies";
import { runeOffset } from "./runeOffset";
import { heal, speedFactor, type Creature } from "./creatures";
import type { Tuning } from "./tuning";
import { befriend, inConga, invitableNow, stateOf } from "./creatureStates";
import { facingAway } from "./witch";

export interface PlacedSigil { id: number; x: number; z: number; /** game time it was put down */ at: number }

export interface Talk {
  /** The creature she's talking to. */
  id: number;
  /** A legend: it won't be invited (for now), just gives her one unimpressed look. */
  refused: boolean;
  /** Seconds talked so far, and how long this creature needs. */
  t: number;
  total: number;
}

export type LeashEventKind = /** her fall off the Terrace with no broom hitting the ground, unseen below (rules/kit.ts; id: the witch) */ "thud" | /** her invitations or a broom taken in the house (rules/kit.ts; obj: "invites" or "broom") */ "kit" | "invited" | "befriended" | "placed" | "picked" | "fizzled" | "cancelled" | "cycled" | /** a take-off pulled back down: her followers too heavy (rules/leashWeight.ts groundedBy; id: the witch) */ "grounded" | /** a coming-down refused: up in the treetops over a lake, she flies on (rules/game.ts; id: the witch) */ "lakeHold" | /** she walked off the balcony's open rim with no broom and fell (rules/treehouse.ts), back at the magic circle (id: the witch) */ "fell" | /** a relic picked up, or put down by a legend (id: the relic) */ "relicPicked" | "relicPlaced" | /** a flask drunk, a growth spurt for her followers (rules/sigilButton.ts; id: the relic) */ "flaskDrunk" | /** a relic's sigil put down on the ground, off any legend's clearing (id: the relic) */ "relicDropped" | /** her hat picked up and back on (rules/hat.ts; id: the witch) */ "hatPicked" | /** her hat put down at her feet, the sigil button held (rules/hat.ts putHat; id: the witch) */ "hatPut" | /** a quest sigil or a relic put down near a sleeping legend but outside its clearing, where it does nothing (id: the legend; x, z: its clearing's middle) */ "outsideCircle" | /** she landed on the treehouse deck (on) or rose off it (rules/treehouse.ts; id: the witch) */ "perch" | /** E at the treehouse's map table: open the sea chart (rules/treehouse.ts; id: the witch) */ "chart" | /** E at an object in the treehouse's rooms (rules/houseRooms.ts; id: the witch; obj: the object's id; "slept": the bed's hold done, the night over) */ "house" | /** E at tonight's find: a wearable in the travel trunk or a broom part in a wreck (rules/finds.ts; id: the witch; obj: the item's id; find: its kind) */ "found";
export interface LeashEvent { kind: LeashEventKind; id: number; x: number; z: number; at: number; /** a "cycled" event's: the sigil cycled was a relic's (id: the relic) */ relic?: boolean; /** a "perch" event's: on the deck (true) or off it */ on?: boolean; /** a "house" event's: the object used (config/house/), or "slept"; a "found" event's: the item */ obj?: string; /** a "found" event's: its kind (rules/finds.ts FIND_KINDS) */ find?: "wearable" | "part" | "hat" | "bag" }

export interface LeashState {
  /** Creatures leashed to the witch, oldest first: the last is the bottom of the stack, nearest her head. */
  stack: number[];
  /** Sigils on the ground. */
  placed: PlacedSigil[];
  talk: Talk | null;
  /** Talk progress per creature (seconds): it fills while she talks to that creature and, once
   *  she stops, drains at invite.decayRate of the fill rate until it's gone (Ed, 2026-10-03), so
   *  coming back picks up where the chat left off. */
  progress: Map<number, number>;
  /** What happened in the latest step, for the view (sounds, fizzles, draw-ons). */
  events: LeashEvent[];
  /** Legends that have given her their unimpressed look this approach: not again until she's
   *  been beyond invite.cancelDistance of them. */
  snubbed: Set<number>;
  /** Her trail on the ground while babies follow her (rules/babies.ts): breadcrumbs, newest first, flat x, z pairs. Made only then. */
  trail?: number[];
  /** While she's in a fight with babies following (rules/babies.ts): the way from the first attacker to her when it began,
   *  kept the whole fight, and when it's over (babies.calm seconds after the last thing went for her or hers). */
  scatter?: { x: number; z: number; until: number };
  /** Relic sigils she carries (rules/legends.ts: ids into the game's relics), in the stack's order, top first. */
  relics: number[];
  /** Where each carried relic sigil sits in the stack (Ed's playtest, 2026-10-08: "Flasks should behave like other sigils in
   *  this regard; sit in the stack, and cycle when it cycles"): by relic id, how many of the creatures' sigils are above it.
   *  One missing, or past the stack's end, sits at the bottom. See stackOrder. */
  relicAt?: Record<number, number>;
  /** A run of the sigil button (Ed, 2026-10-15: "Pick up and place in runs"): the button held on since a press that picked a sigil
   *  up (`pick`: she keeps picking up any she runs over) or put one down (`place`: moving into an empty hex puts down the next);
   *  `cell`, the hex cell she last put one down in or stood in (so one goes down only as she enters another), `x`,`z` where the
   *  last went down off the grid. Let go, it's over (undefined). */
  run?: { kind: "pick" | "place"; cell?: string; x: number; z: number };
}

/** One sigil in her stack: a leashed creature's, or a carried relic's. */
export interface StackItem { kind: "creature" | "relic"; id: number }

/** Her whole stack, top first, the bottom (nearest her hat: the one E puts down or gives) last: the creatures' sigils in their
 *  order, each carried relic's sigil slotted in under as many of them as its relicAt says (relics in a slot in their own order). */
export function stackOrder(s: LeashState): StackItem[] {
  const out: StackItem[] = [], n = s.stack.length, at = (r: number) => Math.min(n, Math.max(0, s.relicAt?.[r] ?? n));
  for (let k = 0; k <= n; k++) {
    for (const r of s.relics) if (at(r) === k) out.push({ kind: "relic", id: r });
    if (k < n) out.push({ kind: "creature", id: s.stack[k] });
  }
  return out;
}

/** The bottom of her stack: what the place button puts down (a creature's sigil) or gives (a relic's, by a sleeping legend). */
export function stackBottom(s: LeashState): StackItem | null {
  const n = s.stack.length;
  for (let i = s.relics.length - 1; i >= 0; i--) if (Math.min(n, s.relicAt?.[s.relics[i]] ?? n) >= n) return { kind: "relic", id: s.relics[i] };
  return n ? { kind: "creature", id: s.stack[n - 1] } : null;
}

/** Set the stack to this order (top first): the creatures' sigils, the relics' and where each relic sits. */
function setStackOrder(s: LeashState, order: StackItem[]): void {
  const at: Record<number, number> = {};
  s.stack.length = 0; s.relics.length = 0;
  for (const it of order) {
    if (it.kind === "creature") s.stack.push(it.id);
    else { at[it.id] = s.stack.length; s.relics.push(it.id); }
  }
  if (s.relics.length || s.relicAt) s.relicAt = at; // (made only once she's carried a relic: a leash without one is as it was)
}

/** Cycle the stack (Q; the sigil button in the treetops): its bottom sigil, a creature's or a relic's, to the top. */
export function cycleStack(s: LeashState): StackItem | null {
  const order = stackOrder(s);
  if (order.length < 2) return null;
  const it = order.pop()!;
  setStackOrder(s, [it, ...order]);
  return it;
}

/** A creature's sigil to the very bottom of her stack, under any relics' (the bots' shortcut for cycling to it). */
export function toBottom(s: LeashState, id: number): void {
  const order = stackOrder(s), i = order.findIndex(it => it.kind === "creature" && it.id === id);
  if (i < 0) return;
  const [it] = order.splice(i, 1);
  setStackOrder(s, [...order, it]);
}

/** A relic's sigil onto the bottom of her stack (picked up: rules/legends.ts relicButton). */
export function carryRelic(s: LeashState, id: number): void {
  if (!s.relics.includes(id)) s.relics.push(id);
  (s.relicAt ??= {})[id] = s.stack.length;
}

/** A relic's sigil off her stack (given to a legend). */
export function dropRelic(s: LeashState, id: number): void {
  const i = s.relics.indexOf(id);
  if (i >= 0) s.relics.splice(i, 1);
  if (s.relicAt) delete s.relicAt[id];
}

export interface LeashControls {
  /** The sigil button was pressed this frame: on the ground, place the bottom sigil or pick one up;
   *  in the treetops, cycle the stack (the gamepad's and touch's one button). */
  sigil: boolean;
  /** Place (E, Ed 2026-10-06: "E for place, Q for cycle"): on the ground, place the bottom sigil or
   *  pick one up; nothing in the treetops. */
  place?: boolean;
  /** Cycle (Q): the bottom sigil to the top, on the ground or in the treetops. */
  cycle?: boolean;
  /** The sigil button is held on this frame (E, the pad's square, touch): since a press that picked up or put down, a run
   *  (LeashState.run, Ed 2026-10-15): picking up any sigil she runs over, or putting one down in each empty hex she enters. */
  held?: boolean;
  /** The happy creature whose sigil rune is ready within r of (x, z), nearest first (states.leash "pickup"), or null. */
  rune?: (x: number, z: number, r: number) => Creature | null;
  /** Debug: invite the nearest invitable creature, however far. */
  inviteNearest?: boolean;
  /** Whether a hex cell centred at (x, z) is barred to sigils (under a runestone, a soundsystem or a home speaker: rules/sigilButton.ts). */
  barred?: (x: number, z: number) => boolean;
  /** Put a relic's sigil down on the ground at (x, z) (the game's relics: rules/sigilButton.ts), when it's at the bottom of
   *  her stack and the button isn't giving it to a legend (Ed, 2026-10-08: "if the flask is in the bottom slot, it's what you
   *  put down when you press e"). */
  dropRelic?: (id: number, x: number, z: number) => void;
  /** Whether she may talk this frame: always with auto-talk on (the default); with it off, only
   *  while Talk is held (Ed's playtest, 2026-10-04: auto-talk can be turned off). */
  talk?: boolean;
}

export const newLeash = (): LeashState => ({ stack: [], placed: [], talk: null, progress: new Map(), events: [], snubbed: new Set(), relics: [] });

/** Seconds of talk a creature needs: babies 3, young 6, adults 12; legends can't be invited. */
export const talkTime = (c: Creature, t: Tuning): number => t.invite.talkTime[Math.min(c.level, t.invite.talkTime.length - 1)];
/** Seconds per turn of the conversation (hers, then theirs): slower for older creatures. */
export const talkTurn = (c: Creature, t: Tuning): number => t.invite.turn[Math.min(c.level, t.invite.turn.length - 1)];
/** Whether she can invite it: wild, alive, not fleeing, not enraged by a wave (Ed's playtest:
 *  mid-siege, an invited one is set on by the rest); legends only when let go on a knockout and
 *  walking home (wild legends can't be invited). Inviting works while it attacks her (Ed, 2026-10-04). */
export const invitable = (c: Creature) => invitableNow(c); // (#87: a wild one, dazed or not, or a happy one for its second step; never a legend or an enraged one)

/** Where a leashed creature's leash is fixed: the witch, or its placed sigil. */
export function leashPoint(s: LeashState, id: number, wx: number, wz: number): { x: number; z: number } | null {
  if (s.stack.includes(id)) return { x: wx, z: wz };
  const p = s.placed.find(q => q.id === id);
  return p ? { x: p.x, z: p.z } : null;
}

/** The creature she'd start talking to now: the nearest invitable one in range, else a legend that
 *  hasn't snubbed her yet this approach. */
export function talkTarget(creatures: Creature[], x: number, z: number, t: Tuning, snubbed: Set<number> = new Set()): Creature | null {
  return nearest(creatures, x, z, t.invite.talkRange) ?? nearest(creatures, x, z, t.invite.talkRange, true, snubbed);
}

function nearest(creatures: Creature[], x: number, z: number, within: number, legends = false, skip?: Set<number>): Creature | null {
  let best: Creature | null = null, bd = within;
  for (const c of creatures) {
    if (Math.abs(c.x - x) > bd || Math.abs(c.z - z) > bd) continue; // (cheap: thousands of creatures, every step)
    if (c.leashed || c.gone || c.fleeUntil || (!legends && !invitable(c)) || skip?.has(c.id)) continue;
    if (c.legendState) continue; // (an area legend is never chatted to: asleep it's scenery, happy it's at peace, angry it's far off)
    const d = Math.hypot(c.x - x, c.z - z);
    if (d <= bd) { bd = d; best = c; }
  }
  return best;
}

/** Invite it: leashed to her, for good (#87), its sigil on the bottom of the stack (the 💌's second step: rules/invites.ts). */
export function inviteCreature(s: LeashState, c: Creature, x: number, z: number, time: number, kind: "invited" | "picked" = "invited"): void {
  if (inConga(c)) return; // (the won night's line follows her, never on her leash: rules/creatureStates.ts inConga)
  c.leashed = true; c.state = "leashed"; c.affection = undefined; c.dazed = false; c.dazedUntil = undefined;
  c.rest = 0;
  c.wanderTo = undefined; c.siege = undefined; c.fight = undefined;
  c.friendly = undefined; // (taking one from a friendly area weakens it: Ed's call)
  // Invited, it's whole again (Ed, 2026-10-04), with a heal pop if it was hurt.
  heal(c, time);
  s.stack.push(c.id);
  s.events.push({ kind, id: c.id, x, z, at: time });
}

/** A party legend let off her leash (its sigil put down, or her knocked out): happy again where it stands, dancing, its rune at its feet. */
export function letPartyLegendGo(c: Creature): void {
  c.leashed = false; c.state = undefined; c.dancing = true; c.anchorX = c.x; c.anchorZ = c.z; c.fight = undefined;
}

/** One step: talking, placing and picking up, and the leashed creatures moving. `onGround` is
 *  true only in ground mode (no inviting, placing or picking up from the treetops). `guards`: her stack's creatures seen as
 *  placed at home while she's in the treehouse (rules/houseGuard.ts): they rest by those spots as by a placed sigil, not by
 *  her; her stack itself is unchanged. */
export function stepLeash(s: LeashState, creatures: Creature[], c: LeashControls, witch: { x: number; z: number }, onGround: boolean, time: number, dt: number, t: Tuning, busy: (id: number) => boolean = () => false, guards: PlacedSigil[] = []): void {
  s.events = [];
  const T = t.invite, L = t.leash, byId = (id: number) => creatures[id];
  const away = (c: Creature) => Math.hypot(c.x - witch.x, c.z - witch.z);

  // Talking, by herself (Ed, v244): on the ground she chats with the nearest invitable creature in
  // talkRange, and sticks with it while it stays within cancelDistance; moving out of range or
  // rising to the treetops cancels it (its progress drains, so coming back resumes). A legend gets
  // one unimpressed look (invite.snubTime) per approach. A legend's look gives way at once to an
  // invitable creature in range.
  for (const id of s.snubbed) if (away(byId(id)) > T.cancelDistance) s.snubbed.delete(id);
  const cur = s.talk ? byId(s.talk.id) : null;
  const talking = onGround && c.talk !== false;
  let keep = !!cur && talking && !cur.leashed && away(cur) <= T.cancelDistance;
  if (keep && s.talk!.refused && (s.talk!.t >= T.snubTime || nearest(creatures, witch.x, witch.z, T.talkRange))) {
    if (s.talk!.t >= T.snubTime) s.snubbed.add(s.talk!.id);
    keep = false;
  }
  if (keep) {
    s.talk!.t += dt;
    if (!s.talk!.refused) s.progress.set(cur!.id, s.talk!.t);
    // It stops to chat, and faces her.
    cur!.rest = Math.max(cur!.rest, 0.2); cur!.moving = false;
    cur!.facing = witch.x >= cur!.x ? 1 : -1;
    cur!.away = witch.z < cur!.z - 1;
    // A chat done (#87, until the 💌s land): a wild one becomes happy and stays in its area; a happy one (asked again) is leashed.
    if (!s.talk!.refused && s.talk!.t >= s.talk!.total) {
      if (stateOf(cur!) === "wild") { befriend(cur!, time); s.events.push({ kind: "befriended", id: cur!.id, x: cur!.x, z: cur!.z, at: time }); }
      else inviteCreature(s, cur!, cur!.x, cur!.z, time);
      s.progress.delete(cur!.id); s.talk = null;
    }
  } else {
    if (s.talk) { s.events.push({ kind: "cancelled", id: s.talk.id, x: witch.x, z: witch.z, at: time }); s.talk = null; }
    const n = talking ? talkTarget(creatures, witch.x, witch.z, t, s.snubbed) : null;
    if (n) s.talk = { id: n.id, refused: !invitable(n), t: invitable(n) ? s.progress.get(n.id) ?? 0 : 0, total: invitable(n) ? talkTime(n, t) : Infinity };
  }

  // Every chat she isn't in right now drains, at decayRate of the fill rate, until it's gone.
  for (const [id, p] of s.progress) {
    if (s.talk?.id === id) continue;
    const left = p - dt * T.decayRate;
    if (left <= 0 || creatures[id].leashed) s.progress.delete(id); else s.progress.set(id, left);
  }

  if (c.inviteNearest) {
    const n = nearest(creatures, witch.x, witch.z, Infinity);
    if (n) inviteCreature(s, n, n.x, n.z, time);
  }

  // The sigil button (Ed, 2026-10-05: "pressing E in treetop mode cycles your sigils... and then you
  // can't cycle in ground mode"): in the treetops it cycles the stack, the bottom sigil (the one it
  // puts down next) to the top; on the ground it picks up a placed sigil she's over, else puts the
  // bottom one down. Sigils go down and come up only on the ground.
  // (Since 2026-10-06 the keyboard has a button for each: E places, Q cycles anywhere.)
  // (Carried relics' sigils cycle with the rest: Ed's playtest, 2026-10-08.)
  if (((c.sigil && !onGround) || c.cycle) && s.stack.length + s.relics.length > 1) {
    const it = cycleStack(s)!;
    s.events.push({ kind: "cycled", id: it.id, x: witch.x, z: witch.z, at: time, ...(it.kind === "relic" ? { relic: true } : {}) });
  }
  // A run (Ed, 2026-10-15; leash.runs): the button held on since a press that picked up ("pick": she keeps picking up any sigil she
  // runs over) or put down ("place": each empty hex she moves into takes the next; off the grid, every leash.spacing metres). A press
  // that did nothing starts none (so holding with nothing to do still puts her hat down: rules/hat.ts putHat). Let go, it's over.
  const runs = L.runs !== false;
  if (!c.held || !onGround || !runs) s.run = undefined;
  const pressed = (c.sigil || c.place) && onGround;
  const H = L.hex && L.hex.size > 0 ? L.hex : null;
  const cellOf = (x: number, z: number) => { const h = hexCell(x, z, H!.size); return `${h.q},${h.r}`; };
  if (pressed) {
    const did = sigilPress(s, creatures, c, witch, time, t, undefined);
    if (did && runs && c.held) s.run = { kind: did, cell: H ? cellOf(witch.x, witch.z) : undefined, x: witch.x, z: witch.z };
  } else if (s.run && onGround) {
    const r = s.run;
    if (r.kind === "pick") sigilPress(s, creatures, c, witch, time, t, "pick");
    else {
      // Into another cell (or, off the grid, spacing metres on): the next sigil goes down there, if the cell's free.
      const here = H ? cellOf(witch.x, witch.z) : undefined, moved = H ? here !== r.cell : Math.hypot(witch.x - r.x, witch.z - r.z) >= L.spacing;
      if (moved) {
        if (sigilPress(s, creatures, c, witch, time, t, "place") === "place") { r.x = witch.x; r.z = witch.z; }
        r.cell = here;
      }
    }
  }

  // (A party animal busy with a berry, or evolving, is moved by rules/berries.ts instead.)
  // Her babies following her on the ground (Ed, 2026-10-11; rules/babies.ts): single file along where she's been, in stack
  // order from the bottom, babies.gap metres apart; scattering while she's in a fight.
  const BB = babiesOf(t), babies = onGround ? s.stack.filter(id => isBaby(byId(id))) : [];
  if (babies.length) s.trail = updateTrail(s.trail, witch.x, witch.z, (babies.length + 2) * BB.gap + 4);
  else if (s.trail) s.trail = undefined;
  const herSpeed = Math.hypot((witch as { vx?: number }).vx ?? 0, (witch as { vz?: number }).vz ?? 0);
  const foe = babies.length ? attackerNear(creatures, witch.x, witch.z, (t.combat.defendRadius ?? 30) * (t.fight?.scale ?? 1)) : null;
  // (scattered from the moment something goes for her or hers, closing in or winding up, for the whole fight, one way, until
  // nothing has for babies.calm seconds; Ed, 2026-10-11)
  if (foe) {
    if (!s.scatter) { const dx = witch.x - foe.x, dz = witch.z - foe.z, d = Math.hypot(dx, dz) || 1; s.scatter = { x: dx / d, z: dz / d, until: 0 }; }
    s.scatter.until = time + (BB.calm ?? BABIES_DEFAULT.calm);
  } else if (s.scatter && (!babies.length || time >= s.scatter.until)) s.scatter = undefined;
  for (let i = s.stack.length - 1, k = 0; i >= 0; i--) {
    const id = s.stack[i], c = byId(id);
    if (!babies.length || !isBaby(c)) continue;
    const slot = k++;
    if (busy(id)) continue;
    const to = s.scatter ? scatterSpot(c, witch.x, witch.z, s.scatter, BB.scatter) : trailPoint(s.trail, witch.x, witch.z, (slot + 1) * BB.gap);
    stepBaby(c, to.x, to.z, witch.x, witch.z, leashSpeed(c, t) * (t.leash.pace ?? 1), herSpeed, dt, t);
  }
  const guarding = new Set(guards.map(p => p.id));
  for (const id of s.stack) if (!busy(id) && !byId(id).partyLegend && !guarding.has(id) && !(babies.length && isBaby(byId(id)))) stepLeashed(byId(id), witch.x, witch.z, dt, t, t.leash.pace ?? 1); // (a party legend never comes to her: rules/partyLegend.ts)
  // Parked, it rests north of its sigil (up the screen, -z), so the sigil stays in sight and easy to pick up (Ed, 2026-10-10: "Leashed
  // animals should come to rest 10m above their placed sigil"; 2026-10-13: the sigil's top just below its feet, by its size: rules/runeOffset.ts).
  for (const p of guards.length ? [...s.placed, ...guards] : s.placed) if (!busy(p.id)) { const c = byId(p.id); stepLeashed(c, p.x, p.z - runeOffset(c, t, 1), dt, t); }
}

/** The sigil button on the ground at her feet (`only`: in a run, just picking up or just putting down; a press does whichever
 *  the spot asks): picks up her placed sigil in the hex cell she stands in (or within leash.pickRadius off the grid), else a
 *  happy creature's rune near her, else puts the bottom of her stack down (a relic's sigil on the ground, a creature's on the
 *  cell or at her feet). Returns what it did ("pick", "place"), or null when nothing happened (a fizzle counts as nothing). */
function sigilPress(s: LeashState, creatures: Creature[], c: LeashControls, witch: { x: number; z: number }, time: number, t: Tuning, only: "pick" | "place" | undefined): "pick" | "place" | null {
  const L = t.leash, byId = (id: number) => creatures[id];
  let pick = -1, pd = L.pickRadius;
  // On the hex grid (Ed, 2026-10-11: "a cluster of placed sigils reads cleanly"): the cell nearest her decides; taken, the press
  // picks its sigil up (no fizzling); free, a sigil goes down on it, or, if it's barred, on the nearest free cell that isn't.
  const H = L.hex && L.hex.size > 0 ? L.hex : null;
  const spot = H ? hexSpot(s, witch.x, witch.z, H.size, c.barred) : null;
  if (spot) pick = spot.taken;
  else s.placed.forEach((p, i) => { const d = Math.hypot(p.x - witch.x, p.z - witch.z); if (d <= pd) { pd = d; pick = i; } });
  if (only === "place") pick = -1;
  // (Her own placed sigil first, then a happy creature's rune: Ed, 2026-10-06, the nearest; her hat before both, rules/game.ts.)
  const rune = pick < 0 && only !== "place" ? c.rune?.(witch.x, witch.z, L.runeRadius ?? L.pickRadius) ?? null : null; // (further than her own sigils: Ed's playtest, "difficult to pick up")
  if (pick >= 0) {
    const [p] = s.placed.splice(pick, 1);
    s.stack.push(p.id);
    s.events.push({ kind: "picked", id: p.id, x: p.x, z: p.z, at: time });
    return "pick";
  } else if (rune) {
    // A happy creature's rune (states.leash "pickup"): picked up like a placed sigil, it's leashed, at the bottom of her stack.
    inviteCreature(s, rune, rune.x, rune.z + runeOffset(rune, t), time, "picked"); // (where its rune lay, south of it)
    return "pick";
  }
  if (only === "pick") return null;
  if (spot && spot.taken >= 0) return null; // (a run of placing over a taken cell: nothing)
  if (stackBottom(s)?.kind === "relic") {
    // A relic's sigil at the bottom (Ed, 2026-10-08: "if the flask is in the bottom slot, it's what you put down when you press
    // e"): by a sleeping legend the sigil button has given it already (rules/legends.ts relicButton); anywhere else it goes
    // down on the ground where she stands, to pick up again like any sigil.
    const id = stackBottom(s)!.id;
    if (c.dropRelic) {
      c.dropRelic(id, witch.x, witch.z);
      dropRelic(s, id);
      s.events.push({ kind: "relicDropped", id, x: witch.x, z: witch.z, at: time });
      return "place";
    }
  } else if (s.stack.length) {
    const id = s.stack[s.stack.length - 1];
    // A party legend's (the Easter egg): put down, it's let go where it stands, dancing (its rune at its feet), and she's free.
    if (byId(id).partyLegend) { s.stack.pop(); letPartyLegendGo(byId(id)); s.events.push({ kind: "placed", id, x: byId(id).x, z: byId(id).z, at: time }); return "place"; }
    else if (spot) {
      if (spot.at) { s.stack.pop(); s.placed.push({ id, x: spot.at.x, z: spot.at.z, at: time }); s.events.push({ kind: "placed", id, x: spot.at.x, z: spot.at.z, at: time }); return "place"; }
      // (no allowed free cell near her: nothing)
    } else if (blocked(s, witch.x, witch.z, t)) s.events.push({ kind: "fizzled", id, x: witch.x, z: witch.z, at: time });
    else {
      s.stack.pop();
      s.placed.push({ id, x: witch.x, z: witch.z, at: time });
      s.events.push({ kind: "placed", id, x: witch.x, z: witch.z, at: time });
      return "place";
    }
  }
  return null;
}

/** The hex cell (axial q, r) nearest (x, z), on a world-fixed grid `size` metres between neighbours (rows along x, each
 *  half a cell over from the last, size × √3/2 apart). */
export function hexCell(x: number, z: number, size: number): { q: number; r: number } {
  const fr = z / (size * Math.sqrt(3) / 2), fq = x / size - fr / 2, fs = -fq - fr;
  let q = Math.round(fq), r = Math.round(fr);
  const s = Math.round(fs), dq = Math.abs(q - fq), dr = Math.abs(r - fr), ds = Math.abs(s - fs);
  if (dq > dr && dq > ds) q = -r - s; else if (dr > ds) r = -q - s;
  return { q, r };
}
/** The middle of hex cell (q, r). */
export const hexCentre = (q: number, r: number, size: number) => ({ x: size * (q + r / 2), z: size * (Math.sqrt(3) / 2) * r });

/** The sigil button on the hex grid at (x, z): `taken`, the placed sigil (its index) in the cell nearest her, else -1; `at`,
 *  where a sigil goes down: that cell, or, if it's barred, the nearest free one that isn't within two cells (null: none). */
export function hexSpot(s: LeashState, x: number, z: number, size: number, barred: (x: number, z: number) => boolean = () => false): { taken: number; at: { x: number; z: number } | null } {
  const key = (q: number, r: number) => `${q},${r}`, held = new Map<string, number>();
  s.placed.forEach((p, i) => { const h = hexCell(p.x, p.z, size), k = key(h.q, h.r), o = held.get(k); if (o === undefined || Math.hypot(p.x - x, p.z - z) < Math.hypot(s.placed[o].x - x, s.placed[o].z - z)) held.set(k, i); });
  const h0 = hexCell(x, z, size), taken = held.get(key(h0.q, h0.r)) ?? -1;
  if (taken >= 0) return { taken, at: null };
  const c0 = hexCentre(h0.q, h0.r, size);
  if (!barred(c0.x, c0.z)) return { taken: -1, at: c0 };
  let best: { x: number; z: number } | null = null, bd = Infinity;
  for (let dq = -2; dq <= 2; dq++) for (let dr = -2; dr <= 2; dr++) {
    if (Math.abs(dq + dr) > 2) continue; // (two rings round it)
    const q = h0.q + dq, r = h0.r + dr, c = hexCentre(q, r, size), d = Math.hypot(c.x - x, c.z - z);
    if (d < bd && !held.has(key(q, r)) && !barred(c.x, c.z)) { bd = d; best = c; }
  }
  return { taken: -1, at: best };
}

/** Whether a sigil put down at (x, z) would land on another. */
export const blocked = (s: LeashState, x: number, z: number, t: Tuning) => s.placed.some(p => Math.hypot(p.x - x, p.z - z) < t.leash.spacing);

/** A leashed creature (`pace`: a legend buff's speed-up for those following her): out of range, it hurries back toward its leash point (at its run speed,
 *  never teleporting); in range, it roams round it, within the leash, pausing now and then. */
export function stepLeashed(c: Creature, px: number, pz: number, dt: number, t: Tuning, pace = 1): void {
  const L = t.leash, len = L.length, far = Math.hypot(c.x - px, c.z - pz) > len;
  if (far) {
    // Head for a spot inside the leash on its own side of the point.
    const d = Math.hypot(c.x - px, c.z - pz), k = (len * 0.5) / d;
    c.tx = px + (c.x - px) * k; c.tz = pz + (c.z - pz) * k;
    c.rest = 0;
  } else if (c.rest > 0) { c.rest -= dt; c.moving = false; c.away = false; return; }
  else if (Math.hypot(c.tx - px, c.tz - pz) > len * 0.85 || Math.hypot(c.tx - c.x, c.tz - c.z) < 0.05) {
    if (Math.hypot(c.tx - c.x, c.tz - c.z) < 0.05) c.rest = 0.5 + c.rand() * 2;
    const a = c.rand() * Math.PI * 2, r = Math.sqrt(c.rand()) * len * 0.8;
    c.tx = px + Math.cos(a) * r; c.tz = pz + Math.sin(a) * r;
    if (c.rest > 0) { c.moving = false; c.away = false; return; }
  }
  const dx = c.tx - c.x, dz = c.tz - c.z, d = Math.hypot(dx, dz);
  if (d < 1e-4) { c.moving = false; return; }
  const speed = (far ? leashSpeed(c, t) : c.speed * 1.5) * pace;
  const step = Math.min(d, speed * dt);
  c.x += (dx / d) * step; c.z += (dz / d) * step;
  if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
  c.away = facingAway(dx, dz, c.away, 0, t);
  c.moving = true;
  c.walk += dt * (far ? gaitRate(speed) : 4);
}

/** How fast a party animal runs to keep up with its leash (legends still slow); berries.ts uses
 *  it too, so a detour to a berry is a quick hop at the same pace (Ed, v233). */
export const leashSpeed = (c: Creature, t: Tuning): number => Math.max(c.speed, t.leash.runSpeed * speedFactor(c.species, c.level, t));
/** Walk-cycle frames a second for a pace, so the gait matches the speed (7 at the leash's 4 m/s). */
export const gaitRate = (speed: number): number => Math.max(4, speed * 1.75);
