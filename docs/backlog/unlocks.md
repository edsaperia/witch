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

- **Hats and brooms change verbs; quest buffs change numbers** (proposed, 2026-10-11). *Out of date:* quests no longer give buffs (Ed, 2026-10-18; built, #954), and the buffs are removed (Ed, 2026-10-28). The movement buffs (hare: blink charges; mole: fast rise and land; raven: faster treetops) belong with the broom garage's components, and the 💌 buffs (fox: homing, and the rest) with the bags (below).
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

**Retired, 2026-10-31: "Game wins" (Ed).** Hats and bags are part of the shared one-find-per-night draw, not power-themed shrines or a carry-home challenge. Parts wait at the Workshop; finds become permanent only on a won night (#1044, #1109; `rules/finds.ts`, `app/loan.ts`). The original plan is [archived](../archive/superseded-design-plans.md#unlocking-hats-found-at-shrines-brooms-made-at-home-ed-2026-10-16).

## Hats and bags found, one a night (built, Ed 2026-10-23)

Every spell hat, the bum bag and the backpack are finds in the one draw (rules/finds.ts FIND_KINDS `hat`, `bag`), each its own ground object (art/country.js `hatfind-<spell>`, `bagfind-<bag>`), hinted by its constellation; only the plain hat is hers at first (everyone started over), a found hat lies on the Parlour's hats' floor, and worn it keeps her Mirror look. The shared find treatment (size, glow, light) waits on the art director's finds style guide. The weapon bags (below) will join the `bag` kind.

## Bags: weapons, found like hats (Ed, 2026-10-18)

**Retired, 2026-10-31: "Game wins" (Ed).** Bags already set her invitation style through their `invites` multipliers and additions in `config/wardrobe.json` and `rules/bags.ts`. Starting bags and found bags are documented in `docs/notes/house.md`; no shrine implementation is pending. The original plan is [archived](../archive/superseded-design-plans.md#bags-weapons-found-like-hats-ed-2026-10-18).

## The crystal ball: where an upgrade lies (Ed, 2026-10-18)

**Retired, 2026-10-31: "Game wins" (Ed).** The telescope and its constellation hint at tonight's find (`rules/telescope.ts`, `rules/constellations.ts`, `docs/notes/house.md`). The crystal-ball hint plan is superseded. The original plan is [archived](../archive/superseded-design-plans.md#the-crystal-ball-where-an-upgrade-lies-ed-2026-10-18).

## Permanent unlocks only while the party is on (Ed, 2026-10-18)

**Retired, 2026-10-31: "Game wins" (Ed).** Finds are kept only on a won night (#1109), including hats, bags and broom parts. A lost night returns tonight's finds; previously kept items remain hers. Islands earned from quests are also kept only on a win (`app/loan.ts`, `app/chartSave.ts`). The original plan is [archived](../archive/superseded-design-plans.md#permanent-unlocks-only-while-the-party-is-on-ed-2026-10-18).

## The broom garage (Ed, 2026-10-16)

**Retired, 2026-10-31: "Game wins" (Ed).** The current Workshop uses one lathe to fit parts and set colours. Parts are shared finds kept only on a won night; the old wreck scenes and separate bay are superseded. Broom mechanics, set trails and more parts are parked for a future Workshop pass. See `docs/notes/house.md`, [workshop.md](workshop.md), and the [original plan](../archive/superseded-design-plans.md#the-broom-garage-ed-2026-10-16).

## Unlocking (the older rule: achievements)

**Retired, 2026-10-31: "Game wins" (Ed).** Collectible finds replace achievement unlocks. There is one find drawn for tonight's island, kept only on a win; the guidance pins replace the afterparty cards (`rules/finds.ts`, `rules/guidance.ts`). The original plan is [archived](../archive/superseded-design-plans.md#unlocking-the-older-rule-achievements).

## Where she chooses

**Retired, 2026-10-31: "Game wins" (Ed).** Her owned hats lie on the hats' floor; the hat mirror changes their look. The Workshop's lathe fits parts and styles the broom. Station panels hold her still, and locked collectibles are finds rather than achievement rewards (`docs/notes/house.md`). The original plan is [archived](../archive/superseded-design-plans.md#where-she-chooses).

## Open questions

- Final hat and broom lists; which brooms are passive and which active.
- Achievement unlocks are retired; see the archive above.
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
