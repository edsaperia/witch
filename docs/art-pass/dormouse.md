# Hazel dormouse target — graph target

Species scope: **dormouse** (Muscardinus avellanarius); L2, #1904. Target identity is inferred from the existing genome's natural cues, not a new gameplay/species decision. No hand-written-art fix or graph code is authorized here.

## Reference plate and provenance

![Generated adult/young towards/away standing/walking target](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/dormouse/target-v1.png)

Selected plate: [target-v1.png](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/dormouse/target-v1.png), SHA256 `3050ffb56e542fca7c3292a137891362f6f9cd771f8f7722579a3dedd3ace30d`. Generated 2026-11-07 with the built-in **image_gen.imagegen** tool (scientific-educational, photoreal target; model/version/seed not exposed). [Exact prompt](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/dormouse/prompt-v1.txt); [provenance](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/dormouse/provenance-v1.json). No Commons photo was input to imagegen or committed.

Eight cells: adult row1, mobile juvenile row2; columns standing-towards, standing-away, walking-towards, walking-away. Young represents game age0's mobile visual role, **not a literal neonate or scientifically verified age**. The game has young variants; many real neonatal mammals cannot stand/walk. Size ratios between generated cells are illustrative, not calibrated.

Camera target: art/model3d.js PITCH=.52rad (29.79° downward) and YAW={towards:.6,away:-.6}rad (±34.38°). Prompts approximate a long-lens affine-looking view. Generated heading, perspective, scale and foot contact are not constrained by the real renderer: some cells are more frontal/rearward, and v2 silhouettes can shift angle. **No pixel-exact game-camera match, game-size recognition verdict or actual motion cycle is claimed.**

## Real-photo comparison — real anatomy wins

[Commons comparison file: Haselmaus.JPG](https://commons.wikimedia.org/wiki/File:Haselmaus.JPG). Viewed locally for comparison only; not on either committed branch. The initially inspected Muscardinus_avellanarius_1.jpg is heavily obscured by branches and supports only golden coat/underside and climbing context, not tail or proportions. Haselmaus.JPG is the clearer comparison. Avoid the ambiguously labelled Muscardinus_avellanarius.jpg/wood-mouse redirect.

[Earlier obscured photo](https://commons.wikimedia.org/wiki/File:Muscardinus_avellanarius_1.jpg) was viewed but rejected for tail/proportion verification. Haselmaus.JPG clearly supports round eyes/ears, short muzzle, fur and climbing hands; tail remains outside useful view.

## Identifying checklist

1. Compact soft golden-brown trunk and pale underside.
2. Large round dark eyes and round ears.
3. Short blunt-to-tapered muzzle with prominent whiskers.
4. Long fully furred tail, not a naked mouse tail or squirrel fan.
5. Small grasping feet appropriate for climbing.
6. Narrow neck mostly buried in fur; no hamster cheek pouches.
7. Mobile kit: larger head/eyes, shorter muzzle and less full tail.

## Body plan and proportion targets

**L = nose to tail-base length in a neutral quadrupedal pose, excluding tail**, not the torso-only spine length. Head means muzzle tip to occiput; exposed neck is occiput-to-shoulder transition; limb reach means vertical shoulder/hip-to-ground in quiet stance, not summed bone lengths. Ratios below are **artist starting ranges inferred from general anatomy/photos, not specimen measurements, fitted genome values or universal biological bounds**. Adjust for pose and actual photo evidence.

Head 0.22–0.28; exposed neck0.03–0.07; standing limb reach0.16–0.24; tail0.70–1.00.

Rounded ribs and hips with soft seasonal fat, but retain a distinct neck-to-body taper and climbing limb articulation.

Age0 target: scale the whole animal down, then increase relative head/eye size and reduce muzzle/tail maturity as listed above; do not merely shrink an adult. These are qualitative age keys, not validated growth measurements. Preserve the natural four-limb body plan at every game age. Magical/legend adornments must not replace the identifiable natural silhouette; no new legendary concept is invented in this lane.

## Graph requirements and missing features

Reusable gripping digits and rounded-pinna assembly; furred cylindrical tail profile independent of squirrel plume. Seasonal fat is a torso parameter, not a new graph kind.

Capability audit is source-only: prototype524b0acaa has generic head/leg/wing/tail/shell sockets. Read-only #1866 headde27db5154a3e8b1aa94255263bd2601b92aec36 additionally has neck, parent attachments and static triangular membrane sockets. Thus **neck and membrane kinds are present**, not missing. Its leg foot is an ellipsoid (hoof can split); no explicit reusable digging-palm/digit, ear/tuft, spine-field or folded-patagium deformation contract was verified. Generic ellipsoids can block out some shapes; absence of a named semantic control does not prove geometry is impossible. Requests here are shared graph/family capabilities to confirm with1866, never a permission to patch old builders.

## Ranked targets and image QA

1. Furred long tail.
2. round eyes+ears.
3. soft compact mass.

v1 has the furred tail and rounded ears/eyes; the generated head/muzzle is rather mouse-like and paws are simplified. Written checklist overrides it where snout length or tail fullness drifts.

All selected plates were visually inspected for whole framing, adult/young rows and towards/away standing/walking coverage. A lifted paw is not gait validation; hidden far-side feet and exact digit counts are not certified. Generated-photo discrepancies are excluded from the graph specification by the checklist and real-photo priority. Optional shipped-art critique omitted: no shipped renderer run or native/4× acceptance was allocated; the later instruction supersedes that exhaustive review.

Review boundary: target note/reference output complete for coordinator review, with explicit uncertainties above. Species migration and likeness acceptance remain #1866/canonical/Ed decisions; no source, rig, render, registry, gameplay, text or default changed.
