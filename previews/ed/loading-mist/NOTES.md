# Loading mist (#1101)

Frames from the built game on the cloud's software renderer: a plain first load with `?mistgate=0&loadmist=1&artdelay=40`. Each area type's trees that are drawn ahead of need are held back so they land one every 40 s. She is over the treetops 160 m south of the treehouse.

- `frame-016.png`: the near types are drawn. The undrawn areas, at the right and the bottom, are under the mist.
- `frame-040`, `056`, `072`, `088`, `112`: old oaks have landed. Their mist rolls back outward from the treehouse (the right side), about 4 m a frame here; in play that's 140 m/s.
- `frame-200.png`, `frame-320.png`: later types landing and rolling. Anything the front hasn't reached 6 s after its type lands fades out over a second.
- `roll-sheet.png`: frames 32 to 120 side by side.
- `ground-view.png`: on foot in an undrawn area (density 0.85, glow 1.4), with nothing held back yet landed.

## Round 2: the dive, the sea, the look (v4396 on)

Changes in this round:
- The mist lies over the sea too, out to 600 m past the island, thinning. It burns off last, as its own front from the treehouse, once every land area's trees are in, so the island comes out of the mist before the water does.
- The top sheet catches the moon, the billows curl as they drift, and a slow shimmer passes over.
- The rolling edge is lit, and a few pixels of it glitter as it burns off.
- It's cheaper on the cloud's software renderer (timer queries round the effects layer): about 15 ms more than without, down from about 34 ms.

`dive/`: a sail in place from home to the fox island (`tools/mist/dive.cjs`, `?artdelay=30`), a picture every 3 s of the wall clock.
- `mist-sheet.png` and `mist-NNN.png`: with the mist. Frames 8 to 10 come in low over a sea of moonlit mist, with the island's dark shape inside it.
- `nomist-*`: the same dive with the mist off. On the cloud renderer the island is black through the descent either way (its ground isn't drawn yet), so the mist doesn't cause that. It's worth Ed checking the descent on a real GPU.
- `mist-030.png`: landed at the decks.

`terrace/`: from the Terrace (the record shelf) at the start's zoom. Only the near woods show between the rooms' leaf roofs, and they are drawn first, so no mist shows from there at that zoom. The telescope or the treetops see the far woods under it.
