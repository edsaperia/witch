// The sigil button (split from rules/game.ts, no change in behaviour): what E (the gamepad's and touch's sigil button) does
// on the ground, in order: her dropped hat first (rules/hat.ts), then tonight's travel trunk (rules/finds.ts), then a flask whose sigil she stands on, drunk on the spot (a
// growth spurt: every animal following her an adult at once; Ed, 2026-10-18), else the leash's own (put a sigil down, pick one up, a happy creature's rune;
// rules/leash.ts); and a happy creature's rune near her trotting over to her. Then, after the 💌s, a sigil put down in
// a legend's clearing finishing its quest (rules/quest.ts).
import { wakeOf } from "./wakeUp";
import { atZooExit } from "./zoo";
import { mushroomButton } from "./mushrooms";
import { needsBag, takeBroom, takeInvites } from "./kit";
import { atMapTable, deckOf } from "./treehouse";
import { addFloorHat, objectAt, stepBed, useHats } from "./houseRooms";
import { runeOffset } from "./runeOffset";
import type { Controls, Game, Witch } from "./game";
import { relicsOut, worldAsleep } from "./partyOver";
import type { Tuning } from "./tuning";
import type { Creature } from "./creatures";
import { heldByCombat } from "./creatures";
import { stepLeash, type LeashEvent, type PlacedSigil } from "./leash";
import { flaskUnder } from "./legends";
import { growthSpurt } from "./berries";
import { findKind, trunkAt } from "./finds";
import { runeNear } from "./creatureStates";
import { spaceRadius } from "./spacing";
import { hatButton, putHat, wearing } from "./hat";
import { setLoadout } from "./spells";
import { questOutside, questPlaced } from "./quest";
import { onAreaDone } from "./leylines";
import { isInside } from "./mapShape";
import { cellKey, clearArea } from "./party";
import { castOn, castingStone, looseAt, looseNear, stepCast, stoneNear } from "./stoneStacks";
import { atDecks } from "./wakeUp";

/** A legend's circle flashing: a sigil or relic put down outside its clearing (the leash's outsideCircle event). */
/** How far in from the coast (m) a scattering baby stays (rules/leash.ts land). */
const BABY_COAST = 6;
export const outsideCircle = (g: Game, L: Creature) => { const c = g.map.legendClearing(L.cell[0], L.cell[1]); return { kind: "outsideCircle" as const, id: L.id, x: c?.x ?? L.x, z: c?.z ?? L.z, at: g.clock.time }; };

/** Whether the hex cell centred at (x, z) is barred to sigils (Ed, 2026-10-11): under a runestone or a soundsystem (the area's
 *  soundsystem spot, where its stone stands and its soundsystem rises), or one of home's speakers (leash.hex). */
export function sigilBarred(g: Game, x: number, z: number, t: Tuning): boolean {
  const H = t.leash.hex;
  if (!H) return false;
  const half = H.size / 2, near = (px: number, pz: number, r: number) => Math.hypot(px - x, pz - z) < r + half;
  if (g.map.dancefloor.speakers.some(p => near(p.x, p.z, H.speaker))) return true;
  for (const [, s] of g.combat.sounds) if (near(s.x, s.z, H.stone)) return true; // (home's speakers among them)
  // (the stones of the area it's in and its neighbours': home has none, its speakers above)
  const cell = g.map.cellSafe(x, z).cell, home = cellKey(g.map.centreCell);
  for (const k of [cellKey(cell), ...(g.map.neighbours.get(cellKey(cell)) ?? [])]) {
    const [cx, cy] = k.split(",").map(Number);
    if (k === home || !g.map.playable(cx, cy)) continue;
    const st = g.map.soundsystemSpot(cx, cy);
    if (near(st.x, st.z, H.stone)) return true;
  }
  return false;
}

/** Witch W's sigil button this step (her controls c, her clock ht and step hdt; the game's legends; whether a creature's
 *  busy eating or evolving; the rules' fixed step). Its events join the leash's, after the leash's own step. */
