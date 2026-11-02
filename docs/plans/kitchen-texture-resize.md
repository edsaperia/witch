# Kitchen panel texture lifecycle

Separate follow-up to1643#6577219304, PLAN6578502007. Basefc60bb785; own codex/kitchen-texture-resize/work/kitchen-texture-resize. Controls1643, combat1654 and T6/1660 remain independent.

Add a resize-only texture disposal guard before changing the three panel canvases. Three0.186 allocates immutable texture storage on first upload; dispose deallocates its WebGL properties/source binding so the next needsUpdate can allocate the new dimensions. Current warmDraws may visit panels before their first update. This risk is inferred from code, not reproduced as Ed's invisibility. Test actual Texture dispose events on initial resize, steady dimensions and a later size change, retaining existing painter/geometry checks. No painter, colour, room, prop placement, shader or interaction changes.

Scale review: authored kitchenPlacements records the pot10×7×6m at(-16.73,28.9), and the editor uses the identical pot painter at the authored pose. The base ellipse is10.2m wide; projecting handles and depth extends the drawn bounds beyond the floor footprint. Do not equate projected artwork height with physical height or claim an exact witch-height ratio from this source review. Runtime has no furniture collision solver, as already documented by the editor audit. No guessed resizing/repositioning; actual GPU/save/entry-path evidence remains canonical's follow-up.

Nearby one-worker source checks and typecheck only. No laptop browser/capture, art generation, full suite or world fight. Every changed test listed in REPORT; own changelog names the lifecycle guard without claiming invisibility fixed. Compatibility merge-tree against live1609 before reporting. Save source/validation checkpoint, then central CI/reply watch; no personal monitor.
