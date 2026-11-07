# Reliable bounded Chromium installation in CI

Canonical brief:1476#6699804156 (updated2026-11-07T00:45:21Z). Own branch codex/chromium-install-reliability, work/chromium-install-reliability, based on prototype871eec910. Prior CI reuse PR1835 remains merged history.

Investigate real failed installation logs across the named PRs and A4 proof job128054978264/run42264985913 before choosing a correction. Initial A4 evidence: first dependency installation times out at300s; retry fails because apt-get2883 still owns dpkg's frontend lock. Browser cache was already restored. Thus exit100 is a secondary lock failure, not evidence the Chromium download failed.

Keep pinned Playwright/browser versions, correctness/security gates and bounded installation/failure handling. Separate browser provisioning from operating-system dependency work where evidence supports it; do not mask missing dependencies or ignore installation errors. Prefer a shared tested installation path to repeated diverging shell blocks. Scope existing affected CI workflows and lightweight safety tests/documentation only; no new services/spend, renderer changes, local browser/heavy/full-suite runs, merge, publication or release.

Acceptance: required typecheck and nearby one-worker source tests, full exact-head CI green, plus two consecutive successful comparable runs of affected jobs after the implemented correction. Record cause, prior failure timings, corrected completion timings and remaining limits. A retry without a correction is not acceptance. Coordinator centrally watches; no personal poll/monitor. End at concrete source/evidence milestone when waiting for remote CI.
