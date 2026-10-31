import { defaultLayout, parseLayout, type LayoutItem } from "./houseLayout";
import { usesEdLayout } from "../app/houseLayout";
import proposal from "../../docs/evidence/treehouse-layout-ed-2026-10-31.v2-proposal.json";

/** Author against the stable source identity, but open/reset to the published arrangement. */
export function publishedLayout(items: LayoutItem[], floorplan: string, params: URLSearchParams) {
  return usesEdLayout(params) ? parseLayout(proposal, items, floorplan) : defaultLayout(items, floorplan);
}
