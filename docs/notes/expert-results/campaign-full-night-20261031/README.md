# Interrupted many-island training

Original source: dc52bd317368916c2e04f2519bc2f3c16cd87d2b.
The checkpoint and its manifest retain the original source fingerprint and inputs.

Ed requested full-night training against defaults and many different islands.
The matrix schedules twelve island kinds, three world seeds and twelve night
seeds, with a 4200-player-second cutoff and a 3300-wall-second parent cap.
This was one below-normal local worker, not cloud execution.

Coordinator6547434400 reported two killed game tabs at18:22:51 and18:23:30 UTC.
Training was stopped following that instruction. Both owned Node processes
(24380 parent,38716 worker) were confirmed absent afterwards; no Node process
remained at the follow-up check. No next pass was started. The surviving
checkpoint contains ten completed default-policy cases; tiger and komodo and
all five candidate policies have no completed results. Any unsaved case is
excluded. This is an interrupted run, not completion or a successful cap exit.

All ten completed default cases lost, with zero quests or eligible finds and
thirteen knockdowns. There is no candidate/default comparison and no selected
parameter change. One case per island kind is not a general strength estimate.
Protected held-out cases were not run; no model lock or promotion was produced.
`comparison.json` and `comparison.md` summarize only saved cases. `compare.mjs`
checks the original source fingerprint before analysing them.

At18:30:54 UTC, the worker's peak working set was1,277,857,792 bytes (1.19GiB),
current working set765,308,928 bytes and private bytes1,184,395,264. Laptop total
physical memory was16,389,616KiB (15.63GiB); available physical memory then was
2,272,156KiB (2.17GiB). This snapshot was after the reported crashes. The peak
has no timestamp; neither figure establishes memory availability at either
crash or proves causation. Filtered Windows System/Application event queries
for18:21–18:25 UTC returned no records in their captured output; errors were
suppressed, so this is not proof that Windows logged nothing.

Further heavy local runs require a fresh canonical slot, input idle for at
least five minutes and no Ed game tab open. If Ed resumes use, stop at the next
saved checkpoint. No automatic resume is authorized.
