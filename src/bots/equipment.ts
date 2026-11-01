import type { Controls } from "../rules/game";
import type { Observation } from "./observe";

/** Use the equipped public HUD spell, without choosing/unlocking loadout parts. */
export function useBroom(o: Observation, controls: Controls): void {
  const gear = o.campaign?.equipment;
  if (!gear?.ready || o.self.ko) return;
  const near = o.creatures.filter(a => !a.boss && !a.friendly && !a.rune && a.level > 0 && Math.hypot(a.x - o.self.x, a.z - o.self.z) < 15);
  const moving = Math.hypot(controls.moveX, controls.moveZ) > 0.5;
  if (gear.broom === "speed" && moving && o.next && Math.hypot(o.next.x - o.self.x, o.next.z - o.self.z) > 80) controls.spell = true;
  if (gear.broom === "stealth" && moving && o.self.hp <= 2 && near.length) controls.spell = true;
  if (gear.broom === "pound" && o.self.mode === "ground" && near.length >= 2) controls.spell = true;
  if (gear.broom === "battering" && o.self.mode === "ground" && controls.dash && near.length) controls.spell = true;
}
