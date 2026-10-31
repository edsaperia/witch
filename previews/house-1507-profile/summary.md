# Same-route house profile

Complete: true. Cap: 830 seconds. 4 fresh-browser runs per configuration. Profiling overhead is included; this is not an uninstrumented smoke replacement.

| configuration | runs | samples | witch max ms | p99 ms | median ms |
|---|---:|---:|---:|---:|---:|
| as-built | 4 | 7208 | 46.800 | 8.700 | 2.800 |
| recording-off | 4 | 7208 | 39.000 | 10.200 | 2.900 |
| external-baseline | 4 | 7208 | 50.100 | 11.100 | 2.800 |

## as-built: five slowest witch frames

| run/frame | x,z | wall | step | render | witch | other render | GC in witch |
|---|---|---:|---:|---:|---:|---:|---:|
| 4/96 | -1.77,-2.09 | 57.100 | 0.700 | 56.400 | 46.800 | 9.600 | 0.000 |
| 3/878 | -51.22,-17.90 | 40.000 | 0.600 | 39.400 | 32.000 | 7.400 | 26.296 |
| 4/1 | 5.97,6.29 | 76.700 | 2.500 | 74.200 | 26.700 | 47.500 | 0.000 |
| 2/3 | 5.85,6.14 | 48.000 | 2.300 | 45.700 | 26.100 | 19.600 | 0.000 |
| 4/7 | 5.54,5.79 | 48.600 | 0.800 | 47.800 | 24.600 | 23.200 | 4.732 |

## recording-off: five slowest witch frames

| run/frame | x,z | wall | step | render | witch | other render | GC in witch |
|---|---|---:|---:|---:|---:|---:|---:|
| 3/1 | 5.97,6.29 | 91.500 | 1.400 | 90.100 | 39.000 | 51.100 | 4.374 |
| 1/5 | 5.70,5.97 | 65.500 | 3.100 | 62.400 | 38.500 | 23.900 | 15.958 |
| 4/9 | 5.37,5.61 | 51.100 | 0.900 | 50.200 | 36.700 | 13.500 | 0.000 |
| 1/7 | 5.54,5.79 | 58.600 | 1.000 | 57.600 | 28.800 | 28.800 | 0.000 |
| 2/256 | -12.80,-17.98 | 33.600 | 0.700 | 32.900 | 28.600 | 4.300 | 17.968 |

## external-baseline: five slowest witch frames

| run/frame | x,z | wall | step | render | witch | other render | GC in witch |
|---|---|---:|---:|---:|---:|---:|---:|
| 3/1772 | 41.92,14.34 | 53.500 | 0.400 | 53.100 | 50.100 | 3.000 | 0.000 |
| 2/6 | 5.62,5.88 | 61.700 | 0.600 | 61.100 | 34.000 | 27.100 | 1.530 |
| 3/5 | 5.70,5.97 | 48.100 | 0.900 | 47.200 | 33.800 | 13.400 | 22.686 |
| 1/257 | -12.86,-18.08 | 45.600 | 0.500 | 45.100 | 28.400 | 16.700 | 0.000 |
| 2/23 | 4.16,4.35 | 35.300 | 0.500 | 34.800 | 28.100 | 6.700 | 1.159 |

Inclusive wall/render/witch phases are separate, never added. Quantiles use actual route frame calls; the smoke's iteration count also includes waypoint transitions. Seat-exit samples are retained separately. GC overlaps are merged on the renderer main thread and are not added to CPU phases. Unmeasured optional phases are null in JSON. Full phase splits, all samples, raw CPU profiles and GC traces accompany this summary.
