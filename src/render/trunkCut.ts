// Where a tree's trunk fades out in ground mode (sprites.ts trunkA), as a share of its frame's height from the top. Both halves
// share the frame's box. The crown's cut: the row above which `share` of the top half's pixels lie (trunkFade.crownShare; not its
// lowest pixel, Ed, v271: the low boughs and skirts hang nearly to the ground). But the trunk (the bottom half) ends at the
// crown line, often well below that row, and the fade ran its course over empty air above it, leaving the trunk whole to a flat
// top (Ed, 2026-10-13: "The tops of treetrunks don't fade out smoothly"). So the cut is never above the bottom half's own
// top row: the fade always ends on the trunk. undefined when the top half is empty.
export function trunkCut(topRows: ArrayLike<number>, botRows: ArrayLike<number>, share: number): number | undefined {
  const h = topRows.length;
  let total = 0;
  for (let y = 0; y < h; y++) total += topRows[y];
  if (!total) return undefined;
  let row = 0, seen = 0;
  for (let y = 0; y < h; y++) { seen += topRows[y]; if (seen >= total * share) { row = y; break; } }
  let botTop = -1;
  for (let y = 0; y < botRows.length; y++) if (botRows[y] > 0) { botTop = y; break; }
  return Math.max(row + 1, botTop) / h;
}
