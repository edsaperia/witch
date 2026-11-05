# Pages publication queue and Windows config gate

Instruction versions: coordinator1476#6643908630 (2026-11-04 22:36:18 UTC), superseding routing/order in6643311785. Branch `codex/pages-queue`, isolated worktree `work/pages-queue`, based on prototype `b29e5a370`.

1. Keep a started Pages snapshot publication running; coalesce pending requests into the latest complete gh-pages snapshot. Keep live-root content included regardless of the request type and keep preview debounce outside the publication lock. Verify live-root progress under preview churn without assuming GitHub gives event types priority.
2. Remove the Windows config gate's dependence on the Vite SSR module RPC that times out at60s. Preserve the exact validation and generated-file comparisons, with no relaxed timeout or skipped check. Investigate the current loader first; the referenced docs/plans/ci-speed.md is absent at this base.
3. Own focused policy/loader tests and run typecheck with one worker for nearby tests. No full suite, smoke, art, browser, settings mutation, release or service work locally.

File boundary: pages-publish.yml, Pages policy/tests, config-gate loader/schema and direct tests. Leave ci.yml and nightly-art workflows to their assigned owners; ask on this PR before any necessary overlap. Source activation remains Ed's separate decision.

Acceptance limits: source tests can prove scheduling policy and validation behavior. Actual GitHub queue timing and publication acceptance belong to canonical after review; no publication is performed by this builder.
