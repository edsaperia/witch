// Combat's legends (split from rules/combat.ts, no change in behaviour): an angry or happy area legend's long-range
// throw or beam and its long charge, and a wild legend's pattern of big moves.
import { LEGEND, type Creature } from "../creatures";
import { foes, stateOf, type State } from "../creatureStates";
import { LEGENDS } from "../legends";
import { bodyRadius } from "../spacing";
import { FIGHT, type LegendSet } from "../movement";
import { type Attack, type CombatData, type Target, type Fight, type CombatState, attackNamed, maxHp, type CombatWorld } from "./data";
import { targetable, sideOf, truce, targetPos, sheltered, Grid, moveToward } from "./targeting";
import { land, area } from "./hits";

/** An angry or happy legend's turn (Ed, 2026-10-05; #87; config/legends.json attack): it never
 *  leaves its area (it stands where it lay), but reaches attack.range metres. Every interval seconds it
 *  picks the nearest it may shoot (angry: the witch on the ground and her posse, never soundsystems or
 *  happy creatures; happy: the enraged), winds up for windup seconds, then lobs (a bomb landing after
 *  lobFlight seconds) or beams (by its species), each hit attack.damage times its level's power for
 *  interval seconds. (Its shots are the wild's when angry, the happy's when happy: foes() does the rest.) */
