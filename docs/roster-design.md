# Creature roster design — review in progress

Ed, 2026-10-30: **"It's more important that creatures look like their real-life counterpart than that they look distinct."** Related animals should look related. Natural markings, proportions, colour and size provide the distinctions; a similarity threshold is not a reason to distort anatomy. Legends retain animal-specific fantastic story features. The single ART-GUIDE §4 update belongs to #1470 (coordinator 6512922220 / 6512937658); this document applies that rule to the roster.

## Evidence and scope

[All 64 species in one source-backed table](roster-census.md), with [machine-readable facts](roster-census.json). Regenerate with `node tools/roster/audit.mjs`. Counts and dispatch come from present code, not backlog estimates: 64 species, 23 active builder IDs, 42 using `quad`, 22 on individual builders, unused `scarab`, plus two idle-pose builders. World-0 island membership is computed from the actual roster functions. It is a sample campaign, not a fixed global habitat assignment.

The audit separates factual source fields from artistic assessments. The rendered-quality column now records the builder's actual inspection of all eight cloud catalogue sheets at `8308346aaa488b7a015f08fc60a01cb939c2aa79`, linked per species. These are studio/towards/native-art observations; independent scores, gait, night habitat and exact in-game acceptance are still separate. Encoded natural cues are evidence of intent, not proof that the pixels express it. A geometry pass cannot establish animal likeness or acceptance. No external art assets are copied into the game.

## Roster proposal

Keep all 64 species and their gameplay roles. **No additions, merges, area moves, stat changes or tuning changes in this batch.** The current roster already has extensive cat, canid, deer, bear and mustelid families. Adding a brown bear, another deer or another spotted cat now would expand models and rules before resolving the likeness of the existing members. Existing similar relatives are not duplicates to delete.

The family groupings in the census organise shared design work; they are not all taxonomic families. In particular, red panda, raccoon and meerkat are separate carnivoran lineages, and bat, hare and armadillo are not relatives merely because they appear under other mammals.

### Bounded implementation: four per-species review presets

| Species | Proposed change and first reason | Secondary readability / area reason | Existing interface and limits |
|---|---|---|---|
| Black bear | Remove ordinary-level shoulder hump and excess front mass: a real black bear lacks a grizzly hump. | Dark coat, pale muzzle and prominent ears remain; shares bear body naturally with polar bear. Cold-rainforest identity stays. | `body.humpK=0`, `front=1` at levels 0–2; elder keeps original fantastic anatomy. |
| Arctic fox | Short rounded ears instead of the pointed, large juvenile ears; neutralise blue coat cast for the white winter morph. | Compact white fox remains related to russet fox and sandy fennec; no forced unique silhouette. Snowfield fit is already good. | Existing round-ear part and species palette; white palette also reaches elder because the old interface has no effective level palette. Summer/blue morphs are not added. |
| Snow leopard | Broken rosettes replace generic spots. | Pale coat, broad paws and long thick ringed tail already distinguish the mountain cat naturally from black jaguar/tiger/cheetah. | Existing rosette painter; initial frequency/density are review parameters, not zoological measurements. Elder retains original coat pattern/story. |
| Fire beetle (name retained) | Remove invented ordinary ember fissures; dark brown wing cases and dark head/jaws follow a real stag beetle. Coordinator authorised this candidate in 6513102826. | Log-pile habitat already fits deadwood beetles; keep its existing mandible glyph. Fire remains the elder's story. | Existing beetle builder and `look.embers`; wrapper requires explicit level and returns complete original at level 3. Integration awaits level-aware shared hook. |

Presets are real genome data in `art/roster/presets.js`, processed through the existing `speciesOf`/`quad3d` or beetle model. They are not illustrative mockups and are not a new engine. The isolated pre-hook capture helper `rosterGenome(g, [], level)` returns the exact original object; opt-in names are individual species IDs. The beetle candidate also fails closed without explicit level, since the old species-wide `look` interface cannot itself restore elder fire. Nothing imports this module in production yet. #1470 owns the shared selection hook and selected-genome hashing. `createRosterVariants(genomes)` now prepares complete records at `creatureVariants[id].roster`; it neither parses nor selects switches. Once the hook is released, the comparison tool automatically delegates to its `speciesOf(base, context, level)` instead of the isolated helper.

