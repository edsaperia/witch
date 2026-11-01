# Ephemeral Render CI capacity — plan/code only

Assigned by canonical1476#6552029497 and root. Own branch `codex/render-runners`; isolated `work/render-runners`. PR1513 and its historical measurement SHAs remain separate and unchanged.

No service, account permission, GitHub App, secret, runner registration or spending is authorized in this phase. No deployment workflow is enabled. Canonical owns `.github/workflows/ci.yml` and `tools/ci/run-unit.mjs` in #1582; this branch prepares a disabled adapter and integration contract only.

## Findings and proposed price

Verified 2026-11-01: GitHub API reports `edsaperia/witch` public, owner type `User`. GitHub documents runner groups for organizations/enterprises. The mandatory repository-restricted runner group therefore cannot be provisioned for this personal-owner repository as-is; do not weaken that requirement or transfer anything without a new decision. [GitHub runner groups](https://docs.github.com/en/actions/how-tos/manage-runners/self-hosted-runners/manage-access).

Proposed isolated pilot, not a purchase: one new secret-free 0.5 CPU/512 MB template worker ($7/month), one separate 0.5 CPU/512 MB credential broker ($7/month), and at most ONE concurrent fresh one-off job at 1 CPU/2 GB ($25/month-equivalent, prorated by the second). Maximum continuously utilized compute is $39/month, leaving $11 of the approximate $50 budget for metered extras. Assumes a separate $0 Hobby workspace, no disks/add-ons, no workspace upgrade, and no overlap between one-off instances; taxes and usage extras are not included or guaranteed capped by Render. Confirm actual billing and budget enforcement before activation. [Render $7 service and Hobby pricing](https://render.com/articles/render-vs-netlify), [Render 2 GB/$25 compute](https://render.com/articles/production-rails-hosting-guide).

Render one-off jobs inherit the base image **and all its environment variables**, and deprovision their instance when the command exits. Hence the job template must contain no broker/GitHub App/Render API credentials, no persistent disk and no shared multiplayer network. One job per container; no in-container recycling loop. [Render one-off jobs](https://render.com/docs/one-off-jobs).

## Implementation plan

1. Prepare disabled-by-default event/group/capacity policy, rejecting fork PRs, unsafe events, missing organization/group/workflow restrictions and stale/missing capacity leases; fallback output is `ubuntu-latest`.
2. Prepare a one-job bootstrap and Docker image contract: immutable image/runner checksum, Chromium dependencies installed at image build, fresh short-lived registration token obtained at container start through an isolated broker contract; no long-lived credential on runner disk or in workload environment.
3. Prepare bounded availability/fallback and budget contracts, threat model and fake-only regression tests. Do not claim native GitHub queue autoscaling or automatic `runs-on` fallback. Once a job is queued to a dead self-hosted label, recovery needs an explicitly integrated external workflow watchdog/cancel-and-redispatch path; keep Render disabled until canonical integrates and verifies it.
4. Publish exact priced plan/security limitations and request canonical disposition on the personal-owner/group mismatch. Continue reversible preparation; no account/paid action. Integrate only after #1582 is live and canonical agrees the interface; do not edit its owned workflow structure.
5. Record baseline and future before/after queue wait and job durations with identical tests/artifacts. Actual Render/browser/container execution and activation remain unrun and require separate authorization. No performance claim from fake tests.
