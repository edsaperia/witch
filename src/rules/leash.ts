// Inviting and leashing (Ed, 2026-10-03; DESIGN.md, "The leash"). On the ground, the witch holds
// Talk near a creature: they chat in emoji for a while (longer for older creatures), then it is
// invited, and so leashed to her: its sigil joins the bottom of the stack above her head. The
// sigil button puts the bottom sigil down on the ground (a leash point: the creature roams within
// leash.length of it), or picks up a placed sigil she is over, back onto the bottom of the stack.
// Sigils can't be put down on top of one another. Leashes are elastic: creatures walk or run to
// their leash point at their own pace and never teleport. Legends can't be invited (for now).
// No drawing here.
import { LEGEND, type Creature } from "./creatures";
import type { Tuning } from "./tuning";
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

export type LeashEventKind = "invited" | "placed" | "picked" | "fizzled" | "cancelled";
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
  /** Talk is held this step, and whether she's off the ground (the view shows no cue then: Ed, v183). */
  held: boolean;
  heldInAir: boolean;
}

export interface LeashControls {
  /** Talk is held this frame. */
  talk: boolean;
  /** The sigil button was pressed this frame: place the bottom sigil, or pick one up. */
  sigil: boolean;
  /** Debug: invite the nearest invitable creature, however far. */
  inviteNearest?: boolean;
}

export const newLeash = (): LeashState => ({ stack: [], placed: [], talk: null, progress: new Map(), events: [], held: false, heldInAir: false });

/** Seconds of talk a creature needs: babies 3, young 6, adults 12; legends can't be invited. */
export const talkTime = (c: Creature, t: Tuning): number => t.invite.talkTime[Math.min(c.level, t.invite.talkTime.length - 1)];
/** Seconds per turn of the conversation (hers, then theirs): slower for older creatures. */
export const talkTurn = (c: Creature, t: Tuning): number => t.invite.turn[Math.min(c.level, t.invite.turn.length - 1)];
export const invitable = (c: Creature) => !c.leashed && c.level !== LEGEND;

/** Where a leashed creature's leash is fixed: the witch, or its placed sigil. */
export function leashPoint(s: LeashState, id: number, wx: number, wz: number): { x: number; z: number } | null {
  if (s.stack.includes(id)) return { x: wx, z: wz };
  const p = s.placed.find(q => q.id === id);
  return p ? { x: p.x, z: p.z } : null;
}

/** The creature she'd talk to if she held Talk now: the nearest invitable one in range, else a legend. */
export function talkTarget(creatures: Creature[], x: number, z: number, t: Tuning): Creature | null {
  return nearest(creatures, x, z, t.invite.talkRange) ?? nearest(creatures, x, z, t.invite.talkRange, true);
}

function nearest(creatures: Creature[], x: number, z: number, within: number, legends = false): Creature | null {
  let best: Creature | null = null, bd = within;
  for (const c of creatures) {
    if (c.leashed || (!legends && !invitable(c))) continue;
    const d = Math.hypot(c.x - x, c.z - z);
    if (d <= bd) { bd = d; best = c; }
  }
  return best;
}

function invite(s: LeashState, c: Creature, x: number, z: number, time: number): void {
  c.leashed = true;
  c.rest = 0;
  s.stack.push(c.id);
  s.events.push({ kind: "invited", id: c.id, x, z, at: time });
}

/** One step: talking, placing and picking up, and the leashed creatures moving. `onGround` is
 *  true only in ground mode (no inviting, placing or picking up from the treetops). */
export function stepLeash(s: LeashState, creatures: Creature[], c: LeashControls, witch: { x: number; z: number }, onGround: boolean, time: number, dt: number, t: Tuning, busy: (id: number) => boolean = () => false): void {
  s.events = [];
  s.held = c.talk; s.heldInAir = c.talk && !onGround;
  const T = t.invite, L = t.leash, byId = (id: number) => creatures[id];

  // Talking: hold Talk near a creature; letting go, leaving the ground or moving away cancels it.
  if (c.talk && onGround) {
    const cur = s.talk ? byId(s.talk.id) : null;
    if (cur && !cur.leashed && Math.hypot(cur.x - witch.x, cur.z - witch.z) <= T.cancelDistance) {
      s.talk!.t += dt;
      s.progress.set(cur.id, s.talk!.t);
      // It stops to chat, and faces her.
      cur.rest = Math.max(cur.rest, 0.2); cur.moving = false;
      cur.facing = witch.x >= cur.x ? 1 : -1;
      cur.away = witch.z < cur.z - 1;
      if (!s.talk!.refused && s.talk!.t >= s.talk!.total) { invite(s, cur, cur.x, cur.z, time); s.progress.delete(cur.id); s.talk = null; }
    } else {
      if (s.talk) s.events.push({ kind: "cancelled", id: s.talk.id, x: witch.x, z: witch.z, at: time });
      // The nearest invitable creature in range; failing that, a legend (who won't come).
      const n = nearest(creatures, witch.x, witch.z, T.talkRange) ?? nearest(creatures, witch.x, witch.z, T.talkRange, true);
      s.talk = n ? { id: n.id, refused: !invitable(n), t: s.progress.get(n.id) ?? 0, total: invitable(n) ? talkTime(n, t) : Infinity } : null;
    }
  } else if (s.talk) {
    s.events.push({ kind: "cancelled", id: s.talk.id, x: witch.x, z: witch.z, at: time });
    s.talk = null;
  }

  // Every chat she isn't in right now drains, at decayRate of the fill rate, until it's gone.
  for (const [id, p] of s.progress) {
    if (s.talk?.id === id) continue;
    const left = p - dt * T.decayRate;
    if (left <= 0 || creatures[id].leashed) s.progress.delete(id); else s.progress.set(id, left);
  }

  if (c.inviteNearest) {
    const n = nearest(creatures, witch.x, witch.z, Infinity);
    if (n) invite(s, n, n.x, n.z, time);
  }

  // The sigil button: pick up a placed sigil she's over, else put the bottom one down.
  if (c.sigil && onGround) {
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
  for (const id of s.stack) if (!busy(id)) stepLeashed(byId(id), witch.x, witch.z, dt, t);
  for (const p of s.placed) if (!busy(p.id)) stepLeashed(byId(p.id), p.x, p.z, dt, t);
}

/** Whether a sigil put down at (x, z) would land on another. */
export const blocked = (s: LeashState, x: number, z: number, t: Tuning) => s.placed.some(p => Math.hypot(p.x - x, p.z - z) < t.leash.spacing);

/** A leashed creature: out of range, it hurries back toward its leash point (at its run speed,
 *  never teleporting); in range, it roams round it, within the leash, pausing now and then. */
export function stepLeashed(c: Creature, px: number, pz: number, dt: number, t: Tuning): void {
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
  const speed = far ? Math.max(c.speed, L.runSpeed * (c.level === LEGEND ? 0.6 : 1)) : c.speed * 1.5;
  const step = Math.min(d, speed * dt);
  c.x += (dx / d) * step; c.z += (dz / d) * step;
  if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
  c.away = facingAway(dx, dz, c.away, 0, t);
  c.moving = true;
  c.walk += dt * (far ? 7 : 4);
}
