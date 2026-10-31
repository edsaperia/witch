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

### Ordinary-scene repeat-render correction (canonical6547156299)

The 0cb56c2 run is NOT a foreground pass: dream crossings had zero opaque-body
differences but a tiny dim/blurred mask; ordinary crossings had per-render noise
comparable to the alleged signal. The revised helper accepts the first real body
in witchBatch or bareBatch (not merely a fallen hat). Every screenshot now has a
120 s timeout and each crossing warms a screenshot before measurement.

Each witch stage records `drift`: one consecutive full View.render at fixed game
time, with changed camera state, geometry-attribute hashes and numerical/vector
uniforms listed by object/resource name. This distinguishes state changes from a
guess based on particle-like pixels. Definite source-level repeat-render mutations
include camera hill clearance in view/camera.ts (`camLift` eases by .35/.06 per
call, without dt) and canopy reach in View.render (.08 per call). Loading-mist
time follows performance.now, separately from the simulation clock. These facts
do not establish which one caused every ordinary-scene pixel difference; the
canonical run must read the resource diagnostics and OFF-return images.

For the trio itself, `capture-hold.cjs` temporarily replaces only this page's
View.render with a Post redraw of the already prepared scene/camera. It neither
advances View's camera/effect update state nor removes particles/mist from the
scene; existing buffers, lights and uniforms stay as staged. Refraction toggle
still goes through the real Post composite. No game code, clock, global random
generator, potion behavior or production pause policy changes. The exact prior
render descriptor (including a runner wrapper) is restored in finally, along
with temporary mask visibility; the outer helper restores actor/camera/manual/
toggle. The Node hold tests cover bypass, time-advance refusal, nested refusal,
error/backdrop cleanup and inherited/own descriptor restoration. This is a
test-only diagnostic mode, not a production rendering fix or visual acceptance.

`off-nowitch.png` hides both body batches only during held redraw, so a subsequent
SpriteBatch.set cannot turn them back on. It is input for canonical opaque-mask
analysis, not an automatic pixel statistic. For an optional cheap creature pass,
set `creatureId` alongside `fire` to the ID of an existing friendly, non-boss,
unleashed creature. Three extra lateral positions borrow that actual creature
without changing species/art and restore its position/cell afterward. Its camera
and pose are saved in the creature folders; inspect actual rig/sprite overlap
and depth rather than applying the witch quad envelope to a different actor.
This optional stage has not been browser-run by the builder.

### Zero-noise edge follow-up (canonical6547931572)

The580fcb83 held capture has OFF-return0 in all five crossings, so its measured
36/9/18 changed opaque-body pixels by1–3 levels are a real FAIL. The revised guard
uses exact texelFetch depth reads with a one-art-texel min-depth halo at both
destination and source, plus two representable DEPTH24_STENCIL8 depth steps of
conservative comparison margin. CPU tests exercise adjacent diagonal/thin edges,
the displaced source's halo and depth quantisation uncertainty. Up to nine reads
per guarded coordinate (18 for a moved pixel), only inside local masks; OFF still
returns before any read. No extra pass, texture, actor mask or potion-line edit.
This deliberately shrinks distortion near foreground geometry. GPU cost and the
required zero-body-pixel result remain UNMEASURED until an allocated capture.

The probe now always includes canopy observations, including a stable zero,
instead of showing only changed keys. Actual source uses Object.assign(this,
nightState(t)) at construction/reset: canopyNow is a direct View property, despite
the previous review's nested-object hypothesis. Its direct path/own-property flag
and uCanopyReach are recorded to make that distinction checkable.

The helper first uses an existing eligible friendly/unleashed creature. If none
exists, it invokes the existing creature:fox@1 shot stager and borrows its real
friendly/unleashed fox; that full creature snapshot, including its species/state,
is restored afterward or on error. Creature crossing is now included by default
(stageCreature:false explicitly opts out); creatureId can still select an
existing eligible actor. The actual image overlap is still a review requirement.

No new cloud/Claude runner is assumed. Canonical1476#6547931247 now requires own
headless Chromium, explicit laptop slot with FREE evidence, Ed idle>=5min/no game
tab, <=270s and SLOT DONE. Request after pushing exact fix; do not start early.