export function stepSigilButton(g: Game, c: Controls, W: Witch, t: Tuning, ht: number, hdt: number, _legends: number[], busy: (id: number) => boolean, step: number, guards: PlacedSigil[] = []): void {
  // (the relic button's events: added after the leash's step, which starts its events afresh)
  const relicEvents: LeashEvent[] = [];
  // The sigil button by a lying relic picks it up; carrying one, by a sleeping legend, puts it down there (rules/legends.ts).
  let sigil = !!c.sigil && !W.ko, place = !!c.place && !W.ko;
  // Keyboard names it place; gamepad/touch expose the same game.use action as sigil.
  if (!g.cauldron && mushroomButton(g, W, sigil || place, sigil || place)) { sigil = false; place = false; }
  // On the treehouse deck (rules/treehouse.ts) nothing goes down or comes up: there's nothing of hers up there. E at the map
  // table opens the sea chart (Ed, 2026-10-11: "The world map is in the centre").
  const perched = !!W.body.perch, deck = perched ? deckOf(g.map, t) : null;
  if (perched) {
    const inHouse = !!deck?.house?.rooms && W.body.mode === "ground" && !W.body.seated && !W.ko, x = W.body.x, z = W.body.z;
    // In the house's rooms (rules/houseRooms.ts; Ed, 2026-10-19): E at an object uses it (main.ts opens what it opens); the hats'
    // floor's hats are picked up and put down; E held at the bed fills its ring, and full, she sleeps: the night's over.
    const at = inHouse ? objectAt(deck!, x, z) : null;
    if ((sigil || place) && deck && W.body.mode === "ground" && !W.body.seated && atMapTable(deck, x, z)) relicEvents.push({ kind: "chart", id: W.id, x: deck.x, z: deck.z, at: ht });
    else if ((sigil || place) && at && at.use.kind === "hats") { const e = useHats(W, deck!, x, z, ht, t.leash.runeRadius); if (e) relicEvents.push(e); }
    else if ((sigil || place) && at && at.use.kind !== "bed" && at.use.kind !== "scenery") {
      // her night's kit (rules/kit.ts): E at the invitations desk, tonight's invitations; at the lathe, a broom
      if (at.use.kind === "invites" && needsBag(W)) relicEvents.push({ kind: "needBag", id: W.id, x: deck!.x + at.x, z: deck!.z + at.z, at: ht, obj: at.id }); // (no bag to carry them: the desk says so, rules/kit.ts NEED_BAG)
      else if (at.use.kind === "invites" ? takeInvites(W) : at.id === "lathe" && takeBroom(g, W)) relicEvents.push({ kind: "kit", id: W.id, x: deck!.x + at.x, z: deck!.z + at.z, at: ht, obj: at.use.kind === "invites" ? "invites" : "broom" });
      relicEvents.push({ kind: "house", id: W.id, x: deck!.x + at.x, z: deck!.z + at.z, at: ht, obj: at.id });
      const waking = wakeOf(g, W); if (at.id === "dressingTable" && waking) waking.styled = true; // (her skin and hair seen to: the first morning's first step, rules/guidance.ts)
    }
    if ((inHouse || W.house) && stepBed(W, at?.use.kind === "bed", !!c.sigilHeld && inHouse, ht).slept && g.witches.every(w => w.house?.slept)) relicEvents.push({ kind: "house", id: W.id, x, z, at: ht, obj: "slept" });
    sigil = false; place = false;
  } else if (W.house?.bedFrom !== undefined) delete W.house.bedFrom;
  // E at the zoo's little treehouse takes her out of the zoo (Ed, 2026-10-26; rules/zoo.ts atZooExit; app/zooExit.ts does the leaving).
  if (!perched && (sigil || place) && g.map.zoo?.layout && atZooExit(g.map, W.body)) { g.zooExit ??= ht; sigil = false; place = false; }
  const onFoot = W.body.mode === "ground" && !W.body.seated && !perched && !W.ko;
  const pressed = (sigil || place) && W.body.mode === "ground" && !W.body.seated;
  // Her hat first (rules/hat.ts): lying on a sigil or a relic's, the press picks up the hat, and the next the sigil.
  // Bare-headed by another hat of hers left lying (Ed, 2026-10-12), she puts that one on, and its spell is hers.
  // The hat button (the pad's triangle, Ed 2026-10-15: "her hat is placed and picked up with triangle"): the same pick-up, else,
  // wearing it, her hat goes down at her feet at once.
  const hatPress = !!c.hat && onFoot;
  const worn = (sigil || place || hatPress) && W.body.mode === "ground" ? hatButton(W.hat, W.body.x, W.body.z, t.leash.runeRadius, W.spells.hat) : null;
  if (worn !== null) {
    if (worn !== W.spells.hat) setLoadout(W.spells, worn);
    sigil = false; place = false;
    relicEvents.push({ kind: "hatPicked", id: W.id, x: W.body.x, z: W.body.z, at: ht }); // (after the leash's step, which starts its events afresh)
  } else if (hatPress && wearing(W.hat)) {
    W.hat.down = { x: W.body.x, z: W.body.z, at: ht }; delete W.hat.hold;
    relicEvents.push({ kind: "hatPut", id: W.id, x: W.body.x, z: W.body.z, at: ht });
  }
  // Tonight's find (rules/finds.ts; Ed, 2026-10-21): the travel trunk, or a wreck (Ed, 2026-10-23); E at it while the party's on
  // takes what's in it, hers for the night (on loan till she sleeps: app/loan.ts; the kind's claim, if it has one: a broom part waits at the Workshop, not fitted).
  const trunk = (sigil || place) && onFoot && !worldAsleep(g) ? trunkAt(g.trunk, W.body.x, W.body.z) : null; // (not there in the world asleep: the afterparty, or before the party, Ed 2026-10-26)
  if (trunk) {
    trunk.found = true; sigil = false; place = false;
    findKind(trunk.kind).claim?.(W.spells, trunk.item!);
    if (trunk.kind === "hat") addFloorHat(W, trunk.item!);
    relicEvents.push({ kind: "found", id: W.id, x: trunk.x, z: trunk.z, at: ht, obj: trunk.item!, find: trunk.kind });
  }
  // At a runestone with its stack (rules/stoneStacks.ts; Ed, 2026-10-28): the sigil button held casts the soundsystem spell, and
  // nothing else is put down or picked up there (no hat put down by the hold, no run).
  const stone = !perched && onFoot ? castingStone(g, W) : null;
  stepCast(g, W, !!stone && (!!c.sigilHeld || sigil || place), ht, hdt, cell => {
    const a = clearArea(g.party, g.map, cell, g.clock.time);
    if (a?.soundsystem) g.waveEvents.push({ kind: "areaCleared", key: cellKey(cell), x: a.soundsystem.x, z: a.soundsystem.z, at: g.clock.time });
  }, relicEvents); // (after the leash's step, which starts its events afresh)
  if (stone) { sigil = false; place = false; }
  // A run (rules/leash.ts, Ed 2026-10-15): the button held since a press that picked up keeps picking up (a lying relic's sigil too);
  // held since one that put down, nothing here (the leash puts the next down as she enters an empty hex).
  const held = !!c.sigilHeld && onFoot && !stone, run = held && t.leash.runs !== false ? W.leash.run?.kind : undefined;
  if ((sigil || place) && W.body.mode === "ground" && !run) {
    // A flask's sigil under her (Ed, 2026-10-18: "All flasks give growth spurt (all creatures following you become adults)"):
    // drunk on the spot, not carried. Every animal following her (on her stack, not parked at a sigil) younger than an adult
    // becomes one at once; with none to grow, nothing happens but the refusal's sound, and the flask stays where it lies.
    const f = flaskUnder(relicsOut(g), W.body.x, W.body.z, t.leash.runeRadius);
    if (f) {
      sigil = false; place = false;
      const grown = growthSpurt(g.berries, g.creatures, W.leash.stack, g.clock.time);
      if (grown > 0) { Object.assign(f, { state: "used", x: W.body.x, z: W.body.z }); relicEvents.push({ kind: "flaskDrunk", id: f.id, x: W.body.x, z: W.body.z, at: ht }); }
      else relicEvents.push({ kind: "fizzled", id: f.id, x: W.body.x, z: W.body.z, at: ht });
    }
  }
  const sharedPlaced = g.witches.length > 1 ? {
    sigils: g.witches.flatMap(w => w === W ? [] : w.leash.placed),
    take(id: number) { for (const w of g.witches) if (w !== W) { const i = w.leash.placed.findIndex(p => p.id === id); if (i >= 0) w.leash.placed.splice(i, 1); } },
  } : undefined;
  stepLeash(W.leash, g.creatures, { sigil, place, held, sharedPlaced, cycle: !!c.cycle && !W.ko, cycleBack: !!c.cycleBack && !W.ko, rune: (x, z, r) => runeNear(g.creatures, x, z, r, g.clock.time, undefined, k => runeOffset(k, t)), dropRelic: (id, x, z) => Object.assign(g.relics[id], { state: "dropped", sx: x, sz: z }), inviteNearest: c.inviteNearest, barred: (x, z) => sigilBarred(g, x, z, t) || looseAt(g.loose, x, z, t),
    loose: (x, z, r) => { const i = looseNear(g.loose, x, z, r); if (i < 0) return null; const p = g.loose[i], L = g.creatures[p.id]; return { id: p.id, x: p.x, z: p.z, ...(p.legend ? { tether: Math.hypot(p.x - L.x, p.z - L.z) } : {}) }; },
    takeLoose: id => { g.loose = g.loose.filter(p => p.id !== id); g.creatures[id].loose = undefined; },
    dropTether: (id, x, z) => { g.loose.push({ id, x, z, at: g.clock.time, legend: true }); g.creatures[id].loose = true; }, land: (x, z) => isInside(g.map.bounds, x, z, BABY_COAST), talk: !t.invites.on && (c.autoTalk !== false || !!c.talkHeld) }, W.body, W.body.mode === "ground" && !perched && !W.ko, ht, hdt, t, id => busy(id) || heldByCombat(g.creatures[id]) || !!g.creatures[id].travelling, guards);
  W.leash.events.push(...relicEvents);
  // Held with nothing to do (no sigil, relic, rune or hat picked up or put down, nothing refused), on the ground: her hat goes
  // down at her feet (rules/hat.ts putHat).
  // Use at an unready stump still belongs to the stump. Entering its ground also cancels an idle hold begun outside.
  const useTarget = onFoot && !!(c.hatHold ?? c.sigilHeld) && (atDecks(g, W) || (castOn(t) && !!stoneNear(g, W.body.x, W.body.z, 0, false)));
  const idle = pressed && !stone && !useTarget && !W.leash.events.some(e => e.at === ht && e.kind !== "invited" && e.kind !== "befriended" && e.kind !== "cancelled");
  if (putHat(W.hat, idle, !!(c.hatHold ?? c.sigilHeld) && onFoot && !stone && !useTarget, W.body.x, W.body.z, ht, t.leash.hatHold))
    W.leash.events.push({ kind: "hatPut", id: W.id, x: W.body.x, z: W.body.z, at: ht });
  // A happy creature's rune near her on the ground comes to her (Ed's playtest, 2026-10-06: "Floor sigils of happy creatures ... are
  // difficult to pick up"): its creature trots over (leash.runePull), so she needn't stop dead on it.
  if (W.body.mode === "ground" && !W.body.seated && !perched && !W.ko) pullRune(g, t, step, W);
}

