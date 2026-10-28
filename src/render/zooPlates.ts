// The zoo's nameplates (?zoo; rules/zoo.ts; Ed, 2026-10-13: "they have nameplates and descriptions under each"): a small sign on
// the path under each block (its south edge, so it faces the camera, which always looks north), for the blocks near her: its
// creature's name, its area's and its row's and the area's own line (art/areas.js layout.feel); a block of a kind not yet designed,
// a "?". DOM over the game, as the legend circle's explainer. (No legend's boon line: legends give no boons since Ed's change of
// 2026-10-18, legend buffs removed 2026-10-28.)
import { blockFront } from "../rules/zooControls";
import * as THREE from "three";
import { SPECIES_BY_ID } from "../../art/generator.js";
import { AREA_TYPES } from "../rules/map";
import { placed } from "./height";
import type { Game } from "../rules/game";
import type { ZooBlock } from "../rules/zoo";

/** How near (m) a block's plate is shown: on the ground, and over the treetops. */
const NEAR = { ground: 150, treetop: 300 };
const MAX = 14;

export class ZooPlates {
  private plates = new Map<string, HTMLElement>();
  private v = new THREE.Vector3();
  constructor(private host: HTMLElement) {}
  /** Its plates taken off the page (another night's map). */
  dispose(): void { for (const el of this.plates.values()) el.remove(); this.plates.clear(); }

  private make(b: ZooBlock): HTMLElement {
    const el = document.createElement("div"), area = b.area ? AREA_TYPES.find(a => a.id === b.area) : undefined;
    el.className = "zoo-plate";
    const line = (cls: string, text: string) => { const p = document.createElement("p"); p.className = cls; p.textContent = text; return p; };
    if (!area) el.append(line("name", "?"), line("where", `Not designed yet · ${b.row}`));
    else {
      const name = (SPECIES_BY_ID as Record<string, { name?: string }>)[area.creature]?.name ?? area.creature;
      el.append(line("name", name), line("where", `${area.name} · ${b.row}`));
      if (area.layout.feel) el.append(line("feel", area.layout.feel));
    }
    this.host.append(el);
    return el;
  }

  /** Each frame: the plates of the blocks near her, where they stand on screen. */
  draw(g: Game, camera: THREE.Camera, width: number, height: number): void {
    const Z = g.map.zoo;
    if (!Z) return;
    if (Z.layout) { for (const el of this.plates.values()) el.style.display = "none"; return; } // (laid out like the chart, its words are in the street: render/zooInscriptions.ts)
    const A = g.map.areaSize, w = g.witch, reach = w.lift > 0.5 ? NEAR.treetop : NEAR.ground;
    const near = Z.blocks.filter(b => b.found !== false).map(b => ({ b, ...(Z.layout ? blockFront(g.map, b) : { x: (b.cell[0] + 0.5) * A, z: (b.cell[1] + 1) * A - 6 }) })).map(p => ({ ...p, d: Math.hypot(p.x - w.x, p.z - w.z) }))
      .filter(p => p.d < reach).sort((p, q) => p.d - q.d).slice(0, MAX);
    const shown = new Set<string>();
    for (const p of near) {
      const k = `${p.b.cell[0]},${p.b.cell[1]}`;
      let el = this.plates.get(k);
      if (!el) { el = this.make(p.b); this.plates.set(k, el); }
      placed(this.v.set(p.x, 0.5, p.z)).project(camera);
      if (this.v.z > 1 || Math.abs(this.v.x) > 1.3 || Math.abs(this.v.y) > 1.3) continue;
      shown.add(k);
      el.style.display = "";
      el.style.transform = `translate(${(((this.v.x + 1) / 2) * width).toFixed(1)}px, ${(((1 - this.v.y) / 2) * height).toFixed(1)}px) translate(-50%, 0)`;
      el.style.opacity = String(Math.max(0.25, Math.min(1, (reach - p.d) / (reach * 0.3))));
    }
    for (const [k, el] of this.plates) if (!shown.has(k)) el.style.display = "none";
  }
}
