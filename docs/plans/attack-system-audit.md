# Attack system Stage1 audit and implementation plan

2026-10-30. Audit source and bounded fixture results, before any attack rule/configuration changes. This is Stage1, not a balance pass or a claim of combat strength. Original 18:02 UTC reporting target was interrupted by canonical PR1500 CI correction COORDINATOR6529220446; that correction is pushed and reported as6529629457.

## Findings and order of work

1. **Fix mixed-kind target identity (P1, demonstrated).** In src/rules/attacks/engine.ts the body/zone hit sets store bare numeric IDs. A witch and creature sharing ID0 suppress each other's hit. Piercing and area fixtures each produce one contact for shared IDs versus two for distinct IDs. Namespace by target kind and ID; retain once-per-target, piercing and zone semantics. Add regression tests before changing code. No damage, health or timing tuning.
2. **Guard sheltered targets across the whole hit (P1, demonstrated).** src/rules/attacks/combatWorld.ts calls land then effects; land can reject sheltered witches while effects still stun them. Actual adapter fixture records zero hitWitch calls but one stunWitch call. Check melee extras as well as grammar effects, retaining existing shelter/targeting rules. Test stun/root/pull/slow/knockback rejection and accepted hits. Do not change public windup cues.
3. **Correct momentum cache invalidation (P2, demonstrated edge).** src/rules/momentum.ts caches by classes reference plus species and overrides, omitting the class selected from the heavy-species list. Changing only that list leaves cached badger normal turn7.33038/delay0.25; a fresh classes reference yields heavy turn3.83972/delay0.4. Include effective class identity in the cache key. No class retuning.
4. **Add accepted-outcome observation (P1 measurement gap).** Spell contacts have source IDs, but accepted damage/dodge/stun outcomes are not attributed to a cast in the current arena port. Preserve existing cues/events; propose a detached observer hook carrying cast/source/target kind+ID and accepted outcome. Route shared visual/audio hook overlap through coordinator/#1468. Never count contacts as effective hits.
5. **Visibility ruling recorded; legends unchanged.** COORDINATOR6529760376 records Ed's ruling (17:56 UTC): “Keep as-is - if it is attacking, the legend already has a pointer”. Legends retain long-range attacks: no LOS, on-screen requirement or range change. Drop the offscreen-hit criterion for legends; it still applies to ordinary creatures. The actual spellWorld adapter supplies neither camera visibility nor blocked/LOS, although the engine supports an optional blocked callback. Flat fixtures do not prove ordinary-creature terrain/visibility fairness. This closes the legend policy question, not an authorization to alter ordinary attacks without a scoped design.
6. **Readability milestone held.** Per COORDINATOR6529731246, hold items6–7 until items1–4 are done and Ed has answered. The legend answer is now recorded; items1–4 must still finish. Any later unseen design stays default OFF. Audit overlapping tells, source attribution, sound throttling and pose readability in a routed playable review. Geometry is present for every form, nine species lack an explicit pose, and generic windup squash remains. Preserve the cues observed by #1477. Request #1468 hooks rather than implementing its VFX. No visual-quality claim from this source audit.
7. **Variety/animal likeness, deferred identity changes.** Structural pairs below are review candidates, not exact duplicate configurations. Keep identities unchanged until coordinator/Ed roster routing; preview any new design behind default OFF. Damage/health/stun thresholds and win rates remain out of scope.

## Exhaustive species inventory

All64 configured species, young/adult legal attack derivations. Ranges in metres; times in player/world simulation seconds as configured. W/C is windup/cooldown; warning is recursive minimum warning, not proof that a cue is visible or an attack is dodgeable. Effects are raw configured cast-budget shares/effects, not witch HP damage. A missing explicit pose still has generic windup and the form telegraph. Child keys identify follow-up grammar; full values remain in species.json.

