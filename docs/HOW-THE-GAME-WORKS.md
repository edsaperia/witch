# How Witch works today

How the game behaves right now, as the rules code runs it (`src/rules/`), with the numbers from the config files. Knob names are in `backticks` the first time a number appears; most are in `config/tuning.json`. Where something couldn't be confirmed in the code, it says "(unsure)".

---

## 1. The big picture

You're a witch throwing a rave in a magical forest. The party starts at your home dancefloor and spreads out one area at a time. Each new area gets a **soundsystem**, which wakes that area's wild animals. They're offended they weren't invited, so they march on it to shut it down. You fly about inviting animals with 💌s, build a party crew, and park them where they're needed to defend. Every party ends eventually. When the last soundsystem and the home speakers fall, **the party's over**: the run winds down into a peaceful afterparty, with no game-over screen.

**The map** is a round island of **home and 10 areas**, one of each kind she knows, growing by one for each kind whose island she's found (wave 2 D, `rules/rosters.ts` `knownKinds`: its first areas keep their places and kinds, each new kind an area further out; `map.islandAreas` 10 its least; Ed, 2026-10-11, the journey's first step: `?island=10|20|30|40|50` for bigger ones, `?island=off` for the old map of about 100, `map.radius` 5.6), the areas nearest home, each about 168 m across (`areaSize` 28 × `areaScale` 6). It has 32 area types, each with its own species: moor/badger, fern forest/boar, muddy forest/snail, stone shrine/fox, tangly forest/ram, wispy forest/woodlouse, hazel forest/hedgehog, garden/squirrel, twiggy forest/wolf, ancient/stag, Norway/stoat, alder/snake, meadow/hare, old oaks/owl, berry thicket/bear, wetland/toad, stream/otter, rocky slope/lynx, bog/elk, deadwood/raven, cave mouth/bat, grassland/mole, beaver pond/beaver, log pile/beetle, heath/moth, old pinewood/marten, ravine/salamander, meadow/wildcat, holly thicket/spider, honeysuckle tangle/dormouse, fen/newt and heronry/heron. The island grows out from home over its areas, more irregular the further out its phase (Ed, 2026-10-11: home near-round; phase 1 gently lobed; 2 bays and a peninsula; 3 arms and inlets; 4 and 5 strongly irregular; `rules/islandGrowth.ts`, the tuning's `map.shapes`), and its coast runs round its own areas (its playable ones and every area within about 180 m of them), following their ragged borders rather than a circle (the land map, `rules/land.ts`). From phase 1 an island has lakes: a few of its areas are water (never home or its neighbours), with small shores rather than beaches, water lighter than the sea, and koi in some. She can fly over a lake in the treetops but can't land on it; on foot she, and every creature, stops at the shore, and creatures go round. A beach runs round the coast. Fly out past it and she lands and lies down to stargaze, and now and then there's a beach witch to cuddle up with (an Easter egg).

**Home** is the middle area: the dancefloor, a ring of 12 speakers (`dancefloor.speakers.count`) and the treehouse. Home has no animals and no legend.

---

## 2. How a run plays out

1. **Dress her up.** The run opens in the character creator. When the scroll unrolls, click it (or press Enter) to **cast the party spell**. The cast takes 1.2 s, and she can't move until it's done.
2. **At the decks.** She sits behind the decks in the treehouse until you first move or rise.
3. **Boot-up.** When she leaves the decks a pulse runs from the treehouse down to the home ring and round it at 4 m/s (`boot.speed`: the ley pulse's speed till Ed slowed the waves to 1 m/s on 2026-10-18, the boot kept as it was), turning each little runestone into a speaker as it passes: the first about 3 s in, the whole 179 m path in **about 45 s**. The animals still attack during it, but no waves come.
4. **Waves.** When the boot ends, the ley pulse sets off along the route at a **constant 1 m/s** (`leyLines.pulseSpeed`; Ed, 2026-10-18: "Default starting wave speed is 1m/s"; 4 before; times the party's tempo, so a knockdown's BPM speeds it; Ed, 2026-10-09: "Pure constant speed"), and **a wave lands as it reaches the next stone**: each gap is that link's length over the speed, no fixed interval. Links run about 30 m to 600 m, so at 1 m/s gaps run from half a minute to ten minutes. The dancefloor switches on at the first wave. The pause page's **Waves** slider (pinned at its top, beside Volume) sets the speed live, 0 (the waves held) to 6 m/s, and this browser remembers it; `?pulse=<m/s>` or `?pulse=off` sets it for one load. (The bedroom's Waves dropdown is gone. The Player dropdown, a human or a bot playing the run, shows in the bedroom's top right only with the debug overlay on, whose ` key now works in the bedroom too: Ed, 2026-10-11.)
5. **Each wave goes to the next stone on the route** (`party.areasPerWave` 1). It doesn't take every neighbour, just the next area along a route planned for the whole map (`party.picker` "route", `party.route` "spiral"): outward from home, ring by ring, crossing itself as little as possible. The ley line traces that same route, so you always know what's next. The waves keep that schedule whatever you do: each takes the next stone on the route, never skipping one.
   - If that stone is still wild, the wave **partifies** its area (below).
   - If you've **cleared** it already, so its soundsystem plays, the wave **does nothing to the rules**: no animal is enraged and no second soundsystem comes. It **celebrates** instead (the `waveCelebrate` event: fireworks and that soundsystem's lasers). The music's next step, the ley line and the countdown carry on as normal.
   - If its early soundsystem has been lost, the wave passes it quietly.
6. **Clearing an area** (Ed, 2026-10-07: the new core design) transforms its runestone **at once**, without waiting for its wave. An area is cleared when **none of its own wild young and adults is left**: every one of them invited, or run off. Its **babies don't count** (Ed, 2026-10-07: "Wild babies don't count; they should become party animals when the transition happens"): when it transforms they turn happy and dance, as party animals. Nor do its sleeping legend and the wild baby in its legend's circle. Only the area's **own** animals count, wherever they've wandered: a visitor from next door standing in it never holds it back, and isn't touched when its stone transforms (Ed, 2026-10-07). A few times a second the game looks (rules/clear.ts) and does just what a wave would (the `areaCleared` event): the soundsystem rises, the babies (the circle's too) turn happy and dance, a party witch comes, the area's music plays and its ley stone counts as reached. While she's in a wild area that can still be cleared, a line under the clock says how many of its own wild young and adults are left (and how many of them are asleep or knocked down: a sleeper wakes when she lands in its area or a 💌 reaches it, one knocked down runs off after its daze), and the last three each get a pointer, toward it off screen and over it on screen (Ed's playtest, 2026-10-07: some were out of sight). An early soundsystem **can be attacked** (besiegers marching on, an angry legend's bombard), and losing one works as any other (below).
7. **A new soundsystem** rises at the area's runestone. It has **500 health** (`combat.soundsystemHealth`; Ed, 2026-10-08, from 4000: shorter games, falls that cascade, and you must stop a swarm before it arrives). Home is its ring of **12 speakers**, each **500 health** (`combat.speakerHealth`; Ed, 2026-10-08). When it arrives:
   - the area's wild young and adults become **enraged** and **besiege** it (none, when you cleared it). Besiegers march at **half their top speed** (`combat.marchShare` 0.5 of their kind's fight run: a wolf about 7 m/s; Ed, 2026-10-11, "they should visibly hurry"), on their own area's soundsystem and marching on alike, and run at full speed once within 40 m. Against a soundsystem or speaker, a charging kind (boar, elk, ram, hedgehog...) doesn't charge and a swooper (owl, raven, bat) doesn't swoop: each lands and uses its ordinary attack (Ed, 2026-10-11: a charge struck it once a run, a swoop once a dive). At her and her animals they charge and swoop as ever;
   - its wild babies turn **happy** on the spot and join the party, whether you cleared it or its wave transformed it (Ed, 2026-10-07: "Wild babies become party babies when the pulse transforms an uncleared area");
   - its happy animals come and **dance** round it, or at the area's party spots.
8. **Losing a soundsystem**: the area is **ruined** and its party ends for good. Its happy babies run off the map for good, and its besiegers march on to the **next-nearest standing soundsystem** that's **no further from the centre** than they are (Ed, 2026-10-11: enraged animals march inward; one they're within 10 m of already counts), home's speakers always included, at the besiegers' march (below). A loss touches neither the wave countdown nor the tempo (Ed, 2026-10-08: "Losing a soundsystem no longer touches the wave countdown", "doesn't affect the bpm").
9. **The party's over** once the home ring's last speaker is down, whatever soundsystems still stand (Ed, 2026-10-10; rules/partyOver.ts):
   - the waves stop and nothing fights;
   - the lights and music wind down over 6 s (`partyOver.ease`);
   - any soundsystem still standing switches off as the lights go out across the map: silent and dark, still standing, not destroyed;
   - every animal (yours too, and the ones that ran off) walks home or is simply there, asleep;
   - you can wander the map safely.
10. **The night won**: the end of the route (Ed, 2026-10-10, 2026-10-11; rules/win.ts, tuning `win`):
   - **Last call:** while the next wave's stone is the route's last, the wave pointer shows 🎉 instead of 🎶.
   - **Stragglers first:** once the last wave has landed, or as soon as **every area on the island is cleared** before its wave (Ed, 2026-10-12: the waves still to come would only celebrate, so nothing waits for the wave's pulse to reach the route's end), while any enraged animal lives, a pointer shows the way to the one **nearest the centre** (re-picked four times a second). Enraged **legends don't count**: they never hold the win up.
   - **The victory lap:** with none left, at once, **two** fast pulses (sparklers) set off from wherever the wave's pulse is on the ley line (Ed, 2026-10-12), one racing back to home and one on to the route's end, both at **120 m/s** (`win.lapSpeed`), the pointer following the one going home with 🎉, each stone either passes shooting **fireworks** (the outward one lighting the line as it goes), the waves stopping as it sets off, the music on to its **victory** section from that block (the music style's `victory`; the drop until it has one).
   - **The win**, as the lap reaches home:
     - the night's legends (the dealt kinds', `map.legendKinds`) wake and come home to dance as **party legends**, dancing in place on the dancefloor's far (north) side, beyond the conga and behind it all from the camera: in an arc 12 m outside the conga's ring, 14 m apart, clear of the treehouse, a row further out if many (`win.legendGap`, `legendRow`, `legendSpace`, `legendArc`); they don't join the conga;
     - an enraged legend calms and goes back to sleep in its clearing instead;
     - the win itself finds **no islands** (Ed, 2026-10-18: "Just winning an island does not unlock more islands"): the islands found are those whose legends' quests you did tonight, and the won night is what keeps them on the sea chart;
     - every other animal on the island becomes a party animal, and they all join **one conga line** round the dancefloor (2.5 m/s, 2.4 m apart, a circle at least 34 m across or as big as the line needs: `win.conga*`), walking to their places (out of her sight, they're simply there); her leash lets go of hers to join it;
     - **fireworks** from every soundsystem still standing;
     - **the island's sigil flares on the dancefloor** (its kind's, home's the World Tree: rules/rosters.ts), drawn on again over 3 s and held 16 s (`win.flareDraw`, `win.flare`), then the party's patterns again;
     - each woken legend's **dream bubble shows its home island**: its coast with its sigil, the picture the sea chart shows;
     - nothing fights and no more waves come.
   - About 20 s later (`win.cardAfter`) the **Night won** card lists the **islands found tonight**, one for each legend whose quest you did this night (or says none were), with a button on to a new island (the sea chart's). Only now are they saved to the sea chart: a night lost keeps none of them (Ed, 2026-10-18).
   - Losing still comes first: if home's speakers all fall before the lap reaches home, the party's over as above.

Home's speakers are each a soundsystem in the fight: animals marching on home go for the nearest speaker still standing, and on to the next nearest when it falls. Each shows its own damage (damaged at half its health, destroyed at none). Home is lost, and the next wave hurried, only when the last speaker falls; and with it the party's over.

---

## 3. The witch

**Two modes.** One button switches between them. Rising takes 0.7 s (`riseTime`) and landing 0.55 s (`descendTime`). After she lands she **can't rise again for 3 s** (`riseCooldown`; Ed, 2026-10-11: rising takes her out of ground mode, and out of reach, at once, so players rose instead of dodging); a press before then does nothing.
- **On the ground**, under the trees, at **19.25 m/s** (`groundSpeed`). It's snappy, she stops dead, and it's where all the action is: inviting, sigils, fighting. Firing 💌s slows her to 0.8× (`invites.fireSlow`).
- **In the treetops**, above the canopy, at **48 m/s** (`treetopSpeed`). Holding a direction builds a boost up to **1.7×** over 2 s (`treetop.boost`, `treetop.boostTime`), and she has momentum and wide swoops. Sharp turns bleed the boost. From up here you only see the ground through clearings. **She can't be hurt in the treetops**: every attack in the code only targets her on the ground. She can't invite or place sigils from up here either. In the treetops the sigil button cycles her stack instead.

**Health.** She has **4 hits** (`witchHealth.hits`), and every blow costs one, whatever it was: the first three each leave a glowing claw slash on her, and the fourth knocks her out. She gets one back every **20 s** (`witchHealth.repairTime`), but the timer restarts at every hit, so to heal you have to get right out of the fight. After a hit there's **0.5 s of grace** (`witchHealth.grace`) when nothing else lands, so a pack striking together costs one hit, not four.

**Knockback and stagger.** A blow throws her back (2.5 m plus a share of the attack's own knockback, at least 12 m from a charge, at most 14 m: `witch.knock`). She's then staggered for 0.25–1 s, with no moving, blinking or 💌s. After a stagger she can't be staggered again for 1 s.

**The blink (dodge).** Ground only. She vanishes and reappears **10 m** away (`dash.distance`), **the way she's moving** (her steering, on the pad, keyboard and mouse, and touch alike; Ed, 2026-10-11: not the way she's aiming), and standing still, the way she's facing (up or down the screen when she's turned that way, else left or right). `dash.toCursor` (off) brings back blinking toward the cursor. She can blink **once a second** (`dash.cooldown` 1). She's untouchable only for the blink's 0.05 s (`dash.gone`), so it's for slipping out of a shot's path, not for tanking. A press up to 0.2 s early is remembered (`dash.buffer`). She never lands inside a tree, rock, soundsystem, speaker or the treehouse.

**Speed spell.** One spell is equipped: **speed** (`spells.equipped`). It gives **2.2× speed for 4 s** (`spells.speed`), then **12 s** to recharge after it ends (so one cast every 16 s). It works in both modes.

**Sigil weight.** Every sigil she *carries* (not ones placed on the ground) pulls on her by how taut its leash is (`leash.weight`). The first 2.5 "weight units" are free. Past that:
- moving away from the pull is slower, and she drifts towards it;
- rising takes longer;
- over the treetops she's slowly pulled down.

Babies weigh 0.3, young 0.8, adults 2 and legends 3 (`leash.weight.levels`). So you can't just drag a huge army everywhere.

**Knocked out.** At zero hits she collapses.
- Her carried sigils come off one a second, bottom first (`knockout.releaseEach`). **Each is put down where its animal stands, so they stay hers** as a parked group.
- She sparkles out and back in **behind her decks** (the teleport takes 1.6 s, `knockout.teleport`) with full health. She scratches there until **6 s** after she went down (`knockout.respawn.base`), the same every time: repeat knockdowns no longer wait longer (Ed, 2026-10-07: "We can remove the extra knockdown time", since each knockdown costs a BPM instead; `respawn.step` 0).
- **She drops her hat** where she fell, and a 🎩 pointer shows the way back to it. Stand on it and press the sigil button to put it back on. If she gets knocked out again before picking it up, no second hat drops. (The hat doesn't change any number that could be found in the rules.)
- **The beat speeds up** (Ed, 2026-10-07: "the BPM goes up by 1 each time you die": the DJ's off the decks and the crowd gets restless; 2026-10-08: "Knockdowns increase the bpm by 5"). Each knockdown adds **5 BPM** to the party's tempo for the rest of the run (`knockout.bpmStep`; `knockout.bpmCap`, if set, is the most it can add), eased in from the next bar line over a bar (`beat.knockBeats` 4). The music follows it, and the wave countdown and the ley line's pulse run that much faster (the tempo with the bonus over the wave's own), so every wave comes a little sooner. The tempo shows on the wave pointer (the sparkler's marker) and on a little display over her decks (Ed: "The BPM is shown on the sparkler marker, and above the decks"), both pulsing as it rises.

---

## 4. Controls

| | Keyboard and mouse | Gamepad | Touch |
|---|---|---|---|
| Move | WASD or arrows | left stick or d-pad | joystick where your left thumb lands |
| Aim 💌s | mouse cursor | right stick | the way she's going |
| Throw 💌s | left click (hold) or 1 | right trigger | 💌 button (hold) |
| Blink | right click | left trigger | dash |
| Rise / land | Space | cross | rise / descend |
| Place / pick up sigil | E | square (cycles in the treetops) | sigil (cycles in the treetops) |
| Cycle the sigil stack | Q (on the ground or in the treetops) | triangle | — |
| Speed spell | R | circle | spell |
| Zoom | mouse wheel, Z / X, + / − | LB / RB | + / − |
| Debug overlay | ~ | Back/Select | three-finger tap |

- **Cast the party spell**: the on-screen scroll, or Enter, or the spell key.
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

(`config/combat.json` `levels`.) Some species shoot (owl, bat, raven, moth, spider, toad, salamander, snake, woodlouse). The rest bite, maul or charge. Every attack is telegraphed with a wind-up, and you can step aside or blink out of it. A charge that misses leaves the animal winded for 1.2 s, which is a free window for 💌s (`fight.charge.miss`).

**Wild flyers swoop** (the owl, the bat and the raven; `movement.json` `swoop`, `rules/movement.ts` `stepSwoop`). Hostile ones rise and circle her out of reach, drawn up in the air over their shadows: 💌s pass under them, and no blow or talk reaches them. Then each telegraphs, with a red ring tightening round its shadow, and dives along a straight line at where she'll be when it gets there (`lead` of her velocity at the moment it lets go). Its aim locks `dodge.a.commit` (0.18 s) before it drops, as a strike's does: a bat's dive reaches her in about a tenth of a second, so the blink that beats it comes as its aim locks. Walking straight on gets her caught; turning or blinking as it lets go beats it. It skims low at the bottom and climbs back up. Only in the dive and at the bottom can it be hit or invited.
- **Owl:** a slow, wide circle 8 m up, then one heavy dive after a 1.5 s telegraph, open for the dive and 2 s at the bottom.
- **Bat:** fast and erratic, 6 m up, with three quick dives a bout, each telegraphed for 0.5 s with a screech, open for 1 s at the bottom.
- **Raven:** climbs to nearly twice its 9 m while it telegraphs, so its shadow grows, then dives hard and throws her back.

Her own flyers, leashed or happy, fight on the ground as before.

**Who lives where.** Every area is peopled from the very start (Ed, 2026-10-07; no growth on a clock any more, and no animal appears out of sight). Each has **two babies** (`population.byRoute.babies` 2, at most `babyCap` 2) and its **hostile swarm**: its young and adults, the ones a wave enrages and sets marching (Ed, 2026-10-08; `population.swarm`). Its strength grows with the area's wave, on **one master curve over waves 1 to 64** (Ed, 2026-10-10, 2026-10-11; `swarm.waves`): wave 64 brings the final swarm, so every island plays the curve from wave 1 as far as it has areas (a 10-area island stops at about 1.5 young), and a bigger map holds there after; and **picking a species never changes the challenge** (Ed's swarm plan, 2026-10-08). Each species is in a **class** (`swarm.classes`): **strong** (bear, boar, elk, stag, badger, ram, beaver: at most **6**, each twice as tough and hard-hitting), **medium** (the rest: at most 12) and **light** (hedgehog, mole, dormouse, newt, toad, snail, salamander, bat, moth, beetle, spider, woodlouse: at most **16**, three-quarters as strong). The challenge is a medium swarm of **1** creature at wave 1, all young, growing to **12** at wave 64 (`swarm.endAverage`, along `swarm.curve` 1.3), by then mostly adults (`swarm.youngShare` 1.0 → 0.2). A swarm's power is its total health times its total damage a second; each area gets the swarm of its species whose power comes nearest, a **mix of young and adults** wherever one is within 10% (`swarm.mixTolerance`). At wave 64 a swarm deals about **105 damage a second**: a soundsystem lasts about 5 s. The witch doesn't come into it: she takes three hits whatever hits her. A 10-area island holds about 15 young and adults all told, a 50-area one about 210, the old map of about 100 areas about 750 (with the master curve; about 540 before). So the areas the party reaches late are the dangerous ones. (`population.growth` is the old per-wave growth: the game no longer reads it, the balance simulators still do.) About **a fifth of the areas** also have a sleeping legend (`legends.share` 0.2; Ed, 2026-10-08: "more like 1/5", half before), with a wild baby of its own kind in its circle.

**States.** Each animal is in one of these:
- **Wild**: as found. It roams its own area and attacks you on the ground once you're in its area or within its attack's range. It goes for your party animals within 30 m (`combat.aggro`). It ignores happy animals. **The hunt** (Ed, 2026-10-07; `hunt.on`): once you've landed in its area and its watch is over, every one of that area's own awake young and adults hunts you while you're in the area, wherever in it they are, never giving up or napping. **A 💌 wakes the area** (Ed, 2026-10-08; `wildWatch.inviteWakes`): the moment one of your letters lands on any of its wild animals, its watch is over and its young and adults, napping or not, come for you at once by these same rules (so only while you're in the area). Over the treetops there they hold (they can't reach you) and come on again as soon as you land. It stops when it's invited (or enraged by a wave, or knocked down and run off). Leave the area and they lose interest, as before (Ed: "they should lose interest and go home if you leave their area, as they did before"): they give up 30 m past their edge (`combat.leaveArea`) and walk home. Come back while the area still remembers you (`wildWatch.forget`, 20 s after you were last on the ground in it) and they hunt you again at once; later, its watch plays again. Knocked out, they all give up, walk home and roam again, and your next visit starts with the watch (DECISION FOR ED). Babies don't fight, and the legend and its circle's baby keep to their own rules. Any other wild animal that goes for you (one from a neighbouring area, say) gives up if you rise, or once you're 30 m past its area's edge (`combat.leaveArea`), then walks home.
- **Happy**: won over with 💌s. It stays in its own area, defends it against enraged animals, and dances at its soundsystem once there is one. Its sigil lies as a little rune at its feet.
- **Leashed**: yours for good. It follows you or guards a sigil, and fights wild and enraged animals.
- **Enraged**: a wave put a soundsystem in its area. It has red eyes, besieges, attacks you and happy and leashed animals, **can't be invited and blocks 💌s**. Babies, happy and leashed animals are never enraged.
- **Dazed**: a wild animal knocked down in a fight lies stunned for **20 s** (`combat.daze`). Nothing attacks it, and **you can still invite it**. Then it runs off the map for good. Any other animal knocked down (an enraged one, or one of yours) runs off the map at once; one of yours is lost for the run.

No animal ever fights its own kind. Nobody dies: they "run off".

**Other behaviour**:
- Idle wild animals sometimes nap: 30% chance at each pause, for 20–60 s (`naps`). Landing on the ground in their area wakes them, with a 1.2 s yawn first. **Letters wake them too** (Ed, 2026-10-11): a 💌 that reaches a napping wild animal rouses it at once, wherever you are (the next area over, or the treetops' edge), and lands as an ordinary invitation, waking its area as any 💌 does. (Before, letters flew straight through a sleeper until you landed in its area.) The party's-over sleep at the end of a run is untouched.
- Curious kinds' babies come up to look at you, and skittish ones keep about 12 m off (`notice`).

---

## 6. Inviting with 💌s

- **Throwing.** On the ground, hold fire to throw one spinning 💌 every **0.55 s** (`invites.cooldown`, `invites.burst` 1). It flies at **31.2 m/s** for **33 m** (`invites.speed`, `invites.range`). It bends gently towards an invitable animal ahead (within 10 m and 30° of straight ahead, `invites.homingRange`, `invites.homingCone`). Trees never stop it.
- **What it hits.** It lands on the first wild (or dazed) animal in its path. **Enraged animals and legends stop it dead.** Your own and happy animals let it pass.
- **The meter.** Each 💌 that lands adds one to the animal's ring. A full ring takes **4 hits for a baby, 9 for a young, 18 for an adult** (`invites.hits`). Every hit counts, with no per-animal cooldown, so how fast you invite is just how fast you fire. That's roughly 2 s, 5 s and 10 s of steady hits. If you stop, the ring starts draining after 1.5 s at 8% of a full ring a second (that drain is set in `config/states.json`).
- **Winning over.** A full ring makes a wild animal **happy** (hearts), and its **rune** pops out at its feet straight away. Stand within 5.6 m of it (`leash.runeRadius`) and press **E** to leash it. Within 8 m it even trots over to you (`leash.runePull`).
- **Getting hit doesn't set an invite back.** The hit is the cost.

---

## 7. Sigils, leashing, posse

- **The stack.** Every leashed animal's sigil floats above her head, newest at the bottom.
- **Placing.** On the ground, **E puts the bottom sigil down** as a glowing rune (a **leash point**), and **E on one of yours picks it back up**. Q moves the bottom sigil to the top. Sigils go down on a **world-fixed hex grid**, 4 m between neighbouring cells (`leash.hex.size`; Ed, 2026-10-11: so a cluster of them reads cleanly). The cell nearest her decides: if one of her sigils is in it, the press picks it up; if it's free, the bottom sigil goes down in its middle. Nothing fizzles. Cells under a runestone or soundsystem (`leash.hex.stone`) or one of home's speakers (`leash.hex.speaker`) are skipped: the sigil goes down on the nearest free cell that isn't, within two cells, or not at all. Relic sigils and her hat still go down where she stands. A parked animal rests **north** of its sigil, and a happy animal's rune lies **south** of it, by its size: the sigil's top just below its feet (its body radius, half the sigil with its backing, and `leash.runeGap`, 0.5 m: `rules/runeOffset.ts`; Ed, 2026-10-13), so the whole sigil stays in sight.
  - When several things are under her, she picks up in this order: her hat, then her own sigil, then a relic's sigil, then a happy animal's rune.
- **Leash length.** An animal roams within **8 m** of its leash point (`leash.length`) and runs back at its own pace if it falls behind. It never teleports.
- **Guarding.** Parked animals guard their sigil, taking on any wild or enraged animal of another kind within **40 m** (`guard.radius`). One parked with its sigil in the **home area** guards the whole home area instead: any wild or enraged animal anywhere in it, and nothing outside it.
- **Posse and travelling** (`config/travel.json`). A party animal within **60 m** of her while she's on the ground, or near its sigil, is in her **posse**: it fights. Anywhere else it's **travelling**. A traveller is invisible to enemies, fights nothing and eats nothing, and walks round area edges rather than through their middles. While she's in the treetops, everything following her is travelling.

---

## 8. Legends

**Asleep in their circles.** A legend lies half sunk in its own small clearing, mossed over like a boulder. The clearing is about 9 m across, bigger for big species (`legendClearing`), ringed with the area's tallest trees. **Waves don't wake legends.**

**Dreams and quests** (Ed, 2026-10-18: "Legends accept any level animal for their quest, at which point they fight for you and unlock their island"). Stand within 60 m on the ground (`dreams.range`) and you see what a sleeping legend dreams of: one other **kind**, any age (its bare sigil, no age frame). The dream points **deeper in**: a kind that lives in an area **later on the route** than the legend's own, within 6 areas (`legends.questCap`; `legends.questLater`). If none of those is in reach, it's the kind of the nearest later area; a legend with no later area dreams of any kind. The gamble is how hard that later area is to reach and fight through.
- **The early easy quest** is the exception: one legend among the first three areas the waves reach dreams of the kind of another of those three (`legends.earlyQuest`).
- **Put down the sigil of an animal of that kind, any age, inside its circle**, while the legend sleeps (or is restless), and the quest is done **on the spot**, wherever the animal is; it walks over to its sigil afterwards. One of yours of that kind standing inside the circle counts too, following you or parked. The animal stays yours.
- **The legend wakes happy at once and fights for you** (below), and **its island is found tonight**. The island is kept on the sea chart **only if the night is won** (Ed, 2026-10-18: "The island is only kept if the night is won"); lose the night and tonight's islands are not kept.
- **No boon** (Ed, 2026-10-18: "Finishing quests no longer gives boons").
- The circle's panel names the dream in words beside its sigil ("a badger, any age"). Drop the wrong kind in the circle, or bring one in, and it says so at once: "Not this one: it dreams of an elk, and you've brought a young stag."
- If the area's wave hasn't come yet, the ley line also moves on from it early, and the area counts as **friendly**.
- Drop the sigil just outside the circle and the circle flashes as a hint.
- **Once the party's over, no legend takes a quest** (Ed, 2026-10-18: permanent unlocks only happen while the party is on): its dream closes and the panel says it sleeps on.

**Restless and angry.**
- Each legend checks every **5 s** whether any of its own kind is in its area. That counts any state: wild, happy, your parked ones, babies.
- With none, it grows **restless** (a nightmare bubble, from sad to furious). After **60 s** of that it turns **angry** (`config/legends.json` `angryAfter`).
- An angry legend shoots or lobs at you and your posse on the ground from up to **420 m** (`legends.json` `attack.range`), a volley every 15 s. Six species charge instead: boar, elk, stag, ram, hedgehog and woodlouse. They take a long, curving run, then walk home.
- With no witch in reach, an angry legend **bombards the nearest standing soundsystem** within 420 m, at **150 damage a hit** (`legends.bombard`).
- It **calms back to sleep as soon as one of its kind is back** in its area. Worn down in a fight, it also goes back to sleep. Either way it walks home to its spot first.
- (A "stomp" variant, where a legend turning angry flattens its own area's soundsystem, exists but is switched off: `legends.stomp.on` false.)

**Relics.** Giant half-buried bottles lie on each map, **one per 10 areas** the waves reach, at least one (`legends.json` `relics.perAreas`; Ed, 2026-10-11): one just inside the edge of home, the rest scattered far out, at least 150 m apart. Each is one of the six bottles, mirrored or not, in one of six colours (its glass and glowing liquid; `relics.colours`): **72 kinds** (Ed, 2026-10-11). A map never holds the same bottle in the same colour twice, mirrored or not, while there are looks to spare (36). You can spot their glint from the treetops only through gaps in the canopy.
- **A flask is a growth spurt** (Ed, 2026-10-18: "All flasks give growth spurt (all creatures following you become adults)"). Stand on its sigil and press E to **drink it on the spot**: every animal **following you** (on your stack, not parked at a sigil) younger than an adult becomes an **adult at once**, with the evolving's flash and sparkle burst on each. With nothing following you to grow it does nothing (a refusal's sound) and the flask stays where it lies. It's not carried, and it no longer wakes a legend.

**Happy legends.** A legend is made happy by doing its quest. It gives **no buff** (Ed, 2026-10-18). It defends its area, shooting enraged animals from up to **420 m** (`legends.happyRange`), and heals to full over **120 s** (`legends.json` `healTime`).
- **The party-legend Easter egg** (`legends.partyEgg` on): 100 💌s (`legends.partyHits`) turn a happy legend into a **party legend**. You can pick up its rune, but it never moves, and it pins you within 6.8 m of it (`legends.partyReach`). Totally useless, as intended.

**Buffs** (`config/legend-buffs.json`): 32 of them, one per species. Each changes **only your 💌s or your movement**. **Nothing grants them now** (Ed, 2026-10-18: no quest boons, and flasks and happy legends give none); the file and the code stay, and `?buffs=` still forces some on for testing. Buffs stack, within limits. Examples:
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
