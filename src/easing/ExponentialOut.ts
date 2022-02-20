export default (p: number): number => {
	return p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
};
