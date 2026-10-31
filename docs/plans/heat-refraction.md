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
