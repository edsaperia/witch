import * as THREE from "three";
import type { Game } from "../rules/game";
import type { Creature } from "../rules/creatures";
import { observedPackPlans, type Directive } from "../rules/combat/packs";
import { potionSettings } from "../rules/potionSettings";
import { bendPoint, groundHeight } from "./height";
import type { View } from "./view";

type Point = { x: number; z: number };
const roleColour = { lunger: 0xff7766, shooter: 0xffce59, special: 0xec88ff, hold: 0x74caff, hurt: 0xaaaaff };
type Path = (end: Point, colour: number, marker: "slot" | "aim" | "arrow") => void;

/** Show current intentions, including the difference between a moving target
 * and the point at which an already committed attack will land. */
export function animalPlan(g: Game, c: Creature, plan: Directive | undefined, path: Path): void {
  if (c.gone) return;
  const f = c.fight, t = f?.target;
  const target = t?.kind === "witch" ? g.witches[t.id]?.body : t?.kind === "creature" ? g.creatures[t.id] : t?.kind === "sound" ? g.combat.sounds.get(t.key) : null;
  if (target) path(target, plan ? roleColour[plan.role] : 0xe8bb76, "arrow");
  if (plan?.slot) path(plan.slot, roleColour[plan.role], "slot");
  const leap = c.leap ?? c.hop;
  if (leap) path({ x: leap.tx, z: leap.tz }, 0xff97fa, "aim");
  else if (c.charge && !c.charge.braking) {
    const d = c.charge.speed * Math.max(0, c.charge.until - Math.max(g.clock.time, c.charge.from ?? g.clock.time));
    path({ x: c.x + c.charge.dx * d, z: c.z + c.charge.dz * d }, 0xff635e, "aim");
  } else if (f?.lunge) path({ x: c.x + f.lunge.dx * f.lunge.left, z: c.z + f.lunge.dz * f.lunge.left }, 0xff635e, "aim");
  else if (f && f.windupUntil > g.clock.time) path({ x: f.aimX, z: f.aimZ }, 0xff635e, "aim");
  else if (!target && !plan?.slot && c.fleeX !== undefined && c.fleeZ !== undefined) path({ x: c.fleeX, z: c.fleeZ }, 0xa8e9db, "arrow");
  else if (!target && !plan?.slot && c.rest <= 0 && c.state === "wild") path({ x: c.tx, z: c.tz }, 0x72f4db, "arrow");
}

export class MasterplanView {
  private lines = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthTest: false, depthWrite: false }));
  private positions: number[] = [];
  private colours: number[] = [];
  private point = new THREE.Vector3();
  private colour = new THREE.Color();
  constructor(private view: View) {
    this.lines.name = "Masterplan";
    this.lines.frustumCulled = false;
    this.lines.renderOrder = 25;
    view.scene.add(this.lines);
    observedPackPlans.set(view.game.combat, null);
  }
  dispose(): void {
    observedPackPlans.delete(this.view.game.combat);
    this.lines.removeFromParent(); this.lines.geometry.dispose(); this.lines.material.dispose();
  }
  private vertex(x: number, z: number): void {
    const p = bendPoint(this.point.set(x, groundHeight(x, z) + .25, z));
    this.positions.push(p.x, p.y, p.z);
    this.colours.push(this.colour.r, this.colour.g, this.colour.b);
  }
  update(amount: number): void {
    const g = this.view.game, settings = potionSettings("masterplan"), range = settings.range;
    this.positions.length = this.colours.length = 0;
    const plans = observedPackPlans.get(g.combat);
    for (const c of g.creatures) {
      if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) > range) continue;
      animalPlan(g, c, plans?.get(c.id), (end, colour, marker) => {
        const dx = end.x - c.x, dz = end.z - c.z, distance = Math.hypot(dx, dz);
        if (!(distance > .15)) return;
        this.colour.setHex(colour);
        const length = Math.min(distance, range), ux = dx / distance, uz = dz / distance;
        const steps = Math.ceil(length / 4);
        for (let i = 0; i < steps; i++) {
          this.vertex(c.x + ux * length * i / steps, c.z + uz * length * i / steps);
          this.vertex(c.x + ux * length * (i + 1) / steps, c.z + uz * length * (i + 1) / steps);
        }
        if (distance > range) return;
        if (marker === "arrow") {
          for (const side of [-1, 1]) {
            this.vertex(end.x, end.z); this.vertex(end.x - ux + side * uz * .5, end.z - uz - side * ux * .5);
          }
        } else {
          const sides = marker === "slot" ? 4 : 12;
          for (let i = 0; i < sides; i++) for (const j of [i, i + 1]) {
            const a = j * Math.PI * 2 / sides;
            this.vertex(end.x + Math.cos(a), end.z + Math.sin(a));
          }
        }
      });
    }
    const n = this.positions.length, geo = this.lines.geometry;
    if (n && (!geo.hasAttribute("position") || geo.getAttribute("position").array.length < n)) {
      geo.dispose();
      for (const key of ["position", "color"]) geo.setAttribute(key, new THREE.Float32BufferAttribute(new Float32Array(2 * n), 3).setUsage(THREE.DynamicDrawUsage));
    }
    if (n) for (const [key, values] of [["position", this.positions], ["color", this.colours]] as const) {
      const a = geo.getAttribute(key) as THREE.BufferAttribute;
      a.array.set(values); a.clearUpdateRanges(); a.addUpdateRange(0, n); a.needsUpdate = true;
    }
    geo.setDrawRange(0, n / 3);
    this.lines.material.opacity = amount * settings.opacity;
  }
}
