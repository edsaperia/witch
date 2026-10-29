# Finds: the permanent-upgrade style guide

Ed (2026-10-23): "For the permanent-upgrade finds … while they are different objects, we should make a styleguide for their design so that it's easy for players to recognise when they've found one. e.g. they should have consistent size and lighting design, and should be easy to see on the ground even when in the middle of dense forest."

A **find** is the night's one permanent upgrade (`src/rules/finds.ts`). There's one a night, drawn from everything she hasn't found yet. It lies on the ground in a wild area's woods, under the canopy, and is hinted by a constellation through the telescope. She takes it with E while the party's on. Every kind of find (wearables in a travel trunk, broom parts in a wreck, and hats, bags and records to come) follows this guide, whatever its object.

> **Status: Ed's rules** (2026-10-23, his answers to the proposal's four questions, and on size: "the whole find is flask-sized"). Applied to every kind in `art/country.js` (the find pieces), `rules/finds.ts` (`FIND_KINDS`' pieces) and `render/view/finds.ts` (the patch and the light). The proof shots are in [`finds/`](finds/).

## The master list

Written from `FIND_KINDS`, so it can't drift: `src/rules/findsList.test.ts` fails if it differs. After adding a kind or an item, run `UPDATE_FINDS=1 npx vitest run src/rules/findsList.test.ts`.

<!-- finds:start -->
### wearable: found as a bundle (8)

- **Hair** (drawn as `find-bundle`): Mohawk (`hair-mohawk`)
- **Face** (drawn as `find-bundle`): Sunglasses (`shades`)
- **Jacket** (drawn as `find-bundle`): Sequin jacket (`top-sequins`), Cape (`top-cape`), Mesh top (`top-mesh`)
- **Cloak** (drawn as `find-bundle`): Long cloak (`cloak-long`), Hooded cloak (`cloak-hooded`)
- **Shoes** (drawn as `find-bundle`): Chunky trainers (`shoes-chunky`)

### hat: found as a hat (14)

- helmet (`helmet`), drawn as `find-hat`
- healing (`healing`), drawn as `find-hat`
- harvest (`harvest`), drawn as `find-hat`
- dowsing (`dowsing`), drawn as `find-hat`
- sentry (`sentry`), drawn as `find-hat`
- bramble (`bramble`), drawn as `find-hat`
- slingshot (`slingshot`), drawn as `find-hat`
- gathering (`gathering`), drawn as `find-hat`
- mine (`mine`), drawn as `find-hat`
- lullaby (`lullaby`), drawn as `find-hat`
- cyclone (`cyclone`), drawn as `find-hat`
- nursing (`nursing`), drawn as `find-hat`
- edgeseer (`edgeseer`), drawn as `find-hat`
- routeseer (`routeseer`), drawn as `find-hat`

### bag: found as a bag (1)

- backpack (`backpack`), drawn as `find-bag`

### part: found as a broom part (9)

- Missile nose (`missile`), drawn as `find-part-missile`
- Curled tip (`curl`), drawn as `find-part-curl`
- Hobby-horse head (`horse`), drawn as `find-part-horse`
- Jet-bike fairing (`fairing`), drawn as `find-part-fairing`
- Ladder (`ladder`), drawn as `find-part-ladder`
- Canoe hull (`canoe`), drawn as `find-part-canoe`
- Jet nozzles (`nozzles`), drawn as `find-part-nozzles`
- Twig bristles (`twigs`), drawn as `find-part-twigs`
- Oar blade (`oar`), drawn as `find-part-oar`
<!-- finds:end -->


## The find signature (Ed's rules)

Every find carries the same three things, whatever its object, so a player who has seen one knows the next: **a clear patch, its own light, and one size.** Ed (2026-10-23): "clear patch, its own light, rules on size". Nothing else marks it: no wisp over it, no opening in the canopy, no shaft of moonlight.

### 1. A clear patch

- A round patch of bare ground about **1.3 m** in radius round the find: no tufts on it, and the cover trodden short a little past it (the ground cover's `uClear`, as round a placed sigil). The forest floor's own earth, so the find and its light read against the tufts round it.
- Tufts and ferns grow right up to it but never over it, so the find's outline is never broken.
- It lies where `placeTrunk` puts it: in a wild area's woods, under the canopy, off its clearings and its legend's circle, clear of the relics.

### 2. Its own light: pale gold-white

- A **point light** at the find, low (about 0.6 m up), reach about **7 m** at strength 4 (the tuning's `lights.find`, live; 2.4 read only faintly in the fern forest at 8 m, 4 clearly), in **pale gold-white** (about `#fff5d6`, RGB 1, 0.96, 0.84 in the light's colour): whiter and brighter than anything round it.
- **Brighter and whiter than her lantern.** Her own light is warm amber and fills the ground round her; a warm glow beside her vanishes in it (the first mocks, below). The find's light must be clearly the brightest and the whitest thing on that ground, so it reads as "not mine" even with her standing a few metres off. Tune it in the fern forest, the worst case.
- A slow, slight breath (about ±10% over 2.4 s), never a flicker: fire flickers fast and warm, a find glows steady and pale.
- It's one light against the budget (`lightBudget`), like a lantern: fine on Ed's Intel UHD.
- **No other light source uses this colour.** Party amber, the moon's blue, each area's neon, a hit's white flash and her lantern are all taken: pale gold-white is the finds'.
- Nothing on the object itself glows (no emissive pixels); it's lit by its light.

### 3. One size: the whole find about a flask

- **The whole find is one small object, about 0.25 to 0.35 m tall** at the witch's scale (Ed: "approx the size of a flask"; she's about 1.7 m), at most about 0.45 m across. **No setting round it:** no trunk, no wreck scene, no cairn, stump, log, fairy ring or fingerpost. One object, on its patch, in its light.
- Drawn at one scale, `FIND_SIZE` (0.6 of the witch's scale) in `art/country.js`: about **6 to 8 art pixels tall** at the game's art pixel. That's tiny: from 20 m she spots the patch and the light, and the object tells her what it is only close up.
- **Each kind's object, one family** (`art/country.js`, `find-*`; `FIND_KINDS` names them):
  - **Clothes** (hair, face, jacket, cloak, shoes: the wearables): a **folded bundle**, three folds of cloth (`find-bundle`).
  - **Bags** (the bum bag and the backpack): a **little leather bag** with its strap looped up (`find-bag`).
  - **Hats**: a **pointed hat** lying on its brim (`find-hat`; its colours its spell's, with #1044).
  - **Broom parts**: **the part itself**, short, leaning on the ground, cold and in faded paint, from `art/brooms.js`'s own kinds so it looks as it will on her broom (`find-part-<id>`: missile nose, curled tip, hobby-horse head, jet-bike fairing, ladder, canoe hull, jet nozzles, twig bristles, oar blade).
- **The family's marks:** every one tied with the same **pale ribbon** (a cream band and a little bow: the finds' own mark, the hat's as its band); lit on its top, dark at its foot; nothing on it glows (its light is the game's).
- Baked at its size and drawn at scale 1 (never a fractional draw scale: section 10 of `docs/ART-GUIDE.md`). `node art/check.mjs`'s **finds** task checks every kind: each drawn, standing, 0.1 to 0.26 of her height and 0.4 of it across at most, nothing glowing, the ribbon on it, no two alike.

### Taken

- Once she's taken it, the object, its patch and its light all go: the ground grows back over, the forest is dark there again. The same once the party's lost.

### 4. From the treetops: hidden

- A find can't be seen from the treetops (Ed's answer): its light lights the ground under the canopy, and nothing rises above the crowns. **The constellation through the telescope gives the way**; she comes down into the woods to look for it.

### In every biome

- **Snow:** pale gold-white on white snow loses its contrast; keep the patch's bare earth (or dark ice) under it, so the light shows on a dark floor.
- **Jungle and the densest woods:** the patch and the light are the whole read. The fern forest is the test.
- **Volcanic:** lava and fire are orange-red and flicker; the find's light is paler, whiter and steady.
- **In a partified area:** the party's light is warm amber; the find's stays whiter and above it in value.

## The proof shots

[`finds/proof.jpg`](finds/proof.jpg): seed 123, at night, the find in the densest spot of the fern forest (a wearable: the bundle) and the muddy forest (a broom part: the missile nose), placed by `?spawnfind=` (#1046) and moved there; the witch on the ground 8 m and 20 m from it (the find to her east, a little toward the camera, so it's on screen). Left: today's `claude/prototype` (the trunk, the wreck); right: this branch, with the light at strength 4. Beside each, **what the find adds**: the same paused frame with the find and without it (moved away), their difference brightened four times, so it shows the find alone. (The fern forest moves a little even paused: the speckle all over its maps is that, not the find.)

| Pixels the find changes | today | the guide's find |
|---|---|---|
| fern forest, 8 m | a small spot by the trunk | **a pale pool of light** beside her |
| fern forest, 20 m | a fleck | **a pale pool of light** |
| muddy forest, 8 m | 3,314 (156 × 63) | **23,630 (677 × 338)** |
| muddy forest, 20 m | a 3 × 3 speck | **4,813 (39 × 72)** |

What it shows:

- **The light carries the read.** At 8 m in both forests and at 20 m in the fern forest the find's light is a pale pool of its own, apart from her lantern's warm one. At 20 m in the muddy forest it's faint, a small patch through the crowns.
- **The object itself doesn't show** at either distance: at about 6 to 8 art pixels, under the crowns, it's lost. The light and the clear patch are what she spots; the object, close up.
- **Strength 2.4 was too weak** (an earlier run): in the fern forest it read only faintly at 8 m. 4 is the default (`lights.find` in the tuning file; `?set=lights.find.strength=<n>` tries another for one load).
- **From the treetops** it's meant not to show (as Ed asked): the light sits 0.6 m up and reaches 7 m, under the crowns. These shots are all on the ground; the treetops weren't shot this round.

## How the rules were chosen

The first mocks ([`finds/contact.jpg`](finds/contact.jpg): today, A a gold wisp over the find, B a shaft of moonlight, C the wisp with the canopy opened over it; fern and muddy forest, 8 m off) found:

- today's trunk and wreck invisible in dense forest, on the ground and from the treetops;
- a warm glow lost beside her own warm light in the fern forest (so the light is whiter and brighter than her lantern);
- the canopy opening making little difference at 8 m, and the moon shaft not showing from the treetops (so neither is in the rules);
- the objects' shapes never reading among the ferns (so the patch carries the read).

Ed chose the patch, its own light and a size rule; hidden from the treetops; pale gold-white; one size, about a flask.
