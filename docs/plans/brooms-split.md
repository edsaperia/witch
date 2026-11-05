# Broom art source split

Ed explicitly approved the separate broom-art split on 4 November; coordinator
delegation follows #1476 comments 6643908630 / 6643311785 item 7.

PLAN: start from current prototype, on `codex/brooms-split`, separate from A4.
Keep `art/brooms.js` as the existing four-export entry point, with its original
kind order, optional body/tail members and shared stick-function identity.
Move the four decorative nose/body implementations into `art/brooms/tips.js`,
the seven vehicle/frame bodies into `chassis.js`, and all eight tail methods into
`exhausts.js`. Shared geometry helpers and material groups live in `common.js`.
The oar, mop and pitchfork continue to share the exact same plain stick helper.
Every moved method and helper retains its original source text. No geometry,
materials, arithmetic, frame timing, metadata or public export is redesigned.
Classic/fan/twig/round drawing in `art/witch.js` and the Workshop's assembled
`art/broomParts.js` are unchanged.

Validate CPU-only: exact moved function text, export/member shape and ordered
model-command fingerprints against the pre-split source across kinds, frames,
length/bend/bristle controls and geometry directions. Run nearby tests with one
worker, typecheck, config gate and inventory checks. No browser, art bake, full
suite, smoke, heavy proof, merge, release or production push. Full visual proof
is left to the coordinator/nightly art gate; no visual change is intended.

A4 production APPLY remains separately fenced off.

Source checkpoint: prototype `a36373cae4d7902814de2c466671a6023cfd1c34`.
Original `art/brooms.js` SHA256 (LF):
`439935f75d388d9dadf063ef5a8b69067ce774480fa85fa839c7697aa04620e7`.
Draft PR #1839; first plan commit `a8033bb42`. Four tip body methods, seven
chassis body methods and eight exhaust methods moved; three kinds retain the
shared stick body. The frozen CPU fixture records the original public metadata,
literal function/helper hashes and 144 geometry-command inputs per drawing
method. The test lives in the regular `src` test selection so CI runs it.
