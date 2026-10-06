// The party's over (Ed, 2026-10-06: "when the soundsystems and speakers are all destroyed, the dance music stops, the
// dancefloor switches off, lights switch off, the upset animals that ran away go home, all the animals go to sleep and make
// little 😴 speech bubbles, and you can walk the map safely"; "Sitting on the beach is the reward. If the music ends, it
// doesn't matter"). No game-over screen: once every soundsystem and the home ring have fallen (g.over), the world goes quiet.
// The waves stop for good, nothing fights or attacks her, and every creature settles and sleeps: the legends back in their
// circles (lull), the rest in their own areas (where they stand if they're there; walking home first, at partyOver.homeSpeed, if she can see them;
// put home if she can't), the leashed and the parked where they are. g.partyOver eases 0 to 1 over partyOver.ease seconds,
// for the view (the lights going out) and the audio (the music winding down).
import { inOwnArea, type Creature } from "./creatures";
import type { Game } from "./game";
import { letPartyLegendGo } from "./leash";
import { lull } from "./legends";

/** Asleep for the view's 😴 and the audio: a creature settled for good (c.sleeping), or a legend lying asleep in its circle. */
export const sleepingNow = (c: Creature): boolean => !c.gone && (!!c.sleeping || (!!c.boss && c.legendState === "asleep" && !c.homing));

/** Everything that keeps a creature busy (fights, sieges, flight, dancing): let go of, so it can go home and lie down. */
function calm(c: Creature): void {
  Object.assign(c, { fight: undefined, siege: undefined, enraged: false, fleeUntil: undefined, wanderTo: undefined, dazed: false, retreat: false, charge: undefined, run: undefined, leap: undefined, burrow: undefined, kx: 0, kz: 0, stunUntil: undefined, slowUntil: undefined, dancing: false, travelling: undefined, rest: 0 });
  if (c.state === "enraged") c.state = undefined; // (back to wild: it never fights again)
}

/** The moment it ends: every creature let go of what it was doing and sent to sleep (see the top of this file). */
export function settle(g: Game): void {
  const time = g.clock.time, far = g.tuning.haze.far + 60, parked = new Set(g.witches.flatMap(w => w.leash.placed.map(p => p.id)));
  const unseen = (x: number, z: number) => g.witches.every(w => Math.hypot(w.body.x - x, w.body.z - z) > far);
  for (const c of g.creatures) {
    if (c.gone) continue;
    if (c.partyLegend && c.leashed) { for (const w of g.witches) w.leash.stack = w.leash.stack.filter(id => id !== c.id); letPartyLegendGo(c); c.sleeping = true; } // (the egg's leash let go, so she walks free: it sleeps where it danced)
    calm(c);
    if (c.sleeping) continue;
    if (c.boss && !c.leashed) { lull(c, time); continue; } // (back to its circle, and to sleep)
    if (c.leashed || parked.has(c.id)) { c.sleeping = true; continue; } // (hers: asleep where it is)
    if (inOwnArea(g.map, c, c.x, c.z)) { c.sleeping = true; continue; }
    if (unseen(c.x, c.z) && unseen(c.anchorX, c.anchorZ)) { c.x = c.tx = c.anchorX; c.z = c.tz = c.anchorZ; c.sleeping = true; } // (put home, out of her sight)
    // (else it walks home in her sight, stepCreature taking it back into its area, and lies down there: stepPartyOver)
  }
  g.combat.busy.clear();
  g.byArea = null;
}

/** A step of the quiet: the ease, and those walking home lying down once they're back in their own area. */
export function stepPartyOver(g: Game, dt: number): void {
  if (!g.over) return;
  if (g.partyOver === 0) settle(g);
  g.partyOver = Math.min(1, g.partyOver + dt / Math.max(1e-3, g.tuning.partyOver?.ease ?? 4) + 1e-9);
  const pace = (g.tuning.partyOver?.homeSpeed ?? 3) * dt;
  for (const c of g.creatures) {
    if (c.gone || c.sleeping || c.boss) continue;
    if (inOwnArea(g.map, c, c.x, c.z)) { c.sleeping = true; c.moving = false; continue; }
    // (walking home, at partyOver.homeSpeed: toward its spot in its own area)
    const dx = c.anchorX - c.x, dz = c.anchorZ - c.z, d = Math.hypot(dx, dz) || 1, step = Math.min(d, pace);
    c.x += (dx / d) * step; c.z += (dz / d) * step; c.tx = c.anchorX; c.tz = c.anchorZ; c.moving = true; c.walk += dt * 4;
    if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
  }
}

/** Debug (?partyover=1): every soundsystem and the home ring down at once, so the quiet comes on the next step. */
export function endParty(g: Game): void {
  for (const s of g.combat.sounds.values()) s.hp = 0;
  g.speakers = g.speakers.map(() => "destroyed");
  if (g.party.spellAt === null) g.party.spellAt = -100; // (the party spell long cast: she isn't held at the decks)
  g.over ??= { at: g.clock.time };
}
