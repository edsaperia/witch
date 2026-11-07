# Red panda: skeleton target

**Provisional checkpoint, 7 November 2026 — not READY.** Target: Ailurus fulgens. [Lane summary](l1-summary.md). No game or graph changes. Real photographs override generated anatomy.

## Reference evidence

![Generated red panda adult and mobile-young targets](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/redpanda/target-v1.png)

[Full generated sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/redpanda/target-v1.png). Top row adult, bottom row mobile young (game level0); columns standing towards, walking towards, standing away, walking away. All animals whole in frame. 'Age0' is a game level, not a zoological age in days. All eight lane species use the shared quadruped levels0–3; null genome overrides inherit the template, they do not remove babies.

Camera source: [model3d.js](../../art/model3d.js), `PITCH=.52` radians (29.8° downward), `YAW.towards=.6`, `away=-.6` (±34.4°); [creatures3d.js](../../art/creatures3d.js) uses the renderer defaults unless a tool view is supplied. Prompt requests these angles with a telephoto/near-orthographic view. **Generated camera/framing is approximate, not numerically calibrated to the game's orthographic projection.** No real-game-size acceptance or new game capture is claimed.

**Output review:** Eight cells present. Generated cub is brightly adult-coloured despite the prompt requesting a softer grey-rust juvenile coat; treat that as a discrepancy to resolve, not an age0 fact. Tail rings are too regular to be a measured pattern target.

