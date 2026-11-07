# Smooth-coated otter: skeleton target

**Provisional checkpoint, 7 November 2026 — not READY.** Target: Lutrogale perspicillata. [Lane summary](l1-summary.md). No game or graph changes. Real photographs override generated anatomy.

## Reference evidence

![Generated smooth-coated otter adult and mobile-young targets](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/otter/target-v1.png)

[Full generated sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/otter/target-v1.png). Top row adult, bottom row mobile young (game level0); columns standing towards, walking towards, standing away, walking away. All animals whole in frame. 'Age0' is a game level, not a zoological age in days. All eight lane species use the shared quadruped levels0–3; null genome overrides inherit the template, they do not remove babies.

Camera source: [model3d.js](../../art/model3d.js), `PITCH=.52` radians (29.8° downward), `YAW.towards=.6`, `away=-.6` (±34.4°); [creatures3d.js](../../art/creatures3d.js) uses the renderer defaults unless a tool view is supplied. Prompt requests these angles with a telephoto/near-orthographic view. **Generated camera/framing is approximate, not numerically calibrated to the game's orthographic projection.** No real-game-size acceptance or new game capture is claimed.

**Output review:** Eight cells present. Generated standing animals are too upright/arched and the tail reads narrow in some cells, so neither height nor flatness is established. A single lifted paw is a pose cue, not a biologically validated walk cycle. Do not trace the apparent toe count.

**Real-photo cross-check:** [Commons comparison photo](https://commons.wikimedia.org/wiki/File:Smooth-coated_otter_1.jpg). Commons file located (Jnzl's Photos, Coney Island west causeway,21 Dec2024), identified under smooth-coated otter rather than small-clawed or Eurasian otter. Download returned HTTP429; visual body/tail/foot comparison is pending, including a mobile pup. Comparison photos are not committed or republished. The whole-lane age0/photo validation remains incomplete.

## Identifying checklist

1. Long low streamlined trunk with a smooth continuous neck.
2. Broad flattened head and short blunt muzzle.
3. Tiny round ears and strong whisker pads.
4. Short robust limbs with webbed feet.
5. Thick muscular tapering tail, flattened rather than a furry brush.
6. Smooth close brown coat with paler throat.
7. Pup has shorter trunk and neck, relatively larger head, and shorter tail.

## Body plan for the graph

These are **provisional artist blockout ranges**, not biological measurements, not values measured from the generated image, and not replacements for Ed's game size model. L = nose tip to tail root in a neutral standing animal, excluding fur and tail. Head = occiput to nose; neck = occiput-to-withers visible span; leg entry = ground-to-withers height, not summed bone lengths. Perspective/coat/posture alter the visible ratios. Check against matched side photographs before locking them into the graph.

| Adult quantity | Ratio to L |
|---|---|
| Ground-to-withers | 0.20–0.30 |
| Head length | 0.18–0.24 |
| Visible neck span | 0.10–0.18 |
| Tail root to tip | 0.55–0.70 |

Mass profile: Continuous neck-to-ribcage-to-hip flow, broad low pelvis and substantial tail root. Keep a slight anatomical waist without a fox-like deep tuck. Tail should carry muscle, not a fur envelope.

Young target: use the checklist's age difference as a starting point; increase relative head/paw size, shorten muzzle/trunk and retain species-specific ear/tail character. **No numeric juvenile ratio is asserted without a real juvenile photo.** Do not obtain the baby only by uniform adult scaling. Levels1–3's design-specific ornaments are outside this anatomy sheet; retain the existing genome's intent for a later graph review.

## Shared graph handoff

Audit pinned to prototype `524b0acaa`, not the unmerged live1866 candidate. Sources: [graph contract](../../art/body-graph/graph.js), [quadruped adapter](../../art/body-graph/quadruped.js), [gait](../../art/body-graph/gait.js), [family adapter](../../art/body-graph/families.js), [tail markings](../../art/body-graph/tail-markings.js). Generic graph sockets already support head, leg, wing, shell and tail; torso stations support varying bulk. Ordinary four legs/ears/tails must not all be listed as wholly absent just because a species adapter has not been made.

**Missing graph features / implementation distinction:** Low plantigrade limbs and circular tapered tail chains exist. Missing generic features: webbing between toes, per-axis tail cross-section (current tail points specify one radius), and head-local tiny round ears. Flattened tail is a true geometry-contract gap, distinct from existing ring/tip painting.

Ranked target priorities (for1866 owner; no hand-written-art fixes here):

1. Long low flowing body and neck.
2. Flattened muscular tapering tail.
3. Broad muzzle and short webbed feet.

## Generation provenance

Built-in `image_gen.imagegen`, new generation, 7 November 2026; no API/CLI fallback and no Commons photo supplied to the generator. One eight-cell PNG, unedited. Exact authored prompt below. Output model/version/seed were not exposed by the tool; do not infer them. File SHA256 and source filename are in [L1 evidence manifest](l1-evidence.json).

<details><summary>Exact generation prompt</summary>

Use case: photorealistic-natural. Asset: smooth-coated otter (Lutrogale perspicillata) skeleton anatomy target sheet for a game, NOT existing game art. Make one crisp 4-column by 2-row contact sheet on plain light grey background, no scenery. Eight separate whole animals, generous margins, no clipping. Top row adult smooth-coated otter; bottom row an independently walking, eyes-open otter pup (age0 target, not newborn). Columns: standing towards; walking towards; standing away; walking away. Camera for every panel is elevated looking DOWN 30 degrees, telephoto/near-orthographic, body broadside diagonal with 35-degree yaw toward or away from viewer; do not use eye-level or straight head-on portraits. Towards means muzzle visible; away means rump and back of head visible. No looking back in away panels. Natural smooth-coated otter anatomy: LONG low streamlined cylindrical brown torso with no pinched dog waist, very short strong plantigrade limbs with webbed feet, thick neck blends smoothly into flattened broad rounded head, blunt short muzzle prominent whisker pads and tiny rounded ears, smooth close chocolate-brown fur and paler cream throat. LONG thick muscular tail widens at root and tapers, flattened in vertical thickness (not a furry brush and not a beaver paddle). Stand and WALK ON LAND on all four feet, not swimming, not upright, not a sea otter. Kit relatively larger head, shorter muzzle, softer rounded body and shorter less full tail; do not miniaturize adult. Walking is one quiet terrestrial step, four anatomically correct limbs, no galloping. Natural fur and neutral soft light, documentary photographic realism. Small labels only: adult / pup; standing towards / walking towards / standing away / walking away. No costume, extra tails, jewelry, fantasy, illustration, cartoon, scale ruler or claims of measurement. Consistent adult anatomy across top row, consistent pup across bottom.

</details>

## Remaining / wake condition

Complete adult and mobile-young Commons visual checks, resolve the output cautions, then have the coordinator/1866 owner assess the target. Wake when the comparison photos are accessible without HTTP429, or root supplies cloud photo-review evidence. No graph implementation or switch-on until that review; old sprite critique omitted under the later skeleton-first ruling.

