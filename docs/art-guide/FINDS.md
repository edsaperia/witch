# Finds: the permanent-upgrade style guide

Ed (2026-10-23): "For the permanent-upgrade finds … while they are different objects, we should make a styleguide for their design so that it's easy for players to recognise when they've found one. e.g. they should have consistent size and lighting design, and should be easy to see on the ground even when in the middle of dense forest."

A **find** is the night's one permanent upgrade (`src/rules/finds.ts`). There's one a night, drawn from everything she hasn't found yet. It lies on the ground in a wild area's woods, under the canopy, and is hinted by a constellation through the telescope. She takes it with E while the party's on. Every kind of find (wearables in a travel trunk, broom parts in a wreck, and hats, bags and records to come) follows this guide, whatever its object.

> **Status: Ed's rules** (2026-10-23, his answers to the proposal's four questions), but for one still open: whether the flask size is the item alone, with its setting (a trunk, a wreck) allowed to be bigger round it, or the whole find (**pending**, below). Builders apply it: Echo the hats and bags (`FIND_SIZE` in `art/country.js`), Alpha the wrecks, Hotel and Golf the trunk. The proof shots are in [`finds/`](finds/).

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


## The find signature (Ed's rules)

Every find carries the same three things, whatever its object, so a player who has seen one knows the next: **a clear patch, its own light, and one size.** Ed (2026-10-23): "clear patch, its own light, rules on size". Nothing else marks it: no wisp over it, no opening in the canopy, no shaft of moonlight.

### 1. A clear patch

- A round patch of bare ground about **1.3 m** across its radius round the find: no tufts, no undergrowth, no small props on it. The forest floor's own earth, a step darker than its surroundings, so its edge reads against the tufts round it.
- Tufts and ferns grow thick right up to its edge but never over it, so the find's outline is never broken.
- It's placed clear of trunks (2 m or more from any) and off paths and clearings, under the canopy as `placeTrunk` places it now.

### 2. Its own light: pale gold-white

- A **point light** at the find, low (about 0.6 m up), reach about **4.5 m**, in **pale gold-white** (about `#fff5d6`, RGB 1, 0.96, 0.84 in the light's colour): whiter and brighter than anything round it.
- **Brighter and whiter than her lantern.** Her own light is warm amber and fills the ground round her; a warm glow beside her vanishes in it (the first mocks, below). The find's light must be clearly the brightest and the whitest thing on that ground, so it reads as "not mine" even with her standing a few metres off. Tune it in the fern forest, the worst case.
- A slow, slight breath (about ±10% over 2.4 s), never a flicker: fire flickers fast and warm, a find glows steady and pale.
- It's one light against the budget (`lightBudget`), like a lantern: fine on Ed's Intel UHD.
- **No other light source uses this colour.** Party amber, the moon's blue, each area's neon, a hit's white flash and her lantern are all taken: pale gold-white is the finds'.
- Nothing on the object itself glows (no emissive pixels); it's lit by its light.

### 3. One size: about a flask

- **The item: about 0.25 to 0.35 m tall** (Ed: "approx the size of a flask"), the same band for every kind. At art pixel 3 that's only **3 to 4 art pixels** (10.7 art pixels a metre), too small for any shape to read at the ground zoom: what she spots is the patch and the light, and the shape tells her what it is only once she's close.
- **Its setting** (the trunk the wearable lies in, the wreck round a broom part, a hat's box): **pending Ed's answer.** Either the setting may be larger round the flask-sized item (a trunk or a wreck at its own size, the item on or in it), or the whole find is flask-sized. Until he answers, builders keep the item at flask size and leave settings as they are.
- Baked at its size and drawn at scale 1 (never a fractional draw scale: section 10 of `docs/ART-GUIDE.md`).

### 4. From the treetops: hidden

- A find can't be seen from the treetops (Ed's answer): its light lights the ground under the canopy, and nothing rises above the crowns. **The constellation through the telescope gives the way**; she comes down into the woods to look for it.

### In every biome

- **Snow:** pale gold-white on white snow loses its contrast; keep the patch's bare earth (or dark ice) under it, so the light shows on a dark floor.
- **Jungle and the densest woods:** the patch and the light are the whole read. The fern forest is the test.
- **Volcanic:** lava and fire are orange-red and flicker; the find's light is paler, whiter and steady.
- **In a partified area:** the party's light is warm amber; the find's stays whiter and above it in value.

## The proof shots

Seed 123, at night, the find in the densest spot of the fern forest (the trunk) and the muddy forest (a wreck), the witch on the ground 8 m and 20 m off: today's find against the guide's treatment (the item drawn at flask size, the clear patch, the pale gold-white light), both from today's `claude/prototype` with a mock of the treatment (not this PR's code), the find placed by `?spawnfind=` (#1046). The contact sheet is [`finds/proof.jpg`](finds/proof.jpg).

_The shots are being taken; their notes follow._

## How the rules were chosen

The first mocks ([`finds/contact.jpg`](finds/contact.jpg): today, A a gold wisp over the find, B a shaft of moonlight, C the wisp with the canopy opened over it; fern and muddy forest, 8 m off) found:

- today's trunk and wreck invisible in dense forest, on the ground and from the treetops;
- a warm glow lost beside her own warm light in the fern forest (so the light is whiter and brighter than her lantern);
- the canopy opening making little difference at 8 m, and the moon shaft not showing from the treetops (so neither is in the rules);
- the objects' shapes never reading among the ferns (so the patch carries the read).

Ed chose the patch, its own light and a size rule; hidden from the treetops; pale gold-white; one size, about a flask.
