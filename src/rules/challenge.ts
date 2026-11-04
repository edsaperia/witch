// The challenge area (Ed, 2026-11-03; docs/plans/follower-buffs-and-challenge-areas.md section 2; the tuning's `challenge`). One a
// map: the find's own area (tuning findArea, map.specialSites, kind "challenge": never home or an area touching it, off the ley route,
// no stump, wave or ley-line stop, every touching area's path leading to it, the telescope's constellation at its bearing).
//   The place: "a large stone floor circle (like the legend circle) with the glowing sigil of the island carved into it, with a circle
//     of stone columns around the edge (we already have art for this)": round its site, its columns round its edge (render/challenge.ts
//     draws them; here only where they stand: columnSpots). Its area is themed on the island's own animal (rules/map.ts themeSpecials).
//   Its columns are its sigil stack (Ed, 2026-11-03: "The challenge area has no sigil stack, so you can't see how many wild creatures
//     still standing. How about there are the same number of columns as creature types, and the sigils are on top of the columns, one
//     type per column?"): one column a kind of the island's roster (its kinds: packKinds, in the roster's order), evenly round the
//     circle clockwise from north, `spacing` metres apart along its edge, so the circle grows with the roster (rules/challengeCircle.ts:
//     the larger of `radius` and kinds x spacing / 2 pi; Ed: "the area will have to be big to fit a huge circle", which the map's
//     claim makes room for: rules/map.ts). On each column, its kind's wild fighters still standing, as a rune stone's column shows
//     them (rules/stoneStacks.ts: hostileSigil), adult below and youth above (challengeColumns): one invited, or run off, gone from
//     it; a column with none left is that kind won, lit; every column lit, the pack's cleared and the spell can be cast.
//   Its pack: "one adult and one youth of every creature kind on the island" (`adults` and `youths` of each kind of its roster:
//     packKinds), wild animals of the challenge area (their cell its cell; spawnPack, appended after every other creature): stone
//     statues at their posts till she sets foot on its floor, then waking over 4 bars into a wild pack that hunts her, going back to
//     stone, whole, only once she's knocked down or up in the treetops outside its area (Ed, 2026-11-04; rules/challengeStatues.ts), at the difficulty as every
//     wild creature (tuning difficulty, in combat); with the statues off, they watch her come down anywhere in its area as before. They can't be leashed: one invited is happy where it
//     stands, no rune at its feet (c.atStone; stepChallenge).
//   Clearing it: "When they're all invited or have run off, you can go to the special place and cast the music spell" (challengeReady):
//     on foot within `castReach` of its middle (grown with the circle: castReachOf), the sigil button held, the stones' spell
//     (rules/stoneStacks.ts stepCast, its target the circle: challengeCastAt). Cast, "something cool appears" (Ed, on #1725: home's
//     dancefloor, filling the circle): the columns light on the beat, home's dancefloor fills the circle in place of its stone floor
//     (Ed, on #1725: "it should fill the circle, like the one at home does"; render/challenge.ts), and the pack "become happy animals
//     that party in the challenge area and can't be leashed", dancing on it (clearChallenge).
//   The reward: "when you clear it you get the find": tonight's find, unseen till then (render/view/finds.ts), comes down from the sky
//     onto the middle of the new dancefloor over FIND_DESCENT seconds from the clearing (Ed, 2026-11-03, on #1725: "the find comes
//     down from the sky when the challenge is cleared"; timed from clearedAt, so every player sees the same), and she picks it up
//     there with E as any find (the "found" event; not before it's landed: lockedFind). Which find: for now the night's one draw over everything she hasn't
//     found (Ed, 2026-11-03: "for now just make it one find selected at random and we will adjust later"); with `findSets` on, drawn
//     from the island's own set instead (rules/findSets.ts; fillTrunk). Nothing left for her (or, with the sets, the set hers), the
//     trunk is empty and the reward is a flask (Ed: "when you have them all you get a flask instead"), coming down the same way: its
//     sigil laid at the circle's middle as it lands, drunk with E as any, a growth spurt. No boon: "No boons from challenges. Follower buffs replace them".
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
import { makeCreature, speedFactor, type Creature, type Level } from "./creatures";
import { islandKinds } from "./dancefloor";
import { holdsArea } from "./clear";
import { befriend, danceAt, stateOf } from "./creatureStates";
import { cellKey } from "./party";
import { won } from "./win";
import { worldAsleep } from "./partyOver";
import { LEGENDS, relicKinds } from "./legends";
import { befriendArea } from "./sigilButton";
import { castOn } from "./stoneStacks";
import { hash2, rng } from "./random";
import { challengeCircle } from "./challengeCircle";
import type { StackEntry } from "./stoneStacks";

