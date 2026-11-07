# Lion: L3 graph target

7 November 2026. Species ID `lion`; Panthera leo. Draft design reference for PR1906, source base524b0acaa43bb9975e7b2834ff9a55cbca4b3319. Ed judges the legend recommendation. No activation, implementation or claim that the current game passes.

## Reads-as target

Powerful tawny cat, adult male mane and narrow tuft-ended tail.

- Powerful deep forequarters and substantial paws
- Adult male mane forms fur around skull/neck, not enlarged skull
- Short broad feline muzzle and round ears partly exposed
- Tawny trunk with modest waist tuck
- Long narrow tail ending in dark tuft
- Cub has spots and lacks mature mane
- Hindquarters muscular but less visually heavy than maned front

## Adult and mobile-young references

![Adult and mobile-young target sheet](https://raw.githubusercontent.com/edsaperia/witch/cf21dc94c118b95377e395f7e1fdec3d14c4db2e/previews/art-pass/lion/refs-v1.png)

Top row adult, bottom row mobile young/age0 target; columns standing towards, standing away, walking towards, walking away. Ages scaled independently: NOT a world-size comparison. Age0 means a mobile cub/kitten, not a newborn. Game levels remain0 baby/1 young/2 adult/3 legend. This does not redefine their biology or game sizes.

## Proportions and mass

Use L = nose to tail base (head-body length), excluding tail, mane and decorative fur. These are **artist starting ranges**, not measured zoological statistics, pixel measurements or acceptance thresholds. Perspective, pose, sex, subspecies and coat vary. Refine against multiple orthogonal photos before implementation.

| Quantity | Fraction of L |
|---|---|
| Exposed leg: ground to ventral trunk | .30–.40 |
| Head: occiput to nose | .17–.22 |
| Visible neck bridge | .10–.17 |
| Tail: base to tip along curve | .40–.60 |
| Ground to shoulder | .53–.66 |

Separate skeletal skull/chest from mane volume. Chest/shoulder mass is strong, abdomen tapers and hips retain support. Adult male is selected because the current genome is maned; not a claim that all adult lions have manes.

Young: Spotted cub, shorter muzzle/legs, larger head and paws. No adult mane; young stage may gain small ruff before full male mane.

Feline hindlegs are digitigrade: the visible backward hock is an ankle, not a backward knee. Preserve fore/hind distinction and paw support; a still generated frame does not prove a gait cycle.

## Photograph and anatomy cross-check

Adult male reclining photo confirms mane/face/round ears but hides weight-bearing stance and full tail. Standing cub photo confirms spots, big paws, round ears, short muzzle and narrow tail. Generated adult male/cub contrast is clear; do not infer common world scale from separate rows.

- [adult: File:Lion waiting in Namibia.jpg](https://commons.wikimedia.org/wiki/File:Lion_waiting_in_Namibia.jpg) — viewed privately.
- [young: File:Lion Cub (2404649731).jpg](https://commons.wikimedia.org/wiki/File:Lion_Cub_(2404649731).jpg) — viewed privately.

[Expert species description](https://www.catsg.org/living-species-lions) supports the identifying traits; ratios above are our design estimates. Commons photos are comparison-only, kept private and never published in this PR or shots.

## Three legend concepts and existing comparison

Area/story: Savanna: tall gold grass, thorn scrub, acacias, baobabs and sun-warmed boulder kopje (art/areas/savanna/recipe.js).

| Three new proposals, A/B/C left to right | Existing renderer comparison, ALL ages |
|---|---|
| ![Three legend concepts](https://raw.githubusercontent.com/edsaperia/witch/cf21dc94c118b95377e395f7e1fdec3d14c4db2e/previews/art-pass/lion/legends-v1.png) | ![Archived current-vs-graph diagnostic](https://raw.githubusercontent.com/edsaperia/witch/d00884c0b23532ce8ef35138fa90ee69da76cf72/previews/ed/creature-graph/cats-1/lion.png) |

The right-hand sheet is **archival**, source/served SHA aad8b13327282d13d7d6a4e2e1b28aa2acfd6b6c, fixture cats-1. Read its Current column, level3 row for the old legend; its graph column is NOT the target. It is not a capture of today's524b0ac source. Fresh exact-head legend evidence must be supplied by the canonical renderer before a current-vs-target verdict; no laptop browser was allocated or run.

- A Noon Elder — ragged sun-disc of coarse glowing mane hair.
- B Kopje King — worn votive clasps in a heavy dark mane.
- C Drought Rememberer — bleached seed-braided mane and coal-like tail tuft.

**Recommended A; signature element: Sun within ragged mane.** The lion’s existing mane becomes sun-warmed savanna power. Scars, chipped tooth and old face carry epochs rather than a new generic back crest. The glow belongs within mane hair; keep it distinct from literal loose flames.

Chosen legend checklist/body plan: Broaden layered mane around neck/shoulders without swallowing face/ears. Keep long narrow black-tufted tail, paws and tawny flank exposed. Put light into large inner mane clusters; outer hair stays weathered and irregular.

These are three concepts generated together in one sheet, not three independent calibrated render trials. Inspect all whole bodies and recognisability; labels identify proposals, not approved in-game names. Only Ed/coordinator can adopt a pick.

## Top three priorities and MISSING GRAPH FEATURES

Top three: mane distinct from skull; forequarters; tuft-ended tail.

Layered head/neck fur envelopes and graph-native tail-tip tuft attachment, age-linked mane/ruff regions. Existing primitives/legacy mane do not imply graph-native inheritance.

At the pinned source, `art/body-graph/graph.js` has head/leg/wing/tail/shell sockets, torso spine stations, head ellipsoid, two-bone digitigrade legs and a foot ellipsoid. `quadruped.js` already has torso profile/flex, pointed-ear cup helpers and region patterns; `families.js` has feline adapter; `tail-markings.js` already supports rings/spots/rosettes/tip paint. `gait.js` has a two-bone straight-line diagnostic solve. Do NOT request basic tails, all ears, all patterns or all gait as wholly absent. Missing contract: rotating station frames/socket-to-socket attachments (explicit future work), nested head/foot-local feature inheritance, age-linked fur/tuft/accessory attachment data and scar/weathering regions. Legacy features may draw these today; this is a request for shared graph representation, not a demand for handwritten species fixes. Refer implementation to graph owner#1866.

## Provenance and limits

Built-in `image_gen.imagegen`, 7 November2026; no model identifier/seed reported. Text-only generation, no source photograph supplied as input. Anatomy prompts ask photorealism; legends use sculptural concept art. Actual camera source `art/model3d.js`: pitch0.52rad (29.8° down), yaw±0.6rad (34.4°). Tool output only approximates this; no camera calibration, native-size rendering, pixel-diff, locomotion/contact or graph-fit proof. All selected generated sheets were visually inspected for panel/age/pose coverage and complete animals; natural occlusion remains.

No claim of female variant coverage or accurate physical sunlight simulation.

### Exact anatomy generation prompt

```text
Scientific-educational PHOTOREAL whole-animal anatomy reference contact sheet; eight equal panels, two rows of four. Clean off-white studio ground/background, soft even daylight, no objects, no text or labels. Approximate game camera: elevation29.8 degrees looking down, long-lens orthographic-like perspective, long body axis34.4 degrees toward/away from side-on. TOP ROW SAME ADULT: standing towards, standing away, slow walking towards, slow walking away. BOTTOM ROW SAME MOBILE YOUNG: identical four poses/order. Exactly one animal in each panel, four anatomically correct digitigrade legs and clear natural slow-walk paw placement. Whole body, every ear/paw and ENTIRE TAIL including tip in frame with generous padding; no cropping or tail hidden behind body: gently sweep tail outward where needed. Adult/young scaled independently for inspection, not direct size comparison. Neutral natural expression, no stylization, no collars, no extra limbs. LION (Panthera leo): adult male with full natural tawny-to-dark-brown mane framing cheeks, throat, shoulders and chest; mane is hair over a muscular feline skeleton, not a circular rigid head or bear hump. Tawny powerful long trunk, deep chest, stout long legs, broad round paws, small rounded ears visible in mane, long slender tail ending in distinct dark hair tuft, muzzle short and broad. Young3-month mobile lion cub has NO adult mane, proportionately large round head, rounded ears, short muzzle and broad paws, softly spotted tawny coat with subtle juvenile spots, thin tail with emerging small dark tuft. Preserve tail length and slender shaft; not a jaguar cub coat and not a domestic kitten.
```

### Exact legend generation prompt

```text
Concept art comparison sheet, THREE distinctly DIFFERENT legendary creature proposals in THREE equal columns labelled A, B, C only. One WHOLE creature per column, ears paws tail entirely visible with generous margin, plain warm ivory studio background and ground shadow, no scenery or extra animals. Approximate Witch GAME camera elevation29.8deg looking down, long-lens orthographic-like, body34.4deg toward camera from side-on. All are ancient powerful wise elders, animal's defining nature exaggerated into magic, still recognisably that exact species. Painterly sculptural concept art with bold coherent silhouettes, restrained palette/large readable shapes, not a UI/game sprite or calibrated render. Strong anatomy and natural quadruped standing or slow deliberate walking, no gore; healed scars only. Each concept its OWN idea, not uniform accessory swaps. ADULT MALE LION, massive tawny forequarters, true round ears, enormous mane, long narrow tail BLACK TUFT at end. Savanna tall gold grass, thorn scrub, flat acacias, baobabs and sun-warmed boulder kopje. A: Noon Elder, ancient lion mane transformed into broad ragged sun-disc of coarse tawny/gold hair, dark weathered face, one chipped canine and pale old scars, emberlike light deep WITHIN mane, not rows of flames on spine. B: Kopje King, heavy scarred lion wearing three asymmetrical worn sandstone/bronze mane clasps like votive tokens, pale chin, huge paws; no human crown or giant armour suit. C: Drought Rememberer, lion with long bleached mane braided in a few places with dry grass and seed offerings, tail tuft glowing like last coal, wise tired amber eyes. Keep powerful feline body and full tail.
```

See [L3 summary](l3-summary.md) for evidence hashes, shared gaps and remaining checks.
