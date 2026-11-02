# Art and rendering checks

3 changes proposed, 2 groups to keep.

## What these protect

- Shaders wait for ready uniforms; replacing an island releases only privately owned resources.
- Geometry, indices, slopes, occlusion and planted feet stay valid and finite.
- Visual state follows affection, travel, pause and quality settings.
- Pixel/worker/cache compatibility preserves alpha, normal codes and unchanged geometry.
- Potion/refraction neutral states reset exactly; Stiltwalkers keep normal bodies on extended legs.

File times are historical, not savings. Shared files include other tests and overlap groups; do not add their times. Counts are source test templates, not expanded runs.

## Proposed changes

<a id="ar1"></a>

### AR1. Sampled animation frequency and variety

**5 tests · outcome stats · files take ~6 s.**

Examples: [Quirks meet a sampled active-time band.](../../src/render/character.test.ts#L16); [Sleeping legends meet a sampled face-share target.](../../src/render/sleepyFace.test.ts#L6); [Dream symbols meet a sampled flask-share target.](../../src/render/thoughtCloud.test.ts#L51).

**Yes/no: Move these five sampled frequency/variety thresholds to nightly reports? Yes retains direct face-hold, symbol-alternation and valid-output rules as blocking tests.** [Assertions, rationale and exact membership](semantic-groups.md#ar1).

<a id="ar2"></a>

### AR2. Generated appearance and motion smoothness

**7 tests · outcome stats · files take ~25 s.**

Examples: [Generated maps contain a minimum bark-face population.](../../src/render/barkFaces.test.ts#L12); [A sampled ride meets a smoothness score.](../../src/render/ride.test.ts#L13); [Zoo inscriptions favor the southern shore by a share target.](../../src/render/zooInscriptions.test.ts#L26).

**Yes/no: Split these seven mixed tests so density, averages, frequency and smoothness become nightly reports? Yes keeps geometry, ground clearance, finite output, resource bounds and direct visual rules blocking.** [Assertions, rationale and exact membership](semantic-groups.md#ar2).

<a id="ar4"></a>

### AR4. Sampled appearance distributions

**7 tests · outcome stats · files take ~135 s.**

Examples: [fills a stable share of complete cells with solid ink rather than pale centres](../../src/rosettePainter.test.ts#L43); [varies size and gap within bounds with a reproducible closed-ring share](../../src/rosettePainter.test.ts#L69); [put more ponds in the wet areas](../../src/rules/rules.test.ts#L605); [hang as long runs between the area's own trees: no crossings, at most 3 ends per tree, the same every time](../../src/rules/rules.test.ts#L741); [are seeded, on about duty of the time, at most maxCount beams, and fade rather than pop](../../src/rules/rules.test.ts#L990).

**Yes/no: Move sampled appearance shares and long-run variety to nonblocking reports while keeping direct visual rules, geometry, caps, fades and replay blocking?** [Assertions, rationale and exact membership](semantic-groups.md#ar4).


## Keep as they are

- [AR3: Rendering integrity and current visual contracts](semantic-groups.md#ar3): 495 tests; files take ~231 s.
- [AR5: Art integrity and supported comparisons](semantic-groups.md#ar5): 116 tests; files take ~353 s.

<details>
<summary>Examples and evidence for the kept groups</summary>

<a id="ar3"></a>

### AR3. Rendering integrity and current visual contracts

**495 tests · current rules · files take ~231 s.**

Examples: [Moved texture windows retain the correct texels.](../../src/render/areaWindow.test.ts#L49); [Replacing an island cancels its obsolete shader wait safely.](../../src/render/programReadiness.test.ts#L29); [Palette conversion preserves alpha and normal codes.](../../src/render/palette.test.ts#L13).

[Assertions, rationale and exact membership](semantic-groups.md#ar3).

<a id="ar5"></a>

### AR5. Art integrity and supported comparisons

**116 tests · current rules · files take ~353 s.**

Examples: [pins projected-fit marten pixels and normal bytes with the field absent](../../src/bibPaint.test.ts#L14); [bounds the shared paint to the underside of the neck and local chest](../../src/bibPaint.test.ts#L21); [paints a selected cream bib with a brown belly and no geometry changes](../../src/bibPaint.test.ts#L31); [requires a finite localized extent and valid material](../../src/bibPaint.test.ts#L51); [%s has continuous skin, tapered limbs and grounded feet](../../src/bodyGraph.test.ts#L9).

[Assertions, rationale and exact membership](semantic-groups.md#ar5).

</details>

**AR-KEEP — Yes/no: Keep AR3, AR5 as they are?** They protect resource ownership, finite geometry, CPU/shader data agreement, deterministic pixels and retained visual comparison modes.

[Review scope and provenance](semantic-groups.md#art-rendering-review-provenance). [Old/current rulings](semantic-groups.md#art-rendering-ruling-review). No change happens before Ed rules.

## Review coverage

0 tests remain unread. The keep question covers only named reviewed groups. [Exact remaining file/line manifest](unreviewed.md).
