# Follower buffs and challenge areas

Design note from Ed's discussion with the coordinator, 3 Nov 2026. Quotes are Ed's words. Nothing here is built yet; this is the
brief that builders will work from once Ed approves it.

## Why

A playtester asked "how do I progress in this game?". She wanted unlocks but didn't know how to look for them, and searching the
forest felt random. Ed: "the map level meta is weak; at the moment creatures don't feel very different to each other, and the
witch doesn't get more powerful during runs themselves." The old legend boons were removed on 28 Oct (commit 0780c44ce): "The
ones that increased DPS felt fun but were insanely strong. The ones that didn't increase dps felt underwhelming."

## 1. Follower buffs

- **Leashed adults give the witch a buff themed on their kind.** Only adults: "Only adults, yes."
- **One buff per kind, and different kinds stack.** Two bears give one bear buff; a bear and a wolf give both. Ed: "since we
  have one per animal type, different animal types STACK!"
- **Small and capped:** about 10% each.
- **Visible:** an icon to the right of the creature's sigil in her stack.
- **Personal only.** Each buff affects her dashing, her movement or her inviting. Ed: "Changing your carrying capacity or
  affecting your leashed creatures feels like it will interact badly with balance and feel underwhelming at the same time."
  Special moves are in scope: "Perhaps you can heal your creatures, or have special moves (dashes stun, etc)."
- **Only while leashed.** A creature parked at a placed sigil gives no buff and doesn't anchor her: "no. only when leashed."
- **A small set of buffs, one per attack family.** The 64 kinds already fall into eight attack families
  (config/species-attacks.json):

  | Family | Kinds now | Buff (draft, for Ed to edit) |
  |---|---|---|
  | melee | badger, stoat, wolf, lynx, ram | dash ~10% further |
  | bolt | 24 kinds (fox, owl, raven, tiger, …) | invites fly ~10% faster |
  | area | 16 kinds (hare, boar, bear, lion, …) | dash landing gives a small knockback ring |
  | lob | squirrel, toad, otter, flying squirrel | invites arc over obstacles, ~10% longer reach |
  | runner | beaver, penguin, cheetah, rhino, … | ~10% faster on foot |
  | zone | snail, crocodile | dash leaves a short slowing trail |
  | beam | salamander, unicorn, sphinx, frostwyrm | every 5th invite pierces |
  | mine | beetle, rattlesnake | dashes stun briefly |

  Ed named "chargers, hoppers, etc"; if a movement-style grouping reads better than attack families, the table moves to that.
- **Fantastic animals** (one per biome: griffin, unicorn, sphinx, frostwyrm, …) "do something rare and crazy": each has its own
  unique buff on top of its family's, e.g. every 5th invite fires a ring. Ed liked that ring effect from the old boons.

### Anchor chains

- "adults are slow and heavy; you should be able to move within a reasonable distance from them (the size of a typical fight),
  but when the chain gets to its max length you can't move further until they move."
- **She can't take off while an adult is leashed.** So a strong following trades away flight for power.
- The chain length is a knob, defaulting to about a fight's width.

## 2. Challenge areas

- **One per map.** It is off the ley route, and paths lead to it (the path network, PR in progress, places the night's find at
  its own area's site; that area becomes the challenge area). The telescope shows it.
- **The place, where a stump would be:** "a large stone floor circle (like the legend circle) with the glowing sigil of the
  island carved into it, with a circle of stone columns around the edge (we already have art for this)."
- **Its pack:** one adult and one youth of every creature kind on the island.
- **Clearing it:** when they're all invited or have run off, she casts the music spell on the circle. The sigil and columns light
  on the beat and a small dancefloor rises. The pack become happy animals that party there and can't be leashed.
- **Reward:** the find. Each island phase (early, mid and late islands) and each biome has its own set of finds. Once she owns a
  set, the reward is a flask instead.
- **Timing:** only before the final wave.
- **No boons from challenges.** Follower buffs replace them.

## 3. Later: committed players (parked)

Not powerful items, which should come early to help new players and give variety. Instead:
- house trophies and cosmetics, including the undesigned card table and tea table;
- harder play: streaks, other multi-night difficulty;
- specific sequences of islands to complete, perhaps secret ones (the telescope's constellations could hint at them).

## Open questions for Ed

1. The buff table above: keep attack families, or group by movement style ("chargers, hoppers")? Edit the buffs.
2. What does each fantastic animal do? (a list of the 8 to fill in)
3. Anchor chain length: about 30 m (the current `combat.defendRadius`)?
4. Does a cleared challenge area count toward winning the island, or is it purely optional?

## Build order once approved

1. Anchor chains and no take-off with an adult leashed.
2. The buff system: one per kind, stacking, icons in the stack, the family table as knobs.
3. Challenge area: the circle, the mixed pack, casting, the dancefloor, the find and flask reward, find sets per phase and biome.
4. Fantastic animals' unique buffs.
