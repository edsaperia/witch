# Hats and brooms

Backlog (Ed, 2026-10-09); **Ed's go 2026-10-11, built** (rules/spells.ts; #695, #719, #721, the brooms #728; the brooms since rebuilt as Workshop parts and sets, #1037; the first PR: the two slots, the picker, the plain broom, Speed, Long, Double blink, the Helmet and the Healing ring; the second, Hats A: Harvest, Dowsing, Sentry, Slingshot and Gathering, rules/hatSpells.ts; the third, Hats B: Bramble, Mine, Lullaby, Cyclone and Nursing). The roguelite unlocks: a second axis of progress next to islands and records (see [journey.md](journey.md), section 2).

## The two slots

- She has two slots: **a hat and a broom**. Builds come from the combination.
- **The default hat and default broom have no spell** (Ed): fewer buttons for beginners.
- **Speed stops being the default** and becomes an unlockable broom.
- **Brooms are movement.** Some are passive, some active (a button with a cooldown).
- **Hats are placed** (Ed): a hat's spell works while the hat is on the ground (hold E to put it down, as shipped in #606). Its only limit is where it is: to move it, she walks back to it. While it's down she's bareheaded. A knockdown already drops her hat where she fell, so it works there too.
- **Multiple hats** (Ed): each unlocked hat can be in play once. Place one, go home, grab another; no knockdown needed. Spares wait at home.
- **Placed hats keep working**, also through knockdowns.
- The exception is **worn** hats such as the Helmet, which only work on her head.

## Rules for spells

