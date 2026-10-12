// The sigil button (split from rules/game.ts, no change in behaviour): what E (the gamepad's and touch's sigil button) does
// on the ground, in order: her dropped hat first (rules/hat.ts), then a relic lying there or one she carries by a sleeping
// legend (rules/legends.ts relicButton), else the leash's own (put a sigil down, pick one up, a happy creature's rune;
// rules/leash.ts); and a happy creature's rune near her trotting over to her. Then, after the 💌s, a sigil put down in
// a legend's clearing finishing its quest (rules/quest.ts).
import { atMapTable, deckOf } from "./treehouse";
import type { Controls, Game, Witch } from "./game";
import type { Tuning } from "./tuning";
import type { Creature } from "./creatures";
import { heldByCombat } from "./creatures";
import { carryRelic, dropRelic, stackBottom, stepLeash, type LeashEvent } from "./leash";
import { relicButton } from "./legends";
import { runeNear } from "./creatureStates";
import { spaceRadius } from "./spacing";
import { hatButton, putHat } from "./hat";
import { questOutside, questPlaced } from "./quest";
import { onAreaDone } from "./leylines";
import { cellKey } from "./party";

/** A legend's circle flashing: a sigil or relic put down outside its clearing (the leash's outsideCircle event). */
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
export function stepSigilButton(g: Game, c: Controls, W: Witch, t: Tuning, ht: number, hdt: number, legends: number[], busy: (id: number) => boolean, step: number): void {
  // (the relic button's events: added after the leash's step, which starts its events afresh)
  const relicEvents: LeashEvent[] = [];
  // The sigil button by a lying relic picks it up; carrying one, by a sleeping legend, puts it down there (rules/legends.ts).
  let sigil = !!c.sigil && !W.ko, place = !!c.place && !W.ko;
  // On the treehouse deck (rules/treehouse.ts) nothing goes down or comes up: there's nothing of hers up there. E at the map
  // table opens the sea chart (Ed, 2026-10-11: "The world map is in the centre").
  const perched = !!g.witch.perch, deck = perched ? deckOf(g.map, t) : null;
  if (perched) {
    if ((sigil || place) && deck && g.witch.mode === "ground" && !g.witch.seated && atMapTable(deck, g.witch.x, g.witch.z)) relicEvents.push({ kind: "chart", id: W.id, x: deck.x, z: deck.z, at: ht });
    sigil = false; place = false;
  }
  const pressed = (sigil || place) && g.witch.mode === "ground" && !g.witch.seated;
  // Her hat first (rules/hat.ts): lying on a sigil or a relic's, the press picks up the hat, and the next the sigil.
  if ((sigil || place) && g.witch.mode === "ground" && hatButton(W.hat, g.witch.x, g.witch.z, t.leash.runeRadius)) {
    sigil = false; place = false;
    relicEvents.push({ kind: "hatPicked", id: W.id, x: g.witch.x, z: g.witch.z, at: ht }); // (after the leash's step, which starts its events afresh)
  }
  if ((sigil || place) && g.witch.mode === "ground") {
    // (A relic's sigil sits in her stack like the rest, Ed's playtest 2026-10-08: only the one at its bottom is given, in a
    // legend's clearing, or put down on the ground elsewhere (rules/leash.ts); with a creature's at the bottom the button puts
    // that down, in a legend's clearing too, for its quest.)
    const bottom = stackBottom(g.leash), give = bottom?.kind === "relic" ? [bottom.id] : [];
    const r = relicButton(g.relics, give, g.creatures, legends, g.witch.x, g.witch.z, g.clock.time, t.leash.runeRadius, g.map);
    if (r && "picked" in r) carryRelic(g.leash, r.picked.id);
    else if (r && "placed" in r) dropRelic(g.leash, r.placed.id);
    if (r) {
      sigil = false; place = false;
      if ("picked" in r) relicEvents.push({ kind: "relicPicked", id: r.picked.id, x: r.picked.x, z: r.picked.z, at: ht });
      else if ("placed" in r) relicEvents.push({ kind: "relicPlaced", id: r.placed.id, x: r.legend.x, z: r.legend.z, at: ht });
      else relicEvents.push(outsideCircle(g, r.outside));
    }
  }
  stepLeash(g.leash, g.creatures, { sigil, place, cycle: !!c.cycle && !W.ko, rune: (x, z, r) => runeNear(g.creatures, x, z, r, g.clock.time, undefined, t.leash.restAbove ?? 0), dropRelic: (id, x, z) => Object.assign(g.relics[id], { state: "dropped", sx: x, sz: z }), inviteNearest: c.inviteNearest, barred: (x, z) => sigilBarred(g, x, z, t), talk: !t.invites.on && (c.autoTalk !== false || !!c.talkHeld) }, g.witch, g.witch.mode === "ground" && !perched && !W.ko, ht, hdt, t, id => busy(id) || heldByCombat(g.creatures[id]) || !!g.creatures[id].travelling);
  g.leash.events.push(...relicEvents);
  // Held with nothing to do (no sigil, relic, rune or hat picked up or put down, nothing refused), on the ground: her hat goes
  // down at her feet (rules/hat.ts putHat).
  const idle = pressed && !g.leash.events.some(e => e.at === ht && e.kind !== "invited" && e.kind !== "befriended" && e.kind !== "cancelled");
  if (putHat(W.hat, idle, !!c.sigilHeld && g.witch.mode === "ground" && !g.witch.seated && !perched && !W.ko, g.witch.x, g.witch.z, ht, t.leash.hatHold))
    g.leash.events.push({ kind: "hatPut", id: W.id, x: g.witch.x, z: g.witch.z, at: ht });
  // A happy creature's rune near her on the ground comes to her (Ed's playtest, 2026-10-06: "Floor sigils of happy creatures ... are
  // difficult to pick up"): its creature trots over (leash.runePull), so she needn't stop dead on it.
  if (g.witch.mode === "ground" && !g.witch.seated && !perched && !W.ko) pullRune(g, t, step);
}

