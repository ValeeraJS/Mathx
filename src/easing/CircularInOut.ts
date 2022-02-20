export default (p: number): number => {
	if ((p *= 2) < 1) {
		return -0.5 * (Math.sqrt(1 - p * p) - 1);
	}
	p -= 2;

	return 0.5 * (Math.sqrt(1 - p * p) + 1);
};