Shared contract received in 6513214940 at #1470 commit `3b816814b3f9daf84fef8da6902fbed4adfd0ef3`: `parseCreatureModels(raw)`, `selectedCreatureGenome(base, context, level)`, `speciesOf(base, context, level)` and `genomeHash(base, context, level)`. Caller supplies `{ creatureModels: "beetle:roster,bear:roster", creatureVariants: createRosterVariants(genomes) }` identically to page, worker and captures. Missing/unavailable selection keeps current art. Coordinator approved `levels[level].palette` overlay as well as `look` in 6513273814; beetle pack stores the full original palette/look at level 3. Capture refuses shared beetle selection if elder palette restoration is absent. **Do not merge #1470 before its release**; current branch has not done so. Live loader wiring and shared-hook integration tests wait for that release, not Ed's design approval.

Each proposed change requires matched current/proposed sheets: all four levels, two headings, both walking frames, studio and night; native baked art pixels plus a labelled enlargement. The unchanged counterpart is rendered in the same process with identical style, frame, heading and lighting. Include related unchanged family members. Native bake size is not the same as perspective-projected screen size: exact ground/treetop screenshots must additionally use the accepted in-game switch and a verified build SHA. Until then, game-size acceptance remains pending.

### Source references for implemented candidates

1. [NPS bear identification](https://www.nps.gov/articles/bear-identification.htm): black bears lack a shoulder hump, have prominent ears and a straight facial profile. Coat colour alone does not identify species. This supports removing the hump, not replacing the bear with a generic brown model.
2. [Alaska Department of Fish and Game arctic fox](https://www.adfg.alaska.gov/index.cfm?adfg=arcticfox.main): short ears, short limbs and dense winter fur create the compact form; both white and blue morphs occur. White here is an intentional winter-morph choice, not a claim that every arctic fox is white.
3. [San Diego Zoo snow leopard](https://zoo.sandiegozoo.org/animals/snow-leopard): smoky pale coat, dark markings, broad paws and a thick tail almost as long as the body. Its rosettes should be reviewed against the zoo's own animal photographs, without copying those images into game assets.
4. [IUCN Cat Specialist Group snow leopard](https://www.catsg.org/living-species-snowleopard): pale-centred rosettes, solid spots on head/neck/limbs, short rounded ears, and tail roughly 75–90% of body length. The existing rosette painter is a coarse prototype: it is not yet a faithful body-region pattern map. [San Diego Zoo's own rosette observation](https://adminzoonooz.sandiegozoo.org/story-hub/zoonooz/snow-motion) independently confirms the coat cue.
5. [Smithsonian cheetah](https://www.nationalzoo.si.edu/animals/cheetah): slim long-legged body, small head, solid spots and tear marks, ringed tail, and cub mantle. Those are anatomical/coat targets; its natural speed is not authorisation to change the game's speed tuning.
6. [EAZA jaguar guidelines](https://media.eaza.net/uploads/Panthera_Onca_BP_Gs_2022_DOI_e601d75e8a.pdf): stocky muscular build, prominent cheeks and square jaw; melanistic animals retain rosettes visible in bright light. Keep the selected black morph. A jaguar's naturally broad jaw is supported; exaggeration merely to differ from tiger is not.
7. [British Deer Society roe identification](https://bds.org.uk/wp-content/uploads/2024/07/Roe_Leaflet_web.pdf): small antlers typically three points per side, large ears and prominent pale rump. [British Wildlife Centre's animals](https://britishwildlifecentre.co.uk/planyourvisit/animals/roe-deer/) also show seasonal coat differences and spotted young. These support a shorter roe antler target, not a new species.
8. [Washington Fish & Wildlife moose](https://wdfw.wa.gov/species-habitats/species/alces-alces): broad palmate adult antlers, long muzzle, long legs and throat bell. [Missouri Conservation elk](https://mdc.mo.gov/discover-nature/field-guide/elk) documents the different wapiti antler form. This explains the naming ambiguity without resolving it on Ed's behalf.
9. [Smithsonian fennec](https://www.nationalzoo.si.edu/animals/fennec-fox): cream/fawn coat, white underside, bushy black-tipped tail and very large ears on the smallest canid. Ear size is a real trait; it should not be exaggerated further to distinguish the fox family.
10. [Natural History Museum stag-beetle account](https://www.nhm.ac.uk/discover/stag-beetles.html), including its beetle curators' observations, and [PTES stag-beetle field identification](https://stagbeetles.ptes.org/stag-beetles-in-woodlands/): antler-like male jaws, dark head/thorax, often chestnut wing cases and association with decaying wood. The existing model can remove fictitious ember paint and use brown material; exact material separation/jaw curvature remain visual-review targets, not a claim of perfect Lucanus cervus anatomy.

## Family targets for generator iterations

### Cats — first iteration target

Members: sand cat, cheetah, black jaguar, lion, lynx, snow leopard, tiger. Use one visibly related feline body with natural differences. Sand cat: short limbs, broad head, large **low-set** ears, sandy coat, sparse leg bars and short ringed tail ([Smithsonian](https://nationalzoo.si.edu/animals/sand-cat)). Current tall pointed ears are a target for an ear-placement interface, not a reason to make it fennec-like. Cheetah: fine legs, deep narrow chest, small head, solid spots, tear lines; inspect current arch strength before changing it. Jaguar: retain the melanistic variant and faint rosettes, muscular body and broad jaw; inspect the source's expressly distinction-motivated oversized adult head. Snow leopard: smoky rosettes and long thick tail. Lion and tiger should share big-cat anatomy, distinguished by real mane/stripes and proportions. Lynx keeps short tail, natural ear tufts and broad paws. Walking target: feline footfall and flexible body without changing fight speed; current gait must be captured before proposing corrections.

Known model request: ear root position/angle independent of ear size, and rosette placement that remains natural across flank/top views. Do not enlarge a face or crest to beat another cat's silhouette score. Current/proposed snow leopard preset is the first concrete marking target; other cat items are inspection targets, not silently implemented changes.

Score history: **baseline unscored → snow-leopard candidate 1 fine speckle (builder rejects) → candidate 2 fewer rings, capture pending; independent scores pending.**

### Bears — second iteration target

Members: black bear, polar bear. Shared plantigrade bear body and flat feet. Black bear: straight back without shoulder hump, prominent ears, tan muzzle; retain dark variant. Polar bear: longer neck, small ears, broad paws, white coat; existing neck/head differentiation is useful. Do not use a generic huge hump to differentiate them. Preserve original elder story anatomy pending review. Walking target: weight on flat soles, not canine raised heels. First preset removes ordinary black-bear hump. Reference: NPS above; exact polar-bear proportion changes await reference/visual review.

Score history: **baseline unscored → candidate 1 source correction applies but visible effect slight; independent scores/graph iteration pending.**

### Deer — third iteration target

Members: roe deer, stag, elk. Related hoofed body with naturally different scale, neck and antlers. Roe: small body, short antlers, pale rump. Stag: larger red-deer-like form and branched antlers. Current `elk` has palmate antlers and long muzzle: in British usage this can mean moose; settle intended common name before “correcting” it into a wapiti. Current generic branch antlers may overbranch roe deer; inspect first. Walking target: hoof contact and long-limbed deer posture without changing rules speed. No deer preset yet; pictures and intended-species answer trigger the next bounded implementation.

Score history: **baseline unscored → builder sees overbranched ordinary roe antlers; independent scores/model iteration pending.**

### Canids — fourth iteration target

Members: wolf, fox, arctic fox, fennec. All share canid anatomy. Wolf larger and deeper-chested; red fox slim, russet with dark socks and brush; arctic fox compact with short rounded ears and dense white winter coat; fennec small, sand-coloured with naturally large ears. Existing arctic juvenile ear-size overrides undermine the compact-ear target and are explicitly overridden by the preset. Do not force further silhouette separation. Walking target: raised-heel canid stance and foot contact; compare with bears' flat feet. Reference: Alaska agency above. Fennec proportions need separate references before alteration.

Score history: **baseline unscored → arctic-fox candidate 1 removes spikes but weakens ear cue; independent scores/rounded-triangle model pending.**

### Remaining families

Mustelids: badger, marten, otter, stoat share elongated bodies, with natural blaze/bib/tail/seasonal coat differences. Rodents: squirrel/flying squirrel remain related; beaver paddle and dormouse furry tail are animal features, not invented badges. Caprines: ram curl versus ibex backward-swept ridged horns needs inspection. Remaining mammals, birds, reptiles, amphibians, arthropods and snail require anatomy checks in their own builder, especially limb counts, membranes, shell segments and species-specific markings; the census records each target. Stegosaurus is extinct, not mythic: colour is speculative, anatomy is constrained by fossils. Fantastic kinds and legends keep their animal-specific stories.

## Decisions/questions routed separately to coordinator

1. **Ed review choice: ordinary “Fire beetle” versus “stag beetle” intent/name.** Current comparison has ember fissures at every level; candidate has a natural dark stag-beetle ordinary body and a fiery elder. Coordinator authorised the recommended candidate in 6513102826; the name is unchanged. Present both pictures to Ed. No gameplay change implemented.
2. Intended species/common names for elk, elephant, rhino, penguin, newt and python must be settled before correcting species-dependent anatomy or seasonal markings. The audit identifies ambiguity rather than inventing an answer.
3. No gameplay-role proposal is needed for these three art changes. If a later add/merge is wanted, it requires a separate role/population/area decision; this PR must not change the balance harness.

## Bestiary text inventory and census handoff

Production bestiary names/descriptions and sigils are unchanged so far. Review descriptions added with the presets (absent → new):

- Black bear: “A dark forest bear with a straight back, prominent ears and a pale muzzle.”
- Arctic fox: “A compact white winter fox with short rounded ears and a dense brush tail.”
- Snow leopard: “A smoky pale mountain cat with dark rosettes, broad paws and a long thick tail.”
- Fire beetle: “A dark beetle with brown wing cases and antler-like jaws; its elder carries the fire.”

These are staged review text, not activated player text. Integrate with the selected bestiary display when #1470's switch interface exists. Keep every bold glyph; review existing small arctic-fox glyph already uses rounded ears. New body similarity does not justify changing readable sigils.

Comparison-sheet text added (absent → new; braces denote dynamic source values): `{id}: current / proposed — studio`, `{id}: current / proposed — night`, `Native baked art pixels (1x); not perspective screen capture`, the exact rendered source SHA, `CURRENT`, `PROPOSED (default off)`, and `{towards|away} frame {0|1} level {0|1|2|3}`. The 2x copy enlarges the same labels; there are no activated game-menu, glyph or bestiary-string changes. Report/audit prose is review documentation, not new player text.
An optional unlit colour sheet adds `{id}: current / proposed — albedo` via `ROSTER_LIGHTS=albedo`. It shows the baked palette directly, without the deferred coloured light.

For #1475 via coordinator: census remains 64; no species/class/role additions. Distinguish legacy ranged flags from current pack ranged attacks, and attach campaign seed to island membership. Builder counts are 23 active, with scarab dispatch unused. No balance edits made here.

## Deferred work with checkable triggers

| Item | Why deferred | Trigger | Where |
|---|---|---|---|
| Production default-off hook integration | #1470 owns hook/cache keys; complete pack adapter already prepared | Coordinator confirms #1470 release into prototype containing look/palette level contract | art/roster/presets.js; #1479 |
| Exact game-size ground/treetop screenshots | Cloud-only captures and hook needed | Accepted switch commit and cloud runner result available | tools/roster/; previews/ed/roster |
| Cat ear roots and anatomical gait | No accepted graph feature interface yet | #1470 posts interface and first matched family captures | Family target notes above |
| Independent likeness scores and iteration | No actual review yet | Coordinator's independent reviewer posts species findings | Score history per family above |
| Species-dependent remaining redesigns | Intended species and current rendered anatomy unresolved | Coordinator answers species question and matching captures reviewed | All-species census gaps |

No artistic acceptance, screenshot result, or green art check is claimed before the actual evidence arrives.

## Verification record

At implementation commit `f822dee280076d6416c37ecda90c5b071f66190d`: three preset tests passed; comparison tool syntax passed; census generated successfully; `npm run typecheck` passed. Nearby `src/rules/species.test.ts` passed 14 tests. `src/creatures.test.ts` initially reported three stale indexes because this Windows checkout used CRLF but its generators compare exact LF bytes; running the official three index generators produced no Git content diff, and the registry rerun passed all eight tests. First restricted Vitest attempt failed before execution on a temporary-cache permission error; the successful run used the required local access.

Cloud comparison and `node art/check.mjs --only bear,arcticfox,snowleopard --no-lab` requested on that exact SHA in PR comment 6513060204; coordinator assigned Whiskey in 6513069962. Since the three presets are currently isolated, that standard art check checks **default production art**, not the candidate presets. Candidate sheets and data validation are additional evidence; candidate art-check integration must use #1470's accepted selection hook.

At beetle implementation `6183c511f000c326651e2e73fed751c62b1075e1`, all four preset tests pass and the post-merge typecheck passes. Released prototype `08b4213a43f2eb3c4484cd0e0f83adb7a325673c` was incorporated by normal merge as requested in 6513113895. Beetle-only cloud capture/check requested in 6513180762; full baseline census remains pinned to `8308346aaa488b7a015f08fc60a01cb939c2aa79` in 6513131000. Earlier matched images remain valid for their recorded source commits; no claim that they depict newer generator work.
At `0f4181fdabe97c79e0263192c1bf2c4c7dc15c71`, five preset tests, tool syntax, all-64 visual-note coverage, census generation, diff whitespace and `npm run typecheck` pass. CI smoke on earlier `1febcf909` failed only `Pause over the overlays` → `finds-dev: the pad's B resumes` (run 40989989947, job 123849798068); coordinator identified that pause flake and instructed no roster-unrelated action (6513399515), exact log reported in 6513447830. This is not an all-CI-green claim.

For the remaining visual census, `node tools/roster/catalogue.mjs` delegates eight bounded groups of eight species to the standard lineup renderer. Each includes all four levels and the witch at native baked art scale, towards, in studio lighting; its manifest records species IDs and exact source SHA. Those baseline sheets will support actual art-quality notes for all 64 after cloud review, not substitute for matched/night/in-game acceptance of proposed changes.

## First actual visual review and next iteration

Whiskey completed comparison, default art check and publishing at `f822dee2`, all exit 0 (6513204160). All six native studio/night sheets were inspected by this builder. [Published comparisons](https://github.com/edsaperia/witch/tree/claude/ed-shots/previews/ed/roster/roster) and [all eight baseline sheets](https://github.com/edsaperia/witch/tree/claude/ed-shots/previews/ed/roster/catalogue/catalogue) have doubled directories because `push.mjs --to` is a parent: future directory publications use `--to previews/ed` for source directory `roster`. Existing files/links stay; no destructive move.

- **Bear:** correction is effective in source (base and all ordinary `levelQ.humpK=0`, `front=1`, asserted in tests), but the visible change is slight. Normalisation to each level's target height and remaining shoulder/torso construction can mask an anatomical parameter change. That explanation is an inference from source, not a measured causal result. Do not force a larger hump difference simply to make the comparison dramatic. Need graph iteration for a natural back/flat-foot read. Elder appears unchanged.
- **Arctic fox:** round-ear candidate removes tall spikes, but low round discs can bury the ear cue. Need short rounded-triangular fox ears, with root/angle control, rather than bear-like discs. Studio coat is yellow-green and night coat blue in both columns; palette desaturation alone has not established white-coat fidelity.
- **Snow leopard:** original ordinary patches are blocky; first rosette candidate instead makes dense fine speckle on adult flank. Not accepted. Data iteration 2 reduces rosette frequency from 8 to 5 and density from .7 to .55 (baby from 7/.7 to 5/.55); these are existing painter parameters, not real measurement units. This should leave fewer, more coherent rings but remains an unverified hypothesis until captured. Body-region placement (rosettes torso, solid head/limb spots) still needs #1470 model support. Elder is unchanged.
- **Beetle:** Victor completed `6183c511f` compare/default art check/publish, all exit 0 (6513297309). This builder inspected both native sheets too. Removing fissures helps, but cases are olive/khaki under studio light and jaws read as narrow forward prongs, not stout curved toothed mandibles. Elder matches. Coordinator requested candidate 2 (6513300639); model-feature request 6513329836 asks #1470 for separate head/thorax/case materials, jaw curve/width/teeth and away-view tips. Use a reflected-light rim, not fictional biological glow. Natural warm case edges can connect to elder fire. Do not rename.

Night sheets use `art/lighting.js` alone, on plain dark panels. They omit the game's actual ground, runtime moonlight rim, party lighting and perspective. Their dark beetles are evidence of those sheet conditions, not proof of actual in-game invisibility. The studio pass hardcodes saturated ambient/moon tints, so `ROSTER_LIGHTS=albedo` is available to separate paint colour from coloured illumination before chasing a green cast with an unnatural palette.

Whiskey's baseline warnings: bear adult→legend growth difference 0.12; snow leopard young→adult 0.17; polar bear/rhino similar outlines 0.81. These are targets for anatomical/stage review, not instructions to distort related animals or remove valid natural similarity. Independent all-64 reviewer assigned in 6513239900; no scores have been invented here.
