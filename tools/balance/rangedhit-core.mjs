// How often a creature's ranged attack hits her, by how she moves (Ed, 2026-11-12: "the preparation time seems long, projectile
// speed is low, if you're moving at all they basically never hit you"; he chose "measure first"). The core of rangedhit.mjs: one
// cast at a time through the real attack engine (rules/attacks/engine.ts cast and stepSpells, as rules/combat.ts startSpell queues
// it), with the spec built as the fight builds it: the species' own (speciesAttack, held to the reaction floor), a pack or team
// shooter's (the fight's roleSpell: its pack's range, wound up at least as long as its pack's bolt), or the old pack bolt a close
// kind fires in a shooter's role (packAttack at her: dodge.b's windup cap, speed, reach and lead), every one reaching as far as
// the fight lets it reach at her (reachingFurther: dodge.b.range and difficulty.rangedRange). The caster stands still; she is a
// point of radius 0.3 on the ground (the engine's witch), moving as a pattern says at her ground speed and acceleration
// (rules/witch.ts's ground step). A cast counts as a hit if anything of it harms her. In memory only: the variants (lead, speed,
// windup) change the spec or the aim for this run, never the game.
//   (used by node tools/balance/rangedhit.mjs; tested by rangedhit.test.mjs)

/** A seeded random (mulberry32). */
export function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/** Her movement patterns, relative to the line from the caster to her as the cast starts (u: away from it, n: across it). */
export const PATTERNS = {
  still: "(a) stands still",
  across: "(b) walks straight across the shot",
  away: "(c) walks straight away",
  toward: "(c) walks straight at it",
  zigzag: "(d) zig-zags: 45° either side of across, switching every 1 s",
};

/** The modules the harness needs, loaded through `load` (Vite SSR, tools/balance/lib.mjs openRules). */
export async function loadRules(load) {
  const [tuning, species, engine, world, packs, attacks, timeline, combatData, legends] = await Promise.all([
    load("/src/rules/tuning.ts"), load("/src/rules/attacks/species.ts"), load("/src/rules/attacks/engine.ts"), load("/src/rules/attacks/combatWorld.ts"),
    load("/src/rules/combat/packs.ts"), load("/src/rules/attacks/index.ts"), load("/src/rules/attacks/timeline.ts"), load("/src/rules/combat/data.ts"), load("/config/legends.json"),
  ]);
  return { TUNING: tuning.TUNING, speciesAttack: species.speciesAttack, legendAttack: species.legendAttack, SPECIES_ATTACKS: species.SPECIES_ATTACKS, engine, world, packs, LIB: attacks.ATTACK_LIB, liftToFloor: timeline.liftToFloor, COMBAT: combatData.COMBAT, LEGENDS: legends.default ?? legends };
}

const close = d => d === "melee" || d === "pulse";
const RAD = Math.PI / 180;

/** The attack a kind throws at her at a level by a path, as the fight builds it, or null if it has none that way:
 *  path "solo" its own; "team" a pack or team shooter's (its own, at its pack's range and at least its pack bolt's windup);
 *  "pack" the old pack bolt a close kind (or a kind with a designed pack shot) fires as a shooter; level 3 a legend's (solo only).
 *  Returns { spec, fire (how far it fires from at most), stand (where it keeps to: the fight's `want`), aim: "cast"|"release",
 *  lead (release aim's lead factor), commit }. */
