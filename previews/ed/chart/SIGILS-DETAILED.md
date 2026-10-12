# Detailed island sigils (PR claude/sigil-detail)

Ed: "we don't need the circles around the rune; ideally we want more detailed versions of the rune itself, which is the
animal shape design as already chosen but embellished with more details." His reference is at `../refs/sigil-detail-reference.png`.
`sigils-detailed.html` shows our sheet beside it; open it from a checkout of claude/ed-shots.

`sigils-detailed-all.png` shows every animal and home's World Tree:
- **Large squares:** the full detail (tier 2), black on white like the reference and in the animal's neon.
- **Under each:** the plain glyph (tier 0, used while a sigil is small on screen) and the carved bands (tier 1, mid sizes).

How they're made: from each sigil's own strokes, so every one is still recognisably its rune.
- Each stroke becomes a broad band with a groove carved down its middle, like the reference's ribbons.
- The animal's extra detail is added (fur lines, eyes, tusks and so on).
- Where bands cross, one passes under the other (knotwork).
- The four longest lines end in carved spiral knobs.
- The shapes the strokes close in (a face, a body, a shell) are solid, with lines echoing their outline carved into them.

There are no circles at any size. The colour stays each animal's neon.

On the chart: #699 already shows the plain glyph with no circle. Once this PR lands, the chart switches to these by on-screen
size: the plain glyph below about 64 px, the carved bands to about 128 px, the knotwork beyond.
