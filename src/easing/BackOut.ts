export default (p: number): number => {
	const s = 1.70158;

	return p === 0 ? 0 : --p * p * ((s + 1) * p + s) + 1;
};
