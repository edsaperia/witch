# Attack legibility audit: home island creatures (youths)

2026-11-13. Ed: "The main gameplay variety comes through creature variety which doesn't read super well yet; they are mostly fought
the same and feel the same; dodge attacks and shoot ... I think more work on communicating varied attack effects will make the
differences clearer." / "Attack legibility audit of home island creatures, let's go!" / "you only need to do youths" ("the home
island is mostly youths").

An audit only: no game behaviour, numbers or art changed. Tools: `tools/balance/attackaudit.mjs` (the measures, real rules headless)
and `tools/balance/attack-audit-sheet.cjs` (the contact sheet, Fight Arena at the normal camera). Raw tables:
`tools/balance/attack-audit/<kind>.md` and `.json`.

## The roster (checked, not assumed)

Home's kinds are the ten with phase 0 (`art/areas/*/kind.json`, `rules/rosters.ts homeKinds`): **hedgehog, squirrel, hare, fox, bee,
stoat, mole, snail, dormouse, badger**. A night deals 5 of them (`HOME_START`), plus the kinds of islands she has found. The bee
replaced the marten (now benched), which matches the brief. The **turtle is not a home kind**: it is phase 1 and lives in the Fen,
the newt's old area. It reaches home only after its island is found, so it is left out here.

## How it was measured

- **Measures** (`node tools/balance/attackaudit.mjs`): the whole game through `stepGame`, one or three youths of a kind placed
  25–33 m from her, 3 seeds × 60 s each. Four bots: **still**; **strafe** (walks round the nearest one); **dodger** (strafes, and
  blinks when a telegraph about to fire covers her, or a bolt, lunge, lob, charge or burrow is about to reach her, 0.15 s after it
  shows); **chase** (closes to 12 m and throws 💌s at the nearest one).
- **What lands** comes from the game's own attack observer (`rules/attackObservation.ts`). That splits blows into the *grammar*
  path (the kind's own attack in `config/species-attacks.json`) and the *pack* path (the pack moves: generic bolts, nips, rams,
  specials).
- **Her state** is read every frame: seconds slowed, staggered and confused, and metres knocked back.
- **Caveats.** These are bots, not Ed. The chaser aims straight at the target with no lead. Three seeds is enough to show
  differences of 2× or more, not small ones.

## Three facts that frame everything

1. **Every blow costs her exactly one of her 4 hits** (`hitWitch` → `hurt`), with 0.5 s of grace after it. A config "damage" of
   0.5 or 0.8 changes nothing for her; it only matters against creatures and soundsystems. So the kinds cannot feel different
   through how hard they hit.
2. **Every blow also knocks her back 2.5 m and staggers her 0.25 s** (`witch.knock` base). A "knockback 7" adds only 3.85 m and
   0.27 s to that.
3. **Only three home kinds do anything else to her:**
   - the snail slows her;
   - the stoat confuses her;
   - the badger throws her a little further.

   On paper the other seven have no effect at all. In practice the hedgehog's charge ram also throws her 12 m.

## Each kind (youth)

Speeds are each kind's movement speed from `creature.js` × `creatureSpeed` 0.6 × 1.7 for the "fast" ones (`creatureSpeeds.fast`:
hare, stoat, bee). Telegraphs are all the same red danger frame (Ed, 2026-11-02: "the telegraph should be red"). The element sets
the bolt's and impact's colours (`config/attack-look.json`).

**Blows a minute.** In the row text, alone: stand / strafe / dodge. In the table it is shown as alone (×3: in a group of three).
(`tools/balance/attack-audit/*.md`)

### Hedgehog: slow roller (speed 10, the slowest but the snail)
- **On paper:** a ring of 6 quills, reach 6 m, wind-up 0.7 s, cooldown 2.2 s. Pack moves: a **charge** (weight 0.65, cooldown 5 s)
  and the quill fan.
- **In play:** what lands is the **charge ram**, 12 m of throw per blow:
  - stood still, it threw her 72 m a minute and staggered her 5.6 s a minute, the most of any kind;
  - the quills almost never land.

  Blows 6.0 / 1.0 / 0 (×3: 11.7 / 0 / 1.0).
- **Sees:** for the quills, a spread pose and six red lanes, brown "wood" bolts. The charge has no grammar telegraph.
- **Hears:** a squeaky "small" babble; a thump and whoosh as the ram throws her.
- **Asks for:** step aside from the roll. A real counter, and different from the rest, though nothing marks it.

