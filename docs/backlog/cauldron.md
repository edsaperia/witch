# The cauldron and mushroom trips

Design catalogue (Ed, 2026-10-09 onward). Ed authorised implementation on 2026-10-31: collection, kitchen storage, brewing and the shared trip lifecycle are being built, with cheap rendering effects first. The [developer recipe book](potion-recipes.md) records fixed assignments and which effects are implemented. This catalogue also contains unbuilt proposals. Earlier journey distribution and tutorial notes are in [journey.md](journey.md); the latest decisions below take precedence.

## Mushrooms

### Latest design decisions — 2026-10-31

These decisions supersede conflicting collection, kitchen and trip-recipient details below and the earlier home-growing distribution in journey.md. They govern the always-on nine-colour mushroom kitchen, including late entrants during smoke and 600 game seconds from waking. The PR #1472 six-kind slice, fixed-at-brew recipient group and its earlier duration remain historical context, not the authority for this flow. Implementation is tracked by the developer recipe book and the kitchen notes.

- Nine mushroom types, using the reviewed generator. One mushroom per area except the home area, in a quiet reachable spot where the forest is thicker; matches the area's biome 90% of the time. Picked mushrooms return the next night.
- Press the **place key** near a mushroom to collect it; it vanishes in a puff. Walking over it does not collect it.
- **Latest proposal:** collected mushrooms remain with the witch invisibly until she enters the kitchen, then **arc from her to their respective baskets, two per second**. Ed suggested this after the instant-transfer design; it replaces that proposed transfer timing.
- Nine wicker baskets, subtly varying in height, width, colour and slouch, form a half-ring around the bottom of the kitchen. Left to right: **blue, purple, pink, red, orange, yellow, green, turquoise, white**.
- Basket appearance counts: **empty 0; half 1–5; full 6–15; overflowing 16+**.
- The nearby selected basket highlights. Press **E** to send one mushroom in an arc from that basket into the cauldron, landing with a **plop**.
- Cauldron about **10 m across**. Empty means no liquid and no fire. First ingredient starts the fire, fills it with liquid and makes it glow that mushroom's colour. Second ingredient makes it alternate between the two colours, with rising motes/bubbling.
- Third ingredient immediately fills the kitchen with colourful smoke, obscuring the witches. **Everyone who enters the potion smoke** is affected, including arrivals while the smoke persists. Their vision fades to black; a few seconds later they wake on the grass beneath the kitchen with the potion active. Once the smoke clears, the cauldron is empty again.
- A new potion **replaces** the existing trip; effects do not stack.
- Basket stock and carried mushrooms persist across nights and voyages. **Unlock everything** fills every basket with at least 20 mushrooms.
- During development, the blackout shows the recipe's effect name and description, plus **Coming soon** if it is unimplemented. This is not a permanent in-game recipe book. Fixed recipe assignments live in [potion-recipes.md](potion-recipes.md).
- Effects start at full strength on waking and fade gradually over the final **two game minutes** of their ten-minute duration.
- Potion effects last **10 minutes on the game clock**, starting when the witch wakes with the potion active (Ed, 2026-10-31). This supersedes the older 1–2 minute duration and individual duration suggestions below; use game time, including its pauses and slowdowns, rather than wall-clock time.
- **Visible brewing choreography** (Ed, 2026-10-31): when the third mushroom is added, witches in the kitchen spin until all the smoke has cleared. To anyone not taking the potion, affected witches visibly fall off the branch and land on the ground beneath in the **stargazing position**. On waking, they remain in the stargazing position for a few seconds before they can move. The participant's fade-to-black hides the fall, while outside observers see it; use the existing stargazing pose for landing and recovery.

### Earlier design (superseded where noted above)

