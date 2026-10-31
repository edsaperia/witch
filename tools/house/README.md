# tools/house

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `audit-layout.mjs`

Offline authoring audit only.

```
node tools/house/audit-layout.mjs [input JSON] [output folder]
```

## `bedrooms-shots.cjs`

The other two bedrooms, shot in the built game at 1600×900: the house's plan from above with its rooms' names, the Boudoir with both locked doors and their roofs on, and at each locked door peeking in, its roof lifted over its placeholders under dust sheets.

```
node tools/house/bedrooms-shots.cjs [out dir] [seed]
```

## `dark-shots.cjs`

The dark behind the treehouse's enclosed rooms, shot from the built game at 1600x900: she's stood in rooms and on the Terrace, each shot as the game draws it and with the dark off, and each one's frames timed both ways; then the reveal as she steps from…

```
npm run build && node tools/house/dark-shots.cjs <out dir> [seed]     (ROOMS=a,b or none, TIME=0 no timings, SETTLE=frames, REVEAL=0, SIZE=WxH)
```

## `draw-census.cjs`

Optional one-frame diagnostics, installed inside the page.

## `editor-check.cjs`

Coordinator-only browser QA for the treehouse editor: real art pixels, drag, rotation, undo, copy fallback, validated import.

## `forest-fade.cjs`

The forest fading in behind the treehouse once the island has loaded: from the built game, she's stood in a room with the island not yet counted ready, shot; then it's ready and the fade's shot at its middle and after its end; then the Terrace with the…

```
npm run build && node tools/house/forest-fade.cjs <out dir> [seed]     (ROOM=parlour, SIZE=1600x900, SETTLE=frames, REVEAL=s the fade for the shots, 0 the tuning's)
```

## `furniture-sheet.mjs`

The treehouse's furniture as a contact sheet, no browser: every piece drawn at its house.json footprint, lit by a plain light from the upper left, each art pixel `up` screen pixels wide.

```
node tools/house/furniture-sheet.mjs [ppm] [up] [pitch] [out.png]   (ppm: art pixels a metre, the house's 10.67)   YAW=0 PER=6
```

## `furniture-shots.cjs`

The treehouse's furniture in the built game at 1600×900: she's put in each room of the house a little south of its middle and the camera zoomed out ZOOM steps, a shot each.

```
npm run build && node tools/house/furniture-shots.cjs <out dir> [seed]
```

## `hiz-walk.cjs`

The treehouse's occluders change no pixel: the built game at spots all round the house, each frame drawn with them on and then off in the same page and compared pixel by pixel.

```
npm run build && node tools/house/hiz-walk.cjs [out dir] [seed]   (DIST=, SPOTS=decks,takeoff,...)
```

## `oak-shots.cjs`

The oak treehouse shot in the built game at 1600x900: at her decks on the Terrace and off them, in each trunk room, in a branch room off each, by a locked door, and from the treetops over the Terrace; LABELS=1 names the rooms on their floors; SHOTS=a,b…

```
node tools/house/oak-shots.cjs [out dir] [seed]
```

## `organic.mjs`

The oak's house, checked: the plan is a file a room, so edit a room's own file to move it or what's in it.

```
node tools/house/organic.mjs [--write <file>] [--outline [<file>]]
```

## `positions.cjs`

Where she is in the oak, on screen: the built game, her put in front of house objects or in a room or by the Terrace's record shelf, the frames stepped till the camera's settled; then at a station E and standing still.

```
npm run build && node tools/house/positions.cjs [out] [dist]   OBJECTS (terrace,wardrobe,…,room:bedroom,…), SIZE (1280x720), MAX (24)
```

## `rooms-shots.cjs`

The treehouse's placeholder rooms in the built game at 1600×900: she's put in the house mid-night and stood in each room, then walked along the corridor from the hub to the dressing room.

```
npm run build && node tools/house/rooms-shots.cjs <out dir> [seed]
```

## `shot-session.cjs`

Shared house-shot protocol.

## `takeoff.cjs`

Taking off from anywhere on the treehouse and landing on its trunk, in the built game: the rise's frames from each of ROOMS a fixed 1/60 s at a time with the picture's draw left out, each frame's own work, its median, p95 and worst, against the same rise…

```
npm run build && node tools/house/takeoff.cjs [out dir] [seed]   ROOMS=parlour,bestiary,dining SHOTS=0 (timing only)
```

## `terrace-lock.cjs`

The Terrace's art and the house's floor locked together.

```
npm run build && node tools/house/terrace-lock.cjs   (SEED=123, ROOMS=terrace,dining,parlour,cloakroom,studio,boudoir, TOL=2, DIST=dist)
```
