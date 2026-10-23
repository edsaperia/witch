# Finds: the permanent-upgrade style guide

Ed (2026-10-23): "For the permanent-upgrade finds … while they are different objects, we should make a styleguide for their design so that it's easy for players to recognise when they've found one. e.g. they should have consistent size and lighting design, and should be easy to see on the ground even when in the middle of dense forest."

A **find** is the night's one permanent upgrade (`src/rules/finds.ts`). There's one a night, drawn from everything she hasn't found yet. It lies on the ground in a wild area's woods, under the canopy, and is hinted by a constellation through the telescope. She takes it with E while the party's on. Every kind of find (wearables in a travel trunk, broom parts in a wreck, and hats, bags and records to come) follows this guide, whatever its object.

> **Status: proposal.** The signature below is the art director's recommendation. Ed's choices (see the questions at the end) are still to come, and nothing is built until he answers. The mocks are in [`finds/`](finds/).

## The master list

Written from `FIND_KINDS`, so it can't drift: `src/rules/findsList.test.ts` fails if it differs. After adding a kind or an item, run `UPDATE_FINDS=1 npx vitest run src/rules/findsList.test.ts`.

<!-- finds:start -->
### wearable: found in a trunk (10)

- **Hair** (drawn as `travel-trunk`): Mohawk (`hair-mohawk`)
- **Face** (drawn as `travel-trunk`): Sunglasses (`shades`)
- **Jacket** (drawn as `travel-trunk`): Sequin jacket (`top-sequins`), Cape (`top-cape`), Mesh top (`top-mesh`)
- **Cloak** (drawn as `travel-trunk`): Long cloak (`cloak-long`), Hooded cloak (`cloak-hooded`)
- **Shoes** (drawn as `travel-trunk`): Chunky trainers (`shoes-chunky`)
- **Bag** (drawn as `travel-trunk`): Bum bag (`bumbag`)
- **Backpack** (drawn as `travel-trunk`): Backpack (`backpack`)

### part: found in a wreck (9)

- Missile nose (`missile`), drawn as `wreck-missile`
- Curled tip (`curl`), drawn as `wreck-curl`
- Hobby-horse head (`horse`), drawn as `wreck-horse`
- Jet-bike fairing (`fairing`), drawn as `wreck-fairing`
- Ladder (`ladder`), drawn as `wreck-ladder`
- Canoe hull (`canoe`), drawn as `wreck-canoe`
- Jet nozzles (`nozzles`), drawn as `wreck-nozzles`
- Twig bristles (`twigs`), drawn as `wreck-twigs`
- Oar blade (`oar`), drawn as `wreck-oar`
<!-- finds:end -->


## What the mocks showed

Seed 123, at night, in the densest spot of the fern forest and the muddy forest (26 trees within 12 m), the witch about 8 m from the find. The contact sheet is [`finds/contact.jpg`](finds/contact.jpg).

- **Today, both finds are invisible in dense forest.** The trunk is a small tan lump in the dark, and the wreck is the same. From the ground the crowns between the camera and the find cover it beyond the edge of her own canopy hole. From the treetops it's under the canopy by design (`placeTrunk` looks for cover). Nothing on either object says "I'm the special one".
- **A light alone isn't enough under a closed canopy.** A gold wisp over the find (treatment A) shows as a faint glow through the crowns. It works where the canopy is open, not in the thick of the wood, which is exactly where finds are placed.
- **The canopy has to open over the find** (treatment C). The witch already cuts a hole in the canopy round her. Widening it to take in a find within about 30 m shows the find in its own light, and the wisp then reads at once.
- **A shaft of moonlight (treatment B)** reaches above the crowns, so it would show from the treetops too. That would change the hunt (finds are under the canopy so you have to come down and look), so it's a question for Ed, not a default.

## The find signature (the recommendation)

Every find carries the same four things, whatever its object. A player who has seen one knows the next.

### 1. Size

- **Footprint:** 1.2 to 2.4 m across (13 to 26 art pixels at the default art pixel 3, 10.7 art pixels a metre).
- **Height:** 0.8 to 1.4 m (9 to 15 art pixels): about the witch's waist to her shoulder (she's about 1.8 m). It's big enough to stand above the tufts (8 to 13 px, up to about 1.2 m) and small enough to be a thing on the ground, not a building.
- **One scale for every kind:** a trunk, a wreck, a hat box and a record crate all sit in the same band, so size says "find" before shape does.

### 2. Light: its own small gold glow, one for every kind

- **A wisp:** a small orb of pale **find gold** (`#ffe6a8`, warmer and paler than the party's amber `#e8b46a` and nothing like the moon's blue-violet) hovers about 1.6 m over the find. It bobs a little (±0.12 m) and pulses slowly (a 2.4 s period, 75 to 100 %).
- **A point light** of the same gold under it (reach about 7 m) pools on the find and the ground round it. It's one light against the budget (`lightBudget`), like a lantern, and fine on Ed's Intel UHD.
- **A few motes** (at most 6 to 8 dots) rise from the find through the wisp, so it reads as alive, not a lamp.
- **No other light source in the game uses find gold.** It's the finds' own colour, as amber is the party's and white is a hit's.

### 3. Seen through the canopy

- **Within about 30 m on the ground, the canopy opens over the find** as it does over her (the same cutout widened to hold both, or a second hole), so the find is seen in its own light, not guessed through crowns.
- **From the treetops it stays hidden** (the recommendation): the constellation gives the bearing, and she comes down to search. Ed may want a faint glint through the canopy instead (see the questions).

### 4. Silhouette and contrast

- **A clear ground patch:** a ring about 1 m wider than the find, of bare trodden earth (the area's own floor, a step darker), with no tufts and no undergrowth on it. Tufts and ferns grow thick round it but never over it, so its outline is never broken.
- **A lit top, a dark base:** the object's own value darkest at its foot and lightest on its top, which catches the gold. Nothing on it glows but the wisp (the trunk's cloth and the wreck's hat stay unlit colours).
- **One unmistakable shape per kind**, from the treetop distance's 13 to 26 px: a trunk's box and arched lid, a wreck's broom handle at an angle, and for hats and bags their own box and strap. At 12 px each must still read as what it is.

### In every biome

- **Snow:** the gold reads warm on cold white. Keep the wisp's halo below white, so it isn't a hole in the snow.
- **Jungle and the densest woods:** this is what the canopy opening is for. Never place a find in a patch the opening can't clear.
- **Volcanic:** lava and fire are orange-red. Find gold is paler and yellower, and it *pulses slowly* while fire flickers fast, so the two never read alike.
- **The night mood and the party's light:** inside a partified area the party's amber is warmer and orange. Find gold sits above it in value and below the moon in saturation.

## Questions for Ed

See the REPORT for the multiple-choice questions and the mocks they refer to.
