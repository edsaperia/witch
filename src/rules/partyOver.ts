// The party's over (Ed, 2026-10-06): a run ends in a peaceful afterparty, not a game-over screen. "When the soundsystems and
// speakers are all destroyed, the dance music stops, the dancefloor switches off, lights switch off, the upset animals that
// ran away go home, all the animals go to sleep and make little 😴 speech bubbles, and you can walk the map safely." "Animals
// can all walk home naturally." "I think they can vanish. If they are coming back from vanishing, they can just appear
// wherever their home is."
//
// The rules: once every soundsystem and the home ring's speakers are down (rules/game.ts stepFights), g.partyOver is set
// and eases in over partyOver.ease seconds (`ease`, 0 to 1: the view's lights, the music's wind-down). From then on the
// waves stop for good, nothing fights or attacks her, and every creature, wild or not, legends and her leashed ones too,
// goes to sleep: the ones in her sight walk home to a spot in their own area at their own pace and lie down there, the rest
// (and those that ran off the map earlier: their records are kept, `gone`) are simply there, already asleep, out of her
// sight. Her leashed ones are let go and sleep where they stand. Asleep is the one shared state (Creature.asleep, with the
// naps and the sleeping art): still, out of every fight, no rune, no 💌s. No drawing here.
import type { Game } from "./game";
import type { Creature } from "./creatures";
import { pointInArea } from "./creatures";
import { letPartyLegendGo } from "./leash";

export interface PartyOver {
  /** The world-clock time the last soundsystem fell. */
  at: number;
  /** 0 to 1 over partyOver.ease seconds from `at` (smoothstep): for the view and the music. */
  ease: number;
}

/** How far the party's over has eased in at `time`, 0 to 1 (smoothstep over `seconds`). */
export function partyOverEase(at: number, time: number, seconds: number): number {
  const k = Math.max(0, Math.min(1, (time - at) / Math.max(1e-6, seconds)));
  return k * k * (3 - 2 * k);
}

/** Out of every witch's sight (as combat's `unseen`: past the haze, and a margin). */
function unseen(g: Game, x: number, z: number): boolean {
  const far = g.tuning.haze.far + 60;
  return g.witches.every(w => Math.hypot(w.body.x - x, w.body.z - z) > far);
}

/** Asleep for good, here, now. */
function sleep(c: Creature, time: number): void {
  c.asleep = true; c.asleepAt = time; c.napUntil = undefined; c.wakeUntil = undefined; // (no napUntil: asleep for good, the naps' wake rules leave it be)
  c.bed = undefined; c.moving = false; c.vx = 0; c.vz = 0;
  if (c.boss) { c.legendState = "asleep"; c.homing = undefined; c.stateAt = time; c.restlessness = 0; c.questOpen = false; }
}

/** Out of whatever it was doing: no fight, siege, flight, daze, charge or walk; not enraged. */
function calm(c: Creature): void {
  Object.assign(c, {
    fight: undefined, siege: undefined, enraged: false, fleeUntil: undefined, fleeX: undefined, fleeZ: undefined, dazed: false, dazedUntil: undefined,
    charge: undefined, run: undefined, leap: undefined, burrow: undefined, legend: undefined, aims: undefined, kx: 0, kz: 0, stunUntil: undefined, slowUntil: undefined,
    wanderTo: undefined, retreat: undefined, travelling: false, route: undefined, dancing: false, homing: undefined, hp: undefined,
  });
  if (c.state === "enraged") c.state = undefined;
  if (c.boss && c.legendState !== "asleep") { c.legendState = "asleep"; c.restlessness = 0; }
}

/** Where it lies down: a legend where it lay (its lair), anything else a spot in its own area (a circle's baby in its circle). */
function bedOf(g: Game, c: Creature): { x: number; z: number } {
  if (c.boss && c.lairX !== undefined && c.lairZ !== undefined) return { x: c.lairX, z: c.lairZ };
  const [x, z] = pointInArea(g.map, { ...c, dancing: false, leashed: false, state: undefined, enraged: false }, c.rand);
  return { x, z };
}