export function stepLegendAttack(w: CombatWorld, s: CombatState, c: Creature, _data: CombatData, grid: Grid): void {
  const A = LEGENDS.attack, time = w.time, S = FIGHT.scale, angry = c.legendState !== "happy", R = (angry ? A.range : w.t.legends?.happyRange ?? A.range) * S, side: State = angry ? "wild" : "happy";
  const f = (c.fight ??= { target: null, readyAt: time + A.interval * 0.5, windupUntil: 0, aimX: 0, aimZ: 0 });
  if (c.lairX === undefined) { c.lairX = c.x; c.lairZ = c.z; }
  const charger = LEGENDS.charge.species.includes(c.species);
  if (charger && (c.run || Math.hypot(c.x - c.lairX, c.z - c.lairZ!) > 2)) { stepLongCharge(w, s, c, f, grid, angry); return; } // (out on a charge, or away from its lair: home first)
  c.moving = false; c.vx = 0; c.vz = 0; // (it stands where it lay, in its area)
  if (f.windupUntil > 0) {
    if (time < f.windupUntil) return;
    f.windupUntil = 0; f.readyAt = time + A.interval;
    const beam = A.beam.includes(c.species);
    for (const a of c.aims ?? []) {
      const ticks = Math.max(1, Math.round(A.beamTime / 0.25)), sk = a.target.kind === "sound" ? a.target.key : null;
      if (beam) {
        s.beams.push({ id: s.nextShot++, from: c.id, angle: Math.atan2(a.z - c.z, a.x - c.x), length: Math.max(R, Math.hypot(a.x - c.x, a.z - c.z) + 4), width: A.beamWidth * S, until: time + A.beamTime, nextTick: time, tick: 0.25, damage: A.damage / ticks, side, species: c.species, attack: "legendBeam", target: a.target, ...(sk ? { sound: { key: sk, damage: (w.t.legends?.bombard?.damage ?? 0) / ticks } } : {}) });
      } else s.shots.push({ id: s.nextShot++, x: c.x, z: c.z, vx: 0, vz: 0, until: time + A.lobFlight + 1, from: c.id, side, species: c.species, damage: A.damage, radius: A.lobRadius * S, attack: "legendLob", lob: { fx: c.x, fz: c.z, tx: a.x, tz: a.z, at: time, lands: time + A.lobFlight }, ...(sk ? { sound: { key: sk, damage: w.t.legends?.bombard?.damage ?? 0 } } : {}) });
    }
    if (c.aims?.length) s.events.push({ kind: beam ? "beam" : "shot", x: c.x, z: c.z, at: time, id: c.id });
    c.aims = undefined;
    return;
  }
  if (time < f.readyAt) return;
  // The nearest it may shoot, up to attack.targets of them.
  const found: { d: number; x: number; z: number; target: Target }[] = [];
  if (angry) for (const v of w.witches) { if (!v.onGround || v.down) continue; const d = Math.hypot(v.x - c.x, v.z - c.z); if (d <= R) found.push({ d, x: v.x, z: v.z, target: { kind: "witch", id: v.id } }); }
  for (const o of grid.near(c.x, c.z, R)) {
    if (o === c || !targetable(o) || truce(c, o) || w.asleep(o)) continue;
    const st = stateOf(o);
    if (angry ? st !== "leashed" : st !== "enraged") continue;
    const d = Math.hypot(o.x - c.x, o.z - c.z);
    if (d <= R) found.push({ d, x: o.x, z: o.z, target: { kind: "creature", id: o.id } });
  }
  found.sort((a, b) => a.d - b.d);
  // Bombarding (Ed, 2026-10-06: "Legend bombards, but prioritises you"): an angry one with no witch in
  // its reach throws its first lob or beam at the nearest standing soundsystem within bombard.range.
  const B = w.t.legends?.bombard;
  let bombard = false;
  if (angry && B?.on && !found.some(t => t.target.kind === "witch")) {
    let key: string | null = null, bd = B.range * S, at = { x: 0, z: 0 };
    for (const [k, h] of s.sounds) { if (h.hp <= 0) continue; const d = Math.hypot(h.x - c.x, h.z - c.z); if (d <= bd) { bd = d; key = k; at = h; } }
    if (key) { found.unshift({ d: bd, x: at.x, z: at.z, target: { kind: "sound", key } }); bombard = true; }
  }
  if (!found.length) { f.target = null; f.readyAt = time + A.recheck; return; } // (nothing in reach: look again in a moment, not every step)
  if (charger && !bombard) {
    // A charging legend: one long charge at the nearest, its head lowered windup seconds first.
    const t0 = found[0], a = Math.atan2(t0.z - c.z, t0.x - c.x);
    c.run = { phase: "windup", at: time, angle: a, speed: 0, turn: 1, target: t0.target, tx: t0.x, tz: t0.z, ran: 0, hit: [], fromX: c.x, fromZ: c.z };
    f.target = t0.target; f.aimX = t0.x; f.aimZ = t0.z; c.facing = t0.x >= c.x ? 1 : -1;
    s.events.push({ kind: "windup", x: c.x, z: c.z, at: time, id: c.id, big: true });
    return;
  }
  c.aims = found.slice(0, A.targets).map(({ x, z, target }) => ({ x, z, target }));
  f.target = c.aims[0].target; f.aimX = c.aims[0].x; f.aimZ = c.aims[0].z; f.windupUntil = time + A.windup;
  c.facing = f.aimX >= c.x ? 1 : -1;
  s.events.push({ kind: "windup", x: c.x, z: c.z, at: time, id: c.id });
}

/** A charging legend's long charge (Ed, 2026-10-05; legends.json charge): head down windup
 *  seconds; then a heavy run, building to a medium top speed and curving toward its target at a
 *  limited turn rate, through scenery, trampling everything in its lane but its own side and kind
 *  (once each, knocked aside, the witch stunned), till it's past its target or out of reach; then a
 *  big braking arc (still trampling, softer as it slows); then the walk home, its real cooldown. */
