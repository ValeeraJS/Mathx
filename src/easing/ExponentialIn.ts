export default (p: number): number => {
	return p === 0 ? 0 : Math.pow(1024, p - 1);
};
