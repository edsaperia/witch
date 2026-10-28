# Magic effects pass: briefing

Ed, 2026-10-28: "In the future we'll do a 'magic effects' pass where we look at all the magic effects in the game and make them look better. Maybe we can come up with a multi-layer system that also works with lighting and shaders, rather than just drawing and animating flat pixels."

Then:
- "Think about how we might be able to come up with a system that uses layers, shaders and lighting together to generate a language for these effects, not just pixel drawing and animating. Then we can easily create different intensities of effect, and also families of similar-looking effects."
- "Think also about how the isometric view affects what we'll see."
- "It would also be interesting to consider how these effects might interact with nearby scenery; perhaps a cold blast could also temporarily give nearby trees a frozen look."

This is the art director's brief for that pass. It changes nothing in the game. It holds:
1. what we have today;
2. what Ed's references teach;
3. a proposed effect language;
4. a staged plan and its risks;
5. questions for Ed.

## In short

- **Today, most of our magic is flat.** Our effects are drawn pixels and additive glows. Almost none of them light the world around them. Attacks, legends' blows, the party spell, the witch's trail and the berries all cast no light. The few things that do light the world (lava, campfires, fireworks, runestones, placed sigils) read as the richest things on screen.
- **The proposal: one effect language** of **element × form × intensity**:
  - **Element:** the family. A colour ramp, a way of moving, and secondary detail.
  - **Form:** the shape. Projectile, beam, zone, dome, trap, burst, pillar, vortex, eruption, aura.
  - **Intensity:** a single 0 to 1 number. It scales every layer together, so a baby's spark and a legend's comet are the same effect at two settings.
- **The layer stack:** every effect is built from the same fixed stack of shader layers, each read from data:
  1. dark base
  2. core
  3. halo
  4. real light
  5. particles
  6. secondary detail
  7. ground mark
  8. scenery imprint
  9. distortion
  10. screen
- **Pixel discipline:** everything is drawn at art-pixel size and snapped to the element's ramp, so it stays pixel art.
- **Effects touch the world.** A frost blast leaves nearby crowns frosted for a few seconds. Fire scorches the ground and lights crowns orange. The palette-indexed art makes this cheap.

## 1. What we have today

Survey of `claude/prototype` at 7008ba45b, 2026-10-28, plus two branches in flight.

Each verdict is one honest line from the art director's chair.

