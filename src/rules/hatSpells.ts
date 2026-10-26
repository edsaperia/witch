// The hats' spells that reach into the game (Ed, 2026-10-11; rules/spells.ts has the loadout): what a hat does when she puts
// it down (the sigil button held, rules/hat.ts putHat) or picks it up again, and while it lies there. Harvest grows a ring of
// berries round it (rules/berries.ts growRing); Dowsing points to the nearest relic for a while; Sentry and Slingshot throw
// 💌s from it (rules/invites.ts HatLetters); Gathering, picked up again, brings her sigils within its range back to her stack.
// Bramble slows the creatures near it; the Mine stuns them; the Lullaby sends wild ones to sleep (a 💌 wakes one); the
// Cyclone sweeps them round, lifts them and flings them out; Nursing heals her own. Spells may stun or slow wild and enraged
// creatures but never hurt them (Ed, 2026-10-11), and never touch hers, happy ones or legends. No drawing here.
import type { Game, Witch } from "./game";
import type { Tuning } from "./tuning";
import type { HatLetters } from "./invites";
import { growRing } from "./berries";
import { setLoadout, type SpellState } from "./spells";
import { leaveHat, wearing } from "./hat";
import { LEGEND, healBy, type Creature } from "./creatures";
import { creatureMaxHp } from "./combat";
import { relicsOut } from "./partyOver";

/** Whom a hat's spell may stun, slow or move: a wild or enraged creature, not hers, not happy, not a legend, not one running
 *  off or gone; `enraged` false leaves the enraged out too (the Lullaby: Ed's "wild creatures nearby nap"). */
export const spellTarget = (c: Creature, enraged = true): boolean =>
  !c.gone && !c.leashed && !c.boss && !c.partyLegend && c.level < LEGEND && c.state !== "happy" && !c.fleeUntil && !c.wanderTo && (enraged || !c.enraged);
/** The creatures within r of (x, z) a spell may touch. */
const targetsNear = (g: Game, x: number, z: number, r: number, enraged = true): Creature[] =>
  g.creatures.filter(c => spellTarget(c, enraged) && Math.abs(c.x - x) <= r && Math.abs(c.z - z) <= r && Math.hypot(c.x - x, c.z - z) <= r);

/** Her hat, put down at (x, z) this step: Harvest's ring grows (at most once every harvest.every seconds), Dowsing picks the
 *  nearest relic still to find. */
export function onHatPut(g: Game, W: Witch, x: number, z: number, time: number, t: Tuning): void {
  const S = W.spells;
  if (S.hat === "harvest") {
    const H = t.spells.harvest;
    if (H && (S.harvestAt === undefined || time - S.harvestAt >= H.every)) { growRing(g.berries, x, z, H.berries, H.radius, g.clock.time); S.harvestAt = time; }
  } else if (S.hat === "dowsing") {
    const D = t.spells.dowsing;
    let best = -1, bd = Infinity;
    for (const r of relicsOut(g)) {
      if (r.state !== "lying" && r.state !== "dropped") continue;
      const d = Math.hypot(r.sx - x, r.sz - z);
      if (d < bd) { bd = d; best = r.id; }
    }
    S.dowse = best >= 0 && D ? { relic: best, until: time + D.time } : undefined;
  } else if (S.hat === "mine") {
    // The Mine: a burst that stuns (never hurts) every wild and enraged creature in its reach.
    const M = t.spells.mine, now = g.clock.time;
    if (M && (S.mineAt === undefined || now - S.mineAt >= M.every)) {
      S.mineAt = now;
      for (const c of targetsNear(g, x, z, M.range)) { c.stunUntil = Math.max(c.stunUntil ?? 0, now + M.stun); c.vx = 0; c.vz = 0; c.moving = false; }
    }
  } else if (S.hat === "lullaby") {
    // The Lullaby: wild creatures in its reach (not the enraged) lie down to sleep, out of every fight, till their nap's over or a
    // 💌 lands on one (rules/creatures.ts lulled; Ed, 2026-10-12: "Wild creatures that are asleep wake up when hit with an
    // invitation").
    const L = t.spells.lullaby, now = g.clock.time;
    if (L && (S.lullAt === undefined || now - S.lullAt >= L.every)) {
      S.lullAt = now;
      for (const c of targetsNear(g, x, z, L.range, false)) {
        if (c.dazed || c.siege) continue;
        Object.assign(c, { asleep: true, napUntil: now + L.time, lulled: true, wakeUntil: undefined, fight: undefined, hunting: undefined, retreat: undefined, watchUntil: undefined, rest: 0, moving: false });
      }
    }
  } else if (S.hat === "cyclone") startCyclone(g, S, x, z, t);
}

