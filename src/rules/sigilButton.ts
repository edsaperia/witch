// The sigil button (split from rules/game.ts, no change in behaviour): what E (the gamepad's and touch's sigil button) does
// on the ground, in order: her dropped hat first (rules/hat.ts), then a relic lying there or one she carries by a sleeping
// legend (rules/legends.ts relicButton), else the leash's own (put a sigil down, pick one up, a happy creature's rune;
// rules/leash.ts); and a happy creature's rune near her trotting over to her. Then, after the 💌s, a sigil put down in
// a legend's clearing finishing its quest (rules/quest.ts).
import type { Controls, Game, Witch } from "./game";
import type { Tuning } from "./tuning";
import type { Creature } from "./creatures";
import { heldByCombat } from "./creatures";
import { stepLeash, type LeashEvent } from "./leash";
import { relicButton } from "./legends";
import { runeNear } from "./creatureStates";
import { hatButton } from "./hat";
import { questOutside, questPlaced } from "./quest";
import { onAreaDone } from "./leylines";
import { cellKey } from "./party";

/** A legend's circle flashing: a sigil or relic put down outside its clearing (the leash's outsideCircle event). */
export const outsideCircle = (g: Game, L: Creature) => { const c = g.map.legendClearing(L.cell[0], L.cell[1]); return { kind: "outsideCircle" as const, id: L.id, x: c?.x ?? L.x, z: c?.z ?? L.z, at: g.clock.time }; };

/** Witch W's sigil button this step (her controls c, her clock ht and step hdt; the game's legends; whether a creature's
 *  busy eating or evolving; the rules' fixed step). Its events join the leash's, after the leash's own step. */
export function stepSigilButton(g: Game, c: Controls, W: Witch, t: Tuning, ht: number, hdt: number, legends: number[], busy: (id: number) => boolean, step: number): void {
  // (the relic button's events: added after the leash's step, which starts its events afresh)
  const relicEvents: LeashEvent[] = [];
  // The sigil button by a lying relic picks it up; carrying one, by a sleeping legend, puts it down there (rules/legends.ts).
  let sigil = !!c.sigil && !W.ko, place = !!c.place && !W.ko;
  // Her hat first (rules/hat.ts): lying on a sigil or a relic's, the press picks up the hat, and the next the sigil.
  if ((sigil || place) && g.witch.mode === "ground" && hatButton(W.hat, g.witch.x, g.witch.z, t.leash.runeRadius)) {
    sigil = false; place = false;
    relicEvents.push({ kind: "hatPicked", id: W.id, x: g.witch.x, z: g.witch.z, at: ht }); // (after the leash's step, which starts its events afresh)
  }
  if ((sigil || place) && g.witch.mode === "ground") {
    const r = relicButton(g.relics, g.leash.relics, g.creatures, legends, g.witch.x, g.witch.z, g.clock.time, t.leash.runeRadius, g.map);
    if (r) {
      sigil = false; place = false;
      if ("picked" in r) relicEvents.push({ kind: "relicPicked", id: r.picked.id, x: r.picked.x, z: r.picked.z, at: ht });
      else if ("placed" in r) relicEvents.push({ kind: "relicPlaced", id: r.placed.id, x: r.legend.x, z: r.legend.z, at: ht });
      else relicEvents.push(outsideCircle(g, r.outside));
    }
  }
  stepLeash(g.leash, g.creatures, { sigil, place, cycle: !!c.cycle && !W.ko, rune: (x, z, r) => runeNear(g.creatures, x, z, r, g.clock.time), inviteNearest: c.inviteNearest, talk: !t.invites.on && (c.autoTalk !== false || !!c.talkHeld) }, g.witch, g.witch.mode === "ground" && !W.ko, ht, hdt, t, id => busy(id) || heldByCombat(g.creatures[id]) || !!g.creatures[id].travelling);
  g.leash.events.push(...relicEvents);
  // A happy creature's rune near her on the ground comes to her (Ed's playtest, 2026-10-06: "Floor sigils of happy creatures ... are
  // difficult to pick up"): its creature trots over (leash.runePull), so she needn't stop dead on it.
  if (g.witch.mode === "ground" && !g.witch.seated && !W.ko) pullRune(g, t, step);
}

/** A sigil put down this step in a sleeping legend's clearing finishes its quest. */
export function questsFromPlaced(g: Game, ht: number): void {
  // A sigil put down in a wild area whose legend dreams of that creature: the quest is done.
  for (const e of g.leash.events.slice()) if (e.kind === "placed" && e.at === ht) {
    const ids = (g.legendIds ??= g.creatures.filter(k => k.boss).map(k => k.id)), L = questPlaced(g.map, g.creatures, ids, g.friendly, k => g.party.areas.has(k), e.id, e.x, e.z, g.clock.time);
    // (the right creature, but outside its legend's clearing: a gentle cue, and nothing happens)
    if (!L) { const O = questOutside(g.map, g.creatures, ids, k => g.party.areas.has(k), e.id, e.x, e.z); if (O) g.leash.events.push(outsideCircle(g, O)); }
    if (L) {
      g.questEvents.push({ kind: "done", id: L.id, joined: e.id, cell: [L.cell[0], L.cell[1]], key: cellKey(L.cell), x: L.x, z: L.z, at: g.clock.time });
      if (!g.party.areas.has(cellKey(L.cell))) onAreaDone(g.party, L.cell, g.clock.time); // (the ley line moves on: its quest done before its wave; after it, the line has moved on already)
      g.byArea = null;
    }
  }
}

/** The nearest happy creature with its rune within leash.runePull.radius of her walks toward her, to leash.runePull.stop from her. */
export function pullRune(g: Game, t: Tuning, fixed: number): void {
  const P = t.leash.runePull, w = g.witch, c = runeNear(g.creatures, w.x, w.z, P.radius, g.clock.time);
  if (!c || c.fight?.target) return;
  const dx = w.x - c.x, dz = w.z - c.z, d = Math.hypot(dx, dz);
  if (d <= P.stop) return;
  const step = Math.min(d - P.stop, P.speed * fixed * g.timeScale);
  c.x += (dx / d) * step; c.z += (dz / d) * step; c.tx = c.x; c.tz = c.z;
  if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
  c.away = dz < -Math.abs(dx); c.moving = true;
}