| Effect | Where | How it's drawn | Lights the world? | Verdict |
|---|---|---|---|---|
| **Attack look and elements** | `config/attack-look.json`, `config/attacks.json`, `src/rules/attackLook.ts` (`elementOf`, `spellPower`), `art/attackLook.js` (`attackLookAtlas`, a 768² atlas baked at load), `src/render/leash/attackLook.ts` (`AttackLook`: core, trail, impact, beam, area, burst, ring, lane, cone, telegraph, zone, tell, tether) | 5 instanced quad layers (glow and glowFlat additive, paint and paintFlat normal, `over` above the crowns). The atlas is stored indexed (R8 plus palette). | No | The best-organised effect code we have. It already has a grammar (bodies, zones, beams, telegraphs) and elements, but every element is the same flat stamp recoloured. Nothing lights or touches the ground, so a fireball crossing a dark forest doesn't light it. **The pass should grow from this.** |
| **Danger frame and telegraphs** | Same atlas, `AttackLook` `telegraph`, `zone`, `tell`, `blink()`; `src/render/leash/attackSpells.ts` | White dashes marching, pips, brackets, chevrons, a hatch, a "now" blink | No | Clear and readable, which is its job. Keep it UI-like and apart from the effect itself; the pass shouldn't make it prettier at the cost of clarity. |
| **Legends' exaggerated attacks** | Rules: `src/rules/attacks/species.ts` `legendOf`, `src/rules/combat/legend.ts`. Drawing: `src/render/leash/combat.ts` (legend lobs, `attackFx.legendFlash`, shockwave ring); camera shake `render/leash.ts` `shake()` | The same atlas cores at legend size, a bigger flash, a ring | No | Bigger but not grander. The same effect scaled up, with no extra layers. This is exactly what the intensity scalar is for. |
| **Party spell** | `src/ui/spellScroll.ts` (DOM scroll); `src/render/spellfx.ts` `partyBurst` (64 amber and rose motes); the boot pulse round the ring (`render/view/home.ts`, `BOOT_RGB` point lights) | DOM, plus a points pool, plus speaker lights | Only the speakers | The scroll is good. The burst in the world is generic motes. It's the night's signature spell and deserves a pillar or eruption with real light. |
| **Blink and broom sparks** | `src/render/spellfx.ts` (afterimage column, smears, ring, landing burst; pooled points, max 384) | Points | No | Fine as feel; would gain from a ground mark and a light flick. |
| **Her flight trail and party swoops** | `src/render/trail.ts`, `src/render/swoopTrails.ts` | Additive ribbons, camera-facing | No | Pretty; the trail form of the language, already. |
| **Sigils, runes, stack** | `src/render/leash.ts`, `leash/stack.ts`, `leash/glyphs.ts`, `leash/ranks.ts`, `leash/projection.ts` | Instanced glyph atlas, kept sharp through tilt-shift (`Post.sharp`) | Yes: placed sigils and the stack's bottom (`sigilLights`) | Good, and the lit ones read best. "Chains" exist only as the slow motif (`chain0..3`) and the `chainNext` telegraph. |
| **💌 invites and hearts** | `src/render/invites.ts`, `src/render/inviteRing.ts` (DOM pixel art, WebGL2 occlusion query, `overlayTilt.ts`) | DOM over the canvas | No | UI, and should stay UI. |
| **💧 and 💥 orbit combat** (in flight) | Branch `claude/orbit-combat` (8450ba133): `rules/orbit.ts`; hearts and 💧s orbiting in the 💌 ring, soundsystems' health as a ring of 💥s | Icons in the ring, "upright in their own glows" | No | Information, not magic. Keep these icon-like (reference 3's language), not effects. |
| **Soundsystem spell** (in flight) | Branches `claude/runestone-stacks` (512055c38) and `claude/runestone-view` (0b02ed898): casting at a stone, the analyser bars driven by the music, chain physics | (not on the base yet) | (n/a) | The next big spell. Build it in the new language from the start if the timing allows (question E4). |
| **Berries' glow, ring-stone dots** | `src/render/leash.ts` `drawBerries`, `drawRingGlows`; `src/render/berries.ts` | Soft additive halos (the mood's `berryHalo`) | No | Pleasant. A tiny light would make berries findable by glow alone. |
| **Sky sigil holograms** | `src/render/hologram.ts` | Additive cone plus glyph, scanlines, interference | No (the soundsystem lights itself, `render/party.ts`) | Distinctive, a "tech-magic" family of its own; keep. |
| **Runestones** | `src/render/markers.ts` | Beacon columns, lasers, motes, a flare, rune glow (`uGlowGain`) | Yes | Already layered: core, halo, light, particles. The model to copy. |
| **Ley lines and pulse** | `src/render/leylines.ts`, `leyHead.ts`, `sparkler.ts` | Additive shader ribbon, pixel spark head, embers, ground glow quads | No (glow decals) | Good; the ground glow decal is the right idea, done by hand. |
| **Lakes** (lava and others) | `src/render/lakeLooks.ts` (`LAKE_LOOKS_GLSL` in the ground shader), `src/render/lakeShore.ts` `lavaLights` (2 point lights, reach 40) | Shader in the ground, real lights | Yes (lava) | The best "effect" in the game, because it lights its surroundings. |
| **Knockout** | Candles `render/view/home.ts`; iris and record `render/koIris.ts` plus `post.ts`; hat float `render/hatFlight.ts`; slashes `leash/slashes.ts` | Sprites, post composite, screen-blended red | No | Fine. Not magic. |
| **Fireworks** | `src/render/fireworks.ts` (`winStar`: gold, silver, rainbow) | GPU-pooled rockets and stars | Yes, a flash per burst | Already a burst plus light; good. |
| **Lasers, dancefloor, party ambience** | `render/lasers.ts`, `render/dancefloor.ts` (disco light), `render/strings.ts`, `render/partyObjects.ts` (campfires and lanterns lit), `render/partyOver.ts`, `render/smoke.ts` | Additive lines, points, instanced puffs | Disco, campfires, lanterns | Party, not magic; leave out of the pass except as neighbours to light. |
| **Atmosphere** | `render/wisps.ts`, `glades.ts` (glade light, own uniform pool), `lightRings.ts`, `clouds.ts` (lightning), `slowtime.ts`, `mist.ts`, `loadingMist.ts` | Points, screen passes | Glades | Leave; the backdrop the effects play against. |
| **Outlines and glows** | `render/aggro.ts` (red pulsing outline via the sprite glow channel), `legendOutline.ts`, `useGlow.ts`, `spotlight.ts`, `loanSparkle.ts`, `dream.ts` | Sprite glow channel, additive cone, canvas glints | No | The sprite glow channel (alpha 254) is a ready-made hook for "touched by magic". |
| **Hat whirlwind** | `art/effects.js` `effectSprite`, only for the Cyclone hat (`render/view/hatArt.ts`) | Baked sprite | No | A leftover of an older effects path. |

