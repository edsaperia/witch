// What flies and lies about in a fight, each step (rules/combat.ts stepCombat): shots and lobs, the grammar's attacks in flight,
// beams, slime and spore patches drying, and the trails a moving trail-layer leaves. Split from stepCombat's body: the same
// sums in the same order.
import { foes, huntsWitch } from "../creatureStates";
import { FIGHT, profileOf } from "../movement";
import { attackNamed } from "./data";
import { fighting, targetable, sideOf, targetPos, sheltered } from "./targeting";
import { land, area } from "./hits";
import { ATTACK_LIB } from "../attacks/index";
import { stepSpells } from "../attacks/engine";
import { oldShotMark, spellWorld } from "../attacks/combatWorld";
import type { StepBase } from "./step";
import { commandLanded, homeShot } from "../commands/act";

/** Shots fly; each hits the first enemy (not its own kind) it reaches, or fizzles at its range. A lob lands where it was aimed. */
export function stepShots(b: StepBase): void {
  const { s, w, data, time, dt, grid } = b;
  s.shots = s.shots.filter(sh => {
    // A lob flies over everything and lands where it was aimed, hitting all of the other side there.
    if (sh.lob) {
      const L = sh.lob, k = Math.min(1, (time - L.at) / Math.max(0.01, L.lands - L.at)), ho = sh.home !== undefined ? w.creatures[sh.home] : undefined; if (ho && !ho.gone) { L.tx = ho.x; L.tz = ho.z; } // (a command's lob follows its target: rules/commands/act.ts)
      sh.x = L.fx + (L.tx - L.fx) * k; sh.z = L.fz + (L.tz - L.fz) * k;
      if (time < L.lands) return true;
      const from = w.creatures[sh.from] ?? null, a = attackNamed(sh.attack, data);
      s.events.push({ kind: "landed", x: L.tx, z: L.tz, at: time, id: sh.from });
      area(w, s, from, sh.side, sh.species, L.tx, L.tz, sh.radius, sh.damage, a, grid); if (sh.cmd) for (const o of grid.near(L.tx, L.tz, sh.radius + 1)) if (targetable(o) && foes(sideOf(o), sh.side) && Math.hypot(o.x - L.tx, o.z - L.tz) <= sh.radius + 0.3) commandLanded(s, o, sh.cmd, time); // (a command's lob: its stun or slow, rules/commands/act.ts)
      if (sh.patch) s.trails.push({ x: L.tx, z: L.tz, r: sh.patch.r, until: time + sh.patch.time, side: sh.side, slow: sh.patch.slow, from: sh.from }); // (the toad's spores: a slow patch where it lands)
      else oldShotMark(w, s, sh, L.tx, L.tz, data); // (any other: its mark, Ed 2026-11-13, rules/attacks/marks.ts)
      if (sh.sound) { const h = s.sounds.get(sh.sound.key); if (h && h.hp > 0 && Math.hypot(h.x - L.tx, h.z - L.tz) <= sh.radius + h.radius) land(w, s, from, { kind: "sound", key: sh.sound.key }, sh.sound.damage, a, L.tx, L.tz); }
      return false;
    }
    if (sh.home !== undefined) homeShot(sh, w.creatures[sh.home], dt); // (a command's shot homes: rules/commands/act.ts)
    sh.x += sh.vx * dt; sh.z += sh.vz * dt;
    if (time >= sh.until) { oldShotMark(w, s, sh, sh.x, sh.z, data); return false; } // (a miss: its mark where it ran out)
    const from = w.creatures[sh.from], a = attackNamed(sh.attack, data);
    for (const o of grid.near(sh.x, sh.z, sh.radius + 2)) {
      if (!targetable(o) || !foes(sideOf(o), sh.side) || o.species === sh.species || w.asleep(o)) continue;
      if (Math.hypot(o.x - sh.x, o.z - sh.z) <= sh.radius + 0.4 + o.level * 0.2) { land(w, s, from ?? null, { kind: "creature", id: o.id }, sh.damage, a, sh.x - sh.vx, sh.z - sh.vz); if (sh.cmd) commandLanded(s, o, sh.cmd, time); return false; }
    }
    if (huntsWitch(sh.side)) for (const v of w.witches) {
      if (!v.onGround || v.down) continue;
      if (Math.hypot(v.x - sh.x, v.z - sh.z) <= sh.radius + 0.3) { land(w, s, from ?? null, { kind: "witch", id: v.id }, sh.damage, a, sh.x, sh.z); return false; }
    }
    if (sh.side === "enraged") for (const [key, h] of s.sounds) if (h.hp > 0 && Math.hypot(h.x - sh.x, h.z - sh.z) <= h.radius + sh.radius) { land(w, s, from ?? null, { kind: "sound", key }, sh.damage, a, sh.x, sh.z); return false; }
    return true;
  });
}

/** Attacks in the grammar in flight (rules/attacks/engine.ts: a creature given one, the Fight Arena's ?attack=, or its species' own). */
export function stepSpellsInFlight(b: StepBase): void {
  const { s, w, data, time, dt, grid } = b;
  if (s.spells) stepSpells(s.spells, spellWorld(w, s, grid, s.spells.seed, data), s.attackLib ?? ATTACK_LIB, time, dt);
}

