# House profile results (not for merge)

Commit under test: 847d4a65d9a13e183a036796e3f029d4079af1c1 (HEAD confirmed). Baseline: 3ba6bc7297235bb1e383b2405b4da515de4c720c (worktree ../base).

## Setup
- `npm ci`: OK (main ~5 s). Baseline `npm ci` + `vite build --sourcemap --manifest`: OK. Main `vite build --sourcemap --manifest`: OK (41.6 s). Worktrees + both builds: 106 s wall total. No errors.

## Step 4: correctness check (RUNS=1, CAP 230 s)
- Exit code: 0. Wall clock: 226 s.
- CLEAN: complete=true, 1 run and 1 summary row per configuration (3), traceDropped=0 (all 3).
- Output: previews/house-profile-check-847d4a65d/

### summary.md (verbatim)
# Same-route house profile

Complete: true. Cap: 230 seconds. 1 fresh-browser runs per configuration. Profiling overhead is included; this is not an uninstrumented smoke replacement.

| configuration | runs | samples | witch max ms | p99 ms | median ms |
|---|---:|---:|---:|---:|---:|
| as-built | 1 | 1802 | 96.900 | 23.700 | 4.200 |
| recording-off | 1 | 1802 | 61.000 | 18.100 | 4.400 |
| external-baseline | 1 | 1802 | 79.900 | 14.700 | 4.600 |

## as-built: five slowest witch frames

| run/frame | x,z | wall | step | render | witch | other render | GC in witch |
|---|---|---:|---:|---:|---:|---:|---:|
| 1/12 | 5.11,5.34 | 123.400 | 6.300 | 117.000 | 96.900 | 20.100 | 3.642 |
| 1/11 | 5.20,5.43 | 112.400 | 4.600 | 107.800 | 73.300 | 34.500 | 0.000 |
| 1/6 | 5.62,5.88 | 98.100 | 1.200 | 96.900 | 64.200 | 32.700 | 8.367 |
| 1/1 | 5.97,6.29 | 138.500 | 2.100 | 136.400 | 62.800 | 73.600 | 0.000 |
| 1/5 | 5.70,5.97 | 83.300 | 3.300 | 80.000 | 60.100 | 19.900 | 0.000 |

## recording-off: five slowest witch frames

| run/frame | x,z | wall | step | render | witch | other render | GC in witch |
|---|---|---:|---:|---:|---:|---:|---:|
| 1/6 | 5.62,5.88 | 90.100 | 3.100 | 87.000 | 61.000 | 26.000 | 1.534 |
| 1/950 | -42.93,-20.70 | 62.200 | 2.400 | 59.800 | 40.600 | 19.200 | 4.817 |
| 1/5 | 5.70,5.97 | 59.400 | 0.900 | 58.500 | 36.400 | 22.100 | 0.000 |
| 1/8 | 5.45,5.70 | 75.600 | 13.400 | 62.200 | 33.300 | 28.900 | 0.000 |
| 1/4 | 5.78,6.05 | 57.200 | 1.500 | 55.700 | 32.600 | 23.100 | 1.489 |

## external-baseline: five slowest witch frames

| run/frame | x,z | wall | step | render | witch | other render | GC in witch |
|---|---|---:|---:|---:|---:|---:|---:|
| 1/4 | 5.78,6.05 | 111.600 | 1.300 | 110.300 | 79.900 | 30.400 | 52.416 |
| 1/28 | 3.73,3.90 | 49.800 | 5.700 | 44.000 | 32.400 | 11.600 | 9.099 |
| 1/54 | 1.48,1.55 | 41.600 | 1.100 | 40.400 | 29.000 | 11.400 | 2.325 |
| 1/1 | 5.97,6.29 | 86.100 | 15.300 | 70.800 | 28.700 | 42.100 | 6.004 |
| 1/55 | 1.39,1.46 | 36.100 | 1.000 | 35.100 | 24.100 | 11.000 | 0.727 |

Inclusive wall/render/witch phases are separate, never added. Quantiles use actual route frame calls; the smoke's iteration count also includes waypoint transitions. Seat-exit samples are retained separately. GC overlaps are merged on the renderer main thread and are not added to CPU phases. Unmeasured optional phases are null in JSON. Full phase splits, all samples, raw CPU profiles and GC traces accompany this summary.

