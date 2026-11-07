# Raccoon: skeleton target

**Provisional checkpoint, 7 November 2026 — not READY.** Target: Procyon lotor. [Lane summary](l1-summary.md). No game or graph changes. Real photographs override generated anatomy.

## Reference evidence

![Generated raccoon adult and mobile-young targets](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/raccoon/target-v1.png)

[Full generated sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/raccoon/target-v1.png). Top row adult, bottom row mobile young (game level0); columns standing towards, walking towards, standing away, walking away. All animals whole in frame. 'Age0' is a game level, not a zoological age in days. All eight lane species use the shared quadruped levels0–3; null genome overrides inherit the template, they do not remove babies.

Camera source: [model3d.js](../../art/model3d.js), `PITCH=.52` radians (29.8° downward), `YAW.towards=.6`, `away=-.6` (±34.4°); [creatures3d.js](../../art/creatures3d.js) uses the renderer defaults unless a tool view is supplied. Prompt requests these angles with a telephoto/near-orthographic view. **Generated camera/framing is approximate, not numerically calibrated to the game's orthographic projection.** No real-game-size acceptance or new game capture is claimed.

**Output review:** Eight cells present. Fingers are visible but generated toe count/contacts are not reliable; do not trace them. The first adult looks excessively dome-backed and should be checked against real standing posture.

**Real-photo cross-check:** [Commons comparison photo](https://commons.wikimedia.org/wiki/File:Animal_locomotion._Raccoon._LCCN2016651904.jpg). Commons photographic locomotion plate located (Library of Congress,1887), not an illustration. Download returned HTTP429; it has not been visually inspected. It could later check footfalls and back profile, but cannot establish modern coat colour. Adult colour photo and kit comparison remain pending. Comparison photos are not committed or republished. The whole-lane age0/photo validation remains incomplete.

## Identifying checklist

1. Broad stocky torso with a rounded high rump.
2. Head held low ahead of an arched back.
3. Pointed muzzle under a dark transverse eye mask.
4. Small round pale-rimmed ears.
5. Short sturdy legs and plantigrade elongated hind feet.
6. Five slender finger-like foredigits, rather than a cat paw.
7. Medium bushy ringed tail, shorter than the red panda's.
8. Kit has rounder head and body and a shorter less full tail.

## Body plan for the graph

These are **provisional artist blockout ranges**, not biological measurements, not values measured from the generated image, and not replacements for Ed's game size model. L = nose tip to tail root in a neutral standing animal, excluding fur and tail. Head = occiput to nose; neck = occiput-to-withers visible span; leg entry = ground-to-withers height, not summed bone lengths. Perspective/coat/posture alter the visible ratios. Check against matched side photographs before locking them into the graph.

| Adult quantity | Ratio to L |
|---|---|
| Ground-to-withers | 0.30–0.42 |
| Head length | 0.22–0.28 |
| Visible neck span | 0.06–0.12 |
| Tail root to tip | 0.40–0.55 |

Mass profile: Rump and central trunk dominate; forequarters are lower. Keep the wrists and hands small relative to body mass rather than inflating them into bear paws.

Young target: use the checklist's age difference as a starting point; increase relative head/paw size, shorten muzzle/trunk and retain species-specific ear/tail character. **No numeric juvenile ratio is asserted without a real juvenile photo.** Do not obtain the baby only by uniform adult scaling. Levels1–3's design-specific ornaments are outside this anatomy sheet; retain the existing genome's intent for a later graph review.

## Shared graph handoff

Audit pinned to prototype `524b0acaa`, not the unmerged live1866 candidate. Sources: [graph contract](../../art/body-graph/graph.js), [quadruped adapter](../../art/body-graph/quadruped.js), [gait](../../art/body-graph/gait.js), [family adapter](../../art/body-graph/families.js), [tail markings](../../art/body-graph/tail-markings.js). Generic graph sockets already support head, leg, wing, shell and tail; torso stations support varying bulk. Ordinary four legs/ears/tails must not all be listed as wholly absent just because a species adapter has not been made.

**Missing graph features / implementation distinction:** Plantigrade family, curved spine stations and tail rings already exist. Missing generic controls: five articulated/splayed foredigits, differentiated long hind sole versus forehand, head-parented round ears. Generic foot ellipsoids cannot supply recognisable raccoon hands alone. Rings are a tuning/adapter task, not a missing shared primitive.

Ranked target priorities (for1866 owner; no hand-written-art fixes here):

1. Rump-high low-headed mass profile.
2. Distinct forehands and elongated hind feet.
3. Mask and moderate ringed tail.

## Generation provenance

Built-in `image_gen.imagegen`, new generation, 7 November 2026; no API/CLI fallback and no Commons photo supplied to the generator. One eight-cell PNG, unedited. Exact authored prompt below. Output model/version/seed were not exposed by the tool; do not infer them. File SHA256 and source filename are in [L1 evidence manifest](l1-evidence.json).

<details><summary>Exact generation prompt</summary>

Use case: photorealistic-natural. Asset: raccoon (Procyon lotor) skeleton anatomy target sheet for a game, NOT existing game art. Make one crisp 4-column by 2-row contact sheet on plain light grey background, no scenery. Eight separate whole animals, generous margins, no clipping. Top row adult raccoon; bottom row an independently walking, eyes-open raccoon kit (age0 target, not newborn). Columns: standing towards; walking towards; standing away; walking away. Camera for every panel is elevated looking DOWN 30 degrees, telephoto/near-orthographic, body broadside diagonal with 35-degree yaw toward or away from viewer; do not use eye-level or straight head-on portraits. Towards means muzzle visible; away means rump and back of head visible. No looking back in away panels. Natural raccoon anatomy: stocky grey-brown body, rounded high rump/arched back, head carried low, pointed muzzle, small rounded ears with pale rims, clear black eye mask, medium bushy tail with dark rings, short sturdy plantigrade limbs and five separate slender finger-like toes on forepaws. A raccoon not a red panda or fox, NO upright triangular ears. Kit relatively larger head, shorter muzzle, smaller round body, short less full ringed tail; do not miniaturize adult. Walking is one quiet terrestrial step, four anatomically correct limbs, no galloping. Natural fur and neutral soft light, documentary photographic realism. Small labels only: adult / kit; standing towards / walking towards / standing away / walking away. No costume, extra tails, jewelry, fantasy, illustration, cartoon, scale ruler or claims of measurement. Consistent adult anatomy across top row, consistent kit across bottom.

</details>

## Remaining / wake condition

Complete adult and mobile-young Commons visual checks, resolve the output cautions, then have the coordinator/1866 owner assess the target. Wake when the comparison photos are accessible without HTTP429, or root supplies cloud photo-review evidence. No graph implementation or switch-on until that review; old sprite critique omitted under the later skeleton-first ruling.

