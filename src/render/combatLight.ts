// Her light in the wild and in a fight (Ed, 2026-10-07: the wild forest darker for exploring; a darker forest makes a fight
// harder to read, so her light rises during one and settles after, too slowly to notice as an effect). Two eases, each moving
// at most a set rate toward its target and shaped smooth (no start or stop to catch the eye): how wild it is where she is (an
// area the party hasn't reached), and how much of a fight is near her (any blow, wind-up or shot within reach, lately).
// Drawing only: the rules don't know.
import { cellKey } from "../rules/party";
import type { Game } from "../rules/game";
import type { Tuning } from "../rules/tuning";

type CombatLightTuning = NonNullable<Tuning["combatLight"]>;

/** The combat events that mean a fight is on (not a soundsystem's, nor a creature fleeing or falling asleep). */
const FIGHT = new Set(["hit", "windup", "shot", "quake", "beam", "charged", "sprung", "leapt", "slammed", "nova", "rush", "witchHit"]);

export class CombatLight {
  /** Eased 0..1: in the wild (0 on party ground). */
  wild = 0;
  /** Eased 0..1: a fight near her. */
  fight = 0;
  /** Her reach when ?glow= fixes it (set once; it isn't worked out each frame). */
  fixedReach: number | undefined;
  private lastFight = -Infinity;
  private at = -1;
  private areaAt = -Infinity;
  private wildNow = 0;

  /** Advance by the game's clock (seconds of play: paused with it, the same frame by frame in a test). */
  update(g: Game, C: CombatLightTuning, ht: number): void {
    const dt = this.at < 0 ? 0 : Math.min(0.25, Math.max(0, ht - this.at));
    this.at = ht;
    const w = g.witch;
    for (const e of g.combat.events) if (FIGHT.has(e.kind) && Math.abs(e.x - w.x) < C.range && Math.abs(e.z - w.z) < C.range && Math.hypot(e.x - w.x, e.z - w.z) < C.range) { this.lastFight = ht; break; }
    if (ht - this.areaAt > 0.25) { this.areaAt = ht; this.wildNow = g.party.areas.has(cellKey(g.map.areaAt(w.x, w.z).cell)) ? 0 : 1; } // (four times a second)
    const toward = (v: number, target: number, up: number, down: number) => v + Math.max(-dt / Math.max(0.01, down), Math.min(dt / Math.max(0.01, up), target - v));
    this.fight = toward(this.fight, ht - this.lastFight < C.hold ? 1 : 0, C.rise, C.fall);
    this.wild = toward(this.wild, this.wildNow, C.fall, C.fall);
  }

  /** Her light's reach and strength, as factors on what they'd be: dimmer exploring the wild, back up (and a little more) in a fight. */
  factors(C: CombatLightTuning): { reach: number; glow: number } {
    const s = (x: number) => x * x * (3 - 2 * x), f = s(this.fight), wild = s(this.wild) * (1 - f);
    return { reach: (1 + (C.wildReach - 1) * wild) * (1 + (C.fightReach - 1) * f), glow: (1 + (C.wildGlow - 1) * wild) * (1 + (C.fightGlow - 1) * f) };
  }
}
