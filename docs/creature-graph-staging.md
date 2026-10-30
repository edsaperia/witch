# Creature graph staging

Authorised by Ed on 2026-10-30, routed through issue #1453. Experimental only;
the production builders, genomes, baked assets and live rig keep their defaults.

## Ownership

This branch owns `art/body-graph/`, `tools/body-graph/`,
`src/bodyGraph.test.ts` and this staging note. Changes to shared rendering,
asset workers or existing species require a coordinator answer first.

## Stages

0. Ed's 2026-10-30 priority: likeness before distinctness. Compare rendered
   silhouette, coat palette, actual size and spatial markings together; a close
   pair is a review warning only. Keep the existing growth-by-level check.
1. Audit the current builder dispatch and provide a graph with spine stations,
   typed sockets and tapered limb families using the existing Model skin blend.
   Add diagnostic fixtures and geometry checks without a production import.
2. Review representative animal comparisons and agree acceptance with the
   coordinator: proposed bear (flat feet), wolf (raised heels), stag (hooves),
   then bat, snail and hydra to challenge the graph beyond four-legged bodies.
3. Add a gait clock and IK with contact, reach and loop invariants (isolated
   diagnostic implemented); review sprite strips before connecting the graph
   to the bake or live rig. This stage can be tested before animal acceptance.
4. Per the expanded 2026-10-30 brief, design and implement the 42 quadrupeds,
   then the 22 others in family batches without waiting for interim Ed approval.
   Replacements stay behind per-species switches, default off. Each batch needs
   current/new sheets at matching sizes/facings, a frame-cost note and real
   anatomy/gait reference notes. Production activation remains Ed's decision.
   Preserve the old default fallback until its removal is explicitly routed.

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

## Shared selection API

`?creatureModels=bear:graph,wolf:roster` selects records per species; the older
`?creatures=1.5` remains the numeric scale switch. Omission, `id:current`, an
unknown id or an unavailable variant retains the current record and hash.
The URL selects a mode; it does not install records or promise that a graph
replacement exists yet.

The common context is plain serialized style data:
`creatureModels` is the selector string and `creatureVariants[id][mode]` is a
complete genome record with the same id. #1479 supplies its roster records
through that context; graph batches supply graph records through the same
slot. There is no global mutable variant registry, and variants have no effect
without an explicit selector. Capture callers can construct this context
directly; a future built-in pack loader must supply the records to the game
style as well as the selector. Do not create a second selection mechanism.

Exports from `art/genome/index.js` (also `art/generator.js`):
`parseCreatureModels(raw)`, `selectedCreatureGenome(base, context, level)`,
`speciesOf(base, context, level)` and `genomeHash(base, context, level)`. Level
is optional (`null` for the complete selected record), otherwise 0 through 3;
it overlays `levels[level].look` onto `look` and `levels[level].palette` onto
`palette` (including merging the material `over` map). Thus an explicit false at levels
0 through 2 can suppress embers while level 3 retains the original look.
`genomeHash` with a level includes that level and the resolved selected record.
Internally `speciesFor(id, style, level)` applies the same selection for sprites, palettes, rig
pieces, faces and sleeping legends. The selected record's hash separates the
same-id in-memory sprite cache, rig page identity and persisted creature jobs.
The style/selection is fixed for a run and carried unchanged in worker jobs;
JSON round-trip tests cover parity without reading page or worker locations.
Current base tables are never mutated. Existing production builders remain
the default fallback.

Palette consumers pass their level too: `speciesColours(id, style, gear,
level)` and `variantColours(id, style, variant, gear, level)`. Worker bakes,
party/nap frames, rig palettes and sleeping legends pass this through, so a
young palette patch does not recolour the legend. The original three-argument
palette call remains valid when no per-level palette is needed.

## Shared part controls

Beetle controls (requested through coordinator 6513333254):

- `look.mandibles`: `length` and `width` are positive multipliers; `curve` is
  0 to 1 inward bend; `teeth` is 1 or 2; `awayTipLift` is extra away-view tip
  height as a share of jaw length (default .16 in the opt-in part). The old jaw
  code is unchanged when the object is absent. Rendered tip visibility still
  needs cloud review; geometry lift alone is not proof of legibility.
- `look.materials`: `{ wingCases: "SHELL", thorax: "THORAX", head: "HEAD" }`
  gives separate normal-lit palette slots 57, 58 and 59 (all below the existing
  64-slot limit). Omission keeps BODY, BODY, BODY2 exactly as before.
- `palette.over`: RGB triples by material name, e.g. `SHELL`, `THORAX`, `HEAD`.
  Per-level `palette.over` overrides merge with the selected record's own map.
  The new slots default to the original coat colours and are not emissive.

Cats iteration 1 uses `body.graph: { family: "feline", flex: .02 }` to compile
the existing torso envelope into shared spine stations. Head, leg, tail and
legend part families are reused from the common quadruped model; this is not
yet the removal of that fallback or a complete independent body builder.
`felineGraphGenome(base, options)` is a generic adapter, not a species registry;
#1479 owns natural proportions and markings. `head.earRoot` offsets an ear in
head radii, and `head.earAngle` is `[pitch, outwardSplay]` in radians.
`coat.rosettes.wrap` projects rings around the back and both flanks.
`coat.regions` independently defines `torso`, `head` and `legs`: `kind` is
`rosettes`, `spots` or `none`, with `k`, `density`, `mat`, optional `centreMat`,
ring `inner`/`outer` radii or spot `radius`. Regional patterns replace old
all-body spots/stripes/tabby/bands for that region; natural colour/shape and
legend features remain the roster designer's responsibility. Rounded-triangular
fox ears remain subsequent canid shape work.