/** Its statues' knobs (rules/challengeStatues.ts; Ed, 2026-11-04): on; the wake-up's length in bars; the posts, `first` m in from
 *  their column and each next `gap` m further in (Ed, 2026-11-04: "Further apart, same line"; on #1827, "youths should be closer to
 *  the middle of the circle than the elder. If this doesn't fit, make the circle bigger."); the walk back at `walkBack` times their
 *  pace; drawn `tint` of the way to `grey`, `red` the red they reach as they wake. */
export interface StatueTuning { on: boolean; bars: number; first: number; gap: number; walkBack: number; keepOut: number; grey: number[]; tint: number; red: number }
/** Its floor's look (render/challenge.ts carvingLook; Ed, 2026-11-04, on #1804): its carved sigil's glow while the statues are stone
 *  (`stone`: a little moonlight), waking (`red`, at the wake-up's end), awake (`wild`, steady and cold), won (`warm`), going back to
 *  stone over `fade` seconds; and the moonlight on its stone floor (`floor`). */
export interface CarvingTuning { stone: number; red: number; wild: number; warm: number; fade: number; floor: number }
/** `sigilGap`: how far (m) its columns' sigils float over their tops (render/challenge.ts columnSigilsAt; Ed, 2026-11-04, on #1827:
 *  "Statue sigils should sit comfortably above the top of their columns"). */
export interface ChallengeTuning { carving: CarvingTuning; on: boolean; radius: number; margin: number; spacing: number; sigilGap: number; adults: number; youths: number; castReach: number; findSets: boolean; fireworks: { on: boolean; height: number; burst: number }; statues: StatueTuning; analyser: { bars: number; steps: number; fill: number } }
export const CHALLENGE_DEFAULT: ChallengeTuning = { on: false, radius: 56, margin: 3, spacing: 7.5, sigilGap: 1.5, adults: 1, youths: 1, castReach: 5, findSets: false, fireworks: { on: true, height: 24, burst: 8 }, statues: { on: false, bars: 4, first: 3.5, gap: 21.5, walkBack: 1.5, keepOut: 2, grey: [0.6, 0.6, 0.63], tint: 0.9, red: 1 }, analyser: { bars: 72, steps: 36, fill: 0.94 }, carving: { stone: 0.35, red: 2.2, wild: 1.2, warm: 1.8, fade: 2, floor: 0.3 } };
export const challengeOf = (t: Tuning): ChallengeTuning => ({ ...CHALLENGE_DEFAULT, ...t.challenge, fireworks: { ...CHALLENGE_DEFAULT.fireworks, ...t.challenge?.fireworks }, statues: { ...CHALLENGE_DEFAULT.statues, ...t.challenge?.statues }, analyser: { ...CHALLENGE_DEFAULT.analyser, ...t.challenge?.analyser }, carving: { ...CHALLENGE_DEFAULT.carving, ...t.challenge?.carving } });

/** What the page says of it (under the clock: main.ts): the pack all won over or gone (ready to cast), cleared (and its reward),
 *  closed (the final wave coming, or the night over). This frame's, emptied each frame as the waves' are. */
export interface ChallengeEvent { kind: "ready" | "cleared" | "closed"; at: number; x: number; z: number; reward?: "find" | "flask" }

/** The night's challenge: its area (key, cell), its circle's middle and radius, its pack (creature ids), and when it was ready, cleared
 *  or closed (game time; null not yet), its reward once cleared. */
export interface ChallengeState {
  key: string; cell: Cell; x: number; z: number; radius: number;
  /** Its columns' kinds, one a column clockwise from north (packKinds; a night saved before the columns: none, packKinds then). */
  kinds?: string[];
  pack: number[];
  readyAt: number | null; clearedAt: number | null; closedAt: number | null;
  reward: "find" | "flask" | null;
  /** Its pack's statues (rules/challengeStatues.ts; Ed, 2026-11-04): stone at their posts till a witch sets foot on its floor, then
   *  waking from beat `wake` (a bar line) for the tuning's `statues.bars` bars, then awake (a wild pack) till every witch is off its
   *  floor; null `wake` unless waking. Unset: the statues off, or a night saved before them (its pack wild from the start). */
  statues?: { phase: "stone" | "waking" | "awake"; wake: number | null; /** when it woke, or last went back to stone (game time), and whether that was from a fight (`back`): for the floor's sigil fading (render/challenge.ts carvingLook) */ at?: number; back?: boolean };
  /** When its reward lands on its dancefloor (game time: clearedAt + FIND_DESCENT), and the flask laid then (its relic's id). */
  landsAt?: number | null;
  flask?: number | null;
  events: ChallengeEvent[];
}

