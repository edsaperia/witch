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
