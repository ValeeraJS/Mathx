export default (p: number): number => {
	if (p === 0 || p === 1) {
		return p;
	}

	return -Math.pow(2, 10 * (p - 1)) * Math.sin((p - 1.1) * 5 * Math.PI);
};
