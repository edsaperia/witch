# House profile results (not for merge)

- Commit: 0389ac1e8970523e83c630caf70213f1d568b1c3 (codex/robustness); baseline build 3ba6bc7297235bb1e383b2405b4da515de4c720c built fine in a worktree.
- Exit code: 1 (the tool ended at the 835 s timeout window; summary says "Complete: false")
- Wall-clock: 831 s
- Error: `Error: page.evaluate: Target page, context or browser has been closed` at tools/bench/house-profile.mjs:79:31 (raised when the cap hit during the 4th run of recording-off/external-baseline, which therefore have 3 runs each; as-built has 4).
- Skipped files (>50 MB): none (directory is 161 MB in total).

## Run log
as-built-1: 1851 route frames; witch max 42.700 ms
recording-off-1: 1851 route frames; witch max 116.600 ms
external-baseline-1: 1851 route frames; witch max 76.500 ms
as-built-2: 1851 route frames; witch max 49.900 ms
recording-off-2: 1851 route frames; witch max 76.800 ms
external-baseline-2: 1851 route frames; witch max 47.300 ms
as-built-3: 1851 route frames; witch max 86.800 ms
recording-off-3: 1851 route frames; witch max 85.200 ms
external-baseline-3: 1851 route frames; witch max 99.000 ms
as-built-4: 1851 route frames; witch max 80.900 ms
/home/user/witch/previews/house-profile-0389ac1e8/summary.md

## summary.md (verbatim)

# Same-route house profile

Complete: false. Cap: 830 seconds. 4 fresh-browser runs per configuration. Profiling overhead is included; this is not an uninstrumented smoke replacement.

| configuration | runs | samples | witch max ms | p99 ms | median ms |
|---|---:|---:|---:|---:|---:|
| as-built | 4 | 7208 | 86.800 | 18.500 | 5.300 |
| recording-off | 3 | 5406 | 116.600 | 23.400 | 5.900 |
| external-baseline | 3 | 5406 | 99.000 | 28.300 | 5.800 |

## as-built: five slowest witch frames

| run/frame | x,z | wall | step | render | witch | other render | GC in witch |
|---|---|---:|---:|---:|---:|---:|---:|
| 3/6 | 5.62,5.88 | 129.500 | 6.100 | 123.400 | 86.800 | 36.600 | 0.000 |
| 4/5 | 5.70,5.97 | 142.300 | 1.200 | 141.100 | 80.900 | 60.200 | 19.547 |
| 4/6 | 5.62,5.88 | 104.900 | 1.200 | 103.700 | 60.900 | 42.800 | 0.000 |
| 2/5 | 5.70,5.97 | 76.000 | 1.300 | 74.700 | 49.900 | 24.800 | 11.236 |
| 3/436 | -31.51,-23.03 | 71.100 | 4.600 | 66.500 | 44.400 | 22.100 | 0.000 |

## recording-off: five slowest witch frames

| run/frame | x,z | wall | step | render | witch | other render | GC in witch |
|---|---|---:|---:|---:|---:|---:|---:|
| 1/47 | 2.09,2.18 | 163.000 | 2.500 | 160.400 | 116.600 | 43.800 | 42.693 |
| 3/1 | 5.97,6.29 | 247.300 | 8.500 | 238.800 | 85.200 | 153.600 | 33.699 |
| 1/5 | 5.70,5.97 | 156.500 | 3.600 | 152.900 | 82.900 | 70.000 | 43.596 |
| 2/6 | 5.62,5.88 | 117.100 | 1.100 | 116.000 | 76.800 | 39.200 | 2.035 |
| 3/6 | 5.62,5.88 | 111.700 | 1.000 | 110.700 | 70.400 | 40.300 | 43.599 |

## external-baseline: five slowest witch frames

| run/frame | x,z | wall | step | render | witch | other render | GC in witch |
|---|---|---:|---:|---:|---:|---:|---:|
| 3/4 | 5.78,6.05 | 180.700 | 6.600 | 174.100 | 99.000 | 75.100 | 42.216 |
| 1/7 | 5.54,5.79 | 98.300 | 1.100 | 97.200 | 76.500 | 20.700 | 40.320 |
| 3/6 | 5.62,5.88 | 110.100 | 1.500 | 108.600 | 76.300 | 32.300 | 53.541 |
| 1/2 | 5.92,6.22 | 158.300 | 28.000 | 130.300 | 65.900 | 64.400 | 3.281 |
| 3/7 | 5.54,5.79 | 93.900 | 5.800 | 88.100 | 61.500 | 26.600 | 40.632 |

Inclusive wall/render/witch phases are separate, never added. Quantiles use actual route frame calls; the smoke's iteration count also includes waypoint transitions. Seat-exit samples are retained separately. GC overlaps are merged on the renderer main thread and are not added to CPU phases. Unmeasured optional phases are null in JSON. Full phase splits, all samples, raw CPU profiles and GC traces accompany this summary.

Error: page.evaluate: Target page, context or browser has been closed
    at /home/user/witch/tools/bench/house-profile.mjs:79:31
