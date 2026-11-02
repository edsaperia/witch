# Art and rendering checks

2 changes proposed, 1 groups to keep as they are.

Read-only semantic review at 9f045ebca, report6566138102. Includes the UI reviewer’s nine visual-control cases and three additional sprite-integrity cases read by the lead. No rendered appearance or GPU performance is claimed.

Timings are historical containing-file time, not savings. Partial-file and overlapping groups include other tests; do not add their times. Source counts are test templates, not expanded runs.

## What these protect

- Shaders wait for ready uniforms; replacing an island releases only privately owned resources.
- Geometry, indices, slopes, occlusion and planted feet stay valid and finite.
- Visual state follows affection, travel, pause and quality settings.
- Pixel/worker/cache compatibility preserves alpha, normal codes and unchanged geometry.
- Potion/refraction neutral states reset exactly; Stiltwalkers keep normal bodies on extended legs.

## Proposed changes

### AR1. Sampled animation frequency and variety

**5 tests · outcome stats · ~6 s of CI.**

Examples: [Quirks meet a sampled active-time band.](../../src/render/character.test.ts#L16); [Sleeping legends meet a sampled face-share target.](../../src/render/sleepyFace.test.ts#L6); [Dream symbols meet a sampled flask-share target.](../../src/render/thoughtCloud.test.ts#L51).

**Yes/no: Move these five sampled frequency/variety thresholds to nightly reports? Yes retains direct face-hold, symbol-alternation and valid-output rules as blocking tests.** [Assertions, rationale and exact membership](semantic-groups.md#ar1).

### AR2. Generated appearance and motion smoothness

**7 tests · outcome stats · ~25 s of CI.**

Examples: [Generated maps contain a minimum bark-face population.](../../src/render/barkFaces.test.ts#L12); [A sampled ride meets a smoothness score.](../../src/render/ride.test.ts#L13); [Zoo inscriptions favor the southern shore by a share target.](../../src/render/zooInscriptions.test.ts#L26).

**Yes/no: Split these seven mixed tests so density, averages, frequency and smoothness become nightly reports? Yes keeps geometry, ground clearance, finite output, resource bounds and direct visual rules blocking.** [Assertions, rationale and exact membership](semantic-groups.md#ar2).


## Keep as they are

- [AR3: Rendering integrity and current visual contracts](semantic-groups.md#ar3): 495 tests; ~231 s of CI.

<details>
<summary>Examples and evidence for the kept groups</summary>

### AR3. Rendering integrity and current visual contracts

**495 tests · current rules · ~231 s of CI.**

Examples: [Moved texture windows retain the correct texels.](../../src/render/areaWindow.test.ts#L49); [Replacing an island cancels its obsolete shader wait safely.](../../src/render/programReadiness.test.ts#L29); [Palette conversion preserves alpha and normal codes.](../../src/render/palette.test.ts#L13).

[Assertions, rationale and exact membership](semantic-groups.md#ar3).

</details>

**Yes/no: Keep AR3 as they are?** They protect resource ownership, finite geometry, CPU/shader data agreement, deterministic pixels and retained visual comparison modes.

[Old/current ruling comparisons](semantic-groups.md#art-rendering-ruling-review). No change happens before Ed rules.

## Not reviewed, no change proposed

123 additional tests remain outside the reviewed groups. The keep question above covers only named groups. [Exact remaining file/line manifest](unreviewed.md).