- **Hats and brooms change verbs; quest buffs change numbers** (proposed, 2026-10-11). *Out of date:* quests no longer give buffs (Ed, 2026-10-18; built, #954). The movement buffs (hare: blink charges; mole: fast rise and land; raven: faster treetops) belong with the broom garage's components, and the 💌 buffs (fox: homing, and the rest) with the bags (below).
- Spells support the basics (speed, attacks, healing, movement). They never fix the failure cascade (soundsystems, bpm, creatures that ran off).

## Hats

Ed's:

- **Harvest hat:** berries grow round it.
- **Dowsing hat:** points to the nearest relic.
- **Sentry hat:** shoots 💌s at nearby wild creatures.
- **Bramble hat:** entangles creatures passing.
- **Slingshot hat** (working name): a 💌 that flies into its orbit gets extended range. Captured 💌s **hold in orbit for a period** (Ed), then curve round the hat and fly at the nearest creature it can invite (wild; enraged ones block 💌s).
- **Gathering hat:** collects her sigils within 100 m; they join her stack when she picks the hat back up.
- **Helmet** (worn, not placed): +1 hit while she wears it. Putting it down loses the bonus.
- **Mine hat:** explodes and stuns nearby animals.

Suggested:

- **Lullaby hat:** wild creatures nearby nap.
- **Decoy hat:** draws aggro.
- **Nursing hat:** heals her creatures near it.
- **Beacon hat:** leashed creatures gather at it.
- **Edge-seer hat** (Ed, 2026-10-15): shows the area edges (the glowing dotted borders, off by default since #889) while it's in play. **Built** (#939; `edgeseer` in `rules/spells.ts`, `seerWorn` in `rules/hatSpells.ts`): the edges are drawn as the pause page's "Area edges" draws them. Ed, 2026-10-15, after #939: **worn only; "only the player wearing the hat sees the things"** (a hat lying or left behind shows nothing; built in the Route-seer's PR).
- **Thermal-vision hat** (Ed, 2026-10-16): worn only, like the seer hats: while she wears it she sees animals through foliage (the canopy and the ground cover), so nothing hides from her; only the player wearing it sees them.
- **Route-seer hat** (Ed, 2026-10-15: "a 'see the entire route' hat power as well"): worn, the whole ley line is drawn out to the route's last stone and every runestone's beacon is up, however far the line's reveal has grown; the pulse, the wave order and the music are untouched. **Built** (`routeseer` in `rules/spells.ts`; `render/view.ts` and `render/view/home.ts` read `routeSeen`).

## Other powers

- **Welcome mend** (Ed, 2026-10-13): each time she successfully invites a creature, she heals to full hp. Slot (hat, bag or broom part) to decide; quest buffs are gone (Ed, 2026-10-18).

## Brooms

Ed's:

- **Speed** (active): today's boost, now an unlock.
- **Battering broom:** blinks hit creatures in the way.
- **Long broom:** blinks twice as long. By the verbs rule this is a number; with quest buffs gone (2026-10-18), a broom component is its natural home (the broom garage, below).

Suggested:

- **Ley jump** (active, long cooldown): teleport to the pulse.
- **Haul** (passive or active): extra pulling power.
- **Updraft** (active): instant rise or land with a knockback shockwave. *Renamed Ground pound (Ed, 2026-10-12); its landing also briefly stuns.*
- **Shadow step** (passive): after a blink, unseen for 2 s. *Replaced by Stealth (Ed, 2026-10-12).*
- **Comet** (active): a ground charge. *Cut (Ed, 2026-10-12).*
- **Homing** (active): fly to a placed sigil. *Cut (Ed, 2026-10-12).*

## Rejected or flagged

- **Boombox hat: rejected** (Ed). Music enrages wild animals: that's the core premise.
- **Low flight** (invite from the treetops) and **Sky leash** (a weightless army): flagged, as they weaken core rules.

## Unlocking: hats found at shrines, brooms made at home (Ed, 2026-10-16)

Ed's idea, superseding the achievements rule below for hats (kept for the record). **Not built; don't build without Ed's go.** (Hats are finds since #1044: "Hats and bags found, one a night", below.) It lands with the treehouse's corridors and stations (treehouse.md, build order step 3).

- **Her first hat is hers; every hat after it is found on an island, at a shrine themed on its power.** A shrine is a set piece in one of the island's areas (placed like relics: about one per island, which hat by the island's kind or biome, so a player learns where to look); e.g. the Harvest hat in a ring of berries, Sentry on a watchtower, Bramble in thorns, Lullaby in a bed of poppies, Mine in a crater, Cyclone on a windy tor, Nursing at a spring, the Helmet on a cairn. The Dowsing hat could point to shrines as well as relics.
- **She picks it up as a game object** (E, as any hat lying in the world: #717's rule): wearing one already, her own hat goes down where she stands and keeps working there, with its pointer; bareheaded, she puts the found one on and its spell is hers for the night.
- **It becomes hers when she carries it to the balcony mid-night** (Ed, 2026-10-16): fly it home (every room is open mid-night, time at a tenth), hang it on its hook in the hat corridor, and go back out. Until then it is only a hat she's carrying: a knockdown drops it where she fell (its pointer shows where), and a night ended with it still out leaves it at its shrine for next time. So fetching a hat is a detour with a risk, and the house is where the risk ends.
- **Brooms are not found: they are built from parts** found on the islands, at the broom garage (the section below; Ed, 2026-10-16).
- **Achievements** then unlock nothing, or only trophies for the bedroom (treehouse.md). The afterparty's "new unlocks" card shows the hat she brought home and the broom she made.
- **The first hat with a spell** could sit at a tutorial shrine on home, so a new player meets the loop on the first island.

Open: which hat each island holds (fixed by kind, or dealt); whether a shrine is guarded or tested by its own power (sleeping animals round the Lullaby shrine, thorns round Bramble); what brooms cost; whether a hat left at a shrine for a later night is still the same one (it is, by this rule).

## Hats and bags found, one a night (built, Ed 2026-10-23)

Every spell hat, the bum bag and the backpack are finds in the one draw (rules/finds.ts FIND_KINDS `hat`, `bag`), each its own ground object (art/country.js `hatfind-<spell>`, `bagfind-<bag>`), hinted by its constellation; only the plain hat is hers at first (everyone started over), a found hat lies on the Parlour's hats' floor, and worn it keeps her Mirror look. The shared find treatment (size, glow, light) waits on the art director's finds style guide. The weapon bags (below) will join the `bag` kind.

## Bags: weapons, found like hats (Ed, 2026-10-18)

**Not built; don't build without Ed's go.** "There will be bags that give you different 'weapons', which are found like hats."

- **A bag sets how she throws 💌s:** a shooting style (a shotgun spread, a sniper's long slow shot, and so on). She carries one at a time, so a bag is a deliberate choice of build. Easier to balance than the old legend boons, which stacked at random.
- **Found like hats:** at a shrine themed on its power, picked up as a game object, by the same rules as hats (above).
- **Where the old boons go** (proposed): the 💌 boons (Charm homing, Pierce, Spawn, Howl's ring...) are the first bags' behaviours; the movement boons (Hare's blink charges, Mole's fast rise, Raven's treetop speed) are broom components (the broom garage, below). Quests no longer give boons (Ed, 2026-10-18; built, #954).
- Open: the first set of bags; whether bags share the hat shrines or have their own; where spare bags hang in the treehouse.

## The crystal ball: where an upgrade lies (Ed, 2026-10-18)

**Not built; don't build without Ed's go.** "We should have a crystal ball that tells you a permanent upgrade and on what island it can be found. It only shows you upgrades on islands you've already unlocked. Perhaps only appears when you've finished the second phase (home plus the ones after that)."

- **What it shows:** one permanent upgrade (a hat, a bag or a broom part) and **the island** where it can be found. Never where on the island: finding it there is still the game (the garage's pegboard only says a piece is on tonight's island).
- **Only islands she has unlocked**, so it points somewhere she can sail tonight.
- **Appears late:** perhaps only once she has finished the second phase, home and the islands after it (Ed). Until then it isn't in the house.
- **Where:** the treehouse's hub already has a crystal ball in the plan (treehouse.md: the run history); this gives it a job.
- Open: what "finished" means for a phase (every island won, or found); whether it shows one upgrade at a time (and when it changes: each night, or once that one is found); whether it also keeps the run history.

## Permanent unlocks only while the party is on (Ed, 2026-10-18)

**Not built** (legends' part being built: quests aren't accepted after a lost party). "All permanent unlock items disappear from the map after a party is lost. You should keep them if you find them earlier even if you lose the night though."

- Hats, bags, broom parts and legends' quests can only be claimed **while the party is on**. When the party is lost (the party's over, the afterparty), the unclaimed ones vanish from the map.
- **Whatever she found before the loss is hers to keep**, even though the night is lost. **Islands are the exception** (Ed, 2026-10-18): a quest done during the night finds its island for tonight, but the island is kept only if the night is won.
- **Picking it up is finding it** (Ed, 2026-10-21: "No more towing; you just find and pick them up"): a broom part, like a wearable in its trunk, is hers the moment she picks it up with E. Nothing is towed or carried home.

## The broom garage (Ed, 2026-10-16)

Ed's design, from a conversation on 2026-10-16. **Not built; don't build without Ed's go.** (Since built in its own form as the Workshop: [workshop.md](workshop.md), #1037, #1040, #1056.) It replaces the broom room and broom station of treehouse.md and the "brooms by achievements" rule. The game is about exploring the forest to find cool stuff, so broom parts are rare discoveries, and the garage is where they go.

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

### Open questions

- The sets: how many, which pieces, which abilities; which sets are two and which three.
- Biome and phase locking: strict, or a lean.
- Slot themes as proposed, or free.
- How rare: one per island at most, or rarer; whether home holds one so a new player meets the loop.
- What "less canopy" means for the glint: a thin-canopy area shows it from above, or never from above at all.

## Unlocking (the older rule: achievements)

- **By achievements.** At most **one unlock per run**, in **any order**: whichever achievement comes first unlocks its own item.
- New unlocks are shown at the afterparty.
- Achievement ideas:
  - complete a quest; 3 quests in one run
  - reach **200 bpm with a soundsystem still standing**
  - leash 10 / 20 creatures
  - 10 / 20 party witches
  - evolve a creature

## Where she chooses

- **In the treehouse:** the hat room and the broom room show the ones she's unlocked; she picks one of each there, and spare hats wait there for swapping during the party (see [journey.md](journey.md), section 3). Locked ones show greyed with the achievement that unlocks them.
- The older plan (choosing them in the character creator, and the bedroom rack) is superseded by the treehouse rooms.

## Open questions

- Final hat and broom lists; which brooms are passive and which active.
- Which achievement unlocks which item.
- Cooldowns and durations.
- Long broom: a broom component now that quest buffs are gone (2026-10-18).
- Earlier hat ideas from before hats were placed (Berry patch, Mend, Second wind): drop, or rework as placed hats? (Harvest already covers berries.)

## Decisions (Ed, 2026-10-11)

- **Looks:** the hat room and broom room choose *which* hat and broom (their spells); their **shape and colour are styled while dressing**, with today's sliders.
- **Matching items to powers, later** (Ed, 2026-10-12): eventually each hat and broom look will be matched to its power; for now the power is picked from a dropdown, independent of the look.
- **One power per hat, one of each in play** (Ed, 2026-10-12, after #737): to design. Today (#737, the treehouse wardrobe) she can take any number of hats from her room, duplicates included, each keeping the power picked for it. Eventually each hat has its one power, and only one of each hat can be out at a time.
- **The older hat spells, reworked as placed hats:** Berry patch → **Harvest hat**; Mend → **Nursing hat**; Second wind → **Healing ring hat** (placed: standing near it, she heals a hit every few seconds).

## Decisions (Ed, 2026-10-11, the go)

- **Hats** are mostly spells that happen when placed: some fire once on placing, some work over time while placed. **The Helmet** is worn: an extra hit, knocked off when she's hit (pick it up to wear it again).
- **Brooms** change how she moves, or how much she can carry or pull.
- **Everything unlocked for now**, the default none; chosen in the creator's Hat and Broom boxes as hats and brooms are picked now (the treehouse rooms later); `?hat=` and `?broom=` too, saved on this browser (`witch.loadout`).
- 1. **The default broom** lets her rise to the treetops again sooner after landing (`spells.plain.riseCooldown`).
- 2. Yes (the Long broom stacks with the Hare's buff).
- 3. **Haul** is always on (passive).
- 4. **Back to the bedroom mid-run** (later PR): fly at treetop level to the treehouse to go back to the bedroom, where time slows 10×; an exit button where the party scroll usually is goes back to the island.
- 5. **Spells may affect enraged creatures** (stun, slow and the like) **but never damage them.**
- 6. **Gathering** takes all her sigils in range.
- **Harvest** grows a ring of six berries round the hat when it's put down.
- **Ranges:** Bramble 30 m; Sentry 30 m; Slingshot catches 💌s within 10 m and fires out to 40 m; Mine 15 m.
- **Beacon dropped** ("isn't useful").
- **Double blink**, a new broom: one more blink before the cooldown.
- **Lullaby** (Ed, 2026-10-12): "Wild creatures that are asleep wake up when hit with an invitation." A lulled creature wakes to a 💌 of its own (the rule for napping creatures, #671), not to her landing in its area or a 💌 on a neighbour.
- **Decoy dropped, Cyclone instead** (Ed, 2026-10-12: "Decoy isn't useful, how about a Cyclone spell that pushes creatures around in a circle, lifts them and throws them outwards?"): a placed hat. On putting it down, and every 20 s while it lies there, it catches the wild and enraged creatures within 10 m, sweeps them round it for 3 s (a turn a second) up to 3 m off the ground, then flings them 10 m outward, stunned 1.5 s after landing. Never her (Ed, 2026-10-12: "cyclone doesn't affect you"), her creatures, happy ones or legends; never hurt (proposed numbers; the tuning's spells.cyclone).

## Decisions (Ed, 2026-10-12, the brooms)

- **Battering:** "blinks stun creatures in her path" (wild and enraged within 1.5 m of the blink's line, 1.5 s).
- **Ground pound** (the Updraft renamed): rise or land at once with a knockback shockwave; "its landing should also briefly stun" (8 m, pushed 6 m, landing stuns 1 s; 10 s recharge).
- **Stealth** (instead of Shadow step): "creatures don't see you unless you're inviting or placing/pickup; once aggro'd they attack you until you're out of range and then they lose you again" (throwing 💌s, or putting down or picking up anything, shows her for 3 s; what went for her loses her past 25 m).
- **Comet and Homing: cut.**
- Ley jump (to the ley line's pulse, 60 s recharge) and Haul (her sigils pull half as hard, always on) as planned.
- **Back to her room mid-night** (Ed's answer 4; built 2026-10-12 on the treehouse deck, #717): on the deck the Bedroom button or F opens her room, the world running at the deck's tenth; "Back to the island" sits where the party scroll does. A hat of hers lying in the world stays there, still working its spell, when she takes a new one in her room (Ed, 2026-10-12), and any number can lie about; she can't pick one up while she's wearing one, and bare-headed she puts it on, its spell hers. Each one lying has its own pointer, its 🎩 in that hat's creator colour, and keeps the look it went down in. (Ed, 2026-10-12: one power a hat, one of each at a time, is to be designed later; for now any number of the same can lie about.)