/** The party's over: when it starts. Everyone stops what they're doing; each creature in her sight sets off home to bed,
 *  the rest are in bed already (the ones that ran off back too, at home), and her leashed ones lie down where they stand. */
export function startPartyOver(g: Game, time: number): void {
  if (g.partyOver) return;
  g.partyOver = { at: time, ease: 0 };
  const S = g.combat;
  S.shots = []; S.busy = new Set();
  // Her leash lets go: they sleep where they are (and she's free of any party legend's pin and of their weight).
  for (const w of g.witches) {
    for (const id of [...w.leash.stack, ...w.leash.placed.map(p => p.id)]) {
      const c = g.creatures[id];
      if (!c) continue;
      if (c.partyLegend) letPartyLegendGo(c); else { c.leashed = false; c.state = "happy"; }
      c.lairX = c.boss ? c.x : c.lairX; c.lairZ = c.boss ? c.z : c.lairZ;
      calm(c); sleep(c, time);
    }
    w.leash.stack = []; w.leash.placed = []; w.leash.talk = null; w.pinned = null;
    w.health.hp = g.tuning.witchHealth.hits; w.knock = undefined; w.slowUntil = undefined;
  }
  for (const c of g.creatures) {
    if (c.asleep) { calm(c); sleep(c, time); continue; } // (a napper too: asleep for good now, its nap's end gone)
    if (c.gone) {
      // Ran off earlier: back home, already asleep (the record was kept: its species, level and area).
      c.gone = false; calm(c);
      const b = bedOf(g, c); c.x = c.tx = b.x; c.z = c.tz = b.z;
      sleep(c, time);
      continue;
    }
    calm(c);
    const b = bedOf(g, c);
    // A party legend sleeps where it stands (it never moves); one in its lair or out of sight is in bed at once.
    if (c.partyLegend) { c.lairX = c.x; c.lairZ = c.z; sleep(c, time); continue; }
    if (unseen(g, c.x, c.z) || Math.hypot(b.x - c.x, b.z - c.z) < 0.5) { c.x = c.tx = b.x; c.z = c.tz = b.z; sleep(c, time); continue; }
    c.bed = b; if (c.boss) c.homing = true; // (walking home: a legend reads as awake till it lies down, as ever)
  }
  g.byArea = null;
}

/** A step of the afterparty: its ease, and everyone still walking home walking on, lying down when they're there (or put to
 *  bed at once once she can't see them). New ones a wild area grows meanwhile can't come (the waves have stopped), and any
 *  creature found awake is put to bed. */
export function stepPartyOver(g: Game, dt: number): void {
  const P = g.partyOver;
  if (!P) return;
  const time = g.clock.time;
  P.ease = partyOverEase(P.at, time, g.tuning.partyOver.ease);
  for (const c of g.creatures) {
    if (c.gone) continue;
    if (c.asleep) { if (c.napUntil !== undefined) sleep(c, time); continue; }
    if (!c.bed) { calm(c); if (c.leashed) c.leashed = false; const b = bedOf(g, c); c.bed = b; }
    const b = c.bed!, dx = b.x - c.x, dz = b.z - c.z, d = Math.hypot(dx, dz), step = c.speed * g.tuning.partyOver.walk * dt;
    if (d <= Math.max(step, 0.05) || unseen(g, c.x, c.z)) { c.x = c.tx = b.x; c.z = c.tz = b.z; sleep(c, time); continue; }
    c.x += (dx / d) * step; c.z += (dz / d) * step; c.tx = b.x; c.tz = b.z;
    if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
    c.away = dz < -Math.abs(dx);
    c.moving = true; c.walk += dt * 4;
  }
}

/** Debug (?partyover=1): every soundsystem and the home ring's speakers down at once, so the party's over now. */
export function endParty(g: Game): void {
  for (const h of g.combat.sounds.values()) h.hp = 0;
  g.speakers = g.speakers.map(() => "destroyed");
  for (const [key] of g.party.areas) if (!g.combat.sounds.has(key)) g.combat.ruined.add(key);
  startPartyOver(g, g.clock.time);
}