/** Her hat, picked up again from (x, z) this step: the Gathering hat brings every sigil of hers lying within gathering.range of
 *  it back to her stack (Ed, 2026-10-11: "all sigils in range"), the nearest last (at the bottom). Returns their ids. */
export function onHatPicked(g: Game, W: Witch, x: number, z: number, time: number, t: Tuning): number[] {
  if (W.spells.hat !== "gathering" || !t.spells.gathering) return [];
  const R = t.spells.gathering.range, s = W.leash;
  const near = s.placed.filter(p => !g.creatures[p.id]?.gone && Math.hypot(p.x - x, p.z - z) <= R).sort((a, b) => Math.hypot(b.x - x, b.z - z) - Math.hypot(a.x - x, a.z - z));
  for (const p of near) {
    s.placed.splice(s.placed.indexOf(p), 1);
    s.stack.push(p.id);
    s.events.push({ kind: "picked", id: p.id, x: p.x, z: p.z, at: time });
  }
  return near.map(p => p.id);
}

/** Her hats lying in the world, each with its spell: her own (the spell she wears, `S.hat`), then those she left behind when
 *  she took a new one in her room (rules/hat.ts leaveHat). None while she's knocked out. */
export function hatsDown(W: Witch): { x: number; z: number; spell: string }[] {
  if (W.ko) return [];
  const own = W.hat.down ? [{ x: W.hat.down.x, z: W.hat.down.z, spell: W.spells.hat }] : [];
  return W.hat.left.length ? [...own, ...W.hat.left] : own;
}

/** The seer hats (Ed, 2026-10-15: the Edge-seer "shows the area edges (the glowing dotted borders, off by default since #889)",
 *  the Route-seer "a 'see the entire route' hat power as well"; "only the player wearing the hat sees the things"): whether
 *  player `player`'s witch is wearing a hat of that spell (on her head, not lying anywhere, not left behind, not while she's
 *  knocked out). Drawing only, for her own view. */
export function seerWorn(g: Game, spell: "edgeseer" | "routeseer", player = 0): boolean {
  const w = g.witches[player];
  return !!w && w.spells.hat === spell && !w.ko && wearing(w.hat);
}
/** The Edge-seer hat worn: the view draws the areas' edges (render/borders.ts), as the tuning's borders.on does for good. */
export const edgesSeen = (g: Game, player = 0): boolean => seerWorn(g, "edgeseer", player);
/** The Route-seer hat worn: the view draws the whole ley line to the route's last stone and every runestone's beacon
 *  (render/view.ts, render/view/home.ts), not just as far as the line's reveal has grown. */
export const routeSeen = (g: Game, player = 0): boolean => seerWorn(g, "routeseer", player);

/** What her hats lying about throw (rules/invites.ts): every Sentry's and Slingshot's place and numbers; undefined for none. */
export function hatLetters(down: { x: number; z: number; spell: string }[], t: Tuning): HatLetters | undefined {
  const S = t.spells.sentry, SL = t.spells.slingshot;
  const sentry = S ? down.filter(d => d.spell === "sentry").map(d => ({ x: d.x, z: d.z, ...S })) : [];
  const sling = SL ? down.filter(d => d.spell === "slingshot").map(d => ({ x: d.x, z: d.z, ...SL })) : [];
  return sentry.length || sling.length ? { sentry, sling } : undefined;
}

/** Where the Dowsing hat's pointer leads now: the relic's sigil while it's still to be found and the spell lasts; else null. */
export function dowseMarker(g: Game, s: SpellState, time: number): { x: number; z: number } | null {
  const D = s.dowse;
  if (!D || time >= D.until) return null;
  const r = relicsOut(g)[D.relic];
  return r && (r.state === "lying" || r.state === "dropped") ? { x: r.sx, z: r.sz } : null;
}

/** The Cyclone's whirlwind begins at (x, z) (Ed, 2026-10-12: "pushes creatures around in a circle, lifts them and throws them
 *  outwards"): it holds every wild and enraged creature within cyclone.radius, each at its own angle and distance. */
function startCyclone(g: Game, S: SpellState, x: number, z: number, t: Tuning): void {
  const Y = t.spells.cyclone, now = g.clock.time;
  if (!Y || (S.cyc && now - S.cyc.at < Y.every)) return;
  const held = targetsNear(g, x, z, Y.radius).map(c => ({ id: c.id, a: Math.atan2(c.z - z, c.x - x), r: Math.max(1.5, Math.hypot(c.x - x, c.z - z)) }));
  S.cyc = { at: now, x, z, held };
}

