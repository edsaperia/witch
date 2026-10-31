# tools/smoke

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `alarm.cjs`

The soundsystem alarm: the built game at 1600×900 with ?debug=attack, the witch flown away from home: one alarm, then two, on the ground and from the treetops.

```
npm run build && node tools/smoke/alarm.cjs [out dir] [seed]
```

## `bedroom.cjs`

A still of the character creator's bedroom for review: the game at 1920×1080, the room's canvas alone and the whole screen.

```
node tools/smoke/bedroom.cjs [now/3,bold/4,ref/5]
```

## `bounce-off.cjs`

A 💌 refused by an enraged animal: the built game at 1280×720, her in the debug arena with one SPECIES at level 2 made enraged and stood 9 m off, throwing 💌s at it, frames stepped by hand at a fixed 1/30 s, a crop every EVERY frames saved, then made into…

```
npm run build && node tools/smoke/bounce-off.cjs <out dir> [species] [seed]
```

## `canopy-hole.cjs`

The canopy's hole round her in ground mode: the built game at Ed's window, on the ground in the thickest wood near home on a seed, standing still and then walking, each shot after the art has come in.

```
npm run build && node tools/smoke/canopy-hole.cjs [out dir] [seed] [query]   (SPOT=x,z: just there; ZOOMS=1: every zoom step too; TREETOPS=1: up over the treetops and out)
```

## `cheer-shots.cjs`

Frames of creatures won over celebrating: the built game in headless Chromium, the debug arena, her put down beside it, every one set celebrating, a frame at each of AT into OUT.

## `creator-menus.cjs`

The character creator's boxes: the built game at 1600×900; opens each box in turn, picks a colour in the hat's own picker, then walks her up to her things in the room checking each opens its box; screenshots and a GIF.

## `creator.cjs`

Screenshots of the character creator at its extremes: every slider at its low end, at its high end, an old save, and the hat picker on "no hat".

## `decide.cjs`

Ed's decisions panel: the built game at 1280×720 with ?decide; saves the panel open, with a slider and a choice changed, and checks Confirm opens a GitHub new-issue link labelled decision and copy writes the same line.

## `dream-way.cjs`

A dreaming legend's pointer: the built game at 1600×900 on a seed, the witch on the ground by two sleeping legends in turn, first outside its clearing then inside, and once walked off to one side, 25 m.

```
npm run build && node tools/smoke/dream-way.cjs [out dir] [seed]
```

## `dreams.cjs`

The sleeping legends' dream bubbles: the built game at 1280×720 on a seed; the witch set down on the ground beside the nearest dreaming legend, a crop of its bubble showing each symbol, and one as a nightmare.

```
npm run build && node tools/smoke/dreams.cjs [out dir] [seed]
```

## `effects-scene.cjs`

Executed in the page: require a complete forest and a nonblank drawn canvas, not elapsed wall time.

## `flask-stack.cjs`

The flask in her sigil stack: the built game at 1280×720 on a seed; three creatures leashed to her and the first relic carried, on the ground at home; a crop of her stack before, after one cycle and after another.

```
npm run build && node tools/smoke/flask-stack.cjs [out dir] [seed]
```

## `hud.cjs`

The HUD's top and edges: the built game at 1600×900 on a seed, out of the boot with the next wave half way to coming, the witch a little way from home; the whole screen, then the same with the decisions panel open and the debug overlay to check nothing at…

```
npm run build && node tools/smoke/hud.cjs [out dir] [seed]
```

## `knockdown-bpm.cjs`

The party's tempo on screen.

```
npm run build && node tools/smoke/knockdown-bpm.cjs [out dir] [seed]
```

## `large-world.cjs`

Largest shipped world: art loading/drawing can depend on area diversity and world extent.

```
NODE_PATH=.pw/node_modules node tools/smoke/large-world.cjs
```

## `legend-attack.cjs`

An angry legend's long-range attack seen from the treetops: the built game at 1280×720, a lobbing legend made angry, the witch in the treetops LEGEND_DIST metres south and 40 m west of it, stepped frame by frame through its wind-up, throw and landing;…

```
npm run build && node tools/smoke/legend-attack.cjs [out dir] [seed]   (DIST=..., LEGEND_DIST=60, EVERY=20, SHOTS=14)
```

## `legend-panel.cjs`

The legend circle's explainer: the built game at 1600×900 on a seed, the witch on the ground inside two legends' clearings in turn, each asleep, restless, angry, happy, with a wrong kind's sigil put down inside, and once the party's over, and once just…

```
npm run build && node tools/smoke/legend-panel.cjs [out dir] [seed]
```

## `legendary-sigil.cjs`

A legendary sigil in play: the built game at 1280×720 on a seed; at home's open ground she invites two wild babies brought there, a legend joins her stack, she puts its sigil down, then rises to the treetops.

```
npm run build && node tools/smoke/legendary-sigil.cjs <out dir> [seed] [species]
```

## `legends-flasks.cjs`

Ed's legends-and-flasks ruling: the built game at 1280×720 on a seed.

```
npm run build && node tools/smoke/legends-flasks.cjs [out dir] [seed]
```

## `looks.cjs`

A contact sheet of six pleasing random witches, each standing on the bedroom's rug, at the room's art pixel ×6.

## `magic-dodge.cjs`

Her dodge and her broom in the night: the built game at 1280×720 on a seed; on home's open ground she walks right and blinks, then flies on; frames stepped by hand a fixed 1/30 s.

```
npm run build && node tools/smoke/magic-dodge.cjs <out dir> [seed]
```

## `magic-letters.cjs`