- **Initially six kinds of mushroom** (Ed), in various shapes and colours. Every ingredient is a mushroom. Ed, 2026-10-30: more kinds can be added to support hundreds of effects; six kinds and 56 recipes are not a cap. Additional kinds and their distribution are not assigned yet.
- She **picks them up by walking over them**, into a **hidden bag**: not in her stack, not shown in the UI.
- **Unlimited bag; nothing is lost on knockout** (Ed, 2026-10-30, cauldron builder chat: "bag capacity is unlimited, nothing is lost on knockout").
- Where they grow: two temperate kinds at home from the start, one kind per biome direction on phase-3-and-beyond islands; a kind found once grows at home from then on (journey.md).
- After the party's over she can still collect mushrooms and brew, so players explore trips without time pressure.

## The kitchen (earlier design; latest decisions above take precedence)

- She enters from the bottom. **A big cauldron at the top**, **six baskets in a row round its base**, one kind each.
- Coming in with a full bag, her mushrooms **jump out of her into their baskets**.
- Near a basket, it **lights up and trembles**; **E throws one in**.
- **Partial ingredients stay in the pot** when she leaves; she can return and finish it (Ed, 2026-10-30, coordinator ruling on PR #1472).
- **Co-op has shared baskets and one shared pot in the host's treehouse** (Ed, 2026-10-30, coordinator ruling on PR #1472). **Everyone standing in the kitchen when the shared brew completes takes the trip together; witches elsewhere stay normal** (Ed, 2026-10-30, subsequent coordinator ruling on PR #1472).
- The group is **fixed at the instant the third ingredient goes in**; that same group exits after one second of smoke. Entering or leaving during the smoke changes nothing (coordinator detail ruling, 2026-10-30, PR #1472 comment6512476115).
- **Three in = a brew, at once** (no use button, no bottle): the cauldron bubbles, colourful bubbles pour out, the room fills with smoke, and a second later she staggers outside and the world is... different.
- The kitchen travels with the Ent, so brewing works on any island. Rooms visited during the party slow time and add their own music (journey.md).

## Trips

- **Brews are trips** (Ed): temporary, can be powerful, with strong side effects: weird visuals, odd controls. Many do nothing useful or are just silly. **Not every trip needs an upside** (Ed).
- The effect **fades in over a few seconds and lasts about 1 to 2 minutes**.
- Trips affect **only her** (what she sees, hears and how she moves), **never the world's rules** or creatures' behaviour.
- **Recipes are the same in every run** (players learn and share them); the game never tells, and keeps **no recipe book**.
- **Order doesn't matter; repeats are allowed** (Ed): 6 kinds make **56 recipes** (20 all different, 30 a pair plus one, 6 triples). With three ingredients, N kinds give N(N+1)(N+2)/6 recipes: 7 gives 84, 8 gives 120, 9 gives 165, 10 gives 220, 12 gives 364. More mushrooms also require expanding the kitchen baskets and journey distribution; this catalogue does not silently assign those changes.
- **Every combination is its own effect, unrelated to its parts** (Ed): mushroom colour or shape doesn't hint at the result.
- **The one-frame rule** (Ed): a single frame must show the game is doing something weird *on purpose*. The earlier proposed **trip frame** (a shimmering coloured edge that shrinks as it wears off) is superseded by the wobbly-edge ruling below.
- **First slice: Mirror Floor (BBB)** (Ed, 2026-10-30, coordinator ruling on PR #1472). The cue for the trip's length is **"slight wobbly edges to the screen"**, not the proposed coloured frame.
- **Build from what's there** (Ed): as many as possible from shaders and parameters already in the game; avoid new systems that bring bugs; take inspiration from bugs found while making the game.
- Considered and dropped: creature sigils as ingredients, potion bottles, and ingredients with hidden traits.

## Original 56 trips

Agreed one by one with Ed (2026-10-09). Not yet assigned to recipes, apart from the four tutorial ones (journey.md: AAA Superhot, AAB Orbit, ABB Drift, BBB Mirror Floor). Bullet Time needs a biome mushroom (too strong for the home pair).

1. **Bullet Time:** the world at 1/3 speed, desaturated except her and threats (hot pink), tracers, music pitched down. She keeps full speed. Wears off with a jolt and a few seconds of sluggishness. About 45 s.
2. **Moon Boots** (Ed): rising becomes a big parabolic jump in her facing direction, no air control; she lands where the arc ends. Camera pulls back; boing and a dust ring; maybe a landing knockback.
3. **Echo:** three neon copies trail a second behind; wild creatures sometimes strike an echo; her 💌s echo as weak copies; hard to find her real self. About 90 s.
4. **The Fear:** screen edges darken, shadows flicker into creatures, wild animals look twice the size, music drops to heartbeat and drone, phantom footsteps, fake attack telegraphs indistinguishable from real ones. No upside. About 60 s.
5. **Alone** (Ed): the forest is suddenly empty: no creatures, no witches, no music, just wind. **The world is paused** (Ed), the ley line paused and hidden; she can wander and pick mushrooms. Then everyone fades back in like ghosts.
6. **Walking Wood** (Ed): the trees move around as if they can walk.
7. **Skylight** (Ed): the sky and starfield show through the bend.
8. **Brass Band** (Ed): every instrument in the music becomes a trumpet.
9. **Big Moon** (Ed): the moon is big. Really big.
10. **Ravine** (Ed): the bend inverted: the world curves up around her, as if at the bottom of a ravine.
11. **Chunky** (Ed): much bigger pixels.
    Implemented as recipe #11 (blue + purple + pink): reuses the scene's low-resolution render targets and nearest-neighbour display. Default four times the normal pixel size; Potion lab exposes 1–12×. The final two minutes step back toward the original grid in whole display pixels; menus remain readable. No change to saved pixel settings or telescope resolution preferences.
12. **Superhot** (Ed): time only moves forward when she's moving (the wave countdown still creeps while she stands still).
13. **Orbit** (Ed): the treetops three times higher; the camera close to her; looking down on the forest as if from space.
14. **Mirror Forest** (Ed): every creature looks like her.
15. **Skinny Dip** (Ed): every witch at the party is naked. Cheeky, not explicit: hats and boots only, sparkles where needed.
16. **Pride** (Ed): she gets the party rainbow trail.
17. **Earsight** (Ed): only things that make sound are visible.
18. **Roadworks** (Ed): the forest is covered in large traffic cones that shrink until they vanish.
19. **Mirrorball** (Ed): the disco ball is huge.
20. **Drift** (Ed): the movement controls slowly rotate, with a dizzy look (gentle screen sway, swirling edges, colour smear).
21. **Blinker** (Ed): moving on the ground is all blinks, with no blink cooldown.
22. **Inverse Perspective** (Ed): creatures look bigger the further away they are; up close they all but vanish. Sigils as normal.
23. **Drum Solo** (Ed): the music is just a drum solo.
24. **Watched** (Ed): every legend on the map stands and stares at her.
25. **Giant Trees** (Ed): the trees are three times taller.
26. **Night Vision** (Ed).
27. **Flask Finder** (Ed): flasks are easier to find.
28. **Left Hook** (Ed): unlimited dodges, but they always veer left.
29. **Tall Tales** (Ed): every animal looks very tall.
30. **Thick Canopy** (Ed): the canopy see-through effect is off, so the ground can't be seen.
31. **The Whole Route** (Ed): the entire route is shown. (Also the Route-seer hat's power, built in #942; a trip may want something else.)
32. **Dreamseer** (Ed): the area a legend's dream points to is easier to see.
33. **Paper Theatre:** everything becomes flat, wobbling cardboard cutouts.
34. **Woodcut:** black-and-white engraving, crosshatched shadows.
35. **Kaleidoscope:** the screen mirrored into six slices round her.
36. **Breathing:** ground, trees and rocks swell and shrink with the bpm.
37. **Daybreak:** the sun rises; a bright, ordinary green forest.
38. **Snow Globe:** heavy snow, muffled sound, glass-curved screen edges.
39. **Tiny Witch:** quarter size, smaller hitbox, camera at her level.
40. **Giant Witch:** enormous; nothing else changes.
41. **Featherweight:** sigils weigh nothing, but she floats and can't stop dead on the ground.
42. **Foresight:** attack telegraphs twice as early, in garish colours.
43. **Chipmunks:** every sound at double pitch.
44. **Loop the Loop** (Ed): rising does a loop-the-loop instead.
45. **Worm's Eye** (Ed): the camera drops very low, almost level with the ground.
    Implemented as recipe #45 (blue + white + white), reusing camera angle and distance. Default 3° and 0.4× distance; both exposed in Potion lab. Telescope and voyage cameras retain control. The normal view returns through the final two-minute fade or immediately on Stop/replacement; saved camera tuning is unchanged.
46. **Cartoon:** thick outlines, flat colours, a pictorial pow burst on hits.
47. **Underwater:** water wobble, muffled bubbly sound, floaty movement. **Only if executed really well** (Ed): bubbles rising from animals breathing, and so on.
48. **Moonwalk:** she always faces backwards; 💌s still fly forward.
49. **Hiccups:** a tiny involuntary blink every few seconds.
50. **Stopmotion:** the world at 6 fps; she runs smoothly.
51. **Fireflies:** everything moving leaves glowing dots hanging in the air.
52. **Heat Vision:** thermal; creatures glow by danger, trees cold blue.
53. **Fisheye:** extreme wide angle; she sees further, everything bends.
54. **Synaesthesia:** colours pulse with the music, one colour per instrument, floods on the kick.
55. **Mirror Floor** (Ed): the floor is a mirror: every sprite drawn again upside down beneath its feet, the ground dark and glossy (the same trick as the bedroom mirror). Fills Afterparty's slot.
56. **Silent Film** (Ed): film grain and scratches, sepia, the world as a silent film.

**Cut:**

- **Gossip** (animals' speech bubbles): cut (Ed): no text in the game except where gameplay needs explaining.
- **Clean Slate:** cut (Ed): no fun if it's your first brew.
- **Afterparty** (she sees the peaceful afterparty while the real party carries on): cut, as it reads as confusing (breaks the one-frame rule). Mirror Floor took its slot.

**At risk under the one-frame rule** (too subtle without a trip frame): Daybreak, Thick Canopy, Flask Finder, Dreamseer, Watched, Night Vision.

## Build cost (rough first sort, proposed)

- **Cheap: numbers already in the game** (time scale, camera, sizes, bend, pixel scale, cooldowns, weights): Bullet Time, Superhot, Orbit, Ravine, Chunky, Big Moon, Mirrorball, Giant Trees, Tall Tales, Tiny Witch, Giant Witch, Worm's Eye, Fisheye, Drift, Blinker, Left Hook, Hiccups, Moonwalk, Featherweight, Foresight, Chipmunks, Thick Canopy, Pride, Inverse Perspective, Stopmotion, Skylight.
- **One filter** (a single screen or colour pass): Woodcut, Silent Film, Heat Vision, Night Vision, Kaleidoscope, Cartoon, Synaesthesia, Snow Globe, Mirror Floor, Fireflies, Echo.
- **New systems** (new art, music or behaviour): Moon Boots, Loop the Loop, Alone, Walking Wood, Brass Band, Drum Solo, Mirror Forest, Skinny Dip, Earsight, Roadworks, Watched, The Whole Route, Dreamseer, Flask Finder, Paper Theatre, Breathing, Daybreak, Underwater, The Fear.

## Renderer-native ideas

Cheap, from how the game draws (low-res target scaled up, bloom, tilt-shift, bend, stencil, depth, colour grade, sprite atlas, baked frames). Candidates for spare slots or a seventh mushroom:

- **Hall of Mirrors:** don't clear the screen; everything smears into endless trails.
- **Glow Up:** bloom threshold 0; everything blazes.
- **Miniature:** tilt-shift at full: a toy world. PR1536 implements recipe 102 with shared scene/overlay focus settings and thin small-speaker audio, adjustable in the Potion Lab; audio render and visual judgement pending.
- **Little Planet:** the bend cranked up.
- **Wireframe:** one material flag.
- **Mix-up:** creatures drawn from the wrong part of the sprite sheet.
- **Mannequins:** animation frozen; everything slides.
- **Cutaway:** the camera's near plane pushed in: see inside trees and the treehouse.
- **Wandering Shadows:** shadows drift away from their owners.
- **Hue Spin:** the colour grade rotates hue continuously.

Visual references: Qualia Research Institute's replications of psychedelic visuals; PsychonautWiki's Subjective Effect Index (drifting, tracers, symmetrical texture repetition, colour shifting, recursion, scenery slicing, environmental cubism, frame-rate suppression).

## Expansion

- **CRT** (Ed): a CRT screen effect, pending. Either it replaces Underwater, or it goes to a seventh mushroom with the ten renderer-native ideas.
- **More mushroom kinds** (Ed, 2026-10-30): freely expand the list; hardly any effects are built and 56 is arbitrary. A seventh kind gives 84 recipes; further kinds can support hundreds. Preserve fixed recipes and the orderless three-ingredient model unless separately changed.

## Development discoveries and design direction

Ed, 2026-10-30: **whenever development exposes an interesting possible effect, add it here as a suggestion**. Examples include unusual testing states, bugs with visual potential, debug views, new visual systems, extreme parameter values and crossed signals. This standing rule is also in `CLAUDE.md` so it is encountered by future builders. Extend an equivalent entry rather than duplicate it. Give the perceptual effect, existing hook, extra work and related trip; do not mark an idea built or approved merely because it is recorded.

Ed wants temporary, intentional wrongness: "the normally invisible machinery of the game becomes part of her perception." Expose real signals, remove visual corrections, turn sliders far beyond their usual ranges, or route one system's outputs into another. Trees, grass, ground and lighting can be outputs wherever the change is scenery-only. Ordinary readability is not a blanket constraint on trips. Existing player comfort settings still apply.

Some gentle connections may belong in ordinary play too: legend restlessness changing atmosphere, attacks disturbing vegetation, affection expressed through plant movement, music clarity affecting the scene. Those are candidates, not all settled behaviour. The same connection can become a trip through strength, reach, persistence or a deliberately wrong source.

The older "never the world's rules" wording describes the presentation-first default; the original list already contains exceptions (Echo, Alone, Tiny Witch, etc.). Keep those explicit rather than using that sentence to veto them or assuming every new visual idea authorises simulation changes. A drawing distortion and a changed hitbox are different choices.

## Additional trip catalogue

Captured 2026-10-30. Numbers continue the original list for reference, **not recipe assignments**. Unless explicitly marked as Ed-requested, these are suggestions from the conversation. They may become separate recipes or variants; no original slot is displaced. The older renderer-native names above remain candidates too.

### Existing machinery and crossed signals

57. **Masterplan** (Ed-requested): see how packs intend to move and attack: targets, destination slots, roles, formations and attack geometry. `rules/combat/packs.ts` computes directives; `rules/combat.ts` currently keeps the complete directive map local. Publish a read-only snapshot for drawing instead of recomputing decisions. Existing line/ribbon renderers are foundations, not a complete overlay. Show current intentions first; abandoned plans and long histories would require new recording. Related: Foresight, Whole Route.
58. **Stiltwalkers** (Ed's Dalí reference): familiar animal bodies stand impossibly high on very thin, long legs. A specific Tall Tales variant using the creature rig and leg drawing. Preserve the body silhouette; feet still meet the ground. Review joint reach, stroke sampling and clipping rather than assuming a whole-sprite stretch gives the result. Scratch elephant, fox and badger mockups were explored during the conversation; not shipped artwork.
59. **Contour Dream:** vivid contour bands run across ground, animals and scenery. Shared world-height/position shading; a new small colour formula. A renderer mock was explored, not a production implementation. Related: Woodcut.
60. **Bottomless:** the ground becomes a starfield, with creatures apparently standing over an abyss. Ground-material substitution rather than moving their gameplay positions. A renderer mock was explored. Related: Skylight.
61. **Aurora Outlines:** luminous coloured edges replace most solid surfaces. Scene/depth edge filtering and bloom; an extra filter, not a free material toggle. A renderer mock was explored. Related: Cartoon.
62. **Folded Space:** repeated mirrored sectors fold the forest around her. Screen-coordinate remapping; a renderer mock of the existing Kaleidoscope idea. Keep as a variant unless its experience is distinct enough for another recipe.
63. **Sliced World:** horizontal world-height bands disappear, revealing stacked slices through animals and scenery. Shared clipping formula; check depth/shadow passes. Related: Cutaway.
64. **The Audience:** amplify existing watching-tree lean and lag until the forest visibly follows her passage. Implemented in PR #1535 using `render/view/frameUniforms.ts` and the existing `render/sprites.ts` shader: 35 m watching radius, 4 m lean, 2 s lag, all adjustable in the Potion Lab, fading with the standard trip envelope. No new art or drawing pass; visual judgement awaits Ed's trip report. Related: Watched, Walking Wood.
65. **Concertina:** shared scene deformation squeezes and stretches distance sideways. Extend the height/bend drawing path; keep CPU anchors consistent. Not an existing bend-axis slider. Related: Ravine, Little Planet.
66. **Far Sight:** nearby scenery dissolves into haze while distant scenery is unnaturally crisp. Reverse/remap existing haze distance controls; check saturation and clamping. Related: Inverse Perspective.
67. **The World Is Late:** her light, canopy opening and tree attention follow her past position, catching up when she stops. `rules/momentum.ts` retains about 1.5 seconds of witch positions; `render/view/frameUniforms.ts` has movable centres. Use available history, not an invented long recording.
68. **Sympathetic Forest:** trees crouch with attack wind-up, stretch with lunges and flinch when animals are hit. Reuse `render/attackFeel.ts` outputs; selecting/weighting an animal for each patch is extra wiring. Can have a gentle ordinary-play version.
69. **Bad Reception:** musical clarity makes the view sharp; damaged music warps habitat patterns and drives mist. `rules/music.ts` already exposes volume, cutoff and distortion; route them to post blur, ground blend and mist controls. No audio analysis needed for these signals. Related: Synaesthesia.
70. **Borrowed Habits:** vegetation acquires nearby animals' idle quirks: sniffing, shivering, stretching and happy bouncing. `render/character.ts` supplies rhythms and pose offsets; scenery needs a source-selection rule. Interesting during quiet wandering too.
71. **Someone Is Having a Bad Dream:** a legend's growing restlessness changes mist, grade and tree motion; its kin's arrival lets the scene relax. `rules/legends.ts` restlessness and `render/mood.ts` appearance controls. Candidate ordinary-play cue as well as a trip.
72. **Too Much Happening:** nearby combat makes the scene increasingly luminous until a fight dissolves into light, then settles. Exaggerate `render/combatLight.ts`'s smoothed fight signal through `render/post.ts` bloom/grade. Related: Glow Up; comfort controls still apply.
73. **The Forest Counts:** wind and mist advance in musical steps while she and animals remain fluid. Feed stepped `rules/beat.ts` time into scenery animation. Related: Stopmotion, but only scenery follows the beat.
74. **Spilling Habitats:** ground textures and habitat colours spill across borders while trees and inhabitants stay put. Animate existing `render/ground.ts` blend-warp controls from speed, musical distortion or attack preparation. Related: Breathing.
75. **Seeing Through Seeing:** perceive the masks that erase the canopy to make her visible. Expose sprite transparency diagnostics and exaggerate existing cut-out raggedness. `seeShowAlpha` affects particular see-through passes, not the whole image; needs a visual trial.
76. **Lovesick Leaves:** current affection controls nearby leaf colour, glow or motion. Use the decayed value from `rules/affection.ts`, not stale raw affection. Extend the existing leaf/lighting controls. Candidate gentle communication outside trips.
77. **Borrowed Attention:** the light pool or canopy opening follows an animal's current target rather than her. Use actual targeting and existing centres; define what happens when no target exists. The forest appears to care about someone else.
78. **Held Breath:** wave/pulse progress gradually tightens the world bend or swells scenery, releasing as the wave arrives. Existing `rules/leypulse.ts` progress plus render controls; handle route transitions. Related: Breathing.
79. **Out of Time:** mist, wind, plants and other animations borrow the wrong clock. World time and her time already differ during slow time; selectively cross them. Related: Bullet Time, Stopmotion. Do not change combat clocks merely to animate scenery.
80. **Pack Weather:** a nearby pack's approach, tell, combo and lull become wind and atmospheric phases. Use existing pack state, with a stable source choice so overlapping packs do not flicker between weather states. Related: Masterplan, Sympathetic Forest.
81. **Pressure Beneath the Feet:** attack wind-up locally raises or depresses the drawn ground; release sends a ripple. Requires the visual ripple extension in project 2, not a rebuild of terrain. Related: Held Breath.
82. **Distant Giants:** scenery grows with distance while nearby trees shrink. Use render instance sizes or a shared deformation; do not change collision. Scenery counterpart to Inverse Perspective.
83. **Musical Ground:** bass drives apparent ground height, percussion drives vegetation, melody drives light. Related: Synaesthesia/Breathing. Beat and broad music-state signals exist; individual instrument activity needs an explicit music-engine feed and is not assumed already available.

### Trips unlocked by shared visual projects

These depend on [visual-response-projects.md](visual-response-projects.md). The new machinery should serve ordinary play where worthwhile; it is not built just because a trip mentions it.

84. **Forest Current:** pack movement/steering becomes the foliage force field; the entire forest streams toward targets. Project 1, with real steering signals as inputs.
85. **Luminous Footprints:** extend the disturbance field's lifetime and colour it so every passage remains visible. Project 1. Related: Fireflies, but world-space ground memory rather than airborne particles.
86. **Rolling Sea:** landing ripples persist and overlap until the ground and its plants roll like waves. Project 2. Related: Breathing, with impacts rather than music as the source.
87. **Thick Air:** animals pull the image behind them like syrup. Project 3's wake/refraction masks; screen-space sampling cannot reveal hidden objects.
88. **Mushroom Lenses:** mushrooms become local magnifying/distorting lenses. Project 3; project world centres into the image and constrain edge sampling.
89. **Underwater Light:** moving caustic-like patterns sweep over the whole forest without necessarily changing movement or sound. Project 4. A visual component/variant of Underwater, not a claim that the full underwater experience is complete.
90. **Striped Intentions:** attack preparation tightens patterned illumination around its source, then releases. Project 4, using existing wind-up timing.
91. **Wax Menagerie:** exaggerated normal/material response makes painted creatures appear waxy, wet or metallic. Project 5; normals already exist, selective shine may need work. Variants should earn separate recipes through visibly different results.
92. **Inside-Out Relief:** reverse or exaggerate surface normals so bumps look like hollows and light seems to come from impossible directions. Project 5; inspect existing normal encoding rather than flipping arbitrary channels.
93. **Living Bark:** bark and surface colour climb trees while silhouettes remain still. Project 6; protect sprite atlas edges. Related: Walking Wood, but surfaces move rather than trees walking.
94. **Travelling Markings:** animal markings flow independently of their bodies. Project 6; preserve faces/silhouettes if desired, or deliberately break them for a stronger trip.
95. **Long Echoes:** sparse world-position pose echoes become numerous and long-lived. Project 7; a variant of Echo without automatically inheriting its decoys or copied attacks.
96. **Recursive Memories:** previous screen images shrink, rotate or drift into the current one. A retained-image feedback pass, distinct from project 7's pose history. Related: Hall of Mirrors. Account for camera movement and clear retained frames on reset.
97. **Changing Materials:** a moving world-space boundary turns trees to ink, creatures to silhouettes and ground to contours, then restores them. Shared masks plus alternate material appearances; new coordination, built from existing looks where possible. Related: Woodcut, Cartoon, Sliced World.
98. **Wandering Shadows:** separate shadows from their owners and drive them from another signal. Refines the renderer-native suggestion above: floor shadows and cast-shadow sampling are separate paths, so shifting one uniform will not necessarily move all shadows coherently.

99. **Growing Personalities** (development suggestion, 2026-10-30): expose the new `art/mushrooms.js` shape parameters to exaggerate stems into corkscrews, lift cap rims and make familiar colour families improbably squat or tall. Its preview now exposes eleven min/max ranges, including flat-to-pointed caps, height and spot packing: extreme pointed caps or exaggerated dot sizes are further visual candidates. The generator currently bakes static seeded sprites; smoothly growing or morphing them would need a bounded pre-baked sequence or a drawing deformation, not re-baking canvases each frame. Related: Tall Tales and Stiltwalkers. Keep collectible identity tied to colour rather than the exaggerated silhouette.

### Suggested first trials

Masterplan (real decisions), Stiltwalkers (the existing rig), The World Is Late (history into existing centres), Borrowed Habits (existing animation into plants), and Bad Reception (music state into drawing controls). These are recommendations, not a build queue. Use quiet exploration and dense combat when assessing a trip; the optional party remains a valid way to play.

### Inverse Glow Up — suggestion, not an implemented recipe

The mushrooms' new complementary-colour subtraction (`render/mushroomGlow.ts`) is a reusable trip output: creatures and spell impacts could carry broad halos that remove the other colours from the scenery around them. A red creature makes its surroundings deeply red without adding light; overlapping colours leave almost black pools. Feed existing creature positions, spell radii and music intensity into the halo radius/opacity, and optionally invert the ordinary Glow Up recipe's brightening. The base-game mushroom halo is built; this recipe and its assignment are not.

### Suggestion: the house in the void (discovered during brewing checks, 2026-10-31)

The treehouse and its occupants remain visible while the forest disappears into black; the world returns outward from a doorway or from her feet. The existing house-loading reveal already does this with `Post.behind`, `behindAt` and `HOUSE_LAYER`. A test that skipped drawing the reveal's frames exposed the intermediate state. This could be a variant of Alone, driven by her distance from home or the trip envelope. It needs no new rendering pass; a deliberate version must include her ground-level sprite in the retained layer so she does not disappear when leaving the branch. Suggestion only, with no recipe assignment.

## Catalogue follow-up

- The earlier questions about six mushroom names, 56 recipe assignments and replacing Underwater with CRT are superseded by the nine colours and 165 fixed combinations in the developer recipe book (Ed, 2026-10-31). Unassigned entries remain available for future suggestions.
- Bag capacity is unlimited and knockout loses no mushrooms (Ed, 2026-10-30); carried stock and baskets persist across nights and voyages (Ed, 2026-10-31).
- A shared adjustable wobbly-edge trip indicator now accompanies every active trip, including coming-soon recipes (Ed, 2026-10-31), fading over the final two game minutes. Its settings and the implemented effects' controls are in the pause menu's Potion lab.

- **The build-cost sort is accepted as it stands** (Ed, 2026-10-11).
