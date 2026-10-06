# Tuning knobs

Generated from `config/tuning.json` and its schema by `node tools/config/schema.mjs --docs`; don't edit by hand. A test fails if it's out of date.

## `mapAreas`, `areaSize`, `areaScale`, `arena`, `areaSizeVariance`, `borderLayers`

The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are. Ed (2026-10-05: "make areas larger; each is effectively a fighting arena"): 14 x 14 areas of 168 m (areaScale 6), about the same world as 20 x 112 m. arena: every area is mostly open within radius metres of its centre and its soundsystem, for fights (they range 15 to 45 m), and (Ed: softer edges; then, at v473, a smaller clearing and a long soft gradient from the area's edge to near its runestone) the woods thicken over a band band metres wide beyond it, across most of the area, along curve (linear: thinning in from right past the open middle; smooth: a slow start), lone trees and bushes thinning out into the clearing, its edge wobbled by noise (a share of the band) so it's no ring; both times fight.scale. bushes and tufts: the share of the undergrowth and the ground cover left in its open middle.

| knob | type | range |
|---|---|---|
| `mapAreas` | number | 0 to … |
| `areaSize` | number | 0 to … |
| `areaScale` | number | 0 to … |
| `arena.radius` | number | 0 to … |
| `arena.band` | number | 0 to … |
| `arena.noise` | number | 0 to … |
| `arena.bushes` | number | 0 to … |
| `arena.tufts` | number | 0 to … |
| `arena.curve` | string | "linear" / "smooth" |
| `areaSizeVariance` | number | 0 to … |
| `borderLayers` | number | 0 to … |

## `treeDensity`, `clearingSize`, `clearingFalloff`, `gladeAmount`, `gladeScale`

treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges); gladeAmount (0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.

| knob | type | range |
|---|---|---|
| `treeDensity` | number | 0 to … |
| `clearingSize` | number | 0 to … |
| `clearingFalloff` | number | 0 to … |
| `gladeAmount` | number | 0 to … |
| `gladeScale` | number | 0 to … |

## `areaEdgeBlend`

Ragged area edges: each tree and bush takes its look (its area type) from a point up to width metres away, by a smooth noise scale metres across plus a per-plant stray (stray, share of width), so neighbouring areas' plants mix in a band along the border. Only the look: creatures, partifying and the party border keep the exact borders.

| knob | type | range |
|---|---|---|
| `areaEdgeBlend.width` | number | 0 to … |
| `areaEdgeBlend.scale` | number | 0 to … |
| `areaEdgeBlend.stray` | number | 0 to … |

## `groundBlend`

How neighbouring areas' floor textures meet (Ed, v160): the border is warped by noise in two octaves (up to warp metres over about 40 m, and fine metres over about 6 m), so it meanders rather than following the texture's grid; across a band metres wide the two floors mix pixel by pixel, by noise and (dither) an ordered dither, like grass creeping into dirt. Visual only. ?blend=off turns it off.

| knob | type | range |
|---|---|---|
| `groundBlend.on` | boolean |  |
| `groundBlend.warp` | number | 0 to … |
| `groundBlend.fine` | number | 0 to … |
| `groundBlend.band` | number | 0 to … |
| `groundBlend.dither` | boolean |  |

## `ground`

The ground's fake relief (Ed, v171: so the ground doesn't look flat): low rises and hollows from noise about relief.scale metres across, tilting the ground's lighting by relief.strength (0 flat) so the witch's light and the campfires pick out the bumps, and hollows shaded darker by relief.shade. ?relief=0 turns it off.

| knob | type | range |
|---|---|---|
| `ground.relief.strength` | number | 0 to … |
| `ground.relief.scale` | number | 0 to … |
| `ground.relief.shade` | number | 0 to … |
| `ground.hills.on` | boolean |  |
| `ground.hills.amplitude` | number | 0 to … |
| `ground.hills.scale` | number | 0 to … |
| `ground.hills.octaves` | number | 0 to … |
| `ground.hills.shade` | number | 0 to … |

## `sky`

The night sky that shows over the bend in treetop mode (on; ?sky=off leaves the plain dark background there, which costs nothing): stars (how many, 0-1), moon (brightness). clouds (Ed, 2026-10-04: real ones, seen only from underneath, over the bend): count (roughly how many to a screenful of sky), altitude (metres over the ground: above the treetop camera, so never between her and it), speed (m/s they drift), opacity (translucent: stars show through), partyGlow (how strongly what's beneath them lights their undersides: the partified areas' colours, pulsing on the beat; campfires faintly; over dormant forest they stay moonlit grey). lightning: about every so many seconds a cloud in view flickers (flashes per strike), sometimes with a forked bolt toward the horizon; ground: the faint flash on the forest (0 none).

| knob | type | range |
|---|---|---|
| `sky.on` | boolean |  |
| `sky.stars` | number | 0 to … |
| `sky.moon` | number | 0 to … |
| `sky.clouds.count` | number | 0 to … |
| `sky.clouds.altitude` | number | 0 to … |
| `sky.clouds.speed` | number | 0 to … |
| `sky.clouds.opacity` | number | 0 to … |
| `sky.clouds.partyGlow` | number | 0 to … |
| `sky.lightning.every` | number | 0 to … |
| `sky.lightning.flashes` | number | 0 to … |
| `sky.lightning.ground` | number | 0 to … |

## `moon`

