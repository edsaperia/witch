// The challenge circle's statues (Ed, 2026-11-04: "taking on the challenge area is more intentional; the creatures around it only start
// to aggro you when you go into the challenge circle. The wild creatures should somehow look like they're not invitable."; the
// tuning's `challenge.statues`):
//   - Stone. Before it starts its pack stand still in the circle, each at its post on its kind's column's radius (column / adult /
//     youth / centre: rules/challenge.ts statuePosts), "grey statues, all facing the centre of the circle" (render/view/creatures.ts),
//     their sigils grey on the columns (render/challenge.ts). Stone, they can't be invited or hit (Creature.statue: rules/game.ts
//     dormant, rules/creatureStates.ts invitableNow); a 💌 at one is refused as an enraged one refuses it (rules/affection.ts
//     blocksLetters: the crumpled letter and sfx.refused). No wild watch while they're stone or waking (rules/wildWatch.ts).
//   - The trigger: a witch setting foot on its stone floor, walking in or landing inside ("landing in the circle is the same as
//     walking in"): on the ground, on foot (not up on a deck, not knocked out), within its radius. Walking about its area outside
//     the circle, or flying over it, does nothing.
//   - The wake-up: from the next bar line, `bars` bars (4: 8 s at the steady 120 bpm) of "all the animals glow red, the sigils start
//     glowing, and after 8 seconds, they all awaken and become wild animals": awake on the bar `bars` bars on, landing with the music
//     (beats on the beat clock, rules/beat.ts, so a tempo change keeps it on a bar). The wild watch's rising warning plays over it
//     (platform/audio/sfxCues.ts, wakeAggro). Every witch off the floor before then (stepped or flown off, knocked down), it stops
//     and they stay stone.
//   - Awake: a wild pack as before, its watch already over (the hunt at once: rules/hunt.ts; kept over while they're awake, so coming
//     back there's no warning), invitable, hitting and hit, pursuing her on the ground wherever she goes as any wild pack does. Its won
//     ones roam its area out of the fight's way while it's on (Ed, 2026-11-04, on #1804: "they should roam the whole area, and avoid
//     creatures that are fighting. Do this in a simple way - we just want them out of the way of the fight"): off the circle by
//     `keepOut` m (keepWonOut), and clear of the fighters as every waiting won one is (rules/wonKeepAway.ts).
//   - The fight's end (Ed, 2026-11-04, on #1804: "only being in the outside of the area while at treetops should end the fight,
//     otherwise they pursue you and don't reset"; a knockdown still ends it): only once every witch is knocked down or up in the
//     treetops outside the challenge area do the ones not yet won walk back to their posts (`walkBack` times their pace) and turn to stone there, reset to full (no hurt, hearts, daze
//     or 💌s kept); the invited stay won (their columns stay as they were). Stepping off the floor, knocked out of the circle, walking
//     its area or on the ground outside it: they keep after her, no reset. Stepping in again starts a fresh wake-up. With two
//     witches, either starts it.
// Deterministic (online lockstep): only the beat clock, the game's time and the witches' bodies. No drawing here.
import type { Game, Witch } from "./game";
import type { Creature } from "./creatures";
import { beatAt } from "./beat";
import { holdsArea } from "./clear";
import { challengeOf, challengeOpen, columnKinds, faceMiddle, statuePosts, type ChallengeState } from "./challenge";
import { creatureValue } from "./power";
import { areaCellAt } from "./map";
import { cellKey } from "./party";
import { stateOf } from "./creatureStates";
import { pointInArea } from "./creatures";

/** Beats in a bar (the music's 4/4, as rules/game.ts reckons bars). */
const BAR = 4;

/** Whether witch W stands on the circle's stone floor: on the ground, on foot (not up on a deck, not perched, not knocked out), within
 *  its radius. Landing inside is the same as walking in; flying over it isn't on it. */
export function onFloor(ch: Pick<ChallengeState, "x" | "z" | "radius">, W: Witch): boolean {
  const b = W.body;
  return b.mode === "ground" && !b.seated && !b.perch && !W.ko && Math.hypot(b.x - ch.x, b.z - ch.z) <= ch.radius;
}

/** Whether any witch stands on its floor (two players: either). */
export const floorTaken = (g: Game, ch: ChallengeState): boolean => g.witches.some(W => onFloor(ch, W));

/** Whether witch W is out of the fight (Ed, 2026-11-04, on #1804: "only being in the outside of the area while at treetops should end
 *  the fight, otherwise they pursue you and don't reset"; and a knockdown still ends it): knocked down, or up in the treetops (not
 *  rising or coming down) over ground outside the challenge area. */
export function leftFight(g: Pick<Game, "map">, ch: Pick<ChallengeState, "key">, W: Witch): boolean {
  const b = W.body;
  return !!W.ko || (b.mode === "treetop" && cellKey(areaCellAt(g.map, b.x, b.z)) !== ch.key);
}

