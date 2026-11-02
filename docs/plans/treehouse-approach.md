# Treehouse: flying to it, landing in it, being in it

**Ed (2 Nov, ~01:30):** "The treehouse/tree needs work. It looks good on the horizon but weird to fly to and from."

The great oak's far look stays as it is. This work is about the close view: approaching, landing, being indoors and taking off.

## The four changes (Ed's answers in quotes)

1. **No crown while she's in the treehouse.**
   - Indoors, the whole crown and its string lights fade out, not just the cut over her room and the hole round her. They come back as she takes off.
   - Make the fade itself look good: a soft, ragged edge spreading out from her over roughly 0.5–1 s, rather than today's two-mask crossfade (`CrownView.cutOf`, `treehouse.house.crown.cutFade`).
   - Keep the bare limbs and bark faintly visible, so it still reads as being up in a tree. Ed: "I think so". The faintness is a knob.
2. **No notch in the crown.**
   - Ed sees it **from the dancefloor**: "goes from near where the decks are almost to the top". It makes the tree look bare.
   - `treehouse.house.crown.whole` is already on by default (26 Oct, `config/decisions/1233-oak-crown.json`). So find what still cuts that channel. Candidates: `notchDistance` / `sightClearance` in `src/rules/crown.ts`, the `open` ground, the "behind the oak" hiding (`uBehind`), or a cut added with the Ed layout (`?layout=ed`, now default).
   - Show it before and after from the dancefloor.
   - The crown should look full from every side.
3. **See the floor below you when flying close.** Ed: "yes".
   - When she's flying near the treehouse (start with about 40 m, as a knob), the crown fades out beneath and around her, strongest straight below her. She sees the floors and the Terrace before she lands, so landing is no longer a surprise.
   - It's the same idea as the forest's hole round her (`canopyCutout`), but sized to the house.
   - Far away nothing changes, so the horizon look stays.
4. **Try the treehouse without walls.** Ed: "let's try without the walls".
   - The rooms become open platforms on the branches with bark edges, clearly outside, up in the tree.
   - Furniture already stands freestanding (Ed, 26 Oct: "her house doesn't really have walls").
   - The walls are drawn in `src/render/houseRooms.ts` (floors, walls, objects layers).
   - **Edges (Ed, 2 Nov):** with the walls off, she can walk off the edge of any room. With a broom, she flies off, as stepping off the Terrace rim does today. Without a broom, she falls, using the **existing** fall: Ed, "We have the fall already - she falls with a thud and then quickly respawns where she fell from" (the Terrace no-broom fall, `src/rules/kit.ts`, `sfx.thud` in `src/platform/audio/chimes.ts`, Ed 26 Oct). Reuse that path; don't build a new fall. Part of the walls switch, so with it off, today's edges are unchanged.
   - Check the respawn point is the edge she fell from in every room, not the Terrace's.
   - Multiplayer guests: don't change multiplayer files. Note in the REPORT how a guest's fall would go through the host, for #1609 to handle.

## How

- Each change is its own switch on the pause page (one "Treehouse look" group, like the Oak crown group), so Ed can flip them in game.
- **Default OFF** until Ed has looked. With all switches off, the game is unchanged.
- Knobs in tuning, not literals: indoor bark faintness, fade time, approach radius, approach fade shape.
- Shots, before and after, each switch alone and all together:
  - the far view from the south (the horizon look must not change);
  - the approach from the dancefloor (the notch);
  - flying in close, from above and from the side;
  - the moment of landing on the Terrace and in another room;
  - inside, in two rooms;
  - take-off.
  - Use the existing shot tools (`tools/shot/crown-whole.cjs`, `crown-gap.cjs`) or extend them.
- Performance: measure `node tools/bench/crown-cost.cjs` with the switches on and off, at the house, inside and out. Report the numbers. No new per-frame allocation.
- Tests: direct rules only, never outcome statistics (see `docs/plans/test-audit.md`). For example: indoors the crown's alpha is 0 after the fade; with the approach switch off, the crown is identical to today. List every existing test you change and why.

## Rules

- **Multiplayer:** don't change multiplayer files. Guests use bedrooms 2 and 3 and the house's rooms (#1609). Before each REPORT, check for merge conflicts with the live #1609 head (`gh api repos/edsaperia/witch/pulls/1609 --jq .head.sha`, then `git merge-tree`).
- Combat (#1634) and the test audit (#1632) have their own owners.
- No default changes and no tuning changes go live without Ed.
- CI and cloud only. No laptop runs needed.
- Post a PLAN first, then a REPORT with the shots, a FINAL when ready.