The moon (Ed, 2026-10-06: "The moon should slowly change: occasionally becoming red, and blue, and yellow, and going through phases, and moving across the sky"): one moon, drawn in the sky, tinting the moonlight a little, and shown on the dancefloor before the first wave (the same phase). phasePeriod: seconds from new moon to new moon; phaseStart: its phase at the start (0 new, 0.25 first quarter, 0.5 full). orbit: seconds to cross the sky once (it rises at the left from behind the far forest and sets at the right), from arcStart (0-1 of the way); left, right: how far across the screen it goes; low, high: the height of its way up the sky band (fractions of the screen from the bottom: low is behind the far forest). Coloured moons: the run is cut into windows of colourEvery seconds, and in each but the first there's a colourChance of a red (blood), blue or gold (harvest) moon for colourTime seconds, easing in and out over colourFade; colours: theirs (0-1 rgb). tint: how much of its colour the moonlight on the world takes (0 none, 1 all). floor: the dancefloor's moon before the first wave (Ed: "only phases of the moon, in muted twilight colours"): palette (dusky violet, slate blue, soft silver, 0-255), size (the moon's radius, a share of the floor's), stars (the share of the floor's sky twinkling round it), flare (seconds the full moon flares out into the party when the first wave comes).

| knob | type | range |
|---|---|---|
| `moon.phasePeriod` | number | 0 to … |
| `moon.phaseStart` | number | 0 to … |
| `moon.orbit` | number | 0 to … |
| `moon.arcStart` | number | 0 to … |
| `moon.left` | number | 0 to … |
| `moon.right` | number | 0 to … |
| `moon.low` | number | 0 to … |
| `moon.high` | number | 0 to … |
| `moon.colourEvery` | number | 0 to … |
| `moon.colourChance` | number | 0 to … |
| `moon.colourTime` | number | 0 to … |
| `moon.colourFade` | number | 0 to … |
| `moon.colours.red` | array of number |  |
| `moon.colours.blue` | array of number |  |
| `moon.colours.gold` | array of number |  |
| `moon.tint` | number | 0 to … |
| `moon.floor.palette` | array of array |  |
| `moon.floor.size` | number | 0 to … |
| `moon.floor.stars` | number | 0 to … |
| `moon.floor.flare` | number | 0 to … |

## `wind`

Wind sway on leafy things (Ed, v171): trees (both halves together, from the foot) and undergrowth lean with gusts that travel across the forest: strength metres at the top of a crown, gusts moving at speed m/s, gustScale metres across; treetop: the share of it seen over the treetops (gentler). Walls and set pieces stand still. ?wind=0 turns it off.

| knob | type | range |
|---|---|---|
| `wind.on` | boolean |  |
| `wind.strength` | number | 0 to … |
| `wind.speed` | number | 0 to … |
| `wind.gustScale` | number | 0 to … |
| `wind.treetop` | number | 0 to … |

## `groundCover`

Tufts of grass, fern, heather, reeds, moss and clover on the ground round the witch (Ed, v171: so the ground doesn't look flat), in ground mode only: density (times each area type's groundCover.density in area-types.json; ?grass=0..2 scales it live), out to the canopy hole round her, at most radius metres (fading out towards it), at most cap at once; one chance every spacing metres, worked out cell metres square at a time, within budgetMs of each frame; they sway in the wind by sway of their height and part round her and nearby creatures by part. None within sigilClear metres of a placed sigil (or over its rune, if bigger), trampled short just beyond (Ed, v233). None on paths, the dancefloor or ground kept clear; thicker along path edges.

| knob | type | range |
|---|---|---|
| `groundCover.on` | boolean |  |
| `groundCover.density` | number | 0 to … |
| `groundCover.radius` | number | 0 to … |
| `groundCover.cap` | number | 0 to … |
| `groundCover.spacing` | number | 0 to … |
| `groundCover.cell` | number | 0 to … |
| `groundCover.budgetMs` | number | 0 to … |
| `groundCover.sway` | number | 0 to … |
| `groundCover.part` | number | 0 to … |
| `groundCover.sigilClear` | number | 0 to … |

## `density`, `bushDensity`, `bushClump`, `treeHeight`

Tree density is a field, not two states (Ed, 2026-10-03): each area's own density (its layout in art/areas.js) times a patch noise patchScale metres across, from patchMin to patchMax times (dense patches, sparse patches, glades), times the area's pattern (groves, stands, rings, rows, thicket, edges only), times the clearings (soft edges); and lone trees at lone density almost everywhere, so open ground isn't empty. treeDensity scales it all.

| knob | type | range |
|---|---|---|
| `density.patchScale` | number | 0 to … |
| `density.patchMin` | number | 0 to … |
| `density.patchMax` | number | 0 to … |
| `density.lone` | number | 0 to … |
| `bushDensity` | number | 0 to … |
| `bushClump` | number | 0 to … |
| `treeHeight` | number | 0 to … |

## `treeCap`, `crownWidth`, `treeSpacingX`, `treeSpacingZ`, `crownHalfWidth`, `crownHeight`, `bushSpacing`

The tallest tree variants (tall, giant) are drawn squeezed so the treetop flight (treetopHeight) stays above the canopy: any height over from metres keeps only keep of the rest (so a 45 m giant shows about 29 m: still over the canopy, not burying her).

| knob | type | range |
|---|---|---|
| `treeCap.from` | number | 0 to … |
| `treeCap.keep` | number | 0 to … |
| `crownWidth` | number | 0 to … |
| `treeSpacingX` | number | 0 to … |
| `treeSpacingZ` | number | 0 to … |
| `crownHalfWidth` | number | 0 to … |
| `crownHeight` | number | 0 to … |
| `bushSpacing` | number | 0 to … |

## `groundSpeed`, `treetopSpeed`, `acceleration`

Speeds per mode, and how long rising and descending take. acceleration: how quickly she reaches her speed or stops in the treetops (per second; higher is snappier); groundAcceleration: the same on the ground. leanAt: the share of the top speed above which she leans into her flight. facing: she (and every creature) faces the viewer unless clearly heading up the screen, within awayEnter degrees of straight up (and stays turned away until past awayLeave); sideways, down or stopped faces the viewer. Within headingEnter degrees of straight up or straight down the screen (until past headingLeave) she flies in her heading sprites: seen from behind going up, coming at us going down.

| knob | type | range |
|---|---|---|
| `groundSpeed` | number | 0 to … |
| `treetopSpeed` | number | 0 to … |
| `acceleration` | number | 0 to … |

## `treetop`, `groundAcceleration`, `leanAt`, `facing`, `riseTime`, `descendTime`, `groundHeight`, `treetopHeight`

Treetop flight (Ed: a high top speed and momentum; the ground stays snappy): pressing a direction reaches treetopSpeed in about 0.3 s (acceleration); holding it within boostAngle degrees builds boost over boostTime seconds, up to boost times treetopSpeed; her heading turns toward the input at turnRateSlow degrees a second below sharpTurnSpeed of cruise, falling to turnRate at cruise (half that at full boost), so the size of her swoop grows with her speed (Ed); a turn of 90 degrees or more bleeds boost sharpTurnBleed times a second, and above brakeAt of cruise she skids in the brake pose; letting go, she glides to a stop over about glideTime seconds. cameraPull: how far the camera draws back at full boost (a share of its distance).

| knob | type | range |
|---|---|---|
| `treetop.boost` | number | 0 to … |
| `treetop.boostTime` | number | 0 to … |
| `treetop.boostAngle` | number | 0 to … |
| `treetop.turnRate` | number | 0 to … |
| `treetop.turnRateSlow` | number | 0 to … |
| `treetop.sharpTurnSpeed` | number | 0 to … |
| `treetop.brakeAt` | number | 0 to … |
| `treetop.glideTime` | number | 0 to … |
| `treetop.sharpTurnBleed` | number | 0 to … |
| `treetop.cameraPull` | number | 0 to … |
| `groundAcceleration` | number | 0 to … |
| `leanAt` | number | 0 to … |
| `facing.awayEnter` | number | 0 to … |
| `facing.awayLeave` | number | 0 to … |
| `facing.headingEnter` | number | 0 to … |
| `facing.headingLeave` | number | 0 to … |
| `riseTime` | number | 0 to … |
| `descendTime` | number | 0 to … |
| `groundHeight` | number | 0 to … |
| `treetopHeight` | number | 0 to … |

## `camera`

shake (Ed, 2026-10-05: "Screen should shake when the witch is hit. More shake when you are on lower health"): each hit adds trauma (0-1), base on her first, perMissingHit more for each hit she was already missing, knockdown on the hit that knocks her down; it falls away at decay a second, and the screen shakes by trauma squared times maxOffsetPx (screen pixels, whole ones) and maxRotDeg, smooth noise wandering speed times a second. ?shake=0 (or the start screen's toggle) turns it off. speedZoom (Ed, 2026-10-05: treetop mode much faster, for travel): the treetop camera's distance is times (treetopSpeed / base) to the power power, so at a faster treetopSpeed it zooms out and the screen holds about as many seconds of flight (power 0: off). curve: the world bends away toward the top of the screen (Ed, 2026-10-04: only over the treetops, so a little night sky shows), per metre ahead of the witch, eased in as she rises; ?curve=<treetop> tries values (0.0015: about 11% of the screen sky in ?bare=1, Ed v276 asked 10-12%; 0.0022 about 24%; under 0.001 none; 0 off); beyond: how many metres past the bent ground's horizon the distant treetops are still drawn (fewer is cheaper). Near-isometric on the ground, after Transistor; the game opens close in on the witch in her seat on the treehouse (intro: distance metres, angle degrees), easing out to the normal view over intro.ease seconds once she moves or rises (Ed, v171); lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.

| knob | type | range |
|---|---|---|
| `camera.fov` | number | 0 to … |
| `camera.ground.angleIn` | number | 0 to … |
| `camera.ground.angleOut` | number | 0 to … |
| `camera.ground.distanceIn` | number | 0 to … |
| `camera.ground.distanceOut` | number | 0 to … |
| `camera.treetop.angleIn` | number | 0 to … |
| `camera.treetop.angleOut` | number | 0 to … |
| `camera.treetop.distanceIn` | number | 0 to … |
| `camera.treetop.distanceOut` | number | 0 to … |
| `camera.lookAhead` | number | 0 to … |
| `camera.lookAheadMax` | number | 0 to … |
| `camera.lookAheadEase` | number | 0 to … |
| `camera.zoomEase` | number | 0 to … |
| `camera.liftEase` | number | 0 to … |
| `camera.curve.ground` | number | 0 to … |
| `camera.curve.treetop` | number | 0 to … |
| `camera.curve.beyond` | number | 0 to … |
| `camera.zoomSteps` | number | 0 to … |
| `camera.speedZoom.base` | number | 0 to … |
| `camera.speedZoom.power` | number | 0 to … |
| `camera.startZoom` | number | 0 to … |
| `camera.shake.base` | number | 0 to … |
| `camera.shake.perMissingHit` | number | 0 to … |
| `camera.shake.knockdown` | number | 0 to … |
| `camera.shake.decay` | number | 0 to … |
| `camera.shake.maxOffsetPx` | number | 0 to … |
| `camera.shake.maxRotDeg` | number | 0 to … |
| `camera.shake.speed` | number | 0 to … |
| `camera.follow` | number | 0 to … |
| `camera.intro.distance` | number | 0 to … |
| `camera.intro.angle` | number | 0 to … |
| `camera.intro.ease` | number | 0 to … |

## `pixelSize`, `glowReach`, `glowFalloff`, `glowNear`, `glowToCutout`, `glowHeight`, `spriteTilt`, `artPixelsPerMetre`, `viewMargin`, `lightBudget`

Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. The witch's light reaches as far as the canopy hole round her in ground mode (its radius plus its soft edge, in metres at her depth, times glowToCutout), so beyond it the forest is dark (Ed, v149); glowNear: the share of that reach where her light has fallen to dark (Ed, round 11: "a bit flat, it should fall off closer"; 1 lit all the way to the hole's edge); glowFalloff: how fast it falls off, as (1 - distance/(reach × glowNear))^glowFalloff. ?glow=<reach>,<falloff>,<near> in the URL fixes the reach (glowReach metres), the falloff and the near share, to try values live. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.

| knob | type | range |
|---|---|---|
| `pixelSize` | number | 0 to … |
| `glowReach` | number | 0 to … |
| `glowFalloff` | number | 0 to … |
| `glowNear` | number | 0 to … |
| `glowToCutout` | number | 0 to … |
| `glowHeight` | number | 0 to … |
| `spriteTilt` | number | 0 to … |
| `artPixelsPerMetre` | number | 0 to … |
| `viewMargin` | number | 0 to … |
| `lightBudget` | number | 0 to … |

## `lights`, `glowPower`

How far (reach, metres) and how strongly each kind of light lights its surroundings. glowPower: the witch's own glow at its brightest (0-1; 0.95, a bright centre that drops quickly to dark, round 11), full under her, falling off as glowFalloff says out to glowNear of her reach, lit from a source glowHeight metres above her. Light falls off smoothly to nothing at its reach: no rings or bands.

| knob | type | range |
|---|---|---|
| `lights.campfire.reach` | number | 0 to … |
| `lights.campfire.strength` | number | 0 to … |
| `lights.stone.reach` | number | 0 to … |
| `lights.stone.strength` | number | 0 to … |
| `glowPower` | number | 0 to … |

## `light`

The lighting's mood (Ed, 2026-10-06: "make it a spooky dark forest with a party in it"; render/mood.ts): mood spooky lays this grade over the Art Lab's night light, plain is the light as it was (?light=plain or ?light=spooky to compare). spooky: ambientHue and ambient (times the tuning's ambient): the shadows' colour and brightness, a deep blue-green; moonHue, moonSat and moon (times tone.moon): a colder moon, a little stronger, so it rims what it lights; hazeHue, hazeSat and haze (its brightness, 0 to 1): the fog the forest fades into, violet; hazeNear and hazeFar: where the fog starts and is whole (metres from the witch; nearer than haze.near and haze.far, which still set how far scenery is drawn); mist: the low ground mist's strength (instead of mist.strength); glowHue and glowSat: the witch's glow, warmer, so the party's lights are the warm ones in the wood; grade, gradeDesat, gradePivot, gradeHue and gradeSat: a grade over the finished picture, draining the dark and middle tones' colour (gradeDesat of it) toward a cold tint (hue and saturation), by grade (0 off), fading out up to gradePivot brightness, so the bright warm lights keep their colour; partyWarm, partyReach and partyStrength: the soundsystems' light, warm amber, pink and gold (one per variant, instead of their crystal cyan, violet and amber), wider and stronger; decorLights, decorReach and decorStrength: the party decor's lights (lanterns, campfires), how many an area lights (instead of partyObjects.lightsPerArea) and how far and strong, so each party is pools of warm light with dark between; areas: each area type's own fog (hazeHue, hazeSat, haze), grade tint (gradeHue, gradeSat) and mist over the above, by area id ("home" for home): misty teal over the bogs and water, violet-grey in the dead and ancient woods, blue-violet in the bluebells, pale mist on the open moor, darker in the rocky places, near-black green under the pines, rosy in the honeysuckle and gardens, home a little less cold; areaEase: how fast the mood eases from one area's to the next (a second); rimHue, rimSat and rim: a moonlight rim on the characters (the witch and every creature, baked or rigged), a light edge one art pixel wide on the side away from the moon in the night sky's blue-violet, at rim strength (0 off), so they read against the dark (the art director, round 1); witchGlow: how much of her own glow lights the witch herself (0: none, as before), so she stands in her pool of light. Round 2 (the art director): moonUp, the moon's fill on whatever faces up (canopy tops, open ground) as a share of the moon, so the dark middle distance still reads (0 none); leyRgb and leyBright, the ley line in the HUD's amber at half its brightness, a guide rather than a light (leave leyRgb out for each area's own colour); berryHalo and berryGlow, a berry's halo's size and strength as shares of the old 2.8 m soft disc, so a berry reads as a crisp dot with a small glow. Round 3: moonUpHue and moonUpSat, the moon fill's own hue and saturation (green-cyan and pale, so the woods are blue-green with violet only in the shadows; left out, the moon's); styledRim and styledGlow: with ?style=bold or ref, the rim's strength and her own glow on her, in place of rim and witchGlow (the styles bake dark tones with flat normals, so she needs more to stand out in her own pool). witchLift and styledLift: her pool's light thrown back up onto her, added rather than multiplied, so even dark tones lift (0 in the default style; styledLift with bold or ref, where she otherwise vanishes in her own pool). moonUpWrap: the share of that fill every face gets whatever its normal (0: by its normal alone), so a crown's regular bumps don't light up as a lattice of dots. Round 4: decorWarm, how far the party decor's point lights go from their neon to the party's amber (an area's neon pieces lit its ground lime; the neon stays on the bulbs, the pool stays warm).

| knob | type | range |
|---|---|---|
| `light.mood` | string |  |
| `light.spooky.ambientHue` | number | 0 to … |
| `light.spooky.ambient` | number | 0 to … |
| `light.spooky.moonHue` | number | 0 to … |
| `light.spooky.moonSat` | number | 0 to … |
| `light.spooky.moon` | number | 0 to … |
| `light.spooky.hazeHue` | number | 0 to … |
| `light.spooky.hazeSat` | number | 0 to … |
| `light.spooky.haze` | number | 0 to … |
| `light.spooky.hazeNear` | number | 0 to … |
| `light.spooky.hazeFar` | number | 0 to … |
| `light.spooky.mist` | number | 0 to … |
| `light.spooky.glowHue` | number | 0 to … |
| `light.spooky.glowSat` | number | 0 to … |
| `light.spooky.grade` | number | 0 to … |
| `light.spooky.gradeDesat` | number | 0 to … |
| `light.spooky.gradePivot` | number | 0 to … |
| `light.spooky.gradeHue` | number | 0 to … |
| `light.spooky.gradeSat` | number | 0 to … |
| `light.spooky.partyWarm` | array of array |  |
| `light.spooky.partyReach` | number | 0 to … |
| `light.spooky.partyStrength` | number | 0 to … |
| `light.spooky.decorLights` | number | 0 to … |
| `light.spooky.decorReach` | number | 0 to … |
| `light.spooky.decorStrength` | number | 0 to … |
| `light.spooky.decorWarm` | number | 0 to … |
| `light.spooky.rimHue` | number | 0 to … |
| `light.spooky.rimSat` | number | 0 to … |
| `light.spooky.rim` | number | 0 to … |
| `light.spooky.witchGlow` | number | 0 to … |
| `light.spooky.moonUp` | number | 0 to … |
| `light.spooky.moonUpHue` | number | 0 to … |
| `light.spooky.moonUpSat` | number | 0 to … |
| `light.spooky.moonUpWrap` | number | 0 to … |
| `light.spooky.styledRim` | number | 0 to … |
| `light.spooky.styledGlow` | number | 0 to … |
| `light.spooky.styledLift` | number | 0 to … |
| `light.spooky.leyRgb` | string |  |
| `light.spooky.leyBright` | number | 0 to … |
| `light.spooky.berryHalo` | number | 0 to … |
| `light.spooky.berryGlow` | number | 0 to … |
| `light.spooky.areaEase` | number | 0 to … |
| `light.spooky.areas.bog.hazeHue` | number | 0 to … |
| `light.spooky.areas.bog.hazeSat` | number | 0 to … |
| `light.spooky.areas.bog.haze` | number | 0 to … |
| `light.spooky.areas.bog.mist` | number | 0 to … |
| `light.spooky.areas.bog.gradeHue` | number | 0 to … |
| `light.spooky.areas.wetland.hazeHue` | number | 0 to … |
| `light.spooky.areas.wetland.hazeSat` | number | 0 to … |
| `light.spooky.areas.wetland.haze` | number | 0 to … |
| `light.spooky.areas.wetland.mist` | number | 0 to … |
| `light.spooky.areas.wetland.gradeHue` | number | 0 to … |
| `light.spooky.areas.beaver-pond.hazeHue` | number | 0 to … |
| `light.spooky.areas.beaver-pond.hazeSat` | number | 0 to … |
| `light.spooky.areas.beaver-pond.haze` | number | 0 to … |
| `light.spooky.areas.beaver-pond.mist` | number | 0 to … |
| `light.spooky.areas.beaver-pond.gradeHue` | number | 0 to … |
| `light.spooky.areas.stream.hazeHue` | number | 0 to … |
| `light.spooky.areas.stream.hazeSat` | number | 0 to … |
| `light.spooky.areas.stream.haze` | number | 0 to … |
| `light.spooky.areas.stream.mist` | number | 0 to … |
| `light.spooky.areas.stream.gradeHue` | number | 0 to … |
| `light.spooky.areas.deadwood.hazeHue` | number | 0 to … |
| `light.spooky.areas.deadwood.hazeSat` | number | 0 to … |
| `light.spooky.areas.deadwood.haze` | number | 0 to … |
| `light.spooky.areas.deadwood.gradeHue` | number | 0 to … |
| `light.spooky.areas.deadwood.gradeSat` | number | 0 to … |
| `light.spooky.areas.ancient.hazeHue` | number | 0 to … |
| `light.spooky.areas.ancient.hazeSat` | number | 0 to … |
| `light.spooky.areas.ancient.haze` | number | 0 to … |
| `light.spooky.areas.ancient.gradeHue` | number | 0 to … |
| `light.spooky.areas.ancient.gradeSat` | number | 0 to … |
| `light.spooky.areas.log-pile.hazeHue` | number | 0 to … |
| `light.spooky.areas.log-pile.hazeSat` | number | 0 to … |
| `light.spooky.areas.log-pile.haze` | number | 0 to … |
| `light.spooky.areas.log-pile.gradeHue` | number | 0 to … |
| `light.spooky.areas.log-pile.gradeSat` | number | 0 to … |
| `light.spooky.areas.bluebell-glade.hazeHue` | number | 0 to … |
| `light.spooky.areas.bluebell-glade.gradeHue` | number | 0 to … |
| `light.spooky.areas.bluebell-glade.mist` | number | 0 to … |
| `light.spooky.areas.wispy-forest.hazeHue` | number | 0 to … |
| `light.spooky.areas.wispy-forest.gradeHue` | number | 0 to … |
| `light.spooky.areas.wispy-forest.mist` | number | 0 to … |
| `light.spooky.areas.moor.hazeHue` | number | 0 to … |
| `light.spooky.areas.moor.hazeSat` | number | 0 to … |
| `light.spooky.areas.moor.haze` | number | 0 to … |
| `light.spooky.areas.moor.mist` | number | 0 to … |
| `light.spooky.areas.heath.hazeHue` | number | 0 to … |
| `light.spooky.areas.heath.hazeSat` | number | 0 to … |
| `light.spooky.areas.heath.haze` | number | 0 to … |
| `light.spooky.areas.heath.mist` | number | 0 to … |
| `light.spooky.areas.grassland.hazeHue` | number | 0 to … |
| `light.spooky.areas.grassland.hazeSat` | number | 0 to … |
| `light.spooky.areas.grassland.haze` | number | 0 to … |
| `light.spooky.areas.grassland.mist` | number | 0 to … |
| `light.spooky.areas.cave-mouth.haze` | number | 0 to … |
| `light.spooky.areas.cave-mouth.gradeHue` | number | 0 to … |
| `light.spooky.areas.cave-mouth.gradeSat` | number | 0 to … |
| `light.spooky.areas.ravine.haze` | number | 0 to … |
| `light.spooky.areas.ravine.gradeHue` | number | 0 to … |
| `light.spooky.areas.ravine.gradeSat` | number | 0 to … |
| `light.spooky.areas.rocky-slope.haze` | number | 0 to … |
| `light.spooky.areas.rocky-slope.gradeHue` | number | 0 to … |
| `light.spooky.areas.rocky-slope.gradeSat` | number | 0 to … |
| `light.spooky.areas.old-pinewood.hazeHue` | number | 0 to … |
| `light.spooky.areas.old-pinewood.hazeSat` | number | 0 to … |
| `light.spooky.areas.old-pinewood.haze` | number | 0 to … |
| `light.spooky.areas.old-pinewood.gradeHue` | number | 0 to … |
| `light.spooky.areas.norway.hazeHue` | number | 0 to … |
| `light.spooky.areas.norway.hazeSat` | number | 0 to … |
| `light.spooky.areas.norway.haze` | number | 0 to … |
| `light.spooky.areas.norway.gradeHue` | number | 0 to … |
| `light.spooky.areas.honeysuckle-tangle.hazeHue` | number | 0 to … |
| `light.spooky.areas.honeysuckle-tangle.hazeSat` | number | 0 to … |
| `light.spooky.areas.garden.hazeHue` | number | 0 to … |
| `light.spooky.areas.garden.hazeSat` | number | 0 to … |
| `light.spooky.areas.berry-thicket.hazeHue` | number | 0 to … |
| `light.spooky.areas.berry-thicket.hazeSat` | number | 0 to … |
| `light.spooky.areas.home.gradeHue` | number | 0 to … |
| `light.spooky.areas.home.gradeSat` | number | 0 to … |
| `light.spooky.areas.home.mist` | number | 0 to … |

## `beat`

The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.

| knob | type | range |
|---|---|---|
| `beat.bpm` | number | 0 to … |

## `berries`

Berries and evolving (Ed): every area has bushesPerArea berry bushes (normal bushes of that area) and perArea [min, max] berries on distinct ones at the start. Bushes grow in patches of patch.bushes [min, max] within patch.radius metres. Party animals (invited, not legends), following her or held at a sigil, take a berry on their way (Ed, v233): within detour metres of the line to where they're heading or of their sigil, never beyond their leash; they nip over, eat it (eatTime seconds) and carry on. seekRadius is kept for free-roaming animals' seek. the berry grows again at once on a free berry bush somewhere else on the map. A party animal evolves on the next bar line once it has eaten the berries its next level costs (Ed, 2026-10-05: "tie the cost to strength"): the fighting value it gains (cost.by "value": √(hp × dps), its species' strength included) at cost.per a berry, rounded, at least 1: so a berry buys the same fighting value for every species; one of normal strength costs 4 and 4 (Ed, 2026-10-06: "Double the amount of berries animals need to evolve": cost.per halved from 7.25) ("power" would count hp × dps instead). Bigger patches since (Ed, 2026-10-05: "we can make the berry clusters bigger"): perArea and patch.bushes up a quarter to a half, so the first evolve's extra berry (2, was 1) and weaker species' one-berry minimum come out a little faster to feed than before. Evolving stops at adult (Ed, 2026-10-04: legends are the areas' own, never grown). colour: the berry's (shiny dark cherry red); glow: its soft halo's strength. B (debug) feeds the nearest party animal one berry.

| knob | type | range |
|---|---|---|
| `berries.perArea` | array of number |  |
| `berries.bushesPerArea` | number | 0 to … |
| `berries.patch.bushes` | array of number |  |
| `berries.patch.radius` | number | 0 to … |
| `berries.detour` | number | 0 to … |
| `berries.seekRadius` | number | 0 to … |
| `berries.eatTime` | number | 0 to … |
| `berries.cost.by` | string | "power" / "value" |
| `berries.cost.per` | number | 0 to … |
| `berries.colour` | string |  |
| `berries.glow` | number | 0 to … |

## `leyLines`

depart (Ed, 2026-10-05: "The start of the first leyline should go from the front of the treehouse"; "the treehouse should be 5m due north of the dance floor ... The ley line leads from it south across the dancefloor and then towards the first speaker"): until the first stone is reached the line starts at the treehouse's front and runs due south straight across the dancefloor and through its ring of speakers, on past metres beyond the ring (avoid metres outside it), then curves smoothly to the first objective's soundsystem, that stretch kept outside the ring. The ley lines (Ed, 2026-10-04; 2026-10-05: "you just follow them from objective to objective"): a glowing line from the last runestone reached to the next objective, the next area in the order the waves wake them, and on (Ed, 2026-10-05: "six sections long, showing the next three and the past three runestones"): ahead sections on from the last stone reached to the next ones, each fade times as bright as the one before, and behind sections back through the stones reached before it, the one just left behindBright times as bright as the next and each before it fade times that. brightness: how bright, a share of their first look (Ed, 2026-10-05: "about 30% as bright", 0.3), the glow through the crowns too. Each fades from the colour of the area it starts in to that of the area it ends in (the colour partified areas and soundsystems use). advance: "first" moves it on when the next area's quest is done or its wave arrives, whichever comes first; "wave" only when its wave arrives. The old line drains into the stone reached and the new one draws out from it. Each wanders along the low ground between its stones, straying up to valley of its length (80 m at most) to follow the hills' valleys, and a shimmer flows along it toward the next stone at flow[0] m/s, flow[1] m apart. It stays on the ground in both modes (Ed): width metres across on the ground and over the treetops (wider there, with a faint glow through the crowns), height metres over the ground in each. ?ley=0 turns them off.

| knob | type | range |
|---|---|---|
| `leyLines.on` | boolean |  |
| `leyLines.ahead` | number | 0 to … |
| `leyLines.behind` | number | 0 to … |
| `leyLines.behindBright` | number | 0 to … |
| `leyLines.advance` | string |  |
| `leyLines.fade` | number | 0 to … |
| `leyLines.brightness` | number | 0 to … |
| `leyLines.width` | array of number |  |
| `leyLines.height` | array of number |  |
| `leyLines.valley` | number | 0 to … |
| `leyLines.flow` | array of number |  |
| `leyLines.depart.past` | number | 0 to … |
| `leyLines.depart.avoid` | number | 0 to … |

## `witch`

The witch knocked back and staggered by a blow (Ed, 2026-10-05: "add a knockback and stun on the witch; make it large on chasing/ramming creatures"; rules/knock.ts): thrown straight away from the blow, base metres for any blow (bites, swipes, shots) plus scale times the attack's own knockback (combat.json; so a maul, quake or slam sits in between), at least charge metres when it rams her (a charge, or a leap landing on her), at most max; eased off at ease a second (like a creature's knockback), straight through scenery (Ed: "don't make it stop at scenery"), nudged to the nearest clear spot at the end if she'd rest inside a trunk, rock, speaker, soundsystem or the treehouse (the blink's clearances). Staggered (no moving, blinking or 💌s, a wobble and stars) stunBase seconds plus stunScale a metre thrown past base, at most stunMax; then not staggered again for immune seconds (the blows still count), so a pack can't stun-lock her. A blink dodges it all; the blow that knocks her out throws nothing. on false, or ?knock=0, turns it off.