/** Where each of its pack stands as a statue (rules/challenge.ts statuePosts), by id. */
export function postsOf(g: Pick<Game, "challenge" | "creatures" | "map" | "tuning">): Map<number, { x: number; z: number }> {
  const ch = g.challenge;
  if (!ch) return new Map();
  return statuePosts(ch, columnKinds(g), ch.pack.map(id => g.creatures[id]).filter(Boolean), challengeOf(g.tuning).statues);
}

/** How far through its wake-up (0 at its bar line, 1 as they wake), on the beat clock; null when it isn't waking, or before its bar line. */
export function wakeK(g: Pick<Game, "challenge" | "beat" | "clock" | "tuning">): number | null {
  const st = g.challenge?.statues;
  if (!st || st.phase !== "waking" || st.wake === null) return null;
  const b = beatAt(g.beat, g.clock.time) - st.wake;
  return b < 0 ? null : Math.min(1, b / (BAR * Math.max(1, challengeOf(g.tuning).statues.bars)));
}

/** The wake-up as the wild watch's warning for the sound (platform/audio/sfxCues.ts, in place of rules/wildWatch.ts aggroOf there):
 *  how far through (0 to 1) and its danger (the ultimate challenge: 1), while it wakes from its bar line with witch `i` near enough
 *  to hear it (on its floor or within its radius again past its edge); else null. */
export function wakeAggro(g: Game, i = 0): { k: number; danger: number } | null {
  const ch = g.challenge, w = g.witches[i], k = wakeK(g);
  if (!ch || !w || k === null || w.ko || Math.hypot(w.body.x - ch.x, w.body.z - ch.z) > ch.radius * 2) return null;
  return { k, danger: 1 };
}

/** Each step, before the wild watch and the hunt (rules/game.ts): stone to waking as a witch sets foot on its floor (from the next bar
 *  line), waking to stone as the floor's left, waking to awake on its bar, awake to stone (the un-won walking back, whole) once every
 *  witch is knocked down or up in the treetops outside its area (leftFight). Nothing once it's cleared or closed (a wake-up under way stops). */
export function stepStatues(g: Game): void {
  const ch = g.challenge, st = ch?.statues;
  if (!ch || !st) return;
  if (!challengeOpen(g)) { if (st.phase === "waking") { st.phase = "stone"; st.wake = null; } return; }
  const on = floorTaken(g, ch), beat = beatAt(g.beat, g.clock.time);
  if (st.phase === "stone") {
    if (on) { st.phase = "waking"; st.wake = Math.ceil(beat / BAR - 1e-9) * BAR; } // (from the next bar line: now, if it's on one)
    return;
  }
  if (st.phase === "waking") {
    if (!on) { st.phase = "stone"; st.wake = null; return; } // (left before they woke: they stay stone)
    if (st.wake !== null && beat >= st.wake + BAR * Math.max(1, challengeOf(g.tuning).statues.bars) - 1e-9) awaken(g, ch);
    return;
  }
  if (g.witches.every(W => leftFight(g, ch, W))) { backToStone(g, ch); return; }
  // (still on: its watch kept over, so a witch coming back after a knockdown, rules/hunt.ts forgetting it, is hunted at once, no warning)
  if (!g.wildEntry.has(ch.key)) { const time = g.clock.time; g.wildEntry.set(ch.key, { at: time, until: time, last: time, danger: 1 }); }
}

/** They wake: wild, where they stand, the area's watch already over (no warning: the wake-up was it), so the hunt's at once. */
function awaken(g: Game, ch: ChallengeState): void {
  const time = g.clock.time, W = g.tuning.wildWatch;
  let F = 0;
  for (const id of ch.pack) {
    const c = g.creatures[id];
    if (!c?.statue) continue;
    Object.assign(c, { statue: undefined, seen: time, rest: 0, tx: c.x, tz: c.z, moving: false }); // (seen now: not put elsewhere for being long unseen, rules/creatures.ts)
    F += creatureValue(c);
  }
  g.wildEntry.set(ch.key, { at: time, until: time, last: time, danger: Math.min(1, F / Math.max(1, W?.dangerF ?? 90)) });
  ch.statues = { phase: "awake", wake: null, at: time };
  g.byArea = null;
}

/** Whether one of its pack goes back to stone when the floor's left: one not yet won (holding its area: wild or knocked down, not
 *  invited, not run off nor running off), not besieging. */
const unwon = (c: Creature | undefined): c is Creature => !!c && holdsArea(c) && !c.siege && !c.enraged && (c.fleeUntil === undefined || !!c.dazed);

/** Every witch knocked down or up in the treetops outside its area while they're awake: the un-won give up the fight and walk back to their posts,
 *  whole again (Ed, through the coordinator: "reset to full", no hurt, hearts, 💌s or daze kept), to turn to stone there
 *  (stepStatueWalk). The invited stay won. Its watch forgotten, its hunt over. */
