# W8 shared-rules slice

Approved W8 continuation (Ed, 2026-11-02; coordinator1632#6577541796), independent of #1659 CI/release. Prototype base7313e5781 with explicit dependency #1659 fc60bb785, including #1656 quiet-night correction. Root combines dependencies once.

Exact 17 audit cases in `src/rules/rules.test.ts`, audit73741aa8 start lines reconciled by exact names:65,80,301,766,1049,1063,1110,1121,1131,1148,1172,1200,1221,1231,1513,1524,1621. W4/W7/W-R2-1, the first12 focused W8 declarations, combat and multiplayer are unchanged by this slice.

Report sampled partition differences/own-site share, blended planting share, selected set-piece share, density bands/arena gradients, path abundance/crossers/corridor-edge density, six-seed bridge occurrence/fingerpost quantity, decor/grounds/relic density and proximity, tuft abundance/type density and shrine ring statistics. Preserve original full maps, NET opt-in compatibility tuning, spatial samples, counts and seeds. The report records actual numbers with the original references.

Retain direct seed distinction/centreness/openness, bounded nearby planting and zero-width endpoint, valid selected pieces, configured density floor and arena interiors, explicit network limits/no roads, line area identity, corridor exclusions/broken-rail exception, allowed/removed pieces and placement/spacing/replay, grounds/relic exclusions and caps, valid tuft kinds/density-zero, shrine per-object bounds and meaningful nonempty coverage. Add small deliberately supplied planting/network fixtures for neighbour lookup, bridge/fingerpost delivery and the broken-rail exception so random feature occurrence is not a release prerequisite.

Only tests, report code and docs change. Typechecks and nearby small fixture/harness checks run locally with one worker; own CI owns full-map coverage/timings. No laptop generated-world/browser/full-suite run or invented overall CI saving. Report dispatch remains coordinator-owned after main registration. Every milestone lists changed tests/reasons and exact remaining scope.