|Species|Form/pattern|Range young/adult|W/C|Warning young/adult|Pose; telegraph|Hit; follow-ups|Animal-fit intent|
|---|---|---:|---:|---:|---|---|---|
|badger|melee/single|2.5/2.75|0.6/1.8|0.6/0.6|crouch; flash|{"effect":{"knockback":7}}; none|a shoulder-barge lunge that knocks her back|
|dormouse|bolt/single|20/22|0.6/1.8|0.6/0.6|generic; lane|{}; none|a quick seed flicked straight at her|
|fox|bolt/single|18/19.8|0.6/1.8|0.6/0.6|glow; lane|{}; none|a foxfire wisp curving in|
|hare|area/single|3/3.3|0.6/1.8|0.6/0.6|stamp; ring|{"damage":0.8}; none|a stamp: the ground jolts round it|
|hedgehog|bolt/ring|6/6.6|0.7/2.2|0.7/0.7|spread; lane|{"damage":0.5}; none|a ring of quills, short reach|
|marten|bolt/burst|18/19.8|0.6/2|0.6/0.6|generic; lane|{"damage":0.6}; none|two pinecones thrown in quick succession|
|mole|area/single|20/22|0.9/2.4|0.9/0.9|stamp; ring|{}; none|the ground heaves up where she stood|
|snail|zone/single|4/4.4|0.8/3|0.8/0.8|generic; ring|{"effect":{"slow":{"mult":0.6,"time":1}}}; none|a slime patch round it that slows|
|squirrel|lob/single|22/24.2|0.6/2|1.6/1.6|generic; landing|{}; none|an acorn lobbed onto where she stands|
|stoat|melee/single|2/2.2|0.5/1.4|0.5/0.5|coil; flash|{}; none|the fastest, longest lunge at home|
|beaver|runner/wall|16/17.6|0.8/2.6|0.8/0.8|rear; lane|{"damage":0.6,"effect":{"knockback":5}}; none|three logs rolled at her side by side|
|boar|area/single|3/3.3|0.7/2|0.7/0.7|crouch; ring|{"effect":{"knockback":9}}; none|a goring sweep in an arc in front|
|moth|bolt/single|24/26.4|0.7/2.2|0.7/0.7|spread; lane|{"effect":{"slow":{"mult":0.6,"time":1.5}}}; none|a fluttering puff of dust that slows|
|newt|bolt/single|18/19.8|0.7/2.2|0.7/0.7|generic; lane|{"effect":{"slow":{"mult":0.7,"time":1.5}}}; none|a slime streak that passes through and slows|
|stag|area/single|10/11|0.8/2.4|0.8/0.8|rear; ring|{"damage":0.5,"effect":{"knockback":6}}; none|stamps marching out in a line toward her|
|toad|lob/single|20/22|0.7/2.2|1.5/1.5|crouch; landing|{"damage":0.6}; none|a hop-splash lob that bounces once|
|elk|area/single|6/6.6|0.8/2.6|0.8/0.8|stamp; ring|{"effect":{"knockback":6}}; none|a frost stamp: a ring spreading out that knocks back|
|wolf|melee/single|2/2.2|0.55/1.6|0.55/0.55|crouch; flash|{"effect":{"slow":{"mult":0.6,"time":1.5},"knockback":5}}; none|a frost bite lunge that slows and knocks back|
|owl|bolt/single|26/28.6|0.8/2.6|0.8/0.8|spread; lane|{}; none|a silent feather homing in, speeding up|
|raccoon|bolt/single|18/19.8|0.7/2.4|0.7/0.7|generic; lane|{"damage":0.6}; none|a junk can thrown out and coming back|
|cat|bolt/fan|6/6.6|0.6/1.8|0.6/0.6|crouch; lane|{"damage":0.5}; none|three short claw slashes in a fan|
|fennec|bolt/spray|10/11|0.6/2|0.6/0.6|stamp; lane|{"damage":0.35}; none|a sweeping spray of sand, slowing as it goes|
|bat|area/single|4/4.4|0.6/1.8|0.6/0.6|spread; ring|{"damage":0.8,"effect":{"slow":{"mult":0.7,"time":1}}}; none|a screech: a ring spreading out that slows|
|snake|bolt/single|18/19.8|0.7/2.2|0.7/0.7|coil; lane|{"effect":{"slow":{"mult":0.6,"time":2}}}; none|a curving, weaving venom spit that slows|
|heron|bolt/single|26/28.6|0.8/2.4|0.8/0.8|rear; lane|{}; none|a beak-spear that speeds up and pierces|
|otter|lob/single|20/22|0.6/2|1.2/1.2|generic; landing|{"damage":0.5}; none|a skimming pebble, bouncing twice|
|lynx|melee/single|2.5/2.75|0.6/2|0.6/0.6|coil; flash|{"effect":{"stun":0.3,"knockback":4}}; none|a pouncing lunge that stuns|
|raven|bolt/fan|28/30.8|0.8/2.6|0.8/0.8|spread; lane|{"damage":0.6}; none|two curving feathers relayed through its packmate|
|ram|melee/single|2.5/2.75|0.7/2|0.7/0.7|crouch; flash|{"effect":{"knockback":12,"stun":0.25}}; none|a headbutt lunge that throws and stuns|
|salamander|beam/single|14/15.4|0.8/3|0.8/0.8|glow; beamLine|{"effect":{"burn":{"dps":1,"time":2}}}; none|a short fire breath sweeping across, burning creatures|
|meerkat|bolt/burst|20/22|0.6/2.2|0.6/0.6|rear; lane|{"damage":0.4}; none|three pebbles arcing in quick succession|
|spider|bolt/single|20/22|0.7/2.6|0.45/0.45|rear; lane|{"damage":0.7,"effect":{"root":0.5}}; expire|a web shot that roots, leaving a web patch|
|arcticfox|bolt/single|18/19.8|0.7/2.4|0.45/0.45|crouch; lane|{"damage":0.6}; expire|a frost shard that bursts into three where it ends|
|penguin|runner/single|14/15.4|0.7/2.6|0.45/0.45|crouch; lane|{"damage":0.7}; expire|a belly-slide that slows to a stop on an ice patch|
|flyingsquirrel|lob/single|22/24.2|0.7/2.6|0.45/0.45|generic; landing|{"damage":0.6}; land|an acorn that scatters four splinters where it lands|
|roe|area/single|12/13.2|0.8/2.6|0.8/0.8|stamp; ring|{"damage":0.4,"effect":{"knockback":5}}; none|kicks in a cross round where she stood|
|cheetah|runner/single|18/19.8|0.6/2.2|0.45/0.45|crouch; lane|{"damage":0.7}; expire|a dust devil accelerating at her, leaving dust|
|lion|area/single|6/6.6|0.9/3|0.9/0.9|rear; ring|{"effect":{"knockback":8,"stun":0.3}}; none|a roar: a wide cone that throws and stuns|
|jaguar|area/single|14/15.4|0.9/2.4|0.9/0.9|coil; ring|{"effect":{"knockback":6}}; none|a long-telegraphed pounce onto where she stood|
|tiger|bolt/fan|7/7.7|0.75/2.2|0.75/0.75|rear; lane|{"damage":0.5,"effect":{"knockback":4}}; none|three raking slashes in a wide fan that pierce|
|crocodile|zone/single|8/8.8|0.9/3|0.9/0.9|crouch; ring|{"damage":0.8}; none|a whirlpool that drags her in while it bites|
|dragonfly|bolt/single|22/24.2|0.7/2.4|0.7/0.7|glow; lane|{"damage":0.6}; none|a weaving spark that chains from foe to foe|
|ibex|area/single|16/17.6|0.9/2.8|0.9/0.9|stamp; ring|{"damage":0.4,"effect":{"knockback":6}}; none|a rockfall marching out in a line|
|redpanda|bolt/single|18/19.8|0.7/2.4|0.7/0.7|generic; lane|{"damage":0.5}; none|a leaf thrown out swaying and coming back|
|beetle|mine/single|16/17.6|0.7/3|1.25/1.25|rear; arming|{"damage":0.7}; hit|a dung bomb laid at her feet: a blast and a ring of embers|
|woodlouse|runner/single|16/17.6|0.8/2.6|0.8/0.8|coil; lane|{"effect":{"knockback":7}}; none|a stop-and-go roll, re-aiming at each stop|
|armadillo|runner/single|18/19.8|0.8/2.6|0.45/0.45|coil; lane|{"damage":0.7,"effect":{"knockback":5}}; expire|a roll that bursts into pebbles at its end|
|rattlesnake|mine/fan|16/17.6|0.7/3|1.4/1.4|coil; arming|{"damage":0.6,"effect":{"slow":{"mult":0.5,"time":2}}}; none|two venom traps laid round her|
|griffin|lob/single|26/28.6|0.9/3.2|0.45/0.45|spread; landing|{"damage":0.6,"effect":{"knockback":6}}; land|a dive that lands as a gust: a ring of curving feathers|
|scorpion|bolt/single|18/19.8|0.8/3|0.8/0.8|rear; lane|{"damage":0.3,"effect":{"slow":{"mult":0.7,"time":1.5}}}; timer|a sting that sticks, then bursts a venom cloud|
|frosttroll|area/single|6/6.6|1/3.4|1/1|stamp; ring|{"damage":0.4,"allies":{"effects":["slow"]},"effect":{"slow":{"mult":0.5,"time":1.5}}}; none|three frost rings spreading out one after another|
|polarbear|area/single|22/24.2|1/3.6|0.8/0.8|rear; ring|{"damage":0.3}; none|icicles raining round where she stood|
|bear|area/single|4/4.4|0.9/3|0.9/0.9|rear; ring|{"damage":0.8,"allies":{"effects":["knockback"]},"effect":{"knockback":10}}; none|a huge swat in a wide arc|
|unicorn|beam/single|22/24.2|0.8/3.4|1.25/1.25|glow; tetherLine|{"effect":{"slow":{"mult":0.6,"time":1}}}; none|a rainbow strung between two unicorns|
|rhino|runner/wall|18/19.8|0.9/3.2|0.9/0.9|crouch; lane|{"damage":0.6,"allies":{"effects":["knockback"]},"effect":{"knockback":9}}; none|a stampede: two charging runners with a gap to slip through|
|sphinx|beam/single|22/24.2|0.8/3.6|1.4/1.4|glow; beamLine|{"effect":{"stun":0.2}}; none|a golden gaze beam that charges, then tracks her|
|elephant|area/single|6/6.6|1/3.4|1/1|stamp; ring|{"damage":0.6,"allies":{"effects":["knockback"]},"effect":{"knockback":8}}; none|two great stomp rings that throw|
|featheredserpent|bolt/ring|18/19.8|0.9/3.2|0.9/0.9|spread; lane|{"damage":0.3}; none|six feathers spiralling out|
|crab|area/single|16/17.6|0.7/3.4|1.5/1.5|spread; ring|{"effect":{"knockback":6}}; none|three crabs mark a triangle and the water inside erupts|
|hydra|bolt/fan|20/22|0.9/3.2|0.45/0.45|rear; lane|{"damage":0.35}; expire|three heads spit homing venom that leaves pools|
|frostwyrm|beam/single|20/22|0.9/3.6|1.3/1.3|rear; beamLine|{"effect":{"slow":{"mult":0.5,"time":1.5}}}; none|a frost breath sweeping wide after a charge|
|snowleopard|area/single|18/19.8|0.8/3|0.8/0.8|coil; ring|{"damage":0.35,"effect":{"slow":{"mult":0.6,"time":1}}}; none|frost bursts in a cross round where she stood|
|komodo|bolt/single|16/17.6|0.8/3|0.45/0.45|coil; lane|{"damage":0.6,"effect":{"burn":{"dps":0.8,"time":3},"slow":{"mult":0.6,"time":2}}}; hit|a weaving venom bolt that burns and leaves a pool|
|stegosaurus|bolt/spray|10/11|0.9/3.4|0.9/0.9|spread; lane|{"damage":0.25,"effect":{"knockback":4}}; none|a spray of tail spikes swept round|

