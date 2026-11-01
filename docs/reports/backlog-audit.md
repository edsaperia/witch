# Backlog status audit

Docs-only audit for inbox #1621 (brief commit `63d70eaf45e250ca4b0b848744c51f4d086278b8`, 2026-11-01). Starting source: prototype `ab06904b033b47b4b955da45f1a08c9568a67ddf`. No request here authorises implementing a backlog item.

## Method

Read every Markdown page under `docs/backlog/`. Count actionable feature requests, not historical decisions, example recipes, evidence instructions or repeated summaries of the same request. Group a list under one request when its bullets specify that request rather than independent work. Mark **Built** only when current source implements the request; record the merged PR and a verified version when available. A source implementation with an unverified release is labelled explicitly. Mark **Partly built** with the remaining gap. Unbuilt requests stay unmarked. Superseded requests retain their words and a status explanation rather than becoming new instructions.

Record current source, git history, PR and changelog evidence. A source finding does not imply browser acceptance or that an open branch is live. Active owner pages are reconciled from fresh prototype before final; overlapping edits require coordinator routing.

## Results

Audit in progress. The final table counts each feature request once per page; it is a page audit, not a global deduplicated feature total.
