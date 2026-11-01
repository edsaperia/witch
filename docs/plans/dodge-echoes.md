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

Implemented preview: `?dodgeEchoes=1`, or `view.dodgeEchoes.enabled` for the
existing capture tools. Default OFF. Reduced flashing, reduced motion and
secondary-detail OFF suppress it; bare mode currently suppresses it too.
Three lazily allocated SpriteBatch meshes borrow the witch atlas. No added
textures, render targets or post pass; draw-call/GPU cost remains unmeasured.
The drawWitch hook uses its existing dash and actual body array (not fallen hats).
Island reset releases buffers before atlas reseating. Unit checks cover held
events, pause/expiry, repeated dodges, camera anchoring, immutable UV/lean,
appearance/world resets and comfort suppression without replay.

Coordinator handoff: compare the same seed/camera and dodge moment with the
preview OFF/ON, including a turn, rapid repeats, costume/island replacement,
paused/slow personal clock and a crowded scene. Keep the existing motes enabled
for this first comparison. Review readability, occlusion and GPU/resource cost;
tests do not establish visual acceptance. Canonical normal merges must preserve
#1543's separate cast hook. Existing cauldron #95 Long Echoes is the corresponding
future candidate; this adds no gameplay decoys or copied attacks.

## Review repair (canonical6547612367)

The cloud review's ON/OFF method hid mesh.visible then called View.render;
SpriteBatch.set made the nonempty echo meshes visible again. The real material
regression test reproduces that confound. Its 0-pixel result and alpha sweep
therefore do not establish default-strength invisibility or a Post/mote cause.
Do not raise alpha or rewrite another owner's Post on that evidence. Default
birth alpha remains .24 and ordinary depth test/write policy remains intact.
Witch is opaque and echoes transparent, so renderOrder9.9 versus10 alone also
does not determine which is drawn first across three.js's separate queues.

Use `view.dodgeEchoes.captureVisible = false/true` for actual OFF/ON. This only
controls meshes, immediately and after subsequent updates, preserving live
history/alpha/lifetimes. It works with full View renders and prepared-scene Post
redraws. Do not use enabled=false for an OFF-return pair (that clears history),
and do not hide a mesh before a full View update that sets it visible again.
Recheck true OFF/ON/OFF-return at the same held frame, with ordinary motes/Post,
then isolate the existing motes/ribbon or levels as diagnostics only if the true
pair still establishes a visibility failure. No readable-default or occlusion
pass is claimed until that corrected pixel comparison runs in an allocated slot.

Arrival birth now uses the first observed visible reappearance, with a full .32s
life from that frame. Departure recording at each new blink uses the authoritative
dash.fromX/fromZ anchor, preserving the last actually sampled body frame/flip/lean
and its ground-relative height. It does not invent intermediate motion/frames.
Pre-blink history is cleared after emission, so a subsequent blink while hidden
cannot reuse old departure positions. The default .2s chain equals the actual
.2s disappearance; the real startDash/applyDash regression demonstrates the next
charged blink can begin at that boundary before any visible arrival was drawn.
No separate Hare spell is required for this reachability; current spells catalogue
has no Hare Dash spell entry, while old charge comments retain that name.

Canonical1476#6547931247 supersedes the earlier cloud ownership: builders perform
new captures themselves, headless Chromium only, with canonical laptop slot,
FREE evidence, input idle >=5min/no Ed game tab, <=270s and SLOT DONE. Request the
slot after the exact repair head is pushed; no unallocated local/cloud runner.
