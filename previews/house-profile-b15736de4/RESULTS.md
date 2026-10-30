# House profile results (not for merge)

Commit b15736de4e76f1625a426f49bc339c9c4da4055e (codex/robustness); baseline 3ba6bc7297235bb1e383b2405b4da515de4c720c built OK (BASE_DIST used). Both vite builds succeeded.

- Exit code: 1
- Wall-clock: 63 s (tool aborted early; not the 14-minute cap)
- Error (verbatim): `Error: Error: as-built-1: page errors [], omitted trace events 328676` at file:///home/user/witch/tools/bench/house-profile.mjs:79:48
- No measurements completed (table empty, "Complete: false").
- Skipped (over 50 MB): previews/house-profile-b15736de4/as-built-1.trace.json (68,031,539 bytes)

## summary.md (verbatim)

# Same-route house profile

Complete: false. Cap: 14 minutes. Five fresh-browser runs per configuration. Profiling overhead is included; this is not an uninstrumented smoke replacement.

| configuration | runs | samples | witch max ms | p99 ms | median ms |
|---|---:|---:|---:|---:|---:|

Inclusive wall/render/witch phases are separate, never added. Quantiles use actual route frame calls; the smoke's iteration count also includes waypoint transitions. Seat-exit samples are retained separately. GC overlaps are merged on the renderer main thread and are not added to CPU phases. Unmeasured optional phases are null in JSON. Full phase splits, all samples, raw CPU profiles and GC traces accompany this summary.

Error: Error: as-built-1: page errors [], omitted trace events 328676
    at file:///home/user/witch/tools/bench/house-profile.mjs:79:48
