# How Witch works today

How the game behaves right now, as the rules code runs it (`src/rules/`), with the numbers from the config files. Knob names are in `backticks` the first time a number appears; most are in `config/tuning.json`. Where something couldn't be confirmed in the code, it says "(unsure)".

---

## 1. The big picture

You're a witch throwing a rave in a magical forest. The party starts at your home dancefloor and spreads out one area at a time. Each new area gets a **soundsystem**, which wakes that area's wild animals. They're offended they weren't invited, so they march on it to shut it down. You fly about inviting animals with 💌s, build a party crew, and park them where they're needed to defend. Every party ends eventually. When the last soundsystem and the home speakers fall, **the party's over**: the run winds down into a peaceful afterparty, with no game-over screen.

**The map** is a round island of about 14 × 14 areas (`mapAreas` 14, `map.shape` circle), each about 168 m across (`areaSize` 28 × `areaScale` 6). It has 32 area types, each with its own species: moor/badger, fern forest/boar, muddy forest/snail, stone shrine/fox, tangly forest/ram, wispy forest/woodlouse, hazel forest/hedgehog, garden/squirrel, twiggy forest/wolf, ancient/stag, Norway/stoat, alder/snake, meadow/hare, old oaks/owl, berry thicket/bear, wetland/toad, stream/otter, rocky slope/lynx, bog/elk, deadwood/raven, cave mouth/bat, grassland/mole, beaver pond/beaver, log pile/beetle, heath/moth, old pinewood/marten, ravine/salamander, bluebell glade/glow-worm, holly thicket/spider, honeysuckle tangle/dormouse, fen/newt and heronry/heron. A beach runs round the coast. Fly out past it and she lands and lies down to stargaze, and now and then there's a beach witch to cuddle up with (an Easter egg).

**Home** is the middle area: the dancefloor, a ring of 12 speakers (`dancefloor.speakers.count`) and the treehouse. Home has no animals and no legend.

---

## 2. How a run plays out

1. **Dress her up.** The run opens in the character creator. When the scroll unrolls, click it (or press Enter, or her spell key R) to **cast the party spell**. The cast takes 1.2 s, and she can't move until it's done.
2. **At the decks.** She sits behind the decks in the treehouse until you first move or rise.
3. **Boot-up.** About 3 s after she leaves the decks (`boot.firstAfter` 3), a pulse runs round the home ring and turns each little runestone into a speaker, one by one. The boot lasts **30 s** (`boot.time` 30; it was 5 minutes until Ed's new core design, 2026-10-07). The animals still attack during it, but no waves come.
4. **Waves.** When the boot ends, the first wave's countdown starts. A wave comes every **3 minutes** (`party.interval` 180, `party.startDelay` 0), so **wave 1 lands about 3½ minutes after she leaves her decks**. The dancefloor switches on at the first wave.
5. **Each wave goes to the next stone on the route** (`party.areasPerWave` 1). It doesn't take every neighbour, just the next area along a route planned for the whole map (`party.picker` "route", `party.route` "spiral"): outward from home, ring by ring, crossing itself as little as possible. The ley line traces that same route, so you always know what's next. The waves keep that schedule whatever you do: each takes the next stone on the route, never skipping one.
   - If that stone is still wild, the wave **partifies** its area (below).
   - If you've **cleared** it already, so its soundsystem plays, the wave **does nothing to the rules**: no animal is enraged and no second soundsystem comes. It **celebrates** instead (the `waveCelebrate` event: fireworks and that soundsystem's lasers). The music's next step, the ley line and the countdown carry on as normal.
   - If its early soundsystem has been lost, the wave passes it quietly.
