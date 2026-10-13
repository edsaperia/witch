# Legend audit (awake legends)

Ed's rule: "it just needs to emphasise the thing that makes that creature unusual", and "we need to come up with more ideas for legends than just they have trees on their backs".

Sources: `art/genome/species.js` (`legend: [...]`, and `levels[3]` evolution kits, which replace the list) and `art/creatures3d.js` (`quad3d` lines ~372–392, the species builders, `evolve3d`, `crown3d`, `crystals3d`, `backTree3d`). The sleeping forms (`art/legends.js`) are out of scope.

Every legend already gets glowing eyes (`MAGIC2`), glow motes and its legend scale, so those don't count as a signature. 33 species in the file; no raccoon or armadillo record yet.

## 1. Legend audit

| species | legend today (from the code) | own trait? | repeat? |
|---|---|---|---|
| wolf (kit) | shoulders twice its hips, spiky mane along back and belly, pale spirit-fire wisps on the mane, frost muzzle | partly (bulk yes; nothing of the howl or the pack) | mane/flames, wisps |
| fox (kit) | kitsune: seven tails fanned up like flames with fox-fire tips, ruff, white mask, stone prayer beads | yes | (ruff, shared with ram) |
| badger (kit) | low as a boulder, five standing stones on its back with moonlit runes, stone claws, glowing blaze, moss patches | partly (claws and stripe yes; stones are "things on its back") | things on back (moss) |
| boar (kit) | head-down battering ram: huge curling tusks, a long twisted horn, flame wisps off tusks, horn and mane, eye glint under the hump | yes | mane/flames, wisps |
| stag | `antlersGlow`: antlers 1.15× and glowing | yes | glowing antlers (elk) |
| hare | `jackalope`: small antlers on its head | no (ears, speed) | antlers |
| owl (kit) | wings half spread as a moonlit cloak, tufts swept back like horns, ring of glowing eyes round its disc | partly (eyes, disc yes; ring is generic) | eyesRing |
| bear | `moss`: leaf mats + 3 little trees on its back, glowing dots | no | moss (trees on back) |
| hedgehog | four glowing crystals among its spines | partly (spines → crystals) | crystals |
| squirrel | `starTail`: its tail drawn as a starry tail | partly (tail yes; leaps, hoarding no) | starTail |
| toad | a glowing crown on its head | no (frog-prince cliché) | crown |
| otter | `ribbons`: three glowing ribbons streaming off its back | no (swimming, holding hands, tools) | ribbons |
| lynx | `mane`: seven flame-masked glowing flats from head down its back | no (ear tufts, eyes, paws) | mane/flames |
| elk | `antlersGlow` + `moss`: glowing palm antlers, little trees on its back | partly (antlers yes; trees no) | glowing antlers, moss |
| raven | `wings` (spirit wings) + `eyesRing` | no (cleverness, shiny things, omen) | wings, eyesRing |
| bat | `wingsBig`: wings 1.5× in glowing membrane and bones | partly (wings; not the ears, echolocation, hanging) | wingsBig |
| mole | a glowing crown | no (digging claws, blindness, molehills) | crown |
| beaver | `moss`: trees on its back | no (teeth, flat tail, dams) | moss (trees on back) |
| stoat | `ribbons` + `mane` | no (ermine winter coat, hypnotic dance, slinking) | ribbons, mane/flames |
| snail (kit) | four-turn spiral tower, buttressed, mud-caked, six little trees and fungi on its whorls, glowing mouth, long glowing-tipped stalks | yes (shell) | moss (trees on back) |
| ram (kit) | bronze double-spiral horns with thorns, brambles and berries in shaggy fleece, ruff | yes | (ruff, shared with fox) |
| woodlouse (kit) | fortress: spiked shields for plates, moonstones along its spine, dry leaves in its plates, whip feelers | yes (plates) | crystals (moonstones) |
| snake | `wings`: two spirit wings | no (coils, shedding, fangs) | wings |
| moth | `wingsBig`: wings 1.45× in glowing membrane | partly (wings; not eye spots, antennae, the flame it's drawn to) | wingsBig |
| pine marten | `mane`: flame crest | no (agility, bib, treetop hunter) | mane/flames |
| salamander | `flames`: same flame crest as the mane | partly (fire myth, not its warning spots or regrowth) | mane/flames |
| newt | `crystals` along its back | no (crest, breeding colours, regrowth) | crystals |
| heron | `wings` listed, but `heron3d` draws no legend feature: only scale and glowing eyes | no (stillness, stilts, dagger bill, the strike) | none drawn (glow only) |
| meerkat | walking: glowing eyes only (its flame crest dropped, 2026-10-13); sitting up (`sentinel3d`): searchlight beams from its eyes | yes (the lookout) | — |
| glow-worm | `lantern`: a great glowing ball at its tail end | yes | — |
| spider | `eyesRing`: ring of glowing eyes on its head | partly (many eyes is real, but shared) | eyesRing |
| dormouse | `starTail` | no (sleep, curled ball, hazelnuts) | starTail |
| stag beetle | `horn`: jaws 1.3× and glowing + `crystals` on its back | partly (jaws yes; crystals no) | crystals |

**Flagged: 29 of 33** (fox, ram, glow-worm and the meerkat are clean). 14 "no", 10 "partly", 5 "yes but repeats".

### Repeated generic features

- **mane / flames** (flame flats along the back): wolf, boar, lynx, stoat, marten, salamander (6)
- **crystals**: hedgehog, newt, stag beetle, woodlouse (moonstones) (4)
- **moss / trees on back**: bear, beaver, elk, snail (shell trees), badger (moss + stones) (5)
- **wings / wingsBig** (spirit wings bolted on, or just bigger wings): raven, snake, heron (listed), owl (cloak), bat, moth (6)
- **eyesRing**: owl, raven, spider (3)
- **crown**: toad, mole (2)
- **starTail**: squirrel, dormouse (2)
- **ribbons**: otter, stoat (2)
- **glowing antlers**: stag, elk; plus hare's jackalope antlers (3)
- **flame wisps** (kit): wolf, boar (2)

## 2. Ideas (one signature each from what the animal is or does; ★ = recommended)

- **wolf**: ★ a howl made visible: head thrown back, three glowing rings of sound rolling up from its jaws, frost on its muzzle · a pack of four ghost wolves (pale, see-through, half its size) loping at its heels · a moon disc caught in its ruff, glowing behind its head
- **badger**: ★ a striped aurora: its two white face stripes run the length of its back as glowing bands that ripple · forelimbs swollen into huge spade claws, glowing at the tips, a spray of earth thrown behind · its sett: three tunnel mouths opening in the ground round it, lit from inside
- **boar**: ★ (keep the kit, drop the mane wisps) a churned furrow ploughed in the ground ahead of its tusks, clods flying · bristles risen into a ridge of iron spikes, sparking where they touch
- **stag**: ★ antlers grown into a vast branching candelabra twice its height, each tine tipped with a flame · velvet peeling from the antlers in glowing strips · antlers as a bare winter canopy with a few roosting birds
- **hare**: ★ ears three times its height, veined with light like leaves held to the sun · speed-blur: two after-images trailing behind it in fading pink · hind legs grown long and coiled like springs, mid-bound, its shadow far below it
- **owl**: ★ (kit, swap the eye ring for) a facial disc grown into a giant satellite dish of feathers with a glowing rim, eyes like two moons · silent wings edged with soft feather-fringes that dissolve into mist · head turned right round, a second face of glowing eyes on its back
- **bear**: ★ a hulking hump of muscle and a great paw raised, claws as long as its head, glowing amber · a honeycomb flank, gold dripping and glowing, bees as motes · salmon leaping in a glowing arc in front of it, one in its jaws
- **hedgehog**: ★ spines grown into a lance-forest, each quill twice its height and tipped with a pin of light, raised in a defensive bristle · curled half into a ball, quills fanned like a starburst halo · a leaf-and-apple pile skewered on its spines
- **squirrel**: ★ a tail grown into a vast curled question-mark plume, bigger than its body, with acorns glowing in its fur · cheek pouches bulging, a stash of glowing nuts buried in a ring round it · flying-squirrel skin flaps stretched between its legs like a sail
- **toad**: ★ a throat sac swollen into a great glowing balloon, pulsing with each croak · warts grown into a landscape of knobbed glowing nodules down its back · a long tongue snapped out in a glowing arc, a moth caught on its end
- **otter**: ★ floating on its back, a stone on its belly, paws joined round a glowing pearl · a stream flowing round its body as a curl of clear water, fish glinting in it · a raft of kelp and lily pads round it, a necklace of whiskers bristling wide, glinting with droplets
- **lynx**: ★ ear tufts grown into long black flame-shaped plumes, tips glowing · cheek ruff grown into a wide frosted beard framing its face · eyes as two lanterns, gold, slit pupils, light spilling down its face
- **elk**: ★ palm antlers grown into vast flat dishes holding pools of water reflecting the moon · a dewlap/bell hanging long under its throat with glowing hairs · hooves spread like snowshoes, with frost spreading round them
- **raven**: ★ a hoard of shining trinkets (keys, rings, coins, a spoon) caught in its ruff and orbiting it · a single huge eye in its forehead (Odin's) and two ghost ravens at its shoulders · a raven's shadow cast far larger than it, outlined in faint glow
- **bat**: ★ ears as tall as its body, ribbed and glowing, with sonar rings pulsing out from its mouth · hanging upside down from a glowing stalactite of its own · a cloud of small bats circling it like a storm
- **mole**: ★ a crown of earth (a molehill heaped up on its head) and a halo of tunnels: glowing lines under the ground round it · forepaws grown into two huge pink spade hands, glowing palms · star-nose: its snout opened into a flower of 22 glowing tendrils
- **beaver**: ★ two great orange incisors, glowing, and a log in its jaws chewed to an hourglass · a flat tail grown into a broad paddle carved with patterns, lit · a dam of sticks round it, water banked glowing behind
- **stoat**: ★ half in winter ermine: white sweeping back over its brown, tail tip pure black and glowing · its long body looped twice round itself like a knot, head and tail tip meeting · a long body curled in an S round a hare-sized egg
- **snail**: ★ a spiral galaxy shell: the whorls swirl with stars, the core bright, the mud and trees gone · a glowing silver slime trail running far behind it, crossing itself · eyestalks grown tall as a lamp-post, each eye a lit globe
- **woodlouse**: ★ (keep the kit, swap moonstones for) rolled half into a ball, plates as overlapping roof tiles, a door and window glowing in its side · fourteen legs, each tipped in light, rippling as a wave
- **snake**: ★ a shed skin: a ghostly glowing copy of itself sliding off its tail · coiled high in a tower of coils, hood spread · two fangs long as its head, dripping glowing venom
- **moth**: ★ eye spots on its wings opened into two staring glowing eyes · feathery antennae grown into huge fronds that glow · a candle flame floating ahead of it that it spirals round, dust trailing
- **pine marten**: ★ a cream bib grown into a glowing shield-shaped blaze down its chest · a long lithe body spiralling round a tree trunk it carries with it · bushy tail fanned and leaping mid-air between two branches
- **salamander**: ★ warning colours turned up: yellow spots grown large and glowing like coals on its black hide · a regrown tail of glowing new flesh, the old tail lying shed beside it · walking through a little pool of fire that doesn't burn it (keep only if Ed wants the myth)
- **newt**: ★ a breeding crest grown into a tall wavy sail along its back and tail, edged in orange glow · its belly's orange spots shining up through the ground like a lamp · a regrown limb sprouting glowing buds
- **heron**: ★ standing on one leg, stilt legs grown tall as a tree, its reflection in a pool below it · a dagger bill grown into a long lance with a fish of light speared on it · neck coiled in a spring-tight S, a pale grey plume trailing from its head
- **meerkat**: see section 4
- **spider**: ★ a web behind it like a stained-glass rose window, dew drops glowing on it · eight legs grown into long arches like a cathedral · an egg sac on its back with small glowing spiderlings
- **dormouse**: ★ curled asleep in a glowing hazelnut shell, tail wrapped round · a nest of grass woven like a lantern, light inside · a sleepy halo of Z-shaped glowing motes, eyes half shut
- **stag beetle**: ★ (drop the crystals) jaws grown into great branching antlers like a stag's, glowing at the tips · wing cases split open, membrane wings beating behind · a shell gloss like dark metal mirroring the moon

## 3. Raccoon (cold mossy rainforest, streams; washes its food)

- **A. The bandit (★ recommended)**: the black mask grown into a wide lantern-bright domino band across its face, white brows flaring up like eyebrows of light. Its dark hands enlarged and glowing, fingers long and spread, and every step leaves a shining handprint behind it on the ground that fades.
- **B. The washer**: sitting up at the edge of a glowing pool that it carries with it, rubbing something in its clever hands. Water curls up between its fingers in a lit spiral, and what it washes is a moon-bright pebble; drips glow as they fall.
- **C. The hoarder**: a hoard of trinkets (a key, a bottle cap, a spoon, a ring, a broken watch, a shell) orbiting it in a slow tilted ring, each glinting. Its ringed tail is grown long and the rings glow alternately, the tail curled up behind it like a banner.

## 4. Meerkat and armadillo

- **Meerkat**: already the right idea when it sits up (`sentinel3d`: searchlight beams from its eyes); ★ make it towering: sitting up as tall as a lookout tower, long neck, on a heap of sand, searchlight eyes sweeping, a horizon-scanning brim of light round its head like a lighthouse lamp · drop the walking `flames` crest; walking, a sentry's sun-shade (dark eye patches) glowing like goggles.
- **Armadillo**: Ed's choice (rolls into a glowing ball with glowing seams between its bands, rolling as it moves) needs no change; for scale, its bands broad as roof tiles, the seams bright, a trail of pressed-down earth behind it.
