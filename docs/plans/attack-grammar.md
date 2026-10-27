# Composable attacks: the grammar, its telegraphs, and the plan

The coordinator's ask from Ed (2026-10-27): creature ranged attacks varied and fun, built from composable settings, every block at once,
with a Fight Arena page (Juliet) on top of the format and a look layer (Lima) dressing it. Ed, verbatim: "Put the focus on composability
for these attack systems — and on telegraphing."

This is the format and the plan, for review before any of it is built. Rules only: nothing here draws anything. The rules emit plain
state and events with tags; Lima's look layer and the audio dress them generically.

## Where it starts

`config/combat.json` has 27 attacks, each one flat record with a `delivery` (melee, shot, lob, beam, pulse, quake) and a `modifier`
(none, slow, knockback). `src/rules/combat.ts` runs them: shots fly straight and hit the first foe; a lob lands where it was aimed and
hits everything there; a beam ticks along its line, tracking or spinning; a pulse or quake hits everything round its caster; melee
lunges. Legends (`combat/legend.ts`) and packs (`combat/packs.ts`) add a nova, a spin, a charge, volleys and a lob that leaves a slow
patch. The telegraph today is the windup (its `windup` event and the art's wind-up flash), plus a target circle for lobs.

## The idea in one paragraph

An attack is a small tree of orthogonal modules: how it is **cast** (windup, the body's tell, cooldown, casts before a rest), what it
**telegraphs**, what it **emits** in what **pattern**, what each emitted thing **is** (a bolt, a lob, a ground-runner, a beam, an area,
a zone, a mine, a seed, a melee strike), how it **moves** (path terms summed, a speed profile), what it **does on contact** (damage, a side
effect, pierce, bounce, friendly fire), and what **events** it raises (on hit, on expire, on bounce, on land, on a timer), each of which can
**spawn child attacks**, recursively and capped. Composability comes from three things: every module is independent of the others;
children are just attacks (named or inline); and any attack can `base` on another and override a few fields.

## The format

Attacks live in `config/attacks.json` (checked by `config/schema/attacks.schema.json` like the other configs), keyed by name. A species
or a pack names an attack, or gives one inline. Every field has a default, so a short attack is a short object. Lengths in metres,
times in seconds, angles in degrees, speeds in m/s (all scaled by the fight's scale and speed as today).

```jsonc
"frostFan": {
  "base": "bolt",                                  // inherit a named attack, then override
  "cast": { "windup": 0.8, "cooldown": 3, "casts": 2, "rest": 4,
            "tell": { "pose": "rear", "glow": 0.5 } },   // the body's wind-up, part of the telegraph
  "telegraph": { "kind": "lane", "lead": 0.5 },    // or inherited from the body's default
  "emit": { "pattern": "fan", "n": 5, "angle": 60, "aim": "lead" },
  "body": { "kind": "bolt", "radius": 0.7, "element": "frost" },
  "path": [ { "curve": 40 }, { "wave": { "amp": 1.5, "freq": 1.2 } } ],
  "speed": { "profile": "decel", "v": 26, "to": 10, "time": 1.2 },
  "life": { "range": 28, "pierce": 0, "bounce": null },
  "hit": { "damage": 0.6, "effect": { "slow": { "mult": 0.5, "time": 2 } }, "friendly": false, "blink": true },
  "on": { "expire": [ { "attack": "frostPuddle" } ] }
}
```

### The modules (Ed's A–I)

**A. path**: a list of motion terms, summed each step on top of the body's heading (so they stack: a curving, waving, homing bolt is
three terms).
- `straight` (the default; no term)
- `arc` (a lob's height curve: `height`, `flight` s; it lands where it was aimed)
- `curve` (deg/s, its sign the side)
- `wave` (`amp` m sideways, `freq` Hz; `phase`)
- `spiral` (`rate` deg/s about its own start point, `grow` m/s)
- `home` (light homing: `turn` capped deg/s, `after` s before it starts, `giveUp` m: it stops homing inside that, so a sidestep at the end
  still works)
- `boomerang` (`out` m, then it turns back to its caster)
- `orbit` (`r` m round the caster for `time` s, then released along its heading)
- `runner` (it hugs the ground: flying over it in the treetops or a dash's blink passes it; it can't cross water)

**B. speed**: one profile: `constant` (`v`), `slow` (a constant v under 8: a readable crawl), `accel` (`v` → `to` over `time`),
`decel` (`v` → `to`, `to` 0 a stall in place), `stopGo` (`go` s, `pause` s, re-aims at each pause, `n` legs).

**C. emit**: the pattern of what one cast releases.
- `single`
- `burst` (`n`, `gap` s)
- `fan` (`n`, `angle`)
- `ring` (`n`, `offset`)
- `spray` (rotating: `rate` deg/s, `n` over `time`)
- `wall` (`n`, `spacing` m, `gap`: the missing slots, a hole to slip through)
- `volley` (a pack's: each member fires one on the beat, `beats` apart)

`aim` is one of `target`, `lead` (predictive, as dodge.b), `dodge` (where her dodge would go), `ahead`, `caster`, `random` (seeded),
`spot` (a child's: where its parent was).

**D. on**: termination and timing as events, each a list of children.
- `hit` (it touched something)
- `expire` (out of range or time)
- `bounce`
- `land` (a lob or a runner arriving)
- `timer` (`[{ "at": 1.5, ... }]`: after it's emitted)

A child is released at once unless it winds up itself (`cast.windup` defaults to 0 for a child, 0.6 for a cast). A child is `{ "attack": "<name>" | { inline }, "at": "self" | "hit" | "caster", "aim": ..., "damage": factor, "inherit": ["element",
"side"] }`. Depth is capped (3) and so is a cast's total of children (64). The shapes Ed named fall out of these:
- **Delayed explosion:** `life.stick` with an `on.timer` area.
- **Split:** `on.expire` a ring or fan.
- **Bounce:** `life.bounce` with `n` and `keep` (the speed kept).
- **Pierce:** `life.pierce` n.
- **Linger:** a `zone` child: a puddle, fire, frost or web, with `r`, `time`, an effect and a `tick`.

**E. pack**: a pack's attack names one of these on top of its own.
- `chain` (it jumps to the next target in `range`, `n` times)
- `relay` (it flies to a packmate, which re-aims it at her)
- `amplify` (passing within `r` of a packmate it grows by `per`, to `max`)
- `tether` (a beam strung between two members for `time`, hurting whoever crosses it)
- `triangulate` (three members mark spots and the area between them erupts after `delay`)

**F. beam**: `length`, `width`, `duration`, `tick`, plus any of:
- `sweep` (deg/s across)
- `track` (deg/s after her, today's)
- `spin` (deg/s round)
- `charge` (s as a thin warning line before it's full)
- `pulse` (`[on, off]` s)
- `strike` (a short, fast one: duration ≤ 0.2)

**G. area**: a `shape`, all centred on a spot (`at`: caster, target, a child's place; `quake` for the ground shaking, a legend's slam):
- `disc` (`r`)
- `ring` (`r`, `width`: the nova's line)
- `donut` (`inner`, `r`: safe in the middle)
- `cone` (`r`, `angle`)
- `safeCircle` (all of `r` but a shrinking safe disc: `from`, `to`, `time`)
- `cross`, `line` and `grid` (mine patterns: `n`, `spacing`, `delay` between cells)

Plus:
- `grow` (m/s: an expanding ring)
- `waves` (`n`, `gap` s: several rings)
- `rain` (`n` marked impacts over `r` and `time`, seeded)

**H. trap**: a body that waits.
- `mine` (`arm` s, `trigger` r, then its `on.hit`)
- `seed` (`sprout` s, then becomes its child: a hazard zone or a turret that fires its own attack `n` times)
- `lure` (a slow bolt that pulls her toward it while she's within `r`, `pull` m/s)

**I. every attack**:
- telegraph (below)
- `hit.damage`, as a factor of the level's budget as today
- `hit.effect`: slow, stun, knockback, pull, root, burn, each with its numbers
- `body.radius` / size
- `cast.cooldown`, `cast.casts` before `cast.rest`
- `hit.blink`: a dash's blink passes through it (true by default)
- `hit.friendly`: it can hit other animals; off by default, the fun of luring

`body.element` (the look's eight, agreed with Lima: fire, frost, venom, moonlight, storm, earth, shadow, bloom; an untagged attack takes its species' element) and `body.look` are tags for the look layer only:
the rules never read them.

## Telegraphing (first-class)

Every attack and every child declares a `telegraph`, or inherits its body's default:

| kind | shape the rules emit | default for |
|---|---|---|
| `lane` | a line from the caster along the aim, the body's width, its range | bolts, runners, walls |
| `landing` | a disc where it will land, shrinking to the moment | lobs, rain impacts |
| `ring` | the ring's radius and width, or a donut's two radii | areas round a spot |
| `cone` | apex, heading, angle, radius | cones, fans |
| `beamLine` | a thin line that becomes the beam at fire time (beam `charge`) | beams |
| `countdown` | pips on a stuck or timed body, one per `beat` | delayed explosions, `on.timer` |
| `arming` | a glow growing over `arm` s, then its trigger radius | mines, seeds |
| `chainNext` | a link from the current target to the next | chain, relay |
| `tetherLine` | the line between two members before it goes live | tether |
| `lockOn` | a mark on her when a homing body starts homing | home |
| `none` | nothing (allowed only if the composer finds another tell covers it) | melee inside another tell |

Each telegraph is state, not just an event: `{ id, kind, shape, start, fire, until, attack, source, side, follows? }`, where `shape` is
plain geometry (a point, a segment from x, z to x2, z2 with width, a path of points, a disc, a ring with `inner`, a cone with heading, angle and r) and `follows` names a moving body or creature it is attached
to. `s.telegraphs` holds the live ones. A `telegraph` event at `start` and a `fire` event at `fire` let the audio hook a cue. Lima's danger
frame draws every kind from that alone.

**The body's tell.** `cast.tell` (`pose`: rear, crouch, coil, spread, glow, stamp; `glow` s) is part of the telegraph's timeline: the
creature's wind-up pose and glow begin at `start`, before any ground marker. The fight state carries it (`f.tell = { pose, from, until }`),
so species can be read by their body language first.

**The reaction floor.** The composer works out, for every attack and each of its children, the time from the first telegraph that covers a
hit to that hit: the earliest damage minus the earliest telegraph start, through every path of children. If that is under the floor (the
tuning's `attacks.reactionFloor`, proposed 0.45 s; a blink's own cooldown and latency set it), it either lengthens the telegraph (the
windup, a child's timer, a mine's arm time) and says so, or, with `strict`, rejects the attack as invalid. So the arena's randomised
attacks stay fair. A unit test runs this over every example attack.

## What the renderer gets

Everything as plain state on `CombatState`, kept in fixed pools (none of it allocated in a step):
- `spells.bodies`: id, kind, x, z, y (a lob's height), vx, vz, radius, element, look, attack, side, source, depth, born, and its state
  (stuck, armed, homing, bounced n).
- `spells.zones`: id, shape, x, z, r, inner, angle, from, until, element, effect.
- `spells.beams`: as today's beams, plus `phase` (charging, live, off) and `charge`.
- `telegraphs`: as above.
- Events, added to today's: `cast`, `emit`, `hit`, `expire`, `bounce`, `land`, `split`, `armed`, `sprung`, `telegraph`, `fire`, `zone`,
  `chain`, `tether`.

Each carries its body or zone id and the attack's tags. Today's `shots`, `beams` and `trails` stay as they are for the 27 existing
attacks (below).

## The 27, re-expressed

Each existing attack is written in the new format in `config/attacks.json`. The loader compiles it back to today's flat `Attack`, so
`combat.ts` runs the 27 exactly as now, and the bench's "game unchanged" stays green. A test checks the compile against today's records
field for field.
- `shot`: `body bolt`, straight, `speed constant`, `life.range`.
- `lob`: `body lob`, `path arc`.
- `beam`: `beam` with `track` (sweep) or `spin`.
- `pulse` and `quake`: `area disc` at the caster.
- `melee`: `body melee` with `lunge`.
- Modifiers become `hit.effect`.
- The legends' nova becomes a `ring` emit.
- The packs' patch becomes an `on.land` zone.

Moving the 27 onto the new engine itself is a later, optional step, taken only when the bench shows it identical.

## Serialise and parse (for the arena)

- `parseAttack(json)` gives back `{ attack, errors, warnings }`: the schema checked, defaults filled, the reaction floor checked, children
  resolved and capped.
- `serialiseAttack(attack)` writes canonical JSON (stable key order, defaults dropped), so a copied attack is short and diffs cleanly.
- `randomAttack(seed, { allow, budget })` composes a fair attack from the modules within a power budget, for the arena's 🎲.

All of it is pure and headless (`src/rules/attacks/`), so Juliet's page and the tests use the same code.

## Determinism and cost

- **Seeded:** every random choice (rain spots, random aim, sprays' jitter) comes from a small hash of the game seed, the cast's id and
  the child's index. Never `Math.random` and never the wall clock.
- **Pools and caps** (tuning `attacks.caps`): 512 bodies, 128 zones, 64 beams, 256 telegraphs, depth 3, 64 children a cast, 8 bounces,
  8 pierces. Over a cap, the new thing isn't made, and a `capped` count shows in the debug overlay.
- **Cost:**
  - A body's step is its path terms (a few multiplies each) plus one grid lookup for hits, like today's shot.
  - A zone is one lookup each `tick`.
  - Telegraphs are not stepped (fixed timings).
  - At the caps, an estimated 0.2 ms a step on a laptop. Measured in step 5.

## The plan, in PRs

1. **Format** (no behaviour change): `config/attacks.json` with the 27 in the new format, its schema, `src/rules/attacks/` (types,
   `parseAttack`, `serialiseAttack`, `compileLegacy`, the reaction-floor check), and tests. The bench stays unchanged.
2. **Engine core**:
   - pooled bodies with every path term and speed profile, every emit pattern, the `on` events spawning children, zones, telegraphs
     and the body's tell, seeded;
   - unit tests per module and the composed example (a curving bolt splitting into a ring of homing bolts that each leave a puddle);
   - only new-format-only attacks use it, through the arena's `?arena=` and a new `?attack=<name|json>` override.
3. **Beams, areas, traps**: the F, G and H blocks, with tests.
4. **Pack interplay** (E): chain, relay, amplify, tether and triangulate, in `combat/packs.ts`'s turns, with tests.
5. **Library and numbers**:
   - about 30 example attacks using the new blocks;
   - a proposal of which species get which (not wired until Ed says so);
   - the readability test over all of them;
   - the perf measured at the caps.
6. **Optional:** the 27 on the new engine, if the bench proves it identical.

Each step is its own PR into claude/prototype, with a REPORT, frames from the arena where there's something to see, and a FINAL.

## Decisions for Ed

- The reaction floor: 0.45 s proposed.
- Friendly fire: on only where an attack says so.
- Whether `randomAttack`'s fairness may lengthen telegraphs silently or must flag.
- Which species get the new attacks (step 5's proposal).
