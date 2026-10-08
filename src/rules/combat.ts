// Combat (Stage 4; DESIGN.md "Combat, pacing and forecasting"): one system for wild and party
// creatures. Every creature of young age and up has an attack from config/combat.json (melee, a
// shot or the legends' quake), by its level and whether its species shoots; the numbers are data,
// one power budget per level. Sides: party (leashed) against wild; the witch is on the party's
// side and wild creatures shoot at her on the ground (Ed, 2026-10-04). Same kind never fights
// same kind, whichever side (Ed: inviting doesn't start fights inside a group; your wolves can't
// defend against wild wolves). Sieges: when a wave wakes an area, its wild creatures march on its
// new soundsystem; survivors of a won siege march on to the next-nearest. No drawing here.
import { LEGEND, type Creature } from "./creatures";
import { type Cell } from "./partition";
import { enrage, foes, huntsWitch, stateOf } from "./creatureStates";
import { LEGENDS } from "./legends";
import { FIGHT, legendSetOf, packsOf, profileOf, startCharge, steer, stepBurrow, stepCharge, stepLeap } from "./movement";
import { type Tuning } from "./tuning";
import { type Attack, type CombatData, COMBAT, traitsOf, type CombatState, attackOf, attackNamed, type CombatWorld } from "./combat/data";
import { fighting, targetable, sideOf, truce, targetPos, headingOf, lightsNear, sheltered, gaveUp, valid, acquire, Grid, moveToward, nearestSound } from "./combat/targeting";
import { contacted, touch, land, area, stepKnock, useData } from "./combat/hits";
import { stepLegendAttack, stepLegend } from "./combat/legend";
// (split into rules/combat/: data, targeting, hits, legend; everything public is still exported from here)
export { COMBAT, traitsOf, counterOf, newCombat, strengthOf, attackOf, scaled, attackNamed, maxHp, creatureMaxHp } from "./combat/data";
export type { Delivery, Modifier, Attack, CombatData, Trait, Target, Fight, Shot, Beam, CombatEventKind, CombatEvent, SoundHealth, CombatState, Trail, CombatWorld } from "./combat/data";
export { fighting, targetable, truce, guardOf, nearestSound } from "./combat/targeting";

