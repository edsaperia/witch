# Travel performance 3 (brief)

Continues `docs/plans/travel-perf-2.md`. Milestones 1–2 (per-island ground shaders, beach shader on demand, paths and heights in the map-prep worker) shipped as v6066 (#1498). Work on this branch, `codex/travel-perf-3`; report on its draft PR.

One milestone at a time, PLAN first:
3. **Background shader precompile.** Precompile the next islands' ground programs **only while she's in the treehouse or on the map** (Ed's rule), and pause the moment she leaves. Reachable islands only, nearest first.
4. **Chart pre-draw.** Same rule: today `warmChart` draws all 65 islands during play. Make it draw reachable islands only, and only while she's in the treehouse or on the map. The map still opens instantly, with islands rising in as they're drawn (that already works).

Rules:
- Fast machines must be unchanged; measure on the Intel laptop only in a slot the coordinator grants (Ed approves each one).
- House code belongs to #1507: read house/map state, don't edit house code.
- Open item carried from #1498: the unattributed 666.7 ms first-coast-render frame. If M3 work gives you a cheap way to capture a CPU trace of that frame in a granted slot, say so in the PLAN; don't spend a slot on it alone.
