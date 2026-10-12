// The hats' spells that reach into the game (Ed, 2026-10-11; rules/spells.ts has the loadout): what a hat does when she puts
// it down (the sigil button held, rules/hat.ts putHat) or picks it up again, and while it lies there. Harvest grows a ring of
// berries round it (rules/berries.ts growRing); Dowsing points to the nearest relic for a while; Sentry and Slingshot throw
// 💌s from it (rules/invites.ts HatLetters); Gathering, picked up again, brings her sigils within its range back to her stack.
// No drawing here.
import type { Game, Witch } from "./game";
import type { Tuning } from "./tuning";
import type { HatLetters } from "./invites";
import { growRing } from "./berries";
import type { SpellState } from "./spells";

/** Her hat, put down at (x, z) this step: Harvest's ring grows (at most once every harvest.every seconds), Dowsing picks the
 *  nearest relic still to find. */
export function onHatPut(g: Game, W: Witch, x: number, z: number, time: number, t: Tuning): void {
  const S = W.spells;
  if (S.hat === "harvest") {
    const H = t.spells.harvest;
    if (H && (S.harvestAt === undefined || time - S.harvestAt >= H.every)) { growRing(g.berries, x, z, H.berries, H.radius, g.clock.time); S.harvestAt = time; }
  } else if (S.hat === "dowsing") {
    const D = t.spells.dowsing;
    let best = -1, bd = Infinity;
    for (const r of g.relics) {
      if (r.state !== "lying" && r.state !== "dropped") continue;
      const d = Math.hypot(r.sx - x, r.sz - z);
      if (d < bd) { bd = d; best = r.id; }
    }
    S.dowse = best >= 0 && D ? { relic: best, until: time + D.time } : undefined;
  }
}

/** Her hat, picked up again from (x, z) this step: the Gathering hat brings every sigil of hers lying within gathering.range of
 *  it back to her stack (Ed, 2026-10-11: "all sigils in range"), the nearest last (at the bottom). Returns their ids. */
export function onHatPicked(g: Game, W: Witch, x: number, z: number, time: number, t: Tuning): number[] {
  if (W.spells.hat !== "gathering" || !t.spells.gathering) return [];
  const R = t.spells.gathering.range, s = W.leash;
  const near = s.placed.filter(p => !g.creatures[p.id]?.gone && Math.hypot(p.x - x, p.z - z) <= R).sort((a, b) => Math.hypot(b.x - x, b.z - z) - Math.hypot(a.x - x, a.z - z));
  for (const p of near) {
    s.placed.splice(s.placed.indexOf(p), 1);
    s.stack.push(p.id);
    s.events.push({ kind: "picked", id: p.id, x: p.x, z: p.z, at: time });
  }
  return near.map(p => p.id);
}

/** What her hat throws, lying at `down` (rules/invites.ts): the Sentry's and the Slingshot's numbers; undefined for any other. */
export function hatLetters(s: SpellState, down: { x: number; z: number } | null, t: Tuning): HatLetters | undefined {
  if (!down) return undefined;
  if (s.hat === "sentry" && t.spells.sentry) return { x: down.x, z: down.z, sentry: t.spells.sentry };
  if (s.hat === "slingshot" && t.spells.slingshot) return { x: down.x, z: down.z, sling: t.spells.slingshot };
  return undefined;
}

/** Where the Dowsing hat's pointer leads now: the relic's sigil while it's still to be found and the spell lasts; else null. */
export function dowseMarker(g: Game, s: SpellState, time: number): { x: number; z: number } | null {
  const D = s.dowse;
  if (!D || time >= D.until) return null;
  const r = g.relics[D.relic];
  return r && (r.state === "lying" || r.state === "dropped") ? { x: r.sx, z: r.sz } : null;
}