## Step 5: full run (RUNS=5, CAP 830 s)
- Exit code: 1. Wall clock: 831 s (hit the 830 s cap).
- NOT complete: summary says "Complete: false"; only 4 of 5 runs per configuration finished (runs 1-4). traceDropped=0 in all 12 trace entries. No other error text in the log.
- Output: previews/house-profile-847d4a65d/

### summary.md (verbatim)
# Same-route house profile

Complete: false. Cap: 830 seconds. 5 fresh-browser runs per configuration. Profiling overhead is included; this is not an uninstrumented smoke replacement.

| configuration | runs | samples | witch max ms | p99 ms | median ms |
|---|---:|---:|---:|---:|---:|
| as-built | 4 | 7208 | 101.000 | 29.000 | 3.900 |
| recording-off | 4 | 7208 | 87.600 | 15.700 | 4.200 |
| external-baseline | 4 | 7208 | 97.400 | 18.400 | 4.350 |

## as-built: five slowest witch frames

| run/frame | x,z | wall | step | render | witch | other render | GC in witch |
|---|---|---:|---:|---:|---:|---:|---:|
| 1/1 | 5.97,6.29 | 172.900 | 1.500 | 171.300 | 101.000 | 70.300 | 20.532 |
| 2/5 | 5.70,5.97 | 134.400 | 6.500 | 127.900 | 90.600 | 37.300 | 0.000 |
| 2/9 | 5.37,5.61 | 153.600 | 2.300 | 151.200 | 90.300 | 60.900 | 9.504 |
| 1/4 | 5.78,6.05 | 144.400 | 9.000 | 135.400 | 88.900 | 46.500 | 5.606 |
| 4/4 | 5.78,6.05 | 104.500 | 1.200 | 103.300 | 75.100 | 28.200 | 5.309 |

## recording-off: five slowest witch frames

| run/frame | x,z | wall | step | render | witch | other render | GC in witch |
|---|---|---:|---:|---:|---:|---:|---:|
| 2/6 | 5.62,5.88 | 130.800 | 1.800 | 129.000 | 87.600 | 41.400 | 0.000 |
| 1/6 | 5.62,5.88 | 121.300 | 1.500 | 119.800 | 70.800 | 49.000 | 0.000 |
| 2/5 | 5.70,5.97 | 108.500 | 4.800 | 103.700 | 66.400 | 37.300 | 5.139 |
| 1/3 | 5.85,6.14 | 114.500 | 1.700 | 112.800 | 58.800 | 54.000 | 0.000 |
| 1/7 | 5.54,5.79 | 82.900 | 10.200 | 72.700 | 48.300 | 24.400 | 2.341 |

## external-baseline: five slowest witch frames

| run/frame | x,z | wall | step | render | witch | other render | GC in witch |
|---|---|---:|---:|---:|---:|---:|---:|
| 1/1 | 5.97,6.29 | 210.900 | 1.600 | 209.300 | 97.400 | 111.900 | 31.732 |
| 2/8 | 5.45,5.70 | 105.500 | 1.300 | 104.200 | 77.600 | 26.600 | 22.065 |
| 1/2 | 5.92,6.22 | 104.100 | 1.000 | 103.000 | 65.800 | 37.200 | 47.865 |
| 2/7 | 5.54,5.79 | 94.600 | 1.800 | 92.800 | 55.500 | 37.300 | 2.696 |
| 2/26 | 3.90,4.08 | 67.300 | 2.000 | 65.200 | 54.300 | 10.900 | 0.000 |

Inclusive wall/render/witch phases are separate, never added. Quantiles use actual route frame calls; the smoke's iteration count also includes waypoint transitions. Seat-exit samples are retained separately. GC overlaps are merged on the renderer main thread and are not added to CPU phases. Unmeasured optional phases are null in JSON. Full phase splits, all samples, raw CPU profiles and GC traces accompany this summary.

Error: page.evaluate: Target page, context or browser has been closed
    at /home/user/witch/tools/bench/house-profile.mjs:79:31

## Skipped files
None over 50 MB (largest dir total 194 MB across many files; no single file over 50 MB).
