# Balancing study 1: local preparation

Owner: balancing-study builder, branch codex/balancing-1, worktree work/balancing-1. Canonical: #1476 comment 6552671020, assignment 6552708028. Source baseline 6ecede5fd. No results collected.

## Gates

No push/new CI until canonical GO after #1589/#1592 live. First own commit precedes draft PR into claude/prototype; first PR comment records branch/worktree. Actual computation requires a separately granted CPU slot, never concurrent browser/GPU work. Each allocation has a parent wall cap <=1800 seconds, completed-case checkpoints, exact resume identity and no automatic restart. Stop on input; only owned child processes may be terminated. Expert training stays stopped. No rule/tuning/default edits or release.

## Work sequence

1. Inventory existing bots and report harness. Reuse report-runtime's sloppy alias for novice: fire only on even whole seconds, sinusoidal aim error (sin(time*2.3), cos(time*1.7)), dash disabled. Describe privileged state access and lack of human calibration. Keep novice and sloppy from becoming two independent samples of the same policy.
2. Prepare a bounded one-worker supervisor around the existing restartable report CLI. Preserve each JSONL manifest and completed row; record exit status, cap, missing/unattempted keys and in-flight interruption separately from game censoring. Test supervisor with fake workers only; no real rules measurement before slot.
3. Stage the existing deep-study matrix: home/Tiger, 200 matched night seeds seedAt(i)=1000+7919*i, world0, 100/120/160/200 bpm, sloppy/crude/skilled, Satchel/no hat/bare broom, 4200 player-second cap =4800 runs. This is a proposed inheritance of #1475's default, not a promise to finish overnight. Freeze an exact pilot/allocation matrix with coordinator before dispatch; report policy coverage, wins/losses/censored separately and uncertainty over matched seeds. Other bot kinds/expert require explicit source/model interpretation before inclusion.
4. Recent-version drift: identify source SHAs for v5655, preflight3c13498d7 and current approved measurement source. Match scenario, policy vector, loadout, seed and cutoff. Existing one-seed preflight is context, not a 200-seed win-rate estimate. Do not pool sources or attribute all changes to tempo. If historical runner/schema incompatibility prevents matched replay, label that gap rather than silently porting behavior.
5. Census: reuse frozen #1475 wave1/census keys and attack-audit/census-proposal files exactly (2560 cells;1152 protected young/adult invitation cells). Check existing matching results first. Preserve natural exact ranks, retaliation, protected versus unprotected fixtures and unsupported cells. Current proposal has 50-minute cloud commands; do not run them unchanged under this <=30-minute laptop allocation. Source/lock/adapter/held-out checks remain binding. No fabricated/rebound trained lock or legacy relabelled stunt fixture.
6. Deliver observed win-rate/drift/census coverage first; only then a measured blows-to-stun retune PLAN for Ed. Timeout is censoring, never impossibility. Missing computation is infrastructure missingness, never a game loss.

## Open source prerequisites

- Canonical approved product SHA(s), historical version mapping and exact first CPU allocation/matrix.
- Census required tools/balance/survey-adapter.mjs is absent on baseline; compatible trained/source lock not identified. A historical pilot/model-lock.json exists but is not assumed trained or source-compatible. Coordinator must route a compatible existing adapter+lock/result set or explicitly commission a fixture-only adapter, as the frozen README requires. No expert training to fill the gap.
- Survey reserved and final held-out pairs must remain protected; resolve inventories before any expert-related run. Do not substitute legacy report stuns for frozen natural census.

## Validation and reporting

Light static checks and fake-process supervisor tests only during preparation; no local full suite/smoke/art/browser/training. Record exact source/driver/supervisor SHA, seed list, start/stop, completed and missing keys per allocation. Preserve #1566 checkpoint unchanged. Root centralwatch; no idle monitor.

## Step 2 source preparation checkpoint

Implemented tools/balance/bounded-report.mjs and bounded-report-core.mjs without modifying the existing report runner, bots, runtime or census/survey owners. CLI accepts a local allocation JSON with allocation, full sourceSha, stopFile, output, wallSeconds (10..1800) and reportArgs (explicit flag/value pairs). It only permits legacy sloppy/crude/skilled run policies; expert and census are rejected. The allocation label is a receipt, not permission or a hardware guard.

Before spawning, it requires exact clean tracked HEAD, fingerprints the report's complete source/config/art/tool trees, and records Node and package-lock identity. Existing report strict manifest validation remains in force. Resume requires the same command/arguments/cwd/source/environment identity and unchanged completed checkpoint bytes. A different allocation label/wall cap can resume the same experiment only under a fresh canonical slot. Existing unsupervised outputs need explicit provenance reconciliation; no auto-adoption. A partial JSONL tail is preserved and blocks resume, never truncated. Rows are checked for duplicate/unexpected case keys; missing keys remain explicit infrastructure missingness.

The parent owns one Node report child, starts a monotonic deadline, reserves up to five seconds inside its execution cap for cleanup, and never restarts automatically. Windows cleanup targets taskkill /PID <owned child> /T /F only while that ChildProcess is live; POSIX uses that child's private process group. Attempts record allocation, exit/error/signal, time/cap, PID, cleanup result, source identity digest, before/after hashes and completed/missing keys. Unconfirmed exit retains the exclusive output lock and requires manual cleanup; no slot-free assertion. stdout/stderr append to separate logs. Completed rows survive process interruption; filesystem writes are not a power-loss durability guarantee.

Actual deployment still requires the external laptop input/preflight guard and named CPU grant: guard creates stopFile on input, CLI also handles SIGINT/SIGTERM. The CLI does not itself inspect Windows input, browser state, FREE evidence, or allocate hardware. Guard must include a whole-launch cap and own-tree cleanup, and must remain alive; a stop-file path alone proves none of that. No actual measurement READY claim until this binding, protected-pair inventories, exact source and pilot matrix are pinned. Keep outputs outside hashed source trees. The existing report tool doesn't accept an explicit world seed; resolve/pin its world construction before asserting the proposed world0 design. Do not silently change its owner files to solve this.

Validation: ten small fake-worker tests cover complete/skip, changed identity, nonzero exit, wall termination and resume without duplicate cases, abort, partial tail/unowned output/exclusive lock, over-cap refusal, tampered checkpoint, spawn failure and CLI source/expert rejection. No actual game runtime is imported in these tests. Source syntax and inventory freshness checked. Inventory generation changes only the two generated README listings for the new helper names. No UI text changed, no runtime dependencies added. Census QUESTION #1476 comment6552720558 remains outstanding.