### Squirrel: lobber (speed 18)
- **On paper:** an acorn lobbed onto where she stands, 2.5 m splash, 1 s flight, range 22 m, wind-up 0.6 s.
- **In play:**
  - the acorn is what lands: 9 / 1.7 / 0 (×3: 25.7 / 3.7 / 0);
  - no effect on her;
  - the landing circle is drawn the whole of the flight, so walking defeats it.
- **Sees:** no pose. A red landing circle; an acorn sprite; brown "wood" rubble at the hit.
- **Hears:** small babble; a shared lob "thud" as it lands.
- **Pursuit:** the second-hardest to stun (5.7 s alone; 22 s for three). It spends 51% of its time stopped, in spells of about
  0.4 s, and in threes the median speed at a landed 💌 was 0: **her 💌s land in its pauses.**
- **Asks for:** keep moving. The same as every other shooter.

### Hare: hopper (speed 20 × 1.7, the fastest at home)
- **On paper:** a stamp, a 4 m ring of ground jolting round itself, reach 3 m.
- **In play:** **its stamp almost never happens.**
  - Every blow measured was the generic pack bolt, "moon-dust bolt" (`pack.ranged`, weight 0.6): 6.3 / 2.0 / 0
    (×3: 19.7 / 2.7 / 0).
  - The stamp showed up only twice in all the runs (ring telegraphs, a group of three).
  - No effect on her.
- **Sees:** the pack bolt's red dotted lane and a red-tinted magic bolt, with no pose of its own. That is the same bolt the
  generic pack moves give the stoat ("dart of light"), the mole and the badger.
- **Hears:** small babble.
- **Pursuit:** this is Ed's "hares are fast, pursuing and hitting fast creatures is hard", in numbers:
  - **20.6 s to stun one alone, against 3.6–4.1 s for every other kind but the squirrel**;
  - only **24% of 💌s land**, against 90–100%;
  - it is stopped 39% of the time, in pauses of about 0.55 s between hops (the "hopper" style, `packs.json styles.hopper`);
  - in threes, the median speed at a landed 💌 was 0.

  So a window exists, the pause between hops. But it is short, it isn't shown, and nothing in its attack makes it stop on purpose.
- **Asks for:** the same as anything else: dodge the bolt, shoot. It is only harder to hit.

### Fox: curving wisp (speed 18)
- **On paper:** a foxfire wisp curving 30° in flight, range 18 m, wind-up 0.6 s, a glow tell.
- **In play:** the wisp is what lands: 9 / 1.0 / 0 (×3: 20 / 3.3 / 0.7). No effect.
- **Sees:** a glow tell, a red lane, a violet "moonlight" crescent. **The most distinct look at home:** the only one that glows and
  the only violet.
- **Hears:** a "canid" voice, a gliding yelp.
- **Asks for:** keep moving. The curve doesn't change that.

