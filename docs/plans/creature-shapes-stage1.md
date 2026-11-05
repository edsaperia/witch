# Five creature shape candidates

Ed approved only creature shapes on 5 November, following #1584 comment
6642893511. Stage 1 is mole, hydra, lion, woodlouse and crocodile. Each species
has its own explicit link/style switch, absent and zero both off. Preserve the
shipped art, cache identity, size model and gameplay with every switch off.

Use existing genome selection and anatomical controls first. Add only the
missing local controls for hydra neck spread, woodlouse antennae/legs and a
crocodile tail root/lion tuft when existing whole-tail controls cannot express
the requested shape. Preserve shared builder defaults exactly. Mole gets a
barrel body and spade paws; lion a fuller ruff, round ears, bigger tuft and
heavier front; hydra separated fanned necks; woodlouse readable antennae/legs;
crocodile a thicker tapering tail base and splayed legs.

Own `art/genome/shape-candidates.js`, the selection hook,
`art/creatures3d.js` local control additions, link/style plumbing, nearby
candidate tests, a deterministic sheet command, the shape notes and own
changelog fragment. No expressions, gameplay, collision, release workflow or
other-species changes. Shared-file overlap is referred to the coordinator.

Nearby tests and exact typecheck use one worker. Canonical CI/cloud owns the
art check, benchmark, full suite and review-sheet capture: one before/after
sheet per species, matching game pixels and a nearest-neighbour 4x close-up.
Show four ages and both game facings, with exact source SHA and switch labels.
All candidates remain off until Ed reviews the frames. No laptop heavy art or
browser run is allocated. Stage 2 is read/propose only after this milestone.
