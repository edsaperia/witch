# Same-route house profile

Complete: false. Cap: 14 minutes. Five fresh-browser runs per configuration. Profiling overhead is included; this is not an uninstrumented smoke replacement.

| configuration | runs | samples | witch max ms | p99 ms | median ms |
|---|---:|---:|---:|---:|---:|

Inclusive wall/render/witch phases are separate, never added. Quantiles use actual route frame calls; the smoke's iteration count also includes waypoint transitions. Seat-exit samples are retained separately. GC overlaps are merged on the renderer main thread and are not added to CPU phases. Unmeasured optional phases are null in JSON. Full phase splits, all samples, raw CPU profiles and GC traces accompany this summary.

Error: Error: as-built-1: page errors [], omitted trace events 328676
    at file:///home/user/witch/tools/bench/house-profile.mjs:79:48
