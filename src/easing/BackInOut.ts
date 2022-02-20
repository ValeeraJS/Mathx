export default (p: number): number => {
	const s = 1.70158 * 1.525;

	if ((p *= 2) < 1) {
		return 0.5 * (p * p * ((s + 1) * p - s));
	}

	p -= 2;

	return 0.5 * (p * p * ((s + 1) * p + s) + 2);
};