export function attackFor(R, sp, level, path = "solo") {
  const t = R.TUNING, DB = t.dodge.b, RR = t.difficulty?.rangedRange ?? 1, floor = t.attacks?.reactionFloor;
  const kStr = deliv => (deliv === "shot" ? DB.range : 1) * (deliv === "shot" || deliv === "lob" || deliv === "beam" ? RR : 1);
  if (level === 3) {
    if (path !== "solo") return null;
    const A = R.LEGENDS.attack, spec = R.legendAttack(sp, { range: A.range, windup: A.windup, interval: A.interval, flight: A.lobFlight, radius: A.lobRadius }, floor);
    return spec ? { spec, fire: A.range, stand: A.range, aim: "cast", windup: spec.cast?.windup, cooldown: A.interval } : null;
  }
  const own = R.speciesAttack(sp, level, floor);
  const kind = R.packs.packKindOf(sp), P = R.packs.packAttack(sp, level, "ranged");
  const ownA = own ? R.world.asFightAttack(own) : null;
  const designed = !!kind?.ranged && !!(kind.ranged.patch || kind.ranged.attacks || kind.ranged.delivery === "lob");
  const finish = (spec, base, deliv) => {
    const k = kStr(deliv), far = R.world.reachingFurther(spec, k), reach = R.world.bodyReach(far), fire = Math.min(base.range * k, reach);
    const kites = deliv === "shot" && R.COMBAT.kite.species.includes(sp), stand = Math.min(base.range * (kites ? R.COMBAT.kite.far : 0.8), fire * 0.9);
    return { spec: far, fire, stand, aim: "cast", windup: far.cast?.windup ?? 0.6, cooldown: far.cast?.cooldown ?? base.cooldown };
  };
  if (path === "solo") return own && !close(ownA.delivery) ? finish(own, ownA, ownA.delivery) : null;
  if (path === "team") {
    // (rules/combat.ts roleSpell, not alone, its move ranged: its own attack unless close or its pack's shot is designed)
    if (!own || close(ownA.delivery) || designed || !P) return null;
    const reach = P.attack.range, k = reach / ownA.range, windup = Math.max(P.attack.windup, own.cast?.windup ?? 0.6);
    const spec = { ...own, cast: { ...own.cast, range: reach, windup }, ...(own.life?.range !== undefined ? { life: { ...own.life, range: own.life.range * k } } : {}) };
    return finish(spec, { ...P.attack, windup }, P.attack.delivery);
  }
  if (path === "pack") {
    // (rules/combat.ts's old shot or lob at her: dodge.b's windup cap, its speed times dodge.b.speed, its reach, and its lead)
    if (!P || !(close(ownA?.delivery ?? "melee") || designed) || (P.attack.delivery !== "shot" && P.attack.delivery !== "lob")) return null;
    const A = P.attack, range = A.range * kStr(A.delivery), windup = Math.min(A.windup, DB.windup), shots = Math.max(1, P.shots);
    const emit = shots > 1 ? { pattern: "fan", n: shots, angle: P.spread / RAD } : undefined;
    if (A.delivery === "lob") return { spec: { cast: { range, windup, cooldown: A.cooldown }, body: { kind: "lob", radius: A.radius ?? 1.8, flight: A.flight ?? 1.2 }, telegraph: { kind: "none" } }, fire: range, stand: Math.min(A.range * 0.8, range * 0.9), aim: "release", lead: DB.lobLead, commit: 0, windup, cooldown: A.cooldown };
    const v = (A.speed ?? 9) * DB.speed;
    return { spec: { cast: { range, windup, cooldown: A.cooldown }, body: { kind: "bolt", radius: A.radius ?? 0.6 }, speed: { v }, life: { range: range * DB.life }, ...(emit ? { emit } : {}), telegraph: { kind: "none" } }, fire: range, stand: Math.min(A.range * 0.8, range * 0.9), aim: "release", lead: DB.lead * (t.creatureMomentum?.strikeLead ?? 1), commit: 0, windup, cooldown: A.cooldown };
  }
  return null;
}

/** Is this attack ranged (a shot, a lob, a beam, an area put down where she stands, or a line of ground going off out from it)? */
export function isRanged(R, spec) {
  const d = R.world.asFightAttack(spec).delivery;
  return d === "shot" || d === "lob" || d === "beam" || (d === "pulse" && spec.area?.shape === "line");
}

/** A variant, in memory: { lead: per-level factor (or a number), commit (s its aim locks before release, or by level), impact (s it
 *  locks at least before it can reach her, by level; never under the reaction floor), leadOld (the
 *  old pack bolts too), speed (times), minSpeed
 *  (times her ground speed, a floor), windup (times), windupFloor (s) }. Returns the attack changed. */
export function applyVariant(R, atk, level, V = {}) {
  if (!atk || !V || !Object.keys(V).length) return atk;
  let spec = atk.spec, out = { ...atk };
  const her = R.TUNING.groundSpeed;
  if (V.speed || V.minSpeed) {
    const k = V.speed ?? 1, grow = s => {
      if (!s) return s;
      const v0 = s.speed?.v ?? (s.speed?.profile === "slow" ? 6 : 28);
      let v = v0 * k; if (V.minSpeed) v = Math.max(v, V.minSpeed * her);
      const ratio = v / v0, flight = s.body?.flight;
      return { ...s, speed: { ...s.speed, v, ...(s.speed?.to !== undefined ? { to: s.speed.to * ratio } : {}) }, ...(s.body?.kind === "lob" && flight ? { body: { ...s.body, flight: Math.max(0.3, flight / Math.max(1, ratio)) } } : {}) };
    };
    spec = grow(spec);
  }
  if (V.windup) {
    const w0 = spec.cast?.windup ?? 0.6, w = Math.max(V.windupFloor ?? 0, w0 * (typeof V.windup === "number" ? V.windup : V.windup[level] ?? 1));
    spec = R.liftToFloor({ ...spec, cast: { ...spec.cast, windup: Math.round(w * 1000) / 1000 } }, R.LIB, R.TUNING.attacks?.reactionFloor);
    out.windup = spec.cast.windup;
  }
  if (V.lead !== undefined) {
    const L = typeof V.lead === "number" ? V.lead : V.lead[level] ?? 0;
    const commit = V.commit === undefined ? 0.2 : typeof V.commit === "number" ? V.commit : V.commit[level] ?? 0.2;
    const impact = V.impact === undefined ? undefined : typeof V.impact === "number" ? V.impact : V.impact[level];
    if (atk.aim === "cast") { out.aim = "release"; out.lead = L; out.commit = commit; out.floorLock = true; out.impact = impact; }
    else if (V.leadOld) { out.lead = L; out.commit = commit; out.floorLock = true; out.impact = impact; } // (the old pack bolt leads fully at its release now; only changed if asked)
  }
  out.spec = spec;
  return out;
}