### Bee: double sting (speed 16 × 1.7)
- **On paper:** two stings 0.25 s apart, range 18 m, wind-up 0.6 s.
- **In play:** the stings and a pack nip. 10 / 1.0 / 0 (×3: 24.3 / 6.3 / 1.3). No effect.
- **Sees:** no pose; two red lanes; green "venom" stings (the same colour as the snail's slime).
- **Hears:** the one "bug" voice at home: a buzz, distinct.
- **Asks for:** keep moving.

### Stoat: lunger and dancer (speed 19 × 1.7)
- **On paper:** the longest, fastest lunge at home: 16 m, wind-up 0.5 s, cooldown 1.4 s, a coil tell. Pack moves: "dart of light"
  bolts and a **confusion** dance (her aim and movement turned for 2.5 s).
- **In play:**
  - the most blows of any kind: 10 / 2.0 / 0 (×3: **31.3 / 10 / 0.7**);
  - strafing doesn't save her from three: the lunge corrects onto her;
  - confused 1.8 s a minute alone and 5.3 s in threes; the only effect besides the snail's that reaches her;
  - most blows are still the generic dart bolt.
- **Sees:** for the lunge, a coil pose and a red flash; the bolt has no pose; a violet swirl over her head while confused.
- **Hears:** small babble with a trill.
- **Asks for:** blink the lunge (strafing alone fails). That is the same answer as the badger.

### Mole: ground heave (speed 13)
- **On paper:** the ground heaves where she stands, a 3 m ring at her feet, range 20 m, wind-up 0.9 s. Pack: **burrow** (comes up
  under her) and a dust cloud.
- **In play:** the heave and the burrow. 7 / 0.7 / 1.0 (×3: 22 / 9.3 / **4.0**). The burrow still hits the dodger: it comes up
  under her with no grammar telegraph. No effect on her.
- **Sees:** a stamp pose; a red ring round her own feet; brown "earth" cracks.
- **Hears:** small babble.
- **Asks for:** step off the ring. Partly distinct: the danger is under her, not coming at her.

### Snail: slime zone (speed 6, by far the slowest)
- **On paper:**
  - a 3 m slime patch round itself that lasts 3 s;
  - its slow: speed × 0.6 for 1 s, renewed every 0.5 s while she's in it;
  - also a slime **trail** and a **wall** special (`creature-actions.json`).
- **In play:**
  - **the only home kind whose effect is big:** slowed 9.6 s a minute alone stood still, and **44 s a minute among three**;
  - still **3.6 s (alone) and 22.7 s (three) a minute while moving or dodging**: its trail and wall slow her without a blow;
  - blows 6 / 0 / 0.
- **Sees:**
  - no pose; a red ring; green "venom" slime;
  - **nothing on her while slowed**: no chains, no tint, no sound;
  - the slow motif exists in the atlas (`effects.slow: chains`) but is drawn only on creatures (`render/leash/combat.ts`).
- **Hears:** the one "amphibian" voice at home: a gurgle.
- **Asks for:** stay out of its slime. **A real, different counter.**

### Dormouse: fast seed (speed 13)
- **On paper:** a seed flicked straight at her, 26 m/s (the fastest bolt at home), range 20 m, wind-up 0.6 s.
- **In play:** the seed. 10 / 4.7 / **4.3** (×3: 24.3 / 3.3 / 3.7). **The one ranged kind the dodger can't clear:** at 26 m/s its
  seed is on her before a 0.15 s reaction plus the blink. No effect.
- **Sees:** no pose; a red lane; a brown "wood" rock.
- **Hears:** small babble, the highest pitch (1.3).
- **Asks for:** keep moving. Its shot is the hardest to blink.

### Badger: shoulder-barge (speed 12)
- **On paper:** a 10 m lunge, wind-up 0.6 s, a crouch tell, knockback 7. Pack: a dig and "cover" (armour for its friends).
- **In play:**
  - the barge: 7 / 4.7 / 0 (×3: 13.3 / **12.3** / 0);
  - **strafing barely helps; only blinking clears it** (the lunge keeps correcting onto her);
  - throws her 6.4 m a blow instead of 2.5 m and staggers her 0.52 s instead of 0.25 s: 37 m a minute alone, 80 m in threes.
- **Sees:** a crouch pose; a red flash; brown "earth" rubble at the hit; her wobble.
- **Hears:** the one "big" voice at home: deep, distinct.
- **Asks for:** blink, don't walk. The same answer as the stoat's lunge.

## Summary table (youths)

Blows a minute: alone (×3) for stand, strafe, dodge.

| kind | attack that actually lands | effect on her | blows/min stand / strafe / dodge | tell distinct? | sound distinct? | counter distinct? |
|---|---|---|---|---|---|---|
| hedgehog | charge ram (quills rarely) | 12 m throw, 0.9 s stagger | 6 / 1 / 0 (11.7 / 0 / 1) | no: the charge has no telegraph; the quills' spread pose is seldom seen | no (small) | **yes**: sidestep the roll, unsignalled |
| squirrel | acorn lob | none | 9 / 1.7 / 0 (25.7 / 3.7 / 0) | landing circle only; no pose; brown | no (small) | no: keep moving |
| hare | **generic pack bolt** (its stamp ~never) | none | 6.3 / 2 / 0 (19.7 / 2.7 / 0) | **no**: the shared pack bolt, no pose | no (small) | no; hard to hit (20.6 s to stun) |
| fox | curving wisp | none | 9 / 1 / 0 (20 / 3.3 / 0.7) | **yes**: glow, violet | yes (canid) | no: keep moving |
| bee | two stings | none | 10 / 1 / 0 (24.3 / 6.3 / 1.3) | no pose; green like the snail | **yes** (buzz) | no: keep moving |
| stoat | lunge + generic dart bolt | confused 1.8 s/min (5.3 ×3) | 10 / 2 / 0 (31.3 / 10 / 0.7) | coil + flash for the lunge; the bolt generic | no (small) | blink the lunge (as the badger) |
| mole | heave under her + burrow | none | 7 / 0.7 / 1 (22 / 9.3 / 4) | stamp + ring at her feet; brown | no (small) | partly: step off; the burrow is unsignalled |
| snail | slime zone, trail, wall | **slowed** 9.6 s/min (44 ×3; 3.6 / 22.7 while moving) | 6 / 0 / 0 (8 / 0 / 0) | ring; no pose; **nothing on her when slowed** | yes (amphibian) | **yes**: stay out of the slime |
| dormouse | fast seed (26 m/s) | none | 10 / 4.7 / **4.3** (24.3 / 3.3 / 3.7) | no pose; brown | no (small) | no: keep moving, hard to blink |
| badger | shoulder-barge | 6.4 m throw, 0.52 s stagger | 7 / 4.7 / 0 (13.3 / **12.3** / 0) | crouch + flash; brown | **yes** (big) | blink, don't strafe (as the stoat) |

**Pursuit.** The chase bot vs one youth: seconds to stun and the share of 💌s landing.

| | badger | bee | dormouse | fox | hare | hedgehog | mole | snail | squirrel | stoat |
|---|---|---|---|---|---|---|---|---|---|---|
| seconds to stun | 3.8 | 3.7 | 4.1 | 4.0 | **20.6** | 3.6 | 3.6 | 3.7 | **5.7** | 3.7 |
| 💌s landing | 100% | 100% | 90% | 100% | **24%** | 100% | 100% | 100% | **69%** | 96% |
| time stopped (strafe bot) | 5% | 5% | 13% | 17% | **39%** | 18% | 16% | 2% | **51%** | 8% |

Speed alone isn't what makes a kind hard to hit: the stoat and the bee are as fast as the hare and are stunned in 3.7 s. What is
hard is the **hop-and-pause movement** (the hare's hopper style, the squirrel's hit-and-run into the trees). The pause is the window.
It is about 0.5 s long, and nothing shows it.

## Weakest links, ranked

1. **Seven of ten kinds do nothing to her but the standard blow.** Every blow is 1 of 4 hits, 2.5 m of throw and 0.25 s of
   stagger. Squirrel, hare, fox, bee, mole and dormouse have no effect at all. The badger's "knockback" is 6.4 m instead of 2.5 m
   (felt, barely). The variety is on paper in "damage" numbers, which never reach her.
2. **The one big effect at home, the snail's slow, is invisible on her.**
   - She was slowed 44 s a minute among three snails, 22.7 s even while moving.
   - Nothing is drawn on her (the chains motif is drawn only on creatures) and nothing is heard.
   - She just feels sluggish, with no cause shown.
3. **The hare, Ed's own example, doesn't use its own attack.**
   - Its blows are the generic pack bolt (red lane, red-tinted bolt), the same family the stoat, mole and badger also throw.
   - Its own stamp appeared twice in all the runs.
   - It is the hardest kind to hit (20.6 s to stun against about 4 s), and its only window (a 0.5 s hop pause) isn't shown or
     made by its attack.
4. **The telegraphs and impacts look alike.**
   - Every telegraph is red.
   - Five of the ten kinds (badger, mole, squirrel, hedgehog, dormouse) are brown: "earth" or "wood", with the same rock core and
     rubble impact.
   - Four have no tell pose at all: dormouse, bee, squirrel, snail.
   - Two more mostly throw the generic pack bolt with no pose of its own: the hare, and the stoat beyond its lunge.
   - Only the fox glows.
5. **Six of ten share one voice family** ("small"), differing only in pitch. The attack cue is that voice's babble, rate-limited
   per creature. On her, every hit sounds the same (a thump and whoosh, the dizzy twinkle), whoever threw it.
6. **The counters fall into three groups, not ten:**
   - shooters (squirrel, hare, fox, bee, dormouse): keep moving;
   - lungers (badger, stoat): blink, not walk;
   - the odd ones out: the snail (stay out of the slime), the hedgehog (sidestep the roll) and the mole (step off what's under
     you).

   The two real odd ones (snail, hedgehog) have their key move unsignalled: the slow on her, the hedgehog's charge with no grammar
   telegraph.
7. **Unsignalled blows from under or behind.** The mole's burrow (4 blows a minute on the dodger in threes) and the hedgehog's
   charge come with no grammar telegraph, so a careful player can't answer them.

## Proposals

Each is small and tied to one weak link above (the number in brackets).

### (a) Presentation only: no rule or number changes

- **A1. Show effects on her** [2, 1]:
  - slowed: the slow motif (chains) at her feet, her sprite tinted green-grey, a squelch on each step;
  - confused: the swirl she already has, plus a wobbling tone;
  - thrown: a dust skid along the ground, as far as she went.

  All from the existing effect motifs (`attack-look.json effects`); `render/leash/combat.ts` already draws them on creatures.
- **A2. The hit on her in the attacker's colours** [4, 5]: the element's impact burst on her body (green splash, brown rubble,
  violet ring), and **one hit sound per element** in place of the shared thump. She'd know what hit her.
- **A3. A tell pose for every kind** [4]. The poses already exist in the pack data (`pack.tells`), as words, with no pose:
  - squirrel: "winds back";
  - bee: "abdomen curls";
  - dormouse: "winds back";
  - hare: "ears flat";
  - snail: "rears".

  Use them as the wind-up poses.
- **A4. Effect marks in the telegraph** [1, 4]: keep the red frame, and put the effect's motif inside it (chains for a slow zone,
  a shockwave for a throw, a spiral for confusion). One look tells her this one does something different.