/** Beams burn along their line in ticks, sweeping after their target; a legend's spin goes all the way round. */
export function stepBeams(k: StepBase): void {
  const { s, w, data, time, dt, grid } = k;
  s.beams = s.beams.filter(b => {
    const c = w.creatures[b.from];
    if (!c || c.gone || c.fleeUntil || time >= b.until) return false;
    if (b.spin) {
      // A legend's spin: the beam goes all the way round; whatever it sweeps over is hit, once a pass.
      const prev = b.angle, a = attackNamed(b.attack, data), turn = b.spin * dt, last = (b.last ??= {}), again = (Math.PI * 2 / b.spin) * 0.8;
      b.angle += turn;
      const swept = (x: number, z: number, r: number) => { const rx = x - c.x, rz = z - c.z, dd = Math.hypot(rx, rz); if (dd > b.length + r || dd < 0.3) return false; const da = (((Math.atan2(rz, rx) - prev) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2); return da <= turn + (b.width / 2 + r) / dd; };
      const once = (key: string) => { if (last[key] !== undefined && time - last[key] < again) return false; last[key] = time; return true; };
      for (const o of grid.near(c.x, c.z, b.length + 2)) if (o !== c && targetable(o) && foes(sideOf(o), b.side) && o.species !== b.species && !w.asleep(o) && swept(o.x, o.z, 0.4 + o.level * 0.2) && once(`c${o.id}`)) land(w, s, c, { kind: "creature", id: o.id }, b.damage, a, c.x, c.z);
      if (huntsWitch(b.side)) {
        for (const v of w.witches) if (v.onGround && !v.down && swept(v.x, v.z, 0.3) && once(`w${v.id}`)) land(w, s, c, { kind: "witch", id: v.id }, b.damage, a, c.x, c.z);
        if (b.side === "enraged") for (const [key, h] of s.sounds) if (h.hp > 0 && swept(h.x, h.z, h.radius) && once(`s${key}`)) land(w, s, c, { kind: "sound", key }, b.damage, a, c.x, c.z);
      }
      return true;
    }
    const p = targetPos(w, s, b.target);
    if (p) {
      const want = Math.atan2(p.z - c.z, p.x - c.x);
      let da = ((want - b.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      const step = ((attackNamed(b.attack, data).sweep ?? 0) * Math.PI / 180) * dt;
      da = Math.max(-step, Math.min(step, da));
      b.angle += da;
    }
    if (time >= b.nextTick) {
      b.nextTick += b.tick;
      const ex = Math.cos(b.angle), ez = Math.sin(b.angle), a = attackNamed(b.attack, data);
      const hit = (x: number, z: number, r: number) => { const rx = x - c.x, rz = z - c.z, along = rx * ex + rz * ez; return along >= 0 && along <= b.length && Math.abs(-rx * ez + rz * ex) <= b.width / 2 + r; };
      for (const o of grid.near(c.x + ex * b.length / 2, c.z + ez * b.length / 2, b.length / 2 + 2)) if (o !== c && targetable(o) && foes(sideOf(o), b.side) && o.species !== b.species && !w.asleep(o) && hit(o.x, o.z, 0.4 + o.level * 0.2)) land(w, s, c, { kind: "creature", id: o.id }, b.damage, a, c.x, c.z);
      if (huntsWitch(b.side)) {
        for (const v of w.witches) if (v.onGround && !v.down && hit(v.x, v.z, 0.3)) land(w, s, c, { kind: "witch", id: v.id }, b.damage, a, c.x, c.z);
        if (b.side === "enraged") for (const [key, h] of s.sounds) if (h.hp > 0 && hit(h.x, h.z, h.radius)) land(w, s, c, { kind: "sound", key }, b.damage, a, c.x, c.z);
      }
      if (b.sound) { const h = s.sounds.get(b.sound.key); if (h && h.hp > 0 && hit(h.x, h.z, h.radius)) land(w, s, c, { kind: "sound", key: b.sound.key }, b.sound.damage, a, c.x, c.z); }
    }
    return true;
  });
}

/** Slime (a snail's trail) dries; anything of the other side on it is slowed. */
export function stepTrails(b: StepBase): void {
  const { s, w, time, grid } = b;
  if (s.trails.length) {
    s.trails = s.trails.filter(tr => time < tr.until);
    for (const tr of s.trails) {
      for (const o of grid.near(tr.x, tr.z, tr.r + 1)) if (foes(sideOf(o), tr.side) && o.species !== "snail" && Math.hypot(o.x - tr.x, o.z - tr.z) <= tr.r) o.slowUntil = Math.max(o.slowUntil ?? 0, time + 0.25);
      if (huntsWitch(tr.side)) for (const v of w.witches) if (v.onGround && !v.down && !sheltered(v, w.creatures[tr.from] ?? null) && Math.hypot(v.x - tr.x, v.z - tr.z) <= tr.r) w.slowWitch?.(v.id, time + 0.25, tr.slow);
    }
}
}

/** Movement-dependent effects observe the completed motion, whatever intent produced it: a trail-layer on the move lays its trail.
 *  (After every creature's turn, so early returns from a waiting or attack phase cannot suppress them.) */
export function layTrails(b: StepBase): void {
  const { s, w, time } = b;
  for (const c of w.active) {
    const move = profileOf(c.species)?.move;
    if (move?.kind !== "trail" || !c.fight?.target || !fighting(c) || !c.moving || time < (c.moveReadyAt ?? 0)) continue;
    s.trails.push({ x: c.x, z: c.z, r: (move.radius ?? 2.5) * FIGHT.scale, until: time + (move.time ?? 6), side: sideOf(c), slow: move.slow ?? 0.5, from: c.id });
    c.moveReadyAt = time + (move.every ?? 0.5);
}
}
