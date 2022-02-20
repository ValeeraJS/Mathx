export default (p: number): number => {
	const s = 1.70158;

	return p === 1 ? 1 : p * p * ((s + 1) * p - s);
};
