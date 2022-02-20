export default (p: number): number => {
	if (p === 0 || p === 1) {
		return p;
	}

	p *= 2;

	if (p < 1) {
		return -0.5 * Math.pow(2, 10 * (p - 1)) * Math.sin((p - 1.1) * 5 * Math.PI);
	}

	return 0.5 * Math.pow(2, -10 * (p - 1)) * Math.sin((p - 1.1) * 5 * Math.PI) + 1;
};
