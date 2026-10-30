# Sheltered effects repair regression

Source3268e5117077c9427cb03bd4d144d6b90a19e62c, fingerprint e20099df6f70394b1c772a40ea48042b32b4107f9f6a805a9bd094c3bf77566e. Completed exit0 in4725ms, one worker,120s whole-job cap, no restart.

Actual spellWorld adapter fixture: outside hit on sheltered witch invokes hit0/stun0/slow0. Stage1 fixture had hit0/stun1/slow0. Eight adapter regressions cover damaging and effect-only touches, vanished source, current shelter entered/left during flight, melee extras, force movement, shelter-owner exception and unprotected controls. Five failing regressions reproduced the bug before the repair; owner and unprotected controls already passed. Engine force/lure checks also verify source forwarding.

All four creature-only pack arena digests match the target-identity milestone exactly. These censored pack cases do not exercise witch shelter by themselves; adapter fixtures establish that change. No general risk, balance or combat-strength claim. Raw data retains the exact source revision and manifest; later documentation commits do not relabel it.
