// Her guidance pin (rules/guidance.ts): one pin on her view (render/pins.ts), moved to whatever's next and given its icon (Ed's:
// guideIcon), in the HUD's amber ring so it reads as the house showing her round and never as a stone. Icons only (Ed, 2026-10-26).
import * as THREE from "three";
import type { View } from "../view";
import { HAT_INK } from "../view";
import type { Pin, PinTarget } from "../pins";
import type { Guide, GuideKind } from "../../rules/guidance";
import { EMOJI_PX, HAT, MAP, NOTES } from "../indicator";
export { MAP };
import { pixelSprite } from "../bubbles";
import { comfort } from "../comfort";

const INK = new THREE.Vector3(1, 0.94, 0.82);

/** A shirt: the dressing stations' glyph where the browser has no emoji for them. */
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

/** A wrapped present: something new (a find). */
export const GIFT = [
  "....##...##....",
  ".....##.##.....",
  "......###......",
  "###############",
  "#++++++#++++++#",
  "###############",
  ".#.....#.....#.",
  ".#.....#.....#.",
  ".#.....#.....#.",
  ".#.....#.....#.",
  ".#.....#.....#.",
  ".#############.",
];

/** A pair of wings spread (the lathe: her broom; Ed's "Broom should be a pair of wings"), where the browser has no 🪽. */
export const WINGS = [
  "...............",
  "##...........##",
  "###.........###",
  "#+##.......##+#",
  "#++##.....##++#",
  ".#++##...##++#.",
  ".#+++##.##+++#.",
  "..#++++#++++#..",
  "..##+++#+++##..",
  "...##++#++##...",
  "....###.###....",
  "...............",
];

/** Each pin's icon (Ed, 2026-10-26): 💤 the bed, 💌 the invitations desk, a pair of 🪽 the lathe ("Broom should be a pair of
 *  wings"), 🎁 anything new ("new find will be 🎁"), 🧭 the map table, 🎶 the decks (the wave pointer's own 🎶, in cream: the emoji's black notes were lost on the dark floor); on her first night 👗 the wardrobe, 👠 the shoe
 *  rack, 🧥 the cloak pegs, 👜 the bags and the hats' floor the hat pointers' own hat. Emoji drawn in pixels as the thrown 💌 is
 *  (render/indicator.ts emoji), each with a glyph of ours in its place where the browser has no such emoji. */
const EMOJI: Partial<Record<GuideKind, string>> = { bed: "💤", desk: "💌", chart: "🧭", hat: "🎁", part: "🎁", wearable: "🎁" };
const GLYPH: Record<GuideKind, readonly string[]> = { bed: BED, dress: SHIRT, desk: LETTER, lathe: WINGS, hat: GIFT, part: GIFT, wearable: GIFT, chart: MAP, decks: NOTES };
const DRESS: Record<string, { emoji?: string; glyph: readonly string[] }> = { dressingTable: { emoji: "💇", glyph: SHIRT }, wardrobe: { emoji: "👗", glyph: SHIRT }, shoeRack: { emoji: "👠", glyph: SHIRT }, cloakPegs: { emoji: "🧥", glyph: SHIRT }, bags: { emoji: "👜", glyph: SHIRT }, hats: { glyph: HAT } };
/** The pair of wings: 🪽 and 🪽 mirrored, spread either side, one pixel sprite (render/bubbles.ts pixelSprite, served as an emoji is). */
const wings = (): string => pixelSprite("🪽pair", EMOJI_PX, (x, n) => {
  x.font = `${Math.round(n * 0.62)}px sans-serif`; x.textAlign = "center"; x.textBaseline = "middle";
  x.fillText("🪽", n * 0.72, n / 2 + 0.5);
  x.save(); x.translate(n, 0); x.scale(-1, 1); x.fillText("🪽", n * 0.72, n / 2 + 0.5); x.restore();
});
/** A guide's icon: its emoji (none: the glyph alone) and its glyph. */
export function guideIcon(guide: Guide): { emoji?: string; glyph: readonly string[] } {
  if (guide.kind === "dress" && "object" in guide.target) return DRESS[guide.target.object] ?? { glyph: SHIRT };
  if (guide.kind === "lathe") return { emoji: wings(), glyph: WINGS };
  return { emoji: EMOJI[guide.kind], glyph: GLYPH[guide.kind] };
}

