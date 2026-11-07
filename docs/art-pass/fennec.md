# Fennec fox: skeleton target

**Provisional checkpoint, 7 November 2026 — not READY.** Target: Vulpes zerda. [Lane summary](l1-summary.md). No game or graph changes. Real photographs override generated anatomy.

## Reference evidence

![Generated fennec fox adult and mobile-young targets](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/fennec/target-v1.png)

[Full generated sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/fennec/target-v1.png). Top row adult, bottom row mobile young (game level0); columns standing towards, walking towards, standing away, walking away. All animals whole in frame. 'Age0' is a game level, not a zoological age in days. All eight lane species use the shared quadruped levels0–3; null genome overrides inherit the template, they do not remove babies.

Camera source: [model3d.js](../../art/model3d.js), `PITCH=.52` radians (29.8° downward), `YAW.towards=.6`, `away=-.6` (±34.4°); [creatures3d.js](../../art/creatures3d.js) uses the renderer defaults unless a tool view is supplied. Prompt requests these angles with a telephoto/near-orthographic view. **Generated camera/framing is approximate, not numerically calibrated to the game's orthographic projection.** No real-game-size acceptance or new game capture is claimed.

**Output review:** Eight cells present. Ear scale is intentionally dominant but symmetry and the sharp dark tail tip are generated simplifications. Do not accept these proportions until compared with the real animal.

**Real-photo cross-check:** [Commons comparison photo](https://commons.wikimedia.org/wiki/File:Fennec_Fox_Vulpes_zerda.jpg). Photo page and photographer provenance located (Drew Avery, Norfolk Zoo). Direct photo retrieval returned HTTP429; no visual comparison claimed. A second named Commons photo also returned429. Real-photo cross-check, including a kit, is pending. Comparison photos are not committed or republished. The whole-lane age0/photo validation remains incomplete.

## Identifying checklist

1. Very large broad-based upright ear cups dominate the outline.
2. Small delicate head with a fine pointed muzzle.
3. Light compact torso with a visible but moderate tuck.
4. Slim digitigrade legs, with fur covering the feet.
5. Pale sandy back and cream underside without red-fox black socks.
6. Long furry tail with a dark terminal tip.
7. Kit has a shorter muzzle and proportionally larger head; oversized ears must still attach anatomically.

## Body plan for the graph

These are **provisional artist blockout ranges**, not biological measurements, not values measured from the generated image, and not replacements for Ed's game size model. L = nose tip to tail root in a neutral standing animal, excluding fur and tail. Head = occiput to nose; neck = occiput-to-withers visible span; leg entry = ground-to-withers height, not summed bone lengths. Perspective/coat/posture alter the visible ratios. Check against matched side photographs before locking them into the graph.

| Adult quantity | Ratio to L |
|---|---|
| Ground-to-withers | 0.42–0.52 |
| Head length | 0.23–0.28 |
| Visible neck span | 0.10–0.15 |
| Tail root to tip | 0.55–0.70 |

Mass profile: Light chest and hips; most conspicuous upper volume is ear area, not a giant skull. Avoid a heavy red-fox body with rabbit ears pasted on.

Young target: use the checklist's age difference as a starting point; increase relative head/paw size, shorten muzzle/trunk and retain species-specific ear/tail character. **No numeric juvenile ratio is asserted without a real juvenile photo.** Do not obtain the baby only by uniform adult scaling. Levels1–3's design-specific ornaments are outside this anatomy sheet; retain the existing genome's intent for a later graph review.

## Shared graph handoff

Audit pinned to prototype `524b0acaa`, not the unmerged live1866 candidate. Sources: [graph contract](../../art/body-graph/graph.js), [quadruped adapter](../../art/body-graph/quadruped.js), [gait](../../art/body-graph/gait.js), [family adapter](../../art/body-graph/families.js), [tail markings](../../art/body-graph/tail-markings.js). Generic graph sockets already support head, leg, wing, shell and tail; torso stations support varying bulk. Ordinary four legs/ears/tails must not all be listed as wholly absent just because a species adapter has not been made.

**Missing graph features / implementation distinction:** Triangular ears with width/height/depth and root angle exist in quadruped.js, so do not request 'add ears'. The generic graph still lacks a reusable head-parented pinna socket and articulated hock. A broad concave sail-like pinna and controlled inner/outer material boundary need validation beyond the existing four-face cup.

Ranked target priorities (for1866 owner; no hand-written-art fixes here):

1. Broad cupped ear geometry and roots.
2. Light body and fine muzzle.
3. Dark-tipped pale brush.

## Generation provenance

Built-in `image_gen.imagegen`, new generation, 7 November 2026; no API/CLI fallback and no Commons photo supplied to the generator. One eight-cell PNG, unedited. Exact authored prompt below. Output model/version/seed were not exposed by the tool; do not infer them. File SHA256 and source filename are in [L1 evidence manifest](l1-evidence.json).

<details><summary>Exact generation prompt</summary>

Use case: photorealistic-natural. Asset: fennec fox (Vulpes zerda) skeleton anatomy target sheet for a game, NOT existing game art. Make one crisp 4-column by 2-row contact sheet on plain light grey background, no scenery. Eight separate whole animals, generous margins, no clipping. Top row adult fennec fox; bottom row an independently walking, eyes-open fennec kit (age0 target, not newborn). Columns: standing towards; walking towards; standing away; walking away. Camera for every panel is elevated looking DOWN 30 degrees, telephoto/near-orthographic, body broadside diagonal with 35-degree yaw toward or away from viewer; do not use eye-level or straight head-on portraits. Towards means muzzle visible; away means rump and back of head visible. No looking back in away panels. Natural fennec anatomy: very small lightly built sand-coloured desert fox, enormous broad-based upright triangular cupped ears, slim pointed muzzle and tiny dark nose, pale cream body white underparts, fine digitigrade limbs with furry soles, long bushy tail with BLACK tip. Do not give it black red-fox socks. Ears remain anatomically attached, not rabbit ears. Kit relatively larger head, shorter muzzle, softer rounded body and shorter less full tail; do not miniaturize adult. Walking is one quiet terrestrial step, four anatomically correct limbs, no galloping. Natural fur and neutral soft light, documentary photographic realism. Small labels only: adult / kit; standing towards / walking towards / standing away / walking away. No costume, extra tails, jewelry, fantasy, illustration, cartoon, scale ruler or claims of measurement. Consistent adult anatomy across top row, consistent kit across bottom.

</details>

## Remaining / wake condition

Complete adult and mobile-young Commons visual checks, resolve the output cautions, then have the coordinator/1866 owner assess the target. Wake when the comparison photos are accessible without HTTP429, or root supplies cloud photo-review evidence. No graph implementation or switch-on until that review; old sprite critique omitted under the later skeleton-first ruling.

