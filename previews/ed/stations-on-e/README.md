# Stations open on E (#1181)

Ed's playtest, 2026-10-26: menus open on E near an object, which lights up with a prompt showing the button. Shot at 960×540, seed 123, the built game (`?shot=object:<id>`).

- `sheet.png`: all of the frames below on one sheet.
- `1-before-wardrobe.png`: before (claude/prototype). She is put by the wardrobe, and its panel opens by itself. The start card was still fading out in this shot.
- `2-after-wardrobe-lit.png`, `3-after-wardrobe-E.png`: after. The wardrobe is ringed in gold with "Wardrobe · E" over it. E opens its panel, and the tag drops to its name.
- `4-drum-kit-lit.png`, `5-drum-kit-E.png`: the drum kit, "Drum kit · E play", then its menu after E.
- `6-telescope-lit.png`: the telescope, "Telescope · E look".
- `7-map-table-lit.png`, `8-map-table-E.png`: the map table, "Map table · E the sea chart", then the chart rising after E.
- `9-shoe-rack-pad.png`: on a pad, the shoe rack with "□". Only the nearest object lights; the wardrobe behind her doesn't.
- `10-clothes-pile.png`, `11-decks.png`: from the opening's shots (`tools/opening/shots.cjs`, 1280×720). Last night's clothes, "· E put them on", lit. Her decks before the party, "Decks · E start the party".

## v2, after Ed's notes on the sheet

Ed: "Please remove words from the station tags. We used to have little keys to show 'WASD', can we use these for E. Also I think E should also close, and we can have spacebar to select. (square and X on controller)"

- `v2-sheet.png`: the frames below on one page.
- `v2-1-wardrobe-lit.png`: the wardrobe lit, with a keycap alone over it. It's the bedroom's old WASD key art (`ui/keyHint.ts`) with no words.
- `v2-2-wardrobe-open.png`: E has opened the wardrobe; there's no keycap while it's open. E again closes it. Space or Enter (✕ on a pad) chooses, as the menu's footer says.
- `v2-3-drum-kit-lit.png`: the drum kit with its E keycap.
- `v2-4-shoe-rack-pad.png`: on a pad, the shoe rack with the □ keycap.

## v3: round pad buttons, E leaves the instruments, no walking off

Ed: "square and X can appear on a circular button"; "instruments: leave with E"; "Actually I think walking away shouldn't work - then we can use the movement keys as buttons in the menus".

- `v3-sheet.png`: the frames below on one page, with close-ups of the round □ and the hint line.
- `v3-1-wardrobe-lit.png`: the E keycap alone over the lit wardrobe.
- `v3-2-wardrobe-open.png`: open. She stands still. The hint line is keycaps: W A S D and the arrows move the focus; Space, Enter or the round ✕ choose; E or the round □ close it.
- `v3-3-drum-kit-open.png`: the drum kit. E leaves it, so its pad in the grid shows ⏏. The foot reads E, □, Esc ⏏.
- `v3-4-shoe-rack-pad.png`: on a pad, the shoe rack with a round □ face button.
