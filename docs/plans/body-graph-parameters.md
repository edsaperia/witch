# Body-graph expressiveness checkpoint

Authority: coordinator1866#6687315285, 6 November. Six existing candidates only,
all default off. Existing Current/shipped builders, selectors and gameplay remain.
The normal merge from prototype c6934d66c is included; no rebase.
The later6689311553 research direction changes the underlying geometry to family
bean profiles and a parent tree; see `body-graph-part-tree.md`. The vocabulary
below remains, but the15 attachment-guide stations no longer share one rendered
blend group. Regional envelope falloff now shapes the three torso masses.

## Preset vocabulary

The complete serialized genome carries `look.bodyGraphAcceptance`. Shared
implementation is `art/body-graph/expressiveness.js`; the existing feline adapter
in `families.js` is retained. No species identifiers appear in the new family
builders. Acceptance presets are data in `acceptance.js`.

| Area | Parameters |
| --- | --- |
| Torso | length, width, depth, leg height, neck reach, agePlans overrides |
| Dorsal profile | existing q.spine scalar or hip/loin/waist/ribcage/shoulder heights; positive crest, negative parent-local groove; explicit plan.dorsal override |
| Regional tissue | volumes: region name, axial at0..1, size, softness, depth/width weights, lift; up to12 layers |
| Ruff/mane | ruff.size, ruff.softness: a neck-region envelope layer |
| Fur shell | furShell.thickness, softness (surface amplitude) |
| Head | headShape.family: ursine/canid/cervid/feline/rodent/bat/pug/reptile/beak/insect; skull[length,height,width], muzzle[length,height,width], jaw depth, brow |
| Ears/eyes | ear kind round/point/leaf/bigbat/none, size, angle, position; eye size/position |
| Antlers/horns | branches, spread, curve, length, tineLength, glow; horns default to zero branches |
| Limbs | limbRadius, positive per-joint limbProfile (3 or4), stance multiplier; existing raised-heel hints |
| Feet | footShape.kind paw/hoof/clawed/webbed, width, length, pads, claws; cloven hoof material dark |
| Tail | tailShape.kind stub/bushy/whip/fluffy, length, thickness, drop |
| Painted regions | markings: target space head/body/legs/tail, centre, radius, kind saddle/mask/socks/spots/bands, softness, material; spots scale/radius, bands frequency/width |
| Wings | wing span plus wingShape.arm, finger, membraneMat |
| Shell | spiral.turns per age, flare, aperture; aperture cuts into shell group with a dark interior |
| Multiple necks | fan and existing age head counts, reptile mouth/jaw parameters, collars.size/thickness/at |
| Serpent surface | banding: frequency, width, softness, material, painted onto body |

Regional softness is the axial falloff of tissue into the torso envelope, which
is compiled into the existing blended skin. It is not a new per-part SDF smoothing
kernel. Material softness uses a stable model-space coverage pattern to soften
edges; it does not add slabs or extra silhouette geometry. Default old graph
fixtures preserve their original paths. The graph animation is still diagnostic;
this does not promote it into the production live rig or add expressions.

## Bear preset demonstration candidate

Data changes restore a broad1.25 torso, width.4/depth.36, shorter.43 legs,
.105 limb radius with [1,.92,.75] thickness, wide flat padded paws, a short stub
tail and a.34 round ursine skull with short broad muzzle. Tissue layers at neck,
shoulder, chest, belly and haunch add bulk with independent falloff; the shoulder
size is.13, fur thickness.025. Baby/youth/adult/legend have explicit data overrides.
The muzzle is a soft painted region. There is no bear-specific builder branch.

This is a source demonstration candidate, not a claim that a critical reviewer
has accepted likeness or that its silhouette score passes an invented threshold.
The canonical bear overlay and Ed's requested critical review remain necessary.
Numeric overlap can reward the wrong anatomy, so it is a guide and floor only.

## Cloud iteration command

From the exact clean pushed checkout, with explicit canonical cloud allocation:

```
WITCH_GRAPH_CLOUD=1 WITCH_SHA=<full head> node tools/body-graph/iterate.mjs bear previews/graph-iterate/<head>/bear
```

The tool verifies the served SHA and emits frame0 four-age/two-facing native
and nearest-neighbour4x sheets, with shipped cyan / graph magenta / common white
silhouette overlays, plus per-cell IoU, precision, recall, counts and exact preset.
Masks share native billboard centre/ground: no rescaling, shift search or height
equalization. Overlap scores include all occupied pixels, including ornament.
Cold construction/bake/score times are separate from runtime frame cost.

The Node timer enforces a55s work budget by closing its own browser/server and
writing INCOMPLETE. The canonical cloud owner should also contain the process
group with an external under60s watchdog for launch/cleanup failure. Under-minute
completion and the actual bear match are UNPROVED until the allocated command
executes successfully. No laptop browser/capture run is assigned here. Publication
is only through `tools/shots/push.mjs` to a canonical creature-graph batch.

Wake conditions: new-head CI failure -> objective source repair; canonical
executed bear score/overlay -> critical preset-only iteration; canonical verdict
-> next explicitly scoped art-director loop. No family expansion, activation,
benchmark declaration, merge or release is implied.