The shared machinery all of this sits on:
- **Bloom:** `src/render/post.ts`, half resolution, threshold 0.55, strength 0.7 (`bloom` in the tuning). It also holds the mood grade, the knockout dim and iris, the smooth fx layer and tilt-shift.
- **Glow pixels:** alpha 254 in the art, brightened by `uGlowGain` in `render/sprites.ts`.
- **Point lights:** `render/lighting.ts` allows `MAX_LIGHTS` 24 plus `MAX_GLADES` 4, and the tuning's `lightBudget` is 20. `render/view/lights.ts` `setLights` keeps the nearest lights and fades those at the edge. The list is built in `render/view.ts` (around line 1636): dancefloor, zoo, soundsystems, fireworks, treehouse, runestones, boot-ring speakers, party objects, legends' lanterns, lava, sigils, relics, forest lights. Her own glow is separate (`uGlowRgb`).
- **Screen shake:** `render/shake.ts`, `app/shake.ts` (`?shake=0`). There's no full-screen white flash anywhere.
- **Reduce flashing:** `src/render/comfort.ts` and `app/playerSettings.ts`. When on: no "now" blink, no white hit stars, impact glows dimmed, `attackFx.legendFlash` 0.

## 2. What Ed's references teach

Ten sheets Ed shared on 2026-10-28, described here in words (we don't keep other artists' pictures in the repo).

### Batch 1: pixel art

1. **Five pixel flames** (blue, green, magenta, orange, white).
   - Five different shapes, not one recoloured: green is fat and bulbous, orange has tall tongues, magenta is small.
   - Each has a 4-tone ramp from a saturated dark rim to a near-white core, with the core low at the base, not at the tip.
   - No outline. Loose single pixels flick off the top. The blue one alone has "+" sparkle crosses.
   - *Teaches:* an element is a ramp plus a way of moving, and a family shares the ramp, not the shape. The hottest part sits where the energy comes from. Sparkle crosses are a per-element secondary.
   - *Applies to:* every element's core; the party spell; campfire-like zones.
2. **A pixel FX sheet:** a mushroom-cloud explosion, a fireball with a tail, a purple bubble cluster, a cyan spark burst, a green drip, a dark spiked orb, a magenta vortex, a star-shaped blast, an eye.
   - Pixels sit in 2 to 3 px clumps. The explosion's rim is dark red, not black. The orb and the eye read by silhouette alone.
   - *Teaches:* chunky clusters at our art pixel; a dark rim in the element's own darkest tone in place of an outline; one strong silhouette per form.
   - *Applies to:* bursts, impacts, traps (the eye and the orb).
