# default-look config history and detailed field notes

Moved from `config/default-look.json` on 2026-10-29 for #1459. Original notes below are preserved verbatim, including quotes and dates. They record the design when written; the config and rules remain the source of current behaviour.

## Overview

What a brand-new witch starts with (Ed, 2026-10-29: "Please give me an easy way to select character creation defaults ... This is a dev tool - just so I can set the defaults for the game"; src/app/defaultLook.ts). genome: her look (art/witchGenome.js's shape: hat, hair, top, cloak, broom's colours and fit, accessories, sizes, palette), or null for the classic witch (WITCH_GENOME, her colours DEFAULT_OUTFIT under the style's hues); whatever it wears is hers from the start, over config/wardrobe.json's start items. broom: the parts fitted in each slot (config/broom-parts.json), found from the start, or null for a bare broom. Made by the pause page's Copy look as defaults (with the debug overlay or Unlock everything on): paste its text over this file. A genome the generator's rules refuse is the classic witch. ?newWitch=1 plays a load as a brand-new witch, nothing saved.
