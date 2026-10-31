# Heat and magical refraction: first slice

Ed authorised this project on 2026-10-31, via root: heat/refraction, dodge echoes,
foliage, landing response, then expressive flat-art lighting, in that order as
separate staged PRs. This PR is only the first heat/refraction slice from
`docs/backlog/visual-response-projects.md` §3 and magic-effects layer 9.

Implement one campfire's continuous plume and one spell pressure wave, anchored
in the world and reprojected each frame. Reuse Post's existing scene/depth textures
and composite; no independent full-screen pass or mushroom engine. Limit pooled
forms and total offset, snap sampling to art pixels, clamp image edges, reject
foreground pixels at both source and destination. No hidden-scene reconstruction.
Preserve existing comfort and fxDistort quality OFF controls. Use game clocks,
reset on island/time rewind, consume a held event once, and expire events even
when quality is off so toggling quality never replays stale effects.

Before shared edits, request the Post composite/uniform and View update/reset
boundary from canonical, accounting for potion composite #1536/#1541 and the
other active renderer owners. Independent mask/depth/lifecycle contracts and
tests proceed first. No changes to gameplay/collisions/timing rules or other
owners' files. First commit is implementation of those drawing contracts.

Nearby tests and typecheck run with one worker. Canonical owns full suites, art,
cloud/browser captures, on/off comparison, GPU/texture bandwidth, memory and
crowded-scene acceptance. No local browser slot or daemon. Prepare exact-SHA
comparison instructions for one fire, one pressure wave, foreground overlap,
screen edges, camera motion, pause/slowtime/island/quality transitions. Default
activation and review scene selection follow canonical's integration ruling.

Root reservation 6544780920 (2026-10-31) opened the narrow Post/View integration.
Implemented as additive namespaced uniforms and one scene-sampling hook, separate
View update/reset hooks and one cast-pose capture call in the existing drawWitch
party-cast branch. Potion coordinate computation, colour/edge/tilt/audio and old
bloom/smooth-FX coordinates remain unchanged. Source-only OFF audit restores the
exact legacy composite hash `215f5c758c04dbf39687a7b8f7e57a9df650b7ceb75f155a615dc9cade99a6a9`
after removing only the new injection/identity hook; this is not a pixel test.
Foreground guards include the source support depth and all four colour texels
participating in fractional potion sampling. Default-OFF preview is registered;
review cases and the coordinator-owned capture helper are in
`docs/plans/heat-refraction-review.md`. No browser/GLSL/GPU acceptance is claimed.