- **A5. Separate the browns** [4]: give wood its accent green and leaf cores (squirrel, hedgehog, dormouse), and keep earth for the
  badger and mole only; or a per-kind override, as the hare's "wind".
- **A6. Telegraph the two unsignalled blows** [7]: a ground mound line for the mole's burrow and a lane for the hedgehog's charge.
- **A7. A wind-up sound per delivery** [5], under the babble: a draw-in for lunges, a twang for shots, a rumble for ground
  attacks.

### (b) Behaviour and numbers

- **B1. The hare uses its own stamp, and sits after it** [3]: drop the moon-dust bolt (or make it rare); the hare hops in and
  stamps a ring round itself, then stays put about 0.8 s (a committed landing). The counter: step out of the ring, then hit it
  while it sits. That is also the window for Ed's "pursuing fast creatures is hard".
- **B2. Give the plain shooters one effect each** [1], so "keep moving" means different things. Candidates:
  - squirrel acorn: a **0.4 s stun** (a bonk);
  - bee: a **sting that slows her blink recharge** for 3 s;
  - fox: a wisp that **pulls her** 2 m toward the fox;
  - dormouse: none (its speed is its thing);
  - mole: the heave **throws her up**, 0.5 s with no steering.
- **B3. Make the badger's throw a throw** [1]: knockback 7 → 15 gives 10.75 m and 0.8 s of stagger, near a charge's 12 m. "Don't
  let it touch you" becomes felt.
