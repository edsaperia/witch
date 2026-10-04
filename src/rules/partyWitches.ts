// Party witches (Ed, 2026-10-04): "For every active soundsystem (dancefloor ones not included),
// another witch flies in to the dancefloor. At random they will: dance on their own with a variety
// of simple moves, dance with other witches, fly around in circles, run about, talk to each other,
// drink, hug each other, hold hands... Our character will also do these things if she's left to
// idle near the dancefloor."
//
// One party witch per partified area's soundsystem (the first partyWitches.max of them, oldest
// first). She flies in from that area's side and lands on the dancefloor; if her soundsystem
// stops, she flies off. On the floor she picks an activity and holds it a while (activityMin to
// activityMax seconds): dancing alone, a pair activity with a free witch near her (dancing
// together, a hug, a high five, holding hands and wandering, a conga, a toast), chatting in a
// group of two or three, a drink, running about, resting on the ground, or a few laps flown over
// the floor. A player standing still on foot near the floor for idleAfter seconds joins in
// (alone, or with a free party witch near her); any input stops it at once. Pairs stand where
// they meet; the view lines their sprites up by the art's anchors. Dance moves keep to the beat
// in the view. No drawing here, and no single-witch assumption: players are passed in.
import { rng } from "./random";
import type { Tuning } from "./tuning";

export type Activity = "dance" | "pair" | "chat" | "drink" | "run" | "rest" | "fly";
export const ACTIVITIES: Activity[] = ["dance", "pair", "chat", "drink", "run", "rest", "fly"];
/** The art's poses for each activity (art/witch.js WITCH_FOOT_POSES). */
export const POSES: Record<Activity, string[]> = {
  dance: ["twoStep", "bounce", "shuffle", "spin", "headbang", "jump"],
  pair: ["dancePair", "hug", "highFive", "holdHands", "conga", "drink", "twirl", "limboHold"],
  chat: ["laugh"],
  drink: ["drink"],
  run: ["run"],
  rest: ["sitGround", "stargaze"],
  fly: ["fly"],
};

export type PartyWitchState = "arriving" | "floor" | "leaving";

export interface PartyWitch {
  id: number;
  /** Her look (art/witch.js partyWitch(seed)). */
  seed: number;
  /** The partified area whose soundsystem brought her. */
  area: string;
  x: number; y: number; z: number;
  facing: 1 | -1;
  away: boolean;
  state: PartyWitchState;
  /** Game time her flight in or out began. */
  since: number;
  /** Her flight's ends (arriving: from the area's side to her spot on the floor; leaving: back). */
  from: { x: number; z: number };
  to: { x: number; z: number };
  activity: Activity;
  pose: string;
  /** Game time her activity ends. */
  until: number;
  /** Her partner in a pair or chat (a party witch's id, or -1 - a player's index), or null. */
  partner: number | null;
  /** In a pair, the one who leads (walks; the other keeps beside her). */
  lead: boolean;
  /** The broom limbo's dancer: under the bar held by her partner (the holder) and the holder's helper. */
  third?: boolean;
  /** Where she's heading on foot (running, wandering hand in hand). */
  tx: number; tz: number;
}

/** What the partner does in a pair whose lead does this (art/witch.js WITCH_PAIRS partnerPose). */
export const PARTNER_POSE: Record<string, string> = { twirl: "twirled", limboHold: "limboHelp" };

/** A player on foot near the floor, idling into the party. */
export interface PlayerIdle { still: number; activity: Activity | null; pose: string | null; partner: number | null; until: number; facing: 1 | -1 }

export interface PartyWitches {
  list: PartyWitch[];
  nextId: number;
  players: PlayerIdle[];
  rand: () => number;
}

/** What the party witches need to know about a player this step. */
export interface PlayerView { x: number; z: number; onFoot: boolean; moving: boolean }

/** The dancefloor: its centre and radius (metres). */
export interface Floor { x: number; z: number; radius: number }

export const newPartyWitches = (seed: number): PartyWitches => ({ list: [], nextId: 0, players: [], rand: rng(seed * 7919 + 61) });

const pick = <T>(r: () => number, a: T[]): T => a[Math.floor(r() * a.length) % a.length];

