# character config history and detailed field notes

Moved from `config/character.json` on 2026-10-29 for #1459. Original notes below are preserved verbatim, including quotes and dates. They record the design when written; the config and rules remain the source of current behaviour.

## Overview

Each creature's character (overnight phase 3): its temperament posture and its idle quirk, drawn by the live rig (src/render/rig). posture: head [forward, up] and body (up), in the creature's model units (a body is about 1 long); quirk: what it does now and then while it stands idle (sniff, perk, stomp, thump, scratch, shake, tailflick, tailslap, stretch, howl, rise; sentinel: it sits up on its haunches as a sentinel, its own baked pose (art/creatures.js IDLE_BUILDERS), the rig standing aside); every: seconds between quirks [min, max]; for: how long one lasts (s). bounce: a happy or party creature standing about hops now and then (height m, every s). sprite: its quirk on a baked frame (the treetops, and species without a rig): hop, puff, look or shiver (the rig quirk's nearest if not given). Ed can tune any number here.
