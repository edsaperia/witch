// The challenge area (Ed, 2026-11-03; docs/plans/follower-buffs-and-challenge-areas.md section 2; the tuning's `challenge`). One a
// map: the find's own area (tuning findArea, map.specialSites, kind "challenge": never home or an area touching it, off the ley route,
// no stump, wave or ley-line stop, every touching area's path leading to it, the telescope's constellation at its bearing).
//   The place: "a large stone floor circle (like the legend circle) with the glowing sigil of the island carved into it, with a circle
//     of stone columns around the edge (we already have art for this)": `radius` metres round its site, `columns` columns round its
//     edge (render/challenge.ts draws them; here only where they stand: columnSpots). Its area is themed on the island's own animal
//     (rules/map.ts themeSpecials).
//   Its pack: "one adult and one youth of every creature kind on the island" (`adults` and `youths` of each kind of its roster:
//     packKinds), wild animals of the challenge area (their cell its cell; spawnPack, appended after every other creature): they watch
//     her as she comes down in it, the wild watch's warning (rules/wildWatch.ts), then hunt her till she takes off (rules/hunt.ts),
//     at the difficulty as every wild creature (tuning difficulty, in combat). They can't be leashed: one invited is happy where it
//     stands, its sigil kept (c.atStone: no rune at its feet; stepChallenge).
//   Clearing it: "When they're all invited or have run off, you can go to the special place and cast the music spell" (challengeReady):
//     on foot within `castReach` of its middle, the sigil button held, the stones' spell (rules/stoneStacks.ts stepCast, its target
//     the circle: challengeCastAt). Cast, "something cool appears" (the coordinator's pick: a small dancefloor rising): the sigil and
//     columns light on the beat (render/challenge.ts), and the pack "become happy animals that party in the challenge area and can't
//     be leashed" (clearChallenge).
//   The reward: "when you clear it you get the find": tonight's find, at its middle (placeTrunk), can't be taken with E till then and
//     is hers at the cast (the "found" event, as E at a find). Which find: for now the night's one draw over everything she hasn't
//     found (Ed, 2026-11-03: "for now just make it one find selected at random and we will adjust later"); with `findSets` on, drawn
//     from the island's own set instead (rules/findSets.ts; fillTrunk). Nothing left for her (or, with the sets, the set hers), the
//     trunk is empty and the reward is a flask (Ed: "when you have them all you get a flask instead"): its sigil laid at the circle,
//     drunk with E as any, a growth spurt. No boon: "No boons from challenges. Follower buffs replace them".
//   Timing: an uncleared challenge closes only once the night is won or lost (Ed, 2026-11-03, on #1725): its pack calm (a friendly
//     area's: they leave her be), its find gone from the map, its sigil dark, nothing to cast (stepChallenge; the "closed" event, said
//     under the clock).
//   Optional: it isn't on the route, so it never holds up the win (rules/win.ts: the route and its areas only), nor do its pack.
// Deterministic (online lockstep): every choice is the map's seed's, every change the fixed step's. No drawing here.
import type { Game, Witch } from "./game";
import type { ForestMap, SpecialSite } from "./map";
import { AREA_TYPES } from "./map";
import type { Cell } from "./partition";
import type { Tuning } from "./tuning";
import type { LeashEvent } from "./leash";
import { makeCreature, speedFactor, type Creature, type Level } from "./creatures";
import { islandKinds } from "./dancefloor";
import { holdsArea } from "./clear";
import { befriend, danceAt, stateOf } from "./creatureStates";
import { cellKey } from "./party";
import { won } from "./win";
import { worldAsleep } from "./partyOver";
import { findKind } from "./finds";
import { addFloorHat } from "./houseRooms";
import { LEGENDS, relicKinds } from "./legends";
import { befriendArea } from "./sigilButton";
import { castOn } from "./stoneStacks";
import { hash2, rng } from "./random";

export interface ChallengeTuning { on: boolean; radius: number; margin: number; columns: number; adults: number; youths: number; castReach: number; findSets: boolean }
export const CHALLENGE_DEFAULT: ChallengeTuning = { on: false, radius: 36, margin: 3, columns: 30, adults: 1, youths: 1, castReach: 5, findSets: false };
export const challengeOf = (t: Tuning): ChallengeTuning => ({ ...CHALLENGE_DEFAULT, ...t.challenge });

/** What the page says of it (under the clock: main.ts): the pack all won over or gone (ready to cast), cleared (and its reward),
 *  closed (the final wave coming, or the night over). This frame's, emptied each frame as the waves' are. */
