// A whole run, headless, for sanity (housekeeping, issue #122): a bot plays the real rules for
// --minutes of game time, and every second the run is checked for what shouldn't happen: a NaN or
// infinity in her, a creature or a letter; an exception; a creature busy (travelling, besieging, on
// a charge, following her) that hasn't moved in --stuck seconds; anything outside the map. The bot:
// on the ground, it 💌s the nearest invitable creature from a few metres off (blinking out of the
// way when hit); once it carries --carry sigils it flies to the next area to be attacked (or a
// soundsystem under siege) and puts them down there; low on hits, it rises to the treetops to heal;
// with nothing to invite near, it flies to the nearest wild area. A summary and the oddities found go
// to stdout (and --json out.json).
//   node tools/balance/playthrough.mjs [--seed 123] [--minutes 15] [--carry 4] [--stuck 30] [--json out.json]
//   Looking into one: --watch 316,613 [--from 590] prints those creatures each second (position, siege,
//   target, timers); --inspect 356 prints their state at the end. ~5 s of wall time a game minute.
import { openRules, arg } from "./lib.mjs";
import { writeFileSync } from "node:fs";

const SEED = +arg("seed", 123), MINUTES = +arg("minutes", 15), CARRY = +arg("carry", 4), STUCK = +arg("stuck", 30);
const { load, close } = await openRules();
const { TUNING } = await load("/src/rules/tuning.ts");
const { newGame, stepGame, STEP, affectionOf } = await load("/src/rules/game.ts");
const { cellKey } = await load("/src/rules/party.ts");

const g = newGame(SEED, TUNING), W = g.witches[0], A = () => affectionOf(g);
g.clock.paused = false;
const odd = [], seen = new Set(), note = (key, text) => { if (seen.has(key)) return; seen.add(key); odd.push({ at: +g.clock.time.toFixed(1), text }); };
const finite = v => v === undefined || Number.isFinite(v);
const B = g.map.bounds, inside = (x, z, pad = 200) => x > B.minX - pad && x < B.maxX + pad && z > B.minZ - pad && z < B.maxZ + pad;
const last = new Map(); // id -> { x, z, at } while busy
const tally = { invited: 0, happy: 0, placed: 0, hits: 0, knockouts: 0, wavesSeen: 0, soundsLost: 0, letters: 0, maxLetters: 0, maxCreatures: 0 };
let mode = "invite", goal = null, rest = false, steps = 0;

const dist = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
/** Where the bot takes its stack: a soundsystem under siege (the nearest), else the next area to be woken. */
function stackGoal() {
  const besieged = [...g.combat.sounds.entries()].filter(([k, h]) => h.hp > 0 && g.creatures.some(c => !c.gone && c.siege === k));
  if (besieged.length) { const [, h] = besieged.sort((a, b) => dist(a[1], g.witch) - dist(b[1], g.witch))[0]; return { x: h.x + 6, z: h.z + 6 }; }
  const next = g.party.next?.[0];
  if (next) { const s = g.map.siteOf(next[0], next[1]); return { x: s.x + 8, z: s.z + 8 }; }
  return { x: g.map.dancefloor.x + 20, z: g.map.dancefloor.z + 20 };
}
/** The nearest invitable creature within r of her. */
function nearestInvitable(r) {
  let best = null, bd = r;
  for (const c of g.creatures) { if (c.gone || c.boss || !A().invitable(c)) continue; const d = dist(c, g.witch); if (d < bd) { bd = d; best = c; } }
  return best;
}
/** The nearest wild (unpartified) area's middle with invitable creatures in it. */
function wildArea() {
  let best = null, bd = Infinity;
  for (const c of g.creatures) { if (c.gone || c.boss || !A().invitable(c) || g.party.areas.has(cellKey(c.cell))) continue; const d = dist(c, g.witch); if (d < bd) { bd = d; best = c; } }
  return best ? { x: best.x, z: best.z } : null;
}