/** How long (s) its reward takes to come down from the sky onto its dancefloor once it's cleared (Ed: "over about 3 s"). */
export const FIND_DESCENT = 3;

/** The map's challenge area's site (map.specialSites, kind "challenge"), or null (none: the challenge off, the zoo, a map not grown
 *  from areas). */
export const challengeSite = (map: Pick<ForestMap, "specialSites">): SpecialSite | null => map.specialSites?.find(sp => sp.kind === "challenge") ?? null;

/** The kinds its pack is of: every kind on the island's roster, in the roster's order (a map not by roster: its areas' kinds). */
export const packKinds = (map: ForestMap): string[] => [...islandKinds(map, t => AREA_TYPES[t]?.creature ?? "")].filter(Boolean);

/** Where its columns stand (Ed: "a circle of stone columns around the edge"; one a kind, "the same number of columns as creature
 *  types"): `n` evenly round its circle's edge (its radius), the first due north, then clockwise seen from above (north up). */
export function columnSpots(site: { x: number; z: number; radius: number }, n: number): { x: number; z: number }[] {
  const out: { x: number; z: number }[] = [], m = Math.max(0, Math.round(n));
  for (let i = 0; i < m; i++) { const a = -Math.PI / 2 + (i / m) * Math.PI * 2; out.push({ x: site.x + Math.cos(a) * site.radius, z: site.z + Math.sin(a) * site.radius }); }
  return out;
}

/** Its columns' kinds (one a column, in order round from north): its own list, else (a night saved before the columns) the roster's. */
export const columnKinds = (g: Pick<Game, "challenge" | "map">): string[] => g.challenge?.kinds ?? (g.challenge ? packKinds(g.map) : []);

/** One column of the circle's: its kind, where it stands, and its sigil stack, bottom first (Ed, 2026-11-03: "the sigils are on top
 *  of the columns, one type per column"): its kind's wild fighters still standing (the pack still holding it: packLeft's), adults
 *  below and youths above, as a rune stone's column shows them (rules/stoneStacks.ts: stoneStack's hostiles, hostileSigil), an
 *  invited one or one run off gone from it. Empty: that kind's won over, the column lit. */
export interface ChallengeColumn { kind: string; x: number; z: number; sigils: StackEntry[] }
export function challengeColumns(g: Pick<Game, "challenge" | "creatures" | "map">): ChallengeColumn[] {
  const ch = g.challenge;
  if (!ch) return [];
  const kinds = columnKinds(g), spots = columnSpots(ch, kinds.length), of = new Map<string, StackEntry[]>(kinds.map(k => [k, []]));
  for (const id of ch.pack) { const c = g.creatures[id]; if (c && holdsArea(c)) of.get(c.species)?.push({ id, level: c.level, friend: false, legend: false }); }
  return kinds.map((kind, i) => ({ kind, x: spots[i].x, z: spots[i].z, sigils: of.get(kind)!.sort((a, b) => b.level - a.level || a.id - b.id) }));
}

/** How near its middle (m) the spell's cast on it: castReach, grown with the circle (rules/challengeCircle.ts). */
export const castReachOf = (ch: { radius: number }, t: Tuning): number => { const C = challengeOf(t); return C.castReach * Math.max(1, C.radius > 0 ? ch.radius / C.radius : 1); };