/** Where a creature held by the Cyclone is at game time `time` (null once it's landed): swept round at spin turns a second for
 *  `time` seconds, drawn in a little and lifted to `lift` metres, then flung `fling` metres outward over flingTime, coming down. */
export function cyclonePose(S: SpellState, id: number, time: number, t: Tuning): { x: number; z: number; y: number } | null {
  const C = S.cyc, Y = t.spells.cyclone;
  if (!C || !Y) return null;
  const h = C.held.find(q => q.id === id);
  const e = time - C.at;
  if (!h || e < 0 || e >= Y.time + Y.flingTime) return null;
  const k = Math.min(1, e / Y.time), a = h.a + Y.spin * Math.PI * 2 * Math.min(e, Y.time);
  if (e < Y.time) {
    const r = h.r * (1 - 0.35 * Math.sin(Math.PI * Math.min(1, k * 1.5) / 2)), y = Y.lift * Math.min(1, k * 2);
    return { x: C.x + Math.cos(a) * r, z: C.z + Math.sin(a) * r, y };
  }
  const f = (e - Y.time) / Y.flingTime, r0 = h.r * 0.65, r = r0 + (Y.fling + h.r - r0) * f;
  return { x: C.x + Math.cos(a) * r, z: C.z + Math.sin(a) * r, y: Y.lift * (1 - f * f) };
}

/** How high a creature rides the Cyclone's whirlwind now (the view lifts it by this), 0 when it isn't. */
export const cycloneLift = (S: SpellState | undefined, id: number, time: number, t: Tuning): number => (S ? cyclonePose(S, id, time, t)?.y ?? 0 : 0);

/** One step of the lasting spells of her hats lying at `down` (hatsDown): Bramble slows, Nursing heals, the Cyclone whirls (and,
 *  while it lies there, starts again every cyclone.every seconds). The Cyclone's creatures are moved here, after everything else
 *  has moved them this step, and stunned while it holds them and a moment after. */
export function stepHatSpells(g: Game, W: Witch, down: { x: number; z: number; spell: string }[], dt: number, t: Tuning): void {
  const S = W.spells, now = g.clock.time;
  for (const d of down) {
    if (d.spell === "bramble" && t.spells.bramble) {
      for (const c of targetsNear(g, d.x, d.z, t.spells.bramble.range)) c.slowUntil = Math.max(c.slowUntil ?? 0, now + 0.25);
    } else if (d.spell === "nursing" && t.spells.nursing) {
      const N = t.spells.nursing;
      for (const id of [...W.leash.stack, ...W.leash.placed.map(p => p.id)]) {
        const c = g.creatures[id];
        if (!c || c.gone || c.hp === undefined || Math.hypot(c.x - d.x, c.z - d.z) > N.range) continue;
        const max = creatureMaxHp(c);
        healBy(c, max * N.rate * dt, max, now);
      }
    } else if (d.spell === "cyclone") startCyclone(g, S, d.x, d.z, t);
  }
  const C = S.cyc, Y = t.spells.cyclone;
  if (C && Y) {
    const end = C.at + Y.time + Y.flingTime;
    for (const h of C.held) {
      const c = g.creatures[h.id];
      if (!c || c.gone || !spellTarget(c)) continue;
      const p = cyclonePose(S, h.id, now, t);
      if (!p) continue;
      c.x = p.x; c.z = p.z; c.tx = p.x; c.tz = p.z; c.kx = 0; c.kz = 0; c.vx = 0; c.vz = 0; c.moving = false;
      c.stunUntil = Math.max(c.stunUntil ?? 0, end + Y.stun);
    }
    if (now >= end && S.hat !== "cyclone" && !down.some(d => d.spell === "cyclone")) S.cyc = undefined; // (done, and no Cyclone hat of hers left: let it go)
  }
}

/** Her hat's spell changed (the creator's Hat box, in her room before the night; her broom's spell is her parts' set, the
 *  Workshop's bay): the new spell, and a new hat swapped in while hers lies on the ground somewhere
 *  leaves that one where it lies, still working its old spell (Ed, 2026-10-12: "the previous one(s) stay in the world"). */
export function changeLoadout(W: Witch, hat: string): void {
  const was = W.spells.hat;
  setLoadout(W.spells, hat);
  if (W.spells.hat !== was) leaveHat(W.hat, was);
}
