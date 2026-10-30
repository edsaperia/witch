# Momentum class cache repair regression

Source6a3493185c0308ab38cf9f98220ba8c31713f48c, fingerprint cf8c4f016b899c41d53fcf4cc4d7afb04b612d9a4dc448ba481026b868a65d72. Completed exit0 in6041ms, one worker,120s whole-job cap, no restart.

The focused badger regression failed before repair: a diagnostic-only heavy-species selection with the same classes reference returned normal turn7.3303828584rad/s and delay0.25s, while a fresh reference resolved heavy turn3.8397243544 and delay0.4s. After repair the shared and fresh references agree; switching back restores normal values. No tuning file is changed by this diagnostic.

The runtime diagnostic scans configured non-heavy species for shared-versus-fresh discrepancies; it no longer finds one, so the old momentumCache mismatch entry is absent. All four creature-only pack arena digests match the shelter milestone exactly. These default-settings comparisons do not alone establish cache invalidation; the focused changed-membership regression does. No general strength or balance claim. Historical outputs remain bound to their original source and are not relabelled by later documentation commits.
