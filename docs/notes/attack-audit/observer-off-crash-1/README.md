# Observer-off legacy-shot crash correction

COORDINATOR6531397699 reports CI job124250396569 on20663a138: land read a.delivery while constructing diagnostic arguments, before the old shelter early return. combat.ts104 can supply an undefined attack for a legacy shot. This observer regression was real; the earlier behavior-neutral claim was incomplete.

The correction bypasses all observation argument evaluation when the hook is off, calling the unchanged damage routine directly. With observation on, missing metadata uses unknown delivery and no invented definition. The caller and original damage routine are unchanged, including their existing early returns and all other behavior; this is not a new unknown-attack fallback in gameplay.

New circleSafe regression uses the actual Game/stepCombat legacy-shot caller with an undefined attack and no observer. It failed with undefined.delivery before repair and passes afterward: protected HP unchanged, shot consumed, no witchHit event. The full run also passed all3 circleSafe and8 observer tests. Typecheck passes.

The explicitly requested full `npx vitest run` used configured parallelism, without worker/isolation/timeout overrides or a restart. It completed in977.99s: **415 files passed/15 failed;2702 tests passed/22 failed,2724 total**. It is not green. Fifteen failures are timeouts; seven are generated-text/index/credits checks or the Art Lab extractor. Full failure names/messages, tested-patch hash and private raw-log hash are in full-suite-summary.json. The original log is retained privately as .attack-full-vitest.log.

Generated finds/knob comparisons show CRLF versus LF in their diagnostics. The Art Lab raw extractor finds the function start but not its LF-only closing delimiter; a read-only LF-normalized view finds both. The generated indexes, credits, finds, knobs, schema, generator tools and Art Lab input are unchanged since this branch's initial prototype merge ed99fb78495827f0658ee3377468b28691fc650a. No generated files, unrelated gameplay, worker settings or timeout limits were changed to clear those failures. These observations do not turn the full run into a pass or prove every remaining failure harmless.

Own changelog version6011 is stamped from the matching20663a1 preview; the two player bullets are unchanged. No diagnostic-fix player text is added. No browser, census, balancing or release run. Item4 still needs the correction's green exact-head CI and canonical acceptance; items6–7/census remain held.