/** Where its pack stand as statues (Ed, 2026-11-04: "grey statues, all facing the centre of the circle"; through the coordinator:
 *  column / adult / youth / centre; and "they should be closer to their column than to the centre", the middle left open for her to
 *  step into; then, the youth hidden behind its adult, "Further apart, same line"; and on #1827, "youths should be closer to the
 *  middle of the circle than the elder. If this doesn't fit, make the circle bigger."): each on its kind's column's radius, in from
 *  the column toward the middle, its kind's adults then its youths, each by id, on every column, the first `first` m in and each next
 *  `gap` m further, squeezed to fit when more than two must stand by `POST_REACH` of the way to the middle (so always nearer its
 *  column than the middle). The gap (21.5 m) lifts the youth up the screen past its adult's head on the column due south, where the
 *  line runs straight away from the game's camera: clear of every adult up to 11 m tall at the start camera (32 degrees: 21.5 sin 32
 *  = 11.4 m), the tallest (the hare's 15.4 m) still showing most of its youth; the circle's `radius` (56 m) is what fits the youth
 *  that far in, 25 m, inside the 0.45 reach, and the most the smallest islands' areas hold its claim at (#1807's 196 m areas). By
 *  creature id. */
/** The furthest in a statue's post goes, a share of the way from its column to the middle: under half, so nearer its column. */
export const POST_REACH = 0.45;
export function statuePosts(site: { x: number; z: number; radius: number }, kinds: readonly string[], pack: readonly { id: number; species: string; level: number }[], S: Pick<StatueTuning, "first" | "gap">): Map<number, { x: number; z: number }> {
  const spots = columnSpots(site, kinds.length), out = new Map<number, { x: number; z: number }>(), R = Math.max(1e-6, site.radius);
  const reach = R * POST_REACH, first = Math.min(reach, Math.max(0, S.first));
  kinds.forEach((kind, i) => {
    const col = spots[i], ux = (site.x - col.x) / R, uz = (site.z - col.z) / R;
    const mine = pack.filter(c => c.species === kind).sort((a, b) => b.level - a.level || a.id - b.id), n = mine.length;
    const step = n > 1 ? Math.min(Math.max(0, S.gap), (reach - first) / (n - 1)) : 0;
    mine.forEach((c, j) => out.set(c.id, { x: col.x + ux * (first + j * step), z: col.z + uz * (first + j * step) }));
  });
  return out;
}

/** Turned to face the circle's middle (x, z) as it stands (render/view/creatures.ts draws its facing and whether it's turned away). */
export function faceMiddle(c: Creature, x: number, z: number): void { c.facing = x >= c.x ? 1 : -1; c.away = z < c.z - 1; }

/** Its pack (Ed: "one adult and one youth of every creature kind on the island"): `adults` adults and `youths` youths of each of
 *  packKinds, wild creatures of its area, ids from `first` on (they're appended to the night's creatures). None without one. With
 *  the statues on (rules/challengeStatues.ts), each stone at its post (statuePosts), facing the middle. */
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
  const kinds = packKinds(map);
  for (const kind of kinds) {
    for (let i = 0; i < Math.round(C.adults); i++) make(kind, 2);
    for (let i = 0; i < Math.round(C.youths); i++) make(kind, 1);
  }
  if (C.statues.on) {
    const site = { x: S.x, z: S.z, radius: S.radius ?? challengeCircle(kinds.length, t).radius }, posts = statuePosts(site, kinds, out, C.statues);
    for (const c of out) { const p = posts.get(c.id)!; c.x = c.tx = p.x; c.z = c.tz = p.z; c.statue = "stone"; c.moving = false; faceMiddle(c, site.x, site.z); }
  }
  return out;
}

/** The night's challenge, its pack among `creatures` (by their cell), or null with none. */
export function newChallenge(map: ForestMap, creatures: readonly Creature[]): ChallengeState | null {
  const S = challengeSite(map);
  if (!S) return null;
  const key = cellKey(S.cell);
  const kinds = packKinds(map);
  return { key, cell: [S.cell[0], S.cell[1]], x: S.x, z: S.z, radius: S.radius ?? challengeCircle(kinds.length, map.tuning).radius, kinds, pack: creatures.filter(c => cellKey(c.cell) === key).map(c => c.id), readyAt: null, clearedAt: null, closedAt: null, reward: null, events: [], ...(challengeOf(map.tuning).statues.on ? { statues: { phase: "stone" as const, wake: null } } : {}) };
}

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
  if (Math.hypot(b.x - ch.x, b.z - ch.z) > castReachOf(ch, g.tuning) || !challengeReady(g)) return null;
  return { key: `challenge:${ch.key}`, cell: ch.cell, x: ch.x, z: ch.z };
}

/** Whether a find is the challenge's, still locked: its reward, not taken with E (nor shown) before the circle's cleared, nor till it
 *  has come down onto its dancefloor (landsAt). */
