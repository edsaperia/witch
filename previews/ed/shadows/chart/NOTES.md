# The moon over the sea chart: island shadows (mockup, 2026-10-12)

Ed: "islands casting shadows from the moon orbiting the map screen", and (#746) "have the moon rise over the North West edge of the map as you open the map screen".

The mock code is on branch `claude/chart-moon-mock`, not for merging: `chart.html?moon=orbit|fixed|off`, with `&moonSpeed=` (degrees a second), `&moonElev=` (degrees), `&moonAt=` (a fixed bearing) and `&moonRise=` (seconds).

## What it does

- **The rise.** As the chart opens, the moon comes up over the north-west edge (bearing −45°) over 6 s. The land comes out of the dark with long shadows that shorten as it climbs, and the sky's moon disc climbs into its place. Then it sets off round.
- **The orbit.** The moon keeps a low 22° and goes round once in 3 minutes by default. The clips run it faster.
- **The shadows.** Each island's real relief throws a shadow on the sea, away from the moon, and on its own valleys. The hills' shading follows the moon as well (today it's fixed, lit from the north-west).
- **How the shadows are made.** Every island's heights are drawn once, top down, into a 2048² height map of the whole chart (again when an island's outline arrives). The ground, the sea and the shallows each look back toward the moon through it, 28 taps a pixel, and darken by up to 0.62 where land stands in the way.

## Files

- `whole-moon<bearing>.png`: the whole chart, with the moon at −40°, 50°, 140° and 230°.
- `open-moon<bearing>.png`: the opening view round home.
- `close-unknown-15-moon<bearing>.png`: the tallest island, closest.
- `moonrise.mp4`: the opening, the moon rising NW and then setting off round (sped up).
- `orbit-close.mp4` and `orbit-open.mp4`: a full orbit, close in and over the opening view.

## Cost

- The height map is drawn once, not every frame.
- In headless software GL the frame time is the same within noise with shadows on and off (1.0 against 1.2 ms). The chart draws at its low pixel resolution, so 28 taps a pixel is cheap.
- The map table draws the chart live over the game, so the real GPU cost should be checked on hardware before building.

## Caveats

- Close in, the shadows' edges are soft and blobby: one height map for the whole chart is about 0.1 chart units a texel.
- A real build would give each island its own finer height tile, or march the island's own heightfield.
- The moon disc in the sky stays in the north-west after the rise. A real build would place it by its bearing, or keep it NW and treat the orbit as the chart turning.

## An empty band of sea round the edge (#746)

The disc is 102 units across its radius and the outer islands reach close to the rim. An empty band would come from either:

- pulling the islands' positions in (say to 85% of the radius), or
- widening the disc and its pour-off rim, keeping the islands where they are.

Either fits the moon. The bare rim is the horizon it rises over in the NW, and with the moon low the outer islands' long shadows would fall across the empty band, which would show them off. The height map covers the whole disc, so nothing else changes.
