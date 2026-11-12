// The sigil button (split from rules/game.ts, no change in behaviour): what E (the gamepad's and touch's sigil button) does
// on the ground, in order: her dropped hat first (rules/hat.ts), then tonight's travel trunk (rules/finds.ts), then a flask whose sigil she stands on, drunk on the spot (a
// growth spurt: every animal following her an adult at once; Ed, 2026-10-18), else the leash's own (put a sigil down, pick one up, a happy creature's rune;
// rules/leash.ts); and a happy creature's rune near her trotting over to her. Then, after the 💌s, a sigil put down in
// a legend's clearing finishing its quest (rules/quest.ts).
import { wakeOf, settleSleepingBed } from "./wakeUp";
import { guestMotionReady } from "./onlineInputSteps";
import { houseObjectFor } from "./guestFurniture";
import { isBasin, isDressingTable } from "./clothesPile";
import { atZooExit } from "./zoo";
import { mushroomButton } from "./mushrooms";
import { needsBag, takeBroom, takeInvites } from "./kit";
import { atMapTable, deckOf } from "./treehouse";
import { addFloorHat, hatToTake, HOUSE_ROOMS, objectAt, reserveHatPoints, stepBed, useHats } from "./houseRooms";
import { runeOffset } from "./runeOffset";
import type { Controls, Game, Witch } from "./game";
import { relicsOut, worldAsleep } from "./partyOver";
import type { Tuning } from "./tuning";
import type { Creature } from "./creatures";
import { heldByCombat } from "./creatures";
import { homeArea } from "./homeArea";
import { pressPicks, stackBottom, stepLeash, toBottom, type LeashControls, type LeashEvent, type PlacedSigil } from "./leash";
import { flaskUnder } from "./legends";
import { feedKnobs, feedTarget, growthSpurt, queueBerry } from "./berries";
import { basketNear, mushroomNear } from "./mushrooms"; // (beside mushroomButton's import above: what the press takes first)
import { findKind, trunkAt } from "./finds";
import { runeNear } from "./creatureStates";
import { spaceRadius } from "./spacing";
import { hatButton, hatWithin, putHat, wearing } from "./hat";
import { setLoadout } from "./spells";
import { questOutside, questPlaced } from "./quest";
import { onAreaDone } from "./leylines";
import { isInside } from "./mapShape";
import { cellKey, clearArea } from "./party";
import { castOn, castingStone, looseAt, looseNear, stepCast, stoneNear } from "./stoneStacks";
import { chainLength } from "./chains";
import { atDecks } from "./wakeUp";
import { challengeCastAt, clearChallenge, lockedFind } from "./challenge";

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
    const candidate = inHouse ? objectAt(deck!, x, z) : null;
    const at = candidate ? houseObjectFor(g, candidate, W) : null; // (in solo a guest's bedroom's piece only says it waits: rules/guestFurniture.ts)
    if (c.hat && inHouse && HOUSE_ROOMS.layout) {
      if (wearing(W.hat)) { W.hat.down = { x, z, at: ht }; delete W.hat.hold; reserveHatPoints(W, deck!); relicEvents.push({ kind: "hatPut", id: W.id, x, z, at: ht }); }
      else { const event = useHats(W, deck!, x, z, ht, t.leash.runeRadius, 0.9, g.witches.length > 1 ? id => g.witches.some(o => o !== W && o.spells.hat === id) : undefined); if (event) relicEvents.push(event); }
    }
    if ((sigil || place) && deck && W.body.mode === "ground" && !W.body.seated && atMapTable(deck, x, z)) relicEvents.push({ kind: "chart", id: W.id, x: deck.x, z: deck.z, at: ht });
    else if ((sigil || place) && inHouse && (at?.use.kind === "hats" || (HOUSE_ROOMS.layout && hatToTake(W, deck!, x, z, t.leash.runeRadius)))) { const e = useHats(W, deck!, x, z, ht, t.leash.runeRadius, 0.9, g.witches.length > 1 ? id => g.witches.some(o => o !== W && o.spells.hat === id) : undefined); if (e) relicEvents.push(e); }
    else if ((sigil || place) && at && at.use.kind !== "bed" && at.use.kind !== "scenery") {
      // her night's kit (rules/kit.ts): E at the invitations desk, tonight's invitations; at the broom rack, a broom
      if (at.use.kind === "invites" && needsBag(W)) relicEvents.push({ kind: "needBag", id: W.id, x: deck!.x + at.x, z: deck!.z + at.z, at: ht, obj: at.id }); // (no bag to carry them: the desk says so, rules/kit.ts NEED_BAG)
      else if (at.use.kind === "invites" ? takeInvites(W) : at.use.kind === "brooms" && takeBroom(g, W)) relicEvents.push({ kind: "kit", id: W.id, x: deck!.x + at.x, z: deck!.z + at.z, at: ht, obj: at.use.kind === "invites" ? "invites" : "broom" });
      relicEvents.push({ kind: "house", id: W.id, x: deck!.x + at.x, z: deck!.z + at.z, at: ht, obj: at.id });
      const waking = wakeOf(g, W); if (isDressingTable(at.id) && waking) waking.styled = true; // (her hair seen to: a first morning's step, rules/guidance.ts)
      if (isBasin(at.id) && waking) waking.washed = true; // (the basin used: the first morning's first step, Ed 2026-11-07)
    }
    // A missing guest quantum pauses her clock; it is not a released use key.
    const slept = (W !== g.witches[1] || guestMotionReady(g)) && (inHouse || W.house) && stepBed(W, at?.use.kind === "bed", !!c.sigilHeld && inHouse, ht).slept;
    if (slept && g.witches.length > 1 && at?.use.kind === "bed") settleSleepingBed(g, W, at.id, ht);
    if (slept && g.witches.every(w => w.house?.slept)) relicEvents.push({ kind: "house", id: W.id, x, z, at: ht, obj: "slept" });
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
    if (W.house?.hatPointOrigin) reserveHatPoints(W, W.house.hatPointOrigin);
    sigil = false; place = false;
    relicEvents.push({ kind: "hatPicked", id: W.id, x: W.body.x, z: W.body.z, at: ht }); // (after the leash's step, which starts its events afresh)
  } else if (hatPress && wearing(W.hat)) {
    W.hat.down = { x: W.body.x, z: W.body.z, at: ht }; delete W.hat.hold;
    relicEvents.push({ kind: "hatPut", id: W.id, x: W.body.x, z: W.body.z, at: ht });
  }
  // Tonight's find (rules/finds.ts; Ed, 2026-10-21): the travel trunk, or a wreck (Ed, 2026-10-23); E at it while the party's on
  // takes what's in it, hers for the night (on loan till she sleeps: app/loan.ts; the kind's claim, if it has one: a broom part waits at the Workshop, not fitted).
  // (the challenge area's find is its reward, hers only as the circle's cleared: rules/challenge.ts)
  const trunk = (sigil || place) && onFoot && !worldAsleep(g) && !lockedFind(g, g.trunk) ? trunkAt(g.trunk, W.body.x, W.body.z) : null; // (not there in the world asleep: the afterparty, or before the party, Ed 2026-10-26)
  if (trunk) {
    trunk.found = true; sigil = false; place = false;
    findKind(trunk.kind).claim?.(W.spells, trunk.item!);
    if (trunk.kind === "hat") addFloorHat(W, trunk.item!);
    relicEvents.push({ kind: "found", id: W.id, x: trunk.x, z: trunk.z, at: ht, obj: trunk.item!, find: trunk.kind });
  }
  // At a runestone with its stack (rules/stoneStacks.ts; Ed, 2026-10-28): the sigil button held casts the soundsystem spell, and
  // nothing else is put down or picked up there (no hat put down by the hold, no run).
  // Or at the challenge circle, its pack all invited or run off (rules/challenge.ts; Ed, 2026-11-03: "you can go to the special place
  // and cast the music spell"): the same spell, on the circle, clearing it.
  const stone = !perched && onFoot ? castingStone(g, W) : null, ring = !stone && !perched && onFoot ? challengeCastAt(g, W) : null;
  stepCast(g, W, !!(stone ?? ring) && (!!c.sigilHeld || sigil || place), ht, hdt, cell => {
    if (ring) { clearChallenge(g); return; }
    const a = clearArea(g.party, g.map, cell, g.clock.time);
    if (a?.soundsystem) g.waveEvents.push({ kind: "areaCleared", key: cellKey(cell), x: a.soundsystem.x, z: a.soundsystem.z, at: g.clock.time });
  }, relicEvents, stone ?? ring); // (after the leash's step, which starts its events afresh)
  if (stone || ring) { sigil = false; place = false; }
  // A run (rules/leash.ts, Ed 2026-10-15): the button held since a press that picked up keeps picking up (a lying relic's sigil too);
  // held since one that put down, nothing here (the leash puts the next down as she enters an empty hex).
  const held = !!c.sigilHeld && onFoot && !stone && !ring, run = held && t.leash.runs !== false ? W.leash.run?.kind : undefined;
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
  // Feeding (Ed, 2026-11-03): a press that would feed the bottom of her stack waits to see whether it's a tap or a hold
  // (LeashState.feedHold): let go before berries.feed.hold seconds, it queues one more berry; held that long, the sigil goes down
  // (placeOnly), and, held on, a run starts as after any put-down. A press with nothing holding it (a bot's, a test's) is a tap.
  const F = feedKnobs(t);
  let placeOnly = false, heldSince: number | undefined;
  if (W.leash.feedHold !== undefined) {
    if (!onFoot || stone || ring || run) delete W.leash.feedHold;
    else if (!held) { delete W.leash.feedHold; feedBottom(g, W, t, ht, relicEvents); }
    else if (ht - W.leash.feedHold >= F.hold - 1e-9) { heldSince = W.leash.feedHold; delete W.leash.feedHold; placeOnly = true; } // (a run's leash.runAfter counts from the press)
    if (!placeOnly) { sigil = false; place = false; } else { sigil = false; place = true; }
  } else if ((sigil || place) && onFoot && !run && feedOffer(g, W, t)) {
    if (held && F.hold > 0) W.leash.feedHold = ht; else feedBottom(g, W, t, ht, relicEvents);
    sigil = false; place = false;
  }
  // A sigil pulled out of her stack by its taut chain (Ed, 2026-11-12: "only if you keep pulling it plops onto the ground as if placed";
  // rules/tautChain.ts stepPop): put down this step by the ordinary put-down, as the button would put down the bottom one. Not with a
  // press of her own this step (hers first: it's tried again next step), nor where nothing may go down (it's tried again as she moves).
  const pop = popSigil(W, onFoot && !sigil && !place && !run && !stone && !ring);
  if (pop) { place = true; placeOnly = true; }
  stepLeash(W.leash, g.creatures, { sigil, place, held: pop ? false : held, placeOnly, heldSince, ...pickControls(g, W, t), cycle: !!c.cycle && !W.ko, cycleBack: !!c.cycleBack && !W.ko, dropRelic: (id, x, z) => Object.assign(g.relics[id], { state: "dropped", sx: x, sz: z }), inviteNearest: c.inviteNearest,
    takeLoose: id => { g.loose = g.loose.filter(p => p.id !== id); g.creatures[id].loose = undefined; },
    dropTether: (id, x, z) => { g.loose.push({ id, x, z, at: g.clock.time, legend: true }); g.creatures[id].loose = true; }, land: (x, z) => isInside(g.map.bounds, x, z, BABY_COAST), talk: !t.invites.on && (c.autoTalk !== false || !!c.talkHeld) }, W.body, W.body.mode === "ground" && !perched && !W.ko, ht, hdt, t, id => busy(id) || heldByCombat(g.creatures[id]) || !!g.creatures[id].travelling, guards, homeArea(g.map));
  if (pop && !W.leash.events.some(e => e.kind === "placed" && e.id === pop.id)) { // (nowhere to go down: her stack as it was, no refusal said)
    pop.undo(); W.leash.events = W.leash.events.filter(e => !(e.kind === "fizzled" && e.id === pop.id));
  }
  W.leash.events.push(...relicEvents);
  // Held with nothing to do (no sigil, relic, rune or hat picked up or put down, nothing refused), on the ground: her hat goes
  // down at her feet (rules/hat.ts putHat).
  // Use at an unready stump still belongs to the stump. Entering its ground also cancels an idle hold begun outside.
  const useTarget = onFoot && !!(c.hatHold ?? c.sigilHeld) && (atDecks(g, W) || (castOn(t) && !!stoneNear(g, W.body.x, W.body.z, 0, false)));
  const idle = pressed && !stone && !ring && !useTarget && W.leash.feedHold === undefined && !W.leash.events.some(e => e.at === ht && e.kind !== "invited" && e.kind !== "befriended" && e.kind !== "cancelled");
  if (putHat(W.hat, idle, !!(c.hatHold ?? c.sigilHeld) && onFoot && !stone && !ring && !useTarget, W.body.x, W.body.z, ht, t.leash.hatHold))
    W.leash.events.push({ kind: "hatPut", id: W.id, x: W.body.x, z: W.body.z, at: ht });
  // A happy creature's rune near her on the ground comes to her (Ed's playtest, 2026-10-06: "Floor sigils of happy creatures ... are
  // difficult to pick up"): its creature trots over (leash.runePull), so she needn't stop dead on it.
  if (W.body.mode === "ground" && !W.body.seated && !perched && !W.ko) pullRune(g, t, step, W);
}

