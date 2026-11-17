// Openings and a Guard's shield, drawn (?skill=1, ?commands=1; docs/plans/combat-skill-and-commands.md, Readability). An open wild
// creature (sitting after an attack, staggered, dazed, or winding up where letters wear its poise faster: rules/skill/openings.ts) has
// amber glints on its body, brighter the more open it is (Ed, 2026-11-17: "a glint or outline on the creature's sprite"); amber is
// her magic's warm colour, an opportunity for her, never a warning's red or an element's. A Guard's shield is an amber ring round her.
import type { LeashView } from "../leash";
import { AMBER } from "./glyphs";
import { openness } from "../../rules/skill/openings";

/** How far from her (m, each way) open creatures glint. */
const NEAR = 60;

export function drawSkillFx(lv: LeashView, time: number): void {
  const g = lv.game, t = g.tuning;
  if (!t.skill?.on && !t.commands?.on) return;
  const dot = lv.uv(0), w = g.witch, now = g.clock.time, [r, gg, b] = AMBER;
  if (t.skill?.on) for (const c of g.creatures) {
    if (Math.abs(c.x - w.x) > NEAR || Math.abs(c.z - w.z) > NEAR) continue;
    const o = openness(c, now, t);
    if (o <= 0) continue;
    const top = lv.tops.get(c.id) ?? 1.2, rad = 0.45 + 0.25 * c.level;
    for (let i = 0; i < 6; i++) {
      const a = time * 2.4 + (i / 6) * Math.PI * 2 + c.id, tw = 0.5 + 0.5 * Math.sin(time * 9 + i * 1.7 + c.id);
      lv.standing.add(c.x + Math.cos(a) * rad, top * (0.3 + 0.12 * i), c.z + Math.sin(a) * rad * 0.6, 0.16 + 0.14 * o, dot, r * 1.2, gg * 1.2, b * 1.2, o * (0.35 + 0.65 * tw));
    }
  }
  if (t.commands?.on) for (const W of g.witches) {
    const S = W.leash.cmd?.shield;
    if (!S || now >= S.until || S.blows <= 0) continue;
    const k = 0.6 + 0.4 * Math.sin(time * 5), x = W.body.x, z = W.body.z;
    for (let i = 0; i < 18; i++) { const a = (i / 18) * Math.PI * 2 + time * 0.8; lv.standing.add(x + Math.cos(a) * 1.3, 0.9 + 0.25 * Math.sin(a * 3 + time * 3), z + Math.sin(a) * 1.3 * 0.6, 0.18, dot, r, gg, b, k); }
  }
}
