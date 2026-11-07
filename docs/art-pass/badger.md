# European badger: skeleton target

**Provisional checkpoint, 7 November 2026 — not READY.** Target: Meles meles. [Lane summary](l1-summary.md). No game or graph changes. Real photographs override generated anatomy.

## Reference evidence

![Generated european badger adult and mobile-young targets](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/badger/target-v1.png)

[Full generated sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/badger/target-v1.png). Top row adult, bottom row mobile young (game level0); columns standing towards, walking towards, standing away, walking away. All animals whole in frame. 'Age0' is a game level, not a zoological age in days. All eight lane species use the shared quadruped levels0–3; null genome overrides inherit the template, they do not remove babies.

Camera source: [model3d.js](../../art/model3d.js), `PITCH=.52` radians (29.8° downward), `YAW.towards=.6`, `away=-.6` (±34.4°); [creatures3d.js](../../art/creatures3d.js) uses the renderer defaults unless a tool view is supplied. Prompt requests these angles with a telephoto/near-orthographic view. **Generated camera/framing is approximate, not numerically calibrated to the game's orthographic projection.** No real-game-size acceptance or new game capture is claimed.

**Output review:** Eight cells present. The generated adult is too high-backed and leggy to be accepted as the final low badger target; the textual low-body checklist takes precedence. Generated claws also need a real-photo check. This is provisional evidence, not an approved shape.

