// Escape intentionally pauses OVER the chart. Use its normal Close control instead.
export const closeWarmChart = page => page.locator('#chart-overlay .close').click();
