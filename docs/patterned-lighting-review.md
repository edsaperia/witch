# Patterned lighting: first-slice review

Ed's requested first slice (2026-10-31): one soundsystem, three looks; one gentle irregular light; one patterned spell. Preview is off by default under root reservation 6544780734. This checklist is not a claim of completed visual or performance acceptance.

Ed's strength ruling (2026-10-31, coordinator1542#6545860556): "Strong", about triple the first preview. Contrast is now .9 for the soundsystem, .75 for the blink rings and .5 for the gentle source, with CPU/GLSL clamps widened to [0,1]. Modulation still only attenuates existing light RGB, never amplifies highlights. The previous75e4fc8 cloud pass captured14 cases without errors and exact comfort/off identity, but was too faint; it does not validate this stronger head. The strong capture must include a clear campfire view and treetop readability.

## What is implemented

- `?patternlight=spokes`, `stripes`, `bands` hold a look. `auto` visits them over 64-beat sections, fading modulation at each boundary. Off, omitted or unknown values retain original lighting.
- The nearest selected existing soundsystem light carries the held look. One selected existing treehouse light or campfire carries gentle irregular modulation (a magic stone can carry it too if present; ordinary settings disable their generation). The treehouse light's power and the campfire's original flicker remain unchanged. One selected existing moonlight-aura light (the blink spell) carries rings. The ordinary ranking, radius, intensity, pool allocation and light count remain unchanged.
- All receivers use the same point-light modulation in `LIGHT_GLSL`: world contact minus the selected light's actual world position. Ground, grass, trunks/crowns and creature sprites use that shared code. No camera/receiver UV coordinates, new atlas, normal maps, extra lights or shadow solution.
- At most three existing slots have patterns. World selection clears every frame; later magic reservation truncates old metadata and overwrites ordinary slots with identity. Diagnostic gallery writes clear replaced slots too. Reduce flashing disables all modulation.
- Music-driven phase is absolute `BeatClock` time, including tempo ramps and audio catch-up; gentle scenery uses world time, while the existing blink follows her spell clock. Pause repeats the same phase. New island metadata is cleared with the next ordinary light selection.

## Exact-SHA runner request (canonical allocation required)

Before screenshots, prove the served `version.json` SHA equals the requested head. Record comparison key, seed/world/island, camera position, game clock/beat, viewport/pixel scale, renderer and comfort setting. Use the same saved scene/time for every pair; wait for art readiness. Make a real clearing with an existing playing soundsystem and an active campfire; use an ordinary blink for the moonlight aura. Do not substitute standalone CPU swatches for game images.

Capture these pairs at ground and treetop height:

1. Off versus each held look, fixed camera and fixed clock.
2. Creature crossing a stripe; camera moving past the same ground/trunk contact. Compare the actual contact's pattern phase, allowing different surface shading.
3. Two overlapping playing systems: confirm only one selected source gets modulation and that both original lights still contribute. Move across the existing budget boundary and inspect fade/pop behaviour.
4. Gentle campfire modulation over several seconds, and ordinary blink with ring light over its real lifetime.
5. Reduce flashing versus off at the same clock: all new modulation must vanish, without changing the ordinary source data or hiding gameplay cues.
6. Pause, tempo ramp, slow-time circle and island reload: no wall-clock drift, stale metadata or double event.

Measure GPU frame median/p95 and CPU drawing time over the same settled view, off/on, ground/treetops and crowded overlapping lights. Record shader link errors, actual point-light count, GL uniform limits and program/texture counts. Added metadata is 24 vec4 uniforms (384 raw bytes); no texture or target is added. Patterned branches add fragment arithmetic inside the existing point-light loop: cost remains **unmeasured** until the runner reports it. Check the default-off branch as well as on. Keep raw evidence and comparability keys with the head SHA. Publish requested review images only via `tools/shots/push.mjs`.

## Evaluation of the other proposal ideas after this slice

| Idea | What this slice can establish | Decision after actual evidence |
|---|---|---|
| Receiver matching / stable anchoring | One shared world-space function and CPU contact tests are implemented | Accept only after moving-receiver and camera captures agree |
| Rich overlapping soundsystems | Three looks reuse existing palette colours and one selected source | Evaluate readability and selection transitions before allowing more patterned systems |
| Musical signal routing | Beat/tempo already supplies deterministic timing; existing mix spectrum was inspected | Add spectrum or per-instrument routing only if the first looks need it; no new analyser now |
| Trip scale/speed/contrast routing | The pattern layer is independent of the effect origin and receiver | Evaluate useful controls after visual/comfort and cost review; no potion implementation added |
| Patterned attack wind-ups | The existing moonlight aura proves the shared spell-light path | Do not alter attack telegraphs or gameplay until separately reviewed |
| Shadows / material relief | Kept separate, with original shadow and normal-map paths untouched | Section 5 material work and new occlusion remain separate projects |

Implementation tests support bounds/identity/lifecycle, not a claim of photosensitivity safety or visual quality. Motion, contrast and colour need Ed's actual review.
