/** Review-only comparison switch. Ordinary games retain recording and journalling. */
export const recordsInputs = (search: string): boolean => new URLSearchParams(search).get("recording") !== "0";
export const RECORD_INPUTS = typeof location === "undefined" || recordsInputs(location.search);
