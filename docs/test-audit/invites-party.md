# Invites and party

2 changes proposed, 1 groups to keep as they are.

Read-only review of the152 assigned tests in25 files at9f045ebca, report6566171808. Rebucketed neighboring cases are not silently approved.

Timings are historical containing-file time, not savings. Partial-file and overlapping groups include other tests; do not add their times. Source counts are test templates, not expanded runs.

## What these protect

- Bursts, cooldowns, chains and piercing share invitation eligibility and queue slots.
- Placement, pickup and held-button runs preserve the right sigils and hats.
- Before casting and after losing, creatures cannot invite or harm her outside their allowed phase.
- Waves, route, forecast and drawing tip stay ordered, bounded and free of NaN.
- Guests retain valid destinations, reciprocal partners and distinct stop/destruction behavior.

## Proposed changes

### IP1. Observed motion and occurrence thresholds

**9 tests · outcome stats · ~124 s of CI.**

Examples: [A loaded witch moves below a sampled speed ratio.](../../src/rules/leashWeight.test.ts#L75); [Witches swoop more often near a treetop player.](../../src/rules/partyWitches.test.ts#L45); [Dancers rarely occupy a sigil in sampled frames.](../../src/rules/sigilAvoid.test.ts#L34).

**Yes/no: Move these nine observed motion/occurrence thresholds to nightly/manual reports? Yes retains the measurements and dated comparisons without changing gameplay or dropping direct safety protections.** [Assertions, rationale and exact membership](semantic-groups.md#ip1).

### IP2. Mixed party, spread and route statistics

**16 tests · outcome stats · ~142 s of CI.**

Examples: [Sampled letter spread reaches both sides of the aim.](../../src/rules/invitesAim.test.ts#L30); [Guest destinations meet a sampled population share.](../../src/rules/partyGuests.test.ts#L34); [Generated routes show a variety of crossing counts.](../../src/rules/leyroute.test.ts#L41).

**Yes/no: Split these sixteen tests into blocking rules/integrity checks and nonblocking sampled measurements? Yes preserves bounded geometry, valid ownership, exact replay and route rules; only density/frequency/diversity/timing judgments become reports.** [Assertions, rationale and exact membership](semantic-groups.md#ip2).


## Keep as they are

- [IP3: Invitation, phase and route contracts](semantic-groups.md#ip3): 127 tests; ~388 s of CI.

<details>
<summary>Examples and evidence for the kept groups</summary>

### IP3. Invitation, phase and route contracts

**127 tests · current rules · ~388 s of CI.**

Examples: [Pulse position and wave timing stay coupled at every step.](../../src/rules/leyPulseAudit.test.ts#L100); [Route planning stays within its work budget.](../../src/rules/leyroute.test.ts#L55); [A held sigil action preserves the intended interaction.](../../src/rules/sigilRuns.test.ts#L41).

[Assertions, rationale and exact membership](semantic-groups.md#ip3).

</details>

**Yes/no: Keep IP3 as they are?** They protect letter eligibility and queue parity, correct sigil ownership, phase gates, monotone pulse/route coupling and valid party-guest state.

[Old/current ruling comparisons](semantic-groups.md#invites-party-ruling-review). No change happens before Ed rules.

## Not reviewed, no change proposed

149 additional tests remain outside the reviewed groups. The keep question above covers only named groups. [Exact remaining file/line manifest](unreviewed.md).