const end = MINUTES * 60, t0 = Date.now();
let errors = 0;
while (g.clock.time < end && !g.over) {
  const w = g.witch, T = g.clock.time;
  const c = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
  const go = (p, slow = 1) => { const dx = p.x - w.x, dz = p.z - w.z, d = Math.hypot(dx, dz) || 1; c.moveX = (dx / d) * slow; c.moveZ = (dz / d) * slow; return d; };
  if (w.seated) c.moveX = 1;
  else if (W.ko) { /* (knocked out: it plays out) */ }
  else if (W.health.hp <= 1 && w.mode === "ground") { rest = true; c.toggleMode = true; }
  else if (rest) { if (W.health.hp >= TUNING.witchHealth.hits) rest = false; }
  else if (mode === "carry") {
    goal ??= stackGoal();
    if (w.mode === "ground" && dist(goal, w) > 60) c.toggleMode = true;
    else if (w.mode === "treetop" && dist(goal, w) < 15) c.toggleMode = true;
    else if (w.mode === "treetop" || w.mode === "rising") go(goal);
    else if (w.mode === "ground") {
      // Each sigil on its own spot on a ring round the goal (pressing over a placed one would pick it up).
      if (g.leash.stack.length) {
        const k = g.leash.placed.length, spot = { x: goal.x + Math.cos(k * 1.3) * (8 + k), z: goal.z + Math.sin(k * 1.3) * (8 + k) };
        if (go(spot) < 1.5) { c.moveX = 0; c.moveZ = 0; if (steps % 10 === 0) c.sigil = true; }
      } else { mode = "invite"; goal = null; }
    }
  } else {
    if (g.leash.stack.length >= CARRY) { mode = "carry"; goal = null; }
    else if (w.mode === "ground") {
      const k = nearestInvitable(60);
      if (k) {
        const d = dist(k, w);
        if (d > 14) go(k); else if (d < 8) { go(k); c.moveX *= -1; c.moveZ *= -1; }
        c.fire = true; c.aimX = k.x - w.x; c.aimZ = k.z - w.z;
      } else { goal = wildArea(); if (goal && dist(goal, w) > 80) c.toggleMode = true; else if (goal) go(goal); }
    } else if (w.mode === "treetop") {
      goal ??= wildArea();
      if (!goal) { /* (nothing left to invite near) */ }
      else if (go(goal) < 25) { c.toggleMode = true; goal = null; }
    }
  }
  try { stepGame(g, c, STEP); } catch (e) { errors++; note(`err:${e.message}`, `exception: ${e.stack?.split("\n").slice(0, 3).join(" | ")}`); if (errors > 5) break; }
  steps++;

  // What happened this step.
  for (const e of W.invites.events) { if (e.kind === "hit" && !e.spent) tally.hits++; if (e.kind === "happy") tally.happy++; }
  for (const e of g.leash.events) { if (e.kind === "invited" && e.at === g.clock.time) tally.invited++; if (e.kind === "placed" && e.at === g.clock.time) tally.placed++; }
  for (const e of g.koEvents) if (e.kind === "down" && e.at === g.clock.time) tally.knockouts++;
  for (const e of g.combat.events) if (e.kind === "soundDestroyed" && e.at === g.clock.time) tally.soundsLost++;
  tally.maxLetters = Math.max(tally.maxLetters, W.invites.letters.length);

  // The checks, every second.
  if (steps % 60 === 0) {
    const live = g.creatures.filter(k => !k.gone);
    tally.maxCreatures = Math.max(tally.maxCreatures, live.length);
    if (![w.x, w.z, w.vx, w.vz, w.lift].every(Number.isFinite)) note("witch-nan", `the witch has a non-finite position or speed: ${JSON.stringify({ x: w.x, z: w.z, vx: w.vx, vz: w.vz, lift: w.lift })}`);
    if (!inside(w.x, w.z, 5)) note("witch-out", `the witch is outside the map at ${w.x.toFixed(0)},${w.z.toFixed(0)}`);
    for (const L of W.invites.letters) if (![L.x, L.z, L.vx, L.vz].every(Number.isFinite)) note("letter-nan", "a 💌 has a non-finite position or speed");
    for (const k of live) {
      if (![k.x, k.z].every(Number.isFinite) || !finite(k.hp) || !finite(k.affection) || !finite(k.kx) || !finite(k.kz)) note(`nan:${k.id}`, `${k.species} ${k.id} (level ${k.level}, ${k.state ?? "wild"}) has a non-finite value: ${JSON.stringify({ x: k.x, z: k.z, hp: k.hp, affection: k.affection, kx: k.kx, kz: k.kz })}`);
      if (Number.isFinite(k.x) && !inside(k.x, k.z) && !k.fleeUntil) note(`out:${k.id}`, `${k.species} ${k.id} is far outside the map at ${k.x.toFixed(0)},${k.z.toFixed(0)}`);
      if (k.hp !== undefined && k.hp < -1e-6 && !k.fleeUntil && !k.dazed && !k.gone) note(`hp:${k.id}`, `${k.species} ${k.id} has negative hp (${k.hp.toFixed(1)}) but isn't fleeing, dazed or gone`);
      // Busy, and somewhere to be: travelling (away from her), besieging (not yet at its soundsystem: there it stands and attacks), on a long charge, following her on the ground.
      const target = k.siege ? g.combat.sounds.get(k.siege) : null, far = (p, r) => p && Math.hypot(p.x - k.x, p.z - k.z) > r;
      const busy = (k.travelling && far(w, 12)) || (k.siege && target && target.hp > 0 && far(target, 12)) || k.run || (k.leashed && g.leash.stack.includes(k.id) && w.mode === "ground");
      if (!busy) { last.delete(k.id); continue; }
      const was = last.get(k.id);
      if (!was || Math.hypot(was.x - k.x, was.z - k.z) > 0.5) last.set(k.id, { x: k.x, z: k.z, at: g.clock.time });
      else if (g.clock.time - was.at > STUCK) {
        const near = Math.hypot(k.x - w.x, k.z - w.z);
        const why = k.travelling ? "travelling" : k.siege ? `besieging ${k.siege}` : k.run ? `on a long charge (${k.run.phase})` : "following her";
        if (!(why === "following her" && near < 25)) note(`stuck:${k.id}:${why}`, `${k.species} ${k.id} (level ${k.level}) has been ${why} without moving for ${STUCK}+ s at ${k.x.toFixed(0)},${k.z.toFixed(0)} (${near.toFixed(0)} m from her)`);
      }
    }
  }
  if (g.party.wave > tally.wavesSeen) tally.wavesSeen = g.party.wave;
  if (arg("watch") && steps % 60 === 0 && g.clock.time >= +arg("from", 0)) for (const id of arg("watch").split(",").map(Number)) { const k = g.creatures[id]; if (!k) continue; const h = k.siege ? g.combat.sounds.get(k.siege) : null; console.log("WATCH", g.clock.time.toFixed(0), id, k.x.toFixed(1), k.z.toFixed(1), "moving", k.moving, "vx", (k.vx ?? 0).toFixed(2), "siege", k.siege, "d", h && Math.hypot(h.x - k.x, h.z - k.z).toFixed(1), "tgt", JSON.stringify(k.fight?.target), "ready", k.fight?.readyAt?.toFixed(1), "wu", k.fight?.windupUntil, "busy", g.combat.busy.has(id), "rest", (k.rest ?? 0).toFixed(1), "stun", k.stunUntil?.toFixed(1), "slow", k.slowUntil?.toFixed(1), "kx", (k.kx ?? 0).toFixed(2), "state", k.state, "dz", k.dazed); }
}