6. **Clearing an area** (Ed, 2026-10-07: the new core design) transforms its runestone **at once**, without waiting for its wave. An area is cleared when **none of its own wild animals is left**: every one of them invited, or run off. Its sleeping legend and the wild baby in its legend's circle don't count. A few times a second the game looks (rules/clear.ts) and does just what a wave would (the `areaCleared` event): the soundsystem rises, the babies (the circle's too) turn happy and dance, a party witch comes, the area's music plays and its ley stone counts as reached. An early soundsystem **can be attacked** (besiegers marching on, an angry legend's bombard), and losing one works as any other (below).
7. **A new soundsystem** rises at the area's runestone. It has **4000 health** (`combat.soundsystemHealth`), and the home ring has **8000** (`combat.homeHealth`). When it arrives:
   - the area's wild young and adults become **enraged** and **besiege** it (none, when you cleared it);
   - its wild babies turn **happy** on the spot;
   - its happy animals come and **dance** round it, or at the area's party spots.
8. **Losing a soundsystem**: the area is **ruined** and its party ends for good. Its happy babies run off the map for good, and its besiegers march on to the **next-nearest standing soundsystem**, home included. Each loss brings the next wave **60 s sooner** (`party.lossPenalty`).
9. **The party's over** once every soundsystem *and* the home ring are down (rules/partyOver.ts):
   - the waves stop and nothing fights;
   - the lights and music wind down over 6 s (`partyOver.ease`);
   - every animal (yours too, and the ones that ran off) walks home or is simply there, asleep;
   - you can wander the map safely.

The home ring shows its damage speaker by speaker as it loses health.

---

## 3. The witch

**Two modes.** One button switches between them. Rising takes 0.7 s (`riseTime`) and landing 0.55 s (`descendTime`).
- **On the ground**, under the trees, at **19.25 m/s** (`groundSpeed`). It's snappy, she stops dead, and it's where all the action is: inviting, sigils, fighting. Firing 💌s slows her to 0.8× (`invites.fireSlow`).
- **In the treetops**, above the canopy, at **48 m/s** (`treetopSpeed`). Holding a direction builds a boost up to **1.7×** over 2 s (`treetop.boost`, `treetop.boostTime`), and she has momentum and wide swoops. Sharp turns bleed the boost. From up here you only see the ground through clearings. **She can't be hurt in the treetops**: every attack in the code only targets her on the ground. She can't invite or place sigils from up here either. In the treetops the sigil button cycles her stack instead.

**Health.** She has **3 hits** (`witchHealth.hits`), and every blow costs one, whatever it was. She gets one back every **20 s** (`witchHealth.repairTime`), but the timer restarts at every hit, so to heal you have to get right out of the fight. After a hit there's **0.5 s of grace** (`witchHealth.grace`) when nothing else lands, so a pack striking together costs one hit, not three.

**Knockback and stagger.** A blow throws her back (2.5 m plus a share of the attack's own knockback, at least 12 m from a charge, at most 14 m: `witch.knock`). She's then staggered for 0.25–1 s, with no moving, blinking or 💌s. After a stagger she can't be staggered again for 1 s.

**The blink (dodge).** Ground only. She vanishes and reappears **10 m** away (`dash.distance`), towards the cursor (or the right stick, or her steering on touch). She can blink **once a second** (`dash.cooldown` 1). She's untouchable only for the blink's 0.05 s (`dash.gone`), so it's for slipping out of a shot's path, not for tanking. A press up to 0.2 s early is remembered (`dash.buffer`). She never lands inside a tree, rock, soundsystem, speaker or the treehouse.

**Speed spell.** One spell is equipped: **speed** (`spells.equipped`). It gives **2.2× speed for 4 s** (`spells.speed`), then **12 s** to recharge after it ends (so one cast every 16 s). It works in both modes.

**Sigil weight.** Every sigil she *carries* (not ones placed on the ground) pulls on her by how taut its leash is (`leash.weight`). The first 2.5 "weight units" are free. Past that:
- moving away from the pull is slower, and she drifts towards it;
- rising takes longer;
- over the treetops she's slowly pulled down.

Babies weigh 0.5, young 1, adults 2 and legends 3 (`leash.weight.levels`). So you can't just drag a huge army everywhere.

**Knocked out.** At zero hits she collapses.
- Her carried sigils come off one a second, bottom first (`knockout.releaseEach`). **Each is put down where its animal stands, so they stay hers** as a parked group.
- She sparkles out and back in **behind her decks** (the teleport takes 1.6 s, `knockout.teleport`) with full health.
- **She drops her hat** where she fell, and a 🎩 pointer shows the way back to it. Stand on it and press the sigil button to put it back on. If she gets knocked out again before picking it up, no second hat drops. (The hat doesn't change any number that could be found in the rules.)

---

## 4. Controls

| | Keyboard and mouse | Gamepad | Touch |
|---|---|---|---|
| Move | WASD or arrows | left stick or d-pad | joystick where your left thumb lands |
| Aim 💌s | mouse cursor | right stick | the way she's going |
| Throw 💌s | left click (hold) or 1 | either trigger | 💌 button (hold) |
| Blink | right click | A | dash |
| Rise / land | Space | Y | rise / descend |
| Place / pick up sigil | E | X (cycles in the treetops) | sigil (cycles in the treetops) |
| Cycle the sigil stack | Q (on the ground or in the treetops) | — | — |
| Speed spell | R | B | spell |
| Zoom | mouse wheel, Z / X, + / − | LB / RB | + / − |
| Debug overlay | ~ | Back/Select | three-finger tap |

- **Cast the party spell**: the on-screen scroll, or Enter, or the spell key.
- **The action bar** along the bottom shows 1 (💌), 2–4 (empty for now), Q, E, R, Space and RMB.
- **Playtest keys**: N next wave now, P pause the wave timer, B feed the nearest party animal a berry, O make the nearest legend happy, I invite the nearest animal, K cycle the speakers' damage, J reset the debug arena.

---

## 5. Creatures

**Levels.** Every species comes in four levels: baby, young, adult and legend.

| Level | Health | Damage a second | Attacks? |
|---|---|---|---|
| Baby | 30 | 0 | never attacks, and is never attacked |
| Young | 60 | 4 | one attack |
| Adult | 120 | 7 | a stronger attack with a knockback or slow |
| Legend | 480 | 12 | see Legends |

(`config/combat.json` `levels`.) Some species shoot (owl, bat, raven, moth, glow-worm, spider, toad, salamander, snake, woodlouse). The rest bite, maul or charge. Every attack is telegraphed with a wind-up, and you can step aside or blink out of it. A charge that misses leaves the animal winded for 1.2 s, which is a free window for 💌s (`fight.charge.miss`).

**Who lives where.** Every area is peopled from the very start (Ed, 2026-10-07; no growth on a clock any more, and no animal appears out of sight). Each has **two babies** (`population.byRoute.babies` 2, at most `babyCap` 2) and **one young** (`population.start`), and on top of that a **threat** by its place on the waves' route: the fighting value its extra young and adults add, from about **12** at the first wave's stone to **355** at the 40th (`byRoute.threat`, straight lines between its points; F as in Balance: young 11.6, adult 40). Each kind spends it its own way (`byRoute.profiles`): heavy kinds (bear, boar, elk, stag, badger, ram, beaver) mostly as a few adults, packs (wolf, fox, otter) and the rest as young with some adults, and swarms (beetle, hedgehog, moth, spider and the like) as many young. Every wild area has **at least one young or adult** (`byRoute.minHostile` 1; Ed, 2026-10-07: "every wild area has at least one hostile wild creature"): where the curve gives an area none, it gets a young. Weaker species come in more numbers for the same danger (`strength`). So the areas the party reaches late are the dangerous ones. (`population.growth` is the old per-wave growth: the game no longer reads it, the balance simulators still do.) About **half the areas** also have a sleeping legend (`legends.share` 0.5), with a wild baby of its own kind in its circle.

**States.** Each animal is in one of these:
- **Wild**: as found. It roams its own area and attacks you on the ground once you're in its area or within its attack's range. It goes for your party animals within 30 m (`combat.aggro`). It gives up if you rise, or once you're 30 m past its area's edge (`combat.leaveArea`), then walks home. It ignores happy animals.
- **Happy**: won over with 💌s. It stays in its own area, defends it against enraged animals, and dances at its soundsystem once there is one. Its sigil lies as a little rune at its feet.
- **Leashed**: yours for good. It follows you or guards a sigil, and fights wild and enraged animals.
- **Enraged**: a wave put a soundsystem in its area. It has red eyes, besieges, attacks you and happy and leashed animals, **can't be invited and blocks 💌s**. Babies, happy and leashed animals are never enraged.
- **Dazed**: a wild animal knocked down in a fight lies stunned for **20 s** (`combat.daze`). Nothing attacks it, and **you can still invite it**. Then it runs off the map for good. Any other animal knocked down (an enraged one, or one of yours) runs off the map at once; one of yours is lost for the run.

No animal ever fights its own kind. Nobody dies: they "run off".

**Other behaviour**:
- Idle wild animals sometimes nap: 30% chance at each pause, for 20–60 s (`naps`). Landing on the ground in their area wakes them, with a 1.2 s yawn first.
- Curious kinds' babies come up to look at you, and skittish ones keep about 12 m off (`notice`).

---

## 6. Inviting with 💌s

- **Throwing.** On the ground, hold fire to throw one spinning 💌 every **0.55 s** (`invites.cooldown`, `invites.burst` 1). It flies at **31.2 m/s** for **33 m** (`invites.speed`, `invites.range`). It bends gently towards an invitable animal ahead (within 10 m and 30° of straight ahead, `invites.homingRange`, `invites.homingCone`). Trees never stop it.
- **What it hits.** It lands on the first wild (or dazed) animal in its path. **Enraged animals and legends stop it dead.** Your own and happy animals let it pass.
- **The meter.** Each 💌 that lands adds one to the animal's ring. A full ring takes **4 hits for a baby, 9 for a young, 18 for an adult** (`invites.hits`). Every hit counts, with no per-animal cooldown, so how fast you invite is just how fast you fire. That's roughly 2 s, 5 s and 10 s of steady hits. If you stop, the ring starts draining after 1.5 s at 8% of a full ring a second (that drain is set in `config/states.json`).
- **Winning over.** A full ring makes a wild animal **happy** (hearts), and its **rune** pops out at its feet straight away. Stand within 3.5 m of it (`leash.runeRadius`) and press **E** to leash it. Within 8 m it even trots over to you (`leash.runePull`).
- **Getting hit doesn't set an invite back.** The hit is the cost.

---

## 7. Sigils, leashing, posse

- **The stack.** Every leashed animal's sigil floats above her head, newest at the bottom.
- **Placing.** On the ground, **E puts the bottom sigil down** as a glowing rune (a **leash point**), and **E on one of yours picks it back up**. Q moves the bottom sigil to the top. Sigils can't go within 4 m of each other (`leash.spacing`), and a press too close just fizzles.
  - When several things are under her, she picks up in this order: her hat, then her own sigil, then a relic's sigil, then a happy animal's rune.
- **Leash length.** An animal roams within **8 m** of its leash point (`leash.length`) and runs back at its own pace if it falls behind. It never teleports.
- **Guarding.** Parked animals guard their sigil, taking on any wild or enraged animal of another kind within **40 m** (`guard.radius`).
- **Posse and travelling** (`config/travel.json`). A party animal within **60 m** of her while she's on the ground, or near its sigil, is in her **posse**: it fights. Anywhere else it's **travelling**. A traveller is invisible to enemies, fights nothing and eats nothing, and walks round area edges rather than through their middles. While she's in the treetops, everything following her is travelling.

---

## 8. Legends

**Asleep in their circles.** A legend lies half sunk in its own small clearing, mossed over like a boulder. The clearing is about 9 m across, bigger for big species (`legendClearing`), ringed with the area's tallest trees. **Waves don't wake legends.**

**Dreams and quests.** Stand within 60 m on the ground (`dreams.range`) and you see what a sleeping legend dreams of: one other species at one level (baby, young or adult). The dream points **deeper in**: a kind that lives in an area **later on the route** than the legend's own, within 6 areas (`legends.questCap`; `legends.questLater`). If none of those is in reach, it's the kind of the nearest later area; a legend with no later area dreams of any kind. The gamble is how hard that later area is to reach and fight through.
- **The early easy quest** is the exception: one legend among the first three areas the waves reach dreams of the baby of another of those three (`legends.earlyQuest`).
- **Bring exactly that creature, at that age, into its circle**, while the legend sleeps (or is restless), and the quest is done: one of yours standing inside counts, following you or parked (wherever its sigil lies), as does putting its sigil down inside. You get its **buff for good**, and the animal stays yours.
- The circle's panel names the dream in words beside its sigil ("a young elk"). If one of yours in the circle is the wrong kind or age, it says so: "Not this one: it dreams of a young elk, and you've brought an adult stag."
- **Every quest's buff is the same strength**, 1.25× as written (`legends.questRoll`), however far the dream creature lived: the encounter is the gamble, not the reward. (A relic's buff stays as written.)
- If the area's wave hasn't come yet, the ley line also moves on from it early, and the area counts as **friendly**. (Only animals that grew there *after* the quest were ever marked friendly, and nothing grows now, so in practice none are.)
- Drop the sigil just outside the circle and the circle flashes as a hint.

**Restless and angry.**
- Each legend checks every **5 s** whether any of its own kind is in its area. That counts any state: wild, happy, your parked ones, babies.
- With none, it grows **restless** (a nightmare bubble, from sad to furious). After **60 s** of that it turns **angry** (`config/legends.json` `angryAfter`).
- An angry legend shoots or lobs at you and your posse on the ground from up to **420 m** (`legends.json` `attack.range`), a volley every 15 s. Six species charge instead: boar, elk, stag, ram, hedgehog and woodlouse. They take a long, curving run, then walk home.
- With no witch in reach, an angry legend **bombards the nearest standing soundsystem** within 420 m, at **150 damage a hit** (`legends.bombard`).
- It **calms back to sleep as soon as one of its kind is back** in its area. Worn down in a fight, it also goes back to sleep. Either way it walks home to its spot first.
- (A "stomp" variant, where a legend turning angry flattens its own area's soundsystem, exists but is switched off: `legends.stomp.on` false.)

**Relics.** Six giant half-buried bottles and party objects lie on each map, one of each kind (`legends.json` `relics`): one just inside the edge of home, the rest scattered far out, at least 150 m apart. You can spot their glint from the treetops only through gaps in the canopy.
- Stand on a relic's sigil and press E to carry it.
- Press E inside a sleeping or restless legend's circle and the relic makes that legend **happy**.

**Happy legends.** A happy legend gives its **buff for good**. It defends its area, shooting enraged animals from up to **420 m** (`legends.happyRange`), and heals to full over **120 s** (`legends.json` `healTime`).
- **The party-legend Easter egg** (`legends.partyEgg` on): 100 💌s (`legends.partyHits`) turn a happy legend into a **party legend**. You can pick up its rune, but it never moves, and it pins you within 6.8 m of it (`legends.partyReach`). Totally useless, as intended.

**Buffs** (`config/legend-buffs.json`): 32 of them, one per species. Each changes **only your 💌s or your movement**. Buffs stack, within limits. Examples:
- Fox, *Charm*: 💌s home in hard.
- Stag, *Pierce*: 💌s fly through the first animal.
- Toad, *Spawn*: a 💌 that lands splits into three.
- Wolf, *Howl*: every 5th throw adds a ring of 💌s round you.
- Hare, *Dash bursts*: three blink charges.
- Mole, *Burrow*: rise and land twice as fast.
- Ram, *Steady*: no slowdown while firing.
- Raven, *Wings*: faster treetops.

**Slowed time in a calm circle.** While you stand on the ground inside the circle of a **sleeping or restless** legend, the **whole world slows to a tenth of its speed** (`legendCircle.slow.scale` 0.1, easing over 0.5 s). That includes the wave countdown, the music, every animal and every siege. You keep full speed.
- No attack reaches you in there from outside.
- **Enraged animals can't enter** a calm circle at all.
- A 💌 that leaves the circle from inside vanishes.

---

## 9. Berries and evolving

- **Where berries grow.** Each area has berry bushes in small patches, with about 23–34 berries per area at this area size (`berries.perArea` [10, 15] and `bushesPerArea` 20, scaled up for 168 m areas).
- **Who eats them.** Your leashed animals (never wild ones, never legends) nip off to eat a berry within 4.5 m of their path or their sigil (`berries.detour`), as long as it stays inside their leash. A sigil dropped in a patch makes a feeding spot.
- **Regrowing.** An eaten berry regrows at once on a random free bush somewhere else on the map, so the total never changes.
- **Evolving.** An animal evolves once it has eaten enough, on the music's next bar line: **4 berries from baby to young, then 4 from young to adult** (`berries.cost`). **Evolving stops at adult.**
- **Healing.** A berry also heals a hurt animal to full, and hurt adults still go looking for them.

---

## 10. Music, the beat and the ley lines

- **The track.** One generated, synthesised track (`config/music-style.json`), seeded per run.
  - During the boot it plays the intro, filling out as each speaker turns on.
  - Each wave brings the next step of the arc: Forest, Clearing, Lanterns, Night drive, Industrial, Breakbeat, Frenzy, Phonk, then Finale for every wave after that.
  - The tempo climbs from **120 to 140 bpm** and eases in over a few bars. A rising build leads into each wave.
  - Being knocked out plays a breakdown, and a siege nearby adds its own siege layers.
  - The music is full within 25 m of a playing soundsystem and muffled further off (`music.nearDist`, `music.farDist`).
  - In a sleeping legend's circle it goes muffled and slow, and the legend's own layer comes in.
- **The beat** drives the dancing animals, the lasers, the dancefloor tiles and the evolutions. The dancefloor gets brighter as more areas join the party: level steps at 3, 8 and 15 areas (`dancefloor.levels`).
- **The ley line** is a glowing line on the ground. It runs from the treehouse through every runestone, in the order the waves will reach them: the whole route, all the time. None of it shows before the boot's pulse, going round the home ring, reaches the point where the line leaves the ring (about a third of the way round). There it branches off, an extension of the boot's ring line, and its tip runs out to the first stone, reaching it as the boot ends. After that it grows on, reaching the third stone as wave 1 lands, then 3 links per wave (`leyLines.reveal`). A pulse runs along the current stretch with the wave countdown. A stone counts as reached when its wave comes, its area is cleared or its quest is done, whichever is first. Only the next stone gets an on-screen pointer.

---

## 11. Other things worth knowing

- **Party witches**: one extra witch flies in to dance on the dancefloor for every soundsystem playing.
- **Home's relic**: one relic always lies just inside the edge of home, so a new player stumbles on it.
- **Friendly babies**: a soundsystem turns its area's babies happy, including the baby in the legend's circle, which then dances inside the circle.
- **Animal strength**: every species currently has the same strength (`combat.json` `strength.species` is empty), so all species are equal for their level.
