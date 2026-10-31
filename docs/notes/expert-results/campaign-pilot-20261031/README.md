# Campaign training pilot — 2026-10-31

Source6706a867d5bf3b5e59c67f2f7c1cf33b22e863d8, fingerprint
`a1867cf11699e0d94614d06073983143fe0e53f29b698130a486433ff845ba28`.
This is a new training-only experiment, not a replay of the old expert searches.

Six candidates including baseline, two exact world/night/tempo cases each,
120player seconds per case. One below-normal worker,480s whole-job cap,
exit0/complete,29.74worker seconds after runtime startup. No restart.32protected
final pairs and survey-reserved first-round pairs were excluded; zero held-out
cases executed. `held-out-pairs.json` is the exclusion list, not evaluation data.

All12rows were censored, with zero wins, quests, eligible finds or knockdowns.
There are only2unique effective cases. Every objective vector tied, so the
baseline defaults remain selected; no parameters were promoted and no model lock
was produced. These cutoffs provide no evidence of stronger campaign play.
`summary.json` lists every vector and binds raw artifacts with digests.

An additional single120s diagnostic (private `.expert-opening-diagnostic.mjs`)
investigated the shared `opening` metric. The witch leaves home, invites foxes,
casts at a ready stone and starts a berry job. `opening` means no timed wave has
passed yet, not that the witch stayed in the house. That diagnostic used ordinary
default setup, not the sealed two-cell matrix, and is not extra training data.

## Next: cloud allocation, not started

QUESTION6545111733 on PR1540 requests the canonical runner. Long cases remain
cloud-only; no local guard is bypassed by labelling a laptop run cloud execution.
`cloud-cases.json` is a validated16-cell proposal: two worlds/training nights,
100/200BPM, matched home/Tiger/Komodo plus home-everything with fixed Harvest or
Helmet/Canoe loadouts,4200player-second cutoff. It excludes protected/reserved
pairs. This static proposal has not executed and does not establish full-night
outcomes or approve a model lock.

On a canonical allocated runner, same source fingerprint, first run baseline:

```
node tools/balance/expert-search.mjs --execution cloud --campaign-only --training-only --cases docs/notes/expert-results/campaign-pilot-20261031/cloud-cases.json --time 4200 --iterations 1 --train-seeds 2 --held-seeds 1 --search-seed 1540 --shard campaign-cloud-baseline --out docs/notes/expert-results/campaign-cloud-baseline --wall-seconds 3300
```

Whole allocation at most3600s, one worker; checkpoint-and-stop on cap, no automatic
restart. A completed baseline can be exported as exact contract external rows,
binding source, full policy and exact case/gear. A separately allocated six-vector
search can then import those rows to avoid repeating baseline simulations. Its
fitness matrix remains `--cases`, not the external cache. No candidates start
until baseline completion/source validation and canonical allocation. Protected
evaluation happens only after candidate selection in a separately routed job.

Preflight: typecheck PASS; expert Vitest92PASS/9files; Node search/space7PASS;
matrix validation2cells/no protected or reserved overlap; runner syntax/diffPASS.
No full suite/browser/build or strength validation. Station-menu loadout swapping
is still a separate ownership question; fixed initial gear is legal in this runner.