| knob | type | range |
|---|---|---|
| `witch.knock.on` | boolean |  |
| `witch.knock.base` | number | 0 to … |
| `witch.knock.scale` | number | 0 to … |
| `witch.knock.charge` | number | 0 to … |
| `witch.knock.max` | number | 0 to … |
| `witch.knock.ease` | number | 0 to … |
| `witch.knock.stunBase` | number | 0 to … |
| `witch.knock.stunScale` | number | 0 to … |
| `witch.knock.stunMax` | number | 0 to … |
| `witch.knock.immune` | number | 0 to … |
| `witch.lightFloor` | number | 0 to … |
| `witch.lightTint` | number | 0 to … |
| `witch.lightRim` | number | 0 to … |
| `witch.heightSmooth` | number | 0 to … |
| `witch.heightLookAhead` | number | 0 to … |
| `witch.heightClearance` | number | 0 to … |

## `sigilProjection`, `occlusion`

From the treetops, each placed sigil shows above the canopy over its spot: height metres above the crowns, opacity, size (times the ground rune), and a faint column of light (beam opacity) from the rune up to it. Fades in as she rises.

| knob | type | range |
|---|---|---|
| `sigilProjection.height` | number | 0 to … |
| `sigilProjection.opacity` | number | 0 to … |
| `sigilProjection.beam` | number | 0 to … |
| `sigilProjection.size` | number | 0 to … |
| `occlusion.on` | boolean |  |
| `occlusion.fadeOpacity` | number | 0 to … |
| `occlusion.edge` | number | 0 to … |
| `occlusion.minHeight` | number | 0 to … |
| `occlusion.silhouette` | number | 0 to … |