/** A sigil put down this step in a sleeping legend's clearing finishes its quest: only the drop does (Ed, 2026-10-19: "The reward should
 *  be given when the sigil is placed, not when the animal enters the circle"; her animal of its kind walking in does nothing). */
export function questsFromPlaced(g: Game, ht: number, W: Witch = g.witches[0]): void {
  if (worldAsleep(g) || g.map.zoo) return; // (no quests once the party's over, Ed 2026-10-18, nor before it, nor in the zoo: Ed, 2026-10-26)
  // A sigil put down in a wild area whose legend dreams of that creature: the quest is done.
  for (const e of W.leash.events.slice()) if (e.kind === "placed" && e.at === ht) {
    const ids = (g.legendIds ??= g.creatures.filter(k => k.boss).map(k => k.id)), L = questPlaced(g.map, g.creatures, ids, g.friendly, k => g.party.areas.has(k), e.id, e.x, e.z, g.clock.time);
    // (the right creature, but outside its legend's clearing: a gentle cue, and nothing happens)
    if (!L) { const O = questOutside(g.map, g.creatures, ids, k => g.party.areas.has(k), e.id, e.x, e.z); if (O) W.leash.events.push(outsideCircle(g, O)); }
    if (L) questDone(g, L, e.id);
  }
}

