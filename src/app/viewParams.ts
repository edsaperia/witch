// The art's style for this load from the link (?style=, ?props=, ?texture=, ?flora=), carried to the art worker, and the
// view's debug switches (?debug=cull|shadows, ?quick=1, ?scenery=).
import { loadStyle } from "../render/style";
import type { View } from "../render/view";
import type { Tuning } from "../rules/tuning";

export function styleFromLink(params: URLSearchParams, tuning: Tuning, propsGen: boolean) {
  const style = loadStyle();
  { const artStyle = params.get("style") ?? "bold"; if (artStyle === "bold" || artStyle === "ref") style.artStyle = artStyle; } // bold by default (Ed, 2026-10-06: "I think I prefer bold style"); ?style=now|bold|ref: a pixel-art style (art/stylise.js) baked into every sprite, carried to the art worker in the style
  if (propsGen) { style.propGen = 1; tuning.partyObjects.generated = true; } // the prop generator (by default; ?props=hand turns it off): the prop generator (art/props/) stands in for the areas' stones, cairns, pools, stumps, logs, fungi and henges, several shapes of each, and the party's generated bunting, balloons and lanterns for the hand-made ones (carried to the art worker in the style, to the rules in the tuning)
  if (params.get("texture") === "0") style.texture = 0; // ?texture=0: creatures as before their fur, feathers and scales (art/genome/texture.js), to compare
  if (params.get("flora")) style.flora = params.get("flora"); // ?flora=new|fantasy|all|<ids>: every wooded area grows these tree species (art/flora), carried to the art worker in the style
  return style;
}

export function viewFromLink(view: View, params: URLSearchParams): void {
  view.debugCull = params.get("debug") === "cull";
  // ?debug=shadows: every shadow a flat magenta tint, to see each against what casts it (render/shadows.ts).
  if (params.get("debug") === "shadows") view.debugShadows();
  view.quick = params.get("quick") === "1";
  // ?scenery=<metres>: a fixed scenery radius instead of the adaptive budget.
  const sceneryAt = Number(params.get("scenery"));
  if (params.has("scenery") && sceneryAt > 0) view.sceneryFixed = sceneryAt;
}
