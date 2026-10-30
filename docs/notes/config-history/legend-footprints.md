# legend-footprints config history and detailed field notes

Moved from `config/legend-footprints.json` on 2026-10-29 for #1459. Original notes below are preserved verbatim, including quotes and dates. They record the design when written; the config and rules remain the source of current behaviour.

## Overview

Each species' legend as drawn, in metres: asleep (its nap, both breaths) and awake (standing, both frames, facing us and away), each [width, height]. Written by node tools/legends/footprint.mjs from the art in the game's style (config/style.json at the tuning's pixelSize); rules/legendFit.ts sizes each legend's circle from it. Run it again after a change to a creature's art (--check says whether it's stale).