Babies have no attack; adults derive from young attacks (including spread/radius/range/lunge scaling), not separate tuned rows. Legends derive per species: range420, windup2.2, cooldown15; full derived form and minimum child warnings are recorded per row in [species.json](../notes/attack-audit/stage1b/species.json). Ed ruled these long-range attacks remain as-is because attacking legends already have a pointer; no legend visibility/LOS restriction is proposed.

## Readability, fairness and variety audit

Source contracts: attacks/timeline.ts applies recursive minimum warning floor0.45s. All64 young and adult strict parses pass, minimum warning0.45s. This exceeds the nominal reaction0.25 + input0.125 + simulation step0.016667 budget0.391667 by0.058333s, but travel, occlusion, cue visibility, overlapping attacks and action availability prevent a universal dodge guarantee. A geometry flash/lane/ring is not a verified visible warning.

render/leash/attackSpells.ts draws bodies, zones, beams, telegraphs and tells with source element/species context. render/attackFeel.ts supplies generic windup squash. Explicit poses are absent for dormouse, marten, snail, squirrel, newt, raccoon, otter, flyingsquirrel and redpanda. platform/audio/sfxCues.ts consumes combat.events, with generic creature voices/spatial panning and a boss windup swell; grammar SpellState events are not directly its input, and cooldown voice gaps can throttle cues. Verify overlap and audio attribution during a routed review, not by claiming source presence means clear play.