export interface ChallengeEvent { kind: "ready" | "cleared" | "closed"; at: number; x: number; z: number; reward?: "find" | "flask" }

/** The night's challenge: its area (key, cell), its circle's middle and radius, its pack (creature ids), and when it was ready, cleared
 *  or closed (game time; null not yet), its reward once cleared. */
export interface ChallengeState {
  key: string; cell: Cell; x: number; z: number; radius: number;
  pack: number[];
  readyAt: number | null; clearedAt: number | null; closedAt: number | null;
  reward: "find" | "flask" | null;
  events: ChallengeEvent[];
}

/** The map's challenge area's site (map.specialSites, kind "challenge"), or null (none: the challenge off, the zoo, a map not grown
 *  from areas). */
export const challengeSite = (map: Pick<ForestMap, "specialSites">): SpecialSite | null => map.specialSites?.find(sp => sp.kind === "challenge") ?? null;

/** The kinds its pack is of: every kind on the island's roster, in the roster's order (a map not by roster: its areas' kinds). */
export const packKinds = (map: ForestMap): string[] => [...islandKinds(map, t => AREA_TYPES[t]?.creature ?? "")].filter(Boolean);

/** Where its columns stand (Ed: "a circle of stone columns around the edge"): `columns` evenly round its circle's edge, the first
 *  due north. */
export function columnSpots(site: { x: number; z: number }, t: Tuning): { x: number; z: number }[] {
  const C = challengeOf(t), n = Math.max(0, Math.round(C.columns)), out: { x: number; z: number }[] = [];
  for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (i / n) * Math.PI * 2; out.push({ x: site.x + Math.cos(a) * C.radius, z: site.z + Math.sin(a) * C.radius }); }
  return out;
}

/** Its pack (Ed: "one adult and one youth of every creature kind on the island"): `adults` adults and `youths` youths of each of
 *  packKinds, wild creatures of its area, ids from `first` on (they're appended to the night's creatures). None without one. */
export function spawnPack(map: ForestMap, first: number): Creature[] {
  const S = challengeSite(map);
  if (!S) return [];
  const C = challengeOf(map.tuning), t = map.tuning, cell: [number, number] = [S.cell[0], S.cell[1]], out: Creature[] = [];
  const r = rng(map.seed * 7919 + cell[0] * 131 + cell[1] * 977 + 5), own = AREA_TYPES[map.typeOf(cell[0], cell[1])]?.creature ?? "";
  const make = (kind: string, level: Level) => {
    const c = makeCreature(map, cell, level, first + out.length, r);
    c.speed = (c.speed / speedFactor(own, level, t)) * speedFactor(kind, level, t); // (its own kind's pace, not its area type's)
    c.species = kind;
    out.push(c);
  };
  for (const kind of packKinds(map)) {
    for (let i = 0; i < Math.round(C.adults); i++) make(kind, 2);
    for (let i = 0; i < Math.round(C.youths); i++) make(kind, 1);
  }
  return out;
}

/** The night's challenge, its pack among `creatures` (by their cell), or null with none. */
export function newChallenge(map: ForestMap, creatures: readonly Creature[]): ChallengeState | null {
  const S = challengeSite(map);
  if (!S) return null;
  const key = cellKey(S.cell);
  return { key, cell: [S.cell[0], S.cell[1]], x: S.x, z: S.z, radius: challengeOf(map.tuning).radius, pack: creatures.filter(c => cellKey(c.cell) === key).map(c => c.id), readyAt: null, clearedAt: null, closedAt: null, reward: null, events: [] };
}

/** Whether a creature is of the challenge's pack (a creature of its area). */
export const inPack = (g: Pick<Game, "challenge">, c: Creature): boolean => !!g.challenge && c.cell[0] === g.challenge.cell[0] && c.cell[1] === g.challenge.cell[1];

/** Its pack still holding it (rules/clear.ts holdsArea: wild or enraged, not invited, not run off). */
export const packLeft = (g: Pick<Game, "challenge" | "creatures">): Creature[] => (g.challenge ? g.challenge.pack.map(id => g.creatures[id]).filter(c => c && holdsArea(c)) : []);

/** Whether it can still be cleared: not cleared, not closed. */
export const challengeOpen = (g: Pick<Game, "challenge">): boolean => !!g.challenge && g.challenge.clearedAt === null && g.challenge.closedAt === null;

/** Whether it's too late: the night won (the victory lap home) or lost (the party's over). Ed, 2026-11-03, on #1725: only then,
 *  not at last call. */
export const challengeLate = (g: Game): boolean => won(g) || !!g.partyOver;

