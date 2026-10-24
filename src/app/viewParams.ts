// The art's style for this load from the link (?style=, ?flora=), carried to the art worker, and the
// view's debug switches (?debug=cull|shadows, ?quick=1, ?scenery=).
import { loadStyle } from "../render/style";
import type { View } from "../render/view";
import type { Tuning } from "../rules/tuning";

export function styleFromLink(params: URLSearchParams, tuning: Tuning) {
  const style = loadStyle();
  style.artStyle = params.get("style") === "ref" ? "ref" : "bold"; // bold (Ed, 2026-10-06: "I think I prefer bold style"); ?style=ref: Ed's reference treatment (art/stylise.js) baked into every sprite, carried to the art worker in the style
  style.propGen = 1; tuning.partyObjects.generated = true; // the prop generator (art/props/) stands in for the areas' stones, cairns, pools, stumps, logs, fungi and henges, several shapes of each, and the party's generated bunting, balloons and lanterns for the hand-made ones (carried to the art worker in the style, to the rules in the tuning)
  style.setPieceScale = tuning.setPieceScale; // set pieces baked at the size they're drawn, never stretched (docs/STYLE.md §1: everything at the art pixel)
  const creatures = Number(params.get("creatures")); // ?creatures=1: creatures (babies, young, adults) at another size than the style's (1.5: art/creatures3d.js drawHeight), for trying sizes; 1 is the size before Ed's +50%
  if (creatures > 0) (style as { creatureScale?: number }).creatureScale = creatures;
  if (params.get("biome")) style.biome = params.get("biome"); // ?biome=<name>|<a|b|w>: every area's trees and props in that biome's look, over the island's own (art/flora/biomes.js)
  if (params.get("flora")) style.flora = params.get("flora"); // ?flora=new|fantasy|all|<ids>: every wooded area grows these tree species (art/flora), carried to the art worker in the style
  return style;
}

/** The style the game's art is drawn in for this load: the link's (styleFromLink) at the tuning's pixel size, trees taller by treeHeight,
 *  crowns wider by crownWidth in all (treeHeight widens them too). The game's view and the landing's bake ahead (app/
 *  landingBake.ts) both draw in it, so what one keeps the other finds. */
export function gameStyle(style: ReturnType<typeof styleFromLink>, tuning: Tuning) {
  return { ...style, pixel: tuning.pixelSize, treeSize: style.treeSize * tuning.treeHeight, crownWidth: style.crownWidth * tuning.crownWidth / tuning.treeHeight };
}

export function viewFromLink(view: View, params: URLSearchParams): void {
  view.debugCull = params.get("debug") === "cull";
  // ?debug=shadows: every shadow a flat magenta tint, to see each against what casts it (render/shadows.ts).
  if (params.get("debug") === "shadows") view.debugShadows();
  view.quick = params.get("quick") === "1";
  // ?loadmist=1|0: the loading mist (render/loadingMist.ts) on or off for this load (off under ?quick=1, which draws only what's
  // in view, unless asked for); ?artdelay=<s>: each area type's trees drawn ahead of need land one every that many seconds, to watch it
  // roll away (those the view wants now as they come: the start waits for them).
  if (params.has("loadmist")) view.loadingMistLink = params.get("loadmist") !== "0";
  const delay = Number(params.get("artdelay"));
  if (delay > 0) view.assets.typeDelay = delay;
  // ?scenery=<metres>: a fixed scenery radius instead of the adaptive budget.
  const sceneryAt = Number(params.get("scenery"));
  if (params.has("scenery") && sceneryAt > 0) view.sceneryFixed = sceneryAt;
}