export const lockedFind = (g: Pick<Game, "challenge" | "clock">, T: { cell: readonly [number, number] } | null): boolean => {
  const ch = g.challenge;
  if (!T || !ch || T.cell[0] !== ch.cell[0] || T.cell[1] !== ch.cell[1]) return false;
  return ch.clearedAt === null || g.clock.time < (ch.landsAt ?? Infinity);
};

/** How high (m) its reward starts coming down from. */
export const FALL_HEIGHT = 40;
/** Where its reward is in its fall (drawing only: render/view/finds.ts, render/challenge.ts): hidden before the circle's cleared (Ed,
 *  on #1725: "Before clearing, the find is NOT shown at the circle"); coming down, `k` of the way (0 to 1) and `y` metres up (slowing
 *  to land gently); null once it's landed, or for a find that isn't the challenge's. Timed from clearedAt alone. */
export function rewardFall(g: Pick<Game, "challenge" | "clock">, T: { cell: readonly [number, number] } | null = null): { hidden: boolean; k: number; y: number } | null {
  const ch = g.challenge;
  if (!ch || (T && (T.cell[0] !== ch.cell[0] || T.cell[1] !== ch.cell[1]))) return null;
  if (ch.clearedAt === null) return T ? { hidden: true, k: 0, y: FALL_HEIGHT } : null;
  const k = (g.clock.time - ch.clearedAt) / FIND_DESCENT;
  if (k >= 1 || ch.landsAt == null) return null;
  const e = Math.max(0, k);
  return { hidden: false, k: e, y: FALL_HEIGHT * (1 - e) * (1 - e) };
}

/** The spell cast on the circle by witch W (at her time ht): cleared. The pack happy, partying round the circle, never to be leashed
 *  (their sigils kept: no rune), dancing on its dancefloor; its reward coming down onto it over FIND_DESCENT seconds: tonight's find,
 *  to pick up with E once it's landed, else (nothing left for her: the trunk empty) a flask, laid as it lands (stepChallenge). */
export function clearChallenge(g: Game): void {
  const ch = g.challenge;
  if (!ch || ch.clearedAt !== null) return;
  const time = g.clock.time;
  ch.clearedAt = time;
  for (const id of ch.pack) {
    const c = g.creatures[id];
    if (!c || c.gone || c.leashed || c.fleeUntil === Infinity) continue;
    if (stateOf(c) !== "happy") befriend(c, time);
    Object.assign(c, { atStone: true, friendly: true, hunting: undefined, watchUntil: undefined, fight: undefined, statue: undefined });
    // (on its dancefloor, Ed on #1725: "they dance on it": each to a spot on it at once, and roaming it after, render/challenge.ts)
    danceAt(c, { x: ch.x, z: ch.z }, ch.radius * 0.8);
    const a = c.rand() * Math.PI * 2, d = Math.sqrt(c.rand()) * ch.radius * 0.75;
    c.tx = ch.x + Math.cos(a) * d; c.tz = ch.z + Math.sin(a) * d; c.rest = 0;
  }
  g.friendly.add(ch.key); // (no watch, no hunt: the pack's partying)
  g.wildEntry.delete(ch.key);
  g.byArea = null;
  const T = g.trunk;
  ch.reward = T && T.item && !T.found && T.cell[0] === ch.cell[0] && T.cell[1] === ch.cell[1] ? "find" : "flask";
  if (T && ch.reward === "find") { T.x = ch.x; T.z = ch.z; } // (onto the middle of its dancefloor)
  ch.landsAt = time + FIND_DESCENT;
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
  // The flask (her finds all hers) laid on its dancefloor's middle as it lands: its sigil, drunk with E as any.
  if (ch.reward === "flask" && ch.flask == null && ch.landsAt != null && time >= ch.landsAt) {
    const all = relicKinds(LEGENDS.relics), kind = all[Math.floor(hash2(g.seed, ch.cell[0] * 31 + ch.cell[1], 7753) * all.length) % all.length]?.kind ?? LEGENDS.relics.kinds[0];
    ch.flask = g.relics.length;
    g.relics.push({ id: ch.flask, kind, x: ch.x, z: ch.z, cell: [ch.cell[0], ch.cell[1]], state: "dropped", sx: ch.x, sz: ch.z });
  }
  if (ch.readyAt === null && challengeReady(g) && ch.pack.length) { ch.readyAt = time; ch.events.push({ kind: "ready", at: time, x: ch.x, z: ch.z }); }
}