/** Where to aim a body so its path (curves and all, unhomed) passes through (qx, qz) from (x, z): the heading and the time it takes. */
function solveAim(R, spec, x, z, qx, qz, W) {
  const kind = spec.body?.kind ?? "bolt", dq = Math.hypot(qx - x, qz - z);
  let h = Math.atan2(qz - z, qx - x);
  if (kind === "lob") return { heading: h, time: spec.body?.flight ?? 1.2 };
  if (kind !== "bolt" && kind !== "runner") return { heading: h, time: 0 };
  let time = dq / Math.max(1, R.engine.speedAt(spec, 0));
  for (let it = 0; it < 3; it++) {
    const p = R.engine.predictPath(spec, x, z, h, -1, W);
    // (where the path crosses her distance from the caster)
    let hit = -1;
    for (let i = 2; i < p.length; i += 2) { if (Math.hypot(p[i] - x, p[i + 1] - z) >= dq) { hit = i; break; } }
    if (hit < 0) break;
    const d0 = Math.hypot(p[hit - 2] - x, p[hit - 1] - z), d1 = Math.hypot(p[hit] - x, p[hit + 1] - z), f = d1 > d0 ? (dq - d0) / (d1 - d0) : 0;
    const px = p[hit - 2] + (p[hit] - p[hit - 2]) * f, pz = p[hit - 1] + (p[hit + 1] - p[hit - 1]) * f;
    time = ((hit / 2 - 1) + f) * 0.1;
    let off = Math.atan2(qz - z, qx - x) - Math.atan2(pz - z, px - x);
    off = Math.atan2(Math.sin(off), Math.cos(off));
    if (Math.abs(off) < 1e-3) break;
    h += off;
  }
  return { heading: h, time };
}

/** One cast at her from `d` m, her moving by `pattern` (sign: which way across; phase: the zig-zag's), her mode "ground" or
 *  "treetop". Returns { hit, at (s from the windup's start to the first harm), released, bodies }. */
