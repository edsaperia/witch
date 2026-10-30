# creature-voices config history and detailed field notes

Moved from `config/creature-voices.json` on 2026-10-29 for #1459. Original notes below are preserved verbatim, including quotes and dates. They record the design when written; the config and rules remain the source of current behaviour.

## Overview

Each creature's call, blended into its babble (Ed, 2026-10-05: you can tell what's talking): a family's call style, and a species' tweaks over it. A new creature picks a family (and tweaks if it likes). Fields: pitch (times the babble's pitch), formants (times its formants), wave (the voice's source), pure (a whistled tone, no vowels), glide (each syllable's pitch at its end, times its start; 1 flat), trill ([rate Hz, cents]: a fast warble), am ([rate Hz, depth 0-1]: a buzz or a croak's rattle), noise (0-1: breath, a hiss), dur and gap (times a syllable's length and the pause after), extra (more syllables a burst), consonant (0-1: how often a syllable starts with a click or breath), vowel (always this one: 0 ah, 1 eh, 2 ee, 3 oh, 4 oo), turn (a call when it turns enraged: howl), volume (times its loudness, to balance the families). Legends sing whale song instead.
