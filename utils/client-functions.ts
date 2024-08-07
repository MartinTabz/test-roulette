export function formatNumberToCurrency(num: number): string {
	return new Intl.NumberFormat("de-DE", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(num / 100);
}
