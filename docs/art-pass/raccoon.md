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

## Legend concepts — 7 November addition

**Three actual generated options; provisional owner pick A, not Ed's approval.** [Legend lane table and review contact sheet](l1-legends.md). [Original instruction](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707981581) and [later fit-and-variety correction](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707992824): crystals, flames and spirit wings are allowed when fitting; none is a uniform. This later ruling supersedes the blanket wording in ART-GUIDE0c. The historical legend audit is a source of questions/ideas, not today's resolved sprite.

![raccoon three generated legend options A B C](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/raccoon/legend-concepts-v1.png)

**Today's legend comparison:** source-matched current image pending root/cloud response to [QUESTION6708031078](https://github.com/edsaperia/witch/pull/1898#issuecomment-6708031078). No current sprite was fabricated by imagegen; no historical sheet is relabelled today. The triptych is the completed three-concept portion of the requested comparison sheet. Current fourth panel and final beside-today layout remain incomplete.

**Source-only current design note (not a visual review):** Base source's raccoon elder is handled by the elder hook rather than a new list of generic legend features; roster overrides neutral-grey coat, mask and ordinary tail rings. Historical source comments about a future elder are not proof of a current render. Read [species genome](../../art/creatures/raccoon/genome.js) together with [roster defaults](../../art/roster/presets.js). No game or graph changes.

### Area and three alternatives

[Mossy creek area text](../../art/areas/mossy-creek/recipe.js): Deep moss and wet stones, a creek, sword ferns and tall mossy cedars/spruces; a mossy logjam where water pools. These ingredients inform the design but do not add scenery to the reference backdrop; a historical set-piece mention is story inspiration, not a claim it still spawns by default.

- A First hand: dexterous forehands leave luminous handprints under an old masked raccoon.
- B Washer of the moon: a naturally seated raccoon examines a creek pebble as water curls between its fingers.
- C Lost-and-found elder: worn spoon/key/cap offerings and a curled ringed tail; recognisable, but the trinket trope may be more valuable for the raven lane.

### Provisional pick: A — The first hand

**Signature element: Luminous handprints.** A makes clever touch and tracks the mystery. The animal leaves a memory in the wet creek ground, while its worn mask, ears and scarred hands show age. It remains a low-headed grey raccoon; neither a humanoid thief nor an otter using a belly stone. The magic lives in the hands rather than a shared neck ornament.

The owner recommendation is for Ed to judge. It is not an activation decision, a production candidate or proof that this beats the shipped legend at native size.

Chosen legend checklist:

1. Grey rump-high body, low pointed muzzle and transverse black mask.
2. Small round ears and a moderate ringed tail; no red-panda colours or huge plume.
3. Five foredigits with recognisable raccoon hands, distinct from the elongated hind sole.
4. Prints are placed by forehand contact, not unrelated floating symbols.
5. Weathered mask edges, ear wear and healed scars carry age.
6. The main quadruped stays visible without equipment obscuring its hands.

Body-plan target: Keep the stocky adult torso and modest tail. Enlarge forehand readability rather than the entire forearm; prints should stay near one hand-span and never require giant cartoon paws. Concept contact light is separate from anatomical scale.

Missing graph features / existing capabilities to reuse: Five-digit hand family with fore/hind foot distinction and contact-linked decal/effect sockets; scar/worn-ear masks. Existing plantigrade family and tail-ring painter are reusable. Contact effect is visual design only, no gameplay trail feature approved.

**Output review:** Generated luminous prints appear to have uncertain digit counts and hands need real reference checking; five digits is the textual target, not an accepted count in the pixels. B is seated and C crouches despite the differing prompt poses; do not infer exact gait from any. All three are concept illustrations at requested approximate camera, not the game's material/pixel render; no exact camera-angle or native-size acceptance is claimed. Anatomy/Commons429 limits above remain unchanged.

### Legend generation provenance

Built-in `image_gen.imagegen`, 7 November2026; three options in one new triptych. No CLI/API fallback, no current game sprite or Commons photo supplied to generation. Published triptych is the original unedited output. Exact prompts below; file SHA256/source name/size in [legend manifest](l1-legend-evidence.json). Model identifier/seed not exposed.

<details><summary>Exact legend prompt</summary>

Use case: stylized-concept. THREE DISTINCT ancient legendary RACCOONS in one clean landscape three-column triptych A B C, one whole raccoon per panel, neutral plain warm-grey studio background only, subtle contact shadow, no forest scenery or large pool. Camera elevated looking DOWN30degrees, near orthographic, body broadside turned35degrees towards viewer; whole ears feet tail and small magic entirely within frame with margins. Raccoon anatomy: stocky grey body high rump low pointed head, round ears, transverse black eye mask, dark slender finger-like hands, modest bushy ringed tail. Not red panda or bear. Old weathered grey muzzle, chipped ear and healed scars, wise unhurried presence. Area: mossy creek, wet stones, sword ferns, towering mossy cedars and spruces, logjam and pooled water. A The first hand: strong dark forehands with FIVE long fingers, two soft luminous handprints on the plain ground immediately beneath it, mask pale rim faintly lit, tail ordinary; no jewelry, no water ribbon. Power is memory left by clever hands. B Washer of the moon: raccoon SITTING naturally on haunches, holding one pale creek pebble between both dexterous hands, thin clear water curls only BETWEEN the fingers, old scarred knuckles, pale mask, no floating pool or sea-otter belly pose. C The lost-and-found elder: old four-footed raccoon with long ringed tail curled beside it and three very worn human trinkets tied sparsely on a frayed cord at throat: spoon, key and bottle cap, battered and tiny not treasure armor; plain hands, no handprint glow, no water. Each concept unmistakable raccoon, distinct magic/story signature, no common crown, no crystal back forest, no spirit wings, no floating eye rings, no humanoid stance. Small A B C labels only; not game screenshots.

</details>

## Remaining / wake condition

Complete adult and mobile-young Commons visual checks, resolve the output cautions, then have the coordinator/1866 owner assess the target. Wake when the comparison photos are accessible without HTTP429, or root supplies cloud photo-review evidence. No graph implementation or switch-on until that review; old sprite critique omitted under the later skeleton-first ruling.

