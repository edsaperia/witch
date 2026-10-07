// The bots (the balance builder's, tools/balance/runbot.mjs; Ed, 2026-10-06: "It would be good to be able to start the
// game and watch the skilled bot play"): a player made of rules, deciding each step from the game as it is and giving
// back the very controls a player's input would. The balance tool plays them headless to measure a run; the game's bot
// game (?bot=skilled, the start screen's Bot game) plays them in real time to watch. One module, so the tactics the
// balance builder tunes are the ones the bot game shows.
//   skilled: recruits carefully (never empties an area of its own kind, so no legend grows restless), does a legend's
//     quest when she carries the creature it dreams of, heads for the next wave's soundsystem before it lands and parks
//     some of her posse there as guards, kites fighters, and rises to the treetops to heal at her last hit;
//   idle: stands at home all run (the sieges alone);
//   hover: idle, but over the treetops (nothing can go for her);
//   crude: invites everything in the nearest wild area, area after area, and never parks, defends or heals.
// She flies between areas over the treetops and fights on the ground, as a player does. Seeded and deterministic: no
// clock, no Math.random; the same game and the same steps give the same controls.
import { AREA_TYPES } from "./map";
import { cellKey } from "./party";
import { runeNear } from "./creatureStates";
import { creatureValue, sideValue } from "./power";
import type { Controls, Game } from "./game";
import type { Creature } from "./creatures";
import type { Cell } from "./partition";

export type BotKind = "skilled" | "champion" | "crude" | "novice" | "idle" | "hover";
export const BOT_KINDS: readonly BotKind[] = ["skilled", "champion", "crude", "novice", "idle", "hover"];

export interface BotOptions {
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
  /** Rises to heal at this many hits left (or fewer). */
  healAt: number;
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
  /** She stands this far out from the soundsystem toward its nearest marcher (m). */
  siegeStand: number;
  /** The dancefloor's threat counts this many times another's. */
  homeWeight: number;
  /** A guard this far from every standing soundsystem is stranded (m): regroup picks it up. */
  strandFar: number;
  /** Leads a moving target by this share of where it'll be when the 💌 arrives (0: aims where it is). */
  lead: number;
  /** Blinks when a blow aimed at her lands within this (s). */
  blinkLead: number;
}
export const BOT_KNOBS: BotKnobs = { defendLead: 50, defendHold: 60, healAt: 1, kite: 9, dashAt: 5, fireFrac: 0.95, closeFrac: 0.8, recruitRange: 900, kinKeep: 1, feedMin: 3, feedRange: 500, feedWait: 20, siegeNear: 120, siegeMin: 10, siegeStand: 8, homeWeight: 1.5, strandFar: 80, lead: 0, concede: 1.5, blinkLead: 0.3 };

/** The bot game's choices (Ed, 2026-10-06, watching it: "It's notable that it doesn't seem to get any legend buffs or
 *  feed creatures any berries"): the skilled one does a few quests, brings relics to the legends by the coming waves,
 *  and leads her young to berries, as a good player would. The balance tool's runs keep each to its flag. */
