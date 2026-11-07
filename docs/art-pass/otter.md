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

## Legend concepts v2 — blocked before image generation

The new fantasy/scale briefs6708227119 and later6708229124 were read and applied to an exact four-panel prompt: three revised options including maximum-fantasy C, plus a game-camera study of C, all with witch/tree scale cues. **The built-in image tool returned HTTP403 Forbidden before producing an image. No v2 image or revised visual pick exists for this species.** [Failed prompt/status](l1-legend-v2-evidence.json), [current lane checkpoint](l1-legends-v2.md). No CLI/API fallback, repeated poll or new permission route used.

Previous three concepts below are preserved v1 output and **do not satisfy the new scale/fantasy revision**. Resume by producing/inspecting actual v2 images after built-in imagegen access is restored. Do not count the failed prompt as completed art or claim new game-camera evidence.

## Legend concepts — 7 November addition

**Preserved v1 iteration, awaiting the actual v2 revision.**

**Three actual generated options; provisional owner pick C, not Ed's approval.** [Legend lane table and review contact sheet](l1-legends.md). [Original instruction](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707981581) and [later fit-and-variety correction](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707992824): crystals, flames and spirit wings are allowed when fitting; none is a uniform. This later ruling supersedes the blanket wording in ART-GUIDE0c. The historical legend audit is a source of questions/ideas, not today's resolved sprite.

![otter three generated legend options A B C](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/otter/legend-concepts-v1.png)

**Today's legend comparison:** source-matched current image pending root/cloud response to [QUESTION6708031078](https://github.com/edsaperia/witch/pull/1898#issuecomment-6708031078). No current sprite was fabricated by imagegen; no historical sheet is relabelled today. The triptych is the completed three-concept portion of the requested comparison sheet. Current fourth panel and final beside-today layout remain incomplete.

**Source-only current design note (not a visual review):** Base legend source includes the old ribbons list and a pearl body patch, with the smooth-coated low body and current chocolate/pale-throat palette. Compare the actual resolved default legend before saying precisely which ribbons appear in today's render. Read [species genome](../../art/creatures/otter/genome.js) together with [roster defaults](../../art/roster/presets.js). No game or graph changes.

### Area and three alternatives

[Mangrove channel area text](../../art/areas.js): Soft grey mud and a brackish channel, reeds/mangrove seedlings, drowned willows/young mangroves/alders, a fallen-log bridge. These ingredients inform the design but do not add scenery to the reference backdrop; a historical set-piece mention is story inspiration, not a claim it still spawns by default.

- A Memory of tides: an extended muscular tail carries a close water wake; aquatic and clear, but overlaps other water-ribbon treatments.
- B Crossing keeper: worn shell offerings and shoulder scars; an elder, but the necklace supplies most of its legend identity.
- C Water reader: a low smooth-coated otter senses distant currents through broad silver whisker fans with a few suspended droplets of light.

### Provisional pick: C — The water reader

**Signature element: Light droplets on sensing whiskers.** C puts magic in tactile whiskers and current-sensing, an otter trait, rather than importing the sea-otter belly-stone cliché from the historical audit. Its low body and massive tapering tail retain the mangrove swimmer; scarred muzzle and worn silver whiskers suggest old knowledge of the channels. Droplets are carried on the sensing hairs, not a generic ring of floating stars.

The owner recommendation is for Ed to judge. It is not an activation decision, a production candidate or proof that this beats the shipped legend at native size.

Chosen legend checklist:

1. Long low smooth-coated brown body, broad flattened muzzle and tiny round ears.
2. Short webbed feet and a broad muscular tapering tail remain visible.
3. Whiskers project from real muzzle pads, not a separate moustache ornament.
4. Only a few light droplets sit on whisker tips; no whole-head halo.
5. Grey muzzle, old narrow scars and worn ear show age.
6. No back-floating sea-otter pose, belly stone, furry fox tail or beaver paddle.

Body-plan target: Retain long low adult ratios and muscular flattened tail. Artist target whisker fan span around0.45–0.65L, substantially exaggerated; simplify to several legible arcs for game-size testing rather than every generated hair.

Missing graph features / existing capabilities to reuse: Muzzle-local whisker attachment with a few stable curved paths and tip effect anchors, noncircular muscular tail section, webbed feet and scar/wear masks. Existing whiskers are legacy detail, but socket/pose/effect semantics must be shared; no implementation here.

**Output review:** Generated C's tail nearly reaches the sheet edge and its whiskers are too fine for assumed native-scale readability. Body/tail flattening and actual toe count remain unverified; the concept is not a new anatomical reference. All three are concept illustrations at requested approximate camera, not the game's material/pixel render; no exact camera-angle or native-size acceptance is claimed. Anatomy/Commons429 limits above remain unchanged.

### Legend generation provenance

Built-in `image_gen.imagegen`, 7 November2026; three options in one new triptych. No CLI/API fallback, no current game sprite or Commons photo supplied to generation. Published triptych is the original unedited output. Exact prompts below; file SHA256/source name/size in [legend manifest](l1-legend-evidence.json). Model identifier/seed not exposed.

<details><summary>Exact legend prompt</summary>

Use case: stylized-concept. THREE DISTINCT ancient legendary SMOOTH-COATED OTTERS (Lutrogale perspicillata), one whole otter per A B C column, landscape triptych. PLAIN uniform light warm-grey studio backdrop ONLY, no water landscape, no trees, no horizon. Soft contact shadows. Elevated camera looking clearly DOWN30degrees, near orthographic body broadside35degrees towards viewer; whole broad muzzle, webbed feet and entire tapering tail inside frame, generous margins. Long LOW sleek brown quadruped, broad flattened head, tiny rounded ears, pale throat, strong whisker pads, very short limbs, thick muscular flattened tail, not a sea otter, not a seal. Never back-floating or using a belly stone. Ancient silver muzzle/whiskers, old narrow scars, worn ear, wise still powerful presence. Area inspiration: mangrove channel, brackish water, soft grey mud, reeds, drowned willows and mangroves, fallen-log bridge. A Memory of tides: exceptionally long powerful low sweeping tail with a SINGLE clear water wake hugging only its lower edge, a few faint ripple lines along tail like remembered channels, scarred flanks, no jewelry or great magic halo. B The crossing keeper: broad old otter with a few tiny worn shell offerings tied to one rough cord low at throat, pale worn shoulder scars like old river crossings, stronger forelimbs and low smooth tail, no water ribbon and no whisker glow. C The water reader: low elongated old otter with unusually broad silver tactile whisker fans sweeping FORWARD from its muzzle, several small droplets of light caught at their tips suggesting it feels distant currents, no eye rings, no floating stars around head, no jewelry, no water ribbon; substantial low tapering tail and tiny ears retained. These three powers come from swimming/current sensing, not generic adornments. No wings/crystal crown/armour suit/trees carried on back, no standing humanoid pose, no sea-otter behavior. Small A B C labels only. Tangible detailed concept art, not game screenshot.

</details>

## Remaining / wake condition

Complete adult and mobile-young Commons visual checks, resolve the output cautions, then have the coordinator/1866 owner assess the target. Wake when the comparison photos are accessible without HTTP429, or root supplies cloud photo-review evidence. No graph implementation or switch-on until that review; old sprite critique omitted under the later skeleton-first ruling.

