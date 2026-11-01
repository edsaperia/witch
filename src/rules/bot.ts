// The bots (the balance builder's, tools/balance/runbot.mjs; Ed, 2026-10-06: "It would be good to be able to start the
// game and watch the skilled bot play"): a player made of rules, deciding each step from the game as it is and giving
// back the very controls a player's input would. The balance tool plays them headless to measure a run; the game's bot
// game (?bot=skilled, the start screen's Bot game) plays them in real time to watch. One module, so the tactics the
// balance builder tunes are the ones the bot game shows.
//   skilled: recruits carefully (never empties an area of its own kind, so no legend grows restless), ahead of the wave
//     (the areas the next two waves wake first, sticking with an area while it has anyone), answers the sieges her posse
//     can take (standing behind the soundsystem), picks up guards left stranded, blinks out of blows, kites fighters,
//     rises to heal at her last hit (back down part healed), and at the route's end takes her posse to the stragglers;
//     with feed, puts her babies' sigils down by ripe berries till they're youths (bots-again, 2026-10-11: the islands'
//     minute-a-wave pace; before, it stood at each next soundsystem before its wave and barely invited);
//   idle: stands at home all run (the sieges alone);
//   hover: idle, but over the treetops (nothing can go for her);
//   crude: invites everything in the nearest wild area, area after area, and never parks, defends or heals (it does go
//     for the win's stragglers, gathering her posse first: without that no bot ever won).
// She flies between areas over the treetops and fights on the ground, as a player does. Seeded and deterministic: no
// clock, no Math.random; the same game and the same steps give the same controls.
import { deckOf, landsOn } from "./treehouse";
import { runeOffset } from "./runeOffset";
import { AREA_TYPES } from "./map";
import { cellKey } from "./party";
import { hexSpot, stackBottom, toBottom } from "./leash";
import { groundedBy } from "./leashWeight";
import { hasRune, runeNear, stateOf } from "./creatureStates";
import { castingStone, castOf, castOn, castReady, castSpot, looseNear, stoneOpen } from "./stoneStacks";
import { creatureValue, sideValue } from "./power";
import type { Controls, Game } from "./game";
import type { Creature } from "./creatures";
import type { Cell } from "./partition";
import { newExpert, type ExpertParams } from "../bots/expert";

import { BOT_KINDS, type BotKind } from "./botKinds";
import { isHomeKey } from "./speakers";
import { winTarget } from "./win";
import { bagTuning, setBag } from "./bags";
/** The careful bots' bag: the far one (the purse). */
const FAR_BAG = "purse";
/** The other bots': the starter, the satchel (the base rate and reach, a little more homing: Ed, 2026-10-29). */
const STARTER_BAG = "satchel";
export { BOT_KINDS, type BotKind };

export interface BotOptions {
  /** Expert-only search parameters; baseline policies ignore these. */
  expert?: Partial<ExpertParams>;
  expertSeed?: number;
  /** Parks up to this many at the next soundsystem (skilled)... */
  guards?: number;
  /** ...keeping this many on her stack. */
  keep?: number;
  /** Leads her babies and young to berry patches (skilled). */
  feed?: boolean;
  /** Fetches what sleeping legends dream of (skilled). */
  quests?: boolean;
  /** Picks up relics and brings them to sleeping legends (skilled). */
  relics?: boolean;
  /** Which sleeping legend gets each relic (Ed, 2026-10-06: "you get to choose where relic allies are"): nearest her (the naive one), home (nearest the dancefloor), front (in an area the next wave wakes), far (the most remote: the worst). */
  relicPolicy?: "nearest" | "home" | "front" | "far";
  /** Her bag (rules/bags.ts; Ed, 2026-10-29, chosen at the start: nobody plays bagless): a bag item's id. Absent, the careful bots
   *  carry the far bag (the purse: her 💌s reach further, slower; she keeps her distance) and the others the satchel (the starter). */
  bag?: string;
  /** At most this many quests, then she plays on as usual (a quick player does a few). */
  questMax?: number;
  /** At most this many relics brought, then she plays on (each is a long trip). */
  relicMax?: number;
  /** The careful bots' thresholds (the champion's search space, tools/balance/coach.mjs; each default is the skilled
   *  bot's own number, so skilled plays exactly as before): see BOT_KNOBS. */
  knobs?: Partial<BotKnobs>;
  /** The champion's tactics (each its own switch, for the search): goes to the standing soundsystem with the most
   *  marching on it and holds the line between them and it with her posse... */
  siege?: boolean;
  /** ...and picks up guards left by a fallen soundsystem, to bring them where they're needed. */
  regroup?: boolean;
  /** Blinks sideways out of a charge's line, a pounce's landing or a blow about to land, and always away (the
   *  dodge goes toward the cursor: the others' kiting blink goes toward what she's aiming at). */
  blink?: boolean;
  /** Puts one of an angry (or restless) legend's own kind down in its area, from her stack, which lulls it back to
   *  sleep (rules/legends.ts: a legend sleeps while one of its kind is in its area, a parked sigil's included). */
  calm?: boolean;
  /** ...the restless ones too, before they turn. */
  calmRestless?: boolean;
}

