# link-switches config history and detailed field notes

Moved from `config/link-switches.json` on 2026-10-29 for #1459. Original notes below are preserved verbatim, including quotes and dates. They record the design when written; the config and rules remain the source of current behaviour.

## Overview

Every ?name=value the game reads from its link (Ed, 2026-10-28: "Reformat prose into data where you can"). Each: name; values ("" for the bare switch); does, in one plain sentence; group (run, view, debug, compare: brings back how something was before, to compare); since (the date it is first seen read where it's read now, from git; the oldest are the 2026-10-07 survey's); readIn (written by tools/config/linkSwitches.mjs from the code: don't edit); decision (Ed's, if any). docs/LINK-SWITCHES.md is written from this; src/linkSwitches.test.ts checks it against the code.
