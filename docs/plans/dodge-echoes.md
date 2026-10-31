# Dodge pose echoes: bounded first slice

Ed, 2026-10-31: “Carry on with dodge echoes while the coordinator reviews the
heat/refraction slice.” This is visual-response project §7, separate from #1543.

The existing dodge is an instantaneous blink (`rules/dash.ts`), not a continuous
rendered dash. Preserve it. Keep a small history of actual rendered poses and
world foot anchors; on a new blink emit up to two separated departure poses,
then the first actually visible arrival pose. No invented intermediate animation
poses or screen feedback. At most three short fading silhouettes, no camera
history and no scenery smear. Existing motes/ribbons remain unchanged for the
first comparison; canonical/Ed can choose replacement versus accompaniment
after actual images. No spell-trail expansion or gameplay/collision change.

Capture the actual witch sprite/lean/flip/frame at the drawWitch producer seam,
including its ground anchor; reuse its atlas with private alpha/silhouette
uniforms on existing SpriteBatch materials, writing no depth. Clear before atlas
replacement, costume change, island change and rewind; release only owned
geometry/materials, never the shared witch atlas. Personal game clock follows
the existing blink, pauses with it, and does not duplicate held events.

Start with independently tested immutable pose history/lifetimes. Route narrow
View/drawWitch capture/update/reset ownership through canonical/root before
shared edits, preserving #1543 refraction's separate capture hook and #1470 art,
#1532 costume/potion and #1538 multiplayer work. Propose opt-in default-OFF
preview plus existing comfort/secondary-detail fallback until comparison.
Nearby tests/typecheck one worker; root central watch, no new monitor/browser.
Canonical owns cloud images, GPU/memory/crowded acceptance, full/art checks and
release. Review turns, rapid dodges, moving camera, changing costume, island
replacement, pause/slowtime and old-motes OFF/ON comparisons before any default.
