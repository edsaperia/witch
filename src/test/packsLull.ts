// Test fixtures only. Pack combat's lull is a retreat, not a halt (Ed's playtests, 2026-10-23: "lulls between pack attacks seem to have the animals
// stand still instead of retreat"), split out of packs.test.ts so the test shards run its halves side by side (packsLull1/2.test.ts):
// one 30 s arena per kind, a third of that file's time. The check itself is unchanged.
import { setupArena } from "../rules/arena";
import { newGame, stepGame, STEP, type Controls, type Game } from "../rules/game";
import { TUNING, withTuning } from "../rules/tuning";
import { PACKS } from "../rules/combat/packs";
import { FIGHT, profileOf } from "../rules/movement";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const ON = withTuning({ combat: { ...TUNING.combat, packs: { on: true } } });
/** As packs.test.ts's: a pack of the kind against her, the switch on, her health held; then `secs` of play, `each` step. */
function arena(spec: string, secs: number, each?: (g: Game) => void, t = ON, seed = 5): Game {
  const g = newGame(seed, t);
  g.clock.paused = false; g.party.paused = true;
  setupArena(g, spec);
  for (let i = 0; i < secs / STEP; i++) { g.witches[0].health.hp = 1e6; stepGame(g, idle, STEP); each?.(g); }
  return g;
}
const wildPack = (g: Game) => [...(g.combat.packs?.values() ?? [])].find(s => !s.hers);

/** Every kind, split into `parts` near-equal halves by cost (a freeze kind runs two arenas): part `index` of them. */
export function lullKinds(index: number, parts: number): string[] {
  const load = Array.from({ length: parts }, () => 0), out: string[][] = Array.from({ length: parts }, () => []);
  for (const k of Object.keys(PACKS.kinds)) {
    const i = load.indexOf(Math.min(...load));
    out[i].push(k); load[i] += PACKS.kinds[k].retreat === "freeze" ? 2 : 1;
  }
  return out[index];
}

/** The kinds (of those given) whose lull isn't a retreat, with why. */
export function lullFailures(kinds: string[]): string[] {
  const standing = (k: string) => !!PACKS.retreats[PACKS.kinds[k].retreat].still;
  const bad: string[] = [];
  for (const k of kinds) {
    if (standing(k)) continue;
    let steps = 0, still = 0, starts = 0, backed = 0, last = "";
    const mv = profileOf(k)?.move, out = mv?.kind === "swoop" ? mv.radius ?? 0 : PACKS.retreats[PACKS.kinds[k].retreat].out; // (a wild flyer circles aloft at its swoop's own radius)
    const away = out * FIGHT.scale * 0.8 * (PACKS.kinds[k].retreat === "leapfrog" ? 0.5 : 1); // (the leapfrog's near half falls back half as far)
    const off = (d0: number, most = 0) => most > d0 + 1 || d0 >= away; // (backed off, or out there already: a shooter at range, a flyer aloft)
    const startD = new Map<number, number>(), most = new Map<number, number>();
    // (a freeze over two arenas: how long one holds its place depends on where the fight takes it, and one arena's share swings
    // either side of the 3% line with anything near it, as much as 4.2 to 2.3% on seed 5 for the creatures keeping off sigils, 2026-10-28)
    for (const seed of PACKS.kinds[k].retreat === "freeze" ? [5, 6] : [5]) arena(`pack-${k}`, 30, g => {
      const st = wildPack(g), W = g.witches[0].body;
      if (!st) return;
      if (st.phase === "lull" && last !== "lull") { for (const [id, d0] of startD) { starts++; if (off(d0, most.get(id))) backed++; } startD.clear(); most.clear(); }
      last = st.phase;
      if (st.phase !== "lull") return;
      for (const id of st.members) {
        const c = g.creatures[id]; if (!c || c.packHide || c.burrow || c.leap || c.charge) continue;
        const d = Math.hypot(c.x - W.x, c.z - W.z);
        if (!startD.has(id)) startD.set(id, d); most.set(id, Math.max(most.get(id) ?? 0, d));
        steps++; if (!c.moving && !(c.hopNext !== undefined && g.clock.time < c.hopNext)) still++; // (a hopper's beat on the ground between bounds is its gait, not standing: Ed, 2026-10-29)
      }
    }, ON, seed);
    for (const [id, d0] of startD) { starts++; if (off(d0, most.get(id))) backed++; }
    if (!steps) { bad.push(`${k}: no lull`); continue; }
    if (still / steps > (PACKS.kinds[k].retreat === "freeze" ? PACKS.prowl.freeze + 0.1 : 0.1)) bad.push(`${k}: standing ${(100 * still / steps).toFixed(0)}% of its lull`);
    if (backed < starts * 0.6) bad.push(`${k}: ${backed} of ${starts} backed off`);
    if (PACKS.kinds[k].retreat === "freeze" && still / steps < 0.03) bad.push(`${k}: no freeze (still ${(100 * still / steps).toFixed(0)}%)`);
  }
  return bad;
}