3. **Element icons:** a water swirl, flame, crescent moon, twinkle, dark orb, sunburst, green wind ring, cloud, purple smoke.
   - One readable silhouette each, three tones.
   - *Teaches:* the element's mark for UI (the action bar, the attack library, orbit icons), separate from its effect.
   - *Applies to:* `spell-icons`, orbit combat's icons, the Fight Arena's lists.
4. **Tiny glowing pixel FX on black:** orange flicks, cyan crescents and swirls, red stars, white puffs.
   - The sprites are tiny. The halo, several times bigger and the same hue, does the work.
   - *Teaches:* the halo layer can carry a small effect on its own; bloom is a layer we tune per effect, not a global accident.
   - *Applies to:* sparks, motes, berries, the witch's blink.
5. **Rappenem's rich sheet:** lightning striking inside a ground ring; a fireball comet; energy domes with blasts inside; a crimson arrow beam passing through rings; a black-hole vortex; a blue slash wave wrapped in lightning; meteors; a green skull comet; an electric orb.
   - **The clearest lesson in layers.** Each effect stacks:
     - a dark smoke or debris base;
     - a translucent dome or ground ring, drawn as an outline and an inner tint;
     - a white-hot core;
     - secondary lightning in a contrasting hue (cyan on orange, white on blue);
     - glow as dithered pixel halos, not smooth blur.
   - *Teaches:* the layer stack below, almost one to one. Contrast-hue secondaries make an effect feel charged. Domes and rings are how a pixel game shows "area".
   - *Applies to:* zones, domes, traps, legend attacks, the soundsystem spell.

### Batch 2: mostly vector and painterly

6. **Projectile streaks:** magenta and blue energy, orange fire with lava cracks, ice shards, a blue bolt with white sparks.
   - A bright head and a long tail that fades and breaks up, on a soft dark-purple smoke halo.
   - The ice and blue streaks have white crackle segments across the body. The fire carries dark red-black chunks.
   - *Teaches:* a trail is a ramp along its length (core at the head, dark tones at the tail). A dark halo under a bright effect makes it pop on any ground. Dark chunks inside fire read as "lava", not "light".
   - *Applies to:* every projectile and lob.
7. **More streaks:** a green-yellow wisp, a pink spiked dart, a white ring-orb with a tracer, a purple smoke trail, a green crystal arrowhead with a lightning tail, a purple slash with smoke, a blue feathered dart, a smoke burst, a fire trail.
   - *Teaches:* the head's shape (dart, crystal, ring, feather) is how families inside an element differ, while the trail stays the element's.
   - *Applies to:* species variety inside one element (a fox's bolt against an owl's).
8. **Beams and ground eruptions:**
   - Thin tracers with motion lines; a green bolt wrapped in rings that follow a sine; purple lightning through a spiral of hoops in perspective; blue ice slabs; blue lightning.
   - Bursts out of the ground: blue crystals, magenta spikes, green grass blades, each with a radial glow pooled on the ground at its base.
   - *Teaches:* rings along a beam give it depth in a top-down-ish view. **Every ground effect needs a glow on the ground at its foot**: the "lights the ground" layer.
   - *Applies to:* beams, traps, the slam ring, eruption forms.
9. **Pixel vortices and pillars:** fire and water spirals, a tornado, a crescent, a dark whirl, a magenta flame with an orb, a water column, a flame column.
   - The closest to our look: 4 to 5 tone ramps, dark rim to a near-white core, dithered loose sparkles round the edge, no outline.
   - *Teaches:* vortex and pillar as forms; dithered loose sparkles as the particle layer in pixel form.
   - *Applies to:* the party spell (a pillar), whirlwinds (the Cyclone hat), legend summons.
10. **Comic explosions:** a puffy cloud ring with a star flash in the middle, a blue impact with lightning, a smoke-and-fire streak, an ice-blue vortex, a mushroom cloud.
    - Three-tone cel-shaded smoke, a yellow star flash at the centre, a darker outer ring, debris flicks and speed lines.
    - *Teaches:* the burst form: a flash (one or two frames), a ring of smoke that lingers, flicks outward. The smoke is the dark base layer, and it's what stays on screen after the light has gone.
    - *Applies to:* impacts, legend slams, a soundsystem falling.