/** A sigil put down this step in a sleeping legend's clearing finishes its quest. */
export function questsFromPlaced(g: Game, ht: number): void {
  // A sigil put down in a wild area whose legend dreams of that creature: the quest is done.
  for (const e of g.leash.events.slice()) if (e.kind === "placed" && e.at === ht) {
    const ids = (g.legendIds ??= g.creatures.filter(k => k.boss).map(k => k.id)), L = questPlaced(g.map, g.creatures, ids, g.friendly, k => g.party.areas.has(k), e.id, e.x, e.z, g.clock.time);
    // (the right creature, but outside its legend's clearing: a gentle cue, and nothing happens)
    if (!L) { const O = questOutside(g.map, g.creatures, ids, k => g.party.areas.has(k), e.id, e.x, e.z); if (O) g.leash.events.push(outsideCircle(g, O)); }
    if (L) questDone(g, L, e.id);
  }
}

/** Her animals standing in a sleeping legend's clearing finish its quest as putting the sigil down there does (Ed's playtest,
 *  2026-10-07, via the coordinator: "I brought a quest animal into the legend circle and I wasn't granted the buff"): any of
 *  hers, following her (on her stack) or parked by its sigil wherever that lies, of the kind and age the legend dreams of,
 *  standing inside its circle. Every step; cheap (her animals, each against its own area's legend). */
export function questsFromStanding(g: Game): void {
  const s = g.leash;
  if (!s.stack.length && !s.placed.length) return;
  const ids = (g.legendIds ??= g.creatures.filter(k => k.boss).map(k => k.id)), partified = (k: string) => g.party.areas.has(k);
  const check = (id: number) => {
    const c = g.creatures[id];
    if (!c || c.gone || c.boss) return;
    const L = questPlaced(g.map, g.creatures, ids, g.friendly, partified, id, c.x, c.z, g.clock.time);
    if (L) questDone(g, L, id);
  };
  for (const id of s.stack) check(id);
  for (const p of s.placed) check(p.id);
}

/** A legend's quest just done (questPlaced has marked it): the event, the ley line, the area friendly while wild. */
function questDone(g: Game, L: Creature, joined: number): void {
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
 *  from her. It heads for the spot that puts its rune at her feet (restAbove north of her), from any side (Ed, 2026-10-12: "Pull from
 *  any side"): where the straight way there passes her or one of her followers, it goes round them, on its own side. */
export function pullRune(g: Game, t: Tuning, fixed: number): void {
  const P = t.leash.runePull, w = g.witch, south = t.leash.restAbove ?? 0, c = runeNear(g.creatures, w.x, w.z, P.radius, g.clock.time, undefined, south);
  if (!c || c.fight?.target) return;
  const gx = w.x, gz = w.z - south, d = Math.hypot(gx - c.x, gz - c.z); // (it walks so its rune, south of it, comes to her)
  if (d <= P.stop) return;
  const [tx, tz] = roundAbout(g, c, gx, gz, d), ex = tx - c.x, ez = tz - c.z, e = Math.hypot(ex, ez) || 1;
  const step = Math.min(e === d ? d - P.stop : e, P.speed * fixed * g.timeScale);
  c.x += (ex / e) * step; c.z += (ez / e) * step; c.tx = c.x; c.tz = c.z;
  if (Math.abs(ex) > 0.02) c.facing = ex > 0 ? 1 : -1;
  c.away = ez < -Math.abs(ex); c.moving = true;
}

/** Where a pulled creature at c heads for its goal (gx, gz), d away: the goal, or, when the straight way passes within reach of her
 *  or one of her followers (the leashed near her), a waypoint beside the first of them in the way, on the side the creature is
 *  already on, far enough out to clear it (re-chosen every step, so it walks round). */
function roundAbout(g: Game, c: Creature, gx: number, gz: number, d: number): [number, number] {
  const w = g.witch, ux = (gx - c.x) / d, uz = (gz - c.z) / d, mine = spaceRadius(c);
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
