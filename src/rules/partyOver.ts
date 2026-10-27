// The party's over (Ed, 2026-10-06): a run ends in a peaceful afterparty, not a game-over screen. "When the soundsystems and
// speakers are all destroyed, the dance music stops, the dancefloor switches off, lights switch off, the upset animals that
// ran away go home, all the animals go to sleep and make little 😴 speech bubbles, and you can walk the map safely." "Animals
// can all walk home naturally." "I think they can vanish. If they are coming back from vanishing, they can just appear
// wherever their home is."
//
// The rules: once the home ring's last speaker is down (rules/game.ts stepFights; Ed, 2026-10-10: "The party should end when
// all your home speakers are destroyed, not all speakers+soundsystems. When the party ends, undestroyed soundsystems should just
// switch off (sound and lights)": any still standing stay standing, silent and dark, `homeDown`), g.partyOver is set
// and eases in over partyOver.ease seconds (`ease`, 0 to 1: the view's lights, the music's wind-down). From then on the
// waves stop for good, nothing fights or attacks her, and every creature, wild or not, legends and her leashed ones too,
// goes to sleep: the ones in her sight walk home to a spot in their own area at their own pace and lie down there, the rest
// (and those that ran off the map earlier: their records are kept, `gone`) are simply there, already asleep, out of her
// sight. Her leashed ones are let go and sleep where they stand. Asleep is the one shared state (Creature.asleep, with the
// naps and the sleeping art): still, out of every fight, no rune, no 💌s. No drawing here.
//
// The world before the party is the same (Ed, 2026-10-26: "If you leave the treehouse before starting the party, it should be the
// same as after a party is lost; creatures are asleep in their areas and you can't invite them, the night's permanent upgrade find
// is not placed yet"): a night waiting for her party spell (party.spellAt null) lies asleep, every creature in bed in its own
// area, the same sleep (worldAsleep, putToBed), till the spell's cast and it all gets up (stepWorldAsleep).
import type { Game } from "./game";
import type { CombatState } from "./combat/data";
import { isHomeKey } from "./speakers";
import { heal, type Creature } from "./creatures";
import { pointInArea } from "./creatures";
import { letPartyLegendGo } from "./leash";
import type { Relic } from "./legends";

/** Whether the party's over by the fight: every one of the home ring's speakers down (Ed, 2026-10-10), whatever else stands. */
export function homeDown(S: Pick<CombatState, "sounds">): boolean {
  let n = 0;
  for (const [key, h] of S.sounds) if (isHomeKey(key)) { if (h.hp > 0) return false; n++; }
  return n > 0;
}

