# decisions config history and detailed field notes

Moved from `config/decisions.json` on 2026-10-29 for #1459. Original notes below are preserved verbatim, including quotes and dates. They record the design when written; the config and rules remain the source of current behaviour.

## Overview

Ed's decisions panel (src/ui/decide.ts; ?decide or F2 in the game) and the pause page's test sliders (Esc: every entry, by group, down the left, with Copy values; Ed, 2026-10-12). Each entry: id, pr (the pull request that added it) and group (that PR's short name: the pause page's heading, "#pr group", newest PR first), label, a one-line note, a control (toggle, choice of 2 to 4 options, or slider with min, max and step), the shipped default, and what it changes: a tuning knob by its path (applied live to the running game) or a URL switch (param; reload: true when the game reads it only as it loads). Confirm opens a new GitHub issue labelled decision with the choice; the coordinator acts on those. A fragment flagged pinned heads the pause page under its group's name alone (the Volume, 2026-10-14), and an entry flagged persist is remembered on the browser (localStorage witch.settings) and set again as the game loads (src/app/settings.ts).
