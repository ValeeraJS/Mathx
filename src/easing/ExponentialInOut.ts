export default (p: number): number => {
	if (p === 0 || p === 1) {
		return p;
	}

	if ((p *= 2) < 1) {
		return 0.5 * Math.pow(1024, p - 1);
	}

	return 0.5 * (-Math.pow(2, -10 * (p - 1)) + 2);
};