/** Whether the spell can be cast on it now: open, the party on, and every one of its pack invited or run off. */
export const challengeReady = (g: Game): boolean => challengeOpen(g) && !worldAsleep(g) && !challengeLate(g) && packLeft(g).length === 0;

/** The circle as a cast's target, where witch W stands: on foot, within castReach of its middle, ready; else null. */
export function challengeCastAt(g: Game, W: Witch): { key: string; cell: Cell; x: number; z: number } | null {
  const ch = g.challenge, b = W.body;
  if (!ch || !castOn(g.tuning) || b.mode !== "ground" || b.seated || b.perch || W.ko) return null;
  if (Math.hypot(b.x - ch.x, b.z - ch.z) > challengeOf(g.tuning).castReach || !challengeReady(g)) return null;
  return { key: `challenge:${ch.key}`, cell: ch.cell, x: ch.x, z: ch.z };
}

/** Whether a find is the challenge's, still locked (its reward: not taken with E before the circle's cleared). */
export const lockedFind = (g: Pick<Game, "challenge">, T: { cell: readonly [number, number] } | null): boolean =>
  !!T && !!g.challenge && g.challenge.clearedAt === null && T.cell[0] === g.challenge.cell[0] && T.cell[1] === g.challenge.cell[1];

/** The spell cast on the circle by witch W (at her time ht): cleared. The pack happy, partying round the circle, never to be leashed
 *  (their sigils kept: no rune); the reward hers: tonight's find ("found", as E at it), else (her set whole: the trunk empty) a flask's
 *  sigil laid at its middle. Its events into `events` (the sigil button's). */
export function clearChallenge(g: Game, W: Witch, ht: number, events: LeashEvent[]): void {
  const ch = g.challenge;
  if (!ch || ch.clearedAt !== null) return;
  const time = g.clock.time;
  ch.clearedAt = time;
  for (const id of ch.pack) {
    const c = g.creatures[id];
    if (!c || c.gone || c.leashed || c.fleeUntil === Infinity) continue;
    if (stateOf(c) !== "happy") befriend(c, time);
    Object.assign(c, { atStone: true, friendly: true, hunting: undefined, watchUntil: undefined, fight: undefined });
    danceAt(c, { x: ch.x, z: ch.z }, ch.radius * 0.8);
  }
  g.friendly.add(ch.key); // (no watch, no hunt: the pack's partying)
  g.wildEntry.delete(ch.key);
  g.byArea = null;
  const T = g.trunk;
  if (T && T.item && !T.found && T.cell[0] === ch.cell[0] && T.cell[1] === ch.cell[1]) {
    T.found = true;
    findKind(T.kind).claim?.(W.spells, T.item);
    if (T.kind === "hat") addFloorHat(W, T.item);
    events.push({ kind: "found", id: W.id, x: T.x, z: T.z, at: ht, obj: T.item, find: T.kind });
    ch.reward = "find";
  } else {
    const all = relicKinds(LEGENDS.relics), kind = all[Math.floor(hash2(g.seed, ch.cell[0] * 31 + ch.cell[1], 7753) * all.length) % all.length]?.kind ?? LEGENDS.relics.kinds[0];
    const x = ch.x, z = ch.z + 2;
    g.relics.push({ id: g.relics.length, kind, x, z, cell: [ch.cell[0], ch.cell[1]], state: "dropped", sx: x, sz: z });
    ch.reward = "flask";
  }
  ch.events.push({ kind: "cleared", at: time, x: ch.x, z: ch.z, reward: ch.reward });
}

/** Each step: closes it once it's too late (its pack calm, its find gone); keeps its happy pack unleashable (no rune: c.atStone);
 *  says when it's ready to cast. */
export function stepChallenge(g: Game): void {
  const ch = g.challenge;
  if (!ch) return;
  const time = g.clock.time;
  if (ch.clearedAt === null && ch.closedAt === null && challengeLate(g)) {
    ch.closedAt = time;
    g.friendly.add(ch.key); befriendArea(g, ch.key); // (calm: they leave her be, as a friendly area's; rules/sigilButton.ts)
    g.wildEntry.delete(ch.key);
    if (lockedFind(g, g.trunk)) g.trunk = null; // (its find gone, its constellation with it)
    ch.events.push({ kind: "closed", at: time, x: ch.x, z: ch.z });
  }
  for (const id of ch.pack) { const c = g.creatures[id]; if (c && !c.gone && !c.leashed && !c.atStone && stateOf(c) === "happy") c.atStone = true; }
  if (ch.readyAt === null && challengeReady(g) && ch.pack.length) { ch.readyAt = time; ch.events.push({ kind: "ready", at: time, x: ch.x, z: ch.z }); }
}
