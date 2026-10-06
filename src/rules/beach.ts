// Witches on the beach (Ed, 2026-10-06: "Other witches can be found on the beach occasionally; if you
// land near them, you chat, hold hands, and hug"): in witchChance of runs (seeded), a few witches
// lie about together somewhere on the sand round the circular map, resting and chatting. Landing
// within meet metres of them and keeping still (lying stargazing counts) for idleAfter seconds, the
// nearest comes over and they chat, hold hands, hug and stargaze side by side, turn seconds each,
// round again until she moves. They're party witches in all but where they are: the same looks,
// poses and pairing (rules/partyWitches.ts), drawn by their own PartyWitchView, made only once
// she's near. Most runs never come here, so nothing is done unless she's within simRange.
import { beachOf, type Bounds } from "./mapShape";
import { pairOffset, type PartyWitch, type PlayerIdle } from "./partyWitches";
import { hash2, rng } from "./random";
import type { Tuning } from "./tuning";

export interface BeachWitches {
  /** Where they lie: on the sand, a little in from the water. */
  x: number; z: number;
  list: PartyWitch[];
  /** The players with them (as the party's PlayerIdle; index 0 the first player). */
  players: PlayerIdle[];
  /** Left alone while nobody's near (its last step's answer). */
  idle: boolean;
  rand: () => number;
  /** Her turn with them: which of SEQUENCE she's at. */
  step: number;
}

/** What she and a beach witch do together, round and round, turn seconds each. */
export const SEQUENCE: { activity: PartyWitch["activity"]; pose: string }[] = [
  { activity: "chat", pose: "laugh" }, { activity: "pair", pose: "holdHands" }, { activity: "pair", pose: "hug" }, { activity: "rest", pose: "stargaze" },
];
const REST = ["sitGround", "stargaze"];

/** This run's beach witches, or null (most runs, the square map, the beach off). */
export function newBeachWitches(seed: number, bounds: Bounds, t: Tuning): BeachWitches | null {
  const B = t.beach, beach = beachOf(bounds, t);
  if (!B || !beach || hash2(seed, 77, 4111) >= B.witchChance) return null;
  const r = rng(seed * 6007 + 13), a = r() * Math.PI * 2 - Math.PI, d = beach.edge(a) - Math.min(30, B.width * 0.4); // (in from where the edge holds her)
  const nx = Math.cos(a), nz = Math.sin(a), tx = -nz, tz = nx, x = beach.x + nx * d, z = beach.z + nz * d;
  const n = Math.max(1, Math.round(B.witches[0] + r() * (B.witches[1] - B.witches[0])));
  const list: PartyWitch[] = [];
  for (let i = 0; i < n; i++) {
    const k = i - (n - 1) / 2, wx = x + tx * k * 2.2 + nx * (r() - 0.5), wz = z + tz * k * 2.2 + nz * (r() - 0.5);
    list.push({ id: i, seed: Math.floor(r() * 1e6), area: "beach", x: wx, y: 0, z: wz, facing: r() < 0.5 ? 1 : -1, away: false, state: "floor", since: 0,
      from: { x: wx, z: wz }, to: { x: wx, z: wz }, activity: "rest", pose: REST[i % 2], until: 0, partner: null, lead: false, tx: wx, tz: wz });
  }
  return { x, z, list, players: [], idle: true, rand: r, step: 0 };
}

/** What the beach witches need to know about a player this step. */
export interface BeachPlayer { x: number; z: number; onFoot: boolean; moving: boolean }

/** One step: nothing at all unless a player is within simRange. */
export function stepBeachWitches(s: BeachWitches, players: BeachPlayer[], time: number, dt: number, t: Tuning): void {
  const B = t.beach!, P = t.partyWitches, r = s.rand;
  const R2 = B.simRange * B.simRange;
  if (!players.some(p => (p.x - s.x) ** 2 + (p.z - s.z) ** 2 < R2)) { s.idle = true; return; }
  if (s.idle) { s.idle = false; for (const w of s.list) w.until = time; }
  // Her with them: still within meet of one for idleAfter seconds, the nearest comes over.
  players.forEach((p, i) => {
    const I = (s.players[i] ??= { still: 0, activity: null, pose: null, partner: null, until: 0, facing: 1 });
    let near: PartyWitch | null = null, nd = B.meet;
    for (const w of s.list) { const d = Math.hypot(w.x - p.x, w.z - p.z); if (d < nd && (w.partner === null || w.partner >= 0 || w.partner === -1 - i)) { nd = d; near = w; } }
    const mine = I.partner !== null ? s.list.find(w => w.id === I.partner) : undefined;
    if (!p.onFoot || p.moving || (!near && !mine)) {
      if (mine && mine.partner === -1 - i) { mine.partner = null; mine.until = time; }
      Object.assign(I, { still: 0, activity: null, pose: null, partner: null });
      return;
    }
    I.still += dt;
    if (I.still < B.idleAfter || (I.activity !== null && time < I.until)) return;
    const w = mine ?? near!, step = SEQUENCE[s.step % SEQUENCE.length];
    if (w.partner !== null && w.partner >= 0) { const o = s.list.find(q => q.id === w.partner); if (o && o.partner === w.id) { o.partner = null; o.until = time; } } // (leaving a chat for her)
    s.step++;
    I.facing = w.x >= p.x ? 1 : -1;
    const side = step.pose === "holdHands" || step.pose === "stargaze"; // (side by side, facing us)
    Object.assign(I, { activity: step.activity, pose: step.pose, until: time + B.turn, partner: w.id });
    Object.assign(w, { activity: step.activity, pose: step.pose, until: time + B.turn, partner: -1 - i, lead: false, facing: side ? I.facing : (I.facing === 1 ? -1 : 1), away: false });
  });
  // Among themselves: resting, and now and then two chatting.
  for (const w of s.list) {
    if (w.partner !== null && w.partner < 0) {
      // Beside her: walking over, then keeping her place (lying alongside to stargaze).
      const i = -1 - w.partner, p = players[i], I = s.players[i];
      if (!p || !I || I.partner !== w.id) { w.partner = null; w.until = time; continue; }
      const off = w.pose === "stargaze" ? { dx: I.facing * 1.3, dz: 0.2 } : pairOffset(w.pose, I.facing, t);
      const gx = p.x + off.dx, gz = p.z + off.dz, dx = gx - w.x, dz = gz - w.z, d = Math.hypot(dx, dz);
      if (d > 1e-3) { const st = Math.min(d, Math.max(P.walkSpeed, d * 2) * dt); w.x += (dx / d) * st; w.z += (dz / d) * st; }
      continue;
    }
    if (time < w.until) continue;
    if (w.partner !== null) { const o = s.list.find(q => q.id === w.partner); if (o && o.partner === w.id) { o.partner = null; o.until = time; } w.partner = null; }
    const o = s.list.find(q => q !== w && q.partner === null && time >= q.until && Math.hypot(q.x - w.x, q.z - w.z) < 4);
    const until = time + P.activityMin + r() * (P.activityMax - P.activityMin);
    if (o && r() < 0.35) {
      Object.assign(w, { activity: "chat", pose: "laugh", until, partner: o.id, lead: true, facing: o.x >= w.x ? 1 : -1 });
      Object.assign(o, { activity: "chat", pose: "laugh", until, partner: w.id, lead: false, facing: o.x >= w.x ? -1 : 1 });
    } else Object.assign(w, { activity: "rest", pose: REST[Math.floor(r() * REST.length)], until, partner: null, lead: false });
  }
}
