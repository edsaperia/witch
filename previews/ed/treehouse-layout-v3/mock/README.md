# Treehouse layout v3: mock (for Ed's OK; nothing in the game has changed)

Ed's room graph (`../ed-graph.md`) laid out on his sketch's grid (`../ed-sketch.png`), drawn by the game itself from its own camera, with the room names on (a mock build, branch `claude/treehouse-v3`, `?rooms=labels`). The house is turned 45° like today, so the plan's two axes are the screen's two diagonals.

- `whole.png`: the whole house (the camera pulled back about 7× its indoor distance).
- `near-terrace.png`, `near-parlour.png`, `near-boudoir.png`: the three ends closer (about 2×).
- `room-bedroom.png`, `room-terrace.png`, `room-atrium.png`: at the game's own indoor camera.

The grid: 24 m between centres. Rooms 14 m square; the Workshop 16 m (room for a bay, a lathe and the pegboard); the bedrooms 18 m (today's); the hubs (Atrium 10 m, Parlour 12 m, Boudoir 10 m) small squares at the crossings; corridors 4 m wide. The Terrace is today's round hub and its balcony with the decks, where she takes off.

- Off the Terrace: the Workshop, the Studio, the Kitchen and the Atrium.
- Off the Atrium: the Drawing Room, the Bestiary and the Parlour. The map table stands in its middle.
- Off the Parlour: the Solarium and the Study (the bags and the invitations desk). The Parlour holds the hat mirror and the hats' floor.
- Off the Boudoir (the telephone and the crystal ball): the Bedroom, Bedroom 2 and Bedroom 3.
- Off the Bedroom: the Crow's nest, through its back wall between the wardrobe and the dressing table.

Where it differs from the sketch: the sketch has five crossings and the graph four hubs, each with four ways out. On a square grid the Atrium and the Boudoir can't both have four (Bedroom 3 and a fourth room off the Atrium would land on the same square). So the corridor from the Atrium to the Parlour is two squares long, and the Atrium sits one square nearer the camera than in the sketch.

`house.json` is the mock's plan. `gen.mjs` makes it from the grid (`node gen.mjs <today's house.json> <out> [grid m]`).
