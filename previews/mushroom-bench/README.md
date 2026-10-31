# PR #1523 existing benchmark crops

Source: run 41188553514, head 9cd8a2d2, seed123, 960x540. These are crops of the existing artifact, not a new render. Rectangle x740–970/y0–110, enlarged exactly4x nearest-neighbour. The source stops at x960; the final10 source columns are black padding. Diff is white wherever any RGB channel differs, otherwise black.

- base-wave-fight-4x.png
- head-wave-fight-4x.png
- diff-wave-fight-4x.png

Inspection shows dark foliage and scattered rectangular changed pixels, not an identifiable mushroom cap/stem or circular halo. This does not establish the cause, and no benchmark exemption is justified by these crops alone.

Placement-only CPU inspection calls the production newGame(123,TUNING) and reads its patches; no browser or benchmark was rerun. At the captured witch position (3220.433,2883.867), the only patches inside MushroomView's150m inclusion radius are red patch19,17 at(3288.402309,2890.562951), 68.298m away (67.969m east,6.696m south), and red patch17,17 at(3157.947007,2982.502260),116.762m away (62.486m west,98.635m south). Full coordinates are in seed123-placement.json. Both lie south of her, while the normal camera looks north; neither obviously explains the top-right foliage patch. This is placement evidence, not an exact screen projection: captured camera/height/art state was not reconstructed.

The earlier hypothesis that mushrooms explain all1062 changed pixels remains unproven. Request a controlled allocated A/B if the coordinator needs causal proof.