/** What the sigil button checks to pick up on the ground (rules/leash.ts): the floor's sigils (another witch's too, shared in co-op), the
 *  happy creatures' runes, the loose sigils, and the cells barred to sigils. */
function pickControls(g: Game, W: Witch, t: Tuning): Pick<LeashControls, "sharedPlaced" | "rune" | "loose" | "barred"> {
  return {
    sharedPlaced: g.witches.length > 1 ? {
      sigils: g.witches.flatMap(w => w === W ? [] : w.leash.placed),
      take(id: number) { for (const w of g.witches) if (w !== W) { const i = w.leash.placed.findIndex(p => p.id === id); if (i >= 0) w.leash.placed.splice(i, 1); } },
    } : undefined,
    rune: (x, z, r) => runeNear(g.creatures, x, z, r, g.clock.time, undefined, k => runeOffset(k, t)),
    loose: (x, z, r) => { const i = looseNear(g.loose, x, z, r); if (i < 0) return null; const p = g.loose[i], L = g.creatures[p.id]; return { id: p.id, x: p.x, z: p.z, ...(p.legend ? { tether: Math.max(chainLength(g.tuning), Math.hypot(p.x - L.x, p.z - L.z)) } : {}) }; },
    barred: (x, z) => sigilBarred(g, x, z, t) || looseAt(g.loose, x, z, t),
  };
}

