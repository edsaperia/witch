# C1 source milestone: six placement declarations

Draft #1668 implements the accepted15-case manifest incrementally. Basec7b1f993 includes merged combat #1654. This checkpoint changes six callbacks across four files; the other nine C1 callbacks remain pending, not claimed complete.

| Audit case | Changed/removed assertion and reason | Retained/replacement blocking protection |
|---|---|---|
| berries:38 | area coverage>.9 and lower-count share>.9 move to the report | original unique berry/bush index map, every populated area's configured count bound, exact seed replay; nonempty guard added |
| berries:124 | quadratic patch-neighbour share>.9 moves to the report | nonempty finite bush positions and consistent unique berry indexing; original feed/conservation/seed cases untouched |
| growth:25 | each of800-draw level shares27-40% moves to the report | all800 returned levels valid; original exact replay and forced-adult/baby weight assertions unchanged |
| rules:1581 | fast-species sample share<.15 moves to the report | original configured witch/creature speed and legend ordering assertions unchanged; nonempty population guard added |
| stoneIdle:33 |120s largest-world outside/centre/quartile/baby-far shares move to the report | supplied dry-area annulus endpoints, same-area target rejection/fallback, baby/legend/boss/circle exclusions through public pointInArea/idlesAtStone |
| stoneIdle:52 |60s friendly/off far shares move to the report | supplied friendly and disabled modes choose from their home range; public eligibility excludes friendly/leashed/enraged/dancing/happy creatures; valid cell checked |

No registration removed. The two stone-idle declarations now use supplied maps instead of generated games; obsolete local largest-world/roaming helpers move to the survey. Its first supplied map lacked the rule's required `cellSafe` query; that was corrected before the passing focused run. Typecheck also caught an inferred number instead of the level union and incomplete circle fields; explicit typed fixtures correct these. No production rule, tuning, combat/MP or user-visible text changed. Merged baby-scatter and every unowned callback remain unchanged. AST comparison across all ten manifest files confirms six changed callbacks,188 unchanged and zero registrations removed.

`creatures-placement.behaviour.ts` retains the six original samples: full seed123 berries and quadratic patch query;800 equal-weight level draws; full rules.test.ts opt-in scenery population; largest shipped seed123 stone-idle120s and friendly/off60s at0.1s cadence. It preserves the original outside count's initial-spawn contribution, recording that numerator detail rather than silently correcting it. Actual counts, denominators, distances and fixture metadata accompany informational references. Runner requires its fresh JSON beside music/world/world-rules. Later canonical combination must preserve IP2's two providers and T6's replay hookup.

Validation at this checkpoint uses normal/report typechecks, the two supplied stone-idle cases and existing five report-harness cases, plus AST callback identity/index/whitespace checks. No local generated world/game/replay, heavy simulation, browser or full suite. CI and later independent reporting supply generated coverage/execution separately. No source completion, cloud report execution or timing saving is claimed; future savings comparisons require medians from at least two runs per side.

Remaining nine owned cases: babies120, glide12, naps35/129, rules551, simLod75, spacing40, win173/307. Motion/finale providers are not yet present or registered. No new source outside the accepted15-case manifest is implied.