Forms:5 melee,24 bolt,16 area,2 zone,5 lob,6 runner,4 beam,2 mine. Structural-signature pairs: boar/bear, stag/ibex, toad/otter, elk/elephant, bat/frosttroll. Numeric/element differences remain; existing within-biome variety checks should stay. Animal-fit intent is recorded verbatim per species above. Magical projectiles are intentional design candidates, not biological correctness bugs.

## Combat backlog and grammar/orbit coverage

combat.ts already counts per-witch windup/lunge/swoop/own moves plus release gap for token limits, and pack pressure/waiting-ring style logic exists. Live grammar beams/zones/children do not themselves retain token occupancy after release: this is a design question about overlapping hazards, not permission to retune tokens. startSpell retains the grammar spec windup; do not infer a shortened legacy timer bypasses its floor. Review combat backlog against these implemented paths before duplicating them.

Orbit fills/rebase/join/shed, newest-end drain and dazed/happy/hostile queue paths were read; no orbit defect is established by this audit. Add boundary regressions for overfull transitions/clock rewind/target state when editing that code. Grammar parse/depth/child-cap and adult expansion were audited; no claim that successful parsing proves runtime safety. Potential named-child error propagation still needs a focused reproduction before being labelled a bug.

The balance note mentions seven species/ages that cannot be stunned alone but does not identify them. Historical v5655 protected-health, paused-wave baselines cover only five species across ranks/bags/BPM and censored cutoffs. They cannot establish impossibility. Do not invent the seven identities or change thresholds: propose separately routed cloud census with exact loadouts and censored outcomes, then report balance findings only.

