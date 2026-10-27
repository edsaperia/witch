# Quality ladder study (India, 2026-10-26)

What each candidate rung saves on Ed's profile, and how much it shows.
- **Setup:** window 2321×1343, px 3 (canvas 774×448), treeCap.keep 0.35, zoom 3, wave 0, scenery radius held at 110 m (where Ed's adaptive radius sits).
- **Base build:** claude/prototype with #1240. #1223 (halving the tall and giant tree shares) had **not** landed, so it isn't in the base.
- **Spots:** Ed's island (seed 428455, world 1268398697), the Alder wood at 2381,2740, on the ground and in the treetops. The density rung also ran in the jaguar island's River jungle at 4287,3242.
- **Renderer:** the cloud's software renderer (SwiftShader), so the milliseconds are the CPU rasterising. Read the **shares**, not the times.
- **Method:** the game held still, each rung settled, then the same frame drawn 3 times at dt 0, each timed on the GPU with a timer query round the whole frame. Base was re-measured every 5 rungs.
  - Base spread: ground 13.9–14.3 s (±2%); treetop 8.0–8.8 s (±5%).
  - Rungs needing a reload (density, px4, blend) are compared across page loads, which differ by up to about 10–15%.
- **Frames:** `<spot>-<mode>-<rung>.png`, each read off the canvas in the task that drew it.

## The split of a frame (GPU)

| | Ground (Alder) | Treetop (Alder) |
|---|---|---|
| Scenery: trees, bushes, decor (no scenery at all) | **65%** | **49%** |
| …of which the trees' 3 extra passes (see-through, depth, front) | **66%** | **32%** |
| …extra passes kept for crowns in the cut-away's band | 37% | 0 |
| …extra passes kept for trees over her circle | 15% | 0 |
| …extra passes kept for far trees in the radius's fading band (70–110 m) | 0 | **32%** |
| Far scenery past 60 m | ≈0 | ≈6% |
| Far treetops past 110 m | ≈0 | ≈0 |
| Creatures and the witch | ≈0 | ≈0 |
| Ground, sky and full-screen effects | the rest (≈35%) | the rest (≈50%) |

None of the full-screen effects (tilt-shift, bloom, mist, the post passes) measured over 1%. One pass runs at the 2321×1343 output size: about 0.1%.

## The rungs

Saving is in GPU time a frame. Visibility: 1 (can't see it) to 5 (obvious).

| # | Rung | Ground | Treetop | Visibility | What changes |
|---|---|---|---|---|---|
| ★ | Trees faded whole left out of the solid and front passes (**#1270**, built) | **−19%** (jungle −12%) | 0 | **0** | Nothing: 0 pixels differ |
| 1 | Never rebuild whole (CPU) | ≈0 | ≈0 | 1 | A rebuild is about 1 ms of CPU here; the worst frame was 4 ms even whole. Ed's 106–120 ms whole rebuilds were at the decks |
| 2 | Wider rebuild margin (24 or 36 m) | ≈0 | ≈0 | 1 | Rebuilds weren't margin-driven while walking |
| 3 | Thin half the small things past 60 m | ≈0 (±2%) | ≈0 | 2 | Sparser far undergrowth |
| 4 | Tall trees squeezed harder (treeCap.keep 0.35 → 0.2) | −10% | −6% | 3 | The tallest trees visibly shorter |
| 5 | Radius 90, 75 or 60 m (from 110) | ≈0 | 60 m: −6% | 2–3 | The forest ends nearer, in the mist |
| 6a | Cast-shadow map off (#857) | −3% | ≈0 | 2 | Shadows no longer darken what they land on |
| 6b | Shadows untinted (tint 0) | ≈0 | ≈0 | 2 | Shadows black, not coloured |
| 6c | Scenery shadows off (#759) | −2% | ≈0 | 2 | Ruins and stones cast none |
| 6d | Trunk shadows off | −6% | ≈0 | 3 | No trunk shadows from her glow or the fires |
| 6e | Blob shadows off | ≈0 | ≈0 | 3 | |
| 6f | Ground cover off | ≈0 | ≈0 | 4 | No grass or flowers |
| 6g | Point lights off | −4% | −3% | 5 | The night's lights gone (not a real option) |
| 6h | Pixel wind off | −4% | −5% | 3 | Leaves still |
| 6i | Trunk-top fade not dithered | ≈0 | ≈0 | 2 | |
| 6j | Tilt-shift, bloom, mist (each) | ≈0 | ≈0 | 3–4 | |
| 6k | Area blend 80 → 40 m (my #1149) | −15%? | −8%? | 2 | Blended borders half as wide; about 15 fewer draws where areas meet. Cross-load, so uncertain |
| 6l | Light rings | 0 | 0 | | Already off in the tuning |
| 7 | Chunkier pixels (px 4) | **−45%** | **−47%** | 4–5 | Everything a third chunkier |
| 8 | Far scenery at half rate | about 0 to 6% at most | ≈6% + (32% if the band) | | Not built: the far share is small, except the treetops' fading band, which rung 10b reaches cheaper. A prototype needs near/far layers with separate targets and depth compositing: days |
| 9 | Tree density ×0.9 (live, no re-bake: tuning.treeDensity at load) | −17% (jungle −11%) | −20% (jungle −6%) | 2 | Slightly more open woods |
| 9 | Tree density ×0.8 | −23% (jungle −34%) | −25% (jungle −16%) | 3 | Noticeably more open woods |
| 10a | Merge the 3 extra passes into one (research note 1) | up to −66% | up to −32% | 3–4 | Upper bound. A single pass with a dither changes the cut-away's soft edge to a dithered one, which Ed turned down for cut-outs |
| 10b | Far fading band dithered in the solid pass instead of 3 extra passes | 0 | **−32%** | 2 | The radius's edge dissolves in art-pixel dither far off in the mist, not a smooth fade |
| 10c | Crowns in the cut-away band drawn solid | −37% | 0 | 4 | The cut-away's edge goes hard |
| 11 | Tight sprite hulls (research note 2) | est. −10 to −25% of the tree passes | | 0 | Not built: needs a hull per atlas frame from the art workers |

## Suggested order (saving for its look)

1. **#1270, the whole-fade cull:** free, built.
2. **10b, far fading band dithered:** −32% in the treetops, look 2.
3. **9, density ×0.9:** −11 to −20%, look 2. Then ×0.8.
4. **6k, area blend 40:** −8 to −15%, look 2. Measure again on the same load first.
5. **4, tall trees squeezed harder:** −6 to −10%, look 3. Recheck on top of #1223.
6. **6h, 6d: pixel wind and trunk shadows:** −4 to −6% each, look 3.
7. **10c, cut-away band solid:** −37% on the ground, look 4.
8. **7, px 4:** −45%, look 4–5, the last rung.

The far-distance rungs (1, 2, 3, 5 and the effects) save almost nothing here: the cost is near trees drawn 4 times.

Also: Hotel's #1256 ground window takes scene textures from 524 to 279 MB, for +1.6 ms CPU p95 walking.