function backToStone(g: Game, ch: ChallengeState): void {
  for (const id of ch.pack) {
    const c = g.creatures[id];
    if (!unwon(c)) continue;
    Object.assign(c, {
      statue: "back", hunting: undefined, fight: undefined, retreat: undefined, retreatFrom: undefined, watchUntil: undefined,
      hp: undefined, hurtAt: undefined, drops: undefined, affection: undefined, affectionAt: undefined, fills: undefined, dazed: undefined, dazedUntil: undefined,
      fleeUntil: undefined, fleeX: undefined, fleeZ: undefined, stunUntil: undefined, slowUntil: undefined, kx: undefined, kz: undefined, vx: undefined, vz: undefined,
      charge: undefined, leap: undefined, hop: undefined, hopNext: undefined, burrow: undefined, dug: undefined, swoop: undefined, brace: undefined,
      packGlow: undefined, packHide: undefined, packShell: undefined, packProwl: undefined, feintUntil: undefined, coverBy: undefined, packSync: undefined, packThrow: undefined,
      mind: undefined, taunt: undefined, engagedUntil: undefined, moveReadyAt: undefined, sprung: undefined, cheerUntil: undefined, holdT: undefined, holdAt: undefined,
      asleep: undefined, napUntil: undefined, wakeUntil: undefined, lulled: undefined, moving: false,
    });
    g.hunts?.delete(id);
  }
  g.wildEntry.delete(ch.key);
  ch.statues = { phase: "stone", wake: null, at: g.clock.time, back: true };
  g.byArea = null;
}

/** Whether one of its pack is won over and free to walk (happy, not leashed, gone, running off or dancing at its cleared floor). */
const wonFree = (c: Creature | undefined): c is Creature => !!c && !c.gone && !c.leashed && !c.statue && c.fleeUntil === undefined && stateOf(c) === "happy";
/** While they're awake (the fight on), its won ones keep off the circle (Ed, 2026-11-04, on #1804: "While the fight is going on, won
 *  creatures should avoid the circle"; "they should roam the whole area, and avoid creatures that are fighting"): their own happy roam
 *  (rules/creatures.ts), out of the fight's way as every waiting won one is (rules/wonKeepAway.ts), its targets kept `keepOut` m off
 *  the circle (one there redrawn in its area by its own seeded draws, c.rand, the same in lockstep; after 8 tries, out on the ring on
 *  its own bearing), and one on the circle walks straight out at `walkBack` times its pace. */
function keepWonOut(g: Game, ch: ChallengeState, dt: number): void {
  const S = challengeOf(g.tuning).statues, R = ch.radius + Math.max(0, S.keepOut);
  const off = (x: number, z: number) => Math.hypot(x - ch.x, z - ch.z) >= R;
  for (const id of ch.pack) {
    const c = g.creatures[id];
    if (!wonFree(c)) continue;
    if (!off(c.tx, c.tz)) {
      let ok = false;
      for (let i = 0; i < 8 && !ok; i++) { const [x, z] = pointInArea(g.map, c, c.rand); if (off(x, z)) { c.tx = x; c.tz = z; ok = true; } }
      if (!ok) { const dx = c.x - ch.x, dz = c.z - ch.z, d = Math.hypot(dx, dz) || 1; c.tx = ch.x + (dx / d) * (R + 1); c.tz = ch.z + (dz / d) * (R + 1); }
    }
    const dx = c.x - ch.x, dz = c.z - ch.z, d = Math.hypot(dx, dz);
    if (d >= R) continue;
    const ux = d > 1e-6 ? dx / d : 0, uz = d > 1e-6 ? dz / d : 1, step = Math.min(R - d + 0.05, c.speed * Math.max(1, S.walkBack) * dt);
    c.x += ux * step; c.z += uz * step;
    if (Math.abs(ux) > 0.02) c.facing = ux > 0 ? 1 : -1;
    c.away = uz < -Math.abs(ux); c.moving = true; c.walk += dt * 4; c.rest = 0;
  }
}

/** Each step, after the creatures' roam (rules/game.ts): those walking back go on toward their posts at `walkBack` times their pace,
 *  turning to stone on arriving; the stone ones stand at theirs, facing the middle; while they're awake, its won ones keep out of the
 *  circle (keepWonOut). */
export function stepStatueWalk(g: Game, dt: number): void {
  const ch = g.challenge;
  if (ch?.statues?.phase === "awake" && challengeOpen(g)) keepWonOut(g, ch, dt);
  if (!ch?.statues || !ch.pack.some(id => g.creatures[id]?.statue)) return;
  const posts = postsOf(g), S = challengeOf(g.tuning).statues;
  for (const id of ch.pack) {
    const c = g.creatures[id], p = posts.get(id);
    if (!c?.statue || !p) continue;
    if (!holdsArea(c)) { c.statue = undefined; continue; } // (won over by some other way than a 💌, a debug shot's: itself again)
    if (c.statue === "back") {
      const dx = p.x - c.x, dz = p.z - c.z, d = Math.hypot(dx, dz), step = c.speed * Math.max(0.1, S.walkBack) * dt;
      if (d > step) {
        c.x += (dx / d) * step; c.z += (dz / d) * step; c.tx = p.x; c.tz = p.z;
        if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
        c.away = dz < -Math.abs(dx); c.moving = true; c.walk += dt * 4;
        continue;
      }
      c.x = c.tx = p.x; c.z = c.tz = p.z; c.statue = "stone"; // (there: stone again)
    }
    c.moving = false; faceMiddle(c, ch.x, ch.z);
  }
}