export function stepLongCharge(w: CombatWorld, s: CombatState, c: Creature, f: Fight, grid: Grid, angry: boolean): void {
  const K = LEGENDS.charge, time = w.time, dt = w.dt, S = FIGHT.scale, R = LEGENDS.attack.range * S;
  const run = (c.run ??= { phase: "home", at: time, angle: 0, speed: 0, turn: 1, target: null, tx: c.x, tz: c.z, ran: 0, hit: [], fromX: c.x, fromZ: c.z });
  const posOf = (tg: Target | null) => (tg ? targetPos(w, s, tg) : null);
  if (run.phase === "windup") {
    c.moving = false; c.vx = 0; c.vz = 0;
    if (time - run.at < K.windup) return;
    run.phase = "run"; run.at = time;
    s.events.push({ kind: "charged", x: c.x, z: c.z, at: time, id: c.id, big: true });
  }
  if (run.phase === "run" || run.phase === "brake") {
    if (run.phase === "run") {
      // Building speed, and curving toward its target at no more than turn degrees a second.
      run.speed = Math.min(K.speed * FIGHT.speed, run.speed + K.accel * FIGHT.speed * dt);
      const p = posOf(run.target);
      if (p) { run.tx = p.x; run.tz = p.z; }
      const want = Math.atan2(run.tz - c.z, run.tx - c.x);
      let d = Math.atan2(Math.sin(want - run.angle), Math.cos(want - run.angle));
      const past = Math.cos(d) < 0 && Math.hypot(run.tx - c.x, run.tz - c.z) < 30 * S; // (it has gone by)
      if (!past) { const lim = ((K.turn * Math.PI) / 180) * dt; if (Math.abs(d) > 1e-4) run.turn = d > 0 ? 1 : -1; d = Math.max(-lim, Math.min(lim, d)); run.angle += d; }
      if (past || run.ran >= R || !p) { run.phase = "brake"; run.at = time; run.decel = (run.speed * run.speed) / (2 * Math.max(1, K.brake * S)); }
    } else {
      // The braking arc: slowing over brake metres, turning wide the way it was turning.
      run.speed = Math.max(0, run.speed - (run.decel ?? 10) * dt);
      run.angle += run.turn * ((K.arc * Math.PI) / 180) * dt;
      if (run.speed < 0.5) { run.phase = "home"; run.at = time; c.moving = false; }
    }
    const vx = Math.cos(run.angle) * run.speed, vz = Math.sin(run.angle) * run.speed;
    c.x += vx * dt; c.z += vz * dt; c.vx = vx; c.vz = vz; run.ran += run.speed * dt;
    c.moving = true; c.walk += dt * (2 + run.speed * 0.4); c.facing = vx >= 0 ? 1 : -1;
    // Its lane: everything within laneWidth / 2 of it but its own side and kind, once each.
    const share = run.speed / Math.max(1e-6, K.speed * FIGHT.speed), half = (K.laneWidth * S) / 2, kb = K.knockback * S * share;
    const blow: Attack = { delivery: "melee", modifier: "knockback", knockback: kb / 6, cooldown: 0, windup: 0, range: half };
    if (run.speed > 0.5) {
      for (const o of grid.near(c.x, c.z, half + 4)) {
        if (o === c || run.hit.includes(o.id) || !targetable(o) || truce(c, o) || o.boss || w.asleep(o)) continue;
        const st = stateOf(o);
        if (angry ? false : st === "happy" || st === "leashed") continue; // (happy: its side's and hers pass)
        if (Math.hypot(o.x - c.x, o.z - c.z) > half + bodyRadius(o)) continue;
        run.hit.push(o.id);
        land(w, s, c, { kind: "creature", id: o.id }, K.damage, blow, c.x, c.z);
        // Knocked aside: off the lane, away from its line.
        const side = Math.sign((o.x - c.x) * -Math.sin(run.angle) + (o.z - c.z) * Math.cos(run.angle)) || 1;
        o.kx = -Math.sin(run.angle) * side * kb * 6 + vx * 0.3 * share; o.kz = Math.cos(run.angle) * side * kb * 6 + vz * 0.3 * share;
      }
      if (angry) for (const v of w.witches) {
        if (!v.onGround || v.down || sheltered(v, c) || run.hit.includes(-1 - v.id) || Math.hypot(v.x - c.x, v.z - c.z) > half + 0.4) continue;
        run.hit.push(-1 - v.id);
        // Thrown aside and staggered (rules/knock.ts, #108: a ram throws her witch.knock.charge metres), away from its line.
        const side = Math.sign((v.x - c.x) * -Math.sin(run.angle) + (v.z - c.z) * Math.cos(run.angle)) || 1;
        w.hitWitch(v.id, time, { x: v.x + Math.sin(run.angle) * side * 2, z: v.z - Math.cos(run.angle) * side * 2, knockback: 0, rams: true });
        s.events.push({ kind: "witchHit", x: v.x, z: v.z, at: time, id: v.id });
      }
    }
    return;
  }
  // Home: back to where it lay at returnSpeed, then rest seconds before it may charge again.
  const dx = (c.lairX ?? c.x) - c.x, dz = (c.lairZ ?? c.z) - c.z, d = Math.hypot(dx, dz);
  if (d < 1) { c.run = undefined; c.moving = false; c.vx = 0; c.vz = 0; f.readyAt = Math.max(f.readyAt, time + K.rest); f.target = null; return; }
  const v = Math.min(d, K.returnSpeed * FIGHT.speed * dt);
  c.x += (dx / d) * v; c.z += (dz / d) * v; c.vx = (dx / d) * K.returnSpeed; c.vz = (dz / d) * K.returnSpeed;
  c.moving = true; c.walk += dt * 3; c.facing = dx >= 0 ? 1 : -1;
}

