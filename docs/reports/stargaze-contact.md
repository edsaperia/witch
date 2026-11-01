# Stargazing contact: first bounded offline measurement

Ed's report1, seed723288/world1268398697, clock407.4816666666228, source4a95ed595 (v6737). This is **not a reproduced GPU frame or a confirmed fix**.

The source files used by these measurements were checked byte-identical to4a95ed595: witch/model/core/stylisation, map/forest/height samples/camera, sprites/party witches/shadows/ground. No product source was changed. The saved rules state is grounded/stargazing, with no knockout or active potion.

## Measured reconstruction

- Art scale30.475606508246337pixels/modelunit; world0.09375metres/artpixel. The saved look was used, including cloak/scarf/bag proportions. Each actual offline stargaze sprite is43×41pixels, with ground anchor y35.3. The bold palette/outline bake's lowest occupied row is34 (texel centre34.5):0.075m above its anchor along the billboard's up axis. Both animation frames were checked; frame1 is selected by floor407.4817×1fps modulo2.
- Camera spline angle1.781009195073169degrees; art pitch29.79380534680281degrees. This mismatch exists, but it is not on its own a measurement of the reported visual defect.
- Only18 local half-float height texels were computed, without filling a height window. At the rules body point: sampled terrain−0.418295729m; reconstructed4m ground triangle−0.417911377m, difference−0.000384352m.
- Reconstructing the sprite shader's five-point minimum terrain placement, anchor/sink, facing flip and nominal bend: the two lowest outlined body texel centres are **−0.013870243m and−0.008803372m relative to their ground triangles**. Negative means slightly below the triangle, not hovering. These are selected contact texels, not a claim that every visible body pixel touches terrain.
- The reconstructed shadow centre is **+0.079413575m above its triangle** in selected frame1 (+0.079420650m in frame0). The shadow shader intentionally adds0.08m to avoid z fighting. This result must not be reported as a newly discovered8cm bug or removed by a guessed offset.
- Separate model-volume inspection shows conservative `restOn` bounds differ from axis-aware primitive support: lowest primitive support is0.40058–0.40572m above the model's nominal floor for this look. This is **not** the baked billboard/GPU body gap; projection and the outline change that comparison. It does not justify editing art grounding under the projection-only brief.

## Limits and next evidence

The save does not contain the moving height window/edge fade, interpolated view state, float32 instance buffers, atlas/GPU depth, pixelSnap result, or the final body/shadow image. The reconstructed lowest outlined contacts are slightly buried, so these measurements do **not** establish projection as the cause of Ed's apparent hover. No production fix or standing/flying identity claim is made.

The smallest next step is one allocated cloud rendering of the exact saved moment, marking the baked contact anchor, body/outline mask and shadow against the actual depth/terrain triangles in that same held frame. No cloud runner or laptop browser is currently allocated. Request that bounded measurement from the coordinator; do not silently launch one. If it establishes a projection defect, then change only the stargaze batch/basis and add non-stargaze byte-identity tests.

## Reproduction tools and evidence

`tools/stargaze/model-contact.mjs`: pure model geometry; `pixel-contact.mjs`: two tiny offline sprite/palette bakes through a byte-array canvas adapter; `terrain-contact.ts`: local half-float/triangle/shader-placement reconstruction. Outputs are under `docs/evidence/stargaze-contact/` and label their limits. Each executed measurement was externally bounded to15seconds; sprite bake took about45ms and map/local-texel arithmetic about0.6seconds. These timings are diagnostics, not application-performance claims.

Inputs were extracted from the selected comment's `night.game`, `night.look`, saved witch position and camera state. Full private logs, breadcrumbs and recordings are not included. Terrain script takes prepared terrain input, pixel output and projection input; model/pixel scripts take saved look plus pixelSize/artPixelsPerMetre. Bundle the TypeScript entry with esbuild for Node, using the repository's declared Three version. No game/browser/renderer is launched.