- **B4. A window on the fast kinds** [3]: after a hare's stamp or a squirrel's throw, a fixed sit (0.8 s), shown by a pose. The
  pursuit measure should then come down from 20.6 s toward about 6–8 s to stun.
- **B5. The hedgehog's charge as its signature** [6, 7]: a visible curl (its pack tell is already "the curl"), then the roll down a
  shown lane, then a dizzy pause where it's easy to hit.

## Recommended first

1. **Hare:** Ed's own example. Today it throws the generic bolt, its attack and its hard-to-hit-ness are unrelated, and B1 + B4
   give it a counter and a window at once.
2. **Snail:** already the only kind with a different counter and a big effect, and invisible on her. A1 alone (presentation)
   makes it read. Cheapest, biggest win.
3. **Badger:** the clearest "blink, don't walk" kind. B3 + A2 make the throw felt and seen, and set it against the shooters.

The stoat, mole and hedgehog would follow (A6, B5).

## Questions for Ed

1. **The hare's attack:**
   - (a) its own stamp only, then it sits still about 0.8 s;
   - (b) a leap that lands where she stood (a ring), then sits;
   - (c) keep the bolt but give it its own look.
2. **Effects shown on her:**
   - (a) a mark over or at her (chains, stars, spiral);
   - (b) her sprite tinted;
   - (c) both, with a sound each.
3. **Effects for the plain kinds:**
   - (a) one each for squirrel, bee, fox and mole (B2);
   - (b) only one or two of them, the rest stay plain;
   - (c) presentation first, effects later.
4. **Telegraph colour:**
   - (a) all red, with the effect's mark inside;
   - (b) a red edge with the element's colour inside;
   - (c) as now.
5. **The badger's throw:**
   - (a) about 11 m (knockback 15);
   - (b) about 8 m (knockback 10);
   - (c) as now (6.4 m).

## Not checked

- Adults and legends (Ed: youths only).
- Not watched at full speed by a person: the stills are single frames, and I haven't heard the cues together.
- The chase bot doesn't lead its aim, so the hare's 24% may be lower than a good player's. The ratio to the other kinds is the
  point.
- Groups larger than three, and mixed kinds.