/** A legend's quest just done (questPlaced has made it happy): the event, the ley line, the area friendly while wild, and its
 *  island found tonight (kept only if the night is won: Ed, 2026-10-18). */
function questDone(g: Game, L: Creature, joined: number): void {
  if (!g.islandsTonight.includes(L.species)) g.islandsTonight.push(L.species);
  g.questEvents.push({ kind: "done", id: L.id, joined, cell: [L.cell[0], L.cell[1]], key: cellKey(L.cell), x: L.x, z: L.z, at: g.clock.time });
  if (!g.party.areas.has(cellKey(L.cell))) onAreaDone(g.party, L.cell, g.clock.time); // (the ley line moves on: its quest done before its wave; after it, the line has moved on already)
  if (g.friendly.has(cellKey(L.cell))) befriendArea(g, cellKey(L.cell));
  g.byArea = null;
}

/** A legend's quest done while its area is wild (rules/quest.ts): the area friendly, so every wild creature of it living
 *  there now leaves her and her party be, as its newcomers will (before, only creatures grown there afterwards were,
 *  and the rest kept going for her; art builder 3, 2026-10-07). One mid-attack stops and calms: out of its fight, no
 *  longer enraged, off any siege. Hers (leashed, or parked by her) and the legend are as they were. */
export function befriendArea(g: Game, key: string): void {
  for (const c of g.creatures) {
    if (c.gone || c.leashed || c.boss || c.partyLegend || cellKey(c.cell) !== key) continue;
    c.friendly = true;
    c.enraged = false; c.fight = undefined; c.siege = undefined;
  }
  g.byArea = null;
}

