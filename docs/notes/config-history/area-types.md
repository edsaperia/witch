# area-types config history and detailed field notes

Moved from `config/area-types.json` on 2026-10-29 for #1459. Original notes below are preserved verbatim, including quotes and dates. They record the design when written; the config and rules remain the source of current behaviour.

## Overview

Game settings per area type. The area types themselves (Ed's 30, in his columns: floor, wall, small, big, set piece, creature) are defined with their art in art/areas.js; this file adds what the game needs. treeDensity scales how many of the area's big objects (its trees, mounds, boulders, logs) stand in it: even the open types are woodland with clearings (Ed, 2026-10-03: "a forest with clearings, not a meadow with trees"), just thinner. groundCover: the tufts on its ground (Ed, v171: so the ground doesn't look flat): density 0 (bare) to 1 (thick), and which kinds (blades, fern, heather, reeds, moss, clover).
