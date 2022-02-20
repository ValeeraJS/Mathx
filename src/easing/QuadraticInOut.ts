export default (p: number): number => {
	if ((p *= 2) < 1) {
		return 0.5 * p * p;
	}

	return -0.5 * (--p * (p - 2) - 1);
};
