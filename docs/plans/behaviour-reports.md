# Behaviour reports: first implementation

Ed's 2 November 12:08 rulings are recorded in [the coordinator's audit instruction](https://github.com/edsaperia/witch/pull/1632#issuecomment-6576776394). This first PR establishes the nightly/manual report pattern and implements music groups M4 and M5 only. The audit checkpoint remains on `codex/test-audit`.

Reports preserve the original sample sizes and numeric references, recording actual values without release-blocking outcome assertions. Direct validity, range, routing and authored form rules remain blocking. Report execution errors remain visible as errors, separately from values outside historical references.

The independent workflow follows Art check's source policy: nightly checks resolve the exact prototype SHA, manual runs use the selected revision. It has no pull-request/push trigger, no release dependency and one worker. It publishes JSON, a readable summary and full execution logs.

## First system: music

- M4: report the 60-second east-coast dolphin counts, 600-second west-coast kraken counts and the 60-seed ABC melody pace survey. Replace the sea-life tests' sampled frequency prerequisites with controlled cue/range checks; retain inland exclusion, opposite-coast exclusion and water-pour routing. Keep all other melody validity and form assertions.
- M5: correct the obsolete +1 BPM and rewind descriptions only. Preserve both cheer timing assertions.
- Record the four approved standing rules in DESIGN.md. No game code or gameplay change.

Validation uses typecheck, focused harness tests and the nearby music tests with one worker. Before/after measurements must use the same machine, fixture and command; local durations are not cloud CI savings. Cloud savings remain unmeasured until comparable CI evidence exists. Heavy local measurements require the coordinator's laptop slot.

## Following PRs

After coordinator review of this pattern, separate small PRs implement legends, art, creatures, house, invites/boot pulse, UI, world and tools. Each lists exact changed/removed tests and reasons, retained/replacement protections and measured savings or their evidence limits. Combat/MP stay with their owners; T6 is routed to the combat/report owner #1634. No broad rewrite is authorized by this first PR.
