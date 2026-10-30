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