/** The careful bots' numbers: the skilled bot plays these; the champion plays the ones its search found. */
export interface BotKnobs {
  /** Heads for the next soundsystem this many seconds before its wave... */
  defendLead: number;
  /** ...and holds the one the last wave woke this long after it came. */
  defendHold: number;
  /** Rises to heal at this many hits left (or fewer)... */
  healAt: number;
  /** ...and comes back down at this many (a whole heal is repairTime a hit: back to work part healed). */
  healTo: number;
  /** Kites a fighter nearer than this (m)... */
  kite: number;
  /** ...dashing away when it's nearer than this. */
  dashAt: number;
  /** Fires at a target within this share of a 💌's range... */
  fireFrac: number;
  /** ...and walks in when it's beyond this share. */
  closeFrac: number;
  /** Recruits only in areas within this far (m). */
  recruitRange: number;
  /** Recruits ahead of the wave (bots-again, 2026-10-11: waves every minute or so on the islands): the areas the next two
   *  waves wake count as this much nearer (m), so she invites their creatures before they're enraged. */
  ahead: number;
  /** ...and the area she's recruiting in counts as this much nearer while it has anyone (m). */
  stick: number;
  /** In an area, a baby counts as this much further than the young and adults (m): they fight for her, and would besiege. */
  babyFar: number;
  /** A standing defence at home (Ed, 2026-10-11: "Putting creatures into home is also now much more effective because they
   *  defend the whole area"): she parks fighters (young and up) there till this many stand guard... */
  homeGuards: number;
  /** ...each wave adding this many more... */
  homeGuardsPerWave: number;
  /** ...whenever she has more than this many following her (to recruit with and see off stragglers)... */
  follow: number;
  /** ...and home's within this far (m); she stands this far south of the dancefloor to put them down (m). */
  homeRange: number;
  homeStand: number;
  /** Leaves at least this many of an area's own kind wild (so its legend stays asleep). */
  kinKeep: number;
  /** Feeds once this many babies and young are on her stack... */
  feedMin: number;
  /** ...at berry patches within this far (m)... */
  feedRange: number;
  /** ...for this long (s). */
  feedWait: number;
  /** The champion's siege response: marchers within this of a soundsystem count toward its threat (m)... */
  siegeNear: number;
  /** ...she goes when a threat's fighting value is at least this... */
  siegeMin: number;
  /** ...and lets a soundsystem go when its marchers outweigh her posse this many times (0: never). */
  concede: number;
  /** She stands this far out from the soundsystem toward its nearest marcher (m)... */
  siegeStand: number;
  /** ...on its near side (1), or behind it (-1: they reach it, and her posse, before her). */
  siegeSide: number;
  /** The dancefloor's threat counts this many times another's. */
  homeWeight: number;
  /** A guard this far from every standing soundsystem is stranded (m): regroup picks it up. */
  strandFar: number;
  /** Leads a moving target by this share of where it'll be when the 💌 arrives (0: aims where it is). */
  lead: number;
  /** Blinks when a blow aimed at her lands within this (s). */
  blinkLead: number;
}
// (home guards: a few, posted only when she's by home with ten fighters following her: measured on the islands, parking
// more, or flying home to, cost more invites than the guard saved)
// (bots-again, 2026-10-11: the pulse brings a wave every minute or so, and standing at the next area's soundsystem while it's
// still wild cost her every hit she had: no stand before a wave (defendLead 0, so no hold after either); the siege response
// goes instead, rules/bot.ts newBot)
export const BOT_KNOBS: BotKnobs = { defendLead: 0, defendHold: 60, healAt: 1, healTo: 3, ahead: 400, stick: 250, babyFar: 0, homeGuards: 3, homeGuardsPerWave: 0, follow: 10, homeRange: 120, homeStand: 22, kite: 9, dashAt: 5, fireFrac: 0.95, closeFrac: 0.8, recruitRange: 900, kinKeep: 1, feedMin: 3, feedRange: 500, feedWait: 4, siegeNear: 120, siegeMin: 10, siegeStand: 8, siegeSide: -1, homeWeight: 1.5, strandFar: 80, lead: 0, concede: 1.5, blinkLead: 0.3 };

/** The bot game's choices (Ed, 2026-10-06, watching it: "It's notable that it doesn't seem to get any legend buffs or
 *  feed creatures any berries"): the skilled one does a few quests, brings relics to the legends by the coming waves,
 *  and leads her young to berries, as a good player would. The balance tool's runs keep each to its flag. */
export const BOT_GAME: Record<BotKind, BotOptions> = {
  skilled: { quests: true, questMax: 1, relics: true, relicMax: 1, relicPolicy: "front", feed: true }, // (one quest and one relic: on the islands' minute-a-wave pace each trip costs a wave's inviting; bots-again, 2026-10-11. Before: two relics, three quests; all six relics took her first ten minutes, and halved her army)
  // (the champion: the skilled bot's play with its own tactics and the numbers its search found, tools/balance/coach.mjs,
  // overnight 2026-10-07: no quest or relic trips, which cost her army in the first ten minutes)
  champion: {
    guards: 3, keep: 1, feed: true, siege: true, regroup: true, blink: true, calm: true, calmRestless: true,
    knobs: { defendLead: 0, defendHold: 45, kite: 9.8, dashAt: 5.8, fireFrac: 0.95, closeFrac: 0.91, recruitRange: 926, feedMin: 4, feedRange: 535, feedWait: 20, siegeNear: 120, siegeMin: 11.8, concede: 0.73, siegeStand: 10.5, siegeSide: 1, homeWeight: 2.9, strandFar: 84, lead: 0.47, blinkLead: 0.43 },
  },
  crude: {}, novice: {}, idle: {}, hover: {}, expert: {},
};

/** The skilled bot's strategies (Ed, 2026-10-06: "good play [should] involve a good balance of inviting, evolving
 *  animals with berries, doing quests, and placing sigils in strategic places"): the same skill, each leaning one way,
 *  and the mix. The balance pass tunes the game so the mix beats every one of the others (runbot --strategy). */
export const STRATEGIES: Record<"invite" | "feed" | "quest" | "sigil" | "mixed", BotOptions> = {
  invite: { guards: 0, keep: 99 }, // (inviting only: everyone on her stack, nothing parked, no detours)
  feed: { guards: 0, keep: 99, feed: true }, // (and leading her young to the berries)
  quest: { guards: 0, keep: 99, quests: true }, // (and every quest she can)
  sigil: { guards: 6, keep: 0 }, // (parking her posse at the next soundsystem before its wave)
  mixed: { guards: 3, keep: 2, feed: true, quests: true, questMax: 3 },
};

export interface Bot {
  readonly kind: BotKind;
  /** This step's controls, from the game as it is now. Call once a fixed step (or once a frame), then step the game. */
  decide(g: Game): Controls;
  /** What she's doing now, in a few words (the bot game's tag). */
  doing: string;
  /** A quest or relic she has finished, for the balance tool's tally (drained by it). */
  readonly done: { quests: { at: number; id: number }[]; relics: { at: number; id: number }[] };
}

/** A species as it reads in the tag, in the plural: "fox" → "foxes", "wolf" → "wolves", "elk" → "elk". */
const PLURAL: Record<string, string> = { wolf: "wolves", elk: "elk", dormouse: "dormice", woodlouse: "woodlice" };
/** "a fox", "an elk". */
export const article = (s: string): string => `${/^[aeiou]/.test(s) ? "an" : "a"} ${s}`;
export const plural = (s: string): string => PLURAL[s] ?? (/(s|x|sh|ch)$/.test(s) ? `${s}es` : `${s}s`);

type Target = { cell: Cell; key: string; x: number; z: number };
type QJob = { L: Creature; want: Creature; phase: "fetch" | "deliver"; since: number };

