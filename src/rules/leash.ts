// Inviting and leashing (Ed, 2026-10-03; DESIGN.md, "The leash"). On the ground, the witch talks
// to the nearest invitable creature within invite.talkRange by herself, no button (Ed, v244),
// sticking with it while it stays within invite.cancelDistance: they chat in emoji for a while
// (longer for older creatures), moving or still, then it is invited, and so leashed to her: its sigil joins the bottom of the stack above her head. The
// sigil button puts the bottom sigil down on the ground (a leash point: the creature roams within
// leash.length of it), or picks up a placed sigil she is over, back onto the bottom of the stack.
// Sigils can't be put down on top of one another. Leashes are elastic: creatures walk or run to
// their leash point at their own pace and never teleport. Legends can't be invited (for now).
// No drawing here.
import { speedFactor, type Creature } from "./creatures";
import type { Tuning } from "./tuning";
import { befriend, invitableNow, stateOf } from "./creatureStates";
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

export type LeashEventKind = "invited" | "befriended" | "placed" | "picked" | "fizzled" | "cancelled" | "cycled" | /** a relic picked up, or put down by a legend (id: the relic) */ "relicPicked" | "relicPlaced" | /** her hat picked up and back on (rules/hat.ts; id: the witch) */ "hatPicked";
export interface LeashEvent { kind: LeashEventKind; id: number; x: number; z: number; at: number }

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
  /** Relic sigils she carries (rules/legends.ts: ids into the game's relics), newest last. */
  relics: number[];
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
  /** Debug: invite the nearest invitable creature, however far. */
  inviteNearest?: boolean;
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
export function inviteCreature(s: LeashState, c: Creature, x: number, z: number, time: number): void {
  c.leashed = true; c.state = "leashed"; c.affection = undefined; c.dazed = false; c.dazedUntil = undefined;
  c.rest = 0;
  c.wanderTo = undefined; c.siege = undefined; c.fight = undefined;
  c.friendly = undefined; c.guard = undefined; // (taking one from a friendly or guarded area weakens it: Ed's call)
  // Invited, it's whole again (Ed, 2026-10-04), with a heal pop if it was hurt.
  if (c.hp !== undefined) { c.hp = undefined; c.healedAt = time; }
  s.stack.push(c.id);
  s.events.push({ kind: "invited", id: c.id, x, z, at: time });
}

/** One step: talking, placing and picking up, and the leashed creatures moving. `onGround` is
 *  true only in ground mode (no inviting, placing or picking up from the treetops). */
export function stepLeash(s: LeashState, creatures: Creature[], c: LeashControls, witch: { x: number; z: number }, onGround: boolean, time: number, dt: number, t: Tuning, busy: (id: number) => boolean = () => false): void {
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
  if (((c.sigil && !onGround) || c.cycle) && s.stack.length > 1) {
    const id = s.stack.pop()!;
    s.stack.unshift(id);
    s.events.push({ kind: "cycled", id, x: witch.x, z: witch.z, at: time });
  }
  if ((c.sigil || c.place) && onGround) {
    let pick = -1, pd = L.pickRadius;
    s.placed.forEach((p, i) => { const d = Math.hypot(p.x - witch.x, p.z - witch.z); if (d <= pd) { pd = d; pick = i; } });
    if (pick >= 0) {
      const [p] = s.placed.splice(pick, 1);
      s.stack.push(p.id);
      s.events.push({ kind: "picked", id: p.id, x: p.x, z: p.z, at: time });
    } else if (s.stack.length) {
      const id = s.stack[s.stack.length - 1];
      if (blocked(s, witch.x, witch.z, t)) s.events.push({ kind: "fizzled", id, x: witch.x, z: witch.z, at: time });
      else {
        s.stack.pop();
        s.placed.push({ id, x: witch.x, z: witch.z, at: time });
        s.events.push({ kind: "placed", id, x: witch.x, z: witch.z, at: time });
      }
    }
  }

  // (A party animal busy with a berry, or evolving, is moved by rules/berries.ts instead.)
  for (const id of s.stack) if (!busy(id)) stepLeashed(byId(id), witch.x, witch.z, dt, t, t.leash.pace ?? 1);
  for (const p of s.placed) if (!busy(p.id)) stepLeashed(byId(p.id), p.x, p.z, dt, t);
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
