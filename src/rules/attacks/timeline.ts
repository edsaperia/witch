// An attack's warning (Ed, 2026-10-27: "and on telegraphing"; docs/plans/attack-grammar.md): every attack and every child it spawns
// shows a telegraph before it can harm, and the time from the first warning that covers a harm to that harm must be at least the
// reaction floor, so even a randomised attack in the Fight Arena stays fair. Worked out here from the attack's own timings, through
// every child: the floor checked (readability), and an attack under it lengthened to it (liftToFloor: the windup of whichever part
// was short; a named child taken inline to do it).
import { childSpec, type Library } from "./parse";
import type { AttackSpec, BodyKind, Child, TelegraphKind } from "./types";

/** The least warning a harm may have (s): a dash's blink must be able to answer it. DECISION FOR ED. */
export const REACTION_FLOOR = 0.45;
/** An attack's own windup when it says none: a cast's, and a child's (a child released at once unless it winds up itself). */
export const WINDUP = 0.6;

/** Each body's own telegraph when an attack names none. */
export const TELEGRAPH_OF: Record<BodyKind, TelegraphKind> = {
  melee: "flash", bolt: "lane", lob: "landing", runner: "lane", beam: "beamLine", area: "ring", zone: "ring", mine: "arming", seed: "arming", lure: "lane",
};
export const telegraphKind = (a: AttackSpec): TelegraphKind => a.telegraph?.kind ?? TELEGRAPH_OF[a.body?.kind ?? "bolt"];

/** Does it harm (any damage, or an effect)? */
const harms = (a: AttackSpec) => (a.hit?.damage ?? 1) > 0 || !!(a.hit?.effect && Object.keys(a.hit.effect).length);

/** Its own warning (s), from its telegraph's start to its first harm: its windup (or the telegraph's lead, if that's shorter), then
 *  whatever more the body itself shows before it can harm (a lob's flight, a beam's charge, a mine's or seed's arming, a pattern's
 *  first delay). A bolt's flight isn't counted: point blank, it hits as it's released. */
export function ownWarning(a: AttackSpec, child: boolean): number {
  const windup = a.cast?.windup ?? (child ? 0 : WINDUP), lead = Math.min(windup, a.telegraph?.lead ?? windup);
  const kind = a.body?.kind ?? "bolt";
  const more = kind === "lob" ? (a.body?.flight ?? 1.2) : kind === "beam" ? (a.beam?.charge ?? 0) : kind === "mine" || kind === "seed" ? (a.body?.arm ?? 0) : kind === "area" ? (a.area?.delay ?? 0) : 0;
  return telegraphKind(a) === "none" ? more : lead + more;
}

const EVENTS = ["hit", "expire", "bounce", "land", "timer"] as const;

/** The least warning anywhere in an attack's tree (s) and where it is ("(attack)", "on.expire[0]"...); Infinity if nothing harms. */
export function readability(a: AttackSpec, lib: Library, child = false, where = "(attack)", depth = 0): { warning: number; where: string } {
  let best = { warning: harms(a) ? ownWarning(a, child) : Infinity, where };
  if (depth >= 4) return best;
  for (const ev of EVENTS) (a.on?.[ev] as (Child & { at?: number })[] | undefined)?.forEach((c, i) => {
    const r = readability(childSpec(c, lib), lib, true, `${where === "(attack)" ? "" : where + "."}on.${ev}[${i}]`, depth + 1);
    // (a timer's child shows its countdown from when its parent was released: its own warning plus the wait)
    const w = ev === "timer" ? r.warning + (c.at ?? 0) : r.warning;
    if (w < best.warning) best = { warning: w, where: r.where };
  });
  return best;
}

/** The attack with every part under the floor wound up longer to reach it (a named child taken inline to do it). */
export function liftToFloor(a: AttackSpec, lib: Library, floor = REACTION_FLOOR, child = false, depth = 0): AttackSpec {
  let out = a;
  if (harms(a) && ownWarning(a, child) < floor) {
    // (the windup grows by what's short, a telegraph with its own lead by as much, and one that said `none` shows the body's own)
    const short = floor - ownWarning(a, child), windup = (a.cast?.windup ?? (child ? 0 : WINDUP)) + short;
    let telegraph = a.telegraph;
    if (telegraph?.kind === "none") telegraph = { ...telegraph, kind: TELEGRAPH_OF[a.body?.kind ?? "bolt"] };
    if (telegraph?.lead !== undefined) telegraph = { ...telegraph, lead: round(telegraph.lead + short) };
    out = { ...a, cast: { ...a.cast, windup: round(windup) }, ...(telegraph ? { telegraph } : {}) };
  }
  if (!a.on || depth >= 4) return out;
  const on: NonNullable<AttackSpec["on"]> = {};
  for (const ev of EVENTS) {
    const list = a.on[ev] as (Child & { at?: number })[] | undefined;
    if (!list) continue;
    (on as Record<string, Child[]>)[ev] = list.map(c => {
      const spec = childSpec(c, lib), give = ev === "timer" ? (c.at ?? 0) : 0; // (a timer's wait counts toward its warning)
      const lifted = liftToFloor(spec, lib, Math.max(0, floor - give), true, depth + 1);
      return lifted === spec ? c : { ...c, attack: lifted };
    });
  }
  return { ...out, on };
}

const round = (x: number) => Math.round(x * 1000) / 1000;