export function newBot(kind: BotKind, o: BotOptions = {}): Bot {
  if (kind === "expert") return newExpert(o.expert, o.expertSeed);
  const GUARDS = o.guards ?? 3, KEEP = o.keep ?? 2, careful = kind === "skilled" || kind === "champion", K = { ...BOT_KNOBS, ...o.knobs };
  // (the careful bots answer sieges, pick up guards left stranded and blink out of blows now: bots-again, 2026-10-11, the
  // islands' minute-a-wave pace; their stand before each wave is gone. Given options keep their own say.)
  if (careful) o = { siege: true, regroup: true, blink: true, ...o };
  let legendOf: Map<string, number> | null = null;
  let qjob = null as QJob | null, questAgain = 0, questCount = 0, relicCount = 0, questTries = 0, relicTries = 0; // (tries, so a quest or relic that keeps failing doesn't eat the run)
  let rjob: { phase: "pick" | "place"; r?: { x: number; z: number; sx?: number; sz?: number; state: string }; since: number; n?: number } | null = null, relicAgain = 0;
  // (a feeding stop: the patch, and, for her babies, the phase: putting their sigils down by it, waiting, picking them up)
  let feeding: { x: number; z: number; until: number; phase?: "drop" | "wait" | "collect"; ids?: number[] } | null = null, feedAgain = 0, healing = false;
  let target: Target | null = null, pickAt = -1, landWave = -1, lastWave = 0, seenWave = 0, lastWoken: Cell | null = null, steps = 0;
  const parkedAt = new Set<string>();
  // (her stack as it was before a knockout, and so the ones it let go happy where they stood: Ed, 2026-10-26; she fetches them again by their runes)
  let carried: number[] = [], letGo = new Set<number>(), fetching = -1, fetchSince = 0;
  let holding = null as string | null; // (the soundsystem the champion's holding)
  const seen = new Map<number, { x: number; z: number; at: number }>(); // (where she last saw each target: the champion leads moving ones)
  let bagPicked = false;
  const bot: Bot = { kind, doing: "", done: { quests: [], relics: [] }, decide };
  return bot;

  function decide(g: Game): Controls {
    const w0 = g.witches[0];
    if (!bagPicked) { bagPicked = true; const pick = o.bag ?? (careful ? FAR_BAG : STARTER_BAG); setBag(w0.spells, pick); } // (her bag, picked once: the same every game)
    const map = g.map, w = w0, b = w.body, time = g.clock.time, t = g.tuning, R = bagTuning(t, w.spells.bag).invites.range, H = t.witchHealth.hits;
    const homeKey = cellKey(map.centreCell), stacks = castOn(t);
    if (w.ko) { if (carried.length) { for (const id of carried) letGo.add(id); carried = []; } } else carried = [...w.leash.stack];
    legendOf ??= new Map(g.creatures.filter(c => c.boss).map(c => [cellKey(c.cell), c.id]));
    const LO = legendOf;
    // The waves she's seen come: when the last came, and the area it woke (the last she'd defend after it).
    if (g.party.wave > seenWave) {
      seenWave = g.party.wave; lastWave = time;
      for (const a of g.party.areas.values()) if (a.wave === g.party.wave) lastWoken = a.cell;
    }
    const step = steps++;
    // (her own clock, a step a 60th of a second: a job's patience is counted in it, not the game's, which crawls in a legend
    // circle, rules/slowTime.ts, where waiting it out could take a run)
    const now = step / 60;
    const spot = (c: Cell) => (cellKey(c) === homeKey ? map.dancefloor : map.soundsystemSpot(c[0], c[1]));
    const species = (c: Cell) => AREA_TYPES[map.typeOf(c[0], c[1])].creature;
    // Where to put a quest's sigil or a relic down: in the legend's clearing (#244: only there counts), in front of it; else beside it.
    const spotBy = (L: Creature): [number, number] => { const lc = map.legendClearing?.(L.cell[0], L.cell[1]); return lc ? [lc.x, lc.z] : [L.x + 4, L.z + 4]; };

    /** Who she may invite in an area (careful: never its last one of the area's kind where the area has a legend, which grows
     *  restless with none of its kind: rules/legends.ts. Where it has none, keeping its last one only kept the area from ever
     *  being cleared (rules/clear.ts), and with nothing else to invite she stood idle with a full leash: seed 33, 2026-10-26). */
    const inviteable = (key: string, cell: Cell): Creature[] => {
      const sp = species(cell), out: Creature[] = [], keepKin = careful && LO.has(key);
      let kin = 0;
      for (const c of g.creatures) if (!c.gone && !c.boss && !c.leashed && c.fleeUntil === undefined && cellKey(c.cell) === key && c.species === sp) kin++;
      for (const c of g.creatures) {
        // Ed,2026-10-31: babies join with their soundsystem; letters cannot
        // invite or wake them. Never let a nearby baby monopolize the aim.
        if (c.gone || c.boss || c.level === 0 || c.leashed || c.fleeUntil !== undefined || c.enraged || cellKey(c.cell) !== key) continue;
        if (stacks && stateOf(c) === "happy") continue; // (won over already: its sigil waits in the stone's stack till she casts there)
        if (keepKin && c.species === sp && kin <= K.kinKeep) continue;
        out.push(c);
      }
      return out;
    };
    /** Whether an area's stone holds any friend sigils (won over, waiting for her spell). */
    const friendsAt = (key: string): boolean => g.creatures.some(c => !c.gone && !c.leashed && !c.boss && c.atStone && cellKey(c.cell) === key);
    /** Where to recruit next: the nearest wild area with someone she may invite (the careful ones: the next waves' first). */
    const ahead = new Set([...(g.party.next ?? []), ...(g.party.afterNext ?? [])].map(c => cellKey(c)));
    const pickRecruit = () => {
      let best = null as Target | null, bs = Infinity;
      for (const [i, j] of map.cells) {
        const cell: Cell = [i, j], key = cellKey(cell);
        if (g.party.areas.has(key) || g.party.ruined?.has(key)) continue;
        const L = LO.get(key); if (L !== undefined && g.creatures[L].legendState === "angry") continue; // (keep out of an angry legend's area)
        const s = map.siteOf(i, j), d = Math.hypot(s.x - b.x, s.z - b.z);
        if (d > K.recruitRange) continue;
        const open = inviteable(key, cell); if (!open.length && !(stacks && stoneOpen(g, key) && castReady(g, key) && friendsAt(key))) continue; // (or one to cast at, its fighters all won over: rules/stoneStacks.ts)
        // (the careful ones: ahead of the wave first, where there are fighters to win over, and the area she's on stays hers
        // while it has any: no flying back and forth as the waves move the front)
        const fighters = careful ? open.filter(c => c.level > 0).length : 1;
        const sc = d - (careful && ahead.has(key) ? K.ahead : 0) + (careful && !fighters ? K.babyFar * 2 : 0) - (careful && target?.key === key ? K.stick : 0);
        if (sc < bs) { bs = sc; best = { cell, key, x: s.x, z: s.z }; }
      }
      return best;
    };

    /** The siege most worth holding: the standing soundsystem with the most fighting value marching on it near it
     *  (the dancefloor's weighed up), unless it outweighs her posse past `concede`. */
    const siegeFront = () => {
      const posse = sideValue(w.leash.stack.map(id => g.creatures[id]));
      let best = null as { key: string; h: { x: number; z: number }; near: Creature | null; n: number; home: boolean } | null, bs = 0;
      // (home's speakers as one front at the dancefloor: rules/speakers.ts)
      const fronts = new Map<string, { x: number; z: number; hp: number }>(), d0 = g.map.dancefloor;
      for (const [key, h] of g.combat.sounds) if (!isHomeKey(key)) fronts.set(key, h); else { const f = fronts.get("home") ?? { x: d0.x, z: d0.z, hp: 0 }; f.hp += Math.max(0, h.hp); fronts.set("home", f); }
      for (const [key, h] of fronts) {
        if (h.hp <= 0) continue;
        let f = 0, n = 0, near: Creature | null = null, nd = Infinity;
        for (const c of g.creatures) {
          if (c.gone || !c.siege || (key === "home" ? !isHomeKey(c.siege) : c.siege !== key) || c.leashed || c.fleeUntil !== undefined || c.dazed) continue;
          const at = g.combat.sounds.get(c.siege) ?? h, d = Math.hypot(c.x - at.x, c.z - at.z); if (d > K.siegeNear) continue;
          f += creatureValue(c); n++; if (d < nd) { nd = d; near = c; }
        }
        if (f < K.siegeMin || (K.concede > 0 && f > K.concede * Math.max(posse, 1))) continue;
        const sc = f * (key === "home" ? K.homeWeight : 1) / (1 + Math.hypot(h.x - b.x, h.z - b.z) / 600) * (key === holding ? 2 : 1); // (the one she's going to, twice: no flip-flopping between two)
        if (sc > bs) { bs = sc; best = { key, h, near, n, home: key === "home" }; }
      }
      holding = best?.key ?? null;
      return best;
    };
    /** Whether to post guards at home now: more fighters following her than she needs, home short of its guard, near enough. */
    const homeJob = (): boolean => {
      const d0 = map.dancefloor, hk = cellKey(map.centreCell);
      if (Math.hypot(d0.x - b.x, d0.z - b.z) > K.homeRange) return false;
      const fighters = w.leash.stack.filter(i => g.creatures[i].level > 0 && g.creatures[i].level < 3).length;
      if (fighters <= K.follow) return false;
      const home = w.leash.placed.filter(p => cellKey(map.cellSafe(p.x, p.z).cell) === hk && !g.creatures[p.id].gone).length;
      return home < K.homeGuards + g.party.wave * K.homeGuardsPerWave;
    };
    /** The nearest of her guards that's far from every standing soundsystem. */
    const strandedGuard = () => {
      let best = null as { x: number; z: number } | null, bd = Infinity;
      for (const p of w.leash.placed) {
        const pc = g.creatures[p.id], ak = cellKey(map.cellSafe(p.x, p.z).cell);
        if (o.calm && LO.has(ak) && g.creatures[LO.get(ak)!].species === pc.species) continue; // (keeping its legend asleep)
        let far = true;
        for (const h of [...g.combat.sounds.values(), ...(g.party.next ?? []).map(c => ({ ...spot(c), hp: 1 }))]) if (h.hp > 0 && Math.hypot(h.x - p.x, h.z - p.z) < K.strandFar) { far = false; break; } // (the coming waves' spots too: guards posted before it)
        const d = Math.hypot(p.x - b.x, p.z - b.z);
        if (far && d < bd) { bd = d; best = p; }
      }
      return best;
    };
    /** Where to throw at c, td away: where it is, or (leading) where it'll be when the 💌 gets there. */
    const aimAt = (c: Creature, td: number): [number, number] => {
      if (!K.lead) return [c.x - b.x, c.z - b.z];
      // (its velocity as she sees it: where it was when she last looked, within half a second)
      const was = seen.get(c.id), k = K.lead * td / t.invites.speed;
      seen.set(c.id, { x: c.x, z: c.z, at: time });
      const dt = was ? time - was.at : 0, vx = dt > 0 && dt < 0.5 ? (c.x - was!.x) / dt : 0, vz = dt > 0 && dt < 0.5 ? (c.z - was!.z) / dt : 0;
      return [c.x + vx * k - b.x, c.z + vz * k - b.z];
    };
    /** The way out of a blow about to land on her: sideways off a charge's line, away from a pounce's landing, or
     *  across a winding-up attacker's line; null if nothing's about to land. */
    function threatDodge(): { x: number; z: number } | null {
      for (const c of g.creatures) {
        if (c.gone || c.leashed || c.level === 0 || c.state === "happy" || c.fleeUntil !== undefined || c.dazed) continue;
        const rx = b.x - c.x, rz = b.z - c.z, d = Math.hypot(rx, rz);
        if (d > 25) continue;
        const ch = c.charge;
        if (ch && !ch.struck && !ch.braking) {
          const l = Math.hypot(ch.dx, ch.dz) || 1, ux = ch.dx / l, uz = ch.dz / l, along = rx * ux + rz * uz, side = -rx * uz + rz * ux;
          if (along > 0 && Math.abs(side) < 3) { const s = side >= 0 ? 1 : -1; return { x: -uz * s, z: ux * s }; }
          continue;
        }
        if (c.leap && Math.hypot(c.leap.tx - b.x, c.leap.tz - b.z) < 3.5) { const lx = b.x - c.leap.tx, lz = b.z - c.leap.tz, l = Math.hypot(lx, lz); return l > 0.3 ? { x: lx / l, z: lz / l } : { x: -rz / (d || 1), z: rx / (d || 1) }; }
        const f = c.fight;
        if (f?.target?.kind === "witch" && f.windupUntil > time && f.windupUntil - time < K.blinkLead && d < 12) { const s = (c.id & 1) ? 1 : -1; return { x: (-rz / (d || 1)) * s, z: (rx / (d || 1)) * s }; }
      }
      return null;
    }
    /** The nearest angry (or restless) legend she carries one of its kind for, and which of her stack (the youngest). */
    function calmJob(): { L: Creature; id: number } | null {
      let best = null as { L: Creature; id: number } | null, bd = Infinity;
      for (const lid of LO.values()) {
        const L = g.creatures[lid];
        if (L.gone || !(L.legendState === "angry" || (o.calmRestless && L.legendState === "restless"))) continue;
        let id = -1, lv = 9;
        for (const i of w.leash.stack) { const c = g.creatures[i]; if (c.species === L.species && c.level < lv) { lv = c.level; id = i; } }
        if (id < 0) continue;
        const d = Math.hypot(L.x - b.x, L.z - b.z);
        if (d < bd) { bd = d; best = { L, id }; }
      }
      return best;
    }
    let calm = null as ReturnType<typeof calmJob>, cycle = false, straggler = null as Creature | null, back = null as Creature | null;
    let front = null as ReturnType<typeof siegeFront>, stray = null as ReturnType<typeof strandedGuard>;
    let mx = 0, mz = 0, toggle = false, fire = false, aimX = 0, aimZ = 0, dash = false, sigil = false, place = false, held = false, looseAt = -1;
    // Putting one down: the button picks up a sigil of hers she's standing on before it puts one down (rules/leash.ts), so a
    // bot pressing it every step put one down and picked it straight back up (Balance 2, 2026-10-07: 3,760 a run); she steps
    // off her own first, clear of leash.spacing.
    const putDown = () => {
      let near: { x: number; z: number } | null = null, nd = Math.max(t.leash.pickRadius, t.leash.spacing) * 1.1; // (and far enough that the next isn't blocked by it)
      for (const p of w.leash.placed) { const d = Math.hypot(p.x - b.x, p.z - b.z); if (d < nd) { nd = d; near = p; } }
      if (!near) { if (stackBottom(w.leash)?.kind === "relic") cycle = true; else sigil = true; return; } // (a relic's sigil at the bottom: cycled past first)
      if (nd > 0.01) { mx = (b.x - near.x) / nd; mz = (b.z - near.z) / nd; } else { mx = 1; mz = 0; }
    };
    /** Toward (x, z): over the treetops when far, landing there if `land`; true once on the ground within `within` m. */
    const NEAR = 45, FAR = 60, deckHere = deckOf(g.map, t);
    const goTo = (x: number, z: number, land: boolean, within = 45) => {
      const dx = x - b.x, dz = z - b.z, d = Math.hypot(dx, dz) || 1;
      // (Rising only past FAR on foot, landing within NEAR: between the two she walks, so she never hops up and down at the line.)
      if (d > (b.mode === "ground" ? FAR : NEAR)) { if (b.mode === "ground") toggle = true; mx = dx / d; mz = dz / d; return false; }
      if (land && b.mode === "treetop") { if (deckHere && landsOn(deckHere, b.x, b.z)) { mx = dx / d; mz = dz / d; } else toggle = true; return false; } // (over the treehouse deck she'd land on it, which the bots don't: on toward it till she's past the deck)
      if (b.mode === "ground" && d > Math.min(6, within * 0.6)) { mx = dx / d; mz = dz / d; }
      return b.mode === "ground" && d <= within; // (within: how near counts as there; a clearing's sigil, a few metres)
    };
    const there = (x: number, z: number) => Math.hypot(x - b.x, z - b.z) <= (b.mode === "treetop" ? NEAR : FAR);
    /** The nearest of those a knockout let go whose rune is ready (rules/knockout.ts letGoHappy), or null; any leashed again or
     *  gone are forgotten. */
    const letGoRune = (): Creature | null => {
      let best: Creature | null = null, bd = Infinity;
      for (const id of letGo) {
        const c = g.creatures[id];
        if (!c || c.leashed || c.gone || !c.dropped) { letGo.delete(id); continue; }
        if (!hasRune(c, time)) continue;
        const e = Math.hypot(c.x - b.x, c.z + runeOffset(c, t) - b.z); if (e < bd) { bd = e; best = c; }
      }
      return best;
    };
    /** Picking a parked sigil of hers back up: onto it, then the button, only when it would pick one up (rules/leash.ts: on
     *  the hex grid the cell she stands in decides, and a free one puts one down instead; a knockout parks hers off the grid). */
    const pickUp = (p: { x: number; z: number }) => {
      if (!goTo(p.x, p.z, true, t.leash.pickRadius) || b.mode !== "ground") return;
      const H = t.leash.hex && t.leash.hex.size > 0 ? t.leash.hex : null;
      const would = H ? hexSpot(w.leash, b.x, b.z, H.size).taken >= 0 : w.leash.placed.some(q => Math.hypot(q.x - b.x, q.z - b.z) <= t.leash.pickRadius);
      const d = Math.hypot(p.x - b.x, p.z - b.z);
      if (would) sigil = true; else if (d > 0.05) { mx = (p.x - b.x) / d; mz = (p.z - b.z) / d; }
    };

    if (w.ko) bot.doing = "knocked out";
    else if (g.party.spellAt === null) bot.doing = "casting the party spell";
    else if (kind === "idle") bot.doing = "waiting at home";
    else if (kind !== "hover" && !(careful && (healing || w.health.hp <= K.healAt)) && (back = letGoRune())) {
      // Back from a knockout: the ones it let go happy idle where they were dropped (rules/knockout.ts letGoHappy), each with
      // its rune at its feet; she fetches them first, nearest first, picking each rune up (E) as she would a new friend's.
      bot.doing = `gathering her posse (${letGo.size} to fetch)`;
      if (back.id !== fetching) { fetching = back.id; fetchSince = time; }
      else if (time - fetchSince > 60) { letGo.delete(back.id); fetching = -1; } // (one she can't get back, too heavy to carry or out of reach: left be)
      const rx = back.x, rz = back.z + runeOffset(back, t), rd = Math.hypot(rx - b.x, rz - b.z); // (its rune lies south of it)
      if (goTo(rx, rz, true, t.leash.pickRadius)) { if (rd > t.leash.pickRadius * 0.6) { mx = (rx - b.x) / rd; mz = (rz - b.z) / rd; } else if (step % 10 === 0) place = true; }
    }
    else if (kind !== "hover" && (straggler = winTarget(g)) && !(careful && (healing || w.health.hp <= K.healAt))) {
      // The win's stragglers (rules/win.ts, #675): nothing moves on while an enraged animal lives, and only her posse can
      // knock one down; she takes them to the one the pointer shows, landing by it and keeping out of its reach.
      const S = straggler, d = Math.hypot(S.x - b.x, S.z - b.z);
      // (her parked ones first, if she's carrying few: those she put down herself)
      let pk = null as { x: number; z: number } | null, pd = Infinity;
      if (w.leash.stack.length < 4) for (const p of w.leash.placed) { const e = Math.hypot(p.x - b.x, p.z - b.z); if (e < pd) { pd = e; pk = p; } }
      if (pk) { bot.doing = "gathering her posse for the last ones"; pickUp(pk); }
      else bot.doing = there(S.x, S.z) ? `seeing off ${article(S.species)}` : `flying to the last ${plural(S.species)}`;
      if (!pk && goTo(S.x, S.z, true, 12)) {
        if (d < K.kite) { mx = (b.x - S.x) / (d || 1); mz = (b.z - S.z) / (d || 1); dash = careful && d < K.dashAt; }
        else if (d > 12) { mx = (S.x - b.x) / d; mz = (S.z - b.z) / d; }
      }
    }
    else if (kind === "hover") { bot.doing = "hovering over home"; if (b.mode === "ground") toggle = true; } // (over the treetops at home all run: out of every fight)
    else if (careful && (healing || w.health.hp <= K.healAt)) {
      // To the treetops to heal, then back to work.
      healing = w.health.hp < Math.min(H, K.healTo);
      bot.doing = "healing in the treetops";
      // (a quest or relic trip that has brought her this low is given up: it costs more than it gives; another later)
      if (qjob) { qjob = null; questAgain = time + 60; }
      if (rjob?.phase === "pick") { rjob = null; relicAgain = time + 60; }
      // (her leash too heavy to fly with, rules/leashWeight.ts: she puts them down where she stands, one at a time, till she can rise;
      // they wait there to be gathered, as after a knockout. Pressing rise held down by them she only stood in the fight: 2026-10-27)
      if (b.mode === "ground" && healing) { if (groundedBy(w.leash.stack, g.creatures, t).grounded) { bot.doing = "lightening her leash to rise"; putDown(); } else toggle = true; }
    } else if (o.calm && careful && (calm = calmJob())) {
      // The champion calming a legend: one of its kind from her stack, put down in its area (cycled to the bottom first,
      // a press of the cycle button a step, as a player would).
      const { L, id } = calm, at = map.siteOf(L.cell[0], L.cell[1]);
      bot.doing = `bringing ${article(L.species)} home to the ${L.legendState} ${L.species} legend`;
      if (goTo(at.x, at.z, true, 6)) { const st = w.leash.stack, qi = st.indexOf(id), bt = stackBottom(w.leash); if (bt?.kind === "creature" && bt.id === id) putDown(); else if (qi >= 0) cycle = true; }
    } else if (o.siege && careful && (front = siegeFront())) {
      // The champion's siege response: to the soundsystem with the most marching on it, standing between it and the
      // nearest of them, so her posse meets them there; kiting what comes for her.
      const { h, near, n, home } = front, dn = near ? Math.hypot(near.x - h.x, near.z - h.z) || 1 : 1;
      const k = near ? (K.siegeSide < 0 ? -K.siegeStand / dn : Math.min(K.siegeStand, dn) / dn) : 0, ax = h.x + (near ? (near.x - h.x) * k : 0), az = h.z + (near ? (near.z - h.z) * k : 0);
      const what = home ? "the dancefloor" : "a soundsystem";
      bot.doing = there(ax, az) ? `holding ${what} against ${n}` : `flying to hold ${what}`;
      if (goTo(ax, az, true, 6)) {
        for (const c of g.creatures) if (c.enraged && !c.gone && !c.fleeUntil && Math.hypot(c.x - b.x, c.z - b.z) < K.kite) { const d = Math.hypot(c.x - b.x, c.z - b.z) || 1; mx = (b.x - c.x) / d; mz = (b.z - c.z) / d; dash = d < K.dashAt; bot.doing = `dodging ${article(c.species)} at ${what}`; break; }
      }
    } else if (o.regroup && careful && (stray = strandedGuard())) {
      // Guards left where a soundsystem fell: picked up (the sigil button over them), to be put down where they're needed.
      bot.doing = "picking up stranded guards";
      pickUp(stray);
    } else {
      const next = g.party.next[0], left = g.party.nextAt - time;
      const defending = careful && next && (left < K.defendLead || (landWave === g.party.wave && time - lastWave < K.defendHold));
      if (defending) {
        const cell = left < K.defendLead ? next : lastWoken ?? next, key = cellKey(cell), s = spot(cell);
        if (left < K.defendLead) landWave = g.party.wave + 1;
        const wave = left < K.defendLead ? g.party.wave + 1 : g.party.wave;
        // A quest she can do: the creature this area's legend dreams of, on her stack: put it down in the legend's
        // clearing (Ed, 2026-10-06: quest sigils count only in its circle), on its open floor.
        const L = LO.get(key), q = L !== undefined ? g.creatures[L].quest : null;
        const st = w.leash.stack;
        const qi = q && L !== undefined && g.creatures[L].questOpen ? st.findIndex(id => g.creatures[id].species === q.species) : -1;
        const lc = qi >= 0 ? map.legendClearing(cell[0], cell[1]) : null, at = lc ? { x: lc.x, z: lc.z + lc.r * 0.35 } : s;
        bot.doing = there(at.x, at.z) ? `defending wave ${wave}` : `flying to defend wave ${wave}`;
        if (goTo(at.x, at.z, true)) {
          if (qi >= 0) toBottom(w.leash, st[qi]); // (cycling the stack, as the sigil button does in the treetops)
          if (qi >= 0) { putDown(); bot.doing = `doing the ${g.creatures[L!].species} legend's quest`; }
          else if (!parkedAt.has(key) && st.length > KEEP) {
            // (not the creature a quest she's on wants: it goes to the top of the stack, out of the way)
            if (qjob && st[st.length - 1] === qjob.want.id && st.length > 1) st.unshift(st.pop()!);
            putDown(); bot.doing = `posting guards at wave ${wave}`; if (w.leash.placed.filter(p => Math.hypot(p.x - s.x, p.z - s.z) < 40).length >= Math.min(GUARDS, st.length - KEEP)) parkedAt.add(key); }
          // Then hold the spot, kiting anything that comes for her.
          for (const c of g.creatures) if (c.enraged && !c.gone && Math.hypot(c.x - b.x, c.z - b.z) < K.kite) { const d = Math.hypot(c.x - b.x, c.z - b.z) || 1; mx = (b.x - c.x) / d; mz = (b.z - c.z) / d; dash = d < K.dashAt; bot.doing = `dodging ${article(c.species)} at wave ${wave}`; break; }
        }
      } else if (o.relics && careful && (rjob || (time >= relicAgain && relicCount < (o.relicMax ?? Infinity) && relicTries < (o.relicMax ?? Infinity) * 3 && g.relics.some(r => r.state === "lying")))) {
        // A lucky find: to the nearest lying flask, and drink it on its sigil (the sigil button there: Ed, 2026-10-18, a growth
        // spurt, every animal following her an adult). It waits till some of hers following her are under age.
        if (!rjob) {
          if (w.leash.relics.length) rjob = { phase: "place", since: now, n: w.leash.relics.length };
          else { const r = g.relics.filter(r => r.state === "lying").sort((a, c) => Math.hypot(a.x - c.x, a.z - c.z) - Math.hypot(c.x - c.x, c.z - c.z) || Math.hypot(a.x - b.x, a.z - b.z) - Math.hypot(c.x - b.x, c.z - b.z))[0]; rjob = r ? { phase: "pick", r, since: now } : null; if (rjob) relicTries++; if (!rjob) relicAgain = time + 60; }
        }
        bot.doing = "fetching a flask";
        if (rjob?.phase === "pick") {
          const young = w.leash.stack.some(id => g.creatures[id].level < 2);
          if (!young) { rjob = null; relicAgain = time + 30; } // (nothing to grow: later)
          else if (goTo(rjob.r!.sx ?? rjob.r!.x, rjob.r!.sz ?? rjob.r!.z, true, 2)) { /* (standing on its sigil, a little south of it: #279) */ sigil = true; if (rjob.r!.state === "used") { bot.done.relics.push({ at: time, id: g.relics.findIndex(r => r === rjob!.r) }); relicCount++; rjob = null; relicAgain = time + 30; } }
          if (rjob && now - rjob.since > 120) { rjob = null; relicAgain = time + 60; }
        }
        else if (rjob?.phase === "place") {
          const P = o.relicPolicy ?? "nearest", d0 = map.dancefloor, next = new Set((g.party.next ?? []).map(c => cellKey(c)));
          const score = (c: Creature) => P === "home" ? Math.hypot(c.x - d0.x, c.z - d0.z) : P === "far" ? -Math.hypot(c.x - d0.x, c.z - d0.z) : P === "front" ? (next.has(cellKey(c.cell)) ? Math.hypot(c.x - b.x, c.z - b.z) : 1e6 + Math.hypot(c.x - d0.x, c.z - d0.z)) : Math.hypot(c.x - b.x, c.z - b.z);
          const L = [...LO.values()].map(id => g.creatures[id]).filter(c => !c.gone && (c.legendState === "asleep" || c.legendState === "restless")).sort((a, c) => score(a) - score(c))[0];
          if (!L) rjob = null;
          else if (goTo(...spotBy(L), true, 4)) { if (w.leash.relics.length < rjob.n!) { bot.done.relics.push({ at: time, id: L.id }); relicCount++; rjob = null; relicAgain = time + 30; } else if (stackBottom(w.leash)?.kind === "relic") sigil = true; else cycle = true; } // (the relic's sigil cycled to the bottom first, as a player would)
          if (rjob && now - (rjob.since ?? now) > 150) { rjob = null; relicAgain = time + 60; }
        }
      } else if (o.quests && careful && (qjob || (time >= questAgain && questCount < (o.questMax ?? Infinity) && questTries < (o.questMax ?? Infinity) * 2))) {
        // A quick player: the nearest sleeping legend with an open quest whose dream she can fetch (a creature of that
        // kind and level, wild, nearby), invite it, and bring its sigil to the legend's area.
        if (!qjob) {
          let best = null as QJob | null, bs = Infinity;
          for (const id of LO.values()) {
            const L = g.creatures[id], q = L.quest;
            if (L.gone || !L.questOpen || !q) continue;
            const onStack = w.leash.stack.find(i => g.creatures[i].species === q.species);
            let want: Creature | null = onStack !== undefined ? g.creatures[onStack] : null, wd = 0;
            if (!want) { let md = Infinity; for (const c of g.creatures) { if (c.gone || c.leashed || c.boss || c.enraged || c.species !== q.species || c.fleeUntil !== undefined) continue; const d = Math.hypot(c.x - b.x, c.z - b.z); if (d < md && d < 700) { md = d; want = c; } } wd = md; }
            if (!want) continue;
            const sc = wd + Math.hypot(L.x - want.x, L.z - want.z);
            if (sc < bs) { bs = sc; best = { L, want, phase: want.leashed ? "deliver" : "fetch", since: now }; }
          }
          qjob = best; if (best) questTries++; if (!qjob) questAgain = time + 45;
        }
        if (qjob) {
          const { L, want } = qjob, q = L.quest;
          bot.doing = qjob.phase === "fetch" ? `fetching ${article(want.species)} for the ${L.species} legend` : `bringing the ${L.species} legend its ${want.species}`;
          if (!L.questOpen || want.gone || now - qjob.since > 180) { if (q?.done !== undefined) { bot.done.quests.push({ at: time, id: L.id }); questCount++; } qjob = null; questAgain = time + (q?.done !== undefined ? 5 : 45); }
          else if (qjob.phase === "fetch") {
            if (want.leashed) qjob.phase = "deliver";
            else if (stateOf(want) === "happy") {
              // won over: its rune lies at its feet, to pick up (the rune button by it), then it's on her stack
              const rd = Math.hypot(want.x - b.x, want.z - b.z);
              if (goTo(want.x, want.z, true, 4)) { if (rd > t.leash.pickRadius * 0.6) { mx = (want.x - b.x) / rd; mz = (want.z - b.z) / rd; } else if (step % 10 === 0) place = true; }
            } else if (goTo(want.x, want.z, true)) { const td = Math.hypot(want.x - b.x, want.z - b.z); [aimX, aimZ] = aimAt(want, td); fire = td < R * K.fireFrac; mx = 0; mz = 0; if (td > R * K.closeFrac) { mx = aimX / td; mz = aimZ / td; } }
          } else if (goTo(...spotBy(L), true, 4)) {
            const st = w.leash.stack, qi = st.indexOf(want.id);
            if (qi < 0) { qjob = null; questAgain = time + 10; }
            else { toBottom(w.leash, st[qi]); putDown(); } // (cycling it to the bottom, as the sigil button does in the treetops)
          }
        }
      } else if (careful && homeJob()) {
        // A standing defence at home (Ed, 2026-10-11): fighters beyond those following her put down in the home area, where
        // they defend all of it; the youngest fighters first, cycled to the bottom as the sigil button does in the treetops.
        const d0 = map.dancefloor, at = { x: d0.x, z: d0.z + K.homeStand };
        bot.doing = "posting guards at home";
        if (goTo(at.x, at.z, true, 8)) {
          // (the bottom one if it's of the youngest level: picking the topmost of that level every step and cycling it down
          // turned the stack over and over and never put one down, a fighter of the same level already at the bottom: seed 33)
          const st = w.leash.stack, fit = (i: number) => g.creatures[i].level > 0 && g.creatures[i].level < 3, bt = stackBottom(w.leash);
          const id = [...st].filter(fit).sort((a, c) => g.creatures[a].level - g.creatures[c].level)[0];
          if (id !== undefined) { if (bt?.kind === "creature" && fit(bt.id) && g.creatures[bt.id].level === g.creatures[id].level) putDown(); else toBottom(w.leash, id); }
        }
      } else if (o.feed && careful && (feeding || (time >= feedAgain && w.leash.stack.filter(id => g.creatures[id].level === 0).length >= K.feedMin))) {
        // Feeding her babies (Ed, 2026-10-11: "Babies don't defend, but they can be easily moved and cheaply levelled up to
        // youths"; rules/berries.ts: a baby eats only at its placed sigil, a berry within berries.babyReach of it, and one berry
        // makes it a youth): to the nearest patch of ripe berries, her babies' sigils put down by it, a few seconds while they
        // eat, then picked up again, youths.
        if (!feeding) {
          const B = g.berries, ripe = B.berries.filter(r => r.claimedBy === null && !r.gone).map(r => B.bushes[r.bush]);
          let best: { x: number; z: number } | null = null, bs = -Infinity;
          for (const p of ripe) {
            const d = Math.hypot(p.x - b.x, p.z - b.z); if (d > K.feedRange) continue;
            const n = ripe.filter(q => Math.hypot(q.x - p.x, q.z - p.z) < 10).length, sc = n * 60 - d;
            if (n >= 3 && sc > bs) { bs = sc; best = p; }
          }
          feeding = best ? { x: best.x, z: best.z, until: Infinity, phase: "drop", ids: [] } : null;
          if (!feeding) feedAgain = time + 30;
        }
        bot.doing = feeding?.phase === "collect" ? "gathering her youths" : "feeding her babies berries";
        if (feeding && feeding.phase === "drop" && goTo(feeding.x, feeding.z, true, 4)) {
          const B = g.berries, reach = (t.berries.babyReach ?? 10) * 0.8;
          const ripeNear = B.berries.filter(r => r.claimedBy === null && !r.gone && Math.hypot(B.bushes[r.bush].x - feeding!.x, B.bushes[r.bush].z - feeding!.z) < reach).length;
          const baby = w.leash.stack.filter(id => g.creatures[id].level === 0).pop(), bt = stackBottom(w.leash);
          if (baby === undefined || feeding.ids!.length >= ripeNear || Math.hypot(b.x - feeding.x, b.z - feeding.z) > reach) { feeding.phase = "wait"; feeding.until = time + K.feedWait; }
          else if (bt?.kind === "creature" && bt.id === baby) { putDown(); if (sigil) feeding.ids!.push(baby); }
          else toBottom(w.leash, baby); // (cycled to the bottom, as the sigil button does in the treetops)
        } else if (feeding && feeding.phase === "wait") {
          if (time >= feeding.until || feeding.ids!.every(id => g.creatures[id].level > 0)) feeding.phase = "collect";
        } else if (feeding && feeding.phase === "collect") {
          let pk = null as { x: number; z: number } | null, pd = Infinity;
          for (const p of w.leash.placed) if (feeding.ids!.includes(p.id)) { const e = Math.hypot(p.x - b.x, p.z - b.z); if (e < pd) { pd = e; pk = p; } }
          if (pk) pickUp(pk); else { feeding = null; feedAgain = time + 20; }
        }
        if (feeding && time - (feeding.until === Infinity ? time : feeding.until) > 40) { feeding.phase = "collect"; } // (never stuck waiting)
      } else if (stacks && b.mode === "ground" && !b.seated && (looseAt = looseNear(g.loose.filter(p => !p.legend), b.x, b.z, 25)) >= 0) {
        // A stone she's converted (rules/stoneStacks.ts): its friends' sigils lie scattered round it; she picks them up (E on each).
        const p = g.loose.filter(q => !q.legend)[looseAt], rd = Math.hypot(p.x - b.x, p.z - b.z);
        bot.doing = `gathering ${article(g.creatures[p.id].species)}'s sigil`;
        if (rd > t.leash.pickRadius * 0.6) { mx = (p.x - b.x) / rd; mz = (p.z - b.z) / rd; } else if (step % 10 === 0) place = true;
      } else if (b.mode === "ground" && !b.seated && runeNear(g.creatures, b.x, b.z, 25, time, undefined, k => runeOffset(k, t))) {
        // One won over (happy): its sigil lies as a rune south of it; pick it up to leash it (E; Ed, 2026-10-06).
        const rn = runeNear(g.creatures, b.x, b.z, 25, time, undefined, k => runeOffset(k, t))!, rx = rn.x, rz = rn.z + runeOffset(rn, t), rd = Math.hypot(rx - b.x, rz - b.z); // (its rune lies south of it)
        bot.doing = `picking up ${article(rn.species)}'s rune`;
        if (rd > t.leash.pickRadius * 0.6) { mx = (rx - b.x) / rd; mz = (rz - b.z) / rd; } else if (step % 10 === 0) place = true;
      } else {
        if (!target || time >= pickAt) { target = pickRecruit(); pickAt = time + 3; }
        bot.doing = target ? (there(target.x, target.z) ? `inviting the ${plural(species(target.cell))}` : `flying to the ${plural(species(target.cell))}`) : "looking for someone to invite";
        if (target && goTo(target.x, target.z, true)) {
          const open = inviteable(target.key, target.cell).filter(c => Math.hypot(c.x - b.x, c.z - b.z) < 140);
          if (stacks && stoneOpen(g, target.key) && castReady(g, target.key)) {
            // Every fighter of its area won over (babies come with the stone; castReady): to its stone's spot, and the soundsystem
            // spell (the sigil button held: rules/stoneStacks.ts); a hit breaks it, so she lets go a moment and holds again.
            const s = castSpot(map.soundsystemSpot(target.cell[0], target.cell[1]), t), sd = Math.hypot(s.x - b.x, s.z - b.z); // (its spell spot, south of it)
            bot.doing = `casting at the ${plural(species(target.cell))}' stone`;
            if (castingStone(g, w)?.key === target.key) held = !w.castBlocked;
            if (sd > castOf(t).radius * 0.5) { mx = (s.x - b.x) / sd; mz = (s.z - b.z) / sd; } else { mx = 0; mz = 0; } // (on the spot she stands still to cast)
          } else if (!open.length) { target = null; pickAt = time; }
          else {
            let tg = open[0], td = Infinity, ts = Infinity;
            // (the careful ones: the young and adults first, the nearest of them: babies don't fight, nor besiege)
            for (const c of open) { const d = Math.hypot(c.x - b.x, c.z - b.z), sc = d + (careful && c.level === 0 ? K.babyFar : 0); if (sc < ts) { ts = sc; td = d; tg = c; } }
            [aimX, aimZ] = aimAt(tg, td); fire = td < R * K.fireFrac;
            if (tg.species !== species(target.cell)) bot.doing = `inviting ${article(tg.species)}`;
            mx = 0; mz = 0;
            let th: Creature | null = null, hd = Infinity;
            for (const c of g.creatures) if (!c.gone && !c.leashed && !c.boss && c.level > 0 && cellKey(c.cell) === target.key) { const d = Math.hypot(c.x - b.x, c.z - b.z); if (d < hd) { hd = d; th = c; } }
            if (careful && th && hd < K.kite) { mx = (b.x - th.x) / hd; mz = (b.z - th.z) / hd; dash = hd < K.dashAt; }
            else if (td > R * K.closeFrac) { mx = aimX / td; mz = aimZ / td; }
          }
        }
      }
    }
    // The novice (Ed, 2026-10-06: "most human players are much worse than the skilled bot (or even the crude bot)"):
    // the crude one's play, but firing only every other second, its aim wobbling a metre, and never blinking.
    if (kind === "novice") { fire = fire && Math.floor(time) % 2 === 0; aimX += Math.sin(time * 2.3); aimZ += Math.cos(time * 1.7); dash = false; }
    if (o.blink && careful && b.mode === "ground" && !w.ko) {
      const dd = threatDodge();
      if (dd) { dash = true; mx = dd.x; mz = dd.z; aimX = dd.x * 10; aimZ = dd.z * 10; fire = false; }
      else if (dash) { const l = Math.hypot(mx, mz) || 1; aimX = (mx / l) * 10; aimZ = (mz / l) * 10; fire = false; } // (a kiting blink: away, the way she's going)
    }
    // The treehouse deck (rules/treehouse.ts): the bots don't use it. Stepped off her decks onto it, or flown onto the house's landing
    // trunk on her way somewhere (Dining Room to Boudoir: it lands her by herself), she rises straight off (from any room, with her
    // broom: Ed, 2026-10-26); in the treetops she doesn't come down over it (landsOn).
    const deck = deckOf(g.map, t);
    if (deck && !b.seated && b.perch && b.mode === "ground") toggle = true;
    else if (deck && toggle && b.mode === "treetop" && landsOn(deck, b.x, b.z)) toggle = false;
    return { moveX: mx, moveZ: mz, toggleMode: toggle, zoom: 0, fire, aimX, aimZ, dash, sigil, place, ...(held ? { sigilHeld: true } : {}), ...(cycle ? { cycle } : {}), castParty: g.party.spellAt === null };
  }
}
