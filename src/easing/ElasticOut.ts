export default (p: number): number => {
	if (p === 0 || p === 1) {
		return p;
	}

	return Math.pow(2, -10 * p) * Math.sin((p - 0.1) * 5 * Math.PI) + 1;
};
