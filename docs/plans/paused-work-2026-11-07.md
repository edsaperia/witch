# Paused work, 7 Nov 2026: what's done, what isn't, and how to resume

On 7 Nov, at about 19:15 UTC, Ed's Codex usage for the month ran out. It went within minutes, when nine art-pass lanes and the other Codex owners all woke at once for a third, image-heavy pass. The coordinator posted a stop on #1476 (comment 6711833911): finish the current atomic step, then stop. Ed asked that what's done be tracked and used, that what isn't done be remembered, and that nothing in progress continue.

This page is the ledger. Every branch, PR and picture below is kept, and none of it is merged into the game unless noted.

## Lesson

Fanning one task out to many Codex agents at once multiplies the cost, and image generation costs far more than text. Before resuming any Codex work:
- the coordinator estimates the number of images and agents;
- run one lane at a time;
- get Ed's go on the estimate.

## Live in the game (done, nothing to resume)

| What | PR | Live |
|---|---|---|
| Stump patterned light turns once every 2 bars, on up to 3 nearby soundsystems | #1890 | v7639 |
| Skin tones: Monk scale plus fantasy tones; skin kept on reload | #1891 | v7639 |
| Tree normal-maps switch, then the full / 64 / 32 / 16 / off choice (pause page, `d_treeNormals`) | #1894, #1907 | v7645, v7700 |
| In bed: sits up under the covers, glow softened | #1908 | v7716 |
| Station menus regrouped (no scrolling), basin, light green default skin, basin first on the first morning, guest-room stations; broom rack, workbench, lathe, hydraulic lift | #1897, #1911 | release #1914 |

## Codex workstreams: state at the stop

### Body graph, the new creature skeleton (#1866, `codex/body-graph-acceptance`, head f235e708e)

