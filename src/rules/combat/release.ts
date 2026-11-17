// A creature winding up its strike and letting it go (rules/combat/turn.ts): it telegraphs (gliding to a stop, with momentum; a
// committed melee strike at her surging on), its aim at her followed till it locks; then the blow lands (a lunge), the shot or lob
// flies, the beam burns, or the ground quakes. Split from stepCombat's loop (rules/combat.ts): the same sums in the same order.
import { LEGEND } from "../creatures";
import { foes } from "../creatureStates";
import { FIGHT } from "../movement";
import { targetable, sideOf, truce } from "./targeting";
import { land } from "./hits";
import { aimLocked } from "../attacks/engine";
import { fanOffsets, locksNow, type AimTrack } from "../attacks/aim";
import { packKindOf, dodgeAim } from "./packs";
import { chaseAt, limitTurn } from "../momentum";
import { advanceMotion } from "../locomotion";
import { lungeOf } from "./reach";
import { widthOf } from "./strikes";
import { lead, oldIntercept, oldShotSpeed, type Turn } from "./fighter";
import { sitAfter } from "../skill/openings";

/** Winding up: it telegraphs (gliding to a stop, with momentum), then the blow lands, the shot flies, or the ground quakes.
 *  Null while it's still winding up (its step); once its wind-up is over, its aim at her as followed (`aimed`). */
export function windUp(T: Turn): { aimed: AimTrack | undefined } | null {
  const { k, c, f, p, d, A, spell, mo, long, own, slow, sprint, heavy, speed } = T, { s, time, dt, DA } = k;
  if (DA && A.delivery === "melee" && f.target.kind === "witch" && time < f.windupUntil - DA.commit) {
    const { vx, vz } = lead(T, f.target), ahead = DA.commit + (mo ? Math.min(0.8, d / 35) : Math.min(0.6, d / 50)); // (with momentum it lets go further out, Ed 2026-10-27: led by its longer lunge's flight)
    f.aimX = p.x + vx * ahead * DA.lead; f.aimZ = p.z + vz * ahead * DA.lead;
  }
  // Its aim at her followed till it locks (rules/attacks/aim.ts; the grammar's own in the engine, the old pack bolt's here), and from
  // the lock it holds still till it lets go, so its shot leaves from where it aimed (Ed's sub-rule, 2026-11-12).
  const aimed = f.aim && f.aim.at === f.windupAt ? f.aim.track : undefined;
  if (aimed && !aimed.locked && !spell && f.target.kind === "witch") {
    const toRelease = Math.max(0, f.windupUntil - time), q = oldIntercept(T, A, aimed, toRelease);
    f.aimX = q.x; f.aimZ = q.z;
    if (locksNow(aimed, toRelease, q.flight)) { aimed.locked = true; aimed.at = time; }
  }
  const held = !!aimed?.locked && (!spell || (f.spellCast !== undefined && aimLocked(s.spells!, f.spellCast)));
  if (held) { c.vx = 0; c.vz = 0; c.moving = false; }
  else if (DA && !long && A.delivery === "melee" && f.target.kind === "witch" && d > A.range + p.r && !(c.dug !== undefined && time < c.dug)) { // (not dug in: rooted; nor the long lunge's wind-up, which gathers itself where it began: Ed, 2026-11-13)
    const surge = c.level === LEGEND ? speed : heavy ? Math.max(own * FIGHT.speed * FIGHT.creature * slow, Math.hypot(c.vx ?? 0, c.vz ?? 0)) : Math.max(speed, sprint * FIGHT.speed * FIGHT.creature * DA.surge * slow); // (a heavy carries on at the speed it has built up)
    // (with momentum, its surge in too: for where she was, turning no faster than its limit; its aim, above, still leads her)
    const ms = mo, q = ms ? chaseAt(s, f.target.id, time, ms) ?? p : p, qd = Math.hypot(q.x - c.x, q.z - c.z) || 1e-6;
    let nx = ((q.x - c.x) / qd) * surge, nz = ((q.z - c.z) / qd) * surge;
    if (ms && Math.hypot(c.vx ?? 0, c.vz ?? 0) > 0.5) [nx, nz] = limitTurn(c.vx ?? 0, c.vz ?? 0, nx, nz, ms, dt, FIGHT.momentum); // (slowing as it turns, as it does chasing)
    const nv = Math.hypot(nx, nz), step = Math.min(d - A.range - p.r, nv * dt), ux = nv > 1e-6 ? nx / nv : 0, uz = nv > 1e-6 ? nz / nv : 0;
    advanceMotion(c, { vx: ux * step / dt, vz: uz * step / dt }, time, dt); c.vx = nx; c.vz = nz; c.moving = true; c.walk += dt * 8; if (Math.abs(ux) > 1e-6) c.facing = ux >= 0 ? 1 : -1;
  } else { const vx = c.vx ?? 0, vz = c.vz ?? 0, v = Math.hypot(vx, vz);
    if (v > 0.05) { const nv = Math.max(0, v - ((40 * FIGHT.speed) / FIGHT.momentum) * dt); advanceMotion(c, { vx: vx / v * nv, vz: vz / v * nv }, time, dt); } else { c.vx = 0; c.vz = 0; }
    c.moving = v > 1; }
  if (time < f.windupUntil) return null;
  return { aimed };
}

