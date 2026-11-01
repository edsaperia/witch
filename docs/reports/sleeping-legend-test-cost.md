# Sleeping legend regression cost

Canonical1476#6550319134 authorizes profiling and reducing this test's cost without weakening assertions or raising its timeout. Before measurement: PR1570, source15d0506a1fe566b558474213faed31a622ba39a4, CI41251040577 check124684622852, Linux Nodev22.23.4, existing full unit-suite concurrency. This is one observed run, not a controlled benchmark of runner load or proven cold-cache state.

| Species | Awake ms | Breath0 ms | Breath1 ms | Test ms |
|---|---:|---:|---:|---:|
| featheredserpent |3662.38|13019.59|6852.58|23673|
| marten |933.04|1967.53|2013.13|about4963|

The full file took28636ms. All3225tests/536files passed. An earlier independent house1565 run exceeded its60000ms limit (71388ms reported). These different runs do not establish a causal load measurement.

The existing sleeping-legends art task already creates an awake reference and both sleeping frames for each species and both facings. The follow-up attaches every original regression assertion to those sprites for featheredserpent/marten, retaining the original explicit bold/game-style/configured-pixel inputs for those species. It does not add a second pair of sleeping generations. Awake work is requested once per species/facing through the existing critter cache. The task reports actual awake/frame timings in its result info; cache warmth differs from the Node unit lane and is not directly comparable.

The unit file now exercises the shared assertion function using tiny sprites, including negative cases for each original check on each frame. It generates no creature art. Real art acceptance remains mandatory in the existing fingerprinted sleeping-legends task; checker/helper/style/tuning changes invalidate cached proof. No production generator, artwork, timeout or workflow allocation changes.

After unit-file and art-task timings: pending exact-head CI. Do not infer total CI or art savings from the removed unit generation alone. No heavy local art/browser run.