**Real-photo cross-check:** [Commons comparison photo](https://commons.wikimedia.org/wiki/File:Ailurus_fulgens_fg01.JPG). Named real-photo provenance located (Fritz Geller-Grimm, Berlin Zoo). Direct retrieval returned HTTP429; no visual comparison claimed. A separate full-body Commons photo was located but not visually checked. Cub and walking comparisons remain pending. Comparison photos are not committed or republished. The whole-lane age0/photo validation remains incomplete.

## Identifying checklist

1. Rust-red long-backed torso above black belly and legs.
2. Broad round face with short pale muzzle and rusty tear markings.
3. Large pale-edged rounded-pointed ears.
4. Sturdy short plantigrade limbs, not fox stilts.
5. Long thick ringed tail balances the body.
6. Soft shoulder/rump arch with head lowered during walking.
7. Cub is fluffier and shorter-bodied with a relatively larger head and shorter tail.

## Body plan for the graph

These are **provisional artist blockout ranges**, not biological measurements, not values measured from the generated image, and not replacements for Ed's game size model. L = nose tip to tail root in a neutral standing animal, excluding fur and tail. Head = occiput to nose; neck = occiput-to-withers visible span; leg entry = ground-to-withers height, not summed bone lengths. Perspective/coat/posture alter the visible ratios. Check against matched side photographs before locking them into the graph.

| Adult quantity | Ratio to L |
|---|---|
| Ground-to-withers | 0.28–0.40 |
| Head length | 0.24–0.30 |
| Visible neck span | 0.06–0.12 |
| Tail root to tip | 0.70–0.90 |

Mass profile: Soft trunk volume across shoulders and rump, with black limbs visibly supporting it. Tail is a major rear mass. Do not use the raccoon's sharply pointed face and hand-like forepaws.

Young target: use the checklist's age difference as a starting point; increase relative head/paw size, shorten muzzle/trunk and retain species-specific ear/tail character. **No numeric juvenile ratio is asserted without a real juvenile photo.** Do not obtain the baby only by uniform adult scaling. Levels1–3's design-specific ornaments are outside this anatomy sheet; retain the existing genome's intent for a later graph review.

## Shared graph handoff

Audit pinned to prototype `524b0acaa`, not the unmerged live1866 candidate. Sources: [graph contract](../../art/body-graph/graph.js), [quadruped adapter](../../art/body-graph/quadruped.js), [gait](../../art/body-graph/gait.js), [family adapter](../../art/body-graph/families.js), [tail markings](../../art/body-graph/tail-markings.js). Generic graph sockets already support head, leg, wing, shell and tail; torso stations support varying bulk. Ordinary four legs/ears/tails must not all be listed as wholly absent just because a species adapter has not been made.

**Missing graph features / implementation distinction:** Plantigrade legs, torso profiles, tail rings and tip masks exist. Missing generic graph features: head-local rounded ear attachments, distinct claw-bearing grasping feet, and age-specific fur/tail volume controls. No new 'ringed-tail system' is needed; the current shared tail painter should be reused.

Ranked target priorities (for1866 owner; no hand-written-art fixes here):

1. Broad short-muzzled face and pale ear rims.
2. Black lower body with rounded trunk.
3. Long thick ringed tail.

## Generation provenance

Built-in `image_gen.imagegen`, new generation, 7 November 2026; no API/CLI fallback and no Commons photo supplied to the generator. One eight-cell PNG, unedited. Exact authored prompt below. Output model/version/seed were not exposed by the tool; do not infer them. File SHA256 and source filename are in [L1 evidence manifest](l1-evidence.json).

<details><summary>Exact generation prompt</summary>

Use case: photorealistic-natural. Asset: red panda (Ailurus fulgens) skeleton anatomy target sheet for a game, NOT existing game art. Make one crisp 4-column by 2-row contact sheet on plain light grey background, no scenery. Eight separate whole animals, generous margins, no clipping. Top row adult red panda; bottom row an independently walking, eyes-open red panda cub (age0 target, not newborn). Columns: standing towards; walking towards; standing away; walking away. Camera for every panel is elevated looking DOWN 30 degrees, telephoto/near-orthographic, body broadside diagonal with 35-degree yaw toward or away from viewer; do not use eye-level or straight head-on portraits. Towards means muzzle visible; away means rump and back of head visible. No looking back in away panels. Natural red panda anatomy: compact long-backed, slightly arched furry body, reddish-rust back, black belly and black short sturdy plantigrade legs, broad round pale face with rusty tear marks, short white muzzle, large rounded pointed ears with white rims, very long thick tapering tail with broad alternating reddish and pale rings. Shoulder and rump softly rounded, head low in walking. NO fox snout, no black raccoon eye mask, no giant panda pattern. Kit relatively larger head, shorter muzzle, softer rounded body and shorter less full tail; do not miniaturize adult. Walking is one quiet terrestrial step, four anatomically correct limbs, no galloping. Natural fur and neutral soft light, documentary photographic realism. Small labels only: adult / cub; standing towards / walking towards / standing away / walking away. No costume, extra tails, jewelry, fantasy, illustration, cartoon, scale ruler or claims of measurement. Consistent adult anatomy across top row, consistent cub across bottom.

</details>

## Legend concepts — 7 November addition

**Three actual generated options; provisional owner pick A, not Ed's approval.** [Legend lane table and review contact sheet](l1-legends.md). [Original instruction](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707981581) and [later fit-and-variety correction](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707992824): crystals, flames and spirit wings are allowed when fitting; none is a uniform. This later ruling supersedes the blanket wording in ART-GUIDE0c. The historical legend audit is a source of questions/ideas, not today's resolved sprite.

![redpanda three generated legend options A B C](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/redpanda/legend-concepts-v1.png)

**Today's legend comparison:** source-matched current image pending root/cloud response to [QUESTION6708031078](https://github.com/edsaperia/witch/pull/1898#issuecomment-6708031078). No current sprite was fabricated by imagegen; no historical sheet is relabelled today. The triptych is the completed three-concept portion of the requested comparison sheet. Current fourth panel and final beside-today layout remain incomplete.

**Source-only current design note (not a visual review):** Base level3 is a large mountain sage with pale ruff/beard, long claws, grizzle, wreath and leg beads; the target deliberately gives more narrative weight to the tail rather than adding more offerings. Read [species genome](../../art/creatures/redpanda/genome.js) together with [roster defaults](../../art/roster/presets.js). No game or graph changes.

### Area and three alternatives

[Misty terraces area text](../../art/areas/misty-terraces/recipe.js): Moss on stepped mountain ledges, ferns and rocks, wild cherry/fir/rowan/birch, a flat-stone cairn; mist in hollows. These ingredients inform the design but do not add scenery to the reference backdrop; a historical set-piece mention is story inspiration, not a claim it still spawns by default.

- A Keeper of the steps: a huge ringed counterbalance tail with small horizontal mist shelves at its rings.
- B Cliff elder: worn slate shoulder plates and climbing claws; strong mountain weight, but plates overshadow the balancing animal.
- C Memory on the bough: silver cheek beard, high curled tail and sparse rowan offerings; gentler, but repeats a familiar jewellery/foliage solution.

### Provisional pick: A — Keeper of the steps

**Signature element: Mist terraces released by tail rings.** A draws from the red panda's long balancing tail and its stepped misty habitat. The rings become remembered ledges, while the grizzled cheeks and worn ear show age. Unlike the fox's memory-whorl or Arctic fox's shelter, this tail is about balance and height. No tree is placed on its back and no generic crest supplies the fantasy.

The owner recommendation is for Ed to judge. It is not an activation decision, a production candidate or proof that this beats the shipped legend at native size.

Chosen legend checklist:

1. Rust-red trunk, black belly/legs and short broad pale face remain unmistakable.
2. One long thick ringed tail is the dominant counterbalance.
3. Small horizontal mist shelves stay attached to tail rings rather than forming a generic whole-body halo.
4. Silver cheek fur, worn ear and subtle scars show an elder, not a decorated juvenile.
5. Feet remain short/sturdy and the back remains long; no fox stilts.
6. Tail root must articulate believably; the body must not become a plinth for a separate tower.

Body-plan target: Keep adult red-panda torso and paw proportions. Artist target tail length about1.0–1.3L before curl, exaggerated from the anatomical target; do not simply scale the entire animal. Curl and mist shelf spacing need independent controls.

Missing graph features / existing capabilities to reuse: Tail pose hierarchy and stable tail-distance marking/effect coordinates for a few mist shelves, age/grizzle masks and worn-ear attachment. Tail rings already exist in tail-markings.js; reuse them. The mist needs its own effect layer, not stone blocks added as anatomy.

**Output review:** A's mist makes a vertical stack and the tail is more upright than real balance posture; this is fantasy, not anatomical evidence. C's tail crowds the outer margin. Selected A needs native-scale simplification to avoid a candy-striped tower. All three are concept illustrations at requested approximate camera, not the game's material/pixel render; no exact camera-angle or native-size acceptance is claimed. Anatomy/Commons429 limits above remain unchanged.

### Legend generation provenance

Built-in `image_gen.imagegen`, 7 November2026; three options in one new triptych. No CLI/API fallback, no current game sprite or Commons photo supplied to generation. Published triptych is the original unedited output. Exact prompts below; file SHA256/source name/size in [legend manifest](l1-legend-evidence.json). Model identifier/seed not exposed.

<details><summary>Exact legend prompt</summary>

Use case: stylized-concept. Three DISTINCT ancient legendary RED PANDAS (Ailurus fulgens) in one clean A B C landscape triptych. One whole quadruped per column, plain uniform pale neutral studio background and soft contact shadow ONLY. Camera elevated looking DOWN30degrees, near orthographic broadside35degree towards view; whole ears black feet and full tails with generous margins. Animal nature first: long-backed rust-red furry body, black belly and short black legs, broad round pale masked face SHORT muzzle, pale-rimmed rounded pointed ears, very long thick ringed tail. Not raccoon or fox. Great age shown by silver cheek fur, worn ear and subtle scars; calm wise presence. Area inspiration: cool mountain misty terraces, mossy stepped ledges under fir, wild cherry, rowan and birch, old flat-stone cairn. A Keeper of the steps: tail grows into a magnificent long curled ringed counterbalance, each broad tail ring releases one small HORIZONTAL shelf of mist held close around the tail, like remembered mountain contour terraces; black sturdy paws and silver muzzle, no jewelry, no trees/rocks carried on body. B The cliff elder: low-bodied broad-shouldered red panda with one old cracked dark slate shoulder plate on each side, worn bindings and polished long climbing claws, scarred silver face; ordinary full ringed tail, no mist or jewelry. C Memory on the bough: ancient red panda with a huge silver cheek ruff/beard and a tail curving high like a balanced question mark, tiny rowan-seed offerings woven sparsely into the tail fur, nothing at neck, no armor, no mist. Keep species family unmistakable, exaggerate balancing tail/climbing nature not random magic crown. Do not show whole trees, scenery, ghost animals, crystals, wings or full armor suit. Labels A B C only, no extra text. Concept art, not screenshot.

</details>

## Remaining / wake condition

Complete adult and mobile-young Commons visual checks, resolve the output cautions, then have the coordinator/1866 owner assess the target. Wake when the comparison photos are accessible without HTTP429, or root supplies cloud photo-review evidence. No graph implementation or switch-on until that review; old sprite critique omitted under the later skeleton-first ruling.