/** A wild legend's turn (Stage 5): it works through its pattern of big moves, approaching each one's
 *  reach and winding it up long and visibly (the view telegraphs each), and roars into its second
 *  phase at phase2.at of its health: a faster pattern with more in it. */
export function stepLegend(w: CombatWorld, s: CombatState, c: Creature, f: Fight, p: { x: number; z: number; r: number }, d: number, L: LegendSet, data: CombatData, grid: Grid): void {
  const { time, dt } = w, C = w.t.combat, st = (c.legend ??= { step: 0, phase: 1 }), max = maxHp(c.level, data);
  // An area legend guards its own area (Ed, 2026-10-04): nothing beyond it (an arena's has none).
  if (c.boss && !c.charge && !w.inArea(c, p.x, p.z)) { f.target = null; f.windupUntil = 0; f.move = undefined; return; }
  if (st.phase === 1 && (c.hp ?? max) <= max * L.phase2.at) {
    // The phase change: a roar (a burst and the screen shaking), and it starts its second pattern.
    st.phase = 2; st.step = 0; f.windupUntil = 0; f.move = undefined; c.charge = undefined; f.readyAt = time + 1.2; c.moving = false;
    s.events.push({ kind: "phase", x: c.x, z: c.z, at: time, id: c.id, big: true });
    return;
  }
  const two = st.phase === 2, pat = two ? L.phase2.pattern : L.pattern, name = pat[st.step % pat.length], A = attackNamed(name, data);
  if (!A) { st.step++; return; }
  const fast = two ? L.phase2.speed : 1, cool = two ? L.phase2.cooldown : 1, dmg = data.levels.dps[LEGEND] * A.cooldown * (A.factor ?? 1);
  // Charging: a straight run, trampling everything of the other side it meets, once each.
  if (c.charge) {
    const ch = c.charge, hit = (ch.hit ??= []);
    if (time < ch.until) {
      c.x += ch.dx * ch.speed * dt; c.z += ch.dz * ch.speed * dt; c.moving = true; c.walk += dt * 8; c.facing = ch.dx >= 0 ? 1 : -1;
      for (const o of grid.near(c.x, c.z, A.range + 2)) if (o !== c && targetable(o) && foes(sideOf(o), sideOf(c)) && !truce(c, o) && !hit.includes(o.id) && Math.hypot(o.x - c.x, o.z - c.z) <= A.range + 0.4 + o.level * 0.2) { hit.push(o.id); land(w, s, c, { kind: "creature", id: o.id }, dmg, A, c.x, c.z); }
      for (const v of w.witches) if (v.onGround && !v.down && !hit.includes(-1 - v.id) && Math.hypot(v.x - c.x, v.z - c.z) <= A.range + 0.3) { hit.push(-1 - v.id); land(w, s, c, { kind: "witch", id: v.id }, dmg, A, c.x, c.z); }
      return;
    }
    c.charge = undefined; c.moving = false;
    return;
  }
  if (f.windupUntil > 0) {
    c.moving = false;
    if (time < f.windupUntil) return;
    f.windupUntil = 0; f.move = undefined; f.readyAt = time + A.cooldown * cool; st.step++;
    const aim = Math.atan2(f.aimZ - c.z, f.aimX - c.x);
    if (A.delivery === "quake") {
      s.events.push({ kind: "quake", x: c.x, z: c.z, at: time, id: c.id, big: true });
      area(w, s, c, sideOf(c), c.species, c.x, c.z, A.radius ?? 5, dmg, A, grid);
    } else if (A.delivery === "shot") {
      // The nova: a ring of shots outward, one straight at where it aimed.
      const n = A.shots ?? 8, v = A.speed ?? 8;
      for (let i = 0; i < n; i++) { const a = aim + (i / n) * Math.PI * 2; s.shots.push({ id: s.nextShot++, x: c.x, z: c.z, vx: Math.cos(a) * v, vz: Math.sin(a) * v, until: time + A.range / v, from: c.id, side: sideOf(c), species: c.species, damage: dmg, radius: A.radius ?? 0.8, attack: name }); }
      s.events.push({ kind: "nova", x: c.x, z: c.z, at: time, id: c.id });
    } else if (A.delivery === "beam") {
      const dur = A.duration ?? 2;
      s.beams.push({ id: s.nextShot++, from: c.id, angle: aim, length: A.range, width: A.width ?? 1.5, until: time + dur, nextTick: time, tick: A.tick ?? 0.2, damage: dmg, side: sideOf(c), species: c.species, attack: name, target: f.target!, spin: ((A.spin ?? 150) * Math.PI / 180) * fast });
      s.events.push({ kind: "beam", x: c.x, z: c.z, at: time, id: c.id });
    } else {
      const dx = f.aimX - c.x, dz = f.aimZ - c.z, dd = Math.hypot(dx, dz) || 1;
      c.charge = { dx: dx / dd, dz: dz / dd, speed: (A.speed ?? 8) * fast, until: time + (A.duration ?? 1.5), hit: [] };
      s.events.push({ kind: "rush", x: c.x, z: c.z, at: time, id: c.id });
    }
    return;
  }
  // To each move's reach, then wind it up (where it aims is fixed then: step out of it).
  const reach = A.delivery === "quake" ? (A.radius ?? 5) * 0.7 : A.delivery === "shot" ? A.range * 0.6 : A.delivery === "beam" ? A.range * 0.7 : 14;
  if (A.delivery === "melee" && d < 6 && !(time >= f.readyAt && d >= 4)) {
    // Too close to charge: it backs off first, heavily, to get a run at its target.
    if (d > 1e-3) { c.x -= ((p.x - c.x) / d) * C.legendRun * FIGHT.speed * 0.6 * dt; c.z -= ((p.z - c.z) / d) * C.legendRun * FIGHT.speed * 0.6 * dt; c.moving = true; c.walk += dt * 3; c.facing = p.x >= c.x ? 1 : -1; }
    return;
  }
  if (d > reach) { moveToward(c, p.x, p.z, reach * 0.9, C.legendRun * FIGHT.speed * fast, dt); return; }
  c.moving = false; c.facing = p.x >= c.x ? 1 : -1;
  if (time >= f.readyAt) {
    f.windupUntil = time + A.windup; f.aimX = p.x; f.aimZ = p.z; f.move = name;
    s.events.push({ kind: "windup", x: c.x, z: c.z, at: time, id: c.id });
  }
}
