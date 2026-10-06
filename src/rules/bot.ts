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
import type { Controls, Game } from "./game";
import type { Creature } from "./creatures";
import type { Cell } from "./partition";

export type BotKind = "skilled" | "crude" | "novice" | "idle" | "hover";
export const BOT_KINDS: readonly BotKind[] = ["skilled", "crude", "novice", "idle", "hover"];

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
}

/** The bot game's choices (Ed, 2026-10-06, watching it: "It's notable that it doesn't seem to get any legend buffs or
 *  feed creatures any berries"): the skilled one does a few quests, brings relics to the legends by the coming waves,
 *  and leads her young to berries, as a good player would. The balance tool's runs keep each to its flag. */
export const BOT_GAME: Record<BotKind, BotOptions> = {
  skilled: { quests: true, questMax: 3, relics: true, relicMax: 2, relicPolicy: "front", feed: true }, // (two relics: all six took her first ten minutes, and halved her army)
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
  const GUARDS = o.guards ?? 3, KEEP = o.keep ?? 2, careful = kind === "skilled";
  let legendOf: Map<string, number> | null = null;
  let qjob = null as QJob | null, questAgain = 0, questCount = 0, relicCount = 0, questTries = 0, relicTries = 0; // (tries, so a quest or relic that keeps failing doesn't eat the run)
  let rjob: { phase: "pick" | "place"; r?: { x: number; z: number; sx?: number; sz?: number; state: string }; since: number; n?: number } | null = null, relicAgain = 0;
  let feeding: { x: number; z: number; until: number } | null = null, feedAgain = 0, healing = false;
  let target: Target | null = null, pickAt = -1, landWave = -1, lastWave = 0, seenWave = 0, lastWoken: Cell | null = null, steps = 0;
  const parkedAt = new Set<string>();
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
        if (careful && c.species === sp && kin <= 1) continue;
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
        if (d > 900 || !inviteable(key, cell).length) continue;
        if (d < bs) { bs = d; best = { cell, key, x: s.x, z: s.z }; }
      }
      return best;
    };

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
    else if (careful && (healing || w.health.hp <= 1)) {
      // To the treetops to heal, then back to work.
      healing = w.health.hp < H;
      bot.doing = "healing in the treetops";
      // (a quest or relic trip that has brought her this low is given up: it costs more than it gives; another later)
      if (qjob) { qjob = null; questAgain = time + 60; }
      if (rjob?.phase === "pick") { rjob = null; relicAgain = time + 60; }
      if (b.mode === "ground" && healing) toggle = true;
    } else {
      const next = g.party.next[0], left = g.party.nextAt - time;
      const defending = careful && next && (left < 50 || (landWave === g.party.wave && time - lastWave < 60));
      if (defending) {
        const cell = left < 50 ? next : lastWoken ?? next, key = cellKey(cell), s = spot(cell);
        if (left < 50) landWave = g.party.wave + 1;
        const wave = left < 50 ? g.party.wave + 1 : g.party.wave;
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
          else if (!parkedAt.has(key) && st.length > KEEP) {
            // (not the creature a quest she's on wants: it goes to the top of the stack, out of the way)
            if (qjob && st[st.length - 1] === qjob.want.id && st.length > 1) st.unshift(st.pop()!);
            sigil = true; bot.doing = `posting guards at wave ${wave}`; if (w.leash.placed.filter(p => Math.hypot(p.x - s.x, p.z - s.z) < 40).length >= Math.min(GUARDS, st.length - KEEP)) parkedAt.add(key); }
          // Then hold the spot, kiting anything that comes for her.
          for (const c of g.creatures) if (c.enraged && !c.gone && Math.hypot(c.x - b.x, c.z - b.z) < 9) { const d = Math.hypot(c.x - b.x, c.z - b.z) || 1; mx = (b.x - c.x) / d; mz = (b.z - c.z) / d; dash = d < 5; bot.doing = `dodging ${article(c.species)} at wave ${wave}`; break; }
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
            else if (goTo(want.x, want.z, true)) { const td = Math.hypot(want.x - b.x, want.z - b.z); aimX = want.x - b.x; aimZ = want.z - b.z; fire = td < R * 0.95; mx = 0; mz = 0; if (td > R * 0.8) { mx = aimX / td; mz = aimZ / td; } }
          } else if (goTo(...spotBy(L), true, 4)) {
            const st = w.leash.stack, qi = st.indexOf(want.id);
            if (qi < 0) { qjob = null; questAgain = time + 10; }
            else { if (qi !== st.length - 1) st.push(st.splice(qi, 1)[0]); sigil = true; } // (cycling it to the bottom, as the sigil button does in the treetops)
          }
        }
      } else if (o.feed && careful && (feeding || (time >= feedAgain && w.leash.stack.filter(id => g.creatures[id].level < 2).length >= 3))) {
        // Feeding: her young ones to the nearest patch of ripe berries, and wait there while they eat.
        if (!feeding) {
          const B = g.berries, ripe = B.berries.filter(r => r.claimedBy === null).map(r => B.bushes[r.bush]);
          let best: { x: number; z: number } | null = null, bs = -Infinity;
          for (const p of ripe) {
            const d = Math.hypot(p.x - b.x, p.z - b.z); if (d > 500) continue;
            const n = ripe.filter(q => Math.hypot(q.x - p.x, q.z - p.z) < 10).length, sc = n * 60 - d;
            if (n >= 3 && sc > bs) { bs = sc; best = p; }
          }
          feeding = best ? { x: best.x, z: best.z, until: Infinity } : null;
          if (!feeding) feedAgain = time + 30;
        }
        bot.doing = "feeding the young ones berries";
        if (feeding && goTo(feeding.x, feeding.z, true)) {
          if (feeding.until === Infinity) feeding.until = time + 20; // (20 s among the bushes)
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
            aimX = tg.x - b.x; aimZ = tg.z - b.z; fire = td < R * 0.95;
            if (tg.species !== species(target.cell)) bot.doing = `inviting ${article(tg.species)}`;
            mx = 0; mz = 0;
            let th: Creature | null = null, hd = Infinity;
            for (const c of g.creatures) if (!c.gone && !c.leashed && !c.boss && c.level > 0 && cellKey(c.cell) === target.key) { const d = Math.hypot(c.x - b.x, c.z - b.z); if (d < hd) { hd = d; th = c; } }
            if (careful && th && hd < 9) { mx = (b.x - th.x) / hd; mz = (b.z - th.z) / hd; dash = hd < 5; }
            else if (td > R * 0.8) { mx = aimX / td; mz = aimZ / td; }
          }
        }
      }
    }
    // The novice (Ed, 2026-10-06: "most human players are much worse than the skilled bot (or even the crude bot)"):
    // the crude one's play, but firing only every other second, its aim wobbling a metre, and never blinking.
    if (kind === "novice") { fire = fire && Math.floor(time) % 2 === 0; aimX += Math.sin(time * 2.3); aimZ += Math.cos(time * 1.7); dash = false; }
    return { moveX: mx, moveZ: mz, toggleMode: toggle, zoom: 0, fire, aimX, aimZ, dash, sigil, place, castParty: g.party.spellAt === null };
  }
}
