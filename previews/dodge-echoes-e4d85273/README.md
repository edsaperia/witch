# Dodge echoes: saved slot 5 frames

These frames were captured from **e4d85273e69dd24a6bd4682aa59162d3075f4d72**, preview v6695, on 2026-10-31 using Intel UHD Graphics / ANGLE D3D11. They describe that source, not the newer commit containing this evidence.

Each directory contains OFF, ON, OFF-return and an amplified ON-minus-OFF difference. Departure at 3 frames changes 6,255 screen pixels (maximum channel difference 55); at 9 frames, 3,780 (maximum 25). Both exact OFF-return differences are zero.

The 15-frame arrival PNGs survived, but the supervisor stopped the overall attempt at 50.456 seconds on the then-required measurement CPU gate. Its diff was computed afterwards from the saved PNGs. This is partial evidence, not full arrival/occlusion/camera/rapid/turn acceptance or a timing result. No alpha or production material changes were made for these captures.

The coordinator subsequently changed pixel-capture CPU gating to prelaunch only (issue1476 comment6549487804); timing drivers retain their measurement gates. The remaining review requires a new canonical tail slot.
