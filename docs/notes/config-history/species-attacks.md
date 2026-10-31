# species-attacks config history and detailed field notes

Moved from `config/species-attacks.json` on 2026-10-29 for #1459. Original notes below are preserved verbatim, including quotes and dates. They record the design when written; the config and rules remain the source of current behaviour.

## Overview

Each species' own attack in the composable grammar (rules/attacks/, docs/plans/attack-grammar.md step 5; Ed, 2026-10-27: within each biome every species a distinct style, the attacks growing more complex with its island's phase, the default from then on: ?attacks=old for the old ones). Its young's attack as written; its adult's the same grown (rules/attacks/species.ts adultOf: one more in its pattern, bigger, further). Damage: hit.damage is each thing's share of a cast's budget (the level's dps times its strength times its cooldown), so the many-shot ones carry less each. Every one at least the reaction floor from its first warning to its first harm (src/rules/attacks/species.test.ts). Its kind's own moves (a charge, a leap, a swoop, a burrow) and its pack's turns stay as they were: this is the attack those use when they strike.
