// The treehouse deck's map table (Ed, 2026-10-11: "The world map is in the centre"; rules/treehouse.ts): the sea chart as a live
// miniature on the table's top (app/chartView.ts mountChart in its "miniature" mode, its camera slowly circling: Charlie's), its
// canvas a texture on a disc lying on the Ent's painted table top (art/ent.js, its `table` anchor). Made only while she's on the
// ground within `near` metres of the deck, redrawn a few times a second, and let go (its renderer and all) once she's away.
import * as THREE from "three";
import { mountChart, type ChartView } from "../app/chartView";

/** Within this of the deck's middle (m), on the ground or on the deck, the miniature is made and shown. */
const NEAR = 60;
/** Its redraws a second. */
const RATE = 12;

export class MapTable {
  readonly mesh: THREE.Mesh;
  private view: ChartView | null = null;
  private host: HTMLDivElement | null = null;
  private tex: THREE.CanvasTexture | null = null;
  private last = -1;
  private readonly mat: THREE.MeshBasicMaterial;

  /** `r`: the table top's radius (m). */
  constructor(r: number) {
    this.mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.85, 0.85, 0.95) }); // (a touch under full: the night round it)
    this.mesh = new THREE.Mesh(new THREE.CircleGeometry(r * 0.9, 48), this.mat);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.visible = false;
  }

  /** A frame: `at`, the table top's middle (null: not shown); `dist`, her distance from the deck (m); `ground`, whether the camera's
   *  on the ground (the treetops' bend isn't drawn on it); `time`, seconds. */
  update(at: { x: number; y: number; z: number } | null, dist: number, ground: boolean, time: number): void {
    const want = !!at && ground && dist < NEAR;
    if (!want) { this.mesh.visible = false; if (this.view && dist > NEAR * 1.5) this.drop(); return; }
    if (!this.view) {
      this.host = document.createElement("div");
      this.host.style.cssText = "position:fixed;left:-10000px;top:0;width:96px;height:96px;pointer-events:none;visibility:hidden";
      document.body.append(this.host);
      this.view = mountChart(this.host, { mode: "miniature", size: { w: 64, h: 64 } });
      this.tex = new THREE.CanvasTexture(this.view.canvas);
      this.tex.colorSpace = THREE.SRGBColorSpace;
      this.tex.magFilter = THREE.NearestFilter; this.tex.minFilter = THREE.NearestFilter; this.tex.generateMipmaps = false;
      this.mat.map = this.tex; this.mat.needsUpdate = true;
      this.last = -1;
    }
    if (this.last < 0 || time - this.last >= 1 / RATE) {
      this.view.update(this.last < 0 ? 0 : Math.min(0.5, time - this.last), time);
      this.tex!.needsUpdate = true;
      this.last = time;
    }
    this.mesh.position.set(at!.x, at!.y, at!.z);
    this.mesh.visible = true;
  }

  /** Let the miniature go: its renderer, its worker and its page element. */
  drop(): void {
    this.view?.dispose(); this.view = null;
    this.host?.remove(); this.host = null;
    this.tex?.dispose(); this.tex = null;
    this.mat.map = null; this.mat.needsUpdate = true;
    this.mesh.visible = false;
  }
}
