export default (p: number): number => {
	if ((p *= 2) < 1) {
		return 0.5 * p * p * p;
	}

	p -= 2;

	return 0.5 * (p * p * p + 2);
};
