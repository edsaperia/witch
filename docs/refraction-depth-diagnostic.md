# Refraction diagnostic preparation

The measured product remains038f2f74; slot6's strict nine-pixel failure is unchanged. The shared measured harness is6fea3540. A newer driver commit does not substitute a newly merged product for that measured source.

`captureForeground` now accepts explicit diagnostic options: `crossings:[0,1]`, `stageCreature:false`, `captureCreatures:false`, `depthReadback:true`. Defaults retain the full five-crossing/creature capture. No browser or slot is created by these helpers. The existing canonical allocation is still required; do not run the diagnostic merely because its source is prepared.

The held OFF/ON/no-witch states save the actual sampled float32 depth bit patterns, the product shader's selected source cells, source/destination3×3 neighbourhoods, displacement, support states and canvas rectangle. Depth samples are transported as `floatBitsToUint` through a disposable RGBA8 target, not rounded back to DEPTH24: a precision-tie investigation must preserve the float values the guard actually compares. The current product `refractScene` prefix is executed for UV selection instead of substituting a CPU approximation. Target/material/viewport/scissor and capture toggles are restored. The GPU bit round-trip and whole helper still need validation in the allocated run; CPU codec tests are not a GPU pass.

Screenshot points map through the actual canvas rectangle. Do not assume screenshot origin or3× browser scaling aligns directly with the low-resolution target. The selected UV is the base quantized scene coordinate; final potion/tilt sampling is a separate stage.

Saved actor-removal RGB differences do not prove sprite opacity or depth coverage. The nine failing pixels have actor-removal contrast25 at mask threshold24. Raising the threshold would hide that failure, not fix it. The strict original zero-change criterion and its failed result remain unchanged. No production shader, halo, depth epsilon, alpha or threshold adjustment is justified until the readback proves a cause. Full square3×3 sampling already includes every diagonal.
