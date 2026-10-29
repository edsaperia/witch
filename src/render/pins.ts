// A map pin for anything (Ed, 2026-10-26: "We will use pointers to help the witch get dressed for the first time, and to show her
// new things in the treehouse when they are unlocked"): the HUD's pointer (render/indicator.ts StoneIndicator) toward any target, a
// point in the world with a height or one of the house's objects, in any colour and glyph, shown and hidden on its own. Off screen it
// sits at the edge pointing the way; in view it hovers over its target as a pin, pointing down at it (as every pointer does). In the
// oak house, whose drawing is slid along the Ent's plane with her (render/view/witch.ts houseShiftOf), a house target is moved as she
// is (View.herOffset), so a pin over the wardrobe sits on the wardrobe as drawn.
//   const pin = view.pin({ object: "wardrobe" }, { colour, glyph: HAT }); ... pin.hide(); pin.show(); pin.remove();
// The view draws its pins each frame with the other pointers (render/view/hud.ts drawPointers).
import type * as THREE from "three";
import { StoneIndicator } from "./indicator";
import { letterAt, type HerOffset } from "./invites";
import { HOUSE_ROOMS, objectWorld } from "../rules/houseRooms";
import { deckOf } from "../rules/treehouse";
import type { ForestMap } from "../rules/map";
import type { Tuning } from "../rules/tuning";

/** What a pin points at: a point (x, z in the world, `top` metres up: its subject's height; `house`, on the house's floor) or a house
 *  object by its id (config/house: its own height unless `top`). */
export type PinTarget = { x: number; z: number; top?: number; house?: boolean } | { object: string; top?: number };
/** How a pin looks: its ring's colour (rgb 0-1), the glyph in its middle (rows of `#` and `+`, render/indicator.ts HAT and the
 *  rest) or a creature's sigil (`species`), the glyph's own colour, and a label beside it: none by default (Ed, 2026-10-26: guidance pins are "icons only, no words"; not even its distance). */
export interface PinLook { colour: THREE.Vector3; glyph?: readonly string[]; glyphColour?: THREE.Vector3; species?: string; label?: string; /** an emoji in pixels in its own colours, over the glyph (the glyph its fallback where the browser has no such emoji) */ emoji?: string }

/** Where a target is to be drawn: x, z and its top over the ground there (as render/height.ts placed takes it), or null (an object
 *  the house hasn't). In the house (her there: `her.on`), a house target as she's drawn; outside, on the house's floor. A house
 *  object's top is its art's as drawn (`drawnTop`, by its id) once its art's made. */
export function pinSpot(target: PinTarget, map: ForestMap, tuning: Tuning, her: HerOffset, ground: (x: number, z: number) => number, drawnTop?: (id: string) => { x: number; y: number; z: number } | null | undefined): { x: number; z: number; top: number } | null {
  let x: number, z: number, top: number, house: boolean;
  // (a house object's top as drawn this frame, its art's highest pixel, where it's drawn (render/houseRooms.ts marks "<id>.top"), so
  // the pin's tip clears it, a bed's canopy and all (Ed, 2026-10-26: "the pointer should be not overlapping with the item they're
  // indicating"); its config height until its art's baked)
  const T = "object" in target && target.top === undefined ? drawnTop?.(target.object) : null;
  if (T) return { x: T.x, z: T.z, top: T.y - ground(T.x, T.z) };
  if ("object" in target) {
    const o = HOUSE_ROOMS.objects.find(q => q.id === target.object), deck = deckOf(map, tuning);
    if (!o || !deck) return null;
    ({ x, z } = objectWorld(o, deck)); top = target.top ?? o.h; house = true;
  } else { x = target.x; z = target.z; top = target.top ?? 1; house = !!target.house; }
  if (!house) return { x, z, top };
  if (her.on) { const [X, Y, Z] = letterAt(her, x, top, z, ground); return { x: X, z: Z, top: Y }; }
  return { x, z, top: top + (deckOf(map, tuning)?.h ?? 0) };
}

export class Pin {
  private ind: StoneIndicator;
  private want = 1;
  private shown = 0;
  /** Its strength now (0 to 1, eased in and out by show and hide). */
  get strength(): number { return this.shown; }
  /** The page's y its tip stays above while in view (a use prompt under it: render/view/guidance.ts), or null. */
  above: number | null = null;
  constructor(public target: PinTarget, public look: PinLook, parent: HTMLElement = document.body) { this.ind = new StoneIndicator(parent, 3); }
  show(): void { this.want = 1; }
  hide(): void { this.want = 0; }
  /** A frame (render/view/hud.ts): eased toward shown or hidden over about a fifth of a second, times `calm` (the HUD's own fade); `gap` the tip's pixels over its top (tuning pins.gap). */
  draw(camera: THREE.Camera, width: number, height: number, spot: { x: number; z: number; top: number } | null, wx: number, wz: number, beat: number, bpm: number, dt: number, calm: number, gap?: number): void {
    this.shown += (this.want - this.shown) * Math.min(1, Math.max(0, dt) * 10);
    if (Math.abs(this.shown - this.want) < 0.01) this.shown = this.want;
    this.ind.fade(this.shown * calm);
    const L = this.look;
    this.ind.update(camera, width, height, spot && this.shown > 0 ? { x: spot.x, z: spot.z, top: spot.top, gap, above: this.above ?? undefined, colour: L.colour, species: L.species ?? "", glyph: L.glyph, glyphColour: L.glyphColour, emoji: L.emoji } : null, wx, wz, beat, bpm, 1, L.label ?? "");
  }
  /** Gone for good (its canvas and label off the page). */
  dispose(): void { this.ind.dispose(); }
}
