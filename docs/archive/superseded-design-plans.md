# Superseded design plans

Retired on 2026-10-31 under Ed's ruling, "Game wins" (#1357). These are historical proposals, not work to implement. The current behaviour is stated before each preserved plan; current notes under `docs/notes/` remain the guide.

## Unlocking: hats found at shrines, brooms made at home (Ed, 2026-10-16)

Source: `docs/backlog/unlocks.md`. **Current game:** Hats and bags are part of the shared one-find-per-night draw, not power-themed shrines or a carry-home challenge. Parts wait at the Workshop; finds become permanent only on a won night (#1044, #1109; `rules/finds.ts`, `app/loan.ts`).

### Original plan (retired)

Ed's idea, superseding the achievements rule below for hats (kept for the record). **Not built; don't build without Ed's go.** (Hats are finds since #1044: "Hats and bags found, one a night", below.) It lands with the treehouse's corridors and stations (treehouse.md, build order step 3).

- **Her first hat is hers; every hat after it is found on an island, at a shrine themed on its power.** A shrine is a set piece in one of the island's areas (placed like relics: about one per island, which hat by the island's kind or biome, so a player learns where to look); e.g. the Harvest hat in a ring of berries, Sentry on a watchtower, Bramble in thorns, Lullaby in a bed of poppies, Mine in a crater, Cyclone on a windy tor, Nursing at a spring, the Helmet on a cairn. The Dowsing hat could point to shrines as well as relics.
- **She picks it up as a game object** (E, as any hat lying in the world: #717's rule): wearing one already, her own hat goes down where she stands and keeps working there, with its pointer; bareheaded, she puts the found one on and its spell is hers for the night.
- **It becomes hers when she carries it to the balcony mid-night** (Ed, 2026-10-16): fly it home (every room is open mid-night, time at a tenth), hang it on its hook in the hat corridor, and go back out. Until then it is only a hat she's carrying: a knockdown drops it where she fell (its pointer shows where), and a night ended with it still out leaves it at its shrine for next time. So fetching a hat is a detour with a risk, and the house is where the risk ends.
- **Brooms are not found: they are built from parts** found on the islands, at the broom garage (the section below; Ed, 2026-10-16).
- **Achievements** then unlock nothing, or only trophies for the bedroom (treehouse.md). The afterparty's "new unlocks" card shows the hat she brought home and the broom she made.
- **The first hat with a spell** could sit at a tutorial shrine on home, so a new player meets the loop on the first island.

Open: which hat each island holds (fixed by kind, or dealt); whether a shrine is guarded or tested by its own power (sleeping animals round the Lullaby shrine, thorns round Bramble); what brooms cost; whether a hat left at a shrine for a later night is still the same one (it is, by this rule).

## Bags: weapons, found like hats (Ed, 2026-10-18)

Source: `docs/backlog/unlocks.md`. **Current game:** Bags already set her invitation style through their `invites` multipliers and additions in `config/wardrobe.json` and `rules/bags.ts`. Starting bags and found bags are documented in `docs/notes/house.md`; no shrine implementation is pending.

### Original plan (retired)

**Not built; don't build without Ed's go.** "There will be bags that give you different 'weapons', which are found like hats."

- **A bag sets how she throws 💌s:** a shooting style (a shotgun spread, a sniper's long slow shot, and so on). She carries one at a time, so a bag is a deliberate choice of build. Easier to balance than the old legend boons, which stacked at random.
- **Found like hats:** at a shrine themed on its power, picked up as a game object, by the same rules as hats (above).
- **Where the old boons go** (proposed): the 💌 boons (Charm homing, Pierce, Spawn, Howl's ring...) are the first bags' behaviours; the movement boons (Hare's blink charges, Mole's fast rise, Raven's treetop speed) are broom components (the broom garage, below). Quests no longer give boons (Ed, 2026-10-18; built, #954), and the boons' code is removed (Ed, 2026-10-28): a bag or part rebuilds one from scratch.
- Open: the first set of bags; whether bags share the hat shrines or have their own; where spare bags hang in the treehouse.

## The crystal ball: where an upgrade lies (Ed, 2026-10-18)

Source: `docs/backlog/unlocks.md`. **Current game:** The telescope and its constellation hint at tonight's find (`rules/telescope.ts`, `rules/constellations.ts`, `docs/notes/house.md`). The crystal-ball hint plan is superseded.

### Original plan (retired)

**Not built; don't build without Ed's go.** "We should have a crystal ball that tells you a permanent upgrade and on what island it can be found. It only shows you upgrades on islands you've already unlocked. Perhaps only appears when you've finished the second phase (home plus the ones after that)."

- **What it shows:** one permanent upgrade (a hat, a bag or a broom part) and **the island** where it can be found. Never where on the island: finding it there is still the game (the garage's pegboard only says a piece is on tonight's island).
- **Only islands she has unlocked**, so it points somewhere she can sail tonight.
- **Appears late:** perhaps only once she has finished the second phase, home and the islands after it (Ed). Until then it isn't in the house.
- **Where:** the treehouse's hub already has a crystal ball in the plan (treehouse.md: the run history); this gives it a job.
- Open: what "finished" means for a phase (every island won, or found); whether it shows one upgrade at a time (and when it changes: each night, or once that one is found); whether it also keeps the run history.

## Permanent unlocks only while the party is on (Ed, 2026-10-18)

Source: `docs/backlog/unlocks.md`. **Current game:** Finds are kept only on a won night (#1109), including hats, bags and broom parts. A lost night returns tonight's finds; previously kept items remain hers. Islands earned from quests are also kept only on a win (`app/loan.ts`, `app/chartSave.ts`).

### Original plan (retired)

**Not built** (legends' part being built: quests aren't accepted after a lost party). "All permanent unlock items disappear from the map after a party is lost. You should keep them if you find them earlier even if you lose the night though."

- Hats, bags, broom parts and legends' quests can only be claimed **while the party is on**. When the party is lost (the party's over, the afterparty), the unclaimed ones vanish from the map.
- **Whatever she found before the loss is hers to keep**, even though the night is lost. **Islands are the exception** (Ed, 2026-10-18): a quest done during the night finds its island for tonight, but the island is kept only if the night is won.
- **Picking it up is finding it** (Ed, 2026-10-21: "No more towing; you just find and pick them up"): a broom part, like a wearable in its trunk, is hers the moment she picks it up with E. Nothing is towed or carried home.

## Unlocking (the older rule: achievements)

Source: `docs/backlog/unlocks.md`. **Current game:** Collectible finds replace achievement unlocks. There is one find drawn for tonight's island, kept only on a win; the guidance pins replace the afterparty cards (`rules/finds.ts`, `rules/guidance.ts`).

### Original plan (retired)

- **By achievements.** At most **one unlock per run**, in **any order**: whichever achievement comes first unlocks its own item.
- New unlocks are shown at the afterparty.
- Achievement ideas:
  - complete a quest; 3 quests in one run
  - reach **200 bpm with a soundsystem still standing**
  - leash 10 / 20 creatures
  - 10 / 20 party witches
  - evolve a creature

## Where she chooses

Source: `docs/backlog/unlocks.md`. **Current game:** Her owned hats lie on the hats' floor; the hat mirror changes their look. The Workshop's lathe fits parts and styles the broom. Station panels hold her still, and locked collectibles are finds rather than achievement rewards (`docs/notes/house.md`).

### Original plan (retired)

- **In the treehouse:** the hat room and the broom room show the ones she's unlocked; she picks one of each there, and spare hats wait there for swapping during the party (see [journey.md](../backlog/journey.md), section 3). Locked ones show greyed with the achievement that unlocks them.
- The older plan (choosing them in the character creator, and the bedroom rack) is superseded by the treehouse rooms.

## Getting dressed (the character creator)

Source: `docs/backlog/creator-and-house.md`. **Current game:** The default opening wakes her in the walkable house and she dresses at separate stations, led by guidance pins. The old creator remains under `?opening=old`; there is no pending Next/Back dressing sequence. The first morning's order is dressing table, wardrobe, shoes, bag, invitations, cloak, hat, broom (`rules/guidance.ts` FIRST_MORNING).

### Original plan (retired)

- **The creator is her getting dressed** (Ed): she starts in her nightie and puts on each piece in the order you'd dress.
- **Next and Back steps, not tabs** (Ed). Clothes go on one at a time: top, then jeans, then jacket (the cloak), each its own step.
- Proposed step order: Face → Hair → Top → Jeans → Shoes → Jacket (cloak) → Scarf → out the door. Hats and brooms are chosen in their own rooms (journey.md; [unlocks.md](../backlog/unlocks.md)).
- **No "same again" button** (Ed): next, next, next is fast enough.
- The creator is only her look: Options, Controls and What's new move out of it (for example to a pause menu).

#### Ed's streamlining answers (2026-10-09) that still apply

- **Rotators** for choices: ‹ name › arrows (keyboard left and right too), with a live preview: the witch spins or shows the item off when it changes.
- **Every slider works for every option** (no greyed-out sliders).
- **Colours:** keep every part; the colour grid has five rows (was nine), on every part.
- **Hat:** keep all 17 shapes as a rotator; keep height, brim, tilt and band sliders; add a curl slider.
- **Spartan helmet** (Ed, 2026-10-15): a new hat kind; on it the brim slider sets the size of the crest and the plume (band) colour sets the crest's colour.
- **Hair:** a rotator; add a length slider that works for every style.
- **Face:** skin, plus an eyewear rotator (none, sunglasses, round glasses, visor, goggles...); headphones and earrings move here.
- **Top and Cloak** are separate steps. Cloak: none / short / long becomes a length slider; add a collar option and a width slider.
- **Shoes:** their own step, with a shoe-type rotator (trainers, boots, platforms, bare feet...).
- **Scarf** keeps its own step.
- **Broom:** a rotator, keep all 18; a width slider scales each broom's distinctive part (bicycle wheels, gyrocopter and drone rotors, handlebar length, hobby-horse head size).
- **Removed:** bag (satchel, bum bag), backpack; the "Magic and more" items (lantern, potion vial, spellbook, glow sticks, wristband); the Randomise, Wild and Classic buttons.
- The Player dropdown lives in the debug overlay (built, #649); the Waves dropdown goes for a pause-page wave-speed slider (Ed, 2026-10-18; built, #953).

## Attrition and director

Source: `DESIGN.md`, Balance and forecasting power; `docs/notes/balance.md`. **Current game:** Ed, 2026-10-31: pacing is wave growth only. Areas start with their full route-based population; they do not grow over time. The simulator's debug-only experiments stay, with no pending decision to put them in play.

### Original proposals (retired)

Attrition would let only a share of a won siege's survivors march on. A director would reinforce areas as the next wave wakes them, with a budget growing with the wave and, by α, with the player's power.

## Population growth over time

**Current game:** Ed, 2026-10-31: "Game wins". All areas start full by their route position; `population.growth.on` is false. These old tuning experiments and measurements no longer describe live populations or current run lengths.

### Original design and measurements (retired)

- **Populations** (Ed, 2026-10-04; this replaced an earlier "populations by distance from the centre" ruling, and relaxes "wild creatures don't grow over time"): **every area starts the same, with one baby and one young** (Ed, 2026-10-05, after playing: "the game is hard! we should start each area with just one baby and have a boot up period of 5 minutes", then "actually, the game should start with one baby and one youth, otherwise you can't avoid enraging lots of legends": a legend grows restless once its area has none of its kind, so with one creature an area every invite angers one; before that one young and one adult, Ed 2026-10-05: "could start with 1 youth instead of 1 baby and 1 adult; that should make it easier", after the fight bot found the first fights too hard; before that one baby and two adults, Ed 2026-10-05: "Two adults it is"; and before that one adult) (plus a sleeping legend in about a fifth of the areas since Ed, 2026-10-08, half before: Legends, redesigned). **While wild, each area spawns more non-legend creatures at random levels** (one every other wave now: see Growing at half the pace, below; at first one a wave), by tuned weights (equal thirds of baby, young and adult to start); partified areas don't spawn. So the areas the party reaches late are the dangerous ones, and older areas get dangerous to cross on foot. New creatures arrive naturally: out of the witch's view, never popping in on screen. Far from every witch they stay counts, made (from the seed) when she comes within the creature simulation radius or their area wakes, so the game never simulates or draws thousands of idle creatures. **Growing at half the pace** (balance, 2026-10-06, DECISION FOR ED): a wild area gains a creature every other wave (`population.growth.perWave` 0.5, from 1). At one a wave the sieges outgrew any defence by wave 3, so a run ended at about the same time however she played (the full-run bot: a skilled player 46 min, doing nothing 42); at half, the skilled player lasts about 72 min and doing nothing about 57.

- **Skill should matter** (Ed, 2026-10-04: "A worry is that all games last about the same time, and the difference between a good player and a bad player is small (because the enemies grow exponentially). You just go along and then suddenly get steamrolled. We might need to adjust as we go along to keep pressure on players but not suddenly overwhelm them. The obvious way to do this is have areas spawn creatures over time in response to the player's progress."). The key measure is the **skill spread**: how long a player lasts by how fast they grow; roughly twice the skill should give twice the survival, never a common cliff. Spawning over time relaxes the earlier "wild creatures don't grow over time"; it stays behind a tuning flag, and reinforcements must arrive visibly (from the map's edge or deeper areas, never popping in) and only out of the witch's view. The population growth above is built; the other pacing variants (attrition on the march, a director) stay in the simulator until Ed picks one.

## The broom garage (Ed, 2026-10-16)

Retired as a build plan under Ed's 2026-10-31 ruling. Remaining mechanics, trails and parts are parked for a future Workshop pass. Original proposal follows; current behaviour is summarised first.

**Historical plan, superseded in its built details:** the current single lathe fits parts and colours; parts are shared finds, kept only on a win. See `docs/notes/house.md` **Workshop** and [workshop.md](../backlog/workshop.md) for what remains.

Ed's design, from a conversation on 2026-10-16. **Not built; don't build without Ed's go.** (Since built in its own form as the Workshop: [workshop.md](../backlog/workshop.md), #1037, #1040, #1056.) It replaces the broom room and broom station of treehouse.md and the "brooms by achievements" rule. The game is about exploring the forest to find cool stuff, so broom parts are rare discoveries, and the garage is where they go.

### One broom, three slots

- **She has one broom with three slots:** the **tip** (the front end), the **chassis** (the handle) and the **exhaust** (the bristles, at the back). A **component** fits one kind of slot only, one per slot.
- **Each component changes attributes** (top speed, acceleration, turning, take-off and landing cooldown, number of dodges, dodge cooldown, haul, blink length...), **often with both advantages and disadvantages**: a jet exhaust halves the take-off cooldown but widens her turns; a heavy chassis hauls more but accelerates slowly. Proposed slot themes, so the slot tells you roughly what a part changes: front = steering (turning, how a blink aims), chassis = body (top speed, haul), back = thrust (acceleration, boost, take-off and landing, dodges). Every component must change something she feels on the first take-off or turn, not a number only the log sees.
- **Matching sets** unlock better bonuses or abilities: **some sets are two pieces, some three**. The abilities of today's active brooms (Battering, Ground pound, Stealth, Ley jump) are candidates for set abilities; today's passive brooms (Speed, Long, Haul, Double blink) become components. How many sets, and which: **decided later**.
- **Biome and phase locked** (maybe): a set's pieces live in its biome's direction, the rarer ones further out.
- **The default broom** has no components (its slots empty), as the default hat has no spell. Today's eighteen broom looks and the width slider map onto the parts' looks and the lathe (below).

### Finding parts

- **Rare discoveries:** at most **one component on an island**, most islands with none, perhaps rarer still. A part lies at a **wreck**: an old witch's crashed broom, half buried like a relic, posed to tell its story (nose-down in a bog, through a trunk, hanging from a branch).
- **A ground-mode find** (Ed): wrecks are **hard to see from the treetops**; if she's lucky the wreck is in an area with less canopy. Seeing rare collectibles is **a perk of being in ground mode**, beside inviting and placing.
- **The game says there's a piece, not where** (Ed: "encourage exploration"): the garage's pegboard (below) shows that a piece is on tonight's island; nothing points to its area.
- **Find it and pick it up** (Ed, 2026-10-21: "No more towing; you just find and pick them up"): E at the wreck and the part is hers at once, hung on its peg in the garage. No trailer, no towing, nothing to carry home. The tricky part is finding it. (This replaces the 2026-10-16 trailer: a part towed home slowly, unhitched by taking off.)

### The garage

- **On the ground floor of the treehouse** (Ed), with a door between the Ent's roots, north of the dancefloor. The balcony stays the flying door; the garage is the walking one. Time at a tenth inside, as in every room.
- **Separate stations, taken in turn** (Ed: better that players take turns than three bays):
  - **The bay:** the broom up on a stand; she **lies on a mechanic's creeper and rolls under it**, **welding sparks** while a component goes in or out (the stargazing lying pose on a board; the hit-spark and fireworks families tinted white). Swapping is free.
  - **The lathe is the customiser** (Ed): the broom spins on it; the creator's broom look and width slider become turning it on the lathe, colour a paint tin on the bench. No panel where the things will do.
  - **The Workshop's built** (Ed, 2026-10-23; docs/backlog/workshop.md): the broom stand, its shapes (the `workshop` items) and its Power row are gone. The bay fits the parts (ui/stationPanel.ts part cards, the sets' chips, the stat box and "Her broom"), the lathe has the broom's colours and fit sliders, and the pegboard is its own read-only station, the 3 × 3 board below. Her broom spell is the set her parts complete; a part found waits at the Workshop, not fitted.
  - **The pegboard: spare parts on the wall, laid out like the world map** (Ed): **a 3 × 3 grid, the nine biomes** (the compass's eight directions round temperate in the middle), each cell a pegboard of outlines. A found part hangs on its peg; a missing one is an empty outline. When tonight's island is chosen at the map, **the outline of a piece lying on it glows** in its biome's cell: there's one out there.
- **Repair: none.** Brooms don't wear or dent; the garage builds and customises only.
- **Multiplayer** (Ed): **only the parts the host has unlocked are available**, and **each part can be used by only one witch** at a time: taken from its peg by whoever gets there first.

### Ideas kept, not decided

- A full set changes her treetop trail (sparks for a jet set, petals for a forest set): visible to friends.
- One silly set (the hobby-horse head, bicycle wheels, a bell): slow, wide turns, every creature she passes turns to look. No upside, in the cauldron's spirit.
- A heavy chassis could count against her carry allowance like sigils do, so haul costs stack.
- Lakes could hide wrecks once biome lakes have their looks (a handle out of the tar pit, a glint under the floes).
- The crystal ball could remember what she flew each night.
- A short test loop round the Ent with a lap timer drawn as candles.

### Parked for a future Workshop pass

Ed, 2026-10-31: hat and broom lists, passives, unlocks, cooldowns and broom mechanics are parked, not pending questions for Ed.

- The sets: how many, which pieces, which abilities; which sets are two and which three.
- Biome and phase locking: strict, or a lean.
- Slot themes as proposed, or free.
- How rare: one per island at most, or rarer; whether home holds one so a new player meets the loop.
- What "less canopy" means for the glint: a thin-canopy area shows it from above, or never from above at all.
