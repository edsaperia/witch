import { defaultLayout, parseLayout, type LayoutItem } from "./houseLayout";
import { usesEdLayout } from "../app/houseLayout";
import proposal from "../../config/house/layouts/ed-current.json";

/** Author against the stable source identity, but open/reset to the published arrangement. */
export function publishedLayout(items: LayoutItem[], floorplan: string, params: URLSearchParams) {
  return usesEdLayout(params) ? parseLayout(proposal, items, floorplan) : defaultLayout(items, floorplan);
}
