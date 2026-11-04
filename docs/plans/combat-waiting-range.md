# Combat: creatures wait further away

**Ed (2 Nov, after playing combat on the home island):** "the waiting-to-attack behaviour is still very close to the witch; unless deliberately coming in for a pass-by, they should tend to be further away as they're waiting. I would use the witch's dash range and shoot range as parameters here, and also the size of the area itself."

**Then, on the design:** "the average range at which creatures wait should be more like the witch's range of movement (she has two dashes in her 'stack') plus her inviting range (which changes depending on bag)." Later: "they shouldn't vary based on the range of the bag that she has … It should be set based on the default bag. Different creatures can vary. In a small area, they should go over the boundary. In a large area, they can go further away."

## Where it is now

The waiting goal is `waitingSlot` in `src/rules/combatSpacing.ts`, called from `movingGoal` in `src/rules/combat.ts` (about line 435).

- **Orbit radius** = `want × rangeBias + motion.radius × FIGHT.scale`.
  - `rangeBias` defaults to 0.5.
  - `motion.radius` comes from `config/packs.json` `spacing.motion`. It's 8 m by default and mostly 5–17 m by species; the boar is 26 and the elephant 32.
  - `want` is the attack distance: a lunger's reach plus 0.85 × its lunge.
- The orbit wobbles ±15% (`radialWave`) and its centre is offset by 0.35 × r (`centerShift`), so some of the time they pass much closer.
- Nothing uses her dash, her 💌 range or the area's size.

**Measured by the coordinator** (arena packs, 30 s, 5 seeds; distance to the witch while waiting, not striking or winding up; witch standing still):

| Pack | Median | Closest 10% | Waiting time within 15 m |
|---|---|---|---|
| Wolf | 16 m | 7 m | 46% |
| Fox | 16.5 m | 9 m | 43% |
| Hare | 19 m | 8 m | 37% |
| Boar | 54 m | 27 m | 1% |

## What Ed wants

- **Average waiting distance ≈ her movement range + her default 💌 range:**
  - movement range = `dash.distance × dash.charges` (15 m × 2 = 30 m today);
  - default 💌 range = the tuning's own `invites.range` (33 m today, the no-bag value).
  - That gives about 63 m today. Read the numbers live from tuning, never as constants.
  - **Not her current bag (Ed, 2 Nov):** "they shouldn't vary based on the range of the bag that she has, otherwise there's no reason to choose different bags. It should be set based on the default bag." Don't use `bagTuning` here: the Far bag's longer reach should let her hit waiters, and the Bumbag's shorter reach shouldn't.
- **Species vary around that average.** Keep each species' own character, e.g. as a multiplier or offset per species in packs.json, rather than one fixed ring.
- **Area size:**
  - In a small area they go over the boundary: don't clamp the wait to the area.
  - In a large area they can wait further away.
  - Choose a simple scaling with the fight area's size and state it.
- **Pass-bys stay as they are.** Only creatures deliberately coming in (a strike, a pass-by, a run-in) go inside the band. The waiting wobble and centre offset must not bring a waiter inside her dash range by accident.
- The waiting slot's return (`returnLead`) and the run-in to strike still have to work from the longer distance. Check that the attack rhythm (team `roundTime`, `attackWindow`, pack lull/tell) still produces attacks at a sensible rate, without hand-tuning combat balance. Report anything that looks off rather than changing balance.

## Rules

- **Owner:** #1634's combat builder (combat work defers to that builder). Coordinate with any open combat work.
- **New knobs:** put them in config with schema, knob docs and changelog. No other tuning or default changes beyond this behaviour. Ed asked for this behaviour change.
- **Tests:** follow Ed's 2 Nov standing rule.
  - Test the waiting-distance formula directly and deterministically: inputs to goal distance.
  - Report the measured distances (the table above, before and after) in the REPORT as a nonblocking measurement. Don't make them a blocking test.
  - The REPORT lists any tests changed or removed, with a reason.
- Don't touch multiplayer files. Check `git merge-tree` against #1609's head before REPORT.
- Post PLAN first, then REPORT. Release goes through the coordinator.
