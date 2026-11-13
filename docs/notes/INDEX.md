# The notes and the glossary's index

Made from the notes by `node tools/docs/glossary.mjs --write` (never edit it by hand): what each note covers (its
`<!-- summary: ... -->` line), then each note's entries, the bold names that open its lines. Add a note or an entry, then run
that; `tools/docs/glossary.test.ts` fails while this is out of date. Read an area's note before working on it.

## The notes

- [Art checks](art-checks.md): The art generator's check, the style bible, the genome compare, the lab and export commands.
- [Balance baselines — v5655 rules](balance-baselines.md): The matched-seed, matched-bag tables from the real-rules report (v5655; one seed, no tuning).
- [Real-rules reports and legacy coverage](balance-report-coverage.md): The report tool, how to rerun it, and what the old balance sims still cover.
- [Balance study follow-up](balance-study.md): The follow-up on the real rules after the report tool (#1475): the matched-tempo preflight and the study's limits.
- [Wide, shallow balance survey — design v1](balance-survey-design.md): The frozen five-study cloud design, first-wave limits and expert feedback gates.
- [Balance](balance.md): The balance simulators and bots, fighting value, populations and costs, the playtest log.
- [Cauldron collection and brewing preview](cauldron.md): The gated mushroom collection, shared kitchen and Mirror Floor preview; capturing possible mushroom trips and their sound; checks and remaining scope.
- [Config files](config.md): The tuning file (values only) and its schema, the knobs' words in `config/knobs/<section>.json` (what each does, Ed's decisions), the style file, the link switches registry, the checks registry, the changelog's fragments.
- [Creatures' art](creatures.md): Genomes and templates, textures and palettes, evolution kits, faces, the live rig, the sleeping legends' art.
- [Deploys](deploys.md): GitHub Pages and publishing: the gh-pages snapshot and its publisher, PR previews, garbage collection, version.json and the newer-build notice, and when a release counts as live.
- [Expert search: implementation and fairness audit](expert-search.md): Observation limits, deterministic training, protected seeds and the survey adapter.
- [Creatures in play](gameplay.md): Inviting, the leash and sigils, combat and sieges, creature states, the legends and their quests.
- [The treehouse and its house](house.md): The treehouse and its deck, arriving, the house's rooms, the station menus, the Studio, finds, the Workshop and broom parts, hats and brooms, the telescope.
- [Islands and the journey](island.md): Island growth and shape, the land, lakes, biomes and beaches, the archipelago and the sea chart, sailing in place, kinds, the zoo.
- [Light-pool readability experiment](light-pool-readability.md): Default-off creature readability inside the witch's light pool, investigation and review evidence requirements.
- [The Making Of](making-of.md): The static site about how the game was made.
- [The music](music.md): The music engine, its style, sections and arc, the singer, the labs and studio, samples.
- [Two-browser prototype](online-prototype.md): The separate two-browser prototype: local relay, host authority, joining, checks and current limits.
- [Performance](performance.md): The View's build in slices, the start's shaders, the stall hunt.
- [The run](run.md): The phases of a run, the opening and the party spell, the clock, her controls and the camera, waves, knockouts and the party's end.
- [Save slots](save-slots.md): Independent progress and settings storage, legacy migration and save-format guards.
- [Sound effects](sound.md): The synthesised sound effects, babble and whale song, the mix.
- [Two-client telephone proof](telephone-proof.md): The explicit two-client telephone proof, default-off switches, allocation and evidence requirements.
- [Testing tools](testing.md): The full smoke test, proof shots, CI, the quick smoke, music and pause checks, and which check to run when (`config/checks.json`).
- [The view](view.md): What the renderer draws over the world: tilt-shift, the ground and its hills, ley lines, the sky and moon, smoke, pops, the debug overlay and test sliders.
- [The witch's art](witch-art.md): The witch generator, the party witches and their pair poses, her lean cycle.
- [The world's art](world-art.md): Area types and recipes, layouts, flora and trees, props and scenes, party objects, the dancefloor and soundsystems, paths, the art style, the pixel wind.

## The glossary

Literal, stable names for the parts of the game, as Ed and the builders agree them (the game's own terms are in `DESIGN.md`'s
glossary; these are the prototype's), by note.

### [Art checks](art-checks.md)

- Art on pull requests
- Style bible
- Bold sigils
- The witch's poses

### [Balance baselines — v5655 rules](balance-baselines.md)

(no entries: its tools and checks only)

### [Real-rules reports and legacy coverage](balance-report-coverage.md)

(no entries: its tools and checks only)

### [Balance study follow-up](balance-study.md)

(no entries: its tools and checks only)

### [Wide, shallow balance survey — design v1](balance-survey-design.md)

- First dispatch is the 24-shard wave 1 below, not the 190-shard full envelope.

### [Balance](balance.md)

- Written report retention
- Compressed log bundles
- Structured log records
- Log recovery
- Input recording
- Paused playtest comments
- Legacy models retained (2026-10-29, #1459, coordinator decision).
- Fighting value (F)
- Population growth
- Strength
- Creature momentum
- Berry cost
- Pacing variants
- Power meter
- Playtest log
- Balance simulator
- Bot / bot game
- Bags:
- Lone shooters
- 7 species/ages can't be stunned by one witch alone.
- Changed on 2026-10-29, live:
- Ed's direction:

### [Cauldron collection and brewing preview](cauldron.md)

- Where mushrooms grow

### [Config files](config.md)

- Tuning file
- Style file
- Link switches
- Knob docs
- Checks registry
- Changelog fragments

### [Creatures' art](creatures.md)

- Stiltwalkers
- Mesh creature
- Sleeping legend
- Asleep / nap
- Genome
- Template
- Material mask / palette row
- Surface texture
- Evolution kit
- Body profile
- Spine
- Body knobs from Ed's review
- Expression
- Open jaw
- Silhouette check
- Live rig
- Ground contact
- Stride and planted feet
- Gait
- Asleep
- Sizes
- Nothing else
- Checks

### [Deploys](deploys.md)

(no entries: its tools and checks only)

### [Expert search: implementation and fairness audit](expert-search.md)

(no entries: its tools and checks only)

### [Creatures in play](gameplay.md)

- Combat waiting movement
- Waiting under her
- Big teams' shorter rounds
- Roles decided in advance
- Waiting rings and the 128 rate
- Attack target identity
- Sheltered attack effects
- Momentum class selection
- Accepted attack outcomes
- Talk / invite
- Letters' reach
- Bubble sight
- Babies on her leash
- Followers in the treehouse
- Runestone stack
- Soundsystem spell / cast
- Loose sigil
- Legend tether
- Chain drag
- Taut chain
- Commanded feeding
- Won ones out of the way
- Follower buffs
- Sigil stack
- Deliberate hold
- Sigil transition
- Rank sigils
- Sides and sizes
- Colour grammar
- Stone stack
- Spell spot
- Sigil motes
- Cast ring
- Conversion
- Chains
- Party animal
- Combat
- Attack grammar
- Ranged aim
- Siege
- Wild watch / chase
- Enraged
- Swoop
- Area legend / sleeping legend
- Legend circle explainer
- Happy legend
- Debug arena
- Fight Arena
- Wild watch
- Dream / quest
- Legend clearing
- Legend area
- Friendly area
- Posse / travelling
- Conga dancer
- Wild / happy / leashed / enraged
- Runaway
- Restless / angry legend, relic
- The challenge circle hidden till the party

### [The treehouse and its house](house.md)

- The house one room
- No edge at the Terrace
- Telephone
- Landing cooldown
- The current layout
- Current brewing authority (Ed, 2026-10-31):
- Mushrooms and brewing
- Mushroom kitchen artwork
- The dressing stations
- Treehouse
- Arriving
- Treehouse deck
- The house
- The treehouse's rooms
- The oak
- Furniture: size, freestanding, mess and layout
- The stations regrouped
- Station menus
- No ∅ cards
- Starting bags
- Found bags
- Bag names
- Bag preview
- Bag accuracy
- Pierce
- The Clutch
- Chain
- The Messenger
- DJ booth
- Records
- Bag design
- Use prompt
- Wake-up keys
- Sleep eyelids
- The Studio's instruments
- Finds / travel trunk
- Find area
- Challenge area
- Find sets
- Sleeping before the party
- Finds pool
- The broom's stations
- Workshop
- Invitations and brooms / her night's kit
- Broom parts / slots
- Sets
- Broom part find
- Telescope
- The great oak's crown
- Crown whole / Terrace as a room
- Forest behind the house
- Finds dev control
- Hats and brooms
- Guidance pins

### [Islands and the journey](island.md)

- Island growth / island shape
- Land map
- Archipelago
- Lakes
- Biome forests
- Beach
- Island
- Master curve
- Island sizes by phase
- Journey art kit
- Kind table / roster / island by kind
- Sea chart
- World seed
- Remoteness
- Sail in place
- Zoo

### [Light-pool readability experiment](light-pool-readability.md)

(no entries: its tools and checks only)

### [The Making Of](making-of.md)

(no entries: its tools and checks only)

### [The music](music.md)

- Potion isolation
- Music style
- Banger mode
- Haunted
- The composer
- The dance way
- Bass register and patterns
- Dance leads
- Section
- Boot-up
- Form
- Night's set
- Arc
- Beat clock
- Music mood
- FOF voice
- The singer's redesign
- Music Lab
- The singer's A/B
- The Chimera singer
- Music Studio
- Live Music Lab
- Music ahead
- Music's load
- Voices
- The alto set
- The Chimera set
- A/B renders

### [Two-browser prototype](online-prototype.md)

(no entries: its tools and checks only)

### [Performance](performance.md)

- Smoke veil readback (PR1558, pending hardware proof)
- The whole island at load
- House route profiling
- Startup bundle baseline
- Crash journal budget
- Slow-frame summaries
- The sail's loading against its two animations
- The build's slice under the zoom
- The dive's load order
- Reused surface roughness (#1464, 2026-10-30):
- Exact travel art profiles (2026-10-30, #1464):
- Ordinary-play scenery stalls
- Travel evidence and budgets
- Cached bare sigils
- The sail's terrain relocation
- The View's build in slices
- The start's shaders
- The stall hunt
- The boot freeze
- The challenge's 128-animal pack
- The zoo's cost
- The ground's area texture
- Like with like
- Quads faded whole
- The GPU memory budget
- Quality ladder
- Palette-indexed art
- Sail take-off freeze

### [The run](run.md)

- Fresh game link
- Cold load link
- What's new in Settings
- Direct play after loading
- The phases of a run
- Bedroom
- Loading screen
- The Cast
- At the Decks
- Step-off
- First Speaker
- The Boot
- First Countdown
- Wave One
- The Party's Over
- Game clock
- The opening
- Party spell
- Decks' analyser ring
- Nightie / clothes pile
- Partified
- Wave
- String lights
- Partified border
- Sim step
- Witches
- Knockout
- Party's over / afterparty
- The world asleep before the party
- Dropped hat
- Controls
- Bindings
- Bindings API
- Settings page
- Pad layout
- Screen shake
- Glide
- Resting 💌s
- Aim reticle
- Action bar

### [Save slots](save-slots.md)

- Save slot storage
- Single-save migration
- Slot switching
- Compatible nights
- Save format guards
- Compatible mushroom extension (PR #1523)
- Borrowed visits (PR #1538)
- Deleting saves and Reset everything
- Fresh game

### [Sound effects](sound.md)

- Night Vision and Heat Vision audio
- Cauldron plop
- Sound effects
- Babble
- Audio capacity test

### [Two-client telephone proof](telephone-proof.md)

(no entries: its tools and checks only)

### [Testing tools](testing.md)

- Identical-tree release validation reuse
- Shared still capture harness
- A quick proof shot
- Publishing previews

### [The view](view.md)

- Elapsed-time view easing
- Heat/refraction preview
- Dodge echoes
- Night and Heat Vision
- Potion perception
- Layered magic
- Magic mock (stage 0 only)
- Pixel snap
- Stump wisps
- Tilt-shift
- Debug overlay
- Test sliders / pause page
- Default look
- Smooth effects
- Loading mist
- The dive's look
- Pop
- Crawl
- Path network
- Decor
- Rolling ground
- Ley lines
- Rainbow wave
- Edge pointers
- Unlit
- Ride
- Bend
- Smoke
- Slowed time (its look)
- Reveal / places kept clear
- Sky
- Constellation
- Moon
- Cooldown trail
- Trail colours
- Tree normal maps switch
- Tree normal directions
- Tree normal directions: never waited for

### [The witch's art](witch-art.md)

- Party witches
- Pair poses
- Witch genome / witch generator
- Lean cycle

### [The world's art](world-art.md)

- Collectible mushroom art generator
- Area type
- Wall objects, small objects, big objects (legacy set pieces)
- Layout
- Area blend
- Modern relics
- World decorations
- Detailed sigils
- Party relics
- Country pieces
- Scene
- Party objects
- Attack effects
- Attack look
- Spell glow
- Colour temperatures
- Path kinds
- Path looks
- Path bump maps
- Hero dancefloor
- Soundsystem generator
- Dancefloor speakers
- Tufts
- Sway mask
- Pixel wind
- Tall pieces
- Tree species
- Area flora
- Plant genome
- Art style / art pixel
- Prop generator
- Great stump
- Stone keep-clear zone
- Site paths
- Stone spacing
- Site gaps
- Set-piece generator (legacy art)
- Area recipe
- Area folder
- Snow crowns
- Top half / bottom half
- Island sigil