**Real-photo cross-check:** [Commons comparison photo](https://commons.wikimedia.org/wiki/File:European_Badger_-_Meles_meles_(52261502699).jpg). Real-photo page and provenance located (Caroline Legg, Dumfries & Galloway). Photo retrieval returned HTTP429; no visual comparison claimed. Adult posture and mobile cub proportions still need checking. Comparison photos are not committed or republished. The whole-lane age0/photo validation remains incomplete.

## Identifying checklist

1. Low broad elongated body, not a short bear barrel.
2. Strong shoulders and very short robust legs.
3. Long low wedge muzzle and small nose.
4. Two black longitudinal head stripes through the eyes to ears, not a raccoon mask.
5. Small rounded pale-rimmed ears.
6. Short inconspicuous tail.
7. Large digging forefeet with long pale claws.
8. Cub is softer and rounder-headed with a shorter wedge.

## Body plan for the graph

These are **provisional artist blockout ranges**, not biological measurements, not values measured from the generated image, and not replacements for Ed's game size model. L = nose tip to tail root in a neutral standing animal, excluding fur and tail. Head = occiput to nose; neck = occiput-to-withers visible span; leg entry = ground-to-withers height, not summed bone lengths. Perspective/coat/posture alter the visible ratios. Check against matched side photographs before locking them into the graph.

| Adult quantity | Ratio to L |
|---|---|
| Ground-to-withers | 0.22–0.32 |
| Head length | 0.25–0.32 |
| Visible neck span | 0.05–0.10 |
| Tail root to tip | 0.12–0.20 |

Mass profile: Broad muscular shoulder girdle and long low trunk. Back is restrained rather than a giant dome; belly stays near the ground without hiding every foot.

Young target: use the checklist's age difference as a starting point; increase relative head/paw size, shorten muzzle/trunk and retain species-specific ear/tail character. **No numeric juvenile ratio is asserted without a real juvenile photo.** Do not obtain the baby only by uniform adult scaling. Levels1–3's design-specific ornaments are outside this anatomy sheet; retain the existing genome's intent for a later graph review.

## Shared graph handoff

Audit pinned to prototype `524b0acaa`, not the unmerged live1866 candidate. Sources: [graph contract](../../art/body-graph/graph.js), [quadruped adapter](../../art/body-graph/quadruped.js), [gait](../../art/body-graph/gait.js), [family adapter](../../art/body-graph/families.js), [tail markings](../../art/body-graph/tail-markings.js). Generic graph sockets already support head, leg, wing, shell and tail; torso stations support varying bulk. Ordinary four legs/ears/tails must not all be listed as wholly absent just because a species adapter has not been made.

**Missing graph features / implementation distinction:** Plantigrade legs, low torso profiles and stub tails exist. Missing generic graph controls: broad separate forefeet with directional digging claws, head-local ear attachments, and anisotropic shoulder/neck transitions. Legacy claw decoration is not proof that generic compiled feet carry claws correctly through gait.

Ranked target priorities (for1866 owner; no hand-written-art fixes here):

1. Long low broad torso.
2. Low wedge head and longitudinal stripes.
3. Digging foreclaws on short heavy limbs.

## Generation provenance

Built-in `image_gen.imagegen`, new generation, 7 November 2026; no API/CLI fallback and no Commons photo supplied to the generator. One eight-cell PNG, unedited. Exact authored prompt below. Output model/version/seed were not exposed by the tool; do not infer them. File SHA256 and source filename are in [L1 evidence manifest](l1-evidence.json).

<details><summary>Exact generation prompt</summary>

Use case: photorealistic-natural. Asset: European badger (Meles meles) skeleton anatomy target sheet for a game, NOT existing game art. Make one crisp 4-column by 2-row contact sheet on plain light grey background, no scenery. Eight separate whole animals, generous margins, no clipping. Top row adult European badger; bottom row an independently walking, eyes-open badger cub (age0 target, not newborn). Columns: standing towards; walking towards; standing away; walking away. Camera for every panel is elevated looking DOWN 30 degrees, telephoto/near-orthographic, body broadside diagonal with 35-degree yaw toward or away from viewer; do not use eye-level or straight head-on portraits. Towards means muzzle visible; away means rump and back of head visible. No looking back in away panels. Natural European badger anatomy: very LOW broad heavy grey body with low nearly level back, massive shoulders and short sturdy black plantigrade legs, long wedge-shaped head carried near ground, distinct white face with two black longitudinal eye-to-ear stripes, small white-edged rounded ears, short stubby tail, long pale foreclaws suited to digging. NO bear proportions, NO raccoon transverse eye mask, NO tall dog legs, NO long brush tail. Kit relatively larger head, shorter muzzle, softer rounded body and shorter less full tail; do not miniaturize adult. Walking is one quiet terrestrial step, four anatomically correct limbs, no galloping. Natural fur and neutral soft light, documentary photographic realism. Small labels only: adult / cub; standing towards / walking towards / standing away / walking away. No costume, extra tails, jewelry, fantasy, illustration, cartoon, scale ruler or claims of measurement. Consistent adult anatomy across top row, consistent cub across bottom.

</details>

## Legend concepts — 7 November addition

**Three actual generated options; provisional owner pick A, not Ed's approval.** [Legend lane table and review contact sheet](l1-legends.md). [Original instruction](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707981581) and [later fit-and-variety correction](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707992824): crystals, flames and spirit wings are allowed when fitting; none is a uniform. This later ruling supersedes the blanket wording in ART-GUIDE0c. The historical legend audit is a source of questions/ideas, not today's resolved sprite.

![badger three generated legend options A B C](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/badger/legend-concepts-v1.png)

**Today's legend comparison:** source-matched current image pending root/cloud response to [QUESTION6708031078](https://github.com/edsaperia/witch/pull/1898#issuecomment-6708031078). No current sprite was fabricated by imagegen; no historical sheet is relabelled today. The triptych is the completed three-concept portion of the requested comparison sheet. Current fourth panel and final beside-today layout remain incomplete.

**Source-only current design note (not a visual review):** Base level3 includes a broad grizzled/scarred elder with stripes extending down the back, long claws and a bronze torc/elder treatment. Historical audit's standing-stones kit is older and must not be labelled today's source. Read [species genome](../../art/creatures/badger/genome.js) together with [roster defaults](../../art/roster/presets.js). No game or graph changes.

### Area and three alternatives

[Wispy forest area text](../../art/areas.js): Dry leaves, tall thin wispy trees and thick trees with several trunks. These ingredients inform the design but do not add scenery to the reference backdrop; a historical set-piece mention is story inspiration, not a claim it still spawns by default.

- A Keeper of the old sett: massive digging forelimbs and worn ivory spade claws, with faint mineral light only in old claw scratches.
- B White road: the facial blaze continues as long softly glowing fur bands along the back.
- C Rootwarden: dark compacted-earth shoulder plates and a worn bronze leg band; strong bulk, but risks generic armour.

### Provisional pick: A — Keeper of the old sett

**Signature element: Epoch-worn spade foreclaws.** A makes the badger's own digging power the sacred thing. Its claws look worked, not pristine weapons; a scarred low wedge head and heavy shoulders imply age spent beneath the old roots. It needs no stone monument on its back, and the restrained mineral gleam is subordinate to anatomy.

The owner recommendation is for Ed to judge. It is not an activation decision, a production candidate or proof that this beats the shipped legend at native size.

Chosen legend checklist:

1. Very low wide elongated badger body on short heavy black limbs.
2. Long wedge muzzle and longitudinal black face stripes remain distinct from a raccoon mask.
3. Forelimbs carry the mass and digging claws grow from broad forefeet.
4. Claws show chips and polishing from use, with only restrained light in old scratches.
5. Grey muzzle, worn ear and healed shoulder scar give age.
6. No carried boulders/trees, tall bear posture or human armoured silhouette.

Body-plan target: Maintain the low adult target, enlarge shoulder breadth and forefoot/claw silhouette rather than raise the animal. Artist target foreclaw reach roughly0.12–0.18L, exaggerated beyond natural anatomy; retain room for planted feet and a short stub tail.

Missing graph features / existing capabilities to reuse: Digit/claw-bearing forefoot with independent curved spade-claw taper, wear/chip masks and local material accents; shoulder mass/profile control. Legacy claws and worn/scar features exist, so the work is fitting them into graph/pose semantics, not declaring those ideas absent.

**Output review:** A still has a high shoulder dome; keep the textual low/long badger checklist ahead of the generated fur silhouette. The claws are candidate design, not accepted foot anatomy or proven walk clearance. All three are concept illustrations at requested approximate camera, not the game's material/pixel render; no exact camera-angle or native-size acceptance is claimed. Anatomy/Commons429 limits above remain unchanged.

### Legend generation provenance

Built-in `image_gen.imagegen`, 7 November2026; three options in one new triptych. No CLI/API fallback, no current game sprite or Commons photo supplied to generation. Published triptych is the original unedited output. Exact prompts below; file SHA256/source name/size in [legend manifest](l1-legend-evidence.json). Model identifier/seed not exposed.

<details><summary>Exact legend prompt</summary>

Use case: stylized-concept. THREE DISTINCT ancient legendary EUROPEAN BADGERS (Meles meles) in one A B C landscape three-column triptych. One WHOLE quadruped per column, all claws ears stub tails in frame, generous margins, flat plain neutral grey studio background ONLY, no surrounding landscape. Elevated looking-DOWN30degree near-orthographic camera, broadside muzzle turned35degrees towards viewer. Very LOW WIDE long badger, massive shoulders on SHORT black digging legs, long wedge head held low, two longitudinal black head stripes separated by white blaze, tiny rounded ears, short stub tail; NOT a bear or raccoon. Great age: scars, old chipped claws, worn ear, greying whiskers, weathered coat; still dignified wise and powerfully rooted. Area inspiration: dry fallen leaves, tall thin wispy trees and ancient thick multi-trunk trees. A Keeper of the old sett: enormously developed digging FOREARMS and long worn ivory spade-like foreclaws, dark forefeet broad, tiny amber mineral gleam ONLY within old scratches on claws; one healed shoulder scar and plain grey body, no jewelry or things on back. Ground remains neutral with small contact shadow, no flying dirt. B The white road: ancient broad low badger whose two head stripes and white blaze flow naturally into two wide softly luminous pale longitudinal fur bands along spine, low rippling light within fur like remembered paths under roots, ordinary heavy claws, no jewelry or stones. C Rootwarden: low broad badger with irregular interlocking dark earthen shoulder armor plates like compacted ancient soil, NOT rocks stacked on back, one cracked bronze foreleg band offering, long grey whiskers, head scars, no glowing stripes or claw light. Species anatomy and digging nature first. No generic crown, crystals, wings, trees on back, full human armor suit or humanoid pose. Small A B C labels only; concept art not screenshot.

</details>

## Remaining / wake condition

Complete adult and mobile-young Commons visual checks, resolve the output cautions, then have the coordinator/1866 owner assess the target. Wake when the comparison photos are accessible without HTTP429, or root supplies cloud photo-review evidence. No graph implementation or switch-on until that review; old sprite critique omitted under the later skeleton-first ruling.

