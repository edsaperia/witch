# Cheetah: L3 graph target

7 November 2026. Species ID `cheetah`; Acinonyx jubatus. Draft design reference for PR1906, source base524b0acaa43bb9975e7b2834ff9a55cbca4b3319. Ed judges the legend recommendation. No activation, implementation or claim that the current game passes.

## Reads-as target

Small-headed, long-legged sprinting cat with deep chest and tucked waist.

- Very deep but narrow chest
- Extreme abdominal tuck behind ribs
- Long thin digitigrade legs
- Small round head and short muzzle on visible neck
- Solid separated black spots, never rosettes
- Dark tear lines from eyes to mouth
- Long balancing tail with distal rings
- Young silver-grey dorsal mantle distinct from adult

## Adult and mobile-young references

![Adult and mobile-young target sheet](https://raw.githubusercontent.com/edsaperia/witch/cf21dc94c118b95377e395f7e1fdec3d14c4db2e/previews/art-pass/cheetah/refs-v1.png)

Top row adult, bottom row mobile young/age0 target; columns standing towards, standing away, walking towards, walking away. Ages scaled independently: NOT a world-size comparison. Age0 means a mobile cub/kitten, not a newborn. Game levels remain0 baby/1 young/2 adult/3 legend. This does not redefine their biology or game sizes.

## Proportions and mass

Use L = nose to tail base (head-body length), excluding tail, mane and decorative fur. These are **artist starting ranges**, not measured zoological statistics, pixel measurements or acceptance thresholds. Perspective, pose, sex, subspecies and coat vary. Refine against multiple orthogonal photos before implementation.

| Quantity | Fraction of L |
|---|---|
| Exposed leg: ground to ventral trunk | .38–.50 |
| Head: occiput to nose | .13–.18 |
| Visible neck bridge | .12–.19 |
| Tail: base to tip along curve | .55–.75 |
| Ground to shoulder | .60–.75 |

Deep thorax seen from the side but narrow front; minimal belly volume behind it, elastic loin and strong lean hindquarters. Do not inflate limbs to panther bulk.

Young: Mobile cub has large head, short immature limbs and pale long mantle across crown/back; dark fuzzy spotted sides. Age0 mantle is a new fur shape, not just adult scaling.

Feline hindlegs are digitigrade: the visible backward hock is an ankle, not a backward knee. Preserve fore/hind distinction and paw support; a still generated frame does not prove a gait cycle.

## Photograph and anatomy cross-check

Adult photo is sitting in tall grass: useful small head/round ears/tears/spots, NOT evidence for full limb lengths. Cub photo is reclining with grass occlusion: face and spotted coat visible, mantle cannot be fully measured. Expert description supports diagnostic build. Generated mantle is clear; anatomy ratios remain design estimates.

- [adult: File:Cheetah Standing Tall.jpg](https://commons.wikimedia.org/wiki/File:Cheetah_Standing_Tall.jpg) — viewed privately.
- [young: File:Cheetah (Acinonyx jubatus) cub.jpg](https://commons.wikimedia.org/wiki/File:Cheetah_(Acinonyx_jubatus)_cub.jpg) — viewed privately.

[Expert species description](https://www.catsg.org/living-species-cheetah) supports the identifying traits; ratios above are our design estimates. Commons photos are comparison-only, kept private and never published in this PR or shots.

## Three legend concepts and existing comparison

Area/story: Plains: short gold-green grass, whistling thorns, grass tufts, small termite mounds and a cluster of tall mounds (art/areas/plains/recipe.js).

| Three new proposals, A/B/C left to right | Existing renderer comparison, ALL ages |
|---|---|
| ![Three legend concepts](https://raw.githubusercontent.com/edsaperia/witch/cf21dc94c118b95377e395f7e1fdec3d14c4db2e/previews/art-pass/cheetah/legends-v1.png) | ![Archived current-vs-graph diagnostic](https://raw.githubusercontent.com/edsaperia/witch/d00884c0b23532ce8ef35138fa90ee69da76cf72/previews/ed/creature-graph/cats-1/cheetah.png) |

The right-hand sheet is **archival**, source/served SHA aad8b13327282d13d7d6a4e2e1b28aa2acfd6b6c, fixture cats-1. Read its Current column, level3 row for the old legend; its graph column is NOT the target. It is not a capture of today's524b0ac source. Fresh exact-head legend evidence must be supplied by the canonical renderer before a current-vs-target verdict; no laptop browser was allocated or run.

- A Horizon Runner — lit tear lines trail as two narrow wind filaments.
- B Wind Rudder — exaggerated curved fur tail with small bronze rings.
- C Last Sprint — silver mantle and faint leg afterimages.

**Recommended A; signature element: Wind trailing from tear lines.** The tear marks and plains speed become one animal-specific magical cue. A scarred narrow frame retains the cheetah’s nature without a common flame crest. B overwhelms the body with tail, C partly repeats juvenile mantle.

Chosen legend checklist/body plan: Retain thin limbs/deep narrow chest and tiny head. Extend two cheek tear regions into short trailing curves, readable from towards/away. Keep them clear of eyes and avoid a second full creature or extra legs. Pale muzzle and few healed scars supply age.

These are three concepts generated together in one sheet, not three independent calibrated render trials. Inspect all whole bodies and recognisability; labels identify proposals, not approved in-game names. Only Ed/coordinator can adopt a pick.

## Top three priorities and MISSING GRAPH FEATURES

Top three: deep narrow chest/tuck; thin long limbs; small tear-marked head.

Age-specific dorsal fur envelope and head-local tear marking regions; extra scapula/hock/foot articulation beyond two-bone diagnostic is a capability request, not a gait fix here.

At the pinned source, `art/body-graph/graph.js` has head/leg/wing/tail/shell sockets, torso spine stations, head ellipsoid, two-bone digitigrade legs and a foot ellipsoid. `quadruped.js` already has torso profile/flex, pointed-ear cup helpers and region patterns; `families.js` has feline adapter; `tail-markings.js` already supports rings/spots/rosettes/tip paint. `gait.js` has a two-bone straight-line diagnostic solve. Do NOT request basic tails, all ears, all patterns or all gait as wholly absent. Missing contract: rotating station frames/socket-to-socket attachments (explicit future work), nested head/foot-local feature inheritance, age-linked fur/tuft/accessory attachment data and scar/weathering regions. Legacy features may draw these today; this is a request for shared graph representation, not a demand for handwritten species fixes. Refer implementation to graph owner#1866.

## Provenance and limits

Built-in `image_gen.imagegen`, 7 November2026; no model identifier/seed reported. Text-only generation, no source photograph supplied as input. Anatomy prompts ask photorealism; legends use sculptural concept art. Actual camera source `art/model3d.js`: pitch0.52rad (29.8° down), yaw±0.6rad (34.4°). Tool output only approximates this; no camera calibration, native-size rendering, pixel-diff, locomotion/contact or graph-fit proof. All selected generated sheets were visually inspected for panel/age/pose coverage and complete animals; natural occlusion remains.

Full-body real-photo limb cross-check remains weaker than head/coat evidence; no calibrated stride review.

### Exact anatomy generation prompt

```text
Scientific-educational PHOTOREAL whole-animal anatomy contact sheet, eight equal panels, two rows of four. Plain warm off-white studio floor/background, soft neutral daylight, no objects/text/labels/collars. Camera approximately29.8 degrees looking down, long-lens orthographic-like, animal long axis34.4 degrees toward or away from side-on. Top row same ADULT: stand towards, stand away, slow natural walk towards, slow natural walk away. Bottom row same MOBILE YOUNG in identical order. Every animal entirely inside its own panel with ample padding including every paw/ear/tail; no crop. Four anatomically correct legs, digitigrade feline paws/hocks, clear weight-bearing slow-walk stance. No stylization, human expression, or distorted/extra limbs. Scale each age independently for anatomical inspection; not a size comparison. CHEETAH (Acinonyx jubatus), not leopard. Adult tall long thin legs, small rounded head, narrow chest front but deep thorax, very tucked abdomen, flexible slim body, long balancing tail, small rounded ears, amber coat with separate solid black spots, sharp dark tear lines eye-to-mouth. Young approximately8-week mobile cub with conspicuous long grey-silver dorsal mantle from crown/neck over back contrasting dark fuzzy spotted sides, large head and short immature legs, not an adult scaled down. No rosettes and no muscular lion build.
```

### Exact legend generation prompt

```text
Concept art comparison sheet, THREE distinctly DIFFERENT legendary creature proposals in THREE equal columns labelled A, B, C only. One WHOLE creature per column, ears paws tail entirely visible with generous margin, plain warm ivory studio background and ground shadow, no scenery or extra animals. Approximate Witch GAME camera elevation29.8deg looking down, long-lens orthographic-like, body34.4deg toward camera from side-on. All are ancient powerful wise elders, animal's defining nature exaggerated into magic, still recognisably that exact species. Painterly sculptural concept art with bold coherent silhouettes, restrained palette/large readable shapes, not a UI/game sprite or calibrated render. Strong anatomy and natural quadruped standing or slow deliberate walking, no gore; healed scars only. Each concept its OWN idea, not uniform accessory swaps. CHEETAH, long thin legs, small round head, deep narrow chest, extremely tucked waist, long ringed rudder tail, SOLID BLACK SPOTS and dark tear lines. Open short gold-green plains, whistling thorns and termite mounds. A: Horizon Runner, ancient lean scarred cheetah whose tear lines extend as two long narrow amber wind filaments backwards from cheeks, subtle duststream under slender legs, pale muzzle, all body visible. B: Wind Rudder, long ringed tail exaggerated into one slender twisting aerodynamic ribbon OF FUR, worn tip with tiny wind-carved bronze rings, no fabric wings. C: Last Sprint, old cheetah with pale silver spine crest echoing cub mantle, three faint offset LEG afterimages at paws only, gold dust underfoot, keep single solid trunk. No leopard rosettes, bulky lion body or wings.
```

See [L3 summary](l3-summary.md) for evidence hashes, shared gaps and remaining checks.
