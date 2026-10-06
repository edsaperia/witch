// The beach round the circular map, drawn (Ed, 2026-10-06; rules/beach.ts, rules/mapShape.ts beachOf):
// the ground shader's sand and sea switched on, the witches on the beach, and her lying on the sand
// stargazing. An Easter egg most runs never find, so nothing of it exists until she comes within the
// tuning's beach.shown metres of the sand, and it is all let go again when she leaves: in an ordinary
// run it costs one distance check a frame.
import type * as THREE from "three";
import type { Game } from "../rules/game";
import { beachOf, type Beach } from "../rules/mapShape";
import type { AssetLibrary } from "./assets";
import type { Ground } from "./ground";
import { PartyWitchView } from "./partyWitches";

export class BeachView {
  private at: { map: Game["map"]; beach: Beach | null } | null = null;
  private witches: PartyWitchView | null = null;
  /** Whether the beach is showing (she's near). */
  on = false;

  constructor(private scene: THREE.Scene, private assets: AssetLibrary, private ground: Ground, private mpp: number, private light: { lightFloor: number; lightTint: number; lightRim: number }) {}

  /** Each frame; true while she's drawn here (lying on the sand, or with a beach witch), so the view leaves her out. */
  update(g: Game, time: number, visible: (x: number, z: number, w: number, h: number) => boolean, camera: THREE.Camera, width: number, height: number): boolean {
    if (this.at?.map !== g.map) { this.leave(); this.at = { map: g.map, beach: beachOf(g.map.bounds, g.tuning) }; }
    const b = this.at.beach, w = g.witch;
    if (!b) return false;
    if (b.intoSand(w.x, w.z) < -(g.tuning.beach?.shown ?? 0)) { this.leave(); return false; }
    if (!this.on) { this.on = true; this.ground.setBeach(b); this.assets.partyWitchArt(null); } // (her lying-down art asked for ahead)
    const I = g.beach?.players[0], her = I?.activity ? I : w.stargazing ? { activity: "rest" as const, pose: "stargaze", facing: w.facing } : null;
    if (!g.beach?.list.length && !her && !this.witches) return false;
    const v = (this.witches ??= new PartyWitchView(this.scene, this.assets, this.mpp, this.light)), list = g.beach?.list ?? [];
    v.update(g, time, visible, { list, her });
    v.bubbles(g, time, camera, width, height, list);
    return v.herIdle;
  }

  /** She's gone from the beach: the sand and sea off, the witches' sprites let go. */
  private leave(): void {
    if (!this.on) return;
    this.on = false;
    this.ground.setBeach(null);
    this.witches?.dispose();
    this.witches = null;
  }
}