## `stack`

The sigil stack above the witch's hat: scale (of the sigils' size), offset (the gap between her hat tip and the bottom sigil, in sigil heights), gap (between sigils, in sigil heights). It sways as a chain of springs: stiffness and damping, trail (how far it leans back per m/s of her speed), idleSway (metres of gentle sway when she's still).

| knob | type | range |
|---|---|---|
| `stack.offset` | number | 0 to … |
| `stack.scale` | number | 0 to … |
| `stack.gap` | number | 0 to … |
| `stack.stiffness` | number | 0 to … |
| `stack.damping` | number | 0 to … |
| `stack.trail` | number | 0 to … |
| `stack.idleSway` | number | 0 to … |

## `partyObjects`, `partyWitches`, `speakerLasers`, `lasers`

Party objects (Ed, 2026-10-04; art/party.js): each partified area gets clusters [min, max] of the art's clusters, loose [min, max] loose pieces (litter, small lights, balloons; neon and balloon colours random per placement), set dressing at setChance, and at caughtChance an escaped balloon caught in a tree; hanging [min, max] lanterns, jars, fairy lights or mirror balls hung from branches in nearby crowns. They appear as the party arrives. Real point lights only from campfires and lanterns (lanternReach metres, warm), at most lightsPerArea an area; everything else glows without lighting. Home (Ed, 2026-10-05: "It has party decorations instead of trees; ... scattered around the whole home area, excluding the dancefloor"): its meadow strewn all over with home.loose [min, max] pieces picked by class (home.weights: the home set, small lights, balloons, litter, furniture, set dressing; nothing that hangs, as home has no trees) at least home.gap metres apart, and home.clusters [min, max] clusters (the home ones, home-path and home-corner, among the rest), out to home.reach of an area past its circle, off the dancefloor's clearing, the paths, the treehouse and her seat; an arch piece over each path where it leaves the floor's clearing; at most home.lights real lights. exclude: pieces never placed, loose or in clusters (Ed, v271: the glowing LED cube looked too much like a game object). generated: the prop generator's seeded bunting, balloon bunches and paper lanterns (art/party.js gen-*) in place of the hand-made ones they replace (?props=gen turns it on).

| knob | type | range |
|---|---|---|
| `partyObjects.on` | boolean |  |
| `partyObjects.clusters` | array of number |  |
| `partyObjects.loose` | array of number |  |
| `partyObjects.setChance` | number | 0 to … |
| `partyObjects.caughtChance` | number | 0 to … |
| `partyObjects.hanging` | array of number |  |
| `partyObjects.lightsPerArea` | number | 0 to … |
| `partyObjects.lanternReach` | number | 0 to … |
| `partyObjects.arch` | string |  |
| `partyObjects.home.clusters` | array of number |  |
| `partyObjects.home.loose` | array of number |  |
| `partyObjects.home.weights` | record |  |
| `partyObjects.home.gap` | number | 0 to … |
| `partyObjects.home.reach` | number | 0 to … |
| `partyObjects.home.lights` | number | 0 to … |
| `partyObjects.exclude` | array of string |  |
| `partyObjects.generated` | boolean |  |
| `partyWitches.max` | number | 0 to … |
| `partyWitches.idleAfter` | number | 0 to … |
| `partyWitches.idleReach` | number | 0 to … |
| `partyWitches.activityMin` | number | 0 to … |
| `partyWitches.activityMax` | number | 0 to … |
| `partyWitches.weights` | record |  |
| `partyWitches.arriveTime` | number | 0 to … |
| `partyWitches.flyFrom` | number | 0 to … |
| `partyWitches.flyHeight` | number | 0 to … |
| `partyWitches.runSpeed` | number | 0 to … |
| `partyWitches.walkSpeed` | number | 0 to … |
| `partyWitches.lapSpeed` | number | 0 to … |
| `partyWitches.pairRange` | number | 0 to … |
| `partyWitches.pairGap` | number | 0 to … |
| `partyWitches.limboPass` | number | 0 to … |
| `partyWitches.floorShare` | number | 0 to … |
| `partyWitches.debugExtra` | number | 0 to … |
| `speakerLasers.on` | boolean |  |
| `speakerLasers.tilt` | number | 0 to … |
| `speakerLasers.sweep` | number | 0 to … |
| `speakerLasers.sweepBeats` | number | 0 to … |
| `speakerLasers.length` | number | 0 to … |
| `speakerLasers.opacity` | number | 0 to … |
| `lasers.on` | boolean |  |
| `lasers.maxCount` | number | 0 to … |
| `lasers.length` | number | 0 to … |
| `lasers.spread` | number | 0 to … |
| `lasers.maxTilt` | number | 0 to … |
| `lasers.sweep` | number | 0 to … |
| `lasers.sweepBeats` | number | 0 to … |
| `lasers.openBars` | number | 0 to … |
| `lasers.opacity` | number | 0 to … |
| `lasers.duty` | number | 0 to … |
| `lasers.blockBars` | number | 0 to … |
| `lasers.fadeIn` | number | 0 to … |
| `lasers.fadeOut` | number | 0 to … |
| `lasers.fadeNear` | number | 0 to … |
| `lasers.fadeFar` | number | 0 to … |

## `borders`, `lightSources`, `haze`

A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks); twinkle (0 a gentle breathing, 1 star-like: brief flashes and dips, now and then a spark out for a moment); each spark flickers between its own area's colour and the one across the edge (Ed, v183), swapRate times a second on its own phase, and swapBeat of them snap on the beat instead. ?border=<twinkle>,<swapRate>,<swapBeat> tries values.

| knob | type | range |
|---|---|---|
| `borders.on` | boolean |  |
| `borders.width` | number | 0 to … |
| `borders.brightness` | number | 0 to … |
| `borders.sparkle` | number | 0 to … |
| `borders.step` | number | 0 to … |
| `borders.twinkle` | number | 0 to … |
| `borders.swapRate` | number | 0 to … |
| `borders.swapBeat` | number | 0 to … |
| `lightSources.spacing` | number | 0 to … |
| `lightSources.campfire` | number | 0 to … |
| `lightSources.magicStone` | number | 0 to … |
| `lightSources.pond` | number | 0 to … |
| `lightSources.wetPond` | number | 0 to … |
| `haze.near` | number | 0 to … |
| `haze.far` | number | 0 to … |

## `scenery`

The scenery budget (Ed, 2026-10-03: gameplay always drawn, scenery as much as we can). Creatures, sigils, soundsystems, the dancefloor, the party border, campfires and stones are always drawn. Scenery (trees, bushes, wall objects, set pieces, string lights) is drawn out to a radius round the witch, at most the haze's far edge, fading out over its last fade metres so nothing pops. With adaptive on, the radius follows the frame rate: if it stays under fps minus hysteresis for sustain seconds the radius shrinks by shrink metres a second, never below minRadius; if it stays at fps or more, it grows back by grow metres a second. ?scenery=<metres> fixes the radius (for testing).

| knob | type | range |
|---|---|---|
| `scenery.adaptive` | boolean |  |
| `scenery.fps` | number | 0 to … |
| `scenery.hysteresis` | number | 0 to … |
| `scenery.sustain` | number | 0 to … |
| `scenery.minRadius` | number | 0 to … |
| `scenery.shrink` | number | 0 to … |
| `scenery.grow` | number | 0 to … |
| `scenery.fade` | number | 0 to … |

## `shadows`, `canopyShadow`, `mist`

shadows: a small contact shadow under the witch, each bush, creature and prop; trees: a crown-sized shadow under every tree too, cast away from the moon (off: Ed, 2026-10-03). canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.

| knob | type | range |
|---|---|---|
| `shadows.on` | boolean |  |
| `shadows.strength` | number | 0 to … |
| `shadows.trees` | boolean |  |
| `canopyShadow.on` | boolean |  |
| `canopyShadow.strength` | number | 0 to … |
| `canopyShadow.height` | number | 0 to … |
| `canopyShadow.cover` | number | 0 to … |
| `canopyShadow.wind` | number | 0 to … |
| `mist.on` | boolean |  |
| `mist.strength` | number | 0 to … |
| `mist.height` | number | 0 to … |
| `mist.wind` | number | 0 to … |

## `fx`

fx: how the mist, the far haze and the canopy dapple are drawn. smooth: soft gradients (the mist in its own buffer, blurred a little and scaled up smoothly); pixel: dithered steps on the art's pixel grid. In smooth, the moonlight's bands, moonbeams and the soft contact shadows under the witch, creatures, bushes and props are smooth too (no dither anywhere); pixel brings all the dithers back. ?fx=pixel or ?fx=smooth in the URL.

| knob | type | range |
|---|---|---|
| `fx` | string | "smooth" / "pixel" |

## `moonbeams`

How strong the diagonal moonbeam bands are, times the style's Moonbeams knob: 0 is off (Ed, v108: they read as stripes over a dense canopy). ?moonbeams=on brings them back at 1.

| knob | type | range |
|---|---|---|
| `moonbeams` | number | 0 to … |

## `treehouse`

The witch's treehouse, home (Ed, 2026-10-05: "The treehouse should be 5m due north of the dance floor, outside the speaker ring"): its footprint's nearest edge (clear metres round its foot) stands gap metres beyond the dancefloor's ring of speakers (so however many speakers or how far out, it stays outside them), at angle degrees (-90: due north, straight up the screen), always facing south, to the floor and the camera; and keeps a clearing of clear metres round its foot (at least the art's footprint: 8.2 m for the v2 tower); its lantern and fairy lights light lightReach metres round at lightStrength. The game starts with her sitting on its terrace; the first move or rise takes her off.

| knob | type | range |
|---|---|---|
| `treehouse.gap` | number | 0 to … |
| `treehouse.angle` | number |  |
| `treehouse.clear` | number | 0 to … |
| `treehouse.lightReach` | number | 0 to … |
| `treehouse.lightStrength` | number | 0 to … |

## `home`

Home's area (Ed, 2026-10-05: "Home area should be big enough that the whole circle, centre the dancefloor, edge the treehouse, is within it"): the map is cut with home first, a circle round the dancefloor out past the treehouse's footprint (its distance and clear) and margin metres more all home's; the areas round it are cut round it, their centres kept at least gap of an area beyond the circle.

| knob | type | range |
|---|---|---|
| `home.margin` | number | 0 to … |
| `home.gap` | number | 0 to … |

## `rig`, `looks`

The live rig (Ed, 2026-10-05): on by default, ?rig=0 turns it off. Creatures keep their baked frames in the treetops, and on the ground when drawn smaller than minPx art pixels, except the levels in alwaysLevels: legends are always rigged.

| knob | type | range |
|---|---|---|
| `rig.minPx` | number | 0 to … |
| `rig.alwaysLevels` | array of string |  |
| `looks.enragedTint.colour` | string |  |
| `looks.enragedTint.amount` | number | 0 to … |
| `looks.anger.on` | boolean |  |
| `looks.anger.size` | number | 0 to … |
| `looks.partyGlow.on` | boolean |  |
| `looks.partyGlow.sparkles` | number | 0 to … |
| `looks.partyGlow.rate` | number | 0 to … |
| `looks.partyGlow.size` | number | 0 to … |
| `looks.partyGlow.strength` | number | 0 to … |

