# Red fox: skeleton target

**Provisional checkpoint, 7 November 2026 — not READY.** Target: Vulpes vulpes. [Lane summary](l1-summary.md). No game or graph changes. Real photographs override generated anatomy.

## Reference evidence

![Generated red fox adult and mobile-young targets](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/fox/target-v1.png)

[Full generated sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/fox/target-v1.png). Top row adult, bottom row mobile young (game level0); columns standing towards, walking towards, standing away, walking away. All animals whole in frame. 'Age0' is a game level, not a zoological age in days. All eight lane species use the shared quadruped levels0–3; null genome overrides inherit the template, they do not remove babies.

Camera source: [model3d.js](../../art/model3d.js), `PITCH=.52` radians (29.8° downward), `YAW.towards=.6`, `away=-.6` (±34.4°); [creatures3d.js](../../art/creatures3d.js) uses the renderer defaults unless a tool view is supplied. Prompt requests these angles with a telephoto/near-orthographic view. **Generated camera/framing is approximate, not numerically calibrated to the game's orthographic projection.** No real-game-size acceptance or new game capture is claimed.

**Output review:** All eight requested cells are present. The generated kit is rather like an older juvenile, and the top row's posture is unusually uniform. Camera yaw/pitch are approximate; this is not a calibrated render or a stride sequence.

**Real-photo cross-check:** [Commons comparison photo](https://commons.wikimedia.org/wiki/File:RedFox.png). Visually compared locally, 7 November: this whole-body photo shows the long brush, dark lower legs, narrow muzzle and slender tucked body. It is a real individual in a different coat/pose, not a measured template. The generated sheet is cleaner and more symmetric; do not copy its perfect coat boundary. No independently verified kit photo yet. Comparison photos are not committed or republished. The whole-lane age0/photo validation remains incomplete.

## Identifying checklist

1. Long narrow muzzle ending in a small dark nose.
2. Large upright triangular ears, clearly smaller than the fennec's.
3. Light ribcage and sharply tucked flank; no barrel torso.
4. Slender raised-heel legs with dark lower-leg stockings.
5. Long dense brush, tapering to a pale tip, carried behind rather than curled.
6. Rust-red back and pale throat/chest; the outline must work without colour.
7. Mobile kit has a bigger head, shorter muzzle and less developed brush.

## Body plan for the graph

These are **provisional artist blockout ranges**, not biological measurements, not values measured from the generated image, and not replacements for Ed's game size model. L = nose tip to tail root in a neutral standing animal, excluding fur and tail. Head = occiput to nose; neck = occiput-to-withers visible span; leg entry = ground-to-withers height, not summed bone lengths. Perspective/coat/posture alter the visible ratios. Check against matched side photographs before locking them into the graph.

| Adult quantity | Ratio to L |
|---|---|
| Ground-to-withers | 0.45–0.55 |
| Head length | 0.23–0.28 |
| Visible neck span | 0.10–0.16 |
| Tail root to tip | 0.60–0.75 |

Mass profile: Chest ahead of a narrow waist; hips light. Fur enlarges the brush, not the torso. Keep the head distinct from a modest neck ruff.

Young target: use the checklist's age difference as a starting point; increase relative head/paw size, shorten muzzle/trunk and retain species-specific ear/tail character. **No numeric juvenile ratio is asserted without a real juvenile photo.** Do not obtain the baby only by uniform adult scaling. Levels1–3's design-specific ornaments are outside this anatomy sheet; retain the existing genome's intent for a later graph review.

## Shared graph handoff

Audit pinned to prototype `524b0acaa`, not the unmerged live1866 candidate. Sources: [graph contract](../../art/body-graph/graph.js), [quadruped adapter](../../art/body-graph/quadruped.js), [gait](../../art/body-graph/gait.js), [family adapter](../../art/body-graph/families.js), [tail markings](../../art/body-graph/tail-markings.js). Generic graph sockets already support head, leg, wing, shell and tail; torso stations support varying bulk. Ordinary four legs/ears/tails must not all be listed as wholly absent just because a species adapter has not been made.

**Missing graph features / implementation distinction:** Existing triangular ear geometry and tapered tail are usable. Missing in generic graph contract: head-local child attachments (ears currently use an adapter), an independently articulated hock/ankle in the diagnostic leg, and age-aware fur/brush volume controls. Multiple tail sockets are structurally possible; the level2 two-tail and level3 nine-tail design still needs a reviewed adapter, not extra biological tails.

Ranked target priorities (for1866 owner; no hand-written-art fixes here):

1. Slender torso with real tuck.
2. Narrow muzzle and triangular ear cups.
3. Long low brush with pale terminal zone.

## Generation provenance

Built-in `image_gen.imagegen`, new generation, 7 November 2026; no API/CLI fallback and no Commons photo supplied to the generator. One eight-cell PNG, unedited. Exact authored prompt below. Output model/version/seed were not exposed by the tool; do not infer them. File SHA256 and source filename are in [L1 evidence manifest](l1-evidence.json).

<details><summary>Exact generation prompt</summary>

Use case: photorealistic-natural. Asset: red fox (Vulpes vulpes) skeleton anatomy target sheet for a game, NOT existing game art. Make one crisp 4-column by 2-row contact sheet on plain light grey background, no scenery. Eight separate whole animals, generous margins, no clipping. Top row adult red fox; bottom row an independently walking, eyes-open fox kit (age0 target, not newborn). Columns: standing towards; walking towards; standing away; walking away. Camera for every panel is elevated looking DOWN 30 degrees, telephoto/near-orthographic, body broadside diagonal with 35-degree yaw toward or away from viewer; do not use eye-level or straight head-on portraits. Towards means muzzle visible; away means rump and back of head visible. No looking back in away panels. Natural lean fox anatomy: fine long muzzle, large triangular ears, slender digitigrade legs, light chest tucked waist, very long full brush with pale tip, reddish body black lower legs white throat. Kit relatively larger head, shorter muzzle, softer rounded body and shorter less full tail; do not miniaturize adult. Walking is one quiet terrestrial step, four anatomically correct limbs, no galloping. Natural fur and neutral soft light, documentary photographic realism. Small labels only: adult / kit; standing towards / walking towards / standing away / walking away. No costume, extra tails, jewelry, fantasy, illustration, cartoon, scale ruler or claims of measurement. Consistent adult anatomy across top row, consistent kit across bottom.

</details>

## Remaining / wake condition

Complete adult and mobile-young Commons visual checks, resolve the output cautions, then have the coordinator/1866 owner assess the target. Wake when the comparison photos are accessible without HTTP429, or root supplies cloud photo-review evidence. No graph implementation or switch-on until that review; old sprite critique omitted under the later skeleton-first ruling.

