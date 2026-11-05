# Treehouse floor/witch ordering: item6

Reported by Ed on v7061 /08f8bc2: seed690974/world0/home, on foot in the house at3178.5,2789.1, area28, zoom3. See-through-full-opacity and low-mist-zero controls were both0px different per canonical6579931020; neither is changed.

## Source defect and measured contract

HouseRooms draws its indoor floor in the transparent overlay at19.925 whenever the witch is perched and ground/descending. drawWitch had selected transparent19.95/depthTest=false only when not on the Terrace and inside onRoomFloor's stricter walking inset. Otherwise she stayed in the opaque world pass at10/depthTest=true, which is submitted before transparent floor pieces. This mismatch can place a join/floor over her.

Extracting the original pass decision without changing behavior made all5 new direct contracts fail: Terrace; dining-terrace join at plan(-3.88,6.93); a Dining floor point outside the stricter inset; actual Three material/order; and descending pass state. These are CPU/source/material failures, not a reproduced screenshot of Ed's exact frame.

The correction extends the existing later room pass to the authoritative perched walking/landing state used to show the floors. The legacy room pass remains valid for its former poses. No new per-frame geometry query or allocation; original inRoom art projection is unchanged. Both dressed and bare witch batches use the same material/order setter, and silhouette follows that pass. Preview floor depth, standing geometry, wall toggles, seating/falling/flight and live floor texture data are unchanged.

## Validation scope

Direct tests sample every14 authorized room shapes, accessible branch points/overlaps and real floor edges outside the walking inset. Actual Three meshes/materials assert transparent late pass, depth testing off, floor/near-rim order behind her, unchanged depth writes and stable material version on repeated same-pass calls. Other poses and flight restoration are explicit. Existing room/standing/crown/approach contracts are nearby checks. No existing assertion is weakened.

Nearby checks:47 tests PASS across six files across relevant runs (new pass7, houseOrder3, render treehouseLook4, houseStanding5, rules treehouseLook22, changelog6), one worker; final typecheck/config freshness/diff PASS. An initial typecheck exposed Three's generic material-array type; the setter now handles its declared union without allocating arrays, with direct coverage. No existing test assertion changed.

Visual acceptance is pending canonical exact-head checks at the reported pose and representative joins/rooms with all look switches on. Include a seated/DJ, no-broom fall and takeoff/approach control before publication. No local browser, GPU draw, art rendering or visual fix claim. No multiplayer files changed; remote visitor composition remains its owner's review.

New visible text only: “Treehouse room joins stay behind the witch while she walks or lands on them.”
