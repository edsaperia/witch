// Her guidance pin (rules/guidance.ts): one pin on her view (render/pins.ts), moved to whatever's next and given its glyph, in
// the HUD's amber with a cream glyph so it reads as the house showing her round and never as a stone. Icons only (Ed, 2026-10-26).
import * as THREE from "three";
import type { View } from "../view";
import { HAT_INK } from "../view";
import { HAT } from "../indicator";
import type { Pin, PinTarget } from "../pins";
import type { Guide, GuideKind } from "../../rules/guidance";

const INK = new THREE.Vector3(1, 0.94, 0.82);

/** A shirt: the dressing stations, and a new wearable at its station. */
export const SHIRT = [
  "....##...##....",
  "..####+++####..",
  ".######+######.",
  "###.#######.###",
  "##..#######..##",
  "....#######....",
  "....#######....",
  "....#######....",
  "....#######....",
  "....#######....",
  "....#######....",
  "....#######....",
];
/** A sealed letter: the invitations desk. */
export const LETTER = [
  "...............",
  "###############",
  "##+.........+##",
  "#.+.......+..##",
  "#...+...+....##",
  "#.....+......##",
  "#....+.+.....##",
  "#...+...+....##",
  "#..+.....+...##",
  "#.+.......+..##",
  "###############",
  "...............",
];
/** A broom: the lathe, and a new broom part at the Workshop's bay. */
export const BROOM = [
  "............##.",
  "...........##..",
  "..........##...",
  ".........##....",
  "........##.....",
  ".......##......",
  "......##.......",
  "....+++++......",
  "...#+#+#+#.....",
  "..#+#+#+#+#....",
  ".#+#+#+#+#+#...",
  "#+#+#+#+#+#+#..",
];
/** Two platters on a desk: her decks. */
export const DECKS = [
  "...............",
  ".#####...#####.",
  "#.....#.#.....#",
  "#..+..#.#..+..#",
  "#.+++.#.#.+++.#",
  "#..+..#.#..+..#",
  "#.....#.#.....#",
  ".#####...#####.",
  "...............",
  "###############",
  "#+++++++++++++#",
  "###############",
];
/** A bed: after a lost night. */
export const BED = [
  "...............",
  "#..............",
  "#..............",
  "#.+++..........",
  "#++++##########",
  "###############",
  "###############",
  "#+++++++++++++#",
  "#.............#",
  "#.............#",
  "#.............#",
  "...............",
];
/** A folded map: the map table. */
export const MAP = [
  "...............",
  "####...####...#",
  "#..####...####.",
  "#.+..#..+.#..#.",
  "#.++.#.+++#..#.",
  "#..+.#..+.#.+#.",
  "#....#....#.++.",
  "#.+..#....#..#.",
  "#.++.#..+.#..#.",
  "####.####.####.",
  "....####...####",
  "...............",
];

export const GUIDE_GLYPH: Record<GuideKind, readonly string[]> = { bed: BED, dress: SHIRT, desk: LETTER, lathe: BROOM, hat: HAT, part: BROOM, wearable: SHIRT, chart: MAP, decks: DECKS };

/** Over the floor-level hats' floor (its height 0), the pin hovers as over a hat lying there. */
const TOPS: Record<string, number> = { hats: 1 };

/** Her one guidance pin, on her view. */
export class GuidePin {
  private pin: (Pin & { remove(): void }) | null = null;
  private key = "";
  constructor(private view: View) {}
  /** This frame's guide (or null), and whether it shows (rules/guidance.ts guideShows, not at its target): the pin moved to it and
   *  shown, or hidden, eased (render/pins.ts). */
  update(guide: Guide | null, shows: boolean): void {
    if (guide) {
      const T = guide.target, target: PinTarget = "object" in T ? { object: T.object, top: TOPS[T.object] } : { x: T.x, z: T.z, top: 1.5, house: true };
      const key = `${guide.kind}:${JSON.stringify(target)}`;
      if (key !== this.key) {
        // (a new guide: the old pin gone, the new eased in from nothing)
        this.pin?.remove();
        this.pin = this.view.pin(target, { colour: HAT_INK, glyph: GUIDE_GLYPH[guide.kind], glyphColour: INK });
        this.pin.hide();
        this.key = key;
      }
    }
    if (!this.pin) return;
    if (guide && shows) this.pin.show(); else this.pin.hide();
  }
  /** Its kind now and its strength (tools, the shots). */
  get state(): { key: string; strength: number } { return { key: this.key, strength: this.pin?.strength ?? 0 }; }
  dispose(): void { this.pin?.remove(); this.pin = null; this.key = ""; }
}
