# Hats and brooms

Backlog (Ed, 2026-10-09); **Ed's go 2026-10-11, being built** (rules/spells.ts; the first PR: the two slots, the picker, the plain broom, Speed, Long, Double blink, the Helmet and the Healing ring). The roguelite unlocks: a second axis of progress next to islands and records (see [journey.md](journey.md), section 2).

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

- **Hats and brooms change verbs; quest buffs change numbers** (proposed). Quest buffs already cover numbers (hare: 3 blink charges; mole: fast rise and land; raven: faster treetops; fox: homing 💌s). A hat or broom changes *what* she can do.
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

## Brooms

Ed's:

- **Speed** (active): today's boost, now an unlock.
- **Battering broom:** blinks hit creatures in the way.
- **Long broom:** blinks twice as long. By the verbs rule this is a number, so it may suit a quest buff better, or the two stack (open).

Suggested:

- **Ley jump** (active, long cooldown): teleport to the pulse.
- **Haul** (passive or active): extra pulling power.
- **Updraft** (active): instant rise or land with a knockback shockwave.
- **Shadow step** (passive): after a blink, unseen for 2 s.
- **Comet** (active): a ground charge.
- **Homing** (active): fly to a placed sigil.

## Rejected or flagged

- **Boombox hat: rejected** (Ed). Music enrages wild animals: that's the core premise.
- **Low flight** (invite from the treetops) and **Sky leash** (a weightless army): flagged, as they weaken core rules.

## Unlocking

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
- Long broom: broom, quest buff, or both stacking?
- Earlier hat ideas from before hats were placed (Berry patch, Mend, Second wind): drop, or rework as placed hats? (Harvest already covers berries.)

## Decisions (Ed, 2026-10-11)

- **Looks:** the hat room and broom room choose *which* hat and broom (their spells); their **shape and colour are styled while dressing**, with today's sliders.
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
