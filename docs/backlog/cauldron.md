# The cauldron and mushroom trips

Backlog (Ed, 2026-10-09 to 10-10). **Not built yet; don't build without Ed's go.** How mushrooms are found across the islands, and the tutorial recipes, are in [journey.md](journey.md) ("Mushrooms on the journey"); this doc is the cauldron itself and the trips.

## Mushrooms

- **Six kinds of mushroom** (Ed), in various shapes and colours. Every ingredient is a mushroom.
- She **picks them up by walking over them**, into a **hidden bag**: not in her stack, not shown in the UI.
- **Unlimited bag; nothing is lost on knockout** (Ed, 2026-10-30, cauldron builder chat: "bag capacity is unlimited, nothing is lost on knockout").
- Where they grow: two temperate kinds at home from the start, one kind per biome direction on phase-3-and-beyond islands; a kind found once grows at home from then on (journey.md).
- After the party's over she can still collect mushrooms and brew, so players explore trips without time pressure.

## The kitchen

- She enters from the bottom. **A big cauldron at the top**, **six baskets in a row round its base**, one kind each.
- Coming in with a full bag, her mushrooms **jump out of her into their baskets**.
- Near a basket, it **lights up and trembles**; **E throws one in**.
- **Three in = a brew, at once** (no use button, no bottle): the cauldron bubbles, colourful bubbles pour out, the room fills with smoke, and a second later she staggers outside and the world is... different.
- The kitchen travels with the Ent, so brewing works on any island. Rooms visited during the party slow time and add their own music (journey.md).

## Trips

- **Brews are trips** (Ed): temporary, can be powerful, with strong side effects: weird visuals, odd controls. Many do nothing useful or are just silly. **Not every trip needs an upside** (Ed).
- The effect **fades in over a few seconds and lasts about 1 to 2 minutes**.
- Trips affect **only her** (what she sees, hears and how she moves), **never the world's rules** or creatures' behaviour.
- **Recipes are the same in every run** (players learn and share them); the game never tells, and keeps **no recipe book**.
- **Order doesn't matter; repeats are allowed** (Ed): 6 kinds make **56 recipes** (20 all different, 30 a pair plus one, 6 triples).
- **Every combination is its own effect, unrelated to its parts** (Ed): mushroom colour or shape doesn't hint at the result.
- **The one-frame rule** (Ed): a single frame must show the game is doing something weird *on purpose*. Proposed fix for the subtle ones: a **trip frame**, a shimmering coloured edge on every trip that shrinks as it wears off.
- **Build from what's there** (Ed): as many as possible from shaders and parameters already in the game; avoid new systems that bring bugs; take inspiration from bugs found while making the game.
- Considered and dropped: creature sigils as ingredients, potion bottles, and ingredients with hidden traits.

## The 56 trips

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
- **Miniature:** tilt-shift at full: a toy world.
- **Little Planet:** the bend cranked up.
- **Wireframe:** one material flag.
- **Mix-up:** creatures drawn from the wrong part of the sprite sheet.
- **Mannequins:** animation frozen; everything slides.
- **Cutaway:** the camera's near plane pushed in: see inside trees and the treehouse.
- **Wandering Shadows:** shadows drift away from their owners.
- **Hue Spin:** the colour grade rotates hue continuously.

Visual references: Qualia Research Institute's replications of psychedelic visuals; PsychonautWiki's Subjective Effect Index (drifting, tracers, symmetrical texture repetition, colour shifting, recursion, scenery slicing, environmental cubism, frame-rate suppression).

## Possible expansion

- **CRT** (Ed): a CRT screen effect, pending. Either it replaces Underwater, or it goes to a seventh mushroom with the ten renderer-native ideas.
- **A seventh mushroom** (Ed: fine if we keep thinking of more): 7 kinds make **84 recipes**.

## Open questions

- Assign the 56 trips to recipes; name the six mushrooms.
- CRT: replace Underwater, or wait for a seventh mushroom?
- The trip frame: adopt it for every trip, or fix the subtle ones one by one?

- **The build-cost sort is accepted as it stands** (Ed, 2026-10-11).