function pickActivity(r: () => number, t: Tuning, allowed: Activity[]): Activity {
  const W = t.partyWitches.weights as Record<Activity, number>;
  const total = allowed.reduce((s, a) => s + (W[a] ?? 0), 0);
  let k = r() * total;
  for (const a of allowed) { k -= W[a] ?? 0; if (k <= 0) return a; }
  return allowed[0];
}

const duration = (r: () => number, t: Tuning, a: Activity) => {
  const P = t.partyWitches, base = P.activityMin + r() * (P.activityMax - P.activityMin);
  return a === "pair" ? base * 0.6 : a === "fly" ? base * 0.8 : base;
};

/** Somewhere on the floor, inside floorShare of its radius (the speakers stand round its rim). */
function spot(r: () => number, floor: Floor, t: Tuning): { x: number; z: number } {
  const a = r() * Math.PI * 2, d = Math.sqrt(r()) * floor.radius * t.partyWitches.floorShare;
  return { x: floor.x + Math.cos(a) * d, z: floor.z + Math.sin(a) * d };
}

function keepOnFloor(w: { x: number; z: number }, floor: Floor, t: Tuning): void {
  const dx = w.x - floor.x, dz = w.z - floor.z, d = Math.hypot(dx, dz), R = floor.radius * t.partyWitches.floorShare;
  if (d > R) { w.x = floor.x + (dx / d) * R; w.z = floor.z + (dz / d) * R; }
}

const free = (w: PartyWitch) => w.state === "floor" && w.partner === null && w.activity !== "fly";

/** Start a new activity for a party witch (and, for a pair or a chat, for a free witch near her). */
function begin(s: PartyWitches, w: PartyWitch, time: number, floor: Floor, t: Tuning): void {
  const r = s.rand, P = t.partyWitches;
  let a = pickActivity(r, t, ACTIVITIES);
  if (a === "pair" || a === "chat") {
    // A free witch near her, or it's a dance alone after all.
    let best: PartyWitch | null = null, bd = P.pairRange;
    for (const o of s.list) if (o !== w && free(o)) { const d = Math.hypot(o.x - w.x, o.z - w.z); if (d < bd) { bd = d; best = o; } }
    if (!best) a = "dance";
    else {
      let pose = pick(r, POSES[a]);
      const until = time + duration(r, t, a);
      // The broom limbo needs a third witch to dance under the bar; without one, they dance together.
      let dancer: PartyWitch | null = null;
      if (pose === "limboHold") {
        let dd = P.pairRange;
        for (const o of s.list) if (o !== w && o !== best && free(o)) { const d = Math.hypot(o.x - w.x, o.z - w.z); if (d < dd) { dd = d; dancer = o; } }
        if (!dancer) pose = "dancePair";
      }
      for (const [m, lead] of [[w, true], [best, false]] as const) Object.assign(m, { activity: a, pose: lead ? pose : PARTNER_POSE[pose] ?? pose, until, partner: (lead ? best : w).id, lead, third: false });
      if (dancer) Object.assign(dancer, { activity: a, pose: "limbo", until, partner: w.id, lead: false, third: true, facing: w.facing, away: false, since: time });
      // Face each other; holding hands they stand side by side facing us; a conga is a line, same way round.
      w.facing = best.x >= w.x ? 1 : -1;
      best.facing = pose === "conga" ? w.facing : (w.facing === 1 ? -1 : 1);
      w.away = best.away = false;
      const tgt = spot(r, floor, t); w.tx = tgt.x; w.tz = tgt.z;
      return;
    }
  }
  w.activity = a; w.pose = pick(r, POSES[a]); w.until = time + duration(r, t, a); w.partner = null; w.lead = false;
  if (a === "run" || a === "fly") { const tgt = spot(r, floor, t); w.tx = tgt.x; w.tz = tgt.z; }
}

/** Let go of a pair (both pick something new when it's their turn). */
function release(s: PartyWitches, w: PartyWitch, time: number): void {
  if (w.partner === null) return;
  // A limbo holder lets her dancer go too.
  for (const o of s.list) if (o.third && o.partner === w.id) { o.partner = null; o.third = false; o.until = Math.min(o.until, time); }
  const o = s.list.find(p => p.id === w.partner);
  if (o && o.partner === w.id) { o.partner = null; o.until = Math.min(o.until, time); }
  w.partner = null;
}

