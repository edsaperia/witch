/** MP-A PLAN (canonical1476#6556803207, 2026-11-01).
 * Test existing visit APIs only: preparation rollback, guest/own save separation,
 * fresh own-night departure, persistent unlock/other-slot isolation, stale callbacks.
 * Own only this new fixture and app/visitAcceptance.test.ts. Production fixes belong
 * to1538. No browser/relay/fullsuite; focused one-worker tests and typecheck.
 * Current prototype98558e261 does not contain the named visit APIs; resolve the
 * exact product dependency before claiming any acceptance case passed.
 */
export const visitAcceptanceCases = {
  rollback: 'failed preparation preserves the own checkpoint',
  isolation: 'admission never saves the host snapshot as the own night',
  departure: 'leaving starts a fresh own night',
  persistence: 'permanent unlocks and other slots survive',
  stale: 'late callbacks cannot resurrect a departed visit',
} as const;
