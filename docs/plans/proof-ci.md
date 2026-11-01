# Brief: run proof scripts in CI

Why: see `docs/backlog/proof-loop.md`. Headless proofs currently only run in the coordinator's container, so every builder iteration waits on the coordinator. Put them in CI so builders see the result on every push.

## Scope

1. A new CI job, **`proofs`**, in the existing CI workflow. It reuses the shared build artifact the other jobs already use; don't rebuild. It runs headless Chromium (the same install and retry the smoke job uses).
2. It runs every proof script that is marked CI-safe. Start with `tools/smoke/paused-world.cjs`. Each proof declares whether it is CI-safe; laptop-only proofs (real-GPU timing, two-machine multiplayer) stay out.
3. **Baseline = the live build.** Fetch the deployed site, or build `claude/prototype`'s head once per run and cache it by SHA. Proofs compare candidate against baseline where they need one.
4. On failure, upload the proof's output folder (PNGs, diff, pixel trace JSON) as a CI artifact, and say which proof failed in the job summary.
5. **Run it on PR pushes.** Not on release or publish PRs: their head was already proven on its own PR. If a proof is slow (over about 4 min), say so; we'll decide whether it runs on every push or only when its paths change.
6. Keep the job's wall time inside the existing CI budget. Report the added minutes. CI speed is a standing priority (Ed), so don't make CI slower without saying by how much.

## Not in scope

- Any game change.
- Laptop proofs, timing gates and the bench.
- Changing what any proof asserts.

## Done when

- A PR that breaks paused-world (e.g. a temporary commit that reads `performance.now` in a draw path) goes red in `proofs` with its artifacts attached, and the same PR without it goes green.
- The job's added wall time is reported.

Protocol: PLAN first, then build, then FINAL. Light process.
