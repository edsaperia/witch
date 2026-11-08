export const APPROVED: string[];
export const BUDGET: number;
export const KIT_BUDGET: number;
export function checkSamples(root: string): string[];
export const OWN_WORK: { licence: string; tool: string; toolAuthor: string; toolLicence: string; url: string };
export function ownWorkProblem(f: { source?: string; credit?: string; generated?: { tool?: string; toolAuthor?: string; toolLicence?: string; url?: string; commit?: string } }): string | null;