Native-ring extension (coordinator 6513641499): `torso.outerPx` sets the nominal
ring outer diameter in art pixels (the diagnostic uses 7, targeting the requested
5–8 px range). The renderer's `atScale` callback supplies actual pixels per model
unit, including rig-piece capture; it does not assume one world-space frequency
works at every growth level. `torso.xRange` limits forward/back position as
fractions of the body's `len`, and `flankMin` is minimum absolute side offset
divided by body width. The diagnostic uses `[-.6,.8]` and `.25` to retain shoulder
and flank marks while excluding the rump and centre spine. `gap` is a single
opening's half-angle in radians, rotated deterministically per ring; the regional
rings no longer use three repeated breaks that can resemble speckle. `centreMat`
keeps the pale centre separate from the dark rim.

`markingMetrics` records nominal, unprojected size and scale in capture evidence.
It is not a measurement of visible ring bounds: projection, clipping and surface
orientation still need cloud image review. Current art has none of these fields
and follows its existing path.

Connectedness tests caught thin-profile gaps and inverted legacy baby loaf
depths. The graph inserts interpolated stations to preserve its connectivity
invariant; it normalises non-positive legacy vertical radii and records their
count in `model.bodyGraph.diagnostics.normalisedDepths` for review (notably the
snow leopard baby). These are opt-in changes; no current genome is rewritten.

The native-marking follow-up also checks that a graph's belly is below its back.
When the legacy short-leg division inverts those heights (the snow leopard baby
is a reproduced case), the graph uses the genome's own un-divided belly ratio,
bounded to positive depth, for torso AND leg attachment. The current builder
path retains its old values. `clampedBellyHeights` and `normalisedDepths` are
recorded as `graphDiagnostics` in the capture evidence; no visual acceptance of
that correction is claimed before cloud review.

## Cats comparison driver

Cats-1 independent review (Yankee, comment 6513855670): likeness scores
current → graph were sand cat 2→2, snow leopard 3→3.5, jaguar 3→3.5,
lion 3→3, tiger 4→4, cheetah 4→4 and lynx 3→3. The conservative torso-envelope
conversion retains existing limb/foot families and does not yet deliver the
requested flexible feline gait. Small pixel differences are not evidence of
an anatomy improvement.

Cats-3 ear follow-up adds `head.earDimensions: {height,width}` as full dimensions
in head radii, independent of the old ear length and age multipliers. The sand
cat diagnostic uses height .6, width 1.1, low roots at .28 head radii above
centre, mirrored outward directions near 45 degrees, a wider/flatter skull and
fuller cheeks. Geometry tests inspect both ear bases, widths and directions at
all four growth levels; projected readability still requires cloud review.
The omitted-field path retains its prior ear geometry. These are diagnostic
fixture proportions, not changes to the default roster.

Cats-2 cloud review (6514068634, SHA 85ebc30d): art checks passed; adult
snow-leopard rings measured 6–8 by 5–7 art pixels in two views. Likeness rose
3.5→4 and readability 3→3.5. Published evidence records two baby belly-height
corrections in each facing. Its adult first-construction timings were
158→349 ms towards, 129→274 ms away and 140→219 ms top (current→graph);
these serial wall times include JIT/GC and are not gameplay frame costs.

Cats-3 cloud review (6514241273, SHA 71740af3): art checks passed. Sand-cat
adult likeness rose 2→2.5, but ears became cheek smudges/nubs and the baby
head was oversized. The geometry assertions alone did not establish a good
silhouette. Cats-4 therefore raises roots from .28 to .45 head radii above
centre, increases full ear dimensions from .6×1.1 to .95×1.15, retains outward
splay, and restores the cub's original skull/cheek proportions. It also follows
the cats-2 snow-leopard review with wider haunch coverage, lower ring density,
and fewer larger head/leg spots. These are unscored until cloud review.
Snow-leopard tail shape/markings, coat colour, feline articulation and the other
cats' anatomy remain unfinished; no family plateau or completion is claimed.

Cloud command: `node tools/body-graph/cats-preview.mjs previews/body-graph/cats-1`.
It requires a clean tracked checkout, records and verifies its served source
SHA, and writes one PNG per cat plus `source.json` and `evidence.json`. Set
`WITCH_SHA` to require an exact full SHA. Every sheet shows all four levels in
towards/away/top views, current and graph at the same native game art pixel
size from tuning, with a third column of target notes. No species default is
changed. `tools/body-graph/cat-fixtures.js` contains demonstration deltas over
current records, explicitly not #1479's finished roster presets. The notes
come from the relayed family requests 6513070150 and 6513242775; there is no
claim of a new external reference source or an independent likeness score.

`evidence.json` records first unique sprite construction and albedo-bake wall
times in serial current/graph order. These include JIT/GC effects and do not
measure gameplay frame time, GPU cost or an Intel laptop. Report that limitation
with any cost note. Cloud rendering and independent likeness review are pending;
publish only through `tools/shots/push.mjs` under `previews/ed/creature-graph/cats-1/`.

## Family score history

- Cats: iteration 1, unscored; graph torso/ears/region markings implemented, cloud comparison and independent likeness review pending.
- Bears: iteration 0, unscored; awaiting cat iteration and family comparison.
- Deer: iteration 0, unscored; awaiting preceding family iterations.
- Canids: iteration 0, unscored; awaiting preceding family iterations.

## Deferred work and trigger

The coordinator confirmed bear/wolf/stag, then bat/snail/hydra, compared against
their current in-game art. Family implementation may proceed under default-off
switches; changing live defaults waits for Ed's visual acceptance. Removing an
old builder that is still needed by a default-off switch waits for coordinator
routing. Art checks/captures run on a cloud runner assigned by the coordinator
for an exact SHA and command. The current graph/gait fixtures remain engine
diagnostics, not animal art parity or a completed unified generator.
