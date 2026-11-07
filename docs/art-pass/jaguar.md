# Black jaguar: L3 graph target

7 November 2026. Species ID `jaguar`; Panthera onca, melanistic. Draft design reference for PR1906, source base524b0acaa43bb9975e7b2834ff9a55cbca4b3319. Ed judges the legend recommendation. No activation, implementation or claim that the current game passes.

## Reads-as target

Broad-headed, short-legged powerful black cat, faint rosettes in light.

- Broad round skull and heavy short muzzle/jaw
- Thick neck merging into muscular forequarters
- Stocky deep trunk and strong shoulders
- Short thick legs with broad paws
- Moderate long tail, neither bobtail nor snow-leopard plume
- Rounded small ears
- Broken rosettes with internal spots; melanistic coat keeps black-on-charcoal contrast

## Adult and mobile-young references

![Adult and mobile-young target sheet](https://raw.githubusercontent.com/edsaperia/witch/cf21dc94c118b95377e395f7e1fdec3d14c4db2e/previews/art-pass/jaguar/refs-v1.png)

Top row adult, bottom row mobile young/age0 target; columns standing towards, standing away, walking towards, walking away. Ages scaled independently: NOT a world-size comparison. Age0 means a mobile cub/kitten, not a newborn. Game levels remain0 baby/1 young/2 adult/3 legend. This does not redefine their biology or game sizes.

## Proportions and mass

Use L = nose to tail base (head-body length), excluding tail, mane and decorative fur. These are **artist starting ranges**, not measured zoological statistics, pixel measurements or acceptance thresholds. Perspective, pose, sex, subspecies and coat vary. Refine against multiple orthogonal photos before implementation.

| Quantity | Fraction of L |
|---|---|
| Exposed leg: ground to ventral trunk | .25–.35 |
| Head: occiput to nose | .19–.24 |
| Visible neck bridge | .09–.14 |
| Tail: base to tip along curve | .35–.55 |
| Ground to shoulder | .47–.60 |

Forehead/jaw/neck and forequarters carry substantial mass; deep ribcage with modest waist pinch. Hindquarters remain powerful, not a tiny rear attached to a huge head.

Young: Round large head, broad short muzzle and paws, softer short trunk. Dark rosettes remain visible under suitable light, not a featureless black silhouette.

Feline hindlegs are digitigrade: the visible backward hock is an ankle, not a backward knee. Preserve fore/hind distinction and paw support; a still generated frame does not prove a gait cycle.

## Photograph and anatomy cross-check

Tawny adult photo clearly shows broad head, heavy shoulders, short stout legs, tail and central-spotted rosettes. Cub photo shows rounded head and big paws but crouching distorts leg ratio. Both are NON-melanistic anatomy comparisons. Generated anatomy sheet is tawny too: shape/pattern reference only; current game target and all legend proposals are explicitly black.

- [adult: File:Standing jaguar.jpg](https://commons.wikimedia.org/wiki/File:Standing_jaguar.jpg) — viewed privately.
- [young: File:Jaguar cub with armadillo - DPLA - 9e700a29f0b5b62f4c4b78fbd979439d.jpg](https://commons.wikimedia.org/wiki/File:Jaguar_cub_with_armadillo_-_DPLA_-_9e700a29f0b5b62f4c4b78fbd979439d.jpg) — viewed privately.

[Expert species description](https://www.catsg.org/living-species-jaguar) supports the identifying traits; ratios above are our design estimates. Commons photos are comparison-only, kept private and never published in this PR or shots.

## Three legend concepts and existing comparison

Area/story: River jungle: dark wet loam, river banks, ferns/reeds, rainforest giants hung with lianas, mossed fallen giants (art/areas/river-jungle/recipe.js).

| Three new proposals, A/B/C left to right | Existing renderer comparison, ALL ages |
|---|---|
| ![Three legend concepts](https://raw.githubusercontent.com/edsaperia/witch/cf21dc94c118b95377e395f7e1fdec3d14c4db2e/previews/art-pass/jaguar/legends-v1.png) | ![Archived current-vs-graph diagnostic](https://raw.githubusercontent.com/edsaperia/witch/d00884c0b23532ce8ef35138fa90ee69da76cf72/previews/ed/creature-graph/cats-1/jaguar.png) |

The right-hand sheet is **archival**, source/served SHA aad8b13327282d13d7d6a4e2e1b28aa2acfd6b6c, fixture cats-1. Read its Current column, level3 row for the old legend; its graph column is NOT the target. It is not a capture of today's524b0ac source. Fresh exact-head legend evidence must be supplied by the canonical renderer before a current-vs-target verdict; no laptop browser was allocated or run.

- A Deep River Jaw — broad grey muzzle and jade/bronze throat torque.
- B Underwater Shadow — river-dark rosettes with tiny silver fish glints.
- C Fallen Giant — asymmetric worn root-shaped shoulder armour.

**Recommended B; signature element: River life within dark rosettes.** A hidden river appears in the coat of the river’s stealthy hunter. The massive low jaw and scarred old body remain primary; tiny fish glints add mystery rather than a uniform costume. A repeats ceremonial collars, C obscures shoulder anatomy.

Chosen legend checklist/body plan: Retain low muscular black body and crushing jaw. Place sparse fish-like glints inside rosette regions with sufficient contrast, never replace fur with literal aquarium panels. Grey muzzle, scarred brow, ears and full tail stay clear.

These are three concepts generated together in one sheet, not three independent calibrated render trials. Inspect all whole bodies and recognisability; labels identify proposals, not approved in-game names. Only Ed/coordinator can adopt a pick.

## Top three priorities and MISSING GRAPH FEATURES

Top three: broad head/jaw; stocky limbs; black-on-black rosettes.

Independent jaw/cheek landmarks under inherited head frame; shared coat-region mapping for subtle rosettes plus aged scar overlays. Existing rosette/tail paint already exists.

At the pinned source, `art/body-graph/graph.js` has head/leg/wing/tail/shell sockets, torso spine stations, head ellipsoid, two-bone digitigrade legs and a foot ellipsoid. `quadruped.js` already has torso profile/flex, pointed-ear cup helpers and region patterns; `families.js` has feline adapter; `tail-markings.js` already supports rings/spots/rosettes/tip paint. `gait.js` has a two-bone straight-line diagnostic solve. Do NOT request basic tails, all ears, all patterns or all gait as wholly absent. Missing contract: rotating station frames/socket-to-socket attachments (explicit future work), nested head/foot-local feature inheritance, age-linked fur/tuft/accessory attachment data and scar/weathering regions. Legacy features may draw these today; this is a request for shared graph representation, not a demand for handwritten species fixes. Refer implementation to graph owner#1866.

## Provenance and limits

Built-in `image_gen.imagegen`, 7 November2026; no model identifier/seed reported. Text-only generation, no source photograph supplied as input. Anatomy prompts ask photorealism; legends use sculptural concept art. Actual camera source `art/model3d.js`: pitch0.52rad (29.8° down), yaw±0.6rad (34.4°). Tool output only approximates this; no camera calibration, native-size rendering, pixel-diff, locomotion/contact or graph-fit proof. All selected generated sheets were visually inspected for panel/age/pose coverage and complete animals; natural occlusion remains.

Tawny generated base sheet intentionally not a final colour target; no native-size proof that fish glints survive.

### Exact anatomy generation prompt

```text
Scientific-educational PHOTOREAL whole-animal anatomy contact sheet, eight equal panels, two rows of four. Plain warm off-white studio floor/background, soft neutral daylight, no objects/text/labels/collars. Camera approximately29.8 degrees looking down, long-lens orthographic-like, animal long axis34.4 degrees toward or away from side-on. Top row same ADULT: stand towards, stand away, slow natural walk towards, slow natural walk away. Bottom row same MOBILE YOUNG in identical order. Every animal entirely inside its own panel with ample padding including every paw/ear/tail; no crop. Four anatomically correct legs, digitigrade feline paws/hocks, clear weight-bearing slow-walk stance. No stylization, human expression, or distorted/extra limbs. Scale each age independently for anatomical inspection; not a size comparison. JAGUAR (Panthera onca), not leopard. Adult heavily muscled stocky compact trunk, very broad short-muzzled powerful head and jaws, thick neck, stout relatively short limbs and large round paws, relatively short thick tail. Tawny coat with large irregular broken rosettes containing small central black dots, spots on head/legs. Young approximately3-month mobile cub, broad large head, compact soft fuzzy torso and sturdy large paws, short muzzle, retained rosettes, smaller proportional limbs. Do not use long slim leopard torso or extra-long tail.
```

### Exact legend generation prompt

```text
Concept art comparison sheet, THREE distinctly DIFFERENT legendary creature proposals in THREE equal columns labelled A, B, C only. One WHOLE creature per column, ears paws tail entirely visible with generous margin, plain warm ivory studio background and ground shadow, no scenery or extra animals. Approximate Witch GAME camera elevation29.8deg looking down, long-lens orthographic-like, body34.4deg toward camera from side-on. All are ancient powerful wise elders, animal's defining nature exaggerated into magic, still recognisably that exact species. Painterly sculptural concept art with bold coherent silhouettes, restrained palette/large readable shapes, not a UI/game sprite or calibrated render. Strong anatomy and natural quadruped standing or slow deliberate walking, no gore; healed scars only. Each concept its OWN idea, not uniform accessory swaps. MELANISTIC BLACK JAGUAR, very broad head and heavy crushing jaw, stocky short powerful limbs, long moderate tail, rosettes faint black-on-charcoal. River jungle: dark wet loam, rainforest giants lianas, fallen mossed logs over river. A: Deep River Jaw, broad greying scarred muzzle and huge blunt jaw, weathered jade-and-bronze throat torque bearing river worn tooth-shaped pendants; faint water-caustic rosettes on BLACK fur, no water background. B: Underwater Shadow, black jaguar with ancient pale scars and glassy river-dark rosettes containing tiny silver fish-shaped glints, oversized broad paws, no wings. C: Fallen Giant, huge low black jaguar with one asymmetric eroded bronze shoulder guard shaped like root buttress, old broken canine visible, algae-green bead at throat; no trees on back.
```

See [L3 summary](l3-summary.md) for evidence hashes, shared gaps and remaining checks.
