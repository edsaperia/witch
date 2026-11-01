# Patterned lighting — parked

Ed, 2026-11-01: “We can park patterned lighting for now.” Cost work, offline analysis, candidate implementation and measurement requests are stopped. Resume only after a new explicit Ed/coordinator assignment. PR [#1542](https://github.com/edsaperia/witch/pull/1542) stays draft; no default-on approval or release.

## Existing opt-in slice

One selected existing soundsystem has rotating spokes, sweeping stripes or layered colour bands; one existing home/campfire light has gentle flicker; the ordinary blink has rings. Shared world-space modulation reaches ground, grass and sprites. At most three existing lights receive patterns; source selection, light counts, contrasts and falloff remain unchanged. Reduced flashing disables the patterns.

Review at [the PR preview](https://edsaperia.github.io/witch/pr-1542/?patternlight=auto): `?patternlight=auto` cycles looks, `spokes`, `stripes` or `bands` holds one, and `off` gives original lighting. Omitted/unknown values stay off. Earlier game-only pictures are separately labelled [strong lighting](https://github.com/edsaperia/witch/tree/claude/ed-shots/previews/patterned-lighting-7d4046d) and [home light](https://github.com/edsaperia/witch/tree/claude/ed-shots/previews/patterned-lighting-48629b9-home); these are historical sources, not new-head equivalence proof.

Measured source: `483860a10978eb8fd7845681cbed18333622d063` (v6868). Source checkpoint `e96fa5ee9afe24c35ea494dcb1a24f4bfa50b798` includes the already-written driver-only post-blink readiness fix and normal prototype integration. The fix waits for visible art after the real blink, preserves clocks/spell/ring phase, records readiness and geometry identity, and still rejects final ON/OFF mismatches. It has focused tests but no corrected hardware proof. Existing uniform packing prepares constant flicker/inverse scale and reuses light distance for rings. Proposed spokes algebra was rejected against the CPU reference centre grid; original atan/centre guard remains.

## Laptop evidence

All observations below are measured under load, 48 samples per scene/arm, on Intel D3D11. Acceptance requires ON−OFF GPU median ≤0.5 ms and p95 ≤1 ms for each gated scene, with matching source/geometry fingerprints.

| Result | Home delta, median / p95 | Party delta, median / p95 | Disposition |
|---|---|---|---|
| Run 1, ON-first separate per-pass diagnostic | Main-scene pass +0.109947 ms median | Main-scene pass +0.023802 ms median | Not whole-frame gate data. Blink geometry differed, so no paired blink attribution. |
| Run 2, normal OFF-first whole frame | +0.353698 / +0.544896 ms | +0.019896 / −2.969895 ms | Home and party passed this order. Blink unmatched, diagnostic only. |
| Run 3, normal ON-first whole frame | +0.804480 / +4.677552 ms | +0.001250 / +0.591459 ms | Home failed both limits; party passed. No overall acceptance. |

Run 3 blink happened to match geometry, but was allocated diagnostic-only: median +2.345677 ms and p95 +7.945 ms. Run 1 blink's unmatched shadow/main passes cannot establish paired attribution. Its ON arm alone had main-scene median 6.865885 ms and cast-shadow median 2.989479 ms; these are absolute costs, not pattern deltas. Patterns use procedural arithmetic, not a pattern texture lookup. No per-fragment light-occupancy measurement exists.

The arm measured first was slower in both whole-frame orders, showing order/load bias. Neither that observation nor averaging orders waives the failed gate. The previous `a0a57eac` candidate also failed home median (+1.417240 ms). Raw game windows and snapshots are retained with their original PR reports; private laptop diagnostics are not published.

## Unapproved restart plan

These are the cancelled PLAN's items 2–5, retained for a future brief, **not permission to implement or run**.

2. Recommended next source candidate for approval: compact the maximum three patterned sources into a small prepared uniform list, leave original ordinary-light contributions intact, then apply only those sources’ RGB modulation corrections. This aims to remove the pattern-kind/function path from the ordinary 20/24-light loop and reduce pattern-uniform uploads. Keep the same selected sources/cap3/world pattern coordinates/contrast/falloff/clocks. Expected look change: none intended; changed floating-point accumulation order could change pixels and must be measured. Keep original reference path for CPU grids and allocated before/after frames. Reject if equivalent look cannot be demonstrated. Target remains home AND blink median ≤0.5 ms/p95 ≤1 ms in each accepted order; no numeric saving forecast or attribution asserted. CPU preparation overhead must be reported. This optimization is only a PLAN, not implemented. Rejected spokes algebra stays rejected.

3. Product-changing alternatives are NOT recommended/authorized automatically: one strongest pattern per fragment, dropping dim patterns or a simpler close-camera spell pattern would remove overlapping colours/rings or their reach/appearance. Those need explicit look review/Ed choice rather than a guessed threshold. No cap/radius/contrast change proposed silently.

4. Prepared before/after capture plan (not run): exact failed `483860a1` baseline versus a new approved exact candidate, seed123/world0/island10/wave3, 960×540/px1; same terrace wide/close light, ground+treetop spokes/stripes/bands, and real blink at fixed .033/.133/.300s her-time offsets. Post-blink readiness/source/geometry identity required. Compare original/after PNGs and pixels, retained ring phase/extent, palette/foreground readability, plus actual reduced-flashing identity. Any render run must have canonical allocation; publish only requested game pictures via shots helper. No fabricated before/after image or visual acceptance.

5. Future measurement design for approval, applied equally to EVERY candidate: per-scene bounded allocation; build/settle both isolated ON/OFF contexts first, discard a PREDECLARED 48-frame warm-up window on EACH arm, then measure OFF48/ON48/OFF48/ON48 (ABAB). Counterbalanced separate BABA run uses the same rules; 96 retained samples/arm/sequence. Manual frozen drawing, no concurrently advancing game, all windows carry exact SHA/phase/fingerprint/per-pass identity. Retain every measured outlier and activity flag, report each window, adjacent pair and sequence separately; propose requiring both adjacent pair deltas AND pooled sequence statistics within unchanged 0.5/1 ms limits. Do not average a failed sequence away. No post-hoc discarded windows. Split scenes into separate allocated ≤270s runs if necessary; no larger cap. Whole-frame gate and separate non-nested per-pass diagnostics stay distinct.
