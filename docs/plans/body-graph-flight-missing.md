# Flight features still required

Authority: coordinator1866#6707952715, updated 2026-11-07T14:06:43Z,
quoting Ed: "Will flying creatures have a flying pose?"

SOURCE CHECKPOINT after independent bear candidate de27db515 and
shared dorsal ed9e35cb7. Bat is the demonstration species; one candidate
per species, all six switches OFF. Shared graph ownership remains here;
other lanes supply body-plan/reference targets only.

1. Separate flight posture: level/path-angled torso, forward head, species
   appropriate tucked or trailing legs.
2. Readable multi-frame flap and a held-wing glide/soar pose.
3. Folded/grounded/perched state (bat hanging or crouched), with takeoff and
   landing transitions for flyers that remain grounded until attacking.
4. Wing families: membrane with finger rays; feathered wings with fanned
   primaries; four glassy dragonfly wings; broad scaled moth wings;
   dragon/wyrm membrane wings.

Completion requires source and focused tests, photo-checked references for
flight and ground anatomy, then canonical exact-SHA cloud review. Existing
bat membrane fingers/two-frame flap do not satisfy this list. No local
browser allocation, gameplay-state wiring, activation or release is inferred.

## Implemented diagnostic vocabulary

`art/body-graph/flight.js` exports validated states flap/glide/grounded/perched/
hanging/takeoff/landing, phase and transition progress in0..1, path angle
within±pi/3, and trailing/tucked hindlimbs. A periodic stroke plus fore/aft
sweep gives eight distinct phases. Glide holds its wings regardless of phase.
Smoothstep transition progress interpolates spread, body angle, lift and leg
reach. Ground and perch currently share the crouched pose: no perch gripping
or collision/contact solver is claimed. Hanging turns the head down and folds
distal wings along the body. Ground clearance and natural wrapping need images.

The complete compiled model, flat-wing axes, head/eye landmarks and local paint
coordinates rotate together. The neutral flight head reaches forward with a
low neck; level/path-angle body pose is independent of wing phase. Existing
selected bat frame0/1 remain two opposite stroke extrema. Eight poses are
available to diagnostics, NOT wired into the live game animation clock.

Shared wing kinds are membrane/dragon (wrist finger rays and panels), feathered
(coverts and eight fanned primary panels per side), glassy (four separate narrow
panels with veins), scaled (broad fore/hind panels). The glassy kind uses the
existing WEB material: optical transparency/refraction is NOT implemented.
These generic fixtures are source capabilities, not accepted bird/insect/wyrm
species presets. Their proportions/materials still need lane targets and review.

## Evidence and bounded canonical commands

L5 PR1902#6707973827 specifies a level/path-angled forward flight torso,
forward head, trailing/tucked hindfeet and folded/hanging/crouched state.
Its committed docs at2091b69 are still a plan; detailed photo-checked published
reference targets were unavailable when this source checkpoint was written.
Only the final anatomy verdict depends on that evidence. Bear de27 and its
independent render request1866#6707869893 stay pinned and unchanged.

Canonical can allocate the two diagnostic commands serially at the exact head:

```
WITCH_GRAPH_CLOUD=1 WITCH_SHA=<exact-head> node tools/body-graph/flight-review.mjs flap 2 previews/graph-flight/<head>/flap-2
WITCH_GRAPH_CLOUD=1 WITCH_SHA=<exact-head> node tools/body-graph/flight-review.mjs states 2 previews/graph-flight/<head>/states-2
```

Each has a55s internal incomplete/cleanup budget, clean/served-SHA guards,
native and4x sheets plus metrics. It reuses selected game frame0's calibrated
native scale for every pose of the same facing; never fits each flap to its
own height. Both facings are included. Age0/3 use separate allocations if
needed. Commands are UNRUN here; runtime budget is unproved. Raw shared model
poses omit finish-time extras, and these sheets do not replace reference/image
review or prove live multi-frame animation. Publish only through shots helper.