Her 💌s in the night: the built game at 1280×720 on a seed; she stands on open ground at home beside a wild baby brought there and throws 💌s at it, then past it onto the ground; frames are saved, stepped by hand a fixed 1/30 s, cropped round them.

```
npm run build && node tools/smoke/magic-letters.cjs <out dir> [seed]
```

## `magic-sigils.cjs`

Her sigils in the night: the built game at 1280×720 on a seed; at home's open ground she invites two wild babies brought there, puts the bottom sigil down, picks it up again, rises to the treetops and cycles the stack; frames stepped by hand a fixed 1/20 s.

```
npm run build && node tools/smoke/magic-sigils.cjs <out dir> [seed]
```

## `music-lab-pause.cjs`

The Music Lab on the pause page: the built game at the decks, Esc, the pause page's 🎛 button, the panel open down the right edge; a part muted, its channel's gain at 0; a jump to a section, the cue forced; Esc again, the panel still up; ✕, closed.

## `orbit-combat.cjs`

Frames of a busy fight under combat as orbit slots: the built game in headless Chromium, the debug arena, her put down beside it, a frame every STEP seconds of game time for SECS seconds into OUT, so hearts, 💧s and 💌s can be judged together.

## `packs.cjs`

Pack combat's shot sheet: the built game at 1280x720 on a seed, pack combat on, and for each kind its debug arena played headless till each moment of its fight: the tell, the combo, its special, and the lull.

```
npm run build && node tools/smoke/packs.cjs [out dir] [seed] [kinds]
```

## `party-join.cjs`

A creature joining the party: the built game at 1280×720 on a seed; she stands by a wild creature and invites it, and frames are saved as it joins, cropped round it.

## `party-life.cjs`

The party's life: happy guests at the party's places, dancing on the beat.

```
npm run build && node tools/smoke/party-life.cjs <out dir> [seed]   (PARTY_AT=x,z to look at a given place)
```

## `partyspell.cjs`

The start of play: the built game at 1280×720 on a seed, frames stepped by hand a fixed 1/30 s.

```
npm run build && node tools/smoke/partyspell.cjs [out dir] [seed]
```

## `pause-on-top.cjs`

The pause page over everything: each overlay opened in turn, then Esc: the pause page's sliders are on top where they stand, nothing of the overlay is hit in the middle of the screen, a key and the pad reach nothing under it, and Esc again comes back to…

## `places.cjs`

Screenshots of named places, for before/after sheets of scenery fixes: the built game at 1280x720 on a seed, waves off, the witch on the ground at each place in turn, the art let in and the game paused for the shot.

```
npm run build && node tools/smoke/places.cjs <out dir> <seed> <place> [place...]
```

## `quick.cjs`

The quick smoke test, run in CI on every push and pull request: serves the built game, loads it in headless Chromium at 960×540 with ?quick=1, starts, hops off the treehouse deck, flies about 2.5 s on the ground, rises, flies about 2.5 s in the treetops…

## `room-walk.cjs`

The character creator's bedroom, walked about: the built game at 1600×900, the room alone and the whole screen, then a walk round it with the keys, checking she moves, stays out of the furniture and the walls stop her.

## `smoke.cjs`

Smoke test: serves the built game, loads it in headless Chromium, flies the witch in both modes, and saves screenshots to previews/.

## `spell-scroll.cjs`

The party spell's scroll: the built game at 1280×720 on a seed, the creator open, the forest grown; the cursor comes in from the far side to the scroll, drifts off and back, then clicks: the scroll grows, crackles, bursts, and the game runs with the spell…

```
npm run build && node tools/smoke/spell-scroll.cjs [out dir] [seed]
```

## `start-screen.cjs`

The start screen: the built game at a laptop's and Ed's window sizes, the creator open: the tapestry with its tabs on the left, her room in the middle, "Coven Rush" top right, the party spell's scroll bottom right; then the next tab, the controls and the…

```
npm run build && node tools/smoke/start-screen.cjs [out dir]
```

## `swoop.cjs`

A wild flyer's swoop: the built game at 1280×720, her in the debug arena against one wild SPECIES at level 2, frames stepped by hand a fixed 1/30 s through a bout, a crop every EVERY frames saved, then made into <out dir>/<species>.gif.

```
npm run build && node tools/smoke/swoop.cjs <out dir> [species] [seed]
```

## `trail-cooldown.cjs`

One trail, one cooldown: the built game at 1280×720 on a seed; on home's open ground she walks, dodges, takes off, flies, lands and walks on while it drains; frames stepped by hand a fixed 1/20 s, a shot every few, the counter and the trail's length…

```
npm run build && node tools/smoke/trail-cooldown.cjs <out dir> [seed]
```

## `trail.cjs`

Her flight trail: the built game at 1280×720 on a seed, frames stepped by hand a fixed 1/30 s.

```
npm run build && node tools/smoke/trail.cjs [out dir] [seed]
```

## `treetop-sigils.cjs`

Leashed and happy creatures' sigils from the treetops: the built game at 1280×720 on a seed; a few creatures near home made happy and a few leashed, then she rises to the treetops.

```
npm run build && node tools/smoke/treetop-sigils.cjs [out dir] [seed]
```

## `wild-left.cjs`

What's left to clear an area.

```
npm run build && node tools/smoke/wild-left.cjs [out dir] [seed]
```

## `witch-pool.cjs`

Her light pool: the built game at 1280×720 on a seed; she stands at home in front of the dancefloor and on its open heath, and in the middle of other areas, and a still is saved of each, with her glow's reach and power at the time.