/** What a press of the sigil button would feed now (Ed, 2026-11-03): the animal at the bottom of her stack and the berry it would go to,
 *  where it is, or null when the press would do something else. On foot on the ground, the bottom a creature's sigil with room to eat
 *  (rules/berries.ts hasRoom) and an un-taken berry within berries.feed.reach of her; and nothing the press does first in the way, in
 *  stepSigilButton's order: a mushroom or a basket, the zoo's way out, a hat of hers to pick up, tonight's find, a stump's or the
 *  challenge circle's spell, a flask's sigil, a legend's sigil she carries, a run, or something to pick up (rules/leash.ts pressPicks).
 *  The view makes that berry glow brighter and shows the key over it from this (render/feedTag.ts), so what's shown is what the press does. */
export function feedOffer(g: Game, W: Witch, t: Tuning = g.tuning): { id: number; berry: number; x: number; z: number } | null {
  const b = W.body;
  if (W.ko || b.mode !== "ground" || b.seated || b.perch || W.leash.tether || W.leash.run) return null;
  const bt = stackBottom(W.leash);
  if (bt?.kind !== "creature") return null;
  const berry = feedTarget(g.berries, g.creatures[bt.id], b.x, b.z, t);
  if (!berry) return null;
  if (!g.cauldron && (basketNear(g, W) || mushroomNear(g, W))) return null;
  if (g.map.zoo?.layout && atZooExit(g.map, b)) return null;
  if (hatWithin(W.hat, b.x, b.z, t.leash.runeRadius)) return null;
  if (!worldAsleep(g) && !lockedFind(g, g.trunk) && trunkAt(g.trunk, b.x, b.z)) return null;
  if (castingStone(g, W) || challengeCastAt(g, W)) return null;
  if (flaskUnder(relicsOut(g), b.x, b.z, t.leash.runeRadius)) return null;
  if (pressPicks(W.leash, pickControls(g, W, t), b, t)) return null;
  const p = g.berries.bushes[berry.bush];
  return { id: bt.id, berry: berry.id, x: p.x, z: p.z };
}