## `bubbles`

The talk's speech bubbles (Ed): an outline only, no fill. The emoji in them are pixel sprites emojiPixels across, each pixel scale times the game's pixel size on screen (the outline's colour and thickness are in index.html's .bubble). levelScale (Ed, 2026-10-05: "the speech bubbles should scale with the level of the animal, with the legends as the largest"): a creature's bubble, emoji and outline together, times this by its level (baby, young, adult, legend); the witch's stays at 1. One bubble style for every speaker (render/bubbles.ts): the 💌 replies, and the legends' dream bubbles.

| knob | type | range |
|---|---|---|
| `bubbles.emojiPixels` | number | 0 to … |
| `bubbles.scale` | number | 0 to … |
| `bubbles.levelScale` | array of number |  |

## `scenes`, `grounds`

Scenes (Ed, 2026-10-04; art/scenes.js): small vignettes (a farmyard corner, a bus stop, a picnic gone wild...) and large landmarks (a cemetery, a car park, ruined churches and temples, castle ruins...), each a few pieces counting as one, each at most once per map. An area gets one with chance, if a scene that suits it (its suits) is still unused; it stands off to the side of the area's centre, its footprint clear of the paths, gameplay and other features, trees kept off it, mirrored at random. footprint: the farthest piece's authored offset times scale, plus pad metres (a test checks it covers the art's own).

| knob | type | range |
|---|---|---|
| `scenes.chance` | number | 0 to … |
| `scenes.scale` | number | 0 to … |
| `scenes.pad` | number | 0 to … |
| `grounds.chance` | number | 0 to … |
| `grounds.kinds` | array of string |  |
| `grounds.radius` | record |  |

## `relics`

Modern relics (cars, trolleys, cones, highway slabs, a phone box, a sofa...): one chance per spacing-metre cell (chance, steered by the area's decor share of modern), nearRoad times as likely within 20 m of a road or railway; never on a path, in a central clearing or a ground; at least minGap metres from the next relic (Ed, v147: too numerous).

| knob | type | range |
|---|---|---|
| `relics.spacing` | number | 0 to … |
| `relics.chance` | number | 0 to … |
| `relics.nearRoad` | number | 0 to … |
| `relics.minGap` | number | 0 to … |

## `walls`

Wall objects as features (Ed, v147), per area: man-made and linear ones (garden walls, hedges, brambles, rock walls) as runs [min,max] of runLength [min,max] pieces joined end to end, along a path where one passes (with a gateway gap gateChance of the time; a garden's flower beds in a row along them); henge stones as rings [min,max] of ringStones [min,max] (the first round the shrine, others ringRadius [min,max] metres across in a glade), an avenue leading in avenueChance of the time, and a lone stone loneChance; water, reeds and boulders as clumps [min,max] of clumpSize [min,max] within clumpRadius metres. Open ground between.

| knob | type | range |
|---|---|---|
| `walls.runs` | array of number |  |
| `walls.runLength` | array of number |  |
| `walls.gateChance` | number | 0 to … |
| `walls.rings` | array of number |  |
| `walls.ringStones` | array of number |  |
| `walls.ringRadius` | array of number |  |
| `walls.avenueChance` | number | 0 to … |
| `walls.loneChance` | number | 0 to … |
| `walls.clumps` | array of number |  |
| `walls.clumpSize` | array of number |  |
| `walls.clumpRadius` | number | 0 to … |

## `runeMarkers`

Spawn markers (Ed, v147): a rune stone on every spot where a soundsystem will come, scale times the old rune stone's size. Dormant (not the next wave): the rune glows steadily at dormant.glow (0-1), a modest light (light strength, reach metres) and a faint beacon above the canopy (beam opacity). Awake (the next wave comes here): the rune, its light and its motes pulse on the beat, from awake.glow[0] to [1], light strength plus lightBuild as the wave's countdown runs out, motes rising (motes per stone, plus moteBuild near the end), a stronger beam. beamHeight: the beacon's height (metres); lightRange: stones within this many metres light the scene. When the party comes, the stone flares (flare.light) and sinks over flare.time seconds as its soundsystem arrives. awakeStyle (Ed, v149: "let's see both"): an awake stone shows a column of light above the canopy ("column"), a thin laser straight up like the disco ball's ("beam": laser opacity, width and length in metres; glow only, no light), or both; ?rune=beam\|column\|both in the URL.

| knob | type | range |
|---|---|---|
| `runeMarkers.awakeStyle` | string |  |
| `runeMarkers.laser.opacity` | number | 0 to … |
| `runeMarkers.laser.width` | number | 0 to … |
| `runeMarkers.laser.length` | number | 0 to … |
| `runeMarkers.scale` | number | 0 to … |
| `runeMarkers.beamHeight` | number | 0 to … |
| `runeMarkers.lightRange` | number | 0 to … |
| `runeMarkers.dormant.glow` | number | 0 to … |
| `runeMarkers.dormant.light` | number | 0 to … |
| `runeMarkers.dormant.reach` | number | 0 to … |
| `runeMarkers.dormant.beam` | number | 0 to … |
| `runeMarkers.awake.glow` | array of number |  |
| `runeMarkers.awake.light` | number | 0 to … |
| `runeMarkers.awake.lightBuild` | number | 0 to … |
| `runeMarkers.awake.reach` | number | 0 to … |
| `runeMarkers.awake.beam` | number | 0 to … |
| `runeMarkers.awake.motes` | number | 0 to … |
| `runeMarkers.awake.moteBuild` | number | 0 to … |
| `runeMarkers.flare.time` | number | 0 to … |
| `runeMarkers.flare.light` | number | 0 to … |

## `pathFade`

Every end of a path, road, railway or stream (where it stops, peters out or is broken) frays out over its last metres in an ordered dither on the art's pixel grid, broken up by noise (Ed, v149).

| knob | type | range |
|---|---|---|
| `pathFade.metres` | number | 0 to … |
| `pathFade.dither` | boolean |  |

## `trunkFade`

In ground mode, where the crowns are hidden, each tree's trunk fades out over its top metres in an ordered dither on the art's pixel grid (Ed, v149), instead of ending in a flat cut; over at most share of the trunk's visible height, so short trees keep a solid trunk (Ed, v233). Trunks stand in the canopy's shadow: never darker than lightFloor of their unlit look, with a rim from her glow; and the cut between trunk and crown is where crownShare of the crown's pixels lie above, not its lowest low bough (Ed, v271: "We have really lost our treetrunks").

| knob | type | range |
|---|---|---|
| `trunkFade.metres` | number | 0 to … |
| `trunkFade.share` | number | 0 to … |
| `trunkFade.dither` | boolean |  |
| `trunkFade.lightFloor` | number | 0 to … |
| `trunkFade.rim` | number | 0 to … |
| `trunkFade.crownShare` | number | 0 to … |

## `decor`

Decorations scattered as discoveries: one chance per spacing-metre cell, of a ruin (ruins), a rock (rocks) or a freak tree (freak), each at least minGap metres from the next (Ed, v147: too numerous); fewer under dense canopy; never in an area's central clearing (openness under clearing), on or within pathGap metres of a path, or by the dancefloor. footprint: metres round a decoration kept clear of soundsystems, the dancefloor, the treehouse and set pieces (plus reserveMargin).

| knob | type | range |
|---|---|---|
| `decor.spacing` | number | 0 to … |
| `decor.ruins` | number | 0 to … |
| `decor.rocks` | number | 0 to … |
| `decor.freak` | number | 0 to … |
| `decor.minGap` | number | 0 to … |
| `decor.clearing` | number | 0 to … |
| `decor.pathGap` | number | 0 to … |
| `decor.footprint` | number | 0 to … |

## `paths`

Paths, roads and railways (Ed): rails [min,max] railway lines edge to edge in wide curves (one with a branch); roads [min,max] broad sweeping old roads; linkChance: the share of neighbouring areas joined by a meandering path; deadEndChance: the share of areas with a path out to nothing; pathHalf, roadHalf, railHalf: half each corridor's width (metres), kept clear of trees, with bushes thick along the edges for edgeBushes metres (bushBoost times as many); streams [min,max] long streams winding across the map (and short ones join wet areas that touch), streamHalf metres half-wide; along a railway, every landmarkSpacing metres, a landmarkChance of a landmark (a wagon, a carriage, a platform, a gantry) and otherwise sometimes a signal post; verge posts along roads every vergeSpacing metres; every 3D piece at least pieceGap metres from the next; fingerposts: a fingerpost by each footpath where it comes into a clearing (the prop generator's; ?props=gen turns it on); the two flights of stairs are finds, each at most once per map, by the clearing of a ravine, rocky slope, cave mouth or stone shrine; railBroken: the share of the railway that's broken, where trees grow between the sleepers (treesOnBroken times the usual chance).

| knob | type | range |
|---|---|---|
| `paths.rails` | array of number |  |
| `paths.roads` | array of number |  |
| `paths.linkChance` | number | 0 to … |
| `paths.deadEndChance` | number | 0 to … |
| `paths.pathHalf` | number | 0 to … |
| `paths.roadHalf` | number | 0 to … |
| `paths.railHalf` | number | 0 to … |
| `paths.railBroken` | number | 0 to … |
| `paths.streams` | array of number |  |
| `paths.streamHalf` | number | 0 to … |
| `paths.landmarkSpacing` | number | 0 to … |
| `paths.landmarkChance` | number | 0 to … |
| `paths.vergeSpacing` | number | 0 to … |
| `paths.pieceGap` | number | 0 to … |
| `paths.fingerposts` | boolean |  |
| `paths.treesOnBroken` | number | 0 to … |
| `paths.edgeBushes` | number | 0 to … |
| `paths.bushBoost` | number | 0 to … |

## `invites`, `invite`, `leash`, `bond`

The 💌 invite (Ed, issue #87, 2026-10-05), replacing the proximity chat when on: on the ground she shoots spinning 💌s, aimed with the cursor (click fires) or the right stick (a trigger fires), or 1 toward the cursor. A burst is burst volleys burstGap seconds apart, each multiShot letters fanned over spread degrees, then cooldown seconds before the next; letters fly at speed m/s for range metres, turning toward the nearest invitable creature within homingRange metres and homingCone degrees of straight ahead at up to homing degrees a second, and land on one whose body comes within radius metres. Each hit adds amount to its affection; hits: letters to fill it, by level (baby, young, adult); it drains drain of a full meter a second when not being hit. perAnimalHitGap (Ed, 2026-10-05): a creature takes affection from at most one letter every this many seconds; letters landing inside its gap still land (a small pop, used up) but add nothing, so stacked multi-shot buffs help against crowds, not to win one creature faster. Enraged creatures and legends block letters; scenery never stops them (Ed). fireSlow: her ground speed while firing, times this (Ram's Steady buff takes it away). linger (Ed's playtest, 2026-10-06: "invitations should sit on the ground for a little while before they fade away"): a 💌 that met no one rests where it came down this many seconds, fading over the last lingerFade, at most lingerMax at once (drawn only: it's no hit). spin (Ed, 2026-10-06: "the envelopes should spin like a frisbee"): a 💌 in flight lies flat and turns about the upright this many times a second (drawn only); when it lands it stops and lies flat. Data, so legend buffs can change any of it (config/legend-buffs.json). Round 11 (Ed: "base invite should be one envelope at a time (rebalance hits accordingly), they should arc a little and disappear when they hit the ground, go 50% further, 20% faster, and they should rotate by pitching instead of yawing"): one 💌 a shot (burst 1, multiShot 1), cooldown 0.55 (just over the gap, so a held fire never wastes one), hits [4, 9, 18, 36] so a meter fills in about the time it did with bursts of three (they gave one hit each 0.84 s), range 33 (was 22) and speed 31.2 (was 26); arc: the height (m) its lob rises over the straight line from her hand to the ground at its range, where it lands, with a puff (drawn only: the rules fly it flat).

| knob | type | range |
|---|---|---|
| `invites.on` | boolean |  |
| `invites.burst` | number | 0 to … |
| `invites.burstGap` | number | 0 to … |
| `invites.cooldown` | number | 0 to … |
| `invites.range` | number | 0 to … |
| `invites.speed` | number | 0 to … |
| `invites.arc` | number | 0 to … |
| `invites.homing` | number | 0 to … |
| `invites.homingCone` | number | 0 to … |
| `invites.homingRange` | number | 0 to … |
| `invites.multiShot` | number | 0 to … |
| `invites.spread` | number | 0 to … |
| `invites.radius` | number | 0 to … |
| `invites.amount` | number | 0 to … |
| `invites.hits` | array of number |  |
| `invites.drain` | number | 0 to … |
| `invites.perAnimalHitGap` | number | 0 to … |
| `invites.fireSlow` | number | 0 to 1 |
| `invites.linger` | number | 0 to … |
| `invites.lingerFade` | number | 0 to … |
| `invites.lingerMax` | number | 0 to … |
| `invites.spin` | number | 0 to … |
| `invite.talkRange` | number | 0 to … |
| `invite.cancelDistance` | number | 0 to … |
| `invite.snubTime` | number | 0 to … |
| `invite.talkTime` | array of number |  |
| `invite.turn` | array of number |  |
| `invite.decayRate` | number | 0 to … |
| `leash.length` | number | 0 to … |
| `leash.runSpeed` | number | 0 to … |
| `leash.pickRadius` | number | 0 to … |
| `leash.spacing` | number | 0 to … |
| `bond.rim` | boolean |  |
| `bond.sparks` | boolean |  |
| `bond.thread` | boolean |  |
| `bond.sparkEvery` | number | 0 to … |
| `bond.threadArc` | number | 0 to … |
| `bond.threadArcMax` | number | 0 to … |

## `sfx`, `music`

The sound effects, all synthesised in the music's key (2026-10-05): volume over the music's, hear metres (a sound fades to nothing that far from her). voice: the babble (Ed, 2026-10-05: 💌s are her speech, attacks the animals'). witch: each 💌 a syllable in her voice (pitch Hz, range: how far her phrases rise and fall, pace: a syllable's seconds, timbre: her formants over an adult's, phraseGap: a pause this long starts a new phrase); animals: an attack a burst of babble in the creature's own voice (pitch Hz for a normal-sized young, lower by level and size; maxVoices at once, the farthest giving way, duck: how much the others quieten; syllables per burst; gap: a creature speaks at most every gap seconds; reply: a 💌 hit's answering syllable, its volume share). hit: a 💌 landing (a spent one a faint tick); fill: the affection tick, climbing octaves as the meter fills; invited: the flourish (fuller by level); enraged: the growl when one turns (gap: at most one every gap seconds, a crowd turning at once one heavier growl); happy: the pop; snore: a sleeping legend within range metres moaning softly in its dreams (volume); nightmare: its moans when restless (volume); windup: a legend's attack winding up, its whale song swelling for length seconds before it fires; lost: a soundsystem lost, the sting heard anywhere (volume); land: a 💌 that met no one landing on the ground, a soft puff (at most one every gap seconds); stir: the boot-up over, the first wave's countdown begun, things stirring (volume); roar: a legend turning angry, its roar (heard twice as far); lament: a restless legend calling out sadly (Ed, 2026-10-06), its own call lowered (pitch) and slowed (slow) into the legends' space, heard within range metres from the way of its clearing and muffled with distance; a call about every every seconds, down to urgent as its restlessness runs out; at most max restless legends call, the nearest, at least gap seconds apart (volume); shoes: dancers within range metres tapping their party shoes on the beat, at most max at once; pond: by a pond within range metres, water lapping (lap), a frog every frogEvery seconds or so (frogs), a drip every dripEvery (drips); picnic: by a picnic in a partified area within range metres, its party-goers' murmur and cups clinking every clinkEvery seconds or so; room: the creator's room in the treehouse while it's open, its hum, a record's crackle, the timber creaking every creakEvery seconds or so; impact: a lobbed shot landing, a thud (small times volume) or a legend's boom (volume), heard from the lob's landing spot (a legend's twice as far); knock: the witch knocked back (#108), a thump and a whoosh by how far (volume, whoosh), and stunned, a soft dizzy twinkle every twinkleEvery seconds (twinkle); charge: a legend's long charge, its windup's bellow, heavy hoofbeats by its speed, the ground's rumble along its lane, the skid of its braking arc, a lighter trot home, heard within range metres; relic: a relic bottle found (a rare chime), spotted within spot metres on the ground or spotTreetop from the treetops, or reached within reach; meadow: home's ambience (breeze, bees, birds, a bird's song about every birdEvery seconds; its picnic's far murmur, its cups clinking about every clinkEvery seconds (clinks), its balloons squeaking about every squeakEvery (balloons)), in home's circle (the map's homeRadius round the dancefloor) fading out over its last fade metres; ouch: the witch hurt, her cry and a thump (volume; knocked down, her "whoa-oh" at knockdown times that), the music dipped by duck for duckTime seconds (twice that knocked down); whale: the legends' voice (Ed, 2026-10-05: "whale song; deep and slow"): volume, speed (1: moans of 2 to 3 s; 2: twice as fast), depth (Hz of its lowest moan), reverb (how big its space), sleepEvery (seconds between a sleeper's moans, sooner when restless).

| knob | type | range |
|---|---|---|
| `sfx.on` | boolean |  |
| `sfx.volume` | number | 0 to … |
| `sfx.hear` | number | 0 to … |
| `sfx.voice.witch.volume` | number | 0 to … |
| `sfx.voice.witch.pitch` | number | 0 to … |
| `sfx.voice.witch.range` | number | 0 to … |
| `sfx.voice.witch.pace` | number | 0 to … |
| `sfx.voice.witch.timbre` | number | 0 to … |
| `sfx.voice.witch.phraseGap` | number | 0 to … |
| `sfx.voice.animals.volume` | number | 0 to … |
| `sfx.voice.animals.pitch` | number | 0 to … |
| `sfx.voice.animals.maxVoices` | number | 0 to … |
| `sfx.voice.animals.duck` | number | 0 to … |
| `sfx.voice.animals.syllables` | array of number |  |
| `sfx.voice.animals.gap` | number | 0 to … |
| `sfx.voice.animals.reply` | number | 0 to … |
| `sfx.hit.volume` | number | 0 to … |
| `sfx.hit.gap` | number | 0 to … |
| `sfx.fill.volume` | number | 0 to … |
| `sfx.fill.octaves` | number | 0 to … |
| `sfx.invited.volume` | number | 0 to … |
| `sfx.enraged.volume` | number | 0 to … |
| `sfx.enraged.gap` | number | 0 to … |
| `sfx.happy.volume` | number | 0 to … |
| `sfx.happy.gap` | number | 0 to … |
| `sfx.snore.volume` | number | 0 to … |
| `sfx.snore.range` | number | 0 to … |
| `sfx.nightmare.volume` | number | 0 to … |
| `sfx.windup.volume` | number | 0 to … |
| `sfx.windup.length` | number | 0 to … |
| `sfx.lost.volume` | number | 0 to … |
| `sfx.ouch.volume` | number | 0 to … |
| `sfx.ouch.knockdown` | number | 0 to … |
| `sfx.ouch.duck` | number | 0 to … |
| `sfx.ouch.duckTime` | number | 0 to … |
| `sfx.impact.volume` | number | 0 to … |
| `sfx.impact.small` | number | 0 to … |
| `sfx.roar.volume` | number | 0 to … |
| `sfx.lament.volume` | number | 0 to … |
| `sfx.lament.pitch` | number | 0 to … |
| `sfx.lament.slow` | number | 0 to … |
| `sfx.lament.every` | number | 0 to … |
| `sfx.lament.urgent` | number | 0 to … |
| `sfx.lament.range` | number | 0 to … |
| `sfx.lament.gap` | number | 0 to … |
| `sfx.lament.max` | number | 0 to … |
| `sfx.shoes.volume` | number | 0 to … |
| `sfx.shoes.range` | number | 0 to … |
| `sfx.shoes.max` | number | 0 to … |
| `sfx.pond.volume` | number | 0 to … |
| `sfx.pond.lap` | number | 0 to … |
| `sfx.pond.frogs` | number | 0 to … |
| `sfx.pond.frogEvery` | number | 0 to … |
| `sfx.pond.drips` | number | 0 to … |
| `sfx.pond.dripEvery` | number | 0 to … |
| `sfx.pond.range` | number | 0 to … |
| `sfx.picnic.volume` | number | 0 to … |
| `sfx.picnic.murmur` | number | 0 to … |
| `sfx.picnic.clinks` | number | 0 to … |
| `sfx.picnic.clinkEvery` | number | 0 to … |
| `sfx.picnic.range` | number | 0 to … |
| `sfx.room.volume` | number | 0 to … |
| `sfx.room.hum` | number | 0 to … |
| `sfx.room.crackle` | number | 0 to … |
| `sfx.room.creak` | number | 0 to … |
| `sfx.room.creakEvery` | number | 0 to … |
| `sfx.land.volume` | number | 0 to … |
| `sfx.land.gap` | number | 0 to … |
| `sfx.stir.volume` | number | 0 to … |
| `sfx.knock.volume` | number | 0 to … |
| `sfx.knock.whoosh` | number | 0 to … |
| `sfx.knock.twinkle` | number | 0 to … |
| `sfx.knock.twinkleEvery` | number | 0 to … |
| `sfx.charge.volume` | number | 0 to … |
| `sfx.charge.bellow` | number | 0 to … |
| `sfx.charge.hooves` | number | 0 to … |
| `sfx.charge.rumble` | number | 0 to … |
| `sfx.charge.skid` | number | 0 to … |
| `sfx.charge.trot` | number | 0 to … |
| `sfx.charge.range` | number | 0 to … |
| `sfx.relic.volume` | number | 0 to … |
| `sfx.relic.spot` | number | 0 to … |
| `sfx.relic.spotTreetop` | number | 0 to … |
| `sfx.relic.reach` | number | 0 to … |
| `sfx.meadow.volume` | number | 0 to … |
| `sfx.meadow.breeze` | number | 0 to … |
| `sfx.meadow.bees` | number | 0 to … |
| `sfx.meadow.birds` | number | 0 to … |
| `sfx.meadow.birdEvery` | number | 0 to … |
| `sfx.meadow.fade` | number | 0 to … |
| `sfx.meadow.murmur` | number | 0 to … |
| `sfx.meadow.clinks` | number | 0 to … |
| `sfx.meadow.clinkEvery` | number | 0 to … |
| `sfx.meadow.balloons` | number | 0 to … |
| `sfx.meadow.squeakEvery` | number | 0 to … |
| `sfx.whale.volume` | number | 0 to … |
| `sfx.whale.speed` | number | 0 to … |
| `sfx.whale.depth` | number | 0 to … |
| `sfx.whale.reverb` | number | 0 to … |
| `sfx.whale.sleepEvery` | number | 0 to … |
| `music.on` | boolean |  |
| `music.volume` | number | 0 to … |
| `music.nearDist` | number | 0 to … |
| `music.farDist` | number | 0 to … |
| `music.floor` | number | 0 to … |
| `music.muffle` | number | 0 to … |
| `music.audible` | number | 0 to … |
| `music.clear` | number | 0 to … |
| `music.distort` | number | 0 to … |
| `music.src` | string |  |

## `forecast`

Forecasting (Ed, 2026-10-04): the next two waves are confirmed and the one after has a few probable areas. Every such rune stone grows a circle of up to symbols magic symbols round it on the ground, in its area's neon: the next stone has all of them; the after-next stone fills from afterNext[0] to afterNext[1] as the countdown runs; probable stones (probable of them) flicker with 1 to probableMax. They stand radius metres out, each size metres across, appear with a flare (flare seconds) and pulse on the beat; from the treetops the circle shows above the canopy.

| knob | type | range |
|---|---|---|
| `forecast.symbols` | number | 0 to … |
| `forecast.probable` | number | 0 to … |
| `forecast.probableMax` | number | 0 to … |
| `forecast.afterNext` | array of number |  |
| `forecast.radius` | number | 0 to … |
| `forecast.size` | number | 0 to … |
| `forecast.flare` | number | 0 to … |

## `fight`

The fight's scale and speed (Ed's motion scale pass, 2026-10-04: "the animals don't move around enough when attacking and defending"): fights are drawn and played at the ground camera's scale, creatures running at about the witch's speed and their patterns about 50 m across. scale: every length in a fight times this (attack ranges, lunges, area radii, beam widths, knockback, the packs' patterns and spacing, pursuit and guard reach, aggro); speed: every fight speed times this (running, charging, lunging, shots). momentum (Ed, 2026-10-05: "they should have more momentum"): how heavily creatures in a fight change speed and turn: their accelerations, braking and turn rates divided by it (2: twice as heavy). Try ?fightScale= and ?fightSpeed=, or change them live in the debug overlay (~): [ and ] for scale, ; and ' for speed.

| knob | type | range |
|---|---|---|
| `fight.scale` | number | 0 to … |
| `fight.speed` | number | 0 to … |
| `fight.momentum` | number | 0 to … |

## `attackFx`, `combat`

How attacks feel on screen (Ed, 2026-10-06: 'make creature attack visuals better'; render/attackFeel.ts), a party not a fight: windupSquash, how low and wide an attacker crouches as its wind-up nears the blow (at most windupMax seconds of it shown); lungeStretch, how far it stretches out in its lunge; squash, how flat a hit squashes the one it hits, springing back past its shape over squashSecs seconds; a knock-back thrown faster than tumbleKnock m/s tumbles: up tumbleHeight metres (at most 1.5 times that for the hardest) for tumbleSecs, over on its back from turnFrom to turnTo of the way (one slow beat, never a strobe), landing with a squash. Squash and stretch go in whole art pixels. legendFlash: how much bigger and longer a legend's blow flashes than anyone's (its flash 1 + 2 × legendFlash times; 0.5, twice: Ed's decisions panel, config/decisions.json).

| knob | type | range |
|---|---|---|
| `attackFx.windupSquash` | number | 0 to … |
| `attackFx.windupMax` | number | 0 to … |
| `attackFx.lungeStretch` | number | 0 to … |
| `attackFx.squash` | number | 0 to … |
| `attackFx.squashSecs` | number | 0 to … |
| `attackFx.tumbleKnock` | number | 0 to … |
| `attackFx.tumbleHeight` | number | 0 to … |
| `attackFx.tumbleSecs` | number | 0 to … |
| `attackFx.turnFrom` | number | 0 to … |
| `attackFx.turnTo` | number | 0 to … |
| `attackFx.legendFlash` | number | 0 to 1 |
| `combat.aggro` | number | 0 to … |
| `combat.witchLose` | number | 0 to … |
| `combat.leaveArea` | number | 0 to … |
| `combat.engage` | number | 0 to … |
| `combat.pursuit` | number | 0 to … |
| `combat.pursuitRun` | number | 0 to … |
| `combat.fightRun` | number | 0 to … |
| `combat.legendRun` | number | 0 to … |
| `combat.reaction` | number | 0 to … |
| `combat.chaseMult` | number | 0 to … |
| `combat.partyChaseMult` | number | 0 to … |
| `combat.marchMult` | number | 0 to … |
| `combat.fleeMult` | number | 0 to … |
| `combat.soundsystemHealth` | number | 0 to … |
| `combat.soundsystemRadius` | number | 0 to … |
| `combat.homeHealth` | number | 0 to … |
| `combat.homeRadius` | number | 0 to … |
| `combat.shake` | number | 0 to … |

## `notice`

Creatures notice the witch on the ground within radius metres (Ed's playtest: a larger responsive area makes them feel alive): resting ones turn to look at her; babies of a curious kind come up to about curious metres from her, skittish ones keep about skittish metres off (config/combat.json temperament).

| knob | type | range |
|---|---|---|
| `notice.radius` | number | 0 to … |
| `notice.curious` | number | 0 to … |
| `notice.skittish` | number | 0 to … |

## `guard`

Parked party animals (at a sigil on the ground) guard it (Ed, 2026-10-04): they take on any wild creature of another kind within radius metres of the sigil, and come back to it.

| knob | type | range |
|---|---|---|
| `guard.radius` | number | 0 to … |

## `witchHealth`

The witch (Ed, 2026-10-04): she takes hits (one point each, whatever hits her) before she's knocked out; one comes back every repairTime seconds, the timer starting over whenever she's hit, so to heal she has to get right out of the fight. grace: seconds after a hit in which no other blow lands, so a pack striking together takes one hit, not all three (balance, 2026-10-06: DECISION FOR ED, 0.5).

| knob | type | range |
|---|---|---|
| `witchHealth.hits` | number | 0 to … |
| `witchHealth.repairTime` | number | 0 to … |
| `witchHealth.grace` | number | 0 to … |

## `knockout`

Knocked out (Ed, 2026-10-04): she collapses where she is; her sigil stack lets go from the bottom up, one every releaseEach seconds (releaseMax caps the whole release, 0 no cap; an empty stack waits emptyBeat seconds), each creature turning neutral as its sigil goes and walking to the nearest area of its own kind, where it turns wild again; then she sparkles out and in at the treehouse over teleport seconds. Creatures at sigils on the ground stay hers. legendsLoyal: leashed legends stay with her (false: they go back to the wild too: 'they're too old for this').

| knob | type | range |
|---|---|---|
| `knockout.releaseEach` | number | 0 to … |
| `knockout.releaseMax` | number | 0 to … |
| `knockout.emptyBeat` | number | 0 to … |
| `knockout.teleport` | number | 0 to … |
| `knockout.legendsLoyal` | boolean |  |

## `dash`, `spells`

The dash, a blink (Ed, 2026-10-04, 2026-10-05; right click or Space, gamepad A, touch 'dash'): on the ground only, she vanishes and reappears distance metres the way she's steering (or flying, or facing) in one step, then cooldown seconds before the next. buffer: a press up to this many seconds before she can blink (still recharging, landing, staggered) waits and blinks the moment she can. For gone seconds (a few frames) she isn't drawn and can't be hit; otherwise she's as hittable as ever: it's for slipping out of a shot's path. She lands clear of trees, rocks and ruins, soundsystems, the dancefloor's speakers and the treehouse by clear's metres each, the blink shortened to the furthest clear spot.

| knob | type | range |
|---|---|---|
| `dash.distance` | number | 0 to … |
| `dash.gone` | number | 0 to … |
| `dash.cooldown` | number | 0 to … |
| `dash.buffer` | number | 0 to … |
| `dash.clear.tree` | number | 0 to … |
| `dash.clear.decor` | number | 0 to … |
| `dash.clear.sound` | number | 0 to … |
| `dash.clear.speaker` | number | 0 to … |
| `dash.clear.treehouse` | number | 0 to … |
| `spells.equipped` | string |  |
| `spells.speed.mult` | number | 0 to … |
| `spells.speed.duration` | number | 0 to … |
| `spells.speed.cooldown` | number | 0 to … |

## `trail`

Her flight trail (Ed, 2026-10-06: "more like a fading-out glow, similar to the leylines. Its length relates to her speed: 5 m on the ground and 20 m on the treetops. The glow should be the same as the current area colour"): a ribbon of glow along her path, fading to nothing at its tail, in the colour of the area she's over (eased over colourEase seconds as she crosses into the next). Its length: ground metres at full speed on the ground, treetops metres over the treetops, from none below from (a share of her top speed) to full at top speed along curve (1 straight), growing to a new speed's over grow seconds and shrinking over shrink. width: metres across on the ground and over the treetops; bright: its brightness; fade: how it fades along its length (eased out: bright for its first stretch, then thinning to nothing; higher keeps it bright longer), its width tapering with it. sparks: the broom's little amber sparks as well. ?trail=0 hides it.

| knob | type | range |
|---|---|---|
| `trail.on` | boolean |  |
| `trail.ground` | number | 0 to … |
| `trail.treetops` | number | 0 to … |
| `trail.from` | number | 0 to … |
| `trail.curve` | number | 0 to … |
| `trail.width` | array of number |  |
| `trail.bright` | number | 0 to … |
| `trail.fade` | number | 0 to … |
| `trail.grow` | number | 0 to … |
| `trail.shrink` | number | 0 to … |
| `trail.colourEase` | number | 0 to … |
| `trail.sparks` | boolean |  |

## `boot`

At the start the home speaker ring boots up (Ed, 2026-10-04): its speakers power on one by one over time seconds, and only then does the first wave's countdown begin: extra time to find and invite your first creatures. Five minutes, counted from her first step off the decks (Ed, 2026-10-05: 'the game is hard! ... a boot up period of 5 minutes'): no wave and no growth till then.

| knob | type | range |
|---|---|---|
| `boot.time` | number | 0 to … |

## `party`

lossPenalty (Ed, 2026-10-05): a soundsystem destroyed brings the next wave that many seconds sooner (at once if less is left), each loss stacking; the gap after it is the interval as ever. motes: sparse glowing motes over every partified area, perPatch per 20 x 20 m, rising from from to to metres (under the crowns to above them) at about speed m/s. uplight: crowns in partified areas catch a faint glow from below in the area's colour (strength at its brightest, pulse on the beat, fading over edge metres toward the border). The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).

| knob | type | range |
|---|---|---|
| `party.motes.perPatch` | number | 0 to … |
| `party.motes.from` | number | 0 to … |
| `party.motes.to` | number | 0 to … |
| `party.motes.speed` | number | 0 to … |
| `party.uplight.strength` | number | 0 to … |
| `party.uplight.pulse` | number | 0 to … |
| `party.uplight.edge` | number | 0 to … |
| `party.interval` | number | 0 to … |
| `party.lossPenalty` | number | 0 to … |
| `party.startDelay` | number | 0 to … |
| `party.areasPerWave` | number | 0 to … |
| `party.maxPerWave` | number | 0 to … |
| `party.picker` | string |  |
| `party.noisy.wobble` | number | 0 to … |
| `party.noisy.lobeSize` | number | 0 to … |
| `party.noisy.candidates` | number | 0 to … |
| `party.noisy.spreadFromLast` | boolean |  |
| `party.transition` | number | 0 to … |
| `party.lightReach` | number | 0 to … |
| `party.lightStrength` | number | 0 to … |

## `stringLights`

Colourful string lights in every partified area, as long garlands: runsPerArea runs (a range), each spansPerRun spans (a range) from tree to tree, every next tree inside a forward cone of coneAngle degrees either side, so a run sweeps across rather than zig-zagging; runs start at least spread metres apart. Each span is spanMin to spanMax metres. No span crosses another and each tree holds at most two ends, except junction trees (junctionChance per tree on a run) where a branch leaves, so three meet. At height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres in the palette's colours (areaNeon: warm white, the palette's first, two bulbs in three and the area's own neon the third, home's cyan; the art director, round 2: one neon an area plus the warm light), twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light.

| knob | type | range |
|---|---|---|
| `stringLights.on` | boolean |  |
| `stringLights.runsPerArea` | array of number |  |
| `stringLights.spansPerRun` | array of number |  |
| `stringLights.coneAngle` | number | 0 to … |
| `stringLights.junctionChance` | number | 0 to … |
| `stringLights.spanMin` | number | 0 to … |
| `stringLights.spanMax` | number | 0 to … |
| `stringLights.spread` | number | 0 to … |
| `stringLights.height` | number | 0 to … |
| `stringLights.sag` | number | 0 to … |
| `stringLights.bulbSpacing` | number | 0 to … |
| `stringLights.palette` | array of string |  |
| `stringLights.areaNeon` | boolean |  |
| `stringLights.twinkle` | number | 0 to … |
| `stringLights.chaseSpeed` | number | 0 to … |

## `waveNumbers`, `dancefloor`

Wave numbers over the rune stones (Ed, 2026-10-04: "for design purposes, let's just put a big glowing number above the stones"): each stone shows the wave that will wake it, in its area's neon, over the canopy and clouds from the treetops and above the stone on the ground; on turns them off; size: a digit's height as a share of the screen's; lift: metres above the stone (or the treetops); spent: how bright the number stays once the party has reached the area (0 hides it). On the ground, a number whose stone is within pinRange metres is held inside the top of the screen when it would be above it.

| knob | type | range |
|---|---|---|
| `waveNumbers.on` | boolean |  |
| `waveNumbers.size` | number | 0 to … |
| `waveNumbers.lift` | number | 0 to … |
| `waveNumbers.spent` | number | 0 to … |
| `waveNumbers.pinRange` | number | 0 to … |
| `dancefloor.motes.count` | number | 0 to … |
| `dancefloor.motes.rise` | number | 0 to … |
| `dancefloor.motes.speed` | number | 0 to … |
| `dancefloor.motes.column` | number | 0 to … |
| `dancefloor.radius` | number | 0 to … |
| `dancefloor.clearing` | number | 0 to … |
| `dancefloor.speakers.count` | number | 0 to … |
| `dancefloor.speakers.start` | number | 0 to … |
| `dancefloor.speakers.radiusFactor` | number | 0 to … |
| `dancefloor.speakers.footprint` | number | 0 to … |
| `dancefloor.paving.on` | boolean |  |
| `dancefloor.paving.beyond` | number | 0 to … |
| `dancefloor.paving.course` | number | 0 to … |
| `dancefloor.paving.stone` | number | 0 to … |
| `dancefloor.paving.ragged` | number | 0 to … |
| `dancefloor.paving.missing` | number | 0 to … |
| `dancefloor.paving.moss` | number | 0 to … |
| `dancefloor.levels` | array of number |  |
| `dancefloor.tiles.witchLift` | number | 0 to … |
| `dancefloor.tiles.witchColour` | string |  |
| `dancefloor.tiles.rippleTime` | number | 0 to … |
| `dancefloor.tiles.trailTime` | number | 0 to … |
| `dancefloor.tiles.eventTime` | number | 0 to … |
| `dancefloor.tiles.lowLevelShare` | number | 0 to … |
| `dancefloor.circleHue` | number | 0 to … |
| `dancefloor.circleHue2` | number | 0 to … |
| `dancefloor.pulse` | number | 0 to … |
| `dancefloor.runeSpeed` | number | 0 to … |
| `dancefloor.lightReach` | number | 0 to … |
| `dancefloor.lightStrength` | number | 0 to … |
| `dancefloor.discoHeight` | number | 0 to … |
| `dancefloor.discoSize` | number | 0 to … |
| `dancefloor.spin` | number | 0 to … |
| `dancefloor.specks` | number | 0 to … |
| `dancefloor.speckBrightness` | number | 0 to … |
| `dancefloor.speckReach` | number | 0 to … |

## `canopyCutout`

In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a hole round her is cut out, screenFraction of the screen's width across, its edge edge of the width wide. Each tree has its own radius for it, up to a fifth nearer or further (Ed, round 7: "the crown-hiding circle still has a very sharp edge"), so no line runs across the canopy, and the edge fades over a wide band. Rising closes the hole.

| knob | type | range |
|---|---|---|
| `canopyCutout.screenFraction` | number | 0 to … |
| `canopyCutout.edge` | number | 0 to … |

## `find`, `tone`, `bloom`, `tiltShift`

Finding wild creatures in the dark (Ed, v244: 'quite hard to see in the forest... I don't want to go overboard'), all off with ?find=0 to compare: eyeshine, their eyes catching the light in pale gold (strength over their own colour, out to range metres from her, blinking about blink of the time; woken creatures' red eyes stay red); lightFloor, never darker than that share of their unlit look; rim, a faint rim from her glow on the edge facing her; and in place of tone.ambient, ambient, with a cooler, more coloured moon (moonHue, moonSat).

| knob | type | range |
|---|---|---|
| `find.on` | boolean |  |
| `find.eyeshine.range` | number | 0 to … |
| `find.eyeshine.strength` | number | 0 to … |
| `find.eyeshine.blink` | number | 0 to … |
| `find.lightFloor` | number | 0 to … |
| `find.rim` | number | 0 to … |
| `find.ambient` | number | 0 to … |
| `find.moonHue` | number | 0 to … |
| `find.moonSat` | number | 0 to … |
| `tone.black` | number | 0 to … |
| `tone.gamma` | number | 0 to … |
| `tone.ambient` | number | 0 to … |
| `tone.moon` | number | 0 to … |
| `bloom.on` | boolean |  |
| `bloom.strength` | number | 0 to … |
| `bloom.threshold` | number | 0 to … |
| `tiltShift.on` | boolean |  |
| `tiltShift.where` | string | "before" / "after" |
| `tiltShift.sky` | boolean |  |
| `tiltShift.strength` | number | 0 to … |
| `tiltShift.band` | number | 0 to … |
| `tiltShift.centre` | number | 0 to … |
| `tiltShift.treetop.strength` | number | 0 to … |
| `tiltShift.treetop.band` | number | 0 to … |

## `population`

Wild creatures (Ed, 2026-10-04): every area starts with the same population, population.start (one baby and one young: Ed, 2026-10-05, 'actually, the game should start with one baby and one youth, otherwise you can't avoid enraging lots of legends', after 'the game is hard! we should start each area with just one baby'; before it, one young and one adult, and before that one baby and two adults), and while it stays wild it grows: every wave, each area the party hasn't reached gains growth.perWave more (a fraction carries over: 0.5 is one every other wave; balance, 2026-10-06, DECISION FOR ED: 0.5, from 1, so a player's defence can hold the early sieges and playing well matters), each at a random level by growth.weights (baby, young, adult: equal thirds), so the areas the party reaches late are the ones to fear. Areas already partified don't grow. New ones arrive out of the witch's sight (beyond the haze's far edge plus growth.hide metres), never popping in on screen; areas far from every witch keep them as counts only, made real (from the seed) when a witch comes within creatureSimRadius of the area or it wakes. The home area holds none. Fighting value (DESIGN.md, Balance): a young is worth 15.5, an adult 29, a legend 76; so an area woken at wave n brings about 1 + n/3 young and 1 + n/3 adults (F about 44.5 + 14.8 n), besides its legend (wildLegends). Only creatures whose home is within creatureSimRadius metres of the witch move. node tools/balance/sim.mjs forecasts the sieges these numbers make.

| knob | type | range |
|---|---|---|
| `population.start.babies` | number | 0 to … |
| `population.start.young` | number | 0 to … |
| `population.start.adults` | number | 0 to … |
| `population.growth.on` | boolean |  |
| `population.growth.perWave` | number | 0 to … |
| `population.growth.weights` | array of number |  |
| `population.growth.hide` | number | 0 to … |

## `dreams`

A sleeping legend's dream (or nightmare) bubble, and its pointer to the nearest runestone of the area type it dreams of (Ed, 2026-10-05): shown only while she's on the ground within range metres of the legend (about its area's clearing and a little more); never from the treetops. nightmare: a restless legend's one face (Ed, 2026-10-05), slightly sad to angry: faces[k] from restlessness at[k] on. sleepy (Ed, 2026-10-06): while it sleeps giving its quest (its dream open, no nightmare), its face beside the sigil: mostly face (😴), and now and then, for one turn of every seconds, one of faces instead; each turn its own throw per legend (seeded by its id, so legends never change together), face with chance weight. A face the browser can't draw (🫠 and 😮‍💨 are new) shows as fallback.

| knob | type | range |
|---|---|---|
| `dreams.range` | number | 0 to … |
| `dreams.nightmare.at` | array of number |  |
| `dreams.nightmare.faces` | array of string |  |
| `dreams.sleepy.face` | string |  |
| `dreams.sleepy.weight` | number | 0 to … |
| `dreams.sleepy.every` | number | 0 to … |
| `dreams.sleepy.faces` | array of string |  |
| `dreams.sleepy.fallback` | string |  |

## `wildLegends`, `creatureSimRadius`

Area legends (Ed, 2026-10-04; DESIGN.md, "Sleeping legends"): every area has one legend of its kind, sleeping, sunk into the ground like scenery (no AI, no glow, no health bar; sink: the share of it under the ground, moss: how far its colours go toward moss). When its area's wave comes it wakes, angry: wake seconds of heaving out of the ground (untouchable), then a mini-boss guarding its own area with its move set (movement.json legends). Beaten, it sinks back to sleep for good. A happy legend (home's from the start; others by their quest, or the debug key O) guards its area for her like a parked party animal, anything in its area within guard metres of where it stands, with its move set, and heals heal hp a second while no enemy is near; beaten, it sleeps for good and its buff ends. Drawn scale times a legend's size, swelling by breathe as it breathes (once every breathEvery seconds); awake, an aura on the ground aura metres across and, from the treetops, a glow over the canopy (glow its strength) in a dark mix of its sigil's colour.

| knob | type | range |
|---|---|---|
| `wildLegends.wake` | number | 0 to … |
| `wildLegends.sink` | number | 0 to … |
| `wildLegends.moss` | number | 0 to … |
| `wildLegends.guard` | number | 0 to … |
| `wildLegends.heal` | number | 0 to … |
| `wildLegends.scale` | number | 0 to … |
| `wildLegends.breathe` | number | 0 to … |
| `wildLegends.breathEvery` | number | 0 to … |
| `wildLegends.aura` | number | 0 to … |
| `wildLegends.glow` | number | 0 to … |
| `creatureSimRadius` | number | 0 to … |

## `simLod`, `creatureSpeed`

The simulation's level of detail (Ed, 2026-10-05: creatures far from the action frozen until she comes closer; rules/simLod.ts). Wild creatures roaming are simulated every step within full.ground metres of the witch on the ground, full.treetop over the treetops (each a little past the most the view shows from there at any zoom: 178 and 262 m in a 1900 by 1240 window); beyond, coarsely: once every `every` steps (60 a second), by that many steps' time at once, taking turns; past creatureSimRadius not at all. Besiegers marching on a soundsystem are simulated every step within full of her or within action metres of a soundsystem, a party animal or a happy legend's guard; elsewhere coarsely, marching `every` steps at a time. Going out, one stays in full until band metres past the line, so none flickers. The debug overlay's sim line counts them.

| knob | type | range |
|---|---|---|
| `simLod.full.ground` | number | 0 to … |
| `simLod.full.treetop` | number | 0 to … |
| `simLod.action` | number | 0 to … |
| `simLod.band` | number | 0 to … |
| `simLod.every` | number | 0 to … |
| `creatureSpeed` | number | 0 to … |

## `setPieceChance`, `setPieceScale`, `setPieceClear`

setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects are laid out as features (see walls); they do not block movement.

| knob | type | range |
|---|---|---|
| `setPieceChance` | number | 0 to … |
| `setPieceScale` | number | 0 to … |
| `setPieceClear` | number | 0 to … |

## `setPieceFootprint`, `soundsystemFootprint`, `reserveMargin`, `treeMarginFromSoundsystem`, `legendSpeed`

Gameplay is placed first, then scenery keeps clear of it: a set piece's footprint (setPieceFootprint metres round its middle, times setPieceScale) stays reserveMargin metres clear of every soundsystem's spot (soundsystemFootprint metres round it, reserved from the start) and of the dancefloor's clearing; a set piece with no room left is left out. Trees keep treeMarginFromSoundsystem metres from a soundsystem's footprint.

| knob | type | range |
|---|---|---|
| `setPieceFootprint` | number | 0 to … |
| `soundsystemFootprint` | number | 0 to … |
| `reserveMargin` | number | 0 to … |
| `treeMarginFromSoundsystem` | number | 0 to … |
| `legendSpeed` | number | 0 to … |

## `creatureSpeeds`

Ed (2026-10-04): the witch is much faster than almost all creatures (she flies at 19 m/s on the ground, 32 over the treetops). Wild creatures amble at creatureSpeed m/s (legends legendSpeed); leashed ones run after their leash point at leash.runSpeed. The fast few (fast: hare, stoat, marten; rare, and weaker when combat comes) move fastMult times the usual; legends run at legend times it: very slow.

| knob | type | range |
|---|---|---|
| `creatureSpeeds.fast` | array of string |  |
| `creatureSpeeds.fastMult` | number | 0 to … |
| `creatureSpeeds.legend` | number | 0 to … |
