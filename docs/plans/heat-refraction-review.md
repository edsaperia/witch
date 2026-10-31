# Heat/refraction review handoff (PR #1543)

The code is a default-OFF preview, not accepted visual/performance work. Root
reservation 6544780920 permits the additive shared integration; canonical order
6545181860 supersedes its earlier potion-before-refraction order. Canonical owns
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
// Stage an actual active canopy grading trip (which also has shared wobble):
await capturePair(page, SOURCE_SHA, 'previews/refraction/combined', 'fire', true);
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
   Base quantized UV -> guarded refraction -> unchanged potion wobble -> existing
   grading/composite. Refraction source/destination depth and the world mask use
   the base/refraction coordinates before potion wobble. **No potion-owned lines
   move or change.** Existing bloom and outlines consume the resulting p as before;
   smooth FX keeps vUv and grading/tilt-shift keep their order. Inspect fire glow, mist,
   pressure-wave edges and outline seams explicitly; do not assume those layers
   move with the scene. On the combined build repeat with Night Vision, Miniature
   and Hue Spin while preserving their existing implementations. Normal-merge
   prototype after #1539 is verified LIVE before the next REPORT/combined run
   (gate opened by canonical6545409448, v6599). The helper's final true argument
   refuses the combined capture without active wobble and canopy grading.
   OFF-return stability and source-code identity do not establish OFF pixel
   identity against the unmodified composite: measure that separately in the
   canonical runner, including refraction+wobble+one grading potion simultaneously.
6. Crowded real scene, ground and treetop camera: paired frame/GPU timing and GPU
   allocation bytes, not just texture count. There is no extra rendering pass or
   texture allocation in this implementation; that is a code audit, not a measured
   zero-cost claim. Up to four form slots; current slice uses one fire and one cast.
   Depth is read only within a local mask and again for a displaced source.
   Base art-texel centres use one destination plus one source read; the helper's
   defensive fractional-coordinate path can use four destination reads. Measure
   real GPU cost, including when wobble and grading are also active.

Capture/compile failures remain real findings. Do not enable by default or claim
acceptance until canonical reviews these actual images and measured costs.

Trip catalogue references already exist: Thick Air (#87) and Mushroom Lenses
(#88) in `docs/backlog/cauldron.md`. This shared path may support them later;
neither potion is implemented or authorised by this slice.

## Foreground crossing follow-up (canonical6546187281)

Canonical's b21a00ac cloud review passed matched-art OFF identity (same build
zero pixels; versus prototype only the version label), ring/fire pairs and
wobble+Thick Canopy composition; its results carry to the adapter-only c38 fix.
This did **not** exercise a body in front of the fire. No foreground pass is claimed.

On the existing allocated page, with ordinary ground view/no active trip, use:

```js
const { captureForeground } = require('./tools/refraction/foreground.cjs');
await captureForeground(page, SOURCE_SHA, 'previews/refraction/foreground', {
  fire: { x: REAL_FIRE_X, z: REAL_FIRE_Z },
});
```

Choose an existing isolated, preferably inland campfire from `view.worldFires`.
The optional fire argument defaults to the nearest existing fire. This tool adds
no emitters, character graphics or browser. It uses the existing `witch.shot`
ground placement, freezes simulation time and tries 1/2/3/4/6 m south of the fire,
then captures five lateral positions (-2/-1/0/1/2 m). Camera follows the ordinary
shot; each position has its own same-clock OFF/ON/OFF-return trio. It refuses a
hidden body, missing form, different nearest fire or absence of a body envelope
inside the plume with all body-quad vertices nearer than the fire support depth.
Original witch/camera objects, manual mode and refraction toggle are restored.

Each crossing folder contains the trio, capture.json and foreground.json with
the actual instance-buffer projected body envelope, fire ellipse, depths and
camera. The root foreground.json indexes the five stages. Envelopes are padded
one art texel for sprite snapping and are **not opaque-body masks**. Canonical
must inspect the real body silhouette overlapping the plume interior, crop/mask
its opaque pixels and compare ON-OFF against OFF-return noise. Reject unrelated
shore/sea changes or camera/asset instability; envelope overlap alone is not a
guard pass. If a site fails staging, select another real fire rather than weaken
the checks. No creature crossing is supplied in this first follow-up.

NaN markers, moving-camera screen edges, clock/island/quality cases, potion-local
signal isolation and GPU/memory acceptance remain outside this driver and unaccepted.