/** A tap that feeds: one more berry queued for the bottom of her stack (rules/berries.ts queueBerry), said by a "fed" event (or the
 *  refusal's "fizzled" when it's gone in the meantime). */
function feedBottom(g: Game, W: Witch, t: Tuning, ht: number, events: LeashEvent[]): void {
  const bt = stackBottom(W.leash), c = bt?.kind === "creature" ? g.creatures[bt.id] : null;
  const b = c ? queueBerry(g.berries, c, W.body.x, W.body.z, g.clock.time, t) : null;
  if (b && c) { const p = g.berries.bushes[b.bush]; events.push({ kind: "fed", id: c.id, x: p.x, z: p.z, at: ht }); }
  else events.push({ kind: "fizzled", id: c?.id ?? W.id, x: W.body.x, z: W.body.z, at: ht });
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
    if (c.state === "enraged") c.state = undefined; // (else it kept the enraged look, red tint and all: rules/creatureCues.ts lookOf)
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

/** The sigil her taut chain pulled out this step (W.popDue, rules/game.ts), moved to the bottom of her stack for the put-down, and how
 *  to put her stack back as it was if it couldn't go down; null if none (or `can` is false). */
function popSigil(W: Witch, can: boolean): { id: number; undo(): void } | null {
  const id = W.popDue;
  delete W.popDue;
  if (id === undefined || !can || !W.leash.stack.includes(id)) return null;
  const stack = [...W.leash.stack], relics = [...W.leash.relics], relicAt = W.leash.relicAt ? { ...W.leash.relicAt } : undefined;
  toBottom(W.leash, id);
  return { id, undo() { W.leash.stack.splice(0, W.leash.stack.length, ...stack); W.leash.relics.splice(0, W.leash.relics.length, ...relics); if (relicAt) W.leash.relicAt = relicAt; else delete W.leash.relicAt; } };
}