export function trial(R, atk, { d, pattern = "still", sign = 1, phase = 0, mode = "ground", seed = 1, dt = 1 / 60, maxTime, drift = 0, driftAngle = Math.PI / 2 } = {}) {
  const { engine } = R, t = R.TUNING, S = engine.newSpells(seed), speed = t.groundSpeed, kg = 1 - Math.exp(-t.groundAcceleration * dt);
  const her = { x: d, z: 0, vx: 0, vz: 0 }, me = { x: 0, z: 0 }; // (the caster: still, or drifting `drift` m/s at driftAngle off the line to her through its windup, as it glides about)
  const want = time => {
    switch (pattern) {
      case "across": return [0, sign];
      case "away": return [1, 0];
      case "toward": return [-1, 0];
      case "zigzag": { const k = Math.floor(time + phase) % 2 === 0 ? 1 : -1, c = Math.SQRT1_2; return [k * c, sign * c]; }
      default: return [0, 0];
    }
  };
  [her.vx, her.vz] = want(0).map(v => v * speed);
  let hit = false, at = null, released = false;
  const witch = () => ({ kind: "witch", id: 0, x: her.x, z: her.z, r: 0.3, side: "party", vx: her.vx, vz: her.vz });
  const W = {
    seed,
    near(x, z, r) { return mode === "ground" && Math.hypot(her.x - x, her.z - z) <= r + 1 ? [witch()] : []; },
    hostile(side, target) { return target.kind === "witch"; },
    harm(target, damage, effect, fx, fz, source, attack, body, context) { void fx; void fz; void source; void attack; void body; void context; if (target.kind === "witch" && (damage > 0 || effect)) { if (!hit) at = now; hit = true; } },
    where(kind, id) { return kind === "witch" ? { x: her.x, z: her.z, vx: her.vx, vz: her.vz } : id === 1 ? { x: me.x, z: me.z } : null; },
    force(target, fx, fz, push, ddt) { if (target.kind !== "witch") return; const dx = her.x - fx, dz = her.z - fz, dd = Math.hypot(dx, dz) || 1; her.x += (dx / dd) * push * ddt; her.z += (dz / dd) * push * ddt; },
    stillCasting() { return true; },
    packmates() { return []; },
    beat: 60 / (t.beat?.bpm ?? 120),
  };
  let now = 0;
  const windup = atk.spec.cast?.windup ?? 0.6, id = engine.cast(S, W, atk.spec, "trial", { id: 1, x: 0, z: 0, side: "wild", species: "trial", heading: 0 }, witch(), 0, 1, windup);
  // (its aim locks `commit` before it lets go, and never less than the reaction floor before it can reach her: an area put down where
  // she stands has no flight to warn her by, so it locks the whole floor ahead)
  const kind = atk.spec.body?.kind ?? "bolt", flight0 = kind === "lob" ? atk.spec.body?.flight ?? 1.2 : kind === "bolt" || kind === "runner" ? d / Math.max(1, engine.speedAt(atk.spec, 0)) : 0;
  const lockAt = atk.aim === "release" ? Math.max(0, windup - Math.max(atk.commit ?? 0, (atk.floorLock ? Math.max(t.attacks?.reactionFloor ?? 0.45, atk.impact ?? 0) : 0) - flight0)) : null;
  let locked = false;
  const end = maxTime ?? windup + 9;
  for (now = dt; now <= end + 1e-9; now += dt) {
    const [mx, mz] = want(now);
    her.vx += (mx * speed - her.vx) * kg; her.vz += (mz * speed - her.vz) * kg;
    her.x += her.vx * dt; her.z += her.vz * dt;
    if (now <= windup + 1e-9) { me.x += Math.cos(driftAngle) * drift * dt; me.z += Math.sin(driftAngle) * drift * dt; }
    if (lockAt !== null && !locked && now >= lockAt - 1e-9) {
      // (the proposed aim: locked `commit` before it lets go, at where she'll be when it gets there, `lead` of it)
      locked = true;
      for (const p of S.pending) if (p.cast === id && p.depth === 0) {
        let qx = her.x, qz = her.z;
        for (let k = 0; k < 16; k++) { const s = solveAim(R, atk.spec, me.x, me.z, qx, qz, W), tt = (windup - lockAt) + s.time; qx = her.x + her.vx * tt * atk.lead; qz = her.z + her.vz * tt * atk.lead; }
        p.heading = solveAim(R, atk.spec, me.x, me.z, qx, qz, W).heading;
        p.aimAt = { x: qx, z: qz };
        if (atk.spec.emit?.pattern === "burst" || atk.spec.emit?.pattern === "volley") p.attack = { ...p.attack, emit: { ...p.attack.emit, aim: "lead" } };
      }
    }
    engine.stepSpells(S, W, R.LIB, now, dt);
    if (!released && S.events.some(e => e.kind === "release")) released = true;
    if (hit) break;
    if (now > windup + 0.05 && !S.pending.length && !S.bodies.some(b => b.alive) && !S.zones.some(z => z.alive) && !S.beams.some(b => b.alive)) break;
  }
  return { hit, at, released, bodies: S.stats.bodies[0] };
}

/** The share of `n` casts that hit her, from distances drawn evenly over [lo, hi], each pattern's way across, zig-zag phase and
 *  the caster's drift direction (at `drift` m/s through its windup) drawn from `seed`: { rate, n, meanAt }. */
export function hitRate(R, atk, pattern, { n = 200, lo, hi, seed = 1, mode = "ground", drift = 0 } = {}) {
  const r = rng(seed * 7919 + pattern.length * 31), dLo = lo ?? Math.max(3, atk.stand * 0.75), dHi = hi ?? Math.max(dLo, Math.min(atk.fire, atk.stand * 1.25));
  let hits = 0, at = 0;
  for (let i = 0; i < n; i++) {
    const d = dLo + (dHi - dLo) * r(), sign = r() < 0.5 ? -1 : 1, phase = r(), driftAngle = r() * Math.PI * 2;
    const o = trial(R, atk, { d, pattern, sign, phase, mode, seed: seed + i, drift, driftAngle });
    if (o.hit) { hits++; at += o.at; }
  }
  return { rate: hits / n, n, meanAt: hits ? at / hits : NaN };
}

/** How long from its windup's start until it reaches her where she stood (s), and how far she walks in that time (m). */
export function timeToImpact(R, atk, d) {
  const spec = atk.spec, kind = spec.body?.kind ?? "bolt", windup = spec.cast?.windup ?? 0.6;
  let flight = 0;
  if (kind === "lob") flight = spec.body?.flight ?? 1.2;
  else if (kind === "bolt" || kind === "runner") { let x = 0, tt = 0; const dt = 1 / 120; while (x < d && tt < 12) { x += R.engine.speedAt(spec, tt) * dt; tt += dt; } flight = tt; }
  else if (kind === "beam") flight = spec.beam?.charge ?? 0;
  const total = windup + flight;
  return { windup, flight, total, walked: total * R.TUNING.groundSpeed };
}
