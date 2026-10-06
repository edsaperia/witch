// The beach round the circular map, drawn (Ed, 2026-10-06; rules/beach.ts, rules/mapShape.ts beachOf):
// the ground shader's sand and sea switched on, the witches on the beach, and her lying on the sand
// stargazing. An Easter egg most runs never find, so nothing of it exists until she comes within the
// tuning's beach.shown metres of the sand, and it is all let go again when she leaves: in an ordinary
// run it costs one distance check a frame.
import * as THREE from "three";
import type { Game } from "../rules/game";
import { beachOf, type Beach } from "../rules/mapShape";
import type { AssetLibrary } from "./assets";
import type { Ground } from "./ground";
import { PartyWitchView } from "./partyWitches";
import { pixelEmoji } from "./invites";
import { groundHeight, placed } from "./height";

/** A heart rising off the two of them stargazing together: where it set off, when, its sway's phase; its image (pooled). */
interface Heart { x: number; z: number; at: number; sway: number; el: HTMLImageElement }

export class BeachView {
  private at: { map: Game["map"]; beach: Beach | null } | null = null;
  private witches: PartyWitchView | null = null;
  /** Whether the beach is showing (she's near). */
  on = false;
  /** Whether she's lying down stargazing now (alone or with a beach witch): the view bends the world for the sky. */
  gazing = false;
  /** Little ❤️s (Ed, 2026-10-06: "If you land near another witch, and you stargaze together, and you wait a few seconds, little
   *  hearts will start appearing near you both, floating upwards and disappearing"): since when the two have lain together, the
   *  next heart's time, whose turn, the hearts rising, and spare images. */
  private together = -1;
  private nextHeart = 0;
  private turn = 0;
  private hearts: Heart[] = [];
  private spare: HTMLImageElement[] = [];
  private v = new THREE.Vector3();

  constructor(private scene: THREE.Scene, private assets: AssetLibrary, private ground: Ground, private mpp: number, private light: { lightFloor: number; lightTint: number; lightRim: number }) {}

  /** Each frame; true while she's drawn here (lying on the sand, or with a beach witch), so the view leaves her out. */
  update(g: Game, time: number, visible: (x: number, z: number, w: number, h: number) => boolean, camera: THREE.Camera, width: number, height: number): boolean {
    if (this.at?.map !== g.map) { this.leave(); this.at = { map: g.map, beach: beachOf(g.map.bounds, g.tuning) }; }
    const b = this.at.beach, w = g.witch;
    if (!b) return false;
    if (b.intoSand(w.x, w.z) < -(g.tuning.beach?.shown ?? 0)) { this.leave(); this.gazing = false; return false; }
    if (!this.on) { this.on = true; this.ground.setBeach(b); this.assets.partyWitchArt(null); } // (her lying-down art asked for ahead)
    // The spot she's nearest (they're kilometres apart round the coast, so only ever one in view).
    let spot = null as NonNullable<Game["beach"]>[number] | null, sd = Infinity;
    for (const s of g.beach ?? []) { const d = (s.x - w.x) ** 2 + (s.z - w.z) ** 2; if (d < sd) { sd = d; spot = s; } }
    const I = spot?.players[0], her = I?.activity ? I : w.stargazing ? { activity: "rest" as const, pose: "stargaze", facing: w.facing } : null;
    this.gazing = her?.pose === "stargaze" && w.mode === "ground";
    const mate = I?.pose === "stargaze" && I.partner !== null ? spot?.list.find(q => q.id === I.partner && q.partner !== null && q.pose === "stargaze") : undefined;
    this.heartsFor(g, time, camera, width, height, mate ? [{ x: w.x, z: w.z }, { x: mate.x, z: mate.z }] : null);
    if (!spot?.list.length && !her && !this.witches) return false;
    const v = (this.witches ??= new PartyWitchView(this.scene, this.assets, this.mpp, this.light)), list = spot?.list ?? [];
    v.update(g, time, visible, { list, her });
    v.bubbles(g, time, camera, width, height, list);
    return v.herIdle;
  }

  /** The hearts over the two of them stargazing together (`pair`: where each lies, or null while they don't): after
   *  beach.hearts.after seconds, one every every[0] to every[1] seconds, by each in turn, rising, swaying and fading. */
  private heartsFor(g: Game, time: number, camera: THREE.Camera, width: number, height: number, pair: { x: number; z: number }[] | null): void {
    const H = g.tuning.beach?.hearts;
    if (!pair || !H) this.together = -1;
    else {
      if (this.together < 0) { this.together = time; this.nextHeart = time + H.after; }
      if (time >= this.nextHeart) {
        const at = pair[this.turn++ % 2], el = this.spare.pop() ?? this.heartImage(g);
        el.style.display = "";
        this.hearts.push({ x: at.x + (Math.random() - 0.5) * 0.8, z: at.z + (Math.random() - 0.5) * 0.4, at: time, sway: Math.random() * 6.28, el });
        this.nextHeart = time + H.every[0] + Math.random() * (H.every[1] - H.every[0]);
      }
    }
    // Rising about 2.5 m over their life, swaying side to side, fading over the last third.
    const life = H?.life ?? 2.4;
    this.hearts = this.hearts.filter(h => {
      const u = (time - h.at) / life;
      if (u >= 1 || u < 0) { h.el.style.display = "none"; this.spare.push(h.el); return false; }
      const sx = Math.sin(h.sway + u * 7) * 0.25;
      placed(this.v.set(h.x + sx, groundHeight(h.x, h.z) + 0.6 + 2.5 * u, h.z)).project(camera);
      h.el.style.left = `${((this.v.x + 1) / 2) * width}px`;
      h.el.style.top = `${((1 - this.v.y) / 2) * height}px`;
      h.el.style.visibility = this.v.z < 1 ? "visible" : "hidden";
      h.el.style.opacity = (u < 0.66 ? 1 : (1 - u) / 0.34).toFixed(2);
      return true;
    });
  }

  private heartImage(g: Game): HTMLImageElement {
    const n = 7, k = g.tuning.pixelSize * g.tuning.bubbles.scale, el = document.createElement("img");
    el.src = pixelEmoji("❤️", n);
    Object.assign(el.style, { position: "absolute", imageRendering: "pixelated", pointerEvents: "none", zIndex: "4", width: `${n * k}px`, height: `${n * k}px`, marginLeft: `${(-n * k) / 2}px`, marginTop: `${(-n * k) / 2}px`, filter: "drop-shadow(0 0 2px rgba(255,120,160,.7))" });
    document.body.appendChild(el);
    return el;
  }

  /** She's gone from the beach: the sand and sea off, the witches' sprites and the hearts let go. */
  private leave(): void {
    if (!this.on) return;
    this.on = false;
    this.together = -1;
    for (const h of this.hearts) h.el.remove();
    for (const el of this.spare) el.remove();
    this.hearts = []; this.spare = [];
    this.ground.setBeach(null);
    this.witches?.dispose();
    this.witches = null;
  }
}
