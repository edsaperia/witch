# Difficulty curve: home and the phases (Ed, 4 Nov 2026)

Ed's decisions from the 4 Nov discussion, in order. The measurements behind them came from the night-size measurement (home vs phase 1 to 5, seeds 1 to 8). This note is the reference for checking that the builders' work fits together.

## Why
- Ed: "I don't think phase 1 islands should have less than home before any islands are unlocked … Home gets harder as more islands get discovered, but it should start as the easiest/shortest night."
- The measurement showed that home at the start had the same size as a phase-1 island: 10 stumps, 2 legends. Home was harder on three counts: a challenge pack of 20 against 10, no friendly home guard, and 10 kinds against 5. Night length grows with the ley route: about 23 min on phase 1, but about 3 h on a 50-area phase-5 island.

## Home (builder: claude/home-start)
- "home has 5 areas chosen at random from the phase 1 creatures, and grows as you unlock islands, and has no challenge area. When you unlock every island, home gets a challenge area and you get a special reward for completing it."
- "Phase 1 creatures" means home's 10 starting kinds, whose islands are the phase-1 islands. They are drawn at random each night, "always to somewhere new if possible".
- Home has one area per island found. Below 5 found, it is filled up to 5 with starter kinds. It reaches 64 when everything is found.
- Legends: "Same as other islands, which I think is 1 in 5? But including undiscovered islands of phase 1 if possible."
- "no find at home until endgame". The special reward for the endgame challenge: "we'll figure this out later".
- All 64 kinds on the chart are designed; none is a placeholder.

## Island sizes (builder: claude/phase-sizes)
- "We could make waves 5 / 10 / 15 / 20 / 25 / 30 / 64": home starts at 5; phases 1 to 5 have 10, 15, 20, 25 and 30 areas; the final home has 64.

## Crowds (builder: claude/phase-sizes)
- "we should rebalance this so phase 5 islands get to full packs."
- The swarm share at the last stump follows the island's phase (p/5) instead of its size. Home follows the share of islands found.
- Expected average pack at the last stump: phase 1 about 4, phase 2 about 6, phase 3 about 8, phase 4 about 10, phase 5 about 12. Home goes from about 1 at the start to 12 at the end. These are medium species; strong ones are capped lower (6) and light ones higher (16). Early packs are mostly youths and late packs mostly adults.

## Roster variety (builder: claude/roster-variety)
- "Now that islands have fewer areas, we can have fewer (none?) repeats of creature types on an island, besides the island of the creature type itself." Ed chose the **middle way**: no repeats while the island's compass neighbourhood still has kinds, and a fall back to 2 areas per kind only when it runs out.

## Attack complexity and strength (not built yet)
- Complexity is one point for each ingredient beyond a plain single shot or lunge, averaged over a phase's species.
- "Let's start attack complexity at 1, going up to 3". The proposed linear ladder is home 1.0, phase 1 1.4, phase 2 1.8, phase 3 2.2, phase 4 2.6, phase 5 3.0. Today it runs 0.7, 1.7, 2.0, 2.5, 2.7 by kind phase, and islands mix kinds of several phases.
- Strength wobbles by phase (phase 2 is tougher than phase 3): "we can move them between phases to rebalance (though balance is still to come)". The next step is a page showing each phase's species with complexity and strength, so Ed can choose which to move.

## Map and sites (builder: claude/legend-sites, #1807)
- "minimum distance between sites/circles/dancefloor/treehouse of 50m, tunable. 10m from a lake edge. If this can't fit, increase area sizes." "The dancefloor and treehouse can be closer! they're a set piece."
- "A parked creature should guard its chain length … with home area an exception." "Animals parked in the home area can roam it freely."

## Challenge area (live in v7412)
- It sits on the island's edge, far from home and off the ley route (Ed: option 3 with option 2 as the backstop).
- Statues wake when she steps into the circle. Won creatures keep out of the way of fights in every area.

## Coherence check (after the builders land)
Before releasing the set, verify together:
- Home is the smallest and shortest night at the start, below phase 1 on every measure: areas, stumps, hostiles, pack, attack complexity and route length.
- Each phase climbs monotonically in size, crowd at the last stump, legends and challenge pack.
- Night lengths stay within reason.
- The site gaps and any area-size change hold with the new island sizes and rosters.
- Home's legend points to an unfound phase-1 island.
