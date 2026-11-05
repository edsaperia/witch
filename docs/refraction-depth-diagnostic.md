# Refraction diagnostic preparation

## Hardware readback and depth-coverage review (2026-11-01)

Canonical instruction #1543 comment6556272494 replaces the acceptance mask, not the shader. Product c6803bc4a52624737aed3be2a125987c8fc4e2aa completed its allocated Intel UHD/D3D11 readback in53.914s, measured under load. Both held crossings had zero OFF-return noise. The final colour-contrast mask reported crossing0:0 and crossing1:9 changed pixels/max11. That secondary result remains recorded.

`depth-coverage.cjs` instead identifies pixels where OFF front depth differs from and is nearer than no-witch depth. It maps those cells to screenshot pixel centres using the saved actual canvas rectangle/DPR, then dilates by **one screenshot pixel**, including diagonals. It does not dilate by one low-resolution cell. Equal depth and farther depth do not certify actor front coverage. Compare OFF/ON with the unchanged zero-difference threshold inside this coverage; colour contrast24 is secondary and is not an acceptance gate.

Offline recomputation from the saved maps gave1251 base depth pixels and1529 dilated pixels in each crossing. OFF/ON changed **0** in both masks, with OFF-return0 in both. Crossing1's nine contrast pixels are outside the depth mask. The real sampled float32 bits and coordinates are preserved in `fixtures/depth-coverage-c680-crossing1.json`; its regression also checks the1-screen-pixel dilation boundary. Run `node --test --test-concurrency=1 tools/refraction/depth-coverage.test.cjs`.

Reproduce from the original artifact directory and the separately pinned #1556 PNG helper: `node tools/refraction/review-depth-coverage.mjs ARTIFACT_DIRECTORY PINNED_PIXELS_MODULE`. This command reads saved files only and checks both capture manifests name c680; it neither launches a browser nor applies this result to a newer product. It writes `depth-coverage-review.json` alongside the captures, preserving both the zero-threshold depth-mask result and the secondary colour-mask result.

The saved maps establish background depth and nearby actor colour influence, not which individual postprocessing pass contributed that colour. Canonical interprets it as the bloom halo. No shader, depth epsilon, refraction radius, colour threshold, or product default changed. **Default remains OFF.** These two foreground cases are scoped evidence, not GPU-cost, full visual or default-on acceptance. Original captures and reports are #1543 comments6556223843 and6556272494.

## Historical preparation notes

The measured product remains038f2f74; slot6's strict nine-pixel failure is unchanged. The shared measured harness is6fea3540. A newer driver commit does not substitute a newly merged product for that measured source.

`captureForeground` now accepts explicit diagnostic options: `crossings:[0,1]`, `stageCreature:false`, `captureCreatures:false`, `depthReadback:true`. Defaults retain the full five-crossing/creature capture. No browser or slot is created by these helpers. The existing canonical allocation is still required; do not run the diagnostic merely because its source is prepared.

The held OFF/ON/no-witch states save the actual sampled float32 depth bit patterns, the product shader's selected source cells, source/destination3×3 neighbourhoods, displacement, support states and canvas rectangle. Depth samples are transported as `floatBitsToUint` through a disposable RGBA8 target, not rounded back to DEPTH24: a precision-tie investigation must preserve the float values the guard actually compares. The current product `refractScene` prefix is executed for UV selection instead of substituting a CPU approximation. Target/material/viewport/scissor and capture toggles are restored. The GPU bit round-trip and whole helper still need validation in the allocated run; CPU codec tests are not a GPU pass.

Screenshot points map through the actual canvas rectangle. Do not assume screenshot origin or3× browser scaling aligns directly with the low-resolution target. The selected UV is the base quantized scene coordinate; final potion/tilt sampling is a separate stage.

Saved actor-removal RGB differences do not prove sprite opacity or depth coverage. The nine failing pixels have actor-removal contrast25 at mask threshold24. Raising the threshold would hide that failure, not fix it. The strict original zero-change criterion and its failed result remain unchanged. No production shader, halo, depth epsilon, alpha or threshold adjustment is justified until the readback proves a cause. Full square3×3 sampling already includes every diagonal.