export interface PartyOver {
  /** The world-clock time the home ring's last speaker fell. */
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
function calm(c: Creature, time: number): void {
  heal(c, time);
  Object.assign(c, {
    fight: undefined, siege: undefined, enraged: false, fleeUntil: undefined, fleeX: undefined, fleeZ: undefined, dazed: false, dazedUntil: undefined,
    charge: undefined, run: undefined, leap: undefined, burrow: undefined, legend: undefined, aims: undefined, kx: 0, kz: 0, stunUntil: undefined, slowUntil: undefined,
    wanderTo: undefined, retreat: undefined, travelling: false, route: undefined, dancing: false, homing: undefined, hp: undefined,
  });
  if (c.state === "enraged") c.state = undefined;
  if (c.boss && c.legendState !== "asleep") { c.legendState = "asleep"; c.restlessness = 0; }
}

/** The world asleep: the afterparty, or a night still waiting for her party spell (the zoo, a review tool, never). Nothing fights
 *  or attacks her, the legends lie still, no 💌 takes, tonight's find isn't there (rules/finds.ts trunkAt's callers). */
export const worldAsleep = (g: Pick<Game, "partyOver" | "party" | "map">): boolean => !!g.partyOver || (g.party.spellAt === null && !g.map.zoo);
/** The world asleep before the party (not after a loss): the night not started yet. */
export const beforeParty = (g: Pick<Game, "partyOver" | "party" | "map">): boolean => !g.partyOver && worldAsleep(g);
/** How far the afterparty's night sounds are in (0 to 1: platform/audio/sfxCues.ts ambience and night): the party's over's
 *  ease (`over`), or all the way before the party (Ed, 2026-10-26, Q-c: "the world sounds as after a loss"), fading out over
 *  `fade` seconds once the spell's cast (a night that never waited, spellAt undefined, has none of it). */
export function nightEase(g: Pick<Game, "partyOver" | "party" | "map" | "clock">, over: number, fade = 4): number {
  if (beforeParty(g)) return 1;
  const at = g.party.spellAt;
  return typeof at === "number" ? Math.max(over, Math.min(1, Math.max(0, 1 - (g.clock.time - at) / fade))) : over;
}
const NO_RELICS: Relic[] = [];
/** The relics out in the world: none before the party (Ed, 2026-10-26: "Relics, like finds, only appear once the party starts":
 *  not lying, glinting, lit, dowsed or drunk till the spell's cast), else the map's. */
export const relicsOut = (g: Pick<Game, "partyOver" | "party" | "map" | "relics">): Relic[] => (beforeParty(g) ? NO_RELICS : g.relics);

/** Where it lies down: a legend where it lay (its lair), anything else a spot in its own area (a circle's baby in its circle). */
function bedOf(g: Game, c: Creature): { x: number; z: number } {
  if (c.boss && c.lairX !== undefined && c.lairZ !== undefined) return { x: c.lairX, z: c.lairZ };
  const [x, z] = pointInArea(g.map, { ...c, dancing: false, leashed: false, state: undefined, enraged: false, anywhere: true }, c.rand);
  return { x, z };
}

/** In bed at once, asleep for good, in its own area (a legend in its lair): out of whatever it was doing. */
export function putToBed(g: Game, c: Creature, time: number): void {
  calm(c, time);
  const b = bedOf(g, c);
  c.x = c.tx = b.x; c.z = c.tz = b.z;
  sleep(c, time);
}

/** A step of the world before the party (worldAsleep, the party not over): every creature up is put to bed at once (she's in her
 *  bedroom as a night starts, out of their sight; the debug arena's left be), and once the spell's cast, everyone the night put to
 *  bed gets up where they lie, as the night would have had them: wild, in their areas (a legend asleep as ever, its quest its own). */
export function stepWorldAsleep(g: Game, time: number): void {
  if (g.partyOver) return;
  if (worldAsleep(g)) {
    const arena = new Set(g.arena?.ids ?? []);
    let put = false;
    for (const c of g.creatures) {
      // (a legend only snores, no dream: Ed, 2026-10-26, "In the world before the party, legends should just show a snore bubble,
      // not a dream"; rules/legends.ts opens its quest again once the spell's cast)
      if (c.boss) c.questOpen = false;
      if (c.asleep && c.napUntil === undefined) continue;
      if (c.gone || c.leashed || c.partyLegend || arena.has(c.id)) continue;
      putToBed(g, c, time); put = true;
    }
    if (put) g.byArea = null;
    g.asleepBeforeParty = true;
    return;
  }
  if (!g.asleepBeforeParty) return;
  for (const c of g.creatures) if (c.asleep && c.napUntil === undefined) { c.asleep = false; c.asleepAt = undefined; c.rest = 0; c.seen = time; }
  g.asleepBeforeParty = false; g.byArea = null;
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
      calm(c, time); sleep(c, time);
    }
    w.leash.stack = []; w.leash.placed = []; w.leash.talk = null; w.pinned = null;
    w.health.hp = g.tuning.witchHealth.hits; w.knock = undefined; w.slowUntil = undefined;
  }
  for (const c of g.creatures) {
    if (c.asleep) { calm(c, time); sleep(c, time); continue; } // (a napper too: asleep for good now, its nap's end gone)
    if (c.gone) {
      // Ran off earlier: back home, already asleep (the record was kept: its species, level and area).
      c.gone = false; calm(c, time);
      const b = bedOf(g, c); c.x = c.tx = b.x; c.z = c.tz = b.z;
      sleep(c, time);
      continue;
    }
    calm(c, time);
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
    if (!c.bed) { calm(c, time); if (c.leashed) c.leashed = false; c.dropped = undefined; const b = bedOf(g, c); c.bed = b; }
    const b = c.bed!, dx = b.x - c.x, dz = b.z - c.z, d = Math.hypot(dx, dz), step = c.speed * g.tuning.partyOver.walk * dt;
    if (d <= Math.max(step, 0.05) || unseen(g, c.x, c.z)) { c.x = c.tx = b.x; c.z = c.tz = b.z; sleep(c, time); continue; }
    c.x += (dx / d) * step; c.z += (dz / d) * step; c.tx = b.x; c.tz = b.z;
    if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
    c.away = dz < -Math.abs(dx);
    c.moving = true; c.walk += dt * 4;
  }
}

/** Debug (?partyover=1): the home ring's speakers down at once, so the party's over now (any other soundsystem switching off). */
export function endParty(g: Game): void {
  for (const [key, h] of g.combat.sounds) if (isHomeKey(key)) h.hp = 0;
  g.speakers = g.speakers.map(() => "destroyed");
  startPartyOver(g, g.clock.time);
}

