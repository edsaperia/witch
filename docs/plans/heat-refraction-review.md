# Heat/refraction review handoff (PR #1543)

The code is a default-OFF preview, not accepted visual/performance work. Root
reservation 6544780920 permits the additive shared integration; canonical owns
normal merges, compiled-shader checks, art, cloud captures, GPU/memory and release.
No builder browser allocation or local browser run was made.

## Exact build and paired images

Use the full SHA from this PR's latest REPORT and verify the CI artifact's source
SHA before opening its preview. `version.json` currently exposes only the first
seven SHA characters in its version label: record both full CI SHA and served
label, not an invented full-SHA endpoint. Stage the actual campfire or party-cast
scene, then invoke this helper in the coordinator's existing allocated Playwright
runner (replace SOURCE_SHA with the full tested commit):

```js
const { capturePair } = require('./tools/refraction/capture-pair.cjs');
await capturePair(page, SOURCE_SHA, 'previews/refraction/fire', 'fire');
// On a separate staged party-cast frame within its first 0.65 game seconds:
await capturePair(page, SOURCE_SHA, 'previews/refraction/party', 'ring');
```

Start from `https://edsaperia.github.io/witch/pr-1543/?seed=123&refraction=1`.
Use the existing game/shot/recorded-state tools to stage a visible lit fire and
the ordinary DJ party cast. The helper refuses an empty or already expired form;
do not substitute a manually drawn ring or reset the spell's age at capture.
It freezes simulation advancement and renders OFF/ON/OFF at one world time,
records the form uniforms and actual renderer, and detects changing version
labels. It owns no browser process or server. Wall-clock atmospherics/assets can
still make a scene unstable: if OFF-return differs, inspect a pixel difference
and settle the scene rather than crediting its changes to refraction. Compare
actual pixel counts and changed bounds with the established image-diff tooling;
the helper's PNG byte flags alone are not the required visual measurement.

## Required scenes and controls

1. Fire behind the witch/another foreground animal, with its plume crossing the
   silhouette. Foreground destination pixels and borrowed source pixels must
   remain unchanged. The guard uses support-plane depth, not the nearer plume tip.
2. Fire at each screen edge and camera movement past it; no opposite-edge wrap,
   invented hidden pixels, subpixel softening or world-anchor swimming.
3. Ordinary party-cast wave at several ages, paused clock and slowed world time;
   one wave per cast, no birth-time restart on a late render, none after 0.65 s.
4. Island replacement and quality OFF/ON after expiry: no old forms replay.
   `FX_QUALITY.distortion=false`, reduced flashing, and default/no URL flag disable
   the preview. The existing quality rung is “magic shimmer off”.
5. Same frame with ordinary potion wobble OFF/ON crossed with refraction OFF/ON.
   Existing quantised sample and potion wobble execute first; destination depth
   and the world mask use that resulting scene coordinate. Only the final scene
   fetch is refracted. **Bloom, smooth FX overlays, potion outlines, grade and
   tilt-shift retain their previous coordinates/order.** Inspect fire glow, mist,
   pressure-wave edges and outline seams explicitly; do not assume those layers
   move with the scene. On the combined build repeat with Night Vision, Miniature
   and Hue Spin while preserving their existing implementations.
6. Crowded real scene, ground and treetop camera: paired frame/GPU timing and GPU
   allocation bytes, not just texture count. There is no extra rendering pass or
   texture allocation in this implementation; that is a code audit, not a measured
   zero-cost claim. Up to four form slots; current slice uses one fire and one cast.
   Depth is read only within a local mask and again for a displaced source.
   Fractional potion coordinates guard all four linearly participating scene
   texels (up to four destination reads plus one snapped-source read); ordinary
   art-texel centres use one destination plus one source read. Measure that cost.

Capture/compile failures remain real findings. Do not enable by default or claim
acceptance until canonical reviews these actual images and measured costs.

Trip catalogue references already exist: Thick Air (#87) and Mushroom Lenses
(#88) in `docs/backlog/cauldron.md`. This shared path may support them later;
neither potion is implemented or authorised by this slice.