if (arg("inspect")) for (const id of arg("inspect").split(",").map(Number)) { const k = g.creatures[id], h = k.siege ? g.combat.sounds.get(k.siege) : null; console.log("INSPECT", JSON.stringify({ id, species: k.species, level: k.level, boss: k.boss, legendState: k.legendState, state: k.state, enraged: k.enraged, siege: k.siege, x: +k.x.toFixed(1), z: +k.z.toFixed(1), cell: k.cell, fight: k.fight && { target: k.fight.target, readyAt: +k.fight.readyAt.toFixed(1), windupUntil: k.fight.windupUntil }, run: k.run && k.run.phase, dazed: k.dazed, stunUntil: k.stunUntil, slowUntil: k.slowUntil, fleeUntil: k.fleeUntil, wanderTo: k.wanderTo, travelling: k.travelling, sound: h && { x: h.x, z: h.z, hp: h.hp, d: +Math.hypot(h.x - k.x, h.z - k.z).toFixed(1) }, active: g.combat.busy.has(k.id), time: g.clock.time })); }
const out = {
  seed: SEED, gameMinutes: +(g.clock.time / 60).toFixed(2), wallSeconds: Math.round((Date.now() - t0) / 1000), over: !!g.over, errors,
  ...tally, stack: g.leash.stack.length, placedNow: g.leash.placed.length, partified: g.party.areas.size, hp: W.health.hp,
  creatures: { live: g.creatures.filter(k => !k.gone).length, happy: g.creatures.filter(k => !k.gone && k.state === "happy").length, enraged: g.creatures.filter(k => !k.gone && k.state === "enraged").length, leashed: g.creatures.filter(k => !k.gone && k.leashed).length, legends: Object.fromEntries(["asleep", "restless", "angry", "happy"].map(s => [s, g.creatures.filter(k => k.boss && k.legendState === s).length])) },
  oddities: odd,
};
console.log(JSON.stringify(out, null, 2));
if (arg("json")) writeFileSync(arg("json"), JSON.stringify(out, null, 2));
await close();
