# Test audit

Audit-first assignment #1631, brief commit `b6f4046f6e1805913a1ba8d0ee8e148613556dbe` (2026-11-01). Starting prototype: `4f2483dc2c7ab6c97dec6ec96393b042c20b412d`.

The inventory will enumerate source test declarations without running the game. Runtime evidence comes from existing CI records; absent case timing stays unknown rather than dividing a file duration by its test count. Classification and supersession signals are review candidates, not proof a test is obsolete or permission to delete it.

Deliverables: a rerunnable inventory tool, JSON inventory and plain summary, followed by twelve system decision pages. Hard limits, current rules, outcome statistics and leftovers are the four review groups. Combat (#1622) and multiplayer (#1609) retain their current owners; this work changes no game source or existing tests. Test removal, rewrite or a non-blocking report workflow requires Ed's later group decision and a separate PR.

No generated-world, browser, laptop hardware or full-suite runs belong to this audit. Before publication, check merge-tree compatibility with the current multiplayer branch. Canonical owns review/release; the proposed standing testing rules are not adopted policy.
