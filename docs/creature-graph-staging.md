# Creature graph staging

Authorised by Ed on 2026-10-30, routed through issue #1453. Experimental only;
the production builders, genomes, baked assets and live rig keep their defaults.

## Ownership

This branch owns `art/body-graph/`, `tools/body-graph/`,
`src/bodyGraph.test.ts` and this staging note. Changes to shared rendering,
asset workers or existing species require a coordinator answer first.

## Stages

1. Audit the current builder dispatch and provide a graph with spine stations,
   typed sockets and tapered limb families using the existing Model skin blend.
   Add diagnostic fixtures and geometry checks without a production import.
2. Review representative animal comparisons and agree acceptance with the
   coordinator: proposed bear (flat feet), wolf (raised heels), stag (hooves),
   then bat, snail and hydra to challenge the graph beyond four-legged bodies.
3. Add a gait clock and IK with contact, reach and loop invariants (isolated
   diagnostic implemented); review sprite strips before connecting the graph
   to the bake or live rig. This stage can be tested before animal acceptance.
4. Migrate species only after explicit acceptance. Keep cache invalidation and
   default switching a separate reviewed step.

## Audit observations

Audit at base `7793507b2`: 64 species use 23 active genome builder ids: 42 use
`quad`, and 22 use individual body-plan builders (one species each). The dispatch
also retains a `scarab` mapping unused by current genomes, plus two idle-pose
builders (`sentinel`, `rattle`). Run
`node tools/body-graph/diagnostics.mjs` for the exact current species per builder
and a browser-free geometry sheet in `previews/body-graph-diagnostics.svg`.

The backlog's builder counts are historical, not a current inventory. The
templates already carry socket tags, size curves and gait timings. `Model`
already provides smooth unions between primitives in the same group and
tapered rounded segments (`seg`, `chain`). Its `field` measures a hard union;
`groupField` measures the blended surface. Diagnostics must use the latter
when checking skin joins. No external asset or dependency is required.

The diagnostic sheet compares nearly hard joins (blend epsilon) with the
existing .07 smooth blend at a fixed pixel scale, from both headings. It uses
plain material colours and a fixed three-band light to inspect normals at
joins, not the production lighting or texture bake. The three leg-family
fixtures and extra-socket fixture are
deliberately anonymous; they are not approved replacements for animal art.
Socket offsets use model axes, not a rotating spine-local frame. Wings are
volumes only; membranes, feathers, neck chains and full articulation are later
stages. The torso primitive parity test is exact; species parity is unclaimed.

## Gait diagnostic

`node tools/body-graph/diagnostics.mjs --gait` writes an eight-frame strip for
each leg family to `previews/body-graph-gait.svg`. A signed travel distance
drives the phase; stance travel cancels the body's forward travel, swing uses
smoothstep and squared-sine lift, and opposite diagonal legs share a phase.
The three-dimensional two-bone solver preserves bone lengths, handles parallel
bend hints and coincident targets, clamps impossible reaches and reports them
as unreachable (never as planted contact). Tests sample every fixture leg
through the cycle and check stance contact, reach, loop continuity and exact
lengths. These are straight-line diagnostic gaits with fixed settings, not
animal-specific animation. Digitigrade legs still have two segments: a true
articulated hock, turns, slopes and terrain contact are not implemented.

## Deferred work and trigger

Species replacement, production bake integration and live-rig changes wait
until the coordinator posts representative fixtures and visual acceptance on
this branch's PR. Stage 1 is an engine diagnostic, not animal art parity or a
completed unified generator.