**Done:**
- Part tree on Infinigen's architecture (BSD-3, reimplemented): spine stations, three body masses, (u,v,r) mounts, family profiles.
- Shared dorsal crest and groove (Ed's "spine").
- Shared flight poses and bat flight sequences.
- Bear tuned over four candidates against a generated reference board (`claude/ed-shots` `previews/ed/creature-graph/de27db515/bear/ref-board.png`).
- Everything stays switched off in the game.
- Coordinator renders of each candidate are in `previews/graph-iterate/<sha>/bear/` in the coordinator's checkout. The command:

  ```
  WITCH_GRAPH_REFERENCE=<ref board> WITCH_GRAPH_CLOUD=1 WITCH_SHA=<head> node tools/body-graph/iterate.mjs bear <out>
  ```

**Where the bear stands:** the adult (ages 2 and 3) reads as a brown bear. The cub (age 0) is still a lump, age 1 crouches, and the rump is too wide and round from behind. The latest review is #1866 comment 6711665909.

**Not done:**
- **The bear:**
  - cub proportions: head about 1.3× the adult ratio, bigger ears, longer legs, body off the ground;
  - age 1 standing;
  - narrower hindquarters;
  - underside not maroon.
- **The CI grass-test failure:** unit shard 3/4, `grass.test.ts` expected 4173 and received 4608. It reproduces on the merge, likely a body-graph test leaking shared state. Codex had started bisecting.
- **The other five test species** (wolf, stag, bat, snail, hydra) against their own references.
- **Wing kinds and poses:** feathered, insect and dragon wings; folded/grounded poses; take-off and landing; glide.
- **Then:** move the remaining species lane by lane. Each switches on only when Ed sees it beat today's sprite.

**Acceptance rule (Ed):** judge against the real animal (photoreal references at the game camera, cross-checked against real photos), not against today's sprite.

### Creature art pass, nine lanes (docs-only, draft PRs)

**Purpose:** per species, targets for the body graph: references, an identifying-features checklist, a body-plan note listing missing graph features, and legend concepts. The brief is on #1476 (comments 6707737381, 6707758462 and the legend comments after them).

| Lane | PR | Branch head | Species |
|---|---|---|---|
| L1 | #1898 | 27c3afab7 | fox, arcticfox, fennec, wolf, raccoon, redpanda, badger, otter |
| L2 | #1904 | 213b3d348 | marten, stoat, meerkat, mole, hedgehog, dormouse, squirrel, flyingsquirrel |
| L3 | #1906 | e4e7847ac | cat, lynx, cheetah, jaguar, lion, tiger, snowleopard |
| L4 | #1899 | a2b9178c1 | stag, elk, roe, ibex, ram, boar, rhino, elephant |
| L5 | #1902 | f4aa8b5f6 | bear, polarbear, hare, beaver, armadillo, bat |
| L6 | #1901 | 1e5d12f34 | owl, raven, heron, penguin |
| L7 | #1900 | 443deb6fe | crocodile, komodo, snake, rattlesnake, newt, salamander, toad, stegosaurus |
| L8 | #1903 | 91d9f8f2e | beetle, crab, dragonfly, moth, scorpion, snail, spider, woodlouse |
| L9 | #1905 | e6c2154d6 | featheredserpent, frosttroll, frostwyrm, griffin, hydra, sphinx, unicorn |

**Done and usable now, whichever skeleton or art path is chosen:**
- For 62 of 64 species (L1 is missing badger and otter, after image generation failed):
  - photoreal references;
  - identifying-features checklists;
  - body-plan notes.
- Docs in `docs/art-pass/<species>.md` on each lane branch.
- Images on `claude/ed-shots` under `previews/art-pass/<species>/`.
- **Today's shipped legends** for all 64 (level 3: towards, away, asleep in circle, nap; native and 4×), from prototype 524b0ac, on ed-shots commit 0b571d18 under `previews/art-pass/legends-today/524b0ac/`.
- **The coordinator's review of the second-pass legend picks,** in the coordinator's scratchpad (`legendreview/review.md`, `all-picks.png`). The findings:
  - the second-pass legends were too conceptually complex for game size;
  - repeated ideas: body-as-temple, living water, starfield, forest-on-back;
  - strongest picks: boar, dragonfly, red panda, owl, scorpion;
  - weakest: cat, unicorn, hare, newt, cheetah.

**Ed's ruling for legends** (#1476 comments 6710686653 and 6710701175): "stay a bit closer to the brief; large size, exaggerations of existing features, armour, decorations, scars, etc." They must read at game size. Make pixel-art versions at true game size (a legend about 64–128 px, the witch about 50 px beside it).

**Third pass at the stop:**
- L2, L4, L6 and L8 had pushed third-pass pixel sheets: ed-shots commits 43b0c8eba (L4), c4818aced (L8), 358509479..6aa59ae7f (L6), and L2 head 213b3d348.
- The others had not finished.
- Nobody has reviewed the third pass yet.

**Not done:**
- the third pass for L1, L3, L5, L7 and L9;
- badger and otter in L1;
- a review of the third pass against Ed's ruling;
- Ed's picks;
- spreading signature elements so legends aren't uniform.

**Don't merge yet.** Decide first whether the docs go into prototype as one consolidated docs PR. They are targets, not game changes.

### A4 split (#1562, `codex/a4-split-dry-run`, head 0d2222f78)

- **Ed's go:** given 6 Nov ("Go 1880 1879 1875 1562").
- **Done:** refreshed against prototype bee35dc43 with a normal merge.
- **Not done:** at the stop, the refreshed head had no CI runs and was reported NOT READY. To resume: get CI green on the exact head, then the coordinator releases it under Ed's existing go.

### CI Chromium install reliability (#1889, `codex/chromium-install-reliability`, head 5daba0551)

- **Done:** two passing CI runs.
- **Not done:** the broader coverage check. Then it needs Ed's go to release.

## Coordinator-side work waiting on Ed (no Codex needed)

- **Tree normal directions:** Ed picks full, 64, 32, 16 or off after trying it in the game (v7700). That decides tree pre-bake size.
- **Pre-bake (#1884, `claude/prebake-art`):** Ed picks an option. The recommendation is everything except the trees first (about 20 MB), with trees after the normal-directions pick. Then go through the runtime style settings one by one.
- **Offers not yet answered:**
  - an Infinigen-style tree trial (oak, Scots pine, weeping birch);
  - sigil teaching (show the link plus a key glyph);
  - face anchors on the skeleton.

## Resume order (suggested)

1. A4 split (#1562): CI only, then release.
2. Body graph bear: cub and young ages, plus the grass-test leak.
3. The five other test species, one at a time.
4. Art-pass third pass, one lane at a time with an image estimate first, starting with the lanes whose creatures move to the skeleton next.