## Measurements, provenance and limits

Raw manifests and JSON/JSONL are retained in ../notes/attack-audit/stage1, stage1b and stage1c. Each manifest binds its exact tool/source revision and inputs. Do not relabel earlier outputs as later source fitness. Jobs each used one worker with a120s whole-job ceiling, completed without cap/restart: stage1 6.292s, corrected stage1b8.450s, stage1c3.164s. No browser, long sweep or drawing run.

Initial stage1 pack fixtures left the spectator witch on the ground; retained as calibration, superseded for pure pack comparisons by stage1b's treetop spectator. Three20s corrected pack cases plus one exact repeat: wolves/ravens combat hits7, wolves/cats32 with one loss, boars/foxes13 with five stuns. All censored without whole-side win; spectator took no hits. Wolves/ravens repeat event/state/attack digest matches bab70dc278f7a748462eadf7859909b9cb233647217f23b81036c6beb33f8423. Combat totals include melee; engine contacts alone do not measure all damage. Per-attack accepted hits/dodges/stuns are explicitly null, not zero. Expired untouched bodies are only a miss proxy; live bodies, beams and zones need different accounting.

Flat-engine reaction fixtures assess54/64 species with an initial stationary contact;10 unassessed are not labelled safe. Marten and polar bear still contact after one early15m blink at0.25s. This is not an optimal dodge test and lacks actual Game invulnerability, terrain and camera/pack context.

stage1c uses actual Game witches and the existing approximate camera rectangle without occlusion plus public HUD/audio. Actions use consumed cues at least0.25s old; observed delay0.266667s and minimum input gap0.133333s (7.5Hz, within8Hz). Four12s cases at seed5: wolf idle health loss3/KO0, delayed policy0/KO0; cat idle4/KO1, delayed policy4/KO1. Delayed wolf has3 held-button requests/6 accepted blink starts; cat4/7. Holding a button across game buffering can produce more starts than requests; both counts retained. No aiming/invitation, no trained policy or general survival/counterfactual claim. Earlier stage1b nominal8Hz control had a7-frame interval and is superseded for the input-floor claim by stage1c.

## Validation and next milestones

Artifact assertions check all64 configured rows, strict parse errors0, warning floors, matching pack repeat digest, no spectator damage, completed manifests below120s and actual delayed controls within reaction/input floors. Run current typecheck, nearby attack/blocks/reach/momentum/orbit tests and tool syntax checks before Stage1 report. No full suite/build/smoke claim.

Stage2 sequence: reproduce target identity in unit tests and repair; reproduce sheltered effect leakage and repair all relevant adapters; correct momentum cache invalidation. Each gets a separate milestone REPORT with exact SHA/typecheck/nearby tests and original deterministic arena comparison when relevant. Then implement accepted-outcome observation with routed overlap, before using arena metrics to justify any readability/variety change. New unseen designs default OFF; no balance changes.

Reproduce bounded current harness using a fresh directory: `node tools/attacks/audit.mjs --out docs/notes/attack-audit/new-run`; witch-only: `node tools/attacks/audit.mjs --witch-only --out docs/notes/attack-audit/new-witch-run`. It refuses manifest overwrite. Larger species/seed/loadout sweeps require canonical cloud routing and an explicit case-file/shard interface first; current tool has fixed short fixtures, so no unsupported sweep command is presented as runnable. Proposed shards:4 cases per job, each<=120s, deterministic seeds and raw accepted outcomes, exact legal loadout, with protected/privileged setup and censoring declared. No local larger sweep authorized or run.