/** The nearest happy creature with its rune within leash.runePull.radius of her walks toward her, till its rune is leash.runePull.stop
 *  from her. It heads for the spot that puts its rune at her feet (its rune's offset north of her: rules/runeOffset.ts), from any side (Ed, 2026-10-12: "Pull from
 *  any side"): where the straight way there passes her or one of her followers, it goes round them, on its own side. */
export function pullRune(g: Game, t: Tuning, fixed: number, W: Witch = g.witches[0]): void {
  const P = t.leash.runePull, w = W.body, c = runeNear(g.creatures, w.x, w.z, P.radius, g.clock.time, undefined, k => runeOffset(k, t));
  if (!c || c.fight?.target) return;
  const south = runeOffset(c, t);
  const gx = w.x, gz = w.z - south, d = Math.hypot(gx - c.x, gz - c.z); // (it walks so its rune, south of it, comes to her)
  if (d <= P.stop) return;
  const [tx, tz] = roundAbout(g, c, gx, gz, d, W), ex = tx - c.x, ez = tz - c.z, e = Math.hypot(ex, ez) || 1;
  const step = Math.min(e === d ? d - P.stop : e, P.speed * fixed * g.timeScale);
  c.x += (ex / e) * step; c.z += (ez / e) * step; c.tx = c.x; c.tz = c.z;
  if (Math.abs(ex) > 0.02) c.facing = ex > 0 ? 1 : -1;
  c.away = ez < -Math.abs(ex); c.moving = true;
}

/** Where a pulled creature at c heads for its goal (gx, gz), d away: the goal, or, when the straight way passes within reach of her
 *  or one of her followers (the leashed near her), a waypoint beside the first of them in the way, on the side the creature is
 *  already on, far enough out to clear it (re-chosen every step, so it walks round). */
function roundAbout(g: Game, c: Creature, gx: number, gz: number, d: number, W: Witch): [number, number] {
  const w = W.body, ux = (gx - c.x) / d, uz = (gz - c.z) / d, mine = spaceRadius(c);
  let best: { t: number; ox: number; oz: number; r: number; side: number } | null = null;
  const test = (ox: number, oz: number, r: number) => {
    const rx = ox - c.x, rz = oz - c.z, t = rx * ux + rz * uz, side = rx * uz - rz * ux; // along the way, and across it (+: on its left)
    if (t <= 0 || t >= d + r * 0.5 || Math.abs(side) >= r) return;
    if (!best || t < best.t) best = { t, ox, oz, r, side };
  };
  test(w.x, w.z, mine + 1.2); // (her)
  for (const o of g.creatures) if (o !== c && o.leashed && !o.gone && Math.abs(o.x - w.x) < 14 && Math.abs(o.z - w.z) < 14) test(o.x, o.z, mine + spaceRadius(o) + 0.4);
  if (!best) return [gx, gz];
  // round it on the creature's own side: away from where the obstacle sits across the way (n = (-uz, ux), the way's left; side = -(r·n))
  const B: { t: number; ox: number; oz: number; r: number; side: number } = best, s = B.side === 0 ? (c.id % 2 ? 1 : -1) : -Math.sign(B.side), out = B.r + 0.6;
  return [B.ox + uz * s * out, B.oz - ux * s * out]; // (the obstacle less s × out along n)
}
