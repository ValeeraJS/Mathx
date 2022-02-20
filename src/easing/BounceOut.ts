/* eslint-disable no-return-assign */
export default (p: number): number => {
	if (p < 1 / 2.75) {
		return 7.5625 * p * p;
	} else if (p < 2 / 2.75) {
		return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
	} else if (p < 2.5 / 2.75) {
		return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
	} else {
		return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
	}
};
