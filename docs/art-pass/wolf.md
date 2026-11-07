# Grey wolf: skeleton target

**Provisional checkpoint, 7 November 2026 — not READY.** Target: Canis lupus. [Lane summary](l1-summary.md). No game or graph changes. Real photographs override generated anatomy.

## Reference evidence

![Generated grey wolf adult and mobile-young targets](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/wolf/target-v1.png)

[Full generated sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/wolf/target-v1.png). Top row adult, bottom row mobile young (game level0); columns standing towards, walking towards, standing away, walking away. All animals whole in frame. 'Age0' is a game level, not a zoological age in days. All eight lane species use the shared quadruped levels0–3; null genome overrides inherit the template, they do not remove babies.

Camera source: [model3d.js](../../art/model3d.js), `PITCH=.52` radians (29.8° downward), `YAW.towards=.6`, `away=-.6` (±34.4°); [creatures3d.js](../../art/creatures3d.js) uses the renderer defaults unless a tool view is supplied. Prompt requests these angles with a telephoto/near-orthographic view. **Generated camera/framing is approximate, not numerically calibrated to the game's orthographic projection.** No real-game-size acceptance or new game capture is claimed.

**Output review:** Eight cells present. Generated pup looks older than an early mobile pup and its ears are more erect than the game's documented floppy-ear baby idea. Use real pup anatomy before choosing the final age0 silhouette; this sheet does not decide that artistic exaggeration.

**Real-photo cross-check:** [Commons comparison photo](https://commons.wikimedia.org/wiki/File:Canis_lupus_standing_in_snow.jpg). Whole-body real-photo page located (Tracy Brooks, USFWS); download returned HTTP429, so visual body/pose comparison is pending. No wolf-pup photo has been verified. Do not treat the page's title as a completed anatomy check. Comparison photos are not committed or republished. The whole-lane age0/photo validation remains incomplete.

## Identifying checklist

1. Long robust digitigrade legs with substantial paws.
2. Deep chest, narrow waist and powerful shoulder/neck ruff.
3. Broad wedge head with a long substantial muzzle.
4. Moderate triangular ears, smaller relative to the head than a fox's.
5. Back close to level, with shoulders carrying the visual weight.
6. Bushy tail hangs low and roughly straight; no curled husky tail.
7. Pup has a shorter muzzle, rounder skull and large paws; not an adult shrunk uniformly.

## Body plan for the graph

These are **provisional artist blockout ranges**, not biological measurements, not values measured from the generated image, and not replacements for Ed's game size model. L = nose tip to tail root in a neutral standing animal, excluding fur and tail. Head = occiput to nose; neck = occiput-to-withers visible span; leg entry = ground-to-withers height, not summed bone lengths. Perspective/coat/posture alter the visible ratios. Check against matched side photographs before locking them into the graph.

| Adult quantity | Ratio to L |
|---|---|
| Ground-to-withers | 0.50–0.65 |
| Head length | 0.24–0.30 |
| Visible neck span | 0.12–0.20 |
| Tail root to tip | 0.35–0.50 |

Mass profile: Deep chest under the shoulders, long limbs, lean abdomen and lighter rump. Ruff adds breadth at neck/withers but must not turn the chest into a bear hump.

Young target: use the checklist's age difference as a starting point; increase relative head/paw size, shorten muzzle/trunk and retain species-specific ear/tail character. **No numeric juvenile ratio is asserted without a real juvenile photo.** Do not obtain the baby only by uniform adult scaling. Levels1–3's design-specific ornaments are outside this anatomy sheet; retain the existing genome's intent for a later graph review.

## Shared graph handoff

Audit pinned to prototype `524b0acaa`, not the unmerged live1866 candidate. Sources: [graph contract](../../art/body-graph/graph.js), [quadruped adapter](../../art/body-graph/quadruped.js), [gait](../../art/body-graph/gait.js), [family adapter](../../art/body-graph/families.js), [tail markings](../../art/body-graph/tail-markings.js). Generic graph sockets already support head, leg, wing, shell and tail; torso stations support varying bulk. Ordinary four legs/ears/tails must not all be listed as wholly absent just because a species adapter has not been made.

**Missing graph features / implementation distinction:** Digitigrade family, torso profile and pointed ears exist. Missing from diagnostic graph gait: separate hock/ankle articulation and head/neck local transforms. Shared graph must retain a proper shoulder-ribcage-waist profile under ruff. This is a target handoff to1866; no parallel wolf candidate or tuning here.

Ranked target priorities (for1866 owner; no hand-written-art fixes here):

1. Deep chest and long articulated limbs.
2. Broad muzzle with restrained ears.
3. Low straight bushy tail.

## Generation provenance

Built-in `image_gen.imagegen`, new generation, 7 November 2026; no API/CLI fallback and no Commons photo supplied to the generator. One eight-cell PNG, unedited. Exact authored prompt below. Output model/version/seed were not exposed by the tool; do not infer them. File SHA256 and source filename are in [L1 evidence manifest](l1-evidence.json).

<details><summary>Exact generation prompt</summary>

Use case: photorealistic-natural. Asset: grey wolf (Canis lupus) skeleton anatomy target sheet for a game, NOT existing game art. Make one crisp 4-column by 2-row contact sheet on plain light grey background, no scenery. Eight separate whole animals, generous margins, no clipping. Top row adult grey wolf; bottom row an independently walking, eyes-open wolf pup (age0 target, not newborn). Columns: standing towards; walking towards; standing away; walking away. Camera for every panel is elevated looking DOWN 30 degrees, telephoto/near-orthographic, body broadside diagonal with 35-degree yaw toward or away from viewer; do not use eye-level or straight head-on portraits. Towards means muzzle visible; away means rump and back of head visible. No looking back in away panels. Natural grey wolf anatomy: powerful deep narrow chest, long robust digitigrade legs and large paws, substantial wedge skull and long broad muzzle, moderate triangular ears much SMALLER in proportion than fox ears, thick neck ruff, almost level back with tucked flank, straight bushy tail hangs LOW never curled, grey-brown guard coat pale cheeks and throat. Not a husky, no blue eyes, no black white dog mask, no white fox tail tip. Kit relatively larger head, shorter muzzle, softer rounded body and shorter less full tail; do not miniaturize adult. Walking is one quiet terrestrial step, four anatomically correct limbs, no galloping. Natural fur and neutral soft light, documentary photographic realism. Small labels only: adult / pup; standing towards / walking towards / standing away / walking away. No costume, extra tails, jewelry, fantasy, illustration, cartoon, scale ruler or claims of measurement. Consistent adult anatomy across top row, consistent pup across bottom.

</details>

## Remaining / wake condition

Complete adult and mobile-young Commons visual checks, resolve the output cautions, then have the coordinator/1866 owner assess the target. Wake when the comparison photos are accessible without HTTP429, or root supplies cloud photo-review evidence. No graph implementation or switch-on until that review; old sprite critique omitted under the later skeleton-first ruling.

