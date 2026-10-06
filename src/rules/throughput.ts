// 💌 throughput under legend buffs (Ed, 2026-10-05, issue #87): buffs give more letters or change
// how they fly, never a stronger letter. Every letter that lands counts in the game (the per-animal gap went,
// Ed 2026-10-06); the model keeps a gap (`perAnimalHitGap`, 0: none) to try one out. A
// model of how many hits a second she lands on a crowd of n invitable animals, for the balance
// simulator (rules/states.ts) and tools/balance/buffs.mjs. The firing numbers are the tuning's
// `invites` (PR #89); what each buff does to them is a guess from its one-line effect, here.

/** The firing numbers (config/tuning.json `invites`, PR #89). */
export interface InviteFire { burst: number; burstGap: number; cooldown: number; multiShot: number; hits: number[]; perAnimalHitGap: number }
export const INVITE_FIRE: InviteFire = { burst: 3, burstGap: 0.12, cooldown: 0.6, multiShot: 1, hits: [3, 6, 12, 24], perAnimalHitGap: 0 };

/** The 💌 buffs (Ed's table on #87; movement buffs below). */
export const SHOT_BUFFS = ["flutter", "fan", "rearGuard", "howl", "windUp", "echo", "quickFire", "strike", "longThread", "bigHeart", "charm", "pierce", "skimming", "spawn", "spiral", "slipPast", "lanterns", "cache", "orbit"] as const;
export const MOVE_BUFFS = ["dash", "flit", "curl", "momentum", "frenzy", "decoy", "scamper", "poise", "steady", "wings", "burrow"] as const;
export type Buff = (typeof SHOT_BUFFS)[number] | (typeof MOVE_BUFFS)[number];

/** Limits a designer might add (the REPORT's tests): each buff's effect counts at most `stack`
 *  times (buffs stack: a second copy of Fan is a 9-way spread), and her hits a second in all are
 *  capped at `maxRate` (a "hearts in flight" limit); either off by default. */
export interface Limits { gap?: number; stack?: number; maxRate?: number; /** At most this many animals take her letters at once. */ maxTargets?: number }

export interface Throughput {
  /** Letters a second, the share that land, the extra hits each landed letter makes in a crowd
   *  (pierce, ricochet, spawn...), and how many animals at once they can reach. */
  letters: number; land: number; perLetter: number; cover: number;
  /** Hits a second on a crowd of n (the per-animal gap and any cap applied), aiming `skill` times as well. */
  rate: (n: number, skill?: number) => number;
  gap: number;
}

/** A build's throughput. `buffs` may repeat a buff (stacked copies); `aim` is the share of plain
 *  letters that land with no aiming buff (a guess: 0.6). */
export function throughput(buffs: readonly Buff[], f: InviteFire = INVITE_FIRE, lim: Limits = {}, aim = 0.6): Throughput {
  const count = (b: Buff) => Math.min(buffs.filter(x => x === b).length, lim.stack ?? Infinity);
  const gap = lim.gap ?? f.perAnimalHitGap;
  // Letters a burst and bursts a second.
  const volleys = f.burst + count("flutter");
  const fan = Math.pow(3, count("fan")); // each shot a 3-way spread (stacked: 9, 27...)
  let perBurst = volleys * f.multiShot * fan + count("rearGuard") * 0.3; // (behind her: lands on a crowd's stragglers a third as often)
  perBurst += count("howl") * (12 / 5); // every 5th burst a ring of 12
  const cycle = (volleys - 1) * f.burstGap + f.cooldown * Math.pow(0.5, count("quickFire"));
  let letters = (perBurst / cycle) * Math.pow(2, count("echo")) * (1 + 0.2 * count("windUp")); // (wind-up: a charged volley, a little more a second)
  letters += count("orbit") * 2 * 0.5 + count("cache") * 0.3; // (the orbiting and waiting letters, roughly)
  // The share that land: homing and bigger letters land more.
  const land = Math.min(0.95, aim + 0.25 * count("charm") + 0.1 * count("bigHeart") + 0.05 * count("strike") + 0.05 * count("longThread"));
  // A landed letter's extra hits on others nearby (only in a crowd).
  const perLetter = (1 + 0.6 * count("pierce")) * (1 + 0.7 * count("skimming")) * (1 + 1.5 * count("spawn")) * (1 + 0.3 * count("spiral")) * (1 + 0.2 * count("lanterns"));
  // How many animals at once: a plain aimed stream reaches one or two; spreads, rings and splits reach more.
  const cover = 1.5 * fan + count("howl") * 12 + count("pierce") + count("skimming") + 2 * count("spawn") + 0.5 * (count("rearGuard") + count("spiral") + count("lanterns") + count("orbit"));
  const rate = (n: number, skill = 1) => {
    const reach = Math.min(n, cover, lim.maxTargets ?? Infinity), raw = letters * Math.min(1, land * skill) * (n > 1 ? perLetter : 1);
    return Math.min(raw, reach / gap, lim.maxRate ?? Infinity);
  };
  return { letters, land, perLetter, cover, rate, gap };
}

/** Seconds to fill a crowd's meters (one hits value each): her hits a second spread over them, but
 *  none faster than one letter a gap. `skill` scales how many of her letters land, not the gap. */
export function crowdTime(hits: readonly number[], t: Throughput, skill = 1): number {
  if (!hits.length) return 0;
  const sum = hits.reduce((a, b) => a + b, 0), most = Math.max(...hits);
  return Math.max(sum / Math.max(1e-9, t.rate(hits.length, skill)), (most - 1) * t.gap);
}

/** Her movement buffs, as multipliers on the state model's times: treetop speed, landing, and the walk to each crowd. */
export function movement(buffs: readonly Buff[]): { treetop: number; land: number; approach: number } {
  const has = (b: Buff) => buffs.includes(b);
  return { treetop: has("wings") ? 1.3 : 1, land: has("burrow") ? 0.5 : 1, approach: (has("scamper") ? 0.75 : 1) * (has("dash") || has("flit") || has("momentum") ? 0.85 : 1) };
}