/** Where a partner stands beside the one who leads. */
export function pairOffset(pose: string, facing: 1 | -1, t: Tuning): { dx: number; dz: number } {
  const g = t.partyWitches.pairGap;
  return pose === "conga" ? { dx: -facing * g * 1.1, dz: 0.05 } : pose === "limboHold" ? { dx: facing * g * 2.6, dz: 0 } : { dx: facing * g, dz: 0 };
}

/**
 * One step. `areas`: the soundsystems playing now (not the dancefloor's), oldest first: each its
 * area's key and where it stands. `players`: each player on foot or not, moving or not.
 */
export function stepPartyWitches(s: PartyWitches, areas: { key: string; x: number; z: number }[], floor: Floor, players: PlayerView[], time: number, dt: number, t: Tuning): void {
  const P = t.partyWitches, r = s.rand;
  // Who should be here: one for each of the first max soundsystems playing.
  const want = new Map(areas.slice(0, P.max).map(a => [a.key, a]));
  for (const w of s.list) if (w.state !== "leaving" && !want.has(w.area)) {
    release(s, w, time);
    const a = Math.atan2(w.z - floor.z, w.x - floor.x);
    Object.assign(w, { state: "leaving", since: time, from: { x: w.x, z: w.z }, to: { x: floor.x + Math.cos(a) * P.flyFrom, z: floor.z + Math.sin(a) * P.flyFrom } });
  }
  for (const [key, a] of want) if (!s.list.some(w => w.area === key && w.state !== "leaving")) {
    // She flies in from her soundsystem's side of the floor.
    const ang = Math.atan2(a.z - floor.z, a.x - floor.x), from = { x: floor.x + Math.cos(ang) * P.flyFrom, z: floor.z + Math.sin(ang) * P.flyFrom }, to = spot(r, floor, t);
    s.list.push({ id: s.nextId++, seed: Math.floor(r() * 1e6), area: key, ...from, y: P.flyHeight, facing: to.x >= from.x ? 1 : -1, away: to.z < from.z,
      state: "arriving", since: time, from, to, activity: "dance", pose: "twoStep", until: 0, partner: null, lead: false, tx: to.x, tz: to.z });
  }
  // Flying in and out: eased along the line, coming down to land (or rising to leave).
  for (const w of s.list) {
    if (w.state === "floor") continue;
    const k = Math.min(1, (time - w.since) / P.arriveTime), e = k * k * (3 - 2 * k);
    w.x = w.from.x + (w.to.x - w.from.x) * e; w.z = w.from.z + (w.to.z - w.from.z) * e;
    w.y = w.state === "arriving" ? P.flyHeight * (1 - e) : P.flyHeight * e;
    if (k >= 1 && w.state === "arriving") { w.state = "floor"; w.y = 0; begin(s, w, time, floor, t); }
  }
  s.list = s.list.filter(w => !(w.state === "leaving" && time - w.since >= P.arriveTime));
  // On the floor: each activity, and a new one when it's done.
  for (const w of s.list) {
    if (w.state !== "floor") continue;
    if (time >= w.until) { release(s, w, time); begin(s, w, time, floor, t); }
    if (w.activity === "run") {
      const dx = w.tx - w.x, dz = w.tz - w.z, d = Math.hypot(dx, dz);
      if (d < 0.3) { const n = spot(r, floor, t); w.tx = n.x; w.tz = n.z; }
      else { const st = Math.min(d, P.runSpeed * dt); w.x += (dx / d) * st; w.z += (dz / d) * st; w.facing = dx >= 0 ? 1 : -1; w.away = dz < -Math.abs(dx); }
    } else if (w.activity === "fly") {
      // A few laps over the floor, rising and coming back down to land.
      const left = w.until - time, total = Math.max(1, duration(() => 0.5, t, "fly")), up = Math.min(1, Math.min(total - left, left) / 1.5);
      const ang = time * P.lapSpeed + w.id;
      w.x = floor.x + Math.cos(ang) * floor.radius * 0.6; w.z = floor.z + Math.sin(ang) * floor.radius * 0.6;
      w.y = P.flyHeight * 0.7 * Math.max(0, up); w.facing = -Math.sin(ang) >= 0 ? 1 : -1; w.away = Math.cos(ang) > 0.5;
    } else if (w.third && w.partner !== null) {
      // The limbo dancer shuffles along under the bar, from the holder's end to the helper's and round again.
      const o = s.list.find(p => p.id === w.partner);
      if (!o || o.pose !== "limboHold") { w.partner = null; w.third = false; continue; }
      const off = pairOffset("limboHold", o.facing, t), k = ((time - w.since) / P.limboPass) % 1;
      w.x = o.x + off.dx * (0.15 + 0.7 * k); w.z = o.z + 0.35; w.facing = o.facing;
    } else if (w.partner !== null && w.partner >= 0) {
      const o = s.list.find(p => p.id === w.partner);
      if (!o || o.partner !== w.id) { w.partner = null; continue; }
      if (w.lead) {
        if (w.pose === "holdHands") {
          // Wandering hand in hand, slowly.
          const dx = w.tx - w.x, dz = w.tz - w.z, d = Math.hypot(dx, dz);
          if (d < 0.3) { const n = spot(r, floor, t); w.tx = n.x; w.tz = n.z; }
          else { const st = Math.min(d, P.walkSpeed * dt); w.x += (dx / d) * st; w.z += (dz / d) * st; }
        }
      } else {
        // The partner keeps her place beside the one who leads, walking there if she must.
        const off = pairOffset(o.pose, o.facing, t), gx = o.x + off.dx, gz = o.z + off.dz, dx = gx - w.x, dz = gz - w.z, d = Math.hypot(dx, dz);
        if (d > 1e-3) { const st = Math.min(d, Math.max(P.walkSpeed, d * 4) * dt); w.x += (dx / d) * st; w.z += (dz / d) * st; }
      }
    }
    if (w.activity !== "fly") { w.y = 0; keepOnFloor(w, floor, t); }
  }
  // Players idling into the party.
  players.forEach((p, i) => {
    const I = (s.players[i] ??= { still: 0, activity: null, pose: null, partner: null, until: 0, facing: 1 });
    const near = Math.hypot(p.x - floor.x, p.z - floor.z) < floor.radius * P.idleReach;
    if (!p.onFoot || p.moving || !near) {
      // Any input stops it at once (her partner picks something new).
      if (I.partner !== null) { const o = s.list.find(w => w.id === I.partner); if (o && o.partner === -1 - i) { o.partner = null; o.until = time; } }
      Object.assign(I, { still: 0, activity: null, pose: null, partner: null });
      return;
    }
    I.still += dt;
    if (I.still < P.idleAfter) return;
    if (I.activity !== null && time < I.until) return;
    if (I.partner !== null) { const o = s.list.find(w => w.id === I.partner); if (o && o.partner === -1 - i) { o.partner = null; o.until = time; } I.partner = null; }
    // Alone, or with a free party witch near her.
    let a = pickActivity(r, t, ["dance", "pair", "chat", "drink", "rest"]);
    if (a === "pair" || a === "chat") {
      let best: PartyWitch | null = null, bd = P.pairRange;
      for (const o of s.list) if (free(o)) { const d = Math.hypot(o.x - p.x, o.z - p.z); if (d < bd) { bd = d; best = o; } }
      if (!best) a = "dance";
      else {
        const pose = a === "pair" ? pick(r, POSES.pair.filter(q => q !== "holdHands" && q !== "conga" && q !== "limboHold")) : "laugh", until = time + duration(r, t, a);
        I.facing = best.x >= p.x ? 1 : -1;
        Object.assign(best, { activity: a, pose: PARTNER_POSE[pose] ?? pose, until, partner: -1 - i, lead: false, facing: I.facing === 1 ? -1 : 1, away: false });
        Object.assign(I, { activity: a, pose, until, partner: best.id });
        return;
      }
    }
    Object.assign(I, { activity: a, pose: pick(r, POSES[a]), until: time + duration(r, t, a), partner: null });
  });
  // A party witch partnered with a player keeps her place beside her.
  for (const w of s.list) if (w.state === "floor" && w.partner !== null && w.partner < 0) {
    const i = -1 - w.partner, p = players[i], I = s.players[i];
    if (!p || !I || I.partner !== w.id) { w.partner = null; continue; }
    const off = pairOffset(w.pose, I.facing, t), gx = p.x + off.dx, gz = p.z + off.dz, dx = gx - w.x, dz = gz - w.z, d = Math.hypot(dx, dz);
    if (d > 1e-3) { const st = Math.min(d, Math.max(P.walkSpeed, d * 4) * dt); w.x += (dx / d) * st; w.z += (dz / d) * st; }
  }
}