/** Over the floor-level hats' floor (its height 0), the pin hovers as over a hat lying there. */
const TOPS: Record<string, number> = { hats: 1 };
/** Over her seat at the decks, the pin's tip just over the tempo shown there (2.5 m up). */
const DECKS_TOP = 3;

/** A guidance pin's size this moment (`seconds`): the morning's breathe, 1 to 1 + pins.pulse and back pinsRate times a second, half
 *  as much with reduce flashing; the night's end's 🧭 and 💤 (and none) still at 1. */
export function guidePulse(guide: Guide | null, seconds: number, T: { pulse?: number; pulseRate?: number } | undefined, reduceFlashing = false): number {
  const amt = (T?.pulse ?? 0) * (reduceFlashing ? 0.5 : 1);
  if (!guide || guide.kind === "bed" || guide.kind === "chart" || !(amt > 0)) return 1;
  return 1 + amt * 0.5 * (1 - Math.cos(seconds * Math.PI * 2 * (T?.pulseRate ?? 1)));
}

/** Her one guidance pin, on her view. */
export class GuidePin {
  private pin: (Pin & { remove(): void }) | null = null;
  private key = "";
  constructor(private view: View) {}
  /** This frame's guide (or null), and whether it shows (wherever she is, at its target too, but under the creator, the chart or a
   *  sail: main.ts): the pin moved to it and shown, or hidden, eased (render/pins.ts). */
  update(guide: Guide | null, shows: boolean): void {
    if (guide) {
      const T = guide.target, target: PinTarget = "object" in T ? { object: T.object, top: TOPS[T.object] } : { x: T.x, z: T.z, top: 1.2, house: true };
      const key = `${guide.kind}:${JSON.stringify(target)}`;
      if (key !== this.key) {
        // (a new guide: the old pin gone, the new eased in from nothing)
        this.pin?.remove();
        this.pin = this.view.pin(target, { colour: HAT_INK, glyphColour: INK, ...guideIcon(guide) });
        this.pin.hide();
        this.key = key;
      }
    }
    if (!this.pin) return;
    // The decks: over them as drawn, slid with the house's drawing as they are, just over the tempo there (render/leash/deckBpm.ts).
    const L = this.view.leashView, seat = L.seatAt;
    if (guide?.kind === "decks" && seat) this.pin.target = { x: seat.x + L.seatSlide.x, z: seat.z + L.seatSlide.z, top: seat.y + L.seatSlide.y + DECKS_TOP };
    // At its target, the pin stays over the object (Ed, 2026-10-28), its tip clear above the use prompt's keycap there (render/houseRooms.ts).
    const P = this.view.usePrompt, on = !!guide && !!P.id && P.id === ("object" in guide.target ? guide.target.object : "decks");
    this.pin.above = on ? P.top : null;
    // The morning's pins breathe (Ed, 2026-10-29: "morning routine pointers should pulse slightly (wake up to spell)"): every one
    // till the party spell, not the night's end's 🧭 and 💤; a gentle swell, half as much with reduce flashing (render/comfort.ts).
    this.pin.scale = guidePulse(guide, this.view.game.clock.time, this.view.game.tuning.pins, comfort.reduceFlashing);
    if (guide && shows) this.pin.show(); else this.pin.hide();
  }
  /** Its kind now and its strength (tools, the shots). */
  get state(): { key: string; strength: number } { return { key: this.key, strength: this.pin?.strength ?? 0 }; }
  dispose(): void { this.pin?.remove(); this.pin = null; this.key = ""; }
}