export const BOT_GAME: Record<BotKind, BotOptions> = {
  skilled: { quests: true, questMax: 3, relics: true, relicMax: 2, relicPolicy: "front", feed: true }, // (two relics: all six took her first ten minutes, and halved her army)
  champion: { feed: true, siege: true, regroup: true, blink: true, calm: true, calmRestless: true, knobs: { lead: 0.8 } }, // (no quest or relic trips: they cost her army in the first ten minutes; the search's numbers go here) // (the champion: the skilled bot's play with the numbers and tactics its search found; tools/balance/coach.mjs)
  crude: {}, novice: {}, idle: {}, hover: {},
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
  const GUARDS = o.guards ?? 3, KEEP = o.keep ?? 2, careful = kind === "skilled" || kind === "champion", K = { ...BOT_KNOBS, ...o.knobs };
  let legendOf: Map<string, number> | null = null;
  let qjob = null as QJob | null, questAgain = 0, questCount = 0, relicCount = 0, questTries = 0, relicTries = 0; // (tries, so a quest or relic that keeps failing doesn't eat the run)
  let rjob: { phase: "pick" | "place"; r?: { x: number; z: number; sx?: number; sz?: number; state: string }; since: number; n?: number } | null = null, relicAgain = 0;
  let feeding: { x: number; z: number; until: number } | null = null, feedAgain = 0, healing = false;
  let target: Target | null = null, pickAt = -1, landWave = -1, lastWave = 0, seenWave = 0, lastWoken: Cell | null = null, steps = 0;
  const parkedAt = new Set<string>();
  let holding = null as string | null; // (the soundsystem the champion's holding)
  const seen = new Map<number, { x: number; z: number; at: number }>(); // (where she last saw each target: the champion leads moving ones)
  const bot: Bot = { kind, doing: "", done: { quests: [], relics: [] }, decide };
  return bot;

  function decide(g: Game): Controls {
    const map = g.map, w = g.witches[0], b = w.body, time = g.clock.time, t = g.tuning, R = t.invites.range, H = t.witchHealth.hits;
    const homeKey = cellKey(map.centreCell);
    legendOf ??= new Map(g.creatures.filter(c => c.boss).map(c => [cellKey(c.cell), c.id]));
    const LO = legendOf;
    // The waves she's seen come: when the last came, and the area it woke (the last she'd defend after it).
    if (g.party.wave > seenWave) {
      seenWave = g.party.wave; lastWave = time;
      for (const a of g.party.areas.values()) if (a.wave === g.party.wave) lastWoken = a.cell;
    }
    const step = steps++;
    const spot = (c: Cell) => (cellKey(c) === homeKey ? map.dancefloor : map.soundsystemSpot(c[0], c[1]));
    const species = (c: Cell) => AREA_TYPES[map.typeOf(c[0], c[1])].creature;
    // Where to put a quest's sigil or a relic down: in the legend's clearing (#244: only there counts), in front of it; else beside it.
    const spotBy = (L: Creature): [number, number] => { const lc = map.legendClearing?.(L.cell[0], L.cell[1]); return lc ? [lc.x, lc.z] : [L.x + 4, L.z + 4]; };

    /** Who she may invite in an area (careful: never its last one of the area's kind). */
    const inviteable = (key: string, cell: Cell): Creature[] => {
      const sp = species(cell), out: Creature[] = [];
      let kin = 0;
      for (const c of g.creatures) if (!c.gone && !c.boss && !c.leashed && c.fleeUntil === undefined && cellKey(c.cell) === key && c.species === sp) kin++;
      for (const c of g.creatures) {
        if (c.gone || c.boss || c.leashed || c.fleeUntil !== undefined || c.enraged || cellKey(c.cell) !== key) continue;
        if (careful && c.species === sp && kin <= K.kinKeep) continue;
        out.push(c);
      }
      return out;
    };
    /** Where to recruit next: the nearest wild area with someone she may invite. */
    const pickRecruit = () => {
      let best = null as Target | null, bs = Infinity;
      for (const [i, j] of map.cells) {
        const cell: Cell = [i, j], key = cellKey(cell);
        if (g.party.areas.has(key) || g.party.ruined?.has(key)) continue;
        const L = LO.get(key); if (L !== undefined && g.creatures[L].legendState === "angry") continue; // (keep out of an angry legend's area)
        const s = map.siteOf(i, j), d = Math.hypot(s.x - b.x, s.z - b.z);
        if (d > K.recruitRange || !inviteable(key, cell).length) continue;
        if (d < bs) { bs = d; best = { cell, key, x: s.x, z: s.z }; }
      }
      return best;
    };

    /** The siege most worth holding: the standing soundsystem with the most fighting value marching on it near it
     *  (the dancefloor's weighed up), unless it outweighs her posse past `concede`. */
    const siegeFront = () => {
      const posse = sideValue(w.leash.stack.map(id => g.creatures[id]));
      let best = null as { key: string; h: { x: number; z: number }; near: Creature | null; n: number; home: boolean } | null, bs = 0;
      for (const [key, h] of g.combat.sounds) {
        if (h.hp <= 0) continue;
        let f = 0, n = 0, near: Creature | null = null, nd = Infinity;
        for (const c of g.creatures) {
          if (c.gone || c.siege !== key || c.leashed || c.fleeUntil !== undefined || c.dazed) continue;
          const d = Math.hypot(c.x - h.x, c.z - h.z); if (d > K.siegeNear) continue;
          f += creatureValue(c); n++; if (d < nd) { nd = d; near = c; }
        }
        if (f < K.siegeMin || (K.concede > 0 && f > K.concede * Math.max(posse, 1))) continue;
        const sc = f * (key === "home" ? K.homeWeight : 1) / (1 + Math.hypot(h.x - b.x, h.z - b.z) / 600) * (key === holding ? 2 : 1); // (the one she's going to, twice: no flip-flopping between two)
        if (sc > bs) { bs = sc; best = { key, h, near, n, home: key === "home" }; }
      }
      holding = best?.key ?? null;
      return best;
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
    let calm = null as ReturnType<typeof calmJob>, cycle = false;
    let front = null as ReturnType<typeof siegeFront>, stray = null as ReturnType<typeof strandedGuard>;
    let mx = 0, mz = 0, toggle = false, fire = false, aimX = 0, aimZ = 0, dash = false, sigil = false, place = false;
    /** Toward (x, z): over the treetops when far, landing there if `land`; true once on the ground within `within` m. */
    const NEAR = 45, FAR = 60;
    const goTo = (x: number, z: number, land: boolean, within = 45) => {
      const dx = x - b.x, dz = z - b.z, d = Math.hypot(dx, dz) || 1;
      // (Rising only past FAR on foot, landing within NEAR: between the two she walks, so she never hops up and down at the line.)
      if (d > (b.mode === "ground" ? FAR : NEAR)) { if (b.mode === "ground") toggle = true; mx = dx / d; mz = dz / d; return false; }
      if (land && b.mode === "treetop") { toggle = true; return false; }
      if (b.mode === "ground" && d > Math.min(6, within * 0.6)) { mx = dx / d; mz = dz / d; }
      return b.mode === "ground" && d <= within; // (within: how near counts as there; a clearing's sigil, a few metres)
    };
    const there = (x: number, z: number) => Math.hypot(x - b.x, z - b.z) <= (b.mode === "treetop" ? NEAR : FAR);

    if (w.ko) bot.doing = "knocked out";
    else if (g.party.spellAt === null) bot.doing = "casting the party spell";
    else if (kind === "idle") bot.doing = "waiting at home";
    else if (kind === "hover") { bot.doing = "hovering over home"; if (b.mode === "ground") toggle = true; } // (over the treetops at home all run: out of every fight)
    else if (careful && (healing || w.health.hp <= K.healAt)) {
      // To the treetops to heal, then back to work.
      healing = w.health.hp < H;
      bot.doing = "healing in the treetops";
      // (a quest or relic trip that has brought her this low is given up: it costs more than it gives; another later)
      if (qjob) { qjob = null; questAgain = time + 60; }
      if (rjob?.phase === "pick") { rjob = null; relicAgain = time + 60; }
      if (b.mode === "ground" && healing) toggle = true;
    } else if (o.calm && careful && (calm = calmJob())) {
      // The champion calming a legend: one of its kind from her stack, put down in its area (cycled to the bottom first,
      // a press of the cycle button a step, as a player would).
      const { L, id } = calm, at = map.siteOf(L.cell[0], L.cell[1]);
      bot.doing = `bringing ${article(L.species)} home to the ${L.legendState} ${L.species} legend`;
      if (goTo(at.x, at.z, true, 6)) { const st = w.leash.stack, qi = st.indexOf(id); if (qi === st.length - 1) sigil = true; else if (qi >= 0) cycle = true; }
    } else if (o.siege && careful && (front = siegeFront())) {
      // The champion's siege response: to the soundsystem with the most marching on it, standing between it and the
      // nearest of them, so her posse meets them there; kiting what comes for her.
      const { h, near, n, home } = front, dn = near ? Math.hypot(near.x - h.x, near.z - h.z) || 1 : 1;
      const k = near ? Math.min(K.siegeStand, dn) / dn : 0, ax = h.x + (near ? (near.x - h.x) * k : 0), az = h.z + (near ? (near.z - h.z) * k : 0);
      const what = home ? "the dancefloor" : "a soundsystem";
      bot.doing = there(ax, az) ? `holding ${what} against ${n}` : `flying to hold ${what}`;
      if (goTo(ax, az, true, 6)) {
        for (const c of g.creatures) if (c.enraged && !c.gone && !c.fleeUntil && Math.hypot(c.x - b.x, c.z - b.z) < K.kite) { const d = Math.hypot(c.x - b.x, c.z - b.z) || 1; mx = (b.x - c.x) / d; mz = (b.z - c.z) / d; dash = d < K.dashAt; bot.doing = `dodging ${article(c.species)} at ${what}`; break; }
      }
    } else if (o.regroup && careful && (stray = strandedGuard())) {
      // Guards left where a soundsystem fell: picked up (the sigil button over them), to be put down where they're needed.
      bot.doing = "picking up stranded guards";
      if (goTo(stray.x, stray.z, true, t.leash.pickRadius * 0.5) && b.mode === "ground") sigil = true;
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
        const qi = q && L !== undefined && g.creatures[L].questOpen ? st.findIndex(id => g.creatures[id].species === q.species && g.creatures[id].level === q.level) : -1;
        const lc = qi >= 0 ? map.legendClearing(cell[0], cell[1]) : null, at = lc ? { x: lc.x, z: lc.z + lc.r * 0.35 } : s;
        bot.doing = there(at.x, at.z) ? `defending wave ${wave}` : `flying to defend wave ${wave}`;
        if (goTo(at.x, at.z, true)) {
          if (qi >= 0 && qi !== st.length - 1) { st.push(st.splice(qi, 1)[0]); } // (cycling the stack, as the sigil button does in the treetops)
          if (qi >= 0) { sigil = true; bot.doing = `doing the ${g.creatures[L!].species} legend's quest`; }
          else if (!parkedAt.has(key) && st.length > KEEP) { sigil = true; bot.doing = `posting guards at wave ${wave}`; if (w.leash.placed.filter(p => Math.hypot(p.x - s.x, p.z - s.z) < 40).length >= Math.min(GUARDS, st.length - KEEP)) parkedAt.add(key); }
          // Then hold the spot, kiting anything that comes for her.
          for (const c of g.creatures) if (c.enraged && !c.gone && Math.hypot(c.x - b.x, c.z - b.z) < K.kite) { const d = Math.hypot(c.x - b.x, c.z - b.z) || 1; mx = (b.x - c.x) / d; mz = (b.z - c.z) / d; dash = d < K.dashAt; bot.doing = `dodging ${article(c.species)} at wave ${wave}`; break; }
        }
      } else if (o.relics && careful && (rjob || (time >= relicAgain && relicCount < (o.relicMax ?? Infinity) && relicTries < (o.relicMax ?? Infinity) * 3 && g.relics.some(r => r.state === "lying")))) {
        // A lucky find: to the nearest lying relic, pick it up (the sigil button by it), then to the nearest sleeping
        // legend and put it down beside it: a powerful ally.
        if (!rjob) {
          if (w.leash.relics.length) rjob = { phase: "place", since: time, n: w.leash.relics.length };
          else { const r = g.relics.filter(r => r.state === "lying").sort((a, c) => Math.hypot(a.x - c.x, a.z - c.z) - Math.hypot(c.x - c.x, c.z - c.z) || Math.hypot(a.x - b.x, a.z - b.z) - Math.hypot(c.x - b.x, c.z - b.z))[0]; rjob = r ? { phase: "pick", r, since: time } : null; if (rjob) relicTries++; if (!rjob) relicAgain = time + 60; }
        }
        bot.doing = rjob?.phase === "place" ? "bringing a relic to a legend" : "fetching a relic";
        if (rjob?.phase === "pick") { if (goTo(rjob.r!.sx ?? rjob.r!.x, rjob.r!.sz ?? rjob.r!.z, true, 2)) { /* (standing on its sigil, a little south of it: #279) */ sigil = true; if (w.leash.relics.length) rjob = { phase: "place", since: time, n: w.leash.relics.length }; } if (rjob && time - rjob.since > 120) { rjob = null; relicAgain = time + 60; } }
        else if (rjob?.phase === "place") {
          const P = o.relicPolicy ?? "nearest", d0 = map.dancefloor, next = new Set((g.party.next ?? []).map(c => cellKey(c)));
          const score = (c: Creature) => P === "home" ? Math.hypot(c.x - d0.x, c.z - d0.z) : P === "far" ? -Math.hypot(c.x - d0.x, c.z - d0.z) : P === "front" ? (next.has(cellKey(c.cell)) ? Math.hypot(c.x - b.x, c.z - b.z) : 1e6 + Math.hypot(c.x - d0.x, c.z - d0.z)) : Math.hypot(c.x - b.x, c.z - b.z);
          const L = [...LO.values()].map(id => g.creatures[id]).filter(c => !c.gone && (c.legendState === "asleep" || c.legendState === "restless")).sort((a, c) => score(a) - score(c))[0];
          if (!L) rjob = null;
          else if (goTo(...spotBy(L), true, 4)) { if (w.leash.relics.length < rjob.n!) { bot.done.relics.push({ at: time, id: L.id }); relicCount++; rjob = null; relicAgain = time + 30; } else sigil = true; }
          if (rjob && time - (rjob.since ?? time) > 150) { rjob = null; relicAgain = time + 60; }
        }
      } else if (o.quests && careful && (qjob || (time >= questAgain && questCount < (o.questMax ?? Infinity) && questTries < (o.questMax ?? Infinity) * 2))) {
        // A quick player: the nearest sleeping legend with an open quest whose dream she can fetch (a creature of that
        // kind and level, wild, nearby), invite it, and bring its sigil to the legend's area.
        if (!qjob) {
          let best = null as QJob | null, bs = Infinity;
          for (const id of LO.values()) {
            const L = g.creatures[id], q = L.quest;
            if (L.gone || !L.questOpen || !q) continue;
            const onStack = w.leash.stack.find(i => g.creatures[i].species === q.species && g.creatures[i].level === q.level);
            let want: Creature | null = onStack !== undefined ? g.creatures[onStack] : null, wd = 0;
            if (!want) { let md = Infinity; for (const c of g.creatures) { if (c.gone || c.leashed || c.boss || c.enraged || c.species !== q.species || c.level !== q.level || c.fleeUntil !== undefined) continue; const d = Math.hypot(c.x - b.x, c.z - b.z); if (d < md && d < 700) { md = d; want = c; } } wd = md; }
            if (!want) continue;
            const sc = wd + Math.hypot(L.x - want.x, L.z - want.z);
            if (sc < bs) { bs = sc; best = { L, want, phase: want.leashed ? "deliver" : "fetch", since: time }; }
          }
          qjob = best; if (best) questTries++; if (!qjob) questAgain = time + 45;
        }
        if (qjob) {
          const { L, want } = qjob, q = L.quest;
          bot.doing = qjob.phase === "fetch" ? `fetching ${article(want.species)} for the ${L.species} legend` : `bringing the ${L.species} legend its ${want.species}`;
          if (!L.questOpen || want.gone || time - qjob.since > 180) { if (q?.done !== undefined) { bot.done.quests.push({ at: time, id: L.id }); questCount++; } qjob = null; questAgain = time + (q?.done !== undefined ? 5 : 45); }
          else if (qjob.phase === "fetch") {
            if (want.leashed) qjob.phase = "deliver";
            else if (goTo(want.x, want.z, true)) { const td = Math.hypot(want.x - b.x, want.z - b.z); [aimX, aimZ] = aimAt(want, td); fire = td < R * K.fireFrac; mx = 0; mz = 0; if (td > R * K.closeFrac) { mx = aimX / td; mz = aimZ / td; } }
          } else if (goTo(...spotBy(L), true, 4)) {
            const st = w.leash.stack, qi = st.indexOf(want.id);
            if (qi < 0) { qjob = null; questAgain = time + 10; }
            else { if (qi !== st.length - 1) st.push(st.splice(qi, 1)[0]); sigil = true; } // (cycling it to the bottom, as the sigil button does in the treetops)
          }
        }
      } else if (o.feed && careful && (feeding || (time >= feedAgain && w.leash.stack.filter(id => g.creatures[id].level < 2).length >= K.feedMin))) {
        // Feeding: her young ones to the nearest patch of ripe berries, and wait there while they eat.
        if (!feeding) {
          const B = g.berries, ripe = B.berries.filter(r => r.claimedBy === null).map(r => B.bushes[r.bush]);
          let best: { x: number; z: number } | null = null, bs = -Infinity;
          for (const p of ripe) {
            const d = Math.hypot(p.x - b.x, p.z - b.z); if (d > K.feedRange) continue;
            const n = ripe.filter(q => Math.hypot(q.x - p.x, q.z - p.z) < 10).length, sc = n * 60 - d;
            if (n >= 3 && sc > bs) { bs = sc; best = p; }
          }
          feeding = best ? { x: best.x, z: best.z, until: Infinity } : null;
          if (!feeding) feedAgain = time + 30;
        }
        bot.doing = "feeding the young ones berries";
        if (feeding && goTo(feeding.x, feeding.z, true)) {
          if (feeding.until === Infinity) feeding.until = time + K.feedWait; // (20 s among the bushes)
          if (time >= feeding.until) { feeding = null; feedAgain = time + 60; }
        }
      } else if (b.mode === "ground" && !b.seated && runeNear(g.creatures, b.x, b.z, 25, time)) {
        // One won over (happy): its sigil lies as a rune at its feet; pick it up to leash it (E; Ed, 2026-10-06).
        const rn = runeNear(g.creatures, b.x, b.z, 25, time)!, rd = Math.hypot(rn.x - b.x, rn.z - b.z);
        bot.doing = `picking up ${article(rn.species)}'s rune`;
        if (rd > t.leash.pickRadius * 0.6) { mx = (rn.x - b.x) / rd; mz = (rn.z - b.z) / rd; } else if (step % 10 === 0) place = true;
      } else {
        if (!target || time >= pickAt) { target = pickRecruit(); pickAt = time + 3; }
        bot.doing = target ? (there(target.x, target.z) ? `inviting the ${plural(species(target.cell))}` : `flying to the ${plural(species(target.cell))}`) : "looking for someone to invite";
        if (target && goTo(target.x, target.z, true)) {
          const open = inviteable(target.key, target.cell).filter(c => Math.hypot(c.x - b.x, c.z - b.z) < 140);
          if (!open.length) { target = null; pickAt = time; }
          else {
            let tg = open[0], td = Infinity;
            for (const c of open) { const d = Math.hypot(c.x - b.x, c.z - b.z); if (d < td) { td = d; tg = c; } }
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
    return { moveX: mx, moveZ: mz, toggleMode: toggle, zoom: 0, fire, aimX, aimZ, dash, sigil, place, ...(cycle ? { cycle } : {}), castParty: g.party.spellAt === null };
  }
}