/** One step of every fight. Creatures fighting move here (their roam and leash leave them be). */
export function stepCombat(s: CombatState, w: CombatWorld, data: CombatData = COMBAT): void {
  // (Events gather over a frame's steps: stepGame clears them once a frame, for the view.)
  const { time, dt, t } = w, C = t.combat;
  useData(data);
  FIGHT.scale = t.fight.scale; FIGHT.speed = t.fight.speed; FIGHT.momentum = t.fight.momentum ?? 1;
  if (t.fight.charge) FIGHT.charge = t.fight.charge;
  if (t.fight.leap) FIGHT.leap = t.fight.leap;
  FIGHT.walk = t.groundSpeed;
  // Shots fly; each hits the first enemy (not its own kind) it reaches, or fizzles at its range.
  const grid = new Grid(w.active.filter(c => fighting(c)));
  s.shots = s.shots.filter(sh => {
    // A lob flies over everything and lands where it was aimed, hitting all of the other side there.
    if (sh.lob) {
      const L = sh.lob, k = Math.min(1, (time - L.at) / Math.max(0.01, L.lands - L.at));
      sh.x = L.fx + (L.tx - L.fx) * k; sh.z = L.fz + (L.tz - L.fz) * k;
      if (time < L.lands) return true;
      const from = w.creatures[sh.from] ?? null, a = attackNamed(sh.attack, data);
      s.events.push({ kind: "landed", x: L.tx, z: L.tz, at: time, id: sh.from });
      area(w, s, from, sh.side, sh.species, L.tx, L.tz, sh.radius, sh.damage, a, grid);
      if (sh.sound) { const h = s.sounds.get(sh.sound.key); if (h && h.hp > 0 && Math.hypot(h.x - L.tx, h.z - L.tz) <= sh.radius + h.radius) land(w, s, from, { kind: "sound", key: sh.sound.key }, sh.sound.damage, a, L.tx, L.tz); }
      return false;
    }
    sh.x += sh.vx * dt; sh.z += sh.vz * dt;
    if (time >= sh.until) return false;
    const from = w.creatures[sh.from], a = attackNamed(sh.attack, data);
    for (const o of grid.near(sh.x, sh.z, sh.radius + 2)) {
      if (!targetable(o) || !foes(sideOf(o), sh.side) || o.species === sh.species || w.asleep(o)) continue;
      if (Math.hypot(o.x - sh.x, o.z - sh.z) <= sh.radius + 0.4 + o.level * 0.2) { land(w, s, from ?? null, { kind: "creature", id: o.id }, sh.damage, a, sh.x - sh.vx, sh.z - sh.vz); return false; }
    }
    if (huntsWitch(sh.side)) for (const v of w.witches) {
      if (!v.onGround || v.down) continue;
      if (Math.hypot(v.x - sh.x, v.z - sh.z) <= sh.radius + 0.3) { land(w, s, from ?? null, { kind: "witch", id: v.id }, sh.damage, a, sh.x, sh.z); return false; }
    }
    if (sh.side === "enraged") for (const [key, h] of s.sounds) if (h.hp > 0 && Math.hypot(h.x - sh.x, h.z - sh.z) <= h.radius + sh.radius) { land(w, s, from ?? null, { kind: "sound", key }, sh.damage, a, sh.x, sh.z); return false; }
    return true;
  });

  // Beams burn along their line in ticks, sweeping after their target.
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

  // Slime (a snail's trail) dries; anything of the other side on it is slowed.
  if (s.trails.length) {
    s.trails = s.trails.filter(tr => time < tr.until);
    for (const tr of s.trails) {
      for (const o of grid.near(tr.x, tr.z, tr.r + 1)) if (foes(sideOf(o), tr.side) && o.species !== "snail" && Math.hypot(o.x - tr.x, o.z - tr.z) <= tr.r) o.slowUntil = Math.max(o.slowUntil ?? 0, time + 0.25);
      if (huntsWitch(tr.side)) for (const v of w.witches) if (v.onGround && !v.down && !sheltered(v, w.creatures[tr.from] ?? null) && Math.hypot(v.x - tr.x, v.z - tr.z) <= tr.r) w.slowWitch?.(v.id, time + 0.25, tr.slow);
    }
  }
  // Her party (for angry besiegers looking for the nearest of it or a soundsystem).
  const partyList = w.active.filter(o => foes("enraged", sideOf(o)) && targetable(o) && !w.asleep(o)); // (what besiegers go for: the leashed and the happy)
  // Packs (Stage 5): creatures of a kind going for the same target, and their tactic.
  const packs = packsOf(w.active.filter(c => c.fight?.target && fighting(c)).map(c => ({ c, target: JSON.stringify(c.fight!.target) })), time);

  for (const c of w.active) {
    stepKnock(c, dt);
    if (c.gone) continue;
    if (c.dazed) {
      // Dazed: it lies still till its daze is over (invited meanwhile, it's whole and happy: states.befriend), then runs off.
      if (stateOf(c) !== "wild") { c.dazed = false; c.dazedUntil = undefined; }
      else if (time >= (c.dazedUntil ?? 0)) { c.dazed = false; c.dazedUntil = undefined; const out = w.exit(c.x, c.z); c.fleeUntil = Infinity; c.fleeX = out.x; c.fleeZ = out.z; c.fight = undefined; c.siege = undefined; s.events.push({ kind: "fled", x: c.x, z: c.z, at: time, id: c.id }); }
      else { c.moving = false; continue; }
    }
    // Beaten: it runs for the map's edge, and is gone once it's off the map or out of every witch's sight.
    if (c.fleeUntil) {
      const ax = (c.fleeX ?? c.x) - c.x, az = (c.fleeZ ?? c.z) - c.z, d = Math.hypot(ax, az);
      if (d < 1 || w.unseen(c.x, c.z)) { c.gone = true; continue; }
      c.x += (ax / d) * c.speed * C.fleeMult * dt; c.z += (az / d) * c.speed * C.fleeMult * dt;
      c.facing = ax > 0 ? 1 : -1; c.away = az < -Math.abs(ax);
      c.moving = true; c.walk += dt * 8;
      continue;
    }
    // An angry or happy legend (#87): it stands in its area and shoots from afar (stepLegendAttack).
    // (Ed, 2026-10-05: "stick with the long range one for now": with legends.closeMoves off, a wild legend that isn't an area's uses it too.)
    if (c.partyLegend) { c.fight = undefined; continue; } // (a party legend dances and fights no one: rules/partyLegend.ts)
    if (c.level === LEGEND && !c.leashed && (c.boss ? c.legendState === "angry" || c.legendState === "happy" : !LEGENDS.closeMoves) && fighting(c)) { stepLegendAttack(w, s, c, data, grid); continue; }
    if (!fighting(c) || w.asleep(c) || (c.leashed && w.busy(c.id))) { c.fight = undefined; continue; }
    // Stunned (an armoured one knocked over): it does nothing for a moment.
    if (c.stunUntil !== undefined && time < c.stunUntil) { c.moving = false; c.vx = 0; c.vz = 0; continue; }
    const atk = attackOf(c.species, c.level, data);
    if (!atk) { c.fight = undefined; continue; } // babies don't attack
    const f = (c.fight ??= { target: null, readyAt: time + atk.attack.cooldown * 0.5 * (c.rand() + 0.5), windupUntil: 0, aimX: 0, aimZ: 0 });
    // A happy area legend guards its area like a parked party animal with a far bigger reach, round its home (Ed, 2026-10-04).
    const happy = !c.leashed && (c.legendState === "happy" || c.state === "happy"); // (and every happy creature, #87: it defends its own area)
    // (a happy one looks round where it stands, for anything in its own area: area-wide, as it roams it)
    const lp = c.leashed ? w.leashPoint(c.id) : happy ? { x: c.x, z: c.z } : null, guarding = (!!lp && w.parked(c.id)) || happy;
    // Party animals fight only near their leash point (a parked one within guard.radius of its
    // sigil); wild ones within aggro of where they are.
    // (Ed's motion scale pass: party animals chase about 40 m from her or their sigil before giving up)
    const S = FIGHT.scale, reachX = lp ? lp.x : c.x, reachZ = lp ? lp.z : c.z, reach = (lp ? (happy ? t.wildLegends.guard : guarding ? t.guard.radius : C.pursuit) : C.aggro) * S;
    if (f.target && !valid(w, s, c, f.target)) {
      // Lost her (or her party) past its band, or she rose (Ed, 2026-10-06: "instead they should retreat
      // and go back to idling"): a wild one that isn't besieging gives up and heads home.
      if (sideOf(c) === "wild" && !c.siege && !c.leashed && gaveUp(w, c, f.target)) c.retreat = true;
      f.target = null;
    }
    const had = !!f.target;
    if (f.target && lp) { const p = targetPos(w, s, f.target); if (!p || Math.hypot(p.x - lp.x, p.z - lp.z) > reach + atk.attack.range || (happy && !w.inArea(c, p.x, p.z))) f.target = null; }
    if (!f.target || f.windupUntil === 0) {
      let near = acquire(w, c, reachX, reachZ, reach, atk.attack.range, grid, guarding, happy ? o => w.inArea(c, o.x, o.z) : undefined);
      // Retreating, it takes up a fight again only with someone back in its own area (no flip-flopping at the band's edge).
      if (near && c.retreat) { const q = targetPos(w, s, near); if (q && w.inArea(c, q.x, q.z)) c.retreat = undefined; else near = null; }
      if (near) f.target = near;
      else if (!f.target && c.siege && !c.leashed) {
        // An angry area's creatures (its quest undone, Ed 2026-10-04) go for the nearest party animal or
        // soundsystem; a legend keeps to its own area's soundsystem.
        f.target = { kind: "sound", key: c.siege };
        if (!c.boss) {
          const sk = nearestSound(s, c.x, c.z), sh = sk ? s.sounds.get(sk)! : null, sd = sh ? Math.hypot(sh.x - c.x, sh.z - c.z) : Infinity;
          let best: Creature | null = null, bd = sd;
          for (const o of partyList) { const dd = Math.hypot(o.x - c.x, o.z - c.z); if (dd < bd && !truce(c, o)) { bd = dd; best = o; } }
          f.target = best ? { kind: "creature", id: best.id } : sk ? { kind: "sound", key: sk } : f.target;
        }
      }
    }
    if (f.target && !had) f.seenAt = time; // (it reacts in a moment: combat.reaction)
    if (!f.target) {
      if (f.windupUntil) f.windupUntil = 0;
      f.lunge = undefined;
      if (c.retreat) {
        // Retreating: back into its area at its own pace (a charge's run given up), then roaming again
        // once it's in and within combat.retreatHome metres of home (or its run has taken long enough).
        c.charge = undefined; c.vx = 0; c.vz = 0;
        if (c.retreatFrom === undefined) c.retreatFrom = time;
        const sp = (profileOf(c.species)?.speed ?? C.fightRun) * FIGHT.speed;
        const left = moveToward(c, c.anchorX, c.anchorZ, 1, sp, dt);
        if ((w.inArea(c, c.x, c.z) && left <= C.retreatHome * FIGHT.scale) || time - c.retreatFrom > 30) { c.retreat = undefined; c.retreatFrom = undefined; c.tx = c.x; c.tz = c.z; c.fight = undefined; }
        continue;
      }
      c.sprung = undefined; // (an ambusher lies in wait again)
      if (c.burrow) c.burrow = undefined; // (a burrower comes up)
      if (c.leap) { c.x = c.leap.tx; c.z = c.leap.tz; c.leap = undefined; } // (a leaper comes down)
      c.dug = undefined; c.brace = undefined; // (a digger comes up, a blocker lowers its tail)
      continue;
    }
    const p = targetPos(w, s, f.target);
    if (!p) { f.target = null; f.windupUntil = 0; continue; } // (it fell this very step)
    const d = Math.hypot(p.x - c.x, p.z - c.z), A = atk.attack, K = data.kite, kites = A.delivery === "shot" && K.species.includes(c.species);
    const want = A.delivery === "shot" || A.delivery === "lob" || A.delivery === "beam" ? A.range * (kites ? K.far : 0.8) : A.delivery === "pulse" ? Math.max(0.8, (A.radius ?? 2) * 0.6) : A.range + p.r + (A.lunge ?? 0) * 0.85 - 0.3;
    // Its lunge under way: a dash-strike down the line it wound up on; at its end the blow lands, if it's still there.
    if (f.lunge) {
      // (At a creature it homes in: creatures can't read a telegraph; but not at a flier, which flits up out of its way.
      // At the witch it keeps its line, so she can sidestep it.)
      // (with momentum, Ed 2026-10-05: it builds up to 60 m/s and eases out at the end, carrying some speed on)
      const L = f.lunge, a = (300 * FIGHT.speed) / FIGHT.momentum, top = 60 * FIGHT.speed, v0 = L.v ?? 0;
      const v = Math.min(top, v0 + a * dt, Math.sqrt(Math.max(0, 2 * a * L.left + (12 * FIGHT.speed) ** 2))), step = Math.min(L.left, v * dt);
      L.v = v;
      if (f.target.kind === "creature" && !traitsOf(w.creatures[f.target.id]?.species ?? "", data).includes("flier")) { const hx = p.x - c.x, hz = p.z - c.z, hd = Math.hypot(hx, hz); if (hd > 1e-3) { L.dx = hx / hd; L.dz = hz / hd; L.left = Math.min(L.left, Math.max(0, hd - A.range * 0.5)); } }
      c.x += L.dx * step; c.z += L.dz * step; L.left -= step; c.moving = true; c.walk += dt * 12; c.facing = L.dx >= 0 ? 1 : -1;
      c.vx = L.dx * v; c.vz = L.dz * v;
      if (L.left <= 1e-6) { f.lunge = undefined; if (Math.hypot(p.x - c.x, p.z - c.z) <= A.range + p.r) land(w, s, c, f.target, atk.damage, A, c.x, c.z); }
      continue;
    }
    // Just noticed: it turns to look a moment before it goes (combat.reaction).
    if (f.windupUntil === 0 && time - (f.seenAt ?? -1e9) < C.reaction) { c.moving = false; c.facing = p.x >= c.x ? 1 : -1; continue; }
    // Its speed in a fight (Ed's motion scale pass: about the witch's): its profile's, else combat.fightRun; slowed, or a legend's.
    // Closing in from afar (Ed: "the creatures in it should be onto me in a few seconds"), it sprints at combat.pursuitRun.
    const slow = c.slowUntil && time < c.slowUntil ? A.slowMult ?? 0.5 : 1, own = c.level === LEGEND ? C.legendRun : profileOf(c.species)?.speed ?? C.fightRun;
    const speed = (c.level !== LEGEND && d > 30 * S ? Math.max(own, profileOf(c.species)?.pursuit ?? C.pursuitRun) : own) * FIGHT.speed * slow;
    // A wild legend fights by its move set (Stage 5): long, telegraphed moves in a pattern, and a second phase.
    if (c.level === LEGEND && !c.leashed && !(f.target.kind === "sound" && d > 40 * S)) { stepLegend(w, s, c, f, p, d, legendSetOf(c.species), data, grid); continue; }
    const P = profileOf(c.species), marching = (f.target.kind === "sound" || (!!c.siege && !c.leashed)) && d > 40 * S; // (a besieger far off marches)
    if (f.windupUntil === 0 && P && !marching) {
      // A movement profile (Stage 5): its signature move, then its behaviours and its pack's tactic.
      const run = speed;
      if (P.move?.kind === "charge") {
        const was = c.charge, r = stepCharge(c, P.move, p.x, p.z, A.range + p.r + 0.3, time, dt, run);
        // A charge that missed (Ed, 2026-10-06: "reward skilful use of blink and accurate invitation aiming"): it stands
        // winded for fight.charge.miss seconds, stars round its head, an opening for her 💌s.
        if (was && !c.charge && !was.struck && !was.hit?.length && (FIGHT.charge.miss ?? 0) > 0) { c.stunUntil = time + FIGHT.charge.miss!; c.vx = 0; c.vz = 0; s.events.push({ kind: "stunned", x: c.x, z: c.z, at: time, id: c.id }); }
        // A pair (the stags): its pack mates whose charge is ready set off with it, side by side.
        if (P.move.pair && !was && c.charge) for (const m of packs.get(c.id)?.members ?? []) if (m !== c && !m.charge && time >= (m.moveReadyAt ?? 0) && m.fight?.windupUntil === 0 && !m.fight.lunge) startCharge(m, P.move, p.x, p.z, time);
        const ram: Attack = { ...A, modifier: "knockback", knockback: 15 * S };
        if (r === "hit") {
          if (c.charge) (c.charge.hit ??= []).push(f.target.kind === "witch" ? -1 - f.target.id : f.target.kind === "creature" ? f.target.id : -1e9);
          if (!(t.fight.charge?.contact && c.charge?.hit && contacted(f.target, c.charge.hit, true))) land(w, s, c, f.target, atk.damage, ram, c.x, c.z);
          f.readyAt = time + A.cooldown; s.events.push({ kind: "charged", x: c.x, z: c.z, at: time, id: c.id }); continue;
        }
        // Contact (Ed, 2026-10-06: "damaging whenever they're touched while in attack mode"): its run hurts every foe it touches, once each.
        if (r === "charging" && t.fight.charge?.contact && c.charge && !c.charge.braking && !(c.charge.from !== undefined && time < c.charge.from)) touch(w, s, c, atk.damage, ram, grid, (c.charge.hit ??= []));
        if (r === "charging") continue;
      }
      if (P.move?.kind === "burrow") {
        // The mole: under the ground (untouchable, a moving mound) to its target, then up, striking at once.
        const r = stepBurrow(c, P.move, p.x, p.z, run, time, dt);
        if (r === "burrowed") s.events.push({ kind: "burrowed", x: c.x, z: c.z, at: time, id: c.id });
        if (r === "under" || r === "burrowed") continue;
        if (r === "surfaced") {
          s.events.push({ kind: "surfaced", x: c.x, z: c.z, at: time, id: c.id });
          if (time >= f.readyAt) { f.windupUntil = time + Math.min(A.windup, 0.35); f.aimX = p.x; f.aimZ = p.z; s.events.push({ kind: "windup", x: c.x, z: c.z, at: time, id: c.id }); }
          continue;
        }
      }
      if (P.move?.kind === "leap") {
        // The toad: a leap in an arc at its target (a ring shows where it'll land), slamming down: its attack.
        const tv = f.target.kind === "witch" ? w.witches[f.target.id] : f.target.kind === "creature" ? w.creatures[f.target.id] : null;
        const r = stepLeap(c, P.move, p.x, p.z, time >= f.readyAt, time, tv?.vx ?? 0, tv?.vz ?? 0);
        if (r === "leapt") s.events.push({ kind: "leapt", x: c.x, z: c.z, at: time, id: c.id });
        // A low pounce (the lynx's, a strike) hurts every foe it touches in the air (fight.leap.contact); a high leap's slam is its landing.
        if (r === "air" && P.move.strike && t.fight.leap?.contact && c.leap) touch(w, s, c, atk.damage, A, grid, (c.leap.hit ??= []));
        const pounced = c.leap?.hit;
        if (r === "landed") {
          f.readyAt = time + A.cooldown;
          s.events.push({ kind: "slammed", x: c.x, z: c.z, at: time, id: c.id });
          // A pounce (the lynx) lands its blow on its target, if it's still there; a slam (the toad) hits all round.
          if (P.move.strike) { if (!(pounced && contacted(f.target, pounced, false)) && Math.hypot(p.x - c.x, p.z - c.z) <= A.range + p.r + 1 * S) land(w, s, c, f.target, atk.damage, A, c.x, c.z); }
          else area(w, s, c, sideOf(c), c.species, c.x, c.z, A.radius ?? 2.4, atk.damage, A, grid);
          continue;
        }
        if (r !== "none") continue;
      }
      if (P.move?.kind === "ambush" && !c.leashed) {
        if (c.sprung === undefined) {
          if (d > (P.move.trigger ?? 20) * S) { c.moving = false; c.vx = 0; c.vz = 0; c.facing = p.x >= c.x ? 1 : -1; continue; }
          c.sprung = time; s.events.push({ kind: "sprung", x: c.x, z: c.z, at: time, id: c.id });
          if (P.move.strike) f.readyAt = Math.min(f.readyAt, time); // (the snake: it strikes as it springs)
        }
      }
      if (P.move?.kind === "dig") {
        // The badger digs in when its target comes close: rooted, taking armour times the damage, biting
        // without a lunge at whatever's in reach; then it comes up and the move cools down.
        if (c.dug !== undefined && time < c.dug) {
          c.vx = 0; c.vz = 0; c.moving = false; c.facing = p.x >= c.x ? 1 : -1;
          if (time >= f.readyAt && d <= A.range + p.r + 1.5 * S) { f.windupUntil = time + A.windup * 0.7; f.aimX = p.x; f.aimZ = p.z; s.events.push({ kind: "windup", x: c.x, z: c.z, at: time, id: c.id }); }
          continue;
        }
        if (c.dug !== undefined) { c.dug = undefined; c.moveReadyAt = time + P.move.cooldown; }
        else if (time >= (c.moveReadyAt ?? 0) && d <= (P.move.trigger ?? 6) * S) { c.dug = time + (P.move.time ?? 3); s.events.push({ kind: "dug", x: c.x, z: c.z, at: time, id: c.id }); continue; }
      }
      if (P.move?.kind === "block") {
        // The beaver braces behind its tail when a shot's coming at it or its target winds up: rooted,
        // shots all but stopped, blows halved; then it slaps back at once.
        if (c.brace !== undefined && time < c.brace) { c.vx = 0; c.vz = 0; c.moving = false; c.facing = p.x >= c.x ? 1 : -1; continue; }
        if (c.brace !== undefined) { c.brace = undefined; c.moveReadyAt = time + P.move.cooldown; f.readyAt = Math.min(f.readyAt, time); }
        else if (time >= (c.moveReadyAt ?? 0)) {
          const R = (P.move.radius ?? 12) * S, side = sideOf(c);
          let threat = s.shots.some(sh => { if (!foes(sh.side, side) || sh.lob) return false; const rx = c.x - sh.x, rz = c.z - sh.z, sv = Math.hypot(sh.vx, sh.vz) || 1; return Math.hypot(rx, rz) < R && (rx * sh.vx + rz * sh.vz) / sv > 0 && Math.abs((rx * -sh.vz + rz * sh.vx) / sv) < 2 * S; });
          if (!threat && f.target.kind === "creature") { const o = w.creatures[f.target.id]; threat = !!o?.fight && o.fight.windupUntil > time && o.fight.target?.kind === "creature" && o.fight.target.id === c.id; }
          if (threat) { c.brace = time + (P.move.time ?? 1.2); s.events.push({ kind: "braced", x: c.x, z: c.z, at: time, id: c.id }); continue; }
        }
      }
      if (P.move?.kind === "trail" && c.moving && time >= (c.moveReadyAt ?? 0)) {
        // The snail leaves slime as it goes: a patch every `every` seconds, slowing the other side, drying after `time`.
        s.trails.push({ x: c.x, z: c.z, r: (P.move.radius ?? 2.5) * S, until: time + (P.move.time ?? 6), side: sideOf(c), slow: P.move.slow ?? 0.5, from: c.id });
        c.moveReadyAt = time + (P.move.every ?? 0.5);
      }
      if (P.move?.kind === "flash" && time >= (c.moveReadyAt ?? 0) && d <= (P.move.radius ?? 10) * S) {
        // The glow-worm's flash: a pulse of light dazzling the other side round it (slowed a moment).
        const R = (P.move.radius ?? 10) * S, until = time + (P.move.time ?? 1.5), side = sideOf(c);
        for (const o of grid.near(c.x, c.z, R)) if (o !== c && targetable(o) && foes(sideOf(o), side) && !truce(c, o) && Math.hypot(o.x - c.x, o.z - c.z) <= R) o.slowUntil = Math.max(o.slowUntil ?? 0, until);
        if (huntsWitch(side)) for (const v of w.witches) if (v.onGround && !v.down && !sheltered(v, c) && Math.hypot(v.x - c.x, v.z - c.z) <= R) w.slowWitch?.(v.id, until, P.move.slow ?? 0.6);
        s.events.push({ kind: "flash", x: c.x, z: c.z, at: time, id: c.id });
        c.moveReadyAt = time + P.move.cooldown;
      }
      const burst = c.sprung !== undefined && time - c.sprung < (P.move?.time ?? 0) ? P.move?.speed ?? 1 : 1;
      const heading = headingOf(w, f.target), lights = P.fight.some(b => b.kind === "light") ? lightsNear(w, s, c, 40 * S) : undefined;
      const may = steer(c, P, { px: p.x, pz: p.z, pr: p.r, want, range: A.range, speed: run * burst, time, dt, pack: packs.get(c.id) ?? null, neighbours: grid.near(c.x, c.z, 12 * S), threats: s.shots, side: sideOf(c), ready: time >= f.readyAt, beat: 60 / t.beat.bpm, heading, lights });
      if (may && time >= f.readyAt) {
        f.windupUntil = time + A.windup; f.aimX = p.x; f.aimZ = p.z; // (it glides to a stop as it winds up: below)
        s.events.push({ kind: "windup", x: c.x, z: c.z, at: time, id: c.id });
      }
      continue;
    }
    if (f.windupUntil === 0) {
      if (d > want) { moveToward(c, p.x, p.z, want, marching ? c.speed * C.marchMult : speed, dt); continue; }
      // A kiter backs off when its target comes too close, keeping its distance while it shoots.
      if (kites && d < A.range * K.near && d > 0.01) { c.x -= ((p.x - c.x) / d) * speed * dt; c.z -= ((p.z - c.z) / d) * speed * dt; c.moving = true; c.walk += dt * 6; c.facing = p.x >= c.x ? 1 : -1; if (time < f.readyAt) continue; }
      c.moving = false; c.facing = p.x >= c.x ? 1 : -1;
      if (time >= f.readyAt) {
        f.windupUntil = time + A.windup; f.aimX = p.x; f.aimZ = p.z;
        s.events.push({ kind: "windup", x: c.x, z: c.z, at: time, id: c.id });
      }
      continue;
    }
    // Winding up: it telegraphs (gliding to a stop, with momentum), then the blow lands, the shot flies, or the ground quakes.
    { const vx = c.vx ?? 0, vz = c.vz ?? 0, v = Math.hypot(vx, vz);
      if (v > 0.05) { const nv = Math.max(0, v - ((40 * FIGHT.speed) / FIGHT.momentum) * dt); c.vx = (vx / v) * nv; c.vz = (vz / v) * nv; c.x += c.vx * dt; c.z += c.vz * dt; } else { c.vx = 0; c.vz = 0; }
      c.moving = v > 1; }
    if (time < f.windupUntil) continue;
    f.windupUntil = 0; f.readyAt = time + A.cooldown;
    const dmg = atk.damage;
    if (A.delivery === "melee") {
      // The lunge (Ed's motion scale pass: 12 to 16 m, a dash-strike): down the line to where it aimed
      // when it wound up, so stepping aside dodges it; the blow lands at its end (above).
      const ax = f.aimX - c.x, az = f.aimZ - c.z, ad = Math.hypot(ax, az), L = c.dug !== undefined && time < c.dug ? 0 : Math.min(A.lunge ?? 0, Math.max(0, ad - A.range * 0.5)); // (dug in: no lunge)
      if (ad > 0.01 && L > 0.05) f.lunge = { dx: ax / ad, dz: az / ad, left: L, v: Math.hypot(c.vx ?? 0, c.vz ?? 0) };
      else if (Math.hypot(p.x - c.x, p.z - c.z) <= A.range + p.r) land(w, s, c, f.target, dmg, A, c.x, c.z);
    }
    else if (A.delivery === "shot") {
      const ax = f.aimX - c.x, az = f.aimZ - c.z, ad = Math.hypot(ax, az) || 1, v = A.speed ?? 9;
      s.shots.push({ id: s.nextShot++, x: c.x, z: c.z, vx: (ax / ad) * v, vz: (az / ad) * v, until: time + (A.range * 1.3) / v, from: c.id, side: sideOf(c), species: c.species, damage: dmg, radius: A.radius ?? 0.6, attack: atk.name });
      s.events.push({ kind: "shot", x: c.x, z: c.z, at: time, id: c.id });
    } else if (A.delivery === "lob") {
      const fl = A.flight ?? 1.2;
      s.shots.push({ id: s.nextShot++, x: c.x, z: c.z, vx: 0, vz: 0, until: time + fl + 1, from: c.id, side: sideOf(c), species: c.species, damage: dmg, radius: A.radius ?? 1.8, attack: atk.name, lob: { fx: c.x, fz: c.z, tx: f.aimX, tz: f.aimZ, at: time, lands: time + fl } });
      s.events.push({ kind: "shot", x: c.x, z: c.z, at: time, id: c.id });
    } else if (A.delivery === "beam") {
      const dur = A.duration ?? 0.8, tick = A.tick ?? 0.2, ticks = Math.max(1, Math.round(dur / tick));
      s.beams.push({ id: s.nextShot++, from: c.id, angle: Math.atan2(f.aimZ - c.z, f.aimX - c.x), length: A.range, width: A.width ?? 1, until: time + dur, nextTick: time, tick, damage: dmg / ticks, side: sideOf(c), species: c.species, attack: atk.name, target: f.target });
      s.events.push({ kind: "beam", x: c.x, z: c.z, at: time, id: c.id });
    } else {
      // The quake (a legend's), or a pulse (Stage 5: a bat's screech, a mole's upheaval): everything
      // of the other side round it, and the witch if she's on the ground in it.
      const R = A.radius ?? 5;
      s.events.push(A.delivery === "pulse" ? { kind: "pulse", x: c.x, z: c.z, at: time, id: c.id } : { kind: "quake", x: c.x, z: c.z, at: time, id: c.id, big: true });
      for (const o of grid.near(c.x, c.z, R)) if (o !== c && targetable(o) && foes(sideOf(o), sideOf(c)) && !truce(c, o) && Math.hypot(o.x - c.x, o.z - c.z) <= R) land(w, s, c, { kind: "creature", id: o.id }, dmg, A, c.x, c.z);
      if (!c.leashed) {
        for (const v of w.witches) if (v.onGround && !v.down && Math.hypot(v.x - c.x, v.z - c.z) <= R) land(w, s, c, { kind: "witch", id: v.id }, dmg, A, c.x, c.z);
        for (const [key, h] of s.sounds) if (h.hp > 0 && Math.hypot(h.x - c.x, h.z - c.z) <= R + h.radius) land(w, s, c, { kind: "sound", key }, dmg, A, c.x, c.z);
      }
    }
  }
}

/** A soundsystem rises (a wave woke its area): its health, and the wild creatures of the area march on it. */
export function startSiege(s: CombatState, key: string, at: { x: number; z: number }, cell: Cell, creatures: Creature[], t: Tuning, besiege = true): void {
  s.sounds.set(key, { hp: t.combat.soundsystemHealth, max: t.combat.soundsystemHealth, x: at.x, z: at.z, radius: t.combat.soundsystemRadius });
  // Its wild creatures are enraged (#87: part-invited ones too, their meters lost; happy ones never) and besiege it.
  if (besiege) for (const c of creatures) if (!c.gone && !c.leashed && !c.wanderTo && !c.fleeUntil && !c.dazed && c.cell[0] === cell[0] && c.cell[1] === cell[1] && c.level > 0 && enrage(c)) c.siege = key;
}

/** After a soundsystem falls: the survivors march on to the next-nearest still standing. */
export function marchOn(s: CombatState, key: string, creatures: Creature[]): void {
  for (const c of creatures) if (c.siege === key && !c.gone) { c.siege = c.boss ? undefined : nearestSound(s, c.x, c.z) ?? undefined; if (c.fight) c.fight.target = null; } // (a legend stays to guard its area)
}