/** Its wind-up over: the strike let go (a melee one a lunge; one in the grammar released by the engine). */
export function release(T: Turn, aimed: AimTrack | undefined): void {
  const { k, c, f, pd, p, A, spell, atk, mo, long } = T, { s, w, t, time, grid, DA, DB, RG } = k;
  f.windupUntil = 0; f.readyAt = time + A.cooldown;
  // (the hare's own stamp let go: it sits, tuning hareStamp.sit, as above)
  if (A.delivery !== "melee" && sitAfter(c, false, time, t)) { /* (?skill=1: it sits after its attack, by its profile: rules/skill/openings.ts) */ }
  else if (spell && A.delivery === "pulse" && c.species === "hare" && spell.name === "species:hare" && (t.hareStamp?.sit ?? 0) > 0) { c.sitUntil = time + t.hareStamp!.sit; c.vx = 0; c.vz = 0; c.moving = false; }
  if (spell && A.delivery !== "melee") return; // (released by the engine as its windup ends: rules/attacks/engine.ts; a melee one is the lunge below)
  const dmg = atk.damage;
  if (A.delivery === "melee") {
    // Release toward the wind-up aim. Its travel budget is fixed here; strikeTurn bounds later course correction.
    const aimX = f.aimX, aimZ = f.aimZ, reach = (A.lunge ?? 0) * (DA && f.target.kind === "witch" ? DA.lunge : 1);
    // (with momentum, Ed 2026-10-27: its run-in may have left it short, so the committed lunge goes right to where the wind-up aimed,
    // up to a quarter again its usual length: a strike that starts stays reliable; at twice, a skilled bot backing away from a fight
    // was knocked out early in 3 seeds of 12, at a quarter 2, with no momentum none)
    const ax = aimX - c.x, az = aimZ - c.z, ad = Math.hypot(ax, az), L = long ? (c.dug !== undefined && time < c.dug ? 0 : long.length) : lungeOf(c, A, reach, !!mo, time, aimX, aimZ); // (dug in: no lunge)
    // (the long lunge, Ed 2026-11-13: its full length along its line, through and past where it aimed)
    if (ad > 0.01 && L > 0.05) f.lunge = { dx: ax / ad, dz: az / ad, left: L, v: Math.hypot(c.vx ?? 0, c.vz ?? 0), ...(long ? { through: true } : {}) };
    else if (Math.hypot(p.x - c.x, p.z - c.z) <= A.range * widthOf(k, f.target) + p.r) land(w, s, c, f.target, dmg, A, c.x, c.z);
  }
  else if (A.delivery === "shot") {
    // Predictive aim (dodge.b): at her, it aims as it fires, where she'll be when the shot gets there (lead of it), and flies further.
    // (and since Ed's 2026-11-12 ruling its aim at her followed through its wind-up and locked, rules/attacks/aim.ts: let go at that)
    const at = DB && f.target.kind === "witch", v = oldShotSpeed(T, A, f.target); // (faster at her: a shot chasing her down at her walk closes at only its speed less hers)
    let tx = f.aimX, tz = f.aimZ;
    if (at && !aimed) { const hv = lead(T, f.target); tx = p.x; tz = p.z; for (let k = 0; k < 2; k++) { const tt = Math.hypot(tx - c.x, tz - c.z) / v; tx = p.x + hv.vx * tt * DB.lead; tz = p.z + hv.vz * tt * DB.lead; } }
    // A pack's shooter at her aims where a dodge would go (Ed: 3c: "the crossfire aims where the blink went"), and may fire a volley.
    if (pd && f.target.kind === "witch") { const q = dodgeAim(w.packWorld?.dash?.(f.target.id) ?? null, time); if (q) { tx = q.x; tz = q.z; } }
    const ax = tx - c.x, az = tz - c.z, n = pd && "shots" in atk ? (atk.shots as number) : 1, spread = pd && "spread" in atk ? (atk.spread as number) : 0, a0 = Math.atan2(az, ax);
    const fan = fanOffsets(n, spread, RG.on, s.nextShot % 2 ? 1 : -1); // (an even fan keeps one on its aim: rules/attacks/aim.ts)
    for (let k = 0; k < n; k++) {
      const a = a0 + fan[k];
      s.shots.push({ id: s.nextShot++, x: c.x, z: c.z, vx: Math.cos(a) * v, vz: Math.sin(a) * v, until: time + (A.range * (at ? DB.life : 1.3)) / v, from: c.id, side: sideOf(c), species: c.species, damage: dmg, radius: A.radius ?? 0.6, attack: atk.name });
    }
    s.events.push({ kind: "shot", x: c.x, z: c.z, at: time, id: c.id });
  } else if (A.delivery === "lob") {
    const fl = A.flight ?? 1.2, hv = lead(T, f.target), at = DB && f.target.kind === "witch"; // (dodge.b: where she'll be when it lands)
    const tx = at && !aimed ? p.x + hv.vx * fl * DB.lobLead : f.aimX, tz = at && !aimed ? p.z + hv.vz * fl * DB.lobLead : f.aimZ; // (a followed aim: where it locked)
    const pt = pd ? packKindOf(c.species)?.ranged?.patch : undefined; // (a pack lob that leaves a patch: the toad's spores)
    s.shots.push({ id: s.nextShot++, x: c.x, z: c.z, vx: 0, vz: 0, until: time + fl + 1, from: c.id, side: sideOf(c), species: c.species, damage: dmg, radius: A.radius ?? 1.8, attack: atk.name, lob: { fx: c.x, fz: c.z, tx, tz, at: time, lands: time + fl }, ...(pt ? { patch: { r: pt.radius * FIGHT.scale, slow: pt.slow, time: pt.time } } : {}) });
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