**What they all share** maps onto our attack grammar's projectiles, beams, zones and traps:
- a short ramp per element, dark edge to near-white core;
- glow against the dark;
- chunky pixels;
- secondary detail (sparks, lightning, rings);
- rings or domes for areas, trails for motion, eruptions for ground attacks;
- a dark base under the bright parts.

## 3. The proposal: an effect language

### 3.1 Element × form × intensity

An effect is three choices, not a drawing:

- **Element** (the family) is one small data record. Elements might be fire, water, frost, storm, nature, void, light, party: one per kind of creature, and the witch's own.
  - **ramp:** 4 or 5 colours, dark rim to near-white core (reference 1).
  - **contrast:** a contrasting hue for secondaries (reference 5).
  - **motion:** a noise field and how it flows:
    - fire: rising turbulence
    - water: swirl
    - frost: slow crystalline steps
    - storm: jagged jumps
    - nature: sprouting
    - void: pulling inward
  - **secondary:** sparks, sparkle crosses, lightning, bubbles, leaves, shards.
  - **imprint:** what it leaves on the world: frost, scorch, wet, bloom, glow (3.4).
  - **sound tag:** for the sound effects to match.
- **Form** (the shape) is one geometry and timeline per kind. Every attack in `config/attacks.json` already names one, so the existing attack data maps onto it directly.
  - **Projectile:** head and trail. Head shapes vary within an element (reference 7).
  - **Lob:** an arc, with a ground shadow and a landing mark.
  - **Beam:** a core line, with rings along it (reference 8).
  - **Zone or ring:** a ground ellipse, an outline and an inner tint.
  - **Dome.**
  - **Trap:** dormant, then triggered.
  - **Burst:** flash, smoke ring, flicks (reference 10).
  - **Pillar.**
  - **Vortex.**
  - **Eruption:** from the ground, glow at its foot (reference 8).
  - **Aura:** round a body.
- **Intensity** is one 0 to 1 number that every layer reads: size, core brightness, halo reach, light radius and strength, particle count, how long the ground mark lasts, and whether the secondary detail appears at all. Some layers switch on only above a threshold: lightning above 0.5, the dome above 0.6, shake above 0.85.
  - It maps to creature level by default (baby 0.25, young 0.45, adult 0.65, legend 1) and can be pushed by a spell's power (`spellPower`).
  - **A family** is one element across all forms. **A ladder of intensities** is one element and form across levels.
  - Both come from data, so a new species' attack is a line of data, not new art.

### 3.2 The layer stack

Every effect is the same stack of layers. A layer can be empty, and its settings come from the element, the form and the intensity. Each one maps onto machinery we already have:

| # | Layer | What it is | Built from |
|---|---|---|---|
| 1 | **Dark base** | Smoke, debris, a dark halo under the bright parts (references 5, 6, 10) | Instanced puffs (`render/smoke.ts`'s kind), normal blending, the element's darkest tone |
| 2 | **Core** | The silhouette: a shape field (a distance field, or the atlas's cores) quantised to the ramp's tones, the hot end where the energy comes from (reference 1) | `AttackLook`'s paint layer, with a ramp-lookup shader in place of baked colour |
| 3 | **Halo** | Additive glow, dithered in art pixels at the edge (reference 5), tuned per effect (reference 4) | `AttackLook`'s glow layer and the bloom pass (`post.ts`) |
| 4 | **Light** | A real point light: lights the ground, trunks, crowns and creatures nearby (as the lava does) | `render/lighting.ts` point lights through `setLights`'s budget, ranked by intensity |
| 5 | **Particles** | Sparks, embers, motes, dithered loose pixels (reference 9) | Pooled GPU points (`render/spellfx.ts`'s pool) |
| 6 | **Secondary** | Contrasting-hue detail: lightning, rings along a beam, sparkle crosses, shards | Procedural in a shader (as `clouds.ts`'s lightning), or atlas bits |
| 7 | **Ground mark** | A glow pool at an effect's foot while it lives; a scorch, frost or wet mark after | A ground decal in the ground shader's pass (as the ley lines' ground glow quads), fading |
| 8 | **Scenery imprint** | What the effect does to nearby trees, crowns, plants, props (3.4) | A small world-space imprint field the sprite and ground shaders read |
| 9 | **Distortion** | Heat haze over fire, a ripple from a void | A screen-space offset in the post pass; optional, top quality rungs only |
| 10 | **Screen** | Flash and shake | `render/shake.ts`; flash through the post composite; both from a shared budget, capped by reduce flashing |

**Pixel discipline:**
- Every layer is drawn at art-pixel size (snapped to the art pixel grid, as the sprites are).
- The core and halo are quantised to the element's ramp, not smooth gradients.
- The halo is dithered in steps, as Rappenem's are, with the bloom's smooth glow over the top kept small.

So the shaders produce pixel art that matches the creatures and trees, not a soft vector glow pasted over them.

**Lighting and shading:**
- The core is self-lit: it ignores the night's moonlight.
- The dark base and smoke take the scene's light, including the effect's own light. Smoke under a fireball glows orange from below, as the crown's lobes do over the house since #1301.
- The effect's light reaches its neighbours through the existing point-light shader. A frost blast lights the trunks it passes pale blue for a moment.

### 3.3 The isometric view

Our camera always looks north and down: about 26 degrees on the ground, steeper in the treetops. Sprites are camera-facing. That changes what reads:

- **Ground shapes foreshorten.** A circle on the ground is an ellipse about half as tall as wide. Zones, rings, eruption feet and ground marks are drawn on the ground plane, so they squash with it, as the danger frame does now. Domes and pillars stand up as billboards and don't squash.
  - A dome is two parts: a billboard silhouette, plus its ellipse on the ground. Rappenem's domes have exactly that.
- **Direction changes length.** A beam running north-south looks much shorter than the same beam east-west. Beams and projectile trails need a minimum on-screen length and a slightly wider core when they run north-south, or a fox's bolt fired at the camera disappears.
- **Height is ambiguous.** In a top-down-ish view a projectile in the air and a mark on the ground can sit at the same spot on screen. Anything in the air needs a ground anchor so its height reads: a small shadow, or the glow pool its light makes on the ground.
  - The real light does this best: the lit spot on the ground under a fireball says where it is.
- **Crowns cover the ground from the treetops.** Seen from above, effects on the forest floor are under the canopy. Two answers:
  - the effect's light and halo show through as a glow in the crowns (the ley lines already do this);
  - telegraphs that must read stay in the `over` layer above the crowns (as now).

  Effects in the treetops (lobs, legend comets, pillars) should rise above crown height so they read from both views.
- **Verticals carry the drama.** Pillars, eruptions, vortices and lob arcs read as tall shapes on a camera that looks down. Flat ground effects read as shapes on a map. Big spells (the party spell, legend attacks, the soundsystem spell) should have a vertical part.
- **The lighting has a direction.** The moon and the camera never turn, so every effect's shading can be authored once, for one view.
- **Tilt-shift blurs the top and bottom of the screen.** Fine detail (secondaries, sparkles) is lost there, so the screen band can be one more input to how much detail is drawn.
- **The bend** curves the world at distance. Ground marks must bend with the ground (drawn in the ground's pass, they do).

### 3.4 Effects that touch the world

Ed: "perhaps a cold blast could also temporarily give nearby trees a frozen look."

**The imprint field** is a small texture, about 128 × 128 cells, that follows the witch over about 200 m. Each cell holds a few channels that decay over seconds:
- frost
- scorch
- wet
- bloom (plants sprouting)
- charge (a static shimmer)
- push (a wind impulse)

An effect stamps its element's imprint into the field where it passes and lands, scaled by its intensity.

**What reads the field:**
- **Sprites** (trees, plants, props, creatures; `render/sprites.ts`):
  - **Frost:** the albedo lifts toward the element's pale tones and a few white sparkle pixels appear on crown edges. With the palette-indexed art this is cheap: the frozen look is a second palette row, blended by the field.
  - **Scorch:** crowns darken toward a burnt row.
  - **Charge:** sets the existing glow channel shimmering.
  - **Wet:** darkens and adds a sheen.
- **The ground shader:** frost rime, scorch marks, wet sheen and blooming tufts on the ground, through the same field.
- **The pixel wind** (`render/sprites.ts`, by the sway mask): reads the push channel, so a storm or a big impact bends the crowns round it for a moment.
- **Lakes:** a frost imprint could skin a water lake with ice for a few seconds.

**What it costs:**
- one small texture and one lookup in the sprite and ground shaders;
- the stamping, a few draws a frame into the field.

It touches only drawing, never rules: frozen trees aren't solid.

**Restraint:**
- Imprints fade in seconds, never stay, and never hide a telegraph.
- Reduce flashing turns off charge's shimmer.
- The quality ladder can drop the field entirely (3.5).

### 3.5 Budgets and settings

- **Palette-indexed art** (`render/palette.ts` `indexPlane`, `render/atlas.ts` `indexedTexture`, R8 plus a 256 × 1 palette): elements' ramps are palette rows.
  - An effect's core and halo are ramp lookups, so a new element is a new row, not new textures.
  - Imprints are row blends.
  - The attack atlas is already indexed; the pass keeps it so.
- **GPU memory** (`render/gpuLedger.ts`, `render/view/gpuBudget.ts`): the language needs only a few small things:
  - a ramp texture (elements × 5 colours);
  - the shape fields (small);
  - the imprint field (128² × a few bytes);
  - the particle pools.

  Most effects get cheaper in memory, because shapes and colours stop being baked per element. Each gets its own `gpuKind` ("fx") in the ledger.
- **The light budget** (`lightBudget` 20, `MAX_LIGHTS` 24): effect lights are short-lived and many. They join `setLights`'s ranking by intensity × nearness, so a legend's comet wins a light over a baby's spark. Babies' sparks may get none and rely on the halo. A cap on effect lights at once (say 6) keeps the world's own lights.
- **The quality ladder** (`src/rules/ladder.ts`, `src/app/ladder.ts`): effect rungs join it in order of cost:
  1. distortion off
  2. imprint field off
  3. secondary detail above intensity 0.5 only
  4. effect lights capped lower
  5. particle counts halved

  The core and the telegraph never drop.
- **Reduce flashing** (`src/render/comfort.ts`, `app/playerSettings.ts`):
  - the screen layer is off (no flash, a softer shake if shake is on at all);
  - no flash frame in bursts;
  - lights rise and fall over at least 150 ms, never pop;
  - charge's shimmer is off;
  - halos are capped.

  One flag, read by every effect through the language, not effect by effect.

### 3.6 Authoring

- **Data:**
  - `config/fx/elements.json`: ramps, contrast hue, motion, secondary, imprint.
  - `config/fx/forms.json`: geometry, timeline, which layers.
  - `config/fx/intensity.json`: each layer's response to intensity, and its thresholds.

  `config/attack-look.json` and `config/attacks.json` point at an element and a form. The schema and the pause page's sliders follow, as the tuning's do.
- **Preview:** a new `?lookdemo=fx` mode, plus a panel in the **Fight Arena** (`?fight=`, which already has frame step, slow speeds and the telegraph timer). It shows a grid of:
  - one element's forms (its family);
  - one form across intensities 0 to 1 (its ladder);
  - one form across elements.

  It also has a dark-ground and a forest-ground toggle and a treetop-camera toggle, for the isometric questions.
- **Sheets:** `tools/attack-look/sheet.mjs` grows into an fx sheet (family × ladder grids, shot at night in the game) for Ed's reviews and the art check.

## 4. A staged plan

| Stage | What | Rough size | Who |
|---|---|---|---|
| 0 | **Mock** (nothing built): the art director paints, in the game's own renderer, one element (fire) across 4 forms × 3 intensities, plus a frost blast with a frozen tree beside it; frames for Ed. | 1 to 2 days | Art director |
| 1 | **The spine:** `config/fx` data; the ramp texture; core and halo as ramp-lookup layers in `AttackLook`; intensity driving them; the lookdemo grid. No new layers yet: today's attacks redrawn through ramps. | 3 to 4 days | Rendering builder + art director |
| 2 | **Light and ground:** effect lights through `setLights` with their cap; glow pools and marks in the ground pass; ground anchors for airborne effects; the isometric rules (3.3). The biggest visible gain. | 3 days | Rendering builder |
| 3 | **Secondary, particles, dark base:** lightning, rings, sparkles; pooled particles per element; smoke under bursts. | 3 to 4 days | Rendering builder + art director |
| 4 | **Imprint field:** frost, scorch, wet, push in the sprite, ground and wind shaders. | 3 days | Rendering builder |
| 5 | **The signature spells in the language:** the party spell (a pillar), legend attacks (intensity 1 plus vertical forms), the soundsystem spell; berries' tiny lights; the old `effectSprite` retired. | 4 to 5 days | Whoever owns each, with the art director |
| 6 | **Budgets:** quality-ladder rungs, reduce flashing through the language, the GPU ledger's fx kind, cost measured on the cloud and on Ed's machine. | 2 days | Performance builder |

Each stage is its own PR, with before and after frames, the art check, the attack-look sheet and the cost.

### Risks

- **Readability against beauty.** Bigger, brighter effects can hide telegraphs and creatures, and combat must stay legible. Mitigations:
  - telegraphs stay their own UI-like layer above effects;
  - there's a brightness budget per screen;
  - test in packed fights in the Fight Arena.
- **Light budget pressure.** Effect lights compete with the world's. A cap and ranking, plus a light that fades in rather than pops, avoid flicker at the budget's edge.
- **Cost on weak machines.** Each layer is optional, the ladder drops them in order, and cost is measured per stage.
- **Losing the pixel look.** Smooth shaders drift toward vector glow. Mitigations: art-pixel snapping, ramp quantisation and dithered halos, checked against the references' pixel sheets at every stage.
- **Photosensitivity.** Flashes, rapid flicker and charge shimmer. Reduce flashing is read in one place by the language; flicker is kept under 3 Hz in all cases.
- **Scope creep.** "Make everything magic" never ends. The pass covers what's in the inventory, in the plan's order, and stops.
- **Overlap with work in flight.** Orbit combat and the soundsystem spell are landing now. They keep their look until stage 5, unless Ed chooses otherwise (E4).

## 5. Questions for Ed

Each has the art director's recommendation first.

- **E1. How pixel should the effects be?**
  - (a) **Pixel cores and dithered halos, with a small smooth bloom over the top (recommended)**, as Rappenem's sheet.
  - (b) Strictly pixel, no smooth glow at all.
  - (c) Pixel cores with painterly vector glow, as the batch 2 references.
- **E2. Should attacks light the world?**
  - (a) **Yes, capped, with the strongest effects winning (recommended).**
  - (b) Only legends' attacks and the big spells.
  - (c) No, halos only.
- **E3. Scenery imprints (frozen trees and the like)?**
  - (a) **Yes, all elements, fading within seconds (recommended).**
  - (b) Frost and scorch only, to start.
  - (c) Not for now.
- **E4. The soundsystem spell and orbit combat, landing now?**
  - (a) **Leave their look as built, and redo them in the language at stage 5 (recommended).**
  - (b) Hold their visuals until stage 1 exists.
  - (c) Leave them out of the pass.
- **E5. Which element first, for the mock?**
  - (a) **Fire, with a frost blast for the imprint (recommended).**
  - (b) The party's own element (the witch's magic).
  - (c) Whatever the most common creature uses.
- **E6. Screen shake and flash?**
  - (a) **Legends' big blows and the big spells only, all off with reduce flashing (recommended).**
  - (b) Scaled by intensity for every effect.
  - (c) None.
- **E7. When?**
  - (a) **After combat's rules settle (orbit combat merged), starting with the stage 0 mock (recommended).**
  - (b) Next, before anything else.
  - (c) Later, after the content passes.
