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
- **Visible:** an icon to the right of the creature's sigil in her stack.
- **Personal only.** Each buff affects her dashing, her movement or her inviting. Ed: "Changing your carrying capacity or
  affecting your leashed creatures feels like it will interact badly with balance and feel underwhelming at the same time."
- **Only while leashed.** A creature parked at a placed sigil gives no buff and doesn't anchor her: "no. only when leashed."
- **Six groups, by how each kind retreats** (art/creatures/<id>/creature.js `retreat`). Each group has one buff. Its stack
  count is the number of distinct kinds from that group leashed as adults, so different kinds stack and duplicates don't.
  Magnitudes are knobs.

  | Group | Kinds (★ fantastic) | Buff (Ed, 3 Nov) |
  |---|---|---|
  | **Climbers and fliers** (trees, branches, swirl) | cat, flying squirrel, jaguar, red panda, snow leopard, spider, squirrel, owl, raven, moth, griffin★, feathered serpent★ | an extra dash charge per stack |
  | **Darters** (zigzag, leapfrog, arcs) | bat, dragonfly, hare, meerkat, roe, ibex, marten, toad | faster movement |
  | **Stalkers** (freeze) | arctic fox, dormouse, heron, komodo, lynx, rattlesnake, salamander, snake, tiger, frostwyrm★ | invites fly faster and further |
  | **Heavies** (back line, hold) | bear, boar, crab, elephant, frost troll, polar bear, ram, badger, stegosaurus, hydra★, sphinx★ | between each shot, a second shot in the opposite direction. Stacked: 3 shots go out clockwise at 120° at 3× rate of fire, 4 at 90° at 4×, and so on |
  | **Pack hunters** (flanks, split back, circle) | elk, lion, wolf, fennec, fox, raccoon, stag, cheetah, rhino, stoat, unicorn★ | faster rate of fire, but more spread |
  | **Shells, diggers and swimmers** (roll, huddle, shell, burrow, water) | armadillo, hedgehog, woodlouse, beetle, penguin, snail, mole, scorpion, beaver, crocodile, newt, otter | chaining shot; each stack adds a chain. Stacks with the bag that chains |

- **Leashed legends count triple.** Ed: "When you're leashing a legend, this gives you the equivalent of 3x of that animal
  types' buff. (counts as that animal type so doesn't stack e.g. adult wolf and legend wolf just count once)." So a legend
  adds 3 stacks to its group instead of 1, and a legend plus an adult of the same kind still counts as one kind (3 stacks).

- **Fantastic animals** give their group's buff plus their own: stronger, with a memorable downside.

  | Fantastic | Buff |
  |---|---|
  | Feathered serpent | every invite fires in a full circle, but short range |
  | Griffin | she moves absurdly fast |
  | Hydra | each invite splits into three, at half the range |
  | Frostwyrm | dashes freeze what they pass through, but her movement slides as on ice |
  | Unicorn | unlimited dashes, each half length |
  | Sphinx | invites chain infinitely, and can go between the same creatures more than once |

  (Check each biome's fantastic kind against the roster; the list above is from the kinds found so far.)
- **Where fantastic animals live:** "fantastic animals shouldn't be on the route (except on that animal's island), but are
  additional areas found in later phases of biomes." So they are extra off-route areas, like challenge areas, that she finds
  by exploring.

### Anchor chains

- "adults are slow and heavy; you should be able to move within a reasonable distance from them (the size of a typical fight),
  but when the chain gets to its max length you can't move further until they move."
- **She can't take off while an adult is leashed.** So a strong following trades away flight for power.
- The chain length is a knob, 30 m to start (Ed: "fine to start with").

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
- **Optional:** it doesn't count toward winning the island.
- **No boons from challenges.** Follower buffs replace them.

## 3. Later: committed players (parked)

Not powerful items, which should come early to help new players and give variety. Instead:
- house trophies and cosmetics, including the undesigned card table and tea table;
- harder play: streaks, other multi-night difficulty;
- specific sequences of islands to complete, perhaps secret ones (the telescope's constellations could hint at them).

## Open questions for Ed

1. Confirm each biome's fantastic kind.
2. Buff magnitudes (extra dash per stack, how much faster, how much spread): first values to be set in play.

## Build order once approved

1. Anchor chains and no take-off with an adult leashed.
2. The buff system: one per kind, stacking, icons in the stack, the family table as knobs.
3. Challenge area: the circle, the mixed pack, casting, the dancefloor, the find and flask reward, find sets per phase and biome.
4. Fantastic animals' unique buffs.
