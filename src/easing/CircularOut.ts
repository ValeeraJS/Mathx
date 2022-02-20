export default (p: number): number => {
	return Math.sqrt(1 - --p * p);
};
